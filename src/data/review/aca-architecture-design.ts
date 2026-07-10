import type { ReviewQuestion } from "./types";

export const acaArchitectureDesignQuestions: ReviewQuestion[] = [
  {
    id: "aca-ad-1",
    chapter: "aca-architecture-design",
    level: 1,
    question: `五层分层架构的每一层职责是什么？`,
    answer:
      `五层从上到下：①壳工程（app）——集成各业务组件、初始化全局框架（路由ARouter/DI Dagger2/推送等），不含业务逻辑。是组件集成的容器。②业务组件层——按业务边界拆分的独立module（module-home/module-login/module-order等），包含该业务的完整UI/逻辑/数据层，可独立编译运行。③公共业务层（common-biz）——多组件共享的业务能力（分享ShareManager/支付PayManager/推送PushManager/统计StatManager），依赖common-core。④基础架构层（common-core）——全App基础设施（网络RetrofitClient/存储RoomHelper/路由常量RouterPaths/DI模块AppModule/Base类/工具类），不依赖任何上层。⑤第三方SDK层——AndroidX/OkHttp/Retrofit/Glide/ARouter/Dagger2等外部依赖。`,
    tags: ["五层架构", "壳工程", "业务组件", "公共业务", "基础架构"],
  },
  {
    id: "aca-ad-2",
    chapter: "aca-architecture-design",
    level: 2,
    question: `为什么禁止反向依赖和同层依赖？如何解决组件间交互需求？`,
    answer:
      `禁止反向依赖（下层依赖上层，如common-core依赖module-home）的原因：打破分层架构导致循环依赖，编译报错，架构腐化。禁止同层依赖（业务组件间互相依赖，如module-home依赖module-order）的原因：让组件不再独立，失去组件化意义。解决方式：①页面跳转用路由——ARouter.getInstance().build(\"/order/detail\").navigation()，编译期注解运行期查表，组件间无直接import ②数据交互用接口下沉——接口定义在common-core层（IOrderService extends IProvider），提供方组件（module-order）实现并@Route注册，调用方（module-home）通过ARouter navigation()获取实现 ③事件通知用事件总线——EventBus发布订阅，适合一对多异步通知。三种方式各有适用场景，组合使用。`,
    tags: ["依赖方向", "反向依赖", "同层依赖", "路由", "接口下沉"],
  },
  {
    id: "aca-ad-3",
    chapter: "aca-architecture-design",
    level: 2,
    question: `isRunAlone 的作用是什么？如何实现？`,
    answer:
      `isRunAlone是组件化的开关标志，控制组件是作为application独立运行还是作为library被壳工程集成。true时组件作为application独立运行（debug调试），false时作为library被壳工程集成（release发布）。实现方式：①在gradle.properties中设置isRunAlone=false ②在组件build.gradle中根据isRunAlone值切换插件——true用apply(plugin: \"com.android.application\")，false用apply(plugin: \"com.android.library\") ③独立运行时需要applicationId和自己的Application/启动Activity ④通过sourceSets区分——src/main/alone/AndroidManifest.xml用于独立模式（声明LAUNCHER Activity），src/main/AndroidManifest.xml用于集成模式 ⑤独立模式时其他组件不在编译路径，需要Mock/Stub替代。`,
    tags: ["isRunAlone", "独立运行", "集成模式", "Gradle插件"],
  },
  {
    id: "aca-ad-4",
    chapter: "aca-architecture-design",
    level: 3,
    question: `壳工程为什么不能包含业务逻辑？如果违反会有什么后果？`,
    answer:
      `壳工程是组件集成的容器，不能包含业务逻辑的原因：①该业务无法独立测试和复用——业务逻辑被锁死在壳工程里，无法单独编译运行 ②违反单一职责——壳工程既要负责集成初始化又要处理业务逻辑 ③编译耦合——壳工程改动会触发全量编译，失去组件化编译加速的优势 ④团队冲突——壳工程成为所有人的修改热点，Git冲突频繁 ⑤难以维护——业务逻辑分散在壳工程和业务组件中，职责混乱。如果违反（如壳工程里有Activity/Fragment/Repository），说明分层出了问题——应该把这些业务代码拆到对应的业务组件中。正确做法：壳工程只做集成（dependencies引用各组件）和初始化（ARouter.init/Dagger注入/ComponentManager.init）。`,
    tags: ["壳工程", "单一职责", "编译耦合", "架构红线"],
  },
];
