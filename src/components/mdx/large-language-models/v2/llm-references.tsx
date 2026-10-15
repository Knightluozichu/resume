"use client";

import { useId, useState } from "react";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

const C = {
  bg: "var(--bg)",
  panel: "var(--bg-elevated)",
  line: "var(--border)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
};
const shell =
  "not-prose my-6 min-w-0 rounded-xl border border-border bg-elevated p-3 text-primary sm:p-5 [&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11 [&_input]:min-w-11 [&_select]:min-h-11 [&_select]:min-w-11 [&_:focus-visible]:outline-2 [&_:focus-visible]:outline-offset-2 [&_:focus-visible]:outline-accent [&_.mt-4.flex]:flex-wrap";
const select =
  "mt-1 min-h-11 w-full rounded border border-border bg-bg px-2 py-2 text-sm text-primary";
const stepsGraph = [1, 2, 3].map((n) => ({ label: `展开 ${n} 跳` }));
const stepsLoss = Array.from({ length: 6 }, (_, i) => ({
  label: `计入 token ${i + 1}`,
}));
const stepsDesign = ["预算曲线", "候选配置", "来源切分"].map((label) => ({
  label,
}));
function useReferenceTrace(steps: readonly TeachingStep[]) {
  return useTeachingTimeline({
    steps,
    build(tl) {
      const clock = { value: 0 };
      steps.forEach((s, i) => tl.label(s.label, i * 1200));
      tl.add(
        clock,
        { value: steps.length, duration: steps.length * 1200, ease: "linear" },
        0,
      );
    },
  });
}
function FaultButton({
  fault,
  onClick,
  children,
}: {
  fault: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      data-fault
      aria-pressed={fault}
      onClick={onClick}
      className="mt-3 w-full rounded border border-border bg-bg px-3 py-2 text-left text-sm"
    >
      {fault ? "撤销故障：" : "注入故障："}
      {children}
    </button>
  );
}

// Only these explicitly checked references are retained; this is NOT a full citation database.
const papers = [
  { id: "C", name: "Chinchilla", year: "2022 v1", x: 140, y: 40 },
  { id: "G", name: "GPT-3", year: "2020", x: 60, y: 124 },
  { id: "K", name: "Scaling", year: "2020", x: 224, y: 205 },
  { id: "B", name: "BERT", year: "2018 / 2019", x: 60, y: 226 },
  { id: "A", name: "Attention", year: "2017", x: 140, y: 318 },
];
const citations: [string, string][] = [
  ["C", "G"],
  ["C", "K"],
  ["G", "A"],
  ["G", "B"],
  ["G", "K"],
  ["B", "A"],
];
function reachability(root: string, depth: number) {
  let frontier = [root];
  const visits: Record<string, number> = { [root]: 1 };
  for (let hop = 0; hop < depth; hop++) {
    frontier = frontier.flatMap((id) =>
      citations.filter(([a]) => a === id).map(([, b]) => b),
    );
    frontier.forEach((id) => {
      visits[id] = (visits[id] ?? 0) + 1;
    });
  }
  return visits;
}

