import { ReviewQuestion } from "../types";

export const wpaDnsDhcpQuestions: ReviewQuestion[] = [
  {
    id: "wpa-dns-dhcp-1",
    chapter: "wpa-dns-dhcp",
    level: 1,
    question: "DNS 的常见记录类型有哪些？递归查询和迭代查询的区别是什么？",
    answer:
      "常见记录类型：A（IPv4 地址）、AAAA（IPv6 地址）、CNAME（别名记录）、MX（邮件交换）、TXT（文本记录）、NS（名称服务器）、PTR（反向解析，IP→域名）。递归查询：客户端 → Local DNS 服务器，客户端只发一次请求，Local DNS 负责返回最终结果（代为完成全部解析过程）。迭代查询：Local DNS → Root → TLD → 权威服务器，每级服务器只返回下一步该问谁，Local DNS 逐级追问。客户端只用递归查询，DNS 服务器之间用迭代查询。",
    tags: ["DNS", "记录类型", "递归查询", "迭代查询"],
  },
  {
    id: "wpa-dns-dhcp-2",
    chapter: "wpa-dns-dhcp",
    level: 2,
    question: "DHCP 的 DORA 四步流程是什么？每一步使用什么传输方式和端口？",
    answer:
      "DORA 流程：①Discover——客户端广播（UDP 67/68），「谁是 DHCP 服务器？」源 IP 0.0.0.0，目的 255.255.255.255 ②Offer——DHCP 服务器单播或广播回应，「我可以给你 10.0.0.50」，包含提议的 IP/掩码/网关/DNS/租期 ③Request——客户端广播请求，「我要 10.0.0.50」（可能多个 Offer 时选择一个，同时通知其他服务器已选）④Acknowledge——服务器确认，「确认，租期 24h」。全部使用 UDP，客户端端口 68，服务器端口 67。DHCP 基于 BOOTP 协议，Wireshark 中过滤器为 `bootp`。",
    tags: ["DHCP", "DORA", "广播", "租约"],
  },
  {
    id: "wpa-dns-dhcp-3",
    chapter: "wpa-dns-dhcp",
    level: 1,
    question: "DNS 劫持和 DNS 隧道在 Wireshark 中分别有什么特征？",
    answer:
      "DNS 劫持特征：①DNS 响应的 IP 地址与预期不符（如已知域名解析到陌生 IP）②DNS 响应来源不是配置的 DNS 服务器 ③同一域名在不同时间解析到不同 IP（非 CDN 场景）。检测方法：`dns.flags.response == 1` 查看响应包，对比响应 IP 与预期。DNS 隧道特征：①超长 DNS 查询名（编码数据藏在子域名中）②高频 DNS 查询到同一域名 ③大量 TXT 记录查询（`dns.txt`），TXT 记录长度异常（`frame.len > 200`）④查询的域名看起来像随机字符串。DNS 隧道用于绕过防火墙传输数据或 C2 通信。",
    tags: ["DNS", "DNS劫持", "DNS隧道", "安全检测"],
  },
  {
    id: "wpa-dns-dhcp-4",
    chapter: "wpa-dns-dhcp",
    level: 2,
    question: "DHCP 饥饿攻击和 DHCP 欺骗的原理及 Wireshark 检测方法？",
    answer:
      "DHCP 饥饿攻击：攻击者伪造大量不同 MAC 地址发送 Discover 请求，耗尽 DHCP 服务器的 IP 地址池，导致合法用户无法获取 IP。Wireshark 检测：短时间内大量 `bootp` Discover 包来自不同源 MAC，且这些 MAC 在网络中无其他正常通信。过滤器：`bootp.option.type == 53 && bootp.type == 1`（Discover 包）。DHCP 欺骗：攻击者部署非法 DHCP 服务器，抢先回复 Offer，分配恶意网关和 DNS 地址，劫持受害者流量。检测：查看 Offer 包（`bootp.type == 2`）的源 IP，确认是否为授权 DHCP 服务器；非授权 IP 发送 DHCP Offer 即为欺骗。",
    tags: ["DHCP", "饥饿攻击", "欺骗", "安全检测"],
  },
];
