import { YdkjsMechanismLab } from "./official-ydkjs-lab";

const nodes = [
  "锁定中文版三卷身份",
  "映射一版英文六册",
  "逐项登记正式目录",
  "为每章建立运行轨迹",
  "披露历史提案状态",
  "用题库与故障样本签发",
] as const;

export function YdkOfficialLearningMapMapLab() {
  return (
    <YdkjsMechanismLab
      title="《你不知道的 JavaScript》权威学习地图"
      label="你不知道的 JavaScript · 一版"
      nodes={nodes}
      mode="map"
    />
  );
}

export function YdkOfficialLearningMapExperimentLab() {
  return (
    <YdkjsMechanismLab
      title="正常、边界、失败与恢复样本"
      label="《你不知道的 JavaScript》权威学习地图"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function YdkOfficialLearningMapEvidenceLab() {
  return (
    <YdkjsMechanismLab
      title="作用域、值、调用与时间证据"
      label="《你不知道的 JavaScript》权威学习地图"
      nodes={nodes}
      mode="evidence"
    />
  );
}
