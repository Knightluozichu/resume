"use client";

import { useMemo, useState, type ReactNode } from "react";

type PlatformKind = "desktop" | "mobile" | "web";

const COLORS = {
  accent: "var(--accent)",
  border: "var(--border)",
  secondary: "var(--text-secondary)",
  success: "var(--success)",
  surface: "var(--surface)",
  text: "var(--text-primary)",
  warning: "var(--warning)",
} as const;

function SvgFrame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg
      viewBox="0 0 720 360"
      role="img"
      aria-label={label}
      className="block h-auto w-full"
    >
      <rect width="720" height="360" rx="14" fill="var(--bg)" />
      {children}
    </svg>
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 8;
  const left = {
    x: x2 - size * Math.cos(angle - Math.PI / 6),
    y: y2 - size * Math.sin(angle - Math.PI / 6),
  };
  const right = {
    x: x2 - size * Math.cos(angle + Math.PI / 6),
    y: y2 - size * Math.sin(angle + Math.PI / 6),
  };
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="3" />
      <polygon
        points={`${x2},${y2} ${left.x},${left.y} ${right.x},${right.y}`}
        fill={color}
      />
    </>
  );
}

export function Cgp16PlatformStackDiagram() {
  const boxes = [
    [34, "应用", "场景 / 资源", COLORS.warning],
    [204, "图形 API", "WebGPU / Vulkan", COLORS.accent],
    [374, "驱动与 GPU", "队列 / 内存", COLORS.success],
    [544, "显示输出", "帧 / 输入", COLORS.secondary],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="实时三维图形平台分层：应用经过图形 API、驱动和 GPU，最终输出帧">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            real-time 3d graphics platforms：不只是 GPU 型号
          </text>
          {boxes.map(([x, title, detail, color], index) => (
            <g key={title}>
              <rect
                x={x}
                y="100"
                width="140"
                height="118"
                rx="14"
                fill={COLORS.surface}
                stroke={COLORS.border}
                strokeWidth="2"
              />
              <circle cx={x + 28} cy="132" r="8" fill={color} />
              <text
                x={x + 46}
                y="137"
                fontSize="14"
                fontWeight="700"
                fill={COLORS.text}
              >
                {title}
              </text>
              <text x={x + 18} y="178" fontSize="13" fill={COLORS.secondary}>
                {detail}
              </text>
              <text x={x + 18} y="200" fontSize="12" fill={color}>
                {index === 0 ? "提交" : index === 3 ? "呈现" : "转换"}
              </text>
              {index < boxes.length - 1 ? (
                <Arrow
                  x1={x + 148}
                  y1={159}
                  x2={x + 164}
                  y2={159}
                  color={COLORS.accent}
                />
              ) : null}
            </g>
          ))}
          <rect
            x="92"
            y="256"
            width="536"
            height="50"
            rx="12"
            fill="var(--bg)"
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="360"
            y="287"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.text}
          >
            平台差异来自 API、驱动、内存、同步、输入与显示的组合
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        实时平台是一条从应用提交到显示输出的契约链，GPU 只是其中一层。
      </figcaption>
    </figure>
  );
}

export function Cgp16ProgrammablePipelineDiagram() {
  const stages = [
    [38, "顶点", "位置 / 属性", COLORS.warning],
    [178, "图元", "组装 / 裁剪", COLORS.accent],
    [318, "光栅", "覆盖 / 插值", COLORS.accent],
    [458, "片段", "材质 / 深度", COLORS.success],
    [598, "输出", "颜色 / 帧", COLORS.secondary],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="可编程管线图：顶点、图元、光栅和片段阶段各自处理不同输入输出">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            programmable pipeline：把固定阶段变成可编程职责
          </text>
          {stages.map(([x, title, detail, color], index) => (
            <g key={title}>
              <rect
                x={x}
                y="106"
                width="104"
                height="118"
                rx="14"
                fill={COLORS.surface}
                stroke={color}
                strokeWidth="2"
              />
              <circle cx={x + 24} cy="136" r="8" fill={color} />
              <text
                x={x + 40}
                y="141"
                fontSize="14"
                fontWeight="700"
                fill={COLORS.text}
              >
                {title}
              </text>
              <text x={x + 14} y="178" fontSize="12" fill={COLORS.secondary}>
                {detail}
              </text>
              <text x={x + 14} y="202" fontSize="12" fill={color}>
                {index === 0 || index === 3 ? "shader" : "固定规则"}
              </text>
              {index < stages.length - 1 ? (
                <Arrow
                  x1={x + 110}
                  y1={165}
                  x2={x + 134}
                  y2={165}
                  color={COLORS.accent}
                />
              ) : null}
            </g>
          ))}
          <rect
            x="96"
            y="264"
            width="528"
            height="42"
            rx="12"
            fill="var(--bg)"
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="360"
            y="290"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            可编程不等于随意：每个 shader 仍受输入、输出和帧预算约束
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        先明确阶段契约，再讨论哪些阶段可编程、如何并行以及怎样验收帧时间。
      </figcaption>
    </figure>
  );
}

