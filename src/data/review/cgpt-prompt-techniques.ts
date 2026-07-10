import type { ReviewQuestion } from "./types";

export const cgptPromptTechniquesQuestions: ReviewQuestion[] = [
  {
    id: "cgpt-prompt-techniques-1",
    chapter: "cgpt-prompt-techniques",
    level: 1,
    question: `Zero-shot、Few-shot、CoT 三种提示技巧有什么区别？分别适合什么场景？`,
    answer:
      `①Zero-shot 零样本——直接提问不给示例，依赖模型自身能力，适合简单任务和强模型，优点是省 token。②Few-shot 少样本——给几个输入输出示例，让模型照着格式和模式回答，适合需要特定输出格式或模式的任务，如分类、信息抽取。③CoT 思维链——引导模型「一步步思考」，展开中间推理过程，适合数学、逻辑、多步推理任务，能显著提升复杂推理准确率。区别本质：Zero-shot 靠能力，Few-shot 靠示范，CoT 靠推理展开。复杂任务常组合：Few-shot + CoT 既给示范又引导推理。`,
    tags: ["Zero-shot", "Few-shot", "CoT", "提示技巧"],
  },
  {
    id: "cgpt-prompt-techniques-2",
    chapter: "cgpt-prompt-techniques",
    level: 2,
    question: `ReAct 模式是如何工作的？它解决了什么问题？`,
    answer:
      `ReAct（Reasoning + Acting）让模型交替进行推理和行动：①Thought 推理——模型思考下一步该做什么。②Action 行动——调用外部工具（搜索、计算、API）。③Observation 观察——把工具返回结果加入上下文。循环直至得出答案。解决的问题：纯推理模型知识有截止日期、不能实时计算、不能操作外部系统；ReAct 把外部工具作为模型的「手眼」，让模型能用搜索引擎查最新信息、用计算器精确计算、用 API 操作系统。本质是把「推理」和「行动」结合，是现代 Agent 的基础范式。`,
    tags: ["ReAct", "推理行动", "工具调用", "Agent"],
  },
  {
    id: "cgpt-prompt-techniques-3",
    chapter: "cgpt-prompt-techniques",
    level: 2,
    question: `自洽（Self-Consistency）的原理是什么？它以什么换什么？`,
    answer:
      `自洽原理：对同一问题用较高温度多次采样，生成多条不同的推理路径和答案，然后对最终答案投票，选出现次数最多（最常见）的答案。基于洞察：正确答案往往比错误答案更多样化路径都能达到，而错误答案路径较单一。它以「算力」换「准确率」——多采样多推理必然消耗更多 token 和时间，但能消除单次采样的随机误差，在数学和推理任务上稳定提分。代价是成本和延迟上升，适合对准确率要求高、对延迟不敏感的场景。`,
    tags: ["自洽", "Self-Consistency", "多采样投票"],
  },
  {
    id: "cgpt-prompt-techniques-4",
    chapter: "cgpt-prompt-techniques",
    level: 3,
    question: `提示工程的四原则是什么？如何系统性地优化一个提示？`,
    answer:
      `四原则：①明确具体——角色 + 任务 + 约束 + 输出格式都写清楚，消除歧义。②结构清晰——用分隔符划分输入、分点列举、模板化，让模型不混淆指令和数据。③引导推理——复杂任务先拆解再 CoT 逐步推理，避免直接要答案。④迭代优化——改提示、测试、对比、沉淀最佳实践。系统优化流程：从最简提示开始 → 加角色和格式约束 → 用 Few-shot 示范 → 复杂任务加 CoT → 多组对比测准确率 → 边界 case 测鲁棒性 → 沉淀为模板。提示工程是经验学科，没有银弹，靠迭代逼近最优。`,
    tags: ["提示工程", "四原则", "迭代优化"],
  },
];
