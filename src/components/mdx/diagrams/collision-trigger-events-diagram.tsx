"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <CollisionTriggerEventsDiagram>：本章主图——「实心碰撞 vs 触发器」两套事件对照（HEL-285）。
 *
 * 左右两栏并排，把「实心走 OnCollision* / 触发器走 OnTrigger*」与「Enter→Stay→Exit 三时机」掰碎：
 *  左·实心碰撞：一个紫方块向右移动撞上一面静态墙，被挡住（停在墙边）——
 *    接触瞬间 OnCollisionEnter 点亮、持续接触期间 OnCollisionStay、分开瞬间 OnCollisionExit。
 *  右·触发器(isTrigger)：一个绿方块穿过一道虚线感应区（不被阻挡，直接穿过去）——
 *    穿入瞬间 OnTriggerEnter、停留期间 OnTriggerStay、穿出瞬间 OnTriggerExit。
 *
 * 动画分 6 步（左 3 + 右 3），逐步让方块按各自规则移动并点亮对应回调标签：
 *  - 步①：左方块右移到墙边停住（撞上），OnCollisionEnter 点亮。
 *  - 步②：方块贴墙不动（持续接触），OnCollisionStay 点亮。
 *  - 步③：方块被弹回左移（分开），OnCollisionExit 点亮。
 *  - 步④：右方块右移进入感应区（穿入），OnTriggerEnter 点亮。
 *  - 步⑤：方块停在感应区中央（停留），OnTriggerStay 点亮。
 *  - 步⑥：方块继续右移穿出感应区（穿出），OnTriggerExit 点亮。
 *
 * label 锚定「该步动作完成」的时刻（lit = BEAT*(i+1)）。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互；anime.js 经 useTeachingTimeline
 * 动态 import 切独立 chunk（硬规则 2/6），本组件经 mdx-components 注册时不进首屏关键路径。
 *
 * 视觉：全部 DESIGN token；无裸 hex；时长走 TEACHING_BEAT_MS 具名常量（硬规则 5）。
 * 所有坐标为整数常量（无 Math 浮点算坐标，杜绝 SSR/浏览器末位差导致的 hydration mismatch）。
 * 所有 <text> 距 viewBox 任意边 ≥14px；两栏互不重叠。
 */

// VIEW_W=712：两栏(330) + 一 gap(28) + 两侧各 24px 边距正好填满（24+2*330+28+24=736-..），
// 实际 24+330+28+330+24 = 736；右栏右缘 712、距右边界 24px ≥14px 安全边距。
const VIEW_W = 736;
// VIEW_H=392：最低内容是栏框底 368（COL_Y+COL_H），下留 24px。纵向利用率 ~88%（60-95% 内）。
const VIEW_H = 392;

// 两栏布局：左实心碰撞、右触发器。
const COL_W = 330;
const COL_GAP = 28;
const COL_X0 = 24;
const COL_Y = 78;
const COL_H = 290;
const colX = (i: number) => COL_X0 + i * (COL_W + COL_GAP);
const colCX = (i: number) => colX(i) + COL_W / 2;

// 物体运动基线（栏中部偏下，给上方回调标签留空间）。
const BASE_Y = COL_Y + 156;
const BOX = 40;

// 左栏：静态墙在右侧；方块从左移到墙边（撞上）。
const WALL_X = colX(0) + COL_W - 64; // 墙左缘
const WALL_W = 26;
// 方块初始左上角 x（左栏左侧），撞墙后停在墙左缘前。
const L_BOX_X0 = colX(0) + 40;
const L_BOX_HIT_DX = WALL_X - BOX - L_BOX_X0; // 移动到紧贴墙的位移（整数）

// 右栏：虚线感应区居中；方块从左穿到右。
const ZONE_W = 96;
const ZONE_X = colCX(1) - ZONE_W / 2; // 感应区左缘
const R_BOX_X0 = colX(1) + 28; // 方块初始左上角 x（右栏左侧，区外）
// 步④进入区中央、步⑥穿出到区右侧外（整数位移）。
const R_DX_ENTER = ZONE_X + ZONE_W / 2 - BOX / 2 - R_BOX_X0; // 移到区中央
const R_DX_EXIT = ZONE_X + ZONE_W + 24 - R_BOX_X0; // 移到区右外侧

