"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import ScoreBars from "@/components/ScoreBars";
import ProductCards from "@/components/ProductCards";
import { skinTypeLabels, skinTypeDescriptions } from "@/lib/labels";
import { recommendProducts } from "@/lib/products";
import type { DiagnosisResult } from "@/lib/types";

const STORAGE_KEY = "skinDiagnosisResult";

function getSnapshot(): string | null {
  return sessionStorage.getItem(STORAGE_KEY);
}

function getServerSnapshot(): string | null {
  return null;
}

function subscribe(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export default function ResultPage() {
  const router = useRouter();
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const result: DiagnosisResult | null = stored
    ? (JSON.parse(stored) as DiagnosisResult)
    : null;

  useEffect(() => {
    if (!result) {
      router.replace("/");
    }
  }, [result, router]);

  if (!result) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <p className="text-sm text-muted">読み込み中...</p>
      </div>
    );
  }

  const { scores, primaryType, secondaryType } = result;
  const { primary, secondary } = recommendProducts(primaryType, secondaryType);

  return (
    <div className="min-h-dvh px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-xl">
        <Header showBack />

        {/* Type header */}
        <div className="animate-fade-up mb-12 text-center">
          <p className="mb-3 text-sm tracking-widest text-muted">
            あなたの肌タイプは
          </p>
          <div className="mx-auto mb-5 inline-block rounded-2xl border border-sage/30 bg-sage/5 px-8 py-5">
            <h1 className="font-heading text-3xl font-bold tracking-wide text-sage-dark sm:text-4xl">
              {skinTypeLabels[primaryType]}
            </h1>
          </div>
          <p className="mx-auto max-w-sm text-sm leading-relaxed text-muted">
            {skinTypeDescriptions[primaryType]}
          </p>
          {secondaryType && (
            <div className="mt-4">
              <span className="rounded-full border border-line bg-sand/40 px-4 py-1.5 text-xs text-muted">
                サブタイプ: {skinTypeLabels[secondaryType]}
              </span>
            </div>
          )}
        </div>

        {/* Scores */}
        <div className="animate-fade-up stagger-1 mb-10 rounded-2xl border border-line bg-surface p-5 shadow-sm sm:p-6">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted">
            スコア詳細
          </p>
          <ScoreBars scores={scores} />
        </div>

        {/* Products */}
        <div className="animate-fade-up stagger-2 mb-10 space-y-8">
          <ProductCards title="あなたの肌タイプにおすすめ" products={primary} />
          {secondary.length > 0 && (
            <ProductCards title="サブタイプ向けのケア" products={secondary} />
          )}
        </div>

        {/* Retry */}
        <div className="animate-fade-up stagger-3 mb-8 text-center">
          <Link
            href="/"
            className="inline-block rounded-full border border-line px-8 py-3 text-base font-medium text-ink transition-colors hover:border-sage hover:bg-sage/5"
          >
            もう一度診断する
          </Link>
        </div>

        {/* Disclaimer */}
        <p className="animate-fade-up stagger-4 border-t border-line pt-6 text-center text-[11px] leading-relaxed text-muted/60">
          ※ この診断結果は医療行為ではありません。スキンケアの参考としてご活用ください。
          <br />
          肌トラブルが続く場合は、皮膚科医にご相談ください。
        </p>
      </div>
    </div>
  );
}
