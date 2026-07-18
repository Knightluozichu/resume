import { OfficialDdiaLab } from "./official-ddia-lab";

const config = {
  unitTitle: "第1章 可靠、可扩展与可维护的应用系统",
  focus:
    "把数据库、缓存、索引与消息系统视为一个数据系统，用可靠性、可扩展性和可维护性约束架构",
  invariant:
    "故障、负载增长或团队变更时，系统仍保持数据正确性、用户SLO和可理解的运维边界",
  artifact: "服务目标表、负载画像、故障树、容量曲线与可维护性评审",
  nodes: [
    "认识数据系统",
    "可靠性",
    "硬件故障",
    "软件错误",
    "人为错误",
    "可靠性有多重要",
    "可扩展性",
    "描述负载",
    "描述性能",
    "应对负载的方法",
    "可维护性",
    "可运维性：让运维更轻松",
    "简单性：管理复杂度",
    "可演化性：让变更更容易",
    "小结",
  ],
};

export function Ddi01ReliableScalableMaintainableApplicationsArchitectureLab() {
  return <OfficialDdiaLab {...config} mode="architecture" />;
}

export function Ddi01ReliableScalableMaintainableApplicationsFailureLab() {
  return <OfficialDdiaLab {...config} mode="failure" />;
}

export function Ddi01ReliableScalableMaintainableApplicationsEvidenceLab() {
  return <OfficialDdiaLab {...config} mode="evidence" />;
}
