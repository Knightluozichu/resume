import type { ReviewQuestion } from "./types";

export const gdfPlayerExperienceQuestions: ReviewQuestion[] = [
  {
    id: "gdf-player-experience-1",
    chapter: "gdf-player-experience",
    level: 1,
    question: `什么是心流？在游戏中如何实现？`,
    answer: `心流是玩家完全沉浸于游戏、忘记时间的心理状态，发生在挑战与能力平衡时。挑战>能力=焦虑，挑战<能力=无聊，挑战≈能力=心流。实现方法：动态难度调节（监测玩家表现实时调整）、阶梯式递进（平缓学习→突然挑战→恢复适应）、技能与难度同步提升。`,
    tags: ["心流", "挑战", "能力"],
  },
  {
    id: "gdf-player-experience-2",
    chapter: "gdf-player-experience",
    level: 2,
    question: `为什么难度太高和太低都会让玩家流失？`,
    answer: `难度太高→焦虑沮丧，反复失败产生无力感放弃。难度太低→无聊，没有挑战感失去兴趣也放弃。两者都偏离心流区。关键不是「降低」或「提高」难度，而是让难度匹配玩家当前能力，随能力提升动态调整。目标：难度≈技能×1.1。`,
    tags: ["难度设计", "玩家流失"],
  },
  {
    id: "gdf-player-experience-3",
    chapter: "gdf-player-experience",
    level: 3,
    question: `玩家动机分为哪四类？不同动机需要什么设计策略？`,
    answer: `成就型（追求完成和精通）→提供明确目标、成就系统、排行榜。探索型（追求发现和了解）→提供开放世界、隐藏秘密、背景故事。社交型（追求连接和竞争）→提供多人合作/对战、公会系统、社交互动。杀时间型（追求放松消遣）→提供短局游戏、简单操作、低惩罚。不同动机需要不同设计，一个游戏可以同时满足多种动机。`,
    tags: ["玩家动机", "设计策略"],
  },
  {
    id: "gdf-player-experience-4",
    chapter: "gdf-player-experience",
    level: 4,
    question: `如何设计动态难度调节系统？需要考虑哪些因素？`,
    answer: `核心逻辑：监测玩家表现（成功率/死亡次数/通关时间），据此调整难度参数（敌人血量/AI 智能/资源 scarcity）。成功时技能估计+0.05，难度=技能×1.1（略高于技能保持心流）；失败时技能估计-0.03，难度=技能×0.95（略低于技能恢复信心）。需考虑：调节幅度不能太大（玩家会感知到变化），调节频率不能太高（避免抖动），不同玩家群体的基线不同（新手/老手/速通玩家），以及难度调节不能让玩家觉得「被施舍」（失败后降低难度要让玩家感觉是自己的进步而非系统放水）。`,
    tags: ["动态难度", "心流", "综合"],
  },
];
