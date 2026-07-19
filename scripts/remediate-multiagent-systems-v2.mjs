#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const ROOT = process.cwd();
const BOOK = "multiagent-systems";
const BOOK_DIR = path.join(ROOT, "content", BOOK);
const COMPONENT_DIR = path.join(ROOT, "src/components/mdx", BOOK, "diagrams");
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/multiagent-systems-v2-profiles.json",
);
const OFFICIAL_PAGE =
  "https://www.cs.ox.ac.uk/people/michael.wooldridge/pubs/imas/";
const OFFICIAL_CONTENTS = `${OFFICIAL_PAGE}Contents.html`;
const OFFICIAL_RESOURCES = `${OFFICIAL_PAGE}resources.html`;
const WORK_TITLE =
  "Michael Wooldridge《An Introduction to MultiAgent Systems, Second Edition》";

const FACT_SOURCES = {
  author: { label: "作者官网完整目录", url: OFFICIAL_CONTENTS },
  slides: { label: "作者官网第二版教学资源", url: OFFICIAL_RESOURCES },
  fipa: {
    label: "FIPA Agent Communication Language Specifications",
    url: "https://www.fipa.org/repository/aclspecs.html",
  },
  owl: {
    label: "W3C OWL 2 Web Ontology Language Overview",
    url: "https://www.w3.org/TR/owl2-overview/",
  },
  rdf: {
    label: "W3C RDF 1.1 Concepts and Abstract Syntax",
    url: "https://www.w3.org/TR/rdf11-concepts/",
  },
  aamas: {
    label: "IFAAMAS 官方会议与论文集",
    url: "https://www.ifaamas.org/",
  },
};

