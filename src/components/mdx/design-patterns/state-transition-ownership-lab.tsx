"use client";

import { useId, useState } from "react";

export type StateName = "Draft" | "Paid" | "Shipped" | "Cancelled";
export type OrderEvent = "pay" | "ship" | "cancel";
export type Effect = "capture" | "dispatch" | "close";
export type Fault = "safe" | "commit-first" | "bypass";
export type Plan = Readonly<{ next: StateName; effect: Effect }>;
export type OrderState = Readonly<{
  name: StateName;
  decide: (event: OrderEvent) => Plan | null;
}>;
export const orderStates: Record<StateName, OrderState> = {
  Draft: {
    name: "Draft",
    decide: (event) =>
      event === "pay"
        ? { next: "Paid", effect: "capture" }
        : event === "cancel"
          ? { next: "Cancelled", effect: "close" }
          : null,
  },
  Paid: {
    name: "Paid",
    decide: (event) =>
      event === "ship" ? { next: "Shipped", effect: "dispatch" } : null,
  },
  Shipped: { name: "Shipped", decide: () => null },
  Cancelled: { name: "Cancelled", decide: () => null },
};
export type Snapshot = { state: StateName; receipts: Effect[] };
export type Attempt = {
  from: StateName;
  to: StateName;
  event: OrderEvent;
  status: "committed" | "rejected" | "failed";
  trace: string[];
};

