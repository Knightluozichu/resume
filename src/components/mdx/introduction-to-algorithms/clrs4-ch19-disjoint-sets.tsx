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

type NodeId = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h";

const IDS: readonly NodeId[] = ["a", "b", "c", "d", "e", "f", "g", "h"];

type NodeState = {
  parent: NodeId;
  rank: number;
};

type ForestStep = {
  nodes: Record<NodeId, NodeState>;
  /** FIND 路径（访问顺序，从查询节点到根），用于高亮。 */
  path?: readonly NodeId[];
  /** 压缩后新指向根的节点：这些到根的边用成功色高亮。 */
  compressed?: readonly NodeId[];
  /** 头部状态行。 */
  stat: string;
};

const N = (parent: NodeId, rank = 0): NodeState => ({ parent, rank });

const SINGLETONS: Record<NodeId, NodeState> = {
  a: N("a"),
  b: N("b"),
  c: N("c"),
  d: N("d"),
  e: N("e"),
  f: N("f"),
  g: N("g"),
  h: N("h"),
};

/** 按秩合并 + 路径压缩：7 个关键帧的森林状态（n = 8）。 */
const RANK_STEPS: readonly ForestStep[] = [
  {
    nodes: SINGLETONS,
    stat: "8 个集合 · 8 个根 · 每次 MAKE-SET 秩为 0",
  },
  {
    nodes: {
      a: N("a", 1),
      b: N("a"),
      c: N("c", 1),
      d: N("c"),
      e: N("e", 1),
      f: N("e"),
      g: N("g", 1),
      h: N("g"),
    },
    stat: "4 棵树 · 秩相等时第二个根挂到第一个根下，胜者秩 +1",
  },
  {
    nodes: {
      a: N("a", 2),
      b: N("a"),
      c: N("a", 1),
      d: N("c"),
      e: N("e", 2),
      f: N("e"),
      g: N("e", 1),
      h: N("g"),
    },
    stat: "2 棵树 · 低秩根挂到高秩根下，最大高度仍是 2",
  },
  {
    nodes: {
      a: N("a", 3),
      b: N("a"),
      c: N("a", 1),
      d: N("c"),
      e: N("a", 2),
      f: N("e"),
      g: N("e", 1),
      h: N("g"),
    },
    stat: "1 棵树 · 根秩 3 = ⌊lg 8⌋，高度被秩压住",
  },
  {
    nodes: {
      a: N("a", 3),
      b: N("a"),
      c: N("a", 1),
      d: N("c"),
      e: N("a", 2),
      f: N("e"),
      g: N("e", 1),
      h: N("g"),
    },
    path: ["h", "g", "a"],
    stat: "FIND(h)：沿父指针 h→g→a，共 3 跳",
  },
  {
    nodes: {
      a: N("a", 3),
      b: N("a"),
      c: N("a", 1),
      d: N("c"),
      e: N("a", 2),
      f: N("e"),
      g: N("a"),
      h: N("a"),
    },
    compressed: ["g", "h"],
    stat: "路径压缩：g、h 直挂根 a，秩保持不变量标签",
  },
  {
    nodes: {
      a: N("a", 3),
      b: N("a"),
      c: N("a", 1),
      d: N("c"),
      e: N("a", 2),
      f: N("e"),
      g: N("a"),
      h: N("a"),
    },
    stat: "序列界：m 次操作总计 O(m·α(n))，α 增长极慢",
  },
];

/** 故障注入（朴素合并、无秩无压缩）：同样的 7 帧，树退化成链。 */
const FAULT_STEPS: readonly ForestStep[] = [
  {
    nodes: SINGLETONS,
    stat: "8 个集合 · 故障注入已开启：合并无视秩",
  },
  {
    nodes: {
      a: N("a"),
      b: N("a"),
      c: N("c"),
      d: N("c"),
      e: N("e"),
      f: N("e"),
      g: N("g"),
      h: N("g"),
    },
    stat: "4 棵树 · 形状与正确模式相同，暂时看不出差别",
  },
  {
    nodes: {
      a: N("c"),
      b: N("a"),
      c: N("c"),
      d: N("c"),
      e: N("e"),
      f: N("e"),
      g: N("g"),
      h: N("g"),
    },
    stat: "u(b,c) 把根 a 直接挂到根 c 下 · 深度开始失控",
  },
  {
    nodes: {
      a: N("c"),
      b: N("a"),
      c: N("e"),
      d: N("c"),
      e: N("e"),
      f: N("e"),
      g: N("g"),
      h: N("g"),
    },
    stat: "u(d,e) 又把根 c 挂到根 e 下 · 5 个节点深度 3",
  },
  {
    nodes: {
      a: N("c"),
      b: N("a"),
      c: N("e"),
      d: N("c"),
      e: N("f"),
      f: N("g"),
      g: N("h"),
      h: N("h"),
    },
    stat: "7 次合并连成深度 7 的链 · 根是 h",
  },
  {
    nodes: {
      a: N("c"),
      b: N("a"),
      c: N("e"),
      d: N("c"),
      e: N("f"),
      f: N("g"),
      g: N("h"),
      h: N("h"),
    },
    path: ["b", "a", "c", "e", "f", "g", "h"],
    stat: "FIND(b)：b→a→c→e→f→g→h，共 7 跳",
  },
  {
    nodes: {
      a: N("c"),
      b: N("a"),
      c: N("e"),
      d: N("c"),
      e: N("f"),
      f: N("g"),
      g: N("h"),
      h: N("h"),
    },
    path: ["b", "a", "c", "e", "f", "g", "h"],
    stat: "再次 FIND(b)：依旧 7 跳 · 没有压缩，重复查询同样昂贵",
  },
];

