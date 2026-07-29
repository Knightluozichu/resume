"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "资源与线程",
    mechanism: "对象 owner、线程池和同步不变量在启动时就确定。",
    failure: "session 生命周期越过线程池关闭，或锁保护范围不明。",
    evidence: "owner graph、线程 dump 与 shutdown 测试。",
  },
  {
    label: "字节与协议",
    mechanism: "socket 状态、缓冲游标和 frame decoder 共同解释请求进度。",
    failure: "把超时归因于网络，却没有确认连接状态和未完成 frame。",
    evidence: "pcap、buffer metrics 与协议 trace。",
  },
  {
    label: "服务与恢复",
    mechanism: "模块边界、依赖超时、重试和可观测性形成故障闭环。",
    failure: "告警只能说明失败，不能关联版本、请求和恢复动作。",
    evidence: "distributed trace、配置版本与演练记录。",
  },
];

export function CppServerFinalReviewLab() {
  return (
    <ChapterDecisionLab
      title="从一条请求完成服务器整书验收"
      prompt="选择事故面，检查 owner、状态迁移和证据能否串起九章内容。"
      stages={STAGES}
      conclusion="整书验收要求同一条请求从构建产物到恢复过程都可追踪；任何无法定位责任和状态的环节都不能算完成。"
    />
  );
}

export function CppServerFinalReviewMechanismMap() {
  return (
    <ChapterMechanismMap title="从一条请求完成服务器整书验收" stages={STAGES} />
  );
}

export function CppServerFinalReviewFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="从一条请求完成服务器整书验收"
      stages={STAGES}
    />
  );
}
