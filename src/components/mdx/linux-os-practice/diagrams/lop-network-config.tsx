/**
 * <LopNetworkConfigDiagram>：网络配置——IP/路由/netplan 机制图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function LopNetworkConfigDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Linux网络配置IP与netplan机制图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            网络配置：IP地址、路由与 netplan
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            网卡接口 &gt; IP分配 &gt; 路由表 &gt; DNS解析
          </text>

          {/* 网络分层模型 */}
          <rect x="40" y="70" width="200" height="100" rx="10" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="140" y="94" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">网络接口</text>
          <text x="140" y="116" textAnchor="middle" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">ip link show</text>
          <text x="140" y="134" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">eth0 / wlan0 / lo</text>
          <text x="140" y="152" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">数据链路层 MAC 地址</text>

          <rect x="270" y="70" width="200" height="100" rx="10" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="94" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">IP 地址</text>
          <text x="370" y="116" textAnchor="middle" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">ip addr show</text>
          <text x="370" y="134" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">IPv4 / IPv6</text>
          <text x="370" y="152" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">网络层 逻辑地址</text>

          <rect x="500" y="70" width="200" height="100" rx="10" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="600" y="94" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">路由表</text>
          <text x="600" y="116" textAnchor="middle" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">ip route show</text>
          <text x="600" y="134" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">默认网关 default via</text>
          <text x="600" y="152" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">决定数据包去向</text>

          {/* 数据包流向 */}
          <rect x="40" y="190" width="660" height="90" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="60" y="214" fontSize="13" fontWeight="600" fill="var(--success)">数据包流向：本机 &gt; 网关 &gt; 互联网</text>

          <rect x="60" y="228" width="110" height="34" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="115" y="250" textAnchor="middle" fontSize="10" fill="var(--warning)">本机 192.168.1.10</text>

          <text x="185" y="250" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="205" y="228" width="110" height="34" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="260" y="250" textAnchor="middle" fontSize="10" fill="var(--accent)">网关 192.168.1.1</text>

          <text x="330" y="250" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="350" y="228" width="110" height="34" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="405" y="250" textAnchor="middle" fontSize="10" fill="var(--danger)">DNS解析域名</text>

          <text x="475" y="250" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="495" y="228" width="110" height="34" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="550" y="250" textAnchor="middle" fontSize="10" fill="var(--success)">目标服务器</text>

          <text x="630" y="250" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x="665" y="250" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">done</text>

          <text x="60" y="272" fontSize="10" fill="var(--text-tertiary)">路由表查找：目标IP在子网内直接交付，否则发给默认网关</text>

          {/* netplan 配置 */}
          <rect x="40" y="300" width="320" height="120" rx="10" fill="var(--bg-secondary)" fillOpacity="0.5" stroke="var(--border)" strokeWidth="1" />
          <text x="60" y="324" fontSize="13" fontWeight="600" fill="var(--text-primary)">netplan 配置（Ubuntu）</text>
          <text x="60" y="346" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">/etc/netplan/01-net.yaml</text>
          <text x="60" y="364" fontSize="10" fill="var(--success)" fontFamily="monospace">ethernets:</text>
          <text x="60" y="380" fontSize="10" fill="var(--success)" fontFamily="monospace">  eth0:</text>
          <text x="60" y="396" fontSize="10" fill="var(--success)" fontFamily="monospace">    addresses: [192.168.1.10/24]</text>
          <text x="60" y="412" fontSize="10" fill="var(--success)" fontFamily="monospace">    gateway4: 192.168.1.1</text>

          {/* 传统配置 */}
          <rect x="380" y="300" width="320" height="120" rx="10" fill="var(--bg-secondary)" fillOpacity="0.5" stroke="var(--border)" strokeWidth="1" />
          <text x="400" y="324" fontSize="13" fontWeight="600" fill="var(--text-primary)">传统命令（临时生效）</text>
          <text x="400" y="346" fontSize="10" fill="var(--accent)" fontFamily="monospace">ip addr add 192.168.1.10/24</text>
          <text x="400" y="364" fontSize="10" fill="var(--accent)" fontFamily="monospace">    dev eth0</text>
          <text x="400" y="382" fontSize="10" fill="var(--accent)" fontFamily="monospace">ip route add default via</text>
          <text x="400" y="398" fontSize="10" fill="var(--accent)" fontFamily="monospace">    192.168.1.1</text>
          <text x="400" y="416" fontSize="10" fill="var(--text-tertiary)">netplan apply 使配置永久生效</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        网络配置图解——接口、IP地址、路由表、netplan持久化配置
      </figcaption>
    </figure>
  );
}
