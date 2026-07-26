"use client";

import { useMemo, useState } from "react";

type AnimationLabProps = {
  title: string;
  label: string;
  nodes: readonly string[];
  accent: "cyan" | "amber" | "rose";
  mode: "map" | "experiment" | "evidence";
};

const accents = {
  cyan: { strong: "#0891b2", soft: "#cffafe", ink: "#164e63" },
  amber: { strong: "#d97706", soft: "#fef3c7", ink: "#78350f" },
  rose: { strong: "#e11d48", soft: "#ffe4e6", ink: "#881337" },
};

export function OfficialAnimationLab({
  title,
  label,
  nodes,
  accent,
  mode,
}: AnimationLabProps) {
  const [time, setTime] = useState(42);
  const [fault, setFault] = useState(false);
  function resetExperiment() {
    setTime(42);
    setFault(false);
  }

  const color = accents[accent];
  const activeIndex = Math.min(
    nodes.length - 1,
    Math.floor((time / 101) * nodes.length),
  );
  const sample = useMemo(() => {
    const normalized = time / 100;
    const eased = normalized * normalized * (3 - 2 * normalized);
    return {
      normalized: normalized.toFixed(2),
      eased: eased.toFixed(2),
      error: fault ? (0.08 + normalized * 0.17).toFixed(3) : "0.000",
    };
  }, [fault, time]);

  return (
    <section
      className="my-6 overflow-hidden rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-950"
      aria-label={title}
    >
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 px-4 py-3 dark:border-zinc-700">
        <div>
          <p className="text-xs font-semibold uppercase text-zinc-500">
            {label} · {mode}
          </p>
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            {title}
          </h3>
        </div>
        <button
          type="button"
          onClick={() => setFault((value) => !value)}
          className="min-h-11 rounded border px-3 text-sm font-medium"
          style={{
            borderColor: color.strong,
            color: color.ink,
            background: fault ? color.soft : "transparent",
          }}
        >
          {fault ? "恢复正常" : "注入故障"}
        </button>
      </header>

      <div className="grid gap-0 lg:grid-cols-[1fr_240px]">
        <div className="p-4">
          <div
            className="grid gap-2"
            style={{
              gridTemplateColumns:
                "repeat(" + nodes.length + ", minmax(0, 1fr))",
            }}
          >
            {nodes.map((node, index) => (
              <div
                key={node}
                className="relative min-h-24 border p-2 text-center text-xs"
                style={{
                  borderColor: index === activeIndex ? color.strong : "#d4d4d8",
                  background: index <= activeIndex ? color.soft : "transparent",
                  color: index === activeIndex ? color.ink : undefined,
                }}
              >
                <div
                  className="mx-auto mb-2 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{
                    background: index <= activeIndex ? color.strong : "#71717a",
                  }}
                >
                  {index + 1}
                </div>
                <span className="break-words leading-5">{node}</span>
                {index < nodes.length - 1 ? (
                  <span
                    className="absolute -right-2 top-10 z-10 text-base"
                    style={{ color: color.strong }}
                  >
                    →
                  </span>
                ) : null}
              </div>
            ))}
          </div>

          <label className="mt-5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            归一化时间 {sample.normalized}
            <input
              className="mt-2 block w-full"
              type="range"
              min="0"
              max="100"
              value={time}
              onChange={(event) => setTime(Number(event.target.value))}
            />
          </label>
        </div>

        <aside className="border-t border-zinc-200 bg-zinc-50 p-4 text-sm lg:border-l lg:border-t-0 dark:border-zinc-700 dark:bg-zinc-900">
          <p className="font-semibold text-zinc-900 dark:text-zinc-100">
            当前证据
          </p>
          <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2">
            <dt className="text-zinc-500">节点</dt>
            <dd className="text-right font-medium">
              {activeIndex + 1}/{nodes.length}
            </dd>
            <dt className="text-zinc-500">曲线值</dt>
            <dd className="text-right font-mono">{sample.eased}</dd>
            <dt className="text-zinc-500">误差</dt>
            <dd
              className="text-right font-mono"
              style={{ color: fault ? "#be123c" : "#15803d" }}
            >
              {sample.error}
            </dd>
            <dt className="text-zinc-500">状态</dt>
            <dd className="text-right font-medium">
              {fault ? "需诊断" : "可签发"}
            </dd>
          </dl>
          <div className="mt-4 h-24 border border-zinc-300 bg-white p-2 dark:border-zinc-700 dark:bg-zinc-950">
            <div className="relative h-full overflow-hidden">
              <div
                className="absolute bottom-2 h-3 w-3 rounded-full"
                style={{
                  left: Math.max(2, time - 2) + "%",
                  background: fault ? "#e11d48" : color.strong,
                }}
              />
              <div className="absolute bottom-3 left-0 right-0 border-t border-dashed border-zinc-400" />
              <div
                className="absolute bottom-3 left-0 h-12 border-l-2"
                style={{
                  width: time + "%",
                  borderColor: color.strong,
                  transform: "skewY(" + (-18 + time * 0.18) + "deg)",
                  transformOrigin: "bottom left",
                }}
              />
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
