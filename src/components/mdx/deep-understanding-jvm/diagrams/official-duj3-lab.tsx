"use client";

import { useMemo, useState } from "react";

type Mode = "structure" | "execution" | "evidence";
type Props = { mode: Mode; unitTitle: string; focus: string; nodes: string[] };
const gates = ["规范层次", "环境指纹", "原始证据", "失败反例", "版本与回滚"];

export function OfficialDuj3Lab({ mode, unitTitle, focus, nodes }: Props) {
  const [selected, setSelected] = useState(0);
  const [pressure, setPressure] = useState(40);
  const [variant, setVariant] = useState(false);
  const [checked, setChecked] = useState([true, false, false, false, false]);
  const visible = nodes.slice(0, 14);
  const completeness = useMemo(() => checked.filter(Boolean).length * 20, [checked]);
  const pause = Math.round(8 + pressure * 1.4 + (variant ? 75 : 0));
  const throughput = Math.max(5, Math.round(130 - pressure * 0.62 - (variant ? 28 : 0)));

  if (mode === "structure") return (
    <section className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50" aria-label={unitTitle + "跨层结构"}>
      <header className="border-b border-zinc-200 bg-emerald-50 px-4 py-3 dark:border-zinc-800 dark:bg-emerald-950/40"><p className="m-0 text-xs font-semibold uppercase text-emerald-800 dark:text-emerald-300">Specification to runtime</p><h3 className="m-0 mt-1 text-base font-bold">{unitTitle}</h3></header>
      <div className="grid min-h-[300px] md:grid-cols-[minmax(0,1.25fr)_minmax(230px,0.75fr)]">
        <div className="grid content-start grid-cols-1 gap-2 border-b border-zinc-200 p-4 sm:grid-cols-2 md:border-b-0 md:border-r dark:border-zinc-800">{visible.map((node, index) => <button key={node} type="button" onClick={() => setSelected(index)} aria-pressed={selected === index} className={"min-h-12 rounded border px-3 py-2 text-left text-xs font-medium " + (selected === index ? "border-emerald-700 bg-emerald-700 text-white" : "border-zinc-300 bg-zinc-50 text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100")}><span className="mr-2 font-mono">{String(index + 1).padStart(2, "0")}</span>{node}</button>)}</div>
        <div className="p-4"><p className="m-0 text-xs font-semibold text-rose-700 dark:text-rose-300">当前节点</p><p className="mt-2 min-h-12 text-sm font-bold">{visible[selected] ?? unitTitle}</p><p className="mt-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300">{focus}</p><p className="mt-4 border-l-4 border-amber-500 pl-3 text-xs leading-5 text-zinc-600 dark:text-zinc-400">先判断这是规范、实现还是发行版行为，再选择证据。</p></div>
      </div>
    </section>
  );

  if (mode === "execution") return (
    <section className="my-6 rounded-md border border-zinc-300 bg-white p-4 text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50" aria-label={unitTitle + "执行实验"}>
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-zinc-200 pb-3 dark:border-zinc-800"><div><p className="m-0 text-xs font-semibold text-cyan-700 dark:text-cyan-300">Runtime experiment</p><h3 className="m-0 mt-1 text-base font-bold">单变量状态转换</h3></div><button type="button" onClick={() => setVariant((value) => !value)} aria-pressed={variant} className={"min-h-10 rounded border px-3 text-sm font-semibold " + (variant ? "border-rose-700 bg-rose-700 text-white" : "border-zinc-300 bg-zinc-50 text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100")}>{variant ? "变体已启用" : "启用对照变体"}</button></div>
      <label htmlFor={unitTitle + "-pressure"} className="mt-4 block text-sm font-medium">工作压力：{pressure}%</label><input id={unitTitle + "-pressure"} type="range" min="5" max="95" value={pressure} onChange={(event) => setPressure(Number(event.target.value))} className="mt-2 w-full accent-cyan-700" />
      <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded border border-zinc-300 bg-zinc-300 dark:border-zinc-700 dark:bg-zinc-700"><div className="bg-white p-3 dark:bg-zinc-950"><p className="m-0 text-xs text-zinc-500">示意停顿</p><p className="m-0 mt-1 text-xl font-bold text-rose-700 dark:text-rose-300">{pause} ms</p></div><div className="bg-white p-3 dark:bg-zinc-950"><p className="m-0 text-xs text-zinc-500">示意吞吐</p><p className="m-0 mt-1 text-xl font-bold text-emerald-700 dark:text-emerald-300">{throughput}/s</p></div></div>
      <p className="mt-4 text-sm leading-6 text-zinc-700 dark:text-zinc-300">{focus}</p><p className="mt-2 text-xs leading-5 text-zinc-600 dark:text-zinc-400">数值只用于展示变量关系，不是JVM实测；正式结论必须来自固定工作量和版本化原始输出。</p>
    </section>
  );

  return (
    <section className="my-6 rounded-md border border-zinc-300 bg-white p-4 text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50" aria-label={unitTitle + "证据门"}>
      <div className="flex items-center justify-between gap-3"><div><p className="m-0 text-xs font-semibold text-violet-700 dark:text-violet-300">Evidence gate</p><h3 className="m-0 mt-1 text-base font-bold">跨版本证据完整度</h3></div><output className="min-w-16 rounded border border-zinc-300 px-3 py-2 text-center text-lg font-bold dark:border-zinc-700">{completeness}%</output></div>
      <div className="mt-4 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">{gates.map((gate, index) => <button key={gate} type="button" onClick={() => setChecked((current) => current.map((value, item) => item === index ? !value : value))} aria-pressed={checked[index]} className="flex min-h-11 w-full items-center justify-between gap-3 px-2 text-left text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900"><span>{gate}</span><span className={"inline-flex h-6 w-6 items-center justify-center rounded border font-bold " + (checked[index] ? "border-emerald-700 bg-emerald-700 text-white" : "border-zinc-400 text-transparent")}>✓</span></button>)}</div>
      <p className="mt-4 text-sm leading-6 text-zinc-700 dark:text-zinc-300">{completeness === 100 ? "证据齐全：交给未参与实验的人更换一个目标JDK重放并尝试推翻结论。" : "尚未闭环：缺失项必须绑定规范、命令、原始日志、Class、转储或回滚实验。"}</p>
    </section>
  );
}
