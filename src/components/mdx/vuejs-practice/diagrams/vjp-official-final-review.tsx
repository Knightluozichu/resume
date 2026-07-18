import { VueJsPracticeEvidenceLab } from "./official-vuejs-practice-lab";

const nodes = [
  "复核目录",
  "实现核心组件",
  "贯通路由状态",
  "重放项目流程",
  "注入失败",
  "签发作品集",
] as const;

export function VjpOfficialFinalReviewMapLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="《Vue.js从入门到项目实战》全书总复习"
      label="Vue.js从入门到项目实战"
      nodes={nodes}
      mode="map"
    />
  );
}

export function VjpOfficialFinalReviewExperimentLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="《Vue.js从入门到项目实战》全书总复习"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function VjpOfficialFinalReviewEvidenceLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="状态、事件与资源证据"
      label="《Vue.js从入门到项目实战》全书总复习"
      nodes={nodes}
      mode="evidence"
    />
  );
}
