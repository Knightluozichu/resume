import type { ReviewQuestion } from "./types";

export const soaSoaFundamentalsQuestions: ReviewQuestion[] = [
  {
    id: "soa-soa-fundamentals-01",
    chapter: "soa-soa-fundamentals",
    level: 1,
    question: "SOA 的六大核心原则是什么？简要说明每个原则的含义。",
    answer: "六大原则：① 松耦合（Loose Coupling）——服务间依赖最小化，接口解耦；② 契约优先（Contract First）——先定义接口契约再实现服务逻辑；③ 可重用（Reusability）——服务可跨场景跨平台复用；④ 自治性（Autonomy）——服务独立部署与版本管理；⑤ 无状态（Statelessness）——服务不保存调用方状态，每次调用自包含；⑥ 可发现（Discoverability）——服务可在运行时动态注册和查找。",
    tags: ["六大原则", "松耦合", "契约优先", "可重用", "自治性", "无状态", "可发现"],
  },
  {
    id: "soa-soa-fundamentals-02",
    chapter: "soa-soa-fundamentals",
    level: 2,
    question: "传统信号通信与 SOA 服务通信有什么核心区别？",
    answer: "核心区别：① 耦合方式——传统信号通信发送方/接收方紧耦合、硬编码，SOA服务通信提供方/消费方通过接口契约松耦合；② 通信粒度——传统为信号级（1对1/1对多广播），SOA为服务级（请求/响应、发布/订阅、字段读写）；③ 配置方式——传统为静态配置，变更需全链路重配，SOA支持动态发现和运行时编排；④ 适用场景——传统适合小型固定ECU网络，SOA适合大型动态域控/中央计算架构。",
    tags: ["信号通信", "服务通信", "松耦合", "动态发现", "对比"],
  },
  {
    id: "soa-soa-fundamentals-03",
    chapter: "soa-soa-fundamentals",
    level: 2,
    question: "SOA 与 OOP（面向对象编程）有什么本质区别？",
    answer: "本质区别：① 封装粒度——OOP封装数据和行为到对象（进程内），SOA封装能力到服务（跨进程跨ECU）；② 通信方式——OOP通过方法调用（进程内直接调用），SOA通过网络消息通信（跨进程跨ECU）；③ 耦合程度——OOP对象间通过继承/组合强耦合，SOA服务间通过接口契约松耦合；④ 生命周期——OOP对象由运行时管理（同进程内创建销毁），SOA服务独立部署可独立版本管理。SOA可视为OOP在网络层面的延伸和泛化。",
    tags: ["SOA", "OOP", "封装", "通信方式", "对比"],
  },
  {
    id: "soa-soa-fundamentals-04",
    chapter: "soa-soa-fundamentals",
    level: 3,
    question: "为什么「契约优先」是SOA的关键原则？在车载软件开发中它如何体现？",
    answer: "契约优先的关键性：接口契约是服务提供方与消费方之间唯一的耦合点，先定义契约可确保双方独立开发、并行迭代，降低集成风险。车载开发中的体现：① IDL接口定义——使用Franca IDL或ARXML先定义服务接口（方法签名、事件、字段），再生成Proxy/Skeleton桩代码；② 工具链驱动——配置工具根据IDL自动生成序列化代码和通信框架，避免手写错误；③ 供应商协作——OEM和Tier1以接口契约为协作基准，各自实现各自测试；④ 版本管理——接口版本化（Major/Minor Version），保证向后兼容。契约优先是车载SOA实现软硬件解耦和供应商互操作的技术基础。",
    tags: ["契约优先", "IDL", "接口定义", "工具链", "供应商协作", "版本管理"],
  },
];
