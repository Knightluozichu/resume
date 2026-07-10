import type { ReviewQuestion } from "./types";

export const adaePerformanceOptimizeQuestions: ReviewQuestion[] = [
  {
    id: "adae-po-1",
    chapter: "adae-performance-optimize",
    level: 2,
    question: `如何优化布局层级？include/merge/ViewStub各起什么作用？`,
    answer:
      `布局优化目标：减少层级（降低measure/layout递归深度，每多一层measure/layout时间翻倍）。手段：①减少嵌套——用ConstraintLayout（约束布局，可扁平化复杂布局）替代多层嵌套的LinearLayout/RelativeLayout，RelativeLayout本身measure两次也要慎用。②include——复用布局片段，把公共部分（如标题栏）抽成独立XML用<include layout/>引入，减少重复。但include会多一层根ViewGroup。③merge——作为include的根标签，消除include带来的多余一层ViewGroup，<merge>本身不生成View，其子View直接加到父容器。④ViewStub——延迟加载，ViewStub是一个轻量占位（0尺寸不参与measure/layout），需要时调setVisibility(VISIBLE)或inflate()才真正加载布局，适合「不常用」的UI（如错误页、加载更多），避免一开始就inflate浪费。⑤其他：避免过度绘制（同位置多层不透明背景叠加，用开发者选项「调试GPU过度绘制」检测，目标≤2x），用<Space>代替空Margin占位。原则：层级越浅越快，能用扁平约束就别套娃。`,
    tags: ["布局优化", "include", "merge", "ViewStub", "ConstraintLayout"],
  },
  {
    id: "adae-po-2",
    chapter: "adae-performance-optimize",
    level: 3,
    question: `Android内存泄漏的常见原因有哪些？如何排查和预防？`,
    answer:
      `常见内存泄漏原因（长生命周期对象持有短生命周期对象导致无法回收）：①静态持有Context/View——static变量或单例持有Activity/View，Activity销毁后仍被引用无法回收。②内部类隐式引用——非静态内部类（含匿名内部类如Handler、Runnable、AsyncTask）隐式持有外部Activity引用，若任务未完成（如延迟Handler消息未移除）则Activity泄漏。应改静态内部类+WeakReference，或onDestroy调removeCallbacksAndMessages。③未注销资源——BroadcastReceiver/EventBus/ContentObserver注册后未unregister，传感器/监听未释放。④动画未取消——属性动画无限循环未cancel，持View导致泄漏。⑤静态集合累积——static Map/List只加不清。排查：①LeakCanary——自动监控Activity/Fragment销毁后是否被引用，dump heap分析引用链，开发期必备。②Android Studio Profiler——Heap Dump查看对象持有链，Memory Monitor看内存曲线。③MAT——分析hprof找GC Root引用链。预防：短生命周期对象用弱/软引用，onDestroy清理回调/动画/监听，单例用Application Context，用WeakReference包装Handler持有的Activity。onTrimMemory响应系统内存压力主动释放缓存。`,
    tags: ["内存泄漏", "LeakCanary", "静态引用", "内部类", "排查"],
  },
  {
    id: "adae-po-3",
    chapter: "adae-performance-optimize",
    level: 2,
    question: `OOM（OutOfMemoryError）常见于什么场景？如何加载大Bitmap避免OOM？`,
    answer:
      `OOM常见场景：①加载大Bitmap——一张图解码到内存=宽×高×每个像素字节数（ARGB_8888=4字节），高分辨率原图直接decode易超内存。②长列表累积——ListView/RecyclerView缓存大量Bitmap。③内存泄漏长期累积——泄漏导致可用堆越来越少最终OOM。加载大Bitmap避免OOM的核心是「采样压缩」：①先读尺寸不读像素——BitmapFactory.Options设inJustDecodeBounds=true，decode后只拿到outWidth/outHeight不分配像素内存。②计算采样率——根据目标显示尺寸（ImageView的宽高）算inSampleSize = 2的幂（原图/目标取对数），如原图4000×3000显示200×150则inSampleSize=16。③真正解码——inJustDecodeBounds=false，用inSampleSize decode得到压缩后的Bitmap。④像素格式——inPreferredConfig=RGB_565（2字节/像素）比ARGB_8888（4字节）省一半，无透明通道时可用。⑤缓存——LruCache内存缓存+磁盘缓存（DiskLruCache），避免重复decode。⑥及时回收——旧Bitmap用recycle()（旧版本），页面销毁清缓存。⑦大图区域显示用BitmapRegionDecoder。这套 BitmapFactory采样+LruCache是图片加载库（Glide/Picasso）的底层原理。`,
    tags: ["OOM", "Bitmap", "inSampleSize", "采样压缩", "LruCache"],
  },
  {
    id: "adae-po-4",
    chapter: "adae-performance-optimize",
    level: 2,
    question: `什么是ANR？常见的ANR类型和阈值是什么？如何避免？`,
    answer:
      `ANR（Application Not Responding）应用无响应：系统在主线程长时间无法响应用户输入或系统消息时弹出强制关闭/等待对话框。类型与阈值：①输入事件超时——主线程5秒内未处理完输入事件（触摸/按键）。②BroadcastReceiver超时——前台广播10秒、后台广播60秒未onReceive完成。③Service超时——前台Service 20秒、后台Service 200秒未执行完。④ContentProvider超时——publish 10秒。常见原因：①主线程做耗时操作——IO（文件/数据库读写）、网络请求、CPU密集计算（JSON解析/大Bitmap解码）放主线程。②主线程被锁阻塞——synchronized等锁、sleep/wait。③Binder调用阻塞——主线程同步调跨进程方法对方慢。避免：①耗时操作切子线程——用协程/线程池/AsyncTask，主线程只做UI。②StrictMode——开发期开启检测主线程的磁盘/网络违规（detectDiskReads/detectNetwork）。③异步Binder——跨进程调用用oneway或异步。④优化布局——避免主线程measure/layout耗时。⑤避免主线程持锁。排查：ANR时系统生成traces.txt（/data/anr/），可看各线程栈定位卡在哪个方法；用BlockCanary监控主线程卡顿。本质：保证主线程消息链路顺畅，任何阻塞超阈值都触发ANR。`,
    tags: ["ANR", "主线程", "阈值", "StrictMode", "耗时操作"],
  },
];
