/**
 * <CmFinalReviewDiagram>：具体数学综合复习地图
 *
 * 纯静态 SVG 展示，无交互。Server Component（无 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function CmFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
    <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
    <svg viewBox="0 0 720 400" role="img" aria-label="具体数学综合复习地图" className="mx-auto block h-auto w-full max-w-[720px]">
    <text x="360.0" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">具体数学综合复习地图</text>
    <text x="360.0" y="50" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">全书知识链：递归 → 求和 → 数论 → 生成函数 → 概率</text>
    <rect x="36.0" y="70" width="208.0" height="32" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
    <text x="140.0" y="91" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">基础层（3）</text>
    <rect x="36.0" y="118" width="208.0" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
    <circle cx="47.0" cy="133.0" r="3" fill="var(--accent)" />
    <text x="140.0" y="137.0" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">递归关系与成套方法</text>
    <line x1="140.0" y1="148" x2="140.0" y2="155" stroke="var(--accent)" strokeWidth="1.3" strokeOpacity="0.6" />
    <rect x="36.0" y="157" width="208.0" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
    <circle cx="47.0" cy="172.0" r="3" fill="var(--accent)" />
    <text x="140.0" y="176.0" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">求和法则与扰动法</text>
    <line x1="140.0" y1="187" x2="140.0" y2="194" stroke="var(--accent)" strokeWidth="1.3" strokeOpacity="0.6" />
    <rect x="36.0" y="196" width="208.0" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
    <circle cx="47.0" cy="211.0" r="3" fill="var(--accent)" />
    <text x="140.0" y="215.0" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">取整取模与谱</text>
    <rect x="256.0" y="70" width="208.0" height="32" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
    <text x="360.0" y="91" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">数论层（3）</text>
    <rect x="256.0" y="118" width="208.0" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
    <circle cx="267.0" cy="133.0" r="3" fill="var(--success)" />
    <text x="360.0" y="137.0" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">GCD 与 Euler φ</text>
    <line x1="360.0" y1="148" x2="360.0" y2="155" stroke="var(--success)" strokeWidth="1.3" strokeOpacity="0.6" />
    <rect x="256.0" y="157" width="208.0" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
    <circle cx="267.0" cy="172.0" r="3" fill="var(--success)" />
    <text x="360.0" y="176.0" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">二项式恒等式</text>
    <line x1="360.0" y1="187" x2="360.0" y2="194" stroke="var(--success)" strokeWidth="1.3" strokeOpacity="0.6" />
    <rect x="256.0" y="196" width="208.0" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
    <circle cx="267.0" cy="211.0" r="3" fill="var(--success)" />
    <text x="360.0" y="215.0" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">Stirling 两类数</text>
    <rect x="476.0" y="70" width="208.0" height="32" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
    <text x="580.0" y="91" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">应用层（3）</text>
    <rect x="476.0" y="118" width="208.0" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
    <circle cx="487.0" cy="133.0" r="3" fill="var(--warning)" />
    <text x="580.0" y="137.0" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">OGF/EGF 解递归</text>
    <line x1="580.0" y1="148" x2="580.0" y2="155" stroke="var(--warning)" strokeWidth="1.3" strokeOpacity="0.6" />
    <rect x="476.0" y="157" width="208.0" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
    <circle cx="487.0" cy="172.0" r="3" fill="var(--warning)" />
    <text x="580.0" y="176.0" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">PGF 与矩</text>
    <line x1="580.0" y1="187" x2="580.0" y2="194" stroke="var(--warning)" strokeWidth="1.3" strokeOpacity="0.6" />
    <rect x="476.0" y="196" width="208.0" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
    <circle cx="487.0" cy="211.0" r="3" fill="var(--warning)" />
    <text x="580.0" y="215.0" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">散列与碰撞</text>
    <rect x="48" y="354" width="624" height="32" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
    <text x="360.0" y="371" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">贯穿全书的工具：生成函数把序列变代数，递归变方程</text>
    <text x="360.0" y="381" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">Concrete Mathematics = Concrete methods for Concrete problems</text>
    </svg>
    </div>
    <figcaption className="mt-2 text-center text-sm text-secondary">全书知识链：递归 → 求和 → 数论 → 生成函数 → 概率</figcaption>
    </figure>
  );
}
