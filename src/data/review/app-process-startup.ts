/** 复习题库 · 应用程序进程启动过程（app-process-startup） */
import type { ReviewQuestion } from "./types";

export const appProcessStartupQuestions: ReviewQuestion[] = [
  { id: "aps-1", chapter: "app-process-startup", level: 1, question: "App 进程创建的四步流程是什么？", answer: "AMS 发请求（通过 Socket）→ Zygote fork 新进程 → 新进程初始化（ActivityThread.main）→ AMS 启动目标 Activity。", tags: ["进程创建"] },
  { id: "aps-2", chapter: "app-process-startup", level: 1, question: "ActivityThread.main() 是 App 进程真正的入口——它做了哪两件关键的事？", answer: "① 准备主线程 Looper（消息循环）让主线程能处理消息；② 通过 Binder 向 AMS attach——告诉系统'新进程准备好了'。", tags: ["ActivityThread"] },
  { id: "aps-3", chapter: "app-process-startup", level: 2, question: "Zygote fork 新进程后，子进程继承了 Zygote 的什么？没继承什么？", answer: "继承：ART 虚拟机实例、预加载的系统类（通过 COW 共享）、JNI 绑定的 C/C++ 库。不继承：新的 PID、线程（只保留 fork 调用的那条）。", tags: ["fork", "COW"] },
  { id: "aps-4", chapter: "app-process-startup", level: 2, question: "AMS 通过什么方式让 Zygote fork 新进程？不是通过 Binder 吗？", answer: "AMS 通过 Socket（/dev/socket/zygote）通知 Zygote——不是 Binder。因为 Zygote fork 后如果带了 Binder 线程可能导致死锁。Socket 是更安全的 fork 通知方式。", tags: ["Socket", "Zygote"] },
  { id: "aps-5", chapter: "app-process-startup", level: 3, question: "新进程 fork 出来后需要初始化哪些东西才能正常跑 App？", answer: "① 启动 Binder 线程池（让新进程能通过 Binder 通信）；② 创建 ActivityThread；③ 调 main() 准备 Looper；④ 通过 Binder attach 到 AMS；⑤ 等 AMS 调 scheduleLaunchActivity 启动目标 Activity。", tags: ["进程初始化"] },
];
