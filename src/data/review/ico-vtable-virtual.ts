/** 复习题库 · 虚函数与虚表（ico-vtable-virtual）。《深度探索 C++ 对象模型》第 5 章改编。 */

import type { ReviewQuestion } from "./types";

export const icoVtableVirtualQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "ico-vv-1",
    chapter: "ico-vtable-virtual",
    level: 1,
    question: `vtable、vptr、虚函数槽分别是什么？它们之间的关系？`,
    answer:
      `vtable（虚表）是一张函数指针表，每个槽位存一个虚函数的地址，全类共享一份。vptr 是对象内存里指向所属类 vtable 的指针。虚函数槽是 vtable 里的一个条目，按虚函数声明顺序编号。关系：对象的 vptr → 该类的 vtable → 某个槽 → 真正要调的函数地址。每个有虚函数的对象都带一个 vptr。`,
    tags: ["vtable", "vptr", "虚函数槽"],
  },

  // ── L2 理解：为什么 / 机制 ──
  {
    id: "ico-vv-2",
    chapter: "ico-vtable-virtual",
    level: 2,
    question: `把 \`ptr->draw()\` 这个虚调用一步步展开成内部操作。`,
    answer:
      `虚调用展开：① 取出 ptr 所指对象的 vptr（找到所属类的 vtable）；② 按虚函数声明顺序定位 draw 在 vtable 中的槽位（比如槽 1）；③ 解引用该槽，拿到真正要调的函数地址；④ 以 ptr 作为 this 调用该函数。即 \`(*ptr->vptr[1])(ptr)\`。比非虚调用多了一次经 vptr 的间接寻址，这就是多态的运行期代价。`,
    tags: ["虚调用展开", "机制"],
  },

  // ── L3 应用：读代码 / 推断 ──
  {
    id: "ico-vv-3",
    chapter: "ico-vtable-virtual",
    level: 3,
    question:
      `派生类没有覆写基类的某个虚函数 f。派生类的 vtable 里 f 对应的槽位指向哪里？`,
    answer:
      `指向基类的 f 实现。派生类构造时会把基类 vtable 复制一份作为起点，只对「派生类覆写了的」虚函数槽替换为派生类版本；没覆写的槽继承基类的函数地址不变。所以对没覆写的 f，通过派生类对象调 f，经 vptr 查到的仍是基类 f——这正是「不覆写就沿用基类行为」在虚表层面的体现。`,
    tags: ["虚表继承", "槽位", "推断"],
  },

  // ── L4 综合：陷阱 / 全流程 ──
  {
    id: "ico-vv-4",
    chapter: "ico-vtable-virtual",
    level: 4,
    question:
      `多重继承下，一个派生对象为什么有多个 vptr？这如何影响「把派生指针转成不同基类指针」的行为？`,
    answer:
      `多重继承时派生对象由多个基类子对象拼接而成，每个有虚函数的基类子对象各带一个 vptr，各管该基类接口的虚函数槽——所以一个派生对象有多个 vptr。把派生指针转成「主基类」指针通常不偏移；转成「次基类」指针时，编译器要把指针偏移到对应的基类子对象起始处，这样该基类指针的 vptr 才能正确查到属于该接口的虚表。这就是多重继承下 this 指针调整的来源，也是虚调用在多重继承里更复杂、开销略高的原因。`,
    tags: ["多重继承", "多 vptr", "this 调整", "综合"],
  },
];

export default icoVtableVirtualQuestions;
