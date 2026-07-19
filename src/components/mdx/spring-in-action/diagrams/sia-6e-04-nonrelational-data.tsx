import { OfficialSiaLab } from "./official-sia6-lab";

const props = {
  "unitId": "sia-6e-04-nonrelational-data",
  "title": "第4章 使用非关系数据",
  "concepts": [
    "4 Working with nonrelational data",
    "4.1 Working with Cassandra repositories",
    "4.1.1 Enabling Spring Data Cassandra",
    "4.1.2 Understanding Cassandra data modeling",
    "4.1.3 Mapping domain types for Cassandra persistence",
    "4.1.4 Writing Cassandra repositories",
    "4.2 Writing MongoDB repositories",
    "4.2.1 Enabling Spring Data MongoDB",
    "4.2.2 Mapping domain types to documents",
    "4.2.3 Writing MongoDB repository interfaces",
    "Summary"
  ],
  "chain": [
    "冻结输入与版本",
    "解释容器决策",
    "执行边界合同",
    "注入失败与恢复",
    "保存发布证据"
  ],
  "model": {
    "studio": "Cassandra与Mongo建模台",
    "boundary": "aggregate access pattern → partition/document → repository",
    "axisA": {
      "label": "存储模型",
      "levels": [
        "关系迁移",
        "Cassandra分区",
        "Mongo文档"
      ]
    },
    "axisB": {
      "label": "查询模式",
      "levels": [
        "主键",
        "范围",
        "跨聚合"
      ]
    },
    "fault": "把关系模型原样搬入Cassandra或Mongo，导致跨分区扫描和无界文档",
    "invariant": "数据模型由访问模式与一致性边界驱动，Repository不掩盖存储差异",
    "signal": "查询计划、分区键与文档尺寸",
    "practiceMode": "code",
    "metric": "Cassandra与Mongo建模台合同命中率",
    "risk": "查询模式暴露风险",
    "task": "从查询与一致性需求反推Cassandra分区模型和MongoDB文档边界，而非照搬关系实体；仅改变一项条件并保存初始、变化、故障、恢复和复位证据。",
    "artifact": "查询优先模型、分区热点实验、文档增长预算和仓储合同测试"
  }
} as const;

export function Sia604NonrelationalDataMapLab() { return <OfficialSiaLab {...props} view="map" />; }
export function Sia604NonrelationalDataExperimentLab() { return <OfficialSiaLab {...props} view="experiment" />; }
export function Sia604NonrelationalDataEvidenceLab() { return <OfficialSiaLab {...props} view="evidence" />; }
