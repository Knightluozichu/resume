"use client";

import { useState } from "react";

const OFFICIAL_CONCEPT_LABELS = [
  "type conversions apply to all parameters",
  "non-member function",
  "implicit conversion",
  "operator*",
  "乘法操作符",
] as const;

type ConversionCell = readonly [
  expression: string,
  candidate: string,
  outcome: string,
];

function ConversionGrid({
  ariaLabel,
  caption,
  cells,
}: {
  ariaLabel: string;
  caption: string;
  cells: readonly ConversionCell[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={`${ariaLabel}：${OFFICIAL_CONCEPT_LABELS.join("、")}`}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cells.map(([expression, candidate, outcome], index) => (
            <section
              key={expression}
              className="min-h-40 border border-border bg-bg/40 p-4"
            >
              <span className="text-xs tabular-nums text-secondary">
                0{index + 1}
              </span>
              <strong className="mt-3 block text-sm text-primary">
                {expression}
              </strong>
              <code className="mt-3 block text-xs text-accent">
                {candidate}
              </code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {outcome}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        {caption}
      </figcaption>
    </figure>
  );
}

const memberCells = [
  [
    "r * 2",
    "r.operator*(2)",
    "receiver 已是 Rational，右参数可由 int 隐式转换。",
  ],
  [
    "2 * r",
    "2.operator*(r)",
    "左侧 int 没有该 member，候选建立前不能先变 receiver。",
  ],
  ["r * Rational{2}", "member exact", "显式构造右参数后两侧类型匹配。"],
  ["Rational{2} * r", "member exact", "显式构造左 receiver 后调用成立。"],
  [
    "Asymmetry",
    "lhs != rhs rules",
    "数学对称操作因 this 隐藏参数而具有不同转换待遇。",
  ],
  [
    "Repair",
    "free operator*(lhs,rhs)",
    "两侧都成为普通参数，使用同一候选转换规则。",
  ],
] as const;

const candidateCells = [
  ["Parse", "2 * r", "构造二元 operator 表达式并收集可见候选。"],
  [
    "ADL",
    "namespace rational",
    "Rational 参数使其 namespace free operator 进入集合。",
  ],
  ["Bind rhs", "const Rational&", "r 精确匹配右参数。"],
  [
    "Convert lhs",
    "2 -> Rational{2}",
    "非 explicit converting constructor 提供用户定义转换。",
  ],
  [
    "Invoke",
    "operator*(Rational,Rational)",
    "两个普通参数绑定后执行领域乘法。",
  ],
  ["Return", "Rational value", "结果按值返回，不泄漏 operand 或 ownership。"],
] as const;

const policyCells = [
  [
    "Lossless domain value",
    "implicit maybe",
    "如整数到有理数，语义唯一且不丢信息。",
  ],
  [
    "Unit/context required",
    "explicit/named",
    "货币、角度、时间单位不能静默猜测。",
  ],
  ["Narrowing", "reject", "范围或精度损失必须显式检查并报告失败。"],
  ["Mutating operation", "member +=", "左对象身份被修改，不要求两侧完全对称。"],
  ["Symmetric value op", "free * / +", "两侧地位相同并允许相同安全转换。"],
  [
    "Template deduction",
    "overload/concept",
    "推导阶段不靠用户转换，需单独设计泛型入口。",
  ],
] as const;

export function EcppMemberConversionAsymmetryMap() {
  return (
    <ConversionGrid
      ariaLabel="有理数乘整数整数乘有理数显式左右不对称修复六项成员转换图"
      caption="member operator 把左 operand 隐藏为 this；右参数可转换，并不意味着左 receiver 也有同等待遇。"
      cells={memberCells}
    />
  );
}

export function EcppNonMemberCandidateFlowMap() {
  return (
    <ConversionGrid
      ariaLabel="解析参数相关查找绑定右侧转换左侧调用返回六阶段非成员候选流程图"
      caption="non-member function 让左右 operands 都成为普通参数，候选收集后可对两侧应用相同转换规则。"
      cells={candidateCells}
    />
  );
}

export function EcppConversionPolicyDecisionMap() {
  return (
    <ConversionGrid
      ariaLabel="无损值单位上下文窄化修改操作对称操作模板推导六类转换策略图"
      caption="函数位置只解决参数对称性；是否允许 implicit conversion 仍必须由领域信息损失和歧义决定。"
      cells={policyCells}
    />
  );
}

const LAB_SCENARIOS = [
  {
    id: 1,
    label: "对称值运算",
    tone: "var(--success)",
    title: "Rational * int 与 int * Rational 都进入同一 non-member candidate",
    evidence:
      "operator*=member → operator*=free → lhs/rhs=ordinary-parameters → safe-conversion",
    decision: "accept：两侧转换规则对称",
  },
  {
    id: 2,
    label: "显式边界",
    tone: "var(--warning)",
    title: "Money 缺少 currency，implicit conversion 会猜测单位",
    evidence:
      "Money + int → unit=unknown → implicit=unsafe → explicit/named-factory",
    decision: "review：保留 explicit conversion boundary",
  },
  {
    id: 3,
    label: "成员不对称",
    tone: "var(--danger)",
    title: "member operator* 让右参数可转换，却不能先转换左 receiver",
    evidence:
      "2 * r → lookup=int-member → candidate=missing → conversion=not-before-lookup",
    decision: "fail：改用同 namespace non-member function",
  },
] as const;

export function EcppItem24ConversionLab() {
  const [scenarioId, setScenarioId] = useState(1);
  const scenario =
    LAB_SCENARIOS.find((item) => item.id === scenarioId) ?? LAB_SCENARIOS[0];

  return (
    <section
      className="my-8 rounded-card border border-border bg-elevated p-5"
      data-visual-kind="ecpp-item-24-conversion-lab"
      aria-label="Effective C++ Item 24 类型转换与非成员函数实验"
      aria-labelledby="ecpp-item-24-lab-title"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Lab
          </p>
          <h3
            id="ecpp-item-24-lab-title"
            className="mt-1 text-lg font-semibold text-primary"
          >
            Item 24 转换对称性实验
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-secondary">
            先预测候选、转换和封装边界，再切换对称值运算、显式单位和成员不对称样本。
          </p>
        </div>
        <button
          type="button"
          className="min-h-11 rounded-button border border-border px-3 py-2 text-sm text-secondary transition hover:border-accent hover:text-accent"
          onClick={() => setScenarioId(1)}
          aria-label="重置实验"
        >
          重置实验
        </button>
      </div>
      <div
        className="mt-5 grid gap-3 sm:grid-cols-3"
        role="tablist"
        aria-label="Item 24 转换实验场景选择"
      >
        {LAB_SCENARIOS.map((item) => {
          const selected = item.id === scenarioId;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-pressed={selected}
              className={`min-h-11 rounded-button border px-3 py-2 text-left text-sm transition ${
                selected
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-secondary hover:border-accent hover:text-accent"
              }`}
              onClick={() => setScenarioId(item.id)}
            >
              <span className="block font-semibold">{item.label}</span>
              <span className="mt-1 block text-xs opacity-80">
                样本 {item.id}
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto]">
        <div className="rounded-card border border-border p-4">
          <div className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: scenario.tone }}
            />
            <p className="font-semibold text-primary">{scenario.title}</p>
          </div>
          <p className="mt-3 break-words font-mono text-xs text-secondary">
            {scenario.evidence}
          </p>
        </div>
        <div className="rounded-card border border-border p-4 md:min-w-64">
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
            判定
          </p>
          <p
            className="mt-2 text-sm font-semibold"
            style={{ color: scenario.tone }}
          >
            {scenario.decision}
          </p>
        </div>
      </div>
      <p
        className="mt-4 text-xs text-secondary"
        role="status"
        aria-live="polite"
      >
        当前样本：{scenario.label}；保存表达式、候选、conversion sequence、单位假设与复位轨迹。
      </p>
    </section>
  );
}
