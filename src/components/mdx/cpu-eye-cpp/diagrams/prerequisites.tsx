const explorerSteps = [
  ["Source", "C/C++ statements", "human intent"],
  ["Compiler", "selected version + flags", "translation rules"],
  ["Assembly", "source-linked instructions", "CPU operations"],
  ["Binary", "machine bytes + addresses", "executable image"],
  ["Run", "stdout / exit code", "observed behavior"],
] as const;

export function CpuEyeCompilerExplorerFlowMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="Compiler Explorer 从 C++ 源码经过编译器版本和选项生成关联汇编机器码并执行的流程图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
        >
          {explorerSteps.map(([step, artifact, meaning], index) => (
            <section
              key={step}
              className="min-h-44 border border-cyan-500/30 bg-cyan-500/10 p-4"
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {step}
              </strong>
              <code className="mt-3 block text-xs text-accent">{artifact}</code>
              <p className="mb-0 mt-3 text-xs text-secondary">{meaning}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        工具的价值是把 source、instruction 与 behavior
        对齐；改变优化级别和编译器版本后才有比较证据。
      </figcaption>
    </figure>
  );
}

const memoryRegions = [
  {
    region: "Code segment",
    source: "main / functions",
    image: "executable instructions",
    runtime: "rip fetches instructions",
  },
  {
    region: "Data / BSS",
    source: "global/static objects",
    image: "initial bytes or zero-size metadata",
    runtime: "mapped global storage",
  },
  {
    region: "Heap",
    source: "malloc/new",
    image: "not prefilled by source image",
    runtime: "grows through allocator",
  },
  {
    region: "Stack",
    source: "locals/call frames",
    image: "not prefilled by source image",
    runtime: "rsp/rbp manage frames",
  },
] as const;

export function CpuEyeExecutableLoadMemoryMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="可执行文件经操作系统 loader 映射到代码数据 BSS 堆和栈并由 rip 开始执行的虚拟内存图"
          className="space-y-3"
        >
          {memoryRegions.map((item, index) => (
            <section
              key={item.region}
              className="grid gap-3 border border-violet-500/30 bg-violet-500/10 p-4 md:grid-cols-[0.8fr_1fr_1.2fr_1.1fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {item.region}
              </strong>
              <span className="text-xs text-secondary">
                source: {item.source}
              </span>
              <code className="text-xs text-accent">image: {item.image}</code>
              <strong className="text-xs text-primary">
                runtime: {item.runtime}
              </strong>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        地址相隔很远来自不同虚拟内存区域；空白地址范围不等于同等物理内存已经分配。
      </figcaption>
    </figure>
  );
}

const instructionSteps = [
  ["push rbp", "save caller frame base", "rsp moves downward"],
  ["mov rbp, rsp", "establish current frame", "rbp anchors locals"],
  ["mov [rbp-8], 1", "store local a", "indirect memory write"],
  ["add [rbp-8], 2", "read-modify-write a", "memory traffic dominates"],
  ["mov rax, [rbp-8]", "place return value", "load memory to register"],
  ["pop rbp / ret", "restore caller context", "resume return address"],
] as const;

export function CpuEyeStackInstructionAnatomyMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="简单函数从 push rbp 建立栈帧经间接寻址读改写到 pop ret 恢复调用者的汇编解剖图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {instructionSteps.map(([instruction, effect, state], index) => (
            <section
              key={instruction}
              className="min-h-44 border border-amber-500/35 bg-amber-500/10 p-4"
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <code className="mt-2 block text-sm text-accent">
                {instruction}
              </code>
              <strong className="mt-3 block text-xs text-primary">
                {effect}
              </strong>
              <p className="mb-0 mt-3 text-xs text-secondary">{state}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        汇编阅读先追踪寄存器和内存状态变化，不背孤立助记符；`[rbp-8]`
        就是基址加偏移的间接寻址。
      </figcaption>
    </figure>
  );
}
