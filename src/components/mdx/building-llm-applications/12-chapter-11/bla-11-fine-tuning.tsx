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

function ModeButton({
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
      className={`${BUTTON_CLASS} ${active ? "border-[var(--accent)] bg-[var(--accent)] text-white" : ""}`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

type DecisionMode = "prompt" | "retrieval" | "finetune";

const decisionModes: Record<
  DecisionMode,
  { label: string; need: string; baseline: string; cost: string; decision: string }
> = {
  prompt: { label: "先改提示", need: "任务边界", baseline: "提示样例", cost: "低", decision: "继续验证" },
  retrieval: { label: "加入检索", need: "外部知识", baseline: "检索基线", cost: "中", decision: "比较来源" },
  finetune: { label: "考虑微调", need: "稳定行为", baseline: "冻结对照", cost: "高", decision: "准备数据" },
};

export function Bla11DecisionLab() {
  const [mode, setMode] = useState<DecisionMode>("prompt");
  const [baselineMissing, setBaselineMissing] = useState(false);
  const current = decisionModes[mode];
  const nodes = [
    { x: 35, label: "问题", value: current.need },
    { x: 215, label: "基线", value: baselineMissing ? "未冻结" : current.baseline },
    { x: 395, label: "代价", value: current.cost },
    { x: 575, label: "决定", value: baselineMissing ? "暂停" : current.decision },
  ];

  return (
    <section
      aria-label="微调决策实验"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bla-11-decision-path"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Tuning decision</p>
          <h3 className="mt-1 text-lg font-semibold">先证明必要性，再支付训练成本</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            选择提示、检索或微调，再取消基线，观察为什么没有冻结对照就不能声称微调带来收益。
          </p>
        </div>
        <ResetButton
          onClick={() => {
            setMode("prompt");
            setBaselineMissing(false);
          }}
        />
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(decisionModes) as DecisionMode[]).map((id) => (
          <ModeButton active={mode === id} key={id} onClick={() => setMode(id)}>
            {decisionModes[id].label}
          </ModeButton>
        ))}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input
          checked={baselineMissing}
          className="size-4 accent-[var(--accent)]"
          onChange={(event) => setBaselineMissing(event.target.checked)}
          type="checkbox"
        />
        不保存提示或检索基线
      </label>
      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg
          aria-label="微调决策从任务需求经过基线和成本进入下一步的流程图"
          className="h-auto min-w-[680px] w-full"
          role="img"
          viewBox="0 0 760 330"
        >
          <defs>
            <marker id="bla-11-decision-arrow" markerHeight="7" markerWidth="7" orient="auto-start-reverse" refX="6" refY="3.5" viewBox="0 0 7 7">
              <path d="M0,0 L7,3.5 L0,7 z" fill="var(--accent)" />
            </marker>
          </defs>
          <text fill="var(--muted)" fontSize="12" x="28" y="30">
            当前方案：{current.label} · 基线：{baselineMissing ? "缺失" : "已记录"}
          </text>
          {nodes.map((node, index) => (
            <g key={node.label}>
              <rect fill="var(--surface)" height="106" rx="12" stroke={baselineMissing && index >= 1 ? "var(--danger)" : "var(--border)"} strokeWidth="2" width="145" x={node.x} y="92" />
              <text fill="var(--accent)" fontSize="13" fontWeight="700" textAnchor="middle" x={node.x + 72} y="122">{node.label}</text>
              <text fill="var(--text)" fontSize="12" textAnchor="middle" x={node.x + 72} y="153">{node.value}</text>
              {index < nodes.length - 1 ? <line markerEnd="url(#bla-11-decision-arrow)" stroke="var(--accent)" strokeWidth="2" x1={node.x + 145} x2={nodes[index + 1].x - 12} y1="145" y2="145" /> : null}
            </g>
          ))}
          <rect fill={baselineMissing ? "var(--danger-soft)" : "var(--surface)"} height="55" rx="10" stroke={baselineMissing ? "var(--danger)" : "var(--border)"} width="680" x="35" y="240" />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">
            {baselineMissing ? "观察：没有同样本基线，微调收益无法归因，先回到实验设计。" : "观察：需求、基线与成本共同决定是否值得训练新权重。"}
          </text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">
        {baselineMissing ? "恢复基线并固定评测样本，再比较提示、检索和微调。" : `当前路径用“${current.baseline}”衡量“${current.decision}”。`}
      </p>
    </section>
  );
}

type DatasetMode = "collect" | "split" | "tokenize";

const datasetModes: Record<
  DatasetMode,
  { label: string; source: string; boundary: string; shape: string; result: string }
> = {
  collect: { label: "获取数据", source: "许可样本", boundary: "来源与去重", shape: "原始记录", result: "可追溯" },
  split: { label: "按组切分", source: "用户与时间", boundary: "训练/验证", shape: "隔离集合", result: "可公允" },
  tokenize: { label: "词元化", source: "文本样本", boundary: "长度与截断", shape: "词元序列", result: "可训练" },
};

export function Bla11DatasetLab() {
  const [mode, setMode] = useState<DatasetMode>("collect");
  const [leakage, setLeakage] = useState(false);
  const current = datasetModes[mode];
  const nodes = [
    { x: 35, label: "来源", value: current.source },
    { x: 215, label: "边界", value: leakage ? "泄漏" : current.boundary },
    { x: 395, label: "形状", value: current.shape },
    { x: 575, label: "结果", value: leakage ? "作废" : current.result },
  ];

  return (
    <section
      aria-label="微调数据准备实验"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bla-11-dataset-boundary"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Dataset boundary</p>
          <h3 className="mt-1 text-lg font-semibold">把数据处理当作训练的一部分</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            选择获取、按组切分或词元化，再把一条用户记录同时放进训练和验证，观察数据泄漏如何让分数失真。
          </p>
        </div>
        <ResetButton
          onClick={() => {
            setMode("collect");
            setLeakage(false);
          }}
        />
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(datasetModes) as DatasetMode[]).map((id) => (
          <ModeButton active={mode === id} key={id} onClick={() => setMode(id)}>
            {datasetModes[id].label}
          </ModeButton>
        ))}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input checked={leakage} className="size-4 accent-[var(--accent)]" onChange={(event) => setLeakage(event.target.checked)} type="checkbox" />
        让同一用户同时出现在训练和验证
      </label>
      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg aria-label="微调数据从来源经过边界和词元化进入可训练集合的流程图" className="h-auto min-w-[680px] w-full" role="img" viewBox="0 0 760 330">
          <defs>
            <marker id="bla-11-dataset-arrow" markerHeight="7" markerWidth="7" orient="auto-start-reverse" refX="6" refY="3.5" viewBox="0 0 7 7"><path d="M0,0 L7,3.5 L0,7 z" fill="var(--accent)" /></marker>
          </defs>
          <text fill="var(--muted)" fontSize="12" x="28" y="30">当前阶段：{current.label} · 边界：{leakage ? "不可信" : "隔离"}</text>
          {nodes.map((node, index) => (
            <g key={node.label}>
              <rect fill="var(--surface)" height="106" rx="12" stroke={leakage && index >= 1 ? "var(--danger)" : "var(--border)"} strokeWidth="2" width="145" x={node.x} y="92" />
              <text fill="var(--accent)" fontSize="13" fontWeight="700" textAnchor="middle" x={node.x + 72} y="122">{node.label}</text>
              <text fill="var(--text)" fontSize="12" textAnchor="middle" x={node.x + 72} y="153">{node.value}</text>
              {index < nodes.length - 1 ? <line markerEnd="url(#bla-11-dataset-arrow)" stroke="var(--accent)" strokeWidth="2" x1={node.x + 145} x2={nodes[index + 1].x - 12} y1="145" y2="145" /> : null}
            </g>
          ))}
          <rect fill={leakage ? "var(--danger-soft)" : "var(--surface)"} height="55" rx="10" stroke={leakage ? "var(--danger)" : "var(--border)"} width="680" x="35" y="240" />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">{leakage ? "观察：验证集合已经见过用户，指标不能代表上线时的泛化。" : "观察：许可、去重、分组、长度和词元化共同定义训练边界。"}</text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">{leakage ? "按用户或时间重新切分，废弃受污染指标并保留泄漏记录。" : `当前阶段用“${current.boundary}”形成“${current.result}”。`}</p>
    </section>
  );
}

