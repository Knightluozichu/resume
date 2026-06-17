/** 复习题库 · 大模型：智能体的大脑（agt-llm-as-brain）。《从零构建 AI Agent》篇1·2。 */

import type { ReviewQuestion } from "./types";

export const agtLlmAsBrainQuestions: ReviewQuestion[] = [
  // ── L1 认记：定义 / 术语 ──
  {
    id: "agt-lab-1",
    chapter: "agt-llm-as-brain",
    level: 1,
    question: "什么是 token？模型是按「字」处理文字，还是按 token 处理？",
    answer:
      "token 是模型处理文字的**最小单位**，可理解成「切碎的文字块」——可能是一个汉字、一个英文单词，也可能是一个长词的一段（子词）或一个标点。模型读纸条、写回复都**以 token 为单位**，而不是以「字」为单位。",
    tags: ["token", "最小单位"],
  },
  {
    id: "agt-lab-2",
    chapter: "agt-llm-as-brain",
    level: 1,
    question: "什么是 tokenization（token 化 / 分词）？",
    answer:
      "把一段文字切成一串 token 的过程，也叫分词。不同语言切法不同：中文常一字切成一个 token，英文常按单词或单词的一段（子词）切。",
    tags: ["tokenization", "分词"],
  },
  {
    id: "agt-lab-3",
    chapter: "agt-llm-as-brain",
    level: 1,
    question: "什么是上下文窗口（context window）？本书把它比作什么？",
    answer:
      "模型一次能「读进去」的 token 数量上限（也叫上下文长度）。系统提示 + 之前的对话 + 当前问题加起来的 token 数不能超过它。本书把它比作「门缝能塞进的纸条长度」。",
    tags: ["上下文窗口", "context window"],
  },
  {
    id: "agt-lab-4",
    chapter: "agt-llm-as-brain",
    level: 1,
    question:
      "「下一个 token 预测（next-token prediction）」一句话说清是怎么回事？",
    answer:
      "看着已有的全部文字，对「下一个 token 该是什么」算出一个概率分布，挑一个（通常挑概率最高的）接到后面，再把刚接上的算进「已有文字」继续预测——如此反复。所谓「生成一段话」就是把这个小动作做很多很多次。",
    tags: ["下一个 token 预测", "next-token prediction"],
  },
  {
    id: "agt-lab-5",
    chapter: "agt-llm-as-brain",
    level: 1,
    question: "什么是幻觉（hallucination）？它是不是模型在故意撒谎？",
    answer:
      "大模型一本正经地编造不实内容的现象（如编出不存在的引用、数据、人名）。**不是**故意撒谎，而是机制使然：它靠「接最顺的下一个 token」生成、并不核对事实，没可靠依据时照样能输出通顺但错误的答案。",
    tags: ["幻觉", "hallucination"],
  },
  {
    id: "agt-lab-6",
    chapter: "agt-llm-as-brain",
    level: 1,
    question: "本章点到的大模型三大天生短板是哪三块？",
    answer:
      "①会**幻觉**（没依据也敢编）；②**记不住**（关了就忘、聊久了也忘）；③**动不了手**（出不了屋、不能上网/算账/查实时数据）。",
    tags: ["三大短板", "幻觉", "无记忆", "不能行动"],
  },
  {
    id: "agt-lab-7",
    chapter: "agt-llm-as-brain",
    level: 1,
    question: "塞进上下文窗口的，只有「当前这句问题」吗？",
    answer:
      "不止。系统提示（给模型的设定）+ 之前来回的对话历史 + 当前这次的问题，**全都要一起塞进同一个窗口**、一起占用容量。",
    tags: ["上下文窗口", "系统提示", "对话历史"],
  },

  // ── L2 理解：辨析 / 因果 ──
  {
    id: "agt-lab-8",
    chapter: "agt-llm-as-brain",
    level: 2,
    question:
      "为什么「token 数」往往不等于你眼睛数的「字数」？中英文为什么还不一样？",
    answer:
      "因为 token 是模型切碎文字的块，不一定一字一块：中文常一字一 token，**英文一个长词常被切成多个子词 token**（如 `unbelievable` → `un`/`believ`/`able`），代码、标点更碎。所以同样长的一句话，中英文 token 数可能差很多，都不等于字数。",
    tags: ["token", "字数", "中英差异"],
  },
  {
    id: "agt-lab-9",
    chapter: "agt-llm-as-brain",
    level: 2,
    question: "上一章说大模型「失忆」，本章从机制上怎么解释这个「忘」？",
    answer:
      "「忘」来自**上下文窗口有限**：你塞进去的纸条（系统提示 + 历史 + 当前问题）越来越长，一旦超过窗口容量，最前面的内容就被挤出窗口、模型读不到了——不是它不想记，是门缝就这么宽，塞不下的掉出去了。",
    tags: ["失忆", "上下文窗口", "因果"],
  },
  {
    id: "agt-lab-10",
    chapter: "agt-llm-as-brain",
    level: 2,
    question: "模型生成一段话，是「先想好整句再写出来」吗？请纠正这个直觉。",
    answer:
      "不是。它是**下一个 token 预测**：一个 token 接一个 token 地往后接，每一步只赌「下一个最可能是谁」、挑一个接上，再预测下一个，直到挑中表示「结束」的 token 才停。它并不「知道」自己整句要说什么。",
    tags: ["下一个 token 预测", "直觉纠正"],
  },
  {
    id: "agt-lab-11",
    chapter: "agt-llm-as-brain",
    level: 2,
    question: "幻觉为什么会从「下一个 token 预测」这个机制里自然冒出来？",
    answer:
      "因为模型每一步只管挑「最顺的下一个 token」、**不管内容是不是真的**，也不去核对事实。当它没有可靠依据时，照样能一步步接出一串通顺却不实的内容——所以「会编、还编得很像真」是机制使然，不是偶发故障。",
    tags: ["幻觉", "下一个 token 预测", "因果"],
  },
  {
    id: "agt-lab-12",
    chapter: "agt-llm-as-brain",
    level: 2,
    question: "为什么聊天聊久了，模型会「前言不搭后语」？",
    answer:
      "聊得越久，系统提示 + 越攒越长的对话历史 + 当前问题加起来的 token 越多，一旦超过上下文窗口容量，最前面的对话就被挤出窗口、模型读不到了，于是会忘掉前面说过的话，表现为前言不搭后语。",
    tags: ["上下文窗口", "对话历史", "现象解释"],
  },

  // ── L3 应用：具体场景判断 ──
  {
    id: "agt-lab-13",
    chapter: "agt-llm-as-brain",
    level: 3,
    question:
      "要估算「能塞多少内容、调用要花多少钱、会不会超长」，应该按字数算还是按 token 算？为什么？",
    answer:
      "一律按 **token** 算，不能按字数算。因为模型一切都按 token 处理，英文长词、代码、标点会切出远多于字数的 token；按字数估很容易严重低估，导致超预算或超窗口报错。拿不准就先用分词工具切一遍看看。",
    tags: ["token 计数", "成本估算", "应用"],
  },
  {
    id: "agt-lab-14",
    chapter: "agt-llm-as-brain",
    level: 3,
    question:
      "同样写五个符号，纯中文「今天天气真」和一个英文长词，哪个切出的 token 更接近「字符数」？",
    answer:
      "**纯中文**更接近——中文大致一字一 token，5 个字约 5 个 token。英文长词常被拆成多个子词 token，一个词就可能切成两三块，token 数与「字符数」对不上得更明显。",
    tags: ["tokenization", "中英差异", "应用"],
  },
  {
    id: "agt-lab-15",
    chapter: "agt-llm-as-brain",
    level: 3,
    question:
      "用户抱怨「模型答着答着就忘了开头的要求」。从本章机制看，根因是什么？大方向怎么缓解？",
    answer:
      "根因是**上下文窗口有限**：随着对话变长，开头的要求被挤出了窗口，模型读不到了。缓解大方向是给它**记忆**——把关键要求 / 信息存进短期笔记本或长期记忆，要用时再取回、塞进当前窗口（后面「记忆与知识」篇专门讲）。",
    tags: ["上下文窗口", "记忆", "应用"],
  },
  {
    id: "agt-lab-16",
    chapter: "agt-llm-as-brain",
    level: 3,
    question:
      "模型给你报了一个看起来很专业、却查不到出处的「参考文献」。这是什么现象？靠「叮嘱它别乱说」能根治吗？",
    answer:
      "这是**幻觉**。靠叮嘱**治不了根**——它本来就不核对事实。要害是给它**可靠依据**：用检索（RAG）让它先查到真实资料、再照资料作答，把「凭印象编」换成「照资料说」。",
    tags: ["幻觉", "RAG", "应用"],
  },

  // ── L4 综合：跨概念整合 / 反思 ──
  {
    id: "agt-lab-17",
    chapter: "agt-llm-as-brain",
    level: 4,
    question:
      "把大模型的三块短板（幻觉、记不住、动不了手）分别对应到它「读—记—写」机制的哪一点，并说出各自要靠什么来补。",
    answer:
      "①**记不住** ← 上下文窗口有限（「记」这一环），超窗的被挤掉 → 补：**记忆**（短期笔记本 + 长期记忆），存下来要用时取回。②**幻觉** ← 下一个 token 预测只接「最顺的 token」、不核对事实（「写」这一环）→ 补：**检索增强 RAG**，先查可靠资料再作答。③**动不了手** ← 模型天生只会「读 token、写 token」、出不了屋 → 补：**工具调用**，给屋子装一部「电话」让它能真去做事。",
    tags: ["三大短板", "全书地图", "综合"],
  },
  {
    id: "agt-lab-18",
    chapter: "agt-llm-as-brain",
    level: 4,
    question:
      "结合本章与上一章：上一章说模型是「失忆天才」，本章拆开他的脑袋后，「失忆」「干不了实事」这两个比喻分别落到了哪个具体机制上？",
    answer:
      "「**失忆**」落到**上下文窗口有限**——门缝只能塞进固定长度的纸条，超出的被挤掉、读不到，所以记不住。「**干不了实事**」落到模型天生**只会以 token 为单位读和写**、出不了屋——它没有任何「动手」的能力，要靠后面的工具调用才能伸出屋外做事。本章把上一章的两个比喻从「现象」落到了「机制」。",
    tags: ["失忆天才小屋", "上下文窗口", "工具调用", "综合"],
  },
];
