"use client";

import { AndroidStateLab, type AndroidStateModel } from "./android-state-lab";

const model = {
  unitId: "property-animation",
  title: "属性动画",
  task: "用 ObjectAnimator 与 AnimatorSet 改变真实属性并同步交互边界",
  owner: "Animator、View 属性与场景状态机",
  state: "属性起止值、时长、插值、运行阶段和点击区域",
  event: "启动、暂停、取消、组合动画、旋转与减少动态效果",
  invariant: "动画结束后的视觉、布局点击区域和无障碍边界一致",
  fault: "只做 canvas 位移，按钮看似移动但点击区域仍留在原位",
  evidence: "属性快照、animator 状态、点击坐标、取消轨迹和可访问性边界",
  concepts: [
    "31. Property Animation",
    "Building the Scene",
    "Simple Property Animation",
    "Playing Animators Together",
    "For the More Curious: Other Animation APIs",
    "Challenges",
  ],
  transitions: [
    {
      action: "冻结入口：31. Property Animation",
      state:
        "记录Animator、View 属性与场景状态机的初始属性起止值、时长、插值、运行阶段和点击区域",
      evidence:
        "属性快照、animator 状态、点击坐标、取消轨迹和可访问性边界中的“31. Property Animation”轨迹",
    },
    {
      action: "触发事件：Building the Scene",
      state:
        "以“启动、暂停、取消、组合动画、旋转与减少动态效果”改变属性起止值、时长、插值、运行阶段和点击区域",
      evidence:
        "属性快照、animator 状态、点击坐标、取消轨迹和可访问性边界中的“Building the Scene”轨迹",
    },
    {
      action: "提交状态：Simple Property Animation",
      state: "只由Animator、View 属性与场景状态机提交新状态",
      evidence:
        "属性快照、animator 状态、点击坐标、取消轨迹和可访问性边界中的“Simple Property Animation”轨迹",
    },
    {
      action: "重建边界：For the More Curious: Other Animation APIs",
      state: "在销毁、取消或重建后拒绝旧所有者回调",
      evidence:
        "属性快照、animator 状态、点击坐标、取消轨迹和可访问性边界中的“For the More Curious: Other Animation APIs”轨迹",
    },
    {
      action: "核对交付：Challenges",
      state: "以“动画结束后的视觉、布局点击区域和无障碍边界一致”判断通过",
      evidence: "属性快照、animator 状态、点击坐标、取消轨迹和可访问性边界",
    },
  ],
  scenarios: [
    {
      label: "正常任务",
      input:
        "固定 SDK、设备配置和初始状态，触发“启动、暂停、取消、组合动画、旋转与减少动态效果”",
      expected:
        "由Animator、View 属性与场景状态机提交属性起止值、时长、插值、运行阶段和点击区域，并持续满足“动画结束后的视觉、布局点击区域和无障碍边界一致”",
    },
    {
      label: "边界恢复",
      input:
        "保持正常输入不变，仅注入“只做 canvas 位移，按钮看似移动但点击区域仍留在原位”",
      expected:
        "找到首个状态分岔，撤销后以属性快照、animator 状态、点击坐标、取消轨迹和可访问性边界证明同输入恢复",
    },
  ],
} satisfies AndroidStateModel;

export function PropertyAnimationContractLab() {
  return <AndroidStateLab model={model} view="contract" />;
}

export function PropertyAnimationLifecycleLab() {
  return <AndroidStateLab model={model} view="lifecycle" />;
}

export function PropertyAnimationFaultLab() {
  return <AndroidStateLab model={model} view="fault" />;
}
