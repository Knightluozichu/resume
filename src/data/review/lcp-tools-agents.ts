import type { ReviewQuestion } from "./types";

export const lcpToolsAgentsQuestions: ReviewQuestion[] = [
  {
    id: "lcp-tools-agents-1",
    chapter: "lcp-tools-agents",
    level: 1,
    question: `Agent 的 ReAct 执行循环是什么？AgentExecutor 如何控制这个循环？`,
    answer:
      `ReAct（Reason + Act）执行循环：①Thought（思考）——Agent（LLM）分析当前输入和已有观察，推理下一步该做什么。②Action（行动）——选择一个工具并构造工具调用参数。③Observation（观察）——执行工具，获取工具返回的结果。④循环——将观察结果反馈给 Agent，继续思考-行动-观察，直到 Agent 判断任务完成，输出最终答案。AgentExecutor 控制机制：①最大迭代次数——max_iterations 参数限制最大循环轮次，防止无限循环。默认通常设 10-15。②提前停止——early_stopping_method 设为 \"generate\" 时，达到最大轮次后让 LLM 生成最终答案而非直接截断。③错误处理——handle_parsing_errors 处理 LLM 输出格式错误，自动重试或返回错误信息。④回调支持——每步执行可通过 Callbacks 记录日志和追踪。⑤返回中间步骤——return_intermediate_steps=True 返回每步的 Thought/Action/Observation，便于调试。`,
    tags: ["ReAct", "执行循环", "AgentExecutor"],
  },
  {
    id: "lcp-tools-agents-2",
    chapter: "lcp-tools-agents",
    level: 2,
    question: `如何在 LangChain 中定义和创建自定义工具？Tool 的关键属性是什么？`,
    answer:
      `定义自定义工具的两种方式：①@tool 装饰器——from langchain.tools import tool，用 @tool 装饰一个函数，函数文档字符串作为工具描述。可以指定参数 schema：@tool(args_schema=MySchema)。②继承 BaseTool——创建 BaseTool 子类，实现 _run 方法（同步）和 _arun 方法（异步），定义 name、description 和 args_schema。Tool 的关键属性：①name——工具名称，Agent 用此名称选择工具，需唯一且简洁。②description——工具描述，告诉 Agent 什么时候用这个工具、它能做什么。描述质量直接影响 Agent 的工具选择准确性，应包含用途、输入格式、输出格式。③args_schema——Pydantic 模型定义参数 schema，包括参数名、类型、描述和约束，Agent 据此构造调用参数。④return_direct——是否直接返回工具输出作为最终答案，跳过 LLM 二次处理。最佳实践：描述要清晰具体，参数 schema 要有明确类型和约束，复杂工具拆分为多个简单工具。`,
    tags: ["Tool", "自定义工具", "@tool", "BaseTool"],
  },
  {
    id: "lcp-tools-agents-3",
    chapter: "lcp-tools-agents",
    level: 2,
    question: `ReAct Agent、OpenAI Functions Agent 和 Tool Calling Agent 有什么区别？生产环境应选哪种？`,
    answer:
      `三种 Agent 类型区别：①ReAct Agent——基于文本解析的 ReAct 循环，LLM 输出包含 Thought/Action/Action Input 文本，通过正则解析提取工具调用。通用性强，支持所有模型，但解析可能出错、轮次多、Token 消耗大。②OpenAI Functions Agent——利用 OpenAI Function Calling 原生能力，模型直接输出结构化函数调用，无需文本解析。高效稳定，输出可靠，但仅依赖 OpenAI 兼容模型支持。③Tool Calling Agent——新一代统一接口，通过 model.bind_tools(tools) 绑定工具，模型直接输出工具调用消息。支持更多模型（OpenAI/Anthropic/Gemini 等），支持并行工具调用，是 LangChain 推荐的现代写法。生产环境推荐 Tool Calling Agent：①结构化输出可靠，无解析错误。②支持多模型切换，不被供应商锁定。③支持并行工具调用，效率更高。④LangChain 官方主推，持续维护和优化。⑤与 LangGraph 深度集成，支持复杂流程编排。`,
    tags: ["ReAct", "OpenAI Functions", "Tool Calling", "Agent选择"],
  },
  {
    id: "lcp-tools-agents-4",
    chapter: "lcp-tools-agents",
    level: 3,
    question: `设计一个能搜索网页、执行代码和查询数据库的研究助手 Agent，描述其完整实现方案。`,
    answer:
      `研究助手 Agent 完整方案：①工具定义——a) 搜索工具：用 DuckDuckGoSearchRun 或 TavilySearchResults 进行网页搜索。b) 代码执行工具：用 PythonREPLTool 执行 Python 代码进行数据分析。c) 数据库工具：用 SQLDatabaseToolkit 连接数据库，支持自然语言查询 SQL。每个工具用 @tool 定义清晰描述。②模型选择——ChatOpenAI(model=\"gpt-4o\", temperature=0) 确保推理稳定。③Agent 创建——用 create_tool_calling_agent(llm, tools, prompt) 创建 Tool Calling Agent。系统提示设定角色：\"你是一个研究助手，能搜索信息、分析数据和查询数据库。一步步思考，必要时使用工具。\"。④执行器——agent_executor = AgentExecutor(agent=agent, tools=tools, max_iterations=15, handle_parsing_errors=True, return_intermediate_steps=True, verbose=True)。⑤记忆——添加 ConversationBufferWindowMemory(k=5) 支持多轮研究对话。⑥安全措施——PythonREPL 沙箱隔离、SQL 只读权限、搜索结果数量限制。⑦调用——agent_executor.invoke({\"input\": \"分析最近 AI 行业趋势并生成报告\"})。Agent 会自主搜索、分析数据、查询数据库、综合生成报告。`,
    tags: ["综合设计", "研究助手", "多工具Agent", "Tool Calling"],
  },
];
