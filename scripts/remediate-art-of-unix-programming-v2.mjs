#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const ROOT = process.cwd();
const BOOK = "art-of-unix-programming";
const BOOK_DIR = path.join(ROOT, "content", BOOK);
const COMPONENT_DIR = path.join(
  ROOT,
  "src/components/mdx/art-of-unix-programming/diagrams",
);
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/art-of-unix-programming-v2-profiles.json",
);
const OFFICIAL_URL = "https://www.catb.org/~esr/writings/taoup/html/index.html";
const PUBLISHER_URL =
  "https://www.pearson.com/en-ca/subject-catalog/p/art-of-unix-programming-the/P200000009077";
const WORK_TITLE = "Eric S. Raymond《The Art of Unix Programming》作者送印版";

const FACT_SOURCES = {
  official: {
    label: "作者官网完整送印版",
    url: OFFICIAL_URL,
  },
  publisher: {
    label: "Pearson 第一版书目页",
    url: PUBLISHER_URL,
  },
  posix: {
    label: "The Open Group Base Specifications Issue 8",
    url: "https://pubs.opengroup.org/onlinepubs/9799919799/",
  },
  rfc: {
    label: "RFC 9110: HTTP Semantics",
    url: "https://www.rfc-editor.org/rfc/rfc9110.html",
  },
  git: {
    label: "Git 官方参考文档",
    url: "https://git-scm.com/docs",
  },
  spdx: {
    label: "SPDX License List",
    url: "https://spdx.org/licenses/",
  },
};

