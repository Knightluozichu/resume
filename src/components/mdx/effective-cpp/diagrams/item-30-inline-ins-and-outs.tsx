type InlineCell = readonly [stage: string, signal: string, effect: string];

function InlineGrid({
  ariaLabel,
  caption,
  cells,
}: {
  ariaLabel: string;
  caption: string;
  cells: readonly InlineCell[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cells.map(([stage, signal, effect], index) => (
            <section
              key={stage}
              className="min-h-40 border border-border bg-bg/40 p-4"
            >
              <span className="text-xs tabular-nums text-secondary">
                0{index + 1}
              </span>
              <strong className="mt-3 block text-sm text-primary">
                {stage}
              </strong>
              <code className="mt-3 block text-xs text-accent">{signal}</code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {effect}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        {caption}
      </figcaption>
    </figure>
  );
}

const decisionCells = [
  [
    "Source visible",
    "body at call site",
    "优化器必须看到或通过 LTO 获取函数实现。",
  ],
  [
    "Legality",
    "can substitute body",
    "递归、异常、ABI 与 instrumentation 影响可内联性。",
  ],
  [
    "Cost model",
    "benefit vs growth",
    "估算 call overhead、常量传播与重复代码体积。",
  ],
  [
    "Hotness",
    "profile/heuristic",
    "高频路径收益更大，cold path 通常保持 out-of-line。",
  ],
  [
    "Decision",
    "inline or call",
    "inline 关键字不强制，compiler 可接受或拒绝。",
  ],
  [
    "Aftermath",
    "optimize expanded IR",
    "展开后可继续折叠分支、传播常量或删除代码。",
  ],
] as const;

const cacheCells = [
  ["One call body", "shared text", "多个调用点共享一份函数机器码。"],
  [
    "Expand N sites",
    "N body copies",
    "每个调用点复制指令，text section 增大。",
  ],
  [
    "More cache lines",
    "larger working set",
    "hot loop 与邻近代码竞争 instruction cache。",
  ],
  [
    "I-cache miss",
    "front-end stall",
    "CPU 等待取指，省下的 call 开销可能得不偿失。",
  ],
  ["Page pressure", "more code pages", "可执行体积、加载与内存驻留成本上升。"],
  [
    "Selective inline",
    "hot tiny only",
    "用 profile 保留收益大的调用点，cold/large 保持共享。",
  ],
] as const;

const deliveryCells = [
  [
    "Class-body definition",
    "implicit inline",
    "类内定义自动具有 inline ODR 语义。",
  ],
  [
    "Header definition",
    "inline keyword",
    "允许多个 translation units 出现相同定义。",
  ],
  [
    "Template body",
    "definition visible",
    "实例化通常需要 body，但不等同强制机器码展开。",
  ],
  ["Header change", "recompile clients", "所有包含者重新编译，增大构建依赖。"],
  [
    "Library release",
    "code baked into client",
    "行为修复可能要求用户重新构建，而非只替换动态库。",
  ],
  [
    "Debug build",
    "out-of-line / limited",
    "断点、单步和调用栈常要求保留可调试实体。",
  ],
] as const;

export function EcppInliningDecisionPipelineMap() {
  return (
    <InlineGrid
      ariaLabel="源码可见合法性成本模型热度决定后续优化六阶段编译器内联决策图"
      caption="inline 关键字只是信号与 ODR 工具；实际展开由优化器结合可见性、热度和成本模型决定。"
      cells={decisionCells}
    />
  );
}

export function EcppCodeSizeInstructionCacheMap() {
  return (
    <InlineGrid
      ariaLabel="共享函数体多点展开缓存行指令缓存缺失页面压力选择内联六阶段代码膨胀图"
      caption="内联省去 call 并暴露优化机会，但重复函数体会扩大 instruction working set，可能让热点反而变慢。"
      cells={cacheCells}
    />
  );
}

export function EcppInlineDeliveryDebugMap() {
  return (
    <InlineGrid
      ariaLabel="类内隐式头文件模板可见重编译库发布调试六项 inline 交付图"
      caption="inline 还是源码交付和版本策略：定义进入调用方翻译单元后，构建、ABI 修复与 debugger 行为都会变化。"
      cells={deliveryCells}
    />
  );
}
