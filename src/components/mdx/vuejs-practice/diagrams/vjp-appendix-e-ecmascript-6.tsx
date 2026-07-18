import { VueJsPracticeEvidenceLab } from "./official-vuejs-practice-lab";

const nodes = [
  "声明绑定",
  "解构数据",
  "创建函数",
  "组织类",
  "组合Promise",
  "连接模块",
] as const;

export function VjpAppendixEEcmascript6MapLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="附录 E 常见的ECMAScript 6语法"
      label="Vue.js从入门到项目实战"
      nodes={nodes}
      mode="map"
    />
  );
}

export function VjpAppendixEEcmascript6ExperimentLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="附录 E 常见的ECMAScript 6语法"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function VjpAppendixEEcmascript6EvidenceLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="状态、事件与资源证据"
      label="附录 E 常见的ECMAScript 6语法"
      nodes={nodes}
      mode="evidence"
    />
  );
}
