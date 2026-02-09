import type { DiagnosisResult, ScoreAxis, ScoreDelta, Scores, SkinType } from "./types";

const AXES: ScoreAxis[] = ["moisture", "sebum", "sensitive", "pores", "dullness"];

/** 各軸の理論上の最大値（質問のdeltaから計算すると面倒なので、固定値で正規化） */
const MAX_RAW = 100;

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/** 回答のdelta配列 → 合計rawスコア */
export function sumDeltas(deltas: ScoreDelta[]): Scores {
  const raw: Scores = { moisture: 0, sebum: 0, sensitive: 0, pores: 0, dullness: 0 };
  for (const d of deltas) {
    for (const axis of AXES) {
      raw[axis] += d[axis] ?? 0;
    }
  }
  return raw;
}

/** rawスコアを 0-100 に正規化 */
export function normalize(raw: Scores): Scores {
  const result = { ...raw };
  for (const axis of AXES) {
    result[axis] = clamp(Math.round((raw[axis] / MAX_RAW) * 100), 0, 100);
  }
  return result;
}

/** 軸スコア→主タイプ判定 */
const axisToSkinType: Record<string, SkinType> = {
  moisture: "dry",
  sebum: "oily",
  sensitive: "sensitive",
  pores: "pores",
  dullness: "dullness",
};

/** 正規化済みスコアからタイプを判定 */
export function classify(scores: Scores): { primaryType: SkinType; secondaryType?: SkinType } {
  // ルール1: 混合タイプ
  if (scores.sebum >= 65 && scores.moisture >= 55) {
    return withSecondary("combination", scores);
  }
  // ルール2: インナードライタイプ
  if (scores.moisture >= 70 && scores.sebum >= 45) {
    return withSecondary("innerDry", scores);
  }
  // ルール3: 最大軸で決定
  let maxAxis: ScoreAxis = "moisture";
  let maxVal = -1;
  for (const axis of AXES) {
    if (scores[axis] > maxVal) {
      maxVal = scores[axis];
      maxAxis = axis;
    }
  }
  const primaryType = axisToSkinType[maxAxis];
  return withSecondary(primaryType, scores);
}

/** secondaryType の決定 */
function withSecondary(
  primaryType: SkinType,
  scores: Scores
): { primaryType: SkinType; secondaryType?: SkinType } {
  // 軸スコアの上位をソート（primary以外）
  const sorted = AXES.map((axis) => ({ axis, score: scores[axis] }))
    .sort((a, b) => b.score - a.score);

  for (const { axis, score } of sorted) {
    const candidateType = axisToSkinType[axis];
    if (candidateType !== primaryType && score >= 55) {
      return { primaryType, secondaryType: candidateType };
    }
  }

  return { primaryType };
}

/** 診断のエントリポイント */
export function diagnose(deltas: ScoreDelta[]): DiagnosisResult {
  const raw = sumDeltas(deltas);
  const scores = normalize(raw);
  const { primaryType, secondaryType } = classify(scores);
  return { scores, primaryType, secondaryType };
}
