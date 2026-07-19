#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import matter from "gray-matter";

const ROOT = process.cwd();
const BOOK = "code-complete-2e";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const DIAGRAM_ROOT = path.join(
  ROOT,
  "src/components/mdx/code-complete-2e/diagrams",
);
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/code-complete-2e-v2-profiles.json",
);
const GLOBAL_COMPONENTS_PATH = path.join(
  ROOT,
  "src/components/mdx/mdx-components.tsx",
);
const SCOPE_URL = "https://book.douban.com/reading/10145819/";

const SOURCES = {
  scope: {
    title: "2006 中文第 2 版公开试读目录",
    url: SCOPE_URL,
    kind: "public-preview-complete-toc",
  },
  publisher: {
    title: "Microsoft Press《Code Complete, 2nd Edition》官方页面",
    url: "https://www.microsoftpressstore.com/store/code-complete-9780735619678",
    kind: "publisher-primary-metadata-and-sample",
  },
  swebok: {
    title: "IEEE Computer Society SWEBOK v4.0a",
    url: "https://www.computer.org/education/bodies-of-knowledge/software-engineering/v4",
    kind: "professional-body-primary",
  },
  cpp: {
    title: "C++ Core Guidelines",
    url: "https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines",
    kind: "language-guidelines-primary",
  },
  cwe: {
    title: "MITRE CWE-20 Improper Input Validation",
    url: "https://cwe.mitre.org/data/definitions/20.html",
    kind: "weakness-catalog-primary",
  },
  owasp: {
    title: "OWASP Code Review Guide",
    url: "https://owasp.org/www-project-code-review-guide/",
    kind: "security-guidance-primary",
  },
  nist: {
    title: "NIST SP 800-218 Secure Software Development Framework",
    url: "https://csrc.nist.gov/pubs/sp/800/218/final",
    kind: "government-standard-primary",
  },
  git: {
    title: "Git 官方教程",
    url: "https://git-scm.com/docs/gittutorial",
    kind: "tool-documentation-primary",
  },
  ecma: {
    title: "ECMAScript Language Specification",
    url: "https://tc39.es/ecma262/",
    kind: "language-specification-primary",
  },
};

const F = String.raw;
const K = (
  family,
  practice,
  mechanism,
  formula,
  fault,
  before,
  after,
  source,
) => ({ family, practice, mechanism, formula, fault, before, after, source });

