"use client";

import { useState, type ReactNode } from "react";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "@/components/mdx/anim/use-teaching-timeline";
import {
  TimelineControls,
  TEACHING_BEAT_MS,
} from "@/components/mdx/anim/timeline-controls";

// memory/plan.md: 三种独立领域结构；旧导出名仅为现有registry兼容。
// 所有token、抽取结果、向量坐标均为明确的教学fixture，不请求供应商。
const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  ink: "var(--text-primary)",
  muted: "var(--text-secondary)",
  line: "var(--border)",
  accent: "var(--accent)",
  danger: "var(--danger)",
};
const button =
  "min-h-11 min-w-11 rounded-control border border-border px-3 py-2 text-sm text-primary focus-visible:outline-2 focus-visible:outline-accent";
const budgetSteps = [
  { label: "history", caption: "读取四轮原始历史" },
  { label: "select", caption: "按策略选择或压缩" },
  { label: "prompt", caption: "装配提示并检查预算与事实" },
] as const;
const structureSteps = [
  { label: "old", caption: "已存：小林住上海" },
  { label: "extract", caption: "新消息：小林搬到杭州" },
  { label: "write", caption: "更新属性、关系或追加向量" },
  { label: "read", caption: "读取小林当前住址" },
] as const;
const lifecycleSteps = [
  { label: "empty", caption: "线程A与B均为空" },
  { label: "write", caption: "A写入偏好并尝试提交" },
  { label: "restore", caption: "进程重启后读取已提交状态" },
  { label: "retry", caption: "用相同事件ID重试" },
  { label: "delete", caption: "删除源记录并登记墓碑" },
  { label: "propagate", caption: "传播到派生索引并复查" },
] as const;

function useMemoryTimeline(steps: readonly TeachingStep[]) {
  return useTeachingTimeline({
    steps,
    build(tl) {
      const clock = { beat: 0 };
      steps.forEach((step, i) => {
        const start = i * TEACHING_BEAT_MS;
        tl.label(step.label, start);
        tl.add(
          clock,
          { beat: [i, i + 1], duration: TEACHING_BEAT_MS, ease: "linear" },
          start,
        );
      });
    },
  });
}

function Frame({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      data-memory-lab={id}
      data-visual-kind={`lcp07-${id}`}
      aria-label={title}
      className="memory-lab not-prose my-6 min-w-0 rounded-card border border-border bg-bg p-3 sm:p-5"
    >
      <h3 className="mb-3 text-lg font-semibold text-primary">{title}</h3>
      <p className="mb-4 text-sm text-secondary">
        离线教学模拟 · 不调用模型、真实分词器或外部数据库
      </p>
      {children}
      <style>{`
        .memory-lab svg {display:block;width:100%;max-width:440px;height:auto;margin:16px auto;overflow:visible}
        .memory-lab svg text {font-size:18px;fill:var(--text-primary)}
        .memory-lab button,.memory-lab select,.memory-lab input {min-height:44px;min-width:44px;max-width:100%}
        .memory-lab button:disabled {opacity:.5;cursor:not-allowed}
        .memory-lab button[aria-pressed=true] {border-color:var(--accent);color:var(--accent)}
        .memory-lab select {width:100%;border:1px solid var(--border);border-radius:8px;background:var(--bg);padding:8px;color:var(--text-primary)}
        .memory-lab label {display:block;font-size:14px;margin-top:12px}
        .memory-lab input[type=range] {display:block;width:100%;accent-color:var(--accent)}
        .memory-lab ol[aria-hidden=true] {display:none}
        .memory-lab .mt-4.flex {flex-wrap:wrap}
        .memory-lab button:focus-visible,.memory-lab select:focus-visible,.memory-lab input:focus-visible {outline:2px solid var(--accent);outline-offset:3px}
      `}</style>
    </section>
  );
}

