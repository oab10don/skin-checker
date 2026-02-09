export type SkinType =
  | "dry"
  | "oily"
  | "combination"
  | "sensitive"
  | "innerDry"
  | "pores"
  | "dullness";

export type ScoreAxis = "moisture" | "sebum" | "sensitive" | "pores" | "dullness";

export type Scores = Record<ScoreAxis, number>;

export type ScoreDelta = Partial<Record<ScoreAxis, number>>;

export type Question = {
  id: number;
  text: string;
  options: {
    label: string;
    delta: ScoreDelta;
  }[];
};

export type StoreLinks = {
  rakuten?: string;
  amazon?: string;
  base?: string;
};

export type Product = {
  id: string;
  name: string;
  priceText?: string;
  url: string;
  storeLinks?: StoreLinks;
  tags: SkinType[];
};

export type DiagnosisResult = {
  scores: Scores;
  primaryType: SkinType;
  secondaryType?: SkinType;
};
