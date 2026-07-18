"use client";

import { useMemo, useState } from "react";

type Link = { label: string; mechanism: string; evidence: string };
type Props = {
  unitTitle: string;
  focus: string;
  nodes: string[];
  invariant: string;
  failure: string;
  links: Link[];
  gates: string[];
  mode: "trace" | "fault" | "evidence";
};

const shell =
  "border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-950";

export function AndroidAdvancedDecodeLab(props: Props) {
  const { unitTitle, focus, nodes, invariant, failure, links, gates, mode } =
    props;
  const [selected, setSelected] = useState(0);
  const [binderDelay, setBinderDelay] = useState(18);
  const [mainWork, setMainWork] = useState(7);
  const [coldPath, setColdPath] = useState(true);
  const [checked, setChecked] = useState(() => gates.map(() => false));
  const risk = useMemo(() => {
    const latency = binderDelay + mainWork * 3 + (coldPath ? 24 : 4);
    return { latency, timeout: latency >= 65 };
  }, [binderDelay, mainWork, coldPath]);

  if (mode === "trace") {
    const active = links[selected] ?? links[0];
    return (
      <section className={shell + " p-4"} aria-label={unitTitle + "源码轨迹"}>
        <p className="text-xs font-semibold text-cyan-700 dark:text-cyan-300">
          Android 8.0源码轨迹
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
          <div className="border border-emerald-400 bg-emerald-50 p-3 dark:bg-emerald-950/20">
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
      <section className={shell + " p-4"} aria-label={unitTitle + "故障实验"}>
        <p className="text-xs font-semibold text-rose-700 dark:text-rose-300">
          单变量故障实验
        </p>
        <h3 className="mt-1 text-base font-semibold">Binder、主线程与冷路径</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="text-xs font-semibold">
            Binder延迟：{binderDelay}ms
            <input
              className="mt-2 w-full accent-rose-600"
              type="range"
              min={0}
              max={80}
              value={binderDelay}
              onChange={(event) => setBinderDelay(Number(event.target.value))}
            />
          </label>
          <label className="text-xs font-semibold">
            主线程工作单元：{mainWork}
            <input
              className="mt-2 w-full accent-amber-600"
              type="range"
              min={1}
              max={20}
              value={mainWork}
              onChange={(event) => setMainWork(Number(event.target.value))}
            />
          </label>
        </div>
        <label className="mt-4 flex min-h-10 items-center gap-2 text-xs font-semibold">
          <input
            type="checkbox"
            checked={coldPath}
            onChange={(event) => setColdPath(event.target.checked)}
          />
          首次进程/类/资源冷路径
        </label>
        <div className="mt-4 grid grid-cols-2 gap-2 text-center">
          <div className="border border-amber-500 bg-amber-50 p-3 dark:bg-amber-950/20">
            <strong className="block text-lg">{risk.latency}ms</strong>
            <span className="text-xs">估算关键路径</span>
          </div>
          <div
            className={
              "border p-3 " +
              (risk.timeout
                ? "border-rose-600 bg-rose-50 dark:bg-rose-950/20"
                : "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20")
            }
          >
            <strong className="block text-lg">
              {risk.timeout ? "超预算" : "预算内"}
            </strong>
            <span className="text-xs">轨迹判定</span>
          </div>
        </div>
        <p className="mt-4 border-l-4 border-rose-600 bg-rose-50 p-3 text-xs leading-5 dark:bg-rose-950/20">
          <b>反例：</b>
          {failure}
          <br />
          <b>纪律：</b>每轮只改变一个输入，并保存PID/TID、状态和最终结果。
        </p>
      </section>
    );
  }

  const complete = checked.filter(Boolean).length;
  return (
    <section className={shell + " p-4"} aria-label={unitTitle + "证据门"}>
      <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
        独立源码证据门
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
          ? "证据齐全，可以独立复核。"
          : "结论暂不通过：仍缺少源码或运行证据。"}
        <br />
        {invariant}
      </p>
    </section>
  );
}
