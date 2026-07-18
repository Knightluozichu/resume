const branchStages = [
  {
    stage: "Source condition",
    code: "if (score >= 60)",
    cpu: "load / compare operands",
    next: "produce flags or predicate",
    tone: "border-cyan-500/35 bg-cyan-500/10",
  },
  {
    stage: "Conditional branch",
    code: "jl .failed",
    cpu: "read condition flags",
    next: "choose one successor block",
    tone: "border-amber-500/35 bg-amber-500/10",
  },
  {
    stage: "Pass block",
    code: "mov eax, 1",
    cpu: "execute pass-path work",
    next: "jump to merge block",
    tone: "border-emerald-500/35 bg-emerald-500/10",
  },
  {
    stage: "Fail block",
    code: "xor eax, eax",
    cpu: "execute fail-path work",
    next: "jump to merge block",
    tone: "border-rose-500/35 bg-rose-500/10",
  },
  {
    stage: "Merge / return",
    code: "ret",
    cpu: "consume selected result",
    next: "resume caller address",
    tone: "border-violet-500/35 bg-violet-500/10",
  },
] as const;

export function CpuEyeBranchControlFlowMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="if else 和 goto 从源码条件变为比较标志条件跳转基本块与汇合点的控制流解剖图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
        >
          {branchStages.map((item, index) => (
            <section
              key={item.stage}
              className={`min-h-52 border p-4 ${item.tone}`}
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {item.stage}
              </strong>
              <code className="mt-3 block break-words text-xs text-accent">
                {item.code}
              </code>
              <p className="mb-0 mt-3 text-xs text-secondary">{item.cpu}</p>
              <p className="mb-0 mt-2 text-xs font-medium text-primary">
                {item.next}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        源码结构先变成 basic blocks 和
        edges；具体跳转方向可以被编译器取反、合并，甚至改写为无分支指令。
      </figcaption>
    </figure>
  );
}

const arrayCells = [
  { index: "0", address: "base + 0 x 4", value: "11", state: "inside" },
  { index: "1", address: "base + 1 x 4", value: "22", state: "inside" },
  { index: "2", address: "base + 2 x 4", value: "33", state: "inside" },
  { index: "3", address: "base + 3 x 4", value: "44", state: "inside" },
  { index: "4", address: "base + 4 x 4", value: "one-past", state: "edge" },
] as const;

export function CpuEyePointerArrayAddressMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="int数组从基地址按索引乘元素大小得到地址并区分有效元素 one past 与越界解引用的示意图"
          className="space-y-4"
        >
          <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch">
            <section className="min-h-32 border border-cyan-500/35 bg-cyan-500/10 p-4">
              <span className="text-xs text-secondary">pointer value</span>
              <code className="mt-2 block text-sm text-accent">base</code>
              <p className="mb-0 mt-3 text-xs text-secondary">
                first element address
              </p>
            </section>
            <span className="self-center text-center text-lg text-secondary">
              +
            </span>
            <section className="min-h-32 border border-amber-500/35 bg-amber-500/10 p-4">
              <span className="text-xs text-secondary">scaled index</span>
              <code className="mt-2 block text-sm text-accent">
                i x sizeof(int)
              </code>
              <p className="mb-0 mt-3 text-xs text-secondary">
                byte displacement
              </p>
            </section>
            <span className="self-center text-center text-lg text-secondary">
              =
            </span>
            <section className="min-h-32 border border-emerald-500/35 bg-emerald-500/10 p-4">
              <span className="text-xs text-secondary">effective address</span>
              <code className="mt-2 block text-sm text-accent">
                &amp;base[i]
              </code>
              <p className="mb-0 mt-3 text-xs text-secondary">
                dereference only in range
              </p>
            </section>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {arrayCells.map((cell) => (
              <section
                key={cell.index}
                className={`min-h-36 border p-3 ${
                  cell.state === "edge"
                    ? "border-rose-500/40 bg-rose-500/10"
                    : "border-violet-500/30 bg-violet-500/10"
                }`}
              >
                <strong className="text-sm text-primary">
                  index {cell.index}
                </strong>
                <code className="mt-2 block break-words text-xs text-accent">
                  {cell.address}
                </code>
                <p className="mb-0 mt-3 text-xs text-secondary">{cell.value}</p>
              </section>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        one-past
        地址可以用于比较和迭代终点，但不能解引用；继续前进或解引用都会越过数组对象边界。
      </figcaption>
    </figure>
  );
}

const incrementCases = [
  {
    expression: "++i",
    observed: "new value",
    abstract: "increment, then yield i",
    optimized: "often one increment",
  },
  {
    expression: "i++",
    observed: "old value",
    abstract: "save old, increment, yield old",
    optimized: "temporary matters when consumed",
  },
  {
    expression: "++i; / i++;",
    observed: "result discarded",
    abstract: "only side effect is observable",
    optimized: "usually identical code",
  },
] as const;

const conversionCases = [
  ["double -> int", "truncate fraction", "range may be invalid"],
  ["unsigned -> signed", "reinterpret/convert value", "width and range matter"],
  ["64-bit -> 32-bit", "discard high bits", "narrowing loses information"],
] as const;

export function CpuEyeIncrementConversionCostMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="前置后置递增在结果使用与丢弃时的抽象语义以及浮点整数有无符号和位宽转换的信息损失图"
          className="grid gap-5 lg:grid-cols-2"
        >
          <section>
            <h3 className="m-0 text-sm text-primary">Increment result path</h3>
            <div className="mt-3 space-y-3">
              {incrementCases.map((item) => (
                <div
                  key={`${item.expression}-${item.observed}`}
                  className="grid min-h-32 gap-2 border border-cyan-500/30 bg-cyan-500/10 p-4 sm:grid-cols-[0.7fr_1fr]"
                >
                  <div>
                    <code className="text-sm text-accent">
                      {item.expression}
                    </code>
                    <strong className="mt-2 block text-xs text-primary">
                      {item.observed}
                    </strong>
                  </div>
                  <div>
                    <p className="m-0 text-xs text-secondary">
                      {item.abstract}
                    </p>
                    <p className="mb-0 mt-2 text-xs font-medium text-primary">
                      {item.optimized}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="m-0 text-sm text-primary">Conversion bit path</h3>
            <div className="mt-3 space-y-3">
              {conversionCases.map(([from, operation, risk]) => (
                <div
                  key={from}
                  className="min-h-32 border border-amber-500/35 bg-amber-500/10 p-4"
                >
                  <code className="text-sm text-accent">{from}</code>
                  <strong className="mt-3 block text-xs text-primary">
                    {operation}
                  </strong>
                  <p className="mb-0 mt-2 text-xs text-secondary">{risk}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        先判断表达式必须保留的抽象语义，再观察优化后指令；源码写法不同不等于最终机器码一定不同。
      </figcaption>
    </figure>
  );
}
