import { PatternTradeoffLab } from "./pattern-tradeoff-lab";

const shared = {
  unitId: "designpatterns-07",
  title: "单例模式",
  problem: "进程内配置快照只能有一个当前版本，但测试仍需替换其依赖",
  participants: ["ConfigRegistry", "InstanceGuard", "ConfigClient"],
  flow: ["请求实例", "检查现有值", "创建或复用", "读取快照", "测试替换"],
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
      label: "收窄ConfigRegistry",
      detail:
        "只保留 在确有唯一实例约束时控制创建入口，并提供明确的访问边界 所需的最小入口。",
      couplingDelta: -14,
      changeDelta: -12,
      traceDelta: 12,
    },
    {
      label: "公开InstanceGuard",
      detail: "让替换点、所有者与失败结果进入评审记录。",
      couplingDelta: -8,
      changeDelta: -6,
      traceDelta: 18,
    },
    {
      label: "绕过ConfigClient",
      detail: "模拟捷径，观察模式合同被破坏后的传播。",
      couplingDelta: 20,
      changeDelta: 18,
      traceDelta: -22,
    },
  ],
  metricLabels: ["依赖耦合", "变更成本", "因果可追踪"],
  fitNote:
    "单例模式 的参与者与当前变化轴一致；继续用代码和反例验证 同一进程版本下所有客户端读取到相同配置，同时测试可隔离替换。",
  misuseNote:
    "单例模式 被拒绝：把普通服务做成单例来省传参，会隐藏依赖并阻碍并行测试。",
} as const;

export function SingletonStructureLab() {
  return (
    <PatternTradeoffLab {...shared} mode="structure" baseline={[48, 52, 68]} />
  );
}

export function SingletonChangeLab() {
  return (
    <PatternTradeoffLab {...shared} mode="change" baseline={[52, 58, 66]} />
  );
}

export function SingletonEvidenceLab() {
  return (
    <PatternTradeoffLab {...shared} mode="evidence" baseline={[44, 50, 72]} />
  );
}
