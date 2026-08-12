"use client";

import { useMemo, useState, type ReactNode } from "react";

type FilterMode = "box" | "gaussian" | "cubic";

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
  const leftX = round(x2 - size * Math.cos(angle - Math.PI / 6));
  const leftY = round(y2 - size * Math.sin(angle - Math.PI / 6));
  const rightX = round(x2 - size * Math.cos(angle + Math.PI / 6));
  const rightY = round(y2 - size * Math.sin(angle + Math.PI / 6));
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

export function GpuGems2Ch22PrefilterPipelineDiagram() {
  return (
    <Figure>
      <Frame label="快速预滤波线段流程：离线卷积生成查找表，运行时用距离和两次查表得到强度">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          Fast Prefiltered Lines：把昂贵卷积移到 preprocess
        </text>
        <rect
          x="28"
          y="92"
          width="156"
          height="186"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="106"
          y="126"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          几何与滤波器
        </text>
        <text
          x="106"
          y="164"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.accent}
        >
          line width w
        </text>
        <text
          x="106"
          y="198"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          symmetric filter
        </text>
        <text
          x="106"
          y="232"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          support radius R
        </text>
        <Arrow x1={198} y1={184} x2={232} y2={184} />
        <rect
          x="244"
          y="92"
          width="176"
          height="186"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.accent}
          strokeWidth="2"
        />
        <text
          x="332"
          y="126"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.accent}
        >
          offline preprocess
        </text>
        <text
          x="332"
          y="164"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          convolution by distance
        </text>
        <text
          x="332"
          y="198"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          normalize to d ∈ [0, 1]
        </text>
        <text
          x="332"
          y="232"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.warning}
        >
          32-entry lookup table
        </text>
        <Arrow x1={434} y1={184} x2={468} y2={184} color={COLORS.success} />
        <rect
          x="480"
          y="92"
          width="212"
          height="186"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.success}
          strokeWidth="2"
        />
        <text
          x="586"
          y="126"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.success}
        >
          runtime pixel shader
        </text>
        <text
          x="586"
          y="164"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          four edge functions
        </text>
        <text
          x="586"
          y="198"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          min(side) × min(end)
        </text>
        <text
          x="586"
          y="232"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.warning}
        >
          intensity + discard
        </text>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          运行时成本固定：少量 dot、min 和两次 1D lookup，不随滤波器复杂度增长
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch22FilterDiagram() {
  const points = Array.from({ length: 13 }, (_, index) => index);
  return (
    <Figure>
      <Frame label="对称滤波器与预滤波曲线图：box、Gaussian 和 cubic 具有不同 support 与边缘柔和度">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          对称滤波器：先决定信号带宽，再决定线条外观
        </text>
        <path
          d="M58 282 H420 M58 282 V72"
          stroke={COLORS.border}
          strokeWidth="3"
        />
        <text
          x="238"
          y="318"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          normalized distance from line →
        </text>
        <text
          x="24"
          y="175"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
          transform="rotate(-90 24 175)"
        >
          intensity
        </text>
        {[
          { color: COLORS.warning, label: "box · R=1", scale: 1 },
          { color: COLORS.accent, label: "Gaussian · R=2", scale: 0.76 },
          { color: COLORS.success, label: "cubic · compact", scale: 0.9 },
        ].map((curve) => {
          const d = points
            .map((index) => {
              const x = 66 + index * 27;
              const t = index / 12;
              const value = Math.max(0, 1 - t ** 1.4 * curve.scale);
              const y = round(282 - value * 176);
              return `${index === 0 ? "M" : "L"}${x} ${y}`;
            })
            .join(" ");
          return (
            <path
              key={curve.label}
              d={d}
              fill="none"
              stroke={curve.color}
              strokeWidth="4"
            />
          );
        })}
        <rect
          x="460"
          y="86"
          width="224"
          height="174"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.accent}
          strokeWidth="2"
        />
        <text
          x="572"
          y="121"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          选择规则
        </text>
        <text x="482" y="157" fontSize="13" fill={COLORS.warning}>
          thin line → box 更锐
        </text>
        <text x="482" y="190" fontSize="13" fill={COLORS.accent}>
          thick line → Gaussian 更稳
        </text>
        <text x="482" y="223" fontSize="13" fill={COLORS.secondary}>
          support 太大 → blurry
        </text>
        <text
          x="572"
          y="252"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.success}
        >
          table 只存距离响应
        </text>
        <text
          x="360"
          y="350"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          预滤波不是免费变清晰：它主动删除无法稳定采样的高频
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch22LineSetupDiagram() {
  return (
    <Figure>
      <Frame label="线段 runtime setup 图：围绕中心线构造四条 edge function，样本点通过四个距离决定是否保留与强度">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          line setup：四条 edge function 覆盖宽度与端点
        </text>
        <rect
          x="38"
          y="75"
          width="410"
          height="220"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <line
          x1="74"
          y1="255"
          x2="405"
          y2="108"
          stroke={COLORS.accent}
          strokeWidth="8"
          strokeLinecap="round"
        />
        <line
          x1="56"
          y1="274"
          x2="423"
          y2="110"
          stroke={COLORS.warning}
          strokeWidth="2"
          strokeDasharray="8 6"
        />
        <line
          x1="68"
          y1="288"
          x2="435"
          y2="124"
          stroke={COLORS.warning}
          strokeWidth="2"
          strokeDasharray="8 6"
        />
        <line
          x1="62"
          y1="229"
          x2="393"
          y2="82"
          stroke={COLORS.success}
          strokeWidth="2"
          strokeDasharray="8 6"
        />
        <line
          x1="84"
          y1="276"
          x2="415"
          y2="129"
          stroke={COLORS.success}
          strokeWidth="2"
          strokeDasharray="8 6"
        />
        <circle
          cx="274"
          cy="171"
          r="8"
          fill={COLORS.danger}
          stroke={COLORS.bg}
          strokeWidth="3"
        />
        <text x="286" y="163" fontSize="13" fill={COLORS.danger}>
          sample (x,y)
        </text>
        <text x="68" y="102" fontSize="13" fill={COLORS.warning}>
          E0 / E2 · sides
        </text>
        <text x="278" y="284" fontSize="13" fill={COLORS.success}>
          E1 / E3 · endpoints
        </text>
        <Arrow x1={474} y1={182} x2={510} y2={182} />
        <rect
          x="522"
          y="75"
          width="166"
          height="220"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.success}
          strokeWidth="2"
        />
        <text
          x="605"
          y="111"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.success}
        >
          shader record
        </text>
        <text x="544" y="149" fontSize="13" fill={COLORS.secondary}>
          dᵢ = dot(edgeᵢ, p)
        </text>
        <text x="544" y="181" fontSize="13" fill={COLORS.secondary}>
          any dᵢ &lt; 0 → discard
        </text>
        <text x="544" y="213" fontSize="13" fill={COLORS.accent}>
          side = min(d0,d2)
        </text>
        <text x="544" y="245" fontSize="13" fill={COLORS.accent}>
          end = min(d1,d3)
        </text>
        <text
          x="605"
          y="276"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.warning}
        >
          lookup(side) × lookup(end)
        </text>
        <text
          x="360"
          y="350"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          CPU 每条线算一次系数，GPU 每个 fragment 只做线性函数评估
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch22LookupProductDiagram() {
  return (
    <Figure>
      <Frame label="两次 lookup 相乘图：一次查横跨线段侧边的响应，一次查端点响应，乘积近似有限线段卷积">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          两次 1D lookup：把二维有限线段分解成两个响应
        </text>
        <rect
          x="30"
          y="96"
          width="190"
          height="166"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.accent}
          strokeWidth="2"
        />
        <text
          x="125"
          y="130"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.accent}
        >
          side response
        </text>
        <path
          d="M58 226 C88 150 162 150 192 226"
          fill="none"
          stroke={COLORS.accent}
          strokeWidth="4"
        />
        <line
          x1="58"
          y1="226"
          x2="192"
          y2="226"
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="125"
          y="249"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          lookup(min(d0,d2))
        </text>
        <Arrow x1={234} y1={180} x2={270} y2={180} />
        <rect
          x="282"
          y="96"
          width="156"
          height="166"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.warning}
          strokeWidth="2"
        />
        <text
          x="360"
          y="130"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.warning}
        >
          multiply
        </text>
        <text
          x="360"
          y="178"
          textAnchor="middle"
          fontSize="18"
          fontWeight="700"
          fill={COLORS.text}
        >
          ×
        </text>
        <text
          x="360"
          y="218"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          side · endpoint
        </text>
        <Arrow x1={452} y1={180} x2={488} y2={180} color={COLORS.success} />
        <rect
          x="500"
          y="96"
          width="190"
          height="166"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.success}
          strokeWidth="2"
        />
        <text
          x="595"
          y="130"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.success}
        >
          final intensity
        </text>
        <rect
          x="534"
          y="157"
          width="122"
          height="38"
          rx="8"
          fill={COLORS.success}
          fillOpacity="0.3"
        />
        <text
          x="595"
          y="182"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.text}
        >
          smooth sides + caps
        </text>
        <text
          x="595"
          y="226"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          write alpha / color
        </text>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          端点不能被“无限长线”遗漏：第二次 lookup 让 caps 也参与抗锯齿
        </text>
      </Frame>
    </Figure>
  );
}

