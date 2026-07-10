import type { ReviewQuestion } from "./types";

export const soaAdaptivePlatformQuestions: ReviewQuestion[] = [
  {
    id: "soa-adaptive-platform-01",
    chapter: "soa-adaptive-platform",
    level: 1,
    question: "Adaptive AUTOSAR (AP) 的三层架构是什么？各层的职责是什么？",
    answer: "三层架构：① Adaptive Application (AA)——应用层，运行ADAS、座舱HMI、网关路由、OTA管理等应用，实现业务逻辑；② Functional Cluster (FC)——功能集群层，即ARA（AUTOSAR Runtime for Adaptive）基础，提供通信管理(ara::com)、执行管理(ara::exec)、诊断管理(ara::diag)、持久化、日志、时间同步等标准化服务；③ POSIX OS——操作系统层，基于Linux/QNX的PSE51子集，提供文件系统、TCP/IP协议栈、多进程调度等基础能力。",
    tags: ["AP三层架构", "AA", "FC", "ARA", "POSIX OS", "Linux", "QNX"],
  },
  {
    id: "soa-adaptive-platform-02",
    chapter: "soa-adaptive-platform",
    level: 2,
    question: "ARA 是什么？它的核心功能集群有哪些？",
    answer: "ARA（AUTOSAR Runtime for Adaptive）是AP的运行时基础，由多个功能集群(FC)组成，为应用提供标准化服务。核心FC：① 通信管理(ara::com)——SOME/IP代理、服务发现、服务接口调用；② 执行管理(ara::exec)——应用调度、状态机管理、进程生命周期控制；③ 诊断管理(ara::diag)——UDS诊断、DM诊断服务；④ 持久化(ara::per)——键值存储、文件持久化；⑤ 日志(ara::log)——结构化日志记录；⑥ 时间同步——全网时间同步；⑦ 密码学——安全存储和加密服务；⑧ 升级管理——OTA软件更新。",
    tags: ["ARA", "功能集群", "FC", "ara::com", "ara::exec", "ara::diag", "ara::per"],
  },
  {
    id: "soa-adaptive-platform-03",
    chapter: "soa-adaptive-platform",
    level: 2,
    question: "AP 的「清单驱动」配置是什么？有哪几种 Manifest？",
    answer: "清单驱动：AP通过声明式配置文件（Manifest）描述应用和机器的配置，而非硬编码，支持动态配置和灵活部署。三种Manifest：① Application Manifest——描述应用的元信息（名称、版本、依赖的FC、权限），与应用代码一起打包；② Execution Manifest——描述应用在特定机器上的执行配置（启动参数、资源限制、调度策略、服务实例配置），部署时生成；③ Machine Manifest——描述硬件机器的配置（CPU核心、内存、网络接口、可用FC），每台机器一份。清单驱动使同一应用可部署到不同机器，只需调整Execution Manifest。",
    tags: ["清单驱动", "Manifest", "Application Manifest", "Execution Manifest", "Machine Manifest", "动态配置"],
  },
  {
    id: "soa-adaptive-platform-04",
    chapter: "soa-adaptive-platform",
    level: 3,
    question: "为什么 AP 选择 POSIX OS 而非 AUTOSAR OS？这对车载软件开发有什么影响？",
    answer: "选择POSIX OS的原因：① 高性能计算——ADAS/座舱需要AI推理、图像处理等高算力任务，POSIX OS（Linux/QNX）支持多核并行和多进程；② 动态性——POSIX支持动态内存分配、动态加载库、运行时进程创建，AP需要动态服务发现和软件更新；③ 生态丰富——Linux有丰富的开源库和工具链（Docker、Python等），加速开发；④ 标准化API——POSIX标准API可移植，不同OS（Linux/QNX）上层应用代码可复用。影响：① 开发模式变化——从CP的配置驱动变为AP的代码驱动+清单配置，开发更灵活；② 安全挑战——动态内存和多进程引入安全风险，需通过隔离、监控、ASIL分解等方式保障安全；③ CP+AP共存——实时控制仍由CP保障，AP负责高性能计算，两者通过SOME/IP通信。",
    tags: ["POSIX OS", "Linux", "QNX", "动态内存", "多进程", "CP+AP", "安全挑战", "开发模式"],
  },
];
