/**
 * <MgpNatPunchThroughDiagram>：NAT 穿透图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function MgpNatPunchThroughDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="NAT 穿透图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            NAT 穿透：STUN 打洞与 TURN 中继
          </text>

          {/* NAT 类型表格 */}
          <rect x="30" y="46" width="680" height="100" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="66" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">NAT 四种类型</text>

          <rect x="50" y="76" width="150" height="24" rx="4" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="0.8" />
          <text x="125" y="92" textAnchor="middle" fontSize="9" fill="var(--success)">Full Cone（最易）</text>

          <rect x="210" y="76" width="150" height="24" rx="4" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="0.8" />
          <text x="285" y="92" textAnchor="middle" fontSize="9" fill="var(--success)">Restricted Cone</text>

          <rect x="370" y="76" width="150" height="24" rx="4" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="445" y="92" textAnchor="middle" fontSize="9" fill="var(--warning)">Port Restricted Cone</text>

          <rect x="530" y="76" width="160" height="24" rx="4" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="610" y="92" textAnchor="middle" fontSize="9" fill="var(--danger)">Symmetric（最难）</text>

          <text x="125" y="116" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">固定公网端口</text>
          <text x="125" y="128" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">任何外部可达</text>

          <text x="285" y="116" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">固定公网端口</text>
          <text x="285" y="128" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">限联系过的 IP</text>

          <text x="445" y="116" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">固定公网端口</text>
          <text x="445" y="128" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">限联系过的 IP:端口</text>

          <text x="610" y="116" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">不同目标不同端口</text>
          <text x="610" y="128" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">打洞几乎不可能</text>

          {/* 打洞流程 */}
          <rect x="30" y="162" width="680" height="180" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" />
          <text x="370" y="182" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">UDP 打洞流程</text>

          {/* 客户端 A */}
          <rect x="50" y="196" width="100" height="50" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="100" y="216" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">客户端 A</text>
          <text x="100" y="232" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">NAT 后</text>
          <text x="100" y="242" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">192.168.1.x</text>

          {/* NAT A */}
          <text x="165" y="224" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">NAT A</text>
          <rect x="155" y="228" width="20" height="30" rx="3" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="165" y="246" textAnchor="middle" fontSize="7" fill="var(--warning)">A</text>

          {/* STUN 服务器 */}
          <rect x="320" y="196" width="100" height="50" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="370" y="216" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">STUN 服务器</text>
          <text x="370" y="232" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">公网地址</text>
          <text x="370" y="242" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">介绍人</text>

          {/* NAT B */}
          <text x="575" y="224" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">NAT B</text>
          <rect x="565" y="228" width="20" height="30" rx="3" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="575" y="246" textAnchor="middle" fontSize="7" fill="var(--warning)">B</text>

          {/* 客户端 B */}
          <rect x="590" y="196" width="100" height="50" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="640" y="216" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">客户端 B</text>
          <text x="640" y="232" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">NAT 后</text>
          <text x="640" y="242" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">10.0.0.x</text>

          {/* 步骤1: A/B 向 STUN 查询 */}
          <line x1="155" y1="260" x2="320" y2="260" stroke="var(--success)" strokeWidth="1" strokeDasharray="3" />
          <text x="237" y="256" textAnchor="middle" fontSize="8" fill="var(--success)">1. 查询公网地址</text>
          <line x1="565" y1="260" x2="420" y2="260" stroke="var(--success)" strokeWidth="1" strokeDasharray="3" />
          <text x="492" y="256" textAnchor="middle" fontSize="8" fill="var(--success)">1. 查询公网地址</text>

          {/* 步骤2: STUN 交换地址 */}
          <text x="370" y="280" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">2. STUN 交换 A 和 B 的公网地址</text>

          {/* 步骤3-4: 互相打洞 */}
          <line x1="175" y1="295" x2="565" y2="295" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="291" textAnchor="middle" fontSize="8" fill="var(--warning)">3. A &rarr; B 打洞（B 的 NAT 可能丢弃）</text>

          <line x1="565" y1="315" x2="175" y2="315" stroke="var(--success)" strokeWidth="1.2" />
          <text x="370" y="311" textAnchor="middle" fontSize="8" fill="var(--success)">4. B &rarr; A 打洞（A 的 NAT 已认识 B）</text>

          <text x="370" y="335" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--success)">5. P2P 直连建立! 后续数据 A &harr; B 直连</text>

          {/* TURN 兜底 */}
          <rect x="30" y="356" width="680" height="60" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="370" y="376" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">TURN 中继（打洞失败时兜底）</text>
          <text x="370" y="394" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">对称型 NAT 无法打洞 &rarr; 所有数据通过 TURN 服务器转发</text>
          <text x="370" y="408" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">延迟翻倍 + 消耗 TURN 带宽，生产环境 STUN 优先 + TURN 兜底</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        NAT 穿透——四种 NAT 类型、UDP 打洞流程与 TURN 中继兜底
      </figcaption>
    </figure>
  );
}
