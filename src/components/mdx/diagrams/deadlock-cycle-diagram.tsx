"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <DeadlockCycleDiagram>：死锁循环等待的动画（HEL-231，§3 引出 / §5 辅 Demo）。
 *
 * 餐厅后厨隐喻：两厨师各攥着一件对方要的工具，谁也不肯先放手——
 *  - 线程 A 已经持有 lock1，又伸手要 lock2；
 *  - 线程 B 已经持有 lock2，又伸手要 lock1。
 * 于是 A 等 B 手里的 lock2、B 等 A 手里的 lock1——形成环形等待，谁都动不了：死锁 💀。
 *
 * 画两条「持有」实线 + 两条「等待」虚线箭头，四条边首尾相接组成一个环。
 * 分步点亮（4 关键帧）：
 *  ① A 锁 lock1（持有实线）
 *  ② B 锁 lock2（持有实线）
 *  ③ A 等 lock2（等待虚线）
 *  ④ B 等 lock1（等待虚线）→ 环闭合，整体冻结标注 💀。
 *
 * 每个 step 的 label 锚定在「对应边点亮到最亮」的时刻（lit = beat*(i+1)），与
 * DanglingRefDiagram / ThreadLifecycleDiagram 同款写法，修正 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 动态 import 切独立 chunk（硬规则 2/6），本组件经 mdx-components 注册时
 * next/dynamic(ssr:false) 懒加载，不进首屏。
 *
 * 视觉全部 DESIGN token（accent / success / warning / danger / border / text-* / bg），
 * 无裸 hex；时长走 TEACHING_BEAT_MS 具名常量（硬规则 5）。
 */

// 顶部留白：把标题往下推，让标题文字距 viewBox 顶 ≥12px（HEL-245）。
// 整图垂直内容（标题/节点/锁行/边/骷髅框）统一加这个常量下移，VIEW_H 同步增大；
// 底部说明锚定 VIEW_H - 14 自动跟到底边。
const TOP_PAD = 12;

const VIEW_W = 560;
const VIEW_H = 360 + TOP_PAD;

// 四个节点（菱形/方形四角）：线程在上、锁在下。
const NODE_W = 168;
const NODE_H = 60;

const A_X = 36; // 线程 A：左上
const B_X = VIEW_W - 36 - NODE_W; // 线程 B：右上
const TOP_Y = 40 + TOP_PAD;
const BOT_Y = 234 + TOP_PAD; // 锁行
const LOCK1_X = A_X; // lock1：左下
const LOCK2_X = B_X; // lock2：右下

const A_COLOR = "var(--accent)"; // 线程 A
const B_COLOR = "var(--success)"; // 线程 B
const HOLD_COLOR = "var(--text-secondary)"; // 持有（中性实线）
const WAIT_COLOR = "var(--warning)"; // 等待（黄虚线）

// 四个节点中心点（连边用）。
const cx = (x: number) => x + NODE_W / 2;
const cy = (y: number) => y + NODE_H / 2;
const A_C = { x: cx(A_X), y: cy(TOP_Y) };
const B_C = { x: cx(B_X), y: cy(TOP_Y) };
const L1_C = { x: cx(LOCK1_X), y: cy(BOT_Y) };
const L2_C = { x: cx(LOCK2_X), y: cy(BOT_Y) };

