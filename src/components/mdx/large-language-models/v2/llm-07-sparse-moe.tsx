"use client";

import { useState } from "react";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "@/components/mdx/anim/use-teaching-timeline";
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
const shell =
  "not-prose my-6 min-w-0 rounded-xl border border-border bg-elevated p-3 text-primary sm:p-5 [&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11 [&_input]:min-w-11 [&_select]:min-h-11 [&_select]:min-w-11 [&_:focus-visible]:outline-2 [&_:focus-visible]:outline-offset-2 [&_:focus-visible]:outline-accent [&_.mt-4.flex]:flex-wrap";
const control =
  "min-h-11 w-full min-w-11 rounded border border-border bg-bg px-2 py-2 text-sm text-primary";
const button = "min-h-11 rounded border border-border bg-bg px-3 py-2 text-sm";
const tokenSteps = Array.from({ length: 4 }, (_, i) => ({
  label: `词元 t${i}`,
}));
const bucketSteps = Array.from({ length: 8 }, (_, i) => ({
  label: `录取 t${i}`,
}));
const permutationSteps = ["打包发派", "专家计算", "逆置换返回"].map(
  (label) => ({ label }),
);
function useMoeTrace(steps: readonly TeachingStep[]) {
  return useTeachingTimeline({
    steps,
    build: (tl) => {
      const clock = { value: 0 };
      steps.forEach((s, i) => tl.label(s.label, i * 1000));
      tl.add(
        clock,
        { value: steps.length, duration: steps.length * 1000, ease: "linear" },
        0,
      );
    },
  });
}
function softmax(z: number[]) {
  const m = Math.max(...z);
  const es = z.map((v) => Math.exp(v - m));
  const sum = es.reduce((a, b) => a + b, 0);
  return es.map((v) => v / sum);
}
const BASE_LOGITS = [
  [3, 2, 0, -1],
  [0, 3, 2, -1],
  [0, 1, 3, 2],
  [2, 0, 1, 3],
];
function choose(p: number[], k: number, faulty = false) {
  return p
    .map((_, i) => i)
    .sort((a, b) => (faulty ? p[a] - p[b] : p[b] - p[a]) || a - b)
    .slice(0, k);
}
function combine(
  p: number[],
  selected: number[],
  x: number,
  normalize: boolean,
) {
  const scale = normalize ? selected.reduce((s, e) => s + p[e], 0) : 1;
  return selected.reduce((sum, e) => sum + (p[e] / scale) * (e + 1) * x, 0);
}

