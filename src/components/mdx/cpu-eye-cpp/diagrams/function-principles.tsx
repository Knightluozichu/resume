const argumentChannels = [
  {
    source: "int / pointer args",
    abi: "integer argument registers",
    callee: "named parameters",
    pressure: "overflow may use stack",
  },
  {
    source: "float / vector args",
    abi: "FP or vector registers",
    callee: "typed values",
    pressure: "ABI class rules apply",
  },
  {
    source: "large aggregate",
    abi: "split registers or memory",
    callee: "reconstructed object/value",
    pressure: "layout and ABI dependent",
  },
  {
    source: "reference parameter",
    abi: "address-like machine value",
    callee: "language-level alias",
    pressure: "lifetime must remain valid",
  },
] as const;

export function CpuEyeArgumentPassingAbiMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="源码参数按ABI分类进入参数寄存器或栈位置并在被调函数中恢复为命名参数的映射图"
          className="space-y-3"
        >
          {argumentChannels.map((item, index) => (
            <section
              key={item.source}
              className="grid min-h-36 gap-3 border border-cyan-500/30 bg-cyan-500/10 p-4 md:grid-cols-[0.8fr_1fr_1fr_1fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {item.source}
              </strong>
              <code className="break-words text-xs text-accent">
                {item.abi}
              </code>
              <span className="text-xs text-primary">{item.callee}</span>
              <span className="text-xs text-secondary">{item.pressure}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        参数的源码类型先经过 ABI
        分类；具体寄存器、拆分和栈位置必须绑定目标平台观察。
      </figcaption>
    </figure>
  );
}

const callTimeline = [
  {
    event: "Prepare arguments",
    instruction: "moves / stores",
    stack: "align call boundary",
    owner: "caller",
  },
  {
    event: "Transfer control",
    instruction: "call target",
    stack: "record return address",
    owner: "ISA + caller",
  },
  {
    event: "Enter body {",
    instruction: "optional prologue",
    stack: "save registers / reserve locals",
    owner: "callee",
  },
  {
    event: "Produce result",
    instruction: "compute / store",
    stack: "destroy scoped objects",
    owner: "callee",
  },
  {
    event: "Leave body }",
    instruction: "epilogue / ret",
    stack: "restore caller state",
    owner: "callee + ISA",
  },
  {
    event: "Resume caller",
    instruction: "next instruction",
    stack: "consume result / reclaim args",
    owner: "caller",
  },
] as const;

export function CpuEyeCallReturnStackMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="调用者准备参数通过call进入函数括号建立栈帧产生返回值再由ret恢复调用者的时间线"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {callTimeline.map((item, index) => (
            <section
              key={item.event}
              className="min-h-48 border border-violet-500/30 bg-violet-500/10 p-4"
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {item.event}
              </strong>
              <code className="mt-3 block break-words text-xs text-accent">
                {item.instruction}
              </code>
              <p className="mb-0 mt-3 text-xs text-secondary">{item.stack}</p>
              <p className="mb-0 mt-2 text-xs font-medium text-primary">
                owner: {item.owner}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        花括号定义语言级作用域和析构边界；prologue、frame pointer
        与独立栈帧都可能被优化掉。
      </figcaption>
    </figure>
  );
}

const traceFrames = [
  {
    frame: "#0 parseRecord",
    evidence: "current PC + register state",
    symbol: "address -> function + source line",
    caveat: "may be leaf or inline body",
  },
  {
    frame: "#1 loadConfig",
    evidence: "unwind rule finds caller state",
    symbol: "debug symbols resolve names",
    caveat: "tail call may remove frame",
  },
  {
    frame: "#2 runApplication",
    evidence: "saved return address",
    symbol: "module relocation applied",
    caveat: "optimized locals may be absent",
  },
  {
    frame: "#3 main / startup",
    evidence: "walk until root or failure",
    symbol: "runtime boundary",
    caveat: "corruption can break unwind",
  },
] as const;

export function CpuEyeFunctionPointerBacktraceMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="函数指针间接调用后调试器利用当前PC返回地址展开规则与符号表回溯调用关系的图"
          className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]"
        >
          <section className="border border-amber-500/35 bg-amber-500/10 p-4">
            <span className="text-xs text-secondary">indirect call</span>
            <code className="mt-3 block break-words text-sm text-accent">
              target = table[index]
            </code>
            <strong className="mt-4 block text-sm text-primary">
              call target
            </strong>
            <p className="mb-0 mt-3 text-xs text-secondary">
              function pointer carries a compatible callable address; the CPU
              branch target is known only at runtime.
            </p>
          </section>

          <section className="space-y-3">
            {traceFrames.map((item, index) => (
              <div
                key={item.frame}
                className="grid min-h-32 gap-2 border border-emerald-500/30 bg-emerald-500/10 p-4 sm:grid-cols-[0.7fr_1fr]"
              >
                <div>
                  <span className="text-xs text-secondary">frame {index}</span>
                  <strong className="mt-2 block text-sm text-primary">
                    {item.frame}
                  </strong>
                </div>
                <div>
                  <code className="block break-words text-xs text-accent">
                    {item.evidence}
                  </code>
                  <p className="mb-0 mt-2 text-xs text-primary">
                    {item.symbol}
                  </p>
                  <p className="mb-0 mt-2 text-xs text-secondary">
                    {item.caveat}
                  </p>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        backtrace 是“展开调用者状态 +
        地址符号化”的证据链；优化、尾调用、内联与栈破坏都会改变可见帧。
      </figcaption>
    </figure>
  );
}
