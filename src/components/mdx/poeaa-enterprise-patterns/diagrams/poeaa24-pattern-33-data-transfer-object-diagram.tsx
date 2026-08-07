"use client";

import { useState } from "react";

import {
  DiagramCaption,
  DiagramTitle,
  PoeaaArrow,
  T,
} from "../poeaa-svg-primitives";

/**
 * <Poeaa24Pattern33DataTransferObjectDiagram>：DTO 的专属边界实验。
 *
 * 阶段按钮固定观察“选择字段 → 组装并序列化 → 校验并消费”三步；
 * 故障开关把领域对象原样越过边界的错误显影出来。主图是真交互，
 * Stepper 快照通过 interactive={false} 保持确定性，便于逐步核对证据。
 */

const VIEW_W = 920;
const VIEW_H = 472;

type Stage = 1 | 2 | 3;

const STAGES: Record<Stage, { label: string; status: string; note: string }> = {
  1: {
    label: "选择字段",
    status: "只选当前用例需要的字段",
    note: "Order 仍属于服务端；字段清单决定 DTO 的边界。",
  },
  2: {
    label: "组装并序列化",
    status: "显式映射，再编码成载荷",
    note: "DTO 是纯数据，不携带领域行为或内部关联。",
  },
  3: {
    label: "校验并消费",
    status: "按版本读取公开字段",
    note: "客户端消费 DTO；领域对象不会跨过网络边界。",
  },
};

export type Poeaa24Pattern33DataTransferObjectDiagramProps = {
  /** Stepper 使用的确定性阶段快照。 */
  stage?: Stage;
  /** 主图开启阶段按钮、故障开关和重置；快照应关闭交互。 */
  interactive?: boolean;
};

function stageOpacity(stage: Stage, active: Stage) {
  if (stage === active) return 1;
  return stage < active ? 0.78 : 0.36;
}

