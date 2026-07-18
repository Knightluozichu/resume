"use client";

import { useMemo, useState } from "react";

type Mode = "diagnosis" | "experiment" | "transfer";
type Scenario = "supported" | "boundary" | "slogan";
type Props = {
  unitId: string;
  title: string;
  nodes: readonly string[];
  focuses: readonly string[];
  mode: Mode;
};

const modeLabels: Record<Mode, string> = {
  diagnosis: "触发诊断",
  experiment: "策略实验",
  transfer: "迁移复核",
};
const scenarioLabels: Record<Scenario, string> = {
  supported: "策略与支持",
  boundary: "资源边界",
  slogan: "只有口号",
};

export function OfficialMsg17Lab({
  unitId,
  title,
  nodes,
  focuses,
  mode,
}: Props) {
  const [stage, setStage] = useState(2);
  const [challenge, setChallenge] = useState(62);
  const [strategy, setStrategy] = useState(68);
  const [feedback, setFeedback] = useState(72);
  const [support, setSupport] = useState(64);
  const [scenario, setScenario] = useState<Scenario>("supported");
  const [runs, setRuns] = useState(0);

  const result = useMemo(() => {
    const boundaryPenalty = scenario === "boundary" ? 18 : 0;
    const sloganPenalty = scenario === "slogan" ? 42 : 0;
    const effectiveStrategy =
      scenario === "slogan" ? strategy * 0.25 : strategy;
    const engagement = Math.max(
      0,
      Math.min(
        100,
        Math.round(
          challenge * 0.28 +
            effectiveStrategy * 0.34 +
            support * 0.28 -
            boundaryPenalty -
            sloganPenalty * 0.3,
        ),
      ),
    );
    const calibration = Math.max(
      0,
      Math.min(
        100,
        Math.round(
          feedback * 0.52 +
            effectiveStrategy * 0.25 +
            support * 0.14 -
            boundaryPenalty * 0.5 -
            sloganPenalty * 0.45,
        ),
      ),
    );
    const persistence = Math.max(
      0,
      Math.min(
        100,
        Math.round(
          engagement * 0.46 +
            feedback * 0.2 +
            support * 0.26 -
            Math.max(0, challenge - 82) * 0.8,
        ),
      ),
    );
    const transfer = Math.max(
      0,
      Math.min(
        100,
        Math.round(
          calibration * 0.44 +
            persistence * 0.34 +
            effectiveStrategy * 0.18 -
            boundaryPenalty * 0.35,
        ),
      ),
    );
    const accepted =
      scenario !== "slogan" &&
      engagement >= 54 &&
      calibration >= 52 &&
      persistence >= 54 &&
      transfer >= 52;
    return {
      accepted,
      calibration,
      engagement,
      persistence,
      trace: runs + 1,
      transfer,
    };
  }, [challenge, feedback, runs, scenario, strategy, support]);

  const reset = () => {
    setStage(2);
    setChallenge(62);
    setStrategy(68);
    setFeedback(72);
    setSupport(64);
    setScenario("supported");
    setRuns(0);
  };

  return (
    <section
      className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
      aria-label={title + "思维模式实验"}
    >
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            {unitId + " · " + modeLabels[mode]}
          </p>
          <h3 className="break-words text-base font-semibold">{title}</h3>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex size-9 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"
          title="重置实验"
          aria-label="重置实验"
        >
          <span aria-hidden="true">↺</span>
        </button>
      </header>
      <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(290px,0.85fr)]">
        <div className="border-b border-zinc-200 p-4 lg:border-b-0 lg:border-r dark:border-zinc-800">
          <div className="grid grid-cols-5 gap-1" style={{ minHeight: 136 }}>
            {nodes.map((node, index) => (
              <button
                key={node}
                type="button"
                onClick={() => setStage(index)}
                className={
                  "min-w-0 border px-1 py-3 text-xs leading-5 " +
                  (index === stage
                    ? "border-blue-600 bg-blue-50 text-blue-950 dark:bg-blue-950 dark:text-blue-50"
                    : index < stage
                      ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-950"
                      : "border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900")
                }
                title={"检查" + node}
              >
                <span className="block font-semibold">{index + 1}</span>
                <span className="block break-words">{node}</span>
              </button>
            ))}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              ["挑战强度", challenge, setChallenge, "accent-blue-600"],
              ["策略质量", strategy, setStrategy, "accent-amber-600"],
              ["反馈质量", feedback, setFeedback, "accent-rose-600"],
              ["环境支持", support, setSupport, "accent-emerald-600"],
            ].map(([label, value, setter, accent]) => (
              <label className="text-sm" key={String(label)}>
                {String(label) + " " + String(value) + "%"}
                <input
                  className={"mt-1 w-full " + String(accent)}
                  type="range"
                  min="0"
                  max="100"
                  value={Number(value)}
                  onChange={(event) =>
                    (setter as (next: number) => void)(
                      Number(event.target.value),
                    )
                  }
                />
              </label>
            ))}
          </div>
        </div>
        <div className="p-4">
          <div
            className="grid grid-cols-3 gap-1"
            role="group"
            aria-label="实验条件"
          >
            {(Object.keys(scenarioLabels) as Scenario[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setScenario(key)}
                className={
                  "border px-2 py-2 text-xs font-semibold " +
                  (scenario === key
                    ? "border-zinc-950 bg-zinc-950 text-white dark:border-white dark:bg-white dark:text-zinc-950"
                    : "border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-900")
                }
              >
                {scenarioLabels[key]}
              </button>
            ))}
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {[
              ["挑战投入", result.engagement],
              ["反馈校准", result.calibration],
              ["有效坚持", result.persistence],
              ["跨境迁移", result.transfer],
            ].map(([label, value]) => (
              <div
                className="border border-zinc-200 p-2 dark:border-zinc-800"
                key={String(label)}
              >
                <dt className="text-zinc-500">{label}</dt>
                <dd className="mt-1 text-lg font-semibold">{value + "%"}</dd>
              </div>
            ))}
          </dl>
          <div
            className={
              "mt-3 border p-3 text-sm " +
              (result.accepted
                ? "border-emerald-500 bg-emerald-50 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-50"
                : "border-rose-500 bg-rose-50 text-rose-950 dark:bg-rose-950 dark:text-rose-50")
            }
          >
            <strong>{result.accepted ? "证据门禁通过" : "证据门禁拒绝"}</strong>
            <p className="mt-1 break-words">
              {"首查：" +
                focuses[Math.min(stage, focuses.length - 1)] +
                "；轨迹 #" +
                result.trace}
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
