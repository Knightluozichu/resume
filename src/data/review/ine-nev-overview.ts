import type { ReviewQuestion } from "./types";

export const ineNevOverviewQuestions: ReviewQuestion[] = [
  {
    id: "ine-nev-overview-01",
    chapter: "ine-nev-overview",
    level: 1,
    question: "新能源汽车分为哪三大类型？各自的核心特征是什么？",
    answer: "三大类型：BEV纯电动（零排放、纯电驱动、无发动机、可外接充电、续航400-700km）；PHEV插电混动（双动力、发动机+电机、可外接充电、纯电续航50-150km）；HEV油电混动（发动机为主、电机辅助、不可外接充电、纯电续航1-5km）。",
    tags: ["BEV", "PHEV", "HEV", "类型对比"],
  },
  {
    id: "ine-nev-overview-02",
    chapter: "ine-nev-overview",
    level: 1,
    question: "BEV、PHEV、HEV 的能量流动路径分别是什么？",
    answer: "BEV：电网→电池→电机→车轮，纯电驱动无发动机参与。PHEV：油/电→电池→发动机/电机→车轮，双动力可串联或并联工作。HEV：燃油→发动机→电机辅助→车轮，发动机为主力，电机仅辅助加速和制动回收，不可外接充电。",
    tags: ["能量流", "BEV", "PHEV", "HEV", "能量路径"],
  },
  {
    id: "ine-nev-overview-03",
    chapter: "ine-nev-overview",
    level: 2,
    question: "区分 PHEV 与 HEV 的关键特征是什么？为什么 HEV 不能称为新能源车？",
    answer: "关键区分特征是「外接充电能力」：PHEV 可外接充电，电池容量中等，纯电续航50-150km；HEV 不可外接充电，电池容量极小，纯电续航仅1-5km，电力来自发动机发电和制动回收。HEV 的主动力仍是燃油发动机，电池仅起辅助作用，不能实现零排放行驶，因此严格意义上不属于新能源汽车。",
    tags: ["PHEV", "HEV", "外接充电", "新能源定义"],
  },
  {
    id: "ine-nev-overview-04",
    chapter: "ine-nev-overview",
    level: 2,
    question: "什么是新能源汽车的「三电系统」？三者在能量流动中各自的角色是什么？",
    answer: "三电系统指电池、电机、电控。电池是能量存储单元（化学能↔电能），是整车的「油箱」；电机是能量转换单元（电能→机械能驱动，机械能→电能回收），是整车的「发动机」；电控是能量管理单元（逆变器+MCU控制电机、BMS管理电池），是整车的「大脑」。能量流动：电池→电控→电机→车轮（驱动），车轮→电机→电控→电池（回收）。",
    tags: ["三电系统", "电池", "电机", "电控", "能量流动"],
  },
];
