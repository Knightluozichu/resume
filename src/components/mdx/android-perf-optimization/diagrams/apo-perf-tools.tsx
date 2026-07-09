/**
 * <ApoPerfToolsDiagram>：性能分析工具全景图。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function ApoPerfToolsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Android性能分析工具全景图"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Android 性能分析工具全景
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            测量 → 定位 → 分析 → 优化 → 验证
          </text>

          {/* 中心节点 */}
          <rect x="270" y="70" width="200" height="50" rx="10" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="370" y="100" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--accent)">Android Studio Profiler</text>

          {/* CPU Profiler */}
          <rect x="40" y="160" width="200" height="80" rx="8" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="140" y="185" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">CPU Profiler</text>
          <text x="140" y="205" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">方法耗时/调用栈</text>
          <text x="140" y="220" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Sample/Trace 两种模式</text>
          <text x="140" y="235" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Flame Chart 火焰图</text>

          {/* Memory Profiler */}
          <rect x="270" y="160" width="200" height="80" rx="8" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="370" y="185" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">Memory Profiler</text>
          <text x="370" y="205" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">堆转储/内存分配</text>
          <text x="370" y="220" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">LeakCanary 泄漏检测</text>
          <text x="370" y="235" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">GC 触发时机分析</text>

          {/* Network Profiler */}
          <rect x="500" y="160" width="200" height="80" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="600" y="185" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">Network Profiler</text>
          <text x="600" y="205" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">请求时间线/吞吐量</text>
          <text x="600" y="220" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">请求/响应体查看</text>
          <text x="600" y="235" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">连接复用分析</text>

          {/* Perfetto */}
          <rect x="40" y="280" width="200" height="80" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="140" y="305" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">Perfetto (替代 Systrace)</text>
          <text x="140" y="325" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">系统级 trace 抓取</text>
          <text x="140" y="340" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">CPU 调度/渲染管线</text>
          <text x="140" y="355" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Web UI 可视化分析</text>

          {/* Layout Inspector */}
          <rect x="270" y="280" width="200" height="80" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="305" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">Layout Inspector</text>
          <text x="370" y="325" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">实时层级树检查</text>
          <text x="370" y="340" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">属性/测量值查看</text>
          <text x="370" y="355" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">过度绘制检测</text>

          {/* GPU Profiler */}
          <rect x="500" y="280" width="200" height="80" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="600" y="305" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">GPU Profile Rendering</text>
          <text x="600" y="325" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">逐帧渲染耗时</text>
          <text x="600" y="340" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">16ms 基准线</text>
          <text x="600" y="355" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">过度绘制颜色编码</text>

          {/* 连接线 */}
          <line x1="370" y1="120" x2="140" y2="160" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="4 2" />
          <line x1="370" y1="120" x2="370" y2="160" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="4 2" />
          <line x1="370" y1="120" x2="600" y2="160" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="4 2" />

          {/* 底部：优化闭环 */}
          <rect x="40" y="400" width="660" height="50" rx="8" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="80" y="430" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">测量</text>
          <text x="160" y="430" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x="230" y="430" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">定位</text>
          <text x="310" y="430" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x="380" y="430" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">分析</text>
          <text x="460" y="430" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x="530" y="430" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">优化</text>
          <text x="610" y="430" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x="670" y="430" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">验证</text>

          <text x="370" y="475" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">&uarr; 闭环迭代，每次优化后重新测量验证</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Android性能分析工具全景——Profiler三大模块、Perfetto系统trace、Layout Inspector层级检查、GPU渲染分析
      </figcaption>
    </figure>
  );
}
