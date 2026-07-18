"use client";

import { useMemo, useState } from "react";

type Mode = "map" | "experiment" | "evidence";
type Topology = "distributed" | "hybrid" | "centralized";
type Props = {
  unitId: string;
  title: string;
  nodes: readonly string[];
  focuses: readonly string[];
  mode: Mode;
};

const modeLabels: Record<Mode, string> = {
  map: "机制地图",
  experiment: "扰动实验",
  evidence: "证据复核",
};
const topologyLabels: Record<Topology, string> = {
  distributed: "分布式",
  hybrid: "协同式",
  centralized: "集中式",
};

export function OfficialOoc16Lab({
  unitId,
  title,
  nodes,
  focuses,
  mode,
}: Props) {
  const [stage, setStage] = useState(2);
  const [diversity, setDiversity] = useState(72);
  const [feedback, setFeedback] = useState(68);
  const [coupling, setCoupling] = useState(54);
  const [variation, setVariation] = useState(46);
  const [topology, setTopology] = useState<Topology>("hybrid");
  const [runs, setRuns] = useState(0);

  const result = useMemo(() => {
    const local =
      topology === "distributed" ? 18 : topology === "hybrid" ? 10 : -16;
    const coordination =
      topology === "centralized" ? 16 : topology === "hybrid" ? 12 : 2;
    const overload = Math.max(0, coupling - feedback - 12);
    const emergence = Math.max(
      0,
      Math.min(
        100,
        Math.round(
          diversity * 0.34 + variation * 0.32 + coupling * 0.2 + local,
        ),
      ),
    );
    const resilience = Math.max(
      0,
      Math.min(
        100,
        Math.round(
          diversity * 0.3 + feedback * 0.38 + local + coordination - overload,
        ),
      ),
    );
    const adaptation = Math.max(
      0,
      Math.min(
        100,
        Math.round(
          variation * 0.3 +
            feedback * 0.34 +
            emergence * 0.2 +
            local -
            overload,
        ),
      ),
    );
    const auditability = Math.max(
      0,
      Math.min(
        100,
        Math.round(feedback * 0.48 + coordination + (100 - coupling) * 0.2),
      ),
    );
    const accepted =
      emergence >= 54 &&
      resilience >= 56 &&
      adaptation >= 52 &&
      auditability >= 54;
    return {
      accepted,
      adaptation,
      auditability,
      emergence,
      resilience,
      trace: runs + 1,
    };
  }, [coupling, diversity, feedback, runs, topology, variation]);

  const reset = () => {
    setStage(2);
    setDiversity(72);
    setFeedback(68);
    setCoupling(54);
    setVariation(46);
    setTopology("hybrid");
    setRuns(0);
  };

  return (
    <section
      className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
      aria-label={title + "复杂系统实验"}
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
          className="inline-flex size-9 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"
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
              ["节点多样性", diversity, setDiversity],
              ["反馈可见度", feedback, setFeedback],
              ["连接耦合度", coupling, setCoupling],
              ["变异探索率", variation, setVariation],
            ].map(([label, value, setter]) => (
              <label className="text-sm" key={String(label)}>
                {String(label) + " " + String(value) + "%"}
                <input
                  className="mt-1 w-full accent-blue-600"
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
            aria-label="控制拓扑"
          >
            {(Object.keys(topologyLabels) as Topology[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setTopology(key)}
                className={
                  "border px-2 py-2 text-xs font-semibold " +
                  (topology === key
                    ? "border-zinc-950 bg-zinc-950 text-white dark:border-white dark:bg-white dark:text-zinc-950"
                    : "border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-900")
                }
              >
                {topologyLabels[key]}
              </button>
            ))}
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {[
              ["涌现能力", result.emergence],
              ["故障韧性", result.resilience],
              ["适应能力", result.adaptation],
              ["证据可审计", result.auditability],
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
            <strong>
              {result.accepted ? "活系统门禁通过" : "活系统门禁拒绝"}
            </strong>
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
            <span aria-hidden="true">▶</span>
            运行并保存证据
          </button>
        </div>
      </div>
    </section>
  );
}
