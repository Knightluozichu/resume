"use client";

import { useState } from "react";

const BUTTON_CLASS = "min-h-11 rounded-lg border border-border bg-background px-3 py-2 text-left text-sm transition hover:border-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]";
function ResetButton({ onClick }: { onClick: () => void }) { return <button className={BUTTON_CLASS} onClick={onClick} type="button">重置实验</button>; }
function ChoiceButton({ active, children, onClick }: { active: boolean; children: string; onClick: () => void }) { return <button aria-pressed={active} className={`${BUTTON_CLASS} ${active ? "border-[var(--accent)] bg-[var(--accent)] text-white" : ""}`} onClick={onClick} type="button">{children}</button>; }

type BaselineId = "knn" | "matrix" | "neural";
const baselines: Record<BaselineId, { label: string; input: string; evidence: string; output: string }> = {
  knn: { label: "K 近邻", input: "相似用户/物品", evidence: "邻居与距离", output: "相似候选" },
  matrix: { label: "矩阵分解", input: "交互矩阵", evidence: "潜在因子", output: "偏好排序" },
  neural: { label: "神经网络", input: "特征与序列", evidence: "模型分数", output: "预测候选" },
};

export function Bla07BaselineLab() {
  const [baseline, setBaseline] = useState<BaselineId>("knn");
  const [dataLeakage, setDataLeakage] = useState(false);
  const current = baselines[baseline];
  return <section aria-label="推荐基线实验" className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5" data-visual-kind="bla-07-baseline-comparison">
    <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">Baseline comparison</p><h3 className="mt-1 text-lg font-semibold">先建立不含 LLM 的可解释基线</h3><p className="mt-1 max-w-2xl text-sm text-muted">切换 K 近邻、矩阵分解或神经网络，再混入未来交互数据，观察为什么推荐评估必须先保护时间边界。</p></div><ResetButton onClick={() => { setBaseline("knn"); setDataLeakage(false); }} /></div>
    <div className="mt-4 grid gap-2 sm:grid-cols-3">{(Object.keys(baselines) as BaselineId[]).map((id) => <ChoiceButton active={baseline === id} key={id} onClick={() => setBaseline(id)}>{baselines[id].label}</ChoiceButton>)}</div>
    <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm"><input checked={dataLeakage} className="size-4 accent-[var(--accent)]" onChange={(event) => setDataLeakage(event.target.checked)} type="checkbox" />训练数据混入未来交互</label>
    <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2"><svg aria-label="推荐基线从输入经过证据形成候选的流程图" className="h-auto min-w-[680px] w-full" role="img" viewBox="0 0 760 330"><defs><marker id="bla-07-baseline-arrow" markerHeight="7" markerWidth="7" orient="auto-start-reverse" refX="6" refY="3.5" viewBox="0 0 7 7"><path d="M0,0 L7,3.5 L0,7 z" fill="var(--accent)" /></marker></defs><text fill="var(--muted)" fontSize="12" x="28" y="30">当前基线：{current.label} · 时间边界：{dataLeakage ? "污染" : "隔离"}</text>{[{ x: 35, label: "输入", value: current.input }, { x: 215, label: "方法", value: current.label }, { x: 395, label: "证据", value: dataLeakage ? "不可解释" : current.evidence }, { x: 575, label: "输出", value: dataLeakage ? "阻断" : current.output }].map((node, index, nodes) => <g key={node.label}><rect fill="var(--surface)" height="106" rx="12" stroke={dataLeakage && index >= 1 ? "var(--danger)" : "var(--border)"} strokeWidth="2" width="145" x={node.x} y="92" /><text fill="var(--accent)" fontSize="13" fontWeight="700" textAnchor="middle" x={node.x + 72} y="122">{node.label}</text><text fill="var(--text)" fontSize="12" textAnchor="middle" x={node.x + 72} y="153">{node.value}</text>{index < nodes.length - 1 ? <line markerEnd="url(#bla-07-baseline-arrow)" stroke="var(--accent)" strokeWidth="2" x1={node.x + 145} x2={nodes[index + 1].x - 12} y1="145" y2="145" /> : null}</g>)}<rect fill={dataLeakage ? "var(--danger-soft)" : "var(--surface)"} height="55" rx="10" stroke={dataLeakage ? "var(--danger)" : "var(--border)"} width="680" x="35" y="240" /><text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">{dataLeakage ? "观察：未来交互泄漏会虚高指标，先重建时间切分再比较。" : "观察：传统基线提供可解释对照，LLM 增强必须证明新增价值。"}</text></svg></div>
    <p aria-live="polite" className="mt-3 text-sm text-muted">{dataLeakage ? "先标记评估污染并停止发布；平均命中率不能修复错误的时间边界。" : `当前基线用“${current.evidence}”生成“${current.output}”。`}</p>
  </section>;
}

type ScenarioId = "qa" | "content" | "hybrid";
const scenarios: Record<ScenarioId, { label: string; input: string; evidence: string; result: string }> = {
  qa: { label: "冷启动问答", input: "用户问题", evidence: "解释与来源", result: "可核对推荐" },
  content: { label: "内容相似", input: "物品描述", evidence: "属性与向量", result: "可解释候选" },
  hybrid: { label: "混合路由", input: "用户与物品", evidence: "行为加内容", result: "覆盖更广" },
};

export function Bla07ColdStartLab() {
  const [scenario, setScenario] = useState<ScenarioId>("qa");
  const [noProfile, setNoProfile] = useState(false);
  const current = scenarios[scenario];
  return <section aria-label="推荐冷启动实验" className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5" data-visual-kind="bla-07-cold-start">
    <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">Cold-start scenario</p><h3 className="mt-1 text-lg font-semibold">没有历史行为时，推荐仍要可解释</h3><p className="mt-1 max-w-2xl text-sm text-muted">选择问答、内容相似或混合路由，再移除用户画像，观察冷启动路径如何依赖来源和明确的用户意图。</p></div><ResetButton onClick={() => { setScenario("qa"); setNoProfile(false); }} /></div>
    <div className="mt-4 grid gap-2 sm:grid-cols-3">{(Object.keys(scenarios) as ScenarioId[]).map((id) => <ChoiceButton active={scenario === id} key={id} onClick={() => setScenario(id)}>{scenarios[id].label}</ChoiceButton>)}</div>
    <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm"><input checked={noProfile} className="size-4 accent-[var(--accent)]" onChange={(event) => setNoProfile(event.target.checked)} type="checkbox" />没有用户画像或历史行为</label>
    <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2"><svg aria-label="冷启动推荐从意图经过证据形成候选的流程图" className="h-auto min-w-[680px] w-full" role="img" viewBox="0 0 760 330"><defs><marker id="bla-07-cold-arrow" markerHeight="7" markerWidth="7" orient="auto-start-reverse" refX="6" refY="3.5" viewBox="0 0 7 7"><path d="M0,0 L7,3.5 L0,7 z" fill="var(--accent)" /></marker></defs><text fill="var(--muted)" fontSize="12" x="28" y="30">当前场景：{current.label} · 画像：{noProfile ? "缺失" : "可用"}</text>{[{ x: 35, label: "输入", value: current.input }, { x: 215, label: "信号", value: noProfile ? "显式意图" : "历史与意图" }, { x: 395, label: "证据", value: current.evidence }, { x: 575, label: "结果", value: noProfile ? "需确认偏好" : current.result }].map((node, index, nodes) => <g key={node.label}><rect fill="var(--surface)" height="106" rx="12" stroke={noProfile && index >= 1 ? "var(--danger)" : "var(--border)"} strokeWidth="2" width="145" x={node.x} y="92" /><text fill="var(--accent)" fontSize="13" fontWeight="700" textAnchor="middle" x={node.x + 72} y="122">{node.label}</text><text fill="var(--text)" fontSize="12" textAnchor="middle" x={node.x + 72} y="153">{node.value}</text>{index < nodes.length - 1 ? <line markerEnd="url(#bla-07-cold-arrow)" stroke="var(--accent)" strokeWidth="2" x1={node.x + 145} x2={nodes[index + 1].x - 12} y1="145" y2="145" /> : null}</g>)}<rect fill={noProfile ? "var(--danger-soft)" : "var(--surface)"} height="55" rx="10" stroke={noProfile ? "var(--danger)" : "var(--border)"} width="680" x="35" y="240" /><text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">{noProfile ? "观察：缺少历史不是许可臆测，先询问意图或选择内容证据。" : "观察：冷启动策略应把内容、问题和明确偏好作为可解释信号。"}</text></svg></div>
    <p aria-live="polite" className="mt-3 text-sm text-muted">{noProfile ? "先向用户确认偏好或展示证据来源，不要用群体平均偏好冒充个人意图。" : `当前路径用“${current.evidence}”支持“${current.result}”。`}</p>
  </section>;
}

type StageId = "retrieve" | "rank" | "front";
const stages: Record<StageId, { label: string; input: string; guard: string; output: string }> = {
  retrieve: { label: "召回", input: "候选池", guard: "覆盖与权限", output: "可排序集合" },
  rank: { label: "排序与生成", input: "候选与上下文", guard: "偏差与引用", output: "推荐列表" },
  front: { label: "前端呈现", input: "列表与解释", guard: "反馈与隐私", output: "可行动界面" },
};

export function Bla07RankingLab() {
  const [stage, setStage] = useState<StageId>("retrieve");
  const [hallucination, setHallucination] = useState(false);
  const current = stages[stage];
  return <section aria-label="推荐排序与前端实验" className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5" data-visual-kind="bla-07-ranking-ui">
    <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">Ranking and UI</p><h3 className="mt-1 text-lg font-semibold">推荐列表要能解释，也要能回收反馈</h3><p className="mt-1 max-w-2xl text-sm text-muted">切换召回、排序生成或前端呈现，再触发无来源推荐，观察系统如何阻断幻觉并保留用户反馈。</p></div><ResetButton onClick={() => { setStage("retrieve"); setHallucination(false); }} /></div>
    <div className="mt-4 grid gap-2 sm:grid-cols-3">{(Object.keys(stages) as StageId[]).map((id) => <ChoiceButton active={stage === id} key={id} onClick={() => setStage(id)}>{stages[id].label}</ChoiceButton>)}</div>
    <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm"><input checked={hallucination} className="size-4 accent-[var(--accent)]" onChange={(event) => setHallucination(event.target.checked)} type="checkbox" />生成推荐缺少候选来源</label>
    <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2"><svg aria-label="推荐系统从候选经过排序和界面形成结果的流程图" className="h-auto min-w-[680px] w-full" role="img" viewBox="0 0 760 330"><defs><marker id="bla-07-ranking-arrow" markerHeight="7" markerWidth="7" orient="auto-start-reverse" refX="6" refY="3.5" viewBox="0 0 7 7"><path d="M0,0 L7,3.5 L0,7 z" fill="var(--accent)" /></marker></defs><text fill="var(--muted)" fontSize="12" x="28" y="30">当前阶段：{current.label} · 来源：{hallucination ? "缺失" : "完整"}</text>{[{ x: 35, label: "输入", value: current.input }, { x: 215, label: "门禁", value: current.guard }, { x: 395, label: "来源", value: hallucination ? "不支持" : "可定位" }, { x: 575, label: "输出", value: hallucination ? "降级/拒答" : current.output }].map((node, index, nodes) => <g key={node.label}><rect fill="var(--surface)" height="106" rx="12" stroke={hallucination && index >= 1 ? "var(--danger)" : "var(--border)"} strokeWidth="2" width="145" x={node.x} y="92" /><text fill="var(--accent)" fontSize="13" fontWeight="700" textAnchor="middle" x={node.x + 72} y="122">{node.label}</text><text fill="var(--text)" fontSize="12" textAnchor="middle" x={node.x + 72} y="153">{node.value}</text>{index < nodes.length - 1 ? <line markerEnd="url(#bla-07-ranking-arrow)" stroke="var(--accent)" strokeWidth="2" x1={node.x + 145} x2={nodes[index + 1].x - 12} y1="145" y2="145" /> : null}</g>)}<rect fill={hallucination ? "var(--danger-soft)" : "var(--surface)"} height="55" rx="10" stroke={hallucination ? "var(--danger)" : "var(--border)"} width="680" x="35" y="240" /><text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">{hallucination ? "观察：没有候选来源时不生成肯定推荐，返回缺证据并保留用户反馈入口。" : "观察：召回、排序和 UI 各有门禁，推荐理由必须能回到候选或内容证据。"}</text></svg></div>
    <p aria-live="polite" className="mt-3 text-sm text-muted">{hallucination ? "先说明缺少来源并降级；不要用模型的语言流畅度代替推荐依据。" : `当前阶段用“${current.guard}”保护“${current.input}”，输出“${current.output}”。`}</p>
  </section>;
}
