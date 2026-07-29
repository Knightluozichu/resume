"use client";

import { AndroidStateLab, type AndroidStateModel } from "./android-state-lab";

const model = {
  unitId: "ui-fragments",
  title: "UI fragment与fragment管理器",
  task: "区分 Fragment 实例与 Fragment View 生命周期，并由 FragmentManager 恢复结构",
  owner: "FragmentManager、Fragment 实例与 viewLifecycleOwner",
  state: "fragment 状态、View binding、事务和容器内容",
  event: "创建、替换、旋转及 onDestroyView",
  invariant: "View 销毁后不再接收界面回调，Fragment 状态仍可按合同恢复",
  fault: "Fragment 保存已销毁 View binding，异步回调写入旧界面",
  evidence: "Fragment/View 实例 ID、事务日志、回调序列和泄漏检查",
  concepts: [
    "8. UI Fragments and the Fragment Manager",
    "The Need for UI Flexibility",
    "Introducing Fragments",
    "Starting CriminalIntent",
    "Creating a Data Class",
    "Creating a UI Fragment",
    "Hosting a UI Fragment",
    "Application Architecture with Fragments",
  ],
  transitions: [
    {
      action: "冻结入口：8. UI Fragments and the Fragment Manager",
      state:
        "记录FragmentManager、Fragment 实例与 viewLifecycleOwner的初始fragment 状态、View binding、事务和容器内容",
      evidence:
        "Fragment/View 实例 ID、事务日志、回调序列和泄漏检查中的“8. UI Fragments and the Fragment Manager”轨迹",
    },
    {
      action: "触发事件：Introducing Fragments",
      state:
        "以“创建、替换、旋转及 onDestroyView”改变fragment 状态、View binding、事务和容器内容",
      evidence:
        "Fragment/View 实例 ID、事务日志、回调序列和泄漏检查中的“Introducing Fragments”轨迹",
    },
    {
      action: "提交状态：Starting CriminalIntent",
      state:
        "只由FragmentManager、Fragment 实例与 viewLifecycleOwner提交新状态",
      evidence:
        "Fragment/View 实例 ID、事务日志、回调序列和泄漏检查中的“Starting CriminalIntent”轨迹",
    },
    {
      action: "重建边界：Creating a UI Fragment",
      state: "在销毁、取消或重建后拒绝旧所有者回调",
      evidence:
        "Fragment/View 实例 ID、事务日志、回调序列和泄漏检查中的“Creating a UI Fragment”轨迹",
    },
    {
      action: "核对交付：Application Architecture with Fragments",
      state:
        "以“View 销毁后不再接收界面回调，Fragment 状态仍可按合同恢复”判断通过",
      evidence: "Fragment/View 实例 ID、事务日志、回调序列和泄漏检查",
    },
  ],
  scenarios: [
    {
      label: "正常任务",
      input:
        "固定 SDK、设备配置和初始状态，触发“创建、替换、旋转及 onDestroyView”",
      expected:
        "由FragmentManager、Fragment 实例与 viewLifecycleOwner提交fragment 状态、View binding、事务和容器内容，并持续满足“View 销毁后不再接收界面回调，Fragment 状态仍可按合同恢复”",
    },
    {
      label: "边界恢复",
      input:
        "保持正常输入不变，仅注入“Fragment 保存已销毁 View binding，异步回调写入旧界面”",
      expected:
        "找到首个状态分岔，撤销后以Fragment/View 实例 ID、事务日志、回调序列和泄漏检查证明同输入恢复",
    },
  ],
} satisfies AndroidStateModel;

export function UiFragmentsContractLab() {
  return <AndroidStateLab model={model} view="contract" />;
}

export function UiFragmentsLifecycleLab() {
  return <AndroidStateLab model={model} view="lifecycle" />;
}

export function UiFragmentsFaultLab() {
  return <AndroidStateLab model={model} view="fault" />;
}
