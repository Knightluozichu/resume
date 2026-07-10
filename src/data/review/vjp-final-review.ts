import type { ReviewQuestion } from "./types";

export const vjpFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "vjp-final-review-1",
    chapter: "vjp-final-review",
    level: 2,
    question: `用一句话串联全书十章的核心主线。`,
    answer:
      `全书围绕「一次用户操作从输入到上线」展开：用户点击触发响应式数据更新（第2章），模板编译渲染视图（第3章），交互发生在解耦的组件内（第4章），逻辑用 Composition API 抽成可复用 Hooks（第5章），共享状态交给 Pinia（第6章），页面跳转由路由守卫把控（第7章），首屏用 SSR/SSG 优化与 SEO（第8章），最后经 Vite 构建分包部署上线（第9章）；学习地图（第1章）给方向，总复习（第10章）串闭环。每一章都在「数据变化→视图更新→组件协作→状态共享→导航控制→服务端渲染→构建交付」这条链路上承担一个角色，没有孤立知识点。`,
    tags: ["全书主线", "架构", "串联"],
  },
  {
    id: "vjp-final-review-2",
    chapter: "vjp-final-review",
    level: 3,
    question: `给定一个电商详情页需求，说明各章知识如何协作。`,
    answer:
      `电商详情页：①响应式系统——商品数据用 ref/reactive 管理，加入购物车触发状态更新自动重渲染（第2章）；②模板语法——v-if 控制缺货提示、v-for 渲染规格列表、插值显示价格、@click 加购（第3章）；③组件设计——详情页拆成 ProductInfo/SkuSelector/Reviews 子组件，props 传商品数据，emit 加购事件，slot 定制促销区（第4章）；④Composition API——加购逻辑抽 useCart()、规格选择抽 useSku() 跨组件复用（第5章）；⑤状态管理——购物车数量、用户登录态放 Pinia 全局共享，多页面同步（第6章）；⑥路由守卫——beforeEach 校验登录才能加购，未登录重定向带 redirect 回跳（第7章）；⑦SSR——详情页 SSR 首屏直出利于 SEO 与首屏，hydration 激活交互（第8章）；⑧构建部署——路由懒加载分包、内容哈希缓存、产物上 CDN、CI/CD 发布（第9章）。十章协作完成一个可上线详情页。`,
    tags: ["实战", "电商", "组件协作", "综合"],
  },
  {
    id: "vjp-final-review-3",
    chapter: "vjp-final-review",
    level: 3,
    question: `「响应式数据更新后 DOM 没变」可能有哪些原因？如何排查？`,
    answer:
      `常见原因：①数据没真正走响应式——直接改了原始对象而非代理对象，或用 let 变量存了非响应式副本；②ref 忘记 .value——在 JS 里改了 ref 变量本身而非 .value，没触发 set；③reactive 被整体替换——state = newObj 断了响应式链，应改属性或用 ref；④解构丢失响应式——const { count } = reactiveState 后改 count 不触发，应用 toRefs 解构或保持 reactiveState.count；⑤依赖未在 render 期间收集——数据在异步回调/定时器里第一次读，effect 已结束没建立依赖；⑥新增的属性/深层对象没被代理；⑦数据确实变了但视图被 v-once 缓存或 v-if 条件没变。排查步骤：Vue DevTools 查组件状态确认数据是否更新→检查数据来源是否响应式（是 ref/reactive 还是普通值）→确认修改方式正确（.value/属性赋值而非整体替换）→用 watch 监听该数据是否触发。盲目 $forceUpdate 是治标，应找根因。`,
    tags: ["响应式", "调试", "排查", "综合"],
  },
  {
    id: "vjp-final-review-4",
    chapter: "vjp-final-review",
    level: 4,
    question: `从「能用 Vue」到「用好 Vue」的判断力体现在哪？`,
    answer:
      `判断力体现在对「权衡」的把握而非语法熟练度：①响应式选型——何时 ref 何时 reactive，何时该用 computed 而非 watch，何时该 shallowRef 降低深响应开销；②组件边界——props 控制在几个以内、何时该拆、何时该合并，避免过度拆分导致组件碎片化；③状态归属——局部状态还是全局 store，避免滥用 store 让组件失去内聚；④路由与鉴权——守卫放鉴权还是组件内放，beforeEach vs beforeEnter 的职责划分；⑤渲染模式选型——CSR/SSR/SSG 按首屏与 SEO 需求取舍，不一刀切上 SSR；⑥构建优化——分包粒度、懒加载边界、缓存策略，平衡首屏与交互；⑦hydration 与 SSR 一致性——保证服务端客户端渲染一致避免 mismatch。核心是从「能跑」到「可控、可维护、可扩展、可上线」——能在多个方案中根据场景选最合适的，并说清为什么。这种判断力来自对每章原理的深入理解，而非 API 记忆。`,
    tags: ["工程判断", "权衡", "工程思维", "综合"],
  },
];
