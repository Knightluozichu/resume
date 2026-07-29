"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么简洁语法仍要展开成执行模型",
    mechanism:
      "C 6把几种高频意图压进更短语法：导入static members、初始化indexer或已有child、沿member chain传播null、在catch前筛选异常。它们共同减少ceremony，却作用于完全不同阶段。评审时必须展开成四个问题：名字从哪解析、对象何时创建和赋值、哪一段会short-circuit、谁真正拥有异常。",
    failure:
      "若解释「为什么简洁语法仍要展开成执行模型」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「为什么简洁语法仍要展开成执行模型」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
  {
    label: "Using static directives",
    mechanism:
      "using static System.Math; 让 Sqrt 、 PI 等static members可用unqualified name访问。它适合数学DSL、assertion helpers或一组非常稳定且语义鲜明的operations；若导入多个拥有同名成员的types，overload…",
    failure:
      "若解释「Using static directives」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「Using static directives」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
  {
    label: "Object and collection initial…",
    mechanism:
      'C 6允许index initializer： new Dictionary ["apples"] = 3 。这与collection initializer的 Add 调用并不总是等价；indexer assignment可能覆盖existing key，而 Add 可能因duplicate ke…',
    failure:
      "若解释「Object and collection initial…」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「Object and collection initial…」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
];

export function ConciseCodeSmorgasbordDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 10. A smörgåsbord of features for concise code：机制与证据"
      prompt="切换《Chapter 10. A smörgåsbord of features for concise code》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 10. A smörgåsbord of features for concise code》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function ConciseCodeSmorgasbordMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 10. A smörgåsbord of features for concise code：机制路径"
      stages={STAGES}
    />
  );
}

export function ConciseCodeSmorgasbordFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 10. A smörgåsbord of features for concise code：失效与核验"
      stages={STAGES}
    />
  );
}
