"use client";

import { useMemo, useState } from "react";

type BlenderLabProps = {
  title: string;
  label: string;
  nodes: readonly string[];
  mode: "pipeline" | "inspect" | "evidence";
};

const palette = {
  pipeline: { strong: "#2563eb", soft: "#dbeafe", ink: "#1e3a8a" },
  inspect: { strong: "#059669", soft: "#d1fae5", ink: "#064e3b" },
  evidence: { strong: "#db2777", soft: "#fce7f3", ink: "#831843" },
};

export function OfficialBlenderLab({
  title,
  label,
  nodes,
  mode,
}: BlenderLabProps) {
  const [stage, setStage] = useState(0);
  const [fault, setFault] = useState(false);
  function resetExperiment() {
    setStage(0);
    setFault(false);
  }

  const color = palette[mode];
  const metrics = useMemo(
    () => ({
      revision: "v" + String(stage + 1).padStart(2, "0"),
      completeness: Math.round(((stage + 1) / nodes.length) * 100),
      violations: fault ? stage + 1 : 0,
    }),
    [fault, nodes.length, stage],
  );

  return (
    <section
      className="my-6 overflow-hidden rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-950"
      aria-label={title}
    >
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 px-4 py-3 dark:border-zinc-700">
        <div>
          <p className="text-xs font-semibold uppercase text-zinc-500">
            {label} · {mode}
          </p>
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            {title}
          </h3>
        </div>
        <button
          type="button"
          onClick={() => setFault((value) => !value)}
          className="min-h-11 rounded border px-3 text-sm font-medium"
          style={{
            borderColor: color.strong,
            color: color.ink,
            background: fault ? color.soft : "transparent",
          }}
        >
          {fault ? "清除失败样本" : "注入失败样本"}
        </button>
      </header>

      <div className="grid lg:grid-cols-[1fr_250px]">
        <div className="p-4">
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            {nodes.map((node, index) => (
              <button
                key={node}
                type="button"
                onClick={() => setStage(index)}
                className="min-h-28 border p-3 text-left text-xs leading-5"
                style={{
                  borderColor: index === stage ? color.strong : "#d4d4d8",
                  background: index <= stage ? color.soft : "transparent",
                  color: index === stage ? color.ink : undefined,
                }}
              >
                <span className="mb-2 block text-sm font-bold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="break-words">{node}</span>
              </button>
            ))}
          </div>
          <div
            className="mt-4 h-3 overflow-hidden bg-zinc-200 dark:bg-zinc-800"
            aria-label={"完成度 " + metrics.completeness + "%"}
          >
            <div
              className="h-full transition-all"
              style={{
                width: metrics.completeness + "%",
                background: fault ? "#e11d48" : color.strong,
              }}
            />
          </div>
        </div>

        <aside className="border-t border-zinc-200 bg-zinc-50 p-4 text-sm lg:border-l lg:border-t-0 dark:border-zinc-700 dark:bg-zinc-900">
          <p className="font-semibold text-zinc-900 dark:text-zinc-100">
            资产证据
          </p>
          <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2">
            <dt className="text-zinc-500">当前阶段</dt>
            <dd className="text-right font-medium">
              {stage + 1}/{nodes.length}
            </dd>
            <dt className="text-zinc-500">版本</dt>
            <dd className="text-right font-mono">{metrics.revision}</dd>
            <dt className="text-zinc-500">完成度</dt>
            <dd className="text-right font-mono">{metrics.completeness}%</dd>
            <dt className="text-zinc-500">违规项</dt>
            <dd
              className="text-right font-mono"
              style={{ color: fault ? "#be123c" : "#15803d" }}
            >
              {metrics.violations}
            </dd>
          </dl>
          <div className="mt-4 border border-zinc-300 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-950">
            <p className="text-xs text-zinc-500">当前交付物</p>
            <p className="mt-1 break-words font-medium text-zinc-900 dark:text-zinc-100">
              {nodes[stage]}
            </p>
            <p
              className="mt-3 text-xs"
              style={{ color: fault ? "#be123c" : "#15803d" }}
            >
              {fault
                ? "阶段门拒绝：回到最早失败输入"
                : "阶段门通过：允许进入下一步"}
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
