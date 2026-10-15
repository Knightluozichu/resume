"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { ReactNode } from "react";

const C = {
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  line: "var(--border)",
  a: "var(--accent)",
  b: "var(--success)",
  warn: "var(--warning)",
  bad: "var(--danger)",
  bg: "var(--bg-elevated)",
};
const control =
  "min-h-11 min-w-11 rounded-lg border border-border bg-elevated px-3 py-2 text-sm text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const svgStyle = {
  width: "100%",
  maxWidth: 420,
  margin: "0 auto",
  display: "block",
  fontSize: 14,
  color: C.text,
};
const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeMotion(notify: () => void) {
  const q = window.matchMedia(motionQuery);
  q.addEventListener("change", notify);
  return () => q.removeEventListener("change", notify);
}
function useTrace(max: number, initial: number) {
  const reduced = useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia(motionQuery).matches,
    () => false,
  );
  const [cursor, setCursor] = useState(initial);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  function pause() {
    if (timer.current !== null) clearTimeout(timer.current);
    timer.current = null;
    setPlaying(false);
  }
  useEffect(() => {
    if (!playing || reduced) return;
    timer.current = setTimeout(() => {
      if (cursor >= max) setPlaying(false);
      else setCursor(cursor + 1);
    }, 650);
    return () => {
      if (timer.current !== null) clearTimeout(timer.current);
    };
  }, [playing, reduced, cursor, max]);
  function seek(n: number) {
    pause();
    setCursor(n);
  }
  return {
    cursor,
    reduced,
    playing: playing && !reduced,
    seek,
    toggle: () => {
      if (playing) pause();
      else if (!reduced) {
        if (cursor === max) setCursor(0);
        setPlaying(true);
      }
    },
    reset: () => {
      pause();
      setCursor(initial);
    },
    max,
  };
}
type Trace = ReturnType<typeof useTrace>;
function Timeline({ trace, label }: { trace: Trace; label: string }) {
  return (
    <div className="grid gap-2 border-t border-border pt-3">
      <label className="grid gap-1 text-sm">
        {label}：{trace.cursor}/{trace.max}
        <input
          aria-label={label}
          className="h-11 w-full accent-accent focus-visible:outline-2 focus-visible:outline-accent"
          type="range"
          min={0}
          max={trace.max}
          value={trace.cursor}
          onChange={(e) => trace.seek(+e.target.value)}
        />
      </label>
      <div className="flex flex-wrap gap-2">
        <button
          className={control}
          type="button"
          data-play
          disabled={trace.reduced}
          onClick={trace.toggle}
        >
          {trace.playing ? "暂停" : "播放"}
        </button>
        <button
          className={control}
          type="button"
          onClick={() => trace.seek((trace.cursor + 1) % (trace.max + 1))}
        >
          单步
        </button>
      </div>
      {trace.reduced && (
        <p className="text-sm text-secondary">
          已尊重减少动态效果：自动播放停用，可拖进度或单步。
        </p>
      )}
    </div>
  );
}
function Frame({
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
      className="not-prose my-6 min-w-0 space-y-4 rounded-xl border border-border bg-elevated p-3 sm:p-5"
    >
      <h3 className="text-lg font-semibold text-primary">{title}</h3>
      {children}
    </section>
  );
}
function Actions({
  fault,
  setFault,
  reset,
}: {
  fault: boolean;
  setFault: (value: boolean) => void;
  reset: () => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        className={control}
        data-fault
        aria-pressed={fault}
        onClick={() => setFault(!fault)}
      >
        {fault ? "撤销故障" : "注入故障"}
      </button>
      <button type="button" className={control} data-reset onClick={reset}>
        完整重置
      </button>
    </div>
  );
}
const fmt = (v: number) => v.toFixed(3);
const rad = (v: number) => (v * Math.PI) / 180;

