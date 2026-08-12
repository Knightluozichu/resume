"use client";

import { useMemo, useState, type ReactNode } from "react";

type VisibilityMode =
  | "depth test"
  | "frustum culling"
  | "occlusion query"
  | "debug";

const COLORS = {
  accent: "var(--accent)",
  bg: "var(--bg)",
  border: "var(--border)",
  secondary: "var(--text-secondary)",
  success: "var(--success)",
  surface: "var(--surface)",
  text: "var(--text-primary)",
  warning: "var(--warning)",
} as const;

function Figure({ children }: { children: ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        {children}
      </div>
    </figure>
  );
}

function SvgFrame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg
      viewBox="0 0 720 380"
      role="img"
      aria-label={label}
      className="block h-auto w-full"
    >
      <rect width="720" height="380" rx="14" fill={COLORS.bg} />
      {children}
    </svg>
  );
}

function round(value: number): number {
  return Math.round(value * 1000) / 1000;
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color,
  dashed = false,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  dashed?: boolean;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 9;
  const leftX = round(x2 - size * Math.cos(angle - Math.PI / 6));
  const leftY = round(y2 - size * Math.sin(angle - Math.PI / 6));
  const rightX = round(x2 - size * Math.cos(angle + Math.PI / 6));
  const rightY = round(y2 - size * Math.sin(angle + Math.PI / 6));
  return (
    <>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth="3"
        strokeDasharray={dashed ? "8 6" : undefined}
      />
      <polygon
        points={`${x2},${y2} ${leftX},${leftY} ${rightX},${rightY}`}
        fill={color}
      />
    </>
  );
}

export function Cgp36VisibilityPipelineDiagram() {
  return (
    <Figure>
      <SvgFrame label="可见性判定流程图：视锥剔除、遮挡测试和深度缓冲在不同粒度上减少不可见工作">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          visibility determination：先便宜筛选，再精确比较
        </text>
        <rect
          x="34"
          y="90"
          width="154"
          height="194"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="111"
          y="126"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          场景对象
        </text>
        <text
          x="111"
          y="168"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.accent}
        >
          bounds
        </text>
        <text
          x="111"
          y="202"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.success}
        >
          层级 / 材质
        </text>
        <text
          x="111"
          y="236"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          相机与深度状态
        </text>
        <Arrow x1={206} y1={188} x2={244} y2={188} color={COLORS.accent} />
        <rect
          x="256"
          y="90"
          width="174"
          height="194"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="343"
          y="126"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          粗到细筛选
        </text>
        <text
          x="343"
          y="168"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.accent}
        >
          frustum culling
        </text>
        <text
          x="343"
          y="202"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.success}
        >
          occlusion query
        </text>
        <text
          x="343"
          y="236"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          是否值得提交
        </text>
        <Arrow x1={448} y1={188} x2={486} y2={188} color={COLORS.warning} />
        <rect
          x="498"
          y="90"
          width="188"
          height="194"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="592"
          y="126"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          像素级判定
        </text>
        <text
          x="592"
          y="168"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          depth buffer
        </text>
        <text
          x="592"
          y="202"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.accent}
        >
          depth test / early-z
        </text>
        <text
          x="592"
          y="236"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          保留最近片段
        </text>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          可见性不是一个布尔开关，而是对象、几何和像素三层证据
        </text>
      </SvgFrame>
    </Figure>
  );
}

export function Cgp36DepthBufferDiagram() {
  return (
    <Figure>
      <SvgFrame label="深度缓冲比较图：每个片段的深度与已有 depth buffer 比较，满足函数才写入颜色和深度">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          depth buffer：每个像素的一本最近距离账
        </text>
        <rect
          x="34"
          y="86"
          width="188"
          height="204"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="128"
          y="122"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          新片段
        </text>
        <circle
          cx="128"
          cy="178"
          r="25"
          fill={COLORS.warning}
          fillOpacity="0.2"
          stroke={COLORS.warning}
          strokeWidth="3"
        />
        <text
          x="128"
          y="183"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          z = 0.32
        </text>
        <text
          x="128"
          y="236"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          颜色 · 深度 · 测试函数
        </text>
        <Arrow x1={240} y1={188} x2={278} y2={188} color={COLORS.warning} />
        <rect
          x="290"
          y="86"
          width="142"
          height="204"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="361"
          y="122"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          比较
        </text>
        <text
          x="361"
          y="176"
          textAnchor="middle"
          fontSize="18"
          fill={COLORS.accent}
        >
          z new &lt; z old?
        </text>
        <text
          x="361"
          y="228"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          less / greater / equal
        </text>
        <Arrow x1={450} y1={188} x2={488} y2={188} color={COLORS.success} />
        <rect
          x="500"
          y="86"
          width="186"
          height="204"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="593"
          y="122"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          写入结果
        </text>
        <text
          x="593"
          y="168"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.success}
        >
          通过 → 写颜色
        </text>
        <text
          x="593"
          y="202"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          通过 → 写深度
        </text>
        <text
          x="593"
          y="240"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          失败 → 丢弃片段
        </text>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          clear、比较函数、写掩码和坐标精度共同决定“最近”
        </text>
      </SvgFrame>
    </Figure>
  );
}

