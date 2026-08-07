"use client";

import { useId, useRef, useState } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "@/components/mdx/anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "@/components/mdx/anim/use-teaching-timeline";

import { T, DiagramCaption, DiagramTitle } from "../poeaa-svg-primitives";

type TemplateViewStep = 1 | 2 | 3;

export type Poeaa24Pattern28TemplateViewProps = {
  /** Stepper 快照使用的静态步骤；交互主图默认从第一步开始。 */
  step?: TemplateViewStep;
  /** false 时隐藏控制条，保留指定步骤的确定性快照。 */
  interactive?: boolean;
};

const VIEW_W = 960;
const VIEW_H = 520;

const STEPS: readonly TeachingStep[] = [
  { label: "model", caption: "页面控制器准备展示用 Model" },
  { label: "bind", caption: "模板引擎填充标记并执行输出转义" },
  { label: "verify", caption: "对最终 HTML 做快照与边界验收" },
];

const STEP_COPY: Record<
  TemplateViewStep,
  { title: string; detail: string; status: string }
> = {
  1: {
    title: "准备 Model",
    detail: "控制器只整理订单展示数据；业务决定仍在应用层。",
    status: "数据已准备",
  },
  2: {
    title: "填充模板标记",
    detail: "引擎替换变量与列表标记，并把外部输入作为文本转义。",
    status: "标记正在渲染",
  },
  3: {
    title: "验收 HTML",
    detail: "输出可做快照测试；模板不查询数据库，也不改变订单状态。",
    status: "输出可验收",
  },
};

function stageOpacity(stage: TemplateViewStep, activeStep: TemplateViewStep) {
  return stage === activeStep ? 1 : stage < activeStep ? 0.78 : 0.42;
}

/**
 * <Poeaa24Pattern28TemplateView.Diagram>：模板视图的三阶段责任图。
 *
 * 图中固定展示同一条订单后台请求：控制器准备 Model，模板引擎把数据
 * 填入 HTML 标记，最后由快照和输出边界检查收口。故障开关专门演示
 * “把业务规则/未转义输入塞进模板”为什么会破坏该边界。
 */
