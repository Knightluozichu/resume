"use client";

import { AndroidStateLab, type AndroidStateModel } from "./android-state-lab";

const model = {
  unitId: "second-activity",
  title: "第二个Activity",
  task: "以显式 Intent 启动 CheatActivity，并用最小 extras 与结果合同交换数据",
  owner: "发送 Activity、目标 Activity 与 ActivityResult 合同",
  state: "题目答案、作弊决定、返回结果和已处理标记",
  event: "启动第二界面、旋转、返回与重复结果到达",
  invariant: "缺失或重复结果不能让 GeoQuiz 错记作弊状态",
  fault: "目标 Activity 重建后再次返回同一结果，发送方重复提交",
  evidence: "Intent extras、实例 ID、结果码、消费标记和题目状态",
  concepts: [
    "6. Your Second Activity",
    "Setting Up a Second Activity",
    "Starting an Activity",
    "Passing Data Between Activities",
    "How Android Sees Your Activities",
    "Challenge: Closing Loopholes for Cheaters",
    "Challenge: Tracking Cheat Status by Question",
  ],
  transitions: [
    {
      action: "冻结入口：6. Your Second Activity",
      state:
        "记录发送 Activity、目标 Activity 与 ActivityResult 合同的初始题目答案、作弊决定、返回结果和已处理标记",
      evidence:
        "Intent extras、实例 ID、结果码、消费标记和题目状态中的“6. Your Second Activity”轨迹",
    },
    {
      action: "触发事件：Setting Up a Second Activity",
      state:
        "以“启动第二界面、旋转、返回与重复结果到达”改变题目答案、作弊决定、返回结果和已处理标记",
      evidence:
        "Intent extras、实例 ID、结果码、消费标记和题目状态中的“Setting Up a Second Activity”轨迹",
    },
    {
      action: "提交状态：Passing Data Between Activities",
      state:
        "只由发送 Activity、目标 Activity 与 ActivityResult 合同提交新状态",
      evidence:
        "Intent extras、实例 ID、结果码、消费标记和题目状态中的“Passing Data Between Activities”轨迹",
    },
    {
      action: "重建边界：How Android Sees Your Activities",
      state: "在销毁、取消或重建后拒绝旧所有者回调",
      evidence:
        "Intent extras、实例 ID、结果码、消费标记和题目状态中的“How Android Sees Your Activities”轨迹",
    },
    {
      action: "核对交付：Challenge: Tracking Cheat Status by Question",
      state: "以“缺失或重复结果不能让 GeoQuiz 错记作弊状态”判断通过",
      evidence: "Intent extras、实例 ID、结果码、消费标记和题目状态",
    },
  ],
  scenarios: [
    {
      label: "正常任务",
      input:
        "固定 SDK、设备配置和初始状态，触发“启动第二界面、旋转、返回与重复结果到达”",
      expected:
        "由发送 Activity、目标 Activity 与 ActivityResult 合同提交题目答案、作弊决定、返回结果和已处理标记，并持续满足“缺失或重复结果不能让 GeoQuiz 错记作弊状态”",
    },
    {
      label: "边界恢复",
      input:
        "保持正常输入不变，仅注入“目标 Activity 重建后再次返回同一结果，发送方重复提交”",
      expected:
        "找到首个状态分岔，撤销后以Intent extras、实例 ID、结果码、消费标记和题目状态证明同输入恢复",
    },
  ],
} satisfies AndroidStateModel;

export function SecondActivityContractLab() {
  return <AndroidStateLab model={model} view="contract" />;
}

export function SecondActivityLifecycleLab() {
  return <AndroidStateLab model={model} view="lifecycle" />;
}

export function SecondActivityFaultLab() {
  return <AndroidStateLab model={model} view="fault" />;
}
