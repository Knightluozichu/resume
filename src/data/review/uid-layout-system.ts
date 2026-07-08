import type { ReviewQuestion } from "./types";

/** UGUI 布局系统 复习题 */
export const uidLayoutSystemQuestions: ReviewQuestion[] = [
  {
    id: "uid-layout-system-1",
    chapter: "uid-layout-system",
    level: 1,
    question: "UGUI 布局系统的「三件套」是什么？",
    answer: "LayoutGroup（排列子元素）、LayoutElement（约束尺寸）、ContentSizeFitter（自适应大小）。LayoutGroup 读取子元素的 LayoutElement 属性进行排列，ContentSizeFitter 读取自身 LayoutElement 属性调整大小。",
    tags: ["布局系统", "三件套"],
  },
  {
    id: "uid-layout-system-2",
    chapter: "uid-layout-system",
    level: 2,
    question: "LayoutElement 的 minWidth 和 preferredWidth 有什么区别？",
    answer: "minWidth 是最小尺寸，布局系统不会把元素压缩到低于此值。preferredWidth 是期望尺寸，布局系统在有额外空间时优先分配此值。如果总空间不足，所有元素先满足 minWidth 再分配 preferredWidth。flexibleWidth 则是剩余空间的弹性分配权重。",
    tags: ["LayoutElement", "尺寸"],
  },
  {
    id: "uid-layout-system-3",
    chapter: "uid-layout-system",
    level: 3,
    question: "ContentSizeFitter 与 LayoutGroup 同时使用时有什么注意事项？",
    answer: "ContentSizeFitter 会修改自身 RectTransform 的尺寸，而 LayoutGroup 也会修改子元素尺寸。如果父级是 LayoutGroup、子级是 ContentSizeFitter，可能导致布局抖动——LayoutGroup 先按子元素 preferred 值排列，ContentSizeFitter 又修改子元素尺寸，导致下一帧重新排列。解决方案：1)ContentSizeFitter 放在 LayoutGroup 同级而非子级；2)使用 LayoutRebuilder.ForceRebuildLayoutImmediate 手动触发重建；3)避免嵌套过多布局组件。",
    tags: ["ContentSizeFitter", "LayoutGroup", "嵌套"],
  },
  {
    id: "uid-layout-system-4",
    chapter: "uid-layout-system",
    level: 4,
    question: "设计一个动态列表（如背包系统），每项高度可能不同，你会如何用布局系统实现？",
    answer: "1)ScrollRect + Viewport + Content 三层结构；2)Content 上挂 VerticalLayoutGroup，设置 ChildForceExpand=false、ChildControlHeight=true；3)每个列表项挂 LayoutElement，设置 preferredHeight 为该项实际高度；4)列表项挂 ContentSizeFitter（VerticalFit=Preferred）确保高度自适应；5)对于大量数据用对象池 + LayoutRebuilder.ForceRebuildLayoutImmediate 手动重建，避免每帧自动布局开销。关键点：不要让 ContentSizeFitter 和 VerticalLayoutGroup 同时控制同一元素的高度，层级要分明。",
    tags: ["动态列表", "背包", "综合"],
  },
];
