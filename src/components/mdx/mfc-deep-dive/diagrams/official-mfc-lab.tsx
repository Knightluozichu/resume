"use client";

import { useMemo, useState } from "react";

type Props = {
  title: string;
  label: string;
  color: string;
  soft: string;
  chain: readonly string[];
  concepts: readonly string[];
  view: "map" | "experiment" | "evidence";
};

const modes = {
  baseline: "基线",
  boundary: "边界",
  wrongClass: "类不匹配",
  missingMacro: "缺失宏",
  unhandledMessage: "消息未处理",
  archiveMismatch: "档案不匹配",
  recovery: "恢复",
} as const;

export function OfficialMfcLab({
  title,
  label,
  color,
  soft,
  chain,
  concepts,
  view,
}: Props) {
  const [mode, setMode] = useState<keyof typeof modes>(
    view === "experiment"
      ? "missingMacro"
      : view === "evidence"
        ? "recovery"
        : "baseline",
  );
  const [stage, setStage] = useState(
    view === "evidence" ? chain.length - 1 : 0,
  );
  const [messages, setMessages] = useState(6);
  const [showInternals, setShowInternals] = useState(view !== "map");
  function resetExperiment() {
    setMode(view === "experiment"
      ? "missingMacro"
      : view === "evidence"
        ? "recovery"
        : "baseline");
    setStage(view === "evidence" ? chain.length - 1 : 0);
    setMessages(6);
    setShowInternals(view !== "map");
  }

  const evidence = useMemo(() => {
    const failed =
      mode === "wrongClass" ||
      mode === "missingMacro" ||
      mode === "unhandledMessage" ||
      mode === "archiveMismatch";
    const handled = failed ? Math.max(0, messages - (stage + 1)) : messages;
    return {
      objects: stage + 3,
      handled,
      fallbacks: mode === "boundary" ? 1 : failed ? stage + 1 : 0,
      firstDivergence: failed
        ? modes[mode]
        : mode === "boundary"
          ? "默认路径"
          : "无",
      status:
        mode === "recovery" && showInternals
          ? "通过"
          : mode === "baseline"
            ? "基线"
            : "验证中",
    };
  }, [messages, mode, showInternals, stage]);

  return (
    <section
      className="my-6 overflow-hidden border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-950"
      aria-label={title}
    >
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 px-4 py-3 dark:border-zinc-700">
        <div>
          <p className="text-xs font-semibold text-zinc-500">{label}</p>
          <h3 className="mt-1 text-base font-semibold">{title}</h3>
        </div>
        <label className="flex items-center gap-2 text-xs font-semibold">
          <input
            type="checkbox"
            checked={showInternals}
            onChange={(event) => setShowInternals(event.target.checked)}
          />
          展开内部机制
        </label>
      </header>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_304px]">
        <div className="p-4">
          <div
            className="mb-4 flex flex-wrap gap-2"
            role="group"
            aria-label="MFC故障模式"
          >
            {(Object.keys(modes) as Array<keyof typeof modes>).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setMode(item)}
                className="min-h-11 border px-3 text-xs font-semibold"
                style={{
                  borderColor: mode === item ? color : "#d4d4d8",
                  background: mode === item ? soft : "transparent",
                  color: mode === item ? color : undefined,
                }}
              >
                {modes[item]}
              </button>
            ))}
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            {[
              ["活动对象", evidence.objects],
              ["已处理消息", evidence.handled],
              ["回退次数", evidence.fallbacks],
            ].map(([name, value]) => (
              <div
                key={name}
                className="border p-3"
                style={{ borderColor: color }}
              >
                <p className="text-xs text-zinc-500">{name}</p>
                <p className="mt-1 text-xl font-bold">{value}</p>
              </div>
            ))}
          </div>
          <ol className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {chain.map((node, index) => (
              <li key={node}>
                <button
                  type="button"
                  onClick={() => setStage(index)}
                  className="flex min-h-20 w-full items-start gap-3 border p-3 text-left"
                  style={{
                    borderColor: index === stage ? color : "#d4d4d8",
                    background: index === stage ? soft : "transparent",
                  }}
                >
                  <span
                    className="flex size-6 shrink-0 items-center justify-center border text-xs font-bold"
                    style={{ borderColor: color }}
                  >
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium">{node}</span>
                </button>
              </li>
            ))}
          </ol>
          <label className="mt-5 block text-xs font-semibold">
            消息/对象样本：{messages}
            <input
              type="range"
              min="1"
              max="16"
              value={messages}
              onChange={(event) => setMessages(Number(event.target.value))}
              className="mt-2 block w-full"
            />
          </label>
        </div>
        <aside className="border-t border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900 lg:border-l lg:border-t-0">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-sm font-semibold">机制证据</h4>
            <span
              className="border px-2 py-1 text-xs font-bold"
              style={{
                borderColor: evidence.status === "通过" ? "#15803d" : color,
                color: evidence.status === "通过" ? "#166534" : color,
                background: evidence.status === "通过" ? "#dcfce7" : soft,
              }}
            >
              {evidence.status}
            </span>
          </div>
          <dl className="mt-4 grid gap-3 text-sm">
            <div>
              <dt className="text-xs text-zinc-500">当前阶段</dt>
              <dd className="mt-1 font-medium">{chain[stage]}</dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-500">目录证据</dt>
              <dd className="mt-1 font-medium">
                {concepts[(stage + messages) % concepts.length]}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-500">首个分叉</dt>
              <dd className="mt-1 font-medium">{evidence.firstDivergence}</dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-500">内部视图</dt>
              <dd className="mt-1 font-medium">
                {showInternals ? "类链、表项与Win32底层" : "仅框架表面"}
              </dd>
            </div>
          </dl>
          <p className="mt-4 border-t border-zinc-200 pt-3 text-xs leading-5 text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
            从宏和向导向下追到类表、消息、句柄与线程，并在首个因果分叉停下。
          </p>
        </aside>
      </div>
    </section>
  );
}
