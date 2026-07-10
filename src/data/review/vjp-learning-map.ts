import type { ReviewQuestion } from "./types";

export const vjpLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "vjp-learning-map-1",
    chapter: "vjp-learning-map",
    level: 2,
    question: `全书四阶段递进结构是什么？为什么是这个顺序？`,
    answer:
      `基础语法（响应式系统 / 模板语法）→ 组件体系（组件设计 / Composition API）→ 状态路由（Vuex·Pinia / Vue Router）→ 工程化（SSR·SSG / 构建部署）→ 总复习。顺序由依赖关系决定：上层依赖下层。没有响应式和模板就没有可运行的视图；没有视图就没有组件可拆；没有组件就没有通信与状态共享的需求；没有状态与路由就做不出多页面应用；没有工程化就无法把应用交付上线。先「能渲染」，再「能拆分」，然后「能共享与导航」，接着「能服务端渲染」，最后「能上线」。`,
    tags: ["架构", "学习路径"],
  },
  {
    id: "vjp-learning-map-2",
    chapter: "vjp-learning-map",
    level: 2,
    question: `Vue 的「响应式」与「命令式操作 DOM」有什么本质区别？`,
    answer:
      `命令式是「你告诉浏览器每一步怎么做」：拿到元素、监听事件、手动改 textContent、手动同步数据与视图，数据和 DOM 的对应关系靠人脑维护。响应式是「你声明数据与视图的关系，框架替你同步」：数据一变，框架自动找到依赖这块数据的视图并更新。本质区别在于「谁维护数据到视图的映射」——命令式由开发者维护（易出错、易遗漏），响应式由框架的依赖收集系统维护（Proxy 拦截读写、track 登记、trigger 派发）。响应式让你只关心「数据是什么状态」，而把「如何反映到界面」交给框架。`,
    tags: ["响应式", "命令式", "数据驱动"],
  },
  {
    id: "vjp-learning-map-3",
    chapter: "vjp-learning-map",
    level: 3,
    question: `用「一次点击到页面更新到上线交付」的旅程描述全书主线。`,
    answer:
      `用户点击按钮：①基础层——点击触发 state.count++，Proxy.set 拦截写入，trigger 找到依赖该数据的 effect（第 2 章响应式）；模板里的 {{ count }} 插值经编译生成 render，重新执行产出新 VNode，patch 更新 DOM（第 3 章模板）。②组件层——点击发生在 Child 组件内，emit('add') 冒泡到 Parent 改 state（第 4 章组件设计）；计数逻辑抽成 useCounter() 复用（第 5 章 Composition API）。③状态路由层——用户信息存 Pinia 跨组件共享（第 6 章）；跳转详情页前 beforeEach 鉴权重定向（第 7 章）。④工程化层——详情页用 SSR 首屏直出利于 SEO（第 8 章）；Vite 打包分包、路由懒加载、产物上 CDN、CI/CD 发布（第 9 章）。十章都在这条旅程中扮演角色。`,
    tags: ["架构", "运行时旅程"],
  },
  {
    id: "vjp-learning-map-4",
    chapter: "vjp-learning-map",
    level: 4,
    question: `会写 Vue 组件和真正懂 Vue 工程化有什么本质区别？`,
    answer:
      `会写组件只是表层——能搭模板、写 setup、调 API，照文档抄就会。真正难点在工程化判断力：响应式为什么会失效（解构丢响应式、ref 忘 .value、reactive 整体替换）；组件边界怎么划才不致 props 爆炸或状态散乱；该用全局状态还是局部状态；路由守卫放鉴权还是组件内放；SSR 的 hydration 不一致怎么排查；分包策略对首屏的影响；构建产物为什么体积大。这些是「项目跑起来后」才显现的问题，也是中高级面试与生产实战的真正考点。把组件当终点的人，做的应用能跑但难维护；把工程化当核心的人，才能做出可控、可扩展、可上线的 Vue 项目。区分标志：能否解释「为什么这样设计」而非只是「能跑」。`,
    tags: ["架构", "工程化", "工程思维"],
  },
];
