/**
 * <GpgParticleSystemsDiagram>：GPU Gems 粒子系统与物理图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GpgParticleSystemsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="粒子系统与物理：CPU vs GPU 粒子更新对比"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            粒子系统：CPU vs GPU 更新
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            GPU 粒子把更新和渲染都留在显存，突破 CPU 瓶颈
          </text>

          {/* CPU 粒子 */}
          <rect x="40" y="80" width="310" height="160" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="195" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">CPU 粒子（传统）</text>

          <rect x="60" y="120" width="270" height="32" rx="6" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="195" y="140" textAnchor="middle" fontSize="10" fill="var(--text-primary)">CPU 逐粒子计算位置/速度</text>

          <text x="195" y="168" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">&darr; 数据回传显存（慢）</text>

          <rect x="60" y="178" width="270" height="32" rx="6" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="195" y="198" textAnchor="middle" fontSize="10" fill="var(--text-primary)">GPU 渲染粒子</text>

          <text x="195" y="226" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">瓶颈：CPU↔GPU 带宽，约 1 万粒子</text>

          {/* GPU 粒子 */}
          <rect x="370" y="80" width="310" height="160" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="525" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">GPU 粒子（现代）</text>

          <rect x="390" y="120" width="270" height="32" rx="6" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="0.8" />
          <text x="525" y="140" textAnchor="middle" fontSize="10" fill="var(--text-primary)">GPU 着色器更新位置/速度</text>

          <text x="525" y="168" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">&darr; 数据始终在显存（快）</text>

          <rect x="390" y="178" width="270" height="32" rx="6" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="0.8" />
          <text x="525" y="198" textAnchor="middle" fontSize="10" fill="var(--text-primary)">GPU 直接渲染</text>

          <text x="525" y="226" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">无回传，可达 100 万粒子</text>

          {/* 底部物理积分 */}
          <rect x="40" y="270" width="640" height="100" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="294" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">粒子物理积分（欧拉法）</text>

          <text x={VIEW_W / 2} y="320" textAnchor="middle" fontSize="12" fill="var(--text-primary)" fontFamily="monospace">
            v_new = v + a * dt
          </text>
          <text x={VIEW_W / 2} y="342" textAnchor="middle" fontSize="12" fill="var(--text-primary)" fontFamily="monospace">
            p_new = p + v_new * dt
          </text>
          <text x={VIEW_W / 2} y="362" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">每帧对每个粒子并行执行，a = 重力 + 风力 + 吸引力</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        CPU 与 GPU 粒子系统的更新流程对比
      </figcaption>
    </figure>
  );
}
