"use client";

import { useState } from "react";

type View = "stages" | "energy" | "execution";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "stages",
    label: "阶段视图",
    detail: "顶点、图元、片段和输出按顺序交接，每一步都可以独立检查。",
  },
  {
    id: "energy",
    label: "光照视图",
    detail: "光源能量与表面反射率进入片段阶段，最后才形成可观察颜色。",
  },
  {
    id: "execution",
    label: "执行视图",
    detail: "现代图形硬件同时运行许多相似任务，缓存和依赖决定等待是否暴露。",
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

function ViewButton({
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

function StageView() {
  const stages = [
    { x: 42, label: "顶点", detail: "坐标" },
    { x: 188, label: "装配", detail: "图元" },
    { x: 334, label: "裁剪", detail: "可见" },
    { x: 480, label: "光栅", detail: "片段" },
    { x: 626, label: "输出", detail: "像素" },
  ];
  return (
    <g>
      <text x="28" y="34" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        The Graphics Pipeline：一条可定位的阶段链
      </text>
      {stages.slice(0, -1).map((stage, index) => (
        <line
          key={stage.label}
          x1={stage.x + 104}
          y1="143"
          x2={stages[index + 1].x - 10}
          y2="143"
          stroke={COLORS.accent}
          strokeWidth="3"
          markerEnd="url(#cgpp-ch03-arrow)"
        />
      ))}
      {stages.map((stage, index) => (
        <g key={stage.label}>
          <rect
            x={stage.x}
            y="102"
            width="104"
            height="82"
            rx="12"
            fill={index === 0 ? "var(--bg)" : COLORS.elevated}
            stroke={
              index === stages.length - 1 ? COLORS.success : COLORS.border
            }
            strokeWidth="2"
          />
          <circle
            cx={stage.x + 22}
            cy="126"
            r="9"
            fill={index < 3 ? COLORS.accent : COLORS.success}
          />
          <text
            x={stage.x + 40}
            y="132"
            fontSize="15"
            fontWeight="700"
            fill={COLORS.primary}
          >
            {stage.label}
          </text>
          <text x={stage.x + 22} y="163" fontSize="13" fill={COLORS.secondary}>
            {stage.detail}
          </text>
        </g>
      ))}
      <text x="28" y="244" fontSize="14" fill={COLORS.secondary}>
        记录每一站的数量、范围和状态，首个异常就是比最终画面更有价值的证据。
      </text>
      <text x="28" y="278" fontSize="13" fill={COLORS.warning}>
        片段为零时先查裁剪与覆盖，不要直接修改光照颜色。
      </text>
    </g>
  );
}

function EnergyView() {
  return (
    <g>
      <text x="28" y="34" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        光照阶段：输入量不同，责任也不同
      </text>
      <circle
        cx="114"
        cy="142"
        r="32"
        fill={COLORS.warning}
        opacity="0.5"
        stroke={COLORS.warning}
        strokeWidth="3"
      />
      <text x="83" y="148" fontSize="14" fontWeight="700" fill={COLORS.primary}>
        光源
      </text>
      <line
        x1="147"
        y1="124"
        x2="344"
        y2="104"
        stroke={COLORS.warning}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch03-arrow)"
      />
      <line
        x1="147"
        y1="160"
        x2="344"
        y2="184"
        stroke={COLORS.warning}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch03-arrow)"
      />
      <path
        d="M335 84 L458 110 L442 222 L319 196 Z"
        fill="var(--accent)"
        opacity="0.25"
        stroke={COLORS.accent}
        strokeWidth="3"
      />
      <text
        x="354"
        y="145"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        表面
      </text>
      <text x="354" y="174" fontSize="13" fill={COLORS.secondary}>
        反射率
      </text>
      <line
        x1="458"
        y1="110"
        x2="650"
        y2="94"
        stroke={COLORS.success}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch03-arrow)"
      />
      <line
        x1="442"
        y1="222"
        x2="650"
        y2="240"
        stroke={COLORS.success}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch03-arrow)"
      />
      <rect
        x="646"
        y="86"
        width="92"
        height="170"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.success}
        strokeWidth="2"
      />
      <text x="660" y="146" fontSize="14" fill={COLORS.primary}>
        片段
      </text>
      <text x="660" y="176" fontSize="14" fill={COLORS.primary}>
        颜色
      </text>
      <text x="28" y="282" fontSize="13" fill={COLORS.warning}>
        辐射度量说明能量，反射率说明表面保留比例；两者不能被一个颜色常数替代。
      </text>
    </g>
  );
}

