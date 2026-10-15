"use client";

import { useCallback, useState, type ReactNode } from "react";
import { useTeachingTimeline } from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

const C = {
  ink: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
  line: "var(--border)",
  fill: "var(--bg-elevated)",
  fault: "var(--danger)",
};
const control =
  "min-h-11 min-w-11 rounded border border-border bg-elevated px-2 text-sm text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const selectionSteps = ["检索距离", "放入顺序槽", "加权投票"].map((label) => ({
  label,
}));
const calibrationSteps = ["原始概率", "除以基线", "重新归一化"].map(
  (label) => ({ label }),
);
const rankSteps = ["输入向量", "低维投影", "升维与缩放", "叠加基座"].map(
  (label) => ({ label }),
);
function useCalculationTimeline(steps: { label: string }[]) {
  const build = useCallback(
    (tl: Parameters<Parameters<typeof useTeachingTimeline>[0]["build"]>[0]) => {
      const clock = { value: 0 };
      steps.forEach((s, i) => tl.label(s.label, i * 1000));
      tl.add(
        clock,
        { value: steps.length, duration: steps.length * 1000, ease: "linear" },
        0,
      );
    },
    [steps],
  );
  return useTeachingTimeline({ steps, build });
}
function Frame({
  id,
  kind,
  title,
  children,
}: {
  id: string;
  kind: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      data-lab={id}
      data-visual-kind={kind}
      aria-label={title}
      className="not-prose my-6 min-w-0 rounded-xl border border-border bg-elevated p-3 text-primary sm:p-5 [&_button]:min-h-11 [&_button]:min-w-11 [&_button]:focus-visible:outline-2 [&_button]:focus-visible:outline-offset-2 [&_button]:focus-visible:outline-accent [&_input]:min-h-11 [&_input]:min-w-11 [&_input]:focus-visible:outline-2 [&_input]:focus-visible:outline-accent [&_svg]:block [&_svg]:w-full"
    >
      <h3 className="mb-2 text-base font-semibold">{title}</h3>
      <p className="mb-3 text-sm text-secondary">
        可复算的手工小例；未加载真实LLM，未训练参数，也未测量GPU速度。
      </p>
      {children}
    </section>
  );
}
function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex min-w-0 flex-col gap-1 text-sm">
      {label}
      {children}
    </label>
  );
}
function Fault({
  fault,
  setFault,
  label,
}: {
  fault: boolean;
  setFault: (value: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      data-fault={fault ? "active" : "inactive"}
      aria-pressed={fault}
      onClick={() => setFault(!fault)}
      className={`${control} mt-3 w-full text-left`}
    >
      {fault ? "恢复：" : "注入故障："}
      {label}
    </button>
  );
}
const fmt = (n: number) => (Number.isFinite(n) ? n.toFixed(3) : "拒绝");
const demos = [
  { id: "A", x: 0.2, y: 0.2, label: 1 },
  { id: "B", x: 0.8, y: 0.3, label: -1 },
  { id: "C", x: 0.6, y: 0.8, label: 1 },
];

export function Llm05IclLightweightFinetuningContextContractLab() {
  const [query, setQuery] = useState("right");
  const [policy, setPolicy] = useState("nearest");
  const [order, setOrder] = useState("near-first");
  const [rho, setRho] = useState(0.5);
  const [fault, setFault] = useState(false);
  const timeline = useCalculationTimeline(selectionSteps);
  const q = query === "right" ? [0.7, 0.4] : [0.3, 0.7];
  const sorted = demos
    .map((d) => ({ ...d, distance: Math.hypot(d.x - q[0], d.y - q[1]) }))
    .sort((a, b) => a.distance - b.distance);
  const nearest = sorted[0].id;
  const chosen =
    policy === "nearest"
      ? sorted.slice(0, 2)
      : [
          sorted.find((d) => d.label === 1)!,
          sorted.find((d) => d.label === -1)!,
        ];
  const slots = order === "near-first" ? chosen : [...chosen].reverse();
  const terms = slots.map((d, i) => ({
    ...d,
    label: fault && d.id === nearest ? -d.label : d.label,
    weight: Math.pow(rho, 1 - i) / (0.1 + d.distance),
  }));
  const total = terms.reduce((s, d) => s + d.weight, 0);
  const score = terms.reduce((s, d) => s + d.weight * d.label, 0) / total;
  const reset = () => {
    timeline.pause();
    timeline.seek(0);
    setQuery("right");
    setPolicy("nearest");
    setOrder("near-first");
    setRho(0.5);
    setFault(false);
  };
  return (
    <Frame
      id="icl-selection"
      kind="demonstration-neighbor-plane-order-vote"
      title="实验一 · 示范放在哪里，会改变哪一票？"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="查询位置">
          <select
            className={control}
            aria-label="查询位置"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          >
            <option value="right">Q = (0.7, 0.4)</option>
            <option value="left">Q = (0.3, 0.7)</option>
          </select>
        </Field>
        <Field label="选择策略">
          <select
            className={control}
            aria-label="选择策略"
            value={policy}
            onChange={(e) => setPolicy(e.target.value)}
          >
            <option value="nearest">距离最近的两个</option>
            <option value="balanced">正负各选最近一个</option>
          </select>
        </Field>
        <Field label="排列方向">
          <select
            className={control}
            aria-label="排列方向"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
          >
            <option value="near-first">按选出顺序</option>
            <option value="reverse">反转两个位置</option>
          </select>
        </Field>
        <Field label={`前位衰减 ρ = ${rho}`}>
          <input
            aria-label="前位衰减"
            type="range"
            min="0.25"
            max="1"
            step="0.25"
            value={rho}
            onChange={(e) => setRho(Number(e.target.value))}
          />
        </Field>
      </div>
      <Fault fault={fault} setFault={setFault} label="翻转最近示范的标签" />
      <svg
        viewBox="0 0 330 430"
        role="img"
        aria-label="二维候选示范与查询距离、两个位置的投票权重及正类概率"
        style={{ fontSize: 16 }}
      >
        <path d="M30 28 V210 H310" fill="none" stroke={C.line} />
        <text x="30" y="24" fill={C.muted}>
          特征2
        </text>
        <text x="244" y="232" fill={C.muted}>
          特征1
        </text>
        {demos.map((d) => {
          const selected = slots.some((s) => s.id === d.id);
          const x = 30 + d.x * 270,
            y = 210 - d.y * 180;
          const bad = fault && d.id === nearest;
          return (
            <g key={d.id}>
              {selected && (
                <line
                  x1={x}
                  y1={y}
                  x2={30 + q[0] * 270}
                  y2={210 - q[1] * 180}
                  stroke={C.accent}
                  strokeDasharray="4 4"
                />
              )}
              <circle
                cx={x}
                cy={y}
                r={selected ? 12 : 8}
                stroke={bad ? C.fault : C.accent}
                strokeWidth={selected ? 3 : 1}
                fill={C.fill}
              />
              <text x={x - 22} y={y - 19} fill={bad ? C.fault : C.ink}>
                {d.id} {(bad ? -d.label : d.label) > 0 ? "+" : "−"}
              </text>
            </g>
          );
        })}
        <path
          d={`M${30 + q[0] * 270} ${198 - q[1] * 180} l12 12 -12 12 -12 -12 Z`}
          fill={C.accent}
        />
        <text x={30 + q[0] * 270 - 12} y={249 - q[1] * 180} fill={C.ink}>
          Q
        </text>
        <text x="18" y="262" fill={C.ink}>
          位置：先示范，后查询 Q
        </text>
        {terms.map((d, i) => (
          <g key={d.id} opacity={timeline.currentStep >= 1 ? 1 : 0.6}>
            <rect
              x={18 + i * 156}
              y="279"
              width="138"
              height="62"
              rx="6"
              fill={C.fill}
              stroke={C.accent}
              strokeWidth={timeline.currentStep === 1 ? 3 : 1}
            />
            <text x={28 + i * 156} y="302" fill={C.ink}>
              {i + 1}: {d.id} ({d.label > 0 ? "+1" : "−1"})
            </text>
            <text x={28 + i * 156} y="326" fill={C.muted}>
              w = {fmt(d.weight)}
            </text>
          </g>
        ))}
        <text x="18" y="370" fill={C.ink}>
          p(+) = {fmt((1 + score) / 2)}
        </text>
        <rect x="18" y="386" width="294" height="16" fill={C.line} rx="4" />
        <rect
          x="18"
          y="386"
          width={(294 * (1 + score)) / 2}
          height="16"
          fill={C.accent}
          rx="4"
        />
        <text x="18" y="425" fill={C.muted}>
          0：全负票　　1：全正票
        </text>
      </svg>
      <div className="space-y-1 text-sm" aria-live="polite">
        {terms.map((d, i) => (
          <p key={d.id}>
            {d.id}: d={fmt(d.distance)}；w={rho}^{1 - i}/(0.1+{fmt(d.distance)}
            )={fmt(d.weight)}
          </p>
        ))}
        <p>score = Σ(w·标签)/Σw = {fmt(score)}；p(+) = (1+score)/2。</p>
        <p>边界：ρ=1时反转顺序不改结果；特征距离和手写权重不是LLM注意力。</p>
      </div>
      <TimelineControls
        timeline={timeline}
        caption="检索、顺序、投票分步高亮；数值始终可核对。"
        reset={{ label: "完整重置", onClick: reset }}
      />
    </Frame>
  );
}

const triangle = [
  [165, 32],
  [25, 260],
  [305, 260],
];
function probabilityPoint(p: number[]) {
  return [0, 1].map((axis) =>
    p.reduce((s, v, i) => s + v * triangle[i][axis], 0),
  );
}
export function Llm05IclLightweightFinetuningComputeTraceLab() {
  const [sample, setSample] = useState("biased");
  const [baseline, setBaseline] = useState("skewed");
  const [fault, setFault] = useState(false);
  const timeline = useCalculationTimeline(calibrationSteps);
  const p = sample === "biased" ? [0.45, 0.35, 0.2] : [0.2, 0.3, 0.5];
  const p0 = fault
    ? [2 / 3, 1 / 3, 0]
    : baseline === "skewed"
      ? [0.6, 0.3, 0.1]
      : [1 / 3, 1 / 3, 1 / 3];
  const ratio = p.map((v, i) => v / p0[i]);
  const sum = ratio.reduce((a, b) => a + b, 0);
  const corrected = fault ? null : ratio.map((v) => v / sum);
  const rawPoint = probabilityPoint(p),
    basePoint = probabilityPoint(p0),
    endPoint = corrected ? probabilityPoint(corrected) : null;
  const reset = () => {
    timeline.pause();
    timeline.seek(0);
    setSample("biased");
    setBaseline("skewed");
    setFault(false);
  };
  return (
    <Frame
      id="icl-calibration"
      kind="probability-simplex-contextual-calibration"
      title="实验二 · 比值归一化的教学变体"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="原始分布">
          <select
            className={control}
            aria-label="原始分布"
            value={sample}
            onChange={(e) => setSample(e.target.value)}
          >
            <option value="biased">p = (0.45, 0.35, 0.20)</option>
            <option value="other">p = (0.20, 0.30, 0.50)</option>
          </select>
        </Field>
        <Field label="无内容基线">
          <select
            className={control}
            aria-label="无内容基线"
            value={baseline}
            onChange={(e) => setBaseline(e.target.value)}
          >
            <option value="skewed">p₀ = (0.6, 0.3, 0.1)</option>
            <option value="uniform">p₀ = (1/3, 1/3, 1/3)</option>
          </select>
        </Field>
      </div>
      <Fault fault={fault} setFault={setFault} label="基线第三类概率为零" />
      <p className="mt-3 text-sm text-secondary">
        图中 q = normalize(p / p₀) 是教学变体。论文式(1)为 softmax(p /
        p₀)：argmax 相同，数值概率不同。
      </p>
      <svg
        viewBox="0 0 330 380"
        role="img"
        aria-label="三类概率单纯形：比值和归一化教学变体，不是论文softmax概率；零基线时拒绝除法"
        style={{ fontSize: 16 }}
      >
        <path
          d="M165 32 L25 260 H305 Z"
          fill="none"
          stroke={C.line}
          strokeWidth="2"
        />
        {[0.25, 0.5, 0.75].map((v) => (
          <line
            key={v}
            x1={165 - 140 * v}
            y1={32 + 228 * v}
            x2={165 + 140 * v}
            y2={32 + 228 * v}
            stroke={C.line}
            strokeDasharray="3 4"
          />
        ))}
        <text x="142" y="22" fill={C.ink}>
          类1
        </text>
        <text x="15" y="286" fill={C.ink}>
          类2
        </text>
        <text x="275" y="286" fill={C.ink}>
          类3
        </text>
        {endPoint && (
          <line
            x1={rawPoint[0]}
            y1={rawPoint[1]}
            x2={endPoint[0]}
            y2={endPoint[1]}
            stroke={C.accent}
            strokeWidth={timeline.currentStep === 2 ? 4 : 2}
          />
        )}
        <circle
          cx={rawPoint[0]}
          cy={rawPoint[1]}
          r="9"
          fill={C.fill}
          stroke={C.ink}
          strokeWidth="2"
        />
        <text x={rawPoint[0] - 25} y={rawPoint[1] - 17} fill={C.ink}>
          p
        </text>
        <path
          d={`M${basePoint[0]} ${basePoint[1] - 8} l8 8 -8 8 -8 -8 Z`}
          fill={C.muted}
        />
        <text x={basePoint[0] + 13} y={basePoint[1] + 4} fill={C.muted}>
          p₀
        </text>
        {endPoint && (
          <>
            <circle cx={endPoint[0]} cy={endPoint[1]} r="7" fill={C.accent} />
            <text x={endPoint[0] + 12} y={endPoint[1] + 5} fill={C.accent}>
              q
            </text>
          </>
        )}
        <text x="18" y="319" fill={fault ? C.fault : C.ink}>
          {fault ? "p₀[3]=0：停止，不画伪结果" : "q = normalize(p / p₀)"}
        </text>
        <text x="18" y="348" fill={C.muted}>
          圆圈 p：原始　实点 q：变体
        </text>
        <text x="18" y="375" fill={C.muted}>
          菱形 p₀：无内容基线
        </text>
      </svg>
      <div className="space-y-1 text-sm" aria-live="polite">
        {p.map((v, i) => (
          <p key={i}>
            类{i + 1}：{v.toFixed(2)} / {fmt(p0[i])} = {fmt(ratio[i])} → q ={" "}
            {corrected ? fmt(corrected[i]) : "未定义"}
          </p>
        ))}
        <p>
          {corrected
            ? `Σ比值 = ${fmt(sum)}；Σq = ${fmt(corrected.reduce((a, b) => a + b, 0))}。`
            : "拒绝：分母必须严格为正；先重测基线，不以任意ε伪造校准。"}
        </p>
        <p>边界：均匀基线不改p；此操作不是数据集可靠性曲线或准确率提升证明。</p>
      </div>
      <TimelineControls
        timeline={timeline}
        caption="原始 → 逐项除法 → 归一化；轨迹只表示这组概率。"
        reset={{ label: "完整重置", onClick: reset }}
      />
    </Frame>
  );
}

function Matrix({
  rows,
  x,
  y,
  name,
  highlight = false,
}: {
  rows: number[][];
  x: number;
  y: number;
  name: string;
  highlight?: boolean;
}) {
  return (
    <g>
      <text x={x} y={y - 12} fill={C.ink}>
        {name}
      </text>
      {rows.map((row, i) =>
        row.map((v, j) => (
          <g key={`${i}-${j}`}>
            <rect
              x={x + j * 46}
              y={y + i * 34}
              width="46"
              height="34"
              fill={C.fill}
              stroke={highlight ? C.accent : C.line}
              strokeWidth={highlight ? 2 : 1}
            />
            <text
              x={x + j * 46 + 23}
              y={y + i * 34 + 23}
              textAnchor="middle"
              fill={C.ink}
            >
              {Number.isInteger(v) ? v : v.toFixed(1)}
            </text>
          </g>
        )),
      )}
    </g>
  );
}
export function Llm05IclLightweightFinetuningEvidenceGateLab() {
  const [rank, setRank] = useState(1);
  const [alpha, setAlpha] = useState(2);
  const [input, setInput] = useState("positive");
  const [fault, setFault] = useState(false);
  const timeline = useCalculationTimeline(rankSteps);
  const x = input === "positive" ? [2, 1] : [1, -1];
  const A =
    rank === 1
      ? [[1, -1]]
      : [
          [1, -1],
          [0, 1],
        ];
  const B =
    rank === 1
      ? [[1], [2]]
      : [
          [1, 0],
          [2, 1],
        ];
  const z = A.map((row) => row.reduce((s, v, j) => s + v * x[j], 0));
  const unscaled = B.map((row) => row.reduce((s, v, j) => s + v * z[j], 0));
  const scale = fault ? 1 : alpha / rank;
  const delta = unscaled.map((v) => scale * v);
  const h = x.map((v, i) => v + delta[i]);
  const merged = B.map((row, i) =>
    A[0].map(
      (_, j) =>
        (i === j ? 1 : 0) + scale * row.reduce((s, v, k) => s + v * A[k][j], 0),
    ),
  );
  const same = merged
    .map((row) => row.reduce((s, v, j) => s + v * x[j], 0))
    .every((v, i) => Math.abs(v - h[i]) < 1e-9);
  const reset = () => {
    timeline.pause();
    timeline.seek(0);
    setRank(1);
    setAlpha(2);
    setInput("positive");
    setFault(false);
  };
  return (
    <Frame
      id="icl-lora"
      kind="lora-low-rank-matrix-product"
      title="实验三 · 先降维，再升维，最后加回基座"
    >
      <div className="grid gap-3 sm:grid-cols-3">
        <Field label="秩 r">
          <select
            className={control}
            aria-label="秩"
            value={rank}
            onChange={(e) => setRank(Number(e.target.value))}
          >
            <option value="1">r = 1</option>
            <option value="2">r = 2</option>
          </select>
        </Field>
        <Field label="缩放 α">
          <select
            className={control}
            aria-label="缩放"
            value={alpha}
            onChange={(e) => setAlpha(Number(e.target.value))}
          >
            <option value="2">α = 2</option>
            <option value="1">α = 1</option>
          </select>
        </Field>
        <Field label="输入 x">
          <select
            className={control}
            aria-label="输入"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          >
            <option value="positive">x = (2, 1)</option>
            <option value="signed">x = (1, −1)</option>
          </select>
        </Field>
      </div>
      <Fault fault={fault} setFault={setFault} label="遗漏 α/r 缩放" />
      <svg
        viewBox="0 0 330 480"
        role="img"
        aria-label="LoRA矩阵A和B、中间向量Ax、更新向量以及合并矩阵W，显示每步真实乘法值"
        style={{ fontSize: 16 }}
      >
        <Matrix
          name={`A (${rank}×2)`}
          rows={A}
          x={18}
          y={38}
          highlight={timeline.currentStep === 1}
        />
        <text x="125" y="62" fill={C.muted}>
          ×
        </text>
        <Matrix name="x" rows={x.map((v) => [v])} x={151} y={38} />
        <text x="208" y="62" fill={C.muted}>
          =
        </text>
        <Matrix
          name="Ax"
          rows={z.map((v) => [v])}
          x={240}
          y={38}
          highlight={timeline.currentStep === 1}
        />
        <Matrix
          name={`B (2×${rank})`}
          rows={B}
          x={18}
          y={154}
          highlight={timeline.currentStep === 2}
        />
        <text x="125" y="178" fill={C.muted}>
          ×
        </text>
        <Matrix name="Ax" rows={z.map((v) => [v])} x={151} y={154} />
        <text x="208" y="178" fill={C.muted}>
          =
        </text>
        <Matrix name="BAx" rows={unscaled.map((v) => [v])} x={240} y={154} />
        <text x="18" y="256" fill={fault ? C.fault : C.ink}>
          实际乘数 = {fmt(scale)}
          {fault ? "（漏缩放）" : " = α/r"}
        </text>
        <text x="18" y="287" fill={C.ink}>
          Δh = ({delta.join(", ")})
        </text>
        <text x="18" y="318" fill={C.accent}>
          h = x + Δh = ({h.join(", ")})
        </text>
        <Matrix
          name="W = I + (乘数)BA"
          rows={merged}
          x={18}
          y={360}
          highlight={timeline.currentStep === 3}
        />
        <text x="135" y="389" fill={C.ink}>
          Wx = ({h.join(", ")})
        </text>
        <text x="135" y="418" fill={C.muted}>
          {same ? "合并前后相等" : "合并校验失败"}
        </text>
        <text x="18" y="467" fill={C.muted}>
          新增参数 r(2+2) = {4 * rank}；基座4
        </text>
      </svg>
      <div className="space-y-1 text-sm" aria-live="polite">
        <p>
          Ax = ({z.join(", ")})；B(Ax) = ({unscaled.join(", ")})；基座 W₀=I
          保持不变。
        </p>
        <p>r=1时 BA 的两行相关，不能表示任意2×2更新；r=2解除这一例的瓶颈。</p>
        <p>
          边界：本例太小，r=1也没有省参数；α/r=1时遗漏缩放恰好无影响，不代表实现正确。
        </p>
      </div>
      <TimelineControls
        timeline={timeline}
        caption="按输入 → Ax → BAx → h 分步检查，不模拟训练。"
        reset={{ label: "完整重置", onClick: reset }}
      />
    </Frame>
  );
}
