import type { ReviewQuestion } from "./types";

export const csecPseudoElementsQuestions: ReviewQuestion[] = [
  {
    id: "csec-pseudo-elements-1",
    chapter: "csec-pseudo-elements",
    level: 2,
    question: `伪元素 ::before/::after 必须设置哪个属性才会生成？`,
    answer:
      `伪元素必须有 content 属性才会生成——即使值为空字符串 \`content: \"\"\`。省略 content 时伪元素不渲染，这是最常见的「为什么我的 ::after 没生效」原因。content 的值不仅限于文本，空字符串、attr() 函数（读取元素属性）、url() 图片都可以。此外伪元素默认是 inline 的，设定位或尺寸前需要先 \`display: block\` 或 \`position: absolute\`。`,
    tags: ["伪元素", "content"],
  },
  {
    id: "csec-pseudo-elements-2",
    chapter: "csec-pseudo-elements",
    level: 3,
    question: `为什么用 border 技巧画三角形时，border: 8px solid transparent + border-bottom-color 会产生向上的三角形？`,
    answer:
      `当元素的 width 和 height 都为 0 时，四条 border 围成一个由四个三角形拼成的正方形——每条 border 是一个等腰三角形，底边朝外、顶点指向中心。四条 border 颜色相同时看到的是正方形。当只把 border-bottom-color 设为有色、其余三条设为 transparent 时，只有底部那个三角形可见——底边在下方、顶点朝上，看起来就是一个向上的三角形。tooltip 把它定位到 \`bottom: 100%\`（元素上方），箭头就指向气泡内容。`,
    tags: ["伪元素", "border", "三角形"],
  },
  {
    id: "csec-pseudo-elements-3",
    chapter: "csec-pseudo-elements",
    level: 3,
    question: `为什么 height: auto 不能做 transition，而 max-height 可以？`,
    answer:
      `transition 需要一个确定的起止数值来做插值。height: auto 的实际高度依赖内容——浏览器在动画开始前无法确定最终高度值，因此无法做数值插值，transition 直接失效。max-height 是一个确定的长度值（如 0 → 500px），浏览器可以做线性插值。但 max-height 方案有局限：如果 max-height 设得比实际内容高很多，动画会「先快后慢」——前半段视觉上没变化（因为内容已经完全展开但 max-height 还在过渡）。解决方案是尽量让 max-height 接近实际内容高度，或用 JS 读取 scrollHeight 精确设置。`,
    tags: ["伪元素", "transition", "max-height"],
  },
  {
    id: "csec-pseudo-elements-4",
    chapter: "csec-pseudo-elements",
    level: 4,
    question: `clearfix 的原理是什么？display: flow-root 为什么能替代它？`,
    answer:
      `clearfix 的原理是在父容器末尾生成一个块级伪元素（::after）并设 \`clear: both\`，强制父容器包含浮动子元素——因为 clear: both 让伪元素移到所有浮动元素下方，父容器要包住伪元素就必须撑高到包含浮动子元素。display: flow-root 让元素创建新的块级格式化上下文（BFC）——BFC 的特性是自动包含内部浮动（浮动子元素参与父容器高度计算），因此不需要额外的伪元素 clearfix。flow-root 是更现代、更语义化的方案，但旧浏览器（IE11 及以下）不支持。`,
    tags: ["伪元素", "clearfix", "BFC"],
  },
];
