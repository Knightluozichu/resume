"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <RaycastDiagram>：辅图——「Physics.Raycast 射一条线、命中第一个碰撞体、读 RaycastHit」（HEL-285）。
 *
 * 一条横向射线从左侧 origin 沿 +X 方向射出（动画里逐步延展），沿途有两个物体：
 *  - 一个「被忽略层」物体（虚线·灰）在中段——勾了 layerMask 过滤，射线**穿过它不命中**。
 *  - 一个「目标层」物体在右段——射线**命中它**，停在命中点，爆出 RaycastHit 信息。
 *
 * 动画分 4 步：
 *  - 步①：射线从 origin 延展到「被忽略层」物体处（layerMask 让它穿过、不命中）。
 *  - 步②：射线继续延展、穿过被忽略层，点亮「layerMask 过滤·穿过此层」标。
 *  - 步③：射线触达目标层物体表面，停住——命中！命中点小圆点亮 + 法线箭头弹出。
 *  - 步④：RaycastHit 信息卡点亮（hit.point / hit.normal / hit.distance / hit.collider）。
 *
 * label 锚定「该步动作完成」的时刻（lit = BEAT*(i+1)）。
 *
 * 射线用 scaleX 从 origin 向右延展（transform-box:fill-box + transform-origin 设在左端），
 * 全部坐标整数常量（横向射线 → y 恒定，无 Math 浮点）。
 *
 * 视觉：全部 DESIGN token；无裸 hex；时长走 TEACHING_BEAT_MS（硬规则 5）。
 * 所有 <text> 距 viewBox 任意边 ≥14px。
 */

const VIEW_W = 736;
// VIEW_H=300：最低内容是信息卡底 276，下留 24px。纵向利用率 ~86%。
const VIEW_H = 300;

// 射线水平基线 y（恒定，整数）。
const RAY_Y = 132;
// origin 在左侧。
const ORIGIN_X = 56;
// 「被忽略层」物体（中段，虚线灰）。
const IGNORE_X = 300;
const IGNORE_W = 56;
const IGNORE_Y = RAY_Y - 36;
const IGNORE_H = 72;
// 「目标层」物体（右段，实心 accent），射线命中其左缘。
const TARGET_X = 540;
const TARGET_W = 64;
const TARGET_Y = RAY_Y - 44;
const TARGET_H = 88;
const HIT_X = TARGET_X; // 命中点 = 目标左缘
// 射线三段的右端 x（步①到忽略物左缘、步②穿出忽略物右缘、步③到命中点）。
const RAY_END_1 = IGNORE_X;
const RAY_END_2 = IGNORE_X + IGNORE_W;
const RAY_END_3 = HIT_X;

// 射线初始长度（origin 处一小段，便于 scaleX 延展；用整数）。
const RAY_BASE_LEN = RAY_END_3 - ORIGIN_X; // 满长度（命中处），动画用 scaleX 缩放它

// 信息卡（步④）：右下角。
const CARD_X = 460;
const CARD_Y = 196;
const CARD_W = 252;
const CARD_H = 80;

