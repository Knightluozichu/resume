"use client";

import { useMemo, useState } from "react";

type LabView = "map" | "experiment" | "evidence";
type LabMode = "baseline" | "boundary" | "failure" | "optimized";

type Props = {
  title: string;
  label: string;
  color: string;
  soft: string;
  chain: readonly string[];
  concepts: readonly string[];
  view: LabView;
};

const modeLabels: Record<LabMode, string> = {
  baseline: "基线",
  boundary: "边界",
  failure: "失败",
  optimized: "优化",
};

const viewLabels: Record<LabView, string> = {
  map: "处理地图",
  experiment: "语言实验",
  evidence: "证据对照",
};

export function OfficialCraftingCompilerLab({
  title,
  label,
  color,
  soft,
  chain,
  concepts,
  view,
}: Props) {
  const [mode, setMode] = useState<LabMode>("baseline");
  const [stage, setStage] = useState(0);
  const [samples, setSamples] = useState(4);

  const evidence = useMemo(() => {
    const penalty = { baseline: 0, boundary: 11, failure: 42, optimized: 4 }[
      mode
    ];
    return {
      confidence: Math.max(12, 99 - penalty - stage * 2),
      tokens: samples * (stage + 2),
      nodes: samples * (stage + 1),
      errors: mode === "failure" ? 1 : 0,
      status:
        mode === "failure"
          ? "首错已定位"
          : mode === "optimized"
            ? "语义已对齐"
            : mode === "boundary"
              ? "边界已显现"
              : "基线稳定",
    };
  }, [mode, samples, stage]);

  function reset() {
    setMode("baseline");
    setStage(0);
    setSamples(4);
  }

  return (
    <section
      className="my-6 overflow-hidden border-y border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-950"
      aria-label={title + "交互实验"}
    >
      <header className="flex min-h-14 flex-wrap items-center justify-between gap-3 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className="shrink-0 text-base font-bold"
            style={{ color }}
            aria-hidden
          >
            {"{}"}
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-zinc-500">{label}</p>
            <h4 className="truncate text-sm font-bold text-zinc-950 dark:text-zinc-50">
              {title}
            </h4>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="border px-2 py-1 text-xs font-semibold"
            style={{ borderColor: color, color }}
          >
            {viewLabels[view]}
          </span>
          <button
            type="button"
            onClick={reset}
            className="flex size-9 items-center justify-center border border-zinc-300 text-zinc-700 dark:border-zinc-700 dark:text-zinc-200"
            title="重置实验"
            aria-label="重置实验"
          >
            <span className="text-lg leading-none" aria-hidden>
              ↺
            </span>
          </button>
        </div>
      </header>

      <div className="grid min-h-[360px] lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="p-4">
          <div
            className="grid grid-cols-4 border border-zinc-300 dark:border-zinc-700"
            role="group"
            aria-label="实验样本"
          >
            {(Object.keys(modeLabels) as LabMode[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setMode(item)}
                className="min-h-10 border-r border-zinc-300 px-2 text-xs font-semibold last:border-r-0 dark:border-zinc-700"
                style={{
                  background: mode === item ? soft : undefined,
                  color: mode === item ? color : undefined,
                }}
              >
                {modeLabels[item]}
              </button>
            ))}
          </div>

          <ol className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {chain.map((node, index) => (
              <li key={node}>
                <button
                  type="button"
                  onClick={() => setStage(index)}
                  className="flex min-h-20 w-full items-start gap-3 border p-3 text-left"
                  style={{
                    borderColor: index === stage ? color : "#d4d4d8",
                    background: index === stage ? soft : undefined,
                  }}
                >
                  <span
                    className="flex size-6 shrink-0 items-center justify-center border text-xs font-bold"
                    style={{ borderColor: color, color }}
                  >
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {node}
                  </span>
                </button>
              </li>
            ))}
          </ol>

          {view === "map" ? (
            <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-zinc-600 dark:text-zinc-300">
              {concepts.slice(0, 10).map((concept) => (
                <div
                  key={concept}
                  className="border-l-2 pl-2"
                  style={{ borderColor: color }}
                >
                  {concept}
                </div>
              ))}
            </div>
          ) : (
            <label className="mt-5 block text-xs font-semibold text-zinc-700 dark:text-zinc-200">
              编译样本：{samples}
              <input
                type="range"
                min="1"
                max="20"
                value={samples}
                onChange={(event) => setSamples(Number(event.target.value))}
                className="mt-2 block w-full"
              />
            </label>
          )}
        </div>

        <aside className="border-t border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900 lg:border-l lg:border-t-0">
          <div className="flex items-center justify-between gap-3">
            <h5 className="flex items-center gap-2 text-sm font-semibold">
              <span className="font-bold" aria-hidden>
                {mode === "failure" ? "!" : "•"}
              </span>
              编译证据
            </h5>
            <span className="text-xs font-bold" style={{ color }}>
              {evidence.status}
            </span>
          </div>
          <dl className="mt-5 grid gap-4 text-sm">
            <div>
              <dt className="text-xs text-zinc-500">当前阶段</dt>
              <dd className="mt-1 font-semibold">{chain[stage]}</dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-500">目录证据</dt>
              <dd className="mt-1 font-semibold">
                {concepts[(stage + samples) % concepts.length]}
              </dd>
            </div>
            <div className="grid grid-cols-4 gap-2 border-y border-zinc-200 py-3 text-center dark:border-zinc-700">
              <div>
                <dt className="text-[11px] text-zinc-500">置信</dt>
                <dd className="font-bold">{evidence.confidence}%</dd>
              </div>
              <div>
                <dt className="text-[11px] text-zinc-500">Token</dt>
                <dd className="font-bold">{evidence.tokens}</dd>
              </div>
              <div>
                <dt className="text-[11px] text-zinc-500">节点</dt>
                <dd className="font-bold">{evidence.nodes}</dd>
              </div>
              <div>
                <dt className="text-[11px] text-zinc-500">错误</dt>
                <dd className="font-bold">{evidence.errors}</dd>
              </div>
            </div>
          </dl>
          <p className="mt-4 flex gap-2 text-xs leading-5 text-zinc-600 dark:text-zinc-300">
            固定JDK、类路径、语法与输入，在第一条Token、AST、环境、指令或类型分叉处停止并保留原始结果。
          </p>
        </aside>
      </div>
    </section>
  );
}
