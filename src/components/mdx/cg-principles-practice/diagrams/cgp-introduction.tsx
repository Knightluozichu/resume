/**
 * <CgpIntroductionDiagram>：图形学导论与历史图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function CgpIntroductionDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="图形学导论与历史发展图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            图形学导论与历史
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            从线框图到光线追踪——图形学60年发展脉络
          </text>

          <rect x="40" y="80" width="640" height="280" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* Timeline */}
          <line x1="80" y1="200" x2="640" y2="200" stroke="var(--accent)" strokeWidth="2" opacity="0.5" />

          <rect x="80" y="110" width="120" height="60" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="140" y="134" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">1960s</text>
          <text x="140" y="154" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">线框图/矢量</text>

          <rect x="220" y="110" width="120" height="60" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="280" y="134" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">1970s</text>
          <text x="280" y="154" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">光栅扫描/Z-buffer</text>

          <rect x="360" y="110" width="120" height="60" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="420" y="134" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">1980-90s</text>
          <text x="420" y="154" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">光照模型/PBR</text>

          <rect x="500" y="110" width="120" height="60" rx="8" fill="var(--text-tertiary)" fillOpacity="0.12" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="560" y="134" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">2000s+</text>
          <text x="560" y="154" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">GPU/RTX/AI</text>

          {/* Key concepts */}
          <rect x="60" y="230" width="290" height="110" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" />
          <text x="205" y="252" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">图形学的核心任务</text>
          <text x="205" y="274" textAnchor="middle" fontSize="10" fill="var(--text-primary)">1. 建模：用数学描述3D世界</text>
          <text x="205" y="292" textAnchor="middle" fontSize="10" fill="var(--text-primary)">2. 变换：改变视角和位置</text>
          <text x="205" y="310" textAnchor="middle" fontSize="10" fill="var(--text-primary)">3. 渲染：把3D变成2D图像</text>
          <text x="205" y="328" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">4. 交互：响应用户输入</text>

          <rect x="370" y="230" width="280" height="110" rx="8" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1" />
          <text x="510" y="252" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">与其他领域的关系</text>
          <text x="510" y="274" textAnchor="middle" fontSize="10" fill="var(--text-primary)">数学：线性代数/微积分</text>
          <text x="510" y="292" textAnchor="middle" fontSize="10" fill="var(--text-primary)">物理：光学/运动学</text>
          <text x="510" y="310" textAnchor="middle" fontSize="10" fill="var(--text-primary)">计算机：算法/体系结构</text>
          <text x="510" y="328" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">艺术：感知/美学</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        图形学导论与历史——从1960年代线框图到现代GPU/AI渲染的发展脉络
      </figcaption>
    </figure>
  );
}
