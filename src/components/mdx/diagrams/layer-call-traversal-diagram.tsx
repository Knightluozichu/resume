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
 * <LayerCallTraversalDiagram>：《Android 进阶解密》system-architecture/android-architecture
 * 章「一次 API 调用如何穿越架构各层」配图（HEL-215）。
 *
 * 本章已有静态分层图 <AndroidArchLayersDiagram>（讲清五层「是什么」）；本图是它的
 * **动态补充**——把「一次具体调用怎样自上而下穿过各层、再把结果自下而上返回」演成
 * 可控动画，让读者看清层与层之间的真实调用流向，而非一张静态分层快照。
 *
 * 「可控教学动画」：一个「调用令牌」从应用层出发，沿竖向层栈逐层**下行**穿过 Java
 * Framework → Binder + 系统服务（system_server）→ HAL → Linux Kernel 驱动，最终操作
 * 硬件；到底后**结果上行**直接返回应用层（末步）。共 6 步：
 *   ① 应用层 App 发起一次 API 调用（如 getSystemService 拿到 CameraManager）→
 *   ② 进入 Java Framework 层 API（如 Camera2 / *Manager 的门面方法）→
 *   ③ 经 Binder 跨进程调到 native 系统服务（system_server，权限校验在此）→
 *   ④ 系统服务经 HAL 硬件抽象层下发（HAL 屏蔽各厂商硬件差异）→
 *   ⑤ HAL 调 Linux Kernel 驱动，真正操作硬件 →
 *   ⑥ 硬件 / 内核把结果自下而上一路返回应用层（应用永不直接碰内核 / 硬件）。
 *
 * 每步点亮「当前活跃层」并让令牌沿当前有向边滑过：下行步令牌往下穿层、当前层高亮；
 * 末步令牌从底部一路上行回到应用层、应用层高亮，表示一次调用闭环。标注 Binder 跨进程
 * 边界、HAL 屏蔽硬件差异、应用永不直接碰内核 / 硬件三个要点。
 *
 * 时序照 JniBridgeDiagram / GradleBuildPipelineDiagram：步 i 的呈现占 [BEAT*i, BEAT*(i+1)]，
 * label 落在呈现完成处 BEAT*(i+1)，离开时从该 label 起淡出（最后一步「结果返回应用层」
 * 停在亮态，表示调用已闭环），杜绝单步 off-by-one。anime.js 时间线回调里 forEach 用
 * return 跳过当前迭代（非 continue）。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 内部的动态 import("animejs") 切成独立 chunk（硬规则 2/6），本组件再经 mdx-components
 * 静态注册为客户端叶子，anime.js 绝不进首屏 / 公共 layout。
 *
 * 视觉：全部 DESIGN token 配色无裸 hex；时长走 TEACHING_BEAT_MS 具名常量（硬规则 5）；
 * 几何常量具名且为 4 的倍数。
 */

// —— 画布与层几何（全部 4 的倍数）。竖向层栈，自上而下。 ——
const VIEW_W = 720;
const VIEW_H = 580;

const LAYER_X = 160; // 层条左边（左侧给「下行 / 上行」纵向标注留白）
const LAYER_W = 400; // 层条宽
const LAYER_H = 64; // 单层高
const LAYER_GAP = 16; // 层间隙
const TOP = 40; // 第一层顶边
// ② 与 ③ 之间额外撑开的纵向间距，给「Binder 跨进程边界」虚线 + 标签留独立行（不与任何层框叠压）。
const BINDER_GAP_EXTRA = 20;

// —— 层定义（自上而下；color 为该层点亮时的语义色 token）。 ——
type Layer = {
  /** anime.js timeline label = 关键帧锚点（与 STEPS 对应）。 */
  id: string;
  /** 层主标题。 */
  title: string;
  /** 层副标题（这一层是什么 / 跑什么）。 */
  sub: string;
  /** 高亮色 token 变量名。 */
  color: string;
};

