import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "肌診断 | MARIKO SHIMODOZONO CHECK TOOL",
  description:
    "10問の質問に答えるだけで、あなたの肌タイプを診断。おすすめのスキンケア商品もご紹介します。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="grain font-sans antialiased">{children}</body>
    </html>
  );
}
