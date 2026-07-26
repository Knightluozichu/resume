"use client";

import { useMemo, useState } from "react";

type Link = { label: string; mechanism: string; evidence: string };
type Props = {
  unitTitle: string;
  focus: string;
  invariant: string;
  failure: string;
  nodes: string[];
  links: Link[];
  gates: string[];
  mode: "map" | "experiment" | "evidence";
};

const shell =
  "border border-zinc-300 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-950";

export function TopDownNetworkLab(props: Props) {
  const { unitTitle, focus, invariant, failure, nodes, links, gates, mode } =
    props;
  const [selected, setSelected] = useState(0);
  const [rtt, setRtt] = useState(40);
  const [bandwidth, setBandwidth] = useState(100);
  const [loss, setLoss] = useState(1);
  const [checked, setChecked] = useState(() => gates.map(() => false));
  function resetExperiment() {
    setSelected(0);
    setRtt(40);
    setBandwidth(100);
    setLoss(1);
    setChecked(() => gates.map(() => false));
  }

  const estimate = useMemo(() => {
    const bdp = (bandwidth * rtt) / 8 / 1000;
    const penalty = Math.max(0.15, 1 - loss / 10);
    return { bdp: bdp.toFixed(2), useful: (bandwidth * penalty).toFixed(1) };
  }, [bandwidth, loss, rtt]);

  if (mode === "map") {
    const active = links[selected] ?? links[0];
    return (
      <section className={shell} aria-label={unitTitle + "协议路径图"}>
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
        <p className="text-xs font-semibold text-cyan-700 dark:text-cyan-300">
          第8版自顶向下协议路径
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
        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_1.25fr]">
          <div className="border border-emerald-500 bg-emerald-50 p-3 text-xs leading-5 dark:bg-emerald-950/20">
            <strong className="text-sm">{active.label}</strong>
            <p className="mt-2">
              <b>机制：</b>
              {active.mechanism}
            </p>
            <p className="mt-1">
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
          <b>不变量：</b>
          {invariant}
        </p>
      </section>
    );
  }

  if (mode === "experiment") {
    return (
      <section className={shell} aria-label={unitTitle + "网络参数实验"}>
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
        <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">
          单变量网络实验
        </p>
        <h3 className="mt-1 text-base font-semibold">时延、带宽与丢包</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <label className="text-xs font-semibold">
            RTT：{rtt}ms
            <input
              className="mt-2 w-full accent-cyan-700"
              type="range"
              min={5}
              max={300}
              step={5}
              value={rtt}
              onChange={(event) => setRtt(Number(event.target.value))}
            />
          </label>
          <label className="text-xs font-semibold">
            瓶颈：{bandwidth}Mbps
            <input
              className="mt-2 w-full accent-emerald-700"
              type="range"
              min={5}
              max={1000}
              step={5}
              value={bandwidth}
              onChange={(event) => setBandwidth(Number(event.target.value))}
            />
          </label>
          <label className="text-xs font-semibold">
            丢包：{loss}%
            <input
              className="mt-2 w-full accent-rose-700"
              type="range"
              min={0}
              max={10}
              step={0.5}
              value={loss}
              onChange={(event) => setLoss(Number(event.target.value))}
            />
          </label>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-center">
          <div className="border border-cyan-600 bg-cyan-50 p-3 dark:bg-cyan-950/20">
            <strong className="block text-lg">{estimate.bdp} MB</strong>
            <span className="text-xs">带宽时延积</span>
          </div>
          <div className="border border-emerald-500 bg-emerald-50 p-3 dark:bg-emerald-950/20">
            <strong className="block text-lg">{estimate.useful} Mbps</strong>
            <span className="text-xs">受损有效速率估计</span>
          </div>
        </div>
        <p className="mt-4 border-l-4 border-rose-600 bg-rose-50 p-3 text-xs leading-5 dark:bg-rose-950/20">
          <b>反例：</b>
          {failure}
          <br />
          <b>实验纪律：</b>
          每轮只改变一个参数，其他路径、负载、缓存和协议状态保持不变。
        </p>
      </section>
    );
  }

  const complete = checked.filter(Boolean).length;
  return (
    <section className={shell} aria-label={unitTitle + "证据门"}>
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
      <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
        独立复现实验门
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
          ? "证据完整，可以由第三方独立复现。"
          : "结论暂不通过：仍缺协议或实验记录。"}
        <br />
        {invariant}
      </p>
    </section>
  );
}
