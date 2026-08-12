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

type EntryMode = "term" | "chapter" | "failure";

const entryModes: Record<EntryMode, { label: string; query: string; target: string; proof: string }> = {
  term: { label: "查术语", query: "术语别名", target: "定义与位置", proof: "示例" },
  chapter: { label: "查章节", query: "任务目标", target: "章节路径", proof: "练习" },
  failure: { label: "查故障", query: "错误症状", target: "首个分叉", proof: "回归测例" },
};

export function BlaIndexEntryLab() {
  const [mode, setMode] = useState<EntryMode>("term");
  const [missingLink, setMissingLink] = useState(false);
  const current = entryModes[mode];
  const nodes = [
    { x: 35, label: "查询", value: current.query },
    { x: 215, label: "索引项", value: missingLink ? "无映射" : current.target },
    { x: 395, label: "证据", value: missingLink ? "找不到" : current.proof },
    { x: 575, label: "下一步", value: missingLink ? "停查" : "可复核" },
  ];

  return (
    <section aria-label="索引项定位实验" className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5" data-visual-kind="bla-index-entry-map">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Entry map</p>
          <h3 className="mt-1 text-lg font-semibold">一个索引项要把查询带到证据</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">切换术语、章节或故障查询，再删除映射，观察索引如何从“找到文字”升级为“找到定义、练习和验证依据”。</p>
        </div>
        <ResetButton onClick={() => { setMode("term"); setMissingLink(false); }} />
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(entryModes) as EntryMode[]).map((id) => (
          <ModeButton active={mode === id} key={id} onClick={() => setMode(id)}>{entryModes[id].label}</ModeButton>
        ))}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input checked={missingLink} className="size-4 accent-[var(--accent)]" onChange={(event) => setMissingLink(event.target.checked)} type="checkbox" />
        删除索引映射
      </label>
      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg aria-label="查询经过索引项和证据进入可复核下一步的流程图" className="h-auto min-w-[680px] w-full" role="img" viewBox="0 0 760 330">
          <defs><marker id="bla-index-entry-arrow" markerHeight="7" markerWidth="7" orient="auto-start-reverse" refX="6" refY="3.5" viewBox="0 0 7 7"><path d="M0,0 L7,3.5 L0,7 z" fill="var(--accent)" /></marker></defs>
          <text fill="var(--muted)" fontSize="12" x="28" y="30">当前查询：{current.label} · 映射：{missingLink ? "缺失" : "存在"}</text>
          {nodes.map((node, index) => (
            <g key={`${node.label}-${node.x}`}>
              <rect fill="var(--surface)" height="106" rx="12" stroke={missingLink && index >= 1 ? "var(--danger)" : "var(--border)"} strokeWidth="2" width="145" x={node.x} y="92" />
              <text fill="var(--accent)" fontSize="13" fontWeight="700" textAnchor="middle" x={node.x + 72} y="122">{node.label}</text>
              <text fill="var(--text)" fontSize="12" textAnchor="middle" x={node.x + 72} y="153">{node.value}</text>
              {index < nodes.length - 1 ? <line markerEnd="url(#bla-index-entry-arrow)" stroke="var(--accent)" strokeWidth="2" x1={node.x + 145} x2={nodes[index + 1].x - 12} y1="145" y2="145" /> : null}
            </g>
          ))}
          <rect fill={missingLink ? "var(--danger-soft)" : "var(--surface)"} height="55" rx="10" stroke={missingLink ? "var(--danger)" : "var(--border)"} width="680" x="35" y="240" />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">{missingLink ? "观察：只有查询词没有路径、样例和测试，读者仍需重新搜索整本书。" : "观察：查询、索引项、证据和下一步形成可复查入口。"}</text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">{missingLink ? "补回章节路径、示例和验证日期，让索引结果可以被别人重走。" : `当前查询用“${current.target}”指向“${current.proof}”。`}</p>
    </section>
  );
}

type ReverseMode = "answer" | "tool" | "state";

