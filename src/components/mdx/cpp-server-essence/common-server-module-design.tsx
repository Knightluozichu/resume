"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "连接与重试",
    mechanism: "指数退避、抖动、上限和熔断共同控制恢复流量。",
    failure: "所有实例同步立即重连，故障依赖被重试风暴压垮。",
    evidence: "重试分布、熔断状态与依赖负载。",
  },
  {
    label: "心跳与超时",
    mechanism: "心跳区分连接存活、请求进展和业务健康，超时使用单调时钟。",
    failure: "只收到 TCP ACK 就宣布业务健康，或时钟跳变触发误杀。",
    evidence: "last-progress、deadline 与探针分层指标。",
  },
  {
    label: "日志与配置",
    mechanism: "结构化日志保留 request id，配置变更先校验再原子切换。",
    failure: "热更新留下半新半旧状态，日志缺少版本和关联键。",
    evidence: "config revision、拒绝原因、trace id 与回滚记录。",
  },
];

export function ServerModuleResilienceLab() {
  return (
    <ChapterDecisionLab
      title="重连、心跳、日志与配置模块的恢复契约"
      prompt="选择通用模块，验证它在依赖失败、配置变化和流量压力下怎样保持系统可控。"
      stages={STAGES}
      conclusion="通用模块不是工具函数集合；每个模块都要声明状态、并发模型、失败策略和可观测证据。"
    />
  );
}

export function ServerModuleResilienceMechanismMap() {
  return (
    <ChapterMechanismMap
      title="重连、心跳、日志与配置模块的恢复契约"
      stages={STAGES}
    />
  );
}

export function ServerModuleResilienceFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="重连、心跳、日志与配置模块的恢复契约"
      stages={STAGES}
    />
  );
}
