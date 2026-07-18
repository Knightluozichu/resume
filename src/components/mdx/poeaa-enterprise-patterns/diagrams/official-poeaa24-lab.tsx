"use client";

import { useMemo, useState } from "react";

type Mode = "boundary" | "mapping" | "transaction";
type Scenario = "normal" | "boundary" | "fault";
type Props = {
  unitId: string;
  title: string;
  nodes: readonly string[];
  focuses: readonly string[];
  mode: Mode;
};

const modeNames: Record<Mode, string> = {
  boundary: "边界拓扑",
  mapping: "映射实验",
  transaction: "事务证据",
};
const scenarioNames: Record<Scenario, string> = {
  normal: "正常",
  boundary: "恰好边界",
  fault: "单故障",
};

export function OfficialPoeaa24Lab({
  unitId,
  title,
  nodes,
  focuses,
  mode,
}: Props) {
  const [stage, setStage] = useState(2);
  const [objects, setObjects] = useState(18);
  const [coupling, setCoupling] = useState(32);
  const [latency, setLatency] = useState(24);
  const [evidence, setEvidence] = useState(82);
  const [scenario, setScenario] = useState<Scenario>("normal");
  const [runs, setRuns] = useState(0);

  const result = useMemo(() => {
    const penalty =
      scenario === "normal" ? 0 : scenario === "boundary" ? 16 : 40;
    const roundTrips = Math.max(
      1,
      Math.round(1 + stage + coupling / 24 + penalty / 12),
    );
    const mappingCost = Math.min(
      100,
      Math.round(objects * 1.35 + coupling * 0.48 + penalty),
    );
    const conflictRisk = Math.min(
      100,
      Math.round(objects * 0.72 + coupling * 0.44 + latency * 0.32 + penalty),
    );
    const confidence = Math.max(
      0,
      Math.round(
        evidence - mappingCost * 0.22 - conflictRisk * 0.25 - penalty * 0.3,
      ),
    );
    const accepted =
      scenario !== "fault" &&
      roundTrips <= 7 &&
      conflictRisk <= 64 &&
      confidence >= 55;
    return {
      accepted,
      roundTrips,
      mappingCost,
      conflictRisk,
      confidence,
      trace: runs + 1,
    };
  }, [coupling, evidence, latency, objects, runs, scenario, stage]);

  const reset = () => {
    setStage(2);
    setObjects(18);
    setCoupling(32);
    setLatency(24);
    setEvidence(82);
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
              对象规模 {objects}
              <input
                className="mt-1 w-full accent-blue-600"
                type="range"
                min="2"
                max="60"
                value={objects}
                onChange={(event) => setObjects(Number(event.target.value))}
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
              网络延迟 {latency}ms
              <input
                className="mt-1 w-full accent-amber-600"
                type="range"
                min="1"
                max="180"
                value={latency}
                onChange={(event) => setLatency(Number(event.target.value))}
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
              <dt className="text-zinc-500">边界往返</dt>
              <dd className="mt-1 text-lg font-semibold">
                {result.roundTrips}
              </dd>
            </div>
            <div className="border border-zinc-200 p-2 dark:border-zinc-800">
              <dt className="text-zinc-500">映射成本</dt>
              <dd className="mt-1 text-lg font-semibold">
                {result.mappingCost}%
              </dd>
            </div>
            <div className="border border-zinc-200 p-2 dark:border-zinc-800">
              <dt className="text-zinc-500">冲突风险</dt>
              <dd className="mt-1 text-lg font-semibold">
                {result.conflictRisk}%
              </dd>
            </div>
            <div className="border border-zinc-200 p-2 dark:border-zinc-800">
              <dt className="text-zinc-500">证据置信</dt>
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
