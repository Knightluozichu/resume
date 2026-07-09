import type { ReviewQuestion } from "./types";

export const cntApplicationLayerQuestions: ReviewQuestion[] = [
  {
    id: "cnt-al-1",
    chapter: "cnt-application-layer",
    level: 1,
    question: "HTTP请求报文和响应报文分别由哪些部分组成？",
    answer: "HTTP请求报文由三部分组成：①请求行（方法 URL HTTP版本，如GET /index.html HTTP/1.1）②首部行（Host、User-Agent等键值对，以空行结束）③请求体（GET通常为空，POST携带数据）。HTTP响应报文由三部分组成：①状态行（HTTP版本 状态码 短语，如HTTP/1.1 200 OK）②首部行（Content-Type、Content-Length等，以空行结束）③响应体（HTML等内容）。",
    tags: ["HTTP", "报文格式", "请求响应"],
  },
  {
    id: "cnt-al-2",
    chapter: "cnt-application-layer",
    level: 2,
    question: "DNS的分层结构是什么？递归查询和迭代查询的区别是什么？",
    answer: "DNS分层结构：根域名服务器（13组，全球部署）→ 顶级域服务器（TLD，如.com/.org/.cn）→ 权威域名服务器（存储具体域名记录）。递归查询是被查询方负责给出最终答案（用户向本地DNS查询，本地DNS负责找到最终IP返回）；迭代查询是被查询方只给出下一步该问谁（本地DNS向根查询，根指向TLD，TLD指向权威）。实际流程中用户→本地DNS是递归，本地DNS→各级服务器是迭代。DNS基于UDP端口53。",
    tags: ["DNS", "分层结构", "递归迭代"],
  },
  {
    id: "cnt-al-3",
    chapter: "cnt-application-layer",
    level: 2,
    question: "Web缓存如何工作？条件GET的作用是什么？",
    answer: "Web缓存（代理服务器）存储近期请求资源副本。客户端请求先到缓存：命中则直接返回（延迟低），未命中则向原始服务器请求并缓存结果。条件GET用于验证缓存副本是否过期——客户端在请求中携带If-Modified-Since头部，服务器若资源未修改返回304 Not Modified（无响应体，省带宽），若已修改返回200 OK+新内容。Web缓存降低延迟、减少服务器负载和骨干网带宽消耗。CDN本质是分布式Web缓存。",
    tags: ["Web缓存", "条件GET", "CDN"],
  },
  {
    id: "cnt-al-4",
    chapter: "cnt-application-layer",
    level: 3,
    question: "非持久连接和持久连接在HTTP中的性能差异是什么？如何优化？",
    answer: "非持久连接（HTTP/1.0默认）：每个请求建立一次TCP连接，每个对象需要2个RTT（一个TCP握手+一个HTTP请求响应），10个对象需要20+个RTT，延迟高且连接开销大。持久连接（HTTP/1.1默认）：TCP连接保持，多个请求串行或流水线传输，10个对象只需1-2个RTT，大幅降低延迟。优化方向：①HTTP/1.1流水线模式 ②HTTP/2多路复用消除队头阻塞 ③HTTP/3基于QUIC/UDP消除TCP队头阻塞。HTTP无状态特性使每个请求独立，状态通过Cookie维持。",
    tags: ["HTTP", "持久连接", "性能优化"],
  },
];
