/**
 * <NdgPerformanceDebugDiagram>：性能分析与调试工具链图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function NdgPerformanceDebugDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Node.js性能分析与调试工具链图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Node.js 性能分析与调试工具链
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            CPU Profiler / Heap Snapshot / Inspector / 事件循环延迟
          </text>

          {/* 三大分析维度 */}
          <rect x="30" y="66" width="215" height="160" rx="12" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="137" y="88" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--danger)">CPU 分析</text>
          <text x="137" y="104" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">找热点函数</text>
          <text x="50" y="124" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">--prof (V8 tick)</text>
          <text x="50" y="138" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">--prof-process</text>
          <text x="50" y="152" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">clinic flame</text>
          <text x="50" y="166" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">inspector Session</text>
          <text x="50" y="184" fontSize="9" fill="var(--text-tertiary)">采样频率 1ms</text>
          <text x="50" y="198" fontSize="9" fill="var(--text-tertiary)">输出：火焰图 / 调用树</text>
          <text x="50" y="214" fontSize="9" fill="var(--text-secondary)">定位：哪个函数占 CPU 最多</text>

          <rect x="262" y="66" width="215" height="160" rx="12" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="370" y="88" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">内存分析</text>
          <text x="370" y="104" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">找泄漏</text>
          <text x="282" y="124" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">--inspect</text>
          <text x="282" y="138" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">heap snapshot</text>
          <text x="282" y="152" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">process.memoryUsage()</text>
          <text x="282" y="166" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">--max-old-space-size</text>
          <text x="282" y="184" fontSize="9" fill="var(--text-tertiary)">对比快照 diff</text>
          <text x="282" y="198" fontSize="9" fill="var(--text-tertiary)">retainers 保留路径</text>
          <text x="282" y="214" fontSize="9" fill="var(--text-secondary)">定位：谁引用了不该留的对象</text>

          <rect x="494" y="66" width="216" height="160" rx="12" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="602" y="88" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">事件循环延迟</text>
          <text x="602" y="104" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">找阻塞点</text>
          <text x="514" y="124" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">perf_hooks.monitorEventLoopDelay</text>
          <text x="514" y="138" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">--inspect + timeline</text>
          <text x="514" y="152" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">clinic doctor</text>
          <text x="514" y="166" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">process.hrtime.bigint()</text>
          <text x="514" y="184" fontSize="9" fill="var(--text-tertiary)">p99 延迟 &gt; 10ms = 阻塞</text>
          <text x="514" y="198" fontSize="9" fill="var(--text-tertiary)">同步代码 = 阻塞根源</text>
          <text x="514" y="214" fontSize="9" fill="var(--text-secondary)">定位：哪段同步代码卡住了循环</text>

          {/* Inspector 协议 */}
          <rect x="30" y="244" width="680" height="100" rx="12" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="370" y="264" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">Inspector 协议（Chrome DevTools Protocol）</text>
          <text x="50" y="284" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">node --inspect=9229 app.js → ws://localhost:9229</text>
          <text x="50" y="300" fontSize="9" fill="var(--text-secondary)">Chrome DevTools / VS Code / inspector 模块 → 连接 WebSocket 端点</text>
          <text x="50" y="316" fontSize="9" fill="var(--text-secondary)">能力：断点调试、步进、变量查看、CPU Profile、Heap Snapshot、Coverage</text>
          <text x="50" y="332" fontSize="9" fill="var(--text-tertiary)">生产环境用 inspector.Session 编程式采集，或 --inspect=0.0.0.0:9229（注意安全）</text>

          {/* 调试流程 */}
          <rect x="30" y="360" width="680" height="80" rx="12" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="380" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">诊断流程</text>

          <rect x="50" y="394" width="120" height="32" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="110" y="414" textAnchor="middle" fontSize="9" fill="var(--accent)">监控指标</text>

          <text x="180" y="414" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="200" y="394" width="120" height="32" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="260" y="414" textAnchor="middle" fontSize="9" fill="var(--warning)">复现场景</text>

          <text x="330" y="414" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="350" y="394" width="120" height="32" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="410" y="414" textAnchor="middle" fontSize="9" fill="var(--danger)">采集 Profile</text>

          <text x="480" y="414" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="500" y="394" width="120" height="32" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="560" y="414" textAnchor="middle" fontSize="9" fill="var(--success)">分析定位</text>

          <text x="630" y="414" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="650" y="394" width="50" height="32" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="675" y="414" textAnchor="middle" fontSize="9" fill="var(--accent)">修复</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        性能分析与调试——CPU Profiler找热点、Heap Snapshot找泄漏、Inspector协议连接DevTools、事件循环延迟监控
      </figcaption>
    </figure>
  );
}
