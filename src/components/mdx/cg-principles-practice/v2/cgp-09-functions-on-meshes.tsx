"use client";

import { useMemo, useState, type ReactNode } from "react";

type FieldKind = "height" | "temperature";
type InterpolationMode = "smooth" | "flat";

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

function VertexValue({
  label,
  value,
  x,
  y,
  color,
}: {
  label: string;
  value: string;
  x: number;
  y: number;
  color: string;
}) {
  return (
    <g>
      <circle cx={x} cy={y} r="8" fill={color} />
      <text
        x={x + 12}
        y={y - 12}
        fontSize="14"
        fontWeight="700"
        fill={COLORS.text}
      >
        {label}
      </text>
      <text x={x + 12} y={y + 10} fontSize="13" fill={COLORS.secondary}>
        {value}
      </text>
    </g>
  );
}

export function Cgp09FunctionFieldDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="网格函数图：三角形顶点保存标量值，面内值由这些顶点值共同决定">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            functions on meshes：值附着在几何上，而不是漂浮在画面外
          </text>
          <polygon
            points="86,250 214,94 360,250"
            fill={COLORS.accent}
            fillOpacity="0.16"
            stroke={COLORS.accent}
            strokeWidth="3"
          />
          <VertexValue
            label="v₀"
            value="f₀ = 0.2"
            x={86}
            y={250}
            color={COLORS.warning}
          />
          <VertexValue
            label="v₁"
            value="f₁ = 0.9"
            x={214}
            y={94}
            color={COLORS.success}
          />
          <VertexValue
            label="v₂"
            value="f₂ = 0.4"
            x={360}
            y={250}
            color={COLORS.accent}
          />
          <circle cx="218" cy="196" r="9" fill={COLORS.text} />
          <text x="232" y="192" fontSize="13" fill={COLORS.text}>
            f(p)
          </text>
          <text x="232" y="214" fontSize="13" fill={COLORS.secondary}>
            面内查询值
          </text>
          <line
            x1="400"
            y1="166"
            x2="442"
            y2="166"
            stroke={COLORS.accent}
            strokeWidth="3"
          />
          <polygon points="434,156 454,166 434,176" fill={COLORS.accent} />
          <rect
            x="472"
            y="76"
            width="204"
            height="224"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="494"
            y="110"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.text}
          >
            一份函数值表
          </text>
          <text x="494" y="146" fontSize="13" fill={COLORS.secondary}>
            位置：v₀ / v₁ / v₂
          </text>
          <text x="494" y="176" fontSize="13" fill={COLORS.success}>
            值：0.2 / 0.9 / 0.4
          </text>
          <text x="494" y="218" fontSize="13" fill={COLORS.secondary}>
            查询 p → 权重组合
          </text>
          <text x="494" y="248" fontSize="13" fill={COLORS.accent}>
            输出：f(p)
          </text>
          <text x="494" y="282" fontSize="13" fill={COLORS.secondary}>
            几何与数值保持同一索引
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        函数可以是高度、颜色或温度；它的采样位置必须和网格的顶点/面保持同一份拓扑语义。
      </figcaption>
    </figure>
  );
}