type TrainingMode = "train" | "evaluate" | "save";

const trainingModes: Record<
  TrainingMode,
  { label: string; state: string; signal: string; artifact: string; action: string }
> = {
  train: { label: "训练权重", state: "小批次", signal: "损失曲线", artifact: "检查点", action: "继续" },
  evaluate: { label: "评估模型", state: "冻结样本", signal: "逐例差异", artifact: "对照报告", action: "比较" },
  save: { label: "保存加载", state: "版本目录", signal: "哈希与许可", artifact: "可回放包", action: "发布或回退" },
};

export function Bla11TrainingLab() {
  const [mode, setMode] = useState<TrainingMode>("train");
  const [forgetting, setForgetting] = useState(false);
  const current = trainingModes[mode];
  const nodes = [
    { x: 35, label: "状态", value: current.state },
    { x: 215, label: "信号", value: forgetting ? "旧能力下降" : current.signal },
    { x: 395, label: "产物", value: current.artifact },
    { x: 575, label: "动作", value: forgetting ? "回退" : current.action },
  ];

  return (
    <section
      aria-label="微调训练评估实验"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bla-11-training-checkpoint"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Training checkpoint</p>
          <h3 className="mt-1 text-lg font-semibold">把损失、旧能力和检查点放在一起看</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            选择训练、评估或保存加载，再触发旧能力下降，观察为什么最低损失不一定等于最佳发布版本。
          </p>
        </div>
        <ResetButton
          onClick={() => {
            setMode("train");
            setForgetting(false);
          }}
        />
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(trainingModes) as TrainingMode[]).map((id) => (
          <ModeButton active={mode === id} key={id} onClick={() => setMode(id)}>
            {trainingModes[id].label}
          </ModeButton>
        ))}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input checked={forgetting} className="size-4 accent-[var(--accent)]" onChange={(event) => setForgetting(event.target.checked)} type="checkbox" />
        注入灾难性遗忘信号
      </label>
      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg aria-label="微调训练从状态和指标经过检查点进入发布或回退动作的流程图" className="h-auto min-w-[680px] w-full" role="img" viewBox="0 0 760 330">
          <defs>
            <marker id="bla-11-training-arrow" markerHeight="7" markerWidth="7" orient="auto-start-reverse" refX="6" refY="3.5" viewBox="0 0 7 7"><path d="M0,0 L7,3.5 L0,7 z" fill="var(--accent)" /></marker>
          </defs>
          <text fill="var(--muted)" fontSize="12" x="28" y="30">当前步骤：{current.label} · 旧能力：{forgetting ? "下降" : "稳定"}</text>
          {nodes.map((node, index) => (
            <g key={node.label}>
              <rect fill="var(--surface)" height="106" rx="12" stroke={forgetting && index >= 1 ? "var(--danger)" : "var(--border)"} strokeWidth="2" width="145" x={node.x} y="92" />
              <text fill="var(--accent)" fontSize="13" fontWeight="700" textAnchor="middle" x={node.x + 72} y="122">{node.label}</text>
              <text fill="var(--text)" fontSize="12" textAnchor="middle" x={node.x + 72} y="153">{node.value}</text>
              {index < nodes.length - 1 ? <line markerEnd="url(#bla-11-training-arrow)" stroke="var(--accent)" strokeWidth="2" x1={node.x + 145} x2={nodes[index + 1].x - 12} y1="145" y2="145" /> : null}
            </g>
          ))}
          <rect fill={forgetting ? "var(--danger-soft)" : "var(--surface)"} height="55" rx="10" stroke={forgetting ? "var(--danger)" : "var(--border)"} width="680" x="35" y="240" />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">{forgetting ? "观察：新任务分数上涨不能覆盖旧能力下降，恢复基线检查点并重新评估。" : "观察：训练信号、逐例评估、检查点哈希和发布动作必须互相连接。"}</text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">{forgetting ? "比较旧能力集合，降低学习率或回退检查点，并记录原因。" : `当前流程把“${current.signal}”写入“${current.artifact}”。`}</p>
    </section>
  );
}
