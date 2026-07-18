type Item = readonly [title: string, code: string, detail: string];

function ConstructionMap({
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

const lifetimeItems = [
  [
    "Virtual base",
    "construct first",
    "最派生构造函数负责虚基类，派生状态尚不存在。",
  ],
  ["Direct base", "Base::Base", "当前动态分派被限制在正在构造的 Base 层。"],
  [
    "Members",
    "declaration order",
    "派生成员仍未初始化，不能作为 virtual override 依赖。",
  ],
  ["Derived body", "Derived::Derived", "到此派生层才完成自己的成员与不变量。"],
  [
    "Normal life",
    "full dynamic type",
    "完整构造后 virtual 调用才按最派生类型分派。",
  ],
  [
    "Destruction",
    "reverse contraction",
    "派生析构结束后动态能力逐层收缩到基类。",
  ],
] as const;

const callItems = [
  ["Direct call", "virtual log()", "Base ctor 中直接调用只到 Base override。"],
  [
    "Helper call",
    "init() -> virtual",
    "非虚 helper 间接调用同样发生阶段受限分派。",
  ],
  ["NVI call", "public -> doWork", "NVI 不会绕过构造期间的动态类型规则。"],
  [
    "Pure virtual",
    "no base body",
    "若静态绑定或间接路径触及纯虚，可能链接失败或运行终止。",
  ],
  ["Callback", "register this", "构造中泄露 this 可让外部过早调用 virtual。"],
  ["Destructor", "cleanup virtual", "派生部分已销毁后只能看到当前基类实现。"],
] as const;

const alternativeItems = [
  [
    "Data first",
    "Base(logInfo)",
    "派生用静态 helper 计算信息并作为基类构造参数传入。",
  ],
  [
    "Non-virtual base init",
    "initBase",
    "基类构造只执行基类可独立完成的非虚逻辑。",
  ],
  [
    "Factory",
    "make + start",
    "完整构造后由 factory 调用可失败的 virtual 启动阶段。",
  ],
  ["State", "Constructed -> Started", "显式状态防止未启动对象进入普通操作。"],
  [
    "RAII rollback",
    "candidate owner",
    "start 失败由局部 owner 自动销毁完整对象。",
  ],
  [
    "Test",
    "phase probe",
    "每层记录成员就绪与 override 调用，证明没有提前访问。",
  ],
] as const;

export function EcppDynamicTypeLifetimeMap() {
  return (
    <ConstructionMap
      ariaLabel="虚基类直接基类成员派生构造正常生命周期析构六阶段动态图"
      caption="对象的可用动态类型随构造逐层扩展、随析构逐层收缩；未完成的派生层不能被 virtual 调用。"
      items={lifetimeItems}
    />
  );
}

export function EcppCtorVirtualCallMap() {
  return (
    <ConstructionMap
      ariaLabel="直接 helper NVI pure virtual this 泄露析构六类调用图"
      caption="无论直接、helper 还是 NVI，构造/析构期间 virtual 分派都不会进入尚未存在或已销毁的派生层。"
      items={callItems}
    />
  );
}

export function EcppConstructionAlternativeMap() {
  return (
    <ConstructionMap
      ariaLabel="数据传入非虚初始化 factory 状态 RAII 回滚测试六项替代设计图"
      caption="把派生数据作为构造参数传入，或在完整构造后显式 start；两种方案都要保持不变量和失败清理。"
      items={alternativeItems}
    />
  );
}
