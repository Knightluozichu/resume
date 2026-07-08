import type { ReviewQuestion } from "./types";

export const gdfLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "gdf-learning-map-1",
    chapter: "gdf-learning-map",
    level: 1,
    question: "游戏设计基础全书的核心结构是什么？",
    answer: "从 MDA 框架出发，经机制/动态/美学三要素深入，到玩家体验/关卡设计/平衡性调整，最后原型迭代和总复习。呈「理论基础 → 核心三要素 → 玩家中心设计 → 设计实践」的递进结构。",
    tags: ["学习地图", "全书结构"],
  },
  {
    id: "gdf-learning-map-2",
    chapter: "gdf-learning-map",
    level: 2,
    question: "MDA 框架的三个字母分别代表什么？它们之间是什么关系？",
    answer: "M = Mechanics（机制/规则），设计师直接控制的数据结构和算法。D = Dynamics（动态/行为），机制在运行时产生的涌现行为。A = Aesthetics（美学/体验），玩家在互动中产生的感受。关系：M 驱动 D，D 引发 A。设计师从 M 出发，玩家从 A 出发。",
    tags: ["MDA框架", "机制", "动态", "美学"],
  },
  {
    id: "gdf-learning-map-3",
    chapter: "gdf-learning-map",
    level: 3,
    question: "为什么不能跳过 MDA 框架直接学关卡设计？",
    answer: "MDA 是分析游戏的核心透镜，不理解它就无法系统分析「为什么这个设计好玩」。关卡设计需要先确定美学目标（A），再设计能产生对应动态（D）的机制（M），最后在关卡中实现。跳过 MDA 直接做关卡，会变成凭感觉设计，无法复制成功也无法分析失败原因。",
    tags: ["学习路径", "MDA透镜"],
  },
  {
    id: "gdf-learning-map-4",
    chapter: "gdf-learning-map",
    level: 4,
    question: "为什么说「机制是骨架，动态是行为，美学是感受」？如何用 MDA 透镜分析一个具体游戏？",
    answer: "机制是骨架——它是游戏的结构基础，决定了游戏能做什么（跳跃力、生命值、得分规则）。动态是行为——机制在玩家交互中「活」起来，产生设计师未必预想到的涌现行为（如连续跳跃过平台、卡位战术）。美学是感受——这些行为最终引发玩家的情感体验（挑战感、成就感）。分析具体游戏的方法：先识别美学目标（这游戏想给玩家什么体验），再分析产生了什么动态行为，最后追溯到支撑这些动态的机制。例如马里奥：美学=挑战+探索，动态=精确跳跃+秘密发现，机制=跳跃力+重力+隐藏砖块。",
    tags: ["MDA分析", "综合", "设计透镜"],
  },
];
