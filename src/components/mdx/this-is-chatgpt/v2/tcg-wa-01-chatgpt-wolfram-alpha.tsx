"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  useTeachingTimeline,
  type BuildTimeline,
  type TeachingTimeline,
} from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

const C = {
  ink: "var(--text-primary)",
  muted: "var(--text-secondary)",
  border: "var(--border)",
  accent: "var(--accent)",
  warning: "var(--warning)",
  bg: "var(--bg-elevated)",
};
const shell =
  "not-prose my-6 min-w-0 rounded-card border border-border p-3 text-primary [&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11 [&_input]:min-w-11 [&_select]:min-h-11 [&_select]:min-w-11";
const control =
  "min-h-11 min-w-11 max-w-full rounded-control border border-border bg-elevated px-3 py-2 text-primary focus-visible:outline-2 focus-visible:outline-accent";
const drawing = {
  display: "block",
  width: "100%",
  maxWidth: 440,
  margin: "12px auto",
  fontSize: 16,
};
// Rendering only: never feed serialized coordinates back into the computation.
const svg9 = (n: number) => n.toFixed(9);
const VALUES = [4, 7, 9, 6];

function routeTask(terms: number, budget: number, fault: boolean) {
  const values = VALUES.slice(0, terms);
  const exact = values.reduce((a, b) => a + b, 0);
  const cost = 1 + (terms - 1); // Fixture: setup + additions, not API cost.
  const owner = fault ? "language" : budget >= cost ? "compute" : "hold";
  const output =
    owner === "hold"
      ? null
      : fault
        ? values.slice(0, -1).reduce((a, b) => a + b, 0)
        : exact;
  return { values, exact, cost, owner, output };
}
function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}
function unitQuantity(
  amount: number,
  unit: "mL" | "cL",
  count: number,
  fault: boolean,
) {
  const parsedUnit = fault ? "mL" : unit;
  const scale = parsedUnit === "cL" ? 10 : 1;
  const perML = amount * scale;
  const totalML = perML * count;
  const divisor = gcd(totalML, 1000);
  return {
    parsedUnit,
    scale,
    perML,
    totalML,
    numerator: totalML / divisor,
    denominator: 1000 / divisor,
  };
}
function queryKey(amountML: number, count: number, revision: number) {
  return `mul|mL:${amountML}|count:${count}|out:L|rev:${revision}`;
}
function lineageState(
  count: number,
  order: "old-last" | "current-last",
  frame: number,
  fault: boolean,
) {
  const old = { id: "R1", key: queryKey(250, 2, 1), totalML: 500 };
  const current = {
    id: "R2",
    key: queryKey(500, count, 2),
    totalML: unitQuantity(50, "cL", count, false).totalML,
  };
  const scheduled = order === "old-last" ? [current, old] : [old, current];
  const replies = scheduled.slice(0, Math.max(0, Math.min(2, frame - 1)));
  const selected = fault
    ? (replies[replies.length - 1] ?? null)
    : (replies.find((r) => r.key === current.key) ?? null);
  return { old, current, scheduled, replies, selected };
}

function useFrames(labels: string[]) {
  const key = labels.join("|");
  const steps = useMemo(
    () => key.split("|").map((label) => ({ label })),
    [key],
  );
  const build = useCallback<BuildTimeline>(
    (tl) => {
      const clock = { frame: 0 };
      steps.forEach((step, i) => tl.label(step.label, i * 800));
      tl.add(
        clock,
        {
          frame: steps.length - 1,
          duration: (steps.length - 1) * 800,
          ease: "linear",
        },
        0,
      );
    },
    [steps],
  );
  const tl = useTeachingTimeline({ steps, build });
  const { reducedMotion, isPlaying, pause } = tl;
  useEffect(() => {
    if (reducedMotion && isPlaying) pause();
  }, [reducedMotion, isPlaying, pause]);
  return tl;
}
function Clock({
  id,
  timeline,
  reset,
}: {
  id: string;
  timeline: TeachingTimeline;
  reset: () => void;
}) {
  return (
    <div data-control={`${id}-timeline`}>
      <TimelineControls timeline={timeline} />
      <button
        className={`${control} mt-3 w-full`}
        data-reset={id}
        onClick={reset}
      >
        完整重置
        {id === "routing" ? "实验一" : id === "units" ? "实验二" : "实验三"}
      </button>
    </div>
  );
}

