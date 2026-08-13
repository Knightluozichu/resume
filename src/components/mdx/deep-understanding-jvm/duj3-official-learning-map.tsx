"use client";

import { useEffect, useId, useState } from "react";

const COLORS = {
  background: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
} as const;

const STAGES = [
  { key: "spec", label: "规范合同", detail: "JLS / JVMS" },
  { key: "class", label: "Class 结构", detail: "常量池与描述符" },
  { key: "runtime", label: "运行时状态", detail: "加载、内存、线程" },
  { key: "hotspot", label: "HotSpot 实现", detail: "源码与构建" },
  { key: "tools", label: "工具观测", detail: "javap / jcmd / JFR" },
  { key: "handoff", label: "交付决策", detail: "重放与责任" },
] as const;

type Lens = "boundary" | "failure" | "replay";

const LENSES: Record<Lens, { label: string; title: string; note: string }> = {
  boundary: {
    label: "边界",
    title: "先标注结论属于哪一层",
    note: "规范约束不能替代实现源码，工具输出也不能替代版本账本。",
  },
  failure: {
    label: "故障",
    title: "沿首个分叉回溯",
    note: "最后出现的异常只是信号；把源码、参数和权限的第一个变化单独留下。",
  },
  replay: {
    label: "重放",
    title: "用相同输入完成交接",
    note: "恢复后要复核工件、资源、日志和业务结果，而不是只看进程重新在线。",
  },
};

