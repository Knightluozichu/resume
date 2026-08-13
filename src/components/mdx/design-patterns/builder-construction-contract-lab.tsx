"use client";

import { useState } from "react";

const OFFICIAL_CONCEPTS = [
  "模式名称与分类",
  "意图",
  "别名",
  "动机",
  "适用性",
  "结构",
  "参与者",
  "协作",
  "后果",
  "实现",
  "示例代码",
  "已知应用",
  "相关模式",
] as const;

const REQUIRED_STEPS = [
  { key: "environment", label: "设置环境", detail: "staging" },
  { key: "service", label: "添加服务", detail: "api" },
  { key: "probe", label: "加入健康探针", detail: "/health" },
  { key: "rollback", label: "加入回滚", detail: "rollout undo" },
] as const;

type Format = "run" | "audit";
type StepKey = (typeof REQUIRED_STEPS)[number]["key"];

function buildLines(format: Format, completed: Set<StepKey>) {
  const prefix = format === "run" ? "kubectl" : "AUDIT";
  return REQUIRED_STEPS.filter((step) => completed.has(step.key)).map(
    (step, index) =>
      format === "run"
        ? `${index + 1}. ${prefix} ${step.detail}`
        : `${index + 1}. ${step.label} = ${step.detail}`,
  );
}

export function BuilderConstructionContractLab() {
  const [format, setFormat] = useState<Format>("run");
  const [completed, setCompleted] = useState<Set<StepKey>>(new Set());
  const [built, setBuilt] = useState(false);

  const complete = completed.size === REQUIRED_STEPS.length;
  const rejected = built && !complete;
  const lines = buildLines(format, completed);

  function toggleStep(key: StepKey) {
    setBuilt(false);
    setCompleted((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function runDirector() {
    setCompleted(new Set(REQUIRED_STEPS.map((step) => step.key)));
    setBuilt(true);
  }

  function reset() {
    setFormat("run");
    setCompleted(new Set());
    setBuilt(false);
  }

  return (
    <figure
      aria-label="建造者模式构造合同实验"
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="builder-construction-contract-lab"
      data-unit-id="designpatterns-10"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              BUILDER · CONSTRUCTION CONTRACT
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              部署计划构造合同台
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择最终表示，逐步构造产品；缺少健康探针或回滚时，build 会拒绝半成品。
            </p>
          </div>
          <button
            aria-label="重置建造者构造合同实验"
            className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
            onClick={reset}
            type="button"
          >
            重置实验
          </button>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="min-w-0 space-y-4">
            <div>
              <p className="text-xs font-semibold text-secondary">选择 Builder 表示</p>
              <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                {([
                  ["run", "执行版 Builder", "可交给发布器执行"],
                  ["audit", "审计版 Builder", "保留可读证据"],
                ] as const).map(([key, label, detail]) => (
                  <button
                    aria-pressed={format === key}
                    className={`min-h-11 min-w-0 rounded-control border px-3 py-2 text-left text-xs transition-colors ${
                      format === key
                        ? "border-accent text-accent"
                        : "border-border text-secondary hover:border-accent hover:text-primary"
                    }`}
                    key={key}
                    onClick={() => {
                      setFormat(key);
                      setBuilt(false);
                    }}
                    type="button"
                  >
                    <span className="block break-words">{label}</span>
                    <span className="mt-1 block text-[11px] text-secondary">{detail}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold text-secondary">Builder 当前状态</p>
                <span className="text-xs text-secondary">
                  {completed.size}/{REQUIRED_STEPS.length} 步
                </span>
              </div>
              <div className="mt-2 grid gap-2">
                {REQUIRED_STEPS.map((step) => {
                  const active = completed.has(step.key);
                  return (
                    <button
                      aria-pressed={active}
                      className={`min-h-11 min-w-0 rounded-control border px-3 py-2 text-left text-xs transition-colors ${
                        active
                          ? "border-success text-success"
                          : "border-border text-secondary hover:border-accent hover:text-primary"
                      }`}
                      key={step.key}
                      onClick={() => toggleStep(step.key)}
                      type="button"
                    >
                      <span className="block break-words">{step.label}</span>
                      <span className="mt-1 block font-mono text-[11px] text-secondary">
                        {step.detail}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              className="min-h-11 w-full rounded-control border border-accent px-3 py-2 text-left text-xs text-accent transition-colors hover:bg-accent/10"
              onClick={runDirector}
              type="button"
            >
              运行标准流程（Director）
            </button>
            <p className="text-xs leading-5 text-secondary">
              当前按 {OFFICIAL_CONCEPTS.length} 个正式目录字段复核：步骤、责任、不变量与表示都必须能回到实验。
            </p>
          </div>

          <div className="min-w-0 rounded-card border border-border bg-[var(--bg)] p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                {format === "run" ? "EXECUTION PRODUCT" : "AUDIT PRODUCT"}
              </p>
              <span
                className={`rounded-control border px-2 py-1 text-xs ${
                  rejected
                    ? "border-warning text-warning"
                    : complete
                      ? "border-success text-success"
                      : "border-border text-secondary"
                }`}
              >
                {rejected ? "合同拒绝" : complete ? "产品完成" : "等待步骤"}
              </span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-[0.82fr_1.18fr]">
              <div className="rounded-control border border-accent p-4">
                <p className="text-xs font-semibold text-accent">Director</p>
                <p className="mt-2 break-words font-mono text-sm text-primary">
                  deployPlan(builder)
                </p>
                <p className="mt-2 text-xs leading-5 text-secondary">
                  固定步骤顺序，不决定最终表示。
                </p>
              </div>
              <div className="rounded-control border border-border p-4">
                <p className="text-xs font-semibold text-secondary">Product 轨迹</p>
                <div className="mt-3 space-y-2">
                  {REQUIRED_STEPS.map((step, index) => (
                    <div className="flex min-w-0 items-center gap-2" key={step.key}>
                      <span
                        className={`grid size-6 shrink-0 place-items-center rounded-full border text-[11px] ${
                          completed.has(step.key)
                            ? "border-success text-success"
                            : "border-border text-secondary"
                        }`}
                      >
                        {index + 1}
                      </span>
                      <span className="min-w-0 break-words text-xs text-primary">
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              aria-live="polite"
              className={`mt-4 rounded-control border p-4 ${
                rejected
                  ? "border-warning"
                  : complete
                    ? "border-success"
                    : "border-border"
              }`}
            >
              <p
                className={`text-sm font-semibold ${
                  rejected
                    ? "text-warning"
                    : complete
                      ? "text-success"
                      : "text-primary"
                }`}
              >
                {rejected
                  ? "build 拒绝：产品缺少必需步骤"
                  : complete
                    ? "build 通过：产品满足构造合同"
                    : "build 尚未执行：先补齐构造步骤"}
              </p>
              <p className="mt-2 text-xs leading-5 text-secondary">
                {rejected
                  ? "健康探针和回滚动作属于产品不变量；半成品不能进入发布流程。"
                  : complete
                    ? `Builder 已生成 ${format === "run" ? "执行版" : "审计版"} 表示，步骤顺序保持不变。`
                    : "可以手动切换步骤，或让 Director 一次编排完整流程。"}
              </p>
              {lines.length > 0 ? (
                <pre className="mt-3 overflow-x-auto rounded-control border border-border p-3 text-xs leading-5 text-primary">
                  {lines.join("\n")}
                </pre>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