export class OrderContext {
  #state: OrderState = orderStates.Draft;
  #receipts: Effect[] = [];
  snapshot(): Snapshot {
    return { state: this.#state.name, receipts: [...this.#receipts] };
  }
  send(event: OrderEvent, fail = false, fault: Fault = "safe"): Attempt {
    const from = this.#state.name;
    const trace = [`guard:${from}/${event}`];
    const plan =
      fault === "bypass" && event === "ship"
        ? { next: "Shipped" as const, effect: "dispatch" as const }
        : this.#state.decide(event);
    const finish = (status: Attempt["status"]): Attempt => ({
      from,
      to: this.#state.name,
      event,
      status,
      trace,
    });
    if (!plan) {
      trace.push("reject:no-edge");
      return finish("rejected");
    }
    const commit = () => {
      this.#state = orderStates[plan.next];
      trace.push(`commit:${plan.next}`);
    };
    if (fault === "commit-first") commit();
    trace.push(`effect:${plan.effect}`);
    if (fail) {
      trace.push("fail:before-write");
      return finish("failed");
    }
    this.#receipts.push(plan.effect);
    trace.push(`receipt:${plan.effect}`);
    if (fault !== "commit-first") commit();
    return finish("committed");
  }
}

export function orderConsistent({ state, receipts }: Snapshot): boolean {
  const expected: Record<StateName, Effect[]> = {
    Draft: [],
    Paid: ["capture"],
    Shipped: ["capture", "dispatch"],
    Cancelled: ["close"],
  };
  return JSON.stringify(receipts) === JSON.stringify(expected[state]);
}

const events: OrderEvent[] = ["pay", "ship", "cancel"];
const nodes: { name: StateName; x: number; y: number }[] = [
  { name: "Draft", x: 190, y: 110 },
  { name: "Paid", x: 610, y: 110 },
  { name: "Shipped", x: 610, y: 520 },
  { name: "Cancelled", x: 190, y: 520 },
];
// These are the actual rendered edges, derived from the same State objects.
export const stateGraphEdges = nodes.flatMap(({ name }) =>
  events.flatMap((event) => {
    const plan = orderStates[name].decide(event);
    return plan ? [{ from: name, to: plan.next, event }] : [];
  }),
);
const edgeGeometry: Record<OrderEvent, { d: string; x: number; y: number }> = {
  pay: { d: "M 280 110 L 507 110", x: 400, y: 80 },
  ship: { d: "M 610 200 L 610 417", x: 670, y: 310 },
  cancel: { d: "M 190 200 L 190 417", x: 110, y: 310 },
};
const C = {
  bg: "var(--bg)",
  border: "var(--border)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
};
const control =
  "min-h-11 rounded border border-border bg-elevated px-3 text-sm text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";

export function StateTransitionOwnershipLab() {
  const id = useId();
  const [order, setOrder] = useState(() => new OrderContext());
  const [snapshot, setSnapshot] = useState<Snapshot>(() => order.snapshot());
  const [event, setEvent] = useState<OrderEvent>("pay");
  const [fault, setFault] = useState<Fault>("safe");
  const [fail, setFail] = useState(false);
  const [attempt, setAttempt] = useState<Attempt | null>(null);
  const consistent = orderConsistent(snapshot);
  const allowed = events.filter((candidate) =>
    orderStates[snapshot.state].decide(candidate),
  );
  const denied = attempt && !orderStates[attempt.from].decide(attempt.event);
  const target: Record<OrderEvent, StateName> = {
    pay: "Paid",
    ship: "Shipped",
    cancel: "Cancelled",
  };
  const origin = nodes.find((node) => node.name === attempt?.from);
  const destination = nodes.find(
    (node) => node.name === target[attempt?.event ?? event],
  );
  function execute() {
    setAttempt(order.send(event, fail, fault));
    setSnapshot(order.snapshot());
  }
  function reset() {
    const fresh = new OrderContext();
    setOrder(fresh);
    setSnapshot(fresh.snapshot());
    setEvent("pay");
    setFault("safe");
    setFail(false);
    setAttempt(null);
  }
  return (
    <section
      className="not-prose my-6 rounded-xl border border-border bg-elevated p-3 sm:p-5"
      aria-label="订单状态转换所有权实验"
    >
      <h3 className="text-lg font-semibold text-primary">
        订单：只有允许的边才能提交
      </h3>
      <p className="mt-2 text-sm text-secondary">
        圆环是当前位置，双圈是终态。强调线是当前允许的边，粗线对应所选事件；虚线叉号不是合法边。
      </p>
      <svg
        viewBox="0 0 800 680"
        className="mt-3 w-full"
        role="img"
        aria-label={`订单有向状态图。当前位置 ${snapshot.state}；允许 ${allowed.join("、") || "无"}；${consistent ? "回执一致" : "状态与回执冲突"}`}
      >
        <defs>
          {["normal", "active", "error"].map((kind) => (
            <marker
              key={kind}
              id={`${id}-${kind}`}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="4"
              markerHeight="4"
              orient="auto-start-reverse"
            >
              <path
                d="M 0 0 L 10 5 L 0 10 Z"
                fill={
                  kind === "active"
                    ? C.accent
                    : kind === "error"
                      ? C.danger
                      : C.muted
                }
              />
            </marker>
          ))}
        </defs>
        {stateGraphEdges.map((edge) => {
          const geometry = edgeGeometry[edge.event];
          const active = edge.from === snapshot.state;
          const selected = active && edge.event === event;
          return (
            <g
              key={`${edge.from}-${edge.event}`}
              data-edge={`${edge.from}/${edge.event}/${edge.to}`}
              data-allowed={active}
            >
              <path
                d={geometry.d}
                fill="none"
                stroke={active ? C.accent : C.muted}
                strokeWidth={selected ? 9 : 4}
                markerEnd={`url(#${id}-${active ? "active" : "normal"})`}
              />
              <text
                x={geometry.x}
                y={geometry.y}
                textAnchor="middle"
                fontSize={30}
                fill={active ? C.accent : C.muted}
              >
                {edge.event}
              </text>
            </g>
          );
        })}
        {denied && origin && destination && (
          <g data-illegal-attempt={`${attempt.from}/${attempt.event}`}>
            <path
              d={
                origin.name === destination.name
                  ? `M ${origin.x + 60} ${origin.y - 70} C ${origin.x + 190} ${origin.y - 190}, ${origin.x + 190} ${origin.y + 140}, ${origin.x + 75} ${origin.y + 30}`
                  : `M ${origin.x} ${origin.y + 90} L ${destination.x} ${destination.y - 105}`
              }
              fill="none"
              stroke={C.danger}
              strokeWidth={6}
              strokeDasharray="12 10"
              markerEnd={`url(#${id}-error)`}
            />
            <text
              x={400}
              y={380}
              textAnchor="middle"
              fontSize={30}
              fill={C.danger}
            >{`× 禁止 ${attempt.from}/${attempt.event}`}</text>
          </g>
        )}
        {nodes.map((node) => {
          const current = node.name === snapshot.state;
          const terminal = node.name === "Shipped" || node.name === "Cancelled";
          return (
            <g key={node.name} data-state={node.name} data-current={current}>
              <circle
                cx={node.x}
                cy={node.y}
                r={86}
                fill={C.bg}
                stroke={current ? (consistent ? C.accent : C.danger) : C.border}
                strokeWidth={current ? 9 : 3}
              />
              {terminal && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={76}
                  fill="none"
                  stroke={C.muted}
                  strokeWidth={2}
                />
              )}
              <text
                x={node.x}
                y={node.y + 10}
                textAnchor="middle"
                fontSize={30}
                fill={C.text}
              >
                {node.name}
              </text>
              {current && (
                <text
                  x={node.x}
                  y={node.y + 130}
                  textAnchor="middle"
                  fontSize={30}
                  fill={consistent ? C.accent : C.danger}
                >
                  {consistent ? "▲ 当前位置" : "▲ 回执冲突"}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm text-primary">
          事件
          <select
            className={control}
            value={event}
            onChange={(e) => setEvent(e.target.value as OrderEvent)}
          >
            {events.map((value) => (
              <option
                key={value}
                value={value}
              >{`${value} · ${allowed.includes(value) ? "允许" : "禁止（可试拒绝）"}`}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm text-primary">
          转换实现
          <select
            className={control}
            value={fault}
            onChange={(e) => setFault(e.target.value as Fault)}
          >
            <option value="safe">正确：先副作用，再提交</option>
            <option value="commit-first">错误：先提交状态</option>
            <option value="bypass">错误：ship 绕过当前 State</option>
          </select>
        </label>
        <label className="flex min-h-11 items-center gap-2 text-sm text-primary">
          <input
            type="checkbox"
            className="h-5 w-5 accent-[var(--accent)]"
            checked={fail}
            onChange={(e) => setFail(e.target.checked)}
          />
          副作用明确失败（写入前）
        </label>
        <div className="flex flex-wrap gap-2">
          <button className={control} type="button" onClick={execute}>
            执行事件
          </button>
          <button className={control} type="button" onClick={reset}>
            重置
          </button>
        </div>
      </div>
      <div
        className="mt-4 space-y-2 text-sm text-primary"
        aria-live="polite"
        aria-atomic="true"
      >
        <p>{`当前 ${snapshot.state}；已成功回执：${snapshot.receipts.join(" → ") || "无"}。`}</p>
        <p className={consistent ? "text-secondary" : "text-danger"}>
          {consistent
            ? "不变量：状态与成功回执一致。"
            : "不变量破坏：关闭故障不会撤销已发生的错误；请重置沙盒。"}
        </p>
        <p>
          {attempt
            ? `本次 ${attempt.from} / ${attempt.event} → ${attempt.to}：${attempt.status}`
            : "先预测：在 Draft 请求 ship，会画出允许边还是禁止线？"}
        </p>
        {attempt && (
          <ol className="list-inside list-decimal break-words text-secondary">
            {attempt.trace.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        )}
      </div>
      <p className="mt-3 text-xs text-secondary">
        同步、单订单、内存回执模拟；没有真实扣款。失败在写入前确定发生，不模拟网络超时或并发。重置清空此沙盒，不代表生产退款。
      </p>
    </section>
  );
}
