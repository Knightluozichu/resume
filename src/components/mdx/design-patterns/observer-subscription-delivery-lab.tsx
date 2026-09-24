"use client";

import { useState } from "react";

export type StockEvent = Readonly<{ version: number; qty: number }>;
export type StockObserver = { id: string; update(e: StockEvent): void };
export type DeliveryPolicy = "safe" | "live" | "abort";

export class InventorySubject {
  private members = new Map<StockObserver, () => void>();
  private state: StockEvent = Object.freeze({ version: 0, qty: 10 });
  private notifying = false;
  constructor(private policy: DeliveryPolicy = "safe") {}
  read() {
    return this.state;
  }
  subscribers() {
    return [...this.members.keys()];
  }
  subscribe(observer: StockObserver): () => void {
    const existing = this.members.get(observer);
    if (existing) return existing;
    const stop = () => {
      if (this.members.get(observer) === stop) this.members.delete(observer);
    };
    this.members.set(observer, stop);
    return stop;
  }
  publish(qty: number): string[] {
    if (this.notifying) throw new Error("reentrant publish");
    if (!Number.isSafeInteger(qty) || qty < 0) throw new Error("invalid qty");
    this.state = Object.freeze({ version: this.state.version + 1, qty });
    const event = this.state;
    const targets =
      this.policy === "live" ? this.members.keys() : [...this.members.keys()];
    const errors: string[] = [];
    this.notifying = true;
    try {
      for (const observer of targets) {
        if (this.policy === "abort") observer.update(event);
        else {
          try {
            observer.update(event);
          } catch {
            errors.push(observer.id);
          }
        }
      }
    } finally {
      this.notifying = false;
    }
    return errors;
  }
}

type ObserverId = "A" | "B" | "C";
export type ObserverScene = "mutate" | "throw" | "plain";
export type DeliveryFrame = {
  label: string;
  event: StockEvent;
  members: ObserverId[];
  snapshot: ObserverId[];
  pending: ObserverId[];
  applied: Record<ObserverId, number>;
  outcomes: Partial<Record<ObserverId, "sent" | "error">>;
  active?: ObserverId;
};

// Replay real callbacks, not a second implementation of the notification policy.
export function runObserverScenario(
  policy: DeliveryPolicy,
  scene: ObserverScene,
  includeC = false,
): DeliveryFrame[] {
  const subject = new InventorySubject(policy);
  const frames: DeliveryFrame[] = [];
  const applied = { A: 0, B: 0, C: 0 };
  let outcomes: DeliveryFrame["outcomes"] = {};
  let targets: ObserverId[] = [];
  let inRound = false;
  const ids = () => subject.subscribers().map((o) => o.id as ObserverId);
  const capture = (label: string, active?: ObserverId) => {
    const recipients = policy === "live" ? ids() : targets;
    frames.push({
      label,
      active,
      event: subject.read(),
      members: ids(),
      snapshot: inRound && policy !== "live" ? [...targets] : [],
      pending: inRound ? recipients.filter((id) => !outcomes[id]) : [],
      applied: { ...applied },
      outcomes: { ...outcomes },
    });
  };
  let stopB = () => {};
  const makeObserver = (id: ObserverId): StockObserver => ({
    id,
    update(event) {
      capture(`${id} 开始处理 v${event.version}`, id);
      if (id === "A" && scene === "mutate") {
        stopB();
        stopB();
        subject.subscribe(c);
      }
      if (id === "A" && scene === "throw") {
        outcomes[id] = "error";
        capture(`A 抛错：未应用 v${event.version}`);
        throw new Error("A failed");
      }
      applied[id] = event.version;
      outcomes[id] = "sent";
      capture(`${id} 已应用 v${event.version}`);
    },
  });
  const a = makeObserver("A");
  const b = makeObserver("B");
  const c = makeObserver("C");
  subject.subscribe(a);
  stopB = subject.subscribe(b);
  if (includeC) subject.subscribe(c);
  capture(`初始：${ids().join("、")} 已订阅；所有观察者停在 v0`);
  for (const qty of [9, 8]) {
    targets = ids();
    outcomes = {};
    inRound = true;
    try {
      const errors = subject.publish(qty);
      inRound = false;
      capture(
        `v${subject.read().version} 通知结束；失败：${errors.join("、") || "无"}`,
      );
    } catch {
      inRound = false;
      capture(`v${subject.read().version} 已提交，但 A 的异常中断了通知`);
    }
  }
  return frames;
}

const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
};
const observerRows = [
  { id: "A", label: "A · 看板", y: 80 },
  { id: "B", label: "B · 补货", y: 190 },
  { id: "C", label: "C · 审计", y: 300 },
] as const;
const control =
  "min-h-11 rounded border border-border bg-elevated px-3 py-2 text-sm text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";

