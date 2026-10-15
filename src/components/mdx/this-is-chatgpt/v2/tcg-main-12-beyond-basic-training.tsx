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
const shell =
  "not-prose my-6 min-w-0 rounded-card border border-border p-3 text-primary [&_button]:min-h-11 [&_button]:min-w-11 [&_button]:focus-visible:outline-2 [&_button]:focus-visible:outline-accent [&_input]:min-h-11 [&_input]:min-w-11";
const control =
  "min-h-11 min-w-11 max-w-full rounded-control border border-border bg-elevated px-3 py-2 text-primary focus-visible:outline-2 focus-visible:outline-accent";
const drawing = {
  width: "100%",
  maxWidth: 440,
  display: "block",
  margin: "0 auto",
  fontSize: 16,
};
const fmt = (n: number) => (Math.abs(n) < 0.0005 ? "0.000" : n.toFixed(3));
// Quantize only SVG serialization: keep model values and X/Y math unrounded.
// A string preserves nine decimals across server/client float-to-string differences.
const svgNumber = (n: number) => n.toFixed(9);
const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));
const BASE = [0.6, 0.3, 0.1];
const HELDOUT = [1, 0.4, -1];

function useFrames(labels: string[]) {
  const fingerprint = labels.join("|");
  const steps = useMemo(
    () => fingerprint.split("|").map((label) => ({ label })),
    [fingerprint],
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
  const { reducedMotion, isPlaying, pause } = timeline;
  useEffect(() => {
    if (reducedMotion && isPlaying) pause();
  }, [reducedMotion, isPlaying, pause]);
  return timeline;
}

function ContextBinding({ reset }: { reset: () => void }) {
  const [binding, setBinding] = useState(1);
  const [windowSize, setWindowSize] = useState(3);
  const [fault, setFault] = useState(false);
  const tl = useFrames([
    "空输入",
    "读绑定",
    "读填充1",
    "读填充2",
    "读填充3",
    "读填充4",
  ]);
  const count = tl.currentStep;
  const start = Math.max(0, count - windowSize);
  const visible = count > 0 && start === 0;
  const feature = visible || (fault && count > 0) ? binding : 0;
  const alpha = Math.log(2); // Fixed toy weights, never trained by this lab.
  const probability = sigmoid(2 * alpha * feature);
  const reference = sigmoid(2 * alpha * (visible ? binding : 0));
  return (
    <section
      className={shell}
      data-visual-kind="bounded-context-binding-window"
      data-fault={fault ? "sticky-context" : "none"}
      data-cursor={count}
      data-playing={tl.isPlaying}
      aria-label="实验一：上下文窗口与固定权重"
    >
      <h3 className="text-lg font-semibold">实验一 · 输入变了，权重没变</h3>
      <div className="my-3 grid gap-3 sm:grid-cols-2">
        <label>
          一次性告知的代号
          <select
            className={`${control} block w-full`}
            aria-label="一次性代号"
            value={binding}
            onChange={(e) => {
              tl.pause();
              setBinding(+e.target.value);
            }}
          >
            <option value={1}>代号是 A</option>
            <option value={-1}>代号是 B</option>
          </select>
        </label>
        <label>
          窗口格数 W = {windowSize}
          <input
            className="mdx-range block w-full"
            aria-label="窗口格数"
            type="range"
            min="2"
            max="4"
            step="1"
            value={windowSize}
            onChange={(e) => {
              tl.pause();
              setWindowSize(+e.target.value);
            }}
          />
        </label>
      </div>
      <button
        className={control}
        data-fault="sticky-context"
        aria-pressed={fault}
        onClick={() => {
          tl.pause();
          setFault(!fault);
        }}
      >
        故障：窗口外仍保留绑定（{fault ? "开" : "关"}）
      </button>
      <svg
        viewBox="0 0 330 360"
        style={drawing}
        role="img"
        aria-label="移动窗口覆盖五格输入；下方概率柱由可见绑定计算，虚线为无故障参考"
      >
        <text x="12" y="27" fill={C.ink}>
          输入位置（· 是无信息填充）
        </text>
        {Array.from({ length: 5 }, (_, i) => {
          const inside = i >= start && i < count;
          return (
            <g key={i}>
              <rect
                x={svgNumber(15 + i * 61)}
                y="49"
                width="55"
                height="58"
                rx="4"
                fill={C.bg}
                stroke={inside ? C.accent : C.line}
                strokeWidth={svgNumber(inside ? 3 : 1)}
                opacity={svgNumber(i < count ? 1 : 0.45)}
              />
              <text
                x={svgNumber(42 + i * 61)}
                y="75"
                textAnchor="middle"
                fill={inside ? C.accent : C.muted}
              >
                {i === 0 ? (binding === 1 ? "A" : "B") : "·"}
              </text>
              <text
                x={svgNumber(42 + i * 61)}
                y="98"
                textAnchor="middle"
                fill={C.muted}
              >
                {i + 1}
              </text>
            </g>
          );
        })}
        <text x="12" y="139" fill={C.ink}>
          α = ln 2 固定；c = {feature}
        </text>
        <text x="12" y="166" fill={C.muted}>
          实柱：当前；虚线：正确窗口规则
        </text>
        {[probability, 1 - probability].map((p, i) => {
          const ref = i === 0 ? reference : 1 - reference;
          return (
            <g key={i}>
              <text x="12" y={svgNumber(207 + i * 62)} fill={C.ink}>
                {i === 0 ? "A" : "B"}
              </text>
              <rect
                x="42"
                y={svgNumber(186 + i * 62)}
                width={svgNumber(220 * p)}
                height="29"
                fill={fault && probability !== reference ? C.warning : C.accent}
              />
              <rect
                x="42"
                y={svgNumber(181 + i * 62)}
                width={svgNumber(220 * ref)}
                height="39"
                fill="none"
                stroke={C.ink}
                strokeDasharray="4 3"
              />
              <text x="278" y={svgNumber(207 + i * 62)} fill={C.ink}>
                {p.toFixed(2)}
              </text>
            </g>
          );
        })}
        <text x="12" y="313" fill={C.ink}>
          {visible
            ? "绑定仍在窗口内"
            : count === 0
              ? "尚未读到绑定"
              : "绑定已离开窗口"}
        </text>
        <text x="12" y="342" fill={C.muted}>
          p(A) = σ(2αc)，并非真实记忆算法
        </text>
      </svg>
      <p className="text-sm" role="status">
        已读 {count} 格；可见区间 {count ? `${start + 1}–${count}` : "空"}。参考
        p(A)={fmt(reference)}，当前 p(A)={fmt(probability)}；权重变化量始终为
        0。
      </p>
      <p className="mt-2 text-sm text-secondary">
        预测第 W+1 格会怎样，再单步到那里。撤销故障应回到
        0.5；这里的遗忘是显式玩具窗口，不是产品记忆或真实模型上下文容量测量。
      </p>
      <TimelineControls
        timeline={tl}
        reset={{ label: "完整重置实验一", onClick: reset }}
      />
    </section>
  );
}

function rewardFit(votes: number, rate: number, reversed: boolean) {
  const target = reversed ? 1 - votes / 4 : votes / 4;
  const path = [0];
  for (let i = 0; i < 8; i++)
    path.push(path[i] + rate * (target - sigmoid(path[i])));
  return { target, path };
}

function PairwiseReward({ reset }: { reset: () => void }) {
  const [votes, setVotes] = useState(3);
  const [rate, setRate] = useState(1);
  const [fault, setFault] = useState(false);
  const tl = useFrames(
    Array.from({ length: 9 }, (_, i) => (i === 0 ? "初始Δ=0" : `拟合${i}`)),
  );
  const fit = rewardFit(votes, rate, fault);
  const reference = rewardFit(votes, rate, false);
  const gap = fit.path[tl.currentStep];
  const p = sigmoid(gap);
  const nll = -(fit.target * Math.log(p) + (1 - fit.target) * Math.log(1 - p));
  const X = (d: number) => 38 + ((d + 3) / 6) * 254;
  const Y = (probability: number) => 325 - probability * 150;
  const logistic = Array.from({ length: 61 }, (_, i) => {
    const d = -3 + i / 10;
    return `${svgNumber(X(d))},${svgNumber(Y(sigmoid(d)))}`;
  }).join(" ");
  return (
    <section
      className={shell}
      data-visual-kind="pairwise-bradley-terry-vote-fit"
      data-fault={fault ? "reverse-pair-labels" : "none"}
      data-cursor={tl.currentStep}
      data-playing={tl.isPlaying}
      aria-label="实验二：成对偏好拟合奖励差"
    >
      <h3 className="text-lg font-semibold">实验二 · 从四张票到奖励差</h3>
      <div className="my-3 grid gap-3 sm:grid-cols-2">
        <label>
          A 获胜的票数（共四票）
          <select
            className={`${control} block w-full`}
            aria-label="A获胜票数"
            value={votes}
            onChange={(e) => {
              tl.pause();
              setVotes(+e.target.value);
            }}
          >
            <option value="1">1 / 4</option>
            <option value="2">2 / 4</option>
            <option value="3">3 / 4</option>
          </select>
        </label>
        <label>
          拟合步长 η = {rate.toFixed(2)}
          <input
            className="mdx-range block w-full"
            aria-label="奖励拟合步长"
            type="range"
            min="0.25"
            max="2"
            step="0.25"
            value={rate}
            onChange={(e) => {
              tl.pause();
              setRate(+e.target.value);
            }}
          />
        </label>
      </div>
      <button
        className={control}
        data-fault="reverse-pair-labels"
        aria-pressed={fault}
        onClick={() => {
          tl.pause();
          setFault(!fault);
        }}
      >
        故障：反转胜负标注（{fault ? "开" : "关"}）
      </button>
      <svg
        viewBox="0 0 330 415"
        style={drawing}
        role="img"
        aria-label="四票的方向、Bradley-Terry概率曲线、经验胜率横线及奖励差拟合轨迹"
      >
        <text x="12" y="27" fill={C.ink}>
          原始票 → 进入训练的胜者
        </text>
        {Array.from({ length: 4 }, (_, i) => {
          const aWins = i < votes;
          const trainedA = fault ? !aWins : aWins;
          return (
            <g key={i}>
              <text
                x={svgNumber(44 + i * 77)}
                y="57"
                textAnchor="middle"
                fill={C.muted}
              >
                {aWins ? "A" : "B"}
              </text>
              <path
                d={`M${svgNumber(44 + i * 77)} 65 v18 m-4 -4 l4 4 l4 -4`}
                fill="none"
                stroke={C.muted}
              />
              <rect
                x={svgNumber(20 + i * 77)}
                y="92"
                width="48"
                height="30"
                fill={trainedA ? C.accent : C.warning}
              />
              <text
                x={svgNumber(44 + i * 77)}
                y="114"
                textAnchor="middle"
                fill={C.bg}
              >
                {trainedA ? "A" : "B"}
              </text>
            </g>
          );
        })}
        <text x="12" y="153" fill={C.ink}>
          p(A胜)；横线为训练胜率
        </text>
        <path d="M38 175 V325 H292" fill="none" stroke={C.line} />
        {[0, 0.5, 1].map((v) => (
          <text key={v} x="7" y={svgNumber(Y(v) + 5)} fill={C.muted}>
            {v}
          </text>
        ))}
        <line
          x1="38"
          x2="292"
          y1={svgNumber(Y(fit.target))}
          y2={svgNumber(Y(fit.target))}
          stroke={C.warning}
          strokeDasharray="5 3"
        />
        <polyline
          points={logistic}
          fill="none"
          stroke={C.ink}
          strokeWidth="2"
        />
        <line
          x1={svgNumber(X(Math.log(fit.target / (1 - fit.target))))}
          x2={svgNumber(X(Math.log(fit.target / (1 - fit.target))))}
          y1="175"
          y2="325"
          stroke={C.muted}
          strokeDasharray="2 4"
        />
        <polyline
          points={fit.path
            .slice(0, tl.currentStep + 1)
            .map((d) => `${svgNumber(X(d))},${svgNumber(Y(sigmoid(d)))}`)
            .join(" ")}
          fill="none"
          stroke={C.accent}
          strokeWidth="4"
        />
        {fit.path.slice(0, tl.currentStep + 1).map((d, i) => (
          <circle
            key={i}
            cx={svgNumber(X(d))}
            cy={svgNumber(Y(sigmoid(d)))}
            r={svgNumber(i === tl.currentStep ? 5 : 3)}
            fill={C.accent}
          />
        ))}
        <circle
          cx={svgNumber(X(reference.path[tl.currentStep]))}
          cy={svgNumber(Y(sigmoid(reference.path[tl.currentStep])))}
          r="8"
          fill="none"
          stroke={C.warning}
          strokeWidth="2"
        />
        {[-3, 0, 3].map((d) => (
          <text
            key={d}
            x={svgNumber(X(d))}
            y="350"
            textAnchor="middle"
            fill={C.muted}
          >
            {d}
          </text>
        ))}
        <text x="12" y="381" fill={C.ink}>
          横轴 Δ = r(A) − r(B)
        </text>
        <text x="12" y="406" fill={C.muted}>
          实点：当前；空心圈：正确标注
        </text>
      </svg>
      <p className="text-sm" role="status">
        训练胜率={fmt(fit.target)}，Δ={fmt(gap)}，p(A胜)={fmt(p)}，平均损失=
        {fmt(nll)}；解析最优 Δ={fmt(Math.log(fit.target / (1 - fit.target)))}。
      </p>
      <p className="mt-2 text-sm text-secondary">
        三票时预测首步 Δ
        的正负；两票时反转会完全抵消。模型只学这组人的比较，不判断候选回答的事实真假；奖励的共同平移也无法由成对数据辨认。
      </p>
      <TimelineControls
        timeline={tl}
        reset={{ label: "完整重置实验二", onClick: reset }}
      />
    </section>
  );
}

function discretePolicy(
  beta: number,
  boost: number,
  strength: number,
  noKL: boolean,
) {
  if (strength === 0) return [...BASE];
  if (noKL) return [0, 0, 1]; // Unique reward maximizer for all exposed inputs.
  const reward = [1, 0, 2 + boost];
  const logits = reward.map(
    (r, i) => Math.log(BASE[i]) + (strength * r) / beta,
  );
  const max = Math.max(...logits);
  const weights = logits.map((l) => Math.exp(l - max));
  const z = weights.reduce((a, b) => a + b, 0);
  return weights.map((w) => w / z);
}
const average = (p: number[], scores: number[]) =>
  p.reduce((s, v, i) => s + v * scores[i], 0);
const divergence = (p: number[]) =>
  p.reduce((s, v, i) => s + (v === 0 ? 0 : v * Math.log(v / BASE[i])), 0);

function PolicyReward({ reset }: { reset: () => void }) {
  const [beta, setBeta] = useState(1);
  const [boost, setBoost] = useState(0);
  const [fault, setFault] = useState(false);
  const tl = useFrames([
    "参考策略",
    "强度0.25",
    "强度0.50",
    "强度0.75",
    "强度1.00",
  ]);
  const reward = [1, 0, 2 + boost];
  const path = Array.from({ length: 5 }, (_, i) =>
    discretePolicy(beta, boost, i / 4, fault),
  );
  const p = path[tl.currentStep];
  const correct = discretePolicy(beta, boost, tl.currentStep / 4, false);
  const X = (i: number) => 40 + i * 63;
  const Y = (score: number) => 490 - (score + 1) * 27;
  return (
    <section
      className={shell}
      data-visual-kind="kl-regularized-policy-reward-fork"
      data-fault={fault ? "remove-kl-penalty" : "none"}
      data-cursor={tl.currentStep}
      data-playing={tl.isPlaying}
      aria-label="实验三：KL约束和代理奖励分岔"
    >
      <h3 className="text-lg font-semibold">实验三 · 高奖励不等于好回答</h3>
      <div className="my-3 grid gap-3 sm:grid-cols-2">
        <label>
          离开参考策略的惩罚 β
          <select
            className={`${control} block w-full`}
            aria-label="KL惩罚系数"
            value={beta}
            onChange={(e) => {
              tl.pause();
              setBeta(+e.target.value);
            }}
          >
            {[2, 1, 0.5, 0.25].map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </label>
        <label>
          错误候选 C 的代理加分 = {boost.toFixed(1)}
          <input
            className="mdx-range block w-full"
            aria-label="错误候选代理加分"
            type="range"
            min="0"
            max="2"
            step="0.5"
            value={boost}
            onChange={(e) => {
              tl.pause();
              setBoost(+e.target.value);
            }}
          />
        </label>
      </div>
      <button
        className={control}
        data-fault="remove-kl-penalty"
        aria-pressed={fault}
        onClick={() => {
          tl.pause();
          setFault(!fault);
        }}
      >
        故障：完全移除 KL 惩罚（{fault ? "开" : "关"}）
      </button>
      <svg
        viewBox="0 0 330 580"
        style={drawing}
        role="img"
        aria-label="三个回答的参考与优化概率柱；下方代理奖励和独立评估随优化强度的分岔曲线"
      >
        <text x="12" y="26" fill={C.ink}>
          柱高 0–1；空框 q，实柱 p
        </text>
        <text x="12" y="52" fill={C.muted}>
          虚框：同参数下保留 KL 的 p
        </text>
        <line x1="26" x2="306" y1="204" y2="204" stroke={C.line} />
        {p.map((value, i) => (
          <g key={i}>
            <rect
              x={svgNumber(39 + i * 94)}
              y={svgNumber(204 - BASE[i] * 120)}
              width="25"
              height={svgNumber(BASE[i] * 120)}
              fill="none"
              stroke={C.muted}
              strokeWidth="2"
            />
            <rect
              x={svgNumber(68 + i * 94)}
              y={svgNumber(204 - value * 120)}
              width="25"
              height={svgNumber(value * 120)}
              fill={i === 2 ? C.warning : C.accent}
            />
            <rect
              x={svgNumber(65 + i * 94)}
              y={svgNumber(204 - correct[i] * 120)}
              width="31"
              height={svgNumber(correct[i] * 120)}
              fill="none"
              stroke={C.ink}
              strokeDasharray="3 3"
            />
            <text
              x={svgNumber(68 + i * 94)}
              y="229"
              textAnchor="middle"
              fill={C.ink}
            >
              {["A实答", "B空泛", "C讨好"][i]}
            </text>
            <text
              x={svgNumber(68 + i * 94)}
              y="253"
              textAnchor="middle"
              fill={C.ink}
            >
              {value.toFixed(3)}
            </text>
          </g>
        ))}
        <text x="12" y="286" fill={C.accent}>
          实线：代理奖励的期望
        </text>
        <text x="12" y="311" fill={C.warning}>
          虚线：独立评估的期望
        </text>
        <path d="M40 345 V490 H292" fill="none" stroke={C.line} />
        {[-1, 0, 2, 4].map((score) => (
          <text key={score} x="12" y={svgNumber(Y(score) + 5)} fill={C.muted}>
            {score}
          </text>
        ))}
        {[reward, HELDOUT].map((scores, j) => (
          <g key={j}>
            <polyline
              points={path
                .slice(0, tl.currentStep + 1)
                .map(
                  (prob, i) =>
                    `${svgNumber(X(i))},${svgNumber(Y(average(prob, scores)))}`,
                )
                .join(" ")}
              fill="none"
              stroke={j === 0 ? C.accent : C.warning}
              strokeWidth="3"
              strokeDasharray={j === 1 ? "5 3" : undefined}
            />
            {path.slice(0, tl.currentStep + 1).map((prob, i) => (
              <circle
                key={i}
                cx={svgNumber(X(i))}
                cy={svgNumber(Y(average(prob, scores)))}
                r="4"
                fill={j === 0 ? C.accent : C.warning}
              />
            ))}
          </g>
        ))}
        {[0, 2, 4].map((i) => (
          <text
            key={i}
            x={svgNumber(X(i))}
            y="517"
            textAnchor="middle"
            fill={C.muted}
          >
            {i / 4}
          </text>
        ))}
        <text x="12" y="546" fill={C.ink}>
          横轴：优化强度 t（不是训练时间）
        </text>
        <text x="12" y="572" fill={C.muted}>
          分数全为自定 toy 刻度，非实测
        </text>
      </svg>
      <p className="text-sm" role="status">
        t={fmt(tl.currentStep / 4)}，KL={fmt(divergence(p))}；代理=
        {fmt(average(p, reward))}，独立评估={fmt(average(p, HELDOUT))}。参考 q
        的独立评估为 0.620。
      </p>
      <p className="mt-2 text-sm text-secondary">
        先猜 β 从 1 降到 0.25 会让哪个柱变高。这里直接求三候选离散最优解，不运行
        PPO、不训练模型，也不测量真实 RLHF 或
        GPU；独立评估是固定构造的反例，不是人类价值真值。
      </p>
      <TimelineControls
        timeline={tl}
        reset={{ label: "完整重置实验三", onClick: reset }}
      />
    </section>
  );
}

// Remounting the entire owned subtree resets every parameter, fault and cursor;
// useTeachingTimeline's unmount cleanup cancels the old animation instance.
export function TcgMain12BeyondBasicTrainingContextContractLab() {
  const [epoch, setEpoch] = useState(0);
  return <ContextBinding key={epoch} reset={() => setEpoch((e) => e + 1)} />;
}
export function TcgMain12BeyondBasicTrainingComputeTraceLab() {
  const [epoch, setEpoch] = useState(0);
  return <PairwiseReward key={epoch} reset={() => setEpoch((e) => e + 1)} />;
}
export function TcgMain12BeyondBasicTrainingEvidenceGateLab() {
  const [epoch, setEpoch] = useState(0);
  return <PolicyReward key={epoch} reset={() => setEpoch((e) => e + 1)} />;
}
