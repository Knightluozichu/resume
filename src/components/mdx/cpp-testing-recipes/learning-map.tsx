"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "这本书教的是一套反馈系统",
    mechanism:
      "《Modern C++ Programming with Test-Driven Development》不是 C++ 语法面试题册。它从环境和 Soundex 第一例开始，建立红绿重构纪律；随后讲测试构造、替身、增量设计和质量；再进入遗留、线程、性能与多层证据；最后讨论团队如何长期维持 TDD。",
    failure:
      "若把「这本书教的是一套反馈系统」退化成先写实现再补断言，测试会耦合内部步骤，既不能驱动设计，也无法稳定解释失败。",
    evidence:
      "保存红—绿—重构的最小提交与失败消息，用行为断言、替身交互和重复运行核对「这本书教的是一套反馈系统」是否提供快速反馈。",
  },
  {
    label: "第一阶段：建立可信红绿循环（Chapter 1-3）",
    mechanism:
      "Chapter 1 Global Setup 固定编译器、CMake/CTest、测试框架和依赖身份，并用故意失败证明测试发现与退出码。Chapter 2 A First Example 通过 Soundex 逐条加入首字母、补零、编码、元音、长度与重复规则。Chapter 3 Foundation…",
    failure:
      "若把「第一阶段：建立可信红绿循环（Chapter 1-3）」退化成先写实现再补断言，测试会耦合内部步骤，既不能驱动设计，也无法稳定解释失败。",
    evidence:
      "保存红—绿—重构的最小提交与失败消息，用行为断言、替身交互和重复运行核对「第一阶段：建立可信红绿循环（Chapter 1-3）」是否提供快速反馈。",
  },
  {
    label: "第二阶段：构造可维护测试与设计（Chapter 4-7）",
    mechanism:
      "Chapter 4 Test Construction 组织快慢套件、过滤器、断言、private 边界和参数化；Chapter 5 Test Doubles 区分 fake、stub、spy、mock 并用依赖注入改善设计；Chapter 6 Incremental Design 用简单设计力量和…",
    failure:
      "若把「第二阶段：构造可维护测试与设计（Chapter 4-7）」退化成先写实现再补断言，测试会耦合内部步骤，既不能驱动设计，也无法稳定解释失败。",
    evidence:
      "保存红—绿—重构的最小提交与失败消息，用行为断言、替身交互和重复运行核对「第二阶段：构造可维护测试与设计（Chapter 4-7）」是否提供快速反馈。",
  },
];

export function LearningMapDecisionLab() {
  return (
    <ChapterDecisionLab
      title="学习路线图：机制与证据"
      prompt="切换《学习路线图》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《学习路线图》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function LearningMapMechanismMap() {
  return <ChapterMechanismMap title="学习路线图：机制路径" stages={STAGES} />;
}

export function LearningMapFailureDiagram() {
  return (
    <ChapterFailureMatrix title="学习路线图：失效与核验" stages={STAGES} />
  );
}
