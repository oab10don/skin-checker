"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import { questions } from "@/lib/questions";
import { diagnose } from "@/lib/scoring";
import type { ScoreDelta } from "@/lib/types";

export default function DiagnosePage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(ScoreDelta | null)[]>(
    () => new Array(questions.length).fill(null)
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const question = questions[currentIndex];

  const handleSelect = useCallback(
    (delta: ScoreDelta, optIndex: number) => {
      setSelectedIndex(optIndex);

      // 選択後少し間をおいて次へ進む
      setTimeout(() => {
        const next = [...answers];
        next[currentIndex] = delta;
        setAnswers(next);

        if (currentIndex === questions.length - 1) {
          const deltas = next.filter((d): d is ScoreDelta => d !== null);
          const result = diagnose(deltas);
          sessionStorage.setItem("skinDiagnosisResult", JSON.stringify(result));
          router.push("/result");
        } else {
          setCurrentIndex((i) => i + 1);
          setSelectedIndex(null);
        }
      }, 350);
    },
    [answers, currentIndex, router]
  );

  const handleBack = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      setSelectedIndex(null);
    }
  }, [currentIndex]);

  return (
    <div className="min-h-dvh px-4 py-6 sm:py-10">
      <div className="mx-auto max-w-xl">
        <Header showBack />
        <ProgressBar current={currentIndex + 1} total={questions.length} />

        <div key={currentIndex} className="animate-fade-up">
          <h2 className="mb-6 font-heading text-xl leading-relaxed tracking-[0.06em] text-ink sm:text-2xl">
            Q{question.id}. {question.text}
          </h2>

          <div className="flex flex-col gap-3">
            {question.options.map((option, i) => {
              const isSelected = selectedIndex === i;
              const hasSelection = selectedIndex !== null;
              return (
                <button
                  key={i}
                  onClick={() => handleSelect(option.delta, i)}
                  disabled={hasSelection}
                  className={`flex items-center gap-3 rounded-2xl border px-5 py-4 text-left text-base leading-relaxed shadow-sm transition-all ${
                    isSelected
                      ? "border-sage bg-sage/10 text-sage-dark"
                      : hasSelection
                        ? "border-line bg-surface text-ink opacity-50"
                        : "border-line bg-surface text-ink hover:border-sage/40 hover:shadow-sm active:scale-[0.98]"
                  }`}
                >
                  <span className="flex-1">{option.label}</span>
                  {isSelected && (
                    <svg
                      className="h-5 w-5 shrink-0 text-sage"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>

          {currentIndex > 0 && (
            <button
              onClick={handleBack}
              className="mt-5 flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
              前の質問に戻る
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
