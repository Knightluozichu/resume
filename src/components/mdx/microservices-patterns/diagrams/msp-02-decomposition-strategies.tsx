"use client";

import { MicroservicesPatternsLab } from "./official-microservices-patterns-lab";

const config = {
  unitTitle: "第2章 服务的拆分策略",
  focus:
    "从系统操作、业务能力与DDD子域推导服务边界，并用内聚、耦合和API契约校验拆分结果",
  nodes: ["2.1 微服务架构到底是什么", "2.2 为应用程序定义微服务架构"],
  invariant:
    "每个系统操作都有明确入口、责任服务和数据所有者；跨服务协作不绕过API，边界变化不要求无关服务同步发布",
  failure:
    "按类、表或技术层拆分会让一个业务变化横跨多个服务并共享数据，团队无法独立交付，网络调用只放大原有耦合",
  patterns: [
    {
      label: "按业务能力拆分",
      problem: "组织需要稳定的业务责任",
      mechanism: "围绕业务能力形成服务和团队",
      evidence: "变化是否局限在一个能力",
    },
    {
      label: "按子域拆分",
      problem: "复杂领域需要模型边界",
      mechanism: "用核心、支撑、通用子域与限界上下文划界",
      evidence: "术语一致性与模型泄漏",
    },
    {
      label: "系统操作",
      problem: "需求叙述无法直接给出API",
      mechanism: "从命令和查询识别输入、结果与不变量",
      evidence: "操作到服务的完整映射",
    },
    {
      label: "绞杀式校准",
      problem: "初始边界必然不完美",
      mechanism: "保留可迁移契约并按证据调整边界",
      evidence: "跨边界变更和调用趋势",
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

export function Msp02DecompositionStrategiesPatternLab() {
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

export function Msp02DecompositionStrategiesFailureLab() {
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

export function Msp02DecompositionStrategiesEvidenceLab() {
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
