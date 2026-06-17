"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <DeadlockVsLivelockDiagram>：死锁 vs 活锁并排对比动画（HEL-240，§5 主 Demo）。
 *
 * type D 收官章「测试与调试」的核心对照：两种「卡住」的 bug 长得像、却本质不同——
 *  - 死锁（deadlock）：两线程各持一锁、互等对方手里的那把，谁也不肯放手 → 都**冻结不动**
 *    （CPU 通常挂起、占用低），呼应第 3 章死锁环。
 *  - 活锁（livelock）：两线程检测到冲突就各自「礼让 / 退避重试」，但同步动作总是同时发生 →
 *    反复礼让、来回跳动，却**零进展**（CPU 忙等、占用高）。
 *
 * 餐厅后厨隐喻：死锁=两厨师各攥一件对方要的工具僵在原地；活锁=两人在窄过道反复对向让路，
 * 一起左一起右，谁也过不去——都在动，却谁也没真正前进。
 *
 * 并排两栏。共用一条 anime.js timeline，6 个关键帧逐拍点亮：
 *  ① 两栏同时开局：各 2 线程，进度条都在起点；
 *  ② 死锁栏：A 持 lock1、B 持 lock2（各攥一把）；活锁栏：两线程都想进同一窄道；
 *  ③ 死锁栏：A 等 lock2、B 等 lock1 → 环闭合、定格冻结 💀（进度条不动）；
 *     活锁栏：检测到冲突 → 两线程同时「退避礼让」，一起往左跳；
 *  ④ 活锁栏：又同时往右跳回——来回弹（进度条仍卡在起点）；
 *  ⑤ 收束对照：死锁=都不动·CPU 闲；活锁=都在动·CPU 忙——但两者进度都=0；
 *  ⑥ 点题：进度条对照，两栏都没前进；附「猜一猜哪个 CPU 占用率高」的答案条。
 *
 * 死锁栏的线程在 ③ 后保持冻结（不再动画）；活锁栏的线程位移在 ③④ 反复左右跳（dancer），
 * 二者进度条始终停在 0%——直观对照「不动 vs 白动」。label 锚在「该拍点亮到最亮」时刻
 * （lit = beat*(i+1)），与 FalseSharingDiagram / DeadlockCycleDiagram 同款，修正 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条。anime.js 经 useTeachingTimeline 动态 import
 * 切独立 chunk（硬规则 2/6），经 mdx-components 注册后 page 侧懒加载。
 * 视觉全部 DESIGN token（accent / success / warning / danger / border / text-* / bg），无裸 hex；
 * 时长走 TEACHING_BEAT_MS 具名常量（硬规则 5）。
 */

const VIEW_W = 700;
const VIEW_H = 524;

const DEAD_COLOR = "var(--danger)"; // 死锁栏主色（冻结）
const LIVE_COLOR = "var(--warning)"; // 活锁栏主色（来回动）
const A_COLOR = "var(--accent)"; // 线程 A / 线程一
const B_COLOR = "var(--success)"; // 线程 B / 线程二
const MUTED = "var(--text-secondary)";

// —— 两栏几何（左死锁 / 右活锁），各自一块面板，互不重叠 ——
const PANEL_Y = 64;
const PANEL_H = 268;
const PANEL_W = 320;
const LEFT_X = 24;
const RIGHT_X = 356; // 356 - (24+320)=12px 间隙，两面板不重叠

// 栏内：表头条 + 两线程节点 + 进度条 + 判决条（均落在面板内，互不重叠）
const HEAD_DY = 12; // 表头条相对面板顶
const HEAD_H = 34;
const NODE_DY = 64; // 线程节点行
const NODE_H = 48;
const NODE_W = 124;
const NODE_GAP = 16;
const BAR_DY = 142; // 进度条
const BAR_H = 26;
const BAR_W = 280;
const VERDICT_DY = 196; // 判决条
const VERDICT_H = 52;

