"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <MecanimStateMachineDiagram>：本章主图——「Mecanim 状态机 + 条件过渡 + 当前态迁移」（HEL-286）。
 *
 * 画一个状态机：四个状态节点 Idle / Walk / Run / Jump，节点间用带条件的过渡箭头连接：
 *  Idle →(Speed>0.1)→ Walk →(Speed>4)→ Run，以及任意态 →(Jump trigger)→ Jump。
 * 一个「当前激活态」高亮环随参数变化沿箭头迁移，把「状态机据条件自己切动画」掰碎。
 *
 * 动画分 5 步（lit = BEAT*(i+1)）：
 *  - 步①：起始默认态 Idle 高亮（Speed=0）。
 *  - 步②：Speed 升到 0.1 以上 → 满足 Idle→Walk 条件 → 高亮环迁到 Walk。
 *  - 步③：Speed 升到 4 以上 → 满足 Walk→Run 条件 → 高亮环迁到 Run。
 *  - 步④：触发 Jump trigger → 高亮环迁到 Jump（一次性动作）。
 *  - 步⑤：Jump 播完、trigger 被消费复位 → 高亮环按 Speed 落回 Run。
 *
 * 高亮环用 translate 在四个节点中心间移动；所有坐标整数常量（无 Math 浮点算坐标，
 * 杜绝 SSR/浏览器末位差导致的 hydration mismatch）。
 *
 * 视觉：全部 DESIGN token；无裸 hex；时长走 TEACHING_BEAT_MS 具名常量（硬规则 5）。
 * 所有 <text> 距 viewBox 任意边 ≥14px；节点互不重叠；过渡箭头不压节点文字。
 */

const VIEW_W = 736;
// VIEW_H=400：最低内容是参数面板底 372，下留 28px。纵向利用率 ~85%。
const VIEW_H = 400;

// 四个状态节点（圆角矩形），全整数常量坐标。
const NODE_W = 132;
const NODE_H = 56;
// 节点左上角 (x, y)。Idle / Walk / Run 在一条主行，Jump 在下方居中。
const IDLE_X = 40;
const IDLE_Y = 96;
const WALK_X = 302;
const WALK_Y = 96;
const RUN_X = 564;
const RUN_Y = 96;
const JUMP_X = 302;
const JUMP_Y = 232;

// 各节点中心（整数；仅保留被引用的）。
const IDLE_CY = IDLE_Y + NODE_H / 2; // 124
const WALK_CX = WALK_X + NODE_W / 2; // 368
const WALK_CY = WALK_Y + NODE_H / 2; // 124
const RUN_CY = RUN_Y + NODE_H / 2; // 124
const JUMP_CX = JUMP_X + NODE_W / 2; // 368

// 高亮环（套在当前激活节点外的圆角框），比节点大一圈。
const RING_PAD = 8;
const RING_W = NODE_W + RING_PAD * 2; // 148
const RING_H = NODE_H + RING_PAD * 2; // 72
// 高亮环以 Idle 为基准位置（左上角），靠 translate 迁移到其它节点。
const RING_X0 = IDLE_X - RING_PAD; // 32
const RING_Y0 = IDLE_Y - RING_PAD; // 88
// 各目标节点相对 Idle 的整数位移。
const DX_WALK = WALK_X - IDLE_X; // 262
const DX_RUN = RUN_X - IDLE_X; // 524
const DX_JUMP = JUMP_X - IDLE_X; // 262
const DY_JUMP = JUMP_Y - IDLE_Y; // 136

// 参数面板（底部）：展示 Speed 与 Jump trigger 当前值。
const PANEL_X = 40;
const PANEL_Y = 318;
const PANEL_W = 656;
const PANEL_H = 54;

