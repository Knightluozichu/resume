/**
 * <NdbgFlameGraphDiagram>：火焰图可视化编码与三类性能问题图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function NdbgFlameGraphDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="火焰图可视化编码与三类性能问题图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            火焰图：宽度即热点
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            X 轴宽度 = CPU 占比 | Y 轴高度 = 调用栈深度 | 颜色无语义
          </text>

          {/* 火焰图主体 */}
          <rect x="40" y="62" width="660" height="220" rx="8" fill="var(--bg-primary)" fillOpacity="0.3" stroke="var(--border)" strokeWidth="1" />

          {/* Y轴标注 */}
          <text x="30" y="170" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)" transform="rotate(-90 30 170)">栈深</text>
          {/* X轴标注 */}
          <text x="370" y="288" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">采样次数（CPU 占比）→</text>

          {/* 栈底：main 100% */}
          <rect x="50" y="250" width="640" height="22" rx="3" fill="#e88" fillOpacity="0.3" stroke="#e88" strokeWidth="0.6" />
          <text x="60" y="265" fontSize="9" fill="var(--text-secondary)">main (100%)</text>

          {/* 第二层：handleRequest 73% + gcSweep 27% */}
          <rect x="50" y="226" width="467" height="22" rx="3" fill="#e8a" fillOpacity="0.3" stroke="#e8a" strokeWidth="0.6" />
          <text x="60" y="241" fontSize="9" fill="var(--text-secondary)">handleRequest (73%)</text>
          <rect x="519" y="226" width="171" height="22" rx="3" fill="#ae8" fillOpacity="0.3" stroke="#ae8" strokeWidth="0.6" />
          <text x="529" y="241" fontSize="9" fill="var(--text-secondary)">gcSweep (27%)</text>

          {/* 第三层：bodyParser 55% + auth 6% + handler 12% */}
          <rect x="50" y="202" width="352" height="22" rx="3" fill="#a8e" fillOpacity="0.3" stroke="#a8e" strokeWidth="0.6" />
          <text x="60" y="217" fontSize="9" fill="var(--text-secondary)">bodyParser (55%)</text>
          <rect x="404" y="202" width="38" height="22" rx="3" fill="#8ea" fillOpacity="0.3" stroke="#8ea" strokeWidth="0.6" />
          <text x="411" y="217" fontSize="8" fill="var(--text-secondary)">auth</text>
          <rect x="444" y="202" width="73" height="22" rx="3" fill="#ea8" fillOpacity="0.3" stroke="#ea8" strokeWidth="0.6" />
          <text x="451" y="217" fontSize="8" fill="var(--text-secondary)">handler</text>

          {/* 第四层（栈顶）：JSON.parse 50%（宽栈顶！）+ db.query 10% */}
          <rect x="50" y="178" width="320" height="22" rx="3" fill="#e55" fillOpacity="0.35" stroke="#e55" strokeWidth="1" />
          <text x="60" y="193" fontSize="9" fontWeight="600" fill="var(--danger)">JSON.parse (50%) &uarr; 宽栈顶</text>
          <rect x="444" y="178" width="64" height="22" rx="3" fill="#8ae" fillOpacity="0.3" stroke="#8ae" strokeWidth="0.6" />
          <text x="451" y="193" fontSize="8" fill="var(--text-secondary)">db.query</text>

          {/* 第五层：JSON.parse 内部 */}
          <rect x="50" y="154" width="280" height="22" rx="3" fill="#e66" fillOpacity="0.3" stroke="#e66" strokeWidth="0.6" />
          <text x="60" y="169" fontSize="9" fill="var(--text-secondary)">parseValue (44%)</text>

          {/* 标注三类问题 */}
          <line x1="370" y1="176" x2="370" y2="140" stroke="var(--danger)" strokeWidth="1" strokeDasharray="3 2" />
          <text x="370" y="134" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">① 宽栈顶 = CPU 热点</text>
          <text x="370" y="122" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">JSON.parse 占 50%</text>

          <line x1="225" y1="224" x2="225" y2="110" stroke="var(--warning)" strokeWidth="1" strokeDasharray="3 2" />
          <text x="225" y="104" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">② 宽中段 = 库开销</text>
          <text x="225" y="92" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">bodyParser 占 55%</text>

          <line x1="605" y1="248" x2="605" y2="300" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 2" />
          <text x="605" y="314" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">③ GC 开销</text>
          <text x="605" y="326" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">gcSweep 27%</text>

          {/* 底部：工具对比 */}
          <rect x="40" y="340" width="320" height="70" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" />
          <text x="55" y="358" fontSize="11" fontWeight="600" fill="var(--success)">0x —— 轻量快速</text>
          <text x="55" y="374" fontSize="9" fill="var(--text-secondary)">0x server.js → flamegraph.html</text>
          <text x="55" y="388" fontSize="9" fill="var(--text-tertiary)">一条命令生成火焰图</text>
          <text x="55" y="402" fontSize="9" fill="var(--text-tertiary)">适合：开发环境快速排查</text>

          <rect x="380" y="340" width="320" height="70" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" />
          <text x="395" y="358" fontSize="11" fontWeight="600" fill="var(--accent)">clinic.js flame —— 综合诊断</text>
          <text x="395" y="374" fontSize="9" fill="var(--text-secondary)">clinic flame -- node server.js</text>
          <text x="395" y="388" fontSize="9" fill="var(--text-tertiary)">火焰图 + CPU/事件循环/内存趋势</text>
          <text x="395" y="402" fontSize="9" fill="var(--text-tertiary)">适合：多维度综合诊断</text>

          <text x={VIEW_W / 2} y="428" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：颜色无语义，宽度即热点 | 栈顶最宽帧 = Self Time 瓶颈
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        火焰图可视化——宽度即 CPU 占比，三类典型问题：宽栈顶、宽中段、GC 开销
      </figcaption>
    </figure>
  );
}
