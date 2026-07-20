"use client";

import { useState } from "react";

import { Tpp20DedicatedFrame } from "./tpp20-dedicated-frame";

const unitId = "tpp20-topic-35-actors-processes";
const color = {
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
};

const mailboxes = {
  normal: {
    label: "正常消息",
    queue: ["Add(id=m1, +2)", "Add(id=m2, +3)", "Get(id=q1)"],
    transitions: ["count 0 → 2", "count 2 → 5", "reply q1: Count(5)"],
    seen: "{m1,m2}",
    result: "状态始终只在 CounterActor 内改变",
    tone: color.success,
  },
  duplicate: {
    label: "重复投递",
    queue: ["Add(id=m1, +2)", "Add(id=m1, +2)", "Get(id=q1)"],
    transitions: [
      "count 0 → 2；seen m1",
      "duplicate m1 → no-op",
      "reply q1: Count(2)",
    ],
    seen: "{m1}",
    result: "幂等性由消息身份和 actor 状态共同保证",
    tone: color.accent,
  },
  unordered: {
    label: "跨发送者乱序",
    queue: ["B: Get(id=q1)", "A: Add(id=m1, +2)", "B: Get(id=q2)"],
    transitions: ["reply q1: Count(0)", "count 0 → 2", "reply q2: Count(2)"],
    seen: "{m1}",
    result: "邮箱只承诺实际入队顺序；跨发送者没有凭空的 happens-before",
    tone: color.warning,
  },
} as const;
type MailboxId = keyof typeof mailboxes;

