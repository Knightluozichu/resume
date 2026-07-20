"use client";

import { useState, type ReactNode } from "react";

const ink = {
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  bg: "var(--bg)",
  border: "var(--border)",
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
};

function PortfolioFrame({
  eyebrow,
  title,
  description,
  kind,
  onReset,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  kind: string;
  onReset: () => void;
  children: ReactNode;
}) {
  return (
    <section
      className="not-prose my-6 overflow-hidden rounded-card border border-border bg-elevated text-primary shadow-sm"
      aria-label={`${title}实验`}
      data-tpp20-unit="tpp20-topic-06-knowledge-portfolio"
      data-visual-kind={kind}
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border bg-bg/70 px-4 py-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-accent">{eyebrow}</p>
          <h3 className="mt-1 text-base font-semibold">{title}</h3>
          <p className="mt-1 max-w-3xl text-xs leading-5 text-secondary">
            {description}
          </p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-control border border-border bg-bg px-3 text-sm font-semibold hover:border-accent"
          aria-label={`重置${title}实验`}
        >
          <span aria-hidden="true">↺</span>
          <span className="ml-2">重置</span>
        </button>
      </header>
      {children}
    </section>
  );
}

const assets = [
  {
    id: "query",
    label: "查询计划诊断",
    domain: "数据库",
    signal: "慢查询出现时能读出 EXPLAIN 的首个失配",
    practice: "用 20 万行订单表复现索引失效",
    source: "PostgreSQL 官方文档 + 本地日志",
    next: "14 天后重跑同一案例",
    color: ink.accent,
  },
  {
    id: "incident",
    label: "故障复盘主持",
    domain: "交付",
    signal: "复盘能把时间线与责任归属分开",
    practice: "主持一次 30 分钟支付告警演练",
    source: "事故记录 + 团队评审",
    next: "下次演练后更新提问卡",
    color: ink.success,
  },
  {
    id: "security",
    label: "令牌轮换",
    domain: "安全",
    signal: "能说明轮换时旧令牌为何仍可能被接受",
    practice: "在沙盒中完成双密钥过渡",
    source: "云厂商安全指南 + 沙盒日志",
    next: "版本发布后复核窗口",
    color: ink.warning,
  },
] as const;
type AssetId = (typeof assets)[number]["id"];

