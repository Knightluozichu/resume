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

function ModeButton({ active, children, onClick }: { active: boolean; children: string; onClick: () => void }) {
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

type PipelineMode = "baseline" | "retrieval" | "agent";

const pipelineModes: Record<PipelineMode, { label: string; input: string; middle: string; output: string }> = {
  baseline: { label: "最小基线", input: "任务与样例", middle: "模型调用", output: "结构结果" },
  retrieval: { label: "加检索", input: "任务与查询", middle: "证据拼接", output: "带引用回答" },
  agent: { label: "加工具", input: "任务与权限", middle: "动作轨迹", output: "受控结果" },
};

export function BlaFinalReviewPipelineLab() {
  const [mode, setMode] = useState<PipelineMode>("baseline");
  const [missingGate, setMissingGate] = useState(false);
  const current = pipelineModes[mode];
  const nodes = [
    { x: 35, label: "输入", value: current.input },
    { x: 215, label: "处理", value: current.middle },
    { x: 395, label: "检查", value: missingGate ? "跳过" : "结构与来源" },
    { x: 575, label: "输出", value: missingGate ? "不可签字" : current.output },
  ];

  return (
    <section aria-label="最小应用流水线实验" className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5" data-visual-kind="bla-final-review-pipeline">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Pipeline review</p>
          <h3 className="mt-1 text-lg font-semibold">复习先重建最小调用链</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">切换最小基线、检索或工具路径，再跳过检查，观察能力增加时证据和权限如何一起增加。</p>
        </div>
        <ResetButton onClick={() => { setMode("baseline"); setMissingGate(false); }} />
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(pipelineModes) as PipelineMode[]).map((id) => (
          <ModeButton active={mode === id} key={id} onClick={() => setMode(id)}>{pipelineModes[id].label}</ModeButton>
        ))}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input checked={missingGate} className="size-4 accent-[var(--accent)]" onChange={(event) => setMissingGate(event.target.checked)} type="checkbox" />
        跳过输出检查
      </label>
      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg aria-label="应用从输入经过处理和检查进入受控输出的流程图" className="h-auto min-w-[680px] w-full" role="img" viewBox="0 0 760 330">
          <defs><marker id="bla-final-review-pipeline-arrow" markerHeight="7" markerWidth="7" orient="auto-start-reverse" refX="6" refY="3.5" viewBox="0 0 7 7"><path d="M0,0 L7,3.5 L0,7 z" fill="var(--accent)" /></marker></defs>
          <text fill="var(--muted)" fontSize="12" x="28" y="30">当前路径：{current.label} · 检查：{missingGate ? "跳过" : "保留"}</text>
          {nodes.map((node, index) => (
            <g key={`${node.label}-${node.x}`}>
              <rect fill="var(--surface)" height="106" rx="12" stroke={missingGate && index >= 2 ? "var(--danger)" : "var(--border)"} strokeWidth="2" width="145" x={node.x} y="92" />
              <text fill="var(--accent)" fontSize="13" fontWeight="700" textAnchor="middle" x={node.x + 72} y="122">{node.label}</text>
              <text fill="var(--text)" fontSize="12" textAnchor="middle" x={node.x + 72} y="153">{node.value}</text>
              {index < nodes.length - 1 ? <line markerEnd="url(#bla-final-review-pipeline-arrow)" stroke="var(--accent)" strokeWidth="2" x1={node.x + 145} x2={nodes[index + 1].x - 12} y1="145" y2="145" /> : null}
            </g>
          ))}
          <rect fill={missingGate ? "var(--danger-soft)" : "var(--surface)"} height="55" rx="10" stroke={missingGate ? "var(--danger)" : "var(--border)"} width="680" x="35" y="240" />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">{missingGate ? "观察：没有结构、来源和权限检查，最终答案不能代表应用已经可发布。" : "观察：输入、处理、检查和输出共同构成可审计的最小应用。"}</text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">{missingGate ? "恢复检查并保存逐样本结果，再扩大能力边界。" : `当前路径用“${current.middle}”产出“${current.output}”。`}</p>
    </section>
  );
}

