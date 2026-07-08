import type { ReviewQuestion } from "./types";

export const ugcStrategyGameQuestions: ReviewQuestion[] = [
  {
    id: "ugc-strategy-game-1",
    chapter: "ugc-strategy-game",
    level: 1,
    question: "策略游戏为什么用网格而非自由坐标？",
    answer: "网格把连续地图离散化为格子：1）A* 寻路效率高（节点有限）；2）碰撞检测简单（格子是否被占）；3）建筑放置精确到格。星际争霸/文明都用网格，渲染时隐藏格子线。",
    tags: ["网格系统", "策略游戏"],
  },
  {
    id: "ugc-strategy-game-2",
    chapter: "ugc-strategy-game",
    level: 2,
    question: "A* 寻路的核心原理是什么？启发函数为什么用曼哈顿距离？",
    answer: "A* 用 OpenList（待探索）和 CloseList（已探索），每次取 F=G+H 最小的格子扩展。G 是起点到当前的实际代价，H 是当前到终点的启发估计。网格只上下左右走，曼哈顿距离（|dx|+|dy|）是最短距离估计且不高估（admissible），保证最优路径。斜走用对角线距离。",
    tags: ["A*", "曼哈顿距离"],
  },
  {
    id: "ugc-strategy-game-3",
    chapter: "ugc-strategy-game",
    level: 3,
    question: "RTS 框选系统怎么实现？坐标系怎么处理？",
    answer: "左键按下记录起点，拖动画矩形，松开时遍历所有单位：把单位世界坐标用 WorldToScreenPoint 转屏幕坐标，判断是否在矩形内（min.x到max.x, min.y到max.y）。右键点击用 ScreenPointToRay+Raycast 获取世界坐标，转网格坐标后 A* 寻路移动。注意单位在相机背后（z<0）不选。",
    tags: ["框选", "坐标转换"],
  },
  {
    id: "ugc-strategy-game-4",
    chapter: "ugc-strategy-game",
    level: 4,
    question: "设计一个完整的 RTS 单位控制系统，包括网格、寻路、框选、队形。",
    answer: "架构：1）GridManager：2D 数组网格+WorldToGrid/GridToWorld 转换+A* 寻路；2）UnitController：左键框选（WorldToScreenPoint 判断矩形内）+右键移动（Raycast 获取目标）；3）Unit：MoveTo(网格坐标) 调 A* 获取路径，沿路径点移动；4）队形：多个单位分配不同目标格子（以中心格为基准偏移）；5）碰撞避让：格子标记占用，寻路跳过已占格子。核心：网格离散化+A* 寻路+屏幕坐标转换。",
    tags: ["RTS系统", "综合"],
  },
];
