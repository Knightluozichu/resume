"use client";

import { useState, type ReactNode } from "react";

type ShapeMode = "sphere" | "box" | "union";

type Point = {
  x: number;
  y: number;
};

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
  const size = 9;
  const left = {
    x: round(x2 - size * Math.cos(angle - Math.PI / 6)),
    y: round(y2 - size * Math.sin(angle - Math.PI / 6)),
  };
  const right = {
    x: round(x2 - size * Math.cos(angle + Math.PI / 6)),
    y: round(y2 - size * Math.sin(angle + Math.PI / 6)),
  };
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="3" />
      <polygon
        points={
          String(x2) +
          "," +
          String(y2) +
          " " +
          String(left.x) +
          "," +
          String(left.y) +
          " " +
          String(right.x) +
          "," +
          String(right.y)
        }
        fill={color}
      />
    </>
  );
}

function round(value: number): number {
  return Math.round(value * 1000) / 1000;
}

function fieldValue(
  mode: ShapeMode,
  x: number,
  y: number,
  blend: number,
): number {
  const sphere = Math.sqrt(x * x + y * y) - 0.52;
  const box = Math.max(Math.abs(x) - 0.38, Math.abs(y) - 0.34);
  if (mode === "sphere") return sphere;
  if (mode === "box") return box;
  return Math.min(sphere, box - blend * 0.08);
}

function FieldContour({
  mode,
  iso,
  blend,
  compact = false,
}: {
  mode: ShapeMode;
  iso: number;
  blend: number;
  compact?: boolean;
}) {
  const originX = compact ? 560 : 360;
  const originY = compact ? 200 : 208;
  const scale = compact ? 88 : 116;
  const radius = scale * (0.52 + iso);
  const boxHalfX = scale * (0.38 + iso);
  const boxHalfY = scale * (0.34 + iso);
  return (
    <g>
      <line
        x1={originX - scale}
        y1={originY}
        x2={originX + scale}
        y2={originY}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <line
        x1={originX}
        y1={originY - scale}
        x2={originX}
        y2={originY + scale}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      {mode === "sphere" ? (
        <circle
          cx={originX}
          cy={originY}
          r={Math.max(20, radius)}
          fill={COLORS.accent}
          fillOpacity="0.14"
          stroke={COLORS.accent}
          strokeWidth="4"
        />
      ) : mode === "box" ? (
        <rect
          x={originX - boxHalfX}
          y={originY - boxHalfY}
          width={boxHalfX * 2}
          height={boxHalfY * 2}
          rx={blend * 8}
          fill={COLORS.success}
          fillOpacity="0.14"
          stroke={COLORS.success}
          strokeWidth="4"
        />
      ) : (
        <>
          <circle
            cx={originX - scale * 0.25}
            cy={originY}
            r={Math.max(16, radius)}
            fill={COLORS.accent}
            fillOpacity="0.12"
            stroke={COLORS.accent}
            strokeWidth="3"
          />
          <rect
            x={originX - boxHalfX + scale * 0.1}
            y={originY - boxHalfY}
            width={boxHalfX * 1.6}
            height={boxHalfY * 2}
            rx={blend * 10}
            fill={COLORS.warning}
            fillOpacity="0.12"
            stroke={COLORS.warning}
            strokeWidth="3"
          />
        </>
      )}
      <circle cx={originX} cy={originY} r="6" fill={COLORS.warning} />
      <text
        x={originX + scale + 8}
        y={originY + 5}
        fontSize="13"
        fill={COLORS.secondary}
      >
        x
      </text>
      <text
        x={originX + 8}
        y={originY - scale - 8}
        fontSize="13"
        fill={COLORS.secondary}
      >
        y
      </text>
    </g>
  );
}

export function Cgp24ImplicitFieldDiagram() {
  return (
    <Figure>
      <SvgFrame label="隐式表示流程图：空间点输入标量场函数，零等值面筛选出形状边界">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          implicit representations：用函数描述形状
        </text>
        <rect
          x="34"
          y="88"
          width="154"
          height="194"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="111"
          y="124"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          空间点 p
        </text>
        <circle
          cx="111"
          cy="185"
          r="28"
          fill={COLORS.accent}
          fillOpacity="0.16"
          stroke={COLORS.accent}
          strokeWidth="3"
        />
        <text
          x="111"
          y="191"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.accent}
        >
          x, y, z
        </text>
        <text
          x="111"
          y="246"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          任意位置都可查询
        </text>
        <Arrow x1={204} y1={184} x2={252} y2={184} color={COLORS.accent} />
        <rect
          x="268"
          y="88"
          width="184"
          height="194"
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
          标量场 f(p)
        </text>
        <text
          x="360"
          y="174"
          textAnchor="middle"
          fontSize="18"
          fill={COLORS.accent}
        >
          f(p) = 距离 / 符号
        </text>
        <text
          x="360"
          y="216"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          内部 · 表面 · 外部
        </text>
        <text
          x="360"
          y="252"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.warning}
        >
          f(p) = 0 是边界
        </text>
        <Arrow x1={468} y1={184} x2={516} y2={184} color={COLORS.accent} />
        <rect
          x="532"
          y="88"
          width="154"
          height="194"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="609"
          y="124"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          隐式曲面
        </text>
        <FieldContour mode="sphere" iso={0} blend={0.2} compact />
        <text
          x="609"
          y="272"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          采样或求交得到
        </text>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          不必先列出所有顶点，先定义“哪些点在表面上”
        </text>
      </SvgFrame>
    </Figure>
  );
}

