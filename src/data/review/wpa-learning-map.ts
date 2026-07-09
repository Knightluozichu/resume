import { ReviewQuestion } from "../types";

export const wpaLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "wpa-learning-map-1",
    chapter: "wpa-learning-map",
    level: 1,
    question: "Wireshark 数据包分析实战的五大知识域分别解决什么核心问题？",
    answer:
      "五大知识域：①工具基础——解决「Wireshark 怎么用、界面怎么看」 ②过滤技术——解决「怎么精准捕获和筛选数据包」 ③协议分析——解决「各层协议怎么逐层拆解」 ④安全检测——解决「怎么发现异常和攻击行为」 ⑤知识整合——解决「全书知识怎么串联、端到端怎么分析」。",
    tags: ["Wireshark", "知识体系", "五大知识域"],
  },
  {
    id: "wpa-learning-map-2",
    chapter: "wpa-learning-map",
    level: 2,
    question: "描述使用 Wireshark 进行数据包分析的完整流程的主要阶段。",
    answer:
      "完整流程：①启动抓包（选择网卡、设置捕获过滤器）②捕获过滤（BPF 语法减少抓包量）③显示过滤（表达式筛选聚焦目标）④协议解码（逐层展开包详情：以太网→IP→TCP→应用层）⑤流量分析（跟踪 TCP 流、分析 HTTP 交互、统计会话）⑥异常检测（识别扫描、DDoS、入侵等）⑦报告整合（导出数据、撰写分析报告）。",
    tags: ["Wireshark", "分析流程", "端到端"],
  },
  {
    id: "wpa-learning-map-3",
    chapter: "wpa-learning-map",
    level: 1,
    question: "Wireshark 界面的三大核心区域分别显示什么内容？",
    answer:
      "三大核心区域：①包列表区（Packet List）——每行一个数据包，显示序号、时间、源/目的地址、协议、长度、摘要信息 ②包详情区（Packet Details）——树形展开当前选中包的逐层协议解码，点击 ▸ 展开各字段 ③原始字节区（Packet Bytes）——十六进制 + ASCII 对照显示包的原始字节，选中字段在此高亮对应字节。",
    tags: ["Wireshark", "界面布局", "包列表"],
  },
  {
    id: "wpa-learning-map-4",
    chapter: "wpa-learning-map",
    level: 2,
    question: "协议栈各层在 Wireshark 中如何对应？举例说明从抓包到应用层分析的路径。",
    answer:
      "协议栈对应关系：链路层→Ethernet（MAC 地址、帧结构）；网络层→IP/ICMP/ARP（IP 地址、路由、分片）；传输层→TCP/UDP（端口、握手、流控）；应用层→HTTP/DNS/DHCP/TLS（具体业务数据）。分析路径示例：抓到一个包后，在包详情区先看 Ethernet 层的 MAC 地址，再展开 IP 层看源/目的 IP 和 TTL，再展开 TCP 层看端口和标志位，最后展开 HTTP 层看请求方法和响应码。每一层都依赖下一层的信息。",
    tags: ["Wireshark", "协议栈", "分层分析"],
  },
];
