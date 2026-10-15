"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  useTeachingTimeline,
  type BuildTimeline,
} from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

const C = {
  ink: "var(--text-primary)",
  muted: "var(--text-secondary)",
  line: "var(--border)",
  accent: "var(--accent)",
  warning: "var(--warning)",
  bg: "var(--bg-elevated)",
};
const control =
  "min-h-11 min-w-11 rounded-control border border-border bg-elevated px-3 text-primary focus-visible:outline-2 focus-visible:outline-accent";
const shell =
  "not-prose my-6 min-w-0 rounded-card border border-border p-3 text-primary [&_button]:min-h-11 [&_button]:min-w-11 [&_button]:focus-visible:outline-2 [&_button]:focus-visible:outline-accent [&_input]:min-h-11 [&_input]:min-w-11";
const svgStyle = {
  width: "100%",
  maxWidth: 440,
  display: "block",
  margin: "0 auto",
  fontSize: 16,
};
const fmt = (n: number) => (Math.abs(n) < 0.0005 ? "0" : n.toFixed(2));

function useFrames(names: string[]) {
  const key = names.join("|");
  const steps = useMemo(
    () => key.split("|").map((label) => ({ label })),
    [key],
  );
  const build = useCallback<BuildTimeline>(
    (tl) => {
      const clock = { tick: 0 };
      steps.forEach((step, i) => tl.label(step.label, i * 900));
      tl.add(
        clock,
        {
          tick: steps.length - 1,
          duration: (steps.length - 1) * 900,
          ease: "linear",
        },
        0,
      );
    },
    [steps],
  );
  const timeline = useTeachingTimeline({ steps, build });
  useEffect(() => {
    if (timeline.reducedMotion && timeline.isPlaying) timeline.pause();
  }, [timeline]);
  return timeline;
}

function Tape({ reset }: { reset: () => void }) {
  const [weight, setWeight] = useState(0.75);
  const [input, setInput] = useState(2);
  const [fault, setFault] = useState(false);
  const tl = useFrames(["正向存值", "种子 L̄=1", "回传 r̄", "回传 ā", "累积 w̄"]);
  const residual = weight * input - 1;
  const reverse = [residual * (fault ? 1 : input), residual, residual, 1];
  const reveal = [4, 3, 2, 1];
  const rows = [
    ["w", weight, "a 对 w 的导数", fault ? 1 : input],
    ["a = wx", weight * input, "r 对 a 的导数", 1],
    ["r = a−1", residual, "L 对 r 的导数", residual],
    ["L = r²/2", (residual * residual) / 2, "输出种子", 1],
  ] as const;
  const gradient = residual * input;
  return (
    <section
      className={shell}
      data-visual-kind="reverse-mode-adjoint-tape"
      data-cursor={tl.currentStep}
      data-playing={tl.isPlaying}
      aria-label="实验一：反向模式伴随值计算带"
    >
      <h3 className="text-lg font-semibold">实验一 · 从输出倒着写伴随值</h3>
      <div className="my-3 grid gap-3 sm:grid-cols-2">
        <label>
          权重 w = {weight.toFixed(2)}
          <input
            className="mdx-range block w-full"
            aria-label="权重 w"
            type="range"
            min="0.25"
            max="1.25"
            step="0.25"
            value={weight}
            onChange={(e) => {
              tl.pause();
              setWeight(+e.target.value);
            }}
          />
        </label>
        <label>
          固定输入 x
          <select
            className={`${control} block w-full`}
            aria-label="输入 x"
            value={input}
            onChange={(e) => {
              tl.pause();
              setInput(+e.target.value);
            }}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </label>
      </div>
      <button
        className={control}
        data-fault="erase-input-derivative"
        aria-pressed={fault}
        onClick={() => {
          tl.pause();
          setFault(!fault);
        }}
      >
        故障：把 x 错写成 1 {fault ? "（开）" : "（关）"}
      </button>
      <svg
        viewBox="0 0 330 420"
        style={svgStyle}
        role="img"
        aria-label="左列为正向存值，右列为从下往上回写的伴随值；横线长度按带符号伴随值缩放"
      >
        <text x="12" y="29" fill={C.ink}>
          正向：存值 ↓
        </text>
        <text x="186" y="29" fill={C.accent}>
          逆向：回写 ↑
        </text>
        {rows.map(([name, value, local, slope], i) => {
          const y = 62 + i * 82;
          const ready = tl.currentStep >= reveal[i];
          const adj = ready ? reverse[i] : 0;
          return (
            <g key={name}>
              <line x1="10" x2="320" y1={y + 58} y2={y + 58} stroke={C.line} />
              <text x="12" y={y} fill={C.ink}>
                {name}: {fmt(value)}
              </text>
              <text
                x="12"
                y={y + 28}
                fill={i === 0 && fault ? C.warning : C.muted}
              >
                {local} = {fmt(slope)}
              </text>
              <text
                x="208"
                y={y}
                fill={
                  ready ? (fault && i === 0 ? C.warning : C.accent) : C.muted
                }
              >
                {ready ? `${name[0]}̄=${fmt(adj)}` : "待回写"}
              </text>
              <line
                x1="250"
                x2={250 + adj * 8}
                y1={y + 40}
                y2={y + 40}
                stroke={fault && i === 0 ? C.warning : C.accent}
                strokeWidth="6"
              />
              <line
                x1="250"
                x2="250"
                y1={y + 31}
                y2={y + 49}
                stroke={C.muted}
              />
            </g>
          );
        })}
        <text x="12" y="411" fill={C.muted}>
          横线：8 px / 伴随单位；竖线为零
        </text>
      </svg>
      <p className="text-sm" role="status">
        当前 {tl.labels[tl.currentStep]}。独立解析梯度 {fmt(gradient)}；带上结果{" "}
        {tl.currentStep === 4 ? fmt(reverse[0]) : "尚未写入"}。目标
        y=1，正向损失不因故障改变。
      </p>
      <TimelineControls
        timeline={tl}
        reset={{ label: "完整重置", onClick: reset }}
      />
    </section>
  );
}

