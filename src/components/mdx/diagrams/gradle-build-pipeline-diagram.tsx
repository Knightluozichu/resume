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
 * <GradleBuildPipelineDiagram>：《Android 编程权威指南》first-app 章「Gradle 构建」配图（HEL-171）。
 *
 * 「可控教学动画」：7 阶段横向构建流水线，随时间线依次点亮当前工位，看清源码如何
 * 一步步变成装进设备的 APK：
 *   源码(.kt/.java) → 编译(kotlinc/javac→.class) → D8/R8(→classes.dex) →
 *   资源(AAPT2→resources.arsc) → 打包(→APK) → 签名(apksigner) → 安装(adb install→设备)
 *
 * 时序照 ActivityLifecycleDiagram：节点 i 的淡入占 [BEAT*i, BEAT*(i+1)]，label 落在
 * 淡入完成处 BEAT*(i+1)，离开时从该 label 起淡出（最后一阶段不淡出，停在亮态）。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 内部的动态 import("animejs") 切成独立 chunk（硬规则 2/6），本组件再经 mdx-components
 * 静态注册为客户端叶子，anime.js 绝不进首屏 / 公共 layout。
 *
 * 视觉：全部 DESIGN token 配色，无裸 hex；时长走 TEACHING_BEAT_MS 具名常量（硬规则 5）。
 */

// —— 流水线工位定义（横向排列）。color 为该工位点亮时的语义色 token。 ——
type Stage = {
  /** anime.js timeline label = 关键帧锚点（与 STEPS 对应）。 */
  id: string;
  /** 工位主标题（这一步在干嘛）。 */
  title: string;
  /** 工位副标题（用什么工具 / 产出什么）。 */
  sub: string;
  /** 高亮色 token 变量名。 */
  color: string;
};

const STAGES: readonly Stage[] = [
  { id: "source", title: "源码", sub: ".kt / .java", color: "var(--text-primary)" },
  { id: "compile", title: "编译", sub: "kotlinc/javac → .class", color: "var(--accent)" },
  { id: "dex", title: "D8 / R8", sub: "→ classes.dex", color: "var(--accent)" },
  { id: "resource", title: "资源", sub: "AAPT2 → resources.arsc", color: "var(--accent)" },
  { id: "package", title: "打包", sub: "→ 未签名 APK", color: "var(--warning)" },
  { id: "sign", title: "签名", sub: "apksigner", color: "var(--warning)" },
  { id: "install", title: "安装", sub: "adb install → 设备", color: "var(--success)" },
];

