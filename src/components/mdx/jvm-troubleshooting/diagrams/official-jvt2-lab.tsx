"use client";

import { useMemo, useState } from "react";

type Mode = "investigation" | "timeline" | "evidence";

type OfficialJvt2LabProps = {
  mode: Mode;
  unitTitle: string;
  focus: string;
  nodes: string[];
};

const evidenceLabels = ["版本化基线", "竞争假设", "原始信号", "故障反例", "修复与恢复"];

export function OfficialJvt2Lab({ mode, unitTitle, focus, nodes }: OfficialJvt2LabProps) {
  const [selected, setSelected] = useState(0);
  const [probe, setProbe] = useState(35);
  const [failure, setFailure] = useState(false);
  const [checked, setChecked] = useState([true, false, false, false, false]);
  const visibleNodes = nodes.slice(0, 12);
  const score = useMemo(() => checked.filter(Boolean).length * 20, [checked]);
  const signal = Math.round(28 + probe * 1.7 + (failure ? 125 : 0));
  const confidence = Math.max(5, Math.round(92 - probe * 0.45 - (failure ? 24 : 0)));

  if (mode === "investigation") {
    return (
      <section className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50" aria-label={unitTitle + "假设地图"}>
        <header className="border-b border-zinc-200 bg-emerald-50 px-4 py-3 dark:border-zinc-800 dark:bg-emerald-950/40">
          <p className="m-0 text-xs font-semibold uppercase text-emerald-800 dark:text-emerald-300">Investigation map</p>
          <h3 className="m-0 mt-1 text-base font-bold">{unitTitle}</h3>
        </header>
        <div className="grid min-h-[290px] md:grid-cols-[minmax(0,1.2fr)_minmax(230px,0.8fr)]">
          <div className="grid content-start grid-cols-1 gap-2 border-b border-zinc-200 p-4 sm:grid-cols-2 md:border-b-0 md:border-r dark:border-zinc-800">
            {visibleNodes.map((node, index) => (
              <button key={node} type="button" onClick={() => setSelected(index)} className={"min-h-12 rounded border px-3 py-2 text-left text-xs font-medium transition-colors " + (selected === index ? "border-emerald-700 bg-emerald-700 text-white" : "border-zinc-300 bg-zinc-50 text-zinc-800 hover:border-emerald-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100")} aria-pressed={selected === index}>
                <span className="mr-2 font-mono">{String(index + 1).padStart(2, "0")}</span>{node}
              </button>
            ))}
          </div>
          <div className="p-4">
            <p className="m-0 text-xs font-semibold text-rose-700 dark:text-rose-300">当前证据问题</p>
            <p className="mt-2 min-h-12 text-sm font-bold">{visibleNodes[selected] ?? unitTitle}</p>
            <p className="mt-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300">{focus}</p>
            <p className="mt-4 border-l-4 border-amber-500 pl-3 text-xs leading-5 text-zinc-600 dark:text-zinc-400">先写能推翻假设的观察，再选择工具；命中热点不等于找到根因。</p>
          </div>
        </div>
      </section>
    );
  }

  if (mode === "timeline") {
    return (
      <section className="my-6 rounded-md border border-zinc-300 bg-white p-4 text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50" aria-label={unitTitle + "时间线实验"}>
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-zinc-200 pb-3 dark:border-zinc-800">
          <div><p className="m-0 text-xs font-semibold text-cyan-700 dark:text-cyan-300">Timeline experiment</p><h3 className="m-0 mt-1 text-base font-bold">探针扰动与故障对照</h3></div>
          <button type="button" onClick={() => setFailure((value) => !value)} className={"min-h-10 rounded border px-3 text-sm font-semibold " + (failure ? "border-rose-700 bg-rose-700 text-white" : "border-zinc-300 bg-zinc-50 text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100")} aria-pressed={failure}>{failure ? "故障对照开启" : "开启故障对照"}</button>
        </div>
        <label className="mt-4 block text-sm font-medium" htmlFor={unitTitle + "-probe"}>探针强度：{probe}%</label>
        <input id={unitTitle + "-probe"} className="mt-2 w-full accent-cyan-700" type="range" min="5" max="95" value={probe} onChange={(event) => setProbe(Number(event.target.value))} />
        <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded border border-zinc-300 bg-zinc-300 dark:border-zinc-700 dark:bg-zinc-700">
          <div className="bg-white p-3 dark:bg-zinc-950"><p className="m-0 text-xs text-zinc-500">观测信号</p><p className="m-0 mt-1 text-xl font-bold text-rose-700 dark:text-rose-300">{signal} units</p></div>
          <div className="bg-white p-3 dark:bg-zinc-950"><p className="m-0 text-xs text-zinc-500">低扰动置信</p><p className="m-0 mt-1 text-xl font-bold text-emerald-700 dark:text-emerald-300">{confidence}%</p></div>
        </div>
        <p className="mt-4 text-sm leading-6 text-zinc-700 dark:text-zinc-300">{focus}</p>
        <p className="mt-2 text-xs leading-5 text-zinc-600 dark:text-zinc-400">数值仅展示探针与故障条件的比较关系，不代表真实JVM测量；正式结论必须来自固定工作量的重复实验。</p>
      </section>
    );
  }

  return (
    <section className="my-6 rounded-md border border-zinc-300 bg-white p-4 text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50" aria-label={unitTitle + "证据门"}>
      <div className="flex items-center justify-between gap-3"><div><p className="m-0 text-xs font-semibold text-violet-700 dark:text-violet-300">Evidence gate</p><h3 className="m-0 mt-1 text-base font-bold">调查闭环完整度</h3></div><output className="min-w-16 rounded border border-zinc-300 px-3 py-2 text-center text-lg font-bold dark:border-zinc-700">{score}%</output></div>
      <div className="mt-4 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
        {evidenceLabels.map((label, index) => (
          <button key={label} type="button" onClick={() => setChecked((current) => current.map((value, item) => item === index ? !value : value))} className="flex min-h-11 w-full items-center justify-between gap-3 px-2 text-left text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900" aria-pressed={checked[index]}>
            <span>{label}</span><span className={"inline-flex h-6 w-6 items-center justify-center rounded border font-bold " + (checked[index] ? "border-emerald-700 bg-emerald-700 text-white" : "border-zinc-400 text-transparent")}>✓</span>
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm leading-6 text-zinc-700 dark:text-zinc-300">{score === 100 ? "证据齐全：交给未参与调查的人独立重放并尝试推翻根因。" : "尚未闭环：缺失项必须绑定原始日志、指标、转储、测试或恢复演练，不能用口头故事替代。"}</p>
    </section>
  );
}
