"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <MultiAgentTopologyDiagram>：supervisor / swarm / pipeline 三种多智能体协作拓扑的
 * 「可控教学动画」（HEL-308，《多智能体协作模式》篇4·1，知识点 2）。
 *
 * 全书隐喻：AI Agent = 私人助理「小特」。一个小特忙不过来，就组一支特工小队——怎么编队
 * 是门讲究。三种拓扑结构不同、控制方式不同、适用场景不同：
 *   ① supervisor（主管制）：一个主管节点在上，下面连几个专精 worker；主管 → 分派 → worker，
 *      worker → 汇报 → 主管。中心化指挥。
 *   ② swarm（对等群）：几个对等节点环形排布，互相双向传话、谁该接手谁接手。去中心化。
 *   ③ pipeline（流水线）：节点串成一条线，上一个的输出是下一个的输入（研究 → 写作 → 审查）。
 *
 * 三种拓扑各画一张独立布局，顶上有选择器切换看哪一种；切换后 anime.js 逐节点 / 逐箭头
 * 揭示该拓扑的结构，label 落在每步「点亮完成」处（杜绝 off-by-one）。
 *
 * 首帧铁律（HEL-292）：所有节点 / 箭头初始 opacity≈0.2 淡显（非全空），anime
 * opacity:[0.2,1] 揭示；reduced-motion 停 t=0 也是淡显态、非空盒。
 *
 * 几何铁律（HEL-296/299）：顶 caption y≥20；所有 <text> bbox 距 viewBox 任意边 ≥16px；
 * 单一坐标公式；不套整圈容器大框；利用率 ≥55%。
 *
 * 为何 client：anime.js 时钟 + 受控控制条 + 拓扑切换都是真交互。anime.js 经
 * useTeachingTimeline 内部动态 import 切独立 chunk（硬规则 2/6），再经 mdx-components
 * 静态注册为客户端叶子，绝不进首屏 / 公共 layout。
 */

// —— 画布几何（三拓扑共用一块 viewBox）。 ——
const VIEW_W = 720;
const VIEW_H = 380;
const TOP_CAPTION_Y = 30; // 顶 caption 基线 ≥20，bbox 距顶 ≥16px

type TopoKey = "supervisor" | "swarm" | "pipeline";

type Topo = {
  key: TopoKey;
  label: string;
  en: string;
  color: string;
  /** 顶部一句话点题（结构 + 控制方式）。 */
  caption: string;
  /** 时间线步骤（顺序即揭示顺序）；group id 用于绑定 DOM ref。 */
  steps: readonly (TeachingStep & { groups: readonly string[] })[];
};

// —— 三拓扑各自的内容与揭示步骤定义。 ——
const TOPOS: readonly Topo[] = [
  {
    key: "supervisor",
    label: "主管制 supervisor",
    en: "supervisor",
    color: "var(--accent)",
    caption: "一个主管拆活、分派给专精 worker，再汇总结果——中心化指挥",
    steps: [
      {
        label: "boss",
        caption: "① 一个主管 Agent 坐镇上方，负责把一桩大活拆开",
        groups: ["sv-boss"],
      },
      {
        label: "workers",
        caption: "② 下面挂着几个专精 worker：研究员、写手、审查，各管一摊",
        groups: ["sv-w0", "sv-w1", "sv-w2"],
      },
      {
        label: "dispatch",
        caption: "③ 主管 → 分派子任务给各 worker（向下的箭头）",
        groups: ["sv-dispatch"],
      },
      {
        label: "report",
        caption:
          "④ worker 干完 → 汇报结果回主管（向上的箭头），主管汇总——这就是「中心化指挥」",
        groups: ["sv-report"],
      },
    ],
  },
  {
    key: "swarm",
    label: "对等群 swarm",
    en: "swarm",
    color: "var(--warning)",
    caption: "几个 Agent 对等、互相传话接力，谁该接手谁接手——去中心化",
    steps: [
      {
        label: "peers",
        caption: "① 几个 Agent 对等排布，没有谁是头儿——平起平坐",
        groups: ["sw-p0", "sw-p1", "sw-p2"],
      },
      {
        label: "handoff",
        caption: "② 它们互相传话、接力（环形的双向箭头）——谁该接手谁接手",
        groups: ["sw-edges"],
      },
      {
        label: "decentral",
        caption:
          "③ 没有中心主管，下一步交给谁由 Agent 之间自己商量——这就是「去中心化」",
        groups: ["sw-mid"],
      },
    ],
  },
  {
    key: "pipeline",
    label: "流水线 pipeline",
    en: "pipeline",
    color: "var(--success)",
    caption: "Agent 串成一条线，上一个的输出是下一个的输入——依次过工序",
    steps: [
      {
        label: "stages",
        caption: "① 几个 Agent 串成一条线：研究 → 写作 → 审查，各是一道工序",
        groups: ["pl-s0", "pl-s1", "pl-s2"],
      },
      {
        label: "flow",
        caption: "② 上一道工序的输出，就是下一道的输入（单向往右的箭头）",
        groups: ["pl-e0", "pl-e1"],
      },
      {
        label: "out",
        caption: "③ 一路过完所有工序，出最终稿——像流水线，每个工位只做自己那段",
        groups: ["pl-s3", "pl-e2"],
      },
    ],
  },
];

