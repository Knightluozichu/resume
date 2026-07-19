import { ConstructionMechanismLab } from "./construction-mechanism-lab";

const profile = {
  unitId: "cc2e-35-more-information",
  title: "第35章：何处有更多信息",
  nodes: ["能力缺口", "来源选择", "阅读计划", "实践产物", "同行反馈"],
  concepts: [
    "第35章 何处有更多信息",
    "35.1 关于软件创建的信息",
    "35.2 创建之外的话题",
    "综述资料",
    "软件工程综览",
    "其他注释过的参考书目",
    "35.3 期刊",
    "初级程序员杂志",
    "高级程序员杂志",
    "专题出版物",
    "35.4 软件开发者的读书计划",
    "入门级",
    "熟练级",
    "精通级",
    "35.5 参加专业组织",
  ],
  mechanism:
    "继续学习从能力缺口出发选择综述、专业主题、期刊和社群，把阅读转成实践产物并通过同行反馈修订路线",
  success: "第35章：何处有更多信息 的机制链、结果和复位轨迹与预测一致",
  failure:
    "第35章：何处有更多信息 在“收藏大量资料却没有问题、产物和复核期限”处拒绝",
  model: {
    primaryLabel: "创建资料",
    primaryUnit: "项",
    primaryInitial: 8,
    primaryMax: 42,
    primaryWeight: 1.4,
    secondaryLabel: "工程综览",
    secondaryUnit: "处",
    secondaryInitial: 4,
    secondaryMax: 20,
    secondaryWeight: 8,
    basePressure: 7,
    boundaryPenalty: 13,
    faultPenalty: 18,
    limit: 58,
    metricLabel: "期刊压力",
  },
} as const;

export function Cc2e35MoreInformationMechanismLab() {
  return <ConstructionMechanismLab {...profile} />;
}
