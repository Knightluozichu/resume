"use client";

import { CppGameBuildLab, type CppGameBuildModel } from "./cpp-game-build-lab";

const model = {
  unitId: "bcgp3-02",
  title: "第 2 章：变量、运算符与动画决策",
  focus:
    "用有类型的状态、运算符、随机样本、条件分支和帧时间驱动云与蜜蜂，而不是把运动绑在帧率上",
  invariant:
    "相同初始状态、随机种子和输入时间序列必须产生相同位置轨迹，速度使用每秒单位乘以 delta time",
  fault: "每帧直接增加固定像素，导致 60 Hz 与 144 Hz 下运动速度不同",
  evidence: "变量类型和值、随机种子、delta time、分支命中记录及逐帧位置序列",
  concepts: [
    "c++ 变量（c++ variables）",
    "运算符（operators）",
    "随机数（random numbers）",
    "条件分支（if and else）",
    "计时（timing）",
  ],
  zones: [
    {
      label: "输入状态",
      detail: "速度、边界、随机种子与当前时间",
    },
    {
      label: "更新规则",
      detail: "运算符、if/else 与时间缩放",
    },
    {
      label: "动画结果",
      detail: "云、蜜蜂位置及越界重置",
    },
  ],
  trace: ["固定种子", "读取时间", "判断状态", "积分位置", "检查边界"],
  scenarios: [
    {
      label: "稳定 60 Hz",
      input: "连续输入 1/60 秒的时间步并使用固定随机种子",
      expected: "一秒后的位移等于速度乘一秒且轨迹可重放",
    },
    {
      label: "混合帧时间",
      input: "交替输入 1/30 与 1/120 秒时间步，总时间保持一秒",
      expected: "总位移与稳定帧率近似一致，不因帧数改变速度",
    },
  ],
} satisfies CppGameBuildModel;

export function TypesVariablesPipelineLab() {
  return <CppGameBuildLab model={model} view="pipeline" />;
}

export function TypesVariablesFrameLab() {
  return <CppGameBuildLab model={model} view="frame" />;
}

export function TypesVariablesFaultLab() {
  return <CppGameBuildLab model={model} view="fault" />;
}