// —— 关键帧步骤（顺序即时间顺序；caption 供控制条朗读）。 ——
const STEPS: readonly TeachingStep[] = [
  { label: "source", caption: "源码：你写的 Kotlin / Java 文件，是这条流水线的原料" },
  { label: "compile", caption: "编译：kotlinc / javac 把源码编成 JVM 字节码 .class" },
  { label: "dex", caption: "D8/R8：把 .class 转成 Android 专用的 classes.dex（R8 还做压缩与混淆）" },
  { label: "resource", caption: "资源：AAPT2 编译 res/ 与清单，生成 resources.arsc 资源表" },
  { label: "package", caption: "打包：DEX + 资源 + 清单一起压进一个未签名的 APK" },
  { label: "sign", caption: "签名：apksigner 给 APK 加数字签名（debug 模式自动用 debug 证书）" },
  { label: "install", caption: "安装：adb install 把签好名的 APK 推到模拟器 / 真机上跑起来" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

// —— 布局常量（间距走 4 倍数；节点等宽横排，箭头连接）。 ——
const NODE_W = 132;
const NODE_H = 64;
const GAP = 28; // 节点间隙（留给箭头）
const X0 = 16;
const TOP = 40;
const VIEW_W = X0 * 2 + STAGES.length * NODE_W + (STAGES.length - 1) * GAP;
const VIEW_H = TOP + NODE_H + 40;

export function GradleBuildPipelineDiagram() {
  // 收集每个工位高亮层的 DOM 引用，喂给 anime.js 时间线驱动。
  const highlightRefs = useRef<Record<string, SVGRectElement | null>>({});

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, i) => {
        const el = highlightRefs.current[step.label];
        if (!el) return;
        // 节点 i 淡入占 [BEAT*i, BEAT*(i+1)]；lit = BEAT*(i+1) = 完全点亮时刻 = label i 锚点。
        const lit = TEACHING_BEAT_MS * (i + 1);
        tl.add(
          el,
          {
            opacity: [0, 1],
            scale: [0.96, 1],
            duration: TEACHING_BEAT_MS,
            ease: "out(3)",
          },
          TEACHING_BEAT_MS * i,
        );
        tl.label(step.label, lit);
        // 离开第 i 步从 lit 起淡出（最后一阶段 install 停在亮态，表示 APK 已就位）。
        if (i < STEPS.length - 1) {
          tl.add(
            el,
            { opacity: [1, 0.18], duration: TEACHING_BEAT_MS * 0.5, ease: "in(2)" },
            lit,
          );
        }
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
          aria-label="Gradle 构建流水线，7 个工位从左到右串联：① 源码（.kt/.java，原料）→ ② 编译（kotlinc/javac 生成 .class 字节码）→ ③ D8/R8（转成 Android 的 classes.dex，R8 还压缩混淆）→ ④ 资源（AAPT2 编译 res 与清单，生成 resources.arsc）→ ⑤ 打包（DEX、资源、清单一起压进未签名 APK）→ ⑥ 签名（apksigner 加数字签名）→ ⑦ 安装（adb install 推到设备运行）。播放时按此顺序依次点亮当前工位，可播放、暂停、单步、拖动进度逐帧观察源码如何一步步变成装进手机的 APK。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="gbp-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* —— 工位间箭头（横向接力）—— */}
          {STAGES.slice(0, -1).map((s, i) => {
            const x1 = X0 + (i + 1) * NODE_W + i * GAP;
            const x2 = X0 + (i + 1) * NODE_W + (i + 1) * GAP;
            const y = TOP + NODE_H / 2;
            return (
              <line
                key={`arrow-${s.id}`}
                x1={x1 + 3}
                y1={y}
                x2={x2 - 4}
                y2={y}
                stroke="var(--text-secondary)"
                strokeWidth="1.4"
                markerEnd="url(#gbp-arrow)"
                opacity="0.7"
              />
            );
          })}

          {/* —— 工位节点：底框 + 高亮层（anime.js 驱动）+ 序号 + 文字 —— */}
          {STAGES.map((s, i) => {
            const x = X0 + i * (NODE_W + GAP);
            return (
              <g key={s.id}>
                {/* 底框（常驻，低对比） */}
                <rect
                  x={x}
                  y={TOP}
                  width={NODE_W}
                  height={NODE_H}
                  rx="8"
                  fill="var(--bg)"
                  stroke="var(--border)"
                  strokeWidth="1.2"
                />
                {/* 高亮层：默认灭，anime.js 点亮时淡入 + 描边变色 */}
                <rect
                  ref={(el) => {
                    highlightRefs.current[s.id] = el;
                  }}
                  x={x}
                  y={TOP}
                  width={NODE_W}
                  height={NODE_H}
                  rx="8"
                  fill={s.color}
                  fillOpacity="0.12"
                  stroke={s.color}
                  strokeWidth="2"
                  opacity="0"
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                />
                {/* 序号徽标 */}
                <text
                  x={x + 12}
                  y={TOP + 18}
                  fontSize="10"
                  fontWeight="700"
                  fill="var(--text-secondary)"
                >
                  {`0${i + 1}`}
                </text>
                {/* 主标题 */}
                <text
                  x={x + NODE_W / 2}
                  y={TOP + 32}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {s.title}
                </text>
                {/* 副标题（工具 / 产物） */}
                <text
                  x={x + NODE_W / 2}
                  y={TOP + 50}
                  textAnchor="middle"
                  fontSize="9.5"
                  fontFamily="var(--font-mono)"
                  fill="var(--text-secondary)"
                >
                  {s.sub}
                </text>
              </g>
            );
          })}

          {/* 起点 / 终点标注 */}
          <text
            x={X0 + NODE_W / 2}
            y={TOP - 10}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            ▼ 原料
          </text>
          <text
            x={VIEW_W - X0 - NODE_W / 2}
            y={TOP - 10}
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--success)"
          >
            ▼ 跑在设备上
          </text>
        </svg>

        {/* 控制条原语：播放/暂停/单步/拖进度 + 当前步文案 */}
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="点击播放，看 Gradle 把源码逐工位加工成 APK；可暂停、单步、拖进度逐帧观察。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Gradle 构建流水线：源码 → 编译 → D8/R8 转 DEX → AAPT2 编资源 → 打包 → 签名 →
        adb 安装。你点的那一下「Run」，背后就是这条流水线在依次跑完每个工位。
      </figcaption>
    </figure>
  );
}
