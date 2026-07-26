"use client";

import { useMemo, useState } from "react";

type Mode = "map" | "experiment" | "evidence";
type Sample = "normal" | "boundary" | "failure" | "recovery";
type Props = {
  title: string;
  label: string;
  nodes: readonly string[];
  mode: Mode;
};
const modeLabels: Record<Mode, string> = {
  map: "机制地图",
  experiment: "运行时实验",
  evidence: "恢复证据",
};
const sampleLabels: Record<Sample, string> = {
  normal: "正常",
  boundary: "边界",
  failure: "失败",
  recovery: "恢复",
};
const colors: Record<Mode, { strong: string; soft: string; ink: string }> = {
  map: { strong: "#2563eb", soft: "#dbeafe", ink: "#1e3a8a" },
  experiment: { strong: "#059669", soft: "#d1fae5", ink: "#065f46" },
  evidence: { strong: "#ca8a04", soft: "#fef9c3", ink: "#713f12" },
};

export function JavaScriptProGuideEvidenceLab({
  title,
  label,
  nodes,
  mode,
}: Props) {
  const [stage, setStage] = useState(0);
  const [sample, setSample] = useState<Sample>("normal");
  const [operations, setOperations] = useState(120);
  const [fault, setFault] = useState(false);
  function resetExperiment() {
    setStage(0);
    setSample("normal");
    setOperations(120);
    setFault(false);
  }

  const color = colors[mode];
  const evidence = useMemo(() => {
    const pressure =
      sample === "normal"
        ? 0
        : sample === "boundary"
          ? 20
          : sample === "failure"
            ? 58
            : 7;
    const tasks = Math.round(
      operations / 30 + pressure + stage * 2 + (fault ? 34 : 0),
    );
    const duration = Math.round(
      4 + operations / 25 + pressure * 0.7 + stage * 2 + (fault ? 47 : 0),
    );
    const retained = Math.round(
      operations / 60 + pressure / 4 + (fault ? 18 : 0),
    );
    const divergence =
      sample === "failure" || fault
        ? nodes[Math.min(stage, nodes.length - 1)]
        : "无";
    const recovered = sample === "recovery" && !fault;
    return { tasks, duration, retained, divergence, recovered };
  }, [fault, nodes, operations, sample, stage]);
  const pass =
    evidence.tasks <= 80 &&
    evidence.duration <= 55 &&
    evidence.divergence === "无";
  return (
    <section
      className="my-6 overflow-hidden border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-950"
      aria-label={title}
    >
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 px-4 py-3 dark:border-zinc-700">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-zinc-500">
            {label} · {modeLabels[mode]}
          </p>
          <h3 className="mt-1 text-base font-semibold text-zinc-900 dark:text-zinc-100">
            {title}
          </h3>
        </div>
        <button
          type="button"
          onClick={() => setFault((value) => !value)}
          className="min-h-11 border px-3 text-sm font-medium"
          style={{
            borderColor: fault ? "#dc2626" : color.strong,
            color: fault ? "#991b1b" : color.ink,
            backgroundColor: fault ? "#fee2e2" : "transparent",
          }}
        >
          {fault ? "清除运行故障" : "注入运行故障"}
        </button>
      </header>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="p-4">
          <div
            className="mb-4 flex flex-wrap gap-2"
            role="group"
            aria-label="样本选择"
          >
            {(["normal", "boundary", "failure", "recovery"] as const).map(
              (item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSample(item)}
                  className="min-h-11 border px-3 text-xs font-semibold"
                  style={{
                    borderColor: sample === item ? color.strong : "#d4d4d8",
                    backgroundColor:
                      sample === item ? color.soft : "transparent",
                    color: sample === item ? color.ink : undefined,
                  }}
                >
                  {sampleLabels[item]}
                </button>
              ),
            )}
          </div>
          <div
            className="grid grid-cols-2 gap-2 md:grid-cols-3"
            role="tablist"
            aria-label="执行证据阶段"
          >
            {nodes.map((node, index) => (
              <button
                key={node}
                type="button"
                role="tab"
                aria-selected={stage === index}
                onClick={() => setStage(index)}
                className="min-h-24 border p-3 text-left text-xs leading-5"
                style={{
                  borderColor: stage === index ? color.strong : "#d4d4d8",
                  backgroundColor: index <= stage ? color.soft : "transparent",
                  color: stage === index ? color.ink : undefined,
                }}
              >
                <span className="block text-sm font-bold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-2 block break-words">{node}</span>
              </button>
            ))}
          </div>
          <label className="mt-5 block text-xs font-medium text-zinc-600 dark:text-zinc-300">
            操作数量 {operations}
            <input
              type="range"
              min="30"
              max="1200"
              step="30"
              value={operations}
              onChange={(event) => setOperations(Number(event.target.value))}
              className="mt-2 block w-full"
            />
          </label>
        </div>
        <aside className="border-t border-zinc-200 p-4 lg:border-l lg:border-t-0 dark:border-zinc-700">
          <p className="text-xs font-semibold text-zinc-500">当前运行证据</p>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-zinc-500">待处理任务</dt>
              <dd className="font-semibold">{evidence.tasks}</dd>
            </div>
            <div>
              <dt className="text-zinc-500">主线程耗时</dt>
              <dd className="font-semibold">{evidence.duration} ms</dd>
            </div>
            <div>
              <dt className="text-zinc-500">保留资源</dt>
              <dd className="font-semibold">{evidence.retained}</dd>
            </div>
            <div>
              <dt className="text-zinc-500">恢复重放</dt>
              <dd className="font-semibold">
                {evidence.recovered ? "已收敛" : "待验证"}
              </dd>
            </div>
            <div className="col-span-2">
              <dt className="text-zinc-500">首偏离点</dt>
              <dd className="font-semibold">{evidence.divergence}</dd>
            </div>
          </dl>
          <p
            className="mt-4 border p-3 text-sm font-semibold"
            style={{
              borderColor: pass ? "#16a34a" : "#dc2626",
              color: pass ? "#166534" : "#991b1b",
              backgroundColor: pass ? "#dcfce7" : "#fee2e2",
            }}
          >
            {pass ? "当前样本通过" : "当前样本拒绝签发"}
          </p>
        </aside>
      </div>
    </section>
  );
}
