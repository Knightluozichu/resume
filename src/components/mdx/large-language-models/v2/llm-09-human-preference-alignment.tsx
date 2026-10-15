"use client";

import { useState, type ReactNode } from "react";
import {
  useTeachingTimeline,
  type TeachingTimeline,
} from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

const C = {
  ink: "var(--text-primary)",
  muted: "var(--text-secondary)",
  line: "var(--border)",
  accent: "var(--accent)",
  warn: "var(--warning)",
  bg: "var(--bg-elevated)",
};
const button =
  "min-h-11 rounded border border-border px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-accent";
const sigmoid = (d: number) => 1 / (1 + Math.exp(-d));
const kl = (p: number[], q: number[]) =>
  p.reduce((s, v, i) => s + v * Math.log(v / q[i]), 0);
const rewardSteps = Array.from({ length: 9 }, (_, i) => ({
  label: `更新${i}`,
}));
const ratioSteps = Array.from({ length: 15 }, (_, i) => ({
  label: `比率${(0.4 + i * 0.1).toFixed(1)}`,
}));
const candidateSteps = Array.from({ length: 5 }, (_, i) => ({
  label: `已审${i}项`,
}));

function useClock(steps: typeof rewardSteps) {
  return useTeachingTimeline({
    steps,
    build: (tl) => {
      const clock = { value: 0 };
      steps.forEach((step, i) => tl.label(step.label, i * 700));
      tl.add(
        clock,
        {
          value: steps.length - 1,
          duration: (steps.length - 1) * 700,
          ease: "linear",
        },
        0,
      );
    },
  });
}

function Lab({
  kind,
  title,
  children,
}: {
  kind: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      data-visual-kind={kind}
      className="not-prose my-8 min-w-0 rounded-xl border border-border bg-elevated p-3 sm:p-5 [&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11 [&_select]:min-h-11 [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-accent [&_input:focus-visible]:outline-2 [&_input:focus-visible]:outline-accent [&_select:focus-visible]:outline-2 [&_select:focus-visible]:outline-accent"
    >
      <h3 className="mb-3 text-lg font-semibold">{title}</h3>
      {children}
    </section>
  );
}
function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block min-w-0 text-sm">
      {label}：{value.toFixed(2)}
      <input
        className="block w-full accent-accent"
        aria-label={label}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}
function Controls({
  timeline,
  reset,
  fault,
  setFault,
  faultName,
}: {
  timeline: TeachingTimeline;
  reset: () => void;
  fault: boolean;
  setFault: (v: boolean) => void;
  faultName: string;
}) {
  return (
    <>
      <button
        className={`${button} my-3 w-full text-warning`}
        data-fault={faultName}
        aria-pressed={fault}
        onClick={() => setFault(!fault)}
      >
        {fault ? "撤销故障" : "注入故障"}：{faultName}
      </button>
      <TimelineControls
        timeline={timeline}
        reset={{ label: "完整重置", onClick: reset }}
      />
      <p className="mt-2 text-sm text-secondary">
        {timeline.reducedMotion
          ? "已减少动态：用单步或进度查看，不自动播放。"
          : "播放只移动计算游标，不调用或训练真实模型。"}
      </p>
    </>
  );
}

