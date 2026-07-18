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
  failure: "失败",
  recovery: "恢复",
} as const;

export function NodeDefinitiveOfficialLab({
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
      ? "boundary"
      : view === "evidence"
        ? "recovery"
        : "normal",
  );
  const [stage, setStage] = useState(view === "evidence" ? 5 : 0);
  const [load, setLoad] = useState(3);
  const [backpressure, setBackpressure] = useState(view !== "experiment");

  const evidence = useMemo(() => {
    const failed = mode === "failure";
    const queued = failed ? load * 9 : backpressure ? load : load * 4;
    const open = failed ? 2 : mode === "recovery" ? 0 : 1;
    return {
      queued,
      open,
      completion: failed ? 0 : 1,
      error: failed ? "ECONNRESET" : "无",
      status: !failed && backpressure && open <= 1 ? "通过" : "阻断",
    };
  }, [backpressure, load, mode]);

  return (
    <section
      className="my-6 overflow-hidden border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-950"
      aria-label={title}
    >
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 px-4 py-3 dark:border-zinc-700">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-zinc-500">{label}</p>
          <h3 className="mt-1 text-base font-semibold">{title}</h3>
        </div>
        <label className="flex items-center gap-2 text-xs font-semibold">
          <input
            type="checkbox"
            checked={backpressure}
            onChange={(event) => setBackpressure(event.target.checked)}
          />
          启用背压与上限
        </label>
      </header>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_310px]">
        <div className="p-4">
          <div
            className="mb-4 flex flex-wrap gap-2"
            role="group"
            aria-label="样本模式"
          >
            {(Object.keys(modes) as Array<keyof typeof modes>).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setMode(item)}
                className="min-h-9 border px-3 text-xs font-semibold"
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
            <div
              className="border p-3"
              style={{ borderColor: color, background: soft }}
            >
              <p className="text-xs text-zinc-500">输入</p>
              <p className="mt-1 text-sm font-semibold">
                {concepts[(stage + load) % concepts.length]}
              </p>
            </div>
            <div className="border p-3" style={{ borderColor: color }}>
              <p className="text-xs text-zinc-500">异步队列</p>
              <p className="mt-1 text-xl font-bold" style={{ color }}>
                {evidence.queued}
              </p>
            </div>
            <div
              className="border p-3"
              style={{ borderColor: evidence.open > 1 ? "#dc2626" : color }}
            >
              <p className="text-xs text-zinc-500">开放资源</p>
              <p className="mt-1 text-xl font-bold">{evidence.open}</p>
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
            负载：{load}
            <input
              type="range"
              min="1"
              max="8"
              step="1"
              value={load}
              onChange={(event) => setLoad(Number(event.target.value))}
              className="mt-2 block w-full"
            />
          </label>
        </div>
        <aside className="border-t border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900 lg:border-l lg:border-t-0">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-sm font-semibold">运行时证据</h4>
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
              <dt className="text-xs text-zinc-500">完成次数</dt>
              <dd className="mt-1 font-medium">{evidence.completion}</dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-500">首个错误</dt>
              <dd className="mt-1 font-medium">{evidence.error}</dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-500">资源关闭</dt>
              <dd className="mt-1 font-medium">
                {evidence.open === 0 ? "已排空" : "仍需等待"}
              </dd>
            </div>
          </dl>
          <p className="mt-4 border-t border-zinc-200 pt-3 text-xs leading-5 text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
            先预测回调、错误与关闭，再切换样本；有输出不代表资源生命周期正确。
          </p>
        </aside>
      </div>
    </section>
  );
}
