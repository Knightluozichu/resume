"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useTeachingTimeline } from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

const C = {
  ink: "var(--text-primary)",
  muted: "var(--text-secondary)",
  border: "var(--border)",
  accent: "var(--accent)",
  danger: "var(--danger)",
  bg: "var(--bg-elevated)",
};
const control =
  "min-h-11 min-w-11 w-full rounded border border-border bg-elevated px-2 text-sm text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
// Serialize geometry only. Never feed rounded coordinates back into model calculations.
function coord(n: number) {
  if (!Number.isFinite(n)) throw new Error("Nonfinite drawing coordinate");
  return Number(n.toFixed(9));
}
type NumberForm = "sg" | "pl";
function agreement(subject: NumberForm, phrases: number, fault = false) {
  const nearest: NumberForm = phrases
    ? subject === "sg"
      ? "pl"
      : "sg"
    : subject;
  const controller = fault ? nearest : subject;
  const expectedVerb = subject === "sg" ? "fits" : "fit";
  const selectedVerb = controller === "sg" ? "fits" : "fit";
  return {
    subject,
    phrases,
    nearest,
    controller,
    expectedVerb,
    selectedVerb,
    valid: expectedVerb === selectedVerb,
  };
}
const WORLDS = ["ABC", "ACB", "BAC", "BCA", "CAB", "CBA"];
type Relation = "C<B" | "B<C" | "B<A";
type Query = "A<C" | "C<A";
type Verdict = "inconsistent" | "entailed" | "refuted" | "undetermined";
function precedes(world: string, relation: string) {
  return world.indexOf(relation[0]) < world.indexOf(relation[2]);
}
function factWorlds(second: Relation, query: Query, fault = false, stage = 3) {
  const worlds = WORLDS.filter(
    (w) =>
      (stage < 1 || precedes(w, "A<B")) && (stage < 2 || precedes(w, second)),
  );
  const truth = worlds.filter((w) => precedes(w, query)).length;
  const verdict: Verdict = !worlds.length
    ? "inconsistent"
    : truth === worlds.length
      ? "entailed"
      : truth === 0
        ? "refuted"
        : "undetermined";
  const reported: Verdict =
    fault && stage === 3 && worlds.length
      ? precedes(worlds[0], query)
        ? "entailed"
        : "refuted"
      : verdict;
  const matrix = "ABC"
    .split("")
    .map((item) =>
      [0, 1, 2].map((rank) => worlds.filter((w) => w[rank] === item).length),
    );
  return {
    second,
    query,
    worlds,
    truth,
    falsehood: worlds.length - truth,
    verdict,
    reported,
    matrix,
  };
}
function stackTrace(depth: number, capacity: number, fault = false) {
  const input = "(".repeat(depth) + ")".repeat(depth);
  const exact: number[] = [],
    observed: number[] = [];
  const exactMatches: [number, number][] = [],
    observedMatches: [number, number][] = [];
  let underflow = 0,
    lost = 0;
  const row = (index: number, token: string) => ({
    index,
    token,
    exact: [...exact],
    observed: [...observed],
    exactMatches: [...exactMatches],
    observedMatches: [...observedMatches],
    underflow,
    lost,
  });
  const rows = [row(0, "Start")];
  [...input].forEach((token, i) => {
    if (token === "(") {
      exact.push(i);
      if (fault && observed.length === capacity) lost++;
      else observed.push(i);
    } else {
      exactMatches.push([exact.pop()!, i]);
      const opening = observed.pop();
      if (opening === undefined) {
        if (!underflow) underflow = i + 1;
      } else observedMatches.push([opening, i]);
    }
    rows.push(row(i + 1, token));
  });
  return {
    input,
    rows,
    exactAccept: exact.length === 0,
    observedAccept: observed.length === 0 && underflow === 0,
    firstDivergence:
      rows.find((r) => r.exact.length !== r.observed.length)?.index ?? null,
  };
}
function useTrace(labels: string[]) {
  const key = JSON.stringify(labels);
  const steps = useMemo(
    () => (JSON.parse(key) as string[]).map((label) => ({ label })),
    [key],
  );
  const build = useCallback(
    (tl: Parameters<Parameters<typeof useTeachingTimeline>[0]["build"]>[0]) => {
      steps.forEach(({ label }, i) => tl.label(label, i * 900));
      tl.add(
        { tick: 0 },
        { tick: steps.length, duration: steps.length * 900, ease: "linear" },
        0,
      );
    },
    [steps],
  );
  const timeline = useTeachingTimeline({ steps, build });
  const { reducedMotion, isPlaying, pause } = timeline;
  useEffect(() => {
    if (reducedMotion && isPlaying) pause();
  }, [reducedMotion, isPlaying, pause]);
  return timeline;
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
      className="not-prose my-6 min-w-0 rounded-xl border border-border bg-elevated p-3 text-primary sm:p-5 [&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11 [&_input]:min-w-11 [&_button]:focus-visible:outline-2 [&_button]:focus-visible:outline-accent [&_svg]:mx-auto [&_svg]:block [&_svg]:w-full [&_svg]:max-w-[480px]"
    >
      <h3 className="mb-2 text-base font-semibold">{title}</h3>
      <p className="mb-3 text-sm text-secondary">
        本站确定性有限教具；不运行语言模型，不复现作者训练实验。
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
  id,
  active,
  onClick,
  children,
}: {
  id: string;
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      data-fault={id}
      aria-pressed={active}
      onClick={onClick}
      className={`${control} my-3 h-auto py-2 text-left`}
    >
      故障{active ? "开启" : "关闭"}：{children}
    </button>
  );
}
function Readout({
  name,
  value,
  children,
}: {
  name: string;
  value: object;
  children: ReactNode;
}) {
  return (
    <output
      data-readout={name}
      data-oracle={JSON.stringify(value)}
      aria-live="polite"
      className="block break-words rounded border border-border p-3 text-sm leading-6"
    >
      {children}
    </output>
  );
}
function Node({
  x,
  y,
  text,
  active = true,
}: {
  x: number;
  y: number;
  text: string;
  active?: boolean;
}) {
  return (
    <g opacity={active ? 1 : 0.35}>
      <rect
        x={coord(x - 25)}
        y={coord(y - 16)}
        width={50}
        height={32}
        rx={5}
        fill={C.bg}
        stroke={C.border}
      />
      <text x={coord(x)} y={coord(y + 5)} textAnchor="middle" fill={C.ink}>
        {text}
      </text>
    </g>
  );
}
function GrammarPlot({
  subject,
  phrases,
  fault,
}: {
  subject: NumberForm;
  phrases: number;
  fault: boolean;
}) {
  const trace = useTrace(["主语中心", "嵌入短语", "绑定一致关系", "选择动词"]);
  const stage = trace.currentStep;
  const result = agreement(subject, phrases, fault);
  const headY = 156,
    verbY = 302;
  const nearestX = phrases ? 185 : 55;
  const nearestY = phrases ? 122 + phrases * 48 : headY;
  return (
    <>
      <svg
        viewBox="0 0 280 380"
        role="img"
        aria-label="微型句法树：主语中心与插入短语有不同层级；曲线连接控制名词与动词，末端分支显示单复数匹配。"
        fontSize={15}
      >
        <path
          d="M140 40 L80 84 M140 40 L232 84 M80 84 L55 140 M232 100 V260 L167 286"
          fill="none"
          stroke={C.border}
          strokeWidth={2}
        />
        <Node x={140} y={35} text="S" />
        <Node x={80} y={84} text="NP" />
        <Node x={232} y={84} text="VP" />
        <Node x={55} y={headY} text={subject === "sg" ? "key" : "keys"} />
        {Array.from({ length: phrases }, (_, i) => {
          const py = 122 + i * 48;
          return (
            <g key={i} opacity={stage >= 1 ? 1 : 0.35}>
              <path
                d={`M${coord(i ? 124 : 80)} ${coord(i ? py - 32 : 100)} L124 ${coord(py)} L185 ${coord(py + 48)}`}
                fill="none"
                stroke={C.border}
                strokeWidth={2}
              />
              <Node x={124} y={py} text={i ? "by" : "near"} />
              <Node
                x={185}
                y={py + 48}
                text={
                  i
                    ? subject === "sg"
                      ? "gates"
                      : "gate"
                    : subject === "sg"
                      ? "boxes"
                      : "box"
                }
              />
            </g>
          );
        })}
        <path
          d={`M${coord(fault ? nearestX : 55)} ${coord((fault ? nearestY : headY) + 16)} Q12 275 117 302`}
          fill="none"
          stroke={fault && !result.valid ? C.danger : C.accent}
          strokeWidth={stage >= 2 ? 3 : 1}
          strokeDasharray={stage < 2 ? "4 4" : undefined}
        />
        <Node x={142} y={verbY} text="V" />
        {["fits", "fit"].map((verb, i) => {
          const x = 87 + i * 115,
            selected = result.selectedVerb === verb;
          return (
            <g key={verb}>
              <line
                x1={142}
                y1={318}
                x2={coord(x)}
                y2={342}
                stroke={
                  selected && stage === 3
                    ? result.valid
                      ? C.accent
                      : C.danger
                    : C.border
                }
                strokeWidth={selected && stage === 3 ? 4 : 1}
              />
              <rect
                x={coord(x - 29)}
                y={342}
                width={58}
                height={30}
                rx={4}
                fill={C.bg}
                stroke={
                  selected && stage === 3
                    ? result.valid
                      ? C.accent
                      : C.danger
                    : C.border
                }
              />
              <text x={coord(x)} y={363} textAnchor="middle" fill={C.ink}>
                {verb}
              </text>
            </g>
          );
        })}
      </svg>
      <Readout name="agreement" value={{ ...result, frame: stage }}>
        句子：The {subject === "sg" ? "key" : "keys"}
        {phrases ? ` near the ${subject === "sg" ? "boxes" : "box"}` : ""}
        {phrases === 2
          ? ` by the ${subject === "sg" ? "gates" : "gate"}`
          : ""}{" "}
        {result.selectedVerb}.<br />
        中心要求 {result.expectedVerb}；所选 {result.selectedVerb}；语法匹配{" "}
        {result.valid ? "通过" : "失败"}。最近名词 {result.nearest}，控制名词{" "}
        {result.controller}。
      </Readout>
      <div data-control="agreement-timeline">
        <TimelineControls timeline={trace} />
      </div>
    </>
  );
}
export function TcgMain13WhatLetsItWorkContextContractLab() {
  const [subject, setSubject] = useState<NumberForm>("sg");
  const [phrases, setPhrases] = useState(1);
  const [fault, setFault] = useState(false);
  const [generation, setGeneration] = useState(0);
  const reset = () => {
    setSubject("sg");
    setPhrases(1);
    setFault(false);
    setGeneration((n) => n + 1);
  };
  return (
    <Frame
      id="tcg13-grammar"
      kind="agreement-dependency-parse-tree"
      title="实验一：树上的中心，不是最近的词"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="主语中心的数">
          <select
            data-control="subject-number"
            className={control}
            value={subject}
            onChange={(e) => setSubject(e.target.value as NumberForm)}
          >
            <option value="sg">单数 key</option>
            <option value="pl">复数 keys</option>
          </select>
        </Field>
        <Field label="插入短语数量">
          <select
            data-control="intervening-phrases"
            className={control}
            value={phrases}
            onChange={(e) => setPhrases(Number(e.target.value))}
          >
            {[0, 1, 2].map((n) => (
              <option key={n} value={n}>
                {n} 个短语
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Fault
        id="nearest-noun-controller"
        active={fault}
        onClick={() => setFault((v) => !v)}
      >
        让最近名词控制动词
      </Fault>
      <GrammarPlot
        key={`${subject}-${phrases}-${fault}-${generation}`}
        subject={subject}
        phrases={phrases}
        fault={fault}
      />
      <button
        type="button"
        data-reset="grammar"
        className={`${control} mt-3`}
        onClick={reset}
      >
        全部重置
      </button>
    </Frame>
  );
}
const verdictText = {
  inconsistent: "前提矛盾",
  entailed: "必真",
  refuted: "必假",
  undetermined: "未确定",
};
function FactsPlot({
  second,
  query,
  fault,
}: {
  second: Relation;
  query: Query;
  fault: boolean;
}) {
  const trace = useTrace([
    "六个完整世界",
    "应用 A<B",
    "应用第二前提",
    "检查所有世界",
  ]);
  const stage = trace.currentStep;
  const result = factWorlds(second, query, fault, stage);
  const final = factWorlds(second, query, fault);
  return (
    <>
      <svg
        viewBox="0 0 280 440"
        role="img"
        aria-label="行A B C与列位置1 2 3的支持计数矩阵；下方逐一列出完整排列世界，保留位置间相关性。故障框仅保留第一个世界。"
        fontSize={15}
      >
        <text x={12} y={22} fill={C.ink}>
          位置支持计数（非概率）
        </text>
        {[1, 2, 3].map((rank, c) => (
          <text
            key={rank}
            x={coord(84 + c * 66)}
            y={51}
            textAnchor="middle"
            fill={C.muted}
          >
            {rank}
          </text>
        ))}
        {result.matrix.map((row, r) => (
          <g key={r}>
            <text x={20} y={coord(91 + r * 57)} fill={C.ink}>
              {"ABC"[r]}
            </text>
            {row.map((n, c) => (
              <g key={c}>
                <rect
                  x={coord(55 + c * 66)}
                  y={coord(65 + r * 57)}
                  width={58}
                  height={47}
                  fill={C.accent}
                  fillOpacity={
                    n
                      ? coord(
                          0.12 + (0.72 * n) / Math.max(1, result.worlds.length),
                        )
                      : 0
                  }
                  stroke={C.border}
                />
                <rect
                  x={coord(59 + c * 66)}
                  y={coord(104 + r * 57)}
                  width={coord((50 * n) / Math.max(1, result.worlds.length))}
                  height={4}
                  fill={C.accent}
                />
                <text
                  x={coord(84 + c * 66)}
                  y={coord(94 + r * 57)}
                  textAnchor="middle"
                  fill={C.ink}
                >
                  {n}
                </text>
              </g>
            ))}
          </g>
        ))}
        <text x={12} y={259} fill={C.ink}>
          完整世界 / 查询 {query}
        </text>
        {WORLDS.map((world, i) => {
          const allowed = result.worlds.includes(world),
            truth = precedes(world, query),
            chosen = fault && stage === 3 && result.worlds[0] === world;
          const x = i < 3 ? 12 : 148,
            y = 279 + (i % 3) * 48;
          return (
            <g key={world} opacity={allowed ? 1 : 0.25}>
              <rect
                x={coord(x)}
                y={coord(y)}
                width={120}
                height={39}
                rx={4}
                fill={C.bg}
                stroke={chosen ? C.danger : C.border}
                strokeWidth={chosen ? 3 : 1}
              />
              <text x={coord(x + 8)} y={coord(y + 25)} fill={C.ink}>
                {world}
              </text>
              <circle
                cx={coord(x + 96)}
                cy={coord(y + 20)}
                r={8}
                fill={stage === 3 && allowed && truth ? C.accent : "none"}
                stroke={C.muted}
              />
              {!allowed && (
                <line
                  x1={coord(x + 5)}
                  x2={coord(x + 115)}
                  y1={coord(y + 32)}
                  y2={coord(y + 7)}
                  stroke={C.muted}
                />
              )}
            </g>
          );
        })}
        <text x={12} y={431} fill={C.muted}>
          实心圆=查询真；红框=错误取样
        </text>
      </svg>
      <Readout
        name="fact-worlds"
        value={{
          ...result,
          frame: stage,
          finalVerdict: final.verdict,
          finalReported: final.reported,
        }}
      >
        当前 {result.worlds.length} 个世界，查询真 {result.truth} / 假{" "}
        {result.falsehood}；当前判断：{verdictText[result.verdict]}。<br />
        两条前提应用后：{final.worlds.join("、") || "无世界"}；正确结论{" "}
        {verdictText[final.verdict]}，本次报告 {verdictText[final.reported]}。
      </Readout>
      <div data-control="world-filter-timeline">
        <TimelineControls timeline={trace} />
      </div>
    </>
  );
}
export function TcgMain13WhatLetsItWorkComputeTraceLab() {
  const [second, setSecond] = useState<Relation>("C<B");
  const [query, setQuery] = useState<Query>("A<C");
  const [fault, setFault] = useState(false);
  const [generation, setGeneration] = useState(0);
  const reset = () => {
    setSecond("C<B");
    setQuery("A<C");
    setFault(false);
    setGeneration((n) => n + 1);
  };
  return (
    <Frame
      id="tcg13-facts"
      kind="finite-fact-world-consistency-matrix"
      title="实验二：一句话要对哪些世界负责？"
    >
      <p className="mb-3 text-sm">
        虚构 A、B、C 各占位置1–3且不重复。固定前提
        A&lt;B；小于表示位置靠前，不是现实城市知识。
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="第二条给定事实">
          <select
            data-control="second-premise"
            className={control}
            value={second}
            onChange={(e) => setSecond(e.target.value as Relation)}
          >
            <option value="C<B">C 在 B 前</option>
            <option value="B<C">B 在 C 前</option>
            <option value="B<A">B 在 A 前（矛盾）</option>
          </select>
        </Field>
        <Field label="待判断句子">
          <select
            data-control="fact-query"
            className={control}
            value={query}
            onChange={(e) => setQuery(e.target.value as Query)}
          >
            <option value="A<C">A 在 C 前</option>
            <option value="C<A">C 在 A 前</option>
          </select>
        </Field>
      </div>
      <Fault
        id="first-world-quantifier"
        active={fault}
        onClick={() => setFault((v) => !v)}
      >
        用第一个可行世界代替全部世界
      </Fault>
      <FactsPlot
        key={`${second}-${query}-${fault}-${generation}`}
        second={second}
        query={query}
        fault={fault}
      />
      <button
        type="button"
        data-reset="facts"
        className={`${control} mt-3`}
        onClick={reset}
      >
        全部重置
      </button>
    </Frame>
  );
}
function StackPlot({
  depth,
  capacity,
  fault,
}: {
  depth: number;
  capacity: number;
  fault: boolean;
}) {
  const model = stackTrace(depth, capacity, fault);
  const trace = useTrace([
    "空栈",
    ...[...model.input].map((token, i) => `读${i + 1} ${token}`),
  ]);
  const index = Math.min(trace.currentStep, model.rows.length - 1),
    row = model.rows[index];
  const tx = (i: number) =>
    coord(16 + (i * 248) / Math.max(1, model.input.length - 1));
  const arcs = (pairs: [number, number][], color: string, dashed = false) =>
    pairs.map(([a, b]) => (
      <path
        key={`${a}-${b}`}
        d={`M${tx(a)} 88 Q${coord((tx(a) + tx(b)) / 2)} ${coord(10 + a * 12)} ${tx(b)} 88`}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeDasharray={dashed ? "3 3" : undefined}
      />
    ));
  const final = model.rows[model.rows.length - 1];
  return (
    <>
      <svg
        viewBox="0 0 280 370"
        role="img"
        aria-label="括号远距离匹配弧线以及精确栈和本次程序栈。虚线为精确全程配对，实线为已经执行的配对；容量线随K移动。"
        fontSize={15}
      >
        {arcs(final.exactMatches, C.border, true)}
        {arcs(row.observedMatches, fault ? C.danger : C.accent)}
        {[...model.input].map((token, i) => (
          <g key={i}>
            <rect
              x={coord(tx(i) - 9)}
              y={88}
              width={18}
              height={29}
              rx={3}
              fill={C.bg}
              stroke={i === index - 1 ? C.accent : C.border}
              strokeWidth={i === index - 1 ? 2 : 1}
            />
            <text
              x={tx(i)}
              y={108}
              textAnchor="middle"
              fill={i < index ? C.ink : C.muted}
            >
              {token}
            </text>
          </g>
        ))}
        <text x={72} y={156} textAnchor="middle" fill={C.ink}>
          精确栈
        </text>
        <text
          x={208}
          y={156}
          textAnchor="middle"
          fill={fault ? C.danger : C.accent}
        >
          本次栈
        </text>
        {[row.exact, row.observed].map((stack, c) => (
          <g key={c}>
            <path
              d={`M${coord(34 + c * 136)} 169 V318 H${coord(109 + c * 136)} V169`}
              fill="none"
              stroke={C.border}
              strokeWidth={2}
            />
            {stack.map((opening, i) => (
              <g key={opening}>
                <rect
                  x={coord(39 + c * 136)}
                  y={coord(294 - i * 21)}
                  width={65}
                  height={19}
                  fill={C.bg}
                  stroke={c === 1 && fault ? C.danger : C.accent}
                />
                <text
                  x={coord(71 + c * 136)}
                  y={coord(309 - i * 21)}
                  textAnchor="middle"
                  fill={C.ink}
                >
                  ({opening + 1}
                </text>
              </g>
            ))}
          </g>
        ))}
        <line
          x1={167}
          x2={249}
          y1={coord(314 - capacity * 21)}
          y2={coord(314 - capacity * 21)}
          stroke={C.danger}
          strokeDasharray="4 4"
        />
        <text x={12} y={343} fill={C.muted}>
          K={capacity}；丢失 {row.lost}；欠栈 {row.underflow || "无"}
        </text>
        <text x={12} y={365} fill={C.muted}>
          虚线配对为参考，不是模型预测
        </text>
      </svg>
      <Readout
        name="stack-state"
        value={{
          depth,
          capacity,
          fault,
          frame: index,
          ...row,
          firstDivergence: model.firstDivergence,
          exactAccept: model.exactAccept,
          observedAccept: model.observedAccept,
          finalUnderflow: final.underflow,
        }}
      >
        已读 {index}/{model.input.length}；精确深度 {row.exact.length}，本次深度{" "}
        {row.observed.length}。<br />
        完整序列：精确{model.exactAccept ? "接受" : "拒绝"}，本次
        {model.observedAccept ? "接受" : "拒绝"}；首个深度分岔{" "}
        {model.firstDivergence ?? "无"}，首次欠栈 {final.underflow || "无"}
        。容量仅在故障开启时约束程序。
      </Readout>
      <div data-control="stack-replay-timeline">
        <TimelineControls timeline={trace} />
      </div>
    </>
  );
}
export function TcgMain13WhatLetsItWorkEvidenceGateLab() {
  const [depth, setDepth] = useState(3),
    [capacity, setCapacity] = useState(2);
  const [fault, setFault] = useState(false),
    [generation, setGeneration] = useState(0);
  const reset = () => {
    setDepth(3);
    setCapacity(2);
    setFault(false);
    setGeneration((n) => n + 1);
  };
  return (
    <Frame
      id="tcg13-stack"
      kind="bounded-stack-parenthesis-matching"
      title="实验三：顺眼的局部，丢失的远程状态"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="括号嵌套深度 d">
          <select
            data-control="nesting-depth"
            className={control}
            value={depth}
            onChange={(e) => setDepth(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} 层
              </option>
            ))}
          </select>
        </Field>
        <Field label="错误程序容量 K">
          <select
            data-control="stack-capacity"
            className={control}
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
          >
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n} 格
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Fault
        id="drop-overflow-opening"
        active={fault}
        onClick={() => setFault((v) => !v)}
      >
        栈满时丢弃新的左括号
      </Fault>
      <StackPlot
        key={`${depth}-${capacity}-${fault}-${generation}`}
        depth={depth}
        capacity={capacity}
        fault={fault}
      />
      <button
        type="button"
        data-reset="stack"
        className={`${control} mt-3`}
        onClick={reset}
      >
        全部重置
      </button>
    </Frame>
  );
}
