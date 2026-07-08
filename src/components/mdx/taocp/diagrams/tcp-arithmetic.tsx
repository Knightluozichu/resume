/**
 * <TcpArithmeticDiagram>：浮点算术与进制转换概念图（tcp-arithmetic 章）。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function TcpArithmeticDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="浮点数表示与精度问题。有限位数 vs 无限实数——精度损失不可避免。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            浮点数表示与精度问题
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            有限位数 vs 无限实数——精度损失不可避免
          </text>

          <g>
            <rect x="40" y="100" width="300" height="80" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.4" />
            <circle cx="56" cy="120" r="4" fill="var(--accent)" />
            <text x="68" y="125" fontSize="13" fontWeight="700" fill="var(--text-primary)">IEEE 754</text>
            <text x="56" y="148" fontSize="11" fill="var(--text-secondary)">1+11+52=64位</text>
            <text x="56" y="166" fontSize="12" fontWeight="600" fill="var(--accent)">±10³⁰⁸, 15-16位</text>
          </g>
          <g>
            <rect x="380" y="100" width="300" height="80" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.4" />
            <circle cx="396" cy="120" r="4" fill="var(--success)" />
            <text x="408" y="125" fontSize="13" fontWeight="700" fill="var(--text-primary)">精度损失</text>
            <text x="396" y="148" fontSize="11" fill="var(--text-secondary)">0.1≠二进制有限</text>
            <text x="396" y="166" fontSize="12" fontWeight="600" fill="var(--success)">结合律失效</text>
          </g>
          <g>
            <rect x="40" y="210" width="300" height="80" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.4" />
            <circle cx="56" cy="230" r="4" fill="var(--warning)" />
            <text x="68" y="235" fontSize="13" fontWeight="700" fill="var(--text-primary)">机器 epsilon</text>
            <text x="56" y="258" fontSize="11" fill="var(--text-secondary)">ε≈2.2e-16</text>
            <text x="56" y="276" fontSize="12" fontWeight="600" fill="var(--warning)">相对精度界限</text>
          </g>
          <g>
            <rect x="380" y="210" width="300" height="80" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.4" />
            <circle cx="396" cy="230" r="4" fill="var(--danger)" />
            <text x="408" y="235" fontSize="13" fontWeight="700" fill="var(--text-primary)">进制转换</text>
            <text x="396" y="258" fontSize="11" fill="var(--text-secondary)">整数÷2取余</text>
            <text x="396" y="276" fontSize="12" fontWeight="600" fill="var(--danger)">小数×2取整</text>
          </g>

          <rect x="40" y="340" width={VIEW_W - 80} height="40" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="365" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            有限位数 vs 无限实数——精度损失不可避免
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        有限位数 vs 无限实数——精度损失不可避免
      </figcaption>
    </figure>
  );
}
