import type { StoreLinks } from "./types";

export type RecommendationCategory = "herb_tea" | "herb_water";

export type RecommendationItem = {
  id: string;
  name: string;
  description?: string;
  priceText?: string;
  url: string;
  storeLinks?: StoreLinks;
};

export type RecommendationSection = {
  title: string;
  subtitle: string;
  category: RecommendationCategory;
  items: RecommendationItem[];
};

/**
 * おすすめアイテムの2枠構成データ。
 * items を追加・差し替えすることで商品表示が反映される。
 */
export const recommendations: {
  inside: RecommendationSection;
  outside: RecommendationSection;
} = {
  inside: {
    title: "身体の内側から",
    subtitle: "おすすめのハーブティー",
    category: "herb_tea",
    items: [
      // 商品追加例:
      // {
      //   id: "ht01",
      //   name: "リラックスカモミールブレンド",
      //   description: "就寝前のリラックスタイムに",
      //   priceText: "¥1,980",
      //   url: "#",
      //   storeLinks: { rakuten: "#", amazon: "#", base: "#" },
      // },
    ],
  },
  outside: {
    title: "身体の外側から",
    subtitle: "おすすめのハーブウォーター",
    category: "herb_water",
    items: [
      // 商品追加例:
      // {
      //   id: "hw01",
      //   name: "ローズマリーハーブウォーター",
      //   description: "洗顔後の肌を整えるミスト",
      //   priceText: "¥2,480",
      //   url: "#",
      //   storeLinks: { rakuten: "#", amazon: "#", base: "#" },
      // },
    ],
  },
};
