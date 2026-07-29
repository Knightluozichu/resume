"use client";

import { AndroidStateLab, type AndroidStateModel } from "./android-state-lab";

const model = {
  unitId: "broadcast-intents",
  title: "broadcast intent",
  task: "区分普通 Intent 与广播，并把长任务从 Receiver 转交受约束工作",
  owner: "BroadcastReceiver、注册作用域与 WorkManager",
  state: "action、extras、导出/权限、接收窗口和转交工作",
  event: "前后台切换、动态注册、发送广播与进程回收",
  invariant: "Receiver 只做短处理，外部广播受权限与导出边界约束",
  fault: "在 onReceive 中同步联网，超过生命周期窗口被系统终止",
  evidence: "注册日志、发送方 UID、权限、onReceive 时长和转交 WorkInfo",
  concepts: [
    "28. Broadcast Intents",
    "Regular Intents vs Broadcast Intents",
    "Filtering Foreground Notifications",
    "Receivers and Long-Running Tasks",
    "For the More Curious: Local Events",
    "For the More Curious: Limitations on Broadcast Receivers",
    "For the More Curious: Detecting the Visibility of Your Fragment",
  ],
  transitions: [
    {
      action: "冻结入口：28. Broadcast Intents",
      state:
        "记录BroadcastReceiver、注册作用域与 WorkManager的初始action、extras、导出/权限、接收窗口和转交工作",
      evidence:
        "注册日志、发送方 UID、权限、onReceive 时长和转交 WorkInfo中的“28. Broadcast Intents”轨迹",
    },
    {
      action: "触发事件：Regular Intents vs Broadcast Intents",
      state:
        "以“前后台切换、动态注册、发送广播与进程回收”改变action、extras、导出/权限、接收窗口和转交工作",
      evidence:
        "注册日志、发送方 UID、权限、onReceive 时长和转交 WorkInfo中的“Regular Intents vs Broadcast Intents”轨迹",
    },
    {
      action: "提交状态：Receivers and Long-Running Tasks",
      state: "只由BroadcastReceiver、注册作用域与 WorkManager提交新状态",
      evidence:
        "注册日志、发送方 UID、权限、onReceive 时长和转交 WorkInfo中的“Receivers and Long-Running Tasks”轨迹",
    },
    {
      action: "重建边界：For the More Curious: Local Events",
      state: "在销毁、取消或重建后拒绝旧所有者回调",
      evidence:
        "注册日志、发送方 UID、权限、onReceive 时长和转交 WorkInfo中的“For the More Curious: Local Events”轨迹",
    },
    {
      action:
        "核对交付：For the More Curious: Detecting the Visibility of Your Fragment",
      state: "以“Receiver 只做短处理，外部广播受权限与导出边界约束”判断通过",
      evidence: "注册日志、发送方 UID、权限、onReceive 时长和转交 WorkInfo",
    },
  ],
  scenarios: [
    {
      label: "正常任务",
      input:
        "固定 SDK、设备配置和初始状态，触发“前后台切换、动态注册、发送广播与进程回收”",
      expected:
        "由BroadcastReceiver、注册作用域与 WorkManager提交action、extras、导出/权限、接收窗口和转交工作，并持续满足“Receiver 只做短处理，外部广播受权限与导出边界约束”",
    },
    {
      label: "边界恢复",
      input:
        "保持正常输入不变，仅注入“在 onReceive 中同步联网，超过生命周期窗口被系统终止”",
      expected:
        "找到首个状态分岔，撤销后以注册日志、发送方 UID、权限、onReceive 时长和转交 WorkInfo证明同输入恢复",
    },
  ],
} satisfies AndroidStateModel;

export function BroadcastIntentsContractLab() {
  return <AndroidStateLab model={model} view="contract" />;
}

export function BroadcastIntentsLifecycleLab() {
  return <AndroidStateLab model={model} view="lifecycle" />;
}

export function BroadcastIntentsFaultLab() {
  return <AndroidStateLab model={model} view="fault" />;
}
