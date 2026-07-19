import { PatternTradeoffLab } from "./pattern-tradeoff-lab";

const shared = {
  unitId: "designpatterns-24",
  title: "解释器模式",
  problem: "告警筛选器要支持 and、or 与字段比较，规则规模小且需要直接组合",
  participants: ["Expression", "Context", "AndExpression"],
  flow: ["解析规则", "创建表达式树", "绑定上下文", "递归解释", "返回布尔值"],
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
      label: "收窄Expression",
      detail:
        "只保留 为小型语言定义语法表示，并让表达式对象解释给定上下文 所需的最小入口。",
      couplingDelta: -14,
      changeDelta: -12,
      traceDelta: 12,
    },
    {
      label: "公开Context",
      detail: "让替换点、所有者与失败结果进入评审记录。",
      couplingDelta: -8,
      changeDelta: -6,
      traceDelta: 18,
    },
    {
      label: "绕过AndExpression",
      detail: "模拟捷径，观察模式合同被破坏后的传播。",
      couplingDelta: 20,
      changeDelta: 18,
      traceDelta: -22,
    },
  ],
  metricLabels: ["依赖耦合", "变更成本", "因果可追踪"],
  fitNote:
    "解释器模式 的参与者与当前变化轴一致；继续用代码和反例验证 同一规则树与上下文必须得到确定结果，非法语法在执行前明确拒绝。",
  misuseNote:
    "解释器模式 被拒绝：语言出现复杂语法、优化或诊断需求时，应使用解析器生成器与独立 AST。",
} as const;

export function InterpreterStructureLab() {
  return (
    <PatternTradeoffLab {...shared} mode="structure" baseline={[48, 52, 68]} />
  );
}

export function InterpreterChangeLab() {
  return (
    <PatternTradeoffLab {...shared} mode="change" baseline={[52, 58, 66]} />
  );
}

export function InterpreterEvidenceLab() {
  return (
    <PatternTradeoffLab {...shared} mode="evidence" baseline={[44, 50, 72]} />
  );
}
