import type { ReviewQuestion } from "./types";

export const jdgBrowserApisQuestions: ReviewQuestion[] = [
  {
    id: "jdg-browser-apis-1",
    chapter: "jdg-browser-apis",
    level: 2,
    question: `为什么 Fetch 的 4xx/5xx 不会进 catch？如何正确处理 HTTP 错误？`,
    answer:
      `Fetch 只在网络层出错（断网/DNS 失败/CORS 被拒）时才 reject Promise 进 catch；HTTP 4xx/5xx 不 reject——因为从 HTTP 协议角度请求成功发出并收到响应，只是状态码表示失败。Fetch 的 Promise 表示「网络请求是否完成」而非「业务是否成功」。正确处理：then 中手动检查 if (!res.ok) throw new Error(res.status)，res.ok 在状态码 200-299 时为 true；或封装 wrapper 统一检查。res.json()/res.text() 异步读响应体。注意响应体只能读一次（流式），需多次读先 clone()。封装时建议统一处理 res.ok 检查和错误格式化，避免每个调用点重复检查。`,
    tags: ["Fetch", "HTTP错误", "res.ok"],
  },
  {
    id: "jdg-browser-apis-2",
    chapter: "jdg-browser-apis",
    level: 3,
    question: `如何用 AbortController 实现 Fetch 超时和取消？有什么典型场景？`,
    answer:
      `AbortController 实现：const ctrl = new AbortController(); const timer = setTimeout(() => ctrl.abort(), ms); fetch(url, {signal: ctrl.signal})。abort() 会让 fetch 抛出 AbortError，在 catch 中判断 e.name === 'AbortError' 区分超时取消和真正网络错误，finally 中 clearTimeout(timer)。也可手动调 ctrl.abort() 主动取消（不依赖定时器）。典型场景：①超时控制——5 秒未返回自动取消；②搜索框输入快速变化——新请求发出时取消上一个未完成请求，避免旧结果覆盖新结果（竞态）；③页面跳转/组件卸载——取消未完成请求避免对已卸载组件 setState 导致内存泄漏（React 中配合 cleanup 或 AbortController）。注意 abort 后 fetch 的 Promise 会 reject，需妥善 catch。`,
    tags: ["AbortController", "超时", "取消", "竞态"],
  },
  {
    id: "jdg-browser-apis-3",
    chapter: "jdg-browser-apis",
    level: 3,
    question: `localStorage/sessionStorage/IndexedDB 如何选型？各有什么特点和限制？`,
    answer:
      `localStorage：持久存储（手动清除才消失），同源共享，同步 API（阻塞主线程），约 5-10MB，存字符串（对象需 JSON 序列化），适合 Token/用户配置等小数据。sessionStorage：会话级（标签页关闭清除），不跨标签页共享，同步 API，适合临时会话状态如未提交表单。IndexedDB：异步事务型 NoSQL 数据库，容量大（数百 MB+），能存对象/文件/Blob 不需序列化，异步不阻塞主线程，适合大量结构化数据如离线缓存/聊天记录。选型原则：小而持久用 localStorage，小而临时用 sessionStorage，大而结构化用 IndexedDB。注意 localStorage 同步阻塞——存大数据卡 UI，大数据必须用 IndexedDB。三者都受同源策略限制。`,
    tags: ["localStorage", "sessionStorage", "IndexedDB", "存储选型"],
  },
  {
    id: "jdg-browser-apis-4",
    chapter: "jdg-browser-apis",
    level: 4,
    question: `Web Worker 解决了什么问题？它有什么限制？数据如何传递？SharedWorker 和 Service Worker 有何不同？`,
    answer:
      `Web Worker 解决 JS 单线程下 CPU 密集计算阻塞 UI 的问题：加密、图像处理、大数据排序在主线程跑会卡死页面交互。Worker 在独立线程运行这些计算，通过 postMessage 传结果回主线程更新 UI。限制：Worker 不能操作 DOM/window/document（只有主线程能），不能访问主线程的变量，通过消息传递通信。数据传递是结构化克隆（复制非共享），传超大对象有拷贝开销——用 Transferable 对象（如 ArrayBuffer）可转移所有权避免拷贝（转移后原线程不能访问）。SharedWorker：可被多个标签页共享同一 Worker 实例，跨标签通信。Service Worker：独立于页面的事件驱动 Worker，做离线缓存（PWA）、推送通知、后台同步的底座，生命周期与页面无关，可拦截 fetch 请求。主线程 new Worker('worker.js') 创建，terminate() 终止。`,
    tags: ["Web Worker", "多线程", "Transferable", "ServiceWorker"],
  },
];
