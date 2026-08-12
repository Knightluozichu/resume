"use client";

import { useState } from "react";

const BUTTON_CLASS =
  "min-h-11 rounded-lg border border-border bg-background px-3 py-2 text-left text-sm transition hover:border-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]";

function ResetButton({ onClick }: { onClick: () => void }) {
  return (
    <button className={BUTTON_CLASS} onClick={onClick} type="button">
      重置实验
    </button>
  );
}

function ChoiceButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      aria-pressed={active}
      className={`${BUTTON_CLASS} ${
        active ? "border-[var(--accent)] bg-[var(--accent)] text-white" : ""
      }`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

type RepresentationId = "token" | "attention" | "generation";

const representations: Record<
  RepresentationId,
  { label: string; input: string; middle: string; output: string }
> = {
  token: {
    label: "词元边界",
    input: "句子",
    middle: "分词与位置",
    output: "可追踪的 token",
  },
  attention: {
    label: "注意力关系",
    input: "token 序列",
    middle: "查询、键、值",
    output: "上下文表示",
  },
  generation: {
    label: "逐步生成",
    input: "上下文窗口",
    middle: "下一个 token 概率",
    output: "候选文本",
  },
};

export function Bla01RepresentationLab() {
  const [representationId, setRepresentationId] =
    useState<RepresentationId>("token");
  const [contextDrift, setContextDrift] = useState(false);
  const representation = representations[representationId];
  const finalOutput = contextDrift ? "边界变化，需重算" : representation.output;

  return (
    <section
      aria-label="LLM 表示路径实验"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bla-01-representation-flow"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
            Representation flow
          </p>
          <h3 className="mt-1 text-lg font-semibold">从输入到表示，先找出最早分叉</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            切换观察层级，再改变上下文边界；如果中间表示已经变化，就不能把差异归因给最后一句话。
          </p>
        </div>
        <ResetButton
          onClick={() => {
            setRepresentationId("token");
            setContextDrift(false);
          }}
        />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(representations) as RepresentationId[]).map((id) => (
          <ChoiceButton
            active={representationId === id}
            key={id}
            onClick={() => setRepresentationId(id)}
          >
            {representations[id].label}
          </ChoiceButton>
        ))}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input
          checked={contextDrift}
          className="size-4 accent-[var(--accent)]"
          onChange={(event) => setContextDrift(event.target.checked)}
          type="checkbox"
        />
        改变上下文边界或词元器版本
      </label>

      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg
          aria-label="输入经过表示层后形成输出的流程图"
          className="h-auto min-w-[680px] w-full"
          role="img"
          viewBox="0 0 760 330"
        >
          <defs>
            <marker
              id="bla-01-representation-arrow"
              markerHeight="7"
              markerWidth="7"
              orient="auto-start-reverse"
              refX="6"
              refY="3.5"
              viewBox="0 0 7 7"
            >
              <path d="M0,0 L7,3.5 L0,7 z" fill="var(--accent)" />
            </marker>
          </defs>
          <text fill="var(--muted)" fontSize="12" x="28" y="30">
            当前观察：{representation.label} · 变化状态：{contextDrift ? "已触发" : "未触发"}
          </text>
          {[
            { x: 35, label: "输入", value: representation.input },
            { x: 215, label: "中间层", value: representation.middle },
            { x: 395, label: "证据", value: contextDrift ? "边界差异" : "表示快照" },
            { x: 575, label: "输出", value: finalOutput },
          ].map((node, index, nodes) => (
            <g key={node.label}>
              <rect
                fill="var(--surface)"
                height="106"
                rx="12"
                stroke={contextDrift && index >= 1 ? "var(--danger)" : "var(--border)"}
                strokeWidth="2"
                width="145"
                x={node.x}
                y="92"
              />
              <text fill="var(--accent)" fontSize="13" fontWeight="700" textAnchor="middle" x={node.x + 72} y="122">
                {node.label}
              </text>
              <text fill="var(--text)" fontSize="12" textAnchor="middle" x={node.x + 72} y="153">
                {node.value}
              </text>
              {index < nodes.length - 1 ? (
                <line
                  markerEnd="url(#bla-01-representation-arrow)"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  x1={node.x + 145}
                  x2={nodes[index + 1].x - 12}
                  y1="145"
                  y2="145"
                />
              ) : null}
            </g>
          ))}
          <rect
            fill={contextDrift ? "var(--danger-soft)" : "var(--surface)"}
            height="55"
            rx="10"
            stroke={contextDrift ? "var(--danger)" : "var(--border)"}
            width="680"
            x="35"
            y="240"
          />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">
            {contextDrift
              ? "观察：表示已经改变，先重放分词与上下文，再讨论生成质量。"
              : "观察：表示快照让模型行为从黑箱输出变成可比较的中间证据。"}
          </text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">
        {contextDrift
          ? "先记录词元边界和窗口差异；流畅输出不能覆盖输入表示已经变化的事实。"
          : `当前路径把“${representation.input}”变成“${representation.output}”，可继续检查中间表示。`}
      </p>
    </section>
  );
}