const DESIGNS = {
  "mas-preface": {
    summary:
      "先固定第二版对象、先决知识、新增主题和使用方式，再进入代理定义与形式模型。",
    mechanism:
      "序言把本科读者、离散数学先决条件、四部分路径、思维导图和扩展阅读组成学习合同；第二版新增本体、投票、拍卖、议价、联盟和论证，不能用第一版目录替代。",
    formula:
      "learning_contract = audience × prerequisites × edition × evidence",
    fault: "把现代大模型代理的术语倒灌为2009年教材的原始定义",
    scenario: "为具有编程基础但未学博弈论的读者安排第二版学习路线",
    practice: "能写出版次、先决知识、跳读依赖和补证计划",
    practiceMode: "design",
    stages: ["确认版次", "盘点先决", "选择路径", "绑定案例", "设置复核"],
    focuses: ["第二版", "读者基础", "四部分", "新增主题", "证据边界"],
    boundary:
      "读者若不能手算集合、概率和简单效用，应先补离散数学再进入决策章节。",
    source: "slides",
  },
  "mas-part-01-setting-scene": {
    summary:
      "先说明多智能体系统解决什么问题、如何看待自治，以及何时不该使用代理抽象。",
    mechanism:
      "第一部分把自治计算、软件工程范式与社会模拟三种视角并列，要求从环境、控制权和交互依赖证明代理建模有必要。",
    formula: "agent_fit = autonomy + situated_action + interaction_dependence",
    fault: "把普通对象重命名为代理，却没有独立目标、局部观察或行为控制权",
    scenario: "判断一组微服务是否真的构成多智能体系统",
    practice: "能为采用和拒绝代理方案分别给出可观察证据",
    practiceMode: "design",
    stages: ["界定环境", "识别自治", "列出交互", "比较对象", "决定建模"],
    focuses: ["自治", "环境", "目标", "依赖", "适用性"],
    boundary:
      "若组件行为完全由中央程序决定且没有局部选择，代理抽象通常只增加术语。",
    source: "slides",
  },
  "mas-01-introduction": {
    summary: "从自治组件的交互愿景出发，比较工程范式、社会建模与常见误解。",
    mechanism:
      "引言把代理视为在环境中感知并自主行动的计算实体；多智能体性质来自多个目标、局部信息和相互影响，不能由单个代理成功率代表。",
    formula: "joint_outcome = transition(state, joint_action, environment)",
    fault: "只测每个代理单独完成任务，不记录联合状态和相互干扰",
    scenario: "两个配送代理共享道路、充电点和时间窗时定义联合任务",
    practice: "能画出参与者、观察、行动、资源和联合结果",
    practiceMode: "simulation",
    stages: ["定义代理", "描述环境", "列出观察", "组合行动", "评价结果"],
    focuses: ["自治实体", "局部信息", "联合行动", "社会视角", "常见误解"],
    boundary:
      "若没有相互影响的联合行动，问题可拆成独立任务，不必使用多智能体机制。",
    source: "slides",
  },
  "mas-part-02-intelligent-autonomous-agents": {
    summary:
      "依次比较抽象代理、演绎推理、实践推理、反应式与混合架构的适用边界。",
    mechanism:
      "第二部分以同一环境合同比较不同控制架构：符号推理提供可解释计划，反应规则提供低延迟响应，混合架构必须声明层间仲裁。",
    formula:
      "architecture_fit = decision_quality + response_speed - coordination_cost",
    fault: "为同时拥有推理与反应层就宣称混合架构可靠，却没有冲突优先级",
    scenario: "为移动机器人同时处理长期任务、局部避障和故障停机",
    practice: "能在相同轨迹上比较四类架构并定位仲裁失败",
    practiceMode: "design",
    stages: ["环境合同", "架构候选", "决策轨迹", "冲突仲裁", "性质复核"],
    focuses: ["抽象架构", "演绎推理", "BDI", "反应层", "混合仲裁"],
    boundary: "复杂架构只有在新增层改善可测性质且冲突可解释时才值得保留。",
    source: "slides",
  },
  "mas-02-intelligent-agents": {
    summary:
      "区分代理、对象与专家系统，并用感知、状态、目标和行动函数描述抽象架构。",
    mechanism:
      "智能代理拥有对自身行为的控制，并在局部观察下选择行动；意向立场可帮助解释目标与信念，但工程实现仍需明确状态转移和选择函数。",
    formula: "action_t = choose(observation_t, internal_state_t, goal)",
    fault: "用‘想要’和‘相信’解释行为，却没有可执行的状态或选择规则",
    scenario: "把恒温器、对象服务、专家系统和自主机器人放入同一判定表",
    practice: "能从轨迹判断一个组件是否满足自治代理合同",
    practiceMode: "diagnosis",
    stages: ["接收感知", "更新状态", "解释目标", "选择行动", "观察后果"],
    focuses: ["代理与对象", "专家系统", "意向系统", "抽象架构", "任务指令"],
    boundary: "高层意向词不能替代实现语义，必须能落到输入、状态与行动。",
    source: "slides",
  },
  "mas-03-deductive-reasoning-agents": {
    summary:
      "把环境事实、目标与动作规则编码为可证明条件，并检查推理与行动的时效差。",
    mechanism:
      "演绎代理从符号状态和逻辑规则推出可执行行动；定理证明提供可解释性，但不完备信息、计算成本和环境变化会让证明结果过期。",
    formula: "execute(a) only_if beliefs ⊢ precondition(a)",
    fault: "证明完成后环境已经改变，代理仍执行基于旧信念的行动",
    scenario: "仓库代理根据库存、通道与安全规则证明一次搬运动作合法",
    practice: "能给出规则、推导、反模型和执行前再验证",
    practiceMode: "simulation",
    stages: ["编码信念", "提出目标", "搜索证明", "选择动作", "执行复核"],
    focuses: ["定理证明", "规则库", "不完备性", "时效", "反模型"],
    boundary: "无法在行动截止前完成推理时，应采用受限规则或反应层。",
    source: "slides",
  },
  "mas-04-practical-reasoning-agents": {
    summary:
      "把审议选目标与手段—目的推理选计划分开，并验证 BDI 承诺重考虑策略。",
    mechanism:
      "实践推理代理在信念、愿望与意图之间建立约束：审议决定承诺什么，规划决定如何实现，重考虑策略决定何时放弃过期意图。",
    formula:
      "intention = feasible(desire, belief) ∧ committed_until(reconsider)",
    fault: "环境已让计划不可行，代理仍因过度承诺继续执行",
    scenario: "配送代理在新订单、道路封闭与已有承诺之间重新规划",
    practice: "能模拟审议、规划、执行和重考虑的完整 BDI 循环",
    practiceMode: "simulation",
    stages: ["更新信念", "审议愿望", "承诺意图", "生成计划", "重考虑"],
    focuses: ["审议", "手段目的", "BDI", "承诺", "PRS"],
    boundary: "重考虑太频繁导致抖动，太少导致僵化；策略必须由环境变化率验证。",
    source: "slides",
  },
  "mas-05-reactive-hybrid-agents": {
    summary:
      "比较包容式、情境自动机与多层混合架构的响应速度、状态表达和冲突处理。",
    mechanism:
      "反应式代理用感知—动作耦合避免昂贵世界模型；混合代理叠加规划层获得长期目标，但必须解决层间信息与控制冲突。",
    formula: "hybrid_action = arbitrate(reactive, deliberative, safety)",
    fault: "规划层要求前进而安全层要求停车，仲裁器没有确定优先级",
    scenario: "机器人在动态走廊中同时避障、追踪路线并遵守安全区",
    practice: "能注入层间冲突并证明安全层优先且系统可恢复",
    practiceMode: "simulation",
    stages: ["读取环境", "触发反应", "更新计划", "层间仲裁", "执行回放"],
    focuses: ["包容架构", "情境自动机", "反应限制", "混合分层", "仲裁"],
    boundary: "当层间协议比任务本身更复杂时，应减少层级或重新分配职责。",
    source: "slides",
  },
  "mas-part-03-communication-cooperation": {
    summary: "从共享语义、言语行为、任务协作、工程方法到应用验证构建合作链。",
    mechanism:
      "第三部分先解决词义和消息语义，再讨论任务分配与协调，最后用方法论和应用判断代理方案是否可实现；通信存在不等于互相理解。",
    formula:
      "cooperation = shared_semantics × valid_protocol × aligned_commitment",
    fault: "消息格式解析成功，却因本体版本不同对同一资源产生相反理解",
    scenario: "三个组织的代理协商联合任务，但使用不同数据模型和权限",
    practice: "能沿语义、消息、承诺、任务与结果定位合作断点",
    practiceMode: "design",
    stages: ["对齐语义", "发送消息", "形成承诺", "分配任务", "核对结果"],
    focuses: ["本体", "ACL", "任务共享", "协调", "应用验证"],
    boundary: "没有共享语义和失败协议时，增加消息只会放大不一致。",
    source: "fipa",
  },
  "mas-06-understanding-each-other": {
    summary:
      "用概念、关系、公理和版本标识建立共享本体，并检查 RDF/OWL 表达边界。",
    mechanism:
      "本体把领域词汇的类、属性、关系和约束显式化；RDF 提供图数据模型，OWL 增加可推理语义，但开放世界假设不等于数据库完整性约束。",
    formula: "shared_meaning = vocabulary + axioms + version_alignment",
    fault: "接收方把未声明事实当作假，把开放世界语义误当闭世界校验",
    scenario: "两个医疗调度代理交换设备能力和占用状态",
    practice: "能构造最小本体、识别推理结果并诊断版本冲突",
    practiceMode: "diagnosis",
    stages: ["抽取概念", "定义关系", "写入公理", "交换实例", "检查推理"],
    focuses: ["本体构件", "OWL", "KIF", "RDF", "版本对齐"],
    boundary: "需要封闭校验时应增加形状或应用约束，不能假装 OWL 自动补齐。",
    source: "owl",
  },
  "mas-07-communicating": {
    summary:
      "把消息视为带意图和前后条件的行动，比较言语行为、KQML、FIPA ACL 与 JADE。",
    mechanism:
      "代理通信语言不仅定义字段，还定义 communicative act 的意图、可行前置条件和期望效果；互操作需要会话协议、内容语言与本体同时兼容。",
    formula:
      "message_effect = performative × content × context × protocol_state",
    fault: "接收方识别 INFORM 字段，却在错误会话状态接受了过期内容",
    scenario: "买方代理发起请求、接收提案、确认并处理超时",
    practice: "能执行消息状态机并拒绝非法顺序、重复消息和本体错配",
    practiceMode: "simulation",
    stages: ["形成意图", "编码消息", "路由传输", "解释语义", "更新承诺"],
    focuses: ["言语行为", "KQML", "FIPA ACL", "会话状态", "JADE"],
    boundary: "语法兼容不代表语义兼容，协议状态和本体版本必须共同验证。",
    source: "fipa",
  },
  "mas-08-working-together": {
    summary: "通过任务共享、结果共享、合同网、联合意图与社会规范协调合作。",
    mechanism:
      "合作问题先分解任务，再分配能力与资源，并通过结果共享修正全局状态；联合意图要求成员对共同目标和失败通知承担持续承诺。",
    formula:
      "team_success = task_coverage × coordination × failure_notification",
    fault: "一个成员私下放弃任务，其他成员仍基于旧承诺等待",
    scenario: "搜索队伍分区、共享发现、重分配失联成员的任务",
    practice: "能模拟合同网与联合意图并验证失败通知和重新分配",
    practiceMode: "simulation",
    stages: ["分解任务", "公告竞标", "授予承诺", "共享结果", "协调恢复"],
    focuses: ["合同网", "结果共享", "不一致", "联合意图", "社会规范"],
    boundary: "任务依赖无法通过局部消息表达时，需要显式联合计划或中央协调。",
    source: "fipa",
  },
  "mas-09-methodologies": {
    summary:
      "从适用性判断到 Gaia、Tropos、Prometheus 与 Agent UML，保持目标、角色和协议可追踪。",
    mechanism:
      "代理方法论把利益相关者目标转为角色、交互协议、组织规则和具体代理；不同方法强调不同产物，必须以端到端追踪而非图数量评价。",
    formula: "traceability = goal ↔ role ↔ interaction ↔ agent ↔ test",
    fault: "角色图与最终代码脱节，协议变化没有回写目标和测试",
    scenario: "为应急响应系统从组织目标推导代理、角色和会话协议",
    practice: "能用一条需求贯穿分析模型、设计模型和验收轨迹",
    practiceMode: "design",
    stages: ["判断适用", "分析目标", "定义角色", "设计协议", "映射实现"],
    focuses: ["AAII", "Gaia", "Tropos", "Prometheus", "开发陷阱"],
    boundary: "若组织结构简单且自治不明显，普通领域建模可能比代理方法更清晰。",
    source: "slides",
  },
  "mas-10-applications": {
    summary:
      "用自治、分布、开放性和交互强度检验工作流、传感、检索、商务与仿真应用。",
    mechanism:
      "应用章不是案例清单，而是适用性测试：代理方案应处理局部控制、异构信息、动态成员或策略互动，并与中央或对象方案比较。",
    formula:
      "application_value = autonomy_gain + adaptation - coordination_overhead",
    fault: "把任何分布式系统称为代理应用，却没有自治决策和策略交互",
    scenario: "比较航空管制、电子商务和社会仿真的代理建模收益",
    practice: "能为真实应用建立基线并测量代理化的新增收益与成本",
    practiceMode: "design",
    stages: ["选择应用", "建立基线", "识别自治", "实现交互", "比较结果"],
    focuses: ["工作流", "分布感知", "信息检索", "电子商务", "社会仿真"],
    boundary: "协调开销超过适应收益时，应保留更简单的集中式方案。",
    source: "aamas",
  },
  "mas-part-04-multiagent-decision-making": {
    summary: "用效用、社会选择、联盟、拍卖、议价、论证与逻辑逐层分析集体决策。",
    mechanism:
      "第四部分固定参与者、信息、行动、偏好与机制，再分别研究稳定、效率、公平、激励和可证明性；这些性质不能互相替代。",
    formula: "mechanism_result = rule(types, reports, joint_actions)",
    fault: "看到总福利最高就宣称机制公平、稳定且不可操纵",
    scenario: "多个自利代理竞争资源并需要形成可解释的集体结果",
    practice: "能手算最小实例并分别判断稳定、效率、公平和激励",
    practiceMode: "calculation",
    stages: ["冻结参与者", "声明偏好", "运行机制", "计算结果", "检查性质"],
    focuses: ["效用", "社会选择", "联盟", "机制设计", "逻辑性质"],
    boundary: "任何性质都必须绑定精确定义和前提，不能由单次仿真结果推断。",
    source: "slides",
  },
  "mas-11-multiagent-interactions": {
    summary: "从效用和偏好计算最佳响应、占优、纳什均衡、帕累托效率与社会福利。",
    mechanism:
      "博弈模型枚举参与者、行动和收益；纳什均衡只排除单方有利偏离，帕累托效率排除不伤害任何人的改进，社会福利则聚合个体效用。",
    formula: "Nash(a*) iff every_i: u_i(a*) >= u_i(a_i, a_-i*)",
    fault: "把高社会福利结果误称为纳什均衡，未检查单方偏离",
    scenario: "手算双人两行动囚徒困境并改变一次重复博弈贴现",
    practice: "能逐格标记最佳响应并区分均衡、效率和福利",
    practiceMode: "calculation",
    stages: ["列行动集", "填写收益", "标最佳响应", "找均衡", "比较效率"],
    focuses: ["效用偏好", "占优策略", "纳什均衡", "帕累托", "社会福利"],
    boundary: "均衡不保证合作或公平；没有重复和未来价值时不能凭愿望支持合作。",
    source: "slides",
  },
  "mas-12-making-group-decisions": {
    summary:
      "比较 plurality、序贯多数、Borda 与 Slater，并检查 Arrow 条件和策略操纵。",
    mechanism:
      "群体决策从每名代理的完整排序生成集体选择或排序；不同投票程序聚合信息不同，议程、平票规则和虚假报告会改变结果。",
    formula: "Borda(x) = sum_i (m - rank_i(x))",
    fault: "只保存第一选择，导致无法重算 Borda 或识别策略投票",
    scenario: "三名代理对三个方案排序，比较四种投票规则与议程变化",
    practice: "能手算得分、改变一张选票并判断结果是否可操纵",
    practiceMode: "calculation",
    stages: ["收集排序", "选择规则", "计算得分", "处理平票", "测试操纵"],
    focuses: ["社会选择", "plurality", "Borda", "Arrow", "策略操纵"],
    boundary: "没有同时满足全部理想性质的通用规则，必须公开取舍和议程。",
    source: "slides",
  },
  "mas-13-forming-coalitions": {
    summary: "用特征函数、核心、Shapley 值和紧凑表示分析联盟收益与分配稳定性。",
    mechanism:
      "合作博弈为每个联盟赋值；核心要求任何联盟都无脱离收益，Shapley 值按所有加入顺序平均边际贡献，二者回答稳定与公平的不同问题。",
    formula: "Shapley_i = average_permutations marginal_contribution_i",
    fault: "联盟总收益足够，却因分配让子联盟更愿意脱离",
    scenario: "三名运输代理共享路线，枚举八个联盟价值并分配节省",
    practice: "能手算核心约束和六种加入顺序的边际贡献",
    practiceMode: "calculation",
    stages: ["定义联盟值", "枚举结构", "检查核心", "计算贡献", "比较分配"],
    focuses: ["合作博弈", "核心", "Shapley值", "紧凑表示", "联盟结构"],
    boundary: "公平分配可能不在核心，稳定分配也可能不满足选定公平公理。",
    source: "slides",
  },
  "mas-14-allocating-scarce-resources": {
    summary: "比较单物品与组合拍卖、出价语言、赢家确定和 VCG 支付的激励边界。",
    mechanism:
      "拍卖把真实估值、公开出价、分配规则和支付规则分开；英语、荷兰、第一价格、Vickrey 与 VCG 的策略性质依赖信息和独立估值等前提。",
    formula: "utility_i = value_i(allocation_i) - payment_i",
    fault: "用出价代替真实估值评估福利，掩盖投机或串谋",
    scenario: "三名竞标者竞争两个互补资源，比较独立与组合出价",
    practice: "能手算赢家、支付、效用并注入一次虚假出价",
    practiceMode: "calculation",
    stages: ["声明估值", "选择拍卖", "提交出价", "确定赢家", "计算支付"],
    focuses: ["单物品拍卖", "组合出价", "赢家确定", "VCG", "串谋"],
    boundary: "激励相容结论离不开机制和估值前提，真实平台还需检查预算与串谋。",
    source: "slides",
  },
  "mas-15-bargaining": {
    summary: "用保留值、截止期、贴现与让步策略分析轮流出价和任务分配议价。",
    mechanism:
      "议价协议定义谁何时提出什么；策略根据效用、时间压力和对手模型选择接受或让步，欺骗可能短期获利却改变可验证性和长期互动。",
    formula: "discounted_utility_i(t) = delta_i^t × utility_i(offer)",
    fault: "比较报价金额却忽略双方贴现率和拒绝后的外部选项",
    scenario: "两名代理对资源份额轮流出价，分别设置耐心与急迫玩家",
    practice: "能手算报价路径、接受阈值和一次欺骗的后果",
    practiceMode: "calculation",
    stages: ["声明保留值", "设置时限", "生成报价", "接受拒绝", "更新策略"],
    focuses: ["议价参数", "轮流出价", "让步协议", "Zeuthen", "欺骗"],
    boundary: "对手模型不可靠时，精细策略可能比简单可解释规则更脆弱。",
    source: "slides",
  },
  "mas-16-arguing": {
    summary: "从攻击图的可接受性到带偏好、价值、演绎论证与对话协议的决策。",
    mechanism:
      "抽象论证只保留论证及攻击关系，再用语义计算可接受集合；偏好和值改变攻击胜负，对话系统还约束谁能在何时提出何种移动。",
    formula: "admissible(S) iff conflict_free(S) and S defends every member",
    fault: "把图上没有入边的论证直接判真，忽略语义与证据内容",
    scenario: "围绕资源分配建立四个论证的攻击图并比较 preferred extensions",
    practice: "能枚举冲突自由、可接受扩展并解释可信与怀疑接受",
    practiceMode: "calculation",
    stages: ["构造论证", "添加攻击", "应用语义", "加入偏好", "执行对话"],
    focuses: ["论证类型", "攻击图", "preferred扩展", "价值偏好", "对话系统"],
    boundary: "形式可接受不等于事实正确，前提来源和领域验证仍需独立检查。",
    source: "slides",
  },
  "mas-17-logical-foundations": {
    summary: "用可能世界、可达关系和模态算子刻画知识、信念、意图、合作与验证。",
    mechanism:
      "认知逻辑在可能世界模型上解释 K_i；共同知识需要任意有限互相知道链，分布知识聚合群体信息。意图与合作逻辑增加时间、行动和承诺结构。",
    formula: "M,w satisfies K_i(phi) iff every v with wR_i v satisfies phi",
    fault: "把分布知识误写成每个成员都知道，或假设代理逻辑全知而不披露",
    scenario: "三名代理只看到局部卡片，判断个体、共同与分布知识",
    practice: "能画可能世界模型并逐世界计算模态公式真假",
    practiceMode: "calculation",
    stages: ["列可能世界", "画可达关系", "解释模态", "加入群体", "验证性质"],
    focuses: ["知识信念", "可能世界", "逻辑全知", "共同知识", "规范验证"],
    boundary:
      "形式证明只对给定模型成立；模型遗漏环境行为时，证明不能保证实现。",
    source: "slides",
  },
  "mas-coda": {
    summary: "把代理架构、通信、合作与决策重新连成一套端到端研究问题。",
    mechanism:
      "Coda 不增加孤立术语，而是要求读者从单体自治走向多体交互，再回到形式性质和工程证据，识别仍未解决的假设。",
    formula: "system_claim = model × mechanism × implementation × evidence",
    fault: "各章模型单独成立，却无法在同一系统中保持一致假设",
    scenario: "复盘一个从感知代理扩展到拍卖协作的完整系统",
    practice: "能指出跨章假设冲突并给出下一步实验",
    practiceMode: "diagnosis",
    stages: ["回看自治", "连接通信", "检查协作", "复核机制", "提出问题"],
    focuses: ["架构", "语义", "合作", "集体决策", "研究边界"],
    boundary: "跨章对象、时间或信息模型不一致时，应停止综合并回到共同基线。",
    source: "slides",
  },
  "mas-appendix-a-history-lesson": {
    summary: "用历史脉络区分周期性愿景、实际成果与反复出现的工程限制。",
    mechanism:
      "历史附录把分布式 AI、智能代理和多智能体研究放入时间线；每次热潮都应分别记录计算条件、评价方法和未兑现承诺。",
    formula:
      "historical_claim = contemporary_source + context + counterevidence",
    fault: "用今天成功的系统回写早期研究者当时并未拥有的能力",
    scenario: "比较两个时期关于自治协作的愿景与可运行证据",
    practice: "能区分同期材料、后见解释和仍可迁移的研究问题",
    practiceMode: "diagnosis",
    stages: ["定位时期", "记录愿景", "检查条件", "寻找结果", "比较迁移"],
    focuses: ["分布式AI", "代理浪潮", "计算条件", "评价证据", "后见偏差"],
    boundary: "没有同期材料支持的因果结论应降级为解释假设。",
    source: "aamas",
  },
  "mas-appendix-b-afterword": {
    summary: "把后记中的领域判断与课程结论分开，记录作者视角、版本与后续变化。",
    mechanism:
      "后记提供作者对领域位置和读者下一步的观点；它可以生成研究问题，但不能替代定义、定理或实证结果。",
    formula:
      "usable_afterword = perspective + dated_context + follow_up_question",
    fault: "把作者的展望句当成已经验证的技术性质",
    scenario: "从后记提取一项可证伪的研究问题并设计复核",
    practice: "能标出观点、事实、时间和后续证据的不同层级",
    practiceMode: "design",
    stages: ["识别观点", "绑定日期", "拆出主张", "查找证据", "形成问题"],
    focuses: ["作者视角", "时代语境", "事实主张", "研究问题", "后续证据"],
    boundary: "观点没有明确可观察后果时，只保留为阅读背景。",
    source: "slides",
  },
};