function ExecutionView() {
  return (
    <g>
      <text x="28" y="34" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        执行阶段：并行任务仍受内存与依赖约束
      </text>
      <rect
        x="32"
        y="88"
        width="148"
        height="170"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="67" y="126" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        任务队列
      </text>
      {["顶点", "片段", "采样"].map((label, index) => (
        <rect
          key={label}
          x="54"
          y={148 + index * 32}
          width="104"
          height="22"
          rx="6"
          fill="var(--bg)"
          stroke={COLORS.border}
        />
      ))}
      {[0, 1, 2].map((index) => (
        <line
          key={index}
          x1="182"
          y1={158 + index * 32}
          x2="270"
          y2={158 + index * 32}
          stroke={COLORS.accent}
          strokeWidth="2"
          markerEnd="url(#cgpp-ch03-arrow)"
        />
      ))}
      <rect
        x="286"
        y="96"
        width="128"
        height="152"
        rx="12"
        fill="var(--bg)"
        stroke={COLORS.accent}
        strokeWidth="2"
      />
      <text
        x="310"
        y="130"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        执行单元
      </text>
      <text x="310" y="166" fontSize="14" fill={COLORS.success}>
        并行性
      </text>
      <text x="310" y="198" fontSize="13" fill={COLORS.secondary}>
        独立任务
      </text>
      <line
        x1="416"
        y1="172"
        x2="500"
        y2="172"
        stroke={COLORS.warning}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch03-arrow)"
      />
      <rect
        x="514"
        y="96"
        width="210"
        height="152"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.warning}
        strokeWidth="2"
      />
      <text
        x="546"
        y="130"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        内存层次
      </text>
      <text x="546" y="166" fontSize="14" fill={COLORS.success}>
        缓存：近
      </text>
      <text x="546" y="198" fontSize="14" fill={COLORS.warning}>
        内存延迟：远
      </text>
      <text x="28" y="288" fontSize="13" fill={COLORS.secondary}>
        并行性增加吞吐，但依赖链和内存延迟仍会让执行单元等待。
      </text>
    </g>
  );
}

export function CgppCh03GraphicsPipelineLab() {
  const [view, setView] = useState<View>("stages");
  const current = VIEWS.find((item) => item.id === view) ?? VIEWS[0];

  function reset() {
    setView("stages");
  }

  return (
    <section
      aria-label="图形管线专属阶段实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cgpp-ch03-graphics-pipeline-map"
      data-unit-id="cgp-01 cgp-26 cgp-38"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属实验 · 阶段与执行
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            一帧数据如何走完图形管线
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先猜一猜：把观察视角从阶段交接切到光照，再切到硬件执行，哪一个视角最适合定位当前故障？
          </p>
        </div>
        <button
          type="button"
          aria-label="重置图形管线实验"
          onClick={reset}
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          重置实验
        </button>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择图形管线观察视角">
          {VIEWS.map((item) => (
            <ViewButton
              key={item.id}
              active={view === item.id}
              onClick={() => setView(item.id)}
            >
              {item.label}
            </ViewButton>
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
                id="cgpp-ch03-arrow"
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
            {view === "stages" ? (
              <StageView />
            ) : view === "energy" ? (
              <EnergyView />
            ) : (
              <ExecutionView />
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
