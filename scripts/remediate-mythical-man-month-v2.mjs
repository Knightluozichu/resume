#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const ROOT = process.cwd();
const BOOK = "mythical-man-month";
const BOOK_DIR = path.join(ROOT, "content", BOOK);
const COMPONENT_DIR = path.join(
  ROOT,
  "src/components/mdx/mythical-man-month/diagrams",
);
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/mythical-man-month-v2-profiles.json",
);

const PEARSON =
  "https://www.pearson.com/en-us/subject-catalog/p/Brooks-Mythical-Man-Month-The-Essays-on-Software-Engineering-Anniversary-Edition-2nd-Edition/P200000000149?view=educator";
const INFORMIT =
  "https://www.informit.com/store/mythical-man-month-essays-on-software-engineering-anniversary-9780201835953";
const TSINGHUA =
  "https://www.tup.tsinghua.edu.cn/booksCenter/bookpreface?id=05223704";
const CHINESE_CATALOG = "https://umlchina.com/book/man-month/content.htm";
const WORK_TITLE = "Frederick P. Brooks Jr., The Mythical Man-Month";

const FACT_SOURCES = {
  pearson: {
    label: "Pearson/Addison-Wesley 官方书目与目录",
    url: PEARSON,
  },
  informit: {
    label: "InformIT 官方样章与序言",
    url: INFORMIT,
  },
  tsinghua: {
    label: "清华大学出版社 40 周年中文版前言",
    url: TSINGHUA,
  },
  ibm: {
    label: "IBM System/360 官方历史档案",
    url: "https://www.ibm.com/history/system-360",
  },
  ieee: {
    label: "IEEE Computer《No Silver Bullet》论文记录",
    url: "https://doi.org/10.1109/MC.1987.1663532",
  },
  nasa: {
    label: "NASA Systems Engineering Handbook",
    url: "https://www.nasa.gov/reference/system-engineering-handbook-appendix/",
  },
  sre: {
    label: "Google SRE Release Engineering",
    url: "https://sre.google/sre-book/release-engineering/",
  },
};

function d(value) {
  return {
    practiceMode: "diagnosis",
    source: "pearson",
    ...value,
  };
}

