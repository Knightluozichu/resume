"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  useTeachingTimeline,
  type TeachingTimeline,
} from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

const C = {
  bg: "var(--bg)",
  border: "var(--border)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
} as const;
const button =
  "min-h-11 min-w-11 rounded-control border border-border px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-accent";
const sum = (v: number[]) => v.reduce((a, b) => a + b, 0);
const fmt = (v: number) => (Math.abs(v) < 0.0005 ? "0.00" : v.toFixed(2));
const vec = (v: number[]) => `[${v.map(fmt).join(", ")}]`;
const TOKENS: Record<string, number[]> = { A: [1, 0], B: [0, 1] };
const POSITIONS = [
  [0, 0],
  [0.5, -0.5],
  [1, -1],
];
function tokenPositions(sequence: string, scale: number, fault: boolean) {
  return [...sequence].map((t, i) =>
    TOKENS[t].map((v, d) => v + scale * POSITIONS[fault ? 0 : i][d]),
  );
}
function softmax(v: number[]) {
  const peak = Math.max(...v);
  const e = v.map((x) => Math.exp(x - peak));
  return e.map((x) => x / sum(e));
}
function causalAttention(gain: number, future: number, fault: boolean) {
  const qk = [
    [1, 0],
    [0, 1],
    [1, 1],
  ];
  const values = [
    [1, 0],
    [0, 1],
    [future, -future],
  ];
  const scores = qk.map((q, i) =>
    qk.map((k, j) =>
      !fault && j > i
        ? -Infinity
        : (gain * sum(q.map((v, d) => v * k[d]))) / Math.sqrt(2),
    ),
  );
  const weights = scores.map(softmax);
  const output = weights.map((w) =>
    [0, 1].map((d) => sum(w.map((v, j) => v * values[j][d]))),
  );
  return { scores, weights, values, output };
}
const W1 = [
  [1, 0, -1],
  [0, 1, 1],
  [-1, 0, 1],
  [0, -1, 0],
];
const W2 = [
  [0.5, 0, -0.5, 0],
  [0, 0.5, 0, -0.5],
  [0.25, -0.25, 0.25, -0.25],
];
function project(x: number[], w: number[][]) {
  return w[0].map((_, j) => sum(x.map((v, i) => v * w[i][j])));
}
function layerNorm(x: number[]) {
  const mean = sum(x) / x.length;
  const variance = sum(x.map((v) => (v - mean) ** 2)) / x.length;
  return x.map((v) => (v - mean) / Math.sqrt(variance + 1e-5));
}
type Ablation = "full" | "noFFN" | "noLN";
function residualBlock(gain: number, ablation: Ablation, fault: boolean) {
  const x = [1, 2, 0, -1];
  const a = [0.5, -0.5, 1, 0].map((v) => gain * v);
  const r = x.map((v, i) => (fault ? 0 : v) + a[i]);
  const z = ablation === "noLN" ? [...r] : layerNorm(r);
  const h = project(z, W1).map((v, i) => Math.max(0, v + [0, 0.25, 0][i]));
  const f = ablation === "noFFN" ? [0, 0, 0, 0] : project(h, W2);
  const u = z.map((v, i) => v + f[i]);
  const y = ablation === "noLN" ? [...u] : layerNorm(u);
  return {
    rows: [x, r, z, h, f, u, y],
    a,
    probability: softmax([y[0], -y[0]])[0],
  };
}
const labels = {
  position: ["位置0", "位置1", "位置2"],
  attention: ["查询0", "查询1", "查询2"],
  block: ["输入x", "残差r", "归一z", "隐藏h", "更新f", "相加u", "输出y"],
};
// The shared hook depends on steps identity: keep arrays stable across renders.
const scanSteps = {
  position: labels.position.map((label) => ({ label })),
  attention: labels.attention.map((label) => ({ label })),
  block: labels.block.map((label) => ({ label })),
};
function useScan(kind: keyof typeof labels) {
  const timeline = useTeachingTimeline({
    steps: scanSteps[kind],
    build: (tl) => {
      const clock = { value: 0 };
      labels[kind].forEach((label, i) => {
        tl.label(label, i * 700);
        tl.add(clock, { value: i + 1, duration: 700, ease: "linear" }, i * 700);
      });
    },
  });
  const { reducedMotion, pause } = timeline;
  useEffect(() => {
    if (reducedMotion) pause();
  }, [reducedMotion, pause]);
  return timeline;
}
function stopAndRewind(t: TeachingTimeline) {
  t.pause();
  t.seek(0);
}
function Shell({
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
      aria-label={title}
      className="not-prose my-8 min-w-0 rounded-card border border-border bg-bg p-3 text-primary sm:p-5 [&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11 [&_input]:min-w-11 [&_select]:min-h-11 [&_select]:min-w-11 [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-accent [&_input:focus-visible]:outline-2 [&_input:focus-visible]:outline-accent [&_select:focus-visible]:outline-2 [&_select:focus-visible]:outline-accent"
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
  change,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  change: (v: number) => void;
}) {
  return (
    <label className="block min-w-0 text-sm">
      {label}：{fmt(value)}
      <input
        aria-label={label}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => change(Number(e.target.value))}
        className="mdx-range block w-full accent-accent"
      />
    </label>
  );
}
function Fault({
  active,
  change,
  children,
}: {
  active: boolean;
  change: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      data-fault
      aria-pressed={active}
      onClick={change}
      className={`${button} ${active ? "text-danger" : "text-secondary"}`}
    >
      {children}：{active ? "开" : "关"}
    </button>
  );
}
function ScanControls({
  t,
  reset,
  caption,
}: {
  t: TeachingTimeline;
  reset: () => void;
  caption: string;
}) {
  return (
    <TimelineControls
      timeline={t}
      reset={{ label: "完整重置", onClick: reset }}
      caption={caption}
    />
  );
}

