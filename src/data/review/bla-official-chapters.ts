import type { ReviewQuestion } from "./types";

export const blaOfficialQuestions: ReviewQuestion[] = [
  {
    id: "bla-official-learning-map-1",
    chapter: "bla-official-learning-map",
    level: 1,
    question:
      "在Building LLM Powered Applications 权威学习地图中，必须冻结哪些任务、模型与应用条件？",
    answer:
      "按第一版Preface、13章、Other Books You May Enjoy与Index冻结185个正式目录层级，贯通模型、编排、提示、应用、微调与治理。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能从任一正式目录项定位到公式、代码、交互实验、失败样本、复习题及原始来源。”；首个对象不一致时停止并回退。",
    tags: ["版本冻结", "目录分母", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-official-learning-map-2",
    chapter: "bla-official-learning-map",
    level: 1,
    question:
      "在Building LLM Powered Applications 权威学习地图中，哪条中间证据必须先于最终答案检查？",
    answer:
      "按第一版Preface、13章、Other Books You May Enjoy与Index冻结185个正式目录层级，贯通模型、编排、提示、应用、微调与治理。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能从任一正式目录项定位到公式、代码、交互实验、失败样本、复习题及原始来源。”；首个对象不一致时停止并回退。",
    tags: ["调用链", "第一版", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-official-learning-map-3",
    chapter: "bla-official-learning-map",
    level: 2,
    question:
      "如何手算Building LLM Powered Applications 权威学习地图的一次生成概率、检索相似度或请求成本？",
    answer:
      "按第一版Preface、13章、Other Books You May Enjoy与Index冻结185个正式目录层级，贯通模型、编排、提示、应用、微调与治理。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能从任一正式目录项定位到公式、代码、交互实验、失败样本、复习题及原始来源。”；首个对象不一致时停止并回退。",
    tags: ["成本账本", "应用合同", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-official-learning-map-4",
    chapter: "bla-official-learning-map",
    level: 2,
    question:
      "怎样为Building LLM Powered Applications 权威学习地图构造只破坏一个控制变量的失败样本？",
    answer:
      "按第一版Preface、13章、Other Books You May Enjoy与Index冻结185个正式目录层级，贯通模型、编排、提示、应用、微调与治理。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能从任一正式目录项定位到公式、代码、交互实验、失败样本、复习题及原始来源。”；首个对象不一致时停止并回退。",
    tags: ["故障注入", "实验清单", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-official-learning-map-5",
    chapter: "bla-official-learning-map",
    level: 3,
    question:
      "如何排除Building LLM Powered Applications 权威学习地图中的提示注入、工具越权、状态串扰或评测污染？",
    answer:
      "按第一版Preface、13章、Other Books You May Enjoy与Index冻结185个正式目录层级，贯通模型、编排、提示、应用、微调与治理。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能从任一正式目录项定位到公式、代码、交互实验、失败样本、复习题及原始来源。”；首个对象不一致时停止并回退。",
    tags: ["安全门禁", "安全门禁", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-official-learning-map-6",
    chapter: "bla-official-learning-map",
    level: 3,
    question:
      "怎样把Building LLM Powered Applications 权威学习地图接入全书端到端独立复核？",
    answer:
      "按第一版Preface、13章、Other Books You May Enjoy与Index冻结185个正式目录层级，贯通模型、编排、提示、应用、微调与治理。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能从任一正式目录项定位到公式、代码、交互实验、失败样本、复习题及原始来源。”；首个对象不一致时停止并回退。",
    tags: ["独立复核", "独立复核", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-preface-1",
    chapter: "bla-preface",
    level: 1,
    question: "在Preface中，必须冻结哪些任务、模型与应用条件？",
    answer:
      "冻结读者、范围、环境、配套资源与求助路径，把全书实践设为可运行、可审计且能回退的应用工程合同。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能从环境清单启动官方样例，并说明每个章节产物的输入、依赖、证据和限制。”；首个对象不一致时停止并回退。",
    tags: ["版本冻结", "目标读者", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-preface-2",
    chapter: "bla-preface",
    level: 1,
    question: "在Preface中，哪条中间证据必须先于最终答案检查？",
    answer:
      "冻结读者、范围、环境、配套资源与求助路径，把全书实践设为可运行、可审计且能回退的应用工程合同。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能从环境清单启动官方样例，并说明每个章节产物的输入、依赖、证据和限制。”；首个对象不一致时停止并回退。",
    tags: ["调用链", "内容范围", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-preface-3",
    chapter: "bla-preface",
    level: 2,
    question: "如何手算Preface的一次生成概率、检索相似度或请求成本？",
    answer:
      "冻结读者、范围、环境、配套资源与求助路径，把全书实践设为可运行、可审计且能回退的应用工程合同。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能从环境清单启动官方样例，并说明每个章节产物的输入、依赖、证据和限制。”；首个对象不一致时停止并回退。",
    tags: ["成本账本", "环境清单", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-preface-4",
    chapter: "bla-preface",
    level: 2,
    question: "怎样为Preface构造只破坏一个控制变量的失败样本？",
    answer:
      "冻结读者、范围、环境、配套资源与求助路径，把全书实践设为可运行、可审计且能回退的应用工程合同。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能从环境清单启动官方样例，并说明每个章节产物的输入、依赖、证据和限制。”；首个对象不一致时停止并回退。",
    tags: ["故障注入", "配套资源", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-preface-5",
    chapter: "bla-preface",
    level: 3,
    question: "如何排除Preface中的提示注入、工具越权、状态串扰或评测污染？",
    answer:
      "冻结读者、范围、环境、配套资源与求助路径，把全书实践设为可运行、可审计且能回退的应用工程合同。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能从环境清单启动官方样例，并说明每个章节产物的输入、依赖、证据和限制。”；首个对象不一致时停止并回退。",
    tags: ["安全门禁", "版本边界", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-preface-6",
    chapter: "bla-preface",
    level: 3,
    question: "怎样把Preface接入全书端到端独立复核？",
    answer:
      "冻结读者、范围、环境、配套资源与求助路径，把全书实践设为可运行、可审计且能回退的应用工程合同。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能从环境清单启动官方样例，并说明每个章节产物的输入、依赖、证据和限制。”；首个对象不一致时停止并回退。",
    tags: ["独立复核", "复现合同", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-01-introduction-to-large-language-models-1",
    chapter: "bla-01-introduction-to-large-language-models",
    level: 1,
    question:
      "在Chapter 1: Introduction to Large Language Models中，必须冻结哪些任务、模型与应用条件？",
    answer:
      "从基础模型与LLM概念进入Transformer架构、训练、评估，以及基础模型和定制模型的能力与成本边界。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能手算条件概率和注意力，区分预训练、评估与定制，并为能力声明设计反例。”；首个对象不一致时停止并回退。",
    tags: ["版本冻结", "基础模型", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-01-introduction-to-large-language-models-2",
    chapter: "bla-01-introduction-to-large-language-models",
    level: 1,
    question:
      "在Chapter 1: Introduction to Large Language Models中，哪条中间证据必须先于最终答案检查？",
    answer:
      "从基础模型与LLM概念进入Transformer架构、训练、评估，以及基础模型和定制模型的能力与成本边界。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能手算条件概率和注意力，区分预训练、评估与定制，并为能力声明设计反例。”；首个对象不一致时停止并回退。",
    tags: ["调用链", "LLM", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-01-introduction-to-large-language-models-3",
    chapter: "bla-01-introduction-to-large-language-models",
    level: 2,
    question:
      "如何手算Chapter 1: Introduction to Large Language Models的一次生成概率、检索相似度或请求成本？",
    answer:
      "从基础模型与LLM概念进入Transformer架构、训练、评估，以及基础模型和定制模型的能力与成本边界。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能手算条件概率和注意力，区分预训练、评估与定制，并为能力声明设计反例。”；首个对象不一致时停止并回退。",
    tags: ["成本账本", "Transformer", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-01-introduction-to-large-language-models-4",
    chapter: "bla-01-introduction-to-large-language-models",
    level: 2,
    question:
      "怎样为Chapter 1: Introduction to Large Language Models构造只破坏一个控制变量的失败样本？",
    answer:
      "从基础模型与LLM概念进入Transformer架构、训练、评估，以及基础模型和定制模型的能力与成本边界。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能手算条件概率和注意力，区分预训练、评估与定制，并为能力声明设计反例。”；首个对象不一致时停止并回退。",
    tags: ["故障注入", "预训练", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-01-introduction-to-large-language-models-5",
    chapter: "bla-01-introduction-to-large-language-models",
    level: 3,
    question:
      "如何排除Chapter 1: Introduction to Large Language Models中的提示注入、工具越权、状态串扰或评测污染？",
    answer:
      "从基础模型与LLM概念进入Transformer架构、训练、评估，以及基础模型和定制模型的能力与成本边界。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能手算条件概率和注意力，区分预训练、评估与定制，并为能力声明设计反例。”；首个对象不一致时停止并回退。",
    tags: ["安全门禁", "模型评估", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-01-introduction-to-large-language-models-6",
    chapter: "bla-01-introduction-to-large-language-models",
    level: 3,
    question:
      "怎样把Chapter 1: Introduction to Large Language Models接入全书端到端独立复核？",
    answer:
      "从基础模型与LLM概念进入Transformer架构、训练、评估，以及基础模型和定制模型的能力与成本边界。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能手算条件概率和注意力，区分预训练、评估与定制，并为能力声明设计反例。”；首个对象不一致时停止并回退。",
    tags: ["独立复核", "定制模型", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-02-llms-for-ai-powered-applications-1",
    chapter: "bla-02-llms-for-ai-powered-applications",
    level: 1,
    question:
      "在Chapter 2: LLMs for AI-Powered Applications中，必须冻结哪些任务、模型与应用条件？",
    answer:
      "分析LLM对软件开发和Copilot系统的改变，拆解AI编排器，并在LangChain、Haystack与Semantic Kernel之间建立选择合同。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能画出编排器组件图，在相同用例上比较三个框架，并用可测试接口隔离模型与工具。”；首个对象不一致时停止并回退。",
    tags: ["版本冻结", "Copilot", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-02-llms-for-ai-powered-applications-2",
    chapter: "bla-02-llms-for-ai-powered-applications",
    level: 1,
    question:
      "在Chapter 2: LLMs for AI-Powered Applications中，哪条中间证据必须先于最终答案检查？",
    answer:
      "分析LLM对软件开发和Copilot系统的改变，拆解AI编排器，并在LangChain、Haystack与Semantic Kernel之间建立选择合同。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能画出编排器组件图，在相同用例上比较三个框架，并用可测试接口隔离模型与工具。”；首个对象不一致时停止并回退。",
    tags: ["调用链", "AI编排器", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-02-llms-for-ai-powered-applications-3",
    chapter: "bla-02-llms-for-ai-powered-applications",
    level: 2,
    question:
      "如何手算Chapter 2: LLMs for AI-Powered Applications的一次生成概率、检索相似度或请求成本？",
    answer:
      "分析LLM对软件开发和Copilot系统的改变，拆解AI编排器，并在LangChain、Haystack与Semantic Kernel之间建立选择合同。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能画出编排器组件图，在相同用例上比较三个框架，并用可测试接口隔离模型与工具。”；首个对象不一致时停止并回退。",
    tags: ["成本账本", "LangChain", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-02-llms-for-ai-powered-applications-4",
    chapter: "bla-02-llms-for-ai-powered-applications",
    level: 2,
    question:
      "怎样为Chapter 2: LLMs for AI-Powered Applications构造只破坏一个控制变量的失败样本？",
    answer:
      "分析LLM对软件开发和Copilot系统的改变，拆解AI编排器，并在LangChain、Haystack与Semantic Kernel之间建立选择合同。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能画出编排器组件图，在相同用例上比较三个框架，并用可测试接口隔离模型与工具。”；首个对象不一致时停止并回退。",
    tags: ["故障注入", "Haystack", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-02-llms-for-ai-powered-applications-5",
    chapter: "bla-02-llms-for-ai-powered-applications",
    level: 3,
    question:
      "如何排除Chapter 2: LLMs for AI-Powered Applications中的提示注入、工具越权、状态串扰或评测污染？",
    answer:
      "分析LLM对软件开发和Copilot系统的改变，拆解AI编排器，并在LangChain、Haystack与Semantic Kernel之间建立选择合同。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能画出编排器组件图，在相同用例上比较三个框架，并用可测试接口隔离模型与工具。”；首个对象不一致时停止并回退。",
    tags: ["安全门禁", "Semantic Kernel", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-02-llms-for-ai-powered-applications-6",
    chapter: "bla-02-llms-for-ai-powered-applications",
    level: 3,
    question:
      "怎样把Chapter 2: LLMs for AI-Powered Applications接入全书端到端独立复核？",
    answer:
      "分析LLM对软件开发和Copilot系统的改变，拆解AI编排器，并在LangChain、Haystack与Semantic Kernel之间建立选择合同。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能画出编排器组件图，在相同用例上比较三个框架，并用可测试接口隔离模型与工具。”；首个对象不一致时停止并回退。",
    tags: ["独立复核", "框架决策", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-03-choosing-an-llm-1",
    chapter: "bla-03-choosing-an-llm",
    level: 1,
    question:
      "在Chapter 3: Choosing an LLM for Your Application中，必须冻结哪些任务、模型与应用条件？",
    answer:
      "比较书中2024年坐标下的专有与开源模型，再用质量、延迟、成本、隐私、许可和可控性选择应用模型。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能冻结任务与预算完成模型烘焙赛，解释历史型号边界，并留下可复核的选型决策记录。”；首个对象不一致时停止并回退。",
    tags: ["版本冻结", "专有模型", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-03-choosing-an-llm-2",
    chapter: "bla-03-choosing-an-llm",
    level: 1,
    question:
      "在Chapter 3: Choosing an LLM for Your Application中，哪条中间证据必须先于最终答案检查？",
    answer:
      "比较书中2024年坐标下的专有与开源模型，再用质量、延迟、成本、隐私、许可和可控性选择应用模型。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能冻结任务与预算完成模型烘焙赛，解释历史型号边界，并留下可复核的选型决策记录。”；首个对象不一致时停止并回退。",
    tags: ["调用链", "开源模型", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-03-choosing-an-llm-3",
    chapter: "bla-03-choosing-an-llm",
    level: 2,
    question:
      "如何手算Chapter 3: Choosing an LLM for Your Application的一次生成概率、检索相似度或请求成本？",
    answer:
      "比较书中2024年坐标下的专有与开源模型，再用质量、延迟、成本、隐私、许可和可控性选择应用模型。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能冻结任务与预算完成模型烘焙赛，解释历史型号边界，并留下可复核的选型决策记录。”；首个对象不一致时停止并回退。",
    tags: ["成本账本", "任务适配", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-03-choosing-an-llm-4",
    chapter: "bla-03-choosing-an-llm",
    level: 2,
    question:
      "怎样为Chapter 3: Choosing an LLM for Your Application构造只破坏一个控制变量的失败样本？",
    answer:
      "比较书中2024年坐标下的专有与开源模型，再用质量、延迟、成本、隐私、许可和可控性选择应用模型。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能冻结任务与预算完成模型烘焙赛，解释历史型号边界，并留下可复核的选型决策记录。”；首个对象不一致时停止并回退。",
    tags: ["故障注入", "延迟", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-03-choosing-an-llm-5",
    chapter: "bla-03-choosing-an-llm",
    level: 3,
    question:
      "如何排除Chapter 3: Choosing an LLM for Your Application中的提示注入、工具越权、状态串扰或评测污染？",
    answer:
      "比较书中2024年坐标下的专有与开源模型，再用质量、延迟、成本、隐私、许可和可控性选择应用模型。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能冻结任务与预算完成模型烘焙赛，解释历史型号边界，并留下可复核的选型决策记录。”；首个对象不一致时停止并回退。",
    tags: ["安全门禁", "许可", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-03-choosing-an-llm-6",
    chapter: "bla-03-choosing-an-llm",
    level: 3,
    question:
      "怎样把Chapter 3: Choosing an LLM for Your Application接入全书端到端独立复核？",
    answer:
      "比较书中2024年坐标下的专有与开源模型，再用质量、延迟、成本、隐私、许可和可控性选择应用模型。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能冻结任务与预算完成模型烘焙赛，解释历史型号边界，并留下可复核的选型决策记录。”；首个对象不一致时停止并回退。",
    tags: ["独立复核", "模型路由", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-04-prompt-engineering-1",
    chapter: "bla-04-prompt-engineering",
    level: 1,
    question:
      "在Chapter 4: Prompt Engineering中，必须冻结哪些任务、模型与应用条件？",
    answer:
      "从清晰指令、任务拆分、理由与多候选选择进入分隔符、少样本、思维链和ReAct，并建立提示回归集。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能在冻结样本上比较提示版本，验证结构化输出与注入边界，不把隐藏推理当作事实证据。”；首个对象不一致时停止并回退。",
    tags: ["版本冻结", "提示合同", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-04-prompt-engineering-2",
    chapter: "bla-04-prompt-engineering",
    level: 1,
    question:
      "在Chapter 4: Prompt Engineering中，哪条中间证据必须先于最终答案检查？",
    answer:
      "从清晰指令、任务拆分、理由与多候选选择进入分隔符、少样本、思维链和ReAct，并建立提示回归集。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能在冻结样本上比较提示版本，验证结构化输出与注入边界，不把隐藏推理当作事实证据。”；首个对象不一致时停止并回退。",
    tags: ["调用链", "任务拆分", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-04-prompt-engineering-3",
    chapter: "bla-04-prompt-engineering",
    level: 2,
    question:
      "如何手算Chapter 4: Prompt Engineering的一次生成概率、检索相似度或请求成本？",
    answer:
      "从清晰指令、任务拆分、理由与多候选选择进入分隔符、少样本、思维链和ReAct，并建立提示回归集。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能在冻结样本上比较提示版本，验证结构化输出与注入边界，不把隐藏推理当作事实证据。”；首个对象不一致时停止并回退。",
    tags: ["成本账本", "分隔符", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-04-prompt-engineering-4",
    chapter: "bla-04-prompt-engineering",
    level: 2,
    question:
      "怎样为Chapter 4: Prompt Engineering构造只破坏一个控制变量的失败样本？",
    answer:
      "从清晰指令、任务拆分、理由与多候选选择进入分隔符、少样本、思维链和ReAct，并建立提示回归集。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能在冻结样本上比较提示版本，验证结构化输出与注入边界，不把隐藏推理当作事实证据。”；首个对象不一致时停止并回退。",
    tags: ["故障注入", "少样本", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-04-prompt-engineering-5",
    chapter: "bla-04-prompt-engineering",
    level: 3,
    question:
      "如何排除Chapter 4: Prompt Engineering中的提示注入、工具越权、状态串扰或评测污染？",
    answer:
      "从清晰指令、任务拆分、理由与多候选选择进入分隔符、少样本、思维链和ReAct，并建立提示回归集。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能在冻结样本上比较提示版本，验证结构化输出与注入边界，不把隐藏推理当作事实证据。”；首个对象不一致时停止并回退。",
    tags: ["安全门禁", "思维链", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-04-prompt-engineering-6",
    chapter: "bla-04-prompt-engineering",
    level: 3,
    question: "怎样把Chapter 4: Prompt Engineering接入全书端到端独立复核？",
    answer:
      "从清晰指令、任务拆分、理由与多候选选择进入分隔符、少样本、思维链和ReAct，并建立提示回归集。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能在冻结样本上比较提示版本，验证结构化输出与注入边界，不把隐藏推理当作事实证据。”；首个对象不一致时停止并回退。",
    tags: ["独立复核", "ReAct", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-05-embedding-llms-in-applications-1",
    chapter: "bla-05-embedding-llms-in-applications",
    level: 1,
    question:
      "在Chapter 5: Embedding LLMs within Your Applications中，必须冻结哪些任务、模型与应用条件？",
    answer:
      "把模型、提示、数据连接、记忆、链与Agent嵌入应用，并通过Hugging Face Hub实践开源模型与密钥治理。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能用适配器替换模型提供方，验证记忆与工具边界，并确保密钥不进入代码、日志或客户端。”；首个对象不一致时停止并回退。",
    tags: ["版本冻结", "模型适配器", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-05-embedding-llms-in-applications-2",
    chapter: "bla-05-embedding-llms-in-applications",
    level: 1,
    question:
      "在Chapter 5: Embedding LLMs within Your Applications中，哪条中间证据必须先于最终答案检查？",
    answer:
      "把模型、提示、数据连接、记忆、链与Agent嵌入应用，并通过Hugging Face Hub实践开源模型与密钥治理。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能用适配器替换模型提供方，验证记忆与工具边界，并确保密钥不进入代码、日志或客户端。”；首个对象不一致时停止并回退。",
    tags: ["调用链", "数据连接", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-05-embedding-llms-in-applications-3",
    chapter: "bla-05-embedding-llms-in-applications",
    level: 2,
    question:
      "如何手算Chapter 5: Embedding LLMs within Your Applications的一次生成概率、检索相似度或请求成本？",
    answer:
      "把模型、提示、数据连接、记忆、链与Agent嵌入应用，并通过Hugging Face Hub实践开源模型与密钥治理。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能用适配器替换模型提供方，验证记忆与工具边界，并确保密钥不进入代码、日志或客户端。”；首个对象不一致时停止并回退。",
    tags: ["成本账本", "记忆", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-05-embedding-llms-in-applications-4",
    chapter: "bla-05-embedding-llms-in-applications",
    level: 2,
    question:
      "怎样为Chapter 5: Embedding LLMs within Your Applications构造只破坏一个控制变量的失败样本？",
    answer:
      "把模型、提示、数据连接、记忆、链与Agent嵌入应用，并通过Hugging Face Hub实践开源模型与密钥治理。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能用适配器替换模型提供方，验证记忆与工具边界，并确保密钥不进入代码、日志或客户端。”；首个对象不一致时停止并回退。",
    tags: ["故障注入", "链", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-05-embedding-llms-in-applications-5",
    chapter: "bla-05-embedding-llms-in-applications",
    level: 3,
    question:
      "如何排除Chapter 5: Embedding LLMs within Your Applications中的提示注入、工具越权、状态串扰或评测污染？",
    answer:
      "把模型、提示、数据连接、记忆、链与Agent嵌入应用，并通过Hugging Face Hub实践开源模型与密钥治理。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能用适配器替换模型提供方，验证记忆与工具边界，并确保密钥不进入代码、日志或客户端。”；首个对象不一致时停止并回退。",
    tags: ["安全门禁", "Agent", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-05-embedding-llms-in-applications-6",
    chapter: "bla-05-embedding-llms-in-applications",
    level: 3,
    question:
      "怎样把Chapter 5: Embedding LLMs within Your Applications接入全书端到端独立复核？",
    answer:
      "把模型、提示、数据连接、记忆、链与Agent嵌入应用，并通过Hugging Face Hub实践开源模型与密钥治理。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能用适配器替换模型提供方，验证记忆与工具边界，并确保密钥不进入代码、日志或客户端。”；首个对象不一致时停止并回退。",
    tags: ["独立复核", "密钥治理", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-06-conversational-applications-1",
    chapter: "bla-06-conversational-applications",
    level: 1,
    question:
      "在Chapter 6: Building Conversational Applications中，必须冻结哪些任务、模型与应用条件？",
    answer:
      "从最小聊天机器人逐步加入会话记忆、非参数知识、外部工具与Streamlit前端，保持每一步可测。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能重放多轮状态、引用检索证据、验证工具参数，并在上下文溢出或工具失败时降级。”；首个对象不一致时停止并回退。",
    tags: ["版本冻结", "会话状态", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-06-conversational-applications-2",
    chapter: "bla-06-conversational-applications",
    level: 1,
    question:
      "在Chapter 6: Building Conversational Applications中，哪条中间证据必须先于最终答案检查？",
    answer:
      "从最小聊天机器人逐步加入会话记忆、非参数知识、外部工具与Streamlit前端，保持每一步可测。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能重放多轮状态、引用检索证据、验证工具参数，并在上下文溢出或工具失败时降级。”；首个对象不一致时停止并回退。",
    tags: ["调用链", "记忆窗口", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-06-conversational-applications-3",
    chapter: "bla-06-conversational-applications",
    level: 2,
    question:
      "如何手算Chapter 6: Building Conversational Applications的一次生成概率、检索相似度或请求成本？",
    answer:
      "从最小聊天机器人逐步加入会话记忆、非参数知识、外部工具与Streamlit前端，保持每一步可测。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能重放多轮状态、引用检索证据、验证工具参数，并在上下文溢出或工具失败时降级。”；首个对象不一致时停止并回退。",
    tags: ["成本账本", "非参数知识", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-06-conversational-applications-4",
    chapter: "bla-06-conversational-applications",
    level: 2,
    question:
      "怎样为Chapter 6: Building Conversational Applications构造只破坏一个控制变量的失败样本？",
    answer:
      "从最小聊天机器人逐步加入会话记忆、非参数知识、外部工具与Streamlit前端，保持每一步可测。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能重放多轮状态、引用检索证据、验证工具参数，并在上下文溢出或工具失败时降级。”；首个对象不一致时停止并回退。",
    tags: ["故障注入", "外部工具", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-06-conversational-applications-5",
    chapter: "bla-06-conversational-applications",
    level: 3,
    question:
      "如何排除Chapter 6: Building Conversational Applications中的提示注入、工具越权、状态串扰或评测污染？",
    answer:
      "从最小聊天机器人逐步加入会话记忆、非参数知识、外部工具与Streamlit前端，保持每一步可测。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能重放多轮状态、引用检索证据、验证工具参数，并在上下文溢出或工具失败时降级。”；首个对象不一致时停止并回退。",
    tags: ["安全门禁", "Streamlit", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-06-conversational-applications-6",
    chapter: "bla-06-conversational-applications",
    level: 3,
    question:
      "怎样把Chapter 6: Building Conversational Applications接入全书端到端独立复核？",
    answer:
      "从最小聊天机器人逐步加入会话记忆、非参数知识、外部工具与Streamlit前端，保持每一步可测。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能重放多轮状态、引用检索证据、验证工具参数，并在上下文溢出或工具失败时降级。”；首个对象不一致时停止并回退。",
    tags: ["独立复核", "故障降级", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-07-search-recommendation-1",
    chapter: "bla-07-search-recommendation",
    level: 1,
    question:
      "在Chapter 7: Search and Recommendation Engines with LLMs中，必须冻结哪些任务、模型与应用条件？",
    answer:
      "从K近邻、矩阵分解和神经推荐基线进入LLM推荐，实践冷启动问答、内容推荐、数据处理与Streamlit前端。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能在相同切分上比较传统与LLM方案，报告排序、冷启动、多样性、延迟和幻觉指标。”；首个对象不一致时停止并回退。",
    tags: ["版本冻结", "K近邻", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-07-search-recommendation-2",
    chapter: "bla-07-search-recommendation",
    level: 1,
    question:
      "在Chapter 7: Search and Recommendation Engines with LLMs中，哪条中间证据必须先于最终答案检查？",
    answer:
      "从K近邻、矩阵分解和神经推荐基线进入LLM推荐，实践冷启动问答、内容推荐、数据处理与Streamlit前端。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能在相同切分上比较传统与LLM方案，报告排序、冷启动、多样性、延迟和幻觉指标。”；首个对象不一致时停止并回退。",
    tags: ["调用链", "矩阵分解", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-07-search-recommendation-3",
    chapter: "bla-07-search-recommendation",
    level: 2,
    question:
      "如何手算Chapter 7: Search and Recommendation Engines with LLMs的一次生成概率、检索相似度或请求成本？",
    answer:
      "从K近邻、矩阵分解和神经推荐基线进入LLM推荐，实践冷启动问答、内容推荐、数据处理与Streamlit前端。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能在相同切分上比较传统与LLM方案，报告排序、冷启动、多样性、延迟和幻觉指标。”；首个对象不一致时停止并回退。",
    tags: ["成本账本", "冷启动", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-07-search-recommendation-4",
    chapter: "bla-07-search-recommendation",
    level: 2,
    question:
      "怎样为Chapter 7: Search and Recommendation Engines with LLMs构造只破坏一个控制变量的失败样本？",
    answer:
      "从K近邻、矩阵分解和神经推荐基线进入LLM推荐，实践冷启动问答、内容推荐、数据处理与Streamlit前端。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能在相同切分上比较传统与LLM方案，报告排序、冷启动、多样性、延迟和幻觉指标。”；首个对象不一致时停止并回退。",
    tags: ["故障注入", "内容推荐", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-07-search-recommendation-5",
    chapter: "bla-07-search-recommendation",
    level: 3,
    question:
      "如何排除Chapter 7: Search and Recommendation Engines with LLMs中的提示注入、工具越权、状态串扰或评测污染？",
    answer:
      "从K近邻、矩阵分解和神经推荐基线进入LLM推荐，实践冷启动问答、内容推荐、数据处理与Streamlit前端。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能在相同切分上比较传统与LLM方案，报告排序、冷启动、多样性、延迟和幻觉指标。”；首个对象不一致时停止并回退。",
    tags: ["安全门禁", "排序指标", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-07-search-recommendation-6",
    chapter: "bla-07-search-recommendation",
    level: 3,
    question:
      "怎样把Chapter 7: Search and Recommendation Engines with LLMs接入全书端到端独立复核？",
    answer:
      "从K近邻、矩阵分解和神经推荐基线进入LLM推荐，实践冷启动问答、内容推荐、数据处理与Streamlit前端。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能在相同切分上比较传统与LLM方案，报告排序、冷启动、多样性、延迟和幻觉指标。”；首个对象不一致时停止并回退。",
    tags: ["独立复核", "推荐解释", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-08-structured-data-1",
    chapter: "bla-08-structured-data",
    level: 1,
    question:
      "在Chapter 8: Using LLMs with Structured Data中，必须冻结哪些任务、模型与应用条件？",
    answer:
      "以Chinook关系数据库为实验场，构建DBCopilot、SQL Agent、提示和附加工具，并把自然语言查询置于只读安全边界。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能验证生成SQL的语法、权限、结果与成本，阻断越权和破坏性语句，并保留查询审计链。”；首个对象不一致时停止并回退。",
    tags: ["版本冻结", "结构化数据", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-08-structured-data-2",
    chapter: "bla-08-structured-data",
    level: 1,
    question:
      "在Chapter 8: Using LLMs with Structured Data中，哪条中间证据必须先于最终答案检查？",
    answer:
      "以Chinook关系数据库为实验场，构建DBCopilot、SQL Agent、提示和附加工具，并把自然语言查询置于只读安全边界。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能验证生成SQL的语法、权限、结果与成本，阻断越权和破坏性语句，并保留查询审计链。”；首个对象不一致时停止并回退。",
    tags: ["调用链", "Chinook", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-08-structured-data-3",
    chapter: "bla-08-structured-data",
    level: 2,
    question:
      "如何手算Chapter 8: Using LLMs with Structured Data的一次生成概率、检索相似度或请求成本？",
    answer:
      "以Chinook关系数据库为实验场，构建DBCopilot、SQL Agent、提示和附加工具，并把自然语言查询置于只读安全边界。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能验证生成SQL的语法、权限、结果与成本，阻断越权和破坏性语句，并保留查询审计链。”；首个对象不一致时停止并回退。",
    tags: ["成本账本", "DBCopilot", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-08-structured-data-4",
    chapter: "bla-08-structured-data",
    level: 2,
    question:
      "怎样为Chapter 8: Using LLMs with Structured Data构造只破坏一个控制变量的失败样本？",
    answer:
      "以Chinook关系数据库为实验场，构建DBCopilot、SQL Agent、提示和附加工具，并把自然语言查询置于只读安全边界。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能验证生成SQL的语法、权限、结果与成本，阻断越权和破坏性语句，并保留查询审计链。”；首个对象不一致时停止并回退。",
    tags: ["故障注入", "SQL Agent", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-08-structured-data-5",
    chapter: "bla-08-structured-data",
    level: 3,
    question:
      "如何排除Chapter 8: Using LLMs with Structured Data中的提示注入、工具越权、状态串扰或评测污染？",
    answer:
      "以Chinook关系数据库为实验场，构建DBCopilot、SQL Agent、提示和附加工具，并把自然语言查询置于只读安全边界。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能验证生成SQL的语法、权限、结果与成本，阻断越权和破坏性语句，并保留查询审计链。”；首个对象不一致时停止并回退。",
    tags: ["安全门禁", "只读权限", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-08-structured-data-6",
    chapter: "bla-08-structured-data",
    level: 3,
    question:
      "怎样把Chapter 8: Using LLMs with Structured Data接入全书端到端独立复核？",
    answer:
      "以Chinook关系数据库为实验场，构建DBCopilot、SQL Agent、提示和附加工具，并把自然语言查询置于只读安全边界。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能验证生成SQL的语法、权限、结果与成本，阻断越权和破坏性语句，并保留查询审计链。”；首个对象不一致时停止并回退。",
    tags: ["独立复核", "查询审计", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-09-working-with-code-1",
    chapter: "bla-09-working-with-code",
    level: 1,
    question:
      "在Chapter 9: Working with Code中，必须冻结哪些任务、模型与应用条件？",
    answer:
      "比较代码模型，覆盖代码理解、生成、算法扮演和Code Interpreter，并用测试、沙箱与资源限制验证产物。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能让生成代码在隔离环境通过正常、边界和恶意测试，记录依赖、执行轨迹与失败原因。”；首个对象不一致时停止并回退。",
    tags: ["版本冻结", "代码模型", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-09-working-with-code-2",
    chapter: "bla-09-working-with-code",
    level: 1,
    question:
      "在Chapter 9: Working with Code中，哪条中间证据必须先于最终答案检查？",
    answer:
      "比较代码模型，覆盖代码理解、生成、算法扮演和Code Interpreter，并用测试、沙箱与资源限制验证产物。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能让生成代码在隔离环境通过正常、边界和恶意测试，记录依赖、执行轨迹与失败原因。”；首个对象不一致时停止并回退。",
    tags: ["调用链", "代码理解", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-09-working-with-code-3",
    chapter: "bla-09-working-with-code",
    level: 2,
    question:
      "如何手算Chapter 9: Working with Code的一次生成概率、检索相似度或请求成本？",
    answer:
      "比较代码模型，覆盖代码理解、生成、算法扮演和Code Interpreter，并用测试、沙箱与资源限制验证产物。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能让生成代码在隔离环境通过正常、边界和恶意测试，记录依赖、执行轨迹与失败原因。”；首个对象不一致时停止并回退。",
    tags: ["成本账本", "代码生成", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-09-working-with-code-4",
    chapter: "bla-09-working-with-code",
    level: 2,
    question:
      "怎样为Chapter 9: Working with Code构造只破坏一个控制变量的失败样本？",
    answer:
      "比较代码模型，覆盖代码理解、生成、算法扮演和Code Interpreter，并用测试、沙箱与资源限制验证产物。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能让生成代码在隔离环境通过正常、边界和恶意测试，记录依赖、执行轨迹与失败原因。”；首个对象不一致时停止并回退。",
    tags: ["故障注入", "算法", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-09-working-with-code-5",
    chapter: "bla-09-working-with-code",
    level: 3,
    question:
      "如何排除Chapter 9: Working with Code中的提示注入、工具越权、状态串扰或评测污染？",
    answer:
      "比较代码模型，覆盖代码理解、生成、算法扮演和Code Interpreter，并用测试、沙箱与资源限制验证产物。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能让生成代码在隔离环境通过正常、边界和恶意测试，记录依赖、执行轨迹与失败原因。”；首个对象不一致时停止并回退。",
    tags: ["安全门禁", "沙箱", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-09-working-with-code-6",
    chapter: "bla-09-working-with-code",
    level: 3,
    question: "怎样把Chapter 9: Working with Code接入全书端到端独立复核？",
    answer:
      "比较代码模型，覆盖代码理解、生成、算法扮演和Code Interpreter，并用测试、沙箱与资源限制验证产物。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能让生成代码在隔离环境通过正常、边界和恶意测试，记录依赖、执行轨迹与失败原因。”；首个对象不一致时停止并回退。",
    tags: ["独立复核", "Code Interpreter", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-10-multimodal-applications-1",
    chapter: "bla-10-multimodal-applications",
    level: 1,
    question:
      "在Chapter 10: Building Multimodal Applications with LLMs中，必须冻结哪些任务、模型与应用条件？",
    answer:
      "比较Azure AI现成工具包、组合单工具Agent和硬编码顺序链三种多模态路径，覆盖发票、YouTube、Whisper与图像生成。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能逐模态保存输入和中间产物，比较三种编排的质量、延迟、成本、可控性与失败回退。”；首个对象不一致时停止并回退。",
    tags: ["版本冻结", "多模态", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-10-multimodal-applications-2",
    chapter: "bla-10-multimodal-applications",
    level: 1,
    question:
      "在Chapter 10: Building Multimodal Applications with LLMs中，哪条中间证据必须先于最终答案检查？",
    answer:
      "比较Azure AI现成工具包、组合单工具Agent和硬编码顺序链三种多模态路径，覆盖发票、YouTube、Whisper与图像生成。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能逐模态保存输入和中间产物，比较三种编排的质量、延迟、成本、可控性与失败回退。”；首个对象不一致时停止并回退。",
    tags: ["调用链", "Azure AI工具包", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-10-multimodal-applications-3",
    chapter: "bla-10-multimodal-applications",
    level: 2,
    question:
      "如何手算Chapter 10: Building Multimodal Applications with LLMs的一次生成概率、检索相似度或请求成本？",
    answer:
      "比较Azure AI现成工具包、组合单工具Agent和硬编码顺序链三种多模态路径，覆盖发票、YouTube、Whisper与图像生成。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能逐模态保存输入和中间产物，比较三种编排的质量、延迟、成本、可控性与失败回退。”；首个对象不一致时停止并回退。",
    tags: ["成本账本", "Whisper", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-10-multimodal-applications-4",
    chapter: "bla-10-multimodal-applications",
    level: 2,
    question:
      "怎样为Chapter 10: Building Multimodal Applications with LLMs构造只破坏一个控制变量的失败样本？",
    answer:
      "比较Azure AI现成工具包、组合单工具Agent和硬编码顺序链三种多模态路径，覆盖发票、YouTube、Whisper与图像生成。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能逐模态保存输入和中间产物，比较三种编排的质量、延迟、成本、可控性与失败回退。”；首个对象不一致时停止并回退。",
    tags: ["故障注入", "图像生成", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-10-multimodal-applications-5",
    chapter: "bla-10-multimodal-applications",
    level: 3,
    question:
      "如何排除Chapter 10: Building Multimodal Applications with LLMs中的提示注入、工具越权、状态串扰或评测污染？",
    answer:
      "比较Azure AI现成工具包、组合单工具Agent和硬编码顺序链三种多模态路径，覆盖发票、YouTube、Whisper与图像生成。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能逐模态保存输入和中间产物，比较三种编排的质量、延迟、成本、可控性与失败回退。”；首个对象不一致时停止并回退。",
    tags: ["安全门禁", "顺序链", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-10-multimodal-applications-6",
    chapter: "bla-10-multimodal-applications",
    level: 3,
    question:
      "怎样把Chapter 10: Building Multimodal Applications with LLMs接入全书端到端独立复核？",
    answer:
      "比较Azure AI现成工具包、组合单工具Agent和硬编码顺序链三种多模态路径，覆盖发票、YouTube、Whisper与图像生成。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能逐模态保存输入和中间产物，比较三种编排的质量、延迟、成本、可控性与失败回退。”；首个对象不一致时停止并回退。",
    tags: ["独立复核", "发票分析", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-11-fine-tuning-1",
    chapter: "bla-11-fine-tuning",
    level: 1,
    question:
      "在Chapter 11: Fine-Tuning Large Language Models中，必须冻结哪些任务、模型与应用条件？",
    answer:
      "判断何时需要微调，依次冻结数据获取、词元化、训练、评估、保存与加载产物，并与提示或检索基线比较。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能证明微调收益不是数据泄漏或预算差异，保存可重放检查点并识别灾难性遗忘。”；首个对象不一致时停止并回退。",
    tags: ["版本冻结", "微调决策", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-11-fine-tuning-2",
    chapter: "bla-11-fine-tuning",
    level: 1,
    question:
      "在Chapter 11: Fine-Tuning Large Language Models中，哪条中间证据必须先于最终答案检查？",
    answer:
      "判断何时需要微调，依次冻结数据获取、词元化、训练、评估、保存与加载产物，并与提示或检索基线比较。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能证明微调收益不是数据泄漏或预算差异，保存可重放检查点并识别灾难性遗忘。”；首个对象不一致时停止并回退。",
    tags: ["调用链", "训练数据", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-11-fine-tuning-3",
    chapter: "bla-11-fine-tuning",
    level: 2,
    question:
      "如何手算Chapter 11: Fine-Tuning Large Language Models的一次生成概率、检索相似度或请求成本？",
    answer:
      "判断何时需要微调，依次冻结数据获取、词元化、训练、评估、保存与加载产物，并与提示或检索基线比较。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能证明微调收益不是数据泄漏或预算差异，保存可重放检查点并识别灾难性遗忘。”；首个对象不一致时停止并回退。",
    tags: ["成本账本", "词元化", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-11-fine-tuning-4",
    chapter: "bla-11-fine-tuning",
    level: 2,
    question:
      "怎样为Chapter 11: Fine-Tuning Large Language Models构造只破坏一个控制变量的失败样本？",
    answer:
      "判断何时需要微调，依次冻结数据获取、词元化、训练、评估、保存与加载产物，并与提示或检索基线比较。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能证明微调收益不是数据泄漏或预算差异，保存可重放检查点并识别灾难性遗忘。”；首个对象不一致时停止并回退。",
    tags: ["故障注入", "评估指标", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-11-fine-tuning-5",
    chapter: "bla-11-fine-tuning",
    level: 3,
    question:
      "如何排除Chapter 11: Fine-Tuning Large Language Models中的提示注入、工具越权、状态串扰或评测污染？",
    answer:
      "判断何时需要微调，依次冻结数据获取、词元化、训练、评估、保存与加载产物，并与提示或检索基线比较。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能证明微调收益不是数据泄漏或预算差异，保存可重放检查点并识别灾难性遗忘。”；首个对象不一致时停止并回退。",
    tags: ["安全门禁", "检查点", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-11-fine-tuning-6",
    chapter: "bla-11-fine-tuning",
    level: 3,
    question:
      "怎样把Chapter 11: Fine-Tuning Large Language Models接入全书端到端独立复核？",
    answer:
      "判断何时需要微调，依次冻结数据获取、词元化、训练、评估、保存与加载产物，并与提示或检索基线比较。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能证明微调收益不是数据泄漏或预算差异，保存可重放检查点并识别灾难性遗忘。”；首个对象不一致时停止并回退。",
    tags: ["独立复核", "灾难性遗忘", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-12-responsible-ai-1",
    chapter: "bla-12-responsible-ai",
    level: 1,
    question:
      "在Chapter 12: Responsible AI中，必须冻结哪些任务、模型与应用条件？",
    answer:
      "在模型、元提示和用户界面三层落实Responsible AI，并将法规、风险、人工复核、事件记录与回退并入发布门禁。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能按风险场景测试偏见、有害性、隐私、越权与过度拒答，证明三层控制可审计且不互相抵消。”；首个对象不一致时停止并回退。",
    tags: ["版本冻结", "Responsible AI", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-12-responsible-ai-2",
    chapter: "bla-12-responsible-ai",
    level: 1,
    question:
      "在Chapter 12: Responsible AI中，哪条中间证据必须先于最终答案检查？",
    answer:
      "在模型、元提示和用户界面三层落实Responsible AI，并将法规、风险、人工复核、事件记录与回退并入发布门禁。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能按风险场景测试偏见、有害性、隐私、越权与过度拒答，证明三层控制可审计且不互相抵消。”；首个对象不一致时停止并回退。",
    tags: ["调用链", "模型层", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-12-responsible-ai-3",
    chapter: "bla-12-responsible-ai",
    level: 2,
    question:
      "如何手算Chapter 12: Responsible AI的一次生成概率、检索相似度或请求成本？",
    answer:
      "在模型、元提示和用户界面三层落实Responsible AI，并将法规、风险、人工复核、事件记录与回退并入发布门禁。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能按风险场景测试偏见、有害性、隐私、越权与过度拒答，证明三层控制可审计且不互相抵消。”；首个对象不一致时停止并回退。",
    tags: ["成本账本", "元提示层", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-12-responsible-ai-4",
    chapter: "bla-12-responsible-ai",
    level: 2,
    question:
      "怎样为Chapter 12: Responsible AI构造只破坏一个控制变量的失败样本？",
    answer:
      "在模型、元提示和用户界面三层落实Responsible AI，并将法规、风险、人工复核、事件记录与回退并入发布门禁。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能按风险场景测试偏见、有害性、隐私、越权与过度拒答，证明三层控制可审计且不互相抵消。”；首个对象不一致时停止并回退。",
    tags: ["故障注入", "界面层", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-12-responsible-ai-5",
    chapter: "bla-12-responsible-ai",
    level: 3,
    question:
      "如何排除Chapter 12: Responsible AI中的提示注入、工具越权、状态串扰或评测污染？",
    answer:
      "在模型、元提示和用户界面三层落实Responsible AI，并将法规、风险、人工复核、事件记录与回退并入发布门禁。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能按风险场景测试偏见、有害性、隐私、越权与过度拒答，证明三层控制可审计且不互相抵消。”；首个对象不一致时停止并回退。",
    tags: ["安全门禁", "法规", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-12-responsible-ai-6",
    chapter: "bla-12-responsible-ai",
    level: 3,
    question: "怎样把Chapter 12: Responsible AI接入全书端到端独立复核？",
    answer:
      "在模型、元提示和用户界面三层落实Responsible AI，并将法规、风险、人工复核、事件记录与回退并入发布门禁。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能按风险场景测试偏见、有害性、隐私、越权与过度拒答，证明三层控制可审计且不互相抵消。”；首个对象不一致时停止并回退。",
    tags: ["独立复核", "事件审计", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-13-emerging-trends-1",
    chapter: "bla-13-emerging-trends",
    level: 1,
    question:
      "在Chapter 13: Emerging Trends and Innovations中，必须冻结哪些任务、模型与应用条件？",
    answer:
      "以2024年出版时的GPT-4V、DALL-E 3、AutoGen、小语言模型和企业案例为历史坐标，建立可更新趋势雷达。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能区分书中历史事实与当前能力，为每个趋势记录日期、来源、证据等级和失效条件。”；首个对象不一致时停止并回退。",
    tags: ["版本冻结", "GPT-4V", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-13-emerging-trends-2",
    chapter: "bla-13-emerging-trends",
    level: 1,
    question:
      "在Chapter 13: Emerging Trends and Innovations中，哪条中间证据必须先于最终答案检查？",
    answer:
      "以2024年出版时的GPT-4V、DALL-E 3、AutoGen、小语言模型和企业案例为历史坐标，建立可更新趋势雷达。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能区分书中历史事实与当前能力，为每个趋势记录日期、来源、证据等级和失效条件。”；首个对象不一致时停止并回退。",
    tags: ["调用链", "DALL-E 3", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-13-emerging-trends-3",
    chapter: "bla-13-emerging-trends",
    level: 2,
    question:
      "如何手算Chapter 13: Emerging Trends and Innovations的一次生成概率、检索相似度或请求成本？",
    answer:
      "以2024年出版时的GPT-4V、DALL-E 3、AutoGen、小语言模型和企业案例为历史坐标，建立可更新趋势雷达。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能区分书中历史事实与当前能力，为每个趋势记录日期、来源、证据等级和失效条件。”；首个对象不一致时停止并回退。",
    tags: ["成本账本", "AutoGen", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-13-emerging-trends-4",
    chapter: "bla-13-emerging-trends",
    level: 2,
    question:
      "怎样为Chapter 13: Emerging Trends and Innovations构造只破坏一个控制变量的失败样本？",
    answer:
      "以2024年出版时的GPT-4V、DALL-E 3、AutoGen、小语言模型和企业案例为历史坐标，建立可更新趋势雷达。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能区分书中历史事实与当前能力，为每个趋势记录日期、来源、证据等级和失效条件。”；首个对象不一致时停止并回退。",
    tags: ["故障注入", "小语言模型", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-13-emerging-trends-5",
    chapter: "bla-13-emerging-trends",
    level: 3,
    question:
      "如何排除Chapter 13: Emerging Trends and Innovations中的提示注入、工具越权、状态串扰或评测污染？",
    answer:
      "以2024年出版时的GPT-4V、DALL-E 3、AutoGen、小语言模型和企业案例为历史坐标，建立可更新趋势雷达。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能区分书中历史事实与当前能力，为每个趋势记录日期、来源、证据等级和失效条件。”；首个对象不一致时停止并回退。",
    tags: ["安全门禁", "企业案例", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-13-emerging-trends-6",
    chapter: "bla-13-emerging-trends",
    level: 3,
    question:
      "怎样把Chapter 13: Emerging Trends and Innovations接入全书端到端独立复核？",
    answer:
      "以2024年出版时的GPT-4V、DALL-E 3、AutoGen、小语言模型和企业案例为历史坐标，建立可更新趋势雷达。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能区分书中历史事实与当前能力，为每个趋势记录日期、来源、证据等级和失效条件。”；首个对象不一致时停止并回退。",
    tags: ["独立复核", "趋势雷达", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-other-books-1",
    chapter: "bla-other-books",
    level: 1,
    question:
      "在Other Books You May Enjoy中，必须冻结哪些任务、模型与应用条件？",
    answer:
      "把延伸阅读转成基于知识缺口、来源质量、版本和实践目标的选择矩阵，不把推荐列表当作原书核心结论。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能从一次评估失败定位知识缺口，选择原始资料或延伸书，并写明学习产物与停止条件。”；首个对象不一致时停止并回退。",
    tags: ["版本冻结", "延伸阅读", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-other-books-2",
    chapter: "bla-other-books",
    level: 1,
    question:
      "在Other Books You May Enjoy中，哪条中间证据必须先于最终答案检查？",
    answer:
      "把延伸阅读转成基于知识缺口、来源质量、版本和实践目标的选择矩阵，不把推荐列表当作原书核心结论。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能从一次评估失败定位知识缺口，选择原始资料或延伸书，并写明学习产物与停止条件。”；首个对象不一致时停止并回退。",
    tags: ["调用链", "知识缺口", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-other-books-3",
    chapter: "bla-other-books",
    level: 2,
    question:
      "如何手算Other Books You May Enjoy的一次生成概率、检索相似度或请求成本？",
    answer:
      "把延伸阅读转成基于知识缺口、来源质量、版本和实践目标的选择矩阵，不把推荐列表当作原书核心结论。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能从一次评估失败定位知识缺口，选择原始资料或延伸书，并写明学习产物与停止条件。”；首个对象不一致时停止并回退。",
    tags: ["成本账本", "来源等级", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-other-books-4",
    chapter: "bla-other-books",
    level: 2,
    question:
      "怎样为Other Books You May Enjoy构造只破坏一个控制变量的失败样本？",
    answer:
      "把延伸阅读转成基于知识缺口、来源质量、版本和实践目标的选择矩阵，不把推荐列表当作原书核心结论。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能从一次评估失败定位知识缺口，选择原始资料或延伸书，并写明学习产物与停止条件。”；首个对象不一致时停止并回退。",
    tags: ["故障注入", "版本日期", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-other-books-5",
    chapter: "bla-other-books",
    level: 3,
    question:
      "如何排除Other Books You May Enjoy中的提示注入、工具越权、状态串扰或评测污染？",
    answer:
      "把延伸阅读转成基于知识缺口、来源质量、版本和实践目标的选择矩阵，不把推荐列表当作原书核心结论。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能从一次评估失败定位知识缺口，选择原始资料或延伸书，并写明学习产物与停止条件。”；首个对象不一致时停止并回退。",
    tags: ["安全门禁", "学习产物", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-other-books-6",
    chapter: "bla-other-books",
    level: 3,
    question: "怎样把Other Books You May Enjoy接入全书端到端独立复核？",
    answer:
      "把延伸阅读转成基于知识缺口、来源质量、版本和实践目标的选择矩阵，不把推荐列表当作原书核心结论。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能从一次评估失败定位知识缺口，选择原始资料或延伸书，并写明学习产物与停止条件。”；首个对象不一致时停止并回退。",
    tags: ["独立复核", "停止条件", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-index-1",
    chapter: "bla-index",
    level: 1,
    question: "在Index中，必须冻结哪些任务、模型与应用条件？",
    answer:
      "把索引转成术语、章节、代码、数据、实验和失败的双向入口，贯通模型选择、提示、编排、应用与治理。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能从任一术语追到定义、前置条件、官方样例、测试和边界，也能从失败反查相关章节。”；首个对象不一致时停止并回退。",
    tags: ["版本冻结", "概念索引", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-index-2",
    chapter: "bla-index",
    level: 1,
    question: "在Index中，哪条中间证据必须先于最终答案检查？",
    answer:
      "把索引转成术语、章节、代码、数据、实验和失败的双向入口，贯通模型选择、提示、编排、应用与治理。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能从任一术语追到定义、前置条件、官方样例、测试和边界，也能从失败反查相关章节。”；首个对象不一致时停止并回退。",
    tags: ["调用链", "代码索引", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-index-3",
    chapter: "bla-index",
    level: 2,
    question: "如何手算Index的一次生成概率、检索相似度或请求成本？",
    answer:
      "把索引转成术语、章节、代码、数据、实验和失败的双向入口，贯通模型选择、提示、编排、应用与治理。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能从任一术语追到定义、前置条件、官方样例、测试和边界，也能从失败反查相关章节。”；首个对象不一致时停止并回退。",
    tags: ["成本账本", "数据索引", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-index-4",
    chapter: "bla-index",
    level: 2,
    question: "怎样为Index构造只破坏一个控制变量的失败样本？",
    answer:
      "把索引转成术语、章节、代码、数据、实验和失败的双向入口，贯通模型选择、提示、编排、应用与治理。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能从任一术语追到定义、前置条件、官方样例、测试和边界，也能从失败反查相关章节。”；首个对象不一致时停止并回退。",
    tags: ["故障注入", "实验索引", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-index-5",
    chapter: "bla-index",
    level: 3,
    question: "如何排除Index中的提示注入、工具越权、状态串扰或评测污染？",
    answer:
      "把索引转成术语、章节、代码、数据、实验和失败的双向入口，贯通模型选择、提示、编排、应用与治理。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能从任一术语追到定义、前置条件、官方样例、测试和边界，也能从失败反查相关章节。”；首个对象不一致时停止并回退。",
    tags: ["安全门禁", "失败索引", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-index-6",
    chapter: "bla-index",
    level: 3,
    question: "怎样把Index接入全书端到端独立复核？",
    answer:
      "把索引转成术语、章节、代码、数据、实验和失败的双向入口，贯通模型选择、提示、编排、应用与治理。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能从任一术语追到定义、前置条件、官方样例、测试和边界，也能从失败反查相关章节。”；首个对象不一致时停止并回退。",
    tags: ["独立复核", "双向追踪", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-official-final-review-1",
    chapter: "bla-official-final-review",
    level: 1,
    question:
      "在Building LLM Powered Applications 全书总复习中，必须冻结哪些任务、模型与应用条件？",
    answer:
      "贯通第一版185个正式目录层级，从冻结任务和模型开始，重放提示、编排、对话、推荐、SQL、代码、多模态、微调与Responsible AI。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能独立重建最小LLM应用，证明质量、安全、性能、成本和复现门禁全部通过后再发布。”；首个对象不一致时停止并回退。",
    tags: ["版本冻结", "端到端重放", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-official-final-review-2",
    chapter: "bla-official-final-review",
    level: 1,
    question:
      "在Building LLM Powered Applications 全书总复习中，哪条中间证据必须先于最终答案检查？",
    answer:
      "贯通第一版185个正式目录层级，从冻结任务和模型开始，重放提示、编排、对话、推荐、SQL、代码、多模态、微调与Responsible AI。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能独立重建最小LLM应用，证明质量、安全、性能、成本和复现门禁全部通过后再发布。”；首个对象不一致时停止并回退。",
    tags: ["调用链", "模型合同", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-official-final-review-3",
    chapter: "bla-official-final-review",
    level: 2,
    question:
      "如何手算Building LLM Powered Applications 全书总复习的一次生成概率、检索相似度或请求成本？",
    answer:
      "贯通第一版185个正式目录层级，从冻结任务和模型开始，重放提示、编排、对话、推荐、SQL、代码、多模态、微调与Responsible AI。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能独立重建最小LLM应用，证明质量、安全、性能、成本和复现门禁全部通过后再发布。”；首个对象不一致时停止并回退。",
    tags: ["成本账本", "提示回归", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-official-final-review-4",
    chapter: "bla-official-final-review",
    level: 2,
    question:
      "怎样为Building LLM Powered Applications 全书总复习构造只破坏一个控制变量的失败样本？",
    answer:
      "贯通第一版185个正式目录层级，从冻结任务和模型开始，重放提示、编排、对话、推荐、SQL、代码、多模态、微调与Responsible AI。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能独立重建最小LLM应用，证明质量、安全、性能、成本和复现门禁全部通过后再发布。”；首个对象不一致时停止并回退。",
    tags: ["故障注入", "工具权限", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-official-final-review-5",
    chapter: "bla-official-final-review",
    level: 3,
    question:
      "如何排除Building LLM Powered Applications 全书总复习中的提示注入、工具越权、状态串扰或评测污染？",
    answer:
      "贯通第一版185个正式目录层级，从冻结任务和模型开始，重放提示、编排、对话、推荐、SQL、代码、多模态、微调与Responsible AI。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能独立重建最小LLM应用，证明质量、安全、性能、成本和复现门禁全部通过后再发布。”；首个对象不一致时停止并回退。",
    tags: ["安全门禁", "逐样本评测", "第一版正式目录", "可重放"],
  },
  {
    id: "bla-official-final-review-6",
    chapter: "bla-official-final-review",
    level: 3,
    question:
      "怎样把Building LLM Powered Applications 全书总复习接入全书端到端独立复核？",
    answer:
      "贯通第一版185个正式目录层级，从冻结任务和模型开始，重放提示、编排、对话、推荐、SQL、代码、多模态、微调与Responsible AI。 固定第一版来源、任务、样本、模型、提示、知识、工具、随机参数和评测，按“输入 -> 模型与提示 -> 数据与状态 -> 工具执行 -> 输出验证 -> 逐样本评测”保存证据。通过标准是“能独立重建最小LLM应用，证明质量、安全、性能、成本和复现门禁全部通过后再发布。”；首个对象不一致时停止并回退。",
    tags: ["独立复核", "发布门禁", "第一版正式目录", "可重放"],
  },
];
