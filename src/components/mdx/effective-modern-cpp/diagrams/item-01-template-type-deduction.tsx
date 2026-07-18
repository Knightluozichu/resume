type DeductionCell = readonly [stage: string, input: string, result: string];

function DeductionGrid({
  ariaLabel,
  caption,
  cells,
}: {
  ariaLabel: string;
  caption: string;
  cells: readonly DeductionCell[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cells.map(([stage, input, result], index) => (
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
              <code className="mt-3 block text-xs text-accent">{input}</code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {result}
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

const cases = [
  [
    "Lvalue reference",
    "f(T&) <- const int",
    "T = const int，ParamType = const int&。",
  ],
  [
    "Const reference",
    "f(const T&) <- int",
    "T = int，ParamType = const int&。",
  ],
  ["Pointer", "f(T*) <- const int*", "T = const int，pointee const 保留。"],
  [
    "Universal + lvalue",
    "f(T&&) <- int lvalue",
    "T = int&，折叠后 ParamType = int&。",
  ],
  [
    "Universal + rvalue",
    "f(T&&) <- int rvalue",
    "T = int，ParamType = int&&。",
  ],
  [
    "By value",
    "f(T) <- const int",
    "T = int，top-level const/reference 丢弃。",
  ],
] as const;

const cvCells = [
  ["Observe expression", "const int& expr", "先区分表达式类型、值类别与 cv。"],
  ["Inspect ParamType", "T& / T&& / T", "参数模式决定使用哪组规则。"],
  [
    "Reference case",
    "ignore expr reference",
    "匹配 T 与剩余 declared type，保留 const。",
  ],
  ["Universal lvalue", "T becomes U&", "T 自身可被推导为 lvalue reference。"],
  ["Value case", "drop top-level cv", "参数是新对象，外层 const 不影响复制。"],
  ["Keep low-level cv", "const char*", "pointer 所指对象 const 仍是类型组成。"],
] as const;

const decayCells = [
  [
    "Array expression",
    "const char name[13]",
    "表达式拥有 array type 和固定 extent。",
  ],
  ["By value", "f(T)", "array-to-pointer decay，T = const char*。"],
  ["By reference", "f(T&)", "T 保留 const char[13]。"],
  [
    "Function name",
    "void work(int)",
    "函数 expression 也可 decay 为 function pointer。",
  ],
  ["Function reference", "f(T&)", "T 可保留 function type，而不是 pointer。"],
  [
    "Exploit extent",
    "arraySize(T(&)[N])",
    "引用推导 N，在 compile time 得到元素数。",
  ],
] as const;

export function EmcppDeductionCasesMap() {
  return (
    <DeductionGrid
      ariaLabel="引用常量引用指针通用引用左值通用引用右值按值六种模板类型推导图"
      caption="先识别 ParamType 形态：普通 reference/pointer、universal reference、by-value 三类规则对 T 与最终参数类型的处理不同。"
      cells={cases}
    />
  );
}

export function EmcppCvReferencePipelineMap() {
  return (
    <DeductionGrid
      ariaLabel="观察表达式识别参数模式引用处理通用引用左值按值处理低层常量六阶段 cv 引用推导图"
      caption="top-level cv/reference 是否保留由 ParamType 决定；指针指向对象的 low-level const 不会因按值传 pointer 而消失。"
      cells={cvCells}
    />
  );
}

export function EmcppArrayFunctionDecayMap() {
  return (
    <DeductionGrid
      ariaLabel="数组表达式按值退化按引用保留函数名函数引用数组长度六阶段数组函数推导图"
      caption="array/function 传给 by-value 参数会 decay，传给 reference 参数可保留原始类型和 array extent。"
      cells={decayCells}
    />
  );
}
