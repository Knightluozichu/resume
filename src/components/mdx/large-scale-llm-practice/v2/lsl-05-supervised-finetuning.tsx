"use client";

import { useMemo, useState } from "react";
import { useTeachingTimeline } from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

const C = {
  ink: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
  border: "var(--border)",
  bg: "var(--bg-elevated)",
  danger: "var(--danger, var(--text-primary))",
};
const labClass =
  "not-prose my-6 rounded-xl border border-border p-3 text-sm text-primary [&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11 [&_select]:min-h-11 [&_select]:max-w-full";
const controlClass =
  "block w-full rounded border border-border bg-transparent px-2 text-primary";
function useLesson(labels: string[]) {
  const steps = useMemo(() => labels.map((label) => ({ label })), [labels]);
  return useTeachingTimeline({
    steps,
    build: (tl) => {
      const clock = { t: 0 };
      labels.forEach((label, i) => tl.label(label, i * 1000));
      tl.add(
        clock,
        { t: 1, duration: labels.length * 1000, ease: "linear" },
        0,
      );
    },
  });
}
const sequenceSteps = ["序列化", "补齐与截断", "标签与右移", "归约有效目标"];
const rankSteps = ["初始化 B=0", "第一列外积", "第二列外积", "合并权重"];
const updateSteps = [
  "初始参数",
  "更新一次",
  "更新两次",
  "更新三次",
  "更新四次",
  "更新五次",
];

// Deliberately small, explicit tokenizer. No claim of matching a model chat template.
const vocabulary = [
  "PAD",
  "BOS",
  "USER",
  "ASST",
  "EOS",
  "求和",
  "1",
  "2",
  "3",
  "请",
  "先",
  "阅读",
  "规则",
  "再",
  "计算",
  "数字",
  "并",
  "只答",
];
function serialize(long: boolean) {
  const prompt = long ? "请 先 阅读 规则 再 计算 数字 1 2 并 只答" : "求和 1 2";
  const pieces = ["BOS", "USER", ...prompt.split(" "), "ASST", "3", "EOS"];
  const answerStart = pieces.indexOf("ASST") + 1;
  return { pieces, answerStart, text: `<USER> ${prompt} <ASST> 3 <EOS>` };
}

export function Lsl05SupervisedFinetuningContextContractLab() {
  const [sample, setSample] = useState("short");
  const [limit, setLimit] = useState(16);
  const [promptLoss, setPromptLoss] = useState(false);
  const timeline = useLesson(sequenceSteps);
  const { pieces, answerStart, text } = serialize(sample === "long");
  const step = timeline.currentStep;
  const visible =
    step === 0
      ? pieces
      : Array.from({ length: limit }, (_, i) => pieces[i] ?? "PAD");
  const labels = visible.map((token, i) =>
    token === "PAD" || i === 0 || (!promptLoss && i < answerStart)
      ? -100
      : vocabulary.indexOf(token),
  );
  const active = labels.filter((label) => label !== -100).length;
  const truncated = pieces.length > limit;
  return (
    <section
      className={labClass}
      data-sft-lab="serialization"
      data-visual-kind="instruction-serialization-causal-label-mask"
      aria-label="指令序列与标签掩码实验"
    >
      <h3 className="mb-3 text-lg font-semibold">指令不是一整段都要背下来</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <label>
          输入样本
          <select
            aria-label="序列样本"
            className={controlClass}
            value={sample}
            onChange={(e) => setSample(e.target.value)}
          >
            <option value="short">短指令</option>
            <option value="long">长指令</option>
          </select>
        </label>
        <label>
          最大 token 数
          <select
            aria-label="序列长度"
            className={controlClass}
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
          >
            <option value={16}>十六个位置</option>
            <option value={8}>八个位置</option>
          </select>
        </label>
      </div>
      <button
        type="button"
        className="my-3 w-full rounded border border-border px-2"
        aria-pressed={promptLoss}
        onClick={() => setPromptLoss(!promptLoss)}
      >
        故障：把用户输入也计入 loss · {promptLoss ? "开" : "关"}
      </button>
      <p className="break-words text-secondary">教学序列：{text}</p>
      <svg
        viewBox="0 0 330 500"
        className="mt-3 w-full"
        role="img"
        aria-label={`角色序列及目标标签，有效目标${active}个`}
        fontSize={16}
        fill={C.ink}
      >
        <text x={10} y={24}>
          位置 / token / 标签
        </text>
        {visible.map((token, i) => {
          const x = 10 + (i % 4) * 80,
            y = 42 + Math.floor(i / 4) * 96;
          const supervised = step >= 2 && labels[i] !== -100;
          return (
            <g key={i} data-token={token} data-label={labels[i]}>
              <rect
                x={x}
                y={y}
                width={72}
                height={84}
                rx={5}
                fill={C.bg}
                stroke={supervised ? C.accent : C.border}
                strokeWidth={supervised ? 3 : 1}
              />
              <text x={x + 8} y={y + 22} fill={C.muted}>
                {i} · {vocabulary.indexOf(token)}
              </text>
              <text x={x + 36} y={y + 47} textAnchor="middle">
                {token}
              </text>
              <text
                x={x + 36}
                y={y + 71}
                textAnchor="middle"
                fill={supervised ? C.accent : C.muted}
              >
                {step >= 2 ? labels[i] : "—"}
              </text>
            </g>
          );
        })}
        <text x={10} y={452}>
          logits[t−1] → labels[t]
        </text>
        <text x={10} y={481} fill={active === 0 ? C.danger : C.accent}>
          {step >= 3 ? `有效分母 N = ${active}` : "−100：忽略，不是词表编号"}
        </text>
      </svg>
      <output
        className="block rounded border border-border p-3"
        data-result="mask"
        aria-live="polite"
      >
        N={active}；{truncated && step > 0 ? "发生截断。" : "原始回答完整。"}
        {active === 0
          ? "无监督目标：拒绝训练，增大窗口或缩短输入。"
          : promptLoss
            ? "用户词也成为预测目标；这不是本例的回答专用目标。"
            : "只监督回答及 EOS；用户输入仍通过 attention 提供条件。"}
      </output>
      <p className="mt-2 text-secondary">
        边框表示目标项，不是 attention mask。格中第一行是位置与固定词表 ID；PAD
        始终忽略。四步中只有第 2 步后应用长度限制。真实模型应使用其 tokenizer
        和聊天模板。
      </p>
      <TimelineControls
        timeline={timeline}
        reset={{
          label: "重置序列",
          onClick: () => {
            setSample("short");
            setLimit(16);
            setPromptLoss(false);
            timeline.goToStep(0);
          },
        }}
      />
    </section>
  );
}

