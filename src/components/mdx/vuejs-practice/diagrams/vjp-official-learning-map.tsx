import { VueJsPracticeEvidenceLab } from "./official-vuejs-practice-lab";

const nodes = [
  "核对官方目录",
  "夯实概念语法",
  "完成项目化",
  "打造商城",
  "交付多类项目",
  "附录补齐工具",
] as const;

export function VjpOfficialLearningMapMapLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="《Vue.js从入门到项目实战》权威学习地图"
      label="Vue.js从入门到项目实战"
      nodes={nodes}
      mode="map"
    />
  );
}

export function VjpOfficialLearningMapExperimentLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="《Vue.js从入门到项目实战》权威学习地图"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function VjpOfficialLearningMapEvidenceLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="状态、事件与资源证据"
      label="《Vue.js从入门到项目实战》权威学习地图"
      nodes={nodes}
      mode="evidence"
    />
  );
}
