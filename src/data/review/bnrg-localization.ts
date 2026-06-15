/** 复习题库 · 应用本地化（bnrg-localization）。Big Nerd Ranch Guide 第 17 章。 */

import type { ReviewQuestion } from "./types";

export const bnrgLocalizationQuestions: ReviewQuestion[] = [
  {
    id: "bnrg-loc-1",
    chapter: "bnrg-localization",
    level: 1,
    question: "Android 如何根据系统语言自动选择字符串资源？",
    answer:
      "在 res 下创建带语言限定符的目录，如 values（默认）、values-zh（中文）、values-en（英文）。系统按设备 locale 自动加载匹配的 strings.xml，代码里始终用 @string/key 引用。",
    tags: ["strings", "locale"],
  },
  {
    id: "bnrg-loc-2",
    chapter: "bnrg-localization",
    level: 1,
    question: "为什么 UI 文字不应硬编码在 layout 或 Kotlin 里？",
    answer:
      "硬编码无法做多语言切换，改文案要改代码重新编译。放 strings.xml 后翻译人员可独立维护各语言文件，同一布局自动适配不同语言。",
    tags: ["strings.xml", "最佳实践"],
  },
  {
    id: "bnrg-loc-3",
    chapter: "bnrg-localization",
    level: 2,
    question: "values-zh-rCN 和 values-zh 的优先级区别？",
    answer:
      "values-zh-rCN 只匹配中国大陆中文；values-zh 匹配所有中文 locale（无更具体匹配时的 fallback）。系统选最精确匹配的 qualifier 目录。",
    tags: ["qualifier", "优先级"],
  },
  {
    id: "bnrg-loc-4",
    chapter: "bnrg-localization",
    level: 2,
    question: "plurals 资源解决什么问题？用法示例？",
    answer:
      "不同数量用不同语法（英文 1 item vs 2 items，中文无复数但其他语言有）。`<plurals name=\"items\">` 配合 `quantity`（zero/one/two/few/many/other），代码用 `resources.getQuantityString(R.plurals.items, count, count)`。",
    tags: ["plurals", "数量"],
  },
  {
    id: "bnrg-loc-5",
    chapter: "bnrg-localization",
    level: 3,
    question: "德语翻译比英语长 30%，按钮文字被截断。有哪些应对方案？",
    answer:
      "① 布局用 wrap_content + minWidth 而非固定宽度。② 长文案用 ellipsize 或换行。③ 提供不同语言的 dimens（values-de/dimens.xml 更大 padding）。④ 避免在窄 Button 上放长句子——改用图标+短标签。",
    tags: ["布局", "翻译"],
  },
];

export default bnrgLocalizationQuestions;
