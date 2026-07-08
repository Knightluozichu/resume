import type { ReviewQuestion } from "./types";

export const csecFontFeaturesQuestions: ReviewQuestion[] = [
  {
    id: "csec-font-features-1",
    chapter: "csec-font-features",
    level: 2,
    question: "font-kerning 和 letter-spacing 在字距控制上有什么区别？",
    answer:
      "font-kerning 调用的是字体文件内置的字偶距表——它知道 AV 这对字母应该拉近、To 这对应该正常，是逐对智能调整。letter-spacing 是对所有字符无差别加减同一个值——它不区分字符对，AV 和 aa 加减量相同。如果你想要「排版优化的紧凑感」，应该用 font-kerning: normal；如果你想要「设计感的宽松/紧凑风格」，才用 letter-spacing。两者可叠加使用。",
    tags: ["font-kerning", "letter-spacing"],
  },
  {
    id: "csec-font-features-2",
    chapter: "csec-font-features",
    level: 3,
    question: "代码块中为什么应该关闭连字（font-variant-ligatures: none）？",
    answer:
      "代码中字符组合如 ff、fi、fl、ffi 在开启连字时会被合并成连笔字形——这改变了代码的实际视觉形态。例如 CSS 中的 `affiliation`、HTML 中的 `diff`，如果 fl 或 ff 被合并，代码可读性下降，且与输入的原始字符不对应——开发者难以快速定位字符。更重要的是，连字字形可能让 `!=` 等符号看起来像 `≠`，造成误解。因此代码块、终端模拟器等场景应设 `font-variant-ligatures: none`，确保每个字符独立显示。",
    tags: ["连字", "代码块"],
  },
  {
    id: "csec-font-features-3",
    chapter: "csec-font-features",
    level: 3,
    question: "tabular-nums 和 proportional-nums 有什么区别？各适用什么场景？",
    answer:
      "tabular-nums（等宽数字）：每个数字字符占相同宽度（如 1 和 8 一样宽）。优点是数字纵向对齐——在表格、价格列表、计时器中，数字变化时不会左右抖动。proportional-nums（比例数字）：每个数字按自身字形宽度排列（1 比 8 窄）。优点是视觉更自然、阅读节奏更好——适合正文段落中的日期、数量。场景选择：财务表格/数据看板/倒计时用 tabular-nums，正文/标题用 proportional-nums。底层对应 OpenType 特性 tnum 和 pnum。",
    tags: ["OpenType", "数字", "排版"],
  },
  {
    id: "csec-font-features-4",
    chapter: "csec-font-features",
    level: 4,
    question: "font-feature-settings 和 font-variant-* 属性有什么关系？应该优先用哪个？",
    answer:
      "font-variant-* （如 font-variant-ligatures、font-variant-numeric）是 CSS 规范的高层属性，用语义化关键词开关 OpenType 特性（如 common-ligatures、tabular-nums）。font-feature-settings 是底层属性，直接传 OpenType 特性标签（如 \"liga\" 1、\"tnum\" 1）。应该优先用 font-variant-*：①语义清晰可读；②浏览器负责处理字体不支持时的回退；③一个 font-variant 声明可能映射多个底层特性。font-feature-settings 适合：①font-variant-* 没有覆盖的冷门特性；②需要精确控制特定特性的开关。缺点是覆盖性差——设了一个 font-feature-settings 会重置所有未提及的特性为默认值。",
    tags: ["OpenType", "font-variant", "选型"],
  },
];
