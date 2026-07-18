import { VueJsPracticeEvidenceLab } from "./official-vuejs-practice-lab";

const nodes = [
  "静态页面",
  "动态交互",
  "前后端分离",
  "MVVM",
  "组件化",
  "框架取舍",
] as const;

export function Vjp01IntroductionMapLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="第 1 章 引言"
      label="Vue.js从入门到项目实战"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Vjp01IntroductionExperimentLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第 1 章 引言"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Vjp01IntroductionEvidenceLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="状态、事件与资源证据"
      label="第 1 章 引言"
      nodes={nodes}
      mode="evidence"
    />
  );
}
