import { ReviewQuestion } from "./types";

export const wpaFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "wpa-final-review-1",
    chapter: "wpa-final-review",
    level: 1,
    question: `Wireshark 数据包分析的核心思维方法论是什么？如何将各章知识串联？`,
    answer:
      `核心思维方法论：①自底向上逐层解码——从链路层 Ethernet 开始，依次展开 IP → TCP/UDP → 应用层，每层依赖下层信息 ②自顶向下需求驱动过滤——先明确分析目标（如排查 HTTP 慢请求），再构建显示过滤器精准定位 ③全局统计定位异常——用 Statistics 工具从宏观上发现异常 IP/会话/流量趋势，再微观分析。各章串联：工具基础（ch1）提供操作能力 → 过滤技术（ch2-3）提供筛选手段 → 协议分析（ch4-7）提供解码能力 → 安全检测（ch8）提供异常识别 → 整合报告（ch9）形成闭环。`,
    tags: ["知识整合", "分析方法", "端到端"],
  },
  {
    id: "wpa-final-review-2",
    chapter: "wpa-final-review",
    level: 2,
    question: `描述一次完整的网络故障排查流程，涉及本书哪些章节的知识？`,
    answer:
      `完整流程：①用工具基础（ch1）选择网卡启动抓包，用捕获过滤器（ch2）排除无关流量 ②用显示过滤器（ch3）聚焦目标会话（如 \`ip.addr == 服务器IP\`） ③展开以太网/IP 层（ch4）检查 MAC 地址、TTL、分片是否正常 ④展开 TCP 层（ch5）检查握手是否完成、有无重传/乱序 ⑤展开 HTTP 层（ch6）查看请求/响应，检查状态码和响应时间（\`http.time\`） ⑥如涉及 DNS，展开 DNS 层（ch7）检查域名解析是否正确 ⑦如怀疑攻击，用安全检测方法（ch8）分析异常模式 ⑧整合分析报告（ch9）。每一步都用过滤器驱动，逐层缩小范围。`,
    tags: ["故障排查", "端到端", "知识串联"],
  },
  {
    id: "wpa-final-review-3",
    chapter: "wpa-final-review",
    level: 1,
    question: `捕获过滤器（BPF）和显示过滤器在语法和用途上的核心区别是什么？`,
    answer:
      `语法区别：捕获过滤器使用 BPF 语法——\`tcp dst port 443 and host 10.0.0.1\`，用 and/or/not，字段用小写无点（如 dst port, src host）。显示过滤器使用 Wireshark 表达式语法——\`tcp.port == 443 && ip.addr == 10.0.0.1\`，用 &&/||/!，字段用点分层级（如 tcp.port, ip.addr）。用途区别：捕获过滤器在抓包时生效，减少数据量但不可逆；显示过滤器在抓包后生效，可反复调整但数据已全抓。最佳实践：高流量环境先用 BPF 减少抓包量，分析阶段用显示过滤器灵活筛选。`,
    tags: ["捕获过滤器", "显示过滤器", "BPF", "语法对比"],
  },
  {
    id: "wpa-final-review-4",
    chapter: "wpa-final-review",
    level: 2,
    question: `如果只能记住 5 个 Wireshark 过滤器表达式，你会选择哪些？分别解决什么问题？`,
    answer:
      `5 个最实用过滤器：①\`ip.addr == x.x.x.x\`——按 IP 地址过滤（源或目的），最常用的基础筛选 ②\`tcp.port == 80 || tcp.port == 443\`——过滤 HTTP/HTTPS 流量，Web 排查必备 ③\`tcp.analysis.retransmission\`——检测 TCP 重传，网络质量诊断核心 ④\`http.response.code >= 400\`——过滤 HTTP 错误响应，应用层故障排查 ⑤\`tcp.flags.syn==1 && tcp.flags.ack==0\`——过滤 SYN 包，安全检测（扫描/Flood）基础。这 5 个覆盖了「定位主机→定位协议→诊断传输层→诊断应用层→安全检测」的完整分析链路。`,
    tags: ["过滤器", "实用技巧", "知识总结"],
  },
];
