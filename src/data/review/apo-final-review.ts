import type { ReviewQuestion } from "./types";

export const apoFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "apo-fr-1",
    chapter: "apo-final-review",
    level: 4,
    question: "全书八大优化维度的核心方法论是什么？各维度之间有什么交叉关系？",
    answer:
      "核心方法论是「测量→定位→优化→验证→监控」的闭环。八大维度：①分析工具——Profiler/Perfetto/Layout Inspector/GPU Rendering是所有优化前提 ②布局优化——ConstraintLayout扁平化+include/merge复用+ViewStub懒加载 ③内存优化——LeakCanary泄漏检测+Bitmap压缩+LruCache缓存+对象池复用 ④CPU/功耗——主线程异步化+线程池管理+Doze适配+WorkManager批处理 ⑤渲染优化——硬件加速+硬件层+Choreographer监控+RecyclerView优化 ⑥网络优化——DNS/TCP/TLS各阶段优化+多级缓存+弱网降级 ⑦存储优化——DataStore/MMKV/Room选型+事务批量+WAL+索引 ⑧稳定性——ANR/Crash/OOM防护+Crashlytics线上监控。交叉关系：工具×所有维度=测量基础；布局×渲染=层级深导致measure/layout慢影响帧率；内存×渲染=Bitmap占内存导致GC影响帧率；内存×稳定性=泄漏/OOM导致崩溃；CPU×稳定性=主线程阻塞导致ANR；CPU×功耗=计算和唤醒频率决定耗电；网络×存储=网络数据缓存到本地减少请求；存储×内存=大文件读取占内存导致OOM。一条主线：所有性能问题最终通过工具测量定位优化后验证线上监控闭环。",
    tags: ["全书复习", "八大维度", "交叉关系", "方法论"],
  },
  {
    id: "apo-fr-2",
    chapter: "apo-final-review",
    level: 4,
    question: "设计一个 App 启动优化的完整方案，涉及哪些章节的知识？",
    answer:
      "涉及CPU（第4章）、存储（第7章）、工具（第1章）、稳定性（第8章）四个章节。完整方案：①测量（工具章）——用CPU Profiler录制冷启动trace用Perfetto抓am轨道统计从Application.attachBaseContext到首个Activity.onWindowFocusChanged的时间。分阶段统计Application.onCreate时间、首个Activity创建+布局时间 ②定位（工具章）——CPU Profiler火焰图找onCreate中耗时方法。常见瓶颈：第三方SDK初始化（统计/推送/地图）、数据库初始化、SP首次加载、首屏布局复杂 ③优化：a)异步初始化（CPU章）——非核心SDK用协程Dispatchers.IO异步初始化核心SDK串行。b)延迟初始化（CPU章）——非首屏功能SDK用ViewStub或Handler.postDelayed延迟到首屏渲染后。c)数据库优化（存储章）——Room WAL模式预创建数据库避免首次启动建表。d)SP优化（存储章）——改用MMKV或DataStore避免SP首次全量加载。e)布局优化（布局章）——首屏ConstraintLayout扁平化非首屏ViewStub懒加载。f)预加载——闪屏页期间预加载首页数据 ④验证（工具章）——再测一次启动4s→1.5s ⑤监控（稳定性章）——线上Firebase Performance监控启动时间P90 Crashlytics监控启动Crash。",
    tags: ["启动优化", "综合应用", "异步初始化", "延迟加载"],
  },
  {
    id: "apo-fr-3",
    chapter: "apo-final-review",
    level: 3,
    question: "对比 SharedPreferences、DataStore、MMKV、Room 四种方案的适用场景和选型决策。",
    answer:
      "对比与选型：①SharedPreferences——XML KV存储commit()同步阻塞主线程apply()异步但onStop可能ANR全量写XML不支持跨进程。适用：已过时不推荐新项目 ②DataStore——Jetpack KV存储基于协程Flow全异步非阻塞增量写入Preferences DataStore简单易用但无类型安全Proto DataStore类型安全。适用：简单配置项（主题/语言/开关）Jetpack官方推荐SP替代品 ③MMKV——mmap内存映射KV写内存=写文件比SP快100倍增量更新支持跨进程。适用：高频读写（实时配置/计数器）、跨进程共享（主进程和推送进程）④Room——SQLite ORM编译期SQL检查支持协程/RxJava B+树索引/事务/WAL。适用：结构化数据（用户/订单/消息）、复杂查询（条件/排序/聚合）、大量数据。决策树：简单KV低频→DataStore；简单KV高频/跨进程→MMKV；结构化数据/复杂查询→Room；全文搜索→Room+FTS；大文件→直接文件+Glide。不要用SP做大量数据存储不要用Room做简单KV不要用MMKV做复杂查询。",
    tags: ["存储选型", "SharedPreferences", "DataStore", "MMKV", "Room"],
  },
  {
    id: "apo-fr-4",
    chapter: "apo-final-review",
    level: 4,
    question: "一个电商 App 出现「滑动卡顿+偶尔 OOM+耗电快」三个问题，如何用全书知识系统性解决？",
    answer:
      "系统性解决三步走：第一步——测量定位：①滑动卡顿——GPU Profile Rendering柱状图超16ms蓝色阶段高=measure/layout慢；Layout Inspector发现列表项7层嵌套 ②偶尔OOM——Memory Profiler发现Bitmap占60%内存图片未压缩内存锯齿=抖动 ③耗电快——Battery Historian发现WakeLock持续时间长+网络模块每分钟唤醒。第二步——分维度优化：①布局优化（布局章）——ConstraintLayout扁平化到3层ViewStub懒加载头部移除多余背景减少过度绘制 ②渲染优化（渲染章）——RecyclerView DiffUtil精确刷新setHasFixedSize(true)预取开启onBindViewHolder不做耗时操作Paint对象复用消除内存抖动 ③内存优化（内存章）——Glide替代手动decode+override按需加载+RGB_565降色深LruCache缓存Bitmap onTrimMemory主动释放LeakCanary检测Activity泄漏 ④CPU优化（CPU章）——列表数据异步加载用协程Dispatchers.IO图片解码移到IO线程 ⑤功耗优化（CPU章）——WakeLock改用WorkManager管理网络请求批量处理移除定时轮询改用FCM推送 ⑥网络优化（网络章）——商品图片CDN+WebP压缩多级缓存减少重复请求 ⑦稳定性（稳定性章）——Crashlytics监控OOM Choreographer监控帧率WatchDog监控ANR。第三步——验证监控：优化后重测帧时间28ms→8ms（60fps）内存占用降50%无锯齿耗电降40%。线上持续监控三指标确保不回退。",
    tags: ["综合应用", "系统性优化", "电商App", "全维度"],
  },
];
