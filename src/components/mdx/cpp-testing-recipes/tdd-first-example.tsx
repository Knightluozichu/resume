"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么第一个例子要足够小，却不能只是加法",
    mechanism:
      "2 + 2 == 4 能证明框架工作，却不会产生设计压力。Soundex 把英文姓名转换成首字母加三个数字的音码：规则不多，但包含字符分类、状态、长度边界和输出格式，足以展示测试如何逐步塑造实现。",
    failure:
      "若把「为什么第一个例子要足够小，却不能只是加法」退化成先写实现再补断言，测试会耦合内部步骤，既不能驱动设计，也无法稳定解释失败。",
    evidence:
      "保存红—绿—重构的最小提交与失败消息，用行为断言、替身交互和重复运行核对「为什么第一个例子要足够小，却不能只是加法」是否提供快速反馈。",
  },
  {
    label: "第一轮：只保留首字母并补零",
    mechanism:
      "先写最窄的公开接口： Soundex::encode 接收字符串并返回字符串。例子 A - A000 同时包含两个行为，会不会太大？可以先让空实现返回固定值建立绿灯，再用第二个输入迫使实现读取首字母。关键是每次红灯只对应一个可解释缺口。",
    failure:
      "若把「第一轮：只保留首字母并补零」退化成先写实现再补断言，测试会耦合内部步骤，既不能驱动设计，也无法稳定解释失败。",
    evidence:
      "保存红—绿—重构的最小提交与失败消息，用行为断言、替身交互和重复运行核对「第一轮：只保留首字母并补零」是否提供快速反馈。",
  },
  {
    label: "每轮红、绿、重构都要有独立证据",
    mechanism:
      "红灯不是“项目有错误”，而是刚写的测试以预期原因失败。如果测试因拼写错误不能编译，或另一条旧测试先失败，尚未证明新行为缺失。绿灯也不是只跑当前测试；必须确认全部旧行为仍成立。",
    failure:
      "若把「每轮红、绿、重构都要有独立证据」退化成先写实现再补断言，测试会耦合内部步骤，既不能驱动设计，也无法稳定解释失败。",
    evidence:
      "保存红—绿—重构的最小提交与失败消息，用行为断言、替身交互和重复运行核对「每轮红、绿、重构都要有独立证据」是否提供快速反馈。",
  },
];

export function TddFirstExampleDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 2：Test-Driven Development: A First Example：机制与证据"
      prompt="切换《Chapter 2：Test-Driven Development: A First Example》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 2：Test-Driven Development: A First Example》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function TddFirstExampleMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 2：Test-Driven Development: A First Example：机制路径"
      stages={STAGES}
    />
  );
}

export function TddFirstExampleFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 2：Test-Driven Development: A First Example：失效与核验"
      stages={STAGES}
    />
  );
}
