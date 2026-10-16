"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  useTeachingTimeline,
  type BuildTimeline,
  type TeachingTimeline,
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
  "not-prose my-6 min-w-0 rounded-card border border-border p-3 text-primary [&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11 [&_input]:min-w-11 [&_select]:min-h-11 [&_select]:min-w-11";
const control =
  "min-h-11 min-w-11 max-w-full rounded-control border border-border bg-elevated px-3 py-2 text-primary focus-visible:outline-2 focus-visible:outline-accent";
const drawing = {
  display: "block",
  width: "100%",
  maxWidth: 480,
  margin: "12px auto",
  fontSize: 18,
};
// Canonicalize SVG serialization only; never round the finite model's numbers.
const svg9 = (n: number) => n.toFixed(9);
const points9 = (points: number[][]) =>
  points.map(([x, y]) => `${svg9(x)},${svg9(y)}`).join(" ");
const fmt = (n: number) => n.toFixed(4);

function coupledTrace(
  gain: number,
  epsilon: number,
  impulse: number,
  fault: boolean,
) {
  const reference = [0.1];
  const perturbed = [0.1];
  for (let t = 1; t <= 6; t++) {
    reference.push(gain * reference[t - 1] + 0.02);
    const prior = fault ? reference[t - 1] : perturbed[t - 1];
    perturbed.push(gain * prior + 0.02 + (t === impulse ? epsilon : 0));
  }
  return {
    reference,
    perturbed,
    delta: perturbed.map((v, t) => v - reference[t]),
  };
}
function softmax(values: number[]) {
  const max = Math.max(...values);
  const weights = values.map((z) => Math.exp(z - max));
  const sum = weights.reduce((a, b) => a + b, 0);
  return weights.map((w) => w / sum);
}
function invariantState(
  scale: number,
  shift: number,
  fault: boolean,
  frame: number,
) {
  const base = [-1, 0, 1];
  const scaled = base.map((z) => z * (frame >= 1 ? scale : 1));
  const logits = scaled.map(
    (z, i) => z + (frame >= 2 && (!fault || i === 2) ? shift : 0),
  );
  const probabilities = softmax(logits);
  const baseline = softmax(scaled);
  const distance = Math.max(
    ...probabilities.map((p, i) => Math.abs(p - baseline[i])),
  );
  const barycentric = [
    probabilities[0] * 35 + probabilities[1] * 295 + probabilities[2] * 165,
    probabilities[0] * 330 + probabilities[1] * 330 + probabilities[2] * 120,
  ];
  return {
    logits,
    probabilities,
    baseline,
    distance,
    barycentric,
    odds: probabilities[2] / probabilities[1],
  };
}
function machineTrace(memory: number, word: string) {
  let a = 0;
  let b = 0;
  const trace = [{ a, b, outA: 0, outB: 0 }];
  for (const symbol of word) {
    a = symbol === "1" ? 1 : a;
    b = symbol === "1" ? memory : Math.max(0, b - 1);
    trace.push({ a, b, outA: a, outB: Number(b > 0) });
  }
  return trace;
}
function distinguishingState(
  memory: number,
  zeros: number,
  frame: number,
  fault: boolean,
) {
  const word = "1" + "0".repeat(zeros);
  const consumed = Math.max(0, Math.min(word.length, frame - 1));
  const states = machineTrace(memory, word.slice(0, consumed));
  const current = states[states.length - 1];
  return {
    word,
    consumed,
    states,
    current,
    selected: fault ? current.outB : current.outA,
    firstWitnessLength: memory + 1,
  };
}

