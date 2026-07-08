/**
 * <GncLatencyCompensationDiagram>：延迟补偿——服务器回退判定与客户端前移插值时间线图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function GncLatencyCompensationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="延迟补偿回退判定与前移插值图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            延迟补偿：回退判定 + 前移插值
          </text>

          {/* 上方：服务器回退判定时间线 */}
          <rect x="20" y="48" width="700" height="180" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="370" y="68" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">服务器端回退判定（Lag Compensation）</text>

          {/* 时间轴 */}
          <line x1="50" y1="160" x2="690" y2="160" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="40" y="164" textAnchor="end" fontSize="9" fill="var(--text-secondary)">时间</text>

          {/* 玩家 A 开火时刻 */}
          <line x1="150" y1="90" x2="150" y2="180" stroke="var(--success)" strokeWidth="1.5" strokeDasharray="4,3" />
          <circle cx="150" cy="160" r="5" fill="var(--success)" />
          <text x="150" y="84" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">A 开火</text>
          <text x="150" y="196" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">t = 100ms</text>
          <text x="150" y="208" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">（A 看到的世界）</text>

          {/* 开火请求到达服务器（延迟 100ms） */}
          <line x1="350" y1="90" x2="350" y2="180" stroke="var(--warning)" strokeWidth="1.5" strokeDasharray="4,3" />
          <circle cx="350" cy="160" r="5" fill="var(--warning)" />
          <text x="350" y="84" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">请求到达服务器</text>
          <text x="350" y="196" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">t = 200ms</text>
          <text x="350" y="208" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">（当前世界）</text>

          {/* 回退箭头 */}
          <path d="M 340 130 Q 250 110 160 130" fill="none" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
          <text x="250" y="108" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">回退到开火时刻</text>

          {/* 历史快照缓冲区 */}
          <rect x="100" y="130" width="250" height="20" rx="3" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="225" y="144" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">历史快照环形缓冲区（保存近 1 秒）</text>

          {/* B 的位置变化 */}
          <text x="150" y="116" textAnchor="middle" fontSize="8" fill="var(--success)">B 在 X 位</text>
          <text x="350" y="116" textAnchor="middle" fontSize="8" fill="var(--warning)">B 已移到 Y 位</text>

          <text x="370" y="220" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">服务器不按当前状态判定，而是查缓冲区回退到 A 开火那一刻 → A 打中了他看到的目标</text>

          {/* 下方：客户端前移插值 */}
          <rect x="20" y="244" width="340" height="170" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="190" y="264" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">插值（Interpolation）</text>

          <line x1="50" y1="340" x2="330" y2="340" stroke="var(--text-tertiary)" strokeWidth="1" />

          <rect x="80" y="326" width="40" height="28" rx="4" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1" />
          <text x="100" y="340" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">S0</text>
          <rect x="180" y="326" width="40" height="28" rx="4" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1" />
          <text x="200" y="340" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">S1</text>

          <circle cx="140" cy="340" r="4" fill="var(--success)" />
          <text x="140" y="372" textAnchor="middle" fontSize="8" fill="var(--success)">渲染点</text>
          <text x="140" y="384" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">在 S0↔S1 间插值</text>

          <text x="190" y="398" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">渲染过去 100ms 的位置 → 平滑但延迟</text>
          <text x="190" y="412" textAnchor="middle" fontSize="9" fill="var(--success)">优先用插值（两个已知快照间）</text>

          <rect x="380" y="244" width="340" height="170" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="550" y="264" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">前移插值（Extrapolation）</text>

          <line x1="410" y1="340" x2="690" y2="340" stroke="var(--text-tertiary)" strokeWidth="1" />

          <rect x="440" y="326" width="40" height="28" rx="4" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1" />
          <text x="460" y="340" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">S0</text>
          <rect x="540" y="326" width="40" height="28" rx="4" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1" />
          <text x="560" y="340" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">S1</text>

          {/* 预测区域 */}
          <circle cx="620" cy="340" r="4" fill="var(--warning)" />
          <path d="M 580 340 L 620 326" stroke="var(--warning)" strokeWidth="1.5" strokeDasharray="3,3" />
          <text x="620" y="372" textAnchor="middle" fontSize="8" fill="var(--warning)">预测点</text>
          <text x="620" y="384" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">超出 S1 按速度外推</text>

          <text x="550" y="398" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">快照延迟到达 → 短时预测未来位置</text>
          <text x="550" y="412" textAnchor="middle" fontSize="9" fill="var(--warning)">风险：预测错误 → 校正瞬移</text>

          {/* defs for arrow */}
          <defs>
            <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="var(--accent)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        延迟补偿——服务器回退到开火时刻判定命中，客户端前移插值预测未来位置
      </figcaption>
    </figure>
  );
}
