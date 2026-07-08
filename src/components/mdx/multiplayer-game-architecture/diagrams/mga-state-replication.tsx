/**
 * <MgaStateReplicationDiagram>：状态复制模型图解（客户端预测 + 服务器校正）。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function MgaStateReplicationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="状态复制模型图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            权威服务器状态复制：客户端预测 + 服务器校正
          </text>

          {/* 客户端区域 */}
          <rect x="30" y="50" width="280" height="370" rx="10" fill="var(--success)" fillOpacity="0.05" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="170" y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">客户端</text>

          {/* 服务器区域 */}
          <rect x="430" y="50" width="280" height="370" rx="10" fill="var(--warning)" fillOpacity="0.05" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="570" y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">权威服务器</text>

          {/* 步骤 1: 采集输入 */}
          <rect x="50" y="92" width="240" height="40" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="170" y="108" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">1. 采集输入</text>
          <text x="170" y="123" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">玩家按下方向键</text>

          {/* 步骤 2: 本地预测 */}
          <rect x="50" y="144" width="240" height="40" rx="6" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1.2" />
          <text x="170" y="160" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">2. 本地预测模拟</text>
          <text x="170" y="175" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">立即移动角色（不等服务器）</text>

          {/* 箭头 2→3 */}
          <text x="370" y="172" textAnchor="middle" fontSize="10" fill="var(--accent)">3. 发送输入</text>
          <line x1="290" y1="164" x2="430" y2="164" stroke="var(--accent)" strokeWidth="2" />
          <polygon points="428,161 434,164 428,167" fill="var(--accent)" />

          {/* 步骤 4: 服务器权威计算 */}
          <rect x="450" y="144" width="240" height="40" rx="6" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="570" y="160" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">4. 服务器权威计算</text>
          <text x="570" y="175" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">校验 + 碰撞 + 新位置</text>

          {/* 步骤 5: 返回确认 */}
          <rect x="450" y="196" width="240" height="40" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="570" y="212" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">5. 返回权威位置 + ACK</text>
          <text x="570" y="227" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">serverPos + lastAckSeq</text>

          {/* 箭头 5→6 */}
          <text x="370" y="224" textAnchor="middle" fontSize="10" fill="var(--accent)">6. 校正</text>
          <line x1="430" y1="216" x2="290" y2="216" stroke="var(--accent)" strokeWidth="2" />
          <polygon points="292,213 286,216 292,219" fill="var(--accent)" />

          {/* 步骤 7: 丢弃已确认输入 */}
          <rect x="50" y="196" width="240" height="40" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="170" y="212" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">7. 丢弃已确认输入</text>
          <text x="170" y="227" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">从 serverPos 重模拟未确认</text>

          {/* 步骤 8: 校正判断 */}
          <rect x="50" y="248" width="240" height="56" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="170" y="268" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">8. 校正判断</text>
          <text x="170" y="284" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">偏差小 → 忽略（预测正确）</text>
          <text x="170" y="297" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">偏差大 → snap 瞬移</text>

          {/* 远程玩家插值区 */}
          <rect x="50" y="320" width="240" height="80" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="170" y="340" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">远程玩家：快照插值</text>
          <text x="170" y="358" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">缓存服务器快照 (20Hz)</text>
          <text x="170" y="372" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">延迟 100ms 渲染</text>
          <text x="170" y="386" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">在快照间线性插值</text>

          {/* 服务器侧广播 */}
          <rect x="450" y="320" width="240" height="80" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="570" y="340" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">服务器：定期广播快照</text>
          <text x="570" y="358" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">20Hz 下发实体状态</text>
          <text x="570" y="372" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">AOI 过滤可见实体</text>
          <text x="570" y="386" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">增量压缩 (Delta)</text>

          {/* 广播箭头 */}
          <line x1="430" y1="360" x2="290" y2="360" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="4,3" />
          <polygon points="292,357 286,360 292,363" fill="var(--accent)" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        权威服务器状态复制——客户端预测+服务器校正（本地玩家）与快照插值（远程玩家）
      </figcaption>
    </figure>
  );
}
