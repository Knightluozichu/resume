"use client";

import { useState } from "react";

import { Tpp20DedicatedFrame } from "./tpp20-dedicated-frame";

const unitId = "tpp20-topic-31-inheritance-tax";
const color = {
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
};

const structures = {
  inheritance: {
    label: "继承实现",
    root: "BasePayment",
    relation: "is-a + protected state",
    leaves: ["CardPayment", "WirePayment", "VoucherPayment"],
    change: "BasePayment.retry() 从 2 次改为指数退避",
    propagation: [
      "3 个子类继承新时序",
      "Wire 覆盖 retry 但仍读 attempts",
      "Voucher 测试依赖 protected clock",
    ],
    touched: "4 个类 / 17 个测试",
    verdict: "复用了一段实现，也绑定了状态、生命周期和覆盖规则。",
    tone: color.danger,
  },
  interface: {
    label: "接口多态",
    root: "Payment.execute(request)",
    relation: "implements contract",
    leaves: ["CardAdapter", "WireAdapter", "VoucherAdapter"],
    change: "RetryPolicy 从 fixed(2) 改为 exponential(3)",
    propagation: [
      "接口签名不变",
      "策略契约测试重放",
      "各适配器只验证自己的边界",
    ],
    touched: "1 个策略 / 6 个契约测试",
    verdict: "多态只承诺行为；实现复用没有偷渡进类型关系。",
    tone: color.success,
  },
  delegation: {
    label: "委托 + 组合",
    root: "PaymentService",
    relation: "has-a RetryPolicy",
    leaves: ["Gateway", "RetryPolicy", "AuditSink"],
    change: "只替换 RetryPolicy 实例",
    propagation: [
      "服务保留请求上下文",
      "Gateway 不感知重试算法",
      "AuditSink 记录每次尝试",
    ],
    touched: "2 个组件 / 8 个测试",
    verdict: "对象通过显式端口协作，替换范围与责任边界一致。",
    tone: color.accent,
  },
} as const;
type StructureId = keyof typeof structures;

