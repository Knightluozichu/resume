import type { ReviewQuestion } from "./types";

export const vjpRouterGuardQuestions: ReviewQuestion[] = [
  {
    id: "vjp-router-guard-1",
    chapter: "vjp-router-guard",
    level: 2,
    question: `列出 Vue Router 守卫的执行顺序。`,
    answer:
      `一次完整导航的守卫链路：①router.beforeEach 全局前置（鉴权/登录态校验）；②beforeEnter 路由独享守卫（配置在 routes 上，路由级权限/数据预取）；③组件内 beforeRouteEnter（进入前，组件未创建，无 this）、beforeRouteUpdate（路由参数变化但复用同组件时）；④router.beforeResolve 全局解析守卫（所有组件守卫和异步组件加载完成后，导航确认前）；⑤导航确认，DOM 更新；⑥router.afterEach 全局后置钩子（无 next，不可改变导航，用于埋点、改标题等副作用）。beforeEach/beforeEnter/beforeRouteEnter/beforeResolve 都可中断（next(false)）或重定向（next('/x')），afterEach 不可改导航。`,
    tags: ["路由守卫", "beforeEach", "执行顺序"],
  },
  {
    id: "vjp-router-guard-2",
    chapter: "vjp-router-guard",
    level: 2,
    question: `beforeEach 中 next() 的几种用法和含义。`,
    answer:
      `Vue Router 3（next 回调风格）：next() 放行继续导航；next(false) 取消导航，停留在当前页；next('/login') 或 next({path:'/login'}) 重定向到指定路由；next(error) 传入 Error 实例则导航终止并触发 router.onError。Vue Router 4 推荐不再用 next 回调，改为 return 值控制：return true 或无 return（undefined）放行；return false 取消；return '/login' 或 return {path:'/login'} 重定向；return new Error() 抛错。混用 return 和 next() 会触发警告。原则：要么全用 return，要么全用 next，不混用。重定向时可在路由对象里带 query 记录原目标（如 redirect:/login?from=/detail）便于登录后回跳。`,
    tags: ["beforeEach", "next", "重定向", "Vue Router 4"],
  },
  {
    id: "vjp-router-guard-3",
    chapter: "vjp-router-guard",
    level: 3,
    question: `如何实现「未登录跳转登录页，登录后回到原页面」？`,
    answer:
      `在 router.beforeEach 全局前置守卫里：①判断目标路由是否需要登录（路由 meta.requiresAuth 标记）；②检查登录态（如读 localStorage token 或 Pinia user store）；③未登录则 return（或 next）重定向到 /login，并把原目标路径作为 query 带上：return { path: '/login', query: { redirect: to.fullPath } }。登录页登录成功后：读取 route.query.redirect，若有则 router.push(redirect) 回原页，否则跳默认首页。关键点：to.fullPath 保留完整路径含 query/hash；登录接口成功后先存 token 再跳转；白名单路由（如 /login 自身）不需鉴权应放行避免死循环。这是鉴权守卫的标准模式。`,
    tags: ["鉴权", "重定向", "beforeEach", "登录态"],
  },
  {
    id: "vjp-router-guard-4",
    chapter: "vjp-router-guard",
    level: 4,
    question: `beforeRouteEnter 为什么拿不到 this？如何绕过？`,
    answer:
      `beforeRouteEnter 在「导航确认前、组件还未创建」时执行——此时组件实例尚未实例化，this 自然不存在（其他组件内守卫 beforeRouteUpdate/beforeRouteLeave 执行时组件已存在，有 this）。这造成无法在守卫里访问组件方法/数据。绕过方式：beforeRouteEnter 的 next 接受一个回调 next(vm => {...})，该回调在组件挂载完成后执行，vm 即组件实例，可在此访问组件。注意这是唯一支持 next 传回调的守卫。替代方案：把数据预取逻辑移到全局 beforeEach/beforeEnter 里（用路由 meta 标记需预取的接口），或在组件 onMounted/setup 里用路由参数触发请求。实际项目常把数据获取放组件 setup（配合 Suspense/异步组件）而非守卫，守卫专注鉴权与重定向，职责更清晰。`,
    tags: ["beforeRouteEnter", "this", "组件生命周期", "工程思维"],
  },
];