type TrainingStage = "pretrain" | "evaluate" | "audit";

const trainingStages: Record<
  TrainingStage,
  { label: string; artifact: string; metric: string; decision: string }
> = {
  pretrain: {
    label: "预训练",
    artifact: "数据切分与检查点",
    metric: "损失曲线",
    decision: "是否得到可复用基座",
  },
  evaluate: {
    label: "评估",
    artifact: "冻结评测集与逐样本输出",
    metric: "质量、延迟、成本",
    decision: "是否超过发布门槛",
  },
  audit: {
    label: "审计",
    artifact: "泄漏、偏差与失败样本",
    metric: "边界风险",
    decision: "是否允许进入应用",
  },
};

export function Bla01TrainingLab() {
  const [stage, setStage] = useState<TrainingStage>("pretrain");
  const [checkpointDrift, setCheckpointDrift] = useState(false);
  const current = trainingStages[stage];

  return (
    <section
      aria-label="LLM 训练评估实验"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bla-01-training-evidence"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
            Training evidence
          </p>
          <h3 className="mt-1 text-lg font-semibold">训练、评估、审计是三种不同证据</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            训练损失只能说明优化过程；切换阶段，检查每一类证据在发布决定中承担什么责任。
          </p>
        </div>
        <ResetButton
          onClick={() => {
            setStage("pretrain");
            setCheckpointDrift(false);
          }}
        />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(trainingStages) as TrainingStage[]).map((id) => (
          <ChoiceButton active={stage === id} key={id} onClick={() => setStage(id)}>
            {trainingStages[id].label}
          </ChoiceButton>
        ))}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input
          checked={checkpointDrift}
          className="size-4 accent-[var(--accent)]"
          onChange={(event) => setCheckpointDrift(event.target.checked)}
          type="checkbox"
        />
        混用训练检查点或评测数据
      </label>

      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg
          aria-label="训练阶段经过证据和指标后形成发布判断的流程图"
          className="h-auto min-w-[680px] w-full"
          role="img"
          viewBox="0 0 760 330"
        >
          <defs>
            <marker
              id="bla-01-training-arrow"
              markerHeight="7"
              markerWidth="7"
              orient="auto-start-reverse"
              refX="6"
              refY="3.5"
              viewBox="0 0 7 7"
            >
              <path d="M0,0 L7,3.5 L0,7 z" fill="var(--accent)" />
            </marker>
          </defs>
          <text fill="var(--muted)" fontSize="12" x="28" y="30">
            当前阶段：{current.label} · 数据边界：{checkpointDrift ? "混用" : "分离"}
          </text>
          {[
            { x: 35, label: "阶段", value: current.label },
            { x: 215, label: "产物", value: current.artifact },
            { x: 395, label: "指标", value: checkpointDrift ? "不可比较" : current.metric },
            { x: 575, label: "决定", value: checkpointDrift ? "阻断并重测" : current.decision },
          ].map((node, index, nodes) => (
            <g key={node.label}>
              <rect
                fill="var(--surface)"
                height="106"
                rx="12"
                stroke={checkpointDrift && index >= 1 ? "var(--danger)" : "var(--border)"}
                strokeWidth="2"
                width="145"
                x={node.x}
                y="92"
              />
              <text fill="var(--accent)" fontSize="13" fontWeight="700" textAnchor="middle" x={node.x + 72} y="122">
                {node.label}
              </text>
              <text fill="var(--text)" fontSize="12" textAnchor="middle" x={node.x + 72} y="153">
                {node.value}
              </text>
              {index < nodes.length - 1 ? (
                <line
                  markerEnd="url(#bla-01-training-arrow)"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  x1={node.x + 145}
                  x2={nodes[index + 1].x - 12}
                  y1="145"
                  y2="145"
                />
              ) : null}
            </g>
          ))}
          <rect
            fill={checkpointDrift ? "var(--danger-soft)" : "var(--surface)"}
            height="55"
            rx="10"
            stroke={checkpointDrift ? "var(--danger)" : "var(--border)"}
            width="680"
            x="35"
            y="240"
          />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">
            {checkpointDrift
              ? "数据边界被污染：评估分数不能证明泛化，先隔离数据并重建报告。"
              : "发布证据必须同时覆盖质量、成本、延迟、风险和可复现性。"}
          </text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">
        {checkpointDrift
          ? "观察：训练集与评测集混用会让好分数失去解释力，即使曲线看起来很漂亮。"
          : `观察：${current.label}产生“${current.artifact}”，使用“${current.metric}”支持“${current.decision}”。`}
      </p>
    </section>
  );
}

