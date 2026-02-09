import Link from "next/link";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="min-h-dvh px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-xl">
        <Header />

        <div className="flex flex-1 flex-col items-center justify-center text-center">
          {/* Hero */}
          <div className="animate-fade-up">
            <p className="mb-3 text-sm tracking-widest text-muted">
              MARIKO SHIMODOZONO CHECK TOOL
            </p>
            <h1 className="mb-6 font-serif text-3xl leading-snug text-ink sm:text-4xl">
              あなたの肌タイプを
              <br />
              知ることから始めよう
            </h1>
            <p className="mx-auto mb-4 max-w-sm text-base leading-relaxed text-muted">
              10問の質問に答えるだけで、5つの軸からあなたの肌を分析。
              ぴったりのスキンケアアイテムをご提案します。
            </p>
          </div>

          {/* CTA */}
          <div className="animate-fade-up stagger-2 mt-6 flex flex-col items-center">
            <Link
              href="/diagnose"
              className="inline-block rounded-full bg-sage px-8 py-3.5 text-base font-medium text-white shadow-sm transition-all hover:bg-sage-dark hover:shadow-md"
            >
              診断をはじめる
            </Link>
          </div>

          {/* Feature chips */}
          <div className="animate-fade-up stagger-3 mt-10 flex flex-wrap justify-center gap-2">
            {["7タイプ判定", "5軸スコア分析", "おすすめ商品紹介", "約2分で完了"].map(
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
          <p className="animate-fade-up stagger-4 mt-10 max-w-xs text-xs leading-relaxed text-muted/70">
            ※ この診断は医療行為ではありません。スキンケアの参考としてお楽しみください。
          </p>
        </div>
      </div>
    </div>
  );
}
