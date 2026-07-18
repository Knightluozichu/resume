"use client";

import { useMemo, useState } from "react";

type LabMode = "path" | "tradeoff" | "evidence";

type PhoenixArchitectureLabProps = {
  unitTitle: string;
  focus: string;
  nodes: string[];
  invariant: string;
  gates: string[];
  mode: LabMode;
};

export function PhoenixArchitectureLab({
  unitTitle,
  focus,
  nodes,
  invariant,
  gates,
  mode,
}: PhoenixArchitectureLabProps) {
  const [nodeIndex, setNodeIndex] = useState(0);
  const [boundary, setBoundary] = useState<"进程内" | "网络" | "基础设施">(
    "网络",
  );
  const [requests, setRequests] = useState(1200);
  const [latency, setLatency] = useState(35);
  const [failureRate, setFailureRate] = useState(3);
  const [retries, setRetries] = useState(1);
  const [isolated, setIsolated] = useState(true);
  const [checked, setChecked] = useState<boolean[]>(() =>
    gates.map(() => false),
  );

  const result = useMemo(() => {
    const attempts = requests * (retries + 1);
    const residualFailure = Math.pow(failureRate / 100, retries + 1);
    const completed = Math.round(requests * (1 - residualFailure));
    const p99 = Math.round(
      latency * (1 + retries * 0.55) +
        failureRate * 4 +
        (isolated ? 0 : failureRate * 7),
    );
    const overloadRisk =
      attempts > requests * 2 || (!isolated && failureRate >= 8);
    return { attempts, completed, p99, overloadRisk };
  }, [failureRate, isolated, latency, requests, retries]);

  if (mode === "path") {
    const boundaries = ["进程内", "网络", "基础设施"] as const;
    return (
      <section
        className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
        aria-label={unitTitle + "责任链实验"}
      >
        <header className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            2021纸书版 · 责任与失败边界
          </p>
          <h3 className="mt-1 text-base font-semibold">{unitTitle}</h3>
          <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            {focus}
          </p>
        </header>
        <div className="grid lg:grid-cols-[minmax(14rem,0.75fr)_minmax(0,1.4fr)]">
          <div className="max-h-96 overflow-auto border-b p-3 lg:border-b-0 lg:border-r dark:border-zinc-800">
            {nodes.map((node, index) => (
              <button
                key={node}
                type="button"
                onClick={() => setNodeIndex(index)}
                className={
                  "mb-1 min-h-9 w-full rounded px-2 py-1.5 text-left text-xs " +
                  (index === nodeIndex
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950"
                    : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800")
                }
              >
                {index + 1}. {node}
              </button>
            ))}
          </div>
          <div className="p-4">
            <p className="text-xs text-zinc-500">当前正式节点</p>
            <p className="mt-1 text-sm font-semibold">
              {nodes[nodeIndex] ?? unitTitle}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {boundaries.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setBoundary(item)}
                  className={
                    "min-h-9 rounded px-3 text-xs font-semibold " +
                    (boundary === item
                      ? "bg-emerald-700 text-white"
                      : "border border-zinc-300 dark:border-zinc-700")
                  }
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2 text-center text-xs sm:grid-cols-5">
              {["调用者", "入口/代理", "服务", "依赖", "持久状态"].map(
                (label, index) => (
                  <div
                    key={label}
                    className={
                      "flex min-h-16 items-center justify-center border p-2 " +
                      (index >=
                      (boundary === "进程内" ? 1 : boundary === "网络" ? 2 : 3)
                        ? "border-amber-500 bg-amber-50 dark:bg-amber-950/30"
                        : "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30")
                    }
                  >
                    {label}
                  </div>
                ),
              )}
            </div>
            <p className="mt-4 border-l-4 border-emerald-600 bg-emerald-50 p-3 text-xs leading-5 dark:bg-emerald-950/30">
              <strong>边界：</strong>
              {boundary}。<br />
              <strong>验收：</strong>
              {invariant}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (mode === "tradeoff") {
    const controls: Array<
      [string, number, number, number, (next: number) => void]
    > = [
      ["请求数", requests, 100, 5000, (next) => setRequests(next)],
      ["基线延迟(ms)", latency, 5, 500, (next) => setLatency(next)],
      ["失败率(%)", failureRate, 0, 40, (next) => setFailureRate(next)],
      ["重试次数", retries, 0, 4, (next) => setRetries(next)],
    ];
    return (
      <section
        className="my-6 rounded-md border border-zinc-300 bg-white p-4 text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
        aria-label={unitTitle + "权衡实验"}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-sky-700 dark:text-sky-300">
              负载、故障与放大效应
            </p>
            <h3 className="mt-1 text-base font-semibold">{unitTitle}</h3>
          </div>
          <label className="flex items-center gap-2 text-xs font-semibold">
            <input
              type="checkbox"
              checked={isolated}
              onChange={(event) => setIsolated(event.target.checked)}
            />
            隔离故障域
          </label>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {controls.map(([label, value, min, max, setter]) => (
            <label key={label} className="text-xs font-semibold">
              {label}
              <input
                type="number"
                min={min}
                max={max}
                value={value}
                onChange={(event) => setter(Number(event.target.value))}
                className="mt-1 min-h-10 w-full rounded border border-zinc-300 bg-transparent px-3 dark:border-zinc-700"
              />
            </label>
          ))}
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2 text-center text-xs sm:grid-cols-4">
          <div className="border p-3">
            <strong className="block text-base">{result.attempts}</strong>总尝试
          </div>
          <div className="border p-3">
            <strong className="block text-base">{result.completed}</strong>
            估算完成
          </div>
          <div className="border p-3">
            <strong className="block text-base">{result.p99}ms</strong>尾延迟
          </div>
          <div
            className={
              "border p-3 " +
              (result.overloadRisk
                ? "border-rose-500 bg-rose-50 dark:bg-rose-950/30"
                : "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30")
            }
          >
            <strong className="block text-base">
              {result.overloadRisk ? "高" : "受控"}
            </strong>
            放大风险
          </div>
        </div>
        <p className="mt-4 text-xs leading-5 text-zinc-600 dark:text-zinc-400">
          该模型用于暴露重试和故障域的方向性影响，最终结论必须回到真实实现、同负载实验与业务对账。
        </p>
      </section>
    );
  }

  const complete = checked.filter(Boolean).length;
  return (
    <section
      className="my-6 rounded-md border border-zinc-300 bg-white p-4 text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
      aria-label={unitTitle + "证据门"}
    >
      <p className="text-xs font-semibold text-violet-700 dark:text-violet-300">
        独立证据门
      </p>
      <div className="mt-1 flex items-center justify-between gap-3">
        <h3 className="text-base font-semibold">{unitTitle}</h3>
        <span className="text-xs font-semibold">
          {complete}/{gates.length}
        </span>
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {gates.map((gate, index) => (
          <label
            key={gate}
            className={
              "flex min-h-12 items-center gap-3 border p-3 text-xs " +
              (checked[index]
                ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30"
                : "border-zinc-300 dark:border-zinc-700")
            }
          >
            <input
              type="checkbox"
              checked={checked[index] ?? false}
              onChange={(event) =>
                setChecked((current) =>
                  current.map((item, itemIndex) =>
                    itemIndex === index ? event.target.checked : item,
                  ),
                )
              }
            />
            {gate}
          </label>
        ))}
      </div>
      <p className="mt-4 border-l-4 border-violet-600 bg-violet-50 p-3 text-xs leading-5 dark:bg-violet-950/30">
        {complete === gates.length
          ? "证据齐全，可以进入独立复核。"
          : "结论暂不通过：仍缺少可复核证据。"}
        <br />
        {invariant}
      </p>
    </section>
  );
}
