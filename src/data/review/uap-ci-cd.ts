import type { ReviewQuestion } from "./types";

export const uapCiCdQuestions: ReviewQuestion[] = [
  {
    id: "uap-ci-cd-1",
    chapter: "uap-ci-cd",
    level: 1,
    question: "CI 和 CD 分别是什么？Unity 项目的流水线典型有哪几步？",
    answer: "CI（持续集成）：代码提交后自动触发编译和单元测试，快速发现集成错误。CD（持续交付）：CI 通过后自动打包并分发到测试渠道。Unity 项目流水线典型六步：拉代码 → 安装 Unity → 命令行构建（BuildPipeline）→ 跑 UTF 测试 → 出包 → 分发（蒲公英/TestFlight）。开发者只管 push，机器管剩下。",
    tags: ["CI", "CD", "流水线"],
  },
  {
    id: "uap-ci-cd-2",
    chapter: "uap-ci-cd",
    level: 2,
    question: "为什么 Unity CI 必须用 -batchmode -nographics 命令行模式？",
    answer: "CI 服务器通常是无显示器的 Linux/Windows Server，没有 GPU 和图形界面。Unity 默认启动需要 GUI 窗口和 GPU 渲染，服务器上无法运行。`-batchmode` 让 Unity 以无界面模式运行，跳过 GUI 初始化；`-nographics` 禁止 GPU 渲染。这样 Unity 能在纯命令行环境执行构建脚本。注意：batchmode 下不能用 EditorWindow、不能依赖 SceneView，构建脚本必须是纯逻辑的 Editor 方法。",
    tags: ["batchmode", "命令行构建", "CI"],
  },
  {
    id: "uap-ci-cd-3",
    chapter: "uap-ci-cd",
    level: 3,
    question: "CI 流水线跑一次要 40 分钟，团队不愿意等，怎么优化？",
    answer: "1）加缓存：Unity Library 目录缓存（增量编译）、AssetBundle 哈希缓存（未变不重打）；2）并行化：多平台构建并行 job；3）分级流水线：push 只跑编译+单元测试（5 分钟内反馈），nightly 跑全量出包+集成测试；4）增量构建：只构建变化的场景和 AssetBundle。目标：push 级流水线 10 分钟内反馈，nightly 全量保证质量。让开发者快速知道提交是否破坏构建，不等全量。",
    tags: ["CI优化", "缓存", "并行", "分级流水线"],
  },
  {
    id: "uap-ci-cd-4",
    chapter: "uap-ci-cd",
    level: 4,
    question: "自动化测试在 CI 中应该测什么、不测什么？为什么？",
    answer: "应该测：纯逻辑（伤害计算、背包规则、状态机切换）——用 EditMode 测试，快且稳定；核心流程（登录→进场景→战斗→结算）——用 PlayMode 测试，慢但覆盖端到端。不该测：渲染效果（帧率波动不稳定会 flaky）、UI 布局（分辨率差异导致断言不稳）、网络（依赖外部服务不可控）。原则：测试要快（全量<10 分钟）、稳定（不 flaky）、有意义（测断言不测日志）。测试不过不出包，拦截回归 Bug 在 CI 阶段。",
    tags: ["自动化测试", "CI", "测试策略", "综合"],
  },
];