export function Llm10BiasToxicityContextContractLab() {
  const [angle, setAngle] = useState(35);
  const [layout, setLayout] = useState("opposite");
  const [fault, setFault] = useState(false);
  const trace = useTrace(5, 0);
  const angles = [angle - 12, angle + 12, angle + 168, angle + 192];
  const points = angles.map((a) => [Math.cos(rad(a)), Math.sin(rad(a))]);
  const attributeB = layout === "opposite" ? [-1, 0] : [0, 1];
  const scores = points.map(
    ([x, y]) => x - (x * attributeB[0] + y * attributeB[1]),
  );
  const pairs = [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 2],
    [1, 3],
    [2, 3],
  ];
  const stats = pairs.map((pair) =>
    scores.reduce((s, v, i) => s + (pair.includes(i) ? v : -v), 0),
  );
  const mean = scores.reduce((s, v) => s + v, 0) / 4;
  const sd = Math.sqrt(scores.reduce((s, v) => s + (v - mean) ** 2, 0) / 4);
  const d = (scores[0] + scores[1] - scores[2] - scores[3]) / 2 / sd;
  const p = stats.filter((v) => v > stats[0] + 1e-10).length / 6;
  const reset = () => {
    setAngle(35);
    setLayout("opposite");
    setFault(false);
    trace.reset();
  };
  return (
    <Frame kind="weat-geometry-permutation" title="实验一 · 关联不是裁决">
      <p className="text-sm text-secondary">
        四个合成词：X＝芽一/芽二，Y＝芽三/芽四。属性A＝暖光、B＝清风。颜色只区分集合，不指代真实群体。
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm">
          方向角 θ＝{angle}°
          <input
            aria-label="方向角"
            className="h-11 w-full accent-accent"
            type="range"
            min="20"
            max="65"
            value={angle}
            onChange={(e) => setAngle(+e.target.value)}
          />
        </label>
        <label className="grid gap-1 text-sm">
          属性布局
          <select
            aria-label="属性布局"
            className={control}
            value={layout}
            onChange={(e) => setLayout(e.target.value)}
          >
            <option value="opposite">A · 反向属性</option>
            <option value="orthogonal">B · 正交属性</option>
          </select>
        </label>
      </div>
      <svg
        style={svgStyle}
        viewBox="0 0 300 248"
        role="img"
        aria-label="单位圆中的四个合成词与两条属性方向；夹角改变余弦关联"
      >
        <circle cx="150" cy="106" r="67" fill="none" stroke={C.line} />
        <path d="M50 106H247 M150 19V191" stroke={C.line} />
        <line
          x1="150"
          y1="106"
          x2="249"
          y2="106"
          stroke={C.warn}
          strokeWidth="2"
        />
        <text x="253" y="110" fill={C.warn}>
          A
        </text>
        {!fault ? (
          <>
            <line
              x1="150"
              y1="106"
              x2={150 + 99 * attributeB[0]}
              y2={106 - 86 * attributeB[1]}
              stroke={C.muted}
              strokeWidth="2"
            />
            <text
              x={layout === "opposite" ? 30 : 116}
              y={layout === "opposite" ? 110 : 23}
              fill={C.muted}
            >
              B
            </text>
          </>
        ) : (
          <>
            <circle
              cx="150"
              cy="106"
              r="8"
              fill="none"
              stroke={C.bad}
              strokeWidth="3"
            />
            <text x="160" y="130" fill={C.bad}>
              B＝零向量
            </text>
          </>
        )}
        {points.map(([x, y], i) => (
          <g key={i}>
            <line
              x1="150"
              y1="106"
              x2={150 + x * 67}
              y2={106 - y * 67}
              stroke={i < 2 ? C.a : C.b}
            />
            <circle
              cx={150 + x * 67}
              cy={106 - y * 67}
              r="5"
              fill={i < 2 ? C.a : C.b}
            />
            <text
              x={150 + x * (i % 2 === 0 ? 91 : 94)}
              y={110 - y * (i % 2 === 0 ? 91 : 94)}
              textAnchor="middle"
              fill={i < 2 ? C.a : C.b}
            >
              {i < 2 ? `X${i + 1}` : `Y${i - 1}`}
            </text>
          </g>
        ))}
        <text x="150" y="233" textAnchor="middle" fill={C.text}>
          s(w)＝cos(w,A) − cos(w,B)
        </text>
      </svg>
      <svg
        style={svgStyle}
        viewBox="0 0 300 128"
        role="img"
        aria-label="六种等大分组的精确置换统计量；实线是原始分组统计量"
      >
        <text x="12" y="19" fill={C.text}>
          6种分组；当前 X＝{pairs[trace.cursor].map((i) => i + 1).join(",")}
        </text>
        <line x1="26" y1="75" x2="274" y2="75" stroke={C.muted} />
        {[-8, 0, 8].map((v) => (
          <text
            key={v}
            x={150 + v * 15}
            y="116"
            textAnchor="middle"
            fill={C.muted}
          >
            {v}
          </text>
        ))}
        {!fault && (
          <>
            <line
              x1={150 + stats[0] * 15}
              y1="30"
              x2={150 + stats[0] * 15}
              y2="92"
              stroke={C.warn}
            />
            {stats.map((s, i) => (
              <circle
                key={i}
                cx={150 + s * 15}
                cy={45 + (i % 3) * 15}
                r={trace.cursor === i ? 6 : 4}
                fill={trace.cursor === i ? C.a : C.b}
              />
            ))}
          </>
        )}
        {fault && (
          <text x="150" y="59" textAnchor="middle" fill={C.bad}>
            属性无范数：拒绝计算
          </text>
        )}
      </svg>
      <output className="block text-sm" aria-live="polite" data-result>
        {fault
          ? "cos未定义；S、d、p均不可报告。"
          : `S＝${fmt(stats[0])}；d＝${fmt(d)}；严格右尾 p＝${fmt(p)}。当前置换 S＝${fmt(stats[trace.cursor])}。`}
      </output>
      <p className="text-sm text-secondary">
        这里 p 使用严格大于，不是
        ≥；只有6种分组，p＝0不意味着总体关联确定，也不意味着人群性质。d用四个s值的总体标准差。
      </p>
      <Timeline trace={trace} label="置换游标" />
      <Actions fault={fault} setFault={setFault} reset={reset} />
    </Frame>
  );
}

