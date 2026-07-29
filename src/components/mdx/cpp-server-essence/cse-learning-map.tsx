"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "建立进程",
    mechanism: "构建产物、资源 owner 与线程模型决定服务能否被可靠调试。",
    failure: "二进制、符号和源码不匹配，线程责任不清。",
    evidence: "build-id、启动配置、线程清单与 owner graph。",
  },
  {
    label: "处理请求",
    mechanism: "socket 状态、并发同步和协议 framing 共同决定一条消息如何完成。",
    failure: "把字节流当消息，或在持锁区执行阻塞 I/O。",
    evidence: "抓包、状态机日志、锁等待与请求 trace。",
  },
  {
    label: "恢复与演进",
    mechanism: "模块边界、重连、心跳和观测让服务在故障后恢复。",
    failure: "重试放大流量，模块共享隐式状态，告警没有定位证据。",
    evidence: "故障演练、依赖图、指标和回滚记录。",
  },
];

export function CppServerLearningMapLab() {
  return (
    <ChapterDecisionLab
      title="一条请求怎样穿过九章服务器能力"
      prompt="选择请求生命周期阶段，把语言、并发、网络、协议、服务结构和生产证据连起来。"
      stages={STAGES}
      conclusion="服务器知识只有放进请求生命周期才可用于建设和排障；任何阶段都必须同时说明 owner、状态迁移和证据。"
    />
  );
}

export function CppServerLearningMapMechanismMap() {
  return (
    <ChapterMechanismMap
      title="一条请求怎样穿过九章服务器能力"
      stages={STAGES}
    />
  );
}

export function CppServerLearningMapFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="一条请求怎样穿过九章服务器能力"
      stages={STAGES}
    />
  );
}
