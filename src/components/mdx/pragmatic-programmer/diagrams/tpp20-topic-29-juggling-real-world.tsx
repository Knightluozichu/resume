"use client";

import { useState } from "react";

import { Tpp20DedicatedFrame } from "./tpp20-dedicated-frame";

const unitId = "tpp20-topic-29-juggling-real-world";
const c = {
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
};

const handlers = {
  overwrite: {
    label: "最后到达覆盖状态",
    events: [
      ["E1 seq=1", "PICKED_UP", "到达 10:01", c.success],
      ["E3 seq=3", "DELIVERED", "到达 10:03", c.warning],
      ["E2 seq=2", "IN_TRANSIT", "迟到 10:05", c.danger],
      ["E2 duplicate", "IN_TRANSIT", "重投 10:06", c.danger],
    ],
    states: ["PICKED_UP", "DELIVERED", "IN_TRANSIT", "IN_TRANSIT"],
    final: "包裹从已送达倒退为运输中；重复事件再次触发通知",
    color: c.danger,
  },
  machine: {
    label: "按状态机 + sequence 裁决",
    events: [
      ["E1 seq=1", "PICKED_UP", "0→1 接受", c.success],
      ["E3 seq=3", "DELIVERED", "缺 seq=2，暂存", c.warning],
      ["E2 seq=2", "IN_TRANSIT", "1→2 接受；随后重放 E3", c.success],
      ["E2 duplicate", "IN_TRANSIT", "seq<=3，幂等忽略", c.accent],
    ],
    states: ["PICKED_UP", "PICKED_UP + pending E3", "DELIVERED", "DELIVERED"],
    final: "状态单调到 DELIVERED；通知按 event id/transition id 只发一次",
    color: c.success,
  },
} as const;
type HandlerId = keyof typeof handlers;

