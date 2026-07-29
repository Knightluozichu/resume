"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "接收事件",
    mechanism: "event loop 把可读 fd 分派给连接读处理器。",
    failure: "只看 accept/read 函数，不确认事件注册和触发模式。",
    evidence: "事件表、fd 状态与调用路径。",
  },
  {
    label: "解析执行",
    mechanism: "输入缓冲允许半包与多命令，完整命令才进入执行。",
    failure: "把一次 read 当一条命令，忽略协议增量解析。",
    evidence: "query buffer 游标、RESP frame 与命令 trace。",
  },
  {
    label: "发送回复",
    mechanism: "回复先进入输出缓冲，需要时注册可写事件并处理短写。",
    failure: "大回复或慢客户端让缓冲无限增长。",
    evidence: "output buffer、client limit 与 writable 注册变化。",
  },
];

export function RedisEventLoopLab() {
  return (
    <ChapterDecisionLab
      title="Redis 网络事件从 fd 到命令执行"
      prompt="沿事件循环检查监听、读缓冲、命令解析、回复队列和可写事件。"
      stages={STAGES}
      conclusion="源码阅读必须把函数名放回事件循环与数据结构；否则看到的是局部实现，解释不了吞吐和延迟。"
    />
  );
}

export function RedisEventLoopMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Redis 网络事件从 fd 到命令执行"
      stages={STAGES}
    />
  );
}

export function RedisEventLoopFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Redis 网络事件从 fd 到命令执行"
      stages={STAGES}
    />
  );
}
