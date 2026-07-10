import type { ReviewQuestion } from "./types";

/** 向量空间与子空间 复习题 */
export const ladVectorSpacesQuestions: ReviewQuestion[] = [
  {
    id: "lad-vector-spaces-1",
    chapter: "lad-vector-spaces",
    level: 1,
    question: `向量空间有哪几类公理？`,
    answer: `加法公理（交换、结合、零元、负元）与标量乘公理（分配两条、结合、1v=v），共八条。`,
    tags: ["公理"],
  },
  {
    id: "lad-vector-spaces-2",
    chapter: "lad-vector-spaces",
    level: 2,
    question: `为什么不过原点的平面不是子空间？`,
    answer: `子空间必须含零元且对加法、标量乘封闭。不过原点的平面不含零元，0 倍缩放也不落在平面上，故非子空间。`,
    tags: ["子空间"],
  },
  {
    id: "lad-vector-spaces-3",
    chapter: "lad-vector-spaces",
    level: 3,
    question: `给定 R^4 中 5 个向量，能确定它们线性相关吗？`,
    answer: `能。线性无关组长度 ≤ dim V = 4，5 > 4 必线性相关，无需计算。`,
    tags: ["线性无关", "维数"],
  },
  {
    id: "lad-vector-spaces-4",
    chapter: "lad-vector-spaces",
    level: 4,
    question: `证明任意两个基长度相同。`,
    answer: `基 A 长度 p 线性无关且张成，基 B 长度 q 同理。由“线性无关组长度≤张成组长度”：A 线性无关、B 张成→p≤q；互换→q≤p。故 p=q，此即维数。`,
    tags: ["证明", "维数"],
  },
];
