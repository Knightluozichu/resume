/** 复习题库 · 并行与编排-工作者：什么时候同时做，什么时候先拆再派（agent-parallelization-and-orchestrator-workers）。《AI 智能体应用开发》第 13 章，改编自 Anthropic《Building effective agents》。 */

import type { ReviewQuestion } from "./types";

export const agentParallelizationAndOrchestratorWorkersQuestions: ReviewQuestion[] =
  [
    {
      id: "agent-pow-1",
      chapter: "agent-parallelization-and-orchestrator-workers",
      level: 1,
      question: "一句话说清：并行化（Parallelization）的核心结构特征是什么？",
      answer:
        "把几个彼此独立、且在开工前就能预先列清的子任务同时跑起来，最后再把结果汇总。关键不是“多人”，而是“子任务预先写死 + 同时执行”。",
      tags: ["并行化", "基础"],
    },
    {
      id: "agent-pow-2",
      chapter: "agent-parallelization-and-orchestrator-workers",
      level: 1,
      question: "Anthropic 把并行分成哪两种常见变体？",
      answer:
        "分片（sectioning）和投票（voting）。分片是把一项任务切成不同的独立部分分别做；投票是把同一题跑多次、聚合多个答案来求更稳的结果。",
      tags: ["并行化", "分片", "投票", "基础"],
    },
    {
      id: "agent-pow-3",
      chapter: "agent-parallelization-and-orchestrator-workers",
      level: 1,
      question: "一句话说清：编排-工作者（Orchestrator-workers）最关键的结构特征是什么？",
      answer:
        "先让编排者读这次具体输入，动态决定要拆成哪些子任务，再派给多个 worker 处理，最后汇总结果。关键不只是“多人协作”，而是“先临场拆活，再派工”。",
      tags: ["编排-工作者", "基础"],
    },
    {
      id: "agent-pow-4",
      chapter: "agent-parallelization-and-orchestrator-workers",
      level: 1,
      question: "什么是编排者（Orchestrator）？它最重要的职责不是哪一件？",
      answer:
        "编排者是先读任务要求，再决定这次该拆哪些子任务、派给谁做、最后怎么汇总的调度者。它最重要的职责不是亲自查资料或亲自写结果，而是把任务拆清楚、边界切明白、避免 worker 重复劳动。",
      tags: ["编排者", "基础"],
    },
    {
      id: "agent-pow-5",
      chapter: "agent-parallelization-and-orchestrator-workers",
      level: 1,
      question: "分片（Sectioning）和投票（Voting）最大的区别是什么？",
      answer:
        "分片是在分工：不同 worker 做不同块；投票是在求稳：多个 worker 做同一题，再聚合判断。前者优化覆盖面与速度，后者优化稳定性与置信度。",
      tags: ["分片", "投票", "基础"],
    },
    {
      id: "agent-pow-6",
      chapter: "agent-parallelization-and-orchestrator-workers",
      level: 1,
      question: "为什么并行和编排-工作者都还是工作流，而不是自主智能体？",
      answer:
        "因为整体骨架仍是人预先设计好的。并行是固定“拆哪几块再一起跑”，编排-工作者是固定“先规划、再派工、再汇总”；模型没有在开放循环里无限制地自己决定总体路径，所以它们仍属于工作流。",
      tags: ["工作流", "边界", "基础"],
    },
    {
      id: "agent-pow-7",
      chapter: "agent-parallelization-and-orchestrator-workers",
      level: 2,
      question: "Anthropic 推荐并行化适用的两个典型目标，用人话概括是什么？",
      answer:
        "第一是提速：独立子任务能同时做，就别串着等；第二是分焦点：复杂任务里有多个独立考量时，让每个 LLM 只盯一个维度，通常比一轮里同时兼顾所有维度更稳。",
      tags: ["并行化", "适用场景", "理解"],
    },
    {
      id: "agent-pow-8",
      chapter: "agent-parallelization-and-orchestrator-workers",
      level: 2,
      question: "并行和链式最大的结构差别是什么？",
      answer:
        "链式的后一步通常依赖前一步输出，所以重点是固定顺序一环扣一环；并行要求子任务彼此独立，重点是几路能否同时开工。判断诀窍：后一步如果要等前一步结果，就更像链式，不适合硬并行。",
      tags: ["并行化", "链式", "理解"],
    },
    {
      id: "agent-pow-9",
      chapter: "agent-parallelization-and-orchestrator-workers",
      level: 2,
      question: "并行和路由最大的结构差别是什么？",
      answer:
        "路由是在入口先判断“该走哪一条固定支线”，通常一次只走其中一条；并行不是选一条，而是把几条预先写死的独立支线同时跑起来。一个是“先分流选路”，一个是“多路并发一起做”。",
      tags: ["并行化", "路由", "理解"],
    },
    {
      id: "agent-pow-10",
      chapter: "agent-parallelization-and-orchestrator-workers",
      level: 2,
      question: "并行和编排-工作者最本质的分界线是什么？",
      answer:
        "子任务能否在写代码时就提前列清。能，而且彼此独立，就是并行；不能，需要先看这次输入内容再决定拆哪些活，就是编排-工作者。两者都可能最后有多路 worker 同时跑，但“子任务是不是预先写死”决定了它们不是同一种模式。",
      tags: ["并行化", "编排-工作者", "理解"],
    },
    {
      id: "agent-pow-11",
      chapter: "agent-parallelization-and-orchestrator-workers",
      level: 2,
      question: "编排-工作者离自主智能体更近，但为什么还没跨过去？",
      answer:
        "因为它只是把“本次拆哪些子任务”交给模型动态决定，整体仍被框在“先规划、再派工、再汇总”的固定脚手架里。真正的自主智能体通常会进入更开放的循环，自行反复决定目标、工具、下一步和停点，路径更难预先约束。",
      tags: ["编排-工作者", "自主智能体", "理解"],
    },
    {
      id: "agent-pow-12",
      chapter: "agent-parallelization-and-orchestrator-workers",
      level: 3,
      question:
        "选型题：每次都固定产出一页竞品卡，内容永远是“价格 / 功能 / 用户评分”三栏。更适合并行还是编排-工作者？为什么？",
      answer:
        "更适合并行。因为子任务是固定且独立的，在写代码时就能提前列清，完全可以三路同时跑，再合并成卡片。硬上编排者只会多一轮规划成本，并不会带来真正的灵活价值。",
      tags: ["选型", "并行化", "应用"],
    },
    {
      id: "agent-pow-13",
      chapter: "agent-parallelization-and-orchestrator-workers",
      level: 3,
      question:
        "选型题：老板只说“帮我判断这个新竞品最大的威胁点”，没指定该查哪些维度。更适合并行还是编排-工作者？为什么？",
      answer:
        "更适合编排-工作者。因为这次到底该拆成定价、渠道、生态、口碑还是留存信号，取决于输入内容，子任务没法一开始固定写死。需要先让编排者读要求，再决定这次派哪些 worker。",
      tags: ["选型", "编排-工作者", "应用"],
    },
    {
      id: "agent-pow-14",
      chapter: "agent-parallelization-and-orchestrator-workers",
      level: 3,
      question:
        "一个团队把“先抽取评论里的痛点，再筛重点功能，再写结论”这三个步骤全并发跑，结果结论经常跑偏。最可能犯了什么错？该怎么改？",
      answer:
        "最可能犯了“把有依赖的步骤硬并行”的错。后两步依赖前一步产出的信息，并不独立，所以不该同时开工。修法是改回链式：先抽痛点，再依据痛点筛重点功能，最后写结论；如果其中某一步内部还能拆独立小块，再在那一步内部做局部并行。",
      tags: ["坑", "并行化", "应用"],
    },
    {
      id: "agent-pow-15",
      chapter: "agent-parallelization-and-orchestrator-workers",
      level: 3,
      question:
        "一个编排-工作者系统里，三个 worker 最后都交回了大量重复资料，汇总器很难收敛。你该优先怀疑哪一层设计出了问题？",
      answer:
        "优先怀疑编排者的拆活质量。通常是子任务边界切得太含糊，没明确每个 worker 负责什么、不负责什么，导致大家重复查同类内容。修法是强化任务定义：写清目标、输出格式、互斥范围，必要时让编排者先产出任务清单再执行。",
      tags: ["编排者", "坑", "应用"],
    },
    {
      id: "agent-pow-16",
      chapter: "agent-parallelization-and-orchestrator-workers",
      level: 4,
      question:
        "有人说：“并行和编排-工作者反正最后都是开多个 worker，同时跑就完了，没必要区分。”用本章框架反驳他，并给出一个更稳的判断顺序。",
      answer:
        "这句话忽略了最关键的分界线：子任务是不是能在开工前预先写死。并行适用于固定且独立的子任务，追求的是速度和分焦点；编排-工作者适用于子任务要看具体输入才能决定的复杂任务，追求的是动态拆活能力。两者虽然最后都可能并发多个 worker，但前者没有“先规划”这一步，后者的价值恰恰就在“先决定这次该派哪些活”。更稳的判断顺序是：先问子任务能否提前列清且相互独立；能，就优先并行。不能，再问是否仍能放进“先规划、再派工、再汇总”的固定骨架；能，就用编排-工作者。连这个骨架都不够时，再考虑自主智能体。",
      tags: ["综合", "工程判断", "边界"],
    },
  ];
