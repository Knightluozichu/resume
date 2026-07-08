import type { ReviewQuestion } from "./types";

/** 内积空间 复习题 */
export const ladInnerProductQuestions: ReviewQuestion[] = [
  {
    id: "lad-inner-product-1",
    chapter: "lad-inner-product",
    level: 1,
    question: "内积满足哪三条性质？",
    answer: "共轭对称、对第一变元线性、正定性（⟨v,v⟩≥0 且等于零仅当 v=0）。",
    tags: ["定义"],
  },
  {
    id: "lad-inner-product-2",
    chapter: "lad-inner-product",
    level: 2,
    question: "柯西-施瓦茨不等式是什么？",
    answer: "|⟨u,v⟩| ≤ ‖u‖‖v‖。可由 ‖u-λv‖²≥0 取最优 λ 推出。",
    tags: ["不等式"],
  },
  {
    id: "lad-inner-product-3",
    chapter: "lad-inner-product",
    level: 3,
    question: "Gram-Schmidt 的步骤？",
    answer: "对每个 v_k 减去它在已有正交基 e_1..e_{k-1} 上的投影，再归一化；若得零向量说明线性相关，跳过。",
    tags: ["算法"],
  },
  {
    id: "lad-inner-product-4",
    chapter: "lad-inner-product",
    level: 4,
    question: "证明正交投影是最近点。",
    answer: "对任意 u∈U，‖v-u‖²=‖v-Pu‖²+‖Pu-u‖²（因 v-Pu⊥U 而 Pu-u∈U）。故 ‖v-u‖≥‖v-Pu‖，等号仅当 u=Pu，投影即最近点。",
    tags: ["证明", "投影"],
  },
];
