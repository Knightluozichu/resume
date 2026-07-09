import type { ReviewQuestion } from "./types";

export const ineBmsThermalQuestions: ReviewQuestion[] = [
  {
    id: "ine-bms-thermal-01",
    chapter: "ine-bms-thermal",
    level: 1,
    question: "BMS 的三层架构是什么？各层的职责是什么？",
    answer: "三层架构：BMU电池管理主控（SOC/SOH估算、均衡策略、通信管理，是决策中枢）；CMU电池管理从控（电压/温度采集、模组级监控、故障上报，是感知节点）；HVU高压管理单元（继电器控制、绝缘检测、预充电，是执行节点）。BMU决策→CMU感知→HVU执行，形成「感知-决策-执行」闭环。",
    tags: ["BMS", "BMU", "CMU", "HVU", "三层架构"],
  },
  {
    id: "ine-bms-thermal-02",
    chapter: "ine-bms-thermal",
    level: 1,
    question: "SOC、SOH、SOP 分别表示什么？为什么 SOC 估算困难？",
    answer: "SOC（State of Charge）荷电状态=剩余电量/总容量，类似油表；SOH（State of Health）健康状态=当前容量/初始容量，反映电池老化程度；SOP（State of Power）功率状态=当前可充放电最大功率。SOC估算困难因为：电池是化学系统无法直接测量电量、只能通过电压/电流/温度间接推算、容量随温度和老化变化、开路电压曲线在SOC 20-80%段非常平坦（电压变化小难分辨）。",
    tags: ["SOC", "SOH", "SOP", "荷电状态", "健康状态", "估算"],
  },
  {
    id: "ine-bms-thermal-03",
    chapter: "ine-bms-thermal",
    level: 2,
    question: "电池的最佳工作温度是多少？低温和高温对电池各有什么危害？",
    answer: "最佳工作温度20-35°C，内阻最低效率最高。低温（<0°C）危害：内阻增大容量衰减（可用容量降低30-50%）、充电时负极析锂（锂离子无法嵌入石墨，形成锂枝晶刺穿隔膜导致短路）、禁止快充。高温（>45°C）危害：电池寿命加速衰减（每升高10°C寿命减半的阿伦尼乌斯规律）、SEI膜增厚内阻增加、热失控风险上升（电解液分解产气膨胀）。热管理系统通过液冷散热和PTC加热维持最佳温度。",
    tags: ["最佳温度", "低温危害", "高温危害", "析锂", "热失控", "热管理"],
  },
  {
    id: "ine-bms-thermal-04",
    chapter: "ine-bms-thermal",
    level: 3,
    question: "被动均衡与主动均衡的原理和区别是什么？为什么需要均衡？",
    answer: "需要均衡因为电芯制造差异和使用中不一致性导致容量和电压分化，木桶效应使电池包总容量受限于最弱电芯。被动均衡：通过并联电阻将高电压电芯多余电量以热量耗散，简单低成本但效率低（只能均衡充电、耗散能量）。主动均衡：通过电容或电感将高电压电芯电量转移到低电压电芯，复杂高成本但效率高（充放电均可均衡、能量不浪费）。主动均衡效果更好但成本高，被动均衡是主流经济方案。",
    tags: ["被动均衡", "主动均衡", "电芯一致性", "木桶效应"],
  },
];
