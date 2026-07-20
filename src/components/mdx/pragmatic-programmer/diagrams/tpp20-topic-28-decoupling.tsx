"use client";

import { useState } from "react";

import { Tpp20DedicatedFrame } from "./tpp20-dedicated-frame";

const unitId = "tpp20-topic-28-decoupling";
const c = {
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
};

const knowledgePaths = {
  train: {
    label: "火车残骸式查询",
    expression: "order.customer.address.country.tax.rate",
    links: [
      ["Checkout", "知道 Order 暴露 customer", c.warning],
      ["Customer", "知道 Customer 暴露 address", c.warning],
      ["Address", "知道 Address 内部有 country", c.danger],
      ["Country", "知道 Country 直接保存 tax", c.danger],
      ["Tax", "知道 rate 的单位与生效日", c.danger],
    ],
    change:
      "Address 改为 postalAddress + jurisdictionId 时，Checkout 也必须修改。",
    color: c.danger,
  },
  boundary: {
    label: "向拥有知识的对象提问",
    expression: "order.taxJurisdiction(at: 2026-07-20)",
    links: [
      ["Checkout", "只知道 Order 能给税区", c.success],
      ["Order", "用 shipping destination 决定税区", c.success],
      ["TaxPort", "接收 jurisdictionId + date", c.success],
      ["TaxPolicy", "返回 Money/Rate，不暴露存储", c.success],
    ],
    change: "Address 内部重构只影响 Order 适配；Checkout 合同和调用点不变。",
    color: c.success,
  },
} as const;
type KnowledgePathId = keyof typeof knowledgePaths;

