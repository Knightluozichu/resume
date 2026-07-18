type Item = readonly [title: string, code: string, detail: string];

function SpecialMemberMap({
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

const generationItems = [
  [
    "Default ctor",
    "T()",
    "仅在没有用户声明构造函数时隐式声明，逐个默认初始化子对象。",
  ],
  ["Destructor", "~T()", "按逆序销毁成员与基类，virtual 性不会凭空产生。"],
  [
    "Copy ctor",
    "T(const T&)",
    "按基类与成员执行对应复制构造，签名可能因子对象改变。",
  ],
  [
    "Copy assign",
    "operator=(const T&)",
    "逐个复制赋值；const/reference 成员可使其 deleted。",
  ],
  [
    "Move ctor",
    "T(T&&)",
    "仅在复制、移动、析构均未用户声明等条件满足时隐式生成。",
  ],
  [
    "Move assign",
    "operator=(T&&)",
    "逐个移动赋值；成员不可移动时可能 deleted 或回落复制。",
  ],
] as const;

const subobjectItems = [
  [
    "Direct bases",
    "Base::Base/assign",
    "先按继承顺序调用每个直接基类对应操作。",
  ],
  ["Members", "member operation", "再按声明顺序对每个非静态成员执行对应操作。"],
  ["Array members", "element-wise", "数组按元素执行，不是简单复制地址。"],
  ["Raw pointer", "copy address", "默认复制只复制指针值，不复制所指资源。"],
  [
    "Const/reference",
    "assignment blocked",
    "不能重新赋值，常导致隐式赋值操作 deleted。",
  ],
  [
    "Failure",
    "deleted/inaccessible",
    "任一必要子操作不可用，整体特殊成员不可用。",
  ],
] as const;

const designItems = [
  [
    "Value members",
    "rule of zero",
    "成员自身正确管理资源时，让编译器生成全部操作。",
  ],
  [
    "Unique owner",
    "delete copy + move",
    "独占资源类型显式禁止复制并定义/默认移动。",
  ],
  [
    "Shared value",
    "deep copy / shared",
    "先决定复制语义，再实现全部拥有状态。",
  ],
  [
    "Polymorphic base",
    "virtual dtor",
    "析构语义明确，同时审查用户声明析构对 move 的抑制。",
  ],
  [
    "Identity object",
    "delete copy/move",
    "mutex、文件会话等身份对象通常不应复制。",
  ],
  [
    "Proof",
    "type_traits + runtime",
    "编译期检查可操作性，运行期验证资源与源对象状态。",
  ],
] as const;

export function EcppSpecialMemberGenerationMap() {
  return (
    <SpecialMemberMap
      ariaLabel="默认构造析构复制构造复制赋值移动构造移动赋值六项生成图"
      caption="编译器生成哪些特殊成员取决于用户声明和子对象能力；现代 move 规则与原书四项共同审查。"
      items={generationItems}
    />
  );
}

export function EcppMemberwiseOperationMap() {
  return (
    <SpecialMemberMap
      ariaLabel="基类成员数组裸指针常量引用失败六项 memberwise 操作图"
      caption="隐式复制和移动逐个处理 base/member；raw pointer 只复制地址，const/reference 会阻断赋值。"
      items={subobjectItems}
    />
  );
}

export function EcppSpecialMemberDesignMap() {
  return (
    <SpecialMemberMap
      ariaLabel="零规则独占所有共享值多态基类身份对象证明六项设计图"
      caption="先确定类型是值、所有者还是身份，再决定 default、delete 或自定义哪些特殊成员。"
      items={designItems}
    />
  );
}