const STEPS: readonly TeachingStep[] = [
  {
    label: "shoot",
    caption:
      "① 从 origin 沿 direction 射一条看不见的线（Physics.Raycast）——像导演拿激光笔往前一指",
  },
  {
    label: "filter",
    caption:
      "② 中段那个物体属于「被忽略层」：layerMask 过滤掉它，射线直接穿过、不算命中",
  },
  {
    label: "hit",
    caption:
      "③ 射线触达「目标层」物体表面 → 命中！停在命中点，弹出命中点（hit.point）与法线（hit.normal）",
  },
  {
    label: "info",
    caption:
      "④ 命中信息写进 RaycastHit：point（命中点）/ normal（命中面法线）/ distance（距离）/ collider（命中谁）",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function RaycastDiagram() {
  const rayRef = useRef<SVGLineElement | null>(null);
  const filterMarkRef = useRef<SVGGElement | null>(null);
  const hitDotRef = useRef<SVGGElement | null>(null);
  const normalRef = useRef<SVGGElement | null>(null);
  const cardRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // 射线用 scaleX 从左端(origin)延展：transform-origin 设在 origin 处。
      // 三段长度比例（相对满长 RAY_BASE_LEN），用整数端点算出比例（运行时 number，非坐标）。
      const f1 = (RAY_END_1 - ORIGIN_X) / RAY_BASE_LEN;
      const f2 = (RAY_END_2 - ORIGIN_X) / RAY_BASE_LEN;

      // 步①：射线延展到忽略物左缘（start = BEAT*0）。
      const s0 = TEACHING_BEAT_MS * 0;
      if (rayRef.current) {
        tl.add(
          rayRef.current,
          { scaleX: [0, f1], duration: TEACHING_BEAT_MS, ease: "out(2)" },
          s0,
        );
      }
      tl.label("shoot", TEACHING_BEAT_MS * 1);

      // 步②：射线穿过忽略物（延展到其右缘）+ layerMask 过滤标点亮（start = BEAT*1）。
      const s1 = TEACHING_BEAT_MS * 1;
      if (rayRef.current) {
        tl.add(
          rayRef.current,
          { scaleX: [f1, f2], duration: TEACHING_BEAT_MS, ease: "linear" },
          s1,
        );
      }
      if (filterMarkRef.current) {
        tl.add(
          filterMarkRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s1,
        );
      }
      tl.label("filter", TEACHING_BEAT_MS * 2);

      // 步③：射线触达目标层表面（满长）+ 命中点 + 法线箭头（start = BEAT*2）。
      const s2 = TEACHING_BEAT_MS * 2;
      if (rayRef.current) {
        tl.add(
          rayRef.current,
          { scaleX: [f2, 1], duration: TEACHING_BEAT_MS, ease: "out(2)" },
          s2,
        );
      }
      if (hitDotRef.current) {
        tl.add(
          hitDotRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s2,
        );
      }
      if (normalRef.current) {
        tl.add(
          normalRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s2,
        );
      }
      tl.label("hit", TEACHING_BEAT_MS * 3);

      // 步④：RaycastHit 信息卡点亮（start = BEAT*3）。
      const s3 = TEACHING_BEAT_MS * 3;
      if (cardRef.current) {
        tl.add(
          cardRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s3,
        );
      }
      tl.label("info", TEACHING_BEAT_MS * 4);
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
          aria-label="Physics.Raycast 射线检测的动画。从左侧一个原点 origin 沿水平方向射出一条看不见的射线，动画里射线逐步向右延展。沿途有两个物体：中段一个虚线灰色的物体属于被忽略层，layerMask 过滤掉它，射线直接穿过、不算命中；右段一个实心的目标层物体，射线触达它的表面就命中、停在命中点。命中后弹出命中点 hit.point 一个小圆，和命中面的法线 hit.normal 一支向左的箭头。最后弹出 RaycastHit 信息卡，列出 point 命中点、normal 命中面法线、distance 距离、collider 命中谁。核心是射线从一点沿一个方向射出、命中第一个碰撞体返回信息，layerMask 能让它跳过不该检测的层。动画分四步，可播放、暂停、单步、拖动进度。"
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
            Physics.Raycast：射一条线，命中第一个碰撞体
          </text>
          <text
            x={VIEW_W / 2}
            y={50}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            从 origin 沿 direction 射出，命中即返回；layerMask
            可让射线跳过「不该检测的层」
          </text>

          {/* ===== origin 点 + 标签 ===== */}
          <circle
            cx={ORIGIN_X}
            cy={RAY_Y}
            r="6"
            fill="var(--accent)"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x={ORIGIN_X}
            y={RAY_Y - 16}
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            fill="var(--accent)"
          >
            origin
          </text>
          <text
            x={ORIGIN_X}
            y={RAY_Y + 28}
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            direction →
          </text>

          {/* ===== 被忽略层物体（虚线灰，射线穿过） ===== */}
          <rect
            x={IGNORE_X}
            y={IGNORE_Y}
            width={IGNORE_W}
            height={IGNORE_H}
            rx="5"
            fill="var(--text-secondary)"
            fillOpacity="0.08"
            stroke="var(--text-secondary)"
            strokeWidth="1.6"
            strokeDasharray="5 5"
          />
          <text
            x={IGNORE_X + IGNORE_W / 2}
            y={IGNORE_Y - 10}
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            被忽略层
          </text>

          {/* ===== 目标层物体（实心 accent，被命中） ===== */}
          <rect
            x={TARGET_X}
            y={TARGET_Y}
            width={TARGET_W}
            height={TARGET_H}
            rx="6"
            fill="var(--accent)"
            fillOpacity="0.2"
            stroke="var(--accent)"
            strokeWidth="2.2"
          />
          <text
            x={TARGET_X + TARGET_W / 2}
            y={TARGET_Y - 10}
            textAnchor="middle"
            fontSize="9"
            fontWeight="700"
            fill="var(--accent)"
          >
            目标层（命中）
          </text>

          {/* ===== 射线（scaleX 从 origin 延展；初始长度=满长，靠 scale 缩） ===== */}
          <line
            ref={rayRef}
            x1={ORIGIN_X}
            y1={RAY_Y}
            x2={ORIGIN_X + RAY_BASE_LEN}
            y2={RAY_Y}
            stroke="var(--accent)"
            strokeWidth="2.4"
            strokeDasharray="7 4"
            markerEnd="url(#ray-arrow)"
            style={{
              transformBox: "fill-box",
              transformOrigin: "left center",
            }}
          />

          {/* ===== layerMask 过滤标（步②点亮） ===== */}
          <g ref={filterMarkRef} opacity="0">
            <text
              x={IGNORE_X + IGNORE_W / 2}
              y={IGNORE_Y + IGNORE_H + 18}
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              fill="var(--text-secondary)"
            >
              layerMask 过滤
            </text>
            <text
              x={IGNORE_X + IGNORE_W / 2}
              y={IGNORE_Y + IGNORE_H + 32}
              textAnchor="middle"
              fontSize="9"
              fill="var(--text-secondary)"
            >
              射线穿过此层·不命中
            </text>
          </g>

          {/* ===== 命中点（步③点亮） ===== */}
          <g ref={hitDotRef} opacity="0">
            <circle
              cx={HIT_X}
              cy={RAY_Y}
              r="5"
              fill="var(--warning)"
              stroke="var(--warning)"
              strokeWidth="2"
            />
            <text
              x={HIT_X}
              y={TARGET_Y + TARGET_H + 18}
              textAnchor="middle"
              fontSize="9.5"
              fontWeight="700"
              fontFamily="var(--font-mono)"
              fill="var(--warning)"
            >
              hit.point
            </text>
          </g>

          {/* ===== 法线箭头（步③点亮）：从命中点沿 -X 指向射线来向（命中面法线） ===== */}
          <g ref={normalRef} opacity="0">
            <line
              x1={HIT_X}
              y1={RAY_Y}
              x2={HIT_X - 40}
              y2={RAY_Y}
              stroke="var(--success)"
              strokeWidth="2.4"
              markerEnd="url(#normal-arrow)"
            />
            <text
              x={HIT_X - 20}
              y={RAY_Y - 12}
              textAnchor="middle"
              fontSize="9.5"
              fontWeight="700"
              fontFamily="var(--font-mono)"
              fill="var(--success)"
            >
              hit.normal
            </text>
          </g>

          {/* ===== RaycastHit 信息卡（步④点亮） ===== */}
          <g ref={cardRef} opacity="0">
            <rect
              x={CARD_X}
              y={CARD_Y}
              width={CARD_W}
              height={CARD_H}
              rx="8"
              fill="var(--bg)"
              stroke="var(--accent)"
              strokeWidth="1.4"
            />
            <text
              x={CARD_X + 14}
              y={CARD_Y + 20}
              textAnchor="start"
              fontSize="11"
              fontWeight="700"
              fontFamily="var(--font-mono)"
              fill="var(--accent)"
            >
              RaycastHit hit
            </text>
            <text
              x={CARD_X + 14}
              y={CARD_Y + 38}
              textAnchor="start"
              fontSize="9.5"
              fill="var(--text-secondary)"
            >
              hit.point · hit.normal
            </text>
            <text
              x={CARD_X + 14}
              y={CARD_Y + 54}
              textAnchor="start"
              fontSize="9.5"
              fill="var(--text-secondary)"
            >
              hit.distance · hit.collider
            </text>
            <text
              x={CARD_X + 14}
              y={CARD_Y + 70}
              textAnchor="start"
              fontSize="9"
              fill="var(--text-secondary)"
            >
              命中点 / 法线 / 距离 / 命中谁
            </text>
          </g>

          <defs>
            <marker
              id="ray-arrow"
              markerWidth="9"
              markerHeight="9"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
            <marker
              id="normal-arrow"
              markerWidth="9"
              markerHeight="9"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--success)" />
            </marker>
          </defs>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="猜一猜：射线先遇到「被忽略层」的物体，会命中它停下、还是穿过去继续往前？单步走第②步看答案。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        `Physics.Raycast(origin, dir, out hit, maxDistance, layerMask)`
        从一点沿一个方向射一条线，命中第一个碰撞体返回 true，命中信息写进
        `RaycastHit`（point / normal / distance / collider）。layerMask
        让射线只检测某些层、跳过其余。
      </figcaption>
    </figure>
  );
}
