"use client";

import { useState } from "react";

type Scene = "pipeline" | "scene2d" | "hierarchy3d";

const SCENES: readonly { id: Scene; label: string; detail: string }[] = [
  {
    id: "pipeline",
    label: "图形管线",
    detail: "同一份几何数据依次经过变换、装配、光栅化和显示。",
  },
  {
    id: "scene2d",
    label: "二维场景",
    detail: "WPF 式场景描述把形状、位置和绘制顺序保留在可读的场景树中。",
  },
  {
    id: "hierarchy3d",
    label: "三维层次",
    detail: "固定功能三维图形用父子变换把局部模型组织成可移动的整体。",
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

function SceneButton({
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

function Arrow({
  x1,
  y1,
  x2,
  y2,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={COLORS.accent}
      strokeWidth="3"
      markerEnd="url(#cgpp-ch01-arrow)"
    />
  );
}

function PipelineScene() {
  const stages = [
    { x: 72, label: "输入", detail: "顶点" },
    { x: 238, label: "变换", detail: "坐标" },
    { x: 404, label: "装配", detail: "图元" },
    { x: 570, label: "光栅化", detail: "片段" },
    { x: 688, label: "显示", detail: "像素" },
  ];
  return (
    <g>
      <text x="32" y="34" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        Graphics Pipeline：数据状态的连续交接
      </text>
      {stages.slice(0, -1).map((stage, index) => (
        <Arrow
          key={stage.label}
          x1={stage.x + 112}
          y1={150}
          x2={stages[index + 1].x - 12}
          y2={150}
        />
      ))}
      {stages.map((stage, index) => (
        <g key={stage.label}>
          <rect
            x={stage.x}
            y="108"
            width={index === stages.length - 1 ? 88 : 112}
            height="84"
            rx="12"
            fill={index === 0 ? "var(--bg)" : COLORS.elevated}
            stroke={
              index === stages.length - 1 ? COLORS.success : COLORS.border
            }
            strokeWidth="2"
          />
          <circle
            cx={stage.x + 22}
            cy="130"
            r="9"
            fill={index < 3 ? COLORS.accent : COLORS.success}
          />
          <text
            x={stage.x + 42}
            y="136"
            fontSize="15"
            fontWeight="700"
            fill={COLORS.primary}
          >
            {stage.label}
          </text>
          <text x={stage.x + 22} y="168" fontSize="13" fill={COLORS.secondary}>
            {stage.detail}
          </text>
        </g>
      ))}
      <text x="32" y="250" fontSize="14" fill={COLORS.secondary}>
        每个阶段只承诺自己的输入与输出；阶段之间的契约让错误可以定位，而不是靠“画面不对”猜原因。
      </text>
      <text x="32" y="282" fontSize="13" fill={COLORS.warning}>
        观察点：若输入坐标正确而显示为空，先检查交接边界，不要直接重写几何数据。
      </text>
    </g>
  );
}

function Scene2d() {
  return (
    <g>
      <text x="32" y="34" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        2D Graphics：场景描述先于像素输出
      </text>
      <rect
        x="52"
        y="68"
        width="430"
        height="220"
        rx="10"
        fill="var(--bg)"
        stroke={COLORS.border}
      />
      {[0, 1, 2, 3, 4].map((index) => (
        <line
          key={`vertical-${index}`}
          x1={112 + index * 76}
          y1="80"
          x2={112 + index * 76}
          y2="276"
          stroke={COLORS.border}
          strokeWidth="1"
        />
      ))}
      {[0, 1, 2].map((index) => (
        <line
          key={`horizontal-${index}`}
          x1="64"
          y1={120 + index * 68}
          x2="470"
          y2={120 + index * 68}
          stroke={COLORS.border}
          strokeWidth="1"
        />
      ))}
      <rect
        x="145"
        y="108"
        width="190"
        height="86"
        rx="10"
        fill="var(--accent)"
        opacity="0.25"
        stroke={COLORS.accent}
        strokeWidth="3"
      />
      <circle
        cx="360"
        cy="225"
        r="34"
        fill="var(--success)"
        opacity="0.35"
        stroke={COLORS.success}
        strokeWidth="3"
      />
      <text
        x="166"
        y="154"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        背景面板
      </text>
      <text x="334" y="230" fontSize="14" fill={COLORS.primary}>
        圆形
      </text>
      <text x="540" y="96" fontSize="14" fill={COLORS.secondary}>
        场景描述
      </text>
      <text x="540" y="130" fontSize="13" fill={COLORS.primary}>
        1. 背景面板
      </text>
      <text x="540" y="158" fontSize="13" fill={COLORS.primary}>
        2. 圆形与位置
      </text>
      <text x="540" y="186" fontSize="13" fill={COLORS.primary}>
        3. 绘制顺序
      </text>
      <text x="540" y="238" fontSize="13" fill={COLORS.warning}>
        先描述对象，再决定如何栅格化。
      </text>
    </g>
  );
}

function Hierarchy3d() {
  return (
    <g>
      <text x="32" y="34" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        固定功能三维图形：父子变换保留结构
      </text>
      <line
        x1="380"
        y1="105"
        x2="230"
        y2="190"
        stroke={COLORS.accent}
        strokeWidth="3"
      />
      <line
        x1="380"
        y1="105"
        x2="530"
        y2="190"
        stroke={COLORS.accent}
        strokeWidth="3"
      />
      <line
        x1="230"
        y1="238"
        x2="144"
        y2="286"
        stroke={COLORS.border}
        strokeWidth="3"
      />
      <line
        x1="230"
        y1="238"
        x2="316"
        y2="286"
        stroke={COLORS.border}
        strokeWidth="3"
      />
      <rect
        x="300"
        y="72"
        width="160"
        height="66"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.success}
        strokeWidth="3"
      />
      <rect
        x="160"
        y="190"
        width="140"
        height="66"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.accent}
        strokeWidth="2"
      />
      <rect
        x="460"
        y="190"
        width="140"
        height="66"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.accent}
        strokeWidth="2"
      />
      <rect
        x="80"
        y="270"
        width="128"
        height="48"
        rx="10"
        fill="var(--bg)"
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <rect
        x="252"
        y="270"
        width="128"
        height="48"
        rx="10"
        fill="var(--bg)"
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x="333"
        y="111"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        世界 / 根节点
      </text>
      <text x="186" y="229" fontSize="14" fill={COLORS.primary}>
        身体局部坐标
      </text>
      <text x="485" y="229" fontSize="14" fill={COLORS.primary}>
        手臂局部坐标
      </text>
      <text x="103" y="300" fontSize="13" fill={COLORS.secondary}>
        手部
      </text>
      <text x="274" y="300" fontSize="13" fill={COLORS.secondary}>
        道具
      </text>
      <text x="32" y="62" fontSize="13" fill={COLORS.warning}>
        移动父节点会带动子节点；这正是层次建模比一堆独立坐标更可靠的地方。
      </text>
    </g>
  );
}

export function CgppCh01IntroductionLab() {
  const [scene, setScene] = useState<Scene>("pipeline");
  const current = SCENES.find((item) => item.id === scene) ?? SCENES[0];

  function reset() {
    setScene("pipeline");
  }

  return (
    <section
      aria-label="计算机图形学导论专属概念实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cgpp-ch01-introduction-map"
      data-unit-id="cgp-01 cgp-02 cgp-06"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属实验 · 三个观察尺度
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            从像素输出回看场景与管线
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先猜一猜：把观察尺度从图形管线切到二维场景，再切到三维层次，哪一种关系会保留下来？
          </p>
        </div>
        <button
          type="button"
          aria-label="重置概念实验"
          onClick={reset}
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          重置实验
        </button>
      </header>

      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择观察尺度">
          {SCENES.map((item) => (
            <SceneButton
              key={item.id}
              active={scene === item.id}
              onClick={() => setScene(item.id)}
            >
              {item.label}
            </SceneButton>
          ))}
        </div>
        <div className="min-w-0 rounded-card border border-border bg-background p-3 sm:p-4">
          <svg
            viewBox="0 0 760 340"
            role="img"
            aria-label={`${current.label}可视化：${current.detail}`}
            className="h-auto w-full"
          >
            <defs>
              <marker
                id="cgpp-ch01-arrow"
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
              height="340"
              rx="12"
              fill="var(--bg)"
            />
            {scene === "pipeline" ? (
              <PipelineScene />
            ) : scene === "scene2d" ? (
              <Scene2d />
            ) : (
              <Hierarchy3d />
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
