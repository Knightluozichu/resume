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
 * <JniBridgeDiagram>：《Android 进阶解密》low-level-tech/jni-principle 章
 * 「JNI 跨语言桥接」配图（HEL-209）。
 *
 * 「可控教学动画」：随时间线走完一次 Java 调 native 方法、控制权跨语言边界进入 C/C++
 * 执行、再经 JNIEnv 反向回调 Java、最后返回值穿回 Java 的全过程——重点看清这是一条
 * **跨语言**的调用链：调用令牌在「Java 层泳道」与「Native 层泳道」之间经 JNI 边界
 * （JNIEnv 桥）来回穿梭：
 *   ① Java 类声明 native 方法 + System.loadLibrary 加载 .so（令牌在 Java 节点淡入）→
 *   ② 调用该 native 方法，JNI 按注册方式（静态命名约定 Java_包名_类_方法 /
 *      动态 RegisterNatives 注册表，动态更优）查找映射的 C 函数 →
 *   ③ 控制权经 JNIEnv 桥跨边界进入 native C 函数执行（令牌横穿 JNI 边界去程）→
 *   ④ native 通过 JNIEnv* 反向回调 Java 方法 / 读写 Java 字段（可选，令牌横穿回程）→
 *   ⑤ native 把返回值穿回 Java 层，控制权回到 Java（令牌横穿 JNI 边界回程）。
 *
 * 每步点亮「当前活跃元素」：节点步（①②⑤里点亮节点的部分）淡入对应节点高亮层；跨语言
 * 流向步（③④⑤的令牌部分）让一段「调用令牌」小圆点沿当前有向边横穿 JNI 边界滑过 +
 * 边描边变亮，直观看清控制权是怎样从 Java 发起、跨进 native 执行、经 JNIEnv 回调 Java、
 * 再把返回值穿回 Java——而不是一条线在同一语言里串下去。
 *
 * 时序照 ComponentWorkflowDiagram / MvcDataFlowDiagram：步 i 的呈现占 [BEAT*i, BEAT*(i+1)]，
 * label 落在呈现完成处 BEAT*(i+1)，离开时从该 label 起淡出（最后一步「返回 Java」停在亮态，
 * 表示控制权已回到 Java 层、本次跨语言调用闭环），杜绝单步 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 内部的动态 import("animejs") 切成独立 chunk（硬规则 2/6），本组件再经 mdx-components
 * 静态注册为客户端叶子，anime.js 绝不进首屏 / 公共 layout。
 *
 * 视觉：Java 层节点 = --accent、Native 层节点 = --success、JNI 边界 = --warning，
 * 全部 DESIGN token 配色无裸 hex；时长走 TEACHING_BEAT_MS 具名常量（硬规则 5）；几何常量
 * 具名且为 4 的倍数。
 */

// —— 画布与节点几何（全部 4 的倍数）。 ——
const VIEW_W = 720;
const VIEW_H = 432;

const NODE_W = 196;
const NODE_H = 64;

// 两条语言泳道：左 = Java 层（JVM/ART），右 = Native 层（C/C++ .so）；中间 JNI 边界分隔。
const LANE_TOP = 64; // 泳道顶边（给上方标题 + .so 卡片留白）
const LANE_H = 320; // 泳道高度
const LANE_LEFT_X = 16; // 左泳道（Java 层）左边
const LANE_LEFT_W = 304; // 左泳道宽
const JNI_X = 360; // JNI 边界竖虚线 x（两泳道正中）
const LANE_RIGHT_X = 400; // 右泳道（Native 层）左边
const LANE_RIGHT_W = 304; // 右泳道宽

// Java 层两节点：上 = Java 类（声明 native + loadLibrary），下 = Java 方法 / 字段（回调对象）。
const JAVA_X = 48; // Java 层节点左边
const JAVA_CLASS_Y = 112; // Java 类节点顶边
const JAVA_TARGET_Y = 280; // Java 方法 / 字段节点顶边

// Native 层 C 函数节点（居中偏上，与上方两节点纵向居中对齐到边界）。
const NATIVE_X = 432; // native C 函数节点左边
const NATIVE_Y = 168; // native C 函数节点顶边
const NATIVE_H = 96; // native 节点更高（容纳「静态 / 动态注册」副信息）

// —— 节点定义（color 为该节点点亮时的语义色 token）。 ——
type Node = {
  id: string;
  title: string;
  /** 副标题（这个节点是什么 / 在干嘛）。 */
  sub: string;
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
};

