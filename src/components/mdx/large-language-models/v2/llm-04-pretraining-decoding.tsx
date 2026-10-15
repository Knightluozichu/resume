"use client";

import { useCallback, useState, type ReactNode } from "react";
import { useTeachingTimeline } from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

const C = {
  ink: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
  border: "var(--border)",
  bg: "var(--bg-elevated)",
};
const control =
  "min-h-11 w-full rounded border border-border bg-elevated px-2 text-sm text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const steps = [0, 1, 2, 3, 4].map((i) => ({ label: `row-${i}` }));
const samplingSteps = ["温度缩放", "截断集合", "CDF抽样"].map((label) => ({
  label,
}));
const treeSteps = ["起点", "保留前缀", "展开并排序"].map((label) => ({
  label,
}));

function Frame({
  id,
  visualKind,
  title,
  children,
}: {
  id: string;
  visualKind: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      data-lab={id}
      data-visual-kind={visualKind}
      aria-label={title}
      className="not-prose my-6 min-w-0 rounded-xl border border-border bg-elevated p-3 text-primary sm:p-5 [&_button]:min-h-11 [&_button]:min-w-11 [&_button]:focus-visible:outline-2 [&_button]:focus-visible:outline-offset-2 [&_button]:focus-visible:outline-accent [&_input]:min-h-11 [&_svg]:block [&_svg]:w-full"
    >
      <h3 className="mb-2 text-base font-semibold">{title}</h3>
      <p className="mb-4 text-sm text-secondary">
        固定表上的可复算 toy；没有加载、训练或调用真实语言模型。
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
function softmax(z: number[], temperature = 1) {
  const top = Math.max(...z);
  const a = z.map((v) => Math.exp((v - top) / temperature));
  const sum = a.reduce((x, y) => x + y, 0);
  return a.map((v) => v / sum);
}

export function Llm04PretrainingDecodingContextContractLab() {
  const [mode, setMode] = useState("clm");
  const [masked, setMasked] = useState(1);
  const [fault, setFault] = useState("none");
  const build = useCallback(
    (tl: Parameters<Parameters<typeof useTeachingTimeline>[0]["build"]>[0]) => {
      const clock = { row: 0 };
      steps.forEach((s, i) => tl.label(s.label, i * 950));
      tl.add(clock, { row: 5, duration: 4750, ease: "linear" }, 0);
    },
    [],
  );
  const timeline = useTeachingTimeline({ steps, build });
  const tokens = ["A", "B", "C", "D", "PAD"];
  const input = tokens.map((v, j) =>
    mode === "mlm" && j === masked && fault !== "leak" ? "M" : v,
  );
  const visible = tokens.map((_, i) =>
    tokens.map(
      (__, j) =>
        i < 4 && j < 4 && (mode === "mlm" || j <= i || fault === "leak"),
    ),
  );
  const mask = tokens.map(
    (_, i) =>
      (mode === "clm" ? i < 3 : i === masked) || (fault === "pad" && i === 4),
  );
  const targets = tokens.map((_, i) =>
    mode === "clm" ? Math.min(i + 1, 4) : i,
  );
  const probabilities = visible.map((row) =>
    softmax(
      tokens.map((_, v) =>
        row.reduce(
          (s, yes, j) => s + (yes && input[j] === tokens[v] ? 2 : 0),
          0,
        ),
      ),
    ),
  );
  const losses = probabilities.map((row, i) => -Math.log(row[targets[i]]));
  const count = mask.filter(Boolean).length;
  const loss = losses.reduce((s, v, i) => s + (mask[i] ? v : 0), 0) / count;
  const reset = () => {
    timeline.pause();
    timeline.seek(0);
    setMode("clm");
    setMasked(1);
    setFault("none");
  };
  return (
    <Frame
      id="objective"
      visualKind="visibility-loss-mask-matrix"
      title="实验一 · 看见谁，在哪一格付损失"
    >
      <div className="grid gap-3 sm:grid-cols-3">
        <Field label="目标">
          <select
            className={control}
            aria-label="目标"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="clm">CLM 预测下一词</option>
            <option value="mlm">MLM 还原遮盖词</option>
          </select>
        </Field>
        <Field label="MLM遮盖位置">
          <select
            className={control}
            aria-label="MLM遮盖位置"
            value={masked}
            onChange={(e) => setMasked(Number(e.target.value))}
          >
            {[0, 1, 2, 3].map((i) => (
              <option key={i} value={i}>
                {i + 1} · {tokens[i]}
              </option>
            ))}
          </select>
        </Field>
        <Field label="目标故障">
          <select
            className={control}
            aria-label="目标故障"
            value={fault}
            onChange={(e) => setFault(e.target.value)}
          >
            <option value="none">无故障</option>
            <option value="leak">泄漏答案</option>
            <option value="pad">PAD误计损失</option>
          </select>
        </Field>
      </div>
      <svg
        viewBox="0 0 300 380"
        role="img"
        aria-label={`可见性矩阵，1表示允许读取。输入${input.join(" ")}；损失掩码${mask.map(Number).join(" ")}；平均损失${loss.toFixed(4)}`}
        style={{
          maxWidth: 460,
          margin: "12px auto",
          fontSize: 14,
          fill: C.ink,
        }}
      >
        <text x="12" y="22">
          列：输入位置；行：查询位置
        </text>
        {input.map((token, j) => (
          <text key={j} x={69 + j * 37} y="52" textAnchor="middle">
            {token}
          </text>
        ))}
        {visible.map((row, i) => (
          <g key={i}>
            <text x="15" y={83 + i * 37}>
              {i + 1}
            </text>
            {row.map((v, j) => (
              <g key={j}>
                <rect
                  x={52 + j * 37}
                  y={60 + i * 37}
                  width="34"
                  height="34"
                  rx="3"
                  fill={v ? C.accent : C.bg}
                  fillOpacity={v ? 0.2 : 1}
                  stroke={timeline.currentStep === i ? C.accent : C.border}
                  strokeWidth={timeline.currentStep === i ? 2 : 1}
                />
                <text x={69 + j * 37} y={83 + i * 37} textAnchor="middle">
                  {Number(v)}
                </text>
              </g>
            ))}
          </g>
        ))}
        <text x="12" y="274">
          监督 m（不是注意力权重）
        </text>
        {mask.map((v, i) => (
          <g key={i}>
            <rect
              x={52 + i * 37}
              y="287"
              width="34"
              height="32"
              fill={v ? C.accent : C.bg}
              fillOpacity={v ? 0.2 : 1}
              stroke={C.border}
            />
            <text x={69 + i * 37} y="308" textAnchor="middle">
              {Number(v)}
            </text>
          </g>
        ))}
        <text x="12" y="346">
          平均 L = {loss.toFixed(4)}；计 {count} 行
        </text>
        <text x="12" y="369" fill={C.muted}>
          {fault === "none"
            ? "PAD不可见，且不参与监督"
            : fault === "leak"
              ? "错误：目标答案进入输入证据"
              : "错误：PAD行进入平均值"}
        </text>
      </svg>
      <p data-result className="text-sm" aria-live="polite">
        第{timeline.currentStep + 1}行：目标{" "}
        {tokens[targets[timeline.currentStep]]}；p ={" "}
        {probabilities[timeline.currentStep][
          targets[timeline.currentStep]
        ].toFixed(4)}
        ；负对数 = {losses[timeline.currentStep].toFixed(4)}；
        {mask[timeline.currentStep] ? "计入" : "不计入"}。总均值{" "}
        {loss.toFixed(4)}。
      </p>
      <TimelineControls
        timeline={timeline}
        caption="按查询行查看；MLM的遮盖位置不影响CLM。"
        reset={{ label: "完整重置", onClick: reset }}
      />
    </Frame>
  );
}

export function Llm04PretrainingDecodingComputeTraceLab() {
  const [temperature, setTemperature] = useState(1);
  const [rule, setRule] = useState("p75");
  const [u, setU] = useState(0.65);
  const [fault, setFault] = useState(false);
  const build = useCallback(
    (tl: Parameters<Parameters<typeof useTeachingTimeline>[0]["build"]>[0]) => {
      samplingSteps.forEach((s, i) => tl.label(s.label, i * 1100));
      tl.add({ value: 0 }, { value: 3, duration: 3300, ease: "linear" }, 0);
    },
    [],
  );
  const timeline = useTeachingTimeline({ steps: samplingSteps, build });
  const p = softmax([0.4, 0.3, 0.2, 0.1].map(Math.log), temperature);
  let n = p.length;
  if (rule.startsWith("k")) n = Number(rule.slice(1));
  if (rule.startsWith("p")) {
    const threshold = Number(rule.slice(1)) / 100;
    n = threshold === 1 ? p.length : 1;
    while (
      n < p.length &&
      p.slice(0, n).reduce((a, b) => a + b, 0) < threshold - 1e-12
    )
      n++;
  }
  const mass = p.slice(0, n).reduce((a, b) => a + b, 0);
  const q = p.map((v, i) => (i < n ? v / (fault ? 1 : mass) : 0));
  const cumulative = q.reduce((sum, value) => sum + value, 0);
  const cdf = q.map((_, i) => ({
    start: q.slice(0, i).reduce((sum, value) => sum + value, 0),
    end: q.slice(0, i + 1).reduce((sum, value) => sum + value, 0),
  }));
  const chosen = cdf.findIndex((c) => u >= c.start && u < c.end);
  const shown = timeline.currentStep === 0 ? p : q;
  const reset = () => {
    timeline.pause();
    timeline.seek(0);
    setTemperature(1);
    setRule("p75");
    setU(0.65);
    setFault(false);
  };
  return (
    <Frame
      id="sampling"
      visualKind="temperature-truncation-cdf"
      title="实验二 · 温度、截断与CDF落点"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label={`温度 T = ${temperature.toFixed(2)}`}>
          <input
            className="w-full accent-accent"
            aria-label="温度"
            type="range"
            min=".5"
            max="2"
            step=".25"
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
          />
        </Field>
        <Field label="截断规则">
          <select
            aria-label="截断规则"
            className={control}
            value={rule}
            onChange={(e) => setRule(e.target.value)}
          >
            <option value="full">不截断</option>
            <option value="k2">2词 · top-k = 2</option>
            <option value="k3">3词 · top-k = 3</option>
            <option value="p75">75% · top-p = 0.75</option>
            <option value="p90">90% · top-p = 0.90</option>
            <option value="p100">100% · top-p = 1.00</option>
          </select>
        </Field>
        <Field label={`固定抽样数 u = ${u.toFixed(2)}`}>
          <input
            aria-label="抽样数"
            className="w-full accent-accent"
            type="range"
            min="0"
            max=".99"
            step=".01"
            value={u}
            onChange={(e) => setU(Number(e.target.value))}
          />
        </Field>
        <button
          className={control}
          aria-pressed={fault}
          onClick={() => setFault(!fault)}
        >
          故障：{fault ? "未重归一化" : "关闭"}
        </button>
      </div>
      <svg
        viewBox="0 0 300 365"
        role="img"
        aria-label={`概率条与CDF。保留${n}个词，原质量${mass.toFixed(4)}，新质量${cumulative.toFixed(4)}，抽样${chosen < 0 ? "落空" : "ABCD"[chosen]}`}
        style={{
          maxWidth: 460,
          margin: "12px auto",
          fontSize: 14,
          fill: C.ink,
        }}
      >
        <text x="10" y="22">
          {timeline.currentStep === 0 ? "温度后的 p" : "截断后的 q"} ·
          长度正比于概率
        </text>
        {shown.map((v, i) => (
          <g key={i}>
            <text x="12" y={61 + i * 43}>
              {"ABCD"[i]}
            </text>
            <rect
              x="40"
              y={43 + i * 43}
              width={190 * v}
              height="25"
              fill={C.accent}
              opacity={i < n || timeline.currentStep === 0 ? 0.7 : 0.2}
            />
            <text x="240" y={61 + i * 43} textAnchor="middle">
              {v.toFixed(3)}
            </text>
          </g>
        ))}
        <text x="10" y="238">
          CDF：区间长度 = q，线 = u
        </text>
        {cdf.map((c, i) => (
          <g key={i}>
            <rect
              x={20 + 260 * c.start}
              y="253"
              width={260 * (c.end - c.start)}
              height="38"
              fill={C.accent}
              fillOpacity={0.15 + i * 0.18}
              stroke={C.border}
            />
            {c.end - c.start > 0.07 && (
              <text
                x={20 + 130 * (c.start + c.end)}
                y="278"
                textAnchor="middle"
              >
                {"ABCD"[i]}
              </text>
            )}
          </g>
        ))}
        <line
          x1={20 + 260 * u}
          x2={20 + 260 * u}
          y1="246"
          y2="298"
          stroke={C.ink}
          strokeWidth="3"
        />
        <text x="20" y="319">
          0
        </text>
        <text x="280" y="319" textAnchor="end">
          1
        </text>
        <text x="10" y="345">
          {timeline.currentStep < 2
            ? "推进到第3步读出抽样结果"
            : `u=${u.toFixed(2)} → ${chosen < 0 ? "落空（质量不足1）" : "ABCD"[chosen]}`}
        </text>
      </svg>
      <p data-result className="text-sm" aria-live="polite">
        保留 {n} 词；原质量 {mass.toFixed(4)}；Σq = {cumulative.toFixed(4)}
        ；抽样：{chosen < 0 ? "落空" : "ABCD"[chosen]}。检查：
        {Math.abs(cumulative - 1) < 1e-9 ? "质量守恒" : "失败：未归一化"}。
      </p>
      <TimelineControls
        timeline={timeline}
        reset={{ label: "完整重置", onClick: reset }}
      />
    </Frame>
  );
}

export function Llm04PretrainingDecodingEvidenceGateLab() {
  const [width, setWidth] = useState(2);
  const [rootA, setRootA] = useState(0.6);
  const [fault, setFault] = useState(false);
  const build = useCallback(
    (tl: Parameters<Parameters<typeof useTeachingTimeline>[0]["build"]>[0]) => {
      treeSteps.forEach((s, i) => tl.label(s.label, i * 1200));
      tl.add({ depth: 0 }, { depth: 3, duration: 3600, ease: "linear" }, 0);
    },
    [],
  );
  const timeline = useTeachingTimeline({ steps: treeSteps, build });
  const activeWidth = fault ? 1 : width;
  const roots = [rootA, 1 - rootA];
  const retained = [0, 1]
    .sort((a, b) => roots[b] - roots[a])
    .slice(0, activeWidth);
  const leaves = [0.51, 0.49, 0.9, 0.1].map((p, i) => ({
    name: ["A1", "A2", "B1", "B2"][i],
    p,
    score: roots[Math.floor(i / 2)] * p,
    parent: Math.floor(i / 2),
    x: 38 + i * 75,
  }));
  const ordered = leaves
    .filter((v) => retained.includes(v.parent))
    .sort((a, b) => b.score - a.score);
  const best = ordered[0];
  const reset = () => {
    timeline.pause();
    timeline.seek(0);
    setWidth(2);
    setRootA(0.6);
    setFault(false);
  };
  return (
    <Frame
      id="search"
      visualKind="greedy-beam-candidate-tree"
      title="实验三 · 局部最大值不等于最佳路径"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="束宽">
          <select
            aria-label="束宽"
            className={control}
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
          >
            <option value="1">1 · 贪心</option>
            <option value="2">2 · 束搜索</option>
          </select>
        </Field>
        <Field label={`首步 P(A) = ${rootA.toFixed(2)}`}>
          <input
            aria-label="首步概率"
            className="w-full accent-accent"
            type="range"
            min=".4"
            max=".8"
            step=".05"
            value={rootA}
            onChange={(e) => setRootA(Number(e.target.value))}
          />
        </Field>
        <button
          className={control}
          aria-pressed={fault}
          onClick={() => setFault(!fault)}
        >
          故障：{fault ? "次优前缀被丢弃" : "关闭"}
        </button>
      </div>
      <svg
        viewBox="0 0 300 390"
        role="img"
        aria-label={`两步候选树。请求束宽${width}，实际保留${activeWidth}；最佳${best.name}，概率${best.score.toFixed(4)}`}
        style={{
          maxWidth: 460,
          margin: "12px auto",
          fontSize: 14,
          fill: C.ink,
        }}
      >
        <circle cx="150" cy="28" r="17" fill={C.bg} stroke={C.border} />
        <text x="150" y="33" textAnchor="middle">
          起
        </text>
        {roots.map((p, i) => (
          <g
            key={i}
            opacity={
              timeline.currentStep > 0 && !retained.includes(i) ? 0.35 : 1
            }
          >
            <line
              x1="150"
              y1="45"
              x2={75 + i * 150}
              y2="111"
              stroke={C.accent}
              strokeWidth={1 + p * 4}
            />
            <text x={68 + i * 150} y="83" textAnchor="middle">
              {p.toFixed(2)}
            </text>
            <circle
              cx={75 + i * 150}
              cy="132"
              r="21"
              fill={C.bg}
              stroke={
                retained.includes(i) && timeline.currentStep > 0
                  ? C.accent
                  : C.border
              }
              strokeWidth="2"
            />
            <text x={75 + i * 150} y="137" textAnchor="middle">
              {"AB"[i]}
            </text>
          </g>
        ))}
        {leaves.map((v) => (
          <g
            key={v.name}
            opacity={
              timeline.currentStep < 2 || !retained.includes(v.parent)
                ? 0.35
                : 1
            }
          >
            <line
              x1={75 + v.parent * 150}
              y1="153"
              x2={v.x}
              y2="239"
              stroke={C.accent}
              strokeWidth={1 + v.p * 3}
            />
            <text x={v.x} y="210" textAnchor="middle">
              {v.p.toFixed(2)}
            </text>
            <circle
              cx={v.x}
              cy="260"
              r="23"
              fill={C.bg}
              stroke={
                v.name === best.name && timeline.currentStep === 2
                  ? C.accent
                  : C.border
              }
              strokeWidth="2"
            />
            <text x={v.x} y="265" textAnchor="middle">
              {v.name}
            </text>
            <text x={v.x} y="308" textAnchor="middle">
              {v.score.toFixed(3)}
            </text>
          </g>
        ))}
        <text x="12" y="345">
          叶子下方 = 整条路径概率
        </text>
        <text x="12" y="375">
          {timeline.currentStep < 2
            ? `当前保留上限 ${activeWidth} 条前缀`
            : `胜出 ${best.name}：${best.score.toFixed(4)}`}
        </text>
      </svg>
      <p data-result className="text-sm" aria-live="polite">
        请求束宽 {width}；实际 {activeWidth}。保留前缀{" "}
        {retained.map((i) => "AB"[i]).join("、")}；候选排序{" "}
        {ordered.map((v) => `${v.name}=${v.score.toFixed(4)}`).join(" > ")}
        。故障{fault ? "已注入" : "关闭"}。
      </p>
      <TimelineControls
        timeline={timeline}
        caption="等长两步树；比较原概率乘积，等价于累加log概率。"
        reset={{ label: "完整重置", onClick: reset }}
      />
    </Frame>
  );
}