const KNOWLEDGE = {
  map: K(
    "scope",
    "design",
    "学习地图按构建基础、代码结构、数据与控制、质量改善、系统工艺建立依赖图，每个节点只有在解释、视觉、实践与复核四类证据齐全时才解锁",
    F`coverage=\frac{nodes_{explained\cap visualized\cap practiced}}{685}`,
    "只按页数或标题打勾，跳过先决条件和四级证据",
    "把 51 页当作平铺目录",
    "按依赖和证据推进整本构建课程",
    "publisher",
  ),
  review: K(
    "quality",
    "diagnosis",
    "总复习以一个可审查变更贯穿需求边界、设计、实现、测试、集成、发布和回退，并在每一段保留首个偏离点",
    F`release=scope\times design\times code\times tests\times integration\times rollback`,
    "各章都能复述，却无法用同一变更重建跨章证据链",
    "孤立记忆章节结论",
    "用端到端构建证据裁决发布",
    "swebok",
  ),
  "cc2e-preface": K(
    "scope",
    "design",
    "前言界定第二版的对象、软件构建范围和使用方式，版本元数据与教学内容必须分层记录",
    F`scope=edition\cap audience\cap construction\ activities`,
    "把版本介绍误当作正文授权，或把现代实践倒灌为原书原话",
    "模糊的经典书印象",
    "可核对的版次与学习合同",
    "publisher",
  ),
  "cc2e-acknowledgments": K(
    "provenance",
    "diagnosis",
    "鸣谢页用于识别研究、评审、翻译和出版贡献的不同责任，不把被感谢等同于对每条技术主张背书",
    F`claim\ confidence=f(source,review,replication,version)`,
    "把贡献者名单当作许可声明或事实证明",
    "只有作者名字的来源链",
    "按贡献类型追踪主张来源",
    "publisher",
  ),
  "cc2e-checklist-index": K(
    "quality",
    "design",
    "核对表索引把具体构建任务连到进入条件、逐项判断、拒绝理由和证据位置，勾选动作本身不构成通过",
    F`gate=\bigwedge_{i=1}^{n}(condition_i\land evidence_i)`,
    "为了达到完成率而勾选不适用或没有证据的条目",
    "无上下文的清单",
    "能拒绝缺证据结论的任务门禁",
    "nist",
  ),
  "cc2e-table-index": K(
    "provenance",
    "calculation",
    "表目录用于核对表号、变量定义、单位、样本、版本和比较口径，再决定表中差异是否支持结论",
    F`comparable\iff unit_a=unit_b\land denominator_a=denominator_b`,
    "直接比较不同分母、年份或项目规模的数据",
    "表格数值即结论",
    "口径一致后再做定量判断",
    "swebok",
  ),
  "cc2e-figure-index": K(
    "design",
    "diagnosis",
    "图目录要求把节点解释为对象或状态、把边解释为数据或控制变化，并用代码轨迹验证方向和边界",
    F`diagram=(nodes,typed\ edges,invariants,counterexample)`,
    "把装饰箭头当成因果关系，图中没有状态和反例",
    "看图识名词",
    "从图重建可失败的机制",
    "swebok",
  ),
  "cc2e-part-01-foundations": K(
    "planning",
    "design",
    "基础部分先界定构建活动，再用隐喻辅助思考、冻结需求与架构先决条件，最后记录语言和约定决定",
    F`readiness=scope\times requirements\times architecture\times conventions`,
    "未准备需求和架构便开始编码，再用返工掩盖前置缺口",
    "凭直觉立即动工",
    "有边界、有依据的构建基线",
    "swebok",
  ),
  "cc2e-01-construction-world": K(
    "scope",
    "design",
    "软件构建把详细设计、编码、开发者测试、调试和集成连成可管理活动，并明确与需求、架构、系统测试和运维的交接",
    F`construction=design_{detail}+coding+unit\ test+debug+integration`,
    "把所有开发活动都叫编码，导致输入、产物和完成标准失焦",
    "构建是敲代码",
    "构建边界和交接证据清晰",
    "publisher",
  ),
  "cc2e-02-software-metaphors": K(
    "design",
    "design",
    "隐喻只提供候选结构和问题视角，必须列出映射成立处、遗漏处、反例和退出条件，再转化为工程决定",
    F`useful(m)=explanatory\ power-cost_{mismatch}`,
    "把隐喻当作系统事实，强迫所有对象服从类比",
    "用一个故事替代设计",
    "以反例约束的多模型推理",
    "swebok",
  ),
  "cc2e-03-prerequisites": K(
    "planning",
    "design",
    "前期准备把问题定义、稳定需求、架构风险和生命周期约束变成构建就绪清单，高风险未知项先做探针而非批量编码",
    F`rework\ risk\propto ambiguity\times change\ cost`,
    "在核心需求和架构边界仍不确定时扩大实现规模",
    "不确定性留到编码后",
    "先消除高代价未知项",
    "swebok",
  ),
  "cc2e-04-construction-decisions": K(
    "planning",
    "design",
    "构建决策根据产品约束选择语言、工具、编码约定、复用策略和质量实践，并保存备选方案与触发重审的条件",
    F`decision=arg\min_a(cost_a+risk_a+lockin_a)`,
    "先选熟悉工具，再倒推问题以适配工具",
    "偏好主导技术选择",
    "约束、证据和退出条件主导选择",
    "swebok",
  ),
  "cc2e-part-02-high-quality-code": K(
    "design",
    "design",
    "高质量代码从控制复杂度开始，通过抽象、类与子程序建立契约，在边界防御错误，并用伪代码过程逐步落地",
    F`quality=clarity\times contracts\times fault\ containment\times verification`,
    "类、函数和异常各自存在，却没有共同不变量",
    "语法正确即高质量",
    "结构与验证共同承载意图",
    "cpp",
  ),
  "cc2e-05-design-in-construction": K(
    "design",
    "design",
    "构建设计把复杂场景分解为职责、抽象层、接口和数据所有权，并用最小代码实验迭代验证高风险决定",
    F`complexity_{visible}=complexity_{essential}+complexity_{accidental}`,
    "一次画完全部设计且没有可运行反馈，错误抽象被大规模复制",
    "设计是一次性文档",
    "设计假设由小步实现持续检验",
    "cpp",
  ),
  "cc2e-06-working-classes": K(
    "abstraction",
    "code",
    "可工作的类用不变量约束状态，以最小接口暴露稳定能力，通过封装、组合或受控继承管理变化",
    F`valid(object)\iff invariant(constructor)\land invariant(after\ public\ call)`,
    "公开可变字段或半初始化对象让调用者绕过不变量",
    "类只是数据与函数容器",
    "类在生命周期内守住抽象合同",
    "cpp",
  ),
  "cc2e-07-high-quality-routines": K(
    "routine",
    "code",
    "高质量子程序承担一个可命名职责，参数表达输入输出合同，控制路径和错误语义足够局部，调用者无需阅读实现即可正确使用",
    F`routine=precondition\rightarrow single\ responsibility\rightarrow postcondition`,
    "布尔开关、隐式全局状态和混合层次让一个函数承担多个原因变化",
    "函数只是可复用代码段",
    "调用边界压缩可靠推理",
    "cpp",
  ),
  "cc2e-08-defensive-programming": K(
    "defensive",
    "diagnosis",
    "防御式编程在信任边界验证外部数据，在内部用断言暴露不可能状态，并为错误、异常和恢复定义一致策略",
    F`safe\ result=validate(input)\land preserve(invariant)\land contain(failure)`,
    "吞掉异常或用默认值继续，使坏状态越过边界后才爆炸",
    "相信所有调用者和输入",
    "错误在最近边界被拒绝或隔离",
    "cwe",
  ),
  "cc2e-09-pseudocode-programming-process": K(
    "routine",
    "code",
    "伪代码编程过程先以问题域语言写职责和分支，再逐层细化为实现，代码、命名与测试同时复核原意",
    F`implementation=refine(problem\ intent,one\ level\ at\ a\ time)`,
    "伪代码直接混入语法细节，尚未理清职责就被语言结构锁定",
    "从空编辑器直接拼语句",
    "从意图逐步收敛到可测实现",
    "cpp",
  ),
  "cc2e-part-03-variables": K(
    "data",
    "diagnosis",
    "变量部分把业务量映射为类型和名称，缩短作用域与存活期，并对指针、共享和全局状态设置所有权边界",
    F`state\ risk\propto scope\times lifetime\times writers`,
    "同一变量跨阶段复用且由多个位置修改",
    "变量是随处可用的存储格",
    "状态含义、所有权和生命期明确",
    "cpp",
  ),
  "cc2e-10-general-variable-use": K(
    "data",
    "code",
    "变量应在已知含义和类型后定义，在所有读取路径前初始化，保持最小作用域、最短存活期和单一用途",
    F`live\ range=last\ use-first\ definition`,
    "依赖隐式默认值或在分支中漏初始化，错误只在特定路径出现",
    "先声明再寻找用途",
    "定义、初始化、使用和结束紧邻",
    "cpp",
  ),
  "cc2e-11-power-of-variable-names": K(
    "readability",
    "design",
    "变量名编码问题域概念、单位和角色，长度随作用域调整，项目规则统一缩写并排除误导或过时名称",
    F`name\ value=domain\ meaning+role+unit-ambiguity`,
    "名称描述历史实现而非当前含义，读者据此做出错误假设",
    "短名字减少键入",
    "名称降低跨时间理解成本",
    "cpp",
  ),
  "cc2e-12-fundamental-data-types": K(
    "data",
    "calculation",
    "基本类型选择必须覆盖业务范围、精度、编码和运算规则，边界样本验证溢出、舍入、枚举和常量语义",
    F`valid\ type\iff domain\ range\subseteq representation\ range`,
    "用浮点表示精确金额，或在定宽整数乘法后才检查溢出",
    "类型只影响存储大小",
    "表示范围和业务合同一致",
    "cpp",
  ),
  "cc2e-13-unusual-data-types": K(
    "data",
    "diagnosis",
    "结构、指针和全局数据必须声明所有权、别名、可变性和生命周期；访问接口守住释放、空值与共享边界",
    F`safe\ reference=valid\ owner\land live\ object\land permitted\ access`,
    "释放后仍保留别名，或让全局可变状态成为隐藏输入",
    "地址等同于对象",
    "引用有效性和共享责任可追踪",
    "cpp",
  ),
  "cc2e-part-04-statements": K(
    "control",
    "code",
    "语句部分按依赖组织直线代码，以清晰条件、循环不变量和表驱动规则表达控制，并用路径复杂度复核特殊结构",
    F`control\ clarity=visible\ order+complete\ branches+loop\ invariant`,
    "控制结构合法但进入、退出和默认路径不可解释",
    "能运行的语句集合",
    "可预测且可覆盖的控制合同",
    "ecma",
  ),
  "cc2e-14-straight-line-code": K(
    "control",
    "code",
    "直线代码先满足真实数据依赖，再把同一概念层的语句聚集；无依赖时选择最能暴露意图和错误的顺序",
    F`A\prec B\iff output(A)\cap input(B)\neq\varnothing`,
    "依靠偶然顺序或远距离副作用，移动语句后行为静默改变",
    "文本顺序就是逻辑顺序",
    "依赖和概念边界都可见",
    "ecma",
  ),
  "cc2e-15-conditionals": K(
    "control",
    "code",
    "条件语句优先展示正常路径，互斥分支完整覆盖输入域，复杂条件命名，默认分支明确接受、拒绝或不可达",
    F`domain=\bigcup branches,\quad branches_i\cap branches_j=\varnothing`,
    "条件重叠、遗漏边界或空默认分支，使输入落入错误路径",
    "if 能通过样例即可",
    "每个输入有唯一且可说明的分支",
    "ecma",
  ),
  "cc2e-16-loops": K(
    "control",
    "calculation",
    "循环用初始化、继续条件、不变量、进展量和退出后置条件建立证明，并对零次、一次、末端和越界邻域测试",
    F`invariant\land guard\land progress\Rightarrow postcondition`,
    "索引与集合长度错一位，或循环体不保证向退出条件推进",
    "重复执行某段代码",
    "边界与终止都能推导",
    "cpp",
  ),
  "cc2e-17-unusual-control-structures": K(
    "control",
    "diagnosis",
    "多返回、递归和跳转只有在缩短错误路径或直接表达问题结构时才使用，并显式证明资源清理、终止与可读性收益",
    F`T(n)=T(smaller(n))+combine(n)`,
    "递归未严格缩小问题，或提前返回绕过清理和不变量恢复",
    "特殊结构天然危险或天然简洁",
    "以路径证据判断结构取舍",
    "cpp",
  ),
  "cc2e-18-table-driven-methods": K(
    "control",
    "design",
    "表驱动方法把稳定规则从分支代码移入数据，以直接、索引或阶梯访问选择结果，并验证键域、顺序和缺省项",
    F`result=table[key]\quad or\quad table[lower\ bound(key)]`,
    "表中缺键、区间未排序或默认值掩盖配置错误",
    "规则散落在条件链",
    "规则数据可审查且访问合同明确",
    "cpp",
  ),
  "cc2e-19-general-control-issues": K(
    "control",
    "diagnosis",
    "一般控制问题把布尔表达式、块结构、嵌套深度和路径数作为认知负担处理，以早拒绝、命名条件和分解降低复杂度",
    F`V(G)=E-N+2P`,
    "为了减少行数压缩条件，路径数量和副作用次序反而更难验证",
    "简短代码等于简单控制",
    "控制路径可数、可命名、可测试",
    "cpp",
  ),
  "cc2e-part-05-code-improvement": K(
    "quality",
    "diagnosis",
    "代码改善从质量目标出发，用协同检查和开发者测试发现问题，以调试定位、重构保行为、性能测量验证改进",
    F`improvement=detect\rightarrow explain\rightarrow change\rightarrow regress`,
    "同时修复、重构和调优，结果变好却无法归因",
    "凭感觉做大改",
    "每次改进都有基线与回归证据",
    "swebok",
  ),
  "cc2e-20-software-quality-landscape": K(
    "quality",
    "design",
    "质量目标必须区分正确性、可靠性、可维护性、性能和安全等属性，再为各属性选择预防、检测和修复技术",
    F`DRE=\frac{removed_{pre}}{removed_{pre}+escaped}`,
    "用单一覆盖率或缺陷数代表全部质量属性",
    "质量是一个总分",
    "质量属性、技术和证据逐项对应",
    "swebok",
  ),
  "cc2e-21-collaborative-construction": K(
    "collaboration",
    "diagnosis",
    "结对、走查和正式检查以不同成本提供实时反馈或独立缺陷发现；产物、角色、准备、记录和心理安全共同决定效果",
    F`review\ yield=\frac{valid\ defects\ found}{review\ time}`,
    "评审讨论个人风格和作者能力，而不检查可验证的代码风险",
    "多人看过就算协作",
    "角色清楚且缺陷可复盘的协同",
    "owasp",
  ),
  "cc2e-22-developer-testing": K(
    "testing",
    "code",
    "开发者测试从需求和代码结构导出正常、边界、错误与独立路径用例，脚手架保证隔离、可重复和失败可诊断",
    F`tests=equivalence\ classes+boundaries+error\ paths+independent\ paths`,
    "只写会通过的正常样例，或断言最终输出却不定位首差",
    "运行过就是测试",
    "测试能稳定暴露指定故障",
    "nist",
  ),
  "cc2e-23-debugging": K(
    "diagnosis",
    "diagnosis",
    "调试先稳定复现，列出相互竞争的原因假设，用最小区分实验定位首差，只修正根因并保留回归样本",
    F`best\ probe=arg\max_p information\ gain(p)`,
    "边观察边改多个位置，症状消失后无法说明原因",
    "猜一个地方直接修",
    "证据逐步排除假设并复现根因",
    "swebok",
  ),
  "cc2e-24-refactoring": K(
    "refactoring",
    "code",
    "重构在外部可观察行为被测试冻结后，以小步可逆变换改善命名、数据、条件、子程序、类和接口结构",
    F`behavior(before,input)=behavior(after,input)`,
    "没有行为基线便大范围改写，功能变化混入结构变化",
    "重构等于重写",
    "每一步结构改善且行为不变",
    "cpp",
  ),
  "cc2e-25-code-tuning-strategies": K(
    "performance",
    "calculation",
    "代码调整先定义性能目标和负载，测量真实热点，比较算法、架构和局部优化方案，再以统计复测裁决收益与代价",
    F`speedup=\frac{T_{baseline}}{T_{candidate}}`,
    "优化未经测量的代码，或只报最好一次运行",
    "更聪明的代码自然更快",
    "热点、收益和质量取舍可量化",
    "cpp",
  ),
  "cc2e-26-code-tuning-techniques": K(
    "performance",
    "code",
    "调整技术针对已证热点改变逻辑、循环、数据变换、表达式或低级操作，一次只改一项并检查正确性、可读性与可移植性",
    F`T_{total}=T_{fixed}+nT_{loop}+T_{memory}+T_{I/O}`,
    "多项微优化叠加后只看总时间，无法识别无效或有害改动",
    "套用技巧清单",
    "单点技术由基准和回归共同验收",
    "cpp",
  ),
  "cc2e-part-06-system-considerations": K(
    "delivery",
    "design",
    "系统考虑把规模、管理、配置、集成和工具放进同一交付模型，使每个构件和变更都有身份、顺序、验证与恢复路径",
    F`delivery=configuration\times integration\times verification\times recovery`,
    "只管理最终二进制，不追踪构件来源和集成顺序",
    "代码完成即系统完成",
    "构件从变更到发布全程可追踪",
    "swebok",
  ),
  "cc2e-27-program-size": K(
    "scale",
    "calculation",
    "程序规模改变沟通网络、缺陷分布、生产率和活动比例，方法必须随团队和系统边界调整，不能线性外推小项目经验",
    F`communication\ channels=\frac{n(n-1)}{2}`,
    "把人数或代码量翻倍直接当作工期减半，忽略协调和集成成本",
    "规模只改变数量",
    "规模变化触发组织与实践重配",
    "swebok",
  ),
  "cc2e-28-managing-construction": K(
    "planning",
    "design",
    "构建管理通过编码标准、配置基线、工作分解、风险估算、度量和环境支持形成反馈，不用单一产出数字评价个人",
    F`forecast=remaining\ work/validated\ throughput`,
    "把代码行数或任务数作为个人绩效，诱导拆分和隐瞒质量问题",
    "管理是催进度",
    "可解释的基线、风险和反馈管理",
    "swebok",
  ),
  "cc2e-29-integration": K(
    "delivery",
    "simulation",
    "集成按风险和依赖选择顺序，保持主线可构建，以小批次合并、自动构建、冒烟和回归快速定位接口差异",
    F`integration\ risk\propto batch\ size\times dependency\ fanout`,
    "长期分支在末期一次性合并，多个接口变化同时爆发",
    "最后把模块拼起来",
    "小步集成且每步可定位可回退",
    "git",
  ),
  "cc2e-30-programming-tools": K(
    "tooling",
    "design",
    "工具链覆盖设计、编辑、静态分析、构建、测试、调试、版本控制和性能测量，每个工具都要记录输入、版本、盲区与失败策略",
    F`automation\ value=repeatability+feedback\ speed-maintenance\ cost`,
    "把工具无输出解释为没有问题，忽略配置、覆盖范围和误报漏报",
    "安装更多工具",
    "工具能力与人工判断边界透明",
    "nist",
  ),
  "cc2e-part-07-software-craftsmanship": K(
    "craft",
    "design",
    "软件工艺把布局、说明、个人习惯、问题域抽象、反复试验和持续学习组合成面向人类读者的长期实践",
    F`craft=judgment\times discipline\times feedback\times revision`,
    "把风格规范当作终点，忽略问题域与反馈",
    "工艺是个人审美",
    "判断与纪律在证据中迭代",
    "swebok",
  ),
  "cc2e-31-layout-and-style": K(
    "readability",
    "design",
    "布局以暴露结构和差异为目标，空白、括号、换行和文件组织由自动格式化保持一致，例外必须改善真实阅读任务",
    F`review\ load\propto incidental\ formatting\ choices+hidden\ structure`,
    "手工对齐制造巨大无意义 diff，或用格式隐藏复杂表达式",
    "漂亮排版就是好风格",
    "格式稳定并服务结构阅读",
    "cpp",
  ),
  "cc2e-32-self-documenting-code": K(
    "readability",
    "diagnosis",
    "自说明代码用名称、类型、结构和测试表达可检查意图；注释补充原因、约束和非显然取舍，并与代码共同更新",
    F`useful\ comment=why+constraint+decision-not(restate(code))`,
    "注释重复旧行为，代码改变后反而误导读者",
    "注释越多越清楚",
    "代码表达做什么，注释解释为何如此",
    "cpp",
  ),
  "cc2e-33-personal-character": K(
    "growth",
    "design",
    "专业成长把谦虚、求知、诚实、沟通、创造力和纪律落实为可观察习惯：承认未知、寻求反馈、报告失败并修订做法",
    F`learning\ rate=practice\times feedback\times honest\ revision`,
    "把自信、经验或长时间工作误当作正确性证据",
    "性格与工程无关",
    "行为习惯持续改善技术判断",
    "swebok",
  ),
  "cc2e-34-software-craftsmanship": K(
    "craft",
    "design",
    "软件工艺通过分层抽象控制复杂度，以问题域语言表达意图，借规范腾出注意力，并用反复试验和折中判断适配情境",
    F`decision=principle+context+experiment+tradeoff`,
    "顽固执行单一规则，遇到反例只增加例外而不重审模型",
    "寻找永远正确的规则",
    "原则在情境和实验中接受检验",
    "swebok",
  ),
  "cc2e-35-more-information": K(
    "growth",
    "design",
    "继续学习从能力缺口出发选择综述、专业主题、期刊和社群，把阅读转成实践产物并通过同行反馈修订路线",
    F`learning\ value=relevance\times practice\times feedback`,
    "收藏大量资料却没有问题、产物和复核期限",
    "阅读数量等于能力",
    "资料选择进入行动反馈闭环",
    "swebok",
  ),
  "cc2e-references": K(
    "provenance",
    "diagnosis",
    "参考文献页把章节主张连到可定位来源，核对作者、年份、版本、方法与上下文，并在来源冲突时记录裁决理由",
    F`traceability=claim\rightarrow source\rightarrow method\rightarrow conclusion`,
    "只列书名或链接，不说明它支持哪条主张",
    "参考文献是装饰列表",
    "每条重要主张可追溯和复核",
    "publisher",
  ),
  "cc2e-index": K(
    "scope",
    "design",
    "索引把问题术语、同义词和交叉引用连到多个章节语境，读者从故障或概念反向构造学习路径",
    F`retrieval=term\rightarrow contexts\rightarrow comparison\rightarrow action`,
    "索引词只跳到单页标题，不能比较不同语境的含义",
    "索引只是字母排序",
    "从术语快速重建上下文和实践",
    "publisher",
  ),
};

