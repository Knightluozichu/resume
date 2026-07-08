/**
 * <LopFirewallSecurityDiagram>：防火墙安全——iptables/ufw 包过滤机制图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function LopFirewallSecurityDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Linux防火墙iptables与ufw包过滤机制图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            防火墙安全：Netfilter 钩子与规则链
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            数据包 &gt; 钩子点 &gt; 规则链匹配 &gt; 动作(ACCEPT/DROP)
          </text>

          {/* 数据包路径 */}
          <rect x="40" y="70" width="660" height="130" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="60" y="94" fontSize="13" fontWeight="600" fill="var(--danger)">数据包经过 Netfilter 钩子点</text>

          <rect x="60" y="108" width="80" height="36" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="100" y="130" textAnchor="middle" fontSize="10" fill="var(--warning)">PREROUTING</text>

          <text x="155" y="130" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="175" y="108" width="80" height="36" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="215" y="130" textAnchor="middle" fontSize="10" fill="var(--accent)">INPUT</text>

          <text x="270" y="130" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="290" y="108" width="80" height="36" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="330" y="130" textAnchor="middle" fontSize="10" fill="var(--success)">本机进程</text>

          <text x="385" y="130" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="405" y="108" width="80" height="36" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="445" y="130" textAnchor="middle" fontSize="10" fill="var(--accent)">OUTPUT</text>

          <text x="500" y="130" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="520" y="108" width="100" height="36" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="570" y="130" textAnchor="middle" fontSize="10" fill="var(--warning)">POSTROUTING</text>

          <text x="640" y="130" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x="670" y="130" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">出网</text>

          <text x="60" y="170" fontSize="10" fill="var(--text-tertiary)">入站包经 PREROUTING→INPUT 到本机；出站包经 OUTPUT→POSTROUTING 离开</text>
          <text x="60" y="188" fontSize="10" fill="var(--text-tertiary)">转发包经 PREROUTING→FORWARD→POSTROUTING（路由器场景）</text>

          {/* 规则匹配 */}
          <rect x="40" y="220" width="320" height="190" rx="10" fill="var(--bg-secondary)" fillOpacity="0.5" stroke="var(--border)" strokeWidth="1" />
          <text x="60" y="244" fontSize="13" fontWeight="600" fill="var(--text-primary)">iptables 规则匹配</text>
          <text x="60" y="266" fontSize="10" fill="var(--success)" fontFamily="monospace">iptables -A INPUT -p tcp</text>
          <text x="60" y="282" fontSize="10" fill="var(--success)" fontFamily="monospace">  --dport 22 -j ACCEPT</text>
          <text x="60" y="302" fontSize="10" fill="var(--danger)" fontFamily="monospace">iptables -A INPUT -j DROP</text>
          <text x="60" y="322" fontSize="10" fill="var(--text-tertiary)">规则从上到下匹配，命中即停</text>
          <text x="60" y="340" fontSize="10" fill="var(--text-tertiary)">-p 协议  --dport 目标端口</text>
          <text x="60" y="358" fontSize="10" fill="var(--text-tertiary)">-s 源IP   -j 动作(ACCEPT/DROP)</text>
          <text x="60" y="378" fontSize="10" fill="var(--warning)">默认策略：无规则匹配时执行</text>
          <text x="60" y="396" fontSize="10" fill="var(--warning)">iptables -P INPUT DROP</text>

          {/* ufw 简化 */}
          <rect x="380" y="220" width="320" height="190" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="400" y="244" fontSize="13" fontWeight="600" fill="var(--warning)">ufw 简化前端（Ubuntu）</text>
          <text x="400" y="268" fontSize="10" fill="var(--success)" fontFamily="monospace">ufw enable</text>
          <text x="400" y="284" fontSize="10" fill="var(--text-tertiary)">启用防火墙</text>
          <text x="400" y="306" fontSize="10" fill="var(--success)" fontFamily="monospace">ufw allow 22/tcp</text>
          <text x="400" y="322" fontSize="10" fill="var(--text-tertiary)">放行SSH</text>
          <text x="400" y="344" fontSize="10" fill="var(--success)" fontFamily="monospace">ufw allow 80/tcp</text>
          <text x="400" y="360" fontSize="10" fill="var(--text-tertiary)">放行HTTP</text>
          <text x="400" y="382" fontSize="10" fill="var(--danger)" fontFamily="monospace">ufw deny 3306</text>
          <text x="400" y="398" fontSize="10" fill="var(--text-tertiary)">拒绝MySQL外网访问</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        防火墙安全图解——Netfilter钩子点、iptables规则链匹配与ufw简化前端
      </figcaption>
    </figure>
  );
}
