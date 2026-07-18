import { VueJsPracticeEvidenceLab } from "./official-vuejs-practice-lab";

const nodes = [
  "生成项目",
  "划分目录",
  "解析URL",
  "匹配路由",
  "提交状态",
  "构建签发",
] as const;

export function Vjp06ProjectizationMapLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="第 6 章 Vue项目化"
      label="Vue.js从入门到项目实战"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Vjp06ProjectizationExperimentLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第 6 章 Vue项目化"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Vjp06ProjectizationEvidenceLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="状态、事件与资源证据"
      label="第 6 章 Vue项目化"
      nodes={nodes}
      mode="evidence"
    />
  );
}
