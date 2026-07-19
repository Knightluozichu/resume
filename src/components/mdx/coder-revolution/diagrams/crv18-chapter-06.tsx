import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-chapter-06",
  title: "第6章 老司机的精进",
  family: "growth",
  nodes: ["选择能力", "设计实践", "产出作品", "获得反馈", "复盘迭代"],
  concepts: ["第6章 老司机的精进"],
  mechanism:
    "职业精进依赖可持续的行动、基础模型、作品输出、反馈和复盘；经验年限本身不能替代这些证据",
  success: "第6章 老司机的精进 的输入、机制、输出与复位轨迹一致",
  failure:
    "第6章 老司机的精进 在“只收集课程和观点而没有输出、复现或外部反馈”处拒绝",
} as const;

export function Crv18Chapter06Lab() {
  return <CoderMechanismLab {...profile} />;
}
