import type { ReviewQuestion } from "./types";

export const masOfficialQuestions: ReviewQuestion[] = [
  {
    id: "mas-official-learning-map-1",
    chapter: "mas-official-learning-map",
    level: 1,
    question:
      "在An Introduction to MultiAgent Systems 第二版权威学习地图中，必须冻结哪些参与者、信息与规则？",
    answer:
      "按Preface、4个Part、17章、Coda和2个附录冻结作者官网197个正式目录层级，贯通自主智能体、通信合作与多智能体决策。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能从任一正式目录项定位到定义、公式、代码、交互图、失败样本、复习题与作者官网来源。”；首个对象不一致时停止并回退。",
    tags: ["版本冻结", "目录分母", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-official-learning-map-2",
    chapter: "mas-official-learning-map",
    level: 1,
    question:
      "在An Introduction to MultiAgent Systems 第二版权威学习地图中，哪条联合状态证据必须先于最终结果检查？",
    answer:
      "按Preface、4个Part、17章、Coda和2个附录冻结作者官网197个正式目录层级，贯通自主智能体、通信合作与多智能体决策。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能从任一正式目录项定位到定义、公式、代码、交互图、失败样本、复习题与作者官网来源。”；首个对象不一致时停止并回退。",
    tags: ["联合轨迹", "第二版", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-official-learning-map-3",
    chapter: "mas-official-learning-map",
    level: 2,
    question:
      "如何手算An Introduction to MultiAgent Systems 第二版权威学习地图的一次期望效用、最佳响应、投票或分配？",
    answer:
      "按Preface、4个Part、17章、Coda和2个附录冻结作者官网197个正式目录层级，贯通自主智能体、通信合作与多智能体决策。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能从任一正式目录项定位到定义、公式、代码、交互图、失败样本、复习题与作者官网来源。”；首个对象不一致时停止并回退。",
    tags: ["手算实例", "自主智能体", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-official-learning-map-4",
    chapter: "mas-official-learning-map",
    level: 2,
    question:
      "怎样为An Introduction to MultiAgent Systems 第二版权威学习地图构造只破坏一个条件的失败样本？",
    answer:
      "按Preface、4个Part、17章、Coda和2个附录冻结作者官网197个正式目录层级，贯通自主智能体、通信合作与多智能体决策。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能从任一正式目录项定位到定义、公式、代码、交互图、失败样本、复习题与作者官网来源。”；首个对象不一致时停止并回退。",
    tags: ["故障注入", "通信合作", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-official-learning-map-5",
    chapter: "mas-official-learning-map",
    level: 3,
    question:
      "如何排除An Introduction to MultiAgent Systems 第二版权威学习地图中的信息泄漏、策略操纵、消息错位或逻辑模型错误？",
    answer:
      "按Preface、4个Part、17章、Coda和2个附录冻结作者官网197个正式目录层级，贯通自主智能体、通信合作与多智能体决策。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能从任一正式目录项定位到定义、公式、代码、交互图、失败样本、复习题与作者官网来源。”；首个对象不一致时停止并回退。",
    tags: ["机制验证", "社会选择", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-official-learning-map-6",
    chapter: "mas-official-learning-map",
    level: 3,
    question:
      "怎样把An Introduction to MultiAgent Systems 第二版权威学习地图接入全书端到端独立复核？",
    answer:
      "按Preface、4个Part、17章、Coda和2个附录冻结作者官网197个正式目录层级，贯通自主智能体、通信合作与多智能体决策。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能从任一正式目录项定位到定义、公式、代码、交互图、失败样本、复习题与作者官网来源。”；首个对象不一致时停止并回退。",
    tags: ["独立复核", "逻辑基础", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-preface-1",
    chapter: "mas-preface",
    level: 1,
    question: "在Preface中，必须冻结哪些参与者、信息与规则？",
    answer:
      "冻结第二版的范围、删减项与勘误边界，明确多智能体系统的理论、工程和社会选择三条证据链。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Preface写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["版本冻结", "范围合同", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-preface-2",
    chapter: "mas-preface",
    level: 1,
    question: "在Preface中，哪条联合状态证据必须先于最终结果检查？",
    answer:
      "冻结第二版的范围、删减项与勘误边界，明确多智能体系统的理论、工程和社会选择三条证据链。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Preface写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["联合轨迹", "删减说明", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-preface-3",
    chapter: "mas-preface",
    level: 2,
    question: "如何手算Preface的一次期望效用、最佳响应、投票或分配？",
    answer:
      "冻结第二版的范围、删减项与勘误边界，明确多智能体系统的理论、工程和社会选择三条证据链。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Preface写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["手算实例", "勘误", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-preface-4",
    chapter: "mas-preface",
    level: 2,
    question: "怎样为Preface构造只破坏一个条件的失败样本？",
    answer:
      "冻结第二版的范围、删减项与勘误边界，明确多智能体系统的理论、工程和社会选择三条证据链。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Preface写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["故障注入", "版本边界", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-preface-5",
    chapter: "mas-preface",
    level: 3,
    question: "如何排除Preface中的信息泄漏、策略操纵、消息错位或逻辑模型错误？",
    answer:
      "冻结第二版的范围、删减项与勘误边界，明确多智能体系统的理论、工程和社会选择三条证据链。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Preface写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["机制验证", "学习路径", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-preface-6",
    chapter: "mas-preface",
    level: 3,
    question: "怎样把Preface接入全书端到端独立复核？",
    answer:
      "冻结第二版的范围、删减项与勘误边界，明确多智能体系统的理论、工程和社会选择三条证据链。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Preface写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["独立复核", "复现清单", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-part-01-setting-scene-1",
    chapter: "mas-part-01-setting-scene",
    level: 1,
    question: "在Part I Setting the Scene中，必须冻结哪些参与者、信息与规则？",
    answer:
      "建立多智能体系统的问题边界、软件工程视角和社会科学视角，为后续自主性与交互分析提供坐标。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Part I Setting the Scene写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["版本冻结", "领域愿景", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-part-01-setting-scene-2",
    chapter: "mas-part-01-setting-scene",
    level: 1,
    question:
      "在Part I Setting the Scene中，哪条联合状态证据必须先于最终结果检查？",
    answer:
      "建立多智能体系统的问题边界、软件工程视角和社会科学视角，为后续自主性与交互分析提供坐标。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Part I Setting the Scene写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["联合轨迹", "软件范式", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-part-01-setting-scene-3",
    chapter: "mas-part-01-setting-scene",
    level: 2,
    question:
      "如何手算Part I Setting the Scene的一次期望效用、最佳响应、投票或分配？",
    answer:
      "建立多智能体系统的问题边界、软件工程视角和社会科学视角，为后续自主性与交互分析提供坐标。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Part I Setting the Scene写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["手算实例", "社会视角", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-part-01-setting-scene-4",
    chapter: "mas-part-01-setting-scene",
    level: 2,
    question: "怎样为Part I Setting the Scene构造只破坏一个条件的失败样本？",
    answer:
      "建立多智能体系统的问题边界、软件工程视角和社会科学视角，为后续自主性与交互分析提供坐标。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Part I Setting the Scene写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["故障注入", "自主性", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-part-01-setting-scene-5",
    chapter: "mas-part-01-setting-scene",
    level: 3,
    question:
      "如何排除Part I Setting the Scene中的信息泄漏、策略操纵、消息错位或逻辑模型错误？",
    answer:
      "建立多智能体系统的问题边界、软件工程视角和社会科学视角，为后续自主性与交互分析提供坐标。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Part I Setting the Scene写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["机制验证", "交互", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-part-01-setting-scene-6",
    chapter: "mas-part-01-setting-scene",
    level: 3,
    question: "怎样把Part I Setting the Scene接入全书端到端独立复核？",
    answer:
      "建立多智能体系统的问题边界、软件工程视角和社会科学视角，为后续自主性与交互分析提供坐标。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Part I Setting the Scene写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["独立复核", "研究边界", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-01-introduction-1",
    chapter: "mas-01-introduction",
    level: 1,
    question: "在Chapter 1 Introduction中，必须冻结哪些参与者、信息与规则？",
    answer:
      "从领域愿景、软件工程范式、社会理解工具和常见问题出发，区分智能体隐喻、计算模型与可检验系统。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 1 Introduction写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["版本冻结", "Introduction", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-01-introduction-2",
    chapter: "mas-01-introduction",
    level: 1,
    question:
      "在Chapter 1 Introduction中，哪条联合状态证据必须先于最终结果检查？",
    answer:
      "从领域愿景、软件工程范式、社会理解工具和常见问题出发，区分智能体隐喻、计算模型与可检验系统。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 1 Introduction写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["联合轨迹", "The Vision Thing", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-01-introduction-3",
    chapter: "mas-01-introduction",
    level: 2,
    question:
      "如何手算Chapter 1 Introduction的一次期望效用、最佳响应、投票或分配？",
    answer:
      "从领域愿景、软件工程范式、社会理解工具和常见问题出发，区分智能体隐喻、计算模型与可检验系统。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 1 Introduction写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["手算实例", "Some Views of the Field", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-01-introduction-4",
    chapter: "mas-01-introduction",
    level: 2,
    question: "怎样为Chapter 1 Introduction构造只破坏一个条件的失败样本？",
    answer:
      "从领域愿景、软件工程范式、社会理解工具和常见问题出发，区分智能体隐喻、计算模型与可检验系统。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 1 Introduction写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: [
      "故障注入",
      "Agents as a paradigm for software engineering",
      "第二版正式目录",
      "可重放",
    ],
  },
  {
    id: "mas-01-introduction-5",
    chapter: "mas-01-introduction",
    level: 3,
    question:
      "如何排除Chapter 1 Introduction中的信息泄漏、策略操纵、消息错位或逻辑模型错误？",
    answer:
      "从领域愿景、软件工程范式、社会理解工具和常见问题出发，区分智能体隐喻、计算模型与可检验系统。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 1 Introduction写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: [
      "机制验证",
      "Agents as a tool for understanding human societies",
      "第二版正式目录",
      "可重放",
    ],
  },
  {
    id: "mas-01-introduction-6",
    chapter: "mas-01-introduction",
    level: 3,
    question: "怎样把Chapter 1 Introduction接入全书端到端独立复核？",
    answer:
      "从领域愿景、软件工程范式、社会理解工具和常见问题出发，区分智能体隐喻、计算模型与可检验系统。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 1 Introduction写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: [
      "独立复核",
      "Frequently Asked Questions (FAQ)",
      "第二版正式目录",
      "可重放",
    ],
  },
  {
    id: "mas-part-02-intelligent-autonomous-agents-1",
    chapter: "mas-part-02-intelligent-autonomous-agents",
    level: 1,
    question:
      "在Part II Intelligent Autonomous Agents中，必须冻结哪些参与者、信息与规则？",
    answer:
      "从单个自主智能体的定义、推理、实践理性、反应式与混合架构建立可执行基础。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Part II Intelligent Autonomous Agents写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["版本冻结", "自主智能体", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-part-02-intelligent-autonomous-agents-2",
    chapter: "mas-part-02-intelligent-autonomous-agents",
    level: 1,
    question:
      "在Part II Intelligent Autonomous Agents中，哪条联合状态证据必须先于最终结果检查？",
    answer:
      "从单个自主智能体的定义、推理、实践理性、反应式与混合架构建立可执行基础。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Part II Intelligent Autonomous Agents写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["联合轨迹", "演绎推理", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-part-02-intelligent-autonomous-agents-3",
    chapter: "mas-part-02-intelligent-autonomous-agents",
    level: 2,
    question:
      "如何手算Part II Intelligent Autonomous Agents的一次期望效用、最佳响应、投票或分配？",
    answer:
      "从单个自主智能体的定义、推理、实践理性、反应式与混合架构建立可执行基础。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Part II Intelligent Autonomous Agents写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["手算实例", "实践理性", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-part-02-intelligent-autonomous-agents-4",
    chapter: "mas-part-02-intelligent-autonomous-agents",
    level: 2,
    question:
      "怎样为Part II Intelligent Autonomous Agents构造只破坏一个条件的失败样本？",
    answer:
      "从单个自主智能体的定义、推理、实践理性、反应式与混合架构建立可执行基础。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Part II Intelligent Autonomous Agents写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["故障注入", "反应式架构", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-part-02-intelligent-autonomous-agents-5",
    chapter: "mas-part-02-intelligent-autonomous-agents",
    level: 3,
    question:
      "如何排除Part II Intelligent Autonomous Agents中的信息泄漏、策略操纵、消息错位或逻辑模型错误？",
    answer:
      "从单个自主智能体的定义、推理、实践理性、反应式与混合架构建立可执行基础。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Part II Intelligent Autonomous Agents写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["机制验证", "混合架构", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-part-02-intelligent-autonomous-agents-6",
    chapter: "mas-part-02-intelligent-autonomous-agents",
    level: 3,
    question:
      "怎样把Part II Intelligent Autonomous Agents接入全书端到端独立复核？",
    answer:
      "从单个自主智能体的定义、推理、实践理性、反应式与混合架构建立可执行基础。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Part II Intelligent Autonomous Agents写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["独立复核", "行动", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-02-intelligent-agents-1",
    chapter: "mas-02-intelligent-agents",
    level: 1,
    question:
      "在Chapter 2 Intelligent Agents中，必须冻结哪些参与者、信息与规则？",
    answer:
      "比较智能体、对象、专家系统和意向系统，抽象感知、内部状态、决策与行动架构，并说明如何给出任务。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 2 Intelligent Agents写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["版本冻结", "Intelligent Agents", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-02-intelligent-agents-2",
    chapter: "mas-02-intelligent-agents",
    level: 1,
    question:
      "在Chapter 2 Intelligent Agents中，哪条联合状态证据必须先于最终结果检查？",
    answer:
      "比较智能体、对象、专家系统和意向系统，抽象感知、内部状态、决策与行动架构，并说明如何给出任务。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 2 Intelligent Agents写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["联合轨迹", "Intelligent Agents", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-02-intelligent-agents-3",
    chapter: "mas-02-intelligent-agents",
    level: 2,
    question:
      "如何手算Chapter 2 Intelligent Agents的一次期望效用、最佳响应、投票或分配？",
    answer:
      "比较智能体、对象、专家系统和意向系统，抽象感知、内部状态、决策与行动架构，并说明如何给出任务。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 2 Intelligent Agents写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["手算实例", "Agents and Objects", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-02-intelligent-agents-4",
    chapter: "mas-02-intelligent-agents",
    level: 2,
    question:
      "怎样为Chapter 2 Intelligent Agents构造只破坏一个条件的失败样本？",
    answer:
      "比较智能体、对象、专家系统和意向系统，抽象感知、内部状态、决策与行动架构，并说明如何给出任务。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 2 Intelligent Agents写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["故障注入", "Agents and Expert Systems", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-02-intelligent-agents-5",
    chapter: "mas-02-intelligent-agents",
    level: 3,
    question:
      "如何排除Chapter 2 Intelligent Agents中的信息泄漏、策略操纵、消息错位或逻辑模型错误？",
    answer:
      "比较智能体、对象、专家系统和意向系统，抽象感知、内部状态、决策与行动架构，并说明如何给出任务。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 2 Intelligent Agents写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: [
      "机制验证",
      "Agents as Intentional Systems",
      "第二版正式目录",
      "可重放",
    ],
  },
  {
    id: "mas-02-intelligent-agents-6",
    chapter: "mas-02-intelligent-agents",
    level: 3,
    question: "怎样把Chapter 2 Intelligent Agents接入全书端到端独立复核？",
    answer:
      "比较智能体、对象、专家系统和意向系统，抽象感知、内部状态、决策与行动架构，并说明如何给出任务。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 2 Intelligent Agents写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: [
      "独立复核",
      "Abstract Architectures for Intelligent Agents",
      "第二版正式目录",
      "可重放",
    ],
  },
  {
    id: "mas-03-deductive-reasoning-agents-1",
    chapter: "mas-03-deductive-reasoning-agents",
    level: 1,
    question:
      "在Chapter 3 Deductive Reasoning Agents中，必须冻结哪些参与者、信息与规则？",
    answer:
      "把智能体视为定理证明器，连接Agent-Oriented Programming与Concurrent MetateM，验证逻辑推导和行动。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 3 Deductive Reasoning Agents写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: [
      "版本冻结",
      "Deductive Reasoning Agents",
      "第二版正式目录",
      "可重放",
    ],
  },
  {
    id: "mas-03-deductive-reasoning-agents-2",
    chapter: "mas-03-deductive-reasoning-agents",
    level: 1,
    question:
      "在Chapter 3 Deductive Reasoning Agents中，哪条联合状态证据必须先于最终结果检查？",
    answer:
      "把智能体视为定理证明器，连接Agent-Oriented Programming与Concurrent MetateM，验证逻辑推导和行动。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 3 Deductive Reasoning Agents写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["联合轨迹", "Agents as Theorem Provers", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-03-deductive-reasoning-agents-3",
    chapter: "mas-03-deductive-reasoning-agents",
    level: 2,
    question:
      "如何手算Chapter 3 Deductive Reasoning Agents的一次期望效用、最佳响应、投票或分配？",
    answer:
      "把智能体视为定理证明器，连接Agent-Oriented Programming与Concurrent MetateM，验证逻辑推导和行动。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 3 Deductive Reasoning Agents写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: [
      "手算实例",
      "Agent-Oriented Programming",
      "第二版正式目录",
      "可重放",
    ],
  },
  {
    id: "mas-03-deductive-reasoning-agents-4",
    chapter: "mas-03-deductive-reasoning-agents",
    level: 2,
    question:
      "怎样为Chapter 3 Deductive Reasoning Agents构造只破坏一个条件的失败样本？",
    answer:
      "把智能体视为定理证明器，连接Agent-Oriented Programming与Concurrent MetateM，验证逻辑推导和行动。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 3 Deductive Reasoning Agents写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["故障注入", "Concurrent MetateM", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-03-deductive-reasoning-agents-5",
    chapter: "mas-03-deductive-reasoning-agents",
    level: 3,
    question:
      "如何排除Chapter 3 Deductive Reasoning Agents中的信息泄漏、策略操纵、消息错位或逻辑模型错误？",
    answer:
      "把智能体视为定理证明器，连接Agent-Oriented Programming与Concurrent MetateM，验证逻辑推导和行动。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 3 Deductive Reasoning Agents写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["机制验证", "输入合同", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-03-deductive-reasoning-agents-6",
    chapter: "mas-03-deductive-reasoning-agents",
    level: 3,
    question:
      "怎样把Chapter 3 Deductive Reasoning Agents接入全书端到端独立复核？",
    answer:
      "把智能体视为定理证明器，连接Agent-Oriented Programming与Concurrent MetateM，验证逻辑推导和行动。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 3 Deductive Reasoning Agents写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["独立复核", "状态轨迹", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-04-practical-reasoning-agents-1",
    chapter: "mas-04-practical-reasoning-agents",
    level: 1,
    question:
      "在Chapter 4 Practical Reasoning Agents中，必须冻结哪些参与者、信息与规则？",
    answer:
      "把实践理性拆成审议与手段目的推理，构造BDI式计划循环并复核Procedural Reasoning System。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 4 Practical Reasoning Agents写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: [
      "版本冻结",
      "Practical Reasoning Agents",
      "第二版正式目录",
      "可重放",
    ],
  },
  {
    id: "mas-04-practical-reasoning-agents-2",
    chapter: "mas-04-practical-reasoning-agents",
    level: 1,
    question:
      "在Chapter 4 Practical Reasoning Agents中，哪条联合状态证据必须先于最终结果检查？",
    answer:
      "把实践理性拆成审议与手段目的推理，构造BDI式计划循环并复核Procedural Reasoning System。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 4 Practical Reasoning Agents写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: [
      "联合轨迹",
      "Practical Reasoning = Deliberation + Means-Ends Reasoning",
      "第二版正式目录",
      "可重放",
    ],
  },
  {
    id: "mas-04-practical-reasoning-agents-3",
    chapter: "mas-04-practical-reasoning-agents",
    level: 2,
    question:
      "如何手算Chapter 4 Practical Reasoning Agents的一次期望效用、最佳响应、投票或分配？",
    answer:
      "把实践理性拆成审议与手段目的推理，构造BDI式计划循环并复核Procedural Reasoning System。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 4 Practical Reasoning Agents写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["手算实例", "Means--Ends Reasoning", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-04-practical-reasoning-agents-4",
    chapter: "mas-04-practical-reasoning-agents",
    level: 2,
    question:
      "怎样为Chapter 4 Practical Reasoning Agents构造只破坏一个条件的失败样本？",
    answer:
      "把实践理性拆成审议与手段目的推理，构造BDI式计划循环并复核Procedural Reasoning System。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 4 Practical Reasoning Agents写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: [
      "故障注入",
      "Implementing a Practical Reasoning Agent",
      "第二版正式目录",
      "可重放",
    ],
  },
  {
    id: "mas-04-practical-reasoning-agents-5",
    chapter: "mas-04-practical-reasoning-agents",
    level: 3,
    question:
      "如何排除Chapter 4 Practical Reasoning Agents中的信息泄漏、策略操纵、消息错位或逻辑模型错误？",
    answer:
      "把实践理性拆成审议与手段目的推理，构造BDI式计划循环并复核Procedural Reasoning System。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 4 Practical Reasoning Agents写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: [
      "机制验证",
      "The Procedural Reasoning System",
      "第二版正式目录",
      "可重放",
    ],
  },
  {
    id: "mas-04-practical-reasoning-agents-6",
    chapter: "mas-04-practical-reasoning-agents",
    level: 3,
    question:
      "怎样把Chapter 4 Practical Reasoning Agents接入全书端到端独立复核？",
    answer:
      "把实践理性拆成审议与手段目的推理，构造BDI式计划循环并复核Procedural Reasoning System。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 4 Practical Reasoning Agents写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["独立复核", "输入合同", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-05-reactive-hybrid-agents-1",
    chapter: "mas-05-reactive-hybrid-agents",
    level: 1,
    question:
      "在Chapter 5 Reactive and Hybrid Agents中，必须冻结哪些参与者、信息与规则？",
    answer:
      "比较Subsumption、PENGI、situated automata、ANA与多种混合架构，分析响应性、规划和层间仲裁。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 5 Reactive and Hybrid Agents写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: [
      "版本冻结",
      "Reactive and Hybrid Agents",
      "第二版正式目录",
      "可重放",
    ],
  },
  {
    id: "mas-05-reactive-hybrid-agents-2",
    chapter: "mas-05-reactive-hybrid-agents",
    level: 1,
    question:
      "在Chapter 5 Reactive and Hybrid Agents中，哪条联合状态证据必须先于最终结果检查？",
    answer:
      "比较Subsumption、PENGI、situated automata、ANA与多种混合架构，分析响应性、规划和层间仲裁。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 5 Reactive and Hybrid Agents写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["联合轨迹", "Reactive Agents", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-05-reactive-hybrid-agents-3",
    chapter: "mas-05-reactive-hybrid-agents",
    level: 2,
    question:
      "如何手算Chapter 5 Reactive and Hybrid Agents的一次期望效用、最佳响应、投票或分配？",
    answer:
      "比较Subsumption、PENGI、situated automata、ANA与多种混合架构，分析响应性、规划和层间仲裁。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 5 Reactive and Hybrid Agents写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: [
      "手算实例",
      "The Subsumption Architecture",
      "第二版正式目录",
      "可重放",
    ],
  },
  {
    id: "mas-05-reactive-hybrid-agents-4",
    chapter: "mas-05-reactive-hybrid-agents",
    level: 2,
    question:
      "怎样为Chapter 5 Reactive and Hybrid Agents构造只破坏一个条件的失败样本？",
    answer:
      "比较Subsumption、PENGI、situated automata、ANA与多种混合架构，分析响应性、规划和层间仲裁。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 5 Reactive and Hybrid Agents写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["故障注入", "PENGI", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-05-reactive-hybrid-agents-5",
    chapter: "mas-05-reactive-hybrid-agents",
    level: 3,
    question:
      "如何排除Chapter 5 Reactive and Hybrid Agents中的信息泄漏、策略操纵、消息错位或逻辑模型错误？",
    answer:
      "比较Subsumption、PENGI、situated automata、ANA与多种混合架构，分析响应性、规划和层间仲裁。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 5 Reactive and Hybrid Agents写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["机制验证", "Situated automata", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-05-reactive-hybrid-agents-6",
    chapter: "mas-05-reactive-hybrid-agents",
    level: 3,
    question:
      "怎样把Chapter 5 Reactive and Hybrid Agents接入全书端到端独立复核？",
    answer:
      "比较Subsumption、PENGI、situated automata、ANA与多种混合架构，分析响应性、规划和层间仲裁。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 5 Reactive and Hybrid Agents写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: [
      "独立复核",
      "The Agent Network Architecture",
      "第二版正式目录",
      "可重放",
    ],
  },
  {
    id: "mas-part-03-communication-cooperation-1",
    chapter: "mas-part-03-communication-cooperation",
    level: 1,
    question:
      "在Part III Communication and Cooperation中，必须冻结哪些参与者、信息与规则？",
    answer:
      "从共享语义、言语行为和通信语言进入任务共享、结果共享、协调、方法论与实际应用。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Part III Communication and Cooperation写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["版本冻结", "共享本体", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-part-03-communication-cooperation-2",
    chapter: "mas-part-03-communication-cooperation",
    level: 1,
    question:
      "在Part III Communication and Cooperation中，哪条联合状态证据必须先于最终结果检查？",
    answer:
      "从共享语义、言语行为和通信语言进入任务共享、结果共享、协调、方法论与实际应用。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Part III Communication and Cooperation写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["联合轨迹", "通信", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-part-03-communication-cooperation-3",
    chapter: "mas-part-03-communication-cooperation",
    level: 2,
    question:
      "如何手算Part III Communication and Cooperation的一次期望效用、最佳响应、投票或分配？",
    answer:
      "从共享语义、言语行为和通信语言进入任务共享、结果共享、协调、方法论与实际应用。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Part III Communication and Cooperation写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["手算实例", "合作", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-part-03-communication-cooperation-4",
    chapter: "mas-part-03-communication-cooperation",
    level: 2,
    question:
      "怎样为Part III Communication and Cooperation构造只破坏一个条件的失败样本？",
    answer:
      "从共享语义、言语行为和通信语言进入任务共享、结果共享、协调、方法论与实际应用。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Part III Communication and Cooperation写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["故障注入", "协调", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-part-03-communication-cooperation-5",
    chapter: "mas-part-03-communication-cooperation",
    level: 3,
    question:
      "如何排除Part III Communication and Cooperation中的信息泄漏、策略操纵、消息错位或逻辑模型错误？",
    answer:
      "从共享语义、言语行为和通信语言进入任务共享、结果共享、协调、方法论与实际应用。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Part III Communication and Cooperation写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["机制验证", "方法论", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-part-03-communication-cooperation-6",
    chapter: "mas-part-03-communication-cooperation",
    level: 3,
    question:
      "怎样把Part III Communication and Cooperation接入全书端到端独立复核？",
    answer:
      "从共享语义、言语行为和通信语言进入任务共享、结果共享、协调、方法论与实际应用。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Part III Communication and Cooperation写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["独立复核", "应用", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-06-understanding-each-other-1",
    chapter: "mas-06-understanding-each-other",
    level: 1,
    question:
      "在Chapter 6 Understanding Each Other中，必须冻结哪些参与者、信息与规则？",
    answer:
      "从本体构件、本体类型和XML、OWL、KIF、RDF进入本体构建与工具，检查共享符号是否真有共同语义。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 6 Understanding Each Other写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["版本冻结", "Understanding Each Other", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-06-understanding-each-other-2",
    chapter: "mas-06-understanding-each-other",
    level: 1,
    question:
      "在Chapter 6 Understanding Each Other中，哪条联合状态证据必须先于最终结果检查？",
    answer:
      "从本体构件、本体类型和XML、OWL、KIF、RDF进入本体构建与工具，检查共享符号是否真有共同语义。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 6 Understanding Each Other写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["联合轨迹", "Ontology Fundamentals", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-06-understanding-each-other-3",
    chapter: "mas-06-understanding-each-other",
    level: 2,
    question:
      "如何手算Chapter 6 Understanding Each Other的一次期望效用、最佳响应、投票或分配？",
    answer:
      "从本体构件、本体类型和XML、OWL、KIF、RDF进入本体构建与工具，检查共享符号是否真有共同语义。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 6 Understanding Each Other写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["手算实例", "Ontology Building Blocks", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-06-understanding-each-other-4",
    chapter: "mas-06-understanding-each-other",
    level: 2,
    question:
      "怎样为Chapter 6 Understanding Each Other构造只破坏一个条件的失败样本？",
    answer:
      "从本体构件、本体类型和XML、OWL、KIF、RDF进入本体构建与工具，检查共享符号是否真有共同语义。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 6 Understanding Each Other写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["故障注入", "An Ontology of Ontologies", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-06-understanding-each-other-5",
    chapter: "mas-06-understanding-each-other",
    level: 3,
    question:
      "如何排除Chapter 6 Understanding Each Other中的信息泄漏、策略操纵、消息错位或逻辑模型错误？",
    answer:
      "从本体构件、本体类型和XML、OWL、KIF、RDF进入本体构建与工具，检查共享符号是否真有共同语义。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 6 Understanding Each Other写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["机制验证", "Ontology Languages", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-06-understanding-each-other-6",
    chapter: "mas-06-understanding-each-other",
    level: 3,
    question:
      "怎样把Chapter 6 Understanding Each Other接入全书端到端独立复核？",
    answer:
      "从本体构件、本体类型和XML、OWL、KIF、RDF进入本体构建与工具，检查共享符号是否真有共同语义。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 6 Understanding Each Other写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["独立复核", "XML -- Ad Hoc Ontologies", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-07-communicating-1",
    chapter: "mas-07-communicating",
    level: 1,
    question: "在Chapter 7 Communicating中，必须冻结哪些参与者、信息与规则？",
    answer:
      "从Austin、Searle及计划和理性行动理论进入KQML、FIPA ACL与JADE，区分消息语法、语义和承诺。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 7 Communicating写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["版本冻结", "Communicating", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-07-communicating-2",
    chapter: "mas-07-communicating",
    level: 1,
    question:
      "在Chapter 7 Communicating中，哪条联合状态证据必须先于最终结果检查？",
    answer:
      "从Austin、Searle及计划和理性行动理论进入KQML、FIPA ACL与JADE，区分消息语法、语义和承诺。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 7 Communicating写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["联合轨迹", "Speech Acts", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-07-communicating-3",
    chapter: "mas-07-communicating",
    level: 2,
    question:
      "如何手算Chapter 7 Communicating的一次期望效用、最佳响应、投票或分配？",
    answer:
      "从Austin、Searle及计划和理性行动理论进入KQML、FIPA ACL与JADE，区分消息语法、语义和承诺。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 7 Communicating写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["手算实例", "Austin", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-07-communicating-4",
    chapter: "mas-07-communicating",
    level: 2,
    question: "怎样为Chapter 7 Communicating构造只破坏一个条件的失败样本？",
    answer:
      "从Austin、Searle及计划和理性行动理论进入KQML、FIPA ACL与JADE，区分消息语法、语义和承诺。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 7 Communicating写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["故障注入", "Searle", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-07-communicating-5",
    chapter: "mas-07-communicating",
    level: 3,
    question:
      "如何排除Chapter 7 Communicating中的信息泄漏、策略操纵、消息错位或逻辑模型错误？",
    answer:
      "从Austin、Searle及计划和理性行动理论进入KQML、FIPA ACL与JADE，区分消息语法、语义和承诺。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 7 Communicating写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: [
      "机制验证",
      "The plan-based theory of speech acts",
      "第二版正式目录",
      "可重放",
    ],
  },
  {
    id: "mas-07-communicating-6",
    chapter: "mas-07-communicating",
    level: 3,
    question: "怎样把Chapter 7 Communicating接入全书端到端独立复核？",
    answer:
      "从Austin、Searle及计划和理性行动理论进入KQML、FIPA ACL与JADE，区分消息语法、语义和承诺。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 7 Communicating写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: [
      "独立复核",
      "Speech acts as rational action",
      "第二版正式目录",
      "可重放",
    ],
  },
  {
    id: "mas-08-working-together-1",
    chapter: "mas-08-working-together",
    level: 1,
    question:
      "在Chapter 8 Working Together中，必须冻结哪些参与者、信息与规则？",
    answer:
      "覆盖协作式分布问题求解、合同网、结果共享、不一致处理、协调、联合意图、规范与同步。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 8 Working Together写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["版本冻结", "Working Together", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-08-working-together-2",
    chapter: "mas-08-working-together",
    level: 1,
    question:
      "在Chapter 8 Working Together中，哪条联合状态证据必须先于最终结果检查？",
    answer:
      "覆盖协作式分布问题求解、合同网、结果共享、不一致处理、协调、联合意图、规范与同步。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 8 Working Together写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: [
      "联合轨迹",
      "Cooperative Distributed Problem Solving",
      "第二版正式目录",
      "可重放",
    ],
  },
  {
    id: "mas-08-working-together-3",
    chapter: "mas-08-working-together",
    level: 2,
    question:
      "如何手算Chapter 8 Working Together的一次期望效用、最佳响应、投票或分配？",
    answer:
      "覆盖协作式分布问题求解、合同网、结果共享、不一致处理、协调、联合意图、规范与同步。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 8 Working Together写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: [
      "手算实例",
      "Task Sharing and Result Sharing",
      "第二版正式目录",
      "可重放",
    ],
  },
  {
    id: "mas-08-working-together-4",
    chapter: "mas-08-working-together",
    level: 2,
    question: "怎样为Chapter 8 Working Together构造只破坏一个条件的失败样本？",
    answer:
      "覆盖协作式分布问题求解、合同网、结果共享、不一致处理、协调、联合意图、规范与同步。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 8 Working Together写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: [
      "故障注入",
      "Task sharing in the Contract Net",
      "第二版正式目录",
      "可重放",
    ],
  },
  {
    id: "mas-08-working-together-5",
    chapter: "mas-08-working-together",
    level: 3,
    question:
      "如何排除Chapter 8 Working Together中的信息泄漏、策略操纵、消息错位或逻辑模型错误？",
    answer:
      "覆盖协作式分布问题求解、合同网、结果共享、不一致处理、协调、联合意图、规范与同步。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 8 Working Together写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["机制验证", "Result Sharing", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-08-working-together-6",
    chapter: "mas-08-working-together",
    level: 3,
    question: "怎样把Chapter 8 Working Together接入全书端到端独立复核？",
    answer:
      "覆盖协作式分布问题求解、合同网、结果共享、不一致处理、协调、联合意图、规范与同步。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 8 Working Together写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: [
      "独立复核",
      "Combining Task and Result Sharing",
      "第二版正式目录",
      "可重放",
    ],
  },
  {
    id: "mas-09-methodologies-1",
    chapter: "mas-09-methodologies",
    level: 1,
    question: "在Chapter 9 Methodologies中，必须冻结哪些参与者、信息与规则？",
    answer:
      "判断何时适合Agent方案，比较AAII、Gaia、Tropos、Prometheus、Agent UML与Agents in Z，并识别开发陷阱。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 9 Methodologies写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["版本冻结", "Methodologies", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-09-methodologies-2",
    chapter: "mas-09-methodologies",
    level: 1,
    question:
      "在Chapter 9 Methodologies中，哪条联合状态证据必须先于最终结果检查？",
    answer:
      "判断何时适合Agent方案，比较AAII、Gaia、Tropos、Prometheus、Agent UML与Agents in Z，并识别开发陷阱。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 9 Methodologies写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: [
      "联合轨迹",
      "When is an Agent-Based Solution Appropriate?",
      "第二版正式目录",
      "可重放",
    ],
  },
  {
    id: "mas-09-methodologies-3",
    chapter: "mas-09-methodologies",
    level: 2,
    question:
      "如何手算Chapter 9 Methodologies的一次期望效用、最佳响应、投票或分配？",
    answer:
      "判断何时适合Agent方案，比较AAII、Gaia、Tropos、Prometheus、Agent UML与Agents in Z，并识别开发陷阱。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 9 Methodologies写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: [
      "手算实例",
      "Agent-Oriented Analysis and Design",
      "第二版正式目录",
      "可重放",
    ],
  },
  {
    id: "mas-09-methodologies-4",
    chapter: "mas-09-methodologies",
    level: 2,
    question: "怎样为Chapter 9 Methodologies构造只破坏一个条件的失败样本？",
    answer:
      "判断何时适合Agent方案，比较AAII、Gaia、Tropos、Prometheus、Agent UML与Agents in Z，并识别开发陷阱。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 9 Methodologies写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["故障注入", "The AAII methodology", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-09-methodologies-5",
    chapter: "mas-09-methodologies",
    level: 3,
    question:
      "如何排除Chapter 9 Methodologies中的信息泄漏、策略操纵、消息错位或逻辑模型错误？",
    answer:
      "判断何时适合Agent方案，比较AAII、Gaia、Tropos、Prometheus、Agent UML与Agents in Z，并识别开发陷阱。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 9 Methodologies写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["机制验证", "Gaia", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-09-methodologies-6",
    chapter: "mas-09-methodologies",
    level: 3,
    question: "怎样把Chapter 9 Methodologies接入全书端到端独立复核？",
    answer:
      "判断何时适合Agent方案，比较AAII、Gaia、Tropos、Prometheus、Agent UML与Agents in Z，并识别开发陷阱。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 9 Methodologies写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["独立复核", "Tropos", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-10-applications-1",
    chapter: "mas-10-applications",
    level: 1,
    question: "在Chapter 10 Applications中，必须冻结哪些参与者、信息与规则？",
    answer:
      "把工作流、分布式感知、信息检索、电子商务、人机界面、虚拟环境和社会仿真放入统一应用评估矩阵。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 10 Applications写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["版本冻结", "Applications", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-10-applications-2",
    chapter: "mas-10-applications",
    level: 1,
    question:
      "在Chapter 10 Applications中，哪条联合状态证据必须先于最终结果检查？",
    answer:
      "把工作流、分布式感知、信息检索、电子商务、人机界面、虚拟环境和社会仿真放入统一应用评估矩阵。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 10 Applications写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: [
      "联合轨迹",
      "Agents for Workflow and Business Process Management",
      "第二版正式目录",
      "可重放",
    ],
  },
  {
    id: "mas-10-applications-3",
    chapter: "mas-10-applications",
    level: 2,
    question:
      "如何手算Chapter 10 Applications的一次期望效用、最佳响应、投票或分配？",
    answer:
      "把工作流、分布式感知、信息检索、电子商务、人机界面、虚拟环境和社会仿真放入统一应用评估矩阵。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 10 Applications写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: [
      "手算实例",
      "Agents for Distributed Sensing",
      "第二版正式目录",
      "可重放",
    ],
  },
  {
    id: "mas-10-applications-4",
    chapter: "mas-10-applications",
    level: 2,
    question: "怎样为Chapter 10 Applications构造只破坏一个条件的失败样本？",
    answer:
      "把工作流、分布式感知、信息检索、电子商务、人机界面、虚拟环境和社会仿真放入统一应用评估矩阵。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 10 Applications写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: [
      "故障注入",
      "Agents for Information Retrieval and Management",
      "第二版正式目录",
      "可重放",
    ],
  },
  {
    id: "mas-10-applications-5",
    chapter: "mas-10-applications",
    level: 3,
    question:
      "如何排除Chapter 10 Applications中的信息泄漏、策略操纵、消息错位或逻辑模型错误？",
    answer:
      "把工作流、分布式感知、信息检索、电子商务、人机界面、虚拟环境和社会仿真放入统一应用评估矩阵。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 10 Applications写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: [
      "机制验证",
      "Agents for Electronic Commerce",
      "第二版正式目录",
      "可重放",
    ],
  },
  {
    id: "mas-10-applications-6",
    chapter: "mas-10-applications",
    level: 3,
    question: "怎样把Chapter 10 Applications接入全书端到端独立复核？",
    answer:
      "把工作流、分布式感知、信息检索、电子商务、人机界面、虚拟环境和社会仿真放入统一应用评估矩阵。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 10 Applications写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: [
      "独立复核",
      "Agents for Human--Computer Interfaces",
      "第二版正式目录",
      "可重放",
    ],
  },
  {
    id: "mas-part-04-multiagent-decision-making-1",
    chapter: "mas-part-04-multiagent-decision-making",
    level: 1,
    question:
      "在Part IV Multiagent Decision Making中，必须冻结哪些参与者、信息与规则？",
    answer:
      "用效用、均衡、社会选择、联盟、拍卖、议价、论证和逻辑分析多个自治决策者的稳定性与计算边界。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Part IV Multiagent Decision Making写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["版本冻结", "效用", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-part-04-multiagent-decision-making-2",
    chapter: "mas-part-04-multiagent-decision-making",
    level: 1,
    question:
      "在Part IV Multiagent Decision Making中，哪条联合状态证据必须先于最终结果检查？",
    answer:
      "用效用、均衡、社会选择、联盟、拍卖、议价、论证和逻辑分析多个自治决策者的稳定性与计算边界。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Part IV Multiagent Decision Making写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["联合轨迹", "均衡", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-part-04-multiagent-decision-making-3",
    chapter: "mas-part-04-multiagent-decision-making",
    level: 2,
    question:
      "如何手算Part IV Multiagent Decision Making的一次期望效用、最佳响应、投票或分配？",
    answer:
      "用效用、均衡、社会选择、联盟、拍卖、议价、论证和逻辑分析多个自治决策者的稳定性与计算边界。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Part IV Multiagent Decision Making写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["手算实例", "社会选择", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-part-04-multiagent-decision-making-4",
    chapter: "mas-part-04-multiagent-decision-making",
    level: 2,
    question:
      "怎样为Part IV Multiagent Decision Making构造只破坏一个条件的失败样本？",
    answer:
      "用效用、均衡、社会选择、联盟、拍卖、议价、论证和逻辑分析多个自治决策者的稳定性与计算边界。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Part IV Multiagent Decision Making写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["故障注入", "联盟", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-part-04-multiagent-decision-making-5",
    chapter: "mas-part-04-multiagent-decision-making",
    level: 3,
    question:
      "如何排除Part IV Multiagent Decision Making中的信息泄漏、策略操纵、消息错位或逻辑模型错误？",
    answer:
      "用效用、均衡、社会选择、联盟、拍卖、议价、论证和逻辑分析多个自治决策者的稳定性与计算边界。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Part IV Multiagent Decision Making写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["机制验证", "机制", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-part-04-multiagent-decision-making-6",
    chapter: "mas-part-04-multiagent-decision-making",
    level: 3,
    question:
      "怎样把Part IV Multiagent Decision Making接入全书端到端独立复核？",
    answer:
      "用效用、均衡、社会选择、联盟、拍卖、议价、论证和逻辑分析多个自治决策者的稳定性与计算边界。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Part IV Multiagent Decision Making写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["独立复核", "逻辑", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-11-multiagent-interactions-1",
    chapter: "mas-11-multiagent-interactions",
    level: 1,
    question:
      "在Chapter 11 Multiagent Interactions中，必须冻结哪些参与者、信息与规则？",
    answer:
      "从效用与偏好进入占优策略、纳什均衡、帕累托效率、社会福利、零和交互、囚徒困境与依赖关系。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 11 Multiagent Interactions写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["版本冻结", "Multiagent Interactions", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-11-multiagent-interactions-2",
    chapter: "mas-11-multiagent-interactions",
    level: 1,
    question:
      "在Chapter 11 Multiagent Interactions中，哪条联合状态证据必须先于最终结果检查？",
    answer:
      "从效用与偏好进入占优策略、纳什均衡、帕累托效率、社会福利、零和交互、囚徒困境与依赖关系。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 11 Multiagent Interactions写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["联合轨迹", "Utilities and Preferences", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-11-multiagent-interactions-3",
    chapter: "mas-11-multiagent-interactions",
    level: 2,
    question:
      "如何手算Chapter 11 Multiagent Interactions的一次期望效用、最佳响应、投票或分配？",
    answer:
      "从效用与偏好进入占优策略、纳什均衡、帕累托效率、社会福利、零和交互、囚徒困境与依赖关系。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 11 Multiagent Interactions写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["手算实例", "Setting the Scene", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-11-multiagent-interactions-4",
    chapter: "mas-11-multiagent-interactions",
    level: 2,
    question:
      "怎样为Chapter 11 Multiagent Interactions构造只破坏一个条件的失败样本？",
    answer:
      "从效用与偏好进入占优策略、纳什均衡、帕累托效率、社会福利、零和交互、囚徒困境与依赖关系。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 11 Multiagent Interactions写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: [
      "故障注入",
      "Solution Concepts and Solution Properties",
      "第二版正式目录",
      "可重放",
    ],
  },
  {
    id: "mas-11-multiagent-interactions-5",
    chapter: "mas-11-multiagent-interactions",
    level: 3,
    question:
      "如何排除Chapter 11 Multiagent Interactions中的信息泄漏、策略操纵、消息错位或逻辑模型错误？",
    answer:
      "从效用与偏好进入占优策略、纳什均衡、帕累托效率、社会福利、零和交互、囚徒困境与依赖关系。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 11 Multiagent Interactions写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["机制验证", "Dominant Strategies", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-11-multiagent-interactions-6",
    chapter: "mas-11-multiagent-interactions",
    level: 3,
    question:
      "怎样把Chapter 11 Multiagent Interactions接入全书端到端独立复核？",
    answer:
      "从效用与偏好进入占优策略、纳什均衡、帕累托效率、社会福利、零和交互、囚徒困境与依赖关系。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 11 Multiagent Interactions写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["独立复核", "Nash Equilibria", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-12-making-group-decisions-1",
    chapter: "mas-12-making-group-decisions",
    level: 1,
    question:
      "在Chapter 12 Making Group Decisions中，必须冻结哪些参与者、信息与规则？",
    answer:
      "比较多数制、序贯多数、Borda与Slater，检验社会选择性质、Arrow定理和策略操纵。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 12 Making Group Decisions写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["版本冻结", "Making Group Decisions", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-12-making-group-decisions-2",
    chapter: "mas-12-making-group-decisions",
    level: 1,
    question:
      "在Chapter 12 Making Group Decisions中，哪条联合状态证据必须先于最终结果检查？",
    answer:
      "比较多数制、序贯多数、Borda与Slater，检验社会选择性质、Arrow定理和策略操纵。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 12 Making Group Decisions写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: [
      "联合轨迹",
      "Social Welfare Functions and Social Choice Functions",
      "第二版正式目录",
      "可重放",
    ],
  },
  {
    id: "mas-12-making-group-decisions-3",
    chapter: "mas-12-making-group-decisions",
    level: 2,
    question:
      "如何手算Chapter 12 Making Group Decisions的一次期望效用、最佳响应、投票或分配？",
    answer:
      "比较多数制、序贯多数、Borda与Slater，检验社会选择性质、Arrow定理和策略操纵。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 12 Making Group Decisions写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["手算实例", "Voting Procedures", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-12-making-group-decisions-4",
    chapter: "mas-12-making-group-decisions",
    level: 2,
    question:
      "怎样为Chapter 12 Making Group Decisions构造只破坏一个条件的失败样本？",
    answer:
      "比较多数制、序贯多数、Borda与Slater，检验社会选择性质、Arrow定理和策略操纵。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 12 Making Group Decisions写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["故障注入", "Plurality", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-12-making-group-decisions-5",
    chapter: "mas-12-making-group-decisions",
    level: 3,
    question:
      "如何排除Chapter 12 Making Group Decisions中的信息泄漏、策略操纵、消息错位或逻辑模型错误？",
    answer:
      "比较多数制、序贯多数、Borda与Slater，检验社会选择性质、Arrow定理和策略操纵。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 12 Making Group Decisions写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: [
      "机制验证",
      "Sequential Majority Elections",
      "第二版正式目录",
      "可重放",
    ],
  },
  {
    id: "mas-12-making-group-decisions-6",
    chapter: "mas-12-making-group-decisions",
    level: 3,
    question: "怎样把Chapter 12 Making Group Decisions接入全书端到端独立复核？",
    answer:
      "比较多数制、序贯多数、Borda与Slater，检验社会选择性质、Arrow定理和策略操纵。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 12 Making Group Decisions写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["独立复核", "The Borda Count", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-13-forming-coalitions-1",
    chapter: "mas-13-forming-coalitions",
    level: 1,
    question:
      "在Chapter 13 Forming Coalitions中，必须冻结哪些参与者、信息与规则？",
    answer:
      "从合作博弈、核心与Shapley值进入模块化表示、简单博弈、带目标联盟和联盟结构形成。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 13 Forming Coalitions写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["版本冻结", "Forming Coalitions", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-13-forming-coalitions-2",
    chapter: "mas-13-forming-coalitions",
    level: 1,
    question:
      "在Chapter 13 Forming Coalitions中，哪条联合状态证据必须先于最终结果检查？",
    answer:
      "从合作博弈、核心与Shapley值进入模块化表示、简单博弈、带目标联盟和联盟结构形成。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 13 Forming Coalitions写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["联合轨迹", "Cooperative Games", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-13-forming-coalitions-3",
    chapter: "mas-13-forming-coalitions",
    level: 2,
    question:
      "如何手算Chapter 13 Forming Coalitions的一次期望效用、最佳响应、投票或分配？",
    answer:
      "从合作博弈、核心与Shapley值进入模块化表示、简单博弈、带目标联盟和联盟结构形成。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 13 Forming Coalitions写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["手算实例", "The Core", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-13-forming-coalitions-4",
    chapter: "mas-13-forming-coalitions",
    level: 2,
    question:
      "怎样为Chapter 13 Forming Coalitions构造只破坏一个条件的失败样本？",
    answer:
      "从合作博弈、核心与Shapley值进入模块化表示、简单博弈、带目标联盟和联盟结构形成。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 13 Forming Coalitions写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["故障注入", "The Shapley Value", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-13-forming-coalitions-5",
    chapter: "mas-13-forming-coalitions",
    level: 3,
    question:
      "如何排除Chapter 13 Forming Coalitions中的信息泄漏、策略操纵、消息错位或逻辑模型错误？",
    answer:
      "从合作博弈、核心与Shapley值进入模块化表示、简单博弈、带目标联盟和联盟结构形成。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 13 Forming Coalitions写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: [
      "机制验证",
      "Computational and Representational Issues",
      "第二版正式目录",
      "可重放",
    ],
  },
  {
    id: "mas-13-forming-coalitions-6",
    chapter: "mas-13-forming-coalitions",
    level: 3,
    question: "怎样把Chapter 13 Forming Coalitions接入全书端到端独立复核？",
    answer:
      "从合作博弈、核心与Shapley值进入模块化表示、简单博弈、带目标联盟和联盟结构形成。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 13 Forming Coalitions写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["独立复核", "Modular Representations", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-14-allocating-scarce-resources-1",
    chapter: "mas-14-allocating-scarce-resources",
    level: 1,
    question:
      "在Chapter 14 Allocating Scarce Resources中，必须冻结哪些参与者、信息与规则？",
    answer:
      "比较单物品与组合拍卖、Vickrey和VCG机制、收益、合谋、胜者确定及在线广告拍卖。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 14 Allocating Scarce Resources写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: [
      "版本冻结",
      "Allocating Scarce Resources",
      "第二版正式目录",
      "可重放",
    ],
  },
  {
    id: "mas-14-allocating-scarce-resources-2",
    chapter: "mas-14-allocating-scarce-resources",
    level: 1,
    question:
      "在Chapter 14 Allocating Scarce Resources中，哪条联合状态证据必须先于最终结果检查？",
    answer:
      "比较单物品与组合拍卖、Vickrey和VCG机制、收益、合谋、胜者确定及在线广告拍卖。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 14 Allocating Scarce Resources写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["联合轨迹", "Classifying Auctions", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-14-allocating-scarce-resources-3",
    chapter: "mas-14-allocating-scarce-resources",
    level: 2,
    question:
      "如何手算Chapter 14 Allocating Scarce Resources的一次期望效用、最佳响应、投票或分配？",
    answer:
      "比较单物品与组合拍卖、Vickrey和VCG机制、收益、合谋、胜者确定及在线广告拍卖。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 14 Allocating Scarce Resources写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["手算实例", "Auctions for Single Items", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-14-allocating-scarce-resources-4",
    chapter: "mas-14-allocating-scarce-resources",
    level: 2,
    question:
      "怎样为Chapter 14 Allocating Scarce Resources构造只破坏一个条件的失败样本？",
    answer:
      "比较单物品与组合拍卖、Vickrey和VCG机制、收益、合谋、胜者确定及在线广告拍卖。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 14 Allocating Scarce Resources写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["故障注入", "English auctions", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-14-allocating-scarce-resources-5",
    chapter: "mas-14-allocating-scarce-resources",
    level: 3,
    question:
      "如何排除Chapter 14 Allocating Scarce Resources中的信息泄漏、策略操纵、消息错位或逻辑模型错误？",
    answer:
      "比较单物品与组合拍卖、Vickrey和VCG机制、收益、合谋、胜者确定及在线广告拍卖。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 14 Allocating Scarce Resources写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["机制验证", "Dutch auctions", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-14-allocating-scarce-resources-6",
    chapter: "mas-14-allocating-scarce-resources",
    level: 3,
    question:
      "怎样把Chapter 14 Allocating Scarce Resources接入全书端到端独立复核？",
    answer:
      "比较单物品与组合拍卖、Vickrey和VCG机制、收益、合谋、胜者确定及在线广告拍卖。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 14 Allocating Scarce Resources写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: [
      "独立复核",
      "First-price sealed-bid auctions",
      "第二版正式目录",
      "可重放",
    ],
  },
  {
    id: "mas-15-bargaining-1",
    chapter: "mas-15-bargaining",
    level: 1,
    question: "在Chapter 15 Bargaining中，必须冻结哪些参与者、信息与规则？",
    answer:
      "从议价参数和交替出价进入耐心、让步函数、任务分配、单调让步、Zeuthen策略、欺骗与资源分配。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 15 Bargaining写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["版本冻结", "Bargaining", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-15-bargaining-2",
    chapter: "mas-15-bargaining",
    level: 1,
    question:
      "在Chapter 15 Bargaining中，哪条联合状态证据必须先于最终结果检查？",
    answer:
      "从议价参数和交替出价进入耐心、让步函数、任务分配、单调让步、Zeuthen策略、欺骗与资源分配。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 15 Bargaining写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["联合轨迹", "Negotiation Parameters", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-15-bargaining-3",
    chapter: "mas-15-bargaining",
    level: 2,
    question:
      "如何手算Chapter 15 Bargaining的一次期望效用、最佳响应、投票或分配？",
    answer:
      "从议价参数和交替出价进入耐心、让步函数、任务分配、单调让步、Zeuthen策略、欺骗与资源分配。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 15 Bargaining写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: [
      "手算实例",
      "Bargaining for Resource Division",
      "第二版正式目录",
      "可重放",
    ],
  },
  {
    id: "mas-15-bargaining-4",
    chapter: "mas-15-bargaining",
    level: 2,
    question: "怎样为Chapter 15 Bargaining构造只破坏一个条件的失败样本？",
    answer:
      "从议价参数和交替出价进入耐心、让步函数、任务分配、单调让步、Zeuthen策略、欺骗与资源分配。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 15 Bargaining写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["故障注入", "Patient Players", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-15-bargaining-5",
    chapter: "mas-15-bargaining",
    level: 3,
    question:
      "如何排除Chapter 15 Bargaining中的信息泄漏、策略操纵、消息错位或逻辑模型错误？",
    answer:
      "从议价参数和交替出价进入耐心、让步函数、任务分配、单调让步、Zeuthen策略、欺骗与资源分配。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 15 Bargaining写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["机制验证", "Impatient Players", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-15-bargaining-6",
    chapter: "mas-15-bargaining",
    level: 3,
    question: "怎样把Chapter 15 Bargaining接入全书端到端独立复核？",
    answer:
      "从议价参数和交替出价进入耐心、让步函数、任务分配、单调让步、Zeuthen策略、欺骗与资源分配。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 15 Bargaining写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: [
      "独立复核",
      "Negotiation Decision Functions",
      "第二版正式目录",
      "可重放",
    ],
  },
  {
    id: "mas-16-arguing-1",
    chapter: "mas-16-arguing",
    level: 1,
    question: "在Chapter 16 Arguing中，必须冻结哪些参与者、信息与规则？",
    answer:
      "从论证类型进入抽象论证、preferred extensions、可信与怀疑接受、价值、演绎论证和对话系统。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 16 Arguing写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["版本冻结", "Arguing", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-16-arguing-2",
    chapter: "mas-16-arguing",
    level: 1,
    question: "在Chapter 16 Arguing中，哪条联合状态证据必须先于最终结果检查？",
    answer:
      "从论证类型进入抽象论证、preferred extensions、可信与怀疑接受、价值、演绎论证和对话系统。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 16 Arguing写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["联合轨迹", "Types of Argument", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-16-arguing-3",
    chapter: "mas-16-arguing",
    level: 2,
    question:
      "如何手算Chapter 16 Arguing的一次期望效用、最佳响应、投票或分配？",
    answer:
      "从论证类型进入抽象论证、preferred extensions、可信与怀疑接受、价值、演绎论证和对话系统。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 16 Arguing写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["手算实例", "Abstract Argumentation", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-16-arguing-4",
    chapter: "mas-16-arguing",
    level: 2,
    question: "怎样为Chapter 16 Arguing构造只破坏一个条件的失败样本？",
    answer:
      "从论证类型进入抽象论证、preferred extensions、可信与怀疑接受、价值、演绎论证和对话系统。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 16 Arguing写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["故障注入", "Preferred Extensions", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-16-arguing-5",
    chapter: "mas-16-arguing",
    level: 3,
    question:
      "如何排除Chapter 16 Arguing中的信息泄漏、策略操纵、消息错位或逻辑模型错误？",
    answer:
      "从论证类型进入抽象论证、preferred extensions、可信与怀疑接受、价值、演绎论证和对话系统。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 16 Arguing写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: [
      "机制验证",
      "Credulous and Sceptical Acceptance",
      "第二版正式目录",
      "可重放",
    ],
  },
  {
    id: "mas-16-arguing-6",
    chapter: "mas-16-arguing",
    level: 3,
    question: "怎样把Chapter 16 Arguing接入全书端到端独立复核？",
    answer:
      "从论证类型进入抽象论证、preferred extensions、可信与怀疑接受、价值、演绎论证和对话系统。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 16 Arguing写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: [
      "独立复核",
      "Preferences in Abstract Argument Systems",
      "第二版正式目录",
      "可重放",
    ],
  },
  {
    id: "mas-17-logical-foundations-1",
    chapter: "mas-17-logical-foundations",
    level: 1,
    question:
      "在Chapter 17 Logical Foundations中，必须冻结哪些参与者、信息与规则？",
    answer:
      "用可能世界、正规模态逻辑、知识与信念、意图、言语行为、合作逻辑及规范和验证连接全书形式基础。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 17 Logical Foundations写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["版本冻结", "Logical Foundations", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-17-logical-foundations-2",
    chapter: "mas-17-logical-foundations",
    level: 1,
    question:
      "在Chapter 17 Logical Foundations中，哪条联合状态证据必须先于最终结果检查？",
    answer:
      "用可能世界、正规模态逻辑、知识与信念、意图、言语行为、合作逻辑及规范和验证连接全书形式基础。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 17 Logical Foundations写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: [
      "联合轨迹",
      "Logics for Knowledge and Belief",
      "第二版正式目录",
      "可重放",
    ],
  },
  {
    id: "mas-17-logical-foundations-3",
    chapter: "mas-17-logical-foundations",
    level: 2,
    question:
      "如何手算Chapter 17 Logical Foundations的一次期望效用、最佳响应、投票或分配？",
    answer:
      "用可能世界、正规模态逻辑、知识与信念、意图、言语行为、合作逻辑及规范和验证连接全书形式基础。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 17 Logical Foundations写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: [
      "手算实例",
      "Possible-Worlds Semantics for Modal Logics",
      "第二版正式目录",
      "可重放",
    ],
  },
  {
    id: "mas-17-logical-foundations-4",
    chapter: "mas-17-logical-foundations",
    level: 2,
    question:
      "怎样为Chapter 17 Logical Foundations构造只破坏一个条件的失败样本？",
    answer:
      "用可能世界、正规模态逻辑、知识与信念、意图、言语行为、合作逻辑及规范和验证连接全书形式基础。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 17 Logical Foundations写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["故障注入", "Normal Modal Logics", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-17-logical-foundations-5",
    chapter: "mas-17-logical-foundations",
    level: 3,
    question:
      "如何排除Chapter 17 Logical Foundations中的信息泄漏、策略操纵、消息错位或逻辑模型错误？",
    answer:
      "用可能世界、正规模态逻辑、知识与信念、意图、言语行为、合作逻辑及规范和验证连接全书形式基础。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 17 Logical Foundations写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: [
      "机制验证",
      "Normal Modal Logics as Epistemic Logics",
      "第二版正式目录",
      "可重放",
    ],
  },
  {
    id: "mas-17-logical-foundations-6",
    chapter: "mas-17-logical-foundations",
    level: 3,
    question: "怎样把Chapter 17 Logical Foundations接入全书端到端独立复核？",
    answer:
      "用可能世界、正规模态逻辑、知识与信念、意图、言语行为、合作逻辑及规范和验证连接全书形式基础。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Chapter 17 Logical Foundations写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["独立复核", "Logical Omniscience", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-coda-1",
    chapter: "mas-coda",
    level: 1,
    question: "在Coda中，必须冻结哪些参与者、信息与规则？",
    answer:
      "回看全书从自主智能体到社会决策的主线，明确哪些结论是形式定理、工程经验或开放问题。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Coda写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["版本冻结", "全书主线", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-coda-2",
    chapter: "mas-coda",
    level: 1,
    question: "在Coda中，哪条联合状态证据必须先于最终结果检查？",
    answer:
      "回看全书从自主智能体到社会决策的主线，明确哪些结论是形式定理、工程经验或开放问题。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Coda写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["联合轨迹", "证据等级", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-coda-3",
    chapter: "mas-coda",
    level: 2,
    question: "如何手算Coda的一次期望效用、最佳响应、投票或分配？",
    answer:
      "回看全书从自主智能体到社会决策的主线，明确哪些结论是形式定理、工程经验或开放问题。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Coda写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["手算实例", "形式结论", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-coda-4",
    chapter: "mas-coda",
    level: 2,
    question: "怎样为Coda构造只破坏一个条件的失败样本？",
    answer:
      "回看全书从自主智能体到社会决策的主线，明确哪些结论是形式定理、工程经验或开放问题。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Coda写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["故障注入", "工程结论", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-coda-5",
    chapter: "mas-coda",
    level: 3,
    question: "如何排除Coda中的信息泄漏、策略操纵、消息错位或逻辑模型错误？",
    answer:
      "回看全书从自主智能体到社会决策的主线，明确哪些结论是形式定理、工程经验或开放问题。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Coda写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["机制验证", "开放问题", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-coda-6",
    chapter: "mas-coda",
    level: 3,
    question: "怎样把Coda接入全书端到端独立复核？",
    answer:
      "回看全书从自主智能体到社会决策的主线，明确哪些结论是形式定理、工程经验或开放问题。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Coda写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["独立复核", "复核", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-appendix-a-history-lesson-1",
    chapter: "mas-appendix-a-history-lesson",
    level: 1,
    question:
      "在Appendix A -- A History Lesson中，必须冻结哪些参与者、信息与规则？",
    answer:
      "以领域历史定位概念来源、研究转折和版本语境，避免用后来的术语改写早期问题。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Appendix A -- A History Lesson写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["版本冻结", "领域历史", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-appendix-a-history-lesson-2",
    chapter: "mas-appendix-a-history-lesson",
    level: 1,
    question:
      "在Appendix A -- A History Lesson中，哪条联合状态证据必须先于最终结果检查？",
    answer:
      "以领域历史定位概念来源、研究转折和版本语境，避免用后来的术语改写早期问题。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Appendix A -- A History Lesson写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["联合轨迹", "概念谱系", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-appendix-a-history-lesson-3",
    chapter: "mas-appendix-a-history-lesson",
    level: 2,
    question:
      "如何手算Appendix A -- A History Lesson的一次期望效用、最佳响应、投票或分配？",
    answer:
      "以领域历史定位概念来源、研究转折和版本语境，避免用后来的术语改写早期问题。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Appendix A -- A History Lesson写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["手算实例", "研究转折", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-appendix-a-history-lesson-4",
    chapter: "mas-appendix-a-history-lesson",
    level: 2,
    question:
      "怎样为Appendix A -- A History Lesson构造只破坏一个条件的失败样本？",
    answer:
      "以领域历史定位概念来源、研究转折和版本语境，避免用后来的术语改写早期问题。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Appendix A -- A History Lesson写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["故障注入", "来源日期", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-appendix-a-history-lesson-5",
    chapter: "mas-appendix-a-history-lesson",
    level: 3,
    question:
      "如何排除Appendix A -- A History Lesson中的信息泄漏、策略操纵、消息错位或逻辑模型错误？",
    answer:
      "以领域历史定位概念来源、研究转折和版本语境，避免用后来的术语改写早期问题。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Appendix A -- A History Lesson写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["机制验证", "版本语境", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-appendix-a-history-lesson-6",
    chapter: "mas-appendix-a-history-lesson",
    level: 3,
    question: "怎样把Appendix A -- A History Lesson接入全书端到端独立复核？",
    answer:
      "以领域历史定位概念来源、研究转折和版本语境，避免用后来的术语改写早期问题。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Appendix A -- A History Lesson写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["独立复核", "历史边界", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-appendix-b-afterword-1",
    chapter: "mas-appendix-b-afterword",
    level: 1,
    question: "在Appendix B -- Afterword中，必须冻结哪些参与者、信息与规则？",
    answer:
      "收束第二版边界，把未决问题转成带假设、反例、实验和来源的后续研究清单。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Appendix B -- Afterword写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["版本冻结", "后记", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-appendix-b-afterword-2",
    chapter: "mas-appendix-b-afterword",
    level: 1,
    question:
      "在Appendix B -- Afterword中，哪条联合状态证据必须先于最终结果检查？",
    answer:
      "收束第二版边界，把未决问题转成带假设、反例、实验和来源的后续研究清单。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Appendix B -- Afterword写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["联合轨迹", "未决问题", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-appendix-b-afterword-3",
    chapter: "mas-appendix-b-afterword",
    level: 2,
    question:
      "如何手算Appendix B -- Afterword的一次期望效用、最佳响应、投票或分配？",
    answer:
      "收束第二版边界，把未决问题转成带假设、反例、实验和来源的后续研究清单。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Appendix B -- Afterword写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["手算实例", "研究假设", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-appendix-b-afterword-4",
    chapter: "mas-appendix-b-afterword",
    level: 2,
    question: "怎样为Appendix B -- Afterword构造只破坏一个条件的失败样本？",
    answer:
      "收束第二版边界，把未决问题转成带假设、反例、实验和来源的后续研究清单。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Appendix B -- Afterword写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["故障注入", "最小反例", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-appendix-b-afterword-5",
    chapter: "mas-appendix-b-afterword",
    level: 3,
    question:
      "如何排除Appendix B -- Afterword中的信息泄漏、策略操纵、消息错位或逻辑模型错误？",
    answer:
      "收束第二版边界，把未决问题转成带假设、反例、实验和来源的后续研究清单。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Appendix B -- Afterword写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["机制验证", "实验合同", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-appendix-b-afterword-6",
    chapter: "mas-appendix-b-afterword",
    level: 3,
    question: "怎样把Appendix B -- Afterword接入全书端到端独立复核？",
    answer:
      "收束第二版边界，把未决问题转成带假设、反例、实验和来源的后续研究清单。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能为Appendix B -- Afterword写出明确假设、手算一个最小实例，并用正常、边界和单故障样本复核结论。”；首个对象不一致时停止并回退。",
    tags: ["独立复核", "延伸路线", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-official-final-review-1",
    chapter: "mas-official-final-review",
    level: 1,
    question:
      "在An Introduction to MultiAgent Systems 第二版总复习中，必须冻结哪些参与者、信息与规则？",
    answer:
      "贯通197个正式层级，从单体架构进入本体、通信、协作，再重放博弈、投票、联盟、拍卖、议价、论证与逻辑。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能从空环境重建一个可审计多智能体实验，证明理性、通信、协调、公平、稳定与复现门禁均通过。”；首个对象不一致时停止并回退。",
    tags: ["版本冻结", "端到端重放", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-official-final-review-2",
    chapter: "mas-official-final-review",
    level: 1,
    question:
      "在An Introduction to MultiAgent Systems 第二版总复习中，哪条联合状态证据必须先于最终结果检查？",
    answer:
      "贯通197个正式层级，从单体架构进入本体、通信、协作，再重放博弈、投票、联盟、拍卖、议价、论证与逻辑。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能从空环境重建一个可审计多智能体实验，证明理性、通信、协调、公平、稳定与复现门禁均通过。”；首个对象不一致时停止并回退。",
    tags: ["联合轨迹", "联合行动", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-official-final-review-3",
    chapter: "mas-official-final-review",
    level: 2,
    question:
      "如何手算An Introduction to MultiAgent Systems 第二版总复习的一次期望效用、最佳响应、投票或分配？",
    answer:
      "贯通197个正式层级，从单体架构进入本体、通信、协作，再重放博弈、投票、联盟、拍卖、议价、论证与逻辑。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能从空环境重建一个可审计多智能体实验，证明理性、通信、协调、公平、稳定与复现门禁均通过。”；首个对象不一致时停止并回退。",
    tags: ["手算实例", "通信语义", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-official-final-review-4",
    chapter: "mas-official-final-review",
    level: 2,
    question:
      "怎样为An Introduction to MultiAgent Systems 第二版总复习构造只破坏一个条件的失败样本？",
    answer:
      "贯通197个正式层级，从单体架构进入本体、通信、协作，再重放博弈、投票、联盟、拍卖、议价、论证与逻辑。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能从空环境重建一个可审计多智能体实验，证明理性、通信、协调、公平、稳定与复现门禁均通过。”；首个对象不一致时停止并回退。",
    tags: ["故障注入", "协调协议", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-official-final-review-5",
    chapter: "mas-official-final-review",
    level: 3,
    question:
      "如何排除An Introduction to MultiAgent Systems 第二版总复习中的信息泄漏、策略操纵、消息错位或逻辑模型错误？",
    answer:
      "贯通197个正式层级，从单体架构进入本体、通信、协作，再重放博弈、投票、联盟、拍卖、议价、论证与逻辑。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能从空环境重建一个可审计多智能体实验，证明理性、通信、协调、公平、稳定与复现门禁均通过。”；首个对象不一致时停止并回退。",
    tags: ["机制验证", "社会福利", "第二版正式目录", "可重放"],
  },
  {
    id: "mas-official-final-review-6",
    chapter: "mas-official-final-review",
    level: 3,
    question:
      "怎样把An Introduction to MultiAgent Systems 第二版总复习接入全书端到端独立复核？",
    answer:
      "贯通197个正式层级，从单体架构进入本体、通信、协作，再重放博弈、投票、联盟、拍卖、议价、论证与逻辑。 固定第二版来源、参与者、行动、信息、效用、初始状态、协议、种子和终止条件，按“观察 -> 消息 -> 选择 -> 联合行动 -> 状态转移 -> 性质验证”保存证据。通过标准是“能从空环境重建一个可审计多智能体实验，证明理性、通信、协调、公平、稳定与复现门禁均通过。”；首个对象不一致时停止并回退。",
    tags: ["独立复核", "发布门禁", "第二版正式目录", "可重放"],
  },
];
