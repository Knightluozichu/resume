/**
 * <MgpLearningMapDiagram>：Multiplayer Game Programming 全书学习地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function MgpLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Multiplayer Game Programming 全书学习地图图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Multiplayer Game Programming 全书学习地图
          </text>
          <text x={VIEW_W / 2} y="50" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            传输层 → 连接层 → 可靠层 → 同步层 → 总复习
          </text>

          <rect x="30" y="64" width="680" height="376" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* 第一排：传输层 */}
          <rect x="50" y="82" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="205" y="104" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">传输层</text>
          <text x="205" y="122" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">互联网协议（IP/端口/字节序）</text>
          <text x="205" y="134" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">UDP vs TCP 选型分析</text>

          <rect x="380" y="82" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="535" y="104" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">全书学习地图</text>
          <text x="535" y="122" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">四阶段递进总览</text>
          <text x="535" y="134" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">一次按键的完整网络旅程</text>

          {/* 箭头 */}
          <text x="205" y="160" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="160" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第二排：连接层 */}
          <rect x="50" y="174" width="310" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="205" y="196" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">连接层</text>
          <text x="205" y="214" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">连接管理与会话状态机</text>
          <text x="205" y="226" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">NAT 穿透（STUN/TURN/打洞）</text>

          <rect x="380" y="174" width="310" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="535" y="196" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">连接层目标</text>
          <text x="535" y="214" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能连：握手建立会话</text>
          <text x="535" y="226" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能穿：NAT 穿透端到端</text>

          <text x="205" y="252" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="252" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第三排：可靠层 */}
          <rect x="50" y="266" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="205" y="288" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">可靠层</text>
          <text x="205" y="306" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">可靠 UDP（ACK/重传/序号）</text>
          <text x="205" y="318" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">流量控制与拥塞避免（AIMD）</text>

          <rect x="380" y="266" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="535" y="288" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">可靠层目标</text>
          <text x="535" y="306" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">不丢：按需可靠重传</text>
          <text x="535" y="318" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">不堵：拥塞控制退避</text>

          <text x="205" y="344" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="344" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第四排：同步层 */}
          <rect x="50" y="358" width="310" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="205" y="380" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">同步层</text>
          <text x="205" y="398" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">客户端预测与服务器校正</text>
          <text x="205" y="410" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">实体插值与平滑渲染</text>

          <rect x="380" y="358" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="535" y="380" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">全书总复习</text>
          <text x="535" y="398" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">四层知识图谱串联</text>
          <text x="535" y="410" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">系统级工程判断力</text>

          <text x={VIEW_W / 2} y="436" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：从「能通」到「感觉流畅」的四层进阶
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Multiplayer Game Programming 全书学习地图——传输、连接、可靠、同步四阶段递进路径
      </figcaption>
    </figure>
  );
}
