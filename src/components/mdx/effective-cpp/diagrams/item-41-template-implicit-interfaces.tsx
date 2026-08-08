"use client";

import { useState } from "react";

const OFFICIAL_CONCEPT_LABELS = [
  "implicit interfaces",
  "compile-time polymorphism",
  "templates",
  "valid expressions",
] as const;

type ExpressionState = "pass" | "check" | "fail";

type Scenario = {
  label: string;
  kind: string;
  summary: string;
  boundary: string;
  expressions: readonly ExpressionState[];
  observations: readonly string[];
};

const EXPRESSION_LABELS = [
  ["size()", "> 10"],
  ["operator!=", "sentinel"],
  ["T temp", "(value)"],
  ["normalize()", "body call"],
  ["swap", "ADL / member"],
] as const;

const SCENARIOS: readonly Scenario[] = [
  {
    label: "Widget",
    kind: "共同 base 的显式接口",
    summary: "class declarations 描述名称；virtual dispatch 在运行期选行为。",
    boundary: "runtime polymorphism：入口接口先写在 class 声明里。",
    expressions: ["pass", "pass", "pass", "pass", "pass"],
    observations: [
      "client 看到的是 explicit interface",
      "每个 expression 仍然要在调用处成立",
    ],
  },
  {
    label: "ImageBatch",
    kind: "proxy + ADL 的隐式接口",
    summary: "返回 proxy 也可以参与 >；非成员 swap 可经 ADL 被找到。",
    boundary: "compile-time polymorphism：实例化时为 ImageBatch 选择表达式。",
    expressions: ["check", "pass", "pass", "pass", "pass"],
    observations: [
      "valid expressions 不等于固定 member signature",
      "expression-derived requirement 只记录正文真正消费的结果",
    ],
  },
  {
    label: "Unprocessable",
    kind: "缺少 normalize 的负例",
    summary: "前面的表达式可能通过，但实例化走到 normalize() 时边界失败。",
    boundary: "instantiation diagnostic stack：把错误收敛到缺失的 expression。",
    expressions: ["pass", "pass", "pass", "fail", "check"],
    observations: [
      "concept 可以把失败提前到候选选择处",
      "语法通过仍需 semantic contract 与运行测试",
    ],
  },
] as const;

const STATUS_COPY: Record<ExpressionState, string> = {
  pass: "通过",
  check: "继续检查",
  fail: "失败边界",
};

const STATUS_COLOR: Record<ExpressionState, string> = {
  pass: "var(--success)",
  check: "var(--warning)",
  fail: "var(--danger)",
};