const records = [
  { group: "A", y: 0, score: 0.1 },
  { group: "A", y: 0, score: 0.35 },
  { group: "A", y: 0, score: 0.6 },
  { group: "A", y: 1, score: 0.4 },
  { group: "A", y: 1, score: 0.7 },
  { group: "A", y: 1, score: 0.9 },
  { group: "B", y: 0, score: 0.1 },
  { group: "B", y: 0, score: 0.2 },
  { group: "B", y: 0, score: 0.3 },
  { group: "B", y: 1, score: 0.45 },
  { group: "B", y: 1, score: 0.55 },
  { group: "B", y: 1, score: 0.8 },
];
export function Llm10BiasToxicityComputeTraceLab() {
  const [threshold, setThreshold] = useState(0.5);
  const [group, setGroup] = useState("A");
  const [fault, setFault] = useState(false);
  const trace = useTrace(12, 12);
  const rows = records.map((r, i) => ({
    ...r,
    score: r.score + (fault && i === 1 ? 0.25 : 0),
    i,
  }));
  const shown = rows.slice(0, trace.cursor).filter((r) => r.group === group);
  const counts = [0, 0, 0, 0]; // TN, FP, FN, TP
  shown.forEach((r) => counts[r.y * 2 + Number(r.score >= threshold)]++);
  const rate = (n: number, d: number) =>
    d ? `${n}/${d}＝${((100 * n) / d).toFixed(1)}%` : "未定义（分母0）";
  const reset = () => {
    setThreshold(0.5);
    setGroup("A");
    setFault(false);
    trace.reset();
  };
  return (
    <Frame
      kind="toxicity-threshold-matrix"
      title="实验二 · 同一阈值，谁被误判？"
    >
      <p className="text-sm text-secondary">
        12条合成记录，A/B各6条；y是预设标签，不是机器发现的真理。点的纵排表示标签，阈值右侧预测为1，点越线便换格。
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm">
          阈值 τ＝{threshold.toFixed(2)}
          <input
            aria-label="毒性阈值"
            className="h-11 w-full accent-accent"
            type="range"
            min=".2"
            max=".8"
            step=".05"
            value={threshold}
            onChange={(e) => setThreshold(+e.target.value)}
          />
        </label>
        <label className="grid gap-1 text-sm">
          查看组别
          <select
            aria-label="查看组别"
            className={control}
            value={group}
            onChange={(e) => setGroup(e.target.value)}
          >
            <option value="A">A · 合成组A</option>
            <option value="B">B · 合成组B</option>
          </select>
        </label>
      </div>
      <svg
        style={svgStyle}
        viewBox="0 0 300 345"
        role="img"
        aria-label={`组${group}的分数阈值线和真实标签乘预测标签的混淆矩阵`}
      >
        <text x="8" y="19" fill={C.text}>
          组{group}：已显示 {shown.length}/6 条
        </text>
        {[0, 1].map((y) => (
          <g key={y}>
            <text x="8" y={49 + y * 34} fill={C.muted}>
              y={y}
            </text>
            <line
              x1="49"
              y1={45 + y * 34}
              x2="278"
              y2={45 + y * 34}
              stroke={C.line}
            />
          </g>
        ))}
        <line
          x1={50 + threshold * 220}
          y1="27"
          x2={50 + threshold * 220}
          y2="99"
          stroke={C.warn}
          strokeWidth="2"
        />
        {shown.map((r) => (
          <circle
            key={r.i}
            cx={50 + r.score * 220}
            cy={45 + r.y * 34}
            r="6"
            fill={Number(r.score >= threshold) === r.y ? C.b : C.bad}
          />
        ))}
        <text x="50" y="118" fill={C.muted}>
          0
        </text>
        <text x="270" y="118" fill={C.muted}>
          1
        </text>
        <text x="150" y="118" textAnchor="middle" fill={C.warn}>
          分数 / τ
        </text>
        <text x="113" y="148" textAnchor="middle" fill={C.text}>
          预测0
        </text>
        <text x="233" y="148" textAnchor="middle" fill={C.text}>
          预测1
        </text>
        <text x="8" y="202" fill={C.text}>
          真0
        </text>
        <text x="8" y="285" fill={C.text}>
          真1
        </text>
        {["TN", "FP", "FN", "TP"].map((name, i) => (
          <g key={name}>
            <rect
              x={55 + (i % 2) * 120}
              y={160 + Math.floor(i / 2) * 83}
              width="116"
              height="78"
              rx="6"
              fill="none"
              stroke={i === 1 || i === 2 ? C.bad : C.b}
            />
            <text
              x={113 + (i % 2) * 120}
              y={187 + Math.floor(i / 2) * 83}
              textAnchor="middle"
              fill={C.muted}
            >
              {name}
            </text>
            <text
              x={113 + (i % 2) * 120}
              y={219 + Math.floor(i / 2) * 83}
              textAnchor="middle"
              fontSize="23"
              fill={C.text}
            >
              {counts[i]}
            </text>
          </g>
        ))}
        <text x="150" y="340" textAnchor="middle" fill={C.muted}>
          格子总和＝当前组已显示记录数
        </text>
      </svg>
      <output className="block text-sm" aria-live="polite" data-result>
        组{group}：FPR＝{rate(counts[1], counts[0] + counts[1])}；TPR＝
        {rate(counts[3], counts[2] + counts[3])}。
      </output>
      <p className="text-sm text-secondary">
        {fault
          ? "故障开启：仅A组第2条良性记录的分数从0.35变成0.60；标签不变。查看A组，τ＝0.50时FP由1变2。"
          : "绿色为判断相符，红色为误判。基线τ＝0.50：A组FPR=1/3，B组FPR=0/3；两组TPR均为2/3。"}{" "}
        这不是实测模型，也不能凭两项率决定公正。
      </p>
      <Timeline trace={trace} label="已观察记录" />
      <Actions fault={fault} setFault={setFault} reset={reset} />
    </Frame>
  );
}

