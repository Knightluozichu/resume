"use client";

/**
 * Topic 20 专属图示：把调试从“猜哪一行错了”变成可复核的因果链。
 *
 * 图示和实验台共用五个节点，但实验台只注入一个故障：移除最小复现。
 * 读者可以看见首差停在假设处，而不是等到最后一个结果才发现证据已经断了。
 */
import { useId, useState } from "react";

import {
  DiagramCaption,
  DiagramTitle,
  T,
} from "../../poeaa-enterprise-patterns/poeaa-svg-primitives";

const VIEW_W = 980;
const VIEW_H = 430;
const CARD_W = 166;
const CARD_H = 164;
const START_X = 24;
const START_Y = 104;
const GAP = 25;

const STAGES = [
  {
    key: "reproduce",
    title: "复现",
    detail: "失败样本",
    prompt: "去解决问题，而不是责备",
    concepts: ["提示29：去解决问题，而不是责备"],
  },
  {
    key: "observe",
    title: "数据",
    detail: "错误信息",
    prompt: "不要恐慌",
    concepts: ["提示30：不要恐慌"],
  },
  {
    key: "hypothesis",
    title: "假设",
    detail: "最小复现",
    prompt: "修代码前先让代码在测试中失败",
    concepts: ["提示31：修代码前先让代码在测试中失败"],
  },
  {
    key: "experiment",
    title: "实验",
    detail: "首差",
    prompt: "读一下那些该死的出错信息",
    concepts: ["提示32：读一下那些该死的出错信息", "提示33：“select”没出问题"],
  },
  {
    key: "regression",
    title: "回归",
    detail: "回归测试",
    prompt: "不要假设，要证明",
    concepts: ["提示34：不要假设，要证明"],
  },
] as const;

type StageKey = (typeof STAGES)[number]["key"];

function stageX(index: number) {
  return START_X + index * (CARD_W + GAP);
}

function focusForStep(step: 1 | 2 | 3) {
  return step === 1 ? 0 : step === 2 ? 2 : 4;
}

function captionForStep(step: 1 | 2 | 3) {
  return step === 1
    ? "先固定失败样本，避免把人的情绪当成诊断证据"
    : step === 2
      ? "只改变一个条件，在首差处验证假设"
      : "修复以后重放原始输入，让回归测试留下证据";
}

function arrowPath(index: number) {
  const x1 = stageX(index) + CARD_W + 4;
  const x2 = stageX(index + 1) - 8;
  const y = START_Y + CARD_H / 2;
  return `M ${x1} ${y} H ${x2}`;
}

function StageCard({
  index,
  active,
  reached,
  faulty = false,
}: {
  index: number;
  active: boolean;
  reached: boolean;
  faulty?: boolean;
}) {
  const stage = STAGES[index];
  const x = stageX(index);
  const color = faulty ? T.danger : active ? T.accent : T.primary;
  return (
    <g aria-label={stage.concepts.join("；")} opacity={reached ? 1 : 0.32}>
      <rect
        x={x}
        y={START_Y}
        width={CARD_W}
        height={CARD_H}
        rx="12"
        fill={T.elevated}
        stroke={faulty ? T.danger : T.border}
        strokeWidth={faulty || active ? "2" : "1.2"}
      />
      <rect
        x={x}
        y={START_Y}
        width={CARD_W}
        height="48"
        rx="12"
        fill={color}
        fillOpacity={faulty || active ? "0.16" : "0.07"}
      />
      <rect
        x={x}
        y={START_Y + 36}
        width={CARD_W}
        height="12"
        fill={color}
        fillOpacity={faulty || active ? "0.16" : "0.07"}
      />
      <circle
        cx={x + 23}
        cy={START_Y + 24}
        r="12"
        fill={color}
        fillOpacity="0.2"
        stroke={color}
      />
      <text
        x={x + 23}
        y={START_Y + 28}
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={color}
      >
        {index + 1}
      </text>
      <text
        x={x + CARD_W / 2 + 9}
        y={START_Y + 30}
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={faulty ? T.danger : active ? T.accent : T.primary}
      >
        {stage.title}
      </text>
      <text
        x={x + CARD_W / 2}
        y={START_Y + 78}
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={faulty ? T.danger : T.secondary}
      >
        {faulty ? "最小复现缺失" : stage.detail}
      </text>
      <text
        x={x + CARD_W / 2}
        y={START_Y + 111}
        textAnchor="middle"
        fontSize="11"
        fill={faulty ? T.danger : T.secondary}
      >
        {stage.prompt}
      </text>
      <text
        x={x + CARD_W / 2}
        y={START_Y + 139}
        textAnchor="middle"
        fontSize="11"
        fill={faulty ? T.danger : T.primary}
      >
        {faulty ? "首差停在这里" : `交付：${stage.detail}`}
      </text>
    </g>
  );
}

function ChainArrows({ markerId }: { markerId: string }) {
  return (
    <g fill="none" stroke={T.border} strokeWidth="1.5" opacity="0.9">
      {STAGES.slice(0, -1).map((stage, index) => (
        <path
          key={`${stage.key}-to-${STAGES[index + 1].key}`}
          d={arrowPath(index)}
          markerEnd={`url(#${markerId})`}
        />
      ))}
    </g>
  );
}