export function Lsl05SupervisedFinetuningComputeTraceLab() {
  const [rank, setRank] = useState(1);
  const [angle, setAngle] = useState(0);
  const [zeroBoth, setZeroBoth] = useState(false);
  const timeline = useLesson(rankSteps);
  const step = timeline.currentStep;
  const theta = (angle * Math.PI) / 180;
  const first = step >= 1 && !zeroBoth;
  const second = step >= 2 && rank === 2 && !zeroBoth;
  // A is the first r rows of I; B columns determine the image of each basis vector.
  const d = [
    [first ? Math.cos(theta) : 0, second ? -0.6 * Math.sin(theta) : 0],
    [first ? Math.sin(theta) : 0, second ? 0.6 * Math.cos(theta) : 0],
  ];
  const merged = step === 3;
  const m = d.map((row, i) =>
    row.map((v, j) => v + (merged && i === j ? 1 : 0)),
  );
  const point = (x: number, y: number) => `${108 + 65 * x},${272 - 65 * y}`;
  const polygon = [
    point(0, 0),
    point(m[0][0], m[1][0]),
    point(m[0][0] + m[0][1], m[1][0] + m[1][1]),
    point(m[0][1], m[1][1]),
  ].join(" ");
  const det = d[0][0] * d[1][1] - d[0][1] * d[1][0];
  return (
    <section
      className={labClass}
      data-sft-lab="lowrank"
      data-visual-kind="lora-lowrank-outer-product-geometry"
      aria-label="LoRA 低秩几何实验"
    >
      <h3 className="mb-3 text-lg font-semibold">低秩限制的是增量的像空间</h3>
      <label>
        旁路秩
        <select
          aria-label="LoRA秩"
          className={controlClass}
          value={rank}
          onChange={(e) => setRank(Number(e.target.value))}
        >
          <option value={1}>一维旁路 r=1</option>
          <option value={2}>二维旁路 r=2</option>
        </select>
      </label>
      <label className="mt-3 block">
        B 的方向：{angle}°
        <input
          aria-label="LoRA方向"
          type="range"
          className="w-full accent-accent"
          min={0}
          max={60}
          step={15}
          value={angle}
          onChange={(e) => setAngle(Number(e.target.value))}
        />
      </label>
      <button
        type="button"
        className="my-3 w-full rounded border border-border px-2"
        aria-pressed={zeroBoth}
        onClick={() => setZeroBoth(!zeroBoth)}
      >
        故障：A、B 同时零初始化 · {zeroBoth ? "开" : "关"}
      </button>
      <svg
        viewBox="0 0 330 475"
        className="w-full"
        role="img"
        aria-label={`二维${merged ? "合并权重" : "低秩增量"}几何，增量行列式${det.toFixed(2)}`}
        fontSize={16}
        fill={C.ink}
      >
        <text x={10} y={24}>
          {merged ? "W = I + BA 的单位方形像" : "ΔW = BA 的单位方形像"}
        </text>
        <path d="M20 272H310 M108 305V70" stroke={C.border} fill="none" />
        <polygon
          points={[point(0, 0), point(1, 0), point(1, 1), point(0, 1)].join(
            " ",
          )}
          fill="none"
          stroke={C.muted}
          strokeDasharray="5 5"
        />
        <polygon
          data-geometry="image"
          points={polygon}
          fill={C.accent}
          fillOpacity={0.12}
          stroke={C.accent}
          strokeWidth={3}
        />
        <line
          x1={108}
          y1={272}
          x2={108 + 65 * m[0][0]}
          y2={272 - 65 * m[1][0]}
          stroke={C.accent}
          strokeWidth={4}
        />
        <circle
          cx={108 + 65 * m[0][1]}
          cy={272 - 65 * m[1][1]}
          r={5}
          fill={C.accent}
        />
        <text x={10} y={50} fill={C.muted}>
          虚线：输入单位方形；实线：像
        </text>
        <text x={10} y={334}>
          ΔW 数值（W₀ = I 始终冻结）
        </text>
        {d.map((row, i) =>
          row.map((v, j) => (
            <g key={`${i}-${j}`}>
              <rect
                x={45 + j * 125}
                y={351 + i * 47}
                width={112}
                height={40}
                rx={4}
                stroke={C.border}
                fill={C.bg}
              />
              <text x={101 + j * 125} y={378 + i * 47} textAnchor="middle">
                {v.toFixed(2)}
              </text>
            </g>
          )),
        )}
        <text x={10} y={464} fill={C.accent}>
          det(ΔW) = {det.toFixed(2)}
        </text>
      </svg>
      <output
        data-result="rank"
        className="block rounded border border-border p-3"
        aria-live="polite"
      >
        r={rank}；A: {rank}×2，B: 2×{rank}；可训练数={4 * rank}。
        {zeroBoth
          ? "两因子均为零时，两侧梯度都为零，旁路不会起步。"
          : step === 0
            ? "B=0 而 A 取单位行，增量为零，但 B 可以接收梯度。"
            : rank === 1
              ? "增量两列至多张成一条线；合并后的 W 不必低秩。"
              : "第二个外积增加独立方向，面积可非零。"}
      </output>
      <p className="mt-2 text-secondary">
        这里按外积逐项构造数值，不是训练轨迹。A
        取单位行是便于手算的非零初始化；实际常用随机 A、零 B。α/r 设为 1。2×2
        例子不节省参数；4096×4096、r=8 才由 16,777,216 降到 65,536 个可训练数。
      </p>
      <TimelineControls
        timeline={timeline}
        reset={{
          label: "重置低秩",
          onClick: () => {
            setRank(1);
            setAngle(0);
            setZeroBoth(false);
            timeline.goToStep(0);
          },
        }}
      />
    </section>
  );
}

