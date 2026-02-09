import type { Product, SkinType } from "./types";

export const products: Product[] = [
  // 乾燥タイプ向け
  {
    id: "p01",
    name: "モイスチャーリッチクリーム",
    priceText: "¥3,980",
    url: "#",
    storeLinks: { rakuten: "#", amazon: "#", base: "#" },
    tags: ["dry", "innerDry"],
  },
  {
    id: "p02",
    name: "ヒアルロン酸保湿セラム",
    priceText: "¥2,980",
    url: "#",
    storeLinks: { rakuten: "#", amazon: "#", base: "#" },
    tags: ["dry"],
  },
  {
    id: "p03",
    name: "セラミド配合化粧水",
    priceText: "¥2,480",
    url: "#",
    storeLinks: { rakuten: "#", amazon: "#", base: "#" },
    tags: ["dry", "sensitive"],
  },
  // 脂性タイプ向け
  {
    id: "p04",
    name: "皮脂コントロールジェル",
    priceText: "¥2,780",
    url: "#",
    storeLinks: { rakuten: "#", amazon: "#", base: "#" },
    tags: ["oily"],
  },
  {
    id: "p05",
    name: "さっぱり泡洗顔フォーム",
    priceText: "¥1,980",
    url: "#",
    storeLinks: { rakuten: "#", amazon: "#", base: "#" },
    tags: ["oily", "pores"],
  },
  {
    id: "p06",
    name: "ビタミンC 美容液",
    priceText: "¥3,480",
    url: "#",
    storeLinks: { rakuten: "#", amazon: "#", base: "#" },
    tags: ["oily", "dullness", "pores"],
  },
  // 混合タイプ向け
  {
    id: "p07",
    name: "バランシングローション",
    priceText: "¥2,680",
    url: "#",
    storeLinks: { rakuten: "#", amazon: "#", base: "#" },
    tags: ["combination"],
  },
  {
    id: "p08",
    name: "Tゾーン専用ジェルクリーム",
    priceText: "¥2,180",
    url: "#",
    storeLinks: { rakuten: "#", amazon: "#", base: "#" },
    tags: ["combination", "oily"],
  },
  {
    id: "p09",
    name: "パーツケアセット",
    priceText: "¥4,980",
    url: "#",
    storeLinks: { rakuten: "#", amazon: "#", base: "#" },
    tags: ["combination", "innerDry"],
  },
  // 敏感タイプ向け
  {
    id: "p10",
    name: "低刺激クレンジングミルク",
    priceText: "¥2,380",
    url: "#",
    storeLinks: { rakuten: "#", amazon: "#", base: "#" },
    tags: ["sensitive"],
  },
  {
    id: "p11",
    name: "カーミングエッセンス",
    priceText: "¥3,280",
    url: "#",
    storeLinks: { rakuten: "#", amazon: "#", base: "#" },
    tags: ["sensitive", "dry"],
  },
  {
    id: "p12",
    name: "敏感肌用日焼け止めジェル",
    priceText: "¥1,780",
    url: "#",
    storeLinks: { rakuten: "#", amazon: "#", base: "#" },
    tags: ["sensitive"],
  },
  // インナードライ向け
  {
    id: "p13",
    name: "ウォーターバースト美容液",
    priceText: "¥3,580",
    url: "#",
    storeLinks: { rakuten: "#", amazon: "#", base: "#" },
    tags: ["innerDry"],
  },
  {
    id: "p14",
    name: "軽やか保湿ジェルクリーム",
    priceText: "¥2,880",
    url: "#",
    storeLinks: { rakuten: "#", amazon: "#", base: "#" },
    tags: ["innerDry", "combination"],
  },
  // 毛穴ケアタイプ向け
  {
    id: "p15",
    name: "毛穴引き締め美容液",
    priceText: "¥3,180",
    url: "#",
    storeLinks: { rakuten: "#", amazon: "#", base: "#" },
    tags: ["pores"],
  },
  {
    id: "p16",
    name: "クレイ洗顔パック",
    priceText: "¥2,280",
    url: "#",
    storeLinks: { rakuten: "#", amazon: "#", base: "#" },
    tags: ["pores", "oily"],
  },
  {
    id: "p17",
    name: "角質ケアピーリングジェル",
    priceText: "¥1,980",
    url: "#",
    storeLinks: { rakuten: "#", amazon: "#", base: "#" },
    tags: ["pores", "dullness"],
  },
  // くすみケアタイプ向け
  {
    id: "p18",
    name: "ブライトニングエッセンス",
    priceText: "¥3,680",
    url: "#",
    storeLinks: { rakuten: "#", amazon: "#", base: "#" },
    tags: ["dullness"],
  },
  {
    id: "p19",
    name: "トーンアップ化粧水",
    priceText: "¥2,580",
    url: "#",
    storeLinks: { rakuten: "#", amazon: "#", base: "#" },
    tags: ["dullness"],
  },
  {
    id: "p20",
    name: "ナイアシンアミド美容液",
    priceText: "¥3,280",
    url: "#",
    storeLinks: { rakuten: "#", amazon: "#", base: "#" },
    tags: ["dullness", "pores"],
  },
  // 汎用人気商品（フォールバック）
  {
    id: "p99",
    name: "オールインワンモイスチャージェル",
    priceText: "¥2,980",
    url: "#",
    storeLinks: { rakuten: "#", amazon: "#", base: "#" },
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
