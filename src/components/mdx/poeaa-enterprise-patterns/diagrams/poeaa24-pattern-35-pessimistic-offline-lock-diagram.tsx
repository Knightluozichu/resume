"use client";

import { useId, useState } from "react";

import { DiagramCaption, DiagramTitle, T } from "../poeaa-svg-primitives";

const VIEW_W = 900;
const VIEW_H = 470;

export type Poeaa24Pattern35PessimisticOfflineLockDiagramProps = {
  /** Stepper 使用确定性的三阶段快照；主图默认由读者交互控制。 */
  step?: 1 | 2 | 3;
  /** false 时隐藏控件，只渲染指定阶段，避免 Stepper 快照不稳定。 */
  interactive?: boolean;
};

const STEP_COPY = {
  1: {
    title: "读取时取得锁",
    status: "责任先占住",
    detail: "客服 A 读取订单时先取得排他锁，其他写入者不能绕过同一入口。",
  },
  2: {
    title: "持锁完成业务",
    status: "竞争者等待",
    detail: "客服 A 在锁内完成校验与修改；客服 B 只能等待、超时或取消。",
  },
  3: {
    title: "提交并恢复所有权",
    status: "释放后交接",
    detail: "A 提交并释放锁，B 重新读取后继续；失主则由租约超时触发恢复。",
  },
} as const;

function stageOpacity(stage: 1 | 2 | 3, activeStep: 1 | 2 | 3) {
  return stage === activeStep ? 1 : stage < activeStep ? 0.72 : 0.34;
}

/**
 * 悲观离线锁的专属教学图：读取 → 持锁修改 → 释放/失主恢复。
 *
 * 图上的“注入失主故障”把正常释放切换成租约过期恢复，读者可以验证锁
 * 不只是数据库 API，而是一份必须定义获取、超时、释放和恢复责任的协议。
 */
