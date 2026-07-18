type Item = readonly [title: string, code: string, detail: string];

function RawAccessMap({
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

const boundaryItems = [
  [
    "Owner",
    "unique_ptr/Handle",
    "管理对象保存资源和 deleter，承担唯一释放责任。",
  ],
  ["Project", "get()/native_handle", "显式产生短期 raw borrow，不改变 owner。"],
  ["Call", "legacy_api(raw)", "外部 API 只在调用期间使用且不得保存/释放。"],
  ["Return", "owner still active", "调用结束后管理对象继续拥有同一资源。"],
  [
    "Invalidate",
    "reset/move/destroy",
    "owner 变化后所有旧 raw borrow 立即失效。",
  ],
  [
    "Verify",
    "borrow ledger",
    "测试 API 未释放、未越期保存，owner 最终释放一次。",
  ],
] as const;

const accessItems = [
  [
    "Named getter",
    "get()/native_handle",
    "最明确，可搜索、可审计，调用点承认 raw boundary。",
  ],
  ["Dereference", "operator*", "提供对象引用语义，不暴露 owner 控制操作。"],
  ["Arrow", "operator->", "像 pointer 一样访问资源成员，适合智能指针。"],
  [
    "Explicit conversion",
    "explicit operator T*",
    "需要 cast/context 才转换，减少误用。",
  ],
  [
    "Implicit conversion",
    "operator T*",
    "调用方便但可进入意外重载、比较或 delete。",
  ],
  ["Release", "release()", "不是 borrow，而是转移 ownership，必须单独命名。"],
] as const;

const lifetimeItems = [
  ["Borrow starts", "raw = owner.get()", "记录 owner 身份和当前 generation。"],
  ["Use", "non-owning call", "只在 owner 保证存活、资源未替换的窗口访问。"],
  [
    "Move owner",
    "owner2 = move(owner)",
    "resource 仍存活但旧 owner 状态改变，借用协议需明确。",
  ],
  ["Reset", "owner.reset()", "资源释放，所有 raw/reference/view 悬空。"],
  [
    "Async escape",
    "callback stores raw",
    "调用结束后继续使用，形成 use-after-free 风险。",
  ],
  ["Repair", "shared/weak/token", "需延长或异步观察时升级为明确生命周期机制。"],
] as const;

export function EcppRawAccessBoundaryMap() {
  return (
    <RawAccessMap
      ariaLabel="owner 投影调用返回失效验证六阶段 raw resource 边界图"
      caption="raw access 是 borrow projection：外部 API 不取得 ownership，owner move/reset/destroy 后借用失效。"
      items={boundaryItems}
    />
  );
}

export function EcppResourceAccessFormsMap() {
  return (
    <RawAccessMap
      ariaLabel="命名 getter 解引用箭头显式转换隐式转换 release 六种访问形式图"
      caption="named getter 最清楚；operator 星号箭头保留 pointer 体验；implicit conversion 便利但扩大误用面。"
      items={accessItems}
    />
  );
}

export function EcppBorrowLifetimeMap() {
  return (
    <RawAccessMap
      ariaLabel="借用开始使用 owner move reset 异步逃逸修复六阶段生命周期图"
      caption="raw handle 不携带生命周期；异步或长期保存必须改为 shared/weak/token 等明确协议。"
      items={lifetimeItems}
    />
  );
}
