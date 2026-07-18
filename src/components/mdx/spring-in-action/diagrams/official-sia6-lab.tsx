"use client";

import { useMemo, useState } from "react";

type Mode = "map" | "flow" | "evidence";

type OfficialSiaLabProps = {
  mode: Mode;
  unitTitle: string;
  focus: string;
  nodes: string[];
};

const evidenceLabels = ["边界合同", "失败反例", "可观察信号", "版本差异", "回滚条件"];

export function OfficialSiaLab({ mode, unitTitle, focus, nodes }: OfficialSiaLabProps) {
  const [selected, setSelected] = useState(0);
  const [load, setLoad] = useState(45);
  const [failure, setFailure] = useState(false);
  const [checked, setChecked] = useState([true, false, false, false, false]);
  const visibleNodes = nodes.slice(0, 12);
  const score = useMemo(() => checked.filter(Boolean).length * 20, [checked]);
  const latency = Math.round(35 + load * 2.1 + (failure ? 180 : 0));
  const throughput = Math.max(4, Math.round(125 - load * 0.72 - (failure ? 38 : 0)));

  if (mode === "map") {
    return (
      <section className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50" aria-label={unitTitle + "目录决策图"}>
        <header className="border-b border-zinc-200 bg-emerald-50 px-4 py-3 dark:border-zinc-800 dark:bg-emerald-950/40">
          <p className="m-0 text-xs font-semibold uppercase text-emerald-800 dark:text-emerald-300">Official outline explorer</p>
          <h3 className="m-0 mt-1 text-base font-bold">{unitTitle}</h3>
        </header>
        <div className="grid min-h-[290px] gap-0 md:grid-cols-[minmax(0,1.15fr)_minmax(240px,0.85fr)]">
          <div className="grid content-start grid-cols-1 gap-2 border-b border-zinc-200 p-4 sm:grid-cols-2 md:border-b-0 md:border-r dark:border-zinc-800">
            {visibleNodes.map((node, index) => (
              <button key={node} type="button" onClick={() => setSelected(index)} className={"min-h-12 rounded border px-3 py-2 text-left text-xs font-medium transition-colors " + (selected === index ? "border-emerald-700 bg-emerald-700 text-white" : "border-zinc-300 bg-zinc-50 text-zinc-800 hover:border-emerald-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100")} aria-pressed={selected === index}>
                <span className="mr-2 font-mono">{String(index + 1).padStart(2, "0")}</span>{node}
              </button>
            ))}
          </div>
          <div className="p-4">
            <p className="m-0 text-xs font-semibold text-rose-700 dark:text-rose-300">当前节点</p>
            <p className="mt-2 min-h-12 text-sm font-bold">{visibleNodes[selected] ?? unitTitle}</p>
            <p className="mt-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300">{focus}</p>
            <p className="mt-4 border-l-4 border-amber-500 pl-3 text-xs leading-5 text-zinc-600 dark:text-zinc-400">先声明输入、边界、失败与证据，再运行示例；目录标题不是掌握证明。</p>
          </div>
        </div>
      </section>
    );
  }

  if (mode === "flow") {
    return (
      <section className="my-6 rounded-md border border-zinc-300 bg-white p-4 text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50" aria-label={unitTitle + "运行流实验"}>
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-zinc-200 pb-3 dark:border-zinc-800">
          <div><p className="m-0 text-xs font-semibold text-cyan-700 dark:text-cyan-300">Flow experiment</p><h3 className="m-0 mt-1 text-base font-bold">请求、依赖与背压</h3></div>
          <button type="button" onClick={() => setFailure((value) => !value)} className={"min-h-10 rounded border px-3 text-sm font-semibold " + (failure ? "border-rose-700 bg-rose-700 text-white" : "border-zinc-300 bg-zinc-50 text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100")} aria-pressed={failure}>{failure ? "故障已注入" : "注入依赖故障"}</button>
        </div>
        <label className="mt-4 block text-sm font-medium" htmlFor={unitTitle + "-load"}>输入负载：{load}%</label>
        <input id={unitTitle + "-load"} className="mt-2 w-full accent-cyan-700" type="range" min="5" max="95" value={load} onChange={(event) => setLoad(Number(event.target.value))} />
        <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded border border-zinc-300 bg-zinc-300 dark:border-zinc-700 dark:bg-zinc-700">
          <div className="bg-white p-3 dark:bg-zinc-950"><p className="m-0 text-xs text-zinc-500">估算P95</p><p className="m-0 mt-1 text-xl font-bold text-rose-700 dark:text-rose-300">{latency} ms</p></div>
          <div className="bg-white p-3 dark:bg-zinc-950"><p className="m-0 text-xs text-zinc-500">估算吞吐</p><p className="m-0 mt-1 text-xl font-bold text-emerald-700 dark:text-emerald-300">{throughput}/s</p></div>
        </div>
        <p className="mt-4 text-sm leading-6 text-zinc-700 dark:text-zinc-300">{failure ? "观察错误是否停在声明边界，并确认重试、回滚和资源释放只发生一次。" : "先写预测，再调整负载；数字只用于比较条件变化，不替代真实基准。"}</p>
      </section>
    );
  }

  return (
    <section className="my-6 rounded-md border border-zinc-300 bg-white p-4 text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50" aria-label={unitTitle + "证据矩阵"}>
      <div className="flex items-center justify-between gap-3"><div><p className="m-0 text-xs font-semibold text-violet-700 dark:text-violet-300">Evidence gate</p><h3 className="m-0 mt-1 text-base font-bold">交付证据完整度</h3></div><output className="min-w-16 rounded border border-zinc-300 px-3 py-2 text-center text-lg font-bold dark:border-zinc-700">{score}%</output></div>
      <div className="mt-4 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
        {evidenceLabels.map((label, index) => (
          <button key={label} type="button" onClick={() => setChecked((current) => current.map((value, item) => item === index ? !value : value))} className="flex min-h-11 w-full items-center justify-between gap-3 px-2 text-left text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900" aria-pressed={checked[index]}>
            <span>{label}</span><span className={"inline-flex h-6 w-6 items-center justify-center rounded border font-bold " + (checked[index] ? "border-emerald-700 bg-emerald-700 text-white" : "border-zinc-400 text-transparent")}>✓</span>
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm leading-6 text-zinc-700 dark:text-zinc-300">{score === 100 ? "证据齐全：交给未参与实现的人重放，确认结论可以被推翻和复现。" : "尚未闭环：缺失项必须绑定测试、日志、指标或回滚触发器，不能用口头说明替代。"}</p>
    </section>
  );
}
