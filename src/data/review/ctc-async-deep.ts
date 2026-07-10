import type { ReviewQuestion } from "./types";

export const ctcAsyncDeepQuestions: ReviewQuestion[] = [
  {
    id: "ctc-async-deep-1",
    chapter: "ctc-async-deep",
    level: 1,
    question: `async/await 的核心机制是什么？为什么 await 不阻塞线程？`,
    answer: `编译器将async方法转换为状态机：每个await处是挂起点，方法在此返回Task，后续代码被注册为continuation。线程不阻塞是因为await时方法已经返回了——线程被释放回线程池做别的事。异步操作完成后continuation被调度到线程池线程（或原同步上下文），状态机从await处恢复执行。整个过程中线程不被占用。`,
    tags: ["async/await", "状态机", "continuation", "非阻塞"],
  },
  {
    id: "ctc-async-deep-2",
    chapter: "ctc-async-deep",
    level: 2,
    question: `async void 有什么危险？为什么除了事件处理器外不应该使用？`,
    answer: `async void的异常无法被调用者捕获——它们直接在SynchronizationContext上抛出，可能导致进程崩溃。async void方法也无法被await，调用者不知道它何时完成。相比之下async Task的异常被捕获到Task中，调用者可以await并处理异常。event要求void返回类型，所以事件处理器是async void的唯一合法用途。其余场景必须用async Task或async Task<T>。`,
    tags: ["async void", "异常处理", "事件处理器"],
  },
  {
    id: "ctc-async-deep-3",
    chapter: "ctc-async-deep",
    level: 3,
    question: `在 UI 线程中调用 Task.Result 或 Task.Wait() 为什么会死锁？如何避免？`,
    answer: `UI线程调用Result/Wait()会阻塞当前线程等待Task完成。但Task的continuation需要回到UI线程（SynchronizationContext捕获了原始线程）执行——UI线程正在阻塞等待Task，Task等UI线程执行continuation，互相等待形成死锁。避免方法：1）库代码用ConfigureAwait(false)让continuation不回UI线程。2）全链路async——从底层到顶层都用await，不用Result/Wait()。3）ASP.NET Core没有SynchronizationContext不会死锁，但阻塞仍浪费线程资源。`,
    tags: ["死锁", "SynchronizationContext", "ConfigureAwait", "UI线程"],
  },
  {
    id: "ctc-async-deep-4",
    chapter: "ctc-async-deep",
    level: 4,
    question: `什么时候该用 ValueTask 代替 Task？ValueTask 有哪些使用限制？请设计一个适合 ValueTask 的场景。`,
    answer: `用ValueTask的场景：操作经常同步完成（如缓存命中率高），ValueTask.FromResult零堆分配而Task.FromResult每次分配。限制：ValueTask只能await一次——多次await同一实例抛InvalidOperationException。ValueTask异步完成时仍需内部分配。不能直接用于Task.WhenAll（需先AsTask()）。适合场景：带缓存的读取方法——缓存命中时返回ValueTask.FromResult(cachedValue)零分配，缓存未命中时返回new ValueTask<T>(ReadFromDbAsync())。如果缓存命中率>90%，ValueTask显著减少GC压力。`,
    tags: ["ValueTask", "Task", "堆分配", "缓存", "使用限制"],
  },
];
