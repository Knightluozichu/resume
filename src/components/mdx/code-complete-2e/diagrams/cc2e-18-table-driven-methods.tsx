import { ConstructionMechanismLab } from "./construction-mechanism-lab";

const profile = {
  unitId: "cc2e-18-table-driven-methods",
  title: "第18章：表驱动方法",
  nodes: ["业务规则", "表结构", "查询键", "访问策略", "结果验证"],
  concepts: [
    "第18章 表驱动方法",
    "18.1 表驱动方法使用总则",
    "使用表驱动方法的两个问题",
    "18.2 直接访问表",
    "示例：一个月中的天数（Days-in-Month）",
    "示例：保险费率",
    "例子：灵活的消息格式（Flexible-Message-Format）",
    "构造查询键值",
    "18.3 索引表访问（Indexed Access Tables）",
    "18.4 阶梯访问表",
    "18.5 表查询的其他示例",
    "关键点",
  ],
  mechanism:
    "表驱动方法把稳定规则从分支代码移入数据，以直接、索引或阶梯访问选择结果，并验证键域、顺序和缺省项",
  success: "第18章：表驱动方法 的机制链、结果和复位轨迹与预测一致",
  failure:
    "第18章：表驱动方法 在“表中缺键、区间未排序或默认值掩盖配置错误”处拒绝",
  model: {
    primaryLabel: "使用条件",
    primaryUnit: "项",
    primaryInitial: 8,
    primaryMax: 42,
    primaryWeight: 2.1,
    secondaryLabel: "直接访问",
    secondaryUnit: "处",
    secondaryInitial: 4,
    secondaryMax: 20,
    secondaryWeight: 9,
    basePressure: 7,
    boundaryPenalty: 13,
    faultPenalty: 20,
    limit: 60,
    metricLabel: "索引访问压力",
  },
} as const;

export function Cc2e18TableDrivenMethodsMechanismLab() {
  return <ConstructionMechanismLab {...profile} />;
}