export function ObserverSubscriptionDeliveryLab() {
  const [policy, setPolicy] = useState<DeliveryPolicy>("safe");
  const [scene, setScene] = useState<ObserverScene>("mutate");
  const [includeC, setIncludeC] = useState(false);
  const [index, setIndex] = useState(0);
  const frames = runObserverScenario(policy, scene, includeC);
  const frame = frames[index];
  const reset = () => {
    setPolicy("safe");
    setScene("mutate");
    setIncludeC(false);
    setIndex(0);
  };
  const summary = observerRows
    .map(
      ({ id }) =>
        `${id}：${frame.members.includes(id) ? "订阅" : "未订阅"}，v${frame.applied[id]}`,
    )
    .join("；");

  return (
    <section
      className="not-prose my-6 rounded-xl border border-border bg-elevated p-3 sm:p-5"
      aria-label="观察者订阅与版本传播实验"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-base font-semibold text-primary">
          订阅连线与事件版本
        </h3>
        <button type="button" className={control} onClick={reset}>
          重置
        </button>
      </div>
      <p className="my-3 text-sm text-secondary">
        先预测 B 能否收到 v1。图是同步调用的离散回放，不是网络传输或后台队列。
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm text-primary">
          通知策略
          <select
            className={control}
            value={policy}
            onChange={(e) => {
              setPolicy(e.target.value as DeliveryPolicy);
              setIndex(0);
            }}
          >
            <option value="safe">修复：快照 + 异常隔离</option>
            <option value="live">故障：遍历活集合</option>
            <option value="abort">故障：抛错中断</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm text-primary">
          A 的回调行为
          <select
            className={control}
            value={scene}
            onChange={(e) => {
              setScene(e.target.value as ObserverScene);
              setIndex(0);
            }}
          >
            <option value="mutate">两次退订 B，再订阅 C</option>
            <option value="throw">应用版本前抛错</option>
            <option value="plain">仅应用版本</option>
          </select>
        </label>
      </div>
      <button
        type="button"
        className={`${control} mt-3`}
        aria-pressed={includeC}
        onClick={() => {
          setIncludeC(!includeC);
          setIndex(0);
        }}
      >
        {includeC ? "移除初始 C 订阅并重演" : "增加初始 C 订阅并重演"}
      </button>
      <svg
        viewBox="0 0 360 380"
        role="img"
        aria-label={`Subject v${frame.event.version}，库存 ${frame.event.qty}；${summary}；${frame.label}`}
        className="mx-auto my-3 block w-full max-w-[480px]"
        style={{ background: C.bg }}
      >
        <text x="16" y="26" fill={C.muted} fontSize="14">
          {"实线 = 强引用订阅；虚线 = 本轮快照"}
        </text>
        {observerRows.map(({ id, y }) => {
          const subscribed = frame.members.includes(id);
          const pending = frame.pending.includes(id);
          const outcome = frame.outcomes[id];
          const active = frame.active === id;
          return (
            <g key={id}>
              {(subscribed || frame.snapshot.includes(id)) && (
                <path
                  d={`M 106 190 L 250 ${y}`}
                  fill="none"
                  stroke={subscribed ? C.accent : C.muted}
                  strokeWidth="2"
                  strokeDasharray={subscribed ? undefined : "5 5"}
                />
              )}
              {pending && !active && (
                <circle
                  cx="133"
                  cy={190 + (y - 190) * 0.19}
                  r="5"
                  fill={C.bg}
                  stroke={C.muted}
                  strokeWidth="2"
                />
              )}
              {active && (
                <g>
                  <circle cx="181" cy={(190 + y) / 2} r="16" fill={C.accent} />
                  <text
                    x="181"
                    y={(190 + y) / 2 + 5}
                    textAnchor="middle"
                    fontSize="14"
                    fill={C.bg}
                  >{`v${frame.event.version}`}</text>
                </g>
              )}
              {outcome === "sent" && (
                <circle cx="248" cy={y} r="6" fill={C.accent} />
              )}
              {outcome === "error" && (
                <path
                  d={`M 235 ${y - 6} l 12 12 m 0 -12 l -12 12`}
                  stroke={C.danger}
                  strokeWidth="3"
                />
              )}
            </g>
          );
        })}
        <circle
          cx="68"
          cy="190"
          r="38"
          fill={C.elevated}
          stroke={C.accent}
          strokeWidth="3"
        />
        <text x="68" y="133" textAnchor="middle" fill={C.text} fontSize="14">
          {"Subject"}
        </text>
        <text
          x="68"
          y="184"
          textAnchor="middle"
          fill={C.text}
          fontSize="15"
        >{`v${frame.event.version}`}</text>
        <text
          x="68"
          y="204"
          textAnchor="middle"
          fill={C.muted}
          fontSize="14"
        >{`库存 ${frame.event.qty}`}</text>
        {observerRows.map(({ id, label, y }) => (
          <g key={id}>
            <text
              x="288"
              y={y - 39}
              textAnchor="middle"
              fill={C.text}
              fontSize="14"
            >
              {label}
            </text>
            <circle
              cx="288"
              cy={y}
              r="32"
              fill={C.elevated}
              stroke={
                frame.outcomes[id] === "error"
                  ? C.danger
                  : frame.applied[id] === frame.event.version &&
                      frame.event.version > 0
                    ? C.accent
                    : C.border
              }
              strokeWidth="3"
            />
            <text
              x="288"
              y={y + 5}
              textAnchor="middle"
              fill={C.text}
              fontSize="15"
            >{`v${frame.applied[id]}`}</text>
          </g>
        ))}
        <text x="16" y="361" fill={C.muted} fontSize="14">
          {"空心点：待调用　实心点：已送达　×：失败"}
        </text>
      </svg>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          className={`${control} disabled:opacity-50`}
          disabled={index === frames.length - 1}
          onClick={() => setIndex(index + 1)}
        >
          推进一次调用
        </button>
        <label className="min-w-0 flex-1 text-sm text-primary">
          {`回放 ${index + 1} / ${frames.length}`}
          <input
            type="range"
            min="0"
            max={frames.length - 1}
            value={index}
            onChange={(e) => setIndex(Number(e.target.value))}
            aria-label="回放位置"
            className="block min-h-11 w-full accent-[var(--accent)]"
          />
        </label>
      </div>
      <p
        className="mt-2 min-h-11 text-sm text-primary"
        role="status"
        aria-live="polite"
      >{`${frame.label}。${summary}`}</p>
      <p className="text-sm text-secondary">
        改变配置会从 v0 重演两次提交（库存 9、8）。A
        的两次退订是幂等测试；虚线保留时，本轮仍会调用 B。无自动播放或运动效果。
      </p>
    </section>
  );
}
