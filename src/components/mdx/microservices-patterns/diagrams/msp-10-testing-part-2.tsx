"use client";

import { MicroservicesPatternsLab } from "./official-microservices-patterns-lab";

const config = {
  unitTitle: "第10章 微服务架构中的测试策略（下）",
  focus:
    "逐层验证持久化与通信适配器、消费者驱动契约、服务组件和少量端到端旅程，形成可定位的测试证据链",
  nodes: ["10.1 编写集成测试", "10.2 编写组件测试", "10.3 端到端测试"],
  invariant:
    "服务可在隔离环境证明自身契约与业务行为，消费者和提供者对同一契约版本达成一致；端到端测试只承担无法由低层证明的关键连接",
  failure:
    "共享一个不稳定测试环境并让所有团队依赖端到端套件，会产生偶发失败、排队和责任不清；只测provider示例又会遗漏真实consumer假设",
  patterns: [
    {
      label: "持久化集成测试",
      problem: "ORM映射和查询无法靠mock证明",
      mechanism: "在真实数据库边界运行夹具",
      evidence: "迁移、约束和查询结果",
    },
    {
      label: "消费者驱动契约",
      problem: "提供者不了解真实消费者假设",
      mechanism: "消费者发布契约供提供者重放",
      evidence: "契约兼容矩阵",
    },
    {
      label: "组件测试",
      problem: "需要验证完整服务而非全系统",
      mechanism: "真实启动服务并桩化外部依赖",
      evidence: "入口到持久状态的轨迹",
    },
    {
      label: "端到端冒烟",
      problem: "最终连接仍需少量证明",
      mechanism: "覆盖关键旅程而非所有分支",
      evidence: "稳定性、耗时与故障归属",
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

export function Msp10TestingPart2PatternLab() {
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

export function Msp10TestingPart2FailureLab() {
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

export function Msp10TestingPart2EvidenceLab() {
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
