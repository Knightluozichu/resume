import type { ReviewQuestion } from "./types";

export const csecClipPathQuestions: ReviewQuestion[] = [
  {
    id: "csec-clip-path-1",
    chapter: "csec-clip-path",
    level: 2,
    question: `clip-path: polygon() 的坐标系是怎么定义的？`,
    answer:
      `clip-path: polygon() 的坐标以元素左上角为原点（0,0），x 轴向右、y 轴向下。坐标可用百分比（相对元素宽高）或像素。例如 \`(50%, 0)\` 是顶部中心、\`(0, 100%)\` 是左下角、\`(100%, 100%)\` 是右下角。polygon 按顺序连线围成闭合区域，区域内的内容保留、区域外裁掉。百分比坐标的好处是元素尺寸变化时裁剪形状自动等比缩放。`,
    tags: ["clip-path", "polygon"],
  },
  {
    id: "csec-clip-path-2",
    chapter: "csec-clip-path",
    level: 3,
    question: `用 clip-path: polygon() 画一个向上的三角形，坐标怎么选？`,
    answer:
      `向上三角形需要保留三个顶点：顶部中心点和底部两个角。以元素左上角为原点（0,0），三个点分别是：顶部中心 \`(50%, 0)\`、左下角 \`(0, 100%)\`、右下角 \`(100%, 100%)\`。代码：\`clip-path: polygon(50% 0, 0 100%, 100% 100%)\`。polygon 按顺序连线围成闭合区域，区域内的内容保留、区域外裁掉。50% 表示水平方向的中间位置，100% 表示底部边缘。如果想要向下三角形则选 \`(0,0), (100%,0), (50%,100%)\`。`,
    tags: ["clip-path", "三角形"],
  },
  {
    id: "csec-clip-path-3",
    chapter: "csec-clip-path",
    level: 3,
    question: `clip-path 会影响布局和事件命中吗？`,
    answer:
      `clip-path 只裁剪视觉渲染——元素的盒模型尺寸、在文档流中的位置、margin/padding 都不变。被裁掉的「透明区域」仍然占据空间，也不会被相邻元素填充。但事件命中区域会被裁剪：点击在被裁掉的区域不会触发该元素的 click 事件。如果你需要「视觉裁掉但事件保留」，要用其他方案（如叠加遮罩层）。此外 clip-path 与 overflow: hidden 可叠加：前者裁元素本身、后者裁内容溢出。`,
    tags: ["clip-path", "布局", "事件"],
  },
  {
    id: "csec-clip-path-4",
    chapter: "csec-clip-path",
    level: 4,
    question: `clip-path 动画为什么比 width/margin 动画性能更好？`,
    answer:
      `clip-path 在大多数现代浏览器中只触发合成（composite）阶段——浏览器在 GPU 上重新计算裁剪路径的像素输出，不需要重新布局（reflow）也不需要重绘整个元素（repaint）。而 width/margin 动画会触发 reflow：每改变一帧，浏览器要重新计算元素及其后代的盒模型、重新排列文档流、再重绘——代价远高于合成。不过 clip-path 动画的性能依赖浏览器是否将 polygon 提升为合成层；对于复杂路径（大量顶点），仍可能比简单的 transform 动画慢。最佳实践是配合 will-change: clip-path 提示浏览器预创建合成层。`,
    tags: ["clip-path", "性能", "合成层"],
  },
];