const DESIGNS = {
  "taoup-preface": {
    summary: "先划清读者、用法、案例与时代边界，再决定如何读取后续工程主张。",
    mechanism:
      "序言把读者经验、阅读顺序、案例角色和排版约定组合成一份学习合同；合同不成立时，应先补先决知识而不是跳进工具细节。",
    formula: "usable_scope = audience ∩ purpose ∩ conventions ∩ case_context",
    fault: "把2003年的工具选择当成今天唯一正确的实现",
    scenario: "一名只熟悉图形 IDE 的读者准备评审一条 Unix 管道",
    practice: "能为自己的背景写出阅读路线、跳读条件和补证计划",
    practiceMode: "design",
    nodes: ["读者画像", "阅读目的", "约定识别", "案例索引", "边界声明"],
    focuses: ["先决经验", "章节路径", "符号约定", "案例职责", "时代差异"],
    boundary: "当读者能解释接口、进程、文本流与失败状态时，才进入案例推演。",
    source: "official",
  },
  "taoup-part-01": {
    summary: "用哲学、历史与系统对比建立判断坐标，防止把风格偏好冒充普遍定律。",
    mechanism:
      "背景部分先给出 Unix 的价值主张，再用历史因果和操作系统对比暴露这些主张的成立条件，从而形成可反驳的设计假设。",
    formula: "claim_strength = principle × historical_evidence × contrast",
    fault: "只摘录格言，不检查格言在何种硬件、组织和生态中形成",
    scenario: "团队争论是否把一个平台服务拆成命令行工具",
    practice: "能把一条 Unix 原则改写成包含适用条件与反例的决策记录",
    practiceMode: "design",
    nodes: ["提出原则", "追溯历史", "横向对比", "识别代价", "形成假设"],
    focuses: ["哲学命题", "历史证据", "系统风格", "反例", "适用边界"],
    boundary: "若对比对象的时代和约束不同，结论只能作为假设，不能直接迁移。",
    source: "official",
  },
  "taoup-chapter-01-philosophy": {
    summary: "把17条 Unix 哲学规则变成可以被采用、拒绝和复核的设计约束。",
    mechanism:
      "规则之间不是口号清单：模块化与组合降低局部复杂度，清晰与透明提供诊断入口，表示与分离把易变知识移出控制流，简洁则约束所有新增机制。",
    formula: "robustness ≈ simplicity × transparency × composability",
    fault: "为了追求小工具数量而制造更多格式转换、隐式状态和失败边界",
    scenario: "审查一条读取事件、规范化字段、筛选并输出结果的工具链",
    practice: "能逐条说明17条规则在真实工具中的支持证据与拒绝理由",
    practiceMode: "design",
    nodes: ["文化语境", "得失判断", "规则组合", "一课总结", "工程态度"],
    focuses: ["模块化", "清晰", "组合", "分离", "简洁"],
    boundary: "拆分只有在接口更窄、失败更清楚且组合成本下降时才算模块化。",
    source: "official",
  },
  "taoup-chapter-02-history": {
    summary:
      "沿 Unix 与黑客文化两条时间线追踪技术选择如何被组织、网络和许可制度塑造。",
    mechanism:
      "历史章把研究机构、商业分叉、TCP/IP、自由软件、Linux 与开放源码串成因果链；关键不是年份背诵，而是识别兼容性、传播成本和社区反馈如何改变胜负。",
    formula: "adoption = compatibility × distribution × community_feedback",
    fault: "把后来成功的结果倒推成当时唯一可能的路线",
    scenario: "解释一种开放接口为何跨过商业 Unix 分裂继续扩散",
    practice: "能用同期证据区分原因、触发事件、结果与事后叙事",
    practiceMode: "diagnosis",
    nodes: ["Unix 起源", "商业分叉", "网络融合", "Linux 兴起", "开放协作"],
    focuses: ["时间证据", "制度约束", "兼容接口", "传播机制", "历史反事实"],
    boundary: "只有能指出同期可见的约束和替代路线，历史因果才不沦为胜者叙事。",
    source: "official",
  },
  "taoup-chapter-03-contrasts": {
    summary: "用统一维度比较操作系统风格，而不是把 Unix 的熟悉感当成优势证据。",
    mechanism:
      "比较框架固定统一理念、协作进程、内部边界、文件结构、界面风格、受众和开发门槛，再把 VMS、MacOS、Windows NT、MVS、Linux 等放入同一张证据表。",
    formula:
      "fair_comparison = same_workload + same_dimensions + explicit_tradeoffs",
    fault: "用一个系统的最佳案例对比另一个系统的最差默认配置",
    scenario: "为批处理、桌面交互与大型事务三类负载选择系统风格",
    practice: "能在同一工作负载下比较至少三种系统，并公开不可比项",
    practiceMode: "design",
    nodes: ["统一理念", "并发协作", "内部边界", "界面受众", "系统比较"],
    focuses: ["比较口径", "任务模型", "数据模型", "开发门槛", "取舍结论"],
    boundary: "当工作负载或时代条件不同，应停止排名并改为条件化结论。",
    source: "official",
  },
  "taoup-part-02": {
    summary:
      "把 Unix 原则推进到模块、协议、进程、语言、配置、接口与复杂度的具体设计。",
    mechanism:
      "设计部分按边界、表示、可见性、组合方式和复杂度预算逐层收敛方案；每一章提供不同的分解工具，但都必须回到接口与失败合同。",
    formula:
      "design_quality = boundaries × representations × observability × restraint",
    fault: "先选工具和框架，再用原则为既定方案寻找理由",
    scenario: "从一项模糊需求推导可组合、可诊断、可替换的系统结构",
    practice: "能画出设计决策依赖图并标出每项决定的撤回条件",
    practiceMode: "design",
    nodes: ["模块边界", "数据表示", "进程组合", "用户接口", "复杂度预算"],
    focuses: ["正交性", "文本协议", "故障可见", "最小惊讶", "必要复杂度"],
    boundary: "任何抽象若不能减少调用者需要同时理解的状态，就不应继续叠加。",
    source: "official",
  },
  "taoup-chapter-04-modularity": {
    summary: "以封装、正交性、SPOT 与胶合层成本寻找真正可分离的模块边界。",
    mechanism:
      "模块化不是文件数量，而是知识所有权：每项知识只有一个权威位置，模块通过窄接口协作，胶合代码只负责转换而不复制业务规则。",
    formula: "coupling_cost = shared_knowledge + interface_width + glue_layers",
    fault: "把同一规则复制到多个模块，并用更多适配器掩盖重复知识",
    scenario: "把一个同时解析、校验、存储和展示数据的程序重新分层",
    practice: "能定位知识重复点并证明拆分后改动传播范围缩小",
    practiceMode: "design",
    nodes: ["封装单元", "正交检查", "SPOT 所有权", "胶合层", "模块测试"],
    focuses: ["模块尺寸", "接口宽度", "知识唯一", "转换成本", "改动传播"],
    boundary: "如果拆分增加了双向依赖或重复规则，应合并边界而非继续细分。",
    source: "official",
  },
  "taoup-chapter-05-textuality": {
    summary: "比较文本与二进制表示的可检查性、演化成本、体积和解析风险。",
    mechanism:
      "文本化的价值来自通用工具可读、差异可见和协议可试验；代价是转义、编码、模式演化与体积，不能把‘人能打开’误当成格式正确。",
    formula:
      "representation_value = inspectability + evolvability - parse_risk - size_cost",
    fault: "用脆弱的分隔规则处理未转义字段，导致合法数据改变记录边界",
    scenario: "为事件交换格式在 DSV、键值记录、JSON 与紧凑二进制间选择",
    practice: "能制作正常、边界和畸形样本，比较表示方案的失败语义",
    practiceMode: "design",
    nodes: ["表示目标", "格式候选", "协议交换", "异常解析", "演化策略"],
    focuses: ["可检查性", "编码边界", "模式演化", "压缩代价", "互操作性"],
    boundary:
      "当体积、吞吐或安全约束超过文本收益时，可选二进制，但必须保留检查器。",
    source: "rfc",
  },
  "taoup-chapter-06-transparency": {
    summary: "让内部状态、配置、诊断路径和恢复动作对维护者可发现。",
    mechanism:
      "透明性通过详细模式、可编辑表示、确定性重放和分层诊断暴露系统状态；可发现性则让新维护者从界面和文档找到这些入口。",
    formula:
      "diagnosability = visible_state × reproducibility × fault_locality",
    fault: "为了界面简洁隐藏错误上下文，只留下无法重放的‘操作失败’",
    scenario: "诊断一个间歇失败的同步工具，并在不改数据的情况下重放",
    practice: "能从症状定位首个状态偏离，并使用可逆操作恢复",
    practiceMode: "diagnosis",
    nodes: ["观察入口", "状态展开", "故障定位", "可编辑表示", "恢复验证"],
    focuses: ["详细输出", "隐藏状态", "确定性", "维护入口", "恢复轨迹"],
    boundary:
      "透明不等于泄露秘密；敏感值应脱敏，但状态转移和错误类别必须可见。",
    source: "official",
  },
  "taoup-chapter-07-multiprogramming": {
    summary: "按故障隔离与协议边界选择管道、从进程、对等 IPC 或线程。",
    mechanism:
      "多道程序设计先把功能和性能问题分开，再比较管道、重定向、包装器、从进程和对等通信；进程边界提供隔离，也引入序列化、调度和部分失败。",
    formula:
      "partition_gain = isolation + replaceability - ipc_cost - partial_failure",
    fault: "为共享内存速度引入线程，却没有为竞态、取消和资源所有权定义协议",
    scenario: "将抓取、解析、过滤与写入任务划分为可恢复的执行单元",
    practice: "能模拟一段进程故障并证明上游、下游和重试策略行为确定",
    practiceMode: "simulation",
    nodes: ["任务划分", "IPC 选择", "背压传播", "局部失败", "恢复编排"],
    focuses: ["进程隔离", "协议边界", "吞吐延迟", "失败传播", "资源所有权"],
    boundary: "当通信状态比业务状态更复杂时，应回退到库边界或重新划分职责。",
    source: "posix",
  },
  "taoup-chapter-08-minilanguages": {
    summary: "判断何时用配置、正则、声明式 DSL 或完整语言表达领域规则。",
    mechanism:
      "微型语言把频繁变化的规则提升为数据或语法；收益来自表达密度与可组合性，风险来自语法歧义、执行能力、调试困难和无边界扩张。",
    formula:
      "dsl_payoff = repeated_variation × expression_gain - language_cost",
    fault: "不断给配置文件加入条件、循环和宏，却拒绝承认它已经是一门语言",
    scenario: "为日志路由规则选择表格、正则、声明式 DSL 或嵌入脚本",
    practice: "能根据用户、错误信息和安全边界选择恰当语言层级",
    practiceMode: "design",
    nodes: ["领域词汇", "复杂度层级", "语法选择", "执行边界", "诊断工具"],
    focuses: ["表达密度", "语法歧义", "扩展机制", "错误定位", "安全能力"],
    boundary:
      "一旦需要通用控制流和调试器，应采用成熟语言而不是继续堆叠 DSL 特性。",
    source: "official",
  },
  "taoup-chapter-09-generation": {
    summary: "把重复知识提升到表、模型或生成器，确保生成物可复现且不被手改。",
    mechanism:
      "生成式设计先确定唯一规格，再由确定性工具产生代码、文档或展示；生成物必须可丢弃重建，差异应回到规格或生成器修复。",
    formula: "generated_consistency = single_spec × deterministic_toolchain",
    fault: "在生成文件上手工修补，下一次生成静默覆盖且无法追溯",
    scenario: "从字段规格同时生成解析器、帮助文本和测试向量",
    practice: "能修改一次规格并用命令重建、比较、验证全部产物",
    practiceMode: "code",
    nodes: ["唯一规格", "转换规则", "生成产物", "差异检查", "重建门禁"],
    focuses: ["数据驱动", "确定生成", "禁止手改", "产物校验", "版本追踪"],
    boundary: "若生成器比目标逻辑更难理解且只运行一次，直接实现可能更清晰。",
    source: "git",
    code: "spec.yaml -> generate.mjs -> parser.ts + help.md + cases.json\nverify: regenerate && git diff --exit-code",
  },
  "taoup-chapter-10-configuration": {
    summary:
      "按作用域、生命周期、可见性和优先级选择配置文件、环境变量与命令行参数。",
    mechanism:
      "配置入口形成覆盖链：稳定系统默认值、用户或项目配置、进程环境、单次命令行参数；每层必须声明作用域、来源和冲突规则。",
    formula: "effective_config = defaults ⊕ file ⊕ environment ⊕ cli",
    fault: "同一键在多个入口含义不同，运行日志又不显示最终来源",
    scenario: "为代理地址、认证凭据、输出格式和一次性调试开关选择入口",
    practice: "能预测配置合并结果并从日志追溯每个有效值的来源",
    practiceMode: "design",
    nodes: ["配置分类", "作用域选择", "优先级合并", "来源显示", "错误拒绝"],
    focuses: ["默认值", "配置文件", "环境变量", "命令行", "冲突规则"],
    boundary:
      "秘密不进入命令行历史，长期策略不依赖进程环境，错误值不得静默回退。",
    source: "posix",
  },
  "taoup-chapter-11-interfaces": {
    summary:
      "用最小惊讶、可组合性与表达能力选择过滤器、编译器、服务或分离引擎界面。",
    mechanism:
      "Unix 接口模式按输入输出方向、状态持续时间和交互密度分类；同一引擎可暴露 CLI、协议或图形前端，但业务语义只能有一个权威实现。",
    formula: "interface_fit = task_frequency × composability × feedback_need",
    fault: "为每个前端复制业务规则，造成命令行与图形界面结果不一致",
    scenario: "为批量转换、偶发管理和持续监控三个任务组合接口",
    practice: "能根据任务流选择接口模式并验证脚本化与人工反馈",
    practiceMode: "design",
    nodes: ["任务画像", "模式筛选", "引擎分离", "反馈设计", "组合验证"],
    focuses: ["最小惊讶", "过滤模式", "编译模式", "CLI 服务", "多前端一致"],
    boundary: "高频探索任务需要即时反馈时，纯命令行并非自动优于可视界面。",
    source: "posix",
  },
  "taoup-chapter-12-optimization": {
    summary:
      "先测量端到端瓶颈，再比较批处理、重叠与缓存对吞吐和延迟的真实影响。",
    mechanism:
      "优化从可重复基线开始，用剖析定位主导成本；批处理摊薄固定开销，重叠隐藏等待，缓存复用结果，但三者都会增加状态与尾延迟风险。",
    formula: "speedup = baseline_time / candidate_time",
    fault: "只展示平均吞吐提升，隐藏缓存失效后的尾延迟和一致性代价",
    scenario: "在10万条记录处理中选择批大小、并发窗口和缓存策略",
    practice: "能手算候选收益并用相同数据集复测吞吐、尾延迟和资源占用",
    practiceMode: "calculation",
    nodes: ["建立基线", "定位瓶颈", "选择策略", "测量副作用", "保留回退"],
    focuses: ["基线耗时", "吞吐", "尾延迟", "缓存命中", "资源预算"],
    boundary: "优化收益小于测量噪声或维护成本时，应保留清晰实现。",
    source: "official",
  },
  "taoup-chapter-13-complexity": {
    summary: "区分本质、可选与偶然复杂度，并在接口与实现之间分配认知预算。",
    mechanism:
      "复杂度地图记录用户必须理解的概念、实现内部状态和工具链附带负担；编辑器案例说明功能多少不是唯一尺度，交互模型与扩展边界同样决定系统大小。",
    formula: "total_complexity = essential + optional + accidental",
    fault: "用统一框架消除表面差异，却引入更多配置、概念和隐藏控制流",
    scenario: "比较五种编辑器风格对新手任务、专家扩展和维护的负担",
    practice: "能量化概念数、状态数与例外路径，并删除一项偶然复杂度",
    practiceMode: "calculation",
    nodes: ["复杂度盘点", "来源分类", "接口分配", "方案比较", "删减验证"],
    focuses: ["本质复杂度", "可选复杂度", "偶然复杂度", "认知负担", "软件尺寸"],
    boundary: "简化若删除必要能力或把复杂度推给用户，只是转移而非降低。",
    source: "official",
  },
  "taoup-part-03": {
    summary: "把设计原则落到语言、工具与重用的实现选择，并要求每项选择可替换。",
    mechanism:
      "实现部分以任务特征选择语言，以自动化工具缩短反馈，再通过重用评估避免重复建设；三者共同约束交付速度、缺陷暴露和长期维护。",
    formula:
      "implementation_fit = language_fit × tool_feedback × reuse_evidence",
    fault: "因团队熟悉某语言而忽略运行环境、库生态和部署边界",
    scenario: "为解析器、构建流水线与网络服务分别选择实现策略",
    practice: "能为语言、工具和依赖各写一条可验证的替换条件",
    practiceMode: "design",
    nodes: ["任务分类", "语言选择", "工具反馈", "重用调查", "替换演练"],
    focuses: ["运行模型", "开发效率", "自动化", "依赖证据", "退出成本"],
    boundary: "当迁移成本超过预期收益且没有退出路径时，不应追逐新工具。",
    source: "official",
  },
  "taoup-chapter-14-languages": {
    summary: "按运行模型、类型约束、库生态、性能与胶合成本选择语言或混合策略。",
    mechanism:
      "语言评估不做总排名，而把 C、C++、Shell、Perl、Tcl、Python、Java 与 Emacs Lisp 放进任务矩阵；解释器和混合策略常把控制层与性能内核分开。",
    formula:
      "language_fit = runtime + ecosystem + safety + integration - glue_cost",
    fault: "用微基准证明语言更快，却忽略绑定层、部署和错误处理成本",
    scenario: "为数据清洗、系统接口、长驻服务和编辑器扩展分配语言",
    practice: "能给出选择矩阵并用原型验证最大的不确定项",
    practiceMode: "design",
    nodes: ["任务约束", "候选语言", "混合边界", "原型测量", "退出方案"],
    focuses: ["运行时", "类型安全", "库生态", "胶合成本", "部署可用"],
    boundary: "若多语言边界使调试和发布不可控，单一成熟栈可能更经济。",
    source: "official",
  },
  "taoup-chapter-15-tools": {
    summary:
      "用编辑、构建、版本控制、调试、剖析和自动化形成短而可重放的反馈环。",
    mechanism:
      "工具链把源文件、生成规则、变更历史、测试与诊断证据连接起来；最重要的不是工具数量，而是一次变更能否被另一个人从干净环境重建。",
    formula: "feedback_time = edit + build + test + diagnose",
    fault: "构建依赖开发者机器上的隐式文件，版本库无法重建发布物",
    scenario: "从一个手工编译项目建立可重复构建、测试与差异审查",
    practice: "能提交最小变更并在干净目录一条命令重建验证",
    practiceMode: "code",
    nodes: ["编辑变更", "构建依赖", "版本记录", "测试诊断", "自动发布"],
    focuses: ["编辑器", "make 依赖", "版本控制", "调试剖析", "自动化"],
    boundary: "自动化若隐藏失败命令或无法本地重放，就不是可靠反馈环。",
    source: "git",
    code: "git diff --check\nmake clean test\ngit status --short",
  },
  "taoup-chapter-16-reuse": {
    summary:
      "在自己实现前检索现有方案，并以透明度、许可、维护和退出成本评估依赖。",
    mechanism:
      "重用决策先证明问题边界，再调查候选项目的接口、测试、维护状态、许可证和替换难度；下载量或名气不能替代适配证据。",
    formula:
      "reuse_value = avoided_work - integration - maintenance - exit_cost",
    fault: "引入庞大依赖只使用一个小函数，且没有许可证与供应链记录",
    scenario: "在标准库、小型组件、外部服务和自研之间选择解析能力",
    practice: "能制作依赖评估卡并完成一次移除或替换演练",
    practiceMode: "diagnosis",
    nodes: ["问题界定", "候选检索", "适配验证", "许可维护", "退出演练"],
    focuses: ["避免重造", "接口透明", "许可证", "维护活性", "替换成本"],
    boundary: "候选依赖的未知风险大于自研范围时，重用不再自动节省成本。",
    source: "spdx",
  },
  "taoup-part-04": {
    summary: "把软件放回标准、文档、开放协作与未来演化的社区系统中审视。",
    mechanism:
      "社区部分从可移植标准开始，经由文档传递知识，再讨论开放源码协作与未来威胁；代码只有能被他人理解、构建、移植和接续才形成长期资产。",
    formula: "longevity = portability × documentation × community_continuity",
    fault: "只发布源码快照，不提供构建、治理、许可和维护入口",
    scenario: "评估一个工具在新平台、新维护者和新需求下能否延续",
    practice: "能为项目补齐标准差异、维护文档和贡献路径",
    practiceMode: "design",
    nodes: ["标准边界", "知识传递", "贡献协议", "治理连续", "未来压力"],
    focuses: ["可移植性", "文档", "开放协作", "社区治理", "演化风险"],
    boundary: "开放代码若没有可进入的维护流程，不能等同于可持续社区。",
    source: "official",
  },
  "taoup-chapter-17-portability": {
    summary: "分离标准接口、实现扩展与环境假设，用移植矩阵暴露兼容性债务。",
    mechanism:
      "可移植设计先声明目标平台和标准基线，再把文件系统、字节序、字符集、系统调用、编译器扩展与 shell 假设放入差异层。",
    formula: "portability = standard_surface / environment_assumptions",
    fault: "在一台机器编译成功就宣称可移植，未覆盖行为差异和工具链警告",
    scenario: "把一个依赖 GNU 扩展和本地路径的工具移到 POSIX 环境",
    practice: "能运行移植矩阵并定位第一个标准外依赖",
    practiceMode: "diagnosis",
    nodes: ["平台矩阵", "标准基线", "假设清单", "兼容层", "移植测试"],
    focuses: ["POSIX 接口", "语言标准", "系统差异", "条件编译", "矩阵证据"],
    boundary: "目标平台单一且扩展收益明确时可使用扩展，但必须隔离并记录。",
    source: "posix",
  },
  "taoup-chapter-18-documentation": {
    summary:
      "让手册页、HOWTO、FAQ 与代码附近文档分别回答查找、操作、解释和维护问题。",
    mechanism:
      "文档类型由读者任务决定：参考资料追求精确检索，教程建立路径，FAQ 处理重复困惑，代码文档解释不可见约束；示例必须能被自动验证。",
    formula: "documentation_value = task_coverage × findability × freshness",
    fault: "README 展示过时命令，自动测试从不执行文档示例",
    scenario: "为新用户安装失败和维护者协议疑问设计文档入口",
    practice: "能把一个问题路由到正确文档类型并验证示例仍可执行",
    practiceMode: "design",
    nodes: ["读者任务", "文档类型", "信息架构", "示例验证", "更新责任"],
    focuses: ["手册页", "HOWTO", "FAQ", "代码文档", "新鲜度"],
    boundary: "文档不能替代清晰接口；若需要大量说明才能避免误用，应先修设计。",
    source: "git",
  },
  "taoup-chapter-19-open-source": {
    summary: "把补丁、版本、沟通、发布与许可证连接成可进入的开放协作协议。",
    mechanism:
      "开放源码实践通过小补丁、公开历史、可重建发布和清晰沟通降低协作门槛；许可证定义法律边界，治理流程决定贡献是否真正可达。",
    formula: "contribution_flow = clear_scope × reviewability × legal_clarity",
    fault: "接受来源不明的大补丁，既无法审查变更意图也无法确认授权",
    scenario: "为一个新工具准备首个外部贡献，从问题到发布完整走查",
    practice: "能提交含测试、说明、来源和许可证边界的最小补丁",
    practiceMode: "design",
    nodes: ["问题共识", "补丁制作", "评审沟通", "发布分发", "许可治理"],
    focuses: ["补丁粒度", "项目命名", "版本发布", "沟通规范", "许可证"],
    boundary: "公开仓库不自动形成开放项目；贡献入口和决策规则必须可见。",
    source: "spdx",
  },
  "taoup-chapter-20-futures": {
    summary: "把书中对 Unix 未来的判断拆成可验证信号，区分稳定原则与过时预测。",
    mechanism:
      "未来章从桌面、开发者迁移、标准、社区和硬件变化识别危机与机会；复核时应使用今日证据更新概率，而不是维护经典文本的权威感。",
    formula: "forecast_confidence = evidence_quality × update_frequency",
    fault: "把已经发生的结果筛回旧预测，忽略当时预测失败的分支",
    scenario: "复核一项关于接口开放性和工具组合的长期预测",
    practice: "能列出预测、可观察信号、失效条件与当前结论",
    practiceMode: "design",
    nodes: ["原始预测", "驱动变量", "现实信号", "反证搜索", "更新结论"],
    focuses: ["危机", "机会", "标准演化", "社区变化", "预测校准"],
    boundary: "没有可证伪信号的未来判断只能作为价值主张，不能作为预测。",
    source: "official",
  },
  "taoup-appendix-a-glossary-of-abbreviations": {
    summary: "把缩写绑定到上下文、完整名称与首次使用位置，避免同形异义。",
    mechanism:
      "缩写表是检索入口而非词汇堆积；每个缩写需要领域、展开形式、章节坐标和冲突说明，才能支持跨章阅读。",
    formula: "term_resolution = abbreviation + domain + first_use",
    fault: "看到 RPC 就假定唯一含义，未检查章节语境和时代用法",
    scenario: "为一组跨网络、语言和工具章节出现的缩写消歧",
    practice: "能从缩写回到定义、章节与相关标准",
    practiceMode: "diagnosis",
    nodes: ["捕获缩写", "展开全称", "绑定领域", "链接首次使用", "冲突消歧"],
    focuses: ["缩写", "全称", "语境", "首次出现", "同形异义"],
    boundary: "只出现一次且无歧义的词不必制造额外缩写负担。",
    source: "official",
  },
  "taoup-appendix-b-references": {
    summary: "按主张、版本、来源类型和可访问性组织参考文献，而不是只保存书名。",
    mechanism:
      "参考文献承担事实回溯：历史主张、标准要求、工具行为和观点评论必须标出不同证据类型，并记录版本与访问路径。",
    formula: "traceability = claim ↔ source ↔ version ↔ location",
    fault: "引用二手摘要支持精确标准要求，却没有核对规范正文",
    scenario: "为一条关于协议兼容性的结论建立可复核来源链",
    practice: "能从课程结论跳到一手来源的具体版本与位置",
    practiceMode: "diagnosis",
    nodes: ["识别主张", "选择来源", "记录版本", "定位证据", "复核可达"],
    focuses: ["一手来源", "版本", "定位", "访问状态", "主张映射"],
    boundary: "来源不可访问或无法支持主张时，应降低结论强度而不是补全想象。",
    source: "official",
  },
  "taoup-appendix-c-contributors": {
    summary: "区分作者、评审者、案例提供者与维护者的贡献责任，不把感谢当背书。",
    mechanism:
      "贡献者记录说明知识如何进入作品，但不同角色只对其实际贡献负责；事实主张仍须回到可核查来源和复现实验。",
    formula: "provenance = contributor_role + contribution + review_scope",
    fault: "因专家姓名出现在名单中，就推断其认可全书每项技术结论",
    scenario: "审查一个案例的作者、事实来源、技术评审与编辑责任",
    practice: "能为贡献声明标出角色、范围和不可推导结论",
    practiceMode: "diagnosis",
    nodes: ["识别角色", "记录贡献", "限定范围", "链接证据", "避免背书推断"],
    focuses: ["作者责任", "案例来源", "技术评审", "编辑贡献", "背书边界"],
    boundary: "贡献名单只能证明参与关系，不能替代许可证或事实验证。",
    source: "official",
  },
  "taoup-appendix-d-rootless-root": {
    summary: "把公案式经验转成可讨论的工程启发，同时保留隐喻与事实的边界。",
    mechanism:
      "无名师公案用冲突和反转挑战执着的工具观；阅读时先识别表层故事，再提出可检验解释和反例，不能把文学隐喻当规范条文。",
    formula: "usable_lesson = metaphor + interpretation + counterexample",
    fault: "引用一句机锋终止技术讨论，却不给成立条件和可观察后果",
    scenario: "把一则关于复杂工具的公案转成团队可评审的设计假设",
    practice: "能提出至少两种解释，并用反例排除过度推广",
    practiceMode: "design",
    nodes: ["读取故事", "识别冲突", "提出解释", "寻找反例", "形成假设"],
    focuses: ["隐喻", "反转", "执着", "工程解释", "反例"],
    boundary: "无法转换为可证伪条件的启发应保留为文化材料，不进入硬门禁。",
    source: "official",
  },
  "taoup-colophon": {
    summary: "从制作说明追踪文本、工具链、格式和发布物之间的可重建关系。",
    mechanism:
      "Colophon 暴露作品如何生产：源格式、转换工具、字体、排版和输出介质共同决定最终页面；任何一步缺失都会让后续版本难以复现。",
    formula: "publication = source × toolchain × assets × build_record",
    fault: "只保存最终 PDF，丢失源文件、字体版本和生成命令",
    scenario: "从源文档重建网页与印刷版，并比较关键结构差异",
    practice: "能记录工具链并在干净环境重建同一发布物",
    practiceMode: "diagnosis",
    nodes: ["源格式", "转换工具", "排版资产", "构建命令", "产物校验"],
    focuses: ["源文件", "工具版本", "字体资产", "可重建", "输出差异"],
    boundary: "像素完全一致不是唯一目标，但内容结构和关键版式必须可验证。",
    source: "git",
  },
  "taoup-index": {
    summary: "把索引作为概念关系与定位工具验证，而不是把词频当成知识覆盖。",
    mechanism:
      "索引项连接术语、别名、主题和出现位置；高质量索引需要消歧、交叉引用和稳定锚点，并通过真实检索任务衡量召回与误报。",
    formula: "search_quality = relevant_hits / inspected_hits",
    fault: "关键词在目录中出现就判定已解释，忽略正文语境和练习证据",
    scenario: "从‘透明性’定位定义、案例、反例和相关章节",
    practice: "能执行检索任务并修复错误锚点、别名遗漏和概念歧义",
    practiceMode: "diagnosis",
    nodes: ["提出检索", "匹配索引", "跳转正文", "核对语境", "补充交叉引用"],
    focuses: ["索引词", "别名", "锚点", "召回率", "误报"],
    boundary: "索引只能帮助定位证据，不能替代正文解释与实践验证。",
    source: "official",
  },
};

