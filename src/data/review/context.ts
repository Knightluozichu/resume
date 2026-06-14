import type { ReviewQuestion } from "./types";
export const contextQuestions: ReviewQuestion[] = [
  { id: "ctx-1", chapter: "context", level: 1, question: "Context 的继承体系是什么？从抽象类到具体子类。", answer: "Context(抽象) → ContextImpl(真正实现) / ContextWrapper(装饰器) → Application / ContextThemeWrapper → Activity。", tags: ["Context继承"] },
  { id: "ctx-2", chapter: "context", level: 1, question: "Application Context 和 Activity Context 最关键的三个区别？", answer: "① 生命周期：Application=App同长，Activity=Activity同长。② 主题：Application无主题，Activity有。③ Window Token：Application没有→不能建Dialog。", tags: ["Context区别"] },
  { id: "ctx-3", chapter: "context", level: 2, question: "为什么 Dialog 必须用 Activity Context 而不能用 Application Context？", answer: "Dialog 需要 Window Token——这是 WMS 分配的窗口归属凭据。Activity 在 onResume 后有 Token，Application 没有——所以用 Application Context 创建 Dialog 抛 BadTokenException。", tags: ["Dialog", "Token"] },
  { id: "ctx-4", chapter: "context", level: 2, question: "单例类持有 Context 应该用哪种？为什么？", answer: "必须用 Application Context（context.getApplicationContext()）。因为单例生命周期=进程，如果持有 Activity Context 会导致 Activity 销毁后仍然被引用→整个 Activity 及其 View 树泄漏。", tags: ["内存泄漏"] },
  { id: "ctx-5", chapter: "context", level: 3, question: "一个 App 有多少个 Context 实例？", answer: "Application(1) + 每个Activity(1) + 每个Service(1) + 初始ContentProvider(1)。每个都是独立的 Context 实例，但底层 ContextImpl 可共享资源管理器。", tags: ["Context数量"] },
];