export function Tpp20Topic31InheritanceTaxSystemLab() {
  const [id, setId] = useState<StructureId>("inheritance");
  const structure = structures[id];

  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 31 专属解剖图 · 支付重试的关系结构"
      title="改一条重试规则，会沿类型树扩散到哪里？"
      description="固定同一支付场景，只切换实现继承、接口多态和委托组合。图中边的含义、传播对象与测试触达会随结构真实变化。"
      kind="inheritance-tax-propagation-graph"
      reset={() => setId("inheritance")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(structures) as StructureId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${
                id === key
                  ? "border-accent bg-accent/10"
                  : "border-border bg-bg"
              }`}
            >
              {structures[key].label}
            </button>
          ))}
        </div>

        <div className="mt-4 rounded-control border border-border bg-bg p-4">
          <div
            className="mx-auto max-w-sm rounded-control border-2 p-3 text-center"
            style={{ borderColor: structure.tone }}
          >
            <code className="text-sm font-semibold">{structure.root}</code>
          </div>
          <div
            className="mx-auto flex w-11/12 flex-col items-center"
            aria-hidden="true"
          >
            <span
              className="h-5 border-l"
              style={{ borderColor: structure.tone }}
            />
            <span
              className="w-full border-t"
              style={{ borderColor: structure.tone }}
            />
          </div>
          <p
            className="mb-2 text-center text-xs font-semibold"
            style={{ color: structure.tone }}
          >
            {structure.relation}
          </p>
          <div className="grid gap-2 sm:grid-cols-3">
            {structure.leaves.map((leaf) => (
              <code
                key={leaf}
                className="rounded-control border border-border bg-surface p-3 text-center text-xs"
              >
                {leaf}
              </code>
            ))}
          </div>
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-[0.9fr_1.1fr]">
          <div
            className="rounded-control border bg-bg p-3"
            style={{ borderColor: structure.tone }}
          >
            <p className="text-xs font-semibold text-muted">唯一变更</p>
            <p className="mt-1 text-sm">{structure.change}</p>
            <code
              className="mt-3 block text-xs"
              style={{ color: structure.tone }}
            >
              触达：{structure.touched}
            </code>
          </div>
          <ol className="grid gap-2 sm:grid-cols-3">
            {structure.propagation.map((step, index) => (
              <li
                key={step}
                className="rounded-control border border-border bg-bg p-3 text-sm"
              >
                <span
                  className="mr-2 font-semibold"
                  style={{ color: structure.tone }}
                >
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: structure.tone }}
        >
          {structure.verdict}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const substitutions = {
  base: {
    label: "基线：组合",
    policy: "ExponentialRetry(max=3)",
    trace: [
      "attempt 1 → timeout",
      "policy → wait 100 ms",
      "attempt 2 → approved",
      "audit → 2 attempts",
    ],
    contract: [true, true, true],
    result: "APPROVED；调用者只看到 PaymentResult",
    tone: color.success,
  },
  subclass: {
    label: "换成子类覆盖",
    policy: "WirePayment.retry() override",
    trace: [
      "attempt 1 → timeout",
      "override → wait 0 ms",
      "attempt 2 → bank throttled",
      "audit → missing delay",
    ],
    contract: [true, false, false],
    result: "THROTTLED；替换后破坏节流与审计契约",
    tone: color.danger,
  },
  delegate: {
    label: "换委托对象",
    policy: "FixedRetry(max=3, delay=250 ms)",
    trace: [
      "attempt 1 → timeout",
      "policy → wait 250 ms",
      "attempt 2 → approved",
      "audit → 2 attempts",
    ],
    contract: [true, true, true],
    result: "APPROVED；策略改变，服务契约保持",
    tone: color.accent,
  },
} as const;
type SubstitutionId = keyof typeof substitutions;

export function Tpp20Topic31InheritanceTaxFeedbackLab() {
  const [id, setId] = useState<SubstitutionId>("base");
  const sample = substitutions[id];
  const contracts = ["结果类型不变", "尊重网关节流", "每次尝试可审计"];

  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 31 专属实验 · 替换不是能编译就算多态"
      title="把支付实现换掉，调用契约还成立吗？"
      description="固定同一超时后成功的网关脚本，分别替换子类覆盖或 RetryPolicy 委托。逐项检查结果、节流和审计三个契约。"
      kind="inheritance-tax-substitution-contract"
      reset={() => setId("base")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(substitutions) as SubstitutionId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${
                id === key
                  ? "border-accent bg-accent/10"
                  : "border-border bg-bg"
              }`}
            >
              {substitutions[key].label}
            </button>
          ))}
        </div>
        <code
          className="mt-4 block rounded-control border bg-bg p-3 text-xs"
          style={{ borderColor: sample.tone }}
        >
          PaymentService has-a {sample.policy}
        </code>
        <ol className="mt-3 grid gap-2 md:grid-cols-4">
          {sample.trace.map((event, index) => (
            <li
              key={event}
              className="relative rounded-control border border-border bg-bg p-3 text-xs leading-5"
            >
              <span
                className="mr-1 font-semibold"
                style={{ color: sample.tone }}
              >
                {index + 1}.
              </span>
              {event}
              {index < sample.trace.length - 1 && (
                <span
                  className="absolute -right-3 top-1/2 hidden text-lg md:block"
                  style={{ color: sample.tone }}
                  aria-hidden="true"
                >
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {contracts.map((contract, index) => (
            <p
              key={contract}
              className="rounded-control border bg-bg p-3 text-sm"
              style={{
                borderColor: sample.contract[index]
                  ? color.success
                  : color.danger,
              }}
            >
              <strong>{sample.contract[index] ? "通过" : "失败"}</strong> ·{" "}
              {contract}
            </p>
          ))}
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

const changes = {
  retry: {
    label: "改变重试算法",
    inherited: [4, 17, 3, 2],
    composed: [2, 8, 0, 0],
    note: "继承树把 protected attempts 与 clock 一并暴露给子类。",
  },
  audit: {
    label: "增加审计字段",
    inherited: [4, 12, 2, 1],
    composed: [1, 5, 0, 0],
    note: "独立 AuditSink 可扩展事件，不要求支付类型跟着变化。",
  },
  gateway: {
    label: "替换支付网关",
    inherited: [3, 14, 2, 2],
    composed: [1, 6, 0, 0],
    note: "显式 Gateway 端口把供应商差异限制在一个适配器。",
  },
} as const;
type ChangeId = keyof typeof changes;

export function Tpp20Topic31InheritanceTaxEvidenceLab() {
  const [id, setId] = useState<ChangeId>("retry");
  const change = changes[id];
  const metrics = ["触达组件", "重跑测试", "隐藏状态依赖", "替换契约失败"];

  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 31 专属复核 · 把继承税记成可比较的触达账"
      title="这次复用到底让下一次改动多付了多少？"
      description="选择一项变更，比较继承树与组合结构的实际触达、测试和契约失败。数值来自同一支付边界，不拿代码行数冒充耦合。"
      kind="inheritance-tax-change-ledger"
      reset={() => setId("retry")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(changes) as ChangeId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${
                id === key
                  ? "border-accent bg-accent/10"
                  : "border-border bg-bg"
              }`}
            >
              {changes[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 overflow-x-auto rounded-control border border-border bg-bg">
          <div className="min-w-[34rem] p-4">
            <div className="grid grid-cols-[1.5fr_repeat(2,1fr)] gap-2 text-xs font-semibold text-muted">
              <span>证据</span>
              <span>实现继承</span>
              <span>接口 + 组合</span>
            </div>
            {metrics.map((metric, index) => {
              const inherited = change.inherited[index];
              const composed = change.composed[index];
              const max = Math.max(inherited, composed, 1);
              return (
                <div
                  key={metric}
                  className="mt-3 grid grid-cols-[1.5fr_repeat(2,1fr)] items-center gap-2 text-sm"
                >
                  <span>{metric}</span>
                  <span
                    className="rounded-control bg-danger/10 p-2 font-semibold"
                    style={{
                      width: `${Math.max(38, (inherited / max) * 100)}%`,
                    }}
                  >
                    {inherited}
                  </span>
                  <span
                    className="rounded-control bg-success/10 p-2 font-semibold"
                    style={{
                      width: `${Math.max(38, (composed / max) * 100)}%`,
                    }}
                  >
                    {composed}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <p className="mt-3 rounded-control border border-border bg-bg p-3 text-sm leading-6">
          {change.note}
        </p>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: color.success }}
        >
          裁决：当关系只为复用实现、子类型不能稳定保持替换契约时，先提取接口，再把策略或服务作为委托对象注入；mixin
          仅共享无身份、无生命周期耦合的能力。
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}
