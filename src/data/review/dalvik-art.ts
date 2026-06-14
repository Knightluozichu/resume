import type { ReviewQuestion } from "./types";
export const dalvikArtQuestions: ReviewQuestion[] = [
  { id: "da-1", chapter: "dalvik-art", level: 1, question: "Dalvik 的 JIT 和 ART 5.0 的 AOT 各是什么？核心区别？", answer: "Dalvik JIT：运行时编译热点代码→安装快但运行慢。ART 5.0 AOT：安装时全量编译成机器码(.oat)→安装慢但运行快。核心区别：编译时机不同。", tags: ["JIT vs AOT"] },
  { id: "da-2", chapter: "dalvik-art", level: 1, question: "Android 7.0 的混合编译模式是怎么工作的？", answer: "安装不编译(fast)→运行时解释执行+JIT编译热点→记录profiling数据→设备空闲+充电时后台AOT编译热点→下次启动直接执行。安装快+启动快+存储小。", tags: ["混合编译"] },
  { id: "da-3", chapter: "dalvik-art", level: 2, question: "系统 OTA 升级后'正在优化 X/Y 个应用'是什么原因？ART 7.0 解决了吗？", answer: "旧版 ART 5.0/6.0 升级后需要重新 AOT 编译所有 App 的 .oat 文件。ART 7.0 混合编译不再全量 AOT→OTA 升级后无需等待。", tags: ["OTA"] },
  { id: "da-4", chapter: "dalvik-art", level: 2, question: "ART 的 GC 比 Dalvik 好在哪？", answer: "Dalvik GC 非并发→GC时全暂停(STW两次)。ART GC 并发→App运行时同时GC、暂停极短。ART 还有紧凑型 GC 移动活对象减少碎片。", tags: ["GC"] },
];
