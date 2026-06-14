import type { ReviewQuestion } from "./types";
export const amsQuestions: ReviewQuestion[] = [
  { id: "ams-1", chapter: "ams", level: 1, question: "AMS 家族五层关系是什么？从 AMS 到 ActivityRecord。", answer: "AMS → ActivityStackSupervisor → ActivityStack → TaskRecord → ActivityRecord。各层逐级细化：总管→栈监督→单栈→任务→单Activity记录。", tags: ["AMS家族"] },
  { id: "ams-2", chapter: "ams", level: 1, question: "ProcessRecord、ActivityRecord、TaskRecord 各记录什么信息？", answer: "ProcessRecord：进程信息(uid/pid/OOM优先级)。ActivityRecord：单个Activity实例(关联Task/状态)。TaskRecord：一个任务栈(一组Activity)。三者关联：ProcessRecord←ActivityRecord→TaskRecord。", tags: ["数据结构"] },
  { id: "ams-3", chapter: "ams", level: 2, question: "singleTask 和 singleInstance 的 Launch Mode 有什么区别？", answer: "singleTask：全局唯一实例，同Task内创建→清掉上面的Activity。singleInstance：独占整个Task，Task里只能有它。适用场景：singleTask=App主页，singleInstance=被其他App调起的独立页面(拨号)。", tags: ["LaunchMode"] },
  { id: "ams-4", chapter: "ams", level: 2, question: "AMS 是怎么决定内存不足时杀哪个进程的？", answer: "AMS 维护每个进程的 oom_adj 值（根据进程重要性动态调整）。顺序：前台<可见<服务<后台<空进程。内存不足时从 oom_adj 最大的（最不重要）开始杀。", tags: ["OOM", "进程优先级"] },
  { id: "ams-5", chapter: "ams", level: 3, question: "startActivity 后超过 5 秒没显示界面→ANR。可能是什么原因？", answer: "通常是目标进程 fork 慢或 Application.onCreate() 耗时太长。AMS 设置了超时：前台 Activity 5秒、Service 20秒、Broadcast 10秒。排查：检查 Application.onCreate 耗时，用 StrictMode 检测主线程磁盘读写。", tags: ["ANR"] },
];
