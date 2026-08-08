"use client";

import { useState } from "react";

const PRIMARY = "var(--text-primary)";
const MUTED = "var(--text-secondary)";
const BORDER = "var(--border)";
const SURFACE = "var(--bg)";
const ACCENT = "var(--accent)";
const SUCCESS = "var(--success)";
const WARNING = "var(--warning)";
const DANGER = "var(--danger)";

type Scenario = "baseline" | "boundary" | "fault" | "repair";

export type StructuralLabConfig = {
  chapterLabel: string;
  title: string;
  chain: readonly { label: string; detail: string }[];
  visualKind: string;
  baseline: string;
  boundary: string;
  fault: string;
  repair: string;
};

const SCENARIOS: readonly { id: Scenario; label: string }[] = [
  { id: "baseline", label: "正常路径" },
  { id: "boundary", label: "边界取舍" },
  { id: "fault", label: "注入误区" },
  { id: "repair", label: "复位重放" },
];

export function StructuralEvidenceLab({ config }: { config: StructuralLabConfig }) {
  const [scenario, setScenario] = useState<Scenario>("baseline");
  const index = scenario === "baseline" ? 0 : scenario === "boundary" ? 1 : scenario === "fault" ? 3 : 4;
  const color = scenario === "boundary" ? WARNING : scenario === "fault" ? DANGER : scenario === "repair" ? SUCCESS : ACCENT;
  const status = scenario === "baseline" ? config.baseline : scenario === "boundary" ? config.boundary : scenario === "fault" ? config.fault : config.repair;

  return (
    <section
      aria-label={`${config.chapterLabel}专属因果实验`}
      data-visual-kind={config.visualKind}
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">{config.chapterLabel} · 证据实验</p>
          <h3 className="mt-1 text-base font-semibold text-primary">{config.title}</h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            固定版本、输入和观察窗口，只改变一个条件；先预测首个偏离，再用同一基线复位。
          </p>
        </div>
        <button
          type="button"
          onClick={() => setScenario("baseline")}
          aria-label={`重置${config.chapterLabel}实验`}
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary"
        >
          重置实验
        </button>
      </header>

      <div className="min-w-0 p-5">
        <div className="grid min-w-0 gap-3 sm:grid-cols-4" aria-label={`${config.chapterLabel}实验场景`}>
          {SCENARIOS.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={scenario === item.id}
              onClick={() => setScenario(item.id)}
              className={`min-h-11 min-w-0 rounded-control border px-3 py-2 text-sm transition-colors ${
                scenario === item.id
                  ? "border-accent bg-accent/10 text-primary"
                  : "border-border bg-surface text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-4 min-w-0 overflow-x-auto rounded-card border border-border bg-surface p-3">
          <svg
            viewBox="0 0 920 430"
            role="img"
            aria-label={`${config.chapterLabel}五节点证据链，当前状态：${status}`}
            className="mx-auto block h-auto min-w-[720px] w-full max-w-[920px]"
          >
            <text x="34" y="34" fontSize="20" fontWeight="700" fill={PRIMARY}>
              结构条目也必须连接到可复查证据
            </text>
            <text x="34" y="62" fontSize="14" fill={MUTED}>
              标题负责定位，合同、输入、结果和复位负责裁决
            </text>
            <path d="M92 176H828" fill="none" stroke={BORDER} strokeWidth="10" strokeLinecap="round" />
            {config.chain.slice(0, -1).map((stage, i) => {
              const x = 92 + i * 184;
              return <path key={`link-${stage.label}`} d={`M${x + 46} 176H${x + 138}`} fill="none" stroke={ACCENT} strokeWidth="3" />;
            })}
            {config.chain.map((stage, i) => {
              const x = 92 + i * 184;
              const active = i === index;
              return (
                <g key={stage.label}>
                  <rect x={x - 54} y="98" width="108" height="160" rx="14" fill={active ? color : SURFACE} fillOpacity={active ? 0.16 : 1} stroke={active ? color : BORDER} strokeWidth={active ? 3 : 1.5} />
                  <circle cx={x} cy="130" r="18" fill={active ? color : BORDER} />
                  <text x={x} y="136" textAnchor="middle" fontSize="14" fontWeight="700" fill={SURFACE}>{i + 1}</text>
                  <text x={x} y="188" textAnchor="middle" fontSize="14" fontWeight="700" fill={PRIMARY}>{stage.label}</text>
                  <text x={x} y="213" textAnchor="middle" fontSize="12" fill={MUTED}>{stage.detail}</text>
                  <text x={x} y="238" textAnchor="middle" fontSize="11" fill={active ? color : MUTED}>{active ? "当前节点" : "可复核"}</text>
                </g>
              );
            })}
            <rect x="34" y="300" width="852" height="92" rx="12" fill={SURFACE} stroke={color} strokeWidth="2" />
            <text x="56" y="333" fontSize="13" fontWeight="700" fill={color}>{status}</text>
            <text x="56" y="360" fontSize="12" fill={PRIMARY}>证据合同：输入 · 预期 · 实际 · 首个偏离 · 复位结果</text>
            <text x="56" y="381" fontSize="12" fill={MUTED}>当前场景：{SCENARIOS.find((item) => item.id === scenario)?.label}</text>
          </svg>
        </div>
      </div>
    </section>
  );
}
