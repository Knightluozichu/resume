/**
 * <CgpAdvancedTopicsDiagram>：高级主题与动画图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function CgpAdvancedTopicsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="高级主题与动画图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            高级主题与动画
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            关键帧、骨骼动画与物理模拟
          </text>

          <rect x="40" y="80" width="640" height="280" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* Keyframe */}
          <rect x="60" y="110" width="180" height="130" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="150" y="134" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">关键帧动画</text>
          <text x="150" y="156" textAnchor="middle" fontSize="10" fill="var(--text-primary)">指定关键姿态</text>
          <text x="150" y="174" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">中间帧插值</text>
          <text x="150" y="194" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">线性/贝塞尔/Ease</text>
          <text x="150" y="214" textAnchor="middle" fontSize="10" fill="var(--text-primary)">简单直观</text>
          <text x="150" y="232" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">适合UI/简单物体</text>

          {/* Skeletal */}
          <rect x="260" y="110" width="180" height="130" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="350" y="134" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">骨骼动画</text>
          <text x="350" y="156" textAnchor="middle" fontSize="10" fill="var(--text-primary)">骨骼层级结构</text>
          <text x="350" y="174" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">蒙皮权重绑定</text>
          <text x="350" y="194" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">FK / IK</text>
          <text x="350" y="214" textAnchor="middle" fontSize="10" fill="var(--text-primary)">角色动画标准方案</text>
          <text x="350" y="232" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">蒙皮矩阵 = bone × bind</text>

          {/* Physics */}
          <rect x="460" y="110" width="200" height="130" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="560" y="134" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">物理模拟</text>
          <text x="560" y="156" textAnchor="middle" fontSize="10" fill="var(--text-primary)">刚体动力学</text>
          <text x="560" y="174" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">碰撞检测/响应</text>
          <text x="560" y="194" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">粒子系统</text>
          <text x="560" y="214" textAnchor="middle" fontSize="10" fill="var(--text-primary)">布料/流体(高级)</text>
          <text x="560" y="232" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">数值积分(Euler/Verlet)</text>

          {/* Advanced */}
          <rect x="60" y="270" width="600" height="70" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="294" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">其他高级主题</text>
          <text x={VIEW_W / 2} y="316" textAnchor="middle" fontSize="11" fill="var(--text-primary)">纹理映射 | 过程化生成 | 非真实感渲染(NPR) | GPU并行计算</text>
          <text x={VIEW_W / 2} y="332" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">动画核心：插值（关键帧）+ 变换（骨骼）+ 仿真（物理）</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        高级主题与动画——关键帧、骨骼动画与物理模拟
      </figcaption>
    </figure>
  );
}
