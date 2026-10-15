"use client";

import { useState } from "react";
import { useTeachingTimeline } from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

const accent = "var(--accent)";
const neutral = "var(--text-secondary)";
const border = "var(--border)";
const panel =
  "not-prose my-8 rounded-xl border border-border p-3 text-primary [&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11 [&_select]:min-h-11 [&_svg]:w-full [&_svg]:h-auto";
const control =
  "block w-full rounded border border-border bg-background px-2 text-primary";
const pairSteps = [
  { label: "初始权重" },
  { label: "一次梯度" },
  { label: "两次梯度" },
  { label: "三次梯度" },
];
const creditSteps = [
  { label: "扣除KL" },
  { label: "计算TD" },
  { label: "逆推优势" },
];
const clipSteps = [
  { label: "未截断" },
  { label: "clip分支" },
  { label: "取较小值" },
];

function useArithmeticTimeline(steps: { label: string }[]) {
  return useTeachingTimeline({
    steps,
    build: (tl) => {
      const clock = { value: 0 };
      steps.forEach((step, i) => {
        tl.label(step.label, i * 900);
        tl.add(clock, { value: i + 1, duration: 900, ease: "linear" }, i * 900);
      });
    },
  });
}

function preferenceTrace(lengthWeight: number, reversed: boolean) {
  // Features: factual correctness and normalized length, not model embeddings.
  let w = [0, lengthWeight];
  const d = [1, -1]; // chosen [1,0], rejected [0,1]
  const trace = [];
  for (let i = 0; i < 4; i++) {
    const margin = w[0] - w[1];
    trace.push({
      chosen: w[0],
      rejected: w[1],
      loss: Math.log1p(Math.exp(-margin)),
      probability: 1 / (1 + Math.exp(-margin)),
    });
    const sign = reversed ? -1 : 1;
    const gradient = sign / (1 + Math.exp(sign * margin));
    w = w.map((value, k) => value + 0.5 * gradient * d[k]);
  }
  return trace;
}

export function Lsl06ReinforcementLearningContextContractLab() {
  const [lengthWeight, setLengthWeight] = useState(0);
  const [reversed, setReversed] = useState(false);
  const timeline = useArithmeticTimeline(pairSteps);
  const trace = preferenceTrace(lengthWeight, reversed);
  const row = trace[timeline.currentStep];
  const reset = () => {
    setLengthWeight(0);
    setReversed(false);
    timeline.goToStep(0);
  };
  return (
    <section
      className={panel}
      aria-label="偏好对奖励实验"
      data-lab="preference"
      data-visual-kind="preference-reward-gradient"
    >
      <h3 className="text-lg font-semibold">同一提示，两个回复，一个偏好</h3>
      <p>
        提示：水在标准大气压下的沸点？chosen：100℃；rejected：详细地说，是90℃。特征只编码正确性与长度，不是实测语言模型。
      </p>
      <label>
        初始长度权重
        <select
          className={control}
          aria-label="初始长度权重"
          value={lengthWeight}
          onChange={(e) => {
            setLengthWeight(Number(e.target.value));
            timeline.goToStep(0);
          }}
        >
          <option value="0">中性 0</option>
          <option value="1">长文偏好 1</option>
          <option value="-1">短文偏好 -1</option>
        </select>
      </label>
      <button
        className="my-2 rounded border border-border px-3"
        aria-pressed={reversed}
        onClick={() => setReversed(!reversed)}
      >
        故障：翻转偏好标签
      </button>
      <svg
        viewBox="0 0 330 365"
        role="img"
        aria-label="奖励双柱和真实偏好损失轨迹"
        style={{ fontSize: 16, fill: neutral }}
      >
        <text x="12" y="23">
          奖励分数（零点任意）
        </text>
        <line x1="30" x2="304" y1="126" y2="126" stroke={border} />
        {[row.chosen, row.rejected].map((value, i) => (
          <g key={i}>
            <rect
              x={65 + i * 150}
              y={value >= 0 ? 126 - value * 35 : 126}
              width="45"
              height={Math.max(2, Math.abs(value) * 35)}
              fill={i === 0 ? accent : neutral}
              opacity="0.7"
            />
            <text x={88 + i * 150} y="43" textAnchor="middle">
              {value.toFixed(3)}
            </text>
            <text x={88 + i * 150} y="181" textAnchor="middle">
              {i === 0 ? "chosen" : "rejected"}
            </text>
          </g>
        ))}
        <text x="12" y="216">
          对真实偏好的损失 L
        </text>
        <line x1="40" x2="300" y1="324" y2="324" stroke={border} />
        <polyline
          points={trace
            .map((r, i) => `${45 + i * 80},${320 - r.loss * 22}`)
            .join(" ")}
          fill="none"
          stroke={accent}
          strokeWidth="3"
        />
        {trace.map((r, i) => (
          <g key={i}>
            <circle
              cx={45 + i * 80}
              cy={320 - r.loss * 22}
              r={i === timeline.currentStep ? 7 : 4}
              fill={accent}
            />
            <text x={45 + i * 80} y="350" textAnchor="middle">
              {i}步
            </text>
          </g>
        ))}
      </svg>
      <output className="block" data-result>
        真实 P(chosen)={row.probability.toFixed(4)}；L={row.loss.toFixed(4)}。
        {reversed
          ? "翻标后训练朝相反方向走，真实偏好损失上升。"
          : "正确标签使分差扩大、损失下降。"}
      </output>
      <p>
        柱高是 r=w·f，曲线是 −log
        σ(r_chosen−r_rejected)。每步学习率0.5；概率仅表示这一对的相对偏好，不是事实正确率。
      </p>
      <TimelineControls
        timeline={timeline}
        reset={{ label: "重置偏好实验", onClick: reset }}
      />
    </section>
  );
}

