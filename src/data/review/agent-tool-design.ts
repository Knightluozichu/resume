/** 复习题库 · 设计好用的工具（agent-tool-design）。《AI 智能体应用开发》第 9 章原创。 */

import type { ReviewQuestion } from "./types";

export const agentToolDesignQuestions: ReviewQuestion[] = [
  // —— Level 1 · 基础概念（认记）——
  {
    id: "agent-td-1",
    chapter: "agent-tool-design",
    level: 1,
    question: "评判一个工具「好不好用」，本章拆成了哪五个维度？",
    answer:
      "命名、描述（description）、粒度、错误信息、返回值。一个工具好不好用，可以拿这五个维度逐项检查——每个维度都有明确的好坏之分。",
    tags: ["五个维度", "基础"],
  },
  {
    id: "agent-td-2",
    chapter: "agent-tool-design",
    level: 1,
    question: "什么是「工具粒度」？",
    answer:
      "工具粒度指一个工具一次到底管多大一件事：是只做一个原子动作（细），还是办成一件完整的事（合适），还是一个工具塞进好几件不相干的事（粗）。粒度不是越细越好，也不是越粗越省事。",
    tags: ["工具粒度", "基础"],
  },
  {
    id: "agent-td-3",
    chapter: "agent-tool-design",
    level: 1,
    question: "什么是「可恢复的错误（recoverable error）」？",
    answer:
      "可恢复的错误指工具失败时返回的、让 agent 看得懂并能照着改的错误信息——说清错在哪、怎么改。它的反面是抛一个裸异常（如 KeyError），agent 看不懂、无从下手。",
    tags: ["可恢复错误", "recoverable-error", "基础"],
  },
  {
    id: "agent-td-4",
    chapter: "agent-tool-design",
    level: 1,
    question: "什么是工具的「结构化返回」？",
    answer:
      "结构化返回指工具把结果整理成字段清晰、只留要紧信息的结构（如一个精简的对象），而不是把一大坨原始数据（整段 raw JSON、整张表）直接丢给模型。",
    tags: ["结构化返回", "基础"],
  },
  {
    id: "agent-td-5",
    chapter: "agent-tool-design",
    level: 1,
    question: "什么是「职责单一原则」（用在工具设计上）？",
    answer:
      "职责单一指一个工具只负责一件清楚、完整的事，不把多件不相干的功能揉进同一个工具。它直接关系到工具的粒度合不合适、模型分不分得清该用谁。",
    tags: ["职责单一", "基础"],
  },
  {
    id: "agent-td-6",
    chapter: "agent-tool-design",
    level: 1,
    question: "好的工具命名长什么样？举个好坏对比。",
    answer:
      "好命名一看就知道工具干嘛、读起来像在说人话，比如 get_order_status；坏命名含糊、要靠猜，比如 get_data。名字是模型选工具时的第一道标签，含糊的名字会让模型一上来就分不清。",
    tags: ["命名", "基础"],
  },

  // —— Level 2 · 理解（为什么/区分）——
  {
    id: "agent-td-7",
    chapter: "agent-tool-design",
    level: 2,
    question:
      "上一章说模型靠 description 挑工具，本章为什么还要单独讲「怎么把工具设计好」？",
    answer:
      "上一章讲的是模型「怎么挑」这套机制；本章讲的是你这边「怎么把工具做得让它好挑、好用」。挑得准只是第一步——就算挑对了，粒度不合适、错误信息看不懂、返回值撑爆上下文，agent 照样办不成事。设计好用的工具，是把命名、描述、粒度、错误信息、返回值五项都做对。",
    tags: ["与上一章的关系", "理解"],
  },
  {
    id: "agent-td-8",
    chapter: "agent-tool-design",
    level: 2,
    question: "工具粒度「太细」会带来什么问题？",
    answer:
      "太细会导致组合爆炸：办成一件事要把好几个原子工具串成一条长链，调用步数多、链路长，又慢又容易在中途某一步出错，对 agent 是很重的负担。",
    tags: ["工具粒度", "太细", "理解"],
  },
  {
    id: "agent-td-9",
    chapter: "agent-tool-design",
    level: 2,
    question: "工具粒度「太粗」会带来什么问题？",
    answer:
      "太粗会导致一个工具管太多不相干的事（订票/改签/退票/查天气全塞进去）：参数一大堆、职责不清，模型不知道这次到底想用它干哪件事，既不灵活又容易误用、误选。",
    tags: ["工具粒度", "太粗", "理解"],
  },
  {
    id: "agent-td-10",
    chapter: "agent-tool-design",
    level: 2,
    question: "为什么说「错误信息的质量直接决定 agent 能不能自救」？",
    answer:
      "因为 agent 拿不到现场、只能读工具返回的那段文字。返回一个裸异常（KeyError），它看不懂、无从修正，只能原样重试、卡死或瞎试；返回一句「错在哪 + 怎么改」的提示，它能读懂、纠正参数、重试成功。同一次失败，返回的信息不同，结局天差地别。",
    tags: ["可恢复错误", "自救", "理解"],
  },
  {
    id: "agent-td-11",
    chapter: "agent-tool-design",
    level: 2,
    question: "把整段原始数据（raw JSON / 整张表）直接返回给模型，有什么害处？",
    answer:
      "两个害处：一是把宝贵的上下文窗口塞满，挤掉真正要紧的信息、还更贵；二是要紧字段被淹没在噪声里，模型更难抓重点、更容易答偏。结构化、只留要紧字段的返回才好用。",
    tags: ["结构化返回", "上下文", "理解"],
  },
  {
    id: "agent-td-12",
    chapter: "agent-tool-design",
    level: 2,
    question:
      "一个含糊的工具名（如 get_data）和一个清晰的名（如 get_order_status），对模型有什么不同影响？",
    answer:
      "名字是模型对工具的第一印象/标签。含糊的名让模型一上来就难判断它干嘛、和别的工具怎么区分，挑选更易出错；清晰、像人话的名让模型一眼对上号，再配合好的 description，挑得又快又准。",
    tags: ["命名", "工具选择", "理解"],
  },
  {
    id: "agent-td-13",
    chapter: "agent-tool-design",
    level: 2,
    question: "「一个工具刚好办成一件完整的事」为什么是粒度的黄金点？",
    answer:
      "因为它一头避开了太细的组合爆炸（不用串一长串调用），一头避开了太粗的职责混乱（参数不爆炸、用途清楚）。agent 一次调用就把一件事办成，链路短、不易错、模型也清楚什么时候该用——这正是职责单一的体现。",
    tags: ["工具粒度", "职责单一", "理解"],
  },

  // —— Level 3 · 应用（给场景判断/操作）——
  {
    id: "agent-td-14",
    chapter: "agent-tool-design",
    level: 3,
    question:
      "你的下单工具失败时返回 `KeyError: 'sku'`。从「可恢复错误」角度，把它改好，并说明改后 agent 会怎样。",
    answer:
      "改成一句能照做的提示，例如：「缺少必填参数 sku（商品编号）；sku 应为 6 位数字，如 100245。请补上后重试。」改后 agent 能读懂缺了什么、格式是什么，自己把 sku 补对再调一次，从而自救成功——而不是对着 KeyError 原样重试、卡死。",
    tags: ["可恢复错误", "改进", "应用"],
  },
  {
    id: "agent-td-15",
    chapter: "agent-tool-design",
    level: 3,
    question:
      "一个查询工具一次返回了 2000 行原始记录。怎么改它的返回值更好用？",
    answer:
      "别把 2000 行原样塞回去。改法：只返回这次真正要用到的字段、做聚合或截断（如「共 2000 条，按相关度返回前 5 条 + 总数 + 可翻页游标」）。结构化、精简返回，既不撑爆上下文，又让模型一眼抓到要紧信息。",
    tags: ["结构化返回", "改进", "应用"],
  },
  {
    id: "agent-td-16",
    chapter: "agent-tool-design",
    level: 3,
    question:
      "（选型题）给「帮用户订一张去上海的高铁票」设计工具，下面三种切法选哪种、为什么？(A) 拆成 search_trains / pick_train / lock_seat / pay / issue_ticket 五个工具；(B) 一个 book_train_ticket 工具；(C) 一个 manage_travel 工具，订票/改签/退票/查天气都走它。",
    answer:
      "选 (B)。(A) 太细：agent 要把五个工具串成长链才订成，慢且易在中途出错（组合爆炸）。(C) 太粗：一个工具管太多不相干的事，参数一大堆、模型分不清这次要干哪件（职责不清）。(B) 粒度刚好——一个工具办成「订一张票」这件完整的事，一次调用搞定，agent 用着最顺。",
    tags: ["工具粒度", "选型", "应用"],
  },
  {
    id: "agent-td-17",
    chapter: "agent-tool-design",
    level: 3,
    question:
      "（选型题）天气工具：(A) get_weather(city) 返回 `{temp:28, condition:'晴', wind:'3级'}`；(B) get_weather(city) 返回气象台原始 API 的整段 JSON（含几十个内部字段、雷达图 URL、台站编号…）。哪个设计更好？为什么？",
    answer:
      "(A) 更好。它做了结构化、只留 agent/用户真正要用的要紧字段；(B) 把一大坨原始数据原样透传，会塞满上下文、淹没重点、还更贵。返回值要替模型把噪声筛掉，而不是把活儿全甩给它。",
    tags: ["结构化返回", "选型", "应用"],
  },
  {
    id: "agent-td-18",
    chapter: "agent-tool-design",
    level: 3,
    question:
      "你发现 agent 调你的 do_stuff(payload) 工具时经常传错参数、用错场合。先怀疑哪两个维度？怎么改？",
    answer:
      "先怀疑「命名」和「描述」：do_stuff/payload 含糊到看不出干嘛、参数是什么。改法：换成像人话、表意明确的名（如 update_user_email）和具体参数名（user_id, new_email），再把 description 写清「干嘛 + 何时用 + 边界 + 参数格式」。名字和描述清晰了，模型才用得对、传得对。",
    tags: ["命名", "描述", "应用"],
  },
  {
    id: "agent-td-19",
    chapter: "agent-tool-design",
    level: 3,
    question:
      "工具执行成功了，但返回里夹了一句「⚠️ 你的额度只剩 1 次」。这种「软提示」该怎么放进返回值才好用？",
    answer:
      "把它放进结构化返回里的一个明确字段（如 warning 或 notice），而不是混在正文里让模型自己分辨。这样既不丢失这条信息，又不破坏返回的结构、不让模型把警告误当成正文结果。结构化的好处之一就是不同性质的信息各归各位。",
    tags: ["结构化返回", "应用"],
  },

  // —— Level 4 · 综合（辨析/设计）——
  {
    id: "agent-td-20",
    chapter: "agent-tool-design",
    level: 4,
    question:
      "有人说「工具拆得越细越灵活，所以一律拆到最细就对了」。结合本章反驳他。",
    answer:
      "不对。拆到最细会组合爆炸：办一件事要让 agent 把一长串原子工具串起来，调用多、链路长，又慢又容易在中途某一步出错，反而更脆。灵活不等于细——粒度的黄金点是「一个工具刚好办成一件完整的事」（职责单一）。只在确有多种独立组合需求时才下沉粒度，而不是无脑拆到最细。",
    tags: ["工具粒度", "辨析", "综合"],
  },
  {
    id: "agent-td-21",
    chapter: "agent-tool-design",
    level: 4,
    question:
      "同样是「工具失败」，为什么对 agent 来说，错误信息的写法比对人类用户重要得多？",
    answer:
      "因为人类碰到裸异常还能去看文档、查日志、问同事、连蒙带猜；agent 在那一刻只有工具返回的这段文字可凭。信息够它就能自我纠正、重试成功，信息不够它就卡死或瞎试。所以工具的错误信息要当成「写给一个只能读这段字的执行者看的操作指引」——说清错在哪、该怎么改。",
    tags: ["可恢复错误", "辨析", "综合"],
  },
  {
    id: "agent-td-22",
    chapter: "agent-tool-design",
    level: 4,
    question:
      "你要给一个客服 agent 设计一个 refund_order（退款）工具。从本章五个维度各给一条具体设计准则。",
    answer:
      "命名：用 refund_order 这种一看就懂、表意明确的名。描述：写清「对一笔已付款订单发起退款；仅在订单可退期内可用；需 order_id」，划清和 cancel_order 等的边界。粒度：只管「退这一单」这件完整的事，别把查单、改单也塞进来（职责单一）。错误信息：失败时返回可照做的提示，如「订单 A0123 已超过 7 天可退期，不能退款」，而非裸异常。返回值：成功就返回结构化精简结果，如 `{refunded:true, amount:99, eta:'3-5 天'}`，别回传整段支付网关原始响应。",
    tags: ["五个维度", "工具设计", "综合"],
  },
];
