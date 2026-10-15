"use client";

import { useState } from "react";
import { useTeachingTimeline } from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

const C = {
  bg: "var(--bg)",
  panel: "var(--bg-elevated)",
  border: "var(--border)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
};
const control =
  "min-h-11 min-w-11 rounded border border-border bg-bg px-3 py-2 text-sm text-primary";
const shell =
  "not-prose my-6 min-w-0 rounded-xl border border-border bg-bg-elevated p-3 text-primary sm:p-5 [&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11 [&_input]:min-w-11 [&_select]:min-h-11 [&_select]:min-w-11 [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-2 [&_button:focus-visible]:outline-accent [&_input:focus-visible]:outline-2 [&_input:focus-visible]:outline-accent [&_select:focus-visible]:outline-2 [&_select:focus-visible]:outline-accent [&_.mt-4.flex]:flex-wrap";
const STEPS = ["输入", "构造", "约束", "比较", "输出"].map((label) => ({
  label,
}));
function useTrace() {
  return useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      const clock = { value: 0 };
      STEPS.forEach((s, i) => tl.label(s.label, i * 1200));
      tl.add(clock, { value: 5, duration: 6000, ease: "linear" }, 0);
    },
  });
}
const fmt = (x: number) => (Number.isFinite(x) ? x.toFixed(2) : "−∞");
const dot = (a: number[], b: number[]) =>
  a.reduce((s, x, i) => s + x * b[i], 0);
function softmax(xs: number[]) {
  const m = Math.max(...xs);
  const e = xs.map((x) => Math.exp(x - m));
  const z = e.reduce((a, b) => a + b, 0);
  return e.map((x) => x / z);
}
const Q = [
  [1, 0],
  [0, 1],
  [1, 1],
];
const K = [
  [1, 0],
  [0, 1],
  [1, -1],
];
const V = [
  [1, 0],
  [0, 2],
  [2, 1],
];
function Matrix({
  title,
  values,
  row,
  weights = false,
}: {
  title: string;
  values: number[][];
  row: number;
  weights?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 300 330"
      className="mx-auto w-full max-w-sm"
      role="img"
      aria-label={`${title}，行是query，列是key；高亮第${row + 1}行`}
    >
      <text x="12" y="27" fontSize="16" fill={C.text}>
        {title}
      </text>
      {[0, 1, 2].map((j) => (
        <text
          key={j}
          x={91 + j * 76}
          y="60"
          textAnchor="middle"
          fontSize="14"
          fill={C.muted}
        >
          K{j + 1}
        </text>
      ))}
      {values.map((r, i) => (
        <g key={i}>
          <text
            x="11"
            y={104 + i * 64}
            fontSize="14"
            fill={i === row ? C.accent : C.muted}
          >
            Q{i + 1}
          </text>
          {r.map((x, j) => (
            <g key={j}>
              <rect
                x={56 + j * 76}
                y={76 + i * 64}
                width="70"
                height="52"
                rx="5"
                fill={C.bg}
                stroke={i === row ? C.accent : C.border}
                strokeWidth={i === row ? 2 : 1}
              />
              {weights && (
                <rect
                  x={60 + j * 76}
                  y={118 + i * 64}
                  width={62 * x}
                  height="6"
                  fill={C.accent}
                />
              )}
              <text
                x={91 + j * 76}
                y={106 + i * 64}
                textAnchor="middle"
                fontSize="16"
                fill={Number.isFinite(x) ? C.text : C.danger}
              >
                {fmt(x)}
              </text>
            </g>
          ))}
        </g>
      ))}
      <text x="12" y="295" fontSize="14" fill={C.muted}>
        {weights ? "短条长度 = 该key的概率" : "分数不是概率；−∞不参与归一化"}
      </text>
      <text x="12" y="318" fontSize="14" fill={C.muted}>
        {weights
          ? "每行和 = 1.00；0.00可能是舍入"
          : "行高亮只选择观察对象，不改计算"}
      </text>
    </svg>
  );
}

