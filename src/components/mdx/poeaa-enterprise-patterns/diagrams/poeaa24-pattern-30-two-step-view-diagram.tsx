"use client";

import { useState } from "react";

import {
  PoeaaArrow,
  T,
  DiagramCaption,
  DiagramTitle,
} from "../poeaa-svg-primitives";

/**
 * <Poeaa24Pattern30TwoStepView.Diagram>：两步视图的专属教学图。
 *
 * 图中固定追踪同一份订单数据的两次变换：第一步只生成页面语义，第二步
 * 把内容放进共享布局，最后才形成浏览器响应。故障开关用来展示布局层
 * 反向读取订单权限时，内容缓存为何不能只按路由复用。
 */

const VIEW_W = 920;
const VIEW_H = 460;

type Step = 1 | 2 | 3;

const STEP_COPY: Record<
  Step,
  { label: string; status: string; note: string }
> = {
  1: {
    label: "生成内容",
    status: "第一步只回答“这页讲什么”",
    note: "领域数据先变成页面主体；导航、页脚和主题不进入内容结果。",
  },
  2: {
    label: "套入布局",
    status: "第二步回答“站点怎样包住它”",
    note: "布局模板接收内容和页面上下文，统一放置导航、页脚与外观。",
  },
  3: {
    label: "输出响应",
    status: "两步合成一份可发送页面",
    note: "浏览器只看到最终页面；内容模板仍可被另一套布局复用。",
  },
};

export type Poeaa24Pattern30TwoStepViewDiagramProps = {
  /** Stepper 使用的确定性阶段快照。 */
  step?: Step;
  /** 主图开启阶段按钮、故障开关和重置；快照应关闭交互。 */
  interactive?: boolean;
};

function stageOpacity(stage: Step, active: Step) {
  if (stage === active) return 1;
  return stage < active ? 0.76 : 0.34;
}

