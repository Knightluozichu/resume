import { ReviewQuestion } from "../types";

export const wpaEthernetIpQuestions: ReviewQuestion[] = [
  {
    id: "wpa-ethernet-ip-1",
    chapter: "wpa-ethernet-ip",
    level: 1,
    question: "以太网 II 帧的结构是什么？Type 字段的常见值及其含义？",
    answer:
      "以太网 II 帧结构：前导码（8 字节）+ 目的 MAC（6 字节）+ 源 MAC（6 字节）+ 类型 Type（2 字节）+ 数据 Payload（46-1500 字节）+ FCS 帧校验序列（4 字节）。Type 字段常见值：0x0800 = IPv4（上层是 IP 协议）、0x0806 = ARP（地址解析协议）、0x86DD = IPv6。Wireshark 通过 Type 字段判断上层协议并自动解码。MAC 地址是链路层地址，用于局域网内寻址。",
    tags: ["以太网", "帧结构", "MAC", "Type"],
  },
  {
    id: "wpa-ethernet-ip-2",
    chapter: "wpa-ethernet-ip",
    level: 2,
    question: "IPv4 包头中 Protocol、TTL、Flags 字段的作用是什么？Protocol 的常见值有哪些？",
    answer:
      "Protocol（8 位）：标识上层协议，常见值 1=ICMP、6=TCP、17=UDP、47=GRE、89=OSPF。Wireshark 据此解码上层。TTL（8 位）：生存时间，每经过一个路由器减 1，减到 0 则丢弃，防止路由环路。traceroute 利用 TTL 递增探测路径。Flags（3 位）：DF（Don't Fragment，1=禁止分片）、MF（More Fragments，1=后面还有分片）、Reserved。分片时 MF=1 表示非最后一片，Offset 标记偏移位置。DF=1 且包大于 MTU 时路由器返回 ICMP 错误。",
    tags: ["IPv4", "Protocol", "TTL", "分片"],
  },
  {
    id: "wpa-ethernet-ip-3",
    chapter: "wpa-ethernet-ip",
    level: 1,
    question: "ARP 协议的作用是什么？简述其工作流程。",
    answer:
      "ARP（Address Resolution Protocol）地址解析协议：将 IP 地址解析为 MAC 地址。工作流程：①主机 A 要发包给 192.168.1.1，先查 ARP 缓存表 ②缓存无匹配，发送 ARP Request 广播帧（目标 MAC=FF:FF:FF:FF:FF:FF），内容为「IP 192.168.1.1 的 MAC 是什么？」③网关/目标主机收到后，单播回复 ARP Reply，告知自己的 MAC 地址 ④主机 A 将 IP-MAC 映射存入 ARP 缓存，后续直接使用。ARP 只在局域网内有效，跨网段时 ARP 解析的是网关的 MAC。",
    tags: ["ARP", "地址解析", "MAC"],
  },
  {
    id: "wpa-ethernet-ip-4",
    chapter: "wpa-ethernet-ip",
    level: 2,
    question: "在 Wireshark 中如何分析 IP 分片？TTL 异常可能意味着什么？",
    answer:
      "IP 分片分析：过滤器 `ip.flags.mf == 1` 可筛出所有非最后的分片包，`ip.frag_offset` 查看偏移。在包详情区展开 IP 层，看 Flags 中 MF 和 Fragment Offset 值。同一原包的分片有相同 Identification 值。大量分片可能意味着 MTU 不匹配（如 VPN 隧道封装后超 MTU）。TTL 异常：TTL=1 可能是路由环路或 traceroute 探测包；TTL 值异常低可能包已接近最大跳数；不同源 IP 的 TTL 值可帮助判断操作系统类型（Linux 通常 64，Windows 通常 128）。",
    tags: ["IP分片", "TTL", "Wireshark分析"],
  },
];