export function Llm03TransformerContextContractLab() {
  const [scale, setScale] = useState(1);
  const [mode, setMode] = useState("causal");
  const [row, setRow] = useState(0);
  const [fault, setFault] = useState(false);
  const tl = useTrace();
  const scores = Q.map((q) => K.map((k) => (scale * dot(q, k)) / Math.sqrt(2)));
  const masked = scores.map((r, i) =>
    r.map((s, j) =>
      mode === "encoder" || (fault ? j >= i : j <= i) ? s : -Infinity,
    ),
  );
  const a = masked.map(softmax);
  const out = [0, 1].map((d) => a[row].reduce((s, x, j) => s + x * V[j][d], 0));
  const leak = a[row].slice(row + 1).reduce((s, x) => s + x, 0);
  const reset = () => {
    tl.pause();
    tl.seek(0);
    setScale(1);
    setMode("causal");
    setRow(0);
    setFault(false);
  };
  return (
    <section
      className={shell}
      data-lab="attention"
      data-visual-kind="qk-mask-softmax-matrices"
      aria-label="注意力矩阵实验"
      data-state={JSON.stringify({
        scale,
        mode,
        row,
        fault,
        step: tl.currentStep,
        playing: tl.isPlaying,
        progress: tl.progress,
      })}
    >
      <h3 className="mb-3 text-lg font-semibold">
        实验一 · 看见每个注意力权重的来历
      </h3>
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="grid gap-1 text-sm">
          Q倍数 {scale.toFixed(1)}
          <input
            aria-label="Q倍数"
            type="range"
            min="0.5"
            max="2"
            step="0.5"
            value={scale}
            onChange={(e) => setScale(+e.target.value)}
          />
        </label>
        <label className="grid gap-1 text-sm">
          连接范围
          <select
            className={control}
            aria-label="连接范围"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="causal">因果</option>
            <option value="encoder">双向编码器</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          观察query
          <select
            className={control}
            aria-label="观察query"
            value={row}
            onChange={(e) => setRow(+e.target.value)}
          >
            {[0, 1, 2].map((i) => (
              <option key={i} value={i}>
                Q{i + 1}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="my-3 text-sm">
        Q = [{Q.map((q) => `(${q.join(",")})`).join(" ")}] × {scale}；K = [(1,0)
        (0,1) (1,−1)]；V = [(1,0) (0,2) (2,1)]。三个位置均为二维向量。
      </p>
      <button
        className={control}
        aria-pressed={fault}
        onClick={() => setFault(!fault)}
      >
        {fault ? "恢复正确掩码" : "注入反向掩码"}
      </button>
      <p className="mt-2 text-sm" role="status">
        {mode === "encoder"
          ? "双向模式本就允许未来位置；掩码故障不适用。切回因果查看泄漏。"
          : `未来权重总和 ${leak.toFixed(3)}；${fault ? "故障：j≥i，允许未来" : "参考：j≤i，禁止未来"}`}
      </p>
      <div className="mt-3 grid gap-2 md:grid-cols-2">
        <Matrix
          title={tl.currentStep < 2 ? "S = QKᵀ / √2" : "S + mask"}
          values={tl.currentStep < 2 ? scores : masked}
          row={row}
        />
        <Matrix title="A = softmax(S + mask)" values={a} row={row} weights />
      </div>
      <p className="rounded border border-border p-3 text-sm" data-result>
        O{row + 1} = {a[row].map((x, j) => `${fmt(x)}·V${j + 1}`).join(" + ")} =
        ({out.map(fmt).join(", ")})。
        {tl.currentStep < 4
          ? "输出预览；末步聚焦V加权和。"
          : "这是值向量的加权和，不是概率最大的token。"}
      </p>
      <TimelineControls
        timeline={tl}
        caption={
          [
            "读取固定Q、K、V",
            "计算所有成对分数",
            "只在softmax之前屏蔽",
            "逐行归一化；比较未来权重",
            "按权重聚合V",
          ][tl.currentStep]
        }
        reset={{ label: "完整重置", onClick: reset }}
      />
    </section>
  );
}

export function Llm03TransformerComputeTraceLab() {
  const [pos, setPos] = useState(1);
  const [delta, setDelta] = useState(2);
  const [shift, setShift] = useState(2);
  const [omega, setOmega] = useState(0.5);
  const [fault, setFault] = useState(false);
  const tl = useTrace();
  const base = tl.currentStep >= 3 ? shift : 0;
  const theta = omega * (pos + base);
  const phi = omega * (pos + delta + base + (fault ? 1 : 0));
  const actual = Math.cos(phi - theta),
    ref = Math.cos(omega * delta);
  const point = (t: number) => [150 + 90 * Math.cos(t), 153 - 90 * Math.sin(t)];
  const reset = () => {
    tl.pause();
    tl.seek(0);
    setPos(1);
    setDelta(2);
    setShift(2);
    setOmega(0.5);
    setFault(false);
  };
  return (
    <section
      className={shell}
      data-lab="position"
      data-visual-kind="sinusoidal-position-geometry"
      aria-label="位置相位几何实验"
      data-state={JSON.stringify({
        pos,
        delta,
        shift,
        omega,
        fault,
        step: tl.currentStep,
        playing: tl.isPlaying,
        progress: tl.progress,
      })}
    >
      <h3 className="mb-3 text-lg font-semibold">
        实验二 · 绝对相位怎样保留相对位移
      </h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid text-sm">
          位置 p = {pos}
          <input
            aria-label="位置p"
            type="range"
            min="0"
            max="6"
            value={pos}
            onChange={(e) => setPos(+e.target.value)}
          />
        </label>
        <label className="grid text-sm">
          位移 Δ = {delta}
          <input
            aria-label="位移delta"
            type="range"
            min="1"
            max="4"
            value={delta}
            onChange={(e) => setDelta(+e.target.value)}
          />
        </label>
        <label className="grid text-sm">
          共同平移 s = {shift}
          <input
            aria-label="共同平移"
            type="range"
            min="0"
            max="5"
            value={shift}
            onChange={(e) => setShift(+e.target.value)}
          />
        </label>
        <label className="grid gap-1 text-sm">
          角频率 ω
          <select
            className={control}
            aria-label="角频率"
            value={omega}
            onChange={(e) => setOmega(+e.target.value)}
          >
            <option value="0.25">0.25（低频）</option>
            <option value="0.5">0.5</option>
            <option value="1">1（高频）</option>
          </select>
        </label>
      </div>
      <button
        className={`${control} mt-3`}
        aria-pressed={fault}
        onClick={() => setFault(!fault)}
      >
        {fault ? "恢复位置对齐" : "注入K位置多1"}
      </button>
      <svg
        viewBox="0 0 300 350"
        className="mx-auto w-full max-w-sm"
        role="img"
        aria-label="单位圆：实线Q相位，虚线K相位；淡线为平移后的Q参考位置"
      >
        <text x="12" y="26" fontSize="15" fill={C.text}>
          {tl.currentStep >= 3
            ? "共同平移后的相位"
            : "平移前相位（淡线预览平移）"}
        </text>
        <circle cx="150" cy="153" r="90" fill={C.bg} stroke={C.border} />
        <path d="M45 153H255 M150 48V258" stroke={C.border} />
        <line
          x1="150"
          y1="153"
          x2={point(omega * (pos + shift))[0]}
          y2={point(omega * (pos + shift))[1]}
          stroke={C.accent}
          strokeWidth="2"
          opacity="0.25"
        />
        <line
          x1="150"
          y1="153"
          x2={point(theta)[0]}
          y2={point(theta)[1]}
          stroke={C.accent}
          strokeWidth="4"
        />
        <circle
          cx={point(theta)[0]}
          cy={point(theta)[1]}
          r="5"
          fill={C.accent}
        />
        <line
          x1="150"
          y1="153"
          x2={point(phi)[0]}
          y2={point(phi)[1]}
          stroke={fault ? C.danger : C.text}
          strokeWidth="3"
          strokeDasharray="7 4"
        />
        <rect
          x={point(phi)[0] - 4}
          y={point(phi)[1] - 4}
          width="8"
          height="8"
          fill={fault ? C.danger : C.text}
        />
        <text x="12" y="280" fontSize="14" fill={C.accent}>
          实线 Q：θ = {theta.toFixed(2)} rad
        </text>
        <text x="12" y="305" fontSize="14" fill={fault ? C.danger : C.text}>
          虚线 K：φ = {phi.toFixed(2)} rad
        </text>
        <text x="12" y="332" fontSize="14" fill={C.muted}>
          横轴 cos，纵轴 sin；不含内容向量
        </text>
      </svg>
      <p
        className="rounded border border-border p-3 text-sm"
        data-result
        role="status"
      >
        参考 cos(ωΔ) = {ref.toFixed(4)}；实际点积 = {actual.toFixed(4)}；偏差 ={" "}
        {Math.abs(actual - ref).toFixed(4)}。
        {fault ? "K单独错位破坏相对关系。" : "共同平移改变箭头，不改变夹角。"}
      </p>
      <TimelineControls
        timeline={tl}
        caption={
          [
            "选定位置和频率",
            "Q相位由p决定",
            "K相位由p+Δ决定",
            "两者一起加s，观察旋转",
            "用点积检验夹角是否保持",
          ][tl.currentStep]
        }
        reset={{ label: "完整重置", onClick: reset }}
      />
    </section>
  );
}

const P = [0.5, 0.3, 0.2];
const TOKENS = ["A", "B", "C"];
function draw(p: number[], u: number) {
  let acc = 0;
  for (let i = 0; i < p.length; i++) {
    acc += p[i];
    if (u < acc) return i;
  }
  return p.length - 1;
}
function sampling(q: number[], fault: boolean) {
  const mass = P.map((p, i) => Math.min(p, q[i]));
  const beta = mass.reduce((a, b) => a + b, 0);
  const residue = P.map((p, i) => Math.max(0, p - q[i]));
  const z = residue.reduce((a, b) => a + b, 0);
  const correction = fault || z < 1e-12 ? P : residue.map((p) => p / z);
  return {
    beta,
    correction,
    marginal: mass.map((m, i) => m + (1 - beta) * correction[i]),
  };
}
export function Llm03TransformerEvidenceGateLab() {
  const [quality, setQuality] = useState("poor");
  const [windowSize, setWindow] = useState(3);
  const [prefix, setPrefix] = useState(2);
  const [fault, setFault] = useState(false);
  const tl = useTrace();
  const q = quality === "poor" ? [0.2, 0.2, 0.6] : [0.45, 0.35, 0.2];
  const { beta, correction, marginal } = sampling(q, fault);
  const proposals = [0.55, 0.9, 0.1]
    .slice(0, windowSize)
    .map((u) => draw(q, u));
  const uniforms = [0.7, 0.9, 0.9];
  const reject = proposals.findIndex(
    (x, i) => uniforms[i] > Math.min(1, P[x] / q[x]),
  );
  const n = reject < 0 ? windowSize : reject;
  const last = draw(reject < 0 ? P : correction, 0.6);
  const output = [...proposals.slice(0, n), last];
  const error = Math.max(...marginal.map((x, i) => Math.abs(x - P[i])));
  const phase = tl.currentStep;
  const reset = () => {
    tl.pause();
    tl.seek(0);
    setQuality("poor");
    setWindow(3);
    setPrefix(2);
    setFault(false);
  };
  return (
    <section
      className={shell}
      data-lab="inference"
      data-visual-kind="speculative-verification-kv-rollback"
      aria-label="精确投机采样与缓存实验"
      data-state={JSON.stringify({
        quality,
        windowSize,
        prefix,
        fault,
        step: phase,
        playing: tl.isPlaying,
        progress: tl.progress,
      })}
    >
      <h3 className="mb-3 text-lg font-semibold">
        实验三 · 先提案，后验证，再提交缓存
      </h3>
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="grid gap-1 text-sm">
          草稿分布
          <select
            className={control}
            aria-label="草稿分布"
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
          >
            <option value="poor">偏向C</option>
            <option value="close">接近目标</option>
          </select>
        </label>
        <label className="grid text-sm">
          窗口 γ = {windowSize}
          <input
            aria-label="投机窗口"
            type="range"
            min="1"
            max="3"
            value={windowSize}
            onChange={(e) => setWindow(+e.target.value)}
          />
        </label>
        <label className="grid text-sm">
          已有KV格数 = {prefix}
          <input
            aria-label="已有KV格数"
            type="range"
            min="2"
            max="6"
            value={prefix}
            onChange={(e) => setPrefix(+e.target.value)}
          />
        </label>
      </div>
      <button
        className={`${control} mt-3`}
        aria-pressed={fault}
        onClick={() => setFault(!fault)}
      >
        {fault ? "恢复残差校正分布" : "注入拒绝后直接抽p"}
      </button>
      <p className="my-3 text-sm">
        词表 A/B/C；目标 p = (0.50, 0.30, 0.20)；草稿 q = (
        {q.map(fmt).join(", ")}
        )。为可复核，每个位置都固定同一p/q；这不是逐前缀语言模型。
      </p>
      <div className="grid gap-2 md:grid-cols-2">
        <svg
          viewBox="0 0 300 360"
          className="mx-auto w-full max-w-sm"
          role="img"
          aria-label="草稿提案、目标验证、提交与回滚三条轨道，格子不是耗时比例"
        >
          <text x="12" y="26" fontSize="16" fill={C.text}>
            一批验证 · 非时间比例图
          </text>
          <text x="12" y="55" fontSize="14" fill={C.muted}>
            q串行提案（固定u逐格抽样）
          </text>
          {proposals.map((x, i) => (
            <g key={i} opacity={phase >= 1 ? 1 : 0.35}>
              <rect
                x={20 + i * 90}
                y="68"
                width="76"
                height="40"
                rx="4"
                fill={C.bg}
                stroke={C.accent}
              />
              <text
                x={58 + i * 90}
                y="94"
                textAnchor="middle"
                fontSize="16"
                fill={C.text}
              >
                {TOKENS[x]}
              </text>
              <text
                x={58 + i * 90}
                y="133"
                textAnchor="middle"
                fontSize="14"
                fill={C.muted}
              >
                a={Math.min(1, P[x] / q[x]).toFixed(2)}
              </text>
              <text
                x={58 + i * 90}
                y="155"
                textAnchor="middle"
                fontSize="14"
                fill={C.muted}
              >
                u={uniforms[i]}
              </text>
            </g>
          ))}
          <text x="12" y="184" fontSize="14" fill={C.text}>
            p并行验证 {windowSize + 1} 个前缀位置
          </text>
          <path
            d="M20 200H275"
            stroke={C.accent}
            strokeWidth={phase === 2 ? 5 : 2}
          />
          <text
            x="12"
            y="228"
            fontSize="14"
            fill={reject < 0 ? C.accent : C.danger}
          >
            {reject < 0
              ? "全部接受：再从p抽1个"
              : `第${reject + 1}格拒绝：回滚该格及后缀`}
          </text>
          <text x="12" y="255" fontSize="14" fill={C.text}>
            保留 {n} 个提案；补抽 {TOKENS[last]}
          </text>
          <text x="12" y="284" fontSize="14" fill={C.muted}>
            r = ({correction.map(fmt).join(", ")})
          </text>
          <text x="12" y="311" fontSize="14" fill={C.text}>
            最终token：{output.map((x) => TOKENS[x]).join(" → ")}
          </text>
          <text x="12" y="342" fontSize="14" fill={C.muted}>
            补抽u=0.60；均非计时或随机实验
          </text>
        </svg>
        <svg
          viewBox="0 0 300 360"
          className="mx-auto w-full max-w-sm"
          role="img"
          aria-label="单步输出边际分布：目标p与按接受拒绝枚举得到的分布对照"
        >
          <text x="12" y="26" fontSize="16" fill={C.text}>
            单步边际 · 枚举概率质量
          </text>
          <text x="12" y="55" fontSize="14" fill={C.muted}>
            实条：目标p；轮廓：算法输出
          </text>
          {P.map((p, i) => (
            <g key={i}>
              <text x="12" y={96 + i * 75} fontSize="16" fill={C.text}>
                {TOKENS[i]}
              </text>
              <rect
                x="45"
                y={77 + i * 75}
                width={p * 330}
                height="16"
                fill={C.accent}
              />
              <rect
                x="45"
                y={99 + i * 75}
                width={marginal[i] * 330}
                height="16"
                fill={C.bg}
                stroke={fault ? C.danger : C.text}
                strokeWidth="2"
              />
              <text x="220" y={96 + i * 75} fontSize="14" fill={C.text}>
                {p.toFixed(2)}
              </text>
              <text
                x="220"
                y={117 + i * 75}
                fontSize="14"
                fill={fault ? C.danger : C.text}
              >
                {marginal[i].toFixed(2)}
              </text>
            </g>
          ))}
          <text x="12" y="318" fontSize="14" fill={C.text}>
            总体接受率 β = {beta.toFixed(2)}
          </text>
          <text x="12" y="345" fontSize="14" fill={fault ? C.danger : C.accent}>
            max|输出−p| = {error.toFixed(3)}
          </text>
        </svg>
      </div>
      <div className="rounded border border-border p-3">
        <p className="mb-2 text-sm">
          KV格（每格代表该token所有层的K/V，不是字节）：
        </p>
        <div className="flex flex-wrap gap-2" aria-label="缓存格">
          {Array.from({ length: prefix }, (_, i) => (
            <span
              key={`old${i}`}
              className="rounded border border-border px-3 py-2 text-sm"
            >
              旧{i + 1}
            </span>
          ))}
          {phase >= 1 &&
            proposals.map((x, i) => (
              <span
                key={i}
                className="rounded border px-3 py-2 text-sm"
                style={{
                  borderColor: phase >= 3 && i >= n ? C.danger : C.accent,
                  textDecoration:
                    phase >= 3 && i >= n ? "line-through" : "none",
                }}
              >
                {TOKENS[x]}
                {phase >= 3 ? (i < n ? " 已提交" : " 丢弃") : " 暂存"}
              </span>
            ))}
        </div>
        <p className="mt-2 text-sm" data-result role="status">
          {phase >= 4
            ? `有效KV格=${prefix + n}；补抽${TOKENS[last]}尚无KV，下次前向写入。`
            : `初始${prefix}格；末步显示有效缓存长度。`}{" "}
          {fault
            ? `故障边际误差${error.toFixed(3)}。`
            : "正确校正使单步边际等于p。"}
        </p>
      </div>
      <TimelineControls
        timeline={tl}
        caption={
          [
            "先读固定p/q与已有KV",
            "草稿依次抽γ个提案",
            "一次批验证，仍计算γ+1个位置",
            "拒绝处截断；删除未提交KV",
            "保留接受前缀，补抽token等待下次写KV",
          ][phase]
        }
        reset={{ label: "完整重置", onClick: reset }}
      />
    </section>
  );
}
