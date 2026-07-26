"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh04ObserverFailure>：观察者模式反例复位动画（GPP 第4章 · 图3）。
 *
 * 故事：Subject 通知 Observer，Observer 的反应又发出新事件反过来通知自己。
 *  ① 正常：Subject → Observer 单向通知（1 次）
 *  ② 反例：Observer 反应又发事件回 Subject（反馈箭头出现）
 *  ③ 反例结果：通知 1→3→7→15… 指数飙升，失控 ✗
 *  ④ 复位：加重入守卫，拦截回发的事件
 *  ⑤ 复位结果：通知只发 1 次，可控 ✓
 */

const VIEW_W = 720;
const VIEW_H = 460;

const ACCENT = "var(--accent)";
const OK_COLOR = "#3FB97F";
const FAIL_COLOR = "#E5675C";

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  { label: "setup", caption: "正常：Subject 广播事件 → Observer 收到通知（1 次）" },
  { label: "feedback", caption: "反例：Observer 的反应又发出新事件，反过来再次通知 Subject" },
  { label: "runaway", caption: "反例结果：通知 1→3→7→15… 指数飙升，栈/队列耗尽 ✗" },
  { label: "guard", caption: "复位：加重入守卫——通知处理中不再触发新通知，拦截回发" },
  { label: "guarded", caption: "复位结果：通知只发 1 次，可控 ✓" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh04ObserverFailure() {
  const sceneRef = useRef<SVGGElement | null>(null);
  const forwardRef = useRef<SVGLineElement | null>(null);
  const feedbackRef = useRef<SVGLineElement | null>(null);
  const guardRef = useRef<SVGGElement | null>(null);
  const countRefs = useRef<Record<string, SVGTextElement | null>>({});
  const observerBoxRef = useRef<SVGRectElement | null>(null);
  const verdictRefs = useRef<Record<string, SVGGElement | null>>({});
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① setup（t: 0→T）：Subject + Observer + 正向通知箭头
      tl.add(sceneRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.add(forwardRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 0.5);
      tl.label("setup", 0);

      // ② feedback（t: T→2T）：反馈箭头出现（红），Observer 标红
      tl.add(feedbackRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 1.1);
      tl.add(observerBoxRef.current!, { stroke: [FAIL_COLOR, FAIL_COLOR], duration: T * 0.3, ease: "out(3)" }, T * 1.3);
      tl.label("feedback", T);

      // ③ runaway（t: 2T→3T）：计数 1→3→7→15 飙升，判定✗
      tl.add(countRefs.current["c1"]!, { opacity: [1, 0], duration: T * 0.15, ease: "out(3)" }, T * 2);
      tl.add(countRefs.current["c3"]!, { opacity: [0, 1], duration: T * 0.15, ease: "out(3)" }, T * 2.15);
      tl.add(countRefs.current["c3"]!, { opacity: [1, 0], duration: T * 0.15, ease: "out(3)" }, T * 2.35);
      tl.add(countRefs.current["c7"]!, { opacity: [0, 1], duration: T * 0.15, ease: "out(3)" }, T * 2.5);
      tl.add(countRefs.current["c7"]!, { opacity: [1, 0], duration: T * 0.15, ease: "out(3)" }, T * 2.7);
      tl.add(countRefs.current["c15"]!, { opacity: [0, 1], duration: T * 0.2, ease: "out(3)" }, T * 2.85);
      tl.add(verdictRefs.current["bad"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.8);
      tl.label("runaway", T * 2);

      // ④ guard（t: 3T→4T）：守卫出现拦截反馈，反馈箭头淡出，Observer 转绿
      tl.add(guardRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 3.1);
      tl.add(feedbackRef.current!, { opacity: [1, 0.15], duration: T * 0.3, ease: "out(3)" }, T * 3.3);
      tl.add(observerBoxRef.current!, { stroke: [OK_COLOR, OK_COLOR], duration: T * 0.3, ease: "out(3)" }, T * 3.4);
      tl.add(verdictRefs.current["bad"]!, { opacity: [1, 0], duration: T * 0.2, ease: "out(3)" }, T * 3.2);
      tl.add(countRefs.current["c15"]!, { opacity: [1, 0], duration: T * 0.2, ease: "out(3)" }, T * 3.2);
      tl.label("guard", T * 3);

      // ⑤ guarded（t: 4T→5T）：计数回到 1（绿），判定✓ + 结论
      tl.add(countRefs.current["c1g"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 4.1);
      tl.add(verdictRefs.current["good"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 4.3);
      tl.add(insightRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 4.5);
      tl.label("guarded", T * 4);
    },
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-6">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">🧪</span>
            反例与复位
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="观察者模式反例复位动画。正常时 Subject 广播事件 Observer 收到通知一次。反例是 Observer 的反应又发出新事件反过来再次通知 Subject，通知 1 变 3 变 7 变 15 指数飙升，栈或队列耗尽失控。复位是加重入守卫，通知处理中不再触发新通知，拦截回发，通知只发一次可控。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            反例：观察者反应触发新事件 → 反馈循环
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            反应又发事件再通知自己，需重入守卫中断循环
          </text>

          {/* 场景 */}
          <g ref={sceneRef} style={{ opacity: 0 }}>
            {/* Subject */}
            <rect x="120" y="110" width="160" height="70" rx="12" fill={ACCENT} fillOpacity="0.1" stroke={ACCENT} strokeWidth="1.8" />
            <text x="200" y="140" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">Subject</text>
            <text x="200" y="162" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">广播事件</text>

            {/* Observer */}
            <rect ref={observerBoxRef} x="440" y="110" width="160" height="70" rx="12" fill="var(--text-secondary)" fillOpacity="0.05" stroke="var(--border)" strokeWidth="1.8" />
            <text x="520" y="140" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">Observer</text>
            <text x="520" y="162" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">反应：可能又发事件</text>

            {/* 正向箭头 */}
            <line ref={forwardRef} x1="280" y1="130" x2="438" y2="130" stroke="var(--text-secondary)" strokeWidth="1.6" style={{ opacity: 0 }} />
            <text x="359" y="122" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">通知</text>

            {/* 反馈箭头（红） */}
            <line ref={feedbackRef} x1="440" y1="160" x2="282" y2="160" stroke={FAIL_COLOR} strokeWidth="2.2" style={{ opacity: 0 }} />
            <text x="359" y="178" textAnchor="middle" fontSize="11" fontWeight="700" fill={FAIL_COLOR}>反应触发新事件（反馈！）</text>

            {/* 守卫 */}
            <g ref={guardRef} style={{ opacity: 0 }}>
              <rect x="330" y="150" width="60" height="22" rx="6" fill={OK_COLOR} fillOpacity="0.2" stroke={OK_COLOR} strokeWidth="1.6" />
              <text x="360" y="165" textAnchor="middle" fontSize="11" fontWeight="700" fill={OK_COLOR}>🛡 守卫</text>
            </g>
          </g>

          {/* 通知计数 */}
          <rect x="120" y="220" width="480" height="70" rx="10" fill="var(--text-secondary)" fillOpacity="0.04" stroke="var(--border)" strokeWidth="1.4" />
          <text x="136" y="246" fontSize="11" fontWeight="700" fill="var(--text-secondary)">通知次数</text>
          <text ref={(el) => { countRefs.current["c1"] = el; }} x="136" y="278" fontSize="26" fontWeight="700" fontFamily="monospace" fill="var(--text-primary)" style={{ opacity: 1 }}>1</text>
          <text ref={(el) => { countRefs.current["c3"] = el; }} x="136" y="278" fontSize="26" fontWeight="700" fontFamily="monospace" fill={FAIL_COLOR} style={{ opacity: 0 }}>3</text>
          <text ref={(el) => { countRefs.current["c7"] = el; }} x="136" y="278" fontSize="26" fontWeight="700" fontFamily="monospace" fill={FAIL_COLOR} style={{ opacity: 0 }}>7</text>
          <text ref={(el) => { countRefs.current["c15"] = el; }} x="136" y="278" fontSize="26" fontWeight="700" fontFamily="monospace" fill={FAIL_COLOR} style={{ opacity: 0 }}>15…失控</text>
          <text ref={(el) => { countRefs.current["c1g"] = el; }} x="136" y="278" fontSize="26" fontWeight="700" fontFamily="monospace" fill={OK_COLOR} style={{ opacity: 0 }}>1 ✓</text>

          {/* 判定 */}
          <g ref={(el) => { verdictRefs.current["bad"] = el; }} style={{ opacity: 0 }}>
            <rect x="120" y="310" width="480" height="44" rx="10" fill={FAIL_COLOR} fillOpacity="0.12" stroke={FAIL_COLOR} strokeWidth="2" />
            <text x="136" y="337" fontSize="12" fontWeight="700" fill={FAIL_COLOR}>✗ 反馈循环：通知无限增殖，栈/队列耗尽</text>
          </g>
          <g ref={(el) => { verdictRefs.current["good"] = el; }} style={{ opacity: 0 }}>
            <rect x="120" y="310" width="480" height="44" rx="10" fill={OK_COLOR} fillOpacity="0.12" stroke={OK_COLOR} strokeWidth="2" />
            <text x="136" y="337" fontSize="12" fontWeight="700" fill={OK_COLOR}>✓ 循环已中断：通知只发 1 次，可控</text>
          </g>

          {/* 结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="120" y="366" width="480" height="36" rx="8" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.4" />
            <text x="136" y="389" fontSize="11" fontWeight="700" fill={OK_COLOR}>重入守卫：通知处理中不再触发新通知（或延迟到帧末统一发）</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="反例：观察者反应又发事件形成反馈循环，通知指数飙升。复位：加重入守卫中断循环，通知只发一次。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        反例与复位：观察者的反应若又发出新事件反过来通知自己，会形成反馈循环、通知无限增殖；加重入守卫或延迟通知可中断循环。
      </figcaption>
    </figure>
  );
}