export function Tpp20Topic06KnowledgePortfolioSystemLab() {
  const [assetId, setAssetId] = useState<AssetId>("query");
  const asset = assets.find((item) => item.id === assetId)!;
  return (
    <PortfolioFrame
      eyebrow="第 6 章专属解剖图 · 知识不是收藏清单"
      title="一项知识资产只有在任务、练习、来源和复核日同时存在时才可进入组合"
      description="选择一张真实资产卡。图中不是“会了 / 不会”的分数：它显示哪一种任务信号、可重做练习和独立来源让这项知识可被再验证。"
      kind="knowledge-asset-anatomy"
      onReset={() => setAssetId("query")}
    >
      <div className="grid gap-4 p-4 lg:grid-cols-[250px_1fr]">
        <div className="grid gap-2" aria-label="知识资产选择">
          {assets.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setAssetId(item.id)}
              aria-pressed={assetId === item.id}
              className={`min-h-11 rounded-control border p-3 text-left ${assetId === item.id ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              <span className="block text-sm font-semibold text-primary">
                {item.label}
              </span>
              <span className="mt-1 block text-xs text-secondary">
                {item.domain}
              </span>
            </button>
          ))}
        </div>
        <div>
          <svg
            viewBox="0 0 760 338"
            role="img"
            aria-label={`${asset.label}的知识资产证据结构`}
            className="hidden h-auto w-full sm:block"
          >
            <defs>
              <marker
                id="portfolio-arrow"
                markerWidth="10"
                markerHeight="10"
                refX="8"
                refY="5"
                orient="auto"
              >
                <path d="M0 0 L10 5 L0 10 Z" fill={asset.color} />
              </marker>
            </defs>
            <text x="30" y="34" fontSize="13" fontWeight="700" fill={ink.text}>
              资产卡不是文章链接：每个证据都能在未来的一项任务中重新被检查
            </text>
            <rect
              x="45"
              y="74"
              width="212"
              height="190"
              rx="16"
              fill={asset.color}
              fillOpacity="0.1"
              stroke={asset.color}
              strokeWidth="2"
            />
            <text x="68" y="110" fontSize="13" fontWeight="700" fill={ink.text}>
              {asset.label}
            </text>
            <text x="68" y="137" fontSize="12" fill={ink.muted}>
              领域：{asset.domain}
            </text>
            <text
              x="68"
              y="181"
              fontSize="12"
              fontWeight="700"
              fill={asset.color}
            >
              任务信号
            </text>
            <text x="68" y="204" fontSize="11.5" fill={ink.muted}>
              {asset.signal.slice(0, 20)}
            </text>
            <text x="68" y="223" fontSize="11.5" fill={ink.muted}>
              {asset.signal.slice(20)}
            </text>
            <path
              d="M257 169 H327"
              stroke={asset.color}
              strokeWidth="3"
              markerEnd="url(#portfolio-arrow)"
            />
            <rect
              x="340"
              y="74"
              width="365"
              height="75"
              rx="12"
              fill={ink.bg}
              stroke={ink.border}
            />
            <text
              x="364"
              y="104"
              fontSize="12"
              fontWeight="700"
              fill={ink.text}
            >
              可重做练习
            </text>
            <text x="364" y="129" fontSize="12" fill={ink.muted}>
              {asset.practice}
            </text>
            <rect
              x="340"
              y="165"
              width="365"
              height="75"
              rx="12"
              fill={ink.bg}
              stroke={ink.border}
            />
            <text
              x="364"
              y="195"
              fontSize="12"
              fontWeight="700"
              fill={ink.text}
            >
              交叉来源
            </text>
            <text x="364" y="220" fontSize="12" fill={ink.muted}>
              {asset.source}
            </text>
            <path
              d="M522 240 V278"
              stroke={asset.color}
              strokeWidth="3"
              markerEnd="url(#portfolio-arrow)"
            />
            <rect
              x="340"
              y="282"
              width="365"
              height="34"
              rx="10"
              fill={asset.color}
              fillOpacity="0.1"
              stroke={asset.color}
            />
            <text
              x="364"
              y="305"
              fontSize="12"
              fontWeight="700"
              fill={ink.text}
            >
              再平衡动作：{asset.next}
            </text>
          </svg>
          <div className="space-y-3 sm:hidden">
            <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm text-primary">
              <strong>任务信号：</strong>
              {asset.signal}
            </p>
            <p className="rounded-control border border-border bg-bg p-3 text-sm text-primary">
              <strong>可重做练习：</strong>
              {asset.practice}
            </p>
            <p className="rounded-control border border-border bg-bg p-3 text-sm text-primary">
              <strong>交叉来源：</strong>
              {asset.source}
            </p>
            <p
              className="rounded-control border-l-4 bg-bg p-3 text-sm text-primary"
              style={{ borderColor: asset.color }}
            >
              <strong>再平衡动作：</strong>
              {asset.next}
            </p>
          </div>
        </div>
      </div>
    </PortfolioFrame>
  );
}

const decayCases = {
  current: {
    label: "近期重做",
    age: "上周",
    source: "文档版本 16",
    observation: "同一条慢查询仍在索引条件处失配",
    response: "保持在组合；下一次项目可复用",
    color: ink.success,
  },
  stale: {
    label: "材料过期",
    age: "18 个月前",
    source: "文档版本 12",
    observation: "教程中的参数已废弃，解释无法复现",
    response: "触发再学习，不把旧笔记当作可靠资产",
    color: ink.warning,
  },
  conflict: {
    label: "来源相互冲突",
    age: "本周",
    source: "博客与官方文档结论不同",
    observation: "日志支持官方文档的执行顺序",
    response: "保留冲突记录，用本地实验裁决",
    color: ink.accent,
  },
} as const;
type DecayId = keyof typeof decayCases;

export function Tpp20Topic06KnowledgePortfolioFeedbackLab() {
  const [caseId, setCaseId] = useState<DecayId>("current");
  const model = decayCases[caseId];
  return (
    <PortfolioFrame
      eyebrow="第 6 章专属实验 · 折旧率来自反馈，不来自自我感觉"
      title="固定“查询计划诊断”资产，只改变最后一次重做和来源状态"
      description="选择资产状态。首个变化是任务中还能否重现解释；随后才决定它留在组合、进入再学习，还是需要用本地实验裁决冲突。"
      kind="knowledge-decay-feedback"
      onReset={() => setCaseId("current")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(decayCases) as DecayId[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setCaseId(id)}
              aria-pressed={caseId === id}
              className={`min-h-11 rounded-control border p-3 text-left ${caseId === id ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              <span className="text-sm font-semibold text-primary">
                {decayCases[id].label}
              </span>
            </button>
          ))}
        </div>
        <svg
          viewBox="0 0 960 250"
          role="img"
          aria-label={`${model.label}时知识资产的衰减与再平衡路径`}
          className="mt-4 hidden h-auto w-full md:block"
        >
          <defs>
            <marker
              id="decay-arrow"
              markerWidth="10"
              markerHeight="10"
              refX="8"
              refY="5"
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={model.color} />
            </marker>
          </defs>
          <text x="32" y="32" fontSize="13" fontWeight="700" fill={ink.text}>
            只改变证据的新鲜度或来源冲突；不把“读过”误当成仍可用
          </text>
          <rect
            x="32"
            y="72"
            width="230"
            height="122"
            rx="14"
            fill={ink.bg}
            stroke={ink.border}
          />
          <text x="54" y="106" fontSize="13" fontWeight="700" fill={ink.text}>
            冻结的资产
          </text>
          <text x="54" y="135" fontSize="12" fill={ink.muted}>
            查询计划诊断
          </text>
          <text x="54" y="164" fontSize="12" fill={ink.muted}>
            最后重做：{model.age}
          </text>
          <path
            d="M262 133 H330"
            stroke={model.color}
            strokeWidth="3"
            markerEnd="url(#decay-arrow)"
          />
          <rect
            x="344"
            y="72"
            width="260"
            height="122"
            rx="14"
            fill={model.color}
            fillOpacity="0.1"
            stroke={model.color}
            strokeWidth="2"
          />
          <text x="367" y="106" fontSize="13" fontWeight="700" fill={ink.text}>
            本次观察
          </text>
          <text x="367" y="135" fontSize="12" fill={ink.muted}>
            {model.observation.slice(0, 23)}
          </text>
          <text x="367" y="156" fontSize="12" fill={ink.muted}>
            {model.observation.slice(23)}
          </text>
          <text x="367" y="181" fontSize="11.5" fill={ink.muted}>
            来源：{model.source}
          </text>
          <path
            d="M604 133 H672"
            stroke={model.color}
            strokeWidth="3"
            markerEnd="url(#decay-arrow)"
          />
          <rect
            x="686"
            y="72"
            width="242"
            height="122"
            rx="14"
            fill={ink.bg}
            stroke={model.color}
            strokeWidth="2"
          />
          <text x="709" y="106" fontSize="13" fontWeight="700" fill={ink.text}>
            再平衡动作
          </text>
          <text x="709" y="139" fontSize="12" fill={model.color}>
            {model.response.slice(0, 17)}
          </text>
          <text x="709" y="160" fontSize="12" fill={model.color}>
            {model.response.slice(17)}
          </text>
        </svg>
        <div className="mt-4 grid gap-3 md:hidden">
          <p className="rounded-control border border-border bg-bg p-3 text-sm text-primary">
            <strong>冻结资产：</strong>查询计划诊断 · 最后重做 {model.age}
          </p>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm text-primary">
            <strong>本次观察：</strong>
            {model.observation}
            <br />
            <strong>来源：</strong>
            {model.source}
          </p>
          <p
            className="rounded-control border-l-4 bg-bg p-3 text-sm text-primary"
            style={{ borderColor: model.color }}
          >
            <strong>再平衡：</strong>
            {model.response}
          </p>
        </div>
      </div>
    </PortfolioFrame>
  );
}