const DESIGNS = {
  "tmm40-translator-preface": d({
    summary:
      "把译名、版次、增补材料与原版单元做成可追溯对照，避免把译者说明当作 Brooks 的原始命题。",
    scenario: "评审者核对中英文目录时发现同一术语在三个章节出现不同译法",
    formula: "trace = edition × unit × term × editorial_role",
    failure: "译者观点、出版社增补与作者正文被标成同一来源层级",
    practice: "能为一个争议译名建立版次、目录位置、角色和证据链",
    source: "tsinghua",
    focuses: ["版次", "译名", "目录位置", "编辑角色", "证据链"],
    phases: ["锁定版本", "对齐目录", "核对译名", "标注角色", "发布勘误"],
    boundary: "译名一致不代表概念等价，结论必须保留英文术语和上下文。",
  }),
  "tmm40-20th-anniversary-preface": d({
    summary:
      "区分 1995 年纪念版保留的旧文、加入的新文章和二十年后的自我复核，建立回顾性命题清单。",
    scenario: "课程维护者要说明纪念版新增内容怎样检验而非改写 1975 年命题",
    formula: "retrospective = original_claim + new_evidence + revised_judgment",
    failure: "把二十年后的评论倒灌成初版项目当时已经知道的事实",
    practice: "能给每项纪念版增补标注时间、命题和修订判断",
    source: "informit",
    focuses: ["初版命题", "新增文章", "时间证据", "修订判断", "保留边界"],
    phases: ["列出旧文", "识别增补", "冻结年代", "比较判断", "形成索引"],
    boundary: "回顾能够更新适用条件，却不能改变历史文本发生的年代。",
  }),
  "tmm40-first-edition-preface": d({
    summary:
      "把 OS/360 大型系统项目的历史边界、观察对象和写作目的固定下来，再判断哪些经验可以迁移。",
    scenario: "现代云团队准备直接套用 1960 年代大型系统项目的组织结论",
    formula: "transferability = shared_constraints / historical_differences",
    failure: "忽略硬件、工具、发布节奏和组织规模差异后宣布经验普适",
    practice: "能列出历史案例与当前项目至少五项相同和不同条件",
    source: "ibm",
    focuses: ["System/360", "OS/360", "项目规模", "历史条件", "迁移边界"],
    phases: ["确定年代", "识别系统", "列出约束", "比较现状", "限定结论"],
    boundary: "历史经验是待验证假设，不是脱离项目条件的管理定律。",
  }),
  "tmm40-01-tar-pit": d({
    summary:
      "比较程序、编程产品、编程系统和编程系统产品的工作边界，解释规模化为何增加接口与产品化成本。",
    scenario: "一个可运行原型被要求两周内变成多人维护、跨环境交付的产品",
    formula: "product_cost = program + generalization + integration + support",
    failure: "只计算编码工时，遗漏测试、文档、接口、运维和用户约束",
    practice: "能把原型到系统产品新增的责任逐项分配并估算",
    source: "ibm",
    focuses: ["程序", "产品化", "系统集成", "职业乐趣", "工程苦恼"],
    phases: ["运行原型", "明确用户", "组合系统", "产品加固", "交付维护"],
    boundary: "原型价值真实存在，但不能用原型完成度代替产品完成度。",
  }),
  "tmm40-02-man-month": d({
    summary:
      "拆开工作量、关键路径、沟通通道、培训和返工，计算延期项目增员为何可能先增加日历时间。",
    scenario: "已延期六周的项目准备在集成前把团队从 7 人扩到 14 人",
    formula: "recovery = parallel_gain - training - repartition - coordination",
    failure: "把人月当成可任意交换的人数与日历时间乘积",
    practiceMode: "calculation",
    practice: "能计算关键路径和沟通通道并提出可验证的恢复方案",
    source: "pearson",
    focuses: ["工作量", "关键路径", "沟通通道", "系统测试", "进度恢复"],
    phases: ["分解任务", "绘制依赖", "计算路径", "评估增员", "重排范围"],
    boundary: "只有真正独立且接口稳定的工作，增加人员才可能缩短日历时间。",
  }),
  "tmm40-03-surgical-team": d({
    summary:
      "把首席程序员团队视为职责和信息拓扑设计，比较决策一致性与单点瓶颈。",
    scenario: "12 人团队需要统一核心设计，同时维持并行实现与独立测试",
    formula: "team_flow = decision_clarity × role_fit / handoff_cost",
    failure: "把首席角色误作独裁职位，却没有编辑、测试、工具和替补职责",
    practiceMode: "design",
    practice: "能设计角色拓扑并演练首席成员不可用时的降级路径",
    source: "pearson",
    focuses: ["首席程序员", "副手", "编辑", "工具支持", "团队扩展"],
    phases: ["拆分责任", "指定决策权", "建立支援", "验证接口", "演练替补"],
    boundary: "角色集中可减少概念分叉，也可能形成吞吐和继任风险。",
  }),
  "tmm40-04-conceptual-integrity": d({
    summary:
      "用用户可见概念、设计规则和例外预算衡量概念完整性，连接架构权威与实现反馈。",
    scenario: "三个子团队分别为同一产品设计命名、导航和错误处理规则",
    formula: "integrity = coherent_concepts - exceptions - semantic_drift",
    failure: "用投票拼接互相冲突的局部最优，导致用户必须学习三套系统",
    practiceMode: "design",
    practice: "能建立概念词典、设计权责和例外升级机制",
    source: "informit",
    focuses: ["概念词典", "设计权威", "实现反馈", "例外预算", "用户模型"],
    phases: ["识别用户概念", "形成规则", "评审实现", "处理例外", "回归一致性"],
    boundary: "概念权威必须对用户模型负责，并持续接收实现约束的反证。",
  }),
  "tmm40-05-second-system-effect": d({
    summary:
      "把第二个系统的功能冲动转成范围预算、设计理由和删除清单，防止经验带来自信过载。",
    scenario: "完成首版后，架构师准备一次加入所有曾被推迟的高级能力",
    formula:
      "scope_pressure = remembered_omissions + novelty - evidence_budget",
    failure: "每项功能单独合理，但组合后破坏性能、可学性和交付窗口",
    practice: "能用范围预算比较保留、延后和删除三种方案",
    source: "pearson",
    focuses: ["第二系统", "功能预算", "架构自律", "删除清单", "用户证据"],
    phases: ["收集愿望", "声明预算", "比较组合", "删除延后", "验证主路径"],
    boundary: "经验能暴露首版缺口，却不自动证明所有补偿性功能都值得加入。",
  }),
  "tmm40-06-passing-the-word": d({
    summary:
      "比较手册、形式定义、会议、电话日志、多重实现和产品测试怎样共同传播设计决定。",
    scenario: "接口规范更新后，五个实现团队对兼容行为产生三种解释",
    formula: "conformance = specification × distribution × test × decision_log",
    failure: "规范正文已更新，但示例、实现、测试和争议决定仍停留在旧版本",
    practiceMode: "simulation",
    practice: "能演练一次规范变更从决策到多实现一致通过的传播链",
    source: "nasa",
    focuses: ["规范手册", "形式定义", "争议决定", "多重实现", "产品测试"],
    phases: ["提出变更", "修订规范", "广播决定", "实现对齐", "一致性测试"],
    boundary: "形式化与会议各补一类缺口，任何单一媒介都不能独占一致性。",
  }),
  "tmm40-07-babel": d({
    summary:
      "把巴比伦塔案例转成沟通路径、项目手册和组织接口图，定位大型项目的信息断裂。",
    scenario: "跨四地团队共享代码仓库，却对目标、接口和完成定义理解不同",
    formula: "alignment = shared_goal × current_manual × reachable_owners",
    failure: "消息数量持续增加，但关键决定没有所有者、版本和确认回路",
    practice: "能诊断一项决定在哪个组织接口丢失并设计确认回路",
    source: "ibm",
    focuses: ["共同目标", "沟通路径", "项目手册", "组织结构", "确认回路"],
    phases: ["声明目标", "识别接口", "发布决定", "确认理解", "修订组织"],
    boundary: "更多会议不等于更好沟通，路径必须对应责任和可验证回执。",
  }),
  "tmm40-08-calling-the-shot": d({
    summary:
      "对 Portman、Aron、Harr、OS/360 与 Corbató 数据先统一工作对象、人员口径和时间窗口，再用于估算。",
    scenario: "经理把五组历史生产率直接平均后承诺新项目日期",
    formula: "estimate = comparable_history × size_model × uncertainty_range",
    failure: "不同产品阶段、规模单位和人员定义被合并成一个精确单点",
    practiceMode: "calculation",
    practice: "能归一化历史数据并给出区间、置信度与重估触发器",
    source: "pearson",
    focuses: ["历史数据", "规模口径", "人员口径", "不确定性", "重估条件"],
    phases: ["筛选案例", "统一单位", "校准模型", "给出区间", "记录偏差"],
    boundary: "历史数据只有在对象和口径可比时才提供先验，不产生确定承诺。",
  }),
  "tmm40-09-ten-pounds": d({
    summary:
      "把空间与性能限制转成分层预算、表示选择和持续测量，避免最后阶段盲目压缩。",
    scenario: "固件已经集成才发现镜像超出目标设备容量 18%",
    formula: "fit = budget - code - data - growth_reserve",
    failure: "所有构件单独满足目标，但共享开销和数据表示让总体超限",
    practiceMode: "calculation",
    practice: "能分配代码、数据和增长预算并定位首个超限构件",
    source: "nasa",
    focuses: ["空间预算", "构件配额", "数据表示", "共享开销", "增长余量"],
    phases: ["声明上限", "分配预算", "选择表示", "持续测量", "处理超限"],
    boundary: "局部优化不能破坏正确性和可维护性，预算必须预留演进空间。",
  }),
  "tmm40-10-documentary-hypothesis": d({
    summary:
      "为产品、组织和项目分别定义最小权威文档，要求决定、状态和责任能被重建。",
    scenario: "项目成员都很忙，关键日期和设计决定只存在聊天与个人记忆中",
    formula: "control = current_artifacts × named_owners × review_cadence",
    failure: "文档数量很多，却没有一份能回答当前基线、负责人和变更理由",
    practiceMode: "design",
    practice: "能设计最小文档集并用一次变更验证其可追溯性",
    source: "nasa",
    focuses: ["产品基线", "组织职责", "项目计划", "决定记录", "评审节奏"],
    phases: ["识别读者", "定义文档", "指定所有者", "执行评审", "重建决定"],
    boundary: "文档的价值在于控制和沟通，不以页数或模板完整度衡量。",
  }),
  "tmm40-11-plan-to-throw-one-away": d({
    summary:
      "把原型、增量交付、变更设计和组织调整连接成演进路线，不把第一次实现当成永久架构。",
    scenario: "需求理解仍在变化，但团队已把试验原型锁定为生产基线",
    formula: "adaptability = feedback_speed × modularity - migration_cost",
    failure: "原型隐藏的捷径成为生产依赖，团队既不能替换也无法安全扩展",
    practiceMode: "simulation",
    practice: "能规划一个可丢弃实验和一个可演进增量并明确迁移门禁",
    source: "sre",
    focuses: ["试验原型", "增量交付", "变更设计", "组织调整", "迁移门禁"],
    phases: ["提出假设", "制作原型", "收集反馈", "重构基线", "增量演进"],
    boundary: "原型是否丢弃由证据和债务决定，不能把浪费恐惧当作保留理由。",
  }),
  "tmm40-12-sharp-tools": d({
    summary:
      "区分目标机器、辅助机器、数据服务、语言和交互工具，按反馈瓶颈选择工具链。",
    scenario: "团队准备换整套工具，却说不清当前等待时间和错误来自哪一环",
    formula: "tool_value = removed_delay + prevented_errors - adoption_cost",
    failure: "工具采购缩短局部操作，却增加格式转换、环境漂移和维护负担",
    practiceMode: "design",
    practice: "能用基线数据选择一项工具并定义采用与回退条件",
    source: "sre",
    focuses: ["目标环境", "辅助环境", "数据服务", "编程语言", "反馈周期"],
    phases: ["测量等待", "定位瓶颈", "比较工具", "小范围试用", "验证收益"],
    boundary: "锋利工具改善附属工作，但不能替代问题建模和接口设计。",
  }),
  "tmm40-13-whole-and-parts": d({
    summary: "连接防错设计、构件测试和系统集成，沿缺陷逃逸路径分配验证责任。",
    scenario: "所有单元测试通过，系统联调仍持续暴露接口和时序缺陷",
    formula:
      "system_quality = prevention × unit_evidence × integration_evidence",
    failure: "构件各自正确，却对协议、资源和故障假设没有共同测试",
    practice: "能从一个系统故障回溯设计、单元和集成三层证据缺口",
    source: "nasa",
    focuses: ["防错设计", "单元测试", "接口契约", "集成顺序", "系统验证"],
    phases: ["设计防错", "验证构件", "冻结接口", "逐层集成", "系统回归"],
    boundary: "单元正确是必要条件，不是系统行为正确的充分条件。",
  }),
  "tmm40-14-hatching-catastrophe": d({
    summary:
      "用可判定里程碑、偏差趋势和升级路径暴露渐进延期，防止坏消息被局部乐观掩盖。",
    scenario: "每个小组只报告晚一两天，项目总体关键路径已经滑移一个月",
    formula:
      "forecast_slip = critical_path_delta + hidden_work + recovery_delay",
    failure: "百分比长期接近完成，未完成条件和依赖阻塞却被藏在地毯下",
    practiceMode: "calculation",
    practice: "能从里程碑事实重算关键路径并触发明确的升级动作",
    source: "nasa",
    focuses: ["可判定里程碑", "偏差趋势", "隐藏工作", "关键路径", "升级动作"],
    phases: ["定义完成", "采集事实", "重算路径", "公开偏差", "执行恢复"],
    boundary: "透明偏差不是惩罚依据，而是及时改变范围和计划的控制信号。",
  }),
  "tmm40-15-other-face": d({
    summary:
      "从使用者任务出发组合目的、环境、输入输出、错误、示例和变更说明，检验程序的另一张脸。",
    scenario: "接口实现正确，但新用户无法从文档完成首次配置和故障恢复",
    formula:
      "usability = task_guidance × accurate_examples × recoverable_errors",
    failure: "代码命名清晰，却缺少用户目的、约束、错误语义和迁移说明",
    practiceMode: "design",
    practice: "能让未参与实现的人只凭文档完成任务并定位一次错误",
    source: "sre",
    focuses: ["用户任务", "运行环境", "输入输出", "错误恢复", "维护说明"],
    phases: ["识别读者", "描述任务", "提供示例", "演练错误", "验证更新"],
    boundary: "自解释代码服务维护者，不能替代面向使用者的行为合同。",
  }),
  "tmm40-16-no-silver-bullet": d({
    summary:
      "区分软件的根本复杂性与表达、工具、流程造成的次要困难，逐项检验所谓数量级突破。",
    scenario: "供应商宣称一种新技术将在十年内把复杂软件生产率提高十倍",
    formula: "total_difficulty = essential_complexity + accidental_difficulty",
    failure: "用消除一种工具摩擦的结果推断需求关系和概念结构也已消失",
    practice: "能把四类根本困难和工具收益放入可反驳的评估矩阵",
    source: "ieee",
    focuses: ["复杂性", "一致性", "可变性", "不可见性", "次要困难"],
    phases: ["拆分困难", "声明基线", "应用技术", "测量收益", "寻找反例"],
    boundary: "工具进步可以巨大，但数量级承诺必须说明它消除了哪一类困难。",
  }),
  "tmm40-17-no-silver-bullet-refired": d({
    summary:
      "重建对银弹论断的反驳、误读和回应，分别评估质量、面向对象、重用与概念词汇的证据。",
    scenario: "评审会把重用率提升当成已经推翻没有银弹论断的充分证据",
    formula:
      "rebuttal_strength = precise_claim × relevant_evidence × counterexample",
    failure: "反驳改变原命题的时间、尺度或对象，形成稻草人比较",
    practice: "能为一项反驳写出原命题、证据范围和可推翻条件",
    source: "ieee",
    focuses: ["原始论断", "Harel 分析", "质量收益", "面向对象", "软件重用"],
    phases: ["复述命题", "限定尺度", "整理证据", "测试反例", "形成回应"],
    boundary: "局部成功既不能被忽略，也不能未经尺度换算就升级为普遍银弹。",
  }),
  "tmm40-18-propositions": d({
    summary:
      "把前十五章的主要观点拆成可判真、判假或限定成立的命题，并绑定证据和反例。",
    scenario: "团队引用书中一句名言，却无法说明项目边界和什么事实会推翻它",
    formula: "claim_status = scope × evidence × counterevidence × replication",
    failure: "把经验性命题当作身份口号，既不测量也不允许反例",
    practice: "能为十五章各选一个命题并登记支持、反对和未知证据",
    source: "informit",
    focuses: ["命题范围", "支持证据", "反对证据", "未知项", "复现实验"],
    phases: ["提取命题", "限定对象", "寻找证据", "运行反例", "更新状态"],
    boundary: "经典观点的价值来自可检验性，不来自作者或读者的权威。",
  }),
  "tmm40-19-twenty-years-later": d({
    summary:
      "系统比较概念完整性、第二系统效应、增量开发、信息隐藏、人月数据与成品软件在二十年后的修订。",
    scenario: "维护者要把 Brooks 的保留、修正和认错映射到当前工程决策",
    formula:
      "updated_guidance = retained + revised + rejected + newly_observed",
    failure: "只挑仍流行的观点，遗漏明确修正、时代变化和新产业结构",
    practiceMode: "design",
    practice: "能制作保留、修正、否定和新增四栏决策表并用于当前方案",
    source: "informit",
    focuses: ["概念完整性", "增量开发", "信息隐藏", "人月数据", "成品软件"],
    phases: ["列出旧说", "查找回顾", "分类变化", "映射当下", "保留异议"],
    boundary: "回顾章节本身也有年代边界，现代证据必须另行登记。",
  }),
  "tmm40-notes-references": d({
    summary:
      "把注解与参考文献当作主张溯源系统，区分原始数据、案例、转述和作者判断。",
    scenario: "课程中的数字和名言能找到脚注，却无法确认脚注是否真正支持该主张",
    formula: "citation_fit = claim_scope ∩ source_scope ∩ measurement_context",
    failure: "引用存在但对象、年代、指标或结论方向与正文主张不匹配",
    practice: "能审计一条数字、一项历史案例和一句判断的来源适配性",
    source: "pearson",
    focuses: ["正文主张", "脚注定位", "原始来源", "测量语境", "引用适配"],
    phases: ["提取主张", "定位注解", "打开来源", "比较范围", "记录结论"],
    boundary: "引用数量不代表证据质量，目录和书目也不能冒充正文事实。",
  }),
  "tmm40-appendix-practice": d({
    summary:
      "把中文版附录的名家评论、书评和读者感言与作者主体文本分层，并把实践感受改写为可验证案例。",
    scenario: "读者把附录感言中的项目经验直接标为 Brooks 在原书提出的结论",
    formula:
      "case_evidence = editorial_role × project_context × observable_result",
    failure: "作者、译者、评论者和普通读者的声音失去角色标记",
    practice: "能把一则感言转换为含背景、干预、结果、反例和来源角色的案例卡",
    source: "tsinghua",
    focuses: ["编辑角色", "项目背景", "实践命题", "观察结果", "反例条件"],
    phases: ["识别作者", "还原背景", "提取命题", "寻找结果", "限定迁移"],
    boundary: "附录提供接受史与实践线索，不自动获得原书作者论断的地位。",
  }),
};