function ContractBand({ failed }: { failed: boolean }) {
  return (
    <g>
      <rect
        x="72"
        y="316"
        width="836"
        height="66"
        rx="12"
        fill={failed ? T.danger : T.accent}
        fillOpacity="0.08"
        stroke={failed ? T.danger : T.border}
      />
      <text
        x={VIEW_W / 2}
        y="343"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={failed ? T.danger : T.primary}
      >
        {failed
          ? "拒绝：没有最小复现，假设无法被一次一变量实验检验"
          : "验收合同：复现、数据、假设、实验、回归都能由同一输入重建"}
      </text>
      <text
        x={VIEW_W / 2}
        y="365"
        textAnchor="middle"
        fontSize="11"
        fill={failed ? T.danger : T.secondary}
      >
        {failed
          ? "修法：恢复原始失败样本，再从首差处重放，不要直接改最后一行"
          : "每一步只改变一个条件，并保存首差、拒绝原因和回归测试"}
      </text>
    </g>
  );
}

export function Tpp20Topic20DebuggingDiagram({
  step = 1,
}: {
  step?: 1 | 2 | 3;
}) {
  const focus = focusForStep(step);
  const markerId = `tpp20-topic20-arrow-static-${step}`;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="tpp20-topic-20-debugging-diagram"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={`20 调试专属因果链图。${captionForStep(step)}。链路依次经过复现、数据、假设、实验和回归。`}
          className="mx-auto block h-auto w-full max-w-[980px]"
        >
          <defs>
            <marker
              id={markerId}
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill={T.secondary} />
            </marker>
          </defs>
          <DiagramTitle x={VIEW_W / 2} y={32} text="20 调试：首差优先" />
          <text
            x={VIEW_W / 2}
            y="59"
            textAnchor="middle"
            fontSize="12"
            fill={T.secondary}
          >
            {captionForStep(step)}
          </text>
          <ChainArrows markerId={markerId} />
          {STAGES.map((stage, index) => (
            <StageCard
              key={stage.key}
              index={index}
              active={index === focus}
              reached={index <= focus}
            />
          ))}
          <ContractBand failed={false} />
          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 17}
            text="先预测首差，再决定下一次实验；不要用最终结果替代中间证据"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        调试的最短路径不是猜补丁，而是让证据在第一个分叉处拒绝错误假设。
      </figcaption>
    </figure>
  );
}

export function Tpp20Topic20DebuggingLab() {
  const [faultInjected, setFaultInjected] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);
  const markerId = useId().replace(/:/g, "");
  const currentStage = STAGES[stageIndex];
  const failed = faultInjected && stageIndex >= 2;

  const reset = () => {
    setFaultInjected(false);
    setStageIndex(0);
  };

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="tpp20-topic-20-debugging-lab"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            提示31 / 34 · 首差实验台
          </span>
          <button
            type="button"
            aria-pressed={faultInjected}
            aria-label="注入单故障：删除最小复现"
            onClick={() => setFaultInjected((value) => !value)}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
              faultInjected
                ? "border-danger text-danger"
                : "border-border text-secondary hover:border-accent hover:text-primary"
            }`}
          >
            {faultInjected ? "已注入：最小复现缺失" : "注入单故障"}
          </button>
        </div>
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="调试首差实验台。单步经过复现、数据、假设、实验和回归；删除最小复现后，假设阶段拒绝继续。"
          className="mx-auto block h-auto w-full max-w-[980px]"
        >
          <defs>
            <marker
              id={`tpp20-topic20-arrow-${markerId}`}
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
            text="一次调试如何从失败样本走到回归测试"
          />
          <text
            x={VIEW_W / 2}
            y="59"
            textAnchor="middle"
            fontSize="12"
            fill={T.secondary}
          >
            当前：第 {stageIndex + 1} 步 · {currentStage.title} ·{" "}
            {currentStage.detail}
          </text>
          <ChainArrows markerId={`tpp20-topic20-arrow-${markerId}`} />
          {STAGES.map((stage, index) => (
            <StageCard
              key={stage.key}
              index={index}
              active={index === stageIndex}
              reached={index <= stageIndex}
              faulty={failed && index === 2}
            />
          ))}
          <ContractBand failed={failed} />
        </svg>
        <p
          className="mt-3 text-center text-xs text-secondary"
          role="status"
          aria-live="polite"
        >
          {failed
            ? "首差：假设。没有最小复现，不能证明是哪一个条件造成了变化。"
            : `第 ${stageIndex + 1} / ${STAGES.length} 步：${currentStage.title} 已收到 ${currentStage.detail}。`}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setStageIndex((value) => Math.max(0, value - 1))}
            disabled={stageIndex === 0}
            aria-label="回到上一个调试节点"
            className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            上一个节点
          </button>
          <button
            type="button"
            onClick={() =>
              setStageIndex((value) => Math.min(STAGES.length - 1, value + 1))
            }
            disabled={stageIndex === STAGES.length - 1}
            aria-label="推进到下一个调试节点"
            className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-accent transition-colors duration-(--duration-hover) ease-standard hover:border-accent disabled:cursor-not-allowed disabled:opacity-40"
          >
            下一个节点
          </button>
          <button
            type="button"
            onClick={reset}
            aria-label="重置调试实验台"
            className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
          >
            重置实验台
          </button>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        先注入一个故障并预测首差，再逐节点推进；重置后应回到完整失败样本。
      </figcaption>
    </figure>
  );
}
