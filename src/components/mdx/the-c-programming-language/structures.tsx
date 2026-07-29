"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从“一条记录的哪些事实必须一起成立”开始",
    mechanism:
      "struct Point translate(struct Point point, int dx, int dy) point.x += dx; point.y += dy; return point;",
    failure:
      "若把「从“一条记录的哪些事实必须一起成立”开始」写法照搬到新输入却不核对类型转换、数组边界和错误返回，程序会在编译器允许的路径上产生错误结果或未定义行为。",
    evidence:
      "以严格警告构建本节最小程序，再用边界输入、失败返回和 sanitizer 复核「从“一条记录的哪些事实必须一起成立”开始」的实际契约。",
  },
  {
    label: "结构体基础：标准保证到哪里",
    mechanism:
      "对非位域成员，C 保证后声明成员的地址更高，并保证第一个成员之前没有填充；实现可以在成员之间与结构尾部加入",
    failure:
      "若把「结构体基础：标准保证到哪里」写法照搬到新输入却不核对类型转换、数组边界和错误返回，程序会在编译器允许的路径上产生错误结果或未定义行为。",
    evidence:
      "以严格警告构建本节最小程序，再用边界输入、失败返回和 sanitizer 复核「结构体基础：标准保证到哪里」的实际契约。",
  },
  {
    label: "结构体与函数：值、借用和修改",
    mechanism:
      "结构可以作为函数参数和返回值，也可以整体赋值；数组不能整体赋值，这正是二者的重要差异。小结构按值传递往往最清楚：输入不会被修改，返回值表达新状态。若函数需要原地更新大型结构，可接收指针，并让 const struct Config 表达只读借用。",
    failure:
      "若把「结构体与函数：值、借用和修改」写法照搬到新输入却不核对类型转换、数组边界和错误返回，程序会在编译器允许的路径上产生错误结果或未定义行为。",
    evidence:
      "以严格警告构建本节最小程序，再用边界输入、失败返回和 sanitizer 复核「结构体与函数：值、借用和修改」的实际契约。",
  },
];

export function StructuresDecisionLab() {
  return (
    <ChapterDecisionLab
      title="结构体、表查找与联合：机制与证据"
      prompt="切换《结构体、表查找与联合》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《结构体、表查找与联合》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function StructuresMechanismMap() {
  return (
    <ChapterMechanismMap
      title="结构体、表查找与联合：机制路径"
      stages={STAGES}
    />
  );
}

export function StructuresFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="结构体、表查找与联合：失效与核验"
      stages={STAGES}
    />
  );
}
