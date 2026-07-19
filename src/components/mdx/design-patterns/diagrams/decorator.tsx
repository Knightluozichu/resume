import { PatternTradeoffLab } from "./pattern-tradeoff-lab";

const shared = {
  unitId: "designpatterns-04",
  title: "装饰器模式",
  problem: "文本输出要按场景组合压缩、加密和审计，排列数量不适合用子类穷举",
  participants: ["MessageComponent", "MessageDecorator", "EncryptionLayer"],
  flow: ["创建核心", "包裹压缩", "包裹加密", "调用外层", "沿链返回"],
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
      label: "收窄MessageComponent",
      detail:
        "只保留 在保持组件接口的前提下，按对象组合顺序动态叠加职责 所需的最小入口。",
      couplingDelta: -14,
      changeDelta: -12,
      traceDelta: 12,
    },
    {
      label: "公开MessageDecorator",
      detail: "让替换点、所有者与失败结果进入评审记录。",
      couplingDelta: -8,
      changeDelta: -6,
      traceDelta: 18,
    },
    {
      label: "绕过EncryptionLayer",
      detail: "模拟捷径，观察模式合同被破坏后的传播。",
      couplingDelta: 20,
      changeDelta: 18,
      traceDelta: -22,
    },
  ],
  metricLabels: ["依赖耦合", "变更成本", "因果可追踪"],
  fitNote:
    "装饰器模式 的参与者与当前变化轴一致；继续用代码和反例验证 去掉任意可选层后，核心消息仍符合 MessageComponent 合同。",
  misuseNote:
    "装饰器模式 被拒绝：包装层偷偷缩窄输入或改变基础语义，会破坏可替换性。",
} as const;

export function DecoratorStructureLab() {
  return (
    <PatternTradeoffLab {...shared} mode="structure" baseline={[48, 52, 68]} />
  );
}

export function DecoratorChangeLab() {
  return (
    <PatternTradeoffLab {...shared} mode="change" baseline={[52, 58, 66]} />
  );
}

export function DecoratorEvidenceLab() {
  return (
    <PatternTradeoffLab {...shared} mode="evidence" baseline={[44, 50, 72]} />
  );
}