export function Cgp36FrustumCullingDiagram() {
  return (
    <Figure>
      <SvgFrame label="视锥剔除图：相机视锥由六个平面组成，包围体完全在外部的对象可以提前跳过">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          frustum culling：提交前先判断对象是否在视野内
        </text>
        <path
          d="M130 106 L590 106 L662 282 L58 282 Z"
          fill={COLORS.accent}
          fillOpacity="0.08"
          stroke={COLORS.accent}
          strokeWidth="3"
        />
        <line
          x1="130"
          y1="106"
          x2="58"
          y2="282"
          stroke={COLORS.border}
          strokeWidth="2"
          strokeDasharray="7 5"
        />
        <line
          x1="590"
          y1="106"
          x2="662"
          y2="282"
          stroke={COLORS.border}
          strokeWidth="2"
          strokeDasharray="7 5"
        />
        <circle cx="360" cy="112" r="12" fill={COLORS.warning} />
        <text
          x="360"
          y="86"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          camera
        </text>
        <rect
          x="302"
          y="166"
          width="56"
          height="44"
          rx="8"
          fill={COLORS.success}
          fillOpacity="0.2"
          stroke={COLORS.success}
          strokeWidth="3"
        />
        <text
          x="330"
          y="193"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.success}
        >
          inside
        </text>
        <rect
          x="520"
          y="204"
          width="58"
          height="44"
          rx="8"
          fill={COLORS.warning}
          fillOpacity="0.2"
          stroke={COLORS.warning}
          strokeWidth="3"
        />
        <text
          x="549"
          y="231"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.warning}
        >
          outside
        </text>
        <Arrow
          x1={580}
          y1={226}
          x2={620}
          y2={226}
          color={COLORS.warning}
          dashed
        />
        <text x="620" y="212" fontSize="13" fill={COLORS.warning}>
          skip
        </text>
        <text
          x="360"
          y="314"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          bound sphere / box 与六个平面逐一测试
        </text>
        <text
          x="360"
          y="347"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          frustum culling 减少对象提交，但不能证明视锥内对象没有被遮挡
        </text>
      </SvgFrame>
    </Figure>
  );
}

export function Cgp36OcclusionDiagram() {
  return (
    <Figure>
      <SvgFrame label="遮挡测试图：先绘制不写颜色的包围体探针，再根据可见像素数量决定是否提交完整对象">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          遮挡与早期拒绝：不同阶段回答不同问题
        </text>
        <rect
          x="34"
          y="88"
          width="172"
          height="204"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="120"
          y="124"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          已有深度
        </text>
        <rect
          x="76"
          y="158"
          width="88"
          height="74"
          rx="10"
          fill={COLORS.accent}
          fillOpacity="0.12"
          stroke={COLORS.accent}
          strokeWidth="2"
        />
        <text
          x="120"
          y="202"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.accent}
        >
          occluder
        </text>
        <text
          x="120"
          y="258"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          不透明前景
        </text>
        <Arrow x1={226} y1={188} x2={262} y2={188} color={COLORS.warning} />
        <rect
          x="274"
          y="88"
          width="172"
          height="204"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="360"
          y="124"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          包围体探针
        </text>
        <rect
          x="314"
          y="158"
          width="92"
          height="74"
          rx="10"
          fill={COLORS.warning}
          fillOpacity="0.12"
          stroke={COLORS.warning}
          strokeWidth="3"
          strokeDasharray="7 5"
        />
        <text
          x="360"
          y="202"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          query
        </text>
        <text
          x="360"
          y="258"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          只统计可见像素
        </text>
        <Arrow x1={466} y1={188} x2={502} y2={188} color={COLORS.success} />
        <rect
          x="514"
          y="88"
          width="172"
          height="204"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="600"
          y="124"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          提交决定
        </text>
        <text
          x="600"
          y="168"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.success}
        >
          pixels &gt; 0 → draw
        </text>
        <text
          x="600"
          y="208"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          pixels = 0 → skip
        </text>
        <text
          x="600"
          y="258"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          下一帧读取结果
        </text>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          query 不应改写 color 或 depth buffer，且结果可能延迟一帧
        </text>
      </SvgFrame>
    </Figure>
  );
}

