"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import ScoreBars from "@/components/ScoreBars";
import ShareAndCoupon from "@/components/ShareAndCoupon";
import ProductCards from "@/components/ProductCards";
import ShopModal from "@/components/ShopModal";
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
  const [mounted, setMounted] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  const result: DiagnosisResult | null = stored
    ? (JSON.parse(stored) as DiagnosisResult)
    : null;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !result) {
      router.replace("/");
    }
  }, [mounted, result, router]);

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
            <h1 className="font-serif text-3xl font-bold tracking-[0.06em] text-sage-dark sm:text-4xl">
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
          <p className="mb-4 text-center text-xs font-medium uppercase tracking-[0.2em] text-muted">
            スコア詳細
          </p>
          <ScoreBars scores={scores} />
        </div>

        {/* Share & Coupon */}
        <ShareAndCoupon />

        {/* Products - emphasized */}
        <div className="animate-fade-up stagger-4 mb-10">
          <div className="mb-6 text-center">
            <span className="inline-block rounded-full bg-sage/10 px-4 py-1.5 text-xs font-medium tracking-[0.1em] text-sage-dark">
              あなただけのケア提案
            </span>
            <h2 className="mt-3 font-serif text-xl font-bold tracking-wide text-ink">
              おすすめスキンケア
            </h2>
          </div>
          <div className="space-y-8">
            <ProductCards title="あなたの肌タイプにおすすめ" products={primary} />
            {secondary.length > 0 && (
              <ProductCards title="サブタイプ向けのケア" products={secondary} />
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="animate-fade-up stagger-5 mb-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <Link
            href="/"
            className="inline-block w-full rounded-full border border-line px-8 py-3 text-center text-base font-medium text-ink transition-colors hover:border-sage hover:bg-sage/5 sm:w-auto"
          >
            もう一度診断する
          </Link>
          <button
            onClick={() => setShopOpen(true)}
            className="inline-block w-full rounded-full bg-sage px-8 py-3 text-center text-base font-medium text-white shadow-sm transition-all hover:bg-sage-dark sm:w-auto"
          >
            ショップを見る
          </button>
        </div>

        {/* Disclaimer */}
        <p className="animate-fade-up border-t border-line pt-6 text-center text-[11px] leading-relaxed text-muted/60">
          ※ この診断結果は医療行為ではありません。スキンケアの参考としてご活用ください。
          <br />
          肌トラブルが続く場合は、皮膚科医にご相談ください。
        </p>
      </div>

      <ShopModal open={shopOpen} onClose={() => setShopOpen(false)} />
    </div>
  );
}
