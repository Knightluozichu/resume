import type { ReviewQuestion } from "./types";

export const acaComponentCommunicationQuestions: ReviewQuestion[] = [
  {
    id: "aca-cc-1",
    chapter: "aca-component-communication",
    level: 1,
    question: "四种跨组件通信方式的原理和适用场景分别是什么？",
    answer:
      "①接口下沉——接口定义在common-core层（IUserService extends IProvider），提供方组件（module-user）实现接口并用@Route注册，调用方通过ARouter.navigation()获取实现。同步调用、类型安全。适合获取数据/调用方法。②事件总线——发布-订阅模式，发布者EventBus.getDefault().post(LoginEvent)，订阅者@Subscribe接收。异步、一对多广播。适合状态变化通知（如登录状态变化通知多个组件刷新）。③SharedPreferences——key-value共享存储，组件A写入SP，组件B读取或注册OnSharedPreferenceChangeListener监听变化。适合少量配置/状态共享。④ARouter Provider——利用IProvider机制，实现接口并@Route注册，navigation()获取实例。是接口下沉的框架级轻量实现，推荐替代手动接口下沉。",
    tags: ["通信方式", "接口下沉", "事件总线", "SharedPreferences", "Provider"],
  },
  {
    id: "aca-cc-2",
    chapter: "aca-component-communication",
    level: 2,
    question: "接口下沉的完整实现步骤是什么？为什么推荐这种方式？",
    answer:
      "实现步骤：①common-core层定义接口——interface IUserService : IProvider { fun getUserName(): String; fun isLogin(): Boolean } ②提供方组件（module-user）实现接口——@Route(path=\"/user/service\") class UserServiceImpl : IUserService { override fun getUserName() = userManager.name } ③调用方组件（module-home）通过ARouter获取实例——val userService = ARouter.getInstance().build(\"/user/service\").navigation() as IUserService，然后调用userService.getUserName()。推荐原因：①同步调用——直接返回结果，不像事件总线异步 ②类型安全——接口方法有明确签名，编译期检查 ③无性能损耗——ARouter查表获取实例 ④解耦——调用方只依赖common层接口，不依赖提供方组件 ⑤符合依赖倒置——依赖抽象而非实现。",
    tags: ["接口下沉", "实现步骤", "类型安全", "依赖倒置"],
  },
  {
    id: "aca-cc-3",
    chapter: "aca-component-communication",
    level: 2,
    question: "事件总线为什么是「隐式依赖」？如何正确使用？",
    answer:
      "事件总线中发布者post事件后不知道谁在监听，订阅者@Subscribe也不知道事件从哪来——双方通过EventBus间接交互，不直接引用对方代码，故称隐式依赖。正确使用原则：①只用于一对多广播——如登录状态变化通知首页/购物车/订单等多个组件刷新 ②不用于需要返回值的同步调用——用接口下沉代替 ③事件定义在common层——LoginEvent/LogoutEvent等放在common-core ④及时注销订阅——在onDestroy中EventBus.unregister(this)防止内存泄漏 ⑤避免事件链——A触发B，B触发C导致难以追踪数据流 ⑥命名清晰——事件名包含触发场景（如LoginSuccessEvent而非DataChangedEvent）。滥用事件总线会导致事件满天飞，难以追踪和调试。",
    tags: ["事件总线", "隐式依赖", "EventBus", "使用原则"],
  },
  {
    id: "aca-cc-4",
    chapter: "aca-component-communication",
    level: 3,
    question: "首页需要获取用户信息并监听登录状态变化，如何组合使用通信方式？",
    answer:
      "组合使用接口下沉+事件总线。①获取用户信息用接口下沉——common-core定义IUserService接口（getUserName/getUserAvatar/isLogin），module-user实现并@Route(path=\"/user/service\")注册，首页通过ARouter.getInstance().build(\"/user/service\").navigation() as IUserService获取实例，调用userService.getUserName()获取数据。②监听登录状态用事件总线——module-login在登录成功时EventBus.getDefault().post(LoginSuccessEvent(userId))，登出时post(LogoutEvent(reason))，首页@Subscribe(threadMode=ThreadMode.MAIN)接收LoginSuccessEvent后刷新UI显示用户信息，接收LogoutEvent后清空用户数据。接口下沉解决同步数据获取（类型安全、有返回值），事件总线解决异步状态通知（一对多解耦），各取所长。",
    tags: ["组合使用", "接口下沉", "事件总线", "综合场景"],
  },
];
