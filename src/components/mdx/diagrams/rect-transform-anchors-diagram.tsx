"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <RectTransformAnchorsDiagram>：本章主图——「父矩形缩放时，子 UI 元素按不同 anchor 行为」（HEL-287）。
 *
 * 左右两个并列场景，演同一件事的两种锚点设定，在「父矩形（Canvas）变大」时各自怎么响应：
 *  左·单点锚（锚钉在右上角）：父变大 → 子元素「贴着右上角」平移，自身大小不变（按钮类）。
 *  右·拉伸锚（左右锚分开 stretch）：父变宽 → 子元素「跟着变宽」（横条 / 进度条 / 标题栏类）。
 *
 * 动画分 3 步（lit = BEAT*(i+1)）：
 *  - 步①：两边父矩形都在「初始小尺寸」，子元素在初始位置/大小（基准对照）。
 *  - 步②：两边父矩形「变大」（右边缘外扩 GROW）——左场景子元素 translateX 跟着右上角走、
 *          右场景子元素 scaleX 向右伸展（width 跟着父变宽）。
 *  - 步③：复位回初始，强调「同一次缩放、两种锚点两种结果」。
 *
 * 父矩形「变大」用一条外扩的虚线框（GROW 量）表示，避免对父 rect 做 scale 拉伸描边/文字；
 * 子元素：单点锚用 translateX 平移、拉伸锚用 scaleX（transformBox fill-box, origin left）伸展。
 * 所有坐标整数常量（无 Math 浮点算坐标，杜绝 SSR/浏览器末位差导致的 hydration mismatch）。
 *
 * 视觉：全部 DESIGN token；无裸 hex；时长走 TEACHING_BEAT_MS 具名常量（硬规则 5）。
 * 所有 <text> 距 viewBox 任意边 ≥14px；左右两场景互不重叠；外扩框不出 viewBox。
 */

const VIEW_W = 736;
// VIEW_H=408：底部说明文字基线 386、bbox 底 ~389，距底边 ~19px（≥14）。纵向利用率 ~84%。
const VIEW_H = 408;

// ── 左场景：单点锚（父框初始） ──
const LP_X = 40; // 左父框 x
const LP_Y = 92; // 左父框 y
const LP_W = 240; // 左父框初始宽
const LP_H = 200; // 左父框高
const GROW = 56; // 父框「变大」时右边缘外扩量（整数）
// 左场景子元素（一个小按钮），初始钉在父框右上角内侧。
const LBTN_W = 72;
const LBTN_H = 36;
const LBTN_X = LP_X + LP_W - LBTN_W - 14; // 右上角内侧：194
const LBTN_Y = LP_Y + 14; // 106

// ── 右场景：拉伸锚（父框初始） ──
const RP_X = 416; // 右父框 x
const RP_Y = 92;
const RP_W = 240; // 右父框初始宽
const RP_H = 200;
// 右场景子元素（一根横条 / 标题栏），左右各留 14 边距，初始铺满父框上部。
const RBAR_X = RP_X + 14; // 430
const RBAR_Y = RP_Y + 14; // 106
const RBAR_W = RP_W - 28; // 212（初始宽）
const RBAR_H = 36;
// 拉伸后目标宽 = 初始宽 + GROW（父变宽多少，它跟着多宽）。scaleX 比例 = 目标/初始。
const RBAR_W2 = RBAR_W + GROW; // 268
const RBAR_SCALE2 = RBAR_W2 / RBAR_W; // ≈1.264（仅用于 scaleX tween，非坐标，不入 SVG 坐标）

