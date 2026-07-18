type Item = readonly [title: string, code: string, detail: string];

function DestructorMap({
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

const deletionItems = [
  [
    "Factory",
    "unique_ptr<Base>",
    "调用方只知道静态 Base，实际对象可能是 Derived。",
  ],
  [
    "Deleter",
    "delete Base*",
    "default_delete 按静态指针类型执行 delete-expression。",
  ],
  ["Dispatch", "virtual ~Base", "动态查找到最派生析构入口。"],
  ["Derived", "~Derived", "先释放派生独有资源并结束派生子对象。"],
  ["Base", "~Base", "随后执行基类析构和成员逆序销毁。"],
  ["Release", "operator delete", "完整析构链结束后释放最初分配的存储。"],
] as const;

const policyItems = [
  ["Polymorphic owner", "public virtual", "允许经基类所有者销毁派生对象。"],
  [
    "Polymorphic non-owner",
    "protected non-virtual",
    "禁止外部 delete Base*，派生仍可正常销毁基类部分。",
  ],
  ["Abstract root", "pure virtual dtor", "使基类抽象，但仍必须提供函数定义。"],
  [
    "Value/final",
    "non-virtual",
    "无运行期多态和基类删除需求时保持值类型布局。",
  ],
  [
    "C ABI",
    "destroy function",
    "跨模块可用配对销毁函数固定 allocator/ABI 边界。",
  ],
  ["Custom owner", "custom deleter", "所有权接口显式携带正确销毁动作。"],
] as const;

const costItems = [
  ["vptr", "per object", "首个 virtual 通常引入对象级指针与对齐变化。"],
  ["vtable", "per type", "实现通常生成函数表与 RTTI 相关数据。"],
  [
    "Dispatch",
    "indirect call",
    "virtual 调用可能限制内联，但需以实际剖析判断。",
  ],
  [
    "ABI",
    "layout contract",
    "给已发布类型新增 virtual 会改变布局和二进制兼容。",
  ],
  [
    "Existing polymorphism",
    "already has vptr",
    "已有 virtual 时析构 virtual 通常不再新增 vptr。",
  ],
  ["Decision", "semantic first", "先保证销毁正确，再评估布局与调用成本。"],
] as const;

export function EcppPolymorphicDeletionMap() {
  return (
    <DestructorMap
      ariaLabel="工厂基类 deleter virtual 分派派生析构基类析构释放六阶段图"
      caption="经 Base* 删除时 static type 决定入口；virtual destructor 才能把销毁分派到最派生对象。"
      items={deletionItems}
    />
  );
}

export function EcppDestructorPolicyMap() {
  return (
    <DestructorMap
      ariaLabel="多态所有者非所有者抽象根值类型 C ABI 自定义所有者六类析构策略图"
      caption="析构访问与 virtual 性共同表达“谁能经何种接口销毁”；不是所有类都应无条件 virtual。"
      items={policyItems}
    />
  );
}

export function EcppVirtualDestructorCostMap() {
  return (
    <DestructorMap
      ariaLabel="vptr vtable 分派 ABI 已有多态语义决策六项成本图"
      caption="virtual 有布局和 ABI 含义，但已有多态基类真正危险的是不完整销毁，不是那次间接调用。"
      items={costItems}
    />
  );
}
