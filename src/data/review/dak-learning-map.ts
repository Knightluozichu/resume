import type { ReviewQuestion } from "./types";

export const dakLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "dak-lm-1",
    chapter: "dak-learning-map",
    level: 1,
    question: "《深入理解Android内核设计思想》全书的知识体系分为哪几个核心领域？递进逻辑是什么？",
    answer: "全书覆盖八大核心领域：①架构总览（五层架构、分层解耦）；②Init启动（init/Zygote/system_server启动流程）；③Binder通信（一次拷贝、Proxy-Stub、ServiceManager）；④Handler线程（Looper/MessageQueue消息循环、ANR）；⑤AMS组件（四大组件调度、OOM Adj）；⑥WMS窗口（Window/Surface、measure/layout/draw、VSync）；⑦PMS包管理（APK解析、六步安装、权限签名）；⑧音频摄像头（AudioFlinger/CameraService、HAL管线）。递进逻辑：先从系统架构理解全局分层，再深入Init理解进程创建，然后Binder理解跨进程通信，接着Handler理解消息驱动，之后AMS/WMS/PMS三大核心服务，最后音频摄像头理解媒体服务架构。",
    tags: ["学习地图", "知识体系", "全书概览"],
  },
  {
    id: "dak-lm-2",
    chapter: "dak-learning-map",
    level: 2,
    question: "Android内核设计的四大核心心智模型分别是什么？",
    answer: "四大核心心智模型：①分层解耦——Android五层架构（System Apps/Java API Framework/Native & ART/HAL/Linux Kernel），每层稳定接口、可替换实现（HAL屏蔽厂商差异）、安全隔离（用户/内核空间通过syscall隔离）；②跨进程通信——四大组件运行在不同进程，system_server/mediaserver/App各自独立进程，所有跨进程通信用Binder；③消息驱动——主线程基于Looper/MessageQueue消息循环，所有UI操作在消息循环中执行，阻塞=ANR；④服务化——核心服务在独立进程通过Binder+ServiceManager提供服务。",
    tags: ["心智模型", "分层解耦", "Binder", "消息驱动"],
  },
  {
    id: "dak-lm-3",
    chapter: "dak-learning-map",
    level: 2,
    question: "全书各章节之间存在哪些交叉关联？请列举至少三组关联。",
    answer: "交叉关联：①架构×Init——Linux Kernel层启动init进程，理解五层架构才能定位Init；②Init×Binder——system_server由Zygote fork后启动AMS/PMS/WMS，通过Binder注册到ServiceManager；③Binder×AMS——AMS运行在system_server，App通过Binder与AMS交互，Binder是组件调度基础；④Handler×AMS——Activity生命周期回调通过Handler在主线程执行，ANR是消息处理超时；⑤AMS×WMS——Activity启动时AMS通过WMS添加窗口；⑥AMS×PMS——AMS启动组件时通过PMS查询组件信息；⑦架构×音频摄像头——AudioFlinger/CameraService遵循分层解耦设计。",
    tags: ["章节关联", "知识体系"],
  },
  {
    id: "dak-lm-4",
    chapter: "dak-learning-map",
    level: 3,
    question: "贯穿全书的核心主线是什么？从架构设计角度如何理解这条主线？",
    answer: "核心主线：架构分层 → 系统启动 → Binder通信 → 消息驱动 → 组件调度 → 窗口显示 → 包管理 → 媒体服务。从架构设计角度理解：①架构分层是基础——五层每层稳定接口，为后续所有设计提供分层解耦的骨架；②系统启动建立进程体系——init/Zygote/system_server创建进程，为Binder通信提供进程基础；③Binder通信连接各进程——跨进程通信是组件调度和服务化的前提；④消息驱动保证UI响应——主线程消息循环驱动所有UI操作和生命周期回调；⑤组件调度是核心业务——AMS统一管理四大组件；⑥窗口显示完成用户交互——WMS/View/VSync将组件呈现给用户；⑦包管理提供安装入口——PMS解析APK注册组件；⑧媒体服务扩展能力——音频摄像头遵循同样的分层+C/S模式。每个领域层层递进、相互依赖。",
    tags: ["核心主线", "架构设计", "系统性认知"],
  },
];
