"use client";

/**
 * <Poeaa24Pattern26PageControllerDiagram>：页面控制器请求责任链。
 *
 * 这是一张章专属教学图：逐步显现请求入口、应用服务边界和响应选择，
 * 让读者可以把“一个页面一个控制器”的结构映射到可观察的运行步骤。
 */
import { useRef } from "react";

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
  PoeaaArrow,
  T,
} from "../poeaa-svg-primitives";

const VIEW_W = 920;
const VIEW_H = 450;
const BEAT = TEACHING_BEAT_MS;

const TIMELINE_STEPS: readonly TeachingStep[] = [
  { label: "request", caption: "请求进入页面边界" },
  { label: "delegate", caption: "控制器调用应用服务" },
  { label: "response", caption: "选择视图并返回响应" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  TIMELINE_STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export type Poeaa24Pattern26PageControllerDiagramProps = {
  interactive?: boolean;
};

export function Poeaa24Pattern26PageControllerDiagram({
  interactive = true,
}: Poeaa24Pattern26PageControllerDiagramProps) {
  const requestRef = useRef<SVGGElement>(null);
  const controllerRef = useRef<SVGGElement>(null);
  const delegationRef = useRef<SVGGElement>(null);
  const responseRef = useRef<SVGGElement>(null);

  const timeline = useTeachingTimeline({
    steps: TIMELINE_STEPS,
    build: (tl) => {
      if (!interactive) return;

      tl.add(
        requestRef.current!,
        { opacity: [0, 1], duration: BEAT * 0.55, ease: "out(3)" },
        0,
      );
      tl.add(
        controllerRef.current!,
        { opacity: [0, 1], duration: BEAT * 0.55, ease: "out(3)" },
        BEAT * 0.2,
      );
      tl.label("request", 0);

      tl.add(
        delegationRef.current!,
        { opacity: [0, 1], duration: BEAT * 0.65, ease: "out(3)" },
        BEAT,
      );
      tl.label("delegate", BEAT);

      tl.add(
        responseRef.current!,
        { opacity: [0, 1], duration: BEAT * 0.65, ease: "out(3)" },
        BEAT * 2,
      );
      tl.label("response", BEAT * 2);
    },
  });

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div
        data-visual-kind="poeaa-page-controller-request-flow"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="页面控制器请求责任链：请求进入页面控制器，控制器验证输入并调用应用服务，随后选择视图模型和响应；可播放、暂停、单步、拖动进度并重置。"
          className="mx-auto block h-auto w-full max-w-[920px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={34}
            text="Page Controller：页面边界负责编排，不拥有业务规则"
          />

          {/* 第一步：请求与页面控制器。 */}
          <g ref={requestRef} style={{ opacity: interactive ? 0 : 1 }}>
            <rect
              x={48}
              y={96}
              width={188}
              height={60}
              rx="8"
              fill={T.primary}
              fillOpacity="0.04"
              stroke={T.border}
              strokeWidth="1.2"
            />
            <text
              x={142}
              y={121}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={T.primary}
            >
              HTTP 请求
            </text>
            <text
              x={142}
              y={143}
              textAnchor="middle"
              fontSize="11"
              fontFamily="monospace"
              fill={T.secondary}
            >
              GET /orders/42
            </text>
            <PoeaaArrow
              x1={236}
              y1={126}
              x2={286}
              y2={126}
              label="匹配路由"
              color={T.accent}
              markerId="page-controller-request"
            />
          </g>

          <g ref={controllerRef} style={{ opacity: interactive ? 0 : 1 }}>
            <rect
              x={286}
              y={72}
              width={226}
              height={128}
              rx="10"
              fill={T.accent}
              fillOpacity="0.06"
              stroke={T.accent}
              strokeWidth="1.6"
            />
            <rect
              x={286}
              y={72}
              width={226}
              height={32}
              rx="10"
              fill={T.accent}
              fillOpacity="0.13"
            />
            <rect
              x={286}
              y={94}
              width={226}
              height={10}
              fill={T.accent}
              fillOpacity="0.13"
            />
            <text
              x={399}
              y={94}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={T.accent}
            >
              OrderPageController
            </text>
            <text
              x={304}
              y={132}
              fontSize="11"
              fontFamily="monospace"
              fill={T.primary}
            >
              validate(input)
            </text>
            <text
              x={304}
              y={154}
              fontSize="11"
              fontFamily="monospace"
              fill={T.primary}
            >
              choose(response)
            </text>
            <text x={304} y={181} fontSize="11" fill={T.secondary}>
              只编排，不计算业务规则
            </text>
          </g>

          {/* 第二步：应用服务与视图模型。 */}
          <g ref={delegationRef} style={{ opacity: interactive ? 0 : 1 }}>
            <PoeaaArrow
              x1={512}
              y1={116}
              x2={574}
              y2={104}
              label="调用用例"
              color={T.success}
              markerId="page-controller-application"
            />
            <rect
              x={574}
              y={72}
              width={218}
              height={64}
              rx="8"
              fill={T.success}
              fillOpacity="0.06"
              stroke={T.success}
              strokeWidth="1.2"
            />
            <text
              x={683}
              y={99}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={T.success}
            >
              OrderApplicationService
            </text>
            <text
              x={683}
              y={121}
              textAnchor="middle"
              fontSize="11"
              fontFamily="monospace"
              fill={T.secondary}
            >
              detail(id) / update(id, input)
            </text>

            <PoeaaArrow
              x1={683}
              y1={136}
              x2={683}
              y2={166}
              label="产出"
              color={T.warning}
              markerId="page-controller-view-model"
            />
            <rect
              x={574}
              y={166}
              width={218}
              height={64}
              rx="8"
              fill={T.warning}
              fillOpacity="0.07"
              stroke={T.warning}
              strokeWidth="1.2"
            />
            <text
              x={683}
              y={193}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={T.warning}
            >
              OrderDetailViewModel
            </text>
            <text
              x={683}
              y={215}
              textAnchor="middle"
              fontSize="11"
              fill={T.secondary}
            >
              只携带页面需要的字段
            </text>
          </g>

          {/* 第三步：视图选择与 HTTP 响应。 */}
          <g ref={responseRef} style={{ opacity: interactive ? 0 : 1 }}>
            <PoeaaArrow
              x1={683}
              y1={230}
              x2={683}
              y2={260}
              label="选择视图"
              color={T.accent}
              markerId="page-controller-view"
            />
            <rect
              x={574}
              y={260}
              width={218}
              height={58}
              rx="8"
              fill={T.accent}
              fillOpacity="0.06"
              stroke={T.accent}
              strokeWidth="1.2"
            />
            <text
              x={683}
              y={286}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={T.accent}
            >
              order-detail.html
            </text>
            <text
              x={683}
              y={306}
              textAnchor="middle"
              fontSize="11"
              fill={T.secondary}
            >
              模板只负责渲染与转义
            </text>
            <PoeaaArrow
              x1={574}
              y1={289}
              x2={238}
              y2={289}
              label="HTTP 200 / 303 / 400"
              color={T.primary}
              markerId="page-controller-response"
            />
            <rect
              x={48}
              y={260}
              width={190}
              height={58}
              rx="8"
              fill={T.primary}
              fillOpacity="0.04"
              stroke={T.border}
              strokeWidth="1.2"
            />
            <text
              x={143}
              y={286}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={T.primary}
            >
              HTTP 响应
            </text>
            <text
              x={143}
              y={306}
              textAnchor="middle"
              fontSize="11"
              fill={T.secondary}
            >
              结果可测试、可定位
            </text>
          </g>

          <rect
            x={48}
            y={356}
            width={744}
            height={48}
            rx="8"
            fill={T.primary}
            fillOpacity="0.03"
            stroke={T.border}
            strokeWidth="1"
          />
          <text x={68} y={378} fontSize="11" fontWeight="700" fill={T.primary}>
            边界规则
          </text>
          <text x={148} y={378} fontSize="11" fill={T.secondary}>
            控制器传递已验证输入；应用服务拥有用例；视图只接收视图模型
          </text>
          <text x={68} y={396} fontSize="11" fill={T.secondary}>
            重复认证、日志和错误映射可上移到前端控制器，但页面契约仍留在页面控制器。
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="请求进入页面边界 → 调用应用服务 → 选择视图模型与响应"
          />
        </svg>

        {interactive && (
          <div className="not-prose">
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <p
                role="status"
                aria-live="polite"
                className="text-xs text-secondary"
              >
                当前：{LABEL_TEXT[timeline.labels[timeline.currentStep]]}
              </p>
            </div>
            <div className="[&_button]:min-h-11 [&_button]:min-w-11 [&_input[type=range]]:min-h-11">
              <TimelineControls
                timeline={timeline}
                labelText={LABEL_TEXT}
                caption="按步骤检查责任归属；最后可重置并重放同一请求。"
                reset={{
                  label: "重置",
                  ariaLabel: "重置页面控制器演示",
                  onClick: () => timeline.goToStep(0),
                }}
              />
            </div>
          </div>
        )}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        页面控制器把请求契约、应用服务和视图选择串成一条可测试的责任链；
        共享的是用例，不是页面的输入与导航边界。
      </figcaption>
    </figure>
  );
}

// 保留旧导出名，避免既有章节组件注册表产生不必要的变更。
export function Poeaa24Pattern26PageController() {
  return <Poeaa24Pattern26PageControllerDiagram />;
}
