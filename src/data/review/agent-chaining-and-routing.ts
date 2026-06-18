/** 复习题库 · 链式与路由：把任务拆成更稳的工作流（agent-chaining-and-routing）。《AI 智能体应用开发》第 12 章，改编自 Anthropic《Building effective agents》。 */

import type { ReviewQuestion } from "./types";

export const agentChainingAndRoutingQuestions: ReviewQuestion[] = [
  {
    id: "agent-car-1",
    chapter: "agent-chaining-and-routing",
    level: 1,
    question: "一句话说清：链式（Prompt Chaining）最关键的结构特征是什么？",
    answer:
      "所有输入都走同一串固定步骤，前一步输出喂给后一步。重点不是“步骤多”，而是“每份输入都排同一条线”。",
    tags: ["链式", "基础"],
  },
  {
    id: "agent-car-2",
    chapter: "agent-chaining-and-routing",
    level: 1,
    question: "一句话说清：路由（Routing）最关键的结构特征是什么？",
    answer:
      "先把输入分到某个类别，再把它送进对应的专用固定流程。重点不是多一道分类，而是“不同类别走不同专线”。",
    tags: ["路由", "基础"],
  },
  {
    id: "agent-car-3",
    chapter: "agent-chaining-and-routing",
    level: 1,
    question: "链式和路由为什么都还是工作流，而不是自主 agent？",
    answer:
      "因为两者的路径都是人预先设计好的。链式写死了步骤顺序，路由写死了可分的类别和各类别后接哪条支线；模型并没有边做边自由生成全新路线。",
    tags: ["工作流", "边界", "基础"],
  },
  {
    id: "agent-car-4",
    chapter: "agent-chaining-and-routing",
    level: 1,
    question: "什么是路由器（Router）？",
    answer:
      "负责判断当前输入属于哪一类、该送进哪条后续流程的分类器。它可以是 LLM，也可以是规则或传统分类模型；前提是它得分得比较准。",
    tags: ["路由器", "基础"],
  },
  {
    id: "agent-car-5",
    chapter: "agent-chaining-and-routing",
    level: 1,
    question: "Anthropic 对链式的推荐适用前提，用人话概括是什么？",
    answer:
      "任务能被干净拆成固定子任务，而且每份输入都需要按同样顺序把这些子任务走一遍。链式是拿更多轮次，换每一步更容易做对。",
    tags: ["链式", "适用前提", "基础"],
  },
  {
    id: "agent-car-6",
    chapter: "agent-chaining-and-routing",
    level: 1,
    question: "Anthropic 对路由的推荐适用前提，用人话概括是什么？",
    answer:
      "任务里有几类差异明显的问题，每类更适合用专门提示、工具或流程处理，而且分类这一步可以做得比较准。能稳定分流，路由才成立。",
    tags: ["路由", "适用前提", "基础"],
  },
  {
    id: "agent-car-7",
    chapter: "agent-chaining-and-routing",
    level: 2,
    question: "为什么说“链式优化的是固定任务拆细”，而“路由优化的是分工隔离”？",
    answer:
      "链式假设所有输入都走同一路，所以它要解决的是“把一件固定任务拆成更容易做对的几步”；路由假设不同类别该交给不同专长，所以它要解决的是“先判断属于哪类，再让每类只优化自己那条线”。前者是在一条线里拆工序，后者是在入口处分流。",
    tags: ["链式", "路由", "理解"],
  },
  {
    id: "agent-car-8",
    chapter: "agent-chaining-and-routing",
    level: 2,
    question: "为什么链式里经常建议加程序化 gate？",
    answer:
      "因为链式的输出是一环扣一环传下去的，前面一步一旦错了，后面会把错误继续放大。中途加 gate 能在缺字段、格式错、结果不达标时拦下，避免错误一路带着跑到终点。",
    tags: ["链式", "gate", "理解"],
  },
  {
    id: "agent-car-9",
    chapter: "agent-chaining-and-routing",
    level: 2,
    question: "为什么说路由的关键不只是“能分”，而是“能分得比较准”？",
    answer:
      "因为路由一旦分错，就会把请求送进错误支线，后面整条流程都建立在错误前提上。路由的收益来自“把请求送进最适合自己的专线”；如果边界重叠严重、分类很不稳，这个前提就塌了，反而会带来误分成本和错误处理。",
    tags: ["路由", "分类准确率", "理解"],
  },
  {
    id: "agent-car-10",
    chapter: "agent-chaining-and-routing",
    level: 2,
    question: "本章给出的两个判断问题分别是什么？它们各自在帮你排除什么？",
    answer:
      "第一问：所有输入都走同一串固定工序吗？它在判断是否适合链式。第二问：如果不是，能不能先稳定分成几类，每类再走固定专线？它在判断是否适合路由。两问都答不上来，说明你可能已超出工作流边界。",
    tags: ["决策框架", "理解"],
  },
  {
    id: "agent-car-11",
    chapter: "agent-chaining-and-routing",
    level: 2,
    question: "“类别很多”本身能说明该用路由吗？为什么？",
    answer:
      "不能。真正关键的是类别边界是否清楚、是否能稳定分出来，以及分完之后每类是否真有不同的专门流程可走。只是“类别很多”但边界混乱、分不准，路由就会把问题放大，而不是解决问题。",
    tags: ["路由", "辨析", "理解"],
  },
  {
    id: "agent-car-12",
    chapter: "agent-chaining-and-routing",
    level: 3,
    question:
      "选型题：把会议录音整理成纪要，流程是“转写 -> 抽要点 -> 检查遗漏 -> 输出纪要”。更适合链式还是路由？为什么？",
    answer:
      "更适合链式。因为每份输入都要走同样四步，没有必要先分成几类；这类任务的关键在于把固定任务拆成更容易做对的几步，而不是在入口处分流。",
    tags: ["选型", "链式", "应用"],
  },
  {
    id: "agent-car-13",
    chapter: "agent-chaining-and-routing",
    level: 3,
    question:
      "选型题：一个客服总入口同时收到退款、查物流、账号登录失败三类请求。更适合链式还是路由？为什么？",
    answer:
      "更适合路由。因为不同类别的请求后续处理逻辑差异很大，应该先分到对应类别，再把每类送进自己的固定流程；若硬塞同一条长链，简单请求也会被迫走很多无关步骤。",
    tags: ["选型", "路由", "应用"],
  },
  {
    id: "agent-car-14",
    chapter: "agent-chaining-and-routing",
    level: 3,
    question:
      "一个团队把“每张发票都做 OCR -> 抽字段 -> 校验 -> 填表”的任务，先加了一级分类：餐饮发票、滴滴发票、酒店发票。这样做最可能犯了什么错？",
    answer:
      "最可能是把该链式的任务误做成路由。这个任务里每份输入本来都要走同样四道工序，先分类并没有带来真正分工，反而多了一层成本和误分风险。除非不同类别后面的工序真的完全不同，否则应直接用链式。",
    tags: ["选型坑", "链式", "应用"],
  },
  {
    id: "agent-car-15",
    chapter: "agent-chaining-and-routing",
    level: 3,
    question:
      "如果路由器经常把“订单退款失败”这种请求误分到 FAQ，你该优先补哪类机制？为什么？",
    answer:
      "优先补兜底机制，比如置信度阈值、人工回退、更强模型二次判定等。因为路由成立的前提是“能分得比较准”；当边界不清、分不稳时，继续硬分只会把请求送进错误支线，错上加错。",
    tags: ["路由", "兜底", "应用"],
  },
  {
    id: "agent-car-16",
    chapter: "agent-chaining-and-routing",
    level: 4,
    question:
      "有人说：“只要先分类再处理，就是路由；能多加几层 if-else 就总能把任务写成工作流，不需要考虑 agent。”用本章框架反驳他。",
    answer:
      "第一句只说对了一半：路由不只是“先分类”，而是要能把输入稳定分到清楚的几类，并且每类后面真有固定、专门的流程可走。分类不稳或类别重叠严重时，路由反而会放大错误。第二句则忽略了工作流边界：当你既列不清类别，也写不完后续分支，说明任务开放、路径随中间结果变化，继续堆 if-else 只会越来越脆；这时应回到 Ch11 的框架，考虑是否要加更高自主性的 agent 或其他模式，而不是无止境堆写死逻辑。",
    tags: ["综合", "边界", "工程判断"],
  },
];