export function LlmReferencesContextContractLab() {
  const [root, setRoot] = useState("C");
  const [hops, setHops] = useState(3);
  const [fault, setFault] = useState(false);
  const trace = useReferenceTrace(stepsGraph);
  const arrow = useId().replace(/:/g, "");
  const depth = Math.min(hops, trace.currentStep + 1);
  const visits = reachability(root, depth);
  const unique = Object.keys(visits).length;
  const paths = Object.values(visits).reduce((a, b) => a + b, 0);
  function reset() {
    trace.seek(0);
    setRoot("C");
    setHops(3);
    setFault(false);
  }
  return (
    <section
      className={shell}
      data-visual-kind="citation-reachability-dag"
      data-state={JSON.stringify({
        root,
        hops,
        fault,
        depth,
        unique,
        paths,
        playing: trace.isPlaying,
      })}
      aria-label="论文引用子图实验"
    >
      <h3 className="text-lg font-semibold">1 · 沿引用边找论文，不数重影</h3>
      <p className="my-2 text-sm">
        箭头：引用者 → 被引者。圆内是 walk 到达次数，含起点的零跳
        walk；外环标出已访问论文。仅展示核验过的六条边，不是完整书目。
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm">
          检索起点
          <select
            className={select}
            value={root}
            onChange={(e) => setRoot(e.target.value)}
            aria-label="引用检索起点"
          >
            <option value="C">C · Chinchilla 2022 v1</option>
            <option value="G">G · GPT-3 2020</option>
          </select>
        </label>
        <label className="text-sm">
          最大追溯深度
          <select
            className={select}
            value={hops}
            onChange={(e) => setHops(Number(e.target.value))}
            aria-label="最大引用跳数"
          >
            <option value={1}>A · 1 跳</option>
            <option value={2}>B · 2 跳</option>
            <option value={3}>C · 3 跳</option>
          </select>
        </label>
      </div>
      <svg
        viewBox="0 0 280 366"
        className="mx-auto mt-3 block w-full max-w-lg"
        role="img"
        aria-label={`引用图：${depth}跳，唯一论文${unique}篇，到达次数${paths}次`}
      >
        <defs>
          <marker
            id={arrow}
            markerWidth="7"
            markerHeight="7"
            refX="6"
            refY="3.5"
            orient="auto"
          >
            <path d="M0,0 L7,3.5 L0,7" fill={C.muted} />
          </marker>
        </defs>
        {citations.map(([from, to]) => {
          const a = papers.find((p) => p.id === from)!;
          const b = papers.find((p) => p.id === to)!;
          const dx = b.x - a.x,
            dy = b.y - a.y,
            distance = Math.hypot(dx, dy);
          const x1 = a.x + (dx / distance) * 20,
            y1 = a.y + (dy / distance) * 20;
          const x2 = b.x - (dx / distance) * 22,
            y2 = b.y - (dy / distance) * 22;
          const bend =
            from === "G" && to === "A"
              ? 92
              : from === "C" && to === "K"
                ? 55
                : 0;
          return (
            <path
              key={from + to}
              d={`M${x1},${y1} Q${(x1 + x2) / 2 + bend},${(y1 + y2) / 2} ${x2},${y2}`}
              fill="none"
              stroke={C.muted}
              strokeWidth="1.5"
              markerEnd={`url(#${arrow})`}
              opacity={visits[from] ? 1 : 0.3}
            />
          );
        })}
        {papers.map((p) => (
          <g key={p.id}>
            <circle
              cx={p.x}
              cy={p.y}
              r="20"
              fill={C.panel}
              stroke={visits[p.id] ? C.accent : C.line}
              strokeWidth={visits[p.id] ? 3 : 1}
            />
            <text
              x={p.x}
              y={p.y + 4}
              textAnchor="middle"
              fontSize="12"
              fill={fault && (visits[p.id] ?? 0) > 1 ? C.danger : C.text}
            >
              {p.id}:{visits[p.id] ?? 0}
            </text>
          </g>
        ))}
      </svg>
      <ul className="mb-3 grid gap-1 text-xs text-secondary sm:grid-cols-2">
        {papers.map((p) => (
          <li key={p.id}>
            {p.id} · {p.name} · {p.year}
          </li>
        ))}
      </ul>
      <p className="mb-3 text-xs text-secondary">
        节点按研究作品归并。GPT-3 引的是 BERT 2018 预印本，不是本站下载的 2019
        ACL 版；未指定版本的引用边不补造版本号。
      </p>
      <div
        className="rounded border border-border p-3 text-sm"
        aria-live="polite"
      >
        <p>
          当前 {depth} 跳 · 去重集合：{Object.keys(visits).join(", ")}
        </p>
        <p>
          不同论文（含起点）= <strong>{unique}</strong>；walk
          到达次数（含零跳起点）= {paths}
        </p>
        <p data-result>
          本次报告 = {fault ? paths : unique} 篇；
          {fault && paths !== unique
            ? "错误：重复路径被当成新论文。"
            : "与唯一论文集合一致。"}
        </p>
      </div>
      <FaultButton fault={fault} onClick={() => setFault(!fault)}>
        用路径到达次数冒充不同论文数
      </FaultButton>
      <TimelineControls
        timeline={trace}
        reset={{ label: "完整重置", onClick: reset }}
      />
      <p className="mt-2 text-xs text-secondary">
        子图不是完整文献列表；引用存在 ≠
        引用支持某主张，更不等于因果影响或论文质量。
      </p>
    </section>
  );
}

