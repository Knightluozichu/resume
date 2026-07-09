import type { ReviewQuestion } from "./types";

export const cntFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "cnt-fr-1",
    chapter: "cnt-final-review",
    level: 2,
    question: "描述一个HTTPS请求从浏览器到服务器的完整数据流程，涉及哪些层的哪些协议？",
    answer: "完整流程：①DNS解析（应用层/UDP）——浏览器向本地DNS递归查询，本地DNS向根→TLD→权威迭代查询获得IP ②TCP连接建立（传输层）——三次握手(SYN→SYN+ACK→ACK)，初始化cwnd=1 MSS进入慢启动 ③TLS握手（安全层）——ClientHello→ServerHello+证书→验证CA链→密钥交换→派生会话密钥→切换加密 ④HTTP请求发送（应用层）——构造GET请求报文 ⑤逐层封装——[HTTP]→[TCP头|HTTP]→[IP头|TCP|HTTP]→[帧头|IP|TCP|HTTP|CRC]→比特流 ⑥路由器转发——每跳最长前缀匹配查表→TTL-1→重新封装转发 ⑦交换机转发——查MAC地址表定向转发 ⑧服务器逐层解封装处理请求返回响应 ⑨全程拥塞控制运作（慢启动→拥塞避免→如丢包则快速重传/恢复）。",
    tags: ["端到端流程", "HTTPS", "分层封装", "综合应用"],
  },
  {
    id: "cnt-fr-2",
    chapter: "cnt-final-review",
    level: 2,
    question: "流量控制和拥塞控制有什么区别？IP层为什么只做最佳努力交付？",
    answer: "流量控制：接收方控制发送方速率防止压垮接收方缓冲区，机制是接收窗口(rwnd)，端到端。拥塞控制：发送方感知网络拥塞调整速率防止压垮网络，机制是拥塞窗口(cwnd)通过AIMD调整。实际发送窗口=min(cwnd,rwnd)。IP层只做最佳努力交付的原因（端到端原则）：①可靠性等端到端语义只有端系统才能真正判断——路由器不知道哪个分组对应用重要 ②网络核心保持简单才能高效扩展——路由器只需转发不需维护连接状态和重传 ③可靠性由TCP在端系统补充实现，职责清晰 ④如果IP层也做可靠会与TCP大量冗余效率低。",
    tags: ["流量控制", "拥塞控制", "端到端原则", "最佳努力"],
  },
  {
    id: "cnt-fr-3",
    chapter: "cnt-final-review",
    level: 3,
    question: "从地址转换的角度，描述数据从应用层到物理层各层如何寻址和转换？",
    answer: "地址转换链：①应用层使用域名（如www.example.com），人类可读、层次化 ②DNS将域名转换为网络层IP地址（如93.184.216.34） ③传输层在IP地址基础上加上端口号（如192.168.1.1:443）区分进程，TCP用四元组（源IP,源端口,目标IP,目标端口）分解 ④网络层IP地址是主机标识，层级结构（网络前缀+主机号），路由器按最长前缀匹配转发 ⑤ARP将IP地址转换为链路层MAC地址（如08:00:27:71:36:A0），MAC地址扁平结构固化在网卡中 ⑥链路层帧在相邻节点间传输 ⑦物理层比特流在介质上传输。NAT在网络层做私有IP:端口→公网IP:端口的转换。",
    tags: ["寻址", "地址转换", "DNS", "ARP", "NAT"],
  },
  {
    id: "cnt-fr-4",
    chapter: "cnt-final-review",
    level: 4,
    question: "如果你要设计一个支持百万并发的视频直播平台，如何综合运用全书五层知识？",
    answer: "①应用层：HTTP-based HLS/DASH协议传输视频分片，CDN全局分发降低源站压力，DNS+GSLB按地域调度到最近边缘节点 ②传输层：直播推流用TCP保证可靠（RTMP/SRT），观众端可用UDP+QUIC降低延迟（HTTP/3），百万并发连接需Reactor模型+连接复用 ③拥塞控制：自适应码率——根据cwnd和网络状况动态调整视频质量（ABR算法），避免拥塞导致卡顿 ④网络层：Anycast IP让DNS解析到最近CDN节点，BGP多线接入多ISP，IPv6应对地址需求 ⑤链路层：数据中心用10G/40G以太网+巨型帧提高吞吐，交换机VLAN隔离不同业务 ⑥安全：TLS加密直播流防盗链，DDoS防护（流量清洗+Anycast分散），WAF防注入。核心思路：CDN边缘分发+自适应码率+多线接入+TLS安全。",
    tags: ["综合设计", "视频直播", "CDN", "QUIC", "百万并发"],
  },
];
