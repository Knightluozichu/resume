"use client";

import { useMemo, useState } from "react";

type LabMode = "map" | "experiment" | "evidence";

type Props = {
  title: string;
  stages: readonly string[];
  sourceLabel: string;
  mode: LabMode;
};

const modeLabels: Record<LabMode, string> = {
  map: "结构地图",
  experiment: "变量实验",
  evidence: "证据门禁",
};

export function OfficialCourseLab({ title, stages, sourceLabel, mode }: Props) {
  const [active, setActive] = useState(0);
  const [coverage, setCoverage] = useState(80);
  const [risk, setRisk] = useState(24);
  const [fault, setFault] = useState(false);
  const [runs, setRuns] = useState(0);

  const result = useMemo(() => {
    const effectiveCoverage = Math.max(0, coverage - (fault ? 31 : 0));
    const residualRisk = Math.min(100, risk + (fault ? 36 : 0));
    const accepted = effectiveCoverage >= 72 && residualRisk <= 42;
    return { accepted, effectiveCoverage, residualRisk };
  }, [coverage, fault, risk]);

  return (
    <section
      className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
      aria-label={`${title}${modeLabels[mode]}`}
    >
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            {modeLabels[mode]} · {sourceLabel}
          </p>
          <h3 className="break-words text-base font-semibold">{title}</h3>
        </div>
        <button
          type="button"
          title="重置实验"
          aria-label="重置实验"
          className="inline-flex size-9 items-center justify-center rounded border border-zinc-300 bg-white text-lg dark:border-zinc-700 dark:bg-zinc-950"
          onClick={() => {
            setActive(0);
            setCoverage(80);
            setRisk(24);
            setFault(false);
            setRuns(0);
          }}
        >
          <span aria-hidden="true">↺</span>
        </button>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.75fr)]">
        <div className="border-b border-zinc-200 p-4 lg:border-b-0 lg:border-r dark:border-zinc-800">
          <div className="grid grid-cols-5 gap-1" style={{ minHeight: 132 }}>
            {stages.map((stage, index) => (
              <button
                key={`${stage}-${index}`}
                type="button"
                title={`检查${stage}`}
                onClick={() => setActive(index)}
                className={
                  "min-w-0 border px-1 py-3 text-xs leading-5 " +
                  (index === active
                    ? "border-blue-600 bg-blue-50 text-blue-950 dark:bg-blue-950 dark:text-blue-50"
                    : index < active
                      ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-950"
                      : "border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900")
                }
              >
                <span className="block font-semibold">{index + 1}</span>
                <span className="block break-words">{stage}</span>
              </button>
            ))}
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="text-sm">
              目录与测试覆盖 {coverage}%
              <input
                className="mt-1 w-full accent-blue-600"
                type="range"
                min="0"
                max="100"
                value={coverage}
                onChange={(event) => setCoverage(Number(event.target.value))}
              />
            </label>
            <label className="text-sm">
              变更与失效风险 {risk}%
              <input
                className="mt-1 w-full accent-rose-600"
                type="range"
                min="0"
                max="100"
                value={risk}
                onChange={(event) => setRisk(Number(event.target.value))}
              />
            </label>
          </div>
        </div>

        <div className="p-4">
          <button
            type="button"
            aria-pressed={fault}
            onClick={() => setFault((value) => !value)}
            className={
              "w-full border px-3 py-2 text-sm font-semibold " +
              (fault
                ? "border-rose-600 bg-rose-50 text-rose-950 dark:bg-rose-950 dark:text-rose-50"
                : "border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-900")
            }
          >
            {fault ? "单故障样本已注入" : "注入一个边界故障"}
          </button>

          <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <div className="border border-zinc-200 p-2 dark:border-zinc-800">
              <dt className="text-zinc-500">有效覆盖</dt>
              <dd className="mt-1 text-lg font-semibold">
                {result.effectiveCoverage}%
              </dd>
            </div>
            <div className="border border-zinc-200 p-2 dark:border-zinc-800">
              <dt className="text-zinc-500">残余风险</dt>
              <dd className="mt-1 text-lg font-semibold">
                {result.residualRisk}%
              </dd>
            </div>
          </dl>

          <div
            className={
              "mt-3 border p-3 text-sm " +
              (result.accepted
                ? "border-emerald-500 bg-emerald-50 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-50"
                : "border-rose-500 bg-rose-50 text-rose-950 dark:bg-rose-950 dark:text-rose-50")
            }
          >
            <strong>{result.accepted ? "门禁通过" : "门禁拒绝"}</strong>
            <p className="mt-1 break-words">
              当前检查：{stages[active]}；运行记录 #{runs + 1}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setRuns((value) => value + 1)}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded bg-blue-700 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-800"
          >
            <span aria-hidden="true">▶</span>运行并保存证据
          </button>
        </div>
      </div>
    </section>
  );
}
