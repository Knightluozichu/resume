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
  cpu: "CPU热点",
  memory: "内存增长",
  telemetry: "遥测缺口",
  recovery: "恢复",
} as const;

export function NodeDebuggingOfficialLab({
  title,
  label,
  color,
  soft,
  chain,
  concepts,
  view,
}: LabProps) {
  const [mode, setMode] = useState<keyof typeof modes>(
    view === "experiment" ? "cpu" : view === "evidence" ? "recovery" : "normal",
  );
  const [stage, setStage] = useState(
    view === "evidence" ? chain.length - 1 : 0,
  );
  const [load, setLoad] = useState(4);
  const [aligned, setAligned] = useState(view !== "experiment");

  const evidence = useMemo(() => {
    const cpu = mode === "cpu" ? 88 : mode === "recovery" ? 31 : 42 + load;
    const heap =
      mode === "memory" ? 18 + load * 5 : mode === "recovery" ? 0 : load;
    const lag = mode === "cpu" ? 96 : mode === "recovery" ? 9 : 12 + load;
    const links = mode === "telemetry" ? 2 : aligned ? 5 : 3;
    const passed = mode === "recovery" && aligned && heap === 0;
    return {
      cpu,
      heap,
      lag,
      links,
      status: passed ? "通过" : mode === "normal" ? "基线" : "调查中",
    };
  }, [aligned, load, mode]);

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
            checked={aligned}
            onChange={(event) => setAligned(event.target.checked)}
          />
          证据时钟已对齐
        </label>
      </header>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="p-4">
          <div
            className="mb-4 flex flex-wrap gap-2"
            role="group"
            aria-label="故障模式"
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
          <div className="grid gap-2 sm:grid-cols-4">
            {[
              ["CPU", evidence.cpu, "%"],
              ["堆斜率", evidence.heap, "MB/min"],
              ["循环 P99", evidence.lag, "ms"],
              ["关联证据", evidence.links, "/5"],
            ].map(([name, value, unit]) => (
              <div
                key={name}
                className="border p-3"
                style={{ borderColor: color }}
              >
                <p className="text-xs text-zinc-500">{name}</p>
                <p className="mt-1 text-lg font-bold">
                  {value}
                  <span className="ml-1 text-xs font-medium text-zinc-500">
                    {unit}
                  </span>
                </p>
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
            诊断负载：{load}
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
            <h4 className="text-sm font-semibold">诊断签发</h4>
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
              <dt className="text-xs text-zinc-500">当前目录证据</dt>
              <dd className="mt-1 font-medium">
                {concepts[(stage + load) % concepts.length]}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-500">首个偏离</dt>
              <dd className="mt-1 font-medium">
                {mode === "normal" || mode === "recovery" ? "无" : modes[mode]}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-500">恢复条件</dt>
              <dd className="mt-1 font-medium">
                {mode === "recovery" ? "资源已回落" : "等待同样本回放"}
              </dd>
            </div>
          </dl>
          <p className="mt-4 border-t border-zinc-200 pt-3 text-xs leading-5 text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
            先预测，再采样；相关图形不是根因，业务恢复与资源回落才构成闭环。
          </p>
        </aside>
      </div>
    </section>
  );
}
