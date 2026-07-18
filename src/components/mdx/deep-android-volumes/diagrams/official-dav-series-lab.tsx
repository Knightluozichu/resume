"use client";
import { useMemo, useState } from "react";

type Mode = "pipeline" | "experiment" | "evidence";
type Props = { mode: Mode; unitTitle: string; focus: string; nodes: string[]; versions: string[] };
const layers = ["公开入口", "线程/队列", "JNI/Binder", "服务/内核", "结果/释放"];
const failures = ["单版本基线", "标签错配", "线程停滞", "进程死亡", "状态损坏"];
const gates = ["目录", "版本", "调用", "所有权", "迁移"];

export function OfficialDavSeriesLab({ mode, unitTitle, focus, nodes, versions }: Props) {
  const [selected, setSelected] = useState(0);
  const [failure, setFailure] = useState(0);
  const [version, setVersion] = useState(0);
  const [checked, setChecked] = useState([true, false, false, false, false]);
  const score = useMemo(() => checked.filter(Boolean).length * 20, [checked]);
  const outcome = failure === 0 ? "保存可重放基线" : failure === 1 ? "拒绝跨版本假流程" : "验证错误与资源回收";

  if (mode === "pipeline") return <section className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50" aria-label={unitTitle + "三卷源码管线"}>
    <header className="border-b border-zinc-200 bg-emerald-50 px-4 py-3 dark:border-zinc-800 dark:bg-emerald-950/40"><p className="m-0 text-xs font-semibold uppercase text-emerald-800 dark:text-emerald-300">Framework source, state and ownership</p><h3 className="m-0 mt-1 text-base font-bold">{unitTitle}</h3></header>
    <div className="grid min-h-[360px] md:grid-cols-[minmax(0,1.25fr)_minmax(260px,0.75fr)]"><div className="grid max-h-[620px] content-start grid-cols-1 gap-2 overflow-y-auto border-b border-zinc-200 p-4 sm:grid-cols-2 md:border-b-0 md:border-r dark:border-zinc-800">{nodes.map((node, index) => <button key={node} type="button" onClick={() => setSelected(index)} aria-pressed={selected === index} className={(selected === index ? "border-emerald-700 bg-emerald-700 text-white" : "border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900") + " min-h-12 rounded border px-3 py-2 text-left text-xs font-medium"}>{String(index + 1).padStart(2, "0")} {node}</button>)}</div><div className="p-4"><p className="m-0 text-xs font-semibold text-rose-700 dark:text-rose-300">当前目录节点</p><p className="mt-2 min-h-12 text-sm font-bold">{nodes[selected] ?? unitTitle}</p><div className="mt-4 grid grid-cols-5 gap-1">{layers.map((item) => <span key={item} className="flex min-h-12 items-center justify-center border px-1 text-center text-xs font-semibold">{item}</span>)}</div><p className="mt-4 text-sm leading-6">{focus}</p></div></div>
  </section>;

  if (mode === "experiment") return <section className="my-6 rounded-md border border-zinc-300 bg-white p-4 text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50" aria-label={unitTitle + "版本故障实验"}>
    <p className="m-0 text-xs font-semibold text-cyan-700 dark:text-cyan-300">Version and boundary failure lab</p><div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">{versions.map((item, index) => <button key={item} type="button" onClick={() => setVersion(index)} aria-pressed={version === index} className={(version === index ? "border-cyan-700 bg-cyan-700 text-white" : "border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900") + " min-h-12 rounded border px-2 text-xs font-semibold"}>{item}</button>)}</div><div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">{failures.map((item, index) => <button key={item} type="button" onClick={() => setFailure(index)} aria-pressed={failure === index} className={(failure === index ? "border-rose-700 bg-rose-700 text-white" : "border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900") + " min-h-12 rounded border px-2 text-xs font-semibold"}>{item}</button>)}</div><p className="mt-4 text-2xl font-bold text-rose-700 dark:text-rose-300">{outcome}</p><p className="text-sm leading-6">{versions[version]}：{focus}</p>
  </section>;

  return <section className="my-6 rounded-md border border-zinc-300 bg-white p-4 text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50" aria-label={unitTitle + "证据门"}><div className="flex items-center justify-between"><h3 className="m-0 text-base font-bold">三卷源码证据门</h3><output className="rounded border px-3 py-2 text-lg font-bold">{score}%</output></div><div className="mt-4 divide-y border-y">{gates.map((gate, index) => <button key={gate} type="button" onClick={() => setChecked((current) => current.map((value, item) => item === index ? !value : value))} className="flex min-h-11 w-full items-center justify-between px-2 text-left text-sm"><span>{gate}</span><span>{checked[index] ? "通过" : "待补"}</span></button>)}</div><p className="mt-4 text-sm leading-6">{score === 100 ? "证据齐全，可以按版本独立交接。" : "仍缺目录、版本、调用、所有权或迁移证据。"}</p><p className="text-xs leading-5">{focus}</p></section>;
}
