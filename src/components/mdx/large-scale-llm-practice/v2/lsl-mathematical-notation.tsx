"use client";

import { useState } from "react";
import { useTeachingTimeline } from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

const ink = "var(--text-primary)";
const muted = "var(--text-secondary)";
const accent = "var(--accent)";
const edge = "var(--border)";
const control =
  "min-h-11 min-w-11 rounded-control border border-border bg-elevated px-3 py-2 text-sm text-primary focus-visible:outline-2 focus-visible:outline-accent";
const panel =
  "not-prose my-6 min-w-0 rounded-card border border-border bg-elevated p-3 sm:p-5 text-primary [&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11 [&_input]:min-w-11 [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-accent";

// The third axis indexes two 2×3 slices, not a batch of unrelated matrices.
const slices = [
  [
    [1, 2, 3],
    [4, 5, 6],
  ],
  [
    [7, 8, 9],
    [10, 11, 12],
  ],
];

function NumberGrid({
  values,
  x,
  y,
  selected,
}: {
  values: number[][];
  x: number;
  y: number;
  selected?: (row: number, col: number) => boolean;
}) {
  return (
    <g>
      {values.flatMap((row, i) =>
        row.map((value, j) => (
          <g key={`${i}-${j}`}>
            <rect
              x={x + j * 40}
              y={y + i * 36}
              width={40}
              height={36}
              fill={selected?.(i, j) ? accent : "var(--bg-elevated)"}
              fillOpacity={selected?.(i, j) ? 0.3 : 1}
              stroke={selected?.(i, j) ? accent : edge}
            />
            <text
              x={x + j * 40 + 20}
              y={y + i * 36 + 24}
              textAnchor="middle"
              fill={ink}
            >
              {value}
            </text>
          </g>
        )),
      )}
    </g>
  );
}

