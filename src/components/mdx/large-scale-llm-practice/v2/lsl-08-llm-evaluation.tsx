"use client";

import { useState } from "react";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";
import { useTeachingTimeline } from "@/components/mdx/anim/use-teaching-timeline";
import type { TeachingStep } from "@/components/mdx/anim/use-teaching-timeline";

const ink = "var(--text-primary)";
const muted = "var(--text-secondary)";
const accent = "var(--accent)";
const border = "var(--border)";
const paper = "var(--bg-primary)";
const metricSteps: readonly TeachingStep[] = [
  { label: "逐次匹配" },
  { label: "候选分母" },
  { label: "参考分母" },
];
const splitSteps: readonly TeachingStep[] = [
  { label: "观察分片" },
  { label: "改变混合" },
  { label: "比较排名" },
];
const evidenceSteps: readonly TeachingStep[] = [
  { label: "检查重叠" },
  { label: "配对计数" },
  { label: "精确尾概率" },
];
function useEvaluationTimeline(steps: readonly TeachingStep[]) {
  return useTeachingTimeline({
    steps,
    build: (tl) => {
      const clock = { value: 0 };
      steps.forEach((step, i) => {
        tl.label(step.label, i * 900);
        tl.add(clock, { value: i + 1, duration: 900, ease: "linear" }, i * 900);
      });
    },
  });
}
function LabStyle() {
  return (
    <style>{`
    .evaluation-lab { border:1px solid var(--border); border-radius:12px; padding:16px; margin:24px 0; color:var(--text-primary); }
    .evaluation-lab h4 { margin:0 0 12px; font-size:1.1rem; }
    .evaluation-lab p { line-height:1.7; margin:10px 0; overflow-wrap:anywhere; }
    .evaluation-lab svg { width:100%; max-width:500px; height:auto; display:block; margin:auto; overflow:visible; }
    .evaluation-lab svg text { font-family:inherit; font-size:15px; fill:var(--text-primary); }
    .evaluation-lab .lab-inputs { display:flex; flex-wrap:wrap; gap:12px; align-items:end; }
    .evaluation-lab label { display:flex; flex-direction:column; gap:6px; max-width:100%; }
    .evaluation-lab select, .evaluation-lab button { min-width:44px; min-height:44px; border:1px solid var(--border); border-radius:6px; padding:8px; background:var(--bg-primary); color:var(--text-primary); font-size:14px; }
    .evaluation-lab select { width:100%; }
    .evaluation-lab button[aria-pressed=true] { border:2px solid var(--accent); }
    .evaluation-lab input[type=range] { min-height:44px; }
    .evaluation-lab .mt-4.flex { flex-wrap:wrap; }
    .evaluation-lab :focus-visible { outline:2px solid var(--accent); outline-offset:3px; }
    .evaluation-lab output { display:block; font-variant-numeric:tabular-nums; line-height:1.7; }
  `}</style>
  );
}
const reference = "the cat sat on the mat".split(" ");
const candidates = {
  short: "the cat".split(" "),
  balanced: reference,
  repeated: "the the the cat".split(" "),
};
function clippedMatches(candidate: string[]) {
  const remaining = new Map<string, number>();
  reference.forEach((token) =>
    remaining.set(token, (remaining.get(token) ?? 0) + 1),
  );
  return candidate.map((token) => {
    const count = remaining.get(token) ?? 0;
    if (!count) return false;
    remaining.set(token, count - 1);
    return true;
  });
}

