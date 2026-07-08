import type { ReviewQuestion } from "./types";

/** 部署 复习题 */
export const gwpDeploymentQuestions: ReviewQuestion[] = [
  {
    id: "gwp-deployment-1",
    chapter: "gwp-deployment",
    level: 1,
    question: "Go 的单二进制部署是什么意思？Docker 多阶段构建中为什么要用 scratch 镜像？",
    answer: "单二进制部署指 Go 编译为单个静态链接可执行文件（CGO_ENABLED=0），无外部依赖，部署只需复制一个文件。Docker 多阶段构建用 scratch（空镜像，0 字节）作为运行阶段基础——只需 COPY 编译好的二进制进去，最终镜像只有二进制本身（约 10-15MB）。scratch 无 shell、无包管理器，攻击面最小。需额外 COPY ca-certificates 供 HTTPS 客户端使用。",
    tags: ["单二进制", "Docker", "scratch"],
  },
  {
    id: "gwp-deployment-2",
    level: 2,
    chapter: "gwp-deployment",
    question: "优雅关闭（Graceful Shutdown）需要哪几个步骤？为什么 server.Shutdown(ctx) 比 os.Exit(0) 更好？",
    answer: "步骤：1) 捕获 SIGINT/SIGTERM 信号；2) server.Shutdown(ctx) 停止接受新连接；3) 等待处理中请求完成（ctx 超时控制）；4) 关闭数据库连接池等资源；5) 退出进程。Shutdown 比 os.Exit 好：osExit 立即终止，正在处理的请求被中断（用户看到 502，数据可能写入一半）；Shutdown 给请求时间完成，不丢数据；Shutdown 允许执行 defer（如 db.Close），osExit 不执行 defer；K8s/Docker 滚动更新时优雅关闭确保旧实例处理完请求再退出，实现零停机。",
    tags: ["优雅关闭", "Shutdown", "理解"],
  },
  {
    id: "gwp-deployment-3",
    level: 3,
    chapter: "gwp-deployment",
    question: "写一个 Docker 多阶段构建 Dockerfile，要求最终镜像小于 20MB，并说明 -ldflags 参数的作用。",
    answer: "FROM golang:1.22-alpine AS builder\nWORKDIR /app\nCOPY go.mod go.sum ./\nRUN go mod download\nCOPY . .\nRUN CGO_ENABLED=0 GOOS=linux go build -ldflags=\"-s -w\" -o app .\n\nFROM scratch\nCOPY --from=builder /app/app /app\nCOPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/\nEXPOSE 8080\nENTRYPOINT [\"/app\"]\n\n-ldflags=\"-s -w\" 作用：-s 去除符号表、-w 去除 DWARF 调试信息，减小二进制体积约 30%。CGO_ENABLED=0 生成纯静态二进制（scratch 无 libc）。多阶段丢弃 builder 的 Go 工具链和源码，最终镜像只含二进制+CA证书，约 10-15MB。",
    tags: ["Dockerfile", "多阶段构建", "ldflags", "实践"],
  },
  {
    id: "gwp-deployment-4",
    level: 4,
    chapter: "gwp-deployment",
    question: "生产环境的 Go HTTP 服务器需要配置哪些超时参数？不设超时会导致什么安全问题？如何实现零停机部署？",
    answer: "超时配置：ReadTimeout（读请求超时，如 10s）——防止慢速攻击者打开连接不发数据耗尽文件描述符；WriteTimeout（写响应超时，如 30s）——防止慢速客户端拖住连接；IdleTimeout（Keep-Alive 空闲超时，如 120s）——及时回收空闲连接。不设超时：http.ListenAndServe 默认无超时，攻击者可用 Slowloris 攻击（打开大量连接极慢发送）耗尽服务器连接池，导致拒绝服务。零停机部署：1) 新版本容器启动并通过健康检查；2) 负载均衡将新请求导向新版本；3) 旧版本收到 SIGTERM 开始优雅关闭——停止接受新连接、等待处理中请求完成（30s 超时）；4) 旧版本退出。整个过程用户无感知。K8s 通过 maxSurge（新 Pod 数）和 maxUnavailable（旧 Pod 可用数）控制滚动更新速率。",
    tags: ["超时配置", "安全", "零停机", "综合"],
  },
];