// ============================================================
//  各拓扑的静态 SVG 几何（节点 + 箭头，按 group id 分组挂 ref）
// ============================================================

// supervisor：主管在上居中，3 个 worker 在下横排。单一 x 公式：workerCx(i)。
const SV_BOSS = { cx: VIEW_W / 2, cy: 92, w: 168, h: 50 };
const SV_W_Y = 252;
const SV_W_W = 152;
const SV_W_H = 56;
const SV_MARGIN_X = 56;
const SV_INNER_W = VIEW_W - 2 * SV_MARGIN_X;
const svWorkerCx = (i: number) => SV_MARGIN_X + ((i + 0.5) * SV_INNER_W) / 3;
const SV_WORKERS = [
  { label: "研究员", sub: "只管查资料" },
  { label: "写手", sub: "只管写稿" },
  { label: "审查", sub: "只管挑错" },
];

// swarm：3 个对等节点环形（三角形）排布，质心居中。
const SW_CX = VIEW_W / 2;
const SW_CY = 196;
const SW_R = 112; // 环半径（足够大，HEL svg 规则）
const SW_W = 132;
const SW_H = 52;
// 单一角度公式：第 i 个节点角度（顶点向上的等边三角形）。
const swAngle = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / 3;
const swPeerCx = (i: number) => SW_CX + SW_R * Math.cos(swAngle(i));
const swPeerCy = (i: number) => SW_CY + SW_R * Math.sin(swAngle(i));
const SW_PEERS = [
  { label: "Agent A", sub: "研究" },
  { label: "Agent B", sub: "写作" },
  { label: "Agent C", sub: "审查" },
];

// pipeline：4 个节点（研究 → 写作 → 审查 → 出稿）横排成一条线。单一 x 公式。
const PL_CY = 196;
const PL_W = 124;
const PL_H = 56;
const PL_MARGIN_X = 32;
const PL_INNER_W = VIEW_W - 2 * PL_MARGIN_X;
const plCx = (i: number) => PL_MARGIN_X + ((i + 0.5) * PL_INNER_W) / 4;
const PL_STAGES = [
  { label: "研究员", sub: "查资料" },
  { label: "写手", sub: "成稿" },
  { label: "审查", sub: "挑错" },
  { label: "出最终稿", sub: "" },
];

type NodeBoxProps = {
  cx: number;
  cy: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  color: string;
  /** 主管 / 强调节点用实底高亮。 */
  filled?: boolean;
};

