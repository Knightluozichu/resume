import type { ReviewQuestion } from "./types";

export const fengCiPipelineQuestions: ReviewQuestion[] = [
  {
    id: "feng-ci-pipeline-1",
    chapter: "feng-ci-pipeline",
    level: 2,
    question: "CI 流水线的典型阶段有哪些？每个阶段的职责是什么？",
    answer:
      "典型五阶段：①Lint——ESLint + Prettier + tsc --noEmit，拦截代码风格和类型错误，最快、最先跑；②Test——Vitest/Jest 运行单元和集成测试，上报覆盖率，验证逻辑正确性；③Build——pnpm build 打包产物，生成 SourceMap，产出可部署物；④Deploy——上传产物到 CDN / 部署到预发环境，冒烟验证；⑤Release——灰度/蓝绿发布到线上，配监控告警，可回滚。每个阶段有明确职责，且前一阶段失败会短路后续阶段（Fail Fast），避免在已有问题的代码上浪费构建和部署资源。阶段间可并行（Lint/Test 无依赖）或串行（Build 依赖 Test 通过）。",
    tags: ["CI", "流水线", "GitHub Actions"],
  },
  {
    id: "feng-ci-pipeline-2",
    chapter: "feng-ci-pipeline",
    level: 3,
    question: "GitHub Actions 中如何实现 CI 流水线的并行与串行编排？",
    answer:
      "GitHub Actions 用 jobs 和 needs 关键字编排：多个无依赖的 job（如 lint 和 test）默认并行运行；需要串行的 job 用 needs 声明依赖（如 build needs: [lint, test]），只有依赖全部成功才触发。同一个 job 内的 step 始终串行。并行加速示例：lint、test、type-check 三个 job 并行，全部通过后 build job 串行触发，build 通过后 deploy job 触发（deploy 可用 if: github.ref == 'refs/heads/main' 限制只 main 分支部署）。还可结合 matrix 策略跨 Node 版本并行测试。缓存（actions/cache）缓存 pnpm store 和构建产物进一步加速。核心原则：无依赖尽量并行，有依赖必须串行，失败短路不浪费资源。",
    tags: ["CI", "GitHub Actions", "编排"],
  },
  {
    id: "feng-ci-pipeline-3",
    chapter: "feng-ci-pipeline",
    level: 3,
    question: "CI 中缓存依赖和构建产物能加速多少？缓存策略应该怎么设计？",
    answer:
      "缓存能显著加速 CI：依赖安装从缓存恢复比全量下载快数倍（pnpm store 缓存命中时安装从分钟级降到秒级）；构建缓存（如 .next/cache、Turbo 远程缓存）可跳过未变更包的重复构建，monorepo 场景提速明显。缓存策略设计：①缓存 key 包含 lock 文件哈希（pnpm-lock.yaml），依赖不变时命中；②restore-keys 用前缀模糊匹配做降级恢复（即使 lock 变了也恢复大部分缓存）；③构建缓存 key 包含源码哈希或 git diff，只重建变更的包；④Turbo 远程缓存让多机器/多分支共享构建结果（同一输入只构建一次）。注意缓存失效要正确——lock 变了必须重新安装，否则用旧依赖测试会产生假通过。缓存是空间换时间，大型项目 CI 从 10 分钟降到 2 分钟是常见的。",
    tags: ["CI", "缓存", "Turborepo"],
  },
  {
    id: "feng-ci-pipeline-4",
    chapter: "feng-ci-pipeline",
    level: 4,
    question: "什么是 CI 的 Fail Fast 原则？为什么它很重要？如何落地？",
    answer:
      "Fail Fast 指「流水线任一阶段失败就立即中止后续阶段，快速反馈给开发者」。它重要的原因：①节省资源——Lint 失败的代码没必要再 Build 和 Deploy，避免浪费 CI 算力和部署资源；②加速反馈——开发者第一时间知道哪里坏了，不用等完整流水线跑完才发现问题，缩短 fix 循环；③防止坏代码进入下游——类型错误或测试失败的代码不应进入构建产物和部署环境。落地方式：①阶段按「快到慢」排序——Lint（秒级）在前，Test（分钟级）次之，Build/Deploy（最慢）在后，让最快的检查最先拦截；②job 间用 needs 串联，前置失败自动跳过后置；③job 内 step 失败默认中止后续 step（bash 命令 set -e）；④失败通知到 PR/IM，标注失败阶段和日志链接。Fail Fast 的本质是「把问题消灭在最早能发现的阶段」。",
    tags: ["CI", "Fail Fast", "工程实践"],
  },
];
