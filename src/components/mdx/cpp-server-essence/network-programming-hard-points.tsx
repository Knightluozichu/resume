"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "建立连接",
    mechanism: "非阻塞 connect 通过可写事件和 SO_ERROR 确认结果。",
    failure: "看到 writable 就当成连接成功，忽略异步错误。",
    evidence: "socket error、超时器与连接状态日志。",
  },
  {
    label: "收发字节",
    mechanism: "循环 read/write 到 EAGAIN，并由协议 decoder 消费完整 frame。",
    failure: "短读短写、粘包或边缘触发未排空造成停滞。",
    evidence: "缓冲区游标、抓包和系统调用 trace。",
  },
  {
    label: "关闭连接",
    mechanism: "EOF、half-close、RST 与主动 close 对应不同状态迁移。",
    failure: "把 EOF 当临时无数据，或双边同时持有悬空请求。",
    evidence: "FIN/RST 抓包、pending request 清单与关闭时序。",
  },
];

export function NetworkStateMachineLab() {
  return (
    <ChapterDecisionLab
      title="TCP 字节流与非阻塞连接状态机"
      prompt="切换 I/O 阶段，检查 read/write、半关闭和事件通知的真实语义。"
      stages={STAGES}
      conclusion="可靠网络代码不把一次系统调用等同于一条消息；所有分支都必须回到连接状态机和缓冲区不变量。"
    />
  );
}

export function NetworkStateMachineMechanismMap() {
  return (
    <ChapterMechanismMap title="TCP 字节流与非阻塞连接状态机" stages={STAGES} />
  );
}

export function NetworkStateMachineFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="TCP 字节流与非阻塞连接状态机"
      stages={STAGES}
    />
  );
}
