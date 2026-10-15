"use client";

import { useState } from "react";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "@/components/mdx/anim/use-teaching-timeline";

const accent = "var(--accent)";
const ink = "var(--text-primary)";
const muted = "var(--text-secondary)";
const border = "var(--border)";
const panel =
  "not-prose my-8 rounded-xl border border-border p-3 sm:p-5 text-primary lsl02-lab";
const control =
  "min-h-11 min-w-11 rounded border border-border px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const stepsA: TeachingStep[] = [
  { label: "嵌入加位置" },
  { label: "投影QKV" },
  { label: "掩码与softmax" },
  { label: "加权输出" },
];
const stepsB: TeachingStep[] = [
  { label: "输入向量" },
  { label: "前馈变换" },
  { label: "残差相加" },
  { label: "块输出" },
];
const stepsC: TeachingStep[] = [
  { label: "第1个前缀" },
  { label: "第2个前缀" },
  { label: "第3个前缀" },
  { label: "全部前缀" },
];
function useLabTimeline(steps: TeachingStep[]) {
  return useTeachingTimeline({
    steps,
    build: (tl) => {
      const clock = { value: 0 };
      steps.forEach((s, i) => {
        tl.label(s.label, i * 1000);
        tl.add(
          clock,
          { value: i + 1, duration: 1000, ease: "linear" },
          i * 1000,
        );
      });
    },
  });
}
function LocalStyle() {
  return (
    <style>{`.lsl02-lab button,.lsl02-lab select,.lsl02-lab input[type=range]{min-height:44px;min-width:44px}.lsl02-lab svg{width:100%;max-width:440px;height:auto;margin:auto;display:block}.lsl02-lab svg text{font-family:ui-monospace,monospace;font-size:15px;fill:var(--text-primary)}.lsl02-lab button:focus-visible,.lsl02-lab input:focus-visible,.lsl02-lab select:focus-visible{outline:2px solid var(--accent);outline-offset:2px}.lsl02-lab p{overflow-wrap:anywhere}.lsl02-lab select{max-width:100%;background:var(--bg-primary);color:var(--text-primary)}article:has(.lsl02-lab) .mdx-answer>button{min-height:44px;min-width:44px}@media(max-width:640px){article:has(.lsl02-lab) .mdx-term [role=tooltip]{position:fixed;top:auto;bottom:1rem;left:50%;max-width:min(20rem,calc(100vw - 2rem))}}`}</style>
  );
}
const fmt = (v: number) => v.toFixed(3);
function softmax(v: number[]) {
  const max = Math.max(...v);
  const e = v.map((x) => Math.exp(x - max));
  const z = e.reduce((a, b) => a + b, 0);
  return e.map((x) => x / z);
}

