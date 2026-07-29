"use client";

import { AndroidStateLab, type AndroidStateModel } from "./android-state-lab";

const model = {
  unitId: "activity-lifecycle",
  title: "activity的生命周期",
  task: "沿 Activity 回调解释前后台、旋转、多窗口和实例重建中的可见状态变化",
  owner: "Activity 实例与系统生命周期调度器",
  state: "created、started、resumed、paused、stopped、destroyed",
  event: "旋转设备、切到后台、返回应用与开启多窗口",
  invariant: "回调顺序可观察，但 onDestroy 不能被当作持久化成功承诺",
  fault: "在 onDestroy 才保存答案，进程被杀后恢复到错误题目",
  evidence: "实例 ID、时间戳、回调日志、配置值与界面状态",
  concepts: [
    "3. The Activity Lifecycle",
    "Rotating GeoQuiz",
    "Activity States and Lifecycle Callbacks",
    "Logging the Activity Lifecycle",
    "Exploring How the Activity Lifecycle Responds to User Actions",
    "Device Configuration Changes and the Activity Lifecycle",
    "For the More Curious: UI Updates and Multi-Window Mode",
    "For the More Curious: Log Levels",
    "Challenge: Preventing Repeat Answers",
    "Challenge: Graded Quiz",
  ],
  transitions: [
    {
      action: "冻结入口：3. The Activity Lifecycle",
      state:
        "记录Activity 实例与系统生命周期调度器的初始created、started、resumed、paused、stopped、destroyed",
      evidence:
        "实例 ID、时间戳、回调日志、配置值与界面状态中的“3. The Activity Lifecycle”轨迹",
    },
    {
      action: "触发事件：Activity States and Lifecycle Callbacks",
      state:
        "以“旋转设备、切到后台、返回应用与开启多窗口”改变created、started、resumed、paused、stopped、destroyed",
      evidence:
        "实例 ID、时间戳、回调日志、配置值与界面状态中的“Activity States and Lifecycle Callbacks”轨迹",
    },
    {
      action:
        "提交状态：Exploring How the Activity Lifecycle Responds to User Actions",
      state: "只由Activity 实例与系统生命周期调度器提交新状态",
      evidence:
        "实例 ID、时间戳、回调日志、配置值与界面状态中的“Exploring How the Activity Lifecycle Responds to User Actions”轨迹",
    },
    {
      action: "重建边界：For the More Curious: Log Levels",
      state: "在销毁、取消或重建后拒绝旧所有者回调",
      evidence:
        "实例 ID、时间戳、回调日志、配置值与界面状态中的“For the More Curious: Log Levels”轨迹",
    },
    {
      action: "核对交付：Challenge: Graded Quiz",
      state:
        "以“回调顺序可观察，但 onDestroy 不能被当作持久化成功承诺”判断通过",
      evidence: "实例 ID、时间戳、回调日志、配置值与界面状态",
    },
  ],
  scenarios: [
    {
      label: "正常任务",
      input:
        "固定 SDK、设备配置和初始状态，触发“旋转设备、切到后台、返回应用与开启多窗口”",
      expected:
        "由Activity 实例与系统生命周期调度器提交created、started、resumed、paused、stopped、destroyed，并持续满足“回调顺序可观察，但 onDestroy 不能被当作持久化成功承诺”",
    },
    {
      label: "边界恢复",
      input:
        "保持正常输入不变，仅注入“在 onDestroy 才保存答案，进程被杀后恢复到错误题目”",
      expected:
        "找到首个状态分岔，撤销后以实例 ID、时间戳、回调日志、配置值与界面状态证明同输入恢复",
    },
  ],
} satisfies AndroidStateModel;

export function ActivityLifecycleContractLab() {
  return <AndroidStateLab model={model} view="contract" />;
}

export function ActivityLifecycleLifecycleLab() {
  return <AndroidStateLab model={model} view="lifecycle" />;
}

export function ActivityLifecycleFaultLab() {
  return <AndroidStateLab model={model} view="fault" />;
}