const SPECIAL_DESIGNS = {
  map: d({
    summary:
      "以 24 个正式单元和 143 个目录节点编排版本、组织、进度、设计、验证与回顾的学习路线。",
    scenario: "学习者需要选择先修路径并说明每一页怎样留下项目证据",
    formula: "learning_path = scope → model → intervention → evidence → review",
    failure: "只按页码浏览，却不能从项目现象定位到命题、实验和反例",
    practiceMode: "design",
    practice: "能为一次项目诊断选择章节路径并定义完成证据",
    source: "pearson",
    focuses: ["24 个单元", "143 个节点", "项目命题", "实践证据", "复习路径"],
    phases: ["锁定版次", "选择主题", "运行实验", "保存证据", "回到复习"],
    boundary: "学习地图只组织范围，不把目录标题当作已经掌握的正文知识。",
  }),
  review: d({
    summary:
      "用同一项目贯通 24 个正式单元，重算进度、职责、概念完整性、验证和技术承诺。",
    scenario: "综合评审要判断延期项目应该缩范围、换组织、补证据还是继续交付",
    formula:
      "release_decision = scope × integrity × schedule × verification × review",
    failure: "用总分平均掉关键路径、概念分叉或系统验证的单项失败",
    practiceMode: "diagnosis",
    practice: "能提交一份含范围、模型、干预、反例、回退和独立复核的项目答卷",
    source: "informit",
    focuses: ["项目范围", "概念完整性", "进度证据", "系统验证", "独立复核"],
    phases: ["重建范围", "运行诊断", "执行干预", "验证性质", "形成决策"],
    boundary: "任何硬阻断项失败都必须单独处理，不能由其他维度的高分抵消。",
  }),
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
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("");
}