export function Poeaa24Pattern35PessimisticOfflineLockDiagram({
  step = 1,
  interactive = true,
}: Poeaa24Pattern35PessimisticOfflineLockDiagramProps) {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(step);
  const [ownerLost, setOwnerLost] = useState(false);
  const currentStep = interactive ? activeStep : step;
  const copy = STEP_COPY[currentStep];
  const rawId = useId().replace(/:/g, "");
  const arrowId = `poeaa-pattern35-arrow-${rawId}`;
  const dangerArrowId = `${arrowId}-danger`;

  const reset = () => {
    setActiveStep(1);
    setOwnerLost(false);
  };

  const isRecovery = interactive && ownerLost;
  const statusColor = isRecovery
    ? T.danger
    : currentStep === 3
      ? T.success
      : T.accent;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="poeaa-pattern35-pessimistic-offline-lock"
        className="rounded-card border border-border bg-elevated p-5"
      >
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            专属代码协议图 · {copy.status}
          </span>
          {interactive && (
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setOwnerLost((value) => !value)}
                aria-pressed={ownerLost}
                className={`rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                  ownerLost
                    ? "border-danger text-danger"
                    : "border-border text-secondary hover:border-accent hover:text-primary"
                }`}
              >
                {ownerLost ? "恢复正常释放" : "注入失主故障"}
              </button>
              <button
                type="button"
                onClick={reset}
                className="rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
              >
                重置
              </button>
            </div>
          )}
        </div>

        {interactive && (
          <div className="mb-4 flex flex-wrap gap-2" role="tablist" aria-label="锁协议阶段">
            {([1, 2, 3] as const).map((phase) => (
              <button
                key={`phase-${phase}`}
                type="button"
                role="tab"
                aria-selected={phase === currentStep}
                onClick={() => setActiveStep(phase)}
                className={`rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                  phase === currentStep
                    ? "border-accent text-accent"
                    : "border-border text-secondary hover:border-accent hover:text-primary"
                }`}
              >
                {phase}. {STEP_COPY[phase].title}
              </button>
            ))}
          </div>
        )}

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={`悲观离线锁第${currentStep}步：${copy.detail}${isRecovery ? "当前已注入失主故障，A 不再主动释放，租约过期后 B 才能恢复。" : ""}`}
          className="mx-auto block h-auto w-full max-w-[900px]"
        >
          <defs>
            <marker
              id={arrowId}
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="5"
              orient="auto"
            >
              <path d="M0 0 L9 5 L0 10 Z" fill={T.accent} />
            </marker>
            <marker
              id={dangerArrowId}
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="5"
              orient="auto"
            >
              <path d="M0 0 L9 5 L0 10 Z" fill={T.danger} />
            </marker>
          </defs>

          <DiagramTitle
            x={VIEW_W / 2}
            y={30}
            text="Pessimistic Offline Lock：先占责任，再修改"
          />
          <text
            x={VIEW_W / 2}
            y={53}
            textAnchor="middle"
            fontSize="12"
            fill={T.secondary}
          >
            {copy.title} · {copy.detail}
          </text>

          {([1, 2, 3] as const).map((phase) => {
            const x = 32 + (phase - 1) * 282;
            const active = phase === currentStep;
            return (
              <g key={`stage-${phase}`} opacity={stageOpacity(phase, currentStep)}>
                <rect
                  x={x}
                  y="72"
                  width="250"
                  height="54"
                  rx="9"
                  fill={active ? T.accent : T.secondary}
                  fillOpacity="0.1"
                  stroke={active ? T.accent : T.border}
                  strokeWidth={active ? "1.8" : "1"}
                />
                <text
                  x={x + 16}
                  y="94"
                  fontSize="12"
                  fontWeight="700"
                  fill={active ? T.accent : T.secondary}
                >
                  {phase}. {STEP_COPY[phase].title}
                </text>
                <text x={x + 16} y="113" fontSize="11" fill={T.primary}>
                  {phase === 1
                    ? "A → 锁管理器"
                    : phase === 2
                      ? "A 持锁 · B 等待"
                      : "提交 · 释放 · 恢复"}
                </text>
              </g>
            );
          })}

          <line
            x1="282"
            y1="99"
            x2="306"
            y2="99"
            stroke={T.accent}
            strokeWidth="1.5"
            markerEnd={`url(#${arrowId})`}
          />
          <line
            x1="564"
            y1="99"
            x2="588"
            y2="99"
            stroke={T.accent}
            strokeWidth="1.5"
            markerEnd={`url(#${arrowId})`}
          />

          <rect
            x="32"
            y="150"
            width="250"
            height="194"
            rx="10"
            fill={T.bg}
            stroke={currentStep === 1 ? T.accent : T.border}
            strokeWidth={currentStep === 1 ? "1.8" : "1"}
          />
          <rect
            x="325"
            y="150"
            width="250"
            height="194"
            rx="10"
            fill={T.bg}
            stroke={statusColor}
            strokeWidth={currentStep === 2 || isRecovery ? "1.8" : "1"}
          />
          <rect
            x="618"
            y="150"
            width="250"
            height="194"
            rx="10"
            fill={T.bg}
            stroke={currentStep === 3 ? T.success : T.border}
            strokeWidth={currentStep === 3 ? "1.8" : "1"}
          />

          <text x="50" y="177" fontSize="12" fontWeight="700" fill={T.success}>
            客服 A · 当前持有者
          </text>
          <text x="343" y="177" fontSize="12" fontWeight="700" fill={statusColor}>
            锁管理器 · 唯一裁决点
          </text>
          <text x="636" y="177" fontSize="12" fontWeight="700" fill={T.warning}>
            客服 B · 竞争者
          </text>

          <text x="50" y="205" fontSize="11" fill={T.primary}>
            读取订单 #42
          </text>
          <text x="50" y="231" fontSize="11" fill={T.primary}>
            {currentStep >= 1 ? "取得排他锁 ✓" : "尚未读取"}
          </text>
          <text x="50" y="257" fontSize="11" fill={T.primary}>
            {currentStep >= 2 ? "修改草稿并校验" : "等待业务处理"}
          </text>
          <text x="50" y="283" fontSize="11" fill={isRecovery ? T.danger : T.success}>
            {isRecovery ? "连接中断 · 未主动释放" : "提交后释放锁"}
          </text>
          <text x="50" y="319" fontSize="11" fill={T.secondary}>
            owner = A
          </text>

          <text x="343" y="205" fontSize="11" fontFamily="monospace" fill={T.primary}>
            resource: order#42
          </text>
          <text x="343" y="231" fontSize="11" fontFamily="monospace" fill={T.primary}>
            owner: {isRecovery ? "A (lost)" : currentStep >= 1 ? "A" : "none"}
          </text>
          <text x="343" y="257" fontSize="11" fontFamily="monospace" fill={isRecovery ? T.danger : T.primary}>
            {isRecovery ? "lease: expired → recover" : "lease: 30s"}
          </text>
          <text x="343" y="283" fontSize="11" fill={statusColor}>
            {isRecovery ? "允许 B 接管并重读" : currentStep >= 2 ? "B: wait / timeout" : "等待获取请求"}
          </text>
          <text x="343" y="319" fontSize="11" fill={T.secondary}>
            timeout + release + recovery
          </text>

          <text x="636" y="205" fontSize="11" fill={T.primary}>
            请求 order#42 的排他锁
          </text>
          <text x="636" y="231" fontSize="11" fill={currentStep >= 2 ? T.warning : T.secondary}>
            {currentStep >= 2 ? "被阻塞：等待或超时" : "尚未竞争"}
          </text>
          <text x="636" y="257" fontSize="11" fill={currentStep === 3 ? T.success : T.primary}>
            {currentStep === 3 ? "获得锁后重新读取" : "不能绕过锁直接写入"}
          </text>
          <text x="636" y="283" fontSize="11" fill={currentStep === 3 ? T.success : T.secondary}>
            {currentStep === 3 ? "继续修改并提交" : "等待 A 的释放信号"}
          </text>
          <text x="636" y="319" fontSize="11" fill={T.secondary}>
            wait ≤ timeout
          </text>

          <line
            x1="282"
            y1="243"
            x2="325"
            y2="243"
            stroke={T.success}
            strokeWidth="1.5"
            markerEnd={`url(#${arrowId})`}
          />
          <line
            x1="618"
            y1="243"
            x2="575"
            y2="243"
            stroke={T.warning}
            strokeWidth="1.5"
            strokeDasharray="5 4"
            markerEnd={`url(#${arrowId})`}
          />

          <rect
            x="32"
            y="370"
            width="836"
            height="52"
            rx="9"
            fill={isRecovery ? T.danger : T.accent}
            fillOpacity="0.08"
            stroke={isRecovery ? T.danger : T.border}
            strokeWidth="1"
          />
          <text x="50" y="392" fontSize="11" fontWeight="700" fill={statusColor}>
            {isRecovery ? "故障证据：" : "验收证据："}
          </text>
          <text x="130" y="392" fontSize="11" fill={T.primary}>
            {isRecovery
              ? "失主不释放时，租约过期是 B 接管的前置条件；不能靠“再试一次”掩盖所有权不明。"
              : "锁的获取、超时、释放和失主恢复都可被记录；只有数据库一次提交成功还不够。"}
          </text>
          <text x="50" y="410" fontSize="11" fill={T.secondary}>
            选择信号：冲突损失高且可接受等待；拒绝信号：长事务、死锁或锁粒度无法量化。
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="悲观离线锁把冲突处理前移：先取得排他责任，再允许业务修改"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        交互验证：切换三个阶段，再注入失主故障；重置后应回到“读取时取得锁”。
      </figcaption>
    </figure>
  );
}
