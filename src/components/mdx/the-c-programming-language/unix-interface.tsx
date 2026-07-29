"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从“这一章讲的是 UNIX，不是全部 C”开始",
    mechanism:
      "K&R 前七章主要使用 ISO C 语言与标准库；第八章故意下探到 UNIX 系统接口。",
    failure:
      "若把「从“这一章讲的是 UNIX，不是全部 C”开始」写法照搬到新输入却不核对类型转换、数组边界和错误返回，程序会在编译器允许的路径上产生错误结果或未定义行为。",
    evidence:
      "以严格警告构建本节最小程序，再用边界输入、失败返回和 sanitizer 复核「从“这一章讲的是 UNIX，不是全部 C”开始」的实际契约。",
  },
  {
    label: "低级 I/O：返回值就是本次进度",
    mechanism:
      "write 返回正数时也只承诺这些字节已被接口接受，可能小于请求量。代码必须从返回位置继续，而不是整块重写；否则前缀会重复。阻塞调用被信号打断时可能以 EINTR 失败，是否重试要结合接口是否已报告进度与上层取消协议。",
    failure:
      "若把「低级 I/O：返回值就是本次进度」写法照搬到新输入却不核对类型转换、数组边界和错误返回，程序会在编译器允许的路径上产生错误结果或未定义行为。",
    evidence:
      "以严格警告构建本节最小程序，再用边界输入、失败返回和 sanitizer 复核「低级 I/O：返回值就是本次进度」的实际契约。",
  },
  {
    label: "open、creat、close 与 unlink",
    mechanism:
      "int open output(const char path) return open(path, O WRONLY O CREAT O TRUNC, (mode t)0666);",
    failure:
      "若把「open、creat、close 与 unlink」写法照搬到新输入却不核对类型转换、数组边界和错误返回，程序会在编译器允许的路径上产生错误结果或未定义行为。",
    evidence:
      "以严格警告构建本节最小程序，再用边界输入、失败返回和 sanitizer 复核「open、creat、close 与 unlink」的实际契约。",
  },
];

export function UnixInterfaceDecisionLab() {
  return (
    <ChapterDecisionLab
      title="UNIX 系统接口与存储分配：机制与证据"
      prompt="切换《UNIX 系统接口与存储分配》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《UNIX 系统接口与存储分配》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function UnixInterfaceMechanismMap() {
  return (
    <ChapterMechanismMap
      title="UNIX 系统接口与存储分配：机制路径"
      stages={STAGES}
    />
  );
}

export function UnixInterfaceFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="UNIX 系统接口与存储分配：失效与核验"
      stages={STAGES}
    />
  );
}