export function Cgp09InterpolationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="三角形插值图：面内点由三个顶点的重心权重组合得到">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            interpolation：先算权重，再组合顶点值
          </text>
          <polygon
            points="84,256 218,88 376,256"
            fill={COLORS.success}
            fillOpacity="0.12"
            stroke={COLORS.success}
            strokeWidth="3"
          />
          <VertexValue
            label="v₀"
            value="w₀ = 0.2"
            x={84}
            y={256}
            color={COLORS.warning}
          />
          <VertexValue
            label="v₁"
            value="w₁ = 0.5"
            x={218}
            y={88}
            color={COLORS.success}
          />
          <VertexValue
            label="v₂"
            value="w₂ = 0.3"
            x={376}
            y={256}
            color={COLORS.accent}
          />
          <circle cx="232" cy="190" r="9" fill={COLORS.text} />
          <line
            x1="232"
            y1="190"
            x2="84"
            y2="256"
            stroke={COLORS.warning}
            strokeWidth="2"
            strokeDasharray="7 5"
          />
          <line
            x1="232"
            y1="190"
            x2="218"
            y2="88"
            stroke={COLORS.success}
            strokeWidth="2"
            strokeDasharray="7 5"
          />
          <line
            x1="232"
            y1="190"
            x2="376"
            y2="256"
            stroke={COLORS.accent}
            strokeWidth="2"
            strokeDasharray="7 5"
          />
          <text x="246" y="186" fontSize="13" fill={COLORS.text}>
            p
          </text>
          <text x="246" y="208" fontSize="13" fill={COLORS.secondary}>
            w₀ + w₁ + w₂ = 1
          </text>
          <rect
            x="430"
            y="78"
            width="246"
            height="220"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="452"
            y="114"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.text}
          >
            面内计算
          </text>
          <text x="452" y="150" fontSize="13" fill={COLORS.secondary}>
            f(p) = w₀f₀ + w₁f₁ + w₂f₂
          </text>
          <text x="452" y="188" fontSize="13" fill={COLORS.success}>
            权重越大，影响越大
          </text>
          <text x="452" y="222" fontSize="13" fill={COLORS.warning}>
            走出三角形 → 需重新判断
          </text>
          <text x="452" y="264" fontSize="13" fill={COLORS.secondary}>
            同一规则可用于颜色、深度和法线
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        插值不是凭空平滑，而是受三个顶点值和三个权重共同约束的可计算过程。
      </figcaption>
    </figure>
  );
}

export function Cgp09ContinuityDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="网格连续性对照：共享边的顶点值一致时过渡连续，不一致时出现可见接缝">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            共享顶点是连续性的边界证据
          </text>
          <text
            x="184"
            y="70"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.success}
          >
            一致：平滑过渡
          </text>
          <polygon
            points="70,250 164,100 258,250"
            fill={COLORS.success}
            fillOpacity="0.12"
            stroke={COLORS.success}
            strokeWidth="3"
          />
          <polygon
            points="258,250 352,100 446,250"
            fill={COLORS.success}
            fillOpacity="0.18"
            stroke={COLORS.success}
            strokeWidth="3"
          />
          <line
            x1="258"
            y1="250"
            x2="352"
            y2="100"
            stroke={COLORS.text}
            strokeWidth="4"
          />
          <text
            x="258"
            y="280"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            共享端点值相同
          </text>
          <text
            x="544"
            y="70"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.warning}
          >
            不一致：出现接缝
          </text>
          <polygon
            points="456,250 550,100 644,250"
            fill={COLORS.warning}
            fillOpacity="0.12"
            stroke={COLORS.warning}
            strokeWidth="3"
          />
          <polygon
            points="644,250 690,174 690,250"
            fill={COLORS.accent}
            fillOpacity="0.12"
            stroke={COLORS.accent}
            strokeWidth="3"
          />
          <line
            x1="644"
            y1="250"
            x2="690"
            y2="174"
            stroke={COLORS.warning}
            strokeWidth="5"
          />
          <circle cx="644" cy="250" r="8" fill={COLORS.warning} />
          <circle
            cx="644"
            cy="250"
            r="14"
            fill="none"
            stroke={COLORS.warning}
            strokeWidth="2"
          />
          <text
            x="566"
            y="280"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            同一位置却有两份值
          </text>
          <text
            x="360"
            y="330"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            先检查共享顶点数据，再检查插值规则和采样范围
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        接缝不一定是插值公式错了，也可能是相邻面给同一个几何位置塞了不同的函数值。
      </figcaption>
    </figure>
  );
}

