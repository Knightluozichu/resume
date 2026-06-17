"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <BodyTypesDiagram>：静态 / 动态 / 运动学三态，同样来一个力时各自怎样（HEL-284）。
 *
 * Rigidbody × Collider 组合出三种「身体类型」，本图三栏并排，每栏来一个相同的冲击，演各自反应：
 *  ① 静态体（只有 Collider，无 Rigidbody）：撞上来也**纹丝不动**，但**挡得住**别人（如墙、地面）。
 *  ② 动态体（有 Rigidbody，非 isKinematic）：受力 / 被撞会**动、会被撞飞**（如可推的箱子）。
 *  ③ 运动学体（Rigidbody + isKinematic）：**不受力、撞它它不动**，但它移动时能**把动态体顶开**（如移动平台、电梯）。
 *
 * 动画分 3 步逐栏演：
 *  - 步①：左栏一个「冲击球」飞向静态墙，撞上后停住（墙不动）+ 「不动·能挡」标。
 *  - 步②：中栏冲击球撞向动态箱，箱被撞飞（平移）+ 「被撞飞」标。
 *  - 步③：右栏运动学平台主动右移，把旁边一个动态箱顶着一起右移 + 「不受力，但能顶开别人」标。
 *
 * label 锚定「该步动作完成」的时刻（lit = BEAT*(i+1)）。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互；anime.js 经 useTeachingTimeline
 * 动态 import 切独立 chunk（硬规则 2/6），本组件经 mdx-components 注册时不进首屏关键路径。
 *
 * 视觉：全部 DESIGN token；无裸 hex；时长走 TEACHING_BEAT_MS 具名常量（硬规则 5）。
 * 所有坐标为整数常量（无 Math 浮点算坐标）。所有 <text> 距 viewBox 任意边 ≥14px；三栏互不重叠。
 */

// VIEW_W=736 使三栏 + 两 gap + 两侧各 24px 边距正好填满（24+3*220+2*14+24=736），
// 最右栏右缘 712、距右边界 24px ≥14px 安全边距（svg-check 不报贴边）。
const VIEW_W = 736;
// VIEW_H=328：最低内容是栏框底 304（COL_Y+COL_H），下留 24px。纵向利用率 ~88%（60-95% 内）。
const VIEW_H = 328;

const COL_W = 220;
const COL_GAP = 14;
const COL_X0 = 24;
const COL_Y = 78;
const COL_H = 226;
const colX = (i: number) => COL_X0 + i * (COL_W + COL_GAP);
const colCX = (i: number) => colX(i) + COL_W / 2;

// 物体所在的水平基线。
const BASE_Y = COL_Y + 120;
const BOX = 40;
const BALL_R = 14;

