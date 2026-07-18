type Item = readonly [title: string, code: string, detail: string];

function PointerMap({
  ariaLabel,
  caption,
  items,
}: {
  ariaLabel: string;
  caption: string;
  items: readonly Item[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map(([title, code, detail], index) => (
            <section
              key={title}
              className="min-h-40 border border-border bg-bg/40 p-4"
            >
              <span className="text-xs tabular-nums text-secondary">
                0{index + 1}
              </span>
              <strong className="mt-3 block text-sm text-primary">
                {title}
              </strong>
              <code className="mt-3 block text-xs text-accent">{code}</code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {detail}
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

const objectRules = [
  [
    "Array object",
    "int a[5]",
    "类型包含元素类型与长度；数组不是指针对象，不能整体赋值。",
  ],
  [
    "Conversion",
    "a -> &a[0]",
    "多数表达式中数组值转换为首元素指针；转换结果不携带长度。",
  ],
  ["sizeof", "sizeof a", "这里不发生转换，结果是整个数组对象大小。"],
  [
    "address",
    "&a",
    "这里也不转换，类型是指向整个数组的指针，例如 int (*)[5]。",
  ],
  [
    "subscript",
    "a[i] == *(a + i)",
    "下标定义基于指针加法与解引用，但前提是 i 落在对象边界内。",
  ],
  [
    "assignment",
    "p = a; a = p is invalid",
    "指针变量可重新赋值，数组对象名不是可修改左值。",
  ],
] as const;

const rangeRules = [
  ["begin", "T *first = a", "指向首元素，可在非空范围中解引用。"],
  ["inside", "first + i", "只在同一数组对象及其尾后一位范围内形成合法结果。"],
  ["end", "T *last = a + n", "尾后一位可比较和相减，不能解引用。"],
  [
    "distance",
    "last - first",
    "仅对同一数组对象中的两个指针定义，结果类型是 ptrdiff_t。",
  ],
  ["compare", "first < last", "关系比较只在同一数组对象范围内有数组位置语义。"],
  [
    "lifetime",
    "alive object required",
    "保存旧地址不会延长对象生存期；对象结束后指针不能用于访问。",
  ],
] as const;

const matrixRules = [
  [
    "Object",
    "int m[3][4]",
    "对象是三个元素的数组，每个元素又是含四个 int 的行数组。",
  ],
  [
    "Outer conversion",
    "m -> int (*)[4]",
    "外层数组转换成指向第一行的指针，而不是 int **。",
  ],
  ["Row step", "m + 1", "移动一整个 int[4] 行，即 sizeof m[0] 字节。"],
  [
    "First index",
    "m[i]",
    "得到第 i 行数组；在后续表达式中再转换为该行首元素指针。",
  ],
  [
    "Second index",
    "m[i][j]",
    "等价于 *(*(m + i) + j)，两级步长由两级类型决定。",
  ],
  [
    "Parameter",
    "const int m[][4]",
    "列数属于行类型，ANSI C 形参必须让编译器知道后续维度。",
  ],
] as const;

export function KrArrayPointerContractMap() {
  return (
    <PointerMap
      ariaLabel="K&R 第五章数组对象转换 sizeof 取地址下标和赋值六项数组指针契约图"
      caption="数组对象与指针对象不是同一种类型；只有在规定语境中，数组值才转换为首元素指针。"
      items={objectRules}
    />
  );
}

export function KrPointerRangeMap() {
  return (
    <PointerMap
      ariaLabel="K&R 第五章 begin inside end distance compare lifetime 指针范围六项规则图"
      caption="合法指针算法围绕同一数组的半开区间 [first, last) 推理，尾后一位只作边界不用来解引用。"
      items={rangeRules}
    />
  );
}

export function KrMatrixTypeMap() {
  return (
    <PointerMap
      ariaLabel="K&R 第五章二维数组对象外层转换行步长两级下标和形参类型图"
      caption="二维数组是数组的数组；每次指针加法的步长由当前指针所指类型决定。"
      items={matrixRules}
    />
  );
}
