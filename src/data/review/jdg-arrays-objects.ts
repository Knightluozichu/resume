import type { ReviewQuestion } from "./types";

export const jdgArraysObjectsQuestions: ReviewQuestion[] = [
  {
    id: "jdg-arrays-objects-1",
    chapter: "jdg-arrays-objects",
    level: 2,
    question: `数组的纯函数方法和副作用方法分别有哪些？为什么区分它们很重要？`,
    answer:
      `纯函数方法返回新数组/新值不改原数组：map/filter/reduce/slice/concat/flat/flatMap/find/findIndex/some/every/includes/indexOf/keys/values/entries/join。副作用方法直接改原数组：push/pop/shift/unshift/splice/sort/reverse/fill/copyWithin（forEach 无返回值但回调可改原数组）。区分重要的原因：纯函数方法链式调用安全（每步都基于上一步返回的新数组，原数据不变），副作用方法会意外改变原数据导致难以追踪的 bug。需保留原数组时用纯函数或先拷贝 [...arr].sort()。注意 sort/reverse 是副作用方法——它们改原数组并返回同数组的引用，不是新数组。`,
    tags: ["数组方法", "纯函数", "副作用"],
  },
  {
    id: "jdg-arrays-objects-2",
    chapter: "jdg-arrays-objects",
    level: 3,
    question: `为什么 \`[...obj]\` 展开后修改嵌套对象会影响原对象？如何实现深拷贝？`,
    answer:
      `展开运算符 ... 做浅拷贝——只复制第一层属性。原始类型属性复制值副本，引用类型属性（嵌套对象/数组）复制引用地址。所以 const copy = {...obj}; copy.nested.b = 2; 中 copy.nested 和 obj.nested 指向堆中同一对象，改 copy.nested.b 就是改共享对象，obj.nested.b 也变。深拷贝方法：①structuredClone(obj)——现代浏览器原生 API，支持循环引用和大多数类型，推荐；②JSON.parse(JSON.stringify(obj))——简单但不支持函数/undefined/Symbol/Date（变字符串）/循环引用（报错）；③递归手写或 lodash _.cloneDeep。注意 structuredClone 不支持函数和 DOM 节点。`,
    tags: ["展开", "浅拷贝", "深拷贝", "structuredClone"],
  },
  {
    id: "jdg-arrays-objects-3",
    chapter: "jdg-arrays-objects",
    level: 3,
    question: `\`[10, 2, 1].sort()\` 的结果是什么？为什么？如何正确排序？`,
    answer:
      `结果是 [1, 10, 2] 而非 [1, 2, 10]。因为 Array.prototype.sort() 默认把元素转成字符串后按 Unicode 码点顺序排序。'10' 第一字符 '1' 码点 49，'2' 是 50，'1' 是 49，字符串比较逐字符：'1' < '10'（第一位都是 '1'，'10' 更长但比较时 '1' 视为 '1' 的前缀，'1' < '10'），'10' < '2'（第一位 '1' < '2'）。正确排序数字需传比较函数：arr.sort((a, b) => a - b) 升序（返回负数 a 在前），arr.sort((a, b) => b - a) 降序。对象数组排序：users.sort((a, b) => a.age - b.age)。sort 是副作用方法改原数组，需保留原数组先 [...arr].sort()。`,
    tags: ["sort", "排序", "Unicode"],
  },
  {
    id: "jdg-arrays-objects-4",
    chapter: "jdg-arrays-objects",
    level: 4,
    question: `reduce 的工作原理是什么？为什么必须给初始值？解构赋值有哪些常见模式？`,
    answer:
      `reduce 是通用归约：arr.reduce((acc, x) => 新acc, 初始值)，从左到右遍历数组，每步用回调把当前元素 x 归并到累加器 acc，最终返回 acc。如求和 [1,2,3].reduce((s,n)=>s+n, 0) = 6。必须给初始值的原因：无初始值时 reduce 把数组第一个元素当初始 acc，从第二个开始遍历——空数组无初始值会抛 TypeError（没有元素可当初始 acc）。给初始值还能保证返回类型一致（初始值决定 acc 类型）。解构常见模式：①重命名 const {b: y} = obj（b 赋给 y）；②默认值 const {a=1} = obj；③跳过 const [x,,z] = arr；④嵌套 const {a:{b}} = obj；⑤函数参数解构 function f({name, age=0}={}) {}。for...of 遍历值，for...in 遍历键（含原型链慎用）。`,
    tags: ["reduce", "解构", "归约"],
  },
];
