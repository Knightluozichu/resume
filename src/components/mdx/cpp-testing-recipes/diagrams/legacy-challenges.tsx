"use client";

import { useState } from "react";

const changeStages = [
  { stage: "observe", action: "选定一个真实入口与可重复输入", evidence: "当前输出、日志、文件或调用", risk: "先猜内部意图" },
  { stage: "characterize", action: "把当前可观察行为写成测试", evidence: "故意改变实现时测试会红", risk: "把偶然私有细节锁死" },
  { stage: "seam", action: "以最小安全重构替换外部依赖", evidence: "护栏持续全绿且测试变快", risk: "行为与接缝改造混在一起" },
  { stage: "change", action: "为新需求写失败测试并最小实现", evidence: "旧特征与新行为共同全绿", risk: "删除未知旧行为" },
] as const;

export function CtrLegacyChangeMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="遗留代码从观察特征测试接缝到测试驱动变化的四阶段地图" className="space-y-3">
          {changeStages.map((item, index) => (
            <section key={item.stage} className="grid min-h-32 gap-3 border border-border bg-background/60 p-4 lg:grid-cols-[0.4fr_0.7fr_1.3fr_1.1fr_1fr] lg:items-center">
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="text-sm text-primary">{item.stage}</strong>
              <span className="text-xs text-primary">{item.action}</span>
              <span className="text-xs text-accent">proof · {item.evidence}</span>
              <span className="text-xs text-secondary">risk · {item.risk}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        遗留改造先保护已知行为，再改变结构以获得接缝，最后才用新红灯改变产品语义。
      </figcaption>
    </figure>
  );
}

const extractSteps = [
  { step: "pin", action: "用高层 characterization test 钉住当前结果", artifact: "repeatable fixture" },
  { step: "locate", action: "标记纯计算、I/O、时间、全局和副作用", artifact: "responsibility sketch" },
  { step: "extract", action: "一次移动一个窄职责，保持调用转发", artifact: "new collaborator" },
  { step: "inject", action: "让旧入口默认接真实实现，测试传替身", artifact: "alternate constructor/factory" },
  { step: "tighten", action: "在新边界补快测试并缩小旧高层测试", artifact: "fast safety net" },
] as const;

export function CtrMondoExtractoFlow() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="Mondo Extracto 从钉住行为定位责任提取注入到收紧测试的流程" className="space-y-3">
          {extractSteps.map((item, index) => (
            <section key={item.step} className="grid min-h-28 gap-3 border border-border bg-background/60 p-4 lg:grid-cols-[0.4fr_0.7fr_1.6fr_1fr] lg:items-center">
              <span className="text-xs text-secondary">step 0{index + 1}</span>
              <strong className="text-sm text-primary">{item.step}</strong>
              <span className="text-xs text-primary">{item.action}</span>
              <code className="break-words text-xs text-accent">{item.artifact}</code>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        大提取由许多可回退小步组成；旧入口保持兼容，新协作者逐步获得快速、窄行为测试。
      </figcaption>
    </figure>
  );
}

const injectionCases = [
  { label: "构造注入", legacy: "对象内部 new rlog/Sender", seam: "增加接收接口引用的构造，旧构造委托", tradeoff: "最清晰，但需修改创建点" },
  { label: "参数注入", legacy: "单个函数直接读系统时间", seam: "把 now 或 Clock 作为参数传入", tradeoff: "改动窄，参数可能沿调用链传播" },
  { label: "链接替代", legacy: "C 函数或静态库难改", seam: "测试链接兼容签名替代实现", tradeoff: "侵入小，但构建契约更隐蔽" },
  { label: "预处理替代", legacy: "宏/平台 API 阻塞测试", seam: "用薄 wrapper 或受控编译开关", tradeoff: "仅过渡使用，需移除计划" },
] as const;

export function CtrLegacyInjectionLab() {
  const [active, setActive] = useState(0);
  const current = injectionCases[active];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择遗留代码替代注入方式" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {injectionCases.map((item, index) => (
            <button key={item.label} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)} className={`min-h-11 border px-3 py-2 text-sm transition-colors ${active === index ? "border-accent bg-accent/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>
              {item.label}
            </button>
          ))}
        </div>
        <section role="tabpanel" className="mt-4 min-h-72 border border-border bg-background/60 p-4 sm:p-5">
          <span className="text-xs text-secondary">legacy · {current.legacy}</span>
          <strong className="mt-3 block text-base text-primary">{current.seam}</strong>
          <div className="mt-5 border border-amber-500/35 bg-amber-500/10 p-4">
            <span className="text-xs text-secondary">取舍</span>
            <p className="mb-0 mt-3 text-xs text-primary">{current.tradeoff}</p>
          </div>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        优先选择依赖显式、生产语义清楚的接缝；链接和预处理替代只作为难改边界的受控过渡。
      </figcaption>
    </figure>
  );
}
