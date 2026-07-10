import { ReviewQuestion } from "./types";

export const wpaNetworkSecurityQuestions: ReviewQuestion[] = [
  {
    id: "wpa-network-security-1",
    chapter: "wpa-network-security",
    level: 1,
    question: `SYN 端口扫描和 SYN Flood DDoS 在 Wireshark 中的特征分别是什么？如何区分？`,
    answer:
      `SYN 端口扫描特征：单个源 IP 短时间内向同一目标 IP 的多个不同端口发送 SYN 包（\`tcp.flags.syn==1 && tcp.flags.ack==0\`），每个端口通常只发一个 SYN，开放端口回 SYN+ACK，关闭端口回 RST。SYN Flood DDoS 特征：大量源 IP（通常伪造）向同一目标端口（如 80/443）发送海量 SYN 包，但从不完成三次握手（无 ACK），目标半连接队列被耗尽。区分：扫描是「一对多端口」目的在于探测；Flood 是「多对一端口」目的在于瘫痪服务。分析时查看源 IP 数量和目标端口分布。`,
    tags: ["端口扫描", "SYN Flood", "DDoS", "安全检测"],
  },
  {
    id: "wpa-network-security-2",
    chapter: "wpa-network-security",
    level: 2,
    question: `如何用 Wireshark 检测 SSH 暴力破解和 HTTP SQL 注入？`,
    answer:
      `SSH 暴力破解检测：短时间内大量 SSH 连接尝试（\`ssh\` 或 \`tcp.port == 22\`），且伴随大量 RST 重置（\`tcp.flags.reset == 1\`，表示登录失败后被服务器断开）。Statistics → Endpoints 查看某 IP 到 22 端口的连接数异常高。HTTP SQL 注入检测：检查 HTTP 请求 URI 和表单数据中是否含注入特征字符串，如 \`' OR 1=1\`、\`UNION SELECT\`、\`--\`、\`xp_cmdshell\` 等。过滤器：\`http.request.uri contains \"UNION\" || http.request.uri contains \"SELECT\" || http.request.uri contains \"\\'\"\`。Follow HTTP Stream 查看完整请求内容。`,
    tags: ["暴力破解", "SQL注入", "SSH", "安全检测"],
  },
  {
    id: "wpa-network-security-3",
    chapter: "wpa-network-security",
    level: 1,
    question: `恶意软件 C2（命令与控制）通信在 Wireshark 中有哪些典型特征？`,
    answer:
      `典型特征：①信标行为——受害主机定期（如每 60 秒）向固定 IP/域名发送心跳包，间隔规律 ②DNS 信标——定期查询固定域名（可能是动态域名）③非常规端口——使用非标准端口通信（如 4444、1337 等）④加密流量——C2 通信通常加密，显示为 TLS/Application Data，无明文 HTTP ⑤流量模式异常——正常主机不会持续与陌生 IP 通信。检测方法：Statistics → Endpoints 找高频通信的陌生 IP；Statistics → IO Graphs 查看流量趋势是否有周期性脉冲；\`dns\` 过滤器查看 DNS 查询模式。`,
    tags: ["C2", "恶意软件", "信标", "安全检测"],
  },
  {
    id: "wpa-network-security-4",
    chapter: "wpa-network-security",
    level: 2,
    question: `发现网络异常后的标准处置流程是什么？Wireshark 在每个环节的作用？`,
    answer:
      `标准处置流程：①确认范围——用 Wireshark 显示过滤器定位异常源/目的 IP、时间窗口、协议类型（如 \`ip.src == x.x.x.x\`）②提取特征——记录 IP/端口/包大小/频率模式，生成 IoC 指标，导出 pcap 保存证据 ③阻断隔离——根据分析结果在防火墙封禁 IP、ACL 限制端口、关闭非授权服务 ④根因分析——Follow TCP Stream 查看通信内容，分析攻击手法和影响面 ⑤报告归档——导出分析报告和 pcap 文件，保存证据链供后续取证。Wireshark 的 Statistics 工具（Endpoints/Conversations/IO Graphs/Flow Graph）在每个环节都提供数据支持。`,
    tags: ["安全处置", "IoC", "取证", "Wireshark"],
  },
];
