import { PatternTradeoffLab } from "./pattern-tradeoff-lab";

const shared = {
  unitId: "designpatterns-09",
  title: "抽象工厂模式",
  problem: "界面需要整套切换 Web 与桌面控件，按钮和菜单不能混用平台实现",
  participants: ["UiFactory", "ButtonProduct", "DesktopFactory"],
  flow: ["选择产品族", "创建按钮", "创建菜单", "组合界面", "校验兼容"],
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
      label: "收窄UiFactory",
      detail:
        "只保留 提供创建一族相关产品的接口，并保证同一工厂产出的产品彼此兼容 所需的最小入口。",
      couplingDelta: -14,
      changeDelta: -12,
      traceDelta: 12,
    },
    {
      label: "公开ButtonProduct",
      detail: "让替换点、所有者与失败结果进入评审记录。",
      couplingDelta: -8,
      changeDelta: -6,
      traceDelta: 18,
    },
    {
      label: "绕过DesktopFactory",
      detail: "模拟捷径，观察模式合同被破坏后的传播。",
      couplingDelta: 20,
      changeDelta: 18,
      traceDelta: -22,
    },
  ],
  metricLabels: ["依赖耦合", "变更成本", "因果可追踪"],
  fitNote:
    "抽象工厂模式 的参与者与当前变化轴一致；继续用代码和反例验证 同一界面树中的按钮、菜单和对话框必须来自同一平台产品族。",
  misuseNote:
    "抽象工厂模式 被拒绝：产品之间没有兼容约束时，统一大工厂会成为不必要的中心依赖。",
} as const;

export function AbstractFactoryStructureLab() {
  return (
    <PatternTradeoffLab {...shared} mode="structure" baseline={[48, 52, 68]} />
  );
}

export function AbstractFactoryChangeLab() {
  return (
    <PatternTradeoffLab {...shared} mode="change" baseline={[52, 58, 66]} />
  );
}

export function AbstractFactoryEvidenceLab() {
  return (
    <PatternTradeoffLab {...shared} mode="evidence" baseline={[44, 50, 72]} />
  );
}
