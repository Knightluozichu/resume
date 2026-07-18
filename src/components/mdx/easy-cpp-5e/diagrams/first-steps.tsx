const executionStages = [
  { label: "需求", artifact: "可观察预期", tone: "border-amber-500/35 bg-amber-500/10" },
  { label: "源代码", artifact: "hello.cpp", tone: "border-sky-500/35 bg-sky-500/10" },
  { label: "构建", artifact: "compiler + linker", tone: "border-violet-500/35 bg-violet-500/10" },
  { label: "执行", artifact: "process + output", tone: "border-emerald-500/35 bg-emerald-500/10" },
] as const;

export function EcpFirstStepsExecutionFlow() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="从可观察需求经过源代码和构建到进程输出的首个 C++ 程序证据链" className="grid gap-2 sm:grid-cols-4">
          {executionStages.map((stage, index) => (
            <section key={stage.label} className={`min-h-36 border p-4 ${stage.tone}`}>
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">{stage.label}</strong>
              <code className="mt-4 block break-words text-xs text-accent">{stage.artifact}</code>
              {index < executionStages.length - 1 ? <span className="mt-3 block text-right text-accent" aria-hidden="true">→</span> : null}
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        每一格都有独立证据：预期、保存后的文件、构建产物与实际运行结果不能互相替代。
      </figcaption>
    </figure>
  );
}

const toolchainRows = [
  { owner: "编辑器", input: "想法", output: "保存的 .cpp", failure: "未保存 / 路径错" },
  { owner: "编译器", input: ".cpp", output: "目标代码", failure: "语法 / 类型诊断" },
  { owner: "链接器", input: "目标代码 + 库", output: "可执行文件", failure: "未定义符号" },
  { owner: "操作系统", input: "可执行文件", output: "进程", failure: "找不到 / 无权限" },
] as const;

export function EcpFirstStepsToolchainMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-4 sm:p-5">
        <table aria-label="C++ 第一条工具链中各工具的输入输出和典型故障" className="w-full min-w-[680px] border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-border text-secondary">
              <th className="p-3">责任主体</th><th className="p-3">输入</th><th className="p-3">输出</th><th className="p-3">典型故障</th>
            </tr>
          </thead>
          <tbody>
            {toolchainRows.map((row) => (
              <tr key={row.owner} className="border-b border-border/70 last:border-0">
                <th className="p-3 text-primary">{row.owner}</th>
                <td className="p-3 text-accent">{row.input}</td>
                <td className="p-3 text-primary">{row.output}</td>
                <td className="p-3 text-secondary">{row.failure}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        集成开发环境只是统一入口；按输入和输出识别责任层，换工具后仍能复用同一排错方法。
      </figcaption>
    </figure>
  );
}

const debugCases = [
  { change: "删除字符串右引号", build: "FAIL", run: "无新产物", diagnosis: "编译错误", tone: "border-rose-500/35 bg-rose-500/10" },
  { change: "把 ready 写成 raedy", build: "PASS", run: "输出错误", diagnosis: "逻辑错误", tone: "border-amber-500/35 bg-amber-500/10" },
  { change: "删除 hello 后运行", build: "未执行", run: "找不到文件", diagnosis: "启动错误", tone: "border-sky-500/35 bg-sky-500/10" },
] as const;

export function EcpFirstStepsDebugLab() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="通过三个故意改动区分编译错误、逻辑错误和启动错误的实验" className="grid gap-3 lg:grid-cols-3">
          {debugCases.map((item, index) => (
            <section key={item.change} className={`min-h-56 border p-4 ${item.tone}`}>
              <span className="text-xs text-secondary">experiment 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{item.change}</strong>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <span className="border border-border p-2 text-secondary">build</span><code className="border border-border p-2 text-accent">{item.build}</code>
                <span className="border border-border p-2 text-secondary">run</span><code className="border border-border p-2 text-accent">{item.run}</code>
              </div>
              <span className="mt-4 block border-t border-border pt-3 text-xs text-primary">结论：{item.diagnosis}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        故意制造单变量故障能建立阶段边界：哪一步失败，就回到哪一步的输入与责任主体。
      </figcaption>
    </figure>
  );
}
