"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <ParamsToAnimatorDiagram>：辅图——「代码设参数 → 参数面板变化 → 状态机据条件迁移」（HEL-286）。
 *
 * 三栏因果链，点清「代码只设参数、动画切换由状态机决定」的解耦关系：
 *  左·代码栏：两行 animator.SetFloat / SetTrigger 逐步点亮。
 *  中·参数面板：被设的参数值随之更新（Speed: 2、Jump: 触发）。
 *  右·状态机栏：状态机据条件把当前态从 Idle 切到 Walk，再切到 Jump。
 *
 * 动画分 4 步（lit = BEAT*(i+1)）：
 *  - 步①：左栏第 1 行 SetFloat 点亮 → 中栏 Speed 值更新为 2。
 *  - 步②：右栏据「Speed>0.1」把当前态从 Idle 切到 Walk（高亮迁移）。
 *  - 步③：左栏第 2 行 SetTrigger 点亮 → 中栏 Jump 标「已触发」。
 *  - 步④：右栏据「Jump trigger」把当前态切到 Jump（高亮迁移）。
 *
 * 高亮环用 translateY 在右栏三个小状态格之间纵向移动；坐标整数常量（无 Math 浮点）。
 *
 * 视觉：全部 DESIGN token；无裸 hex；时长走 TEACHING_BEAT_MS（硬规则 5）。
 * 所有 <text> 距 viewBox 任意边 ≥14px；三栏互不重叠。
 */

const VIEW_W = 736;
// VIEW_H=312：最低内容是三栏框底 288，下留 24px。纵向利用率 ~88%。
const VIEW_H = 312;

// 三栏布局：左代码 / 中参数 / 右状态机。
const COL_Y = 78;
const COL_H = 210;
const L_X = 24;
const L_W = 244;
const M_X = 290;
const M_W = 156;
const R_X = 468;
const R_W = 244;

// 左栏两行代码 y（行基线）。
const CODE_Y0 = COL_Y + 60;
const CODE_DY = 56;

// 中栏两个参数行（框）。
const PARAM_Y0 = COL_Y + 48;
const PARAM_DY = 70;
const PARAM_W = M_W - 28;
const PARAM_H = 50;
const PARAM_X = M_X + 14;

// 右栏三个状态小格（纵向排）。
const ST_X = R_X + 40;
const ST_W = 164;
const ST_H = 42;
const ST_Y0 = COL_Y + 44;
const ST_DY = 56;
// 高亮环（套在右栏状态格外）以第 1 格（Idle）为基准，靠 translateY 下移。
const RING_PAD = 6;
const RING_X = ST_X - RING_PAD;
const RING_Y0 = ST_Y0 - RING_PAD;
const RING_W = ST_W + RING_PAD * 2;
const RING_H = ST_H + RING_PAD * 2;
const RING_DY = ST_DY; // 每下一格的位移 = 56

