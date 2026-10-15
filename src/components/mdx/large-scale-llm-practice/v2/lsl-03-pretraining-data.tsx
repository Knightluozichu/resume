"use client";

import { useState } from "react";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";
import { useTeachingTimeline } from "@/components/mdx/anim/use-teaching-timeline";

const accent = "var(--accent)";
const ink = "var(--text-primary)";
const muted = "var(--text-secondary)";
const border = "var(--border)";
const danger = "var(--danger)";
const button = "rounded border border-border px-3 py-2 text-sm";
const mixSteps = [
  { label: "库存" },
  { label: "半程抽样" },
  { label: "完整预算" },
];
const pairSteps = [
  { label: "A 与 B" },
  { label: "B 与 C" },
  { label: "A 与 C" },
];
const streamSteps = [
  { label: "原始字符" },
  { label: "遮蔽与切分" },
  { label: "污染检查" },
];

function useDataTimeline(steps: { label: string }[]) {
  return useTeachingTimeline({
    steps,
    build: (tl) => {
      const clock = { value: 0 };
      steps.forEach((s, i) => tl.label(s.label, i * 1000));
      tl.add(
        clock,
        { value: 1, duration: steps.length * 1000, ease: "linear" },
        0,
      );
    },
  });
}

function Lab({
  kind,
  title,
  children,
}: {
  kind: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      data-visual-kind={kind}
      aria-label={title}
      className="data03 not-prose my-8 rounded-xl border border-border bg-bg-elevated p-3 sm:p-5"
    >
      <style>{`.data03 {color:var(--text-primary);min-width:0}.data03 button,.data03 select,.data03 input {min-height:44px;min-width:44px}.data03 input[type=range]{width:100%}.data03 svg{display:block;width:100%;max-width:500px;margin:auto;height:auto}.data03 svg text{font-size:16px;fill:var(--text-primary)}.data03 label{display:block;margin:8px 0}.data03 p{font-size:14px;line-height:1.7;overflow-wrap:anywhere}.data03 button:focus-visible,.data03 input:focus-visible,.data03 select:focus-visible{outline:3px solid var(--accent);outline-offset:2px}.data03 ol button{width:44px}.data03 .mt-4.flex{flex-wrap:wrap}.data03 [role=group] button[aria-pressed=true]{border-color:var(--accent);background:var(--accent-subtle)} `}</style>
      <h3 className="mb-3 text-lg font-semibold">{title}</h3>
      {children}
    </section>
  );
}

// Deterministic largest-remainder allocation; ties follow source order.
function allocate(total: number, weights: number[]) {
  const sum = weights.reduce((a, b) => a + b, 0);
  const exact = weights.map((w) => (total * w) / sum);
  const counts = exact.map(Math.floor);
  const priority = exact
    .map((n, i) => ({ i, frac: n - counts[i] }))
    .sort((a, b) => b.frac - a.frac || a.i - b.i);
  for (let n = total - counts.reduce((a, b) => a + b, 0), i = 0; i < n; i++)
    counts[priority[i].i]++;
  return counts;
}