export function Llm09HumanPreferenceAlignmentContextContractLab() {
  const [start, setStart] = useState(-1);
  const [eta, setEta] = useState(0.5);
  const [winner, setWinner] = useState("A");
  const [fault, setFault] = useState(false);
  const timeline = useClock(rewardSteps);
  const target = (winner === "A") !== fault ? 1 : 0;
  const trace = [start];
  for (let i = 0; i < 8; i++)
    trace.push(trace[i] - eta * (sigmoid(trace[i]) - target));
  const d = trace[timeline.currentStep];
  const p = sigmoid(d);
  const loss = target ? -Math.log(p) : -Math.log(1 - p);
  const x = (v: number) => 44 + ((v + 5) / 10) * 260;
  const y = (v: number) => 166 - v * 116;
  const curve = Array.from({ length: 101 }, (_, i) => {
    const v = -5 + i / 10;
    return `${x(v)},${y(sigmoid(v))}`;
  }).join(" ");
  const reset = () => {
    timeline.seek(0);
    setStart(-1);
    setEta(0.5);
    setWinner("A");
    setFault(false);
  };
  return (
    <Lab
      kind="bradley-terry-gradient-trajectory"
      title="实验一 · 偏好标签怎样推动奖励差"
    >
      <div className="grid gap-2 sm:grid-cols-2">
        <Slider
          label="初始奖励差 d"
          value={start}
          min={-3}
          max={3}
          step={0.25}
          onChange={setStart}
        />
        <Slider
          label="学习率 η"
          value={eta}
          min={0.1}
          max={1}
          step={0.1}
          onChange={setEta}
        />
      </div>
      <label className="block text-sm">
        真实偏好胜者
        <select
          aria-label="真实偏好胜者"
          className="my-2 block w-full rounded border border-border bg-bg px-3"
          value={winner}
          onChange={(e) => setWinner(e.target.value)}
        >
          <option value="A">A：有依据的回答</option>
          <option value="B">B：简短但缺依据</option>
        </select>
      </label>
      <svg
        viewBox="0 0 330 340"
        className="w-full"
        role="img"
        aria-label="Bradley Terry sigmoid曲线及八次奖励差梯度更新，圆点随时间轴移动"
        style={{ fontSize: 16, fill: C.ink }}
      >
        <text x="44" y="24">
          P(A胜) = sigmoid(d)
        </text>
        <path d="M44 45V166H304" stroke={C.muted} fill="none" />
        {[0, 0.5, 1].map((v) => (
          <text key={v} x="4" y={y(v) + 5}>
            {v}
          </text>
        ))}
        <polyline
          points={curve}
          fill="none"
          stroke={C.accent}
          strokeWidth="3"
        />
        <line
          x1={x(d)}
          x2={x(d)}
          y1={y(p)}
          y2="166"
          stroke={C.warn}
          strokeDasharray="4 4"
        />
        <circle cx={x(d)} cy={y(p)} r="6" fill={C.warn} />
        {[-5, 0, 5].map((v) => (
          <text key={v} x={x(v)} y="189" textAnchor="middle">
            {v}
          </text>
        ))}
        <text x="304" y="210" textAnchor="end">
          奖励差 d
        </text>
        <text x="44" y="235">
          同一标签下的更新轨迹
        </text>
        <path d="M44 246V303H304" stroke={C.muted} fill="none" />
        <polyline
          points={trace
            .map((v, i) => `${44 + i * 32.5},${303 - sigmoid(v) * 52}`)
            .join(" ")}
          fill="none"
          stroke={C.accent}
          strokeWidth="3"
        />
        {trace.map((v, i) => (
          <circle
            key={i}
            cx={44 + i * 32.5}
            cy={303 - sigmoid(v) * 52}
            r={i === timeline.currentStep ? 6 : 3}
            fill={i === timeline.currentStep ? C.warn : C.accent}
          />
        ))}
        <text x="44" y="330">
          0
        </text>
        <text x="304" y="330" textAnchor="end">
          8 次更新
        </text>
      </svg>
      <output
        className="block text-sm leading-7"
        data-result={JSON.stringify({
          d,
          p,
          loss,
          gradient: p - target,
          target,
        })}
      >
        d = {d.toFixed(3)}；P(A胜) = {p.toFixed(3)}；标签 y = {target}；损失 ={" "}
        {loss.toFixed(3)}；梯度 p−y = {(p - target).toFixed(3)}。
      </output>
      <p className="text-sm text-secondary">
        这是直接优化标量 d
        的玩具；若分别优化两个奖励参数，差值更新步长并非这里的
        η。故障会翻转训练标签，真实偏好不变。
      </p>
      <Controls
        timeline={timeline}
        fault={fault}
        setFault={setFault}
        faultName="训练标签颠倒"
        reset={reset}
      />
    </Lab>
  );
}