export function Cgp24RayIntersectionDiagram() {
  return (
    <Figure>
      <SvgFrame label="隐式曲面射线求交图：沿射线采样标量场，发现符号从外部到内部的变化并定位零点">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          implicit surface：射线如何找到边界
        </text>
        <rect
          x="34"
          y="82"
          width="276"
          height="212"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <line
          x1="60"
          y1="232"
          x2="282"
          y2="124"
          stroke={COLORS.warning}
          strokeWidth="4"
        />
        <Arrow x1={60} y1={232} x2={282} y2={124} color={COLORS.warning} />
        <ellipse
          cx="190"
          cy="180"
          rx="64"
          ry="76"
          fill={COLORS.accent}
          fillOpacity="0.14"
          stroke={COLORS.accent}
          strokeWidth="4"
        />
        {[0, 1, 2, 3, 4].map((index) => {
          const x = 76 + index * 45;
          const y = 224 - index * 22;
          return (
            <g key={"ray-sample-" + index}>
              <circle
                cx={x}
                cy={y}
                r="7"
                fill={index === 2 ? COLORS.warning : COLORS.surface}
                stroke={index === 2 ? COLORS.warning : COLORS.secondary}
                strokeWidth="3"
              />
              <text
                x={x}
                y={y - 12}
                textAnchor="middle"
                fontSize="12"
                fill={COLORS.secondary}
              >
                {index === 2 ? "0" : index < 2 ? "+" : "−"}
              </text>
            </g>
          );
        })}
        <text
          x="170"
          y="274"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          采样点沿射线排列
        </text>
        <Arrow x1={336} y1={186} x2={382} y2={186} color={COLORS.accent} />
        <rect
          x="400"
          y="82"
          width="286"
          height="212"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="543"
          y="118"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          符号变化
        </text>
        <line
          x1="438"
          y1="208"
          x2="648"
          y2="208"
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <line
          x1="438"
          y1="148"
          x2="438"
          y2="244"
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <path
          d="M456 166 L520 176 L558 208 L632 234"
          fill="none"
          stroke={COLORS.accent}
          strokeWidth="4"
        />
        <circle cx="558" cy="208" r="7" fill={COLORS.warning} />
        <text
          x="558"
          y="190"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.warning}
        >
          f = 0
        </text>
        <text x="470" y="260" fontSize="13" fill={COLORS.success}>
          外部 +
        </text>
        <text x="604" y="260" fontSize="13" fill={COLORS.accent}>
          内部 −
        </text>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          二分或 sphere tracing 都是在定位“场值为零”的位置
        </text>
      </SvgFrame>
    </Figure>
  );
}

export function Cgp24BooleanFieldDiagram() {
  return (
    <Figure>
      <SvgFrame label="隐式布尔运算图：min 生成并集，max 生成交集，带符号距离的差集可用相反符号组合">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          标量场布尔运算：形状可以组合
        </text>
        <g>
          <rect
            x="34"
            y="86"
            width="194"
            height="202"
            rx="16"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="131"
            y="121"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={COLORS.text}
          >
            A 与 B
          </text>
          <circle
            cx="108"
            cy="190"
            r="48"
            fill={COLORS.accent}
            fillOpacity="0.16"
            stroke={COLORS.accent}
            strokeWidth="3"
          />
          <circle
            cx="154"
            cy="190"
            r="48"
            fill={COLORS.success}
            fillOpacity="0.16"
            stroke={COLORS.success}
            strokeWidth="3"
          />
          <text
            x="131"
            y="266"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            两个基础场
          </text>
        </g>
        <Arrow x1={248} y1={187} x2={294} y2={187} color={COLORS.accent} />
        <rect
          x="310"
          y="86"
          width="160"
          height="202"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="390"
          y="121"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          组合规则
        </text>
        <text
          x="390"
          y="166"
          textAnchor="middle"
          fontSize="18"
          fill={COLORS.accent}
        >
          min(A, B)
        </text>
        <text
          x="390"
          y="202"
          textAnchor="middle"
          fontSize="18"
          fill={COLORS.success}
        >
          max(A, B)
        </text>
        <text
          x="390"
          y="244"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          并集 · 交集 · 差集
        </text>
        <Arrow x1={490} y1={187} x2={536} y2={187} color={COLORS.accent} />
        <rect
          x="552"
          y="86"
          width="134"
          height="202"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="619"
          y="121"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          新形状
        </text>
        <path
          d="M570 190 C570 154 590 142 609 164 C628 142 668 154 668 190 C668 226 628 242 609 216 C590 242 570 226 570 190 Z"
          fill={COLORS.warning}
          fillOpacity="0.18"
          stroke={COLORS.warning}
          strokeWidth="3"
        />
        <text
          x="619"
          y="266"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          仍然是一个场
        </text>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          组合的是场值，不是先生成网格再焊接顶点
        </text>
      </SvgFrame>
    </Figure>
  );
}

