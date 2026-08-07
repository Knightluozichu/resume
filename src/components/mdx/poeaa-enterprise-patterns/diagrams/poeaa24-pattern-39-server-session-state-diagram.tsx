"use client";

import { useRef, useState } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";
import { T, DiagramCaption, DiagramTitle } from "../poeaa-svg-primitives";

/**
 * Server Session State 的章专属教学图：请求只携带会话标识，服务器节点
 * 负责定位、更新、清理与故障转移；错误模式展示把权威状态交回客户端的风险。
 */

const VIEW_W = 900;
const VIEW_H = 520;

const STEPS: readonly TeachingStep[] = [
  { label: "request", caption: "请求携带 sid=abc123，不携带购物车正文" },
  { label: "locate", caption: "节点依据 sid 找到服务器端记录" },
  { label: "update", caption: "业务更新后序列化并写回状态存储" },
  { label: "expire", caption: "到期记录被拒绝并进入清理" },
  { label: "failover", caption: "节点故障后由副本恢复，或明确报告失效" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const EVENTS = [
  {
    id: "request",
    y: 126,
    label: "请求：Cookie 只带 sid=abc123",
    color: T.accent,
    dashed: false,
  },
  {
    id: "locate",
    y: 176,
    label: "节点 A：验证 sid，读取服务器记录",
    color: T.success,
    dashed: false,
  },
  {
    id: "update",
    y: 226,
    label: "状态存储：写回 cart=3，并刷新 TTL",
    color: T.accent,
    dashed: false,
  },
  {
    id: "expire",
    y: 276,
    label: "清理器：TTL 到期，拒绝旧记录",
    color: T.warning,
    dashed: false,
  },
  {
    id: "failover",
    y: 326,
    label: "节点 B：从副本恢复，或返回明确失效",
    color: T.danger,
    dashed: true,
  },
] as const;

export type Poeaa24Pattern39ServerSessionStateDiagramProps = {
  /** Stepper 使用静态快照；省略时启用主交互时间线。 */
  step?: 1 | 2 | 3;
  interactive?: boolean;
};

export function Poeaa24Pattern39ServerSessionStateDiagram({
  step,
  interactive = true,
}: Poeaa24Pattern39ServerSessionStateDiagramProps = {}) {
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
        // 每个 label 放在本步动画起始时刻，单步时字幕与事件同步。
        tl.label(event.id, start);
      });
    },
  });

  const activeStep = step ?? timeline.currentStep + 1;
  const storeLabel = faultInjected
    ? "客户端正文可被篡改"
    : activeStep >= 5
      ? "副本 / 明确失效"
      : "sessions[abc123]";
  const storeDetail = faultInjected
    ? "权威边界已越界"
    : activeStep >= 4
      ? "TTL / 恢复语义"
      : "cart=3 · user=42";

  const resetAll = () => {
    setFaultInjected(false);
    timeline.goToStep(0);
  };

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-6">
        {interactive && (
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
              <span aria-hidden="true">◇</span>
              可交互时序图
            </span>
            <span className="text-xs text-secondary">先预测，再验证会话责任链</span>
          </div>
        )}

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="服务器会话状态五步教学图。请求只携带 sid 会话标识，服务器节点定位并更新会话记录，清理器处理过期状态，节点故障后由副本恢复或明确报告会话失效。主图支持播放、暂停、单步、拖动进度、重置和错误模式切换。"
          className="mx-auto block h-auto w-full max-w-[900px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={38}
            text="Server Session State：服务器保管状态，客户端只带标识"
          />
          <text
            x={VIEW_W / 2}
            y={64}
            textAnchor="middle"
            fontSize="12"
            fill={T.secondary}
          >
            定位、更新、过期与恢复都必须有可观察的责任边界
          </text>

          <line x1="74" y1="88" x2="846" y2="88" stroke={T.border} strokeWidth="1" />
          <text x="88" y="110" fontSize="12" fontWeight="700" fill={T.primary}>
            请求时间线
          </text>
          <text x="692" y="110" fontSize="12" fontWeight="700" fill={T.primary}>
            当前服务器状态
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
                x1="90"
                y1={event.y}
                x2="646"
                y2={event.y}
                stroke={event.color}
                strokeWidth="1.8"
                strokeDasharray={event.dashed ? "6 4" : undefined}
              />
              <circle cx="90" cy={event.y} r="5" fill={event.color} />
              <text x="110" y={event.y + 5} fontSize="13" fill={event.color}>
                {event.label}
              </text>
            </g>
          ))}

          <rect
            x="674"
            y="122"
            width="172"
            height="226"
            rx="10"
            fill={T.primary}
            fillOpacity="0.04"
            stroke={T.border}
            strokeWidth="1"
          />
          <text x="760" y="148" textAnchor="middle" fontSize="12" fill={T.secondary}>
            会话存储
          </text>
          <text x="760" y="184" textAnchor="middle" fontSize="16" fontWeight="700" fill={faultInjected ? T.danger : T.accent}>
            {storeLabel}
          </text>
          <line x1="702" y1="204" x2="818" y2="204" stroke={T.border} />
          <text x="760" y="232" textAnchor="middle" fontSize="12" fill={T.secondary}>
            当前值
          </text>
          <text x="760" y="258" textAnchor="middle" fontSize="14" fontWeight="700" fill={faultInjected ? T.danger : T.success}>
            {storeDetail}
          </text>
          <text x="760" y="292" textAnchor="middle" fontSize="12" fill={T.secondary}>
            {activeStep >= 4 ? "到期 / 故障语义" : "服务端权威边界"}
          </text>
          <text x="760" y="318" textAnchor="middle" fontSize="11" fill={T.secondary}>
            {faultInjected ? "不要信任请求正文" : "读写都记录节点与 sid"}
          </text>

          {faultInjected && (
            <g>
              <rect
                x="74"
                y="366"
                width="772"
                height="48"
                rx="9"
                fill={T.danger}
                fillOpacity="0.1"
                stroke={T.danger}
                strokeWidth="1.5"
              />
              <text x="460" y="387" textAnchor="middle" fontSize="12" fontWeight="700" fill={T.danger}>
                错误模式：请求直接携带 cart=999
              </text>
              <text x="460" y="404" textAnchor="middle" fontSize="11" fill={T.danger}>
                客户端越过服务器状态边界，篡改、重放与越权无法被存储层阻止
              </text>
            </g>
          )}

          <rect
            x="74"
            y={faultInjected ? 430 : 366}
            width="772"
            height="48"
            rx="9"
            fill={T.accent}
            fillOpacity="0.06"
            stroke={T.border}
            strokeWidth="1"
          />
          <text
            x="460"
            y={faultInjected ? 451 : 387}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.primary}
          >
            不变量：请求只能定位状态，业务权威始终留在服务器
          </text>
          <text
            x="460"
            y={faultInjected ? 469 : 405}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            失效、清理和故障转移必须返回可解释结果
          </text>
          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 12}
            text="状态位置是架构决定：会话标识不是状态本身"
          />
        </svg>

        {interactive && (
          <>
            <TimelineControls
              timeline={timeline}
              labelText={LABEL_TEXT}
              caption="步点展示正常路径；错误模式把权威状态移入请求正文，便于对照失败证据。"
              reset={{
                label: "重置演示",
                ariaLabel: "重置服务器会话状态演示",
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
                {faultInjected ? "当前：请求正文可以越过服务器边界" : "当前：服务器拥有权威会话状态"}
              </span>
            </div>
          </>
        )}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        服务器会话状态把业务资料留在服务端；真正需要验收的是定位、清理、多节点访问和节点故障后的结果。
      </figcaption>
    </figure>
  );
}
