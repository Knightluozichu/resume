import { OfficialDdiaLab } from "./official-ddia-lab";

const config = {
  unitTitle: "第12章 数据系统的未来",
  focus: "以数据流组合专用工具，并把端到端正确性、验证、隐私和伦理纳入设计",
  invariant:
    "权威输入、派生关系和约束可追踪可重建，系统及时且完整，用户风险有责任边界",
  artifact: "数据血缘、视图重建、约束验证、审计日志与隐私影响评估",
  nodes: [
    "数据集成",
    "通过派生数据组合专用工具",
    "批处理与流处理",
    "拆解数据库",
    "组合数据存储技术",
    "围绕数据流设计应用",
    "观察派生状态",
    "追求正确性",
    "数据库的端到端原则",
    "执行约束",
    "及时性与完整性",
    "信任但要验证",
    "做正确的事",
    "预测分析",
    "隐私与跟踪",
    "小结",
  ],
};

export function Ddi12FutureDataSystemsArchitectureLab() {
  return <OfficialDdiaLab {...config} mode="architecture" />;
}

export function Ddi12FutureDataSystemsFailureLab() {
  return <OfficialDdiaLab {...config} mode="failure" />;
}

export function Ddi12FutureDataSystemsEvidenceLab() {
  return <OfficialDdiaLab {...config} mode="evidence" />;
}
