import { PatternTradeoffLab } from "./pattern-tradeoff-lab";

const shared = {
  unitId: "designpatterns-08",
  title: "工厂方法模式",
  problem: "导入流程固定，但 CSV 与 JSON 文档的解析器创建方式不同",
  participants: ["ImporterCreator", "ParserProduct", "CsvImporter"],
  flow: ["开始导入", "调用工厂", "创建解析器", "执行解析", "统一收尾"],
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
      label: "收窄ImporterCreator",
      detail:
        "只保留 定义创建产品的操作，把具体产品选择延迟给创建者子类或扩展点 所需的最小入口。",
      couplingDelta: -14,
      changeDelta: -12,
      traceDelta: 12,
    },
    {
      label: "公开ParserProduct",
      detail: "让替换点、所有者与失败结果进入评审记录。",
      couplingDelta: -8,
      changeDelta: -6,
      traceDelta: 18,
    },
    {
      label: "绕过CsvImporter",
      detail: "模拟捷径，观察模式合同被破坏后的传播。",
      couplingDelta: 20,
      changeDelta: 18,
      traceDelta: -22,
    },
  ],
  metricLabels: ["依赖耦合", "变更成本", "因果可追踪"],
  fitNote:
    "工厂方法模式 的参与者与当前变化轴一致；继续用代码和反例验证 新增解析格式不应修改通用导入、错误处理和资源关闭流程。",
  misuseNote:
    "工厂方法模式 被拒绝：创建逻辑只是参数分支时，独立工厂函数可能比继承层次更直接。",
} as const;

export function FactoryMethodStructureLab() {
  return (
    <PatternTradeoffLab {...shared} mode="structure" baseline={[48, 52, 68]} />
  );
}

export function FactoryMethodChangeLab() {
  return (
    <PatternTradeoffLab {...shared} mode="change" baseline={[52, 58, 66]} />
  );
}

export function FactoryMethodEvidenceLab() {
  return (
    <PatternTradeoffLab {...shared} mode="evidence" baseline={[44, 50, 72]} />
  );
}
