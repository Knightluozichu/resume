"use client";

import { useId, useState } from "react";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

const C = {
  bg: "var(--bg)",
  panel: "var(--bg-elevated)",
  line: "var(--border)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
};
const shell =
  "not-prose my-6 min-w-0 rounded-xl border border-border bg-elevated p-3 text-primary sm:p-5 [&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11 [&_input]:min-w-11 [&_select]:min-h-11 [&_select]:min-w-11 [&_:focus-visible]:outline-2 [&_:focus-visible]:outline-offset-2 [&_:focus-visible]:outline-accent [&_.mt-4.flex]:flex-wrap";
const select =
  "mt-1 min-h-11 w-full rounded border border-border bg-bg px-2 py-2 text-sm text-primary";
const basisSteps = [1, 2, 3].map((n) => ({ label: `计算第 ${n} 行` }));
const projectionSteps = ["模型直线与观测", "计算垂足", "检查残差"].map(
  (label) => ({ label }),
);
const curveSteps = ["训练区间拟合", "留出点检验", "超范围外推"].map(
  (label) => ({ label }),
);
function useModelTrace(steps: readonly TeachingStep[]) {
  return useTeachingTimeline({
    steps,
    build(tl) {
      const clock = { value: 0 };
      steps.forEach((s, i) => tl.label(s.label, i * 1200));
      tl.add(
        clock,
        { value: steps.length, duration: steps.length * 1200, ease: "linear" },
        0,
      );
    },
  });
}
function FaultButton({
  fault,
  onClick,
  children,
}: {
  fault: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      data-fault
      aria-pressed={fault}
      onClick={onClick}
      className="mt-3 w-full rounded border border-border bg-bg px-3 py-2 text-left text-sm"
    >
      {fault ? "撤销故障：" : "注入故障："}
      {children}
    </button>
  );
}
function fmt(x: number) {
  return Math.abs(x) < 1e-9 ? "0" : Number(x.toFixed(4)).toString();
}
function basisRows(xs: number[], degree: number, fault: boolean) {
  return xs.map((x) =>
    Array.from({ length: degree + 1 }, (_, j) =>
      fault && j === 0 ? 0 : x ** j,
    ),
  );
}
function dot(a: number[], b: number[]) {
  return a.reduce((sum, v, i) => sum + v * b[i], 0);
}

