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
  mode: "flow" | "experiment" | "evidence";
};

const shell =
  "border border-zinc-300 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-950";

export function IllustratedHttpLab(props: Props) {
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
  const [rtt, setRtt] = useState(80);
  const [payload, setPayload] = useState(640);
  const [validated, setValidated] = useState(true);
  const [checked, setChecked] = useState(() => gates.map(() => false));
  const result = useMemo(() => {
    const transfer = Math.ceil(payload / 160);
    const elapsed = rtt * (validated ? 2 : 3) + transfer * 8;
    return { elapsed, status: validated ? "304 / 条件成立" : "200 / 完整表示" };
  }, [payload, rtt, validated]);

  if (mode === "flow") {
    const active = links[selected] ?? links[0];
    return (
      <section className={shell} aria-label={unitTitle + "协议轨迹"}>
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

  if (mode === "experiment") {
    return (
      <section className={shell} aria-label={unitTitle + "单变量实验"}>
        <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">
          HTTP单变量实验
        </p>
        <h3 className="mt-1 text-base font-semibold">往返、表示与验证条件</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="text-xs font-semibold">
            往返时延：{rtt}ms
            <input
              className="mt-2 w-full accent-cyan-700"
              type="range"
              min={10}
              max={400}
              value={rtt}
              onChange={(event) => setRtt(Number(event.target.value))}
            />
          </label>
          <label className="text-xs font-semibold">
            表示大小：{payload}KB
            <input
              className="mt-2 w-full accent-amber-700"
              type="range"
              min={64}
              max={2048}
              step={64}
              value={payload}
              onChange={(event) => setPayload(Number(event.target.value))}
            />
          </label>
        </div>
        <label className="mt-4 flex min-h-10 items-center gap-2 text-xs font-semibold">
          <input
            type="checkbox"
            checked={validated}
            onChange={(event) => setValidated(event.target.checked)}
          />
          条件/身份/边界验证成立
        </label>
        <div className="mt-4 grid grid-cols-2 gap-2 text-center">
          <div className="border border-amber-500 bg-amber-50 p-3 dark:bg-amber-950/20">
            <strong className="block text-lg">{result.elapsed}ms</strong>
            <span className="text-xs">估算链路耗时</span>
          </div>
          <div className="border border-emerald-500 bg-emerald-50 p-3 dark:bg-emerald-950/20">
            <strong className="block text-sm">{result.status}</strong>
            <span className="text-xs">对照结果</span>
          </div>
        </div>
        <p className="mt-4 border-l-4 border-rose-600 bg-rose-50 p-3 text-xs leading-5 dark:bg-rose-950/20">
          <b>反例：</b>
          {failure}
          <br />
          <b>纪律：</b>
          每轮只改一个方法、首部、主体、连接或会话变量，并保存原始请求响应。
        </p>
      </section>
    );
  }

  const complete = checked.filter(Boolean).length;
  return (
    <section className={shell} aria-label={unitTitle + "证据门"}>
      <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
        独立协议证据门
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
          : "结论暂不通过：仍缺少报文、状态或失败证据。"}
        <br />
        {invariant}
      </p>
    </section>
  );
}
