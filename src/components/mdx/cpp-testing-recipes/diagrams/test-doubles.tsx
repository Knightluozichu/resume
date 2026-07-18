"use client";

import { useState } from "react";

const doubles = [
  { kind: "fake", controls: "可运行但简化的实现", observes: "状态结果", example: "in-memory repository", className: "border-cyan-500/35 bg-cyan-500/10" },
  { kind: "stub", controls: "为查询返回预定值", observes: "通常不验证调用", example: "fixed clock / failure response", className: "border-amber-500/35 bg-amber-500/10" },
  { kind: "spy", controls: "记录发生过的调用", observes: "事后检查参数与次数", example: "recording notifier", className: "border-emerald-500/35 bg-emerald-500/10" },
  { kind: "mock", controls: "预先声明交互期望", observes: "调用时验证协议", example: "GoogleMock expectation", className: "border-violet-500/35 bg-violet-500/10" },
] as const;

export function CtrDoubleTaxonomyMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="fake stub spy mock 四类测试替身控制和观察责任图" className="grid gap-3 md:grid-cols-2">
          {doubles.map((item, index) => (
            <section key={item.kind} className={`min-h-56 border p-4 ${item.className}`}>
              <span className="text-xs text-secondary">double 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{item.kind}</strong>
              <p className="mb-0 mt-4 text-xs text-primary">controls · {item.controls}</p>
              <p className="mb-0 mt-3 text-xs text-secondary">observes · {item.observes}</p>
              <code className="mt-4 block break-words text-xs text-accent">{item.example}</code>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        “mock”不应泛指所有假对象；先明确需要控制输入还是观察交互，再选择最小替身类型。
      </figcaption>
    </figure>
  );
}

const injectionFlow = [
  { stage: "policy", owner: "ExpiryReminder", input: "order + now", output: "should notify?", proof: "纯领域行为" },
  { stage: "clock port", owner: "Clock", input: "none", output: "time_point", proof: "测试可固定时间" },
  { stage: "notification port", owner: "Notifier", input: "recipient + message", output: "success/failure", proof: "spy 可观察交互" },
  { stage: "composition", owner: "application main", input: "SystemClock + SmtpNotifier", output: "wired service", proof: "生产选择真实适配器" },
] as const;

export function CtrDependencyInjectionFlow() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="到期提醒通过时钟和通知端口进行构造依赖注入的责任流程" className="space-y-3">
          {injectionFlow.map((item, index) => (
            <section key={item.stage} className="grid min-h-32 gap-3 border border-border bg-background/60 p-4 lg:grid-cols-[0.45fr_0.8fr_0.9fr_0.9fr_1fr] lg:items-center">
              <span className="text-xs text-secondary">stage 0{index + 1}</span>
              <strong className="text-sm text-primary">{item.owner}</strong>
              <code className="break-words text-xs text-accent">in · {item.input}</code>
              <span className="text-xs text-primary">out · {item.output}</span>
              <span className="text-xs text-secondary">proof · {item.proof}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        领域对象只依赖时间和通知的窄端口，生产组合根选择真实适配器，测试组合根注入可控替身。
      </figcaption>
    </figure>
  );
}

const choiceCases = [
  { label: "纯值对象", dependency: "Money 计算无 I/O 且确定", choose: "使用真实对象", reason: "替身不会降低成本，反而复制逻辑", risk: "伪造领域规则导致假绿" },
  { label: "查询依赖", dependency: "汇率服务只需返回固定汇率", choose: "stub 或小 fake", reason: "控制输入，不关心调用顺序", risk: "过度指定次数锁死缓存优化" },
  { label: "命令协作", dependency: "到期后必须发送一次指定通知", choose: "spy 或 mock", reason: "结果本身就是可观察交互", risk: "断言无关内部调用" },
  { label: "复杂存储", dependency: "仓库需要多次查询和状态变化", choose: "in-memory fake + 契约测试", reason: "比大量逐调用 stub 更可读", risk: "fake 与真实数据库语义漂移" },
] as const;

export function CtrDoubleChoiceLab() {
  const [active, setActive] = useState(0);
  const current = choiceCases[active];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择测试替身决策情形" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {choiceCases.map((item, index) => (
            <button key={item.label} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)} className={`min-h-11 border px-3 py-2 text-sm transition-colors ${active === index ? "border-accent bg-accent/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>
              {item.label}
            </button>
          ))}
        </div>
        <section role="tabpanel" className="mt-4 min-h-72 border border-border bg-background/60 p-4 sm:p-5">
          <span className="text-xs text-secondary">dependency · {current.dependency}</span>
          <strong className="mt-3 block text-base text-primary">{current.choose}</strong>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="min-h-36 border border-emerald-500/35 bg-emerald-500/10 p-4"><span className="text-xs text-secondary">理由</span><p className="mb-0 mt-3 text-xs text-primary">{current.reason}</p></div>
            <div className="min-h-36 border border-rose-500/35 bg-rose-500/10 p-4"><span className="text-xs text-secondary">主要风险</span><p className="mb-0 mt-3 text-xs text-primary">{current.risk}</p></div>
          </div>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        只有依赖昂贵、非确定或交互本身属于结果时才引入替身，并以最少交互期望保持重构自由。
      </figcaption>
    </figure>
  );
}
