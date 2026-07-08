/**
 * <SxxProceduralTexturingDiagram>：程序化纹理图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function SxxProceduralTexturingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
         aria-label="程序化纹理图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            程序化纹理生成
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            噪声、晶格、Tiling 与权重混合
          </text>

          {/* Perlin噪声 */}
          <rect x="40" y="80" width="200" height="130" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="140" y="102" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">Perlin 噪声</text>
          <text x="140" y="126" textAnchor="middle" fontSize="10" fill="var(--text-primary)">梯度格点插值</text>
          <text x="140" y="144" textAnchor="middle" fontSize="10" fill="var(--text-primary)">平滑过渡无块状感</text>
          <text x="140" y="162" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">分形布朗运动叠加</text>
          <text x="140" y="186" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">noise = sum(amp_i * perlin(freq_i * p))</text>
          <text x="140" y="202" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">amp *= 0.5, freq *= 2.0</text>

          {/* Worley噪声 */}
          <rect x="260" y="80" width="200" height="130" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="360" y="102" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">Worley 噪声</text>
          <text x="360" y="126" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Voronoi 距离场</text>
          <text x="360" y="144" textAnchor="middle" fontSize="10" fill="var(--text-primary)">最近特征点距离</text>
          <text x="360" y="162" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">蜂窝 / 石头 / 龟裂纹理</text>
          <text x="360" y="186" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">F1 = min(dist(p, cell))</text>
          <text x="360" y="202" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">F2 = second_min(dist)</text>

          {/* 程序化Tiling */}
          <rect x="480" y="80" width="200" height="130" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="580" y="102" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">无缝 Tiling</text>
          <text x="580" y="126" textAnchor="middle" fontSize="10" fill="var(--text-primary)">周期性映射坐标</text>
          <text x="580" y="144" textAnchor="middle" fontSize="10" fill="var(--text-primary)">三角波折叠消除接缝</text>
          <text x="580" y="162" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Wang Tile 拼接法</text>
          <text x="580" y="186" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">uv = abs(frac(uv) - 0.5) * 2</text>
          <text x="580" y="202" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">四面镜像消除边界</text>

          {/* 权重混合 */}
          <rect x="40" y="240" width="640" height="120" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="264" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">多层权重混合：高度图驱动纹理过渡</text>
          <text x="140" y="290" textAnchor="middle" fontSize="10" fill="var(--text-primary)">海拔低 → 草地纹理</text>
          <text x="140" y="308" textAnchor="middle" fontSize="10" fill="var(--text-primary)">海拔中 → 岩石纹理</text>
          <text x="140" y="326" textAnchor="middle" fontSize="10" fill="var(--text-primary)">海拔高 → 雪地纹理</text>
          <text x="400" y="290" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">混合权重：</text>
          <text x="400" y="308" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">w = smoothstep(low, high, height)</text>
          <text x="400" y="326" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">color = lerp(grass, rock, w1)</text>
          <text x="580" y="290" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">优势：</text>
          <text x="580" y="308" textAnchor="middle" fontSize="10" fill="var(--text-primary)">零贴图内存</text>
          <text x="580" y="326" textAnchor="middle" fontSize="10" fill="var(--text-primary)">无限不重复</text>
          <text x="580" y="344" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">动态参数调节</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        程序化纹理——Perlin/Worley噪声、无缝Tiling与多层权重混合
      </figcaption>
    </figure>
  );
}
