type Item = readonly [title: string, code: string, detail: string];

function FederationMap({
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

const languageItems = [
  [
    "C",
    "pointers + arrays",
    "连续内存、显式地址和低层接口主导，资源责任必须可见。",
  ],
  [
    "Object-Oriented C++",
    "class + virtual",
    "封装、不变量、继承和运行期多态决定接口设计。",
  ],
  [
    "Template C++",
    "T + expressions",
    "隐式接口、实例化和编译期多态替代固定类型契约。",
  ],
  [
    "STL",
    "container + algorithm",
    "迭代器连接容器与算法，函数对象和范围形成自己的规约。",
  ],
  ["Boundary", "adapter", "跨次语言时显式转换所有权、范围和错误语义。"],
  [
    "Decision",
    "dominant abstraction",
    "先判断主导模型，再应用对应成本与正确性规则。",
  ],
] as const;

const decisionItems = [
  [
    "Raw bytes",
    "span<byte>",
    "处理缓冲区时保留连续内存事实，并用范围表达长度。",
  ],
  ["Owned object", "class + RAII", "对象有不变量和生命周期时让类统一管理。"],
  [
    "Runtime family",
    "virtual interface",
    "实现集合运行时变化且需要替换语义时使用多态。",
  ],
  [
    "Compile-time family",
    "template<T>",
    "类型在编译期已知且追求零开销泛化时使用模板。",
  ],
  [
    "Range transform",
    "algorithm",
    "遍历、查找、排序优先表达成 STL 算法与迭代器范围。",
  ],
  [
    "Mixed API",
    "boundary wrapper",
    "用适配层隔离 C 句柄、对象所有权与 STL 值语义。",
  ],
] as const;

const boundaryItems = [
  ["Acquire", "C handle", "低层 API 返回句柄并规定释放函数。"],
  ["Own", "RAII wrapper", "对象层把句柄和释放动作绑定到析构。"],
  [
    "Generalize",
    "template policy",
    "模板参数描述可替换释放策略而不增加虚调用。",
  ],
  ["Store", "vector<Owner>", "STL 容器保存可移动所有者，重分配保持语义。"],
  ["Process", "algorithm", "算法只依赖迭代器和值接口，不知道底层句柄。"],
  ["Verify", "single release", "失败、移动和容器销毁路径都恰好释放一次。"],
] as const;

export function EcppLanguageFederationMap() {
  return (
    <FederationMap
      ariaLabel="C 面向对象 C++ 模板 C++ STL 边界决策六项语言联邦图"
      caption="C++ 的有效规则随主导次语言变化；跨边界时要显式处理所有权、接口与成本。"
      items={languageItems}
    />
  );
}

export function EcppAbstractionDecisionMap() {
  return (
    <FederationMap
      ariaLabel="原始字节拥有对象运行时家族编译期家族范围变换混合接口决策图"
      caption="先识别任务的主导抽象，再选择指针、类、virtual、template 或 STL algorithm。"
      items={decisionItems}
    />
  );
}

export function EcppFederationBoundaryMap() {
  return (
    <FederationMap
      ariaLabel="C 句柄 RAII 模板策略 STL 容器算法单次释放边界图"
      caption="同一资源可以穿越四个次语言，但每层只承担自己的责任并保留单一所有权。"
      items={boundaryItems}
    />
  );
}
