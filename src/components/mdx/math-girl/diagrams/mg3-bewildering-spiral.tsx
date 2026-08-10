"use client";

import { useState, type ReactNode } from "react";

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

function Frame({
  ariaLabel,
  caption,
  children,
}: {
  ariaLabel: string;
  caption: string;
  children: ReactNode;
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 720 420"
          role="img"
          aria-label={ariaLabel}
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {children}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        {caption}
      </figcaption>
    </figure>
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color = accent,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 8;
  const leftX = x2 - size * Math.cos(angle - Math.PI / 6);
  const leftY = y2 - size * Math.sin(angle - Math.PI / 6);
  const rightX = x2 - size * Math.cos(angle + Math.PI / 6);
  const rightY = y2 - size * Math.sin(angle + Math.PI / 6);
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2" />
      <path
        d={`M ${leftX} ${leftY} L ${x2} ${y2} L ${rightX} ${rightY}`}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

/** 展示单位圆上的点如何同时产生 cos 与 sin，并把纵坐标送进正弦曲线。 */
export function Mg3UnitCircleDiagram() {
  const theta = Math.PI / 4;
  const cx = 186;
  const cy = 226;
  const radius = 104;
  const px = cx + Math.cos(theta) * radius;
  const py = cy - Math.sin(theta) * radius;
  return (
    <Frame
      ariaLabel="单位圆图：角theta对应圆周点P等于cos theta、sin theta，横坐标是余弦，纵坐标是正弦，纵坐标投影到右侧正弦曲线。"
      caption="同一个运动参数 θ：单位圆保留点的位置，正弦曲线保留高度随参数的变化。"
    >
      <text
        x="360"
        y="34"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        单位圆 → 正弦曲线
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        P(θ) = (cosθ, sinθ)；同一点，两种坐标系统
      </text>
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill={accent}
        fillOpacity="0.05"
        stroke={border}
        strokeWidth="2"
      />
      <line x1={cx - 126} y1={cy} x2={cx + 126} y2={cy} stroke={border} />
      <line x1={cx} y1={cy - 126} x2={cx} y2={cy + 126} stroke={border} />
      <line x1={cx} y1={cy} x2={px} y2={py} stroke={accent} strokeWidth="3" />
      <line
        x1={px}
        y1={py}
        x2={px}
        y2={cy}
        stroke={success}
        strokeWidth="2"
        strokeDasharray="5 4"
      />
      <circle cx={px} cy={py} r="6" fill={accent} />
      <text x={px + 10} y={py - 10} fontSize="13" fill={accent}>
        P(θ)
      </text>
      <text x="186" y="370" textAnchor="middle" fontSize="13" fill={primary}>
        x = cosθ，y = sinθ
      </text>
      <line
        x1="340"
        y1="226"
        x2="408"
        y2="226"
        stroke={secondary}
        strokeWidth="2"
      />
      <Arrow x1={408} y1={226} x2={448} y2={226} color={secondary} />
      <text x="374" y="210" textAnchor="middle" fontSize="11" fill={secondary}>
        取 y
      </text>
      <line
        x1="480"
        y1="226"
        x2="674"
        y2="226"
        stroke={border}
        strokeWidth="2"
      />
      <line
        x1="500"
        y1="334"
        x2="500"
        y2="116"
        stroke={border}
        strokeWidth="2"
      />
      <path
        d="M 500 226 C 530 120, 570 120, 600 226 S 660 332, 674 226"
        fill="none"
        stroke={success}
        strokeWidth="3"
      />
      <circle cx="536" cy={py} r="5" fill={success} />
      <text x="582" y="370" textAnchor="middle" fontSize="13" fill={success}>
        y = sinθ
      </text>
    </Frame>
  );
}

/** 对比 45°、60° 等特殊角的几何来源。 */
export function Mg3SpecialAnglesDiagram() {
  return (
    <Frame
      ariaLabel="特殊角图：等腰直角三角形给出sin45度等于根号2除以2，正三角形一半给出sin60度等于根号3除以2和sin30度等于二分之一。"
      caption="特殊角值不是背出来的表格，而是两个基本三角形的坐标证据。"
    >
      <text
        x="360"
        y="34"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        Special Angle Table：从三角形推导
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        等腰直角三角形与正三角形的一半
      </text>
      <g transform="translate(58 96)">
        <rect
          x="0"
          y="0"
          width="276"
          height="236"
          rx="14"
          fill={accent}
          fillOpacity="0.08"
          stroke={accent}
          strokeWidth="2"
        />
        <text
          x="138"
          y="30"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={accent}
        >
          45°
        </text>
        <path
          d="M 48 184 L 48 76 L 222 184 Z"
          fill="none"
          stroke={accent}
          strokeWidth="3"
        />
        <text x="32" y="132" textAnchor="middle" fontSize="12" fill={primary}>
          1
        </text>
        <text x="136" y="202" textAnchor="middle" fontSize="12" fill={primary}>
          1
        </text>
        <text x="138" y="128" textAnchor="middle" fontSize="13" fill={primary}>
          斜边 √2
        </text>
        <text
          x="138"
          y="224"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={success}
        >
          sin45° = √2 / 2
        </text>
      </g>
      <g transform="translate(386 96)">
        <rect
          x="0"
          y="0"
          width="276"
          height="236"
          rx="14"
          fill={success}
          fillOpacity="0.08"
          stroke={success}
          strokeWidth="2"
        />
        <text
          x="138"
          y="30"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={success}
        >
          60° / 30°
        </text>
        <path
          d="M 48 184 L 222 184 L 135 76 Z"
          fill="none"
          stroke={success}
          strokeWidth="3"
        />
        <line
          x1="135"
          y1="76"
          x2="135"
          y2="184"
          stroke={warning}
          strokeWidth="2"
          strokeDasharray="5 4"
        />
        <text x="138" y="128" textAnchor="middle" fontSize="13" fill={primary}>
          高 √3 / 2
        </text>
        <text x="78" y="202" textAnchor="middle" fontSize="12" fill={primary}>
          1/2
        </text>
        <text
          x="138"
          y="224"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={success}
        >
          sin60° = √3/2；sin30° = 1/2
        </text>
      </g>
      <text x="360" y="374" textAnchor="middle" fontSize="13" fill={secondary}>
        正弦是纵坐标，几何约束直接决定它的数值
      </text>
    </Frame>
  );
}

/** 用弧长/半径定义弧度，并展示缩放圆不改变角的数值。 */
export function Mg3RadianDiagram() {
  return (
    <Frame
      ariaLabel="弧度图：角theta等于弧长s除以半径r，整圆弧长2πr所以一圈等于2π弧度，圆放大后弧长和半径同比缩放。"
      caption="弧度不是角度制的另一个标签，而是弧长与半径的无量纲比。"
    >
      <text
        x="360"
        y="34"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        弧度：角 = 弧长 / 半径
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        θ = s / r；整圆 θ = 2πr / r = 2π
      </text>
      <g transform="translate(188 222)">
        <circle
          cx="0"
          cy="0"
          r="92"
          fill={accent}
          fillOpacity="0.05"
          stroke={border}
          strokeWidth="2"
        />
        <line x1="0" y1="0" x2="92" y2="0" stroke={accent} strokeWidth="3" />
        <line x1="0" y1="0" x2="60" y2="-70" stroke={accent} strokeWidth="3" />
        <path
          d="M 92 0 A 92 92 0 0 0 60 -70"
          fill="none"
          stroke={success}
          strokeWidth="5"
        />
        <text x="46" y="16" textAnchor="middle" fontSize="13" fill={accent}>
          r
        </text>
        <text x="83" y="-42" fontSize="13" fill={success}>
          s
        </text>
        <text x="36" y="-32" fontSize="13" fill={warning}>
          θ
        </text>
      </g>
      <Arrow x1={304} y1={222} x2={390} y2={222} color={secondary} />
      <g transform="translate(532 222)">
        <circle
          cx="0"
          cy="0"
          r="72"
          fill={success}
          fillOpacity="0.04"
          stroke={border}
          strokeWidth="2"
        />
        <line x1="0" y1="0" x2="72" y2="0" stroke={success} strokeWidth="3" />
        <text x="36" y="-10" textAnchor="middle" fontSize="13" fill={success}>
          2πr
        </text>
        <text
          x="0"
          y="112"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={success}
        >
          一圈 = 2π
        </text>
      </g>
      <rect
        x="112"
        y="348"
        width="496"
        height="42"
        rx="10"
        fill={warning}
        fillOpacity="0.1"
        stroke={warning}
      />
      <text x="360" y="375" textAnchor="middle" fontSize="13" fill={warning}>
        放大 k 倍：ks / kr = s / r；弧度与圆的大小无关
      </text>
    </Frame>
  );
}

/** 展示实数模 2π 的等价类与商集。 */
export function Mg3QuotientDiagram() {
  const points = [
    { x: 150, label: "θ−2π" },
    { x: 310, label: "θ" },
    { x: 470, label: "θ+2π" },
  ];
  return (
    <Frame
      ariaLabel="模2π等价类图：theta、theta加2π和theta减2π在圆周投影中相同，属于同一个等价类，方向角组成实数除以2π整数集的商集。"
      caption="商集保留方向，忘记代表角相差了几整圈；等价类不是单个实数。"
    >
      <text
        x="360"
        y="34"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        模 2π：方向角是等价类
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        x ≡ y (mod 2π) ⇔ x−y = 2πn，n ∈ Z
      </text>
      <line
        x1="96"
        y1="198"
        x2="624"
        y2="198"
        stroke={border}
        strokeWidth="2"
      />
      {points.map((point, index) => (
        <g key={point.label}>
          <circle
            cx={point.x}
            cy="198"
            r="12"
            fill={index === 1 ? accent : border}
            stroke={index === 1 ? accent : border}
          />
          <text
            x={point.x}
            y="242"
            textAnchor="middle"
            fontSize="14"
            fill={primary}
          >
            {point.label}
          </text>
          {index < points.length - 1 ? (
            <Arrow
              x1={point.x + 24}
              y1={198}
              x2={points[index + 1].x - 24}
              y2={198}
              color={secondary}
            />
          ) : null}
        </g>
      ))}
      <circle
        cx="570"
        cy="126"
        r="48"
        fill={accent}
        fillOpacity="0.05"
        stroke={border}
        strokeWidth="2"
      />
      <circle cx="570" cy="126" r="5" fill={accent} />
      <path d="M 570 126 L 612 102" stroke={accent} strokeWidth="3" />
      <text x="570" y="198" textAnchor="middle" fontSize="12" fill={secondary}>
        同一个圆周位置
      </text>
      <rect
        x="150"
        y="292"
        width="420"
        height="66"
        rx="12"
        fill={success}
        fillOpacity="0.1"
        stroke={success}
      />
      <text
        x="360"
        y="320"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={success}
      >
        [θ] = {"{θ + 2πn | n∈Z}"}
      </text>
      <text x="360" y="344" textAnchor="middle" fontSize="13" fill={primary}>
        所有等价类组成 R / (2πZ)
      </text>
    </Frame>
  );
}

/** 对比螺旋的三维前进与俯视圆周投影。 */
export function Mg3SpiralDiagram() {
  return (
    <Frame
      ariaLabel="螺旋投影图：三维螺旋H(t)等于cos t、sin t、ct从不同高度经过同一方向，俯视投影相同但高度增加2πc。"
      caption="重复投影不等于停止前进：被遗忘的高度正是螺旋的第三个维度。"
    >
      <text
        x="360"
        y="34"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        螺旋楼梯：同一投影，不同高度
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        H(t) = (cos t, sin t, ct)；πxy(H(t)) = (cos t, sin t)
      </text>
      <path
        d="M 160 326 C 235 290, 300 316, 360 268 S 500 214, 558 164 S 600 118, 620 94"
        fill="none"
        stroke={accent}
        strokeWidth="4"
      />
      <line
        x1="160"
        y1="326"
        x2="160"
        y2="372"
        stroke={border}
        strokeWidth="2"
      />
      <line
        x1="620"
        y1="94"
        x2="620"
        y2="372"
        stroke={border}
        strokeWidth="2"
      />
      <line
        x1="160"
        y1="372"
        x2="620"
        y2="372"
        stroke={border}
        strokeWidth="2"
      />
      <circle cx="160" cy="326" r="6" fill={accent} />
      <circle cx="558" cy="164" r="6" fill={success} />
      <circle cx="160" cy="372" r="5" fill={border} />
      <circle cx="558" cy="372" r="5" fill={border} />
      <line
        x1="558"
        y1="164"
        x2="558"
        y2="372"
        stroke={success}
        strokeWidth="2"
        strokeDasharray="5 4"
      />
      <text x="184" y="316" fontSize="13" fill={accent}>
        H(t)
      </text>
      <text x="566" y="154" fontSize="13" fill={success}>
        H(t+2π)
      </text>
      <text x="360" y="402" textAnchor="middle" fontSize="13" fill={primary}>
        πxy(H(t+2π)) = πxy(H(t))，但 H(t+2π) ≠ H(t)
      </text>
      <text x="640" y="240" textAnchor="middle" fontSize="12" fill={secondary}>
        高度 + 2πc
      </text>
    </Frame>
  );
}

type SpiralMode = "circle" | "spiral";

const spiralModes: Record<
  SpiralMode,
  { label: string; title: string; detail: string; color: string }
> = {
  circle: {
    label: "只看投影",
    title: "圆周位置重复",
    detail: "θ 与 θ+2π 看起来相同",
    color: accent,
  },
  spiral: {
    label: "保留高度",
    title: "螺旋仍在前进",
    detail: "高度增加 2πc，经历没有被抹掉",
    color: success,
  },
};

/** 可重置的投影实验：切换“只看圆周”与“保留高度”。 */
export function Mg3SpiralLab() {
  const [mode, setMode] = useState<SpiralMode>("circle");
  const current = spiralModes[mode];
  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-elevated p-5"
      aria-label="螺旋投影实验"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-primary">
            Projection Lab
          </h3>
          <p className="mt-1 text-sm text-secondary">
            切换观察方式，判断重复的圆周位置是否等于停止前进。
          </p>
        </div>
        <button
          type="button"
          onClick={() => setMode("circle")}
          className="rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
        >
          重置实验
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(spiralModes) as SpiralMode[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setMode(key)}
            aria-pressed={mode === key}
            className={`rounded-control border px-4 py-2 text-sm transition-colors ${mode === key ? "border-accent text-accent" : "border-border text-secondary"}`}
          >
            {spiralModes[key].label}
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-4 rounded-control border border-border p-4 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <p className="text-sm font-semibold" style={{ color: current.color }}>
            {current.title}
          </p>
          <p className="mt-2 text-sm text-primary">{current.detail}</p>
          <p className="mt-1 text-xs text-secondary">
            商映射会忘记圈数；螺旋参数保留第三坐标。
          </p>
        </div>
        <svg
          viewBox="0 0 180 120"
          role="img"
          aria-label={current.title}
          className="h-auto w-full max-w-[180px]"
        >
          <ellipse
            cx="88"
            cy="84"
            rx="64"
            ry="18"
            fill={accent}
            fillOpacity="0.05"
            stroke={border}
          />
          <path
            d={
              mode === "circle"
                ? "M 28 84 C 60 48, 116 48, 150 84"
                : "M 28 98 C 54 58, 84 94, 110 56 S 144 48, 154 20"
            }
            fill="none"
            stroke={current.color}
            strokeWidth="3"
          />
          <circle
            cx={mode === "circle" ? 88 : 110}
            cy={mode === "circle" ? 66 : 56}
            r="5"
            fill={current.color}
          />
        </svg>
      </div>
    </section>
  );
}
