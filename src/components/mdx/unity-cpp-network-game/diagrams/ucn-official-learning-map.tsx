import { UnityCppEvidenceLab } from "./official-unity-cpp-evidence-lab";

const nodes = [
  "锁定版本与ISBN",
  "映射4篇21章",
  "完成Unity基础",
  "完成Unity仿真实战",
  "完成C++网络基础",
  "贯通四类服务器并签发",
] as const;

export function UcnOfficialLearningMapMapLab() {
  return (
    <UnityCppEvidenceLab
      title="《Unity与C++网络游戏开发实战》权威学习地图"
      label="全书导读"
      nodes={nodes}
      mode="map"
    />
  );
}

export function UcnOfficialLearningMapExperimentLab() {
  return (
    <UnityCppEvidenceLab
      title="正常、边界与失败样本"
      label="《Unity与C++网络游戏开发实战》权威学习地图"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function UcnOfficialLearningMapEvidenceLab() {
  return (
    <UnityCppEvidenceLab
      title="所有权、代际与恢复证据"
      label="《Unity与C++网络游戏开发实战》权威学习地图"
      nodes={nodes}
      mode="evidence"
    />
  );
}
