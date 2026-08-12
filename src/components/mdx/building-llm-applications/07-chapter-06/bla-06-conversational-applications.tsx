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

function ChoiceButton({ active, children, onClick }: { active: boolean; children: string; onClick: () => void }) {
  return (
    <button aria-pressed={active} className={`${BUTTON_CLASS} ${active ? "border-[var(--accent)] bg-[var(--accent)] text-white" : ""}`} onClick={onClick} type="button">
      {children}
    </button>
  );
}

type ConversationId = "stateless" | "summary" | "memory";
const conversations: Record<ConversationId, { label: string; state: string; evidence: string; result: string }> = {
  stateless: { label: "无状态", state: "当前输入", evidence: "请求与输出", result: "单轮回答" },
  summary: { label: "摘要记忆", state: "压缩历史", evidence: "摘要版本", result: "可控多轮" },
  memory: { label: "会话记忆", state: "历史与偏好", evidence: "所有者与过期", result: "连续体验" },
};

export function Bla06ConversationLab() {
  const [conversation, setConversation] = useState<ConversationId>("stateless");
  const [stateLeak, setStateLeak] = useState(false);
  const current = conversations[conversation];
  return (
    <section aria-label="会话状态实验" className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5" data-visual-kind="bla-06-conversation-state">
      <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">Conversation state</p><h3 className="mt-1 text-lg font-semibold">逐步增加记忆，先保护状态边界</h3><p className="mt-1 max-w-2xl text-sm text-muted">选择无状态、摘要或会话记忆，再触发跨用户状态，观察便利性与隔离责任如何同时变化。</p></div><ResetButton onClick={() => { setConversation("stateless"); setStateLeak(false); }} /></div>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">{(Object.keys(conversations) as ConversationId[]).map((id) => <ChoiceButton active={conversation === id} key={id} onClick={() => setConversation(id)}>{conversations[id].label}</ChoiceButton>)}</div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm"><input checked={stateLeak} className="size-4 accent-[var(--accent)]" onChange={(event) => setStateLeak(event.target.checked)} type="checkbox" />状态跨越会话或租户</label>
      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2"><svg aria-label="会话从输入经过状态和证据形成回答的流程图" className="h-auto min-w-[680px] w-full" role="img" viewBox="0 0 760 330"><defs><marker id="bla-06-conversation-arrow" markerHeight="7" markerWidth="7" orient="auto-start-reverse" refX="6" refY="3.5" viewBox="0 0 7 7"><path d="M0,0 L7,3.5 L0,7 z" fill="var(--accent)" /></marker></defs><text fill="var(--muted)" fontSize="12" x="28" y="30">当前模式：{current.label} · 边界：{stateLeak ? "越界" : "隔离"}</text>{[{ x: 35, label: "输入", value: "用户消息" }, { x: 215, label: "状态", value: current.state }, { x: 395, label: "证据", value: stateLeak ? "影响范围" : current.evidence }, { x: 575, label: "输出", value: stateLeak ? "阻断请求" : current.result }].map((node, index, nodes) => <g key={node.label}><rect fill="var(--surface)" height="106" rx="12" stroke={stateLeak && index >= 1 ? "var(--danger)" : "var(--border)"} strokeWidth="2" width="145" x={node.x} y="92" /><text fill="var(--accent)" fontSize="13" fontWeight="700" textAnchor="middle" x={node.x + 72} y="122">{node.label}</text><text fill="var(--text)" fontSize="12" textAnchor="middle" x={node.x + 72} y="153">{node.value}</text>{index < nodes.length - 1 ? <line markerEnd="url(#bla-06-conversation-arrow)" stroke="var(--accent)" strokeWidth="2" x1={node.x + 145} x2={nodes[index + 1].x - 12} y1="145" y2="145" /> : null}</g>)}<rect fill={stateLeak ? "var(--danger-soft)" : "var(--surface)"} height="55" rx="10" stroke={stateLeak ? "var(--danger)" : "var(--border)"} width="680" x="35" y="240" /><text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">{stateLeak ? "观察：跨界状态会泄露历史或偏好，先停止并清理共享上下文。" : "观察：记忆的价值来自连续体验，安全性来自所有者、过期和删除证据。"}</text></svg></div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">{stateLeak ? "先隔离会话、撤销共享状态并记录影响范围，再恢复流量。" : `当前模式保存“${current.state}”，用“${current.evidence}”支持“${current.result}”。`}</p>
    </section>
  );
}

type KnowledgeId = "sources" | "summary" | "empty";
const knowledgeModes: Record<KnowledgeId, { label: string; input: string; evidence: string; output: string }> = {
  sources: { label: "来源检索", input: "文档与查询", evidence: "片段与版本", output: "带引用回答" },
  summary: { label: "文档摘要", input: "长文档", evidence: "摘要与来源", output: "受限总结" },
  empty: { label: "空结果", input: "无匹配内容", evidence: "缺少来源", output: "补证据或拒答" },
};

export function Bla06KnowledgeLab() {
  const [knowledge, setKnowledge] = useState<KnowledgeId>("sources");
  const [citationMissing, setCitationMissing] = useState(false);
  const current = knowledgeModes[knowledge];
  return (
    <section aria-label="会话外部知识实验" className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5" data-visual-kind="bla-06-knowledge-evidence">
      <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">External knowledge</p><h3 className="mt-1 text-lg font-semibold">没有来源时，不要让模型补写事实</h3><p className="mt-1 max-w-2xl text-sm text-muted">选择来源检索、文档摘要或空结果，再移除引用证据，观察答案应如何降级。</p></div><ResetButton onClick={() => { setKnowledge("sources"); setCitationMissing(false); }} /></div>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">{(Object.keys(knowledgeModes) as KnowledgeId[]).map((id) => <ChoiceButton active={knowledge === id} key={id} onClick={() => setKnowledge(id)}>{knowledgeModes[id].label}</ChoiceButton>)}</div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm"><input checked={citationMissing} className="size-4 accent-[var(--accent)]" onChange={(event) => setCitationMissing(event.target.checked)} type="checkbox" />移除来源或使用过期片段</label>
      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2"><svg aria-label="外部知识经过来源和校验形成会话输出的流程图" className="h-auto min-w-[680px] w-full" role="img" viewBox="0 0 760 330"><defs><marker id="bla-06-knowledge-arrow" markerHeight="7" markerWidth="7" orient="auto-start-reverse" refX="6" refY="3.5" viewBox="0 0 7 7"><path d="M0,0 L7,3.5 L0,7 z" fill="var(--accent)" /></marker></defs><text fill="var(--muted)" fontSize="12" x="28" y="30">当前知识：{current.label} · 引用：{citationMissing ? "缺失" : "完整"}</text>{[{ x: 35, label: "输入", value: current.input }, { x: 215, label: "来源", value: citationMissing ? "过期/空" : current.evidence }, { x: 395, label: "校验", value: citationMissing ? "不通过" : "权限与有效期" }, { x: 575, label: "输出", value: citationMissing ? "needs-evidence" : current.output }].map((node, index, nodes) => <g key={node.label}><rect fill="var(--surface)" height="106" rx="12" stroke={citationMissing && index >= 1 ? "var(--danger)" : "var(--border)"} strokeWidth="2" width="145" x={node.x} y="92" /><text fill="var(--accent)" fontSize="13" fontWeight="700" textAnchor="middle" x={node.x + 72} y="122">{node.label}</text><text fill="var(--text)" fontSize="12" textAnchor="middle" x={node.x + 72} y="153">{node.value}</text>{index < nodes.length - 1 ? <line markerEnd="url(#bla-06-knowledge-arrow)" stroke="var(--accent)" strokeWidth="2" x1={node.x + 145} x2={nodes[index + 1].x - 12} y1="145" y2="145" /> : null}</g>)}<rect fill={citationMissing ? "var(--danger-soft)" : "var(--surface)"} height="55" rx="10" stroke={citationMissing ? "var(--danger)" : "var(--border)"} width="680" x="35" y="240" /><text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">{citationMissing ? "观察：来源不足时返回补证据状态，不能把参数记忆伪装成当前事实。" : "观察：外部知识只有经过来源、权限和有效期检查，才适合支撑回答。"}</text></svg></div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">{citationMissing ? "先显示证据缺口并请求补充或转人工；不要用流畅文本掩盖过期来源。" : `当前路径保留“${current.evidence}”，形成“${current.output}”。`}</p>
    </section>
  );
}

type ToolId = "compute" | "query" | "write";
const tools: Record<ToolId, { label: string; request: string; guard: string; result: string }> = {
  compute: { label: "计算工具", request: "表达式", guard: "沙箱与超时", result: "可复核数值" },
  query: { label: "查询工具", request: "只读查询", guard: "权限与脱敏", result: "带回执数据" },
  write: { label: "写入工具", request: "外部动作", guard: "人工确认与幂等", result: "可追踪变更" },
};

export function Bla06ToolLab() {
  const [tool, setTool] = useState<ToolId>("compute");
  const [toolFailure, setToolFailure] = useState(false);
  const current = tools[tool];
  return (
    <section aria-label="会话工具与前端状态实验" className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5" data-visual-kind="bla-06-tool-ui">
      <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">Tools and UI</p><h3 className="mt-1 text-lg font-semibold">工具失败要在界面上可解释</h3><p className="mt-1 max-w-2xl text-sm text-muted">选择计算、查询或写入工具，再触发失败或拒权，观察前端如何显示状态、取消和安全回退。</p></div><ResetButton onClick={() => { setTool("compute"); setToolFailure(false); }} /></div>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">{(Object.keys(tools) as ToolId[]).map((id) => <ChoiceButton active={tool === id} key={id} onClick={() => setTool(id)}>{tools[id].label}</ChoiceButton>)}</div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm"><input checked={toolFailure} className="size-4 accent-[var(--accent)]" onChange={(event) => setToolFailure(event.target.checked)} type="checkbox" />工具超时、拒权或回执缺失</label>
      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2"><svg aria-label="工具请求经过权限和回执形成前端状态的流程图" className="h-auto min-w-[680px] w-full" role="img" viewBox="0 0 760 330"><defs><marker id="bla-06-tool-arrow" markerHeight="7" markerWidth="7" orient="auto-start-reverse" refX="6" refY="3.5" viewBox="0 0 7 7"><path d="M0,0 L7,3.5 L0,7 z" fill="var(--accent)" /></marker></defs><text fill="var(--muted)" fontSize="12" x="28" y="30">当前工具：{current.label} · 回执：{toolFailure ? "失败" : "完整"}</text>{[{ x: 35, label: "请求", value: current.request }, { x: 215, label: "门禁", value: current.guard }, { x: 395, label: "回执", value: toolFailure ? "错误/超时" : "已确认" }, { x: 575, label: "界面", value: toolFailure ? "可重试/升级" : current.result }].map((node, index, nodes) => <g key={node.label}><rect fill="var(--surface)" height="106" rx="12" stroke={toolFailure && index >= 1 ? "var(--danger)" : "var(--border)"} strokeWidth="2" width="145" x={node.x} y="92" /><text fill="var(--accent)" fontSize="13" fontWeight="700" textAnchor="middle" x={node.x + 72} y="122">{node.label}</text><text fill="var(--text)" fontSize="12" textAnchor="middle" x={node.x + 72} y="153">{node.value}</text>{index < nodes.length - 1 ? <line markerEnd="url(#bla-06-tool-arrow)" stroke="var(--accent)" strokeWidth="2" x1={node.x + 145} x2={nodes[index + 1].x - 12} y1="145" y2="145" /> : null}</g>)}<rect fill={toolFailure ? "var(--danger-soft)" : "var(--surface)"} height="55" rx="10" stroke={toolFailure ? "var(--danger)" : "var(--border)"} width="680" x="35" y="240" /><text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">{toolFailure ? "观察：回执失败时停止或降级，前端展示可重试状态，模型不能补造成功结果。" : "观察：工具合同和 UI 状态让外部动作拥有权限、回执、取消和恢复路径。"}</text></svg></div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">{toolFailure ? "先记录请求、授权、错误和是否可重试，再给用户明确动作；不要把空白页面当成安全处理。" : `当前工具用“${current.guard}”保护“${current.request}”，输出“${current.result}”。`}</p>
    </section>
  );
}
