/** 复习题库 · HTTP与后台任务（bnrg-http-background）。Big Nerd Ranch Guide 第 24 章。 */

import type { ReviewQuestion } from "./types";

export const bnrgHttpBackgroundQuestions: ReviewQuestion[] = [
  {
    id: "bnrg-hb-1",
    chapter: "bnrg-http-background",
    level: 1,
    question: "为什么网络请求不能放在主线程？",
    answer:
      "Android 禁止主线程阻塞 IO——NetworkOnMainThreadException。主线程负责 UI，阻塞会导致 ANR。网络请求必须在后台线程、协程 Dispatchers.IO 或 WorkManager 中执行。",
    tags: ["主线程", "网络"],
  },
  {
    id: "bnrg-hb-2",
    chapter: "bnrg-http-background",
    level: 1,
    question: "OkHttp 和 Retrofit 的分工？",
    answer:
      "OkHttp：底层 HTTP 客户端——连接池、拦截器、缓存、TLS。Retrofit：在 OkHttp 之上的 REST 封装——把接口方法注解映射为 HTTP 请求，自动序列化/反序列化 JSON。",
    tags: ["OkHttp", "Retrofit"],
  },
  {
    id: "bnrg-hb-3",
    chapter: "bnrg-http-background",
    level: 2,
    question: "AsyncTask 为什么被废弃？应该用什么替代？",
    answer:
      "生命周期难管理、易泄漏、线程池行为不一致、配置变更后结果丢失。替代：Kotlin 协程 + ViewModel scope、ExecutorService、WorkManager（需持久化的后台任务）。",
    tags: ["AsyncTask", "协程"],
  },
  {
    id: "bnrg-hb-4",
    chapter: "bnrg-http-background",
    level: 2,
    question: "Retrofit suspend 函数和 Callback .enqueue 各适合什么？",
    answer:
      "suspend 配合协程——结构化并发、取消传播、try/catch 统一错误处理，现代 Kotlin 首选。Callback 适合 Java 或旧代码——需手动线程切换更新 UI。",
    tags: ["Retrofit", "协程"],
  },
  {
    id: "bnrg-hb-5",
    chapter: "bnrg-http-background",
    level: 3,
    question: "Activity 销毁后网络回调仍更新 UI 导致崩溃，如何防？",
    answer:
      "用 viewModelScope.launch 发起请求——ViewModel 销毁时协程自动取消；或在回调里检查 isDestroyed；LiveData/Flow 观察时自带生命周期感知。不要裸 Thread/Callback 直接 hold Activity 引用。",
    tags: ["泄漏", "协程"],
  },
];

export default bnrgHttpBackgroundQuestions;
