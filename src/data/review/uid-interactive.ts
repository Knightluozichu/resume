import type { ReviewQuestion } from "./types";

/** UGUI 交互组件 复习题 */
export const uidInteractiveQuestions: ReviewQuestion[] = [
  {
    id: "uid-interactive-1",
    chapter: "uid-interactive",
    level: 1,
    question: "Selectable 基类提供哪四种视觉状态？",
    answer: "正常（Normal）、高亮（Highlighted）、按下（Pressed）、禁用（Disabled）。Selectable 通过 Transition 属性在这四种状态间切换，支持颜色渐变（ColorTint）、精灵替换（SpriteSwap）和动画（Animation）三种过渡方式。",
    tags: ["Selectable", "状态"],
  },
  {
    id: "uid-interactive-2",
    chapter: "uid-interactive",
    level: 2,
    question: "Slider 组件的值变化事件是什么？如何在代码中监听？",
    answer: "Slider 的值变化事件是 onValueChanged，参数是当前的 float 值（0~1 之间，受 minValue/maxValue 映射）。监听方式：slider.onValueChanged.AddListener(value => { ... })。注意 onValueChanged 在初始化时也会触发，需用标志位区分初始化和用户操作。",
    tags: ["Slider", "事件"],
  },
  {
    id: "uid-interactive-3",
    chapter: "uid-interactive",
    level: 3,
    question: "ScrollRect 的滚动原理是什么？Viewport、Content、Scrollbar 三者的关系？",
    answer: "ScrollRect 通过裁剪 Viewport 区域只显示 Content 的一部分。Content 是实际内容容器，Viewport 是可见窗口。滚动时移动 Content 的 RectTransform 位置。Horizontal/Vertical Scrollbar 是可选的视觉控件，绑定到 ScrollRect 的 horizontalScrollbar/verticalScrollbar 属性。ScrollRect 的 normalizedPosition（0~1）控制滚动位置，运动惯性（movementType）支持 Unrestricted/Elastic/Clamped 三种模式。",
    tags: ["ScrollRect", "滚动"],
  },
  {
    id: "uid-interactive-4",
    chapter: "uid-interactive",
    level: 4,
    question: "如何实现一个支持拖拽排序的列表？需要用到哪些接口和组件？",
    answer: "1)每个列表项实现 IBeginDragHandler/IDragHandler/IEndDragHandler 接口；2)IBeginDrag 时记录拖拽项索引和起始位置，将拖拽项设为 Canvas 顶层（SetAsLastSibling）；3)IDrag 时更新拖拽项位置跟随鼠标，同时检测当前悬停位置，与其他项交换位置（交换 siblingIndex）；4)IEndDrag 时恢复层级，提交排序结果。需要 GraphicRaycaster 做命中检测找到悬停目标项。注意事项：拖拽时关闭 ScrollRect 的滚动（设置 scrollRect.enabled=false 或用 activeScrollbar），避免拖拽与滚动冲突。",
    tags: ["拖拽排序", "Drag", "综合"],
  },
];
