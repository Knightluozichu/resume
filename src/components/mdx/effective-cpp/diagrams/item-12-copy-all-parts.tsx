type Item = readonly [title: string, code: string, detail: string];

function CopyMap({
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

const coverageItems = [
  [
    "Virtual bases",
    "most-derived copy",
    "最派生 copy constructor 负责虚基类初始化。",
  ],
  [
    "Direct bases",
    "Base(rhs)",
    "派生 copy 明确调用每个基类 copy，而非默认构造。",
  ],
  ["Value members", "member(rhs.member)", "每个业务成员复制或按语义重新派生。"],
  ["Owned resources", "deep/shared policy", "复制遵守独立值或共享所有权策略。"],
  ["Caches", "copy/invalidate", "派生缓存可复制有效状态或安全标记失效。"],
  [
    "New fields",
    "coverage test",
    "新增成员必须触发 copy/move 审计和等价性测试。",
  ],
] as const;

const lifecycleItems = [
  [
    "Copy construct",
    "target absent",
    "直接初始化所有 base/member 并首次建立不变量。",
  ],
  ["Copy assign", "target alive", "释放或复用旧状态，再提交源的等价值。"],
  [
    "Ctor calls assign",
    "object incomplete",
    "assignment 假设完整目标，无法正确开始 const/reference 生命周期。",
  ],
  [
    "Assign calls ctor",
    "temporary only",
    "构造临时可以用于 copy-and-swap，但不是直接调用构造体。",
  ],
  [
    "Shared helper",
    "copy data candidate",
    "只抽取不依赖生命周期阶段的普通计算。",
  ],
  [
    "Rule of zero",
    "default operations",
    "让每个成员自己复制，编译器覆盖自动随字段变化。",
  ],
] as const;

const validationItems = [
  ["Equality", "copy == source", "所有业务值和 base 状态与源等价。"],
  ["Independence", "mutate target", "深复制后修改目标不改变源。"],
  ["Assignment", "different old value", "目标旧资源正确释放，提交后与源等价。"],
  ["Inheritance", "base sentinel", "基类独有状态不丢失或重置。"],
  [
    "Failure",
    "Nth member throws",
    "copy ctor 无泄漏，assignment 满足声明保证。",
  ],
  ["Evolution", "add field test", "新增字段后编译或测试必须暴露遗漏。"],
] as const;

export function EcppCopyCoverageMap() {
  return (
    <CopyMap
      ariaLabel="虚基类直接基类值成员资源缓存新增字段六项复制覆盖图"
      caption="copy all parts 包括 base subobjects、成员、资源语义与缓存；新增字段也必须进入覆盖矩阵。"
      items={coverageItems}
    />
  );
}

export function EcppCopyLifecycleMap() {
  return (
    <CopyMap
      ariaLabel="复制构造复制赋值构造调用赋值赋值调用构造共享 helper 零规则六项图"
      caption="copy construction 建立新生命周期，assignment 修改已存在对象；二者不能互相冒充，只共享阶段无关逻辑。"
      items={lifecycleItems}
    />
  );
}

export function EcppCopyValidationMap() {
  return (
    <CopyMap
      ariaLabel="等价独立赋值继承失败演进六项复制验证图"
      caption="测试同时证明值等价、资源独立、基类完整、异常安全和新增字段可审计。"
      items={validationItems}
    />
  );
}
