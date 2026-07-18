type Item = readonly [title: string, code: string, detail: string];

function ResourceMap({
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

const leakItems = [
  [
    "Acquire",
    "new / fopen / lock",
    "裸资源进入局部变量，释放责任只存在于程序员记忆。",
  ],
  ["Work", "process resource", "后续分支与调用扩大控制流。"],
  ["Early return", "return error", "跳过手写 delete/close/unlock。"],
  ["Exception", "callee throws", "栈展开绕过位于后面的释放语句。"],
  ["Leak/deadlock", "resource remains", "内存、句柄或锁没有按协议归还。"],
  [
    "Repair",
    "owner immediately",
    "获取成功后立刻构造 RAII owner，退出路径自动统一。",
  ],
] as const;

const raiiItems = [
  ["Acquire", "constructor/factory", "成功获取资源并建立管理对象不变量。"],
  ["Own", "single owner field", "释放责任由类型表示，不散落在调用点。"],
  ["Use", "borrowed access", "业务代码借用资源但不取得销毁权。"],
  ["Transfer", "move/shared copy", "所有权只能按类型规定转移或共享。"],
  ["Unwind", "automatic destructor", "正常返回和异常都执行 owner 析构。"],
  ["Release", "deleter once", "配对释放函数恰好调用一次且不抛异常。"],
] as const;

const ownershipItems = [
  [
    "Value resource",
    "vector/string",
    "优先让资源成为标准值成员并使用 rule of zero。",
  ],
  ["Unique", "unique_ptr", "单一 owner、低开销、可 move，不可 copy。"],
  [
    "Shared",
    "shared_ptr",
    "多个 owner 共同延长生命周期，有 control block 成本。",
  ],
  ["Observation", "weak_ptr", "观察 shared resource 而不延长生命周期。"],
  [
    "Custom",
    "unique_ptr<T,D>",
    "句柄、FILE、socket 通过 deleter 绑定配对释放。",
  ],
  [
    "Scope",
    "lock_guard/scope_exit",
    "非堆资源以专用 RAII 类型管理进入离开动作。",
  ],
] as const;

export function EcppManualResourceLeakMap() {
  return (
    <ResourceMap
      ariaLabel="获取工作提前返回异常泄漏修复六阶段手工资源图"
      caption="手工释放依赖每条控制路径都记得 cleanup；资源获取后立即交给对象可统一正常与异常退出。"
      items={leakItems}
    />
  );
}

export function EcppRaiiLifecycleMap() {
  return (
    <ResourceMap
      ariaLabel="获取拥有借用转移栈展开释放六阶段 RAII 图"
      caption="RAII 把资源责任绑定对象生命周期；borrower 使用资源，owner 的 destructor 保证一次释放。"
      items={raiiItems}
    />
  );
}

export function EcppOwnershipChoiceMap() {
  return (
    <ResourceMap
      ariaLabel="值资源 unique shared weak custom scope 六类所有权选择图"
      caption="先选择值、独占、共享或观察语义，再选择对应管理对象；shared_ptr 不是默认答案。"
      items={ownershipItems}
    />
  );
}