const SPECIAL_DESIGNS = {
  map: {
    summary: "把25个正式单元、197个目录节点和四部分路径组织成可执行学习图。",
    mechanism:
      "学习地图从场景判断进入单体架构，再通过语义与合作到集体决策；每个节点只有同时具备解释、联合状态视觉、实践和答案证据才完成。",
    formula: "coverage = verified_nodes / 197",
    fault: "只列出章节标题，却无法定位联合状态、计算或故障验证",
    scenario: "为完整第二版课程安排先决关系、计算练习和回退点",
    practice: "能从任一目录节点定位机制、实验与复核答案",
    practiceMode: "design",
    stages: ["场景判断", "自治架构", "通信合作", "集体决策", "全书复核"],
    focuses: ["25个单元", "197个节点", "四部分", "联合证据", "发布门禁"],
    boundary: "目录词出现不等于理解；缺少联合轨迹或练习时覆盖仍记为零。",
    source: "author",
  },
  review: {
    summary: "以一个资源协调系统贯穿自治、语义、合作、机制、逻辑和发布复盘。",
    mechanism:
      "总复习固定同一批参与者、局部信息、目标、协议和资源，从单体控制推进到拍卖或议价，再用逻辑性质与故障轨迹裁决结果。",
    formula:
      "release = model × interaction × mechanism × verification × rollback",
    fault: "架构、通信和博弈章节各自使用不同参与者与效用，结果无法拼接",
    scenario: "设计三个自主代理共享稀缺资源并处理消息丢失与策略偏离",
    practice: "能重放端到端联合轨迹并定位第一个模型断点",
    practiceMode: "diagnosis",
    stages: ["冻结模型", "运行交互", "执行机制", "验证性质", "回退复盘"],
    focuses: ["参与者", "信息", "协议", "效用", "联合轨迹"],
    boundary: "任一阶段无法使用同一输入和版本重放时，全书复习不得通过。",
    source: "aamas",
  },
};

