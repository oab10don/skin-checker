import type { Question } from "./types";

export const questions: Question[] = [
  {
    id: 1,
    text: "洗顔後、何もつけずに5分放置すると肌はどうなりますか？",
    options: [
      { label: "全体的につっぱる", delta: { moisture: 25 } },
      { label: "Tゾーンだけテカる", delta: { moisture: 10, sebum: 15 } },
      { label: "全体的にテカる", delta: { sebum: 25 } },
      { label: "特に変化なし", delta: { moisture: 5, sebum: 5 } },
    ],
  },
  {
    id: 2,
    text: "日中のTゾーン（額・鼻）のテカリはどの程度ですか？",
    options: [
      { label: "ほとんどテカらない", delta: { moisture: 10 } },
      { label: "昼頃から少しテカる", delta: { sebum: 10 } },
      { label: "午前中からテカる", delta: { sebum: 20 } },
      { label: "テカるが頬は乾燥する", delta: { sebum: 15, moisture: 15 } },
    ],
  },
  {
    id: 3,
    text: "季節の変わり目に肌トラブルは起きますか？",
    options: [
      { label: "赤みやかゆみが出やすい", delta: { sensitive: 25 } },
      { label: "乾燥がひどくなる", delta: { moisture: 20, sensitive: 5 } },
      { label: "ニキビや吹き出物が増える", delta: { sebum: 15, pores: 10 } },
      { label: "あまり変化なし", delta: { sensitive: 3 } },
    ],
  },
  {
    id: 4,
    text: "新しいスキンケア製品を使ったとき、刺激を感じることはありますか？",
    options: [
      { label: "よく刺激を感じる", delta: { sensitive: 25 } },
      { label: "たまに刺激を感じる", delta: { sensitive: 15 } },
      { label: "ほとんど感じない", delta: { sensitive: 3 } },
      { label: "わからない・気にしたことがない", delta: { sensitive: 5 } },
    ],
  },
  {
    id: 5,
    text: "毛穴の状態について、最も当てはまるのは？",
    options: [
      { label: "鼻や頬の毛穴が目立つ", delta: { pores: 25 } },
      { label: "黒ずみ（いちご鼻）が気になる", delta: { pores: 20, sebum: 5 } },
      { label: "たるみ毛穴（縦長）が気になる", delta: { pores: 15, moisture: 10 } },
      { label: "あまり気にならない", delta: { pores: 3 } },
    ],
  },
  {
    id: 6,
    text: "肌の「くすみ」を感じることはありますか？",
    options: [
      { label: "常にくすんでいる気がする", delta: { dullness: 25 } },
      { label: "夕方になるとくすむ", delta: { dullness: 20 } },
      { label: "たまに気になる程度", delta: { dullness: 10 } },
      { label: "ほとんど感じない", delta: { dullness: 3 } },
    ],
  },
  {
    id: 7,
    text: "夕方の肌状態はどれに近いですか？",
    options: [
      { label: "カサカサして粉をふく", delta: { moisture: 20 } },
      { label: "テカってメイクが崩れる", delta: { sebum: 20 } },
      {
        label: "Tゾーンはテカるが目元は乾燥",
        delta: { sebum: 10, moisture: 15 },
      },
      { label: "あまり変わらない", delta: { moisture: 3, sebum: 3 } },
    ],
  },
  {
    id: 8,
    text: "目元・口元の乾燥やシワが気になりますか？",
    options: [
      { label: "常に気になる", delta: { moisture: 25, dullness: 5 } },
      { label: "冬場に気になる", delta: { moisture: 15 } },
      { label: "たまに気になる程度", delta: { moisture: 8 } },
      { label: "気にならない", delta: { moisture: 3 } },
    ],
  },
  {
    id: 9,
    text: "日焼け後の肌の反応は？",
    options: [
      { label: "赤くなりやすく、ヒリヒリする", delta: { sensitive: 20, dullness: 5 } },
      { label: "すぐに黒くなる", delta: { dullness: 15 } },
      { label: "赤くなった後に黒くなる", delta: { sensitive: 10, dullness: 10 } },
      { label: "あまり焼けない・わからない", delta: { sensitive: 3, dullness: 3 } },
    ],
  },
  {
    id: 10,
    text: "今、一番気になる肌の悩みは？",
    options: [
      { label: "乾燥・つっぱり", delta: { moisture: 20 } },
      { label: "テカリ・ベタつき", delta: { sebum: 20 } },
      { label: "毛穴の開き・黒ずみ", delta: { pores: 20 } },
      { label: "くすみ・透明感の低下", delta: { dullness: 20 } },
    ],
  },
];
