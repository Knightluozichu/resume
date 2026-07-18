"use client";

import { useMemo, useState } from "react";

type LabMode = "map" | "experiment" | "evidence";

type OfficialUnityCoreLabProps = {
  title: string;
  label: string;
  nodes: readonly string[];
  mode: LabMode;
};

const palette: Record<LabMode, { strong: string; soft: string; ink: string }> =
  {
    map: { strong: "#2563eb", soft: "#dbeafe", ink: "#1e3a8a" },
    experiment: { strong: "#047857", soft: "#d1fae5", ink: "#064e3b" },
    evidence: { strong: "#c2410c", soft: "#ffedd5", ink: "#7c2d12" },
  };

const modeLabel: Record<LabMode, string> = {
  map: "依赖地图",
  experiment: "单变量实验",
  evidence: "阶段门证据",
};

export function OfficialUnityCoreLab({
  title,
  label,
  nodes,
  mode,
}: OfficialUnityCoreLabProps) {
  const [stage, setStage] = useState(0);
  const [fault, setFault] = useState(false);
  const color = palette[mode];
  const metrics = useMemo(
    () => ({
      completeness: Math.round(((stage + 1) / nodes.length) * 100),
      checks: stage + 1,
      violations: fault ? 1 : 0,
    }),
    [fault, nodes.length, stage],
  );

  return (
    <section
      className="my-6 overflow-hidden border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-950"
      aria-label={title}
    >
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 px-4 py-3 dark:border-zinc-700">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-zinc-500">
            {label} · {modeLabel[mode]}
          </p>
          <h3 className="mt-1 text-base font-semibold text-zinc-900 dark:text-zinc-100">
            {title}
          </h3>
        </div>
        <button
          type="button"
          onClick={() => setFault((value) => !value)}
          className="min-h-9 border px-3 text-sm font-medium"
          style={{
            borderColor: color.strong,
            color: color.ink,
            backgroundColor: fault ? color.soft : "transparent",
          }}
        >
          {fault ? "清除故障" : "注入故障"}
        </button>
      </header>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="p-4">
          <div
            className="grid grid-cols-2 gap-2 md:grid-cols-3"
            role="tablist"
            aria-label="处理阶段"
          >
            {nodes.map((node, index) => (
              <button
                key={node}
                type="button"
                role="tab"
                aria-selected={stage === index}
                onClick={() => setStage(index)}
                className="min-h-24 border p-3 text-left text-xs leading-5"
                style={{
                  borderColor: stage === index ? color.strong : "#d4d4d8",
                  backgroundColor: index <= stage ? color.soft : "transparent",
                  color: stage === index ? color.ink : undefined,
                }}
              >
                <span className="block text-sm font-bold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-2 block break-words">{node}</span>
              </button>
            ))}
          </div>
          <div
            className="mt-4 h-2 bg-zinc-200 dark:bg-zinc-800"
            aria-label={"完成度 " + metrics.completeness + "%"}
          >
            <div
              className="h-full transition-[width]"
              style={{
                width: metrics.completeness + "%",
                backgroundColor: fault ? "#dc2626" : color.strong,
              }}
            />
          </div>
        </div>
        <aside className="border-t border-zinc-200 bg-zinc-50 p-4 text-sm lg:border-l lg:border-t-0 dark:border-zinc-700 dark:bg-zinc-900">
          <p className="font-semibold text-zinc-900 dark:text-zinc-100">
            当前证据
          </p>
          <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2">
            <dt className="text-zinc-500">阶段</dt>
            <dd className="text-right font-mono">
              {stage + 1}/{nodes.length}
            </dd>
            <dt className="text-zinc-500">检查项</dt>
            <dd className="text-right font-mono">{metrics.checks}</dd>
            <dt className="text-zinc-500">完成度</dt>
            <dd className="text-right font-mono">{metrics.completeness}%</dd>
            <dt className="text-zinc-500">违规</dt>
            <dd
              className="text-right font-mono"
              style={{ color: fault ? "#b91c1c" : "#15803d" }}
            >
              {metrics.violations}
            </dd>
          </dl>
          <div className="mt-4 border-t border-zinc-300 pt-3 dark:border-zinc-700">
            <p className="text-xs text-zinc-500">当前节点</p>
            <p className="mt-1 break-words font-medium text-zinc-900 dark:text-zinc-100">
              {nodes[stage]}
            </p>
            <p
              className="mt-3 text-xs"
              style={{ color: fault ? "#b91c1c" : "#15803d" }}
            >
              {fault
                ? "阶段门拒绝：保存输入并回到最早失败节点"
                : "阶段门通过：证据允许进入下一节点"}
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