function walkMdx(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walkMdx(entryPath));
    else if (entry.name.endsWith(".mdx")) files.push(entryPath);
  }
  return files.sort();
}

function pascal(value) {
  return value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("");
}

function conceptKind(concept) {
  if (/Ontology|OWL|RDF|KIF/i.test(concept)) return "语义模型";
  if (/Speech|Communicat|KQML|FIPA|JADE|Protocol/i.test(concept))
    return "通信协议";
  if (/Nash|Pareto|Utilit|Strateg|Welfare|Dilemma|Equilibr/i.test(concept))
    return "博弈性质";
  if (/Voting|Borda|Arrow|Plurality|Slater|Social Choice/i.test(concept))
    return "社会选择";
  if (/Coalition|Core|Shapley|Voting Games|Network Flow/i.test(concept))
    return "联盟计算";
  if (/Auction|Bid|Vickrey|VCG|Adwords|Revenue/i.test(concept))
    return "拍卖机制";
  if (/Bargain|Negotiat|Concession|Zeuthen|Deception/i.test(concept))
    return "议价策略";
  if (/Argument|Extension|Dialogue|Credulous|Sceptical/i.test(concept))
    return "论证语义";
  if (/Logic|Knowledge|Belief|World|Axiom|Verification/i.test(concept))
    return "逻辑性质";
  if (
    /Agent|Architecture|Reasoning|Reactive|Hybrid|PRS|PENGI|InteRRaP/i.test(
      concept,
    )
  )
    return "代理架构";
  if (/Methodolog|Gaia|Tropos|Prometheus|UML|Application/i.test(concept))
    return "工程方法";
  return "目录坐标";
}

