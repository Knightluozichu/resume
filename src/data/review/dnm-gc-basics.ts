import type { ReviewQuestion } from "./types";

/** GC 基础 复习题 */
export const dnmGcBasicsQuestions: ReviewQuestion[] = [
  {
    id: "dnm-gc-basics-1",
    chapter: "dnm-gc-basics",
    level: 1,
    question: `CLR GC 的分代假设是什么？为什么有效？`,
    answer: `新对象大概率很快变垃圾（弱分代假设），老对象大概率继续存活（强分代假设）。有效因为大多数对象是临时变量，方法返回后不可达。GC 优先回收 Gen0 只扫描少量新对象，避免全堆扫描。`,
    tags: ["分代假设","GC","Gen0"],
  },
  {
    id: "dnm-gc-basics-2",
    chapter: "dnm-gc-basics",
    level: 2,
    question: `GC 回收的标记-清除-压缩三阶段分别做什么？`,
    answer: `1.标记：从根遍历引用图标记可达对象。2.清除：未标记的释放为空闲空间。3.压缩：存活对象向一端移动消除碎片，更新引用。Gen0/1 总是压缩，Gen2/LOH 默认不压缩。`,
    tags: ["标记","清除","压缩","GC流程"],
  },
  {
    id: "dnm-gc-basics-3",
    chapter: "dnm-gc-basics",
    level: 3,
    question: `什么情况触发 Gen2 回收（Full GC）？为什么代价高？`,
    answer: `触发：Gen2 预算用尽、LOH 预算用尽、显式 GC.Collect、内存不足。代价高因为扫描全堆、Stop-The-World 暂停所有线程、若压缩 Gen2 需移动大量对象更新引用。`,
    tags: ["Full GC","Gen2","触发条件"],
  },
  {
    id: "dnm-gc-basics-4",
    chapter: "dnm-gc-basics",
    level: 4,
    question: `如何设计代码减少 GC 压力？给出三个策略及原理。`,
    answer: `1.减少分配：struct 替代 class、stackalloc、Span<T>。原理减少 Gen0 分配量。2.避免晋升：缩短对象生命周期不让其逃逸。原理留在 Gen0 回收避免到 Gen2。3.池化复用：ArrayPool/ObjectPool/StringBuilder。原理避免反复分配尤其避免 LOH。`,
    tags: ["GC压力","分配优化","池化","struct"],
  }
];
