import type { ReviewQuestion } from "./types";

export const jpgObjectsOopQuestions: ReviewQuestion[] = [
  {
    id: "jpg-objects-oop-1",
    chapter: "jpg-objects-oop",
    level: 2,
    question: "属性描述符有哪四个特征？字面量定义与 defineProperty 定义的默认值有何不同？",
    answer:
      "数据属性描述符四特征：value（值）、writable（可否改写）、enumerable（可否 for-in 枚举）、configurable（可否删除/改特征）。字面量 const o={x:1} 定义的属性四特征默认全 true。用 Object.defineProperty(obj,'y',{value:2}) 定义的属性，默认四特征全 false——这是常见坑：y 不可写、不可枚举、不可删除、不可再改特征。访问器属性用 get/set 替代 value/writable。configurable:false 后属性不可删除且不可再改特征（单向不可逆），enumerable:false 让属性在 for-in/Object.keys 中隐藏。",
    tags: ["属性描述符", "Object.defineProperty", "数据属性"],
  },
  {
    id: "jpg-objects-oop-2",
    chapter: "jpg-objects-oop",
    level: 3,
    question: "new 操作符具体做了哪四件事？构造函数 return 一个对象会怎样？",
    answer:
      "new 做四步：① 在堆中创建一个新空对象；② 将新对象的 [[Prototype]]（__proto__）指向构造函数的 prototype 属性，建立原型链；③ 以新对象为 this 执行构造函数，绑定实例属性；④ 如果构造函数显式 return 一个对象，则 new 的结果是该返回对象（而非新对象）；如果 return 原始值或无 return，则返回第①步创建的新对象。注意：若构造函数 return 一个对象，原型链绑定会失效——new 出来的实例的 __proto__ 不再指向构造函数的 prototype，instanceof 会返回 false。这是「构造函数劫持」的原理，也是滥用 return 导致 instanceof 失效的坑。",
    tags: ["new", "构造函数", "原型链", "this 绑定"],
  },
  {
    id: "jpg-objects-oop-3",
    chapter: "jpg-objects-oop",
    level: 3,
    question: "为什么构造函数 + 原型的组合是创建对象的标准范式？",
    answer:
      "因为属性和方法有不同需求。属性（如 name、age）每个实例不同，必须各自拥有，放进构造函数随 this 绑定，每次 new 各自拷贝。方法（如 say）逻辑相同、所有实例共享，若放进构造函数每个实例都创建一份函数对象，浪费内存且 === 比较为 false。放进原型则所有实例通过原型链共享同一份方法引用，省内存且 === 为 true。所以标准范式：实例属性进构造函数，方法进原型。class 语法的 constructor 对应构造函数部分，方法定义自动挂原型，本质就是这个组合范式。这也解释了为什么不要在构造函数里定义方法——会被每个实例复制。",
    tags: ["构造函数", "原型", "组合范式", "内存"],
  },
  {
    id: "jpg-objects-oop-4",
    chapter: "jpg-objects-oop",
    level: 4,
    question: "class 是新的面向对象机制吗？它和构造函数有什么关系？",
    answer:
      "class 不是新机制，是构造函数 + 原型组合的语法糖，底层完全一样。class Person {} 编译后 typeof Person === 'function'，方法仍挂在 Person.prototype 上，实例通过 __proto__ 共享。class 提供的 extends/super 在底层就是寄生组合继承。它解决的是工程问题：① 构造函数写法像普通函数易被误调用（class 必须用 new，直接调用报错）；② 继承写法繁琐（原型链 + call + 修 constructor，class 用 extends 一行）；③ 语法更接近传统 OOP 语言，降低心智负担。但原型机制、this 绑定、方法共享等底层问题在 class 里同样存在，只是语法更清晰。理解原型链仍是用好 class 的前提。",
    tags: ["class", "语法糖", "构造函数", "原型"],
  },
];
