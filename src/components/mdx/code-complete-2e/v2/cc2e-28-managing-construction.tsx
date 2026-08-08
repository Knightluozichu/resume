"use client";

import { useState } from "react";

type Focus = "baseline" | "estimate" | "feedback";

const STAGES = ["编码标准", "配置基线", "工作分解", "反馈闭环"] as const;

const controlClass =
  "min-h-11 rounded-control border border-border bg-background px-3 py-2 text-left text-sm text-foreground transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

function ResetButton({ onReset }: { onReset: () => void }) {
  return (
    <button
      type="button"
      className="min-h-11 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      onClick={onReset}
    >
      重置实验
    </button>
  );
}

function Metric({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-control border border-border bg-background p-3">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-lg font-semibold text-foreground">{value}</dd>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
        {detail}
      </p>
    </div>
  );
}

function focusCopy(focus: Focus) {
  if (focus === "baseline") {
    return {
      eyebrow: "28.2 配置管理 · 28.1 编码实践",
      title: "先让构建有一个可比较的身份",
      description:
        "切换标准、工具和验收窗口时，观察基线为何从“可重放”变成“不可比较”。",
    };
  }
  if (focus === "estimate") {
    return {
      eyebrow: "28.3 进度表 · 28.4 度量",
      title: "预测的分母必须来自已验收批次",
      description:
        "拖动剩余工作量和已验证吞吐量，比较可解释预测与不完整计数的差异。",
    };
  }
  return {
    eyebrow: "28.5 人的环境 · 28.6 管理者",
    title: "故障应在首个失真的反馈节点停下",
    description:
      "注入工具版本不一致，确认失败位置，再关闭故障并用同一输入重放。",
  };
}

