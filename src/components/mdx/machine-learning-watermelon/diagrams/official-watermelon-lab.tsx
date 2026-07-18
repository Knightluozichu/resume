"use client";

import { useMemo, useState } from "react";

type LabView = "map" | "experiment" | "evidence";
type LabMode = "baseline" | "boundary" | "failure" | "controlled";

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
  controlled: "受控",
};

const viewLabels: Record<LabView, string> = {
  map: "模型地图",
  experiment: "受控实验",
  evidence: "证据对照",
};

export function OfficialWatermelonLab({
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
  const [samples, setSamples] = useState(24);
  const [complexity, setComplexity] = useState(4);

  const evidence = useMemo(() => {
    const shift = { baseline: 0, boundary: 8, failure: 26, controlled: -4 }[
      mode
    ];
    const trainRisk = Math.max(
      2,
      42 - complexity * 5 + Math.round(40 / samples),
    );
    const validationRisk = Math.max(
      3,
      trainRisk + Math.max(0, complexity - 4) * 4 + shift,
    );
    return {
      trainRisk,
      validationRisk,
      gap: validationRisk - trainRisk,
      residual: mode === "failure" ? "超出容差" : "约束通过",
      status:
        mode === "failure"
          ? "首错已定位"
          : mode === "boundary"
            ? "边界已显现"
            : mode === "controlled"
              ? "变量已隔离"
              : "基线稳定",
    };
  }, [complexity, mode, samples]);

  function reset() {
    setMode("baseline");
    setStage(0);
    setSamples(24);
    setComplexity(4);
  }

  return (
    <section
      className="my-6 overflow-hidden border-y border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-950"
      aria-label={title + "交互实验"}
    >
      <header className="flex min-h-14 flex-wrap items-center justify-between gap-3 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
        <div className="min-w-0">
          <p className="text-xs font-semibold" style={{ color }}>
            {label} · {viewLabels[view]}
          </p>
          <h4 className="truncate text-sm font-bold text-zinc-950 dark:text-zinc-50">
            {title}
          </h4>
        </div>
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
      </header>

      <div className="grid min-h-[390px] lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="p-4">
          <div
            className="grid grid-cols-4 border border-zinc-300 dark:border-zinc-700"
            role="group"
            aria-label="实验模式"
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
            <div className="mt-5 grid grid-cols-2 gap-2 text-xs text-zinc-700 dark:text-zinc-200">
              {concepts.slice(0, 12).map((concept) => (
                <div
                  key={concept}
                  className="min-h-10 border-l-2 px-2 py-1"
                  style={{ borderColor: color }}
                >
                  {concept}
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-200">
                样本数：{samples}
                <input
                  type="range"
                  min="8"
                  max="96"
                  step="8"
                  value={samples}
                  onChange={(event) => setSamples(Number(event.target.value))}
                  className="mt-2 block w-full"
                />
              </label>
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-200">
                模型复杂度：{complexity}
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={complexity}
                  onChange={(event) =>
                    setComplexity(Number(event.target.value))
                  }
                  className="mt-2 block w-full"
                />
              </label>
            </div>
          )}
        </div>

        <aside className="border-t border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900 lg:border-l lg:border-t-0">
          <div className="flex items-center justify-between gap-3">
            <h5 className="text-sm font-semibold">模型证据</h5>
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
              <dt className="text-xs text-zinc-500">目录坐标</dt>
              <dd className="mt-1 font-semibold">
                {concepts[(stage + complexity) % concepts.length]}
              </dd>
            </div>
            <div className="grid grid-cols-3 gap-2 border-y border-zinc-200 py-3 text-center dark:border-zinc-700">
              <div>
                <dt className="text-[11px] text-zinc-500">训练风险</dt>
                <dd className="font-bold">{evidence.trainRisk}%</dd>
              </div>
              <div>
                <dt className="text-[11px] text-zinc-500">验证风险</dt>
                <dd className="font-bold">{evidence.validationRisk}%</dd>
              </div>
              <div>
                <dt className="text-[11px] text-zinc-500">泛化差距</dt>
                <dd className="font-bold">{evidence.gap}%</dd>
              </div>
            </div>
            <div>
              <dt className="text-xs text-zinc-500">约束残差</dt>
              <dd className="mt-1 font-semibold">{evidence.residual}</dd>
            </div>
          </dl>
          <p className="mt-4 text-xs leading-5 text-zinc-600 dark:text-zinc-300">
            固定样本身份、折分、预处理、随机种子和评价协议，只改变一个条件；在第一条目标、状态、约束或验证轨迹分叉处停止。
          </p>
        </aside>
      </div>
    </section>
  );
}
