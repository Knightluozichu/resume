/**
 * <ShpOptimizationDiagram>
 *
 * Shader 性能优化策略
 */

export function ShpOptimizationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="Shader 性能优化策略" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">Shader 性能优化</text>

          <rect x="30" y="55" width="155" height="90" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="107" y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">减少计算</text>
          <text x="107" y="95" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">低精度 half</text>
          <text x="107" y="110" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">避免分支发散</text>
          <text x="107" y="125" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">用内置函数</text>
          <text x="107" y="140" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">替代自定义实现</text>

          <rect x="200" y="55" width="155" height="90" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="277" y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">减少采样</text>
          <text x="277" y="95" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">Mipmap 自动选择</text>
          <text x="277" y="110" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">合并纹理（图集）</text>
          <text x="277" y="125" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">避免依赖读取</text>
          <text x="277" y="140" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">减少带宽消耗</text>

          <rect x="370" y="55" width="155" height="90" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="447" y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--warning)">减少寄存器</text>
          <text x="447" y="95" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">简化表达式</text>
          <text x="447" y="110" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">控制循环展开</text>
          <text x="447" y="125" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">避免 spilling</text>
          <text x="447" y="140" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">提高占用率</text>

          <rect x="540" y="55" width="150" height="90" rx="8" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="615" y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--danger)">定位瓶颈</text>
          <text x="615" y="95" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">降分辨率</text>
          <text x="615" y="110" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">简化着色器</text>
          <text x="615" y="125" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">减 Draw Call</text>
          <text x="615" y="140" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">逐步排除法</text>

          <rect x="30" y="170" width="660" height="50" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="360" y="190" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">分支发散: 同一 warp 线程走不同分支 → 串行执行 → 空等</text>
          <text x="360" y="208" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">用 step/lerp/saturate 等数学函数替代 if/else</text>

          <rect x="30" y="240" width="660" height="50" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="360" y="260" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">寄存器溢出: 临时变量超出寄存器 → 存到慢速显存 → 大幅降速</text>
          <text x="360" y="278" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">检查编译器报告的寄存器数，控制在占用率最优范围</text>

          <text x="360" y="340" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">优先优化像素着色器: 执行频率 N*M >> 顶点着色器 N</text>
          <text x="360" y="360" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">每次优化后用 Profiler 验证效果，避免盲目优化</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Shader 性能优化策略</figcaption>
    </figure>
  );
}