function conceptParagraph(concept, profile, index) {
  const design = profile.design;
  const focus = design.focuses[index % design.focuses.length];
  if (profile.chapterSlug === "mas-official-learning-map") {
    return `学习地图把“${concept}”放进先建模、再交互、后验证的路径：学习者先写出该单元改变的参与者与信息，再选择${focus}作为观察点，最后用“${design.fault}”检查跨单元迁移是否失真。这里的节点是导航合同，不冒充原书正文，也不以浏览顺序替代掌握证据。`;
  }
  if (profile.chapterSlug === "mas-official-final-review") {
    return `总复习把“${concept}”当作一次闭卷重建任务：先从空白状态写出局部观察、允许行动与联合转移，再围绕${focus}运行信息不全和策略偏离两组反例；若触发“${design.fault}”，必须定位首个分叉并说明回退条件。`;
  }
  const kind = conceptKind(concept);
  const explanations = {
    语义模型: `“${concept}”规定代理共享概念或图模型的语义，必须区分可推导事实、未知事实与应用校验。`,
    通信协议: `“${concept}”描述消息行为或会话规则，字段可解析不代表意图、上下文和状态都有效。`,
    博弈性质: `“${concept}”是需要从行动与收益表计算的博弈性质，不能由总收益或一次轨迹目测。`,
    社会选择: `“${concept}”聚合个体偏好，必须保留完整排序、议程与平票规则后才能重算。`,
    联盟计算: `“${concept}”连接联盟价值、稳定或贡献分配，需要枚举最小实例并检查脱离动机。`,
    拍卖机制: `“${concept}”同时涉及估值、出价、分配与支付，四者混写会让激励结论失真。`,
    议价策略: `“${concept}”作用于报价时序、保留值或让步，时间偏好和外部选项必须显式。`,
    论证语义: `“${concept}”从攻击关系计算可接受性，形式扩展与论证前提的事实可信度应分层记录。`,
    逻辑性质: `“${concept}”在可能世界或形式模型上定义真假，模型假设必须与实现状态逐项对应。`,
    代理架构: `“${concept}”决定感知、内部状态、目标与行动怎样连接，应在相同环境轨迹上比较。`,
    工程方法: `“${concept}”提供工程产物或应用坐标，价值要用目标到实现和测试的追踪证明。`,
    目录坐标: `“${concept}”细化本单元的正式问题，需要映射到参与者、信息、行动、结果和失败边界。`,
  };
  return `${explanations[kind]} 在“${design.mechanism}”这条联合因果链中，本节点重点检查${focus}；只改变一个条件并保存联合轨迹，若出现“${design.fault}”，就在首个分叉停止。`;
}

