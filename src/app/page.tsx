"use client";

import Link from "next/link";
import Header from "@/components/Header";
import DemoModal from "@/components/DemoModal";

export default function Home() {
  const today = new Date().toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex min-h-dvh flex-col px-4 py-10 sm:py-16">
      <div className="mx-auto w-full max-w-xl">
        <Header />
      </div>

      <div className="mx-auto flex flex-1 flex-col items-center justify-center text-center">
        {/* Hero */}
        <div className="animate-fade-up">
          <h1 className="font-heading text-3xl leading-snug tracking-[0.06em] text-ink sm:text-4xl">
            あなたの肌タイプを
            <br />
            知ることから始めよう
          </h1>
          <p className="mx-auto mt-5 max-w-sm text-base leading-relaxed text-muted">
            10問の質問に答えるだけで、5つの軸からあなたの肌を分析。
            ぴったりのスキンケアアイテムをご提案します。
          </p>
        </div>

        {/* Date & Duration */}
        <div className="animate-fade-up stagger-1 mt-10 flex flex-col items-center gap-1.5">
          <p className="text-sm tracking-wide text-ink">{today}</p>
          <p className="text-xs text-muted/70">所要時間：約1分（全10問）</p>
        </div>

        {/* CTA */}
        <div className="animate-fade-up stagger-2 mt-8 flex flex-col items-center">
          <Link
            href="/diagnose"
            className="inline-block rounded-full bg-sage px-7 py-4 text-base font-medium text-white shadow-sm transition-all hover:bg-sage-dark"
          >
            今日の診断を始める
          </Link>
          <p className="mt-2 text-xs text-muted/70">
            登録不要・無料で診断できます
          </p>
        </div>

        {/* Feature chips */}
        <div className="animate-fade-up stagger-3 mt-12 flex flex-wrap justify-center gap-2">
          {["7タイプ判定", "5軸スコア分析", "おすすめ商品紹介"].map(
            (chip) => (
              <span
                key={chip}
                className="rounded-full border border-line bg-sand/40 px-4 py-1.5 text-xs text-muted"
              >
                {chip}
              </span>
            )
          )}
        </div>

        {/* Disclaimer */}
        <p className="animate-fade-up stagger-4 mt-12 max-w-xs text-xs leading-relaxed text-muted/60">
          ※ この診断は医療行為ではありません。スキンケアの参考としてお楽しみください。
        </p>
      </div>

      <DemoModal />
    </div>
  );
}
