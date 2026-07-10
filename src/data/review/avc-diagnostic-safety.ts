import type { ReviewQuestion } from "./types";

export const avcDiagnosticSafetyQuestions: ReviewQuestion[] = [
  {
    id: "avc-diagnostic-safety-01",
    chapter: "avc-diagnostic-safety",
    level: 1,
    question: "UDS（统一诊断服务）协议的标准号是什么？列出至少4个常用诊断服务。",
    answer: "UDS协议标准号为ISO 14229。常用诊断服务：① 0x10 诊断会话控制（Diagnostic Session Control）——切换默认/扩展/编程会话；② 0x22 读数据（Read Data By Identifier）——读取DID标识的数据；③ 0x2E 写数据（Write Data By Identifier）——写入DID数据（如标定参数）；④ 0x31 例程控制（Routine Control）——执行特定例程（如擦除Flash）；⑤ 0x19 读取DTC信息（Read DTC Information）——读取诊断故障码；⑥ 0x11 ECU复位（ECU Reset）——软/硬复位ECU。",
    tags: ["UDS", "ISO 14229", "诊断服务", "DTC", "会话控制"],
  },
  {
    id: "avc-diagnostic-safety-02",
    chapter: "avc-diagnostic-safety",
    level: 1,
    question: "ISO 26262 定义的 ASIL 安全等级有哪些？各等级的含义是什么？",
    answer: "ASIL（Automotive Safety Integrity Level）分为四个等级：ASIL A（最低）——轻微伤害风险，需基本安全机制；ASIL B——中度伤害风险，需额外安全措施；ASIL C——严重伤害风险，需严格安全机制；ASIL D（最高）——致命伤害风险，需最高级别安全机制（如冗余、锁步核、高强度监控）。此外还有QM（Quality Management）——无安全要求，按常规质量管理。ASIL等级通过HARA（危害分析与风险评估）确定，综合考虑严重度、暴露率和可控性。等级越高，要求的硬件诊断覆盖率和软件安全机制越严格。",
    tags: ["ISO 26262", "ASIL", "安全等级", "HARA", "QM"],
  },
  {
    id: "avc-diagnostic-safety-03",
    chapter: "avc-diagnostic-safety",
    level: 2,
    question: "Dem、Fim 和 Dcm 三个诊断模块如何协同工作？描述故障从发生到上报的完整流程。",
    answer: "协同流程：① 故障检测——SWC或BSW模块检测到异常条件（如传感器信号超限），调用Dem_SetEventStatus()向Dem报告事件；② Dem记录——Dem（诊断事件管理）记录故障事件，生成DTC（诊断故障码），存储快照数据（故障发生时的环境数据如车速、温度）；③ Fim评估——Fim（功能抑制管理）查询Dem的故障状态，根据配置评估哪些应用功能需要被抑制（如传感器故障时抑制依赖该传感器的控制功能），通知SWC降低或禁用功能；④ Dcm上报——当诊断仪请求时，Dcm（诊断通信管理）通过UDS服务（0x19）从Dem读取DTC信息和快照，通过CanTp/DoIP返回给诊断仪。三者形成「检测→记录→抑制→上报」的完整诊断链路。",
    tags: ["Dem", "Fim", "Dcm", "DTC", "故障检测", "功能抑制", "诊断上报"],
  },
  {
    id: "avc-diagnostic-safety-04",
    chapter: "avc-diagnostic-safety",
    level: 3,
    question: "在 AUTOSAR 中如何实现一个 ASIL D 级别的安全机制？请以制动控制为例说明。",
    answer: "ASIL D级别制动控制安全机制实现：① 冗余采集——使用双路ADC采集制动踏板位置传感器信号，两路信号交叉比较，差异超阈值则报故障（硬件冗余）；② WdgM程序流监控——制动控制Runnable在每个执行周期设置检查点（Checkpoint），WdgM验证检查点按时序到达，程序流异常则触发安全状态（程序流监控）；③ E2E保护——制动控制信号通信使用End-to-End保护（CRC校验+Alive Counter），防止通信错误导致误动作（通信安全）；④ 安全状态——检测到任何致命故障时，BswM执行安全状态切换：禁用制动助力→切换到后备制动模式（机械制动）→点亮故障灯→记录DTC；⑤ ASIL D OS——使用OS的内存分区（MPU）和时序保护，隔离安全和非安全任务。核心思路：通过多层冗余和监控确保单点故障不会导致制动功能丧失，故障时安全降级而非危险失效。",
    tags: ["ASIL D", "安全机制", "制动控制", "冗余", "WdgM", "E2E保护", "安全状态"],
  },
];