export function LslMathematicalNotationContextContractLab() {
  const [layer, setLayer] = useState(0);
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(1);
  const [operation, setOperation] = useState("slice");
  const a = slices[layer];
  const invalid = operation === "row" && row === 2;
  const output = invalid
    ? []
    : operation === "row"
      ? [a[row]]
      : operation === "column"
        ? a.map((r) => [r[col]])
        : operation === "transpose"
          ? a[0].map((_, j) => a.map((r) => r[j]))
          : operation === "concat"
            ? [...slices[0], ...slices[1]]
            : a;
  const names: Record<string, string> = {
    slice: `A[:,:,${layer}] → (2,3)`,
    row: `A[${row},:,${layer}] → (3,)`,
    column: `A[:,${col},${layer}] → (2,)`,
    transpose: `A[:,:,${layer}]ᵀ → (3,2)`,
    concat: "[A[:,:,0]; A[:,:,1]] → (4,3)",
  };
  return (
    <section
      className={panel}
      data-visual-kind="notation-tensor-slices"
      aria-label="实验一：张量索引与切片"
    >
      <h3 className="m-0 text-lg font-semibold">01 · 同一个张量，不同的取法</h3>
      <p className="text-sm text-secondary">
        零起始索引；A 的形状是 (2,3,2)。选 i=2 并取行，观察越界。
      </p>
      <div className="flex flex-wrap gap-3">
        <label className="grid gap-1 text-sm">
          操作
          <select
            aria-label="张量操作"
            className={control}
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
          >
            <option value="slice">二维切片</option>
            <option value="row">取行</option>
            <option value="column">取列</option>
            <option value="transpose">切片转置</option>
            <option value="concat">沿行轴拼接</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          第三轴 k
          <select
            aria-label="第三轴 k"
            className={control}
            value={layer}
            onChange={(e) => setLayer(Number(e.target.value))}
          >
            {[0, 1].map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          行 i
          <select
            aria-label="行 i"
            className={control}
            value={row}
            onChange={(e) => setRow(Number(e.target.value))}
          >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2（越界）</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          列 j
          <select
            aria-label="列 j"
            className={control}
            value={col}
            onChange={(e) => setCol(Number(e.target.value))}
          >
            {[0, 1, 2].map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </label>
      </div>
      <svg
        viewBox="0 0 330 400"
        className="mx-auto mt-4 block w-full max-w-[440px]"
        role="img"
        aria-label={`张量的两个切面；${invalid ? "取行越界，没有结果" : names[operation]}`}
        fontSize="16"
      >
        {[0, 1].map((k) => (
          <g key={k}>
            <text x={10 + k * 170} y={24} fill={k === layer ? accent : muted}>
              A[:,:,{k}]
            </text>
            <NumberGrid
              values={slices[k]}
              x={10 + k * 170}
              y={40}
              selected={(i, j) =>
                k === layer &&
                (operation === "row"
                  ? i === row
                  : operation === "column"
                    ? j === col
                    : i === row && j === col)
              }
            />
          </g>
        ))}
        <path
          d="M165 125 V157 M157 149 L165 157 L173 149"
          fill="none"
          stroke={accent}
          strokeWidth={2}
        />
        <text x={10} y={184} fill={ink}>
          {invalid ? "i=2 越界：行轴只有 0、1" : names[operation]}
        </text>
        {!invalid && (
          <NumberGrid values={output} x={165 - output[0].length * 20} y={200} />
        )}
        {invalid && (
          <path
            d="M125 230 L205 310 M205 230 L125 310"
            stroke={accent}
            strokeWidth={3}
          />
        )}
        <text x={10} y={384} fill={muted}>
          {operation === "concat"
            ? "拼接扩展行轴，不相乘、不求和。"
            : "取行/列去掉一个轴；转置交换两轴。"}
        </text>
      </svg>
      <p className="text-sm" role="status">
        {row === 2
          ? "A[2,j,k] 不存在；取列/切片/转置/拼接本身不读取 i。"
          : `选中元素 A[${row},${col},${layer}] = ${a[row][col]}`}{" "}
        {invalid
          ? "拒绝生成取行结果。"
          : `结果形状：${names[operation].split("→ ")[1]}。`}
      </p>
      <button
        className={control}
        onClick={() => {
          setLayer(0);
          setRow(0);
          setCol(1);
          setOperation("slice");
        }}
      >
        重置张量实验
      </button>
    </section>
  );
}

const contractionSteps = [
  { label: "k=0", caption: "第一个乘积" },
  { label: "k=1", caption: "累加第二项" },
  { label: "k=2", caption: "累加第三项" },
] as const;

export function LslMathematicalNotationComputeTraceLab() {
  const [mode, setMode] = useState("matrix");
  const [target, setTarget] = useState(0);
  const [factor, setFactor] = useState(1);
  const [badShape, setBadShape] = useState(false);
  const timeline = useTeachingTimeline({
    steps: contractionSteps,
    build: (tl) => {
      const clock = { t: 0 };
      contractionSteps.forEach((s, i) => {
        tl.label(s.label, i * 900);
        tl.add(clock, { t: i + 1, duration: 900 }, i * 900);
      });
    },
  });
  const x = [1, 2, 3];
  const b = [
    [1, 2],
    [0, 1],
    [2, 0],
  ].map((r) => r.map((n) => n * factor));
  const y =
    mode === "dot" ? [4, 5, 6].map((n) => n * factor) : b.map((r) => r[target]);
  const terms = x.map((n, k) => n * y[k]);
  const sum = terms
    .slice(0, timeline.currentStep + 1)
    .reduce((s, n) => s + n, 0);
  const elementwise = [
    [1, 2, 3],
    [4, 5, 6],
  ].map((r, i) => r.map((n, j) => n * (i + j + 1) * factor));
  function reset() {
    timeline.seek(0);
    setMode("matrix");
    setTarget(0);
    setFactor(1);
    setBadShape(false);
  }
  return (
    <section
      className={panel}
      data-visual-kind="notation-index-contraction"
      aria-label="实验二：乘法与收缩"
    >
      <h3 className="m-0 text-lg font-semibold">02 · 共享下标去哪里了？</h3>
      <p className="text-sm text-secondary">
        A 的首行为 (1,2,3)，次行为 (4,5,6)。矩阵乘只展开第 0
        行；逐项乘保留全部坐标。
      </p>
      <div className="flex flex-wrap gap-3">
        <label className="grid gap-1 text-sm">
          乘法
          <select
            aria-label="乘法类型"
            className={control}
            value={mode}
            onChange={(e) => {
              timeline.seek(0);
              setMode(e.target.value);
            }}
          >
            <option value="matrix">矩阵乘 AB</option>
            <option value="dot">点积 xᵀy</option>
            <option value="hadamard">Hadamard A⊙E</option>
          </select>
        </label>
        {mode === "matrix" && (
          <label className="grid gap-1 text-sm">
            输出列 j
            <select
              aria-label="输出列 j"
              className={control}
              value={target}
              onChange={(e) => {
                timeline.seek(0);
                setTarget(Number(e.target.value));
              }}
            >
              {[0, 1].map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </label>
        )}
        <label className="grid gap-1 text-sm">
          右操作数倍数
          <select
            aria-label="右操作数倍数"
            className={control}
            value={factor}
            onChange={(e) => {
              timeline.seek(0);
              setFactor(Number(e.target.value));
            }}
          >
            <option>1</option>
            <option>2</option>
          </select>
        </label>
        <button
          className={control}
          aria-pressed={badShape}
          onClick={() => {
            timeline.seek(0);
            setBadShape(!badShape);
          }}
        >
          {badShape ? "恢复合法形状" : "注入形状错误"}
        </button>
      </div>
      <svg
        viewBox="0 0 330 370"
        className="mx-auto mt-4 block w-full max-w-[440px]"
        role="img"
        aria-label={
          badShape
            ? "输入维度不兼容，运算被拒绝"
            : mode === "hadamard"
              ? "逐项乘结果保留2乘3网格"
              : `收缩第${timeline.currentStep + 1}项，部分和${sum}`
        }
        fontSize="16"
      >
        <text x={8} y={24} fill={ink}>
          {mode === "matrix"
            ? badShape
              ? "(2×3) · (2×2)：3 ≠ 2"
              : "(2×3) · (3×2) → (2×2)"
            : mode === "dot"
              ? badShape
                ? "(3,) · (2,)：长度不相同"
                : "(3,) · (3,) → 标量"
              : badShape
                ? "(2×3) ⊙ (2×2)：不同形"
                : "(2×3) ⊙ (2×3) → (2×3)"}
        </text>
        {badShape ? (
          <g>
            <path
              d="M40 85 L290 280 M290 85 L40 280"
              stroke={accent}
              strokeWidth={3}
            />
            <text x={10} y={333} fill={ink}>
              没有合法输出；禁止静默补零。
            </text>
          </g>
        ) : mode === "hadamard" ? (
          <g>
            <text x={10} y={64} fill={muted}>
              E = [[1,2,3],[2,3,4]] × {factor}
            </text>
            <NumberGrid values={elementwise} x={105} y={90} />
            <text x={10} y={205} fill={ink}>
              例：(A⊙E)₀₁ = 2×{2 * factor} = {4 * factor}
            </text>
            <text x={10} y={246} fill={muted}>
              没有对 k 求和，结果仍有六格。
            </text>
            <text x={10} y={280} fill={muted}>
              逐项结果一次展示，不执行归约。
            </text>
          </g>
        ) : (
          <g>
            {terms.map((v, k) => (
              <g key={k} opacity={k <= timeline.currentStep ? 1 : 0.35}>
                <text x={10} y={80 + k * 64} fill={ink}>
                  k={k}：{x[k]} × {y[k]} = {v}
                </text>
                <rect
                  x={170}
                  y={58 + k * 64}
                  width={k <= timeline.currentStep ? v * 3.5 : 0}
                  height={28}
                  fill={accent}
                />
                <path
                  d={`M${173 + v * 3.5} ${72 + k * 64} L310 275`}
                  stroke={edge}
                  fill="none"
                />
              </g>
            ))}
            <text x={10} y={293} fill={ink}>
              Σ 已展开项 = {sum}
            </text>
            <text x={10} y={332} fill={muted}>
              {mode === "matrix"
                ? `完整 AB = [[${7 * factor},${4 * factor}],[${16 * factor},${13 * factor}]]`
                : `完整点积 = ${32 * factor}；共享 k 消失。`}
            </text>
          </g>
        )}
      </svg>
      <p role="status" className="text-sm">
        {badShape
          ? "形状检查失败：点积要等长；矩阵乘要内维相等；Hadamard 要同形。本实验不做广播。"
          : mode === "hadamard"
            ? "Hadamard 输出形状 (2,3)，每一格独立相乘。"
            : `第 ${timeline.currentStep + 1}/3 项，部分和 ${sum}。${mode === "dot" ? "结果是标量。" : `正在算 C[0,${target}]。`}`}
      </p>
      {!badShape && mode !== "hadamard" ? (
        <TimelineControls
          timeline={timeline}
          labelText={{ "k=0": "第一项", "k=1": "第二项", "k=2": "第三项" }}
          reset={{ label: "重置乘法实验", onClick: reset }}
        />
      ) : (
        <button className={control} onClick={reset}>
          重置乘法实验
        </button>
      )}
    </section>
  );
}

const probabilityCases = {
  balanced: {
    p: [0.5, 0.25, 0.25],
    q: [0.25, 0.5, 0.25],
    title: "P 与 Q 不同",
  },
  equal: { p: [0.5, 0.25, 0.25], q: [0.5, 0.25, 0.25], title: "P = Q" },
  zero: { p: [0.5, 0.25, 0.25], q: [0.5, 0.5, 0], title: "Q 漏掉 P 的支持" },
  pzero: { p: [0.5, 0.5, 0], q: [0.25, 0.5, 0.25], title: "P 的零概率项" },
};
function entropy(p: number[]) {
  return -p.reduce((s, v) => s + (v === 0 ? 0 : v * Math.log(v)), 0);
}
function divergence(p: number[], q: number[]) {
  return p.reduce(
    (s, v, i) =>
      s + (v === 0 ? 0 : q[i] === 0 ? Infinity : v * Math.log(v / q[i])),
    0,
  );
}
function decimal(v: number) {
  return Number.isFinite(v) ? v.toFixed(6) : "∞";
}

export function LslMathematicalNotationEvidenceGateLab() {
  const [preset, setPreset] =
    useState<keyof typeof probabilityCases>("balanced");
  const [condition, setCondition] = useState(false);
  const [reverse, setReverse] = useState(false);
  const pair = probabilityCases[preset];
  const rawP = reverse ? pair.q : pair.p;
  const rawQ = reverse ? pair.p : pair.q;
  const normalize = (r: number[]) => {
    const mass = r[0] + r[1];
    return [r[0] / mass, r[1] / mass, 0];
  };
  const p = condition ? normalize(rawP) : rawP;
  const q = condition ? normalize(rawQ) : rawQ;
  const mean = p.reduce((s, v, i) => s + i * v, 0);
  const variance = p.reduce((s, v, i) => s + (i - mean) ** 2 * v, 0);
  const kl = divergence(p, q);
  return (
    <section
      className={panel}
      data-visual-kind="notation-probability-area"
      aria-label="实验三：概率面积与信息量"
    >
      <h3 className="m-0 text-lg font-semibold">03 · 面积是概率，不是信息量</h3>
      <p className="text-sm text-secondary">
        取值 x∈&#123;0,1,2&#125;。每个区间的宽度为 1，高度为概率，面积总和为 1。
      </p>
      <div className="flex flex-wrap gap-3">
        <label className="grid gap-1 text-sm">
          分布
          <select
            aria-label="概率分布预设"
            className={control}
            value={preset}
            onChange={(e) =>
              setPreset(e.target.value as keyof typeof probabilityCases)
            }
          >
            {Object.entries(probabilityCases).map(([id, c]) => (
              <option key={id} value={id}>
                {c.title}
              </option>
            ))}
          </select>
        </label>
        <button
          className={control}
          aria-pressed={condition}
          onClick={() => setCondition(!condition)}
        >
          {condition ? "撤销条件 x<2" : "条件化 x<2"}
        </button>
        <button
          className={control}
          aria-pressed={reverse}
          onClick={() => setReverse(!reverse)}
        >
          交换 P / Q
        </button>
      </div>
      <svg
        viewBox="0 0 330 410"
        className="mx-auto mt-4 block w-full max-w-[440px]"
        role="img"
        aria-label={`概率P和Q的三格面积，熵${decimal(entropy(p))}，KL${decimal(kl)} nats`}
        fontSize="16"
      >
        {[p, q].map((dist, r) => (
          <g key={r}>
            <text x={10} y={25 + r * 180} fill={ink}>
              {r === 0 ? "P（实心）" : "Q（斜线）"}
              {condition ? " | x<2" : ""}
            </text>
            <path
              d={`M25 ${55 + r * 180} V${150 + r * 180} H318`}
              stroke={muted}
              fill="none"
            />
            {dist.map((v, i) => (
              <g key={i}>
                <rect
                  x={36 + i * 94}
                  y={150 + r * 180 - v * 100}
                  width={80}
                  height={v * 100}
                  fill={accent}
                  fillOpacity={r === 0 ? 0.7 : 0.15}
                  stroke={accent}
                />
                {r === 1 &&
                  v > 0 &&
                  Array.from({ length: 4 }, (_, n) => (
                    <path
                      key={n}
                      d={`M${40 + i * 94 + n * 18} ${148 + r * 180} l12 ${-Math.min(v * 100 - 4, 24)}`}
                      stroke={accent}
                    />
                  ))}
                <text
                  x={76 + i * 94}
                  y={140 + r * 180 - v * 100}
                  textAnchor="middle"
                  fill={ink}
                >
                  {v.toFixed(3)}
                </text>
                <text
                  x={76 + i * 94}
                  y={173 + r * 180}
                  textAnchor="middle"
                  fill={muted}
                >
                  x={i}
                </text>
              </g>
            ))}
          </g>
        ))}
        <text x={10} y={390} fill={ink}>
          {Number.isFinite(kl)
            ? `D(P∥Q) = ${decimal(kl)} nats`
            : "P(2)>0，Q(2)=0 → KL = ∞"}
        </text>
      </svg>
      <div role="status" className="grid gap-1 text-sm">
        <span>
          H(P) = {decimal(entropy(p))} nats；D(P∥Q) = {decimal(kl)} nats
        </span>
        <span>
          Eₚ[X] = {decimal(mean)}；Varₚ(X) = {decimal(variance)}
        </span>
        <span>
          {condition
            ? `条件化先除以原事件质量：P 为 ${decimal(rawP[0] + rawP[1])}，Q 为 ${decimal(rawQ[0] + rawQ[1])}。`
            : "自然对数 ln；P=0 的项按极限计 0，不计算 log(0)。"}
        </span>
      </div>
      <button
        className={`${control} mt-4`}
        onClick={() => {
          setPreset("balanced");
          setCondition(false);
          setReverse(false);
        }}
      >
        重置概率实验
      </button>
    </section>
  );
}
