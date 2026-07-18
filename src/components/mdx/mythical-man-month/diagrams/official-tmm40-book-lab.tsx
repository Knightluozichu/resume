"use client";

import { useMemo, useState } from "react";

type LabMode = "dependency" | "schedule" | "evidence";
type Scenario = "normal" | "boundary" | "fault";

type Props = {
  unitId: string;
  title: string;
  nodes: readonly string[];
  focuses: readonly string[];
  mode: LabMode;
};

const scenarios: Record<Scenario, string> = {
  normal: "正常",
  boundary: "恰好边界",
  fault: "单故障",
};

const modes: Record<LabMode, string> = {
  dependency: "依赖追踪",
  schedule: "进度实验",
  evidence: "证据门禁",
};

export function OfficialTmm40BookLab({
  unitId,
  title,
  nodes,
  focuses,
  mode,
}: Props) {
  const [stage, setStage] = useState(2);
  const [people, setPeople] = useState(7);
  const [coupling, setCoupling] = useState(36);
  const [reserve, setReserve] = useState(24);
  const [scenario, setScenario] = useState<Scenario>("normal");
  const [run, setRun] = useState(0);

  const result = useMemo(() => {
    const channels = (people * (people - 1)) / 2;
    const scenarioPenalty =
      scenario === "normal" ? 0 : scenario === "boundary" ? 14 : 36;
    const coordination = Math.min(
      100,
      Math.round(channels * 0.55 + coupling * 0.42 + scenarioPenalty),
    );
    const forecast = Math.round(
      34 +
        stage * 3 +
        coupling * 0.18 +
        channels * 0.12 +
        scenarioPenalty * 0.7,
    );
    const evidence = Math.max(
      0,
      Math.round(100 - coordination * 0.36 + reserve * 0.24 - scenarioPenalty),
    );
    const accepted =
      scenario !== "fault" &&
      coordination <= 62 &&
      forecast <= 62 + reserve * 0.25 &&
      evidence >= 68;
    return {
      accepted,
      channels,
      coordination,
      evidence,
      forecast,
      trace: run + 1,
    };
  }, [coupling, people, reserve, run, scenario, stage]);

  const reset = () => {
    setStage(2);
    setPeople(7);
    setCoupling(36);
    setReserve(24);
    setScenario("normal");
    setRun(0);
  };

  return (
    <section
      className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
      aria-label={title + "交互实验"}
    >
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            {unitId} · {modes[mode]}
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

      <div className="grid lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
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
              团队人数 {people}
              <input
                className="mt-1 w-full accent-blue-600"
                type="range"
                min="2"
                max="24"
                value={people}
                onChange={(event) => setPeople(Number(event.target.value))}
              />
            </label>
            <label className="text-sm">
              任务耦合 {coupling}%
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
              进度余量 {reserve}%
              <input
                className="mt-1 w-full accent-emerald-600"
                type="range"
                min="0"
                max="60"
                value={reserve}
                onChange={(event) => setReserve(Number(event.target.value))}
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
            {(Object.keys(scenarios) as Scenario[]).map((key) => (
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
                {scenarios[key]}
              </button>
            ))}
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
            <div className="border border-zinc-200 p-2 dark:border-zinc-800">
              <dt className="text-zinc-500">沟通通道</dt>
              <dd className="mt-1 text-lg font-semibold">{result.channels}</dd>
            </div>
            <div className="border border-zinc-200 p-2 dark:border-zinc-800">
              <dt className="text-zinc-500">协调负担</dt>
              <dd className="mt-1 text-lg font-semibold">
                {result.coordination}%
              </dd>
            </div>
            <div className="border border-zinc-200 p-2 dark:border-zinc-800">
              <dt className="text-zinc-500">预测周期</dt>
              <dd className="mt-1 text-lg font-semibold">
                {result.forecast} 天
              </dd>
            </div>
            <div className="border border-zinc-200 p-2 dark:border-zinc-800">
              <dt className="text-zinc-500">证据覆盖</dt>
              <dd className="mt-1 text-lg font-semibold">{result.evidence}%</dd>
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
              首查：{focuses[Math.min(stage, focuses.length - 1)]}；轨迹 #
              {result.trace}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setRun((value) => value + 1)}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded bg-blue-700 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-800"
          >
            <span aria-hidden="true">▶</span>运行并保存证据
          </button>
        </div>
      </div>
    </section>
  );
}
