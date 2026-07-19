"use client";

import { useMemo, useState } from "react";

type Hop = { label: string; request: string; response: string };
type Props = {
  title: string;
  focus: string;
  invariant: string;
  failure: string;
  hops: Hop[];
  gates: string[];
  mode: "message" | "decision" | "evidence";
};

const shell =
  "border border-zinc-300 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-950";

export function HttpTransactionLab(props: Props) {
  const { title, focus, invariant, failure, hops, gates, mode } = props;
  const [selected, setSelected] = useState(0);
  const [age, setAge] = useState(40);
  const [lifetime, setLifetime] = useState(120);
  const [validator, setValidator] = useState(true);
  const [checked, setChecked] = useState(() => gates.map(() => false));
  const cache = useMemo(() => {
    if (age < lifetime)
      return { label: "新鲜命中", action: "直接复用缓存副本" };
    if (validator) return { label: "需要再验证", action: "发送条件请求" };
    return { label: "缓存未命中", action: "重新获取完整响应" };
  }, [age, lifetime, validator]);
  const reset = () => {
    setSelected(0);
    setAge(40);
    setLifetime(120);
    setValidator(true);
    setChecked(gates.map(() => false));
  };
  const resetButton = (
    <button
      type="button"
      onClick={reset}
      className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center border border-zinc-300 px-3 text-sm font-semibold dark:border-zinc-700"
      aria-label="重置 HTTP 实验"
    >
      重置
    </button>
  );

  if (mode === "message") {
    const hop = hops[selected] ?? hops[0];
    return (
      <section className={shell} aria-label={title + "HTTP报文路径实验"}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-cyan-700 dark:text-cyan-300">
              HTTP/1.1事务路径
            </p>
            <h3 className="mt-1 text-base font-semibold">{title}</h3>
          </div>
          {resetButton}
        </div>
        <p className="mt-2 text-xs leading-5 text-zinc-600 dark:text-zinc-300">
          {focus}
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {hops.map((item, index) => (
            <button
              key={item.label}
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
              {item.label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="border border-amber-500 bg-amber-50 p-3 text-xs leading-5 dark:bg-amber-950/20">
            <strong>请求</strong>
            <pre className="mt-2 whitespace-pre-wrap font-mono">
              {hop.request}
            </pre>
          </div>
          <div className="border border-emerald-500 bg-emerald-50 p-3 text-xs leading-5 dark:bg-emerald-950/20">
            <strong>响应/状态</strong>
            <pre className="mt-2 whitespace-pre-wrap font-mono">
              {hop.response}
            </pre>
          </div>
        </div>
        <p className="mt-4 border-l-4 border-cyan-600 bg-cyan-50 p-3 text-xs leading-5 dark:bg-cyan-950/20">
          <b>不变量：</b>
          {invariant}
        </p>
      </section>
    );
  }

  if (mode === "decision") {
    return (
      <section className={shell} aria-label={title + "缓存决策实验"}>
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">
            单变量缓存与连接实验
          </p>
          {resetButton}
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="text-xs font-semibold">
            当前年龄：{age}s
            <input
              className="mt-2 w-full accent-cyan-700"
              type="range"
              min={0}
              max={300}
              step={5}
              value={age}
              onChange={(event) => setAge(Number(event.target.value))}
            />
          </label>
          <label className="text-xs font-semibold">
            新鲜寿命：{lifetime}s
            <input
              className="mt-2 w-full accent-emerald-700"
              type="range"
              min={0}
              max={300}
              step={5}
              value={lifetime}
              onChange={(event) => setLifetime(Number(event.target.value))}
            />
          </label>
        </div>
        <label className="mt-4 flex min-h-10 items-center gap-2 text-xs font-semibold">
          <input
            type="checkbox"
            checked={validator}
            onChange={(event) => setValidator(event.target.checked)}
          />
          存在ETag或Last-Modified验证器
        </label>
        <div className="mt-4 border border-emerald-500 bg-emerald-50 p-3 text-sm dark:bg-emerald-950/20">
          <strong>{cache.label}</strong>
          <p className="mt-1 text-xs">{cache.action}</p>
        </div>
        <p className="mt-4 border-l-4 border-rose-600 bg-rose-50 p-3 text-xs leading-5 dark:bg-rose-950/20">
          <b>反例：</b>
          {failure}
          <br />
          <b>纪律：</b>每轮只改变一个首部、连接或缓存条件，保存原始报文。
        </p>
      </section>
    );
  }

  const complete = checked.filter(Boolean).length;
  return (
    <section className={shell} aria-label={title + "HTTP证据门实验"}>
      <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
        独立事务证据门
      </p>
      <div className="mt-1 flex items-center justify-between gap-3">
        <h3 className="text-base font-semibold">{title}</h3>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold">
            {complete}/{gates.length}
          </span>
          {resetButton}
        </div>
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
          ? "证据完整，可以由第三方复现。"
          : "结论暂不通过：仍缺HTTP事务证据。"}
        <br />
        {invariant}
      </p>
    </section>
  );
}
