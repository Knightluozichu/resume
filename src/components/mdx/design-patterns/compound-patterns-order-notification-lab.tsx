"use client";

import { useState } from "react";

export type Order = Readonly<{
  id: string;
  items: readonly Readonly<{ unit: number; qty: number }>[];
}>;
export type Price = (subtotal: number) => number;
export const regular: Price = (n) => n;
export const member: Price = (n) => n - Math.ceil(n / 10);
export function subtotal(order: Order): number {
  let sum = 0;
  for (const { unit, qty } of order.items) {
    if (
      !Number.isSafeInteger(unit) ||
      unit < 0 ||
      !Number.isSafeInteger(qty) ||
      qty < 1
    )
      throw Error("invalid line");
    sum += unit * qty;
    if (!Number.isSafeInteger(sum)) throw Error("overflow");
  }
  return sum;
}
export type Placed = Readonly<{
  type: "OrderPlaced";
  id: string;
  total: number;
}>;
export type Delivery = { to: string; status: "ok" | "failed" };
export type Listener = (event: Placed) => void;
export class OrderEvents {
  private listeners = new Map<string, Listener>();
  subscribe(id: string, listener: Listener) {
    if (this.listeners.has(id)) throw Error("duplicate subscriber");
    this.listeners.set(id, listener);
    let active = true;
    return () => {
      if (active) this.listeners.delete(id);
      active = false;
    };
  }
  publish(event: Placed): Delivery[] {
    const frozen = Object.freeze({ ...event });
    return [...this.listeners].map(([to, listener]) => {
      try {
        listener(frozen);
        return { to, status: "ok" };
      } catch {
        return { to, status: "failed" };
      }
    });
  }
}
export type Outcome =
  | { status: "denied" }
  | {
      status: "placed";
      total: number;
      event: Placed;
      deliveries: Delivery[];
    };
export type Place = (actor: "buyer" | "guest") => Outcome;
export type Dependencies = {
  load: () => Order;
  save: (total: number) => void;
  price: Price;
  events: OrderEvents;
  trace: string[];
};
export function checkout(d: Dependencies): Place {
  return () => {
    d.trace.push("load");
    const order = d.load(),
      base = subtotal(order);
    d.trace.push("price");
    const total = d.price(base);
    if (!Number.isSafeInteger(total) || total < 0 || total > base)
      throw Error("invalid price");
    d.save(total);
    d.trace.push("commit");
    const event: Placed = Object.freeze({
      type: "OrderPlaced",
      id: order.id,
      total,
    });
    const deliveries = d.events.publish(event);
    d.trace.push(...deliveries.map((x) => `${x.to}:${x.status}`));
    return { status: "placed", total, event, deliveries };
  };
}
export function protect(real: Place, trace: string[]): Place {
  return (actor) => {
    if (actor !== "buyer") {
      trace.push("deny");
      return { status: "denied" };
    }
    trace.push("allow");
    return real(actor);
  };
}
export type Options = {
  strategy: "regular" | "member";
  actor: "buyer" | "guest";
  audience: "none" | "mail" | "both";
  mailFails: boolean;
};
export const initial: Options = {
  strategy: "regular",
  actor: "buyer",
  audience: "both",
  mailFails: false,
};
export function runOrder(options: Options) {
  const trace: string[] = [],
    received: { to: string; event: Placed }[] = [];
  const events = new OrderEvents();
  if (options.audience !== "none")
    events.subscribe("mail", (event) => {
      if (options.mailFails) throw Error("mail unavailable");
      received.push({ to: "mail", event });
    });
  if (options.audience === "both")
    events.subscribe("audit", (event) => {
      received.push({ to: "audit", event });
    });
  let reads = 0,
    commits = 0;
  const place = protect(
    checkout({
      trace,
      events,
      price: options.strategy === "regular" ? regular : member,
      load: () => {
        reads++;
        return {
          id: "O-7",
          items: [
            { unit: 1250, qty: 2 },
            { unit: 500, qty: 1 },
          ],
        };
      },
      save: () => {
        commits++;
      },
    }),
    trace,
  );
  const outcome = place(options.actor);
  return { outcome, trace, reads, commits, received };
}

const money = (cents: number) => `¥${(cents / 100).toFixed(2)}`;
const control =
  "min-h-11 w-full rounded border border-border bg-bg px-3 text-sm text-primary";
const words: Record<string, string> = {
  allow: "门禁放行",
  deny: "门禁拒绝；到此终止",
  load: "读取订单",
  price: "计算金额",
  commit: "记录提交",
  "mail:ok": "邮件已接收",
  "mail:failed": "邮件失败（不回滚）",
  "audit:ok": "审计已接收",
};

