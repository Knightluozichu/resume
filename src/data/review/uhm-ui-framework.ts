import type { ReviewQuestion } from "./types";

export const uhmUiFrameworkQuestions: ReviewQuestion[] = [
  {
    id: "uhm-ui-framework-1",
    chapter: "uhm-ui-framework",
    level: 1,
    question: "Canvas 的三种渲染模式是什么？HMI 通常选哪种？",
    answer: "Screen Space Overlay（覆盖最上层，不受摄像机影响）、Screen Space Camera（由指定摄像机渲染，可加后处理）、World Space（存在于 3D 世界，可被遮挡）。HMI 通常选 Screen Space Camera，因为需要精确控制渲染层级和后处理效果。",
    tags: ["Canvas", "渲染模式"],
  },
  {
    id: "uhm-ui-framework-2",
    chapter: "uhm-ui-framework",
    level: 2,
    question: "RectTransform 与普通 Transform 的区别是什么？锚点有什么作用？",
    answer: "RectTransform 是 Transform 的子类，增加了 width/height、anchor（锚点）和 pivot（轴心点）。锚点决定了 UI 元素在父容器缩放时如何对齐——例如锚点在左上角时，元素位置相对于父容器左上角固定；锚点为 Stretch（拉伸）时，元素随父容器一起拉伸填充。",
    tags: ["RectTransform", "锚点"],
  },
  {
    id: "uhm-ui-framework-3",
    chapter: "uhm-ui-framework",
    level: 3,
    question: "为什么要把频繁更新的 UI 元素放在独立子 Canvas 中？原理是什么？",
    answer: "Canvas 重建时会重新计算所有子元素的网格和顶点。如果全部 UI 在一个 Canvas 下，一个数值变化会导致整个界面重建。把频繁更新的元素拆到独立子 Canvas，重建范围被限制在子 Canvas 内，主 Canvas 不受影响。原理是 Canvas 的 dirty 标记只向上传播到自身根，不会扩散到父 Canvas。",
    tags: ["子Canvas", "重建优化", "dirty标记"],
  },
  {
    id: "uhm-ui-framework-4",
    chapter: "uhm-ui-framework",
    level: 4,
    question: "HMI 界面搭建的三层架构是什么？如何选择布局组件和缩放策略？",
    answer: "三层架构：容器层（Canvas + CanvasScaler）负责渲染和缩放策略；布局层（Layout Group + ContentSizeFitter）负责自动排列子元素；组件层（Text/Image/Button）负责具体显示和交互。布局组件选择：水平排列用 HorizontalLayoutGroup，垂直排列用 VerticalLayoutGroup，网格用 GridLayoutGroup。缩放策略用 Scale With Screen Size，设置参考分辨率和 Match 值（通常 0.5 兼顾宽高）。Canvas 嵌套层级控制在 3-5 层，超过 10 层重建成本指数增长。",
    tags: ["三层架构", "布局组件", "CanvasScaler", "综合"],
  },
];
