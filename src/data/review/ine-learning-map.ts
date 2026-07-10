import type { ReviewQuestion } from "./types";

export const ineLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "ine-learning-map-01",
    chapter: "ine-learning-map",
    level: 1,
    question: `《图解新能源汽车》全书分为哪五个学习阶段？`,
    answer: `五个学习阶段为：基础认知（知识全景图与NEV概览）、动力系统（电池、驱动电机、电力电子）、充电与管理（充电系统、BMS、热管理）、整车架构（底盘与车身）、未来与复习（安全技术与未来趋势、知识整合）。`,
    tags: ["学习路径", "知识全景", "阶段划分"],
  },
  {
    id: "ine-learning-map-02",
    chapter: "ine-learning-map",
    level: 1,
    question: `为什么在学习充电系统之前必须先掌握电池系统与驱动电机？`,
    answer: `充电系统的本质是向电池包输入电能，不理解电池的电芯结构与电压特性就无法理解充电策略与保护机制；驱动电机是电能的消耗端，不理解电机就无法理解能量从电池到车轮的完整流动。充电管理建立在对电池和电机的理解之上。`,
    tags: ["学习顺序", "前置依赖", "基础机制"],
  },
  {
    id: "ine-learning-map-03",
    chapter: "ine-learning-map",
    level: 2,
    question: `全书学习路径的核心脉络是什么？如何形成系统闭环？`,
    answer: `核心脉络为：理解类型 → 掌握电池 → 驱动电机 → 电力变换 → 充电系统 → 管理温控 → 整车架构 → 安全趋势 → 知识闭环。通过全书复习将各阶段串联，从认知层到未来层形成五层系统视角，最终在能量流动决策链中完成知识闭环。`,
    tags: ["核心脉络", "系统闭环", "复习整合"],
  },
  {
    id: "ine-learning-map-04",
    chapter: "ine-learning-map",
    level: 2,
    question: `用五层系统视角概括新能源汽车知识体系。`,
    answer: `五层视角为：认知层（NEV三大类型、三电系统概念，建立系统认知）；动力层（电池电芯到包、PMSM电机控制、逆变器/DC-DC/OBC、SiC功率器件，定义能量转换）；管理层（充电系统、BMS三层架构、热管理液冷加热、SOC/SOH估算，定义监控保护）；架构层（纯电专属平台、滑板底盘、CTC电池即车身、底盘四大系统，定义整车结构）；未来层（高压安全、功能安全、智能驾驶、固态电池/800V，定义安全演进）。`,
    tags: ["五层视角", "认知层", "动力层", "管理层", "架构层", "未来层"],
  },
];
