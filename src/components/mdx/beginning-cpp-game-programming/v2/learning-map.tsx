"use client";

import { CppGameBuildLab, type CppGameBuildModel } from "./cpp-game-build-lab";

const model = {
  unitId: "learning-map",
  title: "第三版全书学习地图",
  focus:
    "把 21 个正式章节放回 Timber、Pong、Zombie Arena 与 Run! 四条项目链，并为每章定义可运行产物",
  invariant:
    "任一学习路径都必须保留前置语言能力、项目产物、可观察证据和干净复现四项",
  fault: "按旧版十章摘要跳过第 11–21 章，却仍把课程标为第三版完整路线",
  evidence:
    "正式单元 ID、章节路径、项目里程碑、编译日志、运行轨迹与最终复现清单",
  concepts: [
    "21 章正式映射",
    "四个可玩项目",
    "C++20 与 SFML 2.6",
    "干净构建证据",
  ],
  zones: [
    {
      label: "正式目录",
      detail: "21 个教学章节及其前置概念",
    },
    {
      label: "项目产物",
      detail: "Timber、Pong、Zombie Arena、Run! 的可玩切片",
    },
    {
      label: "验收证据",
      detail: "预测、日志、边界测试与干净构建",
    },
  ],
  trace: ["定位章节", "确认前置", "预测产物", "运行实验", "干净复现"],
  scenarios: [
    {
      label: "从零走完整路线",
      input: "从第 1 章开始，按四个项目依赖逐章推进",
      expected: "21 个单元均有对应页面、项目产物和验收证据",
    },
    {
      label: "已有 C++ 基础补项目",
      input: "跳过语法讲解但先完成依赖诊断，再从 Pong 或 Zombie Arena 进入",
      expected: "跳读不破坏所有权、实时循环、资源和视图前置条件",
    },
  ],
} satisfies CppGameBuildModel;

export function LearningMapPipelineLab() {
  return <CppGameBuildLab model={model} view="pipeline" />;
}

export function LearningMapFrameLab() {
  return <CppGameBuildLab model={model} view="frame" />;
}

export function LearningMapFaultLab() {
  return <CppGameBuildLab model={model} view="fault" />;
}
