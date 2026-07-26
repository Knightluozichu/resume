"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh06SingletonAccess>：单例全局唯一实例与访问点机制动画（GPP 第6章 · 图1）。
 *
 * 核心：保证一个类只有一个实例，并提供全局访问点——但这两件事常被一起滥用。
 *
 * 场景：AudioPlayer::instance() 被渲染、UI、脚本、物理多处调用，全部汇聚到唯一的
 * AudioPlayer 实例。它同时捆绑了"唯一实例"和"全局访问"两个问题，多数时候你只需要其一。
 *
 * 节拍：
 *  ① 唯一的 AudioPlayer 实例（全局唯一）
 *  ② 多个调用方都要用音频（渲染/UI/脚本/物理）
 *  ③ 调用方都通过 ::instance() 汇聚到同一个实例
 *  ④ 单例同时解决两个问题：限制实例唯一 + 提供全局访问点
 *  ⑤ 为何后悔：本质是全局变量，隐式依赖蔓延、难以测试
 *  ⑥ 你往往只需要其一：唯一→工厂/断言；访问→服务定位器/依赖注入
 */

const VIEW_W = 720;
const VIEW_H = 480;

const ACCENT = "var(--accent)";
const OK_COLOR = "#3FB97F";
const WARN_COLOR = "#E5675C";

const T = TEACHING_BEAT_MS;

const CALLERS = [
  { name: "渲染系统", x: 90, y: 110 },
  { name: "UI 系统", x: 90, y: 180 },
  { name: "脚本引擎", x: 90, y: 250 },
  { name: "物理系统", x: 90, y: 320 },
];

const INSTANCE = { x: 360, y: 215 };

