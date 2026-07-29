"use client";

import { AndroidStateLab, type AndroidStateModel } from "./android-state-lab";

const model = {
  unitId: "workmanager",
  title: "WorkManager",
  task: "用 Worker、约束、唯一工作、通知与用户开关表达可靠可延期轮询",
  owner: "WorkManager 数据库、PollWorker 与用户设置",
  state: "WorkSpec、约束、attempt、唯一名称、结果和取消状态",
  event: "启用轮询、网络变化、进程重启、重试、通知与关闭轮询",
  invariant: "关闭后唯一工作不存在，重复启用不产生并行轮询",
  fault: "把 PeriodicWorkRequest 当精确定时器，并重复入队多个同名任务",
  evidence: "WorkInfo、约束切换、attempt、唯一队列、通知和取消测试",
  concepts: [
    "27. WorkManager",
    "Creating a Worker",
    "Scheduling Work",
    "Checking for New Photos",
    "Notifying the User",
    "Providing User Control over Polling",
  ],
  transitions: [
    {
      action: "冻结入口：27. WorkManager",
      state:
        "记录WorkManager 数据库、PollWorker 与用户设置的初始WorkSpec、约束、attempt、唯一名称、结果和取消状态",
      evidence:
        "WorkInfo、约束切换、attempt、唯一队列、通知和取消测试中的“27. WorkManager”轨迹",
    },
    {
      action: "触发事件：Creating a Worker",
      state:
        "以“启用轮询、网络变化、进程重启、重试、通知与关闭轮询”改变WorkSpec、约束、attempt、唯一名称、结果和取消状态",
      evidence:
        "WorkInfo、约束切换、attempt、唯一队列、通知和取消测试中的“Creating a Worker”轨迹",
    },
    {
      action: "提交状态：Scheduling Work",
      state: "只由WorkManager 数据库、PollWorker 与用户设置提交新状态",
      evidence:
        "WorkInfo、约束切换、attempt、唯一队列、通知和取消测试中的“Scheduling Work”轨迹",
    },
    {
      action: "重建边界：Notifying the User",
      state: "在销毁、取消或重建后拒绝旧所有者回调",
      evidence:
        "WorkInfo、约束切换、attempt、唯一队列、通知和取消测试中的“Notifying the User”轨迹",
    },
    {
      action: "核对交付：Providing User Control over Polling",
      state: "以“关闭后唯一工作不存在，重复启用不产生并行轮询”判断通过",
      evidence: "WorkInfo、约束切换、attempt、唯一队列、通知和取消测试",
    },
  ],
  scenarios: [
    {
      label: "正常任务",
      input:
        "固定 SDK、设备配置和初始状态，触发“启用轮询、网络变化、进程重启、重试、通知与关闭轮询”",
      expected:
        "由WorkManager 数据库、PollWorker 与用户设置提交WorkSpec、约束、attempt、唯一名称、结果和取消状态，并持续满足“关闭后唯一工作不存在，重复启用不产生并行轮询”",
    },
    {
      label: "边界恢复",
      input:
        "保持正常输入不变，仅注入“把 PeriodicWorkRequest 当精确定时器，并重复入队多个同名任务”",
      expected:
        "找到首个状态分岔，撤销后以WorkInfo、约束切换、attempt、唯一队列、通知和取消测试证明同输入恢复",
    },
  ],
} satisfies AndroidStateModel;

export function WorkmanagerContractLab() {
  return <AndroidStateLab model={model} view="contract" />;
}

export function WorkmanagerLifecycleLab() {
  return <AndroidStateLab model={model} view="lifecycle" />;
}

export function WorkmanagerFaultLab() {
  return <AndroidStateLab model={model} view="fault" />;
}
