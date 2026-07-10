import type { ReviewQuestion } from "./types";

export const hpwGarbageCollectionQuestions: ReviewQuestion[] = [
  {
    id: "hpw-garbage-collection-1",
    chapter: "hpw-garbage-collection",
    level: 2,
    question: `垃圾回收要解决什么问题？它的代价是什么？`,
    answer:
      `GC 要解决手动内存管理的两类 bug：①内存泄漏——申请了不释放；②悬空指针/双释放——释放了还在用、或释放两次。GC 让程序员只管分配（new），由运行时定期找出「再也不会被访问到的对象」并自动回收其内存。代价是：①运行时开销（GC 算法本身要花 CPU）；②停顿（标记/整理堆时可能要暂停所有应用线程，即 Stop-The-World）；③不确定性（你不知道 GC 何时发生、回收多少，对实时性要求高的场景是隐患）。权衡是：GC 用一点性能和停顿，换来「不泄漏、不悬空」的内存安全，对大多数应用值得。`,
    tags: ["垃圾回收", "内存管理"],
  },
  {
    id: "hpw-garbage-collection-2",
    chapter: "hpw-garbage-collection",
    level: 3,
    question: `GC 如何判断对象该回收？为什么循环引用的两个对象能被回收？`,
    answer:
      `GC 用可达性分析：从 GC Roots（栈上的局部变量、全局/静态变量、寄存器中的引用）出发沿引用链遍历，能到达的是存活对象，到达不了的就是垃圾。循环引用（A→B、B→A）的两个对象，如果都不在 root 的引用链上（即没有任何外部引用指向 A 或 B），那从 root 出发根本到不了它们，二者都是不可达的，会被一起回收。这是可达性分析相比引用计数的优势——引用计数会因为互相引用导致计数永不为 0 而泄漏，可达性分析只看从根能否到达。`,
    tags: ["可达性分析", "循环引用"],
  },
  {
    id: "hpw-garbage-collection-3",
    chapter: "hpw-garbage-collection",
    level: 3,
    question: `标记-清除、复制、标记-整理三种算法各有什么优劣？分代回收如何组合它们？`,
    answer:
      `①标记-清除：先标记可达对象再清除未标记的，简单但产生碎片。②复制：存活对象从 From 复制到 To 半区紧凑排列再整块清空 From，无碎片分配快但浪费一半空间，适合存活率低的新生代。③标记-整理：标记后把存活对象向一端移动紧凑排列，无碎片不浪费空间但移动开销大，适合存活率高的老年代。分代回收组合：新生代存活率低用复制算法（Minor GC 快），熬过几次 GC 的对象晋升到老年代；老年代存活率高用标记-清除或标记-整理。大部分 GC 只扫新生代（快），偶尔才 Full GC 扫整堆。`,
    tags: ["GC算法", "分代回收"],
  },
  {
    id: "hpw-garbage-collection-4",
    chapter: "hpw-garbage-collection",
    level: 4,
    question: `「有 GC 就不会内存泄漏了」这个说法对吗？GC 语言里的内存泄漏是怎么回事？`,
    answer:
      `不对。GC 回收的是「不可达」的对象，但如果你把对象放进一个长生命周期容器（全局 List、静态 Map、缓存）却忘记移除，这个对象一直「可达」，GC 永远不会回收它——这就是 GC 语言里的内存泄漏。典型场景：监听器注册了没注销、缓存只增不减、集合当临时变量用却忘了清。GC 语言的泄漏不像 C 那样直接 free 漏掉，而是「逻辑上不再需要但引用还没断」。同样，GC 也不能消除 OOM——如果存活对象总量超过堆大小（如缓存无限增长、大对象未释放引用），GC 回收再多也救不了。理解「泄漏=该断的引用没断」，才能在 GC 语言里也写出不漏内存的代码。`,
    tags: ["内存泄漏", "GC"],
  },
];
