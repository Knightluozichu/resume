"use client";

import { useMemo, useState } from "react";

type Link = { label: string; mechanism: string; evidence: string };
type Props = {
  unitTitle: string;
  snapshot: string;
  focus: string;
  nodes: string[];
  invariant: string;
  failure: string;
  links: Link[];
  gates: string[];
  mode: "plan" | "fault" | "evidence";
};

const shell =
  "border border-zinc-300 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-950";

export function ServerNetworkDesignLab(props: Props) {
  const {
    unitTitle,
    snapshot,
    focus,
    nodes,
    invariant,
    failure,
    links,
    gates,
    mode,
  } = props;
  const [selected, setSelected] = useState(0);
  const [peak, setPeak] = useState(4);
  const [growth, setGrowth] = useState(35);
  const [singleFailure, setSingleFailure] = useState(true);
  const [checked, setChecked] = useState(() => gates.map(() => false));
  function resetExperiment() {
    setSelected(0);
    setPeak(4);
    setGrowth(35);
    setSingleFailure(true);
    setChecked(() => gates.map(() => false));
  }

  const capacity = useMemo(() => {
    const required = peak * (1 + growth / 100);
    const available = singleFailure ? 8 : 12;
    return {
      required: required.toFixed(1),
      available,
      pass: available >= required,
    };
  }, [peak, growth, singleFailure]);

  if (mode === "plan") {
    const active = links[selected] ?? links[0];
    return (
      <section className={shell} aria-label={unitTitle + "设计地图"}>
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
        <p className="text-xs font-semibold text-cyan-700 dark:text-cyan-300">
          {snapshot}
        </p>
        <h3 className="mt-1 text-base font-semibold">{unitTitle}</h3>
        <p className="mt-2 text-xs leading-5 text-zinc-600 dark:text-zinc-300">
          {focus}
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((link, index) => (
            <button
              key={link.label}
              type="button"
              onClick={() => setSelected(index)}
              aria-pressed={selected === index}
              className={
                "min-h-11 border px-3 py-2 text-left text-xs font-semibold " +
                (selected === index
                  ? "border-cyan-600 bg-cyan-50 dark:bg-cyan-950/30"
                  : "border-zinc-300 dark:border-zinc-700")
              }
            >
              {link.label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_1.2fr]">
          <div className="border border-emerald-500 bg-emerald-50 p-3 dark:bg-emerald-950/20">
            <strong className="text-sm">{active.label}</strong>
            <p className="mt-2 text-xs leading-5">
              <b>机制：</b>
              {active.mechanism}
            </p>
            <p className="mt-1 text-xs leading-5">
              <b>证据：</b>
              {active.evidence}
            </p>
          </div>
          <ol className="grid gap-2 sm:grid-cols-2">
            {nodes.slice(0, 8).map((node, index) => (
              <li
                key={node}
                className="min-h-12 border border-zinc-300 p-2 text-xs leading-5 dark:border-zinc-700"
              >
                <span className="mr-2 font-semibold text-cyan-700 dark:text-cyan-300">
                  {index + 1}
                </span>
                {node}
              </li>
            ))}
          </ol>
        </div>
        <p className="mt-4 border-l-4 border-cyan-600 bg-cyan-50 p-3 text-xs leading-5 dark:bg-cyan-950/20">
          <b>验收：</b>
          {invariant}
        </p>
      </section>
    );
  }

  if (mode === "fault") {
    return (
      <section className={shell} aria-label={unitTitle + "容量与故障实验"}>
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
        <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">
          单故障容量实验
        </p>
        <h3 className="mt-1 text-base font-semibold">峰值、增长与剩余路径</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="text-xs font-semibold">
            当前峰值：{peak}Gbps
            <input
              className="mt-2 w-full accent-cyan-700"
              type="range"
              min={1}
              max={10}
              value={peak}
              onChange={(event) => setPeak(Number(event.target.value))}
            />
          </label>
          <label className="text-xs font-semibold">
            增长余量：{growth}%
            <input
              className="mt-2 w-full accent-amber-700"
              type="range"
              min={0}
              max={100}
              step={5}
              value={growth}
              onChange={(event) => setGrowth(Number(event.target.value))}
            />
          </label>
        </div>
        <label className="mt-4 flex min-h-11 items-center gap-2 text-xs font-semibold">
          <input
            type="checkbox"
            checked={singleFailure}
            onChange={(event) => setSingleFailure(event.target.checked)}
          />
          模拟失去一条链路或一台设备
        </label>
        <div className="mt-4 grid grid-cols-2 gap-2 text-center">
          <div className="border border-amber-500 bg-amber-50 p-3 dark:bg-amber-950/20">
            <strong className="block text-lg">{capacity.required}Gbps</strong>
            <span className="text-xs">需求容量</span>
          </div>
          <div
            className={
              "border p-3 " +
              (capacity.pass
                ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20"
                : "border-rose-600 bg-rose-50 dark:bg-rose-950/20")
            }
          >
            <strong className="block text-lg">{capacity.available}Gbps</strong>
            <span className="text-xs">
              {capacity.pass ? "故障后仍通过" : "故障后超载"}
            </span>
          </div>
        </div>
        <p className="mt-4 border-l-4 border-rose-600 bg-rose-50 p-3 text-xs leading-5 dark:bg-rose-950/20">
          <b>反例：</b>
          {failure}
          <br />
          <b>纪律：</b>
          每轮只断开一个故障域，保存正反向流量、状态、告警和恢复时间。
        </p>
      </section>
    );
  }

  const complete = checked.filter(Boolean).length;
  return (
    <section className={shell} aria-label={unitTitle + "证据门"}>
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
      <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
        独立设计证据门
      </p>
      <div className="mt-1 flex items-center justify-between gap-3">
        <h3 className="text-base font-semibold">{unitTitle}</h3>
        <span className="text-xs font-semibold">
          {complete}/{gates.length}
        </span>
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {gates.map((gate, index) => (
          <label
            key={gate}
            className={
              "flex min-h-12 items-center gap-3 border p-3 text-xs " +
              (checked[index]
                ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20"
                : "border-zinc-300 dark:border-zinc-700")
            }
          >
            <input
              type="checkbox"
              checked={checked[index] ?? false}
              onChange={(event) =>
                setChecked((current) =>
                  current.map((item, itemIndex) =>
                    itemIndex === index ? event.target.checked : item,
                  ),
                )
              }
            />
            {gate}
          </label>
        ))}
      </div>
      <p className="mt-4 border-l-4 border-emerald-600 bg-emerald-50 p-3 text-xs leading-5 dark:bg-emerald-950/20">
        {complete === gates.length
          ? "证据齐全，可以独立施工和复核。"
          : "结论暂不通过：仍缺少设计或运行证据。"}
        <br />
        {invariant}
      </p>
    </section>
  );
}
