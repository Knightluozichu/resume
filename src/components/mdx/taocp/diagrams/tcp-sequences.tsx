/**
 * <TcpSequencesDiagram>：序列的生成与排列概念图（tcp-sequences 章）。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function TcpSequencesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="序列生成的三大类型。排列枚举 → 递归序列 → 组合生成。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            序列生成的三大类型
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            排列枚举 → 递归序列 → 组合生成
          </text>

          <g>
            <rect x="40" y="100" width="300" height="80" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.4" />
            <circle cx="56" cy="120" r="4" fill="var(--accent)" />
            <text x="68" y="125" fontSize="13" fontWeight="700" fill="var(--text-primary)">排列生成</text>
            <text x="56" y="148" fontSize="11" fill="var(--text-secondary)">n! 种排列</text>
            <text x="56" y="166" fontSize="12" fontWeight="600" fill="var(--accent)">字典序 O(n)/步</text>
          </g>
          <g>
            <rect x="380" y="100" width="300" height="80" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.4" />
            <circle cx="396" cy="120" r="4" fill="var(--success)" />
            <text x="408" y="125" fontSize="13" fontWeight="700" fill="var(--text-primary)">递归序列</text>
            <text x="396" y="148" fontSize="11" fill="var(--text-secondary)">F(n)=F(n-1)+F(n-2)</text>
            <text x="396" y="166" fontSize="12" fontWeight="600" fill="var(--success)">矩阵幂 O(log n)</text>
          </g>
          <g>
            <rect x="40" y="210" width="300" height="80" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.4" />
            <circle cx="56" cy="230" r="4" fill="var(--warning)" />
            <text x="68" y="235" fontSize="13" fontWeight="700" fill="var(--text-primary)">组合枚举</text>
            <text x="56" y="258" fontSize="11" fill="var(--text-secondary)">C(n,k) 种组合</text>
            <text x="56" y="276" fontSize="12" fontWeight="600" fill="var(--warning)">位运算法</text>
          </g>
          <g>
            <rect x="380" y="210" width="300" height="80" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.4" />
            <circle cx="396" cy="230" r="4" fill="var(--danger)" />
            <text x="408" y="235" fontSize="13" fontWeight="700" fill="var(--text-primary)">分划枚举</text>
            <text x="396" y="258" fontSize="11" fill="var(--text-secondary)">p(n) 种分划</text>
            <text x="396" y="276" fontSize="12" fontWeight="600" fill="var(--danger)">递归生成</text>
          </g>

          <rect x="40" y="340" width={VIEW_W - 80} height="40" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="365" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            排列枚举 → 递归序列 → 组合生成
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        排列枚举 → 递归序列 → 组合生成
      </figcaption>
    </figure>
  );
}
