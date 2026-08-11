"use client";

import { useRef, useState } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
} as const;

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  { label: "sequence", caption: "先固定任意操作序列和实际成本" },
  { label: "aggregate", caption: "把所有操作总成本直接求和" },
  { label: "accounting", caption: "让便宜操作预付未来工作" },
  { label: "potential", caption: "把储存工作编码成状态函数" },
  { label: "table", caption: "用几何扩容与滞回避免 thrashing" },
  { label: "verify", caption: "检查每个 prefix 的余额与边界" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

type Mode = "stack" | "counter" | "table" | "potential";

type ModeInfo = {
  title: string;
  sequence: string;
  claim: string;
  proof: string;
};

const MODE_COPY: Record<Mode, ModeInfo> = {
  stack: {
    title: "栈与 MULTIPOP",
    sequence: "PUSH · POP · MULTIPOP(k)",
    claim: "总弹出次数不超过 PUSH 次数",
    proof: "每个 item 最多被弹出一次",
  },
  counter: {
    title: "二进制计数器",
    sequence: "连续 1 翻为 0，再翻首个 0",
    claim: "n 次 INCREMENT 总翻转少于 2n",
    proof: "第 j 位每 2ʲ 次至多翻一次",
  },
  table: {
    title: "动态表",
    sequence: "满载时倍增，低于四分之一时减半",
    claim: "扩缩容复制总量仍是线性",
    proof: "几何间隔 + hysteresis",
  },
  potential: {
    title: "势能法",
    sequence: "actual cost + Δpotential",
    claim: "中间势能项求和后两两抵消",
    proof: "Φ(final) 不低于 Φ(initial)",
  },
};

export function Clrs4Chapter16AmortizedAnalysisLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("counter");

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        tl.label(step.label, index * T);
      });
    },
  });

  const activeIndex =
    timeline.currentStep >= STEPS.length
      ? STEPS.length - 1
      : timeline.currentStep;
  const activeStep = STEPS[activeIndex] ?? STEPS[0];
  const selected = MODE_COPY[mode];
  const isBoundary = activeIndex >= 4;

  function reset() {
    timeline.goToStep(0);
    setMode("counter");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="clrs4-ch16-amortized-analysis"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CLRS 4e · Chapter 16 · Sequence Costs
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              一次昂贵操作，如何由整段序列共同支付？
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换栈、二进制计数器、动态表和势能样本，沿时间线观察 aggregate、accounting、potential 与边界验证如何给出摊还界。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">选择摊还模型</span>
          <select
            aria-label="选择栈与 MULTIPOP、二进制计数器、动态表或势能法"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="stack">栈与 MULTIPOP · aggregate/accounting</option>
            <option value="counter">二进制计数器 · aggregate/potential</option>
            <option value="table">动态表 · doubling/hysteresis</option>
            <option value="potential">势能法 · state function</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 650"
          role="img"
          aria-label="CLRS 4e Chapter 16 专属摊还分析实验。覆盖 amortized analysis、摊还分析、aggregate analysis、聚合分析、accounting method、核算法、potential method、势能法、dynamic tables、动态表。展示任意操作序列、总成本、预付 credit、势能变化、动态表扩缩容和 prefix 边界验证，并支持模型切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="clrs4-ch16-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="clrs4-ch16-success-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker id="clrs4-ch16-warning-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="650" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            sequence → aggregate → accounting → potential → table → verify
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            amortized analysis · {selected.title} · {selected.claim}
          </text>

          <rect x="30" y="78" width="258" height="126" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="106" fontSize="13" fontWeight="700" fill={C.accent}>实际序列</text>
          <text x="52" y="134" fontSize="12" fill={C.primary}>{selected.sequence}</text>
          <text x="52" y="162" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label}</text>
          <text x="52" y="184" fontSize="11" fill={C.secondary}>目标：任意 prefix 都不欠债</text>

          <line x1="300" y1="141" x2="326" y2="141" stroke={C.success} strokeWidth="2.5" markerEnd="url(#clrs4-ch16-success-arrow)" />

          <rect x="336" y="78" width="258" height="126" rx="12" fill={activeIndex === 2 || activeIndex === 3 ? C.accent : C.elevated} fillOpacity={activeIndex === 2 || activeIndex === 3 ? 0.12 : 1} stroke={activeIndex === 2 || activeIndex === 3 ? C.accent : C.border} strokeWidth="1.5" />
          <text x="358" y="106" fontSize="13" fontWeight="700" fill={activeIndex === 2 || activeIndex === 3 ? C.accent : C.primary}>支付证据</text>
          <text x="358" y="134" fontSize="12" fill={C.primary}>{selected.proof}</text>
          <text x="358" y="162" fontSize="11" fill={C.secondary}>actual + credit / potential</text>
          <text x="358" y="184" fontSize="11" fill={C.secondary}>便宜操作预付未来工作</text>

          <line x1="606" y1="141" x2="632" y2="141" stroke={isBoundary ? C.warning : C.success} strokeWidth="2.5" markerEnd={isBoundary ? "url(#clrs4-ch16-warning-arrow)" : "url(#clrs4-ch16-success-arrow)"} />

          <rect x="642" y="78" width="228" height="126" rx="12" fill={isBoundary ? C.warning : C.success} fillOpacity="0.1" stroke={isBoundary ? C.warning : C.success} strokeWidth="1.5" />
          <text x="756" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={isBoundary ? C.warning : C.success}>当前结论</text>
          <text x="756" y="134" textAnchor="middle" fontSize="12" fill={C.primary}>{isBoundary ? "检查 resize 边界" : "摊还收费给出总上界"}</text>
          <text x="756" y="162" textAnchor="middle" fontSize="11" fill={C.secondary}>{isBoundary ? "避免扩缩容 thrashing" : "不是 average-case 概率"}</text>
          <text x="756" y="184" textAnchor="middle" fontSize="11" fill={C.secondary}>对任意合法序列成立</text>

          {STEPS.map((step, index) => {
            const isActive = index === activeIndex;
            const isStageBoundary = index === 2 || index === 3 || index === 4;
            const tone = isActive ? C.accent : isStageBoundary ? C.warning : C.border;
            return (
              <g
                key={"stage-" + step.label}
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
                style={{ opacity: 0 }}
              >
                <rect x="30" y="222" width="840" height="82" rx="12" fill={isActive ? C.accent : isStageBoundary ? C.warning : C.elevated} fillOpacity={isActive || isStageBoundary ? 0.1 : 1} stroke={tone} strokeWidth={isActive ? 2.5 : 1.5} />
                <text x="52" y="250" fontSize="13" fontWeight="700" fill={isActive ? C.accent : isStageBoundary ? C.warning : C.primary}>{index + 1} · {step.label}</text>
                <text x="188" y="250" fontSize="12" fill={C.primary}>{step.caption}</text>
                <text x="52" y="278" fontSize="11" fill={C.secondary}>{index < activeIndex ? "证据已确认" : index === activeIndex ? "当前要回答的问题" : "等待前一步"}</text>
                <text x="870" y="278" textAnchor="end" fontSize="11" fill={isActive ? C.accent : C.secondary}>{index === 0 ? "sequence" : index === 1 ? "sum" : index === 2 ? "credit" : index === 3 ? "energy" : index === 4 ? "resize" : "prefix"}</text>
              </g>
            );
          })}

          <text x="30" y="332" fontSize="13" fontWeight="700" fill={C.primary}>成本与储存工作</text>
          <text x="870" y="332" textAnchor="end" fontSize="11" fill={C.secondary}>actual cost + stored work = amortized evidence</text>

          {mode === "stack" && (
            <>
              {["PUSH", "PUSH", "MULTIPOP(2)", "POP", "PUSH", "MULTIPOP(3)"].map((operation, index) => {
                const x = 54 + index * 132;
                const isExpensive = operation.startsWith("MULTIPOP");
                return (
                  <g key={"stack-" + index + "-" + operation}>
                    <rect x={x} y="378" width="108" height="54" rx="10" fill={isExpensive ? C.warning : C.success} fillOpacity="0.14" stroke={isExpensive ? C.warning : C.success} strokeWidth={isExpensive ? 2.5 : 1.5} />
                    <text x={x + 54} y="410" textAnchor="middle" fontSize="11" fontWeight="700" fill={C.primary}>{operation}</text>
                    <text x={x + 54} y="452" textAnchor="middle" fontSize="11" fill={C.secondary}>{isExpensive ? "consume coins" : "pay + save"}</text>
                  </g>
                );
              })}
              <line x1="54" y1="482" x2="846" y2="482" stroke={C.border} strokeWidth="2" markerEnd="url(#clrs4-ch16-arrow)" />
              <text x="54" y="508" fontSize="11" fill={C.secondary}>每次 PUSH 收 2：1 支付自身，1 枚 credit 跟随 item；POP 不收费。</text>
              <text x="846" y="508" textAnchor="end" fontSize="11" fill={C.success}>balance ≥ 0</text>
            </>
          )}

          {mode === "counter" && (
            <>
              <text x="54" y="370" fontSize="13" fontWeight="700" fill={C.primary}>一次 carry 与几何级数</text>
              {["1", "1", "1", "0", "1"].map((bit, index) => {
                const x = 90 + index * 112;
                const isFlipped = index < Math.min(activeIndex + 1, 4);
                return (
                  <g key={"bit-" + index}>
                    <rect x={x} y="398" width="68" height="68" rx="12" fill={isFlipped ? C.warning : C.elevated} fillOpacity={isFlipped ? 0.18 : 1} stroke={isFlipped ? C.warning : C.border} strokeWidth={isFlipped ? 2.5 : 1.5} />
                    <text x={x + 34} y="438" textAnchor="middle" fontSize="20" fontWeight="700" fill={C.primary}>{bit}</text>
                    <text x={x + 34} y="456" textAnchor="middle" fontSize="11" fill={C.secondary}>bit {index}</text>
                  </g>
                );
              })}
              <line x1="90" y1="492" x2="720" y2="492" stroke={C.warning} strokeWidth="2.5" markerEnd="url(#clrs4-ch16-warning-arrow)" />
              <text x="54" y="524" fontSize="11" fill={C.secondary}>第 j 位每 2ʲ 次至多翻一次：Σ⌊n/2ʲ⌋ 小于 2n。</text>
              <text x="846" y="524" textAnchor="end" fontSize="11" fill={C.warning}>carry 长，累计仍线性</text>
            </>
          )}

          {mode === "table" && (
            <>
              <text x="54" y="370" fontSize="13" fontWeight="700" fill={C.primary}>容量、负载与滞回</text>
              {[1, 2, 4, 8, 16].map((capacity, index) => {
                const x = 54 + index * 150;
                const occupied = index === 0 ? 1 : index === 1 ? 2 : index === 2 ? 3 : index === 3 ? 7 : 4;
                const resizing = index === 3;
                return (
                  <g key={"table-" + capacity}>
                    <rect x={x} y="404" width="112" height="66" rx="10" fill={resizing ? C.warning : C.elevated} fillOpacity={resizing ? 0.16 : 1} stroke={resizing ? C.warning : C.border} strokeWidth={resizing ? 2.5 : 1.5} />
                    <text x={x + 56} y="428" textAnchor="middle" fontSize="12" fontWeight="700" fill={C.primary}>size {capacity}</text>
                    <text x={x + 56} y="450" textAnchor="middle" fontSize="11" fill={C.secondary}>num {occupied}</text>
                  </g>
                );
              })}
              <line x1="54" y1="498" x2="846" y2="498" stroke={C.border} strokeWidth="2" markerEnd="url(#clrs4-ch16-arrow)" />
              <text x="54" y="526" fontSize="11" fill={C.secondary}>满载扩为两倍，低于四分之一才减半；边界之间有足够多普通操作。</text>
              <text x="846" y="526" textAnchor="end" fontSize="11" fill={C.success}>avoid thrashing</text>
            </>
          )}

          {mode === "potential" && (
            <>
              <text x="54" y="370" fontSize="13" fontWeight="700" fill={C.primary}>势能账本</text>
              {[
                ["D₀", "actual 0", "Φ 0", 0],
                ["D₁", "actual 1", "Φ +1", 1],
                ["D₂", "actual 4", "Φ -2", 3],
                ["D₃", "actual 1", "Φ +1", 1],
              ].map(([state, actual, delta, height]) => {
                const x = 74 + Number(height) * 125;
                return (
                  <g key={"potential-" + state}>
                    <rect x={x} y={420 - Number(height) * 35} width="110" height={Math.max(30, Number(height) * 35)} rx="10" fill={Number(height) >= 3 ? C.warning : C.success} fillOpacity="0.16" stroke={Number(height) >= 3 ? C.warning : C.success} strokeWidth="1.5" />
                    <text x={x + 55} y="446" textAnchor="middle" fontSize="12" fontWeight="700" fill={C.primary}>{state}</text>
                    <text x={x + 55} y="470" textAnchor="middle" fontSize="11" fill={C.secondary}>{actual}</text>
                    <text x={x + 55} y="490" textAnchor="middle" fontSize="11" fill={C.secondary}>{delta}</text>
                  </g>
                );
              })}
              <line x1="54" y1="526" x2="846" y2="526" stroke={C.border} strokeWidth="2" markerEnd="url(#clrs4-ch16-arrow)" />
              <text x="54" y="552" fontSize="11" fill={C.secondary}>amortized = actual + Φ(Dᵢ) − Φ(Dᵢ₋₁)；求和时中间势能抵消。</text>
              <text x="846" y="552" textAnchor="end" fontSize="11" fill={C.success}>Φ(final) ≥ Φ(initial)</text>
            </>
          )}

          <rect x="30" y="584" width="840" height="32" rx="10" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="605" fontSize="11" fill={C.secondary}>摊还界：对任意合法操作序列的总成本给确定性上界，不是概率平均。</text>
          <text x="846" y="605" textAnchor="end" fontSize="11" fill={isBoundary ? C.warning : C.success}>{isBoundary ? "边界已检查" : "继续积累证据"}</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先固定任意操作序列，再选择 aggregate、accounting 或 potential 证明；每个 prefix 都不能借用未来尚未产生的余额。"
          reset={{ label: "重置实验", ariaLabel: "重置摊还分析实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        摊还分析不是把昂贵操作变便宜，而是证明整段序列已经积累了足够的支付能力。
      </figcaption>
    </figure>
  );
}