export function Cgp24GradientNormalDiagram() {
  return (
    <Figure>
      <SvgFrame label="隐式曲面梯度法向图：场值上升最快的方向垂直于零等值面，可用于法向与光照">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          梯度：从场值获得曲面法向
        </text>
        <circle
          cx="244"
          cy="194"
          r="92"
          fill={COLORS.accent}
          fillOpacity="0.13"
          stroke={COLORS.accent}
          strokeWidth="4"
        />
        <circle cx="244" cy="194" r="6" fill={COLORS.warning} />
        <line
          x1="244"
          y1="194"
          x2="348"
          y2="142"
          stroke={COLORS.warning}
          strokeWidth="4"
        />
        <Arrow x1={290} y1={171} x2={348} y2={142} color={COLORS.warning} />
        <text
          x="298"
          y="154"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          ∇f
        </text>
        <line
          x1="244"
          y1="194"
          x2="182"
          y2="246"
          stroke={COLORS.success}
          strokeWidth="3"
          strokeDasharray="7 5"
        />
        <text
          x="154"
          y="266"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.success}
        >
          等值面切线
        </text>
        <text
          x="244"
          y="313"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          ∇f 垂直于 f = 0
        </text>
        <Arrow x1={394} y1={194} x2={446} y2={194} color={COLORS.accent} />
        <rect
          x="464"
          y="92"
          width="220"
          height="204"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="574"
          y="128"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          光照输入
        </text>
        <text
          x="574"
          y="172"
          textAnchor="middle"
          fontSize="18"
          fill={COLORS.accent}
        >
          n = normalize(∇f)
        </text>
        <text
          x="574"
          y="214"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.secondary}
        >
          反射 · 漫反射 · 阴影
        </text>
        <text
          x="574"
          y="258"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.warning}
        >
          梯度噪声会变成高光噪声
        </text>
        <text
          x="360"
          y="350"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          隐式表示不仅给出形状，还给出一条可计算的法向线索
        </text>
      </SvgFrame>
    </Figure>
  );
}

function FieldScene({
  mode,
  iso,
  blend,
  samples,
}: {
  mode: ShapeMode;
  iso: number;
  blend: number;
  samples: number;
}) {
  const count = 4 + samples * 2;
  const points: ReactNode[] = [];
  for (let row = 0; row <= count; row += 1) {
    for (let column = 0; column <= count; column += 1) {
      const x = -1 + (2 * column) / count;
      const y = -1 + (2 * row) / count;
      const value = fieldValue(mode, x, y, blend) - iso;
      const opacity = Math.max(
        0.08,
        Math.min(0.72, 0.72 - Math.abs(value) * 0.8),
      );
      const color = value < 0 ? COLORS.accent : COLORS.success;
      points.push(
        <circle
          key={"field-point-" + row + "-" + column}
          cx={round(76 + column * (468 / count))}
          cy={round(224 - row * (180 / count))}
          r={mode === "union" ? "4" : "4.5"}
          fill={color}
          fillOpacity={round(opacity)}
        />,
      );
    }
  }
  return (
    <svg
      viewBox="0 0 720 330"
      role="img"
      aria-label="隐式形状实验场景：采样标量场并显示零等值面与内部外部区域"
      className="block h-auto w-full"
    >
      <rect width="720" height="330" rx="14" fill={COLORS.bg} />
      <text
        x="360"
        y="28"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={COLORS.text}
      >
        {mode === "sphere"
          ? "sphere field"
          : mode === "box"
            ? "box field"
            : "union field"}
        ：场值采样与等值面
      </text>
      <rect
        x="54"
        y="54"
        width="512"
        height="190"
        rx="14"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      {points}
      <FieldContour mode={mode} iso={iso} blend={blend} />
      <rect
        x="590"
        y="54"
        width="100"
        height="190"
        rx="14"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x="640"
        y="88"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={COLORS.text}
      >
        读数
      </text>
      <circle cx="612" cy="126" r="6" fill={COLORS.accent} />
      <text x="628" y="131" fontSize="12" fill={COLORS.secondary}>
        内部
      </text>
      <circle cx="612" cy="160" r="6" fill={COLORS.success} />
      <text x="628" y="165" fontSize="12" fill={COLORS.secondary}>
        外部
      </text>
      <circle cx="612" cy="194" r="6" fill={COLORS.warning} />
      <text x="628" y="199" fontSize="12" fill={COLORS.secondary}>
        f = 0
      </text>
      <text
        x="360"
        y="278"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.secondary}
      >
        等值面 {iso.toFixed(2)} · 混合 {blend.toFixed(1)} · 采样 {count} ×{" "}
        {count}
      </text>
      <text
        x="360"
        y="307"
        textAnchor="middle"
        fontSize="14"
        fill={COLORS.warning}
      >
        先预测改变 iso 会让边界内缩还是外扩，再观察采样密度是否足够
      </text>
    </svg>
  );
}

