import { YdkjsMechanismLab } from "./official-ydkjs-lab";

const nodes = [
  "创建对象容器",
  "规范化属性键",
  "查找自有属性",
  "读取数据或调用 getter",
  "按描述符约束写入",
  "只迭代允许暴露的键",
] as const;

export function YdkThis03ObjectsMapLab() {
  return (
    <YdkjsMechanismLab
      title="第 3 章 对象"
      label="你不知道的 JavaScript · 一版"
      nodes={nodes}
      mode="map"
    />
  );
}

export function YdkThis03ObjectsExperimentLab() {
  return (
    <YdkjsMechanismLab
      title="正常、边界、失败与恢复样本"
      label="第 3 章 对象"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function YdkThis03ObjectsEvidenceLab() {
  return (
    <YdkjsMechanismLab
      title="作用域、值、调用与时间证据"
      label="第 3 章 对象"
      nodes={nodes}
      mode="evidence"
    />
  );
}
