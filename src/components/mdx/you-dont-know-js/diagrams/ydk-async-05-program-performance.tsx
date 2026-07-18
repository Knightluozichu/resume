import { YdkjsMechanismLab } from "./official-ydkjs-lab";

const nodes = [
  "定位阻塞主线程的热点",
  "划分可独立计算的数据",
  "序列化消息给 Worker",
  "Worker 并行执行",
  "返回结果并合并",
  "以现代基线复测历史优化",
] as const;

export function YdkAsync05ProgramPerformanceMapLab() {
  return (
    <YdkjsMechanismLab
      title="第 5 章 程序性能"
      label="你不知道的 JavaScript · 一版"
      nodes={nodes}
      mode="map"
    />
  );
}

export function YdkAsync05ProgramPerformanceExperimentLab() {
  return (
    <YdkjsMechanismLab
      title="正常、边界、失败与恢复样本"
      label="第 5 章 程序性能"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function YdkAsync05ProgramPerformanceEvidenceLab() {
  return (
    <YdkjsMechanismLab
      title="作用域、值、调用与时间证据"
      label="第 5 章 程序性能"
      nodes={nodes}
      mode="evidence"
    />
  );
}
