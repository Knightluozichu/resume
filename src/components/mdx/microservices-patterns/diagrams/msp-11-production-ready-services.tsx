"use client";

import { MicroservicesPatternsLab } from "./official-microservices-patterns-lab";

const config = {
  unitTitle: "第11章 开发面向生产环境的微服务应用",
  focus:
    "把安全、外部化配置、健康检查、日志、追踪、指标、异常与审计纳入服务契约，并用微服务基底复用横切能力",
  nodes: [
    "11.1 开发安全的服务",
    "11.2 设计可配置的服务",
    "11.3 设计可观测的服务",
    "11.4 使用微服务基底模式开发服务",
  ],
  invariant:
    "生产服务的每个请求都可验证主体与权限、追溯配置版本并关联日志/跨度/指标；健康信号表达真实依赖边界且不泄露敏感信息",
  failure:
    "复制粘贴安全与可观测代码会在服务间漂移；把存活探针等同业务就绪会让故障实例继续接流量或形成重启循环",
  patterns: [
    {
      label: "外部化配置",
      problem: "环境差异不应重建制品",
      mechanism: "版本化配置在运行时注入",
      evidence: "制品哈希与配置版本",
    },
    {
      label: "健康检查API",
      problem: "平台需要判断实例是否接流量",
      mechanism: "分别暴露存活、就绪与启动状态",
      evidence: "探针结果和真实依赖",
    },
    {
      label: "分布式追踪",
      problem: "一次请求跨越多个服务",
      mechanism: "传播trace/span上下文",
      evidence: "入口到终态的完整跨度",
    },
    {
      label: "微服务基底",
      problem: "横切能力在服务间重复",
      mechanism: "受治理的库或模板提供默认能力",
      evidence: "版本采用率和漂移检测",
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

export function Msp11ProductionReadyServicesPatternLab() {
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

export function Msp11ProductionReadyServicesFailureLab() {
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

export function Msp11ProductionReadyServicesEvidenceLab() {
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