type FailureMode = "prompt" | "evidence" | "permission";

const failureModes: Record<FailureMode, { label: string; symptom: string; branch: string; repair: string }> = {
  prompt: { label: "提示偏离", symptom: "格式漂移", branch: "提示边界", repair: "模板回归" },
  evidence: { label: "证据缺失", symptom: "无引用", branch: "检索链路", repair: "引用测例" },
  permission: { label: "权限越界", symptom: "动作过大", branch: "工具校验", repair: "权限回归" },
};

export function BlaFinalReviewFailureLab() {
  const [mode, setMode] = useState<FailureMode>("prompt");
  const [noReplay, setNoReplay] = useState(false);
  const current = failureModes[mode];
  const stages = [
    { x: 70, label: "症状", value: current.symptom },
    { x: 235, label: "首分叉", value: current.branch },
    { x: 400, label: "复现", value: noReplay ? "没有" : "最小任务" },
    { x: 565, label: "修复", value: noReplay ? "猜测" : current.repair },
  ];

  return (
    <section aria-label="故障回放实验" className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5" data-visual-kind="bla-final-review-failure-trace">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Failure trace</p>
          <h3 className="mt-1 text-lg font-semibold">复习要能从症状回到首个分叉</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">选择提示偏离、证据缺失或权限越界，再移除最小回放任务，观察为什么修复不能只凭最终答案猜测。</p>
        </div>
        <ResetButton onClick={() => { setMode("prompt"); setNoReplay(false); }} />
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(failureModes) as FailureMode[]).map((id) => (
          <ModeButton active={mode === id} key={id} onClick={() => setMode(id)}>{failureModes[id].label}</ModeButton>
        ))}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input checked={noReplay} className="size-4 accent-[var(--accent)]" onChange={(event) => setNoReplay(event.target.checked)} type="checkbox" />
        移除最小回放任务
      </label>
      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg aria-label="故障症状经过首个分叉和最小回放进入修复的流程图" className="h-auto min-w-[680px] w-full" role="img" viewBox="0 0 760 330">
          <defs><marker id="bla-final-review-failure-arrow" markerHeight="7" markerWidth="7" orient="auto-start-reverse" refX="6" refY="3.5" viewBox="0 0 7 7"><path d="M0,0 L7,3.5 L0,7 z" fill="var(--accent)" /></marker></defs>
          <text fill="var(--muted)" fontSize="12" x="28" y="30">当前故障：{current.label} · 回放：{noReplay ? "缺失" : "保留"}</text>
          {stages.map((stage, index) => (
            <g key={`${stage.label}-${stage.x}`}>
              <rect fill={noReplay && index >= 2 ? "var(--danger-soft)" : "var(--surface)"} height="106" rx="12" stroke={noReplay && index >= 2 ? "var(--danger)" : "var(--border)"} strokeWidth="2" width="125" x={stage.x} y={92 - index * 8} />
              <text fill="var(--accent)" fontSize="13" fontWeight="700" textAnchor="middle" x={stage.x + 62} y={122 - index * 8}>{stage.label}</text>
              <text fill="var(--text)" fontSize="12" textAnchor="middle" x={stage.x + 62} y={153 - index * 8}>{stage.value}</text>
              {index < stages.length - 1 ? <line markerEnd="url(#bla-final-review-failure-arrow)" stroke="var(--accent)" strokeWidth="2" x1={stage.x + 125} x2={stages[index + 1].x - 12} y1={145 - index * 8} y2={137 - index * 8} /> : null}
            </g>
          ))}
          <rect fill={noReplay ? "var(--danger-soft)" : "var(--surface)"} height="55" rx="10" stroke={noReplay ? "var(--danger)" : "var(--border)"} width="680" x="35" y="240" />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">{noReplay ? "观察：没有输入、配置和预期结果，修复无法区分提示、证据或权限的责任。" : "观察：症状、首分叉、回放和修复构成可复用的故障链。"}</text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">{noReplay ? "补回最小任务与预期结果，再确认修复是否真的关闭原故障。" : `当前故障先查“${current.branch}”，再运行“${current.repair}”。`}</p>
    </section>
  );
}