/** Rows are tokens, columns are experts. Sparse outlines encode selection, not attention. */
export function Llm07SparseMoeContextContractLab() {
  const [k, setK] = useState(2);
  const [bias, setBias] = useState(0);
  const [mode, setMode] = useState("by-k");
  const [fault, setFault] = useState(false);
  const trace = useMoeTrace(tokenSteps);
  const row = trace.currentStep;
  const probabilities = BASE_LOGITS.map((z) =>
    softmax(z.map((v, e) => v + (e === 0 ? bias : 0))),
  );
  const normalized = mode === "selected" || (mode === "by-k" && k === 2);
  const p = probabilities[row];
  const selected = choose(p, k, fault);
  const reference = choose(p, k);
  const y = combine(p, selected, row + 1, normalized);
  const correct = combine(p, reference, row + 1, normalized);
  function reset() {
    trace.seek(0);
    setK(2);
    setBias(0);
    setMode("by-k");
    setFault(false);
  }
  return (
    <section
      className={shell}
      data-visual-kind="router-probability-matrix"
      data-state={JSON.stringify({
        k,
        bias,
        mode,
        fault,
        row,
        progress: trace.progress,
        playing: trace.isPlaying,
      })}
    >
      <h3 className="text-lg font-semibold">实验一 · 哪些专家真正参与输出？</h3>
      <p className="my-2 text-sm text-secondary">
        先预测：k
        从2变1时，权重一定变成1吗？格内是全体专家上的概率，边框才是实际选择。
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm">
          每词元专家数 k
          <select
            aria-label="每词元专家数"
            className={control}
            value={k}
            onChange={(e) => setK(Number(e.target.value))}
          >
            <option value={1}>1 · top-1</option>
            <option value={2}>2 · top-2</option>
          </select>
        </label>
        <label className="text-sm">
          门值约定
          <select
            aria-label="门值约定"
            className={control}
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="by-k">A · 本页：top1保留，top2归一</option>
            <option value="selected">B · 反例：所选门值一律归一</option>
          </select>
        </label>
      </div>
      <label className="mt-3 block text-sm">
        专家 e0 的 logit 偏置：{bias}
        <input
          aria-label="专家零偏置"
          className="block w-full accent-accent"
          type="range"
          min={0}
          max={4}
          step={1}
          value={bias}
          onChange={(e) => setBias(Number(e.target.value))}
        />
      </label>
      <button
        type="button"
        className={button}
        data-fault="wrong-topk"
        aria-pressed={fault}
        onClick={() => setFault(!fault)}
      >
        {fault ? "撤销故障：恢复 top-k" : "故障：误选最低分专家"}
      </button>
      <svg
        viewBox="0 0 300 330"
        className="mx-auto w-full max-w-sm"
        role="img"
        aria-label="词元到专家概率矩阵，轮廓表示选中的专家，下方显示门值与加权贡献"
      >
        {[0, 1, 2, 3].map((e) => (
          <text
            key={e}
            x={75 + 55 * e}
            y={28}
            textAnchor="middle"
            fontSize={15}
            fill={C.muted}
          >
            e{e}
          </text>
        ))}
        {probabilities.map((ps, t) => (
          <g key={t}>
            <text
              x={10}
              y={69 + 44 * t}
              fontSize={15}
              fill={t === row ? C.accent : C.muted}
            >
              t{t}
            </text>
            {ps.map((v, e) => {
              const active = choose(ps, k, fault).includes(e);
              return (
                <g key={e}>
                  <rect
                    x={50 + 55 * e}
                    y={43 + 44 * t}
                    width={50}
                    height={37}
                    rx={4}
                    fill={C.accent}
                    fillOpacity={0.08 + 0.55 * v}
                    stroke={active ? (fault ? C.danger : C.accent) : C.border}
                    strokeWidth={active ? 2.5 : 1}
                  />
                  <text
                    x={75 + 55 * e}
                    y={67 + 44 * t}
                    textAnchor="middle"
                    fontSize={14}
                    fill={C.text}
                  >
                    {v.toFixed(2)}
                  </text>
                </g>
              );
            })}
            {t === row && (
              <path
                d={`M 36 ${51 + 44 * t} l 7 10 l -7 10`}
                fill="none"
                stroke={C.accent}
                strokeWidth={2}
              />
            )}
          </g>
        ))}
        <text x={12} y={245} fontSize={15} fill={C.text}>
          t{row}：x = {row + 1}，Eₑ(x) = (e+1)x
        </text>
        {selected.map((e, i) => {
          const g =
            p[e] / (normalized ? selected.reduce((s, j) => s + p[j], 0) : 1);
          return (
            <g key={e}>
              <text
                x={12}
                y={274 + 32 * i}
                fontSize={14}
                fill={fault ? C.danger : C.muted}
              >
                e{e} × {g.toFixed(3)}
              </text>
              <rect
                x={112}
                y={260 + 32 * i}
                width={170 * g}
                height={18}
                fill={C.accent}
              />
            </g>
          );
        })}
      </svg>
      <p className="text-sm" role="status" data-output>
        输出 y={y.toFixed(3)}；正确 top-k 参考={correct.toFixed(3)}；差=
        {Math.abs(y - correct).toFixed(3)}。
      </p>
      <p className="mt-2 text-sm text-secondary">
        {normalized
          ? "所选权重除以所选概率和。"
          : "保留全 softmax 概率：即使 top-1，门值也不等于1。"}{" "}
        标量专家仅为计算示意；本图不模拟容量裁剪。
      </p>
      <TimelineControls
        timeline={trace}
        reset={{ label: "完整重置", onClick: reset }}
      />
    </section>
  );
}