const STEPS: readonly TeachingStep[] = [
  { label: "make", caption: "MAKE-SET × 8：每个元素自成一个集合，自己就是根" },
  { label: "pair", caption: "四次两两合并：两棵小树的根互相认亲" },
  { label: "group", caption: "小组并成大组：根的选择决定树高走向" },
  { label: "unite", caption: "全部合成一棵树：正确模式高 3 层，故障模式是链" },
  { label: "find", caption: "FIND-SET：沿父指针上行到根，统计跳数" },
  { label: "compress", caption: "压缩（或缺失）：一次 FIND 是否让下次更便宜" },
  { label: "bound", caption: "序列总代价：摊还界对比" },
];

const RANK_CAPTIONS: Readonly<Record<string, string>> = {
  make: "MAKE-SET × 8：每个元素自成一个集合，自己就是根",
  pair: "秩相等时第二个根挂到第一个根下，胜者秩 +1",
  group: "低秩根挂到高秩根下，两棵四人树高度都只有 2",
  unite: "8 个元素合成一棵树，根秩 3 = ⌊lg 8⌋，高度 3",
  find: "FIND(h) 沿 h→g→a 上行，共 3 跳到达根",
  compress: "g、h 直接指向根 a；秩保持不动，仍作高度上界",
  bound: "m 次操作总计 O(m·α(n))：几乎线性，但 α 不是数学常数",
};

const FAULT_CAPTIONS: Readonly<Record<string, string>> = {
  make: "同样的 8 个 singleton——故障注入打开：合并无视秩",
  pair: "两两合并的形状与正确模式相同，差别尚未显现",
  group: "u(b,c) 把根 a 挂到根 c 下：没有秩的阻挡，树开始变深",
  unite: "继续按固定顺序合并：8 个节点连成一条深度 7 的链",
  find: "FIND(b) 要走 b→a→c→e→f→g→h，共 7 跳",
  compress: "朴素实现没有压缩：第二次 FIND(b) 仍然是 7 跳",
  bound: "单次 FIND 最坏 Θ(n)：m 次操作总计可退化到 Θ(m·n)",
};

const FAULT_INFO = {
  title: "朴素合并成链",
  desc: "现象：无视秩、按固定顺序挂根，7 次合并后 FIND 最深节点要走 n−1 步。原因：树高失去上界，且不做路径压缩。修法：只挂根、低秩挂高秩、秩相等才递增，并在 FIND 时压缩路径。",
} as const;

/** 森林分层布局：叶子等距排开，父节点取子节点中点，深度决定 y。纯函数、确定性。 */
function layoutForest(nodes: Record<NodeId, NodeState>) {
  const children = new Map<NodeId, NodeId[]>();
  const roots: NodeId[] = [];
  for (const id of IDS) {
    const parent = nodes[id].parent;
    if (parent === id) {
      roots.push(id);
    } else {
      const list = children.get(parent) ?? [];
      list.push(id);
      children.set(parent, list);
    }
  }
  const pos = new Map<NodeId, { x: number; y: number }>();
  const X0 = 75;
  const DX = 105;
  const Y0 = 118;
  const DY = 72;
  let leafX = X0;
  const place = (id: NodeId, depth: number): number => {
    const kids = children.get(id) ?? [];
    let x: number;
    if (kids.length === 0) {
      x = leafX;
      leafX += DX;
    } else {
      const xs = kids.map((kid) => place(kid, depth + 1));
      x = (xs[0] + xs[xs.length - 1]) / 2;
    }
    pos.set(id, { x, y: Y0 + depth * DY });
    return x;
  };
  for (const root of roots) place(root, 0);
  return pos;
}

const R = 21;

