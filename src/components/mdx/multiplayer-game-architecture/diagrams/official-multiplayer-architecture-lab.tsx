"use client";

import { useMemo, useState } from "react";

type Mode = "map" | "experiment" | "evidence";
type Sample = "baseline" | "boundary" | "failure";
type Props = {
  title: string;
  label: string;
  nodes: readonly string[];
  mode: Mode;
};

const modeLabels: Record<Mode, string> = {
  map: "架构地图",
  experiment: "故障实验",
  evidence: "签发证据",
};
const sampleLabels: Record<Sample, string> = {
  baseline: "正常",
  boundary: "边界",
  failure: "失败",
};
const colors: Record<Mode, { strong: string; soft: string; ink: string }> = {
  map: { strong: "#2563eb", soft: "#dbeafe", ink: "#1e3a8a" },
  experiment: { strong: "#059669", soft: "#d1fae5", ink: "#065f46" },
  evidence: { strong: "#ca8a04", soft: "#fef9c3", ink: "#713f12" },
};

export function MultiplayerArchitectureEvidenceLab({
  title,
  label,
  nodes,
  mode,
}: Props) {
  const [stage, setStage] = useState(0);
  const [sample, setSample] = useState<Sample>("baseline");
  const [actors, setActors] = useState(240);
  const [fault, setFault] = useState(false);
  function resetExperiment() {
    setStage(0);
    setSample("baseline");
    setActors(240);
    setFault(false);
  }

  const color = colors[mode];
  const evidence = useMemo(() => {
    const pressure =
      sample === "baseline" ? 0 : sample === "boundary" ? 23 : 58;
    const mailbox = Math.round(
      actors / 60 + pressure + stage * 4 + (fault ? 36 : 0),
    );
    const latency = Math.round(
      8 + actors / 90 + pressure * 0.9 + stage * 3 + (fault ? 47 : 0),
    );
    const divergence =
      sample === "failure" || fault
        ? nodes[Math.min(stage, nodes.length - 1)]
        : "无";
    return { mailbox, latency, divergence };
  }, [actors, fault, nodes, sample, stage]);
  const pass =
    evidence.mailbox <= 96 &&
    evidence.latency <= 120 &&
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
          {fault ? "清除故障" : "注入故障"}
        </button>
      </header>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_290px]">
        <div className="p-4">
          <div
            className="mb-4 flex flex-wrap gap-2"
            role="group"
            aria-label="样本选择"
          >
            {(["baseline", "boundary", "failure"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setSample(item)}
                className="min-h-11 border px-3 text-xs font-semibold"
                style={{
                  borderColor: sample === item ? color.strong : "#d4d4d8",
                  backgroundColor: sample === item ? color.soft : "transparent",
                  color: sample === item ? color.ink : undefined,
                }}
              >
                {sampleLabels[item]}
              </button>
            ))}
          </div>
          <div
            className="grid grid-cols-2 gap-2 md:grid-cols-3"
            role="tablist"
            aria-label="框架证据阶段"
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
            活动Actor/连接 {actors}
            <input
              type="range"
              min="60"
              max="1200"
              step="60"
              value={actors}
              onChange={(event) => setActors(Number(event.target.value))}
              className="mt-2 block w-full"
            />
          </label>
          <div
            className="mt-4 h-3 bg-zinc-200 dark:bg-zinc-800"
            aria-label={
              "阶段完成度 " +
              Math.round(((stage + 1) / nodes.length) * 100) +
              "%"
            }
          >
            <div
              className="h-full transition-[width]"
              style={{
                width: ((stage + 1) / nodes.length) * 100 + "%",
                backgroundColor: pass ? color.strong : "#dc2626",
              }}
            />
          </div>
        </div>
        <aside className="border-t border-zinc-200 bg-zinc-50 p-4 text-sm lg:border-l lg:border-t-0 dark:border-zinc-700 dark:bg-zinc-900">
          <p className="font-semibold text-zinc-900 dark:text-zinc-100">
            当前证据
          </p>
          <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2">
            <dt className="text-zinc-500">样本</dt>
            <dd className="text-right font-medium">{sampleLabels[sample]}</dd>
            <dt className="text-zinc-500">阶段</dt>
            <dd className="text-right font-mono">
              {stage + 1}/{nodes.length}
            </dd>
            <dt className="text-zinc-500">邮箱/队列</dt>
            <dd className="text-right font-mono">{evidence.mailbox}/96</dd>
            <dt className="text-zinc-500">P99</dt>
            <dd className="text-right font-mono">{evidence.latency} ms</dd>
          </dl>
          <div className="mt-4 border-t border-zinc-300 pt-3 dark:border-zinc-700">
            <p className="text-xs text-zinc-500">首偏离节点</p>
            <p className="mt-1 break-words font-medium text-zinc-900 dark:text-zinc-100">
              {evidence.divergence}
            </p>
            <p
              className="mt-3 text-xs font-semibold"
              style={{ color: pass ? "#15803d" : "#b91c1c" }}
            >
              {pass ? "阶段门通过：保存轨迹" : "阶段门拒绝：检查所有权与代际"}
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
