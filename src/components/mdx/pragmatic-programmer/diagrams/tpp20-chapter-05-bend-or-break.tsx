"use client";

import { useState } from "react";

import { Tpp20DedicatedFrame } from "./tpp20-dedicated-frame";

const unitId = "tpp20-chapter-05-bend-or-break";
const c = {
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
};

const architectures = {
  rigid: {
    label: "刚性结账",
    center: "CheckoutService",
    spokes: [
      ["CarrierSdkDhl", "直接 new；DHL DTO 渗入订单", c.danger],
      ["TaxApiV2", "在领域方法内发 HTTP", c.danger],
      ["EmailClient", "付款事务内同步发送", c.danger],
      ["PremiumOrder extends Order", "用继承塞优惠规则", c.warning],
      ["if (region === 'CN')", "策略硬编码", c.warning],
    ],
    change:
      "新增顺丰 + 巴西税区会同时修改 CheckoutService、Order 子类和部署代码。",
    color: c.danger,
  },
  flexible: {
    label: "可弯曲结账",
    center: "Checkout(order, policies, ports)",
    spokes: [
      ["ShippingPort", "DHL/SF adapter 隔离 DTO", c.success],
      ["tax(order) → TaxedOrder", "纯数据变换", c.success],
      ["OrderPaid outbox", "通知异步订阅", c.success],
      ["DiscountPolicy 组合", "委托而非子类爆炸", c.success],
      ["region-policy.yaml", "版本化外置选择", c.accent],
    ],
    change:
      "新增承运商只加 adapter；新税区加 policy/config；核心订单合同保持不变。",
    color: c.success,
  },
} as const;
type ArchitectureId = keyof typeof architectures;

export function Tpp20Chapter05BendOrBreakSystemLab() {
  const [id, setId] = useState<ArchitectureId>("rigid");
  const architecture = architectures[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="第 5 章专属解剖图 · 订单 O-42 的变化接缝"
      title="承运商、税区、通知和优惠变化会穿透结账核心吗？"
      description="切换刚性与可弯曲设计。中心固定同一订单结账，用五条真实依赖展示解耦、变换、事件、组合与配置各自承担的边界。"
      kind="bend-or-break-checkout-seams"
      reset={() => setId("rigid")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-2">
          {(Object.keys(architectures) as ArchitectureId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {architectures[key].label}
            </button>
          ))}
        </div>
        <div
          className="mt-4 rounded-control border bg-bg p-4 text-center"
          style={{ borderColor: architecture.color }}
        >
          <strong
            className="font-mono text-sm"
            style={{ color: architecture.color }}
          >
            {architecture.center}
          </strong>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {architecture.spokes.map(([dependency, seam, color]) => (
            <div
              key={dependency}
              className="rounded-control border bg-bg p-3"
              style={{ borderColor: color }}
            >
              <code className="text-xs font-semibold" style={{ color }}>
                {dependency}
              </code>
              <p className="mt-2 text-sm leading-5">{seam}</p>
            </div>
          ))}
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: architecture.color }}
        >
          {architecture.change}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const eventFlows = {
  sync: {
    label: "付款事务内同步通知",
    stages: [
      ["charge", "payment P-9 = captured", c.success],
      ["order", "O-42 = PAID（事务内）", c.success],
      ["email", "SMTP timeout", c.danger],
      ["rollback", "订单回滚为 PENDING", c.danger],
    ],
    state: "钱已扣，但订单显示未付款；客户端重试可能二次扣款",
    replay: "通知故障与付款原子性错误绑定",
    color: c.danger,
  },
  outbox: {
    label: "订单 + outbox 同事务",
    stages: [
      ["charge", "payment P-9 = captured", c.success],
      ["commit", "O-42=PAID + event E-7", c.success],
      ["email", "SMTP timeout；E-7 未 ack", c.warning],
      ["retry", "稍后按 E-7 重发通知", c.success],
    ],
    state: "订单付款事实保持；通知失败只影响自己的订阅状态",
    replay: "同一 event id 确保重发不重复通知",
    color: c.success,
  },
  duplicate: {
    label: "反例：订阅者未去重",
    stages: [
      ["commit", "E-7 已入 outbox", c.success],
      ["email", "发送成功但 ACK 丢失", c.warning],
      ["retry", "E-7 再投递", c.warning],
      ["email", "客户收到两封", c.danger],
    ],
    state: "事件流允许至少一次投递，订阅者必须按 E-7 幂等",
    replay: "解耦没有取消合同；它把重试责任移到事件边界",
    color: c.warning,
  },
} as const;
type EventFlowId = keyof typeof eventFlows;

