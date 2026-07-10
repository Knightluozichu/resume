import type { ReviewQuestion } from "./types";

/** 终结化 复习题 */
export const dnmFinalizationQuestions: ReviewQuestion[] = [
  {
    id: "dnm-finalization-1",
    chapter: "dnm-finalization",
    level: 1,
    question: `Finalizer 是什么？与 C++ 析构函数有何区别？`,
    answer: `Finalizer 是 CLR 在 GC 回收对象前自动调用的清理方法（C# 语法 ~ClassName()）。区别：1.C++ 析构离开作用域确定性调用，Finalizer 由 GC 不确定时间调用。2.C++ 同步当前线程，Finalizer 异步在终结器线程。3.C++ 是确定释放机制，Finalizer 只应作安全网，主要释放应通过 Dispose。`,
    tags: ["Finalizer","析构函数","GC","确定性"],
  },
  {
    id: "dnm-finalization-2",
    chapter: "dnm-finalization",
    level: 2,
    question: `为什么有 Finalizer 的对象需要两次 GC 才能回收？`,
    answer: `第一次 GC 发现对象不可达但有 Finalizer，移入 freachable 队列（该队列本身是根使对象重新可达）。终结器线程从队列取出调用 Finalizer，完成后对象才真正不可达。第二次 GC 才回收内存。代价：内存延迟释放+两次 GC+终结器线程单线程瓶颈。`,
    tags: ["Finalizer","freachable","两次GC","终结器线程"],
  },
  {
    id: "dnm-finalization-3",
    chapter: "dnm-finalization",
    level: 3,
    question: `Dispose(bool disposing) 参数有什么含义？`,
    answer: `disposing=true：由开发者主动 Dispose/using 触发，其他托管对象可能还存活可安全访问释放。disposing=false：由 Finalizer 触发（GC 正在回收），其他托管对象可能已回收不能安全访问，只能释放非托管资源。原则：Finalizer 中不碰托管对象只清非托管。SuppressFinalize 在手动 Dispose 后调用取消 Finalizer。`,
    tags: ["Dispose模式","disposing","Finalizer","IDisposable"],
  },
  {
    id: "dnm-finalization-4",
    chapter: "dnm-finalization",
    level: 4,
    question: `类同时持有非托管 IntPtr 和托管 FileStream，如何正确实现释放？`,
    answer: `实现 IDisposable+Finalizer 标准模式。Dispose() 调 Dispose(true)+SuppressFinalize。Dispose(true) 释放托管(_stream.Dispose())和非托管(NativeApi.CloseHandle)。Dispose(false) 只清非托管不碰 _stream。~MixedResource() 调 Dispose(false) 作安全网。关键：disposing=false 时不碰托管对象但必须清非托管。`,
    tags: ["Dispose模式","非托管资源","托管资源","SafeHandle"],
  }
];
