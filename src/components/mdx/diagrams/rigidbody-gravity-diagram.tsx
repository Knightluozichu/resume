"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <RigidbodyGravityDiagram>：本章主图——「加不加 Rigidbody，物体的命运差天别地」（HEL-284）。
 *
 * 三栏并排，演同一个方块在三种身份下的表现，把「Rigidbody 让物体交给物理引擎管」掰碎：
 *  ① 无 Rigidbody：方块只是一个普通 GameObject，**悬在半空一动不动**——引擎不替它算重力。
 *  ② 加了 Rigidbody：方块被「交给物理引擎」，在重力下**自动往下落**（动画里方块下移到地面）。
 *  ③ AddForce：给方块施一个力，它被**推飞**（动画里方块向斜上方位移）。
 *
 * 每栏一个方块 + 一条地面线；动画分 3 步，逐栏点亮并让方块按各自的物理移动：
 *  - 步①只让左栏「悬空」标记点亮（方块不动）。
 *  - 步②让中栏方块从顶部 transform 平移到地面（受重力下落），并点亮「自动下落」标。
 *  - 步③让右栏方块沿一条斜上抛物线位移（被力推飞），并点亮「被力推飞」标 + 力箭头。
 *
 * label 锚定「该步动作完成」的时刻（lit = BEAT*(i+1)）。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互；anime.js 经 useTeachingTimeline
 * 动态 import 切独立 chunk（硬规则 2/6），本组件经 mdx-components 注册时不进首屏关键路径。
 *
 * 视觉：全部 DESIGN token；无裸 hex；时长走 TEACHING_BEAT_MS 具名常量（硬规则 5）。
 * 所有坐标为整数常量（无 Math 浮点算坐标，杜绝 SSR/浏览器末位差导致的 hydration mismatch）。
 * 所有 <text> 距 viewBox 任意边 ≥14px；三栏互不重叠。
 */

// VIEW_W=736 使三栏 + 两 gap + 两侧各 24px 边距正好填满（24+3*220+2*14+24=736），
// 最右栏右缘 712、距右边界 24px ≥14px 安全边距（svg-check 不报贴边）。
const VIEW_W = 736;
// VIEW_H=352：最低内容是栏框底 328（COL_Y+COL_H），下留 24px。纵向利用率 ~89%（60-95% 内）。
const VIEW_H = 352;

// 三栏布局：每栏一个独立场景框。
const COL_W = 220;
const COL_GAP = 14;
const COL_Y = 78;
const COL_H = 250;
const COL_X0 = 24;
const colX = (i: number) => COL_X0 + i * (COL_W + COL_GAP);
const colCX = (i: number) => colX(i) + COL_W / 2;

// 地面线（每栏底部）与方块尺寸。
const GROUND_Y = COL_Y + COL_H - 36;
const BOX = 44;
// 方块「悬空」时的顶部位置（盒子左上角 y）。COL_Y+78=156：在副标题(116)与下落标(136)之下，
// 留出 116~156 的标注带，盒子从 156 落到 REST_Y=248（落差 92px）。
const TOP_Y = COL_Y + 78;
// 方块落到地面后的左上角 y（底边贴地面线）。
const REST_Y = GROUND_Y - BOX;

// 三栏方块初始左上角 x（居中于各栏）。
const boxX = (i: number) => colCX(i) - BOX / 2;

