"use client";

import { useState } from "react";

type Focus = "pipeline" | "light" | "hardware";

const FOCI: readonly { id: Focus; label: string; detail: string }[] = [
  {
    id: "pipeline",
    label: "管线交接",
    detail: "命令与数据在阶段之间交接，先定位首个不一致再改代码。",
  },
  {
    id: "light",
    label: "光与能量",
    detail: "辐射度量描述能量，反射率描述表面留下多少；两者不能混作亮度滑杆。",
  },
  {
    id: "hardware",
    label: "硬件与等待",
    detail: "现代图形硬件用并行性隐藏部分内存延迟，但等待仍会出现在依赖边界。",
  },
];

const COLORS = {
  accent: "var(--accent)",
  border: "var(--border)",
  elevated: "var(--bg-elevated)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  success: "var(--success)",
  warning: "var(--warning)",
} as const;

function FocusButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`min-h-11 rounded-control border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
        active
          ? "border-accent bg-accent/10 text-primary"
          : "border-border bg-background text-secondary hover:border-accent hover:text-primary"
      }`}
    >
      {children}
    </button>
  );
}

function PipelineScene() {
  const nodes = [
    { x: 52, label: "应用", detail: "命令" },
    { x: 218, label: "几何", detail: "顶点" },
    { x: 384, label: "着色", detail: "属性" },
    { x: 550, label: "光栅", detail: "片段" },
    { x: 674, label: "帧缓冲", detail: "结果" },
  ];
  return (
    <g>
      <text x="28" y="34" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        Graphics Pipeline：每个阶段都要交付证据
      </text>
      {nodes.slice(0, -1).map((node, index) => (
        <line
          key={node.label}
          x1={node.x + 112}
          y1="146"
          x2={nodes[index + 1].x - 12}
          y2="146"
          stroke={COLORS.accent}
          strokeWidth="3"
          markerEnd="url(#cgpp-ch02-arrow)"
        />
      ))}
      {nodes.map((node, index) => (
        <g key={node.label}>
          <rect
            x={node.x}
            y="104"
            width={index === nodes.length - 1 ? 84 : 112}
            height="84"
            rx="12"
            fill={index === 0 ? "var(--bg)" : COLORS.elevated}
            stroke={index === nodes.length - 1 ? COLORS.success : COLORS.border}
            strokeWidth="2"
          />
          <circle
            cx={node.x + 22}
            cy="128"
            r="9"
            fill={index < 3 ? COLORS.accent : COLORS.success}
          />
          <text
            x={node.x + 42}
            y="134"
            fontSize="15"
            fontWeight="700"
            fill={COLORS.primary}
          >
            {node.label}
          </text>
          <text x={node.x + 22} y="166" fontSize="13" fill={COLORS.secondary}>
            {node.detail}
          </text>
        </g>
      ))}
      <text x="28" y="248" fontSize="14" fill={COLORS.secondary}>
        记录输入、输出和首个偏离点，才能区分管线故障与资源等待。
      </text>
      <text x="28" y="282" fontSize="13" fill={COLORS.warning}>
        不要把“帧缓冲为空”直接当成几何错误。
      </text>
    </g>
  );
}

function LightScene() {
  return (
    <g>
      <text x="28" y="34" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        Light：从能量到可观察信号
      </text>
      <circle
        cx="120"
        cy="142"
        r="32"
        fill={COLORS.warning}
        opacity="0.5"
        stroke={COLORS.warning}
        strokeWidth="3"
      />
      <text x="88" y="148" fontSize="14" fontWeight="700" fill={COLORS.primary}>
        光源
      </text>
      <line
        x1="153"
        y1="126"
        x2="368"
        y2="104"
        stroke={COLORS.warning}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch02-arrow)"
      />
      <line
        x1="153"
        y1="158"
        x2="368"
        y2="180"
        stroke={COLORS.warning}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch02-arrow)"
      />
      <path
        d="M360 86 L470 112 L456 218 L346 192 Z"
        fill="var(--accent)"
        opacity="0.25"
        stroke={COLORS.accent}
        strokeWidth="3"
      />
      <text
        x="377"
        y="153"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        表面
      </text>
      <line
        x1="470"
        y1="112"
        x2="645"
        y2="92"
        stroke={COLORS.success}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch02-arrow)"
      />
      <line
        x1="456"
        y1="218"
        x2="645"
        y2="238"
        stroke={COLORS.success}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch02-arrow)"
      />
      <rect
        x="642"
        y="86"
        width="88"
        height="164"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.success}
        strokeWidth="2"
      />
      <text x="658" y="148" fontSize="14" fill={COLORS.primary}>
        观察
      </text>
      <text x="658" y="174" fontSize="14" fill={COLORS.primary}>
        信号
      </text>
      <text x="28" y="282" fontSize="13" fill={COLORS.warning}>
        辐射度量看能量，反射率看表面保留的比例；亮度不是二者的替代词。
      </text>
    </g>
  );
}

