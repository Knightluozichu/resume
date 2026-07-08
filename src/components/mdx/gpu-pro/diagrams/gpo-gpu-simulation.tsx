/**
 * <GpoGpuSimulationDiagram>：GPU 物理模拟图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GpoGpuSimulationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="GPU 物理模拟图解" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">GPU 物理模拟</text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">粒子系统 / 流体 / 布料 / 头发</text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="60" y="100" width="145" height="110" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="132" y="124" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">GPU 粒子</text>
          <text x="132" y="144" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Compute Shader</text>
          <text x="132" y="160" textAnchor="middle" fontSize="10" fill="var(--text-primary)">结构化缓冲</text>
          <text x="132" y="180" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">数据：</text>
          <text x="132" y="196" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Position/Velocity</text>

          <rect x="220" y="100" width="145" height="110" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="292" y="124" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">流体模拟</text>
          <text x="292" y="144" textAnchor="middle" fontSize="10" fill="var(--text-primary)">SPH / Eulerian</text>
          <text x="292" y="160" textAnchor="middle" fontSize="10" fill="var(--text-primary)">网格化 3D 纹理</text>
          <text x="292" y="180" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">数据：</text>
          <text x="292" y="196" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Density/Velocity</text>

          <rect x="380" y="100" width="145" height="110" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="452" y="124" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--warning)">布料模拟</text>
          <text x="452" y="144" textAnchor="middle" fontSize="10" fill="var(--text-primary)">弹簧质点</text>
          <text x="452" y="160" textAnchor="middle" fontSize="10" fill="var(--text-primary)">PBD 约束求解</text>
          <text x="452" y="180" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">数据：</text>
          <text x="452" y="196" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Mass/Spring</text>

          <rect x="540" y="100" width="100" height="110" rx="8" fill="var(--text-tertiary)" fillOpacity="0.15" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="590" y="124" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">头发</text>
          <text x="590" y="144" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Follow Hair</text>
          <text x="590" y="160" textAnchor="middle" fontSize="10" fill="var(--text-primary)">引导链</text>
          <text x="590" y="180" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">数据：</text>
          <text x="590" y="196" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Strand</text>

          <rect x="60" y="240" width="600" height="100" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="264" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">GPU 模拟流程</text>
          <text x={VIEW_W / 2} y="284" textAnchor="middle" fontSize="11" fill="var(--text-primary)">1. Compute Shader 更新粒子/网格状态（Position/Velocity）</text>
          <text x={VIEW_W / 2} y="302" textAnchor="middle" fontSize="11" fill="var(--text-primary)">2. Append/Consume Buffer 管理生命周期（发射/死亡）</text>
          <text x={VIEW_W / 2} y="320" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">3. Vertex Shader 读取缓冲 → 渲染（DrawProcedural / DrawIndexedInstanced）</text>
          <text x={VIEW_W / 2} y="336" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">关键：数据始终在 GPU，无需 CPU 回读</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">GPU 物理模拟——粒子、流体、布料全在 GPU 端计算</figcaption>
    </figure>
  );
}
