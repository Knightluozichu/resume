import { VueJsPracticeEvidenceLab } from "./official-vuejs-practice-lab";

const nodes = [
  "读取清单",
  "解析版本",
  "锁定依赖树",
  "安装包",
  "运行脚本",
  "审计产物",
] as const;

export function VjpAppendixBNpmMapLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="附录 B NPM入门"
      label="Vue.js从入门到项目实战"
      nodes={nodes}
      mode="map"
    />
  );
}

export function VjpAppendixBNpmExperimentLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="附录 B NPM入门"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function VjpAppendixBNpmEvidenceLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="状态、事件与资源证据"
      label="附录 B NPM入门"
      nodes={nodes}
      mode="evidence"
    />
  );
}
