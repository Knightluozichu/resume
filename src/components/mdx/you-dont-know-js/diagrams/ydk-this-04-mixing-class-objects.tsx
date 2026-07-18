import { YdkjsMechanismLab } from "./official-ydkjs-lab";

const nodes = [
  "定义共享行为模板",
  "创建实例状态",
  "模拟父子关系",
  "复制或链接方法",
  "解析覆盖与 super 访问",
  "评估耦合和重复状态",
] as const;

export function YdkThis04MixingClassObjectsMapLab() {
  return (
    <YdkjsMechanismLab
      title="第 4 章 混合对象“类”"
      label="你不知道的 JavaScript · 一版"
      nodes={nodes}
      mode="map"
    />
  );
}

export function YdkThis04MixingClassObjectsExperimentLab() {
  return (
    <YdkjsMechanismLab
      title="正常、边界、失败与恢复样本"
      label="第 4 章 混合对象“类”"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function YdkThis04MixingClassObjectsEvidenceLab() {
  return (
    <YdkjsMechanismLab
      title="作用域、值、调用与时间证据"
      label="第 4 章 混合对象“类”"
      nodes={nodes}
      mode="evidence"
    />
  );
}