const STEPS: readonly TeachingStep[] = [
  {
    label: "set-float",
    caption:
      "① 代码 animator.SetFloat(「Speed」, 2)：你只是「往参数面板写了个数」，没碰任何动画",
  },
  {
    label: "to-walk",
    caption:
      "② 状态机看到 Speed = 2 满足「Speed>0.1」→ 自己把当前态从 Idle 切到 Walk（不是你切的）",
  },
  {
    label: "set-trigger",
    caption:
      "③ 代码 animator.SetTrigger(「Jump」)：又只是「把 Jump 这个触发器拨一下」",
  },
  {
    label: "to-jump",
    caption:
      "④ 状态机看到 Jump 被触发 → 自己把当前态切到 Jump，播一次性跳跃动画",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function ParamsToAnimatorDiagram() {
  // 左栏两行代码。
  const code1Ref = useRef<SVGGElement | null>(null);
  const code2Ref = useRef<SVGGElement | null>(null);
  // 中栏两个参数值文本。
  const speedValRef = useRef<SVGTextElement | null>(null);
  const jumpValRef = useRef<SVGTextElement | null>(null);
  // 右栏高亮环。
  const ringRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // 步①：左栏第 1 行点亮 + 中栏 Speed 值更新（start = BEAT*0）。
      const s0 = TEACHING_BEAT_MS * 0;
      if (code1Ref.current) {
        tl.add(
          code1Ref.current,
          { opacity: [0.3, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s0,
        );
      }
      if (speedValRef.current) {
        tl.add(
          speedValRef.current,
          { opacity: [0.3, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s0,
        );
      }
      tl.label("set-float", TEACHING_BEAT_MS * 1);

      // 步②：右栏高亮环从 Idle 下移到 Walk（start = BEAT*1）。
      const s1 = TEACHING_BEAT_MS * 1;
      if (ringRef.current) {
        tl.add(
          ringRef.current,
          {
            translateY: [0, RING_DY],
            duration: TEACHING_BEAT_MS,
            ease: "inOut(2)",
          },
          s1,
        );
      }
      tl.label("to-walk", TEACHING_BEAT_MS * 2);

      // 步③：左栏第 2 行点亮 + 中栏 Jump 标已触发（start = BEAT*2）。
      const s2 = TEACHING_BEAT_MS * 2;
      if (code2Ref.current) {
        tl.add(
          code2Ref.current,
          { opacity: [0.3, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s2,
        );
      }
      if (jumpValRef.current) {
        tl.add(
          jumpValRef.current,
          { opacity: [0.3, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s2,
        );
      }
      tl.label("set-trigger", TEACHING_BEAT_MS * 3);

      // 步④：右栏高亮环从 Walk 下移到 Jump（start = BEAT*3）。
      const s3 = TEACHING_BEAT_MS * 3;
      if (ringRef.current) {
        tl.add(
          ringRef.current,
          {
            translateY: [RING_DY, RING_DY * 2],
            duration: TEACHING_BEAT_MS,
            ease: "inOut(2)",
          },
          s3,
        );
      }
      tl.label("to-jump", TEACHING_BEAT_MS * 4);
    },
  });

  // 右栏三个状态小格。
  const states = [
    { t: "Idle", d: "起始" },
    { t: "Walk", d: "Speed>0.1" },
    { t: "Jump", d: "Jump trigger" },
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
          aria-label="代码设参数到状态机迁移的因果链动画，分三栏。左栏是代码：两行 animator.SetFloat 设 Speed 为 2、animator.SetTrigger 设 Jump。中栏是参数面板：显示 Speed 的值和 Jump trigger 的状态。右栏是状态机：纵向三个状态格 Idle、Walk、Jump，一个高亮环表示当前激活态。动画分四步：先点亮左栏第一行 SetFloat，中栏 Speed 值更新为 2；状态机看到 Speed 满足条件，自己把当前态从 Idle 切到 Walk；再点亮左栏第二行 SetTrigger，中栏 Jump 标为已触发；状态机看到 Jump 被触发，把当前态切到 Jump。核心是代码只负责往参数面板写值，到底切到哪个状态、播哪个动画，由状态机根据过渡条件自己决定，二者解耦。可播放、暂停、单步、拖动进度。"
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
            代码设参数 → 参数面板变化 → 状态机据条件自己迁移
          </text>
          <text
            x={VIEW_W / 2}
            y={50}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            你只「设参数」，从不直接「切动画」——切换的决定权在状态机手里
          </text>

          {/* ===== 栏间因果箭头（先画，框盖线头）===== */}
          <line
            x1={L_X + L_W}
            y1={COL_Y + COL_H / 2}
            x2={M_X}
            y2={COL_Y + COL_H / 2}
            stroke="var(--text-secondary)"
            strokeWidth="1.8"
            markerEnd="url(#pa-arrow)"
          />
          <line
            x1={M_X + M_W}
            y1={COL_Y + COL_H / 2}
            x2={R_X}
            y2={COL_Y + COL_H / 2}
            stroke="var(--text-secondary)"
            strokeWidth="1.8"
            markerEnd="url(#pa-arrow)"
          />

          {/* ===== 左栏：代码 ===== */}
          <rect
            x={L_X}
            y={COL_Y}
            width={L_W}
            height={COL_H}
            rx="10"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          <text
            x={L_X + L_W / 2}
            y={COL_Y + 24}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            ① 你的代码（设参数）
          </text>
          <g ref={code1Ref} opacity="0.3">
            <text
              x={L_X + 16}
              y={CODE_Y0}
              textAnchor="start"
              fontSize="10.5"
              fontFamily="var(--font-mono)"
              fill="var(--accent)"
            >
              animator.SetFloat(
            </text>
            <text
              x={L_X + 16}
              y={CODE_Y0 + 16}
              textAnchor="start"
              fontSize="10.5"
              fontFamily="var(--font-mono)"
              fill="var(--accent)"
            >
              &nbsp;&nbsp;&quot;Speed&quot;, 2);
            </text>
          </g>
          <g ref={code2Ref} opacity="0.3">
            <text
              x={L_X + 16}
              y={CODE_Y0 + CODE_DY}
              textAnchor="start"
              fontSize="10.5"
              fontFamily="var(--font-mono)"
              fill="var(--accent)"
            >
              animator.SetTrigger(
            </text>
            <text
              x={L_X + 16}
              y={CODE_Y0 + CODE_DY + 16}
              textAnchor="start"
              fontSize="10.5"
              fontFamily="var(--font-mono)"
              fill="var(--accent)"
            >
              &nbsp;&nbsp;&quot;Jump&quot;);
            </text>
          </g>

          {/* ===== 中栏：参数面板 ===== */}
          <rect
            x={M_X}
            y={COL_Y}
            width={M_W}
            height={COL_H}
            rx="10"
            fill="var(--text-secondary)"
            fillOpacity="0.05"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          <text
            x={M_X + M_W / 2}
            y={COL_Y + 24}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            ② 参数面板
          </text>
          {/* Speed 参数行 */}
          <rect
            x={PARAM_X}
            y={PARAM_Y0}
            width={PARAM_W}
            height={PARAM_H}
            rx="7"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.2"
          />
          <text
            x={PARAM_X + PARAM_W / 2}
            y={PARAM_Y0 + 19}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            float Speed
          </text>
          <text
            ref={speedValRef}
            x={PARAM_X + PARAM_W / 2}
            y={PARAM_Y0 + 38}
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            fill="var(--accent)"
            opacity="0.3"
          >
            = 2
          </text>
          {/* Jump trigger 参数行 */}
          <rect
            x={PARAM_X}
            y={PARAM_Y0 + PARAM_DY}
            width={PARAM_W}
            height={PARAM_H}
            rx="7"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.2"
          />
          <text
            x={PARAM_X + PARAM_W / 2}
            y={PARAM_Y0 + PARAM_DY + 19}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            trigger Jump
          </text>
          <text
            ref={jumpValRef}
            x={PARAM_X + PARAM_W / 2}
            y={PARAM_Y0 + PARAM_DY + 38}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            fill="var(--accent)"
            opacity="0.3"
          >
            已触发 ⚡
          </text>

          {/* ===== 右栏：状态机 ===== */}
          <rect
            x={R_X}
            y={COL_Y}
            width={R_W}
            height={COL_H}
            rx="10"
            fill="var(--accent)"
            fillOpacity="0.04"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          <text
            x={R_X + R_W / 2}
            y={COL_Y + 24}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            ③ 状态机（自己决定切哪个）
          </text>
          {/* 当前激活态高亮环（套在状态格外，靠 translateY 迁移） */}
          <g ref={ringRef}>
            <rect
              x={RING_X}
              y={RING_Y0}
              width={RING_W}
              height={RING_H}
              rx="9"
              fill="var(--accent)"
              fillOpacity="0.1"
              stroke="var(--accent)"
              strokeWidth="2.4"
            />
          </g>
          {/* 三个状态小格 */}
          {states.map((st, i) => (
            <g key={st.t}>
              <rect
                x={ST_X}
                y={ST_Y0 + i * ST_DY}
                width={ST_W}
                height={ST_H}
                rx="7"
                fill="var(--bg)"
                stroke="var(--border)"
                strokeWidth="1.2"
              />
              <text
                x={ST_X + 14}
                y={ST_Y0 + i * ST_DY + 19}
                textAnchor="start"
                fontSize="12"
                fontWeight="700"
                fontFamily="var(--font-mono)"
                fill="var(--text-primary)"
              >
                {st.t}
              </text>
              <text
                x={ST_X + ST_W - 12}
                y={ST_Y0 + i * ST_DY + 19}
                textAnchor="end"
                fontSize="8.5"
                fontFamily="var(--font-mono)"
                fill="var(--text-secondary)"
              >
                {st.d}
              </text>
            </g>
          ))}

          <defs>
            <marker
              id="pa-arrow"
              markerWidth="9"
              markerHeight="9"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="猜一猜：你写 animator.SetFloat(「Speed」, 2) 后，是这行代码「切」到 Walk 动画的，还是状态机看到参数变了自己切的？单步走第②步看答案。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        代码只做一件事——往参数面板里**设值**（`SetFloat` /
        `SetTrigger`）。状态机盯着参数面板，谁的过渡条件满足了，就由它把当前态切过去、播对应动画。**逻辑（设参数）与动画（怎么切）就此解耦**：换动画、改过渡都不用动代码。
      </figcaption>
    </figure>
  );
}
