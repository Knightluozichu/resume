type Item = readonly [title: string, code: string, detail: string];

function MacroMap({
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

const replacementItems = [
  [
    "Scalar constant",
    "inline constexpr",
    "有类型、有作用域、可调试，头文件中只有一个程序级实体。",
  ],
  [
    "String constant",
    "string_view",
    "避免 char pointer 语义含糊并保留编译期字面量。",
  ],
  [
    "Class constant",
    "static constexpr",
    "常量属于类型，必要时提供定义并遵守版本规则。",
  ],
  [
    "Integral fallback",
    "enum hack",
    "旧式编译期整数且不能取地址，只用于历史代码语境。",
  ],
  [
    "Function macro",
    "inline template",
    "参数只求值一次并接受类型检查与正常名称查找。",
  ],
  [
    "True preprocessing",
    "#if / #include guard",
    "只有编译前文本选择确有需求时保留预处理器。",
  ],
] as const;

const expansionItems = [
  [
    "Substitute",
    "#define MAX(a,b)",
    "预处理器按 token 替换，不理解类型、作用域或副作用。",
  ],
  [
    "Duplicate",
    "a appears twice",
    "条件与结果分支可能让同一实参被求值不同次数。",
  ],
  [
    "Precedence",
    "missing parentheses",
    "调用点运算符可改变宏展开后的表达式结构。",
  ],
  ["Diagnose", "expanded tokens", "错误通常指向展开结果而非可调用接口。"],
  [
    "Replace",
    "template<class T>",
    "函数模板建立单次求值、返回类型和重载规则。",
  ],
  ["Verify", "side-effect counter", "带 ++ 的测试证明每个实参只求值一次。"],
] as const;

const linkageItems = [
  [
    "Header",
    "declaration/definition",
    "先确定常量是否必须在多个翻译单元共享身份。",
  ],
  [
    "Internal",
    "namespace const",
    "传统 namespace const 可在每个翻译单元拥有内部实体。",
  ],
  [
    "Class",
    "static const int",
    "旧规则允许类内整数初值，但 ODR-use 可能仍需类外定义。",
  ],
  ["Modern", "inline constexpr", "C++17 起头文件可定义单一可取地址实体。"],
  ["Address", "ODR-use", "取地址、绑定引用等行为决定是否需要存储与定义。"],
  [
    "Test",
    "two translation units",
    "跨两个源文件比较地址和链接结果，防止单文件假象。",
  ],
] as const;

export function EcppMacroReplacementMap() {
  return (
    <MacroMap
      ariaLabel="标量字符串类常量枚举技巧函数宏预处理六类替换图"
      caption="先识别宏的职责，再用有类型、有作用域的语言实体替换；真正文本预处理需求才保留宏。"
      items={replacementItems}
    />
  );
}

export function EcppMacroExpansionMap() {
  return (
    <MacroMap
      ariaLabel="函数宏替换重复求值优先级诊断模板替换验证六阶段图"
      caption="函数式宏在类型系统之前展开；inline template 把求值、重载和诊断带回 C++ 语义。"
      items={expansionItems}
    />
  );
}

export function EcppConstantLinkageMap() {
  return (
    <MacroMap
      ariaLabel="头文件内部链接类常量现代 inline ODR use 双翻译单元六项图"
      caption="const 替换 #define 后还要审查 linkage 与 ODR-use；单文件编译不能证明头文件常量正确。"
      items={linkageItems}
    />
  );
}
