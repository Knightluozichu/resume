import { PatternTradeoffLab } from "./pattern-tradeoff-lab";

const shared = {
  unitId: "designpatterns-22",
  title: "模板方法模式",
  problem: "数据导入都要读取、解析、校验、提交和清理，只有解析步骤因格式而异",
  participants: ["ImportTemplate", "ParseHook", "CsvImportJob"],
  flow: ["读取输入", "调用解析钩子", "执行校验", "提交结果", "统一清理"],
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
      label: "收窄ImportTemplate",
      detail:
        "只保留 在基类中定义算法骨架，把特定步骤延迟给子类而保持顺序不变 所需的最小入口。",
      couplingDelta: -14,
      changeDelta: -12,
      traceDelta: 12,
    },
    {
      label: "公开ParseHook",
      detail: "让替换点、所有者与失败结果进入评审记录。",
      couplingDelta: -8,
      changeDelta: -6,
      traceDelta: 18,
    },
    {
      label: "绕过CsvImportJob",
      detail: "模拟捷径，观察模式合同被破坏后的传播。",
      couplingDelta: 20,
      changeDelta: 18,
      traceDelta: -22,
    },
  ],
  metricLabels: ["依赖耦合", "变更成本", "因果可追踪"],
  fitNote:
    "模板方法模式 的参与者与当前变化轴一致；继续用代码和反例验证 所有格式无论解析实现如何，校验必须先于提交且清理总会执行。",
  misuseNote:
    "模板方法模式 被拒绝：子类必须覆写大量步骤或改变顺序时，组合式策略比继承更清楚。",
} as const;

export function TemplateMethodStructureLab() {
  return (
    <PatternTradeoffLab {...shared} mode="structure" baseline={[48, 52, 68]} />
  );
}

export function TemplateMethodChangeLab() {
  return (
    <PatternTradeoffLab {...shared} mode="change" baseline={[52, 58, 66]} />
  );
}

export function TemplateMethodEvidenceLab() {
  return (
    <PatternTradeoffLab {...shared} mode="evidence" baseline={[44, 50, 72]} />
  );
}
