"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh04ObserverAchievement>：观察者一对多通知动画（GPP 第4章）。
 *
 * 核心：让多个对象在"某事发生"时自动收到通知，而发送者（Subject）无需知道接收者
 * （Observer）是谁——解耦通知关系。
 *
 * 场景：物理引擎（Subject）检测到"英雄击败怪物"事件，通知三个 Observer：
 *  成就系统（解锁"怪物猎人"）、音效系统（播放胜利音）、AI 系统（同伴欢呼）。
 *
 * 节拍：
 *  ① 三个观察者注册到 Subject（订阅线点亮）
 *  ② 物理引擎产生 EnemyDied 事件
 *  ③ 事件包并行沿三条订阅线传播到各观察者
 *  ④ 三个观察者各自执行反应并点亮
 *  ⑤ Subject 只广播"发生了什么"，不关心谁在听、听了做什么（解耦）
 */

const VIEW_W = 720;
const VIEW_H = 500;

const ACCENT = "var(--accent)";
const OK_COLOR = "#3FB97F";
const EVENT_COLOR = "#E5B567";

const T = TEACHING_BEAT_MS;

// Subject 与三个 Observer 的位置
const SUBJECT = { x: 170, y: 250 };
const OBSERVERS = [
  { id: "achievement", name: "成就系统", reaction: 'unlock("怪物猎人")', y: 130, color: "#C792EA" },
  { id: "audio", name: "音效系统", reaction: 'play("victory.wav")', y: 250, color: "#5AA9E6" },
  { id: "ai", name: "AI 系统", reaction: "companion.cheer()", y: 370, color: "#3FB97F" },
] as const;

const OBS_X = 540;
const OBS_W = 150;
const OBS_H = 56;
const SUB_W = 170;
const SUB_H = 70;