function conceptKind(concept) {
  if (/序|周年|结束语|附录|注解|参考文献|读者|名家|名著/.test(concept))
    return "版本证据";
  if (
    /人月|估算|数据|进度|里程碑|落后|灾难|Portman|Aron|Harr|Corbat/.test(
      concept,
    )
  )
    return "进度估算";
  if (
    /完整性|贵族|民主|结构师|第二个系统|信息隐藏|组织|队伍|Mills/.test(concept)
  )
    return "组织设计";
  if (/规格|定义|会议|日志|文档|手册|流程图|自文档|交流|巴比伦/.test(concept))
    return "沟通文档";
  if (/bug|调试|测试|整体|部分|集成|产品测试/.test(concept)) return "验证集成";
  if (/银弹|根本|次要|复杂|面向对象|重用|质量|词汇/.test(concept))
    return "复杂性论证";
  if (/工具|机器|语言|程序空间|规模控制|数据的表现|高级语言/.test(concept))
    return "工具约束";
  return "工程命题";
}

function conceptParagraph(concept, profile, index) {
  const { design } = profile;
  const focus = design.focuses[index % design.focuses.length];
  if (profile.chapterSlug === "tmm40-official-learning-map") {
    return `学习地图把“${concept}”放在可执行路径上：先写出该单元能解释的项目现象，再以${focus}选择实验和证据，最后用“${design.failure}”检查路径是否遗漏硬阻断。该节点只承担导航职责，不把目录出现误报为知识掌握。`;
  }
  if (profile.chapterSlug === "tmm40-official-final-review") {
    return `总复习把“${concept}”转换为综合评审卡：评审者要在空白项目快照上重建角色、依赖和验证条件，以${focus}运行一次干预和一次反例；如果出现“${design.failure}”，就在首个失配处拒绝发布并给出恢复动作。`;
  }
  const explanations = {
    版本证据: `“${concept}”首先是版本与编辑角色证据，必须区分作者原文、纪念版增补、译者说明和中文版附录。`,
    进度估算: `“${concept}”涉及工作对象、时间窗口、依赖或人员口径，只有统一分母和单位后才能用于预测。`,
    组织设计: `“${concept}”改变决策权、信息流或职责边界，需要同时测量一致性收益与单点瓶颈。`,
    沟通文档: `“${concept}”承载设计决定和状态传播，发布、接收、确认、争议与修订必须形成闭环。`,
    验证集成: `“${concept}”位于缺陷预防或逃逸路径上，局部通过不能替代接口与系统级结果。`,
    复杂性论证: `“${concept}”是一项带尺度和期限的论证，需要区分根本结构、附属摩擦与可观测收益。`,
    工具约束: `“${concept}”改变资源预算或反馈周期，评价时必须扣除采用、迁移和维护成本。`,
    工程命题: `“${concept}”需要改写成带对象、条件、预期和反例的工程命题，不能只保留格言。`,
  };
  return `${explanations[conceptKind(concept)]} 在“${design.summary}”的项目模型中，本节点重点检查${focus}；只调整一个条件并保存依赖、决定和结果，若出现“${design.failure}”，立即定位首个证据缺口。`;
}