export function Cgp16PlatformComparisonDiagram() {
  const platforms = [
    ["桌面", "高吞吐", 92, COLORS.accent, "显存 / 多线程"],
    ["移动", "低功耗", 64, COLORS.success, "带宽 / 温度"],
    ["Web", "受浏览器约束", 54, COLORS.warning, "安全 / API"],
    ["主机", "稳定帧率", 82, COLORS.secondary, "固定硬件"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="实时三维平台对照：桌面、移动、Web 和主机在吞吐、功耗、浏览器约束和稳定帧率上不同">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            平台选择：同一 programmable pipeline 也有不同边界
          </text>
          {platforms.map(([name, detail, value, color, constraint], index) => {
            const x = 42 + index * 166;
            return (
              <g key={name}>
                <rect
                  x={x}
                  y="76"
                  width="144"
                  height="210"
                  rx="14"
                  fill={COLORS.surface}
                  stroke={COLORS.border}
                  strokeWidth="2"
                />
                <text
                  x={x + 20}
                  y="112"
                  fontSize="14"
                  fontWeight="700"
                  fill={COLORS.text}
                >
                  {name}
                </text>
                <text x={x + 20} y="140" fontSize="12" fill={color}>
                  {detail}
                </text>
                <rect
                  x={x + 20}
                  y="170"
                  width="104"
                  height="16"
                  rx="8"
                  fill="var(--bg)"
                />
                <rect
                  x={x + 20}
                  y="170"
                  width={value}
                  height="16"
                  rx="8"
                  fill={color}
                />
                <text x={x + 20} y="220" fontSize="12" fill={COLORS.secondary}>
                  重点约束
                </text>
                <text x={x + 20} y="246" fontSize="12" fill={COLORS.text}>
                  {constraint}
                </text>
              </g>
            );
          })}
          <text
            x="360"
            y="322"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            比较平台时看可兑现的帧预算，不只看峰值参数
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        平台调查的目的，是把 API 能力映射到真实的带宽、功耗和交付约束。
      </figcaption>
    </figure>
  );
}

const PLATFORM_PROFILE: Record<
  PlatformKind,
  {
    label: string;
    budget: number;
    baseMs: number;
    limit: string;
    color: string;
  }
> = {
  desktop: {
    label: "桌面 GPU",
    budget: 16.6,
    baseMs: 2.2,
    limit: "吞吐优先",
    color: COLORS.accent,
  },
  mobile: {
    label: "移动 GPU",
    budget: 16.6,
    baseMs: 4.4,
    limit: "功耗与带宽",
    color: COLORS.success,
  },
  web: {
    label: "WebGPU",
    budget: 16.6,
    baseMs: 5.2,
    limit: "浏览器与安全",
    color: COLORS.warning,
  },
};

function PlatformFrame({
  platform,
  drawCalls,
  shaderComplexity,
}: {
  platform: PlatformKind;
  drawCalls: number;
  shaderComplexity: number;
}) {
  const profile = PLATFORM_PROFILE[platform];
  const frameMs = profile.baseMs + drawCalls / 90 + shaderComplexity * 0.52;
  const progress = Math.min(100, (frameMs / profile.budget) * 100);
  const stages = [
    ["顶点", drawCalls * 0.04 + 8],
    ["图元", drawCalls * 0.03 + 6],
    ["光栅", drawCalls * 0.05 + 12],
    ["片段", shaderComplexity * 7 + drawCalls * 0.02 + 12],
  ] as const;

  return (
    <SvgFrame label="可调实时三维平台实验：改变平台、draw call 和 shader 复杂度，观察可编程管线帧预算">
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.text}>
        live platform：把帧预算变成证据
      </text>
      <rect
        x="42"
        y="64"
        width="360"
        height="246"
        rx="14"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="64" y="96" fontSize="14" fontWeight="700" fill={COLORS.text}>
        programmable pipeline
      </text>
      {stages.map(([name, value], index) => {
        const y = 122 + index * 39;
        return (
          <g key={name}>
            <text x="64" y={y + 14} fontSize="12" fill={COLORS.secondary}>
              {name}
            </text>
            <rect
              x="116"
              y={y}
              width="244"
              height="18"
              rx="9"
              fill="var(--bg)"
            />
            <rect
              x="116"
              y={y}
              width={Math.min(244, value * 2.2)}
              height="18"
              rx="9"
              fill={index === 3 ? COLORS.warning : profile.color}
            />
            <text
              x="370"
              y={y + 14}
              textAnchor="end"
              fontSize="12"
              fill={COLORS.text}
            >
              {Math.round(value)}
            </text>
          </g>
        );
      })}
      <text x="64" y="286" fontSize="12" fill={COLORS.secondary}>
        阶段压力随提交与 shader 复杂度改变
      </text>
      <rect
        x="432"
        y="70"
        width="254"
        height="226"
        rx="14"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="456" y="108" fontSize="14" fontWeight="700" fill={COLORS.text}>
        当前规格
      </text>
      <text x="456" y="142" fontSize="13" fill={profile.color}>
        平台：{profile.label}
      </text>
      <text x="456" y="174" fontSize="13" fill={COLORS.secondary}>
        估计帧时：{frameMs.toFixed(1)} ms
      </text>
      <text x="456" y="206" fontSize="13" fill={COLORS.secondary}>
        预算占用：{progress.toFixed(0)}%
      </text>
      <text
        x="456"
        y="238"
        fontSize="13"
        fill={frameMs <= profile.budget ? COLORS.success : COLORS.warning}
      >
        {frameMs <= profile.budget ? "状态：满足帧预算" : "状态：超过帧预算"}
      </text>
      <text
        x="559"
        y="270"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.secondary}
      >
        约束：{profile.limit}
      </text>
      <text
        x="360"
        y="338"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.secondary}
      >
        一次只改变一个条件，才能定位瓶颈阶段
      </text>
    </SvgFrame>
  );
}

