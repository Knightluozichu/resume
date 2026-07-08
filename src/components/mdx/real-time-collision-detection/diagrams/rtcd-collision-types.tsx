/**
 * <RtcdCollisionTypesDiagram>：离散碰撞检测 vs 连续碰撞检测对比图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 420;

export function RtcdCollisionTypesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="离散碰撞检测与连续碰撞检测对比图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            碰撞检测类型：离散 DCCD vs 连续 CCD
          </text>

          {/* 左侧：离散碰撞检测 */}
          <rect x="20" y="50" width="340" height="350" rx="12" fill="var(--warning)" fillOpacity="0.05" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="190" y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">离散碰撞检测 DCCD</text>
          <text x="190" y="90" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">只在固定时刻 t 检测，帧间无感知</text>

          {/* 墙 */}
          <rect x="280" y="110" width="14" height="120" fill="var(--text-tertiary)" fillOpacity="0.3" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="287" y="244" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">墙</text>

          {/* t 时刻：子弹在左侧 */}
          <circle cx="80" cy="170" r="10" fill="var(--warning)" fillOpacity="0.5" stroke="var(--warning)" strokeWidth="1.5" />
          <text x="80" y="150" textAnchor="middle" fontSize="10" fill="var(--warning)">t</text>

          {/* 虚线轨迹 */}
          <line x1="90" y1="170" x2="270" y2="170" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.4" />

          {/* t+dt 时刻：子弹穿墙到右侧 */}
          <circle cx="340" cy="170" r="10" fill="var(--warning)" fillOpacity="0.5" stroke="var(--warning)" strokeWidth="1.5" />
          <text x="330" y="150" textAnchor="middle" fontSize="10" fill="var(--warning)">t+dt</text>

          {/* 穿透标记 */}
          <text x="190" y="200" textAnchor="middle" fontSize="20" fill="var(--warning)">&times;</text>
          <text x="190" y="296" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">隧穿 Tunneling</text>
          <text x="190" y="314" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">子弹速度快，跨越整面墙</text>
          <text x="190" y="330" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">两个采样时刻都未命中</text>
          <text x="190" y="356" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">优点：简单快速</text>
          <text x="190" y="372" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">缺点：高速物体穿透</text>

          {/* 右侧：连续碰撞检测 */}
          <rect x="380" y="50" width="340" height="350" rx="12" fill="var(--success)" fillOpacity="0.05" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="550" y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">连续碰撞检测 CCD</text>
          <text x="550" y="90" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">检测整段运动轨迹，求精确冲击时刻</text>

          {/* 墙 */}
          <rect x="530" y="110" width="14" height="120" fill="var(--text-tertiary)" fillOpacity="0.3" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="537" y="244" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">墙</text>

          {/* 扫掠体（从起点到冲击点） */}
          <rect x="440" y="164" width="92" height="12" rx="6" fill="var(--success)" fillOpacity="0.2" stroke="var(--success)" strokeWidth="1.5" />

          {/* 起点 */}
          <circle cx="445" cy="170" r="10" fill="var(--success)" fillOpacity="0.5" stroke="var(--success)" strokeWidth="1.5" />
          <text x="445" y="150" textAnchor="middle" fontSize="10" fill="var(--success)">t0</text>

          {/* 冲击点 */}
          <circle cx="530" cy="170" r="10" fill="var(--success)" stroke="var(--success)" strokeWidth="1.5" />
          <text x="530" y="150" textAnchor="middle" fontSize="10" fill="var(--success)">t_hit</text>

          {/* 冲击标记 */}
          <text x="560" y="176" fontSize="14" fill="var(--success)">&larr;</text>
          <text x="550" y="296" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">精确冲击时间 t_hit</text>
          <text x="550" y="314" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">扫掠体与墙相交即停止</text>
          <text x="550" y="330" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">求解运动方程求时间根</text>
          <text x="550" y="356" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">优点：无穿透，物理正确</text>
          <text x="550" y="372" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">缺点：计算开销大</text>

          <text x={VIEW_W / 2} y="408" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            选择原则：低速用 DCCD 省算力，高速物体必须用 CCD 防穿透
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        离散碰撞检测在采样点检测易隧穿；连续碰撞检测沿运动轨迹求精确冲击时刻
      </figcaption>
    </figure>
  );
}
