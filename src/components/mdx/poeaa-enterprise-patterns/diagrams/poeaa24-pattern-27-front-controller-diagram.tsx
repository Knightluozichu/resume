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
import { T, DiagramCaption, DiagramTitle } from "../poeaa-svg-primitives";

/**
 * <Poeaa24Pattern27FrontControllerDiagram>：前端控制器的请求边界图。
 *
 * 这张图不是把标题换成另一章的通用流程图，而是围绕本章的订单后台案例，
 * 依次显示「请求进入 → 共同策略 → 命令分发 → 故障拒绝」四个观察点。故障
 * 开关会让读者看见绕过统一入口后，审计与安全检查为什么不再可靠。
 */

const VIEW_W = 900;
const VIEW_H = 500;
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

type PhaseId = "request" | "guard" | "dispatch" | "failure";

const PHASE_IDS: readonly PhaseId[] = [
  "request",
  "guard",
  "dispatch",
  "failure",
];

const STEPS: readonly TeachingStep[] = [
  {
    label: "request",
    caption: "请求先到同一个入口，而不是散落到每个页面",
  },
  {
    label: "guard",
    caption: "入口集中执行认证、日志和国际化等共同工作",
  },
  {
    label: "dispatch",
    caption: "路由表把具体动作交给对应的命令对象",
  },
  {
    label: "failure",
    caption: "若入口被绕过，统一安全与审计就失去证据",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const PHASE_COPY: Record<PhaseId, { title: string; note: string; color: string }> = {
  request: {
    title: "入口集中",
    note: "所有订单请求先穿过同一个边界，后续观察才有共同起点。",
    color: C.accent,
  },
  guard: {
    title: "共同策略",
    note: "认证、日志和语言偏好在入口完成，命令对象不重复这段工作。",
    color: C.warning,
  },
  dispatch: {
    title: "动作分发",
    note: "入口只解释请求并选择命令；查看、编辑、删除各自承接业务动作。",
    color: C.success,
  },
  failure: {
    title: "拒绝绕过",
    note: "发现旧入口绕过统一边界时，应阻止它，而不是继续扩大中央控制器。",
    color: C.danger,
  },
};

export type Poeaa24Pattern27FrontControllerDiagramProps = {
  /** Stepper 的静态快照聚焦点；主图不传时由时间线控制。 */
  focus?: PhaseId;
  /** 静态快照关闭控件；主图保持 true 以便播放、步进和故障注入。 */
  interactive?: boolean;
};

export function Poeaa24Pattern27FrontControllerDiagram({
  focus = "request",
  interactive = true,
}: Poeaa24Pattern27FrontControllerDiagramProps) {
  const [faultInjected, setFaultInjected] = useState(false);
  const phaseRefs = useRef<Record<PhaseId, SVGGElement | null>>({
    request: null,
    guard: null,
    dispatch: null,
    failure: null,
  });
  const markerId = `poeaa-front-controller-arrow-${useId().replace(/:/g, "")}`;

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      if (!interactive) {
        PHASE_IDS.forEach((id) => tl.label(id, 0));
        return;
      }

      PHASE_IDS.forEach((id, index) => {
        const element = phaseRefs.current[id];
        const start = TEACHING_BEAT_MS * index;
        if (element) {
          tl.add(
            element,
            {
              opacity: [0, 1],
              translateY: [10, 0],
              duration: TEACHING_BEAT_MS * 0.8,
              ease: "out(3)",
            },
            start,
          );
        }
        // 每个 label 与该步动画的起始时刻对齐，字幕不会落后图形。
        tl.label(id, start);
      });
    },
  });

  const focusIndex = Math.max(0, PHASE_IDS.indexOf(focus));
  const currentIndex = interactive ? timeline.currentStep : focusIndex;
  const currentPhase = PHASE_IDS[currentIndex] ?? "request";
  const phase = PHASE_COPY[currentPhase];

  const reset = () => {
    timeline.seek(0);
    setFaultInjected(false);
  };

  const phaseStyle = (id: PhaseId, index: number) => ({
    opacity: interactive ? 0 : index === currentIndex ? 1 : 0.18,
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind={interactive ? "poeaa-front-controller" : undefined}
        className="rounded-card border border-border bg-elevated p-5"
      >
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            专属机制图 · {phase.title}
          </span>
          {interactive && (
            <button
              type="button"
              onClick={() => setFaultInjected((value) => !value)}
              aria-pressed={faultInjected}
              className={`rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                faultInjected
                  ? "border-danger text-danger"
                  : "border-border text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              {faultInjected ? "关闭绕过故障" : "注入绕过故障"}
            </button>
          )}
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="前端控制器请求边界教学图。订单请求先到单一入口，入口集中认证、日志和国际化等共同策略，再通过路由表分发到查看、编辑或删除命令。打开绕过故障后，图中显示旧入口跳过统一边界，安全与审计证据失效。支持播放、暂停、单步、拖动进度、故障注入和重置。"
          className="mx-auto block h-auto w-full max-w-[900px]"
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
              <path d="M0 0 L9 5 L0 10 z" fill={C.accent} />
            </marker>
          </defs>

          <DiagramTitle
            x={VIEW_W / 2}
            y={30}
            text="订单后台：一个入口吸收共同请求工作"
          />
          <text
            x={VIEW_W / 2}
            y="54"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            统一边界负责解释与守门，具体命令负责业务动作
          </text>

          {/* 稳定骨架：各节点一直可见，时间线只强调当前教学层。 */}
          <rect
            x="34"
            y="124"
            width="150"
            height="72"
            rx="10"
            fill={C.bg}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text
            x="109"
            y="153"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={C.primary}
          >
            浏览器请求
          </text>
          <text
            x="109"
            y="177"
            textAnchor="middle"
            fontSize="11"
            fill={C.secondary}
          >
            GET /orders/42
          </text>

          <rect
            x="252"
            y="92"
            width="292"
            height="246"
            rx="12"
            fill={C.elevated}
            stroke={C.accent}
            strokeWidth="1.8"
          />
          <rect
            x="252"
            y="92"
            width="292"
            height="42"
            rx="12"
            fill={C.accent}
            fillOpacity="0.12"
          />
          <rect
            x="252"
            y="122"
            width="292"
            height="12"
            fill={C.accent}
            fillOpacity="0.12"
          />
          <text
            x="398"
            y="119"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={C.accent}
          >
            Front Controller
          </text>
          <text x="276" y="166" fontSize="12" fill={C.primary}>
            解释请求 · 检查边界 · 选择命令
          </text>
          <line
            x1="276"
            y1="180"
            x2="520"
            y2="180"
            stroke={C.border}
            strokeWidth="1"
          />
          <text x="276" y="208" fontSize="12" fill={C.secondary}>
            认证 / 日志 / 国际化
          </text>
          <text x="276" y="235" fontSize="12" fill={C.secondary}>
            路由表：method + path → handler
          </text>
          <text x="276" y="262" fontSize="12" fill={C.secondary}>
            不直接编写订单业务规则
          </text>
          <text x="276" y="305" fontSize="11" fill={C.accent}>
            共同工作在这里集中一次
          </text>

          <rect
            x="624"
            y="92"
            width="242"
            height="246"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text
            x="745"
            y="119"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={C.primary}
          >
            命令对象
          </text>
          <rect
            x="650"
            y="142"
            width="190"
            height="42"
            rx="8"
            fill={C.success}
            fillOpacity="0.08"
            stroke={C.success}
            strokeWidth="1.2"
          />
          <text
            x="745"
            y="168"
            textAnchor="middle"
            fontSize="12"
            fill={C.success}
          >
            ViewOrderCommand
          </text>
          <rect
            x="650"
            y="198"
            width="190"
            height="42"
            rx="8"
            fill={C.success}
            fillOpacity="0.08"
            stroke={C.success}
            strokeWidth="1.2"
          />
          <text
            x="745"
            y="224"
            textAnchor="middle"
            fontSize="12"
            fill={C.success}
          >
            EditOrderCommand
          </text>
          <rect
            x="650"
            y="254"
            width="190"
            height="42"
            rx="8"
            fill={C.success}
            fillOpacity="0.08"
            stroke={C.success}
            strokeWidth="1.2"
          />
          <text
            x="745"
            y="280"
            textAnchor="middle"
            fontSize="12"
            fill={C.success}
          >
            DeleteOrderCommand
          </text>

          {/* ① 请求抵达同一入口。 */}
          <g
            ref={(element) => {
              phaseRefs.current.request = element;
            }}
            style={phaseStyle("request", 0)}
          >
            <line
              x1="184"
              y1="160"
              x2="244"
              y2="160"
              stroke={C.accent}
              strokeWidth="2.4"
              markerEnd={`url(#${markerId})`}
            />
            <circle cx="214" cy="160" r="6" fill={C.accent} />
            <text x="192" y="145" fontSize="11" fill={C.accent}>
              单一入口
            </text>
          </g>

          {/* ② 共同策略在入口执行。 */}
          <g
            ref={(element) => {
              phaseRefs.current.guard = element;
            }}
            style={phaseStyle("guard", 1)}
          >
            <rect
              x="268"
              y="188"
              width="260"
              height="72"
              rx="8"
              fill={C.warning}
              fillOpacity="0.12"
              stroke={C.warning}
              strokeWidth="1.5"
            />
            <text x="284" y="212" fontSize="12" fontWeight="700" fill={C.warning}>
              共同策略只执行一次
            </text>
            <text x="284" y="236" fontSize="11" fill={C.primary}>
              认证 · 日志 · 国际化
            </text>
          </g>

          {/* ③ 路由表将动作分发给具体命令。 */}
          <g
            ref={(element) => {
              phaseRefs.current.dispatch = element;
            }}
            style={phaseStyle("dispatch", 2)}
          >
            <line
              x1="544"
              y1="160"
              x2="616"
              y2="163"
              stroke={C.success}
              strokeWidth="2"
              markerEnd={`url(#${markerId})`}
            />
            <line
              x1="544"
              y1="214"
              x2="616"
              y2="219"
              stroke={C.success}
              strokeWidth="1.5"
              markerEnd={`url(#${markerId})`}
            />
            <line
              x1="544"
              y1="268"
              x2="616"
              y2="275"
              stroke={C.success}
              strokeWidth="1.5"
              markerEnd={`url(#${markerId})`}
            />
            <text x="548" y="146" fontSize="11" fill={C.success}>
              选择 handler
            </text>
          </g>

          {/* ④ 绕过入口时，统一审计不再成立。 */}
          <g
            ref={(element) => {
              phaseRefs.current.failure = element;
            }}
            style={phaseStyle("failure", 3)}
          >
            <rect
              x="40"
              y="360"
              width="826"
              height="58"
              rx="9"
              fill={C.danger}
              fillOpacity="0.09"
              stroke={C.danger}
              strokeWidth="1.5"
              strokeDasharray="6 4"
            />
            <line
              x1="108"
              y1="196"
              x2="180"
              y2="360"
              stroke={C.danger}
              strokeWidth="1.6"
              strokeDasharray="6 4"
            />
            <text x="62" y="385" fontSize="12" fontWeight="700" fill={C.danger}>
              失败路径：旧页面入口绕过 Front Controller
            </text>
            <text x="62" y="405" fontSize="11" fill={C.primary}>
              认证与审计没有共同证据；修法是收紧入口，而不是把更多业务塞进中央控制器。
            </text>
          </g>

          {faultInjected && (
            <g>
              <rect
                x="40"
                y="432"
                width="826"
                height="34"
                rx="8"
                fill={C.danger}
                fillOpacity="0.16"
                stroke={C.danger}
                strokeWidth="1.2"
              />
              <text
                x={VIEW_W / 2}
                y="454"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={C.danger}
              >
                故障注入：发现了绕过统一入口的旧调用路径
              </text>
            </g>
          )}

          <rect
            x="40"
            y="472"
            width="826"
            height="1"
            fill={C.border}
          />
          <text x="40" y="492" fontSize="11" fill={phase.color}>
            当前步骤：{phase.title} · {phase.note}
          </text>
          <DiagramCaption
            x={VIEW_W - 12}
            y={492}
            text="Front Controller → Command"
          />
        </svg>

        {interactive && (
          <TimelineControls
            timeline={timeline}
            labelText={LABEL_TEXT}
            caption="按步骤观察共同工作和具体动作的边界；再注入故障，检查是否有人绕过入口。"
          />
        )}
        {interactive && (
          <div className="mt-3 flex justify-center">
            <button
              type="button"
              onClick={reset}
              className="rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
            >
              重置图示
            </button>
          </div>
        )}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        前端控制器把共同请求工作留在单一入口，再把具体动作交给命令对象；入口越过边界时，安全与审计就无法统一验证。
      </figcaption>
    </figure>
  );
}

// 保留既有注册表使用的函数名，同时挂载以 Diagram 结尾的成员。
// 这样隔离修复不需要改生成的共享注册表，MDX 仍可使用可审计的
// <Poeaa24Pattern27FrontController.Diagram />。
export function Poeaa24Pattern27FrontController(
  props: Poeaa24Pattern27FrontControllerDiagramProps,
) {
  return <Poeaa24Pattern27FrontControllerDiagram {...props} />;
}

export namespace Poeaa24Pattern27FrontController {
  export const Diagram = Poeaa24Pattern27FrontControllerDiagram;
}
