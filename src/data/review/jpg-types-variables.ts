import type { ReviewQuestion } from "./types";

export const jpgTypesVariablesQuestions: ReviewQuestion[] = [
  {
    id: "jpg-types-variables-1",
    chapter: "jpg-types-variables",
    level: 2,
    question: `原始类型和引用类型在赋值和传参时有什么本质区别？`,
    answer:
      `原始类型（Undefined/Null/Boolean/Number/String/Symbol/BigInt）按值赋值：复制时创建独立的值副本，修改副本不影响原变量。引用类型（Object 及衍生）按「引用的值」赋值：变量存的是堆中对象的地址，复制时拷贝地址，两个变量指向同一堆对象，任一方改属性另一方可见。函数传参同理——传原始类型拷贝值，传对象拷贝地址（函数内改对象属性影响外部，但重新赋值参数不影响外部）。JS 没有真正的按引用传递，只有按值传递，只是对象的「值」是地址。`,
    tags: ["原始类型", "引用类型", "值传递"],
  },
  {
    id: "jpg-types-variables-2",
    chapter: "jpg-types-variables",
    level: 2,
    question: `什么是暂时性死区（TDZ）？它和 var 的提升有什么区别？`,
    answer:
      `暂时性死区（Temporal Dead Zone）指 let/const 声明的变量从作用域开始到声明语句执行之间的区域，在此区域访问变量会抛 ReferenceError，而非像 var 那样返回 undefined。var 的提升把声明提到作用域顶部并初始化为 undefined，所以提升后可访问（值为 undefined）；let/const 也会提升，但不会被初始化，处于 TDZ 中不可访问。TDZ 强制「先声明后使用」，避免 var 时代「先用后声明得 undefined」的隐蔽 bug。这也使 typeof 不再绝对安全——typeof 一个 TDZ 内的变量也会报错。`,
    tags: ["TDZ", "let", "const", "变量提升"],
  },
  {
    id: "jpg-types-variables-3",
    chapter: "jpg-types-variables",
    level: 3,
    question: `为什么 typeof null === 'object'？如何准确检测 null 和数组？`,
    answer:
      `typeof null === 'object' 是历史遗留 bug：JS 早期实现中，值在底层用低位标签表示类型，对象的标签是 000，而 null 在多数平台被表示为全 0 指针，低位正好是 000，故被误判为 object。修复会破坏存量代码，故保留至今。准确检测：null 用 \`value === null\`（严格相等）；数组用 \`Array.isArray(value)\`（最可靠，跨 iframe）；通用对象类型用 Object.prototype.toString.call(value).slice(8,-1)。instanceof 沿原型链判断，但跨 iframe/多全局环境会失效，故数组首选 Array.isArray。`,
    tags: ["typeof", "null", "Array.isArray", "类型检测"],
  },
  {
    id: "jpg-types-variables-4",
    chapter: "jpg-types-variables",
    level: 4,
    question: `const 声明的对象能否修改内部属性？为什么？如何真正冻结？`,
    answer:
      `能修改。const 冻结的是「变量到值的绑定」（binding），不是「值本身」。对 const obj = {x:1}，不能写 obj = {}（重新绑定会报 TypeError），但 obj.x = 2 完全合法，因为对象内部属性没被 const 保护。要真正冻结对象内容，用 Object.freeze(obj)，它会阻止添加/删除/修改属性，且让所有属性变为不可配置不可写。但 Object.freeze 是浅冻结——嵌套对象的属性仍可改，需递归 freeze 或用 structuredClone 后冻结。工程上默认用 const 表达「引用不重新指向」，需重赋值才用 let，var 一律禁用。`,
    tags: ["const", "Object.freeze", "绑定", "深度冻结"],
  },
];
