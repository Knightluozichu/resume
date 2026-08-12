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
    <button aria-pressed={active} className={`${BUTTON_CLASS} ${active ? "border-[var(--accent)] bg-[var(--accent)] text-white" : ""}`} onClick={onClick} type="button">
      {children}
    </button>
  );
}

type RiskMode = "map" | "test" | "incident";

const riskModes: Record<RiskMode, { label: string; input: string; risk: string; evidence: string; action: string }> = {
  map: { label: "画风险图", input: "场景与人群", risk: "风险等级", evidence: "控制点", action: "建测试" },
  test: { label: "跑安全测例", input: "正常与越狱", risk: "偏差信号", evidence: "逐例记录", action: "阻断或放行" },
  incident: { label: "处理事件", input: "线上报告", risk: "影响范围", evidence: "时间线", action: "回退与通知" },
};

export function Bla12RiskLab() {
  const [mode, setMode] = useState<RiskMode>("map");
  const [uncovered, setUncovered] = useState(false);
  const current = riskModes[mode];
  const nodes = [
    { x: 35, label: "输入", value: current.input },
    { x: 215, label: "风险", value: uncovered ? "未覆盖" : current.risk },
    { x: 395, label: "证据", value: uncovered ? "缺口" : current.evidence },
    { x: 575, label: "动作", value: uncovered ? "暂停" : current.action },
  ];

  return (
    <section aria-label="责任 AI 风险实验" className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5" data-visual-kind="bla-12-risk-register">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Risk register</p>
          <h3 className="mt-1 text-lg font-semibold">先画影响范围，再谈模型安全</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">选择画风险图、跑安全测例或处理事件，再取消一个覆盖点，观察责任 AI 如何把抽象原则变成证据和动作。</p>
        </div>
        <ResetButton onClick={() => { setMode("map"); setUncovered(false); }} />
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(riskModes) as RiskMode[]).map((id) => <ModeButton active={mode === id} key={id} onClick={() => setMode(id)}>{riskModes[id].label}</ModeButton>)}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm"><input checked={uncovered} className="size-4 accent-[var(--accent)]" onChange={(event) => setUncovered(event.target.checked)} type="checkbox" />不覆盖一个高影响人群</label>
      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg aria-label="责任 AI 从输入经过风险和证据进入控制动作的流程图" className="h-auto min-w-[680px] w-full" role="img" viewBox="0 0 760 330">
          <defs><marker id="bla-12-risk-arrow" markerHeight="7" markerWidth="7" orient="auto-start-reverse" refX="6" refY="3.5" viewBox="0 0 7 7"><path d="M0,0 L7,3.5 L0,7 z" fill="var(--accent)" /></marker></defs>
          <text fill="var(--muted)" fontSize="12" x="28" y="30">当前动作：{current.label} · 覆盖：{uncovered ? "有缺口" : "完整"}</text>
          {nodes.map((node, index) => <g key={node.label}><rect fill="var(--surface)" height="106" rx="12" stroke={uncovered && index >= 1 ? "var(--danger)" : "var(--border)"} strokeWidth="2" width="145" x={node.x} y="92" /><text fill="var(--accent)" fontSize="13" fontWeight="700" textAnchor="middle" x={node.x + 72} y="122">{node.label}</text><text fill="var(--text)" fontSize="12" textAnchor="middle" x={node.x + 72} y="153">{node.value}</text>{index < nodes.length - 1 ? <line markerEnd="url(#bla-12-risk-arrow)" stroke="var(--accent)" strokeWidth="2" x1={node.x + 145} x2={nodes[index + 1].x - 12} y1="145" y2="145" /> : null}</g>)}
          <rect fill={uncovered ? "var(--danger-soft)" : "var(--surface)"} height="55" rx="10" stroke={uncovered ? "var(--danger)" : "var(--border)"} width="680" x="35" y="240" />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">{uncovered ? "观察：没有覆盖高影响人群，指标不能代表整体安全，先暂停发布。" : "观察：场景、人群、风险、证据和动作形成可审计的责任链。"}</text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">{uncovered ? "补齐分群测例和人工复核，再解释整体通过。" : `当前路径用“${current.evidence}”支撑“${current.action}”。`}</p>
    </section>
  );
}

