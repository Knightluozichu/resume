import type { ReviewQuestion } from "./types";

export const jpgPrototypeChainQuestions: ReviewQuestion[] = [
  {
    id: "jpg-prototype-chain-1",
    chapter: "jpg-prototype-chain",
    level: 2,
    question: "prototype、__proto__、constructor 三者是什么关系？",
    answer:
      "三者构成原型三角：① prototype 是函数独有的属性，指向「由这个函数 new 出来的实例的共享原型对象」；② __proto__ 是所有对象都有的内部指针，指向「我自己的原型对象」（已标准化为 Object.getPrototypeOf）；③ constructor 是原型对象的属性，指回构造函数。核心关系：实例.__proto__ === 构造函数.prototype，构造函数.prototype.constructor === 构造函数。函数本身也是对象，所以函数既有 prototype（指向其作为构造函数的原型），也有 __proto__（指向 Function.prototype）。普通对象没有 prototype 只有 __proto__。",
    tags: ["prototype", "__proto__", "constructor", "原型三角"],
  },
  {
    id: "jpg-prototype-chain-2",
    chapter: "jpg-prototype-chain",
    level: 2,
    question: "描述 new Person('x') 后，实例到 null 的完整原型链。",
    answer:
      "实例 p 的 __proto__ 指向 Person.prototype（new 时第二步绑定）。Person.prototype 本身是普通对象，它的 __proto__ 指向 Object.prototype（因为 Person.prototype 由 Object 构造）。Object.prototype 的 __proto__ 指向 null（原型链终点）。完整链：p → Person.prototype → Object.prototype → null。属性查找沿这条链：先查 p 自身，再查 Person.prototype（如 say 方法），再查 Object.prototype（如 toString/hasOwnProperty），到 null 仍未找到则返回 undefined。这就是为什么所有对象都有 toString——它在 Object.prototype 上，所有对象通过原型链都能访问。",
    tags: ["原型链", "属性查找", "Object.prototype", "null"],
  },
  {
    id: "jpg-prototype-chain-3",
    chapter: "jpg-prototype-chain",
    level: 3,
    question: "原型链继承有什么缺陷？组合继承和寄生组合继承各解决了什么？",
    answer:
      "原型链继承（Sub.prototype = new Super()）缺陷：① 引用属性共享污染——父类的 colors 数组挂在原型上，所有子实例共享，一个 push 全乱；② 无法向父构造函数传参。组合继承（原型链 + Super.call(this)）解决了共享与传参，但调用两次父构造函数：一次在 Sub.prototype = new Super()（原型链），一次在 Super.call(this)（实例），导致原型上有冗余的实例属性。寄生组合继承用 Object.create(Super.prototype) 复制父原型建立链（不调父构造函数），再用 call 继承实例属性，只调一次，无共享污染无冗余——是最优方案，也是 ES6 class extends 的底层。",
    tags: ["原型链继承", "组合继承", "寄生组合继承", "继承演进"],
  },
  {
    id: "jpg-prototype-chain-4",
    chapter: "jpg-prototype-chain",
    level: 4,
    question: "__proto__ 和 prototype 是一回事吗？混淆会导致什么错误？",
    answer:
      "不是一回事。prototype 是函数独有的属性，指向「将来我的实例们共享的原型对象」——定义「我的实例继承什么」。__proto__ 是所有对象都有的内部指针，指向「我自己的原型对象」——定义「我从哪继承」。关系：实例.__proto__ === 构造函数.prototype。混淆两者的典型错误：① 误以为实例有 prototype（实例只有 __proto__）；② 误以为改 obj.__proto__ 等于改构造函数.prototype（实际只改这一实例的链，不影响其他实例）；③ 误以为 Person.__proto__ 指向 Person.prototype（实际指向 Function.prototype）。正确理解：prototype 是「给实例用的」，__proto__ 是「给自己找原型用的」。",
    tags: ["__proto__", "prototype", "区别", "原型链"],
  },
];