// Compatibility names are kept for the existing registry; the mechanisms are new.
export function TcgMain03ModelContextContractLab() {
  const [grid, setGrid] = useState("centered");
  const [degree, setDegree] = useState(2);
  const [preset, setPreset] = useState("ones");
  const [fault, setFault] = useState(false);
  const trace = useModelTrace(basisSteps);
  const xs = grid === "centered" ? [-1, 0, 1] : [0, 1, 2];
  const theta = (preset === "ones" ? [1, 1, 1] : [1, -1, 2]).slice(
    0,
    degree + 1,
  );
  const rows = basisRows(xs, degree, fault);
  const ys = rows.map((row) => dot(row, theta));
  const rowIndex = trace.currentStep;
  const columns = degree === 2 ? [82, 145, 208] : [105, 195];
  function reset() {
    trace.seek(0);
    setGrid("centered");
    setDegree(2);
    setPreset("ones");
    setFault(false);
  }
  return (
    <section
      className={shell}
      data-visual-kind="polynomial-basis-design-matrix"
      aria-label="实验一：基展开设计矩阵"
    >
      <h3 className="m-0 text-lg font-semibold">实验一 · 输入如何成为一行数</h3>
      <p className="text-sm text-secondary">
        这里只算 Φθ，不寻找参数。先猜：删掉常数列会让哪些预测改变？
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="text-sm">
          输入坐标
          <select
            className={select}
            value={grid}
            onChange={(e) => setGrid(e.target.value)}
          >
            <option value="centered">A · −1, 0, 1</option>
            <option value="positive">B · 0, 1, 2</option>
          </select>
        </label>
        <label className="text-sm">
          多项式阶数
          <select
            className={select}
            value={degree}
            onChange={(e) => setDegree(Number(e.target.value))}
          >
            <option value={1}>一次 · 2 列</option>
            <option value={2}>二次 · 3 列</option>
          </select>
        </label>
        <label className="text-sm">
          系数预设（按列截取）
          <select
            className={select}
            value={preset}
            onChange={(e) => setPreset(e.target.value)}
          >
            <option value="ones">A · [1, 1, 1]</option>
            <option value="curved">B · [1, −1, 2]</option>
          </select>
        </label>
      </div>
      <svg
        viewBox="0 0 280 370"
        role="img"
        aria-label={`设计矩阵 ${rows.length} 行 ${degree + 1} 列；预测 ${ys.join(", ")}`}
        className="mx-auto mt-4 block w-full max-w-md"
        fontSize={13}
        fill={C.text}
      >
        <text x={140} y={22} textAnchor="middle">
          Φ 的行是样本，列是基函数
        </text>
        <text x={25} y={57} textAnchor="middle">
          x
        </text>
        {columns.map((cx, j) => (
          <text key={j} x={cx} y={57} textAnchor="middle">
            {["1", "x", "x²"][j]}
          </text>
        ))}
        {rows.map((row, i) => (
          <g key={i}>
            <rect
              x={48}
              y={75 + i * 46}
              width={202}
              height={36}
              rx={5}
              fill={i === rowIndex ? C.panel : C.bg}
              stroke={i === rowIndex ? C.accent : C.line}
              strokeWidth={i === rowIndex ? 2 : 1}
            />
            <text x={25} y={98 + i * 46} textAnchor="middle">
              {xs[i]}
            </text>
            {row.map((value, j) => (
              <text
                key={j}
                x={columns[j]}
                y={98 + i * 46}
                textAnchor="middle"
                fill={fault && j === 0 ? C.danger : C.text}
              >
                {value}
              </text>
            ))}
          </g>
        ))}
        <path
          d="M 44 70 H 38 V 211 H 44 M 254 70 H 260 V 211 H 254"
          fill="none"
          stroke={C.muted}
        />
        <text x={140} y={245} textAnchor="middle">
          θ = [{theta.join(", ")}]
        </text>
        <text x={140} y={274} textAnchor="middle" fill={C.accent}>
          第 {rowIndex + 1} 行 · θ = {ys[rowIndex]}
        </text>
        <text x={140} y={305} textAnchor="middle">
          ŷ = [{ys.join(", ")}]
        </text>
        <text
          x={140}
          y={338}
          textAnchor="middle"
          fill={fault ? C.danger : C.muted}
        >
          {fault ? "故障：常数列错写为 0" : "每个样本都有常数项 1"}
        </text>
        <text x={140} y={360} textAnchor="middle" fill={C.muted}>
          参数已给定；没有发生拟合
        </text>
      </svg>
      <p className="break-words text-sm" data-results>
        当前行点积：
        {rows[rowIndex].map((v, j) => `${v}×(${theta[j]})`).join(" + ")}
        {" = "}
        {ys[rowIndex]}。全部预测：[{ys.join(", ")}]。
      </p>
      <FaultButton fault={fault} onClick={() => setFault(!fault)}>
        把常数列写成 0
      </FaultButton>
      <TimelineControls
        timeline={trace}
        reset={{ label: "完整重置", onClick: reset }}
      />
    </section>
  );
}

