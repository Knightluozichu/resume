import { PythonAdvancedOfficialLab, type PythonAdvancedCase } from "./official-lab";
const cases: PythonAdvancedCase[] = [
  { label: "版本控制模型", input: "需求与输入", action: "集中式与分布式系统对历史、离线提交和协作拓扑取舍不同", evidence: "版本控制模型的测试与迁移记录", invariant: "集中式与分布式系统对历史、离线提交和协作拓扑取舍不同；无论工具如何，提交应原子、可评审，并把生成制品与秘密排除在源码历史之外。" },
  { label: "Mercurial工作流", input: "版本控制模型", action: "原书用Mercurial、hgwebdir和Apache展示托管、授权与客户端协作", evidence: "Mercurial工作流的测试与迁移记录", invariant: "原书用Mercurial、hgwebdir和Apache展示托管、授权与客户端协作；迁移到Git平台时仍要保留受保护分支、身份、审查和最小写权限。" },
  { label: "持续集成原则", input: "Mercurial工作流", action: "每次变更在干净环境自动构建、测试并报告，失败阻断合并", evidence: "持续集成原则的测试与迁移记录", invariant: "每次变更在干净环境自动构建、测试并报告，失败阻断合并；CI不能依赖开发机缓存，也不能让外部服务偶发失败被当作成功。" },
  { label: "Buildbot流水线", input: "持续集成原则", action: "Buildbot把代码变更触发到worker步骤和结果", evidence: "Buildbot流水线的测试与迁移记录", invariant: "Buildbot把代码变更触发到worker步骤和结果；现代CI语法可以不同，但触发、矩阵、超时、日志、制品和取消语义必须明确。" },
  { label: "代码管理证据", input: "Buildbot流水线", action: "一次合并应能追到提交、审查、测试运行、环境和制品摘要", evidence: "代码管理证据的测试与迁移记录", invariant: "一次合并应能追到提交、审查、测试运行、环境和制品摘要；只保留绿色徽章无法重放失败或证明发布内容。" },
];
export function PyaManagingCodeModelLab(){return <PythonAdvancedOfficialLab title="管理代码与持续集成：执行链" caption="沿需求、实现和证据追踪本章核心。" cases={cases} tone="cyan" />;}
export function PyaManagingCodeBoundaryLab(){return <PythonAdvancedOfficialLab title="管理代码与持续集成：边界" caption="切换单元，比较历史工具与现代迁移边界。" cases={cases} tone="amber" initial={1} />;}
export function PyaManagingCodeEvidenceLab(){return <PythonAdvancedOfficialLab title="管理代码与持续集成：证据" caption="用测试、环境和制品证明结果可重放。" cases={cases} tone="emerald" initial={2} />;}
