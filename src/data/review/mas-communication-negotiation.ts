import type { ReviewQuestion } from "./types";

export const masCommunicationNegotiationQuestions: ReviewQuestion[] = [
  {
    id: "mas-communication-negotiation-1",
    chapter: "mas-communication-negotiation",
    level: 1,
    question: "列举通信对多智能体系统的四大价值，各举一个场景。",
    answer:
      "通信的四大价值：①信息共享——传递状态与意图，降低不确定性。场景：多个监控智能体共享各自观测到的异常事件，拼出全局态势。②请求协助——委托任务与能力。场景：一个搬运智能体遇到超重货物，向附近的智能体请求协助抬运。③承诺协调——建立互信与契约，约束未来行为。场景：两个智能体约定「我走左道你走右道」避免碰撞，承诺后双方有义务遵守。④协商分利——在冲突利益间达成双赢协议。场景：两个采购智能体就供应商报价进行讨价还价，达成双方可接受的价格契约。没有通信，智能体只能在「盲交互」中博弈，无法显式协调；有通信，智能体可以传递意图、建立承诺、协商分利，大幅提升协作效率与系统整体效用。",
    tags: ["通信价值", "信息共享", "协商分利"],
  },
  {
    id: "mas-communication-negotiation-2",
    chapter: "mas-communication-negotiation",
    level: 2,
    question: "言语行为的四类是什么？将「请你帮我搬箱子」归类并说明理由。",
    answer:
      "言语行为四类（源自 Austin 与 Searle）：①断言类（Assertives）——描述世界，如 inform、confirm，真值可验，说话者声称某事为真。②指令类（Directives）——要求行动，如 request、order，说话者期待听话者执行某动作。③承诺类（Commissives）——承担义务，如 promise、commit，说话者承诺自己未来做某事。④声明类（Declaratives）——改变世界，如 declare，话说即事实，说出后世界状态改变。「请你帮我搬箱子」归类为指令类。理由：这句话的核心言语行为是「要求听话者执行某动作（搬箱子）」，说话者期待听话者服从并搬箱子。它不是断言（不是描述某事实）、不是承诺（不是说话者自己承诺搬，而是要求对方搬）、不是声明（说这句话本身不改变世界，需对方实际行动才改变）。每条通信兼具命题内容（搬箱子这件事）和言语行为类型（指令——要求对方做），理解通信需同时把握两者。",
    tags: ["言语行为", "四类分类", "指令类"],
  },
  {
    id: "mas-communication-negotiation-3",
    chapter: "mas-communication-negotiation",
    level: 2,
    question: "KQML 与 FIPA ACL 有何异同？FIPA ACL 的核心原语有哪些？",
    answer:
      "相同点：两者都是智能体通信语言（ACL），旨在让智能体机器可读地交换结构化消息，都基于言语行为理论——消息包含行为类型（performative）和内容（content）。不同点：①KQML（Knowledge Query and Manipulation Language）较早出现，消息结构为 performative + content + language（内容语言）+ ontology（本体），偏向知识查询与操作，较通用但标准化程度低。②FIPA ACL 由 FIPA 组织制定，是更严格的标准，定义了一组明确的通信原语和交互协议，语义形式化（基于 SL 语义），是当前主流标准。FIPA ACL 核心原语：inform（告知，断言类）、request（请求，指令类）、propose（提案，协商）、accept（接受提案）、reject（拒绝提案）、agree（同意执行请求）、refuse（拒绝执行）、query（查询）、call-for-proposal（招标公告）等。FIPA ACL 的优势在于标准化程度高、语义明确、有配套交互协议（如合同网协议的 FIPA 版本），便于异构智能体互操作。",
    tags: ["KQML", "FIPA ACL", "通信原语"],
  },
  {
    id: "mas-communication-negotiation-4",
    chapter: "mas-communication-negotiation",
    level: 3,
    question: "描述协商协议的标准流程，并解释 monotonic 让步为何能保证收敛。",
    answer:
      "协商协议标准流程：①提出提案——一方 propose 初始方案（如报价100）。②评估权衡——接收方计算提案对自己的效用，判断是否可接受。③反报价——若不满意，counter-offer 提出新方案（如还价80），每轮双方交替提案。④接受/拒绝——某方认为对方提案效用足够高则 accept，否则继续或最终 reject。⑤达成契约——accept 后形成具有约束力的 agree。monotonic 让步策略：每方每轮提案在己方效用上不劣于上一轮（即单调递减——给对方越来越多让步）。保证收敛的原理：①每方让步是单调的，己方效用单调递减有下界（不会无限让步到负无穷），故让步序列收敛。②双方都在让步，双方的效用区间不断收窄，最终在某点重叠——即存在一个双方都能接受的方案。③若双方让步到各自底线仍未重叠，则协商失败（无协议区），这也是收敛的终点。因此 monotonic 让步保证协商在有限步内要么达成协议（效用区间重叠），要么明确失败（底线不重叠），不会无限循环。这是协商协议设计的关键收敛性保证。",
    tags: ["协商协议", "monotonic让步", "收敛性"],
  },
];
