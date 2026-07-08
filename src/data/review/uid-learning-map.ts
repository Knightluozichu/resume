import type { ReviewQuestion } from "./types";

/** Unity UI 设计学习地图 复习题 */
export const uidLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "uid-learning-map-1",
    chapter: "uid-learning-map",
    level: 1,
    question: "Unity UI 设计全书分为哪四大板块？",
    answer: "四大板块：UI系统认知（学习地图与系统架构）、UGUI核心（基础组件与布局交互）、进阶技术（动画与UI Toolkit与响应式）、优化与总结（性能优化与全书复习）。",
    tags: ["学习地图", "全书结构"],
  },
  {
    id: "uid-learning-map-2",
    chapter: "uid-learning-map",
    level: 2,
    question: "UGUI 和 UI Toolkit 的定位有什么区别？",
    answer: "UGUI 是基于 GameObject 的 UI 系统，使用 Canvas 渲染，适合运行时游戏 UI。UI Toolkit 是基于 Web 技术栈（UXML/USS）的 UI 框架，类似网页开发模式，适合编辑器扩展和复杂面板。两者并非替代关系，而是并存互补。",
    tags: ["UGUI", "UI Toolkit", "定位"],
  },
  {
    id: "uid-learning-map-3",
    chapter: "uid-learning-map",
    level: 3,
    question: "为什么 Unity UI 设计需要单独学习「布局系统」？不能直接拖拽定位吗？",
    answer: "直接拖拽定位虽然简单，但无法适配不同分辨率和屏幕比例。布局系统（LayoutGroup/LayoutElement/ContentSizeFitter）提供了自动排列、自适应大小和内容驱动的布局能力，是响应式 UI 的基础。不学布局系统会导致 UI 在不同设备上错位、拉伸、重叠。",
    tags: ["布局系统", "响应式"],
  },
  {
    id: "uid-learning-map-4",
    chapter: "uid-learning-map",
    level: 4,
    question: "在一个中等规模的 RPG 游戏项目中，你会如何规划 UI 技术选型？",
    answer: "分三层选型：1)游戏内 HUD（血条、小地图、技能栏）用 UGUI，因为需要实时更新和粒子特效，Canvas 渲染性能可控；2)复杂菜单（背包、技能树、设置面板）用 UGUI + LayoutGroup 自动布局，配合 DOTween 做动画过渡；3)编辑器工具和调试面板用 UI Toolkit，利用 UXML/USS 快速迭代。关键原则：不混用两套系统在同一界面层级，避免渲染穿插和事件冲突。",
    tags: ["技术选型", "综合"],
  },
];
