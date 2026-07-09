import type { ReviewQuestion } from "./types";

export const acaPracticeCaseQuestions: ReviewQuestion[] = [
  {
    id: "aca-pc-1",
    chapter: "aca-practice-case",
    level: 1,
    question: "电商 App 组件化拆分的步骤是什么？",
    answer:
      "三步走策略：①建立公共层——创建common-core（网络RetrofitClient/路由RouterPaths/DI AppModule/Base类/工具类）和common-biz（支付PayManager/推送PushManager/分享ShareManager），定义跨组件接口（IUserService/IOrderService/ICartService extends IProvider）放在common-core/service/下 ②拆分业务组件——按业务边界拆分首页module-home/登录module-login/商品module-product/购物车module-cart/订单module-order/用户中心module-user共6个module，每个组件实现common层接口并@Route注册，组件间通过路由和接口交互 ③壳工程集成——app/build.gradle依赖所有组件，App.kt中ARouter.init/Dagger注入/ComponentManager.init。关键原则：先公共层后业务层，保持每步集成模式可编译，逐步迁移降低风险。",
    tags: ["电商App", "拆分步骤", "公共层", "业务组件", "逐步迁移"],
  },
  {
    id: "aca-pc-2",
    chapter: "aca-practice-case",
    level: 2,
    question: "从首页到支付的完整跨组件交互流程如何实现？",
    answer:
      "组合使用路由+接口下沉+事件总线：①首页跳商品详情用路由——ARouter.getInstance().build(\"/product/detail\").withString(\"productId\",\"p_001\").navigation() ②商品详情加购物车用接口下沉——val cartService = ARouter.build(\"/cart/service\").navigation() as ICartService; cartService.addToCart(\"p_001\", 1) ③购物车跳订单用路由——ARouter.build(\"/order/create\").withStringArrayList(\"productIds\", productList).navigation() ④订单创建后发起支付用接口下沉——val payService = ARouter.build(\"/pay/service\").navigation() as IPayService; payService.pay(orderId, amount) ⑤支付成功通知用事件总线——EventBus.getDefault().post(PaySuccessEvent(orderId))通知首页/订单等组件刷新。原则：页面跳转用路由（解耦页面依赖），同步调用用接口下沉（类型安全有返回值），状态广播用事件总线（一对多异步）。",
    tags: ["跨组件交互", "路由", "接口下沉", "事件总线", "组合使用"],
  },
  {
    id: "aca-pc-3",
    chapter: "aca-practice-case",
    level: 3,
    question: "组件化拆分带来了哪些可量化的收益？",
    answer:
      "①编译加速75%——单体8min降到单组件2min，因为debug模式只编译改动的组件，./gradlew :module-home:assembleDebug秒级 ②Git冲突减少90%——6人各负责1-2个组件，改不同module，不再频繁冲突 ③组件复用——登录/支付组件作为aar发布到maven仓库，复用到3个App，减少重复开发 ④可测试性——单组件独立单测覆盖率>80%，可Mock依赖做隔离测试 ⑤可独立运行——debug模式单组件秒级启动调试，不需要启动整个App ⑥团队并行——各组件团队独立开发，接口定义在common层后并行实现。核心价值：开发效率提升（编译快+并行）、质量可控（独立测试）、成本降低（组件复用）。",
    tags: ["量化收益", "编译加速", "Git冲突", "组件复用", "可测试性"],
  },
  {
    id: "aca-pc-4",
    chapter: "aca-practice-case",
    level: 3,
    question: "组件化拆分中遇到的最大挑战是什么？如何解决？",
    answer:
      "最大挑战是跨组件依赖的处理。拆分前OrderActivity直接import HomeActivity和ProductRepository，拆分后组件间不能直接依赖。解决方式：①页面跳转改用路由——所有startActivity<HomeActivity>替换为ARouter.build(\"/home/main\").navigation()，通过@Route注解+路由表解耦 ②数据获取改用接口下沉——直接调用OrderRepository改为通过common层接口IOrderService+ARouter Provider获取实现 ③状态通知改用事件总线——直接回调改为EventBus发布订阅 ④逐步迁移——先拆低风险组件（如登录，依赖少），再拆核心组件（如订单，依赖多），每步保持集成模式可编译 ⑤Stub/Mock——独立运行时为缺失组件提供桩实现。关键是先定义common层接口契约，再拆分实现，保证平滑过渡。",
    tags: ["拆分挑战", "跨组件依赖", "路由改造", "逐步迁移", "Stub"],
  },
];