const FAMILY_MODEL = {
  scope: [1.2, 7, 18, 48],
  provenance: [1.3, 8, 16, 52],
  planning: [1.7, 9, 18, 58],
  design: [1.8, 8, 16, 62],
  abstraction: [2.1, 9, 19, 60],
  routine: [1.9, 10, 19, 60],
  defensive: [2.2, 10, 22, 56],
  data: [2.0, 9, 20, 58],
  control: [2.1, 9, 20, 60],
  quality: [1.8, 10, 20, 58],
  collaboration: [1.7, 11, 19, 57],
  testing: [2.0, 10, 22, 56],
  diagnosis: [1.9, 10, 22, 55],
  refactoring: [1.8, 9, 20, 58],
  performance: [2.2, 11, 21, 58],
  scale: [2.4, 10, 20, 60],
  delivery: [2.1, 10, 22, 58],
  tooling: [1.9, 9, 20, 60],
  readability: [1.5, 8, 18, 60],
  growth: [1.4, 8, 18, 58],
  craft: [1.6, 9, 19, 60],
};

const CONCEPT_RULES = [
  [
    /初始化|初始值/,
    "所有读取路径之前建立合法值，并区分缺省值与业务值",
    "构造未初始化、零值和恰好边界三条路径",
  ],
  [
    /作用域|存活|生存期|生命周期/,
    "把可见范围、有效时间与资源所有者同时缩到满足职责的最小边界",
    "在离开所有者后继续访问一次，确认系统明确拒绝",
  ],
  [
    /变量名|命名|名字|名称/,
    "让名称表达问题域角色、单位和状态，而不是实现类型或临时历史",
    "交换两个同类型但不同单位的值，检查名称和类型能否阻止误用",
  ],
  [
    /类|抽象数据类型|ADT|继承|封装/,
    "用构造和公开操作守住对象不变量，优先组合稳定职责",
    "尝试绕过接口制造半有效对象，确认不变量不可被外部破坏",
  ],
  [
    /子程序|函数|参数|返回值/,
    "把单一职责、前置条件、后置条件和错误语义放在调用边界",
    "给最小、最大和非法参数各运行一次，并检查返回与状态副作用",
  ],
  [
    /断言|异常|错误处理|错误消息|容错|健壮|防御/,
    "区分外部可恢复错误与内部不可能状态，在最近信任边界拒绝",
    "注入一个坏输入和一个内部不变量破坏，确认两者走不同处置路径",
  ],
  [
    /布尔|条件|if|case|判定|分支/,
    "使分支互斥且覆盖输入域，命名复杂谓词并明确默认路径",
    "列出条件真值表和边界邻域，寻找重叠或没有归属的输入",
  ],
  [
    /循环|迭代/,
    "写出循环前状态、不变量、进展量和退出后置条件",
    "运行零次、一次、末端一次和越界一步四种样本",
  ],
  [
    /递归/,
    "每次调用严格缩小问题并保证可达基线，返回阶段只合并子结果",
    "构造无法缩小的输入，确认终止保护先于栈耗尽生效",
  ],
  [
    /goto|返回|控制结构/,
    "比较路径缩短与清理责任，不按语法标签预判结构优劣",
    "展开所有退出边，检查资源释放和后置条件是否一致",
  ],
  [
    /表驱动|直接访问|索引访问|阶梯访问|查表/,
    "把规则编码为键、区间、顺序和缺省策略明确的数据",
    "删除一个键并打乱一个区间，确认校验在查询前失败",
  ],
  [
    /整数|浮点|字符|字符串|枚举|常量|基本数据类型|数值/,
    "依据业务范围、精度、编码和运算规则选择表示",
    "测试最小值、最大值、舍入点、溢出邻域和非法编码",
  ],
  [
    /指针|全局|结构|数组|数据类型/,
    "声明所有权、别名、边界、可变性和释放责任",
    "制造空引用、悬空引用、越界索引与并发写入各一个反例",
  ],
  [
    /需求|问题定义|准备|架构|先决|生命周期/,
    "在构建前冻结可测试目标、变化热点和跨组件约束",
    "移除一个核心前提，观察哪个设计或测试最先失去依据",
  ],
  [
    /隐喻|模型|启发/,
    "记录类比成立的映射、遗漏、反例和退出条件",
    "用一个反例逼迫候选模型解释其不适用范围",
  ],
  [
    /设计|复杂|抽象|内聚|耦合|层次|模块/,
    "把本质复杂度隔离在有名字的职责和接口之后，避免跨层泄漏",
    "改变一个需求，统计需要理解和修改的独立边界数",
  ],
  [
    /质量|缺陷|可靠|正确|可维护/,
    "把质量属性分开定义，再选择预防、发现和修复证据",
    "让一个指标改善而另一个恶化，检查门禁能否阻止平均分掩盖",
  ],
  [
    /测试|用例|覆盖|脚手架|桩|回归/,
    "从合同、等价类、边界和独立路径导出可重复断言",
    "先故意破坏目标行为，确认测试确实由红转绿",
  ],
  [
    /调试|除错|诊断|假设/,
    "稳定复现并用最小区分实验排除竞争假设",
    "保留相同输入，只改变一个怀疑条件并记录首差",
  ],
  [
    /重构|坏味道|改善结构/,
    "以行为测试冻结外部合同，再做小步可逆结构变换",
    "每一步前后重放同一输入并比较可观察结果",
  ],
  [
    /性能|调整|优化|微调|热点|速度|内存|I\/O/,
    "以固定负载和统计基线定位真实热点，再单点改变候选机制",
    "交替运行基线与候选，报告分布而非最好一次",
  ],
  [
    /协同|结对|检查|评审|团队|合作/,
    "明确角色、准备材料、缺陷分类和修订责任，讨论产物而非个人",
    "让未参与实现者仅凭合同复查并比较独立发现",
  ],
  [
    /规模|估算|进度|管理|人员|度量/,
    "统一口径并把沟通、依赖、风险和不确定性纳入预测",
    "把规模加倍，检查模型是否错误地给出线性工期",
  ],
  [
    /集成|构建|配置|版本|源码控制|Version Control/,
    "给每个构件和变更稳定身份，按依赖小步合并并随步验证",
    "引入一个不兼容接口，确认首个失败批次可定位和回退",
  ],
  [
    /工具|编译|静态分析|自动化|环境|脚本/,
    "记录工具版本、输入、配置、覆盖边界和失败策略",
    "关闭一条规则或漏掉一个路径，确认无输出不会被误判为无风险",
  ],
  [
    /布局|格式|空白|括号|风格/,
    "让一致格式暴露结构和差异，把机械决定交给固定版本工具",
    "只改格式运行一次，检查语义轨迹不变且差异可审查",
  ],
  [
    /注释|文档|说明/,
    "代码表达可检查行为，文字解释原因、约束和非显然取舍",
    "改变实现后核对注释是否仍能正确预测边界行为",
  ],
  [
    /参考|来源|期刊|资料|信息|读书|学习/,
    "按主张相关性、权威性、版本和可复核性选择资料",
    "用独立来源交叉核对一个关键判断并记录冲突",
  ],
  [
    /谦虚|求知|诚实|性格|习惯|纪律|创造/,
    "把品质落成可观察行为：承认未知、记录失败、寻求反馈并修订",
    "要求第二位实践者复现决定，比较被忽略的假设",
  ],
  [
    /关键点|原则|总结/,
    "把本单元结论改写为带前提、反例和证据位置的决策规则",
    "构造规则不适用的最小反例并说明退出条件",
  ],
  [
    /更多资源|额外资源/,
    "只选择能补足当前能力缺口且可转为实践产物的后续材料",
    "为每个来源预先写出要解决的问题和截止复核日期",
  ],
];

