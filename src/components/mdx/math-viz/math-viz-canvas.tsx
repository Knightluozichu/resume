"use client";

import {
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { Slider } from "../controls";

/**
 * <MathVizCanvas>：2D 矩阵 / 向量 / 坐标变换交互可视化的实现层（HEL-28）。
 *
 * 经 math-viz.tsx 的 next/dynamic(ssr:false) 懒加载（独立 chunk，不进首屏 / 公共 layout）。
 *
 * 直观目标——让读者「亲手扭曲空间」：
 *  - 拖动输入向量 v（accent 箭头）：鼠标 / 触摸 / 键盘方向键微调，实时显示坐标。
 *  - 调 2×2 矩阵 M=[[a,b],[c,d]]（4 个 HEL-23 Slider）：复用 a11y。
 *  - 实时输出 M·v（success 绿箭头）；basis 模式额外画变换后的网格 + 基向量 î/ĵ
 *    （î=M·(1,0) 红、ĵ=M·(0,1) 黄），看「矩阵如何扭曲单位网格」。
 *  - 预设：单位 / 旋转 / 缩放 / 切变 一键填入。重置回单位矩阵 + 默认向量。
 *
 * 数学（与渲染解耦的纯函数，见底部）：
 *  - 列主序 2×2：M=[[a,b],[c,d]]，apply(M,[x,y]) = [a·x+b·y, c·x+d·y]。
 *  - 坐标↔像素映射：数学原点居中，y 轴向上为正（SVG y 向下，故取负）。
 *    px = cx + ux·SCALE；py = cy − uy·SCALE。SCALE = 每单位像素。
 *
 * 渲染：纯 SVG。网格 / 坐标轴用 border + secondary 色，向量用 accent，
 * 变换结果 / 基向量用语义色。无自动动画（教学态即静态可拖），故无 reduced-motion
 * 特殊处理；拖动需即时跟手不加过渡，hover/focus 走功能动效 token。
 *
 * 颜色 / 间距 / 圆角全部走 DESIGN token（硬规则 5）。SVG 内的纯几何坐标 / 数值是
 * 数学量，不属「魔法色值 / 间距」；所有 UI 颜色经 var(--token) 或 token 工具类。
 */

// —— 视口与坐标映射常量（纯几何，非 DESIGN token 管辖的 UI 间距/色值）——
const VIEW = 360; // SVG viewBox 边长（正方形，逻辑单位 = px）
const CENTER = VIEW / 2; // 原点像素位置（居中）
const SCALE = 56; // 每数学单位 = 多少像素
const AXIS_RANGE = 3; // 坐标轴 / 网格半幅（数学单位，±3）
const VEC_MIN = -AXIS_RANGE;
const VEC_MAX = AXIS_RANGE;
const KEY_STEP = 0.1; // 键盘方向键微调步长（数学单位）

export type Vec2 = readonly [number, number];
/** 列主序 2×2 矩阵：[[a,b],[c,d]]，列向量 (a,c) 与 (b,d) 即 î/ĵ 的像。 */
export type Mat2 = { a: number; b: number; c: number; d: number };

export type MathVizProps = {
  /** 初始 2×2 矩阵，默认单位矩阵。 */
  initialMatrix?: Mat2;
  /** 初始输入向量，默认 (1, 1)。 */
  initialVector?: Vec2;
  /**
   * 模式：
   *  - "vector"：聚焦单个向量 v → M·v（默认）。
   *  - "basis"：额外画变换后的网格与基向量 î/ĵ，强调「矩阵扭曲整个空间」。
   */
  mode?: "vector" | "basis";
  /** 标题（显示在 ⚡标签后）。 */
  title?: string;
  /** 图注：可视化下方说明文字。 */
  caption?: string;
};

const IDENTITY: Mat2 = { a: 1, b: 0, c: 0, d: 1 };

/** 预设矩阵（一键填入，帮助建立直觉）。值为整洁的教学值。 */
const PRESETS: ReadonlyArray<{ key: string; label: string; matrix: Mat2 }> = [
  { key: "identity", label: "单位", matrix: { a: 1, b: 0, c: 0, d: 1 } },
  // 旋转 45°：cos/sin 取 √2/2 ≈ 0.71
  {
    key: "rotate",
    label: "旋转 45°",
    matrix: { a: 0.71, b: -0.71, c: 0.71, d: 0.71 },
  },
  { key: "scale", label: "缩放 ×1.5", matrix: { a: 1.5, b: 0, c: 0, d: 1.5 } },
  { key: "shear", label: "切变", matrix: { a: 1, b: 1, c: 0, d: 1 } },
];

export default function MathVizCanvas({
  initialMatrix = IDENTITY,
  initialVector = [1, 1],
  mode = "vector",
  title,
  caption,
}: MathVizProps) {
  const [matrix, setMatrix] = useState<Mat2>(initialMatrix);
  const [vector, setVector] = useState<Vec2>(initialVector);

  const svgRef = useRef<SVGSVGElement>(null);
  const draggingRef = useRef(false);
  const baseId = useId();

  // —— 实时输出（每渲染重算，纯函数）——
  const transformed = useMemo(() => applyMat(matrix, vector), [matrix, vector]);
  const iHat = useMemo(() => applyMat(matrix, [1, 0]), [matrix]); // M·î
  const jHat = useMemo(() => applyMat(matrix, [0, 1]), [matrix]); // M·ĵ
  const det = matrix.a * matrix.d - matrix.b * matrix.c;

  const reset = useCallback(() => {
    setMatrix(initialMatrix);
    setVector(initialVector);
  }, [initialMatrix, initialVector]);

  const setMatrixField = useCallback(
    (field: keyof Mat2) => (value: number) =>
      setMatrix((m) => ({ ...m, [field]: value })),
    [],
  );

  // —— 拖动输入向量：clientX/Y → 数学坐标，clamp 到 ±AXIS_RANGE —— //
  const updateVectorFromClient = useCallback(
    (clientX: number, clientY: number) => {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      // 视口可能因 CSS 缩放与 viewBox 不同尺寸：换算回 viewBox 坐标系
      const px = ((clientX - rect.left) / rect.width) * VIEW;
      const py = ((clientY - rect.top) / rect.height) * VIEW;
      const [ux, uy] = pxToUnit(px, py);
      setVector([clampUnit(ux), clampUnit(uy)]);
    },
    [],
  );

  const onPointerDown = (e: ReactPointerEvent) => {
    draggingRef.current = true;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    updateVectorFromClient(e.clientX, e.clientY);
  };
  const onPointerMove = (e: ReactPointerEvent) => {
    if (!draggingRef.current) return;
    updateVectorFromClient(e.clientX, e.clientY);
  };
  const stopDrag = () => {
    draggingRef.current = false;
  };

  // —— 键盘微调向量（方向键 ±KEY_STEP；Home 归零）——
  const onHandleKeyDown = (e: ReactKeyboardEvent) => {
    const [x, y] = vector;
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        setVector([clampUnit(round(x - KEY_STEP)), y]);
        break;
      case "ArrowRight":
        e.preventDefault();
        setVector([clampUnit(round(x + KEY_STEP)), y]);
        break;
      case "ArrowUp":
        e.preventDefault();
        setVector([x, clampUnit(round(y + KEY_STEP))]);
        break;
      case "ArrowDown":
        e.preventDefault();
        setVector([x, clampUnit(round(y - KEY_STEP))]);
        break;
      case "Home":
        e.preventDefault();
        setVector([0, 0]);
        break;
      default:
        break;
    }
  };

  // 输入向量手柄的像素位置
  const [hx, hy] = unitToPx(vector[0], vector[1]);

  return (
    <figure className="mdx-math-viz my-6 rounded-card border border-border bg-elevated p-6">
      {/* 顶部：⚡标签 + 标题 + 重置 */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
          <span aria-hidden="true">⚡</span>
          可交互
        </span>
        {title && (
          <span className="flex-1 text-xs text-secondary">{title}</span>
        )}
        <button
          type="button"
          onClick={reset}
          aria-label="重置为初始矩阵与向量"
          className="rounded-control border border-border px-2 py-1 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
        >
          重置
        </button>
      </div>

      {/* 舞台 + 侧栏：窄屏堆叠，宽屏并排 */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start">
        {/* —— SVG 可视化舞台 —— */}
        <svg
          ref={svgRef}
          viewBox={`0 0 ${VIEW} ${VIEW}`}
          role="img"
          aria-label={`二维坐标系：输入向量 v = (${fmt(vector[0])}, ${fmt(
            vector[1],
          )})，变换结果 M·v = (${fmt(transformed[0])}, ${fmt(transformed[1])})`}
          className="aspect-square w-full max-w-sm shrink-0 touch-none rounded-control border border-border bg-bg select-none"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={stopDrag}
          onPointerCancel={stopDrag}
        >
          <defs>
            {/* 箭头标记：每种向量一个对应色（currentColor 由各 use 处 color 决定） */}
            <ArrowMarker id={`${baseId}-arrow-accent`} color="var(--accent)" />
            <ArrowMarker id={`${baseId}-arrow-out`} color="var(--success)" />
            <ArrowMarker id={`${baseId}-arrow-i`} color="var(--danger)" />
            <ArrowMarker id={`${baseId}-arrow-j`} color="var(--warning)" />
          </defs>

          {/* 背景网格（border 色，细线） */}
          <BaseGrid />

          {/* basis 模式：变换后的网格（accent-glow 淡色，看空间被扭曲成什么样） */}
          {mode === "basis" && <TransformedGrid iHat={iHat} jHat={jHat} />}

          {/* 坐标轴（secondary 色，略粗于网格） */}
          <Axes />

          {/* basis 模式：变换后的基向量 î（红）/ ĵ（黄） */}
          {mode === "basis" && (
            <>
              <VectorArrow
                to={iHat}
                color="var(--danger)"
                markerId={`${baseId}-arrow-i`}
                label="î"
              />
              <VectorArrow
                to={jHat}
                color="var(--warning)"
                markerId={`${baseId}-arrow-j`}
                label="ĵ"
              />
            </>
          )}

          {/* 输出向量 M·v（success 绿） */}
          <VectorArrow
            to={transformed}
            color="var(--success)"
            markerId={`${baseId}-arrow-out`}
            label="M·v"
          />

          {/* 输入向量 v（accent 紫）——画在最上层 */}
          <VectorArrow
            to={vector}
            color="var(--accent)"
            markerId={`${baseId}-arrow-accent`}
            label="v"
          />

          {/* 可拖动手柄（落在 v 末端）：键盘可调，role=slider 暴露二维数值 */}
          <g
            role="slider"
            tabIndex={0}
            aria-label="拖动输入向量 v（方向键微调，Home 归零）"
            aria-valuetext={`v = (${fmt(vector[0])}, ${fmt(vector[1])})`}
            onKeyDown={onHandleKeyDown}
            className="cursor-grab outline-none [&:focus-visible_circle]:stroke-accent"
            style={{ touchAction: "none" } as CSSProperties}
          >
            {/* 命中区（透明大圆，便于触摸/点击） */}
            <circle cx={hx} cy={hy} r={16} fill="transparent" />
            {/* 可见手柄 */}
            <circle
              cx={hx}
              cy={hy}
              r={6}
              fill="var(--bg)"
              stroke="var(--accent)"
              strokeWidth={2}
            />
          </g>
        </svg>

        {/* —— 侧栏：数值读出 + 矩阵控件 + 预设 —— */}
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          {/* 数值读出 */}
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-xs tabular-nums">
            <ReadoutRow label="v" color="var(--accent)" value={vector} />
            <ReadoutRow
              label="M·v"
              color="var(--success)"
              value={transformed}
            />
            {mode === "basis" && (
              <>
                <ReadoutRow label="î′" color="var(--danger)" value={iHat} />
                <ReadoutRow label="ĵ′" color="var(--warning)" value={jHat} />
              </>
            )}
            <div className="flex items-center gap-2">
              <dt className="text-secondary">det(M)</dt>
              <dd className="text-primary">{fmt(det)}</dd>
            </div>
          </dl>

          {/* 矩阵显示（2×2 网格，行主序展示 [[a,b],[c,d]]） */}
          <div className="rounded-control border border-border p-3">
            <div className="mb-2 text-xs text-secondary">矩阵 M</div>
            <div className="grid w-fit grid-cols-2 gap-x-4 gap-y-1 font-mono text-sm tabular-nums text-primary">
              <span>{fmt(matrix.a)}</span>
              <span>{fmt(matrix.b)}</span>
              <span>{fmt(matrix.c)}</span>
              <span>{fmt(matrix.d)}</span>
            </div>
          </div>

          {/* 矩阵控件：4 个 HEL-23 Slider（复用 a11y） */}
          <div className="flex flex-col gap-2">
            <Slider
              label="a"
              min={-2}
              max={2}
              step={0.05}
              value={matrix.a}
              onChange={setMatrixField("a")}
              format={fmt}
            />
            <Slider
              label="b"
              min={-2}
              max={2}
              step={0.05}
              value={matrix.b}
              onChange={setMatrixField("b")}
              format={fmt}
            />
            <Slider
              label="c"
              min={-2}
              max={2}
              step={0.05}
              value={matrix.c}
              onChange={setMatrixField("c")}
              format={fmt}
            />
            <Slider
              label="d"
              min={-2}
              max={2}
              step={0.05}
              value={matrix.d}
              onChange={setMatrixField("d")}
              format={fmt}
            />
          </div>

          {/* 预设按钮 */}
          <div className="flex flex-wrap gap-2 border-t border-border pt-4">
            {PRESETS.map((p) => (
              <button
                key={p.key}
                type="button"
                onClick={() => setMatrix(p.matrix)}
                className="rounded-control border border-border px-2 py-1 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {caption && (
        <figcaption className="mt-4 text-center text-xs text-secondary">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// ============================ SVG 子组件 ============================

/** 箭头 marker 定义（三角头），颜色由调用方传入。 */
function ArrowMarker({ id, color }: { id: string; color: string }) {
  return (
    <marker
      id={id}
      viewBox="0 0 10 10"
      refX="8"
      refY="5"
      markerWidth="6"
      markerHeight="6"
      orient="auto-start-reverse"
    >
      <path d="M 0 0 L 10 5 L 0 10 z" fill={color} />
    </marker>
  );
}

/** 背景网格：±AXIS_RANGE 每整数单位一条细线（border 色）。 */
function BaseGrid() {
  const lines: React.ReactNode[] = [];
  for (let u = -AXIS_RANGE; u <= AXIS_RANGE; u++) {
    if (u === 0) continue; // 原点轴另画
    const [vx] = unitToPx(u, 0);
    const [, hy] = unitToPx(0, u);
    lines.push(
      <line
        key={`gx-${u}`}
        x1={vx}
        y1={0}
        x2={vx}
        y2={VIEW}
        stroke="var(--border)"
        strokeWidth={1}
      />,
    );
    lines.push(
      <line
        key={`gy-${u}`}
        x1={0}
        y1={hy}
        x2={VIEW}
        y2={hy}
        stroke="var(--border)"
        strokeWidth={1}
      />,
    );
  }
  return <g aria-hidden="true">{lines}</g>;
}

/**
 * 变换后的网格：把整数网格点经 M 映射，沿两组基方向连线（accent-glow 淡色）。
 * 直观看「原本方正的网格被矩阵扭成平行四边形格」。
 */
function TransformedGrid({ iHat, jHat }: { iHat: Vec2; jHat: Vec2 }) {
  const lines: React.ReactNode[] = [];
  const n = AXIS_RANGE;
  // 沿 ĵ 方向的网格线族（固定 i 步进，连两端 j=−n..n）
  for (let i = -n; i <= n; i++) {
    const start = combine(iHat, jHat, i, -n);
    const end = combine(iHat, jHat, i, n);
    const [x1, y1] = unitToPx(start[0], start[1]);
    const [x2, y2] = unitToPx(end[0], end[1]);
    lines.push(
      <line
        key={`ti-${i}`}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="var(--accent-glow)"
        strokeWidth={1}
      />,
    );
  }
  // 沿 î 方向的网格线族
  for (let j = -n; j <= n; j++) {
    const start = combine(iHat, jHat, -n, j);
    const end = combine(iHat, jHat, n, j);
    const [x1, y1] = unitToPx(start[0], start[1]);
    const [x2, y2] = unitToPx(end[0], end[1]);
    lines.push(
      <line
        key={`tj-${j}`}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="var(--accent-glow)"
        strokeWidth={1}
      />,
    );
  }
  return <g aria-hidden="true">{lines}</g>;
}

/** x / y 坐标轴（secondary 色，略粗）。 */
function Axes() {
  const [, oy] = unitToPx(0, 0);
  const [ox] = unitToPx(0, 0);
  return (
    <g aria-hidden="true">
      <line
        x1={0}
        y1={oy}
        x2={VIEW}
        y2={oy}
        stroke="var(--text-secondary)"
        strokeWidth={1.5}
      />
      <line
        x1={ox}
        y1={0}
        x2={ox}
        y2={VIEW}
        stroke="var(--text-secondary)"
        strokeWidth={1.5}
      />
    </g>
  );
}

/** 从原点出发的向量箭头 + 末端标签。 */
function VectorArrow({
  to,
  color,
  markerId,
  label,
}: {
  to: Vec2;
  color: string;
  markerId: string;
  label: string;
}) {
  const [ox, oy] = unitToPx(0, 0);
  const [tx, ty] = unitToPx(to[0], to[1]);
  // 零向量不画线（避免 0 长度 + marker 异常）
  const isZero = to[0] === 0 && to[1] === 0;
  return (
    <g aria-hidden="true">
      {!isZero && (
        <line
          x1={ox}
          y1={oy}
          x2={tx}
          y2={ty}
          stroke={color}
          strokeWidth={2.5}
          markerEnd={`url(#${markerId})`}
        />
      )}
      <text
        x={tx + 8}
        y={ty - 6}
        fill={color}
        fontSize={13}
        fontFamily="var(--font-mono)"
      >
        {label}
      </text>
    </g>
  );
}

/** 侧栏数值读出行：色点 + 标签 + (x, y)。 */
function ReadoutRow({
  label,
  color,
  value,
}: {
  label: string;
  color: string;
  value: Vec2;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        aria-hidden="true"
        className="inline-block h-2 w-2 shrink-0 rounded-full"
        style={{ backgroundColor: color }}
      />
      <dt className="text-secondary">{label}</dt>
      <dd className="text-primary">
        ({fmt(value[0])}, {fmt(value[1])})
      </dd>
    </div>
  );
}

// ============================ 纯数学 / 映射 ============================

/** 列主序 2×2 乘列向量：M·[x,y] = [a·x+b·y, c·x+d·y]。 */
function applyMat(m: Mat2, v: Vec2): Vec2 {
  return [m.a * v[0] + m.b * v[1], m.c * v[0] + m.d * v[1]];
}

/** i·î + j·ĵ 的线性组合（已是变换后的基向量），用于画变换网格。 */
function combine(iHat: Vec2, jHat: Vec2, i: number, j: number): Vec2 {
  return [i * iHat[0] + j * jHat[0], i * iHat[1] + j * jHat[1]];
}

/** 数学单位坐标 → SVG 像素：原点居中，y 向上为正（SVG y 向下取负）。 */
function unitToPx(ux: number, uy: number): [number, number] {
  return [CENTER + ux * SCALE, CENTER - uy * SCALE];
}

/** SVG 像素 → 数学单位坐标（unitToPx 的逆）。 */
function pxToUnit(px: number, py: number): [number, number] {
  return [(px - CENTER) / SCALE, (CENTER - py) / SCALE];
}

/** 把向量分量 clamp 到坐标轴可视范围。 */
function clampUnit(u: number): number {
  return Math.min(VEC_MAX, Math.max(VEC_MIN, u));
}

/** 键盘步进时消除浮点误差（保留一位小数）。 */
function round(u: number): number {
  return Math.round(u * 10) / 10;
}

/** 数值展示：两位小数，去尾零（如 1.00→1、0.71→0.71、-0→0）。 */
function fmt(n: number): string {
  const r = Math.round(n * 100) / 100;
  const safe = Object.is(r, -0) ? 0 : r;
  return String(safe);
}
