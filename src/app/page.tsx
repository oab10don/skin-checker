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
    <div className="flex min-h-dvh flex-col px-5 py-6 sm:px-4 sm:py-10">
      <div className="mx-auto w-full max-w-xl">
        <Header />
      </div>

      <div className="mx-auto flex flex-1 flex-col items-center justify-center text-center">
        {/* Hero */}
        <div>
          <h1 className="font-serif text-[1.625rem] font-bold leading-[1.85] tracking-[0.04em] text-ink sm:text-4xl sm:leading-[1.7]">
            <span
              className="animate-hero-reveal inline-block"
              style={{ animationDelay: "0.15s" }}
            >
              今日の肌を
            </span>
            <br />
            <span
              className="animate-hero-reveal inline-block"
              style={{ animationDelay: "0.45s" }}
            >
              知ることから
            </span>
            <br />
            <span
              className="animate-hero-reveal inline-block"
              style={{ animationDelay: "0.75s" }}
            >
              はじまるケア
            </span>
          </h1>
          <div className="mx-auto mt-7 max-w-xs sm:max-w-sm">
            {[
              "10問の質問に答えると",
              "5つの軸から",
              "今日の肌状態を分析し",
              "あなたに合ったスキンケアを",
              "ご提案します",
            ].map((line, i) => (
              <p
                key={i}
                className="animate-hero-reveal text-[0.9rem] leading-[2] text-muted sm:text-base"
                style={{ animationDelay: `${1.1 + i * 0.12}s` }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Date */}
        <p
          className="animate-hero-reveal mt-10 text-sm tracking-wide text-ink"
          style={{ animationDelay: "1.8s" }}
        >
          {today}
        </p>

        {/* CTA */}
        <div
          className="animate-hero-reveal mt-3 flex flex-col items-center"
          style={{ animationDelay: "2.0s" }}
        >
          <Link
            href="/diagnose"
            onClick={() => sessionStorage.removeItem("diagProgress")}
            className="inline-block rounded-full bg-sage px-7 py-4 text-base font-medium text-white shadow-sm transition-all hover:bg-sage-dark"
          >
            今日の診断を始める
          </Link>
          <p className="mt-4 text-xs text-muted/70">
            所要時間：約1分（全10問）
          </p>
          <p className="mt-1.5 text-xs text-muted/70">
            登録不要・無料で診断できます
          </p>
        </div>

        {/* Feature chips */}
        <div
          className="animate-hero-reveal mt-14 flex flex-wrap justify-center gap-2"
          style={{ animationDelay: "2.2s" }}
        >
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
        <p
          className="animate-hero-reveal mt-14 max-w-xs text-xs leading-relaxed text-muted/60"
          style={{ animationDelay: "2.4s" }}
        >
          ※ この診断は医療行為ではありません。スキンケアの参考としてお楽しみください。
        </p>
      </div>

      <DemoModal />
    </div>
  );
}
