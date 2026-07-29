"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从「固定函数名」到「可替换的行为」",
    mechanism:
      "前几章你已会用数组、struct、指针组织 数据 。但程序里还有另一类需求：同一套流程， 具体步骤可换 ——排序按整数比还是按字符串比？菜单按编号执行不同操作？错误处理走默认分支还是自定义回调？",
    failure:
      "若只记语法而忽略「从「固定函数名」到「可替换的行为」」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「从「固定函数名」到「可替换的行为」」的实际行为。",
  },
  {
    label: "函数指针：声明、赋值与调用",
    mechanism:
      "对象指针指向对象，函数指针指向函数；两类指针的表示和可转换规则不必相同，不能靠 void 在两者之间做可移植往返。声明语法最容易错在 与括号的优先级：",
    failure:
      "若只记语法而忽略「函数指针：声明、赋值与调用」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「函数指针：声明、赋值与调用」的实际行为。",
  },
  {
    label: "ADT：只承诺「能做什么」",
    mechanism:
      "C 语言 没有 内置 stack 或 list （那是 C++ STL）。ADT 在 C 里通常体现为：",
    failure:
      "若只记语法而忽略「ADT：只承诺「能做什么」」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「ADT：只承诺「能做什么」」的实际行为。",
  },
];

export function AdvancedDataDecisionLab() {
  return (
    <ChapterDecisionLab
      title="高级数据表示：机制与证据"
      prompt="切换《高级数据表示》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《高级数据表示》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function AdvancedDataMechanismMap() {
  return <ChapterMechanismMap title="高级数据表示：机制路径" stages={STAGES} />;
}

export function AdvancedDataFailureDiagram() {
  return (
    <ChapterFailureMatrix title="高级数据表示：失效与核验" stages={STAGES} />
  );
}
