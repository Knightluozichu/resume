import { VueJsPracticeEvidenceLab } from "./official-vuejs-practice-lab";

const nodes = [
  "选择组件",
  "分发插槽",
  "确定身份",
  "命中缓存",
  "切换节点",
  "完成过渡",
] as const;

export function Vjp05BuiltInComponentsMapLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="第 5 章 Vue内置组件"
      label="Vue.js从入门到项目实战"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Vjp05BuiltInComponentsExperimentLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第 5 章 Vue内置组件"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Vjp05BuiltInComponentsEvidenceLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="状态、事件与资源证据"
      label="第 5 章 Vue内置组件"
      nodes={nodes}
      mode="evidence"
    />
  );
}
