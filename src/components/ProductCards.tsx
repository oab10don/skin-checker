"use client";

import type { Product } from "@/lib/types";

type ProductCardsProps = {
  title: string;
  products: Product[];
};

/** 楽天ロゴ（Rマーク簡易版） */
function RakutenLogo() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.5 3C10.46 3 8 5.46 8 8.5c0 1.83.9 3.45 2.27 4.45L7.5 21h3.04l2.23-6.52c.24.02.48.02.73.02.37 0 .73-.03 1.08-.09L16.5 21h3.04l-3.18-9.15C18.04 10.68 19 9.7 19 8.5 19 5.46 16.54 3 13.5 3zm0 8c-1.93 0-3.5-1.57-3.5-3.5S11.57 4 13.5 4 17 5.57 17 7.5 15.43 11 13.5 11z" />
    </svg>
  );
}

/** Amazonロゴ（矢印スマイル簡易版） */
function AmazonLogo() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.93 17.09c-2.71 2-6.64 3.07-10.03 3.07-4.75 0-9.02-1.76-12.25-4.68-.25-.23-.03-.54.28-.36 3.49 2.03 7.81 3.25 12.27 3.25 3.01 0 6.32-.62 9.37-1.92.46-.2.85.3.36.64z" transform="translate(3 0)" />
      <path d="M17.23 15.55c-.35-.44-2.28-.21-3.15-.11-.26.03-.3-.2-.07-.37 1.55-1.09 4.07-.77 4.37-.41.29.37-.08 2.91-1.53 4.13-.22.19-.44.09-.34-.16.33-.82 1.07-2.64.72-3.08z" transform="translate(3 0)" />
    </svg>
  );
}

/** BASEロゴ（ショッピングバッグ簡易版） */
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

export default function ProductCards({ title, products }: ProductCardsProps) {
  if (products.length === 0) return null;

  return (
    <div>
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted">
        {title}
      </p>
      <div className="space-y-3">
        {products.map((product, i) => (
          <div
            key={product.id}
            className="animate-soft-pop overflow-hidden rounded-2xl border border-line bg-surface shadow-sm"
            style={{ animationDelay: `${0.1 + i * 0.05}s` }}
          >
            <div className="p-5">
              <h3 className="mb-1 font-heading text-lg leading-snug tracking-[0.04em] text-ink">
                {product.name}
              </h3>
              {product.priceText && (
                <p className="mb-4 text-sm text-muted">{product.priceText}</p>
              )}
              <div className="flex gap-2">
                {STORE_BUTTONS.map(({ key, label, icon: Icon, className }) => {
                  const href = product.storeLinks?.[key] ?? product.url;
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
          </div>
        ))}
      </div>
    </div>
  );
}
