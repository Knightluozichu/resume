"use client";

import { useRef, useState } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
} as const;

const T = TEACHING_BEAT_MS;

/** 2×2 实矩阵：线性变换与滑杆状态共用的具体元组类型。 */
type Mat2 = readonly [readonly [number, number], readonly [number, number]];
/** 矩阵网格的单元数据：形状占位格允许 "?" 字符串。 */
type GridData = readonly (readonly (number | string)[])[];

const STEPS: readonly TeachingStep[] = [
  {
    label: "shape",
    caption: "形状契约：m×n · n×p → m×p，内维必须相等",
  },
  {
    label: "contract",
    caption: "行乘列：沿内维 k 逐项收缩求和",
  },
  {
    label: "transform",
    caption: "矩阵是平面变形器：方格网被整体拉扯",
  },
  {
    label: "commute",
    caption: "复合不交换：先 P 后 Q 与先 Q 后 P 不同",
  },
  {
    label: "reverse",
    caption: "转置与求逆都反转因子顺序",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

// 本章固定数据，全部确定性，无随机数，SSR 可复现。
const MAT_A = [
  [1, 2, 3],
  [4, 5, 6],
] as const; // 2×3
const MAT_B = [
  [7, 8],
  [9, 10],
  [11, 12],
] as const; // 3×2
const MAT_C = [
  [58, 64],
  [139, 154],
] as const; // A·B
const MAT_BT = [
  [7, 9, 11],
  [8, 10, 12],
] as const; // 2×3，用于形状故障演示
const MAT_P = [
  [1, 1],
  [0, 1],
] as const; // 横向切变
const MAT_Q = [
  [0, -1],
  [1, 0],
] as const; // 旋转 90°
const MAT_QP = [
  [0, -1],
  [1, 1],
] as const; // 先 P 后 Q 的复合矩阵
const MAT_PQ = [
  [1, -1],
  [1, 0],
] as const; // 先 Q 后 P 的复合矩阵
const MAT_ABT = [
  [2, 4],
  [3, 7],
] as const; // (AB)ᵀ = BᵀAᵀ
const MAT_ATBT = [
  [3, 4],
  [4, 6],
] as const; // AᵀBᵀ（忘记反转因子）
const MAT_SINGULAR: Mat2 = [
  [1, 0.5],
  [2, 1],
]; // det = 0，塌缩故障用

type FaultInfo = { title: string; desc: string };

const FAULTS: Readonly<Record<string, FaultInfo>> = {
  shape: {
    title: "内维不匹配仍相乘",
    desc: "现象：算出越界垃圾值或 NaN。原因：A 的列数与 B 的行数不相等时，乘积根本没有定义。修法：写三重循环前先断言内维相等——形状检查是矩阵代码的第一道门禁。",
  },
  contract: {
    title: "收缩项漏算",
    desc: "现象：c₁₁ 算成 25 而非 58。原因：沿内维 k 的求和漏掉了 k=3 那一项。修法：循环边界 k<n 必须与形状契约一致，并手算一行一列做抽查。",
  },
  transform: {
    title: "奇异矩阵塌缩平面",
    desc: "现象：整个平面被压成一条直线，不同输入得到同一输出。原因：det = ad−bc = 0 时矩阵不可逆，信息被永久丢失。修法：变换前检查 det 与条件数，近奇异矩阵同样危险。",
  },
  commute: {
    title: "默认 AB = BA",
    desc: "现象：把两个变换的复合顺序写反，还以为结果一样。原因：矩阵乘法不交换，QP 与 PQ 是两个不同的矩阵。修法：复合从右往左读应用顺序，结果数值必须验算。",
  },
  reverse: {
    title: "转置忘记反转因子",
    desc: "现象：(AB)ᵀ 被写成 AᵀBᵀ，数值对不上。原因：转置要反转因子顺序。修法：记住袜子—鞋子法则——先穿袜再穿鞋，脱的时候先鞋后袜。",
  },
};

const STEP_DESCRIPTION: Readonly<Record<string, string>> = {
  shape:
    "A、B、C 三个矩阵网格与内维匹配示意；故障时展示 A·Bᵀ 因内维 3 不等于 2 而未定义。",
  contract:
    "A 的第 1 行与 B 的第 1 列高亮收缩，C 的元素由 k 求和逐个算出；故障时漏掉 k 等于 3 的项。",
  transform:
    "单位方格与坐标网格被矩阵 M 线性映射后的对比，可用滑杆调节 a、b、c、d；故障时 M 奇异，网格塌缩成直线。",
  commute:
    "单位正方形分别沿先 P 后 Q 与先 Q 后 P 两条路径复合，得到两个不同的平行四边形；故障时错误地只画一个结果。",
  reverse:
    "三个 2×2 结果矩阵网格：(AB)ᵀ、BᵀAᵀ 相等，AᵀBᵀ 不同；故障时高亮忘记反转因子的写法。",
};

type MatrixGridProps = {
  idPrefix: string;
  x: number;
  y: number;
  data: GridData;
  cellW?: number;
  cellH?: number;
  highlightRow?: number;
  highlightCol?: number;
  highlightCell?: readonly [number, number];
  dangerCell?: readonly [number, number];
  danger?: boolean;
  dimmed?: boolean;
};

function MatrixGrid({
  idPrefix,
  x,
  y,
  data,
  cellW = 46,
  cellH = 38,
  highlightRow = -1,
  highlightCol = -1,
  highlightCell,
  dangerCell,
  danger = false,
  dimmed = false,
}: MatrixGridProps) {
  const cols = data[0]?.length ?? 0;
  return (
    <g id={idPrefix}>
      {data.map((row, i) =>
        row.map((value, j) => {
          const isHighlight =
            i === highlightRow ||
            j === highlightCol ||
            (highlightCell !== undefined &&
              highlightCell[0] === i &&
              highlightCell[1] === j);
          const isDanger =
            danger ||
            (dangerCell !== undefined &&
              dangerCell[0] === i &&
              dangerCell[1] === j);
          const stroke = isDanger
            ? C.danger
            : isHighlight
              ? C.accent
              : C.border;
          const fill = isDanger
            ? C.danger
            : isHighlight
              ? C.accent
              : C.elevated;
          return (
            <g key={idPrefix + "-" + i + "-" + j}>
              <rect
                x={x + j * cellW}
                y={y + i * cellH}
                width={cellW}
                height={cellH}
                rx="6"
                fill={fill}
                fillOpacity={isDanger || isHighlight ? 0.16 : 1}
                stroke={stroke}
                strokeWidth={isDanger || isHighlight ? 2.5 : 1.5}
              />
              <text
                x={x + j * cellW + cellW / 2}
                y={y + i * cellH + cellH / 2 + 5}
                textAnchor="middle"
                fontSize="13"
                fontWeight={isDanger || isHighlight ? 700 : 400}
                fill={
                  isDanger
                    ? C.danger
                    : isHighlight
                      ? C.accent
                      : dimmed
                        ? C.secondary
                        : C.primary
                }
              >
                {value}
              </text>
            </g>
          );
        }),
      )}
      <rect
        x={x}
        y={y}
        width={cols * cellW}
        height={data.length * cellH}
        rx="8"
        fill="none"
        stroke={danger ? C.danger : C.border}
        strokeWidth={danger ? 2.5 : 1}
        strokeDasharray={danger ? "6 4" : undefined}
      />
    </g>
  );
}

/** 把平面点 (px, py) 经 2×2 矩阵 m 线性映射后投到 SVG 坐标。 */
function mapPoint(
  m: readonly (readonly number[])[],
  px: number,
  py: number,
  ox: number,
  oy: number,
  s: number,
): readonly [number, number] {
  const a = m[0][0];
  const b = m[0][1];
  const c = m[1][0];
  const d = m[1][1];
  return [ox + s * (a * px + b * py), oy - s * (c * px + d * py)];
}

export function Clrs4AppendixDMatricesLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [fault, setFault] = useState(false);
  // M = [[a, b], [c, d]]，滑杆参数；默认值给轻度切变，开箱即见形变效果。
  const [m, setM] = useState<Mat2>([
    [1, 0.5],
    [0.3, 1],
  ]);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        // 首步在 t=0 必须可见：stage 0 用 [1,1]，其余从 0 淡入。
        const opacity = index === 0 ? ([1, 1] as const) : ([0, 1] as const);
        tl.add(
          stageRefs.current[index]!,
          { opacity, duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        // label 打在该步动画的起始时刻。
        tl.label(step.label, index * T);
      });
    },
  });

  const activeIndex = Math.min(STEPS.length - 1, timeline.currentStep);
  const activeStep = STEPS[activeIndex];
  const faultInfo = FAULTS[activeStep.label];

  const isTransformFault = fault && activeIndex === 2;
  const effM: Mat2 = isTransformFault ? MAT_SINGULAR : m;
  const det = effM[0][0] * effM[1][1] - effM[0][1] * effM[1][0];
  const nearSingular = Math.abs(det) < 0.25;
  // 滑杆按行主序展平：0=a, 1=b, 2=c, 3=d。
  const mFlat: readonly [number, number, number, number] = [
    m[0][0],
    m[0][1],
    m[1][0],
    m[1][1],
  ];
  function setMEntry(key: 0 | 1 | 2 | 3, v: number) {
    setM((prev) =>
      key === 0
        ? [
            [v, prev[0][1]],
            [prev[1][0], prev[1][1]],
          ]
        : key === 1
          ? [
              [prev[0][0], v],
              [prev[1][0], prev[1][1]],
            ]
          : key === 2
            ? [
                [prev[0][0], prev[0][1]],
                [v, prev[1][1]],
              ]
            : [
                [prev[0][0], prev[0][1]],
                [prev[1][0], v],
              ],
    );
  }

  const tfOrigin = { ox: 600, oy: 700, s: 45 };
  const t00 = mapPoint(effM, 0, 0, tfOrigin.ox, tfOrigin.oy, tfOrigin.s);
  const t10 = mapPoint(effM, 1, 0, tfOrigin.ox, tfOrigin.oy, tfOrigin.s);
  const t01 = mapPoint(effM, 0, 1, tfOrigin.ox, tfOrigin.oy, tfOrigin.s);
  const t11 = mapPoint(effM, 1, 1, tfOrigin.ox, tfOrigin.oy, tfOrigin.s);
  const tm0 = mapPoint(effM, 0.5, 0, tfOrigin.ox, tfOrigin.oy, tfOrigin.s);
  const tm1 = mapPoint(effM, 0.5, 1, tfOrigin.ox, tfOrigin.oy, tfOrigin.s);
  const tm2 = mapPoint(effM, 0, 0.5, tfOrigin.ox, tfOrigin.oy, tfOrigin.s);
  const tm3 = mapPoint(effM, 1, 0.5, tfOrigin.ox, tfOrigin.oy, tfOrigin.s);
  const tColor = isTransformFault
    ? C.danger
    : nearSingular
      ? C.warning
      : C.accent;

  const cmOrigin = { ox: 640, oy: 720, s: 55 };
  const sq = [
    mapPoint(
      [
        [1, 0],
        [0, 1],
      ],
      0,
      0,
      cmOrigin.ox,
      cmOrigin.oy,
      cmOrigin.s,
    ),
    mapPoint(
      [
        [1, 0],
        [0, 1],
      ],
      1,
      0,
      cmOrigin.ox,
      cmOrigin.oy,
      cmOrigin.s,
    ),
    mapPoint(
      [
        [1, 0],
        [0, 1],
      ],
      1,
      1,
      cmOrigin.ox,
      cmOrigin.oy,
      cmOrigin.s,
    ),
    mapPoint(
      [
        [1, 0],
        [0, 1],
      ],
      0,
      1,
      cmOrigin.ox,
      cmOrigin.oy,
      cmOrigin.s,
    ),
  ];
  const qpPoly = [
    mapPoint(MAT_QP, 0, 0, cmOrigin.ox, cmOrigin.oy, cmOrigin.s),
    mapPoint(MAT_QP, 0, 1, cmOrigin.ox, cmOrigin.oy, cmOrigin.s),
    mapPoint(MAT_QP, -1, 2, cmOrigin.ox, cmOrigin.oy, cmOrigin.s),
    mapPoint(MAT_QP, -1, 1, cmOrigin.ox, cmOrigin.oy, cmOrigin.s),
  ];
  const pqPoly = [
    mapPoint(MAT_PQ, 0, 0, cmOrigin.ox, cmOrigin.oy, cmOrigin.s),
    mapPoint(MAT_PQ, 1, 1, cmOrigin.ox, cmOrigin.oy, cmOrigin.s),
    mapPoint(MAT_PQ, 0, 1, cmOrigin.ox, cmOrigin.oy, cmOrigin.s),
    mapPoint(MAT_PQ, -1, 0, cmOrigin.ox, cmOrigin.oy, cmOrigin.s),
  ];
  const midP = [
    mapPoint(MAT_P, 0, 0, cmOrigin.ox, cmOrigin.oy, cmOrigin.s),
    mapPoint(MAT_P, 1, 0, cmOrigin.ox, cmOrigin.oy, cmOrigin.s),
    mapPoint(MAT_P, 2, 1, cmOrigin.ox, cmOrigin.oy, cmOrigin.s),
    mapPoint(MAT_P, 1, 1, cmOrigin.ox, cmOrigin.oy, cmOrigin.s),
  ];
  const polyPoints = (pts: readonly (readonly [number, number])[]) =>
    pts.map(([px, py]) => `${px},${py}`).join(" ");

  function reset() {
    timeline.goToStep(0);
    setFault(false);
    setM([
      [1, 0.5],
      [0.3, 1],
    ]);
  }

  const sliderMeta: readonly {
    key: 0 | 1 | 2 | 3;
    label: string;
    hint: string;
  }[] = [
    { key: 0, label: "a（e₁ 的横向分量）", hint: "矩阵第一行第一列" },
    { key: 1, label: "b（e₂ 的横向分量）", hint: "矩阵第一行第二列" },
    { key: 2, label: "c（e₁ 的纵向分量）", hint: "矩阵第二行第一列" },
    { key: 3, label: "d（e₂ 的纵向分量）", hint: "矩阵第二行第二列" },
  ];

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="clrs4-appendix-d-matrices"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CLRS 4e · Appendix D · Matrices
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              从形状契约到平面变形：矩阵乘法到底在做什么？
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              沿时间线观察同一份矩阵数据：先看形状契约，再看行乘列收缩，然后把矩阵当成
              平面变形器亲手调参，最后亲眼看复合不交换与顺序反转。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <div className="mb-4 flex flex-wrap items-end gap-4">
          {activeIndex === 2 && !fault && (
            <div className="flex min-w-60 flex-1 flex-wrap gap-3">
              {sliderMeta.map((meta) => (
                <label
                  key={meta.key}
                  className="block min-h-11 min-w-32 flex-1 text-xs text-secondary"
                >
                  <span className="mb-1 block font-semibold text-primary">
                    {meta.label} = {mFlat[meta.key]}
                  </span>
                  <input
                    type="range"
                    min={-1.5}
                    max={1.5}
                    step={0.1}
                    value={mFlat[meta.key]}
                    aria-label={meta.hint}
                    onChange={(event) =>
                      setMEntry(meta.key, Number(event.target.value))
                    }
                    className="mdx-range h-1 w-full cursor-pointer appearance-none rounded-control bg-border accent-accent"
                  />
                </label>
              ))}
            </div>
          )}

          <label className="flex min-h-11 cursor-pointer select-none items-center gap-2 rounded-control border border-border px-3 py-2 text-xs text-secondary">
            <input
              type="checkbox"
              checked={fault}
              onChange={(event) => setFault(event.target.checked)}
              className="h-4 w-4 accent-accent"
            />
            注入故障：{faultInfo.title}
          </label>
        </div>

        <svg
          viewBox="0 0 900 840"
          role="img"
          aria-label={`Appendix D 矩阵示意图：${STEP_DESCRIPTION[activeStep.label]}${fault ? " 当前已注入故障：" + faultInfo.title + "。" : ""}`}
          className="mx-auto block h-auto w-full"
        >
          <rect x="0" y="0" width="900" height="840" rx="14" fill={C.bg} />

          <text x="30" y="36" fontSize="16" fontWeight="700" fill={C.primary}>
            shape → contract → transform → commute → reverse
          </text>
          <text x="30" y="60" fontSize="12" fill={C.secondary}>
            matrices · 当前阶段：{activeStep.label} ·{" "}
            {fault
              ? "故障已注入：" + faultInfo.title
              : "数据全部确定，可逐步复现"}
          </text>

          <rect
            x="30"
            y="78"
            width="258"
            height="120"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="52" y="106" fontSize="13" fontWeight="700" fill={C.accent}>
            本章固定数据
          </text>
          <text x="52" y="132" fontSize="12" fill={C.primary}>
            A ∈ F^(2×3)，B ∈ F^(3×2)
          </text>
          <text x="52" y="156" fontSize="11" fill={C.secondary}>
            P 切变、Q 旋转 90°，全部确定性
          </text>
          <text x="52" y="180" fontSize="11" fill={C.secondary}>
            每个结论首先是 shape statement
          </text>

          <line
            x1="300"
            y1="138"
            x2="326"
            y2="138"
            stroke={C.success}
            strokeWidth="2.5"
          />

          <rect
            x="336"
            y="78"
            width="258"
            height="120"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="358" y="106" fontSize="13" fontWeight="700" fill={C.primary}>
            再谈元素算术
          </text>
          <text x="358" y="132" fontSize="11" fill={C.primary}>
            形状合法后，元素才轮到求和
          </text>
          <text x="358" y="156" fontSize="11" fill={C.secondary}>
            内维 k 收缩：行乘列逐项相加
          </text>
          <text x="358" y="180" fontSize="11" fill={C.secondary}>
            形状错了，后面的数全没有意义
          </text>

          <line
            x1="606"
            y1="138"
            x2="632"
            y2="138"
            stroke={fault ? C.warning : C.success}
            strokeWidth="2.5"
          />

          <rect
            x="642"
            y="78"
            width="228"
            height="120"
            rx="12"
            fill={fault ? C.warning : C.success}
            fillOpacity="0.1"
            stroke={fault ? C.warning : C.success}
            strokeWidth="1.5"
          />
          <text
            x="756"
            y="106"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={fault ? C.warning : C.success}
          >
            当前结论
          </text>
          <text
            x="756"
            y="132"
            textAnchor="middle"
            fontSize="12"
            fill={C.primary}
          >
            {fault ? "运算律被悄悄用错" : "每条运算律都有前提"}
          </text>
          <text
            x="756"
            y="156"
            textAnchor="middle"
            fontSize="11"
            fill={fault ? C.warning : C.secondary}
          >
            {fault ? "对照红色高亮找原因" : "矩阵推导先查形状再展开"}
          </text>
          <text
            x="756"
            y="180"
            textAnchor="middle"
            fontSize="11"
            fill={C.secondary}
          >
            前提丢失 = 结论失效
          </text>

          {STEPS.map((step, index) => {
            const isActive = index === activeIndex;
            const tone = isActive ? C.accent : C.border;
            return (
              <g
                key={"stage-" + step.label}
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
                style={{ opacity: index === 0 ? 1 : 0 }}
              >
                <rect
                  x="30"
                  y={218 + index * 50}
                  width="840"
                  height="42"
                  rx="10"
                  fill={isActive ? C.accent : C.elevated}
                  fillOpacity={isActive ? 0.1 : 1}
                  stroke={tone}
                  strokeWidth={isActive ? 2.5 : 1.5}
                />
                <text
                  x="52"
                  y={237 + index * 50}
                  fontSize="13"
                  fontWeight="700"
                  fill={isActive ? C.accent : C.primary}
                >
                  {index + 1} · {step.label}
                </text>
                <text
                  x="200"
                  y={237 + index * 50}
                  fontSize="12"
                  fill={C.primary}
                >
                  {step.caption}
                </text>
                <text
                  x="52"
                  y={253 + index * 50}
                  fontSize="11"
                  fill={C.secondary}
                >
                  {index < activeIndex
                    ? "性质已确认"
                    : index === activeIndex
                      ? "当前要观察的机制"
                      : "等待前一步"}
                </text>
                <text
                  x="852"
                  y={244 + index * 50}
                  textAnchor="end"
                  fontSize="11"
                  fill={isActive ? C.accent : C.secondary}
                >
                  {index === 0
                    ? "m×n"
                    : index === 1
                      ? "Σk"
                      : index === 2
                        ? "M·x"
                        : index === 3
                          ? "QP≠PQ"
                          : "ᵀ/⁻¹"}
                </text>
              </g>
            );
          })}

          <text x="30" y="510" fontSize="13" fontWeight="700" fill={C.primary}>
            矩阵实验台：{activeStep.caption}
          </text>
          <text
            x="870"
            y="510"
            textAnchor="end"
            fontSize="11"
            fill={C.secondary}
          >
            {fault ? "红色 = 被用错的代数律" : "播放或单步推进时间线"}
          </text>

          {activeIndex === 0 && (
            <>
              <text
                x="80"
                y="556"
                fontSize="12"
                fontWeight="700"
                fill={C.primary}
              >
                A（2 行 × 3 列）
              </text>
              <text
                x="320"
                y="556"
                fontSize="12"
                fontWeight="700"
                fill={C.primary}
              >
                B（3 行 × 2 列）
              </text>
              <text
                x="560"
                y="556"
                fontSize="12"
                fontWeight="700"
                fill={fault ? C.danger : C.primary}
              >
                {fault ? "A · Bᵀ ？（Bᵀ 是 2×3）" : "C = AB（2 行 × 2 列）"}
              </text>

              <MatrixGrid idPrefix="shape-a" x={80} y={570} data={MAT_A} />
              <text x="266" y="612" fontSize="20" fill={C.secondary}>
                ×
              </text>
              <MatrixGrid idPrefix="shape-b" x={320} y={570} data={MAT_B} />
              <text x="506" y="612" fontSize="20" fill={C.secondary}>
                =
              </text>
              {fault ? (
                <MatrixGrid
                  idPrefix="shape-bt"
                  x={560}
                  y={570}
                  data={MAT_BT}
                  danger
                />
              ) : (
                <MatrixGrid
                  idPrefix="shape-c"
                  x={560}
                  y={570}
                  data={[
                    ["?", "?"],
                    ["?", "?"],
                  ]}
                  dimmed
                />
              )}

              <path
                d={`M ${80} 664 L ${80 + 3 * 46} 664`}
                stroke={C.accent}
                strokeWidth="2"
              />
              <path
                d="M 80 658 L 80 670 M 218 658 L 218 670"
                stroke={C.accent}
                strokeWidth="2"
              />
              <text
                x="149"
                y="684"
                textAnchor="middle"
                fontSize="11"
                fill={C.accent}
              >
                内维 = 3
              </text>
              <path
                d={`M 306 570 L 306 ${570 + 3 * 38}`}
                stroke={C.accent}
                strokeWidth="2"
              />
              <path
                d="M 300 570 L 312 570 M 300 684 L 312 684"
                stroke={C.accent}
                strokeWidth="2"
              />
              <text
                x="297"
                y="632"
                textAnchor="end"
                fontSize="11"
                fill={C.accent}
              >
                内维 = 3
              </text>

              <rect
                x="80"
                y="712"
                width="740"
                height="56"
                rx="10"
                fill={fault ? C.danger : C.accent}
                fillOpacity="0.1"
                stroke={fault ? C.danger : C.accent}
                strokeWidth="1.5"
              />
              <text
                x="102"
                y="736"
                fontSize="12"
                fontWeight="700"
                fill={fault ? C.danger : C.accent}
              >
                {fault
                  ? "✗ A · Bᵀ 未定义：内维 3 ≠ 2"
                  : "形状契约：A 的列数 = B 的行数（内维），结果保留外维 → C 是 2×2"}
              </text>
              <text x="102" y="758" fontSize="11" fill={C.secondary}>
                {fault
                  ? "形状不匹配时乘积根本不存在——先检查形状，再写任何循环。"
                  : "先别急着算元素：形状本身就是结论的一部分，形状错了后面全错。"}
              </text>
            </>
          )}

          {activeIndex === 1 && (
            <>
              <text
                x="60"
                y="566"
                fontSize="12"
                fontWeight="700"
                fill={C.primary}
              >
                A 的第 1 行
              </text>
              <MatrixGrid
                idPrefix="contract-a"
                x={60}
                y={580}
                data={MAT_A}
                highlightRow={0}
                dangerCell={fault ? [0, 2] : undefined}
              />
              <text x="256" y="622" fontSize="20" fill={C.secondary}>
                ×
              </text>
              <text
                x="330"
                y="546"
                fontSize="12"
                fontWeight="700"
                fill={C.primary}
              >
                B 的第 1 列
              </text>
              <MatrixGrid
                idPrefix="contract-b"
                x={330}
                y={560}
                data={MAT_B}
                highlightCol={0}
              />
              <text x="586" y="622" fontSize="20" fill={C.secondary}>
                =
              </text>
              <text
                x="640"
                y="566"
                fontSize="12"
                fontWeight="700"
                fill={C.primary}
              >
                C = AB
              </text>
              <MatrixGrid
                idPrefix="contract-c"
                x={640}
                y={580}
                data={MAT_C}
                highlightCell={[0, 0]}
              />

              {(["k=1", "k=2", "k=3"] as const).map((label, j) => (
                <text
                  key={label}
                  x={60 + j * 46 + 23}
                  y={700}
                  textAnchor="middle"
                  fontSize="11"
                  fill={fault && j === 2 ? C.danger : C.secondary}
                >
                  {label}
                </text>
              ))}

              <text
                x="60"
                y="736"
                fontSize="12"
                fontWeight="700"
                fill={fault ? C.danger : C.accent}
              >
                {fault
                  ? "漏掉 k=3 项：c₁₁ = 1·7 + 2·9 = 25 ✗（正确值：58）"
                  : "c₁₁ = a₁₁b₁₁ + a₁₂b₂₁ + a₁₃b₃₁ = 1·7 + 2·9 + 3·11 = 58"}
              </text>
              <text x="60" y="760" fontSize="11" fill={C.secondary}>
                {fault
                  ? "红色格子就是被漏掉的收缩项；循环边界 k < n 必须与形状契约一致。"
                  : "全部元素做 m·n·p = 12 次标量乘法 → Θ(mnp)；第 28 章有更快的渐近算法。"}
              </text>
            </>
          )}

          {activeIndex === 2 && (
            <>
              <text
                x="80"
                y="556"
                fontSize="12"
                fontWeight="700"
                fill={C.primary}
              >
                变形前：单位方格
              </text>
              <rect
                x="170"
                y="640"
                width="50"
                height="50"
                fill={C.elevated}
                stroke={C.border}
                strokeWidth="1.5"
              />
              <line
                x1="195"
                y1="640"
                x2="195"
                y2="690"
                stroke={C.border}
                strokeWidth="1"
              />
              <line
                x1="170"
                y1="665"
                x2="220"
                y2="665"
                stroke={C.border}
                strokeWidth="1"
              />

              <text
                x="420"
                y="556"
                fontSize="12"
                fontWeight="700"
                fill={C.primary}
              >
                变形后：(x, y) → (ax+by, cx+dy)，网格被整体拉扯
              </text>
              <text
                x="420"
                y="580"
                fontSize="12"
                fontWeight="700"
                fill={
                  isTransformFault
                    ? C.danger
                    : nearSingular
                      ? C.warning
                      : C.accent
                }
              >
                {isTransformFault
                  ? "故障：M = [[1, 0.5], [2, 1]]，det M = 0"
                  : `M = [[${effM[0][0]}, ${effM[0][1]}], [${effM[1][0]}, ${effM[1][1]}]]，det M = ${det.toFixed(2)}${nearSingular ? "（近奇异！）" : ""}`}
              </text>

              <line
                x1="430"
                y1="700"
                x2="790"
                y2="700"
                stroke={C.border}
                strokeWidth="1"
              />
              <line
                x1="600"
                y1="530"
                x2="600"
                y2="820"
                stroke={C.border}
                strokeWidth="1"
              />
              <polygon
                points={polyPoints([t00, t10, t11, t01])}
                fill={tColor}
                fillOpacity="0.12"
                stroke={tColor}
                strokeWidth="2.5"
              />
              <line
                x1={tm0[0]}
                y1={tm0[1]}
                x2={tm1[0]}
                y2={tm1[1]}
                stroke={tColor}
                strokeWidth="1.5"
              />
              <line
                x1={tm2[0]}
                y1={tm2[1]}
                x2={tm3[0]}
                y2={tm3[1]}
                stroke={tColor}
                strokeWidth="1.5"
              />
              <text x={t10[0] + 10} y={t10[1] - 6} fontSize="11" fill={tColor}>
                M·e₁
              </text>
              <text x={t01[0] - 8} y={t01[1] - 10} fontSize="11" fill={tColor}>
                M·e₂
              </text>

              <text x="80" y="760" fontSize="11" fill={C.secondary}>
                {isTransformFault
                  ? "det = 0：平面塌缩成一条直线，不同输入得到同一输出，信息不可逆地丢失。"
                  : `面积被放大 |det| ≈ ${Math.abs(det).toFixed(2)} 倍；det < 0 表示翻面。`}
              </text>
              <text x="80" y="780" fontSize="11" fill={C.secondary}>
                {isTransformFault
                  ? "数值代码里要用条件数而不是 det 是否精确等于 0 来做判断。"
                  : "拖动上方滑杆改变 a、b、c、d，观察网格与 det 的实时变化。"}
              </text>
            </>
          )}

          {activeIndex === 3 && (
            <>
              <text
                x="80"
                y="556"
                fontSize="12"
                fontWeight="700"
                fill={C.primary}
              >
                P = [[1,1],[0,1]] 横向切变
              </text>
              <MatrixGrid idPrefix="commute-p" x={80} y={570} data={MAT_P} />
              <text
                x="80"
                y="676"
                fontSize="12"
                fontWeight="700"
                fill={C.primary}
              >
                Q = [[0,-1],[1,0]] 旋转 90°
              </text>
              <MatrixGrid idPrefix="commute-q" x={80} y={690} data={MAT_Q} />

              <polygon
                points={polyPoints(sq)}
                fill={C.elevated}
                stroke={C.border}
                strokeWidth="1.5"
              />
              <polygon
                points={polyPoints(midP)}
                fill="none"
                stroke={C.secondary}
                strokeWidth="1.5"
                strokeDasharray="6 4"
              />
              <polygon
                points={polyPoints(qpPoly)}
                fill={C.accent}
                fillOpacity="0.14"
                stroke={C.accent}
                strokeWidth="2.5"
              />
              {!fault && (
                <polygon
                  points={polyPoints(pqPoly)}
                  fill={C.success}
                  fillOpacity="0.12"
                  stroke={C.success}
                  strokeWidth="2.5"
                />
              )}
              <text
                x="640"
                y="548"
                textAnchor="middle"
                fontSize="11"
                fill={C.secondary}
              >
                单位正方形与中间步（虚线 = 先 P）
              </text>

              <rect
                x="560"
                y="742"
                width="14"
                height="14"
                rx="3"
                fill={C.accent}
                fillOpacity="0.5"
              />
              <text x="582" y="754" fontSize="11" fill={C.primary}>
                QP：先 P 后 Q
              </text>
              <rect
                x="560"
                y="766"
                width="14"
                height="14"
                rx="3"
                fill={fault ? C.danger : C.success}
                fillOpacity="0.5"
              />
              <text
                x="582"
                y="778"
                fontSize="11"
                fill={fault ? C.danger : C.primary}
              >
                {fault
                  ? "✗ 故障：默认 AB = BA，只画了一个结果"
                  : "PQ：先 Q 后 P"}
              </text>
              <text x="60" y="800" fontSize="11" fill={C.secondary}>
                应用顺序从右往左读：(QP)x 表示先施加 P 再施加
                Q；两个平行四边形不同，所以 QP ≠ PQ。
              </text>
            </>
          )}

          {activeIndex === 4 && (
            <>
              <text x="80" y="548" fontSize="12" fill={C.secondary}>
                取 A=[[1,2],[3,4]]，B=[[0,1],[1,1]]，则 AB=[[2,3],[4,7]]
              </text>

              <text
                x="136"
                y="596"
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill={C.primary}
              >
                (AB)ᵀ
              </text>
              <MatrixGrid
                idPrefix="rev-abt"
                x={90}
                y={612}
                data={MAT_ABT}
                highlightCell={[0, 0]}
              />
              <text x="300" y="644" fontSize="20" fill={C.success}>
                =
              </text>
              <text
                x="300"
                y="668"
                textAnchor="middle"
                fontSize="11"
                fill={C.success}
              >
                ✓ 元素全等
              </text>

              <text
                x="426"
                y="596"
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill={C.primary}
              >
                BᵀAᵀ
              </text>
              <MatrixGrid
                idPrefix="rev-btat"
                x={380}
                y={612}
                data={MAT_ABT}
                highlightCell={[0, 0]}
              />
              <text
                x="590"
                y="644"
                fontSize="20"
                fill={fault ? C.danger : C.secondary}
              >
                ≠
              </text>
              <text
                x="590"
                y="668"
                textAnchor="middle"
                fontSize="11"
                fill={fault ? C.danger : C.secondary}
              >
                {fault ? "✗ 忘记反转" : "写反即错"}
              </text>

              <text
                x="716"
                y="596"
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill={fault ? C.danger : C.primary}
              >
                AᵀBᵀ
              </text>
              <MatrixGrid
                idPrefix="rev-atbt"
                x={670}
                y={612}
                data={MAT_ATBT}
                danger={fault}
              />

              <text
                x="80"
                y="724"
                fontSize="12"
                fontWeight="700"
                fill={C.primary}
              >
                求逆同理：(AB)⁻¹ = B⁻¹A⁻¹——先穿袜再穿鞋，脱的时候先鞋后袜。
              </text>
              <text x="80" y="748" fontSize="11" fill={C.secondary}>
                A 为 2×3 时 AᵀBᵀ 是 3×3：连结果形状都会暴露“忘记反转”这个错误。
              </text>
            </>
          )}

          <defs>
            <marker
              id="clrs4-appendixD-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.accent} />
            </marker>
          </defs>
        </svg>

        {fault && (
          <div
            className="mt-4 rounded-card border p-3 text-xs leading-5"
            style={{
              borderColor: "var(--warning)",
              backgroundColor: "var(--bg)",
            }}
          >
            <p className="font-semibold" style={{ color: "var(--warning)" }}>
              故障注入：{faultInfo.title}
            </p>
            <p className="mt-1 text-secondary">{faultInfo.desc}</p>
          </div>
        )}

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="同一份矩阵数据沿五步走完全程：形状 → 收缩 → 变形 → 复合 → 反转，每步的代数律前提都在图里标出。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置矩阵实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        矩阵不是静态数字表：形状决定运算是否合法，乘法收缩内维，复合顺序与转置顺序都不可随意交换。
      </figcaption>
    </figure>
  );
}
