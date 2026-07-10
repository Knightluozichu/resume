import type { ReviewQuestion } from "./types";

export const isnFirewallSecurityQuestions: ReviewQuestion[] = [
  {
    id: "isn-fs-1",
    chapter: "isn-firewall-security",
    level: 1,
    question: `包过滤防火墙和状态检测防火墙的核心区别是什么？`,
    answer: `包过滤防火墙逐个检查每个数据包的IP/端口/协议，不管这个包属于哪个连接，无法防止伪造包注入。状态检测防火墙维护连接状态表，知道每个包属于哪个TCP连接及其状态（SYN-SENT/ESTABLISHED等），只放行属于合法连接的包，能防止伪造包注入已建立连接。状态检测比包过滤更安全，性能优于应用层代理（不需要完整解析报文）。iptables的conntrack模块就是状态检测实现。`,
    tags: ["包过滤", "状态检测", "防火墙对比"],
  },
  {
    id: "isn-fs-2",
    chapter: "isn-firewall-security",
    level: 2,
    question: `ACL的安全原则是什么？规则匹配的顺序是什么？`,
    answer: `ACL的安全原则是「默认拒绝（Default Deny）」——最后一条规则永远是「拒绝所有」，只明确放行需要的流量。这比「默认允许」安全得多——忘记拒绝的端口不会被暴露。规则匹配顺序是从上到下首次匹配生效——流量依次与每条规则比较，第一条匹配的规则决定动作（允许或拒绝），后续规则不再检查。iptables、云安全组、AWS NACL都遵循这个原则。`,
    tags: ["ACL", "默认拒绝", "规则匹配"],
  },
  {
    id: "isn-fs-3",
    chapter: "isn-firewall-security",
    level: 3,
    question: `WAF防护哪些Web攻击？它和传统防火墙是什么关系？`,
    answer: `WAF防护HTTP应用层攻击：①SQL注入——在输入中嵌入SQL语句，WAF通过关键字/模式匹配检测 ②XSS——注入恶意JavaScript脚本，WAF检测script标签 ③CC攻击——大量合法请求压垮服务器，WAF通过频率/行为分析 ④路径遍历——访问../../etc/passwd等，WAF检测路径模式。WAF和传统防火墙互补关系：传统防火墙看IP/端口——「这个IP能访问80端口吗」，不关心HTTP内容；WAF看HTTP内容——「这个请求是不是SQL注入/XSS」。生产环境通常传统防火墙（安全组/iptables）+ WAF（Cloudflare/阿里WAF）组合使用——前者挡网络层攻击，后者挡应用层攻击。`,
    tags: ["WAF", "SQL注入", "XSS", "传统防火墙"],
  },
  {
    id: "isn-fs-4",
    chapter: "isn-firewall-security",
    level: 4,
    question: `DDoS的三种攻击类型及防御方式是什么？SYN Cookie如何防御SYN Flood？`,
    answer: `DDoS三种攻击类型及防御：①流量型（L3/L4）——海量UDP/TCP包占满带宽，防御靠流量清洗/黑洞路由 ②协议型（L3/L4）——SYN Flood耗尽连接资源，防御靠SYN Cookie/连接限制 ③应用型（L7）——大量合法HTTP请求压垮应用，防御靠WAF频率限制/验证码。SYN Flood原理：攻击者发大量SYN但不回ACK，服务器为每个SYN分配资源等待，连接表耗尽后合法用户无法连接。SYN Cookie防御：服务器收到SYN时不分配资源，而是把连接状态编码进SYN-ACK的序列号返回；只有客户端回ACK且序列号验证通过才分配资源；攻击者不回ACK所以服务器无资源消耗。`,
    tags: ["DDoS", "SYN Flood", "SYN Cookie", "流量清洗"],
  },
];
