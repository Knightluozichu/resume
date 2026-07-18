type TypenameCell = readonly [
  context: string,
  syntax: string,
  interpretation: string,
];

function TypenameGrid({
  ariaLabel,
  caption,
  cells,
}: {
  ariaLabel: string;
  caption: string;
  cells: readonly TypenameCell[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cells.map(([context, syntax, interpretation], index) => (
            <section
              key={context}
              className="min-h-40 border border-border bg-bg/40 p-4"
            >
              <span className="text-xs tabular-nums text-secondary">
                0{index + 1}
              </span>
              <strong className="mt-3 block text-sm text-primary">
                {context}
              </strong>
              <code className="mt-3 block text-xs text-accent">{syntax}</code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {interpretation}
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

const meaningCells = [
  ["Parameter with class", "template<class T>", "声明 T 是 type parameter。"],
  [
    "Parameter with typename",
    "template<typename T>",
    "与 class 写法完全等价。",
  ],
  ["No class restriction", "Box<int>", "class 关键字不限制 T 必须是 class。"],
  [
    "Dependent qualifier",
    "Container<T>::item",
    "item 含义依赖未知 specialization。",
  ],
  [
    "Type assertion",
    "typename ...::item",
    "告诉 parser 该 qualified name 是类型。",
  ],
  [
    "Different jobs",
    "introduce / disambiguate",
    "同一关键字承担参数声明和类型消歧。",
  ],
] as const;

const parseCells = [
  [
    "Token stream",
    "C<T>::iterator * p",
    "语法既像 pointer declaration 也像 multiplication。",
  ],
  ["Dependent scope", "C<T>", "定义模板时无法知道 specialization 内容。"],
  [
    "Conservative rule",
    "assume non-type",
    "未获提示时 nested dependent name 不按 type。",
  ],
  [
    "Possible parse",
    "iterator * p",
    "若 iterator 和 p 是 values，这是乘法 expression。",
  ],
  [
    "Disambiguate",
    "typename C<T>::iterator",
    "parser 立即把 iterator 视为 type。",
  ],
  ["Instantiate", "C<int>", "稍后再检查该 specialization 确实提供类型。"],
] as const;

const contextCells = [
  [
    "Function body",
    "typename Base<T>::Nested x",
    "dependent qualified type 前需要 typename。",
  ],
  [
    "Alias",
    "using X = typename C<T>::value_type",
    "右侧依赖类型需要 typename。",
  ],
  [
    "Base list",
    ": public Base<T>::Nested",
    "base-specifier 禁止在此写 typename。",
  ],
  [
    "Mem-initializer",
    "Derived() : Base<T>::Nested()",
    "初始化 base 时禁止 typename。",
  ],
  [
    "Known type",
    "std::string::size_type",
    "不依赖 template parameter，无需消歧。",
  ],
  [
    "Audit",
    "dependent? qualified? type?",
    "按三问判断，不靠看到双冒号就添加。",
  ],
] as const;

export function EcppTypenameTwoMeaningsMap() {
  return (
    <TypenameGrid
      ariaLabel="类参数写法类型名参数写法非类限制依赖限定类型断言两类职责六阶段 typename 双重含义图"
      caption="template parameter list 中 class 与 typename 等价；其他位置 typename 可声明 dependent qualified name 是类型。"
      cells={meaningCells}
    />
  );
}

export function EcppDependentNameParseMap() {
  return (
    <TypenameGrid
      ariaLabel="词法序列依赖作用域保守规则乘法解析类型消歧具体实例化六阶段依赖名称解析图"
      caption="定义模板时 specialization 未知，parser 默认把 nested dependent name 当非类型；typename 提供必要语法证据。"
      cells={parseCells}
    />
  );
}

export function EcppTypenameContextMatrixMap() {
  return (
    <TypenameGrid
      ariaLabel="函数体别名基类列表成员初始化已知类型三问审查六上下文 typename 位置矩阵图"
      caption="typename 规则取决于语法上下文：普通声明和 alias 需要，base list 与 mem-initializer 的 base 名称位置禁止。"
      cells={contextCells}
    />
  );
}
