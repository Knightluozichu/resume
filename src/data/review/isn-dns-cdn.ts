import type { ReviewQuestion } from "./types";

export const isnDnsCdnQuestions: ReviewQuestion[] = [
  {
    id: "isn-dns-1",
    chapter: "isn-dns-cdn",
    level: 1,
    question: `DNS解析的完整流程是什么？`,
    answer: `DNS解析完整流程：①浏览器DNS缓存查找未命中 ②操作系统DNS缓存查找未命中 ③本地DNS服务器（递归解析器）查找未命中 ④向根DNS服务器查询，返回.com顶级域服务器地址 ⑤向.com顶级域服务器查询，返回example.com权威DNS地址 ⑥向权威DNS服务器查询，返回A记录（IP地址）⑦本地DNS缓存结果并返回给浏览器。DNS运行在UDP之上，默认端口53。`,
    tags: ["DNS", "域名解析", "递归查询"],
  },
  {
    id: "isn-dns-2",
    chapter: "isn-dns-cdn",
    level: 2,
    question: `DNS负载均衡的原理和局限是什么？它和LVS/Nginx负载均衡如何配合？`,
    answer: `DNS负载均衡原理：DNS A记录返回多个IP，客户端随机选一个连接。局限：①不感知服务器健康状态（挂了还可能返回）②不感知服务器负载（可能不均匀）③DNS缓存导致切换慢（TTL内无法更新）。优点是适合全局地域调度（GSLB）——按地域返回最近机房IP。与LVS/Nginx配合：DNS做粗粒度的全局地域调度（把不同地域用户分到不同机房），机房内LVS/Nginx做细粒度的实时健康检查和智能调度。DNS负责「跨机房分发」，LVS/Nginx负责「机房内分发」。`,
    tags: ["DNS负载均衡", "GSLB", "局限", "配合"],
  },
  {
    id: "isn-dns-3",
    chapter: "isn-dns-cdn",
    level: 3,
    question: `CDN的工作原理是什么？回源是什么概念？如何优化回源？`,
    answer: `CDN工作原理：在全球多地部署边缘节点。用户请求时DNS将域名解析到最近的CDN边缘节点。边缘节点缓存静态内容，命中缓存时直接就近返回（快）；未命中时回源向源站拉取内容并缓存到边缘节点。回源是CDN边缘节点缓存未命中时向源站请求原始内容的过程——是CDN中最慢的路径。优化回源方法：①缓存预热——发布时提前推送内容到边缘节点 ②设置合理的Cache-Control——减少回源频率 ③多级缓存——边缘节点→区域中心→源站层层拦截。CDN缓存时间由HTTP响应头Cache-Control/Expires控制。`,
    tags: ["CDN", "回源", "缓存预热", "边缘节点"],
  },
  {
    id: "isn-dns-4",
    chapter: "isn-dns-cdn",
    level: 4,
    question: `CDN静态加速和动态加速的区别是什么？如果一个网站既有静态资源又有API，如何设计CDN策略？`,
    answer: `静态加速：边缘节点缓存静态资源（图片/CSS/JS/视频），命中缓存直接就近返回，大幅降低延迟和源站压力。动态加速：针对API/动态页面等不可缓存内容，通过优化回源链路（智能路由选择最优路径、TCP连接复用/优化）来加速，不缓存内容。设计策略：①静态资源（图片/CSS/JS/字体/视频）走CDN——配置长Cache-Control（如max-age=86400），边缘节点缓存，文件更新时通过版本号或缓存刷新API更新 ②API请求（/api/*）不走CDN缓存——通过CDN的动态加速功能优化回源链路，或直接DNS解析到源站LB ③HTML页面根据是否动态决定——纯静态HTML走CDN，SSR动态HTML走动态加速 ④使用CDN的路径路由规则：/static/*到CDN缓存，/api/*到源站。`,
    tags: ["静态加速", "动态加速", "CDN策略", "综合设计"],
  },
];
