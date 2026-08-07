"use client";

import { useState } from "react";

import { DiagramCaption, DiagramTitle, T } from "../poeaa-svg-primitives";

/**
 * 客户会话状态的章专属教学图：客户端携带有限载荷，服务器验证并重建
 * 权威上下文，再返回新的签名载荷。错误开关展示客户端篡改的拒绝边界。
 */

const VIEW_W = 920;
const VIEW_H = 500;

type Step = 1 | 2 | 3;

const STAGES: Record<
  Step,
  { label: string; status: string; client: string[]; server: string[] }
> = {
  1: {
    label: "形成载荷",
    status: "客户端只保存有限上下文",
    client: ["step=2 · cartDraftId=7", "expiresAt=15 min", "sig=server-key"],
    server: ["不保存会话表", "等待下一次请求", "业务权威仍在服务端"],
  },
  2: {
    label: "验证并重建",
    status: "服务器先验证，再读取权威数据",
    client: ["request.payload", "signature", "不携带价格与权限"],
    server: ["verify ✓", "检查过期与格式", "重查库存 / 价格 / 权限"],
  },
  3: {
    label: "返回新版本",
    status: "更新后发回新的签名载荷",
    client: ["step=2 · fresh TTL", "new signature", "可丢失，可重新开始"],
    server: ["业务更新完成", "拒绝旧版本重放", "任意节点可继续处理"],
  },
};

function stageOpacity(stage: Step, active: Step) {
  if (stage === active) return 1;
  return stage < active ? 0.78 : 0.38;
}

export type Poeaa24Pattern38ClientSessionStateDiagramProps = {
  /** Stepper 使用的确定性阶段快照。 */
  step?: Step;
  /** 主图开启阶段按钮、篡改开关和重置；快照应关闭交互。 */
  interactive?: boolean;
};