type Point = [number, number];
const loss = ([u, v]: Point) => (u * u + 4 * v * v) / 2;
function trajectory(start: Point, rate: number, fault: boolean): Point[] {
  const points: Point[] = [start];
  for (let i = 0; i < 8; i++) {
    const [u, v] = points[i];
    const sign = fault ? 1 : -1;
    points.push([u + sign * rate * u, v + sign * rate * 4 * v]);
  }
  return points;
}
const px = ([u, v]: Point): Point => [165 + 27 * u, 165 - 27 * v];
const inside = ([u, v]: Point) => Math.abs(u) <= 4.2 && Math.abs(v) <= 4.2;
function Contour({ reset }: { reset: () => void }) {
  const [rate, setRate] = useState(0.2);
  const [start, setStart] = useState("wide");
  const [fault, setFault] = useState(false);
  const tl = useFrames(Array.from({ length: 9 }, (_, i) => `更新 ${i}`));
  const origin: Point = start === "wide" ? [3, 1.5] : [-2, 1];
  const path = trajectory(origin, rate, fault);
  const reference = trajectory(origin, rate, false);
  const shown = path.slice(0, tl.currentStep + 1);
  const escaped = shown.findIndex((p) => !inside(p));
  const safe = escaped < 0 ? shown : shown.slice(0, escaped);
  const current = path[tl.currentStep];
  return (
    <section
      className={shell}
      data-visual-kind="gradient-descent-contour-path"
      data-cursor={tl.currentStep}
      data-playing={tl.isPlaying}
      aria-label="实验二：二维损失等高线梯度下降"
    >
      <h3 className="text-lg font-semibold">
        实验二 · 沿等高线下坡还是跨过谷底
      </h3>
      <div className="my-3 grid gap-3 sm:grid-cols-2">
        <label>
          学习率 η = {rate.toFixed(2)}
          <input
            className="mdx-range block w-full"
            aria-label="学习率"
            type="range"
            min="0.05"
            max="0.55"
            step="0.05"
            value={rate}
            onChange={(e) => {
              tl.pause();
              setRate(+e.target.value);
            }}
          />
        </label>
        <label>
          起点
          <select
            className={`${control} block w-full`}
            aria-label="下降起点"
            value={start}
            onChange={(e) => {
              tl.pause();
              setStart(e.target.value);
            }}
          >
            <option value="wide">(3, 1.5)</option>
            <option value="left">(−2, 1)</option>
          </select>
        </label>
      </div>
      <button
        className={control}
        data-fault="gradient-ascent-sign"
        aria-pressed={fault}
        onClick={() => {
          tl.pause();
          setFault(!fault);
        }}
      >
        故障：减梯度写成加 {fault ? "（开）" : "（关）"}
      </button>
      <svg
        viewBox="0 0 330 355"
        style={svgStyle}
        role="img"
        aria-label="椭圆是 L=(u²+4v²)/2 的等高线，虚线为正确减法参考，实线为当前离散更新轨迹"
      >
        {[0.5, 2, 4, 8].map((c) => (
          <ellipse
            key={c}
            cx="165"
            cy="165"
            rx={27 * Math.sqrt(2 * c)}
            ry={27 * Math.sqrt(c / 2)}
            fill="none"
            stroke={C.line}
          />
        ))}
        <line x1="35" x2="295" y1="165" y2="165" stroke={C.muted} />
        <line x1="165" x2="165" y1="35" y2="295" stroke={C.muted} />
        <text x="300" y="172" fill={C.ink}>
          u
        </text>
        <text x="175" y="34" fill={C.ink}>
          v
        </text>
        <text x="175" y="186" fill={C.muted}>
          0
        </text>
        <text x="57" y="187" fill={C.muted}>
          −4
        </text>
        <text x="269" y="187" fill={C.muted}>
          4
        </text>
        <text x="12" y="24" fill={C.ink}>
          L = (u² + 4v²)/2
        </text>
        <polyline
          points={reference
            .filter(inside)
            .map((p) => px(p).join(","))
            .join(" ")}
          fill="none"
          stroke={C.muted}
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        <polyline
          points={safe.map((p) => px(p).join(",")).join(" ")}
          fill="none"
          stroke={fault ? C.warning : C.accent}
          strokeWidth="3"
        />
        {safe.map((p, i) => (
          <circle
            key={i}
            cx={px(p)[0]}
            cy={px(p)[1]}
            r={i === safe.length - 1 ? 6 : 3}
            fill={fault ? C.warning : C.accent}
          />
        ))}
        {escaped >= 0 && (
          <text x="12" y="319" fill={C.warning}>
            第 {escaped} 步越界：不缩放伪装收敛
          </text>
        )}
        <text x="12" y="346" fill={C.muted}>
          坐标每单位 27 px；实线随游标增长
        </text>
      </svg>
      <p className="text-sm" role="status">
        第 {tl.currentStep} 步：({fmt(current[0])}, {fmt(current[1])})，L=
        {fmt(loss(current))}。初始 L={fmt(loss(origin))}
        。虚线是同参数的正确参考，不受故障影响。
      </p>
      <TimelineControls
        timeline={tl}
        reset={{ label: "完整重置", onClick: reset }}
      />
    </section>
  );
}

