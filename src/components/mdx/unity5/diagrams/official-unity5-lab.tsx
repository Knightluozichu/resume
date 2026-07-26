"use client";

import { useMemo, useState } from "react";

type LabMode = "map" | "experiment" | "evidence";
type Props = { title: string; label: string; nodes: readonly string[]; mode: LabMode };

const labels: Record<LabMode, string> = {
  map: "系统地图",
  experiment: "场景实验",
  evidence: "项目证据",
};

type TestMode = "baseline" | "boundary" | "failure";

const testModeLabels: Record<TestMode, string> = {
  baseline: "正常样本",
  boundary: "边界样本",
  failure: "失败样本",
};

const colors: Record<LabMode, { strong: string; soft: string; ink: string }> = {
  map: { strong: "#2563eb", soft: "#dbeafe", ink: "#1e3a8a" },
  experiment: { strong: "#047857", soft: "#d1fae5", ink: "#064e3b" },
  evidence: { strong: "#c2410c", soft: "#ffedd5", ink: "#7c2d12" },
};

export function Unity5EvidenceLab({ title, label, nodes, mode }: Props) {
  const [stage, setStage] = useState(0);
  const [testMode, setTestMode] = useState<TestMode>("baseline");
  const [load, setLoad] = useState(50);
  const [fault, setFault] = useState(false);
  function resetExperiment() {
    setStage(0);
    setTestMode("baseline");
    setLoad(50);
    setFault(false);
  }

  const color = colors[mode];
  const values = useMemo(() => {
    const budget = 16.67;
    const sampleCost = testMode === "baseline" ? 0 : testMode === "boundary" ? 2.2 : 5.2;
    const measured = 6.4 + stage * 1.05 + load * 0.075 + sampleCost + (fault ? 5.2 : 0);
    return { budget, measured, headroom: budget - measured, progress: Math.round(((stage + 1) / nodes.length) * 100) };
  }, [fault, load, nodes.length, stage, testMode]);
  const pass = values.headroom >= 0 && !fault && testMode !== "failure";

  return (
    <section className="my-6 overflow-hidden border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-950" aria-label={title}>
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 px-4 py-3 dark:border-zinc-700">
        <div className="min-w-0"><p className="text-xs font-semibold text-zinc-500">{label} · {labels[mode]}</p><h3 className="mt-1 text-base font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3></div>
        <button type="button" onClick={() => setFault((v) => !v)} className="min-h-11 border px-3 text-sm font-medium" style={{ borderColor: color.strong, color: color.ink, backgroundColor: fault ? color.soft : "transparent" }}>{fault ? "清除故障" : "注入故障"}</button>
      </header>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="p-4">
          <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="测试样本">
            {(["baseline", "boundary", "failure"] as const).map((item) => <button key={item} type="button" onClick={() => setTestMode(item)} className="min-h-11 border px-3 text-xs font-semibold" style={{ borderColor: testMode === item ? color.strong : "#d4d4d8", backgroundColor: testMode === item ? color.soft : "transparent", color: testMode === item ? color.ink : undefined }}>{testModeLabels[item]}</button>)}
          </div>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3" role="tablist" aria-label="证据阶段">
            {nodes.map((node, index) => <button key={node} type="button" role="tab" aria-selected={stage === index} onClick={() => setStage(index)} className="min-h-24 border p-3 text-left text-xs leading-5" style={{ borderColor: stage === index ? color.strong : "#d4d4d8", backgroundColor: index <= stage ? color.soft : "transparent", color: stage === index ? color.ink : undefined }}><span className="block text-sm font-bold">{String(index + 1).padStart(2, "0")}</span><span className="mt-2 block break-words">{node}</span></button>)}
          </div>
          <label className="mt-5 block text-xs font-medium text-zinc-600 dark:text-zinc-300">工作负载 {load}%<input type="range" min="10" max="100" step="5" value={load} onChange={(event) => setLoad(Number(event.target.value))} className="mt-2 block w-full" /></label>
          <div className="mt-4 h-3 bg-zinc-200 dark:bg-zinc-800" aria-label={`阶段完成度 ${values.progress}%`}><div className="h-full transition-[width]" style={{ width: `${values.progress}%`, backgroundColor: fault ? "#dc2626" : color.strong }} /></div>
        </div>
        <aside className="border-t border-zinc-200 bg-zinc-50 p-4 text-sm lg:border-l lg:border-t-0 dark:border-zinc-700 dark:bg-zinc-900">
          <p className="font-semibold text-zinc-900 dark:text-zinc-100">当前证据</p>
          <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2"><dt className="text-zinc-500">样本</dt><dd className="text-right font-medium">{testModeLabels[testMode]}</dd><dt className="text-zinc-500">阶段</dt><dd className="text-right font-mono">{stage + 1}/{nodes.length}</dd><dt className="text-zinc-500">测量</dt><dd className="text-right font-mono">{values.measured.toFixed(2)} ms</dd><dt className="text-zinc-500">预算</dt><dd className="text-right font-mono">{values.budget.toFixed(2)} ms</dd><dt className="text-zinc-500">余量</dt><dd className="text-right font-mono">{values.headroom.toFixed(2)} ms</dd></dl>
          <div className="mt-4 border-t border-zinc-300 pt-3 dark:border-zinc-700"><p className="text-xs text-zinc-500">当前节点</p><p className="mt-1 break-words font-medium text-zinc-900 dark:text-zinc-100">{nodes[stage]}</p><p className="mt-3 text-xs font-semibold" style={{ color: pass ? "#15803d" : "#b91c1c" }}>{pass ? "阶段门通过：保存证据后继续" : "阶段门拒绝：回到首个异常节点"}</p></div>
        </aside>
      </div>
    </section>
  );
}
