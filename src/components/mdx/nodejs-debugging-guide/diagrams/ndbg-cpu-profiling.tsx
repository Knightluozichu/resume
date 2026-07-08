/**
 * <NdbgCpuProfilingDiagram>：CPU Profiler 采样原理与 Self/Total Time 图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 420;

export function NdbgCpuProfilingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="CPU Profiler 采样原理与 Self Time Total Time 图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            CPU Profiler：采样原理与 Self/Total Time
          </text>

          {/* 采样原理 */}
          <text x="60" y="56" fontSize="12" fontWeight="600" fill="var(--accent)">采样原理（每隔约 1ms 记录调用栈）</text>

          {/* 时间轴 */}
          <line x1="40" y1="80" x2="700" y2="80" stroke="var(--border)" strokeWidth="1" />
          <text x="40" y="74" fontSize="9" fill="var(--text-tertiary)">0ms</text>
          <text x="690" y="74" fontSize="9" fill="var(--text-tertiary)">10s</text>

          {/* 采样点 */}
          {[60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660].map((x, i) => (
            <g key={i}>
              <line x1={x} y1="76" x2={x} y2="84" stroke="var(--text-tertiary)" strokeWidth="1" />
              <text x={x} y="96" textAnchor="middle" fontSize="7" fill="var(--text-tertiary)">s{i + 1}</text>
            </g>
          ))}

          {/* 调用栈采样 */}
          <rect x="40" y="110" width="660" height="120" rx="8" fill="var(--bg-primary)" fillOpacity="0.3" stroke="var(--border)" strokeWidth="1" />
          <text x="50" y="128" fontSize="10" fontWeight="600" fill="var(--text-secondary)">采样到的调用栈（11 次采样）</text>

          {/* 栈底：main */}
          <rect x="50" y="136" width="640" height="20" rx="3" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="60" y="150" fontSize="9" fill="var(--accent)">main（11/11 = 100% Total Time）</text>

          {/* 中层：handleRequest */}
          <rect x="50" y="160" width="480" height="20" rx="3" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="60" y="174" fontSize="9" fill="var(--warning)">handleRequest（8/11 = 73% Total Time, Self = 0%）</text>

          {/* 顶层：JSON.parse */}
          <rect x="50" y="184" width="360" height="20" rx="3" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="60" y="198" fontSize="9" fill="var(--danger)">JSON.parse（6/11 = 55% Self Time &uarr; 热点！）</text>

          {/* 其他：db.query */}
          <rect x="430" y="184" width="100" height="20" rx="3" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="0.8" />
          <text x="440" y="198" fontSize="9" fill="var(--success)">db.query (2/11)</text>

          <text x="50" y="222" fontSize="9" fill="var(--text-tertiary)">采样次数 × 间隔 = 大致 CPU 时间 | 栈顶帧次数 = Self Time</text>

          {/* Self vs Total Time 对比 */}
          <text x="60" y="256" fontSize="12" fontWeight="600" fill="var(--accent)">Self Time vs Total Time</text>

          <rect x="40" y="266" width="320" height="100" rx="8" fill="var(--bg-primary)" fillOpacity="0.3" stroke="var(--border)" strokeWidth="1" />
          <text x="55" y="284" fontSize="11" fontWeight="600" fill="var(--danger)">Self Time（自时间）</text>
          <text x="55" y="300" fontSize="9" fill="var(--text-secondary)">函数自身代码执行时间</text>
          <text x="55" y="314" fontSize="9" fill="var(--text-secondary)">不含子函数调用</text>
          <text x="55" y="332" fontSize="9" fill="var(--danger)">JSON.parse: 55% &uarr; 真正的瓶颈</text>
          <text x="55" y="346" fontSize="9" fill="var(--text-tertiary)">handleRequest: 0%（只调度不计算）</text>
          <text x="55" y="360" fontSize="9" fill="var(--text-tertiary)">→ 按 Self Time 排序找热点</text>

          <rect x="380" y="266" width="320" height="100" rx="8" fill="var(--bg-primary)" fillOpacity="0.3" stroke="var(--border)" strokeWidth="1" />
          <text x="395" y="284" fontSize="11" fontWeight="600" fill="var(--warning)">Total Time（总时间）</text>
          <text x="395" y="300" fontSize="9" fill="var(--text-secondary)">函数自身 + 所有子函数</text>
          <text x="395" y="314" fontSize="9" fill="var(--text-secondary)">调用的总时间</text>
          <text x="395" y="332" fontSize="9" fill="var(--warning)">main: 100%（入口函数，最高）</text>
          <text x="395" y="346" fontSize="9" fill="var(--text-tertiary)">handleRequest: 73%</text>
          <text x="395" y="360" fontSize="9" fill="var(--text-tertiary)">→ 误导！优化 main 无意义</text>

          {/* 底部总结 */}
          <rect x="40" y="378" width="660" height="28" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x={VIEW_W / 2} y="396" textAnchor="middle" fontSize="10" fill="var(--danger)">
            误区：Total Time 最高的函数不是瓶颈 | 真相：Self Time 最高的函数才是 CPU 计算瓶颈
          </text>
          <text x={VIEW_W / 2} y="412" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：先看 Self Time 找热点 → 再看调用者确定优化策略 → 减少调用/换实现/缓存
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        CPU Profiler 采样原理——每隔 1ms 记录调用栈，Self Time 定位真正的计算瓶颈
      </figcaption>
    </figure>
  );
}