export function Tpp20Topic29JugglingRealWorldSystemLab() {
  const [id, setId] = useState<HandlerId>("overwrite");
  const handler = handlers[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 29 专属解剖图 · PKG-42 的乱序扫描"
      title="DELIVERED 之后迟到的 IN_TRANSIT 会让状态倒退吗？"
      description="固定 E1、E3、E2 和 E2 重投的真实到达顺序，只改变处理器是否执行状态迁移、sequence 等待与事件去重。"
      kind="real-world-parcel-state-machine"
      reset={() => setId("overwrite")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-2">
          {(Object.keys(handlers) as HandlerId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {handlers[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 lg:grid-cols-4">
          {handler.events.map(([event, kind, decision, color], index) => (
            <div
              key={event}
              className="relative rounded-control border bg-bg p-3"
              style={{ borderColor: color }}
            >
              <code className="text-xs font-semibold" style={{ color }}>
                {event}
              </code>
              <strong className="mt-2 block text-sm">{kind}</strong>
              <p className="mt-1 text-xs leading-5 text-secondary">
                {decision}
              </p>
              <code className="mt-2 block text-xs">
                state={handler.states[index]}
              </code>
              {index < 3 && (
                <span
                  className="absolute -right-3 top-1/2 hidden text-lg lg:block"
                  style={{ color }}
                  aria-hidden="true"
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: handler.color }}
        >
          {handler.final}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const transitions = {
  valid: {
    label: "合法：IN_TRANSIT → DELIVERED",
    before: "state=IN_TRANSIT；lastSeq=2",
    event: "E3 seq=3 DELIVERED at hub=SHA-4",
    checks: [
      ["event id unseen", "E3 不在 inbox", c.success],
      ["sequence consecutive", "3 = 2+1", c.success],
      ["transition allowed", "IN_TRANSIT → DELIVERED", c.success],
    ],
    after: "state=DELIVERED；lastSeq=3；notification N-3",
    color: c.success,
  },
  impossible: {
    label: "非法：CREATED → DELIVERED",
    before: "state=CREATED；lastSeq=0",
    event: "E3 seq=1 DELIVERED（上游丢了两次扫描）",
    checks: [
      ["event id unseen", "E3 不在 inbox", c.success],
      ["sequence consecutive", "1 = 0+1", c.success],
      ["transition allowed", "CREATED → DELIVERED 不允许", c.danger],
    ],
    after: "保持 CREATED；E3 quarantine=INVALID_TRANSITION",
    color: c.danger,
  },
  terminal: {
    label: "非法：DELIVERED → IN_TRANSIT",
    before: "state=DELIVERED；lastSeq=3",
    event: "E4 seq=4 IN_TRANSIT（设备离线缓存）",
    checks: [
      ["event id unseen", "E4 不在 inbox", c.success],
      ["sequence consecutive", "4 = 3+1", c.success],
      ["transition allowed", "DELIVERED 是终态", c.danger],
    ],
    after: "保持 DELIVERED；E4 标记 stale-device-event",
    color: c.warning,
  },
} as const;
type TransitionId = keyof typeof transitions;

export function Tpp20Topic29JugglingRealWorldFeedbackLab() {
  const [id, setId] = useState<TransitionId>("valid");
  const transition = transitions[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 29 专属实验 · 事件与状态迁移是两份合同"
      title="sequence 连续并不代表领域迁移一定合法"
      description="选择合法、跨级或终态倒退事件。处理器依次核对 event id、sequence 与允许迁移，首个失败决定隔离原因。"
      kind="real-world-transition-contract"
      reset={() => setId("valid")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(transitions) as TransitionId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {transitions[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <code className="rounded-control border border-border bg-bg p-3 text-xs">
            before: {transition.before}
          </code>
          <code className="rounded-control border border-border bg-bg p-3 text-xs">
            event: {transition.event}
          </code>
        </div>
        <div className="mt-3 grid gap-2 md:grid-cols-3">
          {transition.checks.map(([check, evidence, color], index) => (
            <div
              key={check}
              className="rounded-control border bg-bg p-3"
              style={{ borderColor: color }}
            >
              <span className="text-xs font-semibold" style={{ color }}>
                {index + 1}. {check}
              </span>
              <strong className="mt-2 block text-sm">{evidence}</strong>
            </div>
          ))}
        </div>
        <code
          className="mt-3 block rounded-control border bg-bg p-3 text-xs"
          style={{ borderColor: transition.color, color: transition.color }}
        >
          after: {transition.after}
        </code>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const recovery = {
  drop: {
    label: "故障：缺前序时直接丢弃",
    arrival: [
      "E1 seq=1 accepted",
      "E3 seq=3 arrives",
      "E3 marked invalid and deleted",
      "E2 seq=2 arrives",
    ],
    pending: "无",
    final: "state=IN_TRANSIT；lastSeq=2",
    evidence: "E3 原始载荷已丢，无法知道包裹其实已送达",
    color: c.danger,
  },
  pending: {
    label: "等待区：保留 E3",
    arrival: [
      "E1 seq=1 accepted",
      "E3 seq=3 → pending(expected=2)",
      "E2 seq=2 accepted",
      "pending E3 replayed",
    ],
    pending: "E3 payload + firstSeen + source device",
    final: "state=DELIVERED；lastSeq=3",
    evidence: "E2/E3 各执行一次；pending age 4 min 被记录",
    color: c.success,
  },
  timeout: {
    label: "前序一直不到：超时升级",
    arrival: [
      "E1 seq=1 accepted",
      "E3 seq=3 → pending",
      "等待 30 min",
      "expected seq=2 still missing",
    ],
    pending: "E3 转 quarantine=MISSING_PREDECESSOR",
    final: "state=PICKED_UP；lastSeq=1",
    evidence: "告警包含 PKG-42、device D-7、missing seq=2 和 E3 载荷",
    color: c.warning,
  },
} as const;
type RecoveryId = keyof typeof recovery;

export function Tpp20Topic29JugglingRealWorldEvidenceLab() {
  const [id, setId] = useState<RecoveryId>("drop");
  const scenario = recovery[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 29 专属复核 · 缺少前序事件的恢复"
      title="E3 比 E2 先到时，是删除、等待还是最终隔离？"
      description="比较直接丢弃、等待重放和前序超时。乱序支持必须保存真实事件与等待期限，不能无限缓存。"
      kind="real-world-out-of-order-recovery"
      reset={() => setId("drop")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(recovery) as RecoveryId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {recovery[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 md:grid-cols-4">
          {scenario.arrival.map((event, index) => (
            <div
              key={event}
              className="relative rounded-control border bg-bg p-3"
              style={{ borderColor: scenario.color }}
            >
              <span
                className="text-xs font-semibold"
                style={{ color: scenario.color }}
              >
                {index + 1}
              </span>
              <strong className="ml-2 text-sm">{event}</strong>
              {index < 3 && (
                <span
                  className="absolute -right-3 top-1/2 hidden text-lg md:block"
                  style={{ color: scenario.color }}
                  aria-hidden="true"
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {[
            ["等待/隔离", scenario.pending],
            ["最终状态", scenario.final],
            ["证据", scenario.evidence],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-control border border-border bg-bg p-3"
            >
              <span className="text-xs font-semibold text-secondary">
                {label}
              </span>
              <p className="mt-1 text-sm leading-5">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </Tpp20DedicatedFrame>
  );
}
