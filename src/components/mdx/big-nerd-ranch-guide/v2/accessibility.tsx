"use client";

import { AndroidStateLab, type AndroidStateModel } from "./android-state-lab";

const model = {
  unitId: "accessibility",
  title: "Android辅助功能",
  task: "让 TalkBack 用户以线性焦点、语义标签和可执行 action 完成同一任务",
  owner: "View 语义树、AccessibilityService 与应用状态",
  state: "content description、role、state、action 和 announcement",
  event: "启用 TalkBack，遍历列表、编辑字段并触发状态变化",
  invariant: "非视觉用户获得与视觉用户等价的任务结果和变化反馈",
  fault: "自定义图片按钮没有名称，TalkBack 只读出“未标记的按钮”",
  evidence: "无障碍节点树、焦点顺序、操作录制、Scanner 与任务断言",
  concepts: [
    "18. Accessibility",
    "TalkBack",
    "Making Non-Text Elements Readable by TalkBack",
    "Creating a Comparable Experience",
    "For the More Curious: Using Accessibility Scanner",
    "Challenge: Improving the List",
    "Challenge: Providing Enough Context for Data Entry",
    "Challenge: Announcing Events",
  ],
  transitions: [
    {
      action: "冻结入口：18. Accessibility",
      state:
        "记录View 语义树、AccessibilityService 与应用状态的初始content description、role、state、action 和 announcement",
      evidence:
        "无障碍节点树、焦点顺序、操作录制、Scanner 与任务断言中的“18. Accessibility”轨迹",
    },
    {
      action: "触发事件：Making Non-Text Elements Readable by TalkBack",
      state:
        "以“启用 TalkBack，遍历列表、编辑字段并触发状态变化”改变content description、role、state、action 和 announcement",
      evidence:
        "无障碍节点树、焦点顺序、操作录制、Scanner 与任务断言中的“Making Non-Text Elements Readable by TalkBack”轨迹",
    },
    {
      action: "提交状态：Creating a Comparable Experience",
      state: "只由View 语义树、AccessibilityService 与应用状态提交新状态",
      evidence:
        "无障碍节点树、焦点顺序、操作录制、Scanner 与任务断言中的“Creating a Comparable Experience”轨迹",
    },
    {
      action: "重建边界：Challenge: Improving the List",
      state: "在销毁、取消或重建后拒绝旧所有者回调",
      evidence:
        "无障碍节点树、焦点顺序、操作录制、Scanner 与任务断言中的“Challenge: Improving the List”轨迹",
    },
    {
      action: "核对交付：Challenge: Announcing Events",
      state: "以“非视觉用户获得与视觉用户等价的任务结果和变化反馈”判断通过",
      evidence: "无障碍节点树、焦点顺序、操作录制、Scanner 与任务断言",
    },
  ],
  scenarios: [
    {
      label: "正常任务",
      input:
        "固定 SDK、设备配置和初始状态，触发“启用 TalkBack，遍历列表、编辑字段并触发状态变化”",
      expected:
        "由View 语义树、AccessibilityService 与应用状态提交content description、role、state、action 和 announcement，并持续满足“非视觉用户获得与视觉用户等价的任务结果和变化反馈”",
    },
    {
      label: "边界恢复",
      input:
        "保持正常输入不变，仅注入“自定义图片按钮没有名称，TalkBack 只读出“未标记的按钮””",
      expected:
        "找到首个状态分岔，撤销后以无障碍节点树、焦点顺序、操作录制、Scanner 与任务断言证明同输入恢复",
    },
  ],
} satisfies AndroidStateModel;

export function AccessibilityContractLab() {
  return <AndroidStateLab model={model} view="contract" />;
}

export function AccessibilityLifecycleLab() {
  return <AndroidStateLab model={model} view="lifecycle" />;
}

export function AccessibilityFaultLab() {
  return <AndroidStateLab model={model} view="fault" />;
}
