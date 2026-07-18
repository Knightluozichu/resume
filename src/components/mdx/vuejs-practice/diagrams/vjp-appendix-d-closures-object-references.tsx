import { VueJsPracticeEvidenceLab } from "./official-vuejs-practice-lab";

const nodes = [
  "创建词法环境",
  "捕获绑定",
  "共享对象",
  "延迟调用",
  "更新引用",
  "解除可达",
] as const;

export function VjpAppendixDClosuresObjectReferencesMapLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="附录 D 闭包和对象引用"
      label="Vue.js从入门到项目实战"
      nodes={nodes}
      mode="map"
    />
  );
}

export function VjpAppendixDClosuresObjectReferencesExperimentLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="附录 D 闭包和对象引用"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function VjpAppendixDClosuresObjectReferencesEvidenceLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="状态、事件与资源证据"
      label="附录 D 闭包和对象引用"
      nodes={nodes}
      mode="evidence"
    />
  );
}
