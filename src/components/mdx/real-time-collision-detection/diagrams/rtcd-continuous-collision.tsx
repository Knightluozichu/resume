/**
 * <RtcdContinuousCollisionDiagram>：连续碰撞检测（CCD）扫掠体与时间冲击点图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 430;

export function RtcdContinuousCollisionDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="连续碰撞检测扫掠体与时间冲击点图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            连续碰撞检测：扫掠体与时间冲击点
          </text>

          {/* 上方：扫掠体示意 */}
          <rect x="20" y="50" width="700" height="210" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="40" y="72" fontSize="12" fontWeight="600" fill="var(--success)">扫掠体 Sweep Volume</text>

          {/* 时间轴 */}
          <line x1="60" y1="200" x2="680" y2="200" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="4 3" />
          <circle cx="80" cy="200" r="4" fill="var(--text-tertiary)" />
          <text x="80" y="222" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">t=0</text>
          <circle cx="660" cy="200" r="4" fill="var(--text-tertiary)" />
          <text x="660" y="222" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">t=1</text>

          {/* 静态障碍物（墙） */}
          <rect x="380" y="110" width="20" height="100" fill="var(--warning)" fillOpacity="0.3" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="390" y="102" textAnchor="middle" fontSize="10" fill="var(--warning)">障碍物</text>

          {/* 球的扫掠体（从 t=0 到 t_hit） */}
          <rect x="80" y="188" width="300" height="24" rx="12" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1.2" />
          <text x="230" y="184" textAnchor="middle" fontSize="10" fill="var(--success)">扫掠体 = 球沿轨迹的体积并集</text>

          {/* t=0 位置 */}
          <circle cx="80" cy="200" r="12" fill="var(--success)" fillOpacity="0.5" stroke="var(--success)" strokeWidth="1.5" />
          <text x="80" y="146" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">P(t=0)</text>

          {/* t_hit 位置（碰撞点） */}
          <circle cx="380" cy="200" r="12" fill="var(--accent)" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="380" y="146" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">P(t_hit)</text>

          {/* 冲击箭头 */}
          <line x1="380" y1="160" x2="380" y2="182" stroke="var(--accent)" strokeWidth="1.2" />
          <polygon points="380,182 376,174 384,174" fill="var(--accent)" />

          {/* 未到达的轨迹（虚线） */}
          <line x1="392" y1="200" x2="660" y2="200" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.4" />
          <circle cx="660" cy="200" r="12" fill="none" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.4" />
          <text x="660" y="146" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">P(t=1) 未到达</text>

          {/* 下方：保守推进法 */}
          <rect x="20" y="276" width="340" height="140" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="40" y="298" fontSize="12" fontWeight="600" fill="var(--accent)">保守推进 Conservative Advancement</text>

          <circle cx="80" cy="360" r="10" fill="var(--accent)" fillOpacity="0.3" stroke="var(--accent)" strokeWidth="1.2" />
          <circle cx="140" cy="360" r="10" fill="var(--accent)" fillOpacity="0.4" stroke="var(--accent)" strokeWidth="1.2" />
          <circle cx="195" cy="360" r="10" fill="var(--accent)" fillOpacity="0.6" stroke="var(--accent)" strokeWidth="1.2" />
          <rect x="250" y="330" width="16" height="60" fill="var(--warning)" fillOpacity="0.3" stroke="var(--warning)" strokeWidth="1" />

          <text x="40" y="332" fontSize="10" fill="var(--text-secondary)">逐步逼近：每步按最短距离推进</text>
          <text x="40" y="386" fontSize="10" fill="var(--text-secondary)">d &gt; 0 则未碰，前进 d / v</text>
          <text x="40" y="402" fontSize="10" fill="var(--text-tertiary)">收敛慢但安全，适合初次接触</text>

          {/* 下方：解析法 */}
          <rect x="380" y="276" width="340" height="140" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="400" y="298" fontSize="12" fontWeight="600" fill="var(--warning)">解析法 Analytical Root Finding</text>

          <text x="400" y="330" fontSize="10" fill="var(--text-secondary)">建立运动方程，直接求解 t_hit</text>
          <rect x="400" y="340" width="300" height="44" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="550" y="358" textAnchor="middle" fontSize="11" fill="var(--warning)">|P(t) &minus; Q|&sup2; = (r + R)&sup2;</text>
          <text x="550" y="376" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">P(t) = P0 + v&middot;t，解二次方程</text>
          <text x="400" y="402" fontSize="10" fill="var(--text-tertiary)">精确高效，但需针对形状推导</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        连续碰撞检测——沿运动轨迹构建扫掠体求精确冲击时间，保守推进或解析法求解
      </figcaption>
    </figure>
  );
}
