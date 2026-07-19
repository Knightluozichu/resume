import { ConstructionMechanismLab } from "./construction-mechanism-lab";

const profile = {
  unitId: "cc2e-32-self-documenting-code",
  title: "第32章：自说明代码",
  nodes: ["读者任务", "清晰代码", "必要注释", "外部文档", "同步验证"],
  concepts: [
    "第32章 自说明代码",
    "32.1 外部文档",
    "32.2 编程风格作文档",
    "32.3 注释或不注释",
    "32.4 高效注释之关键",
    "注释种类",
    "高效注释",
    "最佳注释量",
    "32.5 注释技术",
    "注释单行",
    "注释代码段",
    "注释数据声明",
    "注释控制结构",
    "注释子程序",
    "注释类、文件和程序",
    "32.6 IEEE标准",
    "软件质量保证标准",
    "更多资源",
    "关键点",
  ],
  mechanism:
    "自说明代码用名称、类型、结构和测试表达可检查意图；注释补充原因、约束和非显然取舍，并与代码共同更新",
  success: "第32章：自说明代码 的机制链、结果和复位轨迹与预测一致",
  failure:
    "第32章：自说明代码 在“注释重复旧行为，代码改变后反而误导读者”处拒绝",
  model: {
    primaryLabel: "外部文档",
    primaryUnit: "项",
    primaryInitial: 10,
    primaryMax: 48,
    primaryWeight: 1.5,
    secondaryLabel: "风格",
    secondaryUnit: "处",
    secondaryInitial: 3,
    secondaryMax: 22,
    secondaryWeight: 8,
    basePressure: 9,
    boundaryPenalty: 15,
    faultPenalty: 18,
    limit: 60,
    metricLabel: "是否注释压力",
  },
} as const;

export function Cc2e32SelfDocumentingCodeMechanismLab() {
  return <ConstructionMechanismLab {...profile} />;
}