const STEPS: readonly TeachingStep[] = [
  { label: "subscribe", caption: "三个观察者把自己注册到 Subject，订阅线建立" },
  { label: "event", caption: "物理引擎检测到英雄击败怪物，产生一个 EnemyDied 事件" },
  { label: "notify", caption: "Subject 把事件并行广播给所有已注册的观察者" },
  { label: "react", caption: "每个观察者收到事件后各自反应：解锁成就、播放音效、同伴欢呼" },
  { label: "decouple", caption: "Subject 只广播'发生了什么'，不知道谁在听、听了做什么——通知关系被解耦" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh04ObserverAchievement() {
  const sceneRef = useRef<SVGGElement | null>(null);
  const linesRef = useRef<SVGGElement | null>(null);
  const eventBadgeRef = useRef<SVGGElement | null>(null);
  const packetRefs = useRef<Record<string, SVGGElement | null>>({});
  const reactRefs = useRef<Record<string, SVGGElement | null>>({});
  const decoupleRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① subscribe（t: 0→T）：场景淡入，订阅线画出
      tl.add(sceneRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.add(linesRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T * 0.3);
      tl.label("subscribe", 0);

      // ② event（t: T→2T）：Subject 处事件徽章浮现
      tl.add(eventBadgeRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("event", T);

      // ③ notify（t: 2T→3T）：三个事件包从 Subject 并行飞向各 Observer
      OBSERVERS.forEach((o) => {
        const el = packetRefs.current[o.id];
        if (!el) return;
        tl.add(
          el,
          {
            opacity: [1, 1],
            x: [SUBJECT.x, OBS_X - OBS_W / 2 - 12],
            y: [SUBJECT.y, o.y],
            duration: T * 0.9,
            ease: "inOut(2)",
          },
          T * 2,
        );
      });
      tl.label("notify", T * 2);

      // ④ react（t: 3T→4T）：观察者反应点亮，事件包淡出
      OBSERVERS.forEach((o) => {
        const packet = packetRefs.current[o.id];
        const react = reactRefs.current[o.id];
        if (packet) tl.add(packet, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 3);
        if (react) tl.add(react, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3.2);
      });
      tl.label("react", T * 3);

      // ⑤ decouple（t: 4T→5T）：解耦结论浮现
      tl.add(decoupleRef.current!, { opacity: [0, 1], duration: T * 0.7, ease: "out(3)" }, T * 4);
      tl.label("decouple", T * 4);
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
          aria-label="观察者模式动画。物理引擎作为 Subject，成就系统、音效系统、AI 系统作为 Observer 注册订阅。物理引擎检测到英雄击败怪物产生 EnemyDied 事件，把事件并行广播给三个观察者，它们各自反应：成就系统解锁怪物猎人、音效系统播放胜利音、AI 系统让同伴欢呼。Subject 只广播发生了什么，不知道谁在听、听了做什么，通知关系被解耦。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x="32" y="34" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            观察者：一处发生，多处自动收到通知
          </text>
          <text x="32" y="54" fontSize="11" fill="var(--text-secondary)">
            Subject 广播事件，Observer 各自反应——发送者不知道接收者是谁
          </text>

          {/* 订阅线 */}
          <g ref={linesRef} style={{ opacity: 0 }}>
            {OBSERVERS.map((o) => (
              <line
                key={`line-${o.id}`}
                x1={SUBJECT.x + SUB_W / 2}
                y1={SUBJECT.y}
                x2={OBS_X - OBS_W / 2}
                y2={o.y}
                stroke={o.color}
                strokeWidth="1.6"
                strokeDasharray="5 3"
              />
            ))}
          </g>

          {/* 场景：Subject + Observers */}
          <g ref={sceneRef} style={{ opacity: 0 }}>
            {/* Subject */}
            <rect
              x={SUBJECT.x - SUB_W / 2}
              y={SUBJECT.y - SUB_H / 2}
              width={SUB_W}
              height={SUB_H}
              rx="10"
              fill={ACCENT}
              fillOpacity="0.14"
              stroke={ACCENT}
              strokeWidth="2"
            />
            <text x={SUBJECT.x} y={SUBJECT.y - 6} textAnchor="middle" fontSize="13" fontWeight="700" fill={ACCENT}>
              物理引擎
            </text>
            <text x={SUBJECT.x} y={SUBJECT.y + 14} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
              Subject · 广播事件
            </text>

            {/* Observers */}
            {OBSERVERS.map((o) => (
              <g key={o.id}>
                <rect
                  x={OBS_X - OBS_W / 2}
                  y={o.y - OBS_H / 2}
                  width={OBS_W}
                  height={OBS_H}
                  rx="8"
                  fill={o.color}
                  fillOpacity="0.1"
                  stroke={o.color}
                  strokeWidth="1.6"
                />
                <text x={OBS_X} y={o.y - 4} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">
                  {o.name}
                </text>
                <text x={OBS_X} y={o.y + 14} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
                  Observer
                </text>
              </g>
            ))}
          </g>

          {/* 事件徽章（Subject 处） */}
          <g ref={eventBadgeRef} style={{ opacity: 0 }}>
            <rect x={SUBJECT.x - 60} y={SUBJECT.y - SUB_H / 2 - 34} width={120} height={24} rx="6" fill={EVENT_COLOR} fillOpacity="0.18" stroke={EVENT_COLOR} strokeWidth="1.4" />
            <text x={SUBJECT.x} y={SUBJECT.y - SUB_H / 2 - 18} textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="monospace" fill={EVENT_COLOR}>
              EnemyDied
            </text>
          </g>

          {/* 事件包（从 Subject 飞向各 Observer） */}
          {OBSERVERS.map((o) => (
            <g
              key={`packet-${o.id}`}
              ref={(el) => {
                packetRefs.current[o.id] = el;
              }}
              style={{ opacity: 0, transform: `translate(${SUBJECT.x}px, ${SUBJECT.y}px)` }}
            >
              <circle cx={0} cy={0} r="8" fill={EVENT_COLOR} stroke="var(--elevated)" strokeWidth="2" />
            </g>
          ))}

          {/* 观察者反应（点亮） */}
          {OBSERVERS.map((o) => (
            <g
              key={`react-${o.id}`}
              ref={(el) => {
                reactRefs.current[o.id] = el;
              }}
              style={{ opacity: 0 }}
            >
              <rect x={OBS_X - OBS_W / 2} y={o.y + OBS_H / 2 + 6} width={OBS_W} height={22} rx="5" fill={o.color} fillOpacity="0.16" stroke={o.color} strokeWidth="1.2" />
              <text x={OBS_X} y={o.y + OBS_H / 2 + 21} textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="monospace" fill={o.color}>
                {o.reaction}
              </text>
            </g>
          ))}

          {/* 解耦结论 */}
          <g ref={decoupleRef} style={{ opacity: 0 }}>
            <rect x={90} y={VIEW_H - 46} width={540} height={30} rx="8" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x={360} y={VIEW_H - 27} textAnchor="middle" fontSize="12" fontWeight="700" fill={OK_COLOR}>
              Subject 只广播事件，不关心谁在听、听了做什么 → 通知关系解耦
            </text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="物理引擎产生 EnemyDied 事件并广播，成就/音效/AI 三个观察者各自反应。新增一个观察者无需改动物理引擎。代价：观察者列表需维护、通知顺序与动态分配需小心。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        观察者（Observer）：在 Subject 与多个 Observer 之间建立一对多的通知关系。
        Subject 只在"某事发生"时广播事件，无需知道有哪些观察者、它们会做什么；
        观察者自行订阅与反应。由此发送方与接收方在时间和耦合上都被解耦，
        新增接收者不必修改发送者。
      </figcaption>
    </figure>
  );
}
