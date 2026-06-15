/**
 * <ShiftOperatorsDiagram>：左移 &lt;&lt; 与右移 &gt;&gt;（step 1-3）。
 *
 * step 1: 左移 << 乘 2^n
 * step 2: 逻辑右移 >> 无符号
 * step 3: 算术右移 >> 有符号（保留符号位）
 */

interface ShiftOperatorsDiagramProps {
  step?: 1 | 2 | 3;
}

export function ShiftOperatorsDiagram({ step = 3 }: ShiftOperatorsDiagramProps) {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const bgEl = "var(--bg-elevated)";
  const good = "rgb(63,185,127)";
  const warn = "rgb(229,181,103)";

  const highlight = (s: number) => (step === s ? 1 : step > s ? 0.75 : 0.35);

  const renderBits = (bits: string[], startX: number, y: number, label: string, hlFrom?: number) => (
    <g>
      <text x={startX} y={y - 8} fontSize="10" fill={secondary} fontFamily="monospace">
        {label}
      </text>
      {bits.map((b, i) => {
        const x = startX + i * 28;
        const hl = hlFrom !== undefined && i >= hlFrom;
        return (
          <g key={`${label}-${i}`}>
            <rect
              x={x}
              y={y}
              width={24}
              height={28}
              rx="4"
              fill={hl ? `${good}22` : bgEl}
              stroke={hl ? good : border}
              strokeWidth="1"
            />
            <text x={x + 12} y={y + 19} textAnchor="middle" fontSize="11" fill={primary} fontFamily="monospace">
              {b}
            </text>
          </g>
        );
      })}
    </g>
  );

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 320"
          role="img"
          aria-label="左移与右移运算符三步示意"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <text x={24} y={28} fontSize="16" fontWeight="700" fill={primary} fontFamily="monospace">
            位移运算符 &lt;&lt; 与 &gt;&gt;
          </text>

          <g opacity={highlight(1)}>
            <rect
              x={24}
              y={44}
              width={592}
              height={78}
              rx="8"
              fill={step === 1 ? bgEl : bg}
              stroke={step === 1 ? accent : border}
              strokeWidth={step === 1 ? 2 : 1}
            />
            <text x={44} y={66} fontSize="12" fontWeight="700" fill={step === 1 ? accent : secondary}>
              ① 左移 &lt;&lt; n
            </text>
            <text x={44} y={86} fontSize="11" fill={primary} fontFamily="monospace">
              0000 0101 &lt;&lt; 2 → 0001 0100
            </text>
            <text x={44} y={106} fontSize="10" fill={secondary}>
              位向左移动 n 位，右侧补 0；等价于无溢出时 × 2^n（5 &lt;&lt; 2 = 20）
            </text>
          </g>

          <g opacity={highlight(2)}>
            <rect
              x={24}
              y={132}
              width={592}
              height={78}
              rx="8"
              fill={step === 2 ? bgEl : bg}
              stroke={step === 2 ? accent : border}
              strokeWidth={step === 2 ? 2 : 1}
            />
            <text x={44} y={154} fontSize="12" fontWeight="700" fill={step === 2 ? accent : secondary}>
              ② 无符号右移 &gt;&gt; n
            </text>
            {renderBits(["0", "0", "1", "1", "0", "0", "0", "0"], 44, 168, "1011 0000 >> 2", 6)}
            <text x={280} y={186} fontSize="10" fill={secondary}>
              左侧补 0；等价 ÷ 2^n（整除）
            </text>
          </g>

          <g opacity={highlight(3)}>
            <rect
              x={24}
              y={220}
              width={592}
              height={88}
              rx="8"
              fill={step === 3 ? bgEl : bg}
              stroke={step === 3 ? accent : border}
              strokeWidth={step === 3 ? 2 : 1}
            />
            <text x={44} y={242} fontSize="12" fontWeight="700" fill={step === 3 ? accent : secondary}>
              ③ 有符号右移 &gt;&gt; n（算术右移）
            </text>
            {renderBits(["1", "1", "0", "1", "0", "0", "0", "0"], 44, 256, "1101 0000 >> 2 (signed)", 6)}
            <text x={280} y={274} fontSize="10" fill={warn}>
              左侧补**符号位**（负数补 1）；C 对有符号 &gt;&gt; 实现定义，多数平台为算术右移
            </text>
            <text x={44} y={298} fontSize="10" fill={secondary}>
              右移负数不等于数学除法——-1 {'>>'} 1 可能仍是 -1
            </text>
          </g>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        {step === 1 && "左移 n 位相当于乘以 2 的 n 次方（无溢出时）；常用于快速乘 2 或构造位掩码。"}
        {step === 2 && "无 unsigned 右移左侧补 0，相当于整除 2^n；读硬件寄存器时常配合掩码。"}
        {step === 3 && "有符号右移保留符号位；移位超出位宽或负数细节依实现，生产代码优先用明确的无符号类型。"}
      </figcaption>
    </figure>
  );
}
