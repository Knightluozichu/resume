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
 * <ConfigChangeViewModelDiagram>：《Android 编程权威指南》basics/ui-state-persistence 章
 * 「ViewModel 存活范围」配图（HEL-174）。
 *
 * 「可控教学动画」：一条横向时间轴，演示一次屏幕旋转（配置变更）下
 * **Activity 重建 vs ViewModel 跨重建存活** 的对比——看清这条铁律：
 * 旋转时 Activity 实例被销毁并重建（盒子在旋转点断裂、换新），而同一个
 * ViewModel 实例的生命线连续贯穿旋转点、从不中断，所以它持有的数据能保住。
 *   ① Activity 实例 #1 运行，持有 UI 状态 / 成员变量，ViewModel 已附着（生命线左端亮起）→
 *   ② 用户旋转屏幕：时间轴中点亮起「配置变更 / 旋转」标记 →
 *   ③ Activity #1 onDestroy 销毁，其盒子变灰淡出，成员变量随之清空 →
 *   ④ 系统重建出 Activity 实例 #2（新盒子 onCreate 淡入）→
 *   ⑤ 同一 ViewModel 实例继续附着到 #2：生命线连续不断、贯穿旋转点整条高亮，
 *      副标注 onSaveInstanceState 的 Bundle 也跨重建恢复轻量状态。
 *
 * 视觉对比核心：Activity 盒子在旋转点「断裂、重建」（#1 灭、#2 起，不连续）；
 * ViewModel 生命线「连续贯穿不中断」。配色区分：Activity = --warning（会被重建、易丢）、
 * ViewModel = --success（跨重建存活、可靠）、旋转事件 = --accent（配置变更标记）。
 *
 * 时序照 BackStackDiagram / MvcDataFlowDiagram：步 i 的呈现占 [BEAT*i, BEAT*(i+1)]，
 * label 落在呈现完成处 BEAT*(i+1)，最后一步停在亮态不淡出（表示新 Activity + 同一 ViewModel
 * 已就位、对比完成），杜绝单步 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 内部的动态 import("animejs") 切成独立 chunk（硬规则 2/6），本组件再经 mdx-components
 * 静态注册为客户端叶子，anime.js 绝不进首屏 / 公共 layout。
 *
 * 全部 DESIGN token 配色无裸 hex；时长走 TEACHING_BEAT_MS 具名常量、几何布局常量均为
 * 4 的倍数且具名（硬规则 5）。
 */

// —— 画布与时间轴布局常量（均为 4 的倍数）。 ——
const VIEW_W = 640;
const VIEW_H = 320;

const AXIS_X1 = 48; // 时间轴左端 x
const AXIS_X2 = 592; // 时间轴右端 x（VIEW_W - 48，对称留白）
const AXIS_Y = 168; // 时间轴所在 y（上为 Activity 行、下为 ViewModel 生命线）
const ROTATE_X = 320; // 旋转 / 配置变更标记的 x（时间轴中点）

// —— 上方 Activity 实例盒子（会被重建、易丢；--warning）。 ——
const ACT_BOX_W = 176;
const ACT_BOX_H = 64;
const ACT_BOX_Y = 56; // 盒子顶边 y（在时间轴上方）
const ACT1_X = 64; // Activity #1 左边距（旋转点左侧）
const ACT2_X = 400; // Activity #2 左边距（旋转点右侧）

// —— 下方 ViewModel 生命线长条（跨重建存活；--success）。 ——
const LIFELINE_H = 40;
const LIFELINE_Y = 224; // 生命线长条顶边 y（在时间轴下方）
const LIFELINE_X = AXIS_X1; // 生命线左端 = 轴左端
const LIFELINE_W = AXIS_X2 - AXIS_X1; // 贯穿整条时间轴

// 非活跃 / 已销毁态的下沉透明度（Activity #1 旋转后变灰）。
const SUNK_OPACITY = 0.24;

