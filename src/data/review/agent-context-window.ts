/** 复习题库 · 上下文窗口：预算、压缩与裁剪（agent-context-window）。《AI 智能体应用开发》第 6 章原创。 */

import type { ReviewQuestion } from "./types";

export const agentContextWindowQuestions: ReviewQuestion[] = [
  // —— Level 1 · 基础概念（认记）——
  {
    id: "agent-cw-1",
    chapter: "agent-context-window",
    level: 1,
    question: "「上下文窗口」是什么？为什么说它是有限的？",
    answer:
      "上下文窗口是模型一次能「同时看见」的全部内容的总容量，单位是 token。它有一个固定的上限——装不下的内容模型根本看不到，所以是有限的。",
    tags: ["上下文窗口", "基础"],
  },
  {
    id: "agent-cw-2",
    chapter: "agent-context-window",
    level: 1,
    question: "上下文窗口这根「预算」通常被哪几类内容瓜分？",
    answer:
      "系统提示、历史对话、检索来的资料、工具调用返回的结果，外加必须给模型写回答留出的「输出余量」。这五样全从同一根固定预算里出，加起来不能超 token 上限。",
    tags: ["token 预算", "构成"],
  },
  {
    id: "agent-cw-3",
    chapter: "agent-context-window",
    level: 1,
    question: "「token 预算」这个说法是什么意思？",
    answer:
      "把上下文窗口的 token 上限看成一笔固定的预算：装进去的每样东西都在花这笔钱，花光就到头了。管理上下文窗口，本质就是在这笔有限预算里分配每一项该占多少。",
    tags: ["token 预算", "基础"],
  },
  {
    id: "agent-cw-4",
    chapter: "agent-context-window",
    level: 1,
    question: "「上下文压缩（summarization）」指的是怎么做？",
    answer:
      "把最旧的几轮历史交给模型总结成一条短摘要，再用这条摘要替换掉那几轮原文塞回上下文。这样要点还在、却省下大半 token。",
    tags: ["上下文压缩", "summarization"],
  },
  {
    id: "agent-cw-5",
    chapter: "agent-context-window",
    level: 1,
    question: "「裁剪（truncation）」指的是怎么做？",
    answer:
      "直接把最旧的、或与当前任务无关的几轮内容删掉，不做任何处理。零额外成本、最快，但被删的内容彻底没了。",
    tags: ["裁剪", "truncation"],
  },
  {
    id: "agent-cw-6",
    chapter: "agent-context-window",
    level: 1,
    question: "「滑动窗口」是一种什么样的裁剪策略？",
    answer:
      "只保留最近的 N 轮对话，每来一轮新的，就把最旧的一轮挤出去——像一个固定大小的窗口在历史上往前滑。它是裁剪的一种常见、简单的实现方式。",
    tags: ["滑动窗口", "裁剪"],
  },
  {
    id: "agent-cw-7",
    chapter: "agent-context-window",
    level: 1,
    question: "「lost in the middle」现象说的是什么？",
    answer:
      "在很长的上下文里，模型对开头和结尾的内容更上心，对正中间的内容最容易看漏——关注度呈两端高、中间凹的 U 形。所以关键信息别埋在中间。",
    tags: ["lost in the middle", "现象"],
  },
  {
    id: "agent-cw-8",
    chapter: "agent-context-window",
    level: 1,
    question: "窗口装满之后，再往里塞内容会发生什么？",
    answer:
      "超出上限的内容会被截断丢掉（通常是最旧的先被丢），模型再也看不到；而且 token 越多，每次调用越贵、越慢。所以不能放任窗口一直涨。",
    tags: ["截断", "代价"],
  },

  // —— Level 2 · 辨析（理解）——
  {
    id: "agent-cw-9",
    chapter: "agent-context-window",
    level: 2,
    question: "压缩和裁剪最本质的区别在哪？",
    answer:
      "压缩用一次额外的模型调用换来「信息不全丢」——要点被总结保留下来；裁剪用「彻底丢失」换来「零成本、最快」——删了就没了。一个保信息但多花钱，一个省钱但丢信息。",
    tags: ["压缩 vs 裁剪", "辨析"],
  },
  {
    id: "agent-cw-10",
    chapter: "agent-context-window",
    level: 2,
    question: "什么场景更适合用压缩？什么场景更适合用裁剪？",
    answer:
      "老历史里还有要点、之后可能用得上时，用压缩（总结成摘要保住要点）；某些内容确实没用了、或纯属噪声时，用裁剪（一删了事，省下总结的开销）。一句话：要点还有用就压缩，确实没用了就裁剪。",
    tags: ["压缩 vs 裁剪", "选型", "理解"],
  },
  {
    id: "agent-cw-11",
    chapter: "agent-context-window",
    level: 2,
    question: "为什么历史对话最容易把上下文窗口撑爆？",
    answer:
      "因为系统提示、检索资料这些大体是稳定或按需的，而历史对话会随着每一轮对话不断累加、只增不减。聊得越久它越大，最容易先顶到 token 上限，把别的内容挤掉。",
    tags: ["历史膨胀", "理解"],
  },
  {
    id: "agent-cw-12",
    chapter: "agent-context-window",
    level: 2,
    question: "为什么必须专门给「输出」留一块余量，不能把窗口塞到满？",
    answer:
      "因为模型的回答也要占 token，而且和输入共用同一个窗口预算。如果把输入塞到顶，就没地方让它生成回答了——所以预算分配里必须先扣下一块输出余量。",
    tags: ["预算分配", "输出余量", "理解"],
  },
  {
    id: "agent-cw-13",
    chapter: "agent-context-window",
    level: 2,
    question: "既然现在模型的上下文窗口越来越大，是不是就不用管理了？",
    answer:
      "不是。窗口再大也是有限的、迟早会被长对话填满；而且 token 越多越贵越慢，还会触发 lost in the middle 让关键信息被淹没。窗口变大只是把问题推后，不是取消管理的必要。",
    tags: ["长上下文", "误区", "理解"],
  },
  {
    id: "agent-cw-14",
    chapter: "agent-context-window",
    level: 2,
    question: "lost in the middle 对「怎么摆放上下文」有什么直接启示？",
    answer:
      "把最重要的指令、约束、关键信息放在上下文的开头或结尾，别埋在长长的中间段落里。因为模型对中间最不上心，埋在那儿等于让它大概率被忽略。",
    tags: ["lost in the middle", "排布", "理解"],
  },
  {
    id: "agent-cw-15",
    chapter: "agent-context-window",
    level: 2,
    question: "「管理上下文窗口」和上一章的「写好提示」是一回事吗？",
    answer:
      "不是同一件事，但相关。写好提示是把单次喂进去的那段话写清楚；管理窗口是在有限预算里决定「装什么、装多少、满了怎么腾地方」。前者管质量，后者管容量，二者都属于上下文工程。",
    tags: ["概念区分", "理解"],
  },

  // —— Level 3 · 应用（套到具体场景）——
  {
    id: "agent-cw-16",
    chapter: "agent-context-window",
    level: 3,
    question:
      "一个客服 agent 聊到第 30 轮，窗口快满了，但前面很多轮里有顾客陆续交代的关键信息，该用压缩还是裁剪？",
    answer:
      "用压缩。因为前面的关键信息之后还要用，直接裁剪会把它们丢掉。应把最旧的几轮总结成一条保留要点的摘要（如「顾客是 VIP、订单号 X、想退某商品」），既腾出空间又不丢信息。",
    tags: ["压缩", "应用"],
  },
  {
    id: "agent-cw-17",
    chapter: "agent-context-window",
    level: 3,
    question:
      "历史里混进了大量无关的寒暄和重复确认，挤占了窗口，最划算的处理是什么？",
    answer:
      "这些纯属噪声、之后用不上，直接裁剪掉最划算——省下压缩要花的那次模型调用。裁剪正适合「确实没用了」的内容；不必为没价值的寒暄专门做总结。",
    tags: ["裁剪", "应用"],
  },
  {
    id: "agent-cw-18",
    chapter: "agent-context-window",
    level: 3,
    question:
      "要给一个会长期对话的 agent 设计「历史超长就压缩」的策略，关键逻辑大致怎么写？",
    answer:
      "设一个阈值：每轮结束后估算历史的 token 数，一旦超过阈值，就把最旧的 N 轮交给 LLM 总结成一条 summary，用这条 summary 替换掉那 N 轮原文，保留最近几轮原文。这样窗口被控制在阈值附近、要点不丢。",
    tags: ["压缩", "阈值", "应用"],
  },
  {
    id: "agent-cw-19",
    chapter: "agent-context-window",
    level: 3,
    question: "给一个聊天 agent 分配窗口预算时，大致按什么思路给各部分定额度？",
    answer:
      "先扣下输出余量（保证模型有地方写回答），再给系统提示一块固定额度（人设规矩，越精简越好），剩下的给历史和检索资料；历史那块设上限，超了就压缩或裁剪。核心是「先留输出、压住会膨胀的历史」。",
    tags: ["预算分配", "应用"],
  },
  {
    id: "agent-cw-20",
    chapter: "agent-context-window",
    level: 3,
    question:
      "一条「绝不能漏」的硬性指令，被你写在了一大段长上下文的正中间，模型却老不照做，怎么改？",
    answer:
      "把这条指令挪到上下文的开头或结尾（比如放进系统提示开头，或在末尾再强调一遍）。因为 lost in the middle，埋在中间的关键指令最容易被忽略；放到两端模型才更可能注意到。",
    tags: ["lost in the middle", "应用"],
  },
  {
    id: "agent-cw-21",
    chapter: "agent-context-window",
    level: 3,
    question:
      "用滑动窗口只保留最近 N 轮，结果模型「忘了」前面交代过的关键设定，怎么补救？",
    answer:
      "纯滑动窗口会把更早但重要的设定一起滑出去。补救：别只靠裁剪——把要长期记住的关键设定压缩成一条摘要钉在前面（或写进系统提示），让它不随滑动被丢掉；滑动窗口只用来淘汰近期的普通对话。",
    tags: ["滑动窗口", "压缩", "应用"],
  },

  // —— Level 4 · 陷阱 / 综合 ——
  {
    id: "agent-cw-22",
    chapter: "agent-context-window",
    level: 4,
    question:
      "有人图省事，每轮都把全部历史一股脑塞进上下文，结果又贵又慢、效果还变差，问题出在哪？怎么治？",
    answer:
      "问题在于放任历史无限膨胀：迟早顶到 token 上限被截断、token 越烧越多更贵更慢，长上下文还触发 lost in the middle 淹没重点。治法：设阈值主动管理——老历史压缩成摘要、无关内容裁剪掉、把窗口控制在合理水位，而不是被动等它溢出。",
    tags: ["陷阱", "无脑塞历史", "综合"],
  },
  {
    id: "agent-cw-23",
    chapter: "agent-context-window",
    level: 4,
    question:
      "做裁剪时为了腾空间删得太狠，把后面还要用的关键信息也删了，怎么避免这种翻车？",
    answer:
      "裁剪前先分清「确实没用的」和「之后还要用的」：噪声、寒暄可以裁；含关键设定 / 约定 / 数据的内容不能直接删——要么压缩成摘要保住要点，要么钉在固定位置不参与裁剪。一刀切按「最旧就删」很容易误删，得按「还有没有用」来判。",
    tags: ["陷阱", "误删", "综合"],
  },
  {
    id: "agent-cw-24",
    chapter: "agent-context-window",
    level: 4,
    question:
      "把这一章串起来：面对一个会一直涨的上下文窗口，一套合理的管理思路是什么？",
    answer:
      "认清窗口是固定预算、历史会膨胀迟早溢出；先在预算里留好输出余量、压住会涨的历史；窗口快满时主动出手——要点还有用就压缩成摘要、确实没用就裁剪；同时把最关键的信息放在开头或结尾躲开 lost in the middle。整体是「填满 → 压缩腾空 → 继续」的主动循环，而不是被动等截断。",
    tags: ["综合", "管理思路", "循环"],
  },
];