const STEPS: readonly TeachingStep[] = [
  {
    label: "idle",
    caption:
      "① 起始默认态 Idle（Speed = 0）——状态机开机停在它身上，播 Idle 动画",
  },
  {
    label: "to-walk",
    caption:
      "② 代码设 Speed = 2（> 0.1）→ 满足 Idle→Walk 的条件 → 当前态自动迁到 Walk，播 Walk 动画",
  },
  {
    label: "to-run",
    caption:
      "③ 代码设 Speed = 6（> 4）→ 满足 Walk→Run 的条件 → 当前态自动迁到 Run，播 Run 动画",
  },
  {
    label: "to-jump",
    caption:
      "④ 代码 SetTrigger(「Jump」) → 触发「任意态→Jump」过渡 → 当前态迁到 Jump，播一次性跳跃动画",
  },
  {
    label: "back",
    caption:
      "⑤ Jump 播完、trigger 被这条过渡「消费」自动复位 → 按当前 Speed 落回 Run",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function MecanimStateMachineDiagram() {
  const ringRef = useRef<SVGGElement | null>(null);
  // 参数面板上的两个动态文本（Speed 值、Jump trigger 状态）。
  const speedValRef = useRef<SVGTextElement | null>(null);
  const jumpValRef = useRef<SVGTextElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // 步①：默认态 Idle 高亮（环在 Idle 位）+ Speed=0（start = BEAT*0）。
      const s0 = TEACHING_BEAT_MS * 0;
      if (ringRef.current) {
        tl.add(
          ringRef.current,
          {
            translateX: [0, 0],
            translateY: [0, 0],
            duration: TEACHING_BEAT_MS,
            ease: "out(2)",
          },
          s0,
        );
      }
      tl.label("idle", TEACHING_BEAT_MS * 1);

      // 步②：环迁到 Walk + Speed 文本变 2（start = BEAT*1）。
      const s1 = TEACHING_BEAT_MS * 1;
      if (ringRef.current) {
        tl.add(
          ringRef.current,
          {
            translateX: [0, DX_WALK],
            translateY: [0, 0],
            duration: TEACHING_BEAT_MS,
            ease: "inOut(2)",
          },
          s1,
        );
      }
      if (speedValRef.current) {
        tl.add(
          speedValRef.current,
          { opacity: [0.4, 1], duration: TEACHING_BEAT_MS, ease: "out(2)" },
          s1,
        );
      }
      tl.label("to-walk", TEACHING_BEAT_MS * 2);

      // 步③：环迁到 Run（start = BEAT*2）。
      const s2 = TEACHING_BEAT_MS * 2;
      if (ringRef.current) {
        tl.add(
          ringRef.current,
          {
            translateX: [DX_WALK, DX_RUN],
            translateY: [0, 0],
            duration: TEACHING_BEAT_MS,
            ease: "inOut(2)",
          },
          s2,
        );
      }
      tl.label("to-run", TEACHING_BEAT_MS * 3);

      // 步④：环迁到 Jump（下方）+ Jump trigger 文本点亮（start = BEAT*3）。
      const s3 = TEACHING_BEAT_MS * 3;
      if (ringRef.current) {
        tl.add(
          ringRef.current,
          {
            translateX: [DX_RUN, DX_JUMP],
            translateY: [0, DY_JUMP],
            duration: TEACHING_BEAT_MS,
            ease: "inOut(2)",
          },
          s3,
        );
      }
      if (jumpValRef.current) {
        tl.add(
          jumpValRef.current,
          { opacity: [0.4, 1], duration: TEACHING_BEAT_MS, ease: "out(2)" },
          s3,
        );
      }
      tl.label("to-jump", TEACHING_BEAT_MS * 4);

      // 步⑤：trigger 被消费复位、环落回 Run（start = BEAT*4）。
      const s4 = TEACHING_BEAT_MS * 4;
      if (ringRef.current) {
        tl.add(
          ringRef.current,
          {
            translateX: [DX_JUMP, DX_RUN],
            translateY: [DY_JUMP, 0],
            duration: TEACHING_BEAT_MS,
            ease: "inOut(2)",
          },
          s4,
        );
      }
      if (jumpValRef.current) {
        tl.add(
          jumpValRef.current,
          { opacity: [1, 0.4], duration: TEACHING_BEAT_MS, ease: "out(2)" },
          s4,
        );
      }
      tl.label("back", TEACHING_BEAT_MS * 5);
    },
  });

  // 四个状态节点的渲染数据。
  const nodes = [
    { x: IDLE_X, y: IDLE_Y, t: "Idle", d: "默认起始态", clip: "Idle 动画" },
    { x: WALK_X, y: WALK_Y, t: "Walk", d: "走", clip: "Walk 动画" },
    { x: RUN_X, y: RUN_Y, t: "Run", d: "跑", clip: "Run 动画" },
    { x: JUMP_X, y: JUMP_Y, t: "Jump", d: "一次性动作", clip: "Jump 动画" },
  ];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-6">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">⚡</span>
            可交互
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Mecanim 动画状态机的迁移动画。画面里有四个状态节点：左边 Idle 是默认起始态，中间 Walk，右边 Run，下方中间是 Jump。节点之间用带条件的箭头连接：Idle 到 Walk 的箭头标着条件 Speed 大于 0.1，Walk 到 Run 的箭头标着 Speed 大于 4，还有一条从任意状态指向 Jump 的箭头标着 Jump trigger。底部有一个参数面板显示当前 Speed 值和 Jump trigger 状态。一个高亮环表示当前激活的状态。动画分五步：先停在默认态 Idle，Speed 等于 0；代码把 Speed 设为 2 超过 0.1，满足条件，高亮环自动迁到 Walk；Speed 设为 6 超过 4，高亮环迁到 Run；调用 SetTrigger Jump，高亮环迁到 Jump 播放一次性跳跃；跳跃播完、trigger 被这条过渡消费自动复位，高亮环按当前 Speed 落回 Run。核心是代码只负责设参数，到底播哪个动画、怎么切由状态机根据过渡条件自己决定。可播放、暂停、单步、拖动进度。"
          className="mx-auto block h-auto w-full max-w-[736px]"
        >
          {/* ===== 主标题 ===== */}
          <text
            x={VIEW_W / 2}
            y={28}
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            动画状态机：参数变化 → 满足过渡条件 → 当前态自动迁移
          </text>
          <text
            x={VIEW_W / 2}
            y={50}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            代码只负责「设参数」，到底播哪个动画、怎么切，由状态机按条件自己决定
          </text>

          {/* ===== 过渡箭头（先画线，节点框盖住线头）===== */}
          {/* Idle → Walk（条件 Speed>0.1） */}
          <line
            x1={IDLE_X + NODE_W}
            y1={IDLE_CY}
            x2={WALK_X}
            y2={WALK_CY}
            stroke="var(--text-secondary)"
            strokeWidth="1.8"
            markerEnd="url(#sm-arrow)"
          />
          <text
            x={(IDLE_X + NODE_W + WALK_X) / 2}
            y={IDLE_CY - 10}
            textAnchor="middle"
            fontSize="9.5"
            fontFamily="var(--font-mono)"
            fill="var(--text-secondary)"
          >
            Speed &gt; 0.1
          </text>
          {/* Walk → Run（条件 Speed>4） */}
          <line
            x1={WALK_X + NODE_W}
            y1={WALK_CY}
            x2={RUN_X}
            y2={RUN_CY}
            stroke="var(--text-secondary)"
            strokeWidth="1.8"
            markerEnd="url(#sm-arrow)"
          />
          <text
            x={(WALK_X + NODE_W + RUN_X) / 2}
            y={WALK_CY - 10}
            textAnchor="middle"
            fontSize="9.5"
            fontFamily="var(--font-mono)"
            fill="var(--text-secondary)"
          >
            Speed &gt; 4
          </text>
          {/* Run → Walk 回边（条件 Speed<4），画在主行下方一点点，避免与上边重叠 */}
          <path
            d={`M ${RUN_X} ${RUN_CY + 14} Q ${(WALK_X + NODE_W + RUN_X) / 2} ${RUN_CY + 44} ${WALK_X + NODE_W} ${WALK_CY + 14}`}
            fill="none"
            stroke="var(--border)"
            strokeWidth="1.4"
            strokeDasharray="5 4"
            markerEnd="url(#sm-arrow-dim)"
          />
          {/* Jump 进入箭头（条件 Jump trigger）：从 Walk 底边连到 Jump 顶边 */}
          <line
            x1={WALK_CX}
            y1={WALK_Y + NODE_H}
            x2={JUMP_CX}
            y2={JUMP_Y}
            stroke="var(--accent)"
            strokeWidth="1.8"
            markerEnd="url(#sm-arrow-accent)"
          />
          <text
            x={WALK_CX + 70}
            y={(WALK_Y + NODE_H + JUMP_Y) / 2 + 4}
            textAnchor="middle"
            fontSize="9.5"
            fontFamily="var(--font-mono)"
            fill="var(--accent)"
          >
            Jump trigger
          </text>
          <text
            x={WALK_CX + 70}
            y={(WALK_Y + NODE_H + JUMP_Y) / 2 + 18}
            textAnchor="middle"
            fontSize="8.5"
            fill="var(--text-secondary)"
          >
            任意态都可触发
          </text>

          {/* ===== 当前激活态高亮环（套在节点外，靠 translate 迁移）===== */}
          <g ref={ringRef}>
            <rect
              x={RING_X0}
              y={RING_Y0}
              width={RING_W}
              height={RING_H}
              rx="14"
              fill="var(--accent)"
              fillOpacity="0.1"
              stroke="var(--accent)"
              strokeWidth="2.6"
            />
            <text
              x={RING_X0 + RING_W / 2}
              y={RING_Y0 - 8}
              textAnchor="middle"
              fontSize="9.5"
              fontWeight="700"
              fill="var(--accent)"
            >
              ● 当前激活态
            </text>
          </g>

          {/* ===== 四个状态节点 ===== */}
          {nodes.map((n) => (
            <g key={n.t}>
              <rect
                x={n.x}
                y={n.y}
                width={NODE_W}
                height={NODE_H}
                rx="10"
                fill="var(--bg)"
                stroke="var(--border)"
                strokeWidth="1.6"
              />
              <text
                x={n.x + NODE_W / 2}
                y={n.y + 24}
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fontFamily="var(--font-mono)"
                fill="var(--text-primary)"
              >
                {n.t}
              </text>
              <text
                x={n.x + NODE_W / 2}
                y={n.y + 42}
                textAnchor="middle"
                fontSize="9"
                fill="var(--text-secondary)"
              >
                {n.clip} · {n.d}
              </text>
            </g>
          ))}

          {/* ===== 底部参数面板 ===== */}
          <rect
            x={PANEL_X}
            y={PANEL_Y}
            width={PANEL_W}
            height={PANEL_H}
            rx="9"
            fill="var(--text-secondary)"
            fillOpacity="0.05"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          <text
            x={PANEL_X + 16}
            y={PANEL_Y + 22}
            textAnchor="start"
            fontSize="11"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            参数面板（代码设值的地方）
          </text>
          <text
            x={PANEL_X + 16}
            y={PANEL_Y + 40}
            textAnchor="start"
            fontSize="9.5"
            fill="var(--text-secondary)"
          >
            过渡上挂的条件，全看这里的参数值
          </text>
          {/* Speed 参数 */}
          <text
            ref={speedValRef}
            x={PANEL_X + 330}
            y={PANEL_Y + 33}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            fill="var(--accent)"
            opacity="0.4"
          >
            float Speed
          </text>
          {/* Jump trigger 参数 */}
          <text
            ref={jumpValRef}
            x={PANEL_X + 530}
            y={PANEL_Y + 33}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            fill="var(--accent)"
            opacity="0.4"
          >
            trigger Jump
          </text>

          <defs>
            <marker
              id="sm-arrow"
              markerWidth="9"
              markerHeight="9"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
            <marker
              id="sm-arrow-dim"
              markerWidth="9"
              markerHeight="9"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--border)" />
            </marker>
            <marker
              id="sm-arrow-accent"
              markerWidth="9"
              markerHeight="9"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
          </defs>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="猜一猜：代码把 Speed 从 0 慢慢调大，当前激活态会怎么走？是你写 if-else 切的，还是状态机按过渡条件自己迁的？单步走一遍看答案。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        一个 Animator Controller
        里画着状态机：每个状态播一个动画，状态间用带**条件**的**过渡**箭头连接。代码只往参数面板里设
        `Speed` /
        `Jump`，到底从哪个状态切到哪个、走不走，由状态机按过渡条件自己决定——逻辑与动画就此解耦。
      </figcaption>
    </figure>
  );
}
