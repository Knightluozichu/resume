type Item = readonly [title: string, code: string, detail: string];

function SelfAssignmentMap({
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

const failureItems = [
  ["Alias", "this == &rhs", "左右表达式最终指向同一个资源拥有者。"],
  ["Delete", "delete data_", "目标先释放资源，也同时破坏 rhs 所见数据。"],
  ["Read", "rhs.data_", "随后从已释放地址读取，形成 use-after-free。"],
  ["Allocate", "new Value(...) ", "即使分配成功，源内容已经丢失。"],
  [
    "Throw",
    "allocation failure",
    "目标还留下 dangling pointer，析构可能 double delete。",
  ],
  [
    "Outcome",
    "invalid object",
    "同时违反 self-assignment 与 exception safety。",
  ],
] as const;

const strategyItems = [
  [
    "Identity guard",
    "if (this == &rhs)",
    "快速跳过显式同一对象，但其余路径仍需异常安全。",
  ],
  [
    "Copy before delete",
    "newValue first",
    "先复制候选，成功后才释放旧资源并提交。",
  ],
  [
    "Copy-and-swap",
    "T temp(rhs)",
    "候选构造与 no-throw swap 自然处理 self-assignment。",
  ],
  [
    "Value members",
    "rule of zero",
    "string/vector 自身处理别名，避免手写资源赋值。",
  ],
  [
    "Move guard",
    "this != &rhs",
    "资源 owner 的 self-move 可显式保持值或定义有效空状态。",
  ],
  [
    "Verify",
    "failure injection",
    "每个分配点抛异常，目标值与资源计数仍符合保证。",
  ],
] as const;

const aliasItems = [
  ["Direct", "a = a", "最明显形式，地址比较能识别。"],
  ["Pointers", "*px = *py", "不同指针变量可能指向同一对象。"],
  ["References", "left = right", "两个引用来自同一容器元素或缓存。"],
  ["Base view", "Base&", "两个基类引用可别名到同一派生对象。"],
  ["Subobject", "wrapper.member", "源可能通过 view 间接引用目标内部表示。"],
  ["Self move", "x = std::move(x)", "地址仍相同，但源被显式转为右值。"],
] as const;

export function EcppSelfAssignmentFailureMap() {
  return (
    <SelfAssignmentMap
      ariaLabel="别名删除读取分配异常无效对象六阶段自我赋值失败图"
      caption="delete-before-copy 在 self-assignment 时先摧毁源；异常还会让目标持有 dangling resource。"
      items={failureItems}
    />
  );
}

export function EcppSelfAssignmentStrategyMap() {
  return (
    <SelfAssignmentMap
      ariaLabel="身份检查先复制后删除 copy swap 值成员移动保护失败注入六策略图"
      caption="真正稳健方案同时处理 alias 与异常；identity guard 只是优化，不是完整保证。"
      items={strategyItems}
    />
  );
}

export function EcppAliasingSourcesMap() {
  return (
    <SelfAssignmentMap
      ariaLabel="直接指针引用基类视图子对象 self move 六类别名来源图"
      caption="self-assignment 常由不同表达式间接形成，测试必须覆盖 pointer/reference/base/subobject alias。"
      items={aliasItems}
    />
  );
}
