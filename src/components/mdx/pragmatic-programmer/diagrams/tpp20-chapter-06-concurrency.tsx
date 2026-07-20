"use client";

import { useState } from "react";

import { Tpp20DedicatedFrame } from "./tpp20-dedicated-frame";

const unitId = "tpp20-chapter-06-concurrency";
const color = {
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
};

const schedules = {
  coupled: {
    label: "按代码顺序串行",
    lanes: [
      ["读取账户", 0, 80, "account#42", color.accent],
      ["查询库存", 80, 120, "stock=1", color.success],
      ["风险评分", 200, 150, "risk=0.14", color.warning],
      ["计算运费", 350, 100, "fee=12", color.accent],
      ["提交订单", 450, 70, "order#A91", color.success],
    ],
    total: "520 ms",
    dependency: "只有提交依赖前四项；前三个查询彼此并不依赖。",
    verdict: "语句相邻不等于必须同时发生；这里多等了 250 ms。",
    tone: color.warning,
  },
  independent: {
    label: "按真实依赖并发",
    lanes: [
      ["读取账户", 0, 80, "account#42", color.accent],
      ["查询库存", 0, 120, "stock=1", color.success],
      ["风险评分", 0, 150, "risk=0.14", color.warning],
      ["计算运费", 0, 100, "fee=12", color.accent],
      ["提交订单", 150, 70, "order#A91", color.success],
    ],
    total: "220 ms",
    dependency: "查询以同一不可变 CheckoutInput 启动；join 后才提交。",
    verdict: "去掉时域耦合，同时保留数据依赖和明确的汇合点。",
    tone: color.success,
  },
  premature: {
    label: "错误：提交也并发",
    lanes: [
      ["读取账户", 0, 80, "account#42", color.accent],
      ["查询库存", 0, 120, "stock=1", color.success],
      ["风险评分", 0, 150, "risk=0.91 blocked", color.danger],
      ["计算运费", 0, 100, "fee=12", color.accent],
      ["提交订单", 20, 70, "charged before risk", color.danger],
    ],
    total: "150 ms（错误结果）",
    dependency: "提交读取尚未产生的 risk，违反事实依赖。",
    verdict: "并发不是越多越好；必须先画 happens-before，再切分。",
    tone: color.danger,
  },
} as const;
type ScheduleId = keyof typeof schedules;

