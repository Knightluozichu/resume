"use client";

import { useState, useCallback } from "react";

const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
} as const;

type NodeSpec = {
  id: string;
  label: string;
  title: string;
  content: string;
  failure?: { title: string; desc: string };
};

type ChapterSpec = {
  title: string;
  subtitle: string;
  nodes: NodeSpec[];
};

const CHAPTERS: Record<string, ChapterSpec> = {
  map: {
    title: "多智能体系统学习路径",
    subtitle: "四部分递进：单体智能 → 通信合作 → 群体决策",
    nodes: [
      { id: "s1", label: "设定场景", title: "Part I · 设定场景", content: "把代理定义为在环境中感知并自主行动的计算实体。多智能体性质来自多目标、局部信息与相互影响，不能由单个代理的成功率代表。" },
      { id: "s2", label: "智能体", title: "Part II · 智能自治体", content: "从反应式、慎思式到混合架构：演绎推理用逻辑规则，实践推理用 BDI（信念-愿望-意图），反应式直接感知到行动。", failure: { title: "只看单体", desc: "只测单个代理完成任务，忽略联合状态与干扰。修法：记录联合轨迹，比较偏离动机。" } },
      { id: "s3", label: "通信合作", title: "Part III · 通信与合作", content: "言语行为理论与 FIPA ACL 让代理相互理解；联合意图与合同网组织团队工作；方法论把工程纪律引入 MAS。" },
      { id: "s4", label: "群体决策", title: "Part IV · 群体决策", content: "投票、拍卖、联盟、协商与论证：群体层面的机制设计决定集体结果是否公平高效。" },
    ],
  },
  preface: {
    title: "多智能体系统的愿景",
    subtitle: "为什么单个聪明的代理还不够",
    nodes: [
      { id: "a", label: "自治", title: "自治 Autonomy", content: "代理在无直接干预下自主决策：感知环境、维护内部状态、按自身目标行动。自治程度是 MAS 的第一维度。" },
      { id: "i", label: "交互", title: "交互 Interaction", content: "代理之间通过通信、协调与协商相互影响。交互协议决定系统整体行为，而非单体能力简单相加。", failure: { title: "独立假设", desc: "假设代理互不干扰各自运行。原因：忽视共享资源与时间窗。修法：建模联合行动与环境转移。" } },
      { id: "s", label: "社会", title: "社会 Societies", content: "代理组成有规范与角色的社会：承诺、规约与制度让大规模协作成为可能。" },
    ],
  },
  "part-01": {
    title: "第一部分 · 设定场景",
    subtitle: "代理、环境与多智能体性质",
    nodes: [
      { id: "e", label: "环境", title: "环境 Environment", content: "代理嵌入环境：物理世界、软件网络或市场。环境的可观测性与动态性决定代理设计难度。" },
      { id: "a", label: "代理", title: "代理 Agent", content: "感知-决策-行动循环：传感器输入、内部状态更新、效应器输出。自治意味着决策权在代理自身。" },
      { id: "m", label: "多智能体", title: "多智能体 Multiagent", content: "多个代理共享环境与资源：目标可能冲突，信息必然局部。整体行为需要从联合视角验证。", failure: { title: "单点测试", desc: "只测单代理成功率。原因：忽略相互影响。修法：注入并发场景，记录联合状态。" } },
    ],
  },
  "01": {
    title: "引言：代理与交互愿景",
    subtitle: "工程范式、社会建模与常见误解",
    nodes: [
      { id: "v", label: "愿景", title: "The Vision Thing", content: "代理作为软件工程新范式：从对象到能动的自治实体，封装的不只是数据与方法，还有目标与决策。" },
      { id: "g", label: "目标", title: "目标驱动", content: "代理按目标行动而非被动响应：偏好结构决定选择，效用提供比较尺度。" },
      { id: "f", label: "误解", title: "常见误解 FAQ", content: "代理不是万能灵药：没有相互影响的联合行动，问题可拆成独立任务，不必使用多智能体机制。", failure: { title: "概念滥用", desc: "把任何程序都叫代理。原因：缺少自治与交互判据。修法：检查感知-决策-行动循环是否真实存在。" } },
    ],
  },
  "part-02": {
    title: "第二部分 · 智能自治体",
    subtitle: "四种架构路线的对照",
    nodes: [
      { id: "r", label: "反应式", title: "反应式 Reactive", content: "感知直接映射到行动，无符号推理：快、鲁棒，但难以表达长期目标。" },
      { id: "d", label: "慎思式", title: "慎思式 Deliberative", content: "用符号模型推理：演绎代理靠逻辑证明，BDI 代理在信念、愿望、意图间权衡。", failure: { title: "推理超时", desc: "符号推理太慢错过时机。原因：实时约束与证明复杂度冲突。修法：分层架构，快路径反应、慢路径推理。" } },
      { id: "h", label: "混合式", title: "混合式 Hybrid", content: "分层组合两者：反应层处理紧急，慎思层规划长期。InteRRaP 与 TouringMachine 是代表。" },
    ],
  },
  "02": {
    title: "智能代理的谱系",
    subtitle: "从简单反射到完整 BDI",
    nodes: [
      { id: "t1", label: "反射", title: "简单反射代理", content: "条件-动作规则直接驱动：当前感知决定动作，不看历史。真空吸尘器是经典例子。" },
      { id: "t2", label: "状态", title: "模型代理", content: "维护内部状态追踪世界：历史压缩为信念，支持更远的视野。" },
      { id: "t3", label: "目标", title: "目标代理", content: "按目标选择动作：搜索与规划出场，动作的价值由目标达成度衡量。" },
      { id: "t4", label: "效用", title: "效用代理", content: "效用函数给状态打分：在冲突目标间权衡，处理不确定性下的决策。", failure: { title: "效用误设", desc: "效用函数与实际偏好错位。原因：指标代理真实目标。修法：用对照实验校准效用定义。" } },
    ],
  },
  "03": {
    title: "演绎推理代理",
    subtitle: "用逻辑证明驱动行动",
    nodes: [
      { id: "l", label: "逻辑", title: "逻辑建模", content: "用谓词逻辑表示世界：信念库存放公式，规则描述状态转移。" },
      { id: "p", label: "证明", title: "定理证明", content: "行动由证明驱动：若能证明某动作达成目标则执行。证明复杂度决定响应速度。" },
      { id: "t", label: "转型", title: "表示转型", content: "推理效率依赖表示形式：Horn 子句与归结是实用折中。", failure: { title: "组合爆炸", desc: "证明搜索空间爆炸。原因：无剪枝与启发式。修法：限深、排序子目标、用领域知识剪枝。" } },
    ],
  },
  "04": {
    title: "实践推理代理",
    subtitle: "BDI：信念、愿望、意图",
    nodes: [
      { id: "b", label: "信念", title: "信念 Beliefs", content: "代理对世界的当前看法：可能过时或错误，需要持续更新机制。" },
      { id: "d", label: "愿望", title: "愿望 Desires", content: "希望达成的状态：可能相互冲突，需要过滤为一致的目标集。" },
      { id: "i", label: "意图", title: "意图 Intentions", content: "承诺执行的计划：驱动 deliberation 与 means-ends 推理，在坚持与重评间平衡。", failure: { title: "意图僵化", desc: "环境变了还执行旧计划。原因：重评成本过高被跳过。修法：设定重评触发条件，如关键信念变化。" } },
      { id: "p", label: "计划", title: "计划库", content: "预编译的 recipe：头部触发条件 + 体部动作序列。PRS 与 dMARS 是经典实现。" },
    ],
  },
  "05": {
    title: "反应式与混合代理",
    subtitle: "快速反应与深度推理的折中",
    nodes: [
      { id: "s", label: "包容架构", title: "包容架构 Subsumption", content: "Brooks 的标志性方案：行为层按优先级抑制，底层反射优先于高层目标。" },
      { id: "a", label: "行动网", title: "行动网络", content: "RAP 与动作网络：预编译的反应规则库，编译期把计划转为快速查表。" },
      { id: "h", label: "分层混合", title: "分层混合", content: "水平或垂直分层：反应层毫秒响应，规划层秒级思考，控制层仲裁。", failure: { title: "层间冲突", desc: "两层给出矛盾指令。原因：仲裁协议缺失。修法：显式优先级与抑制规则，记录仲裁轨迹。" } },
    ],
  },
  "part-03": {
    title: "第三部分 · 通信与合作",
    subtitle: "代理如何理解彼此并协同工作",
    nodes: [
      { id: "u", label: "理解", title: "相互理解", content: "言语行为理论：消息不只是数据，是改变听者状态的行动。共享语义是前提。" },
      { id: "c", label: "通信", title: "通信协议", content: "KQML 与 FIPA ACL：请求、通知、承诺等 performative 定义消息的意图类型。" },
      { id: "w", label: "协作", title: "协作机制", content: "联合意图绑定团队，合同网用招标分配任务，承诺与约定维系协作。", failure: { title: "协议错配", desc: "双方对消息语义理解不同。原因：缺少共享本体。修法：先对齐本体与协议版本再通信。" } },
    ],
  },
  "06": {
    title: "相互理解",
    subtitle: "言语行为与共享心智",
    nodes: [
      { id: "s", label: "言语行为", title: "言语行为理论", content: "说即是做：断言、指令、承诺改变社会关系。Searle 的分类是通信协议的理论底座。" },
      { id: "m", label: "心智状态", title: "心智状态归因", content: "代理互相建模对方的信念与意图：理解他人是预测行为的前提。" },
      { id: "o", label: "本体", title: "共享本体", content: "共同词汇与概念框架：没有本体对齐，同一术语在两个代理处含义不同。", failure: { title: "语义漂移", desc: "同词不同义导致误解。原因：各自演化词汇表。修法：本体版本化并随消息声明。" } },
    ],
  },
  "07": {
    title: "通信",
    subtitle: "KQML 与 FIPA ACL",
    nodes: [
      { id: "k", label: "KQML", title: "KQML 协议", content: "外层消息格式：performative + 内容 + 本体声明。tell、ask-if、achieve 等原语。" },
      { id: "f", label: "FIPA ACL", title: "FIPA ACL", content: "标准化代理通信语言：request、inform、cfp、propose 等 20 余种动作类型。" },
      { id: "c", label: "对话", title: "对话策略", content: "多轮交互的结构：请求-响应、协商、拍卖对话各有状态机。", failure: { title: "死锁对话", desc: "双方等待对方先响应。原因：对话状态机无超时。修法：每步设截止期，超时进入终止分支。" } },
    ],
  },
  "08": {
    title: "协同工作",
    subtitle: "联合意图、团队与合同网",
    nodes: [
      { id: "j", label: "联合意图", title: "联合意图", content: "团队共享目标并互知：成员承诺互相通报进展与失败，联合坚持直到目标达成或公认不可达。" },
      { id: "t", label: "团队", title: "团队行动", content: "角色分配与掩护：每个成员知道自己的角色也信任他人完成其角色。" },
      { id: "c", label: "合同网", title: "合同网协议", content: "任务招标：管理者广播任务，代理投标，中标者签约执行。动态负载平衡的鼻祖。", failure: { title: "中标失能", desc: "中标代理失败无人接管。原因：合同无监督与重招标。修法：管理者监控执行，失败重招。" } },
    ],
  },
  "09": {
    title: "方法论",
    subtitle: "MAS 工程化开发流程",
    nodes: [
      { id: "r", label: "需求", title: "需求分析", content: "识别角色、目标与交互：用例驱动，把组织目标分解为代理职责。" },
      { id: "d", label: "设计", title: "架构设计", content: "选择代理架构与协议：Gaia、Tropos 等方法论提供建模语言。" },
      { id: "i", label: "实现", title: "实现框架", content: "JADE 等平台加速开发：代理容器、目录服务、消息通道开箱即用。" },
      { id: "t", label: "测试", title: "测试验证", content: "单体测试 + 社会测试：注入对抗代理验证协议健壮性。", failure: { title: "只测快乐路径", desc: "协议在异常输入下崩溃。原因：缺少对抗性测试。修法：模糊测试消息序列，验证恢复。" } },
    ],
  },
  "10": {
    title: "应用",
    subtitle: "MAS 的工业落地版图",
    nodes: [
      { id: "i", label: "工业", title: "工业控制", content: "柔性制造：机床代理协商排产，故障时动态重排，比中央计划更抗扰动。" },
      { id: "b", label: "商业", title: "电子商务", content: "交易代理：自动比价、协商条款、组合采购。市场机制直接映射为代理交互。" },
      { id: "m", label: "医疗交通", title: "医疗与交通", content: "病床调度、救护车分派、空中交通管制：多目标资源分配的实时版本。", failure: { title: "仿真幻觉", desc: "仿真完美的系统上线失效。原因：环境模型失真。修法：小规模真实试点，校准模型。" } },
    ],
  },
  "part-04": {
    title: "第四部分 · 群体决策",
    subtitle: "机制设计：让自利代理达成好的集体结果",
    nodes: [
      { id: "i", label: "交互", title: "交互类型", content: "合作、竞争与协调的光谱：收益结构决定交互性质。" },
      { id: "v", label: "投票拍卖", title: "投票与拍卖", content: "聚合偏好的机制：投票规则影响结果，拍卖形式影响报价策略。" },
      { id: "b", label: "协商论证", title: "协商与论证", content: "双边谈判与论据交锋：协议定义合法动作，策略决定结果分配。", failure: { title: "机制被操纵", desc: "代理虚报偏好获利。原因：机制非防策略。修法：选激励相容机制如 VCG。" } },
    ],
  },
  "11": {
    title: "多智能体交互",
    subtitle: "合作、竞争与协调的光谱",
    nodes: [
      { id: "c", label: "合作", title: "纯合作", content: "共享目标：团队问题，重心在协调与信用分配。" },
      { id: "z", label: "零和", title: "零和竞争", content: "一方所得即另一方所失：极小极大策略与纳什均衡是分析工具。" },
      { id: "m", label: "混合", title: "混合动机", content: "既合作又竞争：多数现实场景，需要机制设计引导。", failure: { title: "误判类型", desc: "按合作设计但代理实际自利。原因：收益结构分析缺失。修法：先画收益矩阵再选机制。" } },
    ],
  },
  "12": {
    title: "群体决策",
    subtitle: "投票、社会福利与机制设计",
    nodes: [
      { id: "v", label: "投票", title: "投票规则", content: "多数制、Borda、Copeland：同一偏好分布下规则不同结果不同。Arrow 定理说完美规则不存在。" },
      { id: "w", label: "社会福利", title: "社会福利", content: "功利主义与平等主义：聚合个体效用为集体目标的哲学选择。" },
      { id: "m", label: "机制设计", title: "机制设计", content: "逆向工程博弈：设计规则让自利代理的均衡行为达成设计者目标。", failure: { title: "策略性投票", desc: "选民不投真实偏好。原因：规则可被操纵。修法：分析激励相容性，接受 Gibbard 定理的极限。" } },
    ],
  },
  "13": {
    title: "联盟形成",
    subtitle: "特征函数、核与 Shapley 值",
    nodes: [
      { id: "c", label: "特征函数", title: "特征函数", content: "v(S) 给出联盟 S 可获价值：超可加性假设下大联盟最优，但分配是难题。" },
      { id: "k", label: "核", title: "核 Core", content: "无人愿退出的分配集：核可能为空，空核意味着没有稳定分配。" },
      { id: "s", label: "Shapley", title: "Shapley 值", content: "按边际贡献公平分配：满足对称、效率与可加性的唯一解。", failure: { title: "核为空", desc: "任何分配都有人退出。原因：联盟价值结构特殊。修法：放宽稳定性定义或引入转移支付。" } },
    ],
  },
  "14": {
    title: "稀缺资源分配",
    subtitle: "拍卖机制的对照实验",
    nodes: [
      { id: "e", label: "英式", title: "英式拍卖", content: "公开递增报价：赢家付最高价。价格发现透明但易引发赢家诅咒。" },
      { id: "d", label: "荷式", title: "荷式拍卖", content: "公开递减价格：首位接受者成交。快速但信息少。" },
      { id: "s", label: "密封", title: "密封投标", content: "一次暗标：一价付自己所报，二价付次高报价。二价激励说真话。" },
      { id: "v", label: "VCG", title: "VCG 机制", content: "按外部性付费：每人支付自己对他人造成的效率损失。激励相容的经典结论。", failure: { title: "共谋压价", desc: "投标人串通压低成交价。原因：密封拍卖防不了合谋。修法：增加参与者、随机配对与审计。" } },
    ],
  },
  "15": {
    title: "协商",
    subtitle: "谈判协议与策略",
    nodes: [
      { id: "p", label: "协议", title: "谈判协议", content: "交替报价协议定义合法动作：谁先报、能否撤回、何时终止。" },
      { id: "s", label: "策略", title: "谈判策略", content: "让步曲线：随时间与对手行为调整报价。时间压力是主要筹码。" },
      { id: "d", label: "截止期", title: "截止期与成本", content: "拖延有代价：每轮谈判消耗效用，促使双方及时成交。", failure: { title: "僵局", desc: "双方都不让步谈判破裂。原因：保留价区间不重叠或误判。修法：引入调解或扩大议题打包交换。" } },
    ],
  },
  "16": {
    title: "论证",
    subtitle: "论据、攻击与可接受性",
    nodes: [
      { id: "a", label: "论据", title: "论据结构", content: "前提支持结论：规则与例外的组合，比纯粹命题更接近人类推理。" },
      { id: "t", label: "攻击", title: "攻击关系", content: "论据之间互相削弱：反驳结论、削弱前提、切断推理链。" },
      { id: "d", label: "可接受性", title: "可接受性语义", content: "Dung 的抽象框架：在无自相矛盾的子集中找可辩护的论据集。", failure: { title: "循环攻击", desc: "论据互相攻击形成环。原因：无优先级的对称攻击。修法：引入论据强度或偏好打破对称。" } },
    ],
  },
  "17": {
    title: "逻辑基础",
    subtitle: "模态逻辑、承诺与规约",
    nodes: [
      { id: "m", label: "模态逻辑", title: "模态逻辑", content: "信念与知识的算子：B 与 K 公理体系刻画代理的认知状态。" },
      { id: "c", label: "承诺", title: "社会承诺", content: "承诺的形式化：谁对谁承诺什么，何时解除。承诺是协作的黏合剂。" },
      { id: "n", label: "规约", title: "规范与义务", content: "道义逻辑：应当、允许、禁止的推理。开放系统需要可验证的规范。", failure: { title: "规范冲突", desc: "两条规范给出矛盾指令。原因：无优先级元规则。修法：显式规范层级与冲突消解规则。" } },
    ],
  },
  coda: {
    title: "结语：开放问题",
    subtitle: "MAS 的边界与前沿",
    nodes: [
      { id: "o", label: "开放性", title: "开放系统", content: "成员自由进出的系统：规范、声誉与信任机制是秩序来源。" },
      { id: "l", label: "学习", title: "多智能体学习", content: "代理相互适应：联合学习导致非平稳环境，收敛性难题依旧。" },
      { id: "f", label: "未来", title: "未来方向", content: "LLM 代理新范式：大模型赋予代理语言能力，经典 MAS 问题换上新装。", failure: { title: "过度承诺", desc: "宣称 MAS 解决一切分布问题。原因：忽视协调成本。修法：按问题结构评估 MAS 收益。" } },
    ],
  },
  "appendix-a": {
    title: "历史课",
    subtitle: "从 AI 到分布式 AI 到 MAS",
    nodes: [
      { id: "a", label: "经典 AI", title: "经典人工智能", content: "单体智能时代：搜索、规划、专家系统，智能等于个体的推理能力。" },
      { id: "d", label: "DAI", title: "分布式人工智能", content: "问题天然分布：传感器网络与协作专家系统开启去中心化研究。" },
      { id: "m", label: "MAS", title: "多智能体系统", content: "代理概念成熟：自治、交互、社会三维成形，理论与工程互相喂养。" },
    ],
  },
  "appendix-b": {
    title: "后记",
    subtitle: "方法论的自省",
    nodes: [
      { id: "r", label: "回顾", title: "写作回顾", content: "本书如何组织知识：从单体到社会，从理论到工程。" },
      { id: "l", label: "教训", title: "经验教训", content: "哪些预测成真：代理概念渗透软件工程；哪些未至：通用 MAS 平台仍小众。" },
      { id: "f", label: "前瞻", title: "给读者的话", content: "继续深入的路径：机制设计、形式逻辑与具体平台三条进修路线。" },
    ],
  },
  review: {
    title: "全书复习：四环闭环",
    subtitle: "代理、交互、决策、逻辑的统一视图",
    nodes: [
      { id: "a", label: "代理", title: "代理架构", content: "反应式、慎思式、混合式：按响应时延与推理深度选型。" },
      { id: "i", label: "交互", title: "交互协议", content: "言语行为到 FIPA ACL：消息语义与对话状态机。" },
      { id: "d", label: "决策", title: "群体决策", content: "投票、拍卖、协商、论证：机制设计让自利行为达成集体目标。", failure: { title: "四环断裂", desc: "架构与机制不匹配。原因：分层设计各自为政。修法：用联合场景端到端验证。" } },
      { id: "l", label: "逻辑", title: "逻辑基础", content: "模态逻辑与承诺规约：形式化让系统行为可验证。" },
    ],
  },
};

