import type { ReviewQuestion } from "./types";

export const soaVehicleArchitectureQuestions: ReviewQuestion[] = [
  {
    id: "soa-vehicle-architecture-01",
    chapter: "soa-vehicle-architecture",
    level: 1,
    question: `车载软件架构经历了哪四个演进阶段？各阶段的核心特征是什么？`,
    answer: `四阶段：① 分布式ECU（2010年前）——100+ECU，1功能=1ECU，CAN/LIN总线，信号级通信，紧耦合；② 域集中（2015-2020）——5-10域控制器，CAN/CAN-FD+部分以太网，信号+服务混合；③ 区域集中（2020-2025）——3-5区域控制器，车载以太网主干，SOME/IP服务通信，SOA架构；④ 中央计算（2025+）——1中央大脑+区域，高速以太网，SOA+云原生，AP+CP融合。`,
    tags: ["架构演进", "分布式ECU", "域集中", "区域集中", "中央计算"],
  },
  {
    id: "soa-vehicle-architecture-02",
    chapter: "soa-vehicle-architecture",
    level: 2,
    question: `Classic AUTOSAR (CP) 与 Adaptive AUTOSAR (AP) 有什么核心区别？`,
    answer: `核心区别：① 定位——CP面向传统控制类ECU（车身/动力），AP面向高性能ECU（ADAS/座舱）；② 操作系统——CP用OSEK OS（实时、无动态内存），AP用POSIX OS（Linux/QNX，支持动态内存和多进程）；③ 配置方式——CP为静态配置，AP为清单驱动动态配置；④ 通信——CP为信号通信（CAN/LIN/FlexRay），AP为服务通信（SOME/IP over以太网）；⑤ 算力——CP适合低算力MCU，AP适合高算力SoC。`,
    tags: ["Classic AUTOSAR", "Adaptive AUTOSAR", "CP", "AP", "对比"],
  },
  {
    id: "soa-vehicle-architecture-03",
    chapter: "soa-vehicle-architecture",
    level: 2,
    question: `推动车载软件架构从分布式向中央计算演进的核心驱动因素有哪些？`,
    answer: `四大驱动因素：① 算力集中——高算力SoC替代多个低算力MCU，集中处理降低硬件成本和布线复杂度；② 软件复杂度——ADAS、智能座舱等功能指数级增长，分布式架构无法管理复杂软件；③ OTA升级——车辆需要软件可更新，SOA的松耦合和动态发现支持增量更新；④ 功能安全——集中式架构更易实现系统级安全监控和ASIL合规。SOA贯穿整个演进过程，是区域集中和中央计算架构的技术基座。`,
    tags: ["驱动因素", "算力集中", "软件复杂度", "OTA", "功能安全", "SOA"],
  },
  {
    id: "soa-vehicle-architecture-04",
    chapter: "soa-vehicle-architecture",
    level: 3,
    question: `在AP+CP融合架构中，CP和AP如何分工互补？请举例说明。`,
    answer: `分工互补：CP负责实时控制和安全监控（如车身控制、动力控制、制动系统），保证硬实时和ASIL-D安全等级；AP负责高性能计算和服务通信（如ADAS感知决策、座舱HMI、网关路由），支持AI算法和动态服务编排。两者通过以太网SOME/IP通信互连。举例：在自动驾驶域控中，AP运行感知融合算法和路径规划（需高算力、动态内存），将控制指令通过SOME/IP发给CP执行实时车辆控制（如转向、制动），CP同时监控安全状态并在异常时触发降级策略。这种融合兼顾了实时安全与高性能灵活的需求。`,
    tags: ["AP+CP融合", "分工互补", "实时控制", "高性能计算", "SOME/IP", "域控"],
  },
];