export function Tpp20Topic28DecouplingSystemLab() {
  const [id, setId] = useState<KnowledgePathId>("train");
  const path = knowledgePaths[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 28 专属解剖图 · 税率调用链的知识泄漏"
      title="Checkout 为得到税率，究竟需要知道多少内部对象？"
      description="切换火车残骸与领域边界。固定同一订单税区查询，逐段标出调用者被迫知道的对象结构和变化触达。"
      kind="decoupling-tax-train-wreck"
      reset={() => setId("train")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-2">
          {(Object.keys(knowledgePaths) as KnowledgePathId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {knowledgePaths[key].label}
            </button>
          ))}
        </div>
        <code
          className="mt-4 block overflow-x-auto rounded-control border border-border bg-bg p-3 text-sm"
          style={{ color: path.color }}
        >
          {path.expression}
        </code>
        <div className="mt-3 flex flex-col gap-2 lg:flex-row">
          {path.links.map(([owner, knowledge, color], index) => (
            <div
              key={owner}
              className="relative flex-1 rounded-control border bg-bg p-3"
              style={{ borderColor: color }}
            >
              <span className="text-xs font-semibold" style={{ color }}>
                {owner}
              </span>
              <p className="mt-2 text-sm leading-5">{knowledge}</p>
              {index < path.links.length - 1 && (
                <span
                  className="absolute -right-3 top-1/2 z-10 hidden text-lg lg:block"
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
          style={{ borderColor: path.color }}
        >
          {path.change}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const refactors = {
  chained: {
    label: "直接调用链",
    oldModel: "Customer.address.countryCode",
    newModel: "Customer.destinations[] + activeShippingId",
    touched: [
      ["checkout.ts", "重写 address.countryCode", c.danger],
      ["invoice.ts", "重写 address.countryCode", c.danger],
      ["shipping-label.ts", "重写 address.*", c.danger],
      ["fraud.ts", "重写 address.countryCode", c.danger],
    ],
    tests: "4 个消费者各自重建“当前配送地址”的逻辑",
    verdict: "同一知识复制到调用链末端，模型变化向外放射。",
    color: c.danger,
  },
  message: {
    label: "显式消息/查询边界",
    oldModel: "Order.shippingDestination()",
    newModel: "Order.shippingDestination()（内部改为 destinations 查找）",
    touched: [
      ["order.ts", "内部适配新模型", c.warning],
      ["checkout.ts", "0 行", c.success],
      ["invoice.ts", "0 行", c.success],
      ["shipping-label.ts", "0 行", c.success],
      ["fraud.ts", "0 行", c.success],
    ],
    tests: "Order 边界测试新增多地址/无 active id；消费者合同测试保持",
    verdict: "边界并非隐藏所有变化，而是把拥有知识的修改集中到一处。",
    color: c.success,
  },
} as const;
type RefactorId = keyof typeof refactors;

export function Tpp20Topic28DecouplingFeedbackLab() {
  const [id, setId] = useState<RefactorId>("chained");
  const refactor = refactors[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 28 专属实验 · 地址模型变化的触达图"
      title="Customer 支持多个地址后，哪些调用者必须知道？"
      description="只改变调用链边界，固定同一次 address → destinations 重构；逐文件展示真实触达行和新增测试责任。"
      kind="decoupling-change-touch-map"
      reset={() => setId("chained")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-2">
          {(Object.keys(refactors) as RefactorId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {refactors[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <code className="rounded-control border border-border bg-bg p-3 text-xs">
            before: {refactor.oldModel}
          </code>
          <code className="rounded-control border border-border bg-bg p-3 text-xs">
            after: {refactor.newModel}
          </code>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {refactor.touched.map(([file, change, color]) => (
            <div
              key={file}
              className="rounded-control border bg-bg p-3"
              style={{ borderColor: color }}
            >
              <code className="text-xs font-semibold" style={{ color }}>
                {file}
              </code>
              <strong className="mt-2 block text-sm">{change}</strong>
            </div>
          ))}
        </div>
        <p className="mt-3 rounded-control border border-border bg-bg p-3 text-sm">
          <strong>测试：</strong> {refactor.tests}
        </p>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: refactor.color }}
        >
          {refactor.verdict}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const contexts = {
  global: {
    label: "全局可变 currency/locale",
    steps: [
      ["R-A", "set global=CNY, zh-CN", c.success],
      ["R-B", "set global=USD, en-US", c.warning],
      ["R-A", "format 500 using current global", c.danger],
      ["R-A output", "$500.00（应为 ¥500.00）", c.danger],
    ],
    owner: "进程全局变量没有请求 owner",
    replay: "单线程测试都通过；并发调度改变结果",
    color: c.danger,
  },
  explicit: {
    label: "显式 RequestContext",
    steps: [
      ["R-A", "ctxA={CNY, zh-CN}", c.success],
      ["R-B", "ctxB={USD, en-US}", c.success],
      ["R-A", "format(Money CNY 500, ctxA)", c.success],
      ["R-A output", "¥500.00", c.success],
    ],
    owner: "context 由 request R-A 拥有并只读传递",
    replay: "任意交错下 A/B 都使用自己的参数",
    color: c.success,
  },
  fault: {
    label: "反例：context 仍藏在 thread-local",
    steps: [
      ["R-A", "thread-1 local=CNY", c.success],
      ["await", "R-A suspend", c.warning],
      ["resume", "R-A 在 thread-3 继续", c.warning],
      ["output", "thread-3 没有 locale", c.danger],
    ],
    owner: "thread 并不是 async request 的稳定 owner",
    replay: "显式参数/异步上下文传播才是可见合同",
    color: c.warning,
  },
} as const;
type ContextId = keyof typeof contexts;

export function Tpp20Topic28DecouplingEvidenceLab() {
  const [id, setId] = useState<ContextId>("global");
  const context = contexts[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 28 专属复核 · 并发请求不能共享可变上下文"
      title="R-A 的人民币金额为何会被 R-B 的美元设置污染？"
      description="比较全局变量、显式 RequestContext 和 thread-local 反例。事件顺序固定，直接观察每个请求实际读取的 currency/locale。"
      kind="decoupling-request-context"
      reset={() => setId("global")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(contexts) as ContextId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {contexts[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 md:grid-cols-4">
          {context.steps.map(([request, action, color], index) => (
            <div
              key={`${request}-${index}`}
              className="relative rounded-control border bg-bg p-3"
              style={{ borderColor: color }}
            >
              <span className="text-xs font-semibold" style={{ color }}>
                {index + 1}. {request}
              </span>
              <strong className="mt-2 block text-sm leading-5">{action}</strong>
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
            <strong>所有权：</strong> {context.owner}
          </p>
          <p
            className="rounded-control border bg-bg p-3 text-sm"
            style={{ borderColor: context.color }}
          >
            <strong>重放：</strong> {context.replay}
          </p>
        </div>
      </div>
    </Tpp20DedicatedFrame>
  );
}