function Routing({ reset }: { reset: () => void }) {
  const [terms, setTerms] = useState(3);
  const [budget, setBudget] = useState(3);
  const [fault, setFault] = useState(false);
  const tl = useFrames([
    "读表达式",
    "核算子树成本",
    "选择执行者",
    "给出或暂缓数值",
  ]);
  const state = routeTask(terms, budget, fault);
  const active = tl.currentStep >= 2;
  const ready = tl.currentStep >= 3;
  const color = fault && active ? C.warning : C.accent;
  return (
    <section
      className={shell}
      data-lab="routing"
      data-visual-kind="costed-expression-subtree-routing"
      data-fault={fault ? "language-shortcut" : "none"}
      data-cursor={tl.currentStep}
      data-playing={tl.isPlaying}
      aria-label="实验一：表达式子树的执行者与有限预算"
    >
      <h3 className="text-lg font-semibold">实验一 · 数值子树交给谁？</h3>
      <div className="my-3 grid gap-3 sm:grid-cols-2">
        <label>
          求和项数：{terms}
          <input
            className="mdx-range block w-full"
            data-control="sum-terms"
            aria-label="求和项数"
            type="range"
            min="2"
            max="4"
            step="1"
            value={terms}
            onChange={(e) => {
              tl.pause();
              setTerms(+e.target.value);
            }}
          />
        </label>
        <label>
          计算预算：{budget}
          <input
            className="mdx-range block w-full"
            data-control="compute-budget"
            aria-label="计算预算"
            type="range"
            min="1"
            max="5"
            step="1"
            value={budget}
            onChange={(e) => {
              tl.pause();
              setBudget(+e.target.value);
            }}
          />
        </label>
      </div>
      <button
        className={control}
        data-fault="language-shortcut"
        aria-pressed={fault}
        onClick={() => {
          tl.pause();
          setFault(!fault);
        }}
      >
        故障：用漏末项的语言夹具替代计算（{fault ? "开" : "关"}）
      </button>
      <svg
        viewBox="0 0 330 455"
        style={drawing}
        role="img"
        aria-label="Describe包住Sum表达式；数字叶子连接求和节点；子树执行者、所需成本与预算条随参数改变"
      >
        <text x="12" y="25" fill={C.ink}>
          Describe：用一句话说明
        </text>
        <path d="M165 36 V75" fill="none" stroke={C.muted} strokeWidth="2" />
        <rect
          x="15"
          y="63"
          width="300"
          height="180"
          rx="12"
          fill="none"
          stroke={active ? color : C.border}
          strokeWidth="2"
          strokeDasharray="5 4"
        />
        <text x="165" y="96" textAnchor="middle" fill={C.ink}>
          Sum
        </text>
        {state.values.map((value, i) => {
          const x = 35 + (260 * i) / (terms - 1);
          const omitted = active && fault && i === terms - 1;
          return (
            <g key={i}>
              <path
                d={`M${svg9(x)} 165 L165 108`}
                fill="none"
                stroke={omitted ? C.warning : color}
                strokeWidth="2"
                strokeDasharray={omitted ? "4 4" : undefined}
              />
              <circle
                cx={svg9(x)}
                cy="185"
                r="20"
                fill={C.bg}
                stroke={omitted ? C.warning : C.border}
                strokeWidth="2"
              />
              <text x={svg9(x)} y="191" textAnchor="middle" fill={C.ink}>
                {value}
              </text>
              {omitted && (
                <path
                  d={`M${svg9(x - 15)} 170 l30 30 m0 -30 l-30 30`}
                  stroke={C.warning}
                  strokeWidth="3"
                />
              )}
            </g>
          );
        })}
        <text
          x="165"
          y="228"
          textAnchor="middle"
          fill={active ? color : C.muted}
        >
          {active
            ? state.owner === "compute"
              ? "精确计算子树"
              : state.owner === "hold"
                ? "预算不足：暂缓"
                : "错交语言夹具"
            : "等待选择执行者"}
        </text>
        <text x="12" y="275" fill={C.muted}>
          成本：启动 1 + 加法 {terms - 1}
        </text>
        <rect
          x="25"
          y="291"
          width={svg9(state.cost * 52)}
          height="25"
          fill={tl.currentStep >= 1 ? color : C.border}
        />
        <text x="12" y="343" fill={C.ink}>
          预算 {budget}；成本 {state.cost}（虚拟单位）
        </text>
        <rect
          x="25"
          y="359"
          width={svg9(budget * 52)}
          height="25"
          fill="none"
          stroke={C.ink}
          strokeWidth="2"
        />
        {[1, 2, 3, 4, 5].map((i) => (
          <line
            key={i}
            x1={svg9(25 + i * 52)}
            x2={svg9(25 + i * 52)}
            y1="359"
            y2="384"
            stroke={C.border}
          />
        ))}
        <text x="12" y="427" fill={ready && fault ? C.warning : C.ink}>
          数值：
          {ready
            ? state.output === null
              ? "暂不发布"
              : state.output
            : "等待执行"}
          ；校验和 {state.exact}
        </text>
      </svg>
      <p
        className="text-sm"
        data-readout="routing"
        data-owner={active ? state.owner : "pending"}
        data-cost={state.cost}
        data-output={ready ? (state.output ?? "hold") : "pending"}
        role="status"
      >
        第 {tl.currentStep} 帧；{state.values.join(" + ")} 的精确和为{" "}
        {state.exact}
        。只有选中计算且预算足够才发布该值；语言故障固定漏末项，并非真实模型表现。
      </p>
      <p className="mt-2 text-sm text-secondary">
        猜一猜：项数调到 4、预算仍为
        3，会计算还是暂缓？降低预算只改变执行许可，不改变正确答案。这里没有真实
        API 价格或速度数据。
      </p>
      <Clock id="routing" timeline={tl} reset={reset} />
    </section>
  );
}