const reverseModes: Record<ReverseMode, { label: string; symptom: string; branch: string; owner: string }> = {
  answer: { label: "答案无据", symptom: "没有引用", branch: "检索证据", owner: "检索章节" },
  tool: { label: "工具越权", symptom: "参数越界", branch: "权限校验", owner: "工具章节" },
  state: { label: "状态串扰", symptom: "会话混线", branch: "状态边界", owner: "对话章节" },
};

export function BlaIndexReverseLab() {
  const [mode, setMode] = useState<ReverseMode>("answer");
  const [missingOwner, setMissingOwner] = useState(false);
  const current = reverseModes[mode];
  const stages = [
    { x: 70, label: "症状", value: current.symptom },
    { x: 235, label: "首分叉", value: current.branch },
    { x: 400, label: "负责处", value: missingOwner ? "未知" : current.owner },
    { x: 565, label: "复核", value: missingOwner ? "盲查" : "重放" },
  ];

  return (
    <section aria-label="故障反向索引实验" className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5" data-visual-kind="bla-index-reverse-trace">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Reverse trace</p>
          <h3 className="mt-1 text-lg font-semibold">从症状反查首个分叉</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">选择无引用、工具越权或状态串扰，再移除负责章节，观察反向索引如何缩小排查范围并连接到回归测试。</p>
        </div>
        <ResetButton onClick={() => { setMode("answer"); setMissingOwner(false); }} />
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(reverseModes) as ReverseMode[]).map((id) => (
          <ModeButton active={mode === id} key={id} onClick={() => setMode(id)}>{reverseModes[id].label}</ModeButton>
        ))}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input checked={missingOwner} className="size-4 accent-[var(--accent)]" onChange={(event) => setMissingOwner(event.target.checked)} type="checkbox" />
        移除负责章节
      </label>
      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg aria-label="故障症状经过首个分叉和负责章节进入回归复核的流程图" className="h-auto min-w-[680px] w-full" role="img" viewBox="0 0 760 330">
          <defs><marker id="bla-index-reverse-arrow" markerHeight="7" markerWidth="7" orient="auto-start-reverse" refX="6" refY="3.5" viewBox="0 0 7 7"><path d="M0,0 L7,3.5 L0,7 z" fill="var(--accent)" /></marker></defs>
          <text fill="var(--muted)" fontSize="12" x="28" y="30">当前故障：{current.label} · 负责人：{missingOwner ? "缺失" : "已定位"}</text>
          {stages.map((stage, index) => (
            <g key={`${stage.label}-${stage.x}`}>
              <rect fill={missingOwner && index >= 2 ? "var(--danger-soft)" : "var(--surface)"} height="106" rx="12" stroke={missingOwner && index >= 2 ? "var(--danger)" : "var(--border)"} strokeWidth="2" width="125" x={stage.x} y={92 - index * 8} />
              <text fill="var(--accent)" fontSize="13" fontWeight="700" textAnchor="middle" x={stage.x + 62} y={122 - index * 8}>{stage.label}</text>
              <text fill="var(--text)" fontSize="12" textAnchor="middle" x={stage.x + 62} y={153 - index * 8}>{stage.value}</text>
              {index < stages.length - 1 ? <line markerEnd="url(#bla-index-reverse-arrow)" stroke="var(--accent)" strokeWidth="2" x1={stage.x + 125} x2={stages[index + 1].x - 12} y1={145 - index * 8} y2={137 - index * 8} /> : null}
            </g>
          ))}
          <rect fill={missingOwner ? "var(--danger-soft)" : "var(--surface)"} height="55" rx="10" stroke={missingOwner ? "var(--danger)" : "var(--border)"} width="680" x="35" y="240" />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">{missingOwner ? "观察：症状没有负责人和复核入口，排查会退化成反复试错。" : "观察：症状、首分叉、负责处和重放路径形成反向索引。"}</text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">{missingOwner ? "补回负责人和回归测例，再决定是否关闭故障。" : `当前故障先查“${current.branch}”，再回到“${current.owner}”。`}</p>
    </section>
  );
}

