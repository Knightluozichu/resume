import type { ReviewQuestion } from "./types";

export const flaFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "fla-fr-1",
    chapter: "fla-final-review",
    level: 4,
    question: `用Android全栈视角分析「一个应用在低端机上频繁ANR，且后台任务经常被系统杀死」的根因，并给出解决方案。`,
    answer:
      `全栈分析：①ANR根因——主线程被阻塞超过5秒（输入事件超时）或10秒（BroadcastReceiver/Service超时）。可能原因：主线程做网络请求/数据库大量查询/文件IO/复杂计算/大量JSON解析/主线程sleep。排查：用StrictMode检测主线程IO，用Profiler看主线程CPU时间线定位阻塞点。②后台Service被杀——Android 8.0+后台Service限制，后台应用startService抛异常；普通后台Service优先级低被系统为省电杀死。解决方案：①ANR修复——所有耗时操作移到子线程（网络用Retrofit+Coroutine、数据库用Room的suspend/Flow、文件用协程或WorkManager）；主线程只做UI操作和轻量逻辑；复杂计算用kotlinx.coroutines的Dispatchers.Default；避免在主线程反序列化大JSON（用Gson在子线程解析）。②后台任务改造——用户可感知的后台任务（音乐播放/下载）用前台Service+startForeground显示通知；不可感知的后台任务（数据同步/日志上传/缓存清理）用WorkManager调度（设置网络/充电约束，系统保证执行，设备重启恢复）；实时性要求高的用推送（FCM）触发。③架构优化——用MVVM（ViewModel+LiveData）分离UI和数据，ViewModel在协程作用域中处理异步逻辑，避免Activity回调地狱；用Room替代手写SQLite减少主线程数据库操作风险；Repository层统一管理本地和远程数据源。④性能优化——RecyclerView用DiffUtil细粒度刷新避免主线程重绘开销；布局用ConstraintLayout减少嵌套层级降低measure/layout耗时；图片加载用Glide/Coil自动异步加载和缓存。⑤监控——上线接入ANR检测（Watchdog/FileObserver），WorkManager用getWorkInfoByIdLiveData监控任务状态。`,
    tags: ["ANR", "后台限制", "WorkManager", "性能优化", "全栈分析"],
  },
  {
    id: "fla-fr-2",
    chapter: "fla-final-review",
    level: 3,
    question: `从技术演进的角度，解释Android开发中各项技术从传统到现代的演进逻辑。`,
    answer:
      `演进链条：①列表——ListView（性能差，需手动convertView+ViewHolder，getView中inflate重复）→RecyclerView（强制ViewHolder复用，LayoutManager灵活布局，DiffUtil细粒度刷新）→ListAdapter+DiffUtil（自动计算差异，进一步简化刷新逻辑）。②数据库——SQLiteOpenHelper（手写SQL，易错，需手动管理Cursor和版本迁移）→LitePal（ORM，面向对象API，但项目不活跃）→Room（Jetpack官方，编译期SQL检查，类型安全，支持LiveData/Flow响应式查询，Migration结构化迁移）。③异步——Thread+Handler（底层，代码量大，手动管理线程切换）→AsyncTask（简化线程切换但内存泄漏/屏幕旋转崩溃/串行执行，已废弃）→Coroutines+Flow（轻量协程，结构化并发，suspend函数自动线程切换，Flow响应式流，Kotlin首选）→Retrofit+suspend函数（网络层与协程无缝集成）。④架构——MVC（Activity/Fragment承担Controller和View双重职责，God Activity）→MVP（Presenter分离逻辑，但接口膨胀，生命周期管理复杂）→MVVM（ViewModel+LiveData，数据驱动UI，ViewModel跨配置变更存活，Jetpack官方推荐）→MVI（单向数据流+状态管理，状态可预测可测试）。⑤导航——Intent+FragmentManager事务（手写跳转，回退栈管理复杂，传参易错）→Navigation Component（可视化导航图，Safe Args类型安全传参，统一回退栈，Deep Link支持）。⑥后台——Service（Android 8.0+受限，不可靠）→WorkManager（系统调度，约束条件，保证执行，持久化，省电）。每代技术在解决前代问题的同时引入新概念，整体趋势：声明式>命令式、类型安全>运行时检查、系统调度>应用自管理。`,
    tags: ["技术演进", "RecyclerView", "Room", "协程", "MVVM", "Navigation"],
  },
  {
    id: "fla-fr-3",
    chapter: "fla-final-review",
    level: 3,
    question: `如果要开发一个完整的Android应用（如天气预报App），如何从零到一组织技术方案？`,
    answer:
      `天气预报App技术方案：①项目结构——MVVM架构，单Activity多Fragment（Navigation Component管理导航）。包结构：data/(Repository/Room/Retrofit/Model)、ui/(各功能Fragment/ViewModel)、di/(依赖注入)。②UI层——用Material Design组件：CoordinatorLayout+AppBarLayout+CollapsingToolbarLayout实现城市天气详情页可折叠头部；BottomNavigation管理「天气/城市列表/设置」三个Tab；RecyclerView+ListAdapter展示城市列表和小时天气预报；SwipeRefreshLayout下拉刷新天气数据。③ViewModel+LiveData——WeatherViewModel持有天气数据LiveData，CityListViewModel持有城市列表LiveData。Fragment观察LiveData更新UI，调用ViewModel方法请求数据。ViewModel不持有View引用，配置变更自动存活。④数据层——Repository统一管理数据源：本地用Room存储城市列表和缓存天气数据（@Entity城市表/@Dao查询接口，返回LiveData响应式查询）；远程用Retrofit调用天气API（@GET接口+Gson Converter自动解析JSON+suspend函数支持协程）。网络层用OkHttp配置拦截器（添加API Key Header/日志拦截器/缓存）。⑤异步——Coroutines在ViewModelScope中调用Retrofit suspend函数和Room suspend DAO，协程自动切换IO线程和主线程。⑥后台——WorkManager定期（每3小时）刷新天气数据（设置网络约束），保证App未打开也能更新缓存。⑦权限与配置——INTERNET权限、ACCESS_NETWORK_STATE权限；AndroidManifest注册Activity和WorkManager；networkSecurityConfig配置HTTPS。⑧依赖——Retrofit+OkHttp+Gson+Room+ViewModel+LiveData+Navigation+WorkManager+Coroutines+Glide（天气图标加载）。⑨测试——ViewModel用JUnit+Mockito测试逻辑，DAO用Room测试，Repository用Fake数据源。整体：UI层（Material Design Fragment）→ViewModel（LiveData+Coroutine）→Repository（Room+Retrofit）→数据源，层次清晰，可测试，可维护。`,
    tags: ["完整应用", "MVVM", "Repository", "技术方案", "天气预报"],
  },
  {
    id: "fla-fr-4",
    chapter: "fla-final-review",
    level: 4,
    question: `为什么说「理解Android系统机制」比「会用API」更重要？用全书的例子说明这一点。`,
    answer:
      `「会用API」vs「懂系统机制」的区别贯穿全书：①Activity——会用API的人知道onCreate里setContentView，但不懂为什么旋转屏幕Activity会重建（配置变更触发系统重建流程），导致数据丢失。懂机制的人用ViewModel（理解ViewModelStore跨配置变更存活原理）或onSaveInstanceState保留数据。②Service——会用API的人startService后以为Service可靠运行，但不懂Android后台限制（8.0+后台Service被杀），导致后台任务中断。懂机制的人根据场景选择前台Service（用户可见高优先级）或WorkManager（系统调度保证执行）。③Broadcast——会用API的人静态注册所有广播，但不懂Android 8.0静态注册限制（隐式广播不送达），导致收不到广播。懂机制的人知道哪些广播可静态注册（BOOT_COMPLETED豁免），哪些必须动态注册。④RecyclerView——会用API的人调notifyDataSetChanged全量刷新，但不懂ViewHolder复用原理和DiffUtil局部刷新优势，导致列表卡顿。懂机制的人用ListAdapter+DiffUtil只刷新变化的item。⑤网络——会用API的人在主线程请求网络（崩溃后才知道不能），不懂NetworkOnMainThreadException的系统限制原因（主线程阻塞→ANR）。懂机制的人理解UI线程模型，用协程/Retrofit异步处理。⑥存储——会用API的人手写SQLite（运行时SQL错误崩溃），不懂Room编译期检查的优势。懂机制的人用Room+Migration管理数据库版本，类型安全。⑦Jetpack——会用API的人照搬ViewModel+LiveData代码，不懂ViewModel跨配置变更的原理（ViewModelStore机制），在错误场景滥用。懂机制的人理解LiveData生命周期感知（只在活跃状态通知），避免内存泄漏和数据更新时机问题。判断标志：能否解释一个API行为背后的系统机制（生命周期/进程优先级/线程模型/后台限制/权限框架），而非「能编译通过就行」。系统机制是API行为的原因，理解原因才能正确选择API、预判边界条件、定位异常问题。`,
    tags: ["系统机制", "API理解", "根因分析", "工程思维", "总结"],
  },
];
