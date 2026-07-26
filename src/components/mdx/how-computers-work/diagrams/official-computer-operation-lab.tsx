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
  normal: "正常",
  boundary: "边界",
  wrongAddress: "地址错误",
  brokenLink: "链路中断",
  recovery: "恢复",
} as const;
export function ComputerOperationLab({
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
      ? "wrongAddress"
      : view === "evidence"
        ? "recovery"
        : "normal",
  );
  const [stage, setStage] = useState(
    view === "evidence" ? chain.length - 1 : 0,
  );
  const [load, setLoad] = useState(4);
  const [predicted, setPredicted] = useState(view !== "experiment");
  function resetExperiment() {
    setMode(view === "experiment"
      ? "wrongAddress"
      : view === "evidence"
        ? "recovery"
        : "normal");
    setStage(view === "evidence" ? chain.length - 1 : 0);
    setLoad(4);
    setPredicted(view !== "experiment");
  }

  const evidence = useMemo(() => {
    const failed = mode === "wrongAddress" || mode === "brokenLink";
    const divergent =
      mode === "boundary" ? Math.max(1, load - 3) : failed ? load : 0;
    const recovered = mode === "recovery" && predicted;
    return {
      states: chain.length * load,
      divergent,
      latency: load * (failed ? 8 : 3),
      firstError: failed ? modes[mode] : "无",
      status: recovered ? "通过" : mode === "normal" ? "基线" : "验证中",
    };
  }, [chain.length, load, mode, predicted]);
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
          <div className="grid gap-2 sm:grid-cols-3">
            <div className="border p-3" style={{ borderColor: color }}>
              <p className="text-xs text-zinc-500">已观察状态</p>
              <p className="mt-1 text-xl font-bold">{evidence.states}</p>
            </div>
            <div className="border p-3" style={{ borderColor: color }}>
              <p className="text-xs text-zinc-500">偏离数量</p>
              <p className="mt-1 text-xl font-bold">{evidence.divergent}</p>
            </div>
            <div className="border p-3" style={{ borderColor: color }}>
              <p className="text-xs text-zinc-500">轨迹耗时</p>
              <p className="mt-1 text-xl font-bold">
                {evidence.latency}
                <span className="ml-1 text-xs">ms</span>
              </p>
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
            样本负载：{load}
            <input
              type="range"
              min="1"
              max="8"
              value={load}
              onChange={(event) => setLoad(Number(event.target.value))}
              className="mt-2 block w-full"
            />
          </label>
        </div>
        <aside className="border-t border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900 lg:border-l lg:border-t-0">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-sm font-semibold">运行证据</h4>
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
                {concepts[(stage + load) % concepts.length]}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-500">首个错误</dt>
              <dd className="mt-1 font-medium">{evidence.firstError}</dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-500">恢复状态</dt>
              <dd className="mt-1 font-medium">
                {mode === "recovery" ? "相同输入已重放" : "等待恢复实验"}
              </dd>
            </div>
          </dl>
          <p className="mt-4 border-t border-zinc-200 pt-3 text-xs leading-5 text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
            先预测下一状态，再运行样本；最终输出正确不代表中间路径可靠。
          </p>
        </aside>
      </div>
    </section>
  );
}
