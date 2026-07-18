"use client";

import { useMemo, useState } from "react";
type LabMode = "system" | "feedback" | "evidence";
type Scenario = "normal" | "boundary" | "fault";

type Props = {
  unitId: string;
  title: string;
  nodes: readonly string[];
  focuses: readonly string[];
  mode: LabMode;
};

const modeNames: Record<LabMode, string> = {
  system: "系统边界",
  feedback: "反馈实验",
  evidence: "证据门禁",
};

const scenarioNames: Record<Scenario, string> = {
  normal: "正常",
  boundary: "恰好边界",
  fault: "单故障",
};

export function OfficialTpp20Lab({
  unitId,
  title,
  nodes,
  focuses,
  mode,
}: Props) {
  const [stage, setStage] = useState(2);
  const [changeRate, setChangeRate] = useState(34);
  const [coupling, setCoupling] = useState(28);
  const [evidence, setEvidence] = useState(78);
  const [scenario, setScenario] = useState<Scenario>("normal");
  const [runs, setRuns] = useState(0);

  const result = useMemo(() => {
    const penalty =
      scenario === "normal" ? 0 : scenario === "boundary" ? 18 : 42;
    const blastRadius = Math.min(
      100,
      Math.round(coupling * 0.72 + changeRate * 0.34 + penalty),
    );
    const latency = Math.round(
      7 + stage * 3 + coupling * 0.16 + penalty * 0.55,
    );
    const drift = Math.min(
      100,
      Math.round(changeRate * 0.38 + coupling * 0.24 + penalty * 0.7),
    );
    const confidence = Math.max(
      0,
      Math.round(evidence - blastRadius * 0.3 - drift * 0.22 - penalty * 0.35),
    );
    const accepted =
      scenario !== "fault" &&
      blastRadius <= 58 &&
      latency <= 28 &&
      confidence >= 58;
    return {
      accepted,
      blastRadius,
      latency,
      drift,
      confidence,
      trace: runs + 1,
    };
  }, [changeRate, coupling, evidence, runs, scenario, stage]);

  const reset = () => {
    setStage(2);
    setChangeRate(34);
    setCoupling(28);
    setEvidence(78);
    setScenario("normal");
    setRuns(0);
  };

  return (
    <section
      className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
      aria-label={title + "交互实验"}
    >
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            {unitId + " · " + modeNames[mode]}
          </p>
          <h3 className="break-words text-base font-semibold">{title}</h3>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex size-9 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"
          title="重置实验"
          aria-label="重置实验"
        >
          <span className="text-lg leading-none" aria-hidden="true">
            ↺
          </span>
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

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <label className="text-sm">
              变化速率 {changeRate}%
              <input
                className="mt-1 w-full accent-blue-600"
                type="range"
                min="0"
                max="100"
                value={changeRate}
                onChange={(event) => setChangeRate(Number(event.target.value))}
              />
            </label>
            <label className="text-sm">
              结构耦合 {coupling}%
              <input
                className="mt-1 w-full accent-rose-600"
                type="range"
                min="0"
                max="100"
                value={coupling}
                onChange={(event) => setCoupling(Number(event.target.value))}
              />
            </label>
            <label className="text-sm">
              证据覆盖 {evidence}%
              <input
                className="mt-1 w-full accent-emerald-600"
                type="range"
                min="0"
                max="100"
                value={evidence}
                onChange={(event) => setEvidence(Number(event.target.value))}
              />
            </label>
          </div>
        </div>

        <div className="p-4">
          <div
            className="grid grid-cols-3 gap-1"
            role="group"
            aria-label="样本类型"
          >
            {(Object.keys(scenarioNames) as Scenario[]).map((key) => (
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
                {scenarioNames[key]}
              </button>
            ))}
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <div className="border border-zinc-200 p-2 dark:border-zinc-800">
              <dt className="text-zinc-500">变更触达</dt>
              <dd className="mt-1 text-lg font-semibold">
                {result.blastRadius}%
              </dd>
            </div>
            <div className="border border-zinc-200 p-2 dark:border-zinc-800">
              <dt className="text-zinc-500">反馈延迟</dt>
              <dd className="mt-1 text-lg font-semibold">
                {result.latency} 分
              </dd>
            </div>
            <div className="border border-zinc-200 p-2 dark:border-zinc-800">
              <dt className="text-zinc-500">知识漂移</dt>
              <dd className="mt-1 text-lg font-semibold">{result.drift}%</dd>
            </div>
            <div className="border border-zinc-200 p-2 dark:border-zinc-800">
              <dt className="text-zinc-500">结论置信</dt>
              <dd className="mt-1 text-lg font-semibold">
                {result.confidence}%
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
