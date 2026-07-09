import type { ReviewQuestion } from "./types";

export const davLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "dav-lm-1",
    chapter: "dav-learning-map",
    level: 1,
    question: "《深入理解Android》（邓凡平）三卷分别覆盖什么内容？递进逻辑是什么？",
    answer: "卷I——Java Framework层（ZygoteInit/ClassLoader/插件化/JNI/Binder Java层/Context）；卷II——Native层（init/属性系统/Zygote Native/Binder驱动/ServiceManager C++/mediaserver）；卷III——核心服务深度（AMS/WMS/PMS/音频框架/Stagefright）。递进逻辑：先从卷I理解Java框架层，再从卷II深入Native底层机制，最后从卷III做核心服务源码级剖析。两条主线交汇：Binder通信（卷I Java层+卷II Native层）和启动流程（卷I+卷II的Zygote/init）。",
    tags: ["三卷递进", "知识体系", "Binder主线", "启动主线"],
  },
  {
    id: "dav-lm-2",
    chapter: "dav-learning-map",
    level: 2,
    question: "全书的核心方法论是什么？如何运用它分析实际系统问题？",
    answer: "核心方法论是源码驱动、逐层深入：①提出问题；②在AOSP中定位源码；③逐行分析（时序图+数据结构+控制流）；④关联底层机制；⑤归纳心智模型。运用举例——分析App启动慢：从卷I的ActivityThread.main和Application.onCreate查Java层耗时，从卷II的Zygote查fork+COW是否正常，从卷III的AMS查ProcessRecord调度和Activity栈，从Binder层查跨进程通信瓶颈，综合三卷知识从源码层面定位根因。",
    tags: ["源码驱动", "方法论", "综合分析"],
  },
  {
    id: "dav-lm-3",
    chapter: "dav-learning-map",
    level: 2,
    question: "贯穿全书的两条核心主线是什么？它们如何在各章节交汇？",
    answer: "主线一Binder通信：卷I Java层（IBinder/Binder/AIDL Proxy-Stub）→卷II Native层（BpBinder/BBinder/IPCThreadState/binder驱动mmap一次拷贝/ServiceManager C++）→卷III核心服务（AMS/WMS/PMS通过Binder向App提供服务）。交汇点：Java transact()→JNI→BpBinder.transact()→ioctl→驱动→BBinder.onTransact()。主线二启动流程：init解析init.rc→启动ServiceManager和Zygote→Zygote预加载+fork system_server→AMS请求Zygote fork应用进程。",
    tags: ["Binder主线", "启动主线", "跨章节关联"],
  },
  {
    id: "dav-lm-4",
    chapter: "dav-learning-map",
    level: 1,
    question: "Java Framework层与Native层通过什么机制桥接？哪个案例最能说明这一点？",
    answer: "通过JNI（Java Native Interface）桥接。MediaScanner案例最能说明：Java层声明native方法（processDirectory等），通过动态注册关联到Native层C++实现（MyMediaScanner），Native层扫描文件后通过JNI回调Java层的scanFile方法。完整展示Java→JNI→C++→JNI→Java的双向交互闭环。理解JNI是阅读卷II Native层源码（Binder、Zygote等）的前提。",
    tags: ["JNI", "MediaScanner", "Java与Native桥接"],
  },
];
