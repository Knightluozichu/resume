import type { ReviewQuestion } from "./types";

export const ineBatterySystemQuestions: ReviewQuestion[] = [
  {
    id: "ine-battery-system-01",
    chapter: "ine-battery-system",
    level: 1,
    question: "电池系统的三级结构是什么？每一级的作用是什么？",
    answer: "三级结构为电芯Cell→模组Module→电池包Pack。电芯是最小单元（~3.7V），实现化学能与电能的转换；模组是中间单元（~48V），由多个电芯串并联组成，含汇流排和采样板；电池包是完整总成（~400V），由多个模组组成，含BMS采集板、高压分配盒、液冷管路和防护结构（IP67+）。",
    tags: ["电芯", "模组", "电池包", "三级结构"],
  },
  {
    id: "ine-battery-system-02",
    chapter: "ine-battery-system",
    level: 1,
    question: "磷酸铁锂（LFP）与三元锂（NCM）的主要区别是什么？",
    answer: "LFP：能量密度中（~160Wh/kg）、安全性高、成本低、循环寿命长，适合经济型车型。NCM：能量密度高（~250Wh/kg）、安全性中、成本高、循环寿命中，适合长续航车型。LFP 热稳定性更好不易热失控，NCM 能量密度更高续航更长。",
    tags: ["LFP", "NCM", "磷酸铁锂", "三元锂", "能量密度", "安全性"],
  },
  {
    id: "ine-battery-system-03",
    chapter: "ine-battery-system",
    level: 2,
    question: "什么是 CTP 和 CTC 技术？它们各自的优势是什么？",
    answer: "CTP（Cell to Pack）跳过模组层级，将电芯直接集成到电池包，减少结构件，提升体积利用率15-20%，降低成本。CTC（Cell to Chassis）将电芯直接集成到车身底盘，电池包成为车身结构件的一部分，进一步减重、提升空间利用率和车身刚性，但维修难度增大。两者都是结构创新，旨在提升能量密度和降低成本。",
    tags: ["CTP", "CTC", "结构创新", "体积利用率"],
  },
  {
    id: "ine-battery-system-04",
    chapter: "ine-battery-system",
    level: 3,
    question: "电池包内的串联与并联如何影响电压和容量？4P12S 表示什么？",
    answer: "串联（S）提升电压但不增加容量，并联（P）提升容量但不增加电压。4P12S 表示12个电芯串联为一组（电压=12x3.7V=44.4V），4组并联（容量=4x单电芯容量），总电芯数=12x4=48个。串并联设计需平衡电压（满足电机需求）与容量（满足续航需求），同时保证一致性（各电芯电压差控制在10mV内）。",
    tags: ["串联", "并联", "4P12S", "电压", "容量", "一致性"],
  },
];
