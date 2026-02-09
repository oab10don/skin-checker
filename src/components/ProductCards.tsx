"use client";

import type { Product } from "@/lib/types";

type ProductCardsProps = {
  title: string;
  products: Product[];
};

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
              <h3 className="mb-1 font-heading text-lg leading-snug text-ink">
                {product.name}
              </h3>
              {product.priceText && (
                <p className="mb-3 text-sm text-muted">{product.priceText}</p>
              )}
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-sage px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-sage-dark hover:shadow-md"
              >
                商品を見る
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
