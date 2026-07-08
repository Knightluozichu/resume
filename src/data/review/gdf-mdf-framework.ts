import type { ReviewQuestion } from "./types";

export const gdfMdfFrameworkQuestions: ReviewQuestion[] = [
  {
    id: "gdf-mdf-framework-1",
    chapter: "gdf-mdf-framework",
    level: 1,
    question: "MDA 框架中 Mechanics、Dynamics、Aesthetics 分别是什么？",
    answer: "Mechanics（机制）是游戏的基础规则、数据结构和算法，设计师直接控制。Dynamics（动态）是机制在运行时通过玩家交互产生的涌现行为，可预测但不完全控制。Aesthetics（美学）是玩家在互动中产生的体验感受，MDA 定义了 8 种美学目标。",
    tags: ["MDA框架", "Mechanics", "Dynamics", "Aesthetics"],
  },
  {
    id: "gdf-mdf-framework-2",
    chapter: "gdf-mdf-framework",
    level: 2,
    question: "设计师视角和玩家视角在 MDA 中有什么区别？",
    answer: "设计师从 M 出发：先设计规则（M），再预测产生的行为（D），最终期望玩家获得体验（A）。玩家从 A 出发：先感受到体验（A），再逐渐理解行为（D），最后可能意识到规则（M）。设计师看 M→D→A，玩家体验 A→D→M。这个视角差异是设计失败的原因——设计师以为机制好但玩家从 A 端体验不到预期感受。",
    tags: ["设计师视角", "玩家视角", "视角差异"],
  },
  {
    id: "gdf-mdf-framework-3",
    chapter: "gdf-mdf-framework",
    level: 3,
    question: "列出 MDA 的 8 种美学目标并各举一例。",
    answer: "感觉（Sensation）：音游触觉反馈；幻想（Fantasy）：RPG 扮演英雄；叙事（Narrative）：视觉小说故事推进；挑战（Challenge）：魂系游戏难度；同伴关系（Fellowship）：多人合作游戏；发现（Discovery）：开放世界探索；表达（Expression）：模拟建造游戏；顺从（Submission）：消除游戏的冥想心流。每个游戏通常主打 2-3 种。",
    tags: ["8种美学", "美学目标"],
  },
  {
    id: "gdf-mdf-framework-4",
    chapter: "gdf-mdf-framework",
    level: 4,
    question: "用 MDA 透镜分析俄罗斯方块，说明简单规则如何产生深刻体验。",
    answer: "Mechanics：7 种方块随机下落、填满行消除、消除多行得分翻倍、下落速度递增。Dynamics：玩家发展出「留一列等长条」策略、冒险堆高等高分、快速决策放方块。这些动态是涌现的——规则没写「应该留一列」，但玩家自发发现了这个策略。Aesthetics：主打挑战（速度递增带来压力）和顺从（重复操作进入心流），辅以发现（找到最优堆叠策略）。MDA 分析揭示了核心洞察：极简规则通过速度递增产生了极限挑战感，通过重复操作产生了冥想式心流。",
    tags: ["MDA分析", "俄罗斯方块", "涌现行为", "综合"],
  },
];