function Controls({
  timeline,
  steps,
  reset,
}: {
  timeline: ReturnType<typeof useMemoryTimeline>;
  steps: readonly TeachingStep[];
  reset: () => void;
}) {
  return (
    <TimelineControls
      timeline={timeline}
      labelText={Object.fromEntries(
        steps.map((s) => [s.label, s.caption ?? s.label]),
      )}
      reset={{ label: "重置全部", onClick: reset }}
    />
  );
}

function Cross({ x, y }: { x: number; y: number }) {
  return (
    <path
      d={`M${x - 6} ${y - 6}l12 12m-12 0l12 -12`}
      stroke={C.danger}
      strokeWidth={3}
    />
  );
}

const turns = [
  { label: "1 不能吃花生", cost: 10 },
  { label: "2 周五出发", cost: 14 },
  { label: "3 改到周六", cost: 12 },
  { label: "4 想吃面条", cost: 16 },
] as const;
type Policy = "buffer" | "window" | "summary" | "hybrid";

export function Lcp07MemoryVersionContractLab() {
  const [policy, setPolicy] = useState<Policy>("window");
  const [budget, setBudget] = useState(32);
  const [lossy, setLossy] = useState(false);
  const timeline = useMemoryTimeline(budgetSteps);
  const phase = timeline.currentStep;
  // window按轮，summary全量压到8，hybrid旧三轮8+最近一轮16。
  const kept =
    policy === "buffer"
      ? [0, 1, 2, 3]
      : policy === "window"
        ? [2, 3]
        : policy === "hybrid"
          ? [3]
          : [];
  const summaryCost = policy === "summary" || policy === "hybrid" ? 8 : 0;
  const cost = kept.reduce((n, i) => n + turns[i].cost, summaryCost);
  const overflow = cost > budget;
  const allergy = policy === "buffer" || (summaryCost > 0 && !lossy);
  const facts = [
    allergy,
    policy === "buffer" || policy === "window" || !lossy,
    true,
  ];
  const answer = !allergy
    ? "证据缺失：必须追问过敏史"
    : "保留禁忌：不得推荐花生";
  const reset = () => {
    timeline.goToStep(0);
    setPolicy("window");
    setBudget(32);
    setLossy(false);
  };
  return (
    <Frame id="budget" title="实验1 · 预算窗口与摘要损失">
      <label>
        记忆策略
        <select
          value={policy}
          onChange={(e) => setPolicy(e.target.value as Policy)}
        >
          <option value="buffer">全缓冲：52 token</option>
          <option value="window">最近2轮：28 token</option>
          <option value="summary">摘要：8 token</option>
          <option value="hybrid">摘要+最近1轮：24 token</option>
        </select>
      </label>
      <label>
        历史可用预算：{budget} token（总上限 = {budget + 16}）
        <input
          aria-label="历史可用预算"
          type="range"
          min={16}
          max={56}
          step={4}
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
        />
      </label>
      <button
        className={`${button} mt-3`}
        aria-pressed={lossy && summaryCost > 0}
        disabled={summaryCost === 0}
        onClick={() => setLossy(!lossy)}
      >
        {summaryCost === 0
          ? "故障仅用于摘要策略"
          : lossy
            ? "修复摘要：保留禁忌"
            : "故障：摘要漏掉否定词"}
      </button>
      <svg
        viewBox="0 0 360 550"
        role="img"
        aria-label={`四轮原始历史52 token；当前策略占${cost}，预算${budget}；${allergy ? "保留" : "丢失"}花生禁忌`}
        data-cost={cost}
        data-overflow={overflow}
      >
        <text x={12} y={24}>
          原始历史 · 条长代表 token 费用
        </text>
        {turns.map((turn, i) => (
          <g
            key={turn.label}
            opacity={phase > 0 && !kept.includes(i) ? 0.45 : 1}
          >
            <text x={12} y={60 + i * 49}>
              {turn.label}
            </text>
            <rect
              x={170}
              y={42 + i * 49}
              width={turn.cost * 9}
              height={27}
              fill={kept.includes(i) ? C.accent : C.elevated}
              stroke={C.line}
            />
            <text
              x={340}
              y={62 + i * 49}
              textAnchor="end"
              style={{ fill: C.ink }}
            >
              {turn.cost}
            </text>
          </g>
        ))}
        <path
          d="M180 244v27m-7-8l7 8 7-8"
          stroke={C.accent}
          strokeWidth={3}
          fill="none"
        />
        <text x={12} y={299}>
          装配：{cost} / {budget} token
        </text>
        <rect
          x={12}
          y={319}
          width={336}
          height={34}
          fill={C.elevated}
          stroke={C.line}
        />
        {summaryCost > 0 && (
          <rect
            x={12}
            y={319}
            width={summaryCost * 6}
            height={34}
            fill={C.accent}
          />
        )}
        {kept.map((index, j) => {
          const before =
            summaryCost +
            kept.slice(0, j).reduce((s, i) => s + turns[i].cost, 0);
          return (
            <rect
              key={index}
              x={12 + before * 6}
              y={319}
              width={turns[index].cost * 6}
              height={34}
              fill={C.accent}
              opacity={0.45 + j * 0.15}
              stroke={C.bg}
            />
          );
        })}
        <path
          d={`M${12 + budget * 6} 310v55`}
          stroke={C.danger}
          strokeWidth={3}
        />
        <text x={12} y={390} style={{ fill: overflow ? C.danger : C.ink }}>
          {overflow ? "超预算：拒绝装配，不能静默溢出" : "预算通过 ≠ 信息完整"}
        </text>
        {["花生禁忌", "周六出发", "面条偏好"].map((fact, i) => (
          <g key={fact}>
            <circle
              cx={25}
              cy={423 + i * 37}
              r={10}
              fill={facts[i] ? C.accent : C.bg}
              stroke={facts[i] ? C.accent : C.danger}
              strokeWidth={2}
            />
            {!facts[i] && <Cross x={25} y={423 + i * 37} />}
            <text x={46} y={429 + i * 37}>
              {fact}
              {facts[i] ? " · 在上下文" : " · 未保留"}
            </text>
          </g>
        ))}
        <text x={12} y={542}>
          摘要是预置样本，不是模型生成
        </text>
      </svg>
      <p aria-live="polite" className="text-sm text-primary">
        {phase === 0
          ? "先比较四轮原文与下方策略装配。"
          : phase === 1
            ? "淡色历史被移出原文；摘要占用独立预算。"
            : `${overflow ? "装配失败。" : "可送入模型。"}${answer}。`}
        {summaryCost > 0
          ? ` 摘要样本：${lossy ? "爱吃花生，周五出发，喜欢面条" : "不能吃花生，改周六出发，喜欢面条"}。`
          : " 不生成摘要。"}
      </p>
      <Controls timeline={timeline} steps={budgetSteps} reset={reset} />
    </Frame>
  );
}

