import { VueJsPracticeEvidenceLab } from "./official-vuejs-practice-lab";

const nodes = [
  "读取入口",
  "解析模块",
  "应用loader",
  "运行plugin",
  "拆分chunk",
  "写出产物",
] as const;

export function VjpAppendixCWebpackMapLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="附录 C Webpack入门"
      label="Vue.js从入门到项目实战"
      nodes={nodes}
      mode="map"
    />
  );
}

export function VjpAppendixCWebpackExperimentLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="附录 C Webpack入门"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function VjpAppendixCWebpackEvidenceLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="状态、事件与资源证据"
      label="附录 C Webpack入门"
      nodes={nodes}
      mode="evidence"
    />
  );
}