const SPECIAL_DESIGNS = {
  map: {
    summary: "把31个正式单元、383个目录节点和四部分依赖组织成可执行学习路径。",
    mechanism:
      "学习地图先从背景建立判断坐标，再经过设计与实现，最后用社区章节检查可持续性；每个正式单元必须同时留下解释、专属视觉、实践和复核证据。",
    formula: "coverage = verified_nodes / 383",
    fault: "按页面数量打勾，却无法从目录节点定位到解释和练习",
    scenario: "为一次完整阅读安排先决关系、复习点与失败回退",
    practice: "能从任一目录节点定位章节、机制实验和复核题",
    practiceMode: "design",
    nodes: ["背景", "设计", "实现", "社区", "全书复核"],
    focuses: ["31个单元", "383个节点", "四部分依赖", "实践证据", "发布门禁"],
    boundary: "只有目录词出现而没有解释、实验和练习时，覆盖率仍记为零。",
    source: "official",
  },
  review: {
    summary: "用一项真实工具改造贯穿哲学、设计、实现、社区与发布证据。",
    mechanism:
      "总复习要求同一变更从问题基线走到边界设计、工具实现、文档协作和可回退发布；任何阶段的输入版本不同，都不能拼成一条合格证据链。",
    formula: "release = scope × design × implementation × community × rollback",
    fault: "各章练习分别成功，却使用不同输入、版本和验收口径",
    scenario: "把一个隐式配置的单体脚本改造成可组合、可移植、可维护的工具",
    practice: "能重放端到端变更并指出第一个证据断点",
    practiceMode: "diagnosis",
    nodes: ["问题基线", "接口设计", "实现验证", "协作交付", "回退复盘"],
    focuses: ["原则选择", "表示协议", "工具链", "文档许可", "发布证据"],
    boundary: "一个阶段无法在干净环境复现时，全书复习不能判定通过。",
    source: "git",
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

function escapeYaml(value) {
  return JSON.stringify(String(value));
}

function conceptKind(concept) {
  if (/Case Study/i.test(concept)) return "案例";
  if (/^Rule of/i.test(concept)) return "规则";
  if (/\b(?:19|20)\d{2}\b|History|Origins|Genesis|Exodus/i.test(concept))
    return "历史阶段";
  if (/^(?:What|Why|How|When|Where|Who|Is|Don't)\b/i.test(concept))
    return "判定问题";
  if (
    /Pattern|Format|Protocol|Language|Files?|Processes?|Tools?/i.test(concept)
  )
    return "机制候选";
  return "主题坐标";
}

function conceptParagraph(concept, design, index) {
  const focus = design.focuses[index % design.focuses.length];
  const kind = conceptKind(concept);
  const lead =
    kind === "案例"
      ? `“${concept}”是用于观察取舍的案例，不是要求照搬的产品推荐。`
      : kind === "规则"
        ? `“${concept}”是一条需要给出适用条件和反例的规则，不能停留在口号。`
        : kind === "历史阶段"
          ? `“${concept}”标定了约束变化的历史阶段，应区分同期证据与事后解释。`
          : kind === "判定问题"
            ? `“${concept}”提出本单元必须回答的判定问题，结论需要允许被反证。`
            : kind === "机制候选"
              ? `“${concept}”是本单元比较的机制候选，名称本身不代表应当采用。`
              : `“${concept}”把本单元的总机制细化为一个可定位的主题坐标。`;
  return `${lead} 在“${design.mechanism}”这条因果链中，本节点重点检查${focus}：先写预期，再改变一个直接条件，并用${design.boundary}作为停止或继续的边界。`;
}

function termsFor(profile) {
  return [...new Set([profile.title, ...profile.design.focuses])].slice(0, 6);
}

function actionsFor(profile) {
  const [a, b, c, d, e] = profile.design.focuses;
  return [
    {
      label: `收窄${a}`,
      detail: `只改变${a}，保留${b}与${c}的原始基线。`,
    },
    {
      label: `显式化${c}`,
      detail: `把${c}的输入、输出和失败状态写入可检查记录。`,
    },
    {
      label: `绕过${d}`,
      detail: `跳过${d}直接追求${e}，用来观察局部捷径的系统代价。`,
    },
  ];
}

function wrapperSource(profile) {
  const base = pascal(profile.chapterSlug);
  const common = {
    unitId: profile.chapterSlug,
    title: profile.title,
    question: profile.design.scenario,
    nodes: profile.design.nodes,
    concepts: profile.concepts.length
      ? profile.concepts
      : profile.design.focuses,
    actions: actionsFor(profile),
    boundaryNote: profile.design.boundary,
    faultNote: `拒绝原因：${profile.design.fault}。`,
  };
  const views = [
    ["Topology", "topology"],
    ["Representation", "representation"],
    ["Evidence", "evidence"],
  ];
  return `import { UnixDecisionLab } from "./unix-decision-lab";\n\nconst shared = ${JSON.stringify(common, null, 2)} as const;\n\n${views
    .map(
      ([suffix, view]) =>
        `export function ${base}${suffix}Lab() {\n  return <UnixDecisionLab {...shared} view=${JSON.stringify(view)} />;\n}`,
    )
    .join("\n\n")}\n`;
}

function sourceCallout(profile) {
  const fact = FACT_SOURCES[profile.design.source] ?? FACT_SOURCES.official;
  return `<Callout type="info" title="来源层级与时代边界">\n  **${profile.title}** 以 [作者官网完整送印版](${OFFICIAL_URL}) 核定正式章节、案例与 2003 年语境，以 [Pearson 第一版书目页](${PUBLISHER_URL}) 交叉核对作者、版本和出版身份，并用 [${fact.label}](${fact.url}) 复核仍在使用的接口、协议或协作边界。在线原作采用 CC BY-ND 1.0；本课程不声称获得改编授权，而是独立组织中文解释、实验和练习，不复制原文表述、插图或案例代码。\n</Callout>`;
}

function renderTerms(profile) {
  const terms = termsFor(profile);
  return {
    inline: terms
      .map(
        (term, index) =>
          `<Term def={${JSON.stringify(`${term}在${profile.title}中对应${profile.design.nodes[index % profile.design.nodes.length]}的可复核状态。`)}}>${term}</Term>`,
      )
      .join(" · "),
    glossary: terms
      .map(
        (term, index) =>
          `<GlossaryItem term=${JSON.stringify(term)}>${profile.design.focuses[index % profile.design.focuses.length]}的检查入口；必须能回到输入、状态与失败证据。</GlossaryItem>`,
      )
      .join("\n"),
  };
}

function renderChapter(profile, previous, next) {
  const base = pascal(profile.chapterSlug);
  const terms = renderTerms(profile);
  const conceptSections = profile.concepts
    .map(
      (concept, index) =>
        `### ${concept}\n\n${conceptParagraph(concept, profile.design, index)}`,
    )
    .join("\n\n");
  const conceptChecklist = profile.concepts.length
    ? profile.concepts.join("；")
    : profile.design.focuses.join("；");
  const codeSection = profile.design.code
    ? `\n## 可执行切片\n\n这段最小命令只展示 ${profile.title} 的证据接口；运行前应固定工具版本与输入，运行后检查退出码和差异。\n\n\`\`\`text\n${profile.design.code}\n\`\`\`\n`
    : "";
  const previousLink = previous
    ? `- [上一页：${previous.title}](/learn/${BOOK}/${previous.sectionSlug}/${previous.chapterSlug})`
    : "- 这是本书学习路径的起点。";
  const nextLink = next
    ? `- [下一页：${next.title}](/learn/${BOOK}/${next.sectionSlug}/${next.chapterSlug})`
    : "- 这是本书学习路径的终点。";
  return `---
title: ${escapeYaml(profile.title)}
type: ${profile.type}
section: ${escapeYaml(profile.section)}
order: ${profile.order}
description: ${escapeYaml(profile.design.summary)}
demo: true
math: true
sourceUrl: ${escapeYaml(OFFICIAL_URL)}
qualityVersion: 2
practiceMode: ${profile.design.practiceMode}
sourceMode: independent-rewrite
draft: false
${profile.isFormal ? `officialUnitId: ${escapeYaml(profile.chapterSlug)}\n` : ""}---

import {
  ${base}TopologyLab,
  ${base}RepresentationLab,
  ${base}EvidenceLab,
} from "@/components/mdx/art-of-unix-programming/diagrams/${profile.chapterSlug}";
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
- 能沿 ${profile.design.nodes.join(" → ")} 重建输入、状态、输出和失败边界
- 能使用 ${profile.design.formula} 比较正常输入、恰好边界与单点故障
- ${profile.design.practice}

</Objectives>

## 为什么要从这个问题开始

${profile.design.summary} ${profile.design.mechanism} 在本课程中，Unix 风格只是一组待验证假设；当延迟、安全、事务一致性、团队能力或平台约束改变时，允许用证据拒绝它。

${sourceCallout(profile)}

## 直觉、对象与计算合同

贯穿场景是：**${profile.design.scenario}**。先固定输入版本、资源预算和成功条件，再观察 ${profile.design.focuses[0]}、${profile.design.focuses[2]} 与 ${profile.design.focuses[4]}；若中途改了数据或口径，结果作废。

$$
${profile.design.formula}
$$

这个式子用于公开变量关系，不冒充经验常数。${profile.design.boundary} 需要特别防范的失败是：**${profile.design.fault}**。

${terms.inline}

## 正式目录节点：解释与验证

下面逐项保留作者送印版目录坐标。每一项都放回 ${profile.title} 的机制链解释，并在页面实验组件与章末复核清单中再次出现；标题出现本身不计作覆盖。

${conceptSections}
${codeSection}
## 三视图实验：先预测，再操作

<Callout type="info" title="操作约束">
  先预测哪一个指标会越界，再选择一个动作；正常输入证明主链可行，恰好边界确定停止条件，单点故障必须显示拒绝原因。最后点击重置，确认三个指标、节点与动作全部回到同一基线。
</Callout>

<Stepper>
  <Step title="1. 组合拓扑">
    沿 ${profile.design.nodes.join(" → ")} 定位职责和失败传播，只允许改变一个直接条件。
    <${base}TopologyLab />
  </Step>
  <Step title="2. 表示选择">
    比较 ${profile.design.focuses[1]} 与 ${profile.design.focuses[3]} 的表达和转换代价，拒绝隐藏状态。
    <${base}RepresentationLab />
  </Step>
  <Step title="3. 证据门禁">
    用 ${profile.design.practice} 作为通过条件，保存首个偏离和可重放回退。
    <${base}EvidenceLab />
  </Step>
</Stepper>

## 常见误区

<Callout type="trap" title="不要把 Unix 风格当成装饰">
  ${profile.title} 的典型误用是“${profile.design.fault}”。修正方法不是换一句格言，而是回到 ${profile.design.nodes[0]}，保持输入不变，只修改一项设计并重放到 ${profile.design.nodes.at(-1)}。
</Callout>

<Callout type="trap" title="不要把 2003 年工具选择当成永恒排名">
  本章的案例和判断必须保留硬件、网络、许可与工具生态的时代条件。迁移到今天时，应先复核 ${profile.design.focuses[0]} 与 ${profile.design.focuses[4]}，再决定原则是否仍成立。
</Callout>

<Callout type="trap" title="不要用最终输出掩盖中间越界">
  即使结果看似正确，只要“${profile.design.boundary}”没有保持，或故障“${profile.design.fault}”未被明确拒绝，本次设计仍不合格。
</Callout>

## 术语

<Glossary>
${terms.glossary}
</Glossary>

## 练习与答案

<Exercises>

1. **问题 1：目录证据复核。** 选择三个相邻目录节点，说明它们在 ${profile.title} 中的因果关系，并指出各自的实验与练习证据。

<Answer>
  先从以下正式节点中选择相邻项：${conceptChecklist}。对每项分别写“它改变了什么状态”“结果从哪里可见”“哪个失败会推翻结论”，再在三视图实验中切换一次动作并保存轨迹。
</Answer>

2. **问题 2：故障诊断。** 在“${profile.design.scenario}”中注入“${profile.design.fault}”，第一处应该拒绝结果的位置在哪里？

<Answer>
  从 ${profile.design.nodes[0]} 顺序重放；一旦 ${profile.design.focuses[2]} 与预期分叉，就停止传播并保存输入、动作和状态。只有修复后正常与边界轨迹都恢复，才允许继续到 ${profile.design.nodes.at(-1)}。
</Answer>

3. **问题 3：方案判断。** 什么情况下应该拒绝本章首选的 Unix 风格方案？

<Answer>
  ${profile.design.boundary} 若候选方案仍无法满足这一边界，就记录拒绝理由与替代方案，而不是通过调低指标掩盖失败。
</Answer>

</Exercises>

## 本章小结

${profile.title} 的核心不是记住目录名，而是用 ${profile.design.nodes.join("、")} 把 ${profile.design.focuses.join("、")} 连成一条可反驳、可重放、可撤回的证据链。最终验收是：${profile.design.practice}。

## 前后导航

${previousLink}
${nextLink}

<Attribution
  mode="independent-rewrite"
  sourceBasis="full-text"
  workTitle=${JSON.stringify(WORK_TITLE)}
  adaptedUrl=${JSON.stringify(OFFICIAL_URL)}
/>
`;
}

function replaceBookManifest(document, bookSlug, value) {
  const key = `  ${JSON.stringify(bookSlug)}: `;
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

const files = walkMdx(BOOK_DIR);
const pageBySlug = new Map();
for (const filePath of files) {
  const parsed = matter(fs.readFileSync(filePath, "utf8"));
  const chapterSlug = path.basename(filePath, ".mdx");
  pageBySlug.set(chapterSlug, {
    filePath,
    relativePath: path.relative(ROOT, filePath).replaceAll(path.sep, "/"),
    sectionSlug: path.basename(path.dirname(filePath)),
    chapterSlug,
    title: String(parsed.data.title ?? chapterSlug),
    section: String(parsed.data.section ?? "UNIX编程艺术（2012中文版）"),
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
    isFormal: true,
    concepts: unit.concepts.map((alternatives) => alternatives[0]),
    conceptAlternatives: unit.concepts,
    design,
  });
}

for (const [chapterSlug, design] of [
  ["taoup-official-learning-map", SPECIAL_DESIGNS.map],
  ["taoup-official-final-review", SPECIAL_DESIGNS.review],
]) {
  const page = pageBySlug.get(chapterSlug);
  if (!page) throw new Error(`缺少页面：${chapterSlug}`);
  profiles.push({
    ...page,
    isFormal: false,
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
      sourceAccess: "full-text-primary",
      scope: { formalUnits: 31, outlineNodes: 383, pages: 33 },
      profiles: profiles.map(({ filePath: _filePath, ...profile }) => profile),
    },
    null,
    2,
  )}\n`,
);

for (const [index, profile] of profiles.entries()) {
  const previous = profiles[index - 1] ?? null;
  const next = profiles[index + 1] ?? null;
  fs.writeFileSync(profile.filePath, renderChapter(profile, previous, next));
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
  sourceAccess: "full-text-primary",
  sourceMode: "independent-rewrite",
  sourceUrl: OFFICIAL_URL,
  factSources: FACT_SOURCES,
  verifiedAt: "2026-07-30",
  coverage: { formalUnits: 31, outlineNodes: 383, pages: 33 },
  unitMappingEvidence: "quality/art-of-unix-programming-v2-profiles.json",
  factSourcePolicy:
    "作者官网完整送印版核定章节、案例与时代语境，Pearson 核定版次身份；POSIX、RFC、Git 与 SPDX 只用于复核仍在使用的标准、工具和许可事实。",
  disclosureNote:
    "作者官网公开完整送印版用于核定31个正式单元、381个层级目录节点及时代语境；中文版另列Colophon与索引，课程共映射383个节点。在线原作链接CC BY-ND 1.0，因此课程不声称获得改编授权：正文、图示、实验、代码与练习均为独立教学重写，不复制原文表达、插图或案例代码。",
  units: manifest.units.map((unit) => ({
    ...unit,
    sourceUnitId: unit.id,
    chapterPath: chapterPaths.get(unit.id),
    sourceMode: "independent-rewrite",
    sourceAccess: "full-text-primary",
    factSourceIds: [
      ...new Set(["official", "publisher", DESIGNS[unit.id].source]),
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