const evidenceStates = {
  complete: {
    label: "基线：证据齐全",
    rows: [
      ["任务日志", true],
      ["沙盒练习", true],
      ["独立来源", true],
      ["复核日期", true],
    ],
    result: "可进入下一个项目；仍按日期复核",
    color: ink.success,
  },
  missing: {
    label: "故障：没有练习证据",
    rows: [
      ["任务日志", true],
      ["沙盒练习", false],
      ["独立来源", true],
      ["复核日期", true],
    ],
    result: "停在实践：不能仅靠阅读宣称掌握",
    color: ink.danger,
  },
  restored: {
    label: "恢复：重做同一案例",
    rows: [
      ["任务日志", true],
      ["沙盒练习", true],
      ["独立来源", true],
      ["复核日期", true],
    ],
    result: "补入可重放 SQL 与结果，再恢复到组合",
    color: ink.accent,
  },
} as const;
type EvidenceId = keyof typeof evidenceStates;

export function Tpp20Topic06KnowledgePortfolioEvidenceLab() {
  const [stateId, setStateId] = useState<EvidenceId>("complete");
  const state = evidenceStates[stateId];
  return (
    <PortfolioFrame
      eyebrow="第 6 章专属验收 · 练习证据不能缺席"
      title="把一项资产从“我看过”变成“我能独立重做”的最小证据包"
      description="切换基线、缺失练习和恢复记录。缺少实际练习时，链路必须停在实践节点；补回同一个案例的可重放工件后才可再平衡。"
      kind="knowledge-evidence-ledger"
      onReset={() => setStateId("complete")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(evidenceStates) as EvidenceId[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setStateId(id)}
              aria-pressed={stateId === id}
              className={`min-h-11 rounded-control border p-3 text-left ${stateId === id ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              <span className="text-sm font-semibold text-primary">
                {evidenceStates[id].label}
              </span>
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_300px]">
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs font-semibold text-accent">
              查询计划诊断 · 可重放证据包
            </p>
            <div className="mt-3 grid gap-2">
              {state.rows.map(([label, present]) => (
                <div
                  key={String(label)}
                  className={`flex min-h-11 items-center rounded-control border px-3 text-sm ${present ? "border-success bg-success/10 text-primary" : "border-danger bg-danger/10 text-primary"}`}
                >
                  <span
                    className="mr-2 font-bold"
                    style={{ color: present ? ink.success : ink.danger }}
                  >
                    {present ? "✓" : "×"}
                  </span>
                  {label}
                  {!present && "：缺失，不能跨过实践节点"}
                </div>
              ))}
            </div>
          </div>
          <aside
            className="rounded-control border bg-bg p-4"
            style={{ borderColor: state.color }}
          >
            <p className="text-xs font-semibold" style={{ color: state.color }}>
              再平衡结论
            </p>
            <p className="mt-2 text-sm font-semibold text-primary">
              {state.result}
            </p>
            <p className="mt-3 text-xs leading-5 text-secondary">
              记录工件位置、输入版本和下一次复核日；一个漂亮的技能标签不构成证据。
            </p>
          </aside>
        </div>
      </div>
    </PortfolioFrame>
  );
}