function NodeBox({ cx, cy, w, h, label, sub, color, filled }: NodeBoxProps) {
  const x = cx - w / 2;
  const y = cy - h / 2;
  return (
    <>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="10"
        fill={filled ? "var(--accent-glow)" : "var(--bg)"}
        stroke={color}
        strokeWidth="1.8"
      />
      <text
        x={cx}
        y={sub ? cy - 2 : cy + 4}
        textAnchor="middle"
        fontSize="12.5"
        fontWeight="700"
        fill="var(--text-primary)"
      >
        {label}
      </text>
      {sub && (
        <text
          x={cx}
          y={cy + 15}
          textAnchor="middle"
          fontSize="10"
          fill="var(--text-secondary)"
        >
          {sub}
        </text>
      )}
    </>
  );
}

function MultiAgentTopologyDiagramInner() {
  const [active, setActive] = useState<TopoKey>("supervisor");
  const topo = TOPOS.find((t) => t.key === active)!;

  // 各 group 的 DOM ref。SVG 子树挂 key={active}，切拓扑时整树 remount → 旧 group
  // 卸载（ref 回调以 null 回收对应键），新拓扑的 group 重新挂 ref，无需手动清表。
  const groupRefs = useRef<Record<string, SVGGElement | null>>({});

  const steps = topo.steps;

  const timeline = useTeachingTimeline({
    steps,
    build: (tl) => {
      steps.forEach((step, i) => {
        const start = TEACHING_BEAT_MS * i;
        const lit = TEACHING_BEAT_MS * (i + 1);
        step.groups.forEach((gid) => {
          const g = groupRefs.current[gid];
          if (g) {
            tl.add(
              g,
              {
                opacity: [0.2, 1],
                duration: TEACHING_BEAT_MS,
                ease: "out(3)",
              },
              start,
            );
          }
        });
        tl.label(step.label, lit);
      });
    },
  });

  const labelText = Object.fromEntries(
    steps.map((s) => [s.label, s.caption ?? s.label]),
  );

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-6">
        {/* ⚡ 可交互标签 + 拓扑选择器 */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="mr-1 inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">⚡</span>
            可交互
          </span>
          {TOPOS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setActive(t.key)}
              aria-pressed={active === t.key}
              className={`rounded-control border px-3 py-1 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                active === t.key
                  ? "border-accent text-accent"
                  : "border-border text-secondary hover:text-primary"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <svg
          key={active}
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={`多智能体协作拓扑：${topo.label}。${topo.caption}。播放时逐节点、逐箭头揭示该拓扑的结构，可播放、暂停、单步、拖动进度对比观察；顶部可切换 supervisor、swarm、pipeline 三种拓扑。`}
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id="mat-arrow-accent"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
            <marker
              id="mat-arrow-secondary"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
            <marker
              id="mat-arrow-warning"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--warning)" />
            </marker>
            <marker
              id="mat-arrow-success"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--success)" />
            </marker>
          </defs>

          {/* 顶 caption（y≥20，bbox 距顶 ≥16px） */}
          <text
            x={VIEW_W / 2}
            y={TOP_CAPTION_Y}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={topo.color}
          >
            {topo.en}：{topo.caption}
          </text>

          {/* ============ supervisor 拓扑 ============ */}
          {active === "supervisor" && (
            <>
              {/* 主管节点 */}
              <g
                ref={(el) => {
                  groupRefs.current["sv-boss"] = el;
                }}
                opacity="0.2"
              >
                <NodeBox
                  cx={SV_BOSS.cx}
                  cy={SV_BOSS.cy}
                  w={SV_BOSS.w}
                  h={SV_BOSS.h}
                  label="主管 supervisor"
                  sub="拆活 · 分派 · 汇总"
                  color="var(--accent)"
                  filled
                />
              </g>
              {/* 3 个 worker */}
              {SV_WORKERS.map((w, i) => (
                <g
                  key={`sv-w${i}`}
                  ref={(el) => {
                    groupRefs.current[`sv-w${i}`] = el;
                  }}
                  opacity="0.2"
                >
                  <NodeBox
                    cx={svWorkerCx(i)}
                    cy={SV_W_Y}
                    w={SV_W_W}
                    h={SV_W_H}
                    label={w.label}
                    sub={w.sub}
                    color="var(--accent)"
                  />
                </g>
              ))}
              {/* 分派箭头：主管 → 各 worker（左偏一点，与汇报箭头错开） */}
              <g
                ref={(el) => {
                  groupRefs.current["sv-dispatch"] = el;
                }}
                opacity="0.2"
              >
                {SV_WORKERS.map((_, i) => (
                  <line
                    key={`sv-d${i}`}
                    x1={SV_BOSS.cx - 14}
                    y1={SV_BOSS.cy + SV_BOSS.h / 2}
                    x2={svWorkerCx(i) - 14}
                    y2={SV_W_Y - SV_W_H / 2 - 2}
                    stroke="var(--accent)"
                    strokeWidth="1.8"
                    markerEnd="url(#mat-arrow-accent)"
                  />
                ))}
                <text
                  x={SV_MARGIN_X + 6}
                  y={172}
                  textAnchor="start"
                  fontSize="10.5"
                  fontWeight="700"
                  fill="var(--accent)"
                >
                  ↓ 分派子任务
                </text>
              </g>
              {/* 汇报箭头：各 worker → 主管（右偏一点） */}
              <g
                ref={(el) => {
                  groupRefs.current["sv-report"] = el;
                }}
                opacity="0.2"
              >
                {SV_WORKERS.map((_, i) => (
                  <line
                    key={`sv-r${i}`}
                    x1={svWorkerCx(i) + 14}
                    y1={SV_W_Y - SV_W_H / 2 - 2}
                    x2={SV_BOSS.cx + 14}
                    y2={SV_BOSS.cy + SV_BOSS.h / 2}
                    stroke="var(--text-secondary)"
                    strokeWidth="1.4"
                    strokeDasharray="5 3"
                    markerEnd="url(#mat-arrow-secondary)"
                  />
                ))}
                <text
                  x={VIEW_W - SV_MARGIN_X - 6}
                  y={172}
                  textAnchor="end"
                  fontSize="10.5"
                  fontWeight="700"
                  fill="var(--text-secondary)"
                >
                  ↑ 汇报结果
                </text>
              </g>
            </>
          )}

          {/* ============ swarm 拓扑 ============ */}
          {active === "swarm" && (
            <>
              {/* 环形双向边（三条，连成一圈） */}
              <g
                ref={(el) => {
                  groupRefs.current["sw-edges"] = el;
                }}
                opacity="0.2"
              >
                {[
                  [0, 1],
                  [1, 2],
                  [2, 0],
                ].map(([a, b]) => (
                  <line
                    key={`sw-e${a}${b}`}
                    x1={swPeerCx(a)}
                    y1={swPeerCy(a)}
                    x2={swPeerCx(b)}
                    y2={swPeerCy(b)}
                    stroke="var(--warning)"
                    strokeWidth="1.8"
                    markerStart="url(#mat-arrow-warning)"
                    markerEnd="url(#mat-arrow-warning)"
                  />
                ))}
              </g>
              {/* 中心去中心化注记 */}
              <g
                ref={(el) => {
                  groupRefs.current["sw-mid"] = el;
                }}
                opacity="0.2"
              >
                <text
                  x={SW_CX}
                  y={SW_CY - 4}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill="var(--warning)"
                >
                  无中心主管
                </text>
                <text
                  x={SW_CX}
                  y={SW_CY + 13}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  谁接手谁商量
                </text>
              </g>
              {/* 3 个对等节点（盖在边之上） */}
              {SW_PEERS.map((p, i) => (
                <g
                  key={`sw-p${i}`}
                  ref={(el) => {
                    groupRefs.current[`sw-p${i}`] = el;
                  }}
                  opacity="0.2"
                >
                  <NodeBox
                    cx={swPeerCx(i)}
                    cy={swPeerCy(i)}
                    w={SW_W}
                    h={SW_H}
                    label={p.label}
                    sub={p.sub}
                    color="var(--warning)"
                  />
                </g>
              ))}
            </>
          )}

          {/* ============ pipeline 拓扑 ============ */}
          {active === "pipeline" && (
            <>
              {/* 前 3 道工序节点 */}
              {PL_STAGES.slice(0, 3).map((s, i) => (
                <g
                  key={`pl-s${i}`}
                  ref={(el) => {
                    groupRefs.current[`pl-s${i}`] = el;
                  }}
                  opacity="0.2"
                >
                  <NodeBox
                    cx={plCx(i)}
                    cy={PL_CY}
                    w={PL_W}
                    h={PL_H}
                    label={s.label}
                    sub={s.sub}
                    color="var(--success)"
                  />
                </g>
              ))}
              {/* 出最终稿节点 */}
              <g
                ref={(el) => {
                  groupRefs.current["pl-s3"] = el;
                }}
                opacity="0.2"
              >
                <NodeBox
                  cx={plCx(3)}
                  cy={PL_CY}
                  w={PL_W}
                  h={PL_H}
                  label={PL_STAGES[3].label}
                  color="var(--success)"
                  filled
                />
              </g>
              {/* 前两段单向箭头（属于「flow」步） */}
              <g
                ref={(el) => {
                  groupRefs.current["pl-e0"] = el;
                }}
                opacity="0.2"
              >
                <line
                  x1={plCx(0) + PL_W / 2 + 2}
                  y1={PL_CY}
                  x2={plCx(1) - PL_W / 2 - 2}
                  y2={PL_CY}
                  stroke="var(--success)"
                  strokeWidth="2"
                  markerEnd="url(#mat-arrow-success)"
                />
              </g>
              <g
                ref={(el) => {
                  groupRefs.current["pl-e1"] = el;
                }}
                opacity="0.2"
              >
                <line
                  x1={plCx(1) + PL_W / 2 + 2}
                  y1={PL_CY}
                  x2={plCx(2) - PL_W / 2 - 2}
                  y2={PL_CY}
                  stroke="var(--success)"
                  strokeWidth="2"
                  markerEnd="url(#mat-arrow-success)"
                />
              </g>
              {/* 第三段箭头（属于「out」步） */}
              <g
                ref={(el) => {
                  groupRefs.current["pl-e2"] = el;
                }}
                opacity="0.2"
              >
                <line
                  x1={plCx(2) + PL_W / 2 + 2}
                  y1={PL_CY}
                  x2={plCx(3) - PL_W / 2 - 2}
                  y2={PL_CY}
                  stroke="var(--success)"
                  strokeWidth="2"
                  markerEnd="url(#mat-arrow-success)"
                />
              </g>
              {/* 流向注记 */}
              <text
                x={VIEW_W / 2}
                y={PL_CY + PL_H / 2 + 40}
                textAnchor="middle"
                fontSize="10.5"
                fontWeight="700"
                fill="var(--success)"
              >
                上一道的输出 = 下一道的输入（单向）
              </text>
            </>
          )}
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={labelText}
          caption={`点播放逐步揭示「${topo.label}」的结构；顶部切换看另两种拓扑。`}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        三种协作拓扑：supervisor（一个主管分派 +
        汇总，中心化）、swarm（对等互传，去中心化）、pipeline（串成一条线依次过）——结构、控制方式、适用场景各不相同。
      </figcaption>
    </figure>
  );
}

/** 动态边界：anime.js 叶子经 next/dynamic(ssr:false) 懒加载，绝不进首屏 / 公共 layout（硬规则 2/6）。 */
const MultiAgentTopologyDynamic = dynamic(
  () => Promise.resolve(MultiAgentTopologyDiagramInner),
  {
    ssr: false,
    loading: () => (
      <div className="mdx-figure not-prose mx-auto my-6 rounded-card border border-border bg-elevated p-6">
        <div className="flex min-h-72 items-center justify-center text-center">
          <p className="text-sm text-secondary">三种协作拓扑动画加载中…</p>
        </div>
      </div>
    ),
  },
);

export function MultiAgentTopologyDiagram() {
  return <MultiAgentTopologyDynamic />;
}
