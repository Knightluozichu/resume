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

type RadarMode = "scan" | "compare" | "refresh";

const radarModes: Record<RadarMode, { label: string; signal: string; question: string; action: string }> = {
  scan: { label: "扫描趋势", signal: "新能力", question: "是否可复现？", action: "记录日期" },
  compare: { label: "比较方案", signal: "能力差异", question: "是否适合任务？", action: "做基线" },
  refresh: { label: "复查结论", signal: "版本变化", question: "是否仍成立？", action: "重跑测例" },
};

export function Bla13RadarLab() {
  const [mode, setMode] = useState<RadarMode>("scan");
  const [staleSource, setStaleSource] = useState(false);
  const current = radarModes[mode];
  const nodes = [
    { x: 35, label: "信号", value: current.signal },
    { x: 215, label: "问题", value: staleSource ? "来源过期" : current.question },
    { x: 395, label: "证据", value: staleSource ? "不可复核" : "日期与样例" },
    { x: 575, label: "动作", value: staleSource ? "暂停引用" : current.action },
  ];

  return (
    <section aria-label="趋势雷达实验" className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5" data-visual-kind="bla-13-trend-radar">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Trend radar</p>
          <h3 className="mt-1 text-lg font-semibold">趋势先过证据，再进入路线图</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">切换扫描、比较或复查，再标记来源过期，观察一个热门能力如何从新闻信号变成可验证的工程决定。</p>
        </div>
        <ResetButton onClick={() => { setMode("scan"); setStaleSource(false); }} />
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(radarModes) as RadarMode[]).map((id) => (
          <ModeButton active={mode === id} key={id} onClick={() => setMode(id)}>{radarModes[id].label}</ModeButton>
        ))}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input checked={staleSource} className="size-4 accent-[var(--accent)]" onChange={(event) => setStaleSource(event.target.checked)} type="checkbox" />
        使用过期来源
      </label>
      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg aria-label="趋势信号经过问题和证据进入工程动作的流程图" className="h-auto min-w-[680px] w-full" role="img" viewBox="0 0 760 330">
          <defs><marker id="bla-13-radar-arrow" markerHeight="7" markerWidth="7" orient="auto-start-reverse" refX="6" refY="3.5" viewBox="0 0 7 7"><path d="M0,0 L7,3.5 L0,7 z" fill="var(--accent)" /></marker></defs>
          <text fill="var(--muted)" fontSize="12" x="28" y="30">当前动作：{current.label} · 来源：{staleSource ? "过期" : "可核对"}</text>
          {nodes.map((node, index) => (
            <g key={`${node.label}-${node.x}`}>
              <rect fill="var(--surface)" height="106" rx="12" stroke={staleSource && index >= 1 ? "var(--danger)" : "var(--border)"} strokeWidth="2" width="145" x={node.x} y="92" />
              <text fill="var(--accent)" fontSize="13" fontWeight="700" textAnchor="middle" x={node.x + 72} y="122">{node.label}</text>
              <text fill="var(--text)" fontSize="12" textAnchor="middle" x={node.x + 72} y="153">{node.value}</text>
              {index < nodes.length - 1 ? <line markerEnd="url(#bla-13-radar-arrow)" stroke="var(--accent)" strokeWidth="2" x1={node.x + 145} x2={nodes[index + 1].x - 12} y1="145" y2="145" /> : null}
            </g>
          ))}
          <rect fill={staleSource ? "var(--danger-soft)" : "var(--surface)"} height="55" rx="10" stroke={staleSource ? "var(--danger)" : "var(--border)"} width="680" x="35" y="240" />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">{staleSource ? "观察：没有日期、版本和样例，趋势只能停留在传闻，不能进入发布决定。" : "观察：趋势结论应带日期、版本、样例和复查触发条件。"}</text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">{staleSource ? "先补齐来源和复现实验，再把趋势写进路线图。" : `当前路径用“${current.question}”决定“${current.action}”。`}</p>
    </section>
  );
}

type EvidenceMode = "model" | "agent" | "small";