const sigmoid = (z: number) => 1 / (1 + Math.exp(-z));
const logisticLoss = (z: number) => Math.log1p(Math.exp(-z));
function updateTrace(rate: number, freeze: boolean) {
  let signal = 0.4,
    nuisance = 0;
  return Array.from({ length: 6 }, (_, i) => {
    if (i > 0) {
      const gradient = sigmoid(signal + nuisance) - 1;
      signal -= rate * gradient;
      if (!freeze) nuisance -= rate * gradient;
    }
    return {
      signal,
      nuisance,
      train: logisticLoss(signal + nuisance),
      heldout: logisticLoss(signal - 2 * nuisance),
    };
  });
}

export function Lsl05SupervisedFinetuningEvidenceGateLab() {
  const [rate, setRate] = useState(0.8);
  const [freeze, setFreeze] = useState(false);
  const [leak, setLeak] = useState(false);
  const timeline = useLesson(updateSteps);
  const trace = updateTrace(rate, freeze);
  const step = timeline.currentStep;
  const state = trace[step];
  const path = (key: "train" | "heldout") =>
    trace
      .slice(0, step + 1)
      .map(
        (p, i) => `${i === 0 ? "M" : "L"}${46 + i * 49},${242 - p[key] * 125}`,
      )
      .join(" ");
  const report = leak ? state.train : state.heldout;
  return (
    <section
      className={labClass}
      data-sft-lab="updates"
      data-visual-kind="gradient-parameter-update-heldout-loss"
      aria-label="参数更新与留出评估实验"
    >
      <h3 className="mb-3 text-lg font-semibold">
        训练下降，不等于独立评估改善
      </h3>
      <label>
        学习率
        <select
          aria-label="梯度学习率"
          className={controlClass}
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
        >
          <option value={0.8}>较大步长 0.8</option>
          <option value={0.2}>较小步长 0.2</option>
        </select>
      </label>
      <button
        type="button"
        className="mt-3 w-full rounded border border-border px-2"
        aria-pressed={freeze}
        onClick={() => setFreeze(!freeze)}
      >
        只更新信号权重 · {freeze ? "开" : "关"}
      </button>
      <button
        type="button"
        className="my-3 w-full rounded border border-border px-2"
        aria-pressed={leak}
        onClick={() => setLeak(!leak)}
      >
        故障：用训练集冒充评估 · {leak ? "开" : "关"}
      </button>
      <svg
        viewBox="0 0 330 465"
        className="w-full"
        role="img"
        aria-label={`梯度更新到第${step}次，训练损失${state.train.toFixed(3)}，真实留出损失${state.heldout.toFixed(3)}`}
        fontSize={16}
        fill={C.ink}
      >
        <text x={8} y={24}>
          二元交叉熵（不是生成模型得分）
        </text>
        <path d="M46 53V242H305" stroke={C.border} fill="none" />
        {[0, 0.5, 1, 1.5].map((v) => (
          <g key={v}>
            <text x={4} y={247 - v * 125}>
              {v.toFixed(1)}
            </text>
            <path
              d={`M46 ${242 - v * 125}H300`}
              stroke={C.border}
              strokeDasharray="3 6"
            />
          </g>
        ))}
        <path
          data-curve="train"
          d={path("train")}
          stroke={C.accent}
          strokeWidth={3}
          fill="none"
        />
        <path
          data-curve="heldout"
          d={path("heldout")}
          stroke={C.ink}
          strokeWidth={3}
          strokeDasharray="6 4"
          fill="none"
        />
        <rect
          data-report="point"
          x={41 + step * 49}
          y={237 - report * 125}
          width={10}
          height={10}
          fill={leak ? C.danger : C.ink}
        />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <text key={i} x={46 + i * 49} y={266} textAnchor="middle">
            {i}
          </text>
        ))}
        <text x={10} y={294} fill={C.accent}>
          实线：训练；虚线：真实留出
        </text>
        <text x={10} y={320}>
          方点：对外报告的评估值
        </text>
        <text x={10} y={352}>
          w 信号
        </text>
        <text x={10} y={402}>
          w 干扰
        </text>
        {[state.signal, state.nuisance].map((w, i) => (
          <g key={i}>
            <rect
              x={96}
              y={337 + i * 50}
              width={w * 80}
              height={20}
              fill={i === 0 ? C.accent : C.muted}
            />
            <text x={96} y={381 + i * 50}>
              {w.toFixed(3)}
            </text>
          </g>
        ))}
        <text x={10} y={460}>
          初值 (0.4, 0)；每步真实算梯度
        </text>
      </svg>
      <output
        data-result="loss"
        className="block rounded border border-border p-3"
        aria-live="polite"
      >
        更新 {step} 次；训练={state.train.toFixed(4)}；留出=
        {state.heldout.toFixed(4)}；报告={report.toFixed(4)}。
        {leak
          ? "报告被污染：训练集不能证明泛化。"
          : freeze
            ? "冻结干扰，信号权重独自改善两个集合。"
            : "训练的相关特征在留出集反向，干扰权重越大越有害。"}
      </output>
      <p className="mt-2 text-secondary">
        训练样本 (1,1)→1、(−1,−1)→0；留出样本
        (1,−2)→1、(−1,2)→0。对称样本平均梯度相同。此为两参数逻辑回归的算术模拟，不是语言模型、LoRA训练或真实SFT评测。曲线来自上面的样本，不是预置评分。
      </p>
      <TimelineControls
        timeline={timeline}
        reset={{
          label: "重置更新",
          onClick: () => {
            setRate(0.8);
            setFreeze(false);
            setLeak(false);
            timeline.goToStep(0);
          },
        }}
      />
    </section>
  );
}
