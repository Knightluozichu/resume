/**
 * <CsecTextEffectsDiagram>：文本特效果图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 400;

export function CsecTextEffectsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="CSS揭秘文本特效果图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            文本特效：描边、渐变、环形文字
          </text>

          {/* 文字描边 */}
          <rect x="40" y="50" width="200" height="100" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="140" y="90" textAnchor="middle" fontSize="28" fontWeight="700" fill="none" stroke="var(--accent)" strokeWidth="1.5">ABC</text>
          <text x="140" y="120" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">-webkit-text-stroke: 1.5px</text>
          <text x="140" y="136" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">color: transparent（只留描边）</text>
          <text x="140" y="168" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">文字描边</text>

          {/* 渐变文字 */}
          <rect x="270" y="50" width="200" height="100" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <defs>
            <linearGradient id="csec-text-grad" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="var(--accent)" />
              <stop offset="50%" stopColor="var(--warning)" />
              <stop offset="100%" stopColor="var(--danger)" />
            </linearGradient>
          </defs>
          <text x="370" y="90" textAnchor="middle" fontSize="28" fontWeight="700" fill="url(#csec-text-grad)">GRAD</text>
          <text x="370" y="120" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">background-clip: text</text>
          <text x="370" y="136" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">color: transparent（透出渐变）</text>
          <text x="370" y="168" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">渐变文字</text>

          {/* 环形文字示意 */}
          <rect x="500" y="50" width="200" height="100" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <circle cx="600" cy="100" r="35" fill="none" stroke="var(--success)" strokeWidth="1" strokeDasharray="3 2" />
          <path id="csec-circle-path" d="M 600,65 A 35,35 0 1,1 599.9,65" fill="none" stroke="none" />
          <text fontSize="9" fill="var(--success)">
            <textPath href="#csec-circle-path" startOffset="0">CSS · TextPath · SVG · </textPath>
          </text>
          <text x="600" y="120" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">SVG textPath</text>
          <text x="600" y="136" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">文字沿 path 排列</text>
          <text x="600" y="168" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">环形文字</text>

          {/* text-shadow 模拟描边 */}
          <rect x="40" y="200" width="320" height="170" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="60" y="224" fontSize="13" fontWeight="600" fill="var(--text-primary)">text-shadow 模拟描边</text>
          <text x="60" y="252" fontSize="22" fontWeight="700" fill="var(--text-primary)" stroke="var(--text-tertiary)" strokeWidth="0.3">SHADOW</text>
          <text x="60" y="280" fontSize="9" fill="var(--text-secondary)">需 4-8 方向 shadow 拼合：</text>
          <text x="60" y="296" fontSize="9" fill="var(--text-tertiary)">-1px -1px 0, 1px -1px 0,</text>
          <text x="60" y="310" fontSize="9" fill="var(--text-tertiary)">-1px  1px 0, 1px  1px 0</text>
          <text x="60" y="334" fontSize="10" fill="var(--warning)">缺点：斜角处可能缝隙/重叠</text>
          <text x="60" y="350" fontSize="10" fill="var(--warning)">缺点：代码冗长、不够锐利</text>
          <text x="60" y="366" fontSize="10" fill="var(--success)">优点：兼容性极好、可做发光</text>

          {/* 方案对比 */}
          <rect x="380" y="200" width="320" height="170" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="400" y="224" fontSize="13" fontWeight="600" fill="var(--text-primary)">text-stroke vs text-shadow</text>
          <text x="400" y="250" fontSize="10" fill="var(--accent)">text-stroke：</text>
          <text x="400" y="266" fontSize="9" fill="var(--text-tertiary)">描边精确均匀、渲染清晰</text>
          <text x="400" y="280" fontSize="9" fill="var(--text-tertiary)">非标准但广泛支持</text>
          <text x="400" y="294" fontSize="9" fill="var(--text-tertiary)">细字号可能遮笔画</text>
          <text x="400" y="320" fontSize="10" fill="var(--warning)">text-shadow：</text>
          <text x="400" y="336" fontSize="9" fill="var(--text-tertiary)">标准属性兼容性好</text>
          <text x="400" y="350" fontSize="9" fill="var(--text-tertiary)">可做发光效果（blur）</text>
          <text x="400" y="364" fontSize="9" fill="var(--text-tertiary)">描边不锐利、代码冗长</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        文本特效——text-stroke 精确描边、background-clip:text 渐变文字、SVG textPath 环形排列
      </figcaption>
    </figure>
  );
}
