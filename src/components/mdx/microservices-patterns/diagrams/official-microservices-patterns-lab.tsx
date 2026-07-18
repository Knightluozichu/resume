"use client";

import { useMemo, useState } from "react";

type PatternItem = {
  label: string;
  problem: string;
  mechanism: string;
  evidence: string;
};

type LabProps = {
  unitTitle: string;
  focus: string;
  nodes: readonly string[];
  invariant: string;
  failure: string;
  patterns: readonly PatternItem[];
  gates: readonly string[];
  mode: "pattern" | "failure" | "evidence";
};

export function MicroservicesPatternsLab(props: LabProps) {
  const { unitTitle, focus, nodes, invariant, failure, patterns, gates, mode } =
    props;
  const [nodeIndex, setNodeIndex] = useState(0);
  const [patternIndex, setPatternIndex] = useState(0);
  const [requests, setRequests] = useState(1000);
  const [timeoutRate, setTimeoutRate] = useState(5);
  const [duplicateRate, setDuplicateRate] = useState(3);
  const [retries, setRetries] = useState(1);
  const [idempotent, setIdempotent] = useState(true);
  const [checked, setChecked] = useState<boolean[]>(() =>
    gates.map(() => false),
  );

  const result = useMemo(() => {
    const attempts = requests * (retries + 1);
    const unknown = Math.round(requests * (timeoutRate / 100));
    const duplicateDeliveries = Math.round(attempts * (duplicateRate / 100));
    const duplicateEffects = idempotent ? 0 : duplicateDeliveries;
    const risk =
      attempts > requests * 2 || duplicateEffects > 0 || timeoutRate >= 15;
    return { attempts, unknown, duplicateDeliveries, duplicateEffects, risk };
  }, [duplicateRate, idempotent, requests, retries, timeoutRate]);

  const shell =
    "my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50";

  if (mode === "pattern") {
    const selected = patterns[patternIndex] ?? patterns[0];
    return (
      <section className={shell} aria-label={unitTitle + "模式关系实验"}>
        <header className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            初版目录 · 模式因果链
          </p>
          <h3 className="mt-1 text-base font-semibold">{unitTitle}</h3>
          <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            {focus}
          </p>
        </header>
        <div className="grid lg:grid-cols-[minmax(14rem,0.8fr)_minmax(0,1.35fr)]">
          <div className="max-h-80 overflow-auto border-b p-3 lg:border-b-0 lg:border-r dark:border-zinc-800">
            {nodes.map((node, index) => (
              <button
                key={node}
                type="button"
                onClick={() => setNodeIndex(index)}
                className={
                  "mb-1 min-h-9 w-full rounded px-2 py-1.5 text-left text-xs " +
                  (nodeIndex === index
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950"
                    : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800")
                }
              >
                {node}
              </button>
            ))}
          </div>
          <div className="p-4">
            <p className="text-xs text-zinc-500">当前正式节点</p>
            <p className="mt-1 text-sm font-semibold">
              {nodes[nodeIndex] ?? unitTitle}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {patterns.map((item, index) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setPatternIndex(index)}
                  className={
                    "min-h-9 rounded px-3 text-xs font-semibold " +
                    (patternIndex === index
                      ? "bg-emerald-700 text-white"
                      : "border border-zinc-300 dark:border-zinc-700")
                  }
                >
                  {item.label}
                </button>
              ))}
            </div>
            {selected ? (
              <div className="mt-4 grid gap-2 text-xs sm:grid-cols-3">
                <div className="border border-amber-400 bg-amber-50 p-3 dark:bg-amber-950/20">
                  <strong className="block">问题</strong>
                  <span className="mt-1 block leading-5">
                    {selected.problem}
                  </span>
                </div>
                <div className="border border-sky-400 bg-sky-50 p-3 dark:bg-sky-950/20">
                  <strong className="block">机制</strong>
                  <span className="mt-1 block leading-5">
                    {selected.mechanism}
                  </span>
                </div>
                <div className="border border-emerald-400 bg-emerald-50 p-3 dark:bg-emerald-950/20">
                  <strong className="block">证据</strong>
                  <span className="mt-1 block leading-5">
                    {selected.evidence}
                  </span>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    );
  }

  if (mode === "failure") {
    return (
      <section
        className={shell + " p-4"}
        aria-label={unitTitle + "部分失败实验"}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-rose-700 dark:text-rose-300">
              超时、重复与重试放大
            </p>
            <h3 className="mt-1 text-base font-semibold">{unitTitle}</h3>
          </div>
          <label className="flex min-h-9 items-center gap-2 text-xs font-semibold">
            <input
              type="checkbox"
              checked={idempotent}
              onChange={(event) => setIdempotent(event.target.checked)}
            />
            幂等消费者
          </label>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="text-xs font-semibold">
            业务请求
            <input
              className="mt-1 min-h-10 w-full rounded border bg-transparent px-3 dark:border-zinc-700"
              type="number"
              min={100}
              max={10000}
              value={requests}
              onChange={(event) => setRequests(Number(event.target.value))}
            />
          </label>
          <label className="text-xs font-semibold">
            超时率(%)
            <input
              className="mt-1 min-h-10 w-full rounded border bg-transparent px-3 dark:border-zinc-700"
              type="number"
              min={0}
              max={50}
              value={timeoutRate}
              onChange={(event) => setTimeoutRate(Number(event.target.value))}
            />
          </label>
          <label className="text-xs font-semibold">
            重复率(%)
            <input
              className="mt-1 min-h-10 w-full rounded border bg-transparent px-3 dark:border-zinc-700"
              type="number"
              min={0}
              max={50}
              value={duplicateRate}
              onChange={(event) => setDuplicateRate(Number(event.target.value))}
            />
          </label>
          <label className="text-xs font-semibold">
            重试次数
            <input
              className="mt-1 min-h-10 w-full rounded border bg-transparent px-3 dark:border-zinc-700"
              type="number"
              min={0}
              max={5}
              value={retries}
              onChange={(event) => setRetries(Number(event.target.value))}
            />
          </label>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2 text-center text-xs sm:grid-cols-5">
          {[
            ["总尝试", result.attempts],
            ["结果未知", result.unknown],
            ["重复交付", result.duplicateDeliveries],
            ["重复副作用", result.duplicateEffects],
            ["风险", result.risk ? "高" : "受控"],
          ].map(([label, value]) => (
            <div
              key={label}
              className={
                "border p-3 " +
                (label === "风险" && result.risk
                  ? "border-rose-500 bg-rose-50 dark:bg-rose-950/20"
                  : "border-zinc-300 dark:border-zinc-700")
              }
            >
              <strong className="block text-base">{value}</strong>
              {label}
            </div>
          ))}
        </div>
        <p className="mt-4 border-l-4 border-rose-600 bg-rose-50 p-3 text-xs leading-5 dark:bg-rose-950/20">
          <strong>反例：</strong>
          {failure}
          <br />
          <strong>验收：</strong>
          {invariant}
        </p>
      </section>
    );
  }

  const complete = checked.filter(Boolean).length;
  return (
    <section className={shell + " p-4"} aria-label={unitTitle + "独立证据门"}>
      <p className="text-xs font-semibold text-violet-700 dark:text-violet-300">
        独立证据门
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
      <p className="mt-4 border-l-4 border-violet-600 bg-violet-50 p-3 text-xs leading-5 dark:bg-violet-950/20">
        {complete === gates.length
          ? "证据齐全，可以进入独立复核。"
          : "结论暂不通过：仍缺少可复核证据。"}
        <br />
        {invariant}
      </p>
    </section>
  );
}
