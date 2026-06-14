import type { ReviewQuestion } from "./types";
export const componentWorkflowQuestions: ReviewQuestion[] = [
  { id: "cw-1", chapter: "component-workflow", level: 1, question: "Activity 启动从 Launcher 点击到 onCreate 的完整 Binder IPC 调用链是什么？", answer: "Launcher→(startActivity)→AMS→(Socket)→Zygote fork→新进程→(attach)→AMS→(scheduleLaunchActivity)→ApplicationThread→Handler→主线程→onCreate/onStart/onResume", tags: ["Activity"] },
  { id: "cw-2", chapter: "component-workflow", level: 1, question: "startService 和 bindService 的关键区别是什么？", answer: "startService：启动后与调用者无通信通道，需主动 stopService。bindService：调用者通过 Binder 与 Service 双向通信，所有绑定者 unbind 后自动停止。", tags: ["Service"] },
  { id: "cw-3", chapter: "component-workflow", level: 1, question: "动态注册广播和静态注册广播有什么区别？", answer: "动态：registerReceiver()代码注册，跟注册者同生命周期。静态：Manifest 声明，App 安装后常驻。Android 8.0 后大部分隐式广播禁静态注册。", tags: ["Broadcast"] },
  { id: "cw-4", chapter: "component-workflow", level: 2, question: "为什么 ContentProvider 的 onCreate 在 Application.onCreate 之前执行？", answer: "因为 ContentProvider 可能在 Application 初始化过程中就被其他进程调用——系统保证 ContentProvider 在 Application 之前初始化。这意味着 CP.onCreate 不能依赖 Application 已就绪。", tags: ["ContentProvider"] },
  { id: "cw-5", chapter: "component-workflow", level: 2, question: "ApplicationThread 是什么？它在 Activity 启动中起什么作用？", answer: "ActivityThread 的内部 Binder 服务端。AMS 通过 Binder 远程调用它的方法（scheduleLaunchActivity），它再把消息投到主线程 Handler——实现系统进程→App进程的生命周期调度。", tags: ["ApplicationThread"] },
  { id: "cw-6", chapter: "component-workflow", level: 3, question: "为什么 Android 8.0 限制静态注册广播？你的 App 要监听网络变化怎么办？", answer: "限制原因：大量 App 在 Manifest 声明静态广播→每次系统变化都要拉起它们→耗电。方案：改用动态注册 registerReceiver() 或 ConnectivityManager.registerDefaultNetworkCallback()。", tags: ["静态广播"] },
];
