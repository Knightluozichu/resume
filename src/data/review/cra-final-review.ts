import type { ReviewQuestion } from "./types";

export const craFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "cra-fr-1",
    chapter: "cra-final-review",
    level: 4,
    question: `用「四大领域」梳理《疯狂Android讲义》全书知识体系，并说明各领域之间的依赖关系。`,
    answer:
      `四大领域：①UI与交互——六大布局（LinearLayout/RelativeLayout/TableLayout/FrameLayout/GridLayout）、常用组件（TextView/EditText/Button/ImageView/ProgressBar）、AdapterView列表（ListView/GridView + Adapter）、事件处理（基于监听/基于回调/触摸/按键/手势/Handler异步）、高级UI（对话框/菜单/通知/ActionBar/滚动视图）。②四大组件——Activity（UI载体/生命周期/Intent）、Service（startService/bindService/前台Service）、BroadcastReceiver（标准/有序广播/动态静态注册）、ContentProvider（跨应用数据共享/Uri）。③数据持久化——SharedPreferences（键值对）、文件IO（内部/外部存储）、SQLite（SQLiteOpenHelper/事务/Cursor）、ContentProvider（跨应用）。④网络与多媒体——WebView（内嵌浏览器/JS互调）、HttpURLConnection（子线程HTTP请求）、Socket（TCP/UDP通信）、XML/JSON解析、MediaPlayer/SoundPool音频、Canvas 2D绘图、动画、传感器。依赖关系：UI与交互是所有应用的界面基础（四大组件中的Activity也需要UI布局）；事件处理依赖UI组件（对组件注册监听）；数据持久化为UI提供数据源（CursorAdapter绑定SQLite到ListView）；四大组件中的Service和Broadcast是后台与通信能力（独立于UI但受Activity控制）；网络与多媒体是高级能力（网络获取数据需持久化后展示，多媒体渲染在Canvas/动画基础上）。递进：UI → 事件 → 高级UI → 数据 → 组件 → 多媒体 → 网络。`,
    tags: ["知识体系", "四大领域", "依赖关系", "全书复习"],
  },
  {
    id: "cra-fr-2",
    chapter: "cra-final-review",
    level: 3,
    question: `Android数据持久化方案选型矩阵：给定不同场景如何选择最合适的存储方案？`,
    answer:
      `选型矩阵：①少量键值对配置（用户设置、登录状态、主题偏好）→ SharedPreferences。优点：API简单，自动XML持久化，轻量。不选SQLite因为杀鸡用牛刀。②原始文件（缓存图片、日志文件、下载的PDF）→ 文件IO。内部存储openFileOutput适合私有文件，外部存储getExternalStorage适合可共享大文件。③大量结构化数据（用户记录、聊天消息、商品列表）→ SQLite。支持查询/排序/分页/事务，Cursor遍历高效。配合CursorAdapter直接绑定到ListView。④跨应用共享数据（通讯录、媒体库）→ ContentProvider。封装SQLite为标准Uri接口，其他App通过ContentResolver访问。⑤需列表展示的数据 → SQLite + CursorAdapter（或SimpleCursorAdapter），查询结果Cursor直接喂给Adapter，省去手动转List的中间层。⑥临时缓存（网络图片缓存）→ 文件IO + LRU策略。关键原则：数据量小用SP，结构化用SQLite，跨App用ContentProvider，文件用IO。实际项目常组合使用——如「用户设置用SP + 业务数据用SQLite + 图片缓存用文件IO」。`,
    tags: ["选型矩阵", "数据持久化", "SharedPreferences", "SQLite", "ContentProvider", "场景决策"],
  },
  {
    id: "cra-fr-3",
    chapter: "cra-final-review",
    level: 4,
    question: `Android主线程限制贯穿全书——列举所有涉及「不能在主线程做」的场景及解决方案。`,
    answer:
      `主线程限制场景：①网络请求——HttpURLConnection/Socket/WebView加载远程页面，主线程执行抛NetworkOnMainThreadException（Android 4.0+）。解决：子线程请求 + Handler/runOnUiThread回主线程更新UI。②数据库操作——SQLite的execSQL/rawQuery在大数据量时耗时，主线程执行可能ANR。解决：子线程操作数据库，Cursor在主线程读取（CursorAdapter可处理）。③文件IO——大文件读写耗时，主线程阻塞ANR。解决：子线程读写。④MediaPlayer的prepare——同步缓冲网络流可能阻塞，解决：用prepareAsync异步缓冲 + setOnPreparedListener回调。⑤耗时计算——图片处理、JSON解析大文件、加密运算。解决：子线程计算。⑥传感器——registerListener后onSensorChanged在传感器线程回调，更新UI需Handler切回主线程。通用解决方案：①Thread + Handler——子线程sendMessage，主线程handleMessage。②AsyncTask——doInBackground子线程执行，onPostExecute主线程回调（已废弃，推荐协程/RxJava）。③runOnUiThread——在子线程中调用Activity.runOnUiThread(Runnable)切回主线程。④Handler.post——handler.post(Runnable)投递到主线程消息队列。核心原则：主线程只负责UI渲染和事件分发，所有耗时操作（网络/IO/数据库/计算）放子线程，完成后切回主线程更新UI。`,
    tags: ["主线程", "ANR", "子线程", "Handler", "网络请求", "数据库", "异步", "全书复习"],
  },
  {
    id: "cra-fr-4",
    chapter: "cra-final-review",
    level: 4,
    question: `从「疯狂Android讲义」的Java+传统API到现代Android开发，需要补齐哪些技术栈？如何过渡？`,
    answer:
      `需补齐的技术栈：①语言——Java → Kotlin（空安全、扩展函数、协程、data class、密封类）。Kotlin是Google官方首选语言，逐步替代Java。②架构——传统MVC（Activity臃肿）→ MVVM（ViewModel+LiveData+DataBinding）或MVI。ViewModel保留配置变更数据，LiveData生命周期安全的响应式数据。③数据库——手写SQLiteOpenHelper + execSQL → Room（@Entity/@Dao/@Database编译期SQL检查+类型安全+自动映射+响应式Flow/LiveData查询）。④网络——HttpURLConnection手动管理 → OkHttp（连接池/拦截器/Gzip）+ Retrofit（接口声明式API + Gson自动转换）。⑤列表——ListView + BaseAdapter手动ViewHolder → RecyclerView（强制ViewHolder + LayoutManager多样化 + DiffUtil局部刷新 + ItemDecoration/ItemAnimator）。⑥异步——Thread+Handler/AsyncTask → Kotlin协程（suspend函数 + Dispatchers.IO/Main切换，结构化并发）。⑦UI——XML布局 + 主题 → Jetpack Compose（声明式UI，@Composable函数，状态驱动重组）或Material Design组件。⑧依赖注入——手动new → Hilt/Dagger。⑨后台任务——Service → WorkManager（满足约束的后台任务调度，兼容Doze模式）。过渡策略：先学Kotlin语法（1周），再用Retrofit+OkHttp替换HttpURLConnection，Room替换SQLite，RecyclerView替换ListView，最后引入ViewModel+LiveData+协程实现MVVM架构。Compose可最后学（可选）。疯狂Android讲义打的API地基（四层架构、生命周期、事件处理、Intent、Service机制）仍然有效，只是实现方式现代化。`,
    tags: ["技术演进", "Kotlin", "Jetpack", "Room", "Retrofit", "RecyclerView", "协程", "MVVM", "Compose"],
  },
];
