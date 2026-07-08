/**
 * <HdCrcErrorDiagram>：CRC校验与纠错码图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function HdCrcErrorDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="CRC校验与纠错码图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">CRC校验与纠错码</text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">CRC多项式运算与汉明码纠错</text>
          <rect x="60" y="80" width="600" height="280" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="130" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--accent)">模2多项式除法与纠错</text>
          <text x={VIEW_W / 2} y="170" textAnchor="middle" fontSize="12" fill="var(--text-primary)">CRC XOR除法检错 + 汉明码单比特纠错</text>
          <text x={VIEW_W / 2} y="195" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">通过图解可视化关键原理与执行流程</text>
          <rect x="160" y="230" width="180" height="40" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="250" y="255" textAnchor="middle" fontSize="12" fill="var(--success)">输入/状态</text>
          <text x="380" y="255" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <rect x="400" y="230" width="180" height="40" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="490" y="255" textAnchor="middle" fontSize="12" fill="var(--warning)">处理/输出</text>
          <text x={VIEW_W / 2} y="320" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">关键洞察：GF(2)上的多项式运算用XOR替代加减</text>
          <text x={VIEW_W / 2} y="340" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">复杂度：O(n) CRC / O(log n) Hamming</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">CRC多项式运算与汉明码纠错</figcaption>
    </figure>
  );
}
