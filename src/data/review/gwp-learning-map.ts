import type { ReviewQuestion } from "./types";

/** 学习地图 复习题 */
export const gwpLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "gwp-learning-map-1",
    chapter: "gwp-learning-map",
    level: 1,
    question: `Go Web 编程全书四大板块的顺序是什么？`,
    answer: `四大板块按请求生命周期递进：Web 基础（HTTP 与标准库）→ 路由与中间件（请求分发与横切处理）→ 数据层（数据库/模板/JSON API）→ 生产部署（认证/部署/总复习）。`,
    tags: ["全书结构", "学习路径"],
  },
  {
    id: "gwp-learning-map-2",
    level: 2,
    chapter: "gwp-learning-map",
    question: `Go 构建 Web 应用的核心优势\"单二进制部署\"是什么意思？它带来哪些好处？`,
    answer: `Go 编译为单个静态链接的可执行文件（CGO_ENABLED=0），无外部依赖。好处：1) 部署只需复制一个文件到服务器；2) Docker 镜像可基于 scratch（空镜像），体积约 10-15MB；3) 无运行时版本冲突（不像 Python/Node 需要安装运行时）；4) 启动极快，适合容器和 Serverless。`,
    tags: ["单二进制", "部署", "Go优势"],
  },
  {
    id: "gwp-learning-map-3",
    level: 3,
    chapter: "gwp-learning-map",
    question: `为什么建议先学标准库 net/http 再学 Web 框架（如 Gin）？`,
    answer: `框架是对标准库的封装——Gin 的路由基于 httprouter、中间件基于 http.Handler 接口、JSON 绑定基于 encoding/json。不理解标准库就无法理解框架在做什么，遇到框架边界问题（自定义中间件、WebSocket、流式响应）束手无策。先学标准库理解原理，再用框架理解取舍。简单项目标准库就够用，框架是\"用复杂度换便利性\"的选择。`,
    tags: ["标准库", "框架", "学习策略"],
  },
  {
    id: "gwp-learning-map-4",
    level: 4,
    chapter: "gwp-learning-map",
    question: `如果要为一个创业公司构建 Go Web 后端，请基于全书知识规划技术选型，说明每层选择的理由。`,
    answer: `路由：Go 1.22+ ServeMux（标准库原生，无依赖）或 chi（需分组/正则时）。中间件：自实现 Recovery+Logging+Auth+CORS（签名简单，可控无依赖）。数据库：PostgreSQL + database/sql（功能强，连接池成熟），复杂查询用 sqlc 生成类型安全代码。认证：JWT + bcrypt（无状态，易扩展）。JSON：encoding/json 标准库（够用）。部署：Docker 多阶段构建（scratch 镜像）+ Nginx（TLS 终止）。运维：slog 结构化日志 + /health + /metrics（Prometheus）。配置：环境变量（12-Factor）。原则：标准库优先 → 成熟第三方 → 自实现，避免过度工程化。`,
    tags: ["综合", "技术选型", "架构"],
  },
];