type ReleaseMode = "quality" | "safety" | "cost";

const releaseModes: Record<ReleaseMode, { label: string; focus: string; threshold: string; action: string }> = {
  quality: { label: "质量门", focus: "任务成功率", threshold: "尾部失败", action: "保留或回退" },
  safety: { label: "安全门", focus: "越权与隐私", threshold: "高影响缺口", action: "阻断" },
  cost: { label: "成本门", focus: "延迟与费用", threshold: "预算上限", action: "降级" },
};

export function BlaFinalReviewReleaseLab() {
  const [mode, setMode] = useState<ReleaseMode>("quality");
  const [removeGate, setRemoveGate] = useState(false);
  const current = releaseModes[mode];
  const gates = [
    { x: 48, label: "目标", value: current.focus },
    { x: 190, label: "样本", value: "冻结集" },
    { x: 332, label: "阈值", value: removeGate ? "缺失" : current.threshold },
    { x: 474, label: "责任", value: "负责人" },
    { x: 616, label: "动作", value: removeGate ? "不可签" : current.action },
  ];

  return (
    <section aria-label="五道发布门禁实验" className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5" data-visual-kind="bla-final-review-release-gates">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Release gates</p>
          <h3 className="mt-1 text-lg font-semibold">发布是证据链，不是平均分</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">选择质量、安全或成本门，再移除阈值，观察五道门如何把目标、样本、责任和动作连起来。</p>
        </div>
        <ResetButton onClick={() => { setMode("quality"); setRemoveGate(false); }} />
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(releaseModes) as ReleaseMode[]).map((id) => (
          <ModeButton active={mode === id} key={id} onClick={() => setMode(id)}>{releaseModes[id].label}</ModeButton>
        ))}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input checked={removeGate} className="size-4 accent-[var(--accent)]" onChange={(event) => setRemoveGate(event.target.checked)} type="checkbox" />
        移除一个发布阈值
      </label>
      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg aria-label="发布目标经过冻结样本、阈值和责任进入发布动作的门禁图" className="h-auto min-w-[680px] w-full" role="img" viewBox="0 0 760 330">
          <defs><marker id="bla-final-review-release-arrow" markerHeight="7" markerWidth="7" orient="auto-start-reverse" refX="6" refY="3.5" viewBox="0 0 7 7"><path d="M0,0 L7,3.5 L0,7 z" fill="var(--accent)" /></marker></defs>
          <text fill="var(--muted)" fontSize="12" x="28" y="30">当前门：{current.label} · 阈值：{removeGate ? "缺失" : "已定义"}</text>
          {gates.map((gate, index) => (
            <g key={`${gate.label}-${gate.x}`}>
              <rect fill={removeGate && index === 2 ? "var(--danger-soft)" : "var(--surface)"} height="106" rx="12" stroke={removeGate && index === 2 ? "var(--danger)" : "var(--border)"} strokeWidth="2" width="110" x={gate.x} y="92" />
              <text fill="var(--accent)" fontSize="13" fontWeight="700" textAnchor="middle" x={gate.x + 55} y="122">{gate.label}</text>
              <text fill="var(--text)" fontSize="12" textAnchor="middle" x={gate.x + 55} y="153">{gate.value}</text>
              {index < gates.length - 1 ? <line markerEnd="url(#bla-final-review-release-arrow)" stroke="var(--accent)" strokeWidth="2" x1={gate.x + 110} x2={gates[index + 1].x - 12} y1="145" y2="145" /> : null}
            </g>
          ))}
          <rect fill={removeGate ? "var(--danger-soft)" : "var(--surface)"} height="55" rx="10" stroke={removeGate ? "var(--danger)" : "var(--border)"} width="680" x="35" y="240" />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">{removeGate ? "观察：少一道门就少一种可解释的停留点，不能用平均分替代缺失阈值。" : "观察：目标、冻结样本、阈值、责任和动作共同支撑发布决定。"}</text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">{removeGate ? "补回阈值和责任人，再决定放行、降级或回退。" : `当前门关注“${current.threshold}”，动作是“${current.action}”。`}</p>
    </section>
  );
}