function capacityBatch(skew: boolean, collapse: boolean) {
  return Array.from({ length: 8 }, (_, t) => {
    const e = collapse ? 0 : skew ? (t < 6 ? 0 : t - 5) : t % 4;
    const p = softmax([0, 1, 2, 3].map((j) => (j === e ? 3 : 0)));
    return { t, e, p };
  });
}
/** Slot geometry is the actual bounded buffer; overflow tokens remain separately visible. */
export function Llm07SparseMoeComputeTraceLab() {
  const [factor, setFactor] = useState(1);
  const [skew, setSkew] = useState(false);
  const [fault, setFault] = useState(false);
  const trace = useMoeTrace(bucketSteps);
  const capacity = Math.ceil((factor * 8) / 4);
  const batch = capacityBatch(skew, fault);
  const buckets: number[][] = [[], [], [], []];
  const overflow: number[] = [];
  batch.slice(0, trace.currentStep + 1).forEach(({ t, e }) => {
    if (buckets[e].length < capacity) buckets[e].push(t);
    else overflow.push(t);
  });
  const frequencies = [0, 1, 2, 3].map(
    (e) => batch.filter((v) => v.e === e).length / 8,
  );
  const meanP = [0, 1, 2, 3].map(
    (e) => batch.reduce((s, v) => s + v.p[e], 0) / 8,
  );
  const aux = 4 * frequencies.reduce((s, f, e) => s + f * meanP[e], 0);
  const totalDropped = [0, 1, 2, 3].reduce(
    (s, e) => s + Math.max(0, frequencies[e] * 8 - capacity),
    0,
  );
  function reset() {
    trace.seek(0);
    setFactor(1);
    setSkew(false);
    setFault(false);
  }
  return (
    <section
      className={shell}
      data-visual-kind="capacity-token-buckets"
      data-state={JSON.stringify({
        factor,
        skew,
        fault,
        cursor: trace.currentStep,
        progress: trace.progress,
        playing: trace.isPlaying,
      })}
    >
      <h3 className="text-lg font-semibold">实验二 · 空桶不代表没有溢出</h3>
      <p className="my-2 text-sm text-secondary">
        先预测：8个词元都去e0，另3桶的空位能自动接住它们吗？单步或拖到末尾，查看逐个录取的结果。
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm">
          容量因子 c
          <select
            aria-label="容量因子"
            className={control}
            value={factor}
            onChange={(e) => setFactor(Number(e.target.value))}
          >
            <option value={0.5}>0.5 · 每桶1槽</option>
            <option value={1}>1 · 每桶2槽</option>
            <option value={2}>2 · 每桶4槽</option>
          </select>
        </label>
        <label className="text-sm">
          请求分布
          <select
            aria-label="请求分布"
            className={control}
            value={skew ? "skew" : "balanced"}
            onChange={(e) => setSkew(e.target.value === "skew")}
          >
            <option value="balanced">B · 均衡：每桶2次</option>
            <option value="skew">S · 偏斜：e0收到6次</option>
          </select>
        </label>
      </div>
      <button
        type="button"
        className={`${button} mt-3`}
        data-fault="router-collapse"
        aria-pressed={fault}
        onClick={() => setFault(!fault)}
      >
        {fault ? "撤销故障：恢复请求" : "故障：路由塌缩到 e0"}
      </button>
      <svg
        viewBox="0 0 300 360"
        className="mx-auto w-full max-w-sm"
        role="img"
        aria-label="四个有容量上限的专家桶，词元按顺序入槽，溢出的词元在下方独立显示"
      >
        <text x={12} y={28} fontSize={15} fill={C.text}>
          C = ceil({factor} × 8 / 4) = {capacity}
        </text>
        {buckets.map((ts, e) => (
          <g key={e}>
            <text
              x={44 + 70 * e}
              y={59}
              textAnchor="middle"
              fontSize={15}
              fill={C.muted}
            >
              e{e}
            </text>
            <path
              d={`M ${14 + 70 * e} 72 v ${capacity * 34 + 8} h 60 v -${capacity * 34 + 8}`}
              fill="none"
              stroke={C.accent}
              strokeWidth={2}
            />
            {Array.from({ length: capacity }, (_, s) => (
              <g key={s}>
                <rect
                  x={19 + 70 * e}
                  y={77 + 34 * s}
                  width={50}
                  height={28}
                  rx={3}
                  fill={ts[s] !== undefined ? C.accent : C.bg}
                  fillOpacity={ts[s] !== undefined ? 0.28 : 1}
                  stroke={C.border}
                />
                {ts[s] !== undefined && (
                  <text
                    x={44 + 70 * e}
                    y={97 + 34 * s}
                    textAnchor="middle"
                    fontSize={15}
                    fill={C.text}
                  >
                    t{ts[s]}
                  </text>
                )}
              </g>
            ))}
            <text
              x={44 + 70 * e}
              y={244}
              textAnchor="middle"
              fontSize={14}
              fill={C.muted}
            >
              {ts.length}/{capacity}
            </text>
          </g>
        ))}
        <path d="M 12 258 H 288" stroke={C.border} />
        <text
          x={12}
          y={281}
          fontSize={15}
          fill={overflow.length ? C.danger : C.muted}
        >
          overflow：{overflow.length} 个已跳过
        </text>
        {overflow.map((t, i) => (
          <g key={t}>
            <circle
              cx={30 + (i % 4) * 72}
              cy={304 + Math.floor(i / 4) * 32}
              r={14}
              fill={C.bg}
              stroke={C.danger}
            />
            <text
              x={30 + (i % 4) * 72}
              y={309 + Math.floor(i / 4) * 32}
              textAnchor="middle"
              fontSize={14}
              fill={C.text}
            >
              t{t}
            </text>
          </g>
        ))}
      </svg>
      <p className="text-sm" role="status" data-output>
        已处理 {trace.currentStep + 1}/8；当前溢出 {overflow.length}
        。整批预计跳过 {totalDropped}/8；L_balance={aux.toFixed(3)}（未乘α）。
      </p>
      <p className="mt-2 text-sm text-secondary">
        f（裁剪前）=[{frequencies.map((v) => v.toFixed(2)).join(", ")}]；P=[
        {meanP.map((v) => v.toFixed(2)).join(", ")}
        ]。按原词元顺序录取；跳过的是专家支路，不是删除词元。空闲专家不会在本规则下自动接单。
      </p>
      <TimelineControls
        timeline={trace}
        reset={{ label: "完整重置", onClick: reset }}
      />
    </section>
  );
}

