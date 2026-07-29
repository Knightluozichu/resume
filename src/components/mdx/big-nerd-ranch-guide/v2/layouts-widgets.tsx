"use client";

import { AndroidStateLab, type AndroidStateModel } from "./android-state-lab";

const model = {
  unitId: "layouts-widgets",
  title: "使用布局与部件创建用户界面",
  task: "把 ConstraintLayout 约束、测量、布局与资源限定符落到多配置几何",
  owner: "View 树、ConstraintLayout 求解器与资源匹配器",
  state: "约束、尺寸、边距、padding、文字和焦点顺序",
  event: "切换小屏、横屏、长文本、大字体与 RTL",
  invariant: "所有目标配置中信息不截断、控件不重叠且主要动作可达",
  fault: "只在单一 Pixel 模拟器检查，德语大字体下按钮被挤出屏幕",
  evidence: "配置矩阵、Layout Inspector 几何、截图与可达性断言",
  concepts: [
    "10. Creating User Interfaces with Layouts and Widgets",
    "Introducing ConstraintLayout",
    "Introducing the Graphical Layout Editor",
    "Using ConstraintLayout",
    "More on Layout Attributes",
    "For the More Curious: Margins vs Padding",
    "For the More Curious: New Developments in ConstraintLayout",
    "Challenge: Formatting the Date",
  ],
  transitions: [
    {
      action: "冻结入口：10. Creating User Interfaces with Layouts and Widgets",
      state:
        "记录View 树、ConstraintLayout 求解器与资源匹配器的初始约束、尺寸、边距、padding、文字和焦点顺序",
      evidence:
        "配置矩阵、Layout Inspector 几何、截图与可达性断言中的“10. Creating User Interfaces with Layouts and Widgets”轨迹",
    },
    {
      action: "触发事件：Introducing the Graphical Layout Editor",
      state:
        "以“切换小屏、横屏、长文本、大字体与 RTL”改变约束、尺寸、边距、padding、文字和焦点顺序",
      evidence:
        "配置矩阵、Layout Inspector 几何、截图与可达性断言中的“Introducing the Graphical Layout Editor”轨迹",
    },
    {
      action: "提交状态：Using ConstraintLayout",
      state: "只由View 树、ConstraintLayout 求解器与资源匹配器提交新状态",
      evidence:
        "配置矩阵、Layout Inspector 几何、截图与可达性断言中的“Using ConstraintLayout”轨迹",
    },
    {
      action: "重建边界：For the More Curious: Margins vs Padding",
      state: "在销毁、取消或重建后拒绝旧所有者回调",
      evidence:
        "配置矩阵、Layout Inspector 几何、截图与可达性断言中的“For the More Curious: Margins vs Padding”轨迹",
    },
    {
      action: "核对交付：Challenge: Formatting the Date",
      state: "以“所有目标配置中信息不截断、控件不重叠且主要动作可达”判断通过",
      evidence: "配置矩阵、Layout Inspector 几何、截图与可达性断言",
    },
  ],
  scenarios: [
    {
      label: "正常任务",
      input:
        "固定 SDK、设备配置和初始状态，触发“切换小屏、横屏、长文本、大字体与 RTL”",
      expected:
        "由View 树、ConstraintLayout 求解器与资源匹配器提交约束、尺寸、边距、padding、文字和焦点顺序，并持续满足“所有目标配置中信息不截断、控件不重叠且主要动作可达”",
    },
    {
      label: "边界恢复",
      input:
        "保持正常输入不变，仅注入“只在单一 Pixel 模拟器检查，德语大字体下按钮被挤出屏幕”",
      expected:
        "找到首个状态分岔，撤销后以配置矩阵、Layout Inspector 几何、截图与可达性断言证明同输入恢复",
    },
  ],
} satisfies AndroidStateModel;

export function LayoutsWidgetsContractLab() {
  return <AndroidStateLab model={model} view="contract" />;
}

export function LayoutsWidgetsLifecycleLab() {
  return <AndroidStateLab model={model} view="lifecycle" />;
}

export function LayoutsWidgetsFaultLab() {
  return <AndroidStateLab model={model} view="fault" />;
}
