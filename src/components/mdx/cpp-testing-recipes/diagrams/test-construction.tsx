"use client";

import { useState } from "react";

const organizationLayers = [
  { layer: "test case", purpose: "一个可命名行为或边界", cadence: "编辑后立即运行", signal: "精确失败差值", className: "border-cyan-500/35 bg-cyan-500/10" },
  { layer: "suite / fixture", purpose: "同一行为边界的共同 setup", cadence: "每个红绿循环", signal: "局部回归", className: "border-emerald-500/35 bg-emerald-500/10" },
  { layer: "fast unit set", purpose: "不依赖进程外资源的全部单元测试", cadence: "每几分钟", signal: "设计安全网", className: "border-amber-500/35 bg-amber-500/10" },
  { layer: "slow integration set", purpose: "文件、数据库、网络与进程组合", cadence: "提交前与 CI", signal: "边界集成证据", className: "border-violet-500/35 bg-violet-500/10" },
] as const;

export function CtrTestOrganizationMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="从测试用例套件到快速单元集和慢速集成集的组织与运行节奏" className="grid gap-3 md:grid-cols-2">
          {organizationLayers.map((item, index) => (
            <section key={item.layer} className={`min-h-56 border p-4 ${item.className}`}>
              <span className="text-xs text-secondary">scope 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{item.layer}</strong>
              <p className="mb-0 mt-4 text-xs text-primary">{item.purpose}</p>
              <p className="mb-0 mt-4 text-xs text-secondary">cadence · {item.cadence}</p>
              <p className="mb-0 mt-2 text-xs text-accent">signal · {item.signal}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        过滤器用于缩短局部反馈，套件用于表达行为边界；慢测试必须分层，但不能从持续集成中消失。
      </figcaption>
    </figure>
  );
}

const assertionGates = [
  { gate: "observable", question: "断言是否观察公开结果而非执行步骤？", bad: "EXPECT_TRUE(result == expected)", better: "EXPECT_EQ(expected, result)" },
  { gate: "specific", question: "失败能否同时显示期望与实际？", bad: "ASSERT_TRUE(order.valid())", better: "EXPECT_THAT(errors, IsEmpty())" },
  { gate: "continuation", question: "失败后后续检查还有诊断价值吗？", bad: "所有条件都 ASSERT", better: "必要前置用 ASSERT，其余用 EXPECT" },
  { gate: "domain", question: "比较是否符合浮点、集合或异常语义？", bad: "浮点直接 ==", better: "EXPECT_NEAR / matcher / EXPECT_THROW" },
] as const;

export function CtrAssertionDiagnosticFlow() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="断言从可观察行为到具体差值继续策略和领域比较的诊断闸门" className="space-y-3">
          {assertionGates.map((item, index) => (
            <section key={item.gate} className="grid min-h-32 gap-3 border border-border bg-background/60 p-4 lg:grid-cols-[0.45fr_1.25fr_0.9fr_1fr] lg:items-center">
              <div><span className="text-xs text-secondary">gate 0{index + 1}</span><strong className="mt-2 block text-sm text-primary">{item.gate}</strong></div>
              <span className="text-xs text-primary">{item.question}</span>
              <code className="break-words text-xs text-rose-300">avoid · {item.bad}</code>
              <code className="break-words text-xs text-emerald-300">prefer · {item.better}</code>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        好断言不只判真假，还要在失败时保留期望、实际和领域语义，减少二次调试。
      </figcaption>
    </figure>
  );
}

const parameterCases = [
  { label: "稳定映射", example: "B/F/P/V 都映射为 1", verdict: "适合参数化", reason: "同一成熟规则只有输入输出数据变化", form: "Values((B,1), (F,1), (P,1), (V,1))" },
  { label: "新边界", example: "首次定义空字符串行为", verdict: "先写命名测试", reason: "它会推动 API 契约，不能藏在数据表一行", form: "RejectsEmptyInput" },
  { label: "多种失败", example: "无效输入、依赖超时、权限拒绝", verdict: "分成独立测试", reason: "原因、恢复和诊断不同，不是同一参数维度", form: "三个领域名称" },
  { label: "组合爆炸", example: "4 个参数各 10 个值", verdict: "先做等价类", reason: "笛卡尔积不是设计覆盖，应选代表与边界", form: "代表例 + 性质测试" },
] as const;

export function CtrParameterizedTestLab() {
  const [active, setActive] = useState(0);
  const current = parameterCases[active];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择参数化测试情形" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {parameterCases.map((item, index) => (
            <button key={item.label} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)} className={`min-h-11 border px-3 py-2 text-sm transition-colors ${active === index ? "border-accent bg-accent/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>
              {item.label}
            </button>
          ))}
        </div>
        <section role="tabpanel" className="mt-4 min-h-72 border border-border bg-background/60 p-4 sm:p-5">
          <span className="text-xs text-secondary">example · {current.example}</span>
          <strong className="mt-3 block text-base text-primary">{current.verdict}</strong>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="min-h-36 border border-amber-500/35 bg-amber-500/10 p-4"><span className="text-xs text-secondary">理由</span><p className="mb-0 mt-3 text-xs text-primary">{current.reason}</p></div>
            <div className="min-h-36 border border-cyan-500/35 bg-cyan-500/10 p-4"><span className="text-xs text-secondary">结构</span><code className="mt-3 block break-words text-xs text-accent">{current.form}</code></div>
          </div>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        参数化适合压缩已经理解的同一规则；正在推动新设计的边界应先拥有清晰的独立名称。
      </figcaption>
    </figure>
  );
}
