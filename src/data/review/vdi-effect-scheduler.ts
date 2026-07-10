import type { ReviewQuestion } from "./types";

export const vdiEffectSchedulerQuestions: ReviewQuestion[] = [
  {
    id: "vdi-effect-scheduler-1",
    chapter: "vdi-effect-scheduler",
    level: 2,
    question: `effect 的 lazy 和 scheduler 选项分别控制什么？`,
    answer:
      `lazy 控制 effect 是否在注册时立即执行一次。默认 false（立即执行以收集依赖），设为 true 则不立即执行，需手动调用返回的 effectFn 来执行并收集依赖。scheduler 是一个函数，当依赖变化时由 trigger 调用，替代默认的「重新执行 fn」行为——fn 本身不再自动重跑，执行什么、何时执行完全由 scheduler 决定。computed 用 lazy（不立即算）+ scheduler（标脏不重算）实现懒求值缓存；watch 用 lazy（不立即跑）+ scheduler（执行回调传新旧值）实现侦听。`,
    tags: ["effect", "lazy", "scheduler"],
  },
  {
    id: "vdi-effect-scheduler-2",
    chapter: "vdi-effect-scheduler",
    level: 3,
    question: `computed 如何用 lazy + scheduler 实现懒求值与缓存？`,
    answer:
      `computed(getter) 的设计：用 lazy:true 让 effect 不立即执行 getter（首次不计算）。trigger 时不重跑 getter，而是用 scheduler 把 dirty 标为 true（标脏不重算）。读取 .value 时检查 dirty：若为 true 才执行 effectFn 重新计算 getter 并缓存结果，然后 dirty 置 false；若为 false 直接返回缓存值。这样依赖频繁变化但值未真正改变时，getter 不会重复执行；即使值变了，若没人读取 .value 也不会重算。懒求值（lazy）+ 缓存（dirty 标志）+ 调度（scheduler 标脏）三者协作让 computed 高效。`,
    tags: ["computed", "lazy", "scheduler", "缓存"],
  },
  {
    id: "vdi-effect-scheduler-3",
    chapter: "vdi-effect-scheduler",
    level: 3,
    question: `watch 如何用 scheduler 实现侦听回调？新旧值怎么传？`,
    answer:
      `watch(source, cb) 内部用 effect 注册对 source 的依赖，但 trigger 时不重跑 source，而是用 scheduler 执行 cb 回调。具体：effect 的 fn 是 () => oldValue = source()（读取 source 收集依赖并记旧值），lazy:true 不立即执行。当 source 变化时 trigger 调 scheduler：scheduler 里重新读 source 得到 newValue，然后执行 cb(newValue, oldValue)，最后 oldValue = newValue 更新旧值。immediate 选项让 cb 首次也执行（手动调一次 effectFn）。flush 选项控制 cb 执行时机：'pre'（默认，DOM 更新前）、'post'（DOM 更新后，能拿到最新 DOM）、'sync'（同步立即执行）。`,
    tags: ["watch", "scheduler", "侦听"],
  },
  {
    id: "vdi-effect-scheduler-4",
    chapter: "vdi-effect-scheduler",
    level: 4,
    question: `为什么说 computed 和 watch 都只是 effect 的不同配置组合？这个设计有什么好处？`,
    answer:
      `computed = effect(fn, { lazy: true, scheduler: 标脏 }) + 读取时按 dirty 决定是否重算。watch = effect(fn, { lazy: true, scheduler: 执行 cb 传新旧值 }) + immediate/flush 选项。两者底层都是 effect（Proxy 拦截 + track + trigger），区别只在 lazy 和 scheduler 的配置不同。好处是「单一机制，多种表现」：响应式引擎只需实现 effect + track + trigger 一套核心，computed 和 watch 是在上面的配置层组合，无需为每种副作用单独实现依赖收集。这是关注点分离的设计——核心引擎管「依赖收集与触发」，配置层管「触发后做什么」。新增副作用类型（如 watchEffect）也只需新配置，不改核心。`,
    tags: ["effect", "computed", "watch", "设计动机"],
  },
];
