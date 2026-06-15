/** 复习题库 · UI状态的保存与恢复（bnrg-ui-state）。Big Nerd Ranch Guide 第 4 章。 */

import type { ReviewQuestion } from "./types";

export const bnrgUiStateQuestions: ReviewQuestion[] = [
  {
    id: "bnrg-us-1",
    chapter: "bnrg-ui-state",
    level: 1,
    question: "`onSaveInstanceState(Bundle)` 和 `ViewModel` 分别适合保存什么类型的数据？",
    answer:
      "`onSaveInstanceState` 适合轻量 UI 状态（输入框文字、滚动位置、选中项）——Bundle 有大小限制且只能放可序列化数据。ViewModel 适合配置变更后仍需保留的业务数据（列表、网络请求结果）——存活周期比 Activity 实例更长，不受 Bundle 大小限制。",
    tags: ["状态保存", "ViewModel"],
  },
  {
    id: "bnrg-us-2",
    chapter: "bnrg-ui-state",
    level: 1,
    question: "旋转屏幕时 Activity 被销毁重建，哪些数据会丢失？哪些不会？",
    answer:
      "丢失：Activity 成员变量、未保存的 UI 状态。不丢失：通过 `onSaveInstanceState` 写入 Bundle 的数据、ViewModel 里的数据、SharedPreferences/数据库/Room 持久化的数据。",
    tags: ["配置变更", "旋转"],
  },
  {
    id: "bnrg-us-3",
    chapter: "bnrg-ui-state",
    level: 2,
    question: "为什么不应该在 `onSaveInstanceState` 里保存大型对象（如 Bitmap 或整个列表）？",
    answer:
      "Bundle 通过 Binder 跨进程传递，有约 1MB 的大小限制。放大型对象可能导致 `TransactionTooLargeException` 崩溃。大型数据应放 ViewModel、数据库或文件，Bundle 只存 ID 或轻量标记。",
    tags: ["Bundle", "限制"],
  },
  {
    id: "bnrg-us-4",
    chapter: "bnrg-ui-state",
    level: 2,
    question: "`onRestoreInstanceState` 和 `onCreate(savedInstanceState)` 都能恢复状态，有什么区别？",
    answer:
      "`onCreate` 里 `savedInstanceState` 可能为 null（首次创建）。`onRestoreInstanceState` 只在有 saved state 时调用，且在 `onStart` 之后——适合恢复依赖 View 已创建完毕的状态（如 ListView 选中项）。多数场景在 `onCreate` 里检查 Bundle 即可。",
    tags: ["恢复", "生命周期"],
  },
  {
    id: "bnrg-us-5",
    chapter: "bnrg-ui-state",
    level: 3,
    question: "用户输入了一段长文本，旋转屏幕后输入框变空了。最可能漏了哪一步？如何修复？",
    answer:
      "最可能没有在 `onSaveInstanceState` 里保存 EditText 内容，或没有在 `onCreate`/`onRestoreInstanceState` 里恢复。修复：在 `onSaveInstanceState` 中 `outState.putString(KEY, editText.text.toString())`；在 `onCreate` 中 `savedInstanceState?.getString(KEY)?.let { editText.setText(it) }`。更推荐用 ViewModel 持有输入状态。",
    tags: ["排错", "EditText"],
  },
];

export default bnrgUiStateQuestions;
