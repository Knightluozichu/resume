import type { ReviewQuestion } from "./types";

export const davFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "dav-fr-1",
    chapter: "dav-final-review",
    level: 2,
    question: "对比AMS、WMS、PMS三大核心服务的职责边界和协作关系。",
    answer: "AMS：组件调度（Activity栈/四大组件）+进程管理（OOM Adj/LMK/ANR）。WMS：窗口管理（层级树/Z-order/Surface）+View绘制（measure/layout/draw）+输入分发（InputDispatcher）。PMS：包管理（APK解析/安装六步/权限/签名/dex2oat）。协作：Activity启动时App→AMS.startActivity→AMS查PMS组件信息→AMS请求Zygote fork→ActivityThread→AMS通过WMS.addWindow添加窗口→WMS分配Surface+注册输入焦点。AMS/WMS/PMS同在system_server进程内可直接方法调用协作。",
    tags: ["AMS", "WMS", "PMS", "职责边界", "协作关系"],
  },
  {
    id: "dav-fr-2",
    chapter: "dav-final-review",
    level: 3,
    question: "贯穿全书的两条核心主线是什么？它们如何在各章节交汇？",
    answer: "主线一Binder通信：卷I Java层（IBinder/Binder/AIDL Proxy-Stub/ServiceManager Java）→卷II Native层（BpBinder/BBinder/IPCThreadState/binder驱动mmap一次拷贝/ServiceManager C++/BC_BR协议）→卷III核心服务基于Binder。交汇点：Java transact()→JNI→BpBinder.transact()→ioctl→驱动→BBinder.onTransact()。主线二启动流程：init解析init.rc→启动ServiceManager+Zygote→Zygote预加载+fork system_server→system_server启动AMS/WMS/PMS→AMS请求Zygote fork应用进程。交汇点：卷I ZygoteInit(Java)与卷II Zygote Native(app_main.cpp)共同构成Zygote机制。",
    tags: ["Binder主线", "启动主线", "跨章节交汇", "知识整合"],
  },
  {
    id: "dav-fr-3",
    chapter: "dav-final-review",
    level: 3,
    question: "综合三卷知识，分析应用启动卡顿可能涉及的各层原因。",
    answer: "卷I Java层：ZygoteInit preload不足/ClassLoader加载dex慢/Application.onCreate耗时初始化/Binder Java频繁跨进程。卷II Native层：Zygote fork+COW异常/init启动服务延迟/Binder mmap性能/属性set阻塞。卷III核心服务：AMS的OOM Adj计算错误导致应用被杀/Activity栈调度延迟/PMS的dex2oat编译不足导致运行时JIT慢/WMS窗口添加和首帧绘制延迟。综合定位：用systrace分析各阶段耗时，卡在fork查卷II，卡在onCreate查卷I，卡在AMS调度查卷III。",
    tags: ["综合分析", "应用启动", "卡顿", "三卷整合"],
  },
  {
    id: "dav-fr-4",
    chapter: "dav-final-review",
    level: 2,
    question: "各核心服务的进程归属和通信方式是什么？为什么这样设计？",
    answer: "init(PID=1)用Socket（不依赖Binder避免循环依赖）。servicemanager用Binder+handle=0硬编码（作为Binder服务查询入口）。Zygote用Socket（fork后子进程不能有Binder线程避免状态不一致）。system_server(AMS/WMS/PMS)用Binder向App提供服务（高频跨进程，一次拷贝性能优；同进程内直接方法调用便于协作）。mediaserver用Binder+ashmem共享内存（独立进程故障隔离；音频大数据用ashmem零拷贝）。设计原则：关键路径用Binder、进程创建用Socket、大数据用共享内存、故障隔离用独立进程、引导服务用简单机制。",
    tags: ["进程归属", "通信方式", "设计原则", "选型矩阵", "Socket", "Binder", "ashmem"],
  },
];
