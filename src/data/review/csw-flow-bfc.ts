import type { ReviewQuestion } from "./types";

export const cswFlowBfcQuestions: ReviewQuestion[] = [
  {
    id: "csw-flow-bfc-1",
    chapter: "csw-flow-bfc",
    level: 2,
    question: "为什么浮动元素会导致父容器高度塌陷？BFC 如何解决？",
    answer:
      "浮动的本质是脱离正常流，父容器在计算自身高度时只看正常流子元素，浮动子元素不参与高度计算，所以全浮动的子元素让父容器高度为 0。BFC 解决：触发 BFC 后，父容器成为独立渲染区域，其内部布局规则变为「计算高度时包含所有浮动子元素」。本质是 BFC 改变了高度计算规则——普通流容器忽略浮动高度，BFC 容器纳入浮动高度。",
    tags: ["浮动", "BFC", "高度塌陷"],
  },
  {
    id: "csw-flow-bfc-2",
    chapter: "csw-flow-bfc",
    level: 3,
    question: "列举 BFC 的触发条件，哪种是清除浮动的现代首选？为什么？",
    answer:
      "触发条件：根元素 html（天然 BFC）、float 不为 none、overflow 不为 visible（hidden/auto/scroll）、display 为 flow-root/inline-block/flex/grid/table-cell 等、position 为 absolute/fixed。现代首选 display:flow-root，因为它专为触发 BFC 设计，语义明确，无副作用——不像 overflow:hidden 会裁剪溢出内容，不像 float 会改变自身布局行为，不像 position:absolute 会脱离文档流。",
    tags: ["BFC", "触发条件", "flow-root"],
  },
  {
    id: "csw-flow-bfc-3",
    chapter: "csw-flow-bfc",
    level: 3,
    question: "BFC 有哪三大布局特性？各在什么场景下有用？",
    answer:
      "①包裹浮动：BFC 容器计算高度时包含浮动子元素，用于清除浮动（父容器 display:flow-root）；②隔离外边距：BFC 阻止子元素 margin 穿透到父容器外，解决父子 margin 合并问题（父容器 overflow:hidden）；③不与浮动重叠：BFC 容器会避让相邻的浮动元素，实现两栏自适应布局（侧栏 float，主栏 overflow:hidden 触发 BFC 自动避让）。三大特性本质都是「BFC 是独立渲染区域，内外互不影响」。",
    tags: ["BFC", "布局特性", "margin隔离"],
  },
  {
    id: "csw-flow-bfc-4",
    chapter: "csw-flow-bfc",
    level: 4,
    question: "overflow:hidden 作为清除浮动方案有什么副作用？现代项目应如何选择？",
    answer:
      "overflow:hidden 触发 BFC 能包裹浮动，但副作用：①裁剪溢出——子元素用 position:absolute 定位到父容器外、或阴影/负 margin 超出边界会被裁掉；②可能触发滚动条——某些场景下内容溢出出现意外滚动条；③语义不清——overflow 本意是控制溢出而非清浮动。现代项目优先用 display:flow-root，专为触发 BFC 设计、无裁剪副作用、语义明确。需兼容旧浏览器时用伪元素清除浮动（::after { content:''; display:block; clear:both; }），它不触发 BFC 但通过 clear 隔离浮动。",
    tags: ["BFC", "overflow", "副作用", "flow-root"],
  },
];
