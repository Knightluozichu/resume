import { PatternTradeoffLab } from "./pattern-tradeoff-lab";

const shared = {
  unitId: "designpatterns-14",
  title: "组合模式",
  problem: "权限系统要计算单项权限与嵌套权限组，却不想在调用方分支判断节点类型",
  participants: ["PermissionComponent", "PermissionLeaf", "PermissionGroup"],
  flow: ["创建叶子", "组装子树", "调用统一操作", "递归聚合", "返回结果"],
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
      label: "收窄PermissionComponent",
      detail:
        "只保留 把对象组织成部分—整体树，让客户端能用统一操作处理叶子与组合节点 所需的最小入口。",
      couplingDelta: -14,
      changeDelta: -12,
      traceDelta: 12,
    },
    {
      label: "公开PermissionLeaf",
      detail: "让替换点、所有者与失败结果进入评审记录。",
      couplingDelta: -8,
      changeDelta: -6,
      traceDelta: 18,
    },
    {
      label: "绕过PermissionGroup",
      detail: "模拟捷径，观察模式合同被破坏后的传播。",
      couplingDelta: 20,
      changeDelta: 18,
      traceDelta: -22,
    },
  ],
  metricLabels: ["依赖耦合", "变更成本", "因果可追踪"],
  fitNote:
    "组合模式 的参与者与当前变化轴一致；继续用代码和反例验证 权限组结果必须等于其所有可达叶子结果的确定性聚合。",
  misuseNote:
    "组合模式 被拒绝：强迫叶子实现 add/remove 并静默忽略，会让非法操作难以发现。",
} as const;

export function CompositeStructureLab() {
  return (
    <PatternTradeoffLab {...shared} mode="structure" baseline={[48, 52, 68]} />
  );
}

export function CompositeChangeLab() {
  return (
    <PatternTradeoffLab {...shared} mode="change" baseline={[52, 58, 66]} />
  );
}

export function CompositeEvidenceLab() {
  return (
    <PatternTradeoffLab {...shared} mode="evidence" baseline={[44, 50, 72]} />
  );
}
