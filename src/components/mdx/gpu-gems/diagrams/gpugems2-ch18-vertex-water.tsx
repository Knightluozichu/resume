"use client";

import { useMemo, useState, type ReactNode } from "react";

type WaterMode = "vertex displacement" | "normal debug" | "lod debug";

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
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 9;
  const leftX = x2 - size * Math.cos(angle - Math.PI / 6);
  const leftY = y2 - size * Math.sin(angle - Math.PI / 6);
  const rightX = x2 - size * Math.cos(angle + Math.PI / 6);
  const rightY = y2 - size * Math.sin(angle + Math.PI / 6);
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="3" />
      <polygon
        points={`${x2},${y2} ${leftX},${leftY} ${rightX},${rightY}`}
        fill={color}
      />
    </>
  );
}

export function GpuGems2Ch18WaterPipelineDiagram() {
  return (
    <Figure>
      <Frame label="顶点纹理位移水面流程：时间和高度纹理进入顶点阶段，输出位移后的几何与可供像素阶段使用的法线">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          vertex texture displacement：在顶点阶段把高度变成几何
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
          输入状态
        </text>
        <text
          x="107"
          y="164"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.accent}
        >
          height maps
        </text>
        <text
          x="107"
          y="198"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          time · wave mix
        </text>
        <text
          x="107"
          y="232"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          mesh UV / LOD
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
          vertex stage
        </text>
        <text
          x="343"
          y="164"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.accent}
        >
          sample height
        </text>
        <text
          x="343"
          y="198"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          p.y += h(u, t)
        </text>
        <text
          x="343"
          y="232"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          emit displaced p
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
          render result
        </text>
        <text
          x="596"
          y="164"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.success}
        >
          curved water mesh
        </text>
        <text
          x="596"
          y="198"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          reconstructed normal
        </text>
        <text
          x="596"
          y="232"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          reflection / refraction
        </text>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          关键边界：顶点纹理读取改变几何位置，但不会自动替你生成正确法线
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch18DisplacementDiagram() {
  return (
    <Figure>
      <Frame label="水面位移图：两张滚动高度纹理通过 UV 采样混合，推动规则网格顶点形成波面">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          从高度场到波面：采样、混合、位移
        </text>
        <g transform="translate(38 86)">
          <rect
            width="142"
            height="174"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.accent}
            strokeWidth="2"
          />
          <text
            x="71"
            y="30"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.accent}
          >
            height A
          </text>
          {[0, 1, 2, 3].map((row) =>
            [0, 1, 2, 3].map((column) => (
              <rect
                key={`a-${row}-${column}`}
                x={21 + column * 27}
                y={48 + row * 27}
                width="22"
                height="22"
                rx="4"
                fill={COLORS.accent}
                fillOpacity={`${0.12 + ((row + column) % 4) * 0.08}`}
                stroke={COLORS.border}
              />
            )),
          )}
          <text
            x="71"
            y="158"
            textAnchor="middle"
            fontSize="12"
            fill={COLORS.secondary}
          >
            UV + time · tile A
          </text>
        </g>
        <Arrow x1={198} y1={172} x2={238} y2={172} />
        <g transform="translate(250 86)">
          <rect
            width="142"
            height="174"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.warning}
            strokeWidth="2"
          />
          <text
            x="71"
            y="30"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.warning}
          >
            height B
          </text>
          {[0, 1, 2, 3].map((row) =>
            [0, 1, 2, 3].map((column) => (
              <rect
                key={`b-${row}-${column}`}
                x={21 + column * 27}
                y={48 + row * 27}
                width="22"
                height="22"
                rx="4"
                fill={COLORS.warning}
                fillOpacity={`${0.12 + ((row * 2 + column) % 4) * 0.08}`}
                stroke={COLORS.border}
              />
            )),
          )}
          <text
            x="71"
            y="158"
            textAnchor="middle"
            fontSize="12"
            fill={COLORS.secondary}
          >
            UV + time · tile B
          </text>
        </g>
        <Arrow x1={410} y1={172} x2={450} y2={172} color={COLORS.success} />
        <g transform="translate(462 86)">
          <rect
            width="220"
            height="174"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.success}
            strokeWidth="2"
          />
          <text
            x="110"
            y="30"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.success}
          >
            displaced mesh
          </text>
          <path
            d="M22 132 C64 90 75 142 112 98 S164 86 198 52"
            fill="none"
            stroke={COLORS.accent}
            strokeWidth="5"
          />
          <path
            d="M22 132 L22 145 M52 112 L52 145 M82 128 L82 145 M112 98 L112 145 M142 100 L142 145 M172 80 L172 145 M198 52 L198 145"
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <path d="M22 145 H198" stroke={COLORS.border} strokeWidth="2" />
          <text
            x="110"
            y="164"
            textAnchor="middle"
            fontSize="12"
            fill={COLORS.secondary}
          >
            p.y = mix(hA, hB, mix) · conservative bounds
          </text>
        </g>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          高度纹理是离散场；UV 滚动、边界寻址和幅度约定共同决定波面是否连续
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch18NormalDiagram() {
  return (
    <Figure>
      <Frame label="法线重建图：从相邻顶点高度估计切线和双切线，用叉积得到位移后水面的法线，再参与光照">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          位移后法线：用邻域差分跟随真实波面
        </text>
        <path
          d="M70 250 C144 158 194 242 266 154 S376 232 456 128 S566 204 650 112"
          fill="none"
          stroke={COLORS.accent}
          strokeWidth="6"
        />
        <circle cx="360" cy="184" r="8" fill={COLORS.warning} />
        <line
          x1="360"
          y1="184"
          x2="304"
          y2="238"
          stroke={COLORS.success}
          strokeWidth="4"
        />
        <polygon points="304,238 316,233 309,246" fill={COLORS.success} />
        <text
          x="294"
          y="266"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.success}
        >
          T ≈ p(x + ε) − p(x)
        </text>
        <line
          x1="360"
          y1="184"
          x2="425"
          y2="226"
          stroke={COLORS.warning}
          strokeWidth="4"
        />
        <polygon points="425,226 413,225 420,216" fill={COLORS.warning} />
        <text
          x="455"
          y="250"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.warning}
        >
          B ≈ p(z + ε) − p(z)
        </text>
        <line
          x1="360"
          y1="184"
          x2="360"
          y2="92"
          stroke={COLORS.success}
          strokeWidth="4"
        />
        <polygon points="360,92 353,105 367,105" fill={COLORS.success} />
        <text
          x="360"
          y="78"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={COLORS.success}
        >
          N = normalize(T × B)
        </text>
        <rect
          x="48"
          y="292"
          width="624"
          height="42"
          rx="12"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="360"
          y="319"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          只更新位置不更新法线 →
          反射高光仍按旧平面计算，水面会显得“平滑但不对光”
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch18LodDiagram() {
  return (
    <Figure>
      <Frame label="水面细节层级图：相机距离决定网格密度、纹理采样和位移幅度，避免远景顶点浪费与近景波纹缺失">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          LOD：让网格密度匹配屏幕上的水面细节
        </text>
        <path d="M82 110 H638" stroke={COLORS.border} strokeWidth="4" />
        <circle cx="108" cy="110" r="12" fill={COLORS.warning} />
        <text
          x="108"
          y="82"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.warning}
        >
          near camera
        </text>
        <circle cx="360" cy="110" r="12" fill={COLORS.accent} />
        <text
          x="360"
          y="82"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.accent}
        >
          mid
        </text>
        <circle cx="612" cy="110" r="12" fill={COLORS.success} />
        <text
          x="612"
          y="82"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.success}
        >
          far
        </text>
        <g transform="translate(52 150)">
          <rect
            width="170"
            height="116"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.warning}
            strokeWidth="2"
          />
          <text
            x="85"
            y="30"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.warning}
          >
            high density
          </text>
          <path
            d="M18 84 L44 52 L70 84 L96 48 L122 84 L148 55"
            fill="none"
            stroke={COLORS.warning}
            strokeWidth="3"
          />
          <text
            x="85"
            y="104"
            textAnchor="middle"
            fontSize="12"
            fill={COLORS.secondary}
          >
            fine vertices · sharp detail
          </text>
        </g>
        <g transform="translate(275 150)">
          <rect
            width="170"
            height="116"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.accent}
            strokeWidth="2"
          />
          <text
            x="85"
            y="30"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.accent}
          >
            balanced
          </text>
          <path
            d="M18 82 L58 54 L98 82 L138 58"
            fill="none"
            stroke={COLORS.accent}
            strokeWidth="4"
          />
          <text
            x="85"
            y="104"
            textAnchor="middle"
            fontSize="12"
            fill={COLORS.secondary}
          >
            fewer samples · stable motion
          </text>
        </g>
        <g transform="translate(498 150)">
          <rect
            width="170"
            height="116"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.success}
            strokeWidth="2"
          />
          <text
            x="85"
            y="30"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.success}
          >
            low density
          </text>
          <path
            d="M18 78 L75 64 L145 72"
            fill="none"
            stroke={COLORS.success}
            strokeWidth="5"
          />
          <text
            x="85"
            y="104"
            textAnchor="middle"
            fontSize="12"
            fill={COLORS.secondary}
          >
            wide footprint · low cost
          </text>
        </g>
        <text
          x="360"
          y="332"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          LOD 不是简单删点：需要同时调整网格、height mip、法线邻域与位移幅度
        </text>
      </Frame>
    </Figure>
  );
}

