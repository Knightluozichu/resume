"use client";

import { CppGameBuildLab, type CppGameBuildModel } from "./cpp-game-build-lab";

const model = {
  unitId: "final-review",
  title: "第三版总复习：从语法到完整游戏",
  focus:
    "把 21 章的语言、所有权、实时状态、资源、视图、音频与 Shader 证据串成四个可从空构建目录复现的游戏",
  invariant:
    "最终验收必须同时覆盖构建、输入、状态、所有权、资源失败、视觉输出与重启恢复，不能只演示一段录屏",
  fault:
    "只保留已编译二进制和成功截图，删除源码构建记录、资源失败路径与输入重放数据",
  evidence:
    "四项目源码提交、依赖版本、构建日志、固定输入轨迹、状态快照、失败注入与发布清单",
  concepts: [
    "语言与所有权",
    "实时循环与状态机",
    "资源与视图",
    "四项目干净复现",
  ],
  zones: [
    {
      label: "语言与对象",
      detail: "C++20 类型、类、引用、指针、容器与所有权",
    },
    {
      label: "实时系统",
      detail: "输入、update、碰撞、阶段、通信与相机",
    },
    {
      label: "表现与发布",
      detail: "纹理、HUD、音频、视差、Shader 与干净构建",
    },
  ],
  trace: ["清空构建", "固定依赖", "编译四项目", "重放验收", "归档证据"],
  scenarios: [
    {
      label: "全书干净复现",
      input: "在新构建目录按记录版本编译并运行四个项目的最小验收输入",
      expected: "四个项目均可运行，关键状态与原验收轨迹一致",
    },
    {
      label: "单一资源故障",
      input: "分别移除一项纹理、声音或 Shader 资源后重放",
      expected: "每个失败被定位并走明确回退或终止路径，恢复后结果一致",
    },
  ],
} satisfies CppGameBuildModel;

export function FinalReviewPipelineLab() {
  return <CppGameBuildLab model={model} view="pipeline" />;
}

export function FinalReviewFrameLab() {
  return <CppGameBuildLab model={model} view="frame" />;
}

export function FinalReviewFaultLab() {
  return <CppGameBuildLab model={model} view="fault" />;
}
