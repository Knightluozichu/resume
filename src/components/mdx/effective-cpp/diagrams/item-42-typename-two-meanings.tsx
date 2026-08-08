"use client";

import { useState } from "react";

type TypenameContext = {
  id: string;
  label: string;
  code: string;
  answer: string;
  reason: string;
  tone: "accent" | "success" | "warning";
};

const CONTEXTS: readonly TypenameContext[] = [
  {
    id: "local",
    label: "函数体声明",
    code: "typename C::const_iterator iter;",
    answer: "需要 typename",
    reason: "普通声明没有预先保证末尾名称是类型，parser 需要消歧提示。",
    tone: "accent",
  },
  {
    id: "base",
    label: "base-specifier",
    code: "class D : public Base<T>::Nested {};",
    answer: "不写 typename",
    reason: "base-specifier grammar 已经要求这里出现 base type。",
    tone: "success",
  },
  {
    id: "initializer",
    label: "mem-initializer",
    code: ": Base<T>::Nested(value) {}",
    answer: "不写 typename",
    reason: "mem-initializer 位置也已由 grammar 确定它在初始化 base。",
    tone: "warning",
  },
] as const;

const TONE_COLORS = {
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
} as const;

export function EcppTypenameMeaningMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-8">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 980 370"
          role="img"
          aria-label="typename 双重含义地图：template parameter list 中 typename 与 class 等价；dependent qualified name 在普通声明中需要 typename，而 base list 与 mem-initializer 已经由 grammar 确定为类型位置。"
          className="mx-auto block h-auto w-full max-w-[980px]"
        >
          <text
            x="490"
            y="30"
            textAnchor="middle"
            fontSize="19"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            typename 的两条路径
          </text>
          <text
            x="490"
            y="55"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            先看它出现在哪个 grammar context，再决定是否承担消歧职责
          </text>

          <rect
            x="32"
            y="88"
            width="274"
            height="112"
            rx="12"
            fill="var(--accent)"
            fillOpacity="0.1"
            stroke="var(--accent)"
            strokeWidth="1.6"
          />
          <text
            x="169"
            y="120"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--accent)"
          >
            template parameter list
          </text>
          <text
            x="169"
            y="153"
            textAnchor="middle"
            fontSize="14"
            fill="var(--text-primary)"
          >
            class T ≡ typename T
          </text>
          <text
            x="169"
            y="179"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            两者都是 type parameter
          </text>

          <path
            d="M314 144 H342"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />
          <path
            d="M334 137 L346 144 L334 151"
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />

          <rect
            x="354"
            y="88"
            width="274"
            height="112"
            rx="12"
            fill="var(--warning)"
            fillOpacity="0.1"
            stroke="var(--warning)"
            strokeWidth="1.6"
          />
          <text
            x="491"
            y="120"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--warning)"
          >
            dependent qualified name
          </text>
          <text
            x="491"
            y="153"
            textAnchor="middle"
            fontSize="14"
            fill="var(--text-primary)"
          >
            C::const_iterator
          </text>
          <text
            x="491"
            y="179"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            未知 specialization 可能给它不同含义
          </text>

          <path
            d="M636 144 H664"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />
          <path
            d="M656 137 L668 144 L656 151"
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />

          <rect
            x="676"
            y="88"
            width="272"
            height="112"
            rx="12"
            fill="var(--success)"
            fillOpacity="0.1"
            stroke="var(--success)"
            strokeWidth="1.6"
          />
          <text
            x="812"
            y="120"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--success)"
          >
            typename disambiguation
          </text>
          <text
            x="812"
            y="153"
            textAnchor="middle"
            fontSize="14"
            fill="var(--text-primary)"
          >
            typename C::const_iterator
          </text>
          <text
            x="812"
            y="179"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            明确把名称当作 type
          </text>

          <line
            x1="32"
            y1="244"
            x2="948"
            y2="244"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="6 4"
          />
          <text
            x="490"
            y="274"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            位置例外：grammar 已经提供 type 证据
          </text>
          <text
            x="170"
            y="312"
            textAnchor="middle"
            fontSize="13"
            fill="var(--success)"
          >
            base-specifier：不写
          </text>
          <text
            x="490"
            y="312"
            textAnchor="middle"
            fontSize="13"
            fill="var(--success)"
          >
            mem-initializer：不写
          </text>
          <text
            x="810"
            y="312"
            textAnchor="middle"
            fontSize="13"
            fill="var(--accent)"
          >
            function body：通常要写
          </text>
          <text
            x="490"
            y="348"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            关键不是看到 :: 就添加关键字，而是判断当前位置是否已经锁定为类型语法
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        typename 既可以是参数列表里的关键词，也可以是 dependent name
        的类型消歧提示；上下文决定第二种用法是否需要它。
      </figcaption>
    </figure>
  );
}