function tokenCredit(beta: number, lambda: number, badTerminal: boolean) {
  const logRatio = [0.2, -0.1, 0.4];
  const values = [0.3, 0.4, 0.2, badTerminal ? 0.5 : 0];
  const rewards = logRatio.map((k, i) => (i === 2 ? 1 : 0) - beta * k);
  const delta = rewards.map((r, i) => r + values[i + 1] - values[i]);
  const advantage = [0, 0, 0];
  let tail = 0;
  for (let i = 2; i >= 0; i--) {
    tail = delta[i] + lambda * tail;
    advantage[i] = tail;
  }
  return { logRatio, rewards, delta, advantage };
}

export function Lsl06ReinforcementLearningComputeTraceLab() {
  const [beta, setBeta] = useState(0.2);
  const [lambda, setLambda] = useState(0.8);
  const [badTerminal, setBadTerminal] = useState(false);
  const timeline = useArithmeticTimeline(creditSteps);
  const row = tokenCredit(beta, lambda, badTerminal);
  const reset = () => {
    setBeta(0.2);
    setLambda(0.8);
    setBadTerminal(false);
    timeline.goToStep(0);
  };
  const rows = [
    { name: "log比", values: row.logRatio, visible: true },
    { name: "奖励r", values: row.rewards, visible: true },
    { name: "TD δ", values: row.delta, visible: timeline.currentStep >= 1 },
    {
      name: "优势A",
      values: row.advantage,
      visible: timeline.currentStep >= 2,
    },
  ];
  return (
    <section
      className={panel}
      aria-label="词元信用账本"
      data-lab="credit"
      data-visual-kind="token-credit-ledger"
    >
      <h3 className="text-lg font-semibold">终点奖励怎样回到前面的 token？</h3>
      <p>
        固定三步回复“水 / 100 /
        ℃”，γ=1；只在终点给奖励1。V=[0.3,0.4,0.2,0]。log比来自采样策略与冻结参考，不是PPO新旧策略比。
      </p>
      <div className="grid grid-cols-2 gap-2">
        <label>
          KL系数 β
          <select
            className={control}
            aria-label="KL系数"
            value={beta}
            onChange={(e) => setBeta(Number(e.target.value))}
          >
            <option value="0.2">标准 0.2</option>
            <option value="0">关闭 0</option>
            <option value="0.5">加强 0.5</option>
          </select>
        </label>
        <label>
          GAE系数 λ
          <select
            className={control}
            aria-label="GAE系数"
            value={lambda}
            onChange={(e) => setLambda(Number(e.target.value))}
          >
            <option value="0.8">折中 0.8</option>
            <option value="0">单步 0</option>
            <option value="1">全程 1</option>
          </select>
        </label>
      </div>
      <button
        className="my-2 rounded border border-border px-3"
        aria-pressed={badTerminal}
        onClick={() => setBadTerminal(!badTerminal)}
      >
        故障：终止后仍引导 V=0.5
      </button>
      <svg
        viewBox="0 0 330 365"
        role="img"
        aria-label="KL奖励、TD误差、逆向GAE计算表"
        style={{ fontSize: 16, fill: neutral }}
      >
        {["水", "100", "℃"].map((t, i) => (
          <text key={t} x={115 + i * 80} y="30" textAnchor="middle">
            {t}
          </text>
        ))}
        {rows.map((r, j) => (
          <g key={r.name} opacity={r.visible ? 1 : 0.3}>
            <text x="8" y={90 + j * 61}>
              {r.name}
            </text>
            {r.values.map((v, i) => (
              <g key={i}>
                <rect
                  x={79 + i * 80}
                  y={59 + j * 61}
                  width="72"
                  height="47"
                  rx="4"
                  fill={accent}
                  opacity={
                    r.visible ? Math.min(0.65, 0.1 + Math.abs(v) * 0.3) : 0.05
                  }
                />
                <text x={115 + i * 80} y={89 + j * 61} textAnchor="middle">
                  {r.visible ? v.toFixed(2) : "待算"}
                </text>
              </g>
            ))}
          </g>
        ))}
        {timeline.currentStep === 2 && (
          <g>
            <path
              d="M 275 313 L 115 313 M 123 306 L 115 313 L 123 320"
              fill="none"
              stroke={accent}
              strokeWidth="3"
            />
            <text x="165" y="351" textAnchor="middle">
              Aₜ = δₜ + λ Aₜ₊₁
            </text>
          </g>
        )}
      </svg>
      <output className="block" data-result>
        A=[{row.advantage.map((a) => a.toFixed(4)).join(", ")}]；
        {badTerminal
          ? "错误终点值把不存在的未来奖励传回所有token。"
          : "终止状态不bootstrap。"}
      </output>
      <p>
        负的单样本log比可以带来正的奖励修正；只有对策略分布取期望后才是非负KL。此处不把每格称作非负散度。
      </p>
      <TimelineControls
        timeline={timeline}
        reset={{ label: "重置信用实验", onClick: reset }}
      />
    </section>
  );
}

