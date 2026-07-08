/**
 * <GpgLightingShadowsDiagram>：GPU Gems 光照与阴影技术图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GpgLightingShadowsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="光照与阴影技术：从硬阴影到软阴影再到全局光照"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            光照与阴影技术演进
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            硬阴影 → 软阴影 → 体积阴影 → 全局光照近似
          </text>

          {/* 硬阴影 */}
          <rect x="40" y="80" width="150" height="110" rx="10" fill="var(--text-tertiary)" fillOpacity="0.08" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="115" y="104" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">硬阴影</text>
          <text x="115" y="124" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Shadow Map</text>
          <text x="115" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">单次深度比较</text>
          <text x="115" y="160" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">边缘锐利锯齿</text>
          <text x="115" y="178" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">点光源假设</text>

          {/* PCF 软阴影 */}
          <rect x="210" y="80" width="150" height="110" rx="10" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="285" y="104" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">PCF 软阴影</text>
          <text x="285" y="124" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">邻域采样平均</text>
          <text x="285" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">百分比渐近过滤</text>
          <text x="285" y="160" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">边缘平滑过渡</text>
          <text x="285" y="178" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">模拟面光源</text>

          {/* 体积阴影 */}
          <rect x="380" y="80" width="150" height="110" rx="10" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="455" y="104" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">体积阴影</text>
          <text x="455" y="124" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Deep Shadow Map</text>
          <text x="455" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">半透明物投射</text>
          <text x="455" y="160" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">存透射率函数</text>
          <text x="455" y="178" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">毛发/烟雾专用</text>

          {/* 全局光照 */}
          <rect x="550" y="80" width="130" height="110" rx="10" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="615" y="104" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">全局光照</text>
          <text x="615" y="124" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">预计算辐射度</text>
          <text x="615" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">SH 球谐光照</text>
          <text x="615" y="160" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">间接光近似</text>
          <text x="615" y="178" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">环境光遮蔽</text>

          {/* 箭头 */}
          <text x="197" y="140" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>
          <text x="367" y="140" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>
          <text x="537" y="140" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          {/* 底部对比 */}
          <rect x="40" y="220" width="640" height="150" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="246" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">阴影质量 vs 性能开销权衡</text>

          <rect x="70" y="266" width="580" height="24" rx="6" fill="var(--text-tertiary)" fillOpacity="0.1" />
          <rect x="70" y="266" width="120" height="24" rx="6" fill="var(--text-tertiary)" fillOpacity="0.5" />
          <text x="130" y="282" textAnchor="middle" fontSize="10" fill="var(--text-primary)">硬阴影 1x</text>
          <rect x="190" y="266" width="200" height="24" rx="6" fill="var(--accent)" fillOpacity="0.4" />
          <text x="290" y="282" textAnchor="middle" fontSize="10" fill="var(--text-primary)">PCF 4x~16x</text>
          <rect x="390" y="266" width="180" height="24" rx="6" fill="var(--warning)" fillOpacity="0.4" />
          <text x="480" y="282" textAnchor="middle" fontSize="10" fill="var(--text-primary)">体积阴影</text>
          <rect x="570" y="266" width="80" height="24" rx="6" fill="var(--success)" fillOpacity="0.4" />
          <text x="610" y="282" textAnchor="middle" fontSize="10" fill="var(--text-primary)">GI</text>

          <text x={VIEW_W / 2} y="316" textAnchor="middle" fontSize="11" fill="var(--text-primary)">采样数越多 → 边缘越软 → GPU 带宽越大</text>
          <text x={VIEW_W / 2} y="336" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">PCSS（百分比渐近软阴影）根据遮挡距离自适应采样范围</text>
          <text x={VIEW_W / 2} y="356" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">关键洞察：阴影的「软」来自光源面积，不是模糊滤镜</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        光照与阴影技术从硬阴影到全局光照的演进与权衡
      </figcaption>
    </figure>
  );
}
