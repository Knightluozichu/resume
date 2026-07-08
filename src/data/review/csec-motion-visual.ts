import type { ReviewQuestion } from "./types";

export const csecMotionVisualQuestions: ReviewQuestion[] = [
  {
    id: "csec-motion-visual-1",
    chapter: "csec-motion-visual",
    level: 2,
    question: "为什么动画 transform: translateY 比动画 top 性能更好？",
    answer:
      "top 是定位属性，修改它触发重排（reflow）——浏览器要重新计算该元素及所有受影响兄弟元素的几何位置，再重新重绘（repaint），代价大。transform 是合成属性——浏览器把元素提升到独立合成层，直接在 GPU 上移动已绘制好的位图，不触发重排也不重绘，只做合成（composite），性能最优。此外 transform 不影响文档流，不会导致其他元素重新布局。因此动画优先用 transform 和 opacity（两者都只合成），避免动画 width/margin/top/left 等触发重排的属性。",
    tags: ["transform", "性能", "合成层"],
  },
  {
    id: "csec-motion-visual-2",
    chapter: "csec-motion-visual",
    level: 3,
    question: "骨架屏的 shimmer 动画为什么用 background-position 而不用 transform？",
    answer:
      "骨架屏的闪烁效果是让渐变条纹横向移动——需要移动的是背景图案位置而非整个元素。transform 移动的是整个元素（连同内容一起），不能只移动背景。background-position 只改变背景图案的起始位置，不移动元素本身，适合做背景流动效果。但 background-position 动画会触发重绘（repaint）——虽然不如重排昂贵，但仍不如 transform 只合成。性能优化方案是把渐变背景放在伪元素上、对伪元素做 transform 动画，这样只合成不重绘。但代码复杂度增加，需权衡。",
    tags: ["background-position", "骨架屏", "性能"],
  },
  {
    id: "csec-motion-visual-3",
    chapter: "csec-motion-visual",
    level: 3,
    question: "视差滚动效果的原理是什么？用 background-attachment: fixed 有什么局限？",
    answer:
      "视差效果的核心是背景与前景以不同速度滚动产生深度感。background-attachment: fixed 让背景不随页面滚动——视觉上背景「钉住」、内容滑过，产生简单的视差。局限：①fixed 背景在移动端 iOS Safari 上有严重性能问题（滚动时不跟随、卡顿）；②只能做「背景不动」的单层视差，无法做多速度的多层深度。多层视差方案用 perspective + translateZ：设 perspective: 1px 的滚动容器，远景层 translateZ(-1px) scale(2) 放慢、近景层 translateZ(0) 正常速度。",
    tags: ["视差", "background-attachment"],
  },
  {
    id: "csec-motion-visual-4",
    chapter: "csec-motion-visual",
    level: 4,
    question: "will-change: transform 滥用会有什么问题？正确用法是什么？",
    answer:
      "will-change 是「提前告知浏览器这个属性将要变化」的提示——浏览器据此预创建合成层。但滥用 will-change 反而有害：每个 will-change 都会创建独立的合成层，内存占用增加；过多合成层导致 GPU 合成开销增大，反而降低性能。正确做法：①只在即将开始动画时加 will-change（如 hover 时或 JS 触发时）、动画结束后移除；②对于持续运行的动画（如 spinner），加 will-change 合理；③对于偶尔触发的 hover 动画，不加通常也没问题——浏览器会自动优化。永远不要在所有元素上预设 will-change。",
    tags: ["will-change", "性能", "合成层"],
  },
];
