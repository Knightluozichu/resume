import type { ReviewQuestion } from "./types";

export const jfsTestingDeployQuestions: ReviewQuestion[] = [
  {
    id: "jfs-testing-deploy-1",
    chapter: "jfs-testing-deploy",
    level: 2,
    question: "测试金字塔为什么底宽顶窄？倒过来（冰淇淋模型）有什么问题？",
    answer:
      "底宽顶窄是因为越底层测试越快、越便宜、越精准：单元测试毫秒级、隔离运行、失败直接定位到某函数；E2E 秒级甚至分钟级、依赖完整环境、失败要排查整条链路。大量单元测试能快速反馈、低成本覆盖分支；少量 E2E 验证关键路径。倒过来（冰淇淋）的问题：①慢——全跑一遍要几十分钟，开发者不愿频繁跑；②脆——环境/网络/UI 微变就大面积红；③定位难——E2E 失败不知是前端、后端还是数据库的锅；④维护贵——改一个按钮可能要改 20 个 E2E。结果是测试成负担而非保障。",
    tags: ["测试金字塔", "单元测试", "E2E"],
  },
  {
    id: "jfs-testing-deploy-2",
    chapter: "jfs-testing-deploy",
    level: 3,
    question: "Docker 多阶段构建为什么比单阶段镜像更优？",
    answer:
      "单阶段把构建工具（devDependencies、TypeScript 编译器、源码）全打进运行镜像，导致镜像大（动辄 1GB+）、攻击面大（带编译器等多余工具）、拉取慢。多阶段构建分两步：①构建阶段用全量镜像装依赖、编译产物；②运行阶段用精简基础镜像（如 node:18-slim），只 COPY 构建阶段的产物和运行依赖。好处：运行镜像小（几百 MB）、不含源码和构建工具（安全）、拉取和启动快、层缓存友好（依赖不变复用 npm ci 层）。核心思想是「构建环境与运行环境分离」，只让运行环境带必需之物。",
    tags: ["Docker", "多阶段构建", "镜像"],
  },
  {
    id: "jfs-testing-deploy-3",
    chapter: "jfs-testing-deploy",
    level: 3,
    question: "Jest 中 mock 和 spy 有什么区别？测试异步代码要注意什么？",
    answer:
      "mock 是完全替换一个函数为可控的假实现（jest.mock 模块级、mockResolvedValue 指定返回值），让测试不依赖真实外部（数据库、网络）。spy 是「监听」真实函数的调用情况（调用次数、参数）但不替换实现，用 jest.spyOn。区别：mock 替换实现，spy 只观察。测试异步代码：①async 函数用 async/await 等待完成（it 用 async）；②Promise 测试返回 Promise 或用 resolves/rejects 匹配器；③用 jest.useFakeTimers 控制定时器避免真实等待；④确保断言在异步完成后执行，否则测试假绿。mock 要在 afterEach 恢复避免污染其他测试。",
    tags: ["Jest", "mock", "spy", "异步测试"],
  },
  {
    id: "jfs-testing-deploy-4",
    chapter: "jfs-testing-deploy",
    level: 4,
    question: "CI/CD 的核心原则是什么？为什么「测试不绿禁止部署」很重要？",
    answer:
      "CI/CD 核心原则是「每次提交都经过自动化验证并可靠发布」：CI（持续集成）——代码提交自动触发安装、测试、构建，失败则阻断合并；CD（持续部署/交付）——测试全绿自动构建镜像、推送、部署到环境。「测试不绿禁止部署」重要的原因：①防止回归——测试红说明有功能被破坏，强行部署会把 bug 带到生产；②保持主分支始终可发布——若允许红部署，主分支质量逐渐崩坏，随时可能爆；③建立信任——团队相信「能部署的代码是通过验证的代码」。流水线应是「快速失败」：lint→单元测试→构建→集成测试→部署，越早失败越省成本。手动绕过测试部署是 CI/CD 最大的反模式。",
    tags: ["CI/CD", "持续集成", "部署"],
  },
];
