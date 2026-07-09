import type { ReviewQuestion } from "./types";

export const ilhStatusCodesQuestions: ReviewQuestion[] = [
  {
    id: "ilh-sc-1",
    chapter: "ilh-status-codes",
    level: 1,
    question: "HTTP状态码分为哪五大类？各自表示什么含义？",
    answer: "五大类：①1xx信息性（请求已接收继续处理，很少使用）②2xx成功（请求被正常处理，如200/204/206）③3xx重定向（需额外操作完成请求，如301/302/304）④4xx客户端错误（请求有语法错误或无法完成，如400/401/403/404）⑤5xx服务器错误（服务器处理出错，如500/502/503/504）。",
    tags: ["状态码", "分类", "2xx", "4xx", "5xx"],
  },
  {
    id: "ilh-sc-2",
    chapter: "ilh-status-codes",
    level: 2,
    question: "401和403状态码有什么区别？",
    answer: "401 Unauthorized表示需要认证——「你是谁？」，用户未登录，配合WWW-Authenticate首部要求客户端提供凭证。403 Forbidden表示已认证但无权限——「我知道你是谁，但你不能做这个」，如普通用户访问管理后台。简单记忆：未登录返回401，已登录但无权限返回403。",
    tags: ["401", "403", "认证", "授权"],
  },
  {
    id: "ilh-sc-3",
    chapter: "ilh-status-codes",
    level: 2,
    question: "301、302、303、307重定向状态码有什么区别？",
    answer: "301 Moved Permanently永久重定向——资源永久移动，搜索引擎更新索引转移权重，浏览器缓存。302 Found临时重定向——资源临时移动，不更新索引，浏览器实现中POST可能变GET。303 See Other——明确要求用GET访问新URI（POST提交后重定向到结果页的标准做法）。307 Temporary Redirect临时重定向——严格保持原请求方法（POST重定向后仍POST）。308永久重定向且严格保持方法。",
    tags: ["301", "302", "303", "307", "重定向"],
  },
  {
    id: "ilh-sc-4",
    chapter: "ilh-status-codes",
    level: 2,
    question: "502、503、504三个服务器错误状态码如何区分？",
    answer: "502 Bad Gateway——网关/代理从上游服务器收到无效响应（上游服务器崩了或返回垃圾数据）。503 Service Unavailable——服务器暂时无法处理请求（过载或维护中，通常会恢复，配合Retry-After首部）。504 Gateway Timeout——网关/代理等待上游服务器响应超时（上游太慢）。简单记忆：502上游坏了、503自己太忙、504上游太慢。",
    tags: ["502", "503", "504", "服务器错误"],
  },
];