/** A clipped multiset, not a full BLEU implementation. */
export function Lsl08LlmEvaluationContextContractLab() {
  const [candidate, setCandidate] = useState<keyof typeof candidates>("short");
  const [wrongDenominator, setWrongDenominator] = useState(false);
  const timeline = useEvaluationTimeline(metricSteps);
  const tokens = candidates[candidate];
  const matching = clippedMatches(tokens);
  const matched = matching.filter(Boolean).length;
  const precision = matched / tokens.length;
  const recallDenominator = wrongDenominator ? tokens.length : reference.length;
  const recall = matched / recallDenominator;
  const reset = () => {
    setCandidate("short");
    setWrongDenominator(false);
    timeline.goToStep(0);
  };
  return (
    <section
      className="evaluation-lab not-prose"
      data-lab="denominator"
      data-visual-kind="clipped-ngram-denominator-strips"
      data-step={timeline.currentStep}
      data-fault={wrongDenominator}
      aria-label="词元匹配与指标分母实验"
    >
      <LabStyle />
      <h4>同一批命中，两个分母</h4>
      <div className="lab-inputs">
        <label>
          候选序列
          <select
            aria-label="候选序列"
            value={candidate}
            onChange={(e) =>
              setCandidate(e.target.value as keyof typeof candidates)
            }
          >
            <option value="short">短句：the cat</option>
            <option value="balanced">完整：the cat sat on the mat</option>
            <option value="repeated">重复：the the the cat</option>
          </select>
        </label>
        <button
          type="button"
          aria-pressed={wrongDenominator}
          onClick={() => setWrongDenominator(!wrongDenominator)}
        >
          故障：召回率错用候选分母
        </button>
      </div>
      <svg
        viewBox="0 0 300 400"
        role="img"
        aria-label="实心格是逐次截断匹配，空心格是多余词；上下进度条分别以候选长度和参考长度为分母"
      >
        <text x="10" y="28">
          参考：6 个词元
        </text>
        {reference.map((token, i) => (
          <g
            key={i}
            transform={`translate(${10 + (i % 3) * 94},${42 + Math.floor(i / 3) * 36})`}
          >
            <rect width="88" height="30" rx="4" fill="none" stroke={border} />
            <text x="44" y="21" textAnchor="middle">
              {token}
            </text>
          </g>
        ))}
        <text x="10" y="140">
          候选：{tokens.length} 个词元
        </text>
        {tokens.map((token, i) => (
          <g
            key={i}
            transform={`translate(${10 + (i % 3) * 94},${154 + Math.floor(i / 3) * 36})`}
          >
            <rect
              width="88"
              height="30"
              rx="4"
              fill={matching[i] ? accent : "none"}
              fillOpacity=".16"
              stroke={matching[i] ? accent : muted}
              strokeDasharray={matching[i] ? undefined : "4 3"}
            />
            <text x="44" y="21" textAnchor="middle">
              {token}
            </text>
          </g>
        ))}
        <g opacity={timeline.currentStep === 2 ? 0.55 : 1}>
          <text x="10" y="257">
            截断精确率：{matched} / {tokens.length}
          </text>
          <rect
            x="10"
            y="268"
            width="280"
            height="26"
            fill="none"
            stroke={border}
          />
          <rect
            data-geometry="precision"
            x="10"
            y="268"
            width={280 * precision}
            height="26"
            fill={accent}
            fillOpacity=".65"
          />
        </g>
        <g opacity={timeline.currentStep === 1 ? 0.55 : 1}>
          <text x="10" y="326">
            ROUGE-1 召回：{matched} / {recallDenominator}
          </text>
          <rect
            x="10"
            y="338"
            width="280"
            height="26"
            fill="none"
            stroke={border}
          />
          <rect
            data-geometry="recall"
            x="10"
            y="338"
            width={280 * recall}
            height="26"
            fill={accent}
            fillOpacity=".3"
            stroke={wrongDenominator ? ink : accent}
            strokeDasharray={wrongDenominator ? "4 3" : undefined}
          />
        </g>
        <text x="10" y="390">
          {wrongDenominator
            ? "错误分母掩盖了参考中遗漏的词。"
            : "重复词最多匹配参考中的出现次数。"}
        </text>
      </svg>
      <output data-result="metric" aria-live="polite">
        命中 {matched}；精确率 {(precision * 100).toFixed(1)}%；召回率{" "}
        {(recall * 100).toFixed(1)}%
        {wrongDenominator ? "（故障结果，不是正确 ROUGE）" : ""}。
      </output>
      <p>
        这是固定英文词元的教学算术，不含 BLEU 的高阶
        n-gram、几何平均或长度惩罚，也不判断事实正确性。
      </p>
      <TimelineControls
        timeline={timeline}
        caption={
          [
            "先消耗参考词的可用次数。",
            "观察候选长度如何进入精确率分母。",
            "换回参考长度，遗漏才进入召回率。",
          ][timeline.currentStep]
        }
        reset={{ label: "重置实验", onClick: reset }}
      />
    </section>
  );
}

