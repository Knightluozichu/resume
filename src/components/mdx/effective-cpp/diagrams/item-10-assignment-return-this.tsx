type Item = readonly [title: string, code: string, detail: string];

function AssignmentMap({
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

const chainItems = [
  ["Parse", "x = (y = z)", "赋值右结合，最右侧操作先执行。"],
  ["Inner", "y.operator=(z)", "更新 y 后返回 y 自身的左值引用。"],
  ["Result", "Y&", "表达式结果继续作为外层赋值源。"],
  ["Outer", "x.operator=(y)", "x 读取已经提交后的 y 值。"],
  ["Identity", "&result == &y", "返回对象必须就是左操作数，不是副本或临时量。"],
  [
    "Compose",
    "assignment expression",
    "调用方可继续成员访问、比较或复合赋值。",
  ],
] as const;

const implementationItems = [
  ["Validate", "source + invariants", "先检查源、别名和资源约束。"],
  ["Prepare", "candidate state", "可能失败的复制在局部完成，不先破坏 this。"],
  ["Commit", "swap/move members", "成功后一次替换目标表示。"],
  ["Invariant", "target valid", "目标在成功或异常路径都保持合法。"],
  ["Return", "return *this", "返回非 const 左值引用，身份与目标相同。"],
  ["Verify", "address + chain", "断言返回地址、连锁值和异常前后状态。"],
] as const;

const familyItems = [
  ["Copy assign", "T& operator=(const T&)", "标准赋值接口，返回目标本身。"],
  ["Move assign", "T& operator=(T&&)", "转移源表示后仍返回目标引用。"],
  ["Scalar assign", "T& operator=(U)", "跨类型赋值若合理也遵守同一惯例。"],
  ["Compound", "operator+= / -=", "修改左操作数并返回引用，支持连续复合操作。"],
  ["Ref qualify", "operator=() &", "可限制赋值只发生在可寻址左值目标。"],
  [
    "Concept",
    "assignable_from",
    "标准泛型约束期望赋值表达式返回目标左值引用。",
  ],
] as const;

export function EcppAssignmentChainMap() {
  return (
    <AssignmentMap
      ariaLabel="赋值解析内层结果外层身份组合六阶段连锁图"
      caption="x = y = z 按右结合执行；内层 operator= 返回 y 的引用，才能成为外层赋值源。"
      items={chainItems}
    />
  );
}

export function EcppAssignmentImplementationMap() {
  return (
    <AssignmentMap
      ariaLabel="赋值验证准备提交通用不变量返回验证六阶段图"
      caption="返回 *this 是接口结尾；在此之前仍要保证自我赋值、资源与异常路径正确。"
      items={implementationItems}
    />
  );
}

export function EcppAssignmentFamilyMap() {
  return (
    <AssignmentMap
      ariaLabel="复制移动跨类型复合赋值 ref qualifier concept 六项接口图"
      caption="返回 reference to *this 的惯例适用于整组赋值操作，并与标准 assignable 语义衔接。"
      items={familyItems}
    />
  );
}
