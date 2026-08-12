"use client";

import { useMemo, useState, type ReactNode } from "react";

type View = "spaces" | "vector" | "basis";

const COLORS = {
  accent: "var(--accent)",
  border: "var(--border)",
  secondary: "var(--text-secondary)",
  success: "var(--success)",
  surface: "var(--surface)",
  text: "var(--text-primary)",
  warning: "var(--warning)",
};

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
  color,
  x1,
  x2,
  y1,
  y2,
}: {
  color: string;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 9;
  const left = `${x2 - size * Math.cos(angle - Math.PI / 6)},${y2 - size * Math.sin(angle - Math.PI / 6)}`;
  const right = `${x2 - size * Math.cos(angle + Math.PI / 6)},${y2 - size * Math.sin(angle + Math.PI / 6)}`;
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="3" />
      <polygon points={`${x2},${y2} ${left} ${right}`} fill={color} />
    </>
  );
}

export function Cgp07SpacesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="2-space 与 3-space 对照：二维平面有两个轴，三维空间增加深度轴">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            2-space / 3-space：增加一个轴，也增加一个约束
          </text>
          <rect
            x="38"
            y="72"
            width="292"
            height="216"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <line
            x1="86"
            y1="236"
            x2="282"
            y2="236"
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <line
            x1="144"
            y1="270"
            x2="144"
            y2="104"
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <Arrow color={COLORS.accent} x1={144} x2={250} y1={236} y2={170} />
          <circle cx="250" cy="170" r="7" fill={COLORS.success} />
          <text
            x="250"
            y="150"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.success}
          >
            (x, y)
          </text>
          <text
            x="180"
            y="316"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.text}
          >
            2-space：平面位置
          </text>
          <rect
            x="390"
            y="72"
            width="292"
            height="216"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <line
            x1="430"
            y1="246"
            x2="620"
            y2="246"
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <line
            x1="500"
            y1="274"
            x2="500"
            y2="116"
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <line
            x1="500"
            y1="246"
            x2="454"
            y2="214"
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <Arrow color={COLORS.accent} x1={500} x2={602} y1={246} y2={182} />
          <Arrow color={COLORS.warning} x1={500} x2={454} y1={246} y2={214} />
          <Arrow color={COLORS.success} x1={500} x2={548} y1={246} y2={132} />
          <circle cx="602" cy="182" r="7" fill={COLORS.accent} />
          <circle cx="548" cy="132" r="7" fill={COLORS.success} />
          <text x="608" y="168" fontSize="13" fill={COLORS.accent}>
            x, y
          </text>
          <text x="554" y="116" fontSize="13" fill={COLORS.success}>
            z / depth
          </text>
          <text
            x="536"
            y="316"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.text}
          >
            3-space：位置 + 深度
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        维度不是装饰：从 2-space 进入 3-space
        后，深度、投影和遮挡都必须拥有明确的数学表示。
      </figcaption>
    </figure>
  );
}

export function Cgp07VectorDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="向量分解：一个向量可以沿基向量分解，长度由平方和开根号得到">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            vector：方向、长度与分量可以分别验收
          </text>
          <line
            x1="84"
            y1="260"
            x2="620"
            y2="260"
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <line
            x1="154"
            y1="302"
            x2="154"
            y2="82"
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <Arrow color={COLORS.accent} x1={154} x2={466} y1={260} y2={112} />
          <line
            x1="154"
            y1="260"
            x2="466"
            y2="260"
            stroke={COLORS.warning}
            strokeWidth="2"
            strokeDasharray="7 5"
          />
          <line
            x1="466"
            y1="260"
            x2="466"
            y2="112"
            stroke={COLORS.success}
            strokeWidth="2"
            strokeDasharray="7 5"
          />
          <circle cx="466" cy="112" r="8" fill={COLORS.accent} />
          <text x="478" y="108" fontSize="14" fill={COLORS.accent}>
            v = (vₓ, vᵧ)
          </text>
          <text
            x="304"
            y="286"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.warning}
          >
            vₓ
          </text>
          <text x="480" y="190" fontSize="13" fill={COLORS.success}>
            vᵧ
          </text>
          <text x="172" y="82" fontSize="14" fill={COLORS.secondary}>
            |v| = √(vₓ² + vᵧ²)
          </text>
          <text x="172" y="116" fontSize="13" fill={COLORS.secondary}>
            点积比较方向，长度衡量位移
          </text>
          <text
            x="360"
            y="332"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            同一个向量既可以画成箭头，也可以写成可计算的分量
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        把向量拆成分量后，长度、方向和投影都能分别计算和测试。
      </figcaption>
    </figure>
  );
}