function VisibilityScene({
  mode,
  near,
  far,
  bias,
  objects,
}: {
  mode: VisibilityMode;
  near: number;
  far: number;
  bias: number;
  objects: number;
}) {
  const isFrustum = mode === "frustum culling";
  const isOcclusion = mode === "occlusion query";
  const isDebug = mode === "debug";
  const visible = Math.max(
    1,
    Math.round(objects * (isFrustum ? 0.64 : isOcclusion ? 0.42 : 0.74)),
  );
  const submitted = isDebug
    ? objects
    : isFrustum
      ? visible
      : isOcclusion
        ? Math.max(1, Math.round(visible * 0.72))
        : objects;
  return (
    <svg
      viewBox="0 0 720 320"
      role="img"
      aria-label="可见性判定实验场景：比较深度测试、视锥剔除和遮挡查询对对象提交的影响"
      className="block h-auto w-full"
    >
      <rect width="720" height="320" rx="14" fill={COLORS.bg} />
      <text
        x="360"
        y="27"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={COLORS.text}
      >
        {mode}：对象提交与像素判定
      </text>
      <path
        d="M86 240 L176 144 L290 144 L380 240 Z"
        fill={COLORS.accent}
        fillOpacity="0.08"
        stroke={COLORS.accent}
        strokeWidth="3"
      />
      <circle cx="188" cy="178" r="12" fill={COLORS.warning} />
      <text
        x="188"
        y="124"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.warning}
      >
        camera
      </text>
      <rect
        x="310"
        y="164"
        width="80"
        height="62"
        rx="10"
        fill={COLORS.success}
        fillOpacity="0.18"
        stroke={COLORS.success}
        strokeWidth="3"
      />
      <text
        x="350"
        y="201"
        textAnchor="middle"
        fontSize="14"
        fill={COLORS.success}
      >
        occluder
      </text>
      <rect
        x="418"
        y="126"
        width="70"
        height="52"
        rx="8"
        fill={COLORS.warning}
        fillOpacity="0.18"
        stroke={COLORS.warning}
        strokeWidth="2"
      />
      <text
        x="453"
        y="158"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.warning}
      >
        object A
      </text>
      <rect
        x="520"
        y="210"
        width="74"
        height="54"
        rx="8"
        fill={COLORS.secondary}
        fillOpacity="0.16"
        stroke={COLORS.secondary}
        strokeWidth="2"
      />
      <text
        x="557"
        y="243"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.secondary}
      >
        object B
      </text>
      {isDebug ? (
        <>
          <line
            x1="402"
            y1="106"
            x2="602"
            y2="106"
            stroke={COLORS.warning}
            strokeWidth="2"
            strokeDasharray="7 5"
          />
          <text
            x="502"
            y="92"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.warning}
          >
            near / far 边界
          </text>
        </>
      ) : null}
      <rect
        x="64"
        y="264"
        width="592"
        height="30"
        rx="8"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x="360"
        y="285"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.secondary}
      >
        objects {objects} · visible {visible} · submitted {submitted} · near{" "}
        {near.toFixed(2)} · far {far.toFixed(2)} · bias {bias.toFixed(3)}
      </text>
    </svg>
  );
}

