/**
 * <SrpBatcherFlowDiagram>：SRP Batcher 内部数据流示意。
 * 展示 CPU→GPU 批量提交路径：兼容 Shader 的不同材质共用一套 CB 布局。
 */

export function SrpBatcherFlowDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 600 280"
          role="img"
          aria-label="SRP Batcher 工作流：CPU 侧不同材质按统一常量缓冲布局打包，批量提交到 GPU 一次 SetPass 完成多个 Draw"
          className="mx-auto block h-auto w-full max-w-[600px]"
        >
          {/* CPU side */}
          <rect x="16" y="16" width="200" height="120" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.5" />
          <text x="116" y="40" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">CPU 端</text>

          {/* Material instances */}
          <rect x="32" y="54" width="56" height="32" rx="4" fill="var(--bg-elevated)" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="60" y="74" textAnchor="middle" fontSize="9" fill="var(--text-primary)">Mat A</text>
          <rect x="96" y="54" width="56" height="32" rx="4" fill="var(--bg-elevated)" stroke="var(--warning)" strokeWidth="1.5" />
          <text x="124" y="74" textAnchor="middle" fontSize="9" fill="var(--text-primary)">Mat B</text>
          <rect x="160" y="54" width="44" height="32" rx="4" fill="var(--bg-elevated)" stroke="var(--success)" strokeWidth="1.5" />
          <text x="182" y="74" textAnchor="middle" fontSize="9" fill="var(--text-primary)">Mat C</text>

          <text x="116" y="108" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">同 Shader · 不同参数</text>

          {/* Arrow */}
          <line x1="216" y1="76" x2="260" y2="76" stroke="var(--accent)" strokeWidth="2" />
          <polygon points="256,70 266,76 256,82" fill="var(--accent)" />

          {/* SRP Batcher box */}
          <rect x="260" y="30" width="120" height="100" rx="8" fill="var(--bg-elevated)" stroke="var(--accent)" strokeWidth="2" />
          <text x="320" y="54" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">SRP Batcher</text>
          <text x="320" y="72" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">统一 CB 布局</text>
          <text x="320" y="88" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">合并提交批次</text>
          <text x="320" y="110" textAnchor="middle" fontSize="9" fill="var(--success)">1× SetPass</text>

          {/* Arrow 2 */}
          <line x1="380" y1="80" x2="424" y2="80" stroke="var(--accent)" strokeWidth="2" />
          <polygon points="420,74 430,80 420,86" fill="var(--accent)" />

          {/* GPU side */}
          <rect x="430" y="16" width="160" height="120" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.5" />
          <text x="510" y="40" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">GPU 端</text>

          <rect x="446" y="54" width="130" height="28" rx="4" fill="var(--bg-elevated)" stroke="var(--success)" strokeWidth="1.5" />
          <text x="510" y="72" textAnchor="middle" fontSize="9" fill="var(--text-primary)">Draw A → Draw B → Draw C</text>

          <text x="510" y="102" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">同一管线状态 · 3 个 Draw</text>

          {/* Prerequisites */}
          <rect x="16" y="154" width="574" height="56" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="24" y="176" fontSize="10" fontWeight="600" fill="var(--text-primary)">Shader 前提条件：</text>
          <text x="164" y="176" fontSize="10" fontFamily="monospace" fill="var(--accent)">CBUFFER_START(UnityPerMaterial)</text>
          <text x="24" y="196" fontSize="10" fill="var(--text-secondary)">
            所有逐材质属性（颜色/纹理 ScaleOffset/数值）包在此 CB 中 · URP Lit/SimpleLit/Unlit 默认兼容 · 自定义 Shader 照写即可
          </text>

          {/* Requirements */}
          <rect x="16" y="224" width="574" height="42" rx="6" fill="var(--bg)" stroke="var(--warning)" strokeWidth="1" />
          <text x="24" y="246" fontSize="10" fill="var(--danger)">⚠ 中断 SRP Batcher 的操作：① MaterialPropertyBlock ② 不兼容的 Shader ③ 修改 Render State 参数（Blend/ZTest 等）</text>
          <text x="24" y="260" fontSize="10" fill="var(--text-secondary)">验证方法：Frame Debugger → 查看 Draw Call 是否有 SRP Batch 标签</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        SRP Batcher 在 CPU 侧把同一 Shader 变体的不同材质参数按统一常量缓冲（CB）布局打包，
        GPU 侧一次 SetPass 即可驱动多个 Draw Call——核心是减少了每次材质切换导致的管线状态重建。
      </figcaption>
    </figure>
  );
}