function Units({ reset }: { reset: () => void }) {
  const [amount, setAmount] = useState(25);
  const [unit, setUnit] = useState<"mL" | "cL">("cL");
  const [count, setCount] = useState(3);
  const [fault, setFault] = useState(false);
  const tl = useFrames([
    "读取问题",
    "显式解析单位",
    "归一为毫升",
    "按瓶数相乘",
    "约分为升",
  ]);
  const q = unitQuantity(amount, unit, count, fault);
  const ref = unitQuantity(amount, unit, count, false);
  const color =
    fault && unit === "cL" && tl.currentStep >= 1 ? C.warning : C.accent;
  const fillHeight = tl.currentStep >= 2 ? (q.perML / 750) * 90 : 0;
  const totalHeight = tl.currentStep >= 3 ? (q.totalML / 3000) * 160 : 0;
  return (
    <section
      className={shell}
      data-lab="units"
      data-visual-kind="exact-unit-quantity-parse"
      data-fault={fault ? "erase-unit" : "none"}
      data-cursor={tl.currentStep}
      data-playing={tl.isPlaying}
      aria-label="实验二：显式单位解析与精确有理数计算"
    >
      <h3 className="text-lg font-semibold">实验二 · 算对了哪个带单位量？</h3>
      <div className="my-3 grid gap-3 sm:grid-cols-2">
        <label>
          每瓶数值：{amount}
          <input
            className="mdx-range block w-full"
            data-control="quantity-amount"
            aria-label="每瓶数值"
            type="range"
            min="25"
            max="75"
            step="25"
            value={amount}
            onChange={(e) => {
              tl.pause();
              setAmount(+e.target.value);
            }}
          />
        </label>
        <label>
          明确单位
          <select
            className={`${control} block w-full`}
            data-control="quantity-unit"
            aria-label="明确单位"
            value={unit}
            onChange={(e) => {
              tl.pause();
              setUnit(e.target.value as "mL" | "cL");
            }}
          >
            <option value="cL">cL（厘升，10 mL）</option>
            <option value="mL">mL（毫升）</option>
          </select>
        </label>
        <label>
          瓶数：{count}
          <input
            className="mdx-range block w-full"
            data-control="bottle-count"
            aria-label="瓶数"
            type="range"
            min="1"
            max="4"
            step="1"
            value={count}
            onChange={(e) => {
              tl.pause();
              setCount(+e.target.value);
            }}
          />
        </label>
      </div>
      <button
        className={control}
        data-fault="erase-unit"
        aria-pressed={fault}
        onClick={() => {
          tl.pause();
          setFault(!fault);
        }}
      >
        故障：解析时把所有单位当 mL（{fault ? "开" : "关"}）
      </button>
      <svg
        viewBox="0 0 330 535"
        style={drawing}
        role="img"
        aria-label="带单位量与瓶数组成乘法树；小瓶液面、总量容器和正确参考液面展示单位丢失的十倍差异"
      >
        <text x="12" y="26" fill={C.ink}>
          {amount} {unit} / 瓶，{count} 瓶，共多少 L？
        </text>
        <text x="165" y="68" textAnchor="middle" fill={C.ink}>
          Multiply
        </text>
        <path
          d="M165 78 L85 107 M165 78 L258 107"
          fill="none"
          stroke={C.muted}
          strokeWidth="2"
        />
        <text x="85" y="132" textAnchor="middle" fill={color}>
          {amount} {tl.currentStep >= 1 ? q.parsedUnit : unit}
        </text>
        <text x="258" y="132" textAnchor="middle" fill={C.ink}>
          {count}（无量纲）
        </text>
        <text x="12" y="172" fill={C.muted}>
          每瓶：{tl.currentStep >= 2 ? `${q.perML} mL` : "待单位归一"}
        </text>
        {Array.from({ length: count }, (_, i) => {
          const x = 15 + i * 42;
          return (
            <g key={i}>
              <rect
                x={svg9(x)}
                y="200"
                width="29"
                height="90"
                fill="none"
                stroke={C.muted}
              />
              <rect
                x={svg9(x + 1)}
                y={svg9(290 - fillHeight)}
                width="27"
                height={svg9(fillHeight)}
                fill={color}
              />
              {tl.currentStep >= 2 && (
                <line
                  x1={svg9(x)}
                  x2={svg9(x + 29)}
                  y1={svg9(290 - (ref.perML / 750) * 90)}
                  y2={svg9(290 - (ref.perML / 750) * 90)}
                  stroke={C.ink}
                  strokeDasharray="3 2"
                />
              )}
            </g>
          );
        })}
        <text x="12" y="316" fill={C.muted}>
          小瓶满刻度 750 mL
        </text>
        <path
          d="M173 245 H202 l-8 -5 m8 5 l-8 5"
          stroke={C.muted}
          fill="none"
          strokeWidth="2"
        />
        <rect
          x="218"
          y="190"
          width="48"
          height="160"
          fill="none"
          stroke={C.ink}
          strokeWidth="2"
        />
        <rect
          x="219"
          y={svg9(350 - totalHeight)}
          width="46"
          height={svg9(totalHeight)}
          fill={color}
        />
        {[0, 1, 2, 3].map((liters) => (
          <g key={liters}>
            <line
              x1="266"
              x2="273"
              y1={svg9(350 - (liters / 3) * 160)}
              y2={svg9(350 - (liters / 3) * 160)}
              stroke={C.muted}
            />
            <text x="277" y={svg9(355 - (liters / 3) * 160)} fill={C.ink}>
              {liters} L
            </text>
          </g>
        ))}
        {tl.currentStep >= 3 && (
          <line
            x1="212"
            x2="270"
            y1={svg9(350 - (ref.totalML / 3000) * 160)}
            y2={svg9(350 - (ref.totalML / 3000) * 160)}
            stroke={C.ink}
            strokeDasharray="4 3"
            strokeWidth="2"
          />
        )}
        <text x="12" y="390" fill={C.ink}>
          实色：当前；虚线：保留原单位
        </text>
        <text x="12" y="429" fill={C.ink}>
          总毫升：{tl.currentStep >= 3 ? q.totalML : "待乘法"}
        </text>
        <text x="12" y="465" fill={color}>
          {tl.currentStep >= 4
            ? `${q.totalML}/1000 = ${q.numerator}/${q.denominator} L`
            : "最后一步才把毫升换为升"}
        </text>
        <text x="12" y="509" fill={C.muted}>
          归一→整数乘法→有理数约分
        </text>
      </svg>
      <p
        className="text-sm"
        data-readout="units"
        data-parsed-unit={tl.currentStep >= 1 ? q.parsedUnit : "pending"}
        data-total-ml={tl.currentStep >= 3 ? q.totalML : "pending"}
        data-fraction={
          tl.currentStep >= 4 ? `${q.numerator}/${q.denominator}` : "pending"
        }
        role="status"
      >
        解析单位 {tl.currentStep >= 1 ? q.parsedUnit : "待定"}；当前精确结果{" "}
        {q.numerator}/{q.denominator} L，正确参考 {ref.numerator}/
        {ref.denominator}{" "}
        L。这里的图形高度用小数显示，计算本身用有限安全整数和分数。
      </p>
      <p className="mt-2 text-sm text-secondary">
        先预测：cL 改成
        mL，瓶数不变，总液面缩成多少？这只是三数值、两单位的显式语法夹具；缺单位的问题应先澄清，不能靠本图证明自然语言已被正确理解。
      </p>
      <Clock id="units" timeline={tl} reset={reset} />
    </section>
  );
}