function walkMdx(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walkMdx(entryPath));
    else if (entry.name.endsWith(".mdx")) files.push(entryPath);
  }
  return files.sort();
}

function flatConcepts(unit) {
  return (unit?.concepts ?? []).flat(Infinity).map(String);
}

function componentName(chapterSlug) {
  return `${chapterSlug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")
    .replace(/[^A-Za-z0-9]/g, "")}MechanismLab`;
}

function keyFor(chapterSlug) {
  if (chapterSlug.includes("learning-map")) return "map";
  if (chapterSlug.includes("final-review")) return "review";
  return chapterSlug;
}

function escapeYaml(value) {
  return JSON.stringify(String(value));
}

function escapeAttribute(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function modelFor(profile) {
  const [primaryWeight, secondaryWeight, faultPenalty, limit] =
    FAMILY_MODEL[profile.knowledge.family];
  const seed = profile.order % 5;
  return {
    primaryLabel: profile.focuses[0] ?? profile.nodes[0],
    primaryUnit: "项",
    primaryInitial: 6 + seed,
    primaryMax: 36 + seed * 3,
    primaryWeight,
    secondaryLabel: profile.focuses[1] ?? profile.nodes[1],
    secondaryUnit: "处",
    secondaryInitial: 2 + (seed % 3),
    secondaryMax: 18 + seed,
    secondaryWeight,
    basePressure: 5 + seed,
    boundaryPenalty: 11 + seed,
    faultPenalty,
    limit,
    metricLabel: `${profile.focuses[2] ?? profile.nodes[2]}压力`,
  };
}

function insightFor(concept, profile, index) {
  const rule = CONCEPT_RULES.find(([pattern]) => pattern.test(concept));
  return {
    claim: rule?.[1] ?? `把“${concept}”放回 ${profile.knowledge.mechanism}`,
    probe:
      rule?.[2] ?? `固定其余条件，只改变与“${concept}”直接相连的一个输入或决定`,
    node: profile.nodes[index % profile.nodes.length],
    focus: profile.focuses[index % profile.focuses.length],
  };
}

function codeSketch(profile) {
  const title = profile.title.replaceAll("`", "");
  const unit = profile.chapterSlug.replaceAll("-", "_");
  switch (profile.knowledge.practice) {
    case "calculation":
      return `# ${title}：先建立参考模型，再核对边界\nexpected = reference_${unit}(fixed_input)\nactual = run_${unit}(fixed_input)\nassert actual == expected\nassert reset_and_run(fixed_input) == expected`;
    case "code":
      return `// ${title}：同一输入验证基线、故障和复位\nconst baseline = run_${unit}(fixedCase());\nassertContract(baseline);\nassertRejected(run_${unit}(faultCase()));\nassert.deepEqual(resetAndRun(fixedCase()), baseline);`;
    case "simulation":
      return `# ${title}：逐节点推进状态，不跳过中间证据\nstate = baseline_${unit}()\nfor event in fixed_scenario:\n    state = transition(state, event)\n    assert invariant(state)\nassert reset(state) == baseline_${unit}()`;
    case "diagnosis":
      return `# ${title}：保留竞争假设，只用单变量探针排除\nhypotheses = enumerate_causes(reproducible_failure)\nwhile len(hypotheses) > 1:\n    hypotheses = distinguish_with_one_probe(hypotheses)\nassert replay_after_fix() == baseline_trace`;
    default:
      return `# ${title}：把方案决定连到可审查证据\nbaseline = freeze_context_and_constraints("${unit}")\ncandidate = apply_one_decision(baseline)\nassert candidate.expected_delta_only\nassert independent_review(candidate).reproducible`;
  }
}

function makeWrapper(profile) {
  return `import { ConstructionMechanismLab } from "./construction-mechanism-lab";

const profile = {
  unitId: ${escapeYaml(profile.chapterSlug)},
  title: ${escapeYaml(profile.title)},
  nodes: ${JSON.stringify(profile.nodes)},
  concepts: ${JSON.stringify(profile.concepts)},
  mechanism: ${escapeYaml(profile.knowledge.mechanism)},
  success: ${escapeYaml(`${profile.title} 的机制链、结果和复位轨迹与预测一致`)},
  failure: ${escapeYaml(`${profile.title} 在“${profile.knowledge.fault}”处拒绝`)},
  model: ${JSON.stringify(modelFor(profile), null, 2)},
} as const;

export function ${profile.componentName}() {
  return <ConstructionMechanismLab {...profile} />;
}
`;
}

function makePage(profile) {
  const concepts = profile.concepts.length
    ? profile.concepts
    : profile.mapConcepts;
  const conceptSections = concepts
    .map((concept, index) => {
      const insight = insightFor(concept, profile, index);
      return `### ${concept}

在 **${profile.title}** 中，目录节点 **${concept}** 落在“${insight.node}”检查点。这里的技术含义是：${insight.claim}；它影响“${insight.focus}”时，必须同时声明对象、输入、状态、输出和适用边界，不能用标题出现代替解释。

验证 **${concept}** 时，${insight.probe}。先写预期，再运行正常值、恰好边界和一个故障；若出现“${profile.knowledge.fault}”，就在 ${profile.title} 的 **${insight.node}** 保存首个偏离、拒绝结果和复位后的重放证据。`;
    })
    .join("\n\n");
  const terms = profile.nodes.slice(0, 5);
  const termLine = terms
    .map(
      (term) =>
        `<Term def=${escapeYaml(`${term} 是 ${profile.title} 中可观察、可失败且可复位的机制边界`)}>${term}</Term>`,
    )
    .join("、");
  const glossary = terms
    .map(
      (term, index) => `<GlossaryItem term="${escapeAttribute(term)}">
  ${term} 是 ${profile.title} 的第 ${index + 1} 个机制检查点；它的记录包含进入条件、状态变化、退出条件与故障表现。
</GlossaryItem>`,
    )
    .join("\n\n");
  const practiceList = concepts
    .map(
      (concept, index) =>
        `${concept}（${profile.nodes[index % profile.nodes.length]}）`,
    )
    .join("；");
  const source = SOURCES[profile.knowledge.source];

  return `---
title: ${escapeYaml(profile.title)}
type: ${profile.type}
section: ${escapeYaml(profile.section)}
order: ${profile.order}
description: ${escapeYaml(`${profile.title}：从“${profile.knowledge.before}”推进到“${profile.knowledge.after}”，以目录节点、专属机制实验和故障复位验收。`)}
demo: true
math: true
sourceUrl: ${escapeYaml(SCOPE_URL)}
qualityVersion: 2
practiceMode: ${profile.knowledge.practice}
sourceMode: independent-rewrite
draft: false
---

import { ${profile.componentName} } from "@/components/mdx/code-complete-2e/diagrams/${profile.chapterSlug}";
import {
  Objectives,
  Callout,
  Term,
  Glossary,
  GlossaryItem,
  Exercises,
  Answer,
  Attribution,
} from "@/components/mdx/mdx-components";

<Objectives>

- 能说明 ${profile.title} 怎样把“${profile.knowledge.before}”推进为“${profile.knowledge.after}”
- 能沿 ${profile.nodes.join(" → ")} 重建对象、状态、决定和证据
- 能使用本页合同完成一次${profile.knowledge.practice === "calculation" ? "计算" : profile.knowledge.practice === "code" ? "代码修改" : profile.knowledge.practice === "simulation" ? "状态模拟" : profile.knowledge.practice === "diagnosis" ? "故障诊断" : "方案判断"}
- 能注入“${profile.knowledge.fault}”，找到首差并确认重置恢复基线

</Objectives>

## 为什么需要这一机制

${profile.title} 解决的不是一个可背诵口号，而是从 **${profile.knowledge.before}** 到 **${profile.knowledge.after}** 的可观察变化。它的核心机制是：${profile.knowledge.mechanism}。

学习 ${profile.title} 时先预测 ${profile.nodes.join("、")} 的输入与输出，再改变一个直接条件。最终结果即使看似正确，只要中间状态违反合同、故障不能隔离或重置不能回到同一基线，本页结论就不通过。

<Callout type="info" title="范围与事实来源">
  ${profile.title} 由 [2006 中文第 2 版公开试读目录](${SCOPE_URL}) 限定范围，技术机制依据 [${source.title}](${source.url}) 独立重写。目录核对只证明主题坐标；本页不宣称取得、翻译或复现原书正文、插图、表格、核对表与代码。
</Callout>

## 核心合同

$$
${profile.knowledge.formula}
$$

${profile.title} 的合同变量必须绑定到同一版本、同一输入、同一单位和同一观察窗口。先由合同推出预期，再观察 ${profile.nodes[2]} 与 ${profile.nodes[4]}；如果只是修改阈值来迎合结果，实验失去裁决能力。

## 目录节点到四级证据

以下节点逐项给出“出现—解释—视觉/实验—练习验证”证据。${profile.title} 不把目录词频当作覆盖率；每一项都必须能在专属机制链中指出状态变化，并在章末练习清单中被复核。

${conceptSections}

## 最小可重放实现

~~~text
${codeSketch(profile)}
~~~

这段 ${profile.title} 验证草图表达独立教学合同，不复制原书代码。真实执行应保存输入、环境、节点轨迹、最终结果、拒绝理由和复位结果，使第二位读者能从干净状态重放。

## 专属因果实验

先预测改变“${profile.focuses[0]}”或“${profile.focuses[1]}”后，${profile.title} 的哪一个节点最先变化。切换基线、边界和注入故障，运行并保存证据；最后点击“重置实验”，确认滑块、场景、节点、压力和结果文字全部恢复。

<${profile.componentName} />

## 故障诊断与误区

<Callout type="trap" title=${escapeYaml(`误区：${profile.knowledge.fault}`)}>
  这个错误会让 ${profile.title} 无法从“${profile.knowledge.before}”稳定推进到“${profile.knowledge.after}”。诊断沿 ${profile.nodes.join(" → ")} 前进，只在第一次出现预期与实际不一致的节点停下，不用最终症状倒猜原因。
</Callout>

<Callout type="trap" title="误区：一个指标可以代替全部证据">
  ${profile.title} 的单一数值可能被样本、缓存、默认值、测量窗口或偶然次序掩盖。至少同时保存机制轨迹、边界结果、故障拒绝和复位重放，任何一项缺失都不能用平均分补偿。
</Callout>

<Callout type="tip" title="恢复顺序">
  ${profile.title} 的恢复顺序是：还原输入和环境，清理派生状态，重建 ${profile.nodes[1]}，重跑 ${profile.nodes[2]}，核对 ${profile.nodes[4]}，再注入同一故障确认拒绝可重复。
</Callout>

## 术语与边界

${profile.title} 的五个操作术语是 ${termLine}。每个术语必须能指向实验控件、节点或状态文本；若只能指向目录标题，说明解释和验证仍未完成。

<Glossary>

${glossary}

</Glossary>

## 本页小结

${profile.title} 的完成标准是能解释“${profile.knowledge.mechanism}”，用核心合同推出预期，沿五个专属节点观察实际，诊断“${profile.knowledge.fault}”，并证明复位后同一输入重建基线轨迹。

<Exercises>

1. ${profile.title} 的五节点链中，哪个状态最能区分“${profile.knowledge.before}”和“${profile.knowledge.after}”？请给出最小输入和恰好边界。

<Answer>
  先固定 ${profile.nodes[0]}，只改变与 ${profile.nodes[1]} 相连的一个条件；最早在 ${profile.nodes[2]} 出现且能由合同预测的差异，就是区分两种状态的证据。边界值要同时记录接受或拒绝以及 ${profile.nodes[4]} 的最终状态。
</Answer>

2. 使用 ${profile.title} 的核心合同做一次手算、代码断言、状态推演、故障诊断或方案比较，并说明每个量对应的真实对象。

<Answer>
  把输入值、单位、版本和观察窗口写入基线，先求预期，再与实验轨迹比较。若量纲、分母、对象身份或执行顺序发生变化，应重建模型；不能只修改阈值让本轮通过。
</Answer>

3. 如何逐项证明 ${profile.title} 的目录范围不只是标题出现？覆盖清单：${practiceList}。

<Answer>
  对清单每项找到正文解释，指出它位于五节点链的哪一步，在专属实验中改变一个直接变量，并写下正常、边界、故障与复位结果。四类证据任缺一类，该目录节点仍保持未通过。
</Answer>

</Exercises>

<Attribution
  adaptedFrom=${escapeYaml(`《代码大全（第2版）》2006 中文版公开试读目录用于界定 ${profile.title} 的范围；技术讲解、机制图、实验、实现草图和练习依据 ${source.title} 独立重写；未使用或声称复现原书正文、插图、表格、核对表和代码`)}
  adaptedUrl=${escapeYaml(SCOPE_URL)}
/>
`;
}

function replaceBookManifest(raw, slug, value) {
  const marker = `"${slug}"`;
  const markerIndex = raw.indexOf(marker);
  if (markerIndex < 0) throw new Error(`manifest 缺少 ${slug}`);
  const objectStart = raw.indexOf("{", markerIndex + marker.length);
  let depth = 0;
  let inString = false;
  let escaped = false;
  let objectEnd = -1;
  for (let index = objectStart; index < raw.length; index += 1) {
    const char = raw[index];
    if (inString) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === '"') inString = false;
      continue;
    }
    if (char === '"') inString = true;
    else if (char === "{") depth += 1;
    else if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        objectEnd = index + 1;
        break;
      }
    }
  }
  if (objectEnd < 0) throw new Error(`manifest ${slug} 对象未闭合`);
  const lineStart = raw.lastIndexOf("\n", markerIndex) + 1;
  const indent = raw.slice(lineStart, markerIndex);
  const serialized = JSON.stringify(value, null, 2).replaceAll(
    "\n",
    `\n${indent}`,
  );
  return `${raw.slice(0, objectStart)}${serialized}${raw.slice(objectEnd)}`;
}