export function Poeaa24Pattern33DataTransferObjectDiagram({
  stage = 1,
  interactive = true,
}: Poeaa24Pattern33DataTransferObjectDiagramProps) {
  const [selectedStage, setSelectedStage] = useState<Stage>(stage);
  const [leakInjected, setLeakInjected] = useState(false);
  const activeStage = interactive ? selectedStage : stage;
  const copy = STAGES[activeStage];
  const borderColor = leakInjected ? T.danger : T.accent;

  const reset = () => {
    setSelectedStage(1);
    setLeakInjected(false);
  };

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="poeaa-pattern33-data-transfer-object"
        className="rounded-card border border-border bg-elevated p-5"
      >
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            专属 DTO 边界图 · {copy.status}
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
          aria-label={`DTO 第${activeStage}阶段：${copy.note}。数据从领域对象经过 DTO 组装和序列化到达客户端。${leakInjected ? "已注入故障：领域对象的内部关联越过边界，客户端拿到了不应依赖的数据。" : "未注入故障：客户端只收到公开字段。"}`}
          className="mx-auto block h-auto w-full max-w-[920px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={36}
            text="Data Transfer Object：把用例数据装进稳定边界"
          />
          <text
            x={VIEW_W / 2}
            y="60"
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            一次请求传递一组值；领域对象的行为和内部关系留在服务端
          </text>

          {[1, 2, 3].map((value) => {
            const current = value as Stage;
            const active = current === activeStage;
            const x = 40 + (current - 1) * 300;
            return (
              <g
                key={`stage-label-${current}`}
                opacity={stageOpacity(current, activeStage)}
              >
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
                  {current}. {STAGES[current].label}
                </text>
              </g>
            );
          })}

          <g opacity={stageOpacity(1, activeStage)}>
            <rect
              x="40"
              y="132"
              width="250"
              height="182"
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
              领域对象 · 服务端
            </text>
            <text
              x="58"
              y="192"
              fontSize="11"
              fontFamily="monospace"
              fill={T.primary}
            >
              Order {"{"}
            </text>
            <text
              x="74"
              y="214"
              fontSize="11"
              fontFamily="monospace"
              fill={T.secondary}
            >
              id, customerName
            </text>
            <text
              x="74"
              y="236"
              fontSize="11"
              fontFamily="monospace"
              fill={T.secondary}
            >
              items[], paymentToken
            </text>
            <text
              x="58"
              y="280"
              fontSize="11"
              fontWeight="600"
              fill={T.success}
            >
              行为与内部关系留在边界内
            </text>
          </g>

          <PoeaaArrow
            x1={302}
            y1={222}
            x2={328}
            y2={222}
            label="显式映射"
            color={activeStage >= 2 ? T.accent : T.border}
            markerId="poeaa-pattern33-map"
          />

          <g opacity={stageOpacity(2, activeStage)}>
            <rect
              x="340"
              y="132"
              width="250"
              height="182"
              rx="10"
              fill={T.bg}
              stroke={borderColor}
              strokeWidth={leakInjected ? "2" : "1.5"}
            />
            <rect
              x="340"
              y="132"
              width="250"
              height="34"
              rx="10"
              fill={borderColor}
              fillOpacity="0.12"
            />
            <rect
              x="340"
              y="156"
              width="250"
              height="10"
              fill={borderColor}
              fillOpacity="0.12"
            />
            <text
              x="465"
              y="155"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={borderColor}
            >
              OrderSummaryDto
            </text>
            <text
              x="358"
              y="192"
              fontSize="11"
              fontFamily="monospace"
              fill={T.primary}
            >
              schemaVersion: 1
            </text>
            <text
              x="358"
              y="214"
              fontSize="11"
              fontFamily="monospace"
              fill={T.primary}
            >
              orderId, customerName
            </text>
            <text
              x="358"
              y="236"
              fontSize="11"
              fontFamily="monospace"
              fill={T.primary}
            >
              totalCents
            </text>
            <text
              x="358"
              y="280"
              fontSize="11"
              fontWeight="600"
              fill={leakInjected ? T.danger : T.accent}
            >
              {leakInjected ? "故障：内部字段混入 DTO" : "只保留用例需要的字段"}
            </text>
          </g>

          <PoeaaArrow
            x1={602}
            y1={222}
            x2={628}
            y2={222}
            label="序列化"
            color={activeStage >= 3 ? T.accent : T.border}
            markerId="poeaa-pattern33-serialize"
          />

          <g opacity={stageOpacity(3, activeStage)}>
            <rect
              x="640"
              y="132"
              width="250"
              height="182"
              rx="10"
              fill={T.bg}
              stroke={leakInjected ? T.danger : T.success}
              strokeWidth={leakInjected ? "2" : "1.5"}
            />
            <rect
              x="640"
              y="132"
              width="250"
              height="34"
              rx="10"
              fill={leakInjected ? T.danger : T.success}
              fillOpacity="0.12"
            />
            <rect
              x="640"
              y="156"
              width="250"
              height="10"
              fill={leakInjected ? T.danger : T.success}
              fillOpacity="0.12"
            />
            <text
              x="765"
              y="155"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={leakInjected ? T.danger : T.success}
            >
              客户端
            </text>
            <text
              x="658"
              y="192"
              fontSize="11"
              fontFamily="monospace"
              fill={T.primary}
            >
              readSummary(dto)
            </text>
            <text x="658" y="214" fontSize="11" fill={T.secondary}>
              读取公开字段
            </text>
            <text x="658" y="236" fontSize="11" fill={T.secondary}>
              校验 schemaVersion
            </text>
            <text
              x="658"
              y="280"
              fontSize="11"
              fontWeight="600"
              fill={leakInjected ? T.danger : T.success}
            >
              {leakInjected ? "拒绝：客户端依赖内部关系" : "一次请求，一组值"}
            </text>
          </g>

          <rect
            x="40"
            y="344"
            width="850"
            height="74"
            rx="10"
            fill={leakInjected ? T.danger : T.primary}
            fillOpacity="0.05"
            stroke={leakInjected ? T.danger : T.border}
            strokeWidth="1"
          />
          <text
            x="58"
            y="370"
            fontSize="12"
            fontWeight="700"
            fill={leakInjected ? T.danger : T.accent}
          >
            当前观察：{copy.status}
          </text>
          <text
            x="58"
            y="396"
            fontSize="11"
            fill={leakInjected ? T.danger : T.secondary}
          >
            {leakInjected
              ? "故障证据：items 或 paymentToken 越过边界；修法是收窄 DTO 并用序列化快照锁住字段。"
              : copy.note}
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={456}
            text="DTO 交付数据，不交付领域对象；版本和失败策略属于同一条边界"
          />
        </svg>

        {interactive && (
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            {[1, 2, 3].map((value) => {
              const current = value as Stage;
              const active = current === activeStage;
              return (
                <button
                  key={`stage-control-${current}`}
                  type="button"
                  onClick={() => setSelectedStage(current)}
                  aria-pressed={active}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    active
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border text-secondary hover:border-accent hover:text-primary"
                  }`}
                >
                  {current}. {STAGES[current].label}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => setLeakInjected((value) => !value)}
              aria-pressed={leakInjected}
              className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                leakInjected
                  ? "border-danger text-danger"
                  : "border-border text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              {leakInjected ? "关闭字段泄漏" : "注入字段泄漏"}
            </button>
          </div>
        )}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        DTO
        把用例所需字段打包成一次传输；故障开关展示领域对象原样越界后的泄漏风险。
      </figcaption>
    </figure>
  );
}
