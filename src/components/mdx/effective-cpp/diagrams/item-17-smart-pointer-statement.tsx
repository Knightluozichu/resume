type Item = readonly [title: string, code: string, detail: string];

function OwnershipMap({
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

const legacyItems = [
  ["Allocate", "new Widget", "raw resource 创建成功但尚未进入 smart pointer。"],
  ["Interleave", "priority()", "旧规则允许另一个 argument evaluation 插入。"],
  [
    "Throw",
    "priority fails",
    "异常发生在 smart pointer constructor 接管之前。",
  ],
  ["Unwind", "no owner exists", "栈上没有管理对象可执行 delete。"],
  ["Leak", "Widget lost", "raw pointer 无法再访问，资源泄漏。"],
  [
    "Repair",
    "owner statement first",
    "独立 full-expression 完成 ownership，再评估其他实参。",
  ],
] as const;

const safeItems = [
  [
    "Create",
    "make_unique/make_shared",
    "分配和 owner 建立在一个 library operation 中完成。",
  ],
  ["Validate", "owner != null", "factory 失败不发布 raw resource。"],
  ["Name", "auto owner", "独立语句形成清晰异常与生命周期边界。"],
  [
    "Borrow/move",
    "f(*owner)/f(move(owner))",
    "调用签名明确是借用还是取得 ownership。",
  ],
  ["Throw", "other argument fails", "owner 已存在，stack unwinding 自动释放。"],
  [
    "Complete",
    "callee receives contract",
    "调用成功时所有资源参数都已有管理对象。",
  ],
] as const;

const sharedItems = [
  [
    "make_shared",
    "one allocation",
    "对象与 control block 常合并，分配少、局部性好。",
  ],
  ["shared_ptr(new)", "two allocations", "对象和 control block 通常分别分配。"],
  [
    "Custom deleter",
    "shared_ptr(raw,D)",
    "特殊释放策略可能需要显式 constructor。",
  ],
  [
    "Weak remains",
    "strong count zero",
    "对象析构，但合并 allocation 可能等 weak count 归零才释放。",
  ],
  [
    "Private ctor",
    "make helper/friend",
    "访问控制和工厂设计影响 make_shared 可用性。",
  ],
  [
    "Decision",
    "measure + semantics",
    "默认 make_shared，按 deleter、生命周期和分配需求例外。",
  ],
] as const;

export function EcppLegacyEvaluationLeakMap() {
  return (
    <OwnershipMap
      ariaLabel="分配求值交错异常栈展开无 owner 泄漏修复六阶段图"
      caption="旧标准允许函数实参子求值交错，raw new 可在 smart pointer 接管前因另一实参抛异常而泄漏。"
      items={legacyItems}
    />
  );
}

export function EcppStandaloneOwnerStatementMap() {
  return (
    <OwnershipMap
      ariaLabel="创建验证命名借用移动异常完成六阶段独立 owner 语句图"
      caption="先在完整语句中建立 owner，再调用函数；后续任意实参失败都由 stack unwinding 自动清理。"
      items={safeItems}
    />
  );
}

export function EcppMakeSharedTradeoffMap() {
  return (
    <OwnershipMap
      ariaLabel="make shared 单分配双分配自定义 deleter weak 私有构造决策六项图"
      caption="make_shared 通常更安全高效，但 control block 生命周期、custom deleter 与构造访问仍需权衡。"
      items={sharedItems}
    />
  );
}