const NODES: readonly Node[] = [
  {
    id: "javaClass",
    title: "Java 类",
    sub: "native 方法 · loadLibrary",
    x: JAVA_X,
    y: JAVA_CLASS_Y,
    w: NODE_W,
    h: NODE_H,
    color: "var(--accent)",
  },
  {
    id: "nativeFn",
    title: "C/C++ 函数 (.so)",
    sub: "静态命名 / RegisterNatives",
    x: NATIVE_X,
    y: NATIVE_Y,
    w: NODE_W,
    h: NATIVE_H,
    color: "var(--success)",
  },
  {
    id: "javaTarget",
    title: "Java 方法 / 字段",
    sub: "JNIEnv 反向回调对象",
    x: JAVA_X,
    y: JAVA_TARGET_Y,
    w: NODE_W,
    h: NODE_H,
    color: "var(--accent)",
  },
];

// —— 关键帧步骤（顺序即时间顺序；caption 供控制条朗读）。 ——
// 5 步知识点：①声明+加载 → ②调用+查找映射 → ③跨边界进 native → ④JNIEnv 回调 Java → ⑤返回值穿回。
const STEPS: readonly TeachingStep[] = [
  {
    label: "declare",
    caption:
      "① Java 类声明 native 方法、用 System.loadLibrary(\"xxx\") 加载对应的 .so 动态库",
  },
  {
    label: "lookup",
    caption:
      "② Java 调用该 native 方法，JNI 查找映射的 C 函数：静态按 Java_包名_类_方法 命名约定，动态查 RegisterNatives 注册表（动态更优）",
  },
  {
    label: "enter-native",
    caption:
      "③ 控制权经 JNIEnv 桥跨过 JNI 边界，进入 native 的 C/C++ 函数执行——令牌横穿边界（去程）",
  },
  {
    label: "callback",
    caption:
      "④ native 通过 JNIEnv* 指针反向回调 Java 方法 / 读写 Java 对象字段（可选）——令牌横穿回 Java 一侧",
  },
  {
    label: "return",
    caption:
      "⑤ native 把返回值穿回 Java 层，控制权回到 Java——一次跨语言调用闭环",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

// —— 节点中心 / 锚点（连线端点用）。 ——
function center(n: Node) {
  return { cx: n.x + n.w / 2, cy: n.y + n.h / 2 };
}
const C_CLASS = center(NODES[0]);
const C_NATIVE = center(NODES[1]);
const C_TARGET = center(NODES[2]);

const EDGE_GAP = 4; // 端点离节点边框的留白（4 的倍数）
const OFF = 12; // 同侧来回两向的平行偏移（4 的倍数），避免去程 / 回程压线

// —— 跨语言有向边（流向步用）。每条 = 一条常驻底线 + 一段沿线滑动的「调用令牌」。 ——
type Edge = {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
};

const EDGES: Record<string, Edge> = {
  // ③ Java 类 → C/C++ 函数（Java 层 → Native 层，横穿 JNI 边界，去程；偏上让回程不压线）
  "enter-native": {
    id: "enter-native",
    x1: NODES[0].x + NODES[0].w + EDGE_GAP,
    y1: C_CLASS.cy,
    x2: NODES[1].x - EDGE_GAP,
    y2: C_NATIVE.cy - OFF,
    color: "var(--success)",
  },
  // ④ C/C++ 函数 → Java 方法 / 字段（Native 层 → Java 层，横穿 JNI 边界，回调）
  callback: {
    id: "callback",
    x1: NODES[1].x - EDGE_GAP,
    y1: C_NATIVE.cy + OFF,
    x2: NODES[2].x + NODES[2].w + EDGE_GAP,
    y2: C_TARGET.cy,
    color: "var(--accent)",
  },
  // ⑤ C/C++ 函数 → Java 类（Native 层 → Java 层，横穿 JNI 边界，返回值穿回；偏下与去程分线）
  return: {
    id: "return",
    x1: NODES[1].x - EDGE_GAP,
    y1: C_NATIVE.cy + OFF,
    x2: NODES[0].x + NODES[0].w + EDGE_GAP,
    y2: C_CLASS.cy + OFF,
    color: "var(--success)",
  },
};

// 步 → 它点亮的节点 id（节点步）。流向步另有令牌处理；某些步既点节点又走令牌。
const STEP_NODE: Record<string, string> = {
  declare: "javaClass",
  lookup: "nativeFn",
};

// 步 → 它要让令牌横穿 JNI 边界的边 id（流向步）。
const STEP_EDGE: Record<string, string> = {
  "enter-native": "enter-native",
  callback: "callback",
  return: "return",
};

export function JniBridgeDiagram() {
  // 节点高亮层 + 跨语言边描边 + 调用令牌 的 DOM 引用，喂给 anime.js 驱动。
  const nodeHi = useRef<Record<string, SVGRectElement | null>>({});
  const edgeHi = useRef<Record<string, SVGLineElement | null>>({});
  const tokenHi = useRef<Record<string, SVGCircleElement | null>>({});

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, i) => {
        // 步 i 的呈现占 [BEAT*i, BEAT*(i+1)]；lit = BEAT*(i+1) = 完全呈现时刻 = label i 锚点。
        const start = TEACHING_BEAT_MS * i;
        const lit = TEACHING_BEAT_MS * (i + 1);
        const isLast = i === STEPS.length - 1;

        const nodeId = STEP_NODE[step.label];
        const edgeId = STEP_EDGE[step.label];

        // —— 节点步部分：淡入该节点高亮层（点亮当前活跃节点）——
        if (nodeId) {
          const el = nodeHi.current[nodeId];
          if (el) {
            tl.add(
              el,
              {
                opacity: [0, 1],
                scale: [0.96, 1],
                duration: TEACHING_BEAT_MS,
                ease: "out(3)",
              },
              start,
            );
            if (!isLast) {
              tl.add(
                el,
                {
                  opacity: [1, 0.18],
                  duration: TEACHING_BEAT_MS * 0.5,
                  ease: "in(2)",
                },
                lit,
              );
            }
          }
        }

        // —— 跨语言流向步部分：边描边淡亮 + 调用令牌横穿 JNI 边界滑过 ——
        if (edgeId) {
          const e = EDGES[edgeId];
          const edge = edgeHi.current[edgeId];
          const token = tokenHi.current[edgeId];
          if (edge) {
            tl.add(
              edge,
              {
                opacity: [0.2, 1],
                duration: TEACHING_BEAT_MS * 0.5,
                ease: "out(2)",
              },
              start,
            );
          }
          if (token && e) {
            tl.add(
              token,
              {
                opacity: [0, 1, 1, 0],
                cx: [e.x1, e.x2],
                cy: [e.y1, e.y2],
                duration: TEACHING_BEAT_MS,
                ease: "inOut(2)",
              },
              start,
            );
          }
          if (edge && !isLast) {
            tl.add(
              edge,
              {
                opacity: [1, 0.2],
                duration: TEACHING_BEAT_MS * 0.5,
                ease: "in(2)",
              },
              lit,
            );
          }
        }

        // 每步的 label 都落在 lit（呈现完成处）——无论节点步 / 流向步。
        tl.label(step.label, lit);
      });
    },
  });

  const animatedEdges: readonly Edge[] = [
    EDGES["enter-native"],
    EDGES.callback,
    EDGES.return,
  ];

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
          aria-label="JNI 跨语言桥接的工作流。画面分成左右两条语言泳道：左泳道是「Java 层」（运行在 JVM / ART 上），右泳道是「Native 层」（C/C++ 编译出的 .so 动态库），中间用一条竖直虚线表示 JNI 边界，并标注它就是 JNIEnv 桥——Java 与 native 之间所有调用都经它穿过。Java 层里有两个节点：上方是 Java 类（声明 native 方法并用 System.loadLibrary 加载 .so），下方是 Java 方法 / 字段（native 反向回调时操作的对象）；Native 层里是 C/C++ 函数节点，它有两种被找到的方式——静态注册按 Java_包名_类_方法 的命名约定、动态注册查 RegisterNatives 建立的注册表（动态注册更优，Android Framework 全部采用）。整个工作流分五步：① Java 类声明 native 方法、用 System.loadLibrary 加载对应的 .so 动态库；② Java 调用该 native 方法，JNI 按注册方式查找映射的 C 函数；③ 控制权经 JNIEnv 桥横穿 JNI 边界，进入 native 的 C/C++ 函数执行；④ native 通过 JNIEnv 指针反向回调 Java 方法或读写 Java 对象字段，调用令牌横穿边界跨回 Java 一侧（这一步可选）；⑤ native 把返回值穿回 Java 层，控制权回到 Java，完成一次跨语言调用闭环。播放时按此顺序依次点亮当前活跃节点，或让调用令牌沿有向边横穿中间的 JNI 边界来回流动——去程从 Java 进入 native、回程经 JNIEnv 回调 Java、再把返回值穿回 Java，可播放、暂停、单步、拖动进度逐帧观察这条跨语言调用链。图中还标注了 JNIEnv（线程绑定的执行环境）、JavaVM（进程级虚拟机）、local ref（本地引用表）等关键概念。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id="jni-arrow-accent"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
            <marker
              id="jni-arrow-success"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--success)" />
            </marker>
          </defs>

          {/* —— 两条语言泳道（常驻底框，淡边框 + 极淡填充区分左右语言）—— */}
          <g>
            {/* 左泳道：Java 层 */}
            <rect
              x={LANE_LEFT_X}
              y={LANE_TOP}
              width={LANE_LEFT_W}
              height={LANE_H}
              rx="12"
              fill="var(--accent)"
              fillOpacity="0.04"
              stroke="var(--border)"
              strokeWidth="1.2"
            />
            <text
              x={LANE_LEFT_X + 16}
              y={LANE_TOP + 20}
              fontSize="12"
              fontWeight="700"
              fill="var(--accent)"
            >
              Java 层（JVM / ART）
            </text>
            {/* 右泳道：Native 层 */}
            <rect
              x={LANE_RIGHT_X}
              y={LANE_TOP}
              width={LANE_RIGHT_W}
              height={LANE_H}
              rx="12"
              fill="var(--success)"
              fillOpacity="0.04"
              stroke="var(--border)"
              strokeWidth="1.2"
            />
            <text
              x={LANE_RIGHT_X + LANE_RIGHT_W - 16}
              y={LANE_TOP + 20}
              textAnchor="end"
              fontSize="12"
              fontWeight="700"
              fill="var(--success)"
            >
              Native 层（C/C++ .so）
            </text>
          </g>

          {/* —— JNI 边界（竖直虚线 + JNIEnv 桥标签）—— */}
          <g>
            <line
              x1={JNI_X}
              y1={LANE_TOP - 8}
              x2={JNI_X}
              y2={LANE_TOP + LANE_H + 8}
              stroke="var(--warning)"
              strokeWidth="1.4"
              strokeDasharray="6 6"
              opacity="0.8"
            />
            <text
              x={JNI_X}
              y={LANE_TOP - 24}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="var(--warning)"
            >
              JNI 边界
            </text>
            <text
              x={JNI_X}
              y={LANE_TOP - 12}
              textAnchor="middle"
              fontSize="9.5"
              fontFamily="var(--font-mono)"
              fill="var(--warning)"
            >
              JNIEnv 桥
            </text>
            {/* JavaVM 提示（进程级，钉在边界底部） */}
            <text
              x={JNI_X}
              y={LANE_TOP + LANE_H + 22}
              textAnchor="middle"
              fontSize="9.5"
              fontFamily="var(--font-mono)"
              fill="var(--text-secondary)"
            >
              JavaVM：进程级
            </text>
          </g>

          {/* —— 跨语言有向边（常驻低对比底线 + anime.js 点亮的高亮线 + 调用令牌）—— */}
          {animatedEdges.map((e) => {
            const isAccent = e.color === "var(--accent)";
            const marker = isAccent
              ? "url(#jni-arrow-accent)"
              : "url(#jni-arrow-success)";
            return (
              <g key={e.id}>
                {/* 底线（常驻、低对比） */}
                <line
                  x1={e.x1}
                  y1={e.y1}
                  x2={e.x2}
                  y2={e.y2}
                  stroke="var(--text-secondary)"
                  strokeWidth="1.4"
                  markerEnd={marker}
                  opacity="0.45"
                />
                {/* 高亮线（默认半灭，该步淡亮） */}
                <line
                  ref={(el) => {
                    edgeHi.current[e.id] = el;
                  }}
                  x1={e.x1}
                  y1={e.y1}
                  x2={e.x2}
                  y2={e.y2}
                  stroke={e.color}
                  strokeWidth="2.4"
                  markerEnd={marker}
                  opacity="0.2"
                />
                {/* 调用令牌（默认隐形，跨语言流向步沿线横穿 JNI 边界滑过） */}
                <circle
                  ref={(el) => {
                    tokenHi.current[e.id] = el;
                  }}
                  cx={e.x1}
                  cy={e.y1}
                  r="6"
                  fill={e.color}
                  opacity="0"
                />
              </g>
            );
          })}

          {/* —— 节点：底框 + 高亮层（anime.js 驱动，节点步）+ 文字 —— */}
          {NODES.map((n) => (
            <g key={n.id}>
              {/* 底框（常驻、低对比） */}
              <rect
                x={n.x}
                y={n.y}
                width={n.w}
                height={n.h}
                rx="8"
                fill="var(--bg)"
                stroke="var(--border)"
                strokeWidth="1.2"
              />
              {/* 高亮层：默认灭，节点步淡入 + 描边变色 */}
              <rect
                ref={(el) => {
                  nodeHi.current[n.id] = el;
                }}
                x={n.x}
                y={n.y}
                width={n.w}
                height={n.h}
                rx="8"
                fill={n.color}
                fillOpacity="0.12"
                stroke={n.color}
                strokeWidth="2"
                opacity="0"
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              />
              {/* 标题 */}
              <text
                x={n.x + n.w / 2}
                y={n.y + n.h / 2 - 4}
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fill={n.color}
              >
                {n.title}
              </text>
              {/* 副标题 */}
              <text
                x={n.x + n.w / 2}
                y={n.y + n.h / 2 + 14}
                textAnchor="middle"
                fontSize="9.5"
                fontFamily="var(--font-mono)"
                fill="var(--text-secondary)"
              >
                {n.sub}
              </text>
            </g>
          ))}

          {/* —— .so 加载卡片（钉在 Java 类上方，强调 loadLibrary 加载动态库）—— */}
          <g>
            <rect
              x={JAVA_X}
              y={JAVA_CLASS_Y - 40}
              width={NODE_W}
              height={28}
              rx="8"
              fill="var(--bg)"
              stroke="var(--accent)"
              strokeWidth="1.2"
              opacity="0.9"
            />
            <text
              x={JAVA_X + NODE_W / 2}
              y={JAVA_CLASS_Y - 22}
              textAnchor="middle"
              fontSize="9.5"
              fontFamily="var(--font-mono)"
              fill="var(--accent)"
            >
              System.loadLibrary(&quot;xxx&quot;)
            </text>
          </g>

          {/* —— 注册方式提示（钉在 native 节点下方，标注动态更优）—— */}
          <text
            x={C_NATIVE.cx}
            y={NATIVE_Y + NATIVE_H + 18}
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--success)"
          >
            动态 RegisterNatives 更优
          </text>
          {/* local ref 本地引用表提示（钉在 native 节点下方第二行） */}
          <text
            x={C_NATIVE.cx}
            y={NATIVE_Y + NATIVE_H + 32}
            textAnchor="middle"
            fontSize="9.5"
            fontFamily="var(--font-mono)"
            fill="var(--text-secondary)"
          >
            local ref：本地引用表
          </text>

          {/* —— 步骤序号标注（小而稳，常驻，帮读者把动画与第几步对齐）—— */}
          <text
            x={C_CLASS.cx}
            y={JAVA_CLASS_Y + NODE_H + 16}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            ① 声明 + 加载 · ② 查找映射
          </text>
          <text
            x={C_NATIVE.cx}
            y={NATIVE_Y - 12}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--success)"
          >
            ③ 进入 native →
          </text>
          <text
            x={C_TARGET.cx}
            y={JAVA_TARGET_Y + NODE_H + 16}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            ④ ← JNIEnv 回调 · ⑤ ← 返回值穿回
          </text>
        </svg>

        {/* 控制条原语：播放/暂停/单步/拖进度 + 当前步文案 */}
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="点击播放，看一次 Java 如何声明并加载 native 方法、经 JNIEnv 桥跨过 JNI 边界进入 C/C++ 执行、再经 JNIEnv 回调 Java、最后把返回值穿回 Java；可暂停、单步、拖进度逐帧观察这条跨语言调用链。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        JNI 跨语言桥接：Java 类声明 native + loadLibrary 加载 .so → 调用时按注册方式（静态命名
        约定 / 动态 RegisterNatives，动态更优）查找 C 函数 → 控制权经 JNIEnv 桥跨 JNI 边界进入
        native 执行 → native 经 JNIEnv 反向回调 Java（可选）→ 返回值穿回 Java。关键是这是一条
        **跨语言**调用链：令牌在 Java / Native 两条泳道间经 JNI 边界来回穿梭。
      </figcaption>
    </figure>
  );
}
