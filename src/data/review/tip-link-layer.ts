import { ReviewQuestion } from "../types";

export const tipLinkLayerQuestions: ReviewQuestion[] = [
  {
    id: "tip-link-layer-1",
    chapter: "tip-link-layer",
    level: 1,
    question: "以太网 II 帧的结构是什么？Type 字段的作用是什么？",
    answer:
      "以太网 II 帧结构：前导码（8B，同步）+ 目的MAC（6B）+ 源MAC（6B）+ Type（2B）+ 数据（46-1500B）+ FCS（4B，校验）。Type 字段标识上层协议：0x0800=IPv4、0x0806=ARP、0x86DD=IPv6、0x8100=802.1Q VLAN。接收方据 Type 判断将 Payload 交给哪个上层协议处理。",
    tags: ["以太网", "帧结构", "Type字段"],
  },
  {
    id: "tip-link-layer-2",
    chapter: "tip-link-layer",
    level: 2,
    question: "描述 ARP 地址解析的完整工作流程。",
    answer:
      "ARP 流程：①主机 A 要发包给目标 IP，先查本地 ARP 缓存表 ②缓存无匹配，发送 ARP Request 广播（目标 MAC=FF:FF:FF:FF:FF:FF），内容为「该 IP 的 MAC 是什么？」③目标主机收到后单播回复 ARP Reply，告知自身 MAC ④发送方缓存 IP-MAC 映射（TTL 约 20 分钟），后续直接使用。跨网段时 ARP 解析的是网关的 MAC。",
    tags: ["ARP", "地址解析", "MAC"],
  },
  {
    id: "tip-link-layer-3",
    chapter: "tip-link-layer",
    level: 2,
    question: "什么是 MTU？IP 分片机制如何工作？DF 和 MF 标志的作用是什么？",
    answer:
      "MTU（最大传输单元）是链路层一次能承载的最大数据量，以太网 MTU=1500 字节。当 IP 包超过 MTU 时路由器分片：每个分片有相同的 Identification，MF（More Fragments）=1 标记非最后一片，Fragment Offset 标记当前片在原包中的位置。DF（Don't Fragment）=1 禁止分片，包过大时路由器返回 ICMP Type 3 Code 4 错误（用于 PMTUD）。目的主机负责重组分片。",
    tags: ["MTU", "IP分片", "DF", "MF"],
  },
  {
    id: "tip-link-layer-4",
    chapter: "tip-link-layer",
    level: 1,
    question: "MAC 地址的结构是什么？它与 IP 地址有什么区别？",
    answer:
      "MAC 地址是 48 位硬件地址，格式如 00:1a:2b:3c:4d:5e，前 24 位是厂商 OUI（组织唯一标识），后 24 位是设备唯一标识。MAC 地址固化在网卡中，是链路层地址，只在局域网内有效。IP 地址是 32 位逻辑地址（IPv4），是网络层地址，可跨网段路由。ARP 协议将 IP 地址解析为 MAC 地址，使 IP 包能在以太网上传输。",
    tags: ["MAC地址", "IP地址", "OUI"],
  },
];
