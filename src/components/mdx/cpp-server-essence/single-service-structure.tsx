"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "接入连接",
    mechanism: "acceptor 只建立 session 与初始限制，不承载业务工作。",
    failure: "接入线程做 DNS、鉴权或数据库调用，监听队列被拖死。",
    evidence: "accept latency、backlog 与 session 数。",
  },
  {
    label: "执行请求",
    mechanism:
      "decoder 产生 typed request，worker 在明确超时和并发预算内调用业务。",
    failure: "session 锁覆盖慢调用，单个请求阻塞同连接全部工作。",
    evidence: "queue time、锁等待、deadline 与 trace span。",
  },
  {
    label: "回包清理",
    mechanism: "响应按连接写队列串行化，关闭时取消 pending work。",
    failure: "多个线程并发写 socket，断连后任务继续持有 session。",
    evidence: "写队列深度、取消日志与析构断言。",
  },
];

export function SingleServiceArchitectureLab() {
  return (
    <ChapterDecisionLab
      title="单服务请求路径与模块责任"
      prompt="选择请求阶段，检查 acceptor、session、业务执行和回包是否拥有清楚边界。"
      stages={STAGES}
      conclusion="单服务结构的好坏由请求路径是否可追踪、状态是否单一归属、慢依赖是否受控来判断。"
    />
  );
}

export function SingleServiceArchitectureMechanismMap() {
  return (
    <ChapterMechanismMap title="单服务请求路径与模块责任" stages={STAGES} />
  );
}

export function SingleServiceArchitectureFailureDiagram() {
  return (
    <ChapterFailureMatrix title="单服务请求路径与模块责任" stages={STAGES} />
  );
}
