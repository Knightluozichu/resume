/**
 * <TileBasedGpuDiagram>：Tile-based GPU 架构示意.
 * 展示屏幕被切分成 Tile(小块)，每块在 GPU 内部快 SRAM 渲染后写回显存。
 */

export function TileBasedGpuDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 560 320"
          role="img"
          aria-label="Tile-based GPU 架构：屏幕切为小块（Tile），每块在 GPU 内部 SRAM 中渲染完成后一次性写回显存——减少外部带宽消耗"
          className="mx-auto block h-auto w-full max-w-[560px]"
        >
          {/* Screen → Tiles */}
          <rect x="20" y="20" width="140" height="100" rx="4" fill="var(--bg)" stroke="var(--border)" strokeWidth="2" />
          <text x="90" y="44" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-primary)">屏幕</text>
          <text x="90" y="60" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">1920×1080</text>

          {/* Grid lines */}
          {[0, 1, 2, 3].map((r) =>
            [0, 1, 2, 3].map((c) => (
              <rect key={`grid-${r}-${c}`} x={40 + c * 30} y={68 + r * 20} width="28" height="18" rx="2" fill="var(--bg)" stroke="var(--border)" strokeWidth="0.5" />
            ))
          )}

          {/* Arrow */}
          <text x="170" y="74" fontSize="18" fill="var(--accent)">→</text>

          {/* One Tile extracted */}
          <rect x="190" y="30" width="80" height="80" rx="4" fill="var(--bg-elevated)" stroke="var(--accent)" strokeWidth="2" />
          <text x="230" y="50" textAnchor="middle" fontSize="9" fill="var(--accent)">一个 Tile</text>
          <text x="230" y="66" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">16×16 像素</text>
          <text x="230" y="82" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">→ 加载到 SRAM</text>

          {/* Arrow down */}
          <text x="230" y="120" textAnchor="middle" fontSize="14" fill="var(--accent)">↓</text>

          {/* GPU Tile Memory (SRAM) */}
          <rect x="170" y="130" width="120" height="70" rx="6" fill="var(--bg-elevated)" stroke="var(--accent)" strokeWidth="2" />
          <text x="230" y="152" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">Tile Memory (SRAM)</text>
          <text x="230" y="168" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">超快片上缓存</text>
          <text x="230" y="184" textAnchor="middle" fontSize="9" fill="var(--text-primary)">Vertex → Fragment → Blend</text>

          {/* Arrow to DRAM */}
          <text x="370" y="168" fontSize="14" fill="var(--accent)">→</text>

          {/* DRAM */}
          <rect x="390" y="130" width="150" height="70" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.5" />
          <text x="465" y="152" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">主显存 (DRAM)</text>
          <text x="465" y="168" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">完成后的 Tile</text>
          <text x="465" y="184" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">一次性写回</text>

          {/* Bottom cost annotation */}
          <rect x="20" y="220" width="520" height="90" rx="6" fill="var(--bg)" stroke="var(--warning)" strokeWidth="1" />
          <text x="36" y="244" fontSize="11" fontWeight="600" fill="#e57373">每 Tile 的 Load/Store 开销</text>
          <text x="36" y="264" fontSize="10" fill="var(--text-secondary)">Load：把像素数据从 DRAM 加载到 Tile Memory（按需操作）</text>
          <text x="36" y="280" fontSize="10" fill="var(--text-secondary)">Store：渲染完成后从 Tile Memory 写回 DRAM（逐 Tile 执行）</text>
          <text x="36" y="296" fontSize="10" fill="var(--text-secondary)">
            频繁切换 Render Target = 额外 Load/Store × N — 移动端渲染优化核心：减少 RT 切换次数
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        Tile-based GPU 把屏幕切成小块，每块在超快片上 SRAM 中完成所有渲染后一次性写回主显存。
        Load/Store（载入/写出）是隐藏带宽杀手——减少 Render Target 切换次数就是核心优化策略。
      </figcaption>
    </figure>
  );
}
