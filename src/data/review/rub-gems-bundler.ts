import type { ReviewQuestion } from "./types";

/** Ruby 基础教程 · Gems 与 Bundler 复习题 */
export const rubGemsBundlerQuestions: ReviewQuestion[] = [
  {
    id: "rub-gems-bundler-1",
    chapter: "rub-gems-bundler",
    level: 1,
    question: `什么是 Gem？什么是 Bundler？它们各自的作用是什么？`,
    answer:
      `**Gem**：Ruby 的标准包格式（.gem 文件）。每个 Gem 是一个打包好的 Ruby 库。\`gem install rails\` 安装到系统。RubyGems.org 是官方仓库。\n\n**Bundler**：Ruby 的依赖管理工具。通过 Gemfile 声明项目依赖，\`bundle install\` 安装并生成 Gemfile.lock 锁定版本。\n\n区别：\n- Gem 是**包本身**——安装、卸载、查询\n- Bundler 是**项目管理**——声明依赖、锁定版本、保证一致性\n\n类比：Gem 是\"应用\"，Bundler 是\"采购清单+版本锁\"。没有 Bundler，不同机器可能装不同版本的 Gem，导致行为不一致。`,
    tags: ["Gem", "Bundler", "包管理"],
  },
  {
    id: "rub-gems-bundler-2",
    chapter: "rub-gems-bundler",
    level: 2,
    question: `解释 \`~> 7.0.4\` 版本约束允许哪些版本，不允许哪些。\`~>\` 叫什么？`,
    answer:
      `\`~> 7.0.4\` 是**悲观约束（Pessimistic Version Constraint）**，等价于 \`>= 7.0.4 且 < 7.1.0\`。\n\n允许的版本：\n- 7.0.4（下界）\n- 7.0.5、7.0.99（最后一个数字位可递增）\n\n不允许的版本：\n- 7.0.3（低于下界）\n- 7.1.0（上界，前一位递增）\n- 8.0.0\n\n规则：\`~> X.Y.Z\` 允许 Z 递增，禁止 Y 和 X 递增。\n\n对比其他约束：\n- \`~> 7.0\` = \`>= 7.0 且 < 8.0\`（允许 Y 递增）\n- \`~> 7\` = \`>= 7 且 < 8\`\n- \`>= 7.0.4\` = 无上界（3.0 也允许——危险）\n- \`= 7.0.4\` = 精确版本（太严格）\n\n最佳实践：用 \`~> X.Y\`（允许小版本升级，避免大版本破坏性变更）。`,
    tags: ["悲观约束", "~>", "版本管理"],
  },
  {
    id: "rub-gems-bundler-3",
    chapter: "rub-gems-bundler",
    level: 3,
    question: `为什么 \`Gemfile.lock\` 应该提交到 git？什么时候应该更新它？`,
    answer:
      `**应该提交 Gemfile.lock 的原因**：\n1. **可重现构建**：团队每个人、CI、部署环境用完全相同的 gem 版本\n2. **版本一致性**：lock 记录精确版本和完整依赖树\n3. **安全审计**：审查项目用了哪些 gem 的哪些版本\n4. **部署稳定性**：\`bundle install --deployment\` 严格按 lock 安装\n\n**应该更新 lock 的情况**：\n1. 修改 Gemfile（添加/删除/改版本约束）后 \`bundle install\`\n2. 主动升级 gem：\`bundle update rails\`\n3. 安全补丁：\`bundle update --patch\`\n4. Ruby 版本变更\n\n**不应该更新的情况**：\n- 部署环境中——用 \`--deployment\` 禁止修改\n- 不相关变更的 PR 中——lock 变更应独立提交\n\n更新 lock 后必须运行完整测试套件，验证版本升级没破坏功能。`,
    tags: ["Gemfile.lock", "git", "版本锁定"],
  },
  {
    id: "rub-gems-bundler-4",
    chapter: "rub-gems-bundler",
    level: 4,
    question: `为什么应该用 \`bundle exec rspec\` 而不是直接 \`rspec\`？不用 bundle exec 会有什么问题？`,
    answer:
      `直接运行 \`rspec\` 可能用**系统安装的 rspec 版本**，而非 Gemfile.lock 锁定的版本。版本不一致可能导致测试行为不同——\"我这能跑 CI 上报错\"。\n\n\`\`\`bash\n# 不用 bundle exec（可能用错版本）\nrspec                    # 可能用系统 rspec 3.12\n\n# 用 bundle exec（保证用 lock 版本）\nbundle exec rspec        # 用 Gemfile.lock 中的 rspec 3.10.0\n\`\`\`\n\n**bundle exec 的工作原理**：\n1. 读取 Gemfile.lock 获取精确版本\n2. 修改 $LOAD_PATH 和 $GEM_PATH，只加载 lock 中的 gem 版本\n3. 执行命令\n\n**替代方案**：\n- \`bundle binstubs rspec\` 生成 \`bin/rspec\` 脚本，之后直接 \`bin/rspec\`\n- 用 \`rbenv\` 或 \`rvm\` 配合 \`bundler\` 插件自动激活正确版本\n\n核心：版本一致性是可靠构建的基础。bundle exec 是保证这一点的标准方式。`,
    tags: ["bundle exec", "版本一致性", "部署"],
  },
];
