type Item = readonly [title: string, code: string, detail: string];

function TopicMap({
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

const contracts = [
  [
    "Declare",
    "prototype before call",
    "调用点必须看到兼容原型，编译器才能检查参数数量、转换和返回类型。",
  ],
  [
    "Pass",
    "copy each argument value",
    "指针参数复制地址值；通过地址访问同一对象不等于语言提供引用传递。",
  ],
  [
    "Array",
    "T a[] parameter -> T *a",
    "数组形参会调整为指针，长度不是参数类型的一部分，必须单独传入。",
  ],
  [
    "Return",
    "value or status",
    "返回值只传一个对象；多个结果可写入调用者提供的对象并用状态码报告成败。",
  ],
  [
    "Lifetime",
    "automatic | static",
    "自动对象通常随块执行获得生存期，静态对象贯穿程序；作用域与生存期不可混淆。",
  ],
  [
    "Recurse",
    "base + progress + bound",
    "递归需要基例、向基例推进的参数与深度上限；C 不保证尾调用优化或具体栈布局。",
  ],
] as const;

const linkage = [
  [
    "Header",
    "declarations + types",
    "包含保护内只放共享接口；普通外部对象定义留在一个源文件。",
  ],
  [
    "Public source",
    "external linkage definitions",
    "实现公开函数，并为每个外部对象提供全程序唯一外部定义。",
  ],
  [
    "Private source",
    "file-scope static",
    "内部函数和对象使用内部链接，避免污染其他翻译单元命名空间。",
  ],
  [
    "Block local",
    "no linkage",
    "局部自动对象只有块作用域；遮蔽外层名字不等于访问外层对象。",
  ],
  [
    "Static local",
    "block scope, static duration",
    "名字仍只在块内可见，但对象只初始化一次并贯穿程序执行。",
  ],
  [
    "Link",
    "resolve declarations to definitions",
    "编译器逐翻译单元检查，链接器再解析外部符号；声明兼容性必须跨文件保持。",
  ],
] as const;

const preprocessing = [
  [
    "include",
    "tokens from header",
    "预处理阶段纳入接口文本；包含保护防止同一翻译单元重复声明结构。",
  ],
  [
    "object macro",
    "#define NAME replacement",
    "适合条件编译与记号级常量；它没有对象类型、地址和作用域。",
  ],
  [
    "function macro",
    "arguments may repeat",
    "实参按替换文本展开，可能多次求值；括号只修分组，修不了副作用。",
  ],
  [
    "condition",
    "#if / #ifdef",
    "按构建配置选择接口与实现；所有启用组合都必须单独编译测试。",
  ],
  [
    "inline",
    "C99, not ANSI C90",
    "现代头文件私有小助手可用 static inline；公开 external inline 语义需项目规则。",
  ],
  [
    "review",
    "preprocess -> compile -> link",
    "遇到问题先判断发生在哪一阶段，不把宏、类型检查和符号解析混成一件事。",
  ],
] as const;

export function KrFunctionContractMap() {
  return (
    <TopicMap
      ariaLabel="K&R 第四章函数原型值传递数组形参返回值生存期和递归六项契约图"
      caption="C 抽象机保证函数契约，不保证参数压栈方向、栈增长方向或固定帧指针。"
      items={contracts}
    />
  );
}

export function KrProgramLinkageMap() {
  return (
    <TopicMap
      ariaLabel="K&R 第四章头文件公开定义文件私有定义局部对象静态局部和链接六层程序结构图"
      caption="作用域回答名字在哪里可见，链接回答跨声明是否指向同一实体，存储期回答对象活多久。"
      items={linkage}
    />
  );
}

export function KrPreprocessorBoundaryMap() {
  return (
    <TopicMap
      ariaLabel="K&R 第四章 include 对象宏函数宏条件编译 inline 和翻译阶段预处理边界图"
      caption="预处理器操作记号，编译器检查 C 类型，链接器解析外部定义；三阶段必须分开推理。"
      items={preprocessing}
    />
  );
}
