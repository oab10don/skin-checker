import type { ScoreAxis, SkinType } from "./types";

export const skinTypeLabels: Record<SkinType, string> = {
  dry: "乾燥タイプ",
  oily: "脂性タイプ",
  combination: "混合タイプ",
  sensitive: "敏感タイプ",
  innerDry: "インナードライタイプ",
  pores: "毛穴ケアタイプ",
  dullness: "くすみケアタイプ",
};

export const skinTypeDescriptions: Record<SkinType, string> = {
  dry: "肌の水分が不足しがちで、カサつきやつっぱりを感じやすいタイプです。保湿ケアを重点的に行いましょう。",
  oily: "皮脂の分泌が活発で、テカリやベタつきが気になるタイプです。さっぱりとしたケアがおすすめです。",
  combination:
    "Tゾーンはテカるのに頬は乾燥する、水分と皮脂のバランスが崩れやすいタイプです。パーツごとのケアが大切です。",
  sensitive:
    "外部刺激に反応しやすく、赤みやかゆみが出やすいタイプです。低刺激なスキンケアを心がけましょう。",
  innerDry:
    "表面は皮脂でうるおっているように見えて、内部は乾燥しているタイプです。水分補給が鍵になります。",
  pores: "毛穴の開きや黒ずみが気になるタイプです。適切な洗顔と引き締めケアが効果的です。",
  dullness:
    "くすみやトーンの不均一が気になるタイプです。ターンオーバーを整えるケアで透明感を取り戻しましょう。",
};

export const skinTypeImages: Record<SkinType, string> = {
  dry: "/images/skin-types/dry.png",
  oily: "/images/skin-types/oily.png",
  combination: "/images/skin-types/combination.png",
  sensitive: "/images/skin-types/sensitive.png",
  innerDry: "/images/skin-types/inner-dry.png",
  pores: "/images/skin-types/pores.png",
  dullness: "/images/skin-types/dullness.png",
};

export const scoreAxisLabels: Record<ScoreAxis, string> = {
  moisture: "乾燥度",
  sebum: "皮脂量",
  sensitive: "敏感度",
  pores: "毛穴",
  dullness: "くすみ",
};
