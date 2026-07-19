"use client";

import { useMemo, useState } from "react";

type LabMode = "structure" | "change" | "evidence";
type Scenario = "fit" | "pressure" | "misuse";

type Refactoring = {
  label: string;
  detail: string;
  couplingDelta: number;
  changeDelta: number;
  traceDelta: number;
};

type Props = {
  unitId: string;
  title: string;
  problem: string;
  participants: readonly [string, string, string];
  flow: readonly [string, string, string, string, string];
  concepts: readonly string[];
  refactorings: readonly [Refactoring, Refactoring, Refactoring];
  metricLabels: readonly [string, string, string];
  fitNote: string;
  misuseNote: string;
  mode: LabMode;
  baseline: readonly [number, number, number];
};

const modeLabels: Record<LabMode, string> = {
  structure: "参与者结构",
  change: "变更传播",
  evidence: "权衡证据",
};

const scenarioLabels: Record<Scenario, string> = {
  fit: "问题匹配",
  pressure: "新增变化",
  misuse: "误用反例",
};

const effects: Record<
  Scenario,
  { coupling: number; change: number; trace: number }
> = {
  fit: { coupling: 0, change: 0, trace: 0 },
  pressure: { coupling: 12, change: 18, trace: -8 },
  misuse: { coupling: 28, change: 30, trace: -24 },
};

function clamp(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function PatternTradeoffLab({
  unitId,
  title,
  problem,
  participants,
  flow,
  concepts,
  refactorings,
  metricLabels,
  fitNote,
  misuseNote,
  mode,
  baseline,
}: Props) {
  const [scenario, setScenario] = useState<Scenario>("fit");
  const [step, setStep] = useState(0);
  const [refactoring, setRefactoring] = useState(0);
  const [runs, setRuns] = useState(0);

  const result = useMemo(() => {
    const scenarioEffect = effects[scenario];
    const change = refactorings[refactoring];
    const coupling = clamp(
      baseline[0] + scenarioEffect.coupling + change.couplingDelta + step,
    );
    const changeCost = clamp(
      baseline[1] + scenarioEffect.change + change.changeDelta + step * 2,
    );
    const trace = clamp(baseline[2] + scenarioEffect.trace + change.traceDelta);
    const accepted =
      scenario !== "misuse" &&
      coupling <= 58 &&
      changeCost <= 60 &&
      trace >= 58;
    return { coupling, changeCost, trace, accepted };
  }, [baseline, refactoring, refactorings, scenario, step]);

  const reset = () => {
    setScenario("fit");
    setStep(0);
    setRefactoring(0);
    setRuns(0);
  };

  return (
    <section
      className="not-prose my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
      aria-label={`${title}${modeLabels[mode]}实验`}
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-violet-700 dark:text-violet-300">
            {unitId} · {modeLabels[mode]}
          </p>
          <h3 className="mt-1 break-words text-base font-semibold">{title}</h3>
          <p className="mt-1 break-words text-sm text-zinc-600 dark:text-zinc-300">
            {problem}
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-xl hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"
          aria-label="重置模式实验"
          title="重置模式实验"
        >
          <span aria-hidden="true">↺</span>
        </button>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
        <div className="border-b border-zinc-200 p-4 lg:border-r lg:border-b-0 dark:border-zinc-800">
          <p className="text-xs font-semibold tracking-wide text-zinc-500 uppercase">
            模式参与者
          </p>
          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            {participants.map((participant, index) => (
              <div
                key={participant}
                className="min-w-0 border border-zinc-200 p-3 dark:border-zinc-800"
              >
                <span className="text-xs text-zinc-500">
                  参与者 {index + 1}
                </span>
                <strong className="mt-1 block break-words text-sm">
                  {participant}
                </strong>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs font-semibold tracking-wide text-zinc-500 uppercase">
            调用与变更路径
          </p>
          <div className="mt-2 grid gap-2 sm:grid-cols-5">
            {flow.map((item, index) => (
              <button
                key={item}
                type="button"
                aria-pressed={step === index}
                onClick={() => setStep(index)}
                className={`min-h-11 min-w-0 border px-2 py-2 text-xs leading-5 focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  step === index
                    ? "border-violet-700 bg-violet-50 font-semibold text-violet-950 dark:bg-violet-950 dark:text-violet-50"
                    : "border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900"
                }`}
              >
                <span className="block text-[10px] text-zinc-500">
                  {index + 1}
                </span>
                <span className="block break-words">{item}</span>
              </button>
            ))}
          </div>

          <div className="mt-3 border border-zinc-200 p-3 dark:border-zinc-800">
            <strong className="text-sm">当前检查：{flow[step]}</strong>
            <p className="mt-1 break-words text-sm text-zinc-600 dark:text-zinc-300">
              目录证据：{concepts[step % concepts.length]}
            </p>
          </div>

          <p className="mt-4 text-xs font-semibold tracking-wide text-zinc-500 uppercase">
            只应用一次重构
          </p>
          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            {refactorings.map((item, index) => (
              <button
                key={item.label}
                type="button"
                aria-pressed={refactoring === index}
                onClick={() => setRefactoring(index)}
                className={`min-h-11 min-w-0 border p-3 text-left focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  refactoring === index
                    ? "border-zinc-950 bg-zinc-950 text-white dark:border-white dark:bg-white dark:text-zinc-950"
                    : "border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-900"
                }`}
              >
                <strong className="block break-words text-sm">
                  {item.label}
                </strong>
                <span className="mt-1 block break-words text-xs opacity-75">
                  {item.detail}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4">
          <div
            className="grid grid-cols-3 gap-2"
            role="group"
            aria-label="模式场景"
          >
            {(Object.keys(scenarioLabels) as Scenario[]).map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={scenario === key}
                onClick={() => setScenario(key)}
                className={`min-h-11 border px-2 py-2 text-xs font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  scenario === key
                    ? "border-violet-700 bg-violet-700 text-white"
                    : "border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-900"
                }`}
              >
                {scenarioLabels[key]}
              </button>
            ))}
          </div>

          <dl className="mt-4 grid grid-cols-3 gap-2">
            {[
              [metricLabels[0], result.coupling],
              [metricLabels[1], result.changeCost],
              [metricLabels[2], result.trace],
            ].map(([label, value]) => (
              <div
                key={String(label)}
                className="min-w-0 border border-zinc-200 p-2 dark:border-zinc-800"
              >
                <dt className="break-words text-xs text-zinc-500">{label}</dt>
                <dd className="mt-1 text-xl font-semibold">{value}%</dd>
              </div>
            ))}
          </dl>

          <div
            className={`mt-3 border p-3 text-sm ${
              result.accepted
                ? "border-emerald-500 bg-emerald-50 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-50"
                : "border-rose-500 bg-rose-50 text-rose-950 dark:bg-rose-950 dark:text-rose-50"
            }`}
          >
            <strong>{result.accepted ? "模式证据通过" : "模式证据拒绝"}</strong>
            <p className="mt-1 break-words">
              {scenario === "misuse" ? misuseNote : fitNote}
            </p>
            <p className="mt-2 text-xs">已保存运行：{runs}</p>
          </div>

          <button
            type="button"
            onClick={() => setRuns((value) => value + 1)}
            className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded bg-violet-700 px-3 py-2 text-sm font-semibold text-white hover:bg-violet-800 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            运行并保存权衡轨迹
          </button>
        </div>
      </div>
    </section>
  );
}
