import type { ReviewQuestion } from "./types";

export const cswTextDecorationQuestions: ReviewQuestion[] = [
  {
    id: "csw-text-decoration-1",
    chapter: "csw-text-decoration",
    level: 2,
    question: `white-space 的五个取值分别如何处理「自动换行」和「空白/换行符」？`,
    answer:
      `normal：空格处自动换行，合并空白、忽略换行符（默认）。nowrap：不自动换行，合并空白、忽略换行符。pre：不自动换行，保留空白和换行符（等宽呈现）。pre-wrap：空格处可换行，保留空白和换行符。pre-line：空格处可换行，合并空白、保留换行符。记忆：normal 是基础；nowrap 关掉换行；pre 保留一切但不换行；pre-wrap 加上换行；pre-line 保留换行符但合并空白。`,
    tags: ["white-space", "换行", "空白处理"],
  },
  {
    id: "csw-text-decoration-2",
    chapter: "csw-text-decoration",
    level: 3,
    question: `实现单行文字溢出省略号需要哪三个属性？为什么缺一不可？`,
    answer:
      `三件套：white-space:nowrap（不换行，让文字溢出而非折行）、overflow:hidden（裁剪溢出部分）、text-overflow:ellipsis（在裁剪处显示省略号）。缺 nowrap：文字会折行，没有溢出可裁剪。缺 overflow:hidden：溢出文字直接显示，不裁剪。缺 text-overflow:ellipsis：裁剪但不显示省略号，文字直接被截断。三者配合才能实现「一行排满 → 裁剪 → 省略号」的完整效果。多行省略需用 -webkit-line-clamp 等不同方案。`,
    tags: ["省略号", "text-overflow", "单行截断"],
  },
  {
    id: "csw-text-decoration-3",
    chapter: "csw-text-decoration",
    level: 3,
    question: `word-break:break-all 和 overflow-wrap:break-word 有什么区别？各适合什么场景？`,
    answer:
      `word-break:break-all：在任意字符间断行，中英文都拆，激进断词。适合纯中文或不在乎单词完整性的场景，但会把英文单词从中间拆开，阅读体验差。overflow-wrap:break-word（旧名 word-wrap:break-word）：仅在词放不下容器时才拆词，保守策略，正常情况下保持单词完整。适合英文为主的内容和长 URL 断行——正常词不拆，只有超长无空格字符串（如 URL）才断。英文场景优先 overflow-wrap 保留可读性，中文场景可用 break-all。`,
    tags: ["word-break", "overflow-wrap", "断词"],
  },
  {
    id: "csw-text-decoration-4",
    chapter: "csw-text-decoration",
    level: 4,
    question: `text-decoration 现代语法相比经典写法有什么增强？如何叠加多条装饰线？`,
    answer:
      `现代语法拆分为三个子属性：text-decoration-line（线型：overline/line-through/underline 可多选）、text-decoration-style（样式：solid/dashed/dotted/double/wavy）、text-decoration-color（颜色）。简写：text-decoration: underline wavy red（线型+样式+颜色）。增强：①可叠加多条线——text-decoration-line: underline overline 同时加上下划线；②每条线可独立设样式和颜色（text-decoration-line 多值时）；③波浪线 wavy 等新样式。经典写法 text-decoration:underline 只能一条线、样式颜色受限。现代写法表达力更强，适合设计需求丰富的场景。`,
    tags: ["text-decoration", "现代语法", "多条线"],
  },
];