export function CompoundOrderNotificationLab() {
  const [options, setOptions] = useState<Options>({ ...initial });
  const result = runOrder(options);
  const placed = result.outcome.status === "placed" ? result.outcome : null;
  const total = placed?.total ?? 0;
  const mail = placed?.deliveries.find((d) => d.to === "mail");
  const audit = placed?.deliveries.find((d) => d.to === "audit");
  const subscribers =
    options.audience === "both"
      ? ["mail", "audit"]
      : options.audience === "mail"
        ? ["mail"]
        : [];
  return (
    <section
      aria-label="订单金额、门禁与通知实验"
      className="my-6 space-y-4 rounded-card border border-border bg-bg p-4 text-primary"
    >
      <h3 className="text-lg font-semibold">一笔订单，三条独立变化轴</h3>
      <p className="text-sm text-secondary">
        每次配置重新模拟一笔订单，不访问网络、不实际扣款。先保持其余选项不变，只改变一个条件。
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="space-y-1 text-sm">
          金额算法
          <select
            className={control}
            value={options.strategy}
            onChange={(e) =>
              setOptions({
                ...options,
                strategy: e.target.value as Options["strategy"],
              })
            }
          >
            <option value="regular">原价</option>
            <option value="member">九折（向下取整到分）</option>
          </select>
        </label>
        <label className="space-y-1 text-sm">
          可信入口身份（模拟）
          <select
            className={control}
            value={options.actor}
            onChange={(e) =>
              setOptions({
                ...options,
                actor: e.target.value as Options["actor"],
              })
            }
          >
            <option value="buyer">buyer：允许下单</option>
            <option value="guest">guest：拒绝访问</option>
          </select>
        </label>
        <label className="space-y-1 text-sm">
          事件订阅集合
          <select
            className={control}
            value={options.audience}
            onChange={(e) =>
              setOptions({
                ...options,
                audience: e.target.value as Options["audience"],
              })
            }
          >
            <option value="both">邮件 + 审计</option>
            <option value="mail">仅邮件</option>
            <option value="none">无订阅者</option>
          </select>
        </label>
        <label className="flex min-h-11 items-center gap-3 text-sm">
          <input
            type="checkbox"
            className="h-5 w-5 accent-[var(--accent)]"
            checked={options.mailFails}
            onChange={(e) =>
              setOptions({ ...options, mailFails: e.target.checked })
            }
          />
          注入邮件接收失败
        </label>
      </div>
      <button
        type="button"
        className="min-h-11 rounded border border-border px-4 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        onClick={() => setOptions({ ...initial })}
      >
        重置实验
      </button>
      <svg
        viewBox="0 0 360 550"
        role="img"
        aria-label={
          placed
            ? `金额${money(total)}；读取${result.reads}次、提交${result.commits}次；${placed.deliveries.map((d) => `${d.to} ${d.status}`).join("，") || "没有接收者"}`
            : "门禁阻断：未读取订单，无金额、无事件、无提交"
        }
        className="mx-auto block w-full max-w-[440px]"
        style={{ color: "var(--text-primary)", fontSize: 15 }}
      >
        <text x="15" y="22" fill="currentColor">
          {placed ? "金额尺：0 — 3000 分" : "金额区域：访问前不可见"}
        </text>
        {placed ? (
          <>
            <text x="15" y="48" fill="currentColor">
              2 × 1250 + 500 = 3000 分
            </text>
            <line x1="20" y1="125" x2="340" y2="125" stroke="var(--border)" />
            {[0, 1000, 2000, 3000].map((v) => (
              <g key={v}>
                <line
                  x1={20 + v / 10}
                  y1="120"
                  x2={20 + v / 10}
                  y2="130"
                  stroke="currentColor"
                />
                <text
                  x={20 + v / 10}
                  y="147"
                  textAnchor={v === 0 ? "start" : "middle"}
                  fill="currentColor"
                >
                  {String(v)}
                </text>
              </g>
            ))}
            <rect
              x="20"
              y="65"
              width={total / 10}
              height="38"
              fill="var(--accent)"
            />
            <rect
              x={20 + total / 10}
              y="65"
              width={(3000 - total) / 10}
              height="38"
              fill="var(--border)"
            />
            <text
              x="15"
              y="174"
              fill="currentColor"
            >{`实付 ${money(total)}；减免 ${money(3000 - total)}`}</text>
          </>
        ) : (
          <>
            <path
              d="M20 65H340M20 105H340"
              stroke="var(--border)"
              strokeDasharray="5 5"
            />
            <text x="180" y="92" textAnchor="middle" fill="currentColor">
              未读取金额；不是 0 元订单
            </text>
          </>
        )}
        <line x1="15" y1="190" x2="345" y2="190" stroke="var(--border)" />
        <text x="15" y="215" fill="currentColor">
          入口权限 / 内部订单
        </text>
        <circle
          cx="40"
          cy="260"
          r="16"
          fill="var(--bg-elevated)"
          stroke="currentColor"
        />
        <text x="40" y="296" textAnchor="middle" fill="currentColor">
          请求
        </text>
        <path d="M56 260H151" stroke="var(--accent)" strokeWidth="3" />
        <path
          d="M145 255L153 260L145 265"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
        />
        <path
          d="M160 231V281M184 231V281M160 232H184"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />
        <line
          x1="162"
          y1="257"
          x2={placed ? "162" : "182"}
          y2={placed ? "235" : "257"}
          stroke="var(--accent)"
          strokeWidth="5"
        />
        <text x="172" y="296" textAnchor="middle" fill="currentColor">
          {placed ? "已放行" : "已阻断"}
        </text>
        {placed ? (
          <path
            d="M188 260H270M261 255L270 260L261 265"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
          />
        ) : (
          <path
            d="M138 240L151 251M151 240L138 251"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
          />
        )}
        <circle
          cx="299"
          cy="260"
          r="24"
          fill="var(--bg-elevated)"
          stroke="var(--border)"
          strokeDasharray={placed ? "none" : "4 4"}
        />
        <text x="299" y="265" textAnchor="middle" fill="currentColor">
          {placed ? "O-7" : "—"}
        </text>
        <text x="299" y="296" textAnchor="middle" fill="currentColor">
          {placed ? "已记录" : "未访问"}
        </text>
        <text
          x="15"
          y="327"
          fill="currentColor"
        >{`读取 ${result.reads} 次 / 提交 ${result.commits} 次`}</text>
        <line x1="15" y1="345" x2="345" y2="345" stroke="var(--border)" />
        <text x="15" y="370" fill="currentColor">
          OrderPlaced 的本轮分发拓扑
        </text>
        <circle
          cx="180"
          cy="408"
          r="18"
          fill={placed ? "var(--accent)" : "var(--bg-elevated)"}
          stroke="var(--border)"
        />
        <text x="215" y="413" fill="currentColor">
          {placed ? `${total} 分` : "无事件"}
        </text>
        {subscribers.map((id) => {
          const x = id === "mail" ? 75 : 285;
          const delivery = id === "mail" ? mail : audit;
          return (
            <g key={id}>
              <path
                d={`M180 426L${x} 474`}
                fill="none"
                stroke={delivery ? "var(--accent)" : "var(--border)"}
                strokeWidth="2"
                strokeDasharray={delivery ? "none" : "4 4"}
              />
              {delivery && (
                <circle
                  cx={(180 + x) / 2}
                  cy="450"
                  r="5"
                  fill="var(--accent)"
                />
              )}
              <circle
                cx={x}
                cy="486"
                r="15"
                fill="var(--bg-elevated)"
                stroke="currentColor"
              />
              {delivery?.status === "failed" ? (
                <path
                  d={`M${x - 6} 480L${x + 6} 492M${x + 6} 480L${x - 6} 492`}
                  stroke="var(--accent)"
                  strokeWidth="3"
                />
              ) : (
                delivery && (
                  <circle cx={x} cy="486" r="5" fill="var(--accent)" />
                )
              )}
              <text
                x={x}
                y="524"
                textAnchor="middle"
                fill="currentColor"
              >{`${id === "mail" ? "邮件" : "审计"}：${delivery?.status === "ok" ? "已接收" : delivery?.status === "failed" ? "失败" : "未调用"}`}</text>
            </g>
          );
        })}
        {subscribers.length === 0 && (
          <text x="180" y="488" textAnchor="middle" fill="currentColor">
            无订阅边；提交不依赖接收者
          </text>
        )}
      </svg>
      <div aria-live="polite" className="space-y-2 text-sm">
        <p className="font-semibold">
          {placed
            ? `订单已记录：${money(total)}。通知失败不会撤销记录。`
            : "访问被拒绝：没有订单载荷或通知。"}
        </p>
        <ol
          aria-label="本轮真实调用轨迹"
          className="list-inside list-decimal space-y-1"
        >
          {result.trace.map((step, i) => (
            <li key={`${i}-${step}`}>{words[step]}</li>
          ))}
        </ol>
      </div>
      <p className="text-xs text-secondary">
        实线与圆点表示已尝试投递；叉号表示接收失败；虚线只表示已注册但未调用的订阅。图中“提交”是内存记录，不是支付或数据库事务。
      </p>
    </section>
  );
}
