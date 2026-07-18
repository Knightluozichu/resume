type Item = readonly [title: string, code: string, detail: string];

function ConstMap({
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

const pointerItems = [
  ["Mutable both", "T* p", "可改指针目标，也可让指针指向别处。"],
  ["Const pointee", "const T* p", "不能经 p 修改 T，但 p 可以重新指向。"],
  ["Const pointer", "T* const p", "p 地址固定，但可以修改所指 T。"],
  ["Const both", "const T* const p", "指针与经它访问的对象都不可改。"],
  ["Iterator", "const_iterator", "像 const T*，元素只读但迭代位置可前进。"],
  [
    "Const iterator",
    "const iterator",
    "像 T* const，迭代位置固定但元素是否可改取决于类型。",
  ],
] as const;

const memberItems = [
  ["Object", "const TextBlock", "对象 cv 属性参与成员重载选择。"],
  ["Read", "operator[] const", "返回 const reference，不能经接口修改字符。"],
  ["Write", "operator[]", "非 const 对象得到可写 reference。"],
  ["Contract", "observable state", "const 成员承诺不改变调用者可观察值。"],
  ["Cache", "mutable field", "只允许不影响抽象值的内部缓存变化。"],
  ["Verify", "const compile tests", "非法写入应编译失败，读路径保持可调用。"],
] as const;

const implementationItems = [
  ["Canonical", "const overload", "把读取与边界检查放在 const 实现中。"],
  ["Delegate", "non-const calls const", "非 const 重载复用同一读取逻辑。"],
  ["Restore", "const_cast result", "仅在原对象确实非 const 时恢复可写引用。"],
  ["Cache", "mutex / atomic", "mutable 并不自动允许数据竞争。"],
  [
    "Value return",
    "avoid const T",
    "现代值返回通常不加 const，以免阻碍移动和重载。",
  ],
  [
    "Audit",
    "observable mutation",
    "逐个 const 函数检查别名、全局状态和缓存同步。",
  ],
] as const;

export function EcppPointerConstMap() {
  return (
    <ConstMap
      ariaLabel="可变指针 const 所指 const 指针双 const 迭代器六项图"
      caption="从星号位置判断 const 约束谁；iterator 与 pointer 的对应关系能避免常见误读。"
      items={pointerItems}
    />
  );
}

export function EcppConstMemberContractMap() {
  return (
    <ConstMap
      ariaLabel="const 对象读取写入契约缓存验证六项成员函数图"
      caption="const 成员函数是可观察状态契约；重载可向 const 和非 const 对象提供不同写权限。"
      items={memberItems}
    />
  );
}

export function EcppConstImplementationMap() {
  return (
    <ConstMap
      ariaLabel="const 正本非 const 委托恢复缓存值返回审计六项实现图"
      caption="复用 const 实现时只在原对象非 const 的前提下恢复写权限；mutable 缓存仍需并发协议。"
      items={implementationItems}
    />
  );
}