function termsFor(profile) {
  return [...new Set([profile.title, ...profile.design.focuses])].slice(0, 6);
}

function interventionsFor(profile) {
  const [a, b, c, d, e] = profile.design.focuses;
  return [
    {
      label: `公开${a}`,
      detail: `让所有评审者看到${a}的定义，保持${b}和${c}不变。`,
      instabilityDelta: -14,
      welfareDelta: 8,
      traceDelta: 12,
    },
    {
      label: `校验${c}`,
      detail: `在${c}进入联合状态前检查输入、版本和允许范围。`,
      instabilityDelta: -9,
      welfareDelta: 12,
      traceDelta: 16,
    },
    {
      label: `绕过${d}`,
      detail: `跳过${d}直接追求${e}，观察局部收益怎样破坏联合性质。`,
      instabilityDelta: 20,
      welfareDelta: -16,
      traceDelta: -18,
    },
  ];
}

function wrapperSource(profile) {
  const base = pascal(profile.chapterSlug);
  const shared = {
    unitId: profile.chapterSlug,
    title: profile.title,
    question: profile.design.scenario,
    actors: [
      `${profile.design.focuses[0]}代理`,
      `${profile.design.focuses[1]}代理`,
      "共享环境 / 机制",
    ],
    stages: profile.design.stages,
    concepts: profile.concepts.length
      ? profile.concepts
      : profile.design.focuses,
    interventions: interventionsFor(profile),
    metricLabels: [
      `${profile.design.focuses[0]}不稳定度`,
      `${profile.design.focuses[2]}联合收益`,
      `${profile.design.focuses[4]}可追踪度`,
    ],
    partialNote: profile.design.boundary,
    strategicNote: `拒绝原因：${profile.design.fault}。`,
  };
  const modes = [
    ["Model", "model", [40, 68, 66]],
    ["Interaction", "interaction", [44, 64, 60]],
    ["Evidence", "evidence", [34, 72, 74]],
  ];
  return `import { AgentOutcomeLab } from "./agent-outcome-lab";\n\nconst shared = ${JSON.stringify(shared, null, 2)} as const;\n\n${modes
    .map(
      ([suffix, mode, baseline]) =>
        `export function ${base}${suffix}Lab() {\n  return <AgentOutcomeLab {...shared} mode=${JSON.stringify(mode)} baseline={${JSON.stringify(baseline)}} />;\n}`,
    )
    .join("\n\n")}\n`;
}

function renderTerms(profile) {
  const terms = termsFor(profile);
  return {
    inline: terms
      .map(
        (term, index) =>
          `<Term def={${JSON.stringify(`${term}在${profile.title}中对应${profile.design.stages[index % profile.design.stages.length]}的可复核变量。`)}}>${term}</Term>`,
      )
      .join("、\n"),
    glossary: terms
      .map(
        (term, index) =>
          `<GlossaryItem term=${JSON.stringify(term)}>${profile.design.focuses[index % profile.design.focuses.length]}的联合状态检查入口。</GlossaryItem>`,
      )
      .join("\n"),
  };
}

