/** 复习题库 · 对话框（bnrg-dialogs）。Big Nerd Ranch Guide 第 13 章。 */

import type { ReviewQuestion } from "./types";

export const bnrgDialogsQuestions: ReviewQuestion[] = [
  {
    id: "bnrg-dg-1",
    chapter: "bnrg-dialogs",
    level: 1,
    question: "为什么对话框推荐用 DialogFragment 而不是直接 AlertDialog.show()？",
    answer:
      "配置变更（旋转屏幕）时 Activity 重建，普通 Dialog 会泄漏或消失。DialogFragment 由 FragmentManager 管理，自动随 Activity 重建恢复，生命周期安全。",
    tags: ["DialogFragment", "配置变更"],
  },
  {
    id: "bnrg-dg-2",
    chapter: "bnrg-dialogs",
    level: 1,
    question: "AlertDialog.Builder 的典型构建步骤？",
    answer:
      "setTitle → setMessage/setView → setPositiveButton/setNegativeButton（带 OnClickListener）→ create() → show()。在 DialogFragment 的 onCreateDialog 里 return builder.create()。",
    tags: ["AlertDialog", "Builder"],
  },
  {
    id: "bnrg-dg-3",
    chapter: "bnrg-dialogs",
    level: 2,
    question: "FragmentResult API 如何实现对话框向宿主回传数据？",
    answer:
      "宿主 Fragment/Activity 用 setFragmentResultListener 注册监听 key。DialogFragment 在用户确认时调用 setFragmentResult(key, bundle) 然后 dismiss。宿主在 listener 回调里读取 bundle 数据。",
    tags: ["FragmentResult", "回传"],
  },
  {
    id: "bnrg-dg-4",
    chapter: "bnrg-dialogs",
    level: 2,
    question: "setTargetFragment 为什么被废弃？FragmentResult 好在哪里？",
    answer:
      "setTargetFragment 在配置变更后 target 引用可能失效，且耦合两个 Fragment 实例。FragmentResult 基于 key-value 和 FragmentManager，不持有 Fragment 引用，生命周期安全，支持跨 back stack 通信。",
    tags: ["废弃", "对比"],
  },
  {
    id: "bnrg-dg-5",
    chapter: "bnrg-dialogs",
    level: 3,
    question: "旋转屏幕后对话框里的 EditText 输入丢失，如何修复？",
    answer:
      "在 DialogFragment 的 onSaveInstanceState 保存输入，onCreateDialog/onViewCreated 恢复；或把输入状态放 ViewModel；或禁止该 Dialog 的配置变更（不推荐）。DialogFragment 本身会重建，需主动保存 UI 状态。",
    tags: ["状态", "旋转"],
  },
];

export default bnrgDialogsQuestions;