export function Cgp07BasisDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="基向量与坐标：同一个点由基向量的线性组合得到">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            basis：坐标是沿基向量的配方
          </text>
          <line
            x1="110"
            y1="252"
            x2="620"
            y2="252"
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <line
            x1="180"
            y1="294"
            x2="180"
            y2="76"
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <Arrow color={COLORS.warning} x1={180} x2={380} y1={252} y2={252} />
          <Arrow color={COLORS.success} x1={180} x2={180} y1={252} y2={114} />
          <Arrow color={COLORS.accent} x1={180} x2={500} y1={252} y2={130} />
          <line
            x1="500"
            y1="130"
            x2="500"
            y2="252"
            stroke={COLORS.border}
            strokeWidth="2"
            strokeDasharray="7 5"
          />
          <line
            x1="500"
            y1="130"
            x2="180"
            y2="130"
            stroke={COLORS.border}
            strokeWidth="2"
            strokeDasharray="7 5"
          />
          <circle cx="500" cy="130" r="8" fill={COLORS.accent} />
          <text
            x="386"
            y="274"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.warning}
          >
            a · e₁
          </text>
          <text x="196" y="150" fontSize="13" fill={COLORS.success}>
            b · e₂
          </text>
          <text x="512" y="126" fontSize="14" fill={COLORS.accent}>
            p = a e₁ + b e₂
          </text>
          <text
            x="360"
            y="324"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            换基时，点没有移动；改变的是描述它的坐标配方
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        基向量把抽象坐标连接到几何方向，也是坐标变换和矩阵表示的桥梁。
      </figcaption>
    </figure>
  );
}

const VIEWS: Array<{ id: View; label: string; detail: string }> = [
  {
    id: "spaces",
    label: "空间维度",
    detail: "切换 2-space 与 3-space，观察增加深度后需要新增的几何约束。",
  },
  {
    id: "vector",
    label: "向量分量",
    detail: "改变向量角度和长度，分别观察分量、方向和长度公式的变化。",
  },
  {
    id: "basis",
    label: "基向量",
    detail: "用基向量的线性组合重建一个点，检查坐标是描述方式而非点本身。",
  },
];

function VectorScene({ angle, length }: { angle: number; length: number }) {
  const radians = (angle * Math.PI) / 180;
  const origin = { x: 164, y: 260 };
  const endpoint = {
    x: origin.x + length * Math.cos(radians),
    y: origin.y - length * Math.sin(radians),
  };
  const xEnd = { x: endpoint.x, y: origin.y };
  const yEnd = { x: endpoint.x, y: endpoint.y };
  const xComponent = length * Math.cos(radians);
  const yComponent = length * Math.sin(radians);
  return (
    <SvgFrame label="可调向量实验：角度和长度改变后实时显示分量与长度">
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.text}>
        live vector：把几何直觉变成分量证据
      </text>
      <line
        x1="70"
        y1="260"
        x2="620"
        y2="260"
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <line
        x1="164"
        y1="302"
        x2="164"
        y2="74"
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <Arrow
        color={COLORS.accent}
        x1={origin.x}
        x2={endpoint.x}
        y1={origin.y}
        y2={endpoint.y}
      />
      <line
        x1={origin.x}
        y1={origin.y}
        x2={xEnd.x}
        y2={xEnd.y}
        stroke={COLORS.warning}
        strokeWidth="3"
        strokeDasharray="7 5"
      />
      <line
        x1={xEnd.x}
        y1={xEnd.y}
        x2={yEnd.x}
        y2={yEnd.y}
        stroke={COLORS.success}
        strokeWidth="3"
        strokeDasharray="7 5"
      />
      <circle cx={endpoint.x} cy={endpoint.y} r="8" fill={COLORS.accent} />
      <text
        x={Math.max(240, xEnd.x - 30)}
        y="282"
        fontSize="13"
        fill={COLORS.warning}
      >
        vₓ {xComponent.toFixed(1)}
      </text>
      <text x={xEnd.x + 12} y={yEnd.y + 4} fontSize="13" fill={COLORS.success}>
        vᵧ {yComponent.toFixed(1)}
      </text>
      <rect
        x="420"
        y="88"
        width="242"
        height="132"
        rx="12"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="444" y="122" fontSize="14" fontWeight="700" fill={COLORS.text}>
        current vector
      </text>
      <text x="444" y="154" fontSize="13" fill={COLORS.secondary}>
        angle {angle}°
      </text>
      <text x="444" y="182" fontSize="13" fill={COLORS.secondary}>
        length {length}
      </text>
      <text x="444" y="210" fontSize="13" fill={COLORS.accent}>
        √(vₓ² + vᵧ²) = {length.toFixed(1)}
      </text>
      <text
        x="360"
        y="326"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.secondary}
      >
        调整一个输入，再检查哪个几何量保持不变
      </text>
    </SvgFrame>
  );
}

