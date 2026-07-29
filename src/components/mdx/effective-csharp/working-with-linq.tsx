"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "组合查询",
    mechanism:
      "Where、Select 等操作先组成可复用计划，不应偷偷执行或产生副作用。",
    failure: "组合函数抛异常或修改外部状态，使同一查询不可重放。",
    evidence: "零枚举断言、表达式树与副作用计数。",
  },
  {
    label: "选择 Provider",
    mechanism:
      "IEnumerable 执行 CLR 委托，IQueryable 把表达式交给远端 provider 翻译。",
    failure: "把本地方法放入远端表达式，翻译失败或退化为大规模客户端计算。",
    evidence: "生成 SQL、provider 日志与数据传输量。",
  },
  {
    label: "触发枚举",
    mechanism: "ToList、First、Single 或 foreach 明确执行时刻和结果基数。",
    failure: "重复枚举、资源已释放或 Single/First 语义选错。",
    evidence: "查询次数、连接寿命与 0/1/多条数据测试。",
  },
];

export function LinqExecutionBoundaryLab() {
  return (
    <ChapterDecisionLab
      title="LINQ 查询从表达式到执行边界"
      prompt="切换查询阶段，判断代码是在组合计划、枚举本地序列，还是翻译远端表达式。"
      stages={STAGES}
      conclusion="LINQ 的可靠性取决于清楚标出 provider、枚举次数、资源寿命和 cardinality；语法外观不能代替执行模型。"
    />
  );
}

export function LinqExecutionBoundaryMechanismMap() {
  return (
    <ChapterMechanismMap title="LINQ 查询从表达式到执行边界" stages={STAGES} />
  );
}

export function LinqExecutionBoundaryFailureDiagram() {
  return (
    <ChapterFailureMatrix title="LINQ 查询从表达式到执行边界" stages={STAGES} />
  );
}
