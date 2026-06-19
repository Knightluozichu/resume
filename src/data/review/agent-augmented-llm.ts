/** 复习题库 · 增强型 LLM（agent-augmented-llm）。《AI 智能体应用开发》第 2 章原创。 */

import type { ReviewQuestion } from "./types";

export const agentAugmentedLlmQuestions: ReviewQuestion[] = [
  // —— Level 1 · 基础概念（认记）——
  {
    id: "agent-aug-1",
    chapter: "agent-augmented-llm",
    level: 1,
    question: "「增强型 LLM」是什么？它「增强」了什么？",
    answer:
      "增强型 LLM 是在一个 base LLM 外面包上三种能力——检索、工具、记忆——而成的整体。增强的不是模型本身：模型权重一个字节都没改，是外面包了一层能力壳，让它能查资料、能动手、能记事。",
    tags: ["增强型 LLM", "基础"],
  },
  {
    id: "agent-aug-2",
    chapter: "agent-augmented-llm",
    level: 1,
    question: "增强型 LLM 的三种增强能力分别是什么？",
    answer:
      "① 检索（Retrieval）：按需从外部知识库捞相关资料塞进上下文；② 工具（Tools）：让 LLM 产出结构化调用、由系统执行并回填结果；③ 记忆（Memory）：让它跨轮、跨会话记得住信息。",
    tags: ["三种增强", "解剖"],
  },
  {
    id: "agent-aug-3",
    chapter: "agent-augmented-llm",
    level: 1,
    question: "增强型 LLM 在做了三种增强后，base LLM 本身发生了什么改变？",
    answer:
      "没有任何改变。base LLM 还是原来那个 base LLM，权重没动、没重训。变的只是它被包进了一层外壳：输入端被检索 / 记忆富化、输出端能产出工具调用——模型不变，能力却脱胎换骨。",
    tags: ["增强型 LLM", "权重不变"],
  },
  {
    id: "agent-aug-4",
    chapter: "agent-augmented-llm",
    level: 1,
    question: "「检索（Retrieval）」一步步在做什么？",
    answer:
      "拿用户问题去外部知识库里检索出相关片段，把片段拼进上下文（prompt），让 LLM 带着这份资料作答。一句话：先捞对资料，再带着资料回答。",
    tags: ["检索", "Retrieval"],
  },
  {
    id: "agent-aug-5",
    chapter: "agent-augmented-llm",
    level: 1,
    question: "RAG 是什么的缩写，对应到检索流程是哪一套做法？",
    answer:
      "RAG = Retrieval-Augmented Generation（检索增强生成）。对应「先检索、后生成」：先从外部知识库检索相关片段，再让 LLM 基于这些片段生成回答，而不是凭模型自己的记忆瞎答。",
    tags: ["RAG", "检索"],
  },
  {
    id: "agent-aug-6",
    chapter: "agent-augmented-llm",
    level: 1,
    question: "「工具（Tools）」这条增强通路的三步是什么？",
    answer:
      "① LLM 产出一个结构化的工具调用（调哪个、传什么参数）；② 系统真正去执行这个调用；③ 把执行结果回填进上下文，供 LLM 接着用。LLM 负责决定，系统负责执行。",
    tags: ["工具", "Tools"],
  },
  {
    id: "agent-aug-7",
    chapter: "agent-augmented-llm",
    level: 1,
    question: "短期记忆和长期记忆最直观的区别是什么？",
    answer:
      "短期记忆活在上下文窗口内、限于单次会话，会话一关掉就忘；长期记忆要写进外部存储（数据库 / 向量库），跨会话还记得，下次再来仍能调出来。",
    tags: ["短期记忆", "长期记忆"],
  },
  {
    id: "agent-aug-8",
    chapter: "agent-augmented-llm",
    level: 1,
    question: "「上下文窗口（context window）」指的是什么？",
    answer:
      "LLM 一次能「看」的输入文字总量上限。本轮对话、检索到的片段、工具结果都得塞进这个窗口；塞超了就装不下、或要被截断。短期记忆就活在这个窗口里。",
    tags: ["上下文窗口", "基础"],
  },
  {
    id: "agent-aug-9",
    chapter: "agent-augmented-llm",
    level: 1,
    question: "短期记忆里通常存的是什么？举一个例子。",
    answer:
      "存本轮对话和这一轮里产生的工具结果等。例子：顾客这次会话里说过「我怕冷」，这条信息留在上下文窗口里能被本轮后续引用——但会话结束就没了。",
    tags: ["短期记忆", "例子"],
  },
  {
    id: "agent-aug-10",
    chapter: "agent-augmented-llm",
    level: 1,
    question: "长期记忆里通常存的是什么？举一个例子。",
    answer:
      "存需要跨会话保留的信息，写进外部数据库或向量库。例子：「这位顾客是 VIP、上月已退过一次货」——下次他再来，系统能把这条调出来载入上下文。",
    tags: ["长期记忆", "例子"],
  },

  // —— Level 2 · 辨析（理解）——
  {
    id: "agent-aug-11",
    chapter: "agent-augmented-llm",
    level: 2,
    question: "检索、工具、记忆各自补上了裸 LLM 的哪个短板？",
    answer:
      "检索补「不知道新事 / 不知道私有资料」——把外部 / 最新 / 私有资料捞进上下文；工具补「不能行动」——让它能真去查、去算、去操作；记忆补「没有记忆」——让它跨轮、跨会话记得住。三者各治一病。",
    tags: ["三种增强", "短板", "理解"],
  },
  {
    id: "agent-aug-12",
    chapter: "agent-augmented-llm",
    level: 2,
    question:
      "本章的「一次增强调用」和第 1 章的「智能体循环」最大的不同是什么？",
    answer:
      "第 1 章讲的是「循环迭代」——同一个环里反复转圈、一步步推进；本章讲的是「汇聚增强」——检索 / 记忆 / 工具三路信息汇聚进同一次 LLM 调用，让这一次调用变强。前者是时间上的反复，后者是一次调用内的多路汇合。",
    tags: ["汇聚 vs 循环", "辨析"],
  },
  {
    id: "agent-aug-13",
    chapter: "agent-augmented-llm",
    level: 2,
    question: "为什么说增强型 LLM 是「所有 agent 与工作流的原子单元」？",
    answer:
      "因为不管是简单工作流还是复杂多步智能体，拆到最底层，每一步真正调模型时都是一次「被检索 / 记忆富化、能产出工具调用」的增强调用。智能体循环不过是把这种增强调用一圈圈串起来——它是上层一切结构的最小积木。",
    tags: ["原子单元", "理解"],
  },
  {
    id: "agent-aug-14",
    chapter: "agent-augmented-llm",
    level: 2,
    question:
      "如果跳过检索，直接让 LLM 回答「我们公司这单能不能退」，会怎样？",
    answer:
      "它只能凭训练时见过的通用知识或干脆编一个——因为「我们公司的退货政策」是私有、它训练时没见过的资料。不检索就没把政策片段送进上下文，LLM 无据可依，很可能答错或胡编（幻觉）。这正说明检索补的是「不知道私有 / 新资料」这一短板。",
    tags: ["检索", "幻觉", "辨析"],
  },
  {
    id: "agent-aug-15",
    chapter: "agent-augmented-llm",
    level: 2,
    question: "检索和工具都在「往上下文里加东西」，它俩到底差在哪？",
    answer:
      "检索是「读」——从已有知识库里捞静态资料（如政策文档）塞进上下文；工具是「做」——LLM 主动产出调用、由系统去执行一个动作并取回实时 / 动态结果（如查这一单的实时状态）。一个是查现成资料，一个是触发一次执行。",
    tags: ["检索 vs 工具", "辨析"],
  },
  {
    id: "agent-aug-16",
    chapter: "agent-augmented-llm",
    level: 2,
    question: "为什么不能把所有历史一股脑全塞进上下文当短期记忆用？",
    answer:
      "因为上下文窗口有上限，历史越堆越长会撑爆窗口（超长被截断、还更贵更慢），且无关内容会干扰模型抓重点。该长期保留的信息应写进外部存储做长期记忆、用时按需调取，而不是把一切都堆进短期记忆里。",
    tags: ["上下文窗口", "记忆", "误区"],
  },
  {
    id: "agent-aug-17",
    chapter: "agent-augmented-llm",
    level: 2,
    question: "「接了向量库就万事大吉」这个想法错在哪？",
    answer:
      "错在以为只要接上检索来源、答案就一定准。检索的质量同样关键：如果捞回来的片段不相关、不完整、或过时，LLM 拿着错料照样答错——「捞到的资料对不对」和「有没有检索」一样重要。接库只是第一步，检索质量才决定成败。",
    tags: ["检索质量", "误区"],
  },
  {
    id: "agent-aug-18",
    chapter: "agent-augmented-llm",
    level: 2,
    question:
      "在「一次增强调用」里，三路增强汇齐之后，LLM 处理的输入和裸 prompt 有何不同？",
    answer:
      "裸 prompt 只有顾客的原始问题；汇齐后，上下文里还多了检索来的政策片段、记忆里的顾客历史，必要时再加上工具回填的实时结果。同一个 base LLM 处理这份「被富化」的输入，自然能给出有据可依的回答，而不是凭空乱答。",
    tags: ["富化输入", "理解"],
  },

  // —— Level 3 · 应用（套到具体场景 / 选增强组合）——
  {
    id: "agent-aug-19",
    chapter: "agent-augmented-llm",
    level: 3,
    question:
      "需求：做一个「答疑机器人」，只回答你们公司内部 wiki 里写过的内容。最该上哪种增强？",
    answer:
      "最该上检索（RAG）。因为内部 wiki 是私有、模型没训练过的资料，必须把相关 wiki 片段检索进上下文，LLM 才能据此回答。光靠模型自己的知识会答不准或编造。",
    tags: ["选增强", "检索", "应用"],
  },
  {
    id: "agent-aug-20",
    chapter: "agent-augmented-llm",
    level: 3,
    question:
      "需求：助手要能「查这位用户当前的订单实时物流状态」。该用检索还是工具？为什么？",
    answer:
      "用工具。实时物流状态是动态、随时在变的数据，不在静态知识库里，得 LLM 产出一个调用（如 query_logistics(订单号)）、由系统真去查接口取回实时结果。检索只能捞现成静态资料，应付不了「实时去查一次」。",
    tags: ["选增强", "工具", "应用"],
  },
  {
    id: "agent-aug-21",
    chapter: "agent-augmented-llm",
    level: 3,
    question:
      "需求：客服助手要「记住老顾客的偏好，下次来不必重复问」。该用短期还是长期记忆？",
    answer:
      "用长期记忆。要跨会话保留，必须把偏好写进外部存储（数据库 / 向量库），下次该顾客再来时载入上下文。短期记忆会话一关就忘，做不到「下次还记得」。",
    tags: ["选增强", "长期记忆", "应用"],
  },
  {
    id: "agent-aug-22",
    chapter: "agent-augmented-llm",
    level: 3,
    question:
      "「根据公司退货政策、结合这位 VIP 顾客的历史、并核实订单实时状态后回答能不能退」——这个任务要哪几路增强一起上？",
    answer:
      "三路都要：检索捞「退货政策」片段、记忆载入「VIP·上月已退一次」、工具去核实「订单实时状态」，三路信息汇聚进同一次 LLM 调用，它才能给出有依据的回答。这正是「一次增强调用」三路汇聚的典型场景。",
    tags: ["增强组合", "汇聚", "应用"],
  },
  {
    id: "agent-aug-23",
    chapter: "agent-augmented-llm",
    level: 3,
    question:
      "一个只做「把英文段落翻译成中文」的功能，需要给它加检索 / 工具 / 记忆吗？",
    answer:
      "基本不需要。翻译靠模型本身能力就能完成，既不依赖外部私有资料（无需检索）、也不需要执行动作（无需工具）、更不需要跨会话记事（无需记忆）。增强是按需加的，不是越多越好——用不上的增强只会徒增复杂度和成本。",
    tags: ["按需增强", "应用"],
  },

  // —— Level 4 · 陷阱 / 综合 ——
  {
    id: "agent-aug-24",
    chapter: "agent-augmented-llm",
    level: 4,
    question:
      "团队接了向量库做检索，但用户反馈答案还是经常不准。可能出在哪？怎么排查？",
    answer:
      "大概率不是「有没有检索」的问题，而是「检索质量」：捞回的片段可能不相关、不完整、过时，或切片 / 召回策略差，导致塞进上下文的就是错料，LLM 拿着错料照样答错。排查方向：看每次实际检索回了哪些片段、它们是否真覆盖了问题、来源是否最新——先治检索质量，而不是怪模型。",
    tags: ["陷阱", "检索质量", "综合"],
  },
  {
    id: "agent-aug-25",
    chapter: "agent-augmented-llm",
    level: 4,
    question:
      "有人把每一轮的全部历史都不断追加进上下文当「记忆」，跑久了越来越慢、还时不时答非所问。问题出在哪？正解是什么？",
    answer:
      "问题在混淆了短期与长期记忆，把一切都堆进上下文窗口。历史无限增长会撑爆窗口（截断、变贵变慢），无关内容还干扰模型抓重点。正解：区分两种记忆——本轮必要的留在短期（上下文）里，需跨会话保留的写进外部存储做长期记忆、用时按需调取相关条目，而不是全量回灌。",
    tags: ["陷阱", "记忆混淆", "综合"],
  },
  {
    id: "agent-aug-26",
    chapter: "agent-augmented-llm",
    level: 4,
    question:
      "为什么说「增强型 LLM」让我们能用同一个 base 模型应对千差万别的任务，而不必为每个任务重训模型？",
    answer:
      "因为增强改的是模型的「输入与可用动作」，不是模型权重。同一个 base LLM，给它接不同的知识库（检索）、不同的工具集、不同的记忆，就能胜任退货客服、内部答疑、订单助理等完全不同的任务——任务变了只需换外壳（换库 / 换工具 / 换记忆），无需重训。这就是为什么增强型 LLM 是搭建各种 agent 的通用原子单元。",
    tags: ["综合", "原子单元", "复用"],
  },
];
