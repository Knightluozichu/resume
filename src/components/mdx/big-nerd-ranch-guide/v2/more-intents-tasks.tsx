"use client";

import { AndroidStateLab, type AndroidStateModel } from "./android-state-lab";

const model = {
  unitId: "more-intents-tasks",
  title: "深入学习intent和任务",
  task: "区分 Activity back stack、task、document 与进程，并验证 launch flags",
  owner: "ActivityTaskManager 与每个 task 返回栈",
  state: "intent、task ID、Activity 实例、flags 和顶层目的地",
  event: "从 NerdLauncher 启动、重复深链、Home 返回与 Back 导航",
  invariant: "栈策略决定导航实例但不自动提供业务副作用幂等",
  fault: "滥用 CLEAR_TOP 修复重复界面，却让待保存编辑状态丢失",
  evidence: "task dump、intent flags、实例 ID、返回序列和业务提交计数",
  concepts: [
    "23. More About Intents and Tasks",
    "Setting Up NerdLauncher",
    "Resolving an Implicit Intent",
    "Creating Explicit Intents at Runtime",
    "Tasks and the Back Stack",
    "Using NerdLauncher as a Home Screen",
    "For the More Curious: Processes vs Tasks",
    "For the More Curious: Concurrent Documents",
    "Challenge: Icons",
  ],
  transitions: [
    {
      action: "冻结入口：23. More About Intents and Tasks",
      state:
        "记录ActivityTaskManager 与每个 task 返回栈的初始intent、task ID、Activity 实例、flags 和顶层目的地",
      evidence:
        "task dump、intent flags、实例 ID、返回序列和业务提交计数中的“23. More About Intents and Tasks”轨迹",
    },
    {
      action: "触发事件：Resolving an Implicit Intent",
      state:
        "以“从 NerdLauncher 启动、重复深链、Home 返回与 Back 导航”改变intent、task ID、Activity 实例、flags 和顶层目的地",
      evidence:
        "task dump、intent flags、实例 ID、返回序列和业务提交计数中的“Resolving an Implicit Intent”轨迹",
    },
    {
      action: "提交状态：Tasks and the Back Stack",
      state: "只由ActivityTaskManager 与每个 task 返回栈提交新状态",
      evidence:
        "task dump、intent flags、实例 ID、返回序列和业务提交计数中的“Tasks and the Back Stack”轨迹",
    },
    {
      action: "重建边界：For the More Curious: Processes vs Tasks",
      state: "在销毁、取消或重建后拒绝旧所有者回调",
      evidence:
        "task dump、intent flags、实例 ID、返回序列和业务提交计数中的“For the More Curious: Processes vs Tasks”轨迹",
    },
    {
      action: "核对交付：Challenge: Icons",
      state: "以“栈策略决定导航实例但不自动提供业务副作用幂等”判断通过",
      evidence: "task dump、intent flags、实例 ID、返回序列和业务提交计数",
    },
  ],
  scenarios: [
    {
      label: "正常任务",
      input:
        "固定 SDK、设备配置和初始状态，触发“从 NerdLauncher 启动、重复深链、Home 返回与 Back 导航”",
      expected:
        "由ActivityTaskManager 与每个 task 返回栈提交intent、task ID、Activity 实例、flags 和顶层目的地，并持续满足“栈策略决定导航实例但不自动提供业务副作用幂等”",
    },
    {
      label: "边界恢复",
      input:
        "保持正常输入不变，仅注入“滥用 CLEAR_TOP 修复重复界面，却让待保存编辑状态丢失”",
      expected:
        "找到首个状态分岔，撤销后以task dump、intent flags、实例 ID、返回序列和业务提交计数证明同输入恢复",
    },
  ],
} satisfies AndroidStateModel;

export function MoreIntentsTasksContractLab() {
  return <AndroidStateLab model={model} view="contract" />;
}

export function MoreIntentsTasksLifecycleLab() {
  return <AndroidStateLab model={model} view="lifecycle" />;
}

export function MoreIntentsTasksFaultLab() {
  return <AndroidStateLab model={model} view="fault" />;
}
