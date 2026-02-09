"use client";

import type { RecommendationSection } from "@/lib/recommendations";
import type { Product } from "@/lib/types";

type RecommendationCardsProps = {
  section: RecommendationSection;
  /** 診断結果から選ばれたおすすめ商品（1点） */
  featuredProduct?: Product;
};

/** 楽天ロゴ */
function RakutenLogo() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 4h7a5 5 0 0 1 3.5 8.6L21 21h-3.5l-4.2-7.5H9V21H6V4zm3 2.5v5h4a2.5 2.5 0 0 0 0-5H9z" />
    </svg>
  );
}

/** Amazonロゴ */
function AmazonLogo() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.93 17.09c-2.71 2-6.64 3.07-10.03 3.07-4.75 0-9.02-1.76-12.25-4.68-.25-.23-.03-.54.28-.36 3.49 2.03 7.81 3.25 12.27 3.25 3.01 0 6.32-.62 9.37-1.92.46-.2.85.3.36.64z" transform="translate(3 0)" />
      <path d="M17.23 15.55c-.35-.44-2.28-.21-3.15-.11-.26.03-.3-.2-.07-.37 1.55-1.09 4.07-.77 4.37-.41.29.37-.08 2.91-1.53 4.13-.22.19-.44.09-.34-.16.33-.82 1.07-2.64.72-3.08z" transform="translate(3 0)" />
    </svg>
  );
}

/** BASEロゴ */
function BaseLogo() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 14H6V8h2v2h4V8h2v2h4v8z" />
    </svg>
  );
}

const STORE_BUTTONS = [
  {
    key: "rakuten" as const,
    label: "楽天",
    icon: RakutenLogo,
    className: "bg-[#BF0000] text-white hover:bg-[#a30000]",
  },
  {
    key: "amazon" as const,
    label: "Amazon",
    icon: AmazonLogo,
    className: "bg-[#232F3E] text-[#FF9900] hover:bg-[#1a2533]",
  },
  {
    key: "base" as const,
    label: "BASE",
    icon: BaseLogo,
    className: "bg-[#2b2b2b] text-white hover:bg-[#1a1a1a]",
  },
];

export default function RecommendationCards({
  section,
  featuredProduct,
}: RecommendationCardsProps) {
  const { title, subtitle, items } = section;

  // recommendations.ts の items と featuredProduct を統合
  const allItems = featuredProduct
    ? [
        {
          id: featuredProduct.id,
          name: featuredProduct.name,
          priceText: featuredProduct.priceText,
          url: featuredProduct.url,
          storeLinks: featuredProduct.storeLinks,
        },
        ...items,
      ]
    : items;

  return (
    <div className="rounded-2xl border border-line bg-surface p-5 shadow-sm sm:p-6">
      {/* Section header */}
      <div className="mb-4 text-center">
        <h3 className="font-serif text-lg font-bold tracking-[0.04em] text-ink">
          {title}
        </h3>
        <p className="mt-1 text-xs tracking-wide text-muted">
          {subtitle}
        </p>
      </div>

      {/* Items or empty state */}
      {allItems.length === 0 ? (
        <div className="rounded-xl bg-sand/20 px-4 py-6 text-center">
          <p className="text-sm text-muted">おすすめ商品は準備中です</p>
          <p className="mt-1 text-xs text-muted/60">近日追加予定</p>
        </div>
      ) : (
        <div className="space-y-3">
          {allItems.map((item, i) => (
            <div
              key={item.id}
              className="animate-soft-pop rounded-xl border border-line bg-bg p-4"
              style={{ animationDelay: `${0.1 + i * 0.05}s` }}
            >
              <h4 className="text-center font-heading text-base leading-snug tracking-[0.04em] text-ink">
                {item.name}
              </h4>
              {"description" in item && item.description && (
                <p className="mt-1 text-center text-xs text-muted">
                  {item.description}
                </p>
              )}
              {item.priceText && (
                <p className="mt-1 text-center text-sm text-muted">
                  {item.priceText}
                </p>
              )}
              <div className="mt-3 flex gap-2">
                {STORE_BUTTONS.map(({ key, label, icon: Icon, className }) => {
                  const href = item.storeLinks?.[key] ?? item.url;
                  return (
                    <a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-medium shadow-sm transition-all ${className}`}
                    >
                      <Icon />
                      {label}
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