export function Cgp16RealTimeGraphicsPlatformsLab() {
  const [platform, setPlatform] = useState<PlatformKind>("desktop");
  const [drawCalls, setDrawCalls] = useState(120);
  const [shaderComplexity, setShaderComplexity] = useState(4);
  const profile = useMemo(() => PLATFORM_PROFILE[platform], [platform]);

  function reset() {
    setPlatform("desktop");
    setDrawCalls(120);
    setShaderComplexity(4);
  }

  return (
    <section
      aria-label="实时三维图形平台专属实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cgp-16-real-time-platforms"
      data-unit-id="cgp-16"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 PlatformViz · frame budget
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让平台边界和管线压力同时可见
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先猜一猜：同一个 shader 搬到移动或 Web
            平台后，最先变化的是图像质量、帧时间，还是资源边界？
          </p>
        </div>
        <button
          type="button"
          aria-label="重置实时三维平台实验"
          onClick={reset}
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          重置实验
        </button>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择实时三维平台">
          {(
            [
              ["desktop", "桌面 GPU"],
              ["mobile", "移动 GPU"],
              ["web", "WebGPU"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={platform === value}
              onClick={() => setPlatform(value)}
              className={`min-h-11 rounded-control border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                platform === value
                  ? "border-accent bg-accent/10 font-semibold text-primary"
                  : "border-border text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 rounded-card border border-border bg-background p-4">
          <label className="flex min-w-40 flex-1 flex-col gap-1 text-sm text-secondary">
            <span className="flex justify-between gap-3">
              <span>draw calls</span>
              <span className="font-mono text-primary">{drawCalls}</span>
            </span>
            <input
              type="range"
              min="20"
              max="300"
              step="10"
              value={drawCalls}
              onChange={(event) => setDrawCalls(Number(event.target.value))}
              className="accent-accent"
            />
          </label>
          <label className="flex min-w-40 flex-1 flex-col gap-1 text-sm text-secondary">
            <span className="flex justify-between gap-3">
              <span>shader 复杂度</span>
              <span className="font-mono text-primary">{shaderComplexity}</span>
            </span>
            <input
              type="range"
              min="1"
              max="8"
              step="1"
              value={shaderComplexity}
              onChange={(event) =>
                setShaderComplexity(Number(event.target.value))
              }
              className="accent-accent"
            />
          </label>
        </div>
        <div className="min-w-0 rounded-card border border-border bg-background p-3 sm:p-4">
          <PlatformFrame
            platform={platform}
            drawCalls={drawCalls}
            shaderComplexity={shaderComplexity}
          />
        </div>
        <div
          className="rounded-card border border-border bg-background p-4"
          role="status"
          aria-live="polite"
        >
          <p className="text-sm font-semibold text-primary">
            当前平台：{profile.label}
          </p>
          <p className="mt-1 text-sm leading-6 text-secondary">
            先固定 shader
            和场景，再切换平台；如果帧预算被突破，沿顶点、光栅和片段阶段逐项定位，而不是直接降低所有画质。
          </p>
        </div>
      </div>
    </section>
  );
}
