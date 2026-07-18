import { YdkjsMechanismLab } from "./official-ydkjs-lab";

const nodes = [
  "根据数据语义选择集合",
  "定义键相等规则",
  "执行添加读取和删除",
  "按插入顺序迭代强集合",
  "让弱集合键随对象回收",
  "验证序列化与生命周期边界",
] as const;

export function YdkEs605CollectionsMapLab() {
  return (
    <YdkjsMechanismLab
      title="第 5 章 集合"
      label="你不知道的 JavaScript · 一版"
      nodes={nodes}
      mode="map"
    />
  );
}

export function YdkEs605CollectionsExperimentLab() {
  return (
    <YdkjsMechanismLab
      title="正常、边界、失败与恢复样本"
      label="第 5 章 集合"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function YdkEs605CollectionsEvidenceLab() {
  return (
    <YdkjsMechanismLab
      title="作用域、值、调用与时间证据"
      label="第 5 章 集合"
      nodes={nodes}
      mode="evidence"
    />
  );
}
