"use client";

import { AndroidStateLab, type AndroidStateModel } from "./android-state-lab";

const model = {
  unitId: "data-binding-mvvm",
  title: "数据绑定与MVVM",
  task: "区分 MVVM 表示状态、Jetpack ViewModel 寿命与 Data Binding 更新",
  owner: "BeatBoxViewModel、SoundViewModel 与 Binding",
  state: "资产列表、显示文本、用户命令、观察值和 View 状态",
  event: "加载资产、绑定列表、点击声音与旋转",
  invariant: "状态所有者不持有已销毁 View，Binding 只渲染可观察事实",
  fault: "ViewModel 保存 Activity 或 Binding 引用，旋转后泄漏旧界面",
  evidence: "实例 ID、绑定求值、资产状态、点击事件和泄漏检查",
  concepts: [
    "19. Data Binding and MVVM",
    "Different Architectures: Why Bother?",
    "MVVM View Models vs Jetpack ViewModels",
    "Creating BeatBox",
    "Implementing Simple Data Binding",
    "Importing Assets",
    "Accessing Assets",
    "Wiring Up Assets for Use",
    "Binding to Data",
    "For the More Curious: More About Data Binding",
    "For the More Curious: LiveData and Data Binding",
  ],
  transitions: [
    {
      action: "冻结入口：19. Data Binding and MVVM",
      state:
        "记录BeatBoxViewModel、SoundViewModel 与 Binding的初始资产列表、显示文本、用户命令、观察值和 View 状态",
      evidence:
        "实例 ID、绑定求值、资产状态、点击事件和泄漏检查中的“19. Data Binding and MVVM”轨迹",
    },
    {
      action: "触发事件：MVVM View Models vs Jetpack ViewModels",
      state:
        "以“加载资产、绑定列表、点击声音与旋转”改变资产列表、显示文本、用户命令、观察值和 View 状态",
      evidence:
        "实例 ID、绑定求值、资产状态、点击事件和泄漏检查中的“MVVM View Models vs Jetpack ViewModels”轨迹",
    },
    {
      action: "提交状态：Importing Assets",
      state: "只由BeatBoxViewModel、SoundViewModel 与 Binding提交新状态",
      evidence:
        "实例 ID、绑定求值、资产状态、点击事件和泄漏检查中的“Importing Assets”轨迹",
    },
    {
      action: "重建边界：Wiring Up Assets for Use",
      state: "在销毁、取消或重建后拒绝旧所有者回调",
      evidence:
        "实例 ID、绑定求值、资产状态、点击事件和泄漏检查中的“Wiring Up Assets for Use”轨迹",
    },
    {
      action: "核对交付：For the More Curious: LiveData and Data Binding",
      state:
        "以“状态所有者不持有已销毁 View，Binding 只渲染可观察事实”判断通过",
      evidence: "实例 ID、绑定求值、资产状态、点击事件和泄漏检查",
    },
  ],
  scenarios: [
    {
      label: "正常任务",
      input:
        "固定 SDK、设备配置和初始状态，触发“加载资产、绑定列表、点击声音与旋转”",
      expected:
        "由BeatBoxViewModel、SoundViewModel 与 Binding提交资产列表、显示文本、用户命令、观察值和 View 状态，并持续满足“状态所有者不持有已销毁 View，Binding 只渲染可观察事实”",
    },
    {
      label: "边界恢复",
      input:
        "保持正常输入不变，仅注入“ViewModel 保存 Activity 或 Binding 引用，旋转后泄漏旧界面”",
      expected:
        "找到首个状态分岔，撤销后以实例 ID、绑定求值、资产状态、点击事件和泄漏检查证明同输入恢复",
    },
  ],
} satisfies AndroidStateModel;

export function DataBindingMvvmContractLab() {
  return <AndroidStateLab model={model} view="contract" />;
}

export function DataBindingMvvmLifecycleLab() {
  return <AndroidStateLab model={model} view="lifecycle" />;
}

export function DataBindingMvvmFaultLab() {
  return <AndroidStateLab model={model} view="fault" />;
}
