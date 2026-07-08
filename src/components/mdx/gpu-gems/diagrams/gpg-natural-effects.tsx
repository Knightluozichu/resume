/**
 * <GpgNaturalEffectsDiagram>：GPU Gems 自然效果渲染图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GpgNaturalEffectsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="自然效果渲染：水、火、毛发的着色器策略对比"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            自然效果渲染策略
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            水面、火焰、毛发——三种自然现象的着色器思路
          </text>

          {/* 水面 */}
          <rect x="40" y="80" width="200" height="140" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="140" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">水面</text>
          <text x="140" y="126" textAnchor="middle" fontSize="11" fill="var(--text-primary)">顶点位移 + 法线扰动</text>
          <text x="140" y="146" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">正弦波叠加 Gerstner 波</text>
          <text x="140" y="166" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">菲涅尔反射 + 折射</text>
          <text x="140" y="190" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">关键：动态法线 → 高光</text>
          <path d="M 60 210 Q 100 200 140 210 T 220 210" fill="none" stroke="var(--accent)" strokeWidth="1.5" opacity="0.6" />

          {/* 火焰 */}
          <rect x="260" y="80" width="200" height="140" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="360" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">火焰</text>
          <text x="360" y="126" textAnchor="middle" fontSize="11" fill="var(--text-primary)">噪声纹理 + 滚动</text>
          <text x="360" y="146" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">3D 噪声模拟湍流</text>
          <text x="360" y="166" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">颜色渐变映射温度</text>
          <text x="360" y="190" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">关键：扰动 + 色温渐变</text>
          <path d="M 340 210 Q 350 190 360 210 Q 370 185 380 210" fill="none" stroke="var(--warning)" strokeWidth="1.5" opacity="0.6" />

          {/* 毛发 */}
          <rect x="480" y="80" width="200" height="140" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="580" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">毛发</text>
          <text x="580" y="126" textAnchor="middle" fontSize="11" fill="var(--text-primary)">多层壳渲染 / 线段</text>
          <text x="580" y="146" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">壳层法线插值</text>
          <text x="580" y="166" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">各向异性高光</text>
          <text x="580" y="190" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">关键：层数控制密度</text>
          <line x1="560" y1="210" x2="565" y2="185" stroke="var(--success)" strokeWidth="1.5" opacity="0.6" />
          <line x1="575" y1="210" x2="578" y2="180" stroke="var(--success)" strokeWidth="1.5" opacity="0.6" />
          <line x1="590" y1="210" x2="593" y2="188" stroke="var(--success)" strokeWidth="1.5" opacity="0.6" />

          {/* 共同点 */}
          <rect x="40" y="250" width="640" height="120" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="276" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">三种效果的共同骨架</text>
          <text x={VIEW_W / 2} y="300" textAnchor="middle" fontSize="11" fill="var(--text-primary)">1. 用程序化噪声/数学函数生成「扰动源」</text>
          <text x={VIEW_W / 2} y="320" textAnchor="middle" fontSize="11" fill="var(--text-primary)">2. 把扰动映射到几何（位移）或颜色（渐变）</text>
          <text x={VIEW_W / 2} y="340" textAnchor="middle" fontSize="11" fill="var(--text-primary)">3. 叠加光照模型让效果融入场景</text>
          <text x={VIEW_W / 2} y="360" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">核心思想：把自然现象「参数化」为着色器可控的数学量</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        水面、火焰、毛发——三种自然现象的着色器策略对比
      </figcaption>
    </figure>
  );
}
