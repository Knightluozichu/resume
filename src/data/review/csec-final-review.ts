import type { ReviewQuestion } from "./types";

export const csecFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "csec-final-review-1",
    chapter: "csec-final-review",
    level: 2,
    question: `全书四阶段是什么？每层解决什么问题？`,
    answer:
      `背景与形状（渐变条纹/多重边框/圆角）解决「底色怎么涂」和「轮廓怎么变」；裁剪与伪元素（clip-path/伪元素妙用）解决「元素怎么变形」和「额外层怎么加」；排版与字体（文字特效/OpenType）解决「文字怎么美」；交互与动效（滚动/焦点/视差/loading）解决「好用且能动起来」。四层递进：先有「能看」，再有「能变」，然后「能排」，最后「能交互」。`,
    tags: ["架构", "总复习"],
  },
  {
    id: "csec-final-review-2",
    chapter: "csec-final-review",
    level: 3,
    question: `用「一个卡片从背景到动效」的完整视觉旅程串联全书十大主题。`,
    answer:
      `一个卡片渲染全过程：①背景与形状——linear-gradient 铺底色、border-radius 画圆角、box-shadow spread 叠加多重边框（第 2-3 章）；②裁剪与伪元素——clip-path 裁出斜角造型、::after 伪元素画 tooltip 箭头（第 4-5 章）；③排版与字体——background-clip:text 让标题文字显示渐变、font-variant-numeric:tabular-nums 让数字等宽对齐（第 6-7 章）；④交互与动效——scroll-behavior:smooth 让锚点跳转平滑、:focus-visible 只在键盘导航时显焦点环、transition transform 做 hover 上浮（第 8-9 章）。4 层全部参与，一行样式背后是完整的 CSS 渲染思维。`,
    tags: ["视觉旅程", "总复习"],
  },
  {
    id: "csec-final-review-3",
    chapter: "csec-final-review",
    level: 4,
    question: `遇到视觉需求时，如何用选型判断矩阵选择 CSS 方案？`,
    answer:
      `核心判断维度：①是否增 DOM——优先不增 DOM 的方案（box-shadow spread vs 嵌套 div）；②是否触发重排——优先只合成的方案（transform vs top）；③是否矢量可缩放——优先矢量方案（CSS 渐变 vs PNG 图片）；④是否可搜索可改——优先文本方案（background-clip:text vs 图片文字）。示例：条纹背景用 repeating-linear-gradient（矢量、零请求）；多重边框用 box-shadow（不增 DOM）；三角形用 clip-path（矢量、可动画）；tooltip 箭头用伪元素（不增 DOM）；渐变文字用 background-clip:text（可搜索）；平滑跳转用 scroll-behavior（纯 CSS）；暗色主题用 prefers-color-scheme（跟随系统）。`,
    tags: ["选型", "工程思维", "总复习"],
  },
  {
    id: "csec-final-review-4",
    chapter: "csec-final-review",
    level: 4,
    question: `全书技巧共享的 CSS 渲染层心智模型是什么？如何用它自己发明技巧？`,
    answer:
      `核心心智模型是「用 CSS 属性的渲染副作用做非标用途」。每个技巧都是发现某 CSS 属性的渲染行为恰好能表达目标效果：渐变色标重合产生硬边 → 条纹；box-shadow spread 向外扩展 → 多重边框；border 拼三角 + transparent 隐藏三条 → 三角形箭头；background-clip:text 裁剪背景到文字形状 → 渐变文字；max-height 替代 height:auto → 可过渡的展开动画。用这个模型发明技巧的方法：遇到新需求时问「哪个 CSS 属性的渲染行为恰好能表达这个效果？」——分析属性的渲染机制，找到副作用恰好匹配需求的那一个。这是从「背 47 个技巧」到「掌握 CSS 渲染思维」的跨越。`,
    tags: ["心智模型", "渲染思维", "总复习"],
  },
];