export function Cgp36VisibilityLab() {
  const [mode, setMode] = useState<VisibilityMode>("depth test");
  const [near, setNear] = useState(0.1);
  const [far, setFar] = useState(0.9);
  const [bias, setBias] = useState(0.02);
  const [objects, setObjects] = useState(24);

  function reset() {
    setMode("depth test");
    setNear(0.1);
    setFar(0.9);
    setBias(0.02);
    setObjects(24);
  }

  const metrics = useMemo(() => {
    const isFrustum = mode === "frustum culling";
    const isOcclusion = mode === "occlusion query";
    const visible = Math.max(
      1,
      Math.round(objects * (isFrustum ? 0.64 : isOcclusion ? 0.42 : 0.74)),
    );
    const submitted =
      mode === "debug"
        ? objects
        : isFrustum
          ? visible
          : isOcclusion
            ? Math.max(1, Math.round(visible * 0.72))
            : objects;
    const precisionRisk = round(Math.max(0, far - near) * 0.18 + bias * 0.9);
    const rejected = Math.max(0, objects - submitted);
    return { visible, submitted, rejected, precisionRisk };
  }, [bias, far, mode, near, objects]);

  return (
    <section
      aria-label="可见性判定专属实验"
      data-visual-kind="cgp-36-visibility-determination"
      data-unit-id="cgp-36"
      className="not-prose my-6 rounded-card border border-border bg-elevated p-4 sm:p-5"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
            Cgp36 Lab
          </p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            可见性判定专属实验
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-secondary">
            固定相机和场景，比较 depth test、frustum culling、occlusion query 与
            debug；观察对象提交和像素保留如何分层变化。
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          aria-label="重置可见性判定实验"
          className="min-h-11 rounded-control border border-border px-3 py-2 text-sm text-secondary hover:border-accent hover:text-primary"
        >
          重置实验
        </button>
      </div>
      <div className="flex flex-wrap gap-2" aria-label="选择可见性模式">
        {(
          ["depth test", "frustum culling", "occlusion query", "debug"] as const
        ).map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={mode === option}
            onClick={() => setMode(option)}
            className={
              "min-h-11 rounded-control border px-3 py-2 text-sm " +
              (mode === option
                ? "border-accent bg-accent/10 font-semibold text-primary"
                : "border-border text-secondary")
            }
          >
            {option}
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-4 rounded-card border border-border bg-background p-4 md:grid-cols-2">
        <label className="flex min-w-40 flex-col gap-1 text-sm text-secondary">
          <span className="flex justify-between gap-3">
            <span>near plane</span>
            <span className="font-mono text-primary">{near.toFixed(2)}</span>
          </span>
          <input
            type="range"
            min="0.05"
            max="0.4"
            step="0.05"
            value={near}
            onChange={(event) => setNear(Number(event.target.value))}
            className="accent-accent"
          />
        </label>
        <label className="flex min-w-40 flex-col gap-1 text-sm text-secondary">
          <span className="flex justify-between gap-3">
            <span>far plane</span>
            <span className="font-mono text-primary">{far.toFixed(2)}</span>
          </span>
          <input
            type="range"
            min="0.6"
            max="1"
            step="0.05"
            value={far}
            onChange={(event) => setFar(Number(event.target.value))}
            className="accent-accent"
          />
        </label>
        <label className="flex min-w-40 flex-col gap-1 text-sm text-secondary">
          <span className="flex justify-between gap-3">
            <span>depth bias</span>
            <span className="font-mono text-primary">{bias.toFixed(3)}</span>
          </span>
          <input
            type="range"
            min="0"
            max="0.08"
            step="0.005"
            value={bias}
            onChange={(event) => setBias(Number(event.target.value))}
            className="accent-accent"
          />
        </label>
        <label className="flex min-w-40 flex-col gap-1 text-sm text-secondary">
          <span className="flex justify-between gap-3">
            <span>对象数量</span>
            <span className="font-mono text-primary">{objects}</span>
          </span>
          <input
            type="range"
            min="8"
            max="48"
            step="4"
            value={objects}
            onChange={(event) => setObjects(Number(event.target.value))}
            className="accent-accent"
          />
        </label>
      </div>
      <div className="mt-4 min-w-0 overflow-hidden rounded-card border border-border bg-background p-3 sm:p-4">
        <VisibilityScene
          mode={mode}
          near={near}
          far={far}
          bias={bias}
          objects={objects}
        />
      </div>
      <div
        className="mt-4 grid gap-3 sm:grid-cols-4"
        role="status"
        aria-live="polite"
      >
        <div className="rounded-card border border-border bg-background p-3">
          <p className="text-xs text-secondary">可见对象</p>
          <p className="mt-1 font-mono text-lg text-primary">
            {metrics.visible}
          </p>
        </div>
        <div className="rounded-card border border-border bg-background p-3">
          <p className="text-xs text-secondary">提交对象</p>
          <p className="mt-1 font-mono text-lg text-primary">
            {metrics.submitted}
          </p>
        </div>
        <div className="rounded-card border border-border bg-background p-3">
          <p className="text-xs text-secondary">提前拒绝</p>
          <p className="mt-1 font-mono text-lg text-primary">
            {metrics.rejected}
          </p>
        </div>
        <div className="rounded-card border border-border bg-background p-3">
          <p className="text-xs text-secondary">精度风险</p>
          <p className="mt-1 font-mono text-lg text-primary">
            {metrics.precisionRisk.toFixed(3)}
          </p>
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-secondary">
        先预测：frustum culling 减少视锥外提交，depth test
        保留最近片段，occlusion query 可能延迟一帧；它们不是同一层的替代品。
      </p>
    </section>
  );
}
