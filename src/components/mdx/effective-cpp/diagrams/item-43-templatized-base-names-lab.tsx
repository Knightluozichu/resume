"use client";

import { useState } from "react";

const OFFICIAL_CONCEPT_LABELS = [
  "names in templatized base classes",
  "this->",
  "using declaration",
  "explicit qualification",
  "two-phase lookup",
] as const;

type Strategy = {
  id: string;
  label: string;
  definition: string;
  instantiation: string;
  dispatch: string;
  code: string;
  result: string;
};

const STRATEGIES: readonly Strategy[] = [
  {
    id: "unqualified",
    label: "未限定调用",
    definition:
      "definition context：名称不依赖 Company，dependent base 不在此处展开。",
    instantiation:
      "CompanyA 到达实例化时已经太晚：模板定义阶段就拒绝了 sendClear。",
    dispatch: "没有形成可调用表达式",
    code: "sendClear(info)",
    result: "错误：primary template 的成员不能替 specialization 做保证。",
  },
  {
    id: "this",
    label: "this->",
    definition:
      "definition context：this 的类型依赖 Company，调用被标记为 dependent name。",
    instantiation:
      "CompanyA 找到 sendClear；CompanyZ 在真实 specialization 边界失败。",
    dispatch: "保留 virtual dispatch",
    code: "this->sendClear(info)",
    result: "当前对象的接口语义仍可让更深 derived override 接管。",
  },
  {
    id: "using",
    label: "using declaration",
    definition:
      "definition context：先声明要把 MsgSender<Company>::sendClear 引入 derived scope。",
    instantiation:
      "名称及其 overload set 参与查找；再和 derived 同名函数一起做重载选择。",
    dispatch: "普通调用仍可 virtual dispatch",
    code: "using MsgSender<Company>::sendClear",
    result: "适合恢复一组 base overload；同时检查访问级别和 name hiding。",
  },
  {
    id: "qualified",
    label: "explicit qualification",
    definition:
      "definition context：调用表达式明确写出 dependent base 的 scope。",
    instantiation: "CompanyA 直接解析 MsgSender<CompanyA> 的 implementation。",
    dispatch: "抑制 virtual dispatch",
    code: "MsgSender<Company>::sendClear(info)",
    result: "适合固定审计实现；不要把它误当成当前对象的动态调用。",
  },
] as const;

export function EcppItem43TemplatizedBaseNamesLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = STRATEGIES[activeIndex];

  const reset = () => setActiveIndex(0);

  return (
    <section
      aria-label={`Item 43 模板化基类名称查找实验：${OFFICIAL_CONCEPT_LABELS.join("、")}`}
      data-visual-kind="ecpp-item-43-templatized-base-names-lab"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">两阶段查找实验</p>
          <h2 className="mt-1 text-lg font-semibold text-primary">
            先预测：这个名字在哪个时刻才会可见？
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
            切换同一个 LoggingMsgSender 的访问策略，观察 definition context、
            instantiation context 与 virtual dispatch 如何一起决定结果。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 Item 43 模板化基类名称查找实验"
          onClick={reset}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置实验
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div
          role="tablist"
          aria-label="Item 43 名称查找策略"
          className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4"
        >
          {STRATEGIES.map((strategy, index) => {
            const selected = index === activeIndex;
            return (
              <button
                key={strategy.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-pressed={selected}
                onClick={() => setActiveIndex(index)}
                className={`min-h-11 rounded-control border px-3 py-3 text-left text-sm transition-colors ${
                  selected
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-secondary hover:border-accent hover:text-primary"
                }`}
              >
                <span className="block font-semibold">{strategy.label}</span>
                <code className="mt-1 block break-words text-xs opacity-80">
                  {strategy.code}
                </code>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-4">
        <figure className="mdx-figure not-prose m-0">
          <div className="overflow-hidden rounded-control border border-border bg-bg p-2 sm:p-3">
            <svg
              viewBox="0 0 960 470"
              role="img"
              aria-label={`Item 43 ${active.label}：定义期说明为 ${active.definition}；实例化期说明为 ${active.instantiation}；${active.dispatch}。`}
              className="mx-auto block h-auto w-full max-w-[960px]"
            >
              <text
                x="480"
                y="30"
                textAnchor="middle"
                fontSize="18"
                fontWeight="700"
                fill="var(--text-primary)"
              >
                two-phase lookup：definition → instantiation → dispatch
              </text>
              <text
                x="480"
                y="54"
                textAnchor="middle"
                fontSize="12"
                fill="var(--text-secondary)"
              >
                当前策略：{active.label}
              </text>

              <rect
                x="28"
                y="92"
                width="270"
                height="176"
                rx="12"
                fill="var(--accent)"
                fillOpacity="0.1"
                stroke="var(--accent)"
                strokeWidth="1.6"
              />
              <text
                x="163"
                y="122"
                textAnchor="middle"
                fontSize="15"
                fontWeight="700"
                fill="var(--accent)"
              >
                definition context
              </text>
              <text x="48" y="157" fontSize="12" fill="var(--text-primary)">
                dependent base：MsgSender&lt;Company&gt;
              </text>
              <text x="48" y="184" fontSize="12" fill="var(--text-primary)">
                primary 与 specialization 未知
              </text>
              <text x="48" y="222" fontSize="12" fill="var(--text-secondary)">
                {active.definition}
              </text>
              <text x="48" y="248" fontSize="12" fill="var(--text-secondary)">
                先决定名称是否 dependent
              </text>

              <path
                d="M306 180 H338"
                stroke="var(--text-secondary)"
                strokeWidth="2"
              />
              <path
                d="M330 173 L342 180 L330 187"
                fill="none"
                stroke="var(--text-secondary)"
                strokeWidth="2"
              />

              <rect
                x="345"
                y="92"
                width="270"
                height="176"
                rx="12"
                fill="var(--warning)"
                fillOpacity="0.1"
                stroke="var(--warning)"
                strokeWidth="1.6"
              />
              <text
                x="480"
                y="122"
                textAnchor="middle"
                fontSize="15"
                fontWeight="700"
                fill="var(--warning)"
              >
                instantiation context
              </text>
              <text x="365" y="157" fontSize="12" fill="var(--text-primary)">
                CompanyA / CompanyZ 已知
              </text>
              <text x="365" y="184" fontSize="12" fill="var(--text-primary)">
                选择真实 base specialization
              </text>
              <text x="365" y="222" fontSize="12" fill="var(--text-secondary)">
                {active.instantiation}
              </text>
              <text x="365" y="248" fontSize="12" fill="var(--text-secondary)">
                延迟不是跳过验证
              </text>

              <path
                d="M623 180 H655"
                stroke="var(--text-secondary)"
                strokeWidth="2"
              />
              <path
                d="M647 173 L659 180 L647 187"
                fill="none"
                stroke="var(--text-secondary)"
                strokeWidth="2"
              />

              <rect
                x="662"
                y="92"
                width="270"
                height="176"
                rx="12"
                fill="var(--success)"
                fillOpacity="0.1"
                stroke="var(--success)"
                strokeWidth="1.6"
              />
              <text
                x="797"
                y="122"
                textAnchor="middle"
                fontSize="15"
                fontWeight="700"
                fill="var(--success)"
              >
                call result
              </text>
              <text x="682" y="157" fontSize="12" fill="var(--text-primary)">
                {active.code}
              </text>
              <text x="682" y="184" fontSize="12" fill="var(--text-primary)">
                {active.dispatch}
              </text>
              <text x="682" y="222" fontSize="12" fill="var(--text-secondary)">
                {active.result}
              </text>
              <text x="682" y="248" fontSize="12" fill="var(--text-secondary)">
                访问语法必须匹配调用意图
              </text>

              <line
                x1="28"
                y1="316"
                x2="932"
                y2="316"
                stroke="var(--border)"
                strokeWidth="1"
                strokeDasharray="6 4"
              />
              <text
                x="480"
                y="348"
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fill="var(--text-primary)"
              >
                名称查找 ≠ virtual dispatch
              </text>
              <text
                x="480"
                y="377"
                textAnchor="middle"
                fontSize="12"
                fill="var(--text-secondary)"
              >
                this-&gt;：依赖当前对象 · using：引入 overload set ·
                qualified：固定 base
              </text>
              <text
                x="480"
                y="420"
                textAnchor="middle"
                fontSize="12"
                fill="var(--text-secondary)"
              >
                先问“谁应该接管调用”，再问“怎样让 compiler 找到名称”
              </text>
              <text
                x="480"
                y="448"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="var(--accent)"
              >
                {active.dispatch}
              </text>
            </svg>
          </div>
          <figcaption className="mt-2 text-center text-sm text-secondary">
            同一 dependent base
            可在不同查找策略下得到不同边界；图中把两阶段查找与 virtual dispatch
            分成两个问题。
          </figcaption>
        </figure>

        <div
          className="mt-4 rounded-control border border-border bg-bg p-4"
          role="status"
          aria-live="polite"
        >
          <p className="text-xs font-medium text-accent">当前判断</p>
          <p className="mt-2 text-sm leading-relaxed text-primary">
            {active.result}
          </p>
        </div>
      </div>
    </section>
  );
}

export function EcppTemplatizedBaseNamesDecisionMap() {
  const steps = [
    ["1", "定义期", "Company 未知", "先判定名称是否依赖模板参数"],
    ["2", "实例化期", "specialization 已知", "再检查真实 base 的成员集合"],
    ["3", "调用意图", "动态还是固定", "选择 this->、using 或 qualified call"],
  ];

  return (
    <figure
      aria-label="Item 43 模板化基类名称查找决策地图"
      data-visual-kind="ecpp-item-43-templatized-base-names-decision-map"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <figcaption className="border-b border-border p-4 text-sm font-semibold text-primary">
        决策地图：先分离名称查找，再选择调用语义
      </figcaption>
      <div className="overflow-x-auto p-4">
        <svg
          viewBox="0 0 960 190"
          role="img"
          aria-label="定义期、实例化期、调用意图三步决策地图"
          className="h-auto min-w-[720px] w-full"
        >
          {steps.map(([number, phase, fact, action], index) => {
            const x = 24 + index * 312;
            return (
              <g key={number}>
                <rect
                  x={x}
                  y="30"
                  width="270"
                  height="116"
                  rx="14"
                  fill="var(--bg)"
                  stroke={index === 1 ? "var(--warning)" : "var(--accent)"}
                  strokeWidth="2"
                />
                <circle
                  cx={x + 28}
                  cy="60"
                  r="16"
                  fill={index === 1 ? "var(--warning)" : "var(--accent)"}
                />
                <text
                  x={x + 28}
                  y="65"
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill="var(--bg)"
                >
                  {number}
                </text>
                <text
                  x={x + 56}
                  y="58"
                  fontSize="15"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {phase}
                </text>
                <text
                  x={x + 22}
                  y="92"
                  fontSize="12"
                  fill="var(--text-secondary)"
                >
                  {fact}
                </text>
                <text
                  x={x + 22}
                  y="119"
                  fontSize="12"
                  fill="var(--text-primary)"
                >
                  {action}
                </text>
                {index < steps.length - 1 ? (
                  <path
                    d={`M${x + 278} 88 H${x + 302}`}
                    stroke="var(--text-secondary)"
                    strokeWidth="2"
                  />
                ) : null}
              </g>
            );
          })}
          <text
            x="480"
            y="178"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            查找边界决定“能否找到”，调用限定决定“谁来执行”
          </text>
        </svg>
      </div>
    </figure>
  );
}
