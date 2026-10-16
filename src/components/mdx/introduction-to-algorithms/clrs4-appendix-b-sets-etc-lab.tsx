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
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
} as const;

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  {
    label: "universe",
    caption: "固定 universe U={1..6}，每个对象只问“在不在”",
  },
  {
    label: "set",
    caption: "elements 组成 set：无重复、无顺序，配 bitmask 表示",
  },
  { label: "relation", caption: "pairs 组成 relation：用矩阵与有向图检查性质" },
  {
    label: "function",
    caption: "relation 加“单值”约束成为 function，看 range 与 codomain",
  },
  { label: "graph", caption: "pairs 成为 edges：度数和握手定理约束 edge 数" },
  { label: "tree", caption: "connected 且 acyclic：edge 数恰好是 |V|−1" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

type Mode = "venn" | "relation" | "function" | "graph" | "tree";

const MODE_TITLE: Record<Mode, string> = {
  venn: "set 与 bitmask",
  relation: "relation 与 Boolean matrix",
  function: "function 与 range",
  graph: "graph 与握手定理",
  tree: "tree 与 |E|=|V|−1",
};

// 关系 R 的 Boolean matrix（行 = 起点，列 = 终点），固定确定性数据。
const RELATION_MATRIX: readonly (readonly number[])[] = [
  [1, 1, 0, 0],
  [1, 1, 1, 0],
  [0, 0, 1, 1],
  [0, 0, 1, 1],
];

// 可实现的度数序列 3,3,3,2,1；六条边各贡献两个端点。
const GRAPH_EDGES: readonly (readonly [number, number])[] = [
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 2],
  [1, 3],
  [2, 4],
];

const TREE_EDGES: readonly (readonly [number, number])[] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 0],
];

const GRAPH_DEGREES = [3, 3, 3, 2, 1];

// 正五边形顶点坐标（中心 280,640，半径 88），无随机数，SSR 确定。
const GRAPH_POINTS: readonly (readonly [number, number])[] = [
  [280, 552],
  [363.7, 612.7],
  [331.7, 711.3],
  [228.3, 711.3],
  [196.3, 612.7],
];

const FIGURE_DESCRIPTION: Readonly<Record<Mode, string>> = {
  venn: "全集与集合的 Venn 图和 bitmask 表示；集合无序且不含重复元素。",
  relation: "关系的有向图与 Boolean matrix；可检查自反、对称和传递性质。",
  function: "函数映射图；range 是 codomain 的子集，图中函数为单射但非满射。",
  graph:
    "五顶点简单无向图，度数为 3、3、3、2、1，共六条边；四个奇度顶点符合握手定理。",
  tree: "五顶点五边的树；加入一条额外边会形成环，树满足边数等于顶点数减一。",
};

