import { YdkjsMechanismLab } from "./official-ydkjs-lab";

const nodes = [
  "扫描当前作用域声明",
  "登记函数声明",
  "登记变量绑定",
  "忽略重复 var 登记",
  "进入执行阶段完成赋值",
  "按实际执行点读取值",
] as const;

export function YdkScope04HoistingMapLab() {
  return (
    <YdkjsMechanismLab
      title="第 4 章 提升"
      label="你不知道的 JavaScript · 一版"
      nodes={nodes}
      mode="map"
    />
  );
}

export function YdkScope04HoistingExperimentLab() {
  return (
    <YdkjsMechanismLab
      title="正常、边界、失败与恢复样本"
      label="第 4 章 提升"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function YdkScope04HoistingEvidenceLab() {
  return (
    <YdkjsMechanismLab
      title="作用域、值、调用与时间证据"
      label="第 4 章 提升"
      nodes={nodes}
      mode="evidence"
    />
  );
}