export function Tpp20Topic35ActorsProcessesSystemLab() {
  const [id, setId] = useState<MailboxId>("normal");
  const sample = mailboxes[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 35 专属解剖图 · 单所有者计数器的邮箱"
      title="并发消息到达后，谁按什么顺序改 count？"
      description="固定 CounterActor 初始 count=0，切换正常、重复和跨发送者乱序消息。每封消息对应一条状态转移或显式 no-op。"
      kind="actors-counter-mailbox-state-machine"
      reset={() => setId("normal")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(mailboxes) as MailboxId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {mailboxes[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-control border border-border bg-bg p-3">
            <p className="text-xs font-semibold text-muted">
              Mailbox · FIFO by arrival
            </p>
            <ol className="mt-3 space-y-2">
              {sample.queue.map((message, index) => (
                <li
                  key={`${message}-${index}`}
                  className="rounded-control border p-3 text-xs"
                  style={{ borderColor: sample.tone }}
                >
                  <strong>{index + 1}</strong> · <code>{message}</code>
                </li>
              ))}
            </ol>
          </div>
          <div
            className="rounded-control border-2 bg-bg p-4"
            style={{ borderColor: sample.tone }}
          >
            <p className="text-xs font-semibold" style={{ color: sample.tone }}>
              CounterActor · private count / seenIds
            </p>
            <ol className="mt-3 grid gap-2 sm:grid-cols-3">
              {sample.transitions.map((transition, index) => (
                <li
                  key={transition}
                  className="relative rounded-control bg-surface p-3 text-xs"
                >
                  <strong>{index + 1}.</strong> {transition}
                  {index < 2 && (
                    <span
                      className="absolute -right-3 top-1/2 hidden text-lg sm:block"
                      style={{ color: sample.tone }}
                      aria-hidden="true"
                    >
                      →
                    </span>
                  )}
                </li>
              ))}
            </ol>
            <code className="mt-3 block text-xs">seenIds = {sample.seen}</code>
          </div>
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm"
          style={{ borderColor: sample.tone }}
        >
          {sample.result}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const failures = {
  resume: {
    label: "持久化后崩溃",
    message: "Add(m7,+4)",
    events: [
      "append m7 at offset 91",
      "count 8 → 12",
      "process crashes before reply",
      "supervisor restarts",
      "replay through offset 91",
      "retry m7 → prior result",
    ],
    state: "count=12 / seen contains m7",
    reply: "Added(m7, count=12)",
    rule: "先持久化事件，再回复；重启从日志重建",
    tone: color.success,
  },
  poison: {
    label: "毒消息",
    message: "Add(m8, delta=NaN)",
    events: [
      "decode message",
      "contract rejects delta",
      "record DeadLetter(m8)",
      "actor stays alive",
      "next message m9 handled",
      "sender gets rejection",
    ],
    state: "count=12 / mailbox advances",
    reply: "Rejected(m8, INVALID_DELTA)",
    rule: "输入错误不是 actor 状态崩溃；不要无限重启重放毒消息",
    tone: color.warning,
  },
  corrupt: {
    label: "状态不可信",
    message: "snapshot checksum mismatch",
    events: [
      "load snapshot offset 90",
      "checksum FAIL",
      "actor does not accept mailbox",
      "supervisor marks unhealthy",
      "restore prior snapshot + log",
      "replay then reopen mailbox",
    ],
    state: "quarantined until count rebuilt",
    reply: "Unavailable(retryAfter=2s)",
    rule: "失败边界包含私有状态；不能带着未知状态继续处理",
    tone: color.danger,
  },
} as const;
type FailureId = keyof typeof failures;

export function Tpp20Topic35ActorsProcessesFeedbackLab() {
  const [id, setId] = useState<FailureId>("resume");
  const failure = failures[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 35 专属实验 · actor 失败与监督边界"
      title="进程崩溃后，是重启、拒绝消息，还是隔离状态？"
      description="选择回复丢失、毒消息或快照损坏。监督者根据失败类型恢复，不把 restart 当成一个适用于所有故障的按钮。"
      kind="actors-supervision-recovery-timeline"
      reset={() => setId("resume")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(failures) as FailureId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {failures[key].label}
            </button>
          ))}
        </div>
        <code
          className="mt-4 block rounded-control border bg-bg p-3 text-xs"
          style={{ borderColor: failure.tone }}
        >
          trigger: {failure.message}
        </code>
        <ol className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {failure.events.map((event, index) => (
            <li
              key={event}
              className="rounded-control border border-border bg-bg p-3 text-xs"
            >
              <strong style={{ color: failure.tone }}>{index + 1}.</strong>{" "}
              {event}
            </li>
          ))}
        </ol>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <code className="rounded-control border border-border bg-bg p-3 text-xs">
            state: {failure.state}
          </code>
          <code
            className="rounded-control border bg-bg p-3 text-xs"
            style={{ borderColor: failure.tone }}
          >
            reply: {failure.reply}
          </code>
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm"
          style={{ borderColor: failure.tone }}
        >
          {failure.rule}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const contracts = {
  ask: {
    label: "Ask + deadline",
    send: "Get(q7, replyTo, deadline=120ms)",
    delivery: "at-most-one logical reply；transport may duplicate request",
    timeout: "caller receives Timeout(q7), not a fake Count(0)",
    late: "late Count(q7) is correlated then discarded",
    evidence: [
      "messageId=q7",
      "enqueuedAt=14:02:00.010",
      "handledAt=.045",
      "replyAt=.047",
    ],
    verdict: "调用方等待的是有身份、有截止时间的消息，不是同步返回值。",
    tone: color.success,
  },
  fire: {
    label: "Tell + acknowledgement",
    send: "Add(m9,+3) → no immediate return",
    delivery: "at-least-once；actor deduplicates m9",
    timeout: "sender may retry m9 without applying twice",
    late: "Added(m9,offset=92) can arrive asynchronously",
    evidence: [
      "messageId=m9",
      "attempt=2",
      "seenIds hit",
      "same result offset=92",
    ],
    verdict: "不等待不等于无契约；投递和业务执行必须分开描述。",
    tone: color.accent,
  },
  ambiguous: {
    label: "反例：像方法调用",
    send: "counter.add(3) across network",
    delivery: "unspecified",
    timeout: "unknown: not sent / queued / applied / reply lost",
    late: "no correlation id",
    evidence: [
      "HTTP 504 only",
      "no message id",
      "no actor offset",
      "retry decision guessed",
    ],
    verdict: "把远程消息伪装成本地调用，会把不确定性藏在语法后面。",
    tone: color.danger,
  },
} as const;
type ContractId = keyof typeof contracts;

export function Tpp20Topic35ActorsProcessesEvidenceLab() {
  const [id, setId] = useState<ContractId>("ask");
  const contract = contracts[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 35 专属复核 · 消息契约必须表达不确定性"
      title="超时之后，消息到底有没有执行？"
      description="对比 ask、tell 与伪装成本地方法的远程调用。证据必须回答身份、投递语义、截止时间、迟到响应与安全重试。"
      kind="actors-message-contract-evidence"
      reset={() => setId("ask")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(contracts) as ContractId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {contracts[key].label}
            </button>
          ))}
        </div>
        <code
          className="mt-4 block rounded-control border bg-bg p-3 text-xs"
          style={{ borderColor: contract.tone }}
        >
          {contract.send}
        </code>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {[
            ["投递", contract.delivery],
            ["超时", contract.timeout],
            ["迟到响应", contract.late],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-control border border-border bg-bg p-3"
            >
              <p className="text-xs font-semibold text-muted">{label}</p>
              <p className="mt-2 text-sm">{value}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {contract.evidence.map((item) => (
            <code key={item} className="rounded-control bg-surface p-3 text-xs">
              {item}
            </code>
          ))}
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm"
          style={{ borderColor: contract.tone }}
        >
          {contract.verdict}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}