type Structure = "entity" | "kg" | "vector";
const vectorRows = [
  { id: "A旧", x: 0.65, y: 0.7, owner: "A", text: "小林住上海" },
  { id: "A新", x: 0.85, y: 0.45, owner: "A", text: "小林搬到杭州" },
  { id: "B私", x: 0.91, y: 0.68, owner: "B", text: "小林住址是苏州" },
] as const;

export function Lcp07MemoryRunnableTraceLab() {
  const [structure, setStructure] = useState<Structure>("entity");
  const [fault, setFault] = useState(false);
  const timeline = useMemoryTimeline(structureSteps);
  const step = timeline.currentStep;
  const written = step >= 2;
  const searching = step >= 3;
  const candidates = vectorRows.filter(
    (r) => (r.id !== "A新" || written) && (fault || r.owner === "A"),
  );
  const ranked = [...candidates].sort((a, b) => {
    const distance = (r: (typeof vectorRows)[number]) =>
      (r.x - 0.9) ** 2 + (r.y - 0.65) ** 2;
    return distance(a) - distance(b);
  });
  const winner = ranked[0];
  const reset = () => {
    timeline.goToStep(0);
    setStructure("entity");
    setFault(false);
  };
  return (
    <Frame id="structure" title="实验2 · 三种不同的读写结构">
      <label>
        存储结构
        <select
          value={structure}
          onChange={(e) => setStructure(e.target.value as Structure)}
        >
          <option value="entity">实体：属性键更新</option>
          <option value="kg">知识图：关系边更新</option>
          <option value="vector">向量：追加并相似检索</option>
        </select>
      </label>
      <button
        className={`${button} mt-3`}
        aria-pressed={fault}
        onClick={() => setFault(!fault)}
      >
        {fault ? "修复：按用户A隔离" : "故障：丢掉用户隔离键"}
      </button>
      <svg
        viewBox="0 0 360 465"
        role="img"
        aria-label={`${structure}存储，第${step + 1}步；${fault ? "隔离键缺失" : "按用户A隔离"}`}
        data-structure={structure}
        data-written={written}
        data-fault={fault}
      >
        <text x={12} y={28}>
          {step === 0 ? "已有事实：小林住上海" : "新输入：小林搬到杭州"}
        </text>
        {structure === "entity" && (
          <g>
            <text x={12} y={79}>
              键：{fault ? "小林（同名混合）" : "用户A / 小林"}
            </text>
            <path
              d="M35 95v51h35m-35 0v78h35"
              stroke={fault ? C.danger : C.accent}
              strokeWidth={3}
              fill="none"
            />
            <text x={82} y={142}>
              属性 location
            </text>
            <rect
              x={82}
              y={160}
              width={245}
              height={46}
              fill={C.elevated}
              stroke={C.line}
            />
            <text x={98} y={190}>
              {written
                ? fault
                  ? "苏州（B覆盖A）"
                  : "杭州（替换上海）"
                : "上海"}
            </text>
            <text x={82} y={247}>
              来源 source_event
            </text>
            <text x={82} y={285}>
              {written ? (fault ? "B/e2" : "A/e2") : "A/e1"}
            </text>
            {written && <Cross x={315} y={114} />}
            <text x={12} y={350}>
              写：按键更新，不追加聊天全文
            </text>
            <text x={12} y={385}>
              读：精确键 → 属性值
            </text>
          </g>
        )}
        {structure === "kg" && (
          <g>
            <path
              d="M111 181L248 105"
              stroke={written ? C.line : C.accent}
              strokeWidth={3}
              strokeDasharray={written ? "7 5" : undefined}
            />
            {written && (
              <path
                d="M111 205L248 282"
                stroke={fault ? C.danger : C.accent}
                strokeWidth={4}
              />
            )}
            <circle
              cx={70}
              cy={194}
              r={43}
              fill={C.elevated}
              stroke={fault ? C.danger : C.accent}
              strokeWidth={3}
            />
            <text x={70} y={200} textAnchor="middle">
              小林
            </text>
            <circle cx={284} cy={84} r={39} fill={C.elevated} stroke={C.line} />
            <text x={284} y={90} textAnchor="middle">
              上海
            </text>
            {written && (
              <>
                <circle
                  cx={284}
                  cy={304}
                  r={39}
                  fill={C.elevated}
                  stroke={fault ? C.danger : C.accent}
                  strokeWidth={3}
                />
                <text x={284} y={310} textAnchor="middle">
                  {fault ? "苏州" : "杭州"}
                </text>
              </>
            )}
            <text x={143} y={192}>
              曾居住
            </text>
            {written && (
              <text x={143} y={282}>
                现居住
              </text>
            )}
            <text x={12} y={385}>
              写：替换有效边；读：沿关系查找
            </text>
          </g>
        )}
        {structure === "vector" && (
          <g>
            <path
              d="M40 348V78m0 270h288"
              stroke={C.line}
              strokeWidth={2}
              fill="none"
            />
            <text x={43} y={66}>
              示意维度 y
            </text>
            <text x={208} y={380}>
              示意维度 x
            </text>
            <circle
              cx={40 + 0.9 * 280}
              cy={348 - 0.65 * 250}
              r={searching ? 66 : 0}
              fill="none"
              stroke={C.accent}
              strokeDasharray="6 5"
            />
            {vectorRows
              .filter((r) => r.id !== "A新" || written)
              .map((r) => {
                const x = 40 + r.x * 280;
                const y = 348 - r.y * 250;
                const eligible = fault || r.owner === "A";
                return (
                  <g key={r.id} opacity={eligible ? 1 : 0.3}>
                    {searching && winner.id === r.id && (
                      <path
                        d={`M292 185.5L${x} ${y}`}
                        stroke={r.owner === "B" ? C.danger : C.accent}
                        strokeWidth={4}
                      />
                    )}
                    <circle
                      cx={x}
                      cy={y}
                      r={10}
                      fill={
                        eligible
                          ? r.owner === "B"
                            ? C.danger
                            : C.accent
                          : C.bg
                      }
                      stroke={C.line}
                      strokeWidth={2}
                    />
                    <text
                      x={x - 12}
                      y={y + (r.id === "B私" ? -20 : r.id === "A旧" ? -20 : 30)}
                      textAnchor="end"
                    >
                      {r.id}
                    </text>
                  </g>
                );
              })}
            <path d="M292 177.5l8 8-8 8-8-8z" fill={C.ink} />
            <text x={46} y={420}>
              菱形=查询；圆=记录；圈=搜索区域
            </text>
          </g>
        )}
        <text x={12} y={454} style={{ fill: fault ? C.danger : C.ink }}>
          {fault
            ? "用户键丢失：可能读入B的私有事实"
            : "用户键隔离读写，不靠提示"}
        </text>
      </svg>
      <p aria-live="polite" className="text-sm text-primary">
        {searching
          ? structure === "vector"
            ? `top-1：${winner.text}（${winner.id}）；平方距离：${((winner.x - 0.9) ** 2 + (winner.y - 0.65) ** 2).toFixed(4)}。相似不证明最新。`
            : `当前查询返回：${fault ? "苏州，错误用户" : "杭州，用户A"}。`
          : "依次推进：抽取 → 写入 → 读取。图中抽取与坐标均为预置fixture。"}
        {structure === "kg" &&
          " 虚线为失效旧边，不参与当前住址查询；生产还需来源与有效期。"}
      </p>
      <Controls timeline={timeline} steps={structureSteps} reset={reset} />
    </Frame>
  );
}