const STEPS: readonly TeachingStep[] = [
  {
    label: "none",
    caption:
      "① 无 Rigidbody：方块只是普通 GameObject，引擎不替它算重力——它悬在半空，一动不动",
  },
  {
    label: "gravity",
    caption:
      "② 加了 Rigidbody：方块被「交给物理引擎管」，自动受重力——松手就往下掉，落到地面",
  },
  {
    label: "force",
    caption:
      "③ rb.AddForce：给方块施一个力，它被推飞——物理引擎按力与质量算出它怎么动",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function RigidbodyGravityDiagram() {
  // 左栏「悬空」标记。
  const noneMarkRef = useRef<SVGGElement | null>(null);
  // 中栏：下落的方块 + 「自动下落」标记。
  const fallBoxRef = useRef<SVGRectElement | null>(null);
  const gravityMarkRef = useRef<SVGGElement | null>(null);
  // 右栏：被推飞的方块 + 力箭头 + 「被力推飞」标记。
  const flyBoxRef = useRef<SVGRectElement | null>(null);
  const forceArrowRef = useRef<SVGGElement | null>(null);
  const forceMarkRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // 步①：左栏「悬空·不动」标点亮（start = BEAT*0）。
      const s0 = TEACHING_BEAT_MS * 0;
      if (noneMarkRef.current) {
        tl.add(
          noneMarkRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s0,
        );
      }
      tl.label("none", TEACHING_BEAT_MS * 1);

      // 步②：中栏方块从 TOP_Y 落到 REST_Y（受重力下落）+ 「自动下落」标（start = BEAT*1）。
      const s1 = TEACHING_BEAT_MS * 1;
      if (fallBoxRef.current) {
        tl.add(
          fallBoxRef.current,
          {
            y: [TOP_Y, REST_Y],
            duration: TEACHING_BEAT_MS,
            ease: "in(2)", // 加速下落，像重力
          },
          s1,
        );
      }
      if (gravityMarkRef.current) {
        tl.add(
          gravityMarkRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s1,
        );
      }
      tl.label("gravity", TEACHING_BEAT_MS * 2);

      // 步③：右栏力箭头先闪、方块被推飞（斜上方位移）+ 「被力推飞」标（start = BEAT*2）。
      const s2 = TEACHING_BEAT_MS * 2;
      if (forceArrowRef.current) {
        tl.add(
          forceArrowRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s2,
        );
      }
      if (flyBoxRef.current) {
        // 被推飞：向右上方平移（translate），用 transform 避免改 x/y 与初始属性冲突。
        tl.add(
          flyBoxRef.current,
          {
            translateX: [0, 56],
            translateY: [0, -120],
            duration: TEACHING_BEAT_MS,
            ease: "out(2)",
          },
          s2,
        );
      }
      if (forceMarkRef.current) {
        tl.add(
          forceMarkRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s2,
        );
      }
      tl.label("force", TEACHING_BEAT_MS * 3);
    },
  });

  const titles = [
    { t: "① 无 Rigidbody", s: "普通 GameObject" },
    { t: "② 加 Rigidbody", s: "受重力自动下落" },
    { t: "③ AddForce", s: "被力推飞" },
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
          aria-label="加不加 Rigidbody 物体命运差天别地的对照动画。画面三栏并排，每栏一个方块和一条地面线。第一栏是无 Rigidbody，方块只是普通 GameObject，引擎不替它算重力，所以它悬在半空一动不动。第二栏是加了 Rigidbody，方块被交给物理引擎管、自动受重力，动画里方块从半空往下掉、落到地面。第三栏是调用 rb.AddForce 给方块施一个力，动画里方块被推飞、向右上方飞出去，物理引擎按力和质量算出它怎么动。动画分三步逐栏演示。动画可播放、暂停、单步、拖动进度。"
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
            加不加 Rigidbody：物体「受不受物理引擎管」的天壤之别
          </text>
          <text
            x={VIEW_W / 2}
            y={50}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            Rigidbody =
            把这个对象「交给物理引擎管」：自动受重力、受力、与别人碰撞
          </text>

          {/* ===== 三栏 ===== */}
          {titles.map((tt, i) => (
            <g key={tt.t}>
              {/* 栏框 */}
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
              {/* 栏标题 */}
              <text
                x={colCX(i)}
                y={COL_Y + 22}
                textAnchor="middle"
                fontSize="12.5"
                fontWeight="700"
                fill="var(--text-primary)"
              >
                {tt.t}
              </text>
              <text
                x={colCX(i)}
                y={COL_Y + 38}
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-secondary)"
              >
                {tt.s}
              </text>
              {/* 地面线 */}
              <line
                x1={colX(i) + 16}
                y1={GROUND_Y}
                x2={colX(i) + COL_W - 16}
                y2={GROUND_Y}
                stroke="var(--text-secondary)"
                strokeWidth="2"
              />
              <text
                x={colX(i) + COL_W - 16}
                y={GROUND_Y + 16}
                textAnchor="end"
                fontSize="9"
                fill="var(--text-secondary)"
              >
                地面
              </text>
            </g>
          ))}

          {/* ===== 第①栏：悬空不动的方块（静止，始终在 TOP_Y） ===== */}
          <rect
            x={boxX(0)}
            y={TOP_Y}
            width={BOX}
            height={BOX}
            rx="6"
            fill="var(--text-secondary)"
            fillOpacity="0.18"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />
          {/* 悬空标记（步①点亮） */}
          <g ref={noneMarkRef} opacity="0">
            {/* 虚线示意「它本该掉下去，却没掉」 */}
            <line
              x1={colCX(0)}
              y1={TOP_Y + BOX}
              x2={colCX(0)}
              y2={GROUND_Y}
              stroke="var(--text-secondary)"
              strokeWidth="1.4"
              strokeDasharray="4 5"
            />
            <text
              x={colCX(0)}
              y={GROUND_Y - 64}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="var(--text-secondary)"
            >
              悬在半空 · 不动
            </text>
            <text
              x={colCX(0)}
              y={GROUND_Y + 30}
              textAnchor="middle"
              fontSize="9.5"
              fill="var(--text-secondary)"
            >
              引擎不替它算重力
            </text>
          </g>

          {/* ===== 第②栏：受重力下落的方块（步②从 TOP_Y 落到 REST_Y） ===== */}
          <rect
            ref={fallBoxRef}
            x={boxX(1)}
            y={TOP_Y}
            width={BOX}
            height={BOX}
            rx="6"
            fill="var(--accent)"
            fillOpacity="0.22"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          {/* 下落标记（步②点亮） */}
          <g ref={gravityMarkRef} opacity="0">
            <text
              x={colCX(1)}
              y={COL_Y + 60}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="var(--accent)"
            >
              ↓ 自动下落
            </text>
            <text
              x={colCX(1)}
              y={GROUND_Y + 30}
              textAnchor="middle"
              fontSize="9.5"
              fill="var(--text-secondary)"
            >
              受重力，落到地面
            </text>
          </g>

          {/* ===== 第③栏：被力推飞的方块（步③向右上方位移） ===== */}
          {/* 力的施加点（方块初始在地面附近，被推飞前） */}
          <rect
            ref={flyBoxRef}
            x={boxX(2)}
            y={REST_Y}
            width={BOX}
            height={BOX}
            rx="6"
            fill="var(--success)"
            fillOpacity="0.22"
            stroke="var(--success)"
            strokeWidth="2"
          />
          {/* 力箭头（步③点亮）：从方块左下指向右上 */}
          <g ref={forceArrowRef} opacity="0">
            <line
              x1={boxX(2) - 6}
              y1={REST_Y + BOX + 12}
              x2={boxX(2) + 22}
              y2={REST_Y - 6}
              stroke="var(--success)"
              strokeWidth="2.4"
              markerEnd="url(#rgd-force-arrow)"
            />
            <text
              x={boxX(2) - 10}
              y={REST_Y + BOX + 26}
              textAnchor="start"
              fontSize="10"
              fontWeight="700"
              fontFamily="var(--font-mono)"
              fill="var(--success)"
            >
              AddForce
            </text>
          </g>
          {/* 被推飞标记（步③点亮） */}
          <g ref={forceMarkRef} opacity="0">
            <text
              x={colCX(2)}
              y={COL_Y + 60}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="var(--success)"
            >
              被力推飞 →
            </text>
          </g>

          <defs>
            <marker
              id="rgd-force-arrow"
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
          caption="猜一猜：给一个方块「加上 Rigidbody」后，松开手它会怎样？单步走第②步看答案。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        没 Rigidbody 的对象引擎不管它的物理——它悬空不动；加了 Rigidbody
        就「交给物理引擎管」：自动受重力下落、被 AddForce
        推飞、与别人碰撞反弹。这是「让物体动起来」的开关。
      </figcaption>
    </figure>
  );
}
