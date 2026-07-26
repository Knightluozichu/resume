"use client";

import { useMemo, useState } from "react";

type LabProps = {
  title: string;
  focus: string;
  stages: string[];
};

const evidenceModes = {
  normal: {
    label: "正常",
    result: "承诺成立",
    note: "目标玩家理解规则，并能预测选择后果。",
  },
  boundary: {
    label: "边界",
    result: "需要分段",
    note: "新手或替代输入玩家暴露额外学习成本。",
  },
  counter: {
    label: "反例",
    result: "返回修改",
    note: "关键行为与体验承诺冲突，不能只调展示。",
  },
} as const;

export function GdfPlayerContractLab({ title, focus, stages }: LabProps) {
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
          设计焦点：{focus}
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
        。写清玩家看到什么、能做什么、系统怎样回应以及怎样判定失败。
      </p>
    </section>
  );
}

export function GdfPrototypeExperimentLab({ title, focus }: LabProps) {
  const [choices, setChoices] = useState(3);
  const [challenge, setChallenge] = useState(100);
  const [latency, setLatency] = useState(120);
  function resetExperiment() {
    setChoices(3);
    setChallenge(100);
    setLatency(120);
  }

  const metrics = useMemo(() => {
    const readability = Math.max(0, 1 - Math.max(0, choices - 4) * 0.12);
    const match = Math.max(0, 1 - Math.abs(challenge - 100) / 90);
    const feedback = Math.max(0, 1 - Math.max(0, latency - 100) / 900);
    return {
      readability,
      match,
      feedback,
      confidence: readability * match * feedback,
    };
  }, [choices, challenge, latency]);
  return (
    <section className="my-6 overflow-hidden rounded-md border border-amber-300 bg-white dark:border-amber-800 dark:bg-zinc-950">
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
      <header className="border-b border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-900 dark:bg-amber-950/30">
        <p className="text-sm font-semibold text-amber-950 dark:text-amber-100">
          {title}
        </p>
        <p className="mt-1 text-xs text-amber-800 dark:text-amber-300">
          变量实验：{focus}
        </p>
      </header>
      <div className="grid gap-5 p-4 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-4">
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
            有效选择：{choices}
            <input
              className="mt-2 w-full accent-emerald-600"
              type="range"
              min="1"
              max="9"
              value={choices}
              onChange={(event) => setChoices(Number(event.target.value))}
            />
          </label>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
            挑战/技能：{challenge}%
            <input
              className="mt-2 w-full accent-amber-600"
              type="range"
              min="40"
              max="180"
              step="5"
              value={challenge}
              onChange={(event) => setChallenge(Number(event.target.value))}
            />
          </label>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
            反馈延迟：{latency} ms
            <input
              className="mt-2 w-full accent-rose-600"
              type="range"
              min="20"
              max="1000"
              step="20"
              value={latency}
              onChange={(event) => setLatency(Number(event.target.value))}
            />
          </label>
        </div>
        <div className="grid grid-cols-2 gap-2" aria-live="polite">
          {[
            ["可辨认度", metrics.readability],
            ["挑战匹配", metrics.match],
            ["反馈清晰", metrics.feedback],
            ["联合置信", metrics.confidence],
          ].map(([label, value]) => (
            <div
              key={String(label)}
              className="min-h-24 rounded border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {label}
              </p>
              <p className="mt-2 font-mono text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {(Number(value) * 100).toFixed(0)}%
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function GdfPlaytestEvidenceLab({ title, focus }: LabProps) {
  const [mode, setMode] = useState<keyof typeof evidenceModes>("normal");
  function resetExperiment() {
    setMode("normal");
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
          证据审查：{focus}
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
          <p className="text-xs text-sky-700 dark:text-sky-300">当前决议</p>
          <p className="mt-2 text-sm font-semibold text-sky-950 dark:text-sky-100">
            {current.result}
          </p>
        </div>
        <p className="self-center text-sm text-zinc-700 dark:text-zinc-300">
          {current.note} 保存版本、玩家段、任务、录像索引、指标和替代解释。
        </p>
      </div>
    </section>
  );
}