function projection(a: number[], y: number[], fault: boolean) {
  const optimum = dot(a, y) / dot(a, a);
  const theta = optimum + (fault ? 1 : 0);
  const predicted = a.map((v) => theta * v);
  const residual = y.map((v, i) => v - predicted[i]);
  return {
    optimum,
    theta,
    predicted,
    residual,
    sse: dot(residual, residual),
    orthogonal: dot(a, residual),
  };
}
export function TcgMain03ModelComputeTraceLab() {
  const [direction, setDirection] = useState("diagonal");
  const [observation, setObservation] = useState("wide");
  const [fault, setFault] = useState(false);
  const trace = useModelTrace(projectionSteps);
  const marker = useId().replace(/:/g, "");
  const a = direction === "diagonal" ? [1, 1] : [1, 2];
  const y = observation === "wide" ? [2, 0] : [1, 3];
  const p = projection(a, y, fault);
  const X = (v: number) => 40 + (v + 1) * 30;
  const Y = (v: number) => 260 - (v + 1) * 30;
  const foot = [X(p.predicted[0]), Y(p.predicted[1])];
  const observed = [X(y[0]), Y(y[1])];
  const length = Math.hypot(...a);
  const u = [(a[0] / length) * 8, (-a[1] / length) * 8];
  const rLength = Math.hypot(...p.residual);
  const v = rLength
    ? [(p.residual[0] / rLength) * 8, (-p.residual[1] / rLength) * 8]
    : [0, 0];
  const corner = `M ${foot[0] + u[0]} ${foot[1] + u[1]} l ${v[0]} ${v[1]} l ${-u[0]} ${-u[1]}`;
  function reset() {
    trace.seek(0);
    setDirection("diagonal");
    setObservation("wide");
    setFault(false);
  }
  return (
    <section
      className={shell}
      data-visual-kind="least-squares-residual-projection"
      aria-label="实验二：最小二乘残差投影"
    >
      <h3 className="m-0 text-lg font-semibold">实验二 · 离模型直线最近的点</h3>
      <p className="text-sm text-secondary">
        两个轴各是一条观测的数值，不是输入 x 与输出 y。先猜：θ 比最优值多 1
        时残差还垂直吗？
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm">
          模型方向 a
          <select
            className={select}
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
          >
            <option value="diagonal">A · (1, 1)</option>
            <option value="steep">B · (1, 2)</option>
          </select>
        </label>
        <label className="text-sm">
          观测向量 y
          <select
            className={select}
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
          >
            <option value="wide">A · (2, 0)</option>
            <option value="high">B · (1, 3)</option>
          </select>
        </label>
      </div>
      <svg
        viewBox="0 0 280 350"
        role="img"
        aria-label={`观测空间投影，θ=${fmt(p.theta)}，平方误差和=${fmt(p.sse)}`}
        className="mx-auto mt-4 block w-full max-w-md"
        fontSize={13}
        fill={C.text}
      >
        <defs>
          <marker
            id={marker}
            viewBox="0 0 8 8"
            refX={7}
            refY={4}
            markerWidth={6}
            markerHeight={6}
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 8 4 L 0 8 Z" fill={C.danger} />
          </marker>
        </defs>
        <text x={140} y={20} textAnchor="middle">
          观测空间：ŷ = θa
        </text>
        <text x={42} y={42}>
          观测 2
        </text>
        <path
          d={`M 40 ${Y(0)} H 250 M ${X(0)} 260 V 50`}
          fill="none"
          stroke={C.muted}
        />
        {[0, 2, 4, 6].map((n) => (
          <g key={n}>
            <line
              x1={X(n)}
              x2={X(n)}
              y1={Y(0) - 3}
              y2={Y(0) + 3}
              stroke={C.muted}
            />
            <text x={X(n)} y={Y(0) + 20} textAnchor="middle">
              {n}
            </text>
            {n > 0 && (
              <>
                <line
                  x1={X(0) - 3}
                  x2={X(0) + 3}
                  y1={Y(n)}
                  y2={Y(n)}
                  stroke={C.muted}
                />
                <text x={X(0) - 10} y={Y(n) + 4} textAnchor="end">
                  {n}
                </text>
              </>
            )}
          </g>
        ))}
        <line
          x1={X(-0.5)}
          y1={Y(-0.5 * a[1])}
          x2={X(5.5 / a[1])}
          y2={Y(5.5)}
          stroke={C.accent}
          strokeWidth={2}
        />
        <circle cx={observed[0]} cy={observed[1]} r={5} fill={C.text} />
        {trace.currentStep >= 1 && (
          <g>
            <line
              x1={X(0)}
              y1={Y(0)}
              x2={foot[0]}
              y2={foot[1]}
              stroke={C.accent}
              strokeWidth={4}
            />
            <circle
              cx={foot[0]}
              cy={foot[1]}
              r={6}
              fill={C.bg}
              stroke={C.accent}
              strokeWidth={2}
            />
          </g>
        )}
        {trace.currentStep >= 2 && (
          <g>
            <line
              x1={foot[0]}
              y1={foot[1]}
              x2={observed[0]}
              y2={observed[1]}
              stroke={C.danger}
              strokeWidth={2}
              markerEnd={`url(#${marker})`}
            />
            {!fault && <path d={corner} fill="none" stroke={C.text} />}
          </g>
        )}
        <text x={250} y={279} textAnchor="end">
          观测 1
        </text>
        <text x={20} y={307} fill={C.accent}>
          ○ 预测 ŷ（沿直线）
        </text>
        <text x={20} y={331}>
          ● 观测 y
        </text>
        <text x={130} y={331} fill={C.danger}>
          残差 r = y − ŷ
        </text>
      </svg>
      <div className="space-y-1 text-sm" data-results>
        <p>
          θ* = {fmt(p.optimum)}；使用 θ = {fmt(p.theta)}
        </p>
        <p>
          ŷ = ({p.predicted.map(fmt).join(", ")})；r = (
          {p.residual.map(fmt).join(", ")})
        </p>
        <p>
          SSE = {fmt(p.sse)}；a·r = {fmt(p.orthogonal)}
          {fault ? "（不是最小值）" : "（正交）"}
        </p>
      </div>
      <FaultButton fault={fault} onClick={() => setFault(!fault)}>
        使用 θ* + 1，离开垂足
      </FaultButton>
      <TimelineControls
        timeline={trace}
        reset={{ label: "完整重置", onClick: reset }}
      />
    </section>
  );
}