/** Slice accuracy and deployment mixture are different estimands. */
export function Lsl08LlmEvaluationComputeTraceLab() {
  const [oodMass, setOodMass] = useState(10);
  const [omitOod, setOmitOod] = useState(false);
  const timeline = useEvaluationTimeline(splitSteps);
  const w = oodMass / 100;
  const a = omitOod ? 0.9 : (1 - w) * 0.9 + w * 0.3;
  const b = omitOod ? 0.8 : (1 - w) * 0.8 + w * 0.7;
  const reset = () => {
    setOodMass(10);
    setOmitOod(false);
    timeline.goToStep(0);
  };
  return (
    <section
      className="evaluation-lab not-prose"
      data-lab="split"
      data-visual-kind="id-ood-deployment-mixture"
      data-step={timeline.currentStep}
      data-fault={omitOod}
      aria-label="同分布与分布外评估实验"
    >
      <LabStyle />
      <h4>分片不变，部署排名仍会反转</h4>
      <div className="lab-inputs">
        <label>
          部署 OOD 占比
          <select
            aria-label="部署 OOD 占比"
            value={oodMass}
            onChange={(e) => setOodMass(Number(e.target.value))}
          >
            <option value={10}>低：10% OOD</option>
            <option value={50}>均：50% OOD</option>
            <option value={80}>高：80% OOD</option>
          </select>
        </label>
        <button
          type="button"
          aria-pressed={omitOod}
          onClick={() => setOmitOod(!omitOod)}
        >
          故障：报告只保留 ID
        </button>
      </div>
      <svg
        viewBox="0 0 300 480"
        role="img"
        aria-label="每个分片20题，条形实心为答对，空白为答错；下方宽度表示部署分布而非样本数量"
      >
        <text x="10" y="27">
          每片 20 题；实色答对，空白答错
        </text>
        {[
          { label: "A · ID", correct: 18 },
          { label: "A · OOD", correct: 6 },
          { label: "B · ID", correct: 16 },
          { label: "B · OOD", correct: 14 },
        ].map((row, i) => (
          <g key={row.label}>
            <text x="10" y={55 + i * 51}>
              {row.label}：{row.correct}/20
            </text>
            <rect
              x="10"
              y={65 + i * 51}
              width="280"
              height="20"
              fill="none"
              stroke={border}
            />
            <rect
              x="10"
              y={65 + i * 51}
              width={(280 * row.correct) / 20}
              height="20"
              fill={accent}
              fillOpacity={omitOod && i % 2 === 1 ? 0.15 : i < 2 ? 0.7 : 0.3}
              stroke={i < 2 ? "none" : accent}
              strokeDasharray={i < 2 ? undefined : "4 3"}
            />
          </g>
        ))}
        <g opacity={timeline.currentStep === 0 ? 0.55 : 1}>
          <text x="10" y="279">
            部署混合宽度：ID / OOD
          </text>
          <rect
            x="10"
            y="290"
            width={280 * (1 - w)}
            height="34"
            fill={accent}
            fillOpacity=".65"
          />
          <rect
            data-geometry="ood-mass"
            x={10 + 280 * (1 - w)}
            y="290"
            width={280 * w}
            height="34"
            fill={accent}
            fillOpacity={omitOod ? 0.05 : 0.2}
            stroke={omitOod ? ink : accent}
            strokeDasharray={omitOod ? "3 3" : undefined}
          />
          <text x="10" y="347">
            ID {100 - oodMass}% · OOD {oodMass}%
          </text>
        </g>
        <text x="10" y="378">
          {omitOod
            ? "错误：分母排除了所有 OOD 题"
            : "加权准确率（不是简单合并样本）"}
        </text>
        <text x="10" y="405">
          A
        </text>
        <rect
          data-geometry="a-mixture"
          x="35"
          y="388"
          width={255 * a}
          height="22"
          fill={accent}
          fillOpacity=".7"
        />
        <text x="10" y="442">
          B
        </text>
        <rect
          data-geometry="b-mixture"
          x="35"
          y="425"
          width={255 * b}
          height="22"
          fill={accent}
          fillOpacity=".3"
          stroke={accent}
          strokeDasharray="4 3"
        />
        <text x="10" y="472">
          {omitOod
            ? "虚线 OOD 区仍存在，却没被计入。"
            : "A 实色，B 浅色虚线；越长越好。"}
        </text>
      </svg>
      <output data-result="mixture" aria-live="polite">
        A {(a * 100).toFixed(1)}%；B {(b * 100).toFixed(1)}%；
        {a > b ? "A" : "B"} 较高{omitOod ? "（漏报 OOD）" : ""}。
      </output>
      <p>
        ID 为同类短步骤题，OOD
        为延长步骤题。四组答对数均为自造教学数据；权重是部署假设，不是从 40
        道题推断出的真实流量。
      </p>
      <TimelineControls
        timeline={timeline}
        caption={
          [
            "先看每个分片，不用总体数掩盖差异。",
            "只移动部署权重，不改变任何答题记录。",
            "比较两条加权结果，而不是挑选获胜分片。",
          ][timeline.currentStep]
        }
        reset={{ label: "重置实验", onClick: reset }}
      />
    </section>
  );
}

