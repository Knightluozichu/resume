"use client";

import { useRef, useState } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
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
  danger: "var(--danger)",
  success: "var(--success)",
  warning: "var(--warning)",
} as const;

const T = TEACHING_BEAT_MS;

/* ---------- 顶点覆盖 2-近似：极大匹配构造 × 下界证书 × 单侧选点故障 ---------- */

type Vtx = { id: number; x: number; y: number };

/**
 * 确定性教学图：左侧星形（中心 0，叶子 1/2/3），右侧四顶点路径 4-5-6-7。
 * 最优顶点覆盖 |C*|=3：星形必选中心 0（否则三个叶子全选更贵），
 * 路径 P4 的最小覆盖为 2（取 {5,6}），共 3。由 2^8 子集穷举复核。
 */
const VERTS: readonly Vtx[] = [
  { id: 0, x: 185, y: 180 },
  { id: 1, x: 75, y: 70 },
  { id: 2, x: 60, y: 180 },
  { id: 3, x: 75, y: 290 },
  { id: 4, x: 415, y: 80 },
  { id: 5, x: 545, y: 160 },
  { id: 6, x: 545, y: 300 },
  { id: 7, x: 680, y: 210 },
];

const EDGES: ReadonlyArray<readonly [number, number]> = [
  [0, 1],
  [0, 2],
  [0, 3],
  [4, 5],
  [5, 6],
  [6, 7],
];

/** 已知最优覆盖（穷举复核）：{0, 5, 6}。 */
const OPT = 3;

const VPOS = new Map(VERTS.map((v) => [v.id, v]));

function edgeKey([u, v]: readonly [number, number]): string {
  return `${u}-${v}`;
}

type Strategy = {
  id: string;
  label: string;
  note: string;
  /** 候选边的扫描顺序：算法每次取其中第一条两端都未触碰的边。 */
  order: ReadonlyArray<readonly [number, number]>;
};

const STRATEGIES: readonly Strategy[] = [
  {
    id: "seq",
    label: "顺序 A：按顶点编号",
    note: "先星形后路径，依次取第一条未覆盖边",
    order: [
      [0, 1],
      [0, 2],
      [0, 3],
      [4, 5],
      [5, 6],
      [6, 7],
    ],
  },
  {
    id: "mid",
    label: "顺序 B：先取路径中段",
    note: "先取 (5,6) 再取 (0,1)，匹配立刻变小",
    order: [
      [5, 6],
      [0, 1],
      [0, 2],
      [0, 3],
      [4, 5],
      [6, 7],
    ],
  },
];

const STRATEGY_DEFAULT = "seq";

/** 匹配边的最大条数（顺序 A 取 3 条），决定时间线里的选边槽位数。 */
const MAX_PICKS = 3;

type Pick = {
  edge: readonly [number, number];
  /** 实际进入覆盖集的端点（故障模式下只取一个）。 */
  chosen: readonly number[];
};

/**
 * 模拟 APPROX-VERTEX-COVER：按给定扫描顺序反复取未覆盖边，
 * 端点是否都入 C 由 oneEndpoint 决定；边的"已删除"由两端点共同判定
 * （算法删除与选中边关联的所有边，与故障开关无关）。
 */
function computePicks(
  order: ReadonlyArray<readonly [number, number]>,
  oneEndpoint: boolean,
): Pick[] {
  const touched = new Set<number>();
  const picks: Pick[] = [];
  for (const [u, v] of order) {
    if (touched.has(u) || touched.has(v)) continue;
    picks.push({
      edge: [u, v],
      chosen: oneEndpoint ? [Math.max(u, v)] : [u, v],
    });
    touched.add(u);
    touched.add(v);
  }
  return picks;
}

const STEPS: readonly TeachingStep[] = [
  {
    label: "graph",
    caption: "八顶点教学图：星形 + 路径，最优覆盖 |C*|=3 已由穷举复核",
  },
  {
    label: "matching",
    caption:
      "每轮取一条未覆盖边、两个端点进覆盖；被选边互不相交，构成极大匹配 M",
  },
  {
    label: "cover",
    caption: "覆盖集 C 成形，逐边检查是否每条边都有端点入选",
  },
  {
    label: "certificate",
    caption: "匹配给出下界 |M|≤|C*|=3，于是 |C|=2|M|≤2|C*|，2-近似证书闭合",
  },
];

