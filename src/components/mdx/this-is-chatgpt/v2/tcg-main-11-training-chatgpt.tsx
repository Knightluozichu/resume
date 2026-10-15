"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  useTeachingTimeline,
  type TeachingStep,
  type BuildTimeline,
  type TeachingTimeline,
} from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

const C = {
  bg: "var(--bg)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  border: "var(--border)",
  accent: "var(--accent)",
  good: "var(--success)",
  bad: "var(--danger)",
};
const fmt = (n: number) => n.toFixed(3);
const buttonClass =
  "min-h-11 min-w-11 rounded border border-border px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-accent";
const tokenSteps: readonly TeachingStep[] = [0, 1, 2, 3, 4].map((i) => ({
  label: `位置${i + 1}`,
}));
const lossSteps: readonly TeachingStep[] = [
  { label: "概率" },
  { label: "目标" },
  { label: "损失" },
  { label: "梯度" },
];
const budgetSteps: readonly TeachingStep[] = [
  { label: "未展示" },
  { label: "第一轮" },
  { label: "第二轮" },
  { label: "第三轮" },
];
function clock(steps: readonly TeachingStep[]): BuildTimeline {
  return (tl) => {
    const tick = { value: 0 };
    steps.forEach((s, i) => {
      tl.label(s.label, i * 900);
      tl.add(tick, { value: i + 1, duration: 900, ease: "linear" }, i * 900);
    });
  };
}
const tokenClock = clock(tokenSteps),
  lossClock = clock(lossSteps),
  budgetClock = clock(budgetSteps);
