import type { ReviewQuestion } from "./types";

export const jdgFunctionsClosuresQuestions: ReviewQuestion[] = [
  {
    id: "jdg-functions-closures-1",
    chapter: "jdg-functions-closures",
    level: 2,
    question: "this 绑定四规则是什么？优先级如何？箭头函数的 this 有什么例外？",
    answer:
      "四规则：①默认绑定——独立调用，严格模式 this 为 undefined，非严格为 window；②隐式绑定——obj.method()，this 指向 obj；③显式绑定——call/apply/bind 指定 this；④new 绑定——构造调用，this 指向新创建的对象。优先级：new > bind > apply/call > 隐式 > 默认。规则由调用点决定，与定义处无关。箭头函数例外：没有自身 this，继承外层词法作用域的 this，且 call/apply/bind 无法改变其 this。箭头函数也没有 arguments 对象、不能作构造函数（不能 new）、没有 prototype。",
    tags: ["this", "绑定规则", "箭头函数"],
  },
  {
    id: "jdg-functions-closures-2",
    chapter: "jdg-functions-closures",
    level: 3,
    question: "`setTimeout(obj.greet, 0)` 中 this 为什么丢失？如何修复？",
    answer:
      "obj.greet 作为回调传给 setTimeout 时，传递的是函数本身的引用而非「obj.greet 这个方法」。setTimeout 未来调用它时是独立调用（无 obj. 前缀），落回默认绑定，this 变成 undefined（严格）或 window（非严格）。这叫隐式丢失。三种修复：①bind 永久绑定：setTimeout(obj.greet.bind(obj), 0)，返回 this 固定为 obj 的新函数；②箭头包裹保持隐式绑定：setTimeout(() => obj.greet(), 0)，箭头函数里 obj.greet() 仍是隐式调用 this 指向 obj；③老式闭包捕获：const self = this; setTimeout(function(){ self.greet(); }, 0)。现代代码推荐前两种。",
    tags: ["this", "隐式丢失", "bind", "回调"],
  },
  {
    id: "jdg-functions-closures-3",
    chapter: "jdg-functions-closures",
    level: 3,
    question: "闭包是什么？为什么循环中 var 的 setTimeout 打印相同值而 let 不会？",
    answer:
      "闭包是函数与其定义时词法环境的组合，让函数在外层作用域返回后仍能访问外层变量。循环中 var 的问题：var 是函数作用域，整个循环只有一个 i，每次迭代共享。setTimeout 回调是闭包，捕获的是这个共享 i 的引用。回调在循环结束后（i 已变成 3）执行，读到的都是 3。let 的区别：let 是块作用域，每次循环迭代创建独立的 i，回调闭包捕获各自迭代轮次的 i（0/1/2），故打印 0 1 2。本质：var 共享一个变量（闭包都引用同一个），let 每轮新建独立变量（闭包各引用各的）。不用 let 也可用 IIFE 立即执行函数手动创建独立作用域隔离每轮 i。",
    tags: ["闭包", "var", "let", "循环"],
  },
  {
    id: "jdg-functions-closures-4",
    chapter: "jdg-functions-closures",
    level: 4,
    question: "箭头函数和普通函数有什么本质区别？什么时候该用箭头函数，什么时候不该？",
    answer:
      "本质区别：箭头函数没有自身 this（继承外层词法 this）、没有 arguments 对象、不能作构造函数（不能 new）、没有 prototype。这些差异决定适用场景。该用箭头函数：需要外层 this 的场景——回调（setTimeout/事件处理中访问实例 this）、定时器、Promise 链中保持 this、Vue/React 组件方法中访问组件实例。不该用：需要自身 this 指向调用对象的场景——对象方法（{ greet: () => this } 的 this 不指向对象而是外层，常见误用）、原型方法、构造函数。原则：需要 this 指向调用对象时用普通函数/方法简写，需要继承外层 this 时用箭头函数。call/apply/bind 无法改变箭头函数 this，因为它根本没有自身 this。",
    tags: ["箭头函数", "this", "适用场景"],
  },
];
