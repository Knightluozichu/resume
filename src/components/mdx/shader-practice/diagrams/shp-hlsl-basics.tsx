/**
 * <ShpHlslBasicsDiagram>
 *
 * HLSL 数据类型与语义传递
 */

export function ShpHlslBasicsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="HLSL 数据类型与语义传递" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">HLSL 基础语法</text>

          <rect x="30" y="55" width="200" height="100" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="130" y="75" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">数据类型</text>
          <text x="130" y="95" textAnchor="middle" fontSize="10" fill="var(--text-primary)">float / half / int</text>
          <text x="130" y="112" textAnchor="middle" fontSize="10" fill="var(--text-primary)">float2 / float3 / float4</text>
          <text x="130" y="129" textAnchor="middle" fontSize="10" fill="var(--text-primary)">float3x3 / float4x4</text>
          <text x="130" y="146" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">向量 + 矩阵</text>

          <rect x="260" y="55" width="200" height="100" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="360" y="75" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">语义 (Semantic)</text>
          <text x="360" y="95" textAnchor="middle" fontSize="10" fill="var(--text-primary)">POSITION / NORMAL</text>
          <text x="360" y="112" textAnchor="middle" fontSize="10" fill="var(--text-primary)">TEXCOORD0 / COLOR</text>
          <text x="360" y="129" textAnchor="middle" fontSize="10" fill="var(--text-primary)">SV_POSITION / SV_TARGET</text>
          <text x="360" y="146" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">阶段间数据传递</text>

          <rect x="490" y="55" width="200" height="100" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="590" y="75" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">内置函数</text>
          <text x="590" y="95" textAnchor="middle" fontSize="10" fill="var(--text-primary)">mul / dot / cross</text>
          <text x="590" y="112" textAnchor="middle" fontSize="10" fill="var(--text-primary)">lerp / saturate / clamp</text>
          <text x="590" y="129" textAnchor="middle" fontSize="10" fill="var(--text-primary)">normalize / reflect</text>
          <text x="590" y="146" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">向量和数学运算</text>

          <rect x="30" y="180" width="660" height="50" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="360" y="200" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">cbuffer: float4x4 World/View/Proj + float3 LightDir + float Time</text>
          <text x="360" y="218" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">按 16 字节对齐，从大到小排列成员</text>

          <rect x="48" y="260" width="624" height="56" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="280" textAnchor="middle" fontSize="11" fill="var(--text-primary)">mul(M, v): 行主序矩阵 × 列向量</text>
          <text x="360" y="298" textAnchor="middle" fontSize="11" fill="var(--text-primary)">mul(v, M): 行向量 × 矩阵 — 参数顺序决定存储约定</text>

          <text x="360" y="360" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">数据类型 → 语义 → 内置函数 = HLSL 三大基石</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">HLSL 数据类型与语义传递</figcaption>
    </figure>
  );
}