const FIELD_PRESETS: Record<
  FieldKind,
  { label: string; values: [number, number, number]; unit: string }
> = {
  height: { label: "高度", values: [0.2, 0.9, 0.4], unit: "相对高度" },
  temperature: { label: "温度", values: [18, 32, 24], unit: "°C" },
};

function InterpolationScene({
  field,
  mode,
  u,
  v,
}: {
  field: FieldKind;
  mode: InterpolationMode;
  u: number;
  v: number;
}) {
  const points = [
    { x: 80, y: 270 },
    { x: 246, y: 80 },
    { x: 414, y: 270 },
  ];
  const safeV = Math.min(v, 1 - u);
  const weights = [1 - u - safeV, u, safeV];
  const position = points.reduce(
    (result, point, index) => ({
      x: result.x + point.x * weights[index],
      y: result.y + point.y * weights[index],
    }),
    { x: 0, y: 0 },
  );
  const values = FIELD_PRESETS[field].values;
  const value = values.reduce(
    (total, current, index) => total + current * weights[index],
    0,
  );
  const formattedValue =
    field === "height" ? value.toFixed(2) : value.toFixed(1);
  const triangleFill = mode === "smooth" ? COLORS.accent : COLORS.warning;
  return (
    <SvgFrame label="可调网格函数实验：拖动重心权重，实时查看面内插值结果">
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.text}>
        live interpolation：权重移动，函数值跟着走
      </text>
      <polygon
        points="80,270 246,80 414,270"
        fill={triangleFill}
        fillOpacity={mode === "smooth" ? "0.16" : "0.09"}
        stroke={triangleFill}
        strokeWidth="4"
      />
      <line
        x1={position.x}
        y1={position.y}
        x2="80"
        y2="270"
        stroke={COLORS.warning}
        strokeWidth="2"
        strokeDasharray="7 5"
      />
      <line
        x1={position.x}
        y1={position.y}
        x2="246"
        y2="80"
        stroke={COLORS.success}
        strokeWidth="2"
        strokeDasharray="7 5"
      />
      <line
        x1={position.x}
        y1={position.y}
        x2="414"
        y2="270"
        stroke={COLORS.accent}
        strokeWidth="2"
        strokeDasharray="7 5"
      />
      <VertexValue
        label="v₀"
        value={`${values[0]} ${field === "temperature" ? "°C" : ""}`}
        x={80}
        y={270}
        color={COLORS.warning}
      />
      <VertexValue
        label="v₁"
        value={`${values[1]} ${field === "temperature" ? "°C" : ""}`}
        x={246}
        y={80}
        color={COLORS.success}
      />
      <VertexValue
        label="v₂"
        value={`${values[2]} ${field === "temperature" ? "°C" : ""}`}
        x={414}
        y={270}
        color={COLORS.accent}
      />
      <circle cx={position.x} cy={position.y} r="10" fill={COLORS.text} />
      <text
        x={position.x + 14}
        y={position.y - 10}
        fontSize="13"
        fontWeight="700"
        fill={COLORS.text}
      >
        f(p) = {formattedValue} {field === "temperature" ? "°C" : ""}
      </text>
      <rect
        x="466"
        y="74"
        width="226"
        height="222"
        rx="14"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="488" y="108" fontSize="14" fontWeight="700" fill={COLORS.text}>
        当前计算
      </text>
      <text x="488" y="140" fontSize="13" fill={COLORS.secondary}>
        {FIELD_PRESETS[field].label} · {FIELD_PRESETS[field].unit}
      </text>
      <text x="488" y="174" fontSize="13" fill={COLORS.warning}>
        w₀ = {weights[0].toFixed(2)}
      </text>
      <text x="488" y="202" fontSize="13" fill={COLORS.success}>
        w₁ = {weights[1].toFixed(2)}
      </text>
      <text x="488" y="230" fontSize="13" fill={COLORS.accent}>
        w₂ = {weights[2].toFixed(2)}
      </text>
      <text x="488" y="268" fontSize="13" fill={COLORS.text}>
        {mode === "smooth" ? "平滑：按权重组合" : "平面：保持单一面值"}
      </text>
      <text
        x="360"
        y="330"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.secondary}
      >
        权重总和 = {(weights[0] + weights[1] + weights[2]).toFixed(2)} ·
        点始终留在三角形内
      </text>
    </SvgFrame>
  );
}

