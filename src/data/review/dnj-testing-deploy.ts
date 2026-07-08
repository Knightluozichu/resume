import type { ReviewQuestion } from "./types";

export const dnjTestingDeployQuestions: ReviewQuestion[] = [
  {
    id: "dnj-testing-deploy-1",
    chapter: "dnj-testing-deploy",
    level: 2,
    question: "测试金字塔的三层是什么？为什么底层多、顶层少？",
    answer:
      "测试金字塔三层：①单元测试（底层，最多）——测试单个函数/模块的逻辑，不依赖外部资源（数据库、网络），快（毫秒级）、多（数千个）、隔离。②集成测试（中层，适中）——测试多个模块协作或模块与真实外部资源（测试数据库）的交互，较慢（秒级）、较少（数百个）。③E2E 测试（顶层，最少）——模拟真实用户操作，端到端验证整个系统（如启动浏览器点击页面验证流程），慢（分钟级）、少（数十个）。底层多顶层少的原因：①速度——单元测试快，大量运行不拖慢 CI；顶层慢，多了会导致 CI 跑数小时；②稳定性——单元测试隔离性强不会因环境波动失败，E2E 依赖多易 flaky；②定位——单元测试失败能精确定位到函数，E2E 失败只知道「某处坏了」需排查。原则：能用单元测试覆盖的不用集成，能用集成覆盖的不用 E2E。",
    tags: ["测试", "测试金字塔", "单元测试", "E2E"],
  },
  {
    id: "dnj-testing-deploy-2",
    chapter: "dnj-testing-deploy",
    level: 3,
    question: "Mocha 和 Jest 有什么区别？Jest 的「零配置」体现在哪里？",
    answer:
      "①Mocha——测试框架只提供 describe/it/before/after 结构和运行器，断言需另装（chai/assert）、mock 需另装（sinon）、覆盖率需另装（nyc）。灵活但配置繁琐。②Jest——一体化测试框架，内置断言（expect）、mock（jest.fn/jest.mock）、覆盖率（--coverage）、快照测试、并行执行。「零配置」体现：①创建 jest.config.js 即可运行（或零配置直接 jest 命令）；②自动发现测试文件（*.test.js / *.spec.js）；③内置 Babel/TypeScript 转译（通过 preset）；④内置 jsdom 环境模拟浏览器；⑤内置覆盖率收集（无需 nyc）。Jest 还支持并行测试（每个测试文件独立 worker 进程），速度通常优于 Mocha 串行。选择：新项目推荐 Jest（开箱即用），已有 Mocha 项目不必强迁。覆盖率工具推荐 c8（基于 V8 原生覆盖，比 istanbul/nyc 更准确）。",
    tags: ["测试", "Mocha", "Jest", "断言", "mock"],
  },
  {
    id: "dnj-testing-deploy-3",
    chapter: "dnj-testing-deploy",
    level: 3,
    question: "PM2 的 cluster 模式如何工作？零停机重载（reload）的原理是什么？",
    answer:
      "PM2 cluster 模式：基于 Node.js cluster 模块，主进程 fork 出 N 个 Worker 进程（N 通常等于 CPU 核数或设 `instances: "max"`），主进程监听端口并通过 round-robin 分发请求到 Worker。Worker 崩溃时 PM2 自动重启（0 秒重启），保证高可用。零停机重载（pm2 reload）原理：①PM2 逐个（而非全部同时）重启 Worker——先向 Worker 1 发送 SIGINT/SIGTERM 信号；②Worker 1 停止接受新连接（主进程不再分发给它），但已处理的请求继续完成（优雅关闭）；③Worker 1 退出后 PM2 启动新 Worker 1，加载新代码；④新 Worker 就绪后，PM2 对 Worker 2 重复上述过程。这样任何时刻都有 N-1 个 Worker 在服务，用户无感知。对比 `pm2 restart`（全部同时重启，有停机窗口）。生产部署必用 reload 而非 restart。配合 `max_memory_restart` 可在内存超限时自动重启，防止内存泄漏。",
    tags: ["PM2", "cluster", "零停机", "reload", "部署"],
  },
  {
    id: "dnj-testing-deploy-4",
    chapter: "dnj-testing-deploy",
    level: 4,
    question: "Node.js 应用在 Docker 中部署有哪些最佳实践？如何实现优雅关闭？",
    answer:
      "Docker 部署最佳实践：①基础镜像用 node:18-alpine（~50MB vs 完整版 ~900MB），减小镜像体积和攻击面；②多阶段构建——builder 阶段装全部依赖编译，runtime 阶段只复制 dist + 生产依赖（npm ci --omit=dev），最终镜像不含 devDependencies 和源码；③.dockerignore 排除 node_modules、.git、test 等，避免污染构建上下文；④用非 root 用户运行（USER node），安全合规；⑤npm ci 而非 npm install（基于 lock 文件精确安装，更快更可复现）。优雅关闭：①监听 SIGTERM 信号（Docker stop 发送 SIGTERM，等 10s 后 SIGKILL）；②收到 SIGTERM 后：关闭 HTTP server 停止接受新请求（server.close()）、等待正在处理的请求完成、关闭数据库连接和 Redis 连接、清理定时器；③完成后 process.exit(0)。配合 Docker 的 --stop-grace-period 和健康检查（HEALTHCHECK），确保容器在处理完请求后才真正退出。PM2 在 Docker 中需用 `--no-daemon` 前台运行，或将 PM2 去掉直接用 node 启动（Docker 本身就是进程管理器）。",
    tags: ["Docker", "部署", "优雅关闭", "SIGTERM", "最佳实践"],
  },
];
