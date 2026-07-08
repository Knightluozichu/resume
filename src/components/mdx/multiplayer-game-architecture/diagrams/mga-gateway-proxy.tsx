/**
 * <MgaGatewayProxyDiagram>：网关与代理层设计图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function MgaGatewayProxyDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="网关与代理层设计图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            游戏网关层：统一入口与负载均衡
          </text>

          {/* 客户端 */}
          <rect x="30" y="60" width="120" height="40" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="90" y="85" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">客户端 A</text>

          <rect x="30" y="115" width="120" height="40" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="90" y="140" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">客户端 B</text>

          <rect x="30" y="170" width="120" height="40" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="90" y="195" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">客户端 C</text>

          {/* TLS 标注 */}
          <text x="190" y="85" textAnchor="middle" fontSize="9" fill="var(--accent)">TLS</text>
          <line x1="150" y1="80" x2="230" y2="80" stroke="var(--accent)" strokeWidth="1.5" />
          <line x1="150" y1="135" x2="230" y2="135" stroke="var(--accent)" strokeWidth="1.5" />
          <line x1="150" y1="190" x2="230" y2="190" stroke="var(--accent)" strokeWidth="1.5" />

          {/* 网关层 */}
          <rect x="210" y="50" width="180" height="200" rx="10" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="300" y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">网关层</text>

          <rect x="225" y="85" width="150" height="28" rx="5" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="300" y="103" textAnchor="middle" fontSize="10" fill="var(--accent)">SSL 卸载</text>

          <rect x="225" y="120" width="150" height="28" rx="5" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="300" y="138" textAnchor="middle" fontSize="10" fill="var(--accent)">鉴权 / Session</text>

          <rect x="225" y="155" width="150" height="28" rx="5" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="300" y="173" textAnchor="middle" fontSize="10" fill="var(--accent)">一致性哈希路由</text>

          <rect x="225" y="190" width="150" height="28" rx="5" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="300" y="208" textAnchor="middle" fontSize="10" fill="var(--accent)">断线重连</text>

          <text x="300" y="237" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">明文内部通信</text>

          {/* 路由连线 */}
          <line x1="390" y1="100" x2="470" y2="80" stroke="var(--warning)" strokeWidth="1.5" />
          <polygon points="468,77 474,80 468,83" fill="var(--warning)" />
          <line x1="390" y1="140" x2="470" y2="150" stroke="var(--warning)" strokeWidth="1.5" />
          <polygon points="468,147 474,150 468,153" fill="var(--warning)" />
          <line x1="390" y1="190" x2="470" y2="220" stroke="var(--warning)" strokeWidth="1.5" />
          <polygon points="468,217 474,220 468,223" fill="var(--warning)" />

          {/* 后端服务 */}
          <rect x="470" y="60" width="120" height="40" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="530" y="78" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">大厅服</text>
          <text x="530" y="92" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">鉴权/选服</text>

          <rect x="470" y="130" width="120" height="40" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="530" y="148" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">世界服</text>
          <text x="530" y="162" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">AOI/状态</text>

          <rect x="470" y="200" width="120" height="40" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="530" y="218" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">战斗服</text>
          <text x="530" y="232" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">战斗逻辑</text>

          {/* 扩缩容标注 */}
          <rect x="470" y="260" width="120" height="40" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" strokeDasharray="4,3" />
          <text x="530" y="278" textAnchor="middle" fontSize="10" fill="var(--danger)">+ 新节点</text>
          <text x="530" y="292" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">自动扩容</text>

          {/* 底部：一致性哈希环 */}
          <rect x="30" y="320" width="340" height="110" rx="8" fill="var(--accent)" fillOpacity="0.05" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="200" y="342" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">一致性哈希路由</text>

          {/* 哈希环 */}
          <circle cx="120" cy="390" r="35" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeOpacity="0.4" />
          <circle cx="120" cy="355" r="4" fill="var(--success)" />
          <text x="120" y="348" textAnchor="middle" fontSize="7" fill="var(--success)">N1</text>
          <circle cx="150" cy="410" r="4" fill="var(--warning)" />
          <text x="158" y="416" fontSize="7" fill="var(--warning)">N2</text>
          <circle cx="90" cy="410" r="4" fill="var(--danger)" />
          <text x="75" y="416" fontSize="7" fill="var(--danger)">N3</text>

          <text x="200" y="380" fontSize="9" fill="var(--text-secondary)">按 uid 哈希路由到固定节点</text>
          <text x="200" y="395" fontSize="9" fill="var(--text-secondary)">扩缩容只影响 1/N 玩家</text>
          <text x="200" y="410" fontSize="9" fill="var(--text-secondary)">长连接有状态路由</text>

          {/* 断线重连 */}
          <rect x="390" y="320" width="320" height="110" rx="8" fill="var(--success)" fillOpacity="0.05" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="550" y="342" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">断线重连</text>

          <rect x="405" y="355" width="130" height="28" rx="5" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="0.8" />
          <text x="470" y="373" textAnchor="middle" fontSize="9" fill="var(--success)">Session ID 识别</text>

          <rect x="545" y="355" width="150" height="28" rx="5" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="0.8" />
          <text x="620" y="373" textAnchor="middle" fontSize="9" fill="var(--success)">恢复会话 + 补发</text>

          <text x="550" y="402" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">原节点存活 → 直接恢复 (3s)</text>
          <text x="550" y="418" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">原节点宕机 → 重新分配 + DB 恢复</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        游戏网关层——SSL 卸载、一致性哈希路由、断线重连的统一入口设计
      </figcaption>
    </figure>
  );
}