type ValidationMode = "fresh" | "version" | "archive";

const validationModes: Record<ValidationMode, { label: string; record: string; check: string; action: string }> = {
  fresh: { label: "新鲜条目", record: "今天验证", check: "当前样例", action: "可引用" },
  version: { label: "版本变更", record: "依赖更新", check: "重跑差异", action: "复核" },
  archive: { label: "历史条目", record: "旧版本", check: "限制说明", action: "降级" },
};

export function BlaIndexValidationLab() {
  const [mode, setMode] = useState<ValidationMode>("fresh");
  const [staleDate, setStaleDate] = useState(false);
  const current = validationModes[mode];
  const points = [
    { x: 90, y: 112, label: "记录", value: current.record },
    { x: 270, y: 112, label: "版本", value: staleDate ? "过期" : "已记" },
    { x: 450, y: 112, label: "检查", value: staleDate ? "待重跑" : current.check },
    { x: 630, y: 112, label: "动作", value: staleDate ? "暂停" : current.action },
  ];

  return (
    <section aria-label="索引验证日期实验" className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5" data-visual-kind="bla-index-validation-timeline">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Validation timeline</p>
          <h3 className="mt-1 text-lg font-semibold">索引条目也有保质期</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">切换新鲜、版本变更或历史条目，再标记验证日期过期，观察索引如何决定引用、复核或降级。</p>
        </div>
        <ResetButton onClick={() => { setMode("fresh"); setStaleDate(false); }} />
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(validationModes) as ValidationMode[]).map((id) => (
          <ModeButton active={mode === id} key={id} onClick={() => setMode(id)}>{validationModes[id].label}</ModeButton>
        ))}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input checked={staleDate} className="size-4 accent-[var(--accent)]" onChange={(event) => setStaleDate(event.target.checked)} type="checkbox" />
        验证日期已过期
      </label>
      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg aria-label="索引记录经过版本和检查进入引用或降级动作的时间线" className="h-auto min-w-[680px] w-full" role="img" viewBox="0 0 760 330">
          <defs><marker id="bla-index-validation-arrow" markerHeight="7" markerWidth="7" orient="auto-start-reverse" refX="6" refY="3.5" viewBox="0 0 7 7"><path d="M0,0 L7,3.5 L0,7 z" fill="var(--accent)" /></marker></defs>
          <text fill="var(--muted)" fontSize="12" x="28" y="30">当前条目：{current.label} · 验证：{staleDate ? "过期" : "有效"}</text>
          {points.map((point, index) => (
            <g key={`${point.label}-${point.x}`}>
              <circle cx={point.x} cy={point.y} fill={staleDate && index >= 1 ? "var(--danger-soft)" : "var(--surface)"} r="49" stroke={staleDate && index >= 1 ? "var(--danger)" : "var(--border)"} strokeWidth="2" />
              <text fill="var(--accent)" fontSize="13" fontWeight="700" textAnchor="middle" x={point.x} y={point.y - 4}>{point.label}</text>
              <text fill="var(--text)" fontSize="12" textAnchor="middle" x={point.x} y={point.y + 19}>{point.value}</text>
              {index < points.length - 1 ? <line markerEnd="url(#bla-index-validation-arrow)" stroke="var(--accent)" strokeWidth="2" x1={point.x + 50} x2={points[index + 1].x - 52} y1={point.y} y2={point.y} /> : null}
            </g>
          ))}
          <rect fill={staleDate ? "var(--danger-soft)" : "var(--surface)"} height="55" rx="10" stroke={staleDate ? "var(--danger)" : "var(--border)"} width="680" x="35" y="240" />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">{staleDate ? "观察：没有新的验证日期，条目只能暂停引用或降级为历史背景。" : "观察：记录、版本、检查和动作让索引能随项目变化。"}</text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">{staleDate ? "先更新样例与验证日期，再恢复索引条目的引用状态。" : `当前条目用“${current.check}”决定“${current.action}”。`}</p>
    </section>
  );
}
