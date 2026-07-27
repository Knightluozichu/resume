"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <HfdRealWorldDiagram>：真实世界中的模式动画（Head First 设计模式 · 第13章）。
 *
 * 核心：模式不是纸上谈兵——它们早已藏在你每天用的框架里（Java I/O 是装饰器，
 * Swing 是观察者+组合+适配器）。模式的定义是「特定情境下问题的解决方案」；
 * 正确姿势是先有问题再找模式、复用成熟经验，而不是为用模式而造问题。
 *
 * 节拍：
 *  ① 定义：模式 = 特定情境（Context）下，某个问题（Problem）的解决方案（Solution）
 *  ② Java I/O：BufferedInputStream 包裹 FileInputStream——装饰器就在手边
 *  ③ Swing：事件监听是观察者，组件嵌套是组合，WindowAdapter 是适配器
 *  ④ 复用：模式是共享经验的结晶——拿来用，不必重新发明
 *  ⑤ 姿势：先有问题再找模式，按需调整——模式是经验不是教条
 */

const VIEW_W = 720;
const VIEW_H = 455;

const ACCENT = "var(--accent)";
const IO_COLOR = "#5AA9E6";
const SWING_COLOR = "#C792EA";
const OK_COLOR = "#3FB97F";

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  { label: "definition", caption: "模式 = 特定情境下，某个问题的解决方案——三要素缺一不可" },
  { label: "javaio", caption: "Java I/O 就是装饰器：BufferedInputStream 包裹 FileInputStream 加缓冲" },
  { label: "swing", caption: "Swing 里到处都是模式：事件监听=观察者、组件嵌套=组合、WindowAdapter=适配器" },
  { label: "reuse", caption: "模式是无数工程师共享经验的结晶——复用成熟方案，不必重新发明轮子" },
  { label: "approach", caption: "正确姿势：先有问题再找模式，按需调整——模式是经验，不是教条" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function HfdRealWorldDiagram() {
  const defRef = useRef<SVGGElement | null>(null);
  const ioRef = useRef<SVGGElement | null>(null);
  const swingRef = useRef<SVGGElement | null>(null);
  const reuseRef = useRef<SVGGElement | null>(null);
  const conclusionRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① definition（0→T）：三要素
      tl.add(defRef.current!, { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" }, 0);
      tl.label("definition", 0);

      // ② javaio（T→2T）
      tl.add(ioRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("javaio", T);

      // ③ swing（2T→3T）
      tl.add(swingRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2);
      tl.label("swing", T * 2);

      // ④ reuse（3T→4T）
      tl.add(reuseRef.current!, { opacity: [0, 1], duration: T * 0.45, ease: "out(3)" }, T * 3);
      tl.label("reuse", T * 3);

      // ⑤ approach（4T→5T）
      tl.add(conclusionRef.current!, { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" }, T * 4);
      tl.label("approach", T * 4);
    },
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-6">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">⚡</span>
            可交互
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="真实世界中的模式动画。模式的定义是特定情境下某个问题的解决方案，包含问题、解决方案、情境三要素。Java I/O 就是装饰器模式，BufferedInputStream 包裹 FileInputStream 增加缓冲。Swing 里事件监听是观察者、组件嵌套是组合、WindowAdapter 是适配器。模式是共享经验的结晶，应当复用成熟方案。正确姿势是先有问题再找模式、按需调整，模式是经验不是教条。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            真实世界中的模式
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            模式早已藏在你每天用的框架里——识别它们，复用它们
          </text>

          {/* 定义三要素 */}
          <g ref={defRef} style={{ opacity: 0 }}>
            <rect x={60} y={85} width={160} height={56} rx="9" fill={ACCENT} fillOpacity="0.1" stroke={ACCENT} strokeWidth="1.6" />
            <text x={140} y={108} textAnchor="middle" fontSize="12" fontWeight="700" fill={ACCENT}>
              Problem
            </text>
            <text x={140} y={128} textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
              要解决的问题
            </text>

            <rect x={280} y={85} width={160} height={56} rx="9" fill={ACCENT} fillOpacity="0.16" stroke={ACCENT} strokeWidth="2" />
            <text x={360} y={108} textAnchor="middle" fontSize="12" fontWeight="700" fill={ACCENT}>
              Pattern = 方案
            </text>
            <text x={360} y={128} textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
              被验证的解决方案
            </text>

            <rect x={500} y={85} width={160} height={56} rx="9" fill={ACCENT} fillOpacity="0.1" stroke={ACCENT} strokeWidth="1.6" />
            <text x={580} y={108} textAnchor="middle" fontSize="12" fontWeight="700" fill={ACCENT}>
              Context
            </text>
            <text x={580} y={128} textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
              适用的具体情境
            </text>

            <line x1={222} y1={113} x2={278} y2={113} stroke={ACCENT} strokeWidth="1.5" />
            <polygon points="278,113 270,109 270,117" fill={ACCENT} />
            <line x1={442} y1={113} x2={498} y2={113} stroke={ACCENT} strokeWidth="1.5" />
            <polygon points="498,113 490,109 490,117" fill={ACCENT} />
          </g>

          {/* Java I/O 卡片 */}
          <g ref={ioRef} style={{ opacity: 0 }}>
            <rect x={48} y={170} width={300} height={125} rx="10" fill={IO_COLOR} fillOpacity="0.1" stroke={IO_COLOR} strokeWidth="1.8" />
            <text x={198} y={195} textAnchor="middle" fontSize="12" fontWeight="700" fill={IO_COLOR}>
              Java I/O · 装饰器
            </text>
            <text x={62} y={220} fontSize="10" fontFamily="monospace" fill="var(--text-primary)">
              new BufferedInputStream(
            </text>
            <text x={82} y={238} fontSize="10" fontFamily="monospace" fill="var(--text-primary)">
              new FileInputStream(f))
            </text>
            <text x={62} y={262} fontSize="9" fill="var(--text-secondary)">
              层层包裹加功能——你天天在用装饰器
            </text>
            <text x={62} y={280} fontSize="9" fill="var(--text-secondary)">
              只是它藏在了 API 背后
            </text>
          </g>

          {/* Swing 卡片 */}
          <g ref={swingRef} style={{ opacity: 0 }}>
            <rect x={372} y={170} width={300} height={125} rx="10" fill={SWING_COLOR} fillOpacity="0.1" stroke={SWING_COLOR} strokeWidth="1.8" />
            <text x={522} y={195} textAnchor="middle" fontSize="12" fontWeight="700" fill={SWING_COLOR}>
              Swing · 观察者 + 组合 + 适配器
            </text>
            <text x={386} y={220} fontSize="10" fontFamily="monospace" fill="var(--text-primary)">
              addActionListener(l) → 观察者
            </text>
            <text x={386} y={240} fontSize="10" fontFamily="monospace" fill="var(--text-primary)">
              JPanel 嵌套组件 → 组合
            </text>
            <text x={386} y={260} fontSize="10" fontFamily="monospace" fill="var(--text-primary)">
              WindowAdapter → 适配器
            </text>
            <text x={386} y={282} fontSize="9" fill="var(--text-secondary)">
              一个 GUI 框架 = 多个模式的复合
            </text>
          </g>

          {/* 复用 */}
          <g ref={reuseRef} style={{ opacity: 0 }}>
            <rect x={48} y={315} width={624} height={50} rx="9" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.5" />
            <text x={360} y={336} textAnchor="middle" fontSize="12" fontWeight="700" fill={OK_COLOR}>
              模式 = 共享经验的结晶
            </text>
            <text x={360} y={355} textAnchor="middle" fontSize="10" fill="var(--text-primary)">
              别人踩过的坑、验证过的方案——拿来复用，不必重新发明轮子
            </text>
          </g>

          {/* 结论 */}
          <g ref={conclusionRef} style={{ opacity: 0 }}>
            <rect x={90} y={385} width={540} height={44} rx="8" fill={ACCENT} fillOpacity="0.1" stroke={ACCENT} strokeWidth="1.6" />
            <text x={360} y={403} textAnchor="middle" fontSize="12" fontWeight="700" fill={ACCENT}>
              先有问题，再找模式，按需调整
            </text>
            <text x={360} y={421} textAnchor="middle" fontSize="10" fill="var(--text-primary)">
              模式是经验不是教条——为用模式而造问题，是新手最常见的陷阱
            </text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="学模式的最终目的不是炫耀词汇量，而是在遇到真实问题时，能认出它、选对方案、少走弯路。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        模式不是抽象的理论，而是真实系统的骨架：Java I/O 的装饰器、Swing
        的观察者与组合、Spring 的模板方法与代理……理解模式，你就能读懂框架的设计意图；
        掌握「问题→模式」的映射，你就能在自己的系统里复用这些被验证过的智慧。
      </figcaption>
    </figure>
  );
}
