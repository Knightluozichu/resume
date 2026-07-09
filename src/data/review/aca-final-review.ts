import type { ReviewQuestion } from "./types";

export const acaFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "aca-fr-1",
    chapter: "aca-final-review",
    level: 1,
    question: "全书六大核心主题的知识图谱是什么？",
    answer:
      "六大主题围绕「组件化架构」中心展开：①架构设计——五层分层（壳工程→业务组件→公共业务→基础架构→SDK）定义边界和依赖方向，上层依赖下层禁止反向 ②路由与导航——ARouter编译期APT生成路由表，运行期查表跳转，解决页面解耦，核心能力包括页面跳转/服务发现IProvider/拦截器IInterceptor/降级DegradeService ③组件通信——四种方式（接口下沉同步类型安全/事件总线异步一对多/SharedPreferences少量配置/ARouter Provider框架级）解决数据交互解耦 ④依赖注入——Dagger2编译期生成注入代码，@Inject/@Module/@Component/@Scope，依赖接口而非实现 ⑤生命周期管理——Activity计数法判断前后台，SPI/LifecycleDispatcher分发到各组件，组件懒加载 ⑥构建与部署——Gradle多模块+isRunAlone切换集成/独立模式+buildTypes+productFlavors。一条主线贯穿：解耦。",
    tags: ["知识图谱", "六大主题", "组件化架构", "全书总览"],
  },
  {
    id: "aca-fr-2",
    chapter: "aca-final-review",
    level: 2,
    question: "不同规模项目如何选择组件化方案？选型矩阵是什么？",
    answer:
      "选型矩阵按项目规模分三档：①小型项目（<5人）——模块化（单module分包）+显式Intent跳转+直接调用通信+手动DI+单module构建。不过度设计。②中型项目（5-15人）——组件化（多module）+ARouter路由+接口下沉+Provider通信+Dagger2 DI+多module+isRunAlone。标准组件化方案。③大型项目（15+人）——组件化+插件化+ARouter+全方式组合通信+Dagger2/Hilt+多module+变体+插件化动态加载。选型原则：小项目不要过度设计（模块化即可），中项目标准组件化（ARouter+接口下沉+Dagger2），大项目全量组件化+插件化（按需加载）。核心是按团队规模和业务复杂度选择合适的解耦程度。",
    tags: ["选型矩阵", "项目规模", "模块化", "组件化", "插件化"],
  },
  {
    id: "aca-fr-3",
    chapter: "aca-final-review",
    level: 3,
    question: "六大主题之间有哪些交叉点？举例说明组合使用。",
    answer:
      "交叉点：①架构×路由=分层依赖+路由跳转——五层分层定义组件边界和依赖方向，路由在边界间架桥（module-home不能直接依赖module-order，但可通过ARouter跳转） ②路由×通信=ARouter Provider——路由不仅跳页面（@Route Activity），还发现服务（IProvider navigation()获取接口实现），路由和通信合二为一 ③DI×通信=接口下沉+注入实现——接口定义在common层，Dagger2的@Module+@Binds绑定接口到实现，@Component注入到调用方，DI让接口下沉更优雅 ④生命周期×构建=isRunAlone独立运行——独立模式时组件有自己的Application和生命周期，与集成模式行为不同 ⑤架构×DI=Component分层——AppComponent(@Singleton)包含全局Module→各业务Component(自定义Scope)→Activity。理解交叉点才能在真实项目中灵活组合。",
    tags: ["交叉点", "组合使用", "架构", "路由", "DI", "生命周期"],
  },
  {
    id: "aca-fr-4",
    chapter: "aca-final-review",
    level: 3,
    question: "组件化的五大设计原则是什么？如何指导实践？",
    answer:
      "五大设计原则：①单一职责——壳工程只集成不写业务，业务组件只管自己业务，common-core只提供基础。每个module有明确单一职责。②依赖倒置——高层模块依赖接口（IOrderRepository）不依赖实现（OrderRepositoryImpl），DI容器注入具体实现。③开闭原则——新增组件不改现有代码，新组件只需实现common层接口并@Route注册即可接入，对扩展开放对修改关闭。④接口隔离——common层接口最小化（IUserService只含用户相关方法），组件按需实现，不强迫依赖不需要的方法。⑤编译隔离——组件间无直接依赖（module-home不implementation module-order），编译器强制约束，Gradle构建配置禁止跨业务组件依赖。一条主线：解耦——让组件可独立开发、编译、测试、部署、复用。这些原则是组件化架构的理论基础，指导拆分边界、依赖管理和扩展方式。",
    tags: ["设计原则", "单一职责", "依赖倒置", "开闭原则", "编译隔离"],
  },
];
