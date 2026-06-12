# CLAUDE.md

Shader 教学网站（blog.luozichu.ink）。总计划见 PLAN.md，视觉/动效规范见 DESIGN.md，章节模板见 docs/chapter-template.mdx，章节内容规范见 docs/chapter-spec.md（模板是骨架，规范是法律）。

## 协作模式（重要）

本仓库采用「总监—施工」工作流：

- 主会话 Claude = 技术总监 + 代码审查人：拆任务卡（含验收标准）、派施工 subagent、审查每个 commit 的 diff、把关红线
- 实现 = subagent 施工队，或用户本人在 Cursor 中手改
- 每个任务的生命周期：任务卡 → 实现 → `git commit` → 总监 review diff → 通过才算完成
- review 打回的问题在新 commit 中修复，禁止 force-push 改历史
- 用户 = 老板：拍板方向、验收效果

### 任务系统：Linear

- 计划/任务/缺陷全部建在 Linear，任务卡 = Linear issue（描述中含验收标准），commit message 引用 issue 标识（如 `REM-12`）
- 状态流：`Todo → In Progress → In Review（待总监审查）→ Done`；打回 = 回到 In Progress 并留审查评论
- 访问方式：Linear GraphQL API（`https://api.linear.app/graphql`），API key 存于 local.env 的 `LINEAR_API_KEY`，通过 `source local.env` 读取，永不进 git、永不打印到输出
- 章节内容任务用 label `content`，缺陷用 `Bug`，基建用 `infra`
- 资源 ID 速查（避免重复查询）：
  - team Hellsing：`235af1a5-1f1e-4183-a3c1-2a3e9307b78b`（issue 前缀 HEL）
  - project remuse：`ac2574d5-5109-4c2b-9704-aa559ca21f66`
  - states：Todo `1f15c292-1891-4606-ae3e-0042b8522663` / In Progress `9fa2dd5a-1f04-4dab-86cd-a77939d16d07` / In Review `d61d37f7-c941-45d8-af27-20fe219e2786` / Done `ce01e9e2-e8a9-4814-9dce-808629e4f1d4`
  - labels：infra `bb7993b2-2c52-4e13-a746-b91069d7531b` / content `614b8169-bd2a-48f7-8ed4-89a23432e2f3` / Bug `107fd4be-6f67-43c9-ae91-12e59736df40`
  - milestones：M0 `2ac95bdb-f24f-46b7-aa37-ca78d6e18047` / M1 `7f0b9d7f-e226-4116-8f96-0aa951251324` / M2 `3e10102b-e125-4f33-ba2c-0d6cdaa72553` / M3 `18706c00-3013-4321-ad14-d820d7b83f4f` / M4 `23e4912e-a07b-44d3-b6b1-5a9788470ea8` / M5 `927403ed-1bd7-4100-9bbb-655e77f0c7d4` / M6 `2194b298-de95-4df0-bf0f-b2f931af0e93`

## 命令

- 开发：`pnpm dev`（M0 脚手架后生效）
- 构建：`pnpm build`
- 部署：`./deploy.sh`（M1 后生效）

## 硬规则（违反任意一条 = review 必打回）

1. `local.env` 永不进 git、永不被 import 进任何客户端代码；服务器密钥只在部署脚本中以环境变量读取
2. 所有 WebGL/Canvas 组件一律 `next/dynamic` + `ssr: false` + 懒加载；除首页 Hero 外禁止进入首屏关键路径
3. 单个 3D 模型资源压缩后 ≤ 3MB，引入前必须经 gltf-transform（Draco + KTX2）处理
4. 改编章节必须包含 `<Attribution>` 出处声明（LearnOpenGL，CC BY-NC 4.0）
5. 颜色 / 间距 / 动效时长只准使用 DESIGN.md 定义的 token，禁止魔法数字
6. three.js 相关 import 必须可被 code-split，禁止在公共 layout 中静态 import
7. 章节 frontmatter `draft: false` 必须经总监 review 通过后才能设置
8. 章节内容必须逐节满足 docs/chapter-spec.md 的约束（按章节类型调强度矩阵），任一节 fail = 打回

## 技术栈

Next.js App Router + TypeScript + Tailwind CSS + React Three Fiber + MDX + shiki + KaTeX。
纯静态（SSG），无数据库。评论后期用 giscus。

## 目录结构

（M0 脚手架生成后由总监更新本节）
