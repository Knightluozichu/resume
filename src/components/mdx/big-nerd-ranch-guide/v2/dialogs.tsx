"use client";

import { AndroidStateLab, type AndroidStateModel } from "./android-state-lab";

const model = {
  unitId: "dialogs",
  title: "对话框",
  task: "让 DatePicker DialogFragment 通过稳定结果合同更新 Crime 日期",
  owner: "DialogFragment、调用 Fragment 与 FragmentResult",
  state: "初始日期、选择值、结果键和已消费状态",
  event: "打开、旋转、确认、取消与重复提交",
  invariant: "对话框重建不丢初值，结果只消费一次且取消不改事实",
  fault: "旋转后旧监听器和新监听器都收到日期结果，数据库写入两次",
  evidence: "dialog tag、结果 bundle、消费计数和 Crime 日期快照",
  concepts: [
    "13. Dialogs",
    "Creating a DialogFragment",
    "Passing Data Between Two Fragments",
    "Challenge: More Dialogs",
  ],
  transitions: [
    {
      action: "冻结入口：13. Dialogs",
      state:
        "记录DialogFragment、调用 Fragment 与 FragmentResult的初始初始日期、选择值、结果键和已消费状态",
      evidence:
        "dialog tag、结果 bundle、消费计数和 Crime 日期快照中的“13. Dialogs”轨迹",
    },
    {
      action: "触发事件：Creating a DialogFragment",
      state:
        "以“打开、旋转、确认、取消与重复提交”改变初始日期、选择值、结果键和已消费状态",
      evidence:
        "dialog tag、结果 bundle、消费计数和 Crime 日期快照中的“Creating a DialogFragment”轨迹",
    },
    {
      action: "提交状态：Creating a DialogFragment",
      state: "只由DialogFragment、调用 Fragment 与 FragmentResult提交新状态",
      evidence:
        "dialog tag、结果 bundle、消费计数和 Crime 日期快照中的“Creating a DialogFragment”轨迹",
    },
    {
      action: "重建边界：Passing Data Between Two Fragments",
      state: "在销毁、取消或重建后拒绝旧所有者回调",
      evidence:
        "dialog tag、结果 bundle、消费计数和 Crime 日期快照中的“Passing Data Between Two Fragments”轨迹",
    },
    {
      action: "核对交付：Challenge: More Dialogs",
      state: "以“对话框重建不丢初值，结果只消费一次且取消不改事实”判断通过",
      evidence: "dialog tag、结果 bundle、消费计数和 Crime 日期快照",
    },
  ],
  scenarios: [
    {
      label: "正常任务",
      input:
        "固定 SDK、设备配置和初始状态，触发“打开、旋转、确认、取消与重复提交”",
      expected:
        "由DialogFragment、调用 Fragment 与 FragmentResult提交初始日期、选择值、结果键和已消费状态，并持续满足“对话框重建不丢初值，结果只消费一次且取消不改事实”",
    },
    {
      label: "边界恢复",
      input:
        "保持正常输入不变，仅注入“旋转后旧监听器和新监听器都收到日期结果，数据库写入两次”",
      expected:
        "找到首个状态分岔，撤销后以dialog tag、结果 bundle、消费计数和 Crime 日期快照证明同输入恢复",
    },
  ],
} satisfies AndroidStateModel;

export function DialogsContractLab() {
  return <AndroidStateLab model={model} view="contract" />;
}

export function DialogsLifecycleLab() {
  return <AndroidStateLab model={model} view="lifecycle" />;
}

export function DialogsFaultLab() {
  return <AndroidStateLab model={model} view="fault" />;
}