export function EcppTypenameContextLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = CONTEXTS[activeIndex];
  const tone = TONE_COLORS[active.tone];

  return (
    <section
      aria-label="Item 42 typename 上下文实验"
      data-visual-kind="ecpp-item-42-typename-context-lab"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">typename 位置实验</p>
          <h2 className="mt-1 text-lg font-semibold text-primary">
            先预测：这个 dependent name 要不要 typename？
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
            选择同一个 dependent base name 出现的位置，观察 grammar
            已经提供了多少类型证据。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 Item 42 typename 上下文实验"
          onClick={() => setActiveIndex(0)}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置实验
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div
          role="tablist"
          aria-label="typename 语法位置"
          className="grid gap-2 md:grid-cols-3"
        >
          {CONTEXTS.map((context, index) => {
            const selected = index === activeIndex;
            return (
              <button
                key={context.id}
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
                <span className="block font-semibold">{context.label}</span>
                <span className="mt-1 block text-xs opacity-80">
                  {context.answer}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-4">
        <figure className="mdx-figure not-prose m-0">
          <div className="overflow-hidden rounded-control border border-border bg-bg p-2 sm:p-3">
            <svg
              viewBox="0 0 640 260"
              role="img"
              aria-label={`${active.label} 代码位置：${active.code}；结论：${active.answer}。`}
              className="mx-auto block h-auto w-full max-w-[640px]"
            >
              <text
                x="320"
                y="32"
                textAnchor="middle"
                fontSize="15"
                fontWeight="700"
                fill="var(--text-primary)"
              >
                {active.label}
              </text>
              <rect
                x="32"
                y="64"
                width="576"
                height="74"
                rx="10"
                fill={tone}
                fillOpacity="0.1"
                stroke={tone}
                strokeWidth="1.6"
              />
              <text
                x="320"
                y="108"
                textAnchor="middle"
                fontSize="15"
                fill="var(--text-primary)"
              >
                {active.code}
              </text>
              <path d="M320 150 V178" stroke={tone} strokeWidth="2" />
              <path
                d="M313 170 L320 182 L327 170"
                fill="none"
                stroke={tone}
                strokeWidth="2"
              />
              <text
                x="320"
                y="212"
                textAnchor="middle"
                fontSize="17"
                fontWeight="700"
                fill={tone}
              >
                {active.answer}
              </text>
              <text
                x="320"
                y="238"
                textAnchor="middle"
                fontSize="12"
                fill="var(--text-secondary)"
              >
                grammar evidence → typename decision
              </text>
            </svg>
          </div>
        </figure>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div
            role="status"
            aria-live="polite"
            className="rounded-control border border-border bg-bg p-4"
          >
            <p className="text-xs font-medium text-accent">当前判断</p>
            <p className="mt-2 text-base font-semibold text-primary">
              {active.answer}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-secondary">
              {active.reason}
            </p>
          </div>
          <p className="text-sm leading-relaxed text-primary">
            解释时要说出“为什么”，而不只是背下关键字清单：同一个名字离开 base
            grammar 进入普通声明后，规则会重新变成 dependent type 的消歧问题。
          </p>
        </div>
      </div>
    </section>
  );
}

export function EcppTypenameDiagnosticFlow() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-8">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 960 330"
          role="img"
          aria-label="dependent name 诊断流程：先判断 qualified，再判断是否 dependent，最后判断当前位置是否需要 type；base list 和 mem-initializer 是 grammar 例外，实例化还要验证 specialization 真的提供 nested type。"
          className="mx-auto block h-auto w-full max-w-[960px]"
        >
          <text
            x="480"
            y="30"
            textAnchor="middle"
            fontSize="19"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            dependent name 编译诊断流程
          </text>
          <text
            x="480"
            y="55"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            语法消歧和 specialization 事实验证是两个连续阶段
          </text>

          <g>
            <rect
              x="24"
              y="92"
              width="196"
              height="104"
              rx="12"
              fill="var(--accent)"
              fillOpacity="0.1"
              stroke="var(--accent)"
              strokeWidth="1.6"
            />
            <text
              x="122"
              y="126"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill="var(--accent)"
            >
              1. qualified?
            </text>
            <text
              x="122"
              y="157"
              textAnchor="middle"
              fontSize="13"
              fill="var(--text-primary)"
            >
              A::B / T::value_type
            </text>
            <text
              x="122"
              y="181"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-secondary)"
            >
              没有 :: 就不走此流程
            </text>
          </g>
          <path
            d="M228 144 H254"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />
          <path
            d="M246 137 L258 144 L246 151"
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />

          <g>
            <rect
              x="270"
              y="92"
              width="196"
              height="104"
              rx="12"
              fill="var(--warning)"
              fillOpacity="0.1"
              stroke="var(--warning)"
              strokeWidth="1.6"
            />
            <text
              x="368"
              y="126"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill="var(--warning)"
            >
              2. dependent?
            </text>
            <text
              x="368"
              y="157"
              textAnchor="middle"
              fontSize="13"
              fill="var(--text-primary)"
            >
              qualifier 依赖 T / C
            </text>
            <text
              x="368"
              y="181"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-secondary)"
            >
              未知 specialization 才会带来歧义
            </text>
          </g>
          <path
            d="M474 144 H500"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />
          <path
            d="M492 137 L504 144 L492 151"
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />

          <g>
            <rect
              x="516"
              y="92"
              width="196"
              height="104"
              rx="12"
              fill="var(--success)"
              fillOpacity="0.1"
              stroke="var(--success)"
              strokeWidth="1.6"
            />
            <text
              x="614"
              y="126"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill="var(--success)"
            >
              3. 要当 type？
            </text>
            <text
              x="614"
              y="157"
              textAnchor="middle"
              fontSize="13"
              fill="var(--text-primary)"
            >
              local / alias → typename
            </text>
            <text
              x="614"
              y="181"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-secondary)"
            >
              base grammar → 不加
            </text>
          </g>
          <path
            d="M720 144 H746"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />
          <path
            d="M738 137 L750 144 L738 151"
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />

          <g>
            <rect
              x="762"
              y="92"
              width="174"
              height="104"
              rx="12"
              fill="var(--danger)"
              fillOpacity="0.1"
              stroke="var(--danger)"
              strokeWidth="1.6"
            />
            <text
              x="849"
              y="126"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill="var(--danger)"
            >
              4. instantiate
            </text>
            <text
              x="849"
              y="157"
              textAnchor="middle"
              fontSize="13"
              fill="var(--text-primary)"
            >
              nested type 存在？
            </text>
            <text
              x="849"
              y="181"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-secondary)"
            >
              typename 不会创造类型
            </text>
          </g>

          <line
            x1="24"
            y1="238"
            x2="936"
            y2="238"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="6 4"
          />
          <text
            x="480"
            y="270"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            若尖括号歧义来自 dependent member template，切换到 template
            disambiguator
          </text>
          <text
            x="480"
            y="300"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            typename 说明“这是类型”｜template
            说明“这是模板”｜两者可以出现在同一条复杂名称中
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        诊断顺序把 parser 的问题和实例化后的事实问题分开：先消歧，再确认
        specialization 的契约。
      </figcaption>
    </figure>
  );
}
