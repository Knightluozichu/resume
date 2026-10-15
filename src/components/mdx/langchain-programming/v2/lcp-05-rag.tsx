"use client";

import { useRef, useState } from "react";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "@/components/mdx/anim/use-teaching-timeline";

const C = {
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  border: "var(--border)",
  accent: "var(--accent)",
  danger: "var(--danger)",
  bg: "var(--bg-elevated)",
};
const labClass =
  "lcp-rag-lab not-prose my-6 rounded-xl border border-border p-3 text-sm text-primary";
const controlClass =
  "min-h-11 rounded border border-border bg-transparent px-3 py-2 text-primary";
const css = `
.lcp-rag-lab { overflow-wrap: anywhere; }
.lcp-rag-lab svg { display:block; width:100%; max-width:540px; height:auto; margin:auto; }
.lcp-rag-lab button,.lcp-rag-lab select,.lcp-rag-exercises button { min-width:44px; min-height:44px; }
.lcp-rag-lab input[type=range] { height:44px; min-width:44px; }
.lcp-rag-lab button:focus-visible,.lcp-rag-lab select:focus-visible,.lcp-rag-lab input:focus-visible { outline:2px solid var(--accent); outline-offset:3px; }
.lcp-rag-lab .mt-4.flex { flex-wrap:wrap; }
`;
const chunkSteps: readonly TeachingStep[] = [
  { label: "来源", caption: "定位原文的版本和字符坐标" },
  { label: "切分", caption: "从原文区间派生子块" },
  { label: "重叠", caption: "标出相邻块重复覆盖的部分" },
];
const rankSteps: readonly TeachingStep[] = [
  { label: "查询", caption: "查询射线与文档向量" },
  { label: "排名", caption: "点积除以模长得到余弦" },
  { label: "融合", caption: "按各库名次融合，不加原始分数" },
];
const contextSteps: readonly TeachingStep[] = [
  { label: "候选", caption: "先检查权限、版本和信任边界" },
  { label: "装配", caption: "只把可用且装得下的证据放入预算" },
  { label: "核验", caption: "逐句核查引用是否支持结论" },
];

// Timeline drives domain overlays. Labels are at the START of each beat.
function useRagTimeline(steps: readonly TeachingStep[]) {
  const clock = useRef({ beat: 0 });
  return useTeachingTimeline({
    steps,
    build: (tl) => {
      steps.forEach((step, i) => tl.label(step.label, i * 900));
      tl.add(
        clock.current,
        { beat: [0, 3], duration: 2700, ease: "linear" },
        0,
      );
    },
  });
}