const STEPS: readonly TeachingStep[] = [
  {
    label: "init",
    caption: "① 初始：两边父框（Canvas）一样大，子元素也摆在一样的位置",
  },
  {
    label: "grow",
    caption:
      "② 父框变宽（右边缘外扩）——左边「单点锚」按钮贴着右上角平移、大小不变；右边「拉伸锚」横条跟着变宽",
  },
  {
    label: "reset",
    caption:
      "③ 复位：同一次缩放，两种锚点设定给出两种结果——这就是 anchors 的意义",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function RectTransformAnchorsDiagram() {
  // 左场景：外扩框、按钮（单点锚 → 平移）。
  const leftGrowRef = useRef<SVGRectElement | null>(null);
  const leftBtnRef = useRef<SVGGElement | null>(null);
  // 右场景：外扩框、横条（拉伸锚 → scaleX 伸展）。
  const rightGrowRef = useRef<SVGRectElement | null>(null);
  const rightBarRef = useRef<SVGRectElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // 步①：初始态——外扩框宽度为 0（不可见），子元素在初始位（start = BEAT*0）。
      const s0 = TEACHING_BEAT_MS * 0;
      if (leftGrowRef.current) {
        tl.add(
          leftGrowRef.current,
          { opacity: [0, 0], duration: TEACHING_BEAT_MS, ease: "out(2)" },
          s0,
        );
      }
      if (rightGrowRef.current) {
        tl.add(
          rightGrowRef.current,
          { opacity: [0, 0], duration: TEACHING_BEAT_MS, ease: "out(2)" },
          s0,
        );
      }
      tl.label("init", TEACHING_BEAT_MS * 1);

      // 步②：父框变宽（外扩框淡入）+ 左按钮平移 GROW + 右横条 scaleX 伸展（start = BEAT*1）。
      const s1 = TEACHING_BEAT_MS * 1;
      if (leftGrowRef.current) {
        tl.add(
          leftGrowRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(2)" },
          s1,
        );
      }
      if (rightGrowRef.current) {
        tl.add(
          rightGrowRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(2)" },
          s1,
        );
      }
      if (leftBtnRef.current) {
        tl.add(
          leftBtnRef.current,
          {
            translateX: [0, GROW],
            duration: TEACHING_BEAT_MS,
            ease: "inOut(2)",
          },
          s1,
        );
      }
      if (rightBarRef.current) {
        tl.add(
          rightBarRef.current,
          {
            scaleX: [1, RBAR_SCALE2],
            duration: TEACHING_BEAT_MS,
            ease: "inOut(2)",
          },
          s1,
        );
      }
      tl.label("grow", TEACHING_BEAT_MS * 2);

      // 步③：复位回初始（外扩框淡出、子元素回位）（start = BEAT*2）。
      const s2 = TEACHING_BEAT_MS * 2;
      if (leftGrowRef.current) {
        tl.add(
          leftGrowRef.current,
          { opacity: [1, 0], duration: TEACHING_BEAT_MS, ease: "out(2)" },
          s2,
        );
      }
      if (rightGrowRef.current) {
        tl.add(
          rightGrowRef.current,
          { opacity: [1, 0], duration: TEACHING_BEAT_MS, ease: "out(2)" },
          s2,
        );
      }
      if (leftBtnRef.current) {
        tl.add(
          leftBtnRef.current,
          {
            translateX: [GROW, 0],
            duration: TEACHING_BEAT_MS,
            ease: "inOut(2)",
          },
          s2,
        );
      }
      if (rightBarRef.current) {
        tl.add(
          rightBarRef.current,
          {
            scaleX: [RBAR_SCALE2, 1],
            duration: TEACHING_BEAT_MS,
            ease: "inOut(2)",
          },
          s2,
        );
      }
      tl.label("reset", TEACHING_BEAT_MS * 3);
    },
  });

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
          aria-label="RectTransform 锚点行为的对照动画，分左右两个场景。两边各有一个父矩形代表 Canvas。左场景是单点锚：子元素是一个小按钮，锚钉在父框的右上角。右场景是拉伸锚：子元素是一根横条，左右锚分开。动画分三步：第一步两边父框一样大、子元素摆在一样位置；第二步两边父框都变宽，右边缘向外扩展，这时左场景的按钮贴着右上角平移、自身大小不变，右场景的横条跟着父框一起变宽；第三步复位回初始。核心是同一次缩放下，单点锚让元素保持大小只跟着锚点移动，拉伸锚让元素随父级一起伸缩，这就是用锚点做自适应布局的关键。可播放、暂停、单步、拖动进度。"
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
            RectTransform 锚点：父框变大时，子元素按 anchor 各自响应
          </text>
          <text
            x={VIEW_W / 2}
            y={50}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            锚点决定「相对父级的哪个参照点定位 /
            如何随父级缩放」——自适应布局的关键
          </text>

          {/* ============ 左场景：单点锚（锚在右上角） ============ */}
          {/* 父框变大后的外扩区（虚线，淡入表示「父变宽了这么多」） */}
          <rect
            ref={leftGrowRef}
            x={LP_X + LP_W}
            y={LP_Y}
            width={GROW}
            height={LP_H}
            fill="var(--accent)"
            fillOpacity="0.07"
            stroke="var(--accent)"
            strokeWidth="1.4"
            strokeDasharray="5 4"
            opacity="0"
          />
          {/* 父框本体 */}
          <rect
            x={LP_X}
            y={LP_Y}
            width={LP_W}
            height={LP_H}
            rx="10"
            fill="var(--bg)"
            stroke="var(--text-secondary)"
            strokeWidth="1.8"
          />
          <text
            x={LP_X + 10}
            y={LP_Y - 10}
            textAnchor="start"
            fontSize="11"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            单点锚（锚钉右上角）
          </text>
          {/* 右上角锚点标记（◤ 钉子，固定不动） */}
          <circle
            cx={LP_X + LP_W}
            cy={LP_Y}
            r="6"
            fill="var(--accent)"
            stroke="var(--bg)"
            strokeWidth="1.6"
          />
          <text
            x={LP_X + LP_W - 6}
            y={LP_Y + 38}
            textAnchor="end"
            fontSize="8.5"
            fontFamily="var(--font-mono)"
            fill="var(--accent)"
          >
            anchor
          </text>
          {/* 子元素：按钮（单点锚 → 整体 translateX 平移） */}
          <g ref={leftBtnRef}>
            <rect
              x={LBTN_X}
              y={LBTN_Y}
              width={LBTN_W}
              height={LBTN_H}
              rx="7"
              fill="var(--accent)"
              fillOpacity="0.16"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <text
              x={LBTN_X + LBTN_W / 2}
              y={LBTN_Y + LBTN_H / 2 + 4}
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              fill="var(--accent)"
            >
              按钮
            </text>
          </g>
          <text
            x={LP_X + LP_W / 2}
            y={LP_Y + LP_H - 16}
            textAnchor="middle"
            fontSize="9.5"
            fill="var(--text-secondary)"
          >
            贴右上角平移
          </text>
          <text
            x={LP_X + LP_W / 2}
            y={LP_Y + LP_H - 2}
            textAnchor="middle"
            fontSize="9.5"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            大小不变
          </text>

          {/* ============ 右场景：拉伸锚（左右锚分开 stretch） ============ */}
          {/* 父框变大后的外扩区 */}
          <rect
            ref={rightGrowRef}
            x={RP_X + RP_W}
            y={RP_Y}
            width={GROW}
            height={RP_H}
            fill="var(--success)"
            fillOpacity="0.07"
            stroke="var(--success)"
            strokeWidth="1.4"
            strokeDasharray="5 4"
            opacity="0"
          />
          {/* 父框本体 */}
          <rect
            x={RP_X}
            y={RP_Y}
            width={RP_W}
            height={RP_H}
            rx="10"
            fill="var(--bg)"
            stroke="var(--text-secondary)"
            strokeWidth="1.8"
          />
          <text
            x={RP_X + 10}
            y={RP_Y - 10}
            textAnchor="start"
            fontSize="11"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            拉伸锚（左右锚分开 stretch）
          </text>
          {/* 左右两个锚点标记（分开钉在左右边） */}
          <circle
            cx={RP_X}
            cy={RP_Y}
            r="6"
            fill="var(--success)"
            stroke="var(--bg)"
            strokeWidth="1.6"
          />
          <circle
            cx={RP_X + RP_W}
            cy={RP_Y}
            r="6"
            fill="var(--success)"
            stroke="var(--bg)"
            strokeWidth="1.6"
          />
          {/* 子元素：横条（拉伸锚 → scaleX 伸展，origin 在左） */}
          <rect
            ref={rightBarRef}
            x={RBAR_X}
            y={RBAR_Y}
            width={RBAR_W}
            height={RBAR_H}
            rx="7"
            fill="var(--success)"
            fillOpacity="0.16"
            stroke="var(--success)"
            strokeWidth="2"
            style={{
              transformBox: "fill-box",
              transformOrigin: "left center",
            }}
          />
          <text
            x={RBAR_X + 12}
            y={RBAR_Y + RBAR_H / 2 + 4}
            textAnchor="start"
            fontSize="10"
            fontWeight="700"
            fill="var(--success)"
          >
            标题栏 / 横条
          </text>
          <text
            x={RP_X + RP_W / 2}
            y={RP_Y + RP_H - 16}
            textAnchor="middle"
            fontSize="9.5"
            fill="var(--text-secondary)"
          >
            跟着父框一起变宽
          </text>
          <text
            x={RP_X + RP_W / 2}
            y={RP_Y + RP_H - 2}
            textAnchor="middle"
            fontSize="9.5"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            左右边距保持
          </text>

          {/* ===== 底部一句话点题 ===== */}
          <text
            x={VIEW_W / 2}
            y={VIEW_H - 22}
            textAnchor="middle"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            换分辨率 / 父级缩放时，UI 不跑位、不拉伸错乱，全靠 anchors
            设对——这就是它存在的理由
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="猜一猜：父框变宽后，左边「单点锚」的按钮会变宽吗？右边「拉伸锚」的横条又会怎样？单步走第②步看答案。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        `RectTransform` 的核心是 **anchors（锚点）+
        pivot（轴心）**：锚点决定元素「相对父级的哪个参照点定位、如何随父级缩放」。**单点锚**把元素钉在某个角（大小不变、跟着角走，适合按钮）；**拉伸锚**把左右（或上下）锚分开，元素随父级一起伸缩（适合标题栏、进度条）。设对锚点，换分辨率才不跑位。
      </figcaption>
    </figure>
  );
}