const evidenceModes: Record<EvidenceMode, { label: string; claim: string; test: string; decision: string }> = {
  model: { label: "大模型", claim: "通用能力", test: "任务基线", decision: "可用范围" },
  agent: { label: "Agent", claim: "工具闭环", test: "轨迹检查", decision: "权限边界" },
  small: { label: "小模型", claim: "低成本", test: "资源预算", decision: "部署位置" },
};

export function Bla13EvidenceLab() {
  const [mode, setMode] = useState<EvidenceMode>("model");
  const [missingMetric, setMissingMetric] = useState(false);
  const current = evidenceModes[mode];
  const steps = [
    { x: 70, label: "主张", value: current.claim },
    { x: 235, label: "测例", value: current.test },
    { x: 400, label: "指标", value: missingMetric ? "缺失" : "成功率与成本" },
    { x: 565, label: "决定", value: missingMetric ? "不发布" : current.decision },
  ];

  return (
    <section aria-label="趋势证据阶梯实验" className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5" data-visual-kind="bla-13-evidence-ladder">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Evidence ladder</p>
          <h3 className="mt-1 text-lg font-semibold">能力主张必须落到指标</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">比较大模型、Agent 和小模型的不同主张，再移除指标，观察为什么“看起来很强”还不足以支持采用。</p>
        </div>
        <ResetButton onClick={() => { setMode("model"); setMissingMetric(false); }} />
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(evidenceModes) as EvidenceMode[]).map((id) => (
          <ModeButton active={mode === id} key={id} onClick={() => setMode(id)}>{evidenceModes[id].label}</ModeButton>
        ))}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input checked={missingMetric} className="size-4 accent-[var(--accent)]" onChange={(event) => setMissingMetric(event.target.checked)} type="checkbox" />
        移除关键指标
      </label>
      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg aria-label="能力主张经过测例和指标进入采用决定的阶梯图" className="h-auto min-w-[680px] w-full" role="img" viewBox="0 0 760 330">
          <defs><marker id="bla-13-evidence-arrow" markerHeight="7" markerWidth="7" orient="auto-start-reverse" refX="6" refY="3.5" viewBox="0 0 7 7"><path d="M0,0 L7,3.5 L0,7 z" fill="var(--accent)" /></marker></defs>
          <text fill="var(--muted)" fontSize="12" x="28" y="30">当前对象：{current.label} · 指标：{missingMetric ? "缺失" : "已记录"}</text>
          {steps.map((step, index) => (
            <g key={`${step.label}-${step.x}`}>
              <rect fill={missingMetric && index >= 2 ? "var(--danger-soft)" : "var(--surface)"} height="106" rx="12" stroke={missingMetric && index >= 2 ? "var(--danger)" : "var(--border)"} strokeWidth="2" width="125" x={step.x} y={92 - index * 8} />
              <text fill="var(--accent)" fontSize="13" fontWeight="700" textAnchor="middle" x={step.x + 62} y={122 - index * 8}>{step.label}</text>
              <text fill="var(--text)" fontSize="12" textAnchor="middle" x={step.x + 62} y={153 - index * 8}>{step.value}</text>
              {index < steps.length - 1 ? <line markerEnd="url(#bla-13-evidence-arrow)" stroke="var(--accent)" strokeWidth="2" x1={step.x + 125} x2={steps[index + 1].x - 12} y1={145 - index * 8} y2={137 - index * 8} /> : null}
            </g>
          ))}
          <rect fill={missingMetric ? "var(--danger-soft)" : "var(--surface)"} height="55" rx="10" stroke={missingMetric ? "var(--danger)" : "var(--border)"} width="680" x="35" y="240" />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">{missingMetric ? "观察：缺少任务指标和资源成本，无法判断能力是否值得采用。" : "观察：主张、测例、指标和边界共同构成可复核证据。"}</text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">{missingMetric ? "补回任务成功标准、成本和失败样例，避免用演示替代评测。" : `当前证据用“${current.test}”支撑“${current.decision}”。`}</p>
    </section>
  );
}

type AdoptionMode = "case" | "deploy" | "rollback";

