"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <HfdCompoundPatternsDiagram>：MVC 复合模式动画（Head First 设计模式 · 第12章）。
 *
 * 核心：MVC 不是单一模式，而是三个模式的复合——
 *   Observer：Model 状态变化通知 View（一对多、松耦合）
 *   Strategy：Controller 是 View 的可替换行为策略（换控制器换交互逻辑）
 *   Composite：View 是组件树（窗口套面板套按钮，统一对待）
 * 三个模式各司其职，合作解决「界面与业务解耦」这个大问题。
 *
 * 节拍：
 *  ① MVC 三个角色登场
 *  ② Observer：Model 通知 View
 *  ③ Strategy：Controller 是 View 的可替换策略，并把改动写回 Model
 *  ④ Composite：View 内部是组件树
 *  ⑤ 复合：三个模式合作解决单个模式解决不了的问题
 */

const VIEW_W = 720;
const VIEW_H = 455;

const MODEL_COLOR = "#5AA9E6";
const VIEW_COLOR = "#C792EA";
const CTRL_COLOR = "#E5B567";
const OK_COLOR = "#3FB97F";

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  { label: "mvc", caption: "MVC 三个角色：Model 管状态、View 管展示、Controller 管交互" },
  { label: "observer", caption: "Observer：Model 状态变化 → notifyObservers() → View.update() 自动刷新" },
  { label: "strategy", caption: "Strategy：Controller 是 View 的可替换行为策略，解读输入后改写 Model" },
  { label: "composite", caption: "Composite：View 内部是组件树——窗口套面板套按钮，统一对待" },
  { label: "compound", caption: "复合模式：三个模式各司其职，合作解决「界面与业务解耦」大问题" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function HfdCompoundPatternsDiagram() {
  const modelRef = useRef<SVGGElement | null>(null);
  const viewRef = useRef<SVGGElement | null>(null);
  const ctrlRef = useRef<SVGGElement | null>(null);
  const observerRef = useRef<SVGGElement | null>(null);
  const strategyRef = useRef<SVGGElement | null>(null);
  const compositeRef = useRef<SVGGElement | null>(null);
  const conclusionRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① mvc（0→T）：三个角色淡入
      tl.add(modelRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, 0);
      tl.add(viewRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 0.2);
      tl.add(ctrlRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 0.4);
      tl.label("mvc", 0);

      // ② observer（T→2T）：Model→View 通知箭头
      tl.add(observerRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("observer", T);

      // ③ strategy（2T→3T）：View↔Controller + Controller→Model
      tl.add(strategyRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2);
      tl.label("strategy", T * 2);

      // ④ composite（3T→4T）：View 组件树
      tl.add(compositeRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3);
      tl.label("composite", T * 3);

      // ⑤ compound（4T→5T）：结论
      tl.add(conclusionRef.current!, { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" }, T * 4);
      tl.label("compound", T * 4);
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
          aria-label="复合模式动画。MVC 由三个模式复合而成。Observer：Model 状态变化通过 notifyObservers 通知 View 自动刷新。Strategy：Controller 是 View 的可替换行为策略，解读用户输入后改写 Model。Composite：View 内部是窗口套面板套按钮的组件树，统一对待。三个模式各司其职，合作解决界面与业务解耦的大问题。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            复合模式 · MVC
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            三个模式合作：Observer 通知 + Strategy 换行为 + Composite 组件树
          </text>

          {/* Model */}
          <g ref={modelRef} style={{ opacity: 0 }}>
            <rect x={48} y={110} width={180} height={110} rx="10" fill={MODEL_COLOR} fillOpacity="0.12" stroke={MODEL_COLOR} strokeWidth="2" />
            <text x={138} y={136} textAnchor="middle" fontSize="13" fontWeight="700" fill={MODEL_COLOR}>
              Model
            </text>
            <text x={138} y={156} textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
              状态 + 业务逻辑
            </text>
            <text x={138} y={182} textAnchor="middle" fontSize="9" fontFamily="monospace" fill="var(--text-primary)">
              notifyObservers()
            </text>
            <text x={138} y={200} textAnchor="middle" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">
              setState()
            </text>
          </g>

          {/* View */}
          <g ref={viewRef} style={{ opacity: 0 }}>
            <rect x={460} y={110} width={210} height={110} rx="10" fill={VIEW_COLOR} fillOpacity="0.12" stroke={VIEW_COLOR} strokeWidth="2" />
            <text x={565} y={136} textAnchor="middle" fontSize="13" fontWeight="700" fill={VIEW_COLOR}>
              View
            </text>
            <text x={565} y={156} textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
              展示状态 · 接收输入
            </text>
            <text x={565} y={182} textAnchor="middle" fontSize="9" fontFamily="monospace" fill="var(--text-primary)">
              update() [Observer]
            </text>
            <text x={565} y={200} textAnchor="middle" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">
              持有 Controller 引用
            </text>
          </g>

          {/* Controller */}
          <g ref={ctrlRef} style={{ opacity: 0 }}>
            <rect x={250} y={280} width={200} height={80} rx="10" fill={CTRL_COLOR} fillOpacity="0.12" stroke={CTRL_COLOR} strokeWidth="2" />
            <text x={350} y={306} textAnchor="middle" fontSize="13" fontWeight="700" fill={CTRL_COLOR}>
              Controller
            </text>
            <text x={350} y={326} textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
              解读用户输入 · 策略
            </text>
            <text x={350} y={348} textAnchor="middle" fontSize="9" fontFamily="monospace" fill="var(--text-primary)">
              actionPerformed()
            </text>
          </g>

          {/* Observer：Model → View */}
          <g ref={observerRef} style={{ opacity: 0 }}>
            <line x1={230} y1={150} x2={456} y2={150} stroke={OK_COLOR} strokeWidth="2" />
            <polygon points="458,150 450,146 450,154" fill={OK_COLOR} />
            <rect x={264} y={128} width={156} height={20} rx="5" fill={OK_COLOR} fillOpacity="0.14" stroke={OK_COLOR} strokeWidth="1.1" />
            <text x={342} y={142} textAnchor="middle" fontSize="9" fontWeight="700" fill={OK_COLOR}>
              ① Observer：notify → update
            </text>
          </g>

          {/* Strategy：View → Controller → Model */}
          <g ref={strategyRef} style={{ opacity: 0 }}>
            <line x1={520} y1={222} x2={428} y2={282} stroke={CTRL_COLOR} strokeWidth="2" />
            <polygon points="426,284 430,275 437,281" fill={CTRL_COLOR} />
            <line x1={268} y1={282} x2={188} y2={222} stroke="var(--text-secondary)" strokeWidth="1.4" strokeDasharray="4 3" />
            <polygon points="186,220 190,229 197,223" fill="var(--text-secondary)" />
            <rect x={430} y={240} width={180} height={20} rx="5" fill={CTRL_COLOR} fillOpacity="0.14" stroke={CTRL_COLOR} strokeWidth="1.1" />
            <text x={520} y={254} textAnchor="middle" fontSize="9" fontWeight="700" fill={CTRL_COLOR}>
              ② Strategy：可替换的交互行为
            </text>
            <text x={200} y={262} fontSize="8" fill="var(--text-secondary)">
              改写状态
            </text>
          </g>

          {/* Composite：View 组件树 */}
          <g ref={compositeRef} style={{ opacity: 0 }}>
            <text x={565} y={252} textAnchor="middle" fontSize="9" fontWeight="700" fill={VIEW_COLOR}>
              ③ Composite：View 是组件树
            </text>
            <rect x={470} y={262} width={190} height={26} rx="6" fill={VIEW_COLOR} fillOpacity="0.1" stroke={VIEW_COLOR} strokeWidth="1.3" />
            <text x={565} y={279} textAnchor="middle" fontSize="9" fontFamily="monospace" fill="var(--text-primary)">
              Window（容器）
            </text>
            <line x1={520} y1={288} x2={505} y2={296} stroke="var(--border)" strokeWidth="1.2" />
            <line x1={610} y1={288} x2={615} y2={296} stroke="var(--border)" strokeWidth="1.2" />
            <rect x={470} y={296} width={80} height={24} rx="5" fill={VIEW_COLOR} fillOpacity="0.08" stroke={VIEW_COLOR} strokeWidth="1.1" />
            <text x={510} y={312} textAnchor="middle" fontSize="8" fontFamily="monospace" fill="var(--text-primary)">
              Panel
            </text>
            <rect x={580} y={296} width={80} height={24} rx="5" fill={VIEW_COLOR} fillOpacity="0.08" stroke={VIEW_COLOR} strokeWidth="1.1" />
            <text x={620} y={312} textAnchor="middle" fontSize="8" fontFamily="monospace" fill="var(--text-primary)">
              Button
            </text>
            <line x1={505} y1={320} x2={505} y2={328} stroke="var(--border)" strokeWidth="1.2" />
            <rect x={470} y={328} width={80} height={22} rx="5" fill={VIEW_COLOR} fillOpacity="0.06" stroke={VIEW_COLOR} strokeWidth="1" />
            <text x={510} y={343} textAnchor="middle" fontSize="8" fontFamily="monospace" fill="var(--text-primary)">
              Label
            </text>
          </g>

          {/* 结论 */}
          <g ref={conclusionRef} style={{ opacity: 0 }}>
            <rect x={90} y={385} width={540} height={44} rx="8" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x={360} y={403} textAnchor="middle" fontSize="12" fontWeight="700" fill={OK_COLOR}>
              MVC = 复合模式：三个模式各司其职
            </text>
            <text x={360} y={421} textAnchor="middle" fontSize="10" fill="var(--text-primary)">
              合作解决「界面与业务解耦」——单个模式做不到，组合起来才行
            </text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="复合模式不是把模式堆在一起，而是让它们各自解决一部分问题，形成稳定的协作结构。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        复合模式把多个模式组合成一个协作框架，解决单个模式无法独立解决的大问题。
        MVC 是经典案例：Observer 让 Model 与 View 松耦合，Strategy 让交互行为可替换，
        Composite 让界面组件树统一管理。理解复合模式，才能理解真实系统里模式的协作方式。
      </figcaption>
    </figure>
  );
}
