"use client";

import { useState } from "react";

import { Tpp20DedicatedFrame } from "./tpp20-dedicated-frame";

const unitId = "tpp20-topic-34-shared-state";
const color = {
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
};

const interleavings = {
  serial: {
    label: "串行基线",
    events: [
      ["T1", "read", "100"],
      ["T1", "write +20", "120"],
      ["T2", "read", "120"],
      ["T2", "write -30", "90"],
    ],
    cells: [
      ["t0", 100],
      ["t1", 120],
      ["t2", 120],
      ["t3", 90],
    ],
    final: "90 = 100 + 20 - 30",
    invariant: "两次更新都进入最终余额",
    tone: color.success,
  },
  race: {
    label: "竞争交错",
    events: [
      ["T1", "read", "100"],
      ["T2", "read", "100"],
      ["T1", "write +20", "120"],
      ["T2", "write -30", "70"],
    ],
    cells: [
      ["t0", 100],
      ["t1", 100],
      ["t2", 120],
      ["t3", 70],
    ],
    final: "70 ≠ 100 + 20 - 30",
    invariant: "+20 被后一次 write 覆盖（lost update）",
    tone: color.danger,
  },
  atomic: {
    label: "原子更新",
    events: [
      ["T1", "atomic add", "+20"],
      ["DB", "commit v8", "120"],
      ["T2", "atomic add", "-30"],
      ["DB", "commit v9", "90"],
    ],
    cells: [
      ["v7", 100],
      ["v8", 120],
      ["v8", 120],
      ["v9", 90],
    ],
    final: "90；更新以版本化命令提交",
    invariant: "余额只有数据库事务可以写",
    tone: color.accent,
  },
} as const;
type InterleavingId = keyof typeof interleavings;

