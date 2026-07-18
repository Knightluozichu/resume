"use client";

import { useMemo, useState } from "react";

type Mode = "model" | "failure" | "evidence";
type Props = { mode: Mode; unitTitle: string; focus: string; nodes: string[] };
const failureCases = ["正常", "空值", "边界", "顺序", "版本"];
const evidenceGates = ["环境", "类型", "正常", "反例", "迁移"];

export function OfficialKdg1BookLab({ mode, unitTitle, focus, nodes }: Props) {
  const [selected, setSelected] = useState(0);
  const [failure, setFailure] = useState(0);
  const [strict, setStrict] = useState(true);
  const [checked, setChecked] = useState([true, false, false, false, false]);
  const visibleNodes = nodes.slice(0, 16);
  const score = useMemo(() => checked.filter(Boolean).length * 20, [checked]);
  const outcome = failure === 0 ? "合同成立" : strict ? "编译或断言拒绝" : "风险进入运行时";

  if (mode === "model") return (
    <section className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50" aria-label={unitTitle + "类型与目录模型"}>
      <header className="border-b border-zinc-200 bg-emerald-50 px-4 py-3 dark:border-zinc-800 dark:bg-emerald-950/40"><p className="m-0 text-xs font-semibold uppercase text-emerald-800 dark:text-emerald-300">Type and ownership map</p><h3 className="m-0 mt-1 text-base font-bold">{unitTitle}</h3></header>
      <div className="grid min-h-[320px] md:grid-cols-[minmax(0,1.15fr)_minmax(240px,0.85fr)]"><div className="grid content-start grid-cols-1 gap-2 border-b border-zinc-200 p-4 sm:grid-cols-2 md:border-b-0 md:border-r dark:border-zinc-800">{visibleNodes.map((node, index) => <button key={node} type="button" onClick={() => setSelected(index)} aria-pressed={selected === index} className={"min-h-12 rounded border px-3 py-2 text-left text-xs font-medium " + (selected === index ? "border-emerald-700 bg-emerald-700 text-white" : "border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900")}>{String(index + 1).padStart(2, "0")} {node}</button>)}</div><div className="p-4"><p className="m-0 text-xs font-semibold text-rose-700 dark:text-rose-300">当前节点</p><p className="mt-2 min-h-12 text-sm font-bold">{visibleNodes[selected] ?? unitTitle}</p><p className="mt-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300">{focus}</p><dl className="mt-4 grid grid-cols-2 gap-2 text-xs"><div className="border p-2"><dt>输入</dt><dd className="m-0 mt-1 font-semibold">显式类型</dd></div><div className="border p-2"><dt>输出</dt><dd className="m-0 mt-1 font-semibold">可观察断言</dd></div></dl></div></div>
    </section>
  );

  if (mode === "failure") return (
    <section className="my-6 rounded-md border border-zinc-300 bg-white p-4 text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50" aria-label={unitTitle + "失败实验"}>
      <p className="m-0 text-xs font-semibold text-cyan-700 dark:text-cyan-300">Compile and runtime failure lab</p><div className="mt-4 grid grid-cols-5 gap-1">{failureCases.map((item, index) => <button key={item} type="button" onClick={() => setFailure(index)} aria-pressed={failure === index} className={"min-h-12 rounded border px-1 text-xs font-semibold " + (failure === index ? "border-cyan-700 bg-cyan-700 text-white" : "border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900")}>{item}</button>)}</div>
      <label className="mt-4 flex min-h-11 items-center gap-3 border-y py-2 text-sm"><input type="checkbox" checked={strict} onChange={(event) => setStrict(event.target.checked)} /><span>保留显式类型与先决条件</span></label><p className="mt-4 text-2xl font-bold text-rose-700 dark:text-rose-300">{outcome}</p><p className="text-sm leading-6">{focus}</p>
    </section>
  );

  return (
    <section className="my-6 rounded-md border border-zinc-300 bg-white p-4 text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50" aria-label={unitTitle + "证据门"}>
      <div className="flex items-center justify-between"><h3 className="m-0 text-base font-bold">Kotlin 可重放证据</h3><output className="rounded border px-3 py-2 text-lg font-bold">{score}%</output></div><div className="mt-4 divide-y border-y">{evidenceGates.map((gate, index) => <button key={gate} type="button" onClick={() => setChecked((current) => current.map((value, itemIndex) => itemIndex === index ? !value : value))} className="flex min-h-11 w-full items-center justify-between px-2 text-left text-sm"><span>{gate}</span><span>{checked[index] ? "通过" : "待补"}</span></button>)}</div><p className="mt-4 text-sm leading-6">{score === 100 ? "证据齐全，可在独立环境重放。" : "仍缺环境、类型、正常、反例或迁移证据。"}</p><p className="text-xs leading-5">{focus}</p>
    </section>
  );
}
