import type { ReviewQuestion } from "./types";

/** UGUI 基础 复习题 */
export const uidUguiBasicsQuestions: ReviewQuestion[] = [
  {
    id: "uid-ugui-basics-1",
    chapter: "uid-ugui-basics",
    level: 1,
    question: "UGUI 中所有 UI 元素的定位组件是什么？它和普通 Transform 有什么区别？",
    answer: "RectTransform。它继承自 Transform，增加了锚点（Anchor）、轴心（Pivot）和尺寸（Size）属性。普通 Transform 只有位置/旋转/缩放，RectTransform 还能定义元素相对于父级的对齐方式和拉伸行为。",
    tags: ["RectTransform", "基础"],
  },
  {
    id: "uid-ugui-basics-2",
    chapter: "uid-ugui-basics",
    level: 2,
    question: "Image 和 RawImage 有什么区别？分别用于什么场景？",
    answer: "Image 使用 Sprite（精灵图），支持九宫格拉伸和图集合并，是大多数 UI 图片的首选。RawImage 使用 Texture2D，不支持九宫格和图集，适合显示动态加载的纹理（如网络图片、RenderTexture、摄像头画面）。能用 Image 就不要用 RawImage。",
    tags: ["Image", "RawImage", "区别"],
  },
  {
    id: "uid-ugui-basics-3",
    chapter: "uid-ugui-basics",
    level: 3,
    question: "RectTransform 的锚点（Anchor）和轴心（Pivot）分别影响什么？",
    answer: "锚点定义元素相对于父级矩形的参考点——锚点在左下角时元素位置从左下角算，锚点四角拉开时元素随父级拉伸。轴心定义元素自身的旋转和缩放中心——轴心在中心时旋转围绕中心，在左上角时旋转围绕左上角。锚点决定「相对父级怎么定位」，轴心决定「自身怎么变换」。",
    tags: ["锚点", "轴心", "RectTransform"],
  },
  {
    id: "uid-ugui-basics-4",
    chapter: "uid-ugui-basics",
    level: 4,
    question: "Button 组件的底层实现原理是什么？如何自定义一个可交互组件？",
    answer: "Button 继承自 Selectable（提供颜色/精灵切换的视觉状态），并实现 IPointerClickHandler 接口。点击时通过 onClick 事件调用注册的回调。自定义可交互组件的步骤：1)继承 Selectable 获得状态管理；2)实现需要的事件接口（如 IPointerDownHandler/IPointerUpHandler）；3)在事件回调中添加交互逻辑；4)可选：暴露 UnityEvent 供 Inspector 配置。关键点：不要在 Update 中轮询输入，通过事件接口被动响应。",
    tags: ["Button", "Selectable", "自定义组件"],
  },
];