// 顺序即「自上而下」的视觉顺序。
const LAYERS: readonly Layer[] = [
  { id: "app", title: "① 应用层 App", sub: "你的 App / 系统 App", color: "var(--accent)" },
  {
    id: "framework",
    title: "② Java Framework 层",
    sub: "Camera2 / getSystemService 等 API",
    color: "var(--accent)",
  },
  {
    id: "service",
    title: "③ Binder + 系统服务",
    sub: "system_server（native）· 权限校验",
    color: "var(--warning)",
  },
  {
    id: "hal",
    title: "④ HAL 硬件抽象层",
    sub: "屏蔽各厂商硬件差异",
    color: "var(--warning)",
  },
  {
    id: "kernel",
    title: "⑤ Linux Kernel 驱动",
    sub: "驱动真正操作硬件",
    color: "var(--success)",
  },
  {
    id: "hardware",
    title: "⑥ 硬件",
    sub: "摄像头 / 传感器 / 屏幕 …",
    color: "var(--success)",
  },
];

// 层 id → 在层栈里的纵向下标（用于令牌定位与连线端点）。
const LAYER_INDEX: Record<string, number> = Object.fromEntries(
  LAYERS.map((l, i) => [l.id, i]),
);

// 第 i 层条的顶边 y。索引 ≥ 2（③ 及以下）整体下推 BINDER_GAP_EXTRA，
// 把 ② 与 ③ 之间撑出一行净空，专门给「Binder 跨进程边界」虚线 + 标签使用。
function layerTop(i: number): number {
  return TOP + i * (LAYER_H + LAYER_GAP) + (i >= 2 ? BINDER_GAP_EXTRA : 0);
}
// 第 i 层条的竖向中心 y。
function layerCenterY(i: number): number {
  return layerTop(i) + LAYER_H / 2;
}

