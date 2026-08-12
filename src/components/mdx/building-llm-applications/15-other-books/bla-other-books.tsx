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

type GapMode = "concept" | "debug" | "architecture";

const gapModes: Record<GapMode, { label: string; input: string; artifact: string; next: string }> = {
  concept: { label: "补概念", input: "术语卡片", artifact: "一页解释", next: "手算例" },
  debug: { label: "补调试", input: "失败日志", artifact: "最小复现", next: "回归测例" },
  architecture: { label: "补架构", input: "调用图", artifact: "边界清单", next: "小型试点" },
};

export function BlaOtherBooksGapLab() {
  const [mode, setMode] = useState<GapMode>("concept");
  const [staleBook, setStaleBook] = useState(false);
  const current = gapModes[mode];
  const nodes = [
    { x: 35, label: "缺口", value: current.input },
    { x: 215, label: "资料", value: staleBook ? "版本不明" : "目标章节" },
    { x: 395, label: "产物", value: staleBook ? "不可复核" : current.artifact },
    { x: 575, label: "下一步", value: staleBook ? "暂停" : current.next },
  ];

  return (
    <section aria-label="知识缺口选择实验" className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5" data-visual-kind="bla-other-books-gap-map">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Gap map</p>
          <h3 className="mt-1 text-lg font-semibold">先找缺口，再选一本书</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">切换概念、调试或架构缺口，再标记资料版本不明，观察阅读选择如何连接到可验收的学习产物。</p>
        </div>
        <ResetButton onClick={() => { setMode("concept"); setStaleBook(false); }} />
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(gapModes) as GapMode[]).map((id) => (
          <ModeButton active={mode === id} key={id} onClick={() => setMode(id)}>{gapModes[id].label}</ModeButton>
        ))}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input checked={staleBook} className="size-4 accent-[var(--accent)]" onChange={(event) => setStaleBook(event.target.checked)} type="checkbox" />
        资料版本不明
      </label>
      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg aria-label="知识缺口经过资料和学习产物进入下一步实践的流程图" className="h-auto min-w-[680px] w-full" role="img" viewBox="0 0 760 330">
          <defs><marker id="bla-other-books-gap-arrow" markerHeight="7" markerWidth="7" orient="auto-start-reverse" refX="6" refY="3.5" viewBox="0 0 7 7"><path d="M0,0 L7,3.5 L0,7 z" fill="var(--accent)" /></marker></defs>
          <text fill="var(--muted)" fontSize="12" x="28" y="30">当前缺口：{current.label} · 资料：{staleBook ? "待核对" : "已标记"}</text>
          {nodes.map((node, index) => (
            <g key={`${node.label}-${node.x}`}>
              <rect fill="var(--surface)" height="106" rx="12" stroke={staleBook && index >= 1 ? "var(--danger)" : "var(--border)"} strokeWidth="2" width="145" x={node.x} y="92" />
              <text fill="var(--accent)" fontSize="13" fontWeight="700" textAnchor="middle" x={node.x + 72} y="122">{node.label}</text>
              <text fill="var(--text)" fontSize="12" textAnchor="middle" x={node.x + 72} y="153">{node.value}</text>
              {index < nodes.length - 1 ? <line markerEnd="url(#bla-other-books-gap-arrow)" stroke="var(--accent)" strokeWidth="2" x1={node.x + 145} x2={nodes[index + 1].x - 12} y1="145" y2="145" /> : null}
            </g>
          ))}
          <rect fill={staleBook ? "var(--danger-soft)" : "var(--surface)"} height="55" rx="10" stroke={staleBook ? "var(--danger)" : "var(--border)"} width="680" x="35" y="240" />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">{staleBook ? "观察：没有版本和发布日期，阅读结论不能进入复现计划。" : "观察：缺口、资料、产物和下一步共同形成学习闭环。"}</text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">{staleBook ? "先核对版本、日期和来源，再决定是否投入阅读时间。" : `当前路径把“${current.input}”转成“${current.artifact}”。`}</p>
    </section>
  );
}

type SourceMode = "catalog" | "paper" | "docs";

