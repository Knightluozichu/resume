type Item = readonly [title: string, code: string, detail: string];

function ContractFigure({
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

const guarantees = [
  [
    "Byte",
    "sizeof(char) == 1",
    "C 字节以 char 为单位；CHAR_BIT 至少为 8，不等于标准承诺 8 位。",
  ],
  [
    "Integer rank",
    "short <= int <= long",
    "标准规定最小范围与转换等级，不固定常见平台的 2/4/8 字节布局。",
  ],
  [
    "Character",
    "char signedness varies",
    "普通 char 与 signed char、unsigned char 是不同类型；其有无符号由实现选择。",
  ],
  [
    "Floating",
    "float <= double <= long double",
    "精度、指数范围和表示参数从 float.h 查询，不把 IEEE 754 当语言保证。",
  ],
  [
    "Unsigned",
    "modulo UINT_MAX + 1",
    "无符号转换与算术按模进行；有符号溢出则是未定义行为。",
  ],
  [
    "Inspect",
    "limits.h + float.h",
    "写可移植代码时查询实现宏，并用 _Static_assert 或构建测试验证项目假设。",
  ],
] as const;

const conversions = [
  [
    "Promote",
    "char/short -> int or unsigned",
    "先做整数提升；是否能提升为 int 取决于 int 能否表示源类型全部值。",
  ],
  [
    "Same type",
    "already compatible",
    "两个操作数同类型时无需寻找公共类型，直接按该类型运算。",
  ],
  [
    "Floating",
    "long double > double > float",
    "若含浮点操作数，按相应浮点转换规则寻找公共实类型。",
  ],
  [
    "Same signedness",
    "lower rank -> higher rank",
    "同为有符号或同为无符号时，较低转换等级转成较高等级。",
  ],
  [
    "Mixed sign",
    "rank + representability",
    "不能只背“有符号转无符号”；要比较等级及有符号类型能否表示无符号全部值。",
  ],
  [
    "Review",
    "range before cast",
    "显式强转只执行指定转换，不会自动证明值在目标范围内，也不会修复错误协议。",
  ],
] as const;

const orderRules = [
  [
    "Grouping",
    "precedence + associativity",
    "决定语法树如何形成，不承诺兄弟子表达式谁先求值。",
  ],
  [
    "Short circuit",
    "&& and ||",
    "左操作数先求值；结果已确定时右操作数不会求值。",
  ],
  [
    "Conditional",
    "cond ? a : b",
    "先求条件，只求被选中的一个分支，另一个分支不执行。",
  ],
  [
    "Comma",
    "left, right",
    "逗号运算符先完成左侧，再求右侧；参数列表中的逗号不是逗号运算符。",
  ],
  [
    "Arguments",
    "f(a(), b())",
    "参数求值次序不应被依赖；把有顺序要求的调用拆成独立语句。",
  ],
  [
    "Side effects",
    "one object, one rule",
    "未被序列规则分开的同一标量多次修改或读写可能触发未定义行为。",
  ],
] as const;

export function KrTypeGuaranteeMap() {
  return (
    <ContractFigure
      ariaLabel="K&R 第二章 C 类型的字节整数等级字符符号浮点无符号与查询宏六项保证图"
      caption="先区分标准保证与实现选择，再谈某台机器上的 sizeof、范围和表示。"
      items={guarantees}
    />
  );
}

export function KrConversionDecisionMap() {
  return (
    <ContractFigure
      ariaLabel="K&R 第二章整数提升浮点转换同符号和混合符号通常算术转换决策图"
      caption="通常算术转换不是“较窄转较宽”一句话；等级、符号与可表示性共同决定公共类型。"
      items={conversions}
    />
  );
}

export function KrEvaluationOrderMap() {
  return (
    <ContractFigure
      ariaLabel="K&R 第二章优先级短路条件逗号参数和副作用求值顺序审查图"
      caption="先画语法分组，再标序列保证；没有明确规则的地方就拆成独立语句。"
      items={orderRules}
    />
  );
}
