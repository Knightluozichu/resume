type Item = readonly [title: string, code: string, detail: string];

function DeleteMap({
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

const techniqueItems = [
  [
    "Implicit copy",
    "no declaration",
    "编译器可能公开生成 copy，调用意外成功。",
  ],
  [
    "Private declare",
    "T(const T&);",
    "普通调用编译失败，member/friend 误用延迟到链接失败。",
  ],
  [
    "Uncopyable base",
    "private base copy",
    "派生隐式 copy 因无法调用基类 copy 而失败。",
  ],
  [
    "Deleted copy",
    "T(const T&) = delete",
    "所有调用方在重载选择后立即得到明确编译诊断。",
  ],
  ["Deleted move", "T(T&&) = delete", "与 copy 决策分开，防止身份对象被转移。"],
  [
    "Verify",
    "traits + compile-fail",
    "正向能力用 traits，禁止表达式用负向编译测试。",
  ],
] as const;

const policyItems = [
  ["Value", "copy + move", "独立等价值应支持复制，移动保持源可析构。"],
  ["Unique owner", "delete copy, move", "独占资源禁止复制，可转移唯一所有权。"],
  ["Shared owner", "copy shares", "复制增加共享所有权，语义必须公开。"],
  [
    "Identity",
    "delete copy + move",
    "mutex、线程、注册会话通常不能复制或搬迁身份。",
  ],
  ["View", "cheap copy", "非拥有 view 常可复制，但失效规则必须明确。"],
  [
    "Polymorphic base",
    "protected/default policy",
    "抽象接口常禁止按值复制并通过 clone 表达多态复制。",
  ],
] as const;

const diagnosticItems = [
  ["Call", "T b = a", "重载解析找到 deleted copy 并在调用点失败。"],
  ["Container", "vector<T>", "容器要求与操作路径决定 copy/move 约束是否满足。"],
  ["Derived", "D copies B", "基类 deleted copy 自动传播到派生隐式 copy。"],
  [
    "Friend",
    "friend tries copy",
    "= delete 对 friend 同样生效，不留链接期漏洞。",
  ],
  [
    "Conversion",
    "f(int) = delete",
    "deleted overload 还能阻止不希望的类型转换。",
  ],
  [
    "Message",
    "public deleted API",
    "公开 deleted 声明让文档、traits 和诊断一致。",
  ],
] as const;

export function EcppCopyPreventionTechniquesMap() {
  return (
    <DeleteMap
      ariaLabel="隐式复制 private 声明 Uncopyable 基类 deleted copy deleted move 验证六项图"
      caption="原书技术逐步把失败提前；现代 = delete 在调用点统一拒绝普通、member 与 friend 误用。"
      items={techniqueItems}
    />
  );
}

export function EcppCopyMovePolicyMap() {
  return (
    <DeleteMap
      ariaLabel="值独占共享身份视图多态基类六类复制移动策略图"
      caption="先确定类型语义，再分别决定 copy 与 move；禁止能力本身也是 public 接口。"
      items={policyItems}
    />
  );
}

export function EcppDeletedFunctionDiagnosticMap() {
  return (
    <DeleteMap
      ariaLabel="调用容器派生 friend 转换诊断六项 deleted function 图"
      caption="deleted function 参与重载后明确失败，可传播到组合与继承，并用于阻止意外转换。"
      items={diagnosticItems}
    />
  );
}
