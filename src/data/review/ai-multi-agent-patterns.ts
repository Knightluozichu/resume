/** 复习题库 · 多智能体协作模式（ai-multi-agent-patterns）。AI Agent 开发实战·原创改编多智能体篇第 1 章（篇 4 开篇）。 */

import type { ReviewQuestion } from "./types";

export const aiMultiAgentPatternsQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "ai-map-1",
    chapter: "ai-multi-agent-patterns",
    level: 1,
    question: "什么是多智能体（multi-agent）？一句话说清它在干什么。",
    answer:
      "多智能体是把一个复杂任务**拆给多个各有专长的 Agent 分工协作**来完成，而不是压给单个全能 Agent。它专治「一个 Agent 包揽复杂、跨多领域的大活会**撑不住**」的问题。类比：一个特工忙不过来，就组一支特工小队——研究员、写手、审查各司其职，还有人当主管统筹。",
    tags: ["多智能体", "定义"],
  },
  {
    id: "ai-map-2",
    chapter: "ai-multi-agent-patterns",
    level: 1,
    question:
      "一个 Agent 包揽复杂、跨多领域的大活，会撞上哪三堵墙？这正是多智能体要解决的。",
    answer:
      "三堵墙：① **上下文塞爆**——查资料、写作规范、校对清单啥都往一个上下文窗口塞，很快塞满、关键信息被淹没；② **角色打架**——同一个 Agent 既被要求严谨核对又被要求文笔发散，两套相反人设互相拉扯；③ **难分工**——所有步骤搅成一团，出错难定位、没法对某一环单独优化。解法就是拆成多个专精 Agent。",
    tags: ["多智能体", "动机", "定义"],
  },
  {
    id: "ai-map-3",
    chapter: "ai-multi-agent-patterns",
    level: 1,
    question: "什么是 supervisor（主管制）拓扑？它的控制方式是什么？",
    answer:
      "supervisor 是一种协作拓扑：一个**主管** Agent 负责把大任务**拆成子任务、分派**给下面几个专精 worker，等它们各自干完、**汇报**结果，再由主管**汇总**成最终结果。控制方式是**中心化指挥**——拆、派、汇都归主管统筹，worker 之间互不直接对话。类比：项目经理把活分给组员，再把产出合成交付物。",
    tags: ["supervisor", "拓扑", "定义"],
  },
  {
    id: "ai-map-4",
    chapter: "ai-multi-agent-patterns",
    level: 1,
    question: "什么是 swarm（对等群）拓扑？它和 supervisor 的根本区别在哪？",
    answer:
      "swarm 是一种协作拓扑：多个 Agent **地位对等**、没有中心主管，它们互相**传话、接力**，谁该接手下一步由 Agent 之间**自己商量**决定——是**去中心化**协作。和 supervisor 的根本区别：supervisor 有个中心主管统一拆派汇总（中心化），swarm 没有头儿、由对等 Agent 自己协调（去中心化）。",
    tags: ["swarm", "拓扑", "定义"],
  },
  {
    id: "ai-map-5",
    chapter: "ai-multi-agent-patterns",
    level: 1,
    question: "什么是 pipeline（流水线）拓扑？活是怎么在它里面流动的？",
    answer:
      "pipeline 是把多个 Agent **串成一条线**，上一个 Agent 的输出就是下一个的输入，活沿着线**单向依次流过**（研究 → 写作 → 审查 → 出稿）。像工厂流水线，每个工位只做自己那一道工序，半成品一站站往后传。适合**步骤固定、有清晰先后顺序**的任务。",
    tags: ["pipeline", "拓扑", "定义"],
  },
  {
    id: "ai-map-6",
    chapter: "ai-multi-agent-patterns",
    level: 1,
    question: "什么是角色专精（role specialization）？",
    answer:
      "角色专精是给多智能体系统里的每个 Agent 一个**专门的角色**，配上**专属的提示词**（人设、规矩）和**专属的工具**，让它只管一摊事——研究员只管查、写手只管写、审查只管挑错。各管一摊比一个又查又写又校的全能 Agent **更稳、更可控、更好调试**（上下文干净、人设不打架、出错好定位）。",
    tags: ["角色专精", "定义"],
  },
  // ── L2 理解：分辨 / 解释为什么 ──
  {
    id: "ai-map-7",
    chapter: "ai-multi-agent-patterns",
    level: 2,
    question:
      "为什么多个专精 Agent 会比一个全能 Agent 强？拿「写一篇相机测评」举例。",
    answer:
      "因为**角色专精**让每个 Agent 上下文干净、人设不打架、出错好定位。拿相机测评说：研究员配搜索工具、人设「严谨只摆事实」，写手不给搜索、人设「文笔流畅」，审查人设「挑错核对」——各管一摊。逼一个 Agent 同时严谨又发散，会顾此失彼（脑子塞满资料腾不出手写、刚要核对又得切回发散）；拆开后每个角色都能做到位，整体更稳、也更好查错。",
    tags: ["角色专精", "理解"],
  },
  {
    id: "ai-map-8",
    chapter: "ai-multi-agent-patterns",
    level: 2,
    question:
      "把同一桩活分别用 supervisor、swarm、pipeline 编队，结构上有什么不同？",
    answer:
      "**supervisor**：一个中心主管在上，一对多地拆任务、分派给 worker，再收齐汇总（中心化、一对多）。**swarm**：几个对等 Agent 互相连线、双向传话接力，没有中心、谁接手谁商量（去中心化、对等）。**pipeline**：Agent 串成一条线，单向依次流过、上一个的输出喂给下一个（线性、有先后）。形状不同、谁指挥谁不同、活的流向也不同。",
    tags: ["拓扑", "对比", "理解"],
  },
  {
    id: "ai-map-9",
    chapter: "ai-multi-agent-patterns",
    level: 2,
    question: "为什么说「多 Agent 不是越多越好」？拆成多 Agent 有哪些代价？",
    answer:
      "因为拆成多 Agent 有三笔代价：① **协调开销**——Agent 之间要来回传话、对齐上下文，沟通本身花时间花 token；② **更慢更贵**——跑好几个 Agent，调用次数翻倍，延迟和成本都上去；③ **更难调试**——链路变长、状态分散在多个 Agent 里，出错更难定位。所以只有任务复杂到收益盖得过这些开销时，多 Agent 才划算——**别为多而多**。",
    tags: ["选型", "代价", "理解"],
  },
  {
    id: "ai-map-10",
    chapter: "ai-multi-agent-patterns",
    level: 2,
    question:
      "判断一个任务该用单还是多 Agent，看哪几个维度？分别指向单还是多？",
    answer:
      "看任务的**复杂度、领域跨度、是否需要多种专长/视角**：任务**简单、单领域、一步能完成**（翻译一句话、答常识问题）→ 指向**单 Agent**（更省更快更好调）；任务**复杂、跨多领域、需要不同专长或视角**（写深度报告、跨财务+法务+技术审批）→ 才指向**多 Agent**。核心：简单/单领域用单，复杂/跨多领域/要多视角才用多。",
    tags: ["选型", "判据", "理解"],
  },
  {
    id: "ai-map-11",
    chapter: "ai-multi-agent-patterns",
    level: 2,
    question:
      "本章承接篇 2 单个 Agent 的内容，多智能体是怎么从「单 Agent 撑不住」延伸出来的？",
    answer:
      "篇 2 教的是**单个** Agent 怎么规划、记忆、用工具——一个小特单枪匹马办事。但有些活又大又杂、跨好几个领域（如深度测评要查+写+校），让一个 Agent 全包就会撑不住：上下文塞爆、角色打架、难分工。多智能体正是这个困境的延伸解法：一个 Agent 撑不住，就**组一支专精小队**分工协作。所以本章是「单 Agent → 多 Agent」的自然跨越。",
    tags: ["承接", "多智能体", "理解"],
  },
  {
    id: "ai-map-12",
    chapter: "ai-multi-agent-patterns",
    level: 2,
    question:
      "supervisor 的「中心化」和 swarm 的「去中心化」各有什么适用场景上的取舍？",
    answer:
      "**supervisor（中心化）**：有一个统筹者把活拆开、分下去、再合起来，控制清晰、好汇总，适合需要统一拆派汇总的复杂任务；代价是主管是单点，所有协调都过它。**swarm（去中心化）**：Agent 之间灵活接力、动态决定下一步交给谁，适合任务边界不清、需要随机应变接力的场景；代价是没有中心统筹、流程更难预测和调试。选哪种取决于任务是更需要「统一指挥」还是「灵活接力」。",
    tags: ["supervisor", "swarm", "取舍", "理解"],
  },
  // ── L3 应用：判断 / 套用到场景 / 写代码 ──
  {
    id: "ai-map-13",
    chapter: "ai-multi-agent-patterns",
    level: 3,
    question:
      "（选方案）「做一份新产品上市方案：先市场调研、再写策划文案、最后风控审合规，三步有明确先后」——用单还是多 Agent？若多，选哪种拓扑？",
    answer:
      "用**多 Agent**，且适合 **pipeline（流水线）**。理由：这是**复杂、跨多领域**（调研/文案/风控是三门手艺）的活，值得拆成专精 Agent；而且三步**有明确先后**、上一步产出是下一步输入（调研→文案→风控审），正是 pipeline 的主场——串成一条线依次过工序。（若没有固定先后、而要一个统筹者拆派汇总，则更适合 supervisor。）",
    tags: ["选型", "pipeline", "场景", "应用"],
  },
  {
    id: "ai-map-14",
    chapter: "ai-multi-agent-patterns",
    level: 3,
    question:
      "（选错方案的坑）有人给「把一句话翻译成英文」也派了研究员+写手+审查三个 Agent 的小队。错在哪？该怎么做？",
    answer:
      "错在**该用单 Agent 的简单活硬上了多 Agent**——为多而多。翻译一句话是简单、单领域、一步能完成的活，多 Agent 的协调开销（来回传话、对齐上下文）比活儿本身还大，更慢更贵还更容易出岔子。正解：先看任务**复不复杂、跨不跨领域、要不要多种专长**——简单/单领域/一步完成 → **单 Agent** 就够。只有复杂、跨多领域、要不同视角的活才值得多 Agent。",
    tags: ["选型", "选错坑", "为多而多", "应用"],
  },
  {
    id: "ai-map-15",
    chapter: "ai-multi-agent-patterns",
    level: 3,
    question:
      "（调试）你把一个任务拆成了多个 Agent，可它们各干各的，研究员查的资料写手没收到，最后拼出来的东西自相矛盾。问题出在哪？怎么修？",
    answer:
      "问题出在 Agent 之间**没传清上下文**——只顾着拆分，忘了协作的前提是把该共享的信息、各自的产出在 Agent 间**传递到位**。修法：明确每个 Agent 的**输入和输出**，让上一环的产出确实流到下一环（pipeline 把线串好、supervisor 收齐各 worker 结果再汇总）；别让拆开的 Agent 变成一盘各说各话的散沙。注意这不是「该不该拆」的问题，而是「拆了没接好」。",
    tags: ["上下文传递", "调试", "应用"],
  },
  {
    id: "ai-map-16",
    chapter: "ai-multi-agent-patterns",
    level: 3,
    question:
      "在一段 supervisor 骨架代码里，怎么同时体现「角色专精」和「中心化协调」？",
    answer:
      '① **角色专精**：先定义一组带角色的 named worker，每个配专属提示和工具（`workers = {"researcher": Agent(role="研究员", prompt="只管查资料"), "writer": ..., "reviewer": ...}`），各管一摊。② **中心化协调**：所有的拆、派、汇都由中心的 `supervisor` 函数统筹——`decompose(goal)` 拆活、`for` 循环逐个 `workers[name].run(subtask)` 分派并收集、`synthesize(...)` 汇总，worker 之间互不直接对话。这就是 supervisor 拓扑的代码形态。',
    tags: ["代码", "supervisor", "角色专精", "应用"],
  },
  {
    id: "ai-map-17",
    chapter: "ai-multi-agent-patterns",
    level: 3,
    question:
      "（改代码）把上面 supervisor 骨架改成 pipeline，代码会变成什么样？改成 swarm 呢？",
    answer:
      "**改 pipeline**：不再由中心 supervisor 分派，而是把上一个 worker 的输出**直接喂**给下一个，串成一条线——`out = reviewer.run(writer.run(researcher.run(goal)))`，活单向依次流过。**改 swarm**：去掉中心 `supervisor`，由 worker 之间**自己决定**把活交给谁、动态接力，没有统一的拆派汇总函数。同一支小队，编队方式（拓扑）不同，代码骨架就不同——这正是三种拓扑结构差异落到代码上的样子。",
    tags: ["代码", "拓扑", "改代码", "应用"],
  },
  // ── L4 综合：贯通多个概念 ──
  {
    id: "ai-map-18",
    chapter: "ai-multi-agent-patterns",
    level: 4,
    question:
      "把本章串起来：以「帮我写一篇某款相机的深度测评」为例，讲清为什么该用多 Agent、选哪种拓扑、怎么靠角色专精避免角色打架，并说说在哪种情况下你反而该退回单 Agent。",
    answer:
      "走一遍。**为什么多 Agent**：写深度测评要查一堆资料和参数、写成流畅文章、再回头校对挑错——又复杂又跨多领域。让一个 Agent 全包会撞三堵墙：上下文塞爆（资料+文风规范+校对清单全塞一个窗口）、角色打架（既要严谨核对又要发散行文）、难分工（出错难定位）。所以拆成多 Agent 划算。**选哪种拓扑**：若三步有明确先后（查→写→校）、上一步产出喂下一步，用 **pipeline**；若要一个统筹者把活拆开分派、收齐再汇总，用 **supervisor**（像「动手一」那样：主管拆活→分派给研究员/写手/审查→各自并行干→汇报→主管汇总）。**怎么靠角色专精避免打架**：给研究员配搜索工具+「严谨只摆事实」人设、写手「文笔流畅」人设、审查「挑错核对」人设，**各管一摊、职责不重叠**，上下文干净、人设不拉扯。**何时退回单 Agent**：如果需求缩水成「帮我把这句相机参数翻译成英文」这种简单、单领域、一步能完成的小活，就该退回**单 Agent**——多 Agent 的协调开销盖不过收益，**别为多而多**。**一句话**：复杂跨领域→多 Agent（pipeline/supervisor 编队 + 角色专精避免打架）；简单单领域→单 Agent。",
    tags: ["综合", "多智能体", "拓扑", "角色专精", "选型"],
  },
];
