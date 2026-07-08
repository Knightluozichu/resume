import type { ReviewQuestion } from "./types";

export const csecTextEffectsQuestions: ReviewQuestion[] = [
  {
    id: "csec-text-effects-1",
    chapter: "csec-text-effects",
    level: 2,
    question: "-webkit-text-stroke 和 text-shadow 模拟描边各有什么优缺点？",
    answer:
      "text-stroke 优点：①描边宽度精确可控（直接指定 px）；②描边均匀（四个方向等宽）；③渲染清晰不模糊。缺点：①非标准属性（虽然广泛支持）；②描边画在文字填充之上，细字号时可能遮住笔画内部。text-shadow 模拟优点：①标准属性兼容性极好；②可做柔和发光效果（用 blur）。缺点：①模拟描边需要 4-8 个方向的 shadow 拼合，代码冗长；②阴影向外扩散，描边不够锐利；③斜角处可能出现缝隙。结论：需要精确描边用 text-stroke，需要发光效果或兼容旧浏览器用 text-shadow。",
    tags: ["text-stroke", "text-shadow", "描边"],
  },
  {
    id: "csec-text-effects-2",
    chapter: "csec-text-effects",
    level: 3,
    question: "background-clip: text 实现渐变文字时，为什么必须设 color: transparent？",
    answer:
      "background-clip: text 的作用是让元素的背景（如渐变）只裁剪到文字的形状内。但文字本身仍有填充色（由 color 属性控制，默认黑色）。填充色绘制在背景之上，如果不设为透明，填充色会盖住渐变背景，看到的还是纯色文字。设 color: transparent 后，文字填充区域变透明，透出下方的渐变背景——视觉上就是渐变色的文字。`-webkit-text-fill-color: transparent` 优先级高于 color，是更推荐的写法。",
    tags: ["background-clip", "渐变文字"],
  },
  {
    id: "csec-text-effects-3",
    chapter: "csec-text-effects",
    level: 3,
    question: "如何让文字沿圆形路径排列？为什么需要 SVG？",
    answer:
      "文字沿圆弧排列需要 SVG 的 textPath 元素——CSS 目前无法让文字沿任意路径排列。做法：在 SVG defs 中定义一个圆形 path（用 M/a 命令画圆弧），然后用 `<textPath href=\"#circle\">文字内容</textPath>` 让文字沿该 path 排列。textPath 的 href 属性引用 path 的 id。文字会从 path 起点开始沿路径方向排列，字符方向自动跟随路径切线。CSS 只能控制 font-size、fill 等基本样式，路径形状必须由 SVG path 定义。",
    tags: ["SVG", "textPath", "环形文字"],
  },
  {
    id: "csec-text-effects-4",
    chapter: "csec-text-effects",
    level: 4,
    question: "渐变文字方案中 -webkit-text-fill-color: transparent 比 color: transparent 好在哪？",
    answer:
      "-webkit-text-fill-color 的优先级高于 color——即使 color 设了其他值，-webkit-text-fill-color: transparent 仍然能让文字填充透明。这在某些场景更可靠：①user agent 样式表可能给某些元素设了 color（如 a 标签的蓝色），如果只设 color: transparent 可能被覆盖；②CSS 变量主题切换时，如果 color 绑定了主题变量，-webkit-text-fill-color 可以独立控制填充透明而不干扰 color 的主题逻辑。但 -webkit-text-fill-color 是带前缀的非标准属性，在非 WebKit 浏览器中可能不支持——最佳实践是两者都设：`-webkit-text-fill-color: transparent; color: transparent;` 做双保险。",
    tags: ["background-clip", "渐变文字", "兼容性"],
  },
];
