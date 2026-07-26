"use client";

import { useMemo, useState } from "react";

type LabProps = {
  title: string;
  focus: string;
  stages: string[];
};

const evidenceModes = {
  artifact: {
    label: "作品",
    result: "可运行",
    note: "输出绑定提交、环境、输入与结果。",
  },
  boundary: {
    label: "边界",
    result: "需扩展",
    note: "改变规模或平台后暴露新的前置缺口。",
  },
  handoff: {
    label: "交接",
    result: "待复现",
    note: "由同伴按文档重建结果，失败即退回修订。",
  },
} as const;

export function GmpRouteMapLab({ title, focus, stages }: LabProps) {
  const [selected, setSelected] = useState(0);
  function resetExperiment() {
    setSelected(0);
  }

  return (
    <section className="my-6 overflow-hidden rounded-md border border-emerald-300 bg-white dark:border-emerald-800 dark:bg-zinc-950">
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
      <header className="border-b border-emerald-200 bg-emerald-50 px-4 py-3 dark:border-emerald-900 dark:bg-emerald-950/40">
        <p className="text-sm font-semibold text-emerald-950 dark:text-emerald-100">
          {title}
        </p>
        <p className="mt-1 text-xs text-emerald-800 dark:text-emerald-300">
          路线焦点：{focus}
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
      <p className="border-t border-zinc-200 px-4 py-3 text-sm text-zinc-700 dark:border-zinc-800 dark:text-zinc-300">
        当前检查：{stages[selected]}
        。登记前置、路线类型、作品、复核人和退出条件。
      </p>
    </section>
  );
}

export function GmpEffortExperimentLab({ title, focus }: LabProps) {
  const [hours, setHours] = useState(8);
  const [routes, setRoutes] = useState(1);
  const [validation, setValidation] = useState(40);
  function resetExperiment() {
    setHours(8);
    setRoutes(1);
    setValidation(40);
  }

  const metrics = useMemo(() => {
    const focusRate = 1 / routes;
    const buildHours = hours * (validation / 100);
    const switchCost = Math.max(0, routes - 1) * 1.5;
    return {
      focusRate,
      buildHours,
      switchCost,
      evidence: Math.max(0, buildHours - switchCost),
    };
  }, [hours, routes, validation]);
  return (
    <section className="my-6 overflow-hidden rounded-md border border-amber-300 bg-white dark:border-amber-800 dark:bg-zinc-950">
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
      <header className="border-b border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-900 dark:bg-amber-950/30">
        <p className="text-sm font-semibold text-amber-950 dark:text-amber-100">
          {title}
        </p>
        <p className="mt-1 text-xs text-amber-800 dark:text-amber-300">
          投入实验：{focus}
        </p>
      </header>
      <div className="grid gap-5 p-4 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-4">
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
            每周投入：{hours}小时
            <input
              className="mt-2 w-full accent-emerald-600"
              type="range"
              min="2"
              max="20"
              value={hours}
              onChange={(event) => setHours(Number(event.target.value))}
            />
          </label>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
            并行路线：{routes}
            <input
              className="mt-2 w-full accent-amber-600"
              type="range"
              min="1"
              max="6"
              value={routes}
              onChange={(event) => setRoutes(Number(event.target.value))}
            />
          </label>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
            验证占比：{validation}%
            <input
              className="mt-2 w-full accent-sky-600"
              type="range"
              min="10"
              max="80"
              step="5"
              value={validation}
              onChange={(event) => setValidation(Number(event.target.value))}
            />
          </label>
        </div>
        <div className="grid grid-cols-2 gap-2" aria-live="polite">
          {[
            ["主线聚焦", (metrics.focusRate * 100).toFixed(0) + "%"],
            ["作品时间", metrics.buildHours.toFixed(1) + "h"],
            ["切换成本", metrics.switchCost.toFixed(1) + "h"],
            ["有效证据", metrics.evidence.toFixed(1) + "h"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="min-h-24 rounded border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {label}
              </p>
              <p className="mt-2 font-mono text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function GmpLearningEvidenceLab({ title, focus }: LabProps) {
  const [mode, setMode] = useState<keyof typeof evidenceModes>("artifact");
  function resetExperiment() {
    setMode("artifact");
  }

  const current = evidenceModes[mode];
  return (
    <section className="my-6 overflow-hidden rounded-md border border-sky-300 bg-white dark:border-sky-800 dark:bg-zinc-950">
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
      <header className="border-b border-sky-200 bg-sky-50 px-4 py-3 dark:border-sky-900 dark:bg-sky-950/30">
        <p className="text-sm font-semibold text-sky-950 dark:text-sky-100">
          {title}
        </p>
        <p className="mt-1 text-xs text-sky-800 dark:text-sky-300">
          证据焦点：{focus}
        </p>
      </header>
      <div className="grid grid-cols-3 border-b border-zinc-200 dark:border-zinc-800">
        {(Object.keys(evidenceModes) as Array<keyof typeof evidenceModes>).map(
          (key) => (
            <button
              key={key}
              type="button"
              aria-pressed={mode === key}
              onClick={() => setMode(key)}
              className={
                "min-h-11 border-r border-zinc-200 px-2 text-sm last:border-r-0 dark:border-zinc-800 " +
                (mode === key
                  ? "bg-sky-100 font-semibold text-sky-950 dark:bg-sky-950 dark:text-sky-100"
                  : "bg-white text-zinc-600 dark:bg-zinc-950 dark:text-zinc-300")
              }
            >
              {evidenceModes[key].label}
            </button>
          ),
        )}
      </div>
      <div
        className="grid gap-3 p-4 sm:grid-cols-[10rem_1fr]"
        aria-live="polite"
      >
        <div className="rounded border border-sky-200 bg-sky-50 p-3 dark:border-sky-900 dark:bg-sky-950/30">
          <p className="text-xs text-sky-700 dark:text-sky-300">当前状态</p>
          <p className="mt-2 text-sm font-semibold text-sky-950 dark:text-sky-100">
            {current.result}
          </p>
        </div>
        <p className="self-center text-sm text-zinc-700 dark:text-zinc-300">
          {current.note} 只有三类证据闭环，节点才进入“掌握”。
        </p>
      </div>
    </section>
  );
}
