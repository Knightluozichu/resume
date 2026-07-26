"use client";

import { useMemo, useState } from "react";

type Mode = "architecture" | "runtime" | "release";
type Sample = "baseline" | "boundary" | "failure";
type Props = { title: string; label: string; nodes: readonly string[]; mode: Mode };

const modeLabels: Record<Mode, string> = { architecture: "结构边界", runtime: "运行轨迹", release: "回归签发" };
const sampleLabels: Record<Sample, string> = { baseline: "正常样本", boundary: "边界样本", failure: "失败样本" };
const colors: Record<Mode, { strong: string; soft: string; ink: string }> = {
  architecture: { strong: "#2563eb", soft: "#dbeafe", ink: "#1e3a8a" },
  runtime: { strong: "#059669", soft: "#d1fae5", ink: "#065f46" },
  release: { strong: "#c2410c", soft: "#ffedd5", ink: "#9a3412" },
};

export function LeadProgramEvidenceLab({ title, label, nodes, mode }: Props) {
  const [stage, setStage] = useState(0);
  const [sample, setSample] = useState<Sample>("baseline");
  const [load, setLoad] = useState(40);
  const [fault, setFault] = useState(false);
  function resetExperiment() {
    setStage(0);
    setSample("baseline");
    setLoad(40);
    setFault(false);
  }

  const color = colors[mode];
  const values = useMemo(() => {
    const pressure = sample === "baseline" ? 4 : sample === "boundary" ? 22 : 44;
    const risk = Math.min(100, Math.round(load * 0.42 + pressure + (fault ? 30 : 0)));
    const evidence = Math.max(0, 100 - risk + stage * 4);
    const progress = Math.round(((stage + 1) / Math.max(nodes.length, 1)) * 100);
    return { risk, evidence, progress };
  }, [fault, load, nodes.length, sample, stage]);
  const pass = values.risk < 62 && sample !== "failure" && !fault;

  return (
    <section className="my-6 overflow-hidden border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-950" aria-label={title}>
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 px-4 py-3 dark:border-zinc-700">
        <div className="min-w-0"><p className="text-xs font-semibold text-zinc-500">{label} · {modeLabels[mode]}</p><h3 className="mt-1 text-base font-semibold">{title}</h3></div>
        <button type="button" onClick={() => setFault((value) => !value)} className="min-h-11 border px-3 text-sm font-medium" style={{ borderColor: color.strong, color: color.ink, backgroundColor: fault ? color.soft : "transparent" }}>{fault ? "清除故障" : "注入故障"}</button>
      </header>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="p-4">
          <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="样本选择">{(["baseline", "boundary", "failure"] as const).map((item) => <button key={item} type="button" onClick={() => setSample(item)} className="min-h-11 border px-3 text-xs font-semibold" style={{ borderColor: sample === item ? color.strong : "#d4d4d8", backgroundColor: sample === item ? color.soft : "transparent" }}>{sampleLabels[item]}</button>)}</div>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3" role="tablist" aria-label="主程证据阶段">{nodes.map((node, index) => <button key={node} type="button" role="tab" aria-selected={stage === index} onClick={() => setStage(index)} className="min-h-24 border p-3 text-left text-xs leading-5" style={{ borderColor: stage === index ? color.strong : "#d4d4d8", backgroundColor: index <= stage ? color.soft : "transparent" }}><span className="block text-sm font-bold">{String(index + 1).padStart(2, "0")}</span><span className="mt-2 block break-words">{node}</span></button>)}</div>
          <label className="mt-5 block text-xs font-medium text-zinc-600 dark:text-zinc-300">系统负载 {load}<input type="range" min="10" max="100" step="5" value={load} onChange={(event) => setLoad(Number(event.target.value))} className="mt-2 block w-full" /></label>
          <div className="mt-4 h-3 bg-zinc-200 dark:bg-zinc-800"><div className="h-full transition-[width]" style={{ width: values.progress + "%", backgroundColor: fault ? "#dc2626" : color.strong }} /></div>
        </div>
        <aside className="border-t border-zinc-200 bg-zinc-50 p-4 text-sm lg:border-l lg:border-t-0 dark:border-zinc-700 dark:bg-zinc-900">
          <p className="font-semibold">当前证据</p><dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2"><dt className="text-zinc-500">样本</dt><dd className="text-right">{sampleLabels[sample]}</dd><dt className="text-zinc-500">阶段</dt><dd className="text-right font-mono">{stage + 1}/{nodes.length}</dd><dt className="text-zinc-500">风险</dt><dd className="text-right font-mono">{values.risk}%</dd><dt className="text-zinc-500">证据完整度</dt><dd className="text-right font-mono">{values.evidence}%</dd></dl>
          <div className="mt-4 border-t border-zinc-300 pt-3 dark:border-zinc-700"><p className="text-xs text-zinc-500">当前节点</p><p className="mt-1 break-words font-medium">{nodes[stage]}</p><p className="mt-3 text-xs font-semibold" style={{ color: pass ? "#15803d" : "#b91c1c" }}>{pass ? "阶段门通过：归档后继续" : "阶段门拒绝：回到首个偏离节点"}</p></div>
        </aside>
      </div>
    </section>
  );
}
