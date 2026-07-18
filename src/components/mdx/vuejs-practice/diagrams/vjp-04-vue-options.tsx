import { VueJsPracticeEvidenceLab } from "./official-vuejs-practice-lab";

const nodes = [
  "接收props",
  "创建data",
  "派生computed",
  "响应watch",
  "执行render",
  "封装复用",
] as const;

export function Vjp04VueOptionsMapLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="第 4 章 Vue选项"
      label="Vue.js从入门到项目实战"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Vjp04VueOptionsExperimentLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第 4 章 Vue选项"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Vjp04VueOptionsEvidenceLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="状态、事件与资源证据"
      label="第 4 章 Vue选项"
      nodes={nodes}
      mode="evidence"
    />
  );
}
