import { ReviewQuestion } from "../types";

export const hdgUrlResourceQuestions: ReviewQuestion[] = [
  {
    id: "hdg-url-resource-1",
    chapter: "hdg-url-resource",
    level: 1,
    question: "URL 的语法结构包含哪些组件？query 和 fragment 有什么区别？",
    answer:
      "URL 语法：scheme://user:password@host:port/path;params?query#fragment。query 是 ? 后的查询参数（如 ?page=1），会发送到服务器。fragment 是 # 后的锚点（如 #section2），只在客户端使用，不发送到服务器，用于页面内定位。",
    tags: ["URL", "语法", "query", "fragment"],
  },
  {
    id: "hdg-url-resource-2",
    chapter: "hdg-url-resource",
    level: 2,
    question: "什么是百分号编码？为什么 URL 需要编码？给出一个编码示例。",
    answer:
      "百分号编码是将字符的 UTF-8 字节序列每字节用 %XX 表示。需要编码因为 URL 只允许 ASCII 子集，非 ASCII 字符和不安全字符无法直接传输。示例：空格 → %20，中文「中」→ %E4%B8%AD（UTF-8 三字节）。",
    tags: ["URL", "编码", "百分号编码", "UTF-8"],
  },
  {
    id: "hdg-url-resource-3",
    chapter: "hdg-url-resource",
    level: 1,
    question: "绝对 URL 和相对 URL 的区别是什么？相对 URL 如何解析？",
    answer:
      "绝对 URL 包含完整信息（scheme+host+path），可独立定位资源。相对 URL 省略 scheme 和 host，需参照基础 URL 解析。./ 表示当前目录，../ 表示上一级，/ 表示根路径，// 保留 host 但省略 scheme。浏览器用当前页面 URL 作为基础 URL。",
    tags: ["URL", "绝对URL", "相对URL", "解析"],
  },
  {
    id: "hdg-url-resource-4",
    chapter: "hdg-url-resource",
    level: 2,
    question: "服务器收到请求路径后，如何将路径映射到实际资源？",
    answer:
      "服务器将路径映射到实际资源的方式：①文件系统映射——路径对应文件（/var/www/docs/guide.html）②数据库查询——路径参数触发查询（/users/42 → SELECT WHERE id=42）③动态脚本——路径触发脚本执行（/api/users.php）④重定向——路径映射到其他 URL（301 重定向）。",
    tags: ["URL", "资源映射", "服务器", "路由"],
  },
];
