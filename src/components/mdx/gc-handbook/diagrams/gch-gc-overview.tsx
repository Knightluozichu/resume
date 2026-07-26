/**
 * <GchGcOverviewDiagram>：GC概述与历史——性能指标三角与历史时间线。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function GchGcOverviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="GC概述与历史：性能指标三角与历史时间线"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="26" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">
            GC 性能指标三角 与 历史演进
          </text>

          {/* 左半：性能指标三角 */}
          <text x="185" y="56" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">性能指标三角（不可能同时最优）</text>

          <polygon points="185,90 100,220 270,220" fill="none" stroke="var(--accent)" strokeWidth="1.5" />

          <circle cx="185" cy="90" r="26" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="185" y="87" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">吞吐量</text>
          <text x="185" y="100" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">throughput</text>

          <circle cx="100" cy="220" r="26" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="100" y="217" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">延迟</text>
          <text x="100" y="230" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">latency</text>

          <circle cx="270" cy="220" r="26" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1.2" />
          <text x="270" y="217" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">内存</text>
          <text x="270" y="230" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">footprint</text>

          <text x="185" y="145" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">STW越短→延迟好</text>
          <text x="185" y="158" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">但GC频率↑→吞吐↓</text>
          <text x="185" y="195" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">复制占用空间→内存↑</text>

          {/* 分割线 */}
          <line x1="370" y1="50" x2="370" y2="430" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />

          {/* 右半：历史时间线 */}
          <text x="555" y="56" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">GC 算法历史演进</text>

          <line x1="400" y1="80" x2="400" y2="420" stroke="var(--accent)" strokeWidth="1.5" strokeOpacity="0.4" />

          {/* 时间节点 */}
          <circle cx="400" cy="90" r="4" fill="var(--warning)" />
          <text x="415" y="87" fontSize="11" fontWeight="600" fill="var(--warning)">1959 McCarthy LISP</text>
          <text x="415" y="99" fontSize="11" fill="var(--text-secondary)">标记-清除 首个GC</text>

          <circle cx="400" cy="140" r="4" fill="var(--warning)" />
          <text x="415" y="137" fontSize="11" fontWeight="600" fill="var(--warning)">1963 Minsky</text>
          <text x="415" y="149" fontSize="11" fill="var(--text-secondary)">复制式回收</text>

          <circle cx="400" cy="190" r="4" fill="var(--accent)" />
          <text x="415" y="187" fontSize="11" fontWeight="600" fill="var(--accent)">1970s</text>
          <text x="415" y="199" fontSize="11" fill="var(--text-secondary)">分代假说/标记压缩</text>

          <circle cx="400" cy="240" r="4" fill="var(--accent)" />
          <text x="415" y="237" fontSize="11" fontWeight="600" fill="var(--accent)">1980s Baker</text>
          <text x="415" y="249" fontSize="11" fill="var(--text-secondary)">增量/并发GC</text>

          <circle cx="400" cy="290" r="4" fill="var(--danger)" />
          <text x="415" y="287" fontSize="11" fontWeight="600" fill="var(--danger)">2000s</text>
          <text x="415" y="299" fontSize="11" fill="var(--text-secondary)">CMS/分代并发</text>

          <circle cx="400" cy="340" r="4" fill="var(--danger)" />
          <text x="415" y="337" fontSize="11" fontWeight="600" fill="var(--danger)">2010s</text>
          <text x="415" y="349" fontSize="11" fill="var(--text-secondary)">G1/Shenandoah</text>

          <circle cx="400" cy="390" r="4" fill="var(--success)" />
          <text x="415" y="387" fontSize="11" fontWeight="600" fill="var(--success)">2018+ ZGC</text>
          <text x="415" y="399" fontSize="11" fill="var(--text-secondary)">亚毫秒级停顿</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        GC 性能三指标（吞吐量/延迟/内存占用）的权衡关系，以及从1959年McCarthy标记-清除到现代ZGC的算法演进时间线
      </figcaption>
    </figure>
  );
}
