"use client";

import { MicroservicesPatternsLab } from "./official-microservices-patterns-lab";

const config = {
  unitTitle: "第7章 在微服务架构中实现查询",
  focus:
    "在服务各自拥有数据库的前提下比较API组合与CQRS，设计可重建、可追踪延迟和面向查询的数据视图",
  nodes: [
    "7.1 使用API组合模式进行查询",
    "7.2 使用CQRS模式",
    "7.3 设计CQRS视图",
    "7.4 实现基于AWS DynamoDB的CQRS视图",
  ],
  invariant:
    "查询不能绕过服务API直接联表；CQRS视图可从源事件重建并公开新鲜度，API组合在部分失败时返回明确而非伪造完整结果",
  failure:
    "把共享只读数据库伪装成查询服务会破坏数据所有权；忽略事件缺口和乱序的CQRS视图则会长期返回无法解释的旧数据",
  patterns: [
    {
      label: "API组合",
      problem: "查询分散在少量服务",
      mechanism: "并行调用后合并响应",
      evidence: "扇出延迟与部分失败",
    },
    {
      label: "CQRS",
      problem: "高价值查询跨越多服务数据",
      mechanism: "事件维护专用查询视图",
      evidence: "消费水位与视图新鲜度",
    },
    {
      label: "物化视图重建",
      problem: "视图损坏或模式变化",
      mechanism: "从受控偏移全量重放",
      evidence: "源事件数与投影版本",
    },
    {
      label: "缺口检测",
      problem: "消息可能乱序或遗漏",
      mechanism: "按聚合版本发现并暂停修复",
      evidence: "连续版本和隔离队列",
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

export function Msp07ImplementingQueriesPatternLab() {
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

export function Msp07ImplementingQueriesFailureLab() {
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

export function Msp07ImplementingQueriesEvidenceLab() {
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