export function Lsl02LlmFoundationsContextContractLab() {
  const [query, setQuery] = useState(1);
  const [position, setPosition] = useState(true);
  const [causal, setCausal] = useState(true);
  const tl = useLabTimeline(stepsA);
  const E = [
    [1, 0],
    [0, 1],
    [1, 1],
  ];
  const X = E.map((e, i) => [e[0] + (position ? i / 2 : 0), e[1]]);
  const V = X.map((x) => [x[0], 2 * x[1]]);
  const S = X.map((q) =>
    X.map((k) => (q[0] * k[0] + q[1] * k[1]) / Math.sqrt(2)),
  );
  const A = S.map((s, i) =>
    softmax(s.map((x, j) => (causal && j > i ? -Infinity : x))),
  );
  const output = [0, 1].map((d) =>
    A[query].reduce((sum, w, j) => sum + w * V[j][d], 0),
  );
  const reset = () => {
    setQuery(1);
    setPosition(true);
    setCausal(true);
    tl.seek(0);
  };
  return (
    <section
      className={panel}
      data-visual-kind="embedding-qkv-causal-softmax"
      aria-label="实验A：从嵌入到因果注意力的数值计算"
    >
      <LocalStyle />
      <h4 className="text-lg font-semibold">实验 A · 谁能参与加权？</h4>
      <p className="my-3 text-sm">
        固定 WQ=WK=I，WV=diag(1,2)。P 是手设位置偏移，不是正弦编码或 RoPE。单头
        d=2。
      </p>
      <div className="flex flex-wrap gap-2">
        <label className="flex flex-wrap items-center gap-2">
          查询行
          <select
            aria-label="查询词元"
            className={control}
            value={query}
            onChange={(e) => setQuery(Number(e.target.value))}
          >
            {[0, 1, 2].map((i) => (
              <option key={i} value={i}>
                词元 {i + 1}
              </option>
            ))}
          </select>
        </label>
        <button
          className={control}
          aria-pressed={position}
          onClick={() => setPosition(!position)}
        >
          位置偏移：{position ? "开" : "关"}
        </button>
        <button
          className={control}
          aria-pressed={!causal}
          onClick={() => setCausal(!causal)}
        >
          未来泄漏：{causal ? "关" : "开"}
        </button>
      </div>
      <svg
        viewBox="0 0 330 650"
        role="img"
        aria-label={`查询${query + 1}，未来泄漏${causal ? "关闭" : "开启"}，权重${A[query].map(fmt).join("、")}，输出${output.map(fmt).join("、")}`}
      >
        <text x="10" y="26">
          E + P = X = Q = K
        </text>
        {X.map((x, i) => (
          <g key={i} opacity={i === query ? 1 : 0.65}>
            <text x="10" y={59 + i * 32}>
              {i + 1}
            </text>
            <rect
              x="34"
              y={42 + i * 32}
              width={E[i][0] * 40}
              height="12"
              fill={accent}
            />
            <rect
              x={34 + E[i][0] * 40}
              y={42 + i * 32}
              width={(position ? i / 2 : 0) * 40}
              height="12"
              fill={muted}
            />
            <text x="125" y={59 + i * 32}>
              [{x.map(fmt).join(", ")}]
            </text>
          </g>
        ))}
        <g opacity={tl.currentStep >= 1 ? 1 : 0.45}>
          <text x="10" y="166">
            V = X WV
          </text>
          {V.map((v, i) => (
            <text x="18" y={193 + i * 24} key={i}>
              {i + 1}: [{v.map(fmt).join(", ")}]
            </text>
          ))}
        </g>
        <g opacity={tl.currentStep >= 2 ? 1 : 0.45}>
          <text x="10" y="279">
            A = softmax(S + mask)
          </text>
          {[0, 1, 2].map((j) => (
            <text key={j} x={88 + j * 78} y="307">
              k{j + 1}
            </text>
          ))}
          {A.map((row, i) => (
            <g key={i}>
              <text x="10" y={341 + i * 40}>
                q{i + 1}
              </text>
              {row.map((w, j) => (
                <g key={j}>
                  <rect
                    x={60 + j * 78}
                    y={318 + i * 40}
                    width="76"
                    height="38"
                    fill={accent}
                    fillOpacity={0.05 + 0.5 * w}
                    stroke={i === query ? accent : border}
                    strokeWidth={i === query ? 2 : 1}
                  />
                  <text x={67 + j * 78} y={342 + i * 40}>
                    {causal && j > i ? "×" : fmt(w)}
                  </text>
                </g>
              ))}
            </g>
          ))}
          <text x="10" y="461">
            当前行缩放分数 S：
          </text>
          <text x="10" y="485">
            [{S[query].map(fmt).join(", ")}]
          </text>
        </g>
        <g opacity={tl.currentStep >= 3 ? 1 : 0.45}>
          <text x="10" y="523">
            Σ Aij Vj = 输出
          </text>
          {output.map((x, d) => (
            <g key={d}>
              <text x="10" y={555 + d * 45}>
                d{d + 1}
              </text>
              <rect
                x="48"
                y={537 + d * 45}
                width={x * 75}
                height="21"
                fill={accent}
              />
              <text x="218" y={555 + d * 45}>
                {fmt(x)}
              </text>
            </g>
          ))}
        </g>
        <text x="10" y="638">
          × 为不可见；颜色深度表示权重
        </text>
      </svg>
      <p className="text-sm" aria-live="polite">
        {causal
          ? "因果模式：每行权重和为1，未来为0。"
          : "故障：训练预测下一词时读到了未来；编码已知源句时则允许双向。"}{" "}
        当前输出 [{output.map(fmt).join(", ")}]。
      </p>
      <TimelineControls
        timeline={tl}
        reset={{ label: "完整重置 A", onClick: reset }}
      />
    </section>
  );
}

