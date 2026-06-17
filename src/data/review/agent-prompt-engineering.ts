/** 复习题库 · 提示工程精要（agent-prompt-engineering）。《AI 智能体应用开发》第 5 章原创。 */

import type { ReviewQuestion } from "./types";

export const agentPromptEngineeringQuestions: ReviewQuestion[] = [
  // —— Level 1 · 基础概念（认记）——
  {
    id: "agent-pe-1",
    chapter: "agent-prompt-engineering",
    level: 1,
    question: "「提示工程」是什么？它调的是什么、不调什么？",
    answer:
      "提示工程是通过精心设计「喂给模型的那段输入文字」来引导模型给出更好输出的手艺。它调的是输入（那段话），不碰模型权重——模型还是同一个模型，换一段写得更好的话，输出就脱胎换骨。",
    tags: ["提示工程", "基础"],
  },
  {
    id: "agent-pe-2",
    chapter: "agent-prompt-engineering",
    level: 1,
    question: "为什么说提示工程是上下文工程里「最可控」的一环？",
    answer:
      "因为它不用改模型、不用接数据库，只要改喂进去的那段话，输出当场就不一样——成本最低、反馈最快、人人能改。每一块的效果都能单独看见、单独调。",
    tags: ["提示工程", "可控"],
  },
  {
    id: "agent-pe-3",
    chapter: "agent-prompt-engineering",
    level: 1,
    question: "一个好提示通常由哪六块部件拼成？",
    answer:
      "角色（让它扮谁）、任务（到底要它做什么）、上下文（做这件事要的背景料）、约束（边界与禁区）、示例（给一两个范例照着学）、输出格式（答案长什么样）。缺哪块，模型就容易在哪块上跑偏。",
    tags: ["六部件", "解剖"],
  },
  {
    id: "agent-pe-4",
    chapter: "agent-prompt-engineering",
    level: 1,
    question: "「少样本（few-shot）」指的是怎么写提示？",
    answer:
      "在提示里塞进几个「输入 → 期望输出」的范例，让模型照着这些例子的格式和口径来做新任务。和它相对的是零样本——一个例子都不给。",
    tags: ["少样本", "few-shot"],
  },
  {
    id: "agent-pe-5",
    chapter: "agent-prompt-engineering",
    level: 1,
    question: "「零样本（zero-shot）」是什么意思？",
    answer:
      "一个范例都不给，只描述任务就让模型直接做。简单任务够用，但格式 / 口径稍复杂时，模型容易凭自己的理解瞎猜。它是少样本的对照面。",
    tags: ["零样本", "zero-shot"],
  },
  {
    id: "agent-pe-6",
    chapter: "agent-prompt-engineering",
    level: 1,
    question: "「思维链（Chain-of-Thought，CoT）」的做法是什么？",
    answer:
      "在提示里要求模型把推理过程一步步写出来、最后再给答案，而不是张口就报结论。最简单的写法就是加一句「请一步步推理，再给出答案」。",
    tags: ["思维链", "chain-of-thought"],
  },
  {
    id: "agent-pe-7",
    chapter: "agent-prompt-engineering",
    level: 1,
    question: "「系统提示（system prompt）」是什么？",
    answer:
      "在每一轮对话开头都会自动带上的那段固定指令，用来设定 agent 的身份、目标、规矩、可用工具和说话风格——好比 agent 的「人设与守则」，一次写定、轮轮生效。",
    tags: ["系统提示", "基础"],
  },
  {
    id: "agent-pe-8",
    chapter: "agent-prompt-engineering",
    level: 1,
    question: "「输出格式」这一部件管的是什么？举两个例子。",
    answer:
      "管「答案该长什么样」的明确约定。例子：「只输出一个词（正面 / 负面 / 中性）」「分两行：① 能否退 ② 一句话理由」「用 JSON 返回」。说死格式能让输出整齐、好被下游程序解析。",
    tags: ["输出格式", "例子"],
  },

  // —— Level 2 · 辨析（理解）——
  {
    id: "agent-pe-9",
    chapter: "agent-prompt-engineering",
    level: 2,
    question: "角色、示例（少样本）、思维链 在一个提示里各起什么作用、各治什么病？",
    answer:
      "角色定身份与口吻，治「口吻 / 立场不对」；示例（少样本）用范例教格式与口径，治「复杂格式对不齐、瞎猜」；思维链让它先一步步想再答，治「复杂推理一步到位就错」。三者各管一段。",
    tags: ["三招", "作用", "理解"],
  },
  {
    id: "agent-pe-10",
    chapter: "agent-prompt-engineering",
    level: 2,
    question: "模糊提示和具体提示，本质区别在哪？",
    answer:
      "模糊提示把关键决策权全甩给了模型去猜（给谁看、多长、什么口吻、什么范围）；具体提示替它把这些决策都定死了。你每多写一个具体约束，就少给模型一次跑偏的机会。",
    tags: ["清晰具体", "辨析"],
  },
  {
    id: "agent-pe-11",
    chapter: "agent-prompt-engineering",
    level: 2,
    question: "为什么复杂格式「给范例」往往比「写描述」更管用？",
    answer:
      "文字描述容易有歧义，模型只能猜你到底要哪种格式；而一个具体的少样本范例把格式直接摆在它面前，照着套就行，没有歧义。所以格式 / 口径稍复杂时，给例子几乎总比堆描述强。",
    tags: ["少样本", "格式", "理解"],
  },
  {
    id: "agent-pe-12",
    chapter: "agent-prompt-engineering",
    level: 2,
    question: "思维链为什么能提升复杂题的准确率？代价是什么？",
    answer:
      "逼模型「一步到位」时中间步骤全在心算里走，漏一步就错；让它先把步骤一条条写出来再下结论，每步都看得见、可检验，自然更准。代价是输出更长、更慢——所以只用在真需要推理的复杂题上。",
    tags: ["思维链", "代价", "理解"],
  },
  {
    id: "agent-pe-13",
    chapter: "agent-prompt-engineering",
    level: 2,
    question: "同一段需求，写成系统提示和写成单次任务提示，到底差在哪？",
    answer:
      "差在「写一次轮轮复用」还是「一次性临时拼」。系统提示每轮都自动带上、用来放稳定不变的内容（角色 / 口吻 / 红线 / 通用规矩）；单次任务提示只为这一次任务写、办完就丢，放因任务而变的内容。",
    tags: ["系统提示 vs 单次", "辨析"],
  },
  {
    id: "agent-pe-14",
    chapter: "agent-prompt-engineering",
    level: 2,
    question: "判断一条内容该放系统提示还是单次提示，有什么简单标准？",
    answer:
      "看它会不会「每轮都一样」。会，就放系统提示（一次写定、轮轮复用）；不会、每次都变，就放单次任务提示。比如固定的输出格式放系统提示，这次具体的订单号放单次提示。",
    tags: ["系统提示 vs 单次", "判别"],
  },
  {
    id: "agent-pe-15",
    chapter: "agent-prompt-engineering",
    level: 2,
    question: "「提示越长越好」这个想法错在哪？",
    answer:
      "错在以为塞得越多越好。啰嗦的提示会稀释重点——关键约束被淹没在一堆废话里，模型抓不住，还白白多烧 token、更贵更慢。真正决定好坏的是「清晰具体」，不是长度。",
    tags: ["误区", "长度", "理解"],
  },

  // —— Level 3 · 应用（套到具体场景）——
  {
    id: "agent-pe-16",
    chapter: "agent-prompt-engineering",
    level: 3,
    question:
      "模型总把回答写得太长、你只想要一句话，该用哪一招？怎么写？",
    answer:
      "用「清晰具体」：在提示里把约束写死，比如「只用一句话、不超过 20 字回答」。把含糊的期望变成明确的约束，模型就有谱了。",
    tags: ["清晰具体", "应用"],
  },
  {
    id: "agent-pe-17",
    chapter: "agent-prompt-engineering",
    level: 3,
    question:
      "模型做分类时格式总对不齐，你要它严格只输出固定几个标签之一，最该用哪一招？",
    answer:
      "最该用少样本：给两三个「输入 → 标签」的范例（如「真香→正面」「等半个月没到→负面」），让它照着对版。固定 / 复杂的格式，范例比文字描述更准。",
    tags: ["少样本", "应用"],
  },
  {
    id: "agent-pe-18",
    chapter: "agent-prompt-engineering",
    level: 3,
    question:
      "一道要算好几步的应用题，模型张口就报错答案，该怎么改提示？",
    answer:
      "加一句思维链指令，如「请一步步推理，再给出答案」，逼它把中间步骤摊开。多步计算先想后答，才不容易漏掉某一步。简单事实问答则不必，免得徒增啰嗦与开销。",
    tags: ["思维链", "应用"],
  },
  {
    id: "agent-pe-19",
    chapter: "agent-prompt-engineering",
    level: 3,
    question:
      "给客服 agent 写提示：「你是某店客服、语气亲切、绝不承诺政策外退款」该放哪里？为什么？",
    answer:
      "放系统提示。角色、口吻、红线都是稳定不变、每轮都该生效的规矩，写进系统提示一次定死、轮轮复用，既省得每次重复，也保证一致。",
    tags: ["系统提示", "应用"],
  },
  {
    id: "agent-pe-20",
    chapter: "agent-prompt-engineering",
    level: 3,
    question:
      "把一个烂提示「帮我把用户评论分个类」改好，至少要补上哪些部件？",
    answer:
      "它几乎只剩含糊的任务。至少要补：约束（限定类别，如只分正面 / 负面 / 中性，拿不准归中性）、示例（给一两条「评论 → 类别」范例定口径）、输出格式（每条只输出一个词、不要解释）。补全后模型才有谱、输出才稳定。",
    tags: ["改提示", "六部件", "应用"],
  },
  {
    id: "agent-pe-21",
    chapter: "agent-prompt-engineering",
    level: 3,
    question:
      "在一个 messages 数组里，系统提示、少样本范例、本次输入分别该放在哪？",
    answer:
      "开头放 system 那条（人设 + 规矩 + 输出格式约束），中间放成对的 user / assistant 作为少样本范例（输入 → 期望输出），最后放这次真要处理的 user 输入。前两块每轮复用，最后一块是单次任务部分。",
    tags: ["messages", "结构", "应用"],
  },

  // —— Level 4 · 陷阱 / 综合 ——
  {
    id: "agent-pe-22",
    chapter: "agent-prompt-engineering",
    level: 4,
    question:
      "团队把提示写得越来越长、要求堆了一大堆，输出反而更糊还更贵，问题出在哪？怎么治？",
    answer:
      "问题在「以为提示越长越好」，结果关键约束被一堆废话稀释、模型抓不住重点，还多烧 token。治法：长 ≠ 好，清晰具体才好——删掉空话，每句对准一个明确决策；稳定的挪进系统提示复用，别在单次提示里反复堆。",
    tags: ["陷阱", "啰嗦", "综合"],
  },
  {
    id: "agent-pe-23",
    chapter: "agent-prompt-engineering",
    level: 4,
    question:
      "用思维链让模型先推理，但又不想让一堆推理过程出现在给用户看的最终输出里，怎么办？",
    answer:
      "在提示里把「想」和「答」分开：要求它先逐步推理，但最后只输出规定的格式（如只给结论两行）。这样既拿到思维链的准确率，又不让推理过程污染最终输出——是思维链落地时的常用技巧。",
    tags: ["陷阱", "思维链", "综合"],
  },
  {
    id: "agent-pe-24",
    chapter: "agent-prompt-engineering",
    level: 4,
    question:
      "为什么说提示的增益是「一块块精化攒出来的」，而不是靠某句魔法咒语？",
    answer:
      "因为每加一块部件（角色 → 上下文 → 约束 → 示例 → 格式），输出就好一截：角色掰对口吻、上下文补足内容、约束收住啰嗦、示例对版风格、格式定下落点。没有哪一句单独能把输出从「跑题」变「可用」，是逐步精化的累积效果——这也正是提示工程「最可控」的体现：每块都能单独看见、单独调。",
    tags: ["综合", "精化", "增益"],
  },
];