function useFrames(labels: string[]) {
  const key = labels.join("|");
  const steps = useMemo(
    () => key.split("|").map((label) => ({ label })),
    [key],
  );
  const build = useCallback<BuildTimeline>(
    (tl) => {
      const clock = { frame: 0 };
      steps.forEach((step, i) => tl.label(step.label, i * 800));
      tl.add(
        clock,
        {
          frame: steps.length - 1,
          duration: (steps.length - 1) * 800,
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
function Clock({
  id,
  timeline,
  reset,
}: {
  id: string;
  timeline: TeachingTimeline;
  reset: () => void;
}) {
  return (
    <div data-control={`${id}-timeline`}>
      <TimelineControls timeline={timeline} />
      <button
        className={`${control} mt-3 w-full`}
        data-reset={id}
        onClick={reset}
      >
        完整重置本实验
      </button>
    </div>
  );
}

function Coupling({ reset }: { reset: () => void }) {
  const [gain, setGain] = useState(1.25);
  const [epsilon, setEpsilon] = useState(0.2);
  const [impulse, setImpulse] = useState(2);
  const [fault, setFault] = useState(false);
  const tl = useFrames([
    "共同初值",
    "反馈一步",
    "反馈两步",
    "反馈三步",
    "反馈四步",
    "反馈五步",
    "反馈六步",
  ]);
  const state = coupledTrace(gain, epsilon, impulse, fault);
  const t = tl.currentStep;
  const x = (i: number) => 42 + i * 42;
  const y = (v: number) => 305 - (v + 0.2) * 115;
  return (
    <section
      className={shell}
      data-lab="coupling"
      data-visual-kind="coupled-impulse-recurrence"
      data-fault={fault ? "reference-feedback" : "none"}
      data-cursor={t}
      data-playing={tl.isPlaying}
      aria-label="实验一：单次扰动的反馈耦合轨迹"
    >
      <h3 className="text-lg font-semibold">一次偏差，会不会自己消失？</h3>
      <div className="flex flex-wrap gap-3">
        <label className="flex min-w-0 flex-col gap-1">
          反馈增益 a
          <select
            className={control}
            aria-label="反馈增益"
            data-param="gain"
            data-control="gain"
            value={gain}
            onChange={(e) => {
              tl.pause();
              setGain(Number(e.target.value));
            }}
          >
            <option value={0.5}>0.5：衰减</option>
            <option value={1}>1：保持</option>
            <option value={1.25}>1.25：放大</option>
          </select>
        </label>
        <label className="flex min-w-0 flex-col gap-1">
          扰动 ε = {epsilon}
          <input
            aria-label="扰动幅度"
            data-param="epsilon"
            data-control="epsilon"
            type="range"
            min="0.1"
            max="0.3"
            step="0.1"
            value={epsilon}
            onChange={(e) => {
              tl.pause();
              setEpsilon(Number(e.target.value));
            }}
          />
        </label>
        <label className="flex min-w-0 flex-col gap-1">
          注入步 k = {impulse}
          <input
            aria-label="注入步"
            data-param="impulse"
            data-control="impulse"
            type="range"
            min="1"
            max="3"
            step="1"
            value={impulse}
            onChange={(e) => {
              tl.pause();
              setImpulse(Number(e.target.value));
            }}
          />
        </label>
      </div>
      <button
        className={`${control} mt-3 w-full`}
        data-fault="reference-feedback"
        aria-pressed={fault}
        onClick={() => {
          tl.pause();
          setFault(!fault);
        }}
      >
        故障：每步偷用参考前值（{fault ? "开" : "关"}）
      </button>
      <svg
        viewBox="0 0 330 370"
        style={drawing}
        role="img"
        aria-label="横轴0到6步，纵轴状态值；实线参考、虚线扰动，竖线表示同一步偏差"
      >
        <text x="14" y="23" fill={C.ink}>
          实线：参考　虚线：扰动
        </text>
        <text x="14" y="47" fill={C.muted}>
          固定纵轴 −0.2 至 2
        </text>
        <line x1="42" y1="305" x2="300" y2="305" stroke={C.line} />
        <line x1="42" y1="52" x2="42" y2="305" stroke={C.line} />
        {[-0.2, 0, 1, 2].map((v) => (
          <text key={v} x="2" y={svg9(y(v) + 5)} fill={C.muted}>
            {v}
          </text>
        ))}
        {state.delta.slice(0, t + 1).map((d, i) => (
          <g key={i}>
            <line
              x1={svg9(x(i))}
              x2={svg9(x(i))}
              y1={svg9(y(state.reference[i]))}
              y2={svg9(y(state.perturbed[i]))}
              stroke={C.warning}
              strokeDasharray="3 3"
            />
            <text x={svg9(x(i))} y="331" textAnchor="middle" fill={C.ink}>
              {i}
            </text>
            <circle
              cx={svg9(x(i))}
              cy={svg9(y(state.perturbed[i]))}
              r="4"
              fill={C.warning}
            />
          </g>
        ))}
        <polyline
          points={points9(
            state.reference.slice(0, t + 1).map((v, i) => [x(i), y(v)]),
          )}
          fill="none"
          stroke={C.accent}
          strokeWidth="3"
        />
        <polyline
          points={points9(
            state.perturbed.slice(0, t + 1).map((v, i) => [x(i), y(v)]),
          )}
          fill="none"
          stroke={C.warning}
          strokeWidth="3"
          strokeDasharray="7 4"
        />
        <line
          x1={svg9(x(impulse))}
          x2={svg9(x(impulse))}
          y1="65"
          y2="305"
          stroke={C.muted}
          strokeDasharray="2 5"
        />
        <text x="55" y="362" fill={C.ink}>
          k = {impulse}，当前 t = {t}
        </text>
      </svg>
      <p
        className="break-words"
        data-readout="coupling"
        data-reference={state.reference[t]}
        data-perturbed={state.perturbed[t]}
        data-delta={state.delta[t]}
      >
        r = {fmt(state.reference[t])}；s = {fmt(state.perturbed[t])}；δ ={" "}
        {fmt(state.delta[t])}。
        {t < impulse
          ? "尚未注入。"
          : fault
            ? "故障断开了扰动反馈；下一步借用参考值。"
            : "每步使用自己的上一状态。"}
      </p>
      <p className="text-sm text-secondary">
        橙色竖线是状态差，不是概率或真实 token
        错误率。有限标量替身，无真实模型调用。
      </p>
      <Clock id="coupling" timeline={tl} reset={reset} />
    </section>
  );
}

function Invariance({ reset }: { reset: () => void }) {
  const [scale, setScale] = useState(1);
  const [shift, setShift] = useState(2);
  const [fault, setFault] = useState(false);
  const tl = useFrames(["原分数", "共同缩放", "添加平移", "比较概率"]);
  const state = invariantState(scale, shift, fault, tl.currentStep);
  const baseX =
    state.baseline[0] * 35 + state.baseline[1] * 295 + state.baseline[2] * 165;
  const baseY =
    state.baseline[0] * 330 + state.baseline[1] * 330 + state.baseline[2] * 120;
  return (
    <section
      className={shell}
      data-lab="invariance"
      data-visual-kind="softmax-translation-simplex-orbit"
      data-fault={fault ? "single-logit-shift" : "none"}
      data-cursor={tl.currentStep}
      data-playing={tl.isPlaying}
      aria-label="实验二：共同平移不变量与缩放对照"
    >
      <h3 className="text-lg font-semibold">移动分数，不一定移动概率</h3>
      <div className="flex flex-wrap gap-3">
        <label className="flex min-w-0 flex-col gap-1">
          共同尺度 s
          <select
            className={control}
            aria-label="共同尺度"
            data-param="scale"
            data-control="scale"
            value={scale}
            onChange={(e) => {
              tl.pause();
              setScale(Number(e.target.value));
            }}
          >
            <option value={0.5}>0.5</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
          </select>
        </label>
        <label className="flex min-w-0 flex-col gap-1">
          共同平移 c = {shift}
          <input
            aria-label="共同平移"
            data-param="shift"
            data-control="shift"
            type="range"
            min="-4"
            max="4"
            step="2"
            value={shift}
            onChange={(e) => {
              tl.pause();
              setShift(Number(e.target.value));
            }}
          />
        </label>
      </div>
      <button
        className={`${control} mt-3 w-full`}
        data-fault="single-logit-shift"
        aria-pressed={fault}
        onClick={() => {
          tl.pause();
          setFault(!fault);
        }}
      >
        故障：仅平移第三项（{fault ? "开" : "关"}）
      </button>
      <svg
        viewBox="0 0 330 390"
        style={drawing}
        role="img"
        aria-label="上方三行分数位置，下方三角形中概率重心；空心圆是平移前，实心点是平移后"
      >
        {state.logits.map((z, i) => (
          <g key={i}>
            <text x="8" y={svg9(24 + i * 27)} fill={C.ink}>
              z{i + 1}
            </text>
            <line
              x1="60"
              x2="306"
              y1={svg9(18 + i * 27)}
              y2={svg9(18 + i * 27)}
              stroke={C.line}
            />
            <line
              x1="183"
              x2="183"
              y1={svg9(11 + i * 27)}
              y2={svg9(25 + i * 27)}
              stroke={C.muted}
            />
            <circle
              cx={svg9(183 + z * 19)}
              cy={svg9(18 + i * 27)}
              r="5"
              fill={fault && i === 2 ? C.warning : C.accent}
            />
          </g>
        ))}
        <text x="60" y="105" fill={C.muted}>
          −6　　　　0　　　　6
        </text>
        <polygon
          points="35,330 295,330 165,120"
          fill="none"
          stroke={C.line}
          strokeWidth="2"
        />
        <line
          x1="165"
          y1="120"
          x2="165"
          y2="330"
          stroke={C.line}
          strokeDasharray="3 5"
        />
        <text x="8" y="358" fill={C.ink}>
          p1 = 1
        </text>
        <text x="239" y="358" fill={C.ink}>
          p2 = 1
        </text>
        <text x="172" y="140" fill={C.ink}>
          p3 = 1
        </text>
        <circle
          cx={svg9(baseX)}
          cy={svg9(baseY)}
          r="10"
          fill="none"
          stroke={C.accent}
          strokeWidth="2"
        />
        <line
          x1={svg9(baseX)}
          y1={svg9(baseY)}
          x2={svg9(state.barycentric[0])}
          y2={svg9(state.barycentric[1])}
          stroke={C.warning}
          strokeDasharray="4 3"
        />
        <circle
          cx={svg9(state.barycentric[0])}
          cy={svg9(state.barycentric[1])}
          r="5"
          fill={fault ? C.warning : C.accent}
        />
        <text x="12" y="385" fill={C.muted}>
          空圈：平移前　点：平移后
        </text>
      </svg>
      <p
        className="break-words"
        data-readout="invariance"
        data-p1={state.probabilities[0]}
        data-p2={state.probabilities[1]}
        data-p3={state.probabilities[2]}
        data-distance={state.distance}
        data-odds={state.odds}
      >
        p = [{state.probabilities.map(fmt).join(", ")}]；最大分量差{" "}
        {fmt(state.distance)}；p3/p2 = {fmt(state.odds)}。
      </p>
      <p className="text-sm text-secondary">
        重心越靠近某顶点，该项概率越大。不是嵌入投影，也没有随机抽样；分数只用于这个三项夹具。
      </p>
      <Clock id="invariance" timeline={tl} reset={reset} />
    </section>
  );
}

function Identifiability({ reset }: { reset: () => void }) {
  const [memory, setMemory] = useState(2);
  const [zeros, setZeros] = useState(2);
  const [fault, setFault] = useState(false);
  const tl = useFrames([
    "相同样本输出",
    "重置空串",
    "读入1",
    "读入第1个0",
    "读入第2个0",
    "读入第3个0",
    "读入第4个0",
  ]);
  const state = distinguishingState(memory, zeros, tl.currentStep, fault);
  const machineY = (q: number) => 250 - q * 44;
  const currentB = machineY(state.current.b);
  const ready = tl.currentStep >= 1;
  return (
    <section
      className={shell}
      data-lab="identifiability"
      data-visual-kind="finite-word-distinguishing-automata"
      data-fault={fault ? "sample-equivalence-substitution" : "none"}
      data-cursor={tl.currentStep}
      data-playing={tl.isPlaying}
      aria-label="实验三：样本相同的有限状态机能否互换"
    >
      <h3 className="text-lg font-semibold">相同样本，不同记忆规则</h3>
      <div className="flex flex-wrap gap-3">
        <label className="flex min-w-0 flex-col gap-1">
          B 的记忆 L = {memory}
          <input
            aria-label="记忆长度"
            data-param="memory"
            data-control="memory"
            type="range"
            min="1"
            max="3"
            step="1"
            value={memory}
            onChange={(e) => {
              tl.pause();
              setMemory(Number(e.target.value));
            }}
          />
        </label>
        <label className="flex min-w-0 flex-col gap-1">
          探测零数 g = {zeros}
          <input
            aria-label="探测零数"
            data-param="zeros"
            data-control="zeros"
            type="range"
            min="1"
            max="4"
            step="1"
            value={zeros}
            onChange={(e) => {
              tl.pause();
              setZeros(Number(e.target.value));
            }}
          />
        </label>
      </div>
      <button
        className={`${control} mt-3 w-full`}
        data-fault="sample-equivalence-substitution"
        aria-pressed={fault}
        onClick={() => {
          tl.pause();
          setFault(!fault);
        }}
      >
        故障：样本相同就以 B 代 A（{fault ? "开" : "关"}）
      </button>
      <svg
        viewBox="0 0 330 430"
        style={drawing}
        role="img"
        aria-label="A的吸收态和B的记忆倒计时态，实线0递减，虚线1复位，底部探测串逐字读取"
      >
        <text x="8" y="24" fill={C.ink}>
          样本 0 / 1 / 11
        </text>
        <text x="8" y="48" fill={C.muted}>
          A 与 B 都输出 0 / 1 / 1
        </text>
        <text x="18" y="81" fill={C.accent}>
          A：见过1
        </text>
        <text x="160" y="81" fill={C.warning}>
          B：剩余记忆
        </text>
        <line
          x1="66"
          y1="250"
          x2="66"
          y2="206"
          stroke={C.accent}
          strokeWidth="3"
        />
        <text x="21" y="232" fill={C.ink}>
          1↑
        </text>
        <path
          d="M 49 195 C 10 152 113 152 84 195"
          fill="none"
          stroke={C.accent}
          strokeWidth="2"
        />
        <text x="28" y="152" fill={C.ink}>
          0,1↻
        </text>
        {[0, 1].map((q) => (
          <g key={q}>
            <circle
              cx="66"
              cy={svg9(machineY(q))}
              r="18"
              fill={ready && state.current.a === q ? C.accent : C.bg}
              stroke={C.ink}
            />
            <text
              x="66"
              y={svg9(machineY(q) + 6)}
              textAnchor="middle"
              fill={ready && state.current.a === q ? C.bg : C.ink}
            >
              {q}
            </text>
          </g>
        ))}
        {Array.from({ length: memory + 1 }, (_, q) => (
          <g key={q}>
            {q > 0 && (
              <>
                <line
                  x1="210"
                  x2="210"
                  y1={svg9(machineY(q) + 17)}
                  y2={svg9(machineY(q - 1) - 17)}
                  stroke={C.warning}
                  strokeWidth="3"
                />
                <text x="218" y={svg9(machineY(q) + 30)} fill={C.muted}>
                  0↓
                </text>
              </>
            )}
            <circle
              cx="210"
              cy={svg9(machineY(q))}
              r="17"
              fill={ready && state.current.b === q ? C.warning : C.bg}
              stroke={C.ink}
            />
            <text
              x="210"
              y={svg9(machineY(q) + 6)}
              textAnchor="middle"
              fill={ready && state.current.b === q ? C.bg : C.ink}
            >
              {q}
            </text>
          </g>
        ))}
        <path
          d={`M ${svg9(230)} ${svg9(currentB)} C ${svg9(298)} ${svg9(currentB)} ${svg9(298)} ${svg9(machineY(memory))} ${svg9(230)} ${svg9(machineY(memory))}`}
          fill="none"
          stroke={C.warning}
          strokeDasharray="5 4"
        />
        <text x="278" y="178" fill={C.muted}>
          1↶
        </text>
        <path
          d={`M ${svg9(fault ? 210 : 66)} ${svg9(fault ? currentB + 18 : machineY(state.current.a) + 18)} L ${svg9(165)} ${svg9(301)}`}
          fill="none"
          stroke={fault ? C.warning : C.accent}
          strokeWidth="3"
        />
        <text x="8" y="326" fill={C.ink}>
          采用 {fault ? "B" : "A"}：{ready ? state.selected : "等待"}
        </text>
        {[...state.word].map((symbol, i) => (
          <g key={i}>
            <rect
              x={svg9(38 + i * 53)}
              y="347"
              width="42"
              height="42"
              fill={i < state.consumed ? C.accent : C.bg}
              stroke={C.ink}
            />
            <text
              x={svg9(59 + i * 53)}
              y="375"
              textAnchor="middle"
              fill={i < state.consumed ? C.bg : C.ink}
            >
              {symbol}
            </text>
          </g>
        ))}
        <text x="8" y="418" fill={C.muted}>
          0实线递减；1虚线复位
        </text>
      </svg>
      <p
        className="break-words"
        data-readout="identifiability"
        data-word={state.word}
        data-consumed={state.consumed}
        data-out-a={state.current.outA}
        data-out-b={state.current.outB}
        data-selected={ready ? state.selected : "pending"}
        data-distinguished={state.current.outA !== state.current.outB}
      >
        已读 {state.consumed}/{state.word.length}；A = {state.current.outA}；B ={" "}
        {state.current.outB}。
        {state.current.outA !== state.current.outB
          ? "此输入区分了两条规则。"
          : "目前输出相同；不是全输入等价证明。"}
      </p>
      <p className="text-sm text-secondary">
        A 的任务定义是“是否曾出现1”。B 在读到 L
        个连续0后归零。两者规则预先给定，没有训练拟合；这是状态机反例，不是模型准确率测量。
      </p>
      <Clock id="identifiability" timeline={tl} reset={reset} />
    </section>
  );
}

export function TcgOfficialFinalReviewContextContractLab() {
  const [epoch, setEpoch] = useState(0);
  return <Coupling key={epoch} reset={() => setEpoch((n) => n + 1)} />;
}
export function TcgOfficialFinalReviewComputeTraceLab() {
  const [epoch, setEpoch] = useState(0);
  return <Invariance key={epoch} reset={() => setEpoch((n) => n + 1)} />;
}
export function TcgOfficialFinalReviewEvidenceGateLab() {
  const [epoch, setEpoch] = useState(0);
  return <Identifiability key={epoch} reset={() => setEpoch((n) => n + 1)} />;
}
