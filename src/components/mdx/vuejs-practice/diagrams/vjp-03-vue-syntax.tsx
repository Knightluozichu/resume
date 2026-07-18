import { VueJsPracticeEvidenceLab } from "./official-vuejs-practice-lab";

const nodes = [
  "读取状态",
  "计算表达式",
  "绑定属性",
  "接收事件",
  "更新模型",
  "最小化补丁",
] as const;

export function Vjp03VueSyntaxMapLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="第 3 章 Vue语法"
      label="Vue.js从入门到项目实战"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Vjp03VueSyntaxExperimentLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第 3 章 Vue语法"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Vjp03VueSyntaxEvidenceLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="状态、事件与资源证据"
      label="第 3 章 Vue语法"
      nodes={nodes}
      mode="evidence"
    />
  );
}
