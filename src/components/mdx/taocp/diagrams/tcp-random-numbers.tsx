/**
 * <TcpRandomNumbersDiagram>：随机数生成概念图（tcp-random-numbers 章）。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function TcpRandomNumbersDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="随机数生成器的质量检验体系。从一维统计到多维结构，检验层层递进。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            随机数生成器的质量检验体系
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            从一维统计到多维结构，检验层层递进
          </text>

          <g>
            <rect x="40" y="100" width="300" height="80" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.4" />
            <circle cx="56" cy="120" r="4" fill="var(--accent)" />
            <text x="68" y="125" fontSize="13" fontWeight="700" fill="var(--text-primary)">LCG 公式</text>
            <text x="56" y="148" fontSize="11" fill="var(--text-secondary)">X=(aX+c)mod m</text>
            <text x="56" y="166" fontSize="12" fontWeight="600" fill="var(--accent)">周期 ≤ m</text>
          </g>
          <g>
            <rect x="380" y="100" width="300" height="80" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.4" />
            <circle cx="396" cy="120" r="4" fill="var(--success)" />
            <text x="408" y="125" fontSize="13" fontWeight="700" fill="var(--text-primary)">卡方检验</text>
            <text x="396" y="148" fontSize="11" fill="var(--text-secondary)">一维均匀性</text>
            <text x="396" y="166" fontSize="12" fontWeight="600" fill="var(--success)">χ² 统计量</text>
          </g>
          <g>
            <rect x="40" y="210" width="300" height="80" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.4" />
            <circle cx="56" cy="230" r="4" fill="var(--warning)" />
            <text x="68" y="235" fontSize="13" fontWeight="700" fill="var(--text-primary)">谱检验</text>
            <text x="56" y="258" fontSize="11" fill="var(--text-secondary)">多维结构</text>
            <text x="56" y="276" fontSize="12" fontWeight="600" fill="var(--warning)">超平面间距</text>
          </g>
          <g>
            <rect x="380" y="210" width="300" height="80" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.4" />
            <circle cx="396" cy="230" r="4" fill="var(--danger)" />
            <text x="408" y="235" fontSize="13" fontWeight="700" fill="var(--text-primary)">RANDU 教训</text>
            <text x="396" y="258" fontSize="11" fill="var(--text-secondary)">3维仅15面</text>
            <text x="396" y="276" fontSize="12" fontWeight="600" fill="var(--danger)">统计过/谱检败</text>
          </g>

          <rect x="40" y="340" width={VIEW_W - 80} height="40" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="365" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            从一维统计到多维结构，检验层层递进
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        从一维统计到多维结构，检验层层递进
      </figcaption>
    </figure>
  );
}
