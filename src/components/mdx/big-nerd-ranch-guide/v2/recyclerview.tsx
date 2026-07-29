"use client";

import { AndroidStateLab, type AndroidStateModel } from "./android-state-lab";

const model = {
  unitId: "recyclerview",
  title: "使用RecyclerView显示列表",
  task: "让 Adapter 以稳定事实完整绑定复用 ViewHolder，而非依赖旧位置状态",
  owner: "Adapter 数据快照与每个 ViewHolder",
  state: "item ID、类型、绑定内容、选择与可见位置",
  event: "滚动复用、插入、删除、点击和数据刷新",
  invariant: "每次 bind 覆盖全部可变视图，点击按当前 item 身份解释",
  fault: "复用后未重置 checkbox，上一行的选中状态泄漏到新数据",
  evidence: "绑定日志、holder ID、item ID、diff 结果与滚动断言",
  concepts: [
    "9. Displaying Lists with RecyclerView",
    "Adding a New Fragment and ViewModel",
    "Adding a RecyclerView",
    "Creating an Item View Layout",
    "Implementing a ViewHolder",
    "Implementing an Adapter to Populate the RecyclerView",
    "Recycling Views",
    "Cleaning Up Binding List Items",
    "Responding to Presses",
    "For the More Curious: ListView and GridView",
    "Challenge: RecyclerView ViewTypes",
  ],
  transitions: [
    {
      action: "冻结入口：9. Displaying Lists with RecyclerView",
      state:
        "记录Adapter 数据快照与每个 ViewHolder的初始item ID、类型、绑定内容、选择与可见位置",
      evidence:
        "绑定日志、holder ID、item ID、diff 结果与滚动断言中的“9. Displaying Lists with RecyclerView”轨迹",
    },
    {
      action: "触发事件：Adding a RecyclerView",
      state:
        "以“滚动复用、插入、删除、点击和数据刷新”改变item ID、类型、绑定内容、选择与可见位置",
      evidence:
        "绑定日志、holder ID、item ID、diff 结果与滚动断言中的“Adding a RecyclerView”轨迹",
    },
    {
      action: "提交状态：Implementing an Adapter to Populate the RecyclerView",
      state: "只由Adapter 数据快照与每个 ViewHolder提交新状态",
      evidence:
        "绑定日志、holder ID、item ID、diff 结果与滚动断言中的“Implementing an Adapter to Populate the RecyclerView”轨迹",
    },
    {
      action: "重建边界：Cleaning Up Binding List Items",
      state: "在销毁、取消或重建后拒绝旧所有者回调",
      evidence:
        "绑定日志、holder ID、item ID、diff 结果与滚动断言中的“Cleaning Up Binding List Items”轨迹",
    },
    {
      action: "核对交付：Challenge: RecyclerView ViewTypes",
      state: "以“每次 bind 覆盖全部可变视图，点击按当前 item 身份解释”判断通过",
      evidence: "绑定日志、holder ID、item ID、diff 结果与滚动断言",
    },
  ],
  scenarios: [
    {
      label: "正常任务",
      input:
        "固定 SDK、设备配置和初始状态，触发“滚动复用、插入、删除、点击和数据刷新”",
      expected:
        "由Adapter 数据快照与每个 ViewHolder提交item ID、类型、绑定内容、选择与可见位置，并持续满足“每次 bind 覆盖全部可变视图，点击按当前 item 身份解释”",
    },
    {
      label: "边界恢复",
      input:
        "保持正常输入不变，仅注入“复用后未重置 checkbox，上一行的选中状态泄漏到新数据”",
      expected:
        "找到首个状态分岔，撤销后以绑定日志、holder ID、item ID、diff 结果与滚动断言证明同输入恢复",
    },
  ],
} satisfies AndroidStateModel;

export function RecyclerviewContractLab() {
  return <AndroidStateLab model={model} view="contract" />;
}

export function RecyclerviewLifecycleLab() {
  return <AndroidStateLab model={model} view="lifecycle" />;
}

export function RecyclerviewFaultLab() {
  return <AndroidStateLab model={model} view="fault" />;
}
