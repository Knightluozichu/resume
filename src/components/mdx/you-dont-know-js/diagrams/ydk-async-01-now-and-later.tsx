import { YdkjsMechanismLab } from "./official-ydkjs-lab";

const nodes = [
  "执行当前同步任务",
  "注册稍后完成的操作",
  "当前调用栈清空",
  "清空微任务队列",
  "宿主选择下一任务",
  "按可观察顺序记录输出",
] as const;

export function YdkAsync01NowAndLaterMapLab() {
  return (
    <YdkjsMechanismLab
      title="第 1 章 异步：现在与将来"
      label="你不知道的 JavaScript · 一版"
      nodes={nodes}
      mode="map"
    />
  );
}

export function YdkAsync01NowAndLaterExperimentLab() {
  return (
    <YdkjsMechanismLab
      title="正常、边界、失败与恢复样本"
      label="第 1 章 异步：现在与将来"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function YdkAsync01NowAndLaterEvidenceLab() {
  return (
    <YdkjsMechanismLab
      title="作用域、值、调用与时间证据"
      label="第 1 章 异步：现在与将来"
      nodes={nodes}
      mode="evidence"
    />
  );
}
