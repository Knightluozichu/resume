/**
 * <PercentileStatisticsDiagram>：均值/中位数/P95/标准差 四个统计指标的可视化对比。
 *
 * 左侧：帧耗时分布直方图，叠箭头标均值、中位数、P95 位置。
 * 右侧：四个指标卡片的含义与判断。
 */

export function PercentileStatisticsDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 280"
          role="img"
          aria-label="统计指标可视化：左侧帧耗时分布直方图标注均值、中位数、P95位置；右侧四个指标卡片含义"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <text x="320" y="22" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">
            帧耗时分布与统计指标
          </text>

          {/* Distribution histogram */}
          <rect x="24" y="36" width="340" height="170" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />

          {/* Histogram bars */}
          {[1,4,9,16,22,24,20,14,8,4,2].map((h, i) => (
            <rect
              key={i}
              x={50 + i * 28}
              y={196 - h * 6}
              width="22"
              height={h * 6}
              rx="2"
              fill={i <= 5 ? "var(--accent)" : "var(--border)"}
              opacity={i <= 5 ? 1 : 0.5}
            />
          ))}

          {/* X axis */}
          <line x1="44" y1="198" x2="370" y2="198" stroke="var(--border)" strokeWidth="1" />
          <text x="207" y="214" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            帧耗时 (ms) →
          </text>

          {/* Mean marker */}
          <line x1="145" y1="40" x2="145" y2="196" stroke="var(--danger)" strokeWidth="1.5" strokeDasharray="4,3" />
          <text x="145" y="230" textAnchor="middle" fontSize="9" fill="var(--danger)">
            均值 16.2ms
          </text>

          {/* Median marker */}
          <line x1="117" y1="40" x2="117" y2="196" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="117" y="246" textAnchor="middle" fontSize="9" fill="var(--accent)">
            中位数 12.0ms
          </text>

          {/* P95 marker */}
          <line x1="257" y1="40" x2="257" y2="196" stroke="var(--warning)" strokeWidth="1.5" strokeDasharray="4,3" />
          <text x="257" y="230" textAnchor="middle" fontSize="9" fill="var(--warning)">
            P95 38ms
          </text>

          {/* StdDev bracket */}
          <text x="32" y="180" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            σ=8.7
          </text>

          {/* Right side: four metric cards */}
          <rect x="388" y="36" width="228" height="36" rx="4" fill="var(--bg)" stroke="var(--danger)" strokeWidth="1" />
          <text x="396" y="56" fontSize="10" fontWeight="600" fill="var(--danger)">
            均值 = 总和÷帧数
          </text>
          <text x="396" y="68" fontSize="9" fill="var(--text-secondary)">
            对极端值敏感 — 1 帧 300ms 能拉高所有
          </text>

          <rect x="388" y="80" width="228" height="36" rx="4" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1" />
          <text x="396" y="100" fontSize="10" fontWeight="600" fill="var(--accent)">
            中位数 = 排序第 50%
          </text>
          <text x="396" y="112" fontSize="9" fill="var(--text-secondary)">
            不受极端值干扰 — 典型帧体验
          </text>

          <rect x="388" y="124" width="228" height="36" rx="4" fill="var(--bg)" stroke="var(--warning)" strokeWidth="1" />
          <text x="396" y="144" fontSize="10" fontWeight="600" fill="var(--warning)">
            P95 = 排序第 95%
          </text>
          <text x="396" y="156" fontSize="9" fill="var(--text-secondary)">
            最差 5% 帧 — 捕捉间歇卡顿
          </text>

          <rect x="388" y="168" width="228" height="36" rx="4" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="396" y="188" fontSize="10" fontWeight="600" fill="var(--text-primary)">
            标准差 σ = 离散程度
          </text>
          <text x="396" y="200" fontSize="9" fill="var(--text-secondary)">
            σ 大 = 帧率波动剧烈 — 优化不完整
          </text>

          {/* Bottom note */}
          <text x="320" y="262" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            四项指标一起看：均值↓ + 中位数↓ + P95↓ + σ 不变或↓ = 全面有效
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        均值回答「整体快了吗」、中位数回答「典型帧体验」、P95 回答「最差的 5% 多差」、标准差回答「帧率稳不稳」。
      </figcaption>
    </figure>
  );
}
