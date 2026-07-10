import type { ReviewQuestion } from "./types";

export const jdgCollectionsMetaprogrammingQuestions: ReviewQuestion[] = [
  {
    id: "jdg-collections-metaprogramming-1",
    chapter: "jdg-collections-metaprogramming",
    level: 2,
    question: `Map 相比普通对象作字典有哪些优势？WeakMap 解决了什么问题？`,
    answer:
      `Map 优势：①任意类型可做键（对象/函数/原始类型都行），对象做键不会被强制转字符串；②保持插入顺序，遍历可预测；③有 size 属性直接知道键值对数；④无原型链干扰，不会遍历到继承属性；⑤频繁增删键值对性能更优。WeakMap 解决：给对象关联额外数据时不阻止该对象被 GC。普通对象/Map 持有键的强引用，即使外部不再引用该对象 Map 仍阻止回收导致内存泄漏。WeakMap 键是弱引用，键对象外部无引用时 GC 回收它及对应值，无需手动清理。用途：私有数据存储、缓存（对象销毁缓存自动清除）、DOM 节点关联数据。代价：不可遍历、无 size（随时可能被 GC 遍历无意义）。`,
    tags: ["Map", "WeakMap", "弱引用", "字典"],
  },
  {
    id: "jdg-collections-metaprogramming-2",
    chapter: "jdg-collections-metaprogramming",
    level: 3,
    question: `Proxy 和 Reflect 如何配合实现响应式？为什么 Vue3 用 Proxy 替代 Object.defineProperty？`,
    answer:
      `Proxy + Reflect 实现响应式：reactive(obj) 返回 new Proxy(obj, handler)，get trap 中调 track(target,key) 收集依赖（记录哪个副作用用了这个属性），再用 Reflect.get(target,key,receiver) 转发默认读取；set trap 中先 Reflect.set 转发默认设置，再 trigger(target,key) 通知依赖该属性的副作用重新执行。Reflect 作用是转发默认行为，第三参 receiver 保证继承链上正确的 this。Vue3 用 Proxy 替代 defineProperty 原因：①defineProperty 只能拦截已声明属性，新增/删除监听不到（Vue2 需 Vue.set/$delete 补救）；②defineProperty 无法监听数组索引和 length（Vue2 需重写数组方法）；③Proxy 拦截所有操作含新增删除和数组操作，是真正全代理；④Proxy 惰性（访问时才代理嵌套对象），defineProperty 需初始化递归遍历所有属性成本高。`,
    tags: ["Proxy", "Reflect", "响应式", "Vue3"],
  },
  {
    id: "jdg-collections-metaprogramming-3",
    chapter: "jdg-collections-metaprogramming",
    level: 3,
    question: `Set 的常见用途是什么？如何用 Set 实现并集、交集、差集？`,
    answer:
      `Set 是唯一值集合，最常见用途是去重：[...new Set([1,2,2,3])] 得 [1,2,3]。集合运算：①并集 new Set([...a, ...b])——合并两个 Set；②交集 new Set([...a].filter(x => b.has(x)))——a 中存在且 b 也有的；③差集 new Set([...a].filter(x => !b.has(x)))——a 中有但 b 没有的；④对称差集——并集减交集。Set 的 has 查找是 O(1)（基于哈希），比数组 includes 的 O(n) 快，大量存在性判断用 Set 更高效。Set 方法：add/has/delete/clear，可遍历（for...of 或展开），保持插入顺序。注意 Set 判断唯一性用 SameValueZero（类似 === 但 NaN 等于 NaN）。`,
    tags: ["Set", "去重", "集合运算"],
  },
  {
    id: "jdg-collections-metaprogramming-4",
    chapter: "jdg-collections-metaprogramming",
    level: 4,
    question: `为什么说普通对象当字典有硬伤？Proxy 的 trap 有哪些？Reflect 与 Proxy 的关系是什么？`,
    answer:
      `普通对象当字典的硬伤：①键只能是字符串/Symbol，对象做键被强制转成 '[object Object]'；②原型链属性干扰 for...in 和 Object.keys()；③无 size 属性；④键顺序不完全可靠（数字键按数值排序，字符串键按插入顺序）。需键值映射且键类型不确定或需有序时用 Map。Proxy 的 trap（拦截器）：get（读属性）、set（写属性）、has（in 操作符）、deleteProperty（delete）、ownKeys（Object.keys 等）、getOwnPropertyDescriptor、defineProperty、preventExtensions/isExtensible、apply（函数调用）、construct（new 调用）。Reflect 的方法与 Proxy trap 一一对应，在 trap 中用 Reflect 转发默认行为——手动操作 target 会丢失 receiver（继承链正确 this），Reflect.get/set 第三参 receiver 解决此问题。Reflect 也让「拦截后仍执行默认行为」的代码更规范。`,
    tags: ["Map", "Proxy", "Reflect", "元编程"],
  },
];