const targetProbabilities = [0.5, 0.25, 0.8, 0.4, 0.2, 0.1];
function corpusLoss(probabilities: number[], boundary: number, base: string) {
  const divisor = base === "bits" ? Math.LN2 : 1;
  const losses = probabilities.map((p) => -Math.log(p) / divisor);
  const mean = losses.reduce((a, b) => a + b, 0) / losses.length;
  const groups = [losses.slice(0, boundary), losses.slice(boundary)].filter(
    (g) => g.length,
  );
  const wrong =
    groups.reduce(
      (sum, g) => sum + g.reduce((a, b) => a + b, 0) / g.length,
      0,
    ) / groups.length;
  return { losses, mean, wrong };
}
export function LlmReferencesComputeTraceLab() {
  const [split, setSplit] = useState(2);
  const [base, setBase] = useState("nats");
  const [fault, setFault] = useState(false);
  const trace = useReferenceTrace(stepsLoss);
  const n = trace.currentStep + 1;
  const { losses, mean, wrong } = corpusLoss(
    targetProbabilities.slice(0, n),
    split,
    base,
  );
  const estimate = fault ? wrong : mean;
  const ppl = Math.exp(estimate * (base === "bits" ? Math.LN2 : 1));
  const cumulative = [0];
  losses.forEach((v) => cumulative.push(cumulative[cumulative.length - 1] + v));
  const maxLoss = 12;
  const x = (i: number) => 32 + i * 36;
  const y = (v: number) => 220 - (v / maxLoss) * 180;
  const path = cumulative
    .map((v, i) => (i === 0 ? `M${x(0)},${y(0)}` : `H${x(i)} V${y(v)}`))
    .join(" ");
  function reset() {
    trace.seek(0);
    setSplit(2);
    setBase("nats");
    setFault(false);
  }
  return (
    <section
      className={shell}
      data-visual-kind="token-logloss-staircase"
      data-state={JSON.stringify({
        split,
        base,
        fault,
        n,
        mean,
        estimate,
        ppl,
        playing: trace.isPlaying,
      })}
      aria-label="论文损失口径复算实验"
    >
      <h3 className="text-lg font-semibold">2 · 从目标词概率复算损失</h3>
      <p className="my-2 text-sm">
        每段上升量 = −log p。累计曲线终点除以 token
        数，得到语料均值；两个文档不一定一样长。
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm">
          文档 A / B 长度
          <select
            className={select}
            value={split}
            onChange={(e) => setSplit(Number(e.target.value))}
            aria-label="文档长度分配"
          >
            <option value={2}>A · 2 + 4 tokens</option>
            <option value={3}>B · 3 + 3 tokens</option>
          </select>
        </label>
        <label className="text-sm">
          对数单位
          <select
            className={select}
            value={base}
            onChange={(e) => setBase(e.target.value)}
            aria-label="损失对数单位"
          >
            <option value="nats">N · 自然对数 nats</option>
            <option value="bits">B · 二进制 bits</option>
          </select>
        </label>
      </div>
      <svg
        viewBox="0 0 280 330"
        className="mx-auto mt-3 block w-full max-w-lg"
        role="img"
        aria-label={`${n}个token的累计负对数似然；${base}；语料均值${mean.toFixed(4)}`}
      >
        {[0, 4, 8, 12].map((v) => (
          <g key={v}>
            <line x1="32" x2="250" y1={y(v)} y2={y(v)} stroke={C.line} />
            <text
              x="26"
              y={y(v) + 4}
              textAnchor="end"
              fontSize="12"
              fill={C.muted}
            >
              {v}
            </text>
          </g>
        ))}
        <text x="32" y="20" fontSize="12" fill={C.text}>
          累计 −log p（{base}）
        </text>
        <line
          x1={x(split)}
          x2={x(split)}
          y1="30"
          y2="224"
          stroke={C.muted}
          strokeDasharray="4 4"
        />
        <path d={path} stroke={C.accent} strokeWidth="3" fill="none" />
        <line
          x1="32"
          y1="220"
          x2={x(n)}
          y2={y(estimate * n)}
          stroke={fault ? C.danger : C.muted}
          strokeWidth="2"
          strokeDasharray="5 4"
        />
        {losses.map((v, i) => (
          <g key={i}>
            <circle
              cx={x(i + 1)}
              cy={y(cumulative[i + 1])}
              r="4"
              fill={C.accent}
            />
            <text
              x={x(i + 1)}
              y={y(cumulative[i + 1]) - 9}
              textAnchor="middle"
              fontSize="12"
              fill={C.text}
            >
              {v.toFixed(2)}
            </text>
          </g>
        ))}
        {targetProbabilities.map((p, i) => (
          <g key={i} opacity={i < n ? 1 : 0.4}>
            <rect
              x={x(i) + 2}
              y="239"
              width="32"
              height="25"
              fill={i < split ? C.panel : C.bg}
              stroke={C.line}
            />
            <text
              x={x(i) + 18}
              y="256"
              textAnchor="middle"
              fontSize="12"
              fill={C.text}
            >
              {p}
            </text>
            <text
              x={x(i) + 18}
              y="281"
              textAnchor="middle"
              fontSize="12"
              fill={C.muted}
            >
              t{i + 1}
            </text>
            <text
              x={x(i) + 18}
              y="300"
              textAnchor="middle"
              fontSize="12"
              fill={C.muted}
            >
              {i < split ? "A" : "B"}
            </text>
          </g>
        ))}
      </svg>
      <div
        className="rounded border border-border p-3 text-sm"
        aria-live="polite"
      >
        <p>实线：真实累计损失；虚线斜率：本次报告的均值。</p>
        <p>
          正确词元均值 H = {mean.toFixed(6)} {base}
        </p>
        <p data-result>
          本次 H = {estimate.toFixed(6)}；PPL = {ppl.toFixed(6)}
        </p>
        <p>
          均值偏差 = {(estimate - mean).toFixed(6)}。
          {fault && Math.abs(estimate - mean) < 1e-10
            ? "当前文档等长或仅出现一个文档：此反例暂不能揭露故障。"
            : "固定同一批目标概率进行比较。"}
        </p>
      </div>
      <FaultButton fault={fault} onClick={() => setFault(!fault)}>
        先按文档求均值，再对文档等权平均
      </FaultButton>
      <TimelineControls
        timeline={trace}
        reset={{ label: "完整重置", onClick: reset }}
      />
      <p className="mt-2 text-xs text-secondary">
        toy 概率非论文原始测量。bits 用 2 的幂、nats 用 e
        的幂；不同分词、上下文或测试集不可只比 PPL。
      </p>
    </section>
  );
}

