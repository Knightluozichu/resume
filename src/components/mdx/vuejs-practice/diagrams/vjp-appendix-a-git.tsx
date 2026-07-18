import { VueJsPracticeEvidenceLab } from "./official-vuejs-practice-lab";

const nodes = [
  "检查工作区",
  "选择性暂存",
  "创建提交",
  "移动分支",
  "合并历史",
  "验证远端",
] as const;

export function VjpAppendixAGitMapLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="附录 A Git入门"
      label="Vue.js从入门到项目实战"
      nodes={nodes}
      mode="map"
    />
  );
}

export function VjpAppendixAGitExperimentLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="附录 A Git入门"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function VjpAppendixAGitEvidenceLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="状态、事件与资源证据"
      label="附录 A Git入门"
      nodes={nodes}
      mode="evidence"
    />
  );
}
