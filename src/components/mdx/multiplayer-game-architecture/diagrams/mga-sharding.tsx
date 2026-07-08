/**
 * <MgaShardingDiagram>：场景分片与跨片交互图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function MgaShardingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="场景分片与跨片交互图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            场景分片：大世界切割与边界迁移
          </text>

          {/* 分片 A */}
          <rect x="30" y="50" width="220" height="280" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.5" />
          <text x="140" y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">分片 A</text>
          <text x="140" y="90" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Game Server 1</text>

          {/* A 区实体 */}
          <circle cx="80" cy="130" r="5" fill="var(--success)" />
          <circle cx="140" cy="150" r="5" fill="var(--success)" />
          <circle cx="100" cy="200" r="5" fill="var(--success)" />
          <circle cx="170" cy="230" r="5" fill="var(--success)" />
          <circle cx="200" cy="170" r="5" fill="var(--success)" />
          <text x="80" y="120" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">P1</text>
          <text x="140" y="140" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">P2</text>

          {/* 迁移中的玩家 */}
          <circle cx="240" cy="280" r="7" fill="var(--warning)" stroke="var(--warning)" strokeWidth="2" />
          <text x="240" y="270" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--warning)">P3 →</text>

          {/* 分片 B */}
          <rect x="270" y="50" width="220" height="280" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="380" y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">分片 B</text>
          <text x="380" y="90" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Game Server 2</text>

          {/* B 区实体 */}
          <circle cx="310" cy="140" r="5" fill="var(--accent)" />
          <circle cx="380" cy="170" r="5" fill="var(--accent)" />
          <circle cx="340" cy="220" r="5" fill="var(--accent)" />
          <circle cx="420" cy="250" r="5" fill="var(--accent)" />
          <circle cx="450" cy="130" r="5" fill="var(--accent)" />

          {/* 分片 C */}
          <rect x="510" y="50" width="200" height="280" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.5" />
          <text x="610" y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">分片 C</text>
          <text x="610" y="90" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Game Server 3</text>

          {/* C 区实体 */}
          <circle cx="550" cy="150" r="5" fill="var(--warning)" />
          <circle cx="620" cy="180" r="5" fill="var(--warning)" />
          <circle cx="580" cy="230" r="5" fill="var(--warning)" />
          <circle cx="660" cy="260" r="5" fill="var(--warning)" />

          {/* 边界迁移标注 */}
          <rect x="245" y="245" width="30" height="60" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" strokeDasharray="3,2" />
          <text x="260" y="340" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--danger)">边界区</text>

          {/* 迁移箭头 */}
          <line x1="245" y1="280" x2="275" y2="280" stroke="var(--warning)" strokeWidth="2" strokeDasharray="5,3" />
          <polygon points="273,277 279,280 273,283" fill="var(--warning)" />

          {/* 跨片技能示意 */}
          <circle cx="245" cy="140" r="40" fill="none" stroke="var(--danger)" strokeWidth="1.5" strokeDasharray="4,3" strokeOpacity="0.5" />
          <circle cx="245" cy="140" r="3" fill="var(--danger)" />
          <text x="245" y="132" textAnchor="middle" fontSize="8" fill="var(--danger)">技能</text>
          <text x="245" y="190" textAnchor="middle" fontSize="8" fill="var(--danger)">跨片范围</text>

          {/* 底部流程 */}
          <rect x="30" y="350" width="680" height="80" rx="8" fill="var(--accent)" fillOpacity="0.05" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />

          <text x="50" y="372" fontSize="10" fontWeight="600" fill="var(--accent)">边界迁移流程（两阶段提交）：</text>

          <rect x="50" y="382" width="120" height="36" rx="5" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="0.8" />
          <text x="110" y="399" textAnchor="middle" fontSize="9" fill="var(--success)">1. 冻结玩家</text>
          <text x="110" y="411" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">序列化状态</text>

          <text x="178" y="402" fontSize="12" fill="var(--text-tertiary)">→</text>

          <rect x="195" y="382" width="120" height="36" rx="5" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="255" y="399" textAnchor="middle" fontSize="9" fill="var(--accent)">2. 发送到目标</text>
          <text x="255" y="411" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">目标分片接收</text>

          <text x="323" y="402" fontSize="12" fill="var(--text-tertiary)">→</text>

          <rect x="340" y="382" width="120" height="36" rx="5" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="400" y="399" textAnchor="middle" fontSize="9" fill="var(--warning)">3. 重定向连接</text>
          <text x="400" y="411" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">网关切换</text>

          <text x="468" y="402" fontSize="12" fill="var(--text-tertiary)">→</text>

          <rect x="485" y="382" width="120" height="36" rx="5" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="545" y="399" textAnchor="middle" fontSize="9" fill="var(--danger)">4. 清理 + 广播</text>
          <text x="545" y="411" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">源删除/目进入</text>

          <text x="613" y="402" fontSize="12" fill="var(--text-tertiary)">→</text>

          <rect x="630" y="382" width="70" height="36" rx="5" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="0.8" />
          <text x="665" y="405" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--success)">完成</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        场景分片与边界迁移——大世界水平扩展、两阶段提交保证状态不丢
      </figcaption>
    </figure>
  );
}
