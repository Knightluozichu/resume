import { ReviewQuestion } from "./types";

export const wpaHttpAnalysisQuestions: ReviewQuestion[] = [
  {
    id: "wpa-http-analysis-1",
    chapter: "wpa-http-analysis",
    level: 1,
    question: `HTTP 请求报文和响应报文的结构分别是什么？`,
    answer:
      `请求报文：①请求行（方法 URI 版本，如 \`GET /api/users HTTP/1.1\`）②请求头（Host/User-Agent/Accept/Authorization 等键值对）③空行（CRLF）④请求体（GET 通常为空，POST 携带数据）。响应报文：①状态行（版本 状态码 短语，如 \`HTTP/1.1 200 OK\`）②响应头（Content-Type/Content-Length/Set-Cookie 等）③空行 ④响应体（HTML/JSON 等）。Wireshark 中 HTTP 层展开后可看到每个字段。`,
    tags: ["HTTP", "请求报文", "响应报文"],
  },
  {
    id: "wpa-http-analysis-2",
    chapter: "wpa-http-analysis",
    level: 2,
    question: `如何在 Wireshark 中跟踪完整的 HTTP 对话？如何过滤特定方法的请求和特定状态码的响应？`,
    answer:
      `跟踪 HTTP 对话：Analyze → Follow → HTTP Stream，显示完整的请求+响应文本（客户端发送为红色，服务器响应为蓝色）。过滤请求方法：\`http.request.method == \"POST\"\`（只看 POST 请求）、\`http.request.method == \"GET\"\` 等。过滤状态码：\`http.response.code == 404\`（404 页面）、\`http.response.code >= 400\`（所有 4xx/5xx 错误）。其他常用：\`http.request\`（所有请求包）、\`http.response\`（所有响应包）、\`http.time > 2\`（响应时间超过 2 秒的慢请求）。`,
    tags: ["HTTP", "流跟踪", "过滤器", "状态码"],
  },
  {
    id: "wpa-http-analysis-3",
    chapter: "wpa-http-analysis",
    level: 1,
    question: `HTTPS 流量在 Wireshark 中默认显示为什么？如何解密 HTTPS 流量？`,
    answer:
      `HTTPS = HTTP over TLS/SSL，Wireshark 默认只能看到 TLS 握手和加密后的应用数据（显示为「Application Data」），无法直接看到 HTTP 明文。解密方法：①使用 SSLKEYLOGFILE 环境变量——浏览器（Chrome/Firefox）支持导出 TLS 密钥到指定文件 ②在 Wireshark → Preferences → Protocols → TLS 中，设置 (Pre)-Master-Secret log filename 指向该密钥文件 ③Wireshark 用密钥解密 TLS 流量，之后可看到 HTTP 明文请求和响应。注意：只能解密有密钥文件的会话，无法解密他人的 HTTPS 流量。`,
    tags: ["HTTPS", "TLS", "解密", "SSLKEYLOGFILE"],
  },
  {
    id: "wpa-http-analysis-4",
    chapter: "wpa-http-analysis",
    level: 2,
    question: `如何用 Wireshark 分析 HTTP 性能问题？有哪些关键指标？`,
    answer:
      `关键指标和分析方法：①响应时间——\`http.time\` 字段记录请求到响应的时间差，\`http.time > 2\` 过滤慢请求 ②TCP 握手时间——SYN 到 SYN+ACK 的时间差，反映网络延迟 ③TLS 握手时间——Client Hello 到 Finished 的时间，反映 TLS 协商开销 ④重传频率——\`tcp.analysis.retransmission\`，频繁重传说明网络不稳定 ⑤请求大小和响应大小——Content-Length 字段，过大响应可能影响加载速度 ⑥服务器推送——检查是否有不必要的 301/302 重定向。Statistics → HTTP → Request/Response Sequences 可查看请求时序。`,
    tags: ["HTTP", "性能分析", "响应时间", "Wireshark"],
  },
];
