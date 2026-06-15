/** 复习题库 · Android SDK版本与兼容（bnrg-sdk-compat）。Big Nerd Ranch Guide 第 7 章。 */

import type { ReviewQuestion } from "./types";

export const bnrgSdkCompatQuestions: ReviewQuestion[] = [
  {
    id: "bnrg-sc-1",
    chapter: "bnrg-sdk-compat",
    level: 1,
    question: "`compileSdk`、`minSdk`、`targetSdk` 各管什么？用一句话区分。",
    answer:
      "compileSdk：编译时能调用哪些 API。minSdk：能安装的最低 Android 版本。targetSdk：你承诺按哪个版本的行为规范运行，系统据此启用对应限制。",
    tags: ["SDK", "版本"],
  },
  {
    id: "bnrg-sc-2",
    chapter: "bnrg-sdk-compat",
    level: 1,
    question: "运行时如何检查当前设备 API 级别？",
    answer:
      "`Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU`（或具体 API 常量）。只有条件为 true 时才调用该版本新增的 API，否则走兼容分支或使用 AndroidX 封装。",
    tags: ["SDK_INT", "版本检查"],
  },
  {
    id: "bnrg-sc-3",
    chapter: "bnrg-sdk-compat",
    level: 2,
    question: "compileSdk 设为 34、minSdk 设为 21，能在 API 21 设备上调用 API 34 的新方法吗？",
    answer:
      "编译可以通过（compileSdk 允许你写这段代码），但 API 21 设备上运行时如果直接调用会崩溃（方法不存在）。必须在运行时检查 `SDK_INT >= 34` 或使用 AndroidX 兼容实现。",
    tags: ["兼容", "运行时"],
  },
  {
    id: "bnrg-sc-4",
    chapter: "bnrg-sdk-compat",
    level: 2,
    question: "为什么 Google Play 要求提高 targetSdk？targetSdk 过低会怎样？",
    answer:
      "新版本 Android 引入行为变更（后台限制、分区存储、通知权限等）。提高 targetSdk 表示开发者已适配这些变更。targetSdk 过低可能无法提交新版本，或系统对 App 启用额外的兼容/限制模式。",
    tags: ["targetSdk", "Play Store"],
  },
  {
    id: "bnrg-sc-5",
    chapter: "bnrg-sdk-compat",
    level: 3,
    question: "NotificationCompat.Builder 和原生 Notification.Builder 在低版本设备上的行为差异？",
    answer:
      "原生 `Notification.Builder` 在低版本缺少部分 API（如 NotificationChannel 是 API 26+）。`NotificationCompat` 在内部做版本分支——高版本用新 API，低版本降级到等价旧 API，对外统一接口。",
    tags: ["AndroidX", "NotificationCompat"],
  },
];

export default bnrgSdkCompatQuestions;
