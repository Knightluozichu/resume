# 《从零构建 AI Agent》写作宪法（book guide）

> 本书专属补充规范。**根法是 `docs/chapter-spec.md`（九段式 + 类型强度矩阵 + 知识点先行）**，本文件只声明 AI Agent 这本书相对根法的「差异」与「全书统一约定」。冲突时：根法的纪律（每知识点必配 viz、Term↔Glossary 一一对应、draft 纪律）不可破；根法里 shader/OpenGL 专属的部分按本文件替换。
>
> 老板硬要求：**少文字、重图、重动画、寓教于乐**。文字只作图与动画的补充说明，不允许大段纯文字堆术语。

---

## 一、全书统一隐喻（必须贯穿，禁止中途换体系）

把大模型想成 **「一位被关在没有窗户的小屋里、绝顶聪明却患有严重失忆症的天才顾问」**。

- 你和它唯一的交流方式：从门缝塞一张纸条进去（**提示 / prompt**）。
- 它读完纸条上的**全部**内容，写一段回复，再从门缝塞出来（**生成 / completion**）。
- 然后它**立刻忘光一切**——下次塞纸条进去，它完全不记得上一次说过什么。
- 它**出不了这间屋子**：不能上网、不能算账、不能查数据库，只会「读纸条→写纸条」。

整本书就是一个故事：**怎么把这位「关在小屋里的失忆天才」改造成一个能在真实世界里把活干完的智能体（Agent）**。每一篇都在给他添一样东西：

| 篇 | 给天才添了什么 | 解决他哪个缺陷 |
|---|---|---|
| 1 认识智能体 | —（先看清他是谁、屋里有什么） | 建立全局认知 |
| 2 驾驭大模型 | 教你把纸条写好 + 控制他下笔的风格 + 让他按格式回话 | 纸条写不好 → 答非所问 |
| 3 让智能体行动 | 给屋子装一部「电话」：他能在纸条上写「请帮我做 X」，我们替他做完把结果塞回去 | 出不了屋、干不了实事 |
| 4 记忆与知识 | 给他一个笔记本（短期）+ 一座可检索的资料库（长期 / RAG） | 失忆、不懂私有知识 |
| 5 规划与反思 | 给他一张待办清单 + 让他养成检查自己作业的习惯 | 大任务无从下手、会犯错不自知 |
| 6 多智能体协作 | 再雇一屋子各有专长的天才，组成团队协同 | 一个人能力有天花板 |
| 7 走向生产 | 让这个团队安全、可观测地在真实世界上岗 | 上线即翻车 |

写作时所有类比优先从这套体系派生（电话 = 工具调用、笔记本 = 上下文、资料库 = 向量库、待办清单 = 规划、团队 = 多智能体）。需要别的比喻时不得与「失忆天才小屋」冲突。

---

## 二、贯穿主线代码项目：`tinyagent`

「从零构建」是真的从零搭一个能跑的最小 Agent 框架，命名 **`tinyagent`**（Python）。每章**增量加一个模块**，到全书结尾它就是一个麻雀虽小五脏俱全的 Agent 框架。读者跟着每章把那一块手搓出来。

每章增量地图（施工时严格按此，保证前后衔接、不重复造轮子）：