function renderChapter(profile, previous, next) {
  const base = pascal(profile.chapterSlug);
  const terms = renderTerms(profile);
  const fact = FACT_SOURCES[profile.design.source] ?? FACT_SOURCES.slides;
  const conceptSections = profile.concepts
    .map(
      (concept, index) =>
        `### ${concept}\n\n${conceptParagraph(concept, profile, index)}`,
    )
    .join("\n\n");
  const codaDepth =
    profile.chapterSlug === "mas-coda"
      ? `\n\n## Coda 的开放边界：从模型到责任\n\nCoda 不再引入一套新算法，而是追问前面各章的模型在离开课堂例题后是否仍可问责。部署者需要把环境假设、参与者能力、消息权限、收益口径和终止条件写成可检查的运行合同；如果这些条件随场景变化，稳定性或理性结论也必须随之降级，不能把离线推导直接包装成生产保证。\n\n跨章节迁移时，至少保留三类证据。第一类是模型证据：每个状态、行动和效用变量都能追溯到观测或明确假设。第二类是交互证据：信息延迟、通信失败、策略偏离和参与者加入退出都有可重放轨迹。第三类是治理证据：谁能修改协议、谁承担失败成本、谁有权停止系统都要在运行前确定。三类证据缺一，联合结果就只能算演示，不能算经过验证的多智能体方案。\n\n因此，本页的方案判断不是比较“代理数量越多越好”，而是比较边界内的可解释收益与边界外的风险。若单体控制器或集中式优化在相同约束下更容易验证，应优先采用更简单的结构；若确需分布式自主性，则必须给出局部决策为何不可集中、协调协议如何限制机会主义，以及故障发生时怎样安全退化。这个开放问题把全书的技术坐标重新连接到工程责任。`
      : "";
  const checklist = profile.concepts.length
    ? profile.concepts.join("；")
    : profile.design.focuses.join("；");
  const previousLink = previous
    ? `- [上一页：${previous.title}](/learn/${BOOK}/${previous.sectionSlug}/${previous.chapterSlug})`
    : "- 这是本书学习路径的起点。";
  const nextLink = next
    ? `- [下一页：${next.title}](/learn/${BOOK}/${next.sectionSlug}/${next.chapterSlug})`
    : "- 这是本书学习路径的终点。";
  return `---
title: ${JSON.stringify(profile.title)}
type: ${profile.type}
section: ${JSON.stringify(profile.section)}
order: ${profile.order}
description: ${JSON.stringify(profile.design.summary)}
demo: true
math: true
sourceUrl: ${JSON.stringify(OFFICIAL_CONTENTS)}
qualityVersion: 2
practiceMode: ${profile.design.practiceMode}
sourceMode: independent-rewrite
draft: false
---

import {
  ${base}ModelLab,
  ${base}InteractionLab,
  ${base}EvidenceLab,
} from "@/components/mdx/multiagent-systems/diagrams/${profile.chapterSlug}";
import {
  Objectives,
  Callout,
  Term,
  Glossary,
  GlossaryItem,
  Exercises,
  Answer,
  Stepper,
  Step,
  Attribution,
} from "@/components/mdx/mdx-components";

<Objectives>

- 能解释 ${profile.title} 如何回答“${profile.design.scenario}”
- 能沿 ${profile.design.stages.join(" → ")} 重建参与者、信息、行动和联合结果
- 能使用 ${profile.design.formula} 比较信息完整、信息不全与策略偏离
- ${profile.design.practice}

</Objectives>

## 为什么必须先冻结联合模型

${profile.design.summary} ${profile.design.mechanism} 本页不以单个代理“看起来聪明”为通过条件，而是检查联合状态、偏离动机、失败传播和可重放证据。

<Callout type="info" title="来源层级与独立重写">
  **${profile.title}** 由 [作者官网第二版完整目录](${OFFICIAL_CONTENTS}) 界定范围，并参考 [作者公开教学资源](${OFFICIAL_RESOURCES}) 与 [${fact.label}](${fact.url}) 核对技术坐标。未取得原书完整正文；本页不声称复现或翻译原书内容，解释、公式例题、联合状态图和练习均为独立教学重写。
</Callout>

## 直觉、对象与计算合同

贯穿场景是：**${profile.design.scenario}**。参与者、可观察信息、行动集、偏好或目标、环境转移、协议版本和终止条件必须在运行前固定，不能在看到结果后修改效用或阈值。

$$
${profile.design.formula}
$$

公式用于公开关系与前提，不替代正式证明或实证测量。${profile.design.boundary} 本页重点防范：**${profile.design.fault}**。

${terms.inline}

## 正式目录节点：解释与联合验证

下列目录节点逐项映射到解释、页面专属实验和章末答案。每个节点都必须指出它改变哪个联合状态以及什么观测会推翻结论；单纯出现术语不计覆盖。

${conceptSections}${codaDepth}

## 三视图实验：先写预期，再运行

<Callout type="info" title="实验协议">
  先预测信息不全或策略偏离会在哪一步首次改变联合状态，再选择一项干预。每次只改变一个条件，保存参与者局部观察、联合行动、结果与拒绝理由，最后重置到完全相同的基线。
</Callout>

<Stepper>
  <Step title="1. 联合状态模型">
    从 ${profile.design.stages[0]} 走到 ${profile.design.stages.at(-1)}，确认每名参与者的局部信息与环境状态不混写。
    <${base}ModelLab />
  </Step>
  <Step title="2. 策略交互">
    只改变 ${profile.design.focuses[1]} 或 ${profile.design.focuses[3]}，观察偏离是否改变稳定、福利和轨迹。
    <${base}InteractionLab />
  </Step>
  <Step title="3. 性质与证据">
    以“${profile.design.practice}”作为通过条件，信息不全要降级结论，策略偏离必须触发拒绝。
    <${base}EvidenceLab />
  </Step>
</Stepper>

## 常见误区

<Callout type="trap" title="联合性质不能由单体指标代替">
  ${profile.title} 的典型失败是“${profile.design.fault}”。修复时从 ${profile.design.stages[0]} 重放到首个分叉，不能只调最终分数让曲线接近预期。
</Callout>

## 术语

<Glossary>
${terms.glossary}
</Glossary>

## 练习与答案

<Exercises>

1. **问题 1：目录证据复核。** 从本页选择三个相邻节点，说明它们如何改变参与者的局部状态和联合结果。

<Answer>
  正式复核清单是：${checklist}。为选中的每项写出参与者、可见信息、允许行动、联合转移和拒绝条件，再在三视图实验中保存一次信息完整轨迹。
</Answer>

2. **问题 2：故障诊断。** 在“${profile.design.scenario}”中注入“${profile.design.fault}”，第一处应在哪里拒绝？

<Answer>
  沿 ${profile.design.stages.join(" → ")} 顺序比较；当 ${profile.design.focuses[2]} 首次与预期不同就停止，保存各参与者观察和联合行动。修复后还要重放信息不全边界，不能只跑正常输入。
</Answer>

3. **问题 3：方案判断。** 何时应拒绝本页首选模型或机制？

<Answer>
  ${profile.design.boundary} 若替代方案更简单且能保留相同可观察性质，就记录迁移理由与回退路径，不因“代理”标签而维持复杂方案。
</Answer>

</Exercises>

## 本章小结

${profile.title} 通过 ${profile.design.stages.join("、")} 把 ${profile.design.focuses.join("、")} 连接为可计算、可反驳的联合证据链。最终验收是：${profile.design.practice}。

## 前后导航

${previousLink}
${nextLink}

<Attribution
  mode="independent-rewrite"
  sourceBasis="authorized-sample"
  workTitle=${JSON.stringify(WORK_TITLE)}
  adaptedUrl=${JSON.stringify(OFFICIAL_CONTENTS)}
/>
`;
}

