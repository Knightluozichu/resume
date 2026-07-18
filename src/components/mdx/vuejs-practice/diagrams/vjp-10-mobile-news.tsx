import { VueJsPracticeEvidenceLab } from "./official-vuejs-practice-lab";

const nodes = [
  "启动首屏",
  "加载频道",
  "展示列表",
  "读取详情",
  "提交搜索",
  "合并结果",
] as const;

export function Vjp10MobileNewsMapLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="第 10 章 我的掌上新闻"
      label="Vue.js从入门到项目实战"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Vjp10MobileNewsExperimentLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第 10 章 我的掌上新闻"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Vjp10MobileNewsEvidenceLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="状态、事件与资源证据"
      label="第 10 章 我的掌上新闻"
      nodes={nodes}
      mode="evidence"
    />
  );
}