// —— 关键帧步骤（顺序即时间顺序；caption 供控制条朗读）。 ——
// 6 步：①App 发起 → ②Framework API → ③Binder 跨到系统服务 → ④HAL → ⑤内核驱动操作硬件 → ⑥结果上行返回 App。
const STEPS: readonly TeachingStep[] = [
  {
    label: "app",
    caption:
      "① 应用层 App 发起一次 API 调用，例如 getSystemService(CAMERA_SERVICE) 拿到 CameraManager",
  },
  {
    label: "framework",
    caption:
      "② 调用进入 Java Framework 层的 API 门面（如 Camera2 / *Manager 的方法），它替你包装下层细节",
  },
  {
    label: "service",
    caption:
      "③ Framework 经 Binder 跨进程调到 native 系统服务 system_server——这是跨进程边界，权限校验在这里发生",
  },
  {
    label: "hal",
    caption:
      "④ 系统服务经 HAL 硬件抽象层下发指令，HAL 屏蔽各厂商硬件差异（同一接口，不同实现）",
  },
  {
    label: "kernel",
    caption:
      "⑤ HAL 调用 Linux Kernel 里的驱动，驱动才真正操作硬件——应用永远不直接碰内核 / 硬件",
  },
  {
    label: "result",
    caption:
      "⑥ 硬件 / 内核把结果自下而上一路返回应用层，完成一次穿层调用的闭环",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

// —— 令牌轨迹：每步令牌从「上一层中心」滑到「目标层中心」（末步从底部一路回到应用层）。 ——
// from/to 为层 id；末步 result = 硬件(底) → app(顶) 的上行。
type TokenMove = {
  /** 触发该次令牌移动的步 label。 */
  step: string;
  /** 令牌起点层 id。 */
  from: string;
  /** 令牌终点层 id。 */
  to: string;
  /** 令牌颜色（去程用 accent，跨 Binder/HAL 用 warning，触底/返回用 success）。 */
  color: string;
};

const TOKEN_X = LAYER_X + LAYER_W / 2; // 令牌走层栈竖向中轴
const TOKEN_RETURN_X = LAYER_X + LAYER_W - 24; // 上行结果走右侧轨道，与下行分线

// 每步对应一段令牌移动。app 步令牌在应用层「落地」（原地淡入）。
const TOKEN_MOVES: readonly TokenMove[] = [
  { step: "app", from: "app", to: "app", color: "var(--accent)" },
  { step: "framework", from: "app", to: "framework", color: "var(--accent)" },
  { step: "service", from: "framework", to: "service", color: "var(--warning)" },
  { step: "hal", from: "service", to: "hal", color: "var(--warning)" },
  { step: "kernel", from: "hal", to: "kernel", color: "var(--success)" },
  // ⑥ 结果上行：从硬件(底) 一路返回应用层(顶)。
  { step: "result", from: "hardware", to: "app", color: "var(--success)" },
];

const TOKEN_BY_STEP: Record<string, TokenMove> = Object.fromEntries(
  TOKEN_MOVES.map((m) => [m.step, m]),
);

// 跨进程 / 抽象边界标注：Binder 在 ② 与 ③ 之间，HAL 屏蔽在 ④ 处。
const BINDER_BOUNDARY_Y =
  (layerTop(LAYER_INDEX.framework) + LAYER_H + layerTop(LAYER_INDEX.service)) / 2;

export function LayerCallTraversalDiagram() {
  // 各层高亮层 + 令牌 的 DOM 引用，喂给 anime.js 时间线驱动。
  const layerHi = useRef<Record<string, SVGRectElement | null>>({});
  const tokenRef = useRef<SVGCircleElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, i) => {
        // 步 i 的呈现占 [BEAT*i, BEAT*(i+1)]；lit = BEAT*(i+1) = 完全呈现时刻 = label i 锚点。
        const start = TEACHING_BEAT_MS * i;
        const lit = TEACHING_BEAT_MS * (i + 1);
        const isLast = i === STEPS.length - 1;

        const move = TOKEN_BY_STEP[step.label];
        // 末步令牌上行点亮的是应用层；其余步点亮目标层。
        const litLayerId = move ? move.to : step.label;
        const litLayer = layerHi.current[litLayerId];

        // —— 令牌滑动：从 from 层中心滑到 to 层中心（下行走中轴，上行走右侧轨道）——
        if (move && tokenRef.current) {
          const isReturn = move.step === "result";
          const fromY = layerCenterY(LAYER_INDEX[move.from]);
          const toY = layerCenterY(LAYER_INDEX[move.to]);
          const x = isReturn ? TOKEN_RETURN_X : TOKEN_X;
          if (move.from === move.to) {
            // ① 应用层「落地」：令牌在应用层原地淡入（调用刚发起）。
            tl.add(
              tokenRef.current,
              {
                opacity: [0, 1],
                cx: x,
                cy: toY,
                duration: TEACHING_BEAT_MS,
                ease: "out(3)",
              },
              start,
            );
          } else {
            // 令牌沿竖轴从 from 滑到 to（去程下行 / 末步上行）。
            tl.add(
              tokenRef.current,
              {
                opacity: [1, 1],
                cx: [isReturn ? TOKEN_RETURN_X : TOKEN_X, x],
                cy: [fromY, toY],
                duration: TEACHING_BEAT_MS,
                ease: "inOut(2)",
              },
              start,
            );
          }
        }

        // —— 层高亮：当前活跃层淡入 + 描边变色；离开时淡出（末步停在亮态）——
        if (litLayer) {
          tl.add(
            litLayer,
            {
              opacity: [0, 1],
              scale: [0.97, 1],
              duration: TEACHING_BEAT_MS,
              ease: "out(3)",
            },
            start,
          );
          if (!isLast) {
            tl.add(
              litLayer,
              {
                opacity: [1, 0.18],
                duration: TEACHING_BEAT_MS * 0.5,
                ease: "in(2)",
              },
              lit,
            );
          }
        }

        // 每步 label 落在 lit（呈现完成处）。
        tl.label(step.label, lit);
      });
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
          aria-label="一次 Android API 调用如何穿越系统架构各层的工作流。画面是一条竖向层栈，自上而下六层：① 应用层 App（你的 App 或系统 App）、② Java Framework 层（如 Camera2、getSystemService 这类 API 门面）、③ Binder 加 native 系统服务（system_server，权限校验在此发生）、④ HAL 硬件抽象层（屏蔽各厂商硬件差异）、⑤ Linux Kernel 驱动（真正操作硬件）、⑥ 硬件（摄像头、传感器、屏幕等）。② 与 ③ 之间画了一条横向虚线表示 Binder 跨进程边界——这是用户进程与系统进程的分界，所有跨进程调用都经它穿过并做权限校验。整个调用分六步：① 应用层 App 发起一次 API 调用，例如 getSystemService 拿到 CameraManager；② 调用进入 Java Framework 层的 API 门面；③ 经 Binder 跨进程调到 native 系统服务 system_server，权限校验在这里发生；④ 系统服务经 HAL 硬件抽象层下发指令，HAL 屏蔽各厂商硬件差异（同一接口、不同厂商实现）；⑤ HAL 调用 Linux Kernel 里的驱动，驱动才真正操作硬件；⑥ 硬件和内核把结果自下而上一路返回应用层，完成一次穿层调用闭环。一个调用令牌先从应用层沿竖向中轴逐层下行穿过各层、点亮当前所在层，到达硬件后再沿右侧返回轨道一路上行回到应用层。关键要点：Binder 是跨进程边界、HAL 屏蔽硬件差异、应用永远不直接碰内核或硬件。可播放、暂停、单步、拖动进度逐帧观察这条穿层调用链。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id="lct-arrow-down"
              markerWidth="8"
              markerHeight="8"
              refX="3"
              refY="6"
              orient="auto"
            >
              <path d="M0 0 L6 0 L3 6 z" fill="var(--text-secondary)" />
            </marker>
            <marker
              id="lct-arrow-up"
              markerWidth="8"
              markerHeight="8"
              refX="3"
              refY="0"
              orient="auto"
            >
              <path d="M0 6 L6 6 L3 0 z" fill="var(--success)" />
            </marker>
          </defs>

          {/* —— 下行主轴（应用层 → 硬件，常驻低对比，标「下行：调用」）—— */}
          <line
            x1={TOKEN_X}
            y1={layerCenterY(0) + LAYER_H / 2}
            x2={TOKEN_X}
            y2={layerCenterY(LAYERS.length - 1) - LAYER_H / 2}
            stroke="var(--text-secondary)"
            strokeWidth="1.4"
            markerEnd="url(#lct-arrow-down)"
            opacity="0.4"
          />
          {/* —— 上行返回轨道（硬件 → 应用层，右侧分线，标「上行：结果」）—— */}
          <line
            x1={TOKEN_RETURN_X}
            y1={layerCenterY(LAYERS.length - 1) - LAYER_H / 2}
            x2={TOKEN_RETURN_X}
            y2={layerCenterY(0) + LAYER_H / 2}
            stroke="var(--success)"
            strokeWidth="1.4"
            strokeDasharray="4 4"
            markerEnd="url(#lct-arrow-up)"
            opacity="0.4"
          />

          {/* 纵向标注：左侧「下行 调用」，右侧「上行 结果」 */}
          <text
            x={LAYER_X - 96}
            y={(layerCenterY(0) + layerCenterY(LAYERS.length - 1)) / 2}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="var(--text-secondary)"
            transform={`rotate(-90 ${LAYER_X - 96} ${(layerCenterY(0) + layerCenterY(LAYERS.length - 1)) / 2})`}
          >
            ▼ 下行：调用逐层穿越
          </text>
          <text
            x={LAYER_X + LAYER_W + 88}
            y={(layerCenterY(0) + layerCenterY(LAYERS.length - 1)) / 2}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="var(--success)"
            transform={`rotate(90 ${LAYER_X + LAYER_W + 88} ${(layerCenterY(0) + layerCenterY(LAYERS.length - 1)) / 2})`}
          >
            ▲ 上行：结果返回 App
          </text>

          {/* —— Binder 跨进程边界（② 与 ③ 之间的横向虚线 + 标签）—— */}
          <line
            x1={LAYER_X - 16}
            y1={BINDER_BOUNDARY_Y}
            x2={LAYER_X + LAYER_W + 16}
            y2={BINDER_BOUNDARY_Y}
            stroke="var(--warning)"
            strokeWidth="1.4"
            strokeDasharray="6 6"
            opacity="0.8"
          />
          <text
            x={LAYER_X + LAYER_W + 16}
            y={BINDER_BOUNDARY_Y - 6}
            textAnchor="end"
            fontSize="10"
            fontWeight="700"
            fill="var(--warning)"
          >
            Binder 跨进程边界（用户进程 ↔ 系统进程）
          </text>

          {/* —— 各层：底框 + 高亮层（anime.js 驱动）+ 文字 —— */}
          {LAYERS.map((l, i) => {
            const y = layerTop(i);
            return (
              <g key={l.id}>
                {/* 底框（常驻、低对比） */}
                <rect
                  x={LAYER_X}
                  y={y}
                  width={LAYER_W}
                  height={LAYER_H}
                  rx="8"
                  fill="var(--bg)"
                  stroke="var(--border)"
                  strokeWidth="1.2"
                />
                {/* 高亮层：默认灭，当前活跃层淡入 + 描边变色 */}
                <rect
                  ref={(el) => {
                    layerHi.current[l.id] = el;
                  }}
                  x={LAYER_X}
                  y={y}
                  width={LAYER_W}
                  height={LAYER_H}
                  rx="8"
                  fill={l.color}
                  fillOpacity="0.12"
                  stroke={l.color}
                  strokeWidth="2"
                  opacity="0"
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                />
                {/* 主标题 */}
                <text
                  x={LAYER_X + 16}
                  y={y + LAYER_H / 2 - 2}
                  fontSize="14"
                  fontWeight="700"
                  fill={l.color}
                >
                  {l.title}
                </text>
                {/* 副标题 */}
                <text
                  x={LAYER_X + 16}
                  y={y + LAYER_H / 2 + 16}
                  fontSize="9.5"
                  fontFamily="var(--font-mono)"
                  fill="var(--text-secondary)"
                >
                  {l.sub}
                </text>
              </g>
            );
          })}

          {/* —— HAL 屏蔽硬件差异标注（钉在 HAL 层右侧）—— */}
          <text
            x={LAYER_X + LAYER_W + 16}
            y={layerCenterY(LAYER_INDEX.hal)}
            fontSize="10"
            fontWeight="600"
            fill="var(--warning)"
          >
            ← 同一接口
          </text>
          <text
            x={LAYER_X + LAYER_W + 16}
            y={layerCenterY(LAYER_INDEX.hal) + 14}
            fontSize="9.5"
            fontFamily="var(--font-mono)"
            fill="var(--text-secondary)"
          >
            各厂商各自实现
          </text>

          {/* —— 应用永不直接碰内核 / 硬件 标注（钉在内核层左侧）—— */}
          <text
            x={LAYER_X - 16}
            y={layerCenterY(LAYER_INDEX.kernel) - 4}
            textAnchor="end"
            fontSize="10"
            fontWeight="600"
            fill="var(--success)"
          >
            应用永不直接
          </text>
          <text
            x={LAYER_X - 16}
            y={layerCenterY(LAYER_INDEX.kernel) + 10}
            textAnchor="end"
            fontSize="10"
            fontWeight="600"
            fill="var(--success)"
          >
            碰内核 / 硬件 →
          </text>

          {/* —— 调用令牌（默认隐形，随步沿竖轴穿层 / 末步上行返回）—— */}
          <circle
            ref={(el) => {
              tokenRef.current = el;
            }}
            cx={TOKEN_X}
            cy={layerCenterY(0)}
            r="7"
            fill="var(--accent)"
            opacity="0"
          />
        </svg>

        {/* 控制条原语：播放/暂停/单步/拖进度 + 当前步文案 */}
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="点击播放，看一次 API 调用如何从应用层逐层下行穿过 Framework、Binder/系统服务、HAL、内核驱动直到硬件，再把结果上行返回应用层；可暂停、单步、拖进度逐帧观察。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        一次调用如何穿层：应用层 → Java Framework API → Binder 跨进程调系统服务 → HAL →
        Linux 内核驱动 → 硬件，结果再原路上行返回应用层。三个关键点：Binder 是跨进程边界、
        HAL 屏蔽各厂商硬件差异、应用永远不直接碰内核 / 硬件。
      </figcaption>
    </figure>
  );
}
