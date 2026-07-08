import type { ReviewQuestion } from "./types";

/** Python内部机制 复习题 */
export const pyaPythonInternalsQuestions: ReviewQuestion[] = [
  {
    id: "pya-python-internals-1",
    chapter: "pya-python-internals",
    level: 1,
    question: "Python 对象的三要素是什么？",
    answer:
      "三要素：身份（identity，通过 id() 获取，CPython 中为内存地址）、类型（type，通过 type() 获取，决定对象支持的操作）、值（value，对象存储的实际数据）。三者构成了 Python「一切皆对象」的基本单元。",
    tags: ["对象模型", "三要素"],
  },
  {
    id: "pya-python-internals-2",
    chapter: "pya-python-internals",
    level: 2,
    question: "为什么引用计数无法处理循环引用？分代 GC 如何解决？",
    answer:
      "循环引用时（A.ref = B, B.ref = A），即使外部删除了对 A、B 的引用，两者互相指向使计数仍为 1，永不归零，导致泄漏。\n\n分代 GC 的解决方式：定期从根对象（全局变量、栈帧等）出发做可达性分析。如果一组互相引用的对象从根不可达，整个组都被判定为不可达并回收。分代策略（0/1/2 代）减少全量扫描开销——新对象更可能成为垃圾，老对象更可能存活，所以频繁扫描年轻代、偶尔扫描老代。",
    tags: ["引用计数", "分代GC", "循环引用"],
  },
  {
    id: "pya-python-internals-3",
    chapter: "pya-python-internals",
    level: 3,
    question: "给定一段 Python 代码性能不佳，如何用 dis 模块定位问题？",
    answer:
      "步骤：\n\n1. 用 `dis.dis(func)` 反汇编目标函数，查看字节码序列。\n2. 分析热点循环的字节码条数：如果循环体内有大量 LOAD_ATTR / LOAD_GLOBAL / CALL_FUNCTION，说明属性查找和函数调用开销大。\n3. 优化方向：局部变量用 LOAD_FAST（最快），全局变量用 LOAD_GLOBAL（慢），属性访问用 LOAD_ATTR（最慢）。把热点循环中的全局变量和属性缓存到局部变量可减少字节码条数。\n4. 对比优化前后的字节码，确认减少了多少条指令。\n\n这是「用字节码理解性能」的实战方法。",
    tags: ["dis", "字节码", "性能分析", "应用"],
  },
  {
    id: "pya-python-internals-4",
    chapter: "pya-python-internals",
    level: 4,
    question: "请解释 `type` 与 `object` 的「鸡生蛋」关系，以及为什么这是 Python 元编程的基石。",
    answer:
      "`type` 和 `object` 的关系是 Python 对象模型最精妙的设计：\n\n- `type` 是所有类型的类型（元类）：`type(int) is type`，`type(type) is type`（自身是自身的实例）。\n- `object` 是所有类的基类：`int.__bases__ == (object,)`，`type.__bases__ == (object,)`。\n- `type` 继承自 `object`（type 是 object 的子类），`object` 的类型是 `type`（object 是 type 的实例）。\n\n这看似循环（type 创建 object，object 是 type 的父类），但 CPython 在初始化时通过硬编码先创建这两个对象再建立互指关系。\n\n为什么是元编程基石：理解 `type` 既是类又是元类，就能用 `type(name, bases, dict)` 动态创建类，就能写自定义元类（继承 type）在类创建时拦截并修改类定义。这是所有 ORM（如 SQLAlchemy）、框架（如 Django Model）的底层机制。",
    tags: ["综合", "type", "object", "元编程", "元类"],
  },
];
