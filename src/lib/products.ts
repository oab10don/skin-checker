import type { Product, SkinType } from "./types";

export const products: Product[] = [
  // 乾燥タイプ向け
  {
    id: "p01",
    name: "モイスチャーリッチクリーム",
    priceText: "¥3,980",
    url: "https://example.com/products/moisture-rich-cream",
    tags: ["dry", "innerDry"],
  },
  {
    id: "p02",
    name: "ヒアルロン酸保湿セラム",
    priceText: "¥2,980",
    url: "https://example.com/products/hyaluronic-serum",
    tags: ["dry"],
  },
  {
    id: "p03",
    name: "セラミド配合化粧水",
    priceText: "¥2,480",
    url: "https://example.com/products/ceramide-lotion",
    tags: ["dry", "sensitive"],
  },
  // 脂性タイプ向け
  {
    id: "p04",
    name: "皮脂コントロールジェル",
    priceText: "¥2,780",
    url: "https://example.com/products/sebum-control-gel",
    tags: ["oily"],
  },
  {
    id: "p05",
    name: "さっぱり泡洗顔フォーム",
    priceText: "¥1,980",
    url: "https://example.com/products/oil-control-wash",
    tags: ["oily", "pores"],
  },
  {
    id: "p06",
    name: "ビタミンC 美容液",
    priceText: "¥3,480",
    url: "https://example.com/products/vitamin-c-serum",
    tags: ["oily", "dullness", "pores"],
  },
  // 混合タイプ向け
  {
    id: "p07",
    name: "バランシングローション",
    priceText: "¥2,680",
    url: "https://example.com/products/balancing-lotion",
    tags: ["combination"],
  },
  {
    id: "p08",
    name: "Tゾーン専用ジェルクリーム",
    priceText: "¥2,180",
    url: "https://example.com/products/tzone-gel",
    tags: ["combination", "oily"],
  },
  {
    id: "p09",
    name: "パーツケアセット",
    priceText: "¥4,980",
    url: "https://example.com/products/parts-care-set",
    tags: ["combination", "innerDry"],
  },
  // 敏感タイプ向け
  {
    id: "p10",
    name: "低刺激クレンジングミルク",
    priceText: "¥2,380",
    url: "https://example.com/products/gentle-cleansing",
    tags: ["sensitive"],
  },
  {
    id: "p11",
    name: "カーミングエッセンス",
    priceText: "¥3,280",
    url: "https://example.com/products/calming-essence",
    tags: ["sensitive", "dry"],
  },
  {
    id: "p12",
    name: "敏感肌用日焼け止めジェル",
    priceText: "¥1,780",
    url: "https://example.com/products/sensitive-sunscreen",
    tags: ["sensitive"],
  },
  // インナードライ向け
  {
    id: "p13",
    name: "ウォーターバースト美容液",
    priceText: "¥3,580",
    url: "https://example.com/products/water-burst-serum",
    tags: ["innerDry"],
  },
  {
    id: "p14",
    name: "軽やか保湿ジェルクリーム",
    priceText: "¥2,880",
    url: "https://example.com/products/light-moisture-gel",
    tags: ["innerDry", "combination"],
  },
  // 毛穴ケアタイプ向け
  {
    id: "p15",
    name: "毛穴引き締め美容液",
    priceText: "¥3,180",
    url: "https://example.com/products/pore-tightening",
    tags: ["pores"],
  },
  {
    id: "p16",
    name: "クレイ洗顔パック",
    priceText: "¥2,280",
    url: "https://example.com/products/clay-wash-pack",
    tags: ["pores", "oily"],
  },
  {
    id: "p17",
    name: "角質ケアピーリングジェル",
    priceText: "¥1,980",
    url: "https://example.com/products/peeling-gel",
    tags: ["pores", "dullness"],
  },
  // くすみケアタイプ向け
  {
    id: "p18",
    name: "ブライトニングエッセンス",
    priceText: "¥3,680",
    url: "https://example.com/products/brightening-essence",
    tags: ["dullness"],
  },
  {
    id: "p19",
    name: "トーンアップ化粧水",
    priceText: "¥2,580",
    url: "https://example.com/products/tone-up-lotion",
    tags: ["dullness"],
  },
  {
    id: "p20",
    name: "ナイアシンアミド美容液",
    priceText: "¥3,280",
    url: "https://example.com/products/niacinamide-serum",
    tags: ["dullness", "pores"],
  },
  // 汎用人気商品（フォールバック）
  {
    id: "p99",
    name: "オールインワンモイスチャージェル",
    priceText: "¥2,980",
    url: "https://example.com/products/all-in-one-gel",
    tags: ["dry", "oily", "combination", "sensitive", "innerDry", "pores", "dullness"],
  },
];

/** primaryType / secondaryType に基づき商品を推薦 */
export function recommendProducts(
  primaryType: SkinType,
  secondaryType?: SkinType
): { primary: Product[]; secondary: Product[] } {
  const primaryProducts = products
    .filter((p) => p.tags.includes(primaryType))
    .slice(0, 3);

  const primaryIds = new Set(primaryProducts.map((p) => p.id));

  let secondaryProducts: Product[] = [];
  if (secondaryType) {
    secondaryProducts = products
      .filter((p) => p.tags.includes(secondaryType) && !primaryIds.has(p.id))
      .slice(0, 2);
  }

  // フォールバック: primary が 3件未満なら汎用商品で補完
  if (primaryProducts.length < 3) {
    const existing = new Set([...primaryIds, ...secondaryProducts.map((p) => p.id)]);
    const fallbacks = products
      .filter((p) => !existing.has(p.id) && p.tags.length >= 3)
      .slice(0, 3 - primaryProducts.length);
    primaryProducts.push(...fallbacks);
  }

  return { primary: primaryProducts, secondary: secondaryProducts };
}
