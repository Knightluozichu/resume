import type { ReviewQuestion } from "./types";

export const acaDependencyInjectionQuestions: ReviewQuestion[] = [
  {
    id: "aca-di-1",
    chapter: "aca-dependency-injection",
    level: 1,
    question: `依赖注入的核心原理是什么？解决了什么问题？`,
    answer:
      `依赖注入（DI）的核心原理是依赖倒置——高层模块（OrderActivity）不应依赖低层模块（OrderRepository），两者都应依赖抽象（IOrderRepository接口）。对象不自己创建依赖（不new），而是由外部容器（DI容器）在运行期创建并注入。Dagger2在编译期生成注入代码，零运行期反射。解决的问题：①解耦——调用方依赖接口而非实现类，可替换实现 ②可测试——测试时注入Mock实现，不需要真实网络请求 ③可复用——接口定义在common层，跨组件注入 ④生命周期管理——DI容器通过Scope控制实例的创建和作用域（@Singleton全App单例，@ActivityScoped Activity级别）。硬编码（val repo = OrderRepository()）无法替换、无法测试、无法跨组件复用。`,
    tags: ["依赖注入", "依赖倒置", "Dagger2", "解耦", "可测试"],
  },
  {
    id: "aca-di-2",
    chapter: "aca-dependency-injection",
    level: 2,
    question: `Dagger2 的 @Inject、@Module、@Component 各自的作用和关系？`,
    answer:
      `①@Inject——标记注入点。标注构造函数（class OrderRepository @Inject constructor(api: OrderApi)）告诉Dagger如何创建该类；标注字段（@Inject lateinit var repo: IOrderRepository）告诉Dagger需要注入。构造函数注入优先于字段注入。②@Module——标记提供者类。用@Provides方法提供第三方库实例（不可改构造函数的类，如OkHttpClient/Retrofit）；用@Binds抽象方法绑定接口到实现（@Binds abstract fun bindRepo(impl: OrderRepoImpl): IOrderRepository）。③@Component——标记注入器接口。连接@Module（提供者）和@Inject（注入点），如@Component(modules=[NetworkModule::class])。编译期生成实现类（DaggerAppComponent），调用inject(activity)完成注入。关系：Component引用Module获取依赖实例，把实例注入到@Inject标记的字段。`,
    tags: ["Dagger2", "Inject", "Module", "Component", "注解"],
  },
  {
    id: "aca-di-3",
    chapter: "aca-dependency-injection",
    level: 3,
    question: `组件化项目中如何用 DI 实现跨组件接口注入？`,
    answer:
      `步骤：①common-core定义接口——interface IUserRepository { fun getUser(id: String): User } ②module-user实现接口——class UserRepositoryImpl @Inject constructor(private val api: UserApi) : IUserRepository，用@Module abstract class UserModule { @Binds abstract fun bindUserRepository(impl: UserRepositoryImpl): IUserRepository }绑定接口到实现 ③app壳工程的AppComponent引用所有组件的Module——@Component(modules=[NetworkModule::class, UserModule::class]) interface AppComponent { fun inject(activity: HomeActivity) } ④module-home在Activity中@Inject lateinit var userRepo: IUserRepository，onCreate时调用(application as App).appComponent.inject(this)完成注入。关键：接口在common层双方可编译，实现由module-user提供，module-home只依赖接口，Dagger在编译期生成注入代码，运行期注入具体实现。`,
    tags: ["组件化", "跨组件注入", "接口绑定", "Binds"],
  },
  {
    id: "aca-di-4",
    chapter: "aca-dependency-injection",
    level: 2,
    question: `Dagger2 的作用域（Scope）在组件化中如何分层？`,
    answer:
      `作用域分层控制实例生命周期：①@Singleton——全App单例，绑定在AppComponent上。适合UserManager、Retrofit、OkHttpClient等全局共享对象。整个App生命周期内只创建一个实例。②自定义Scope如@UserScope——用户登录后创建，登出后销毁。用@Subcomponent实现，如UserComponent。适合用户会话相关的Repository。③@ActivityScoped——Activity级别，Activity销毁时实例被GC。适合Activity专属的Presenter/ViewModel。组件化中的分层：AppComponent(@Singleton)包含全局Module → 各业务Component（自定义Scope） → Activity。分层确保实例在正确的作用域内复用——@Singleton实例全局复用，@ActivityScoped实例Activity内复用，避免内存泄漏和重复创建。`,
    tags: ["作用域", "Scope", "Singleton", "生命周期", "Subcomponent"],
  },
];
