/** 复习题库 · 深入学习intent和任务（bnrg-more-intents）。Big Nerd Ranch Guide 第 23 章。 */

import type { ReviewQuestion } from "./types";

export const bnrgMoreIntentsQuestions: ReviewQuestion[] = [
  {
    id: "bnrg-mi-1",
    chapter: "bnrg-more-intents",
    level: 1,
    question: "Task 和 Back Stack 的关系？",
    answer:
      "Task 是一组按用户操作组织的 Activity 栈（通常对应一个 App 的多页面流程）。Back Stack 是 Task 内的 Activity 后进先出栈。launcher 图标启动新 Task；startActivity 默认压入当前 Task 的栈。",
    tags: ["Task", "Back Stack"],
  },
  {
    id: "bnrg-mi-2",
    chapter: "bnrg-more-intents",
    level: 1,
    question: "Intent flag FLAG_ACTIVITY_NEW_TASK 和 FLAG_ACTIVITY_CLEAR_TOP 各做什么？",
    answer:
      "NEW_TASK：在新 Task 或已有 Task 中启动 Activity（常用于从非 Activity Context 启动）。CLEAR_TOP：若目标 Activity 已在栈中，清除其上的所有 Activity 并复用该实例（singleTop 行为相关）。",
    tags: ["Intent Flag"],
  },
  {
    id: "bnrg-mi-3",
    chapter: "bnrg-more-intents",
    level: 2,
    question: "launchMode singleTop、singleTask、singleInstance 的区别？",
    answer:
      "standard：每次新建实例。singleTop：栈顶已是该 Activity 则复用 onNewIntent。singleTask：整个 Task 只有一个实例，清其上方 Activity。singleInstance：独占 Task，最极端隔离。",
    tags: ["launchMode"],
  },
  {
    id: "bnrg-mi-4",
    chapter: "bnrg-more-intents",
    level: 2,
    question: "从通知栏点进 App，如何避免重复创建 Activity 栈？",
    answer:
      "PendingIntent 使用 FLAG_UPDATE_CURRENT + 合适的 launchMode；或 Intent 加 FLAG_ACTIVITY_CLEAR_TOP | FLAG_ACTIVITY_SINGLE_TOP；Deep Link 用 TaskStackBuilder 构建正确的 back stack。",
    tags: ["PendingIntent", "通知"],
  },
  {
    id: "bnrg-mi-5",
    chapter: "bnrg-more-intents",
    level: 3,
    question: "用户从 App A 分享到你的 App，按 Back 却回到 App A 而不是你的主页，为什么？如何修？",
    answer:
      "分享 Intent 把你的 DetailActivity 放进了 App A 的 Task。修复：DetailActivity 设 launchMode singleTask 或 Manifest taskAffinity；或用 TaskStackBuilder 构造 synthetic back stack，让 Up 回到你的 MainActivity。",
    tags: ["TaskAffinity", "分享"],
  },
];

export default bnrgMoreIntentsQuestions;
