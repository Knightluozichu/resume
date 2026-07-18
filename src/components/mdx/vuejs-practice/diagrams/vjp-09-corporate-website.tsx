import { VueJsPracticeEvidenceLab } from "./official-vuejs-practice-lab";

const nodes = [
  "读取视口",
  "选择布局",
  "划分内容",
  "切换页面",
  "驱动轮播",
  "绑定语言包",
] as const;

export function Vjp09CorporateWebsiteMapLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="第 9 章 企业官网的建设"
      label="Vue.js从入门到项目实战"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Vjp09CorporateWebsiteExperimentLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第 9 章 企业官网的建设"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Vjp09CorporateWebsiteEvidenceLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="状态、事件与资源证据"
      label="第 9 章 企业官网的建设"
      nodes={nodes}
      mode="evidence"
    />
  );
}
