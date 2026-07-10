import type { ReviewQuestion } from "./types";

export const blaPromptEngineeringQuestions: ReviewQuestion[] = [
  {
    id: "bla-prompt-engineering-1",
    chapter: "bla-prompt-engineering",
    level: 1,
    question: `提示结构四要素分别是什么？它们如何影响 LLM 的输出质量？`,
    answer:
      `提示结构四要素：①指令——告诉模型做什么（翻译/总结/分析/角色设定），指令越明确具体，输出越可控。②上下文——提供背景信息（检索文档/历史对话/领域知识），上下文越充分，回答越准确。③示例——展示期望输出（Few-shot输入输出对），示例越贴切，格式和风格越稳定。④输出格式——指定返回结构（JSON/列表/表格），格式约束越清晰，程序化处理越容易。四要素协同影响输出质量：缺失指令导致答非所问，缺失上下文导致幻觉，缺失示例导致格式不稳定，缺失格式约束导致无法程序化对接。`,
    tags: ["提示结构", "四要素", "输出质量"],
  },
  {
    id: "bla-prompt-engineering-2",
    chapter: "bla-prompt-engineering",
    level: 2,
    question: `Zero-shot、Few-shot 和 CoT 三种策略分别适合什么场景？请举例说明。`,
    answer:
      `三种策略的适用场景：①Zero-shot——直接给指令不给示例，适合简单任务和能力强的模型。例如「将以下英文翻译为中文：Hello World」，模型预训练已具备翻译能力，无需示例。优点是零成本，缺点是输出格式不稳定。②Few-shot——给2-5个输入输出示例引导输出风格，适合格式控制和风格模仿。例如给3个「情感分析：文本→正面/负面」的示例，模型就能按相同格式输出。优点是格式稳定，缺点是消耗token。③CoT——引导模型逐步推理（「让我们一步一步思考」），适合数学推理、逻辑分析和多步任务。例如数学题「小明有5个苹果，吃了2个，又买了3个，还剩几个？」用CoT让模型列出计算步骤。优点是推理准确率大幅提升，缺点是输出更长、成本更高。`,
    tags: ["提示策略", "Zero-shot", "Few-shot", "CoT"],
  },
  {
    id: "bla-prompt-engineering-3",
    chapter: "bla-prompt-engineering",
    level: 2,
    question: `ReAct 策略的推理-行动循环是如何工作的？它与 Agent 有什么关系？`,
    answer:
      `ReAct（Reasoning + Acting）的推理-行动循环：①Thought（思考）——LLM分析当前状态和任务，推理下一步该做什么。②Action（行动）——根据推理结果选择并调用工具（搜索/计算/API/代码执行）。③Observation（观察）——获取工具返回的结果。④循环——将观察结果反馈给LLM，进入下一轮Thought，直到任务完成。例如用户问「今天北京天气如何」，ReAct循环：Thought「需要查询天气」→Action「调用天气API」→Observation「北京25度晴」→Thought「已获得答案」→输出「北京今天25度晴天」。ReAct与Agent的关系：ReAct是Agent的基础范式，Agent就是基于ReAct循环实现的自主智能体。Agent在ReAct基础上增加了记忆、规划、错误处理等能力，但核心推理循环仍是Thought-Action-Observation。`,
    tags: ["ReAct", "推理循环", "Agent"],
  },
  {
    id: "bla-prompt-engineering-4",
    chapter: "bla-prompt-engineering",
    level: 3,
    question: `如何通过温度参数调控 LLM 的输出？不同任务应该用什么温度？`,
    answer:
      `温度（Temperature）控制LLM输出的随机性，通过调整softmax的概率分布来调控：①温度=0——确定性输出，每次结果相同，适合事实问答、数据提取、代码生成等需要准确性的任务。②温度=0.3-0.5——低随机性，输出基本稳定但有轻微变化，适合总结、翻译、分类等任务。③温度=0.7-1.0——中等随机性，输出有多样性但保持连贯，适合对话、创意写作、头脑风暴等任务。④温度>1.0——高随机性，输出高度发散甚至不连贯，适合发散思考、创意激发但质量不可控。调控原则：事实性任务用低温度（0-0.3）确保准确；创造性任务用高温度（0.7-1.0）增加多样性；结构化输出任务用温度0确保格式稳定。实际项目中需结合A/B测试找到最佳温度值。同时注意：温度与top-p（核采样）常配合使用，两者共同调控输出质量。`,
    tags: ["温度参数", "输出调控", "最佳实践"],
  },
];