function ForestView({
  step,
  fault,
  marker,
}: {
  step: ForestStep;
  fault: boolean;
  marker: string;
}) {
  const pos = layoutForest(step.nodes);
  const pathEdges = new Set<string>();
  if (step.path) {
    for (let i = 0; i + 1 < step.path.length; i++) {
      pathEdges.add(step.path[i] + "->" + step.path[i + 1]);
    }
  }
  const compressedSet = new Set(step.compressed ?? []);
  const pathSet = new Set(step.path ?? []);
  return (
    <g>
      {IDS.map((id) => {
        const parent = step.nodes[id].parent;
        if (parent === id) return null;
        const from = pos.get(id)!;
        const to = pos.get(parent)!;
        const key = id + "->" + parent;
        const onPath = pathEdges.has(key);
        const compressed = compressedSet.has(id);
        const stroke = compressed
          ? C.success
          : onPath
            ? C.accent
            : fault
              ? C.warning
              : C.border;
        return (
          <line
            key={"edge-" + id}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke={stroke}
            strokeWidth={onPath || compressed ? 3.5 : 2}
            strokeDasharray={compressed ? "7 5" : undefined}
          />
        );
      })}
      {IDS.map((id) => {
        const { x, y } = pos.get(id)!;
        const isRoot = step.nodes[id].parent === id;
        const onPath = pathSet.has(id);
        const stroke = onPath ? C.accent : isRoot ? C.accent : C.border;
        const fill = onPath ? C.accent : C.elevated;
        return (
          <g key={"node-" + id}>
            {isRoot && (
              <circle
                cx={x}
                cy={y}
                r={R + 5}
                fill="none"
                stroke={C.accent}
                strokeWidth={1.5}
                strokeDasharray="3 4"
              />
            )}
            <circle
              cx={x}
              cy={y}
              r={R}
              fill={fill}
              fillOpacity={onPath ? 0.16 : 1}
              stroke={stroke}
              strokeWidth={isRoot || onPath ? 2.5 : 1.8}
            />
            <text
              x={x}
              y={y + 5}
              textAnchor="middle"
              fontSize={14}
              fontWeight={600}
              fill={onPath ? C.accent : C.primary}
            >
              {id}
            </text>
            {isRoot && (
              <text
                x={x}
                y={y + R + 24}
                textAnchor="middle"
                fontSize={11}
                fill={C.secondary}
              >
                {fault ? "根（秩被无视）" : `根 · rank ${step.nodes[id].rank}`}
              </text>
            )}
          </g>
        );
      })}
      <text x={870} y={96} textAnchor="end" fontSize={11} fill={C.secondary}>
        {marker}
      </text>
    </g>
  );
}

function BoundBars({ fault }: { fault: boolean }) {
  const rows = fault
    ? [
        {
          name: "链式森林 · 无压缩",
          bound: "单次 FIND Θ(n) → 总 Θ(m·n)",
          w: 660,
          tone: C.danger,
        },
        {
          name: "按秩合并 · 无压缩",
          bound: "树高 O(lg n) → 总 O(m·lg n)",
          w: 248,
          tone: C.warning,
        },
        {
          name: "按秩 + 路径压缩",
          bound: "总 O(m·α(n))",
          w: 165,
          tone: C.success,
        },
      ]
    : [
        {
          name: "链表 + 加权合并",
          bound: "总 O(m + n·lg n)",
          w: 330,
          tone: C.warning,
        },
        {
          name: "森林 + 按秩合并",
          bound: "树高 O(lg n) → 总 O(m·lg n)",
          w: 248,
          tone: C.warning,
        },
        {
          name: "按秩 + 路径压缩",
          bound: "总 O(m·α(n))",
          w: 165,
          tone: C.success,
        },
      ];
  return (
    <g>
      <text x={40} y={130} fontSize={13} fontWeight={700} fill={C.primary}>
        同样 n = 8、m = 8 次 FIND：三种策略的序列总代价量级
      </text>
      {rows.map((row, index) => {
        const y = 176 + index * 92;
        return (
          <g key={"bar-" + row.name}>
            <text
              x={40}
              y={y + 22}
              fontSize={12}
              fontWeight={600}
              fill={C.primary}
            >
              {row.name}
            </text>
            <rect
              x={230}
              y={y}
              width={row.w}
              height={44}
              rx={10}
              fill={row.tone}
              fillOpacity={0.16}
              stroke={row.tone}
              strokeWidth={1.5}
            />
            <text
              x={242 + row.w}
              y={y + 28}
              fontSize={12}
              fontWeight={600}
              fill={row.tone}
            >
              {row.bound}
            </text>
          </g>
        );
      })}
      <text x={40} y={480} fontSize={11} fill={C.secondary}>
        量级示意（非精确计时）：α(n)
        为逆阿克曼函数，实际输入规模下取值极小，但它不是数学常数。
      </text>
      <text x={40} y={504} fontSize={11} fill={C.secondary}>
        摊还结论只对整个操作序列成立；单次 FIND 的最坏代价仍可能接近 Θ(lg
        n)（正确模式）或 Θ(n)（故障模式）。
      </text>
    </g>
  );
}

