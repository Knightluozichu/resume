/** 复习题库 · Looper、Handler和HandlerThread（bnrg-looper-handler）。Big Nerd Ranch Guide 第 25 章。 */

import type { ReviewQuestion } from "./types";

export const bnrgLooperHandlerQuestions: ReviewQuestion[] = [
  {
    id: "bnrg-lh-1",
    chapter: "bnrg-looper-handler",
    level: 1,
    question: "Looper、Handler、MessageQueue 三者的关系？",
    answer:
      "Looper 从 MessageQueue 取 Message 循环分发。Handler 往 Queue 发 Message 并处理回调。每个线程最多一个 Looper——主线程 Looper 处理 UI 更新，子线程可 prepare 自己的 Looper。",
    tags: ["Looper", "Handler"],
  },
  {
    id: "bnrg-lh-2",
    chapter: "bnrg-looper-handler",
    level: 1,
    question: "HandlerThread 是什么？比直接 new Thread 好在哪里？",
    answer:
      "自带 Looper 的后台线程——start 后 getLooper() 得到 Looper，Handler 绑定其上处理串行消息。比裸 Thread 更方便做线程间消息传递，比线程池适合需要顺序执行的后台任务。",
    tags: ["HandlerThread"],
  },
  {
    id: "bnrg-lh-3",
    chapter: "bnrg-looper-handler",
    level: 2,
    question: "为什么 Handler 持有 Activity 的匿名内部类会导致内存泄漏？",
    answer:
      "非静态内部类隐式持有外部 Activity 引用。Message 在 Queue 里排队时 Handler 不被 GC，Activity 也无法回收。修复：静态内部类 + WeakReference<Activity>，或不用 Handler 改用协程。",
    tags: ["泄漏", "静态内部类"],
  },
  {
    id: "bnrg-lh-4",
    chapter: "bnrg-looper-handler",
    level: 2,
    question: "post(Runnable) 和 sendMessage 的区别？",
    answer:
      "post 把 Runnable 包装成 Message 入队，在目标 Looper 线程执行 run。sendMessage 传递 what/obj 到 handleMessage。post 更简洁；sendMessage 适合自定义消息类型和延迟（sendMessageDelayed）。",
    tags: ["post", "Message"],
  },
  {
    id: "bnrg-lh-5",
    chapter: "bnrg-looper-handler",
    level: 3,
    question: "子线程更新 TextView 崩溃「Only the original thread that created a view hierarchy can touch its views」，原因和修法？",
    answer:
      "UI 只能在创建 View 树的主线程修改。子线程直接 setText 违规。修法：Handler(Looper.getMainLooper()).post { textView.text = ... }、runOnUiThread、或协程 withContext(Dispatchers.Main)。",
    tags: ["主线程", "UI"],
  },
];

export default bnrgLooperHandlerQuestions;