// 一栏左右两个线程节点的 x（相对面板左边）。
const nodeLeftX = (panelX: number) =>
  panelX + (PANEL_W - 2 * NODE_W - NODE_GAP) / 2;
const nodeRightX = (panelX: number) => nodeLeftX(panelX) + NODE_W + NODE_GAP;

// —— 底部步骤说明条（单条，逐拍换文案；落在两面板之下，不重叠）——
const STEP_X = 24;
const STEP_Y = 348;
const STEP_W = 652;
const STEP_H = 40;

// —— CPU 占用对照条（猜一猜的答案，最后一拍出现）——
const CPU_X = 24;
const CPU_Y = 400;
const CPU_W = 652;
const CPU_H = 44;

type Phase = "deadlock" | "livelock";

const STEPS: readonly TeachingStep[] = [
  {
    label: "open",
    caption: "① 两边各有两个线程开工，进度条都在起点（0%）——谁先卡住？",
  },
  {
    label: "grab",
    caption:
      "② 死锁栏：A 攥住 lock1、B 攥住 lock2（各持一把）；活锁栏：两线程都想挤进同一条窄过道",
  },
  {
    label: "stuck",
    caption:
      "③ 死锁栏：A 等 lock2、B 等 lock1 → 环闭合，两人僵死、定格不动 💀；活锁栏：检测到冲突，两人同时退避礼让（一起往左跳）",
  },
  {
    label: "bounce",
    caption:
      "④ 活锁栏：礼让动作总是同时发生 → 又一起往右跳回，来回弹个不停；进度条仍卡在 0%",
  },
  {
    label: "contrast",
    caption:
      "⑤ 对照：死锁=两人都不动（CPU 通常挂起、闲）；活锁=两人一直在动（CPU 忙等、跑满）——可两边进度都=0",
  },
  {
    label: "verdict",
    caption:
      "⑥ 谁的 CPU 占用率高？答案：活锁——它在忙等空转；死锁线程多半被挂起、占用低。但本质相同：都没真正前进",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

// 各拍底部步骤条的文案（与 STEPS caption 同步，单条切换）。
const STEP_TEXT: readonly string[] = STEPS.map((s) => s.caption ?? s.label);

// 活锁栏「dancer」线程的水平位移（相对各自 base x）：③ 往左、④ 往右、之后停在错位处。
const LIVE_SHIFT: readonly number[] = [0, 0, -14, 14, 14, 14];

export function DeadlockVsLivelockDiagram() {
  // 步骤条：单条，逐拍把文案换掉（用 6 个叠放的 <g>，每拍只显当前那条）。
  const stepRefs = useRef<Record<number, SVGGElement | null>>({});
  // 死锁栏：环闭合冻结标注。
  const deadFreezeRef = useRef<SVGGElement | null>(null);
  // 死锁栏「持有 / 等待」标注层。
  const deadHoldRef = useRef<SVGGElement | null>(null);
  const deadWaitRef = useRef<SVGGElement | null>(null);
  // 活锁栏两个 dancer 线程节点（来回跳）。
  const liveT1Ref = useRef<SVGGElement | null>(null);
  const liveT2Ref = useRef<SVGGElement | null>(null);
  // 活锁栏「忙等·零进展」标注。
  const liveBusyRef = useRef<SVGGElement | null>(null);
  // CPU 占用对照条。
  const cpuRef = useRef<SVGGElement | null>(null);

  const beatOf: Record<string, number> = Object.fromEntries(
    STEPS.map((s, i) => [s.label, i]),
  );

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // 步骤条：每拍只点亮当前文案条，其余隐藏。
      STEPS.forEach((_, beat) => {
        for (let i = 0; i < STEPS.length; i++) {
          const el = stepRefs.current[i];
          if (!el) continue;
          tl.add(
            el,
            {
              opacity: i === beat ? 1 : 0,
              duration: TEACHING_BEAT_MS,
              ease: "out(3)",
            },
            TEACHING_BEAT_MS * beat,
          );
        }
      });

      // 死锁栏：② 持有标注出现；③ 等待+冻结标注出现并保持。
      if (deadHoldRef.current) {
        tl.add(
          deadHoldRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          TEACHING_BEAT_MS * beatOf.grab,
        );
      }
      if (deadWaitRef.current) {
        tl.add(
          deadWaitRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          TEACHING_BEAT_MS * beatOf.stuck,
        );
      }
      if (deadFreezeRef.current) {
        tl.add(
          deadFreezeRef.current,
          {
            opacity: [0, 1],
            scale: [0.6, 1],
            duration: TEACHING_BEAT_MS,
            ease: "out(4)",
          },
          TEACHING_BEAT_MS * beatOf.stuck,
        );
      }

      // 活锁栏：两个 dancer 在 ③④ 同步左右跳（translateX），之后停在错位处。
      [liveT1Ref, liveT2Ref].forEach((ref) => {
        if (!ref.current) return;
        STEPS.forEach((_, beat) => {
          tl.add(
            ref.current!,
            {
              translateX: LIVE_SHIFT[beat],
              duration: TEACHING_BEAT_MS,
              ease: "inOut(2)",
            },
            TEACHING_BEAT_MS * beat,
          );
        });
      });
      // 活锁栏「忙等·零进展」标注：④ 出现并保持。
      if (liveBusyRef.current) {
        tl.add(
          liveBusyRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          TEACHING_BEAT_MS * beatOf.bounce,
        );
      }

      // CPU 对照条：最后一拍出现（猜一猜的答案）。
      if (cpuRef.current) {
        tl.add(
          cpuRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          TEACHING_BEAT_MS * beatOf.verdict,
        );
      }

      // 打 label：lit = beat*(i+1)，锚在该拍点亮到最亮。
      STEPS.forEach((s, i) => {
        tl.label(s.label, TEACHING_BEAT_MS * (i + 1));
      });
    },
  });

  // —— 渲染一栏的静态骨架（表头 + 两线程节点 + 进度条 + 判决条）——
  const renderPanel = (
    panelX: number,
    phase: Phase,
    accent: string,
    headTitle: string,
    headSub: string,
    t1Label: string,
    t2Label: string,
    verdictTitle: string,
    verdictSub: string,
    dancerRefs?: [
      React.RefObject<SVGGElement | null>,
      React.RefObject<SVGGElement | null>,
    ],
  ) => {
    const lx = nodeLeftX(panelX);
    const rx = nodeRightX(panelX);
    const barX = panelX + (PANEL_W - BAR_W) / 2;
    const verdictX = panelX + (PANEL_W - BAR_W) / 2;
    const node = (
      x: number,
      label: string,
      color: string,
      ref?: React.RefObject<SVGGElement | null>,
    ) => (
      <g ref={ref}>
        <rect
          x={x}
          y={PANEL_Y + NODE_DY}
          width={NODE_W}
          height={NODE_H}
          rx="9"
          fill={color}
          fillOpacity="0.1"
          stroke={color}
          strokeWidth="1.6"
        />
        <text
          x={x + NODE_W / 2}
          y={PANEL_Y + NODE_DY + NODE_H / 2 + 4}
          textAnchor="middle"
          fontSize="11.5"
          fontWeight="700"
          fontFamily="var(--font-mono)"
          fill="var(--text-primary)"
        >
          {label}
        </text>
      </g>
    );
    return (
      <g>
        {/* 面板边框 */}
        <rect
          x={panelX}
          y={PANEL_Y}
          width={PANEL_W}
          height={PANEL_H}
          rx="12"
          fill={accent}
          fillOpacity="0.04"
          stroke={accent}
          strokeWidth="1.6"
        />
        {/* 表头条 */}
        <rect
          x={panelX + 14}
          y={PANEL_Y + HEAD_DY}
          width={PANEL_W - 28}
          height={HEAD_H}
          rx="8"
          fill={accent}
          fillOpacity="0.14"
          stroke={accent}
          strokeWidth="1.4"
        />
        <text
          x={panelX + PANEL_W / 2}
          y={PANEL_Y + HEAD_DY + 22}
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={accent}
        >
          {headTitle}
        </text>
        {/* 两个线程节点 */}
        {node(lx, t1Label, A_COLOR, dancerRefs?.[0])}
        {node(rx, t2Label, B_COLOR, dancerRefs?.[1])}
        {/* 节点下方一句说明 */}
        <text
          x={panelX + PANEL_W / 2}
          y={PANEL_Y + NODE_DY + NODE_H + 18}
          textAnchor="middle"
          fontSize="10.5"
          fill={MUTED}
        >
          {headSub}
        </text>
        {/* 进度条：常驻空槽（两栏进度都停在 0%，直观对照） */}
        <rect
          x={barX}
          y={PANEL_Y + BAR_DY}
          width={BAR_W}
          height={BAR_H}
          rx="7"
          fill="var(--text-secondary)"
          fillOpacity="0.08"
          stroke="var(--border)"
          strokeWidth="1.4"
        />
        <text
          x={barX + BAR_W / 2}
          y={PANEL_Y + BAR_DY + BAR_H / 2 + 4}
          textAnchor="middle"
          fontSize="10.5"
          fontWeight="700"
          fill={MUTED}
        >
          进度 0%（始终没前进）
        </text>
        {/* 判决条 */}
        <rect
          x={verdictX}
          y={PANEL_Y + VERDICT_DY}
          width={BAR_W}
          height={VERDICT_H}
          rx="8"
          fill={accent}
          fillOpacity="0.1"
          stroke={accent}
          strokeWidth="1.6"
        />
        <text
          x={verdictX + BAR_W / 2}
          y={PANEL_Y + VERDICT_DY + 21}
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={accent}
        >
          {verdictTitle}
        </text>
        <text
          x={verdictX + BAR_W / 2}
          y={PANEL_Y + VERDICT_DY + 39}
          textAnchor="middle"
          fontSize="10"
          fill={MUTED}
        >
          {verdictSub}
        </text>
      </g>
    );
  };

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
          aria-label="死锁与活锁并排对比动画。左栏是死锁：线程 A 攥住 lock1、线程 B 攥住 lock2，随后 A 等 lock2、B 等 lock1，环闭合，两个线程都冻结不动，CPU 通常被挂起、占用低。右栏是活锁：两个线程都想进同一条窄过道，检测到冲突后同时退避礼让，一起往左跳，又一起往右跳回，来回弹个不停，谁也过不去，CPU 一直忙等、占用高。两栏的进度条始终停在 0%。结论：活锁的 CPU 占用率更高，因为它在忙等空转；死锁线程多半被挂起、占用低；但两者本质相同，都没真正前进。播放时按六步依次点亮，可播放、暂停、单步、拖动进度。"
          className="mx-auto block h-auto w-full max-w-[700px]"
        >
          {/* 标题 */}
          <text
            x="22"
            y="28"
            fontSize="14"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            死锁 vs 活锁：都「卡住」，但一个不动、一个白动
          </text>
          <text x="22" y="48" fontSize="11" fill="var(--text-secondary)">
            死锁=互等对方放手、都冻结；活锁=反复礼让重试、都在动却零进展
          </text>

          {/* 左栏：死锁 */}
          {renderPanel(
            LEFT_X,
            "deadlock",
            DEAD_COLOR,
            "死锁 deadlock",
            "各攥一把对方要的锁，互不相让",
            "线程 A",
            "线程 B",
            "结论：两人都冻结·不动",
            "CPU 通常挂起 → 占用低",
          )}
          {/* 死锁栏：持有标注（②出现） */}
          <g ref={deadHoldRef} style={{ opacity: 0 }}>
            <text
              x={LEFT_X + PANEL_W / 2}
              y={PANEL_Y + NODE_DY - 8}
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              fill={MUTED}
            >
              A 持 lock1 · B 持 lock2
            </text>
          </g>
          {/* 死锁栏：等待+环闭合冻结标注（③出现，保持） */}
          <g ref={deadWaitRef} style={{ opacity: 0 }}>
            <text
              x={LEFT_X + PANEL_W / 2}
              y={PANEL_Y + NODE_DY + NODE_H + 34}
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              fill={DEAD_COLOR}
            >
              A 等 lock2 ↻ B 等 lock1：环闭合
            </text>
          </g>
          <g ref={deadFreezeRef} style={{ opacity: 0 }}>
            <text
              x={LEFT_X + nodeRightX(LEFT_X) - nodeLeftX(LEFT_X) - 2}
              y={PANEL_Y + NODE_DY + NODE_H / 2 + 6}
              textAnchor="middle"
              fontSize="20"
            >
              💀
            </text>
          </g>

          {/* 右栏：活锁 */}
          {renderPanel(
            RIGHT_X,
            "livelock",
            LIVE_COLOR,
            "活锁 livelock",
            "都想进同一窄道，反复对向礼让",
            "线程 一",
            "线程 二",
            "结论：两人一直在动·零进展",
            "CPU 忙等空转 → 占用高",
            [liveT1Ref, liveT2Ref],
          )}
          {/* 活锁栏：忙等·零进展标注（④出现，保持） */}
          <g ref={liveBusyRef} style={{ opacity: 0 }}>
            <text
              x={RIGHT_X + PANEL_W / 2}
              y={PANEL_Y + NODE_DY + NODE_H + 34}
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              fill={LIVE_COLOR}
            >
              ← 一起左 · 一起右 → 来回弹·过不去
            </text>
          </g>

          {/* 底部步骤条：单条，逐拍换文案 */}
          {STEP_TEXT.map((text, i) => (
            <g
              key={`step-${i}`}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              style={{ opacity: 0 }}
            >
              <rect
                x={STEP_X}
                y={STEP_Y}
                width={STEP_W}
                height={STEP_H}
                rx="8"
                fill="var(--accent)"
                fillOpacity="0.1"
                stroke="var(--accent)"
                strokeWidth="1.6"
              />
              <text
                x={STEP_X + 14}
                y={STEP_Y + STEP_H / 2 + 4}
                fontSize="11"
                fontWeight="600"
                fill="var(--text-primary)"
              >
                {text}
              </text>
            </g>
          ))}

          {/* CPU 占用对照条（最后一拍出现，回答猜一猜） */}
          <g ref={cpuRef} style={{ opacity: 0 }}>
            <rect
              x={CPU_X}
              y={CPU_Y}
              width={CPU_W}
              height={CPU_H}
              rx="8"
              fill="var(--success)"
              fillOpacity="0.08"
              stroke="var(--success)"
              strokeWidth="1.6"
            />
            <text
              x={CPU_X + 14}
              y={CPU_Y + 19}
              fontSize="11"
              fontWeight="700"
              fill="var(--success)"
            >
              猜一猜的答案：活锁 CPU 占用率更高（忙等空转）
            </text>
            <text
              x={CPU_X + 14}
              y={CPU_Y + 35}
              fontSize="10"
              fill="var(--text-secondary)"
            >
              死锁线程多半被挂起、占用低——所以「CPU 闲着却卡住」常是死锁的信号
            </text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="猜一猜：死锁和活锁，哪个 CPU 占用率高？单步看：死锁两人冻结不动、活锁两人来回弹却零进展。可暂停、单步、拖进度。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        死锁是「互等对方放手」——两个线程都冻结不动，CPU 常被挂起、占用低；
        活锁是「反复礼让重试」——两个线程一直在动，却因同步动作总是同时发生而谁也没前进，CPU
        忙等、占用高。二者都让程序卡死、进度归零，区别在「不动」还是「白动」。
      </figcaption>
    </figure>
  );
}