export function TcgMain10InsideChatgptContextContractLab() {
  const [sequence, setSequence] = useState("ABA");
  const [scale, setScale] = useState(1);
  const [fault, setFault] = useState(false);
  const t = useScan("position");
  const rows = tokenPositions(sequence, scale, fault);
  const i = t.currentStep;
  const e = TOKENS[sequence[i]];
  const x = rows[i];
  // Fixed coordinate system: x in [-.5,2.5], y in [-1.5,1.5].
  const px = (v: number) => 40 + (v + 0.5) * 68;
  const py = (v: number) => 32 + (1.5 - v) * 68;
  const reset = () => {
    stopAndRewind(t);
    setSequence("ABA");
    setScale(1);
    setFault(false);
  };
  return (
    <Shell
      kind="token-position-vector-superposition"
      title="实验一：词元向量加上位置向量"
    >
      <p className="mb-3 text-sm">
        蓝线是E，虚线是sP，红色端点是X。逐位置扫描，不把求和池化误当有序张量。
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          输入序列
          <select
            aria-label="输入序列"
            value={sequence}
            onChange={(e) => {
              t.pause();
              setSequence(e.target.value);
            }}
            className="mt-1 block w-full rounded-control border border-border bg-bg px-2 text-primary"
          >
            <option value="ABA">ABA</option>
            <option value="BAA">BAA</option>
          </select>
        </label>
        <Slider
          label="位置强度s"
          value={scale}
          min={0}
          max={1}
          step={0.25}
          change={(v) => {
            t.pause();
            setScale(v);
          }}
        />
      </div>
      <div className="my-3">
        <Fault
          active={fault}
          change={() => {
            t.pause();
            setFault(!fault);
          }}
        >
          错误复用P0
        </Fault>
      </div>
      <svg
        viewBox="0 0 280 345"
        role="img"
        aria-label="二维词元与位置向量叠加及三行坐标"
        className="mx-auto block w-full max-w-md"
        style={{ fontSize: 14 }}
      >
        <line
          x1={px(-0.5)}
          y1={py(0)}
          x2={px(2.5)}
          y2={py(0)}
          stroke={C.border}
        />
        <line
          x1={px(0)}
          y1={py(-1.5)}
          x2={px(0)}
          y2={py(1.5)}
          stroke={C.border}
        />
        {[-1, 0, 1].map((v) => (
          <text
            key={v}
            x={px(0) - 7}
            y={py(v) + 5}
            textAnchor="end"
            fill={C.muted}
          >
            {v}
          </text>
        ))}
        {[1, 2].map((v) => (
          <text
            key={v}
            x={px(v)}
            y={py(0) + 20}
            textAnchor="middle"
            fill={C.muted}
          >
            {v}
          </text>
        ))}
        <text x={254} y={py(0) + 4} fill={C.muted}>
          x
        </text>
        <text x={px(0) + 8} y={22} fill={C.muted}>
          y
        </text>
        <line
          x1={px(0)}
          y1={py(0)}
          x2={px(e[0])}
          y2={py(e[1])}
          stroke={C.accent}
          strokeWidth={4}
        />
        <line
          x1={px(e[0])}
          y1={py(e[1])}
          x2={px(x[0])}
          y2={py(x[1])}
          stroke={C.danger}
          strokeWidth={3}
          strokeDasharray="5 4"
        />
        <circle cx={px(e[0])} cy={py(e[1])} r={5} fill={C.accent} />
        <circle cx={px(x[0])} cy={py(x[1])} r={4} fill={C.danger} />
        <text x={8} y={259} fill={C.text}>
          i / token / X（逐位置保留）
        </text>
        {rows.map((row, j) => (
          <g key={j}>
            <rect
              x={4}
              y={267 + 25 * j}
              width={272}
              height={24}
              fill={j === i ? C.accent : C.bg}
              fillOpacity={j === i ? 0.12 : 1}
            />
            <text x={10} y={284 + 25 * j} fill={C.text}>
              {j} / {sequence[j]} / {vec(row)}
            </text>
          </g>
        ))}
      </svg>
      <output className="mt-3 block break-words text-sm" aria-live="polite">
        当前 E={vec(e)}；sP={vec(x.map((v, d) => v - e[d]))}；X={vec(x)}。求和=
        {vec([0, 1].map((d) => sum(rows.map((r) => r[d]))))}。
      </output>
      <p className="mt-2 text-sm text-secondary">
        换序后求和仍相同。位置编码只向逐位置表示提供线索，不保证任意汇聚都保序；坐标轴是手工二维，不是语义地图。
      </p>
      <ScanControls
        t={t}
        reset={reset}
        caption="扫描位置0→2；重置恢复ABA、s=1、故障关及暂停起点。"
      />
    </Shell>
  );
}

