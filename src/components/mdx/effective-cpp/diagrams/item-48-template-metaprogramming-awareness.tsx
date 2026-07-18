type TmpCell = readonly [stage: string, form: string, effect: string];

function TmpGrid({
  ariaLabel,
  caption,
  cells,
}: {
  ariaLabel: string;
  caption: string;
  cells: readonly TmpCell[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cells.map(([stage, form, effect], index) => (
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
              <code className="mt-3 block text-xs text-accent">{form}</code>
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

const pipelineCells = [
  ["Input", "types + constants", "template arguments 是元程序输入。"],
  ["Branch", "specialization", "pattern matching 选择编译期路径。"],
  ["Loop", "recursive instantiation", "递归展开表示迭代。"],
  ["Compute", "types / values", "中间结果存在 nested types 或 constants。"],
  ["Emit", "selected C++ entities", "实例化只生成所需函数与类型。"],
  ["Runtime", "no repeated decision", "已完成的选择可不再消耗运行时间。"],
] as const;

const factorialCells = [
  ["Request", "Factorial<4>", "实例化一般模板。"],
  ["Expand 4", "4 * Factorial<3>", "递归把 n 减一。"],
  ["Expand 3", "3 * Factorial<2>", "编译期表达式继续展开。"],
  ["Expand 2", "2 * Factorial<1>", "尚未产生 runtime loop。"],
  ["Base case", "Factorial<0> = 1", "完全特化终止递归。"],
  ["Fold", "value = 24", "compiler 得到常量并可直接嵌入。"],
] as const;

const decisionCells = [
  ["Static fact", "known at compile time", "先确认输入不会在运行期变化。"],
  ["Runtime cost", "hot repeated branch", "静态选择应消除可测的重复成本。"],
  ["Type safety", "invalid state rejected", "TMP 可让非法组合无法形成类型。"],
  [
    "Build cost",
    "instantiations / memory",
    "编译时间和 binary size 需要预算。",
  ],
  ["Diagnostics", "error depth", "失败应靠 concepts、aliases 缩短路径。"],
  [
    "Modern option",
    "constexpr / consteval",
    "值计算优先采用更直接的语言工具。",
  ],
] as const;

export function EcppTmpExecutionPipelineMap() {
  return (
    <TmpGrid
      ariaLabel="输入分支循环计算生成运行期六阶段模板元编程执行图"
      caption="TMP 以 types/constants 为输入，通过 specialization 与递归在编译期计算，最后生成或选择普通 C++ 实体。"
      cells={pipelineCells}
    />
  );
}

export function EcppTmpFactorialRecursionMap() {
  return (
    <TmpGrid
      ariaLabel="请求四阶展开三阶展开二阶展开基例折叠六阶段模板阶乘递归图"
      caption="一般模板表示递归关系，Factorial 零完全特化表示终止条件，结果在编译期折叠为 24。"
      cells={factorialCells}
    />
  );
}

export function EcppTmpAdoptionDecisionMap() {
  return (
    <TmpGrid
      ariaLabel="静态事实运行成本类型安全构建成本诊断现代替代六阶段 TMP 采用决策图"
      caption="只有静态信息、运行收益或类型安全价值足够，并能控制 build/diagnostic 成本时，TMP 才是合适工具。"
      cells={decisionCells}
    />
  );
}
