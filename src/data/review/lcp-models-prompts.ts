import type { ReviewQuestion } from "./types";

export const lcpModelsPromptsQuestions: ReviewQuestion[] = [
  {
    id: "lcp-models-prompts-1",
    chapter: "lcp-models-prompts",
    level: 1,
    question: "Model I/O 的三个阶段是什么？它们如何组成完整的模型调用流程？",
    answer:
      "Model I/O 三阶段：①Prompts（提示模板）——将用户输入和变量填充到模板中，格式化为模型可理解的提示文本。PromptTemplate 处理单轮文本，ChatPromptTemplate 处理多角色对话，FewShotPromptTemplate 提供少样本示例。②Models（模型调用）——通过统一的 invoke 接口调用 LLM 或 ChatModel。LLM 接收纯文本返回文本，ChatModel 接收 Message 列表返回 AIMessage。支持 OpenAI、Anthropic 等多种提供商。③Output Parsers（输出解析）——将模型返回的原始文本解析为结构化数据。StrOutputParser 返回纯字符串，JsonOutputParser 解析 JSON，PydanticOutputParser 解析并验证为 Pydantic 对象。流程：输入变量 → PromptTemplate 格式化 → Model 调用 → OutputParser 解析 → 结构化结果。LCEL 中用管道符连接：prompt | model | parser。",
    tags: ["Model I/O", "三阶段", "调用流程"],
  },
  {
    id: "lcp-models-prompts-2",
    chapter: "lcp-models-prompts",
    level: 2,
    question: "LLM 和 ChatModel 有什么区别？在什么场景下应该选择哪种模型类型？",
    answer:
      "LLM 和 ChatModel 的区别：①LLM（文本补全模型）——接口为 predict/invoke，输入是纯文本字符串，输出是纯文本字符串。适合单轮补全任务如摘要、翻译、文本生成。②ChatModel（对话模型）——接口为 predict/invoke，输入是 Message 列表（SystemMessage/HumanMessage/AIMessage），输出是 AIMessage 对象。适合多轮对话、角色扮演、Function Calling。选择场景：简单单轮任务（如翻译一段文本）可用 LLM，但现代 LLM 提供商已普遍转向 ChatModel 接口。多轮对话、需要系统提示设定角色、需要 Function Calling/Tool Calling、需要结构化输出时必须用 ChatModel。实际开发中推荐统一使用 ChatModel，因为它功能更完整、兼容性更好，且 LangChain 对 ChatModel 的支持更完善。",
    tags: ["LLM", "ChatModel", "模型选择"],
  },
  {
    id: "lcp-models-prompts-3",
    chapter: "lcp-models-prompts",
    level: 2,
    question: "PromptTemplate、ChatPromptTemplate 和 FewShotPromptTemplate 各自的用途是什么？如何创建？",
    answer:
      "三种提示模板的用途和创建方式：①PromptTemplate——用于单轮文本提示。通过 from_template 方法快速创建：PromptTemplate.from_template(\"翻译以下文本为英文：{text}\")。变量用花括号标记，format 时填充。适合简单的文本补全任务。②ChatPromptTemplate——用于多角色对话提示。通过 from_messages 方法创建：ChatPromptTemplate.from_messages([(\"system\", \"你是翻译助手\"), (\"human\", \"翻译：{text}\")])。支持 SystemMessage/HumanMessage/AIMessage 三种角色，还可以用 MessagesPlaceholder 插入动态历史对话。适合对话型应用和多轮交互。③FewShotPromptTemplate——用于少样本示例提示。提供多个输入-输出对作为示例，引导模型按示例格式和风格生成。通过指定 example_prompt、examples、prefix、suffix 组装。适合需要特定输出格式或风格引导的场景，如情感分析、信息抽取。",
    tags: ["PromptTemplate", "ChatPromptTemplate", "FewShot", "模板创建"],
  },
  {
    id: "lcp-models-prompts-4",
    chapter: "lcp-models-prompts",
    level: 3,
    question: "如何使用 PydanticOutputParser 实现结构化输出？它相比 JsonOutputParser 有什么优势？",
    answer:
      "PydanticOutputParser 使用步骤：①定义 Pydantic 模型——创建 Pydantic BaseModel 子类，声明字段名、类型和描述。②创建解析器——PydanticOutputParser(pydantic_object=MyModel)，解析器会自动生成格式说明。③注入提示——parser.get_format_instructions() 返回格式说明文本，注入到提示模板中告诉模型如何输出。④解析输出——模型返回文本后，parser.parse(output) 解析为 Pydantic 对象，自动验证类型和字段。相比 JsonOutputParser 的优势：①类型验证——Pydantic 自动验证字段类型（如 int/str/List），类型不符会报错。②字段约束——支持 min_length/max_length/ge/le 等约束，确保数据质量。③描述文档——字段描述自动注入提示，模型更清楚每个字段的含义。④错误处理——解析失败时提供清晰错误信息，配合 with_fallbacks 可自动重试。⑤嵌套模型——支持嵌套 Pydantic 模型，处理复杂结构化数据。",
    tags: ["OutputParser", "Pydantic", "结构化输出", "类型验证"],
  },
];