export function Poeaa24Pattern28TemplateViewDiagram({
  step = 1,
  interactive = true,
}: Poeaa24Pattern28TemplateViewProps) {
  const [faultInjected, setFaultInjected] = useState(false);
  const modelStageRef = useRef<SVGGElement>(null);
  const bindStageRef = useRef<SVGGElement>(null);
  const verifyStageRef = useRef<SVGGElement>(null);
  const rawId = useId();
  const markerId = `template-view-arrow-${rawId.replace(/:/g, "")}`;

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      tl.label("model", 0);
      tl.add(
        modelStageRef.current!,
        { opacity: [0.42, 1], duration: TEACHING_BEAT_MS * 0.7 },
        0,
      );
      tl.label("bind", TEACHING_BEAT_MS);
      tl.add(
        bindStageRef.current!,
        { opacity: [0.42, 1], duration: TEACHING_BEAT_MS * 0.7 },
        TEACHING_BEAT_MS,
      );
      tl.label("verify", TEACHING_BEAT_MS * 2);
      tl.add(
        verifyStageRef.current!,
        { opacity: [0.42, 1], duration: TEACHING_BEAT_MS * 0.7 },
        TEACHING_BEAT_MS * 2,
      );
    },
  });

  const activeStep = interactive
    ? ((timeline.currentStep + 1) as TemplateViewStep)
    : step;
  const copy = STEP_COPY[activeStep];
  const reset = () => {
    timeline.goToStep(0);
    setFaultInjected(false);
  };

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="poeaa-pattern28-template-view"
        className="rounded-card border border-border bg-elevated p-5"
      >
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            专属 Template View 图 · {copy.status}
          </span>
          {interactive && (
            <button
              type="button"
              onClick={() => setFaultInjected((value) => !value)}
              className={`rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                faultInjected
                  ? "border-danger text-danger"
                  : "border-border text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              {faultInjected ? "恢复安全输出" : "注入模板越界"}
            </button>
          )}
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={`Template View 三阶段图：${copy.detail}。流程从页面控制器经过 Model、HTML 模板和模板引擎生成 HTTP 响应。${faultInjected ? "已注入模板越界：模板直接承载业务规则或未转义输入，验收应拒绝。" : "模板只负责展示，输出可通过转义与快照验证。"}`}
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
              <path d="M0 0 L9 5 L0 10 Z" fill={T.accent} />
            </marker>
          </defs>

          <DiagramTitle
            x={VIEW_W / 2}
            y={30}
            text="Template View：Model 数据进入 HTML 标记"
          />
          <text
            x={VIEW_W / 2}
            y="54"
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            {copy.title} · {copy.detail}
          </text>

          {(Object.keys(STEP_COPY) as unknown as TemplateViewStep[]).map(
            (phase) => {
              const isActive = phase === activeStep;
              const x = 32 + (phase - 1) * 306;
              return (
                <g key={`step-${phase}`}>
                  <rect
                    x={x}
                    y="70"
                    width="276"
                    height="48"
                    rx="9"
                    fill={isActive ? T.accent : T.secondary}
                    fillOpacity="0.1"
                    stroke={isActive ? T.accent : T.border}
                    strokeWidth={isActive ? "1.8" : "1"}
                  />
                  <text
                    x={x + 18}
                    y="91"
                    fontSize="11"
                    fontWeight="700"
                    fill={isActive ? T.accent : T.secondary}
                  >
                    {phase}. {STEP_COPY[phase].title}
                  </text>
                  <text
                    x={x + 18}
                    y="108"
                    fontSize="11"
                    fill={isActive ? T.primary : T.secondary}
                  >
                    {STEP_COPY[phase].status}
                  </text>
                </g>
              );
            },
          )}

          <g ref={modelStageRef} opacity={stageOpacity(1, activeStep)}>
            <rect
              x="32"
              y="146"
              width="184"
              height="164"
              rx="10"
              fill={T.bg}
              stroke={activeStep === 1 ? T.accent : T.border}
              strokeWidth={activeStep === 1 ? "2" : "1.2"}
            />
            <rect
              x="32"
              y="146"
              width="184"
              height="34"
              rx="10"
              fill={T.accent}
              fillOpacity="0.12"
            />
            <rect
              x="32"
              y="170"
              width="184"
              height="10"
              fill={T.accent}
              fillOpacity="0.12"
            />
            <text
              x="124"
              y="169"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={T.accent}
            >
              页面控制器
            </text>
            <text
              x="50"
              y="205"
              fontSize="11"
              fontFamily="monospace"
              fill={T.primary}
            >
              GET /orders/42
            </text>
            <text x="50" y="227" fontSize="11" fill={T.secondary}>
              读取并校验输入
            </text>
            <text x="50" y="249" fontSize="11" fill={T.secondary}>
              调用应用服务
            </text>
            <text
              x="50"
              y="271"
              fontSize="11"
              fontFamily="monospace"
              fill={T.primary}
            >
              return ViewModel
            </text>
            <text x="50" y="293" fontSize="11" fill={T.secondary}>
              不拼 HTML，不改状态
            </text>
          </g>

          <line
            x1="216"
            y1="228"
            x2="248"
            y2="228"
            stroke={T.accent}
            strokeWidth="1.8"
            markerEnd={`url(#${markerId})`}
          />
          <text
            x="232"
            y="215"
            textAnchor="middle"
            fontSize="11"
            fill={T.accent}
          >
            提供
          </text>

          <g opacity={stageOpacity(1, activeStep)}>
            <rect
              x="250"
              y="146"
              width="164"
              height="164"
              rx="10"
              fill={T.bg}
              stroke={T.accent}
              strokeWidth="1.5"
            />
            <rect
              x="250"
              y="146"
              width="164"
              height="34"
              rx="10"
              fill={T.accent}
              fillOpacity="0.12"
            />
            <rect
              x="250"
              y="170"
              width="164"
              height="10"
              fill={T.accent}
              fillOpacity="0.12"
            />
            <text
              x="332"
              y="169"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={T.accent}
            >
              Model
            </text>
            <text
              x="268"
              y="205"
              fontSize="11"
              fontFamily="monospace"
              fill={T.primary}
            >
              orderId: 42
            </text>
            <text
              x="268"
              y="227"
              fontSize="11"
              fontFamily="monospace"
              fill={T.primary}
            >
              total: 597.00
            </text>
            <text
              x="268"
              y="249"
              fontSize="11"
              fontFamily="monospace"
              fill={T.primary}
            >
              items: [2]
            </text>
            <text x="268" y="271" fontSize="11" fill={T.secondary}>
              只含展示所需数据
            </text>
            <text x="268" y="293" fontSize="11" fill={T.secondary}>
              无查询与状态变更
            </text>
          </g>

          <line
            x1="414"
            y1="228"
            x2="450"
            y2="228"
            stroke={T.accent}
            strokeWidth="1.8"
            markerEnd={`url(#${markerId})`}
          />
          <text
            x="432"
            y="215"
            textAnchor="middle"
            fontSize="11"
            fill={T.accent}
          >
            绑定
          </text>

          <g ref={bindStageRef} opacity={stageOpacity(2, activeStep)}>
            <rect
              x="452"
              y="146"
              width="226"
              height="164"
              rx="10"
              fill={T.bg}
              stroke={activeStep === 2 ? T.accent : T.border}
              strokeWidth={activeStep === 2 ? "2" : "1.2"}
            />
            <rect
              x="452"
              y="146"
              width="226"
              height="34"
              rx="10"
              fill={T.warning}
              fillOpacity="0.12"
            />
            <rect
              x="452"
              y="170"
              width="226"
              height="10"
              fill={T.warning}
              fillOpacity="0.12"
            />
            <text
              x="565"
              y="169"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={T.warning}
            >
              HTML 模板 + 引擎
            </text>
            <text
              x="470"
              y="205"
              fontSize="11"
              fontFamily="monospace"
              fill={T.primary}
            >
              &lt;h1&gt;{"{{orderId}}"}&lt;/h1&gt;
            </text>
            <text
              x="470"
              y="227"
              fontSize="11"
              fontFamily="monospace"
              fill={T.primary}
            >
              &lt;li&gt;{"{{item.name}}"}&lt;/li&gt;
            </text>
            <text
              x="470"
              y="249"
              fontSize="11"
              fontFamily="monospace"
              fill={T.primary}
            >
              escape(value)
            </text>
            <text x="470" y="271" fontSize="11" fill={T.secondary}>
              标记控制展示，不承载规则
            </text>
            <text x="470" y="293" fontSize="11" fill={T.secondary}>
              列表/条件只读 Model
            </text>
          </g>

          <line
            x1="678"
            y1="228"
            x2="712"
            y2="228"
            stroke={T.accent}
            strokeWidth="1.8"
            markerEnd={`url(#${markerId})`}
          />
          <text
            x="695"
            y="215"
            textAnchor="middle"
            fontSize="11"
            fill={T.accent}
          >
            输出
          </text>

          <g ref={verifyStageRef} opacity={stageOpacity(3, activeStep)}>
            <rect
              x="714"
              y="146"
              width="214"
              height="164"
              rx="10"
              fill={T.bg}
              stroke={
                faultInjected
                  ? T.danger
                  : activeStep === 3
                    ? T.success
                    : T.border
              }
              strokeWidth={faultInjected || activeStep === 3 ? "2" : "1.2"}
            />
            <rect
              x="714"
              y="146"
              width="214"
              height="34"
              rx="10"
              fill={faultInjected ? T.danger : T.success}
              fillOpacity="0.12"
            />
            <rect
              x="714"
              y="170"
              width="214"
              height="10"
              fill={faultInjected ? T.danger : T.success}
              fillOpacity="0.12"
            />
            <text
              x="821"
              y="169"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={faultInjected ? T.danger : T.success}
            >
              HTTP 响应
            </text>
            <text
              x="732"
              y="205"
              fontSize="11"
              fontFamily="monospace"
              fill={T.primary}
            >
              &lt;h1&gt;订单 #42&lt;/h1&gt;
            </text>
            <text
              x="732"
              y="227"
              fontSize="11"
              fontFamily="monospace"
              fill={T.primary}
            >
              &lt;p&gt;¥597.00&lt;/p&gt;
            </text>
            <text
              x="732"
              y="249"
              fontSize="11"
              fill={faultInjected ? T.danger : T.secondary}
            >
              {faultInjected ? "验收失败：模板越界" : "输入已转义"}
            </text>
            <text x="732" y="271" fontSize="11" fill={T.secondary}>
              快照可复现
            </text>
            <text
              x="732"
              y="293"
              fontSize="11"
              fill={faultInjected ? T.danger : T.success}
            >
              {faultInjected ? "拒绝发布" : "允许返回"}
            </text>
          </g>

          <rect
            x="32"
            y="344"
            width="896"
            height="112"
            rx="10"
            fill={faultInjected ? T.danger : T.primary}
            fillOpacity="0.05"
            stroke={faultInjected ? T.danger : T.border}
            strokeWidth={faultInjected ? "1.8" : "1"}
          />
          <text
            x="52"
            y="372"
            fontSize="12"
            fontWeight="700"
            fill={faultInjected ? T.danger : T.primary}
          >
            {faultInjected ? "故障注入：模板边界被越过" : "模板责任边界"}
          </text>
          <text
            x="52"
            y="398"
            fontSize="11"
            fill={faultInjected ? T.danger : T.secondary}
          >
            {faultInjected
              ? "现象：模板直接查库、改状态或把未转义输入拼进 HTML；原因：把展示标记当成应用层。"
              : "模板可以做条件、循环和格式化；应用服务负责查询、授权与状态转换。"}
          </text>
          <text
            x="52"
            y="422"
            fontSize="11"
            fill={faultInjected ? T.danger : T.secondary}
          >
            {faultInjected
              ? "修法：把决定移回应用层，模板只消费 Model，并用转义测试与 HTML 快照锁定输出。"
              : "验收证据：输入转义、输出快照、模板不依赖数据库，换布局时业务测试仍然通过。"}
          </text>
          <text x="52" y="446" fontSize="11" fill={T.accent}>
            选择信号：页面结构变化多、需要设计人员协作；拒绝信号：模板开始拥有业务工作流。
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 14}
            text="模板视图 = HTML 模板中的动态标记 + Model 数据；业务决定留在模板外"
          />
        </svg>

        {interactive && (
          <TimelineControls
            timeline={timeline}
            labelText={Object.fromEntries(
              STEPS.map(({ label, caption }) => [label, caption ?? label]),
            )}
            caption="按步观察：数据、标记与输出各自承担什么责任。"
            reset={{
              label: "重置图示",
              ariaLabel: "重置模板视图图示",
              onClick: reset,
            }}
          />
        )}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Template View 将展示规则写在页面模板的标记中，用 Model 填充出 HTML；
        模板不应替应用层查询数据或执行业务决策。
      </figcaption>
    </figure>
  );
}

export function Poeaa24Pattern28TemplateView(
  props: Poeaa24Pattern28TemplateViewProps,
) {
  return <Poeaa24Pattern28TemplateViewDiagram {...props} />;
}

// 保留章节正文使用的命名导出，同时提供可审计的 Diagram 成员。
export namespace Poeaa24Pattern28TemplateView {
  export const Diagram = Poeaa24Pattern28TemplateViewDiagram;
}
