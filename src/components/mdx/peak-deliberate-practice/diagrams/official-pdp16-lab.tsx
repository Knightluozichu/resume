"use client";

import { useMemo, useState } from "react";

type Mode = "design" | "feedback" | "transfer";
type Scenario = "mature" | "adapted" | "naive";
type Props = {
  unitId: string;
  title: string;
  nodes: readonly string[];
  focuses: readonly string[];
  mode: Mode;
};

const modeLabels: Record<Mode, string> = {
  design: "专项设计",
  feedback: "反馈更新",
  transfer: "迁移复核",
};
const scenarioLabels: Record<Scenario, string> = {
  mature: "成熟体系",
  adapted: "原则迁移",
  naive: "天真重复",
};

export function OfficialPdp16Lab({
  unitId,
  title,
  nodes,
  focuses,
  mode,
}: Props) {
  const [stage, setStage] = useState(2);
  const [goal, setGoal] = useState(72);
  const [focus, setFocus] = useState(68);
  const [feedback, setFeedback] = useState(74);
  const [challenge, setChallenge] = useState(66);
  const [scenario, setScenario] = useState<Scenario>("mature");
  const [runs, setRuns] = useState(0);

  const result = useMemo(() => {
    const structure =
      scenario === "mature" ? 18 : scenario === "adapted" ? 4 : -34;
    const effectiveFeedback = scenario === "naive" ? feedback * 0.18 : feedback;
    const localization = Math.max(
      0,
      Math.min(
        100,
        Math.round(goal * 0.42 + effectiveFeedback * 0.34 + structure),
      ),
    );
    const correction = Math.max(
      0,
      Math.min(
        100,
        Math.round(
          focus * 0.3 + effectiveFeedback * 0.38 + challenge * 0.2 + structure,
        ),
      ),
    );
    const representation = Math.max(
      0,
      Math.min(
        100,
        Math.round(localization * 0.35 + correction * 0.42 + challenge * 0.18),
      ),
    );
    const transfer = Math.max(
      0,
      Math.min(
        100,
        Math.round(
          representation * 0.5 +
            correction * 0.3 +
            goal * 0.14 -
            (scenario === "naive" ? 28 : 0),
        ),
      ),
    );
    const accepted =
      scenario !== "naive" &&
      localization >= 56 &&
      correction >= 56 &&
      representation >= 54 &&
      transfer >= 52;
    return {
      accepted,
      correction,
      localization,
      representation,
      trace: runs + 1,
      transfer,
    };
  }, [challenge, feedback, focus, goal, runs, scenario]);

  const reset = () => {
    setStage(2);
    setGoal(72);
    setFocus(68);
    setFeedback(74);
    setChallenge(66);
    setScenario("mature");
    setRuns(0);
  };

  return (
    <section
      className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
      aria-label={title + "练习实验"}
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
            <label className="text-sm">
              目标清晰度 {goal}%
              <input
                className="mt-1 w-full accent-blue-600"
                type="range"
                min="0"
                max="100"
                value={goal}
                onChange={(event) => setGoal(Number(event.target.value))}
              />
            </label>
            <label className="text-sm">
              有效专注 {focus}%
              <input
                className="mt-1 w-full accent-amber-600"
                type="range"
                min="0"
                max="100"
                value={focus}
                onChange={(event) => setFocus(Number(event.target.value))}
              />
            </label>
            <label className="text-sm">
              反馈质量 {feedback}%
              <input
                className="mt-1 w-full accent-rose-600"
                type="range"
                min="0"
                max="100"
                value={feedback}
                onChange={(event) => setFeedback(Number(event.target.value))}
              />
            </label>
            <label className="text-sm">
              挑战强度 {challenge}%
              <input
                className="mt-1 w-full accent-emerald-600"
                type="range"
                min="0"
                max="100"
                value={challenge}
                onChange={(event) => setChallenge(Number(event.target.value))}
              />
            </label>
          </div>
        </div>
        <div className="p-4">
          <div
            className="grid grid-cols-3 gap-1"
            role="group"
            aria-label="练习场景"
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
              ["弱点定位", result.localization],
              ["纠错效率", result.correction],
              ["表征升级", result.representation],
              ["迁移表现", result.transfer],
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
            <strong>{result.accepted ? "练习门禁通过" : "练习门禁拒绝"}</strong>
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