export function Clrs4Chapter19DisjointSetsLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [fault, setFault] = useState(false);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          {
            opacity: index === 0 ? [1, 1] : [0, 1],
            duration: T * 0.55,
            ease: "out(3)",
          },
          index * T,
        );
        tl.label(step.label, index * T);
      });
    },
  });

  const steps = fault ? FAULT_STEPS : RANK_STEPS;
  const captions = fault ? FAULT_CAPTIONS : RANK_CAPTIONS;
  const activeIndex = Math.min(STEPS.length - 1, timeline.currentStep);
  const activeStep = steps[activeIndex] ?? steps[0];

  function reset() {
    timeline.goToStep(0);
    setFault(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="clrs4-ch19-disjoint-sets"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CLRS 4e · Chapter 19 · Disjoint Sets
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              森林形态实验：按秩合并与路径压缩如何压住树高
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              沿时间线推进
              MAKE-SET、UNION、FIND-SET，观察父指针森林的生长；打开故障注入后同一序列退化成链，对比两种命运的
              FIND 代价。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-3 flex min-h-11 cursor-pointer items-center gap-3 rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary">
          <input
            type="checkbox"
            checked={fault}
            onChange={(event) => {
              setFault(event.target.checked);
              timeline.goToStep(0);
            }}
            className="h-4 w-4 accent-(--accent)"
          />
          <span>
            注入故障：朴素合并
            <span className="ml-2 text-xs text-secondary">
              无视秩、按固定顺序挂根、FIND 不做压缩
            </span>
          </span>
        </label>

        {fault && (
          <div className="mb-3 rounded-control border border-warning bg-bg p-3 text-xs leading-5">
            <p className="font-semibold text-warning">{FAULT_INFO.title}</p>
            <p className="mt-1 text-secondary">{FAULT_INFO.desc}</p>
          </div>
        )}

        <svg
          viewBox="0 0 900 720"
          role="img"
          aria-label="CLRS 4e Chapter 19 专属不相交集合实验。覆盖 data structures for disjoint sets、不相交集合、disjoint-set operations、linked-list representation、disjoint-set forests、union by rank with path compression。展示 MAKE-SET 建立 singleton、UNION 按秩合并、FIND-SET 沿父指针上行、路径压缩把路径压扁、逆阿克曼函数序列界，以及朴素合并退化成链的故障注入；支持播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <rect x="0" y="0" width="900" height="720" rx={14} fill={C.bg} />
          <text x="30" y="40" fontSize={16} fontWeight={700} fill={C.primary}>
            MAKE-SET → UNION → FIND-SET → 路径压缩 → 序列界
          </text>
          <text x="30" y="66" fontSize={12} fill={C.secondary}>
            {fault
              ? "故障模式：朴素合并 · "
              : "正确模式：按秩合并 + 路径压缩 · "}
            步骤 {activeIndex + 1}/7 · {activeStep.stat}
          </text>
          {fault && (
            <text
              x="870"
              y="40"
              textAnchor="end"
              fontSize={12}
              fontWeight={700}
              fill={C.warning}
            >
              故障注入中
            </text>
          )}

          {STEPS.map((step, index) => (
            <g
              key={"stage-" + step.label}
              ref={(node) => {
                stageRefs.current[index] = node;
              }}
              style={{ opacity: index === 0 ? 1 : 0 }}
            >
              {index === STEPS.length - 1 ? (
                <BoundBars fault={fault} />
              ) : (
                <ForestView
                  step={steps[index]}
                  fault={fault}
                  marker={step.label}
                />
              )}
            </g>
          ))}

          <rect
            x="30"
            y="668"
            width="840"
            height="36"
            rx={10}
            fill={C.elevated}
            stroke={C.border}
            strokeWidth={1.5}
          />
          <text x="52" y="691" fontSize={12} fill={C.primary}>
            不变量：只挂根 · 秩相等才 +1 · 压缩只改 parent
          </text>
          <text
            x="848"
            y="691"
            textAnchor="end"
            fontSize={11}
            fill={fault ? C.warning : C.secondary}
          >
            {fault ? "故障中：树高失去上界" : "rank 是高度上界，不是实际高度"}
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={captions}
          caption="核心因果链：合并时压高度（按秩）决定 FIND 的最坏跳数，FIND 时压路径（压缩）决定后续查询的摊还代价。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置不相交集合实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        不相交集合森林把「集合」表示为父指针树：按秩合并控制树高，路径压缩摊薄未来查询，二者合起来给出
        O(m·α(n)) 的序列界。
      </figcaption>
    </figure>
  );
}
