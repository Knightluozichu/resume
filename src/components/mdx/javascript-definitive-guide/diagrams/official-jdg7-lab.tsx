"use client";

import { useMemo, useState } from "react";

type Mode = "map" | "experiment" | "evidence";
type Sample = "normal" | "boundary" | "failure" | "recovery";
type Props = { title: string; label: string; nodes: readonly string[]; mode: Mode };

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

export function Jdg7MechanismLab({ title, label, nodes, mode }: Props) {
  const [stage, setStage] = useState(0);
  const [sample, setSample] = useState<Sample>("normal");
  const [events, setEvents] = useState(24);
  const [fault, setFault] = useState(false);
  const color = colors[mode];
  const evidence = useMemo(() => {
    const pressure = sample === "normal" ? 0 : sample === "boundary" ? 12 : sample === "failure" ? 38 : 4;
    const pending = Math.round(events / 8 + pressure + stage * 2 + (fault ? 24 : 0));
    const duration = Math.round(5 + events / 4 + pressure * 0.8 + stage * 2 + (fault ? 32 : 0));
    const retained = Math.round(events / 12 + pressure / 4 + (fault ? 10 : 0));
    const divergence = sample === "failure" || fault ? nodes[Math.min(stage, nodes.length - 1)] : "无";
    return { pending, duration, retained, divergence };
  }, [events, fault, nodes, sample, stage]);
  const pass = evidence.pending <= 48 && evidence.duration <= 60 && evidence.divergence === "无";

  return (
    <section className="my-6 overflow-hidden border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-950" aria-label={title}>
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 px-4 py-3 dark:border-zinc-700">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-zinc-500">{label} · {modeLabels[mode]}</p>
          <h3 className="mt-1 text-base font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
        </div>
        <button type="button" onClick={() => setFault((value) => !value)} className="min-h-9 border px-3 text-sm font-medium" style={{ borderColor: fault ? "#dc2626" : color.strong, color: fault ? "#991b1b" : color.ink, backgroundColor: fault ? "#fee2e2" : "transparent" }}>
          {fault ? "清除故障" : "注入故障"}
        </button>
      </header>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="p-4">
          <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="样本选择">
            {(["normal", "boundary", "failure", "recovery"] as const).map((item) => (
              <button key={item} type="button" onClick={() => setSample(item)} className="min-h-9 border px-3 text-xs font-semibold" style={{ borderColor: sample === item ? color.strong : "#d4d4d8", backgroundColor: sample === item ? color.soft : "transparent", color: sample === item ? color.ink : undefined }}>
                {sampleLabels[item]}
              </button>
            ))}
          </div>
          <ol className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {nodes.map((node, index) => {
              const active = index === stage;
              const complete = index < stage;
              return (
                <li key={node}>
                  <button type="button" onClick={() => setStage(index)} className="flex min-h-20 w-full items-start gap-3 border p-3 text-left" style={{ borderColor: active ? color.strong : "#d4d4d8", backgroundColor: active ? color.soft : "transparent" }}>
                    <span className="flex size-6 shrink-0 items-center justify-center border text-xs font-bold" style={{ borderColor: color.strong, color: color.ink }}>{index + 1}</span>
                    <span className="min-w-0 text-sm font-medium text-zinc-800 dark:text-zinc-200">{node}<span className="mt-1 block text-xs font-normal text-zinc-500">{active ? "当前观察点" : complete ? "已通过" : "待执行"}</span></span>
                  </button>
                </li>
              );
            })}
          </ol>
          <label className="mt-5 block text-xs font-semibold text-zinc-600 dark:text-zinc-300">
            事件压力：{events}
            <input type="range" min="8" max="160" step="8" value={events} onChange={(event) => setEvents(Number(event.target.value))} className="mt-2 block w-full" />
          </label>
        </div>
        <aside className="border-t border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900 lg:border-l lg:border-t-0">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">证据摘要</h4>
            <span className="border px-2 py-1 text-xs font-bold" style={{ borderColor: pass ? "#16a34a" : "#dc2626", color: pass ? "#166534" : "#991b1b", backgroundColor: pass ? "#dcfce7" : "#fee2e2" }}>{pass ? "通过" : "阻断"}</span>
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="border border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-950"><dt className="text-xs text-zinc-500">待处理事件</dt><dd className="mt-1 text-lg font-semibold">{evidence.pending}</dd></div>
            <div className="border border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-950"><dt className="text-xs text-zinc-500">耗时预算</dt><dd className="mt-1 text-lg font-semibold">{evidence.duration} ms</dd></div>
            <div className="border border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-950"><dt className="text-xs text-zinc-500">残留资源</dt><dd className="mt-1 text-lg font-semibold">{evidence.retained}</dd></div>
            <div className="border border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-950"><dt className="text-xs text-zinc-500">首偏离点</dt><dd className="mt-1 break-words font-semibold">{evidence.divergence}</dd></div>
          </dl>
          <p className="mt-4 text-xs leading-5 text-zinc-600 dark:text-zinc-300">切换样本、阶段和压力，比较输出相同但值、控制流、任务或资源轨迹不同的情况。恢复样本只有在清除故障后才可签发。</p>
        </aside>
      </div>
    </section>
  );
}