const VIEW_W = 780;
const NODE_H = 88;
const NODE_Y = 132;
const GAP = 16;

export function MasInteractionLab({ chapter }: { chapter: string }) {
  const spec = CHAPTERS[chapter] ?? CHAPTERS.map;
  const [selected, setSelected] = useState(spec.nodes[0].id);
  const [injectFaults, setInjectFaults] = useState(false);

  const reset = useCallback(() => {
    setSelected(spec.nodes[0].id);
    setInjectFaults(false);
  }, [spec]);

  const nodeW = (VIEW_W - 40 - (spec.nodes.length - 1) * GAP) / spec.nodes.length;
  const nodeX = (i: number) => 20 + i * (nodeW + GAP);
  const stage = spec.nodes.find((n) => n.id === selected)!;
  const viewH = 330;

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>
          ⚡ {spec.title}
        </span>
        <button
          onClick={reset}
          className="rounded-control border border-border px-3 py-1 text-xs transition-colors hover:border-accent"
          style={{ color: C.secondary }}
        >
          重置
        </button>
      </div>

      <div className="p-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${viewH}`}
          className="w-full"
          role="img"
          aria-label={spec.title}
        >
          <text x={VIEW_W / 2} y={52} textAnchor="middle" fontSize={16} fill={C.primary} fontWeight={600}>
            {spec.title}
          </text>
          <text x={VIEW_W / 2} y={78} textAnchor="middle" fontSize={11} fill={C.secondary}>
            {spec.subtitle}；点击节点查看详情
          </text>

          {spec.nodes.slice(0, -1).map((n, i) => {
            const x1 = nodeX(i) + nodeW;
            const x2 = nodeX(i + 1);
            const y = NODE_Y + NODE_H / 2;
            return (
              <g key={`arrow-${n.id}`}>
                <line x1={x1} y1={y} x2={x2 - 4} y2={y} stroke={C.border} strokeWidth={1.5} />
                <polygon points={`${x2 - 4},${y - 4} ${x2 - 4},${y + 4} ${x2},${y}`} fill={C.border} />
              </g>
            );
          })}

          {spec.nodes.map((n, i) => {
            const x = nodeX(i);
            const cx = x + nodeW / 2;
            const isSel = selected === n.id;
            const isFail = injectFaults && !!n.failure;
            return (
              <g key={n.id} onClick={() => setSelected(n.id)} className="cursor-pointer">
                <rect
                  x={x}
                  y={NODE_Y}
                  width={nodeW}
                  height={NODE_H}
                  rx={8}
                  fill={C.elevated}
                  stroke={isSel ? C.accent : isFail ? C.danger : C.border}
                  strokeWidth={isSel ? 2 : 1}
                />
                <circle
                  cx={cx}
                  cy={NODE_Y + 22}
                  r={11}
                  fill={isSel ? C.accent : isFail ? C.danger : C.bg}
                  stroke={isSel ? C.accent : isFail ? C.danger : C.border}
                  strokeWidth={1}
                />
                <text
                  x={cx}
                  y={NODE_Y + 26}
                  textAnchor="middle"
                  fontSize={12}
                  fill={isSel || isFail ? C.bg : C.secondary}
                  fontWeight={600}
                >
                  {i + 1}
                </text>
                <text x={cx} y={NODE_Y + 54} textAnchor="middle" fontSize={12} fill={C.primary}>
                  {n.label}
                </text>
                {isFail && (
                  <text
                    x={cx}
                    y={NODE_Y + NODE_H + 22}
                    textAnchor="middle"
                    fontSize={11}
                    fill={C.danger}
                    fontWeight={500}
                  >
                    {n.failure!.title}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        <div className="mt-4 rounded-control border border-border p-4" style={{ background: C.bg }}>
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full" style={{ background: C.accent }} />
            <span className="text-sm font-medium" style={{ color: C.primary }}>
              {stage.title}
            </span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: C.secondary }}>
            {stage.content}
          </p>
          {injectFaults && stage.failure && (
            <div className="mt-3 rounded-control border p-3" style={{ background: C.elevated, borderColor: C.danger }}>
              <div className="mb-1 flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full" style={{ background: C.danger }} />
                <span className="text-xs font-semibold" style={{ color: C.danger }}>
                  冲突注入 · {stage.failure.title}
                </span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: C.secondary }}>
                {stage.failure.desc}
              </p>
            </div>
          )}
        </div>

        <label className="mt-4 flex cursor-pointer items-center gap-3">
          <button
            onClick={() => setInjectFaults(!injectFaults)}
            className="relative h-5 w-9 rounded-full border border-border transition-colors"
            style={{ background: injectFaults ? C.accent : C.elevated }}
            aria-label="注入常见冲突"
          >
            <span
              className="absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform"
              style={{ transform: injectFaults ? "translateX(16px)" : "translateX(0)" }}
            />
          </button>
          <span className="text-sm" style={{ color: C.secondary }}>
            注入常见冲突（高亮各环节的失败模式）
          </span>
        </label>
      </div>
    </div>
  );
}