function readVisualProfile(chapterSlug) {
  const source = fs.readFileSync(
    path.join(DIAGRAM_ROOT, `${chapterSlug}.tsx`),
    "utf8",
  );
  const nodes = JSON.parse(source.match(/nodes: (\[[^\n]+\])/)?.[1] ?? "[]");
  const focuses = JSON.parse(
    source.match(/focuses: (\[[^\n]+\])/)?.[1] ?? "[]",
  );
  if (nodes.length !== 5 || focuses.length !== 5)
    throw new Error(`缺少五节点视觉配置: ${chapterSlug}`);
  return { nodes, focuses };
}

const manifestRaw = fs.readFileSync(MANIFEST_PATH, "utf8");
const manifestDocument = JSON.parse(manifestRaw);
const manifest = manifestDocument.books[BOOK];
if (!manifest) throw new Error(`manifest 缺少 ${BOOK}`);
const unitById = new Map(manifest.units.map((unit) => [unit.id, unit]));
const allUnitTitles = manifest.units.map((unit) => unit.title);

const profiles = walkMdx(CONTENT_ROOT).map((filePath) => {
  const parsed = matter(fs.readFileSync(filePath, "utf8"));
  const chapterSlug = path.basename(filePath, ".mdx");
  const key = keyFor(chapterSlug);
  const knowledge = KNOWLEDGE[key];
  if (!knowledge) throw new Error(`缺少知识配置: ${key}`);
  const unit = unitById.get(chapterSlug);
  const visual = readVisualProfile(chapterSlug);
  return {
    filePath,
    relativePath: path.relative(ROOT, filePath).replaceAll(path.sep, "/"),
    chapterSlug,
    key,
    title: String(parsed.data.title ?? unit?.title ?? chapterSlug),
    type: String(parsed.data.type ?? "B"),
    section: String(parsed.data.section ?? "代码大全（第2版·2006中文版）"),
    order: Number(parsed.data.order ?? 0),
    concepts: flatConcepts(unit),
    mapConcepts: allUnitTitles,
    knowledge,
    componentName: componentName(chapterSlug),
    ...visual,
  };
});

