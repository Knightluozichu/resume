"use client";

import { useState } from "react";

const NODES = [
  { id: "input", label: "外部输入", detail: "格式、范围、关联" },
  { id: "boundary", label: "边界校验", detail: "拒绝或转成错误" },
  { id: "assertion", label: "内部断言", detail: "不变量必须成立" },
  { id: "containment", label: "错误隔离", detail: "限制影响范围" },
  { id: "safe", label: "安全结果", detail: "状态可恢复、可重放" },
] as const;

const FOCI = {
  input: 0,
  assertion: 2,
  recovery: 3,
} as const;

type Focus = keyof typeof FOCI;

export function Cc2e08DefensiveProgrammingMechanismLab({
  focus = "input",
}: {
  focus?: Focus;
}) {
  const initialIndex = FOCI[focus] ?? 0;
  const [activeIndex, setActiveIndex] = useState<number>(initialIndex);
  const [invalidInput, setInvalidInput] = useState(false);
  const [brokenInvariant, setBrokenInvariant] = useState(false);
  const [probeSize, setProbeSize] = useState(6);

  const faultIndex = invalidInput ? 1 : brokenInvariant ? 2 : 4;
  const hasFault = invalidInput || brokenInvariant;
  const firstDeviation = invalidInput
    ? "边界校验：无效输入被拒绝，内部状态保持基线"
    : brokenInvariant
      ? "内部断言：不变量破坏被暴露，错误没有越过隔离区"
      : "安全结果：输入、状态与失败出口都可复核";
  const reset = () => {
    setActiveIndex(initialIndex);
    setInvalidInput(false);
    setBrokenInvariant(false);
    setProbeSize(6);
  };

  return (
    <section
      aria-label="第8章：防御式编程专属因果实验"
      data-visual-kind="cc2e-08-defensive-programming-mechanism"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border p-5">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            第8章 · 最近边界的失败证据
          </p>
          <h3 className="mt-2 text-lg font-semibold text-primary">
            防御式编程机制实验
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
            先选一个节点，再只打开一种故障；观察首个偏离是否被拒绝、暴露、隔离，最后用重置回到同一基线。
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          aria-label="重置防御式编程机制实验"
          className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
        >
          重置实验
        </button>
      </header>

      <div className="min-w-0 p-5">
        <div
          className="grid min-w-0 gap-2 sm:grid-cols-5"
          aria-label="选择机制节点"
        >
          {NODES.map((node, index) => (
            <button
              key={node.id}
              type="button"
              aria-pressed={activeIndex === index}
              onClick={() => setActiveIndex(index)}
              className={`min-h-11 min-w-0 rounded-control border px-2 py-2 text-left text-xs transition-colors ${
                activeIndex === index
                  ? "border-accent bg-accent/10 text-primary"
                  : "border-border bg-surface text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              <span className="block font-semibold">{node.label}</span>
              <span className="mt-1 block text-[11px] opacity-75">
                {node.detail}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
          <div className="min-w-0 rounded-control border border-border bg-surface p-3">
            <svg
              viewBox="0 0 760 300"
              role="img"
              aria-label="外部输入经过边界校验、内部断言和错误隔离后得到安全结果的状态图"
              className="h-auto w-full"
            >
              <defs>
                <marker
                  id="cc2e08-arrow"
                  markerWidth="8"
                  markerHeight="8"
                  refX="7"
                  refY="3.5"
                  orient="auto"
                >
                  <path d="M0,0 L7,3.5 L0,7 z" fill="var(--muted)" />
                </marker>
              </defs>
              <text
                x="24"
                y="24"
                fontSize="12"
                fontWeight="700"
                fill="var(--muted)"
              >
                首个偏离：{hasFault ? NODES[faultIndex]?.label : "无"}
              </text>
              {NODES.map((node, index) => {
                const x = 18 + index * 148;
                const isActive = activeIndex === index;
                const isFault = hasFault && index === faultIndex;
                return (
                  <g key={node.id}>
                    {index < NODES.length - 1 ? (
                      <line
                        x1={x + 124}
                        y1="125"
                        x2={x + 140}
                        y2="125"
                        stroke="var(--muted)"
                        strokeWidth="2"
                        markerEnd="url(#cc2e08-arrow)"
                      />
                    ) : null}
                    <rect
                      x={x}
                      y="82"
                      width="124"
                      height="86"
                      rx="12"
                      fill={
                        isFault
                          ? "color-mix(in srgb, var(--danger) 12%, var(--bg))"
                          : "var(--bg)"
                      }
                      stroke={
                        isFault
                          ? "var(--danger)"
                          : isActive
                            ? "var(--accent)"
                            : "var(--border)"
                      }
                      strokeWidth={isFault || isActive ? "2" : "1"}
                    />
                    <text
                      x={x + 12}
                      y="112"
                      fontSize="12"
                      fontWeight="700"
                      fill={isFault ? "var(--danger)" : "var(--text)"}
                    >
                      {node.label}
                    </text>
                    <text x={x + 12} y="135" fontSize="11" fill="var(--muted)">
                      {node.detail}
                    </text>
                    <text
                      x={x + 12}
                      y="155"
                      fontSize="11"
                      fill={isFault ? "var(--danger)" : "var(--muted)"}
                    >
                      {isFault
                        ? "首个偏离"
                        : isActive
                          ? "当前观察"
                          : `节点 ${index + 1}`}
                    </text>
                  </g>
                );
              })}
              <path
                d="M92 215 C190 260 420 260 610 215"
                fill="none"
                stroke={hasFault ? "var(--danger)" : "var(--success)"}
                strokeWidth="2"
                strokeDasharray={hasFault ? "7 5" : undefined}
              />
              <text
                x="24"
                y="280"
                fontSize="12"
                fill={hasFault ? "var(--danger)" : "var(--success)"}
              >
                {hasFault
                  ? "失败被限制：状态没有偷偷继续向后扩散"
                  : "基线闭合：可从输入重建安全结果"}
              </text>
            </svg>
          </div>

          <div className="min-w-0 space-y-3">
            <fieldset className="rounded-control border border-border bg-surface p-3">
              <legend className="px-1 text-xs font-semibold text-primary">
                注入一个观察条件
              </legend>
              <label className="mt-2 flex min-h-11 cursor-pointer items-center gap-2 text-sm text-secondary">
                <input
                  type="checkbox"
                  checked={invalidInput}
                  onChange={(event) => setInvalidInput(event.target.checked)}
                  className="size-4 accent-accent"
                />
                无效输入
              </label>
              <label className="flex min-h-11 cursor-pointer items-center gap-2 text-sm text-secondary">
                <input
                  type="checkbox"
                  checked={brokenInvariant}
                  onChange={(event) => setBrokenInvariant(event.target.checked)}
                  className="size-4 accent-accent"
                />
                内部状态故障
              </label>
              <label
                className="mt-2 block text-xs text-secondary"
                htmlFor="cc2e08-probe-size"
              >
                无效数据数量：{probeSize} 项
              </label>
              <input
                id="cc2e08-probe-size"
                type="range"
                min="0"
                max="36"
                value={probeSize}
                onChange={(event) => setProbeSize(Number(event.target.value))}
                className="mt-2 w-full accent-accent"
              />
            </fieldset>

            <div
              role="status"
              className={`rounded-control border px-3 py-3 text-sm ${
                hasFault
                  ? "border-danger/50 text-danger"
                  : "border-success/50 text-success"
              }`}
            >
              {firstDeviation}
            </div>
            <div className="rounded-control border border-border bg-surface px-3 py-3 text-xs leading-5 text-secondary">
              诊断读数：{probeSize} 项输入 ·{" "}
              {brokenInvariant ? "1 处不变量破坏" : "0 处不变量破坏"} ·{" "}
              {invalidInput ? "拒绝外部数据" : "输入仍在基线"}
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs leading-5 text-secondary">
          当前观察：
          <span className="font-semibold text-primary">
            {NODES[activeIndex]?.label}
          </span>
          。把故障开关逐个打开，比较首个偏离与最终结果；两种故障同时打开时，优先记录输入边界，再判断内部状态。
        </p>
      </div>
    </section>
  );
}
