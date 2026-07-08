/**
 * <Cg4LearningMapDiagram>：计算机图形学第4版全书学习地图
 *
 * 纯静态 SVG 展示，无交互。Server Component（无 "use client"）。
 */

export function Cg4LearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="计算机图形学第4版全书学习地图" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">计算机图形学第4版 · 学习地图</text>
          <text x="360" y="50" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">从管线到光栅化，从变换到高级渲染</text>

          {/* 基础板块 */}
          <rect x="36" y="72" width="153" height="32" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="112.5" y="93" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">基础（2）</text>
          <rect x="36" y="118" width="153" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="112.5" y="137" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">学习地图</text>
          <line x1="112.5" y1="148" x2="112.5" y2="155" stroke="var(--accent)" strokeWidth="1.3" strokeOpacity="0.6" />
          <rect x="36" y="157" width="153" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="112.5" y="176" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">图形渲染管线</text>

          {/* 核心板块 */}
          <rect x="201" y="72" width="153" height="32" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="277.5" y="93" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">核心（3）</text>
          <rect x="201" y="118" width="153" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="277.5" y="137" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">光栅化</text>
          <line x1="277.5" y1="148" x2="277.5" y2="155" stroke="var(--success)" strokeWidth="1.3" strokeOpacity="0.6" />
          <rect x="201" y="157" width="153" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="277.5" y="176" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">几何变换</text>
          <line x1="277.5" y1="187" x2="277.5" y2="194" stroke="var(--success)" strokeWidth="1.3" strokeOpacity="0.6" />
          <rect x="201" y="196" width="153" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="277.5" y="215" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">可见性</text>

          {/* 高级板块 */}
          <rect x="366" y="72" width="153" height="32" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="442.5" y="93" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">高级（4）</text>
          <rect x="366" y="118" width="153" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="442.5" y="137" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">光照模型</text>
          <line x1="442.5" y1="148" x2="442.5" y2="155" stroke="var(--warning)" strokeWidth="1.3" strokeOpacity="0.6" />
          <rect x="366" y="157" width="153" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="442.5" y="176" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">纹理映射</text>
          <line x1="442.5" y1="187" x2="442.5" y2="194" stroke="var(--warning)" strokeWidth="1.3" strokeOpacity="0.6" />
          <rect x="366" y="196" width="153" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="442.5" y="215" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">曲线与曲面</text>
          <line x1="442.5" y1="226" x2="442.5" y2="233" stroke="var(--warning)" strokeWidth="1.3" strokeOpacity="0.6" />
          <rect x="366" y="235" width="153" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="442.5" y="254" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">高级渲染</text>

          {/* 复习板块 */}
          <rect x="531" y="72" width="153" height="32" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="607.5" y="93" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--danger)">复习（1）</text>
          <rect x="531" y="118" width="153" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="607.5" y="137" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">总复习</text>

          {/* 底部总结 */}
          <rect x="48" y="324" width="624" height="50" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="360" y="346" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">核心主线：顶点数据 → 管线变换 → 光栅化 → 片段着色 → 帧缓冲</text>
          <text x="360" y="362" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">从 3D 几何到 2D 像素的完整渲染流水线</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">计算机图形学第4版：基础→核心→高级→复习的十章脉络</figcaption>
    </figure>
  );
}
