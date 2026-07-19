import { ConstructionMechanismLab } from "./construction-mechanism-lab";

const profile = {
  unitId: "cc2e-02-software-metaphors",
  title: "第2章：用隐喻来更充分地理解软件开发",
  nodes: ["陌生问题", "候选隐喻", "结构启发", "反例检查", "工程决定"],
  concepts: [
    "第2章 用隐喻来更充分地理解软件开发",
    "2.1 隐喻的重要性",
    "2.2 如何使用软件隐喻",
    "2.3 常见的软件隐喻",
    "软件中的书法：写作代码",
    "软件的耕作法：培植系统",
    "软件的牡蛎养殖观点：系统生长",
    "软件构建：建造软件",
    "应用软件技术：智慧工具箱",
    "组合各个隐喻",
    "更多资源",
    "关键点",
  ],
  mechanism:
    "隐喻只提供候选结构和问题视角，必须列出映射成立处、遗漏处、反例和退出条件，再转化为工程决定",
  success:
    "第2章：用隐喻来更充分地理解软件开发 的机制链、结果和复位轨迹与预测一致",
  failure:
    "第2章：用隐喻来更充分地理解软件开发 在“把隐喻当作系统事实，强迫所有对象服从类比”处拒绝",
  model: {
    primaryLabel: "解释力",
    primaryUnit: "项",
    primaryInitial: 9,
    primaryMax: 45,
    primaryWeight: 1.8,
    secondaryLabel: "遗漏项",
    secondaryUnit: "处",
    secondaryInitial: 2,
    secondaryMax: 21,
    secondaryWeight: 8,
    basePressure: 8,
    boundaryPenalty: 14,
    faultPenalty: 16,
    limit: 62,
    metricLabel: "适用阶段压力",
  },
} as const;

export function Cc2e02SoftwareMetaphorsMechanismLab() {
  return <ConstructionMechanismLab {...profile} />;
}