const adoptionModes: Record<AdoptionMode, { label: string; input: string; gate: string; outcome: string }> = {
  case: { label: "看案例", input: "业务问题", gate: "价值假设", outcome: "小范围试点" },
  deploy: { label: "做部署", input: "已验证方案", gate: "权限与监控", outcome: "受控上线" },
  rollback: { label: "做回退", input: "异常信号", gate: "停止条件", outcome: "恢复旧版" },
};

export function Bla13AdoptionLab() {
  const [mode, setMode] = useState<AdoptionMode>("case");
  const [noExitPlan, setNoExitPlan] = useState(false);
  const current = adoptionModes[mode];
  const nodes = [
    { x: 35, label: "输入", value: current.input },
    { x: 215, label: "门槛", value: current.gate },
    { x: 395, label: "监控", value: noExitPlan ? "无回退" : "质量与成本" },
    { x: 575, label: "结果", value: noExitPlan ? "锁死" : current.outcome },
  ];

  return (
    <section aria-label="企业采用与回退实验" className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5" data-visual-kind="bla-13-adoption-loop">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Adoption loop</p>
          <h3 className="mt-1 text-lg font-semibold">采用案例也要有退出路线</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">切换案例、部署或回退，再移除退出方案，观察企业采用如何从价值叙事变成带监控和责任人的闭环。</p>
        </div>
        <ResetButton onClick={() => { setMode("case"); setNoExitPlan(false); }} />
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(adoptionModes) as AdoptionMode[]).map((id) => (
          <ModeButton active={mode === id} key={id} onClick={() => setMode(id)}>{adoptionModes[id].label}</ModeButton>
        ))}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input checked={noExitPlan} className="size-4 accent-[var(--accent)]" onChange={(event) => setNoExitPlan(event.target.checked)} type="checkbox" />
        删除退出方案
      </label>
      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg aria-label="企业案例从业务输入经过门槛和监控进入上线或回退的闭环图" className="h-auto min-w-[680px] w-full" role="img" viewBox="0 0 760 330">
          <defs><marker id="bla-13-adoption-arrow" markerHeight="7" markerWidth="7" orient="auto-start-reverse" refX="6" refY="3.5" viewBox="0 0 7 7"><path d="M0,0 L7,3.5 L0,7 z" fill="var(--accent)" /></marker></defs>
          <text fill="var(--muted)" fontSize="12" x="28" y="30">当前路径：{current.label} · 退出：{noExitPlan ? "缺失" : "已定义"}</text>
          {nodes.map((node, index) => (
            <g key={`${node.label}-${node.x}`}>
              <rect fill={noExitPlan && index >= 2 ? "var(--danger-soft)" : "var(--surface)"} height="106" rx="12" stroke={noExitPlan && index >= 2 ? "var(--danger)" : "var(--border)"} strokeWidth="2" width="145" x={node.x} y="92" />
              <text fill="var(--accent)" fontSize="13" fontWeight="700" textAnchor="middle" x={node.x + 72} y="122">{node.label}</text>
              <text fill="var(--text)" fontSize="12" textAnchor="middle" x={node.x + 72} y="153">{node.value}</text>
              {index < nodes.length - 1 ? <line markerEnd="url(#bla-13-adoption-arrow)" stroke="var(--accent)" strokeWidth="2" x1={node.x + 145} x2={nodes[index + 1].x - 12} y1="145" y2="145" /> : null}
            </g>
          ))}
          <path d="M647 198 C690 214, 690 260, 580 278" fill="none" markerEnd="url(#bla-13-adoption-arrow)" stroke={noExitPlan ? "var(--danger)" : "var(--accent)"} strokeDasharray="8 6" strokeWidth="2" />
          <rect fill={noExitPlan ? "var(--danger-soft)" : "var(--surface)"} height="55" rx="10" stroke={noExitPlan ? "var(--danger)" : "var(--border)"} width="680" x="35" y="240" />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">{noExitPlan ? "观察：没有停止条件和旧版路径，异常发生时无法安全收缩影响范围。" : "观察：价值、门槛、监控和回退让企业案例可以小步采用。"}</text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">{noExitPlan ? "先定义负责人、阈值和旧版恢复，再扩大用户与权限范围。" : `当前路径用“${current.gate}”守住“${current.outcome}”。`}</p>
    </section>
  );
}
