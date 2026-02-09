import type { Metadata } from "next";
import { Cormorant_Garamond, Shippori_Mincho, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const shipporiMincho = Shippori_Mincho({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  weight: ["300", "400", "500"],
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
    <html
      lang="ja"
      className={`${cormorant.variable} ${shipporiMincho.variable} ${notoSansJP.variable}`}
    >
      <body className="grain font-body font-light antialiased">{children}</body>
    </html>
  );
}