const splitDocuments = ["a", "b", "c", "d", "e", "f"];
export function LlmReferencesEvidenceGateLab() {
  const [budget, setBudget] = useState(600);
  const [parameters, setParameters] = useState(5);
  const [split, setSplit] = useState("document");
  const [fault, setFault] = useState(false);
  const trace = useReferenceTrace(stepsDesign);
  const tokens = fault ? 100 : budget / (6 * parameters);
  const actual = 6 * parameters * tokens;
  const overlap = split === "document" ? [] : splitDocuments;
  const x = (n: number) => 32 + (n / 10) * 220;
  const y = (d: number) => 224 - (d / 210) * 180;
  const curve = Array.from({ length: 91 }, (_, i) => {
    const n = 1 + i / 10;
    return `${i ? "L" : "M"}${x(n)},${y(budget / (6 * n))}`;
  }).join(" ");
  function reset() {
    trace.seek(0);
    setBudget(600);
    setParameters(5);
    setSplit("document");
    setFault(false);
  }
  return (
    <section
      className={shell}
      data-visual-kind="iso-flop-split-design"
      data-state={JSON.stringify({
        budget,
        parameters,
        split,
        fault,
        tokens,
        actual,
        overlap,
        stage: trace.currentStep,
        playing: trace.isPlaying,
      })}
      aria-label="等算力与来源切分设计实验"
    >
      <h3 className="text-lg font-semibold">3 · 同一预算曲线，不等于无泄漏</h3>
      <p className="my-2 text-sm">
        先匹配近似训练计算量，再检查源文档是否跨集合出现。图中 B = 十亿；EFLOP =
        10¹⁸ 次浮点运算，不是每秒速度。
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="text-sm">
          计算预算
          <select
            className={select}
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            aria-label="训练计算预算"
          >
            <option value={600}>A · 600 EFLOP</option>
            <option value={1200}>B · 1200 EFLOP</option>
          </select>
        </label>
        <label className="text-sm">
          候选参数 N
          <select
            className={select}
            value={parameters}
            onChange={(e) => setParameters(Number(e.target.value))}
            aria-label="候选模型参数"
          >
            <option value={2}>A · 2 B</option>
            <option value={5}>B · 5 B</option>
            <option value={10}>C · 10 B</option>
          </select>
        </label>
        <label className="text-sm">
          数据切分
          <select
            className={select}
            value={split}
            onChange={(e) => setSplit(e.target.value)}
            aria-label="来源文档切分"
          >
            <option value="document">D · 按源文档隔离</option>
            <option value="chunk">C · 同文档片段交错</option>
          </select>
        </label>
      </div>
      <svg
        viewBox={`0 0 280 ${trace.currentStep >= 2 ? 470 : 330}`}
        className="mx-auto mt-3 block w-full max-w-lg"
        role="img"
        aria-label={`等算力双曲线与来源切分，预算${budget}EFLOP，候选${parameters}B参数与${tokens.toFixed(2)}B训练词元，源文档交集${overlap.length}个`}
      >
        <text x="32" y="20" fontSize="12" fill={C.text}>
          D：训练 tokens（B）
        </text>
        {[0, 100, 200].map((d) => (
          <g key={d}>
            <line x1="32" x2="252" y1={y(d)} y2={y(d)} stroke={C.line} />
            <text
              x="27"
              y={y(d) + 4}
              textAnchor="end"
              fontSize="12"
              fill={C.muted}
            >
              {d}
            </text>
          </g>
        ))}
        <path d={curve} stroke={C.accent} strokeWidth="2.5" fill="none" />
        {[2, 5, 10].map((n) => (
          <g key={n}>
            <circle cx={x(n)} cy={y(budget / (6 * n))} r="4" fill={C.accent} />
            <text
              x={x(n)}
              y="245"
              textAnchor="middle"
              fontSize="12"
              fill={C.muted}
            >
              {n}
            </text>
          </g>
        ))}
        {trace.currentStep >= 1 && (
          <g>
            <line
              x1={x(parameters)}
              x2={x(parameters)}
              y1={y(tokens)}
              y2="224"
              stroke={C.muted}
              strokeDasharray="4 4"
            />
            <circle
              cx={x(parameters)}
              cy={y(tokens)}
              r="7"
              fill={C.panel}
              stroke={fault ? C.danger : C.accent}
              strokeWidth="3"
            />
          </g>
        )}
        <text x="140" y="268" textAnchor="middle" fontSize="12" fill={C.text}>
          N：参数量（B）
        </text>
        <text x="140" y="298" textAnchor="middle" fontSize="12" fill={C.text}>
          曲线固定 6ND；不推断质量或速度
        </text>
        {trace.currentStep >= 2 && (
          <g transform="translate(0 320)">
            <text x="4" y="18" fontSize="12" fill={C.text}>
              每列同一源文档；每格一个片段
            </text>
            <text x="4" y="60" fontSize="12" fill={C.muted}>
              片1
            </text>
            <text x="4" y="101" fontSize="12" fill={C.muted}>
              片2
            </text>
            {splitDocuments.map((id, i) =>
              [0, 1].map((part) => {
                const train = split === "document" ? i < 4 : part === 0;
                return (
                  <g key={id + part}>
                    <rect
                      x={40 + i * 39}
                      y={35 + part * 41}
                      width="35"
                      height="34"
                      fill={C.panel}
                      stroke={train ? C.accent : C.danger}
                      strokeWidth="2"
                    />
                    <text
                      x={57.5 + i * 39}
                      y={56 + part * 41}
                      fontSize="12"
                      textAnchor="middle"
                      fill={C.text}
                    >
                      {id}
                      {part + 1}
                    </text>
                  </g>
                );
              }),
            )}
            <text x="4" y="135" fontSize="12" fill={C.text}>
              强调色：训练；警示色：测试
            </text>
          </g>
        )}
      </svg>
      <p className="text-sm">
        曲线上所有点满足 6ND = {budget}。
        {trace.currentStep < 1
          ? "下一步显示候选配置点。"
          : `候选：N=${parameters}B，D=${tokens.toFixed(2)}B。`}
      </p>
      <div
        className="mt-3 rounded border border-border p-3 text-sm"
        aria-live="polite"
      >
        <p data-result>
          C 实际 = {actual.toFixed(2)} EFLOP；偏离预算{" "}
          {(actual - budget).toFixed(2)}
        </p>
        <p>
          train ∩ test 的源文档数 = {overlap.length}
          {overlap.length ? `（${overlap.join(",")}）` : "（按文档身份隔离）"}
        </p>
        <p>
          结论：{actual !== budget ? "不是等算力对照。" : "近似计算预算匹配。"}
          {overlap.length
            ? "来源重叠，不能称未见文档测试。"
            : "身份无交集，不代表已排除近重复或预训练污染。"}
        </p>
      </div>
      <FaultButton fault={fault} onClick={() => setFault(!fault)}>
        固定 D=100B 却仍声称等算力
      </FaultButton>
      <TimelineControls
        timeline={trace}
        reset={{ label: "完整重置", onClick: reset }}
      />
      <p className="mt-2 text-xs text-secondary">
        只做研究设计算术。6ND
        是近似式，未计所有成本；没有训练模型、拟合质量最优点或测量硬件耗时。
      </p>
    </section>
  );
}