function useClock(steps: readonly TeachingStep[], build: BuildTimeline) {
  const timeline = useTeachingTimeline({ steps, build });
  const { reducedMotion, pause } = timeline;
  useEffect(() => {
    if (reducedMotion) pause();
  }, [reducedMotion, pause]);
  return timeline;
}
function Param({
  label,
  value,
  values,
  onChange,
}: {
  label: string;
  value: number;
  values: readonly number[];
  onChange: (v: number) => void;
}) {
  return (
    <label className="flex min-w-0 flex-col gap-1 text-sm">
      <span>{label}</span>
      <select
        className="min-h-11 min-w-0 w-full rounded border border-border bg-background px-2 text-primary focus-visible:outline-2 focus-visible:outline-accent"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {values.map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>
    </label>
  );
}
function Shell({
  kind,
  title,
  children,
  timeline,
  reset,
}: {
  kind: string;
  title: string;
  children: ReactNode;
  timeline: TeachingTimeline;
  reset: () => void;
}) {
  return (
    <section
      data-visual-kind={kind}
      className="not-prose my-6 min-w-0 rounded-xl border border-border p-3 text-primary [&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11 [&_input]:min-w-11 [&_button]:focus-visible:outline-2 [&_button]:focus-visible:outline-accent"
    >
      <h3 className="mb-3 text-base font-semibold">{title}</h3>
      {children}
      <TimelineControls
        timeline={timeline}
        reset={{ label: "完整重置", onClick: reset }}
        caption="播放仅逐步检查合成算例，不运行模型训练。"
      />
    </section>
  );
}
const corpus = ["BOS", "A", "B", "EOS", "BOS", "C", "D", "EOS"];
export function TcgMain11TrainingChatgptContextContractLab() {
  const [start, setStart] = useState(0),
    [length, setLength] = useState(5),
    [fault, setFault] = useState(false);
  const timeline = useClock(tokenSteps, tokenClock);
  const positions = Array.from({ length: 5 }, (_, j) => {
    const i = start + j,
      exists = j < length && i + 1 < corpus.length;
    const boundary = exists && corpus[i] === "EOS";
    return {
      i,
      x: exists ? corpus[i] : "PAD",
      y: exists ? corpus[i + 1] : "PAD",
      mask: Number(exists && (!boundary || fault)),
      boundary,
    };
  });
  const count = positions.reduce((s, p) => s + p.mask, 0),
    active = Math.min(length - 1, timeline.currentStep);
  return (
    <Shell
      kind="shifted-token-boundary-grid"
      title="实验一：把目标右移一格"
      timeline={timeline}
      reset={() => {
        setStart(0);
        setLength(5);
        setFault(false);
        timeline.pause();
        timeline.seek(0);
      }}
    >
      <div className="grid grid-cols-2 gap-3">
        <Param
          label="起点索引"
          value={start}
          values={[0, 2, 4]}
          onChange={setStart}
        />
        <Param
          label="窗口位置数"
          value={length}
          values={[3, 5]}
          onChange={setLength}
        />
      </div>
      <button
        type="button"
        className={`${buttonClass} mt-3`}
        data-fault="unmask-document-boundary"
        aria-pressed={fault}
        onClick={() => setFault(!fault)}
      >
        故障：跨文档也计损失（{fault ? "开" : "关"}）
      </button>
      <svg
        viewBox="0 0 320 330"
        className="mt-3 block h-auto w-full"
        role="img"
        aria-label="原始语料、右移目标与边界损失掩码对齐格"
        fontSize="15"
        fill={C.text}
      >
        <text x="8" y="22">
          原始序列（虚线为文档界）
        </text>
        {corpus.map((token, i) => (
          <g key={i}>
            <rect
              x={8 + i * 38}
              y="35"
              width="36"
              height="34"
              fill={i >= start && i < start + length ? C.accent : C.bg}
              fillOpacity={i >= start && i < start + length ? 0.2 : 1}
              stroke={C.border}
            />
            <text x={26 + i * 38} y="57" textAnchor="middle">
              {token}
            </text>
          </g>
        ))}
        <path d="M159 31 V75" stroke={C.bad} strokeDasharray="4 3" />
        <text x="8" y="101">
          同一列：输入 → 下一个目标
        </text>
        {["输入", "目标", "计损失"].map((s, r) => (
          <text key={s} x="4" y={140 + r * 66}>
            {s}
          </text>
        ))}
        {positions.map((p, j) => (
          <g key={j} opacity={j >= length ? 0.4 : 1}>
            <rect
              x={61 + j * 51}
              y="114"
              width="47"
              height="42"
              fill={C.bg}
              stroke={j === active ? C.accent : C.border}
              strokeWidth={j === active ? 3 : 1}
            />
            <text x={84 + j * 51} y="141" textAnchor="middle">
              {p.x}
            </text>
            <path
              d={`M${84 + j * 51} 158 V177 l-4 -5 m4 5 l4 -5`}
              stroke={p.boundary ? C.bad : C.accent}
              fill="none"
            />
            <rect
              x={61 + j * 51}
              y="180"
              width="47"
              height="42"
              fill={C.bg}
              stroke={p.boundary ? C.bad : C.border}
            />
            <text x={84 + j * 51} y="207" textAnchor="middle">
              {p.y}
            </text>
            <rect
              x={61 + j * 51}
              y="246"
              width="47"
              height="33"
              fill={p.mask ? (p.boundary ? C.bad : C.good) : C.border}
              fillOpacity=".18"
              stroke={C.border}
            />
            <text x={84 + j * 51} y="268" textAnchor="middle">
              {p.mask}
            </text>
          </g>
        ))}
        <text x="8" y="310">
          绿=有效；红=跨界；灰=不计
        </text>
      </svg>
      <p className="text-sm" aria-live="polite">
        有效目标数：<output data-result={count}>{count}</output>。PAD
        不计；本例还排除 EOS→BOS。遮掉损失不等于遮掉注意力。
      </p>
    </Shell>
  );
}
export function TcgMain11TrainingChatgptComputeTraceLab() {
  const [ratio, setRatio] = useState(2),
    [target, setTarget] = useState(0),
    [mask, setMask] = useState(1),
    [fault, setFault] = useState(false);
  const timeline = useClock(lossSteps, lossClock);
  const p = [ratio, 1, 1].map((v) => v / (ratio + 2)),
    y = fault ? (target + 1) % 3 : target;
  const loss = -mask * Math.log(p[y]),
    gradient = p.map((v, j) => mask * (v - Number(j === y)));
  const vertices = [
    [160, 38],
    [38, 190],
    [282, 190],
  ];
  const px = p.reduce((sum, v, j) => sum + v * vertices[j][0], 0),
    py = p.reduce((sum, v, j) => sum + v * vertices[j][1], 0);
  const curve = Array.from({ length: 61 }, (_, i) => {
    const q = 0.05 + (i * 0.95) / 60;
    return `${i ? "L" : "M"}${32 + q * 256},${314 + Math.log(q) * 20}`;
  }).join(" ");
  return (
    <Shell
      kind="masked-softmax-target-gradient"
      title="实验二：从分数到目标层梯度"
      timeline={timeline}
      reset={() => {
        setRatio(2);
        setTarget(0);
        setMask(1);
        setFault(false);
        timeline.pause();
        timeline.seek(0);
      }}
    >
      <div className="grid grid-cols-2 gap-3">
        <Param
          label="exp(zA) 的比例 r"
          value={ratio}
          values={[1, 2, 4]}
          onChange={setRatio}
        />
        <Param
          label="目标 0=A,1=B,2=C"
          value={target}
          values={[0, 1, 2]}
          onChange={setTarget}
        />
        <Param
          label="损失掩码 m"
          value={mask}
          values={[0, 1]}
          onChange={setMask}
        />
      </div>
      <button
        type="button"
        className={`${buttonClass} mt-3`}
        data-fault="wrong-target-index"
        aria-pressed={fault}
        onClick={() => setFault(!fault)}
      >
        故障：目标错用下一类（{fault ? "开" : "关"}）
      </button>
      <svg
        viewBox="0 0 320 440"
        className="mt-3 block h-auto w-full"
        role="img"
        aria-label="softmax概率单纯形、交叉熵曲线与带符号目标层梯度"
        fontSize="15"
        fill={C.text}
      >
        <path d="M160 38 L38 190 L282 190 Z" stroke={C.border} fill={C.bg} />
        {vertices.map(([x, v], j) => (
          <g key={j}>
            <circle
              cx={x}
              cy={v}
              r={y === j ? (timeline.currentStep === 1 ? 10 : 6) : 4}
              fill={y === j ? C.bad : C.muted}
            />
            <text x={x} y={j === 0 ? 22 : 212} textAnchor="middle">
              {["A", "B", "C"][j]}
            </text>
          </g>
        ))}
        <path
          d={`M${px} ${py} L${vertices[y][0]} ${vertices[y][1]}`}
          stroke={C.bad}
          strokeDasharray="4 4"
        />
        <circle
          cx={px}
          cy={py}
          r={timeline.currentStep === 0 ? 9 : 6}
          fill={C.accent}
        />
        <text x="160" y="240" textAnchor="middle">
          点=概率混合；红顶点=实际目标
        </text>
        <path d="M32 254 V314 H294" stroke={C.muted} fill="none" />
        <path
          d={curve}
          strokeWidth={timeline.currentStep === 2 ? 4 : 2}
          stroke={C.accent}
          fill="none"
          opacity={mask ? 1 : 0.3}
        />
        <circle
          cx={32 + p[y] * 256}
          cy={314 + Math.log(p[y]) * 20}
          r="5"
          fill={C.bad}
        />
        <text x="39" y="270">
          −ln(q)
        </text>
        <text x="283" y="309">
          q
        </text>
        <path d="M35 359 H289" stroke={C.muted} />
        {gradient.map((g, j) => (
          <g key={j}>
            <line
              x1={72 + j * 88}
              y1="359"
              x2={72 + j * 88}
              y2={359 - g * 42}
              stroke={g < 0 ? C.good : C.bad}
              strokeWidth={timeline.currentStep === 3 ? 6 : 3}
            />
            <circle
              cx={72 + j * 88}
              cy={359 - g * 42}
              r="4"
              fill={g < 0 ? C.good : C.bad}
            />
            <text x={72 + j * 88} y="428" textAnchor="middle">
              {["A", "B", "C"][j]} {fmt(g)}
            </text>
          </g>
        ))}
      </svg>
      <p className="text-sm" aria-live="polite">
        p=[{p.map(fmt).join(", ")}]；实际目标={y}；损失{" "}
        <output data-result={loss}>{fmt(loss)}</output>。底部杆是
        dL/dz：绿色负值、红色正值；m=0 时三杆归零。曲线始终显示未乘掩码的
        −ln(q)。
      </p>
    </Shell>
  );
}
export function TcgMain11TrainingChatgptEvidenceGateLab() {
  const [rounds, setRounds] = useState(2),
    [seenP, setSeenP] = useState(0.8),
    [fault, setFault] = useState(false);
  const timeline = useClock(budgetSteps, budgetClock);
  const train = fault ? ["A", "B", "E", "F"] : ["A", "B", "C", "D"],
    held = ["E", "F", "G", "H"];
  const pass = Math.min(rounds, timeline.currentStep),
    processed = 16 * pass,
    unique = pass ? 16 : 0;
  const overlap = pass ? held.filter((d) => train.includes(d)).length : 0;
  const nll = -(overlap * Math.log(seenP) + (4 - overlap) * Math.log(0.25)) / 4;
  const fullNll = fault ? -(Math.log(seenP) + Math.log(0.25)) / 2 : Math.log(4);
  return (
    <Shell
      kind="token-budget-heldout-overlap"
      title="实验三：重复预算与污染的留出集"
      timeline={timeline}
      reset={() => {
        setRounds(2);
        setSeenP(0.8);
        setFault(false);
        timeline.pause();
        timeline.seek(0);
      }}
    >
      <div className="grid grid-cols-2 gap-3">
        <Param
          label="计划轮数"
          value={rounds}
          values={[1, 2, 3]}
          onChange={setRounds}
        />
        <Param
          label="已见文档目标概率"
          value={seenP}
          values={[0.6, 0.8, 0.9]}
          onChange={setSeenP}
        />
      </div>
      <button
        type="button"
        className={`${buttonClass} mt-3`}
        data-fault="heldout-in-training"
        aria-pressed={fault}
        onClick={() => setFault(!fault)}
      >
        故障：训练混入 E、F（{fault ? "开" : "关"}）
      </button>
      <svg
        viewBox="0 0 320 450"
        className="mt-3 block h-auto w-full"
        role="img"
        aria-label="训练轮次重复铺排、独有token累计折线、训练留出交叠矩阵及目标概率短柱"
        fontSize="15"
        fill={C.text}
      >
        <text x="8" y="20">
          每格=4 token；粗框=当前轮
        </text>
        {[1, 2, 3].map((r) => (
          <g key={r} opacity={r <= rounds ? 1 : 0.25}>
            <text x="8" y={40 + r * 34}>
              轮{r}
            </text>
            {train.map((d, j) => (
              <g key={d}>
                <rect
                  x={59 + j * 61}
                  y={20 + r * 34}
                  width="55"
                  height="29"
                  rx="4"
                  fill={held.includes(d) ? C.bad : C.accent}
                  fillOpacity=".15"
                  stroke={pass === r ? C.accent : C.border}
                  strokeWidth={pass === r ? 3 : 1}
                />
                <text x={86 + j * 61} y={40 + r * 34} textAnchor="middle">
                  {d}
                </text>
              </g>
            ))}
          </g>
        ))}
        <path d="M42 164 V247 H298" stroke={C.muted} fill="none" />
        <text x="3" y="169">
          48
        </text>
        <text x="3" y="227">
          16
        </text>
        <path
          d={`M42 247 ${Array.from({ length: rounds }, (_, j) => `L${42 + (j + 1) * 80} ${247 - (j + 1) * 26}`).join(" ")}`}
          fill="none"
          stroke={C.accent}
          strokeWidth="3"
        />
        <path
          d={`M42 247 L122 221 H${42 + rounds * 80}`}
          fill="none"
          stroke={C.good}
          strokeWidth="3"
          strokeDasharray="5 3"
        />
        <circle
          cx={42 + pass * 80}
          cy={247 - pass * 26}
          r="5"
          fill={C.accent}
        />
        <circle
          cx={42 + pass * 80}
          cy={247 - (pass ? 26 : 0)}
          r="5"
          fill={C.good}
        />
        <text x="8" y="270">
          实线=展示总量；虚线=独有 token
        </text>
        <text x="8" y="301">
          留出
        </text>
        <text x="8" y="344">
          重叠
        </text>
        {held.map((d, j) => (
          <g key={d}>
            <text x={87 + j * 61} y="301" textAnchor="middle">
              {d}
            </text>
            <rect
              x={60 + j * 61}
              y="316"
              width="54"
              height="39"
              fill={pass && train.includes(d) ? C.bad : C.bg}
              fillOpacity={pass && train.includes(d) ? 0.2 : 1}
              stroke={C.border}
            />
            <text x={87 + j * 61} y="342" textAnchor="middle">
              {pass && train.includes(d) ? "1" : "0"}
            </text>
          </g>
        ))}
        <text x="4" y="390">
          概率
        </text>
        {held.map((d, j) => {
          const seen = pass > 0 && train.includes(d);
          const probability = seen ? seenP : 0.25;
          return (
            <g key={d}>
              <rect
                x={69 + j * 61}
                y={399 - probability * 34}
                width="36"
                height={probability * 34}
                fill={seen ? C.bad : C.good}
              />
              <text x={87 + j * 61} y="421" textAnchor="middle">
                {fmt(probability)}
              </text>
            </g>
          );
        })}
        <text x="8" y="444">
          短柱=目标概率；非拟合学习曲线
        </text>
      </svg>
      <p className="text-sm" aria-live="polite">
        计划预算={rounds * 16}，当前展示={processed}，独有={unique}。当前重叠=
        {overlap}/4，留出 NLL=<output data-result={nll}>{fmt(nll)}</output>
        ；计划完成后={fmt(fullNll)}
        。红格为训练重叠；短柱高度是目标概率。按“下一步”至第一轮再比较故障。未见文档概率固定
        .25，不拟合真实学习曲线。
      </p>
    </Shell>
  );
}