function binomialMass(n: number) {
  const masses = [2 ** -n];
  for (let k = 1; k <= n; k++) masses.push((masses[k - 1] * (n - k + 1)) / k);
  return masses;
}
function exactPairedP(b: number, c: number) {
  if (b + c === 0) return 1;
  return Math.min(
    1,
    2 *
      binomialMass(b + c)
        .slice(0, Math.min(b, c) + 1)
        .reduce((sum, v) => sum + v, 0),
  );
}

/** Contamination changes the sample; duplication does not create independent evidence. */
export function Lsl08LlmEvaluationEvidenceGateLab() {
  const [subset, setSubset] = useState("all");
  const [duplicate, setDuplicate] = useState(false);
  const timeline = useEvaluationTimeline(evidenceSteps);
  const leaked = subset === "all" ? 8 : 0;
  const counts = [8, 1 + leaked, 7, 4];
  const total = 20 + leaked;
  const factor = duplicate ? 5 : 1;
  const discordantA = counts[1] * factor;
  const discordantB = counts[2] * factor;
  const n = discordantA + discordantB;
  const mass = binomialMass(n);
  const peak = Math.max(...mass);
  const tail = Math.min(discordantA, discordantB);
  const p = exactPairedP(discordantA, discordantB);
  const reset = () => {
    setSubset("all");
    setDuplicate(false);
    timeline.goToStep(0);
  };
  return (
    <section
      className="evaluation-lab not-prose"
      data-lab="evidence"
      data-visual-kind="contamination-paired-binomial-tail"
      data-step={timeline.currentStep}
      data-fault={duplicate}
      aria-label="污染与配对置信实验"
    >
      <LabStyle />
      <h4>污染能改排名，复制不能增加证据</h4>
      <div className="lab-inputs">
        <label>
          审计样本
          <select
            aria-label="审计样本"
            value={subset}
            onChange={(e) => setSubset(e.target.value)}
          >
            <option value="all">全部：28 道题</option>
            <option value="clean">排除：8 道重叠题</option>
          </select>
        </label>
        <button
          type="button"
          aria-pressed={duplicate}
          onClick={() => setDuplicate(!duplicate)}
        >
          故障：同题复制五次当独立
        </button>
      </div>
      <svg
        viewBox="0 0 300 500"
        role="img"
        aria-label="圆点代表不同干净题，方块代表重叠题；配对不一致计数进入零假设下的二项分布，实色尾部用于双侧精确p值"
      >
        <text x="10" y="25">
          圆：干净题；方：8 道重叠题
        </text>
        {["两者都对", "仅 A 对", "仅 B 对", "两者都错"].map((label, row) => (
          <g key={label}>
            <text x="10" y={59 + row * 37}>
              {label}
            </text>
            {Array.from({ length: [8, 9, 7, 4][row] }, (_, i) => {
              const overlap = row === 1 && i >= 1;
              const excluded = overlap && subset === "clean";
              const x = 118 + i * 19;
              return overlap ? (
                <rect
                  key={i}
                  x={x - 6}
                  y={44 + row * 37}
                  width="12"
                  height="12"
                  fill={excluded ? "none" : accent}
                  stroke={accent}
                  strokeDasharray={excluded ? "2 2" : undefined}
                />
              ) : (
                <circle
                  key={i}
                  cx={x}
                  cy={50 + row * 37}
                  r="6"
                  fill={row === 3 ? paper : accent}
                  fillOpacity=".45"
                  stroke={accent}
                />
              );
            })}
          </g>
        ))}
        <text x="10" y="208">
          A {8 + counts[1]}/{total}；B {15}/{total}
        </text>
        <g opacity={timeline.currentStep === 0 ? 0.55 : 1}>
          <text x="10" y="239">
            不一致配对：b={discordantA}，c={discordantB}
          </text>
          <rect
            data-geometry="a-discordant"
            x={150 - (130 * discordantA) / n}
            y="251"
            width={(130 * discordantA) / n}
            height="24"
            fill={accent}
            fillOpacity=".7"
          />
          <rect
            data-geometry="b-discordant"
            x="150"
            y="251"
            width={(130 * discordantB) / n}
            height="24"
            fill={accent}
            fillOpacity=".25"
            stroke={accent}
          />
          <text x="10" y="298">
            左：仅 A 对；右：仅 B 对
          </text>
        </g>
        <g opacity={timeline.currentStep < 2 ? 0.55 : 1}>
          <text x="10" y="329">
            H₀：不一致题偏向 A 的概率 ½
          </text>
          {mass.map((probability, k) => (
            <rect
              key={k}
              data-binomial={k}
              x={10 + (k * 280) / (n + 1)}
              y={432 - (88 * probability) / peak}
              width={Math.max(0.5, 280 / (n + 1) - 1)}
              height={(88 * probability) / peak}
              fill={accent}
              fillOpacity={k <= tail || k >= n - tail ? 0.85 : 0.15}
            />
          ))}
          <text x="10" y="455">
            0
          </text>
          <text x="150" y="455" textAnchor="middle">
            {n / 2}
          </text>
          <text x="290" y="455" textAnchor="end">
            {n} 次偏向 A
          </text>
        </g>
        <text x="10" y="487">
          {duplicate
            ? "复制后的曲线是伪独立检验，不可信。"
            : "尾面积为双侧 p，不是 H₀ 为真的概率。"}
        </text>
      </svg>
      <output data-result="paired" aria-live="polite">
        A {((100 * (8 + counts[1])) / total).toFixed(2)}%；B{" "}
        {(1500 / total).toFixed(2)}%；精确 p={p.toPrecision(6)}
        {duplicate ? "（无效：同题伪重复）" : ""}。
      </output>
      <p>
        排除重叠后只有 20 个不同题。干净子集 b=1、c=7，p=0.0703125，不能在 0.05
        水平拒绝等表现假设；不等于证明两模型相同。去重也不能证明训练集绝无污染。
      </p>
      <TimelineControls
        timeline={timeline}
        caption={
          [
            "排除方块会改变模型的相对名次。",
            "只把不同模型给出不同对错的题送入检验。",
            "复制同题改变曲线却不增加独立问题数。",
          ][timeline.currentStep]
        }
        reset={{ label: "重置实验", onClick: reset }}
      />
    </section>
  );
}