type LayerMode = "model" | "metaprompt" | "ui";

const layerModes: Record<LayerMode, { label: string; layer: string; control: string; failure: string; outcome: string }> = {
  model: { label: "模型层", layer: "权重与数据", control: "安全评测", failure: "偏见或有害", outcome: "校准或回训" },
  metaprompt: { label: "元提示层", layer: "任务与格式", control: "边界与注入", failure: "越狱分叉", outcome: "阻断或改写" },
  ui: { label: "界面层", layer: "输入与显示", control: "同意与复核", failure: "误导或泄露", outcome: "降级或人工" },
};

export function Bla12LayerLab() {
  const [mode, setMode] = useState<LayerMode>("model");
  const [bypass, setBypass] = useState(false);
  const current = layerModes[mode];
  const nodes = [
    { x: 35, label: "层", value: current.layer },
    { x: 215, label: "控制", value: bypass ? "跳过" : current.control },
    { x: 395, label: "失败", value: current.failure },
    { x: 575, label: "动作", value: bypass ? "不可审计" : current.outcome },
  ];

  return (
    <section aria-label="责任 AI 三层控制实验" className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5" data-visual-kind="bla-12-layer-controls">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Layer controls</p>
          <h3 className="mt-1 text-lg font-semibold">三层控制不能互相代替</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">切换模型、元提示或界面层，再跳过控制点，观察为什么一句安全提示不能替代输入校验和人工复核。</p>
        </div>
        <ResetButton onClick={() => { setMode("model"); setBypass(false); }} />
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(layerModes) as LayerMode[]).map((id) => <ModeButton active={mode === id} key={id} onClick={() => setMode(id)}>{layerModes[id].label}</ModeButton>)}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm"><input checked={bypass} className="size-4 accent-[var(--accent)]" onChange={(event) => setBypass(event.target.checked)} type="checkbox" />跳过本层的安全控制</label>
      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg aria-label="责任 AI 从控制层经过失败信号进入动作的流程图" className="h-auto min-w-[680px] w-full" role="img" viewBox="0 0 760 330">
          <defs><marker id="bla-12-layer-arrow" markerHeight="7" markerWidth="7" orient="auto-start-reverse" refX="6" refY="3.5" viewBox="0 0 7 7"><path d="M0,0 L7,3.5 L0,7 z" fill="var(--accent)" /></marker></defs>
          <text fill="var(--muted)" fontSize="12" x="28" y="30">当前层：{current.label} · 控制：{bypass ? "跳过" : "启用"}</text>
          {nodes.map((node, index) => <g key={node.label}><rect fill="var(--surface)" height="106" rx="12" stroke={bypass && index >= 1 ? "var(--danger)" : "var(--border)"} strokeWidth="2" width="145" x={node.x} y="92" /><text fill="var(--accent)" fontSize="13" fontWeight="700" textAnchor="middle" x={node.x + 72} y="122">{node.label}</text><text fill="var(--text)" fontSize="12" textAnchor="middle" x={node.x + 72} y="153">{node.value}</text>{index < nodes.length - 1 ? <line markerEnd="url(#bla-12-layer-arrow)" stroke="var(--accent)" strokeWidth="2" x1={node.x + 145} x2={nodes[index + 1].x - 12} y1="145" y2="145" /> : null}</g>)}
          <rect fill={bypass ? "var(--danger-soft)" : "var(--surface)"} height="55" rx="10" stroke={bypass ? "var(--danger)" : "var(--border)"} width="680" x="35" y="240" />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">{bypass ? "观察：控制被跳过，模型输出、提示约束和用户体验都失去证据连接。" : "观察：模型、元提示和界面分别承担不同的阻断与解释责任。"}</text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">{bypass ? "恢复本层控制并记录失败原因，不让其他层的分数掩盖缺口。" : `当前层用“${current.control}”应对“${current.failure}”。`}</p>
    </section>
  );
}