export function Llm09HumanPreferenceAlignmentComputeTraceLab() {
  const [eps, setEps] = useState(0.2);
  const [beta, setBeta] = useState(1);
  const [sign, setSign] = useState("positive");
  const [fault, setFault] = useState(false);
  const timeline = useClock(ratioSteps);
  const a = sign === "positive" ? 1 : -1;
  const objective = (rho: number) => {
    const raw = rho * a;
    const clipped = Math.max(1 - eps, Math.min(1 + eps, rho)) * a;
    return fault ? Math.max(raw, clipped) : Math.min(raw, clipped);
  };
  const rho = 0.4 + timeline.currentStep * 0.1;
  const x = (v: number) => 44 + ((v - 0.4) / 1.4) * 260;
  const y = (v: number) => 124 - v * 45;
  const q = [0.5, 0.3, 0.2];
  const weights = q.map((v, i) => v * Math.exp(i / beta));
  const z = weights.reduce((s, v) => s + v, 0);
  const policy = weights.map((v) => v / z);
  const point = (p: number[]) => [
    54 * p[0] + 294 * p[1] + 174 * p[2],
    430 * (p[0] + p[1]) + 280 * p[2],
  ];
  const oldPoint = point(q),
    newPoint = point(policy);
  const reset = () => {
    timeline.seek(0);
    setEps(0.2);
    setBeta(1);
    setSign("positive");
    setFault(false);
  };
  return (
    <Lab
      kind="ppo-piecewise-and-gibbs-simplex"
      title="实验二 · clip 折点不等于 KL 约束"
    >
      <div className="grid gap-2 sm:grid-cols-2">
        <Slider
          label="裁剪宽度 ε"
          value={eps}
          min={0.1}
          max={0.4}
          step={0.05}
          onChange={setEps}
        />
        <Slider
          label="KL 系数 β"
          value={beta}
          min={0.3}
          max={3}
          step={0.1}
          onChange={setBeta}
        />
      </div>
      <label className="block text-sm">
        优势 A
        <select
          aria-label="优势 A"
          className="my-2 block w-full rounded border border-border bg-bg px-3"
          value={sign}
          onChange={(e) => setSign(e.target.value)}
        >
          <option value="positive">positive：A = +1</option>
          <option value="negative">negative：A = −1</option>
        </select>
      </label>
      <svg
        viewBox="0 0 330 465"
        className="w-full"
        role="img"
        aria-label="上图为PPO分段目标和裁剪区间，下图为三候选概率单纯形中的参考策略与Gibbs最优策略"
        style={{ fontSize: 16, fill: C.ink }}
      >
        <text x="44" y="23">
          Lclip(ρ)；固定优势 A
        </text>
        <rect
          x={x(1 - eps)}
          y="34"
          width={x(1 + eps) - x(1 - eps)}
          height="178"
          fill={C.accent}
          opacity="0.1"
        />
        <path d="M44 34V214H304M44 124H304" stroke={C.muted} fill="none" />
        <path
          d={`M${x(0.4)} ${y(0.4 * a)}L${x(1.8)} ${y(1.8 * a)}`}
          stroke={C.muted}
          strokeDasharray="5 4"
        />
        <polyline
          points={Array.from({ length: 141 }, (_, i) => {
            const r = 0.4 + i / 100;
            return `${x(r)},${y(objective(r))}`;
          }).join(" ")}
          stroke={fault ? C.warn : C.accent}
          strokeWidth="3"
          fill="none"
        />
        <circle cx={x(rho)} cy={y(objective(rho))} r="6" fill={C.warn} />
        {[0.4, 1, 1.8].map((v) => (
          <text key={v} x={x(v)} y="236" textAnchor="middle">
            {v}
          </text>
        ))}
        <text x="304" y="259" textAnchor="end">
          ρ = π / πold
        </text>
        <text x="4" y="39">
          +2
        </text>
        <text x="4" y="129">
          0
        </text>
        <text x="4" y="219">
          −2
        </text>
        <path d="M54 430L294 430L174 280Z" stroke={C.muted} fill="none" />
        <text x="174" y="274" textAnchor="middle">
          C
        </text>
        <text x="44" y="455">
          A
        </text>
        <text x="294" y="455">
          B
        </text>
        <line
          x1={oldPoint[0]}
          y1={oldPoint[1]}
          x2={newPoint[0]}
          y2={newPoint[1]}
          stroke={C.accent}
          strokeWidth="3"
        />
        <circle
          cx={oldPoint[0]}
          cy={oldPoint[1]}
          r="7"
          fill={C.bg}
          stroke={C.ink}
          strokeWidth="2"
        />
        <circle cx={newPoint[0]} cy={newPoint[1]} r="6" fill={C.accent} />
      </svg>
      <output
        className="block text-sm leading-7"
        data-result={JSON.stringify({
          rho,
          objective: objective(rho),
          policy,
          forward: kl(q, policy),
          reverse: kl(policy, q),
        })}
      >
        ρ={rho.toFixed(1)}；L={objective(rho).toFixed(3)}。空心点
        q=(.5,.3,.2)，实心点 π*=({policy.map((v) => v.toFixed(3)).join(", ")}
        )；奖励=(0,1,2)。D(π*∥q)={kl(policy, q).toFixed(3)}；D(q∥π*)=
        {kl(q, policy).toFixed(3)}。
      </output>
      <p className="text-sm text-secondary">
        下图是独立的 Gibbs 精确解，不是上图一次 PPO 更新的结果。调 β
        移动概率点；调 ε 只移动 clip 折点。故障 max 把悲观下界换成乐观上界。
      </p>
      <Controls
        timeline={timeline}
        fault={fault}
        setFault={setFault}
        faultName="min 错写为 max"
        reset={reset}
      />
    </Lab>
  );
}

