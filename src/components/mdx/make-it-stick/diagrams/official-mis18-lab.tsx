"use client";

import { useMemo, useState } from "react";

type Mode = "schedule" | "retrieval" | "calibration";
type Scenario = "normal" | "boundary" | "mismatch";
type Props = {
  unitId: string;
  title: string;
  nodes: readonly string[];
  focuses: readonly string[];
  mode: Mode;
};

const modeLabels: Record<Mode, string> = {
  schedule: "练习调度",
  retrieval: "检索轨迹",
  calibration: "校准迁移",
};
const scenarioLabels: Record<Scenario, string> = {
  normal: "正常",
  boundary: "恰好边界",
  mismatch: "策略失配",
};

export function OfficialMis18Lab({
  unitId,
  title,
  nodes,
  focuses,
  mode,
}: Props) {
  const [stage, setStage] = useState(2);
  const [spacing, setSpacing] = useState(58);
  const [retrievals, setRetrievals] = useState(4);
  const [interleaving, setInterleaving] = useState(55);
  const [feedback, setFeedback] = useState(78);
  const [scenario, setScenario] = useState<Scenario>("normal");
  const [runs, setRuns] = useState(0);
  const result = useMemo(() => {
    const penalty =
      scenario === "normal" ? 0 : scenario === "boundary" ? 16 : 42;
    const retention = Math.max(
      0,
      Math.min(
        100,
        Math.round(spacing * 0.38 + retrievals * 8 + feedback * 0.24 - penalty),
      ),
    );
    const discrimination = Math.max(
      0,
      Math.min(
        100,
        Math.round(interleaving * 0.62 + retrievals * 6 - penalty * 0.55),
      ),
    );
    const calibrationError = Math.max(
      0,
      Math.round(34 - feedback * 0.22 - retrievals * 1.8 + penalty * 0.55),
    );
    const transfer = Math.max(
      0,
      Math.min(
        100,
        Math.round(
          retention * 0.35 +
            discrimination * 0.48 +
            interleaving * 0.17 -
            penalty * 0.35,
        ),
      ),
    );
    const accepted =
      scenario !== "mismatch" &&
      retention >= 58 &&
      discrimination >= 52 &&
      calibrationError <= 18 &&
      transfer >= 52;
    return {
      accepted,
      calibrationError,
      discrimination,
      retention,
      trace: runs + 1,
      transfer,
    };
  }, [feedback, interleaving, retrievals, runs, scenario, spacing]);
  const reset = () => {
    setStage(2);
    setSpacing(58);
    setRetrievals(4);
    setInterleaving(55);
    setFeedback(78);
    setScenario("normal");
    setRuns(0);
  };
  return (
    <section
      className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
      aria-label={title + "学习实验"}
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
          <div className="grid grid-cols-5 gap-1" style={{ minHeight: 132 }}>
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
              间隔强度 {spacing}%
              <input
                className="mt-1 w-full accent-blue-600"
                type="range"
                min="0"
                max="100"
                value={spacing}
                onChange={(event) => setSpacing(Number(event.target.value))}
              />
            </label>
            <label className="text-sm">
              检索次数 {retrievals}
              <input
                className="mt-1 w-full accent-rose-600"
                type="range"
                min="1"
                max="8"
                value={retrievals}
                onChange={(event) => setRetrievals(Number(event.target.value))}
              />
            </label>
            <label className="text-sm">
              穿插比例 {interleaving}%
              <input
                className="mt-1 w-full accent-amber-600"
                type="range"
                min="0"
                max="100"
                value={interleaving}
                onChange={(event) =>
                  setInterleaving(Number(event.target.value))
                }
              />
            </label>
            <label className="text-sm">
              反馈质量 {feedback}%
              <input
                className="mt-1 w-full accent-emerald-600"
                type="range"
                min="0"
                max="100"
                value={feedback}
                onChange={(event) => setFeedback(Number(event.target.value))}
              />
            </label>
          </div>
        </div>
        <div className="p-4">
          <div
            className="grid grid-cols-3 gap-1"
            role="group"
            aria-label="实验场景"
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
            <div className="border border-zinc-200 p-2 dark:border-zinc-800">
              <dt className="text-zinc-500">延迟保持</dt>
              <dd className="mt-1 text-lg font-semibold">
                {result.retention}%
              </dd>
            </div>
            <div className="border border-zinc-200 p-2 dark:border-zinc-800">
              <dt className="text-zinc-500">策略辨识</dt>
              <dd className="mt-1 text-lg font-semibold">
                {result.discrimination}%
              </dd>
            </div>
            <div className="border border-zinc-200 p-2 dark:border-zinc-800">
              <dt className="text-zinc-500">校准误差</dt>
              <dd className="mt-1 text-lg font-semibold">
                {result.calibrationError}%
              </dd>
            </div>
            <div className="border border-zinc-200 p-2 dark:border-zinc-800">
              <dt className="text-zinc-500">迁移表现</dt>
              <dd className="mt-1 text-lg font-semibold">{result.transfer}%</dd>
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