const STEP_LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

function midpoint([u, v]: readonly [number, number]): { x: number; y: number } {
  const a = VPOS.get(u)!;
  const b = VPOS.get(v)!;
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

export function Clrs4Chapter35ApproximationAlgorithmsLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const pickRefs = useRef<Array<SVGGElement | null>>([]);
  const [strategyId, setStrategyId] = useState<string>(STRATEGY_DEFAULT);
  const [oneEndpoint, setOneEndpoint] = useState(false);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      tl.add(
        stageRefs.current[0]!,
        { opacity: [1, 1], duration: T * 0.5, ease: "out(3)" },
        0,
      );
      tl.label(STEPS[0].label, 0);
      for (let i = 0; i < MAX_PICKS; i++) {
        tl.add(
          pickRefs.current[i]!,
          { opacity: [0, 1], duration: T * 0.45, ease: "out(3)" },
          T + i * T * 0.32,
        );
      }
      tl.label(STEPS[1].label, T);
      tl.add(
        stageRefs.current[2]!,
        { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" },
        2 * T,
      );
      tl.label(STEPS[2].label, 2 * T);
      tl.add(
        stageRefs.current[3]!,
        { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" },
        3 * T,
      );
      tl.label(STEPS[3].label, 3 * T);
    },
  });

  const strategy = STRATEGIES.find((s) => s.id === strategyId) ?? STRATEGIES[0];
  const picks = computePicks(strategy.order, oneEndpoint);
  const cover = new Set(picks.flatMap((p) => p.chosen));
  const touched = new Set(picks.flatMap((p) => [...p.edge]));
  const matchingKeys = new Set(picks.map((p) => edgeKey(p.edge)));
  const feasible = EDGES.every(([u, v]) => cover.has(u) || cover.has(v));
  const coverSize = cover.size;
  const ratio = (coverSize / OPT).toFixed(2);

  const coverText = VERTS.map((v) => v.id)
    .filter((id) => cover.has(id))
    .join(", ");

  const bar = (units: number) => units * 42;

  function applyStrategy(id: string) {
    setStrategyId(id);
    timeline.seek(0);
  }

  function reset() {
    setStrategyId(STRATEGY_DEFAULT);
    setOneEndpoint(false);
    timeline.seek(0);
  }

  const currentStep =
    timeline.currentStep >= STEPS.length
      ? STEPS.length - 1
      : timeline.currentStep;

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="vertex-cover-maximal-matching-certificate"
      data-readout="vertex-cover-approximation-oracle"
      data-status={feasible ? "feasible" : "infeasible"}
      data-strategy={strategy.id}
      data-matching-size={picks.length}
      data-cover-size={coverSize}
      data-opt={OPT}
      data-ratio={feasible ? ratio : "na"}
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CLRS 4e · Chapter 35 · Approximation Algorithms
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              极大匹配 × 下界证书：顶点覆盖 2-近似的完整证明链
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              猜一猜：换一个选边顺序，输出的覆盖集 C
              会变小吗？最坏情况的近似比会跟着变吗？
              再把“每轮只选一个端点”的故障开关打开，C
              还合法吗？先预测，再推进时间线核对匹配、覆盖与证书读数。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-primary">选边顺序</span>
          <div
            role="radiogroup"
            aria-label="极大匹配的选边顺序"
            className="flex flex-wrap gap-2"
          >
            {STRATEGIES.map((s) => (
              <label
                key={s.id}
                className={`flex min-h-11 cursor-pointer items-center rounded-control border px-3 text-sm transition-colors duration-(--duration-hover) ease-standard focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 ${
                  strategyId === s.id
                    ? "border-accent text-accent"
                    : "border-border text-secondary hover:text-primary"
                }`}
              >
                <input
                  type="radio"
                  name="vc-strategy"
                  value={s.id}
                  checked={strategyId === s.id}
                  onChange={() => applyStrategy(s.id)}
                  className="sr-only"
                />
                {s.label}
              </label>
            ))}
          </div>
          <span className="text-xs leading-5 text-secondary">
            {strategy.note}
          </span>
        </div>

        <p className="mb-1 text-xs text-secondary sm:sr-only">
          窄屏图表可横向滚动；聚焦图表区域后也可用方向键滚动。
        </p>
        <div
          role="region"
          aria-label="顶点覆盖近似算法图表，可横向滚动"
          tabIndex={0}
          className="overflow-x-auto rounded-control focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <svg
            viewBox="0 0 800 500"
            role="img"
            aria-labelledby="vc-chart-title vc-chart-description"
            className="block h-auto w-full min-w-[720px] sm:min-w-0"
          >
            <title id="vc-chart-title">顶点覆盖 2-近似的匹配下界证书</title>
            <desc id="vc-chart-description">
              八顶点星形与路径组成的图。图表按时间线展示极大匹配、由匹配构造的顶点覆盖、逐边合法性检查以及由
              |M| ≤ |C*| 和 |C| = 2|M| 推出的
              2-近似保证。选择单侧端点故障后会标出未覆盖边。
            </desc>
            {/* Stage 0：原图 */}
            <g
              ref={(el) => {
                stageRefs.current[0] = el;
              }}
              opacity={1}
            >
              <text x={120} y={42} fontSize="12" fill={C.secondary}>
                星形
              </text>
              <text x={540} y={42} fontSize="12" fill={C.secondary}>
                路径
              </text>
              <text
                x={772}
                y={42}
                textAnchor="end"
                fontSize="12"
                fill={C.secondary}
              >
                穷举复核：|C*|=3（取 {"{0, 5, 6}"}）
              </text>
              {EDGES.map(([u, v]) => {
                const a = VPOS.get(u)!;
                const b = VPOS.get(v)!;
                return (
                  <line
                    key={edgeKey([u, v])}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke={C.secondary}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                );
              })}
              {VERTS.map((v) => (
                <g key={v.id}>
                  <circle
                    cx={v.x}
                    cy={v.y}
                    r="13"
                    fill={C.elevated}
                    stroke={C.primary}
                    strokeWidth="2"
                  />
                  <text
                    x={v.x}
                    y={v.y + 4}
                    textAnchor="middle"
                    fontSize="12"
                    fill={C.primary}
                  >
                    {v.id}
                  </text>
                </g>
              ))}
            </g>

            {/* Stage 1：逐条匹配边 + 端点入选（故障时未选端点画危险环） */}
            {[0, 1, 2].map((slot) => {
              const pick = picks[slot];
              const [u, v] = pick?.edge ?? [0, 0];
              const a = VPOS.get(u)!;
              const b = VPOS.get(v)!;
              const m = midpoint([u, v]);
              return (
                <g
                  key={slot}
                  ref={(el) => {
                    pickRefs.current[slot] = el;
                  }}
                  opacity={0}
                >
                  {pick && (
                    <>
                      <line
                        x1={a.x}
                        y1={a.y}
                        x2={b.x}
                        y2={b.y}
                        stroke={C.accent}
                        strokeWidth="5"
                        strokeLinecap="round"
                        opacity="0.9"
                      />
                      {[u, v].map((id) => {
                        const p = VPOS.get(id)!;
                        const isChosen = pick.chosen.includes(id);
                        return (
                          <g key={id}>
                            <circle
                              cx={p.x}
                              cy={p.y}
                              r="13"
                              fill={isChosen ? C.accent : C.elevated}
                              stroke={isChosen ? C.accent : C.danger}
                              strokeWidth="2"
                              strokeDasharray={isChosen ? undefined : "4 3"}
                            />
                            <text
                              x={p.x}
                              y={p.y + 4}
                              textAnchor="middle"
                              fontSize="12"
                              fill={isChosen ? C.bg : C.danger}
                            >
                              {id}
                            </text>
                          </g>
                        );
                      })}
                      <text
                        x={m.x}
                        y={m.y - 14}
                        textAnchor="middle"
                        fontSize="11"
                        fill={C.accent}
                      >
                        匹配边 {slot + 1}
                      </text>
                    </>
                  )}
                </g>
              );
            })}

            {/* Stage 2：逐边覆盖检查 + C 集合读数 */}
            <g
              ref={(el) => {
                stageRefs.current[2] = el;
              }}
              opacity={0}
            >
              {EDGES.filter(([u, v]) => !matchingKeys.has(edgeKey([u, v]))).map(
                ([u, v]) => {
                  const covered = touched.has(u) || touched.has(v);
                  const m = midpoint([u, v]);
                  if (covered) {
                    return (
                      <g key={`chk-${edgeKey([u, v])}`} data-covered="true">
                        <circle
                          cx={m.x + 12}
                          cy={m.y - 12}
                          r="8"
                          fill={C.elevated}
                          stroke={C.success}
                          strokeWidth="2"
                        />
                        <polyline
                          points={`${m.x + 8},${m.y - 12} ${m.x + 11},${m.y - 9} ${m.x + 16},${m.y - 16}`}
                          fill="none"
                          stroke={C.success}
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </g>
                    );
                  }
                  return (
                    <g key={`miss-${edgeKey([u, v])}`} data-covered="false">
                      <line
                        x1={VPOS.get(u)!.x}
                        y1={VPOS.get(u)!.y}
                        x2={VPOS.get(v)!.x}
                        y2={VPOS.get(v)!.y}
                        stroke={C.danger}
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeDasharray="7 5"
                      />
                      <text
                        x={m.x}
                        y={m.y + 22}
                        textAnchor="middle"
                        fontSize="11"
                        fill={C.danger}
                        fontWeight="600"
                      >
                        漏盖
                      </text>
                    </g>
                  );
                },
              )}
              <rect
                x={60}
                y={352}
                width={520}
                height="34"
                rx="8"
                fill={C.elevated}
                stroke={C.border}
              />
              <text x={76} y={374} fontSize="13" fill={C.primary}>
                {`C = {${coverText || "空集"}}，|C| = ${coverSize}，|M| = ${picks.length}`}
              </text>
              <text
                x={772}
                y={374}
                textAnchor="end"
                fontSize="13"
                fontWeight="600"
                fill={feasible ? C.success : C.danger}
              >
                {feasible
                  ? "每条边都被触碰：C 是合法顶点覆盖"
                  : "存在未覆盖边：C 不是顶点覆盖"}
              </text>
            </g>

            {/* Stage 3：下界与比率条 */}
            <g
              ref={(el) => {
                stageRefs.current[3] = el;
              }}
              opacity={0}
            >
              <text x={60} y={420} fontSize="12" fill={C.secondary}>
                {`|M| = ${picks.length} ≤ |C*| = 3（匹配下界：任意覆盖至少每条匹配边碰一个端点）`}
              </text>
              <text x={60} y={440} fontSize="12" fill={C.secondary}>
                {`|C| = 2|M| = ${2 * picks.length} ≤ 2|C*| = 6（两个端点都选的代价）`}
              </text>

              <text x={300} y={420} fontSize="12" fill={C.secondary}>
                {`上界 2|M| = ${2 * picks.length}`}
              </text>
              <rect
                x={430}
                y={408}
                width={bar(2 * picks.length)}
                height="16"
                rx="4"
                fill="none"
                stroke={C.secondary}
                strokeWidth="2"
                strokeDasharray="6 4"
              />
              <text
                x={436 + bar(2 * picks.length)}
                y={420}
                fontSize="12"
                fill={C.secondary}
              >
                {2 * picks.length}
              </text>

              <text x={300} y={450} fontSize="12" fill={C.primary}>
                {`|C| = ${coverSize}（算法输出${oneEndpoint ? "，故障模式" : ""}）`}
              </text>
              <rect
                x={430}
                y={438}
                width={bar(coverSize)}
                height="16"
                rx="4"
                fill={oneEndpoint ? C.danger : C.accent}
                opacity={oneEndpoint ? 0.75 : 0.9}
              />
              <text
                x={436 + bar(coverSize)}
                y={450}
                fontSize="12"
                fill={C.primary}
              >
                {coverSize}
              </text>

              <text x={300} y={480} fontSize="12" fill={C.success}>
                {"|C*| = 3（穷举复核的最优）"}
              </text>
              <rect
                x={430}
                y={468}
                width={bar(OPT)}
                height="16"
                rx="4"
                fill={C.success}
                opacity="0.85"
              />
              <text x={436 + bar(OPT)} y={480} fontSize="12" fill={C.success}>
                {OPT}
              </text>

              <text
                x={772}
                y={420}
                textAnchor="end"
                fontSize="12"
                fontWeight="600"
                fill={feasible ? C.success : C.danger}
              >
                {feasible
                  ? `证书闭合：|C|/|C*| = ${ratio} ≤ 2`
                  : "证书失效：C 不可行，比率无从谈起"}
              </text>
              <text
                x={772}
                y={440}
                textAnchor="end"
                fontSize="11"
                fill={C.secondary}
              >
                {feasible
                  ? "顺序改变实际大小，2 倍最坏保证不变"
                  : "证明依赖两个端点都进 C——单侧选点不保证可行"}
              </text>
            </g>

            <text
              x={772}
              y={24}
              textAnchor="end"
              fontSize="11"
              fill={C.secondary}
            >
              {`步骤：${STEPS[currentStep]?.label ?? "graph"}`}
            </text>
          </svg>
        </div>
        <p
          className="mt-2 rounded-control border border-border px-3 py-2 text-sm leading-6 text-secondary"
          aria-live="polite"
          aria-atomic="true"
        >
          当前结果：匹配 M ={" "}
          {picks.map((pick) => `(${pick.edge.join(",")})`).join("、") || "∅"}；
          覆盖 C = {`{${coverText}}`}；
          {feasible
            ? `|C|/|C*| = ${ratio}，当前解合法。`
            : "存在未覆盖边，当前解不合法；近似比不适用。"}
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-5">
          <div className="rounded-card border border-border p-3">
            <p className="text-xs text-secondary">匹配大小 |M|</p>
            <p className="mt-1 text-sm font-semibold text-primary">
              {picks.length}
            </p>
          </div>
          <div className="rounded-card border border-border p-3">
            <p className="text-xs text-secondary">覆盖大小 |C|</p>
            <p className="mt-1 text-sm font-semibold text-primary">
              {coverSize}
              {oneEndpoint ? "（单侧选点）" : ""}
            </p>
          </div>
          <div className="rounded-card border border-border p-3">
            <p className="text-xs text-secondary">最优 |C*|</p>
            <p className="mt-1 text-sm font-semibold text-primary">{OPT}</p>
          </div>
          <div className="rounded-card border border-border p-3">
            <p className="text-xs text-secondary">实测比率 |C|/|C*|</p>
            <p className="mt-1 text-sm font-semibold text-primary">
              {feasible ? ratio : "—"}
            </p>
          </div>
          <div className="rounded-card border border-border p-3">
            <p className="text-xs text-secondary">覆盖检查</p>
            <p
              className={`mt-1 text-sm font-semibold ${
                feasible ? "text-success" : "text-danger"
              }`}
              data-status-chip
            >
              {feasible ? "FEASIBLE（证书可闭合）" : "INFEASIBLE（证书失效）"}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <label
            className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-control border px-3 text-sm transition-colors duration-(--duration-hover) ease-standard ${
              oneEndpoint
                ? "border-danger text-danger"
                : "border-border text-secondary hover:text-primary"
            }`}
          >
            <input
              type="checkbox"
              checked={oneEndpoint}
              onChange={(e) => {
                setOneEndpoint(e.target.checked);
                timeline.seek(0);
              }}
              data-fault="one-endpoint-per-matching-edge"
              className="h-4 w-4 accent-[var(--danger)]"
            />
            注入故障：每轮只选一个端点
          </label>
          <span className="max-w-xl text-xs leading-5 text-secondary">
            现象：漏盖边以红色虚线标出，C 不再是合法覆盖 →
            原因：2-近似的证明依赖“选中边的两个端点都进
            C”，单侧选点既不保证可行、下界换算也随之断裂 →
            修法：两个端点都加入；想要更小覆盖应改用带独立证明的方法（如 LP
            舍入），而不是偷掉一个端点。
          </span>
        </div>

        <TimelineControls
          timeline={timeline}
          labelText={STEP_LABEL_TEXT}
          caption="先预测换选边顺序后 |C| 与 |M| 怎么变，再推进时间线；第四步看匹配下界怎样把 2 倍保证钉死。开启故障开关后重播一遍，观察漏盖边出现在哪里。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置顶点覆盖近似算法实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        匹配边互不相交，任意覆盖都至少要碰每条匹配边一次，所以 |M|
        是最优值的下界；算法付出“两个端点都选”的代价换来 |C|=2|M|，上下一夹就是
        2-近似。选边顺序只改变实测比率，不改变 2 这个最坏保证。
      </figcaption>
    </figure>
  );
}
