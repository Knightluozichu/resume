"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么 TDD 的第一章是环境，而不是第一个断言",
    mechanism:
      "测试驱动开发依赖很短的反馈回路：写一个会失败的测试，确认失败原因正确，写最小实现，让测试通过，再在全绿保护下重构。若一次构建要靠 IDE 中未记录的按钮、测试文件没有被发现，或开发机与持续集成使用不同编译器，红与绿都可能是环境伪造的信号。",
    failure:
      "若把「为什么 TDD 的第一章是环境，而不是第一个断言」退化成先写实现再补断言，测试会耦合内部步骤，既不能驱动设计，也无法稳定解释失败。",
    evidence:
      "保存红—绿—重构的最小提交与失败消息，用行为断言、替身交互和重复运行核对「为什么 TDD 的第一章是环境，而不是第一个断言」是否提供快速反馈。",
  },
  {
    label: "层工具链必须各自留下证据",
    mechanism:
      "编译器决定语言模式、标准库组合和诊断；CMake 描述目标与依赖；GoogleTest 或 CppUTest 负责注册和执行测试。IDE 可以驱动这三层，却不能成为唯一配置来源。把实际命令和目标关系写进仓库，成员才不需要猜测某台机器的隐藏设置。",
    failure:
      "若把「层工具链必须各自留下证据」退化成先写实现再补断言，测试会耦合内部步骤，既不能驱动设计，也无法稳定解释失败。",
    evidence:
      "保存红—绿—重构的最小提交与失败消息，用行为断言、替身交互和重复运行核对「层工具链必须各自留下证据」是否提供快速反馈。",
  },
  {
    label: "用 CMake 分离产品目标与测试目标",
    mechanism:
      "产品代码不应为了可测试而链接测试框架。更稳妥的结构是：核心实现形成普通库，测试可执行文件链接该库与框架，CTest 再统一发现和执行用例。这样生产目标不携带测试依赖，测试又能通过公开契约驱动产品代码。",
    failure:
      "若把「用 CMake 分离产品目标与测试目标」退化成先写实现再补断言，测试会耦合内部步骤，既不能驱动设计，也无法稳定解释失败。",
    evidence:
      "保存红—绿—重构的最小提交与失败消息，用行为断言、替身交互和重复运行核对「用 CMake 分离产品目标与测试目标」是否提供快速反馈。",
  },
];

export function GlobalSetupDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 1：Global Setup：机制与证据"
      prompt="切换《Chapter 1：Global Setup》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 1：Global Setup》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function GlobalSetupMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 1：Global Setup：机制路径"
      stages={STAGES}
    />
  );
}

export function GlobalSetupFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 1：Global Setup：失效与核验"
      stages={STAGES}
    />
  );
}
