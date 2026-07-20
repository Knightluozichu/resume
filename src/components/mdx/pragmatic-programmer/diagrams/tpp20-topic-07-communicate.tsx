"use client";

import { useState, type ReactNode } from "react";

const tone = {
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  bg: "var(--bg)",
  border: "var(--border)",
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
};

function CommunicationFrame({
  eyebrow,
  title,
  description,
  kind,
  reset,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  kind: string;
  reset: () => void;
  children: ReactNode;
}) {
  return (
    <section
      className="not-prose my-6 overflow-hidden rounded-card border border-border bg-elevated text-primary shadow-sm"
      aria-label={`${title}实验`}
      data-tpp20-unit="tpp20-topic-07-communicate"
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
          onClick={reset}
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

const audiences = {
  oncall: {
    label: "值班工程师",
    intent: "在 10 分钟内决定是否回滚",
    headline: "退款服务 5xx 从 0.2% 升至 8.1%",
    needed: [
      "影响范围：欧洲退款",
      "已尝试：重启无效",
      "下一动作：回滚规则 v42",
    ],
    medium: "告警频道 + 运行手册链接",
    proof: "值班者能复述回滚条件并执行",
    color: tone.danger,
  },
  support: {
    label: "客服主管",
    intent: "向受影响用户说明正在发生什么",
    headline: "部分退款延迟，不会丢失订单",
    needed: [
      "影响范围：待处理退款",
      "用户动作：无需重复提交",
      "下次更新时间：14:30",
    ],
    medium: "状态页 + 客服话术",
    proof: "客服能用自己的话回答“会不会丢钱”",
    color: tone.accent,
  },
  decision: {
    label: "产品负责人",
    intent: "选择继续修复或降级功能",
    headline: "规则 v42 是唯一新增变量",
    needed: [
      "影响：8.1% 退款请求",
      "选项：回滚 / 只禁用欧洲",
      "代价：各选项的恢复时间",
    ],
    medium: "决策记录 + 数据面板",
    proof: "负责人明确选项、边界与复核时刻",
    color: tone.success,
  },
} as const;
type AudienceId = keyof typeof audiences;

export function Tpp20Topic07CommunicateSystemLab() {
  const [audienceId, setAudienceId] = useState<AudienceId>("oncall");
  const message = audiences[audienceId];
  return (
    <CommunicationFrame
      eyebrow="第 7 章专属解剖图 · 同一事件不应只有一份文案"
      title="从受众的下一步动作倒推：这条退款故障信息必须包含什么"
      description="选择收信人。事件事实固定；变化的是对方需要做的决定、信息层级、媒介和理解证据。点击后可看见“完整”不等于把所有日志都转发。"
      kind="audience-action-message"
      reset={() => setAudienceId("oncall")}
    >
      <div className="grid gap-4 p-4 lg:grid-cols-[238px_1fr]">
        <div className="grid gap-2" aria-label="受众选择">
          {(Object.keys(audiences) as AudienceId[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setAudienceId(id)}
              aria-pressed={audienceId === id}
              className={`min-h-11 rounded-control border p-3 text-left ${audienceId === id ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              <span className="block text-sm font-semibold text-primary">
                {audiences[id].label}
              </span>
              <span className="mt-1 block text-xs text-secondary">
                {audiences[id].intent}
              </span>
            </button>
          ))}
        </div>
        <div>
          <svg
            viewBox="0 0 780 354"
            role="img"
            aria-label={`面向${message.label}的退款故障信息结构`}
            className="hidden h-auto w-full sm:block"
          >
            <text x="28" y="32" fontSize="13" fontWeight="700" fill={tone.text}>
              故障事实不变；真正变化的是收信人必须能作出的下一步动作
            </text>
            <rect
              x="31"
              y="68"
              width="350"
              height="236"
              rx="15"
              fill={tone.bg}
              stroke={message.color}
              strokeWidth="2"
            />
            <text
              x="57"
              y="103"
              fontSize="12"
              fontWeight="700"
              fill={message.color}
            >
              发给：{message.label}
            </text>
            <text
              x="57"
              y="137"
              fontSize="15"
              fontWeight="700"
              fill={tone.text}
            >
              {message.headline}
            </text>
            {message.needed.map((item, index) => (
              <g key={item}>
                <circle
                  cx="63"
                  cy={174 + index * 33}
                  r="6"
                  fill={message.color}
                />
                <text
                  x="79"
                  y={179 + index * 33}
                  fontSize="12.5"
                  fill={tone.text}
                >
                  {item}
                </text>
              </g>
            ))}
            <path d="M381 184 H454" stroke={message.color} strokeWidth="3" />
            <path d="M454 184 l-10 -7 v14 z" fill={message.color} />
            <rect
              x="475"
              y="92"
              width="258"
              height="91"
              rx="13"
              fill={message.color}
              fillOpacity="0.1"
              stroke={message.color}
            />
            <text
              x="499"
              y="124"
              fontSize="12"
              fontWeight="700"
              fill={tone.text}
            >
              合适媒介
            </text>
            <text x="499" y="151" fontSize="13" fill={message.color}>
              {message.medium}
            </text>
            <rect
              x="475"
              y="204"
              width="258"
              height="100"
              rx="13"
              fill={tone.bg}
              stroke={tone.border}
            />
            <text
              x="499"
              y="236"
              fontSize="12"
              fontWeight="700"
              fill={tone.text}
            >
              理解证据
            </text>
            <text x="499" y="264" fontSize="12" fill={tone.muted}>
              {message.proof.slice(0, 18)}
            </text>
            <text x="499" y="284" fontSize="12" fill={tone.muted}>
              {message.proof.slice(18)}
            </text>
          </svg>
          <div className="space-y-3 sm:hidden">
            <p
              className="rounded-control border p-3 text-sm font-semibold text-primary"
              style={{ borderColor: message.color }}
            >
              {message.headline}
            </p>
            <div className="rounded-control border border-border bg-bg p-3 text-sm text-primary">
              <strong>对方必须获得：</strong>
              {message.needed.map((item) => (
                <span key={item} className="mt-2 block">
                  • {item}
                </span>
              ))}
            </div>
            <p
              className="rounded-control border-l-4 bg-bg p-3 text-sm text-primary"
              style={{ borderColor: message.color }}
            >
              <strong>媒介：</strong>
              {message.medium}
              <br />
              <strong>理解证据：</strong>
              {message.proof}
            </p>
          </div>
        </div>
      </div>
    </CommunicationFrame>
  );
}

const documentCases = {
  source: {
    label: "与代码同源",
    source: "runbooks/refund-rollback.md @ commit a91d",
    update: "规则 v42 合入时，CI 要求更新回滚条件",
    reader: "值班员看到的是与部署版本相同的步骤",
    result: "信息可追溯；更新时间可验证",
    color: tone.success,
  },
  copy: {
    label: "复制到聊天记录",
    source: "两周前的置顶消息",
    update: "规则 v42 已变，但消息没有审查入口",
    reader: "值班员按 v41 的阈值判断",
    result: "信息漂移；不能作为运行依据",
    color: tone.danger,
  },
  link: {
    label: "只给首页链接",
    source: "文档站首页",
    update: "更新存在，但没有跳到具体回滚条件",
    reader: "先搜索、再猜哪一页属于本次故障",
    result: "内容或许正确，时机仍然错误",
    color: tone.warning,
  },
} as const;
type DocumentId = keyof typeof documentCases;

export function Tpp20Topic07CommunicateFeedbackLab() {
  const [caseId, setCaseId] = useState<DocumentId>("source");
  const doc = documentCases[caseId];
  return (
    <CommunicationFrame
      eyebrow="第 7 章专属实验 · 信息也会随复制而失效"
      title="固定同一次规则变更，只改变文档如何跟随代码更新"
      description="选择文档链路。首个状态变化不在读者“是否认真”，而在文档是否能指回版本、更新触发点和当前要执行的具体步骤。"
      kind="documentation-freshness-chain"
      reset={() => setCaseId("source")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(documentCases) as DocumentId[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setCaseId(id)}
              aria-pressed={caseId === id}
              className={`min-h-11 rounded-control border p-3 text-left ${caseId === id ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              <span className="text-sm font-semibold text-primary">
                {documentCases[id].label}
              </span>
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <article className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs font-semibold text-accent">信息源</p>
            <p className="mt-2 text-sm text-primary">{doc.source}</p>
          </article>
          <article
            className="rounded-control border p-4"
            style={{ borderColor: doc.color }}
          >
            <p className="text-xs font-semibold" style={{ color: doc.color }}>
              更新触发点
            </p>
            <p className="mt-2 text-sm text-primary">{doc.update}</p>
          </article>
          <article className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs font-semibold text-accent">读者实际得到</p>
            <p className="mt-2 text-sm text-primary">{doc.reader}</p>
            <p
              className="mt-3 text-sm font-semibold"
              style={{ color: doc.color }}
            >
              {doc.result}
            </p>
          </article>
        </div>
      </div>
    </CommunicationFrame>
  );
}

const evidenceCases = {
  understood: {
    label: "能复述决策条件",
    answers: [
      ["影响哪一类请求？", "欧洲退款", true],
      ["现在做什么？", "回滚规则 v42", true],
      ["何时再次更新？", "14:30", true],
    ],
    result: "理解证据足够，进入执行与下一次更新",
    color: tone.success,
  },
  vague: {
    label: "只回复“收到”",
    answers: [
      ["影响哪一类请求？", "收到", false],
      ["现在做什么？", "正在处理", false],
      ["何时再次更新？", "稍后", false],
    ],
    result: "没有任何可执行复述；沟通尚未完成",
    color: tone.danger,
  },
  repaired: {
    label: "补一条针对性提问",
    answers: [
      ["影响哪一类请求？", "欧洲退款", true],
      ["现在做什么？", "回滚规则 v42", true],
      ["何时再次更新？", "14:30", true],
    ],
    result: "用具体问题修复理解，而不是重复发送整段消息",
    color: tone.accent,
  },
} as const;
type EvidenceId = keyof typeof evidenceCases;

export function Tpp20Topic07CommunicateEvidenceLab() {
  const [caseId, setCaseId] = useState<EvidenceId>("understood");
  const evidence = evidenceCases[caseId];
  return (
    <CommunicationFrame
      eyebrow="第 7 章专属验收 · “已读”不是理解"
      title="用三道与下一步动作有关的问题，检查消息有没有真正抵达"
      description="切换理解记录。验收的是收信人能否在不看原作者屏幕的情况下说出影响、动作和更新时间；“收到”不会关闭沟通环。"
      kind="communication-understanding-check"
      reset={() => setCaseId("understood")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(evidenceCases) as EvidenceId[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setCaseId(id)}
              aria-pressed={caseId === id}
              className={`min-h-11 rounded-control border p-3 text-left ${caseId === id ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              <span className="text-sm font-semibold text-primary">
                {evidenceCases[id].label}
              </span>
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_310px]">
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs font-semibold text-accent">收信人独立复述</p>
            <div className="mt-3 grid gap-2">
              {evidence.answers.map(([question, answer, correct]) => (
                <div
                  key={question}
                  className={`rounded-control border p-3 text-sm ${correct ? "border-success bg-success/10 text-primary" : "border-danger bg-danger/10 text-primary"}`}
                >
                  <span className="font-semibold">{question}</span>
                  <span
                    className="mt-1 block"
                    style={{ color: correct ? tone.success : tone.danger }}
                  >
                    回答：{answer}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <aside
            className="rounded-control border bg-bg p-4"
            style={{ borderColor: evidence.color }}
          >
            <p
              className="text-xs font-semibold"
              style={{ color: evidence.color }}
            >
              验收结论
            </p>
            <p className="mt-2 text-sm font-semibold text-primary">
              {evidence.result}
            </p>
            <p className="mt-3 text-xs leading-5 text-secondary">
              保存这次提问、回答和消息版本。理解偏差应让下一版消息改结构，而不是归因给读者。
            </p>
          </aside>
        </div>
      </div>
    </CommunicationFrame>
  );
}
