/** 复习题库 · broadcast intent（bnrg-broadcast）。Big Nerd Ranch Guide 第 28 章。 */

import type { ReviewQuestion } from "./types";

export const bnrgBroadcastQuestions: ReviewQuestion[] = [
  {
    id: "bnrg-bc-1",
    chapter: "bnrg-broadcast",
    level: 1,
    question: "显式广播和隐式广播的区别？Android 8+ 对隐式广播有什么限制？",
    answer:
      "显式广播指定 ComponentName，只发给特定 App/Receiver。隐式广播只声明 action，系统分发给所有匹配的 Receiver。Android 8+ 静态注册（Manifest）的隐式广播大部分被禁止，需动态注册或显式广播。",
    tags: ["广播", "Android 8"],
  },
  {
    id: "bnrg-bc-2",
    chapter: "bnrg-broadcast",
    level: 1,
    question: "动态注册和静态注册 BroadcastReceiver 的区别？",
    answer:
      "动态：代码里 registerReceiver，随 Activity/Context 生命周期，onDestroy 必须 unregister。静态：Manifest 声明，App 未运行也能收系统广播（受限制），开机广播等。",
    tags: ["动态注册", "静态注册"],
  },
  {
    id: "bnrg-bc-3",
    chapter: "bnrg-broadcast",
    level: 2,
    question: "LocalBroadcastManager 解决什么问题？现在用什么替代？",
    answer:
      "App 内进程内广播，不经过系统，更高效安全。LocalBroadcastManager 已废弃——改用 LiveData、Flow、SharedFlow 或 EventBus 模式在 App 内组件间通信。",
    tags: ["LocalBroadcast", "替代"],
  },
  {
    id: "bnrg-bc-4",
    chapter: "bnrg-broadcast",
    level: 2,
    question: "Ordered broadcast 是什么？abortBroadcast 做什么？",
    answer:
      "有序广播按 priority 顺序逐个 Receiver 处理，前一个可 abortBroadcast 阻止后续接收。用于 SMS 拦截等链式处理。普通 sendBroadcast 是无序并行的。",
    tags: ["有序广播", "priority"],
  },
  {
    id: "bnrg-bc-5",
    chapter: "bnrg-broadcast",
    level: 3,
    question: "Receiver 的 onReceive 里做网络请求为什么危险？",
    answer:
      "onReceive 主线程执行，约 10 秒超时系统会 ANR/杀进程。且 goAsync 或 startService 后进程可能被回收。应 schedule WorkManager 或 startForegroundService 处理耗时逻辑，onReceive 里只做轻量工作。",
    tags: ["onReceive", "ANR"],
  },
];

export default bnrgBroadcastQuestions;
