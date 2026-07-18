import {
  HfjReferenceMapLab,
  HfjExecutionExperimentLab,
  HfjEvidenceLab,
} from "./official-hfj-lab";

const stages = ["声明合同", "预测结果", "编译运行", "注入边界", "解释证据"];

export function Hfj3e14GuiMapLab() {
  return (
    <HfjReferenceMapLab
      title="第14章 图形故事：进入 GUI · 对象/执行图"
      focus="理解 Swing 事件分派、监听器、绘制、内部类与 Lambda，让状态变化只通过可追踪事件进入界面"
      stages={stages}
    />
  );
}

export function Hfj3e14GuiExperimentLab() {
  return (
    <HfjExecutionExperimentLab
      title="第14章 图形故事：进入 GUI · 执行实验"
      focus="事件源/监听器图、绘制生命周期轨迹与双按钮行为测试"
      stages={stages}
    />
  );
}

export function Hfj3e14GuiEvidenceLab() {
  return (
    <HfjEvidenceLab
      title="第14章 图形故事：进入 GUI · 失败证据"
      focus="阻塞事件分派线程，或在 paintComponent 中修改业务状态导致重绘结果不稳定"
      stages={stages}
    />
  );
}