export function EcppItem41ImplicitInterfaceLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = SCENARIOS[activeIndex];

  const reset = () => setActiveIndex(0);

  return (
    <section
      aria-label={`Item 41 隐式接口实验：${OFFICIAL_CONCEPT_LABELS.join("、")}`}
      data-visual-kind="ecpp-item-41-implicit-interface-lab"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">模板契约实验</p>
          <h2 className="mt-1 text-lg font-semibold text-primary">
            先预测：哪一个 valid expression 会决定边界？
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
            切换具体类型，观察 templates 的 implicit interface
            如何在实例化时形成 compile-time polymorphism；最后把语法通过与
            semantic contract 分开。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 Item 41 隐式接口实验"
          onClick={reset}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置实验
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div
          role="tablist"
          aria-label="Item 41 隐式接口场景"
          className="grid gap-2 md:grid-cols-3"
        >
          {SCENARIOS.map((scenario, index) => {
            const selected = index === activeIndex;
            return (
              <button
                key={scenario.label}
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
                <span className="block font-semibold">{scenario.label}</span>
                <span className="mt-1 block text-xs opacity-80">
                  {scenario.kind}
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
              viewBox="0 0 960 450"
              role="img"
              aria-label={`Item 41 ${active.label} 场景：${active.summary} 五个 valid expressions 的状态依次为 ${active.expressions.map((state) => STATUS_COPY[state]).join("、")}。`}
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
                template body → expression set → compile-time boundary
              </text>
              <text
                x="480"
                y="53"
                textAnchor="middle"
                fontSize="12"
                fill="var(--text-secondary)"
              >
                {active.label}：{active.kind}
              </text>

              <rect
                x="24"
                y="88"
                width="190"
                height="142"
                rx="12"
                fill="var(--accent)"
                fillOpacity="0.1"
                stroke="var(--accent)"
                strokeWidth="1.6"
              />
              <text
                x="119"
                y="116"
                textAnchor="middle"
                fontSize="15"
                fontWeight="700"
                fill="var(--accent)"
              >
                template body
              </text>
              <text
                x="119"
                y="147"
                textAnchor="middle"
                fontSize="12"
                fill="var(--text-primary)"
              >
                value.size()
              </text>
              <text
                x="119"
                y="169"
                textAnchor="middle"
                fontSize="12"
                fill="var(--text-primary)"
              >
                T temp(value)
              </text>
              <text
                x="119"
                y="191"
                textAnchor="middle"
                fontSize="12"
                fill="var(--text-primary)"
              >
                normalize / swap
              </text>
              <text
                x="119"
                y="215"
                textAnchor="middle"
                fontSize="11"
                fill="var(--text-secondary)"
              >
                使用点定义 implicit interface
              </text>

              <line
                x1="220"
                y1="158"
                x2="240"
                y2="158"
                stroke="var(--text-secondary)"
                strokeWidth="2"
              />
              <path
                d="M234 151 L244 158 L234 165"
                fill="none"
                stroke="var(--text-secondary)"
                strokeWidth="2"
              />

              {EXPRESSION_LABELS.map(([top, bottom], index) => {
                const x = 248 + index * 137;
                const state = active.expressions[index];
                const color = STATUS_COLOR[state];
                return (
                  <g key={top}>
                    <rect
                      x={x}
                      y="96"
                      width="121"
                      height="124"
                      rx="10"
                      fill={color}
                      fillOpacity="0.1"
                      stroke={color}
                      strokeWidth="1.6"
                    />
                    <circle cx={x + 18} cy="117" r="6" fill={color} />
                    <text
                      x={x + 31}
                      y="121"
                      fontSize="11"
                      fontWeight="700"
                      fill={color}
                    >
                      {STATUS_COPY[state]}
                    </text>
                    <text
                      x={x + 60.5}
                      y="155"
                      textAnchor="middle"
                      fontSize="14"
                      fontWeight="700"
                      fill="var(--text-primary)"
                    >
                      {top}
                    </text>
                    <text
                      x={x + 60.5}
                      y="178"
                      textAnchor="middle"
                      fontSize="12"
                      fill="var(--text-secondary)"
                    >
                      {bottom}
                    </text>
                    <text
                      x={x + 60.5}
                      y="204"
                      textAnchor="middle"
                      fontSize="11"
                      fill={color}
                    >
                      expression #{index + 1}
                    </text>
                  </g>
                );
              })}

              <rect
                x="24"
                y="270"
                width="912"
                height="140"
                rx="12"
                fill="var(--success)"
                fillOpacity="0.07"
                stroke="var(--border)"
                strokeWidth="1.4"
              />
              <text
                x="48"
                y="300"
                fontSize="14"
                fontWeight="700"
                fill="var(--text-primary)"
              >
                观察边界
              </text>
              <text x="48" y="329" fontSize="13" fill="var(--text-primary)">
                {active.boundary}
              </text>
              <text x="48" y="360" fontSize="12" fill="var(--text-secondary)">
                {active.observations[0]}
              </text>
              <text x="48" y="385" fontSize="12" fill="var(--text-secondary)">
                {active.observations[1]}
              </text>
              <text
                x="910"
                y="386"
                textAnchor="end"
                fontSize="12"
                fontWeight="700"
                fill="var(--success)"
              >
                {active.expressions.filter((state) => state === "pass").length}
                /5 expressions pass
              </text>
            </svg>
          </div>
          <figcaption className="mt-2 text-center text-sm text-secondary">
            交互图把 template body 的真实使用点展开为 valid
            expressions；切换场景即可对比 explicit interface、implicit interface
            和 compile-time polymorphism。
          </figcaption>
        </figure>

        <div
          className="mt-4 rounded-control border border-border bg-elevated p-4"
          role="status"
          aria-live="polite"
        >
          <p className="text-xs font-medium text-accent">
            当前观察 · {active.label}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-primary">
            {active.summary}
          </p>
        </div>
      </div>
    </section>
  );
}
