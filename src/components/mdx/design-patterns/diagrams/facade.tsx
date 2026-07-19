import { PatternTradeoffLab } from "./pattern-tradeoff-lab";

const shared = {
  unitId: "designpatterns-15",
  title: "外观模式",
  problem: "发布服务需要协调构建、制品、部署与健康检查，调用方只关心安全发布",
  participants: ["ReleaseFacade", "BuildSubsystem", "HealthSubsystem"],
  flow: ["接收发布", "构建制品", "部署候选", "执行健康检查", "提交结果"],
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
      label: "收窄ReleaseFacade",
      detail:
        "只保留 为复杂子系统提供面向常见任务的简化入口，同时保留必要的底层能力 所需的最小入口。",
      couplingDelta: -14,
      changeDelta: -12,
      traceDelta: 12,
    },
    {
      label: "公开BuildSubsystem",
      detail: "让替换点、所有者与失败结果进入评审记录。",
      couplingDelta: -8,
      changeDelta: -6,
      traceDelta: 18,
    },
    {
      label: "绕过HealthSubsystem",
      detail: "模拟捷径，观察模式合同被破坏后的传播。",
      couplingDelta: 20,
      changeDelta: 18,
      traceDelta: -22,
    },
  ],
  metricLabels: ["依赖耦合", "变更成本", "因果可追踪"],
  fitNote:
    "外观模式 的参与者与当前变化轴一致；继续用代码和反例验证 外观报告成功时，构建、部署与健康检查必须来自同一制品版本。",
  misuseNote:
    "外观模式 被拒绝：把所有新逻辑都塞进外观，会掩盖本应拆分的领域服务。",
} as const;

export function FacadeStructureLab() {
  return (
    <PatternTradeoffLab {...shared} mode="structure" baseline={[48, 52, 68]} />
  );
}

export function FacadeChangeLab() {
  return (
    <PatternTradeoffLab {...shared} mode="change" baseline={[52, 58, 66]} />
  );
}

export function FacadeEvidenceLab() {
  return (
    <PatternTradeoffLab {...shared} mode="evidence" baseline={[44, 50, 72]} />
  );
}
