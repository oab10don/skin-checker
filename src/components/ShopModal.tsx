"use client";

/** ショップ遷移先URL（後から設定可能） */
export const SHOP_URLS = {
  rakuten: "#",
  amazon: "#",
  base: "#",
} as const;

type ShopModalProps = {
  open: boolean;
  onClose: () => void;
};

function RakutenIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 4h7a5 5 0 0 1 3.5 8.6L21 21h-3.5l-4.2-7.5H9V21H6V4zm3 2.5v5h4a2.5 2.5 0 0 0 0-5H9z" />
    </svg>
  );
}

function AmazonIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.93 17.09c-2.71 2-6.64 3.07-10.03 3.07-4.75 0-9.02-1.76-12.25-4.68-.25-.23-.03-.54.28-.36 3.49 2.03 7.81 3.25 12.27 3.25 3.01 0 6.32-.62 9.37-1.92.46-.2.85.3.36.64z" transform="translate(3 0)" />
      <path d="M17.23 15.55c-.35-.44-2.28-.21-3.15-.11-.26.03-.3-.2-.07-.37 1.55-1.09 4.07-.77 4.37-.41.29.37-.08 2.91-1.53 4.13-.22.19-.44.09-.34-.16.33-.82 1.07-2.64.72-3.08z" transform="translate(3 0)" />
    </svg>
  );
}

function BaseIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 14H6V8h2v2h4V8h2v2h4v8z" />
    </svg>
  );
}

const STORES = [
  {
    key: "rakuten" as const,
    label: "楽天市場で見る",
    icon: RakutenIcon,
    className: "bg-[#BF0000] text-white hover:bg-[#a30000]",
  },
  {
    key: "amazon" as const,
    label: "Amazonで見る",
    icon: AmazonIcon,
    className: "bg-[#232F3E] text-[#FF9900] hover:bg-[#1a2533]",
  },
  {
    key: "base" as const,
    label: "BASEで見る",
    icon: BaseIcon,
    className: "bg-[#2b2b2b] text-white hover:bg-[#1a1a1a]",
  },
];

export default function ShopModal({ open, onClose }: ShopModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center bg-ink/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="animate-soft-pop mx-4 w-full max-w-sm rounded-2xl bg-surface p-7 text-center shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-serif text-lg font-bold tracking-[0.04em] text-ink">
          ショップを選択
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          お好みのショップでお買い物いただけます
        </p>

        <div className="mt-6 flex flex-col gap-3">
          {STORES.map(({ key, label, icon: Icon, className }) => (
            <a
              key={key}
              href={SHOP_URLS[key]}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2.5 rounded-xl py-3.5 text-sm font-medium shadow-sm transition-all ${className}`}
            >
              <Icon />
              {label}
            </a>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-5 text-sm text-muted transition-colors hover:text-ink"
        >
          閉じる
        </button>
      </div>
    </div>
  );
}
