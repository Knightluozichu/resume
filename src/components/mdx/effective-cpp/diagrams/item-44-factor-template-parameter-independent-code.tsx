type FactoringCell = readonly [stage: string, code: string, effect: string];

function FactoringGrid({
  ariaLabel,
  caption,
  cells,
}: {
  ariaLabel: string;
  caption: string;
  cells: readonly FactoringCell[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cells.map(([stage, code, effect], index) => (
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
              <code className="mt-3 block text-xs text-accent">{code}</code>
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

const bloatCells = [
  ["Template body", "invert()", "算法逻辑写在 T、N 双参数模板内。"],
  ["First use", "Matrix<double, 5>", "生成一份尺寸 5 的 inversion code。"],
  ["Second use", "Matrix<double, 10>", "再生成一份几乎相同的 code。"],
  ["Difference", "N only", "主要差异只是运行循环边界。"],
  ["Binary result", "duplicate text", "instruction cache 与链接体积承受重复。"],
  ["Audit", "nm / size / map", "先用 binary evidence 证明真实膨胀。"],
] as const;

const baseCells = [
  ["Shared core", "MatrixBase<double>", "实现只按元素类型实例化一次。"],
  ["Runtime size", "invert(n, data)", "把 N 从模板维度降为运行参数。"],
  ["Thin wrapper 5", "Matrix<double, 5>", "保留静态尺寸与类型安全。"],
  ["Thin wrapper 10", "Matrix<double, 10>", "复用同一 double inversion core。"],
  ["Compile result", "one heavy body", "wrapper 仅产生少量转发代码。"],
  ["Behavior gate", "same matrices", "逐尺寸验证结果、异常和 alias 语义一致。"],
] as const;

const tradeoffCells = [
  ["Pass arguments", "invert(n, ptr)", "core 无状态，但每次调用传上下文。"],
  ["Store in base", "size_ + data_", "调用简洁，却可能扩大每个对象。"],
  ["Inlining", "thin wrapper", "编译器可消除小转发开销。"],
  ["Optimization loss", "runtime n", "常量 N 的展开与向量化机会可能减少。"],
  ["Cache benefit", "smaller text", "共享代码可改善 instruction cache。"],
  ["Decision", "measure workload", "以体积、热点和目标架构共同决定。"],
] as const;

export function EcppTemplateCodeBloatMap() {
  return (
    <FactoringGrid
      ariaLabel="模板函数首次实例第二实例差异二进制结果测量六阶段代码膨胀图"
      caption="当 non-type parameter 只改变数据而不改变算法时，多次实例化可能复制几乎相同的机器码。"
      cells={bloatCells}
    />
  );
}

export function EcppMatrixFactoringMap() {
  return (
    <FactoringGrid
      ariaLabel="共享核心运行尺寸五阶包装十阶包装编译结果行为门禁六阶段矩阵抽离图"
      caption="共同基类按元素类型共享重算法，尺寸化 derived wrappers 继续提供静态边界和类型安全。"
      cells={baseCells}
    />
  );
}

export function EcppTemplateFactoringTradeoffMap() {
  return (
    <FactoringGrid
      ariaLabel="参数传递基类存储内联优化损失缓存收益测量决策六阶段抽离权衡图"
      caption="抽离减少重复代码，却可能牺牲常量传播或增加对象状态；最终选择必须由二进制和热点测量支持。"
      cells={tradeoffCells}
    />
  );
}
