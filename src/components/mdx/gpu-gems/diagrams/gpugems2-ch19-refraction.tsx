"use client";

import { useMemo, useState, type ReactNode } from "react";

type MediumDirection = "air → glass" | "glass → air";
type RefractionMode = "refraction vector" | "thickness debug" | "TIR debug";

const COLORS = {
  accent: "var(--accent)",
  bg: "var(--bg)",
  border: "var(--border)",
  danger: "var(--danger)",
  secondary: "var(--text-secondary)",
  success: "var(--success)",
  surface: "var(--surface)",
  text: "var(--text-primary)",
  warning: "var(--warning)",
} as const;

function round(value: number): number {
  return Math.round(value * 1000) / 1000;
}

function Figure({ children }: { children: ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        {children}
      </div>
    </figure>
  );
}

function Frame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg
      viewBox="0 0 720 390"
      role="img"
      aria-label={label}
      className="mx-auto block h-auto w-full max-w-[720px]"
    >
      <rect width="720" height="390" rx="14" fill={COLORS.bg} />
      {children}
    </svg>
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color = COLORS.accent,
  dashed = false,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  dashed?: boolean;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 9;
  const leftX = x2 - size * Math.cos(angle - Math.PI / 6);
  const leftY = y2 - size * Math.sin(angle - Math.PI / 6);
  const rightX = x2 - size * Math.cos(angle + Math.PI / 6);
  const rightY = y2 - size * Math.sin(angle + Math.PI / 6);
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

