type Item = readonly [title: string, code: string, detail: string];

function ResourceCopyMap({
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

const strategyItems = [
  [
    "Prohibit",
    "copy = delete",
    "锁、线程、唯一会话没有独立副本语义，编译期拒绝。",
  ],
  ["Reference count", "shared_ptr", "复制共同拥有同一资源，最后 owner 释放。"],
  ["Deep copy", "clone", "复制创建独立资源表示，修改目标不影响源。"],
  ["Transfer", "move", "独占 owner 从源转给目标，源进入有效空状态。"],
  [
    "Borrow",
    "view/reference",
    "非 owner 的复制只复制观察位置，不增加释放责任。",
  ],
  ["Value member", "rule of zero", "优先让成员类型实现策略，外层自动组合。"],
] as const;

const assignmentItems = [
  ["Read policy", "deep/shared/unique", "先确定目标复制语义与异常保证。"],
  ["Prepare", "clone/control block", "可能失败的资源取得在局部候选完成。"],
  ["Self alias", "same resource", "候选准备前不释放源可能共享的资源。"],
  ["Commit", "swap/move owner", "以 no-throw 操作替换目标 ownership。"],
  ["Release old", "candidate destructor", "目标旧资源在提交后由候选自动释放。"],
  ["Verify", "identity + ledger", "检查独立/共享身份、计数和失败路径。"],
] as const;

const sharedItems = [
  ["Owner A", "shared_ptr<R>", "A 复制 shared owner 给 B。"],
  ["Owner B", "shared_ptr<R>", "control block strong count 增加。"],
  ["Back edge", "shared_ptr<A>", "若资源反向强拥有 A，形成闭环。"],
  ["Cycle", "count never zero", "外部 owner 释放后环内计数仍保持。"],
  ["Break", "weak_ptr", "反向边改为观察，不增加 strong count。"],
  [
    "Alternative",
    "aggregate owner",
    "图/arena 集中拥有节点，边只保存非拥有 id。",
  ],
] as const;

export function EcppResourceCopyStrategiesMap() {
  return (
    <ResourceCopyMap
      ariaLabel="禁止引用计数深拷贝转移借用值成员六种资源复制策略图"
      caption="资源管理类复制没有统一答案；先从资源语义选择禁止、共享、深拷贝或转移。"
      items={strategyItems}
    />
  );
}

export function EcppResourceAssignmentMap() {
  return (
    <ResourceCopyMap
      ariaLabel="读取策略准备别名提交通用释放验证六阶段资源赋值图"
      caption="资源 assignment 采用 prepare-then-commit，既处理 self-alias，也在异常时保持目标保证。"
      items={assignmentItems}
    />
  );
}

export function EcppSharedOwnershipCycleMap() {
  return (
    <ResourceCopyMap
      ariaLabel="owner A owner B 反向边循环 weak 打破 aggregate owner 六项图"
      caption="reference counting 只解决释放时机，不自动解决 ownership cycle；反向边用 weak 或集中 owner。"
      items={sharedItems}
    />
  );
}
