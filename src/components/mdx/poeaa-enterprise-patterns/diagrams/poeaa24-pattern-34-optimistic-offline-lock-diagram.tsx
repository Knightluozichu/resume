"use client";

import { useRef, useState } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";
import { T, DiagramCaption, DiagramTitle } from "../poeaa-svg-primitives";

/**
 * <Poeaa24Pattern34OptimisticOfflineLockDiagram>：乐观离线锁的五步提交路径。
 *
 * 通过可暂停、单步、拖动的时间线展示“读取 → 先提交 → 拒绝旧写入 → 重读重试”，
 * 并提供一个确定性的故障注入：关闭版本条件后，旧对象会覆盖已经提交的变化。
 */

const VIEW_W = 900;
const VIEW_H = 460;
const STEPS: readonly TeachingStep[] = [
  { label: "readA", caption: "A 读取订单，记下 version = 7" },
  { label: "readB", caption: "B 也读取同一份 version = 7" },
  { label: "commitB", caption: "B 先提交，条件满足，版本变为 8" },
  { label: "rejectA", caption: "A 带着旧版本提交，影响 0 行并被拒绝" },
  { label: "retryA", caption: "A 重读 version = 8，合并后重新提交" },
];
const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

type EventSpec = {
  id: string;
  y: number;
  label: string;
  color: string;
  dashed?: boolean;
};

const EVENTS: readonly EventSpec[] = [
  {
    id: "readA",
    y: 122,
    label: "A 读取订单（version = 7）",
    color: T.success,
  },
  {
    id: "readB",
    y: 164,
    label: "B 读取订单（version = 7）",
    color: T.warning,
  },
  {
    id: "commitB",
    y: 206,
    label: "B 提交：7 → 8，条件满足",
    color: T.success,
  },
  {
    id: "rejectA",
    y: 248,
    label: "A 提交：期望 7，实际 8，拒绝",
    color: T.danger,
  },
  {
    id: "retryA",
    y: 290,
    label: "A 重读 8 → 合并修改 → 重试",
    color: T.accent,
    dashed: true,
  },
];

export function Poeaa24Pattern34OptimisticOfflineLockDiagram() {
  const eventRefs = useRef<Record<string, SVGGElement | null>>({});
  const [faultInjected, setFaultInjected] = useState(false);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      EVENTS.forEach((event, index) => {
        const start = TEACHING_BEAT_MS * index;
        const element = eventRefs.current[event.id];
        if (element) {
          tl.add(
            element,
            {
              opacity: [0.16, 1],
              translateY: [8, 0],
              duration: TEACHING_BEAT_MS * 0.8,
              ease: "out(3)",
            },
            start,
          );
        }
        // label 放在本步动画的起始时刻，单步时不会落后于事件。
        tl.label(event.id, start);
      });
    },
  });

  const resetAll = () => {
    setFaultInjected(false);
    timeline.goToStep(0);
  };

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-6">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">◇</span>
            可交互时序图
          </span>
          <span className="text-xs text-secondary">
            先预测，再逐步验证提交条件
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="乐观离线锁五步教学图。客服 A 和 B 都读取 version 7，B 先提交后版本变为 8，A 的旧版本写入被拒绝，A 重读并合并后重试。可以播放、暂停、单步和拖动进度，也可以注入忽略版本条件的错误模式。"
          className="mx-auto block h-auto w-full max-w-[900px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={38}
            text="Optimistic Offline Lock：提交时验证版本"
          />
          <text
            x={VIEW_W / 2}
            y={62}
            textAnchor="middle"
            fontSize="12"
            fill={T.secondary}
          >
            允许并行编辑，只有提交前的版本条件决定谁能写入
          </text>

          <line
            x1="80"
            y1="86"
            x2={VIEW_W - 80}
            y2="86"
            stroke={T.border}
            strokeWidth="1"
          />
          <text x="96" y="108" fontSize="12" fontWeight="700" fill={T.primary}>
            事务事件
          </text>
          <text x="704" y="108" fontSize="12" fontWeight="700" fill={T.primary}>
            数据库状态
          </text>

          {EVENTS.map((event) => (
            <g
              key={event.id}
              ref={(element) => {
                eventRefs.current[event.id] = element;
              }}
              opacity="0.16"
            >
              <line
                x1="98"
                y1={event.y}
                x2="654"
                y2={event.y}
                stroke={event.color}
                strokeWidth="1.8"
                strokeDasharray={event.dashed ? "6 4" : undefined}
              />
              <circle cx="98" cy={event.y} r="5" fill={event.color} />
              <text x="118" y={event.y + 5} fontSize="13" fill={event.color}>
                {event.label}
              </text>
            </g>
          ))}

          <rect
            x="676"
            y="112"
            width="142"
            height="194"
            rx="10"
            fill={T.primary}
            fillOpacity="0.04"
            stroke={T.border}
            strokeWidth="1"
          />
          <text x="747" y="140" textAnchor="middle" fontSize="12" fill={T.secondary}>
            当前行
          </text>
          <text x="747" y="178" textAnchor="middle" fontSize="21" fontWeight="700" fill={T.accent}>
            version = 7
          </text>
          <line x1="702" y1="194" x2="792" y2="194" stroke={T.border} />
          <text x="747" y="222" textAnchor="middle" fontSize="12" fill={T.secondary}>
            B 成功后
          </text>
          <text x="747" y="258" textAnchor="middle" fontSize="21" fontWeight="700" fill={T.success}>
            version = 8
          </text>
          <text x="747" y="286" textAnchor="middle" fontSize="11" fill={T.secondary}>
            A 的旧条件失效
          </text>

          <g opacity={faultInjected ? 1 : 0}>
            <rect
              x="82"
              y="326"
              width="736"
              height="48"
              rx="9"
              fill={T.danger}
              fillOpacity="0.1"
              stroke={T.danger}
              strokeWidth="1.5"
            />
            <text x="450" y="347" textAnchor="middle" fontSize="12" fontWeight="700" fill={T.danger}>
              错误模式：只按订单 ID 更新
            </text>
            <text x="450" y="365" textAnchor="middle" fontSize="11" fill={T.danger}>
              A 会覆盖 B 的已提交修改；“保存成功”掩盖了并发冲突
            </text>
          </g>

          <rect
            x="82"
            y={faultInjected ? 388 : 326}
            width="736"
            height="42"
            rx="9"
            fill={T.accent}
            fillOpacity="0.06"
            stroke={T.border}
            strokeWidth="1"
          />
          <text
            x="450"
            y={faultInjected ? 414 : 352}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.primary}
          >
            不变量：同一订单、同一旧版本最多有一个成功更新者
          </text>
          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 14}
            text="版本条件把静默覆盖变成可观察的冲突结果"
          />
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="时间线展示正常冲突路径；步点、播放和拖动都停在可解释的提交状态。"
          reset={{
            label: "重置演示",
            ariaLabel: "重置乐观离线锁演示",
            onClick: resetAll,
          }}
        />

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setFaultInjected((value) => !value)}
            aria-pressed={faultInjected}
            className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
          >
            {faultInjected ? "关闭错误模式" : "注入错误模式"}
          </button>
          <span className="text-xs text-secondary" role="status" aria-live="polite">
            {faultInjected
              ? "当前会忽略版本条件，观察覆盖风险"
              : "正常模式：版本不一致会拒绝旧写入"}
          </span>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        乐观离线锁把冲突发现推迟到提交前：版本一致才写入并递增，不一致则拒绝旧写入并要求重读或合并。
      </figcaption>
    </figure>
  );
}
