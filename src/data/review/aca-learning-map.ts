import type { ReviewQuestion } from "./types";

export const acaLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "aca-lm-1",
    chapter: "aca-learning-map",
    level: 1,
    question: "《Android组件化架构》全书的知识体系结构和递进逻辑是什么？",
    answer:
      "全书分为九个章节（含学习地图和全书复习），覆盖六大核心主题：①架构设计——组件化概述（单体痛点、组件定义、组件化vs模块化vs插件化）、架构设计（五层分层架构、壳工程、业务组件、公共业务层、基础架构层、SDK层、依赖方向规则、isRunAlone开关）；②路由与通信——路由与导航（ARouter框架、APT编译期生成路由表、运行期查表跳转、@Route注解、参数传递@Autowired、拦截器IInterceptor、降级策略DegradeService）、组件通信（接口下沉、事件总线EventBus、SharedPreferences、ARouter Provider/IProvider）；③依赖注入与生命周期——依赖注入（DI原理、依赖倒置、Dagger2的@Inject/@Module/@Component/@Scope、构造函数注入vs字段注入、组件化中跨组件接口注入）、生命周期管理（Activity计数法判断前后台、SPI机制分发、组件懒加载、IAppLifecycle接口）；④构建与部署——Gradle多模块构建、buildTypes与productFlavors变体、Manifest合并；⑤实战案例——电商App组件化拆分；⑥全书复习——知识图谱与选型矩阵。递进逻辑：从为什么要组件化到如何分层设计，再到路由通信解决解耦，然后是DI和生命周期管理运行期行为，最后是构建部署和实战落地，每个主题建立在前一个之上。",
    tags: ["知识体系", "六大主题", "递进逻辑", "全书概览"],
  },
  {
    id: "aca-lm-2",
    chapter: "aca-learning-map",
    level: 2,
    question: "单体架构的核心痛点是什么？组件化如何解决？",
    answer:
      "单体架构六大痛点：①编译慢——全量编译数分钟，改一行代码要编译整个项目 ②耦合高——模块间直接import，OrderActivity可直接引用HomeActivity ③团队冲突——多人改同一个module，频繁Git合并冲突 ④无法独立测试——测试一个功能要启动整个App ⑤无法独立部署——无法单独发布某个功能 ⑥复用困难——首页代码无法直接复用到另一个App。根因是「没有边界」——所有代码在同一编译单元内，编译器无法阻止不合理的依赖。组件化通过五层分层架构（壳工程→业务组件→公共业务→基础架构→SDK）拆分module，路由框架（ARouter）消除页面直接依赖，接口下沉消除数据直接依赖，多模块构建支持独立编译和调试（isRunAlone），最终实现可独立开发、可复用、可测试。",
    tags: ["单体痛点", "组件化解决", "解耦", "边界"],
  },
  {
    id: "aca-lm-3",
    chapter: "aca-learning-map",
    level: 3,
    question: "用一次完整的电商App开发流程串联全书知识体系。",
    answer:
      "主线：从零开发一个组件化电商App。①架构设计——壳工程(app)作为空壳入口只做初始化，拆分首页/登录/商品/购物车/订单/用户中心6个业务组件，common-core提供网络/路由/DI基础设施，common-biz提供支付/推送/分享公共业务。②路由——用ARouter的@Route(path=\"/order/detail\")注解注册页面路径，编译期APT生成路由表，运行期ARouter.build(path).navigation()查表跳转。③通信——接口下沉到common层定义IUserService/IOrderService，各组件实现并@Route注册，调用方通过ARouter Provider获取实现；登录状态变化用EventBus广播。④DI——用Dagger2的@Inject注入接口实现，@Module+@Binds绑定接口到实现，@Component连接注入点和提供者。⑤生命周期——通过Activity计数判断前后台，SPI/LifecycleDispatcher分发到各组件，组件懒加载。⑥构建——Gradle多模块+isRunAlone切换集成/独立模式，productFlavors多渠道打包。最终编译时间从8min降到2min。",
    tags: ["功能串联", "综合应用", "电商App", "完整项目"],
  },
  {
    id: "aca-lm-4",
    chapter: "aca-learning-map",
    level: 2,
    question: "六大核心主题之间有什么内在联系和交叉点？",
    answer:
      "内在联系：①架构设计是地基——五层分层定义了组件的边界和依赖方向，没有分层就没有组件化 ②路由与通信是经络——路由解决页面跳转解耦，通信解决数据交互解耦，两者共同消除组件间直接依赖 ③DI与生命周期是血液——DI让组件依赖接口而非实现，生命周期管理组件的运行期行为 ④构建部署是骨架——多模块构建让组件可独立编译 ⑤实战案例是落地——电商App拆分验证全流程。交叉点：架构×路由=分层依赖+路由跳转（五层分层定义边界，路由在边界间架桥）；路由×通信=ARouter Provider（路由不仅跳页面还发现服务）；DI×通信=接口下沉+注入实现（接口定义在common，DI注入组件提供的实现）；生命周期×构建=isRunAlone独立运行模式（独立模式组件有自己的Application和生命周期）；架构×DI=Component分层（AppComponent→业务Component→Activity）。",
    tags: ["主题联系", "交叉关系", "架构", "路由", "DI"],
  },
];