function replaceBookManifest(document, bookSlug, value) {
  const key = `    ${JSON.stringify(bookSlug)}: `;
  const keyIndex = document.indexOf(key);
  if (keyIndex < 0) throw new Error(`manifest 未找到 ${bookSlug}`);
  const objectStart = document.indexOf("{", keyIndex + key.length);
  let depth = 0;
  let inString = false;
  let escaped = false;
  let objectEnd = -1;
  for (let index = objectStart; index < document.length; index += 1) {
    const character = document[index];
    if (inString) {
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === '"') inString = false;
      continue;
    }
    if (character === '"') inString = true;
    else if (character === "{") depth += 1;
    else if (character === "}") {
      depth -= 1;
      if (depth === 0) {
        objectEnd = index + 1;
        break;
      }
    }
  }
  if (objectEnd < 0) throw new Error(`manifest ${bookSlug} 对象未闭合`);
  const serialized = JSON.stringify(value, null, 2)
    .split("\n")
    .map((line, index) => (index === 0 ? line : `    ${line}`))
    .join("\n");
  return (
    document.slice(0, objectStart) + serialized + document.slice(objectEnd)
  );
}

const manifestDocument = fs.readFileSync(MANIFEST_PATH, "utf8");
const manifestRoot = JSON.parse(manifestDocument);
const manifest = manifestRoot.books[BOOK];
if (!manifest) throw new Error(`缺少 ${BOOK} manifest`);

const pageBySlug = new Map();
for (const filePath of walkMdx(BOOK_DIR)) {
  const parsed = matter(fs.readFileSync(filePath, "utf8"));
  const chapterSlug = path.basename(filePath, ".mdx");
  pageBySlug.set(chapterSlug, {
    filePath,
    relativePath: path.relative(ROOT, filePath).replaceAll(path.sep, "/"),
    sectionSlug: path.basename(path.dirname(filePath)),
    chapterSlug,
    title: String(parsed.data.title ?? chapterSlug),
    section: String(
      parsed.data.section ?? "An Introduction to MultiAgent Systems 2e",
    ),
    order: Number(parsed.data.order ?? 0),
    type: String(parsed.data.type ?? "B"),
  });
}

const profiles = [];
for (const unit of manifest.units) {
  const page = pageBySlug.get(unit.id);
  const design = DESIGNS[unit.id];
  if (!page || !design) throw new Error(`缺少页面或设计：${unit.id}`);
  profiles.push({
    ...page,
    title: unit.title,
    concepts: unit.concepts.map((alternatives) => alternatives[0]),
    conceptAlternatives: unit.concepts,
    design,
  });
}
for (const [chapterSlug, design] of [
  ["mas-official-learning-map", SPECIAL_DESIGNS.map],
  ["mas-official-final-review", SPECIAL_DESIGNS.review],
]) {
  const page = pageBySlug.get(chapterSlug);
  if (!page) throw new Error(`缺少页面：${chapterSlug}`);
  profiles.push({
    ...page,
    concepts: manifest.units.map((unit) => unit.title),
    conceptAlternatives: [],
    design,
  });
}
profiles.sort((a, b) => a.order - b.order);

fs.writeFileSync(
  PROFILE_PATH,
  `${JSON.stringify(
    {
      version: 2,
      bookSlug: BOOK,
      sourceMode: "independent-rewrite",
      sourceAccess: "authorized-sample",
      scope: { formalUnits: 25, outlineNodes: 197, pages: 27 },
      profiles: profiles.map(({ filePath: _filePath, ...profile }) => profile),
    },
    null,
    2,
  )}\n`,
);

for (const [index, profile] of profiles.entries()) {
  fs.writeFileSync(
    profile.filePath,
    renderChapter(
      profile,
      profiles[index - 1] ?? null,
      profiles[index + 1] ?? null,
    ),
  );
  fs.writeFileSync(
    path.join(COMPONENT_DIR, `${profile.chapterSlug}.tsx`),
    wrapperSource(profile),
  );
}

const chapterPaths = new Map(
  profiles.map((profile) => [
    profile.chapterSlug,
    `${profile.sectionSlug}/${profile.chapterSlug}`,
  ]),
);
const upgradedManifest = {
  ...manifest,
  version: 2,
  sourceKind:
    "author-official-second-edition-complete-toc-authorized-teaching-slides-and-publisher-metadata",
  sourceAccess: "authorized-sample",
  sourceMode: "independent-rewrite",
  sourceUrl: OFFICIAL_CONTENTS,
  secondarySourceUrls: [OFFICIAL_PAGE, OFFICIAL_RESOURCES],
  factSources: FACT_SOURCES,
  coverage: { formalUnits: 25, outlineNodes: 197, pages: 27 },
  disclosureNote:
    "作者官网完整目录界定Preface、四部分、17章、Coda和两篇附录共25个正式单元与197个层级节点；作者公开第二版教学资源用于合法可见范围内的概念核对。未取得原书完整正文，课程不宣称复现或翻译原书：中文解释、公式例题、联合状态实验与练习均独立重写，并用FIPA、W3C与IFAAMAS资料补足标准和当代边界。",
  units: manifest.units.map((unit) => ({
    ...unit,
    chapterPath: chapterPaths.get(unit.id),
    factSourceIds: [...new Set(["author", "slides", DESIGNS[unit.id].source])],
  })),
};
fs.writeFileSync(
  MANIFEST_PATH,
  replaceBookManifest(manifestDocument, BOOK, upgradedManifest),
);

console.log(
  JSON.stringify({
    book: BOOK,
    pages: profiles.length,
    formalUnits: manifest.units.length,
    outlineNodes: manifest.units.reduce(
      (sum, unit) => sum + unit.concepts.length,
      0,
    ),
    profilePath: path.relative(ROOT, PROFILE_PATH),
  }),
);
