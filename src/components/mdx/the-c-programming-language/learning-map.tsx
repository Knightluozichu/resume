"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从一个完整程序开始",
    mechanism:
      "K&R 不是先给出一张语法元素清单，再让读者等几十页才运行程序。第一章是 教程式导论 ：先让你看到输入如何流入、状态如何变化、结果如何输出，再追问每个表达式为什么合法。",
    failure:
      "若把「从一个完整程序开始」写法照搬到新输入却不核对类型转换、数组边界和错误返回，程序会在编译器允许的路径上产生错误结果或未定义行为。",
    evidence:
      "以严格警告构建本节最小程序，再用边界输入、失败返回和 sanitizer 复核「从一个完整程序开始」的实际契约。",
  },
  {
    label: "章不是五个模糊板块",
    mechanism:
      "官方 InformIT 样章目录列出八个正式章节：教程式导论、类型/运算符/表达式、控制流、函数与程序结构、指针与数组、结构、输入输出、UNIX 系统接口。附录 A 是参考手册，附录 B 汇总标准库，附录 C 总结版本变化；它们适合查证，不应替代正文的例子与推理。",
    failure:
      "若把「章不是五个模糊板块」写法照搬到新输入却不核对类型转换、数组边界和错误返回，程序会在编译器允许的路径上产生错误结果或未定义行为。",
    evidence:
      "以严格警告构建本节最小程序，再用边界输入、失败返回和 sanitizer 复核「章不是五个模糊板块」的实际契约。",
  },
  {
    label: "第一层：教程、类型与表达式",
    mechanism:
      "原书第一章通过温度换算、字符计数、单词计数、数组和函数把语言拼成整体。下面的温度表同时展示 符号常量 、整数算术和 for 循环：",
    failure:
      "若把「第一层：教程、类型与表达式」写法照搬到新输入却不核对类型转换、数组边界和错误返回，程序会在编译器允许的路径上产生错误结果或未定义行为。",
    evidence:
      "以严格警告构建本节最小程序，再用边界输入、失败返回和 sanitizer 复核「第一层：教程、类型与表达式」的实际契约。",
  },
];

export function LearningMapDecisionLab() {
  return (
    <ChapterDecisionLab
      title="C 程序设计语言全书学习地图：机制与证据"
      prompt="切换《C 程序设计语言全书学习地图》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《C 程序设计语言全书学习地图》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function LearningMapMechanismMap() {
  return (
    <ChapterMechanismMap
      title="C 程序设计语言全书学习地图：机制路径"
      stages={STAGES}
    />
  );
}

export function LearningMapFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="C 程序设计语言全书学习地图：失效与核验"
      stages={STAGES}
    />
  );
}
