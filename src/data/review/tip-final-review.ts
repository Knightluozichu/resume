import { ReviewQuestion } from "../types";

export const tipFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "tip-final-review-1",
    chapter: "tip-final-review",
    level: 3,
    question: "从数据封装的角度，描述一个 HTTP 请求从浏览器发出到到达服务器的完整过程。",
    answer:
      "①应用层：浏览器构造 HTTP 请求报文（GET /index.html HTTP/1.1 + Headers）②传输层：加 TCP 头（源端口→目的端口 80，设 SYN/ACK/序号等），封装为 TCP 段 ③网络层：加 IP 头（源 IP→目的 IP，TTL=64，Protocol=6），封装为 IP 包。若包大于 MTU 则分片 ④链路层：查 ARP 缓存获取下一跳 MAC，加以太网帧头（目的/源 MAC + Type=0x0800）+ FCS，封装为帧 ⑤物理层：转为比特流在线缆传输。每经过路由器：链路层解封装→IP 层查路由表→TTL-1→重新封装为帧转发。到达服务器后逐层解封装，最终 HTTP 请求交给 Web 服务器进程。",
    tags: ["封装", "HTTP", "TCP", "IP", "端到端"],
  },
  {
    id: "tip-final-review-2",
    chapter: "tip-final-review",
    level: 4,
    question: "TCP 如何综合使用序号/确认、重传、滑动窗口、拥塞控制来保证可靠传输？这些机制之间如何协作？",
    answer:
      "序号/确认：每个字节编号，接收方用 ACK 确认已收数据，发送方据此判断是否到达。重传：超时（RTO）未确认→超时重传（cwnd 归 1）；3 个重复 ACK→快速重传（cwnd 减半）。两者互补：超时应对严重丢包，快重传应对偶尔丢包。滑动窗口：接收方通过 Window 字段控制发送方速率（流控），防止接收方溢出。拥塞控制：慢启动指数增长到 ssthresh，拥塞避免线性增长，丢包时减半（快恢复）或归 1（超时），感知网络状况。协作：序号/确认是基础，重传修复丢包，窗口协调收发速率，拥塞控制感知网络承载能力。四者共同在不可靠的 IP 层上实现可靠传输。",
    tags: ["TCP", "可靠性", "重传", "拥塞控制", "综合"],
  },
  {
    id: "tip-final-review-3",
    chapter: "tip-final-review",
    level: 3,
    question: "IP 路由、ARP、ICMP 三者如何协作完成数据包的跨网段传输？",
    answer:
      "①IP 路由决定「去哪里」：源主机或路由器查路由表（最长前缀匹配）确定下一跳 IP 地址和出接口 ②ARP 决定「怎么到下一跳」：查 ARP 缓存获取下一跳 IP 对应的 MAC 地址，无则 ARP 广播请求；有了 MAC 才能封装以太网帧发送 ③ICMP 负责「出问题报告」：TTL 到 0 时路由器返回 ICMP 超时；目的不可达返回 ICMP 不可达；路由器可用 ICMP 重定向告知源端更优路径；PMTUD 利用 ICMP 差错报告发现路径 MTU。三者协作：IP 路由是决策核心，ARP 是链路层寻址桥梁，ICMP 是差错反馈通道。",
    tags: ["IP路由", "ARP", "ICMP", "协作"],
  },
  {
    id: "tip-final-review-4",
    chapter: "tip-final-review",
    level: 4,
    question: "为什么说 UDP 和 TCP 代表了两种截然不同的设计哲学？在实际系统中如何选择？",
    answer:
      "UDP 代表「简单高效」哲学：把可靠性、有序性、流控等交给应用层自行实现，协议本身只做最少的端口复用和校验。优点是低延迟、低开销、支持广播组播。TCP 代表「可靠完备」哲学：在传输层内置全套可靠性机制（序号/确认/重传/流控/拥塞控制），应用层无需关心丢包。优点是简单可靠、有序到达。选择原则：①需要可靠传输且能容忍延迟→TCP（Web/邮件/文件传输）②需要低延迟且能容忍丢包→UDP（实时音视频/游戏/DNS 查询）③需要广播/组播→UDP ④简单查询-响应→UDP（省握手开销）。现代系统也常用 QUIC（基于 UDP 实现类 TCP 可靠性）兼顾两者优势。",
    tags: ["UDP", "TCP", "设计哲学", "选型"],
  },
];
