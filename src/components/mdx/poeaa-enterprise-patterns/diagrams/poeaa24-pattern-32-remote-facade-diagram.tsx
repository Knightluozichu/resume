"use client";

import { useState } from "react";

import { DiagramCaption, DiagramTitle, T } from "../poeaa-svg-primitives";

const VIEW_W = 960;
const VIEW_H = 480;
const STEPS = [1, 2, 3] as const;
type StepId = (typeof STEPS)[number];

const STEP_COPY: Record<StepId, { title: string; note: string }> = {
  1: {
    title: "客户端意图",
    note: "客户端只发出一次 getOrderDetails 请求，不依赖内部服务顺序。",
  },
  2: {
    title: "内部协调",
    note: "远程外观协调订单、库存和支付服务，但不拥有它们的领域规则。",
  },
  3: {
    title: "DTO 或失败",
    note: "成功返回稳定 DTO；故障时保留部分失败位置，禁止伪装成完整成功。",
  },
};

export type Poeaa24Pattern32RemoteFacadeDiagramProps = {
  /** Stepper 展示的静态阶段。 */
  step?: StepId;
  /** 主图开启阶段控制和部分失败注入；静态快照关闭控件。 */
  interactive?: boolean;
};

export function Poeaa24Pattern32RemoteFacadeDiagram({
  step = 1,
  interactive = true,
}: Poeaa24Pattern32RemoteFacadeDiagramProps) {
  const [currentStep, setCurrentStep] = useState<StepId>(step);
  const [faultInjected, setFaultInjected] = useState(false);
  const visibleStep = interactive ? currentStep : step;
  const copy = STEP_COPY[visibleStep];

  const move = (direction: -1 | 1) => {
    const index = STEPS.indexOf(currentStep);
    const nextIndex = Math.min(STEPS.length - 1, Math.max(0, index + direction));
    setCurrentStep(STEPS[nextIndex]);
  };

  const reset = () => {
    setCurrentStep(1);
    setFaultInjected(false);
  };

  const active = (stage: StepId) =>
    stage === visibleStep ? 1 : stage < visibleStep ? 0.72 : 0.24;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="poeaa-remote-facade-flow"
        className="rounded-card border border-border bg-elevated p-5"
      >
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            专属远程边界图 · {copy.title}
          </span>
          {interactive && (
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => move(-1)}
                disabled={currentStep === 1}
                className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
              >
                上一步
              </button>
              <button
                type="button"
                onClick={() => move(1)}
                disabled={currentStep === 3}
                className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
              >
                下一步
              </button>
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
                {faultInjected ? "关闭部分失败" : "注入部分失败"}
              </button>
              <button
                type="button"
                onClick={reset}
                className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
              >
                重置
              </button>
            </div>
          )}
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={`远程外观订单调用图：${copy.note}${faultInjected ? "当前注入支付服务超时，结果标记为部分失败。" : ""}`}
          className="mx-auto block h-auto w-full max-w-[960px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={34}
            text="Remote Facade：一次用例调用，内部协调多个服务"
          />
          <text
            x={VIEW_W / 2}
            y={58}
            textAnchor="middle"
            fontSize="12"
            fill={T.secondary}
          >
            当前阶段：{copy.note}
          </text>

          <rect
            x="32"
            y="94"
            width="220"
            height="196"
            rx="12"
            fill={T.bg}
            stroke={T.border}
            strokeWidth="1.4"
            opacity={active(1)}
          />
          <text
            x="142"
            y="124"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={T.primary}
            opacity={active(1)}
          >
            客户端
          </text>
          <text x="56" y="158" fontSize="12" fill={T.secondary} opacity={active(1)}>
            业务意图：读取订单详情
          </text>
          <rect
            x="56"
            y="180"
            width="172"
            height="48"
            rx="8"
            fill={T.accent}
            fillOpacity="0.08"
            stroke={T.accent}
            strokeWidth="1.3"
            opacity={active(1)}
          />
          <text
            x="142"
            y="210"
            textAnchor="middle"
            fontSize="12"
            fontFamily="monospace"
            fill={T.accent}
            opacity={active(1)}
          >
            getOrderDetails(id)
          </text>
          <text x="56" y="260" fontSize="12" fill={T.secondary} opacity={active(1)}>
            网络往返：1 次
          </text>

          <line
            x1="282"
            y1="82"
            x2="282"
            y2="356"
            stroke={T.accent}
            strokeWidth="1.5"
            strokeDasharray="8 5"
          />
          <text
            x="282"
            y="378"
            textAnchor="middle"
            fontSize="12"
            fill={T.accent}
          >
            网络边界
          </text>
          <line
            x1="252"
            y1="204"
            x2="330"
            y2="204"
            stroke={T.accent}
            strokeWidth="2"
          />
          <text
            x="291"
            y="194"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={T.accent}
          >
            1 次请求
          </text>

          <rect
            x="330"
            y="94"
            width="270"
            height="196"
            rx="12"
            fill={T.accent}
            fillOpacity="0.05"
            stroke={T.accent}
            strokeWidth="1.5"
            opacity={active(2)}
          />
          <rect
            x="330"
            y="94"
            width="270"
            height="34"
            rx="12"
            fill={T.accent}
            fillOpacity="0.12"
            opacity={active(2)}
          />
          <text
            x="465"
            y="117"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={T.accent}
            opacity={active(2)}
          >
            RemoteFacade
          </text>
          <text
            x="354"
            y="158"
            fontSize="12"
            fontFamily="monospace"
            fill={T.primary}
            opacity={active(2)}
          >
            readSummary(orderId)
          </text>
          <text
            x="354"
            y="184"
            fontSize="12"
            fontFamily="monospace"
            fill={T.primary}
            opacity={active(2)}
          >
            readStatus(orderId)
          </text>
          <text x="354" y="234" fontSize="12" fill={T.secondary} opacity={active(2)}>
            负责协调，不复制领域规则
          </text>
          <text x="354" y="260" fontSize="12" fill={T.secondary} opacity={active(2)}>
            组装稳定的 OrderDetails DTO
          </text>

          <line
            x1="600"
            y1="204"
            x2="678"
            y2="204"
            stroke={faultInjected ? T.danger : T.success}
            strokeWidth="2"
          />
          <text
            x="639"
            y="194"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={faultInjected ? T.danger : T.success}
          >
            {faultInjected ? "支付超时" : "返回 DTO"}
          </text>

          <rect
            x="678"
            y="94"
            width="250"
            height="196"
            rx="12"
            fill={faultInjected ? T.danger : T.success}
            fillOpacity="0.06"
            stroke={faultInjected ? T.danger : T.success}
            strokeWidth="1.4"
            opacity={active(3)}
          />
          <text
            x="803"
            y="124"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={faultInjected ? T.danger : T.success}
            opacity={active(3)}
          >
            {faultInjected ? "部分失败" : "客户端结果"}
          </text>
          <text x="700" y="158" fontSize="12" fill={T.secondary} opacity={active(3)}>
            {faultInjected ? "payment: timeout" : "id: 42"}
          </text>
          <text x="700" y="184" fontSize="12" fill={T.secondary} opacity={active(3)}>
            {faultInjected ? "status: needs-reconcile" : "totalCents: 59700"}
          </text>
          <text x="700" y="210" fontSize="12" fill={T.secondary} opacity={active(3)}>
            {faultInjected ? "禁止直接重试扣款" : "paid: true / false"}
          </text>
          <text x="700" y="260" fontSize="12" fill={T.secondary} opacity={active(3)}>
            {faultInjected ? "携带查询或补偿路径" : "只暴露稳定字段"}
          </text>

          <rect
            x="32"
            y="408"
            width="896"
            height="42"
            rx="8"
            fill={T.primary}
            fillOpacity="0.03"
            stroke={T.border}
            strokeWidth="1"
          />
          <text x="52" y="434" fontSize="12" fill={T.secondary}>
            {faultInjected
              ? "故障证据：响应丢失不等于未执行；由拥有副作用的服务用幂等键和查询状态收尾。"
              : "通过条件：一次用例调用、稳定 DTO、可定位的失败状态，以及由领域服务拥有的业务规则。"}
          </text>
          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 8}
            text="粗粒度远程接口将客户端意图与内部细粒度对象隔离"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        远程外观把一次业务意图映射为用例级调用，在服务端协调细节并返回 DTO；故障时保留可验证的失败位置。
      </figcaption>
    </figure>
  );
}
