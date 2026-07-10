import type { ReviewQuestion } from "./types";

export const ilhFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "ilh-fr-1",
    chapter: "ilh-final-review",
    level: 2,
    question: `用一条知识线索串联全书的八大知识域，说明递进关系。`,
    answer: `知识线索：TCP/IP基础（HTTP在应用层，请求-响应，无状态）→ HTTP方法（GET/POST/PUT/DELETE表达操作语义）→ 状态码（2xx-5xx表达处理结果）→ HTTP首部（四分类首部携带元信息，Cookie弥补无状态）→ HTTPS与安全（Cookie明文需加密，HTTPS=HTTP+加密+认证+完整性保护）→ 认证与授权（认证=你是谁401/授权=你能做什么403）→ 缓存机制（强缓存200/协商缓存304）→ Web架构与未来（HTTP演进/WebSocket/CDN/安全防御）。递进逻辑：怎么通信→怎么操作→怎么读响应→怎么带信息→怎么加密→你是谁→怎么加速→怎么演进。`,
    tags: ["知识线索", "递进关系", "全书整合"],
  },
  {
    id: "ilh-fr-2",
    chapter: "ilh-final-review",
    level: 2,
    question: `HTTP无状态特性如何影响了全书的知识体系？`,
    answer: `HTTP无状态是全书最重要的设计决策，引发连锁效应：无状态→无法保持登录→需要Cookie机制弥补（首部章节）→Cookie明文传输→需要HTTPS加密（安全章节）→HTTPS需要证书认证身份→需要CA签发证书。同时无状态带来好处：服务器设计简单、可扩展性好——Token/JWT能实现无状态认证就是利用了这一点（自包含Token让服务器无需查Session）。无状态串联了首部、安全、认证三大知识域。`,
    tags: ["无状态", "连锁效应", "Cookie", "JWT"],
  },
  {
    id: "ilh-fr-3",
    chapter: "ilh-final-review",
    level: 3,
    question: `举例说明HTTP知识点之间的关联与交汇。`,
    answer: `知识交汇点举例：①Cookie+Session：Cookie弥补无状态（首部），Session存服务器端（认证），二者结合实现登录状态保持 ②HTTPS+认证：BASIC认证明文密码需HTTPS保护（安全+认证），Token也需HTTPS防窃取 ③缓存+首部：Cache-Control/ETag/Last-Modified都是首部字段（缓存+首部），缓存依赖首部传递控制指令 ④HTTP/2+持久连接：HTTP/1.1持久连接是基础（基础），HTTP/2多路复用是演进一步（架构） ⑤Cookie+安全：HttpOnly防XSS、SameSite防CSRF、Secure防窃听——同一Cookie属性关联了首部、认证和安全三个知识域。`,
    tags: ["知识交汇", "Cookie", "Session", "HTTPS", "缓存"],
  },
  {
    id: "ilh-fr-4",
    chapter: "ilh-final-review",
    level: 3,
    question: `如何将HTTP知识综合应用于实际Web开发？`,
    answer: `HTTP知识在Web开发中的应用：①前端性能优化——缓存策略（Cache-Control/ETag）、持久连接、HTTP/2多路复用、文件名hash+长缓存 ②安全防护——HTTPS部署、Cookie安全属性（HttpOnly/Secure/SameSite）、XSS/CSRF防御 ③API设计——RESTful规范、正确使用HTTP方法和状态码、内容协商（Accept/Content-Type） ④架构选型——Session vs Token认证（传统Web vs 前后端分离/移动端）、传统HTTP vs WebSocket（请求-响应 vs 实时双向）、CDN部署（就近缓存加速）。`,
    tags: ["实际应用", "性能优化", "安全", "API设计", "架构选型"],
  },
];
