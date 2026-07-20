"use client";

import { useState, type ReactNode } from "react";

const c = {
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
};

function LanguageFrame({
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
      data-tpp20-unit="tpp20-topic-14-domain-languages"
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

const expressions = {
  infrastructure: {
    label: "基础设施词汇",
    source: 'if (u.t === 3 && o.v >= 50000 && !p.flags.includes("HZ"))',
    pieces: [
      ["u.t === 3", "数据库枚举 3", "领域评审者不知道 3 是不是 VIP", c.danger],
      [
        "o.v >= 50000",
        "以分为单位的整数",
        "币种和边界藏在实现约定里",
        c.warning,
      ],
      ["flags: HZ", "运输标志", "危险品例外没有业务名字", c.danger],
    ],
    result:
      "代码能执行，但规则的主语、金额单位和例外都不能由业务语言直接复核。",
    color: c.danger,
  },
  domain: {
    label: "领域语言",
    source: "VIP 订单满 CNY 500 免标准运费；危险品除外",
    pieces: [
      ["VIP 订单", "CustomerTier.VIP", "资格由会员领域拥有", c.success],
      [
        "满 CNY 500",
        "Money(CNY, 500) + atLeast",
        "币种和包含边界显式",
        c.success,
      ],
      ["危险品除外", "Parcel.isHazardous", "运输领域拥有例外判定", c.success],
    ],
    result: "每个短语映射到一个有所有者的领域对象，执行轨迹仍能回指原句。",
    color: c.success,
  },
} as const;
type ExpressionId = keyof typeof expressions;

export function Tpp20Topic14DomainLanguagesSystemLab() {
  const [id, setId] = useState<ExpressionId>("infrastructure");
  const expression = expressions[id];
  return (
    <LanguageFrame
      eyebrow="Topic 14 专属解剖图 · 免费运费规则的语义映射"
      title="同一条规则，领域专家能否从表达追到执行对象？"
      description="切换两种表达。固定 VIP 订单满 500 元且危险品除外的规则，逐短语展示它由哪个领域对象解释，以及哪里仍依赖隐藏约定。"
      kind="domain-language-semantic-mapping"
      reset={() => setId("infrastructure")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-2">
          {(Object.keys(expressions) as ExpressionId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {expressions[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 rounded-control border border-border bg-bg p-4">
          <p className="text-xs font-semibold text-secondary">规则原句</p>
          <code className="mt-2 block overflow-x-auto rounded-control border border-border bg-elevated p-3 text-sm leading-6">
            {expression.source}
          </code>
          <div className="mt-3 grid gap-2">
            {expression.pieces.map(([phrase, object, meaning], index) => (
              <div
                key={phrase}
                className="grid gap-2 rounded-control border p-3 md:grid-cols-[1fr_1fr_1.6fr] md:items-center"
                style={{ borderColor: expression.color }}
              >
                <strong className="text-sm" style={{ color: expression.color }}>
                  {index + 1}. {phrase}
                </strong>
                <code className="text-xs">{object}</code>
                <span className="text-sm text-secondary">{meaning}</span>
              </div>
            ))}
          </div>
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: expression.color }}
        >
          {expression.result}
        </p>
      </div>
    </LanguageFrame>
  );
}

const boundaries = {
  greater: {
    label: "超过 500 元：subtotal > 500",
    operator: ">",
    cases: [
      ["CNY 499.99", false],
      ["CNY 500.00", false],
      ["CNY 500.01", true],
    ],
    reading: "“超过”排除恰好 500；测试若只有 499 与 501，语义分歧不会出现。",
    color: c.warning,
  },
  atLeast: {
    label: "满 500 元：subtotal >= 500",
    operator: ">=",
    cases: [
      ["CNY 499.99", false],
      ["CNY 500.00", true],
      ["CNY 500.01", true],
    ],
    reading: "“满”包含恰好 500；金额对象同时固定 CNY，不能拿无币种数字比较。",
    color: c.success,
  },
} as const;
type BoundaryId = keyof typeof boundaries;

export function Tpp20Topic14DomainLanguagesFeedbackLab() {
  const [id, setId] = useState<BoundaryId>("greater");
  const boundary = boundaries[id];
  return (
    <LanguageFrame
      eyebrow="Topic 14 专属实验 · 一个词改变金额边界"
      title="“超过”改成“满”，恰好 500 元的订单发生什么？"
      description="只改变领域短语及其对应操作符，固定 VIP、非危险品与人民币。三笔相邻订单立即暴露语义边界。"
      kind="domain-language-money-boundary"
      reset={() => setId("greater")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-2">
          {(Object.keys(boundaries) as BoundaryId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {boundaries[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 overflow-hidden rounded-control border border-border bg-bg">
          <div className="grid grid-cols-[1fr_auto_auto] gap-3 border-b border-border px-3 py-2 text-xs font-semibold text-secondary">
            <span>VIP 订单小计</span>
            <span>比较</span>
            <span>标准运费</span>
          </div>
          {boundary.cases.map(([amount, free]) => (
            <div
              key={amount}
              className="grid grid-cols-[1fr_auto_auto] items-center gap-3 border-b border-border px-3 py-3 last:border-b-0"
            >
              <code className="text-sm">{amount}</code>
              <code className="text-xs text-secondary">
                {boundary.operator} CNY 500
              </code>
              <strong
                className="text-sm"
                style={{ color: free ? c.success : c.danger }}
              >
                {free ? "免除" : "收取"}
              </strong>
            </div>
          ))}
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: boundary.color }}
        >
          {boundary.reading}
        </p>
      </div>
    </LanguageFrame>
  );
}

const programs = {
  valid: {
    label: "合法规则",
    lines: [
      "when customer is VIP",
      "and subtotal at-least CNY 500",
      "unless parcel is hazardous",
      "then waive standard-shipping",
    ],
    pointer: null,
    diagnostic:
      "已编译：Rule free-standard-shipping-v3；4 个领域对象均已绑定。",
    trace: [
      "VIP = true",
      "CNY 520 >= CNY 500",
      "hazardous = false",
      "运费 = CNY 0",
    ],
    color: c.success,
  },
  unknown: {
    label: "非法术语",
    lines: [
      "when customer is PLATINUM",
      "and subtotal at-least CNY 500",
      "unless parcel is hazardous",
      "then waive standard-shipping",
    ],
    pointer: 1,
    diagnostic:
      "第 1 行第 18 列：未知 CustomerTier“PLATINUM”；允许 VIP、REGULAR。",
    trace: [
      "拒绝执行",
      "没有猜测近似枚举",
      "没有产生运费决定",
      "返回领域词典位置",
    ],
    color: c.danger,
  },
  currency: {
    label: "缺少币种",
    lines: [
      "when customer is VIP",
      "and subtotal at-least 500",
      "unless parcel is hazardous",
      "then waive standard-shipping",
    ],
    pointer: 2,
    diagnostic: "第 2 行第 23 列：Money 必须包含 ISO 4217 币种，例如 CNY 500。",
    trace: [
      "拒绝裸数字",
      "不把 500 猜成元或分",
      "不跨币种比较",
      "要求修改源规则",
    ],
    color: c.warning,
  },
} as const;
type ProgramId = keyof typeof programs;

export function Tpp20Topic14DomainLanguagesEvidenceLab() {
  const [id, setId] = useState<ProgramId>("unknown");
  const program = programs[id];
  return (
    <LanguageFrame
      eyebrow="Topic 14 专属复核 · DSL 错误必须回到领域坐标"
      title="规则不能执行时，错误能否指出具体术语和边界？"
      description="切换合法规则、未知会员等级与缺币种金额。解析器不得悄悄猜值；诊断必须返回源行列、期望领域类型和允许词汇。"
      kind="domain-language-source-diagnostic"
      reset={() => setId("unknown")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(programs) as ProgramId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {programs[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="overflow-hidden rounded-control border border-border bg-bg">
            <div className="border-b border-border px-3 py-2 text-xs font-semibold text-secondary">
              shipping.rule
            </div>
            <ol className="py-2 font-mono text-xs leading-7">
              {program.lines.map((line, index) => (
                <li
                  key={line}
                  className="grid grid-cols-[2rem_1fr] px-3"
                  style={{
                    color:
                      program.pointer === index + 1 ? program.color : undefined,
                    background:
                      program.pointer === index + 1
                        ? "color-mix(in srgb, var(--danger) 10%, transparent)"
                        : undefined,
                  }}
                >
                  <span className="select-none text-secondary">
                    {index + 1}
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ol>
            <p
              className="border-t border-border px-3 py-3 text-sm leading-6"
              style={{ color: program.color }}
              role="status"
            >
              {program.diagnostic}
            </p>
          </div>
          <div className="rounded-control border border-border bg-bg p-4">
            <strong className="text-sm">执行/拒绝轨迹</strong>
            <ol className="mt-3 space-y-2">
              {program.trace.map((item, index) => (
                <li key={item} className="flex gap-2 text-sm">
                  <span
                    className="font-mono text-xs"
                    style={{ color: program.color }}
                  >
                    {index + 1}.
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </LanguageFrame>
  );
}
