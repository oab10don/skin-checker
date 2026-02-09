"use client";

import { scoreAxisLabels } from "@/lib/labels";
import type { ScoreAxis, Scores } from "@/lib/types";

type ScoreBarsProps = {
  scores: Scores;
};

const AXES: ScoreAxis[] = ["moisture", "sebum", "sensitive", "pores", "dullness"];

const BAR_COLORS: Record<ScoreAxis, { bar: string; bg: string }> = {
  moisture: { bar: "bg-sage", bg: "bg-sage/15" },
  sebum: { bar: "bg-[#8a7e6b]", bg: "bg-[#8a7e6b]/15" },
  sensitive: { bar: "bg-terracotta", bg: "bg-terracotta/15" },
  pores: { bar: "bg-[#5a6e5a]", bg: "bg-[#5a6e5a]/15" },
  dullness: { bar: "bg-[#a89080]", bg: "bg-[#a89080]/15" },
};

export default function ScoreBars({ scores }: ScoreBarsProps) {
  const maxScore = Math.max(...AXES.map((a) => scores[a]));

  return (
    <div className="space-y-3">
      {AXES.map((axis) => {
        const isWinner = scores[axis] === maxScore && maxScore > 0;
        return (
          <div key={axis}>
            <div className="mb-1 flex items-baseline justify-between text-sm">
              <span
                className={
                  isWinner ? "font-bold text-ink" : "font-medium text-muted"
                }
              >
                {scoreAxisLabels[axis]}
              </span>
              <span
                className={
                  isWinner
                    ? "text-xs font-bold text-ink"
                    : "text-xs text-muted"
                }
              >
                {scores[axis]}pt
              </span>
            </div>
            <div
              className={`h-3 w-full overflow-hidden rounded-full ${BAR_COLORS[axis].bg}`}
            >
              <div
                className={`h-full rounded-full transition-all duration-700 ease-out ${BAR_COLORS[axis].bar} ${isWinner ? "opacity-100" : "opacity-60"}`}
                style={{ width: `${scores[axis]}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
