"use client";

import { useState } from "react";

export default function DemoModal() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center bg-ink/30 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-modal-title"
    >
      <div className="animate-soft-pop mx-4 w-full max-w-sm rounded-2xl bg-surface p-8 text-center shadow-xl">
        <h2
          id="demo-modal-title"
          className="font-heading text-lg tracking-[0.06em] text-ink"
        >
          DEMO版について
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          このツールは現在デモ版です。
          <br />
          正式公開までしばらくお待ちください。
        </p>
        <button
          onClick={() => setDismissed(true)}
          className="mt-6 inline-block rounded-full bg-sage px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-sage-dark"
        >
          OK
        </button>
      </div>
    </div>
  );
}
