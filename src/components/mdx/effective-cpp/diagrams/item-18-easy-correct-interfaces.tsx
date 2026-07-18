type InterfaceStep = readonly [title: string, signal: string, detail: string];

function InterfaceDiagram({
  ariaLabel,
  caption,
  steps,
}: {
  ariaLabel: string;
  caption: string;
  steps: readonly InterfaceStep[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 md:grid-cols-2 lg:grid-cols-3"
        >
          {steps.map(([title, signal, detail], index) => (
            <section
              key={title}
              className="min-h-40 border border-border bg-bg/40 p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <strong className="text-sm text-primary">{title}</strong>
                <span className="text-xs tabular-nums text-secondary">
                  0{index + 1}
                </span>
              </div>
              <code className="mt-3 block text-xs text-accent">{signal}</code>
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

const frictionSteps = [
  ["Observe", "Date(30, 2, 2026)", "参数类型相同，调用可读却表达了无效日期。"],
  [
    "Name",
    "Day / Month / Year",
    "不同语义进入不同类型，位置互换变成编译错误。",
  ],
  ["Constrain", "Month::Feb()", "有限值由命名构造入口产生，不接受任意整数。"],
  [
    "Normalize",
    "one naming rule",
    "接口沿用标准容器与项目既有命名、错误约定。",
  ],
  ["Own", "return typed owner", "创建函数在返回前绑定释放策略，不发布裸责任。"],
  [
    "Verify",
    "invalid calls fail",
    "编译期负例和运行期边界测试证明误用路径被封闭。",
  ],
] as const;

const strongTypeSteps = [
  ["Raw input", "int month", "外部数据暂时不可信，不能直接进入领域操作。"],
  ["Validate", "1 <= month <= 12", "边界入口完成一次范围检查并返回明确错误。"],
  ["Construct", "Month::fromInt", "成功后得到满足不变量的领域值。"],
  ["Compose", "Date{Day, Month, Year}", "构造器只接收已验证、不可互换的参数。"],
  ["Operate", "schedule(Date)", "内部 API 不再重复检查月份与参数次序。"],
  ["Serialize", "toWire(date)", "只在系统边缘还原协议表示，核心仍保持强类型。"],
] as const;

const dllSteps = [
  [
    "Allocate",
    "library create()",
    "对象由动态库自己的 allocator 和构建配置创建。",
  ],
  ["Package", "handle + destroy", "返回值同时携带对象句柄与同模块释放函数。"],
  [
    "Transfer",
    "unique owner",
    "应用立即接管 typed owner，不获得直接 delete 权限。",
  ],
  ["Use", "borrow Api&", "业务代码只借用接口，不复制释放协议。"],
  [
    "Release",
    "library destroy()",
    "owner 析构回调原动态库，释放发生在创建侧。",
  ],
  ["Audit", "one create / one destroy", "集成测试核对模块、顺序和失败路径。"],
] as const;

export function EcppInterfaceFrictionMap() {
  return (
    <InterfaceDiagram
      ariaLabel="观察命名约束一致性所有权验证六层易正确难误用接口防线图"
      caption="接口安全不是增加说明文字，而是逐层删除无效调用、含混责任和不一致约定。"
      steps={frictionSteps}
    />
  );
}

export function EcppStrongTypePipelineMap() {
  return (
    <InterfaceDiagram
      ariaLabel="原始输入验证构造组合操作序列化六阶段强类型数据流水线图"
      caption="原始表示只停留在边界；一旦构造成强类型，内部代码即可依赖已成立的不变量。"
      steps={strongTypeSteps}
    />
  );
}

export function EcppCrossDllOwnershipMap() {
  return (
    <InterfaceDiagram
      ariaLabel="动态库分配打包传递借用释放审计六阶段跨模块所有权图"
      caption="谁分配，谁提供释放函数；typed owner 把跨 DLL 的配对规则固化在返回类型中。"
      steps={dllSteps}
    />
  );
}