| 章 | tinyagent 新增 | 关键 API（示意，可微调但需前后一致） |
|---|---|---|
| 2.1 提示工程 | `messages` 列表 + 角色 | `Message(role, content)` |
| 2.2 采样解码 | `llm()` 封装 + 采样参数 | `llm(messages, temperature, top_p)` |
| 2.3 结构化输出 | JSON/schema 解析 + 容错 | `llm_json(messages, schema)` |
| 3.1 函数调用 | 工具 schema + 工具注册表 | `@tool` 装饰器、`Tool`、`registry` |
| 3.2 ReAct | 主循环 Thought→Action→Observation | `Agent.run(task)` |
| 3.3 工具设计 | 参数校验 + 错误处理 + 沙箱 | `Tool.invoke()` 安全执行 |
| 4.1 短期记忆 | 对话历史 + 窗口压缩 / 摘要 | `Memory.short_term`、`compress()` |
| 4.2 向量检索 | embedding + 相似度 + 向量库 | `embed()`、`VectorStore` |
| 4.3 RAG | chunk→embed→retrieve→augment 管线 | `RAG.retrieve()`、`augment()` |
| 4.4 长期记忆 | 记忆写入 / 检索 / 遗忘 | `Memory.long_term`、`remember()` / `recall()` |
| 5.1 规划 | 目标分解为子任务 | `Planner.plan(goal)` |
| 5.2 推理范式 | 可插拔推理策略（CoT/ReAct/…） | `strategy=` 参数 |
| 5.3 反思 | actor-critic 自检纠错循环 | `Reflector.critique()` |
| 6.1 多智能体 | Agent 可作为另一个 Agent 的工具 | `agent_as_tool()` |
| 6.2 编排 | Supervisor / pipeline / 群聊 编排器 | `Orchestrator` |
| 6.3 通信 | 消息传递 + 共享黑板 | `Blackboard`、`send()` |
| 7.1 框架取舍 | 对比 tinyagent vs LangChain/AutoGen | （无新增，回顾全貌） |
| 7.2 可观测 | trace + token 计数 + eval 钩子 | `@traced`、`Tracer` |
| 7.3 安全 | 注入防护 + 权限 + HITL | `guardrail()`、`require_approval()` |
| 7.4 综合实战 | 用 tinyagent 拼一个完整应用 | 组装全部模块 |