export function Tpp20Topic34SharedStateSystemLab() {
  const [id, setId] = useState<InterleavingId>("race");
  const run = interleavings[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 34 专属解剖图 · 余额读改写的确定性交错"
      title="两条正确的算式，为什么合在一起得到 70？"
      description="固定余额 100、入账 +20、扣款 -30，只改变事件顺序或写入原语。逐格观察每个线程读到的值与数据库实际版本。"
      kind="shared-state-lost-update-interleaving"
      reset={() => setId("race")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(interleavings) as InterleavingId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {interleavings[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 overflow-x-auto rounded-control border border-border bg-bg p-4">
          <div className="min-w-[36rem]">
            <div className="grid grid-cols-4 gap-2">
              {run.events.map(([lane, action, local], index) => (
                <div
                  key={`${lane}-${action}-${index}`}
                  className="relative rounded-control border p-3"
                  style={{ borderColor: run.tone }}
                >
                  <span
                    className="text-xs font-semibold"
                    style={{ color: run.tone }}
                  >
                    {index + 1}. {lane}
                  </span>
                  <p className="mt-1 text-sm">{action}</p>
                  <code className="mt-2 block text-xs">local={local}</code>
                  {index < 3 && (
                    <span
                      className="absolute -right-3 top-1/2 text-lg"
                      style={{ color: run.tone }}
                      aria-hidden="true"
                    >
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {run.cells.map(([version, balance], index) => (
                <div
                  key={`${version}-${index}`}
                  className="rounded-control bg-surface p-3 text-center"
                >
                  <p className="text-xs text-muted">DB after {index + 1}</p>
                  <code className="mt-1 block">
                    {version}: ¥{balance}
                  </code>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <code
            className="rounded-control border bg-bg p-3 text-xs"
            style={{ borderColor: run.tone }}
          >
            final: {run.final}
          </code>
          <p className="rounded-control border border-border bg-bg p-3 text-sm">
            <strong>不变量：</strong> {run.invariant}
          </p>
        </div>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const transfers = {
  deadlock: {
    label: "各锁源账户",
    a: ["lock A ✓", "wait B…", "timeout", "rollback"],
    b: ["lock B ✓", "wait A…", "timeout", "rollback"],
    owner: "两个流程各持一半资源，形成 A→B→A 等待环",
    balances: "A=100 / B=100；无转账但占锁至超时",
    evidence: "wait-for graph: T1 → B(T2) → A(T1)",
    tone: color.danger,
  },
  ordered: {
    label: "固定锁顺序",
    a: ["lock min(A,B) ✓", "lock max(A,B) ✓", "A 100→90", "B 100→110"],
    b: ["wait A", "lock A after T1", "lock B", "B 110→90 / A 90→110"],
    owner: "所有转账按 accountId 升序拿锁，等待图不能成环",
    balances: "A=110 / B=90；总额仍为 200",
    evidence: "lock order: A < B；2 commits / 0 deadlocks",
    tone: color.success,
  },
  transaction: {
    label: "事务命令",
    a: ["Transfer(A,B,10,k1)", "validate funds", "append ledger k1", "commit"],
    b: [
      "Transfer(B,A,20,k2)",
      "serialized after k1",
      "append ledger k2",
      "commit",
    ],
    owner: "账本事务拥有余额；调用者提交命令而不持有内部锁",
    balances: "A=110 / B=90；账本可从 k1,k2 重建",
    evidence: "commit seq: 81(k1), 82(k2)；sum=200",
    tone: color.accent,
  },
} as const;
type TransferId = keyof typeof transfers;

export function Tpp20Topic34SharedStateFeedbackLab() {
  const [id, setId] = useState<TransferId>("deadlock");
  const transfer = transfers[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 34 专属实验 · 双向转账的锁所有权"
      title="A→B 与 B→A 同时发生，锁会保护还是互相扣住？"
      description="固定两个余额各 100 的账户，同时执行 10 元与 20 元反向转账。比较随手加锁、全局锁序和事务所有者。"
      kind="shared-state-transfer-lock-ownership"
      reset={() => setId("deadlock")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(transfers) as TransferId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {transfers[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            ["T1 · A→B ¥10", transfer.a],
            ["T2 · B→A ¥20", transfer.b],
          ].map(([title, events]) => (
            <div
              key={title as string}
              className="rounded-control border bg-bg p-3"
              style={{ borderColor: transfer.tone }}
            >
              <p
                className="text-xs font-semibold"
                style={{ color: transfer.tone }}
              >
                {title as string}
              </p>
              <ol className="mt-2 space-y-2">
                {(events as readonly string[]).map((event, index) => (
                  <li key={event} className="text-sm">
                    <strong>{index + 1}.</strong> {event}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
        <p className="mt-3 rounded-control border border-border bg-bg p-3 text-sm">
          <strong>所有权：</strong> {transfer.owner}
        </p>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          <code
            className="rounded-control border bg-bg p-3 text-xs"
            style={{ borderColor: transfer.tone }}
          >
            {transfer.balances}
          </code>
          <code className="rounded-control border border-border bg-bg p-3 text-xs">
            {transfer.evidence}
          </code>
        </div>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const deliveries = {
  duplicate: {
    label: "重试无幂等键",
    commands: [
      "debit A ¥30",
      "credit B ¥30",
      "reply lost",
      "client retries",
      "debit A ¥30 again",
      "credit B ¥30 again",
    ],
    balances: [40, 160],
    checks: [true, true, false],
    record: "两次提交无法区分重试与新业务",
    tone: color.danger,
  },
  idempotent: {
    label: "相同幂等键",
    commands: [
      "Transfer(k-92,A,B,30)",
      "commit seq=91",
      "reply lost",
      "client retries k-92",
      "lookup seq=91",
      "return prior result",
    ],
    balances: [70, 130],
    checks: [true, true, true],
    record: "k-92 只对应一个账本提交；重放返回同一结果",
    tone: color.success,
  },
  partial: {
    label: "反例：两次独立写",
    commands: [
      "debit A ¥30",
      "commit A=70",
      "credit B starts",
      "database timeout",
      "B stays 100",
      "manual repair needed",
    ],
    balances: [70, 100],
    checks: [false, true, false],
    record: "原子性边界只包住单账户，¥30 落在系统外",
    tone: color.warning,
  },
} as const;
type DeliveryId = keyof typeof deliveries;

export function Tpp20Topic34SharedStateEvidenceLab() {
  const [id, setId] = useState<DeliveryId>("duplicate");
  const delivery = deliveries[id];
  const invariants = ["A+B=200", "余额均不为负", "一个业务键一次提交"];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 34 专属复核 · 用账本不变量裁决并发正确性"
      title="客户端超时重试，30 元会不会再转一次？"
      description="固定 A=100、B=100 和 Transfer ¥30，只改变事务与幂等边界。保存命令序列、最终余额和逐项不变量。"
      kind="shared-state-transaction-invariant-ledger"
      reset={() => setId("duplicate")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(deliveries) as DeliveryId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {deliveries[key].label}
            </button>
          ))}
        </div>
        <ol className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {delivery.commands.map((command, index) => (
            <li
              key={command}
              className="rounded-control border border-border bg-bg p-3 text-xs"
            >
              <strong style={{ color: delivery.tone }}>{index + 1}.</strong>{" "}
              {command}
            </li>
          ))}
        </ol>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <code
            className="rounded-control border bg-bg p-3 text-sm"
            style={{ borderColor: delivery.tone }}
          >
            Account A = ¥{delivery.balances[0]}
          </code>
          <code
            className="rounded-control border bg-bg p-3 text-sm"
            style={{ borderColor: delivery.tone }}
          >
            Account B = ¥{delivery.balances[1]}
          </code>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {invariants.map((invariant, index) => (
            <p
              key={invariant}
              className="rounded-control border bg-bg p-3 text-sm"
              style={{
                borderColor: delivery.checks[index]
                  ? color.success
                  : color.danger,
              }}
            >
              <strong>{delivery.checks[index] ? "PASS" : "FAIL"}</strong> ·{" "}
              {invariant}
            </p>
          ))}
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm"
          style={{ borderColor: delivery.tone }}
        >
          {delivery.record}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}