export function Lcp07MemoryReleaseGateLab() {
  const [thread, setThread] = useState("A");
  const [fault, setFault] = useState<"none" | "shared" | "crash" | "stale">(
    "none",
  );
  const timeline = useMemoryTimeline(lifecycleSteps);
  const step = timeline.currentStep;
  const submitted = step >= 1 && !(fault === "crash" && step < 3);
  const source = submitted && step < 4;
  const derived = submitted && (step < 5 || fault === "stale");
  const leaked = thread === "B" && fault === "shared";
  const selectedHasRecord = (thread === "A" || leaked) && source;
  const reset = () => {
    timeline.goToStep(0);
    setThread("A");
    setFault("none");
  };
  return (
    <Frame id="lifecycle" title="实验3 · 线程、恢复与删除传播">
      <label>
        读取线程
        <select value={thread} onChange={(e) => setThread(e.target.value)}>
          <option value="A">用户A / thread A</option>
          <option value="B">用户B / thread B</option>
        </select>
      </label>
      <label>
        故障注入（单一条件）
        <select
          value={fault}
          onChange={(e) => setFault(e.target.value as typeof fault)}
        >
          <option value="none">正常</option>
          <option value="shared">A/B复用thread_id</option>
          <option value="crash">提交前崩溃，之后重试</option>
          <option value="stale">索引删除任务未投递</option>
        </select>
      </label>
      <svg
        viewBox="0 0 360 590"
        role="img"
        aria-label={`线程${thread}；${lifecycleSteps[step].caption}；源记录${source ? "存在" : "无"}，派生索引${derived ? "存在" : "无"}`}
        data-source={source}
        data-derived={derived}
        data-thread={thread}
      >
        <text x={13} y={28}>
          检查点：按 thread_id 分泳道
        </text>
        <text x={24} y={66}>
          A
        </text>
        <text x={196} y={66}>
          B
        </text>
        <path d="M45 80v235M217 80v235" stroke={C.line} strokeWidth={3} />
        {[0, 1, 2, 3].map((i) => {
          const active = i <= Math.min(step, 3);
          const committed = i > 0 && active && !(fault === "crash" && i < 3);
          return (
            <g key={i}>
              <circle
                cx={45}
                cy={96 + i * 63}
                r={12}
                fill={committed ? C.accent : C.bg}
                stroke={active ? C.accent : C.line}
                strokeWidth={2}
              />
              <circle
                cx={217}
                cy={96 + i * 63}
                r={12}
                fill={fault === "shared" && committed ? C.danger : C.bg}
                stroke={C.line}
                strokeWidth={2}
              />
              <text x={65} y={102 + i * 63}>
                {i === 0
                  ? "空"
                  : i === 3
                    ? "e1重试"
                    : i === 2
                      ? "恢复"
                      : "e1提交"}
              </text>
              {fault === "shared" && committed && (
                <path
                  d={`M57 ${96 + i * 63}v24h137v-24h9`}
                  fill="none"
                  stroke={C.danger}
                  strokeWidth={2}
                />
              )}
            </g>
          );
        })}
        {fault === "crash" && step >= 1 && step < 3 && <Cross x={45} y={159} />}
        <text x={12} y={347}>
          源记录
        </text>
        <text x={220} y={347}>
          派生索引
        </text>
        <rect
          x={12}
          y={365}
          width={118}
          height={57}
          rx={5}
          fill={C.elevated}
          stroke={source ? C.accent : C.line}
          strokeWidth={2}
        />
        <text x={71} y={400} textAnchor="middle">
          {source ? "e1偏好" : "空"}
        </text>
        <path
          d="M134 394h79m-8-7 8 7-8 7"
          stroke={derived && !source ? C.danger : C.accent}
          strokeWidth={3}
          strokeDasharray={step === 4 ? "6 4" : undefined}
          fill="none"
        />
        <circle
          cx={280}
          cy={394}
          r={48}
          fill={C.elevated}
          stroke={derived ? (source ? C.accent : C.danger) : C.line}
          strokeWidth={3}
        />
        <text x={280} y={400} textAnchor="middle">
          {derived ? "e1向量" : "空"}
        </text>
        {step >= 4 && (
          <>
            <path
              d="M31 452h38v42H31z"
              fill={C.elevated}
              stroke={C.accent}
              strokeWidth={2}
            />
            <text x={85} y={480}>
              墓碑 e1 → {step >= 5 && fault !== "stale" ? "已确认" : "待传播"}
            </text>
          </>
        )}
        <text x={12} y={531}>
          线程读取：{selectedHasRecord ? "e1偏好" : "空"}
        </text>
        <text
          x={12}
          y={568}
          style={{ fill: !source && derived ? C.danger : C.ink }}
        >
          {!source && derived
            ? "源已删，索引仍在：删除尚未闭环"
            : step >= 5
              ? "当前源与索引均空；备份仍需策略"
              : "重试按事件ID去重，不重复写e1"}
        </text>
      </svg>
      <p aria-live="polite" className="text-sm text-primary">
        {fault === "shared"
          ? "A/B共享键会让检查点串线；应由认证身份派生隔离键，而不是让模型选择。"
          : fault === "crash" && step === 2
            ? "提交前崩溃：恢复读不到未提交的e1。下一步用同一ID重试才持久化。"
            : step >= 4
              ? "此图仅模拟当前源与派生索引。删除/到期需传播与回执；并不证明旧检查点、缓存、备份已清理。"
              : "state是本轮状态；checkpointer保存线程快照；store可按用户namespace跨线程读取。"}
      </p>
      <Controls timeline={timeline} steps={lifecycleSteps} reset={reset} />
    </Frame>
  );
}