const STEPS: readonly TeachingStep[] = [
  {
    label: "a-holds-1",
    caption: "① 线程 A 锁住 lock1：A 持有 lock1（攥着第一件工具）",
  },
  {
    label: "b-holds-2",
    caption: "② 线程 B 锁住 lock2：B 持有 lock2（攥着第二件工具）",
  },
  {
    label: "a-wants-2",
    caption: "③ A 又伸手要 lock2——可它在 B 手里，A 只能等",
  },
  {
    label: "b-wants-1",
    caption:
      "④ B 又伸手要 lock1——可它在 A 手里，B 也只能等：环闭合，谁都动不了 💀 死锁",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

const BEAT_OF: Record<string, number> = Object.fromEntries(
  STEPS.map((s, i) => [s.label, i]),
);

// 一条边的端点：从源节点边缘到目标节点边缘（缩进让箭头不戳进框里）。
function edgePoints(
  from: { x: number; y: number },
  to: { x: number; y: number },
  inset = 36,
) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  return {
    x1: from.x + ux * inset,
    y1: from.y + uy * inset,
    x2: to.x - ux * inset,
    y2: to.y - uy * inset,
  };
}

// 四条边的几何。holds：竖直（A→lock1 左、B→lock2 右）；waits：对角交叉。
const HOLD_A1 = edgePoints(A_C, L1_C);
const HOLD_B2 = edgePoints(B_C, L2_C);
const WAIT_A2 = edgePoints(A_C, L2_C);
const WAIT_B1 = edgePoints(B_C, L1_C);

export function DeadlockCycleDiagram() {
  const holdA1Ref = useRef<SVGGElement | null>(null);
  const holdB2Ref = useRef<SVGGElement | null>(null);
  const waitA2Ref = useRef<SVGGElement | null>(null);
  const waitB1Ref = useRef<SVGGElement | null>(null);
  const skullRef = useRef<SVGGElement | null>(null);

  const refByLabel: Record<string, React.RefObject<SVGGElement | null>> = {
    "a-holds-1": holdA1Ref,
    "b-holds-2": holdB2Ref,
    "a-wants-2": waitA2Ref,
    "b-wants-1": waitB1Ref,
  };

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step) => {
        const beat = BEAT_OF[step.label] ?? 0;
        const lit = TEACHING_BEAT_MS * (beat + 1);
        const el = refByLabel[step.label]?.current;
        if (el) {
          tl.add(
            el,
            { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
            TEACHING_BEAT_MS * beat,
          );
        }
        // 最后一拍：环闭合，骷髅冻结标注一起亮。
        if (step.label === "b-wants-1" && skullRef.current) {
          tl.add(
            skullRef.current,
            {
              opacity: [0, 1],
              scale: [0.6, 1],
              duration: TEACHING_BEAT_MS,
              ease: "out(4)",
            },
            TEACHING_BEAT_MS * beat,
          );
        }
        tl.label(step.label, lit);
      });
    },
  });

  // 边渲染：底层无（避免预先泄底环），仅高亮层由 anime.js 点亮。
  // labelT：标签沿边的位置比例（0=起点,1=终点）。两条 wait 对角线在正中相交，
  // 用不同比例把各自标签错开，避免叠字。
  const renderEdge = (
    ref: React.RefObject<SVGGElement | null>,
    pts: { x1: number; y1: number; x2: number; y2: number },
    color: string,
    marker: string,
    label: string,
    dashed: boolean,
    labelT = 0.5,
  ) => {
    const midX = pts.x1 + (pts.x2 - pts.x1) * labelT;
    const midY = pts.y1 + (pts.y2 - pts.y1) * labelT;
    return (
      <g ref={ref} style={{ opacity: 0 }}>
        <line
          x1={pts.x1}
          y1={pts.y1}
          x2={pts.x2}
          y2={pts.y2}
          stroke={color}
          strokeWidth="2.4"
          strokeDasharray={dashed ? "7 5" : undefined}
          markerEnd={`url(#${marker})`}
        />
        <rect
          x={midX - 22}
          y={midY - 10}
          width="44"
          height="18"
          rx="5"
          fill="var(--bg)"
          opacity="0.92"
        />
        <text
          x={midX}
          y={midY + 3}
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fill={color}
        >
          {label}
        </text>
      </g>
    );
  };

  // 一个节点框。
  const renderNode = (
    x: number,
    y: number,
    title: string,
    sub: string,
    color: string,
  ) => (
    <g>
      <rect
        x={x}
        y={y}
        width={NODE_W}
        height={NODE_H}
        rx="10"
        fill={color}
        fillOpacity="0.08"
        stroke={color}
        strokeWidth="1.6"
      />
      <text
        x={x + NODE_W / 2}
        y={y + 26}
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fontFamily="var(--font-mono)"
        fill={color}
      >
        {title}
      </text>
      <text
        x={x + NODE_W / 2}
        y={y + 44}
        textAnchor="middle"
        fontSize="10"
        fill="var(--text-secondary)"
      >
        {sub}
      </text>
    </g>
  );

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-6">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">⚡</span>
            可交互
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="死锁循环等待动画。左上是线程 A，右上是线程 B，左下是 lock1，右下是 lock2。第一步线程 A 锁住 lock1，画出一条 A 持有 lock1 的实线。第二步线程 B 锁住 lock2，画出 B 持有 lock2 的实线。第三步 A 又去要 lock2，但 lock2 在 B 手里，画出一条 A 等待 lock2 的虚线。第四步 B 又去要 lock1，但 lock1 在 A 手里，画出一条 B 等待 lock1 的虚线——四条边首尾相接组成环形等待，两个线程互相等对方手里的锁，谁都动不了，整体冻结并标注骷髅表示死锁。播放时按四步依次点亮，可播放、暂停、单步、拖动进度。"
          className="mx-auto block h-auto w-full max-w-[560px]"
        >
          <defs>
            <marker
              id="dcd-hold"
              markerWidth="9"
              markerHeight="9"
              refX="7"
              refY="3.5"
              orient="auto"
            >
              <path d="M0 0 L7 3.5 L0 7 z" fill={HOLD_COLOR} />
            </marker>
            <marker
              id="dcd-wait"
              markerWidth="9"
              markerHeight="9"
              refX="7"
              refY="3.5"
              orient="auto"
            >
              <path d="M0 0 L7 3.5 L0 7 z" fill={WAIT_COLOR} />
            </marker>
          </defs>

          {/* 标题 */}
          <text
            x={VIEW_W / 2}
            y={TOP_PAD + 22}
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            死锁：两厨师各攥一件对方要的工具
          </text>

          {/* 边（先画，置于节点之下；高亮层 anime.js 点亮）。
              wait 为黄虚线（伸手要、要不到），hold 为中性实线（已攥在手）。 */}
          {renderEdge(
            holdA1Ref,
            HOLD_A1,
            HOLD_COLOR,
            "dcd-hold",
            "持有",
            false,
          )}
          {renderEdge(
            holdB2Ref,
            HOLD_B2,
            HOLD_COLOR,
            "dcd-hold",
            "持有",
            false,
          )}
          {/* 两条 wait 对角线在正中相交：标签分别放 0.3 / 0.7 处错开，绝不叠字 */}
          {renderEdge(
            waitA2Ref,
            WAIT_A2,
            WAIT_COLOR,
            "dcd-wait",
            "等待",
            true,
            0.3,
          )}
          {renderEdge(
            waitB1Ref,
            WAIT_B1,
            WAIT_COLOR,
            "dcd-wait",
            "等待",
            true,
            0.7,
          )}

          {/* 四个节点 */}
          {renderNode(A_X, TOP_Y, "线程 A", "厨师 A", A_COLOR)}
          {renderNode(B_X, TOP_Y, "线程 B", "厨师 B", B_COLOR)}
          {renderNode(LOCK1_X, BOT_Y, "lock1", "工具一（搅拌机）", HOLD_COLOR)}
          {renderNode(LOCK2_X, BOT_Y, "lock2", "工具二（量杯）", HOLD_COLOR)}

          {/* 环闭合后的冻结标注 💀（步④出现，放在中央空隙，避开四节点与边标签） */}
          <g ref={skullRef} style={{ opacity: 0 }}>
            <rect
              x={VIEW_W / 2 - 72}
              y={BOT_Y - 8}
              width="144"
              height="48"
              rx="10"
              fill="var(--bg)"
              stroke="var(--danger)"
              strokeWidth="1.6"
            />
            <text
              x={VIEW_W / 2}
              y={BOT_Y + 12}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill="var(--danger)"
            >
              💀 死锁
            </text>
            <text
              x={VIEW_W / 2}
              y={BOT_Y + 30}
              textAnchor="middle"
              fontSize="10"
              fill="var(--text-secondary)"
            >
              环形等待·谁都不动
            </text>
          </g>

          {/* 底部说明 */}
          <text
            x={VIEW_W / 2}
            y={VIEW_H - 14}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            实线=已持有的锁，虚线=正伸手要却要不到的锁
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="A 持 lock1 等 lock2、B 持 lock2 等 lock1——四条边接成环，谁都等对方先放手：死锁。可暂停、单步、拖进度。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        死锁是「环形等待」：每个线程都攥着一把对方需要的锁、又在等对方手里的锁。
        像两厨师各攥一件对方要的工具互不相让，后厨就此僵死。避免它的经典办法是
        让所有线程按同一固定顺序加锁。
      </figcaption>
    </figure>
  );
}
