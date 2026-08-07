"use client";

/**
 * Tpp20Topic17ShellGamesDiagram / Lab：Topic 17 的 Shell 因果链。
 *
 * 图不把 Shell 画成“命令堆”，而是把一条可复核的工作流画成五个观察站：
 * 命令行给出输入，管道传递筛选结果，退出码暴露成败，幂等性保证重跑安全，
 * 脚本证据让别人能够重建结论。实验台允许移除退出码，观察下游为何不能假装成功。
 */
import { useRef, useState } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";
import {
  DiagramCaption,
  DiagramTitle,
  T,
} from "../../poeaa-enterprise-patterns/poeaa-svg-primitives";

const VIEW_W = 900;
const VIEW_H = 430;
const NODE_W = 140;
const NODE_H = 112;
const START_X = 24;
const START_Y = 104;
const GAP = 34;

const NODES = [
  { key: "command", title: "命令行", detail: "参数化输入" },
  { key: "pipe", title: "管道", detail: "过滤 / 组合" },
  { key: "status", title: "退出码", detail: "成功 / 拒绝" },
  { key: "repeat", title: "幂等性", detail: "重跑不叠加" },
  { key: "evidence", title: "脚本证据", detail: "日志 / 审计" },
] as const;

const STEPS: readonly TeachingStep[] = [
  { label: "command", caption: "命令行：把手工动作写成明确输入" },
  { label: "pipe", caption: "管道：让每个小工具只接收它能处理的对象" },
  { label: "status", caption: "退出码：在第一处失败暴露真实状态" },
  { label: "repeat", caption: "幂等性：重跑不会重复写入或扩大损害" },
  { label: "evidence", caption: "脚本证据：让另一位复核者重建结论" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

function nodeX(index: number) {
  return START_X + index * (NODE_W + GAP);
}

export function Tpp20Topic17ShellGamesDiagram({
  step = 1,
}: {
  step?: 1 | 2 | 3;
}) {
  const focusIndex = step === 1 ? 0 : step === 2 ? 2 : 4;
  const stepCaption =
    step === 1
      ? "先写出输入和边界，Shell 才不是一串不可复查的快捷键"
      : step === 2
        ? "用管道传递小而清楚的契约，并让退出码停在第一处异常"
        : "把可重放的命令、退出状态和日志交给独立复核者";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="tpp20-topic17-shell-games-diagram"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={`提示26：发挥 Shell 命令的威力。第 ${step} 个观察焦点：${stepCaption}。五个观察站依次是命令行、管道、退出码、幂等性和脚本证据。`}
          className="mx-auto block h-auto w-full max-w-[900px]"
        >
          <defs>
            <marker
              id={`tpp20-topic17-shell-arrow-${step}`}
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill={T.secondary} />
            </marker>
          </defs>

          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="提示26：发挥 Shell 命令的威力"
          />
          <text
            x={VIEW_W / 2}
            y={58}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            {stepCaption}
          </text>

          {NODES.map((node, index) => {
            const x = nodeX(index);
            const focused = index === focusIndex;
            return (
              <g key={node.key}>
                {index < NODES.length - 1 && (
                  <line
                    x1={x + NODE_W + 5}
                    y1={START_Y + NODE_H / 2}
                    x2={x + NODE_W + GAP - 6}
                    y2={START_Y + NODE_H / 2}
                    stroke={T.secondary}
                    strokeWidth="1.4"
                    markerEnd={`url(#tpp20-topic17-shell-arrow-${step})`}
                  />
                )}
                <rect
                  x={x}
                  y={START_Y}
                  width={NODE_W}
                  height={NODE_H}
                  rx="10"
                  fill={focused ? T.accent : T.primary}
                  fillOpacity={focused ? "0.12" : "0.03"}
                  stroke={focused ? T.accent : T.border}
                  strokeWidth={focused ? "1.8" : "1.2"}
                />
                <circle
                  cx={x + 22}
                  cy={START_Y + 24}
                  r="10"
                  fill={focused ? T.accent : T.border}
                  fillOpacity={focused ? "0.2" : "0.35"}
                  stroke={focused ? T.accent : T.secondary}
                  strokeWidth="1"
                />
                <text
                  x={x + 22}
                  y={START_Y + 28}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill={focused ? T.accent : T.primary}
                >
                  {index + 1}
                </text>
                <text
                  x={x + NODE_W / 2 + 10}
                  y={START_Y + 30}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="700"
                  fill={focused ? T.accent : T.primary}
                >
                  {node.title}
                </text>
                <text
                  x={x + NODE_W / 2}
                  y={START_Y + 64}
                  textAnchor="middle"
                  fontSize="11"
                  fill={T.secondary}
                >
                  {node.detail}
                </text>
                <text
                  x={x + NODE_W / 2}
                  y={START_Y + 88}
                  textAnchor="middle"
                  fontSize="11"
                  fill={focused ? T.accent : T.secondary}
                >
                  {focused ? "本步观察" : "保留上下文"}
                </text>
              </g>
            );
          })}

          <rect
            x="74"
            y="270"
            width="752"
            height="56"
            rx="10"
            fill={T.accent}
            fillOpacity="0.06"
            stroke={T.border}
            strokeWidth="1"
          />
          <text
            x={VIEW_W / 2}
            y="294"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.primary}
          >
            验收合同：同一输入重跑，首个异常可定位，恢复动作可重放
          </text>
          <text
            x={VIEW_W / 2}
            y="314"
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            不把最终输出当作唯一证据；保存退出码、输入边界与日志
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 16}
            text="先预测哪一站会改变，再用单步、播放或故障注入验证"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Shell 的威力来自小工具之间清楚、可重放的契约，而不是命令数量。
      </figcaption>
    </figure>
  );
}

