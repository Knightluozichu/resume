"use client";

import { MicroservicesPatternsLab } from "./official-microservices-patterns-lab";

const config = {
  unitTitle: "第3章 微服务架构中的进程间通信",
  focus:
    "比较同步远程调用与异步消息，建立可演化API、部分失败、发现、顺序、去重和事务性消息的完整通信契约",
  nodes: [
    "3.1 微服务架构中的进程间通信概述",
    "3.2 基于同步远程过程调用模式的通信",
    "3.3 基于异步消息模式的通信",
    "3.4 使用异步消息提高可用性",
  ],
  invariant:
    "每次跨进程交互都明确交互风格、契约版本、超时、幂等、顺序和交付语义；数据库提交与消息发布之间不存在不可解释的丢失窗口",
  failure:
    "把远程调用当本地方法并叠加无界重试，会在慢依赖时放大流量；先写数据库再发消息则会在进程崩溃窗口永久丢事件",
  patterns: [
    {
      label: "远程过程调用",
      problem: "调用方需要立即结果",
      mechanism: "REST或gRPC加超时、发现和断路器",
      evidence: "端到端延迟与超时分类",
    },
    {
      label: "异步消息",
      problem: "处理可与请求时间解耦",
      mechanism: "命令、事件和回复通过持久通道传递",
      evidence: "队列滞后、重复和死信",
    },
    {
      label: "事务性发件箱",
      problem: "数据库与消息代理无法原子双写",
      mechanism: "业务状态和待发消息同事务提交",
      evidence: "提交记录与已发布消息对账",
    },
    {
      label: "幂等消费者",
      problem: "至少一次交付产生重复",
      mechanism: "以消息ID或业务键原子去重",
      evidence: "重复注入后副作用集合不变",
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

export function Msp03InterprocessCommunicationPatternLab() {
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

export function Msp03InterprocessCommunicationFailureLab() {
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

export function Msp03InterprocessCommunicationEvidenceLab() {
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