export function TcgMain10InsideChatgptComputeTraceLab() {
  const [gain, setGain] = useState(1);
  const [future, setFuture] = useState(2);
  const [fault, setFault] = useState(false);
  const t = useScan("attention");
  const result = causalAttention(gain, future, fault);
  const row = t.currentStep;
  const reset = () => {
    stopAndRewind(t);
    setGain(1);
    setFuture(2);
    setFault(false);
  };
  return (
    <Shell
      kind="causal-scaled-dot-product-triangle"
      title="实验二：三角权重与未来泄漏"
    >
      <p className="mb-3 text-sm">
        行i查询列j。×是softmax之前屏蔽，不是小权重；当前行的加权结果在下方展开。输入i预测下一位置i+1。
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Slider
          label="查询增益g"
          value={gain}
          min={0.5}
          max={2}
          step={0.5}
          change={(v) => {
            t.pause();
            setGain(v);
          }}
        />
        <Slider
          label="未来值v"
          value={future}
          min={1}
          max={4}
          step={1}
          change={(v) => {
            t.pause();
            setFuture(v);
          }}
        />
      </div>
      <div className="my-3">
        <Fault
          active={fault}
          change={() => {
            t.pause();
            setFault(!fault);
          }}
        >
          错误移除因果mask
        </Fault>
      </div>
      <svg
        viewBox="0 0 280 390"
        role="img"
        aria-label="因果注意力三乘三权重矩阵和当前行加权值"
        className="mx-auto block w-full max-w-md"
        style={{ fontSize: 14 }}
      >
        <text x={8} y={20} fill={C.text}>
          wᵢⱼ（每行和为1）
        </text>
        {[0, 1, 2].map((j) => (
          <text
            key={j}
            x={93 + 64 * j}
            y={46}
            textAnchor="middle"
            fill={C.muted}
          >
            j={j}
          </text>
        ))}
        {result.weights.map((w, i) => (
          <g key={i}>
            <text x={7} y={87 + 56 * i} fill={i === row ? C.accent : C.text}>
              i={i}
            </text>
            {w.map((v, j) => (
              <g key={j}>
                <rect
                  x={62 + 64 * j}
                  y={57 + 56 * i}
                  width={61}
                  height={52}
                  fill={j > i && !fault ? C.bg : C.accent}
                  fillOpacity={j > i && !fault ? 1 : 0.06 + 0.65 * v}
                  stroke={i === row ? C.accent : C.border}
                  strokeWidth={i === row ? 2 : 1}
                />
                <text
                  x={93 + 64 * j}
                  y={87 + 56 * i}
                  textAnchor="middle"
                  fill={C.text}
                >
                  {j > i && !fault ? "×" : fmt(v)}
                </text>
              </g>
            ))}
          </g>
        ))}
        <text x={8} y={248} fill={C.text}>
          o{row} = Σⱼ w{row}ⱼ Vⱼ
        </text>
        {result.weights[row].map((w, j) => (
          <g key={j}>
            <line
              x1={14}
              x2={14 + 70 * w}
              y1={270 + 31 * j}
              y2={270 + 31 * j}
              stroke={j > row ? C.danger : C.accent}
              strokeWidth={6}
            />
            <text x={92} y={275 + 31 * j} fill={C.text}>
              {fmt(w)} × {vec(result.values[j])}
            </text>
          </g>
        ))}
        <text x={8} y={379} fill={C.text}>
          o{row} = {vec(result.output[row])}
        </text>
      </svg>
      <output className="mt-3 block break-words text-sm" aria-live="polite">
        首行o0={vec(result.output[0])}；当前原始分数=
        {vec(result.scores[row].map((v) => (v === -Infinity ? -Infinity : v)))}
        。{fault ? "已泄漏：o0会随v改变。" : "未来v再大，也不改变o0及o1。"}
      </output>
      <p className="mt-2 text-sm text-secondary">
        Q=K=((1,0),(0,1),(1,1))；V0=(1,0)，V1=(0,1)，V2=(v,−v)。除数√2来自键维度，不是采样温度。
      </p>
      <ScanControls
        t={t}
        reset={reset}
        caption="逐query行复算；重置g=1、v=2、mask有效并暂停归零。"
      />
    </Shell>
  );
}

