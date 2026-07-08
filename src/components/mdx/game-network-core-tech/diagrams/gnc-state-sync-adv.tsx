/**
 * <GncStateSyncAdvDiagram>：状态同步进阶——快照下发、缓冲区插值与预测校正图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function GncStateSyncAdvDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="状态同步快照插值与预测校正图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            状态同步：快照下发 + 插值渲染 + 预测校正
          </text>

          {/* 服务器快照下发时间线 */}
          <text x="40" y="60" fontSize="12" fontWeight="600" fill="var(--accent)">服务器 20Hz 下发快照</text>
          <rect x="40" y="68" width="50" height="28" rx="5" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="65" y="86" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">S0</text>
          <rect x="120" y="68" width="50" height="28" rx="5" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="145" y="86" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">S1</text>
          <rect x="200" y="68" width="50" height="28" rx="5" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="225" y="86" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">S2</text>
          <rect x="280" y="68" width="50" height="28" rx="5" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="305" y="86" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">S3</text>

          <text x="365" y="86" fontSize="9" fill="var(--text-tertiary)">每 50ms 一个快照</text>

          {/* 客户端缓冲区 */}
          <rect x="20" y="110" width="700" height="130" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="370" y="130" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">客户端快照缓冲区 + 插值渲染</text>

          {/* 时间轴 */}
          <line x1="50" y1="200" x2="690" y2="200" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="40" y="204" textAnchor="end" fontSize="9" fill="var(--text-secondary)">时间</text>

          {/* 快照到达位置 */}
          <rect x="80" y="186" width="40" height="28" rx="4" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1" />
          <text x="100" y="200" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">S0</text>
          <text x="100" y="228" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">t=0</text>

          <rect x="200" y="186" width="40" height="28" rx="4" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1" />
          <text x="220" y="200" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">S1</text>
          <text x="220" y="228" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">t=50</text>

          <rect x="320" y="186" width="40" height="28" rx="4" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1" />
          <text x="340" y="200" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">S2</text>
          <text x="340" y="228" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">t=100</text>

          <rect x="440" y="186" width="40" height="28" rx="4" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1" />
          <text x="460" y="200" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">S3</text>
          <text x="460" y="228" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">t=150</text>

          {/* 渲染点（插值延迟 100ms） */}
          <line x1="280" y1="178" x2="280" y2="234" stroke="var(--success)" strokeWidth="1.5" strokeDasharray="4,3" />
          <circle cx="280" cy="200" r="5" fill="var(--success)" />
          <text x="280" y="170" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--success)">渲染时刻</text>
          <text x="280" y="248" textAnchor="middle" fontSize="8" fill="var(--success)">renderTime = t - 100ms</text>

          {/* 插值箭头 */}
          <text x="180" y="200" textAnchor="middle" fontSize="12" fill="var(--success)">← 插值 →</text>
          <text x="390" y="165" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">在 S1 与 S2 之间线性插值（lerp/slerp）</text>

          <text x="370" y="270" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">插值延迟 100ms：用恒定小延迟换取渲染平滑（手里始终有前后两个快照）</text>

          {/* 客户端预测校正 */}
          <rect x="20" y="290" width="340" height="128" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="190" y="310" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">客户端预测（本地玩家）</text>

          <rect x="40" y="322" width="130" height="34" rx="5" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="105" y="338" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">按键 → 立即本地模拟</text>
          <text x="105" y="350" textAnchor="middle" fontSize="9" fill="var(--success)">零延迟响应</text>

          <text x="185" y="340" textAnchor="middle" fontSize="12" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="210" y="322" width="130" height="34" rx="5" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="275" y="338" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">服务器权威快照到达</text>
          <text x="275" y="350" textAnchor="middle" fontSize="9" fill="var(--success)">校正偏差</text>

          <text x="190" y="380" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">小偏差 → 插值平滑过渡</text>
          <text x="190" y="396" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">大偏差 → 直接跳变</text>
          <text x="190" y="412" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">预测正确率越高，可见校正越少</text>

          {/* 远程玩家插值 */}
          <rect x="380" y="290" width="340" height="128" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="550" y="310" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">远程玩家渲染（插值）</text>

          <rect x="400" y="322" width="130" height="34" rx="5" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="465" y="338" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">收到快照 S0 S1</text>
          <text x="465" y="350" textAnchor="middle" fontSize="9" fill="var(--accent)">存入缓冲区</text>

          <text x="545" y="340" textAnchor="middle" fontSize="12" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="570" y="322" width="130" height="34" rx="5" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="635" y="338" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">在 S0↔S1 间插值</text>
          <text x="635" y="350" textAnchor="middle" fontSize="9" fill="var(--accent)">延迟 100ms 渲染</text>

          <text x="550" y="380" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">不预测远程玩家（无法知道输入）</text>
          <text x="550" y="396" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">只插值，保证平滑</text>
          <text x="550" y="412" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">快照延迟到达 → 可选前移外推</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        状态同步进阶——快照缓冲区插值渲染与客户端预测校正机制
      </figcaption>
    </figure>
  );
}
