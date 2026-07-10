import type { ReviewQuestion } from "./types";

export const ydkPrototypesQuestions: ReviewQuestion[] = [
  {
    id: "ydk-prototypes-1",
    chapter: "ydk-prototypes",
    level: 2,
    question: `[[Prototype]] 是什么？原型链查找在哪里终结？`,
    answer:
      `[[Prototype]] 是每个对象内部的链接，指向其原型对象。访问属性时若自身没有，沿 [[Prototype]] 逐层向上查找，直到命中或到达链顶 null。原型链的终点是 Object.prototype.__proto__ === null——查找到这里停止，再往上就是 null，返回 undefined（不报错）。__proto__（已 deprecated）是访问 [[Prototype]] 的历史遗留方式，现代代码用 Object.getPrototypeOf(obj) 读取、Object.create(proto) 创建指定原型的对象。直接改 __proto__ 或 Foo.prototype 会让所有已存在实例的查找路径变化，非常危险且影响性能（破坏引擎隐藏类优化）。`,
    tags: ["[[Prototype]]", "原型链", "null"],
  },
  {
    id: "ydk-prototypes-2",
    chapter: "ydk-prototypes",
    level: 3,
    question: `读取属性和写入属性在原型链上的行为有何不同？为什么？`,
    answer:
      `读取属性沿原型链向上查找：自身没有就找 __proto__（即 [[Prototype]]），逐层向上直到命中或到达 Object.prototype.__proto__ = null，找不到返回 undefined（不报错）。写入属性则不查原型链，直接在当前对象上创建/修改 own 属性——若原型链上有同名属性，会在当前对象新建一个遮蔽它，不会修改原型上的原属性。这样设计的原因：原型是共享的，若写入也沿链查找修改，一个实例改属性会影响所有实例，破坏封装。读写不对称保证实例能自定义属性而不污染共享原型。若确实要改原型属性，需显式 Foo.prototype.x = ... 而非 obj.x = ...。`,
    tags: ["属性查找", "属性遮蔽", "读写不对称"],
  },
  {
    id: "ydk-prototypes-3",
    chapter: "ydk-prototypes",
    level: 3,
    question: `原型链继承有什么缺陷？寄生组合继承如何解决？`,
    answer:
      `原型链继承 Sub.prototype = new Super() 有两个缺陷：①父类的引用类型属性（如数组）挂在 Super.prototype 上被所有实例共享，一个实例 push 会影响全部；②无法向父构造函数传参（new Super() 时没有实例参数）。组合继承（构造函数 call + 原型链）解决共享但调了两次父构造函数（call 一次、new Super() 一次），实例属性冗余。寄生组合继承：Dog.prototype = Object.create(Animal.prototype) 只复制原型（方法委托，不调父构造函数、不产生实例属性）+ 构造函数 Animal.call(this, name) 借实例属性（可传参、只调一次）。它消除了共享、可传参、只调一次父构造函数，是最优解。`,
    tags: ["原型链继承", "寄生组合继承", "缺陷"],
  },
  {
    id: "ydk-prototypes-4",
    chapter: "ydk-prototypes",
    level: 4,
    question: `为什么说 JavaScript 的 class 不是真正的类？行为委托心智有何优势？`,
    answer:
      `class 只是原型机制的语法糖。class Foo {} 编译后仍是函数 + Foo.prototype，extends 底层是寄生组合继承（Object.create + super 调用），instanceof 检查的是原型链上是否出现某构造函数的 prototype。心智上把 class 当类用没问题，但遇到「改了原型所有实例都变」「实例没有 own 属性却能调方法」「super 到底调的谁」必须回到原型链委托的真相。YDKJS 提倡行为委托心智：与其模拟类的继承层级，不如直接设计对象间的委托关系（Object.create 关联对象），代码更扁平、更符合 JS 真实机制——JS 没有类，只有对象间的委托链。理解行为委托比套用类继承心智更接近语言本质。`,
    tags: ["class", "语法糖", "行为委托"],
  },
];