export function Lsl03PretrainingDataContextContractLab() {
  const [budget, setBudget] = useState(60);
  const [science, setScience] = useState(3);
  const [noCode, setNoCode] = useState(false);
  const tl = useDataTimeline(mixSteps);
  const weights = [6, science, noCode ? 0 : 1];
  const drawn =
    tl.currentStep === 0 ? 0 : tl.currentStep === 1 ? budget / 2 : budget;
  const counts = allocate(drawn, weights);
  const stocks = [40, 10, 10];
  const names = ["网页", "科学", "代码"];
  const fills = [accent, muted, ink];
  const reset = () => {
    setBudget(60);
    setScience(3);
    setNoCode(false);
    tl.goToStep(0);
  };
  return (
    <Lab kind="token-budget-stacks" title="实验一 · 库存不是训练配比">
      <div role="group" aria-label="总预算" className="my-2">
        <p>总预算（教学 token）</p>
        <div className="flex flex-wrap gap-2">
          {[30, 60, 120].map((n) => (
            <button
              key={n}
              type="button"
              className={button}
              data-value={n}
              aria-pressed={budget === n}
              onClick={() => setBudget(n)}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
      <label>
        科学采样权重：{science}（网页固定 6，代码固定 1）
        <input
          aria-label="科学采样权重"
          type="range"
          min={1}
          max={6}
          value={science}
          onChange={(e) => setScience(Number(e.target.value))}
        />
      </label>
      <button
        type="button"
        className={button}
        data-mix-fault="true"
        aria-pressed={noCode}
        onClick={() => setNoCode(!noCode)}
      >
        故障：{noCode ? "已漏掉代码源" : "漏掉代码源"}
      </button>
      <svg
        viewBox="0 0 330 355"
        role="img"
        aria-label={`库存60 token；已抽样${drawn}，网页${counts[0]}、科学${counts[1]}、代码${counts[2]}；宽度表示token数`}
      >
        <text x={15} y={30}>
          可用库存 · 60 token
        </text>
        {[stocks, counts].map((row, r) =>
          row.map((n, i) => {
            const x =
              15 + (row.slice(0, i).reduce((a, b) => a + b, 0) * 300) / 120;
            return (
              <rect
                key={`${r}-${i}`}
                x={x}
                y={r === 0 ? 48 : 142}
                width={(n * 300) / 120}
                height={35}
                fill={fills[i]}
                opacity={0.8}
              />
            );
          }),
        )}
        <text x={15} y={120}>
          已抽样 {drawn} / {budget} token
        </text>
        <line x1={15} x2={315} y1={180} y2={180} stroke={border} />
        <text x={15} y={340}>
          同一刻度 · 满宽 120 token
        </text>
        {names.map((name, i) => (
          <g key={name}>
            <circle cx={23} cy={214 + i * 43} r={7} fill={fills[i]} />
            <text x={40} y={220 + i * 43}>
              {name} {stocks[i]} → {counts[i]} ·{" "}
              {(counts[i] / stocks[i]).toFixed(2)} 轮
            </text>
          </g>
        ))}
      </svg>
      <p aria-live="polite">
        权重 {weights.join(":")}；按最大余数法分配整数 token。轮数 = 抽样数 /
        库存；超过 1 表示重复曝光，不是新增知识。
        {noCode ? "代码预算为 0，领域覆盖出现缺口。" : "所有来源都有非零权重。"}
      </p>
      <TimelineControls
        timeline={tl}
        reset={{ label: "全部重置", onClick: reset }}
      />
    </Lab>
  );
}

const shingleSets = [
  ["ab", "bc", "cd"],
  ["ab", "bc", "ce"],
  ["bc", "ce", "ef"],
];
const pairs = [
  [0, 1],
  [1, 2],
  [0, 2],
];
const points = [
  [35, 285],
  [165, 225],
  [295, 285],
];
function similarity(a: number, b: number) {
  const intersection = shingleSets[a].filter((s) => shingleSets[b].includes(s));
  const union = [...new Set([...shingleSets[a], ...shingleSets[b]])];
  return { intersection, union, j: intersection.length / union.length };
}

export function Lsl03PretrainingDataComputeTraceLab() {
  const [threshold, setThreshold] = useState(0.5);
  const [local, setLocal] = useState(false);
  const tl = useDataTimeline(pairSteps);
  const [a, b] = pairs[tl.currentStep];
  const selected = similarity(a, b);
  const edges = pairs.filter(
    ([i, j]) =>
      similarity(i, j).j >= threshold && (!local || (i !== 1 && j !== 1)),
  );
  const parents = [0, 1, 2];
  const root = (i: number): number => (parents[i] === i ? i : root(parents[i]));
  edges.forEach(([i, j]) => {
    parents[root(j)] = root(i);
  });
  const clusters = [...new Set(parents.map((_, i) => root(i)))].map((r) =>
    parents.map((_, i) => i).filter((i) => root(i) === r),
  );
  return (
    <Lab
      kind="shingle-intersection-clusters"
      title="实验二 · 相似不具有传递性，簇具有"
    >
      <label>
        连边阈值 J ≥ {threshold.toFixed(1)}
        <input
          aria-label="Jaccard 阈值"
          type="range"
          min={0.2}
          max={0.8}
          step={0.1}
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
        />
      </label>
      <button
        type="button"
        className={button}
        aria-pressed={local}
        onClick={() => setLocal(!local)}
      >
        故障：{local ? "仅分区内比较" : "切分后仅分区内去重"}
      </button>
      <svg
        viewBox="0 0 330 350"
        role="img"
        aria-label={`比较${"ABC"[a]}与${"ABC"[b]}，交集${selected.intersection.length}、并集${selected.union.length}，${edges.length}条边，${clusters.length}个簇`}
      >
        <text x={15} y={25}>
          字符二元组集合（去掉空格）
        </text>
        {[a, b].map((id, row) => (
          <g key={id}>
            <text x={15} y={68 + row * 50}>
              {"ABC"[id]}
            </text>
            {shingleSets[id].map((s, i) => (
              <g key={s}>
                <rect
                  x={50 + i * 88}
                  y={43 + row * 50}
                  width={75}
                  height={36}
                  rx={8}
                  fill={
                    selected.intersection.includes(s) ? accent : "var(--bg)"
                  }
                  fillOpacity={0.18}
                  stroke={selected.intersection.includes(s) ? accent : border}
                />
                <text x={72 + i * 88} y={67 + row * 50}>
                  {s}
                </text>
              </g>
            ))}
          </g>
        ))}
        <text x={15} y={160}>
          J = {selected.intersection.length}/{selected.union.length} ={" "}
          {selected.j.toFixed(2)}
        </text>
        {clusters
          .filter((c) => c.length > 1)
          .map((c) => (
            <path
              key={c.join()}
              d={
                c.length === 3
                  ? "M10 305 Q0 270 140 202 Q165 188 190 202 Q330 270 320 305 Q165 342 10 305"
                  : c.includes(0) && c.includes(2)
                    ? "M10 267 Q165 246 320 267 Q332 294 312 312 Q165 330 18 312 Q0 294 10 267"
                    : c.includes(0)
                      ? "M15 300 Q0 265 145 205 Q190 195 185 235 Q110 300 15 300"
                      : "M145 235 Q135 195 185 205 Q330 265 315 300 Q220 300 145 235"
              }
              fill={accent}
              fillOpacity={0.07}
              stroke={accent}
              strokeDasharray="5 5"
            />
          ))}
        {pairs.map(([i, j]) => (
          <line
            key={`${i}${j}`}
            x1={points[i][0]}
            y1={points[i][1]}
            x2={points[j][0]}
            y2={points[j][1]}
            stroke={
              edges.some(([m, n]) => m === i && n === j) ? accent : border
            }
            strokeWidth={edges.some(([m, n]) => m === i && n === j) ? 4 : 1}
            strokeDasharray={
              edges.some(([m, n]) => m === i && n === j) ? undefined : "3 6"
            }
          />
        ))}
        {points.map(([x, y], i) => (
          <g key={i}>
            <circle
              cx={x}
              cy={y}
              r={18}
              fill="var(--bg-elevated)"
              stroke={local && i === 1 ? danger : accent}
              strokeWidth={2}
            />
            <text x={x - 6} y={y + 6}>
              {"ABC"[i]}
            </text>
          </g>
        ))}
        <text x={15} y={340}>
          {local
            ? "A/C 训练；B 保留（跨区边丢失）"
            : "实线是边；虚线外轮廓是连通簇"}
        </text>
      </svg>
      <p aria-live="polite">
        {edges.length} 条边；连通簇：
        {clusters.map((c) => c.map((i) => "ABC"[i]).join("–")).join(" / ")}
        。A–B、B–C 均为 0.50，A–C 仅 0.20。
        {local
          ? "未比较跨分区样本，不能证明无泄漏。"
          : "簇内并非每对都超过阈值。"}
      </p>
      <TimelineControls
        timeline={tl}
        reset={{
          label: "全部重置",
          onClick: () => {
            setThreshold(0.5);
            setLocal(false);
            tl.goToStep(0);
          },
        }}
      />
    </Lab>
  );
}

const raw = "mail a@b.io eval KEY";
const masked = "mail [EMAIL] eval KEY";
const vocab = ["[EMAIL]", "mail", "eval", "KEY"];
function tokenize(text: string, splitEmail: boolean) {
  const tokens: { text: string; start: number; end: number }[] = [];
  for (let i = 0; i < text.length; ) {
    if (text[i] === " ") {
      i++;
      continue;
    }
    const match = vocab.find(
      (v) => (!splitEmail || v !== "[EMAIL]") && text.startsWith(v, i),
    );
    const token = match ?? text[i];
    tokens.push({ text: token, start: i, end: i + token.length });
    i += token.length;
  }
  return tokens;
}

export function Lsl03PretrainingDataEvidenceGateLab() {
  const [wrongOrder, setWrongOrder] = useState(false);
  const [splitEmail, setSplitEmail] = useState(false);
  const [checkEval, setCheckEval] = useState(true);
  const tl = useDataTimeline(streamSteps);
  const processed = tl.currentStep > 0;
  const text = processed && !wrongOrder ? masked : raw;
  const tokens = tokenize(text, splitEmail);
  const dropped = processed && tl.currentStep === 2 && checkEval;
  const privacyLeak = processed && wrongOrder;
  return (
    <Lab
      kind="mask-offset-token-stream"
      title="实验三 · 遮蔽改写长度，旧切分不会自行更新"
    >
      <button
        type="button"
        className={button}
        data-stream-toggle="order"
        aria-pressed={wrongOrder}
        onClick={() => setWrongOrder(!wrongOrder)}
      >
        故障：{wrongOrder ? "逐 token 遮蔽" : "先切分再逐 token 遮蔽"}
      </button>
      <div role="group" aria-label="占位符词表" className="my-2">
        <p>占位符词表</p>
        <div className="flex flex-wrap gap-2">
          {([false, true] as const).map((split) => (
            <button
              key={String(split)}
              type="button"
              className={button}
              data-value={split ? "characters" : "atomic"}
              aria-pressed={splitEmail === split}
              onClick={() => setSplitEmail(split)}
            >
              {split ? "[EMAIL] 回退为字符" : "[EMAIL] 单个词元"}
            </button>
          ))}
        </div>
      </div>
      <button
        type="button"
        className={button}
        data-stream-toggle="eval"
        aria-pressed={checkEval}
        onClick={() => setCheckEval(!checkEval)}
      >
        评估串检查：{checkEval ? "开启" : "关闭"}
      </button>
      <svg
        viewBox="0 0 330 410"
        role="img"
        aria-label={`处理阶段${tl.currentStep}，${tokens.length}个词元，${dropped ? "污染样本已丢弃" : privacyLeak ? "邮箱字符泄漏" : "未丢弃"}`}
      >
        <text x={12} y={25}>
          原文字符位置（ASCII，左闭右开）
        </text>
        <text
          x={12}
          y={53}
          fontFamily="monospace"
          textLength={240}
          lengthAdjust="spacingAndGlyphs"
        >
          mail a@b.io eval KEY
        </text>
        <line
          x1={72}
          x2={144}
          y1={65}
          y2={65}
          stroke={accent}
          strokeWidth={4}
        />
        <text x={12} y={92}>
          应遮蔽 [5,11) → [5,12)
        </text>
        <path
          d="M72 100 L72 120 L156 120"
          fill="none"
          stroke={accent}
          strokeWidth={2}
        />
        <text
          x={12}
          y={148}
          fontFamily="monospace"
          textLength={text.length * 12}
          lengthAdjust="spacingAndGlyphs"
        >
          {processed && !wrongOrder ? "mail [EMAIL] eval KEY" : raw}
        </text>
        <line
          x1={72}
          x2={processed && !wrongOrder ? 156 : 144}
          y1={158}
          y2={158}
          stroke={privacyLeak ? danger : accent}
          strokeWidth={3}
        />
        <text x={12} y={179}>
          切分 {tokens.length} 个 · 下标为当前文本 offset
        </text>
        {tokens.map((token, i) => {
          const x = 12 + (i % 4) * 79;
          const y = 195 + Math.floor(i / 4) * 57;
          return (
            <g key={i} data-token-cell="true">
              <rect
                x={x}
                y={y}
                width={72}
                height={49}
                rx={5}
                fill={
                  privacyLeak && token.start >= 5 && token.end <= 11
                    ? danger
                    : accent
                }
                fillOpacity={0.12}
                stroke={
                  privacyLeak && token.start >= 5 && token.end <= 11
                    ? danger
                    : border
                }
              />
              <text
                x={x + 4}
                y={y + 20}
                style={{ fontSize: token.text === "[EMAIL]" ? 16 : 17 }}
              >
                {token.text}
              </text>
              <text x={x + 4} y={y + 41}>
                [{token.start},{token.end})
              </text>
            </g>
          );
        })}
        {dropped && (
          <rect
            data-discarded-frame="true"
            x={5}
            y={187}
            width={322}
            height={172}
            rx={10}
            fill="none"
            stroke={danger}
            strokeWidth={2}
            strokeDasharray="6 5"
          />
        )}
        <text x={12} y={393}>
          {dropped
            ? "命中 eval KEY：丢弃整个样本"
            : privacyLeak
              ? "逐 token 正则未命中完整邮箱"
              : "待检查 / 保留；不是完备安全证明"}
        </text>
      </svg>
      <p aria-live="polite">
        {tokens.length} 个切分词元；输出 {dropped ? 0 : tokens.length} 个。
        {privacyLeak
          ? "邮箱被拆成六个字符，完整邮箱正则逐 token 检查全部漏过。"
          : processed
            ? "先用完整文本遮蔽，再重新生成 offset；eval 从 [12,16) 移到 [13,17)。"
            : "原始邮箱占 6 个字符，空格不输出。"}
        {!checkEval && processed
          ? "评估样本串仍在输出中；不能声称无污染。"
          : ""}
      </p>
      <TimelineControls
        timeline={tl}
        reset={{
          label: "全部重置",
          onClick: () => {
            setWrongOrder(false);
            setSplitEmail(false);
            setCheckEval(true);
            tl.goToStep(0);
          },
        }}
      />
    </Lab>
  );
}
