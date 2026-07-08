import type { ReviewQuestion } from "./types";

export const jdgClassesModulesQuestions: ReviewQuestion[] = [
  {
    id: "jdg-classes-modules-1",
    chapter: "jdg-classes-modules",
    level: 2,
    question: "class 的本质是什么？`class A { f() {} }` 中 f 存在哪里？实例如何找到 f？",
    answer:
      "class 是原型链继承的语法糖，底层仍是构造函数 + 原型方法。class A { f() {} } 中 f 存在 A.prototype 上（A.prototype.f），不在实例自身。new A() 创建的实例自身没有 f，但通过原型链查找：实例 → 实例.__proto__（即 A.prototype）→ 找到 f。所以所有实例共享一份方法（不重复创建），这也是原型链委托的本质。class 语法糖与传统构造函数的差异：class 声明不提升（TDZ 先声明后用）、内部默认严格模式、方法不可枚举（for...in 遍历不到）、必须用 new 调用（直接当函数调用报错）、extends 实现继承比手动改原型链更可靠。",
    tags: ["class", "原型链", "语法糖"],
  },
  {
    id: "jdg-classes-modules-2",
    chapter: "jdg-classes-modules",
    level: 3,
    question: "ESM 和 CommonJS 有什么本质区别？什么是实时绑定（live binding）？",
    answer:
      "本质区别：①ESM import/export 是静态声明（编译期确定依赖，支持 tree-shaking），CommonJS require 是动态执行（运行时加载，无法 tree-shaking）；②ESM 导出是实时绑定（导出方改变变量导入方可见），CommonJS 是值拷贝（快照，导出方后续改不影响已导入的值）；③ESM 顶层 await 可用，CommonJS 不可；④ESM 默认严格模式，CommonJS 不是；⑤ESM 模块单例（同模块只执行一次），CommonJS 也是但机制不同。live binding：counter.js 中 export let count=0; function inc(){count++}，main.js import 后调 inc()，count 变成 1——因为 ESM 导出的是变量的引用而非值的拷贝。CommonJS 中 require 后 count 仍是 0（值拷贝时的快照）。",
    tags: ["ESM", "CommonJS", "live binding", "tree-shaking"],
  },
  {
    id: "jdg-classes-modules-3",
    chapter: "jdg-classes-modules",
    level: 3,
    question: "动态 import() 解决了什么工程问题？与静态 import 有何区别？",
    answer:
      "动态 import()（const m = await import('./m.js')）在运行时加载模块返回 Promise，解决四个工程问题：①按需加载——只在用户用到某功能时才加载对应代码，减少首屏体积；②路由懒加载——SPA 中按路由分割代码块，访问路由时才加载；③条件加载——根据运行时条件决定是否加载（如按权限/特性检测）；④代码分割——配合打包工具自动拆分 chunk。与静态 import 区别：静态是声明（编译期确定、可 tree-shake、会被提升到模块顶部先执行），动态是表达式（运行时加载、返回 Promise 需 await、不 tree-shake）。代价：返回 Promise 需 async/await 处理，且无法静态分析依赖。是现代前端性能优化（减少首屏体积）的核心手段。",
    tags: ["动态import", "代码分割", "按需加载"],
  },
  {
    id: "jdg-classes-modules-4",
    chapter: "jdg-classes-modules",
    level: 4,
    question: "私有字段 #x 与传统闭包/约定下划线实现私有有什么区别？super 在继承中起什么作用？",
    answer:
      "#x 是 ES2022 真私有字段：①真私有——不在原型上，外部、子类都访问不到，连反射都拿不到；②实例自身独有——每个实例有自己的 #x 槽位；③编译期检查——外部访问 #x 直接语法错误。对比传统方案：闭包私有（constructor 里 let 声明，方法闭包访问）——真私有但方法不能放原型（每次构造创建新方法），内存浪费；约定下划线 _x——非真私有，只是约定，外部仍可访问。super 在继承中两个作用：①super() 在子类 constructor 中调用父类构造函数（必须先调 super 再用 this，否则 ReferenceError）；②super.method() 调用父类方法（沿原型链向上查找父类的 method）。extends + super 让继承比手动改原型链（Child.prototype = Object.create(Parent.prototype)）更可靠简洁。",
    tags: ["私有字段", "super", "继承", "class"],
  },
];
