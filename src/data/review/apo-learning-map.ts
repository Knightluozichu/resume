import type { ReviewQuestion } from "./types";

export const apoLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "apo-lm-1",
    chapter: "apo-learning-map",
    level: 1,
    question: "《Android应用性能优化》全书的知识体系结构和递进逻辑是什么？",
    answer:
      "全书分为九个章节（含学习地图和全书复习），覆盖八大优化维度：①性能分析工具——Android Studio Profiler（CPU/Memory/Network）、Perfetto（替代Systrace的系统级trace）、Layout Inspector（层级检查）、GPU Profile Rendering（帧时间分析）；②布局优化——ConstraintLayout扁平化、include+merge复用、ViewStub懒加载、过度绘制消除；③内存优化——LeakCanary泄漏检测、GC机制调优、Bitmap采样压缩、LruCache缓存、对象池复用；④CPU与功耗优化——主线程异步化、线程池管理、锁竞争优化、Doze模式适配、JobScheduler/WorkManager批处理、WakeLock管理；⑤渲染与UI优化——16ms法则、VSync驱动渲染管线、三重缓冲、Choreographer帧监控、硬件加速与硬件层、RecyclerView优化；⑥网络优化——DNS（HTTPDNS）、TCP（连接池/HTTP2）、TLS（Session复用）、数据压缩（Gzip/Protobuf）、多级缓存、弱网降级；⑦存储优化——SharedPreferences/DataStore/MMKV/SQLite/Room选型、事务批量写入、WAL模式、索引优化；⑧稳定性与监控——ANR/Crash/OOM防护、Crashlytics崩溃收集、线上性能监控、WatchDog。递进逻辑：先用工具学会测量和定位，再逐个维度深入优化（布局→内存→CPU→渲染→网络→存储），最后是稳定性保障和线上监控，形成完整的优化闭环。",
    tags: ["知识体系", "八大维度", "递进逻辑", "全书概览"],
  },
  {
    id: "apo-lm-2",
    chapter: "apo-learning-map",
    level: 2,
    question: "性能优化的核心原则是什么？为什么不能盲目优化？",
    answer:
      "核心原则是「先测量再优化」。性能优化必须有数据支撑：先用Profiler/Perfetto量化性能指标（帧率、内存占用、CPU使用率、耗电量），再定位瓶颈所在（布局层级太深？内存泄漏？主线程耗时操作？），然后针对性优化，最后再测一次验证效果。不能盲目优化的原因：①过早优化浪费开发时间——在功能未稳定时优化可能白费 ②没有测量就不知道瓶颈在哪，可能优化了错误的地方——如以为是布局问题实际是内存抖动导致GC ③优化可能有副作用（如内存换速度、精度换性能），需要权衡 ④没有验证就无法确认优化是否有效——有些「优化」反而可能变慢 ⑤优化是一个迭代过程，需要持续测量监控而非一次性工作。全书的方法论是：测量→定位→优化→验证→监控的闭环。",
    tags: ["优化原则", "先测量再优化", "方法论"],
  },
  {
    id: "apo-lm-3",
    chapter: "apo-learning-map",
    level: 3,
    question: "用一次完整的性能优化流程串联全书知识体系。",
    answer:
      "场景：App启动慢且滑动卡顿。①测量——用Android Studio Profiler录制启动trace，发现主线程有3秒磁盘IO；用GPU Profile Rendering发现滑动时帧时间28ms（超16ms，蓝色阶段高）；Memory Profiler发现Activity泄漏和Bitmap占60%内存 ②定位——CPU Profiler火焰图找到热点方法loadBitmapFromDisk()；Layout Inspector发现列表项7层嵌套；LeakCanary确认静态变量持有Activity ③优化——布局：ConstraintLayout扁平化到3层，ViewStub懒加载头部；内存：修泄漏（静态内部类+WeakReference），Glide替代手动decode+override(200,200)按需加载，LruCache缓存Bitmap；CPU：磁盘IO移到Dispatchers.IO协程；渲染：RecyclerView DiffUtil精确刷新，Paint对象复用消除内存抖动，setHasFixedSize(true) ④验证——再测一次，启动4s→1.5s，帧时间28ms→8ms（60fps），内存占用降50%无锯齿 ⑤监控——接入Crashlytics监控OOM率，Choreographer监控线上帧率，onTrimMemory主动释放缓存。闭环完成。",
    tags: ["综合应用", "完整流程", "功能串联"],
  },
  {
    id: "apo-lm-4",
    chapter: "apo-learning-map",
    level: 2,
    question: "八大优化维度之间有什么内在联系和交叉点？",
    answer:
      "内在联系：①性能分析工具是地基——没有工具就无法测量和定位，所有优化无从谈起 ②布局与渲染是用户感知层——布局层级影响measure/layout/draw时间，渲染管线决定帧率 ③内存与CPU是系统资源层——内存泄漏导致GC频繁进而卡顿，CPU热点阻塞主线程导致ANR ④网络与存储是数据层——网络延迟影响数据加载速度，存储IO影响启动和读写 ⑤稳定性与监控是保障层——ANR/Crash/OOM是性能问题的极端表现，线上监控形成闭环。交叉点：布局×渲染=层级深度影响绘制耗时（measure/layout递归次数）；内存×渲染=Bitmap占内存影响GC频率进而影响帧率；内存×稳定性=泄漏累积导致OOM；CPU×稳定性=主线程阻塞导致ANR；CPU×功耗=计算和唤醒频率决定耗电；网络×存储=网络数据缓存到本地减少重复请求；存储×内存=大文件读取占内存导致OOM；渲染×工具=GPU Rendering柱状图检测帧率。一条主线：所有性能问题最终通过工具测量定位，优化后验证，线上监控闭环。",
    tags: ["交叉关系", "维度联系", "系统观"],
  },
];
