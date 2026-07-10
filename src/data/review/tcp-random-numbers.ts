import type { ReviewQuestion } from "./types";

/** 随机数生成 复习题 */
export const tcpRandomNumbersQuestions: ReviewQuestion[] = [
  {
    id: "tcp-random-numbers-1",
    chapter: "tcp-random-numbers",
    level: 1,
    question: `线性同余生成器的公式是什么？`,
    answer: `X(n+1) = (a·X(n) + c) mod m。其中 a 是乘数，c 是增量，m 是模数，X(0) 是种子。周期最多为 m。`,
    tags: ["LCG", "公式"],
  },
  {
    id: "tcp-random-numbers-2",
    chapter: "tcp-random-numbers",
    level: 2,
    question: `LCG 满周期的三个条件是什么？`,
    answer: `1) c 与 m 互素；2) a-1 是 m 每个素因子的倍数；3) 若 4|m 则 4|(a-1)。满足这三个条件时 LCG 周期达到上限 m。`,
    tags: ["LCG", "满周期"],
  },
  {
    id: "tcp-random-numbers-3",
    chapter: "tcp-random-numbers",
    level: 3,
    question: `谱检验比卡方检验更严格的原因是什么？`,
    answer: `卡方检验只检查一维均匀性，无法发现高维结构缺陷。谱检验把连续 t 个随机数看作 t 维空间中的点，检查超平面结构。RANDU 通过卡方但谱检验在 3 维暴露了所有点聚集在 15 个超平面上的缺陷。`,
    tags: ["谱检验", "质量评估"],
  },
  {
    id: "tcp-random-numbers-4",
    chapter: "tcp-random-numbers",
    level: 4,
    question: `为什么 RANDU 被认为是失败的随机数生成器？`,
    answer: `RANDU（a=65539, m=2^31）在 3 维谱检验中暴露严重缺陷：连续 3 个随机数只落在 15 个超平面上，远少于理论最大值。这让依赖它的物理模拟产生系统性偏差。`,
    tags: ["RANDU", "失败案例"],
  },
];
