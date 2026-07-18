import { VueJsPracticeEvidenceLab } from "./official-vuejs-practice-lab";

const nodes = [
  "组织目录",
  "解析依赖",
  "处理资源",
  "加载配置",
  "保存数据",
  "封装组件",
] as const;

export function Vjp08OnlineMallTwoMapLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="第 8 章 打造线上商城（二）"
      label="Vue.js从入门到项目实战"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Vjp08OnlineMallTwoExperimentLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第 8 章 打造线上商城（二）"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Vjp08OnlineMallTwoEvidenceLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="状态、事件与资源证据"
      label="第 8 章 打造线上商城（二）"
      nodes={nodes}
      mode="evidence"
    />
  );
}
