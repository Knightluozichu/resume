/**
 * <UrpVsBuiltinDiagram>：URP vs Built-in 渲染管线架构对比。
 * 左侧 Built-in（散装管线状态）、右侧 URP（SRP Batcher 统一提交）。
 */

export function UrpVsBuiltinDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 280"
          role="img"
          aria-label="Built-in 渲染管线（左）vs URP（右）：Built-in 每次换材质重建管线状态，URP 通过 SRP Batcher 统一常量缓冲布局批量提交"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {/* Built-in */}
          <rect x="20" y="20" width="280" height="240" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.5" />
          <text x="160" y="46" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-secondary)">Built-in 管线</text>
          <text x="160" y="66" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">每次换材质 → 重建管线状态</text>

          {/* Objects */}
          {[0, 1, 2].map((i) => (
            <g key={`b-obj-${i}`}>
              <rect x={60 + i * 70} y="82" width="44" height="28" rx="4" fill="var(--bg-elevated)" stroke={i === 0 ? "var(--success)" : i === 1 ? "var(--warning)" : "var(--accent)"} strokeWidth="2" />
              <line x1={240} y1={96} x2={280} y2={96} stroke="var(--text-secondary)" strokeWidth="1" strokeDasharray="3,3" />
              <text x={280} y={100} fontSize="9" fill="var(--text-secondary)" textAnchor="end">SetPass ×3</text>
            </g>
          ))}

          {/* GPU side */}
          <rect x="60" y="120" width="180" height="50" rx="4" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="150" y="142" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">每次 SetPass：重建 CB 布局</text>
          <text x="150" y="158" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">绑纹理→设 RS→发 Draw</text>

          <rect x="60" y="182" width="56" height="24" rx="4" fill="var(--bg-elevated)" stroke="var(--success)" strokeWidth="1.5" />
          <rect x="124" y="182" width="56" height="24" rx="4" fill="var(--bg-elevated)" stroke="var(--warning)" strokeWidth="1.5" />
          <rect x="188" y="182" width="56" height="24" rx="4" fill="var(--bg-elevated)" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="152" y="224" textAnchor="middle" fontSize="10" fill="var(--danger)">3× 管线配置 = 3× 开销</text>

          {/* ---- URP side ---- */}
          <rect x="340" y="20" width="280" height="240" rx="8" fill="var(--bg-elevated)" stroke="var(--accent)" strokeWidth="2" />
          <text x="480" y="46" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">URP（SRP Batcher）</text>
          <text x="480" y="66" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">统一布局 · 只换参数不重建状态</text>

          {/* Objects */}
          {[0, 1, 2].map((i) => (
            <rect key={`urp-obj-${i}`} x={380 + i * 70} y="82" width="44" height="28" rx="4" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.5" />
          ))}

          {/* Unified batch lane */}
          <rect x="380" y="124" width="200" height="28" rx="4" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2" />
          <text x="480" y="142" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--accent)">1× SetPass · 3 物体合批</text>

          <rect x="380" y="166" width="200" height="40" rx="4" fill="var(--bg)" stroke="var(--success)" strokeWidth="1.5" />
          <text x="480" y="186" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">统一 CB 布局 · 只更新参数块</text>
          <text x="480" y="200" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">管线状态不动 → 少开销</text>

          <text x="480" y="232" textAnchor="middle" fontSize="10" fill="var(--success)">3x 物体 = 1x 管线配置</text>

          {/* Bottom annotation */}
          <text x="320" y="272" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            Built-in：换材质=整个桌面清空重铺 · URP：桌子不动只换东西
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        Built-in 管线每次换材质都重建 GPU 管线状态（SetPass 累加）；URP 的 SRP
        Batcher 把一致 Shader 变体的材质参数按统一布局打包，只更新参数块不重建状态。
      </figcaption>
    </figure>
  );
}