export function Cc2e28ManagingConstructionLab({
  focus = "baseline",
}: {
  focus?: Focus;
}) {
  const [remainingWork, setRemainingWork] = useState(8);
  const [throughput, setThroughput] = useState(2);
  const [baselineDrift, setBaselineDrift] = useState(false);
  const [toolMismatch, setToolMismatch] = useState(false);
  const copy = focusCopy(focus);
  const forecast = remainingWork / throughput;
  const firstFailure = baselineDrift ? 1 : toolMismatch ? 3 : -1;
  const accepted = firstFailure < 0;
  const status = baselineDrift
    ? "拒绝：配置基线漂移，当前预测不能与原窗口比较。"
    : toolMismatch
      ? "拒绝：工具版本不一致，先在反馈闭环处隔离并恢复。"
      : `通过：${remainingWork} 个工作单位 ÷ ${throughput} 个单位/窗口 = ${forecast.toFixed(1)} 个窗口。`;

  function reset() {
    setRemainingWork(8);
    setThroughput(2);
    setBaselineDrift(false);
    setToolMismatch(false);
  }

  return (
    <section
      aria-label="管理构建的基线、估算与反馈实验"
      className="not-prose my-6 rounded-card border border-border bg-card p-4 shadow-sm sm:p-5"
      data-visual-kind="cc2e-28-managing-construction"
      data-unit-id="cc2e-28-managing-construction"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            {copy.eyebrow}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            {copy.title}
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {copy.description}
          </p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">
            剩余工作量：{remainingWork} 单位
            <input
              aria-label="剩余工作量"
              className="mt-2 h-11 w-full accent-[var(--accent)]"
              type="range"
              min="4"
              max="12"
              value={remainingWork}
              onChange={(event) => setRemainingWork(Number(event.target.value))}
            />
          </label>
          <label className="block text-sm font-medium text-foreground">
            已验证吞吐量：{throughput} 单位/窗口
            <input
              aria-label="已验证吞吐量"
              className="mt-2 h-11 w-full accent-[var(--accent)]"
              type="range"
              min="1"
              max="4"
              value={throughput}
              onChange={(event) => setThroughput(Number(event.target.value))}
            />
          </label>
          <button
            type="button"
            className={`${controlClass} w-full ${baselineDrift ? "border-danger bg-danger/10" : ""}`}
            aria-pressed={baselineDrift}
            onClick={() => setBaselineDrift((value) => !value)}
          >
            {baselineDrift ? "已注入：基线漂移" : "注入基线漂移"}
          </button>
          <button
            type="button"
            className={`${controlClass} w-full ${toolMismatch ? "border-danger bg-danger/10" : ""}`}
            aria-pressed={toolMismatch}
            onClick={() => setToolMismatch((value) => !value)}
          >
            {toolMismatch ? "已注入：工具版本不一致" : "注入工具版本故障"}
          </button>
          <dl className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            <Metric
              label="当前预测"
              value={`${forecast.toFixed(1)} 个窗口`}
              detail="只在工作量单位和吞吐量窗口相同且基线稳定时可比较。"
            />
            <Metric
              label="验收状态"
              value={accepted ? "可重放" : "需隔离"}
              detail={status}
            />
          </dl>
        </div>

        <div className="rounded-card border border-border bg-background p-3 sm:p-4">
          <svg
            viewBox="0 0 720 340"
            className="h-auto w-full"
            role="img"
            aria-label={`管理构建实验：${status}`}
          >
            <rect
              x="1"
              y="1"
              width="718"
              height="338"
              rx="18"
              fill="var(--bg-elevated)"
              stroke="var(--border)"
            />
            <text
              x="32"
              y="36"
              fontSize="16"
              fontWeight="600"
              fill="var(--text-primary)"
            >
              构建管理证据链
            </text>
            <text x="32" y="60" fontSize="13" fill="var(--text-secondary)">
              固定输入 → 只改一个条件 → 定位首个偏离 → 复位重放
            </text>
            {STAGES.map((stage, index) => {
              const x = 28 + index * 171;
              const failed = firstFailure === index;
              const reached = firstFailure >= 0 && index > firstFailure;
              return (
                <g key={`${stage}-${index}`}>
                  {index < STAGES.length - 1 ? (
                    <path
                      d={`M${x + 128} 166H${x + 158}`}
                      stroke={reached ? "var(--danger)" : "var(--accent)"}
                      strokeWidth="3"
                    />
                  ) : null}
                  <rect
                    x={x}
                    y="112"
                    width="128"
                    height="108"
                    rx="12"
                    fill={failed ? "var(--danger)" : "var(--bg)"}
                    fillOpacity={failed ? 0.14 : 1}
                    stroke={failed ? "var(--danger)" : "var(--border)"}
                    strokeWidth="2"
                  />
                  <circle
                    cx={x + 22}
                    cy="136"
                    r="10"
                    fill={failed ? "var(--danger)" : "var(--accent)"}
                  />
                  <text
                    x={x + 22}
                    y="141"
                    textAnchor="middle"
                    fontSize="12"
                    fill="var(--bg)"
                  >
                    {index + 1}
                  </text>
                  <text
                    x={x + 64}
                    y="143"
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="600"
                    fill="var(--text-primary)"
                  >
                    {stage}
                  </text>
                  <text
                    x={x + 64}
                    y="174"
                    textAnchor="middle"
                    fontSize="12"
                    fill={failed ? "var(--danger)" : "var(--text-secondary)"}
                  >
                    {failed ? "首个偏离" : reached ? "未到达" : "可复核"}
                  </text>
                  <text
                    x={x + 64}
                    y="197"
                    textAnchor="middle"
                    fontSize="12"
                    fill="var(--text-secondary)"
                  >
                    {index === 0
                      ? "规则"
                      : index === 1
                        ? "身份"
                        : index === 2
                          ? "批次"
                          : "结果"}
                  </text>
                </g>
              );
            })}
            <path d="M32 260H688" stroke="var(--border)" strokeWidth="1" />
            <text
              x="360"
              y="291"
              textAnchor="middle"
              fontSize="13"
              fill={accepted ? "var(--success)" : "var(--danger)"}
            >
              {status}
            </text>
            <text
              x="360"
              y="316"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-secondary)"
            >
              重置后应回到 8 单位、2 单位/窗口、无故障
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}