function HardwareScene() {
  const workers = [0, 1, 2, 3];
  return (
    <g>
      <text x="28" y="34" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        Modern Graphics Hardware：并行工作与等待边界
      </text>
      <text x="38" y="78" fontSize="14" fill={COLORS.secondary}>
        工作分发
      </text>
      <rect
        x="32"
        y="94"
        width="130"
        height="174"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="58" y="144" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        命令队列
      </text>
      <text x="58" y="176" fontSize="13" fill={COLORS.secondary}>
        顶点任务
      </text>
      <text x="58" y="202" fontSize="13" fill={COLORS.secondary}>
        片段任务
      </text>
      <text x="58" y="228" fontSize="13" fill={COLORS.secondary}>
        采样任务
      </text>
      {workers.map((worker, index) => (
        <g key={worker}>
          <line
            x1="164"
            y1={128 + index * 42}
            x2="254"
            y2={128 + index * 42}
            stroke={COLORS.accent}
            strokeWidth="2"
            markerEnd="url(#cgpp-ch02-arrow)"
          />
          <rect
            x="268"
            y={106 + index * 42}
            width="122"
            height="44"
            rx="9"
            fill="var(--bg)"
            stroke={COLORS.accent}
            strokeWidth="2"
          />
          <text
            x="292"
            y={133 + index * 42}
            fontSize="14"
            fill={COLORS.primary}
          >
            工作单元 {index + 1}
          </text>
        </g>
      ))}
      <rect
        x="492"
        y="100"
        width="224"
        height="170"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.warning}
        strokeWidth="2"
      />
      <text
        x="520"
        y="136"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        内存层次
      </text>
      <text x="520" y="170" fontSize="14" fill={COLORS.success}>
        近：缓存命中
      </text>
      <text x="520" y="202" fontSize="14" fill={COLORS.warning}>
        远：内存延迟
      </text>
      <text x="520" y="234" fontSize="13" fill={COLORS.secondary}>
        并行性可以覆盖等待，不能消除依赖。
      </text>
    </g>
  );
}

export function CgppCh02GraphicsProgrammingLab() {
  const [focus, setFocus] = useState<Focus>("pipeline");
  const current = FOCI.find((item) => item.id === focus) ?? FOCI[0];

  function reset() {
    setFocus("pipeline");
  }

  return (
    <section
      aria-label="图形编程专属光照与硬件实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cgpp-ch02-graphics-programming-map"
      data-unit-id="cgp-01 cgp-26 cgp-38"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属实验 · 管线、光与硬件
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            同一帧图像的三种解释
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先猜一猜：当画面变慢或变暗时，问题更可能来自阶段交接、能量模型，还是硬件等待？
          </p>
        </div>
        <button
          type="button"
          aria-label="重置图形编程实验"
          onClick={reset}
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          重置实验
        </button>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择解释视角">
          {FOCI.map((item) => (
            <FocusButton
              key={item.id}
              active={focus === item.id}
              onClick={() => setFocus(item.id)}
            >
              {item.label}
            </FocusButton>
          ))}
        </div>
        <div className="min-w-0 rounded-card border border-border bg-background p-3 sm:p-4">
          <svg
            viewBox="0 0 760 330"
            role="img"
            aria-label={`${current.label}可视化：${current.detail}`}
            className="h-auto w-full"
          >
            <defs>
              <marker
                id="cgpp-ch02-arrow"
                markerWidth="10"
                markerHeight="10"
                refX="8"
                refY="5"
                orient="auto"
              >
                <path d="M0,0 L10,5 L0,10 z" fill={COLORS.accent} />
              </marker>
            </defs>
            <rect
              x="0"
              y="0"
              width="760"
              height="330"
              rx="12"
              fill="var(--bg)"
            />
            {focus === "pipeline" ? (
              <PipelineScene />
            ) : focus === "light" ? (
              <LightScene />
            ) : (
              <HardwareScene />
            )}
          </svg>
        </div>
        <div
          className="rounded-card border border-border bg-background p-4"
          role="status"
          aria-live="polite"
        >
          <p className="text-sm font-semibold text-primary">{current.label}</p>
          <p className="mt-1 text-sm leading-6 text-secondary">
            {current.detail}
          </p>
        </div>
      </div>
    </section>
  );
}
