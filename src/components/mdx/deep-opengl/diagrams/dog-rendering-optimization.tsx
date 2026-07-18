/**
 * <DogRenderingOptimizationDiagram>：渲染优化策略
 * 纯静态 SVG，无交互。Server Component。
 */
export function DogRenderingOptimizationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="渲染优化：批处理/实例化/状态排序" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">渲染优化：合并 draw call + 排状态 + 降带宽</text>

          {/* 优化前：多次 draw call */}
          <text x="160" y="60" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-secondary)">优化前：N 次 draw call</text>
          {Array.from({ length: 8 }).map((_, i) => (
            <rect key={i} x={40 + i * 30} y="72" width="24" height="20" rx="3" fill="var(--text-secondary)" fillOpacity="0.25" stroke="var(--text-secondary)" strokeWidth="0.8" />
          ))}
          <text x="160" y="110" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">每命令固定开销 × N</text>

          {/* 箭头 */}
          <line x1="280" y1="92" x2="340" y2="92" stroke="var(--accent)" strokeWidth="1.6" markerEnd="url(#roArrow)" />
          <text x="310" y="84" textAnchor="middle" fontSize="9.5" fill="var(--accent)">合并</text>

          {/* 优化后：批处理/实例化 */}
          <text x="500" y="60" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">优化后：1 次绘制</text>
          <rect x="380" y="72" width="240" height="20" rx="3" fill="var(--accent)" fillOpacity="0.25" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="500" y="110" textAnchor="middle" fontSize="9.5" fill="var(--accent)">批处理合并 / 实例化复制</text>

          {/* 状态排序示意 */}
          <rect x="40" y="140" width="640" height="100" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="360" y="162" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">状态排序：按 shader → 纹理 分组绘制</text>
          <text x="60" y="184" fontSize="9.5" fill="var(--text-secondary)">乱序：S1/T1 → S2/T2 → S1/T1 → S2/T1 → S1/T2（频繁切换）</text>
          <text x="60" y="206" fontSize="9.5" fill="var(--accent)">排序后：S1/T1 → S1/T1 → S1/T2 → S2/T1 → S2/T2（最少切换）</text>
          <text x="60" y="226" fontSize="9.5" fill="var(--text-secondary)">同 shader 同纹理排在一起，useProgram/bindTexture 次数大减</text>

          {/* 三招总结 */}
          <rect x="40" y="260" width="640" height="116" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="282" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">三大优化方向</text>
          <text x="60" y="304" fontSize="10" fill="var(--accent)">1. 减 draw call：批处理（同材质合并 VBO）· 实例化（同几何副本）</text>
          <text x="60" y="324" fontSize="10" fill="var(--accent)">2. 排状态：按 shader→纹理→其他分组，减少 useProgram/bindTexture 切换</text>
          <text x="60" y="344" fontSize="10" fill="var(--accent)">3. 降工作量：压缩/降分辨率 · 剔除 · LOD；图集主要减少绑定并扩大批次</text>
          <text x="60" y="364" fontSize="10" fill="var(--text-secondary)">目标：让 CPU、GPU、带宽与功耗都落在目标帧预算内</text>

          <defs>
            <marker id="roArrow" markerWidth="9" markerHeight="9" refX="6" refY="4.5" orient="auto">
              <path d="M0,0 L7,4.5 L0,9 z" fill="var(--accent)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">合并提交、状态排序和降低实际顶点片元/带宽工作量是三类不同优化</figcaption>
    </figure>
  );
}

const BOTTLENECKS = [
  ["CPU 提交", "降低 draw 数、缓存状态、实例化/批处理", "主线程与提交线程时间"],
  ["顶点/几何", "视锥/遮挡剔除、LOD、索引与顶点布局", "处理顶点/图元数量"],
  ["片元", "降低覆盖、shader 成本、透明层和分辨率", "片元调用与 GPU 时间"],
  ["带宽", "压缩格式、附件位宽、mip、减少 load/store", "读写字节与缓存命中"],
  ["同步", "移除 readback/finish，延迟查询结果", "CPU/GPU 空洞与等待时间"],
] as const;

export function DogBottleneckDecisionDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <div
          role="img"
          aria-label="渲染五类瓶颈、对应优化动作和验收计数器"
          className="grid gap-2"
        >
          {BOTTLENECKS.map(([kind, action, evidence]) => (
            <div
              key={kind}
              className="grid min-h-16 gap-2 rounded-control border border-border bg-bg/40 p-3 md:grid-cols-[7rem_1.4fr_1fr] md:items-center"
            >
              <strong className="text-sm text-accent">{kind}</strong>
              <span className="text-xs leading-5 text-primary">{action}</span>
              <span className="text-xs leading-5 text-secondary">证据：{evidence}</span>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        优化动作必须与瓶颈类别和可量化证据对应，不能只看平均 FPS
      </figcaption>
    </figure>
  );
}
