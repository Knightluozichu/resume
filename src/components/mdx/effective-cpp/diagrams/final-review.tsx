type ReviewCell = readonly [layer: string, question: string, evidence: string];

function ReviewGrid({
  ariaLabel,
  caption,
  cells,
}: {
  ariaLabel: string;
  caption: string;
  cells: readonly ReviewCell[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cells.map(([layer, question, evidence], index) => (
            <section
              key={layer}
              className="min-h-40 border border-border bg-bg/40 p-4"
            >
              <span className="text-xs tabular-nums text-secondary">
                0{index + 1}
              </span>
              <strong className="mt-3 block text-sm text-primary">
                {layer}
              </strong>
              <code className="mt-3 block text-xs text-accent">{question}</code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {evidence}
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

const principleCells = [
  [
    "Object",
    "valid from birth?",
    "初始化、special members 和 destructor 建立值语义。",
  ],
  [
    "Resource",
    "who owns/releases?",
    "RAII、unique/shared/borrow 明确生命周期。",
  ],
  [
    "Interface",
    "wrong use representable?",
    "类型、private data 和 non-member 边界保护不变量。",
  ],
  [
    "Implementation",
    "failure leaves what?",
    "异常保证、dependency 和 handle exposure 可验证。",
  ],
  [
    "Polymorphism",
    "is-a and dispatch?",
    "substitutability、virtual/NVI 和 composition 匹配语义。",
  ],
  [
    "Generic/system",
    "static contract and cost?",
    "traits/TMP、allocation、warnings 与 libraries 收口。",
  ],
] as const;

const diagnosisCells = [
  [
    "Leak/double free",
    "Items 13-17, 29",
    "ownership graph、失败注入和析构计数。",
  ],
  [
    "Wrong dispatch",
    "Items 32-40, 53",
    "base-view tests、override 和 static/dynamic binding。",
  ],
  [
    "Template failure",
    "Items 41-48",
    "区分 lookup、deduction、conversion 与 instantiation。",
  ],
  [
    "Slow build/binary",
    "Items 30-31, 44, 48",
    "include graph、symbols、instantiation 和 benchmark。",
  ],
  [
    "Allocator fault",
    "Items 49-52",
    "handler、alignment、family pairing 和 constructor failure。",
  ],
  [
    "Portability gap",
    "Items 1, 53-55",
    "多 compiler/library matrix 和标准 contract。",
  ],
] as const;

const acceptanceCells = [
  ["Compile", "warnings + static checks", "required toolchains 零新增诊断。"],
  ["Unit", "positive/negative contracts", "正常路径和必须拒绝的 misuse。"],
  ["Failure", "exceptions/OOM/injection", "所有 rollback、释放和状态保证。"],
  ["Dynamic", "sanitizers", "lifetime、UB、race 和越界证据。"],
  [
    "Performance",
    "profiles + budgets",
    "热点、binary、build 和 allocator 指标。",
  ],
  ["Review", "Items-to-code trace", "每项原则有代码位置、测试和 owner。"],
] as const;

export function EcppWholeBookPrincipleMap() {
  return (
    <ReviewGrid
      ariaLabel="对象资源接口实现多态泛型系统六层 Effective C++ 总原则图"
      caption="整书主线是把正确性从人的记忆迁入对象、ownership、接口、类型系统和可验证工程门禁。"
      cells={principleCells}
    />
  );
}

export function EcppCrossItemDiagnosisMap() {
  return (
    <ReviewGrid
      ariaLabel="资源错误分派错误模板失败构建膨胀分配错误可移植性六类跨条款诊断图"
      caption="真实故障通常跨越多个 Items；先按症状定位原则集合，再用对应 evidence 区分根因。"
      cells={diagnosisCells}
    />
  );
}

export function EcppFinalAcceptanceMap() {
  return (
    <ReviewGrid
      ariaLabel="编译单测失败注入动态分析性能审查六层全书验收图"
      caption="全书验收从 compile-time contract 到 failure、sanitizer、performance 和 review trace，不能以一次成功运行代替。"
      cells={acceptanceCells}
    />
  );
}