type WaterPoint = { x: number; y: number; height: number };

function WaterLabScene({
  mode,
  time,
  waveMix,
  gridSize,
  distance,
}: {
  mode: WaterMode;
  time: number;
  waveMix: number;
  gridSize: number;
  distance: number;
}) {
  const points = useMemo<WaterPoint[]>(() => {
    const cells = Math.max(6, Math.round(gridSize / (distance > 7 ? 2 : 1)));
    return Array.from({ length: cells * cells }, (_, index) => {
      const row = Math.floor(index / cells);
      const column = index % cells;
      const u = column / (cells - 1);
      const v = row / (cells - 1);
      const waveA =
        Math.sin(u * 10.5 + time * 1.2) * 0.55 +
        Math.cos(v * 8.5 - time * 0.8) * 0.35;
      const waveB =
        Math.sin((u + v) * 14 - time * 1.45) * 0.28 +
        Math.cos((u - v) * 12 + time) * 0.25;
      const height = round(
        waveA * (1 - waveMix / 100) + waveB * (waveMix / 100),
      );
      return {
        x: round(54 + u * 438),
        y: round(116 + v * 164 - height * 25),
        height,
      };
    });
  }, [distance, gridSize, time, waveMix]);
  const cells = Math.max(6, Math.round(gridSize / (distance > 7 ? 2 : 1)));
  const heightValues = points.map((point) => point.height);
  const minHeight = Math.min(...heightValues);
  const maxHeight = Math.max(...heightValues);
  const samples =
    points.length *
    (mode === "normal debug" ? 3 : mode === "lod debug" ? 1 : 2);

  return (
    <svg
      viewBox="0 0 720 380"
      role="img"
      aria-label="顶点纹理位移水面实验：调整波形混合、时间、网格密度与相机距离，观察位移网格和法线调试结果"
      className="block h-auto w-full"
    >
      <rect width="720" height="380" rx="14" fill={COLORS.bg} />
      <text
        x="360"
        y="27"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={COLORS.text}
      >
        {mode === "vertex displacement"
          ? "vertex displacement：高度场推动网格"
          : mode === "normal debug"
            ? "normal debug：位移后邻域重建法线"
            : "lod debug：距离改变有效采样密度"}
      </text>
      <rect
        x="28"
        y="52"
        width="500"
        height="270"
        rx="14"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      {Array.from({ length: cells }, (_, row) =>
        Array.from({ length: cells - 1 }, (_, column) => {
          const start = row * cells + column;
          const next = start + 1;
          return (
            <line
              key={`h-${row}-${column}`}
              x1={points[start].x}
              y1={points[start].y}
              x2={points[next].x}
              y2={points[next].y}
              stroke={COLORS.accent}
              strokeOpacity="0.45"
              strokeWidth="1.5"
            />
          );
        }),
      )}
      {Array.from({ length: cells - 1 }, (_, row) =>
        Array.from({ length: cells }, (_, column) => {
          const start = row * cells + column;
          const next = start + cells;
          return (
            <line
              key={`v-${row}-${column}`}
              x1={points[start].x}
              y1={points[start].y}
              x2={points[next].x}
              y2={points[next].y}
              stroke={COLORS.accent}
              strokeOpacity="0.45"
              strokeWidth="1.5"
            />
          );
        }),
      )}
      {points
        .filter((_, index) => index % Math.max(1, Math.floor(cells / 6)) === 0)
        .map((point, index) => {
          const normalLength = 17 + point.height * 5;
          return (
            <g key={`point-${index}`}>
              <circle
                cx={point.x}
                cy={point.y}
                r="3"
                fill={mode === "normal debug" ? COLORS.success : COLORS.warning}
              />
              {mode === "normal debug" && (
                <line
                  x1={point.x}
                  y1={point.y}
                  x2={point.x}
                  y2={point.y - normalLength}
                  stroke={COLORS.success}
                  strokeWidth="2"
                />
              )}
            </g>
          );
        })}
      <path
        d="M42 278 C134 250 208 294 286 264 S412 286 512 244"
        fill="none"
        stroke={COLORS.warning}
        strokeWidth="2"
        strokeDasharray="7 6"
      />
      <text
        x="270"
        y="304"
        textAnchor="middle"
        fontSize="12"
        fill={COLORS.secondary}
      >
        displaced surface · grid {cells} × {cells}
      </text>
      <rect
        x="546"
        y="52"
        width="144"
        height="270"
        rx="14"
        fill={COLORS.surface}
        stroke={COLORS.accent}
        strokeWidth="2"
      />
      <text
        x="618"
        y="82"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={COLORS.text}
      >
        实验记录
      </text>
      <text x="562" y="120" fontSize="12" fill={COLORS.secondary}>
        height min
      </text>
      <text
        x="674"
        y="120"
        textAnchor="end"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.accent}
      >
        {minHeight.toFixed(2)}
      </text>
      <text x="562" y="153" fontSize="12" fill={COLORS.secondary}>
        height max
      </text>
      <text
        x="674"
        y="153"
        textAnchor="end"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.warning}
      >
        {maxHeight.toFixed(2)}
      </text>
      <text x="562" y="186" fontSize="12" fill={COLORS.secondary}>
        vertex samples
      </text>
      <text
        x="674"
        y="186"
        textAnchor="end"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.success}
      >
        {samples}
      </text>
      <text x="562" y="219" fontSize="12" fill={COLORS.secondary}>
        camera distance
      </text>
      <text
        x="674"
        y="219"
        textAnchor="end"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.text}
      >
        {distance.toFixed(1)}
      </text>
      <text
        x="618"
        y="260"
        textAnchor="middle"
        fontSize="12"
        fill={COLORS.secondary}
      >
        法线调试时
      </text>
      <text
        x="618"
        y="282"
        textAnchor="middle"
        fontSize="12"
        fill={COLORS.success}
      >
        绿色线 = N
      </text>
      <text
        x="360"
        y="350"
        textAnchor="middle"
        fontSize="14"
        fill={COLORS.warning}
      >
        time 改变波相位；distance 变大后减少有效网格，避免远景顶点工作浪费
      </text>
    </svg>
  );
}