export function Tpp20Chapter06ConcurrencySystemLab() {
  const [id, setId] = useState<ScheduleId>("coupled");
  const schedule = schedules[id];

  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="第 6 章专属解剖图 · 结账任务的 happens-before"
      title="哪些动作真的必须等前一步，哪些只是写在后面？"
      description="固定同一订单和每项耗时，切换串行、按依赖并发与过度并发。时间轴直接显示开始时刻、持续时间和产物。"
      kind="concurrency-checkout-happens-before"
      reset={() => setId("coupled")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(schedules) as ScheduleId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {schedules[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 overflow-x-auto rounded-control border border-border bg-bg p-4">
          <div className="min-w-[38rem] space-y-3">
            <div className="ml-28 grid grid-cols-6 text-xs text-muted">
              <span>0</span>
              <span>100</span>
              <span>200</span>
              <span>300</span>
              <span>400</span>
              <span>500 ms</span>
            </div>
            {schedule.lanes.map(([name, start, duration, output, tone]) => (
              <div
                key={name}
                className="grid grid-cols-[6.5rem_1fr] items-center gap-2"
              >
                <span className="text-right text-xs font-semibold">{name}</span>
                <div className="relative h-10 rounded-control bg-surface">
                  <div
                    className="absolute top-1 flex h-8 items-center rounded-control px-2 text-xs font-semibold text-bg"
                    style={{
                      left: `${(Number(start) / 520) * 100}%`,
                      width: `${Math.max(10, (Number(duration) / 520) * 100)}%`,
                      background: tone,
                    }}
                    title={`${start}–${Number(start) + Number(duration)} ms`}
                  >
                    <span className="truncate">{output}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-[0.35fr_1fr]">
          <code
            className="rounded-control border bg-bg p-3 text-sm font-semibold"
            style={{ borderColor: schedule.tone }}
          >
            完成：{schedule.total}
          </code>
          <p className="rounded-control border border-border bg-bg p-3 text-sm">
            {schedule.dependency}
          </p>
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm"
          style={{ borderColor: schedule.tone }}
        >
          {schedule.verdict}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const races = {
  shared: {
    label: "共享变量",
    steps: [
      ["T1", "读 stock", "1", color.accent],
      ["T2", "读 stock", "1", color.warning],
      ["T1", "写 stock", "0", color.accent],
      ["T2", "写 stock", "0", color.warning],
    ],
    replies: ["order A → RESERVED", "order B → RESERVED"],
    invariant: "初始库存 1，却发出 2 个 RESERVED",
    owner: "stock 没有唯一写入者",
    tone: color.danger,
  },
  locked: {
    label: "锁住读改写",
    steps: [
      ["T1", "lock + stock--", "1 → 0", color.accent],
      ["T2", "等待 lock", "blocked", color.warning],
      ["T1", "unlock", "stock=0", color.accent],
      ["T2", "lock + reject", "OUT_OF_STOCK", color.warning],
    ],
    replies: ["order A → RESERVED", "order B → REJECTED"],
    invariant: "库存守恒，但调用者必须正确共享同一把锁",
    owner: "临界区拥有 stock；锁仍是全局协调知识",
    tone: color.success,
  },
  actor: {
    label: "库存 Actor",
    steps: [
      ["A", "send Reserve(A)", "mailbox #1", color.accent],
      ["B", "send Reserve(B)", "mailbox #2", color.warning],
      ["StockActor", "handle A", "stock 1 → 0", color.success],
      ["StockActor", "handle B", "reply OUT", color.success],
    ],
    replies: ["A ← Reserved(event#71)", "B ← OutOfStock(event#72)"],
    invariant: "消息可以并发到达，状态只由 owner 串行改变",
    owner: "StockActor 是 stock 的唯一所有者",
    tone: color.accent,
  },
} as const;
type RaceId = keyof typeof races;

export function Tpp20Chapter06ConcurrencyFeedbackLab() {
  const [id, setId] = useState<RaceId>("shared");
  const race = races[id];

  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="第 6 章专属实验 · 最后一件库存的竞争时序"
      title="两个请求都读到 stock=1，谁有权把它变成 0？"
      description="同一初始库存、同一 A/B 请求，只改变状态所有权。逐步观察交错、回复与库存守恒，而非用吞吐量掩盖超卖。"
      kind="concurrency-inventory-race-owner"
      reset={() => setId("shared")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(races) as RaceId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {races[key].label}
            </button>
          ))}
        </div>
        <ol className="mt-4 grid gap-2 md:grid-cols-4">
          {race.steps.map(([lane, action, state, tone], index) => (
            <li
              key={`${lane}-${action}`}
              className="relative rounded-control border bg-bg p-3"
              style={{ borderColor: tone }}
            >
              <span className="text-xs font-semibold" style={{ color: tone }}>
                {index + 1}. {lane}
              </span>
              <p className="mt-1 text-sm">{action}</p>
              <code className="mt-2 block text-xs">{state}</code>
              {index < race.steps.length - 1 && (
                <span
                  className="absolute -right-3 top-1/2 hidden text-lg md:block"
                  style={{ color: tone }}
                  aria-hidden="true"
                >
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {race.replies.map((reply) => (
            <code
              key={reply}
              className="rounded-control border border-border bg-bg p-3 text-xs"
            >
              {reply}
            </code>
          ))}
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <p
            className="rounded-control border bg-bg p-3 text-sm"
            style={{ borderColor: race.tone }}
          >
            <strong>不变量：</strong> {race.invariant}
          </p>
          <p className="rounded-control border border-border bg-bg p-3 text-sm">
            <strong>所有权：</strong> {race.owner}
          </p>
        </div>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const facts = {
  approved: {
    label: "事实齐全",
    events: [
      "StockAvailable(sku, qty=1)",
      "RiskApproved(order, score=.14)",
      "PaymentHeld(order, ¥299)",
      "AddressVerified(order)",
    ],
    rule: "四项事实针对同一 orderId 且版本未过期",
    decision: "ReadyToShip(order#A91)",
    missing: "none",
    tone: color.success,
  },
  missing: {
    label: "缺风险事实",
    events: [
      "StockAvailable(sku, qty=1)",
      "PaymentHeld(order, ¥299)",
      "AddressVerified(order)",
      "Risk service timeout",
    ],
    rule: "没有 RiskApproved 就不能推出 ReadyToShip",
    decision: "PendingFacts(order#A91)",
    missing: "RiskApproved；deadline=14:03:10",
    tone: color.warning,
  },
  stale: {
    label: "库存事实过期",
    events: [
      "StockAvailable(v41, ttl=5s)",
      "RiskApproved(order, score=.14)",
      "PaymentHeld(order, ¥299)",
      "clock now = emitted+7s",
    ],
    rule: "黑板事实必须满足版本与 TTL，不能只按名称匹配",
    decision: "Retract StockAvailable；request refresh",
    missing: "fresh StockAvailable for sku",
    tone: color.danger,
  },
} as const;
type FactId = keyof typeof facts;

export function Tpp20Chapter06ConcurrencyEvidenceLab() {
  const [id, setId] = useState<FactId>("approved");
  const fact = facts[id];

  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="第 6 章专属复核 · 用黑板上的事实协调角色"
      title="没有中央调用顺序，系统凭什么宣布可以发货？"
      description="库存、风控、支付和地址角色只发布事实。协调规则按订单、版本和 TTL 推导决定，并保留缺失或撤回证据。"
      kind="concurrency-blackboard-fact-coordination"
      reset={() => setId("approved")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(facts) as FactId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {facts[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {fact.events.map((event, index) => (
            <code
              key={event}
              className="rounded-control border border-border bg-bg p-3 text-xs"
            >
              <span style={{ color: fact.tone }}>role-{index + 1} → </span>
              {event}
            </code>
          ))}
        </div>
        <div
          className="mx-auto h-5 w-px"
          style={{ background: fact.tone }}
          aria-hidden="true"
        />
        <div
          className="rounded-control border-2 bg-bg p-4 text-center"
          style={{ borderColor: fact.tone }}
        >
          <p className="text-xs font-semibold text-muted">协调规则</p>
          <p className="mt-1 text-sm">{fact.rule}</p>
        </div>
        <div
          className="mx-auto h-5 w-px"
          style={{ background: fact.tone }}
          aria-hidden="true"
        />
        <div className="grid gap-2 sm:grid-cols-2">
          <code
            className="rounded-control border bg-bg p-3 text-xs"
            style={{ borderColor: fact.tone }}
          >
            decision: {fact.decision}
          </code>
          <code className="rounded-control border border-border bg-bg p-3 text-xs">
            missing/retracted: {fact.missing}
          </code>
        </div>
      </div>
    </Tpp20DedicatedFrame>
  );
}