export function Duj3OfficialLearningMapEvidenceMap() {
  const [activeStage, setActiveStage] = useState(0);
  const [lens, setLens] = useState<Lens>("boundary");
  const [faultInjected, setFaultInjected] = useState(false);
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `duj3-map-arrow-${instanceId}`;

  useEffect(() => {
    const handleStepperReset = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      if (!target.closest('button[aria-label="重置分步演示"]')) return;
      setActiveStage(0);
      setLens("boundary");
      setFaultInjected(false);
    };

    document.addEventListener("click", handleStepperReset, true);
    return () =>
      document.removeEventListener("click", handleStepperReset, true);
  }, []);

  const stage = STAGES[activeStage] ?? STAGES[0];
  const lensState = LENSES[lens];
  const outcomeColor = faultInjected ? COLORS.warning : COLORS.success;
  const outcomeTitle = faultInjected
    ? "首个分叉：证据边界被跳过"
    : lensState.title;
  const outcomeNote = faultInjected
    ? "先保存未过滤输出与环境账本，再恢复到同一输入；不要把黄色状态解释成规范改变。"
    : lensState.note;

  function reset() {
    setActiveStage(0);
    setLens("boundary");
    setFaultInjected(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="duj3-official-learning-map-evidence"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              DUJ3 · 282 节点跨层路线台
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              从规范合同走到可交接证据
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              《深入理解Java虚拟机（第3版）》的学习地图用同一条轨迹连接规范、Class、运行时、HotSpot、工具与交付；选择观察镜头，再注入一个可逆故障。
            </p>
          </div>
          <button
            type="button"
            aria-label="重置分步演示"
            onClick={reset}
            className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
          >
            重置
          </button>
        </div>

        <div className="mb-4 grid gap-3 md:grid-cols-[1fr_auto]">
          <div className="flex flex-wrap gap-2" aria-label="选择证据镜头">
            <span className="self-center text-xs text-secondary">镜头：</span>
            {(Object.entries(LENSES) as [Lens, (typeof LENSES)[Lens]][]).map(
              ([value, item]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={lens === value}
                  onClick={() => setLens(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors ${
                    lens === value
                      ? "border-accent text-accent"
                      : "border-border text-secondary hover:border-accent hover:text-primary"
                  }`}
                >
                  {item.label}
                </button>
              ),
            )}
          </div>
          <button
            type="button"
            aria-pressed={faultInjected}
            onClick={() => setFaultInjected((value) => !value)}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors ${
              faultInjected
                ? "border-warning text-warning"
                : "border-border text-secondary hover:border-warning hover:text-warning"
            }`}
          >
            {faultInjected ? "清除故障" : "注入故障"}
          </button>
        </div>

        <div className="mb-4 flex flex-wrap gap-2" aria-label="选择证据阶段">
          {STAGES.map((item, index) => (
            <button
              key={item.key}
              type="button"
              aria-pressed={activeStage === index}
              onClick={() => setActiveStage(index)}
              className={`min-h-11 rounded-control border px-3 py-2 text-left text-xs transition-colors ${
                activeStage === index
                  ? "border-accent text-accent"
                  : "border-border text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              <span className="block font-semibold">
                {index + 1}. {item.label}
              </span>
              <span className="mt-0.5 block text-[11px] text-secondary">
                {item.detail}
              </span>
            </button>
          ))}
        </div>

        <svg
          viewBox="0 0 620 760"
          role="img"
          aria-label={`深入理解Java虚拟机（第3版）证据路线图：当前阶段为${stage.label}，镜头为${lensState.label}，${faultInjected ? "已注入故障" : "处于基线"}。路线连接规范合同、Class结构、运行时状态、HotSpot实现、工具观测和交付决策。`}
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id={arrowId}
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="4"
              orient="auto"
            >
              <path d="M0,0 L7,4 L0,8 Z" fill={COLORS.border} />
            </marker>
          </defs>
          <rect
            x="0"
            y="0"
            width="620"
            height="760"
            rx="16"
            fill={COLORS.background}
          />
          <text
            x="310"
            y="32"
            textAnchor="middle"
            fontSize="17"
            fontWeight="700"
            fill={COLORS.primary}
          >
            规范 → Class → 运行时 → HotSpot → 工具 → 交付
          </text>
          <text
            x="310"
            y="55"
            textAnchor="middle"
            fontSize="12"
            fill={COLORS.secondary}
          >
            证据路线，不是把目录标题伪装成完成证明
          </text>

          {STAGES.map((item, index) => {
            const y = 82 + index * 80;
            const selected = index === activeStage;
            const fill = selected ? COLORS.accent : COLORS.elevated;
            const textColor = selected ? COLORS.background : COLORS.primary;
            return (
              <g key={item.key}>
                {index < STAGES.length - 1 ? (
                  <line
                    x1="310"
                    y1={y + 58}
                    x2="310"
                    y2={y + 77}
                    stroke={COLORS.border}
                    strokeWidth="2"
                    markerEnd={`url(#${arrowId})`}
                  />
                ) : null}
                <rect
                  x="70"
                  y={y}
                  width="480"
                  height="58"
                  rx="10"
                  fill={fill}
                  fillOpacity={selected ? "0.92" : "1"}
                  stroke={selected ? COLORS.accent : COLORS.border}
                  strokeWidth={selected ? "2" : "1"}
                />
                <circle
                  cx="101"
                  cy={y + 29}
                  r="16"
                  fill={selected ? COLORS.background : COLORS.accent}
                  fillOpacity="0.16"
                  stroke={selected ? COLORS.background : COLORS.accent}
                />
                <text
                  x="101"
                  y={y + 34}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={selected ? COLORS.background : COLORS.accent}
                >
                  {index + 1}
                </text>
                <text
                  x="130"
                  y={y + 25}
                  fontSize="13"
                  fontWeight="700"
                  fill={textColor}
                >
                  {item.label}
                </text>
                <text
                  x="130"
                  y={y + 44}
                  fontSize="12"
                  fill={selected ? COLORS.background : COLORS.secondary}
                >
                  {item.detail}
                </text>
                {selected ? (
                  <circle
                    cx="526"
                    cy={y + 29}
                    r="6"
                    fill={faultInjected ? COLORS.warning : COLORS.success}
                  />
                ) : null}
              </g>
            );
          })}

          <rect
            x="70"
            y="585"
            width="480"
            height="112"
            rx="12"
            fill={COLORS.elevated}
            stroke={outcomeColor}
            strokeWidth="1.5"
          />
          <text
            x="94"
            y="613"
            fontSize="13"
            fontWeight="700"
            fill={outcomeColor}
          >
            {faultInjected ? "故障窗口" : "当前判定"} · {lensState.label}
          </text>
          <text
            x="94"
            y="638"
            fontSize="13"
            fontWeight="700"
            fill={COLORS.primary}
          >
            {outcomeTitle}
          </text>
          <text x="94" y="660" fontSize="12" fill={COLORS.secondary}>
            {outcomeNote}
          </text>
          <text x="94" y="682" fontSize="12" fill={COLORS.secondary}>
            当前证据出口：{stage.label} · {stage.detail}
          </text>
        </svg>

        <p className="mt-3 text-center text-sm text-secondary">
          操作顺序：选阶段 → 选镜头 → 注入或清除故障 →
          重置；每次改变都应写入版本账本。
        </p>
      </div>
    </figure>
  );
}