function norm(x: number[], rms: boolean) {
  const mean = rms ? 0 : (x[0] + x[1]) / 2;
  const r = Math.sqrt(x.reduce((s, v) => s + (v - mean) ** 2, 0) / 2 + 1e-6);
  return x.map((v) => (v - mean) / r);
}
function ffn(x: number[]) {
  const h = [Math.max(0, x[0]), Math.max(0, x[1]), Math.max(0, x[0] - x[1])];
  return [h[0] / 2 + h[2] + 0.5, h[1] / 2 - h[2] - 0.5];
}
export function Lsl02LlmFoundationsComputeTraceLab() {
  const [pre, setPre] = useState(false);
  const [shift, setShift] = useState(0);
  const [broken, setBroken] = useState(false);
  const tl = useLabTimeline(stepsB);
  const x = [1 + shift, 3 + shift];
  const input = pre ? norm(x, true) : x;
  const f = ffn(input);
  const sum = f.map((v, i) => v + (broken ? 0 : x[i]));
  const y = pre ? sum : norm(sum, false);
  const points = [x, f, sum, y];
  const px = (v: number) => 32 + (v + 2) * 24;
  const py = (v: number) => 320 - (v + 2) * 24;
  const reset = () => {
    setPre(false);
    setShift(0);
    setBroken(false);
    tl.seek(0);
  };
  return (
    <section
      className={panel}
      data-visual-kind="token-ffn-residual-norm-geometry"
      aria-label="实验B：单词元FFN、残差与归一化几何"
    >
      <LocalStyle />
      <h4 className="text-lg font-semibold">实验 B · 加法和归一化不交换</h4>
      <div className="my-3 flex flex-wrap gap-2">
        <button
          className={control}
          aria-pressed={pre}
          onClick={() => setPre(!pre)}
        >
          {pre ? "pre-RMSNorm" : "post-LayerNorm"}
        </button>
        <button
          className={control}
          aria-pressed={broken}
          onClick={() => setBroken(!broken)}
        >
          删除残差：{broken ? "开" : "关"}
        </button>
        <label className="block w-full text-sm">
          输入平移 c={shift}
          <input
            className="block w-full accent-accent"
            aria-label="输入共同平移"
            type="range"
            min="0"
            max="2"
            step="1"
            value={shift}
            onChange={(e) => setShift(Number(e.target.value))}
          />
        </label>
      </div>
      <svg
        viewBox="0 0 330 675"
        role="img"
        aria-label={`${pre ? "前置RMSNorm" : "后置LayerNorm"}，输入${x}，FFN${f.map(fmt)}，残差和${sum.map(fmt)}，输出${y.map(fmt)}`}
      >
        <text x="10" y="25">
          二维分量平面（不是词义地图）
        </text>
        <path
          d={`M32 ${py(0)} H310 M${px(0)} 320 V50`}
          stroke={muted}
          fill="none"
        />
        {[-2, 0, 2, 4, 6, 8].map((v) => (
          <g key={v}>
            <text x={px(v) - 7} y="342">
              {v}
            </text>
            <text x="5" y={py(v) + 5}>
              {v}
            </text>
            <path
              d={`M${px(v)} 50 V320 M32 ${py(v)} H310`}
              stroke={border}
              fill="none"
            />
          </g>
        ))}
        <text x="281" y="367">
          d1
        </text>
        <text x="35" y="50">
          d2
        </text>
        {points.map((p, i) => (
          <g key={i} opacity={i <= tl.currentStep ? 1 : 0.25}>
            {i > 0 && (
              <path
                d={`M${px(points[i - 1][0])} ${py(points[i - 1][1])} L${px(p[0])} ${py(p[1])}`}
                stroke={accent}
                strokeWidth="2"
                strokeDasharray={i === 2 ? "5 3" : undefined}
              />
            )}
            <circle
              cx={px(p[0])}
              cy={py(p[1])}
              r={8 + i * 2}
              fill="none"
              stroke={accent}
              strokeWidth="2"
            />
            <text
              x={px(p[0]) + (i === 1 ? -25 : i === 3 ? -18 : 14)}
              y={py(p[1]) + (i === 3 ? 46 : i === 1 ? 24 : -14)}
            >
              {i + 1}
            </text>
          </g>
        ))}
        <text x="10" y="402">
          1 输入 x [{x.map(fmt).join(", ")}]
        </text>
        <text x="10" y="431">
          2 FFN [{f.map(fmt).join(", ")}]
        </text>
        <text x="10" y="460">
          3 相加 [{sum.map(fmt).join(", ")}]
        </text>
        <text x="10" y="489">
          4 输出 [{y.map(fmt).join(", ")}]
        </text>
        <text x="10" y="526">
          {pre ? "y = x + F(RMS(x))" : "y = LN(x + F(x))"}
        </text>
        <text x="10" y="554">
          FFN: 2 → 3 → 2，ReLU
        </text>
        {[x[0], f[0], sum[0], y[0]].map((v, i) => (
          <g key={i}>
            <rect
              x={42 + i * 72}
              y={v >= 0 ? 638 - v * 8 : 638}
              width="30"
              height={Math.abs(v) * 8}
              fill={accent}
              fillOpacity={0.4 + i * 0.15}
            />
            <text x={48 + i * 72} y="666">
              {i + 1}
            </text>
          </g>
        ))}
        <path d="M20 638 H318" stroke={muted} />
        <text x="10" y="583">
          下方柱高：d1 分量
        </text>
      </svg>
      <p className="text-sm" aria-live="polite">
        {broken
          ? "故障：直通的 x 消失。此例 post-LN 输入变成[1,1]，输出退化到[0,0]（c=0）。"
          : "虚线段是加回 x，不是再做一次 FFN。"}{" "}
        归一化参数 γ=1、β=0、ε=10⁻⁶。pre 模式仅比较顺序/RMS；仍用 toy
        ReLU，非完整 LLaMA。
      </p>
      <TimelineControls
        timeline={tl}
        reset={{ label: "完整重置 B", onClick: reset }}
      />
    </section>
  );
}

