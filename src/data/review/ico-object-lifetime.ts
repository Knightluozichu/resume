/** 复习题库 · 对象生命周期（ico-object-lifetime）。《深度探索 C++ 对象模型》对象生命周期章改编。 */

import type { ReviewQuestion } from "./types";

export const icoObjectLifetimeQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "ico-ol-1",
    chapter: "ico-object-lifetime",
    level: 1,
    question: "一个对象从生到灭的五个阶段依次是什么？构造与析构在顺序上有什么关系？",
    answer:
      "五阶段：① 分配内存（new/栈预留）；② 构造（设 vptr → 基类 → 成员 → 函数体 → 改 vptr）；③ 使用（成员访问、虚调用多态生效）；④ 析构（函数体 → 成员逆序析构 → 基类析构）；⑤ 释放内存（delete/栈回收）。构造与析构严格对称反向：构造自基向派，析构自派向基，成员始终比对象本体先构造、后析构。",
    tags: ["生命周期", "构造析构对称"],
  },

  // ── L2 理解：为什么 / 机制 ──
  {
    id: "ico-ol-2",
    chapter: "ico-object-lifetime",
    level: 2,
    question: "为什么说「构造完成到析构开始之间」才是多态真正生效的窗口？",
    answer:
      "因为 vptr 在构造期先指向基类虚表、最后才改指向派生类虚表，在析构期又先改回基类虚表再析构派生部分。所以构造期间（基类构造函数运行时）虚函数退化为基类版本、析构期间同样退化——这两段里多态不生效。只有构造全部完成、vptr 已指向派生类虚表，到析构开始把 vptr 改回之前，对象才处于「真正自己是派生类型」的状态，虚调用才会走到派生类覆写。这就是「别在构造/析构里调虚函数」的根因。",
    tags: ["多态窗口", "构造析构期"],
  },

  // ── L3 应用：读代码 / 排错 ──
  {
    id: "ico-ol-3",
    chapter: "ico-object-lifetime",
    level: 3,
    question:
      "全局对象、栈对象、堆对象的构造与析构分别发生在什么时候？下面代码会有什么问题？`Foo* p = new Foo; /* 忘了 delete */`",
    answer:
      "全局/静态对象：程序启动时构造、main 退出后析构，存于数据段，生存期 = 整个程序。栈对象：声明处构造、离开作用域析构，生存期 = 所在作用域。堆对象：new 时构造、delete 时析构，生存期由程序员手动管控。`new Foo` 后忘了 delete，析构不会触发、内存不回收——内存泄漏；若 Foo 持有资源（文件、锁、socket），还会造成资源泄漏。解法是用 RAII（智能指针 unique_ptr/shared_ptr）把堆对象生命周期绑定到栈上对象，自动释放。",
    tags: ["三类对象", "内存泄漏", "RAII"],
  },

  // ── L4 综合：陷阱 / 全流程 ──
  {
    id: "ico-ol-4",
    chapter: "ico-object-lifetime",
    level: 4,
    question:
      "全局对象 A 的构造依赖另一个全局对象 B（A 构造函数里用 B）。这会有什么隐患？结合对象生命周期说明，并给解法。",
    answer:
      "隐患是「静态初始化顺序未定义」——全局/静态对象分散在不同翻译单元里，它们之间的构造顺序标准未规定。若 A 的构造依赖 B，但该翻译单元里 B 还没构造，A 就用到了一个未初始化的 B，行为未定义。析构反向同理（构造先 A 后 B，析构先 B 后 A，A 析构时若用 B 已是悬空）。解法：用「构造时首次访问」的局部静态（Meyers 单例）——把 B 包成函数内 static，首次调用时才构造，顺序由依赖决定而非翻译单元顺序；或用 nifty counter 等显式初始化模式。核心是：全局对象间不要有构造期依赖，把依赖推迟到使用时。",
    tags: ["静态初始化顺序", "全局对象", "综合", "陷阱"],
  },
];

export default icoObjectLifetimeQuestions;
