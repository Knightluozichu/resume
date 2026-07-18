type HandleCell = readonly [stage: string, handle: string, consequence: string];

function HandleGrid({
  ariaLabel,
  caption,
  cells,
}: {
  ariaLabel: string;
  caption: string;
  cells: readonly HandleCell[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cells.map(([stage, handle, consequence], index) => (
            <section
              key={stage}
              className="min-h-40 border border-border bg-bg/40 p-4"
            >
              <span className="text-xs tabular-nums text-secondary">
                0{index + 1}
              </span>
              <strong className="mt-3 block text-sm text-primary">
                {stage}
              </strong>
              <code className="mt-3 block text-xs text-accent">{handle}</code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {consequence}
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

const escapeCells = [
  ["Const owner", "const Rectangle", "调用者预期只能观察 rectangle。"],
  [
    "Const query",
    "upperLeft() const",
    "member const 只约束 this access path。",
  ],
  ["Mutable return", "Point&", "返回值重新授予内部 Point 写权限。"],
  [
    "External write",
    "handle.setX",
    "调用者绕过 Rectangle invariant 修改 corner。",
  ],
  ["Broken state", "left > right", "Rectangle 的几何关系可被外部制造为非法。"],
  [
    "Repair",
    "Point value / command",
    "返回 snapshot 或让 owner 执行受控变更。",
  ],
] as const;

const danglingCells = [
  ["Create owner", "Rectangle temp", "owner 管理内部 corner/storage。"],
  ["Borrow", "const Point& p", "引用自身不延长 Rectangle lifetime。"],
  ["Destroy owner", "~Rectangle", "完整对象与内部 Point 生命周期结束。"],
  ["Keep address", "p remains", "引用变量仍保存原 storage 地址。"],
  ["Read later", "p.x()", "访问已结束生命周期对象，产生未定义行为。"],
  [
    "Prevent",
    "&& overload deleted/value",
    "临时 owner 不允许发布长寿命内部 borrow。",
  ],
] as const;

const decisionCells = [
  [
    "Small observation",
    "return value",
    "独立 snapshot，无 owner lifetime 和失效耦合。",
  ],
  [
    "Controlled mutation",
    "owner command",
    "校验后原子更新，不发布 mutable handle。",
  ],
  ["Large read", "scoped callback", "借用只在 owner 控制的调用期间存在。"],
  ["Stable identity", "ID / key", "调用者保存逻辑标识，每次使用重新解析。"],
  [
    "Shared lifetime",
    "shared owner",
    "确有共同 ownership 时返回 owner，而非内部裸别名。",
  ],
  [
    "Range view",
    "span/range",
    "只读 view 需明确 mutation、reallocation 与 owner lifetime。",
  ],
] as const;

export function EcppInternalHandleEscapeMap() {
  return (
    <HandleGrid
      ariaLabel="常量拥有者常量查询可变返回外部写入非法状态修复六阶段内部句柄逃逸图"
      caption="const member 不会自动让返回别名只读；mutable reference 可穿透封装直接破坏 owner invariant。"
      cells={escapeCells}
    />
  );
}

export function EcppDanglingHandleTimelineMap() {
  return (
    <HandleGrid
      ariaLabel="创建拥有者借用销毁保留地址稍后读取防止六阶段悬空句柄时间线图"
      caption="即使返回 const reference，也没有延长 owner 生命周期；owner 销毁后 handle 立即悬空。"
      cells={danglingCells}
    />
  );
}

export function EcppSafeReturnContractMap() {
  return (
    <HandleGrid
      ariaLabel="值快照受控修改作用域回调稳定标识共享所有权范围视图六类安全返回契约图"
      caption="先判断调用者需要 snapshot、mutation、identity 还是 shared lifetime，再选择不泄漏内部表示的契约。"
      cells={decisionCells}
    />
  );
}
