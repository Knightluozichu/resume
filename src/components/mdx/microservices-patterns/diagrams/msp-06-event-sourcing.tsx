"use client";

import { MicroservicesPatternsLab } from "./official-microservices-patterns-lab";

const config = {
  unitTitle: "第6章 使用事件溯源开发业务逻辑",
  focus:
    "把聚合持久化为不可变事件流，处理并发、快照、幂等和事件演化，并把事件溯源与两类Saga协调方式组合",
  nodes: [
    "6.1 使用事件溯源开发业务逻辑",
    "6.2 实现事件存储库",
    "6.3 同时使用Saga和事件溯源",
  ],
  invariant:
    "任一聚合状态都能由有序事件流确定性重放；并发追加由期望版本保护，旧事件在模式演化后仍可读取，副作用消费保持幂等",
  failure:
    "把事件当可随意修改的日志、让重放代码访问外部系统或忽略事件版本，会使历史状态不可重现并破坏审计与恢复",
  patterns: [
    {
      label: "事件溯源",
      problem: "需要完整历史和可靠发布",
      mechanism: "以事件序列而非当前行保存聚合",
      evidence: "重放结果与线上状态一致",
    },
    {
      label: "乐观并发",
      problem: "多个命令并发修改同一聚合",
      mechanism: "追加时校验期望版本",
      evidence: "冲突可检测且不丢更新",
    },
    {
      label: "快照",
      problem: "长事件流重放成本过高",
      mechanism: "周期保存状态加最后事件版本",
      evidence: "快照校验与回退重放",
    },
    {
      label: "事件上转换",
      problem: "历史事件模式持续演化",
      mechanism: "读取时转换旧版本或采用容忍读取",
      evidence: "全历史重放通过",
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

export function Msp06EventSourcingPatternLab() {
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

export function Msp06EventSourcingFailureLab() {
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

export function Msp06EventSourcingEvidenceLab() {
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
