"use client";

import { useMemo, useState } from "react";

type Props = {
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
  boundary: "边界",
  permissionDenied: "权限拒绝",
  dependencyFailure: "依赖失败",
  networkTimeout: "网络超时",
  recovery: "恢复",
} as const;

export function OfficialLinuxPracticeLab({
  title,
  label,
  color,
  soft,
  chain,
  concepts,
  view,
}: Props) {
  const [mode, setMode] = useState<keyof typeof modes>(
    view === "experiment"
      ? "permissionDenied"
      : view === "evidence"
        ? "recovery"
        : "baseline",
  );
  const [stage, setStage] = useState(
    view === "evidence" ? chain.length - 1 : 0,
  );
  const [samples, setSamples] = useState(4);
  const [predicted, setPredicted] = useState(view !== "experiment");
  function resetExperiment() {
    setMode(view === "experiment"
      ? "permissionDenied"
      : view === "evidence"
        ? "recovery"
        : "baseline");
    setStage(view === "evidence" ? chain.length - 1 : 0);
    setSamples(4);
    setPredicted(view !== "experiment");
  }

  const evidence = useMemo(() => {
    const failed =
      mode === "permissionDenied" ||
      mode === "dependencyFailure" ||
      mode === "networkTimeout";
    return {
      commands: samples * (stage + 2),
      stateChanges: samples * (failed ? 2 : 3),
      divergences:
        mode === "boundary" ? 1 : failed ? Math.max(1, samples - 1) : 0,
      firstError: failed
        ? modes[mode]
        : mode === "boundary"
          ? "边界已捕获"
          : "无",
      status:
        mode === "recovery" && predicted
          ? "通过"
          : mode === "baseline"
            ? "基线"
            : "验证中",
    };
  }, [mode, predicted, samples, stage]);

  return (
    <section
      className="my-6 overflow-hidden border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-950"
      aria-label={title}
    >
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 px-4 py-3 dark:border-zinc-700">
        <div>
          <p className="text-xs font-semibold text-zinc-500">{label}</p>
          <h3 className="mt-1 text-base font-semibold">{title}</h3>
        </div>
        <label className="flex items-center gap-2 text-xs font-semibold">
          <input
            type="checkbox"
            checked={predicted}
            onChange={(event) => setPredicted(event.target.checked)}
          />
          运行前已预测
        </label>
      </header>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="p-4">
          <div
            className="mb-4 flex flex-wrap gap-2"
            role="group"
            aria-label="Linux实验模式"
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
          <div className="grid gap-2 sm:grid-cols-3">
            {[
              ["执行命令", evidence.commands],
              ["状态变化", evidence.stateChanges],
              ["轨迹偏离", evidence.divergences],
            ].map(([name, value]) => (
              <div
                key={name}
                className="border p-3"
                style={{ borderColor: color }}
              >
                <p className="text-xs text-zinc-500">{name}</p>
                <p className="mt-1 text-xl font-bold">{value}</p>
              </div>
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
            样本规模：{samples}
            <input
              type="range"
              min="1"
              max="10"
              value={samples}
              onChange={(event) => setSamples(Number(event.target.value))}
              className="mt-2 block w-full"
            />
          </label>
        </div>
        <aside className="border-t border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900 lg:border-l lg:border-t-0">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-sm font-semibold">命令证据</h4>
            <span
              className="border px-2 py-1 text-xs font-bold"
              style={{
                borderColor: evidence.status === "通过" ? "#16a34a" : color,
                color: evidence.status === "通过" ? "#166534" : color,
                background: evidence.status === "通过" ? "#dcfce7" : soft,
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
              <dt className="text-xs text-zinc-500">目录证据</dt>
              <dd className="mt-1 font-medium">
                {concepts[(stage + samples) % concepts.length]}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-500">首个错误</dt>
              <dd className="mt-1 font-medium">{evidence.firstError}</dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-500">恢复状态</dt>
              <dd className="mt-1 font-medium">
                {mode === "recovery" ? "同输入已重放" : "等待逆操作"}
              </dd>
            </div>
          </dl>
          <p className="mt-4 border-t border-zinc-200 pt-3 text-xs leading-5 text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
            先预测身份、退出码和状态副作用，再执行并停在第一条因果分叉。
          </p>
        </aside>
      </div>
    </section>
  );
}
