"use client";

import { useRef } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <ClassLoaderDelegationDiagram>：《Android 进阶解密》low-level-tech/classloader 章
 * 「双亲委派模型」配图（HEL-206）。
 *
 * 「可控教学动画」：一条竖向 ClassLoader 链（自下而上）：
 *   PathClassLoader（应用类，底）→ BootClassLoader（核心类，顶），旁挂 DexClassLoader
 *   （动态加载，与 PathClassLoader 同层、共用 parent）。每个 ClassLoader 标注它负责的类。
 *
 * 随时间线演示一次 loadClass("com.app.Foo")，看清双亲委派的「先上行委派、再下行加载」：
 *   ① 请求到达 PathClassLoader，先查自己已加载缓存 → 未命中 →
 *   ② 不自己加载，先向上委派给 parent（令牌上行）→
 *   ③ 一路委派到链顶 BootClassLoader →
 *   ④ BootClassLoader 尝试加载：核心类它能加载就返回；本例是应用类 com.app.Foo 它加载不了，
 *      于是逐级向下回退给子 ClassLoader 尝试（令牌下行）→
 *   ⑤ PathClassLoader 最终 findClass 加载成功（都失败则抛 ClassNotFoundException）。
 *
 * 每步点亮「当前活跃 ClassLoader」（accent 高亮层淡入），并让一颗「请求令牌」沿链
 * 先上行（委派步②③）再下行（加载步④⑤）滑动，方向一眼可辨。
 *
 * 时序照 MvcDataFlowDiagram / BackStackDiagram：步 i 的呈现占 [BEAT*i, BEAT*(i+1)]，
 * label 落在呈现完成处 BEAT*(i+1)，离开时从该 label 起淡出；最后一步停在亮态不淡出
 * （表示 PathClassLoader 已加载成功、闭环完成），杜绝单步 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 内部的动态 import("animejs") 切成独立 chunk（硬规则 2/6），本组件再经 mdx-components
 * 静态注册为客户端叶子，anime.js 绝不进首屏 / 公共 layout。
 *
 * 视觉：链节点常驻低对比底框，当前活跃节点淡入 accent 高亮层；令牌用 accent。
 * 全部 DESIGN token 配色无裸 hex；时长走 TEACHING_BEAT_MS 具名常量、几何常量均为 4 的
 * 倍数且具名（硬规则 5）。
 */

// —— 链节点（竖向堆叠：栈顶在上、栈底在下）+ 旁挂节点常量。间距走 4 的倍数。 ——
const NODE_W = 280;
const NODE_H = 64;
const NODE_X = 48; // 主链节点左边距
const CHAIN_GAP = 56; // 链上相邻两层节点的垂直间隔（留出令牌滑动 + 委派箭头空间）
const SLOT_H = NODE_H + CHAIN_GAP; // 一层「链槽」高度
const TOP_Y = 32; // 链顶（BootClassLoader）节点顶边 y

// 旁挂 DexClassLoader：与 PathClassLoader 同层、置于右侧，共用 BootClassLoader 作 parent。
const SIDE_W = 168;
const SIDE_GAP = 24; // 主链右边到旁挂节点左边的水平间隔

const VIEW_W = NODE_X + NODE_W + SIDE_GAP + SIDE_W + NODE_X;
const VIEW_H = TOP_Y + SLOT_H * 2 + NODE_H + 56; // 两段链槽 + 底节点 + 底部标注留白

// —— 链上三层（slot 0 = 链底 PathClassLoader，越上层 slot 越大、y 越小）。 ——
type ChainNode = {
  id: string;
  title: string;
  /** 它负责加载的类（副标题）。 */
  duty: string;
  slot: number;
};

// 主链（自下而上）：PathClassLoader（slot 0）→ 中间 BaseDexClassLoader 公共实现（slot 1）→
// BootClassLoader（slot 2，链顶）。BaseDexClassLoader 作为承上启下层，令牌途经它上下行。
const CHAIN: readonly ChainNode[] = [
  {
    id: "boot",
    title: "BootClassLoader",
    duty: "核心类（java.lang.String、framework）",
    slot: 2,
  },
  {
    id: "base",
    title: "BaseDexClassLoader",
    duty: ".dex 加载公共实现（承上启下）",
    slot: 1,
  },
  {
    id: "path",
    title: "PathClassLoader",
    duty: "已安装 App 的类（com.app.Foo）",
    slot: 0,
  },
];

