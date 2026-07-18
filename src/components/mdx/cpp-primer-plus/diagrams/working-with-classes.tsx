"use client";

import { useState } from "react";

const operatorRows = [
  { syntax: "a + b", member: "a.operator+(b)", nonmember: "operator+(a, b)", design: "choose one coherent semantic" },
  { syntax: "a += b", member: "a.operator+=(b)", nonmember: "rarely useful", design: "mutation belongs to left operand" },
  { syntax: "out << value", member: "out.operator<<(value)", nonmember: "operator<<(out, value)", design: "class value cannot be left operand" },
  { syntax: "scalar * vector", member: "scalar.operator*(vector)", nonmember: "operator*(scalar, vector)", design: "nonmember restores symmetry" },
] as const;

export function EppOperatorDispatchMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="运算符表达式到成员和非成员候选函数的分派地图" className="space-y-3">
          {operatorRows.map((row) => (
            <section key={row.syntax} className="grid min-h-32 gap-3 border border-border bg-background/60 p-4 lg:grid-cols-[0.7fr_1fr_1.1fr_1.25fr] lg:items-center">
              <code className="text-sm text-accent">{row.syntax}</code>
              <span className="break-words text-xs text-primary">member · {row.member}</span>
              <span className="break-words text-xs text-primary">nonmember · {row.nonmember}</span>
              <span className="text-xs text-secondary">decision · {row.design}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        重载不会创造新运算符；它只把既有语法映射到候选函数，操作数顺序仍决定可用转换和对称性。
      </figcaption>
    </figure>
  );
}

const friendRows = [
  { stage: "expression", evidence: "2.0 * v", boundary: "left operand is double", result: "member of Vector cannot start lookup" },
  { stage: "candidate", evidence: "operator*(double, const Vector&)", boundary: "nonmember owns both parameters", result: "natural operand order preserved" },
  { stage: "access", evidence: "friend declaration inside Vector", boundary: "grants private access only", result: "function is still not a member" },
  { stage: "delegation", evidence: "return v * scalar", boundary: "reuse canonical member operation", result: "one arithmetic implementation" },
] as const;

export function EppFriendSymmetryFlow() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="友元非成员函数恢复标量乘向量对称语法的流程" className="grid gap-3 lg:grid-cols-4">
          {friendRows.map((row, index) => (
            <section key={row.stage} className="min-h-64 border border-emerald-500/35 bg-emerald-500/10 p-4">
              <span className="text-xs text-secondary">step 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{row.stage}</strong>
              <code className="mt-4 block break-words text-xs text-accent">{row.evidence}</code>
              <p className="mt-4 text-xs text-primary">boundary · {row.boundary}</p>
              <p className="mb-0 mt-3 text-xs text-secondary">result · {row.result}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        friend 是最窄访问授权，不是封装豁免；能通过公有接口实现的非成员函数通常无需成为 friend。
      </figcaption>
    </figure>
  );
}

const conversionCases = [
  { label: "implicit ctor", declaration: "Distance(double)", call: "travel(3.5)", outcome: "accepted: temporary Distance", risk: "units hidden at call site" },
  { label: "explicit ctor", declaration: "explicit Distance(double)", call: "travel(3.5)", outcome: "rejected: write Distance{3.5}", risk: "intent becomes visible" },
  { label: "conversion op", declaration: "operator double() const", call: "double d = distance", outcome: "accepted: representation escapes", risk: "competes in overload resolution" },
  { label: "named access", declaration: "double meters() const", call: "double d = distance.meters()", outcome: "accepted: unit named", risk: "more verbose, locally explicit" },
] as const;

export function EppConversionPolicyLab() {
  const [active, setActive] = useState(0);
  const current = conversionCases[active];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择类类型转换策略" className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          {conversionCases.map((item, index) => (
            <button key={item.label} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)} className={`min-h-14 border px-3 py-2 text-xs transition-colors ${active === index ? "border-accent bg-accent/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>{item.label}</button>
          ))}
        </div>
        <section role="tabpanel" className="mt-4 min-h-80 border border-border bg-background/60 p-4 sm:p-5">
          <code className="block break-words text-sm text-accent">{current.declaration}</code>
          <div className="mt-5 grid gap-3 lg:grid-cols-3">
            <div className="min-h-36 border border-cyan-500/35 bg-cyan-500/10 p-4"><strong className="text-sm text-primary">call</strong><code className="mt-3 block break-words text-xs text-secondary">{current.call}</code></div>
            <div className="min-h-36 border border-emerald-500/35 bg-emerald-500/10 p-4"><strong className="text-sm text-primary">outcome</strong><p className="mb-0 mt-3 text-xs text-secondary">{current.outcome}</p></div>
            <div className="min-h-36 border border-amber-500/35 bg-amber-500/10 p-4"><strong className="text-sm text-primary">tradeoff</strong><p className="mb-0 mt-3 text-xs text-secondary">{current.risk}</p></div>
          </div>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        转换是 API 策略：越隐式越方便，也越可能隐藏单位、损失信息并扩张重载候选集。
      </figcaption>
    </figure>
  );
}
