import type { ReviewQuestion } from "./types";

export const csecLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "csec-learning-map-1",
    chapter: "csec-learning-map",
    level: 2,
    question: "全书四阶段递进结构是什么？为什么是这个顺序？",
    answer:
      "背景与形状（渐变条纹/多重边框/圆角）→ 裁剪与伪元素（clip-path/伪元素妙用）→ 排版与字体（文字特效/OpenType）→ 交互与动效（滚动/焦点/视差/loading）→ 总复习。顺序由视觉层次决定：上层依赖下层。没有背景与形状就没有视觉基底；没有裁剪与伪元素就无法扩展造型；没有排版与字体就无法控制文字；没有交互与动效就驱动不了体验。先有「能看」，再有「能变」，然后「能排」，最后「能交互」。",
    tags: ["架构", "学习路径"],
  },
  {
    id: "csec-learning-map-2",
    chapter: "csec-learning-map",
    level: 3,
    question: "用「一个按钮从背景到动效」的完整视觉旅程描述全书主线。",
    answer:
      "一个按钮渲染全过程：①背景与形状——linear-gradient 铺底色、border-radius 画圆角、box-shadow spread 叠加多重边框（第 2-3 章）；②裁剪与伪元素——clip-path 裁出斜角造型、::after 伪元素画 tooltip 箭头（第 4-5 章）；③排版与字体——background-clip:text 让标题文字显示渐变、font-variant-numeric 让数字等宽对齐（第 6-7 章）；④交互与动效——scroll-behavior:smooth 让锚点跳转平滑、:focus-visible 只在键盘导航时显焦点环、transition transform 做 hover 上浮（第 8-9 章）。4 层全部参与。",
    tags: ["架构", "视觉旅程"],
  },
  {
    id: "csec-learning-map-3",
    chapter: "csec-learning-map",
    level: 3,
    question: "为什么 box-shadow: 0 0 0 2px 可以模拟多重边框，而不用嵌套 div？",
    answer:
      "box-shadow 的 spread radius（第四个值）让阴影向四周均匀扩展成实心环，叠加多个逗号分隔的 box-shadow 就能模拟多层边框。它不占文档流空间（不影响布局），一个元素就能画多层边框。嵌套 div 需要 N 个 HTML 元素对应 N 层边框，破坏语义、增加 DOM 深度。但 box-shadow 模拟的「边框」不响应鼠标事件、不影响 box-sizing 计算，需要根据场景选择 box-shadow、outline 还是 border-image。",
    tags: ["box-shadow", "多重边框"],
  },
  {
    id: "csec-learning-map-4",
    chapter: "csec-learning-map",
    level: 4,
    question: "CSS 揭秘的技巧共享什么底层心智模型？",
    answer:
      "核心心智模型是「用 CSS 属性的渲染副作用做非标用途」。每个技巧都是发现某 CSS 属性的渲染行为恰好能表达目标效果：渐变色标重合产生硬边 → 条纹；box-shadow spread 向外扩展 → 多重边框；border 拼三角 + transparent 隐藏三条 → 三角形箭头；background-clip:text 裁剪背景到文字形状 → 渐变文字；max-height 替代 height:auto → 可过渡的展开动画。掌握了这个思维，遇到新需求时可以问：哪个 CSS 属性的渲染行为能表达这个效果？",
    tags: ["架构", "渲染思维", "工程思维"],
  },
];
