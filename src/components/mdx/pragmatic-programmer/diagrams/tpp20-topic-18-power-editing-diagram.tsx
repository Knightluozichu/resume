"use client";

/**
 * Topic 18 专属图示：把“游刃有余地使用编辑器”拆成一条可回退的编辑链。
 * 图中的对象是编辑者实际要交接的工件：选择范围、可重放宏、差异预览和回退点。
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

const VIEW_W = 980;
const VIEW_H = 470;
const CARD_W = 158;
const CARD_H = 148;
const START_X = 24;
const START_Y = 106;
const GAP = 34;

const STAGES = [
  { key: "locate", title: "定位", detail: "文件 / 符号" },
  { key: "select", title: "选择", detail: "范围 / 条件" },
  { key: "transform", title: "变换", detail: "宏 / 批量动作" },
  { key: "preview", title: "预览", detail: "差异 / 影响面" },
  { key: "verify", title: "验证", detail: "测试 / 撤销" },
] as const;

const STEPS: readonly TeachingStep[] = [
  { label: "locate", caption: "定位：先找到真正要改的文件或符号" },
  { label: "select", caption: "选择：把作用范围写成可检查的条件" },
  { label: "transform", caption: "变换：把重复动作录成可重放的宏" },
  { label: "preview", caption: "预览：先看差异，再决定是否落盘" },
  { label: "verify", caption: "验证：用测试和撤销边界确认没有越界" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

function stageX(index: number) {
  return START_X + index * (CARD_W + GAP);
}

function stageFocus(step: 1 | 2 | 3) {
  return step === 1 ? 0 : step === 2 ? 2 : 4;
}

function stageCaption(step: 1 | 2 | 3) {
  return step === 1
    ? "先缩小范围：编辑得快之前，要先知道改的是谁"
    : step === 2
      ? "把一次变更变成可重复动作，并在提交前保留差异"
      : "验证不是最后点一下保存，而是确认结果仍可回退";
}

function StageCard({
  index,
  active,
  reached,
  faulty,
  reference,
}: {
  index: number;
  active: boolean;
  reached: boolean;
  faulty?: boolean;
  reference?: (element: SVGRectElement | null) => void;
}) {
  const stage = STAGES[index];
  const x = stageX(index);
  const fill = faulty ? T.danger : active ? T.accent : T.primary;
  return (
    <g>
      <rect
        x={x}
        y={START_Y}
        width={CARD_W}
        height={CARD_H}
        rx="12"
        fill={T.primary}
        fillOpacity="0.025"
        stroke={faulty ? T.danger : T.border}
        strokeWidth={faulty || active ? "1.8" : "1.2"}
      />
      <rect
        ref={reference}
        x={x}
        y={START_Y}
        width={CARD_W}
        height={CARD_H}
        rx="12"
        fill={fill}
        fillOpacity={faulty ? "0.14" : active ? "0.13" : "0.06"}
        stroke={fill}
        strokeWidth={active || faulty ? "1.8" : "1"}
        opacity={reached ? "1" : "0.18"}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      />
      <circle
        cx={x + 22}
        cy={START_Y + 24}
        r="11"
        fill={fill}
        fillOpacity="0.18"
        stroke={fill}
        strokeWidth="1"
      />
      <text
        x={x + 22}
        y={START_Y + 28}
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        fill={fill}
      >
        {index + 1}
      </text>
      <text
        x={x + CARD_W / 2 + 10}
        y={START_Y + 31}
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={faulty ? T.danger : active ? T.accent : T.primary}
      >
        {stage.title}
      </text>
      <text
        x={x + CARD_W / 2}
        y={START_Y + 61}
        textAnchor="middle"
        fontSize="11"
        fill={faulty ? T.danger : T.secondary}
      >
        {faulty ? "被跳过 → 不可确认" : stage.detail}
      </text>
      {index === 0 && (
        <>
          <rect
            x={x + 24}
            y={START_Y + 82}
            width="110"
            height="12"
            rx="3"
            fill={fill}
            fillOpacity="0.22"
          />
          <rect
            x={x + 38}
            y={START_Y + 101}
            width="82"
            height="8"
            rx="3"
            fill={T.secondary}
            fillOpacity="0.28"
          />
        </>
      )}
      {index === 1 && (
        <>
          <path
            d={`M ${x + 28} ${START_Y + 88} h 102 M ${x + 44} ${START_Y + 106} h 70`}
            stroke={fill}
            strokeWidth="5"
            strokeLinecap="round"
            strokeOpacity="0.38"
          />
          <circle
            cx={x + 39}
            cy={START_Y + 88}
            r="5"
            fill={fill}
            fillOpacity="0.5"
          />
        </>
      )}
      {index === 2 && (
        <>
          <path
            d={`M ${x + 30} ${START_Y + 90} h 78 M ${x + 46} ${START_Y + 108} h 62`}
            stroke={fill}
            strokeWidth="5"
            strokeLinecap="round"
            strokeOpacity="0.38"
          />
          <path
            d={`M ${x + 120} ${START_Y + 86} q 18 18 0 31`}
            fill="none"
            stroke={fill}
            strokeWidth="2"
            strokeOpacity="0.75"
          />
          <path
            d={`M ${x + 120} ${START_Y + 117} l -7 -2 l 5 -5`}
            fill={fill}
          />
        </>
      )}
      {index === 3 && (
        <>
          <rect
            x={x + 25}
            y={START_Y + 81}
            width="108"
            height="31"
            rx="4"
            fill={fill}
            fillOpacity="0.08"
            stroke={fill}
            strokeDasharray="4 3"
          />
          <path
            d={`M ${x + 35} ${START_Y + 92} l 9 8 l 15 -16 M ${x + 73} ${START_Y + 96} h 48`}
            fill="none"
            stroke={fill}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      )}
      {index === 4 && (
        <>
          <circle
            cx={x + 52}
            cy={START_Y + 96}
            r="13"
            fill="none"
            stroke={fill}
            strokeWidth="2"
          />
          <path
            d={`M ${x + 52} ${START_Y + 88} v 8 l 5 4`}
            stroke={fill}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d={`M ${x + 82} ${START_Y + 104} l 8 8 l 17 -22`}
            fill="none"
            stroke={fill}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
      <text
        x={x + CARD_W / 2}
        y={START_Y + 136}
        textAnchor="middle"
        fontSize="11"
        fill={faulty ? T.danger : active ? T.accent : T.secondary}
      >
        {faulty ? "首差在此暴露" : reached ? "已留下工件" : "等待输入"}
      </text>
    </g>
  );
}

function FlowArrows({ faultInjected = false }: { faultInjected?: boolean }) {
  return (
    <>
      {STAGES.slice(0, -1).map((stage, index) => {
        const x = stageX(index);
        const broken = faultInjected && stage.key === "preview";
        return (
          <line
            key={stage.key}
            x1={x + CARD_W + 5}
            y1={START_Y + CARD_H / 2}
            x2={x + CARD_W + GAP - 7}
            y2={START_Y + CARD_H / 2}
            stroke={broken ? T.danger : T.secondary}
            strokeWidth="1.6"
            strokeDasharray={broken ? "5 4" : undefined}
            markerEnd="url(#tpp20-topic18-arrow)"
          />
        );
      })}
    </>
  );
}

export function Tpp20Topic18PowerEditingDiagram({
  step = 1,
}: {
  step?: 1 | 2 | 3;
}) {
  const focus = stageFocus(step);
  const caption = stageCaption(step);
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="tpp20-topic-18-power-editing-diagram"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={`提示27：游刃有余地使用编辑器。${caption}。编辑链依次经过定位、选择、变换、预览和验证。`}
          className="mx-auto block h-auto w-full max-w-[980px]"
        >
          <defs>
            <marker
              id="tpp20-topic18-arrow"
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
            text="提示27：游刃有余地使用编辑器"
          />
          <text
            x={VIEW_W / 2}
            y="59"
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            {caption}
          </text>
          <FlowArrows />
          {STAGES.map((stage, index) => (
            <StageCard
              key={stage.key}
              index={index}
              active={index === focus}
              reached={index <= focus}
            />
          ))}
          <rect
            x="90"
            y="307"
            width="800"
            height="62"
            rx="12"
            fill={T.accent}
            fillOpacity="0.06"
            stroke={T.border}
            strokeWidth="1"
          />
          <text
            x={VIEW_W / 2}
            y="333"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.primary}
          >
            验收合同：重复动作可重放，影响范围可见，结果仍能撤销
          </text>
          <text
            x={VIEW_W / 2}
            y="354"
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            速度来自更短的反馈回路，不来自跳过选择与复核
          </text>
          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 16}
            text="先预测哪一站会拒绝，再用单步、播放或故障注入验证"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        强编辑能力的核心不是快捷键数量，而是每次批量变更都留有回看与回退点。
      </figcaption>
    </figure>
  );
}

export function Tpp20Topic18PowerEditingLab() {
  const [faultInjected, setFaultInjected] = useState(false);
  const highlightRefs = useRef<Record<string, SVGRectElement | null>>({});
  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((stage, index) => {
        const element = highlightRefs.current[stage.label];
        if (!element) return;
        const start = TEACHING_BEAT_MS * index;
        tl.add(
          element,
          {
            opacity: [0.18, 1],
            scale: [0.96, 1],
            duration: TEACHING_BEAT_MS,
            ease: "out(3)",
          },
          start,
        );
        tl.label(stage.label, start);
      });
    },
  });
  const currentStage = STEPS[timeline.currentStep] ?? STEPS[0];
  const reachedFailure = faultInjected && timeline.currentStep >= 3;
  const reset = () => {
    setFaultInjected(false);
    timeline.goToStep(0);
  };

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="tpp20-topic-18-power-editing-lab"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            提示27 · 编辑链实验台
          </span>
          <button
            type="button"
            aria-pressed={faultInjected}
            aria-label="注入单故障：跳过差异预览"
            onClick={() => setFaultInjected((value) => !value)}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
              faultInjected
                ? "border-danger text-danger"
                : "border-border text-secondary hover:border-accent hover:text-primary"
            }`}
          >
            {faultInjected ? "已注入：跳过预览" : "注入单故障"}
          </button>
        </div>
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="编辑链实验台。通过播放、暂停、单步或拖动进度观察定位、选择、变换、预览和验证；注入单故障会跳过差异预览，验证阶段应拒绝继续。"
          className="mx-auto block h-auto w-full max-w-[980px]"
        >
          <defs>
            <marker
              id="tpp20-topic18-arrow"
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
            text="一次编辑如何留下可回退的证据"
          />
          <text
            x={VIEW_W / 2}
            y="59"
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            当前：{currentStage.caption}
          </text>
          <FlowArrows faultInjected={faultInjected} />
          {STAGES.map((stage, index) => (
            <StageCard
              key={stage.key}
              index={index}
              active={index === timeline.currentStep}
              reached={index <= timeline.currentStep}
              faulty={faultInjected && stage.key === "preview"}
              reference={(element) => {
                highlightRefs.current[stage.key] = element;
              }}
            />
          ))}
          {reachedFailure && (
            <g>
              <path
                d="M 750 272 C 750 300, 400 300, 400 272"
                fill="none"
                stroke={T.danger}
                strokeWidth="1.6"
                strokeDasharray="5 4"
              />
              <text
                x="575"
                y="298"
                textAnchor="middle"
                fontSize="11"
                fill={T.danger}
              >
                首差：没有差异证据，验证不能宣布安全
              </text>
            </g>
          )}
          <rect
            x="90"
            y="333"
            width="800"
            height="34"
            rx="10"
            fill={reachedFailure ? T.danger : T.success}
            fillOpacity="0.08"
            stroke={reachedFailure ? T.danger : T.success}
            strokeWidth="1"
          />
          <text
            x={VIEW_W / 2}
            y="355"
            textAnchor="middle"
            fontSize="11"
            fill={reachedFailure ? T.danger : T.success}
          >
            {reachedFailure
              ? "拒绝：恢复预览，从原始文档重新执行"
              : "验收：同一输入可重放，差异可审阅，撤销可用"}
          </text>
          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 16}
            text="只跳过预览，观察首差是否在验证前被拦下"
          />
        </svg>
        <div className="mt-3 min-h-11 rounded-control border border-border bg-elevated px-3 py-2 text-center text-xs text-secondary">
          <p role="status">
            当前：第 {timeline.currentStep + 1} 步 · {currentStage.caption}
            {faultInjected ? " · 故障样本需要恢复差异预览" : ""}
          </p>
        </div>
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先猜哪一站会拒绝，再用单步或播放验证。"
          reset={{
            label: "重置编辑链实验台",
            ariaLabel: "重置编辑链实验台",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        跳过差异预览试试看：验证阶段应拒绝没有证据的“成功”。
      </figcaption>
    </figure>
  );
}
