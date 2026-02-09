"use client";

import { useState, useSyncExternalStore } from "react";

const STORAGE_KEY = "checktool-demo-seen";

function getSnapshot(): string | null {
  return localStorage.getItem(STORAGE_KEY);
}

function getServerSnapshot(): string | null {
  return "1"; // SSR では「表示済み」扱い（モーダルを出さない）
}

function subscribe(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export default function DemoModal() {
  const seen = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [dismissed, setDismissed] = useState(false);

  if (seen || dismissed) return null;

  function handleClose() {
    localStorage.setItem(STORAGE_KEY, "1");
    setDismissed(true);
  }

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
          onClick={handleClose}
          className="mt-6 inline-block rounded-full bg-sage px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-sage-dark"
        >
          OK
        </button>
      </div>
    </div>
  );
}
