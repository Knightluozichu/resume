"use client";

/**
 * <Poeaa24Pattern29TransformView.Diagram>：转换视图的专属教学图。
 *
 * 图把“呈现模型 → 转换规则 → 多种输出”画成一条窄责任链；时间线只强调
 * 当前观察点，故障开关展示转换器越界的拒绝信号。它不把三个相邻 Web
 * Presentation Patterns 复用成同一张通用流程图。
 */
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

const VIEW_W = 960;
const VIEW_H = 540;

type PhaseId = "input" | "transform" | "output" | "fault";

const PHASE_IDS: readonly PhaseId[] = ["input", "transform", "output", "fault"];

const STEPS: readonly TeachingStep[] = [
  {
    label: "input",
    caption: "应用服务先准备稳定的呈现模型",
  },
  {
    label: "transform",
    caption: "转换规则只读取模型并生成目标文档",
  },
  {
    label: "output",
    caption: "同一输入可以进入 HTML、PDF 或邮件转换器",
  },
  {
    label: "fault",
    caption: "转换器查库或改状态时应在边界处拒绝",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const PHASE_COPY: Readonly<
  Record<PhaseId, { title: string; note: string; color: string }>
> = {
  input: {
    title: "输入稳定",
    note: "呈现模型只带输出需要的字段，转换器不重新解释请求或领域状态。",
    color: T.accent,
  },
  transform: {
    title: "规则转换",
    note: "转换规则负责字段映射、集合遍历和转义，不负责数据库访问。",
    color: T.success,
  },
  output: {
    title: "输出分流",
    note: "HTML、PDF 和邮件可以共享同一份呈现模型，各自保留格式契约。",
    color: T.warning,
  },
  fault: {
    title: "拒绝越界",
    note: "转换器一旦改订单或查库，失败就不再能在转换边界内定位。",
    color: T.danger,
  },
};

export type Poeaa24Pattern29TransformViewDiagramProps = {
  /** Stepper 的静态快照聚焦点；主图不传时由时间线控制。 */
  focus?: PhaseId;
  /** 静态快照关闭控件；主图保持 true 以支持播放、步进、故障注入和重置。 */
  interactive?: boolean;
};

export function Poeaa24Pattern29TransformView({
  focus = "input",
  interactive = true,
}: Poeaa24Pattern29TransformViewDiagramProps) {
  const [faultInjected, setFaultInjected] = useState(false);
  const phaseRefs = useRef<Record<PhaseId, SVGGElement | null>>({
    input: null,
    transform: null,
    output: null,
    fault: null,
  });
  const markerId = `poeaa-transform-view-arrow-${useId().replace(/:/g, "")}`;

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
        tl.label(id, start);
      });
    },
  });

  const focusIndex = Math.max(0, PHASE_IDS.indexOf(focus));
  const currentIndex = interactive ? timeline.currentStep : focusIndex;
  const currentPhase = PHASE_IDS[currentIndex] ?? "input";
  const phase = PHASE_COPY[currentPhase];

  const reset = () => {
    timeline.goToStep(0);
    setFaultInjected(false);
  };

  const phaseStyle = (id: PhaseId, index: number) => ({
    opacity: interactive ? 0 : index === currentIndex ? 1 : 0.18,
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind={interactive ? "poeaa-transform-view" : undefined}
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
              {faultInjected ? "关闭越界故障" : "注入越界故障"}
            </button>
          )}
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="转换视图专属教学图。应用服务先准备呈现模型，转换规则只读取该模型并生成 HTML、PDF 或邮件等输出；若转换器访问数据库或改变订单，图示会将其标记为应拒绝的越界故障。支持播放、暂停、单步、拖动进度、故障注入和重置。"
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
              <path d="M0 0 L9 5 L0 10 z" fill={T.accent} />
            </marker>
          </defs>

          <DiagramTitle
            x={VIEW_W / 2}
            y={30}
            text="Transform View：呈现模型 → 转换规则 → 多种输出"
          />
          <text
            x={VIEW_W / 2}
            y="54"
            textAnchor="middle"
            fontSize="12"
            fill={T.secondary}
          >
            业务决定留在应用服务，表示变化留在可测试的转换边界
          </text>

          {/* 稳定骨架：三段责任边界一直可见，时间线只强调当前观察层。 */}
          <rect
            x="34"
            y="98"
            width="222"
            height="224"
            rx="12"
            fill={T.elevated}
            stroke={T.accent}
            strokeWidth="1.6"
          />
          <rect
            x="34"
            y="98"
            width="222"
            height="42"
            rx="12"
            fill={T.accent}
            fillOpacity="0.12"
          />
          <rect
            x="34"
            y="128"
            width="222"
            height="12"
            fill={T.accent}
            fillOpacity="0.12"
          />
          <text
            x="145"
            y="125"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={T.accent}
          >
            呈现模型
          </text>
          <text x="58" y="174" fontSize="12" fontFamily="monospace" fill={T.primary}>
            {"{ id: \"42\" }"}
          </text>
          <text x="58" y="200" fontSize="12" fontFamily="monospace" fill={T.primary}>
            {"customerName: \"林\""}
          </text>
          <text x="58" y="226" fontSize="12" fontFamily="monospace" fill={T.primary}>
            {"total: 597"}
          </text>
          <text x="58" y="252" fontSize="12" fontFamily="monospace" fill={T.primary}>
            {"items: [...]"}
          </text>
          <text x="58" y="288" fontSize="11" fill={T.secondary}>
            只含可呈现字段
          </text>

          <rect
            x="348"
            y="80"
            width="270"
            height="260"
            rx="12"
            fill={T.elevated}
            stroke={T.success}
            strokeWidth="1.8"
          />
          <rect
            x="348"
            y="80"
            width="270"
            height="42"
            rx="12"
            fill={T.success}
            fillOpacity="0.12"
          />
          <rect
            x="348"
            y="110"
            width="270"
            height="12"
            fill={T.success}
            fillOpacity="0.12"
          />
          <text
            x="483"
            y="107"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={T.success}
          >
            转换规则
          </text>
          <text x="374" y="160" fontSize="12" fontFamily="monospace" fill={T.primary}>
            toHtml(model)
          </text>
          <text x="374" y="188" fontSize="12" fontFamily="monospace" fill={T.primary}>
            escapeText(value)
          </text>
          <text x="374" y="216" fontSize="12" fontFamily="monospace" fill={T.primary}>
            forEach(items)
          </text>
          <line
            x1="374"
            y1="238"
            x2="592"
            y2="238"
            stroke={T.border}
            strokeWidth="1"
          />
          <text x="374" y="266" fontSize="11" fill={T.secondary}>
            不查库 · 不改状态 · 可重放
          </text>
          <text x="374" y="294" fontSize="11" fill={T.secondary}>
            规则缺陷在转换测试中暴露
          </text>

          <rect
            x="710"
            y="80"
            width="216"
            height="260"
            rx="12"
            fill={T.elevated}
            stroke={T.warning}
            strokeWidth="1.6"
          />
          <rect
            x="710"
            y="80"
            width="216"
            height="42"
            rx="12"
            fill={T.warning}
            fillOpacity="0.12"
          />
          <rect
            x="710"
            y="110"
            width="216"
            height="12"
            fill={T.warning}
            fillOpacity="0.12"
          />
          <text
            x="818"
            y="107"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={T.warning}
          >
            输出格式
          </text>
          <text x="736" y="164" fontSize="13" fontWeight="700" fill={T.primary}>
            HTML
          </text>
          <text x="736" y="190" fontSize="12" fill={T.secondary}>
            页面响应
          </text>
          <text x="736" y="230" fontSize="13" fontWeight="700" fill={T.primary}>
            PDF
          </text>
          <text x="736" y="256" fontSize="12" fill={T.secondary}>
            导出文档
          </text>
          <text x="736" y="296" fontSize="13" fontWeight="700" fill={T.primary}>
            Email
          </text>
          <text x="736" y="322" fontSize="12" fill={T.secondary}>
            纯文本正文
          </text>

          {/* ① 呈现模型进入转换边界。 */}
          <g
            ref={(element) => {
              phaseRefs.current.input = element;
            }}
            style={phaseStyle("input", 0)}
          >
            <line
              x1="256"
              y1="210"
              x2="336"
              y2="210"
              stroke={T.accent}
              strokeWidth="2.4"
              markerEnd={`url(#${markerId})`}
            />
            <text x="268" y="194" fontSize="11" fill={T.accent}>
              只读输入
            </text>
          </g>

          {/* ② 转换规则生成一个或多个目标输出。 */}
          <g
            ref={(element) => {
              phaseRefs.current.transform = element;
            }}
            style={phaseStyle("transform", 1)}
          >
            <line
              x1="618"
              y1="170"
              x2="698"
              y2="170"
              stroke={T.success}
              strokeWidth="2.4"
              markerEnd={`url(#${markerId})`}
            />
            <line
              x1="618"
              y1="230"
              x2="698"
              y2="230"
              stroke={T.success}
              strokeWidth="1.6"
              markerEnd={`url(#${markerId})`}
            />
            <line
              x1="618"
              y1="290"
              x2="698"
              y2="290"
              stroke={T.success}
              strokeWidth="1.6"
              markerEnd={`url(#${markerId})`}
            />
            <text x="628" y="150" fontSize="11" fill={T.success}>
              映射与转义
            </text>
          </g>

          {/* ③ 输出格式分流，但业务输入保持同一份呈现模型。 */}
          <g
            ref={(element) => {
              phaseRefs.current.output = element;
            }}
            style={phaseStyle("output", 2)}
          >
            <rect
              x="724"
              y="350"
              width="188"
              height="42"
              rx="8"
              fill={T.warning}
              fillOpacity="0.12"
              stroke={T.warning}
              strokeWidth="1.2"
            />
            <text x="818" y="376" textAnchor="middle" fontSize="12" fill={T.warning}>
              同一输入，不同格式契约
            </text>
          </g>

          {/* ④ 转换器越界是拒绝信号，而不是继续加功能。 */}
          <g
            ref={(element) => {
              phaseRefs.current.fault = element;
            }}
            style={phaseStyle("fault", 3)}
          >
            <rect
              x="34"
              y="382"
              width="892"
              height="64"
              rx="10"
              fill={T.danger}
              fillOpacity="0.08"
              stroke={T.danger}
              strokeWidth="1.5"
              strokeDasharray="6 4"
            />
            <line
              x1="470"
              y1="340"
              x2="470"
              y2="374"
              stroke={T.danger}
              strokeWidth="1.8"
              strokeDasharray="6 4"
            />
            <text x="58" y="408" fontSize="12" fontWeight="700" fill={T.danger}>
              失败路径：转换器查库、改订单或承担全局导航
            </text>
            <text x="58" y="430" fontSize="11" fill={T.primary}>
              修法：退回应用服务准备呈现模型；让转换规则保持纯、窄、可重放。
            </text>
          </g>

          {faultInjected && (
            <g>
              <rect
                x="34"
                y="458"
                width="892"
                height="34"
                rx="8"
                fill={T.danger}
                fillOpacity="0.16"
                stroke={T.danger}
                strokeWidth="1.2"
              />
              <text
                x={VIEW_W / 2}
                y="480"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={T.danger}
              >
                故障注入：转换规则正在读取订单表，当前输出应被拒绝
              </text>
            </g>
          )}

          <text x="34" y="518" fontSize="11" fill={phase.color}>
            当前步骤：{phase.title} · {phase.note}
          </text>
          <DiagramCaption
            x={VIEW_W - 12}
            y={518}
            text="Model → Transform Rules → Output"
          />
        </svg>

        {interactive && (
          <TimelineControls
            timeline={timeline}
            labelText={LABEL_TEXT}
            caption="按步骤核对输入、转换和输出的责任；最后注入越界故障，再重置并重放。"
            reset={{
              label: "重置",
              ariaLabel: "重置转换视图演示",
              onClick: reset,
            }}
          />
        )}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        转换视图把呈现模型交给显式规则，再分流到不同输出；转换器越过数据访问或业务边界时，应拒绝而不是继续扩张。
      </figcaption>
    </figure>
  );
}

// 保留既有注册表使用的函数名；命名空间成员让 MDX 能以专属 Diagram 名称复用同一实现。
export namespace Poeaa24Pattern29TransformView {
  export const Diagram = Poeaa24Pattern29TransformView;
}
