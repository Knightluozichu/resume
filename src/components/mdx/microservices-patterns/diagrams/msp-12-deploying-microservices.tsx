"use client";

import { MicroservicesPatternsLab } from "./official-microservices-patterns-lab";

const config = {
  unitTitle: "第12章 部署微服务应用",
  focus:
    "比较语言包、虚拟机、容器和Serverless四类部署模式，并以Kubernetes、零停机发布、服务网格和Lambda落实选择",
  nodes: [
    "12.1 部署模式：编程语言特定的发布包格式",
    "12.2 部署模式：将服务部署为虚拟机",
    "12.3 部署模式：将服务部署为容器",
    "12.4 使用Kubernetes部署FTGO应用程序",
    "12.5 部署模式：Serverless部署",
    "12.6 使用AWS Lambda和AWS Gateway部署RESTful服务",
  ],
  invariant:
    "每个服务制品、运行身份、资源、配置和版本可追踪且可独立回退；部署完成与发布接流量分离，失败版本不会继续扩大影响",
  failure:
    "仅看到容器Running或函数上传成功就宣布发布完成，会遗漏就绪、迁移、流量、业务指标和回退验证；共享运行时也可能让服务互相耗尽资源",
  patterns: [
    {
      label: "语言特定包",
      problem: "追求最高密度和快速启动",
      mechanism: "同主机运行多个语言进程",
      evidence: "资源隔离与版本冲突",
    },
    {
      label: "服务即虚拟机",
      problem: "需要强隔离和成熟基础设施",
      mechanism: "每实例一个不可变VM镜像",
      evidence: "启动时间与镜像追溯",
    },
    {
      label: "服务即容器",
      problem: "需要轻量可移植部署单元",
      mechanism: "镜像加编排器调度",
      evidence: "镜像签名、就绪与资源",
    },
    {
      label: "Serverless",
      problem: "事件驱动且负载突发",
      mechanism: "托管函数按调用伸缩",
      evidence: "冷启动、并发和成本",
    },
  ],
  gates: [
    "初版目录、ISBN与版本边界",
    "问题、约束、解决方案与后继模式",
    "主体、数据所有权与契约版本",
    "超时、重复、乱序与部分失败反例",
    "日志、追踪、指标、消息与状态轨迹",
    "业务对账、停止、恢复、回退与责任人",
  ],
} as const;

export function Msp12DeployingMicroservicesPatternLab() {
  return (
    <MicroservicesPatternsLab
      {...config}
      nodes={[...config.nodes]}
      patterns={[...config.patterns]}
      gates={[...config.gates]}
      mode="pattern"
    />
  );
}

export function Msp12DeployingMicroservicesFailureLab() {
  return (
    <MicroservicesPatternsLab
      {...config}
      nodes={[...config.nodes]}
      patterns={[...config.patterns]}
      gates={[...config.gates]}
      mode="failure"
    />
  );
}

export function Msp12DeployingMicroservicesEvidenceLab() {
  return (
    <MicroservicesPatternsLab
      {...config}
      nodes={[...config.nodes]}
      patterns={[...config.patterns]}
      gates={[...config.gates]}
      mode="evidence"
    />
  );
}