const STEPS: readonly TeachingStep[] = [
  {
    label: "static",
    caption:
      "① 静态体（只有 Collider，无 Rigidbody）：撞上来也纹丝不动，但挡得住别人——墙、地面就是它",
  },
  {
    label: "dynamic",
    caption:
      "② 动态体（有 Rigidbody）：受力 / 被撞会动、会被撞飞——可推的箱子、能滚的球就是它",
  },
  {
    label: "kinematic",
    caption:
      "③ 运动学体（Rigidbody + isKinematic）：不受力、撞它不动，但它移动时能把动态体顶开——移动平台、电梯就是它",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function BodyTypesDiagram() {
  // 左栏：冲击球飞向静态墙后停住 + 标。
  const staticBallRef = useRef<SVGCircleElement | null>(null);
  const staticMarkRef = useRef<SVGGElement | null>(null);
  // 中栏：冲击球 + 被撞飞的动态箱 + 标。
  const dynBallRef = useRef<SVGCircleElement | null>(null);
  const dynBoxRef = useRef<SVGRectElement | null>(null);
  const dynMarkRef = useRef<SVGGElement | null>(null);
  // 右栏：运动学平台主动右移，把动态箱顶着一起移 + 标。
  const kinPlatformRef = useRef<SVGRectElement | null>(null);
  const kinBoxRef = useRef<SVGRectElement | null>(null);
  const kinMarkRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // 步①：左栏冲击球从左飞到墙边停住（撞上但墙不动）+ 标（start = BEAT*0）。
      const s0 = TEACHING_BEAT_MS * 0;
      if (staticBallRef.current) {
        tl.add(
          staticBallRef.current,
          { translateX: [0, 76], duration: TEACHING_BEAT_MS, ease: "out(2)" },
          s0,
        );
      }
      if (staticMarkRef.current) {
        tl.add(
          staticMarkRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s0,
        );
      }
      tl.label("static", TEACHING_BEAT_MS * 1);

      // 步②：中栏冲击球飞向动态箱，箱被撞飞（球前进、箱平移）+ 标（start = BEAT*1）。
      const s1 = TEACHING_BEAT_MS * 1;
      if (dynBallRef.current) {
        tl.add(
          dynBallRef.current,
          { translateX: [0, 56], duration: TEACHING_BEAT_MS, ease: "out(2)" },
          s1,
        );
      }
      if (dynBoxRef.current) {
        tl.add(
          dynBoxRef.current,
          { translateX: [0, 48], duration: TEACHING_BEAT_MS, ease: "out(2)" },
          s1,
        );
      }
      if (dynMarkRef.current) {
        tl.add(
          dynMarkRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s1,
        );
      }
      tl.label("dynamic", TEACHING_BEAT_MS * 2);

      // 步③：右栏运动学平台主动右移，旁边动态箱被顶着一起右移 + 标（start = BEAT*2）。
      const s2 = TEACHING_BEAT_MS * 2;
      if (kinPlatformRef.current) {
        tl.add(
          kinPlatformRef.current,
          { translateX: [0, 60], duration: TEACHING_BEAT_MS, ease: "inOut(2)" },
          s2,
        );
      }
      if (kinBoxRef.current) {
        tl.add(
          kinBoxRef.current,
          { translateX: [0, 60], duration: TEACHING_BEAT_MS, ease: "inOut(2)" },
          s2,
        );
      }
      if (kinMarkRef.current) {
        tl.add(
          kinMarkRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s2,
        );
      }
      tl.label("kinematic", TEACHING_BEAT_MS * 3);
    },
  });

  const heads = [
    { t: "① 静态体", s: "Collider，无 Rigidbody" },
    { t: "② 动态体", s: "Rigidbody（受力受撞）" },
    { t: "③ 运动学体", s: "Rigidbody + isKinematic" },
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
          aria-label="静态、动态、运动学三种身体类型面对同一个力时各自反应的对照动画。三栏并排。第一栏静态体只有 Collider 没有 Rigidbody，一个冲击球飞过来撞上它，球停住、墙纹丝不动，因为静态体撞上来也不动，但挡得住别人，墙和地面就是它。第二栏动态体有 Rigidbody，冲击球撞向一个箱子，箱子被撞飞、向右平移，因为动态体受力或被撞会动、会被撞飞，可推的箱子能滚的球就是它。第三栏运动学体是 Rigidbody 加 isKinematic，平台主动向右移动，把旁边一个动态箱子顶着一起向右移，因为运动学体不受力、撞它它不动，但它自己移动时能把动态体顶开，移动平台和电梯就是它。动画分三步逐栏演示。动画可播放、暂停、单步、拖动进度。"
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
            三态对照：同样来一个力 / 一次碰撞，各自怎样
          </text>
          <text
            x={VIEW_W / 2}
            y={50}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            Rigidbody × Collider
            组合出三种身体：静态挡得住、动态被撞飞、运动学只听脚本
          </text>

          {/* ===== 三栏框 + 标题 ===== */}
          {heads.map((h, i) => (
            <g key={h.t}>
              <rect
                x={colX(i)}
                y={COL_Y}
                width={COL_W}
                height={COL_H}
                rx="10"
                fill="var(--text-secondary)"
                fillOpacity="0.05"
                stroke="var(--border)"
                strokeWidth="1.4"
              />
              <text
                x={colCX(i)}
                y={COL_Y + 22}
                textAnchor="middle"
                fontSize="12.5"
                fontWeight="700"
                fill="var(--text-primary)"
              >
                {h.t}
              </text>
              <text
                x={colCX(i)}
                y={COL_Y + 38}
                textAnchor="middle"
                fontSize="9.5"
                fontFamily="var(--font-mono)"
                fill="var(--text-secondary)"
              >
                {h.s}
              </text>
            </g>
          ))}

          {/* ========== 第①栏：静态墙 + 撞上停住的球 ========== */}
          {/* 静态墙（不动） */}
          <rect
            x={colX(0) + COL_W - 56}
            y={BASE_Y - 36}
            width={28}
            height={84}
            rx="4"
            fill="var(--text-secondary)"
            fillOpacity="0.22"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />
          <text
            x={colX(0) + COL_W - 42}
            y={BASE_Y + 64}
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            墙（不动）
          </text>
          {/* 冲击球（步①向右飞到墙边停住） */}
          <circle
            ref={staticBallRef}
            cx={colX(0) + 40}
            cy={BASE_Y + 6}
            r={BALL_R}
            fill="var(--accent)"
            fillOpacity="0.5"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          {/* 标（步①） */}
          <g ref={staticMarkRef} opacity="0">
            <text
              x={colCX(0)}
              y={COL_Y + 62}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="var(--text-secondary)"
            >
              ✋ 不动 · 能挡住
            </text>
          </g>

          {/* ========== 第②栏：冲击球撞动态箱，箱被撞飞 ========== */}
          {/* 动态箱（步②被撞飞右移） */}
          <rect
            ref={dynBoxRef}
            x={colX(1) + COL_W - 112}
            y={BASE_Y - 14}
            width={BOX}
            height={BOX}
            rx="5"
            fill="var(--accent)"
            fillOpacity="0.22"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          {/* 冲击球（步②向右飞撞箱） */}
          <circle
            ref={dynBallRef}
            cx={colX(1) + 36}
            cy={BASE_Y + 6}
            r={BALL_R}
            fill="var(--accent)"
            fillOpacity="0.5"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          {/* 标（步②） */}
          <g ref={dynMarkRef} opacity="0">
            <text
              x={colCX(1)}
              y={COL_Y + 62}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="var(--accent)"
            >
              被撞飞 →
            </text>
          </g>

          {/* ========== 第③栏：运动学平台主动右移，顶着动态箱一起走 ========== */}
          {/* 运动学平台（步③主动右移） */}
          <rect
            ref={kinPlatformRef}
            x={colX(2) + 20}
            y={BASE_Y - 18}
            width={30}
            height={48}
            rx="5"
            fill="var(--warning)"
            fillOpacity="0.28"
            stroke="var(--warning)"
            strokeWidth="2"
          />
          {/* 被顶的动态箱（步③一起右移） */}
          <rect
            ref={kinBoxRef}
            x={colX(2) + 56}
            y={BASE_Y - 14}
            width={BOX}
            height={BOX}
            rx="5"
            fill="var(--accent)"
            fillOpacity="0.22"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          {/* 标（步③） */}
          <g ref={kinMarkRef} opacity="0">
            <text
              x={colCX(2)}
              y={COL_Y + 62}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="var(--warning)"
            >
              不受力，但能顶开别人 →
            </text>
            <text
              x={colCX(2)}
              y={BASE_Y + 64}
              textAnchor="middle"
              fontSize="9"
              fill="var(--text-secondary)"
            >
              平台（黄）主动移 · 动态箱（紫）被顶着走
            </text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="猜一猜：给「运动学体（isKinematic）」来一个力，它会被推动吗？单步走第③步看答案。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        静态体（无
        Rigidbody）挡得住但自己不动；动态体（Rigidbody）受力受撞会动；运动学体（Rigidbody
        + isKinematic）不受力、只听脚本 /
        动画，但移动时能把动态体顶开。挑哪种取决于「这个对象该不该被物理推动」。
      </figcaption>
    </figure>
  );
}