function truth(x: number) {
  return 1 + x * x;
}
function evaluate(theta: number[], x: number) {
  return theta.reduce((sum, v, j) => sum + v * x ** j, 0);
}
// Small full-rank teaching systems only: normal equations are not a production solver.
function fitPolynomial(xs: number[], ys: number[], degree: number) {
  const m = degree + 1;
  const rows = basisRows(xs, degree, false);
  const augmented = Array.from({ length: m }, (_, i) => [
    ...Array.from({ length: m }, (_, j) =>
      rows.reduce((sum, r) => sum + r[i] * r[j], 0),
    ),
    rows.reduce((sum, r, k) => sum + r[i] * ys[k], 0),
  ]);
  for (let k = 0; k < m; k++) {
    let pivot = k;
    for (let i = k + 1; i < m; i++) {
      if (Math.abs(augmented[i][k]) > Math.abs(augmented[pivot][k])) pivot = i;
    }
    [augmented[k], augmented[pivot]] = [augmented[pivot], augmented[k]];
    const scale = augmented[k][k];
    if (Math.abs(scale) < 1e-12)
      throw new Error("Teaching design matrix lost rank");
    augmented[k] = augmented[k].map((v) => v / scale);
    for (let i = 0; i < m; i++) {
      if (i === k) continue;
      const factor = augmented[i][k];
      augmented[i] = augmented[i].map((v, j) => v - factor * augmented[k][j]);
    }
  }
  return augmented.map((row) => row[m]);
}
function curveExperiment(degree: number, noise: number, fault: boolean) {
  const trainX = [-1, -1 / 3, 1 / 3, 1];
  const trainY = trainX.map((x, i) => truth(x) + noise * (i % 2 ? 1 : -1));
  const holdX = [-2 / 3, 0, 2 / 3];
  const extX = [1.5, 2];
  const fitX = fault ? [...trainX, ...holdX] : trainX;
  const fitY = fault ? [...trainY, ...holdX.map(truth)] : trainY;
  const theta = fitPolynomial(fitX, fitY, degree);
  function mse(xs: number[], ys: number[]) {
    return (
      xs.reduce((sum, x, i) => sum + (evaluate(theta, x) - ys[i]) ** 2, 0) /
      xs.length
    );
  }
  return {
    trainX,
    trainY,
    holdX,
    extX,
    theta,
    trainMSE: mse(trainX, trainY),
    holdMSE: mse(holdX, holdX.map(truth)),
    extMSE: mse(extX, extX.map(truth)),
  };
}
function curvePath(
  theta: number[] | null,
  left: number,
  right: number,
  xMap: (v: number) => number,
  yMap: (v: number) => number,
) {
  return Array.from({ length: 81 }, (_, i) => {
    const x = left + ((right - left) * i) / 80;
    return `${i === 0 ? "M" : "L"} ${xMap(x).toFixed(3)} ${yMap(theta ? evaluate(theta, x) : truth(x)).toFixed(3)}`;
  }).join(" ");
}
export function TcgMain03ModelEvidenceGateLab() {
  const [degree, setDegree] = useState(2);
  const [noise, setNoise] = useState(0.2);
  const [fault, setFault] = useState(false);
  const trace = useModelTrace(curveSteps);
  const id = useId().replace(/:/g, "");
  const data = curveExperiment(degree, noise, fault);
  const final = trace.currentStep === 2;
  const X = (x: number) => 38 + (x + 1) * 106;
  const Y = (y: number) => 220 - (y - 0.5) * 85;
  const EX = (x: number) => 38 + (x - 1) * 212;
  const EY = (y: number) => 470 - y * (170 / 12);
  function reset() {
    trace.seek(0);
    setDegree(2);
    setNoise(0.2);
    setFault(false);
  }
  return (
    <section
      className={shell}
      data-visual-kind="degree-holdout-extrapolation"
      aria-label="实验三：阶数与留出外推"
    >
      <h3 className="m-0 text-lg font-semibold">实验三 · 穿过训练点以后呢？</h3>
      <p className="text-sm text-secondary">
        人工世界
        f(x)=1+x²；四个训练点带交替噪声，三个留出点不参与拟合。先猜：三次零训练误差是否也能准确外推？
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm">
          拟合阶数
          <select
            className={select}
            value={degree}
            onChange={(e) => setDegree(Number(e.target.value))}
          >
            <option value={1}>一次 · 2 参数</option>
            <option value={2}>二次 · 3 参数</option>
            <option value={3}>三次 · 4 参数</option>
          </select>
        </label>
        <label className="text-sm">
          训练噪声幅度 ε
          <select
            className={select}
            value={noise}
            onChange={(e) => setNoise(Number(e.target.value))}
          >
            <option value={0.1}>A · 0.1</option>
            <option value={0.2}>B · 0.2</option>
          </select>
        </label>
      </div>
      <svg
        viewBox={`0 0 280 ${final ? 550 : 350}`}
        role="img"
        aria-label={`${degree}次拟合曲线，${fault ? "留出已泄漏" : "独立留出"}，当前${curveSteps[trace.currentStep].label}`}
        className="mx-auto mt-4 block w-full max-w-md"
        fontSize={13}
        fill={C.text}
      >
        <defs>
          <clipPath id={`${id}-fit`}>
            <rect x={38} y={50} width={212} height={170} />
          </clipPath>
          <clipPath id={`${id}-ext`}>
            <rect x={38} y={300} width={212} height={170} />
          </clipPath>
        </defs>
        <text x={140} y={20} textAnchor="middle">
          区间内：y 轴 0.5–2.5
        </text>
        {[0.5, 1.5, 2.5].map((n) => (
          <g key={n}>
            <line x1={38} x2={250} y1={Y(n)} y2={Y(n)} stroke={C.line} />
            <text x={30} y={Y(n) + 4} textAnchor="end">
              {n}
            </text>
          </g>
        ))}
        <path d="M 38 50 V 220 H 250" fill="none" stroke={C.muted} />
        {[-1, 0, 1].map((n) => (
          <text key={n} x={X(n)} y={242} textAnchor="middle">
            {n}
          </text>
        ))}
        <text x={266} y={242}>
          x
        </text>
        <g clipPath={`url(#${id}-fit)`}>
          <path
            d={curvePath(null, -1, 1, X, Y)}
            fill="none"
            stroke={C.muted}
            strokeDasharray="5 4"
            strokeWidth={2}
          />
          <path
            d={curvePath(data.theta, -1, 1, X, Y)}
            fill="none"
            stroke={C.accent}
            strokeWidth={2.5}
          />
        </g>
        {data.trainX.map((x, i) => (
          <circle
            key={i}
            cx={X(x)}
            cy={Y(data.trainY[i])}
            r={4}
            fill={C.accent}
            stroke={C.bg}
            strokeWidth={1}
          />
        ))}
        {trace.currentStep >= 1 &&
          data.holdX.map((x) => (
            <path
              key={x}
              d={`M ${X(x)} ${Y(truth(x)) - 5} l 5 5 l -5 5 l -5 -5 Z`}
              fill={fault ? C.danger : C.bg}
              stroke={fault ? C.danger : C.text}
              strokeWidth={1.5}
            />
          ))}
        {final && (
          <g>
            <text x={140} y={278} textAnchor="middle">
              外推：y 轴 0–12（换尺度）
            </text>
            {[0, 6, 12].map((n) => (
              <g key={n}>
                <line x1={38} x2={250} y1={EY(n)} y2={EY(n)} stroke={C.line} />
                <text x={30} y={EY(n) + 4} textAnchor="end">
                  {n}
                </text>
              </g>
            ))}
            <path d="M 38 300 V 470 H 250" fill="none" stroke={C.muted} />
            {[1, 1.5, 2].map((n) => (
              <text key={n} x={EX(n)} y={493} textAnchor="middle">
                {n}
              </text>
            ))}
            <text x={266} y={493}>
              x
            </text>
            <g clipPath={`url(#${id}-ext)`}>
              <path
                d={curvePath(null, 1, 2, EX, EY)}
                fill="none"
                stroke={C.muted}
                strokeDasharray="5 4"
                strokeWidth={2}
              />
              <path
                d={curvePath(data.theta, 1, 2, EX, EY)}
                fill="none"
                stroke={C.accent}
                strokeWidth={2.5}
              />
            </g>
            {data.extX.map((x) => (
              <g key={x}>
                <line
                  x1={EX(x)}
                  x2={EX(x)}
                  y1={EY(truth(x))}
                  y2={EY(evaluate(data.theta, x))}
                  stroke={C.danger}
                  strokeWidth={2}
                />
                <circle
                  cx={EX(x)}
                  cy={EY(truth(x))}
                  r={4}
                  fill={C.bg}
                  stroke={C.text}
                />
              </g>
            ))}
          </g>
        )}
        <text x={12} y={final ? 520 : 278} fill={C.accent}>
          ● 训练点 / 实线拟合
        </text>
        <text x={12} y={final ? 544 : 302}>
          ◇ {fault ? "已泄漏的留出点" : "留出点"} · 虚线为真值
        </text>
        {!final && (
          <text x={12} y={332} fill={C.muted}>
            第三步另画超范围曲线
          </text>
        )}
      </svg>
      <div className="space-y-1 break-words text-sm" data-results>
        <p>系数 θ = [{data.theta.map(fmt).join(", ")}]</p>
        <p>训练 MSE = {fmt(data.trainMSE)}（对带噪观测）</p>
        <p>
          {trace.currentStep >= 1
            ? `${fault ? "泄漏点" : "留出"} MSE = ${fmt(data.holdMSE)}`
            : "留出 MSE：下一步查看"}
        </p>
        <p>
          {final
            ? `外推 MSE = ${fmt(data.extMSE)}；x=2 预测 ${fmt(evaluate(data.theta, 2))}，真值 5`
            : "外推 MSE：第三步查看"}
        </p>
        <p className={fault ? "text-danger" : "text-secondary"}>
          {fault
            ? "故障：7 点共同拟合；原留出点不能再作独立评估。"
            : "参考：只用 4 个训练点拟合；留出与外推点不参与。"}
        </p>
      </div>
      <FaultButton fault={fault} onClick={() => setFault(!fault)}>
        把留出点混入拟合
      </FaultButton>
      <TimelineControls
        timeline={trace}
        reset={{ label: "完整重置", onClick: reset }}
      />
    </section>
  );
}
