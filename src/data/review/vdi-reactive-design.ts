import type { ReviewQuestion } from "./types";

export const vdiReactiveDesignQuestions: ReviewQuestion[] = [
  {
    id: "vdi-reactive-design-1",
    chapter: "vdi-reactive-design",
    level: 2,
    question: `简述 Vue 响应式的 track/trigger 机制。`,
    answer:
      `Vue 用 Proxy 代理对象。读取属性时（get 拦截）执行 track：把当前正在执行的 effect（全局变量 activeEffect）记录到「对象 → 属性 → Dep(Set&lt;effect&gt;)」的映射 targetMap 里。写入属性时（set 拦截）执行 trigger：从 targetMap 查出该属性的所有 effect，逐个调度执行，effect 重跑读取最新数据产出新结果。核心思想：读时登记「谁用了这个数据」，写时通知「用过这个数据的人重新跑」。targetMap 用 WeakMap&lt;target, Map&lt;key, Set&lt;effect&gt;&gt;&gt; 结构存储依赖关系。`,
    tags: ["Proxy", "track", "trigger", "依赖收集"],
  },
  {
    id: "vdi-reactive-design-2",
    chapter: "vdi-reactive-design",
    level: 2,
    question: `ref 和 reactive 的区别？什么时候用哪个？`,
    answer:
      `reactive(obj) 用 Proxy 代理整个对象，访问 obj.key 自动触发 get/set，无需额外语法，但只能用于对象/数组，且解构会丢失响应式。ref(value) 用一个带 .value 的对象包裹任意值（含原始类型），访问和修改必须走 .value 才能触发拦截，模板里 Vue 会自动解包所以不用写 .value。选择原则：原始类型（number/string/boolean）必须用 ref；对象/数组两者皆可，reactive 写法更自然但要避免解构和整体替换；需要频繁重新赋值的对象推荐用 ref，因为 ref.value = newObj 会触发响应，而 reactive 整体替换会丢响应式。`,
    tags: ["ref", "reactive", "响应式"],
  },
  {
    id: "vdi-reactive-design-3",
    chapter: "vdi-reactive-design",
    level: 3,
    question: `为什么解构 reactive 对象会丢失响应式？如何正确处理？`,
    answer:
      `reactive 用 Proxy 代理对象，响应式存在于「通过代理对象访问属性」这条路径上。解构 const { count } = reactiveState 把代理对象的 count 属性值「拆」出来赋给一个普通变量，count 此时是一个原始值（如数字），已经脱离了 Proxy 代理，改它不会触发 set 拦截。正确做法：①用 toRefs(reactiveState) 把每个属性转成 ref 再解构，解构出的是 ref 对象，访问 .value 仍走拦截；②始终通过 reactiveState.count 访问，不解构；③直接用 ref 管理每个值。原则：响应式依赖「通过代理访问」这条路径，脱离代理就丢响应式。`,
    tags: ["reactive", "解构", "响应式失效"],
  },
  {
    id: "vdi-reactive-design-4",
    chapter: "vdi-reactive-design",
    level: 4,
    question: `为什么 Vue 3 用 Proxy 代替 Vue 2 的 Object.defineProperty 实现响应式？`,
    answer:
      `Object.defineProperty 的局限：①只能拦截已存在的属性，新增/删除属性无法检测（Vue 2 需 $set/$delete hack）；②无法监听数组索引和 length 变化（Vue 2 需重写数组方法）；③需递归遍历对象所有属性定义 getter/setter，初始化开销大。Proxy 的优势：①拦截整个对象的所有操作（包括属性增删、数组索引）；②无需递归遍历，访问时才惰性代理深层属性，初始化更快；③是引擎原生支持的标准 API，性能更好。代价是 Proxy 无法被 polyfill（ES3 无 Proxy），所以 Vue 3 放弃 IE11 支持。设计权衡：用更干净更强大的拦截机制换取放弃旧浏览器。`,
    tags: ["Proxy", "Object.defineProperty", "设计动机"],
  },
];