if (profiles.length !== 51)
  throw new Error(`期望 51 页，实际 ${profiles.length}`);
if (manifest.units.length !== 49)
  throw new Error(`期望 49 个正式单元，实际 ${manifest.units.length}`);
const conceptCount = manifest.units.reduce(
  (sum, unit) => sum + flatConcepts(unit).length,
  0,
);
if (conceptCount !== 685)
  throw new Error(`期望 685 个目录节点，实际 ${conceptCount}`);

for (const profile of profiles) {
  fs.writeFileSync(profile.filePath, makePage(profile));
  fs.writeFileSync(
    path.join(DIAGRAM_ROOT, `${profile.chapterSlug}.tsx`),
    makeWrapper(profile),
  );
}

manifest.sourceAccess = "outline-only";
manifest.defaultSourceMode = "independent-rewrite";
manifest.status = "verified-outline-and-independent-technical-rewrite-v2";
manifest.verifiedAt = "2026-07-19";
manifest.factSourcesVerifiedAt = "2026-07-19";
manifest.factSources = SOURCES;
manifest.secondarySourceUrls = [
  ...new Set([
    ...(manifest.secondarySourceUrls ?? []),
    ...Object.values(SOURCES).map((source) => source.url),
  ]),
];
manifest.disclosureNote =
  "2006 中文第 2 版公开试读目录用于界定 49 个正式单元和 685 个目录节点；Microsoft Press 官方页核对英文第 2 版作者、日期、页数、ISBN 和官方样章。未取得原书全文，所有教学正文、机制图、实验、代码草图和练习均依据专业机构、标准、安全目录和工具官方文档独立重写，不宣称复现原书正文。";