export function Poeaa24Pattern38ClientSessionStateDiagram({
  step,
  interactive = true,
}: Poeaa24Pattern38ClientSessionStateDiagramProps) {
  const [selectedStep, setSelectedStep] = useState<Step>(step ?? 1);
  const [faultInjected, setFaultInjected] = useState(false);
  const activeStep = interactive ? selectedStep : (step ?? 1);
  const stage = STAGES[activeStep];

  const reset = () => {
    setSelectedStep(1);
    setFaultInjected(false);
  };

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="poeaa-pattern38-client-session-state"
        className="rounded-card border border-border bg-elevated p-5"
      >
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            专属客户会话状态图 · {stage.status}
          </span>
          {interactive && (
            <div className="flex flex-wrap items-center gap-2">
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
                {faultInjected ? "关闭篡改模式" : "注入客户端篡改"}
              </button>
              <button
                type="button"
                onClick={reset}
                className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
              >
                重置图示
              </button>
            </div>
          )}
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={`客户会话状态第${activeStep}步：${stage.status}。客户端携带有限载荷，服务器验证并重建权威上下文，再返回新的签名载荷。${faultInjected ? "已注入故障：客户端把 role=user 改成 role=admin，服务器应拒绝。" : ""}`}
          className="mx-auto block h-auto w-full max-w-[920px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={36}
            text="Client Session State：状态跟着请求走，权威留在服务器"
          />
          <text
            x={VIEW_W / 2}
            y={60}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            每一步都要回答：谁保存、谁验证、谁决定
          </text>

          {[1, 2, 3].map((value) => {
            const phase = value as Step;
            const active = phase === activeStep;
            const x = 40 + (phase - 1) * 300;
            return (
              <g key={`stage-${phase}`} opacity={stageOpacity(phase, activeStep)}>
                <rect
                  x={x}
                  y={78}
                  width={250}
                  height={34}
                  rx={8}
                  fill={active ? T.accent : T.secondary}
                  fillOpacity="0.1"
                  stroke={active ? T.accent : T.border}
                  strokeWidth="1.2"
                />
                <text
                  x={x + 125}
                  y={100}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={active ? T.accent : T.secondary}
                >
                  {phase}. {STAGES[phase].label}
                </text>
              </g>
            );
          })}

          <g opacity={stageOpacity(1, activeStep)}>
            <rect
              x={40}
              y={134}
              width={250}
              height={170}
              rx={10}
              fill={T.bg}
              stroke={T.success}
              strokeWidth="1.5"
            />
            <text
              x={165}
              y={160}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={T.success}
            >
              客户端 / 浏览器
            </text>
            {stage.client.map((line, index) => (
              <text
                key={`client-${index}`}
                x={62}
                y={194 + index * 28}
                fontSize="12"
                fontFamily="monospace"
                fill={T.primary}
              >
                {line}
              </text>
            ))}
            <text x={62} y={282} fontSize="11" fill={T.secondary}>
              可见、可丢失、不可直接信任
            </text>
          </g>

          <g opacity={stageOpacity(activeStep, activeStep)}>
            <line
              x1={304}
              y1={196}
              x2={616}
              y2={196}
              stroke={T.accent}
              strokeWidth="1.8"
            />
            <text
              x={460}
              y={184}
              textAnchor="middle"
              fontSize="11"
              fontWeight="600"
              fill={T.accent}
            >
              {activeStep === 1
                ? "请求携带有限载荷"
                : activeStep === 2
                  ? "校验后读取权威"
                  : "响应：新的签名载荷"}
            </text>
            <line
              x1={616}
              y1={250}
              x2={304}
              y2={250}
              stroke={T.border}
              strokeWidth="1.2"
            />
            <text
              x={460}
              y={268}
              textAnchor="middle"
              fontSize="11"
              fill={T.secondary}
            >
              状态不存于服务器会话表
            </text>
          </g>

          <g opacity={stageOpacity(3, activeStep)}>
            <rect
              x={630}
              y={134}
              width={250}
              height={170}
              rx={10}
              fill={T.bg}
              stroke={T.accent}
              strokeWidth="1.5"
            />
            <text
              x={755}
              y={160}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={T.accent}
            >
              服务器 / 任意节点
            </text>
            {stage.server.map((line, index) => (
              <text
                key={`server-${index}`}
                x={652}
                y={194 + index * 28}
                fontSize="12"
                fill={T.primary}
              >
                {line}
              </text>
            ))}
            <text x={652} y={282} fontSize="11" fill={T.secondary}>
              权威、验证、过期与拒绝
            </text>
          </g>

          {faultInjected ? (
            <g>
              <rect
                x={40}
                y={332}
                width={840}
                height={54}
                rx={9}
                fill={T.danger}
                fillOpacity="0.1"
                stroke={T.danger}
                strokeWidth="1.5"
              />
              <text
                x={460}
                y={355}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={T.danger}
              >
                故障：client role=user → role=admin
              </text>
              <text
                x={460}
                y={374}
                textAnchor="middle"
                fontSize="11"
                fill={T.danger}
              >
                签名不匹配，服务器在业务执行前拒绝；编码不是完整性保护
              </text>
            </g>
          ) : null}

          <rect
            x={40}
            y={faultInjected ? 410 : 332}
            width={840}
            height={54}
            rx={9}
            fill={T.accent}
            fillOpacity="0.06"
            stroke={T.border}
            strokeWidth="1"
          />
          <text
            x={460}
            y={faultInjected ? 433 : 355}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.primary}
          >
            不变量：客户端只携带上下文，服务器重新决定金额、权限与库存
          </text>
          <text
            x={460}
            y={faultInjected ? 452 : 374}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            过期、篡改和不可逆命令必须返回可解释的拒绝结果
          </text>
          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 12}
            text="客户会话状态减轻服务端存储，但不会消除验证与生命周期责任"
          />
        </svg>

        {interactive && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs text-secondary">查看阶段：</span>
            {([1, 2, 3] as Step[]).map((phase) => {
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
                  {phase}. {STAGES[phase].label}
                </button>
              );
            })}
          </div>
        )}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        状态跟着请求往返，服务器保持业务权威；篡改模式展示签名验证与可信边界。
      </figcaption>
    </figure>
  );
}