/** Original export name retained for registry compatibility; this is a chunk lineage lab. */
export function Lcp05RagVersionContractLab() {
  const [size, setSize] = useState(12);
  const [overlap, setOverlap] = useState(4);
  const [lostOffset, setLostOffset] = useState(false);
  const tl = useRagTimeline(chunkSteps);
  const text = "Return in 7 days. Keep receipt!!";
  const chunks: { start: number; end: number }[] = [];
  for (let start = 0; start < text.length; start += size - overlap) {
    const end = Math.min(text.length, start + size);
    chunks.push({ start, end });
    if (end === text.length) break;
  }
  const duplicated =
    chunks.reduce((n, c) => n + c.end - c.start, 0) - text.length;
  const reset = () => {
    tl.pause();
    tl.seek(0);
    setSize(12);
    setOverlap(4);
    setLostOffset(false);
  };
  const x = (offset: number) => 36 + offset * 9;
  return (
    <section
      className={labClass}
      data-rag-lab="chunks"
      data-visual-kind="lcp05-chunk-lineage"
      aria-label="实验一：切块谱系"
    >
      <style>{css}</style>
      <h4 className="mb-3 font-semibold">实验一 · 原文区间不是块序号</h4>
      <div className="flex flex-wrap gap-3">
        <label>
          块长（字符）
          <select
            aria-label="块长"
            className={controlClass}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          >
            {[8, 12, 16].map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </label>
        <label>
          重叠（字符）
          <select
            aria-label="重叠"
            className={controlClass}
            value={overlap}
            onChange={(e) => setOverlap(Number(e.target.value))}
          >
            {[0, 4].map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </label>
        <button
          className={controlClass}
          aria-pressed={lostOffset}
          onClick={() => setLostOffset(!lostOffset)}
        >
          故障：{lostOffset ? "偏移已丢失" : "丢失偏移"}
        </button>
      </div>
      <p className="my-3">
        字符原文（ASCII，共32字符）：<code>{text}</code>
      </p>
      <svg
        viewBox="0 0 360 472"
        role="img"
        aria-label={`D@v2原文32字符派生${chunks.length}块，重复${duplicated}字符；${lostOffset ? "偏移缺失不能定位引用" : "保留半开字符区间"}`}
        fontSize={16}
        fill={C.primary}
      >
        <text x={24} y={28}>
          D@v2 · 字符坐标 [0, 32)
        </text>
        <rect
          x={36}
          y={53}
          width={288}
          height={24}
          fill={C.accent}
          opacity={0.16}
        />
        {[0, 8, 16, 24, 32].map((n) => (
          <g key={n}>
            <line x1={x(n)} x2={x(n)} y1={49} y2={82} stroke={C.border} />
            <text x={x(n)} y={101} textAnchor="middle">
              {n}
            </text>
          </g>
        ))}
        {chunks.map((c, i) => {
          const y = 138 + i * 43;
          return (
            <g key={c.start} data-chunk={`${c.start}:${c.end}`}>
              {tl.currentStep >= 1 && !lostOffset && (
                <path
                  d={`M36,65 H12 V${y + 8} H${x(c.start)}`}
                  fill="none"
                  stroke={C.border}
                  strokeDasharray="3 4"
                />
              )}
              <rect
                x={x(c.start)}
                y={y}
                width={(c.end - c.start) * 9}
                height={16}
                fill={lostOffset ? C.danger : C.accent}
                opacity={0.35}
              />
              {tl.currentStep === 2 && i > 0 && overlap > 0 && (
                <rect
                  x={x(c.start)}
                  y={y}
                  width={overlap * 9}
                  height={16}
                  fill={C.accent}
                />
              )}
              <text x={24} y={y - 5} fill={lostOffset ? C.danger : C.primary}>
                c{i} {lostOffset ? "[?, ?) 无法回指" : `[${c.start}, ${c.end})`}
              </text>
            </g>
          );
        })}
        <text x={24} y={457} fill={C.secondary}>
          实条=覆盖；深色=重复覆盖
        </text>
      </svg>
      <p role="status" className="my-2">
        {chunks.length}块，累计{32 + duplicated}字符，重复{duplicated}字符。
        {lostOffset
          ? "故障：文本还在，但引用无法回指原文；重建带偏移的索引。"
          : "区间以原文为准；重叠不产生新的事实。"}
      </p>
      <TimelineControls
        timeline={tl}
        labelText={Object.fromEntries(
          chunkSteps.map((s) => [s.label, s.caption!]),
        )}
        reset={{ label: "重置实验一", onClick: reset }}
      />
    </section>
  );
}

type Vector = { id: string; x: number; y: number };
const documents: Vector[] = [
  { id: "A", x: 1, y: 0 },
  { id: "B", x: 0.8, y: 0.6 },
  { id: "C", x: 0, y: 1 },
];

/** Exact 2D cosine and rank fusion, not a provider embedding projection. */
export function Lcp05RagRunnableTraceLab() {
  const [angle, setAngle] = useState(0);
  const [topK, setTopK] = useState(2);
  const [fusion, setFusion] = useState(false);
  const [reverse, setReverse] = useState(false);
  const tl = useRagTimeline(rankSteps);
  const q = {
    x: Math.cos((angle * Math.PI) / 180),
    y: Math.sin((angle * Math.PI) / 180),
  };
  const cosines = documents.map((d) => ({
    ...d,
    cosine: (q.x * d.x + q.y * d.y) / Math.hypot(d.x, d.y),
  }));
  const cosineRank = [...cosines].sort(
    (a, b) => b.cosine - a.cosine || a.id.localeCompare(b.id),
  );
  // A separate toy lexical library: B=100, C=90, A=80. No addition to cosine!
  const lexicalOrder = ["B", "C", "A"];
  const ranking = cosineRank.map((d, i) => ({
    ...d,
    cosineContribution: 1 / (60 + i + 1),
    rrf: 1 / (60 + i + 1) + 1 / (60 + lexicalOrder.indexOf(d.id) + 1),
  }));
  ranking.sort(
    (a, b) =>
      (fusion ? b.rrf - a.rrf : b.cosine - a.cosine) ||
      a.id.localeCompare(b.id),
  );
  if (reverse) ranking.reverse();
  const reset = () => {
    tl.pause();
    tl.seek(0);
    setAngle(0);
    setTopK(2);
    setFusion(false);
    setReverse(false);
  };
  return (
    <section
      className={labClass}
      data-rag-lab="retrieval"
      data-visual-kind="lcp05-cosine-rrf"
      aria-label="实验二：向量检索与融合"
    >
      <style>{css}</style>
      <h4 className="mb-3 font-semibold">实验二 · 真实二维，不是高维投影</h4>
      <div className="flex flex-wrap gap-3">
        <label>
          查询角度
          <select
            aria-label="查询角度"
            className={controlClass}
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
          >
            {[0, 45, 90].map((v) => (
              <option key={v} value={v}>
                {v}°
              </option>
            ))}
          </select>
        </label>
        <label>
          top-k
          <select
            aria-label="top-k"
            className={controlClass}
            value={topK}
            onChange={(e) => setTopK(Number(e.target.value))}
          >
            {[1, 2, 3].map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </label>
        <button
          className={controlClass}
          aria-pressed={fusion}
          onClick={() => setFusion(!fusion)}
        >
          RRF融合：{fusion ? "开" : "关"}
        </button>
        <button
          className={controlClass}
          aria-pressed={reverse}
          onClick={() => setReverse(!reverse)}
        >
          故障：{reverse ? "倒序中" : "反转排序"}
        </button>
      </div>
      <svg
        viewBox="0 0 360 458"
        role="img"
        aria-label={`查询${angle}度，${fusion ? "RRF" : "余弦"}排名${ranking.map((d) => d.id).join("、")}，前${topK}个入选${reverse ? "，错误反转排序" : ""}`}
        fontSize={16}
        fill={C.primary}
      >
        <text x={24} y={28}>
          q=({q.x.toFixed(3)}, {q.y.toFixed(3)})
        </text>
        <path
          d="M56,64 V220 H245 M56,80 A140,140 0 0 1 196,220"
          fill="none"
          stroke={C.border}
        />
        <text x={25} y={65}>
          y
        </text>
        <text x={326} y={226}>
          x
        </text>
        <text x={37} y={242}>
          0
        </text>
        {documents.map((d) => {
          const selected = ranking.slice(0, topK).some((r) => r.id === d.id);
          return (
            <g key={d.id} data-vector={d.id}>
              {tl.currentStep >= 1 && (
                <line
                  x1={56}
                  y1={220}
                  x2={56 + d.x * 140}
                  y2={220 - d.y * 140}
                  stroke={C.border}
                />
              )}
              <circle
                cx={56 + d.x * 140}
                cy={220 - d.y * 140}
                r={selected ? 9 : 5}
                fill={selected ? C.accent : C.secondary}
                opacity={selected ? 1 : 0.5}
              />
              <text
                x={d.id === "A" ? 211 : d.id === "B" ? 181 : 65}
                y={d.id === "A" ? 227 : d.id === "B" ? 128 : 77}
              >
                {d.id} ({d.x},{d.y})
              </text>
            </g>
          );
        })}
        <line
          data-query-ray="true"
          x1={56}
          y1={220}
          x2={56 + q.x * 140}
          y2={220 - q.y * 140}
          stroke={C.accent}
          strokeWidth={3}
          strokeDasharray="7 3"
        />
        <text x={24} y={267}>
          {fusion ? "RRF = Σ 1/(60 + 名次)" : "余弦 = 点积 / 两向量模长"}
        </text>
        {ranking.map((d, i) => {
          const y = 300 + i * 51;
          const value = fusion ? d.rrf : d.cosine;
          return (
            <g key={d.id} data-rank={`${i + 1}:${d.id}`}>
              <text x={24} y={y}>
                {i + 1}. {d.id} · {value.toFixed(fusion ? 6 : 3)}
                {i < topK ? " 入选" : ""}
              </text>
              <rect
                x={24}
                y={y + 7}
                width={Math.max(0, value) * (fusion ? 8500 : 280)}
                height={11}
                fill={reverse ? C.danger : C.accent}
                opacity={i < topK ? 0.8 : 0.2}
              />
              {fusion && (
                <rect
                  x={24 + d.cosineContribution * 8500}
                  y={y + 7}
                  width={(d.rrf - d.cosineContribution) * 8500}
                  height={11}
                  fill={reverse ? C.danger : C.secondary}
                  opacity={i < topK ? 0.8 : 0.2}
                />
              )}
            </g>
          );
        })}
        <text x={24} y={445} fill={C.secondary}>
          {tl.currentStep === 2
            ? "另一库：B#1、C#2、A#3"
            : "射线转动会改变点积与排名"}
        </text>
      </svg>
      <p role="status" className="my-2">
        {reverse
          ? "故障：余弦越大越相似，却按相反次序取候选。修复分数方向后重测。"
          : `候选顺序：${ranking
              .slice(0, topK)
              .map((d) => d.id)
              .join(" → ")}；这不是答案正确性判定。`}
      </p>
      <p>
        另一库为固定教学数据：B=100、C=90、A=80；量纲与余弦不同，不能直接相加。融合条中紫色为向量库贡献、灰色为另一库贡献。RRF按文档ID去重后累加名次贡献，未出现项贡献0。此处两库均返回全部三项，再截top-k。
      </p>
      <TimelineControls
        timeline={tl}
        labelText={Object.fromEntries(
          rankSteps.map((s) => [s.label, s.caption!]),
        )}
        reset={{ label: "重置实验二", onClick: reset }}
      />
    </section>
  );
}

type Scenario = "current" | "stale" | "injection" | "absent";
/** Budget packing plus explicit claim/evidence edges; no LLM is called. */
export function Lcp05RagReleaseGateLab() {
  const [budget, setBudget] = useState(12);
  const [scenario, setScenario] = useState<Scenario>("current");
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const tl = useRagTimeline(contextSteps);
  const hasA = scenario !== "stale" && scenario !== "absent";
  const hasB = scenario !== "absent";
  const packedA = hasA && budget >= 8;
  const packedB = hasB && budget >= (packedA ? 12 : 4);
  const used = (packedA ? 8 : 0) + (packedB ? 4 : 0);
  const supported = packedA && !wrongAnswer;
  const reset = () => {
    tl.pause();
    tl.seek(0);
    setBudget(12);
    setScenario("current");
    setWrongAnswer(false);
  };
  return (
    <section
      className={labClass}
      data-rag-lab="context"
      data-visual-kind="lcp05-context-citations"
      aria-label="实验三：预算与引用边界"
    >
      <style>{css}</style>
      <h4 className="mb-3 font-semibold">实验三 · 命中、入包、支持是三件事</h4>
      <div className="flex flex-wrap gap-3">
        <label>
          证据预算
          <select
            aria-label="证据预算"
            className={controlClass}
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
          >
            {[8, 12, 16].map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </label>
        <label>
          候选场景
          <select
            aria-label="候选场景"
            className={controlClass}
            value={scenario}
            onChange={(e) => setScenario(e.target.value as Scenario)}
          >
            <option value="current">当前v2</option>
            <option value="stale">过期v1</option>
            <option value="injection">注入片段X</option>
            <option value="absent">无证据</option>
          </select>
        </label>
        <button
          className={controlClass}
          aria-pressed={wrongAnswer}
          onClick={() => setWrongAnswer(!wrongAnswer)}
        >
          故障：{wrongAnswer ? "误写30天" : "生成错误期限"}
        </button>
      </div>
      <svg
        viewBox="0 0 360 446"
        role="img"
        aria-label={`证据预算${budget}，装入${used}，${packedA ? "A入包" : "A不可用"}，${packedB ? "B入包" : "B不入包"}；${supported ? "期限7天有支持" : wrongAnswer ? "30天无支持" : "期限缺证拒答"}`}
        fontSize={16}
        fill={C.primary}
      >
        <text x={24} y={28}>
          候选 → 合格证据 → 逐句核验
        </text>
        <text x={24} y={60}>
          A ·{" "}
          {scenario === "stale"
            ? "v1 30天（排除）"
            : scenario === "absent"
              ? "缺失"
              : "v2 7天 · 8单位"}
        </text>
        <rect
          x={36}
          y={70}
          width={hasA ? 144 : 0}
          height={17}
          fill={C.accent}
          opacity={0.55}
        />
        <text x={24} y={110}>
          B · {hasB ? "保留收据 · 4单位" : "缺失"}
        </text>
        <rect
          x={36}
          y={120}
          width={hasB ? 72 : 0}
          height={17}
          fill={C.accent}
          opacity={0.35}
        />
        <text
          x={24}
          y={160}
          fill={scenario === "injection" ? C.danger : C.secondary}
        >
          {scenario === "injection"
            ? "X · 不可信指令 · 排除"
            : "X · 无额外候选"}
        </text>
        {scenario === "injection" && (
          <g>
            <rect
              x={36}
              y={170}
              width={144}
              height={17}
              fill={C.danger}
              opacity={0.25}
            />
            <path d="M36,170 L180,187 M36,187 L180,170" stroke={C.danger} />
          </g>
        )}
        <text x={24} y={214}>
          证据占用 {used}/{budget}（空白=剩余）
        </text>
        <rect
          x={36}
          y={230}
          width={budget * 18}
          height={27}
          fill="none"
          stroke={C.border}
        />
        {packedA && (
          <rect
            data-packed="A"
            x={36}
            y={230}
            width={144}
            height={27}
            fill={C.accent}
            opacity={0.7}
          />
        )}
        {packedB && (
          <rect
            data-packed="B"
            x={packedA ? 180 : 36}
            y={230}
            width={72}
            height={27}
            fill={C.accent}
            opacity={0.35}
          />
        )}
        {[0, 4, 8, 12, 16]
          .filter((n) => n <= budget)
          .map((n) => (
            <line
              key={n}
              x1={36 + n * 18}
              x2={36 + n * 18}
              y1={230}
              y2={257}
              stroke={C.border}
            />
          ))}
        {tl.currentStep >= 1 && hasA && (
          <path
            d="M180,85 H340 V222 H108 V230"
            fill="none"
            stroke={C.border}
            strokeDasharray="4 4"
          />
        )}
        {tl.currentStep === 2 && packedA && (
          <path
            data-citation="A"
            d="M108,257 V315"
            fill="none"
            stroke={supported ? C.accent : C.danger}
            strokeWidth={3}
            strokeDasharray={supported ? undefined : "5 4"}
          />
        )}
        {tl.currentStep === 2 && packedB && (
          <path
            data-citation="B"
            d={`M${packedA ? 216 : 72},257 Q320,265 320,285 V365 Q320,377 108,377`}
            fill="none"
            stroke={C.accent}
            strokeWidth={2}
          />
        )}
        <text x={24} y={340} fill={supported ? C.primary : C.danger}>
          {wrongAnswer
            ? "期限：30天 [A]（不支持）"
            : packedA
              ? "期限：7天 [A]"
              : "期限：证据不足，拒答"}
        </text>
        <text x={24} y={402}>
          {packedB ? "收据：请保留 [B]" : "收据：缺少入包证据"}
        </text>
        <text x={24} y={433} fill={C.secondary}>
          实线=支持；虚线=不支持
        </text>
      </svg>
      <p role="status" className="my-2">
        {wrongAnswer
          ? "故障：即便A、B都命中，A也不能支持30天；引用ID存在不等于证据蕴含。"
          : !packedA
            ? "缺少当前期限证据：拒答期限；可以单独回答有依据的收据要求。"
            : "期限7天有当前A支持；收据结论还需B实际入包。"}
      </p>
      <p>
        总窗口假定32单位，固定指令8、预留回答8，证据上限16。本图单位是空白分词，不是真实模型token。按A→B顺序整块装配，不截断。X带固定不可信标签，演示隔离策略，不是通用注入检测器。
      </p>
      <TimelineControls
        timeline={tl}
        labelText={Object.fromEntries(
          contextSteps.map((s) => [s.label, s.caption!]),
        )}
        reset={{ label: "重置实验三", onClick: reset }}
      />
    </section>
  );
}
