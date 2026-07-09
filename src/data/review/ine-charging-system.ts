import type { ReviewQuestion } from "./types";

export const ineChargingSystemQuestions: ReviewQuestion[] = [
  {
    id: "ine-charging-system-01",
    chapter: "ine-charging-system",
    level: 1,
    question: "交流充电与直流充电的根本区别是什么？",
    answer: "根本区别在于「电能转换发生在哪里」。交流充电：电网交流电→车载OBC整流为直流→充入电池，转换在车内完成，功率受OBC限制（3.3-22kW），充电慢（6-10小时）但成本低。直流充电：电网交流电→充电桩内整流为直流→直接充入电池，转换在桩内完成，跳过OBC，功率大（60-350kW），充电快（20-60分钟）但成本高。",
    tags: ["交流充电", "直流充电", "OBC", "快充", "慢充"],
  },
  {
    id: "ine-charging-system-02",
    chapter: "ine-charging-system",
    level: 1,
    question: "主流充电标准有哪四种？分别对应哪些地区？",
    answer: "四种主流标准：GB/T（中国标准，AC: GB/T 20234，DC: GB/T 20234.3）；CCS组合充电系统（欧美标准，Type 1美/Type 2欧）；CHAdeMO（日本标准，仅DC快充，最大功率400kW）；NACS/Tesla（北美统一标准，AC+DC一体接口，V4超充350kW+）。不同标准接口物理形状和通信协议不同，需要适配。",
    tags: ["GB/T", "CCS", "CHAdeMO", "NACS", "充电标准"],
  },
  {
    id: "ine-charging-system-03",
    chapter: "ine-charging-system",
    level: 2,
    question: "快充曲线的三个阶段是什么？为什么 80% 之后充电速度会变慢？",
    answer: "三阶段：恒流快充（SOC 10-80%，大电流恒定，充电最快）→恒压阶段（SOC 80-95%，电压恒定电流递减）→涓流补满（SOC 95-100%，小电流补满）。80%后变慢原因：电池接近满电时内阻增大，持续大电流会导致过充和析锂风险，BMS 主动降低电流保护电池。恒压阶段是化学平衡的需要，锂离子嵌入负极的速度变慢，必须降低电流防止极化。",
    tags: ["快充曲线", "恒流", "恒压", "涓流", "SOC", "BMS保护"],
  },
  {
    id: "ine-charging-system-04",
    chapter: "ine-charging-system",
    level: 3,
    question: "什么是 V2G？它对电网和车主各有什么价值？",
    answer: "V2G（Vehicle to Grid）是车辆电池反向供电给电网的技术，核心是双向充放电。对电网价值：调峰填谷（用电低谷充电、高峰放电）、频率调节、缓解可再生能源间歇性。对车主价值：降低充电成本（低谷充电高峰卖出赚取差价）、应急供电（V2L/V2H为家庭或设备供电）。挑战：需要双向OBC和V2G协议、电池循环次数增加影响寿命、电网需支持双向计量。",
    tags: ["V2G", "V2L", "V2H", "双向充放电", "调峰填谷", "能源管理"],
  },
];
