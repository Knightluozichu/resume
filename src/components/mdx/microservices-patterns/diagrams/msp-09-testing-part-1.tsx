"use client";

import { MicroservicesPatternsLab } from "./official-microservices-patterns-lab";

const config = {
  unitTitle: "第9章 微服务架构中的测试策略（上）",
  focus:
    "用测试金字塔和部署流水线确定反馈层级，并为实体、值对象、Saga、领域服务、控制器与消息处理器建立单元测试",
  nodes: ["9.1 微服务架构中的测试策略概述", "9.2 为服务编写单元测试"],
  invariant:
    "大多数业务失败在快速、确定、隔离的单元测试中被发现；测试替身只替代真正边界，不把实现细节固化成脆弱断言",
  failure:
    "依赖慢速端到端测试验证所有规则会导致反馈延迟和定位困难；过度mock内部对象则让重构破坏测试而真实协作仍未验证",
  patterns: [
    {
      label: "测试金字塔",
      problem: "测试成本和反馈速度差异巨大",
      mechanism: "底层多、上层少地分配测试",
      evidence: "各层数量、耗时和失败定位",
    },
    {
      label: "孤立单元测试",
      problem: "领域规则需毫秒级反馈",
      mechanism: "替换外部端口并直接驱动对象",
      evidence: "确定性与分支覆盖",
    },
    {
      label: "Saga状态机测试",
      problem: "分布式流程失败路径多",
      mechanism: "枚举回复、超时和补偿转移",
      evidence: "每个状态与命令集合",
    },
    {
      label: "处理器幂等测试",
      problem: "消息会重复交付",
      mechanism: "重复输入并断言副作用一次",
      evidence: "去重记录与业务状态",
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

export function Msp09TestingPart1PatternLab() {
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

export function Msp09TestingPart1FailureLab() {
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

export function Msp09TestingPart1EvidenceLab() {
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
