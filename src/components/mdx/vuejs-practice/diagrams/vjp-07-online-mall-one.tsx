import { VueJsPracticeEvidenceLab } from "./official-vuejs-practice-lab";

const nodes = [
  "分析需求",
  "建立商品模型",
  "浏览首页",
  "查看详情",
  "编辑购物车",
  "提交订单",
] as const;

export function Vjp07OnlineMallOneMapLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="第 7 章 打造线上商城（一）"
      label="Vue.js从入门到项目实战"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Vjp07OnlineMallOneExperimentLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第 7 章 打造线上商城（一）"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Vjp07OnlineMallOneEvidenceLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="状态、事件与资源证据"
      label="第 7 章 打造线上商城（一）"
      nodes={nodes}
      mode="evidence"
    />
  );
}
