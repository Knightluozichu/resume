import type { ReviewQuestion } from "./types";

export const dakFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "dak-review-1",
    chapter: "dak-final-review",
    level: 1,
    question: `全书七大领域之间的关联和依赖关系是什么？请列举至少四组关联。`,
    answer: `七大领域关联和依赖：①架构×Init——Linux Kernel层启动init进程，理解五层架构才能定位Init在系统中的角色；②Init×Binder——system_server由Zygote fork后启动AMS/PMS/WMS，这些服务通过Binder注册到ServiceManager，Init是Binder通信前置条件（ServiceManager由init启动）；③Binder×AMS——AMS运行在system_server中，App通过Binder与AMS交互调度组件，Binder是组件调度通信基础；④Handler×AMS——Activity生命周期回调通过Handler在主线程消息循环执行，ANR本质是主线程消息处理超时；⑤AMS×WMS——Activity启动时AMS通过WMS添加窗口，两者协作完成Activity从创建到显示；⑥AMS×PMS——AMS启动组件时通过PMS查询组件信息，包管理是组件调度前提；⑦架构×音频摄像头——AudioFlinger/CameraService遵循五层分层解耦设计，App通过Binder跨进程调用mediaserver。一条主线：架构分层→系统启动→Binder通信→消息驱动→组件调度→窗口显示→包管理→媒体服务。`,
    tags: ["知识图谱", "章节关联", "依赖关系", "全书复习"],
  },
  {
    id: "dak-review-2",
    chapter: "dak-final-review",
    level: 2,
    question: `Android内核设计的四大心智模型分别是什么？如何运用？`,
    answer: `四大心智模型：①分层解耦思维——五层架构（System Apps/Java API Framework/Native & ART/HAL/Linux Kernel）每层有明确职责，上层调用下层稳定接口，下层可替换（HAL屏蔽厂商差异），用户/内核空间通过syscall隔离。运用：定位问题先判断属于哪一层（App/Framework/Runtime/HAL/Kernel）；②跨进程思维——四大组件运行在不同进程，system_server/mediaserver/App各自独立进程，所有跨进程通信用Binder。运用：分析组件交互时考虑进程边界，大数据走共享内存，ServiceManager是服务发现中心；③消息驱动思维——主线程基于Looper/MessageQueue消息循环，所有UI操作在消息循环中执行，阻塞=ANR。运用：分析性能问题关注主线程消息队列，耗时操作移子线程，Handler内存泄漏因Looper生命周期最长；④服务化思维——核心服务在独立进程通过Binder+ServiceManager提供服务。运用：system_server崩溃=系统重启，mediaserver崩溃只影响媒体服务。综合运用：先分层判断层级，再跨进程分析边界，再消息驱动检查主线程，再服务化定位服务。`,
    tags: ["心智模型", "分层解耦", "跨进程", "消息驱动", "服务化"],
  },
  {
    id: "dak-review-3",
    chapter: "dak-final-review",
    level: 2,
    question: `面对实际系统问题（如App启动慢、UI卡顿、内存不足），如何综合运用全书知识分析？`,
    answer: `综合分析框架：①App启动慢——涉及Init+AMS+PMS。路径：a)PMS层面——dex2oat是否完成AOT编译，未编译DEX运行时JIT影响速度；b)Init/Zygote层面——fork+COW应快速完成，检查预加载资源是否充足；c)AMS层面——创建ProcessRecord调度Activity，检查是否有组件阻塞；d)App层面——Application.onCreate和Activity.onCreate初始化是否耗时，是否在主线程执行I/O。②UI卡顿（掉帧）——涉及Handler+WMS。路径：a)WMS/View层面——measure/layout/draw是否耗时（布局层级深/绘制复杂），硬件加速是否生效（DisplayList+RenderThread），VSync是否对齐（16.67ms预算）；b)Handler层面——主线程消息队列是否有耗时消息阻塞Traversal回调（数据库/I/O），SyncBarrier是否正常让绘制优先；c)Choreographer层面——doFrame中INPUT/ANIMATION/TRAVERSAL各阶段耗时。③内存不足——涉及AMS+PMS+架构。路径：a)AMS层面——OOM Adj是否合理，LowMemoryKiller是否从adj最大开始回收，缓存进程是否过多；b)架构层面——共享内存（ashmem/ION）是否泄漏，Surface是否及时释放；c)App层面——Handler内存泄漏、Bitmap未回收、静态变量持有Context。框架：分层判断领域→跨进程分析边界→消息驱动检查主线程→服务化定位服务。`,
    tags: ["问题分析", "App启动慢", "UI卡顿", "内存不足", "综合运用"],
  },
  {
    id: "dak-review-4",
    chapter: "dak-final-review",
    level: 3,
    question: `从架构设计角度，Android内核设计有哪些值得学习的设计模式？`,
    answer: `值得学习的设计模式：①分层架构模式——五层分层每层稳定接口可替换实现安全隔离，HAL层是经典应用（厂商实现可替换上层接口不变）。学习点：接口与实现分离，依赖抽象而非具体；②C/S架构模式——Client通过Binder跨进程调用Server，Proxy-Stub对开发者透明。学习点：远程调用封装为本地接口隐藏通信细节；③享元模式——Message复用池（sPool）避免频繁创建/回收对象。学习点：对象池复用减少GC压力；④观察者模式——Broadcast广播机制、ContentObserver数据变化监听。学习点：解耦事件发布者和订阅者；⑤单例模式——ServiceManager全局唯一（handle=0），Looper每线程一个（ThreadLocal）。学习点：全局唯一资源管理；⑥工厂模式——Zygote作为进程工厂fork+COW快速创建。学习点：预加载资源+写时复制提升创建效率；⑦管线模式——Camera2 Pipeline模型、AudioFlinger MixerThread管线。学习点：数据流式处理各阶段解耦；⑧代理模式——Binder Proxy代理远程对象。学习点：代理控制访问、远程透明；⑨命令模式——Message封装为对象Handler处理。学习点：请求封装为对象实现队列/延迟。最核心的设计思想是分层解耦——从五层架构到HAL到Proxy-Stub到C/S，处处体现"稳定接口+可替换实现+隔离"原则，这是大型系统设计的通用范式。`,
    tags: ["设计模式", "分层架构", "C/S架构", "享元模式", "工厂模式", "代理模式", "架构设计"],
  },
];