export function Poeaa24Pattern30TwoStepViewDiagram({
  step = 1,
  interactive = true,
}: Poeaa24Pattern30TwoStepViewDiagramProps) {
  const [selectedStep, setSelectedStep] = useState<Step>(step);
  const [faultInjected, setFaultInjected] = useState(false);
  const activeStep = interactive ? selectedStep : step;
  const copy = STEP_COPY[activeStep];
  const markerId = `poeaa24-two-step-arrow-${interactive ? "interactive" : `snapshot-${activeStep}`}`;
  const layoutStroke = faultInjected ? T.danger : T.accent;

  const reset = () => {
    setSelectedStep(1);
    setFaultInjected(false);
  };

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="poeaa-pattern30-two-step-view"
        className="rounded-card border border-border bg-elevated p-5"
      >
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            专属两步视图图 · {copy.status}
          </span>
          {interactive && (
            <button
              type="button"
              onClick={reset}
              className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
            >
              重置图示
            </button>
          )}
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={`两步视图第${activeStep}步：${copy.note}。第一步生成逻辑页面，第二步套入布局模板，最后输出浏览器页面。${faultInjected ? "已注入故障：布局模板直接读取订单权限，内容缓存必须按用户区分。" : ""}`}
          className="mx-auto block h-auto w-full max-w-[920px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={36}
            text="Two Step View：先生成内容，再套入共享布局"
          />
          <text
            x={VIEW_W / 2}
            y="60"
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            同一份订单数据在两步之间传递；每一步只拥有自己的责任
          </text>

          {[1, 2, 3].map((value) => {
            const phase = value as Step;
            const active = phase === activeStep;
            const x = 40 + (phase - 1) * 300;
            return (
              <g key={`phase-${phase}`} opacity={stageOpacity(phase, activeStep)}>
                <rect
                  x={x}
                  y="82"
                  width="250"
                  height="30"
                  rx="8"
                  fill={active ? T.accent : T.secondary}
                  fillOpacity="0.1"
                  stroke={active ? T.accent : T.border}
                  strokeWidth="1.2"
                />
                <text
                  x={x + 125}
                  y="102"
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={active ? T.accent : T.secondary}
                >
                  {phase}. {STEP_COPY[phase].label}
                </text>
              </g>
            );
          })}

          <g opacity={stageOpacity(1, activeStep)}>
            <rect
              x="40"
              y="132"
              width="250"
              height="170"
              rx="10"
              fill={T.bg}
              stroke={T.success}
              strokeWidth="1.5"
            />
            <rect
              x="40"
              y="132"
              width="250"
              height="34"
              rx="10"
              fill={T.success}
              fillOpacity="0.12"
            />
            <rect
              x="40"
              y="156"
              width="250"
              height="10"
              fill={T.success}
              fillOpacity="0.12"
            />
            <text
              x="165"
              y="155"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={T.success}
            >
              第一步：逻辑页面
            </text>
            <text x="58" y="190" fontSize="11" fontFamily="monospace" fill={T.primary}>
              body = renderContent(order)
            </text>
            <text x="58" y="214" fontSize="11" fill={T.secondary}>
              订单详情 + 页面语义
            </text>
            <text x="58" y="238" fontSize="11" fill={T.secondary}>
              不包含导航、页脚、主题
            </text>
            <text x="58" y="274" fontSize="11" fontWeight="600" fill={T.success}>
              可按路由与数据独立测试
            </text>
          </g>

          <PoeaaArrow
            x1={302}
            y1={216}
            x2={328}
            y2={216}
            label="传递 body"
            color={activeStep >= 2 ? T.accent : T.border}
            markerId={`${markerId}-content`}
          />

          <g opacity={stageOpacity(2, activeStep)}>
            <rect
              x="340"
              y="132"
              width="250"
              height="170"
              rx="10"
              fill={T.bg}
              stroke={layoutStroke}
              strokeWidth={faultInjected ? "2" : "1.5"}
            />
            <rect
              x="340"
              y="132"
              width="250"
              height="34"
              rx="10"
              fill={layoutStroke}
              fillOpacity="0.12"
            />
            <rect
              x="340"
              y="156"
              width="250"
              height="10"
              fill={layoutStroke}
              fillOpacity="0.12"
            />
            <text
              x="465"
              y="155"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={layoutStroke}
            >
              第二步：布局模板
            </text>
            <text x="358" y="190" fontSize="11" fontFamily="monospace" fill={T.primary}>
              page = layout(body, context)
            </text>
            <text x="358" y="214" fontSize="11" fill={T.secondary}>
              导航 + body + 页脚
            </text>
            <text
              x="358"
              y="238"
              fontSize="11"
              fill={faultInjected ? T.danger : T.secondary}
            >
              {faultInjected ? "越界：布局读取订单权限" : "只组装共享外观"}
            </text>
            <text
              x="358"
              y="274"
              fontSize="11"
              fontWeight="600"
              fill={faultInjected ? T.danger : T.accent}
            >
              {faultInjected ? "缓存键必须包含用户" : "布局可被多页复用"}
            </text>
          </g>

          <PoeaaArrow
            x1={602}
            y1={216}
            x2={628}
            y2={216}
            label="发送"
            color={activeStep >= 3 ? T.success : T.border}
            markerId={`${markerId}-response`}
          />

          <g opacity={stageOpacity(3, activeStep)}>
            <rect
              x="640"
              y="132"
              width="250"
              height="170"
              rx="10"
              fill={T.bg}
              stroke={faultInjected ? T.danger : T.success}
              strokeWidth={faultInjected ? "2" : "1.5"}
            />
            <rect
              x="640"
              y="132"
              width="250"
              height="34"
              rx="10"
              fill={faultInjected ? T.danger : T.success}
              fillOpacity="0.12"
            />
            <rect
              x="640"
              y="156"
              width="250"
              height="10"
              fill={faultInjected ? T.danger : T.success}
              fillOpacity="0.12"
            />
            <text
              x="765"
              y="155"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={faultInjected ? T.danger : T.success}
            >
              浏览器响应
            </text>
            <text x="658" y="190" fontSize="11" fill={T.secondary}>
              ┌ 全站导航 ┐
            </text>
            <text x="658" y="214" fontSize="11" fill={T.success}>
              │ 订单内容 │
            </text>
            <text x="658" y="238" fontSize="11" fill={T.secondary}>
              └ 全站页脚 ┘
            </text>
            <text
              x="658"
              y="274"
              fontSize="11"
              fontWeight="600"
              fill={faultInjected ? T.danger : T.success}
            >
              {faultInjected ? "结果可能泄露权限差异" : "同一外观，多种内容"}
            </text>
          </g>

          <rect
            x="40"
            y="330"
            width="850"
            height="70"
            rx="10"
            fill={faultInjected ? T.danger : T.primary}
            fillOpacity="0.05"
            stroke={faultInjected ? T.danger : T.border}
            strokeWidth="1"
          />
          <text
            x="58"
            y="355"
            fontSize="12"
            fontWeight="700"
            fill={faultInjected ? T.danger : T.accent}
          >
            当前观察：{copy.status}
          </text>
          <text x="58" y="380" fontSize="11" fill={faultInjected ? T.danger : T.secondary}>
            {faultInjected
              ? "故障证据：布局模板读取订单权限；修法是把权限结果放进页面上下文，并把用户维度纳入缓存键。"
              : copy.note}
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={432}
            text="两步视图的边界：内容模板决定页面语义，布局模板决定共享外观"
          />
        </svg>

        {interactive && (
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            {[1, 2, 3].map((value) => {
              const phase = value as Step;
              const active = phase === activeStep;
              return (
                <button
                  key={`control-${phase}`}
                  type="button"
                  onClick={() => setSelectedStep(phase)}
                  aria-pressed={active}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    active
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border text-secondary hover:border-accent hover:text-primary"
                  }`}
                >
                  {phase}. {STEP_COPY[phase].label}
                </button>
              );
            })}
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
              {faultInjected ? "关闭布局故障" : "注入布局故障"}
            </button>
          </div>
        )}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        两步视图把页面语义与站点外观拆开：内容模板先产出主体，布局模板再负责共享壳层；故障开关展示第二步越界后的缓存风险。
      </figcaption>
    </figure>
  );
}

/** 保留现有章节注册名；Diagram 成员让 MDX 和 Stepper 识别专属教学图。 */
export function Poeaa24Pattern30TwoStepView(
  props: Poeaa24Pattern30TwoStepViewDiagramProps,
) {
  return <Poeaa24Pattern30TwoStepViewDiagram {...props} />;
}

export namespace Poeaa24Pattern30TwoStepView {
  export const Diagram = Poeaa24Pattern30TwoStepViewDiagram;
}
