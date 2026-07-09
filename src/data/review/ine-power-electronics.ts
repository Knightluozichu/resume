import type { ReviewQuestion } from "./types";

export const inePowerElectronicsQuestions: ReviewQuestion[] = [
  {
    id: "ine-power-electronics-01",
    chapter: "ine-power-electronics",
    level: 1,
    question: "新能源汽车电力电子的三大核心部件是什么？各自的功能是什么？",
    answer: "三大核心部件：逆变器Inverter（DC→三相AC，将电池直流电转换为电机所需三相交流电，功率100-300kW，效率97%+）；DC-DC变换器（高压400V→低压12V，为低压蓄电池和车载电子设备供电，功率1.5-3kW，效率94%+）；车载充电机OBC（AC 220V→DC 400V，交流充电时将电网交流电转换为直流电充入电池，功率3.3-22kW，效率94%+）。",
    tags: ["逆变器", "DC-DC", "OBC", "电力电子"],
  },
  {
    id: "ine-power-electronics-02",
    chapter: "ine-power-electronics",
    level: 1,
    question: "IGBT 与 SiC MOSFET 的主要区别是什么？为什么 800V 平台首选 SiC？",
    answer: "IGBT：硅基器件、成熟低成本、开关频率10-20kHz、适合400V平台。SiC MOSFET：碳化硅器件、低损耗耐高温、开关频率50-100kHz、成本较高。800V平台首选SiC因为：更高开关频率减少磁性元件体积、更低导通损耗减少发热、更高耐压适配800V系统、更高效率提升续航。P=UI，800V相比400V电流减半，线损（I²R）降为1/4，SiC的低损耗优势更显著。",
    tags: ["IGBT", "SiC", "MOSFET", "800V平台", "功率器件"],
  },
  {
    id: "ine-power-electronics-03",
    chapter: "ine-power-electronics",
    level: 2,
    question: "SVPWM（空间矢量脉宽调制）的作用是什么？相比 SPWM 有什么优势？",
    answer: "SVPWM 通过合理选择电压矢量的开关组合，在电机定子中产生近似圆形旋转磁场，驱动电机平滑运转。相比SPWM（正弦脉宽调制），SVPWM 优势：直流母线电压利用率高约15%（可达100% vs SPWM的86.6%）、输出电压谐波更少、电机转矩脉动更小、实现简单（只需开关状态切换）。SVPWM 是 FOC 控制中将 dq 域电压指令转化为逆变器开关信号的关键环节。",
    tags: ["SVPWM", "SPWM", "脉宽调制", "电压利用率", "FOC"],
  },
  {
    id: "ine-power-electronics-04",
    chapter: "ine-power-electronics",
    level: 3,
    question: "800V 高压平台相比 400V 有什么优势？需要哪些关键部件升级？",
    answer: "800V 优势：充电功率提升（相同电流下功率翻倍，P=UI）、线损降低（电流减半，I²R 损耗降为1/4）、充电速度提升（15分钟充至80%）、线束减细减重。关键部件升级：电机绕组绝缘等级提升、逆变器功率器件从IGBT升级为SiC MOSFET（耐压更高）、电池包串联更多电芯（从108S→216S）、高压线束和连接器耐压等级提升、PTC/压缩机等高压附件适配。800V 平台是快充和高效化的技术方向。",
    tags: ["800V平台", "400V", "SiC", "线损", "快充", "高压平台"],
  },
];
