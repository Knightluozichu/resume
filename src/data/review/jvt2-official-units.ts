import type { ReviewQuestion } from "./types";

export const jvt2OfficialQuestions: ReviewQuestion[] = [
  {
    "id": "jvt-2e-official-learning-map-q1",
    "chapter": "jvt-2e-official-learning-map",
    "level": 2,
    "question": "“《Troubleshooting Java（第2版）》权威学习地图”覆盖哪些官方节点，核心责任是什么？",
    "answer": "本页从“Part 1 Revisiting the foundation for code investigation”覆盖到“Appendix F: references”，共24个节点。核心是沿4个Part、13章和6个附录建立从单进程代码调查到大型系统一致性的完整证据路径，交付物为138节点覆盖矩阵、诊断选择树、学习依赖图、全书证据清单。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "jvt-2e-official-learning-map-q2",
    "chapter": "jvt-2e-official-learning-map",
    "level": 3,
    "question": "怎样为“《Troubleshooting Java（第2版）》权威学习地图”设计最小可重复调查？",
    "answer": "固定版本、输入、工作量、基线和停止条件，执行“为意外输出、死锁、内存增长和跨服务不一致各选择一条最短学习路径并说明停止条件”，保存原始信号和探针开销，并用至少两个互斥假设解释差异。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "jvt-2e-official-learning-map-q3",
    "chapter": "jvt-2e-official-learning-map",
    "level": 3,
    "question": "为什么“把本书缩成JVM参数调优清单，遗漏调试、日志、SQL、线程、分布式失败与一致性”是本页的高风险误区？",
    "answer": "它会让相关性、工具排序或未经验证的解释替代因果证据。应回到138节点覆盖矩阵、诊断选择树、学习依赖图、全书证据清单，增加无探针对照、故障反例和修复后重放；无法推翻时只能保留为候选。",
    "tags": [
      "陷阱",
      "诊断"
    ]
  },
  {
    "id": "jvt-2e-official-learning-map-q4",
    "chapter": "jvt-2e-official-learning-map",
    "level": 4,
    "question": "如何判断“《Troubleshooting Java（第2版）》权威学习地图”中的探针效应没有扭曲结论？",
    "answer": "在同一环境和工作量下保留无探针、低扰动与目标探针三组运行，比较时序、CPU、分配、吞吐和结果；一次只改变一个采集条件，并注明工具与JDK版本。",
    "tags": [
      "探针效应",
      "对照"
    ]
  },
  {
    "id": "jvt-2e-official-learning-map-q5",
    "chapter": "jvt-2e-official-learning-map",
    "level": 4,
    "question": "AI可以怎样辅助“《Troubleshooting Java（第2版）》权威学习地图”，又不能替代什么？",
    "answer": "AI可在脱敏最小上下文中扩展互斥假设、反例和查询思路，但不能获得未提供的现场事实，也不能替代源码、运行证据、一手文档、生产授权和最终责任。每项输出都必须验证。",
    "tags": [
      "AI边界",
      "验证"
    ]
  },
  {
    "id": "jvt-2e-official-learning-map-q6",
    "chapter": "jvt-2e-official-learning-map",
    "level": 4,
    "question": "“《Troubleshooting Java（第2版）》权威学习地图”达到交接标准需要哪些证据？",
    "answer": "至少需要版本化环境、固定工作量、症状时间线、竞争假设、原始信号、故障对照、反例、修复前后结果、回滚阈值和恢复演练，并让他人仅凭138节点覆盖矩阵、诊断选择树、学习依赖图、全书证据清单重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "jvt-2e-part-1-foundation-q1",
    "chapter": "jvt-2e-part-1-foundation",
    "level": 2,
    "question": "“Part 1 重访代码调查基础”覆盖哪些官方节点，核心责任是什么？",
    "answer": "本页从“Part 1 Revisiting the foundation for code investigation”覆盖到“Part 1 Revisiting the foundation for code investigation”，共1个节点。核心是建立从症状、假设、最小复现到可推翻结论的调查协议，为调试、日志与AI辅助划定证据边界，交付物为调查章程、症状时间线、假设队列、证据保全清单。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "jvt-2e-part-1-foundation-q2",
    "chapter": "jvt-2e-part-1-foundation",
    "level": 3,
    "question": "怎样为“Part 1 重访代码调查基础”设计最小可重复调查？",
    "answer": "固定版本、输入、工作量、基线和停止条件，执行“对同一异常分别用静态阅读、调试器和日志提出假设，比较哪项证据真正排除了候选原因”，保存原始信号和探针开销，并用至少两个互斥假设解释差异。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "jvt-2e-part-1-foundation-q3",
    "chapter": "jvt-2e-part-1-foundation",
    "level": 3,
    "question": "为什么“直接打开工具漫游，收集大量信号却没有问题、对照组和停止条件”是本页的高风险误区？",
    "answer": "它会让相关性、工具排序或未经验证的解释替代因果证据。应回到调查章程、症状时间线、假设队列、证据保全清单，增加无探针对照、故障反例和修复后重放；无法推翻时只能保留为候选。",
    "tags": [
      "陷阱",
      "诊断"
    ]
  },
  {
    "id": "jvt-2e-part-1-foundation-q4",
    "chapter": "jvt-2e-part-1-foundation",
    "level": 4,
    "question": "如何判断“Part 1 重访代码调查基础”中的探针效应没有扭曲结论？",
    "answer": "在同一环境和工作量下保留无探针、低扰动与目标探针三组运行，比较时序、CPU、分配、吞吐和结果；一次只改变一个采集条件，并注明工具与JDK版本。",
    "tags": [
      "探针效应",
      "对照"
    ]
  },
  {
    "id": "jvt-2e-part-1-foundation-q5",
    "chapter": "jvt-2e-part-1-foundation",
    "level": 4,
    "question": "AI可以怎样辅助“Part 1 重访代码调查基础”，又不能替代什么？",
    "answer": "AI可在脱敏最小上下文中扩展互斥假设、反例和查询思路，但不能获得未提供的现场事实，也不能替代源码、运行证据、一手文档、生产授权和最终责任。每项输出都必须验证。",
    "tags": [
      "AI边界",
      "验证"
    ]
  },
  {
    "id": "jvt-2e-part-1-foundation-q6",
    "chapter": "jvt-2e-part-1-foundation",
    "level": 4,
    "question": "“Part 1 重访代码调查基础”达到交接标准需要哪些证据？",
    "answer": "至少需要版本化环境、固定工作量、症状时间线、竞争假设、原始信号、故障对照、反例、修复前后结果、回滚阈值和恢复演练，并让他人仅凭调查章程、症状时间线、假设队列、证据保全清单重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "jvt-2e-01-starting-to-know-apps-q1",
    "chapter": "jvt-2e-01-starting-to-know-apps",
    "level": 2,
    "question": "“第1章 开始认识应用”覆盖哪些官方节点，核心责任是什么？",
    "answer": "本页从“1 Starting to know your apps”覆盖到“Summary”，共10个节点。核心是按意外输出、外部库、性能变慢和崩溃四类症状选择调查入口，并把AI输出当待验证假设而非事实，交付物为故障分类卡、最小复现、依赖来源表、AI提示脱敏与验证记录。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "jvt-2e-01-starting-to-know-apps-q2",
    "chapter": "jvt-2e-01-starting-to-know-apps",
    "level": 3,
    "question": "怎样为“第1章 开始认识应用”设计最小可重复调查？",
    "answer": "固定版本、输入、工作量、基线和停止条件，执行“向AI只提供脱敏症状和最小代码，让它给出三个互斥假设，再用一条运行证据逐个证伪”，保存原始信号和探针开销，并用至少两个互斥假设解释差异。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "jvt-2e-01-starting-to-know-apps-q3",
    "chapter": "jvt-2e-01-starting-to-know-apps",
    "level": 3,
    "question": "为什么“把相关性当因果，或把未经验证且可能泄露秘密的AI建议直接用于生产”是本页的高风险误区？",
    "answer": "它会让相关性、工具排序或未经验证的解释替代因果证据。应回到故障分类卡、最小复现、依赖来源表、AI提示脱敏与验证记录，增加无探针对照、故障反例和修复后重放；无法推翻时只能保留为候选。",
    "tags": [
      "陷阱",
      "诊断"
    ]
  },
  {
    "id": "jvt-2e-01-starting-to-know-apps-q4",
    "chapter": "jvt-2e-01-starting-to-know-apps",
    "level": 4,
    "question": "如何判断“第1章 开始认识应用”中的探针效应没有扭曲结论？",
    "answer": "在同一环境和工作量下保留无探针、低扰动与目标探针三组运行，比较时序、CPU、分配、吞吐和结果；一次只改变一个采集条件，并注明工具与JDK版本。",
    "tags": [
      "探针效应",
      "对照"
    ]
  },
  {
    "id": "jvt-2e-01-starting-to-know-apps-q5",
    "chapter": "jvt-2e-01-starting-to-know-apps",
    "level": 4,
    "question": "AI可以怎样辅助“第1章 开始认识应用”，又不能替代什么？",
    "answer": "AI可在脱敏最小上下文中扩展互斥假设、反例和查询思路，但不能获得未提供的现场事实，也不能替代源码、运行证据、一手文档、生产授权和最终责任。每项输出都必须验证。",
    "tags": [
      "AI边界",
      "验证"
    ]
  },
  {
    "id": "jvt-2e-01-starting-to-know-apps-q6",
    "chapter": "jvt-2e-01-starting-to-know-apps",
    "level": 4,
    "question": "“第1章 开始认识应用”达到交接标准需要哪些证据？",
    "answer": "至少需要版本化环境、固定工作量、症状时间线、竞争假设、原始信号、故障对照、反例、修复前后结果、回滚阈值和恢复演练，并让他人仅凭故障分类卡、最小复现、依赖来源表、AI提示脱敏与验证记录重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "jvt-2e-02-debugging-techniques-q1",
    "chapter": "jvt-2e-02-debugging-techniques",
    "level": 2,
    "question": "“第2章 用调试技术理解应用逻辑”覆盖哪些官方节点，核心责任是什么？",
    "answer": "本页从“2 Understanding your app’s logic through debugging techniques”覆盖到“Summary”，共7个节点。核心是从执行栈、帧、局部变量和控制流理解一次真实运行，并识别调试器会扰动时序或无法覆盖的场景，交付物为调用栈注释、帧变量快照、分支路径图、调试器适用性决策表。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "jvt-2e-02-debugging-techniques-q2",
    "chapter": "jvt-2e-02-debugging-techniques",
    "level": 3,
    "question": "怎样为“第2章 用调试技术理解应用逻辑”设计最小可重复调查？",
    "answer": "固定版本、输入、工作量、基线和停止条件，执行“在状态写入前后设置断点，逐帧记录不变量何时被破坏，并与无断点日志运行比较”，保存原始信号和探针开销，并用至少两个互斥假设解释差异。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "jvt-2e-02-debugging-techniques-q3",
    "chapter": "jvt-2e-02-debugging-techniques",
    "level": 3,
    "question": "为什么“在共享生产进程暂停线程，或因单次调试运行正常就否定并发、环境和时间相关故障”是本页的高风险误区？",
    "answer": "它会让相关性、工具排序或未经验证的解释替代因果证据。应回到调用栈注释、帧变量快照、分支路径图、调试器适用性决策表，增加无探针对照、故障反例和修复后重放；无法推翻时只能保留为候选。",
    "tags": [
      "陷阱",
      "诊断"
    ]
  },
  {
    "id": "jvt-2e-02-debugging-techniques-q4",
    "chapter": "jvt-2e-02-debugging-techniques",
    "level": 4,
    "question": "如何判断“第2章 用调试技术理解应用逻辑”中的探针效应没有扭曲结论？",
    "answer": "在同一环境和工作量下保留无探针、低扰动与目标探针三组运行，比较时序、CPU、分配、吞吐和结果；一次只改变一个采集条件，并注明工具与JDK版本。",
    "tags": [
      "探针效应",
      "对照"
    ]
  },
  {
    "id": "jvt-2e-02-debugging-techniques-q5",
    "chapter": "jvt-2e-02-debugging-techniques",
    "level": 4,
    "question": "AI可以怎样辅助“第2章 用调试技术理解应用逻辑”，又不能替代什么？",
    "answer": "AI可在脱敏最小上下文中扩展互斥假设、反例和查询思路，但不能获得未提供的现场事实，也不能替代源码、运行证据、一手文档、生产授权和最终责任。每项输出都必须验证。",
    "tags": [
      "AI边界",
      "验证"
    ]
  },
  {
    "id": "jvt-2e-02-debugging-techniques-q6",
    "chapter": "jvt-2e-02-debugging-techniques",
    "level": 4,
    "question": "“第2章 用调试技术理解应用逻辑”达到交接标准需要哪些证据？",
    "answer": "至少需要版本化环境、固定工作量、症状时间线、竞争假设、原始信号、故障对照、反例、修复前后结果、回滚阈值和恢复演练，并让他人仅凭调用栈注释、帧变量快照、分支路径图、调试器适用性决策表重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "jvt-2e-03-advanced-debugging-q1",
    "chapter": "jvt-2e-03-advanced-debugging",
    "level": 2,
    "question": "“第3章 用高级调试技术寻找根因”覆盖哪些官方节点，核心责任是什么？",
    "answer": "本页从“3 Finding problem root causes using advanced debugging techniques”覆盖到“Summary”，共6个节点。核心是使用条件断点、非暂停断点、运行时求值与回退调查缩小候选空间，同时明确每种技术对执行的扰动，交付物为断点谓词、命中计数、非暂停快照、扰动对照表。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "jvt-2e-03-advanced-debugging-q2",
    "chapter": "jvt-2e-03-advanced-debugging",
    "level": 3,
    "question": "怎样为“第3章 用高级调试技术寻找根因”设计最小可重复调查？",
    "answer": "固定版本、输入、工作量、基线和停止条件，执行“让条件断点只命中特定业务键，对照普通断点与日志点的延迟、顺序和状态差异”，保存原始信号和探针开销，并用至少两个互斥假设解释差异。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "jvt-2e-03-advanced-debugging-q3",
    "chapter": "jvt-2e-03-advanced-debugging",
    "level": 3,
    "question": "为什么“条件表达式产生副作用、求值改变状态，或把回退后的合成执行误当真实历史”是本页的高风险误区？",
    "answer": "它会让相关性、工具排序或未经验证的解释替代因果证据。应回到断点谓词、命中计数、非暂停快照、扰动对照表，增加无探针对照、故障反例和修复后重放；无法推翻时只能保留为候选。",
    "tags": [
      "陷阱",
      "诊断"
    ]
  },
  {
    "id": "jvt-2e-03-advanced-debugging-q4",
    "chapter": "jvt-2e-03-advanced-debugging",
    "level": 4,
    "question": "如何判断“第3章 用高级调试技术寻找根因”中的探针效应没有扭曲结论？",
    "answer": "在同一环境和工作量下保留无探针、低扰动与目标探针三组运行，比较时序、CPU、分配、吞吐和结果；一次只改变一个采集条件，并注明工具与JDK版本。",
    "tags": [
      "探针效应",
      "对照"
    ]
  },
  {
    "id": "jvt-2e-03-advanced-debugging-q5",
    "chapter": "jvt-2e-03-advanced-debugging",
    "level": 4,
    "question": "AI可以怎样辅助“第3章 用高级调试技术寻找根因”，又不能替代什么？",
    "answer": "AI可在脱敏最小上下文中扩展互斥假设、反例和查询思路，但不能获得未提供的现场事实，也不能替代源码、运行证据、一手文档、生产授权和最终责任。每项输出都必须验证。",
    "tags": [
      "AI边界",
      "验证"
    ]
  },
  {
    "id": "jvt-2e-03-advanced-debugging-q6",
    "chapter": "jvt-2e-03-advanced-debugging",
    "level": 4,
    "question": "“第3章 用高级调试技术寻找根因”达到交接标准需要哪些证据？",
    "answer": "至少需要版本化环境、固定工作量、症状时间线、竞争假设、原始信号、故障对照、反例、修复前后结果、回滚阈值和恢复演练，并让他人仅凭断点谓词、命中计数、非暂停快照、扰动对照表重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "jvt-2e-04-logs-auditing-q1",
    "chapter": "jvt-2e-04-logs-auditing",
    "level": 2,
    "question": "“第4章 用日志审计应用行为”覆盖哪些官方节点，核心责任是什么？",
    "answer": "本页从“4 Making the most of logs: Auditing an app’s behavior”覆盖到“Summary”，共11个节点。核心是把异常栈、调用来源、耗时和线程上下文编码为结构化事件，并控制级别、持久化、成本与敏感信息，交付物为事件字段合同、关联ID传播、级别矩阵、脱敏测试、日志成本预算。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "jvt-2e-04-logs-auditing-q2",
    "chapter": "jvt-2e-04-logs-auditing",
    "level": 3,
    "question": "怎样为“第4章 用日志审计应用行为”设计最小可重复调查？",
    "answer": "固定版本、输入、工作量、基线和停止条件，执行“注入一次下游超时与一次业务拒绝，验证二者级别、堆栈、关联字段和告警结果不同”，保存原始信号和探针开销，并用至少两个互斥假设解释差异。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "jvt-2e-04-logs-auditing-q3",
    "chapter": "jvt-2e-04-logs-auditing",
    "level": 3,
    "question": "为什么“吞异常、丢失根因链、记录密码令牌、使用高基数字段，或同步刷盘拖慢关键线程”是本页的高风险误区？",
    "answer": "它会让相关性、工具排序或未经验证的解释替代因果证据。应回到事件字段合同、关联ID传播、级别矩阵、脱敏测试、日志成本预算，增加无探针对照、故障反例和修复后重放；无法推翻时只能保留为候选。",
    "tags": [
      "陷阱",
      "诊断"
    ]
  },
  {
    "id": "jvt-2e-04-logs-auditing-q4",
    "chapter": "jvt-2e-04-logs-auditing",
    "level": 4,
    "question": "如何判断“第4章 用日志审计应用行为”中的探针效应没有扭曲结论？",
    "answer": "在同一环境和工作量下保留无探针、低扰动与目标探针三组运行，比较时序、CPU、分配、吞吐和结果；一次只改变一个采集条件，并注明工具与JDK版本。",
    "tags": [
      "探针效应",
      "对照"
    ]
  },
  {
    "id": "jvt-2e-04-logs-auditing-q5",
    "chapter": "jvt-2e-04-logs-auditing",
    "level": 4,
    "question": "AI可以怎样辅助“第4章 用日志审计应用行为”，又不能替代什么？",
    "answer": "AI可在脱敏最小上下文中扩展互斥假设、反例和查询思路，但不能获得未提供的现场事实，也不能替代源码、运行证据、一手文档、生产授权和最终责任。每项输出都必须验证。",
    "tags": [
      "AI边界",
      "验证"
    ]
  },
  {
    "id": "jvt-2e-04-logs-auditing-q6",
    "chapter": "jvt-2e-04-logs-auditing",
    "level": 4,
    "question": "“第4章 用日志审计应用行为”达到交接标准需要哪些证据？",
    "answer": "至少需要版本化环境、固定工作量、症状时间线、竞争假设、原始信号、故障对照、反例、修复前后结果、回滚阈值和恢复演练，并让他人仅凭事件字段合同、关联ID传播、级别矩阵、脱敏测试、日志成本预算重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "jvt-2e-part-2-deep-diagnosing-q1",
    "chapter": "jvt-2e-part-2-deep-diagnosing",
    "level": 2,
    "question": "“Part 2 深入诊断应用执行”覆盖哪些官方节点，核心责任是什么？",
    "answer": "本页从“Part 2 Deep diagnosing an app’s execution”覆盖到“Part 2 Deep diagnosing an app’s execution”，共1个节点。核心是从CPU、分配、调用频次、SQL、线程锁和线程转储建立运行时证据链，并明确采样偏差，交付物为诊断选择树、基线窗口、探针开销预算、复现实验记录。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "jvt-2e-part-2-deep-diagnosing-q2",
    "chapter": "jvt-2e-part-2-deep-diagnosing",
    "level": 3,
    "question": "怎样为“Part 2 深入诊断应用执行”设计最小可重复调查？",
    "answer": "固定版本、输入、工作量、基线和停止条件，执行“对同一负载分别采样CPU、分配和线程状态，比较哪个信号与用户延迟同步变化”，保存原始信号和探针开销，并用至少两个互斥假设解释差异。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "jvt-2e-part-2-deep-diagnosing-q3",
    "chapter": "jvt-2e-part-2-deep-diagnosing",
    "level": 3,
    "question": "为什么“忽略预热与基线、在错误窗口采样，或把工具排名第一的方法直接等同于根因”是本页的高风险误区？",
    "answer": "它会让相关性、工具排序或未经验证的解释替代因果证据。应回到诊断选择树、基线窗口、探针开销预算、复现实验记录，增加无探针对照、故障反例和修复后重放；无法推翻时只能保留为候选。",
    "tags": [
      "陷阱",
      "诊断"
    ]
  },
  {
    "id": "jvt-2e-part-2-deep-diagnosing-q4",
    "chapter": "jvt-2e-part-2-deep-diagnosing",
    "level": 4,
    "question": "如何判断“Part 2 深入诊断应用执行”中的探针效应没有扭曲结论？",
    "answer": "在同一环境和工作量下保留无探针、低扰动与目标探针三组运行，比较时序、CPU、分配、吞吐和结果；一次只改变一个采集条件，并注明工具与JDK版本。",
    "tags": [
      "探针效应",
      "对照"
    ]
  },
  {
    "id": "jvt-2e-part-2-deep-diagnosing-q5",
    "chapter": "jvt-2e-part-2-deep-diagnosing",
    "level": 4,
    "question": "AI可以怎样辅助“Part 2 深入诊断应用执行”，又不能替代什么？",
    "answer": "AI可在脱敏最小上下文中扩展互斥假设、反例和查询思路，但不能获得未提供的现场事实，也不能替代源码、运行证据、一手文档、生产授权和最终责任。每项输出都必须验证。",
    "tags": [
      "AI边界",
      "验证"
    ]
  },
  {
    "id": "jvt-2e-part-2-deep-diagnosing-q6",
    "chapter": "jvt-2e-part-2-deep-diagnosing",
    "level": 4,
    "question": "“Part 2 深入诊断应用执行”达到交接标准需要哪些证据？",
    "answer": "至少需要版本化环境、固定工作量、症状时间线、竞争假设、原始信号、故障对照、反例、修复前后结果、回滚阈值和恢复演练，并让他人仅凭诊断选择树、基线窗口、探针开销预算、复现实验记录重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "jvt-2e-05-resource-profiling-q1",
    "chapter": "jvt-2e-05-resource-profiling",
    "level": 2,
    "question": "“第5章 用剖析识别资源消耗问题”覆盖哪些官方节点，核心责任是什么？",
    "answer": "本页从“5 Identifying resource consumption problems using profiling techniques”覆盖到“Summary”，共11个节点。核心是用VisualVM观察CPU、堆和活动代码，区分高资源使用、慢执行和疑似泄漏，并约束AI辅助解释，交付物为负载说明、CPU与内存基线、热点调用树、疑似泄漏保留路径、AI验证表。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "jvt-2e-05-resource-profiling-q2",
    "chapter": "jvt-2e-05-resource-profiling",
    "level": 3,
    "question": "怎样为“第5章 用剖析识别资源消耗问题”设计最小可重复调查？",
    "answer": "固定版本、输入、工作量、基线和停止条件，执行“固定请求率后逐步增加输入规模，观察CPU、堆占用与延迟是否同比变化，并重启复测”，保存原始信号和探针开销，并用至少两个互斥假设解释差异。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "jvt-2e-05-resource-profiling-q3",
    "chapter": "jvt-2e-05-resource-profiling",
    "level": 3,
    "question": "为什么“只看瞬时百分比、忽略采样开销和JIT预热，或上传含业务数据的剖析快照给外部AI”是本页的高风险误区？",
    "answer": "它会让相关性、工具排序或未经验证的解释替代因果证据。应回到负载说明、CPU与内存基线、热点调用树、疑似泄漏保留路径、AI验证表，增加无探针对照、故障反例和修复后重放；无法推翻时只能保留为候选。",
    "tags": [
      "陷阱",
      "诊断"
    ]
  },
  {
    "id": "jvt-2e-05-resource-profiling-q4",
    "chapter": "jvt-2e-05-resource-profiling",
    "level": 4,
    "question": "如何判断“第5章 用剖析识别资源消耗问题”中的探针效应没有扭曲结论？",
    "answer": "在同一环境和工作量下保留无探针、低扰动与目标探针三组运行，比较时序、CPU、分配、吞吐和结果；一次只改变一个采集条件，并注明工具与JDK版本。",
    "tags": [
      "探针效应",
      "对照"
    ]
  },
  {
    "id": "jvt-2e-05-resource-profiling-q5",
    "chapter": "jvt-2e-05-resource-profiling",
    "level": 4,
    "question": "AI可以怎样辅助“第5章 用剖析识别资源消耗问题”，又不能替代什么？",
    "answer": "AI可在脱敏最小上下文中扩展互斥假设、反例和查询思路，但不能获得未提供的现场事实，也不能替代源码、运行证据、一手文档、生产授权和最终责任。每项输出都必须验证。",
    "tags": [
      "AI边界",
      "验证"
    ]
  },
  {
    "id": "jvt-2e-05-resource-profiling-q6",
    "chapter": "jvt-2e-05-resource-profiling",
    "level": 4,
    "question": "“第5章 用剖析识别资源消耗问题”达到交接标准需要哪些证据？",
    "answer": "至少需要版本化环境、固定工作量、症状时间线、竞争假设、原始信号、故障对照、反例、修复前后结果、回滚阈值和恢复演练，并让他人仅凭负载说明、CPU与内存基线、热点调用树、疑似泄漏保留路径、AI验证表重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "jvt-2e-06-hidden-profiling-q1",
    "chapter": "jvt-2e-06-hidden-profiling",
    "level": 2,
    "question": "“第6章 用剖析发现隐藏问题”覆盖哪些官方节点，核心责任是什么？",
    "answer": "本页从“6 Finding hidden problems using profiling techniques”覆盖到“Summary”，共8个节点。核心是比较采样与插桩，核对方法调用频次，并从直接、框架生成和动态构造三类路径恢复真实SQL，交付物为采样与插桩对照、调用频次表、SQL来源链、绑定参数分类、计划与索引证据。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "jvt-2e-06-hidden-profiling-q2",
    "chapter": "jvt-2e-06-hidden-profiling",
    "level": 3,
    "question": "怎样为“第6章 用剖析发现隐藏问题”设计最小可重复调查？",
    "answer": "固定版本、输入、工作量、基线和停止条件，执行“制造一个N+1查询和一个低频慢查询，验证频次、总成本与单次成本能将两者区分”，保存原始信号和探针开销，并用至少两个互斥假设解释差异。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "jvt-2e-06-hidden-profiling-q3",
    "chapter": "jvt-2e-06-hidden-profiling",
    "level": 3,
    "question": "为什么“把采样缺失当未执行、把代理层方法计数当业务次数，或只看SQL文本不看绑定值与执行计划”是本页的高风险误区？",
    "answer": "它会让相关性、工具排序或未经验证的解释替代因果证据。应回到采样与插桩对照、调用频次表、SQL来源链、绑定参数分类、计划与索引证据，增加无探针对照、故障反例和修复后重放；无法推翻时只能保留为候选。",
    "tags": [
      "陷阱",
      "诊断"
    ]
  },
  {
    "id": "jvt-2e-06-hidden-profiling-q4",
    "chapter": "jvt-2e-06-hidden-profiling",
    "level": 4,
    "question": "如何判断“第6章 用剖析发现隐藏问题”中的探针效应没有扭曲结论？",
    "answer": "在同一环境和工作量下保留无探针、低扰动与目标探针三组运行，比较时序、CPU、分配、吞吐和结果；一次只改变一个采集条件，并注明工具与JDK版本。",
    "tags": [
      "探针效应",
      "对照"
    ]
  },
  {
    "id": "jvt-2e-06-hidden-profiling-q5",
    "chapter": "jvt-2e-06-hidden-profiling",
    "level": 4,
    "question": "AI可以怎样辅助“第6章 用剖析发现隐藏问题”，又不能替代什么？",
    "answer": "AI可在脱敏最小上下文中扩展互斥假设、反例和查询思路，但不能获得未提供的现场事实，也不能替代源码、运行证据、一手文档、生产授权和最终责任。每项输出都必须验证。",
    "tags": [
      "AI边界",
      "验证"
    ]
  },
  {
    "id": "jvt-2e-06-hidden-profiling-q6",
    "chapter": "jvt-2e-06-hidden-profiling",
    "level": 4,
    "question": "“第6章 用剖析发现隐藏问题”达到交接标准需要哪些证据？",
    "answer": "至少需要版本化环境、固定工作量、症状时间线、竞争假设、原始信号、故障对照、反例、修复前后结果、回滚阈值和恢复演练，并让他人仅凭采样与插桩对照、调用频次表、SQL来源链、绑定参数分类、计划与索引证据重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "jvt-2e-07-thread-locks-q1",
    "chapter": "jvt-2e-07-thread-locks",
    "level": 2,
    "question": "“第7章 调查多线程架构中的锁”覆盖哪些官方节点，核心责任是什么？",
    "answer": "本页从“7 Investigating locks in multithreaded architectures”覆盖到“Summary”，共5个节点。核心是区分锁拥有者、进入等待、条件等待和正常空闲，沿资源依赖解释阻塞而不把所有WAITING视作故障，交付物为线程状态序列、锁拥有关系图、等待原因分类、竞争前后吞吐对照。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "jvt-2e-07-thread-locks-q2",
    "chapter": "jvt-2e-07-thread-locks",
    "level": 3,
    "question": "怎样为“第7章 调查多线程架构中的锁”设计最小可重复调查？",
    "answer": "固定版本、输入、工作量、基线和停止条件，执行“用两个负载级别重复采集线程状态，确认同一锁等待是否持续增长且与延迟相关”，保存原始信号和探针开销，并用至少两个互斥假设解释差异。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "jvt-2e-07-thread-locks-q3",
    "chapter": "jvt-2e-07-thread-locks",
    "level": 3,
    "question": "为什么“只截取单份快照、忽略线程池队列与外部I/O，或盲目扩大锁范围造成吞吐下降”是本页的高风险误区？",
    "answer": "它会让相关性、工具排序或未经验证的解释替代因果证据。应回到线程状态序列、锁拥有关系图、等待原因分类、竞争前后吞吐对照，增加无探针对照、故障反例和修复后重放；无法推翻时只能保留为候选。",
    "tags": [
      "陷阱",
      "诊断"
    ]
  },
  {
    "id": "jvt-2e-07-thread-locks-q4",
    "chapter": "jvt-2e-07-thread-locks",
    "level": 4,
    "question": "如何判断“第7章 调查多线程架构中的锁”中的探针效应没有扭曲结论？",
    "answer": "在同一环境和工作量下保留无探针、低扰动与目标探针三组运行，比较时序、CPU、分配、吞吐和结果；一次只改变一个采集条件，并注明工具与JDK版本。",
    "tags": [
      "探针效应",
      "对照"
    ]
  },
  {
    "id": "jvt-2e-07-thread-locks-q5",
    "chapter": "jvt-2e-07-thread-locks",
    "level": 4,
    "question": "AI可以怎样辅助“第7章 调查多线程架构中的锁”，又不能替代什么？",
    "answer": "AI可在脱敏最小上下文中扩展互斥假设、反例和查询思路，但不能获得未提供的现场事实，也不能替代源码、运行证据、一手文档、生产授权和最终责任。每项输出都必须验证。",
    "tags": [
      "AI边界",
      "验证"
    ]
  },
  {
    "id": "jvt-2e-07-thread-locks-q6",
    "chapter": "jvt-2e-07-thread-locks",
    "level": 4,
    "question": "“第7章 调查多线程架构中的锁”达到交接标准需要哪些证据？",
    "answer": "至少需要版本化环境、固定工作量、症状时间线、竞争假设、原始信号、故障对照、反例、修复前后结果、回滚阈值和恢复演练，并让他人仅凭线程状态序列、锁拥有关系图、等待原因分类、竞争前后吞吐对照重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "jvt-2e-08-deadlocks-thread-dumps-q1",
    "chapter": "jvt-2e-08-deadlocks-thread-dumps",
    "level": 2,
    "question": "“第8章 用线程转储调查死锁”覆盖哪些官方节点，核心责任是什么？",
    "answer": "本页从“8 Investigating deadlocks with thread dumps”覆盖到“Summary”，共8个节点。核心是用剖析器或命令行获取多份线程转储，读取线程、栈、监视器与等待边，构建死锁环并验证修复，交付物为原始转储、线程到锁表、等待环、统一锁序、修复前后压力测试。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "jvt-2e-08-deadlocks-thread-dumps-q2",
    "chapter": "jvt-2e-08-deadlocks-thread-dumps",
    "level": 3,
    "question": "怎样为“第8章 用线程转储调查死锁”设计最小可重复调查？",
    "answer": "固定版本、输入、工作量、基线和停止条件，执行“构造两个反向锁序线程，连续采集三份转储并验证环稳定存在；统一顺序后重复压力测试”，保存原始信号和探针开销，并用至少两个互斥假设解释差异。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "jvt-2e-08-deadlocks-thread-dumps-q3",
    "chapter": "jvt-2e-08-deadlocks-thread-dumps",
    "level": 3,
    "question": "为什么“只保留工具截图、混淆对象标识，或修复一个锁顺序后不验证其他路径和活锁风险”是本页的高风险误区？",
    "answer": "它会让相关性、工具排序或未经验证的解释替代因果证据。应回到原始转储、线程到锁表、等待环、统一锁序、修复前后压力测试，增加无探针对照、故障反例和修复后重放；无法推翻时只能保留为候选。",
    "tags": [
      "陷阱",
      "诊断"
    ]
  },
  {
    "id": "jvt-2e-08-deadlocks-thread-dumps-q4",
    "chapter": "jvt-2e-08-deadlocks-thread-dumps",
    "level": 4,
    "question": "如何判断“第8章 用线程转储调查死锁”中的探针效应没有扭曲结论？",
    "answer": "在同一环境和工作量下保留无探针、低扰动与目标探针三组运行，比较时序、CPU、分配、吞吐和结果；一次只改变一个采集条件，并注明工具与JDK版本。",
    "tags": [
      "探针效应",
      "对照"
    ]
  },
  {
    "id": "jvt-2e-08-deadlocks-thread-dumps-q5",
    "chapter": "jvt-2e-08-deadlocks-thread-dumps",
    "level": 4,
    "question": "AI可以怎样辅助“第8章 用线程转储调查死锁”，又不能替代什么？",
    "answer": "AI可在脱敏最小上下文中扩展互斥假设、反例和查询思路，但不能获得未提供的现场事实，也不能替代源码、运行证据、一手文档、生产授权和最终责任。每项输出都必须验证。",
    "tags": [
      "AI边界",
      "验证"
    ]
  },
  {
    "id": "jvt-2e-08-deadlocks-thread-dumps-q6",
    "chapter": "jvt-2e-08-deadlocks-thread-dumps",
    "level": 4,
    "question": "“第8章 用线程转储调查死锁”达到交接标准需要哪些证据？",
    "answer": "至少需要版本化环境、固定工作量、症状时间线、竞争假设、原始信号、故障对照、反例、修复前后结果、回滚阈值和恢复演练，并让他人仅凭原始转储、线程到锁表、等待环、统一锁序、修复前后压力测试重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "jvt-2e-part-3-memory-q1",
    "chapter": "jvt-2e-part-3-memory",
    "level": 2,
    "question": "“Part 3 诊断内存相关问题”覆盖哪些官方节点，核心责任是什么？",
    "answer": "本页从“Part 3 Diagnosing memory-related problems”覆盖到“Part 3 Diagnosing memory-related problems”，共1个节点。核心是串联分配剖析、堆转储、OQL与GC日志，区分高分配率、存活集增长、容量不足和收集器行为，交付物为内存症状分类、采集预算、引用路径、GC时间线、修复验收条件。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "jvt-2e-part-3-memory-q2",
    "chapter": "jvt-2e-part-3-memory",
    "level": 3,
    "question": "怎样为“Part 3 诊断内存相关问题”设计最小可重复调查？",
    "answer": "固定版本、输入、工作量、基线和停止条件，执行“分别制造短命对象洪峰和静态集合保留，比较采样、堆转储和GC日志中的不同特征”，保存原始信号和探针开销，并用至少两个互斥假设解释差异。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "jvt-2e-part-3-memory-q3",
    "chapter": "jvt-2e-part-3-memory",
    "level": 3,
    "question": "为什么“在生产无预算地生成大转储、泄露敏感对象，或只凭一次堆大小判断趋势”是本页的高风险误区？",
    "answer": "它会让相关性、工具排序或未经验证的解释替代因果证据。应回到内存症状分类、采集预算、引用路径、GC时间线、修复验收条件，增加无探针对照、故障反例和修复后重放；无法推翻时只能保留为候选。",
    "tags": [
      "陷阱",
      "诊断"
    ]
  },
  {
    "id": "jvt-2e-part-3-memory-q4",
    "chapter": "jvt-2e-part-3-memory",
    "level": 4,
    "question": "如何判断“Part 3 诊断内存相关问题”中的探针效应没有扭曲结论？",
    "answer": "在同一环境和工作量下保留无探针、低扰动与目标探针三组运行，比较时序、CPU、分配、吞吐和结果；一次只改变一个采集条件，并注明工具与JDK版本。",
    "tags": [
      "探针效应",
      "对照"
    ]
  },
  {
    "id": "jvt-2e-part-3-memory-q5",
    "chapter": "jvt-2e-part-3-memory",
    "level": 4,
    "question": "AI可以怎样辅助“Part 3 诊断内存相关问题”，又不能替代什么？",
    "answer": "AI可在脱敏最小上下文中扩展互斥假设、反例和查询思路，但不能获得未提供的现场事实，也不能替代源码、运行证据、一手文档、生产授权和最终责任。每项输出都必须验证。",
    "tags": [
      "AI边界",
      "验证"
    ]
  },
  {
    "id": "jvt-2e-part-3-memory-q6",
    "chapter": "jvt-2e-part-3-memory",
    "level": 4,
    "question": "“Part 3 诊断内存相关问题”达到交接标准需要哪些证据？",
    "answer": "至少需要版本化环境、固定工作量、症状时间线、竞争假设、原始信号、故障对照、反例、修复前后结果、回滚阈值和恢复演练，并让他人仅凭内存症状分类、采集预算、引用路径、GC时间线、修复验收条件重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "jvt-2e-09-memory-profiling-q1",
    "chapter": "jvt-2e-09-memory-profiling",
    "level": 2,
    "question": "“第9章 剖析内存相关问题”覆盖哪些官方节点，核心责任是什么？",
    "answer": "本页从“9 Profiling memory-related problems”覆盖到“Summary”，共4个节点。核心是先用采样发现分配异常，再用更细剖析定位类型、分配点和调用路径，控制探针开销，交付物为类型分配排名、分配栈、年龄与存活观察、优化前后工作量归一化结果。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "jvt-2e-09-memory-profiling-q2",
    "chapter": "jvt-2e-09-memory-profiling",
    "level": 3,
    "question": "怎样为“第9章 剖析内存相关问题”设计最小可重复调查？",
    "answer": "固定版本、输入、工作量、基线和停止条件，执行“将缓存关闭和开启各跑同一工作量，比较分配率、完成时间和Full GC后存活集”，保存原始信号和探针开销，并用至少两个互斥假设解释差异。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "jvt-2e-09-memory-profiling-q3",
    "chapter": "jvt-2e-09-memory-profiling",
    "level": 3,
    "question": "为什么“按对象数量排序就认定泄漏、忽略对象大小和生命周期，或在不同负载间比较快照”是本页的高风险误区？",
    "answer": "它会让相关性、工具排序或未经验证的解释替代因果证据。应回到类型分配排名、分配栈、年龄与存活观察、优化前后工作量归一化结果，增加无探针对照、故障反例和修复后重放；无法推翻时只能保留为候选。",
    "tags": [
      "陷阱",
      "诊断"
    ]
  },
  {
    "id": "jvt-2e-09-memory-profiling-q4",
    "chapter": "jvt-2e-09-memory-profiling",
    "level": 4,
    "question": "如何判断“第9章 剖析内存相关问题”中的探针效应没有扭曲结论？",
    "answer": "在同一环境和工作量下保留无探针、低扰动与目标探针三组运行，比较时序、CPU、分配、吞吐和结果；一次只改变一个采集条件，并注明工具与JDK版本。",
    "tags": [
      "探针效应",
      "对照"
    ]
  },
  {
    "id": "jvt-2e-09-memory-profiling-q5",
    "chapter": "jvt-2e-09-memory-profiling",
    "level": 4,
    "question": "AI可以怎样辅助“第9章 剖析内存相关问题”，又不能替代什么？",
    "answer": "AI可在脱敏最小上下文中扩展互斥假设、反例和查询思路，但不能获得未提供的现场事实，也不能替代源码、运行证据、一手文档、生产授权和最终责任。每项输出都必须验证。",
    "tags": [
      "AI边界",
      "验证"
    ]
  },
  {
    "id": "jvt-2e-09-memory-profiling-q6",
    "chapter": "jvt-2e-09-memory-profiling",
    "level": 4,
    "question": "“第9章 剖析内存相关问题”达到交接标准需要哪些证据？",
    "answer": "至少需要版本化环境、固定工作量、症状时间线、竞争假设、原始信号、故障对照、反例、修复前后结果、回滚阈值和恢复演练，并让他人仅凭类型分配排名、分配栈、年龄与存活观察、优化前后工作量归一化结果重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "jvt-2e-10-heap-dumps-q1",
    "chapter": "jvt-2e-10-heap-dumps",
    "level": 2,
    "question": "“第10章 用堆转储调查内存问题”覆盖哪些官方节点，核心责任是什么？",
    "answer": "本页从“10 Investigating memory problems with heap dumps”覆盖到“Summary”，共8个节点。核心是规划OOM自动采集、剖析器与命令行采集，读取支配树和GC根引用，并用OQL验证对象群假设，交付物为采集运行手册、转储校验和与访问控制、支配树、GC根路径、OQL查询与修复对照。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "jvt-2e-10-heap-dumps-q2",
    "chapter": "jvt-2e-10-heap-dumps",
    "level": 3,
    "question": "怎样为“第10章 用堆转储调查内存问题”设计最小可重复调查？",
    "answer": "固定版本、输入、工作量、基线和停止条件，执行“让带业务键的对象被监听器意外保留，用OQL筛选并沿最短GC根路径找到注册表所有者”，保存原始信号和探针开销，并用至少两个互斥假设解释差异。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "jvt-2e-10-heap-dumps-q3",
    "chapter": "jvt-2e-10-heap-dumps",
    "level": 3,
    "question": "为什么“采集导致磁盘耗尽或长暂停、转储外泄秘密，或把浅大小最大的对象误判为根因”是本页的高风险误区？",
    "answer": "它会让相关性、工具排序或未经验证的解释替代因果证据。应回到采集运行手册、转储校验和与访问控制、支配树、GC根路径、OQL查询与修复对照，增加无探针对照、故障反例和修复后重放；无法推翻时只能保留为候选。",
    "tags": [
      "陷阱",
      "诊断"
    ]
  },
  {
    "id": "jvt-2e-10-heap-dumps-q4",
    "chapter": "jvt-2e-10-heap-dumps",
    "level": 4,
    "question": "如何判断“第10章 用堆转储调查内存问题”中的探针效应没有扭曲结论？",
    "answer": "在同一环境和工作量下保留无探针、低扰动与目标探针三组运行，比较时序、CPU、分配、吞吐和结果；一次只改变一个采集条件，并注明工具与JDK版本。",
    "tags": [
      "探针效应",
      "对照"
    ]
  },
  {
    "id": "jvt-2e-10-heap-dumps-q5",
    "chapter": "jvt-2e-10-heap-dumps",
    "level": 4,
    "question": "AI可以怎样辅助“第10章 用堆转储调查内存问题”，又不能替代什么？",
    "answer": "AI可在脱敏最小上下文中扩展互斥假设、反例和查询思路，但不能获得未提供的现场事实，也不能替代源码、运行证据、一手文档、生产授权和最终责任。每项输出都必须验证。",
    "tags": [
      "AI边界",
      "验证"
    ]
  },
  {
    "id": "jvt-2e-10-heap-dumps-q6",
    "chapter": "jvt-2e-10-heap-dumps",
    "level": 4,
    "question": "“第10章 用堆转储调查内存问题”达到交接标准需要哪些证据？",
    "answer": "至少需要版本化环境、固定工作量、症状时间线、竞争假设、原始信号、故障对照、反例、修复前后结果、回滚阈值和恢复演练，并让他人仅凭采集运行手册、转储校验和与访问控制、支配树、GC根路径、OQL查询与修复对照重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "jvt-2e-11-gc-logs-q1",
    "chapter": "jvt-2e-11-gc-logs",
    "level": 2,
    "question": "“第11章 用GC日志分析潜在JVM问题”覆盖哪些官方节点，核心责任是什么？",
    "answer": "本页从“11 Analyzing potential JVM problems with GC logs”覆盖到“Summary”，共10个节点。核心是启用并轮转GC日志，用暂停、回收前后占用、Full GC和并行度解释性能、泄漏与容量问题，交付物为日志配置与轮转、事件时间线、暂停分布、存活集趋势、调优假设与回滚阈值。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "jvt-2e-11-gc-logs-q2",
    "chapter": "jvt-2e-11-gc-logs",
    "level": 3,
    "question": "怎样为“第11章 用GC日志分析潜在JVM问题”设计最小可重复调查？",
    "answer": "固定版本、输入、工作量、基线和停止条件，执行“固定工作量后改变一个并行度参数，比较暂停、CPU、吞吐和Full GC频率，不达预算即回滚”，保存原始信号和探针开销，并用至少两个互斥假设解释差异。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "jvt-2e-11-gc-logs-q3",
    "chapter": "jvt-2e-11-gc-logs",
    "level": 3,
    "question": "为什么“只看最大暂停、忽略分位数与工作量，或在没有基线时调整堆和GC线程造成资源争用”是本页的高风险误区？",
    "answer": "它会让相关性、工具排序或未经验证的解释替代因果证据。应回到日志配置与轮转、事件时间线、暂停分布、存活集趋势、调优假设与回滚阈值，增加无探针对照、故障反例和修复后重放；无法推翻时只能保留为候选。",
    "tags": [
      "陷阱",
      "诊断"
    ]
  },
  {
    "id": "jvt-2e-11-gc-logs-q4",
    "chapter": "jvt-2e-11-gc-logs",
    "level": 4,
    "question": "如何判断“第11章 用GC日志分析潜在JVM问题”中的探针效应没有扭曲结论？",
    "answer": "在同一环境和工作量下保留无探针、低扰动与目标探针三组运行，比较时序、CPU、分配、吞吐和结果；一次只改变一个采集条件，并注明工具与JDK版本。",
    "tags": [
      "探针效应",
      "对照"
    ]
  },
  {
    "id": "jvt-2e-11-gc-logs-q5",
    "chapter": "jvt-2e-11-gc-logs",
    "level": 4,
    "question": "AI可以怎样辅助“第11章 用GC日志分析潜在JVM问题”，又不能替代什么？",
    "answer": "AI可在脱敏最小上下文中扩展互斥假设、反例和查询思路，但不能获得未提供的现场事实，也不能替代源码、运行证据、一手文档、生产授权和最终责任。每项输出都必须验证。",
    "tags": [
      "AI边界",
      "验证"
    ]
  },
  {
    "id": "jvt-2e-11-gc-logs-q6",
    "chapter": "jvt-2e-11-gc-logs",
    "level": 4,
    "question": "“第11章 用GC日志分析潜在JVM问题”达到交接标准需要哪些证据？",
    "answer": "至少需要版本化环境、固定工作量、症状时间线、竞争假设、原始信号、故障对照、反例、修复前后结果、回滚阈值和恢复演练，并让他人仅凭日志配置与轮转、事件时间线、暂停分布、存活集趋势、调优假设与回滚阈值重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "jvt-2e-part-4-large-systems-q1",
    "chapter": "jvt-2e-part-4-large-systems",
    "level": 2,
    "question": "“Part 4 在大型系统中寻找问题”覆盖哪些官方节点，核心责任是什么？",
    "answer": "本页从“Part 4 Finding problems in large systems”覆盖到“Part 4 Finding problems in large systems”，共1个节点。核心是把单JVM证据扩展到跨服务通信、追踪、序列化、系统性失败、事务与最终一致性，交付物为服务拓扑、端到端预算、失败传播图、业务不变量和对账策略。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "jvt-2e-part-4-large-systems-q2",
    "chapter": "jvt-2e-part-4-large-systems",
    "level": 3,
    "question": "怎样为“Part 4 在大型系统中寻找问题”设计最小可重复调查？",
    "answer": "固定版本、输入、工作量、基线和停止条件，执行“在一条跨三服务流程中注入超时与重复消息，确认追踪、幂等和对账能重建真实结果”，保存原始信号和探针开销，并用至少两个互斥假设解释差异。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "jvt-2e-part-4-large-systems-q3",
    "chapter": "jvt-2e-part-4-large-systems",
    "level": 3,
    "question": "为什么“依赖机器时钟排序、无限重试放大故障，或把trace ID当作一致性证明”是本页的高风险误区？",
    "answer": "它会让相关性、工具排序或未经验证的解释替代因果证据。应回到服务拓扑、端到端预算、失败传播图、业务不变量和对账策略，增加无探针对照、故障反例和修复后重放；无法推翻时只能保留为候选。",
    "tags": [
      "陷阱",
      "诊断"
    ]
  },
  {
    "id": "jvt-2e-part-4-large-systems-q4",
    "chapter": "jvt-2e-part-4-large-systems",
    "level": 4,
    "question": "如何判断“Part 4 在大型系统中寻找问题”中的探针效应没有扭曲结论？",
    "answer": "在同一环境和工作量下保留无探针、低扰动与目标探针三组运行，比较时序、CPU、分配、吞吐和结果；一次只改变一个采集条件，并注明工具与JDK版本。",
    "tags": [
      "探针效应",
      "对照"
    ]
  },
  {
    "id": "jvt-2e-part-4-large-systems-q5",
    "chapter": "jvt-2e-part-4-large-systems",
    "level": 4,
    "question": "AI可以怎样辅助“Part 4 在大型系统中寻找问题”，又不能替代什么？",
    "answer": "AI可在脱敏最小上下文中扩展互斥假设、反例和查询思路，但不能获得未提供的现场事实，也不能替代源码、运行证据、一手文档、生产授权和最终责任。每项输出都必须验证。",
    "tags": [
      "AI边界",
      "验证"
    ]
  },
  {
    "id": "jvt-2e-part-4-large-systems-q6",
    "chapter": "jvt-2e-part-4-large-systems",
    "level": 4,
    "question": "“Part 4 在大型系统中寻找问题”达到交接标准需要哪些证据？",
    "answer": "至少需要版本化环境、固定工作量、症状时间线、竞争假设、原始信号、故障对照、反例、修复前后结果、回滚阈值和恢复演练，并让他人仅凭服务拓扑、端到端预算、失败传播图、业务不变量和对账策略重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "jvt-2e-12-system-failures-q1",
    "chapter": "jvt-2e-12-system-failures",
    "level": 2,
    "question": "“第12章 揭示系统级与服务通信故障”覆盖哪些官方节点，核心责任是什么？",
    "answer": "本页从“12 Uncovering system-level failures and service communication problems”覆盖到“Summary”，共10个节点。核心是比较RPC与消息的失败语义，使用trace与span重建传播路径，并诊断序列化错配、级联、重试风暴和超时错位，交付物为调用与消息拓扑、span合同、模式兼容矩阵、重试预算、超时瀑布、级联熔断实验。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "jvt-2e-12-system-failures-q2",
    "chapter": "jvt-2e-12-system-failures",
    "level": 3,
    "question": "怎样为“第12章 揭示系统级与服务通信故障”设计最小可重复调查？",
    "answer": "固定版本、输入、工作量、基线和停止条件，执行“让下游变慢并返回间歇错误，比较无界重试与单层有预算重试的请求放大和恢复时间”，保存原始信号和探针开销，并用至少两个互斥假设解释差异。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "jvt-2e-12-system-failures-q3",
    "chapter": "jvt-2e-12-system-failures",
    "level": 3,
    "question": "为什么“每层独立重试、下游超时长于上游预算、版本兼容只测成功样本，或追踪标签泄露敏感数据”是本页的高风险误区？",
    "answer": "它会让相关性、工具排序或未经验证的解释替代因果证据。应回到调用与消息拓扑、span合同、模式兼容矩阵、重试预算、超时瀑布、级联熔断实验，增加无探针对照、故障反例和修复后重放；无法推翻时只能保留为候选。",
    "tags": [
      "陷阱",
      "诊断"
    ]
  },
  {
    "id": "jvt-2e-12-system-failures-q4",
    "chapter": "jvt-2e-12-system-failures",
    "level": 4,
    "question": "如何判断“第12章 揭示系统级与服务通信故障”中的探针效应没有扭曲结论？",
    "answer": "在同一环境和工作量下保留无探针、低扰动与目标探针三组运行，比较时序、CPU、分配、吞吐和结果；一次只改变一个采集条件，并注明工具与JDK版本。",
    "tags": [
      "探针效应",
      "对照"
    ]
  },
  {
    "id": "jvt-2e-12-system-failures-q5",
    "chapter": "jvt-2e-12-system-failures",
    "level": 4,
    "question": "AI可以怎样辅助“第12章 揭示系统级与服务通信故障”，又不能替代什么？",
    "answer": "AI可在脱敏最小上下文中扩展互斥假设、反例和查询思路，但不能获得未提供的现场事实，也不能替代源码、运行证据、一手文档、生产授权和最终责任。每项输出都必须验证。",
    "tags": [
      "AI边界",
      "验证"
    ]
  },
  {
    "id": "jvt-2e-12-system-failures-q6",
    "chapter": "jvt-2e-12-system-failures",
    "level": 4,
    "question": "“第12章 揭示系统级与服务通信故障”达到交接标准需要哪些证据？",
    "answer": "至少需要版本化环境、固定工作量、症状时间线、竞争假设、原始信号、故障对照、反例、修复前后结果、回滚阈值和恢复演练，并让他人仅凭调用与消息拓扑、span合同、模式兼容矩阵、重试预算、超时瀑布、级联熔断实验重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "jvt-2e-13-consistency-transactions-q1",
    "chapter": "jvt-2e-13-consistency-transactions",
    "level": 2,
    "question": "“第13章 测量数据一致性与事务”覆盖哪些官方节点，核心责任是什么？",
    "answer": "本页从“13 Measuring data consistency and transactions”覆盖到“Summary”，共11个节点。核心是用事件时间、领域不变量、审计日志、事件重放、校验和与对账任务度量跨服务一致性，交付物为事务关联模型、不变量断言、事件序列、完整性校验、对账报告、幂等修复与审计。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "jvt-2e-13-consistency-transactions-q2",
    "chapter": "jvt-2e-13-consistency-transactions",
    "level": 3,
    "question": "怎样为“第13章 测量数据一致性与事务”设计最小可重复调查？",
    "answer": "固定版本、输入、工作量、基线和停止条件，执行“删除、重复并乱序一条事件，验证审计重建、对账检测与修复重复执行仍得到相同状态”，保存原始信号和探针开销，并用至少两个互斥假设解释差异。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "jvt-2e-13-consistency-transactions-q3",
    "chapter": "jvt-2e-13-consistency-transactions",
    "level": 3,
    "question": "为什么“用处理时间代替业务顺序、把哈希相等当语义相等，或对账只报告差异却不具备幂等修复”是本页的高风险误区？",
    "answer": "它会让相关性、工具排序或未经验证的解释替代因果证据。应回到事务关联模型、不变量断言、事件序列、完整性校验、对账报告、幂等修复与审计，增加无探针对照、故障反例和修复后重放；无法推翻时只能保留为候选。",
    "tags": [
      "陷阱",
      "诊断"
    ]
  },
  {
    "id": "jvt-2e-13-consistency-transactions-q4",
    "chapter": "jvt-2e-13-consistency-transactions",
    "level": 4,
    "question": "如何判断“第13章 测量数据一致性与事务”中的探针效应没有扭曲结论？",
    "answer": "在同一环境和工作量下保留无探针、低扰动与目标探针三组运行，比较时序、CPU、分配、吞吐和结果；一次只改变一个采集条件，并注明工具与JDK版本。",
    "tags": [
      "探针效应",
      "对照"
    ]
  },
  {
    "id": "jvt-2e-13-consistency-transactions-q5",
    "chapter": "jvt-2e-13-consistency-transactions",
    "level": 4,
    "question": "AI可以怎样辅助“第13章 测量数据一致性与事务”，又不能替代什么？",
    "answer": "AI可在脱敏最小上下文中扩展互斥假设、反例和查询思路，但不能获得未提供的现场事实，也不能替代源码、运行证据、一手文档、生产授权和最终责任。每项输出都必须验证。",
    "tags": [
      "AI边界",
      "验证"
    ]
  },
  {
    "id": "jvt-2e-13-consistency-transactions-q6",
    "chapter": "jvt-2e-13-consistency-transactions",
    "level": 4,
    "question": "“第13章 测量数据一致性与事务”达到交接标准需要哪些证据？",
    "answer": "至少需要版本化环境、固定工作量、症状时间线、竞争假设、原始信号、故障对照、反例、修复前后结果、回滚阈值和恢复演练，并让他人仅凭事务关联模型、不变量断言、事件序列、完整性校验、对账报告、幂等修复与审计重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "jvt-2e-appendices-q1",
    "chapter": "jvt-2e-appendices",
    "level": 2,
    "question": "“附录总览”覆盖哪些官方节点，核心责任是什么？",
    "answer": "本页从“Appendices”覆盖到“Appendices”，共1个节点。核心是把工具、项目打开方式、延伸阅读、线程基础、内存管理与参考资料组织为调查时可回查的前置知识，交付物为附录索引、前置能力自测、工具版本卡、术语交叉引用。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "jvt-2e-appendices-q2",
    "chapter": "jvt-2e-appendices",
    "level": 3,
    "question": "怎样为“附录总览”设计最小可重复调查？",
    "answer": "固定版本、输入、工作量、基线和停止条件，执行“随机抽取一次线程或堆症状，说明应回查哪个附录、需要什么前置证据、何时返回主线”，保存原始信号和探针开销，并用至少两个互斥假设解释差异。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "jvt-2e-appendices-q3",
    "chapter": "jvt-2e-appendices",
    "level": 3,
    "question": "为什么“把附录当可忽略材料，导致线程状态、内存区域和采集命令概念混淆”是本页的高风险误区？",
    "answer": "它会让相关性、工具排序或未经验证的解释替代因果证据。应回到附录索引、前置能力自测、工具版本卡、术语交叉引用，增加无探针对照、故障反例和修复后重放；无法推翻时只能保留为候选。",
    "tags": [
      "陷阱",
      "诊断"
    ]
  },
  {
    "id": "jvt-2e-appendices-q4",
    "chapter": "jvt-2e-appendices",
    "level": 4,
    "question": "如何判断“附录总览”中的探针效应没有扭曲结论？",
    "answer": "在同一环境和工作量下保留无探针、低扰动与目标探针三组运行，比较时序、CPU、分配、吞吐和结果；一次只改变一个采集条件，并注明工具与JDK版本。",
    "tags": [
      "探针效应",
      "对照"
    ]
  },
  {
    "id": "jvt-2e-appendices-q5",
    "chapter": "jvt-2e-appendices",
    "level": 4,
    "question": "AI可以怎样辅助“附录总览”，又不能替代什么？",
    "answer": "AI可在脱敏最小上下文中扩展互斥假设、反例和查询思路，但不能获得未提供的现场事实，也不能替代源码、运行证据、一手文档、生产授权和最终责任。每项输出都必须验证。",
    "tags": [
      "AI边界",
      "验证"
    ]
  },
  {
    "id": "jvt-2e-appendices-q6",
    "chapter": "jvt-2e-appendices",
    "level": 4,
    "question": "“附录总览”达到交接标准需要哪些证据？",
    "answer": "至少需要版本化环境、固定工作量、症状时间线、竞争假设、原始信号、故障对照、反例、修复前后结果、回滚阈值和恢复演练，并让他人仅凭附录索引、前置能力自测、工具版本卡、术语交叉引用重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "jvt-2e-appendix-a-tools-q1",
    "chapter": "jvt-2e-appendix-a-tools",
    "level": 2,
    "question": "“附录A 所需工具”覆盖哪些官方节点，核心责任是什么？",
    "answer": "本页从“Appendix A: Tools you’ll need”覆盖到“Appendix A: Tools you’ll need”，共1个节点。核心是建立JDK、IDE、命令行、剖析器和示例工程的可重复工具环境，记录版本、权限和采集开销，交付物为工具清单、版本输出、权限边界、样例启动与清理步骤。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "jvt-2e-appendix-a-tools-q2",
    "chapter": "jvt-2e-appendix-a-tools",
    "level": 3,
    "question": "怎样为“附录A 所需工具”设计最小可重复调查？",
    "answer": "固定版本、输入、工作量、基线和停止条件，执行“在干净环境按清单安装并运行样例，比较本地与目标环境的版本和默认参数差异”，保存原始信号和探针开销，并用至少两个互斥假设解释差异。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "jvt-2e-appendix-a-tools-q3",
    "chapter": "jvt-2e-appendix-a-tools",
    "level": 3,
    "question": "为什么“工具版本和JDK不匹配、远程连接权限过大，或环境差异被误判为应用根因”是本页的高风险误区？",
    "answer": "它会让相关性、工具排序或未经验证的解释替代因果证据。应回到工具清单、版本输出、权限边界、样例启动与清理步骤，增加无探针对照、故障反例和修复后重放；无法推翻时只能保留为候选。",
    "tags": [
      "陷阱",
      "诊断"
    ]
  },
  {
    "id": "jvt-2e-appendix-a-tools-q4",
    "chapter": "jvt-2e-appendix-a-tools",
    "level": 4,
    "question": "如何判断“附录A 所需工具”中的探针效应没有扭曲结论？",
    "answer": "在同一环境和工作量下保留无探针、低扰动与目标探针三组运行，比较时序、CPU、分配、吞吐和结果；一次只改变一个采集条件，并注明工具与JDK版本。",
    "tags": [
      "探针效应",
      "对照"
    ]
  },
  {
    "id": "jvt-2e-appendix-a-tools-q5",
    "chapter": "jvt-2e-appendix-a-tools",
    "level": 4,
    "question": "AI可以怎样辅助“附录A 所需工具”，又不能替代什么？",
    "answer": "AI可在脱敏最小上下文中扩展互斥假设、反例和查询思路，但不能获得未提供的现场事实，也不能替代源码、运行证据、一手文档、生产授权和最终责任。每项输出都必须验证。",
    "tags": [
      "AI边界",
      "验证"
    ]
  },
  {
    "id": "jvt-2e-appendix-a-tools-q6",
    "chapter": "jvt-2e-appendix-a-tools",
    "level": 4,
    "question": "“附录A 所需工具”达到交接标准需要哪些证据？",
    "answer": "至少需要版本化环境、固定工作量、症状时间线、竞争假设、原始信号、故障对照、反例、修复前后结果、回滚阈值和恢复演练，并让他人仅凭工具清单、版本输出、权限边界、样例启动与清理步骤重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "jvt-2e-appendix-b-opening-project-q1",
    "chapter": "jvt-2e-appendix-b-opening-project",
    "level": 2,
    "question": "“附录B 打开项目”覆盖哪些官方节点，核心责任是什么？",
    "answer": "本页从“Appendix B: Opening a project”覆盖到“Appendix B: Opening a project”，共1个节点。核心是从源码、构建描述和运行配置打开案例工程，验证依赖解析、入口、测试与工作目录，交付物为克隆校验、构建命令、模块图、入口配置、首次失败记录。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "jvt-2e-appendix-b-opening-project-q2",
    "chapter": "jvt-2e-appendix-b-opening-project",
    "level": 3,
    "question": "怎样为“附录B 打开项目”设计最小可重复调查？",
    "answer": "固定版本、输入、工作量、基线和停止条件，执行“清空项目级缓存后从命令行构建，再由IDE导入，确认两条路径使用相同依赖和测试”，保存原始信号和探针开销，并用至少两个互斥假设解释差异。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "jvt-2e-appendix-b-opening-project-q3",
    "chapter": "jvt-2e-appendix-b-opening-project",
    "level": 3,
    "question": "为什么“把本机缓存成功当可复现构建，或在错误模块、配置和工作目录下调试”是本页的高风险误区？",
    "answer": "它会让相关性、工具排序或未经验证的解释替代因果证据。应回到克隆校验、构建命令、模块图、入口配置、首次失败记录，增加无探针对照、故障反例和修复后重放；无法推翻时只能保留为候选。",
    "tags": [
      "陷阱",
      "诊断"
    ]
  },
  {
    "id": "jvt-2e-appendix-b-opening-project-q4",
    "chapter": "jvt-2e-appendix-b-opening-project",
    "level": 4,
    "question": "如何判断“附录B 打开项目”中的探针效应没有扭曲结论？",
    "answer": "在同一环境和工作量下保留无探针、低扰动与目标探针三组运行，比较时序、CPU、分配、吞吐和结果；一次只改变一个采集条件，并注明工具与JDK版本。",
    "tags": [
      "探针效应",
      "对照"
    ]
  },
  {
    "id": "jvt-2e-appendix-b-opening-project-q5",
    "chapter": "jvt-2e-appendix-b-opening-project",
    "level": 4,
    "question": "AI可以怎样辅助“附录B 打开项目”，又不能替代什么？",
    "answer": "AI可在脱敏最小上下文中扩展互斥假设、反例和查询思路，但不能获得未提供的现场事实，也不能替代源码、运行证据、一手文档、生产授权和最终责任。每项输出都必须验证。",
    "tags": [
      "AI边界",
      "验证"
    ]
  },
  {
    "id": "jvt-2e-appendix-b-opening-project-q6",
    "chapter": "jvt-2e-appendix-b-opening-project",
    "level": 4,
    "question": "“附录B 打开项目”达到交接标准需要哪些证据？",
    "answer": "至少需要版本化环境、固定工作量、症状时间线、竞争假设、原始信号、故障对照、反例、修复前后结果、回滚阈值和恢复演练，并让他人仅凭克隆校验、构建命令、模块图、入口配置、首次失败记录重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "jvt-2e-appendix-c-reading-q1",
    "chapter": "jvt-2e-appendix-c-reading",
    "level": 2,
    "question": "“附录C 延伸阅读”覆盖哪些官方节点，核心责任是什么？",
    "answer": "本页从“Appendix C: Recommended further reading”覆盖到“Appendix C: Recommended further reading”，共1个节点。核心是按调试、性能、并发、JVM与分布式系统问题组织延伸资料，并记录资料能回答与不能回答的边界，交付物为阅读决策表、来源日期、版本适用域、待验证命题。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "jvt-2e-appendix-c-reading-q2",
    "chapter": "jvt-2e-appendix-c-reading",
    "level": 3,
    "question": "怎样为“附录C 延伸阅读”设计最小可重复调查？",
    "answer": "固定版本、输入、工作量、基线和停止条件，执行“选择一个相互冲突的调优建议，回到官方文档与可控基准，用数据决定适用条件”，保存原始信号和探针开销，并用至少两个互斥假设解释差异。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "jvt-2e-appendix-c-reading-q3",
    "chapter": "jvt-2e-appendix-c-reading",
    "level": 3,
    "question": "为什么“用二手结论替代当前版本文档，或无限阅读却不更新假设和实验”是本页的高风险误区？",
    "answer": "它会让相关性、工具排序或未经验证的解释替代因果证据。应回到阅读决策表、来源日期、版本适用域、待验证命题，增加无探针对照、故障反例和修复后重放；无法推翻时只能保留为候选。",
    "tags": [
      "陷阱",
      "诊断"
    ]
  },
  {
    "id": "jvt-2e-appendix-c-reading-q4",
    "chapter": "jvt-2e-appendix-c-reading",
    "level": 4,
    "question": "如何判断“附录C 延伸阅读”中的探针效应没有扭曲结论？",
    "answer": "在同一环境和工作量下保留无探针、低扰动与目标探针三组运行，比较时序、CPU、分配、吞吐和结果；一次只改变一个采集条件，并注明工具与JDK版本。",
    "tags": [
      "探针效应",
      "对照"
    ]
  },
  {
    "id": "jvt-2e-appendix-c-reading-q5",
    "chapter": "jvt-2e-appendix-c-reading",
    "level": 4,
    "question": "AI可以怎样辅助“附录C 延伸阅读”，又不能替代什么？",
    "answer": "AI可在脱敏最小上下文中扩展互斥假设、反例和查询思路，但不能获得未提供的现场事实，也不能替代源码、运行证据、一手文档、生产授权和最终责任。每项输出都必须验证。",
    "tags": [
      "AI边界",
      "验证"
    ]
  },
  {
    "id": "jvt-2e-appendix-c-reading-q6",
    "chapter": "jvt-2e-appendix-c-reading",
    "level": 4,
    "question": "“附录C 延伸阅读”达到交接标准需要哪些证据？",
    "answer": "至少需要版本化环境、固定工作量、症状时间线、竞争假设、原始信号、故障对照、反例、修复前后结果、回滚阈值和恢复演练，并让他人仅凭阅读决策表、来源日期、版本适用域、待验证命题重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "jvt-2e-appendix-d-threads-q1",
    "chapter": "jvt-2e-appendix-d-threads",
    "level": 2,
    "question": "“附录D 理解Java线程”覆盖哪些官方节点，核心责任是什么？",
    "answer": "本页从“Appendix D: Understanding Java threads”覆盖到“D.5 Further reading”，共15个节点。核心是掌握线程生命周期、同步、等待通知、join、定时阻塞和并发工具，并区分竞态、死锁、活锁与饥饿，交付物为线程状态图、共享不变量、锁序、等待条件循环、四类并发故障测试。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "jvt-2e-appendix-d-threads-q2",
    "chapter": "jvt-2e-appendix-d-threads",
    "level": 3,
    "question": "怎样为“附录D 理解Java线程”设计最小可重复调查？",
    "answer": "固定版本、输入、工作量、基线和停止条件，执行“分别构造竞态、死锁、活锁和饥饿，记录状态序列与终止条件，再用正确同步原语修复”，保存原始信号和探针开销，并用至少两个互斥假设解释差异。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "jvt-2e-appendix-d-threads-q3",
    "chapter": "jvt-2e-appendix-d-threads",
    "level": 3,
    "question": "为什么“用sleep协调正确性、在循环外wait、丢失中断，或把无死锁等同于无并发错误”是本页的高风险误区？",
    "answer": "它会让相关性、工具排序或未经验证的解释替代因果证据。应回到线程状态图、共享不变量、锁序、等待条件循环、四类并发故障测试，增加无探针对照、故障反例和修复后重放；无法推翻时只能保留为候选。",
    "tags": [
      "陷阱",
      "诊断"
    ]
  },
  {
    "id": "jvt-2e-appendix-d-threads-q4",
    "chapter": "jvt-2e-appendix-d-threads",
    "level": 4,
    "question": "如何判断“附录D 理解Java线程”中的探针效应没有扭曲结论？",
    "answer": "在同一环境和工作量下保留无探针、低扰动与目标探针三组运行，比较时序、CPU、分配、吞吐和结果；一次只改变一个采集条件，并注明工具与JDK版本。",
    "tags": [
      "探针效应",
      "对照"
    ]
  },
  {
    "id": "jvt-2e-appendix-d-threads-q5",
    "chapter": "jvt-2e-appendix-d-threads",
    "level": 4,
    "question": "AI可以怎样辅助“附录D 理解Java线程”，又不能替代什么？",
    "answer": "AI可在脱敏最小上下文中扩展互斥假设、反例和查询思路，但不能获得未提供的现场事实，也不能替代源码、运行证据、一手文档、生产授权和最终责任。每项输出都必须验证。",
    "tags": [
      "AI边界",
      "验证"
    ]
  },
  {
    "id": "jvt-2e-appendix-d-threads-q6",
    "chapter": "jvt-2e-appendix-d-threads",
    "level": 4,
    "question": "“附录D 理解Java线程”达到交接标准需要哪些证据？",
    "answer": "至少需要版本化环境、固定工作量、症状时间线、竞争假设、原始信号、故障对照、反例、修复前后结果、回滚阈值和恢复演练，并让他人仅凭线程状态图、共享不变量、锁序、等待条件循环、四类并发故障测试重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "jvt-2e-appendix-e-memory-q1",
    "chapter": "jvt-2e-appendix-e-memory",
    "level": 2,
    "question": "“附录E Java应用内存管理”覆盖哪些官方节点，核心责任是什么？",
    "answer": "本页从“Appendix E: Memory management in Java apps”覆盖到“E.4 The metaspace memory location for storing data types”，共5个节点。核心是区分线程栈、对象堆与类元数据空间，将OOM、栈溢出和类加载增长映射到不同证据，交付物为内存区域图、对象生命周期、容量与上限、区域特定故障实验。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "jvt-2e-appendix-e-memory-q2",
    "chapter": "jvt-2e-appendix-e-memory",
    "level": 3,
    "question": "怎样为“附录E Java应用内存管理”设计最小可重复调查？",
    "answer": "固定版本、输入、工作量、基线和停止条件，执行“分别制造递归栈增长、堆对象保留和动态类加载，比较错误、日志和监控信号”，保存原始信号和探针开销，并用至少两个互斥假设解释差异。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "jvt-2e-appendix-e-memory-q3",
    "chapter": "jvt-2e-appendix-e-memory",
    "level": 3,
    "question": "为什么“把JVM进程内存全部等同于堆，或通过盲目增大堆掩盖保留与本地内存问题”是本页的高风险误区？",
    "answer": "它会让相关性、工具排序或未经验证的解释替代因果证据。应回到内存区域图、对象生命周期、容量与上限、区域特定故障实验，增加无探针对照、故障反例和修复后重放；无法推翻时只能保留为候选。",
    "tags": [
      "陷阱",
      "诊断"
    ]
  },
  {
    "id": "jvt-2e-appendix-e-memory-q4",
    "chapter": "jvt-2e-appendix-e-memory",
    "level": 4,
    "question": "如何判断“附录E Java应用内存管理”中的探针效应没有扭曲结论？",
    "answer": "在同一环境和工作量下保留无探针、低扰动与目标探针三组运行，比较时序、CPU、分配、吞吐和结果；一次只改变一个采集条件，并注明工具与JDK版本。",
    "tags": [
      "探针效应",
      "对照"
    ]
  },
  {
    "id": "jvt-2e-appendix-e-memory-q5",
    "chapter": "jvt-2e-appendix-e-memory",
    "level": 4,
    "question": "AI可以怎样辅助“附录E Java应用内存管理”，又不能替代什么？",
    "answer": "AI可在脱敏最小上下文中扩展互斥假设、反例和查询思路，但不能获得未提供的现场事实，也不能替代源码、运行证据、一手文档、生产授权和最终责任。每项输出都必须验证。",
    "tags": [
      "AI边界",
      "验证"
    ]
  },
  {
    "id": "jvt-2e-appendix-e-memory-q6",
    "chapter": "jvt-2e-appendix-e-memory",
    "level": 4,
    "question": "“附录E Java应用内存管理”达到交接标准需要哪些证据？",
    "answer": "至少需要版本化环境、固定工作量、症状时间线、竞争假设、原始信号、故障对照、反例、修复前后结果、回滚阈值和恢复演练，并让他人仅凭内存区域图、对象生命周期、容量与上限、区域特定故障实验重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "jvt-2e-appendix-f-references-q1",
    "chapter": "jvt-2e-appendix-f-references",
    "level": 2,
    "question": "“附录F 参考资料”覆盖哪些官方节点，核心责任是什么？",
    "answer": "本页从“Appendix F: references”覆盖到“Appendix F: references”，共1个节点。核心是维护本书调查方法所依赖的来源、版本和访问日期，使关键判断可追溯且可在版本变化时复核，交付物为来源账本、版本适用域、命题到证据映射、复核日期。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "jvt-2e-appendix-f-references-q2",
    "chapter": "jvt-2e-appendix-f-references",
    "level": 3,
    "question": "怎样为“附录F 参考资料”设计最小可重复调查？",
    "answer": "固定版本、输入、工作量、基线和停止条件，执行“随机抽取一个工具参数和一个JVM行为命题，追到一手资料并在当前环境最小复现”，保存原始信号和探针开销，并用至少两个互斥假设解释差异。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "jvt-2e-appendix-f-references-q3",
    "chapter": "jvt-2e-appendix-f-references",
    "level": 3,
    "question": "为什么“引用无法定位、资料版本与运行环境不符，或把工具输出解释包装成原作者结论”是本页的高风险误区？",
    "answer": "它会让相关性、工具排序或未经验证的解释替代因果证据。应回到来源账本、版本适用域、命题到证据映射、复核日期，增加无探针对照、故障反例和修复后重放；无法推翻时只能保留为候选。",
    "tags": [
      "陷阱",
      "诊断"
    ]
  },
  {
    "id": "jvt-2e-appendix-f-references-q4",
    "chapter": "jvt-2e-appendix-f-references",
    "level": 4,
    "question": "如何判断“附录F 参考资料”中的探针效应没有扭曲结论？",
    "answer": "在同一环境和工作量下保留无探针、低扰动与目标探针三组运行，比较时序、CPU、分配、吞吐和结果；一次只改变一个采集条件，并注明工具与JDK版本。",
    "tags": [
      "探针效应",
      "对照"
    ]
  },
  {
    "id": "jvt-2e-appendix-f-references-q5",
    "chapter": "jvt-2e-appendix-f-references",
    "level": 4,
    "question": "AI可以怎样辅助“附录F 参考资料”，又不能替代什么？",
    "answer": "AI可在脱敏最小上下文中扩展互斥假设、反例和查询思路，但不能获得未提供的现场事实，也不能替代源码、运行证据、一手文档、生产授权和最终责任。每项输出都必须验证。",
    "tags": [
      "AI边界",
      "验证"
    ]
  },
  {
    "id": "jvt-2e-appendix-f-references-q6",
    "chapter": "jvt-2e-appendix-f-references",
    "level": 4,
    "question": "“附录F 参考资料”达到交接标准需要哪些证据？",
    "answer": "至少需要版本化环境、固定工作量、症状时间线、竞争假设、原始信号、故障对照、反例、修复前后结果、回滚阈值和恢复演练，并让他人仅凭来源账本、版本适用域、命题到证据映射、复核日期重放。",
    "tags": [
      "验收",
      "交接"
    ]
  },
  {
    "id": "jvt-2e-official-final-review-q1",
    "chapter": "jvt-2e-official-final-review",
    "level": 2,
    "question": "“《Troubleshooting Java（第2版）》全书总复习”覆盖哪些官方节点，核心责任是什么？",
    "answer": "本页从“Part 1 Revisiting the foundation for code investigation”覆盖到“Appendix F: references”，共24个节点。核心是用一次跨线程、内存和服务边界的综合事故答辩串联138个正式目录节点，并证明结论可复现可推翻，交付物为事故档案、假设演化、原始证据、修复对照、恢复演练、预防项与复核日期。",
    "tags": [
      "官方目录",
      "结构"
    ]
  },
  {
    "id": "jvt-2e-official-final-review-q2",
    "chapter": "jvt-2e-official-final-review",
    "level": 3,
    "question": "怎样为“《Troubleshooting Java（第2版）》全书总复习”设计最小可重复调查？",
    "answer": "固定版本、输入、工作量、基线和停止条件，执行“随机抽取一个正式节点，将其嵌入综合事故，要求另一位读者仅凭档案重放并尝试推翻结论”，保存原始信号和探针开销，并用至少两个互斥假设解释差异。",
    "tags": [
      "实验",
      "证据"
    ]
  },
  {
    "id": "jvt-2e-official-final-review-q3",
    "chapter": "jvt-2e-official-final-review",
    "level": 3,
    "question": "为什么“事后故事只解释已知答案，没有对照实验、反例、恢复验证和所有者明确的整改”是本页的高风险误区？",
    "answer": "它会让相关性、工具排序或未经验证的解释替代因果证据。应回到事故档案、假设演化、原始证据、修复对照、恢复演练、预防项与复核日期，增加无探针对照、故障反例和修复后重放；无法推翻时只能保留为候选。",
    "tags": [
      "陷阱",
      "诊断"
    ]
  },
  {
    "id": "jvt-2e-official-final-review-q4",
    "chapter": "jvt-2e-official-final-review",
    "level": 4,
    "question": "如何判断“《Troubleshooting Java（第2版）》全书总复习”中的探针效应没有扭曲结论？",
    "answer": "在同一环境和工作量下保留无探针、低扰动与目标探针三组运行，比较时序、CPU、分配、吞吐和结果；一次只改变一个采集条件，并注明工具与JDK版本。",
    "tags": [
      "探针效应",
      "对照"
    ]
  },
  {
    "id": "jvt-2e-official-final-review-q5",
    "chapter": "jvt-2e-official-final-review",
    "level": 4,
    "question": "AI可以怎样辅助“《Troubleshooting Java（第2版）》全书总复习”，又不能替代什么？",
    "answer": "AI可在脱敏最小上下文中扩展互斥假设、反例和查询思路，但不能获得未提供的现场事实，也不能替代源码、运行证据、一手文档、生产授权和最终责任。每项输出都必须验证。",
    "tags": [
      "AI边界",
      "验证"
    ]
  },
  {
    "id": "jvt-2e-official-final-review-q6",
    "chapter": "jvt-2e-official-final-review",
    "level": 4,
    "question": "“《Troubleshooting Java（第2版）》全书总复习”达到交接标准需要哪些证据？",
    "answer": "至少需要版本化环境、固定工作量、症状时间线、竞争假设、原始信号、故障对照、反例、修复前后结果、回滚阈值和恢复演练，并让他人仅凭事故档案、假设演化、原始证据、修复对照、恢复演练、预防项与复核日期重放。",
    "tags": [
      "验收",
      "交接"
    ]
  }
];