export function Lsl02LlmFoundationsEvidenceGateLab() {
  const [n, setN] = useState(4);
  const [heads, setHeads] = useState(4);
  const [cache, setCache] = useState(true);
  const [drop, setDrop] = useState(false);
  const tl = useLabTimeline(stepsC);
  const t = tl.currentStep === 3 ? n : Math.min(n, tl.currentStep + 1);
  const effectiveDrop = cache && drop;
  const retained = t - (effectiveDrop ? 1 : 0);
  const bytes = cache ? 2 * 2 * retained * heads * 2 * 2 : 0;
  const projections = cache ? t : (t * (t + 1)) / 2;
  const pairs = cache ? (t * (t + 1)) / 2 : (t * (t + 1) * (t + 2)) / 6;
  const reset = () => {
    setN(4);
    setHeads(4);
    setCache(true);
    setDrop(false);
    tl.seek(0);
  };
  return (
    <section
      className={panel}
      data-visual-kind="autoregressive-kv-cache-recompute"
      aria-label="实验C：自回归前缀重算与KV缓存布局"
    >
      <LocalStyle />
      <h4 className="text-lg font-semibold">
        实验 C · 时间换空间，谁共享 KV？
      </h4>
      <div className="my-3 flex flex-wrap gap-2">
        <label className="flex flex-wrap items-center gap-2">
          KV 头
          <select
            className={control}
            aria-label="KV头方案"
            value={heads}
            onChange={(e) => setHeads(Number(e.target.value))}
          >
            <option value="4">MHA · 4</option>
            <option value="1">MQA · 1</option>
            <option value="2">GQA · 2（补充）</option>
          </select>
        </label>
        <button
          className={control}
          aria-pressed={cache}
          onClick={() => {
            setCache(!cache);
            setDrop(false);
          }}
        >
          KV缓存：{cache ? "开" : "关"}
        </button>
        <button
          className={`${control} disabled:cursor-not-allowed disabled:opacity-50`}
          disabled={!cache}
          aria-pressed={effectiveDrop}
          onClick={() => setDrop(!drop)}
        >
          丢首词KV：{!cache ? "不适用" : effectiveDrop ? "开" : "关"}
        </button>
        <label className="block w-full text-sm">
          前缀长度 N={n}
          <input
            className="block w-full accent-accent"
            aria-label="前缀长度"
            type="range"
            min="1"
            max="8"
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
          />
        </label>
      </div>
      <svg
        viewBox="0 0 330 670"
        role="img"
        aria-label={`运行到前缀${t}，投影词元次数${projections}，缓存${bytes}字节，KV头${heads}`}
      >
        <text x="10" y="26">
          每行一次前向；每格一次词元投影
        </text>
        <text x="10" y="51">
          {cache ? "浅格：复用；实格：新投影" : "全实格：每次重投影整个前缀"}
        </text>
        {Array.from({ length: n }, (_, i) => (
          <g key={i} opacity={i < t ? 1 : 0.2}>
            <text x="10" y={82 + i * 27}>
              {i + 1}
            </text>
            {Array.from({ length: i + 1 }, (_, j) => (
              <rect
                key={j}
                x={48 + j * 31}
                y={64 + i * 27}
                width="26"
                height="23"
                fill={accent}
                fillOpacity={cache && j < i ? 0.12 : 0.8}
                stroke={border}
              />
            ))}
          </g>
        ))}
        <text x="10" y="307">
          已投影 {projections} 次 / QK对 {pairs}
        </text>
        <text x="10" y="337">
          每层KV存储：行=头，列=词元
        </text>
        <text x="10" y="363">
          每格 K(2维) + V(2维)，各2字节
        </text>
        {Array.from({ length: heads }, (_, h) => (
          <g key={h}>
            <text x="10" y={397 + h * 40}>
              h{h + 1}
            </text>
            {Array.from({ length: n }, (_, j) => (
              <g key={j}>
                <rect
                  x={48 + j * 31}
                  y={377 + h * 40}
                  width="26"
                  height="32"
                  fill={accent}
                  fillOpacity={
                    cache && j < t && !(effectiveDrop && j === 0) ? 0.65 : 0.03
                  }
                  stroke={border}
                />
                <path
                  d={`M${61 + j * 31} ${377 + h * 40} v32`}
                  stroke={border}
                />
                {effectiveDrop && j === 0 && (
                  <path
                    d={`M48 ${377 + h * 40} l26 32 m0 -32 l-26 32`}
                    stroke={ink}
                    strokeWidth="2"
                  />
                )}
              </g>
            ))}
          </g>
        ))}
        <text x="10" y="564">
          B=1，L=2，Hq=4，dh=2
        </text>
        <text x="10" y="591">
          2 × L × T × Hkv × dh × s
        </text>
        <text x="10" y="619">
          缓存占用 = {bytes} bytes
        </text>
        <text x="10" y="648">
          {effectiveDrop
            ? "× 丢失首词：不再等价全上下文"
            : cache
              ? "只存K/V，仍需读取全部历史KV"
              : "缓存0字节 ≠ 无临时激活内存"}
        </text>
      </svg>
      <p className="text-sm" aria-live="polite">
        当前 t={t}；
        {effectiveDrop
          ? "故障只画存储缺口；投影/QK计数仍为完整上下文基线，非截窗后的工作量。"
          : !cache
            ? "无缓存每次重算完整前缀；丢缓存故障不适用，已清空并禁用。投影/QK为完整上下文基线，不是实际GPU FLOPs。"
            : "投影按词元次数；QK对按单头、单层、仅因果允许位置累计，不是实际GPU FLOPs。"}{" "}
        缓存占用不含权重、Q、分数矩阵或分配器开销。GQA 是 MHA/MQA
        之间的分组推广，标作补充。
      </p>
      <TimelineControls
        timeline={tl}
        reset={{ label: "完整重置 C", onClick: reset }}
      />
    </section>
  );
}
