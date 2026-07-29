"use client";

import { AndroidStateLab, type AndroidStateModel } from "./android-state-lab";

const model = {
  unitId: "afterword",
  title: "编后语",
  task: "把第四版跟做项目转化为可独立定义、构建、测试和发布的 Android 应用",
  owner: "学习者的产品需求、状态模型和发布负责人",
  state: "用户任务、架构边界、依赖、测试矩阵和发布制品",
  event: "从空仓库实现最终挑战并由另一人复核",
  invariant: "项目在没有书中步骤提示时仍可重建、解释、失败和恢复",
  fault: "复制完成代码后只改包名，无法解释状态所有者和目标 SDK 差异",
  evidence: "需求、设计决策、源码提交、测试、发布包和复盘记录",
  concepts: [
    "32. Afterword",
    "The Final Challenge",
    "Shameless Plugs",
    "Thank You",
  ],
  transitions: [
    {
      action: "冻结入口：32. Afterword",
      state:
        "记录学习者的产品需求、状态模型和发布负责人的初始用户任务、架构边界、依赖、测试矩阵和发布制品",
      evidence:
        "需求、设计决策、源码提交、测试、发布包和复盘记录中的“32. Afterword”轨迹",
    },
    {
      action: "触发事件：The Final Challenge",
      state:
        "以“从空仓库实现最终挑战并由另一人复核”改变用户任务、架构边界、依赖、测试矩阵和发布制品",
      evidence:
        "需求、设计决策、源码提交、测试、发布包和复盘记录中的“The Final Challenge”轨迹",
    },
    {
      action: "提交状态：The Final Challenge",
      state: "只由学习者的产品需求、状态模型和发布负责人提交新状态",
      evidence:
        "需求、设计决策、源码提交、测试、发布包和复盘记录中的“The Final Challenge”轨迹",
    },
    {
      action: "重建边界：Shameless Plugs",
      state: "在销毁、取消或重建后拒绝旧所有者回调",
      evidence:
        "需求、设计决策、源码提交、测试、发布包和复盘记录中的“Shameless Plugs”轨迹",
    },
    {
      action: "核对交付：Thank You",
      state: "以“项目在没有书中步骤提示时仍可重建、解释、失败和恢复”判断通过",
      evidence: "需求、设计决策、源码提交、测试、发布包和复盘记录",
    },
  ],
  scenarios: [
    {
      label: "正常任务",
      input:
        "固定 SDK、设备配置和初始状态，触发“从空仓库实现最终挑战并由另一人复核”",
      expected:
        "由学习者的产品需求、状态模型和发布负责人提交用户任务、架构边界、依赖、测试矩阵和发布制品，并持续满足“项目在没有书中步骤提示时仍可重建、解释、失败和恢复”",
    },
    {
      label: "边界恢复",
      input:
        "保持正常输入不变，仅注入“复制完成代码后只改包名，无法解释状态所有者和目标 SDK 差异”",
      expected:
        "找到首个状态分岔，撤销后以需求、设计决策、源码提交、测试、发布包和复盘记录证明同输入恢复",
    },
  ],
} satisfies AndroidStateModel;

export function AfterwordContractLab() {
  return <AndroidStateLab model={model} view="contract" />;
}

export function AfterwordLifecycleLab() {
  return <AndroidStateLab model={model} view="lifecycle" />;
}

export function AfterwordFaultLab() {
  return <AndroidStateLab model={model} view="fault" />;
}
