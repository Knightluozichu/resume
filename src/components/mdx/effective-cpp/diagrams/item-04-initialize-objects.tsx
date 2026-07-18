type Item = readonly [title: string, code: string, detail: string];

function InitMap({
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

const lifecycleItems = [
  ["Storage", "raw bytes", "对象生命周期尚未开始，不能按完整类型读取。"],
  ["Initialize", "constructor(args)", "一次建立成员值与类不变量。"],
  ["Use", "valid object", "公开操作可假设构造后不变量成立。"],
  ["Assign", "operator=", "只适用于已经存在的对象，替换其值。"],
  ["Destroy", "destructor", "结束生命周期并按逆序释放子对象。"],
  [
    "Verify",
    "poison + counters",
    "计数构造赋值并用 sanitizer 捕获未初始化读取。",
  ],
] as const;

const orderItems = [
  ["Virtual bases", "most-derived first", "由最派生构造函数负责虚基类。"],
  ["Direct bases", "declaration order", "直接基类按基类列表顺序构造。"],
  ["Members", "class declaration", "成员严格按类中声明顺序初始化。"],
  ["Body", "constructor body", "所有基类与成员完成后才执行函数体。"],
  ["Destroy", "exact reverse", "析构按构造完成顺序反向发生。"],
  [
    "Audit",
    "list matches declaration",
    "初始化列表顺序与声明一致，依赖方向可见。",
  ],
] as const;

const staticItems = [
  [
    "Non-local A",
    "translation unit A",
    "main 前初始化，但相对其他单元顺序不可靠。",
  ],
  [
    "Non-local B",
    "translation unit B",
    "若构造读取 A，可能观察尚未开始的对象。",
  ],
  [
    "Accessor",
    "function reference",
    "把对象隐藏在函数内部，调用方只经接口取得。",
  ],
  [
    "Local static",
    "construct on first use",
    "首次执行声明时初始化，C++11 起并发初始化安全。",
  ],
  [
    "Dependency",
    "call before use",
    "调用关系建立构造顺序，避免跨单元隐含依赖。",
  ],
  [
    "Shutdown",
    "destruction audit",
    "程序退出时仍需避免已销毁 static 被其他析构访问。",
  ],
] as const;

export function EcppInitializationLifecycleMap() {
  return (
    <InitMap
      ariaLabel="存储初始化使用赋值析构验证六阶段对象生命周期图"
      caption="初始化开始对象生命周期并建立不变量；赋值只能替换已经存在对象的值，两者不可混淆。"
      items={lifecycleItems}
    />
  );
}

export function EcppMemberInitializationOrderMap() {
  return (
    <InitMap
      ariaLabel="虚基类直接基类成员构造体析构审计六阶段初始化顺序图"
      caption="真正顺序由继承和声明决定，不由 initializer list 的书写顺序决定。"
      items={orderItems}
    />
  );
}

export function EcppStaticInitializationMap() {
  return (
    <InitMap
      ariaLabel="两个翻译单元非局部 static accessor 局部 static 依赖退出六项图"
      caption="跨翻译单元 non-local static 顺序不可靠；函数局部 static 把构造推迟到首次有序使用。"
      items={staticItems}
    />
  );
}
