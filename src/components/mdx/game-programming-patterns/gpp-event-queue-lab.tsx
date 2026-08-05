"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import { useTeachingTimeline, type TeachingStep } from "../anim/use-teaching-timeline";

const T = TEACHING_BEAT_MS;
const MUTE = "var(--text-secondary)";
const INK = "var(--text-primary)";
const LINE = "var(--border)";
const OK = "#3FB97F";
const WARN = "#E5675C";
const VW = 900;
const VH = 420;

const ACCENT = "#E56A7A"; // deep rose
const STEPS: readonly TeachingStep[] = [
  { label: "producer", caption: "① 生产者：产生事件（音效、伤害、动画触发）" },
  { label: "queue", caption: "② 事件入队：环形缓冲排队，生产者不阻塞" },
  { label: "consumer", caption: "③ 消费者：按序取出并处理——解耦产生与处理时刻" },
  { label: "benefit", caption: "④ 收益：突发负载被队列吸收，反馈环可控制" },
];
const LABEL: Record<string, string> = Object.fromEntries(STEPS.map((s) => [s.label, s.caption ?? s.label]));

export function GppEventQueueLab() {
  const prodRef = useRef<SVGGElement>(null);
  const queueRef = useRef<SVGGElement>(null);
  const consRef = useRef<SVGGElement>(null);
  const benefitRef = useRef<SVGGElement>(null);
  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      tl.add(prodRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("producer", 0);
      tl.add(queueRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("queue", T);
      tl.add(consRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2);
      tl.label("consumer", T * 2);
      tl.add(benefitRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3);
      tl.label("benefit", T * 3);
    },
  });
  const events = ["音效:命中", "伤害:25", "动画:受击", "粒子:血花", "成就:击杀"];
  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border px-5 py-3">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-[0.18em]" style={{ color: MUTE }}>Decoupling Pattern · Event Queue</span>
            <h4 className="mt-1 text-[15px] font-semibold" style={{ color: INK }}>Event Queue — 事件先排队，别当场处理</h4>
          </div>
          <span className="rounded-control border px-2 py-1 text-[11px]" style={{ color: ACCENT, borderColor: ACCENT }}>▷ 可交互</span>
        </div>
      </div>
      <div className="p-5">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="Event Queue 模式定制图解：生产者入队、环形缓冲排队、消费者按序取出。可播放、暂停、单步、拖动进度。">
          <text x={VW/2} y={30} textAnchor="middle" fontSize={13} fontWeight={600} fill={INK}>"发生了"与"处理它"被一道队列隔开</text>
          <text x={VW/2} y={50} textAnchor="middle" fontSize={11} fill={MUTE}>生产者瞬间入队不阻塞，消费者按自己的节奏处理</text>

          <g ref={prodRef} style={{ opacity: 0 }}>
            <rect x={50} y={100} width={200} height={140} rx={12} fill="var(--bg)" stroke={WARN} strokeWidth={1.8} />
            <text x={150} y={130} textAnchor="middle" fontSize={13} fontWeight={700} fill={WARN}>生产者</text>
            <text x={150} y={156} textAnchor="middle" fontSize={11} fill={MUTE}>碰撞检测</text>
            <text x={150} y={178} textAnchor="middle" fontSize={11} fill={MUTE}>输入系统</text>
            <text x={150} y={200} textAnchor="middle" fontSize={11} fill={MUTE}>AI 决策</text>
            <text x={150} y={224} textAnchor="middle" fontSize={11} fill={MUTE}>post(event)</text>
          </g>

          <g ref={queueRef} style={{ opacity: 0 }}>
            <text x={420} y={112} textAnchor="middle" fontSize={13} fill={ACCENT}>⟶ enqueue ⟶</text>
            <rect x={310} y={130} width={220} height={100} rx={10} fill="var(--bg)" stroke={ACCENT} strokeWidth={2} />
            <text x={420} y={156} textAnchor="middle" fontSize={12} fontWeight={600} fill={ACCENT}>环形缓冲</text>
            {events.slice(0, 3).map((ev, i) => (
              <text key={ev} x={420} y={180 + i * 18} textAnchor="middle" fontSize={11} fill={INK}>{ev}</text>
            ))}
          </g>

          <g ref={consRef} style={{ opacity: 0 }}>
            <text x={720} y={112} textAnchor="middle" fontSize={13} fill={OK}>⟵ dequeue ⟵</text>
            <rect x={620} y={130} width={200} height={100} rx={12} fill="var(--bg)" stroke={OK} strokeWidth={1.8} />
            <text x={720} y={156} textAnchor="middle" fontSize={13} fontWeight={700} fill={OK}>消费者</text>
            <text x={720} y={180} textAnchor="middle" fontSize={11} fill={MUTE}>音频系统</text>
            <text x={720} y={204} textAnchor="middle" fontSize={11} fill={MUTE}>每帧取出处理</text>
          </g>

          <g ref={benefitRef} style={{ opacity: 0 }}>
            <rect x={50} y={270} width={800} height={70} rx={10} fill={OK} opacity={0.08} stroke={OK} strokeWidth={1.4} />
            <text x={450} y={298} textAnchor="middle" fontSize={11} fontWeight={700} fill={OK}>解耦：突发负载被队列吸收，不丢事件、不卡帧</text>
            <text x={450} y={318} textAnchor="middle" fontSize={11} fill={MUTE}>注意：中央队列是全局变量；反馈环（处理又产生事件）要设上限防风暴</text>
          </g>
        </svg>
        <TimelineControls timeline={timeline} labelText={LABEL} caption="事件先入队、后处理：生产者与消费者彻底解耦，突发负载被队列摊平。" />
      </div>
    </div>
  );
}
