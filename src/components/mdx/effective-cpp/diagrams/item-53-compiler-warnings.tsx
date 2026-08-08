"use client";

import { useState } from "react";

const OFFICIAL_CONCEPT_LABELS = [
  "compiler warnings",
  "warning level",
  "different compilers",
  "portability",
] as const;

type WarningCell = readonly [stage: string, signal: string, action: string];

function WarningGrid({
  ariaLabel,
  caption,
  cells,
}: {
  ariaLabel: string;
  caption: string;
  cells: readonly WarningCell[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={`${ariaLabel}：${OFFICIAL_CONCEPT_LABELS.join("、")}`}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cells.map(([stage, signal, action], index) => (
            <section
              key={stage}
              className="min-h-40 border border-border bg-bg/40 p-4"
            >
              <span className="text-xs tabular-nums text-secondary">
                0{index + 1}
              </span>
              <strong className="mt-3 block text-sm text-primary">
                {stage}
              </strong>
              <code className="mt-3 block text-xs text-accent">{signal}</code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {action}
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

const lifecycleCells = [
  ["Enable", "high warning level", "项目、CI 与 release 使用同一基线。"],
  ["Capture", "diagnostic id + location", "保留完整 message，不只截最后一行。"],
  ["Classify", "bug / portability / noise", "先理解语义，再决定修复或抑制。"],
  ["Fix root", "code + contract test", "修改代码并补能证明行为的测试。"],
  [
    "Suppress narrowly",
    "one diagnostic / scope",
    "必要抑制附理由、owner 和到期条件。",
  ],
  ["Gate", "zero new warnings", "baseline 不增长，升级 compiler 时重新审计。"],
] as const;

const hidingCells = [
  ["Base contract", "virtual f() const", "base 提供 const-qualified virtual。"],
  ["Derived typo", "void f()", "缺少 const，形成不同 signature。"],
  ["Lookup", "D::f hides B::f", "derived 同名声明隐藏 base 名称。"],
  ["Dispatch", "B& -> D object", "经 base call 仍执行 Base::f。"],
  [
    "Warning",
    "overloaded-virtual",
    "compiler 提示看似 override 实际没有覆盖。",
  ],
  ["Repair", "override + const", "override 把未来 mismatch 升为 hard error。"],
] as const;

const compilerCells = [
  ["GCC", "-Wall -Wextra", "擅长转换、未使用与部分 ABI 诊断。"],
  ["Clang", "-Weverything curated", "常给出清晰 fix-it 和不同静态分析。"],
  ["MSVC", "/W4 /permissive-", "暴露语言扩展、Windows ABI 与一致性问题。"],
  ["Library", "libstdc++ / libc++", "headers 与实现差异触发不同 assumptions。"],
  ["Standard mode", "C++20 strict", "禁止依赖非标准扩展和旧默认。"],
  ["Matrix gate", "all required jobs", "任一目标 warning/error 都阻止合并。"],
] as const;

export function EcppWarningLifecycleMap() {
  return (
    <WarningGrid
      ariaLabel="启用警告捕获诊断分类根因修复局部抑制零新增门禁六阶段 warning 生命周期图"
      caption="warning 不是背景噪声：统一启用、理解语义、修复根因，只有证据充分时才局部抑制，并阻止 baseline 增长。"
      cells={lifecycleCells}
    />
  );
}

export function EcppHiddenVirtualWarningMap() {
  return (
    <WarningGrid
      ariaLabel="基类契约派生签名错误名字隐藏动态分派编译警告 override 修复六阶段隐藏 virtual 图"
      caption="一个缺失 const 的 derived function 不会 override base virtual；warning 揭示真实分派偏差，override 将其变成编译错误。"
      cells={hidingCells}
    />
  );
}

export function EcppMultiCompilerWarningMap() {
  return (
    <WarningGrid
      ariaLabel="GCC Clang MSVC 标准库标准模式矩阵门禁六维多编译器警告图"
      caption="different compilers 和 libraries 覆盖不同诊断盲区；多工具链矩阵比单一 warning level 更接近 portability 证据。"
      cells={compilerCells}
    />
  );
}

const LAB_SCENARIOS = [
  {
    id: 1,
    label: "warning contract",
    tone: "var(--success)",
    title: "高 warning level 发现 hidden virtual，override 把意图升为契约",
    evidence:
      "warning-level=curated → hidden-virtual=found → override=added → regression=tested",
    decision: "accept：诊断进入可验证 contract",
  },
  {
    id: 2,
    label: "zero-new baseline",
    tone: "var(--warning)",
    title: "旧项目保留 baseline，但每次 change 不得增加新 warning",
    evidence:
      "baseline=versioned → diff=checked → new-warning=blocked → debt=repays",
    decision: "review：逐模块偿还历史存量",
  },
  {
    id: 3,
    label: "compiler drift",
    tone: "var(--danger)",
    title: "GCC 干净而 Clang 或 MSVC 暴露 portability warning",
    evidence:
      "compiler=differs → diagnostic=differs → standard-mode=checked → portability=review",
    decision: "fail：补齐矩阵或修标准语义",
  },
] as const;

export function EcppItem53WarningLab() {
  const [scenarioId, setScenarioId] = useState(1);
  const scenario =
    LAB_SCENARIOS.find((item) => item.id === scenarioId) ?? LAB_SCENARIOS[0];

  return (
    <section
      className="my-8 rounded-card border border-border bg-elevated p-5"
      data-visual-kind="ecpp-item-53-warning-lab"
      aria-label="Effective C++ Item 53 compiler warnings 实验"
      aria-labelledby="ecpp-item-53-lab-title"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Lab
          </p>
          <h3
            id="ecpp-item-53-lab-title"
            className="mt-1 text-lg font-semibold text-primary"
          >
            Item 53 warning 治理实验
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-secondary">
            先预测诊断会落在契约、baseline 还是 portability，再切换三种 warning 治理样本。
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
        aria-label="Item 53 warning 实验场景选择"
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
        当前样本：{scenario.label}；保存 compiler、warning level、diagnostic id、baseline、mode 与复位轨迹。
      </p>
    </section>
  );
}
