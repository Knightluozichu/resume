import type { ReviewQuestion } from "./types";

/** 学习地图 复习题 */
export const dnmMemoryModelQuestions: ReviewQuestion[] = [
  {
    id: "dnm-memory-model-1",
    chapter: "dnm-memory-model",
    level: 1,
    question: `.NET 中托管堆与栈的核心区别是什么？`,
    answer: `托管堆由 CLR 的 GC 自动管理内存分配和回收，存放引用类型实例；栈由操作系统管理，存放值类型和局部变量。栈分配只需移动指针极快；堆分配需 GC 参与。栈帧方法返回时释放，堆对象 GC 确认不可达后回收。`,
    tags: ["托管堆","栈","值类型","引用类型"],
  },
  {
    id: "dnm-memory-model-2",
    chapter: "dnm-memory-model",
    level: 2,
    question: `本书四大板块的学习顺序是什么？为什么？`,
    answer: `内存基础 → SOS 调试工具 → 内存模式 → 高级主题。建立因果链：内存基础是前提，SOS 让你实际观察验证理论，内存模式解释具体性能问题，高级主题是综合应用。`,
    tags: ["学习路径","四大板块"],
  },
  {
    id: "dnm-memory-model-3",
    chapter: "dnm-memory-model",
    level: 3,
    question: `一个引用类型对象从 new 到被回收经历了哪些阶段？`,
    answer: `1.new 在 Gen0 分配内存。2.初始化对象头+方法表指针+字段。3.构造函数执行。4.被根引用持有。5.根引用消失变为不可达。6.GC 标记不可达为垃圾。7.若有 Finalizer 移入 freachable 队列。8.终结后内存被回收（Gen0/1 压缩，Gen2/LOH 可能不压缩）。`,
    tags: ["对象生命周期","GC","分配","回收"],
  },
  {
    id: "dnm-memory-model-4",
    chapter: "dnm-memory-model",
    level: 4,
    question: `为什么说不理解 .NET 内存模型就无法写出高性能 C#？从三个场景说明。`,
    answer: `1.装箱：用 ArrayList<int> 导致每次装箱产生 Gen0 临时对象，应用 List<int>。2.LOH：循环 new 大数组进 LOH 触发 Full GC，应用 ArrayPool。3.Finalizer：加 ~析构器但没 Dispose，对象在 freachable 队列堆积需两次 GC，应用 Dispose+SuppressFinalize。`,
    tags: ["装箱","LOH","Finalizer","性能"],
  }
];