const candidates = [
  { id: "A", text: "直接给结论，不说明不确定性", u: 0.9, human: 0.2, ai: 0.35 },
  { id: "B", text: "给依据，同时说明限制", u: 0.65, human: 0.85, ai: 0.75 },
  {
    id: "C",
    text: "只拒绝回答，不提供替代帮助",
    u: 0.3,
    human: 0.95,
    ai: 0.95,
  },
  { id: "D", text: "给简洁步骤，省略部分限制", u: 0.8, human: 0.55, ai: 0.9 },
];
export function Llm09HumanPreferenceAlignmentEvidenceGateLab() {
  const [weight, setWeight] = useState(0.6);
  const [threshold, setThreshold] = useState(0.5);
  const [judge, setJudge] = useState("human");
  const [fault, setFault] = useState(false);
  const timeline = useClock(candidateSteps);
  const rows = candidates.map((c) => {
    const h = judge === "human" ? c.human : c.ai;
    return { ...c, h, score: weight * c.u + (1 - weight) * h };
  });
  const eligible = rows.filter(
    (c, i) => c.h >= threshold && i < timeline.currentStep,
  );
  const best = eligible.reduce<(typeof rows)[number] | null>(
    (a, c) => (!a || c.score > a.score ? c : a),
    null,
  );
  const reset = () => {
    timeline.seek(0);
    setWeight(0.6);
    setThreshold(0.5);
    setJudge("human");
    setFault(false);
  };
  return (
    <Lab
      kind="candidate-pareto-rejection-trace"
      title="实验三 · 分歧下筛选，而不是高分即安全"
    >
      <div className="grid gap-2 sm:grid-cols-2">
        <Slider
          label="效用权重 w"
          value={weight}
          min={0}
          max={1}
          step={0.05}
          onChange={setWeight}
        />
        <Slider
          label="规范硬门 τ"
          value={threshold}
          min={0.1}
          max={1}
          step={0.05}
          onChange={setThreshold}
        />
      </div>
      <label className="block text-sm">
        偏好评审来源
        <select
          aria-label="偏好评审来源"
          className="my-2 block w-full rounded border border-border bg-bg px-3"
          value={judge}
          onChange={(e) => setJudge(e.target.value)}
        >
          <option value="human">human：固定人工评分表</option>
          <option value="ai">ai：固定 AI 评分表</option>
        </select>
      </label>
      <svg
        viewBox="0 0 330 360"
        className="w-full"
        role="img"
        aria-label="候选效用与规范兼容二维散点，水平硬门淘汰低规范候选，直线展示当前赢家的等分线"
        style={{ fontSize: 16, fill: C.ink }}
      >
        <text x="44" y="23">
          规范兼容 h（toy）
        </text>
        <path d="M44 42V280H304" stroke={C.muted} fill="none" />
        <rect
          x="44"
          y={280 - threshold * 230}
          width="260"
          height={threshold * 230}
          fill={C.warn}
          opacity="0.08"
        />
        <line
          x1="44"
          x2="304"
          y1={280 - threshold * 230}
          y2={280 - threshold * 230}
          stroke={C.warn}
          strokeDasharray="5 4"
        />
        <text x="5" y="56">
          1
        </text>
        <text x="5" y="285">
          0
        </text>
        <text x="44" y="305">
          0
        </text>
        <text x="304" y="305" textAnchor="end">
          1
        </text>
        <text x="174" y="326" textAnchor="middle">
          信息效用 u（toy）
        </text>
        {best && weight < 1 && (
          <line
            x1={
              44 +
              Math.max(
                0,
                (best.score - (1 - weight)) / Math.max(weight, 0.001),
              ) *
                260
            }
            y1={280 - Math.min(1, best.score / (1 - weight)) * 230}
            x2={44 + Math.min(1, best.score / Math.max(weight, 0.001)) * 260}
            y2={280 - Math.max(0, (best.score - weight) / (1 - weight)) * 230}
            stroke={C.accent}
            strokeDasharray="3 4"
          />
        )}
        {rows.map((c, i) => (
          <g key={c.id} opacity={i < timeline.currentStep ? 1 : 0.4}>
            <circle
              cx={44 + c.u * 260}
              cy={280 - c.h * 230}
              r={best?.id === c.id ? 9 : 5}
              fill={c.h < threshold ? C.warn : C.accent}
            />
            {c.h < threshold && (
              <path
                d={`M${44 + c.u * 260 - 9} ${280 - c.h * 230 - 9}l18 18m0 -18l-18 18`}
                stroke={C.warn}
              />
            )}
            <text
              x={44 + c.u * 260 - 12}
              y={280 - c.h * 230 - 14}
              textAnchor="end"
            >
              {c.id}
            </text>
          </g>
        ))}
      </svg>
      <div className="space-y-2 text-sm">
        {rows.map((c, i) => (
          <p key={c.id}>
            {c.id} · {c.text}。分数 {c.score.toFixed(3)}；
            {i >= timeline.currentStep
              ? "待审"
              : c.h < threshold
                ? "硬门淘汰"
                : "合格"}
            。
          </p>
        ))}
      </div>
      <output
        className="mt-3 block text-sm leading-7"
        data-result={JSON.stringify({
          best: best?.id ?? null,
          independent: !fault,
          reviewed: timeline.currentStep,
          scores: rows.map((c) => c.score),
        })}
      >
        当前保留：{best?.id ?? "无"}。评估 ID=
        {fault ? "train-01" : "heldout-01"}；
        {fault
          ? "拒绝验收：训练/测试同 ID，不能声称独立泛化"
          : "ID 隔离检查通过，但未测真实人类偏好或安全性"}
        。
      </output>
      <p className="text-sm text-secondary">
        所有评分均为作者设定。切换评审者会改变 D
        的规范分数，并可能翻转赢家；空集必须拒绝选优。这里是有限候选拒绝筛选，不是精确分布采样或真实
        Constitutional AI。
      </p>
      <Controls
        timeline={timeline}
        fault={fault}
        setFault={setFault}
        faultName="训练测试 ID 泄漏"
        reset={reset}
      />
    </Lab>
  );
}