function Lineage({ reset }: { reset: () => void }) {
  const [count, setCount] = useState(3);
  const [order, setOrder] = useState<"old-last" | "current-last">("old-last");
  const [fault, setFault] = useState(false);
  const tl = useFrames([
    "发出旧查询Q1",
    "改为当前查询Q2",
    "首个回复到达",
    "第二回复到达",
    "整合当前回答",
  ]);
  const state = lineageState(count, order, tl.currentStep, fault);
  const wrong =
    state.selected !== null && state.selected.key !== state.current.key;
  const arrivalX = (id: string) =>
    182 + state.scheduled.findIndex((r) => r.id === id) * 88;
  const laneY = (id: string) => (id === "R1" ? 112 : 212);
  const color = wrong ? C.warning : C.accent;
  return (
    <section
      className={shell}
      data-lab="lineage"
      data-visual-kind="query-result-lineage-braid"
      data-fault={fault ? "latest-reply-wins" : "none"}
      data-cursor={tl.currentStep}
      data-playing={tl.isPlaying}
      aria-label="实验三：乱序结果与查询身份的绑定谱系"
    >
      <h3 className="text-lg font-semibold">
        实验三 · 最新到达，不等于当前所问
      </h3>
      <div className="my-3 grid gap-3 sm:grid-cols-2">
        <label>
          当前查询的瓶数：{count}
          <input
            className="mdx-range block w-full"
            data-control="current-count"
            aria-label="当前查询瓶数"
            type="range"
            min="2"
            max="4"
            step="1"
            value={count}
            onChange={(e) => {
              tl.pause();
              setCount(+e.target.value);
            }}
          />
        </label>
        <label>
          回复顺序
          <select
            className={`${control} block w-full`}
            data-control="reply-order"
            aria-label="回复顺序"
            value={order}
            onChange={(e) => {
              tl.pause();
              setOrder(e.target.value as "old-last" | "current-last");
            }}
          >
            <option value="old-last">R2先到，旧R1后到</option>
            <option value="current-last">旧R1先到，R2后到</option>
          </select>
        </label>
      </div>
      <button
        className={control}
        data-fault="latest-reply-wins"
        aria-pressed={fault}
        onClick={() => {
          tl.pause();
          setFault(!fault);
        }}
      >
        故障：不核对查询键，最后回复覆盖（{fault ? "开" : "关"}）
      </button>
      <svg
        viewBox="0 0 330 490"
        style={drawing}
        role="img"
        aria-label="两条查询泳道及固定离散到达时刻；回复到归档或当前槽位的连线揭示旧结果覆盖当前结果"
      >
        <text x="12" y="26" fill={C.ink}>
          离散事件轴（不是延迟测量）
        </text>
        <path d="M38 55 H302" stroke={C.muted} />
        {[38, 102, 182, 270].map((x, i) => (
          <g key={i}>
            <line x1={svg9(x)} x2={svg9(x)} y1="50" y2="61" stroke={C.muted} />
            <text x={svg9(x)} y="81" textAnchor="middle" fill={C.muted}>
              {i}
            </text>
          </g>
        ))}
        <line
          x1={svg9([38, 102, 182, 270, 302][tl.currentStep])}
          x2={svg9([38, 102, 182, 270, 302][tl.currentStep])}
          y1="86"
          y2="260"
          stroke={C.border}
          strokeDasharray="3 4"
        />
        <line
          x1="38"
          x2={svg9(arrivalX("R1"))}
          y1="112"
          y2="112"
          stroke={C.muted}
          strokeWidth="2"
        />
        <circle cx="38" cy="112" r="8" fill={C.muted} />
        <text x="12" y="151" fill={C.muted}>
          Q1：25 cL × 2，r1
        </text>
        <line
          x1="102"
          x2={svg9(arrivalX("R2"))}
          y1="212"
          y2="212"
          stroke={tl.currentStep >= 1 ? C.accent : C.border}
          strokeWidth="2"
        />
        <circle
          cx="102"
          cy="212"
          r="8"
          fill={tl.currentStep >= 1 ? C.accent : C.border}
        />
        <text x="12" y="251" fill={C.ink}>
          Q2：50 cL × {count}，r2（当前）
        </text>
        {state.replies.map((reply) => {
          const x = arrivalX(reply.id),
            y = laneY(reply.id);
          const selected = state.selected?.id === reply.id;
          const dest = selected ? 247 : 70;
          return (
            <g key={reply.id}>
              <path
                d={`M${svg9(x)} ${svg9(y + 16)} Q${svg9(x)} 300 ${svg9(dest)} 345`}
                fill="none"
                stroke={selected ? color : C.muted}
                strokeWidth={svg9(selected ? 3 : 1)}
                strokeDasharray={selected ? undefined : "4 3"}
              />
              <rect
                x={svg9(x - 25)}
                y={svg9(y - 16)}
                width="50"
                height="32"
                rx="4"
                fill={C.bg}
                stroke={selected ? color : C.muted}
                strokeWidth="2"
              />
              <text
                x={svg9(x)}
                y={svg9(y + 6)}
                textAnchor="middle"
                fill={selected ? color : C.muted}
              >
                {reply.id}
              </text>
            </g>
          );
        })}
        <rect
          x="18"
          y="345"
          width="104"
          height="50"
          rx="5"
          fill="none"
          stroke={C.muted}
        />
        <text x="70" y="376" textAnchor="middle" fill={C.muted}>
          未绑定归档
        </text>
        <rect
          x="191"
          y="345"
          width="120"
          height="50"
          rx="5"
          fill="none"
          stroke={color}
          strokeWidth="2"
        />
        <text x="251" y="376" textAnchor="middle" fill={color}>
          Q2绑定槽位
        </text>
        <text x="12" y="431" fill={color}>
          绑定：
          {state.selected
            ? `${state.selected.id} → ${state.selected.totalML / 1000} L`
            : "等待当前查询结果"}
        </text>
        <text x="12" y="469" fill={C.muted}>
          R1 = 0.5 L；R2 = {state.current.totalML / 1000} L
        </text>
      </svg>
      <p
        className="break-words text-sm"
        data-readout="lineage"
        data-bound-id={state.selected?.id ?? "none"}
        data-total-ml={state.selected?.totalML ?? "pending"}
        data-key-match={state.selected ? !wrong : "pending"}
        role="status"
      >
        已收 {state.replies.map((r) => r.id).join("、") || "无"}；当前绑定{" "}
        {state.selected?.id ?? "无"}；
        {wrong ? "错误：回复键不等于当前查询键" : "未接受不匹配的回复"}
        。当前完整键：{state.current.key}。
      </p>
      <p className="mt-2 text-sm text-secondary">
        猜一猜：旧回复后到会不会改变
        Q2？反转到达顺序再逐帧看：故障可能在最终帧被新结果掩盖，但中途已绑定过错误数字。本图不访问外部服务，不测量真实异步请求。
      </p>
      <Clock id="lineage" timeline={tl} reset={reset} />
    </section>
  );
}

// Remount resets every owned parameter/fault/frame/play state. The shared hook's
// unmount cleanup cancels the old animation, including a pending async import.
export function TcgWa01ChatgptWolframAlphaContextContractLab() {
  const [epoch, setEpoch] = useState(0);
  return <Routing key={epoch} reset={() => setEpoch((v) => v + 1)} />;
}
export function TcgWa01ChatgptWolframAlphaComputeTraceLab() {
  const [epoch, setEpoch] = useState(0);
  return <Units key={epoch} reset={() => setEpoch((v) => v + 1)} />;
}
export function TcgWa01ChatgptWolframAlphaEvidenceGateLab() {
  const [epoch, setEpoch] = useState(0);
  return <Lineage key={epoch} reset={() => setEpoch((v) => v + 1)} />;
}
