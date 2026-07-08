import type { ReviewQuestion } from "./types";

export const vjpReactivitySystemQuestions: ReviewQuestion[] = [
  {
    id: "vjp-reactivity-system-1",
    chapter: "vjp-reactivity-system",
    level: 2,
    question: "ref 和 reactive 的区别？什么时候用哪个？",
    answer:
      "reactive(obj) 用 Proxy 代理整个对象，访问 obj.key 自动触发 get/set，无需额外语法，但只能用于对象/数组，且解构会丢失响应式。ref(value) 用一个带 .value 的对象包裹任意值（含原始类型），访问和修改必须走 .value 才能触发拦截，模板里 Vue 会自动解包所以不用写 .value。选择原则：原始类型（number/string/boolean）必须用 ref；对象/数组两者皆可，reactive 写法更自然但要避免解构和整体替换；需要在 setup 里频繁重新赋值的对象（如整体替换列表）推荐用 ref，因为 ref.value = newObj 会触发响应，而 reactive 整体替换会丢响应式。实际项目里多数用 ref 统一管理更省心。",
    tags: ["ref", "reactive", "响应式"],
  },
  {
    id: "vjp-reactivity-system-2",
    chapter: "vjp-reactivity-system",
    level: 2,
    question: "简述 Vue 3 响应式的 track/trigger 机制。",
    answer:
      "Vue 3 用 Proxy 代理对象。读取属性时（get 拦截）执行 track：把「当前正在执行的 effect（如组件 render 函数）」记录到一个「属性 → 依赖集合」的映射 targetMap 里，key 是对象，二级 key 是属性名，值是该属性的所有依赖 effect 的 Set（Dep）。写入属性时（set 拦截）执行 trigger：从 targetMap 查出该属性对应的所有 effect，把它们加入调度队列。调度器在微任务里去重合并后统一执行 effect，effect 重新运行会读取最新数据生成新 VNode，再 patch 更新 DOM。核心思想：读时登记「谁用了这个数据」，写时通知「用过这个数据的人重新跑」。",
    tags: ["Proxy", "track", "trigger", "依赖收集"],
  },
  {
    id: "vjp-reactivity-system-3",
    chapter: "vjp-reactivity-system",
    level: 3,
    question: "为什么直接替换整个 reactive 对象会丢失响应式？如何正确处理？",
    answer:
      "let state = reactive({ count: 0 })，若写 state = reactive({ count: 1 }) 看似换了内容，但问题在于：原 Proxy 代理的是旧对象，模板里绑定的也是旧代理；重新赋值让 state 变量指向新代理，但已建立的依赖关系还连在旧代理上，视图不会更新。更隐蔽的是 state = { count: 1 }（赋原始对象）则彻底丢失响应式，新对象没被 Proxy 包裹。正确做法：①用 ref 包裹，ref.value = newObj 会触发响应；②改用 reactive 后只改属性不改整体（Object.assign(state, newObj) 逐属性写入，仍走 set 拦截）；③若必须整体替换，用 ref 是最省心的方案。原则：响应式身份不能在运行时被换掉。",
    tags: ["reactive", "响应式失效", "ref"],
  },
  {
    id: "vjp-reactivity-system-4",
    chapter: "vjp-reactivity-system",
    level: 4,
    question: "为什么说「响应式不是魔法」？它依赖哪些前提？",
    answer:
      "响应式能自动同步是有前提的：①必须通过代理对象读写——直接改原始对象（绕过 Proxy）或用非响应式方式存数据（如普通 let 变量）都不会触发更新；②依赖必须在 effect/render 执行期间被读取才能被 track 收集——在 setTimeout 或事件回调里第一次读的数据，若该 effect 已结束，不会建立依赖；③新增属性需用 Proxy 的 has 拦截或显式触发——Vue 3 的 Proxy 已支持动态新增属性（不像 Vue 2 需 $set），但替换整个代理对象仍会断链；④对 Map/Set/数组等需用代理后的版本。违反任一前提响应式就「失效」，表现为数据变了视图没动。理解这些前提才能在「视图不更新」时准确定位，而不是盲目用 $forceUpdate 兜底。",
    tags: ["响应式", "依赖收集", "工程思维"],
  },
];