**代码约定**：Python 为主（概念优先，老板拍板）。代码块 ` ```python `，单块 ≤30 行，块间必有解说。**不用 CodeTabs**（本书无双语镜像；除非确需对比「provider A 写法 vs provider B」或「朴素写法 vs tinyagent 封装」才用 CodeTabs）。Provider 调用尽量收敛到 `llm()` 这层薄封装后面，正文讲协议与思想而非某家 SDK 细节，降低过时风险。`sourceUrl: ""`（原创改编），章末 `<Attribution />` 空标签自动渲染。

---

## 三、每章三件套 viz（重图重动画的硬抓手）

每章**至少 3 个 bespoke viz**，按下述配比（难啃概念用动画掰碎是硬要求）：

1. **旗舰动画**（1 个）：用 `useTeachingTimeline`（= 老板说的 animotor.js / anime.js v4）+ `<TimelineControls>` 做**可暂停 / 单步 / 拖进度**的分步动画，把本章最核心的「过程 / 循环 / 数据流」演起来。例：ReAct 循环转圈、RAG 检索管线流动、token 一个个蹦出来、注意力权重点亮。范式见 `src/components/mdx/diagrams/concurrency-vs-parallelism-diagram.tsx`（cpp-concurrency 书）与 `activity-lifecycle-diagram.tsx`。
2. **解剖 / 结构图**（≥1 个）：纯 Server SVG 静态图，把「构造 / 布局 / 分类」画清楚（如 Agent 五大件解剖、消息结构、向量空间、编排拓扑）。注意**遮挡 / 自适应**（见 §四几何硬规则）。
3. **交互件**（≥1 个）：React 受控小部件，让读者**动手调参看变化**（如拖 temperature 看输出分布、滑相似度阈值看检索命中、开关「错误模式」看翻车）。范式见 `demos/rgb-mixer-demo.tsx`、`amdahl-curve-explorer.tsx`（Canvas 交互曲线）。

**组件落位 & 注册**（本书命名空间化，防与并行 -dev/-apps 两本 AI-agent 书撞名，HEL-271）：
- 文件：本书所有 bespoke 组件（静态图 / 动画图 / 交互件 / Canvas）一律放 **`src/components/mdx/ai-agent/<kebab-name>.tsx`** 子目录（不再混进公共 `diagrams/` 或 `mdx/` 根），用子目录隔离路径，避免与既有 90+ 图重名。文件名可保持语义清晰（子目录已隔路径，不强制加前缀）。
- 命名：**组件名 / 导出名 / 在 mdx-components.tsx 的 map key（= `.mdx` 标签名）一律加 `Aa` 前缀**（AI-Agent 书），如 `AaAgentLoopDiagram` / `AaChatbotWorkflowAgentDiagram` / `AaTaskFitExplorer`——因 -dev / -apps 两本并行书会有同名同路径组件，合并 main 时靠 `Aa` 前缀 + `ai-agent/` 子目录避撞。
- 注册：在 `src/components/mdx/mdx-components.tsx` 顶部 `import { AaXxx } from "./ai-agent/<kebab-name>"`，并加进底部 components map 对象（key 即 `.mdx` 标签名，必须带 `Aa` 前缀）。**grep 现有 `AaAgentLoopDiagram` 看 import 行 + map 行两处范式照抄。**
- 客户端组件 `"use client"`；anime.js 必须 `import type { Timeline } from "animejs"` + 运行时 `await import("animejs")` 动态加载（硬规则 2/6，不进公共 bundle）。
- `.mdx` 里直接 `<AaAgentReactLoopDiagram />` 这样用（标签名带 `Aa` 前缀），不传一堆 props（复杂数据写死在组件内）。

**MDX 写作坑（必避，全是踩过的）**：
- 复杂 SVG **一律做成组件**，禁止在 `.mdx` 里内联多行 `<svg>` + 紧邻松散文字（触发 hydration mismatch）。
- JSX 注释**单行**（多行会被 prettier-MDX 损坏成 `{/_ _/}`）。
- 行内 `<Term def="…">词</Term>` 写在**句中**（前有引导词、非行首）；长 def 的 Term 别放段首或 `<Callout>` 内（prettier 会拆成块级）。
- 正文裸 `<` 跟数字 / 空格（如 `<0`）要写成行内 code 或 KaTeX，否则当 JSX 起始报错。
- `<Callout>` 只支持 `type="tip|warn|trap"`（用 `info` 会运行时崩）。
- 数学用 KaTeX（`$…$` / `$$…$$`）；本书多数章 `math:false`，仅 2.2 采样、4.2 向量这类 `math:true`。

---

## 四、几何硬规则（画图 = 必读，违一条打回，见 `svg-diagram-quality` 记忆）

1. 同行多节点 x 用**单一公式** `xs[i]=left + i*(boxW+gap)`，gap ≥ 8px，禁两个独立公式算近似坐标致 rect 互压。
2. viewBox 适应内容：利用率 60~95%（算所有 rect+text 的 union bbox）。
3. 每个 `<text>` 中心落在自己 rect 内，伸进相邻 rect ≤20%；多行文字累计高度算够。
4. 任何 rect 距 viewBox 边 ≥ 12px。
5. 教学图字号 ≥ 10px。
6. 环形布局半径 r ≥ (n×max_label_width)/(2π)+buffer。
7. 客户端动画图：chip / TimelineControls 算在 viewBox 外或外层 div padding；anime.js label 落在「节点点亮完成」时刻防单步 off-by-one。
8. **解剖图 / 流程图特别注意元素遮挡与自适应**：箭头不穿字、卡片不压泳道标签、长中文标签预留宽度。

验收双轨：`pnpm svg-check`（7 维，HIGH=0 才过）+ 主会话真机 preview 截图人工核。**施工 agent 看不到渲染（GPU-blind），静态自检会漏 rect-rect 重叠**——agent 必须用 headless Chrome 自测 getBBox 几何 ≥14px 余量，但最终视觉验收由总监主会话做。

---

## 五、每章交付物清单（施工 agent 对照自检）

- [ ] 章首：知识点清单注释（逐条标 viz 形态 + 是否进 Glossary）+ 类型说明注释
- [ ] 九段式齐全（按类型强度矩阵；A 型重 §3、B 型重 §4、C 型重 §6、D 型重 §6 并排 diff）
- [ ] ≥3 个 bespoke viz（旗舰动画 + 解剖图 + 交互件），全部注册进 mdx-components.tsx
- [ ] 每个 `<Term>` 在章末 `<Glossary>` 有对应 `<GlossaryItem>`（一一对应）
- [ ] tinyagent 该章增量代码（小块、可运行、Python），与 §二地图一致
- [ ] §九 `<Attribution />`（空标签）；frontmatter `sourceUrl: ""`、`draft: true`
- [ ] 复习题库 `src/data/review/<review-slug>.ts`：×4 认知层级（认记/理解/应用/综合），每章 ~16–18 题；新增 review-slug 进 `src/data/review/types.ts` 的 union + CHAPTER_TITLES + 聚合器
- [ ] `pnpm tsc`（或 build）过；headless 自测几何余量 ≥14px；prettier 不破坏 MDX

复习 review-slug 前缀：本书用 **`agt-`**（如 `agt-chatbot-to-agent`）。内容 chapter-slug 不带前缀（= 文件名）。
