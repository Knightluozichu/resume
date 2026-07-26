"use client";

import { useMemo, useState } from "react";

type LabProps = {
  title: string;
  label: string;
  color: string;
  soft: string;
  chain: readonly string[];
  concepts: readonly string[];
  view: "map" | "experiment" | "evidence";
};

const modes = {
  baseline: "基线",
  enhanced: "增强",
  failure: "失败",
  recovery: "恢复",
} as const;

export function CssSecretsOfficialLab({
  title,
  label,
  color,
  soft,
  chain,
  concepts,
  view,
}: LabProps) {
  const [mode, setMode] = useState<keyof typeof modes>(
    view === "experiment"
      ? "enhanced"
      : view === "evidence"
        ? "recovery"
        : "baseline",
  );
  const [stage, setStage] = useState(view === "evidence" ? 5 : 0);
  const [stress, setStress] = useState(2);
  const [fallback, setFallback] = useState(view !== "experiment");
  function resetExperiment() {
    setMode(view === "experiment"
      ? "enhanced"
      : view === "evidence"
        ? "recovery"
        : "baseline");
    setStage(view === "evidence" ? 5 : 0);
    setStress(2);
    setFallback(view !== "experiment");
  }


  const evidence = useMemo(() => {
    const enhanced = mode === "enhanced" || mode === "recovery";
    const broken = mode === "failure";
    return {
      declarations: enhanced ? 5 + stress : 3,
      overflow: broken && stress > 2 ? "出现" : "无",
      semantics: broken && !fallback ? "缺失" : "保留",
      fallback: fallback ? "可用" : "未证明",
      status: !broken && fallback ? "通过" : "阻断",
    };
  }, [fallback, mode, stress]);

  return (
    <section
      className="my-6 overflow-hidden border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-950"
      aria-label={title}
    >
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 px-4 py-3 dark:border-zinc-700">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-zinc-500">{label}</p>
          <h3 className="mt-1 text-base font-semibold">{title}</h3>
        </div>
        <label className="flex items-center gap-2 text-xs font-semibold">
          <input
            type="checkbox"
            checked={fallback}
            onChange={(event) => setFallback(event.target.checked)}
          />
          保留自然回退
        </label>
      </header>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_310px]">
        <div className="p-4">
          <div
            className="mb-4 flex flex-wrap gap-2"
            role="group"
            aria-label="实验模式"
          >
            {(Object.keys(modes) as Array<keyof typeof modes>).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setMode(item)}
                className="min-h-11 border px-3 text-xs font-semibold"
                style={{
                  borderColor: mode === item ? color : "#d4d4d8",
                  background: mode === item ? soft : "transparent",
                  color: mode === item ? color : undefined,
                }}
              >
                {modes[item]}
              </button>
            ))}
          </div>
          <div
            className="grid min-h-36 place-items-center border border-zinc-300 p-4 dark:border-zinc-700"
            style={{
              background:
                mode === "failure"
                  ? "repeating-linear-gradient(135deg, #fee2e2 0 10px, #fff 10px 20px)"
                  : soft,
            }}
          >
            <div
              className="grid min-h-20 place-items-center px-5 py-3 text-center text-sm font-semibold"
              style={{
                width: 42 + stress * 10 + "%",
                color,
                border: "2px solid " + color,
                boxShadow:
                  mode === "enhanced" || mode === "recovery"
                    ? "0 0 0 5px " + soft + ", 0 8px 18px #0002"
                    : "none",
                transform: mode === "failure" ? "skewX(-12deg)" : "none",
                background: "#fff",
              }}
            >
              {concepts[(stage + stress) % concepts.length]}
            </div>
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
                    background: index === stage ? soft : "transparent",
                  }}
                >
                  <span
                    className="flex size-6 shrink-0 items-center justify-center border text-xs font-bold"
                    style={{ borderColor: color }}
                  >
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium">{node}</span>
                </button>
              </li>
            ))}
          </ol>
          <label className="mt-5 block text-xs font-semibold">
            边界压力：{stress}
            <input
              type="range"
              min="0"
              max="5"
              step="1"
              value={stress}
              onChange={(event) => setStress(Number(event.target.value))}
              className="mt-2 block w-full"
            />
          </label>
        </div>
        <aside className="border-t border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900 lg:border-l lg:border-t-0">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-sm font-semibold">攻略证据</h4>
            <span
              className="border px-2 py-1 text-xs font-bold"
              style={{
                borderColor: evidence.status === "通过" ? "#16a34a" : "#dc2626",
                color: evidence.status === "通过" ? "#166534" : "#991b1b",
                background: evidence.status === "通过" ? "#dcfce7" : "#fee2e2",
              }}
            >
              {evidence.status}
            </span>
          </div>
          <dl className="mt-4 grid gap-3 text-sm">
            <div>
              <dt className="text-xs text-zinc-500">当前阶段</dt>
              <dd className="mt-1 font-medium">{chain[stage]}</dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-500">声明预算</dt>
              <dd className="mt-1 font-medium">{evidence.declarations} 条</dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-500">溢出</dt>
              <dd className="mt-1 font-medium">{evidence.overflow}</dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-500">语义</dt>
              <dd className="mt-1 font-medium">{evidence.semantics}</dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-500">能力缺失</dt>
              <dd className="mt-1 font-medium">{evidence.fallback}</dd>
            </div>
          </dl>
          <p className="mt-4 border-t border-zinc-200 pt-3 text-xs leading-5 text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
            先预测，再切换模式。视觉相似不代表机制、语义和回退相同。
          </p>
        </aside>
      </div>
    </section>
  );
}
