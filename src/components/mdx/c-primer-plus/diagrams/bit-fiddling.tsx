const contracts = [
  ["Type", "choose unsigned width", "位模式先确定无符号类型和位宽；协议与寄存器优先使用stdint固定宽度类型，并显式处理字节序"],
  ["Count", "0 <= shift < width", "负移位或达到提升后左操作数位宽的移位都未定义；宽度用CHAR_BIT与sizeof推导"],
  ["Mask", "field = value & mask", "掩码、目标和补码结果保持同一无符号宽度，避免窄掩码清掉宽目标的高位"],
  ["Layout", "bit-field and alignment are ABI", "位字段分配顺序与单元边界由实现决定；_Alignas/_Alignof表达对象对齐而非线协议布局"],
] as const;

export function CPrimerBitContractDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="C Primer Plus第十五章无符号位宽移位计数掩码宽度和位字段对齐契约"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {contracts.map(([title, code, meaning], index) => (
            <section key={title} className="min-h-40 border border-border bg-bg/40 p-4">
              <span className="text-xs tabular-nums text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">{title}</strong>
              <code className="mt-3 block text-xs text-accent">{code}</code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">{meaning}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Chapter 15 的位级契约：先定无符号宽度，再验移位计数，掩码保持同宽，位字段与对齐只在已验证 ABI 内解释。
      </figcaption>
    </figure>
  );
}
