/** 复习题库 · 函数语义（ico-functions-semantics）。《深度探索 C++ 对象模型》第 4 章改编。 */

import type { ReviewQuestion } from "./types";

export const icoFunctionsSemanticsQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "ico-fs-1",
    chapter: "ico-functions-semantics",
    level: 1,
    question: `成员函数调用 \`obj.f(a)\` 在编译器内部被改写成什么样？this 指针是什么？`,
    answer:
      `被改写为 \`Foo::f(&obj, a)\`——成员函数被当成普通函数，额外把对象地址作为隐式首参传入，这个参数就是 this 指针。this 始终指向调用该函数的对象实例。静态成员函数没有 this，因为它不与具体对象绑定。`,
    tags: ["this", "成员函数改写"],
  },

  // ── L2 理解：为什么 / 机制 ──
  {
    id: "ico-fs-2",
    chapter: "ico-functions-semantics",
    level: 2,
    question: `非虚、虚、静态成员函数在「如何被找到」和「何时决议」上有什么区别？`,
    answer:
      `非虚成员函数：编译期决议，调用点直接绑定到 \`Foo::f\`，经 this 直调，等同普通函数调用。虚成员函数：运行期决议，调用点先取对象的 vptr、查 vtable 对应槽、再间接调用，多一次查表间接。静态成员函数：编译期决议，无 this 注入，与普通函数完全等价，不能访问非静成员。三者代码全类共享，对象里都不存函数指针。`,
    tags: ["非虚", "虚", "静态", "决议时机"],
  },

  // ── L3 应用：读代码 / 推断 ──
  {
    id: "ico-fs-3",
    chapter: "ico-functions-semantics",
    level: 3,
    question:
      `下面调用哪个会走虚表间接？① \`obj.g(x)\` 其中 g 非虚；② \`ptr->h()\` 其中 h 是虚函数、ptr 是基类指针；③ \`Foo::s()\` 静态函数；④ \`obj.h()\` 其中 h 是虚函数但 obj 是值类型不是指针/引用。`,
    answer:
      `只有 ② 走虚表间接。① 非虚，编译期直调。② 经基类指针调虚函数，运行期经 vptr 查表——这是真正的多态调用。③ 静态函数，无 this 无虚表。④ 虽然 h 是虚函数，但 obj 是值类型（非指针/引用），编译器已知确切静态类型，会直接绑定为该类的版本，不查虚表——多态只在指针/引用调用时才生效。`,
    tags: ["虚调用", "多态条件", "读代码"],
  },

  // ── L4 综合：陷阱 / 全流程 ──
  {
    id: "ico-fs-4",
    chapter: "ico-functions-semantics",
    level: 4,
    question:
      `「同一个虚函数，用对象值调用 vs 用指针调用，行为可能不同」——这话对吗？结合内联与多态谈谈。`,
    answer:
      `对。用对象值调用 \`obj.h()\` 时，编译器掌握确切类型，可能直接绑定甚至内联展开该虚函数（不查虚表）；用指针/引用 \`ptr->h()\` 时才走虚表、运行期决议，无法内联。所以同一个虚函数，值调用可能被优化掉间接开销，而指针调用保留多态。更深一层：虚函数一旦通过指针/引用多态调用就基本无法内联，频繁调用的小虚函数会显著放大开销——这是「能用非虚就别用虚」「热点路径避免虚调用」的底层原因。`,
    tags: ["虚函数", "内联", "综合", "陷阱"],
  },
];

export default icoFunctionsSemanticsQuestions;