function VectorArrow({
  from,
  to,
  color,
  dashed = false,
}: {
  from: Point;
  to: Point;
  color: string;
  dashed?: boolean;
}) {
  const dx = to[0] - from[0],
    dy = to[1] - from[1];
  if (Math.hypot(dx, dy) < 0.1)
    return (
      <circle
        cx={to[0]}
        cy={to[1]}
        r="5"
        fill="none"
        stroke={color}
        strokeWidth="3"
      />
    );
  const a = Math.atan2(dy, dx),
    r = 7;
  return (
    <g stroke={color} fill="none" strokeWidth="2.5">
      <line
        x1={from[0]}
        y1={from[1]}
        x2={to[0]}
        y2={to[1]}
        strokeDasharray={dashed ? "5 4" : undefined}
      />
      <path
        d={`M ${to[0] - r * Math.cos(a - 0.5)} ${to[1] - r * Math.sin(a - 0.5)} L ${to[0]} ${to[1]} L ${to[0] - r * Math.cos(a + 0.5)} ${to[1] - r * Math.sin(a + 0.5)}`}
      />
    </g>
  );
}
function Fan({ reset }: { reset: () => void }) {
  const [batch, setBatch] = useState(2);
  const [spread, setSpread] = useState(1);
  const [fault, setFault] = useState(false);
  const tl = useFrames([
    "空批次",
    "加入样本 1",
    "加入样本 2",
    "加入样本 3",
    "加入样本 4",
  ]);
  const vectors: Point[] = [
    [2, spread],
    [2, -spread],
    [-2, spread],
    [-2, -spread],
  ];
  const n = Math.min(tl.currentStep, batch);
  const sum = vectors
    .slice(0, n)
    .reduce<Point>((s, g) => [s[0] + g[0], s[1] + g[1]], [0, 0]);
  const average: Point = n ? [sum[0] / n, sum[1] / n] : [0, 0];
  const output = fault ? sum : average;
  const map = ([u, v]: Point): Point => [165 + 22 * u, 170 - 22 * v];
  let running: Point = [0, 0];
  return (
    <section
      className={shell}
      data-visual-kind="minibatch-gradient-vector-fan"
      data-cursor={tl.currentStep}
      data-playing={tl.isPlaying}
      aria-label="实验三：逐样本与小批量梯度方向扇图"
    >
      <h3 className="text-lg font-semibold">实验三 · 大箭头可以互相抵消</h3>
      <div className="my-3 grid gap-3 sm:grid-cols-2">
        <label>
          批次大小
          <select
            className={`${control} block w-full`}
            aria-label="批次大小"
            value={batch}
            onChange={(e) => {
              tl.pause();
              setBatch(+e.target.value);
            }}
          >
            <option value="1">1 个样本</option>
            <option value="2">2 个样本</option>
            <option value="4">4 个样本</option>
          </select>
        </label>
        <label>
          纵向分歧 s = {spread.toFixed(1)}
          <input
            className="mdx-range block w-full"
            aria-label="样本纵向分歧"
            type="range"
            min="0.5"
            max="2"
            step="0.5"
            value={spread}
            onChange={(e) => {
              tl.pause();
              setSpread(+e.target.value);
            }}
          />
        </label>
      </div>
      <button
        className={control}
        data-fault="sum-not-mean"
        aria-pressed={fault}
        onClick={() => {
          tl.pause();
          setFault(!fault);
        }}
      >
        故障：只求和不除样本数 {fault ? "（开）" : "（关）"}
      </button>
      <svg
        viewBox="0 0 330 355"
        style={svgStyle}
        role="img"
        aria-label="从原点发散的虚线是样本梯度，细实线首尾相接求和，粗箭头为当前均值；零向量用空心圆表示"
      >
        <line x1="35" x2="295" y1="170" y2="170" stroke={C.line} />
        <line x1="165" x2="165" y1="45" y2="290" stroke={C.line} />
        <text x="12" y="24" fill={C.ink}>
          梯度 gᵢ = θ − tᵢ，固定 θ=0
        </text>
        <text x="296" y="177" fill={C.muted}>
          u
        </text>
        <text x="175" y="52" fill={C.muted}>
          v
        </text>
        {vectors.map((g, i) => (
          <g key={i} opacity={i < n ? 1 : 0.35}>
            <VectorArrow
              from={map([0, 0])}
              to={map(g)}
              color={C.muted}
              dashed
            />
            <text
              x={map(g)[0] + (g[0] > 0 ? 8 : -22)}
              y={map(g)[1] + (g[1] > 0 ? -8 : 20)}
              fill={C.muted}
            >
              g{i + 1}
            </text>
          </g>
        ))}
        {vectors.slice(0, n).map((g, i) => {
          const before = running;
          running = [running[0] + g[0], running[1] + g[1]];
          return (
            <VectorArrow
              key={i}
              from={map(before)}
              to={map(running)}
              color={C.muted}
            />
          );
        })}
        <g strokeWidth="4">
          <VectorArrow
            from={map([0, 0])}
            to={map(output)}
            color={fault ? C.warning : C.accent}
          />
        </g>
        <text x="12" y="318" fill={fault ? C.warning : C.accent}>
          {fault ? "错误和" : "均值"} = ({fmt(output[0])}, {fmt(output[1])})
        </text>
        <text x="12" y="346" fill={C.muted}>
          22 px / 单位；下降方向需再取负号
        </text>
      </svg>
      <p className="text-sm" role="status">
        已纳入 {n}/{batch} 个样本。和=({fmt(sum[0])}, {fmt(sum[1])})；正确均值=(
        {fmt(average[0])}, {fmt(average[1])}
        )。四样本恰好抵消时，求和错误也可能被零掩盖；请用两样本检测。
      </p>
      <TimelineControls
        timeline={tl}
        reset={{ label: "完整重置", onClick: reset }}
      />
    </section>
  );
}

// Retain the registry's three historical export names; the mechanisms are new.
export function TcgMain06TrainingNeuralNetsContextContractLab() {
  const [epoch, setEpoch] = useState(0);
  return <Tape key={epoch} reset={() => setEpoch(epoch + 1)} />;
}
export function TcgMain06TrainingNeuralNetsComputeTraceLab() {
  const [epoch, setEpoch] = useState(0);
  return <Contour key={epoch} reset={() => setEpoch(epoch + 1)} />;
}
export function TcgMain06TrainingNeuralNetsEvidenceGateLab() {
  const [epoch, setEpoch] = useState(0);
  return <Fan key={epoch} reset={() => setEpoch(epoch + 1)} />;
}
