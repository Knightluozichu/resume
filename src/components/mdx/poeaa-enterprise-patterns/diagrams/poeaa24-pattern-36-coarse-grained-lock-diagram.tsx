"use client";

import { useId, useState } from "react";
import { DiagramCaption, DiagramTitle, T } from "../poeaa-svg-primitives";

type Stage = 1 | 2 | 3;

type Poeaa24Pattern36CoarseGrainedLockDiagramProps = {
  step?: Stage;
  interactive?: boolean;
};

const VIEW_W = 900;
const VIEW_H = 500;

const STAGES: Record<Stage, { title: string; detail: string }> = {
  1: { title: "取得边界", detail: "A 先取得 Order 的锁" },
  2: { title: "锁内工作", detail: "读取、校验与修改共享边界" },
  3: { title: "提交释放", detail: "推进版本，再释放并处理冲突" },
};

function stageOpacity(stage: Stage, current: Stage) {
  return stage === current ? 1 : 0.56;
}

export function Poeaa24Pattern36CoarseGrainedLockDiagram({
  step = 1,
  interactive = true,
}: Poeaa24Pattern36CoarseGrainedLockDiagramProps) {
  const [activeStage, setActiveStage] = useState<Stage>(step);
  const [wrongBoundary, setWrongBoundary] = useState(false);
  const currentStage = interactive ? activeStage : step;
  const currentCopy = STAGES[currentStage];
  const rawId = useId().replace(/:/g, "");
  const arrowId = `poeaa-pattern36-arrow-${rawId}`;
  const dangerArrowId = `${arrowId}-danger`;
  const boundaryStroke = wrongBoundary ? T.danger : T.accent;

  const reset = () => {
    setActiveStage(1);
    setWrongBoundary(false);
  };

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="poeaa-pattern36-coarse-grained-lock"
        className="rounded-card border border-border bg-elevated p-5"
      >
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            专属代码协议图 · {currentCopy.title}
          </span>
          {interactive && (
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setWrongBoundary((value) => !value)}
                aria-pressed={wrongBoundary}
                className={`rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                  wrongBoundary
                    ? "border-danger text-danger"
                    : "border-border text-secondary hover:border-accent hover:text-primary"
                }`}
              >
                {wrongBoundary ? "恢复完整边界" : "注入错误边界"}
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
          <div className="mb-4 flex flex-wrap gap-2" role="tablist" aria-label="订单锁协议阶段">
            {([1, 2, 3] as const).map((stage) => (
              <button
                key={`stage-${stage}`}
                type="button"
                role="tab"
                aria-selected={stage === currentStage}
                onClick={() => setActiveStage(stage)}
                className={`rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                  stage === currentStage
                    ? "border-accent text-accent"
                    : "border-border text-secondary hover:border-accent hover:text-primary"
                }`}
              >
                {stage}. {STAGES[stage].title}
              </button>
            ))}
          </div>
        )}

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={`粗粒度锁第${currentStage}步：${currentCopy.detail}${wrongBoundary ? "错误边界只保护一条明细，其他写入可能绕过订单锁。" : "完整边界覆盖订单根、明细与付款对象。"}`}
          className="mx-auto block h-auto w-full max-w-[900px]"
        >
          <defs>
            <marker id={arrowId} markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
              <path d="M0 0 L9 5 L0 10 Z" fill={T.accent} />
            </marker>
            <marker id={dangerArrowId} markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
              <path d="M0 0 L9 5 L0 10 Z" fill={T.danger} />
            </marker>
          </defs>

          <DiagramTitle
            x={VIEW_W / 2}
            y={30}
            text="Coarse-Grained Lock：用一个业务边界保护一组对象"
          />
          <text x={VIEW_W / 2} y="53" textAnchor="middle" fontSize="12" fill={T.secondary}>
            {currentCopy.title} · {currentCopy.detail}
          </text>

          {([1, 2, 3] as const).map((stage) => {
            const x = 32 + (stage - 1) * 286;
            const active = stage === currentStage;
            return (
              <g key={`stage-card-${stage}`} opacity={stageOpacity(stage, currentStage)}>
                <rect
                  x={x}
                  y="72"
                  width="254"
                  height="54"
                  rx="9"
                  fill={active ? T.accent : T.secondary}
                  fillOpacity="0.1"
                  stroke={active ? T.accent : T.border}
                  strokeWidth={active ? "1.8" : "1"}
                />
                <text x={x + 16} y="95" fontSize="12" fontWeight="700" fill={active ? T.accent : T.secondary}>
                  {stage}. {STAGES[stage].title}
                </text>
                <text x={x + 16} y="114" fontSize="11" fill={T.primary}>
                  {STAGES[stage].detail}
                </text>
              </g>
            );
          })}

          <line x1="286" y1="99" x2="310" y2="99" stroke={T.accent} strokeWidth="1.5" markerEnd={`url(#${arrowId})`} />
          <line x1="572" y1="99" x2="596" y2="99" stroke={T.accent} strokeWidth="1.5" markerEnd={`url(#${arrowId})`} />

          <rect
            x="32"
            y="150"
            width="548"
            height="184"
            rx="10"
            fill={T.bg}
            stroke={boundaryStroke}
            strokeWidth="1.8"
            strokeDasharray={wrongBoundary ? "6 4" : undefined}
          />
          <text x="52" y="175" fontSize="12" fontWeight="700" fill={boundaryStroke}>
            {wrongBoundary ? "错误保护范围 · 只覆盖 LineItem #1" : "完整保护范围 · Order 聚合"}
          </text>
          <text x="52" y="196" fontSize="11" fill={T.secondary}>
            {wrongBoundary ? "子对象可以绕过根对象单独写入" : "根、明细与付款状态共享同一把锁"}
          </text>

          <rect x="62" y="218" width="144" height="48" rx="7" fill={T.accent} fillOpacity="0.08" stroke={T.border} />
          <text x="134" y="239" textAnchor="middle" fontSize="12" fontWeight="700" fill={T.accent}>Order 根</text>
          <text x="134" y="256" textAnchor="middle" fontSize="11" fill={T.secondary}>version = 3</text>
          <rect x="226" y="218" width="144" height="48" rx="7" fill={wrongBoundary ? T.danger : T.primary} fillOpacity="0.08" stroke={wrongBoundary ? T.danger : T.border} />
          <text x="298" y="239" textAnchor="middle" fontSize="12" fontWeight="700" fill={wrongBoundary ? T.danger : T.primary}>LineItem #1</text>
          <text x="298" y="256" textAnchor="middle" fontSize="11" fill={T.secondary}>金额与数量</text>
          <rect x="390" y="218" width="144" height="48" rx="7" fill={T.primary} fillOpacity="0.08" stroke={T.border} />
          <text x="462" y="239" textAnchor="middle" fontSize="12" fontWeight="700" fill={T.primary}>Payment</text>
          <text x="462" y="256" textAnchor="middle" fontSize="11" fill={T.secondary}>付款状态</text>
          <line x1="206" y1="242" x2="226" y2="242" stroke={T.border} strokeWidth="1.2" markerEnd={`url(#${arrowId})`} />
          <line x1="370" y1="242" x2="390" y2="242" stroke={T.border} strokeWidth="1.2" markerEnd={`url(#${arrowId})`} />
          <text x="52" y="305" fontSize="11" fill={wrongBoundary ? T.danger : T.success}>
            {wrongBoundary ? "风险：LineItem #2 与 Payment 未被同一把锁保护" : "证据：一次业务决定由同一把锁从读取保护到提交"}
          </text>

          <rect x="612" y="150" width="256" height="184" rx="10" fill={T.bg} stroke={currentStage === 2 ? T.accent : T.border} strokeWidth={currentStage === 2 ? "1.8" : "1"} />
          <text x="632" y="175" fontSize="12" fontWeight="700" fill={T.accent}>锁管理器 · 唯一裁决点</text>
          <text x="632" y="205" fontSize="11" fontFamily="monospace" fill={T.primary}>resource: order#42</text>
          <text x="632" y="229" fontSize="11" fontFamily="monospace" fill={T.primary}>owner: {currentStage === 1 ? "A" : currentStage === 2 ? "A · B 等待" : "A → B"}</text>
          <text x="632" y="253" fontSize="11" fontFamily="monospace" fill={wrongBoundary ? T.danger : T.primary}>boundary: {wrongBoundary ? "lineItem#1" : "order#42"}</text>
          <text x="632" y="280" fontSize="11" fill={currentStage === 3 ? T.success : T.warning}>
            {currentStage === 1 ? "B 记录等待开始" : currentStage === 2 ? "B 等待或超时" : "冲突者重读后再试"}
          </text>
          <text x="632" y="310" fontSize="11" fill={T.secondary}>timeout + version + release</text>

          <line x1="580" y1="242" x2="612" y2="242" stroke={T.accent} strokeWidth="1.5" markerEnd={`url(#${arrowId})`} />
          {wrongBoundary && (
            <line x1="534" y1="276" x2="612" y2="300" stroke={T.danger} strokeWidth="1.5" strokeDasharray="5 4" markerEnd={`url(#${dangerArrowId})`} />
          )}

          <rect x="32" y="360" width="836" height="74" rx="9" fill={wrongBoundary ? T.danger : T.accent} fillOpacity="0.08" stroke={wrongBoundary ? T.danger : T.border} />
          <text x="52" y="385" fontSize="12" fontWeight="700" fill={wrongBoundary ? T.danger : T.accent}>
            {wrongBoundary ? "故障证据：" : "验收证据："}
          </text>
          <text x="146" y="385" fontSize="11" fill={T.primary}>
            {wrongBoundary ? "子对象绕过根后，锁日志无法解释 Payment 与总额是否一起变化。" : "同一订单的锁范围、快照版本、提交结果和释放结果都可被重放。"}
          </text>
          <text x="52" y="412" fontSize="11" fill={T.secondary}>
            {wrongBoundary ? "拒绝信号：锁覆盖范围小于业务不变量，出现无法归属的并发写入。" : "选择信号：边界刚好覆盖一个不变量，等待与冲突损失都在预算内。"}
          </text>

          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 10} text="粗粒度锁把同一个业务决定的对象放进一把可审计的锁" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        切换三个阶段并注入错误边界；重置后应回到取得订单边界的初始状态。
      </figcaption>
    </figure>
  );
}
