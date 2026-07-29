"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "直觉：程序不能只会一条路走到黑",
    mechanism:
      "到目前为止你写的程序都是「一条直线」——从第一行执行到最后一行，没有分岔、没有回头路。但真实世界的逻辑不是这样的：ATM 取钱要先判断余额够不够、登录要判断密码对不对、游戏里怪物死了要重新跑一轮——程序需要 根据条件选路 、需要 重复执行某段代码 。",
    failure:
      "若把「直觉：程序不能只会一条路走到黑」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「直觉：程序不能只会一条路走到黑」的契约。",
  },
  {
    label: "第一种选择：if 和 else",
    mechanism:
      "程序中需要判断的条件可以分成两类：一类是 范围判断 ——「分数是不是大于 60」「余额是不是不够 100」，这类条件用布尔表达式表达，然后让程序根据 true 或 false 走不同路径。官方把 if 与 switch 统称为 conditional statements（条件语句）；最基本的工具是 if/else 语句 。",
    failure:
      "若把「第一种选择：if 和 else」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「第一种选择：if 和 else」的契约。",
  },
  {
    label: "第二种选择：switch——对号入座",
    mechanism:
      "if/else if 链虽然能处理多个分支，但如果你只是根据一个 离散值 来做选择——比如根据「星期几（1-7）」做不同的事——if-else 链就显得啰嗦了。C++ 提供了 switch 语句 —— 把它理解成一个自动分拣机 ：你把一个号码扔进去，机器直接把你弹到对应编号的出口，不用像 if-else 一样逐个检查。",
    failure:
      "若把「第二种选择：switch——对号入座」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「第二种选择：switch——对号入座」的契约。",
  },
];

export function StatementsDecisionLab() {
  return (
    <ChapterDecisionLab
      title="语句：机制与证据"
      prompt="切换《语句》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《语句》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function StatementsMechanismMap() {
  return <ChapterMechanismMap title="语句：机制路径" stages={STAGES} />;
}

export function StatementsFailureDiagram() {
  return <ChapterFailureMatrix title="语句：失效与核验" stages={STAGES} />;
}
