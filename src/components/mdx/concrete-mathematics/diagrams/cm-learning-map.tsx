/**
 * <CmLearningMapDiagram>：具体数学全书学习地图
 *
 * 纯静态 SVG 展示，无交互。Server Component（无 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function CmLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
    <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
    <svg viewBox="0 0 720 400" role="img" aria-label="具体数学全书学习地图" className="mx-auto block h-auto w-full max-w-[720px]">
    <text x="360.0" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">具体数学全书学习地图</text>
    <text x="360.0" y="50" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">从递归出发，经求和与数论，到生成函数与离散概率</text>
    <rect x="36.0" y="70" width="153.0" height="32" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
    <text x="112.5" y="91" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">递归问题（2）</text>
    <rect x="36.0" y="118" width="153.0" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
    <circle cx="47.0" cy="133.0" r="3" fill="var(--accent)" />
    <text x="112.5" y="137.0" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">学习地图</text>
    <line x1="112.5" y1="148" x2="112.5" y2="155" stroke="var(--accent)" strokeWidth="1.3" strokeOpacity="0.6" />
    <rect x="36.0" y="157" width="153.0" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
    <circle cx="47.0" cy="172.0" r="3" fill="var(--accent)" />
    <text x="112.5" y="176.0" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">递归问题</text>
    <rect x="201.0" y="70" width="153.0" height="32" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
    <text x="277.5" y="91" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">求和（2）</text>
    <rect x="201.0" y="118" width="153.0" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
    <circle cx="212.0" cy="133.0" r="3" fill="var(--success)" />
    <text x="277.5" y="137.0" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">求和</text>
    <line x1="277.5" y1="148" x2="277.5" y2="155" stroke="var(--success)" strokeWidth="1.3" strokeOpacity="0.6" />
    <rect x="201.0" y="157" width="153.0" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
    <circle cx="212.0" cy="172.0" r="3" fill="var(--success)" />
    <text x="277.5" y="176.0" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">整函数</text>
    <rect x="366.0" y="70" width="153.0" height="32" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
    <text x="442.5" y="91" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">数论（3）</text>
    <rect x="366.0" y="118" width="153.0" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
    <circle cx="377.0" cy="133.0" r="3" fill="var(--warning)" />
    <text x="442.5" y="137.0" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">数论</text>
    <line x1="442.5" y1="148" x2="442.5" y2="155" stroke="var(--warning)" strokeWidth="1.3" strokeOpacity="0.6" />
    <rect x="366.0" y="157" width="153.0" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
    <circle cx="377.0" cy="172.0" r="3" fill="var(--warning)" />
    <text x="442.5" y="176.0" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">二项式系数</text>
    <line x1="442.5" y1="187" x2="442.5" y2="194" stroke="var(--warning)" strokeWidth="1.3" strokeOpacity="0.6" />
    <rect x="366.0" y="196" width="153.0" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
    <circle cx="377.0" cy="211.0" r="3" fill="var(--warning)" />
    <text x="442.5" y="215.0" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">Stirling 数</text>
    <rect x="531.0" y="70" width="153.0" height="32" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
    <text x="607.5" y="91" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--danger)">高级主题（3）</text>
    <rect x="531.0" y="118" width="153.0" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
    <circle cx="542.0" cy="133.0" r="3" fill="var(--danger)" />
    <text x="607.5" y="137.0" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">生成函数</text>
    <line x1="607.5" y1="148" x2="607.5" y2="155" stroke="var(--danger)" strokeWidth="1.3" strokeOpacity="0.6" />
    <rect x="531.0" y="157" width="153.0" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
    <circle cx="542.0" cy="172.0" r="3" fill="var(--danger)" />
    <text x="607.5" y="176.0" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">离散概率</text>
    <line x1="607.5" y1="187" x2="607.5" y2="194" stroke="var(--danger)" strokeWidth="1.3" strokeOpacity="0.6" />
    <rect x="531.0" y="196" width="153.0" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
    <circle cx="542.0" cy="211.0" r="3" fill="var(--danger)" />
    <text x="607.5" y="215.0" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">综合复习</text>
    <rect x="48" y="354" width="624" height="32" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
    <text x="360.0" y="371" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">核心思想：用递归定义问题，用求和量化结果，用数论与生成函数求解</text>
    <text x="360.0" y="381" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">Concrete = Continuous + Discrete</text>
    </svg>
    </div>
    <figcaption className="mt-2 text-center text-sm text-secondary">从递归出发，经求和与数论，到生成函数与离散概率</figcaption>
    </figure>
  );
}