function response(mode: FilterMode, distance: number, radius: number): number {
  const t = Math.max(0, Math.min(1, distance / radius));
  if (mode === "box") return round(1 - t ** 1.25);
  if (mode === "gaussian") return round(Math.exp(-2.5 * t * t));
  return round(Math.max(0, 1 - 1.4 * t * t + 0.4 * t ** 3));
}

function PrefilteredLineScene({
  filter,
  lineWidth,
  phase,
  radius,
}: {
  filter: FilterMode;
  lineWidth: number;
  phase: number;
  radius: number;
}) {
  const intensity = response(filter, phase, radius);
  const angle = -0.42 + (phase / 100) * 0.84;
  const centerX = 196;
  const centerY = 184;
  const length = 214;
  const dx = Math.cos(angle) * length;
  const dy = Math.sin(angle) * length;
  const x1 = round(centerX - dx);
  const y1 = round(centerY - dy);
  const x2 = round(centerX + dx);
  const y2 = round(centerY + dy);
  const curvePoints = useMemo(() => {
    return Array.from({ length: 18 }, (_, index) => {
      const distance = (index / 17) * radius;
      const value = response(filter, distance, radius);
      return `${index === 0 ? "M" : "L"}${round(444 + index * 11.5)} ${round(274 - value * 168)}`;
    }).join(" ");
  }, [filter, radius]);
  const support = round(lineWidth / 2 + radius);

  return (
    <svg
      viewBox="0 0 720 390"
      role="img"
      aria-label="快速预滤波线段交互实验：比较滤波器、线宽、距离相位和查表强度"
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
        prefiltered line lab：{filter} filter / support {support.toFixed(1)} px
      </text>
      <rect
        x="28"
        y="52"
        width="342"
        height="270"
        rx="14"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <path
        d="M48 286 H350 M48 74 V286"
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <path
        d={`M${x1} ${y1} L${x2} ${y2}`}
        stroke={COLORS.accent}
        strokeWidth={round(lineWidth * 5)}
        strokeLinecap="round"
      />
      <path
        d={`M${round(x1 - 8)} ${round(y1 - 8)} L${round(x2 + 8)} ${round(y2 + 8)}`}
        stroke={COLORS.warning}
        strokeWidth="2"
        strokeDasharray="7 5"
      />
      <circle
        cx={centerX}
        cy={centerY}
        r="8"
        fill={COLORS.danger}
        stroke={COLORS.bg}
        strokeWidth="3"
      />
      <text
        x="205"
        y="308"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.secondary}
      >
        line center · phase {phase}% · edge samples
      </text>
      <rect
        x="396"
        y="52"
        width="296"
        height="270"
        rx="14"
        fill={COLORS.surface}
        stroke={COLORS.accent}
        strokeWidth="2"
      />
      <text
        x="544"
        y="84"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.text}
      >
        lookup response
      </text>
      <path
        d="M426 274 H662 M426 106 V274"
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <path
        d={curvePoints}
        fill="none"
        stroke={COLORS.accent}
        strokeWidth="4"
      />
      <line
        x1="426"
        y1={round(274 - intensity * 168)}
        x2="662"
        y2={round(274 - intensity * 168)}
        stroke={COLORS.warning}
        strokeWidth="2"
        strokeDasharray="7 5"
      />
      <circle
        cx="544"
        cy={round(274 - intensity * 168)}
        r="8"
        fill={COLORS.success}
        stroke={COLORS.bg}
        strokeWidth="3"
      />
      <text x="432" y="297" fontSize="12" fill={COLORS.secondary}>
        distance / radius
      </text>
      <text x="430" y="123" fontSize="12" fill={COLORS.secondary}>
        1.0
      </text>
      <text
        x="636"
        y="123"
        textAnchor="end"
        fontSize="12"
        fill={COLORS.secondary}
      >
        intensity
      </text>
      <text
        x="544"
        y="238"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={COLORS.success}
      >
        d lookup = {intensity.toFixed(3)}
      </text>
      <text
        x="544"
        y="350"
        textAnchor="middle"
        fontSize="14"
        fill={COLORS.warning}
      >
        滤波器复杂度在 preprocess 消化；runtime 始终是两次查表与少量算术
      </text>
    </svg>
  );
}

