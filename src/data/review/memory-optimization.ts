import type { ReviewQuestion } from "./types";
export const memoryOptimizationQuestions: ReviewQuestion[] = [
  { id: "mo-1", chapter: "memory-optimization", level: 1, question: "App OOM 的两大原因是什么？", answer: "① 内存泄漏：对象一直被持有引用无法回收→可用内存越来越少(慢性)。② 内存峰值：某个操作瞬间需要大量内存(如加载大图)→直接超过上限(急性)。", tags: ["OOM"] },
  { id: "mo-2", chapter: "memory-optimization", level: 1, question: "Android 四大经典内存泄漏场景是什么？", answer: "① 静态变量持有Activity；② 非静态内部类/匿名内部类(Handler)；③ 未注销监听器(广播/EventBus)；④ 资源未关闭(Cursor/InputStream)。", tags: ["泄漏场景"] },
  { id: "mo-3", chapter: "memory-optimization", level: 2, question: "LeakCanary 怎么检测 Activity 泄漏？", answer: "Activity.onDestroy 后用 WeakReference 持有它→等 GC →检查弱引用是否被回收→没回收=泄漏→dump heap→分析从 GC Roots 到 Activity 的最短引用路径→展示泄漏链。", tags: ["LeakCanary"] },
  { id: "mo-4", chapter: "memory-optimization", level: 2, question: "Bitmap 是内存'头号杀手'——一张 1920x1080 ARGB_8888 占多少内存？怎么优化？", answer: "约 8MB(1920×1080×4 bytes)。优化：inSampleSize采样缩小、RGB_565省一半(无透明需求)、Glide/Coil自动管理生命周期和缓存。", tags: ["Bitmap"] },
  { id: "mo-5", chapter: "memory-optimization", level: 3, question: "Handler 延迟消息为什么会导致 Activity 泄漏？怎么修？", answer: "Handler 是匿名内部类→隐式持有 Activity。Message 在队列里排队→1分钟后处理→这1分钟内 Activity destroy→Handler 还持有引用→泄漏。修复：静态内部类+WeakReference 或 onDestroy 里 removeCallbacksAndMessages。", tags: ["Handler泄漏"] },
];