export function Llm10BiasToxicityEvidenceGateLab() {
  const [angle, setAngle] = useState("0");
  const [fault, setFault] = useState(false);
  const trace = useTrace(10, 10);
  const c = Math.cos(rad(+angle)),
    s = Math.sin(rad(+angle));
  const w = [c * (fault ? 2 : 1), s * (fault ? 2 : 1)];
  const denominator = fault ? 1 : w[0] ** 2 + w[1] ** 2;
  const P = [
    [1 - w[0] ** 2 / denominator, (-w[0] * w[1]) / denominator],
    [(-w[1] * w[0]) / denominator, 1 - w[1] ** 2 / denominator],
  ];
  const original = [
    [-1, -1],
    [-1, 1],
    [1, -0.7],
    [1, 0.7],
  ];
  const alpha = trace.cursor / 10;
  const projected = original.map(([x, y]) => {
    const dot = (w[0] * x + w[1] * y) / denominator;
    return [x - alpha * w[0] * dot, y - alpha * w[1] * dot];
  });
  const residual = Math.max(
    ...projected.map(([x, y]) => Math.abs(c * x + s * y)),
  );
  const taskLoss =
    projected.reduce((sum, p, i) => sum + (p[1] - original[i][1]) ** 2, 0) / 4;
  // Fixed scale ±5 covers the malformed unnormalized projection as well.
  const px = (x: number) => 150 + x * 23;
  const py = (y: number) => 139 - y * 23;
  const reset = () => {
    setAngle("0");
    setFault(false);
    trace.reset();
  };
  return (
    <Frame
      kind="inlp-nullspace-projection"
      title="实验三 · 移除一个方向，留下什么？"
    >
      <p className="text-sm text-secondary">
        每个点是真实二维向量h；虚点为原始值、实点为当前值，连线显示位移。只演示INLP的一轮固定探针，不训练分类器，也不运行语言模型。
      </p>
      <label className="grid gap-1 text-sm">
        探针方向 φ
        <select
          aria-label="探针方向"
          className={control}
          value={angle}
          onChange={(e) => setAngle(e.target.value)}
        >
          <option value="0">A · 0°（与任务正交）</option>
          <option value="30">B · 30°（部分重叠）</option>
          <option value="60">C · 60°（高度重叠）</option>
        </select>
      </label>
      <svg
        style={svgStyle}
        viewBox="0 0 300 290"
        role="img"
        aria-label="二维向量沿探针方向移入零空间；错误投影会越过零空间而非消去分量"
      >
        <path d="M28 139H274 M150 27V252" stroke={C.line} />
        <text x="265" y="158" fill={C.muted}>
          x
        </text>
        <text x="159" y="29" fill={C.muted}>
          任务y
        </text>
        <line
          x1={px(-4.4 * s)}
          y1={py(4.4 * c)}
          x2={px(4.4 * s)}
          y2={py(-4.4 * c)}
          stroke={C.b}
          strokeWidth="2"
        />
        <line
          x1="150"
          y1="139"
          x2={px(3.6 * c)}
          y2={py(3.6 * s)}
          stroke={C.warn}
          strokeWidth="2"
        />
        <text x="12" y="20" fill={C.b}>
          绿线：零空间
        </text>
        <text x="12" y="275" fill={C.warn}>
          黄线：探针 w；α＝{alpha.toFixed(1)}
        </text>
        {original.map(([x, y], i) => (
          <g key={i}>
            <line
              x1={px(x)}
              y1={py(y)}
              x2={px(projected[i][0])}
              y2={py(projected[i][1])}
              stroke={C.muted}
              strokeDasharray="3 3"
            />
            <circle
              cx={px(x)}
              cy={py(y)}
              r="5"
              fill="none"
              stroke={i < 2 ? C.a : C.b}
            />
            <circle
              cx={px(projected[i][0])}
              cy={py(projected[i][1])}
              r="4"
              fill={fault ? C.bad : i < 2 ? C.a : C.b}
            />
          </g>
        ))}
      </svg>
      <div className="grid gap-2 text-sm" data-result aria-live="polite">
        <p>
          P＝[[{fmt(P[0][0])}, {fmt(P[0][1])}], [{fmt(P[1][0])}, {fmt(P[1][1])}
          ]]
        </p>
        <p>
          最大探针残差＝{fmt(residual)}；任务y均方变化＝{fmt(taskLoss)}。
        </p>
        <p>
          首点 (−1,−1) → ({fmt(projected[0][0])}, {fmt(projected[0][1])})
        </p>
      </div>
      <p className="text-sm text-secondary">
        {fault
          ? "故障：把w放大2倍，却漏除wᵀw；P不再是正交投影，α＝1也不能归零。"
          : alpha < 1
            ? "尚在位移途中：hα＝(1−α)h＋αPh，不应标为已去除方向。"
            : "这一探针的线性分量已消去；旋转φ会同时损伤任务y。残差为0不等于所有群体信息消失。"}{" "}
        即便φ＝0，原始y幅度仍可区分两组，这是非线性残余的合成反例。
      </p>
      <Timeline trace={trace} label="投影进度" />
      <Actions fault={fault} setFault={setFault} reset={reset} />
    </Frame>
  );
}