export function GpuGems2Ch22PrefilteredLinesLab() {
  const [filter, setFilter] = useState<FilterMode>("gaussian");
  const [lineWidth, setLineWidth] = useState(2);
  const [phase, setPhase] = useState(48);
  const [radius, setRadius] = useState(2);

  function reset() {
    setFilter("gaussian");
    setLineWidth(2);
    setPhase(48);
    setRadius(2);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
      aria-label="GPU Gems 2 Chapter 22 快速预滤波线段实验"
      data-visual-kind="gpu-gems2-ch22-prefiltered-lines"
      data-unit-id="gpg-v2-22"
    >
      <div className="border-b border-border px-5 py-4">
        <p className="text-sm font-semibold text-primary">
          Prefiltered lines 实验
        </p>
        <p className="mt-1 text-sm text-secondary">
          调整滤波器、线宽、距离相位与
          support，观察边缘强度和预处理/运行时成本的分工。
        </p>
      </div>
      <div className="grid gap-5 p-5 lg:grid-cols-[1fr_240px]">
        <div className="overflow-hidden rounded-card border border-border bg-[var(--bg)] p-3">
          <PrefilteredLineScene
            filter={filter}
            lineWidth={lineWidth}
            phase={phase}
            radius={radius}
          />
        </div>
        <div className="space-y-4">
          <div className="grid gap-2">
            {(["box", "gaussian", "cubic"] as FilterMode[]).map(
              (nextFilter) => (
                <button
                  key={nextFilter}
                  type="button"
                  aria-pressed={filter === nextFilter}
                  onClick={() => setFilter(nextFilter)}
                  className="min-h-11 rounded-md border border-border px-3 py-2 text-left text-sm font-semibold text-primary transition hover:border-[var(--accent)]"
                >
                  {nextFilter} filter
                </button>
              ),
            )}
          </div>
          <label className="block text-sm text-secondary">
            line width：{lineWidth} px
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="1"
              max="4"
              step="1"
              value={lineWidth}
              onChange={(event) => setLineWidth(Number(event.target.value))}
            />
          </label>
          <label className="block text-sm text-secondary">
            distance phase：{phase}%
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="0"
              max="100"
              step="1"
              value={phase}
              onChange={(event) => setPhase(Number(event.target.value))}
            />
          </label>
          <label className="block text-sm text-secondary">
            filter radius：{radius} px
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="1"
              max="3"
              step="1"
              value={radius}
              onChange={(event) => setRadius(Number(event.target.value))}
            />
          </label>
          <p
            className="rounded-md border border-border bg-[var(--bg)] p-3 text-xs leading-5 text-secondary"
            aria-live="polite"
          >
            {radius > 2
              ? "support 变大可降低锯齿，但保守光栅化 band 和模糊范围也会变大。"
              : filter === "box"
                ? "box filter 对细线更锐，但较大的距离响应会更快变成阶梯。"
                : "runtime lookup 次数不变；质量差异来自 preprocess 表和 line setup 参数。"}
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
