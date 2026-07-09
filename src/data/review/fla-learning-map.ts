import type { ReviewQuestion } from "./types";

export const flaLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "fla-lm-1",
    chapter: "fla-learning-map",
    level: 1,
    question: "《第一行代码Android》全书的知识体系结构和递进逻辑是什么？",
    answer:
      "全书分为十个章节（含学习地图和全书复习），覆盖Android开发的三大知识维度：①四大组件——Activity（生命周期/启动模式/Intent通信）、Service（启动式/绑定式/前台服务）、Broadcast（标准广播/有序广播/动态静态注册）、ContentProvider（跨应用数据共享）；②数据与存储——SharedPreferences（键值对）、文件存储（内部/外部）、SQLite数据库（SQLiteOpenHelper/事务）、LitePal（ORM）、Room（Jetpack官方ORM，编译期检查+响应式查询）；③UI与架构——六大布局（LinearLayout/RelativeLayout/ConstraintLayout等）、RecyclerView（Adapter/LayoutManager/ViewHolder复用）、网络编程（HttpURLConnection/OkHttp/Retrofit）、Material Design（CoordinatorLayout/FAB/Snackbar）、Jetpack（ViewModel/LiveData/Room/Navigation/WorkManager）及MVVM架构。递进逻辑：从入门（项目结构/Gradle）到UI（布局/控件）到四大组件到数据存储到网络到高级特性（Material/Jetpack），每个主题建立在前一个之上，最终汇聚为现代Android开发（MAD）的完整能力。",
    tags: ["学习地图", "知识体系", "四大组件", "递进逻辑"],
  },
  {
    id: "fla-lm-2",
    chapter: "fla-learning-map",
    level: 2,
    question: "Android四大组件各自的核心职责和典型使用场景是什么？",
    answer:
      "四大组件的核心职责：①Activity——用户界面的载体，管理一个屏幕的UI和用户交互，通过生命周期回调（onCreate→onStart→onResume→onPause→onStop→onDestroy）管理状态，通过Intent在Activity间跳转传参，通过任务栈和启动模式管理回退关系。典型场景：每个功能页面对应一个Activity。②Service——后台执行长时间运行操作（音乐播放/下载/文件处理），无UI界面。启动式Service（startService）独立运行直到手动停止，绑定式Service（bindService）允许组件与之交互通信。典型场景：后台音乐播放、后台下载。③Broadcast——组件间通信的消息机制，发送方通过sendBroadcast发出广播，接收方通过BroadcastReceiver接收。标准广播异步同时送达，有序广播按优先级链式传递可截断。典型场景：开机启动、网络变化监听、电量变化。④ContentProvider——跨应用/跨进程数据共享，提供统一的CRUD接口（query/insert/update/delete），通过Uri标识数据，ContentResolver客户端访问。典型场景：通讯录共享、媒体库访问。四大组件都必须在AndroidManifest.xml中注册。",
    tags: ["四大组件", "Activity", "Service", "Broadcast", "ContentProvider"],
  },
  {
    id: "fla-lm-3",
    chapter: "fla-learning-map",
    level: 2,
    question: "用一次完整的Android应用开发流程，串联全书的知识体系。",
    answer:
      "主线：从零开发一个功能完整的Android应用。①入门——创建项目，理解项目结构（src/main/java源码、res资源、AndroidManifest清单、build.gradle构建配置），用Log.d()调试，配置模拟器/真机。②UI——用布局XML设计界面（ConstraintLayout扁平化布局），添加控件（TextView/Button/EditText/ImageView），用RecyclerView展示列表数据（Adapter+ViewHolder复用），处理点击事件。③Activity——实现页面跳转（Intent startActivity）、传递数据（putExtra）、管理生命周期、处理返回结果（startActivityForResult）。④数据存储——用SharedPreferences保存用户设置，用Room（或SQLite）存储结构化数据（@Entity/@Dao/@Database），用文件存储缓存。⑤广播——注册动态广播监听网络变化，静态广播监听开机启动。⑥服务——用前台Service播放后台音乐（startForeground+通知），用bindService实现Activity与Service交互。⑦网络——用Retrofit+OkHttp请求服务器API，用Gson解析JSON响应，协程处理异步。⑧高级特性——用Material Design组件美化界面，用ViewModel+LiveData实现MVVM架构，用Navigation管理导航，用WorkManager调度后台任务。依赖关系：UI是界面基础，Activity管理页面流转，数据存储持久化，网络获取远程数据，Service和Broadcast处理后台和通信，Jetpack架构组件将以上能力组织为可维护的架构。",
    tags: ["应用开发", "知识串联", "完整流程", "MVVM"],
  },
  {
    id: "fla-lm-4",
    chapter: "fla-learning-map",
    level: 1,
    question: "为什么说理解Android系统架构对应用开发至关重要？「会写App」和「懂Android」的区别是什么？",
    answer:
      "会写App的人知道怎么用控件拼界面、怎么调API，但遇到性能问题、内存泄漏、ANR、后台限制等深层问题时束手无策。懂Android的人能解释：为什么主线程不能做网络请求（NetworkOnMainThreadException，主线程阻塞导致ANR）；为什么Activity旋转屏幕会重建（配置变更触发onDestroy→onCreate，需ViewModel保留数据）；为什么Android 8.0后后台Service受限（省电策略，需用WorkManager替代）；为什么RecyclerView比ListView性能好（ViewHolder复用避免重复inflate，DiffUtil细粒度更新）；为什么推荐ConstraintLayout（扁平化减少嵌套层级，降低measure/layout开销）；为什么Room比手写SQLite安全（编译期SQL检查+类型安全+自动映射）。判断标志：能否从系统架构（四层架构/生命周期/进程管理/后台限制）解释一个Android现象的根因，而非「能跑就行」。理解系统架构才能写出高性能、高可维护、符合平台规范的应用。",
    tags: ["系统架构", "开发思维", "根因分析", "性能优化"],
  },
];