manifest.unitMappingEvidence = {
  version: 2,
  totals: { pages: 51, formalUnits: 49, outlineNodes: 685 },
  evidenceLevels: [
    "appeared",
    "explained",
    "visualized-or-experimented",
    "practiced-and-verified",
  ],
  ledger: "quality/remediation-ledger.json",
};
manifest.unitMappings = manifest.units.map((unit) => {
  const profile = profiles.find(
    (candidate) => candidate.chapterSlug === unit.id,
  );
  if (!profile) throw new Error(`正式单元没有页面映射: ${unit.id}`);
  const sourceRef = profile.knowledge.source;
  unit.factSourceRefs = ["scope", "publisher", sourceRef].filter(
    (value, index, values) => values.indexOf(value) === index,
  );
  return {
    unitId: unit.id,
    chapterKey: `${BOOK}/${path
      .relative(CONTENT_ROOT, profile.filePath)
      .replace(/\.mdx$/, "")
      .replaceAll(path.sep, "/")}`,
    path: profile.relativePath,
    nodeCount: flatConcepts(unit).length,
    factSourceRefs: unit.factSourceRefs,
    evidence: {
      appeared: "同名三级标题",
      explained: "目录节点到四级证据段落",
      visualized: `${profile.componentName} 的目录节点证据与五节点机制链`,
      practiced: "章末练习第 3 题逐项覆盖清单",
    },
  };
});

