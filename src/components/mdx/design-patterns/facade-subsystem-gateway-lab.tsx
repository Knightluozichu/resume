"use client";

import { useState } from "react";

type Scenario = "success" | "stockout" | "payment";

const SCENARIOS: Record<
  Scenario,
  { label: string; inventory: string; payment: string; result: string }
> = {
  success: {
    label: "正常库存与支付",
    inventory: "库存锁定",
    payment: "支付授权",
    result: "订单创建成功",
  },
  stockout: {
    label: "库存不足",
    inventory: "库存拒绝",
    payment: "未调用",
    result: "返回库存错误",
  },
  payment: {
    label: "支付拒绝",
    inventory: "库存锁定",
    payment: "支付拒绝",
    result: "释放库存并返回支付错误",
  },
};

type TraceEvent = {
  id: number;
  label: string;
  detail: string;
  tone: "success" | "warning" | "neutral";
};

function toneClass(tone: TraceEvent["tone"]) {
  if (tone === "success") return "border-success text-success";
  if (tone === "warning") return "border-warning text-warning";
  return "border-border text-secondary";
}

export function FacadeSubsystemGatewayLab() {
  const [scenario, setScenario] = useState<Scenario>("success");
  const [bypassFacade, setBypassFacade] = useState(false);
  const [runCount, setRunCount] = useState(0);
  const [events, setEvents] = useState<TraceEvent[]>([]);

  const current = SCENARIOS[scenario];

  function addEvent(
    label: string,
    detail: string,
    tone: TraceEvent["tone"],
  ) {
    setEvents((items) => [
      ...items,
      { id: items.length + 1, label, detail, tone },
    ]);
  }

  function chooseScenario(next: Scenario) {
    setScenario(next);
    addEvent(
      "选择场景",
      SCENARIOS[next].label +
        "：客户端仍只需要一个 checkout() 合同，失败阶段由 Facade 解释。",
      "success",
    );
  }

  function toggleBypass() {
    const next = !bypassFacade;
    setBypassFacade(next);
    addEvent(
      next ? "启用反例" : "回到外观入口",
      next
        ? "客户端开始直接编排库存、支付和配送，子系统顺序与补偿细节向外泄漏。"
        : "客户端重新只依赖 CheckoutFacade.checkout()，子系统仍保留独立职责。",
      next ? "warning" : "success",
    );
  }

  function runCheckout() {
    setRunCount((count) => count + 1);
    addEvent(
      bypassFacade ? "直接编排子系统" : "调用 Facade.checkout()",
      bypassFacade
        ? "反例路径：客户端知道三个子系统的顺序，后续协议变化会扩散到调用方。"
        : current.result +
            "；CheckoutFacade 负责协调 " +
            current.inventory +
            " → " +
            current.payment +
            " → 配送边界。",
      bypassFacade ? "warning" : scenario === "success" ? "success" : "neutral",
    );
  }

  function reset() {
    setScenario("success");
    setBypassFacade(false);
    setRunCount(0);
    setEvents([]);
  }

  const statusTone = bypassFacade
    ? "border-warning text-warning"
    : scenario === "success"
      ? "border-success text-success"
      : "border-warning text-warning";

  return (
    <section
      aria-label="外观模式子系统网关实验"
      className="mdx-figure not-prose mx-auto my-8"
      data-unit-id="designpatterns-15"
      data-visual-kind="facade-subsystem-gateway-lab"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              FACADE · CONTROLLED ORCHESTRATION
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              结账外观与子系统边界实验台
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择一个子系统结果，再比较统一 checkout() 入口和客户端越过外观直接编排的差异。
            </p>
          </div>
          <button
            aria-label="重置外观模式子系统网关实验"
            className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
            onClick={reset}
            type="button"
          >
            重置实验
          </button>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="min-w-0 space-y-4">
            <div>
              <p className="text-xs font-semibold text-secondary">故障场景</p>
              <div className="mt-2 grid gap-2">
                {(Object.keys(SCENARIOS) as Scenario[]).map((key) => (
                  <button
                    aria-pressed={scenario === key}
                    className={
                      "min-h-11 rounded-control border px-3 py-2 text-left text-xs transition-colors " +
                      (scenario === key
                        ? "border-accent text-accent"
                        : "border-border text-secondary hover:border-accent hover:text-primary")
                    }
                    key={key}
                    onClick={() => chooseScenario(key)}
                    type="button"
                  >
                    {SCENARIOS[key].label}
                  </button>
                ))}
              </div>
            </div>

            <button
              aria-pressed={bypassFacade}
              className={
                "min-h-11 w-full rounded-control border px-3 py-2 text-left text-xs transition-colors " +
                (bypassFacade
                  ? "border-warning text-warning"
                  : "border-border text-secondary hover:border-warning hover:text-primary")
              }
              onClick={toggleBypass}
              type="button"
            >
              {bypassFacade
                ? "关闭反例：回到 Facade.checkout()"
                : "注入反例：绕过 Facade 直接编排"}
            </button>

            <button
              className="min-h-11 w-full rounded-control border border-accent px-3 py-2 text-left text-xs text-accent transition-colors hover:bg-accent/10"
              onClick={runCheckout}
              type="button"
            >
              {bypassFacade
                ? "运行直接编排反例"
                : "运行 CheckoutFacade.checkout()"}
            </button>
            <p className="text-xs leading-5 text-secondary">
              先选一个失败阶段，再运行一次；外观只统一常见任务合同，不会抹掉子系统的独立接口。
            </p>
          </div>

          <div className="min-w-0 rounded-card border border-border bg-[var(--bg)] p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                CLIENT → FACADE → SUBSYSTEMS
              </p>
              <span className={"rounded-control border px-2 py-1 text-xs " + statusTone}>
                {bypassFacade
                  ? "客户端越过边界"
                  : scenario === "success"
                    ? "统一合同通过"
                    : "失败被外观收口"}
              </span>
            </div>

            <div className="mt-4 grid gap-3">
              <div className="rounded-control border border-border p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs font-semibold text-secondary">Client</p>
                  <span className="font-mono text-xs text-primary">
                    {bypassFacade ? "3 个接口" : "1 个入口"}
                  </span>
                </div>
                <p className="mt-2 font-mono text-sm text-primary">
                  {bypassFacade ? "inventory → payment → shipping" : "checkout()"}
                </p>
              </div>

              <div className="rounded-control border border-accent p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs font-semibold text-accent">CheckoutFacade</p>
                  <span className="font-mono text-xs text-accent">
                    {bypassFacade ? "未调用" : "协调者"}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-5 text-secondary">
                  {bypassFacade
                    ? "反例：客户端接管编排、失败传播与补偿顺序。"
                    : "把常见结账流程收敛成一个稳定入口；高级客户端仍可按需访问底层服务。"}
                </p>
              </div>

              <div className="grid gap-2 sm:grid-cols-3">
                <div
                  className={
                    "rounded-control border p-3 " +
                    (scenario === "stockout" && !bypassFacade
                      ? "border-warning"
                      : "border-border")
                  }
                >
                  <p className="text-xs font-semibold text-secondary">Inventory</p>
                  <p className="mt-2 text-xs text-primary">{current.inventory}</p>
                </div>
                <div
                  className={
                    "rounded-control border p-3 " +
                    (scenario === "payment" && !bypassFacade
                      ? "border-warning"
                      : "border-border")
                  }
                >
                  <p className="text-xs font-semibold text-secondary">Payment</p>
                  <p className="mt-2 text-xs text-primary">{current.payment}</p>
                </div>
                <div className="rounded-control border border-border p-3">
                  <p className="text-xs font-semibold text-secondary">Shipping</p>
                  <p className="mt-2 text-xs text-primary">
                    {scenario === "stockout" ? "未调用" : "等待提交"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-control border border-accent p-3">
                <p className="text-xs font-semibold text-accent">客户端入口</p>
                <p className="mt-2 font-mono text-lg text-primary">
                  {bypassFacade ? "3" : "1"}
                </p>
              </div>
              <div className="rounded-control border border-success p-3">
                <p className="text-xs font-semibold text-success">当前结果</p>
                <p className="mt-2 text-xs leading-5 text-primary">
                  {bypassFacade ? "协议外泄漏" : current.result}
                </p>
              </div>
              <div className="rounded-control border border-border p-3">
                <p className="text-xs font-semibold text-secondary">运行次数</p>
                <p className="mt-2 font-mono text-lg text-primary">{runCount}</p>
              </div>
            </div>

            <div
              aria-live="polite"
              className={"mt-4 rounded-control border p-4 " + statusTone}
              role="status"
            >
              <p className="text-sm font-semibold">
                {bypassFacade
                  ? "反例：客户端知道子系统顺序，耦合正在扩散"
                  : "合同观察：" + current.result}
              </p>
              <p className="mt-2 text-xs leading-5 text-secondary">
                {bypassFacade
                  ? "外观模式的价值是降低常见调用方的知识负担，不是把所有业务规则塞进一个上帝对象。"
                  : "Facade 编排子系统并暴露失败阶段；子系统仍可被高级客户端直接使用，职责没有被替换。"}
              </p>
            </div>

            <div className="mt-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold text-secondary">调用轨迹</p>
                <span className="text-xs text-secondary">{events.length} 条</span>
              </div>
              <div className="mt-2 space-y-2">
                {events.length === 0 ? (
                  <p className="rounded-control border border-border px-3 py-3 text-xs text-secondary">
                    选择场景、注入反例或运行一次结账后，这里会记录边界证据。
                  </p>
                ) : (
                  events.map((event) => (
                    <div
                      className={"rounded-control border px-3 py-2 text-xs " + toneClass(event.tone)}
                      key={event.id}
                    >
                      <p className="font-semibold">{event.label}</p>
                      <p className="mt-1 leading-5 text-secondary">{event.detail}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
