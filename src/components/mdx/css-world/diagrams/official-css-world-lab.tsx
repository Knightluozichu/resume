"use client";

import { useMemo, useState } from "react";

type Mode = "map" | "experiment" | "evidence";
type Sample = "normal" | "narrow" | "overflow" | "recovery";
type Props = {
  title: string;
  label: string;
  nodes: readonly string[];
  mode: Mode;
};

const labels: Record<Sample, string> = {
  normal: "正常",
  narrow: "窄宽",
  overflow: "溢出",
  recovery: "恢复",
};
const colors: Record<Mode, { strong: string; soft: string; ink: string }> = {
  map: { strong: "#2563eb", soft: "#dbeafe", ink: "#1e3a8a" },
  experiment: { strong: "#059669", soft: "#d1fae5", ink: "#065f46" },
  evidence: { strong: "#ca8a04", soft: "#fef9c3", ink: "#713f12" },
};

export function CssWorldLab({ title, label, nodes, mode }: Props) {
  const [stage, setStage] = useState(0);
  const [sample, setSample] = useState<Sample>("normal");
  const [width, setWidth] = useState(68);
  const [fault, setFault] = useState(false);
  const color = colors[mode];
  const evidence = useMemo(() => {
    const pressure =
      sample === "normal"
        ? 0
        : sample === "narrow"
          ? 14
          : sample === "overflow"
            ? 32
            : 4;
    const usedWidth = Math.max(18, width - pressure - (fault ? 18 : 0));
    const lineBoxes = Math.max(1, Math.ceil((56 + pressure) / usedWidth));
    const contexts = 1 + stage + (fault ? 2 : 0);
    const divergence =
      sample === "overflow" || fault
        ? nodes[Math.min(stage, nodes.length - 1)]
        : "无";
    return { usedWidth, lineBoxes, contexts, divergence };
  }, [fault, nodes, sample, stage, width]);
  const pass =
    evidence.usedWidth >= 24 &&
    evidence.lineBoxes <= 4 &&
    evidence.divergence === "无";

  return (
    <section
      className="my-6 overflow-hidden border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-950"
      aria-label={title}
    >
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 px-4 py-3 dark:border-zinc-700">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-zinc-500">{label}</p>
          <h3 className="mt-1 text-base font-semibold">{title}</h3>
        </div>
        <button
          type="button"
          onClick={() => setFault((value) => !value)}
          className="min-h-9 border px-3 text-sm font-medium"
          style={{
            borderColor: fault ? "#dc2626" : color.strong,
            color: fault ? "#991b1b" : color.ink,
            background: fault ? "#fee2e2" : "transparent",
          }}
        >
          {fault ? "删除故障声明" : "注入故障声明"}
        </button>
      </header>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="p-4">
          <div
            className="mb-4 flex flex-wrap gap-2"
            role="group"
            aria-label="样本选择"
          >
            {(["normal", "narrow", "overflow", "recovery"] as const).map(
              (item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSample(item)}
                  className="min-h-9 border px-3 text-xs font-semibold"
                  style={{
                    borderColor: sample === item ? color.strong : "#d4d4d8",
                    background: sample === item ? color.soft : "transparent",
                    color: sample === item ? color.ink : undefined,
                  }}
                >
                  {labels[item]}
                </button>
              ),
            )}
          </div>
          <div
            className="border border-zinc-300 p-3 dark:border-zinc-700"
            style={{ width: Math.max(36, width) + "%" }}
          >
            <div
              className="border-4 p-3"
              style={{ borderColor: color.strong, background: color.soft }}
            >
              <div
                className="min-h-16 border border-dashed p-2 text-sm"
                style={{ borderColor: color.ink }}
              >
                内容盒 · {evidence.usedWidth} 单位 · {evidence.lineBoxes} 个行框
              </div>
            </div>
          </div>
          <ol className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {nodes.map((node, index) => (
              <li key={node}>
                <button
                  type="button"
                  onClick={() => setStage(index)}
                  className="flex min-h-20 w-full items-start gap-3 border p-3 text-left"
                  style={{
                    borderColor: index === stage ? color.strong : "#d4d4d8",
                    background: index === stage ? color.soft : "transparent",
                  }}
                >
                  <span
                    className="flex size-6 shrink-0 items-center justify-center border text-xs font-bold"
                    style={{ borderColor: color.strong }}
                  >
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium">{node}</span>
                </button>
              </li>
            ))}
          </ol>
          <label className="mt-5 block text-xs font-semibold">
            包含块宽度：{width}%
            <input
              type="range"
              min="36"
              max="100"
              step="4"
              value={width}
              onChange={(event) => setWidth(Number(event.target.value))}
              className="mt-2 block w-full"
            />
          </label>
        </div>
        <aside className="border-t border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900 lg:border-l lg:border-t-0">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-sm font-semibold">CSS 证据摘要</h4>
            <span
              className="border px-2 py-1 text-xs font-bold"
              style={{
                borderColor: pass ? "#16a34a" : "#dc2626",
                color: pass ? "#166534" : "#991b1b",
                background: pass ? "#dcfce7" : "#fee2e2",
              }}
            >
              {pass ? "通过" : "阻断"}
            </span>
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="border bg-white p-3 dark:bg-zinc-950">
              <dt className="text-xs text-zinc-500">使用宽度</dt>
              <dd className="mt-1 text-lg font-semibold">
                {evidence.usedWidth}
              </dd>
            </div>
            <div className="border bg-white p-3 dark:bg-zinc-950">
              <dt className="text-xs text-zinc-500">行框数量</dt>
              <dd className="mt-1 text-lg font-semibold">
                {evidence.lineBoxes}
              </dd>
            </div>
            <div className="border bg-white p-3 dark:bg-zinc-950">
              <dt className="text-xs text-zinc-500">上下文数</dt>
              <dd className="mt-1 text-lg font-semibold">
                {evidence.contexts}
              </dd>
            </div>
            <div className="border bg-white p-3 dark:bg-zinc-950">
              <dt className="text-xs text-zinc-500">首偏离点</dt>
              <dd className="mt-1 break-words font-semibold">
                {evidence.divergence}
              </dd>
            </div>
          </dl>
          <p className="mt-4 text-xs leading-5 text-zinc-600 dark:text-zinc-300">
            切换内容和包含块宽度，观察盒、行框与层叠上下文。恢复样本必须删除故障声明后重放同一
            DOM。
          </p>
        </aside>
      </div>
    </section>
  );
}
