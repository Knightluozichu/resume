import { VueJsPracticeEvidenceLab } from "./official-vuejs-practice-lab";

const nodes = [
  "引入运行时",
  "创建实例",
  "初始化数据",
  "收集依赖",
  "派发更新",
  "销毁清理",
] as const;

export function Vjp02BasicIntroductionMapLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="第 2 章 基本介绍"
      label="Vue.js从入门到项目实战"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Vjp02BasicIntroductionExperimentLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第 2 章 基本介绍"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Vjp02BasicIntroductionEvidenceLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="状态、事件与资源证据"
      label="第 2 章 基本介绍"
      nodes={nodes}
      mode="evidence"
    />
  );
}
