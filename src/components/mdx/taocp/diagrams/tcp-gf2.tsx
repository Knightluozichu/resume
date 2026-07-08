/**
 * <TcpGf2Diagram>：GF(2) 域上的运算概念图（tcp-gf2 章）。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function TcpGf2Diagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="GF(2) 域运算与 CRC 校验。二元域 → 多项式运算 → CRC 错误检测。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            GF(2) 域运算与 CRC 校验
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            二元域 → 多项式运算 → CRC 错误检测
          </text>

          <g>
            <rect x="40" y="100" width="300" height="80" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.4" />
            <circle cx="56" cy="120" r="4" fill="var(--accent)" />
            <text x="68" y="125" fontSize="13" fontWeight="700" fill="var(--text-primary)">GF(2) 域</text>
            <text x="56" y="148" fontSize="11" fill="var(--text-secondary)">{0,1} 加=XOR</text>
            <text x="56" y="166" fontSize="12" fontWeight="600" fill="var(--accent)">乘=AND</text>
          </g>
          <g>
            <rect x="380" y="100" width="300" height="80" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.4" />
            <circle cx="396" cy="120" r="4" fill="var(--success)" />
            <text x="408" y="125" fontSize="13" fontWeight="700" fill="var(--text-primary)">GF(2) 多项式</text>
            <text x="396" y="148" fontSize="11" fill="var(--text-secondary)">系数模2</text>
            <text x="396" y="166" fontSize="12" fontWeight="600" fill="var(--success)">加法=异或</text>
          </g>
          <g>
            <rect x="40" y="210" width="300" height="80" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.4" />
            <circle cx="56" cy="230" r="4" fill="var(--warning)" />
            <text x="68" y="235" fontSize="13" fontWeight="700" fill="var(--text-primary)">CRC 校验</text>
            <text x="56" y="258" fontSize="11" fill="var(--text-secondary)">多项式除法</text>
            <text x="56" y="276" fontSize="12" fontWeight="600" fill="var(--warning)">余数=校验码</text>
          </g>
          <g>
            <rect x="380" y="210" width="300" height="80" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.4" />
            <circle cx="396" cy="230" r="4" fill="var(--danger)" />
            <text x="408" y="235" fontSize="13" fontWeight="700" fill="var(--text-primary)">纠错码</text>
            <text x="396" y="258" fontSize="11" fill="var(--text-secondary)">RS/BCH码</text>
            <text x="396" y="276" fontSize="12" fontWeight="600" fill="var(--danger)">需扩域 GF(2^m)</text>
          </g>

          <rect x="40" y="340" width={VIEW_W - 80} height="40" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="365" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            二元域 → 多项式运算 → CRC 错误检测
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        二元域 → 多项式运算 → CRC 错误检测
      </figcaption>
    </figure>
  );
}
