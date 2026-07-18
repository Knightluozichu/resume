"use client";

import { useMemo, useState } from "react";

type Mode = "composition" | "representation" | "evidence";
type Scenario = "normal" | "boundary" | "fault";
type Props = {
  unitId: string;
  title: string;
  nodes: readonly string[];
  focuses: readonly string[];
  mode: Mode;
};
const modeNames: Record<Mode, string> = {
  composition: "组合拓扑",
  representation: "表示实验",
  evidence: "证据门禁",
};
const scenarioNames: Record<Scenario, string> = {
  normal: "正常",
  boundary: "恰好边界",
  fault: "单故障",
};

export function OfficialTaoupLab({
  unitId,
  title,
  nodes,
  focuses,
  mode,
}: Props) {
  const [stage, setStage] = useState(2);
  const [modules, setModules] = useState(7);
  const [interfaceWidth, setInterfaceWidth] = useState(24);
  const [textRatio, setTextRatio] = useState(82);
  const [evidence, setEvidence] = useState(86);
  const [scenario, setScenario] = useState<Scenario>("normal");
  const [runs, setRuns] = useState(0);
  const result = useMemo(() => {
    const penalty =
      scenario === "normal" ? 0 : scenario === "boundary" ? 18 : 44;
    const coupling = Math.min(
      100,
      Math.round(modules * 2.4 + interfaceWidth * 0.72 + penalty),
    );
    const glue = Math.min(
      100,
      Math.round(
        interfaceWidth * 1.2 + (100 - textRatio) * 0.35 + penalty * 0.7,
      ),
    );
    const diagnosis = Math.max(
      0,
      Math.round(
        evidence * 0.72 + textRatio * 0.28 - coupling * 0.34 - penalty * 0.25,
      ),
    );
    const portability = Math.max(
      0,
      Math.round(100 - interfaceWidth * 0.6 - glue * 0.24 - penalty * 0.45),
    );
    const accepted =
      scenario !== "fault" &&
      coupling <= 62 &&
      glue <= 58 &&
      diagnosis >= 55 &&
      portability >= 55;
    return {
      accepted,
      coupling,
      glue,
      diagnosis,
      portability,
      trace: runs + 1,
    };
  }, [evidence, interfaceWidth, modules, runs, scenario, textRatio]);
  const reset = () => {
    setStage(2);
    setModules(7);
    setInterfaceWidth(24);
    setTextRatio(82);
    setEvidence(86);
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
              模块数量 {modules}
              <input
                className="mt-1 w-full accent-blue-600"
                type="range"
                min="2"
                max="24"
                value={modules}
                onChange={(event) => setModules(Number(event.target.value))}
              />
            </label>
            <label className="text-sm">
              接口宽度 {interfaceWidth}
              <input
                className="mt-1 w-full accent-rose-600"
                type="range"
                min="2"
                max="80"
                value={interfaceWidth}
                onChange={(event) =>
                  setInterfaceWidth(Number(event.target.value))
                }
              />
            </label>
            <label className="text-sm">
              文本表示 {textRatio}%
              <input
                className="mt-1 w-full accent-amber-600"
                type="range"
                min="0"
                max="100"
                value={textRatio}
                onChange={(event) => setTextRatio(Number(event.target.value))}
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
              <dt className="text-zinc-500">结构耦合</dt>
              <dd className="mt-1 text-lg font-semibold">{result.coupling}%</dd>
            </div>
            <div className="border border-zinc-200 p-2 dark:border-zinc-800">
              <dt className="text-zinc-500">胶合负担</dt>
              <dd className="mt-1 text-lg font-semibold">{result.glue}%</dd>
            </div>
            <div className="border border-zinc-200 p-2 dark:border-zinc-800">
              <dt className="text-zinc-500">诊断能力</dt>
              <dd className="mt-1 text-lg font-semibold">
                {result.diagnosis}%
              </dd>
            </div>
            <div className="border border-zinc-200 p-2 dark:border-zinc-800">
              <dt className="text-zinc-500">移植余量</dt>
              <dd className="mt-1 text-lg font-semibold">
                {result.portability}%
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
