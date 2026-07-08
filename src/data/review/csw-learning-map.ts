import type { ReviewQuestion } from "./types";

export const cswLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "csw-learning-map-1",
    chapter: "csw-learning-map",
    level: 2,
    question: "全书四阶段递进结构是什么？为什么是这个顺序？",
    answer:
      "流与盒模型（正常流/浮动/BFC/盒模型）→ 文本与排版（装饰/换行/行高）→ 布局体系（Flex/Grid）→ 视觉与动效（transform/animation）→ 总复习。顺序由依赖关系决定：上层依赖下层。没有流与盒模型就没有元素排列；没有文本排版就无法控制文字；没有布局体系就精确不了位置；没有视觉动效就驱动不了交互。先有「能排」，再有「能断」，然后「能放」，最后「能动」。",
    tags: ["架构", "学习路径"],
  },
  {
    id: "csw-learning-map-2",
    chapter: "csw-learning-map",
    level: 3,
    question: "用「一个卡片从布局到动效」的完整渲染旅程描述全书主线。",
    answer:
      "一个卡片渲染全过程：①流与盒模型——box-sizing:border-box 确保尺寸所见即所得，padding/border 向内挤压（第 2-3 章）；②文本排版——标题用 line-height:1.5 无单位值、white-space:nowrap 单行省略三件套（第 4-5 章）；③布局体系——外层 Grid 定位骨架、内层 Flex 排列内容、gap 替代 margin 避免合并（第 6-7 章）；④视觉动效——hover 时 transform:translateY(-4px) 配合 transition 平滑过渡，只合成不重排（第 8-9 章）。4 层全部参与，一行样式背后是完整的渲染机制。",
    tags: ["架构", "渲染旅程"],
  },
  {
    id: "csw-learning-map-3",
    chapter: "csw-learning-map",
    level: 3,
    question: "为什么 transform:translateY 比修改 top 更适合做 hover 上浮动画？",
    answer:
      "top 是定位属性，修改它触发重排（reflow）——浏览器重新计算所有受影响元素的几何位置再重绘，代价大。transform 是合成属性，浏览器把元素提升到独立合成层，直接在 GPU 移动已绘制好的位图，不触发重排也不重绘，性能最优。此外 transform 不影响文档流，不会导致兄弟元素重新布局。因此动画优先用 transform 和 opacity（两者都只合成），避免动画 width/margin/top/left 等触发重排的属性。",
    tags: ["transform", "性能", "合成层"],
  },
  {
    id: "csw-learning-map-4",
    chapter: "csw-learning-map",
    level: 4,
    question: "会写 CSS 属性和真正懂 CSS 渲染机制有什么本质区别？",
    answer:
      "属性只是表层——display:flex 怎么写、margin 怎么加，照文档抄就会。真正难点在渲染机制：为什么浮动导致塌陷、BFC 为什么隔离 margin、border-box 和 content-box 实际尺寸差多少、line-height 无单位值和带单位值的继承差异、flex-grow 按什么分配、transform 为什么不触发重排。这些是「浏览器渲染时」才显现的机制，也是中高级面试与工程实战的真正考点。区分标志：能否解释一段样式「为什么这样渲染」而非只是「能看」。",
    tags: ["架构", "渲染机制", "工程思维"],
  },
];
