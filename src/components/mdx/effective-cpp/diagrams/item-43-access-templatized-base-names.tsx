type LookupCell = readonly [step: string, code: string, consequence: string];

function LookupGrid({
  ariaLabel,
  caption,
  cells,
}: {
  ariaLabel: string;
  caption: string;
  cells: readonly LookupCell[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cells.map(([step, code, consequence], index) => (
            <section
              key={step}
              className="min-h-40 border border-border bg-bg/40 p-4"
            >
              <span className="text-xs tabular-nums text-secondary">
                0{index + 1}
              </span>
              <strong className="mt-3 block text-sm text-primary">
                {step}
              </strong>
              <code className="mt-3 block text-xs text-accent">{code}</code>
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

const phaseCells = [
  ["Define derived", "LoggingSender<C>", "base MsgSender<C> 依赖未知 C。"],
  [
    "Read call",
    "sendClear(info)",
    "unqualified name 本身不依赖 template argument。",
  ],
  [
    "Phase one",
    "definition lookup",
    "compiler 不搜索 dependent base members。",
  ],
  [
    "Reason",
    "possible specialization",
    "MsgSender<SpecialC> 可能没有 sendClear。",
  ],
  ["Make dependent", "this->sendClear", "把查找延迟到具体 specialization。"],
  ["Phase two", "instantiate C", "此时验证实际 base 是否提供匹配成员。"],
] as const;

const remedyCells = [
  [
    "this pointer",
    "this->sendClear(info)",
    "依赖当前实例，保留 virtual dispatch。",
  ],
  [
    "Using declaration",
    "using Base<C>::sendClear",
    "把 base overload set 引入 derived scope。",
  ],
  [
    "Qualified call",
    "Base<C>::sendClear(info)",
    "明确 base 实现但可能绕过 virtual dispatch。",
  ],
  [
    "Overload effect",
    "whole overload set",
    "using 可让多个 base overload 参与选择。",
  ],
  [
    "Specialization check",
    "instantiate SpecialC",
    "三种写法最终都要验证成员存在。",
  ],
  [
    "Choose intent",
    "dynamic or exact base",
    "修复方式必须匹配分派与暴露语义。",
  ],
] as const;

const specializationCells = [
  ["Primary", "MsgSender<C>", "提供 clear 与 encrypted 两种发送。"],
  [
    "Full specialization",
    "MsgSender<CompanyZ>",
    "协议限制下只提供 encrypted。",
  ],
  [
    "Derived definition",
    "LoggingSender<C>",
    "定义时 C 可能最终等于 CompanyZ。",
  ],
  [
    "Unsafe assumption",
    "base has sendClear",
    "若提前接受，CompanyZ 实例化会违背接口。",
  ],
  ["Deferred lookup", "dependent expression", "具体 C 决定 base member 集合。"],
  ["Contract result", "clear unsupported", "实例化点给出真实缺失成员诊断。"],
] as const;

export function EcppTemplatizedBaseLookupMap() {
  return (
    <LookupGrid
      ariaLabel="定义派生读取调用第一阶段查找特化原因制造依赖第二阶段实例化六阶段模板基类查找图"
      caption="定义期不搜索 dependent base；把调用变成 dependent 后，成员查找和有效性检查延迟到实例化。"
      cells={phaseCells}
    />
  );
}

export function EcppTemplatizedBaseRemediesMap() {
  return (
    <LookupGrid
      ariaLabel="this 指针 using 声明显式限定重载集合特化检查意图选择六阶段基类名称修复图"
      caption="this、using 与 explicit qualification 都能触发正确查找，但在 overload visibility 和 virtual dispatch 上并不等价。"
      cells={remedyCells}
    />
  );
}

export function EcppDependentBaseSpecializationMap() {
  return (
    <LookupGrid
      ariaLabel="主模板完全特化派生定义不安全假设延迟查找契约结果六阶段特化接口分歧图"
      caption="specialization 可改变 base interface，因此 compiler 必须拒绝在定义期假设主模板成员必然存在。"
      cells={specializationCells}
    />
  );
}
