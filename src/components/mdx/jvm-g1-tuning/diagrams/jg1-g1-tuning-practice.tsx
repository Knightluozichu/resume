/**
 * <Jg1G1TuningPracticeDiagram>：G1调优实践——核心参数与诊断流程图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 540;

export function Jg1G1TuningPracticeDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="G1调优实践——核心参数与诊断流程图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            G1 调优实践——核心参数与诊断流程
          </text>

          {/* 核心参数表 */}
          <text x="40" y="58" fontSize="13" fontWeight="600" fill="var(--accent)">核心调优参数</text>

          {[
            { y: 72, param: "MaxGCPauseMillis", val: "200ms", desc: "停顿目标，G1 据此调整 CSet 大小", color: "var(--warning)" },
            { y: 100, param: "InitiatingHeapOccupancyPercent", val: "45%", desc: "并发标记触发阈值（大对象多时调低到 35%）", color: "var(--accent)" },
            { y: 128, param: "G1HeapRegionSize", val: "1-32MB", desc: "Region 大小，大堆可手动设大减少 RSet 开销", color: "var(--danger)" },
            { y: 156, param: "MaxTenuringThreshold", val: "15", desc: "晋升年龄阈值，周转快可调小加速回收", color: "var(--success)" },
            { y: 184, param: "G1ReservePercent", val: "10%", desc: "保留内存比例，evacuation failure 时调高到 20%", color: "var(--warning)" },
            { y: 212, param: "G1MixedGCCountTarget", val: "8", desc: "Mixed GC 分批次数，调大降低单次停顿", color: "var(--accent)" },
            { y: 240, param: "ParallelGCThreads", val: "=CPU核数", desc: "GC 线程数，超线程为核心数 5/8", color: "var(--danger)" },
            { y: 268, param: "ConcGCThreads", val: "=P/4", desc: "并发标记线程数，大堆可调到 P/2", color: "var(--success)" },
          ].map((r, i) => (
            <g key={i}>
              <rect x="40" y={r.y} width="670" height="24" rx="3" fill={r.color} fillOpacity="0.08" stroke={r.color} strokeWidth="0.6" />
              <text x="55" y={r.y + 16} fontSize="11" fontWeight="600" fill={r.color}>{r.param}</text>
              <text x="300" y={r.y + 16} fontSize="11" fill="var(--text-secondary)">{r.val}</text>
              <text x="400" y={r.y + 16} fontSize="11" fill="var(--text-tertiary)">{r.desc}</text>
            </g>
          ))}

          {/* 诊断流程 */}
          <text x="40" y="316" fontSize="13" fontWeight="600" fill="var(--accent)">Full GC 诊断流程</text>

          <defs>
            <marker id="arrTp" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="var(--text-tertiary)" />
            </marker>
          </defs>

          {[
            { x: 40, y: 330, label: "查看 GC 日志", desc: "确认 Full GC 触发原因", color: "var(--warning)" },
            { x: 210, y: 330, label: "jcmd heap_info", desc: "查看 Region 类型分布", color: "var(--accent)" },
            { x: 380, y: 330, label: "jmap -histo", desc: "对象统计 Top 20", color: "var(--danger)" },
            { x: 550, y: 330, label: "GC.heap_dump", desc: "导出 dump 用 MAT 分析", color: "var(--success)" },
          ].map((s, i) => (
            <g key={i}>
              <rect x={s.x} y={s.y} width="150" height="50" rx="6" fill={s.color} fillOpacity="0.10" stroke={s.color} strokeWidth="1.2" />
              <text x={s.x + 75} y={s.y + 18} textAnchor="middle" fontSize="11" fontWeight="600" fill={s.color}>{s.label}</text>
              <text x={s.x + 75} y={s.y + 34} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{s.desc}</text>
              {i < 3 && <line x1={s.x + 150} y1={s.y + 25} x2={s.x + 168} y2={s.y + 25} stroke="var(--text-tertiary)" strokeWidth="1.5" markerEnd="url(#arrTp)" />}
            </g>
          ))}

          {/* 调优决策 */}
          <text x="40" y="408" fontSize="13" fontWeight="600" fill="var(--accent)">调优决策矩阵</text>

          <rect x="40" y="422" width="330" height="50" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="55" y="442" fontSize="11" fontWeight="600" fill="var(--danger)">evacuation failure</text>
          <text x="55" y="460" fontSize="11" fill="var(--text-secondary)">→ G1ReservePercent=20 | IHOP=35 | 增大堆</text>

          <rect x="390" y="422" width="330" height="50" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="405" y="442" fontSize="11" fontWeight="600" fill="var(--warning)">Mixed GC 频繁/回收少</text>
          <text x="405" y="460" fontSize="11" fill="var(--text-secondary)">→ 调高 IHOP | 调小 MixedGCCountTarget | 增大 MaxGCPauseMillis</text>

          <rect x="40" y="482" width="330" height="50" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="55" y="502" fontSize="11" fontWeight="600" fill="var(--accent)">Humongous 过多</text>
          <text x="55" y="520" fontSize="11" fill="var(--text-secondary)">→ 增大 G1HeapRegionSize | 重构代码避免大对象</text>

          <rect x="390" y="482" width="330" height="50" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="405" y="502" fontSize="11" fontWeight="600" fill="var(--success)">System.gc() 触发</text>
          <text x="405" y="520" fontSize="11" fill="var(--text-secondary)">→ -XX:+DisableExplicitGC</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        G1调优实践——8个核心参数、Full GC四步诊断流程、四种常见问题的调优决策矩阵
      </figcaption>
    </figure>
  );
}
