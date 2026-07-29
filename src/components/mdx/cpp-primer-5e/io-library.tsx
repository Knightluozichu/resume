"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "直觉：程序靠什么和外界说话？",
    mechanism:
      "你已经用 cin 读键盘输入、用 cout 往屏幕上打字——这是程序和外界的两次对话。但真实的程序不会只和键盘屏幕打交道——它要读配置文件、写日志文件、解析 CSV 数据、把内存里的结果拼成格式化报告。",
    failure:
      "若把「直觉：程序靠什么和外界说话？」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「直觉：程序靠什么和外界说话？」的契约。",
  },
  {
    label: "IO 流家族：一张继承树看清三条分支",
    mechanism:
      "在 C++ 里， 流（stream） 是你读写数据的统一通道。所有流类都源自同一个基础——一张继承树把三条分支清楚分开：",
    failure:
      "若把「IO 流家族：一张继承树看清三条分支」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「IO 流家族：一张继承树看清三条分支」的契约。",
  },
  {
    label: "官方 Chapter 8 的三层 IO 契约",
    mechanism:
      "原书把这一章分成 IO 类、文件输入输出和 string 流三层。统一接口只是表面，真正需要掌握的是“操作、缓冲、条件状态”如何协作：一次提取可能成功并同时抵达文件尾，状态位也可能组合出现，输出进入缓冲并不代表外部设备已经持久化。",
    failure:
      "若把「官方 Chapter 8 的三层 IO 契约」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「官方 Chapter 8 的三层 IO 契约」的契约。",
  },
];

export function IoLibraryDecisionLab() {
  return (
    <ChapterDecisionLab
      title="IO库：机制与证据"
      prompt="切换《IO库》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《IO库》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function IoLibraryMechanismMap() {
  return <ChapterMechanismMap title="IO库：机制路径" stages={STAGES} />;
}

export function IoLibraryFailureDiagram() {
  return <ChapterFailureMatrix title="IO库：失效与核验" stages={STAGES} />;
}
