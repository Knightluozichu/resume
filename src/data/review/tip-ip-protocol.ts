import { ReviewQuestion } from "./types";

export const tipIpProtocolQuestions: ReviewQuestion[] = [
  {
    id: "tip-ip-protocol-1",
    chapter: "tip-ip-protocol",
    level: 2,
    question: `IPv4 包头中 TTL、Protocol、Flags 字段的作用分别是什么？`,
    answer:
      `TTL（8 位）：生存时间，每经过一个路由器减 1，到 0 则丢弃并返回 ICMP 超时，防止路由环路，traceroute 利用此原理。Protocol（8 位）：标识上层协议号，1=ICMP、6=TCP、17=UDP、89=OSPF。Flags（3 位）：DF=禁止分片、MF=后面还有分片、Reserved。与 Fragment Offset 配合实现分片与重组。`,
    tags: ["IPv4", "TTL", "Protocol", "Flags"],
  },
  {
    id: "tip-ip-protocol-2",
    chapter: "tip-ip-protocol",
    level: 2,
    question: `IP 路由表的最长前缀匹配规则是什么？举例说明。`,
    answer:
      `最长前缀匹配：路由器查找路由表时，选择与目的 IP 匹配的前缀最长的那条路由。因为前缀越长，匹配越精确。例如目的 IP 10.1.1.5，路由表中有 10.0.0.0/8（下一跳 A）和 10.1.0.0/16（下一跳 B），路由器选择 /16 那条（下一跳 B），因为 16 位前缀比 8 位更精确。默认路由 0.0.0.0/0 的前缀最短，只有其他路由都不匹配时才使用。`,
    tags: ["IP路由", "最长前缀匹配", "路由表"],
  },
  {
    id: "tip-ip-protocol-3",
    chapter: "tip-ip-protocol",
    level: 1,
    question: `什么是子网掩码？CIDR 表示法如何工作？`,
    answer:
      `子网掩码是 32 位二进制数，网络位为 1，主机位为 0，用于区分 IP 地址中的网络部分和主机部分。CIDR 表示法如 /24 表示前 24 位为网络位，等价于 255.255.255.0。例如 192.168.1.10/24 的网络地址为 192.168.1.0，可容纳 254 台主机（主机位 8 位，去掉全 0 网络地址和全 1 广播地址）。`,
    tags: ["子网掩码", "CIDR", "网络位"],
  },
  {
    id: "tip-ip-protocol-4",
    chapter: "tip-ip-protocol",
    level: 3,
    question: `描述 IP 包从源主机到目的主机的完整路由转发过程。`,
    answer:
      `①源主机判断目的 IP 是否在同网段：同网段直接 ARP 查目的 MAC 发送；不同网段查路由表找下一跳 ②路由器收到 IP 包后：查路由表（最长前缀匹配）找下一跳 → TTL 减 1（到 0 丢弃并返回 ICMP 超时）→ 重新计算首部校验和 → ARP 查下一跳 MAC → 从对应接口转发 ③每个中间路由器重复此过程 ④最终目的主机收到包，剥离 IP 头交给上层 Protocol 指定的协议处理。`,
    tags: ["IP路由", "转发", "TTL", "ARP"],
  },
];