type ReviewMode = "harm" | "privacy" | "fairness";

const reviewModes: Record<ReviewMode, { label: string; sample: string; metric: string; reviewer: string; decision: string }> = {
  harm: { label: "有害性", sample: "危险请求", metric: "拦截率与误伤", reviewer: "安全复核", decision: "阻断" },
  privacy: { label: "隐私", sample: "敏感信息", metric: "泄露与最小化", reviewer: "数据复核", decision: "脱敏" },
  fairness: { label: "公平性", sample: "分群样本", metric: "群体差异", reviewer: "人工抽查", decision: "校准" },
};

export function Bla12ReviewLab() {
  const [mode, setMode] = useState<ReviewMode>("harm");
  const [noHuman, setNoHuman] = useState(false);
  const current = reviewModes[mode];
  const nodes = [
    { x: 35, label: "样例", value: current.sample },
    { x: 215, label: "指标", value: current.metric },
    { x: 395, label: "复核", value: noHuman ? "无人" : current.reviewer },
    { x: 575, label: "决定", value: noHuman ? "不确定" : current.decision },
  ];

  return (
    <section aria-label="责任 AI 评测复核实验" className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5" data-visual-kind="bla-12-review-ledger">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Review ledger</p>
          <h3 className="mt-1 text-lg font-semibold">平均分之后还要看谁被影响</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">选择有害性、隐私或公平性，再取消人工复核，观察指标、分群和发布动作如何失去解释力。</p>
        </div>
        <ResetButton onClick={() => { setMode("harm"); setNoHuman(false); }} />
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(reviewModes) as ReviewMode[]).map((id) => <ModeButton active={mode === id} key={id} onClick={() => setMode(id)}>{reviewModes[id].label}</ModeButton>)}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm"><input checked={noHuman} className="size-4 accent-[var(--accent)]" onChange={(event) => setNoHuman(event.target.checked)} type="checkbox" />移除人工抽查</label>
      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg aria-label="责任 AI 从分群样例经过指标和人工复核进入决定的流程图" className="h-auto min-w-[680px] w-full" role="img" viewBox="0 0 760 330">
          <defs><marker id="bla-12-review-arrow" markerHeight="7" markerWidth="7" orient="auto-start-reverse" refX="6" refY="3.5" viewBox="0 0 7 7"><path d="M0,0 L7,3.5 L0,7 z" fill="var(--accent)" /></marker></defs>
          <text fill="var(--muted)" fontSize="12" x="28" y="30">当前评测：{current.label} · 人工：{noHuman ? "移除" : "保留"}</text>
          {nodes.map((node, index) => <g key={node.label}><rect fill="var(--surface)" height="106" rx="12" stroke={noHuman && index >= 2 ? "var(--danger)" : "var(--border)"} strokeWidth="2" width="145" x={node.x} y="92" /><text fill="var(--accent)" fontSize="13" fontWeight="700" textAnchor="middle" x={node.x + 72} y="122">{node.label}</text><text fill="var(--text)" fontSize="12" textAnchor="middle" x={node.x + 72} y="153">{node.value}</text>{index < nodes.length - 1 ? <line markerEnd="url(#bla-12-review-arrow)" stroke="var(--accent)" strokeWidth="2" x1={node.x + 145} x2={nodes[index + 1].x - 12} y1="145" y2="145" /> : null}</g>)}
          <rect fill={noHuman ? "var(--danger-soft)" : "var(--surface)"} height="55" rx="10" stroke={noHuman ? "var(--danger)" : "var(--border)"} width="680" x="35" y="240" />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">{noHuman ? "观察：没有人工抽查，指标异常不能被解释或升级，先暂停发布。" : "观察：指标、分群、复核和决定共同形成责任 AI 的发布账。"}</text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">{noHuman ? "恢复人工抽查并保留样例、理由和升级动作，避免平均分盖住尾部风险。" : `当前评测用“${current.metric}”支持“${current.decision}”。`}</p>
    </section>
  );
}
