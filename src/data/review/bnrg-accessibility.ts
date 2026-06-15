/** 复习题库 · Android辅助功能（bnrg-accessibility）。Big Nerd Ranch Guide 第 18 章。 */

import type { ReviewQuestion } from "./types";

export const bnrgAccessibilityQuestions: ReviewQuestion[] = [
  {
    id: "bnrg-a11y-1",
    chapter: "bnrg-accessibility",
    level: 1,
    question: "TalkBack 用户如何感知界面上的自定义图标按钮？你需要做什么？",
    answer:
      "TalkBack 读 contentDescription。纯图标 Button 必须设 android:contentDescription 或用 setContentDescription 提供有意义的描述（如「搜索」而非「button」）。",
    tags: ["TalkBack", "contentDescription"],
  },
  {
    id: "bnrg-a11y-2",
    chapter: "bnrg-accessibility",
    level: 1,
    question: "可点击区域最小推荐尺寸是多少？为什么？",
    answer:
      "至少 48dp × 48dp（Material 指南）。小于此尺寸手指难以准确点击，运动障碍用户更难操作。视觉小的图标可用 padding 或 TouchDelegate 扩大触摸区域。",
    tags: ["触摸目标", "48dp"],
  },
  {
    id: "bnrg-a11y-3",
    chapter: "bnrg-accessibility",
    level: 2,
    question: "装饰性图片应该设 contentDescription 吗？",
    answer:
      "不应设有意义描述——设 android:contentDescription=\"@null\" 或 importantForAccessibility=\"no\"，让 TalkBack 跳过纯装饰图，避免干扰阅读流。",
    tags: ["装饰图", "跳过"],
  },
  {
    id: "bnrg-a11y-4",
    chapter: "bnrg-accessibility",
    level: 2,
    question: "颜色对比度不足为什么同时影响普通用户和视障用户？",
    answer:
      "WCAG 要求正文对比度至少 4.5:1。低对比度在强光下普通用户也看不清；色盲用户无法靠颜色 alone 区分状态。应用应同时用颜色+图标+文字传达信息。",
    tags: ["对比度", "色盲"],
  },
  {
    id: "bnrg-a11y-5",
    chapter: "bnrg-accessibility",
    level: 3,
    question: "Layout Inspector 的 Accessibility 检查能发现哪些问题？",
    answer:
      "缺少 contentDescription、触摸目标过小、对比度不足、可聚焦顺序不合理、重复的无标签 clickable View 等。开发阶段用 Lint 的 Accessibility 警告 + TalkBack 真机走查。",
    tags: ["Lint", "检查"],
  },
];

export default bnrgAccessibilityQuestions;
