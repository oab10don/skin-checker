"use client";

import { useState, useSyncExternalStore } from "react";

const SHARED_KEY = "skin-check-has-shared";
const COUPON_CODE = "SKIN-2026";

/* ── localStorage 読み取り（useSyncExternalStore） ── */
function getSnapshot(): string | null {
  return localStorage.getItem(SHARED_KEY);
}
function getServerSnapshot(): string | null {
  return null;
}
function subscribe(cb: () => void): () => void {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
}

/* ── アイコン ── */
function LineIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386a.63.63 0 0 1-.63-.629V8.108a.63.63 0 0 1 .63-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016a.63.63 0 0 1-.63.63.626.626 0 0 1-.51-.262l-2.397-3.262v2.894a.63.63 0 0 1-.63.63.63.63 0 0 1-.631-.63V8.108a.63.63 0 0 1 .631-.63c.2 0 .383.095.51.262l2.397 3.262V8.108a.63.63 0 0 1 .63-.63c.349 0 .63.285.63.63v4.771zm-5.741 0a.63.63 0 0 1-1.261 0V8.108a.63.63 0 0 1 1.261 0v4.771zm-2.451.63H4.932a.63.63 0 0 1-.63-.63V8.108a.63.63 0 0 1 1.261 0v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.63-.629.63M12 1C5.373 1 0 5.373 0 12c0 5.018 3.163 9.322 7.627 11.014.105.02.223-.027.223-.116l-.003-.543c-3.1.674-3.754-1.32-3.754-1.32-.506-1.289-1.236-1.632-1.236-1.632-1.01-.692.077-.678.077-.678 1.117.079 1.705 1.147 1.705 1.147.993 1.702 2.605 1.21 3.24.925.1-.72.388-1.21.706-1.489-2.474-.281-5.075-1.237-5.075-5.506 0-1.216.434-2.21 1.148-2.99-.116-.28-.497-1.413.108-2.945 0 0 .936-.3 3.066 1.142A10.7 10.7 0 0 1 12 5.48c.948.005 1.902.128 2.794.376 2.13-1.443 3.064-1.142 3.064-1.142.607 1.532.226 2.665.11 2.945.715.78 1.147 1.774 1.147 2.99 0 4.28-2.604 5.222-5.085 5.498.4.344.756 1.024.756 2.063l-.005 3.059c0 .09.12.138.226.116C20.84 21.32 24 17.018 24 12c0-6.627-5.373-11-12-11" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function ShareAndCoupon() {
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [justShared, setJustShared] = useState(false);

  const hasShared = !!stored || justShared;

  function handleShare(platform: "line" | "x") {
    const url = encodeURIComponent(window.location.href);
    const shareUrl =
      platform === "line"
        ? `https://social-plugins.line.me/lineit/share?url=${url}`
        : `https://twitter.com/intent/tweet?text=${encodeURIComponent("今日の肌診断結果をチェック")}&url=${url}`;

    window.location.href = shareUrl;
    localStorage.setItem(SHARED_KEY, "1");
    setJustShared(true);
  }

  return (
    <>
      {/* ── Share section ── */}
      <div className="animate-fade-up stagger-2 mb-8 rounded-2xl border border-line bg-surface p-5 text-center shadow-sm sm:p-6">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-muted">
          診断結果をシェア
        </p>
        <p className="mb-5 text-sm leading-relaxed text-muted">
          診断結果をシェアすると、診断者限定クーポンコードが表示されます。
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => handleShare("line")}
            className="flex items-center gap-2 rounded-full bg-[#06C755] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:brightness-110"
          >
            <LineIcon />
            LINEでシェア
          </button>
          <button
            onClick={() => handleShare("x")}
            className="flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-ink/80"
          >
            <XIcon />
            Xでシェア
          </button>
        </div>
      </div>

      {/* ── Coupon section ── */}
      <div className="animate-fade-up stagger-3 mb-10 rounded-2xl border border-line bg-sand/20 p-5 text-center sm:p-6">
        <p className="mb-1 text-xs font-medium uppercase tracking-[0.2em] text-muted">
          診断者限定クーポン
        </p>
        <p className="mb-4 text-sm text-muted">
          このコードをECサイトでご利用ください
        </p>

        {/* Code display */}
        <div className="relative mx-auto inline-block">
          <span
            className={`inline-block rounded-lg border-2 border-dashed border-sage/40 bg-surface px-6 py-3 font-mono text-xl font-bold tracking-[0.15em] text-sage-dark transition-all duration-500 ${
              hasShared ? "" : "blur-[12px] opacity-60 select-none"
            }`}
          >
            {COUPON_CODE}
          </span>

          {/* Overlay hint */}
          {!hasShared && (
            <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-ink/70">
              シェアすると表示されます
            </span>
          )}
        </div>

        {/* Guidance */}
        {!hasShared && (
          <p className="mt-4 text-xs leading-relaxed text-muted/70">
            LINEまたはXでシェアするとクーポンコードが表示されます。
          </p>
        )}
      </div>
    </>
  );
}