// 旁挂节点（不参与本次令牌滑动，仅展示它也挂在链上、parent 同为上一层）。
const SIDE_NODE = {
  id: "dex",
  title: "DexClassLoader",
  duty: "外部 dex（热修复 / 插件）",
};

/** 把链层号 slot 换算成节点顶边 y（slot 越大越靠上、y 越小）。 */
function slotToY(slot: number): number {
  return TOP_Y + (2 - slot) * SLOT_H;
}

/** 某节点中心点（令牌端点 / 箭头端点用）。 */
function nodeCenter(slot: number) {
  return { cx: NODE_X + NODE_W / 2, cy: slotToY(slot) + NODE_H / 2 };
}

// —— 关键帧步骤（顺序即时间顺序；caption 供控制条朗读）。 ——
// activeId = 该步点亮的 ClassLoader；token = 该步令牌从哪个 slot 滑到哪个 slot（null 不滑）。
type DelegationStep = TeachingStep & {
  activeId: string;
  /** 令牌起止链层号；null 表示该步令牌不滑动（停在 activeId 处）。 */
  tokenFrom: number | null;
  tokenTo: number | null;
};

const STEPS: readonly DelegationStep[] = [
  {
    label: "request",
    caption:
      "① 请求 loadClass(\"com.app.Foo\") 到达 PathClassLoader：先查自己的已加载缓存 → 未命中",
    activeId: "path",
    tokenFrom: null,
    tokenTo: null,
  },
  {
    label: "delegate-up-1",
    caption:
      "② 不自己加载，先向上委派给 parent：令牌上行 PathClassLoader → BaseDexClassLoader",
    activeId: "base",
    tokenFrom: 0,
    tokenTo: 1,
  },
  {
    label: "delegate-up-2",
    caption:
      "③ 继续向上委派，一路到链顶 BootClassLoader（双亲委派：先交给最顶层试）",
    activeId: "boot",
    tokenFrom: 1,
    tokenTo: 2,
  },
  {
    label: "load-down",
    caption:
      "④ BootClassLoader 尝试加载：核心类它能加载就返回；本例是应用类 com.app.Foo，它加载不了 → 逐级向下回退（令牌下行）",
    activeId: "base",
    tokenFrom: 2,
    tokenTo: 0,
  },
  {
    label: "load-success",
    caption:
      "⑤ 回到 PathClassLoader，由它 findClass 加载成功（若各级都失败则抛 ClassNotFoundException）",
    activeId: "path",
    tokenFrom: null,
    tokenTo: null,
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function ClassLoaderDelegationDiagram() {
  // 每个链节点的「活跃高亮层」DOM 引用：该步它是当前活跃 ClassLoader 时淡入（accent 描边）。
  const nodeHi = useRef<Record<string, SVGRectElement | null>>({});
  // 请求令牌 DOM 引用：anime.js 驱动它沿链上下行（cy）+ 淡入淡出（opacity）。
  const tokenRef = useRef<SVGCircleElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, i) => {
        // 步 i 的呈现占 [BEAT*i, BEAT*(i+1)]；lit = BEAT*(i+1) = 完全呈现时刻 = label i 锚点。
        const start = TEACHING_BEAT_MS * i;
        const lit = TEACHING_BEAT_MS * (i + 1);
        const isLast = i === STEPS.length - 1;

        // 当前活跃 ClassLoader 高亮层：淡入点亮；离开时（非末步）淡回半灭。
        const hi = nodeHi.current[step.activeId];
        if (hi) {
          tl.add(
            hi,
            {
              opacity: [0.16, 1],
              duration: TEACHING_BEAT_MS,
              ease: "out(3)",
            },
            start,
          );
          if (!isLast) {
            tl.add(
              hi,
              {
                opacity: [1, 0.16],
                duration: TEACHING_BEAT_MS * 0.5,
                ease: "in(2)",
              },
              lit,
            );
          }
        }

        // 请求令牌：委派步（上行）/ 加载步（下行）沿链滑动；首尾步停在 activeId 处淡现。
        const token = tokenRef.current;
        if (token) {
          if (step.tokenFrom !== null && step.tokenTo !== null) {
            const fromY = nodeCenter(step.tokenFrom).cy;
            const toY = nodeCenter(step.tokenTo).cy;
            tl.add(
              token,
              {
                opacity: [0, 1, 1, 1],
                cy: [fromY, toY],
                duration: TEACHING_BEAT_MS,
                ease: "inOut(2)",
              },
              start,
            );
          } else {
            // 首尾步：令牌停在活跃节点处脉冲一下（强调「请求落在这里」）。
            const atY = nodeCenter(CHAIN.find((c) => c.id === step.activeId)!.slot)
              .cy;
            tl.add(
              token,
              {
                opacity: [0.2, 1],
                cy: atY,
                duration: TEACHING_BEAT_MS,
                ease: "out(2)",
              },
              start,
            );
          }
        }

        tl.label(step.label, lit);
      });
    },
  });

  const tokenInitY = nodeCenter(0).cy; // 令牌初始停在 PathClassLoader（步① 处）。

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-6">
        {/* ⚡ 可交互标签（与站内 Demo 容器气质一致） */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">⚡</span>
            可交互
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="ClassLoader 双亲委派模型演示。一条竖向 ClassLoader 链，自下而上：底层是 PathClassLoader（负责加载已安装 App 的类，如 com.app.Foo），中间是 BaseDexClassLoader（.dex 加载的公共实现，承上启下），顶层是 BootClassLoader（负责加载核心类，如 java.lang.String 和 framework 类）。右侧旁挂 DexClassLoader（负责加载外部 dex，用于热修复与插件化），它和 PathClassLoader 同层、共用 BootClassLoader 一系作为 parent。五步演示一次 loadClass(com.app.Foo) 的双亲委派全过程：① 请求到达底层 PathClassLoader，先查自己的已加载缓存，未命中；② 它不自己加载，先向上委派给 parent，请求令牌沿链上行到 BaseDexClassLoader；③ 继续向上委派，一路到链顶 BootClassLoader，这就是双亲委派——总是先交给最顶层的父加载器尝试；④ BootClassLoader 尝试加载，如果是核心类它能加载就直接返回，但本例 com.app.Foo 是应用类它加载不了，于是请求逐级向下回退给子 ClassLoader 尝试，令牌沿链下行；⑤ 回到 PathClassLoader，由它 findClass 加载成功，如果各级都加载失败则抛 ClassNotFoundException。双亲委派的目的是：核心类只由 BootClassLoader 加载，防止被应用伪造篡改，并保证同一个类在内存中唯一。可播放、暂停、单步、拖动进度逐帧观察令牌如何先上行委派、再下行加载，以及当前活跃的 ClassLoader 如何依次点亮。"
          className="mx-auto block h-auto w-full max-w-[600px]"
        >
          <defs>
            <marker
              id="cld-arrow-up"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* —— 链上相邻层之间的委派连接线（常驻、低对比；标「向上委派」「向下回退加载」）。—— */}
          {[0, 1].map((lower) => {
            const upper = lower + 1;
            const a = nodeCenter(lower);
            const b = nodeCenter(upper);
            // 委派方向标注 x 放在链左侧、加载方向标注 x 放在链右侧，互不压字。
            const midY = (a.cy + b.cy) / 2;
            return (
              <g key={`link-${lower}`}>
                {/* 连接竖线（常驻参照系） */}
                <line
                  x1={a.cx}
                  y1={a.cy - NODE_H / 2}
                  x2={b.cx}
                  y2={b.cy + NODE_H / 2}
                  stroke="var(--border)"
                  strokeWidth="1.4"
                />
                {/* 向上委派标注（左侧） */}
                <text
                  x={a.cx - 12}
                  y={midY - 4}
                  textAnchor="end"
                  fontSize="11"
                  fontWeight="600"
                  fill="var(--text-secondary)"
                >
                  ↑ 向上委派
                </text>
                {/* 向下回退加载标注（右侧） */}
                <text
                  x={a.cx + 12}
                  y={midY + 12}
                  textAnchor="start"
                  fontSize="11"
                  fontWeight="600"
                  fill="var(--text-secondary)"
                >
                  ↓ 回退加载
                </text>
              </g>
            );
          })}

          {/* —— 旁挂 DexClassLoader 与 BaseDexClassLoader 的同层连接（虚线，示意「也挂在链上」）。—— */}
          <line
            x1={NODE_X + NODE_W}
            y1={slotToY(0) + NODE_H / 2}
            x2={NODE_X + NODE_W + SIDE_GAP}
            y2={slotToY(0) + NODE_H / 2}
            stroke="var(--border)"
            strokeWidth="1.4"
            strokeDasharray="4 4"
            markerEnd="url(#cld-arrow-up)"
          />

          {/* —— 主链三层节点：底框 + 活跃高亮层（anime.js 驱动）+ 标题 + 负责的类。—— */}
          {CHAIN.map((n) => {
            const y = slotToY(n.slot);
            return (
              <g key={n.id}>
                {/* 底框（常驻、低对比） */}
                <rect
                  x={NODE_X}
                  y={y}
                  width={NODE_W}
                  height={NODE_H}
                  rx="8"
                  fill="var(--bg)"
                  stroke="var(--border)"
                  strokeWidth="1.2"
                />
                {/* 活跃高亮层：默认半灭，该步它是当前活跃 ClassLoader 时淡入。 */}
                <rect
                  ref={(el) => {
                    nodeHi.current[n.id] = el;
                  }}
                  x={NODE_X}
                  y={y}
                  width={NODE_W}
                  height={NODE_H}
                  rx="8"
                  fill="var(--accent-glow)"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  opacity="0.16"
                />
                {/* ClassLoader 名（主标题） */}
                <text
                  x={NODE_X + NODE_W / 2}
                  y={y + 28}
                  textAnchor="middle"
                  fontSize="15"
                  fontWeight="700"
                  fontFamily="var(--font-mono)"
                  fill="var(--text-primary)"
                >
                  {n.title}
                </text>
                {/* 它负责加载的类（副标题） */}
                <text
                  x={NODE_X + NODE_W / 2}
                  y={y + 48}
                  textAnchor="middle"
                  fontSize="10.5"
                  fill="var(--text-secondary)"
                >
                  {n.duty}
                </text>
              </g>
            );
          })}

          {/* —— 旁挂 DexClassLoader 节点（不参与令牌滑动，常驻展示）。—— */}
          {(() => {
            const sx = NODE_X + NODE_W + SIDE_GAP;
            const sy = slotToY(0);
            return (
              <g>
                <rect
                  x={sx}
                  y={sy}
                  width={SIDE_W}
                  height={NODE_H}
                  rx="8"
                  fill="var(--bg)"
                  stroke="var(--border)"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                />
                <text
                  x={sx + SIDE_W / 2}
                  y={sy + 28}
                  textAnchor="middle"
                  fontSize="12.8"
                  fontWeight="700"
                  fontFamily="var(--font-mono)"
                  fill="var(--text-primary)"
                >
                  {SIDE_NODE.title}
                </text>
                <text
                  x={sx + SIDE_W / 2}
                  y={sy + 48}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  {SIDE_NODE.duty}
                </text>
              </g>
            );
          })()}

          {/* —— 顶 / 底方向标注（帮读者定位「哪头是链顶 parent」）。—— */}
          <text
            x={NODE_X + NODE_W / 2}
            y={TOP_Y - 12}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            链顶 = 最终 parent（核心类只此处加载）▴
          </text>
          <text
            x={NODE_X + NODE_W / 2}
            y={VIEW_H - 28}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            ▾ 链底 = 应用 ClassLoader（请求入口）
          </text>

          {/* —— 请求令牌（默认停在 PathClassLoader 处；anime.js 驱动其沿链 cy 上下行）。—— */}
          <circle
            ref={tokenRef}
            cx={NODE_X + NODE_W / 2}
            cy={tokenInitY}
            r="7"
            fill="var(--accent)"
            opacity="0.2"
          />
        </svg>

        {/* 控制条原语：播放/暂停/单步/拖进度 + 当前步文案 */}
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="点击播放，看一次 loadClass 如何「先上行委派到链顶、再下行回退加载」；当前活跃的 ClassLoader 会依次点亮。可暂停、单步、拖进度逐帧观察。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        双亲委派模型：加载类时先把请求一路向上委派给 parent，到链顶 BootClassLoader 先试；
        父加载不了再逐级向下回退给子加载器。核心类只由 BootClassLoader 加载——防止被应用伪造篡改，
        并保证类在内存中唯一。
      </figcaption>
    </figure>
  );
}
