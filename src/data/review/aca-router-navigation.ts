import type { ReviewQuestion } from "./types";

export const acaRouterNavigationQuestions: ReviewQuestion[] = [
  {
    id: "aca-rn-1",
    chapter: "aca-router-navigation",
    level: 1,
    question: `ARouter 的编译期和运行期分别做了什么？`,
    answer:
      `编译期：APT（Annotation Processing Tool）注解处理器扫描源码中的@Route注解，按group分组自动生成路由表Java文件（如ARouter$$Group$$order.java），记录path到Activity/Provider的映射关系（RouteMeta包含destination Class和type）。无需运行期反射，零性能损耗，编译期可发现路径冲突。运行期：①ARouter.init(this)在Application.onCreate中调用，加载编译期生成的路由表到内存Map ②调用ARouter.getInstance().build(path).navigation()时，从内存路由表匹配path，找到目标Activity的Class ③最终调用startActivity跳转。整个流程：编译期注解→生成路由表→运行期加载→查表跳转。`,
    tags: ["ARouter", "编译期", "运行期", "APT", "路由表"],
  },
  {
    id: "aca-rn-2",
    chapter: "aca-router-navigation",
    level: 2,
    question: `如何在组件化项目中实现带登录校验的页面跳转？`,
    answer:
      `用ARouter拦截器（IInterceptor）。步骤：①创建@Interceptor(priority=1)标注的LoginInterceptor实现IInterceptor接口 ②在process(postcard, callback)中判断postcard.path是否需要登录（如/order/、/pay/开头需要登录）③如果需要登录且UserManager.isLoggedIn()为false，则调用callback.onInterrupt(null)中断跳转，并通过ARouter.getInstance().build(\"/login/main\").navigation()跳转到登录页 ④如果已登录或不需要登录，调用callback.onContinue(postcard)继续跳转 ⑤多个拦截器按priority值从小到大顺序链式执行，如priority=1的登录拦截器先于priority=2的埋点拦截器。拦截器还可用于埋点统计、权限控制、日志记录等。`,
    tags: ["拦截器", "登录校验", "IInterceptor", "跳转"],
  },
  {
    id: "aca-rn-3",
    chapter: "aca-router-navigation",
    level: 2,
    question: `ARouter 的参数传递和降级策略如何使用？`,
    answer:
      `参数传递：发送方用Postcard链式API传参——ARouter.getInstance().build(\"/order/detail\").withString(\"orderId\",\"123\").withInt(\"count\",5).withParcelable(\"orderInfo\",orderInfo).navigation()。接收方用@Autowired标注字段（@Autowired @JvmField var orderId: String? = null），在onCreate中调用ARouter.getInstance().inject(this)自动注入。降级策略：实现DegradeService接口，用@Route(path=\"/degrade/service\")注册，在onLost(context, postcard)中处理目标不存在的情况——可Toast提示\"页面不存在\"、跳转404页面或降级到Web页面。NavigationCallback也可监听onLost做自定义处理。`,
    tags: ["参数传递", "Autowired", "降级策略", "DegradeService"],
  },
  {
    id: "aca-rn-4",
    chapter: "aca-router-navigation",
    level: 3,
    question: `为什么 ARouter 选择 APT 而不是运行期反射？各有什么优劣？`,
    answer:
      `ARouter选择APT（编译期注解处理器）而非运行期反射的原因：APT优势——①零性能损耗：编译期生成路由表Java文件，运行期直接查内存Map，无反射开销 ②编译期安全：路径冲突在编译期报错而非运行期崩溃 ③类型安全：生成的代码有明确类型 ④R8/ProGuard友好：生成的Java文件不会被混淆破坏。反射方案劣势——①运行期扫描注解慢，有性能损耗 ②混淆需额外配置keep规则 ③运行期才发现路径错误。APT的代价是增加了编译时间（需扫描注解生成代码），但换来了运行期的高效和安全。这是「编译期做更多换运行期更快」的经典权衡。`,
    tags: ["APT", "反射", "编译期", "性能", "ProGuard"],
  },
];
