# remuse 项目 Skills 使用指南

项目自带两个 DSH skill，封装了「写章节」和「给章节做可视化组件」两套重复性最高的工作流程。本文说明它们做什么、放在哪、怎么调用。

---

## 一、这两个 skill 是什么

| Skill | 作用 |
|---|---|
| `remuse-chapter` | 撰写 / 打磨一篇 remuse 教学章节（MDX）。封装「总监—施工」章节流程：知识点先行 → 九段式 → 每知识点配 viz → Term/Glossary → draft → 审查 → 老板验收发布。 |
| `remuse-chapter-diagram` | 为章节开发真可视化 SVG 交互组件（取代文字卡片式图解）。封装「分析 → 设计 → 开发 → 集成 → 质量 → 部署」全流程，产出可上线的章节可视化组件。 |

两者的完整指令分别写在 `docs/chapter-spec.md` 与各 SKILL.md 正文里；本文件只解决「怎么让 DSH 加载并使用它们」。

---

## 二、放在哪、DSH 怎么发现它们

为避免内容重复，**`.claude/skills/` 是唯一真实来源**，DSH 通过符号链接读取：

```
.claude/skills/remuse-chapter/SKILL.md            ← 真实文件（唯一来源）
.claude/skills/remuse-chapter-diagram/SKILL.md   ← 真实文件（唯一来源）

.dsh/skills/remuse-chapter         → ../../.claude/skills/remuse-chapter         (符号链接)
.dsh/skills/remuse-chapter-diagram → ../../.claude/skills/remuse-chapter-diagram (符号链接)
```

- DSH 的本地 skill provider 在会话开始时扫描项目根下的 `.dsh/skills`（rank 100）与 `.agents/skills`（rank 200）。`.claude/skills` 是 Claude Code 的约定路径，DSSH 不读，所以靠 `.dsh/skills` 下的相对符号链接桥接过去。
- **改 skill 只需改 `.claude/skills/<name>/SKILL.md` 一处**，Claude Code 与 DSH 两边立即同步生效，无需维护两份。
- 符号链接用相对路径，仓库整体移动后仍然有效。

---

## 三、怎么调用

两个 skill 默认都允许「模型自动调用」和「用户显式调用」（frontmatter 没写 `disable-model-invocation` / `user-invocable`，按默认即 `{ modelInvocable: true, userInvocable: true }`）。两种方式任选：

### 方式 A：让模型自己判断（推荐用于日常）

直接用自然语言描述任务，模型会根据会话开始时注入的 skill 目录（name + description）自行判断是否加载对应 skill。

- 例：说「帮我写 hello-window 这一章」→ 模型读到 `remuse-chapter` 的 description 里提到「新建/完善 content/learn 下的教学章节」，自动加载它再开工。
- 例：说「给 SDS 这一章画个数据结构交互图」→ 匹配 `remuse-chapter-diagram`。

这种方式不强制，依赖模型按 description 匹配；任务描述与 description 关键词对上时更可靠。

### 方式 B：用户显式调用（强制注入，确定性触发）

在对话里输入斜杠 + 完整 kebab 名：

```
/remuse-chapter
/remuse-chapter-diagram
```

- **闭集匹配**：host 扫描用户消息里的词边界 `/name` token，命中已知 skill 名就强制注入完整指令 body；名字写错（如 `/remuse-chater`）就是普通文本，不会猜测。
- **强制触发**：不依赖模型判断，注入后模型按 skill 流程执行。适合「我明确就要走这套流程」的场景。
- 只扫描用户自己发的消息，外部/工具文本不会伪造手势。
- 与「方式 A」可在同一句话里混用：先 `/remuse-chapter` 强制加载，再补充你这章的具体需求。

---

## 四、什么时候用哪个

| 你的目标 | 调用 |
|---|---|
| 新建或打磨一篇章节正文（`.mdx`）：知识点拆解、九段式、配 viz、Term/Glossary、draft | `remuse-chapter` |
| 单独做一个章节用可视化组件：数据结构图 / 架构图 / 流程图 / 时序图，带交互（点击、切换、动画） | `remuse-chapter-diagram` |

两者常配合：先用 `remuse-chapter` 起章节骨架并标记每知识点需要的 viz 形态，再用 `remuse-chapter-diagram` 把其中需要「真可视化」的部分做成可上线组件。

---

## 五、维护 skill 内容

编辑 `SKILL.md` 时遵守的格式契约：

- 文件位置：`.claude/skills/<kebab-name>/SKILL.md`（或 `<kebab-name>.md` 平铺）。
- YAML frontmatter 必填 `name` 与 `description`；`name` 必须是 kebab-case（`^[a-z0-9]+(?:-[a-z0-9]+)*$`）。
- `description` 会进会话目录，建议 ≤500 字符（`catalogDescriptionMaxLength` 默认 500）；完整正文不进目录，按需加载。
- 可选字段：`whenToUse`（额外路由提示）、`disable-model-invocation`（设 true 则仅用户可调，模型目录与 `skill` 工具拒绝加载）、`user-invocable`（设 false 则仅模型可调，用户 `/name` 不触发）。
- 改完即时生效：DSH 本地 provider 监视根目录变化，会自动失效重建目录；无需重启。
