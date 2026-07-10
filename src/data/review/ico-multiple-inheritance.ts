/** 复习题库 · 多重继承（ico-multiple-inheritance）。《深度探索 C++ 对象模型》多重继承章改编。 */

import type { ReviewQuestion } from "./types";

export const icoMultipleInheritanceQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "ico-mi-1",
    chapter: "ico-multiple-inheritance",
    level: 1,
    question: `多重继承下，派生对象在内存里长什么样？为什么把派生指针转成不同基类指针时地址会变？`,
    answer:
      `派生对象由多个基类子对象顺序拼接而成，每个有虚函数的基类子对象各带自己的 vptr，最后接派生类自己的成员。把派生指针转成「主基类」指针通常地址不变；转成「次基类」指针时，指针要偏移到对应的基类子对象起始处，所以地址会变（this 指针调整）。这样每个基类指针都指向自己那段子对象，vptr 才能正确查到属于该接口的虚表。`,
    tags: ["多重继承布局", "this 调整"],
  },

  // ── L2 理解：为什么 / 机制 ──
  {
    id: "ico-mi-2",
    chapter: "ico-multiple-inheritance",
    level: 2,
    question: `菱形继承（B1、B2 都继承自 Base，D 继承 B1、B2）不虚继承时会有什么问题？虚继承如何解决？`,
    answer:
      `不虚继承时，D 里同时含 B1 的 Base 子对象和 B2 的 Base 子对象——Base 成员存了两份，访问 Base 成员会产生二义性（编译器不知道走 B1 还是 B2 那份）。虚继承让 B1、B2 以 \`virtual\` 方式继承 Base，编译器把共享的 Base 子对象挪到对象末尾、只存一份，B1/B2 子对象里各放一个 vbptr（虚基指针）指向虚基表，虚基表记录「从这段到共享 Base 的偏移」。访问 Base 成员时经 vbptr 间接定位到唯一的那份 Base，二义性消除。`,
    tags: ["菱形继承", "虚继承", "vbptr"],
  },

  // ── L3 应用：读代码 / 排错 ──
  {
    id: "ico-mi-3",
    chapter: "ico-multiple-inheritance",
    level: 3,
    question:
      `\`D* d = new D; B2* p2 = d;\` 之后 \`d\` 和 \`p2\` 的数值相等吗？删 \`delete d\` 安全吗（假设析构都 virtual）？`,
    answer:
      `\`d\` 和 \`p2\` 的数值可能**不相等**——p2 是 d 加上偏移到 B2 子对象起始处的结果，这正是多重继承下 this 指针调整。\`delete d\` 安全（前提是析构链虚析构完整）：delete 通过 d 直接调用 D 的析构链，编译器知道 d 的确切类型是 D*，能正确释放整个对象。危险的是 \`delete p2\`——若析构虚，会经 vptr 走到 D 析构但起点是 B2 子对象，编译器会补回偏移调整，仍安全；若析构非虚则只析构 B2 部分，未定义行为。所以多态基类析构必须虚。`,
    tags: ["指针偏移", "虚析构", "排错"],
  },

  // ── L4 综合：陷阱 / 全流程 ──
  {
    id: "ico-mi-4",
    chapter: "ico-multiple-inheritance",
    level: 4,
    question:
      `从对象模型角度，多重继承带来了哪些额外开销与复杂度？据此谈谈「该不该用多重继承」。`,
    answer:
      `开销与复杂度：① 对象更大——每个有虚函数的基类子对象各一个 vptr；② this 指针调整——基类指针间转换要偏移，调用更复杂、略慢；③ 虚继承引入 vbptr 和间接寻址，访问共享基类成员多一次间接；④ 菱形继承的二义性、构造析构顺序更绕；⑤ sizeof、布局更难预测。据此：能用单继承+组合表达的就别上多重继承；确实需要「一个对象实现多个接口」（如 Java interface 那种纯抽象基类）时多重继承合理，且尽量让接口无数据成员、减少布局复杂度；避免数据型多重继承与深层菱形。多重继承是工具不是禁忌，但每次用都要为它的开销和可读性买单。`,
    tags: ["多重继承开销", "设计取舍", "综合"],
  },
];

export default icoMultipleInheritanceQuestions;
