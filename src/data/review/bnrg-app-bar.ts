/** 复习题库 · 应用栏（bnrg-app-bar）。Big Nerd Ranch Guide 第 14 章。 */

import type { ReviewQuestion } from "./types";

export const bnrgAppBarQuestions: ReviewQuestion[] = [
  {
    id: "bnrg-ab-1",
    chapter: "bnrg-app-bar",
    level: 1,
    question: "Toolbar 和 Theme 自带 ActionBar 的关系？如何切换？",
    answer:
      "Toolbar 是布局中的 View，可放任意位置；ActionBar 由 Theme 提供，固定在顶部。使用 Toolbar：Theme 设 NoActionBar，布局放 Toolbar，Activity 调用 setSupportActionBar(toolbar)。",
    tags: ["Toolbar", "ActionBar"],
  },
  {
    id: "bnrg-ab-2",
    chapter: "bnrg-app-bar",
    level: 1,
    question: "Options Menu 中 showAsAction 的 ifRoom、always、never 各表示什么？",
    answer:
      "ifRoom：应用栏有空间就显示为图标按钮，否则进溢出菜单（⋮）。always：强制显示为图标（可能挤占标题）。never：始终只在溢出菜单里显示。",
    tags: ["Menu", "showAsAction"],
  },
  {
    id: "bnrg-ab-3",
    chapter: "bnrg-app-bar",
    level: 2,
    question: "Up 导航（←）和系统 Back 键的语义区别？",
    answer:
      "Up：在应用信息架构中回到父级页面（如列表→详情 的 Up 回列表），可能跨 Activity 或 NavGraph 层级。Back：按返回栈 LIFO 出栈，不关心层级关系。单 Activity 架构里 Up 通常调用 navController.navigateUp()。",
    tags: ["Up", "Back"],
  },
  {
    id: "bnrg-ab-4",
    chapter: "bnrg-app-bar",
    level: 2,
    question: "onCreateOptionsMenu 和 onOptionsItemSelected 何时被调用？",
    answer:
      "onCreateOptionsMenu：Activity 首次打开 options menu 或 invalidateOptionsMenu 后重建菜单时。onOptionsItemSelected：用户点击菜单项（含溢出菜单和 showAsAction 图标）时。",
    tags: ["Menu", "回调"],
  },
  {
    id: "bnrg-ab-5",
    chapter: "bnrg-app-bar",
    level: 3,
    question: "setSupportActionBar 后标题不显示，可能原因有哪些？",
    answer:
      "① 忘记 setSupportActionBar。② Toolbar 在 setSupportActionBar 之后才 inflate。③ 用了 setTitle 但 Theme 的 windowActionBarOverlay 冲突。④ Navigation Component 的 AppBarConfiguration 覆盖了标题。检查顺序：inflate 布局 → findViewById Toolbar → setSupportActionBar → setTitle。",
    tags: ["排错", "标题"],
  },
];

export default bnrgAppBarQuestions;