function BasisScene({ coefficient }: { coefficient: number }) {
  const origin = { x: 170, y: 258 };
  const endpoint = { x: 170 + coefficient * 72, y: 258 - coefficient * 42 };
  return (
    <SvgFrame label="可调基向量实验：系数改变时，点沿基向量组合移动">
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.text}>
        live basis：坐标系数如何重建一个点
      </text>
      <line
        x1="80"
        y1="258"
        x2="620"
        y2="258"
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <line
        x1="170"
        y1="300"
        x2="170"
        y2="76"
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <Arrow
        color={COLORS.warning}
        x1={origin.x}
        x2={origin.x + coefficient * 72}
        y1={origin.y}
        y2={origin.y}
      />
      <Arrow
        color={COLORS.success}
        x1={origin.x + coefficient * 72}
        x2={endpoint.x}
        y1={origin.y}
        y2={endpoint.y}
      />
      <Arrow
        color={COLORS.accent}
        x1={origin.x}
        x2={endpoint.x}
        y1={origin.y}
        y2={endpoint.y}
      />
      <line
        x1={endpoint.x}
        y1={endpoint.y}
        x2={endpoint.x}
        y2={origin.y}
        stroke={COLORS.border}
        strokeWidth="2"
        strokeDasharray="7 5"
      />
      <circle cx={endpoint.x} cy={endpoint.y} r="8" fill={COLORS.accent} />
      <text x="300" y="282" fontSize="13" fill={COLORS.warning}>
        a · e₁
      </text>
      <text
        x={endpoint.x + 12}
        y={endpoint.y + 4}
        fontSize="13"
        fill={COLORS.success}
      >
        b · e₂
      </text>
      <rect
        x="430"
        y="88"
        width="230"
        height="120"
        rx="12"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="452" y="124" fontSize="14" fontWeight="700" fill={COLORS.text}>
        p = a e₁ + b e₂
      </text>
      <text x="452" y="158" fontSize="13" fill={COLORS.secondary}>
        a = {coefficient.toFixed(1)}
      </text>
      <text x="452" y="186" fontSize="13" fill={COLORS.secondary}>
        b = {(coefficient * 0.58).toFixed(1)}
      </text>
      <text
        x="360"
        y="326"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.secondary}
      >
        点的位置由系数决定，基向量决定“沿什么方向组合”
      </text>
    </SvgFrame>
  );
}

export function Cgp07EssentialMathematicsLab() {
  const [view, setView] = useState<View>("spaces");
  const [angle, setAngle] = useState(34);
  const [length, setLength] = useState(168);
  const [coefficient, setCoefficient] = useState(2.1);
  const current = useMemo(
    () => VIEWS.find((item) => item.id === view) ?? VIEWS[0],
    [view],
  );

  function reset() {
    setView("spaces");
    setAngle(34);
    setLength(168);
    setCoefficient(2.1);
  }

  return (
    <section
      aria-label="2-space 与 3-space 数学专属实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cgp-07-essential-mathematics"
      data-unit-id="cgp-07"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 MathViz · 2-space / 3-space
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让公式留下几何证据
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先猜一猜：改变向量角度时，长度会不会改变？改变基向量系数时，点的位置和坐标描述分别发生什么？
          </p>
        </div>
        <button
          type="button"
          aria-label="重置图形学数学实验"
          onClick={reset}
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          重置实验
        </button>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择图形数学视角">
          {VIEWS.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={view === item.id}
              onClick={() => setView(item.id)}
              className={`min-h-11 rounded-control border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                view === item.id
                  ? "border-accent bg-accent/10 font-semibold text-primary"
                  : "border-border text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        {view === "vector" && (
          <div className="flex flex-wrap gap-4 rounded-card border border-border bg-background p-4">
            <label className="flex min-w-44 flex-1 flex-col gap-1 text-sm text-secondary">
              <span className="flex justify-between gap-3">
                <span>向量角度</span>
                <span className="font-mono text-primary">{angle}°</span>
              </span>
              <input
                type="range"
                min={-70}
                max={70}
                step={1}
                value={angle}
                onChange={(event) => setAngle(Number(event.target.value))}
                className="accent-accent"
              />
            </label>
            <label className="flex min-w-44 flex-1 flex-col gap-1 text-sm text-secondary">
              <span className="flex justify-between gap-3">
                <span>向量长度</span>
                <span className="font-mono text-primary">{length}</span>
              </span>
              <input
                type="range"
                min={80}
                max={220}
                step={1}
                value={length}
                onChange={(event) => setLength(Number(event.target.value))}
                className="accent-accent"
              />
            </label>
          </div>
        )}
        {view === "basis" && (
          <div className="rounded-card border border-border bg-background p-4">
            <label className="flex min-w-44 flex-col gap-1 text-sm text-secondary">
              <span className="flex justify-between gap-3">
                <span>基向量系数 a</span>
                <span className="font-mono text-primary">
                  {coefficient.toFixed(1)}
                </span>
              </span>
              <input
                type="range"
                min={0.6}
                max={3.2}
                step={0.1}
                value={coefficient}
                onChange={(event) => setCoefficient(Number(event.target.value))}
                className="accent-accent"
              />
            </label>
          </div>
        )}
        <div className="min-w-0 rounded-card border border-border bg-background p-3 sm:p-4">
          {view === "spaces" ? (
            <Cgp07SpacesDiagram />
          ) : view === "vector" ? (
            <VectorScene angle={angle} length={length} />
          ) : (
            <BasisScene coefficient={coefficient} />
          )}
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
