import type { ReviewQuestion } from "./types";

export const laePromptEngineeringQuestions: ReviewQuestion[] = [
  {
    id: "lae-prompt-engineering-1",
    chapter: "lae-prompt-engineering",
    level: 1,
    question: "结构化提示词包含哪五个要素？它们各自的作用是什么？",
    answer:
      "结构化提示词包含五个要素：①指令（Instruction）——明确任务要求，如\"翻译以下文本为英文\"，告诉模型做什么。②上下文（Context）——提供背景信息、领域知识和约束条件，帮助模型理解任务场景。③示例（Examples）——提供输入-输出对展示期望格式和风格，即Few-shot引导。④输入（Input）——待处理的具体数据，如用户问题或原始文本。⑤输出格式（Output Format）——指定输出为JSON/Markdown等结构化格式，便于程序解析。五要素并非每次都用齐，简单任务可能只需指令+输入。核心原则：明确具体、结构化、给示例、控制输出格式。",
    tags: ["提示词结构", "五要素", "结构化"],
  },
  {
    id: "lae-prompt-engineering-2",
    chapter: "lae-prompt-engineering",
    level: 2,
    question: "零样本、少样本、思维链和角色扮演四种提示技术各自的特点和适用场景是什么？",
    answer:
      "四种提示技术：①零样本（Zero-shot）——仅给指令不给示例，依赖模型已有能力。特点：快速低成本。适合：简单任务、模型已具备的能力。②少样本（Few-shot）——提供几个输入-输出示例。特点：稳定可控，示例即\"微调\"。适合：需要特定格式或风格的任务。③思维链（CoT）——要求\"一步步思考\"，展示推理过程。特点：深度准确。适合：数学推理、逻辑分析等复杂推理任务。④角色扮演——设定\"你是资深专家\"等人设。特点：专业深入。适合：需要领域专业知识的任务。选择原则：从简单到复杂递进——先试零样本，不满足加少样本，推理任务加CoT，需要专业知识用角色扮演。",
    tags: ["提示技术", "零样本", "少样本", "CoT", "角色扮演"],
  },
  {
    id: "lae-prompt-engineering-3",
    chapter: "lae-prompt-engineering",
    level: 2,
    question: "温度（temperature）和top_p参数如何控制模型输出？在实际应用中如何选择？",
    answer:
      "温度（temperature）控制概率分布的\"尖锐度\"：温度趋近0时，模型几乎总是选概率最高的Token，输出确定性强、创造性低；温度高时，概率分布变平缓，低概率Token也有机会被选中，输出随机性强、创造性高。top_p（核采样）是另一种控制方式：只从累计概率超过p的Token集合中采样，p=0.1只考虑最可能的少数Token，p=0.9考虑更广泛的Token。选择原则：①事实性任务（翻译、摘要、信息提取）用低温度（0-0.3），追求准确一致。②创意性任务（写作、头脑风暴）用较高温度（0.7-1.0），追求多样性。③一般对话用中等温度（0.5-0.7）平衡准确和自然。④通常只调温度或top_p之一，不要同时调。",
    tags: ["温度", "top_p", "生成参数", "输出控制"],
  },
  {
    id: "lae-prompt-engineering-4",
    chapter: "lae-prompt-engineering",
    level: 3,
    question: "什么是自一致性（Self-Consistency）和ReAct模式？它们如何提升复杂任务的解决效果？",
    answer:
      "自一致性（Self-Consistency）：对同一问题用思维链生成多个不同答案（通过高温度采样），然后取多数投票作为最终答案。原理：正确推理路径更可能被多次独立到达。适合数学推理等有确定答案的任务，显著降低随机错误。ReAct（Reasoning+Acting）：让模型交替进行\"思考-行动-观察\"循环——先思考分析当前状态，再选择并调用工具行动，然后观察工具返回结果，循环直至任务完成。优势：结合了推理的规划能力和工具的执行能力，模型可以搜索信息、执行代码、查询数据库。两种技术互补：自一致性提升单步推理的可靠性，ReAct扩展模型的能力边界到多步骤多工具任务。实际应用中，复杂Agent系统常同时使用这两种技术。",
    tags: ["自一致性", "ReAct", "进阶技巧", "复杂任务"],
  },
];
