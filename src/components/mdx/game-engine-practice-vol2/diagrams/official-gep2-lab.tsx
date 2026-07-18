"use client";

import { useMemo, useState } from "react";

type LabProps = {
  title: string;
  focus: string;
  stages: string[];
};

const scenarios = {
  normal: {
    label: "正常",
    state: "accepted",
    note: "所有阶段按代际和栅栏提交，输出满足预算。",
  },
  stress: {
    label: "压力",
    state: "budget warning",
    note: "规模扩大暴露帧尾等待，需要定位首个超限阶段。",
  },
  fault: {
    label: "故障",
    state: "recovered",
    note: "资源迟到被代际检查拒绝，旧对象等待栅栏后回收。",
  },
} as const;

export function Gep2PipelineLab({ title, focus, stages }: LabProps) {
  const [selected, setSelected] = useState(0);
  return (
    <section className="my-6 overflow-hidden rounded-md border border-emerald-300 bg-white shadow-sm dark:border-emerald-800 dark:bg-zinc-950">
      <header className="border-b border-emerald-200 bg-emerald-50 px-4 py-3 dark:border-emerald-900 dark:bg-emerald-950/40">
        <p className="text-sm font-semibold text-emerald-950 dark:text-emerald-100">
          {title}
        </p>
        <p className="mt-1 text-xs text-emerald-800 dark:text-emerald-300">
          当前证据焦点：{focus}
        </p>
      </header>
      <div className="grid gap-2 p-4 sm:grid-cols-5">
        {stages.map((stage, index) => (
          <button
            key={stage}
            type="button"
            aria-pressed={selected === index}
            onClick={() => setSelected(index)}
            className={
              "min-h-20 rounded border px-2 py-3 text-left text-xs transition " +
              (selected === index
                ? "border-emerald-600 bg-emerald-100 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-100"
                : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-emerald-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300")
            }
          >
            <span className="block font-mono text-[11px]">0{index + 1}</span>
            <span className="mt-2 block font-semibold">{stage}</span>
          </button>
        ))}
      </div>
      <div className="border-t border-zinc-200 px-4 py-3 text-sm text-zinc-700 dark:border-zinc-800 dark:text-zinc-300">
        检查点：{stages[selected]}
        必须同时写清输入代际、所有者、执行线程、预算和失败返回。
      </div>
    </section>
  );
}

export function Gep2BudgetLab({ title, focus, stages }: LabProps) {
  const [actors, setActors] = useState(240);
  const [materials, setMaterials] = useState(80);
  const [workers, setWorkers] = useState(4);
  const [paused, setPaused] = useState(false);
  const metrics = useMemo(() => {
    const cpu =
      (actors * 0.018) / Math.max(1, Math.sqrt(workers)) +
      materials * 0.014 +
      workers * 0.13;
    const gpu = actors * 0.012 + materials * 0.037;
    const memory = 96 + actors * 0.11 + materials * 0.42 + workers * 3.5;
    return {
      cpu,
      gpu,
      memory,
      frame: Math.max(cpu, gpu) + Math.max(0, workers - 6) * 0.18,
    };
  }, [actors, materials, workers]);
  return (
    <section className="my-6 overflow-hidden rounded-md border border-amber-300 bg-white shadow-sm dark:border-amber-800 dark:bg-zinc-950">
      <header className="flex items-center justify-between gap-3 border-b border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-900 dark:bg-amber-950/30">
        <div>
          <p className="text-sm font-semibold text-amber-950 dark:text-amber-100">
            {title}
          </p>
          <p className="mt-1 text-xs text-amber-800 dark:text-amber-300">
            {focus}预算实验
          </p>
        </div>
        <button
          type="button"
          title={paused ? "继续" : "暂停"}
          onClick={() => setPaused((value) => !value)}
          className="grid size-9 place-items-center rounded border border-amber-500 bg-white text-base text-amber-950 dark:bg-zinc-900 dark:text-amber-100"
        >
          {paused ? "▶" : "⏸"}
        </button>
      </header>
      <div className="grid gap-5 p-4 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
            角色/对象：{actors}
            <input
              className="mt-2 w-full accent-emerald-600"
              type="range"
              min="40"
              max="1200"
              step="40"
              value={actors}
              onChange={(event) => setActors(Number(event.target.value))}
            />
          </label>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
            材质/资源：{materials}
            <input
              className="mt-2 w-full accent-amber-600"
              type="range"
              min="10"
              max="400"
              step="10"
              value={materials}
              onChange={(event) => setMaterials(Number(event.target.value))}
            />
          </label>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
            工作线程：{workers}
            <input
              className="mt-2 w-full accent-cyan-600"
              type="range"
              min="1"
              max="16"
              step="1"
              value={workers}
              onChange={(event) => setWorkers(Number(event.target.value))}
            />
          </label>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            ["CPU", metrics.cpu, "ms"],
            ["GPU", metrics.gpu, "ms"],
            ["帧尾", metrics.frame, "ms"],
            ["峰值", metrics.memory, "MiB"],
          ].map(([label, value, unit]) => (
            <div
              key={String(label)}
              className="min-h-24 rounded border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <p className="text-xs text-zinc-500">{label}</p>
              <p className="mt-2 text-xl font-semibold text-zinc-950 dark:text-zinc-100">
                {Number(value).toFixed(1)}
              </p>
              <p className="text-xs text-zinc-500">{unit}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="border-t border-zinc-200 px-4 py-3 text-xs text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
        阶段链：{stages.join(" → ")}。
        {paused
          ? "已冻结参数，适合记录预测。"
          : "调整参数并寻找第一项预算超限。"}
      </p>
    </section>
  );
}

export function Gep2EvidenceLab({ title, focus, stages }: LabProps) {
  const [scenario, setScenario] = useState<keyof typeof scenarios>("normal");
  const current = scenarios[scenario];
  return (
    <section className="my-6 overflow-hidden rounded-md border border-cyan-300 bg-white shadow-sm dark:border-cyan-800 dark:bg-zinc-950">
      <header className="border-b border-cyan-200 bg-cyan-50 px-4 py-3 dark:border-cyan-900 dark:bg-cyan-950/30">
        <p className="text-sm font-semibold text-cyan-950 dark:text-cyan-100">
          {title}
        </p>
        <p className="mt-1 text-xs text-cyan-800 dark:text-cyan-300">
          故障证据：{focus}
        </p>
      </header>
      <div
        className="flex gap-1 border-b border-zinc-200 p-3 dark:border-zinc-800"
        role="tablist"
        aria-label="证据场景"
      >
        {(Object.keys(scenarios) as Array<keyof typeof scenarios>).map(
          (key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={scenario === key}
              onClick={() => setScenario(key)}
              className={
                "min-h-9 flex-1 rounded border px-2 text-xs font-semibold " +
                (scenario === key
                  ? "border-cyan-600 bg-cyan-100 text-cyan-950 dark:bg-cyan-950 dark:text-cyan-100"
                  : "border-zinc-200 text-zinc-600 dark:border-zinc-800 dark:text-zinc-300")
              }
            >
              {scenarios[key].label}
            </button>
          ),
        )}
      </div>
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          <div className="rounded border border-zinc-200 p-3 dark:border-zinc-800">
            <p className="text-xs text-zinc-500">最终状态</p>
            <p className="mt-1 font-mono text-sm">{current.state}</p>
          </div>
          <div className="rounded border border-zinc-200 p-3 dark:border-zinc-800">
            <p className="text-xs text-zinc-500">首查阶段</p>
            <p className="mt-1 text-sm">
              {scenario === "normal"
                ? stages.at(-1)
                : stages[Math.min(2, stages.length - 1)]}
            </p>
          </div>
          <div className="rounded border border-zinc-200 p-3 dark:border-zinc-800">
            <p className="text-xs text-zinc-500">证据字段</p>
            <p className="mt-1 text-sm">代际 · 帧号 · 栅栏</p>
          </div>
        </div>
        <p className="mt-3 rounded bg-zinc-100 px-3 py-3 text-sm text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
          {current.note}
        </p>
      </div>
    </section>
  );
}
