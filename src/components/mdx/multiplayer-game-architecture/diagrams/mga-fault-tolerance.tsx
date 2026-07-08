/**
 * <MgaFaultToleranceDiagram>：容错与灾备图解（热备切换 + 一致性）。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function MgaFaultToleranceDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="容错与灾备图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            容错与灾备：热备切换 + 状态回滚
          </text>

          {/* 主节点 */}
          <rect x="50" y="56" width="200" height="100" rx="10" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.5" />
          <text x="150" y="78" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">主节点 (Primary)</text>
          <text x="150" y="98" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">处理所有请求</text>
          <text x="150" y="116" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">持有权威状态</text>
          <text x="150" y="138" textAnchor="middle" fontSize="9" fill="var(--success)">持有租约 (Lease)</text>

          {/* 状态同步 */}
          <line x1="250" y1="100" x2="350" y2="100" stroke="var(--accent)" strokeWidth="2" strokeDasharray="5,3" />
          <polygon points="348,97 354,100 348,103" fill="var(--accent)" />
          <text x="300" y="92" textAnchor="middle" fontSize="9" fill="var(--accent)">日志复制</text>
          <text x="300" y="114" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">WAL 同步</text>

          {/* 备节点 */}
          <rect x="350" y="56" width="200" height="100" rx="10" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.5" />
          <text x="450" y="78" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">备节点 (Replica)</text>
          <text x="450" y="98" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">实时同步状态</text>
          <text x="450" y="116" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">待命等待切换</text>
          <text x="450" y="138" textAnchor="middle" fontSize="9" fill="var(--warning)">心跳检测主节点</text>

          {/* 故障场景 */}
          <rect x="50" y="180" width="640" height="100" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="370" y="202" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--danger)">故障场景：主节点宕机</text>

          <rect x="70" y="214" width="130" height="50" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" />
          <text x="135" y="234" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">1. 心跳超时</text>
          <text x="135" y="250" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">备节点检测到</text>

          <text x="208" y="242" fontSize="14" fill="var(--text-tertiary)">→</text>

          <rect x="225" y="214" width="130" height="50" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="290" y="234" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">2. 获取租约</text>
          <text x="290" y="250" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">防脑裂 (Quorum)</text>

          <text x="363" y="242" fontSize="14" fill="var(--text-tertiary)">→</text>

          <rect x="380" y="214" width="130" height="50" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="445" y="234" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">3. WAL 回放</text>
          <text x="445" y="250" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">恢复未完成操作</text>

          <text x="518" y="242" fontSize="14" fill="var(--text-tertiary)">→</text>

          <rect x="535" y="214" width="140" height="50" rx="6" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1" />
          <text x="605" y="234" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">4. 提升为主</text>
          <text x="605" y="250" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">接管连接 RTO&lt;10s</text>

          {/* 一致性模型对比 */}
          <rect x="50" y="300" width="310" height="120" rx="8" fill="var(--success)" fillOpacity="0.05" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="205" y="322" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">最终一致性</text>

          <text x="70" y="344" fontSize="9" fill="var(--text-secondary)">允许短暂不一致</text>
          <text x="70" y="360" fontSize="9" fill="var(--text-secondary)">延迟低、性能好</text>
          <text x="70" y="380" fontSize="9" fill="var(--text-secondary)">适合：位置/排行榜</text>
          <text x="70" y="396" fontSize="9" fill="var(--text-secondary)">       AOI/广播</text>
          <text x="70" y="414" fontSize="9" fill="var(--success)">RPO: 数秒级</text>

          <rect x="380" y="300" width="310" height="120" rx="8" fill="var(--danger)" fillOpacity="0.05" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="535" y="322" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">强一致性</text>

          <text x="400" y="344" fontSize="9" fill="var(--text-secondary)">所有副本同步确认</text>
          <text x="400" y="360" fontSize="9" fill="var(--text-secondary)">延迟高、保证原子</text>
          <text x="400" y="380" fontSize="9" fill="var(--text-secondary)">适合：充值/交易</text>
          <text x="400" y="396" fontSize="9" fill="var(--text-secondary)">       装备强化/TCC</text>
          <text x="400" y="414" fontSize="9" fill="var(--success)">RPO: 0 (不丢数据)</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        容错与灾备——热备切换（心跳→租约→WAL回放→提升）+ 最终/强一致性对比
      </figcaption>
    </figure>
  );
}
