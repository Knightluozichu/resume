"use client";

import { useId, useRef, useState } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";
import { DiagramCaption, DiagramTitle, T } from "../poeaa-svg-primitives";

/**
 * <Poeaa24Pattern31ApplicationControllerDiagram>：应用控制器的流程边界图。
 *
 * 图中把订单向导拆成「事件 → 应用状态决策 → 命令/视图 → 拒绝非法边」四个
 * 可观察阶段。红色故障路径特意绕过应用控制器，帮助读者看见页面直达下一屏
 * 时丢失的状态证据；主图提供播放、暂停、单步、拖动、故障注入和重置。
 */

const VIEW_W = 960;
const VIEW_H = 560;
const BEAT = TEACHING_BEAT_MS;

const C = {
  accent: "var(--accent)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  border: "var(--border)",
  elevated: "var(--bg-elevated)",
  bg: "var(--bg)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
} as const;

type PhaseId = "event" | "context" | "command" | "invalid";

const PHASE_IDS: readonly PhaseId[] = [
  "event",
  "context",
  "command",
  "invalid",
];

const STEPS: readonly TeachingStep[] = [
  {
    label: "event",
    caption: "页面只发送事件，不预先决定下一屏",
  },
  {
    label: "context",
    caption: "应用控制器用状态和事件计算下一步",
  },
  {
    label: "command",
    caption: "命令执行动作，视图选择表达下一屏",
  },
  {
    label: "invalid",
    caption: "绕过流程的直达路径应在边界被拒绝",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const PHASE_COPY: Record<
  PhaseId,
  { title: string; note: string; color: string }
> = {
  event: {
    title: "事件进入",
    note: "地址页只报告 submitAddress；它不应该直接打开确认页。",
    color: C.accent,
  },
  context: {
    title: "读取上下文",
    note: "应用控制器把 address 状态与事件放在一起，计算一条可测试的边。",
    color: C.warning,
  },
  command: {
    title: "命令与视图",
    note: "保存地址由命令执行，ConfirmView 只是决策返回的下一屏。",
    color: C.success,
  },
  invalid: {
    title: "拒绝非法边",
    note: "页面直达确认页绕过了状态证据；应返回 Rejected，而不是伪装成功。",
    color: C.danger,
  },
};

export type Poeaa24Pattern31ApplicationControllerDiagramProps = {
  /** Stepper 静态快照聚焦的阶段。 */
  focus?: PhaseId;
  /** 主图开启时间线和故障开关；静态快照关闭控件。 */
  interactive?: boolean;
};

export function Poeaa24Pattern31ApplicationControllerDiagram({
  focus = "event",
  interactive = true,
}: Poeaa24Pattern31ApplicationControllerDiagramProps) {
  const [faultInjected, setFaultInjected] = useState(false);
  const phaseRefs = useRef<Record<PhaseId, SVGGElement | null>>({
    event: null,
    context: null,
    command: null,
    invalid: null,
  });
  const id = useId().replace(/:/g, "");
  const markerId = `poeaa-application-controller-arrow-${id}`;
  const faultMarkerId = `poeaa-application-controller-fault-${id}`;

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      if (!interactive) {
        PHASE_IDS.forEach((phaseId) => tl.label(phaseId, 0));
        return;
      }

      PHASE_IDS.forEach((phaseId, index) => {
        const element = phaseRefs.current[phaseId];
        const start = BEAT * index;
        if (element) {
          tl.add(
            element,
            {
              opacity: [0, 1],
              translateY: [10, 0],
              duration: BEAT * 0.8,
              ease: "out(3)",
            },
            start,
          );
        }
        // 每个 label 对齐本阶段动画起点，字幕和高亮不会错一拍。
        tl.label(phaseId, start);
      });
    },
  });

  const focusIndex = Math.max(0, PHASE_IDS.indexOf(focus));
  const currentIndex = interactive ? timeline.currentStep : focusIndex;
  const currentPhase = PHASE_IDS[currentIndex] ?? "event";
  const phase = PHASE_COPY[currentPhase];

  const reset = () => {
    timeline.seek(0);
    setFaultInjected(false);
  };

  const phaseStyle = (phaseId: PhaseId, index: number) => ({
    opacity: interactive
      ? 0
      : index === currentIndex
        ? 1
        : index < currentIndex
          ? 0.72
          : 0.2,
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="poeaa-application-controller-flow"
        className="rounded-card border border-border bg-elevated p-5"
      >
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            专属流程图 · {phase.title}
          </span>
          {interactive && (
            <button
              type="button"
              onClick={() => setFaultInjected((value) => !value)}
              aria-pressed={faultInjected}
              className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                faultInjected
                  ? "border-danger text-danger"
                  : "border-border text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              {faultInjected ? "关闭非法跳转" : "注入非法跳转"}
            </button>
          )}
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={`应用控制器订单向导图：页面事件进入应用控制器，由当前应用状态决定命令和下一视图，再把结果交回流程。${faultInjected ? "当前已注入页面绕过控制器直达确认页的非法跳转，状态证据应被拒绝。" : phase.note}支持播放、暂停、单步、拖动进度和重置。`}
          className="mx-auto block h-auto w-full max-w-[960px]"
        >
          <defs>
            <marker
              id={markerId}
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="5"
              orient="auto"
            >
              <path d="M0 0 L9 5 L0 10 Z" fill={C.accent} />
            </marker>
            <marker
              id={faultMarkerId}
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="5"
              orient="auto"
            >
              <path d="M0 0 L9 5 L0 10 Z" fill={C.danger} />
            </marker>
          </defs>

          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="Application Controller：事件 → 状态决策 → 下一屏"
          />
          <text
            x={VIEW_W / 2}
            y="56"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            页面报告事实，流程层选择命令和视图，业务服务保留领域规则
          </text>

          {/* 左侧：输入页面只产生事件。 */}
          <rect
            x="32"
            y="112"
            width="214"
            height="252"
            rx="12"
            fill={C.bg}
            stroke={C.border}
            strokeWidth="1.4"
          />
          <text
            x="139"
            y="140"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={C.primary}
          >
            页面控制器
          </text>
          <text x="54" y="169" fontSize="11" fill={C.secondary}>
            当前页面：AddressView
          </text>
          <rect
            x="54"
            y="188"
            width="170"
            height="42"
            rx="8"
            fill={C.accent}
            fillOpacity="0.07"
            stroke={C.accent}
            strokeWidth="1.2"
          />
          <text
            x="139"
            y="214"
            textAnchor="middle"
            fontSize="12"
            fontFamily="monospace"
            fill={C.accent}
          >
            submitAddress
          </text>
          <text x="54" y="260" fontSize="11" fill={C.secondary}>
            只报告用户事件
          </text>
          <text x="54" y="284" fontSize="11" fill={C.secondary}>
            不决定下一屏
          </text>
          <text x="54" y="308" fontSize="11" fill={C.secondary}>
            不执行支付命令
          </text>

          {/* 中央：应用控制器拥有流程上下文，不拥有领域规则。 */}
          <rect
            x="322"
            y="92"
            width="318"
            height="286"
            rx="12"
            fill={C.elevated}
            stroke={C.accent}
            strokeWidth="1.8"
          />
          <rect
            x="322"
            y="92"
            width="318"
            height="44"
            rx="12"
            fill={C.accent}
            fillOpacity="0.12"
          />
          <rect
            x="322"
            y="124"
            width="318"
            height="12"
            fill={C.accent}
            fillOpacity="0.12"
          />
          <text
            x="481"
            y="120"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={C.accent}
          >
            Application Controller
          </text>
          <text x="348" y="169" fontSize="12" fill={C.primary}>
            读取应用状态 + 事件
          </text>
          <rect
            x="348"
            y="184"
            width="266"
            height="54"
            rx="8"
            fill={C.warning}
            fillOpacity="0.09"
            stroke={C.warning}
            strokeWidth="1.2"
          />
          <text x="364" y="207" fontSize="12" fill={C.warning}>
            state: address
          </text>
          <text x="364" y="227" fontSize="12" fill={C.warning}>
            event: submitAddress
          </text>
          <text x="348" y="267" fontSize="12" fill={C.primary}>
            输出：command + next view
          </text>
          <text x="348" y="294" fontSize="11" fill={C.secondary}>
            不查询订单表 · 不计算支付金额
          </text>
          <text x="348" y="319" fontSize="11" fill={C.secondary}>
            非法事件 → Rejected(reason)
          </text>
          <text x="348" y="350" fontSize="11" fill={C.accent}>
            流程证据集中在这里
          </text>

          {/* 右侧：命令与视图是决策的两个不同出口。 */}
          <rect
            x="716"
            y="104"
            width="212"
            height="274"
            rx="12"
            fill={C.bg}
            stroke={C.border}
            strokeWidth="1.4"
          />
          <text
            x="822"
            y="132"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={C.primary}
          >
            决策结果
          </text>
          <rect
            x="738"
            y="154"
            width="168"
            height="56"
            rx="8"
            fill={C.success}
            fillOpacity="0.08"
            stroke={C.success}
            strokeWidth="1.2"
          />
          <text x="754" y="178" fontSize="11" fill={C.secondary}>
            command
          </text>
          <text x="754" y="198" fontSize="12" fontFamily="monospace" fill={C.success}>
            SaveAddress
          </text>
          <rect
            x="738"
            y="232"
            width="168"
            height="56"
            rx="8"
            fill={C.success}
            fillOpacity="0.08"
            stroke={C.success}
            strokeWidth="1.2"
          />
          <text x="754" y="256" fontSize="11" fill={C.secondary}>
            next view
          </text>
          <text x="754" y="276" fontSize="12" fontFamily="monospace" fill={C.success}>
            ConfirmView
          </text>
          <text x="738" y="326" fontSize="11" fill={C.secondary}>
            命令执行副作用
          </text>
          <text x="738" y="348" fontSize="11" fill={C.secondary}>
            视图只负责呈现
          </text>

          {/* ① 页面把事件送入协调层。 */}
          <g
            ref={(element) => {
              phaseRefs.current.event = element;
            }}
            style={phaseStyle("event", 0)}
          >
            <line
              x1="246"
              y1="209"
              x2="314"
              y2="209"
              stroke={C.accent}
              strokeWidth="2.4"
              markerEnd={`url(#${markerId})`}
            />
            <circle cx="280" cy="209" r="6" fill={C.accent} />
            <text x="252" y="193" fontSize="11" fill={C.accent}>
              发送事件
            </text>
          </g>

          {/* ② 状态和事件一起决定流程边。 */}
          <g
            ref={(element) => {
              phaseRefs.current.context = element;
            }}
            style={phaseStyle("context", 1)}
          >
            <rect
              x="338"
              y="174"
              width="286"
              height="76"
              rx="9"
              fill="none"
              stroke={C.warning}
              strokeWidth="2.2"
              strokeDasharray="6 4"
            />
            <text x="348" y="150" fontSize="11" fill={C.warning}>
              只在允许的边上推进
            </text>
          </g>

          {/* ③ 命令和视图从应用控制器分开出去。 */}
          <g
            ref={(element) => {
              phaseRefs.current.command = element;
            }}
            style={phaseStyle("command", 2)}
          >
            <line
              x1="640"
              y1="182"
              x2="708"
              y2="182"
              stroke={C.success}
              strokeWidth="2"
              markerEnd={`url(#${markerId})`}
            />
            <line
              x1="640"
              y1="260"
              x2="708"
              y2="260"
              stroke={C.success}
              strokeWidth="2"
              markerEnd={`url(#${markerId})`}
            />
            <text x="650" y="168" fontSize="11" fill={C.success}>
              执行动作 / 返回下一屏
            </text>
          </g>

          {/* ④ 页面绕过协调层的错误路径。 */}
          <g
            ref={(element) => {
              phaseRefs.current.invalid = element;
            }}
            style={phaseStyle("invalid", 3)}
          >
            <path
              d="M140 230 C 320 438, 610 438, 822 290"
              fill="none"
              stroke={C.danger}
              strokeWidth="2.4"
              strokeDasharray="8 5"
              markerEnd={`url(#${faultMarkerId})`}
            />
            <text x="362" y="438" fontSize="12" fontWeight="700" fill={C.danger}>
              绕过 Application Controller：没有合法状态边
            </text>
          </g>

          {faultInjected && (
            <g>
              <rect
                x="42"
                y="402"
                width="876"
                height="58"
                rx="10"
                fill={C.danger}
                fillOpacity="0.1"
                stroke={C.danger}
                strokeWidth="1.5"
              />
              <text
                x={VIEW_W / 2}
                y="426"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={C.danger}
              >
                故障注入：AddressView 直接打开 ConfirmView
              </text>
              <text
                x={VIEW_W / 2}
                y="447"
                textAnchor="middle"
                fontSize="11"
                fill={C.primary}
              >
                修法：拒绝绕过路径，保留 address + submitAddress 的状态证据
              </text>
            </g>
          )}

          <line
            x1="42"
            y1="480"
            x2="918"
            y2="480"
            stroke={C.border}
            strokeWidth="1"
          />
          <text x="42" y="505" fontSize="11" fill={phase.color}>
            当前步骤：{phase.title} · {phase.note}
          </text>
          <DiagramCaption
            x={VIEW_W - 42}
            y={505}
            text="状态 + 事件 → 命令 / 视图"
          />
        </svg>

        {interactive && (
          <TimelineControls
            timeline={timeline}
            labelText={LABEL_TEXT}
            caption="逐步检查页面、流程协调层和领域动作的责任边界。"
            reset={{
              label: "重置图示",
              ariaLabel: "重置应用控制器演示",
              onClick: reset,
            }}
          />
        )}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        应用控制器把跨页面流程写成可测试的状态与事件决策；故障开关展示页面绕过这条边界时为什么必须拒绝。
      </figcaption>
    </figure>
  );
}

/** 兼容旧章节导入名；目标章节使用带 Diagram 后缀的可审计名称。 */
export const Poeaa24Pattern31ApplicationController =
  Poeaa24Pattern31ApplicationControllerDiagram;

export namespace Poeaa24Pattern31ApplicationControllerDiagram {
  export const Diagram = Poeaa24Pattern31ApplicationControllerDiagram;
}
