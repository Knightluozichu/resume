import type { ReviewQuestion } from "./types";

export const lopFirewallSecurityQuestions: ReviewQuestion[] = [
  {
    id: "lop-firewall-security-1",
    chapter: "lop-firewall-security",
    level: 2,
    question: "iptables 中的五条链（hook）分别在哪里拦截数据包？",
    answer:
      "五条链对应 Netfilter 的五个钩子点：①PREROUTING——数据包刚进入网卡、路由判断之前；②INPUT——数据包目的地是本机、即将交给本地进程之前；③FORWARD——数据包目的地非本机、需要转发到其他接口时；④OUTPUT——本机进程产生的数据包、路由判断之后发出之前；⑤POSTROUTING——数据包即将离开网卡之前。入站流程：PREROUTING→INPUT→本机进程。出站流程：本机进程→OUTPUT→POSTROUTING。转发流程：PREROUTING→FORWARD→POSTROUTING。",
    tags: ["iptables", "Netfilter"],
  },
  {
    id: "lop-firewall-security-2",
    chapter: "lop-firewall-security",
    level: 2,
    question: "ufw 和 iptables 的关系是什么？为什么 Ubuntu 推荐用 ufw？",
    answer:
      "ufw（Uncomplicated Firewall）是 iptables 的高级前端，底层仍然调用 iptables/netfilter。ufw 把复杂的 iptables 规则简化为直观命令：`ufw allow 22/tcp` 等价于编写多条 iptables 规则（允许入站 TCP 22 端口 + 允许已建立连接的回包）。Ubuntu 推荐用 ufw 的原因：①语法简单——运维人员不易出错；②默认策略合理——启用后默认拒绝入站、允许出站（白名单模式）；③够用——大多数服务器场景只需要开放/关闭端口。复杂场景（如 NAT、端口转发、QoS）仍需直接写 iptables 规则或用 nftables。",
    tags: ["ufw", "iptables"],
  },
  {
    id: "lop-firewall-security-3",
    chapter: "lop-firewall-security",
    level: 3,
    question: "`iptables -A INPUT -p tcp --dport 22 -j ACCEPT` 各参数的含义是什么？规则如何匹配？",
    answer:
      "`-A INPUT` 追加(Append)规则到 INPUT 链末尾；`-p tcp` 匹配协议为 TCP；`--dport 22` 匹配目标端口为 22（SSH）；`-j ACCEPT` 匹配后执行动作 ACCEPT（放行）。规则匹配机制：数据包进入 INPUT 链后，从链顶到链底逐条比对规则，第一条匹配的规则执行其动作（ACCEPT/DROP/REJECT），命中即停止。如果所有规则都不匹配，执行链的默认策略（`iptables -P INPUT DROP` 设置默认拒绝）。因此规则顺序至关重要：放行规则要在拒绝规则之前。",
    tags: ["iptables", "规则匹配"],
  },
  {
    id: "lop-firewall-security-4",
    chapter: "lop-firewall-security",
    level: 4,
    question: "防火墙的「默认拒绝」和「默认放行」策略有什么区别？为什么生产环境要用默认拒绝？",
    answer:
      "默认拒绝（default deny）：防火墙默认拒绝所有入站流量，只放行显式允许的端口/服务（白名单）。默认放行（default allow）：默认允许所有流量，只拒绝显式禁止的（黑名单）。生产环境必须用默认拒绝，原因：①新装的服务（如 Redis、MySQL）默认监听 0.0.0.0，如果默认放行则暴露到公网造成安全隐患；②白名单只开需要的端口，攻击面最小；②符合最小权限原则——只允许必要流量。ufw 启用时 `ufw default deny incoming` 默认拒绝入站，然后 `ufw allow 22` 逐个放行。iptables 则 `iptables -P INPUT DROP` 设置默认 DROP。",
    tags: ["默认拒绝", "安全策略"],
  },
];
