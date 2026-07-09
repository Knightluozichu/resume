import { ReviewQuestion } from "../types";

export const hdgWebHostingQuestions: ReviewQuestion[] = [
  {
    id: "hdg-web-hosting-1",
    chapter: "hdg-web-hosting",
    level: 1,
    question: "基于 IP 和基于名字的虚拟主机有什么区别？为什么 HTTP/1.1 强制 Host 首部？",
    answer:
      "基于 IP：每站绑不同 IP，据目标 IP 区分，IP 消耗大。基于名字：多站共享 IP，据 Host 首部区分，节省 IP。HTTP/1.1 强制 Host 首部因为请求行只有路径不含主机名，没有 Host 首部服务器无法区分同一 IP 上的不同站点。基于名字的虚拟主机是现代共享主机和 CDN 的基础。",
    tags: ["虚拟主机", "Host首部", "IP", "基于名字"],
  },
  {
    id: "hdg-web-hosting-2",
    chapter: "hdg-web-hosting",
    level: 1,
    question: "HTTP 重定向的 301 和 302 有什么区别？重定向有什么代价？",
    answer:
      "301 永久重定向——浏览器缓存，下次直接跳新 URL，用于域名迁移/URL 规范化。302 临时重定向——不缓存，每次经旧 URL，用于临时跳转。代价：每次重定向增加一个 RTT，重定向链导致延迟累积。优化：用 301 让浏览器缓存，避免重定向链。",
    tags: ["重定向", "301", "302", "RTT"],
  },
  {
    id: "hdg-web-hosting-3",
    chapter: "hdg-web-hosting",
    level: 2,
    question: "负载均衡的常见调度策略有哪些？四层 LB 和七层 LB 有什么区别？",
    answer:
      "调度策略：轮询、加权轮询、最少连接、IP 哈希（会话保持）、URL 哈希（提高缓存命中）、响应时间。四层 LB 基于 TCP/UDP 转发（如 LVS），性能高但不解析 HTTP。七层 LB 基于 HTTP 转发（如 Nginx/HAProxy），可基于 URL/Header 路由，功能灵活但性能略低。",
    tags: ["负载均衡", "调度策略", "四层LB", "七层LB"],
  },
  {
    id: "hdg-web-hosting-4",
    chapter: "hdg-web-hosting",
    level: 2,
    question: "HTTP 重定向有哪些常见用途？303 状态码的 PRG 模式是什么？",
    answer:
      "常见用途：URL 规范化、HTTP→HTTPS 升级、域名迁移（301 保持 SEO）、A/B 测试、负载均衡。303 See Other 的 PRG（Post/Redirect/Get）模式：POST 请求完成后用 303 重定向到 GET 请求，防止用户刷新导致 POST 重复提交——刷新只会重复 GET 而非 POST。",
    tags: ["重定向", "303", "PRG模式", "HTTPS升级"],
  },
];