export function GpuGems2Ch18VertexWaterLab() {
  const [mode, setMode] = useState<WaterMode>("vertex displacement");
  const [time, setTime] = useState(2.4);
  const [waveMix, setWaveMix] = useState(42);
  const [gridSize, setGridSize] = useState(18);
  const [distance, setDistance] = useState(4.5);

  function reset() {
    setMode("vertex displacement");
    setTime(2.4);
    setWaveMix(42);
    setGridSize(18);
    setDistance(4.5);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
      aria-label="GPU Gems 2 Chapter 18 顶点纹理位移水面实验"
      data-visual-kind="gpu-gems2-ch18-vertex-water"
      data-unit-id="gpg-v2-18"
    >
      <div className="border-b border-border px-5 py-4">
        <p className="text-sm font-semibold text-primary">
          Vertex texture displacement 水面实验
        </p>
        <p className="mt-1 text-sm text-secondary">
          先改变高度场，再打开法线与 LOD
          调试，观察几何、光照和带宽如何互相约束。
        </p>
      </div>
      <div className="grid gap-5 p-5 lg:grid-cols-[1fr_240px]">
        <div className="overflow-hidden rounded-card border border-border bg-[var(--bg)] p-3">
          <WaterLabScene
            mode={mode}
            time={time}
            waveMix={waveMix}
            gridSize={gridSize}
            distance={distance}
          />
        </div>
        <div className="space-y-4">
          <div className="grid gap-2">
            {(
              [
                "vertex displacement",
                "normal debug",
                "lod debug",
              ] as WaterMode[]
            ).map((nextMode) => (
              <button
                key={nextMode}
                type="button"
                aria-pressed={mode === nextMode}
                onClick={() => setMode(nextMode)}
                className="min-h-11 rounded-md border border-border px-3 py-2 text-left text-sm font-semibold text-primary transition hover:border-[var(--accent)]"
              >
                {nextMode === "vertex displacement"
                  ? "位移网格"
                  : nextMode === "normal debug"
                    ? "法线调试"
                    : "LOD 调试"}
              </button>
            ))}
          </div>
          <label className="block text-sm text-secondary">
            wave time：{time.toFixed(1)}
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="0"
              max="10"
              step="0.2"
              value={time}
              onChange={(event) => setTime(Number(event.target.value))}
            />
          </label>
          <label className="block text-sm text-secondary">
            wave B mix：{waveMix}%
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="0"
              max="100"
              step="5"
              value={waveMix}
              onChange={(event) => setWaveMix(Number(event.target.value))}
            />
          </label>
          <label className="block text-sm text-secondary">
            grid density：{gridSize}
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="8"
              max="24"
              step="2"
              value={gridSize}
              onChange={(event) => setGridSize(Number(event.target.value))}
            />
          </label>
          <label className="block text-sm text-secondary">
            camera distance：{distance.toFixed(1)}
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="2"
              max="10"
              step="0.5"
              value={distance}
              onChange={(event) => setDistance(Number(event.target.value))}
            />
          </label>
          <p
            className="rounded-md border border-border bg-[var(--bg)] p-3 text-xs leading-5 text-secondary"
            aria-live="polite"
          >
            {mode === "normal debug"
              ? "法线调试显示邻域差分的方向；若法线仍水平，检查位移后的邻居是否真正参与计算。"
              : mode === "lod debug"
                ? "LOD 调试会随距离减少有效网格；近景若细节不足，先检查屏幕覆盖率而不是盲目增加振幅。"
                : "位移网格显示高度场的几何结果；时间变化只改变相位，不能替代索引/边界更新。"}
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