function termsFor(profile) {
  return [...new Set([profile.title, ...profile.design.focuses])].slice(0, 6);
}

function actionsFor(profile) {
  const [a, b, c, d, e] = profile.design.focuses;
  return [
    {
      label: `公开${a}`,
      detail: `让评审者先看到${a}的定义和负责人，保持${b}与${c}不变。`,
      delayDelta: -10,
      clarityDelta: 14,
      riskDelta: -12,
    },
    {
      label: `校验${c}`,
      detail: `在${c}进入下一阶段前核对版本、输入和完成条件。`,
      delayDelta: 2,
      clarityDelta: 18,
      riskDelta: -16,
    },
    {
      label: `绕过${d}`,
      detail: `跳过${d}直接追求${e}，观察局部提速怎样传成项目风险。`,
      delayDelta: 16,
      clarityDelta: -18,
      riskDelta: 24,
    },
  ];
}

function wrapperSource(profile) {
  const base = pascal(profile.chapterSlug);
  const shared = {
    unitId: profile.chapterSlug,
    title: profile.title,
    question: profile.design.scenario,
    roles: [
      `${profile.design.focuses[0]}负责人`,
      `${profile.design.focuses[1]}执行者`,
      "独立项目评审者",
    ],
    phases: profile.design.phases,
    concepts: profile.concepts.length
      ? profile.concepts
      : profile.design.focuses,
    actions: actionsFor(profile),
    metricLabels: [
      `${profile.design.focuses[0]}延期暴露`,
      `${profile.design.focuses[2]}清晰度`,
      `${profile.design.focuses[4]}风险`,
    ],
    boundaryNote: profile.design.boundary,
    failureNote: `拒绝原因：${profile.design.failure}。`,
  };
  const modes = [
    ["Dependency", "dependency", [40, 66, 42]],
    ["Schedule", "schedule", [46, 62, 46]],
    ["Evidence", "evidence", [34, 74, 36]],
  ];
  return `import { ProjectEvidenceLab } from "./project-evidence-lab";\n\nconst shared = ${JSON.stringify(shared, null, 2)} as const;\n\n${modes
    .map(
      ([suffix, mode, baseline]) =>
        `export function ${base}${suffix}Lab() {\n  return <ProjectEvidenceLab {...shared} mode=${JSON.stringify(mode)} baseline={${JSON.stringify(baseline)}} />;\n}`,
    )
    .join("\n\n")}\n`;
}

