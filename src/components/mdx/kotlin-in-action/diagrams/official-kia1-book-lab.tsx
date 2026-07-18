"use client";

import { useMemo, useState } from "react";

type Mode = "structure" | "execution" | "evidence";
type Props = { mode: Mode; unitTitle: string; focus: string; nodes: string[] };

const lanes = ["源码", "静态类型", "编译解析", "JVM运行", "Java调用"];
const scenarios = ["Kotlin调用", "Java调用", "null边界", "泛型擦除", "反射输入"];
const gates = ["目录节点", "类型解析", "运行证据", "Java互操作", "版本边界"];

export function OfficialKia1BookLab({ mode, unitTitle, focus, nodes }: Props) {
  const [selected, setSelected] = useState(0);
  const [scenario, setScenario] = useState(0);
  const [strictBoundary, setStrictBoundary] = useState(true);
  const [checked, setChecked] = useState([true, false, false, false, false]);
  const visible = nodes.slice(0, 18);
  const score = useMemo(() => checked.filter(Boolean).length * 20, [checked]);
  const result = scenario === 0 ? "按静态类型执行" : strictBoundary ? "边界显式校验" : "风险进入运行时";

  if (mode === "structure") {
    return <section className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50" aria-label={unitTitle + "目录结构"}>
      <header className="border-b border-zinc-200 bg-emerald-50 px-4 py-3 dark:border-zinc-800 dark:bg-emerald-950/40"><p className="m-0 text-xs font-semibold uppercase text-emerald-800 dark:text-emerald-300">Kotlin 1.0 structure</p><h3 className="m-0 mt-1 text-base font-bold">{unitTitle}</h3></header>
      <div className="grid min-h-[340px] md:grid-cols-[minmax(0,1.2fr)_minmax(250px,0.8fr)]"><div className="grid content-start grid-cols-1 gap-2 border-b border-zinc-200 p-4 sm:grid-cols-2 md:border-b-0 md:border-r dark:border-zinc-800">{visible.map((node, index) => <button key={node} type="button" onClick={() => setSelected(index)} aria-pressed={selected === index} className={"min-h-12 rounded border px-3 py-2 text-left text-xs font-medium " + (selected === index ? "border-emerald-700 bg-emerald-700 text-white" : "border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900")}>{String(index + 1).padStart(2, "0")} {node}</button>)}</div><div className="p-4"><p className="m-0 text-xs font-semibold text-rose-700 dark:text-rose-300">当前节点</p><p className="mt-2 min-h-12 text-sm font-bold">{visible[selected] ?? unitTitle}</p><div className="mt-4 grid grid-cols-5 gap-1">{lanes.map((item) => <span key={item} className="flex min-h-12 items-center justify-center border px-1 text-center text-xs font-semibold">{item}</span>)}</div><p className="mt-4 text-sm leading-6">{focus}</p></div></div>
    </section>;
  }

  if (mode === "execution") {
    return <section className="my-6 rounded-md border border-zinc-300 bg-white p-4 text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50" aria-label={unitTitle + "执行实验"}><p className="m-0 text-xs font-semibold text-cyan-700 dark:text-cyan-300">Compiler and runtime boundary</p><div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">{scenarios.map((item, index) => <button key={item} type="button" onClick={() => setScenario(index)} aria-pressed={scenario === index} className={"min-h-12 rounded border px-2 text-xs font-semibold " + (scenario === index ? "border-cyan-700 bg-cyan-700 text-white" : "border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900")}>{item}</button>)}</div><button type="button" onClick={() => setStrictBoundary((value) => !value)} className={"mt-4 min-h-11 rounded border px-3 text-sm " + (strictBoundary ? "border-zinc-300" : "border-rose-700 bg-rose-700 text-white")}>{strictBoundary ? "边界校验开启" : "边界校验关闭"}</button><p className="mt-4 text-2xl font-bold text-rose-700 dark:text-rose-300">{result}</p><p className="text-sm leading-6">{focus}</p></section>;
  }

  return <section className="my-6 rounded-md border border-zinc-300 bg-white p-4 text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50" aria-label={unitTitle + "证据门"}><div className="flex items-center justify-between"><h3 className="m-0 text-base font-bold">Kotlin第1版证据</h3><output className="rounded border px-3 py-2 text-lg font-bold">{score}%</output></div><div className="mt-4 divide-y border-y">{gates.map((gate, index) => <button key={gate} type="button" onClick={() => setChecked((current) => current.map((value, itemIndex) => itemIndex === index ? !value : value))} className="flex min-h-11 w-full items-center justify-between px-2 text-left text-sm"><span>{gate}</span><span>{checked[index] ? "通过" : "待补"}</span></button>)}</div><p className="mt-4 text-sm leading-6">{score === 100 ? "证据齐全，可跨Kotlin与Java调用点重放。" : "仍缺目录、类型、运行时、互操作或版本证据。"}</p><p className="text-xs leading-5">{focus}</p></section>;
}
