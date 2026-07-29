"use client";

import { AndroidStateLab, type AndroidStateModel } from "./android-state-lab";

const model = {
  unitId: "app-bar",
  title: "AppBar与菜单",
  task: "把 CriminalIntent 的新增、删除、搜索和导航动作接入当前界面状态",
  owner: "MenuHost、当前 Fragment 与列表状态",
  state: "菜单可见性、动作启用、空列表和导航结果",
  event: "创建菜单、选择动作、数据变空与配置重建",
  invariant: "菜单由当前状态派生，不能对已销毁目的地继续执行动作",
  fault: "返回列表后旧详情 Fragment 仍处理删除菜单，删错 Crime",
  evidence: "menu item、目的地 ID、动作日志、列表快照和导航断言",
  concepts: [
    "14. The App Bar",
    "AppCompat Default App Bar",
    "Menus",
    "Using the Android Asset Studio",
    "For the More Curious: App Bar vs Action Bar vs Toolbar",
    "For the More Curious: Accessing the AppCompat App Bar",
    "Challenge: An Empty View for the RecyclerView",
  ],
  transitions: [
    {
      action: "冻结入口：14. The App Bar",
      state:
        "记录MenuHost、当前 Fragment 与列表状态的初始菜单可见性、动作启用、空列表和导航结果",
      evidence:
        "menu item、目的地 ID、动作日志、列表快照和导航断言中的“14. The App Bar”轨迹",
    },
    {
      action: "触发事件：AppCompat Default App Bar",
      state:
        "以“创建菜单、选择动作、数据变空与配置重建”改变菜单可见性、动作启用、空列表和导航结果",
      evidence:
        "menu item、目的地 ID、动作日志、列表快照和导航断言中的“AppCompat Default App Bar”轨迹",
    },
    {
      action: "提交状态：Using the Android Asset Studio",
      state: "只由MenuHost、当前 Fragment 与列表状态提交新状态",
      evidence:
        "menu item、目的地 ID、动作日志、列表快照和导航断言中的“Using the Android Asset Studio”轨迹",
    },
    {
      action:
        "重建边界：For the More Curious: App Bar vs Action Bar vs Toolbar",
      state: "在销毁、取消或重建后拒绝旧所有者回调",
      evidence:
        "menu item、目的地 ID、动作日志、列表快照和导航断言中的“For the More Curious: App Bar vs Action Bar vs Toolbar”轨迹",
    },
    {
      action: "核对交付：Challenge: An Empty View for the RecyclerView",
      state: "以“菜单由当前状态派生，不能对已销毁目的地继续执行动作”判断通过",
      evidence: "menu item、目的地 ID、动作日志、列表快照和导航断言",
    },
  ],
  scenarios: [
    {
      label: "正常任务",
      input:
        "固定 SDK、设备配置和初始状态，触发“创建菜单、选择动作、数据变空与配置重建”",
      expected:
        "由MenuHost、当前 Fragment 与列表状态提交菜单可见性、动作启用、空列表和导航结果，并持续满足“菜单由当前状态派生，不能对已销毁目的地继续执行动作”",
    },
    {
      label: "边界恢复",
      input:
        "保持正常输入不变，仅注入“返回列表后旧详情 Fragment 仍处理删除菜单，删错 Crime”",
      expected:
        "找到首个状态分岔，撤销后以menu item、目的地 ID、动作日志、列表快照和导航断言证明同输入恢复",
    },
  ],
} satisfies AndroidStateModel;

export function AppBarContractLab() {
  return <AndroidStateLab model={model} view="contract" />;
}

export function AppBarLifecycleLab() {
  return <AndroidStateLab model={model} view="lifecycle" />;
}

export function AppBarFaultLab() {
  return <AndroidStateLab model={model} view="fault" />;
}
