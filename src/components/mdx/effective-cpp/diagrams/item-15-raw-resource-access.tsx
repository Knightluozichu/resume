"use client";

import { useState } from "react";

const OFFICIAL_CONCEPT_LABELS = [
  "access to raw resources",
  "explicit conversion",
  "implicit conversion",
  "get function",
] as const;

type Item = readonly [title: string, code: string, detail: string];

function RawAccessMap({
  ariaLabel,
  caption,
  items,
}: {
  ariaLabel: string;
  caption: string;
  items: readonly Item[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={`${ariaLabel}：${OFFICIAL_CONCEPT_LABELS.join("、")}`}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map(([title, code, detail], index) => (
            <section
              key={title}
              className="min-h-40 border border-border bg-bg/40 p-4"
            >
              <span className="text-xs tabular-nums text-secondary">
                0{index + 1}
              </span>
              <strong className="mt-3 block text-sm text-primary">
                {title}
              </strong>
              <code className="mt-3 block text-xs text-accent">{code}</code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {detail}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        {caption}
      </figcaption>
    </figure>
  );
}

const boundaryItems = [
  [
    "Owner",
    "unique_ptr/Handle",
    "管理对象保存资源和 deleter，承担唯一释放责任。",
  ],
  ["Project", "get()/native_handle", "显式产生短期 raw borrow，不改变 owner。"],
  ["Call", "legacy_api(raw)", "外部 API 只在调用期间使用且不得保存/释放。"],
  ["Return", "owner still active", "调用结束后管理对象继续拥有同一资源。"],
  [
    "Invalidate",
    "reset/move/destroy",
    "owner 变化后所有旧 raw borrow 立即失效。",
  ],
  [
    "Verify",
    "borrow ledger",
    "测试 API 未释放、未越期保存，owner 最终释放一次。",
  ],
] as const;

const accessItems = [
  [
    "Named getter",
    "get()/native_handle",
    "最明确，可搜索、可审计，调用点承认 raw boundary。",
  ],
  ["Dereference", "operator*", "提供对象引用语义，不暴露 owner 控制操作。"],
  ["Arrow", "operator->", "像 pointer 一样访问资源成员，适合智能指针。"],
  [
    "Explicit conversion",
    "explicit operator T*",
    "需要 cast/context 才转换，减少误用。",
  ],
  [
    "Implicit conversion",
    "operator T*",
    "调用方便但可进入意外重载、比较或 delete。",
  ],
  ["Release", "release()", "不是 borrow，而是转移 ownership，必须单独命名。"],
] as const;

const lifetimeItems = [
  ["Borrow starts", "raw = owner.get()", "记录 owner 身份和当前 generation。"],
  ["Use", "non-owning call", "只在 owner 保证存活、资源未替换的窗口访问。"],
  [
    "Move owner",
    "owner2 = move(owner)",
    "resource 仍存活但旧 owner 状态改变，借用协议需明确。",
  ],
  ["Reset", "owner.reset()", "资源释放，所有 raw/reference/view 悬空。"],
  [
    "Async escape",
    "callback stores raw",
    "调用结束后继续使用，形成 use-after-free 风险。",
  ],
  ["Repair", "shared/weak/token", "需延长或异步观察时升级为明确生命周期机制。"],
] as const;

export function EcppRawAccessBoundaryMap() {
  return (
    <RawAccessMap
      ariaLabel="owner 投影调用返回失效验证六阶段 raw resource 边界图"
      caption="raw access 是 borrow projection：外部 API 不取得 ownership，owner move/reset/destroy 后借用失效。"
      items={boundaryItems}
    />
  );
}

export function EcppResourceAccessFormsMap() {
  return (
    <RawAccessMap
      ariaLabel="命名 getter 解引用箭头显式转换隐式转换 release 六种访问形式图"
      caption="named getter 最清楚；operator 星号箭头保留 pointer 体验；implicit conversion 便利但扩大误用面。"
      items={accessItems}
    />
  );
}

export function EcppBorrowLifetimeMap() {
  return (
    <RawAccessMap
      ariaLabel="借用开始使用 owner move reset 异步逃逸修复六阶段生命周期图"
      caption="raw handle 不携带生命周期；异步或长期保存必须改为 shared/weak/token 等明确协议。"
      items={lifetimeItems}
    />
  );
}

const LAB_SCENARIOS = [
  {
    id: 1,
    label: "get borrow",
    tone: "var(--success)",
    title: "get function 导出短期 raw resource，owner 仍负责释放",
    evidence:
      "owner=alive → get=borrow → call=sync → owner=releases-once → raw=not-owning",
    decision: "accept：access to raw resources 边界清楚",
  },
  {
    id: 2,
    label: "explicit conversion",
    tone: "var(--warning)",
    title: "legacy adapter 需要 raw handle，但调用点明确写出转换边界",
    evidence:
      "owner=alive → explicit conversion → adapter=audited → lifetime=bounded",
    decision: "review：限制转换范围并保留审计",
  },
  {
    id: 3,
    label: "implicit escape",
    tone: "var(--danger)",
    title: "implicit conversion 让 callback 保存 raw borrow，owner 结束后悬空",
    evidence:
      "implicit conversion → callback=stores-raw → owner=destroyed → use-after-free",
    decision: "fail：改用 weak/shared/token 生命周期协议",
  },
] as const;

export function EcppItem15RawAccessLab() {
  const [scenarioId, setScenarioId] = useState(1);
  const scenario =
    LAB_SCENARIOS.find((item) => item.id === scenarioId) ?? LAB_SCENARIOS[0];

  return (
    <section
      className="my-8 rounded-card border border-border bg-elevated p-5"
      data-visual-kind="ecpp-item-15-raw-access-lab"
      aria-label="Effective C++ Item 15 raw resource access 实验"
      aria-labelledby="ecpp-item-15-lab-title"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Lab
          </p>
          <h3
            id="ecpp-item-15-lab-title"
            className="mt-1 text-lg font-semibold text-primary"
          >
            Item 15 raw resource 生命周期实验
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-secondary">
            先预测 owner、borrow 和释放责任，再切换 get、explicit conversion 与异步逃逸样本。
          </p>
        </div>
        <button
          type="button"
          className="min-h-11 rounded-button border border-border px-3 py-2 text-sm text-secondary transition hover:border-accent hover:text-accent"
          onClick={() => setScenarioId(1)}
          aria-label="重置实验"
        >
          重置实验
        </button>
      </div>
      <div
        className="mt-5 grid gap-3 sm:grid-cols-3"
        role="tablist"
        aria-label="Item 15 raw resource 实验场景选择"
      >
        {LAB_SCENARIOS.map((item) => {
          const selected = item.id === scenarioId;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-pressed={selected}
              className={`min-h-11 rounded-button border px-3 py-2 text-left text-sm transition ${
                selected
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-secondary hover:border-accent hover:text-accent"
              }`}
              onClick={() => setScenarioId(item.id)}
            >
              <span className="block font-semibold">{item.label}</span>
              <span className="mt-1 block text-xs opacity-80">
                样本 {item.id}
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto]">
        <div className="rounded-card border border-border p-4">
          <div className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: scenario.tone }}
            />
            <p className="font-semibold text-primary">{scenario.title}</p>
          </div>
          <p className="mt-3 break-words font-mono text-xs text-secondary">
            {scenario.evidence}
          </p>
        </div>
        <div className="rounded-card border border-border p-4 md:min-w-64">
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
            判定
          </p>
          <p
            className="mt-2 text-sm font-semibold"
            style={{ color: scenario.tone }}
          >
            {scenario.decision}
          </p>
        </div>
      </div>
      <p
        className="mt-4 text-xs text-secondary"
        role="status"
        aria-live="polite"
      >
        当前样本：{scenario.label}；保存 owner 身份、borrow 时间窗、conversion 形式、deleter 和复位轨迹。
      </p>
    </section>
  );
}
