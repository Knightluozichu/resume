import type { ReviewQuestion } from "./types";

export const ugcPuzzleGameQuestions: ReviewQuestion[] = [
  {
    id: "ugc-puzzle-game-1",
    chapter: "ugc-puzzle-game",
    level: 1,
    question: `益智游戏为什么核心是状态管理而非物理？`,
    answer: `益智游戏没有物理模拟——宝石不靠重力下落，靠代码控制位置。核心是规则流程：交换→检测→消除→下落→补充→连锁检测。每步有严格先后顺序，状态机保证流程不混乱。不用状态机消除和下落同时执行会数据错乱。`,
    tags: ["状态机", "益智游戏"],
  },
  {
    id: "ugc-puzzle-game-2",
    chapter: "ugc-puzzle-game",
    level: 2,
    question: `三消游戏的匹配检测怎么实现？`,
    answer: `遍历网格：1）横向——每行从头到尾，相同颜色连续计数，>=3 则记录匹配位置；2）纵向——每列同理。合并所有匹配位置去重。注意交换后先检测，无匹配则交换回来（无效操作）。`,
    tags: ["匹配检测", "三消"],
  },
  {
    id: "ugc-puzzle-game-3",
    chapter: "ugc-puzzle-game",
    level: 3,
    question: `连锁消除怎么实现？怎么用协程控制动画时序？`,
    answer: `连锁：消除后用 while 循环——下落→补充→重新检测→有匹配继续消除 comboMultiplier+1→无匹配退出。协程控制时序：yield return new WaitForSeconds(animSpeed) 等每步动画播完才进入下一步。SwapAndCheck 协程管理整个流程：交换动画→检测→消除循环→回到 Waiting。`,
    tags: ["连锁消除", "协程", "动画时序"],
  },
  {
    id: "ugc-puzzle-game-4",
    chapter: "ugc-puzzle-game",
    level: 4,
    question: `设计一个完整的三消游戏系统，包括网格、匹配、消除、下落、连锁。`,
    answer: `架构：1）Gem[,] 2D 数组存储宝石数据+type 颜色；2）GameState 枚举（Waiting/Swapping/Matching/Clearing/Falling/Spawning）；3）TrySwap 检查相邻+启动协程；4）SwapAndCheck 协程：交换→检测→无匹配换回→有匹配进入 while 循环；5）FindAllMatches 横纵向遍历检测 >=3 连续；6）ClearMatches 销毁匹配宝石；7）FallGems 空位上方下落；8）SpawnNewGems 顶部补充；9）comboMultiplier 连锁倍数。核心：状态机+协程保证流程顺序。`,
    tags: ["三消系统", "综合"],
  },
];