export function Cgp09FunctionsOnMeshesLab() {
  const [field, setField] = useState<FieldKind>("height");
  const [mode, setMode] = useState<InterpolationMode>("smooth");
  const [u, setU] = useState(0.35);
  const [v, setV] = useState(0.3);
  const currentField = useMemo(() => FIELD_PRESETS[field], [field]);

  function reset() {
    setField("height");
    setMode("smooth");
    setU(0.35);
    setV(0.3);
  }

  return (
    <section
      aria-label="网格函数与插值专属实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cgp-09-functions-on-meshes"
      data-unit-id="cgp-09"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 MathViz · mesh functions
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让面内数值留下可计算证据
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先猜一猜：把查询点向某个顶点移动时，哪个权重会变大？把平滑切换成平面模式后，哪些数值不再随位置变化？
          </p>
        </div>
        <button
          type="button"
          aria-label="重置网格函数与插值实验"
          onClick={reset}
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          重置实验
        </button>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择网格函数">
          {(
            [
              ["height", "高度"],
              ["temperature", "温度"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={field === value}
              onClick={() => setField(value)}
              className={`min-h-11 rounded-control border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                field === value
                  ? "border-accent bg-accent/10 font-semibold text-primary"
                  : "border-border text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              {label}
            </button>
          ))}
          {(
            [
              ["smooth", "平滑插值"],
              ["flat", "平面值"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={mode === value}
              onClick={() => setMode(value)}
              className={`min-h-11 rounded-control border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                mode === value
                  ? "border-success bg-success/10 font-semibold text-primary"
                  : "border-border text-secondary hover:border-success hover:text-primary"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 rounded-card border border-border bg-background p-4">
          <label className="flex min-w-44 flex-1 flex-col gap-1 text-sm text-secondary">
            <span className="flex justify-between gap-3">
              <span>顶点 v₁ 权重</span>
              <span className="font-mono text-primary">{u.toFixed(2)}</span>
            </span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={u}
              onChange={(event) => {
                const next = Number(event.target.value);
                setU(next);
                setV((current) => Math.min(current, 1 - next));
              }}
              className="accent-accent"
            />
          </label>
          <label className="flex min-w-44 flex-1 flex-col gap-1 text-sm text-secondary">
            <span className="flex justify-between gap-3">
              <span>顶点 v₂ 权重</span>
              <span className="font-mono text-primary">
                {Math.min(v, 1 - u).toFixed(2)}
              </span>
            </span>
            <input
              type="range"
              min="0"
              max={Math.max(0, 1 - u)}
              step="0.01"
              value={Math.min(v, 1 - u)}
              onChange={(event) => setV(Number(event.target.value))}
              className="accent-accent"
            />
          </label>
        </div>
        <div className="min-w-0 rounded-card border border-border bg-background p-3 sm:p-4">
          <InterpolationScene field={field} mode={mode} u={u} v={v} />
        </div>
        <div
          className="rounded-card border border-border bg-background p-4"
          role="status"
          aria-live="polite"
        >
          <p className="text-sm font-semibold text-primary">
            当前函数：{currentField.label} ·{" "}
            {mode === "smooth" ? "重心插值" : "面内常值"}
          </p>
          <p className="mt-1 text-sm leading-6 text-secondary">
            先检查三个权重的总和，再解释面内结果；如果出现接缝，回到共享顶点的函数值记录。
          </p>
        </div>
      </div>
    </section>
  );
}
