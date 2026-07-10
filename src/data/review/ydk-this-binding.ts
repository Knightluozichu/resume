import type { ReviewQuestion } from "./types";

export const ydkThisBindingQuestions: ReviewQuestion[] = [
  {
    id: "ydk-this-binding-1",
    chapter: "ydk-this-binding",
    level: 2,
    question: `this 绑定四规则是什么？按什么优先级判断？`,
    answer:
      `四规则按优先级从高到低：①new 绑定——new Foo() 构造调用，this 指向新创建的对象；②显式绑定——foo.call(obj)/apply(obj,[args])/bind(obj)，this 指定到 obj（bind 是硬绑定，返回的新函数 this 不可再改）；③隐式绑定——obj.foo() 对象方法调用，this 指向调用处的 obj；④默认绑定——foo() 独立调用，非严格模式 this 指向全局对象，严格模式是 undefined。判断方法：从调用点（函数被调用的那行代码）出发，按优先级匹配——先看是否 new，再看是否 call/apply/bind，再看是否有对象方法调用，最后才是独立调用。箭头函数是例外，不适用四规则。`,
    tags: ["this", "四规则", "优先级"],
  },
  {
    id: "ydk-this-binding-2",
    chapter: "ydk-this-binding",
    level: 3,
    question: `\`var f = obj.foo; f()\` 为什么 this 不再指向 obj？如何修复？`,
    answer:
      `this 由调用点决定。obj.foo() 的调用点是 obj.foo，属于隐式绑定，this 指向 obj。但 var f = obj.foo 只是把函数引用赋给 f，调用点变成 f()，是独立调用，属于默认绑定，this 指向全局（非严格）或 undefined（严格）。this 是否绑定看「调用时点号左边是谁」，f() 调用点没有点号左边的对象，所以丢失。修复三种：①硬绑定 var f = obj.foo.bind(obj) 后 f() 的 this 恒为 obj；②箭头包裹 setTimeout(() => obj.foo(), 0) 在箭头里显式以 obj 调用；③在方法内部用箭头函数捕获 this。回调场景（setTimeout、map、事件监听）同理，传递方法引用都会丢 this。`,
    tags: ["this", "隐式丢失", "bind"],
  },
  {
    id: "ydk-this-binding-3",
    chapter: "ydk-this-binding",
    level: 3,
    question: `箭头函数的 this 和普通函数有何不同？什么场景该用、什么场景不该用？`,
    answer:
      `普通函数有自己的 this，由调用点按四规则绑定，可被 call/apply/bind 改变。箭头函数没有自己的 this，继承定义处外层词法作用域的 this，且 call/apply/bind 无法改变它。该用的场景：回调里需要保留外层 this，如定时器、事件处理、Promise 链中访问外层对象——箭头函数省去 bind/self = this 的样板。不该用的场景：①对象方法，因为对象字面量不创建作用域，箭头方法里的 this 是外层（通常是全局/undefined）而非对象本身；②原型方法，同理 this 不会指向实例；③需要动态 this 的函数（如可被 call 复用的工具函数）。判断准则：需要「调用点决定 this」用普通函数，需要「固定外层 this」用箭头。`,
    tags: ["箭头函数", "this", "词法 this"],
  },
  {
    id: "ydk-this-binding-4",
    chapter: "ydk-this-binding",
    level: 4,
    question: `为什么说 this 是在「调用时」而非「定义时」绑定？这对写代码有什么实际影响？`,
    answer:
      `this 由调用点决定，同一个函数用不同方式调用 this 就不同——obj.foo() 时 this 是 obj，foo() 时是全局/undefined，foo.call(x) 时是 x，new foo() 时是新对象。这和函数定义在哪、定义在哪个对象里都无关。实际影响：①回调里 this 会丢失（方法引用传递后调用点变成独立调用），需用 bind/箭头修复；②同一个函数可被 call/apply 复用到不同对象（如 Array.prototype.forEach.call(arrayLike, fn)）；③构造函数靠 new 改变 this 指向新对象实现实例化；④不能用 this 做静态指向，需分析调用点。理解「调用时绑定」才能预判 this，而非凭直觉猜测。这是 this 最核心也最易错的特性。`,
    tags: ["this", "调用点", "调用时绑定"],
  },
];
