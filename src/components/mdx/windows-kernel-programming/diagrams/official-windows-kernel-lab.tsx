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
  invalidParameter: "参数错误",
  wrongIrql: "错误IRQL",
  callbackRace: "回调竞态",
  verifier: "Verifier",
  recovery: "恢复",
} as const;

export function OfficialWindowsKernelLab({
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
      ? "wrongIrql"
      : view === "evidence"
        ? "recovery"
        : "baseline",
  );
  const [stage, setStage] = useState(
    view === "evidence" ? chain.length - 1 : 0,
  );
  const [requests, setRequests] = useState(8);
  const [verifier, setVerifier] = useState(view !== "map");
  const evidence = useMemo(() => {
    const failed =
      mode === "invalidParameter" ||
      mode === "wrongIrql" ||
      mode === "callbackRace" ||
      mode === "verifier";
    return {
      completed: failed ? Math.max(0, requests - stage - 1) : requests,
      references: stage + 2,
      alerts: mode === "boundary" ? 1 : failed ? stage + 1 : 0,
      firstError: failed
        ? modes[mode]
        : mode === "boundary"
          ? "边界已拒绝"
          : "无",
      irql:
        mode === "wrongIrql"
          ? "DISPATCH_LEVEL"
          : stage > 3
            ? "APC_LEVEL"
            : "PASSIVE_LEVEL",
      status:
        mode === "recovery" && verifier
          ? "通过"
          : mode === "baseline"
            ? "基线"
            : "验证中",
    };
  }, [mode, requests, stage, verifier]);

  return (
    <section
      className="my-6 overflow-hidden border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-950"
      aria-label={title}
    >
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 px-4 py-3 dark:border-zinc-700">
        <div>
          <p className="text-xs font-semibold text-zinc-500">{label}</p>
          <h3 className="mt-1 text-base font-semibold">{title}</h3>
        </div>
        <label className="flex items-center gap-2 text-xs font-semibold">
          <input
            type="checkbox"
            checked={verifier}
            onChange={(event) => setVerifier(event.target.checked)}
          />
          启用Verifier证据
        </label>
      </header>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_304px]">
        <div className="p-4">
          <div
            className="mb-4 flex flex-wrap gap-2"
            role="group"
            aria-label="内核实验模式"
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
            {[
              ["完成请求", evidence.completed],
              ["活动引用", evidence.references],
              ["验证警报", evidence.alerts],
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
            请求/事件样本：{requests}
            <input
              type="range"
              min="1"
              max="20"
              value={requests}
              onChange={(event) => setRequests(Number(event.target.value))}
              className="mt-2 block w-full"
            />
          </label>
        </div>
        <aside className="border-t border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900 lg:border-l lg:border-t-0">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-sm font-semibold">内核证据</h4>
            <span
              className="border px-2 py-1 text-xs font-bold"
              style={{
                borderColor: evidence.status === "通过" ? "#15803d" : color,
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
              <dt className="text-xs text-zinc-500">当前IRQL</dt>
              <dd className="mt-1 font-medium">{evidence.irql}</dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-500">目录证据</dt>
              <dd className="mt-1 font-medium">
                {concepts[(stage + requests) % concepts.length]}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-500">首个错误</dt>
              <dd className="mt-1 font-medium">{evidence.firstError}</dd>
            </div>
          </dl>
          <p className="mt-4 border-t border-zinc-200 pt-3 text-xs leading-5 text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
            在首个NTSTATUS、IRQL、引用或Verifier分叉处停下，恢复后重放同一事件序列。
          </p>
        </aside>
      </div>
    </section>
  );
}
