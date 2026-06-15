/** 复习题库 · 第二个activity（bnrg-second-activity）。Big Nerd Ranch Guide 第 6 章。 */

import type { ReviewQuestion } from "./types";

export const bnrgSecondActivityQuestions: ReviewQuestion[] = [
  {
    id: "bnrg-sa-1",
    chapter: "bnrg-second-activity",
    level: 1,
    question: "显式 Intent 和隐式 Intent 的核心区别是什么？应用内页面跳转用哪种？",
    answer:
      "显式 Intent 指定目标组件类名（如 `Intent(this, DetailActivity::class.java)`），系统直接启动。隐式 Intent 只声明 action/category/data，由系统匹配 Manifest 中的 intent-filter。应用内跳转用显式 Intent。",
    tags: ["Intent", "显式"],
  },
  {
    id: "bnrg-sa-2",
    chapter: "bnrg-second-activity",
    level: 1,
    question: "按 Back 键时，返回栈发生了什么？",
    answer:
      "栈顶 Activity 被 finish 并销毁（出栈），露出下一个 Activity 并恢复其 onRestart/onStart/onResume。如果栈里只剩一个 Activity，按 Back 退出 App（Task 进入后台或销毁，取决于系统策略）。",
    tags: ["返回栈", "Back"],
  },
  {
    id: "bnrg-sa-3",
    chapter: "bnrg-second-activity",
    level: 2,
    question: "第二个 Activity 没有在 Manifest 注册，点击跳转后会发生什么？",
    answer:
      "运行时抛出 `ActivityNotFoundException` 或 `Unable to find explicit activity class` 崩溃。所有 Activity 必须在 AndroidManifest.xml 的 `<application>` 下声明 `<activity android:name=\"...\" />`。",
    tags: ["Manifest", "注册"],
  },
  {
    id: "bnrg-sa-4",
    chapter: "bnrg-second-activity",
    level: 2,
    question: "Activity Result API 相比 `startActivityForResult` 有什么优势？",
    answer:
      "① 类型安全——Contract 定义输入输出类型；② 生命周期感知——launcher 在 Activity 销毁时自动取消；③ 无需重写 `onActivityResult` 一个大 switch；④ 与 Kotlin 协程/Flow 集成更自然。",
    tags: ["Activity Result", "API"],
  },
  {
    id: "bnrg-sa-5",
    chapter: "bnrg-second-activity",
    level: 3,
    question: "Activity A 启动 B 再启动 C，用户连按两次 Back，生命周期回调顺序是什么？",
    answer:
      "第一次 Back：C 的 onPause → B 的 onRestart/onStart/onResume → C 的 onStop/onDestroy。第二次 Back：B 的 onPause → A 的 onRestart/onStart/onResume → B 的 onStop/onDestroy。",
    tags: ["生命周期", "多 Activity"],
  },
];

export default bnrgSecondActivityQuestions;
