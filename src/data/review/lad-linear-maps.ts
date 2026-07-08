import type { ReviewQuestion } from "./types";

/** 线性映射与核、像 复习题 */
export const ladLinearMapsQuestions: ReviewQuestion[] = [
  {
    id: "lad-linear-maps-1",
    chapter: "lad-linear-maps",
    level: 1,
    question: "线性映射满足哪两条性质？",
    answer: "T(u+v)=Tu+Tv（保加法）与 T(λv)=λTv（保标量乘）。",
    tags: ["定义"],
  },
  {
    id: "lad-linear-maps-2",
    chapter: "lad-linear-maps",
    level: 2,
    question: "T 单射的充要条件是什么？",
    answer: "null T = {0}。核只含零向量时映射不塌缩，即单射。",
    tags: ["单射", "核"],
  },
  {
    id: "lad-linear-maps-3",
    chapter: "lad-linear-maps",
    level: 3,
    question: "R^5→R^3 满射时核的维数？",
    answer: "满射则 dim range T = 3，由秩-零度 dim null T = 5 - 3 = 2。",
    tags: ["秩-零度"],
  },
  {
    id: "lad-linear-maps-4",
    chapter: "lad-linear-maps",
    level: 4,
    question: "推导秩-零度定理。",
    answer: "取 null T 的基 u1..uk，扩充为 V 的基 u1..uk,v1..vr。T 作用后 u 组变零，v 组映成 range T 的基（可证线性无关且张成像）。故 dim V = k+r = dim null T + dim range T。",
    tags: ["证明", "秩-零度"],
  },
];