const STEPS: readonly TeachingStep[] = [
  { label: "instance", caption: "唯一的 AudioPlayer 实例：全局只有一个" },
  { label: "callers", caption: "多个调用方都要用音频：渲染、UI、脚本、物理" },
  { label: "converge", caption: "调用方都通过 ::instance() 汇聚到同一个实例" },
  { label: "two", caption: "单例同时解决两个问题：① 限制实例唯一 ② 提供全局访问点" },
  { label: "regret", caption: "为何后悔：本质是全局变量——隐式依赖蔓延、难以测试与替换" },
  { label: "insight", caption: "你往往只需要其一：唯一实例→工厂/断言；方便访问→服务定位器/依赖注入" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh06SingletonAccess() {
  const instanceRef = useRef<SVGGElement | null>(null);
  const callersRef = useRef<SVGGElement | null>(null);
  const arrowsRef = useRef<SVGGElement | null>(null);
  const twoRef = useRef<SVGGElement | null>(null);
  const regretRef = useRef<SVGGElement | null>(null);
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① instance（t: 0→T）：唯一实例浮现
      tl.add(instanceRef.current!, { opacity: [0, 1], scale: [0.8, 1], duration: T * 0.6, ease: "out(3)" }, 0);
      tl.label("instance", 0);

      // ② callers（t: T→2T）：调用方逐个浮现
      tl.add(callersRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T);
      tl.label("callers", T);

      // ③ converge（t: 2T→3T）：汇聚箭头亮起
      tl.add(arrowsRef.current!, { opacity: [0, 1], duration: T * 0.7, ease: "out(3)" }, T * 2);
      tl.label("converge", T * 2);

      // ④ two（t: 3T→4T）：两个问题卡片浮现
      tl.add(twoRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3);
      tl.label("two", T * 3);

      // ⑤ regret（t: 4T→5T）：后悔卡片浮现
      tl.add(regretRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 4);
      tl.label("regret", T * 4);

      // ⑥ insight（t: 5T→6T）：结论浮现
      tl.add(insightRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T * 5);
      tl.label("insight", T * 5);
    },
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-6">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">1️⃣</span>
            机制
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="单例模式机制动画。唯一的 AudioPlayer 实例全局只有一个；渲染、UI、脚本、物理等多个调用方都要用音频，它们都通过 instance 方法汇聚到同一个实例。单例同时解决两个问题：限制实例唯一、提供全局访问点。但它本质是全局变量，会让隐式依赖蔓延、难以测试与替换，这是后悔的原因。你往往只需要其中之一：只需唯一实例可用工厂或断言，只需方便访问可用服务定位器或依赖注入。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="gpp06-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            单例：全局唯一实例 + 全局访问点
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            多处调用都汇聚到同一个实例——但它把两个问题捆在了一起
          </text>

          {/* 调用方 */}
          <g ref={callersRef} style={{ opacity: 0 }}>
            <text x="60" y="86" fontSize="11" fontWeight="700" fill="var(--text-secondary)">
              调用方（都要用音频）
            </text>
            {CALLERS.map((c) => (
              <g key={c.name}>
                <rect x={c.x - 50} y={c.y - 22} width={110} height={44} rx="8" fill="var(--text-secondary)" fillOpacity="0.07" stroke="var(--border)" strokeWidth="1.4" />
                <text x={c.x + 5} y={c.y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">{c.name}</text>
              </g>
            ))}
          </g>

          {/* 汇聚箭头 */}
          <g ref={arrowsRef} style={{ opacity: 0 }}>
            {CALLERS.map((c) => (
              <line key={`arrow-${c.name}`} x1={c.x + 60} y1={c.y} x2={INSTANCE.x - 70} y2={INSTANCE.y} stroke="var(--text-secondary)" strokeWidth="1.3" strokeOpacity="0.7" markerEnd="url(#gpp06-arrow)" />
            ))}
          </g>

          {/* 唯一实例 */}
          <g ref={instanceRef} style={{ opacity: 0 }}>
            <rect x={INSTANCE.x - 70} y={INSTANCE.y - 46} width={150} height={92} rx="12" fill={ACCENT} fillOpacity="0.16" stroke={ACCENT} strokeWidth="2.6" />
            <text x={INSTANCE.x + 5} y={INSTANCE.y - 16} textAnchor="middle" fontSize="13" fontWeight="700" fill={ACCENT}>🔊 AudioPlayer</text>
            <text x={INSTANCE.x + 5} y={INSTANCE.y + 4} textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">::instance()</text>
            <text x={INSTANCE.x + 5} y={INSTANCE.y + 26} textAnchor="middle" fontSize="11" fontWeight="700" fill={ACCENT}>全局唯一</text>
          </g>

          {/* 两个问题 */}
          <g ref={twoRef} style={{ opacity: 0 }}>
            <rect x="500" y="90" width="190" height="120" rx="10" fill={OK_COLOR} fillOpacity="0.07" stroke={OK_COLOR} strokeWidth="1.4" />
            <text x="516" y="114" fontSize="11" fontWeight="700" fill={OK_COLOR}>单例解决两个问题</text>
            <text x="516" y="138" fontSize="11" fill="var(--text-primary)">① 限制实例唯一</text>
            <text x="516" y="158" fontSize="11" fill="var(--text-primary)">② 提供全局访问点</text>
            <text x="516" y="186" fontSize="11" fontWeight="700" fill={OK_COLOR}>你往往只需要其一</text>
          </g>

          {/* 为何后悔 */}
          <g ref={regretRef} style={{ opacity: 0 }}>
            <rect x="500" y="226" width="190" height="120" rx="10" fill={WARN_COLOR} fillOpacity="0.07" stroke={WARN_COLOR} strokeWidth="1.4" />
            <text x="516" y="250" fontSize="11" fontWeight="700" fill={WARN_COLOR}>为何后悔</text>
            <text x="516" y="272" fontSize="11" fill="var(--text-primary)">本质是全局变量：</text>
            <text x="516" y="290" fontSize="11" fill="var(--text-secondary)">隐式依赖蔓延</text>
            <text x="516" y="306" fontSize="11" fill="var(--text-secondary)">难以测试与替换</text>
            <text x="516" y="328" fontSize="11" fill="var(--text-secondary)">只有一个问题时也被迫引入</text>
          </g>

          {/* 结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="40" y="380" width="640" height="56" rx="10" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="56" y="404" fontSize="12" fontWeight="700" fill={OK_COLOR}>只需唯一实例 → 工厂/断言；只需方便访问 → 服务定位器/依赖注入</text>
            <text x="56" y="424" fontSize="11" fill="var(--text-secondary)">把"唯一"和"访问"拆开，别用一个单例同时背两件事</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="单例把'实例唯一'和'全局访问'捆在一起，而你往往只需要其一。作为全局变量它会让隐式依赖蔓延、难以测试。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        单例（Singleton）：保证一个类只有一个实例，并提供一个全局访问点。它同时捆绑了
        "限制实例唯一"和"提供全局访问"两件事，而你往往只需要其中之一。
      </figcaption>
    </figure>
  );
}
