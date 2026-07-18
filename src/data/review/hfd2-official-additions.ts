import type { ReviewQuestion } from "./types";

const units = [
  {
    slug: "hfd-iterator-composite",
    title: "第9章 迭代器与组合模式",
  },
  {
    slug: "hfd-state",
    title: "第10章 状态模式",
  },
  {
    slug: "hfd-proxy",
    title: "第11章 代理模式",
  },
  {
    slug: "hfd-compound-patterns",
    title: "第12章 复合模式",
  },
  {
    slug: "hfd-real-world",
    title: "第13章 真实世界中的模式",
  },
  {
    slug: "hfd-leftover-patterns",
    title: "附录A 其他模式",
  },
] as const;

const terms = ["结构", "协作", "状态", "边界", "反例", "回归"] as const;

export const hfd2OfficialAdditionalQuestions: ReviewQuestion[] = units.flatMap(
  (unit) =>
    terms.map(
      (term, index): ReviewQuestion => ({
        id: unit.slug + "-official-" + (index + 1),
        chapter: unit.slug,
        level: index < 2 ? 2 : index < 4 ? 3 : 4,
        question: unit.title + "：如何用“" + term + "”定位第一条设计证据？",
        answer:
          "冻结参与者、接口和样本，先预测" +
          term +
          "在正常轨迹中的位置，再只改变一个条件并停在首个分叉；通过后从干净状态完整回归。",
        tags: [term, "Head First Design Patterns 2e"],
      }),
    ),
);
