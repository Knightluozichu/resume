"use client";

import { MicroservicesPatternsLab } from "./official-microservices-patterns-lab";

const config = {
  unitTitle: "第1章 逃离单体地狱",
  focus:
    "从FTGO单体的交付困境出发，推导微服务架构的结构、收益、代价、模式语言以及组织前提",
  nodes: [
    "1.1 迈向单体地狱的漫长旅程",
    "1.2 为什么本书与你有关",
    "1.3 你会在本书中学到什么",
    "1.4 拯救之道：微服务架构",
    "1.5 微服务架构的好处和弊端",
    "1.6 微服务架构的模式语言",
    "1.7 微服务之上：流程和组织",
  ],
  invariant:
    "采用微服务必须改善大型复杂应用的持续交付能力；服务数量增加本身不是成功，独立开发、测试、部署与数据所有权才是验收事实",
  failure:
    "把单体按技术层机械切成大量网络服务，会同时保留业务耦合并增加远程调用、部署和运维成本，最终得到分布式单体",
  patterns: [
    {
      label: "单体架构",
      problem: "早期系统需要最低操作成本",
      mechanism: "一个部署单元内保持模块边界",
      evidence: "构建时间、发布频率、变更失败率",
    },
    {
      label: "微服务架构",
      problem: "大型复杂应用需要团队自治",
      mechanism: "按业务能力形成独立部署和数据所有权",
      evidence: "独立发布比例、跨服务变更数",
    },
    {
      label: "扩展立方体",
      problem: "负载与功能增长方式不同",
      mechanism: "分别选择复制、功能拆分或数据分区",
      evidence: "容量瓶颈与路由命中",
    },
    {
      label: "模式语言",
      problem: "一个决策引出后继问题",
      mechanism: "用相关模式显式连接问题与结果",
      evidence: "决策记录与反例覆盖",
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

export function Msp01EscapingMonolithicHellPatternLab() {
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

export function Msp01EscapingMonolithicHellFailureLab() {
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

export function Msp01EscapingMonolithicHellEvidenceLab() {
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