const sourceModes: Record<SourceMode, { label: string; claim: string; check: string; outcome: string }> = {
  catalog: { label: "看目录", claim: "覆盖范围", check: "出版信息", outcome: "初筛" },
  paper: { label: "读论文", claim: "方法主张", check: "实验条件", outcome: "复现" },
  docs: { label: "查文档", claim: "接口边界", check: "当前版本", outcome: "接入" },
};

export function BlaOtherBooksSourceLab() {
  const [mode, setMode] = useState<SourceMode>("catalog");
  const [noPrimary, setNoPrimary] = useState(false);
  const current = sourceModes[mode];
  const levels = [
    { x: 72, width: 130, label: "主张", value: current.claim },
    { x: 220, width: 230, label: "核对", value: noPrimary ? "二手摘要" : current.check },
    { x: 470, width: 280, label: "行动", value: noPrimary ? "保留疑问" : current.outcome },
  ];

  return (
    <section aria-label="来源证据阶梯实验" className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5" data-visual-kind="bla-other-books-source-ladder">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Source ladder</p>
          <h3 className="mt-1 text-lg font-semibold">不同来源回答不同问题</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">选择目录、论文或官方文档，再移除第一手来源，观察阅读者为什么要区分覆盖范围、方法证据和接口边界。</p>
        </div>
        <ResetButton onClick={() => { setMode("catalog"); setNoPrimary(false); }} />
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(sourceModes) as SourceMode[]).map((id) => (
          <ModeButton active={mode === id} key={id} onClick={() => setMode(id)}>{sourceModes[id].label}</ModeButton>
        ))}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input checked={noPrimary} className="size-4 accent-[var(--accent)]" onChange={(event) => setNoPrimary(event.target.checked)} type="checkbox" />
        不查看第一手来源
      </label>
      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg aria-label="来源主张经过核对进入学习行动的阶梯图" className="h-auto min-w-[680px] w-full" role="img" viewBox="0 0 760 330">
          <defs><marker id="bla-other-books-source-arrow" markerHeight="7" markerWidth="7" orient="auto-start-reverse" refX="6" refY="3.5" viewBox="0 0 7 7"><path d="M0,0 L7,3.5 L0,7 z" fill="var(--accent)" /></marker></defs>
          <text fill="var(--muted)" fontSize="12" x="28" y="30">当前来源：{current.label} · 第一手资料：{noPrimary ? "跳过" : "保留"}</text>
          {levels.map((level, index) => (
            <g key={`${level.label}-${level.x}`}>
              <rect fill={noPrimary && index > 0 ? "var(--danger-soft)" : "var(--surface)"} height="106" rx="12" stroke={noPrimary && index > 0 ? "var(--danger)" : "var(--border)"} strokeWidth="2" width={level.width} x={level.x} y={154 - index * 31} />
              <text fill="var(--accent)" fontSize="13" fontWeight="700" textAnchor="middle" x={level.x + level.width / 2} y={184 - index * 31}>{level.label}</text>
              <text fill="var(--text)" fontSize="12" textAnchor="middle" x={level.x + level.width / 2} y={215 - index * 31}>{level.value}</text>
              {index < levels.length - 1 ? <line markerEnd="url(#bla-other-books-source-arrow)" stroke="var(--accent)" strokeWidth="2" x1={level.x + level.width} x2={levels[index + 1].x - 12} y1={207 - index * 31} y2={176 - index * 31} /> : null}
            </g>
          ))}
          <rect fill={noPrimary ? "var(--danger-soft)" : "var(--surface)"} height="55" rx="10" stroke={noPrimary ? "var(--danger)" : "var(--border)"} width="680" x="35" y="240" />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">{noPrimary ? "观察：只看转述无法核对实验条件、版本和适用边界，结论应保持待定。" : "观察：来源类型决定能回答什么，不同证据不能互相冒充。"}</text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">{noPrimary ? "把二手摘要标成线索，回到论文、目录或官方文档补齐依据。" : `当前来源用“${current.check}”支撑“${current.outcome}”。`}</p>
    </section>
  );
}

type PlanMode = "sprint" | "compare" | "teach";

