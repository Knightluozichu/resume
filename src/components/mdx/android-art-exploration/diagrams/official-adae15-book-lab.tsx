"use client";

import { useMemo, useState } from "react";

type Mode = "flow" | "failure" | "evidence";
type Props = { mode: Mode; unitTitle: string; focus: string; nodes: string[] };
const boundaries = ["应用", "Framework", "Binder", "系统", "回调"];
const failures = ["正常", "重建", "进程退出", "队列阻塞", "资源压力"];
const gates = ["版本", "调用链", "线程进程", "故障释放", "迁移"];

export function OfficialAdae15BookLab({ mode, unitTitle, focus, nodes }: Props) {
  const [selected, setSelected] = useState(0);
  const [failure, setFailure] = useState(0);
  const [ownerAlive, setOwnerAlive] = useState(true);
  const [checked, setChecked] = useState([true, false, false, false, false]);
  function resetExperiment() {
    setSelected(0);
    setFailure(0);
    setOwnerAlive(true);
    setChecked([true, false, false, false, false]);
  }

  const visible = nodes.slice(0, 15);
  const score = useMemo(() => checked.filter(Boolean).length * 20, [checked]);
  const result = failure === 0 ? "调用完成" : ownerAlive ? "进入可恢复失败" : "结果必须丢弃并释放";

  if (mode === "flow") return <section className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50" aria-label={unitTitle + "调用链"}>
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span><header className="border-b border-zinc-200 bg-emerald-50 px-4 py-3 dark:border-zinc-800 dark:bg-emerald-950/40"><p className="m-0 text-xs font-semibold uppercase text-emerald-800 dark:text-emerald-300">Framework causal flow</p><h3 className="m-0 mt-1 text-base font-bold">{unitTitle}</h3></header><div className="grid min-h-[320px] md:grid-cols-[minmax(0,1.15fr)_minmax(240px,0.85fr)]"><div className="grid content-start grid-cols-1 gap-2 border-b border-zinc-200 p-4 sm:grid-cols-2 md:border-b-0 md:border-r dark:border-zinc-800">{visible.map((node, index) => <button key={node} type="button" onClick={() => setSelected(index)} aria-pressed={selected === index} className={"min-h-12 rounded border px-3 py-2 text-left text-xs font-medium " + (selected === index ? "border-emerald-700 bg-emerald-700 text-white" : "border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900")}>{String(index + 1).padStart(2, "0")} {node}</button>)}</div><div className="p-4"><p className="m-0 text-xs font-semibold text-rose-700 dark:text-rose-300">当前节点</p><p className="mt-2 min-h-12 text-sm font-bold">{visible[selected] ?? unitTitle}</p><div className="mt-4 grid grid-cols-5 gap-1">{boundaries.map((item) => <span key={item} className="flex min-h-12 items-center justify-center border px-1 text-center text-xs font-semibold">{item}</span>)}</div><p className="mt-4 text-sm leading-6">{focus}</p></div></div></section>;

  if (mode === "failure") return <section className="my-6 rounded-md border border-zinc-300 bg-white p-4 text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50" aria-label={unitTitle + "故障实验"}>
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span><p className="m-0 text-xs font-semibold text-cyan-700 dark:text-cyan-300">Lifecycle, process and pressure lab</p><div className="mt-4 grid grid-cols-5 gap-1">{failures.map((item, index) => <button key={item} type="button" onClick={() => setFailure(index)} aria-pressed={failure === index} className={"min-h-12 rounded border px-1 text-xs font-semibold " + (failure === index ? "border-cyan-700 bg-cyan-700 text-white" : "border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900")}>{item}</button>)}</div><button type="button" onClick={() => setOwnerAlive((value) => !value)} className={"mt-4 min-h-11 rounded border px-3 text-sm " + (ownerAlive ? "border-zinc-300" : "border-rose-700 bg-rose-700 text-white")}>{ownerAlive ? "所有者有效" : "所有者已销毁"}</button><p className="mt-4 text-2xl font-bold text-rose-700 dark:text-rose-300">{result}</p><p className="text-sm leading-6">{focus}</p></section>;

  return <section className="my-6 rounded-md border border-zinc-300 bg-white p-4 text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50" aria-label={unitTitle + "证据门"}>
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span><div className="flex items-center justify-between"><h3 className="m-0 text-base font-bold">Android framework证据</h3><output className="rounded border px-3 py-2 text-lg font-bold">{score}%</output></div><div className="mt-4 divide-y border-y">{gates.map((gate, index) => <button key={gate} type="button" onClick={() => setChecked((current) => current.map((value, itemIndex) => itemIndex === index ? !value : value))} className="flex min-h-11 w-full items-center justify-between px-2 text-left text-sm"><span>{gate}</span><span>{checked[index] ? "通过" : "待补"}</span></button>)}</div><p className="mt-4 text-sm leading-6">{score === 100 ? "证据齐全，可跨设备重放。" : "仍缺版本、调用链、线程进程、故障释放或迁移证据。"}</p><p className="text-xs leading-5">{focus}</p></section>;
}
