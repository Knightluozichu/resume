"use client";

import { useState } from "react";

const systemLayers = [
  { layer: "individual loop", mechanism: "test list · red/green/refactor", evidence: "cycle time · clear failures", owner: "developer/pair", className: "border-cyan-500/35 bg-cyan-500/10" },
  { layer: "team learning", mechanism: "pairing · review · kata · dojo", evidence: "shared vocabulary · rotation", owner: "team", className: "border-emerald-500/35 bg-emerald-500/10" },
  { layer: "delivery gate", mechanism: "CI · deterministic suites · quarantine repair", evidence: "green main · time trends", owner: "maintainers", className: "border-amber-500/35 bg-amber-500/10" },
  { layer: "community", mechanism: "standards · retrospectives · external practice", evidence: "updated conventions · experiments", owner: "organization/community", className: "border-violet-500/35 bg-violet-500/10" },
] as const;

export function CtrSustainableTddSystemMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="可持续 TDD 从个人循环团队学习交付门禁到社区的系统地图" className="grid gap-3 md:grid-cols-2">
          {systemLayers.map((item, index) => (
            <section key={item.layer} className={`min-h-60 border p-4 ${item.className}`}>
              <span className="text-xs text-secondary">layer 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{item.layer}</strong>
              <code className="mt-4 block break-words text-xs text-accent">{item.mechanism}</code>
              <p className="mb-0 mt-4 text-xs text-primary">evidence · {item.evidence}</p>
              <p className="mb-0 mt-3 text-xs text-secondary">owner · {item.owner}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        TDD 能否持续由个人技巧、团队学习、交付门禁和外部交流共同决定，不能只靠要求“多写测试”。
      </figcaption>
    </figure>
  );
}

const spiralSteps = [
  { step: "slow/brittle", effect: "测试慢、随机且绑定实现", response: "开发者减少运行" },
  { step: "late failures", effect: "问题积累后一次出现大量红灯", response: "团队开始忽略失败" },
  { step: "trust collapse", effect: "红灯被当成测试问题", response: "跳过、重跑或删除测试" },
  { step: "fearful changes", effect: "安全网失效，改动批次变大", response: "代码更难测试" },
  { step: "SCUMmy cycle", effect: "坏代码与坏测试互相强化", response: "需要系统性止损" },
] as const;

export function CtrScummyCycleFlow() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="坏测试从慢脆失败延迟信任崩塌到 SCUMmy cycle 的死亡螺旋" className="space-y-3">
          {spiralSteps.map((item, index) => (
            <section key={item.step} className="grid min-h-28 gap-3 border border-border bg-background/60 p-4 lg:grid-cols-[0.4fr_0.8fr_1.5fr_1.2fr] lg:items-center">
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="text-sm text-primary">{item.step}</strong>
              <span className="text-xs text-primary">{item.effect}</span>
              <span className="text-xs text-rose-300">{item.response}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        死亡螺旋从反馈可信度下降开始；恢复顺序是修复不稳定、缩短快层、恢复门禁，再重构难测代码。
      </figcaption>
    </figure>
  );
}

const practiceCases = [
  { label: "覆盖率下降", signal: "新增错误分支未执行，行覆盖从 82% 到 79%", action: "审查未覆盖风险并补行为例", avoid: "为追数字断言 getter" },
  { label: "红色主干", signal: "CI 已失败 30 分钟，后续提交继续合入", action: "停止合入、指定 owner、修复或回退", avoid: "把失败标成 known issue" },
  { label: "随机测试", signal: "重跑五次有一次通过", action: "保留复现、隔离并限时修根因", avoid: "无限 quarantine 后忘记" },
  { label: "新团队", signal: "成员理解术语但不会拆小红灯", action: "pair + 小 kata + 真实低风险功能", avoid: "只发规范文档要求遵守" },
] as const;

export function CtrTeamPracticeLab() {
  const [active, setActive] = useState(0);
  const current = practiceCases[active];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择团队 TDD 运营情形" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {practiceCases.map((item, index) => (
            <button key={item.label} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)} className={`min-h-11 border px-3 py-2 text-sm transition-colors ${active === index ? "border-accent bg-accent/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>
              {item.label}
            </button>
          ))}
        </div>
        <section role="tabpanel" className="mt-4 min-h-72 border border-border bg-background/60 p-4 sm:p-5">
          <span className="text-xs text-secondary">signal · {current.signal}</span>
          <strong className="mt-3 block text-base text-primary">{current.action}</strong>
          <div className="mt-5 border border-rose-500/35 bg-rose-500/10 p-4"><span className="text-xs text-secondary">避免</span><p className="mb-0 mt-3 text-xs text-primary">{current.avoid}</p></div>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        团队标准要定义信号后的动作和 owner；指标只触发讨论，不能替代行为与风险判断。
      </figcaption>
    </figure>
  );
}
