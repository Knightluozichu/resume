import type { ReviewQuestion } from "./types";

export const acaLifecycleManagementQuestions: ReviewQuestion[] = [
  {
    id: "aca-lc-1",
    chapter: "aca-lifecycle-management",
    level: 1,
    question: "Activity 计数法判断前后台的原理是什么？",
    answer:
      "原理：通过Application.registerActivityLifecycleCallbacks注册全局监听，在onActivityStarted回调中activityCount++，在onActivityStopped回调中activityCount--。判断逻辑：①activityCount == 0表示所有Activity都处于Stopped状态（不可见），App在后台 ②activityCount从0变1表示从后台恢复到前台 ③activityCount从1变0表示从前台进入后台。原理依据：Activity可见时一定处于Started状态，如果所有Activity都Stopped则App不可见（在后台）。注意：onActivityStarted/onActivityStopped而非onCreate/onDestroy，因为只有Started状态才表示Activity可见。这是组件化中判断App前后台的标准方案。",
    tags: ["Activity计数", "前后台", "LifecycleCallbacks"],
  },
  {
    id: "aca-lc-2",
    chapter: "aca-lifecycle-management",
    level: 2,
    question: "组件化中如何把前后台事件分发给各组件？SPI 机制如何实现？",
    answer:
      "用SPI（Service Provider Interface）机制分发。实现：①common-core定义IAppLifecycle接口——interface IAppLifecycle { fun onForeground(); fun onBackground(); fun onLowMemory(); fun onTerminate() } 和LifecycleDispatcher分发器对象（维护listeners列表，提供register/unregister/dispatchForeground/dispatchBackground方法） ②壳工程App通过Activity计数法判断前后台变化，count从0变1时调用LifecycleDispatcher.dispatchForeground()，从1变0时调用dispatchBackground() ③各业务组件实现IAppLifecycle接口并在init()中调用LifecycleDispatcher.register(this)注册 ④分发器遍历所有注册的监听器调用对应方法。组件不直接访问Application，通过SPI间接接收事件，实现解耦。",
    tags: ["SPI", "前后台分发", "IAppLifecycle", "LifecycleDispatcher"],
  },
  {
    id: "aca-lc-3",
    chapter: "aca-lifecycle-management",
    level: 2,
    question: "组件初始化的懒加载策略是什么？为什么需要？",
    answer:
      "懒加载策略：核心组件（路由ARouter、网络Retrofit、DI Dagger2）在App.onCreate中立即初始化（App启动必须的基础设施）；业务组件（首页/订单/商品等）在首次进入时才初始化——用isInitialized标志位控制，首次调用ensureInitialized()时才执行初始化逻辑（注册路由、加载数据等）。需要懒加载的原因：①减少App启动时间——如果10个组件都在onCreate初始化，启动时间叠加，冷启动变慢 ②按需加载——用户可能只用首页，不需要初始化订单/支付组件 ③节省内存——未使用的组件不占用内存 ④提升用户体验——启动更快，按需加载更高效。核心思想：启动时只加载必须的，其余延迟到首次使用。",
    tags: ["懒加载", "组件初始化", "启动优化", "按需加载"],
  },
  {
    id: "aca-lc-4",
    chapter: "aca-lifecycle-management",
    level: 3,
    question: "组件在前后台切换时应该做哪些操作？如何避免内存泄漏？",
    answer:
      "前台（onForeground）：①刷新数据——拉取最新数据 ②恢复动画/轮询——如订单状态轮询恢复 ③恢复推送展示。后台（onBackground）：①暂停轮询——省电省流量 ②释放资源——Glide.get(app).clearMemory()释放图片内存缓存 ③暂停动画——避免后台耗电。低内存（onLowMemory）：清理非必要缓存。退出（onTerminate）：注销EventBus订阅、注销LifecycleDispatcher监听、释放数据库连接。避免内存泄漏：①及时注销EventBus.getDefault().unregister(this) ②LifecycleDispatcher.unregister(this) ③避免静态变量持有Activity Context ④用Application Context替代Activity Context做长生命周期操作 ⑤Handler内部类用静态+WeakReference。关键是前台活跃、后台省资源、退出清理。",
    tags: ["前后台切换", "资源释放", "内存泄漏", "生命周期任务"],
  },
];
