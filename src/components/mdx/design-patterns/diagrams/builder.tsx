import { PatternTradeoffLab } from "./pattern-tradeoff-lab";

const shared = {
  unitId: "designpatterns-10",
  title: "建造者模式",
  problem: "部署计划由环境、服务、探针和回滚步骤组成，并要输出执行版与审计版",
  participants: ["DeploymentDirector", "PlanBuilder", "AuditPlanBuilder"],
  flow: ["选择建造者", "配置环境", "添加服务", "加入回滚", "取出产品"],
  concepts: [
    "模式名称与分类",
    "意图",
    "别名",
    "动机",
    "适用性",
    "结构",
    "参与者",
    "协作",
    "后果",
    "实现",
    "示例代码",
    "已知应用",
    "相关模式",
  ],
  refactorings: [
    {
      label: "收窄DeploymentDirector",
      detail:
        "只保留 把复杂对象的分步构造与最终表示分离，使相同步骤能产生不同结果 所需的最小入口。",
      couplingDelta: -14,
      changeDelta: -12,
      traceDelta: 12,
    },
    {
      label: "公开PlanBuilder",
      detail: "让替换点、所有者与失败结果进入评审记录。",
      couplingDelta: -8,
      changeDelta: -6,
      traceDelta: 18,
    },
    {
      label: "绕过AuditPlanBuilder",
      detail: "模拟捷径，观察模式合同被破坏后的传播。",
      couplingDelta: 20,
      changeDelta: 18,
      traceDelta: -22,
    },
  ],
  metricLabels: ["依赖耦合", "变更成本", "因果可追踪"],
  fitNote:
    "建造者模式 的参与者与当前变化轴一致；继续用代码和反例验证 没有健康探针或回滚步骤的部署计划不得从 build 返回。",
  misuseNote:
    "建造者模式 被拒绝：对象只有两三个独立参数时，命名参数比完整建造者层次简单。",
} as const;

export function BuilderStructureLab() {
  return (
    <PatternTradeoffLab {...shared} mode="structure" baseline={[48, 52, 68]} />
  );
}

export function BuilderChangeLab() {
  return (
    <PatternTradeoffLab {...shared} mode="change" baseline={[52, 58, 66]} />
  );
}

export function BuilderEvidenceLab() {
  return (
    <PatternTradeoffLab {...shared} mode="evidence" baseline={[44, 50, 72]} />
  );
}