const planModes: Record<PlanMode, { label: string; input: string; artifact: string; review: string }> = {
  sprint: { label: "短冲刺", input: "一项任务", artifact: "运行记录", review: "验收" },
  compare: { label: "做对照", input: "两条路径", artifact: "差异表", review: "选型" },
  teach: { label: "讲给别人", input: "学习目标", artifact: "解释稿", review: "复述" },
};

export function BlaOtherBooksPlanLab() {
  const [mode, setMode] = useState<PlanMode>("sprint");
  const [noArtifact, setNoArtifact] = useState(false);
  const current = planModes[mode];
  const points = [
    { x: 90, y: 105, label: "目标", value: current.input },
    { x: 270, y: 105, label: "产物", value: noArtifact ? "空白" : current.artifact },
    { x: 450, y: 105, label: "复核", value: noArtifact ? "无依据" : current.review },
    { x: 630, y: 105, label: "下轮", value: noArtifact ? "重做" : "升级" },
  ];

  return (
    <section aria-label="阅读实践计划实验" className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5" data-visual-kind="bla-other-books-practice-loop">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Practice loop</p>
          <h3 className="mt-1 text-lg font-semibold">阅读要留下能复核的产物</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">选择短冲刺、对照或讲解，再删除学习产物，观察为什么“读过”不能替代运行记录、差异表或可复述的解释稿。</p>
        </div>
        <ResetButton onClick={() => { setMode("sprint"); setNoArtifact(false); }} />
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(planModes) as PlanMode[]).map((id) => (
          <ModeButton active={mode === id} key={id} onClick={() => setMode(id)}>{planModes[id].label}</ModeButton>
        ))}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input checked={noArtifact} className="size-4 accent-[var(--accent)]" onChange={(event) => setNoArtifact(event.target.checked)} type="checkbox" />
        删除学习产物
      </label>
      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg aria-label="阅读目标经过学习产物和复核进入下一轮实践的循环图" className="h-auto min-w-[680px] w-full" role="img" viewBox="0 0 760 330">
          <defs><marker id="bla-other-books-plan-arrow" markerHeight="7" markerWidth="7" orient="auto-start-reverse" refX="6" refY="3.5" viewBox="0 0 7 7"><path d="M0,0 L7,3.5 L0,7 z" fill="var(--accent)" /></marker></defs>
          <text fill="var(--muted)" fontSize="12" x="28" y="30">当前计划：{current.label} · 产物：{noArtifact ? "缺失" : "已保存"}</text>
          {points.map((point, index) => (
            <g key={`${point.label}-${point.x}`}>
              <circle cx={point.x} cy={point.y} fill={noArtifact && index > 0 ? "var(--danger-soft)" : "var(--surface)"} r="49" stroke={noArtifact && index > 0 ? "var(--danger)" : "var(--border)"} strokeWidth="2" />
              <text fill="var(--accent)" fontSize="13" fontWeight="700" textAnchor="middle" x={point.x} y={point.y - 4}>{point.label}</text>
              <text fill="var(--text)" fontSize="12" textAnchor="middle" x={point.x} y={point.y + 19}>{point.value}</text>
              {index < points.length - 1 ? <line markerEnd="url(#bla-other-books-plan-arrow)" stroke="var(--accent)" strokeWidth="2" x1={point.x + 50} x2={points[index + 1].x - 52} y1={point.y} y2={point.y} /> : null}
            </g>
          ))}
          <path d="M675 160 C690 218, 580 272, 470 270" fill="none" markerEnd="url(#bla-other-books-plan-arrow)" stroke={noArtifact ? "var(--danger)" : "var(--accent)"} strokeDasharray="8 6" strokeWidth="2" />
          <rect fill={noArtifact ? "var(--danger-soft)" : "var(--surface)"} height="55" rx="10" stroke={noArtifact ? "var(--danger)" : "var(--border)"} width="680" x="35" y="240" />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">{noArtifact ? "观察：没有可复核产物，下一轮无法判断是资料、实现还是理解出了问题。" : "观察：目标、产物、复核和下一轮让延伸阅读产生可迁移能力。"}</text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">{noArtifact ? "恢复产物并写下验收条件，让阅读结果可以被自己和同伴复查。" : `当前计划把“${current.input}”留下“${current.artifact}”。`}</p>
    </section>
  );
}
