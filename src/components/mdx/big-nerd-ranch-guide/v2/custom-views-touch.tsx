"use client";

import { AndroidStateLab, type AndroidStateModel } from "./android-state-lab";

const model = {
  unitId: "custom-views-touch",
  title: "定制视图与触摸事件",
  task: "把 pointer 手势转换成 Box 几何，同时控制重绘、保存状态与无障碍操作",
  owner: "BoxDrawingView、手势状态机与 saved state",
  state: "pointer ID、起止坐标、box 列表、绘制区域和语义节点",
  event: "按下、移动、抬起、多指、旋转与键盘替代操作",
  invariant: "每个手势只提交一个合法 box，重绘和状态恢复不依赖旧 Canvas",
  fault: "忽略 pointer ID，多指切换后 box 突然跳到另一根手指",
  evidence: "MotionEvent 序列、pointer ID、box 快照、invalidate 区域和语义树",
  concepts: [
    "30. Custom Views and Touch Events",
    "Setting Up the DragAndDraw Project",
    "Creating a Custom View",
    "Handling Touch Events",
    "Rendering Inside onDraw(Canvas)",
    "For the More Curious: GestureDetector",
    "Challenge: Saving State",
    "Challenge: Rotating Boxes",
    "Challenge: Accessibility Support",
  ],
  transitions: [
    {
      action: "冻结入口：30. Custom Views and Touch Events",
      state:
        "记录BoxDrawingView、手势状态机与 saved state的初始pointer ID、起止坐标、box 列表、绘制区域和语义节点",
      evidence:
        "MotionEvent 序列、pointer ID、box 快照、invalidate 区域和语义树中的“30. Custom Views and Touch Events”轨迹",
    },
    {
      action: "触发事件：Creating a Custom View",
      state:
        "以“按下、移动、抬起、多指、旋转与键盘替代操作”改变pointer ID、起止坐标、box 列表、绘制区域和语义节点",
      evidence:
        "MotionEvent 序列、pointer ID、box 快照、invalidate 区域和语义树中的“Creating a Custom View”轨迹",
    },
    {
      action: "提交状态：Rendering Inside onDraw(Canvas)",
      state: "只由BoxDrawingView、手势状态机与 saved state提交新状态",
      evidence:
        "MotionEvent 序列、pointer ID、box 快照、invalidate 区域和语义树中的“Rendering Inside onDraw(Canvas)”轨迹",
    },
    {
      action: "重建边界：Challenge: Saving State",
      state: "在销毁、取消或重建后拒绝旧所有者回调",
      evidence:
        "MotionEvent 序列、pointer ID、box 快照、invalidate 区域和语义树中的“Challenge: Saving State”轨迹",
    },
    {
      action: "核对交付：Challenge: Accessibility Support",
      state:
        "以“每个手势只提交一个合法 box，重绘和状态恢复不依赖旧 Canvas”判断通过",
      evidence:
        "MotionEvent 序列、pointer ID、box 快照、invalidate 区域和语义树",
    },
  ],
  scenarios: [
    {
      label: "正常任务",
      input:
        "固定 SDK、设备配置和初始状态，触发“按下、移动、抬起、多指、旋转与键盘替代操作”",
      expected:
        "由BoxDrawingView、手势状态机与 saved state提交pointer ID、起止坐标、box 列表、绘制区域和语义节点，并持续满足“每个手势只提交一个合法 box，重绘和状态恢复不依赖旧 Canvas”",
    },
    {
      label: "边界恢复",
      input:
        "保持正常输入不变，仅注入“忽略 pointer ID，多指切换后 box 突然跳到另一根手指”",
      expected:
        "找到首个状态分岔，撤销后以MotionEvent 序列、pointer ID、box 快照、invalidate 区域和语义树证明同输入恢复",
    },
  ],
} satisfies AndroidStateModel;

export function CustomViewsTouchContractLab() {
  return <AndroidStateLab model={model} view="contract" />;
}

export function CustomViewsTouchLifecycleLab() {
  return <AndroidStateLab model={model} view="lifecycle" />;
}

export function CustomViewsTouchFaultLab() {
  return <AndroidStateLab model={model} view="fault" />;
}
