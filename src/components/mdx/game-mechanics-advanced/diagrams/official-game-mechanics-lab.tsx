"use client";

import { useMemo, useState } from "react";

type LabMode = "map" | "experiment" | "evidence";
type Sample = "baseline" | "boundary" | "failure";
type Props = {
  title: string;
  label: string;
  nodes: readonly string[];
  mode: LabMode;
};

const modeLabels: Record<LabMode, string> = {
  map: "机制地图",
  experiment: "反例实验",
  evidence: "签发证据",
};

const sampleLabels: Record<Sample, string> = {
  baseline: "正常样本",
  boundary: "边界样本",
  failure: "失败样本",
};

const colors: Record<LabMode, { strong: string; soft: string; ink: string }> = {
  map: { strong: "#1d4ed8", soft: "#dbeafe", ink: "#1e3a8a" },
  experiment: { strong: "#047857", soft: "#d1fae5", ink: "#064e3b" },
  evidence: { strong: "#b45309", soft: "#fef3c7", ink: "#78350f" },
};

export function GameMechanicsEvidenceLab({ title, label, nodes, mode }: Props) {
  const [stage, setStage] = useState(0);
  const [sample, setSample] = useState<Sample>("baseline");
  const [input, setInput] = useState(50);
  const [fault, setFault] = useState(false);
  const color = colors[mode];
  const values = useMemo(() => {
    const sampleGain = sample === "baseline" ? 1 : sample === "boundary" ? 1.35 : 1.8;
    const observed = (input * 0.12 + (stage + 1) * 1.4) * sampleGain + (fault ? 8 : 0);
    const limit = 18;
    const headroom = limit - observed;
    const progress = Math.round(((stage + 1) / Math.max(nodes.length, 1)) * 100);
    return { observed, limit, headroom, progress };
  }, [fault, input, nodes.length, sample, stage]);
  const pass = values.headroom >= 0 && sample !== "failure" && !fault;

  return (
    <section className="my-6 overflow-hidden border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-950" aria-label={title}>
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 px-4 py-3 dark:border-zinc-700">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-zinc-500">{label} · {modeLabels[mode]}</p>
          <h3 className="mt-1 text-base font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
        </div>
        <button type="button" onClick={() => setFault((value) => !value)} className="min-h-9 border px-3 text-sm font-medium" style={{ borderColor: color.strong, color: color.ink, backgroundColor: fault ? color.soft : "transparent" }}>
          {fault ? "清除故障" : "注入故障"}
        </button>
      </header>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="p-4">
          <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="样本模式">
            {(["baseline", "boundary", "failure"] as const).map((item) => (
              <button key={item} type="button" onClick={() => setSample(item)} className="min-h-9 border px-3 text-xs font-semibold" style={{ borderColor: sample === item ? color.strong : "#d4d4d8", backgroundColor: sample === item ? color.soft : "transparent", color: sample === item ? color.ink : undefined }}>
                {sampleLabels[item]}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3" role="tablist" aria-label="机制证据阶段">
            {nodes.map((node, index) => (
              <button key={node} type="button" role="tab" aria-selected={stage === index} onClick={() => setStage(index)} className="min-h-24 border p-3 text-left text-xs leading-5" style={{ borderColor: stage === index ? color.strong : "#d4d4d8", backgroundColor: index <= stage ? color.soft : "transparent", color: stage === index ? color.ink : undefined }}>
                <span className="block text-sm font-bold">{String(index + 1).padStart(2, "0")}</span>
                <span className="mt-2 block break-words">{node}</span>
              </button>
            ))}
          </div>
          <label className="mt-5 block text-xs font-medium text-zinc-600 dark:text-zinc-300">
            输入强度 {input}
            <input type="range" min="10" max="100" step="5" value={input} onChange={(event) => setInput(Number(event.target.value))} className="mt-2 block w-full" />
          </label>
          <div className="mt-4 h-3 bg-zinc-200 dark:bg-zinc-800" aria-label={`阶段完成度 ${values.progress}%`}>
            <div className="h-full transition-[width]" style={{ width: `${values.progress}%`, backgroundColor: fault ? "#dc2626" : color.strong }} />
          </div>
        </div>
        <aside className="border-t border-zinc-200 bg-zinc-50 p-4 text-sm lg:border-l lg:border-t-0 dark:border-zinc-700 dark:bg-zinc-900">
          <p className="font-semibold text-zinc-900 dark:text-zinc-100">当前证据</p>
          <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2">
            <dt className="text-zinc-500">样本</dt><dd className="text-right font-medium">{sampleLabels[sample]}</dd>
            <dt className="text-zinc-500">阶段</dt><dd className="text-right font-mono">{stage + 1}/{nodes.length}</dd>
            <dt className="text-zinc-500">观测值</dt><dd className="text-right font-mono">{values.observed.toFixed(2)}</dd>
            <dt className="text-zinc-500">上限</dt><dd className="text-right font-mono">{values.limit.toFixed(2)}</dd>
            <dt className="text-zinc-500">余量</dt><dd className="text-right font-mono">{values.headroom.toFixed(2)}</dd>
          </dl>
          <div className="mt-4 border-t border-zinc-300 pt-3 dark:border-zinc-700">
            <p className="text-xs text-zinc-500">当前节点</p>
            <p className="mt-1 break-words font-medium text-zinc-900 dark:text-zinc-100">{nodes[stage]}</p>
            <p className="mt-3 text-xs font-semibold" style={{ color: pass ? "#15803d" : "#b91c1c" }}>
              {pass ? "阶段门通过：保存轨迹后继续" : "阶段门拒绝：回到首个偏离节点"}
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
