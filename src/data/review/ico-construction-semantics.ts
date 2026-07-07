/** 复习题库 · 构造语义（ico-construction-semantics）。《深度探索 C++ 对象模型》第 2 章改编。 */

import type { ReviewQuestion } from "./types";

export const icoConstructionSemanticsQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "ico-cs-1",
    chapter: "ico-construction-semantics",
    level: 1,
    question: "派生类对象构造时，编译器隐式展开的五个步骤依次是什么？",
    answer:
      "① 设置 vptr 指向基类虚表；② 调用基类构造函数；③ 按声明顺序依次构造成员变量；④ 执行派生类构造函数体；⑤ 重设 vptr 指向派生类虚表。其中 vptr 被设置两次——先指向基类虚表，构造体执行完再改指向派生类虚表。",
    tags: ["构造序列", "五步"],
  },

  // ── L2 理解：为什么 / 机制 ──
  {
    id: "ico-cs-2",
    chapter: "ico-construction-semantics",
    level: 2,
    question: "为什么在基类构造函数里调用虚函数，调用的是基类版本而不是派生类覆写？",
    answer:
      "因为构造派生类对象时，先执行基类构造函数（步骤 ②），而此时 vptr 还指向基类虚表（步骤 ① 设的），派生类虚表要到构造体执行完（步骤 ⑤）才会被设置。所以在基类构造函数运行期间，经 vptr 查到的是基类版本的虚函数——派生部分尚未成型，多态还没生效。这是 C++ 为安全做的设计：不会去碰还没构造好的派生部分。",
    tags: ["构造期虚函数", "vptr"],
  },

  // ── L3 应用：读代码 / 排错 ──
  {
    id: "ico-cs-3",
    chapter: "ico-construction-semantics",
    level: 3,
    question:
      "构造列表写成 `Derived() : m2(v), m1(v) {}`，成员 m1、m2 谁先构造？为什么？",
    answer:
      "m1 先构造。成员变量的初始化顺序由它们在类中的**声明顺序**决定，与构造初始化列表里写的顺序无关。列表里写 `m2(v), m1(v)` 只是给值，编译器仍按声明顺序（假设是 m1 在前 m2 在后）先构造 m1 再构造 m2。如果 m2 的初始化依赖 m1，而在列表里把 m2 写在前面，会埋下「依赖还没构造的成员」的隐患，不少编译器会给出警告。",
    tags: ["成员初始化顺序", "排错", "声明顺序"],
  },

  // ── L4 综合：陷阱 / 全流程 ──
  {
    id: "ico-cs-4",
    chapter: "ico-construction-semantics",
    level: 4,
    question:
      "析构期虚函数行为如何？如果把基类析构函数设为非虚、又 delete 一个指向派生对象的基类指针，会发生什么？结合构造序列的对称性说明。",
    answer:
      "析构严格反向于构造：先执行派生类析构体 → 成员逆序析构 → 基类析构；析构派生部分时 vptr 已被改回指向基类虚表，所以析构期调虚函数同样退化。若基类析构非虚，`delete basePtr` 时编译期按静态类型（基类）绑定，只调用基类析构，派生类析构不被调用——派生部分资源泄漏，是未定义行为。这正是「多态基类的析构函数必须声明为 virtual」的根因：只有虚析构才会经 vptr 走到派生类析构，完成对称的反向析构链。",
    tags: ["析构期", "虚析构", "综合"],
  },
];

export default icoConstructionSemanticsQuestions;
