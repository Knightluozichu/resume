/** 复习题库 · WorkManager（bnrg-workmanager）。Big Nerd Ranch Guide 第 27 章。 */

import type { ReviewQuestion } from "./types";

export const bnrgWorkmanagerQuestions: ReviewQuestion[] = [
  {
    id: "bnrg-wm-1",
    chapter: "bnrg-workmanager",
    level: 1,
    question: "WorkManager 适合什么类型的任务？",
    answer:
      "deferrable（可延迟）、需要保证执行的后台任务——如同步数据、上传日志、定期清理。即使 App 退出或设备重启，WorkManager 仍会调度执行（受系统 Doze 约束）。",
    tags: ["WorkManager", "后台"],
  },
  {
    id: "bnrg-wm-2",
    chapter: "bnrg-workmanager",
    level: 1,
    question: "OneTimeWorkRequest 和 PeriodicWorkRequest 的区别？",
    answer:
      "OneTimeWorkRequest：执行一次，可设 Constraints 和链式依赖。PeriodicWorkRequest：周期性重复，最小间隔 15 分钟，适合定期同步——不能用于精确闹钟式调度。",
    tags: ["WorkRequest"],
  },
  {
    id: "bnrg-wm-3",
    chapter: "bnrg-workmanager",
    level: 2,
    question: "Constraints 可以指定哪些条件？",
    answer:
      "网络类型（UNMETERED/WIFI/CONNECTED）、充电中、设备 idle、存储空间低等。任务只在约束满足时运行——节省电量和流量。",
    tags: ["Constraints"],
  },
  {
    id: "bnrg-wm-4",
    chapter: "bnrg-workmanager",
    level: 2,
    question: "Worker 的 doWork() 返回值 Result.success/retry/failure 各表示什么？",
    answer:
      "success：任务完成，不再重试。retry：临时失败，WorkManager 按退避策略重试。failure：永久失败，不再重试，可观察 WorkInfo 状态处理。",
    tags: ["Worker", "Result"],
  },
  {
    id: "bnrg-wm-5",
    chapter: "bnrg-workmanager",
    level: 3,
    question: "WorkManager 和 Foreground Service 如何选择？",
    answer:
      "用户可感知的长时任务（音乐播放、导航、文件下载进度条）用 Foreground Service + 通知。用户不可见的 deferrable 同步/上传用 WorkManager。Immediate 紧急任务考虑 expedited work（API 31+ 有限制）。",
    tags: ["对比", "Service"],
  },
];

export default bnrgWorkmanagerQuestions;