export function GpuGems2Ch19RefractionPipelineDiagram() {
  return (
    <Figure>
      <Frame label="通用折射模拟流程：从表面位置、法线和介质参数计算折射方向，再用厚度或屏幕空间查询得到颜色">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          Generic Refraction Simulation：方向计算与颜色查询分层
        </text>
        <rect
          x="30"
          y="92"
          width="154"
          height="188"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="107"
          y="126"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          表面输入
        </text>
        <text
          x="107"
          y="164"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.accent}
        >
          I · N · IOR
        </text>
        <text
          x="107"
          y="198"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          front position
        </text>
        <text
          x="107"
          y="232"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          depth / thickness
        </text>
        <Arrow x1={202} y1={186} x2={240} y2={186} />
        <rect
          x="252"
          y="92"
          width="182"
          height="188"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.accent}
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
          方向阶段
        </text>
        <text
          x="343"
          y="164"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.accent}
        >
          Snell / refract
        </text>
        <text
          x="343"
          y="198"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          T · exit point
        </text>
        <text
          x="343"
          y="232"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          TIR fallback
        </text>
        <Arrow x1={452} y1={186} x2={490} y2={186} color={COLORS.success} />
        <rect
          x="502"
          y="92"
          width="188"
          height="188"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.success}
          strokeWidth="2"
        />
        <text
          x="596"
          y="126"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          颜色阶段
        </text>
        <text
          x="596"
          y="164"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.success}
        >
          screen lookup
        </text>
        <text
          x="596"
          y="198"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          environment / backface
        </text>
        <text
          x="596"
          y="232"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          blend · Fresnel
        </text>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          折射向量决定“看向哪里”，厚度与深度决定“穿过多少介质”
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch19SnellDiagram() {
  return (
    <Figure>
      <Frame label="斯涅尔定律示意图：入射光在界面处根据两个介质的折射率改变方向，超过临界角时发生全内反射">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          Snell：折射只改变法线方向上的分量
        </text>
        <rect
          x="52"
          y="72"
          width="616"
          height="242"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <path d="M70 190 H650" stroke={COLORS.border} strokeWidth="3" />
        <text
          x="90"
          y="142"
          fontSize="14"
          fontWeight="700"
          fill={COLORS.accent}
        >
          medium 1 · n₁
        </text>
        <text
          x="90"
          y="248"
          fontSize="14"
          fontWeight="700"
          fill={COLORS.success}
        >
          medium 2 · n₂
        </text>
        <line
          x1="360"
          y1="86"
          x2="360"
          y2="298"
          stroke={COLORS.secondary}
          strokeWidth="2"
          strokeDasharray="8 6"
        />
        <text x="372" y="106" fontSize="13" fill={COLORS.secondary}>
          normal N
        </text>
        <Arrow x1={218} y1={88} x2={360} y2={190} color={COLORS.accent} />
        <Arrow x1={360} y1={190} x2={486} y2={292} color={COLORS.success} />
        <path
          d="M360 132 A58 58 0 0 0 318 154"
          fill="none"
          stroke={COLORS.accent}
          strokeWidth="2"
        />
        <path
          d="M360 242 A52 52 0 0 1 395 226"
          fill="none"
          stroke={COLORS.success}
          strokeWidth="2"
        />
        <text x="290" y="130" fontSize="13" fill={COLORS.accent}>
          θᵢ
        </text>
        <text x="393" y="250" fontSize="13" fill={COLORS.success}>
          θₜ
        </text>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          n₁ sin(θᵢ) = n₂ sin(θₜ)；如果 sin(θₜ) 超过 1，就不能继续传播
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch19ThicknessDiagram() {
  return (
    <Figure>
      <Frame label="厚度近似图：前表面折射射线穿过物体，到达后表面后再次折射，厚度估计影响屏幕空间取样位置">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          front → inside → back：厚度决定颜色偏移
        </text>
        <path
          d="M130 82 C90 146 96 240 144 302"
          fill="none"
          stroke={COLORS.accent}
          strokeWidth="5"
        />
        <path
          d="M590 82 C630 146 624 240 576 302"
          fill="none"
          stroke={COLORS.success}
          strokeWidth="5"
        />
        <text
          x="105"
          y="64"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={COLORS.accent}
        >
          front surface
        </text>
        <text
          x="615"
          y="64"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={COLORS.success}
        >
          back surface
        </text>
        <Arrow x1={206} y1={92} x2={300} y2={174} color={COLORS.warning} />
        <Arrow x1={300} y1={174} x2={422} y2={222} color={COLORS.warning} />
        <Arrow x1={422} y1={222} x2={524} y2={292} color={COLORS.success} />
        <line
          x1="298"
          y1="174"
          x2="424"
          y2="222"
          stroke={COLORS.border}
          strokeWidth="2"
          strokeDasharray="8 6"
        />
        <text
          x="360"
          y="194"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          inside distance / thickness
        </text>
        <rect
          x="234"
          y="252"
          width="252"
          height="48"
          rx="12"
          fill={COLORS.surface}
          stroke={COLORS.warning}
          strokeWidth="2"
        />
        <text
          x="360"
          y="282"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.warning}
        >
          offset = T · thickness → lookup UV
        </text>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          只有 front normal 的近似会失去后表面信息；厚度纹理或 backface depth
          能补回一部分证据
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch19ErrorBudgetDiagram() {
  return (
    <Figure>
      <Frame label="通用折射误差预算：法线、折射率、厚度、屏幕空间投影和全内反射分别影响结果">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          generic refraction 的误差来自哪里？
        </text>
        {[
          {
            y: 88,
            label: "normal",
            note: "方向偏差 → 高光/折射抖动",
            color: COLORS.accent,
            width: 228,
          },
          {
            y: 140,
            label: "IOR",
            note: "介质参数错 → 弯折角错误",
            color: COLORS.warning,
            width: 184,
          },
          {
            y: 192,
            label: "thickness",
            note: "深度近似错 → 偏移过大",
            color: COLORS.success,
            width: 268,
          },
          {
            y: 244,
            label: "screen lookup",
            note: "投影出界 → 拉伸/黑洞",
            color: COLORS.danger,
            width: 154,
          },
        ].map((row) => (
          <g key={row.label}>
            <text
              x="52"
              y={row.y + 24}
              fontSize="14"
              fontWeight="700"
              fill={row.color}
            >
              {row.label}
            </text>
            <rect
              x="170"
              y={row.y}
              width="360"
              height="32"
              rx="9"
              fill={COLORS.surface}
              stroke={COLORS.border}
              strokeWidth="2"
            />
            <rect
              x="170"
              y={row.y}
              width={row.width}
              height="32"
              rx="9"
              fill={row.color}
              fillOpacity="0.22"
            />
            <text x="548" y={row.y + 22} fontSize="13" fill={COLORS.secondary}>
              {row.note}
            </text>
          </g>
        ))}
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          先建立可解释的近似，再把误差限制在材质、视角和屏幕 footprint
          能接受的范围
        </text>
      </Frame>
    </Figure>
  );
}

function RefractionScene({
  direction,
  mode,
  angle,
  ior,
  thickness,
}: {
  direction: MediumDirection;
  mode: RefractionMode;
  angle: number;
  ior: number;
  thickness: number;
}) {
  const incident = (angle * Math.PI) / 180;
  const eta = direction === "air → glass" ? 1 / ior : ior;
  const sinTransmitted = Math.sin(incident) * eta;
  const totalInternalReflection = sinTransmitted > 1;
  const transmitted = totalInternalReflection ? 0 : Math.asin(sinTransmitted);
  const rayLength = 110;
  const incidentEndX = round(320 - Math.sin(incident) * rayLength);
  const incidentEndY = 78;
  const transmittedEndX = round(
    320 +
      (totalInternalReflection ? Math.sin(incident) : Math.sin(transmitted)) *
        rayLength,
  );
  const transmittedEndY = 302;
  const offset = round(
    thickness * Math.tan(totalInternalReflection ? incident : transmitted),
  );
  const displayedOffset = mode === "thickness debug" ? offset : 0;
  const rayColor = totalInternalReflection ? COLORS.danger : COLORS.success;

  return (
    <svg
      viewBox="0 0 720 390"
      role="img"
      aria-label="通用折射模拟实验：调整入射角、折射率和厚度，观察折射向量与全内反射"
      className="block h-auto w-full"
    >
      <rect width="720" height="390" rx="14" fill={COLORS.bg} />
      <text
        x="360"
        y="27"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={COLORS.text}
      >
        {mode === "refraction vector"
          ? "refract：方向随 IOR 改变"
          : mode === "thickness debug"
            ? "thickness debug：偏移随穿透距离改变"
            : "TIR debug：检查临界角边界"}
      </text>
      <rect
        x="28"
        y="52"
        width="492"
        height="270"
        rx="14"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <path d="M40 190 H508" stroke={COLORS.border} strokeWidth="3" />
      <line
        x1="320"
        y1="64"
        x2="320"
        y2="310"
        stroke={COLORS.secondary}
        strokeWidth="2"
        strokeDasharray="8 6"
      />
      <text x="48" y="116" fontSize="13" fill={COLORS.accent}>
        {direction === "air → glass" ? "air · n≈1" : "glass · n=IOR"}
      </text>
      <text x="48" y="278" fontSize="13" fill={COLORS.success}>
        {direction === "air → glass" ? "glass · n=IOR" : "air · n≈1"}
      </text>
      <Arrow
        x1={incidentEndX}
        y1={incidentEndY}
        x2={320}
        y2={190}
        color={COLORS.accent}
      />
      <Arrow
        x1={320}
        y1={190}
        x2={transmittedEndX}
        y2={transmittedEndY}
        color={rayColor}
      />
      <path
        d={`M320 190 A52 52 0 0 0 ${round(320 - Math.sin(incident) * 52)} ${round(190 - Math.cos(incident) * 52)}`}
        fill="none"
        stroke={COLORS.accent}
        strokeWidth="2"
      />
      {!totalInternalReflection && (
        <path
          d={`M320 190 A52 52 0 0 1 ${round(320 + Math.sin(transmitted) * 52)} ${round(190 + Math.cos(transmitted) * 52)}`}
          fill="none"
          stroke={COLORS.success}
          strokeWidth="2"
        />
      )}
      {mode === "thickness debug" && (
        <line
          x1={320}
          y1={190}
          x2={round(320 + displayedOffset * 35)}
          y2={190}
          stroke={COLORS.warning}
          strokeWidth="5"
          strokeDasharray="6 5"
        />
      )}
      <text x="334" y="82" fontSize="13" fill={COLORS.secondary}>
        N
      </text>
      <text x="270" y="143" fontSize="13" fill={COLORS.accent}>
        θᵢ {angle}°
      </text>
      <text x="350" y="238" fontSize="13" fill={rayColor}>
        {totalInternalReflection
          ? "TIR · reflect"
          : `θₜ ${round((transmitted * 180) / Math.PI)}°`}
      </text>
      <rect
        x="538"
        y="52"
        width="152"
        height="270"
        rx="14"
        fill={COLORS.surface}
        stroke={rayColor}
        strokeWidth="2"
      />
      <text
        x="614"
        y="82"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={COLORS.text}
      >
        查询记录
      </text>
      <text x="552" y="120" fontSize="12" fill={COLORS.secondary}>
        IOR
      </text>
      <text
        x="676"
        y="120"
        textAnchor="end"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.accent}
      >
        {ior.toFixed(2)}
      </text>
      <text x="552" y="153" fontSize="12" fill={COLORS.secondary}>
        transmitted
      </text>
      <text
        x="676"
        y="153"
        textAnchor="end"
        fontSize="15"
        fontWeight="700"
        fill={rayColor}
      >
        {totalInternalReflection
          ? "none"
          : `${((transmitted * 180) / Math.PI).toFixed(1)}°`}
      </text>
      <text x="552" y="186" fontSize="12" fill={COLORS.secondary}>
        thickness
      </text>
      <text
        x="676"
        y="186"
        textAnchor="end"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.warning}
      >
        {thickness.toFixed(2)}
      </text>
      <text x="552" y="219" fontSize="12" fill={COLORS.secondary}>
        lookup offset
      </text>
      <text
        x="676"
        y="219"
        textAnchor="end"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.success}
      >
        {offset.toFixed(2)}
      </text>
      <text
        x="614"
        y="267"
        textAnchor="middle"
        fontSize="12"
        fill={COLORS.secondary}
      >
        sin θₜ {totalInternalReflection ? "> 1" : "≤ 1"}
      </text>
      <text x="614" y="289" textAnchor="middle" fontSize="12" fill={rayColor}>
        {totalInternalReflection
          ? "use reflection fallback"
          : "sample refracted color"}
      </text>
      <text
        x="360"
        y="350"
        textAnchor="middle"
        fontSize="14"
        fill={COLORS.warning}
      >
        角度接近临界值时，先看 TIR 证据，再决定 screen-space lookup 如何退化
      </text>
    </svg>
  );
}

