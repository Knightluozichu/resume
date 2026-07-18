const buildNodes = [
  { input: "calculator.cpp + calculator.hpp", tool: "compile", output: "calculator.o" },
  { input: "main.cpp + calculator.hpp", tool: "compile", output: "main.o" },
  { input: "calculator.o + main.o", tool: "link", output: "calculator_app" },
] as const;

export function EcpLargeProgramsBuildMap() {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"><div role="img" aria-label="两个源文件包含同一头文件，分别编译为目标文件后链接为程序的构建图" className="grid gap-3 lg:grid-cols-3">{buildNodes.map((node,index)=><section key={node.output} className="min-h-52 border border-sky-500/30 bg-sky-500/10 p-4"><span className="text-xs text-secondary">stage 0{index+1}</span><code className="mt-2 block break-words text-xs text-accent">{node.input}</code><strong className="my-4 block text-center text-sm text-primary">{node.tool} ↓</strong><code className="block text-xs text-accent">{node.output}</code></section>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">头文件内容进入各翻译单元，源文件独立编译；只有目标文件进入最终链接。</figcaption></figure>;
}

const symbolStages = [
  { location: "main.cpp", symbol: "easy::add(int,int)", state: "declared and referenced" },
  { location: "main.o", symbol: "easy::add(int,int)", state: "undefined reference recorded" },
  { location: "calculator.o", symbol: "easy::add(int,int)", state: "one definition exported" },
  { location: "linker", symbol: "reference -> definition", state: "resolved" },
] as const;

export function EcpLargeProgramsSymbolFlow() {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"><div role="img" aria-label="add 函数从源文件声明调用、目标文件未解析引用到链接器匹配定义的符号流程" className="grid gap-2 sm:grid-cols-4">{symbolStages.map((stage,index)=><section key={stage.location} className="min-h-48 border border-violet-500/30 bg-violet-500/10 p-3"><span className="text-xs text-secondary">0{index+1} · {stage.location}</span><code className="mt-3 block break-words text-[11px] text-accent">{stage.symbol}</code><strong className="mt-4 block text-xs text-primary">{stage.state}</strong></section>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">声明允许生成引用，定义提供实体，链接器要求完整符号唯一匹配。</figcaption></figure>;
}

const failureTrials = [
  { mutation: "remove declaration", phase: "compile main.cpp", diagnostic: "name not declared" },
  { mutation: "omit calculator.o", phase: "link", diagnostic: "undefined reference" },
  { mutation: "define add twice", phase: "link", diagnostic: "multiple definition" },
  { mutation: "change header, keep old main.o", phase: "incremental build", diagnostic: "stale contract risk" },
] as const;

export function EcpLargeProgramsLinkLab() {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"><div role="img" aria-label="删除声明、遗漏目标文件、重复定义和陈旧目标文件四个多文件构建实验" className="grid gap-3 sm:grid-cols-2">{failureTrials.map((trial,index)=><section key={trial.mutation} className="min-h-44 border border-amber-500/30 bg-amber-500/10 p-4"><span className="text-xs text-secondary">trial 0{index+1}</span><code className="mt-2 block break-words text-xs text-accent">{trial.mutation}</code><strong className="mt-3 block text-xs text-primary">{trial.phase}</strong><span className="mt-3 block text-xs text-secondary">{trial.diagnostic}</span></section>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">先预测失败阶段，再读该阶段的输入；编译问题与链接问题不能靠同一种修改解决。</figcaption></figure>;
}