type CustomizationId = "base" | "prompt" | "finetune";

const customizationModes: Record<
  CustomizationId,
  { label: string; change: string; cost: string; risk: string }
> = {
  base: {
    label: "基座模型",
    change: "不改权重",
    cost: "低改造成本",
    risk: "能力边界需测量",
  },
  prompt: {
    label: "提示定制",
    change: "改输入合同",
    cost: "按请求付费",
    risk: "上下文漂移",
  },
  finetune: {
    label: "微调模型",
    change: "改参数或适配器",
    cost: "训练与托管成本",
    risk: "遗忘、泄漏与回滚",
  },
};

export function Bla01CustomizationLab() {
  const [mode, setMode] = useState<CustomizationId>("base");
  const [budgetExceeded, setBudgetExceeded] = useState(false);
  const current = customizationModes[mode];

  return (
    <section
      aria-label="基座模型与定制模型边界实验"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bla-01-customization-boundary"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
            Customization boundary
          </p>
          <h3 className="mt-1 text-lg font-semibold">定制程度越深，责任边界越长</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            选择基座、提示或微调，观察改变对象如何同时改变成本、回滚方案和必须重新验证的风险。
          </p>
        </div>
        <ResetButton
          onClick={() => {
            setMode("base");
            setBudgetExceeded(false);
          }}
        />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(customizationModes) as CustomizationId[]).map((id) => (
          <ChoiceButton active={mode === id} key={id} onClick={() => setMode(id)}>
            {customizationModes[id].label}
          </ChoiceButton>
        ))}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input
          checked={budgetExceeded}
          className="size-4 accent-[var(--accent)]"
          onChange={(event) => setBudgetExceeded(event.target.checked)}
          type="checkbox"
        />
        预算或回滚窗口已经超出
      </label>

      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg
          aria-label="模型定制方式经过成本和风险后形成部署边界的流程图"
          className="h-auto min-w-[680px] w-full"
          role="img"
          viewBox="0 0 760 330"
        >
          <defs>
            <marker
              id="bla-01-customization-arrow"
              markerHeight="7"
              markerWidth="7"
              orient="auto-start-reverse"
              refX="6"
              refY="3.5"
              viewBox="0 0 7 7"
            >
              <path d="M0,0 L7,3.5 L0,7 z" fill="var(--accent)" />
            </marker>
          </defs>
          <text fill="var(--muted)" fontSize="12" x="28" y="30">
            当前方式：{current.label} · 预算状态：{budgetExceeded ? "超出" : "在界内"}
          </text>
          {[
            { x: 35, label: "对象", value: current.change },
            { x: 215, label: "成本", value: budgetExceeded ? "不可接受" : current.cost },
            { x: 395, label: "风险", value: current.risk },
            { x: 575, label: "边界", value: budgetExceeded ? "暂停部署" : "可进入验证" },
          ].map((node, index, nodes) => (
            <g key={node.label}>
              <rect
                fill="var(--surface)"
                height="106"
                rx="12"
                stroke={budgetExceeded && index >= 1 ? "var(--danger)" : "var(--border)"}
                strokeWidth="2"
                width="145"
                x={node.x}
                y="92"
              />
              <text fill="var(--accent)" fontSize="13" fontWeight="700" textAnchor="middle" x={node.x + 72} y="122">
                {node.label}
              </text>
              <text fill="var(--text)" fontSize="12" textAnchor="middle" x={node.x + 72} y="153">
                {node.value}
              </text>
              {index < nodes.length - 1 ? (
                <line
                  markerEnd="url(#bla-01-customization-arrow)"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  x1={node.x + 145}
                  x2={nodes[index + 1].x - 12}
                  y1="145"
                  y2="145"
                />
              ) : null}
            </g>
          ))}
          <rect
            fill={budgetExceeded ? "var(--danger-soft)" : "var(--surface)"}
            height="55"
            rx="10"
            stroke={budgetExceeded ? "var(--danger)" : "var(--border)"}
            width="680"
            x="35"
            y="240"
          />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">
            {budgetExceeded
              ? "预算超出不是产品偏好：先缩小训练范围，保留可回滚的候选版本。"
              : "选择定制方式时，同时写清新增能力、验证证据、回滚路径和运营责任。"}
          </text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">
        {budgetExceeded
          ? "观察：成本约束改变了可发布边界；不要用更高分数掩盖无法维护的模型。"
          : `观察：${current.label}的核心变化是“${current.change}”，当前成本为“${current.cost}”。`}
      </p>
    </section>
  );
}
