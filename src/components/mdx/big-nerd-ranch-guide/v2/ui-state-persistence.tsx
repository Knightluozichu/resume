"use client";

import { AndroidStateLab, type AndroidStateModel } from "./android-state-lab";

const model = {
  unitId: "ui-state-persistence",
  title: "UI状态的保存与恢复",
  task: "区分 View 临时状态、ViewModel 配置期状态、saved state 与持久事实",
  owner: "QuizViewModel、SavedStateHandle 与持久仓库",
  state: "题号、作答记录、临时输入和可恢复事实",
  event: "旋转、后台进程回收与冷启动恢复",
  invariant: "每类状态只由适合其寿命的所有者恢复且不重复提交副作用",
  fault: "只用 ViewModel 保存答案并假设它可以跨进程死亡",
  evidence: "保存键、序列化值、进程 ID、恢复轨迹和行为断言",
  concepts: [
    "4. Persisting UI State",
    "Including the ViewModel Dependency",
    "Adding a ViewModel",
    "Saving Data Across Process Death",
    "ViewModel vs Saved Instance State",
    "For the More Curious: Jetpack, AndroidX, and Architecture Components",
    "For the More Curious: Avoiding a Half-Baked Solution",
  ],
  transitions: [
    {
      action: "冻结入口：4. Persisting UI State",
      state:
        "记录QuizViewModel、SavedStateHandle 与持久仓库的初始题号、作答记录、临时输入和可恢复事实",
      evidence:
        "保存键、序列化值、进程 ID、恢复轨迹和行为断言中的“4. Persisting UI State”轨迹",
    },
    {
      action: "触发事件：Including the ViewModel Dependency",
      state:
        "以“旋转、后台进程回收与冷启动恢复”改变题号、作答记录、临时输入和可恢复事实",
      evidence:
        "保存键、序列化值、进程 ID、恢复轨迹和行为断言中的“Including the ViewModel Dependency”轨迹",
    },
    {
      action: "提交状态：Saving Data Across Process Death",
      state: "只由QuizViewModel、SavedStateHandle 与持久仓库提交新状态",
      evidence:
        "保存键、序列化值、进程 ID、恢复轨迹和行为断言中的“Saving Data Across Process Death”轨迹",
    },
    {
      action: "重建边界：ViewModel vs Saved Instance State",
      state: "在销毁、取消或重建后拒绝旧所有者回调",
      evidence:
        "保存键、序列化值、进程 ID、恢复轨迹和行为断言中的“ViewModel vs Saved Instance State”轨迹",
    },
    {
      action: "核对交付：For the More Curious: Avoiding a Half-Baked Solution",
      state: "以“每类状态只由适合其寿命的所有者恢复且不重复提交副作用”判断通过",
      evidence: "保存键、序列化值、进程 ID、恢复轨迹和行为断言",
    },
  ],
  scenarios: [
    {
      label: "正常任务",
      input:
        "固定 SDK、设备配置和初始状态，触发“旋转、后台进程回收与冷启动恢复”",
      expected:
        "由QuizViewModel、SavedStateHandle 与持久仓库提交题号、作答记录、临时输入和可恢复事实，并持续满足“每类状态只由适合其寿命的所有者恢复且不重复提交副作用”",
    },
    {
      label: "边界恢复",
      input:
        "保持正常输入不变，仅注入“只用 ViewModel 保存答案并假设它可以跨进程死亡”",
      expected:
        "找到首个状态分岔，撤销后以保存键、序列化值、进程 ID、恢复轨迹和行为断言证明同输入恢复",
    },
  ],
} satisfies AndroidStateModel;

export function UiStatePersistenceContractLab() {
  return <AndroidStateLab model={model} view="contract" />;
}

export function UiStatePersistenceLifecycleLab() {
  return <AndroidStateLab model={model} view="lifecycle" />;
}

export function UiStatePersistenceFaultLab() {
  return <AndroidStateLab model={model} view="fault" />;
}