export function TcgMain10InsideChatgptEvidenceGateLab() {
  const [gain, setGain] = useState(1);
  const [ablation, setAblation] = useState<Ablation>("full");
  const [fault, setFault] = useState(false);
  const t = useScan("block");
  const result = residualBlock(gain, ablation, fault);
  const reference = residualBlock(gain, "full", false);
  const row = t.currentStep;
  const reset = () => {
    stopAndRewind(t);
    setGain(1);
    setAblation("full");
    setFault(false);
  };
  return (
    <Shell
      kind="residual-normalization-ffn-state-lattice"
      title="实验三：残差、归一化与逐位置前馈"
    >
      <p className="mb-3 text-sm">
        固定手工更新a，不接实验二权重；这是post-LN教学块，不是实际GPT。正值蓝、负值红；每格都是计算值，不是激活概念卡。
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Slider
          label="更新强度g"
          value={gain}
          min={0.5}
          max={2}
          step={0.5}
          change={(v) => {
            t.pause();
            setGain(v);
          }}
        />
        <label className="block text-sm">
          消融
          <select
            aria-label="消融"
            value={ablation}
            onChange={(e) => {
              t.pause();
              setAblation(e.target.value as Ablation);
            }}
            className="mt-1 block w-full rounded-control border border-border bg-bg px-2 text-primary"
          >
            <option value="full">完整小块</option>
            <option value="noFFN">移除前馈更新</option>
            <option value="noLN">移除两次归一化</option>
          </select>
        </label>
      </div>
      <div className="my-3">
        <Fault
          active={fault}
          change={() => {
            t.pause();
            setFault(!fault);
          }}
        >
          错误删首残差x
        </Fault>
      </div>
      <svg
        viewBox="0 0 280 420"
        role="img"
        aria-label="七阶段逐特征中间数值及输出折线"
        className="mx-auto block w-full max-w-md"
        style={{ fontSize: 14 }}
      >
        {[0, 1, 2, 3].map((d) => (
          <text
            key={d}
            x={91 + 48 * d}
            y={19}
            textAnchor="middle"
            fill={C.muted}
          >
            d{d}
          </text>
        ))}
        {result.rows.map((r, i) => (
          <g key={i}>
            <text x={7} y={52 + 36 * i} fill={row === i ? C.accent : C.text}>
              {["x", "r", "z", "h", "f", "u", "y"][i]}
            </text>
            {[0, 1, 2, 3].map((d) => (
              <g key={d}>
                <rect
                  x={68 + 48 * d}
                  y={29 + 36 * i}
                  width={46}
                  height={33}
                  fill={
                    r[d] === undefined ? C.bg : r[d] < 0 ? C.danger : C.accent
                  }
                  fillOpacity={
                    r[d] === undefined
                      ? 1
                      : 0.05 + 0.45 * Math.min(Math.abs(r[d]) / 3, 1)
                  }
                  stroke={row === i ? C.accent : C.border}
                  strokeWidth={row === i ? 2 : 1}
                />
                <text
                  x={91 + 48 * d}
                  y={51 + 36 * i}
                  textAnchor="middle"
                  fill={C.text}
                >
                  {r[d] === undefined ? "—" : fmt(r[d])}
                </text>
              </g>
            ))}
          </g>
        ))}
        <text x={8} y={303} fill={C.text}>
          y：实线当前 / 虚线完整参考
        </text>
        {/* Fixed scale 13 SVG units per value; all supported outputs stay inside 315–393. */}
        <line x1={35} y1={354} x2={250} y2={354} stroke={C.border} />
        <polyline
          points={reference.rows[6]
            .map((v, d) => `${45 + 65 * d},${354 - 13 * v}`)
            .join(" ")}
          fill="none"
          stroke={C.muted}
          strokeDasharray="4 4"
          strokeWidth={2}
        />
        <polyline
          points={result.rows[6]
            .map((v, d) => `${45 + 65 * d},${354 - 13 * v}`)
            .join(" ")}
          fill="none"
          stroke={C.accent}
          strokeWidth={3}
        />
        {result.rows[6].map((v, d) => (
          <g key={d}>
            <circle cx={45 + 65 * d} cy={354 - 13 * v} r={4} fill={C.accent} />
            <text x={45 + 65 * d} y={415} textAnchor="middle" fill={C.muted}>
              d{d}
            </text>
          </g>
        ))}
      </svg>
      <output className="mt-3 block break-words text-sm" aria-live="polite">
        {labels.block[row]}={vec(result.rows[row])}；a={vec(result.a)}
        ；两候选手工读出p(A)={result.probability.toFixed(4)}。
      </output>
      <p className="mt-2 text-sm text-secondary">
        r=x+a；z=LN(r)；h=max(0,zW1+b)；f=hW2；u=z+f；y=LN(u)。LN只沿本位置特征维，不跨token；epsilon=0.00001。移除前馈时h仍展示诊断值，f置零。
      </p>
      <ScanControls
        t={t}
        reset={reset}
        caption="扫描x→r→z→h→f→u→y；完整重置含消融、故障、强度和时间线。"
      />
    </Shell>
  );
}
