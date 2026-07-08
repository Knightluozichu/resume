import type { ReviewQuestion } from "./types";

/** Unity UI 设计全书复习 复习题 */
export const uidFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "uid-final-review-1",
    chapter: "uid-final-review",
    level: 1,
    question: "回顾全书，Unity UI 系统的三层架构是什么？",
    answer: "渲染层（Canvas，负责绘制 UI 元素，有 Overlay/Camera/World 三种模式）、事件层（EventSystem，场景级单例，管理射线检测和事件派发）、输入层（InputModule，将键鼠/触摸/手柄输入转化为 UI 事件）。",
    tags: ["全书复习", "架构"],
  },
  {
    id: "uid-final-review-2",
    chapter: "uid-final-review",
    level: 2,
    question: "布局三件套如何协作？ContentSizeFitter 与 LayoutGroup 嵌套要注意什么？",
    answer: "LayoutGroup 读取子元素 LayoutElement 的 preferred 值进行排列，ContentSizeFitter 读取自身 LayoutElement 的 preferred 值调整大小。嵌套注意：ContentSizeFitter 修改自身尺寸会影响父级 LayoutGroup 排列，可能导致布局抖动。解决方案：ContentSizeFitter 和 LayoutGroup 不要在同一层级，手动调用 LayoutRebuilder.ForceRebuildLayoutImmediate 触发重建。",
    tags: ["布局", "全书复习"],
  },
  {
    id: "uid-final-review-3",
    chapter: "uid-final-review",
    level: 3,
    question: "UI 性能优化的三步法是什么？静态 UI 和动态 UI 为什么要分 Canvas？",
    answer: "三步法：1)查 Draw Call 数量（Frame Debugger），同图集元素排列在一起减少合批打断；2)查图集合并（Sprite Atlas），碎图打包减少纹理切换；3)查 Overdraw（Frame Debugger），关闭不可见元素和 RaycastTarget。分 Canvas 原因：Canvas 重建以 Canvas 为单位，任何子元素变化都触发整个 Canvas 重建。静态 UI 和动态 UI 分 Canvas，避免动态元素变化导致静态元素也每帧重建。",
    tags: ["性能优化", "全书复习"],
  },
  {
    id: "uid-final-review-4",
    chapter: "uid-final-review",
    level: 4,
    question: "综合全书知识，设计一个 MMO 游戏的 UI 架构方案。",
    answer: "1)分层架构：底层 Canvas 分组（Static-Canvas 背景层 / Dynamic-Canvas HUD 层 / Popup-Canvas 弹窗层 / Tooltip-Canvas 提示层），每层独立 Canvas 避免重建扩散；2)核心组件：HUD 用 UGUI（血条/小地图/技能栏，实时更新分独立 Canvas），背包/技能树用 UGUI+LayoutGroup+对象池虚拟化，编辑器工具用 UI Toolkit；3)动画：DOTween 统一管理，Sequence 编排弹窗进出，SetUpdate(true) 确保暂停时弹窗可关闭；4)性能：Sprite Atlas 按模块拆分（HUD/背包/设置各一图集），RaycastTarget 纯装饰全关，Draw Call 控制在 100 以内；5)响应式：Scale With Screen Size + Match=0（横屏），Safe Area 适配刘海，拉伸锚点适配不同比例。核心原则：事件驱动、布局优先、动画用 DOTween、性能三步法。",
    tags: ["综合", "架构设计", "全书复习"],
  },
];