export function Cgp24ImplicitShapeLab() {
  const [mode, setMode] = useState<ShapeMode>("sphere");
  const [iso, setIso] = useState(0);
  const [blend, setBlend] = useState(0.3);
  const [samples, setSamples] = useState(4);

  function reset() {
    setMode("sphere");
    setIso(0);
    setBlend(0.3);
    setSamples(4);
  }

  return (
    <section
      aria-label="隐式形状表示专属实验"
      data-visual-kind="cgp-24-implicit-representations"
      data-unit-id="cgp-24"
      className="not-prose my-6 rounded-card border border-border bg-elevated p-4 sm:p-5"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
            Cgp24 Lab
          </p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            隐式形状表示专属实验
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-secondary">
            先切换标量场模型，再改变等值面、混合和采样密度；观察“函数定义”和“离散显示”各自负责什么。
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          aria-label="重置隐式形状表示实验"
          className="min-h-11 rounded-control border border-border px-3 py-2 text-sm text-secondary hover:border-accent hover:text-primary"
        >
          重置实验
        </button>
      </div>
      <div className="flex flex-wrap gap-2" aria-label="选择隐式形状">
        {(["sphere", "box", "union"] as const).map((option) => (
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
      <div className="mt-4 grid gap-4 rounded-card border border-border bg-background p-4 md:grid-cols-3">
        <label className="flex min-w-40 flex-col gap-1 text-sm text-secondary">
          <span className="flex justify-between gap-3">
            <span>等值面 iso</span>
            <span className="font-mono text-primary">{iso.toFixed(2)}</span>
          </span>
          <input
            type="range"
            min="-0.2"
            max="0.2"
            step="0.01"
            value={iso}
            onChange={(event) => setIso(Number(event.target.value))}
            className="accent-accent"
          />
        </label>
        <label className="flex min-w-40 flex-col gap-1 text-sm text-secondary">
          <span className="flex justify-between gap-3">
            <span>组合混合</span>
            <span className="font-mono text-primary">{blend.toFixed(1)}</span>
          </span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={blend}
            onChange={(event) => setBlend(Number(event.target.value))}
            className="accent-accent"
          />
        </label>
        <label className="flex min-w-40 flex-col gap-1 text-sm text-secondary">
          <span className="flex justify-between gap-3">
            <span>采样密度</span>
            <span className="font-mono text-primary">{samples}</span>
          </span>
          <input
            type="range"
            min="2"
            max="8"
            value={samples}
            onChange={(event) => setSamples(Number(event.target.value))}
            className="accent-accent"
          />
        </label>
      </div>
      <div className="mt-4 min-w-0 overflow-hidden rounded-card border border-border bg-background p-3 sm:p-4">
        <FieldScene mode={mode} iso={iso} blend={blend} samples={samples} />
      </div>
      <div
        className="mt-4 rounded-card border border-border bg-background p-4"
        role="status"
        aria-live="polite"
      >
        <p className="text-sm font-semibold text-primary">
          当前模型：{mode} · iso {iso.toFixed(2)} · 采样 {samples}
        </p>
        <p className="mt-1 text-sm leading-6 text-secondary">
          先预测改变等值面会怎样移动边界，再只改变采样密度；如果轮廓锯齿，区分场函数问题与离散提取问题。
        </p>
      </div>
    </section>
  );
}
