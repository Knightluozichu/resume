import type { ReviewQuestion } from "./types";

export const ilhHttpMethodsQuestions: ReviewQuestion[] = [
  {
    id: "ilh-hm-1",
    chapter: "ilh-http-methods",
    level: 1,
    question: "GET和POST有什么核心区别？",
    answer: "核心区别：①语义不同——GET获取资源，POST创建资源/提交数据 ②参数位置不同——GET通过URL查询字符串传参，POST通过请求体传参 ③请求体不同——GET通常无请求体，POST有请求体 ④安全性与幂等性不同——GET是安全且幂等的，POST是不安全且非幂等的。",
    tags: ["GET", "POST", "方法对比"],
  },
  {
    id: "ilh-hm-2",
    chapter: "ilh-http-methods",
    level: 2,
    question: "什么是安全方法和幂等方法？哪些方法属于各自类别？",
    answer: "安全方法是指不会改变服务器资源状态的方法（GET/HEAD/OPTIONS），客户端可以安全地预加载和缓存。幂等方法是指同一请求执行N次效果等同执行1次的方法（GET/PUT/DELETE/HEAD），网络不稳定时可以安全重试。POST不是幂等的——多次提交会创建多个资源。PUT是幂等的——多次替换结果相同。DELETE是幂等的——删除一次和N次结果都是资源不存在。",
    tags: ["安全方法", "幂等性", "GET", "PUT", "DELETE"],
  },
  {
    id: "ilh-hm-3",
    chapter: "ilh-http-methods",
    level: 2,
    question: "在RESTful API中如何正确使用HTTP方法？",
    answer: "RESTful API将HTTP方法映射为CRUD操作：C（Create）→POST /api/users创建用户；R（Read）→GET /api/users/123获取用户；U（Update）→PUT /api/users/123整体更新用户或PATCH部分更新；D（Delete）→DELETE /api/users/123删除用户。URL用名词表达资源位置，HTTP方法用动词表达操作意图。",
    tags: ["RESTful", "CRUD", "API设计"],
  },
  {
    id: "ilh-hm-4",
    chapter: "ilh-http-methods",
    level: 3,
    question: "PUT和PATCH有什么区别？HEAD和OPTIONS方法的作用是什么？",
    answer: "PUT和PATCH的区别：PUT是整体替换（需发送完整资源），PATCH是部分修改（只发送需要修改的字段）。例如更新用户邮箱，PUT需发送完整用户对象，PATCH只需发送{\"email\": \"new@example.com\"}。HEAD方法获取首部但不含响应体，用于检查资源是否存在或获取Content-Length。OPTIONS方法查询服务器支持的方法，常用于CORS预检请求。",
    tags: ["PUT", "PATCH", "HEAD", "OPTIONS"],
  },
];
