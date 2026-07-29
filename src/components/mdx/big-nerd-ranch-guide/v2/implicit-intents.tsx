"use client";

import { AndroidStateLab, type AndroidStateModel } from "./android-state-lab";

const model = {
  unitId: "implicit-intents",
  title: "隐式intent",
  task: "为电话、联系人和分享动作构造最小隐式 Intent 并处理解析结果",
  owner: "Intent 发起方、PackageManager 与外部响应应用",
  state: "action、URI、MIME、extras、授权和候选列表",
  event: "点击嫌疑人或报告按钮并解析零个、一个或多个响应者",
  invariant: "没有响应者时提供可理解回退，敏感数据只授予必要目标",
  fault: "无应用能处理 Intent 时仍直接 startActivity，导致崩溃",
  evidence: "Intent 字段、resolve 结果、选择器、授权范围和返回轨迹",
  concepts: [
    "15. Implicit Intents",
    "Adding Buttons",
    "Adding a Suspect to the Model Layer",
    "Using a Format String",
    "Using Implicit Intents",
    "Challenge: Another Implicit Intent",
  ],
  transitions: [
    {
      action: "冻结入口：15. Implicit Intents",
      state:
        "记录Intent 发起方、PackageManager 与外部响应应用的初始action、URI、MIME、extras、授权和候选列表",
      evidence:
        "Intent 字段、resolve 结果、选择器、授权范围和返回轨迹中的“15. Implicit Intents”轨迹",
    },
    {
      action: "触发事件：Adding Buttons",
      state:
        "以“点击嫌疑人或报告按钮并解析零个、一个或多个响应者”改变action、URI、MIME、extras、授权和候选列表",
      evidence:
        "Intent 字段、resolve 结果、选择器、授权范围和返回轨迹中的“Adding Buttons”轨迹",
    },
    {
      action: "提交状态：Adding a Suspect to the Model Layer",
      state: "只由Intent 发起方、PackageManager 与外部响应应用提交新状态",
      evidence:
        "Intent 字段、resolve 结果、选择器、授权范围和返回轨迹中的“Adding a Suspect to the Model Layer”轨迹",
    },
    {
      action: "重建边界：Using Implicit Intents",
      state: "在销毁、取消或重建后拒绝旧所有者回调",
      evidence:
        "Intent 字段、resolve 结果、选择器、授权范围和返回轨迹中的“Using Implicit Intents”轨迹",
    },
    {
      action: "核对交付：Challenge: Another Implicit Intent",
      state: "以“没有响应者时提供可理解回退，敏感数据只授予必要目标”判断通过",
      evidence: "Intent 字段、resolve 结果、选择器、授权范围和返回轨迹",
    },
  ],
  scenarios: [
    {
      label: "正常任务",
      input:
        "固定 SDK、设备配置和初始状态，触发“点击嫌疑人或报告按钮并解析零个、一个或多个响应者”",
      expected:
        "由Intent 发起方、PackageManager 与外部响应应用提交action、URI、MIME、extras、授权和候选列表，并持续满足“没有响应者时提供可理解回退，敏感数据只授予必要目标”",
    },
    {
      label: "边界恢复",
      input:
        "保持正常输入不变，仅注入“无应用能处理 Intent 时仍直接 startActivity，导致崩溃”",
      expected:
        "找到首个状态分岔，撤销后以Intent 字段、resolve 结果、选择器、授权范围和返回轨迹证明同输入恢复",
    },
  ],
} satisfies AndroidStateModel;

export function ImplicitIntentsContractLab() {
  return <AndroidStateLab model={model} view="contract" />;
}

export function ImplicitIntentsLifecycleLab() {
  return <AndroidStateLab model={model} view="lifecycle" />;
}

export function ImplicitIntentsFaultLab() {
  return <AndroidStateLab model={model} view="fault" />;
}
