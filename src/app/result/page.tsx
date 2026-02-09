"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import ScoreBars from "@/components/ScoreBars";
import ShareAndCoupon from "@/components/ShareAndCoupon";
import RecommendationCards from "@/components/RecommendationCards";
import ProductCards from "@/components/ProductCards";
import ShopModal from "@/components/ShopModal";
import Image from "next/image";
import { skinTypeLabels, skinTypeDescriptions, skinTypeImages } from "@/lib/labels";
import { recommendations } from "@/lib/recommendations";
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

  // 全おすすめ商品を統合して配分:
  // 1点目 → 内側の箱、2点目 → 外側の箱、残り3点 → 箱の下
  const allRecommended = [...primary, ...secondary];
  const insideProduct = allRecommended[0];
  const outsideProduct = allRecommended[1];
  const belowProducts = allRecommended.slice(2, 5);

  return (
    <div className="min-h-dvh px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-xl">
        <Header />

        {/* Type header */}
        <div className="animate-fade-up mb-10 rounded-2xl border border-line bg-surface p-5 text-center shadow-sm sm:p-6">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted">
            あなたの肌タイプは
          </p>
          <div className="mb-6">
            <Image
              src={skinTypeImages[primaryType]}
              alt={skinTypeLabels[primaryType]}
              width={240}
              height={240}
              className="mx-auto h-40 w-40 object-contain sm:h-48 sm:w-48"
              priority
            />
          </div>
          <h1 className="mb-3 whitespace-nowrap font-serif text-2xl font-bold tracking-[0.06em] text-sage-dark min-[400px]:text-3xl sm:text-4xl">
            {skinTypeLabels[primaryType]}
          </h1>
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

        {/* Recommendations */}
        <div className="animate-fade-up stagger-4 mb-10">
          <div className="mb-6 text-center">
            <span className="inline-block rounded-full bg-sage/10 px-4 py-1.5 text-xs font-medium tracking-[0.1em] text-sage-dark">
              あなただけのケア提案
            </span>
            <h2 className="mt-3 font-serif text-xl font-bold tracking-wide text-ink">
              おすすめアイテム
            </h2>
          </div>

          {/* Inside / Outside boxes (1 product each) */}
          <div className="space-y-4">
            <RecommendationCards
              section={recommendations.inside}
              featuredProduct={insideProduct}
            />
            <RecommendationCards
              section={recommendations.outside}
              featuredProduct={outsideProduct}
            />
          </div>

          {/* Additional recommended products (3 items below) */}
          {belowProducts.length > 0 && (
            <div className="mt-6">
              <ProductCards
                title="あなたの肌タイプにおすすめ"
                products={belowProducts}
              />
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="animate-fade-up stagger-5 mb-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <Link
            href="/"
            onClick={() => sessionStorage.removeItem("diagProgress")}
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