export function Tpp20Topic17ShellGamesLab() {
  const [faultInjected, setFaultInjected] = useState(false);
  const highlightRefs = useRef<Record<string, SVGRectElement | null>>({});

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        const element = highlightRefs.current[step.label];
        if (!element) return;
        const start = TEACHING_BEAT_MS * index;
        tl.add(
          element,
          {
            opacity: [0.14, 1],
            scale: [0.96, 1],
            duration: TEACHING_BEAT_MS,
            ease: "out(3)",
          },
          start,
        );
        tl.label(step.label, start);
      });
    },
  });

  const reset = () => {
    setFaultInjected(false);
    timeline.goToStep(0);
  };

  const currentStep = STEPS[timeline.currentStep] ?? STEPS[0];
  const reachedFailure = faultInjected && timeline.currentStep >= 2;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="tpp20-topic17-shell-games-lab"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            提示26 · Shell 因果链实验台
          </span>
          <button
            type="button"
            aria-pressed={faultInjected}
            aria-label="注入单故障：移除退出码"
            onClick={() => setFaultInjected((value) => !value)}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
              faultInjected
                ? "border-danger text-danger"
                : "border-border text-secondary hover:border-accent hover:text-primary"
            }`}
          >
            {faultInjected ? "已注入：移除退出码" : "注入单故障"}
          </button>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Shell 因果链实验台。通过播放、暂停、单步或拖动进度观察命令行、管道、退出码、幂等性和脚本证据；注入单故障会移除退出码，首差应在退出码站暴露，并阻止下游假装成功。"
          className="mx-auto block h-auto w-full max-w-[900px]"
        >
          <defs>
            <marker
              id="tpp20-topic17-shell-lab-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill={T.secondary} />
            </marker>
          </defs>

          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="输入如何变成可审计的 Shell 证据"
          />
          <text
            x={VIEW_W / 2}
            y={58}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            当前节点：{currentStep.caption}
          </text>

          {NODES.map((node, index) => {
            const x = nodeX(index);
            const isFaultNode = node.key === "status" && faultInjected;
            const reached = index <= timeline.currentStep;
            return (
              <g key={node.key}>
                {index < NODES.length - 1 && (
                  <line
                    x1={x + NODE_W + 5}
                    y1={START_Y + NODE_H / 2}
                    x2={x + NODE_W + GAP - 6}
                    y2={START_Y + NODE_H / 2}
                    stroke={
                      faultInjected && node.key === "status"
                        ? T.danger
                        : T.secondary
                    }
                    strokeWidth="1.4"
                    strokeDasharray={
                      faultInjected && node.key === "status" ? "5 4" : undefined
                    }
                    markerEnd="url(#tpp20-topic17-shell-lab-arrow)"
                  />
                )}
                <rect
                  x={x}
                  y={START_Y}
                  width={NODE_W}
                  height={NODE_H}
                  rx="10"
                  fill={T.primary}
                  fillOpacity="0.03"
                  stroke={isFaultNode ? T.danger : T.border}
                  strokeWidth={isFaultNode ? "1.8" : "1.2"}
                />
                <rect
                  ref={(element) => {
                    highlightRefs.current[node.key] = element;
                  }}
                  x={x}
                  y={START_Y}
                  width={NODE_W}
                  height={NODE_H}
                  rx="10"
                  fill={isFaultNode ? T.danger : T.accent}
                  fillOpacity="0.14"
                  stroke={isFaultNode ? T.danger : T.accent}
                  strokeWidth="1.8"
                  opacity={reached ? "1" : "0.14"}
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "center",
                  }}
                />
                <text
                  x={x + NODE_W / 2}
                  y={START_Y + 32}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="700"
                  fill={isFaultNode ? T.danger : T.primary}
                >
                  {node.title}
                </text>
                <text
                  x={x + NODE_W / 2}
                  y={START_Y + 62}
                  textAnchor="middle"
                  fontSize="11"
                  fill={isFaultNode ? T.danger : T.secondary}
                >
                  {isFaultNode ? "缺失 → 不可判定" : node.detail}
                </text>
                <text
                  x={x + NODE_W / 2}
                  y={START_Y + 88}
                  textAnchor="middle"
                  fontSize="11"
                  fill={isFaultNode ? T.danger : T.accent}
                >
                  {reached ? "已观察" : "待观察"}
                </text>
              </g>
            );
          })}

          {reachedFailure && (
            <g>
              <path
                d="M 590 236 C 590 298, 286 298, 286 236"
                fill="none"
                stroke={T.danger}
                strokeWidth="1.5"
                strokeDasharray="5 4"
              />
              <text
                x={438}
                y="322"
                textAnchor="middle"
                fontSize="11"
                fill={T.danger}
              >
                首差：退出码缺失，后续结果不能宣布成功
              </text>
            </g>
          )}

          <rect
            x="74"
            y="350"
            width="752"
            height="26"
            rx="8"
            fill={reachedFailure ? T.danger : T.success}
            fillOpacity="0.08"
            stroke={reachedFailure ? T.danger : T.success}
            strokeWidth="1"
          />
          <text
            x={VIEW_W / 2}
            y="368"
            textAnchor="middle"
            fontSize="11"
            fill={reachedFailure ? T.danger : T.success}
          >
            {reachedFailure
              ? "拒绝：恢复退出码，再从原始输入重放"
              : "验收：同一输入可重跑，证据可由另一人复核"}
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="观察变化：只移除退出码，首差必须在状态站出现"
          />
        </svg>

        <div className="mt-3 min-h-11 rounded-control border border-border bg-elevated px-3 py-2 text-center text-xs text-secondary">
          <p role="status">
            当前：第 {timeline.currentStep + 1} 步 · {currentStep.caption}
            {faultInjected ? " · 故障样本需要恢复退出码" : ""}
          </p>
        </div>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先猜首个拒绝点，再用单步或播放验证。"
          reset={{
            label: "重置 Shell 实验台",
            ariaLabel: "重置 Shell 因果链实验台",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        移除退出码试试看：如果下游仍显示成功，说明脚本的验收合同没有覆盖失败。
      </figcaption>
    </figure>
  );
}
