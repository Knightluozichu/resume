import { ReviewQuestion } from "./types";

export const tipIcmpIgmpQuestions: ReviewQuestion[] = [
  {
    id: "tip-icmp-igmp-1",
    chapter: "tip-icmp-igmp",
    level: 1,
    question: `ICMP 的主要报文类型有哪些？ping 和 traceroute 分别用了哪些 ICMP 报文？`,
    answer:
      `ICMP 查询类：Type 8=Echo Request、Type 0=Echo Reply。差错报告类：Type 3=目的不可达、Type 5=路由重定向、Type 11=超时（TTL=0）、Type 12=参数问题。ping 用 Echo Request（Type 8）和 Echo Reply（Type 0）。traceroute 发送递增 TTL 的包，利用中间路由器返回的 Time Exceeded（Type 11）推断路径，目的主机返回 Port Unreachable（Type 3 Code 3）或 Echo Reply。`,
    tags: ["ICMP", "ping", "traceroute", "报文类型"],
  },
  {
    id: "tip-icmp-igmp-2",
    chapter: "tip-icmp-igmp",
    level: 2,
    question: `ICMP 差错报告报文包含什么内容？为什么不直接传输原始数据？`,
    answer:
      `ICMP 差错报告报文包含：Type（1B）+ Code（1B）+ Checksum（2B）+ 引发差错的原始 IP 包的头部和前 8 字节数据。只包含部分原始数据而非全部，因为：①避免 ICMP 报文过大引发广播风暴 ②前 8 字节足够标识上层协议（如 TCP/UDP 端口号），让源端定位是哪个连接出了问题。ICMP 差错报告不会对 ICMP 差错报文本身再生成差错报告（防止无限循环）。`,
    tags: ["ICMP", "差错报告", "报文结构"],
  },
  {
    id: "tip-icmp-igmp-3",
    chapter: "tip-icmp-igmp",
    level: 2,
    question: `IGMP 的作用是什么？组播地址范围是什么？`,
    answer:
      `IGMP（Internet Group Management Protocol）用于主机与相邻组播路由器之间管理组播组成员关系。主机通过 IGMP Report 加入组播组，路由器周期性发送 Query 查询成员是否还在，主机可发 Leave 离开组。组播地址范围 224.0.0.0~239.255.255.255（D 类地址），其中 224.0.0.1=所有主机组、224.0.0.2=所有路由器组。IGMP 封装在 IP 包中（Protocol=2）。`,
    tags: ["IGMP", "组播", "D类地址"],
  },
  {
    id: "tip-icmp-igmp-4",
    chapter: "tip-icmp-igmp",
    level: 3,
    question: `什么是 Path MTU Discovery（PMTUD）？它如何利用 ICMP 工作？`,
    answer:
      `PMTUD（路径 MTU 发现）用于发现源到目的之间路径上最小的 MTU，避免分片。原理：源端发送 DF=1（禁止分片）的 IP 包，如果某路由器发现包超过下一跳 MTU 且 DF=1，则丢弃包并返回 ICMP Type 3 Code 4（Fragmentation Needed and DF Set）差错报文，报文中包含下一跳 MTU 值。源端据此降低包大小重发，直到成功通过。这样源端发送的包始终能在不分片的情况下到达目的。`,
    tags: ["PMTUD", "ICMP", "MTU", "DF"],
  },
];
