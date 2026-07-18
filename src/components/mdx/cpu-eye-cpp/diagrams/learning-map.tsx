const chapterRoute = [
  ["01", "预备知识", "tool -> executable -> assembly", "建立证据链"],
  ["02", "基础语法", "state + address + branch", "读懂基本动作"],
  ["03", "函数原理", "ABI + frame + backtrace", "跨越调用边界"],
  ["04", "C++特性", "object + dispatch + lifetime", "拆解语言抽象"],
  ["05", "高级编程", "VM + kernel + synchronization", "连接系统边界"],
  ["06", "面试挑战", "predict + disprove + verify", "形成迁移能力"],
] as const;

export function CpuEyeSixChapterRouteMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="CPU眼里的C和C++从预备知识基础语法函数原理C++特性高级编程到面试挑战的六章学习路线图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {chapterRoute.map(([number, title, path, result]) => (
            <section
              key={number}
              className="min-h-48 border border-cyan-500/30 bg-cyan-500/10 p-4"
            >
              <span className="text-xs text-secondary">CHAPTER {number}</span>
              <strong className="mt-2 block text-sm text-primary">
                {title}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {path}
              </code>
              <p className="mb-0 mt-4 text-xs text-secondary">{result}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        六章从可复现工具出发，逐步增加语言、ABI、系统与验证边界，最后把知识变成可迁移的回答能力。
      </figcaption>
    </figure>
  );
}

const evidenceLayers = [
  {
    layer: "Language semantics",
    asks: "type, value, lifetime, observable behavior",
    evidence: "standard rule + counterexample",
  },
  {
    layer: "Compiler + ABI",
    asks: "layout, calling convention, symbols",
    evidence: "target/version/flags + object file",
  },
  {
    layer: "ISA + CPU",
    asks: "register, memory, branch, atomic action",
    evidence: "optimized disassembly + counters",
  },
  {
    layer: "OS + runtime",
    asks: "mapping, syscall, scheduling, unwind",
    evidence: "maps + debugger + system trace",
  },
] as const;

export function CpuEyeEvidenceLayerMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="从C和C++语言语义经过编译器ABI与ISA到操作系统运行时的四层证据模型"
          className="space-y-3"
        >
          {evidenceLayers.map((item, index) => (
            <section
              key={item.layer}
              className="grid min-h-36 gap-3 border border-violet-500/30 bg-violet-500/10 p-4 md:grid-cols-[0.8fr_1.4fr_1.2fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {item.layer}
              </strong>
              <code className="break-words text-xs text-accent">
                {item.asks}
              </code>
              <span className="text-xs text-secondary">{item.evidence}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        上层规定必须保持的语义，下层提供某个目标上的实现证据；任何汇编结论都要向上标明适用边界。
      </figcaption>
    </figure>
  );
}

const experimentLoop = [
  ["Question", "name one uncertain mechanism"],
  ["Prediction", "write expected state changes"],
  ["Control", "fix source, compiler, ABI, flags"],
  ["Observe", "assembly, symbols, maps, trace"],
  ["Disprove", "change one variable or target"],
  ["Conclude", "separate guarantee from evidence"],
] as const;

export function CpuEyeExperimentLoopMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="从问题预测控制变量到观测反证和分层结论的CPU视角实验闭环图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6"
        >
          {experimentLoop.map(([step, action], index) => (
            <section
              key={step}
              className="min-h-40 border border-amber-500/35 bg-amber-500/10 p-4"
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {step}
              </strong>
              <p className="mb-0 mt-3 text-xs text-secondary">{action}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        一次截图不是结论；改变 optimization、compiler 或 target
        做反证，才能知道观察到的是规则还是偶然实现。
      </figcaption>
    </figure>
  );
}
