import type { ReviewQuestion } from "./types";

export const aalPerformanceAdvancedQuestions: ReviewQuestion[] = [
  {
    id: "aal-pa-1",
    chapter: "aal-performance-advanced",
    level: 2,
    question: "Android应用冷启动优化的核心策略有哪些？异步初始化如何实现？",
    answer: "冷启动优化核心策略：①异步初始化——将Application.onCreate()中的初始化任务按依赖关系拆分，无依赖的任务并行执行，有依赖的任务按拓扑排序串行执行。实现：使用TaskScheduler或启动框架（如阿里Alpha、美团LaunchTime），将每个初始化任务封装为Task，声明依赖关系，框架自动调度线程池并行执行；②延迟初始化——非首屏必需的SDK延迟到首屏显示后初始化，使用Handler.postDelayed或IdleHandler在主线程空闲时执行；③多阶段初始化——首屏所需SDK在onCreate()中同步初始化，二级页面SDK在首页onResume()后初始化，三级SDK在首页空闲时初始化；④避免I/O阻塞——文件读取、数据库操作、网络请求放到子线程；⑤SplashScreen优化——使用WindowBackground设置启动主题，避免白屏闪现；⑥减少Application逻辑——将非必要逻辑移到Lazy类中按需加载。关键指标：冷启动时间（从进程创建到首帧渲染），使用Systrace/Perfetto分析启动瓶颈。",
    tags: ["冷启动", "异步初始化", "TaskScheduler", "启动优化"]
  },
  {
    id: "aal-pa-2",
    chapter: "aal-performance-advanced",
    level: 2,
    question: "Android内存泄漏的常见场景有哪些？如何检测和修复？",
    answer: "常见内存泄漏场景：①静态引用——静态变量持有Activity/View/Context引用，Activity销毁后无法回收；②内部类——非静态内部类（如Handler、Runnable、AsyncTask）隐式持有外部类（Activity）引用，如果任务未完成则Activity泄漏；③注册未注销——BroadcastReceiver、ContentObserver、EventBus等注册后未在onDestroy中注销；④动画——属性动画未cancel，Animator持有View引用；⑤单例——单例对象持有Context，应使用ApplicationContext；⑥资源未关闭——Cursor、InputStream、File等未close。检测方法：①LeakCanary——自动监控Activity/Fragment销毁后的引用链，在Debug时弹出泄漏通知，显示完整引用路径；②Android Profiler Memory——实时查看内存分配和GC，dump Hprof分析；③MAT（Memory Analyzer Tool）——分析Hprof文件，查找GC Root引用链，定位泄漏对象。修复：弱引用替代强引用（如WeakReference<Activity>）、使用静态内部类+WeakReference、确保onDestroy中注销和cancel、使用ApplicationContext。",
    tags: ["内存泄漏", "LeakCanary", "MAT", "GC Root", "弱引用"]
  },
  {
    id: "aal-pa-3",
    chapter: "aal-performance-advanced",
    level: 2,
    question: "ANR（Application Not Responding）的产生原因和触发条件是什么？如何分析和预防？",
    answer: "ANR产生原因：主线程做了耗时操作导致无法及时响应输入事件或组件生命周期回调。触发条件：①Activity——主线程5秒内未响应输入事件（KeyEvent/TouchEvent）；②BroadcastReceiver——onReceive()执行超过10秒（前台）或60秒（后台）；③Service——onCreate()/onStartCommand()/onBind()执行超过20秒（前台）或200秒（后台）；④ContentProvider——publish超时10秒。常见耗时操作：数据库I/O、文件读写、网络请求、大量计算、SharedPreferences.commit()（同步写磁盘）、JSON解析大文件。分析方法：①traces.txt——ANR发生时系统自动生成/data/anr/traces.txt，包含所有线程的堆栈信息，定位主线程阻塞位置；②logcat——搜索ANR in关键字查看触发原因；③StrictMode——开发期检测主线程I/O和网络操作。预防：①所有耗时操作放到子线程；②使用AsyncTask/HandlerThread/线程池/协程处理后台任务；③SharedPreferences用apply()替代commit()（异步写）；④数据库操作用Room+协程；⑤网络请求用Retrofit+OkHttp异步回调。",
    tags: ["ANR", "主线程阻塞", "traces.txt", "StrictMode", "耗时操作"]
  },
  {
    id: "aal-pa-4",
    chapter: "aal-performance-advanced",
    level: 3,
    question: "Android渲染优化的策略有哪些？如何保证60fps的流畅度？",
    answer: "渲染优化策略：①减少过度绘制——移除不必要的背景，使用`@color/transparent`，开发者选项中查看GPU过度绘制（蓝色可接受，红色需优化）；②减少布局层级——使用ConstraintLayout替代多层嵌套的LinearLayout/RelativeLayout，用merge标签消除根布局冗余层级，include复用布局，ViewStub懒加载不可见View；③避免每帧创建对象——onDraw()中不要new对象（Paint/Path/Rect），改为成员变量复用，减少GC频率；④硬件加速——默认开启硬件加速（HardwareRenderer），通过DisplayList批量提交GPU绘制命令，避免软件绘制；⑤Layer层优化——对复杂动画的View设置hardware layer（setLayerType(LAYER_TYPE_HARDWARE)），将绘制结果缓存为GPU纹理，动画时只需变换纹理不需重绘；⑥Choreographer帧率监控——通过Choreographer.FrameCallback监控每帧耗时，超过16.67ms（60fps）记录掉帧；⑦避免主线程阻塞——确保measure/layout/draw在16ms内完成，主线程不要做耗时操作。60fps保障：每帧16.67ms，measure+layout+draw+合成+VSync必须在16.67ms内完成，否则掉帧卡顿。",
    tags: ["渲染优化", "过度绘制", "布局层级", "60fps", "硬件加速", "Choreographer"]
  }
];