// —— 关键帧步骤（顺序即时间顺序；caption 供控制条朗读）。 ——
const STEPS: readonly TeachingStep[] = [
  {
    label: "running",
    caption:
      "① Activity 实例 #1 运行：持有 UI 状态与成员变量，ViewModel 已附着（生命线左端亮起）",
  },
  {
    label: "rotate",
    caption:
      "② 用户旋转屏幕：触发配置变更（Configuration 改变），时间轴中点亮起「旋转」标记",
  },
  {
    label: "destroy",
    caption:
      "③ Activity #1 onDestroy 销毁：盒子变灰淡出，它的成员变量随实例一起清空",
  },
  {
    label: "recreate",
    caption:
      "④ 系统按新 Configuration 重建出 Activity 实例 #2（新盒子 onCreate 淡入）",
  },
  {
    label: "survive",
    caption:
      "⑤ 同一个 ViewModel 实例继续附着到 #2：生命线连续贯穿旋转点不中断，数据保住",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function ConfigChangeViewModelDiagram() {
  // anime.js 驱动的 DOM 引用：两张 Activity 盒子整组 + 旋转标记组 +
  // ViewModel 生命线的「贯穿高亮层」。
  const act1Ref = useRef<SVGGElement | null>(null);
  const act2Ref = useRef<SVGGElement | null>(null);
  const rotateRef = useRef<SVGGElement | null>(null);
  // 生命线左半段（旋转前已亮）与右半段（旋转后续亮）的高亮覆盖层：
  // 用「先亮左半、贯穿点续亮右半」表达「连续不断」，与 Activity 的断裂形成对照。
  const lifeLeftRef = useRef<SVGRectElement | null>(null);
  const lifeRightRef = useRef<SVGRectElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // 各步呈现占 [BEAT*i, BEAT*(i+1)]，lit = BEAT*(i+1) = label 锚点。
      const at = (i: number) => ({
        start: TEACHING_BEAT_MS * i,
        lit: TEACHING_BEAT_MS * (i + 1),
      });

      // —— 步① running：Activity #1 点亮（已在初始亮态，这里轻提一下 scale），
      //     同时 ViewModel 生命线左半段亮起（左端已附着）。 ——
      {
        const { start, lit } = at(0);
        if (act1Ref.current) {
          tl.add(
            act1Ref.current,
            {
              opacity: [0.6, 1],
              duration: TEACHING_BEAT_MS,
              ease: "out(3)",
            },
            start,
          );
        }
        if (lifeLeftRef.current) {
          tl.add(
            lifeLeftRef.current,
            { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(2)" },
            start,
          );
        }
        tl.label("running", lit);
      }

      // —— 步② rotate：旋转标记淡入 + 轻微旋转动效（配置变更发生）。 ——
      {
        const { start, lit } = at(1);
        if (rotateRef.current) {
          tl.add(
            rotateRef.current,
            {
              opacity: [0, 1],
              rotate: [0, 90],
              duration: TEACHING_BEAT_MS,
              ease: "out(3)",
            },
            start,
          );
        }
        tl.label("rotate", lit);
      }

      // —— 步③ destroy：Activity #1 onDestroy → 盒子变灰下沉（成员变量随之清空）。 ——
      {
        const { start, lit } = at(2);
        if (act1Ref.current) {
          tl.add(
            act1Ref.current,
            {
              opacity: SUNK_OPACITY,
              duration: TEACHING_BEAT_MS,
              ease: "inOut(2)",
            },
            start,
          );
        }
        tl.label("destroy", lit);
      }

      // —— 步④ recreate：系统重建出 Activity #2，新盒子 onCreate 淡入。 ——
      {
        const { start, lit } = at(3);
        if (act2Ref.current) {
          tl.add(
            act2Ref.current,
            {
              opacity: [0, 1],
              scale: [0.96, 1],
              duration: TEACHING_BEAT_MS,
              ease: "out(3)",
            },
            start,
          );
        }
        tl.label("recreate", lit);
      }

      // —— 步⑤ survive：同一 ViewModel 续亮右半段，生命线连续贯穿旋转点不中断
      //     （末步停在亮态不淡出）。 ——
      {
        const { start, lit } = at(4);
        if (lifeRightRef.current) {
          tl.add(
            lifeRightRef.current,
            { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(2)" },
            start,
          );
        }
        tl.label("survive", lit);
      }
    },
  });

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
          aria-label="屏幕旋转（配置变更）下 Activity 重建与 ViewModel 存活范围的对比。一条横向时间轴：上方是 Activity 实例盒子（持有 UI 状态与成员变量，标 --warning 警示色，会被重建、数据易丢），下方是一条贯穿整条时间轴的 ViewModel 生命线长条（标 --success 可靠色，跨重建存活），轴中点是配置变更（旋转）标记。五步演示对比：① Activity 实例 #1 运行，持有 UI 状态与成员变量，ViewModel 已附着，生命线左半段亮起；② 用户旋转屏幕，触发配置变更，时间轴中点的旋转标记亮起；③ Activity #1 调用 onDestroy 被销毁，盒子变灰淡出，它持有的成员变量随实例一起清空；④ 系统按新配置重建出 Activity 实例 #2，新盒子调用 onCreate 淡入；⑤ 同一个 ViewModel 实例继续附着到 Activity #2，生命线连续贯穿旋转点从不中断，所以它持有的数据被保住。视觉对比核心是：Activity 盒子在旋转点断裂并被换成新实例（不连续），而 ViewModel 生命线连续贯穿整条时间轴不中断。另外 onSaveInstanceState 的 Bundle 也能跨重建恢复轻量状态。可播放、暂停、单步、拖动进度逐帧观察。"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <defs>
            {/* 时间轴箭头（指向时间前进方向） */}
            <marker
              id="ccvm-axis-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* —— 横向时间轴（常驻参照系）。 —— */}
          <line
            x1={AXIS_X1}
            y1={AXIS_Y}
            x2={AXIS_X2}
            y2={AXIS_Y}
            stroke="var(--text-secondary)"
            strokeWidth="1.4"
            markerEnd="url(#ccvm-axis-arrow)"
            opacity="0.6"
          />
          <text
            x={AXIS_X2}
            y={AXIS_Y - 8}
            textAnchor="end"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            时间 →
          </text>

          {/* 行标注：上方 Activity 行 / 下方 ViewModel 行 */}
          <text
            x={AXIS_X1}
            y={ACT_BOX_Y - 16}
            textAnchor="start"
            fontSize="11"
            fontWeight="600"
            fill="var(--warning)"
          >
            Activity 实例（持有 UI 状态 / 成员变量）
          </text>
          <text
            x={AXIS_X1}
            y={LIFELINE_Y + LIFELINE_H + 24}
            textAnchor="start"
            fontSize="11"
            fontWeight="600"
            fill="var(--success)"
          >
            ViewModel：跨重建存活
          </text>

          {/* —— 旋转 / 配置变更标记（轴中点；anime.js 驱动其 opacity + rotate）。 —— */}
          <line
            x1={ROTATE_X}
            y1={ACT_BOX_Y - 8}
            x2={ROTATE_X}
            y2={LIFELINE_Y + LIFELINE_H + 8}
            stroke="var(--accent)"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            opacity="0.5"
          />
          <g
            ref={rotateRef}
            opacity={0}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          >
            {/* 旋转图标底圆 + 弧形箭头（示意「屏幕旋转」） */}
            <circle
              cx={ROTATE_X}
              cy={AXIS_Y}
              r="16"
              fill="var(--accent-glow)"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <path
              d={`M ${ROTATE_X - 8} ${AXIS_Y - 2} A 8 8 0 1 1 ${ROTATE_X - 5} ${AXIS_Y + 7}`}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <path
              d={`M ${ROTATE_X - 9} ${AXIS_Y - 6} L ${ROTATE_X - 8} ${AXIS_Y - 1} L ${ROTATE_X - 3} ${AXIS_Y - 2} z`}
              fill="var(--accent)"
            />
          </g>
          <text
            x={ROTATE_X}
            y={AXIS_Y + 36}
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="600"
            fill="var(--accent)"
          >
            配置变更 / 旋转
          </text>

          {/* —— ViewModel 生命线长条：底框（常驻） + 左/右两段高亮覆盖层（连续贯穿）。 ——
              底框横跨整条轴；左半段先亮、贯穿点续亮右半段 = 连续不中断。 */}
          <rect
            x={LIFELINE_X}
            y={LIFELINE_Y}
            width={LIFELINE_W}
            height={LIFELINE_H}
            rx="10"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.2"
          />
          {/* 左半段高亮（旋转前已附着） */}
          <rect
            ref={lifeLeftRef}
            x={LIFELINE_X}
            y={LIFELINE_Y}
            width={ROTATE_X - LIFELINE_X}
            height={LIFELINE_H}
            rx="10"
            fill="var(--success)"
            fillOpacity="0.18"
            stroke="var(--success)"
            strokeWidth="2"
            opacity={0}
          />
          {/* 右半段高亮（旋转后续亮——同一实例连续贯穿） */}
          <rect
            ref={lifeRightRef}
            x={ROTATE_X}
            y={LIFELINE_Y}
            width={LIFELINE_X + LIFELINE_W - ROTATE_X}
            height={LIFELINE_H}
            rx="10"
            fill="var(--success)"
            fillOpacity="0.18"
            stroke="var(--success)"
            strokeWidth="2"
            opacity={0}
          />
          <text
            x={(LIFELINE_X + LIFELINE_W / 2)}
            y={LIFELINE_Y + LIFELINE_H / 2 + 4}
            textAnchor="middle"
            fontSize="12.5"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            fill="var(--success)"
          >
            FormViewModel（同一实例贯穿旋转）
          </text>

          {/* —— Activity 实例 #1（旋转点左侧；初始亮态，旋转后变灰下沉）。 —— */}
          <g ref={act1Ref} opacity={0.6}>
            <rect
              x={ACT1_X}
              y={ACT_BOX_Y}
              width={ACT_BOX_W}
              height={ACT_BOX_H}
              rx="10"
              fill="var(--warning)"
              fillOpacity="0.12"
              stroke="var(--warning)"
              strokeWidth="2"
            />
            <text
              x={ACT1_X + ACT_BOX_W / 2}
              y={ACT_BOX_Y + 24}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fontFamily="var(--font-mono)"
              fill="var(--text-primary)"
            >
              Activity 实例 #1
            </text>
            <text
              x={ACT1_X + ACT_BOX_W / 2}
              y={ACT_BOX_Y + 44}
              textAnchor="middle"
              fontSize="10"
              fill="var(--text-secondary)"
            >
              成员变量 / UI 状态
            </text>
          </g>

          {/* —— Activity 实例 #2（旋转点右侧；初始隐形，重建步淡入）。 —— */}
          <g
            ref={act2Ref}
            opacity={0}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          >
            <rect
              x={ACT2_X}
              y={ACT_BOX_Y}
              width={ACT_BOX_W}
              height={ACT_BOX_H}
              rx="10"
              fill="var(--warning)"
              fillOpacity="0.12"
              stroke="var(--warning)"
              strokeWidth="2"
            />
            <text
              x={ACT2_X + ACT_BOX_W / 2}
              y={ACT_BOX_Y + 24}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fontFamily="var(--font-mono)"
              fill="var(--text-primary)"
            >
              Activity 实例 #2
            </text>
            <text
              x={ACT2_X + ACT_BOX_W / 2}
              y={ACT_BOX_Y + 44}
              textAnchor="middle"
              fontSize="10"
              fill="var(--text-secondary)"
            >
              重建（onCreate）
            </text>
          </g>

          {/* —— 附着虚线：两张 Activity 盒子各自连到下方 ViewModel 生命线
              （同一 ViewModel 先后附着到 #1、#2，体现「换 Activity 不换 ViewModel」）。 —— */}
          <line
            x1={ACT1_X + ACT_BOX_W / 2}
            y1={ACT_BOX_Y + ACT_BOX_H}
            x2={ACT1_X + ACT_BOX_W / 2}
            y2={LIFELINE_Y}
            stroke="var(--text-secondary)"
            strokeWidth="1.2"
            strokeDasharray="3 3"
            opacity="0.5"
          />
          <line
            x1={ACT2_X + ACT_BOX_W / 2}
            y1={ACT_BOX_Y + ACT_BOX_H}
            x2={ACT2_X + ACT_BOX_W / 2}
            y2={LIFELINE_Y}
            stroke="var(--text-secondary)"
            strokeWidth="1.2"
            strokeDasharray="3 3"
            opacity="0.5"
          />

          {/* 副标注：onSaveInstanceState 的 Bundle 也跨重建恢复轻量状态 */}
          <text
            x={VIEW_W / 2}
            y={VIEW_H - 8}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            另：onSaveInstanceState 的 Bundle 也跨重建恢复轻量 UI 状态
          </text>
        </svg>

        {/* 控制条原语：播放/暂停/单步/拖进度 + 当前步文案 */}
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="点击播放，看一次旋转屏幕：Activity 在旋转点断裂、被换成新实例（成员变量随之清空），而 ViewModel 生命线连续贯穿不中断、数据保住。可暂停、单步、拖进度逐帧观察。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        配置变更（旋转）下的对比：Activity 实例被销毁并重建（#1 灭、#2 起，成员变量丢失），
        同一个 ViewModel 实例的生命线却连续贯穿旋转点不中断——这就是它能保住数据的原因。
      </figcaption>
    </figure>
  );
}
