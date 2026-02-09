import type { Metadata } from "next";
import { Playfair_Display, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "肌診断 | MARIKO SHIMODOZONO",
  description:
    "10問の質問に答えるだけで、あなたの肌タイプを診断。おすすめのスキンケア商品もご紹介します。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${playfair.variable} ${notoSansJP.variable}`}>
      <body className="grain font-body antialiased">{children}</body>
    </html>
  );
}