/** pi[slot]=token; output[pi[slot]]=expertResult[slot]. No network speed is fabricated. */
export function Llm07SparseMoeEvidenceGateLab() {
  const [assignment, setAssignment] = useState("mixed");
  const [placement, setPlacement] = useState("contiguous");
  const [fault, setFault] = useState(false);
  const trace = useMoeTrace(permutationSteps);
  const experts =
    assignment === "mixed" ? [2, 0, 3, 1, 2, 0] : [0, 1, 2, 3, 0, 1];
  const device = (e: number) =>
    placement === "contiguous" ? Math.floor(e / 2) : e % 2;
  const pi = [0, 1, 2, 3, 4, 5].sort(
    (a, b) =>
      device(experts[a]) - device(experts[b]) ||
      experts[a] - experts[b] ||
      a - b,
  );
  const results = pi.map((t) => (experts[t] + 1) * (t + 1));
  const correct = experts.map((e, t) => (e + 1) * (t + 1));
  const restored = Array<number>(6).fill(0);
  pi.forEach((t, s) => {
    restored[fault ? s : t] = results[s];
  });
  const mismatches = restored.filter((v, t) => v !== correct[t]).length;
  const cross = experts.filter((e, t) => device(e) !== (t < 3 ? 0 : 1)).length;
  function reset() {
    trace.seek(0);
    setAssignment("mixed");
    setPlacement("contiguous");
    setFault(false);
  }
  return (
    <section
      className={shell}
      data-visual-kind="expert-parallel-permutation"
      data-state={JSON.stringify({
        assignment,
        placement,
        fault,
        stage: trace.currentStep,
        progress: trace.progress,
        playing: trace.isPlaying,
        pi,
        restored,
        correct,
      })}
    >
      <h3 className="text-lg font-semibold">实验三 · 返回的顺序不是输入顺序</h3>
      <p className="my-2 text-sm text-secondary">
        先预测：按设备、专家打包后，直接把第s个结果写回第s个词元，会错在哪里？左右原词元顺序固定，中间是发送槽。
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm">
          词元的专家分配
          <select
            aria-label="专家分配"
            className={control}
            value={assignment}
            onChange={(e) => setAssignment(e.target.value)}
          >
            <option value="mixed">M · 交叉：2,0,3,1,2,0</option>
            <option value="striped">S · 轮转：0,1,2,3,0,1</option>
          </select>
        </label>
        <label className="text-sm">
          专家所在设备
          <select
            aria-label="专家设备布置"
            className={control}
            value={placement}
            onChange={(e) => setPlacement(e.target.value)}
          >
            <option value="contiguous">C · A: e0,e1 / B: e2,e3</option>
            <option value="interleaved">I · A: e0,e2 / B: e1,e3</option>
          </select>
        </label>
      </div>
      <button
        type="button"
        className={`${button} mt-3`}
        data-fault="missing-inverse"
        aria-pressed={fault}
        onClick={() => setFault(!fault)}
      >
        {fault ? "撤销故障：恢复逆置换" : "故障：返回时遗漏逆置换"}
      </button>
      <svg
        viewBox="0 0 300 390"
        className="mx-auto w-full max-w-sm"
        role="img"
        aria-label="专家并行发派与返回的置换编织图，左为原词元，中为按设备排序的发送槽，右为原顺序输出"
      >
        <text x={29} y={25} textAnchor="middle" fontSize={14} fill={C.muted}>
          输入
        </text>
        <text x={150} y={25} textAnchor="middle" fontSize={14} fill={C.muted}>
          槽 / 专家
        </text>
        <text x={270} y={25} textAnchor="middle" fontSize={14} fill={C.muted}>
          返回
        </text>
        {pi.map((t, s) => {
          const end = fault ? s : t;
          const bright = trace.currentStep >= 2;
          return (
            <g key={s}>
              <path
                d={`M 45 ${61 + t * 47} C 79 ${61 + t * 47}, 79 ${61 + s * 47}, 110 ${61 + s * 47}`}
                stroke={C.accent}
                strokeWidth={2}
                fill="none"
              />
              <path
                d={`M 192 ${61 + s * 47} C 224 ${61 + s * 47}, 224 ${61 + end * 47}, 254 ${61 + end * 47}`}
                stroke={fault ? C.danger : C.accent}
                strokeWidth={bright ? 2.5 : 1}
                strokeDasharray={bright ? undefined : "4 4"}
                opacity={bright ? 1 : 0.35}
                fill="none"
              />
              <rect
                x={111}
                y={44 + s * 47}
                width={80}
                height={34}
                rx={4}
                fill={C.bg}
                stroke={trace.currentStep === 1 ? C.accent : C.border}
              />
              <text
                x={151}
                y={58 + s * 47}
                fontSize={14}
                textAnchor="middle"
                fill={C.text}
              >
                {s}: t{t} / e{experts[t]}
              </text>
              <text
                x={151}
                y={73 + s * 47}
                fontSize={14}
                textAnchor="middle"
                fill={C.muted}
              >
                {device(experts[t]) === 0 ? "A" : "B"}
                {trace.currentStep >= 1 ? ` → ${results[s]}` : ""}
              </text>
            </g>
          );
        })}
        {[0, 1, 2, 3, 4, 5].map((t) => (
          <g key={t}>
            <circle
              cx={29}
              cy={61 + 47 * t}
              r={15}
              fill={C.panel}
              stroke={C.border}
            />
            <text
              x={29}
              y={66 + 47 * t}
              fontSize={14}
              textAnchor="middle"
              fill={C.text}
            >
              t{t}
            </text>
            <text
              x={270}
              y={66 + 47 * t}
              fontSize={14}
              textAnchor="middle"
              fill={
                trace.currentStep === 2 && restored[t] !== correct[t]
                  ? C.danger
                  : C.text
              }
            >
              {trace.currentStep >= 2 ? restored[t] : `t${t}`}
            </text>
          </g>
        ))}
        <text x={12} y={350} fontSize={14} fill={C.text}>
          π[s] = [{pi.join(", ")}]
        </text>
        <text x={12} y={375} fontSize={14} fill={C.muted}>
          发派跨设备：{cross}/6；返回沿反向路由
        </text>
      </svg>
      <p className="text-sm" role="status" data-output>
        {trace.currentStep < 2
          ? "尚未返回；虚线是待执行路径。"
          : `实际 y=[${restored.join(", ")}]；错位 ${mismatches}/6。`}{" "}
        参考 y=[{correct.join(", ")}]。
      </p>
      <p className="mt-2 text-sm text-secondary">
        原词元t0–t2在A，t3–t5在B。此图省略门权，只算
        Eₑ(t+1)=(e+1)(t+1)，不裁容量；top-2还需记录副本ID并按原词元加权归并。没有测量网络延迟或真实GPU速度。
      </p>
      <TimelineControls
        timeline={trace}
        reset={{ label: "完整重置", onClick: reset }}
      />
    </section>
  );
}