function clippedObjective(ratio: number, advantage: number, epsilon: number) {
  return Math.min(
    ratio * advantage,
    Math.max(1 - epsilon, Math.min(1 + epsilon, ratio)) * advantage,
  );
}

export function Lsl06ReinforcementLearningEvidenceGateLab() {
  const [advantage, setAdvantage] = useState(1);
  const [ratio, setRatio] = useState(1.4);
  const [epsilon, setEpsilon] = useState(0.2);
  const [omitMin, setOmitMin] = useState(false);
  const timeline = useArithmeticTimeline(clipSteps);
  const reset = () => {
    setAdvantage(1);
    setRatio(1.4);
    setEpsilon(0.2);
    setOmitMin(false);
    timeline.goToStep(0);
  };
  const x = (r: number) => 44 + (r - 0.4) * 190;
  const y = (v: number) => 170 - v * 65;
  const clipped = (r: number) =>
    Math.max(1 - epsilon, Math.min(1 + epsilon, r)) * advantage;
  const objective = (r: number) =>
    omitMin ? clipped(r) : clippedObjective(r, advantage, epsilon);
  const displayed = (r: number) =>
    timeline.currentStep === 0
      ? r * advantage
      : timeline.currentStep === 1
        ? clipped(r)
        : objective(r);
  const curve = Array.from({ length: 61 }, (_, i) => {
    const r = 0.4 + i * 0.02;
    return `${x(r)},${y(displayed(r))}`;
  }).join(" ");
  return (
    <section
      className={panel}
      aria-label="PPO截断目标"
      data-lab="ppo"
      data-visual-kind="ppo-clipped-objective"
    >
      <h3 className="text-lg font-semibold">clip不是把所有更新都锁进区间</h3>
      <div className="grid grid-cols-2 gap-2">
        <label>
          优势符号
          <select
            className={control}
            aria-label="优势符号"
            value={advantage}
            onChange={(e) => setAdvantage(Number(e.target.value))}
          >
            <option value="1">正优势 +1</option>
            <option value="-1">负优势 -1</option>
          </select>
        </label>
        <label>
          截断宽度 ε
          <select
            className={control}
            aria-label="截断宽度"
            value={epsilon}
            onChange={(e) => setEpsilon(Number(e.target.value))}
          >
            <option value="0.2">常用 0.2</option>
            <option value="0.1">窄区间 0.1</option>
            <option value="0.3">宽区间 0.3</option>
          </select>
        </label>
      </div>
      <label className="mt-2 block">
        新旧策略比 ρ={ratio.toFixed(2)}
        <input
          className="w-full"
          type="range"
          min="0.4"
          max="1.6"
          step="0.02"
          aria-label="新旧策略比"
          value={ratio}
          onChange={(e) => setRatio(Number(e.target.value))}
        />
      </label>
      <button
        className="my-2 rounded border border-border px-3"
        aria-pressed={omitMin}
        onClick={() => setOmitMin(!omitMin)}
      >
        故障：仅clip，漏掉min
      </button>
      <svg
        viewBox="0 0 330 365"
        role="img"
        aria-label="横轴策略比、纵轴PPO最大化目标；优势决定平台方向"
        style={{ fontSize: 16, fill: neutral }}
      >
        <text x="12" y="23">
          目标 J（最大化）
        </text>
        <rect
          x={x(1 - epsilon)}
          y="48"
          width={x(1 + epsilon) - x(1 - epsilon)}
          height="240"
          fill={accent}
          opacity="0.09"
        />
        <path d="M44 48 V300 H300 M44 170 H300" stroke={border} fill="none" />
        {[-1, 0, 1].map((v) => (
          <text key={v} x="33" y={y(v) + 5} textAnchor="end">
            {v}
          </text>
        ))}
        <path
          d={`M${x(0.4)} ${y(0.4 * advantage)} L${x(1.6)} ${y(1.6 * advantage)}`}
          fill="none"
          stroke={neutral}
          strokeDasharray="5 5"
        />
        <polyline points={curve} fill="none" stroke={accent} strokeWidth="3" />
        <circle cx={x(ratio)} cy={y(displayed(ratio))} r="7" fill={accent} />
        {[0.4, 1, 1.6].map((r) => (
          <text key={r} x={x(r)} y="326" textAnchor="middle">
            {r}
          </text>
        ))}
        <text x="165" y="353" textAnchor="middle">
          ρ = π新 / π旧
        </text>
      </svg>
      <output className="block" data-result>
        ρA={(ratio * advantage).toFixed(3)}；clip(ρ)A=
        {clipped(ratio).toFixed(3)}；正确 J=
        {clippedObjective(ratio, advantage, epsilon).toFixed(3)}；当前图=
        {displayed(ratio).toFixed(3)}
      </output>
      <p>
        虚线：ρA；浅带：[1−ε,1+ε]。先预测：A=−1且ρ=1.4时，正确目标是−1.4而非−1.2。
        {omitMin
          ? "故障把坏方向的惩罚也截平；推进到第三步比较。"
          : "正优势右侧截平，负优势左侧截平；不利方向仍受惩罚。"}
      </p>
      <TimelineControls
        timeline={timeline}
        reset={{ label: "重置PPO实验", onClick: reset }}
      />
    </section>
  );
}
