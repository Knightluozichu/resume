import { ConstructionMechanismLab } from "./construction-mechanism-lab";

const profile = {
  unitId: "cc2e-29-integration",
  title: "第29章：集成",
  nodes: ["构件基线", "集成顺序", "每日构建", "冒烟测试", "系统回归"],
  concepts: [
    "第29章 集成",
    "29.1 集成方式的重要性",
    "29.2 集成频率——阶段式集成还是增量集成",
    "阶段式集成",
    "增量集成",
    "增量集成的益处",
    "29.3 增量集成的策略",
    "自顶向下集成",
    "自底向上集成",
    "三明治集成",
    "风险导向的集成",
    "功能导向的集成",
    "T-型集成",
    "集成方法小结",
    "29.4 Daily Build与冒烟测试",
    "哪种项目能用daily build过程？",
    "持续集成",
    "额外资源",
    "关键点",
  ],
  mechanism:
    "集成按风险和依赖选择顺序，保持主线可构建，以小批次合并、自动构建、冒烟和回归快速定位接口差异",
  success: "第29章：集成 的机制链、结果和复位轨迹与预测一致",
  failure:
    "第29章：集成 在“长期分支在末期一次性合并，多个接口变化同时爆发”处拒绝",
  model: {
    primaryLabel: "频率",
    primaryUnit: "项",
    primaryInitial: 6,
    primaryMax: 36,
    primaryWeight: 2.1,
    secondaryLabel: "策略",
    secondaryUnit: "处",
    secondaryInitial: 2,
    secondaryMax: 18,
    secondaryWeight: 10,
    basePressure: 5,
    boundaryPenalty: 11,
    faultPenalty: 22,
    limit: 58,
    metricLabel: "风险排序压力",
  },
} as const;

export function Cc2e29IntegrationMechanismLab() {
  return <ConstructionMechanismLab {...profile} />;
}
