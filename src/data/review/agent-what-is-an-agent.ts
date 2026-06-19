/** 复习题库 · 什么是智能体（agent-what-is-an-agent）。《AI 智能体应用开发》第 1 章原创。 */

import type { ReviewQuestion } from "./types";

export const agentWhatIsAnAgentQuestions: ReviewQuestion[] = [
  // —— Level 1 · 基础概念（认记）——
  {
    id: "agent-what-1",
    chapter: "agent-what-is-an-agent",
    level: 1,
    question: "一个裸的 LLM（大语言模型）本质上在做什么？",
    answer:
      "根据前面的文字，预测下一个最可能的词，一个词一个词地把回答续写出来。它学的就是「接下来该说什么」，本身并不真正去查、去算、去行动。",
    tags: ["LLM", "基础"],
  },
  {
    id: "agent-what-2",
    chapter: "agent-what-is-an-agent",
    level: 1,
    question: "裸 LLM 天生有哪三个短板？",
    answer:
      "① 不能行动——只会输出文字，没法真去查天气、发邮件、跑代码；② 没有记忆——聊完一轮就忘，不会自己记住之前说过的话；③ 不知道新事——知识停在训练那一刻，训练之后发生的事一概不知。",
    tags: ["LLM", "局限"],
  },
  {
    id: "agent-what-3",
    chapter: "agent-what-is-an-agent",
    level: 1,
    question: "一个智能体（Agent）由哪几块拼成？",
    answer:
      "一个 LLM 大脑 + 四件外挂：工具（Tools，让它能行动）、记忆 / 上下文（让它记得住）、指令 / 系统提示（告诉它身份和目标）、循环（让它反复想—做—看直到完成）。",
    tags: ["Agent", "解剖"],
  },
  {
    id: "agent-what-4",
    chapter: "agent-what-is-an-agent",
    level: 1,
    question: "智能体里的「工具（Tools）」是什么？",
    answer:
      "智能体能调用去真办事的外部函数或接口，比如查天气、搜网页、跑代码、发邮件。LLM 决定调哪个、传什么参数，工具去执行并把结果返回。它是让 AI 从「只会说」变成「能动手」的关键。",
    tags: ["工具", "Tools"],
  },
  {
    id: "agent-what-5",
    chapter: "agent-what-is-an-agent",
    level: 1,
    question: "智能体里的「上下文（Context）」指什么？",
    answer:
      "一次任务里喂给 LLM 看的全部信息：历史对话、工具返回的结果、相关资料等。它就是智能体在这一轮里的「短期记忆」，每转一圈都把新结果塞进去。",
    tags: ["上下文", "记忆"],
  },
  {
    id: "agent-what-6",
    chapter: "agent-what-is-an-agent",
    level: 1,
    question: "「系统提示（System Prompt）」的作用是什么？",
    answer:
      "放在对话最前面的一段指令，相当于智能体的「岗位说明书」：规定它的身份、要达成的目标、可用的工具和行为准则，定调整轮行为方式。",
    tags: ["系统提示", "指令"],
  },
  {
    id: "agent-what-7",
    chapter: "agent-what-is-an-agent",
    level: 1,
    question: "「智能体循环（agentic loop）」是什么？",
    answer:
      "智能体反复执行「思考下一步 → 行动（调工具或回答）→ 观察结果」的过程，由 LLM 自己决定每圈干什么、何时结束。它是智能体的灵魂——不是一锤子买卖，而是一圈一圈地把活干完。",
    tags: ["agentic loop", "循环"],
  },
  {
    id: "agent-what-8",
    chapter: "agent-what-is-an-agent",
    level: 1,
    question: "智能体循环里的三站「观察 / 思考 / 行动」分别在做什么？",
    answer:
      "思考（Reason）：LLM 看着当前上下文决定下一步该干啥；行动（Act）：照 LLM 选的工具和参数真去执行；观察（Observe）：把工具结果喂回上下文，进入下一圈。三者循环往复直到收尾。",
    tags: ["循环", "思考行动观察"],
  },
  {
    id: "agent-what-9",
    chapter: "agent-what-is-an-agent",
    level: 1,
    question: "「聊天机器人」和「智能体」最直观的区别是什么？",
    answer:
      "聊天机器人是单轮——你问一句它答一句，问完即止，不会自己接着办事；智能体是在循环里自己决定下一步、反复调工具、直到把任务办完。",
    tags: ["聊天机器人", "辨析"],
  },
  {
    id: "agent-what-10",
    chapter: "agent-what-is-an-agent",
    level: 1,
    question: "「自主性（Autonomy）」指的是什么？",
    answer:
      "程序在多大程度上「自己决定下一步」而不是按人写死的逻辑走。它是一根可调的旋钮：越高越灵活，但越难控制、越贵、越慢——不是越大越好。",
    tags: ["自主性"],
  },

  // —— Level 2 · 辨析（理解）——
  {
    id: "agent-what-11",
    chapter: "agent-what-is-an-agent",
    level: 2,
    question: "为什么说「循环」是智能体区别于聊天机器人和工作流的灵魂？",
    answer:
      "聊天机器人只有一来一回，没有循环；工作流虽然有多步但路径是人写死的、不会变。只有智能体在循环里由 LLM 自己决定每一步干什么、要不要继续、何时结束——这份「边走边自己选路」的能力才是它的本质，去掉循环它就退化成前两者。",
    tags: ["循环", "辨析"],
  },
  {
    id: "agent-what-12",
    chapter: "agent-what-is-an-agent",
    level: 2,
    question: "工作流和智能体都能跑多步，它俩到底差在哪？",
    answer:
      "差在「路谁来定」。工作流的步骤和走哪条路是人提前写死的，每次执行都一样、可预测；智能体的路是 LLM 自己边走边选的，路径随情况动态变化。一句话：工作流的路写死，智能体的路自选。",
    tags: ["工作流", "辨析"],
  },
  {
    id: "agent-what-13",
    chapter: "agent-what-is-an-agent",
    level: 2,
    question: "在代码骨架里，`while True` 这一行对应智能体的什么概念？",
    answer:
      "对应「智能体循环」。它让 LLM 反复「思考→行动→观察」，而循环要不要继续不是写死跑几次，而是由 LLM 在每一圈里自己判断（`if decision.is_final_answer` 时跳出）——这正是自主性的落点。",
    tags: ["代码", "循环"],
  },
  {
    id: "agent-what-14",
    chapter: "agent-what-is-an-agent",
    level: 2,
    question: "为什么说智能体「越转越懂」当前任务？",
    answer:
      "因为上下文（记忆）在每一圈都在变长：每次行动后，工具返回的结果都被追加进 context，下一圈 LLM 看到的信息就更多。所以它一圈圈转下来，对当前任务掌握得越来越全。",
    tags: ["上下文", "理解"],
  },
  {
    id: "agent-what-15",
    chapter: "agent-what-is-an-agent",
    level: 2,
    question: "「能联网搜索的 LLM」算智能体吗？为什么？",
    answer:
      "不一定算。如果它只是搜一次、答一次，那只是自主性光谱里偏左的「LLM + 工具」，缺了自主循环，不会根据结果反复思考、调整、再行动。要成为智能体，必须补上循环——让它在循环里自己决定继续还是收尾。",
    tags: ["辨析", "误区"],
  },
  {
    id: "agent-what-16",
    chapter: "agent-what-is-an-agent",
    level: 2,
    question: "自主性光谱从左到右大致有哪几档？",
    answer:
      "纯代码（一切写死）→ 单次 LLM 调用（问一句答一句）→ LLM + 工具（会调一次工具）→ 固定工作流（几步串成流水线）→ 自主 Agent（循环里自己决定）。从左到右自主性递增。",
    tags: ["自主性", "光谱"],
  },
  {
    id: "agent-what-17",
    chapter: "agent-what-is-an-agent",
    level: 2,
    question: "为什么自主性「不是越高越好」？",
    answer:
      "越往右越灵活、能应付越开放的任务，但同时越难控制、越贵、越慢。对固定可预测的任务，过高的自主性反而引入不必要的随机性和成本。选方案就是在「灵活」和「可控 / 便宜 / 快」之间按任务取一个点。",
    tags: ["自主性", "权衡"],
  },
  {
    id: "agent-what-18",
    chapter: "agent-what-is-an-agent",
    level: 2,
    question: "四件外挂分别补上了裸 LLM 的哪个短板？",
    answer:
      "工具补「不能行动」（让它能动手）；上下文 / 记忆补「没有记忆」（让它记得住这一轮的信息）；循环补「只能一锤子买卖」（让它反复想—做—看）；系统提示补「不知道要干嘛」（给它身份和目标）。",
    tags: ["解剖", "理解"],
  },

  // —— Level 3 · 应用（用判据选方案 / 套到具体场景）——
  {
    id: "agent-what-19",
    chapter: "agent-what-is-an-agent",
    level: 3,
    question:
      "任务：每天 9 点查汇率 → 写进表格 → 发邮件，步骤永不变。该用代码 / 工作流 / 智能体？",
    answer:
      "用代码或工作流。任务固定、可预测、步数确定，没有需要随机应变的开放决策，落在自主性光谱偏左侧。写死的流水线最稳、最便宜、最快；上自主 Agent 只会更贵更慢还可能出错。",
    tags: ["选型", "应用"],
  },
  {
    id: "agent-what-20",
    chapter: "agent-what-is-an-agent",
    level: 3,
    question:
      "任务：「帮我订一家明晚适合 4 人、评分高、人均 200 以内的餐厅」，它需要查、比价、看评分、不满意就改条件再查、最后下单。该用哪种？",
    answer:
      "用自主 Agent。任务开放、步数不定、需要根据查询结果随机应变（不满意就改条件再查），这正是智能体的强项——在循环里自己决定下一步。写死的工作流应付不了「中途改主意」这种动态分支。",
    tags: ["选型", "应用"],
  },
  {
    id: "agent-what-21",
    chapter: "agent-what-is-an-agent",
    level: 3,
    question:
      "判断该用 Agent 还是用代码 / 工作流，可以用哪几条判据？",
    answer:
      "任务开放、步数不定、需要与外部环境交互并随机应变 → 用 Agent；任务固定、可预测、流程每次都一样 → 用代码或工作流更稳、更便宜、更快。核心就是看任务需不需要「自己边走边拿主意」。",
    tags: ["判据", "应用"],
  },
  {
    id: "agent-what-22",
    chapter: "agent-what-is-an-agent",
    level: 3,
    question:
      "在「查北京天气并给穿衣建议」的循环里，是谁决定「信息够了、可以回答」？这说明了什么？",
    answer:
      "是 LLM 自己在再一次思考时判断的（对应代码里 `if decision.is_final_answer` 跳出循环）。这说明智能体的「结束条件」不是人写死跑几次，而是模型自主决定——这正是它和工作流最本质的区别。",
    tags: ["循环", "应用"],
  },
  {
    id: "agent-what-23",
    chapter: "agent-what-is-an-agent",
    level: 3,
    question:
      "你要做「把发票图片里的金额提取出来填进固定报销单」的功能，怎么选方案？",
    answer:
      "优先用代码 / 工作流。流程固定可预测：OCR 识别金额 → 校验格式 → 填进固定字段，每次都一样，没有开放决策。按光谱落在偏左侧，写死的流水线最稳最省。只有当任务变开放（如「把一堆乱票据整理报销、缺信息时自己想办法补」）时才考虑往右挪向 Agent。",
    tags: ["选型", "应用"],
  },

  // —— Level 4 · 陷阱 / 综合 ——
  {
    id: "agent-what-24",
    chapter: "agent-what-is-an-agent",
    level: 4,
    question:
      "智能体循环用 `while True` 写，若 LLM 始终判断不出该收尾会怎样？怎么防？",
    answer:
      "会陷入死循环——无限地「思考→调工具→观察」却永不返回，白白烧钱、卡住。防法是加最大步数上限（max iterations / step budget）：把 `while True` 换成 `for step in range(max_steps)`，转满还没等到 final answer 就跳出并返回兜底回答。自主性把决定权给了 LLM，但人必须留一道「最多转几圈」的闸。",
    tags: ["陷阱", "死循环", "综合"],
  },
  {
    id: "agent-what-25",
    chapter: "agent-what-is-an-agent",
    level: 4,
    question:
      "「智能体越自主越高级」这个想法错在哪？举一个被它坑到的例子。",
    answer:
      "错在把自主性当成单调的「越大越好」，忽略了它越高越难控制、越贵、越慢。例子：一个每天把固定格式报表转成邮件发出去的任务，本是确定可预测的，却非做成自主 Agent，结果又贵又慢、还时不时发错。正解是按自主性光谱反向选——固定任务用代码 / 工作流，只有开放、需随机应变的任务才上自主 Agent。",
    tags: ["陷阱", "自主性", "综合"],
  },
  {
    id: "agent-what-26",
    chapter: "agent-what-is-an-agent",
    level: 4,
    question:
      "如果从一个智能体里抽掉「记忆 / 上下文」，它还能正常在循环里干活吗？为什么？",
    answer:
      "基本不能。没有上下文，每圈 LLM 都看不到之前调工具拿到的结果，等于每次思考都从零开始——它会重复调同一个工具、永远凑不齐信息、也无从判断「够了没」。上下文是把每一圈的结果攒起来、让循环越转越懂任务的载体；抽掉它，循环就空转，退化成一堆互不相干的单次调用。",
    tags: ["综合", "上下文", "解剖"],
  },
];
