type WarningCell = readonly [stage: string, signal: string, action: string];

function WarningGrid({
  ariaLabel,
  caption,
  cells,
}: {
  ariaLabel: string;
  caption: string;
  cells: readonly WarningCell[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cells.map(([stage, signal, action], index) => (
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
              <code className="mt-3 block text-xs text-accent">{signal}</code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {action}
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

const lifecycleCells = [
  ["Enable", "high warning level", "项目、CI 与 release 使用同一基线。"],
  ["Capture", "diagnostic id + location", "保留完整 message，不只截最后一行。"],
  ["Classify", "bug / portability / noise", "先理解语义，再决定修复或抑制。"],
  ["Fix root", "code + contract test", "修改代码并补能证明行为的测试。"],
  [
    "Suppress narrowly",
    "one diagnostic / scope",
    "必要抑制附理由、owner 和到期条件。",
  ],
  ["Gate", "zero new warnings", "baseline 不增长，升级 compiler 时重新审计。"],
] as const;

const hidingCells = [
  ["Base contract", "virtual f() const", "base 提供 const-qualified virtual。"],
  ["Derived typo", "void f()", "缺少 const，形成不同 signature。"],
  ["Lookup", "D::f hides B::f", "derived 同名声明隐藏 base 名称。"],
  ["Dispatch", "B& -> D object", "经 base call 仍执行 Base::f。"],
  [
    "Warning",
    "overloaded-virtual",
    "compiler 提示看似 override 实际没有覆盖。",
  ],
  ["Repair", "override + const", "override 把未来 mismatch 升为 hard error。"],
] as const;

const compilerCells = [
  ["GCC", "-Wall -Wextra", "擅长转换、未使用与部分 ABI 诊断。"],
  ["Clang", "-Weverything curated", "常给出清晰 fix-it 和不同静态分析。"],
  ["MSVC", "/W4 /permissive-", "暴露语言扩展、Windows ABI 与一致性问题。"],
  ["Library", "libstdc++ / libc++", "headers 与实现差异触发不同 assumptions。"],
  ["Standard mode", "C++20 strict", "禁止依赖非标准扩展和旧默认。"],
  ["Matrix gate", "all required jobs", "任一目标 warning/error 都阻止合并。"],
] as const;

export function EcppWarningLifecycleMap() {
  return (
    <WarningGrid
      ariaLabel="启用警告捕获诊断分类根因修复局部抑制零新增门禁六阶段 warning 生命周期图"
      caption="warning 不是背景噪声：统一启用、理解语义、修复根因，只有证据充分时才局部抑制，并阻止 baseline 增长。"
      cells={lifecycleCells}
    />
  );
}

export function EcppHiddenVirtualWarningMap() {
  return (
    <WarningGrid
      ariaLabel="基类契约派生签名错误名字隐藏动态分派编译警告 override 修复六阶段隐藏 virtual 图"
      caption="一个缺失 const 的 derived function 不会 override base virtual；warning 揭示真实分派偏差，override 将其变成编译错误。"
      cells={hidingCells}
    />
  );
}

export function EcppMultiCompilerWarningMap() {
  return (
    <WarningGrid
      ariaLabel="GCC Clang MSVC 标准库标准模式矩阵门禁六维多编译器警告图"
      caption="different compilers 和 libraries 覆盖不同诊断盲区；多工具链矩阵比单一 warning level 更接近 portability 证据。"
      cells={compilerCells}
    />
  );
}