const updatedManifest = replaceBookManifest(manifestRaw, BOOK, manifest);
fs.writeFileSync(MANIFEST_PATH, updatedManifest);
fs.writeFileSync(
  PROFILE_PATH,
  `${JSON.stringify(
    {
      version: 2,
      bookSlug: BOOK,
      sourceMode: "independent-rewrite",
      scope: { formalUnits: 49, outlineNodes: 685, pages: 51 },
      profiles: profiles.map(
        ({ filePath: _, mapConcepts: __, ...profile }) => ({
          ...profile,
          model: modelFor(profile),
        }),
      ),
    },
    null,
    2,
  )}\n`,
);

let globalComponents = fs.readFileSync(GLOBAL_COMPONENTS_PATH, "utf8");
globalComponents = globalComponents.replace(
  /import \{\n(?:\s+Cc2e[^\n]+\n)+\} from "\.\/code-complete-2e\/diagrams\/[^\"]+";\n/g,
  "",
);
globalComponents = globalComponents.replace(
  /^\s+Cc2e\w+(?:Structure|Test|Evidence)Lab,\n/gm,
  "",
);
fs.writeFileSync(GLOBAL_COMPONENTS_PATH, globalComponents);

const legacyLabPath = path.join(DIAGRAM_ROOT, "official-cc2e-book-lab.tsx");
if (fs.existsSync(legacyLabPath)) fs.unlinkSync(legacyLabPath);

console.log(
  JSON.stringify({
    book: BOOK,
    pages: profiles.length,
    units: manifest.units.length,
    concepts: conceptCount,
    sources: Object.keys(SOURCES).length,
    globalRegistrationsRemaining: (
      globalComponents.match(/Cc2e\w+(?:Structure|Test|Evidence)Lab/g) ?? []
    ).length,
  }),
);
