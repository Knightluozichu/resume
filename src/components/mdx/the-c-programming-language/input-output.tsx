"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从“每次 I/O 都可能只完成协议的一步”开始",
    mechanism:
      "本节把「从“每次 I/O 都可能只完成协议的一步”开始」放回《标准 I/O、格式化与文件错误》的输入、状态变化与输出路径中理解。",
    failure:
      "若把「从“每次 I/O 都可能只完成协议的一步”开始」写法照搬到新输入却不核对类型转换、数组边界和错误返回，程序会在编译器允许的路径上产生错误结果或未定义行为。",
    evidence:
      "以严格警告构建本节最小程序，再用边界输入、失败返回和 sanitizer 复核「从“每次 I/O 都可能只完成协议的一步”开始」的实际契约。",
  },
  {
    label: "标准输入输出与缓冲边界",
    mechanism:
      'if (fputs("continue? [y/n] ", stdout) == EOF) return EOF; if (fflush(stdout) == EOF) return EOF; answer = getchar(); return answer;',
    failure:
      "若把「标准输入输出与缓冲边界」写法照搬到新输入却不核对类型转换、数组边界和错误返回，程序会在编译器允许的路径上产生错误结果或未定义行为。",
    evidence:
      "以严格警告构建本节最小程序，再用边界输入、失败返回和 sanitizer 复核「标准输入输出与缓冲边界」的实际契约。",
  },
  {
    label: "格式化输出：格式串就是类型契约",
    mechanism:
      "int print measurement(FILE stream, const char name, long count, double average) int written;",
    failure:
      "若把「格式化输出：格式串就是类型契约」写法照搬到新输入却不核对类型转换、数组边界和错误返回，程序会在编译器允许的路径上产生错误结果或未定义行为。",
    evidence:
      "以严格警告构建本节最小程序，再用边界输入、失败返回和 sanitizer 复核「格式化输出：格式串就是类型契约」的实际契约。",
  },
];

export function InputOutputDecisionLab() {
  return (
    <ChapterDecisionLab
      title="标准 I/O、格式化与文件错误：机制与证据"
      prompt="切换《标准 I/O、格式化与文件错误》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《标准 I/O、格式化与文件错误》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function InputOutputMechanismMap() {
  return (
    <ChapterMechanismMap
      title="标准 I/O、格式化与文件错误：机制路径"
      stages={STAGES}
    />
  );
}

export function InputOutputFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="标准 I/O、格式化与文件错误：失效与核验"
      stages={STAGES}
    />
  );
}
