import { PatternTradeoffLab } from "./pattern-tradeoff-lab";

const shared = {
  unitId: "designpatterns-11",
  title: "原型模式",
  problem: "图形编辑器要复制带样式与子节点的模板，同时保持新对象身份独立",
  participants: ["ShapePrototype", "CloneRegistry", "DiagramClient"],
  flow: ["登记原型", "选择模板", "执行克隆", "修复引用", "分配身份"],
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
      label: "收窄ShapePrototype",
      detail:
        "只保留 通过复制原型创建对象，让运行时实例决定新对象的初始结构 所需的最小入口。",
      couplingDelta: -14,
      changeDelta: -12,
      traceDelta: 12,
    },
    {
      label: "公开CloneRegistry",
      detail: "让替换点、所有者与失败结果进入评审记录。",
      couplingDelta: -8,
      changeDelta: -6,
      traceDelta: 18,
    },
    {
      label: "绕过DiagramClient",
      detail: "模拟捷径，观察模式合同被破坏后的传播。",
      couplingDelta: 20,
      changeDelta: 18,
      traceDelta: -22,
    },
  ],
  metricLabels: ["依赖耦合", "变更成本", "因果可追踪"],
  fitNote:
    "原型模式 的参与者与当前变化轴一致；继续用代码和反例验证 修改克隆图形的可变子节点不得改变登记的原始模板。",
  misuseNote:
    "原型模式 被拒绝：含数据库连接或外部句柄的对象不能靠字段拷贝获得独立资源。",
} as const;

export function PrototypeStructureLab() {
  return (
    <PatternTradeoffLab {...shared} mode="structure" baseline={[48, 52, 68]} />
  );
}

export function PrototypeChangeLab() {
  return (
    <PatternTradeoffLab {...shared} mode="change" baseline={[52, 58, 66]} />
  );
}

export function PrototypeEvidenceLab() {
  return (
    <PatternTradeoffLab {...shared} mode="evidence" baseline={[44, 50, 72]} />
  );
}
