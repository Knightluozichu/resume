/**
 * <UapRenderingOptimizationDiagram>：Unity 渲染优化图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function UapRenderingOptimizationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Unity 渲染优化图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="360" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">DrawCall 优化三板斧</text>
          <rect x="40" y="60" width="200" height="100" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="140" y="88" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">SRP Batcher</text>
          <text x="140" y="110" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">按 shader 缓存材质参数</text>
          <text x="140" y="128" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">不减 DrawCall 数</text>
          <text x="140" y="146" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">降单次 CPU 开销</text>
          <rect x="260" y="60" width="200" height="100" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="360" y="88" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">GPU Instancing</text>
          <text x="360" y="110" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">GPU 端同材质多实例</text>
          <text x="360" y="128" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">一次 DrawCall 画大量</text>
          <text x="360" y="146" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">草/树/子弹</text>
          <rect x="480" y="60" width="200" height="100" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="580" y="88" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">静态批处理</text>
          <text x="580" y="110" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">编辑期合并静态网格</text>
          <text x="580" y="128" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">零运行时开销</text>
          <text x="580" y="146" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">建筑/地形</text>
          <rect x="40" y="185" width="640" height="44" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="211" textAnchor="middle" fontSize="12" fill="var(--text-primary)">优先级：GPU Instancing &gt; SRP Batcher &gt; 动态批处理</text>
          <text x="360" y="260" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">辅助优化</text>
          <rect x="80" y="275" width="140" height="40" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="0.8" strokeOpacity="0.5" />
          <text x="150" y="300" textAnchor="middle" fontSize="11" fill="var(--success)">LOD 远景低模</text>
          <rect x="250" y="275" width="140" height="40" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="0.8" strokeOpacity="0.5" />
          <text x="320" y="300" textAnchor="middle" fontSize="11" fill="var(--warning)">遮挡剔除</text>
          <rect x="420" y="275" width="140" height="40" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="0.8" strokeOpacity="0.5" />
          <text x="490" y="300" textAnchor="middle" fontSize="11" fill="var(--accent)">材质图集合并</text>
          <text x="360" y="355" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">DrawCall 健康线：500 以下 / 1000 警惕 / 2000 必卡</text>
          <text x="360" y="375" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">瓶颈在 CPU 提交开销，不在 GPU 画像素</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        渲染优化——减 DrawCall 是核心，批处理是手段
      </figcaption>
    </figure>
  );
}