function renderTerms(profile) {
  const terms = termsFor(profile);
  return {
    inline: terms
      .map(
        (term, index) =>
          `<Term def={${JSON.stringify(`${term}在${profile.title}中对应${profile.design.phases[index % profile.design.phases.length]}的可复核项目变量。`)}}>${term}</Term>`,
      )
      .join("、\n"),
    glossary: terms
      .map(
        (term, index) =>
          `<GlossaryItem term=${JSON.stringify(term)}>${profile.design.focuses[index % profile.design.focuses.length]}的项目证据入口。</GlossaryItem>`,
      )
      .join("\n"),
  };
}

function renderChapter(profile, previous, next) {
  const base = pascal(profile.chapterSlug);
  const terms = renderTerms(profile);
  const fact = FACT_SOURCES[profile.design.source] ?? FACT_SOURCES.pearson;
  const conceptSections = profile.concepts
    .map(
      (concept, index) =>
        `### ${concept}\n\n${conceptParagraph(concept, profile, index)}`,
    )
    .join("\n\n");
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
sourceUrl: ${JSON.stringify(PEARSON)}
qualityVersion: 2
practiceMode: ${profile.design.practiceMode}
sourceMode: independent-rewrite
draft: false
---

import {
  ${base}DependencyLab,
  ${base}ScheduleLab,
  ${base}EvidenceLab,
} from "@/components/mdx/mythical-man-month/diagrams/${profile.chapterSlug}";
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

- 能解释 ${profile.title} 怎样处理“${profile.design.scenario}”
- 能沿 ${profile.design.phases.join(" → ")} 重建范围、职责、依赖和结果
- 能使用 ${profile.design.formula} 比较基线、约束收紧与失效注入
- ${profile.design.practice}

</Objectives>

## 直觉：先把格言还原成项目模型

${profile.design.summary} 对 **${profile.title}** 的验收不取决于是否记住一句名言，而取决于能否公开项目边界、唯一干预、失败传播和可复核结果。

<Callout type="info" title="来源范围与独立教学重写">
  **${profile.title}** 以 [Pearson/Addison-Wesley 官方目录](${PEARSON}) 锁定英文纪念版范围，以 [清华大学出版社前言](${TSINGHUA}) 和 [40 周年中文版目录](${CHINESE_CATALOG}) 对齐中文增补单元，并参考 [${fact.label}](${fact.url}) 核对技术与历史坐标。项目未取得原书完整正文；本页不声称翻译或复现原书，解释、计算、实验和练习均为独立教学重写。
</Callout>

## 对象、关系与验收合同

贯穿项目是：**${profile.design.scenario}**。运行前记录产品边界、工作分解、参与角色、依赖、完成定义、历史口径、工具版本和停止条件；看到结果后不得改写成功标准。

$$
${profile.design.formula}
$$

公式是公开假设的压缩表示，不是精确预测器。${profile.design.boundary} 本页专门防范：**${profile.design.failure}**。

${terms.inline}

## 正式目录节点：解释、实验与反例

以下节点逐项对应正文解释、页面专属项目实验和带答案练习。每项都要说明它改变哪个责任、依赖或证据，以及什么观察足以拒绝结论。

${conceptSections}

## 三视图项目实验

<Callout type="info" title="运行协议">
  在 ${profile.title} 中，先预测约束收紧会在哪个阶段改变结果，再选择一项管理干预；每轮保存范围、角色、依赖、指标、拒绝原因和重置后的基线。
</Callout>

<Stepper>
  <Step title="1. 依赖与职责图">
    从 ${profile.design.phases[0]} 走到 ${profile.design.phases.at(-1)}，确认决定、任务和证据由谁产生、传递与确认。
    <${base}DependencyLab />
  </Step>
  <Step title="2. 进度因果实验">
    只改变 ${profile.design.focuses[1]} 或 ${profile.design.focuses[3]}，比较局部提速怎样影响项目延期、清晰度和风险。
    <${base}ScheduleLab />
  </Step>
  <Step title="3. 命题证据门禁">
    以“${profile.design.practice}”作为通过条件；约束收紧要降级结论，失效注入必须触发明确拒绝。
    <${base}EvidenceLab />
  </Step>
</Stepper>

## 常见误区

<Callout type="trap" title="${profile.title} 不能用局部完成度代替项目证据">
  典型失败是“${profile.design.failure}”。诊断时沿 ${profile.design.phases.join(" → ")} 重放到首个失配处，不能修改最终分数来掩盖范围、接口或验证缺口。
</Callout>

## 术语

<Glossary>
${terms.glossary}
</Glossary>

## 练习与答案

<Exercises>

1. **目录证据复核。** 从本页选择三个相邻节点，说明它们分别改变哪项责任、依赖和完成条件。

<Answer>
  ${profile.title} 的正式复核清单是：${checklist}。为选中的三项写出对象、所有者、输入、输出、测量和拒绝条件，再保存一次基线项目轨迹；若只有标题或格言而没有项目变量，则该节点尚未解释。
</Answer>

2. **项目故障诊断。** 在“${profile.design.scenario}”中注入“${profile.design.failure}”，第一处应在哪里拒绝？

<Answer>
  沿 ${profile.design.phases.join(" → ")} 比较预期与实际；当 ${profile.design.focuses[2]} 首次失配就停止，保存负责人、依赖和原始结果。修复后还要重放约束收紧场景，不能只验证理想输入。
</Answer>

3. **方案判断。** 何时应该拒绝本页首选的管理或工程方案？

<Answer>
  ${profile.design.boundary} 如果更简单的方案能在相同边界下保留项目性质和回退能力，就登记迁移理由；经典术语本身不能成为保留复杂流程的理由。
</Answer>

</Exercises>

## 本章小结

${profile.title} 通过 ${profile.design.phases.join("、")} 把 ${profile.design.focuses.join("、")} 连接成可计算、可失败、可复核的项目证据链。最终验收是：${profile.design.practice}。

## 前后导航

${previousLink}
${nextLink}

<Attribution
  mode="independent-rewrite"
  sourceBasis="authorized-sample"
  workTitle=${JSON.stringify(WORK_TITLE)}
  adaptedUrl=${JSON.stringify(PEARSON)}
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
    section: String(parsed.data.section ?? "人月神话（40周年中文纪念版）"),
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
  ["tmm40-official-learning-map", SPECIAL_DESIGNS.map],
  ["tmm40-official-final-review", SPECIAL_DESIGNS.review],
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
      scope: { formalUnits: 24, outlineNodes: 143, pages: 26 },
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
    "publisher-official-anniversary-toc-authorized-sample-and-chinese-edition-preface-catalog",
  sourceAccess: "authorized-sample",
  sourceMode: "independent-rewrite",
  sourceUrl: PEARSON,
  secondarySourceUrls: [INFORMIT, TSINGHUA, CHINESE_CATALOG],
  factSources: FACT_SOURCES,
  coverage: { formalUnits: 24, outlineNodes: 143, pages: 26 },
  disclosureNote:
    "Pearson/Addison-Wesley 官方页面界定英文纪念版19章、Epilogue、Notes and references与序言范围，InformIT提供合法可见的官方样章和序言；清华大学出版社前言及中文版目录用于对齐译者序与中文附录。未取得原书完整正文，课程不声称翻译或复现原书；中文解释、项目模型、交互实验和练习均独立重写，并用IBM、IEEE、NASA与Google SRE的一手资料核对历史和现代工程边界。",
  units: manifest.units.map((unit) => ({
    ...unit,
    chapterPath: chapterPaths.get(unit.id),
    factSourceIds: [
      ...new Set(["pearson", "informit", DESIGNS[unit.id].source]),
    ],
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