// 三个回调标签的纵向起点（栏内上部，逐条往下排）。
const CB_Y0 = COL_Y + 40;
const CB_DY = 26;

const STEPS: readonly TeachingStep[] = [
  {
    label: "col-enter",
    caption:
      "① 实心碰撞·撞上瞬间：紫方块撞上静态墙、被挡住 → 引擎调用 OnCollisionEnter(Collision c)",
  },
  {
    label: "col-stay",
    caption:
      "② 实心碰撞·持续接触：方块仍顶着墙的这些帧 → 每帧调用 OnCollisionStay",
  },
  {
    label: "col-exit",
    caption: "③ 实心碰撞·分开瞬间：方块离开墙 → 调用 OnCollisionExit",
  },
  {
    label: "trig-enter",
    caption:
      "④ 触发器·穿入瞬间：绿方块穿进虚线感应区（不被阻挡）→ 引擎调用 OnTriggerEnter(Collider other)",
  },
  {
    label: "trig-stay",
    caption:
      "⑤ 触发器·停留期间：方块待在感应区里的这些帧 → 每帧调用 OnTriggerStay",
  },
  {
    label: "trig-exit",
    caption: "⑥ 触发器·穿出瞬间：方块穿出感应区 → 调用 OnTriggerExit",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function CollisionTriggerEventsDiagram() {
  // 左栏：撞墙的方块 + 三个 OnCollision* 标签。
  const colBoxRef = useRef<SVGRectElement | null>(null);
  const colEnterRef = useRef<SVGGElement | null>(null);
  const colStayRef = useRef<SVGGElement | null>(null);
  const colExitRef = useRef<SVGGElement | null>(null);
  // 右栏：穿过感应区的方块 + 三个 OnTrigger* 标签。
  const trigBoxRef = useRef<SVGRectElement | null>(null);
  const trigEnterRef = useRef<SVGGElement | null>(null);
  const trigStayRef = useRef<SVGGElement | null>(null);
  const trigExitRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // 步①：左方块右移撞墙停住 + OnCollisionEnter 点亮（start = BEAT*0）。
      const s0 = TEACHING_BEAT_MS * 0;
      if (colBoxRef.current) {
        tl.add(
          colBoxRef.current,
          {
            translateX: [0, L_BOX_HIT_DX],
            duration: TEACHING_BEAT_MS,
            ease: "out(2)",
          },
          s0,
        );
      }
      if (colEnterRef.current) {
        tl.add(
          colEnterRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s0,
        );
      }
      tl.label("col-enter", TEACHING_BEAT_MS * 1);

      // 步②：方块贴墙不动（保持位移），OnCollisionStay 点亮（start = BEAT*1）。
      const s1 = TEACHING_BEAT_MS * 1;
      if (colStayRef.current) {
        tl.add(
          colStayRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s1,
        );
      }
      tl.label("col-stay", TEACHING_BEAT_MS * 2);

      // 步③：方块被弹回左移（回初始位置），OnCollisionExit 点亮（start = BEAT*2）。
      const s2 = TEACHING_BEAT_MS * 2;
      if (colBoxRef.current) {
        tl.add(
          colBoxRef.current,
          {
            translateX: [L_BOX_HIT_DX, 0],
            duration: TEACHING_BEAT_MS,
            ease: "out(2)",
          },
          s2,
        );
      }
      if (colExitRef.current) {
        tl.add(
          colExitRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s2,
        );
      }
      tl.label("col-exit", TEACHING_BEAT_MS * 3);

      // 步④：右方块右移进入感应区 + OnTriggerEnter 点亮（start = BEAT*3）。
      const s3 = TEACHING_BEAT_MS * 3;
      if (trigBoxRef.current) {
        tl.add(
          trigBoxRef.current,
          {
            translateX: [0, R_DX_ENTER],
            duration: TEACHING_BEAT_MS,
            ease: "out(2)",
          },
          s3,
        );
      }
      if (trigEnterRef.current) {
        tl.add(
          trigEnterRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s3,
        );
      }
      tl.label("trig-enter", TEACHING_BEAT_MS * 4);

      // 步⑤：方块停在区中央（保持位移），OnTriggerStay 点亮（start = BEAT*4）。
      const s4 = TEACHING_BEAT_MS * 4;
      if (trigStayRef.current) {
        tl.add(
          trigStayRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s4,
        );
      }
      tl.label("trig-stay", TEACHING_BEAT_MS * 5);

      // 步⑥：方块继续右移穿出感应区 + OnTriggerExit 点亮（start = BEAT*5）。
      const s5 = TEACHING_BEAT_MS * 5;
      if (trigBoxRef.current) {
        tl.add(
          trigBoxRef.current,
          {
            translateX: [R_DX_ENTER, R_DX_EXIT],
            duration: TEACHING_BEAT_MS,
            ease: "out(2)",
          },
          s5,
        );
      }
      if (trigExitRef.current) {
        tl.add(
          trigExitRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s5,
        );
      }
      tl.label("trig-exit", TEACHING_BEAT_MS * 6);
    },
  });

  // 左栏三个 OnCollision* 回调标签的文本。
  const colCbs = [
    { ref: colEnterRef, t: "OnCollisionEnter", d: "撞上瞬间·调一次" },
    { ref: colStayRef, t: "OnCollisionStay", d: "接触期间·每帧调" },
    { ref: colExitRef, t: "OnCollisionExit", d: "分开瞬间·调一次" },
  ];
  const trigCbs = [
    { ref: trigEnterRef, t: "OnTriggerEnter", d: "穿入瞬间·调一次" },
    { ref: trigStayRef, t: "OnTriggerStay", d: "停留期间·每帧调" },
    { ref: trigExitRef, t: "OnTriggerExit", d: "穿出瞬间·调一次" },
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
          aria-label="实心碰撞与触发器两套事件回调的对照动画。左右两栏并排。左栏是实心碰撞：一个紫方块向右移动撞上一面静态墙，被挡住停在墙边。撞上的瞬间引擎调用 OnCollisionEnter，参数是 Collision；方块顶着墙的这些帧每帧调用 OnCollisionStay；方块离开墙的瞬间调用 OnCollisionExit。右栏是触发器，碰撞器勾了 isTrigger：一个绿方块穿过一道虚线感应区，不被阻挡、直接穿过去。穿进去的瞬间调用 OnTriggerEnter，参数是 Collider；方块待在区里的这些帧每帧调用 OnTriggerStay；方块穿出去的瞬间调用 OnTriggerExit。核心区别是实心碰撞走 OnCollision 系列回调、会被阻挡，触发器走 OnTrigger 系列回调、只感应不阻挡。动画分六步，先演左栏三步再演右栏三步，可播放、暂停、单步、拖动进度。"
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
            两套事件：实心碰撞走 OnCollision*，触发器走 OnTrigger*
          </text>
          <text
            x={VIEW_W / 2}
            y={50}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            两者都有 Enter（进）→ Stay（持续/停留）→
            Exit（出）三时机；实心会挡、触发只感应
          </text>

          {/* ===== 两栏框 + 标题 ===== */}
          <g>
            {/* 左栏框 */}
            <rect
              x={colX(0)}
              y={COL_Y}
              width={COL_W}
              height={COL_H}
              rx="10"
              fill="var(--accent)"
              fillOpacity="0.04"
              stroke="var(--border)"
              strokeWidth="1.4"
            />
            <text
              x={colCX(0)}
              y={COL_Y + 22}
              textAnchor="middle"
              fontSize="12.5"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              实心碰撞（不勾 isTrigger）
            </text>
            {/* 右栏框 */}
            <rect
              x={colX(1)}
              y={COL_Y}
              width={COL_W}
              height={COL_H}
              rx="10"
              fill="var(--success)"
              fillOpacity="0.04"
              stroke="var(--border)"
              strokeWidth="1.4"
            />
            <text
              x={colCX(1)}
              y={COL_Y + 22}
              textAnchor="middle"
              fontSize="12.5"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              触发器（勾了 isTrigger）
            </text>
          </g>

          {/* ===== 左栏：静态墙 + 撞墙的紫方块 ===== */}
          {/* 静态墙（不动，被撞的对象） */}
          <rect
            x={WALL_X}
            y={BASE_Y - 30}
            width={WALL_W}
            height={88}
            rx="4"
            fill="var(--text-secondary)"
            fillOpacity="0.22"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />
          <text
            x={WALL_X + WALL_W / 2}
            y={BASE_Y + 76}
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            墙（实心·挡得住）
          </text>
          {/* 撞墙的紫方块（步①右移、步③弹回） */}
          <rect
            ref={colBoxRef}
            x={L_BOX_X0}
            y={BASE_Y}
            width={BOX}
            height={BOX}
            rx="6"
            fill="var(--accent)"
            fillOpacity="0.26"
            stroke="var(--accent)"
            strokeWidth="2"
          />

          {/* ===== 左栏三个回调标签（逐步点亮） ===== */}
          {colCbs.map((cb, i) => (
            <g key={cb.t} ref={cb.ref} opacity="0">
              <text
                x={colX(0) + 18}
                y={CB_Y0 + i * CB_DY}
                textAnchor="start"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="var(--font-mono)"
                fill="var(--accent)"
              >
                {cb.t}
              </text>
              <text
                x={colX(0) + COL_W - 18}
                y={CB_Y0 + i * CB_DY}
                textAnchor="end"
                fontSize="9.5"
                fill="var(--text-secondary)"
              >
                {cb.d}
              </text>
            </g>
          ))}

          {/* ===== 右栏：虚线感应区 + 穿过的绿方块 ===== */}
          {/* 感应区（虚线框，isTrigger，不阻挡） */}
          <rect
            x={ZONE_X}
            y={BASE_Y - 30}
            width={ZONE_W}
            height={100}
            rx="6"
            fill="var(--success)"
            fillOpacity="0.07"
            stroke="var(--success)"
            strokeWidth="2"
            strokeDasharray="6 5"
          />
          <text
            x={ZONE_X + ZONE_W / 2}
            y={BASE_Y + 86}
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            感应区（虚线·不挡，能穿过）
          </text>
          {/* 穿过的绿方块（步④进、步⑥出） */}
          <rect
            ref={trigBoxRef}
            x={R_BOX_X0}
            y={BASE_Y}
            width={BOX}
            height={BOX}
            rx="6"
            fill="var(--success)"
            fillOpacity="0.3"
            stroke="var(--success)"
            strokeWidth="2"
          />

          {/* ===== 右栏三个回调标签（逐步点亮） ===== */}
          {trigCbs.map((cb, i) => (
            <g key={cb.t} ref={cb.ref} opacity="0">
              <text
                x={colX(1) + 18}
                y={CB_Y0 + i * CB_DY}
                textAnchor="start"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="var(--font-mono)"
                fill="var(--success)"
              >
                {cb.t}
              </text>
              <text
                x={colX(1) + COL_W - 18}
                y={CB_Y0 + i * CB_DY}
                textAnchor="end"
                fontSize="9.5"
                fill="var(--text-secondary)"
              >
                {cb.d}
              </text>
            </g>
          ))}
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="猜一猜：把右栏方块的碰撞器「勾上 isTrigger」后，它撞到对方会被挡住、还是直接穿过去？单步走第④步看答案。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        两个实心碰撞器撞上 → 走 `OnCollisionEnter / Stay / Exit`（参数是
        Collision，会被物理阻挡）；任一勾了 isTrigger → 走 `OnTriggerEnter /
        Stay / Exit`（参数是 Collider other，只感应不阻挡）。Enter 进、Stay
        持续、Exit 出，两套各管三个时机。
      </figcaption>
    </figure>
  );
}