export function Tpp20Chapter05BendOrBreakFeedbackLab() {
  const [id, setId] = useState<EventFlowId>("sync");
  const flow = eventFlows[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="第 5 章专属实验 · 通知故障不应改写付款事实"
      title="SMTP 宕机时，订单与付款状态会被怎样牵连？"
      description="固定 O-42/P-9 和同一 SMTP timeout，只改变同步调用或 outbox 事件流；反例验证订阅者幂等责任。"
      kind="bend-or-break-order-event-flow"
      reset={() => setId("sync")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(eventFlows) as EventFlowId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {eventFlows[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 md:grid-cols-4">
          {flow.stages.map(([stage, state, color], index) => (
            <div
              key={stage}
              className="relative rounded-control border bg-bg p-3"
              style={{ borderColor: color }}
            >
              <span className="text-xs font-semibold" style={{ color }}>
                {index + 1}. {stage}
              </span>
              <strong className="mt-2 block text-sm leading-5">{state}</strong>
              {index < 3 && (
                <span
                  className="absolute -right-3 top-1/2 hidden text-lg md:block"
                  style={{ color }}
                  aria-hidden="true"
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <p className="rounded-control border border-border bg-bg p-3 text-sm">
            <strong>状态：</strong> {flow.state}
          </p>
          <p
            className="rounded-control border bg-bg p-3 text-sm"
            style={{ borderColor: flow.color }}
          >
            <strong>重放：</strong> {flow.replay}
          </p>
        </div>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const transformations = {
  mutable: {
    label: "共享对象原地修改",
    stages: [
      ["order", "subtotal=500", c.success],
      ["discount()", "mutate total=450", c.warning],
      ["tax()", "mutate total=495", c.warning],
      ["shipping()", "throw NO_ROUTE；对象停在 495", c.danger],
    ],
    input: "调用者持有的 order 已被部分修改",
    restart: "重试 discount 会再减 50，得到 445",
    verdict: "首差后没有完整阶段产物，恢复只能猜共享对象改到了哪里。",
    color: c.danger,
  },
  pipeline: {
    label: "不可变变换管道",
    stages: [
      ["Order", "subtotal=500", c.success],
      ["discount", "Discounted(total=450)", c.success],
      ["tax", "Taxed(total=495)", c.success],
      ["shipping", "Err NO_ROUTE + Taxed input", c.danger],
    ],
    input: "原始 Order 与每段输出都保持身份",
    restart: "修路线后从 Taxed(total=495) 或原输入确定重放",
    verdict: "数据形状表达已完成阶段；错误带着最后一个有效值，而非半改对象。",
    color: c.success,
  },
  recovered: {
    label: "修复路线后重放",
    stages: [
      ["Order", "subtotal=500", c.success],
      ["discount", "Discounted(total=450)", c.success],
      ["tax", "Taxed(total=495)", c.success],
      ["shipping", "Shippable(total=515, route=SF)", c.success],
    ],
    input: "同一 order hash + policy version v4",
    restart: "输出包含每段 policy id，结果可独立重建",
    verdict: "恢复改变的是 route policy，不是手工修补最终 total。",
    color: c.accent,
  },
} as const;
type TransformationId = keyof typeof transformations;

export function Tpp20Chapter05BendOrBreakEvidenceLab() {
  const [id, setId] = useState<TransformationId>("mutable");
  const transform = transformations[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="第 5 章专属复核 · 失败时保留最后一个有效数据形状"
      title="配送路线失败后，订单是半修改对象还是明确的 Taxed 值？"
      description="比较原地修改、不可变变换和恢复重放。每段输出直接记录总额与策略版本，错误停在 shipping 首差。"
      kind="bend-or-break-transform-pipeline"
      reset={() => setId("mutable")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(transformations) as TransformationId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {transformations[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 md:grid-cols-4">
          {transform.stages.map(([stage, state, color], index) => (
            <div
              key={stage}
              className="relative rounded-control border bg-bg p-3"
              style={{ borderColor: color }}
            >
              <span className="text-xs font-semibold" style={{ color }}>
                {index + 1}. {stage}
              </span>
              <code className="mt-2 block text-xs leading-5">{state}</code>
              {index < 3 && (
                <span
                  className="absolute -right-3 top-1/2 hidden text-lg md:block"
                  style={{ color }}
                  aria-hidden="true"
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <p className="rounded-control border border-border bg-bg p-3 text-sm">
            {transform.input}
          </p>
          <p className="rounded-control border border-border bg-bg p-3 text-sm">
            {transform.restart}
          </p>
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: transform.color }}
        >
          {transform.verdict}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}