export function GpuGems2Ch19RefractionLab() {
  const [direction, setDirection] = useState<MediumDirection>("air → glass");
  const [mode, setMode] = useState<RefractionMode>("refraction vector");
  const [angle, setAngle] = useState(34);
  const [ior, setIor] = useState(1.5);
  const [thickness, setThickness] = useState(0.6);

  function reset() {
    setDirection("air → glass");
    setMode("refraction vector");
    setAngle(34);
    setIor(1.5);
    setThickness(0.6);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
      aria-label="GPU Gems 2 Chapter 19 通用折射模拟实验"
      data-visual-kind="gpu-gems2-ch19-refraction"
      data-unit-id="gpg-v2-19"
    >
      <div className="border-b border-border px-5 py-4">
        <p className="text-sm font-semibold text-primary">
          Generic refraction 实验
        </p>
        <p className="mt-1 text-sm text-secondary">
          改变介质方向、入射角、IOR 与厚度，分辨折射方向、颜色偏移和全内反射。
        </p>
      </div>
      <div className="grid gap-5 p-5 lg:grid-cols-[1fr_240px]">
        <div className="overflow-hidden rounded-card border border-border bg-[var(--bg)] p-3">
          <RefractionScene
            direction={direction}
            mode={mode}
            angle={angle}
            ior={ior}
            thickness={thickness}
          />
        </div>
        <div className="space-y-4">
          <div className="grid gap-2">
            {(["air → glass", "glass → air"] as MediumDirection[]).map(
              (nextDirection) => (
                <button
                  key={nextDirection}
                  type="button"
                  aria-pressed={direction === nextDirection}
                  onClick={() => setDirection(nextDirection)}
                  className="min-h-11 rounded-md border border-border px-3 py-2 text-left text-sm font-semibold text-primary transition hover:border-[var(--accent)]"
                >
                  {nextDirection}
                </button>
              ),
            )}
          </div>
          <div className="grid gap-2">
            {(
              [
                "refraction vector",
                "thickness debug",
                "TIR debug",
              ] as RefractionMode[]
            ).map((nextMode) => (
              <button
                key={nextMode}
                type="button"
                aria-pressed={mode === nextMode}
                onClick={() => setMode(nextMode)}
                className="min-h-11 rounded-md border border-border px-3 py-2 text-left text-sm font-semibold text-primary transition hover:border-[var(--accent)]"
              >
                {nextMode === "refraction vector"
                  ? "方向调试"
                  : nextMode === "thickness debug"
                    ? "厚度调试"
                    : "TIR 调试"}
              </button>
            ))}
          </div>
          <label className="block text-sm text-secondary">
            incident angle：{angle}°
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="0"
              max="80"
              step="2"
              value={angle}
              onChange={(event) => setAngle(Number(event.target.value))}
            />
          </label>
          <label className="block text-sm text-secondary">
            index of refraction：{ior.toFixed(2)}
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="1.1"
              max="2.0"
              step="0.05"
              value={ior}
              onChange={(event) => setIor(Number(event.target.value))}
            />
          </label>
          <label className="block text-sm text-secondary">
            thickness：{thickness.toFixed(2)}
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="0.1"
              max="1.2"
              step="0.1"
              value={thickness}
              onChange={(event) => setThickness(Number(event.target.value))}
            />
          </label>
          <p
            className="rounded-md border border-border bg-[var(--bg)] p-3 text-xs leading-5 text-secondary"
            aria-live="polite"
          >
            {mode === "TIR debug"
              ? "玻璃到空气且入射角增大时，sin θₜ 可能超过 1；此时必须走反射 fallback。"
              : mode === "thickness debug"
                ? "厚度只决定穿透后的颜色查询偏移，不能修复错误的 IOR 或法线。"
                : "先计算 refract 方向，再决定使用环境、后表面或 screen-space 颜色来源。"}
          </p>
          <button
            type="button"
            className="min-h-11 w-full rounded-md border border-border px-3 py-2 text-sm font-semibold text-primary transition hover:border-[var(--accent)]"
            onClick={reset}
          >
            重置
          </button>
        </div>
      </div>
    </section>
  );
}