export function Clrs4AppendixBSetsEtcLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("venn");
  const [fault, setFault] = useState(false);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        // 首步在 t=0 必须可见：stage 0 用 [1,1]，其余从 0 淡入。
        const opacity = index === 0 ? ([1, 1] as const) : ([0, 1] as const);
        tl.add(
          stageRefs.current[index]!,
          { opacity, duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        // label 打在该步动画的起始时刻。
        tl.label(step.label, index * T);
      });
    },
  });

  const activeIndex = Math.min(STEPS.length - 1, timeline.currentStep);
  const activeStep = STEPS[activeIndex];

  function reset() {
    timeline.goToStep(0);
    setMode("venn");
    setFault(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="clrs4-appendix-b-sets-etc"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CLRS 4e · Appendix B · Sets, Etc.
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              从一堆元素到树：离散对象是怎样一层层构造出来的？
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              沿时间线观察同一批对象如何依次成为 set、relation、function、graph
              与 tree；切换下方结构，并用故障注入亲眼看概念混淆造成的错误。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <div className="mb-4 flex flex-wrap items-end gap-4">
          <label className="block min-w-52 flex-1 text-xs text-secondary">
            <span className="mb-1 block font-semibold text-primary">
              选择要观察的结构
            </span>
            <select
              aria-label="选择 set、relation、function、graph 或 tree 结构"
              value={mode}
              onChange={(event) => setMode(event.target.value as Mode)}
              className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
            >
              <option value="venn">set · Venn 图与 bitmask</option>
              <option value="relation">
                relation · 有向图与 Boolean matrix
              </option>
              <option value="function">function · 映射与 range</option>
              <option value="graph">graph · 度数与握手定理</option>
              <option value="tree">tree · |E|=|V|−1</option>
            </select>
          </label>

          <label className="flex min-h-11 cursor-pointer select-none items-center gap-2 rounded-control border border-border px-3 py-2 text-xs text-secondary">
            <input
              type="checkbox"
              checked={fault}
              onChange={(event) => setFault(event.target.checked)}
              className="h-4 w-4 accent-accent"
            />
            注入故障：概念混淆
          </label>
        </div>

        <svg
          viewBox="0 0 900 820"
          role="img"
          aria-label={`Appendix B 离散结构示意图：${FIGURE_DESCRIPTION[mode]}${fault ? " 当前已注入概念混淆故障。" : ""}`}
          className="mx-auto block h-auto w-full"
        >
          <rect x="0" y="0" width="900" height="820" rx="14" fill={C.bg} />

          <text x="30" y="36" fontSize="16" fontWeight="700" fill={C.primary}>
            universe → set → relation → function → graph → tree
          </text>
          <text x="30" y="60" fontSize="12" fill={C.secondary}>
            sets etc · 当前阶段：{activeStep.label} · 结构：{MODE_TITLE[mode]}
            {fault ? " · 故障已注入" : ""}
          </text>

          <rect
            x="30"
            y="78"
            width="258"
            height="120"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="52" y="106" fontSize="13" fontWeight="700" fill={C.accent}>
            对象合同
          </text>
          <text x="52" y="132" fontSize="12" fill={C.primary}>
            同一批 elements，只认定义
          </text>
          <text x="52" y="156" fontSize="11" fill={C.secondary}>
            U = {"{1,2,3,4,5,6}"}，全部确定性数据
          </text>
          <text x="52" y="180" fontSize="11" fill={C.secondary}>
            结构决定合法操作与复杂度
          </text>

          <line
            x1="300"
            y1="138"
            x2="326"
            y2="138"
            stroke={C.success}
            strokeWidth="2.5"
          />

          <rect
            x="336"
            y="78"
            width="258"
            height="120"
            rx="12"
            fill={activeIndex >= 1 ? C.accent : C.elevated}
            fillOpacity={activeIndex >= 1 ? 0.12 : 1}
            stroke={activeIndex >= 1 ? C.accent : C.border}
            strokeWidth="1.5"
          />
          <text
            x="358"
            y="106"
            fontSize="13"
            fontWeight="700"
            fill={activeIndex >= 1 ? C.accent : C.primary}
          >
            逐层加约束
          </text>
          <text x="358" y="132" fontSize="11" fill={C.primary}>
            set 去重无序 · relation 记 pairs
          </text>
          <text x="358" y="156" fontSize="11" fill={C.secondary}>
            function 加单值 · graph 连 vertices
          </text>
          <text x="358" y="180" fontSize="11" fill={C.secondary}>
            tree 再去 cycle
          </text>

          <line
            x1="606"
            y1="138"
            x2="632"
            y2="138"
            stroke={fault ? C.warning : C.success}
            strokeWidth="2.5"
          />

          <rect
            x="642"
            y="78"
            width="228"
            height="120"
            rx="12"
            fill={fault ? C.warning : C.success}
            fillOpacity="0.1"
            stroke={fault ? C.warning : C.success}
            strokeWidth="1.5"
          />
          <text
            x="756"
            y="106"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={fault ? C.warning : C.success}
          >
            当前结论
          </text>
          <text
            x="756"
            y="132"
            textAnchor="middle"
            fontSize="12"
            fill={C.primary}
          >
            {fault ? "定义被悄悄换掉" : "每个对象都有不变量"}
          </text>
          <text
            x="756"
            y="156"
            textAnchor="middle"
            fontSize="11"
            fill={fault ? C.warning : C.secondary}
          >
            {fault ? "先看故障说明再对照" : "算法证明依赖这些前提"}
          </text>
          <text
            x="756"
            y="180"
            textAnchor="middle"
            fontSize="11"
            fill={C.secondary}
          >
            前提丢失 = 证明失效
          </text>

          {STEPS.map((step, index) => {
            const isActive = index === activeIndex;
            const tone = isActive ? C.accent : C.border;
            return (
              <g
                key={"stage-" + step.label}
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
                style={{ opacity: index === 0 ? 1 : 0 }}
              >
                <rect
                  x="30"
                  y={218 + index * 50}
                  width="840"
                  height="42"
                  rx="10"
                  fill={isActive ? C.accent : C.elevated}
                  fillOpacity={isActive ? 0.1 : 1}
                  stroke={tone}
                  strokeWidth={isActive ? 2.5 : 1.5}
                />
                <text
                  x="52"
                  y={237 + index * 50}
                  fontSize="13"
                  fontWeight="700"
                  fill={isActive ? C.accent : C.primary}
                >
                  {index + 1} · {step.label}
                </text>
                <text
                  x="190"
                  y={237 + index * 50}
                  fontSize="12"
                  fill={C.primary}
                >
                  {step.caption}
                </text>
                <text
                  x="52"
                  y={253 + index * 50}
                  fontSize="11"
                  fill={C.secondary}
                >
                  {index < activeIndex
                    ? "约束已确认"
                    : index === activeIndex
                      ? "当前要回答的问题"
                      : "等待前一步"}
                </text>
                <text
                  x="852"
                  y={244 + index * 50}
                  textAnchor="end"
                  fontSize="11"
                  fill={isActive ? C.accent : C.secondary}
                >
                  {index === 0
                    ? "U"
                    : index === 1
                      ? "⊆"
                      : index === 2
                        ? "R"
                        : index === 3
                          ? "f"
                          : index === 4
                            ? "G"
                            : "T"}
                </text>
              </g>
            );
          })}

          <text x="30" y="546" fontSize="13" fontWeight="700" fill={C.primary}>
            结构实验台：{MODE_TITLE[mode]}
          </text>
          <text
            x="852"
            y="546"
            textAnchor="end"
            fontSize="11"
            fill={C.secondary}
          >
            {fault ? "红色 = 被混淆的概念" : "切换结构，保持同一批元素"}
          </text>

          {mode === "venn" && (
            <>
              <circle
                cx="238"
                cy="652"
                r="86"
                fill={C.accent}
                fillOpacity="0.12"
                stroke={C.accent}
                strokeWidth="2"
              />
              <circle
                cx="352"
                cy="652"
                r="86"
                fill={C.success}
                fillOpacity="0.1"
                stroke={C.success}
                strokeWidth="2"
              />
              <text
                x="166"
                y="586"
                fontSize="13"
                fontWeight="700"
                fill={C.accent}
              >
                A
              </text>
              <text
                x="430"
                y="586"
                fontSize="13"
                fontWeight="700"
                fill={C.success}
              >
                B
              </text>
              <text
                x="196"
                y="628"
                textAnchor="middle"
                fontSize="13"
                fill={C.primary}
              >
                1
              </text>
              <text
                x="212"
                y="688"
                textAnchor="middle"
                fontSize="13"
                fill={C.primary}
              >
                2
              </text>
              <text
                x="282"
                y="636"
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill={C.primary}
              >
                3
              </text>
              <text
                x="300"
                y="672"
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill={C.primary}
              >
                4
              </text>
              <text
                x="392"
                y="628"
                textAnchor="middle"
                fontSize="13"
                fill={C.primary}
              >
                5
              </text>
              <text
                x="408"
                y="688"
                textAnchor="middle"
                fontSize="13"
                fill={C.primary}
              >
                6
              </text>

              <text
                x="540"
                y="592"
                fontSize="12"
                fontWeight="700"
                fill={C.primary}
              >
                bitmask 表示（bit i = 元素 i 在不在）
              </text>
              {(["A", "B", "A∩B"] as const).map((row, r) => {
                const bits =
                  r === 0
                    ? [1, 1, 1, 1, 0, 0]
                    : r === 1
                      ? [0, 0, 1, 1, 1, 1]
                      : [0, 0, 1, 1, 0, 0];
                return (
                  <g key={row}>
                    <text
                      x="540"
                      y={624 + r * 44}
                      fontSize="12"
                      fontWeight="700"
                      fill={r === 2 ? C.accent : C.secondary}
                    >
                      {row}
                    </text>
                    {bits.map((bit, i) => (
                      <g key={i}>
                        <rect
                          x={586 + i * 40}
                          y={606 + r * 44}
                          width="32"
                          height="28"
                          rx="6"
                          fill={bit ? C.accent : C.elevated}
                          fillOpacity={bit ? 0.16 : 1}
                          stroke={bit ? C.accent : C.border}
                          strokeWidth="1.5"
                        />
                        <text
                          x={602 + i * 40}
                          y={625 + r * 44}
                          textAnchor="middle"
                          fontSize="12"
                          fill={bit ? C.accent : C.secondary}
                        >
                          {bit}
                        </text>
                      </g>
                    ))}
                  </g>
                );
              })}
              {fault ? (
                <>
                  <text
                    x="540"
                    y="756"
                    fontSize="12"
                    fontWeight="700"
                    fill={C.warning}
                  >
                    故障：把 multiset {"{1,1,2,3,3}"} 当 set
                  </text>
                  <text x="540" y="778" fontSize="11" fill={C.secondary}>
                    multiset 保留 multiplicity，元素 1 出现两次；当 set
                    去重会丢掉频率信息。
                  </text>
                </>
              ) : (
                <>
                  <text
                    x="540"
                    y="756"
                    fontSize="12"
                    fontWeight="700"
                    fill={C.success}
                  >
                    A−B = {"{1,2}"}，A∩B = {"{3,4}"}
                  </text>
                  <text x="540" y="778" fontSize="11" fill={C.secondary}>
                    set 无重复无顺序；A−B ≠ B−A，差运算不可交换。
                  </text>
                </>
              )}
            </>
          )}

          {mode === "relation" && (
            <>
              {([0, 1, 2, 3] as const).map((i) => (
                <g key={"rel-node-" + i}>
                  <circle
                    cx={i % 2 === 0 ? 140 : 300}
                    cy={i < 2 ? 612 : 706}
                    r="24"
                    fill={C.elevated}
                    stroke={C.border}
                    strokeWidth="1.5"
                  />
                  <text
                    x={i % 2 === 0 ? 140 : 300}
                    y={i < 2 ? 618 : 712}
                    textAnchor="middle"
                    fontSize="13"
                    fill={C.primary}
                  >
                    {i + 1}
                  </text>
                </g>
              ))}
              <path
                d="M 164 612 L 276 612"
                stroke={C.accent}
                strokeWidth="2"
                markerEnd="url(#clrs4-appendixB-arrow)"
              />
              <path
                d="M 276 626 L 164 626"
                stroke={C.accent}
                strokeWidth="2"
                markerEnd="url(#clrs4-appendixB-arrow)"
              />
              <path
                d="M 292 634 L 156 684"
                stroke={C.accent}
                strokeWidth="2"
                markerEnd="url(#clrs4-appendixB-arrow)"
              />
              <path
                d="M 128 682 L 128 636"
                stroke={C.border}
                strokeWidth="1.5"
                markerEnd="url(#clrs4-appendixB-arrow)"
                transform="rotate(180 128 659)"
              />
              <path
                d="M 312 682 L 312 636"
                stroke={C.border}
                strokeWidth="1.5"
                markerEnd="url(#clrs4-appendixB-arrow)"
                transform="rotate(180 312 659)"
              />
              <path
                d="M 312 706 L 152 706"
                stroke={C.border}
                strokeWidth="1.5"
                markerEnd="url(#clrs4-appendixB-arrow)"
                transform="rotate(180 232 706)"
              />
              <path
                d="M 156 730 L 296 730"
                stroke={C.border}
                strokeWidth="1.5"
                markerEnd="url(#clrs4-appendixB-arrow)"
              />
              <text
                x="220"
                y="596"
                textAnchor="middle"
                fontSize="11"
                fill={C.secondary}
              >
                1 ⇄ 2，2 → 3，3 ⇄ 4，含自环
              </text>

              <text
                x="480"
                y="592"
                fontSize="12"
                fontWeight="700"
                fill={C.primary}
              >
                Boolean matrix（行=起点，列=终点）
              </text>
              {RELATION_MATRIX.map((row, i) => (
                <g key={"rel-row-" + i}>
                  <text
                    x="500"
                    y={632 + i * 40}
                    fontSize="12"
                    fill={C.secondary}
                  >
                    {i + 1}
                  </text>
                  {row.map((cell, j) => {
                    const missingReverse = fault && i === 2 && j === 1;
                    return (
                      <g key={j}>
                        <rect
                          x={528 + j * 44}
                          y={612 + i * 40}
                          width="36"
                          height="32"
                          rx="6"
                          fill={
                            missingReverse
                              ? C.warning
                              : cell
                                ? C.accent
                                : C.elevated
                          }
                          fillOpacity={cell ? (missingReverse ? 0.2 : 0.16) : 1}
                          stroke={
                            missingReverse
                              ? C.warning
                              : cell
                                ? C.accent
                                : C.border
                          }
                          strokeWidth="1.5"
                        />
                        <text
                          x={546 + j * 44}
                          y={633 + i * 40}
                          textAnchor="middle"
                          fontSize="12"
                          fill={
                            missingReverse
                              ? C.warning
                              : cell
                                ? C.accent
                                : C.secondary
                          }
                        >
                          {cell}
                        </text>
                      </g>
                    );
                  })}
                </g>
              ))}
              {["1", "2", "3", "4"].map((label, j) => (
                <text
                  key={label}
                  x={546 + j * 44}
                  y="606"
                  textAnchor="middle"
                  fontSize="11"
                  fill={C.secondary}
                >
                  {label}
                </text>
              ))}
              {fault ? (
                <>
                  <text
                    x="480"
                    y="786"
                    fontSize="12"
                    fontWeight="700"
                    fill={C.warning}
                  >
                    故障：看到 2→3 就断定 symmetric
                  </text>
                  <text x="480" y="806" fontSize="11" fill={C.secondary}>
                    matrix[3][2]=0：symmetric 要求每个 pair
                    双向都在；少一个反例即不成立。
                  </text>
                </>
              ) : (
                <>
                  <text
                    x="480"
                    y="768"
                    fontSize="12"
                    fontWeight="700"
                    fill={C.success}
                  >
                    reflexive ✓（对角线全 1）· symmetric ✗ · transitive ✗
                  </text>
                  <text x="480" y="788" fontSize="11" fill={C.secondary}>
                    (1,2),(2,3) 在 R 中但 (1,3) 不在：传递性要求所有链条封闭。
                  </text>
                  <text x="480" y="806" fontSize="11" fill={C.secondary}>
                    性质检查必须量化全部相关 pairs，不能只看三个例子。
                  </text>
                </>
              )}
            </>
          )}

          {mode === "function" && (
            <>
              <text
                x="140"
                y="588"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={C.secondary}
              >
                domain A
              </text>
              <text
                x="470"
                y="588"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={C.secondary}
              >
                codomain B
              </text>
              {(["a", "b", "c"] as const).map((label, i) => (
                <g key={"dom-" + label}>
                  <circle
                    cx="140"
                    cy={624 + i * 52}
                    r="20"
                    fill={C.accent}
                    fillOpacity="0.14"
                    stroke={C.accent}
                    strokeWidth="2"
                  />
                  <text
                    x="140"
                    y={630 + i * 52}
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="700"
                    fill={C.accent}
                  >
                    {label}
                  </text>
                </g>
              ))}
              {([1, 2, 3, 4, 5] as const).map((label, i) => {
                const hit = label <= 3;
                return (
                  <g key={"cod-" + label}>
                    <circle
                      cx="470"
                      cy={612 + i * 36}
                      r="17"
                      fill={hit ? C.success : C.elevated}
                      fillOpacity={hit ? 0.14 : 1}
                      stroke={hit ? C.success : C.border}
                      strokeWidth="1.5"
                    />
                    <text
                      x="470"
                      y={617 + i * 36}
                      textAnchor="middle"
                      fontSize="12"
                      fill={hit ? C.success : C.secondary}
                    >
                      {label}
                    </text>
                  </g>
                );
              })}
              <path
                d="M 160 618 C 300 596, 340 596, 452 608"
                stroke={C.success}
                strokeWidth="2"
                fill="none"
                markerEnd="url(#clrs4-appendixB-success-arrow)"
              />
              <path
                d="M 160 670 C 300 650, 340 644, 452 646"
                stroke={C.success}
                strokeWidth="2"
                fill="none"
                markerEnd="url(#clrs4-appendixB-success-arrow)"
              />
              <path
                d="M 160 722 C 300 706, 340 682, 452 682"
                stroke={C.success}
                strokeWidth="2"
                fill="none"
                markerEnd="url(#clrs4-appendixB-success-arrow)"
              />
              {fault && (
                <path
                  d="M 160 630 C 300 640, 360 740, 452 750"
                  stroke={C.warning}
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  fill="none"
                  markerEnd="url(#clrs4-appendixB-warning-arrow)"
                />
              )}

              <text
                x="560"
                y="612"
                fontSize="12"
                fontWeight="700"
                fill={C.primary}
              >
                f(a)=1, f(b)=2, f(c)=3
              </text>
              {fault ? (
                <>
                  <text
                    x="560"
                    y="642"
                    fontSize="12"
                    fontWeight="700"
                    fill={C.warning}
                  >
                    故障：a 同时映射到 1 和 4
                  </text>
                  <text x="560" y="666" fontSize="11" fill={C.secondary}>
                    function 要求每个输入恰好一个输出；两个箭头就不再是
                    function，
                  </text>
                  <text x="560" y="684" fontSize="11" fill={C.secondary}>
                    &quot;多值映射&quot; 是 relation，不是 function。
                  </text>
                </>
              ) : (
                <>
                  <text
                    x="560"
                    y="642"
                    fontSize="12"
                    fontWeight="700"
                    fill={C.success}
                  >
                    injective ✓ · surjective ✗
                  </text>
                  <text x="560" y="666" fontSize="11" fill={C.secondary}>
                    range = {"{1,2,3}"} ⊆ B = {"{1..5}"}：range 可以只是
                    codomain 的子集。
                  </text>
                  <text x="560" y="684" fontSize="11" fill={C.secondary}>
                    4、5 没被任何输入命中，所以不是 surjective。
                  </text>
                </>
              )}
              <text x="560" y="712" fontSize="11" fill={C.secondary}>
                codomain 是声明的目标，range 是实际输出集合；
              </text>
              <text x="560" y="730" fontSize="11" fill={C.secondary}>
                hash table 的 index 函数漏掉这个区别会算错 collision 上界。
              </text>
            </>
          )}

          {mode === "graph" && (
            <>
              {GRAPH_EDGES.map(([u, v], i) => {
                const [x1, y1] = GRAPH_POINTS[u];
                const [x2, y2] = GRAPH_POINTS[v];
                return (
                  <line
                    key={"edge-" + i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={C.accent}
                    strokeOpacity={i === GRAPH_EDGES.length - 1 ? 0.85 : 0.55}
                    strokeWidth={i === GRAPH_EDGES.length - 1 ? 3 : 2}
                  />
                );
              })}
              {GRAPH_POINTS.map(([x, y], i) => (
                <g key={"g-node-" + i}>
                  <circle
                    cx={x}
                    cy={y}
                    r="22"
                    fill={C.elevated}
                    stroke={C.border}
                    strokeWidth="1.5"
                  />
                  <text
                    x={x}
                    y={y + 4}
                    textAnchor="middle"
                    fontSize="13"
                    fill={C.primary}
                  >
                    {i + 1}
                  </text>
                  <text
                    x={x}
                    y={y - 30}
                    textAnchor="middle"
                    fontSize="11"
                    fill={GRAPH_DEGREES[i] % 2 === 1 ? C.warning : C.secondary}
                  >
                    deg={GRAPH_DEGREES[i]}
                  </text>
                </g>
              ))}

              <text
                x="560"
                y="612"
                fontSize="12"
                fontWeight="700"
                fill={C.primary}
              >
                deg(v) 统计与 v 关联的 edges
              </text>
              {fault ? (
                <>
                  <text
                    x="560"
                    y="642"
                    fontSize="12"
                    fontWeight="700"
                    fill={C.warning}
                  >
                    故障：|E| = Σdeg(v) = 12
                  </text>
                  <text x="560" y="666" fontSize="11" fill={C.secondary}>
                    每条 edge 有两个端点，被度数和数了两次；忘记除 2 会让
                  </text>
                  <text x="560" y="684" fontSize="11" fill={C.secondary}>
                    邻接表空间上界和 BFS 复杂度全部翻倍。
                  </text>
                </>
              ) : (
                <>
                  <text
                    x="560"
                    y="642"
                    fontSize="12"
                    fontWeight="700"
                    fill={C.success}
                  >
                    3+3+3+2+1 = 12 = 2|E|，|E| = 6
                  </text>
                  <text x="560" y="666" fontSize="11" fill={C.secondary}>
                    握手定理：Σdeg(v) = 2|E|，每条 edge 贡献两个端点。
                  </text>
                  <text x="560" y="684" fontSize="11" fill={C.secondary}>
                    奇度顶点有 4 个（1、2、3、5），数目必为偶数。
                  </text>
                </>
              )}
              <text x="560" y="712" fontSize="11" fill={C.secondary}>
                adjacency matrix：Θ(V²) 空间，O(1) 查边；
              </text>
              <text x="560" y="730" fontSize="11" fill={C.secondary}>
                adjacency list：Θ(V+E) 空间，遍历邻居高效。
              </text>
            </>
          )}

          {mode === "tree" && (
            <>
              {TREE_EDGES.map(([u, v], i) => {
                const [x1, y1] = GRAPH_POINTS[u];
                const [x2, y2] = GRAPH_POINTS[v];
                return (
                  <line
                    key={"tree-edge-" + i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={C.success}
                    strokeWidth="2.5"
                  />
                );
              })}
              {fault && (
                <line
                  x1={GRAPH_POINTS[0][0]}
                  y1={GRAPH_POINTS[0][1]}
                  x2={GRAPH_POINTS[2][0]}
                  y2={GRAPH_POINTS[2][1]}
                  stroke={C.warning}
                  strokeWidth="3"
                  strokeDasharray="6 4"
                />
              )}
              {GRAPH_POINTS.map(([x, y], i) => (
                <g key={"t-node-" + i}>
                  <circle
                    cx={x}
                    cy={y}
                    r="22"
                    fill={i === 0 ? C.accent : C.elevated}
                    fillOpacity={i === 0 ? 0.14 : 1}
                    stroke={i === 0 ? C.accent : C.border}
                    strokeWidth="1.5"
                  />
                  <text
                    x={x}
                    y={y + 4}
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight={i === 0 ? 700 : 400}
                    fill={i === 0 ? C.accent : C.primary}
                  >
                    {i + 1}
                  </text>
                </g>
              ))}

              <text
                x="560"
                y="612"
                fontSize="12"
                fontWeight="700"
                fill={C.primary}
              >
                以 1 为 root：parent/child 随 rooting 定义
              </text>
              {fault ? (
                <>
                  <text
                    x="560"
                    y="642"
                    fontSize="12"
                    fontWeight="700"
                    fill={C.warning}
                  >
                    故障：声称这棵树有 |E| = |V| = 5
                  </text>
                  <text x="560" y="666" fontSize="11" fill={C.secondary}>
                    第 6 条边（虚线）与路径 1—2—3 形成唯一 cycle；
                  </text>
                  <text x="560" y="684" fontSize="11" fill={C.secondary}>
                    connected graph 多一条边就不再是 tree。
                  </text>
                </>
              ) : (
                <>
                  <text
                    x="560"
                    y="642"
                    fontSize="12"
                    fontWeight="700"
                    fill={C.success}
                  >
                    |V| = 5，|E| = 4 = |V| − 1
                  </text>
                  <text x="560" y="666" fontSize="11" fill={C.secondary}>
                    finite graph：connected、acyclic、|E|=|V|−1 三者知二推一。
                  </text>
                  <text x="560" y="684" fontSize="11" fill={C.secondary}>
                    删 cycle 上任一边仍
                    connected；加一条连接已有顶点的边产生唯一 cycle。
                  </text>
                </>
              )}
              <text x="560" y="712" fontSize="11" fill={C.secondary}>
                root depth 为 0；node depth = root 到它的 edge 数；
              </text>
              <text x="560" y="730" fontSize="11" fill={C.secondary}>
                subtree induction 的 base case 是 leaf，不是 root。
              </text>
            </>
          )}

          <defs>
            <marker
              id="clrs4-appendixB-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.accent} />
            </marker>
            <marker
              id="clrs4-appendixB-success-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker
              id="clrs4-appendixB-warning-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="同一批元素，每加一条约束就换一种合法结构；算法证明写的正是这些约束的名字。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置集合论实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        集合、关系、函数、图、树不是五个孤立定义，而是从同一批元素逐层加约束得到的结构谱系。
      </figcaption>
    </figure>
  );
}
